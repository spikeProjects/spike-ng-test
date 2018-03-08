import { 
  TestBed, 
  inject,
  fakeAsync,
  tick
} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';

import { AppService } from './app.service';
import { ApiService, ApiServiceMock } from './shared';
import { makeUrl, expectURL } from './shared/test';

describe('AppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        AppService,
        ApiServiceMock,
        { provide: Http,
          useFactory: (backend: ConnectionBackend,
                       defaultOptions: BaseRequestOptions) => {
                         return new Http(backend, defaultOptions);
                       }, 
          deps: [MockBackend, BaseRequestOptions] 
    	  },
        {
          provide: ApiService,
          useFactory: (http: Http) => {
          	return new ApiServiceMock(http);
          }, 
          deps: [Http]
        },
      ]
    });
  });



  it('should be created', inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy();
  }));

  describe('getTrack', () => {
  	it('retrieves using the track ID',
  	  inject([AppService, MockBackend], fakeAsync((svc, backend) => {
    		let res;
    		const trackId = 'TRACK_ID';
    		let url = makeUrl('tracks/' + trackId);
    		expectURL(backend, url, expect);
            
            svc.getTrack(trackId).subscribe((_res) => {
              res = _res;
            });
            tick();

            expect(res.name).toBe('felipe');
  	  }))
  	)
  });

  describe('getArtist', () => {
  	it('retrieve by using artist Id', 
  		inject([AppService, MockBackend], fakeAsync((svc, backend) => {
  			let res;
  			const artistId = 'ARTISTID';
  			const url = makeUrl('artists/' + artistId);
  			expectURL(backend, url, expect);

  			svc.getArtist(artistId).subscribe((_res) => {
  				res = _res;
  			});

  			tick();
  			expect(res.name).toBe('felipe');
  		}))
	  );
  });

  describe('getAlbum', () => {
  	it('retrieve using the track id', 
      inject([AppService, MockBackend], fakeAsync((svc, backend) => {
      	let res;
      	const albumId = 'ALBUMID';
      	const url = makeUrl('albums/' + albumId);
      	expectURL(backend, url, expect);

      	svc.getAlbum(albumId).subscribe((_res) => {
      		res = _res;
      	});
      	tick();

      	expect(res.name).toBe('felipe');
  	  }))
    )
  });

  describe('searchTrack', () => {
  	it('search by term', 
  		inject([AppService, MockBackend], fakeAsync((svc, backend) => {
  			let res;
  			const params = 'term';

  			// get this url from app.service.search();
  			const url = makeUrl('search?q=' + params + '&type=track');

  			expectURL(backend, url, expect);

  			svc.searchTrack(params).subscribe(_res => res = _res);
  			tick();

  			expect(res.name).toBe('felipe');

  		}))
	)
  })



});
