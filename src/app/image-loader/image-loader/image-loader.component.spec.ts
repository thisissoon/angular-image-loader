import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { WindowRef } from '@thisissoon/angular-inviewport';

import { ImageLoaderComponent } from './image-loader.component';
import { ResponsiveImage } from '../shared/image.model';
import { Breakpoint } from '../shared/breakpoint.model';
import { ImageLoadedEvent } from '../shared/image-loaded-event.model';

describe('ImageLoaderComponent', () => {
  let fixture: ComponentFixture<ImageLoaderComponent>;
  let component: ImageLoaderComponent;
  const sizes: Breakpoint[] = [
    { size: 'xs', width: 0},
    { size: 'md', width: 768},
    { size: 'lg', width: 992},
  ];
  let testBed;

  const image: ResponsiveImage = {
    placeholder: 'http://via.placeholder.com/35x15?text=placeholder',
    fallback: 'http://via.placeholder.com/350x150?text=fallback',
    images: [
      {
        size: 'xs',
        x1: 'http://via.placeholder.com/150x350?text=xs+1x',
        x2: 'http://via.placeholder.com/300x700?text=xs+2x'
      },
      {
        size: 'md',
        x1: 'http://via.placeholder.com/350x250?text=md+1x',
        x2: 'http://via.placeholder.com/700x500?text=md+2x'
      },
      {
        size: 'lg',
        x1: 'http://via.placeholder.com/700x400?text=lg+1x',
        x2: 'http://via.placeholder.com/1400x800?text=lg+2x'
      }
    ]
  };

  beforeEach(async(() => {
    testBed = TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [
        ImageLoaderComponent
      ],
      providers: [
        WindowRef
      ],
    });

    testBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageLoaderComponent);
    component = fixture.debugElement.componentInstance;
    component.image = image;
    component.sizes = sizes;
    fixture.detectChanges();
  });

  it('should update size based on window ref object on init', () => {
    expect(component.size).toEqual('xs');
  });

  it('should set placeholder on init', () => {
    const spy = spyOn(component, 'setPlaceholder');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should fire placeholder loaded event on image load when loaded is false', () => {
    const spy = spyOn(component.placeholderLoaded, 'emit');
    component.loaded = false;
    const imageElement = fixture.debugElement.query(By.css('img'));
    imageElement.triggerEventHandler('load', null);
    expect(spy).toHaveBeenCalled();
  });

  it('should set supportsSrcSet value', () => {
    component.supportsSrcSet = false;
    component.inViewport = true;
    component.loaded = false;
    const img = document.createElement('img');
    let srcSupport = false;
    if ('srcset' in img) {
      srcSupport = true;
    }
    component.preloadImage();
    expect(component.supportsSrcSet).toEqual(srcSupport);
  });

  it('should preload image if in viewport', () => {
    const spy = spyOn(component, 'preloadImage');
    component.supportsSrcSet = false;
    component.size = 'xs';
    component.loaded = false;
    component.onInViewportChange(true);
    expect(spy).toHaveBeenCalled();
  });

  it('should NOT preload image if NOT in viewport', () => {
    component.supportsSrcSet = false;
    component.size = 'xs';
    component.loaded = false;
    component.onInViewportChange(false);
    expect(component.preloadSrc).toEqual('');
  });

  it('should set correct device size', () => {
    component.size = 'xs';
    component.onWidthChange(900);
    expect(component.size).toEqual('md');

    component.onWidthChange(992);
    expect(component.size).toEqual('lg');

    component.onWidthChange(320);
    expect(component.size).toEqual('xs');
  });

  it('should set placeholder image as empty string', () => {
    component.image = null;
    component.src = '';
    component.setPlaceholder();
    expect(component.src).toEqual('');
  });

  it('should preload image', () => {
    component.inViewport = true;
    component.supportsSrcSet = false;
    component.size = 'xs';
    component.loaded = false;
    component.img.nativeElement = { src: null };
    component.preloadImage();
    expect(component.preloadSrc).toEqual('http://via.placeholder.com/150x350?text=xs+1x');

    component.supportsSrcSet = true;
    component.preloadImage();
    expect(component.preloadSrcset)
      .toEqual('http://via.placeholder.com/150x350?text=xs+1x 1x, http://via.placeholder.com/300x700?text=xs+2x 2x');
  });

  it('should set src to preloaded image url', () => {
    component.inViewport = true;
    component.supportsSrcSet = false;
    component.size = 'xs';
    component.loaded = false;
    component.img.nativeElement = { src: null };
    component.preloadImage();
    expect(component.preloadSrc).toEqual('http://via.placeholder.com/150x350?text=xs+1x');

    component.onImagePreload();
    expect(component.src).toEqual('http://via.placeholder.com/150x350?text=xs+1x');

    component.supportsSrcSet = true;
    component.loaded = false;
    component.preloadImage();
    expect(component.preloadSrcset)
      .toEqual('http://via.placeholder.com/150x350?text=xs+1x 1x, http://via.placeholder.com/300x700?text=xs+2x 2x');

    component.onImagePreload();
    expect(component.srcset)
      .toEqual('http://via.placeholder.com/150x350?text=xs+1x 1x, http://via.placeholder.com/300x700?text=xs+2x 2x');
  });

  it('should emit a full res loaded event on image load when loaded is true', () => {
    component.src = image.images[0].x1;
    component.srcset = `${image.images[0].x1} x1, ${image.images[0].x2} x2`;
    const spy = spyOn(component.imageLoaded, 'emit');
    component.loaded = true;
    const imageElement = fixture.debugElement.query(By.css('img'));
    const event = new Event('load');
    imageElement.triggerEventHandler('load', event);
    expect(spy).toHaveBeenCalledWith({
      $event: event,
      src: component.src,
      srcset: component.srcset
    });
  });

  it('should complete observable', () => {
    const spy = spyOn(component.ngUnsubscribe$, 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should load fallback image', () => {
    component.src = '';
    component.preloadSrc = 'someurl';
    component.onImagePreloadError();
    expect(component.src).toEqual(image.fallback);
  });

  it('should NOT load fallback image', () => {
    component.src = '';
    component.preloadSrc = '';
    component.preloadSrcset = '';
    component.onImagePreloadError();
    expect(component.src).toEqual('');
  });

});
