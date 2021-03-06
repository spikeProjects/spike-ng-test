/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />

import * as path from 'path';
import {
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';
import { 
  tick,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import { 
	Router,
	provideRoutes, 
	ActivatedRoute 
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing'
// import { jasmine } from 'jasmine-core';

import { environment } from '../../../environments/environment';

export const makeUrl = (url) => path.join(environment.apiUrl, url);

export function expectURL(backend: MockBackend, url: string, expect?) {
	backend.connections.subscribe(c => {
	  expect(c.request.url).toBe(url);
	  let response = new ResponseOptions({body: '{"name": "felipe"}'});
	  c.mockRespond(new Response(response));
	});
}

/**
* @desc: MockService.prototype must contents: getProviders() to provide dependances
* @param: 
* MockService is a constructored Class
* routerConfig is a routes
* TestBed
* TestModule is a module config
*/
export function configureTestModule({
	MockService, routerConfig, TestModule
}) {
  const mockService = new MockService();

  TestBed.configureTestingModule({
    imports: [
      { // TODO RouterTestingModule.withRoutes coming soon
        ngModule: RouterTestingModule,
        providers: [provideRoutes(routerConfig)]
      },
      TestModule
    ],
    providers: [
      mockService.getProviders(),
      {
        provide: ActivatedRoute,
        useFactory: (r: Router) => r.routerState.root, deps: [ Router ]
      }
    ]
  }).compileComponents();
}


export interface GuinessCompatibleSpy extends jasmine.Spy {
  /** By chaining the spy with and.returnValue, all calls to the function will return a specific
   * value. */
  andReturn(val: any): void;
  /** By chaining the spy with and.callFake, all calls to the spy will delegate to the supplied
   * function. */
  andCallFake(fn: Function): GuinessCompatibleSpy;
  /** removes all recorded calls */
  reset();
}

export class SpyObject {
  constructor(type = null) {
    if (type) {
      for (var prop in type.prototype) {
        var m = null;
        try {
          m = type.prototype[prop];
        } catch (e) {
          // As we are creating spys for abstract classes,
          // these classes might have getters that throw when they are accessed.
          // As we are only auto creating spys for methods, this
          // should not matter.
        }
        if (typeof m === 'function') {
          this.spy(prop);
        }
      }
    }
  }
  // Noop so that SpyObject has the same interface as in Dart
  noSuchMethod(args) {}

  spy(name) {
    if (!this[name]) {
      this[name] = this._createGuinnessCompatibleSpy(name);
    }
    return this[name];
  }

  prop(name, value) { this[name] = value; }

  /** @internal */
  _createGuinnessCompatibleSpy(name): GuinessCompatibleSpy {
    var newSpy: GuinessCompatibleSpy = <any>jasmine.createSpy(name);
    newSpy.andCallFake = <any>newSpy.and.callFake;
    newSpy.andReturn = <any>newSpy.and.returnValue;
    newSpy.reset = <any>newSpy.calls.reset;
    // revisit return null here (previously needed for rtts_assert).
    newSpy.and.returnValue(null);
    return newSpy;
  }
}


export function advance(fixture: ComponentFixture<any>): void {
  tick();
  fixture.detectChanges();
}

export function createRoot(router: Router,
                           componentType: any): ComponentFixture<any> {
  const f = TestBed.createComponent(componentType);
  advance(f);
  (<any>router).initialNavigation();
  advance(f);
  return f;
}
