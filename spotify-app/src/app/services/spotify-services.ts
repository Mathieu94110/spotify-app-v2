import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

// interface SpotifyApiParams {
//   limit?: any;
//   offset?: any;
//   [key: string]: any;
// }
export interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

@Injectable({ providedIn: 'root' })
export class SpotifyServices {
  code: string | undefined;
  uri: string = environment.uri;
  baseURL: string = 'https://accounts.spotify.com/api/token';
  redirect_uri: any = `${this.uri}homepage`;
  token: Token | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  newToken: string | undefined;
  errorMessage: any;
  search: string = 'https://api.spotify.com/v1/search';
  clientSecret: string = environment.clientSecret;
  authorizeUri: string = environment.authorizeUri;
  clientId: string = environment.clientId;
  scopes: string[] = environment.SCOPES;
  browseUrl: string;
  tokenValue: boolean = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.browseUrl = 'https://api.spotify.com/v1/browse';
  }

  login() {
    console.log(this.clientId);
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirect_uri,
      scope: encodeURIComponent(this.scopes.join(' ')),
      response_type: 'code'
    });
    window.location = <any>`${this.authorizeUri}?${params.toString()}`;
  }

  getToken(ArrayMethod: Array<string> = []) {
    this.route.queryParams.subscribe((params) => {
      this.code = params['code'];
      console.log('this.code =' + this.code);
    });
    let encodedClientDetails = btoa(this.clientId + ':' + this.clientSecret);

    let headers = new HttpHeaders() // enlever 2eme Authorizaion sinon
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic ' + encodedClientDetails);

    let body = 'grant_type=authorization_code';
    body += '&code=' + this.code;
    body += '&redirect_uri=' + `${this.uri}homepage`;

    this.http.post<any>(this.baseURL, body, { headers }).subscribe({
      next: (data: Token) => {
        console.log(data);
        this.token = data;
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        localStorage.setItem('access_token', this.accessToken);
        localStorage.setItem('refresh_token', this.refreshToken);
        // if (ArrayMethod.length > 0) {
        //   if (ArrayMethod.includes('getFeaturedPlaylists')) {
        //     this.getFeaturedPlaylists();
        //   }
        //   if (ArrayMethod.includes('getAllCategories')) {
        //     this.getAllCategories();
        //   }
        // }
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });
  }

  // checkToken() {
  //   let tokenValue = localStorage.getItem('access_token');
  //   if (tokenValue !== undefined && tokenValue !== '') {
  //     this.tokenValue = true;
  //   }
  //   this.tokenValue = false;
  //   return this.tokenValue;
  // }

  getFeaturedPlaylists(value: string) {
    let accessToken = localStorage.getItem('access_token');
    let headers = new HttpHeaders() // enlever 2eme Authorizaion sinon
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.get<any>(value, { headers });
  }

  getAllCategories(value: string) {
    let accessToken = localStorage.getItem('access_token');

    let headers = new HttpHeaders() // enlever 2eme Authorizaion sinon
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.get<any>(value, {
      headers
    });
  }

  getAllNewReleases(value: string) {
    let accessToken = localStorage.getItem('access_token');

    let headers = new HttpHeaders() // enlever 2eme Authorizaion sinon
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.get<any>(value, {
      headers
    });
  }

  getCategoryPlaylists(
    categoryId: string,
    params: any = {
      limit: 50
    }
  ) {
    return this.http
      .get<any>(`${this.browseUrl}/categories/${categoryId}/playlists`, {
        params
      })
      .pipe(
        map((res) => {
          console.log('res of getCategoryPlaylists ', res.playlists);
          return res.playlists;
        })
      );
  }

  getrefreshToken() {
    let encodedClientDetails = btoa(this.clientId + ':' + this.clientSecret);

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic ' + encodedClientDetails);

    let body = 'Content-Type=application/x-www-form-urlencoded';
    body += '&grant_type=refresh_token';
    body += '&refresh_token=' + localStorage.getItem('refresh_token');

    this.http
      .post<any>('https://accounts.spotify.com/api/token', body, { headers })
      .subscribe({
        next: (data: any) => {
          let newTokenDatas = data;
          this.newToken = newTokenDatas.access_token;
          console.log('newToken = ', this.newToken);

          //   this.accessToken = data.access_token;
          //   this.refreshToken = data.refresh_token;
          //   localStorage.setItem('access_token', this.accessToken);
          //   localStorage.setItem('refresh_token', this.refreshToken);
        },
        error: (error: Error) => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });
  }

  searchForAnItem(term: string) {
    let accessToken = localStorage.getItem('access_token');
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    const params = new HttpParams()
      .set('q', term)
      .set('type', 'album,artist,playlist,track,show,episode');
    const httpOptions = {
      headers: headers,
      params: params
    };
    if (term === '') {
      return of([]);
    }
    return this.http.get(this.search, httpOptions);
  }

  getUse() {
    let accessToken = localStorage.getItem('access_token');

    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    this.http
      .get<any>('https://api.spotify.com/v1/me', { headers })
      .subscribe((res) => {
        console.log('get Use =', res);
      });
    // 'scope' : 'playlist-modify-public'
  }

  getUserPlaylists() {
    let accessToken = localStorage.getItem('access_token');

    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    // .set(playlist-read-private)
    let userId = 'msdsmfwvn20ggoa19elke7st1';

    this.http
      .get<any>(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers
      })
      .subscribe((res) => {
        console.log('get Playlist =', res);
      });
  }
  addItemToPlaylist() {
    let accessToken = localStorage.getItem('access_token');
    let userPlaylistId = '0jzbMeTrDTOITFUG5iY3kt';

    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Authorization', 'playlist-modify-private');

    let body = 'uris=spotify:track:7zr0cqz7q0N3ED57wcEZVY';

    this.http
      .post<any>(
        `https://api.spotify.com/v1/playlists/${userPlaylistId}/tracks`,
        body,
        { headers }
      )
      .subscribe((res) => {
        console.log('ADDiTEM =', res);
      });
  }

  createPlaylist() {
    let accessToken = localStorage.getItem('access_token');
    let userPlaylistId = '2gwf4f6zz8ginkw7v9v3e3tmx';

    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    const postData = {
      name: 'New Playlist',
      description: 'New playlist description',
      public: false
    };

    let body = JSON.stringify(postData);

    this.http
      .post<any>(
        `https://api.spotify.com/v1/users/${userPlaylistId}/playlists`,
        body,
        { headers }
      )
      .subscribe((res) => {
        console.log('created playlist =', res);
      });
  }
}