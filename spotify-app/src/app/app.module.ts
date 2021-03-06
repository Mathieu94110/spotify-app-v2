import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SpotifyServices } from './services/spotify-services';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatePlaylistsComponent } from './create-playlists/create-playlists.component';
import { SearchComponent } from './search/search-component/search.component';
import { SongsComponent } from './songs/songs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { CardsComponent } from './cards/cards.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PlaylistsComponent } from './playlists/playlists.component';
import { SearchAlbumsComponent } from './search/search-albums/search-albums.component';
import { SearchTracksComponent } from './search/search-tracks/search-tracks.component';
import { SearchArtistsComponent } from './search/search-artists/search-artists.component';
import { SearchPlaylistsComponent } from './search/search-playlists/search-playlists.component';
import { SearchEpisodesComponent } from './search/search-episodes/search-episodes.component';
import { SearchShowsComponent } from './search/search-shows/search-shows.component';
import { SearchStepsButtonsComponent } from './search/search-steps-buttons/search-steps-buttons.component';
import { PlaylistsImagesComponent } from './create-playlists/playlists-images/playlists-images.component';
import { AddItemsToPlaylistsComponent } from './search/add-items-to-playlists/add-items-to-playlists.component';
import { PopUpAddToPlaylistsComponent } from './search/add-items-to-playlists/pop-up/pop-up.component';
import { PlaylistTracksModalComponent } from './playlists/playlist-tracks-modal/playlist-tracks-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    CreatePlaylistsComponent,
    SearchComponent,
    SongsComponent,
    CardsComponent,
    SidebarComponent,
    PlaylistsComponent,
    SearchAlbumsComponent,
    SearchTracksComponent,
    SearchArtistsComponent,
    SearchPlaylistsComponent,
    SearchEpisodesComponent,
    SearchShowsComponent,
    SearchStepsButtonsComponent,
    PlaylistsImagesComponent,
    AddItemsToPlaylistsComponent,
    PopUpAddToPlaylistsComponent,
    PlaylistTracksModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    MatSliderModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [SpotifyServices],
  bootstrap: [AppComponent]
})
export class AppModule {}
