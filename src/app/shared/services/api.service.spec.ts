import { TestBed, inject } from '@angular/core/testing';
import {
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import { ApiService } from './api.service';
import { ApiServiceMock } from './api.service.mock';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        ApiServiceMock,
        { provide: Http,
          useFactory: (backend: ConnectionBackend,
                       defaultOptions: BaseRequestOptions) => {
                         return new Http(backend, defaultOptions);
                       }, deps: [MockBackend, BaseRequestOptions] 
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

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
