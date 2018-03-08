import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  inject,
  fakeAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActivatedRoute,
  Router,
  Routes,
  provideRoutes,
} from '@angular/router';
import { Location } from '@angular/common';

import { ArtistsComponent } from './artists.component';
import { AppService } from '../app.service';
import { AppServiceMock } from '../app.serviceMock';
import { AppModuleTest } from '../app.moduleTest';
import { routes } from '../app-routing.module';
const routerConfig = routes;
import {
  RootCmp,
  advance,
  createRoot,
  configureTestModule,
} from '../shared/test';

describe('ArtistsComponent', () => {
  let component: ArtistsComponent;
  let fixture: ComponentFixture<ArtistsComponent>;
  const appServiceMock = new AppServiceMock();

  beforeEach(async(() => {

    configureTestModule({
      MockService: AppServiceMock, 
      routerConfig, 
      TestModule: AppModuleTest
    });

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initialization', () => {
    it('retrieve the artist', fakeAsync(
      inject([Router, AppService], 
        (router: Router, 
          appServiceMock: AppServiceMock) => {
          const f = createRoot(router, RootCmp);
          router.navigateByUrl('/artists/2');
          advance(f);

          expect(appServiceMock.getArtistSpy)
            .toHaveBeenCalledWith('2');
      })
    ));
  });

  /** @desc
  * 测试 路由器
  * the most important is :
  * artist.back();
  */
  describe('back', () => {
    it('router: go back to previous', fakeAsync(() => {
      inject([Router, Location], (router: Router, location: Location) => {
        const f = createRoot(router, RootCmp);
        expect(location.path()).toEqual('/');

        router.navigateByUrl('/artists/2');
        advance(f);
        expect(location.path()).toEqual('/artists/2');

        const artist = f.debugElement.children[1].componentInstance;
        artist.back();
        advance(f);

        expect(location.path()).toEqual('/');
      });
    }));
  });

  /**
  * @desc: 测试dom
  */
  describe('renderArtist', () => {
    it('render album info', fakeAsync(
      inject([Router, AppService], 
        (router: Router, apiServiceMock: AppServiceMock) => {
          const f = createRoot(router, RootCmp);

          let artist = {
            name: 'Rock Wang',
            images: [{url: 'IMAGE_1'}]
          };
          // TODO: DI if necessary
          apiServiceMock.setResponse(artist);

          router.navigateByUrl('/artists/2');
          advance(f);

          const compiled = f.debugElement.nativeElement;
          const h1 = compiled.querySelector('h1');
          const img = compiled.querySelector('img');

          expect(h1.innerHTML).toContain(artist.name);
          expect(img.src).toContain(artist.images[0].url);
        })
    ));
  });
});
