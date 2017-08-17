import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ImageLoaderComponent } from './image-loader.component';
import { Breakpoint, ResponsiveImage } from './image.model';

describe('ImageLoaderComponent', () => {
  let fixture: ComponentFixture<ImageLoaderComponent>;
  let component: ImageLoaderComponent;
  let sizes: Breakpoint[] = [
    { size: 'xs', width: 0},
    { size: 'md', width: 768},
    { size: 'lg', width: 992},
  ];

  let image: ResponsiveImage = {
    placeholder: 'http://via.placeholder.com/35x15?text=placeholder',
    fallback: 'http://via.placeholder.com/350x150?text=fallback',
    xs: {
      '@1x': 'http://via.placeholder.com/150x350?text=xs+1x',
      '@2x': 'http://via.placeholder.com/300x700?text=xs+2x'
    },
    md: {
      '@1x': 'http://via.placeholder.com/350x250?text=md+1x',
      '@2x': 'http://via.placeholder.com/700x500?text=md+2x'
    },
    lg: {
      '@1x': 'http://via.placeholder.com/700x400?text=lg+1x',
      '@2x': 'http://via.placeholder.com/1400x800?text=lg+2x'
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [
        ImageLoaderComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageLoaderComponent);
    component = fixture.debugElement.componentInstance;
    component.image = image;
    component.sizes = sizes;
    fixture.detectChanges();
  });

  it('should set placeholder on init', () => {
    const spy = spyOn(component, 'setPlaceholder');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should set supportsSrcSet value', () => {
    component.supportsSrcSet = false;
    const img = document.createElement('img');
    let srcSupport = false;
    if ('srcset' in img) {
      srcSupport = true;
    }
    component.ngAfterViewInit();
    expect(component.supportsSrcSet).toEqual(srcSupport);
  });

  it('should preload image if in viewport', () => {
    const spy = spyOn(component, 'preloadImage');
    component.supportsSrcSet = false;
    component.size = 'xs';
    component.loaded = false;
    component.onInViewportChange(true);
    expect(spy).toHaveBeenCalled(); ;
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

  it('should emit next value of observable', () => {
    const spy = spyOn(component.width$, 'next');
    component.onResize(992);
    expect(spy).toHaveBeenCalledWith(992);
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

  it('should complete observable', () => {
    const spy = spyOn(component.ngUnsubscribe$, 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
