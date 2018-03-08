import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  LocationStrategy,
  HashLocationStrategy,
  APP_BASE_HREF
} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ArtistsComponent } from './artists/artists.component';
import { TrackComponent } from './track/track.component';
import { AlbumComponent } from './album/album.component';
import { AppService } from './app.service';
import { ParentModule } from './parent/parent.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ArtistsComponent,
    TrackComponent,
    AlbumComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ParentModule,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: AppService, 
      useClass: AppService
    },
    {
      provide: LocationStrategy, 
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
