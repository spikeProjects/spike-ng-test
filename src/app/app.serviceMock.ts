import { AppService } from './app.service';
import { SpyObject } from './shared/test';

export class AppServiceMock extends SpyObject {
  getAlbumSpy;
  getArtistSpy;
  getTrackSpy;
  searchTrackSpy;

  mockObservable;
  fakeResponse;

  constructor() {
    super(AppService);

    this.fakeResponse = null;
    this.getAlbumSpy = this.spy('getAlbum').andReturn(this);
    this.getArtistSpy = this.spy('getArtist').andReturn(this);
    this.getTrackSpy = this.spy('getTrack').andReturn(this);
    this.searchTrackSpy = this.spy('searchTrack').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void{
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
    return [{
      provide: AppService, 
      useValue: this
    }];
  }

}