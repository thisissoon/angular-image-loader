import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InViewportModule } from '@thisissoon/angular-inviewport';

import { VideoLoaderComponent } from './video-loader.component';
import { video, sizes } from '../../app-data';

describe('VideoLoaderComponent', () => {
  let component: VideoLoaderComponent;
  let fixture: ComponentFixture<VideoLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [InViewportModule.forServer()],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [VideoLoaderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoLoaderComponent);
    component = fixture.componentInstance;
    component.video = video;
    component.sizes = sizes;
    fixture.detectChanges();
  });

  it('should update size based on window ref object on init', () => {
    expect(component.size).toEqual('xs');
  });

  it('should attempt to set src on AfterViewInit lifecycle hook', () => {
    const spy = spyOn(component, 'onWidthChange');
    component.ngAfterViewInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should load video if in viewport', () => {
    const spy = spyOn(component, 'loadVideo');
    component.size = 'xs';
    component.loaded = false;
    component.onInViewportChange(true);
    expect(spy).toHaveBeenCalled();
  });

  it('should NOT load video if NOT in viewport', () => {
    const spy = spyOn(component, 'loadVideo');
    component.size = 'xs';
    component.loaded = false;
    component.onInViewportChange(false);
    expect(spy).toHaveBeenCalled();
    expect(component.src).toEqual('');
  });

  it('should set loaded to true on video load event', () => {
    component.loaded = false;
    component.onVideoLoad();
    expect(component.loaded).toBeTruthy();
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

  it('should set video src as empty string', () => {
    component.video = null;
    component.inViewport = true;
    component.src = '';
    component.loadVideo();
    expect(component.src).toEqual('');
  });

  it('should load video', () => {
    component.inViewport = true;
    component.size = 'xs';
    component.loaded = false;
    component.loadVideo();
    expect(component.src).toEqual(video.videos[0].url);
  });

  it('should complete observable', () => {
    const spy = spyOn(component.ngUnsubscribe$, 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should set poster src', () => {
    const event = { src: 'foo' };
    component.poster = '';
    component.onImageLoad(event as any);
    expect(component.poster).toEqual('foo');
  });
});
