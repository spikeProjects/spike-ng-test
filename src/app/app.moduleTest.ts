import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  LocationStrategy,
  HashLocationStrategy,
  APP_BASE_HREF
} from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './search/search.component';
import { ArtistsComponent } from './artists/artists.component';
import { TrackComponent } from './track/track.component';
import { AlbumComponent } from './album/album.component';
import { AppService } from './app.service';

import { BlankCmp, RootCmp } from './shared/test';

@NgModule({
  imports: [RouterTestingModule, CommonModule],
  declarations: [
    BlankCmp, 
    RootCmp,
    SearchComponent,
    ArtistsComponent,
    TrackComponent,
    AlbumComponent
  ],
  entryComponents: [
    BlankCmp, 
    RootCmp,
    SearchComponent,
    ArtistsComponent,
    TrackComponent,
    AlbumComponent
  ],
  exports: [
    BlankCmp, 
    RootCmp,
    SearchComponent,
    ArtistsComponent,
    TrackComponent,
    AlbumComponent
  ],
  // providers: [
  //   { provide: APP_BASE_HREF, useValue: '/' },
  //   {
  //     provide: AppService, 
  //     useClass: AppService
  //   },
  //   {
  //     provide: LocationStrategy, 
  //     useClass: HashLocationStrategy
  //   }
  // ],
  // bootstrap: [AppComponent]
})
export class AppModuleTest { }
