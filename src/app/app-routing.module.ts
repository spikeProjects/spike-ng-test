import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { SearchComponent } from './search/search.component';
import { ArtistsComponent } from './artists/artists.component';
import { TrackComponent } from './track/track.component';
import { AlbumComponent } from './album/album.component';
import { ParentComponent } from './parent/parent.component';
import { routes as parentModuleRoutes } from './parent/parent-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'artists/:id', component: ArtistsComponent },
  { path: 'tracks/:id', component: TrackComponent },
  { path: 'albums/:id', component: AlbumComponent },

  { path: 'parent', component: ParentComponent, children: parentModuleRoutes },
  {
    path: 'dynamic-parent', 
    loadChildren: 'app/dynamic-parent/dynamic-parent.module#DynamicParentModule'
  },
  { path: '', redirectTo: 'dynamic-parent', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
