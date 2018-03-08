import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import { ApiService } from './shared';

import 'rxjs/Rx';

@Injectable()
export class AppService {
  static BASE_URL: string = 'https://api.spotify.com/v1';

  // constructor(private http: Http) {}
  constructor(private api: ApiService) {}

  query(URL: string, params?: Array<string>): Observable<any[]> {
    // let queryURL: string = `${AppService.BASE_URL}${URL}`;

    if (params) {
      URL = `${URL}?${params.join('&')}`;
    }
    return this.api.get(URL).map((res: any) => {
      return res;
    	// return res.json();
    });
  }

  search(query: string, type: string): Observable<any[]> {
    return this.query(`/search`, [
      `q=${query}`,
      `type=${type}`
    ]);
  }

  searchTrack(query: string): Observable<any[]> {
    return this.search(query, 'track');
  }

  getTrack(id: string): Observable<any[]> {
    return this.query(`/tracks/${id}`);
  }

  getArtist(id: string): Observable<any[]> {
    return this.query(`/artists/${id}`);
  }

  getAlbum(id: string): Observable<any[]> {
    return this.query(`/albums/${id}`);
  }
}

