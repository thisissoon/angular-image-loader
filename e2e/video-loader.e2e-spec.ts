import { AppPage } from './app.po';
import { browser } from 'protractor';
import { video } from '../src/app/app-data';

describe('VideoLoader Lib E2E Tests', function () {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    page.scrollTo();
  });

  afterEach(() => {
    // ensure no errors appear in console
    browser.manage()
      .logs()
      .get('browser')
      .then((browserLog) => {
        expect(browserLog).toEqual([]);
      });
  });

  describe('video not in viewport', () => {
    beforeEach(() => page.setWindowSize(400, 580));

    it('should not load video', () => {
      expect(page.isVideoLoaded()).toBeFalsy();
    });

  });

  describe('video in viewport', () => {
    beforeEach(() => page.setWindowSize(400, 580));

    it('should load video when in viewport', () => {
      expect(page.isVideoLoaded()).toBeFalsy();

      page.scrollToVideoElement();

      expect(page.isVideoLoaded()).toBeTruthy();
      expect(page.getVideoSrc()).toEqual(video.videos[0].url);
    });

  });

  describe('responsive video', () => {

    it('should load correct video for "xs" device size', () => {
      page.setWindowSize(400, 580);
      page.scrollToVideoElement();

      expect(page.isVideoLoaded()).toBeTruthy();
      expect(page.getVideoSrc()).toEqual(video.videos[0].url);
    });

    it('should load correct video for "md" device size', () => {
      page.setWindowSize(768, 580);
      page.scrollToVideoElement();

      expect(page.isVideoLoaded()).toBeTruthy();
      expect(page.getVideoSrc()).toEqual(video.videos[1].url);
    });

    it('should load correct video for "lg" device size', () => {
      page.setWindowSize(1024, 580);
      page.scrollToVideoElement();

      expect(page.isVideoLoaded()).toBeTruthy();
      expect(page.getVideoSrc()).toEqual(video.videos[2].url);
    });

  });

});
