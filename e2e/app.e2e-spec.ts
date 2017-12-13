import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('ImageLoader Lib E2E Tests', function () {
  let page: AppPage;

  const browserWaitTimeout = 10000;

  beforeEach(() => page = new AppPage());

  beforeEach(() => page.navigateTo());

  beforeEach(() => page.scrollTo());

  afterEach(() => {
    browser.manage().logs().get('browser').then((browserLog: any[]) => {
      expect(browserLog).toEqual([]);
    });
  });

  describe('placeholder image', () => {
    beforeEach(() => page.setWindowSize(300, 580));

    it('should load placeholder image', () => {
      expect(page.getImageElement().getAttribute('src')).toEqual('http://via.placeholder.com/35x15?text=placeholder');
    });

    it('should update placeholder loaded boolean on init', () => {
      expect(page.getplaceholderBooleanElement().getText()).toEqual('true');
    });
  });

  describe('lazy load image', () => {
    beforeEach(() => page.setWindowSize(300, 580));

    it('should load image on when in viewport', () => {
      let imageLoaderCompClass = page.getImageLoaderComp().getAttribute('class');
      let imgSrc = page.getImageElement().getAttribute('src');
      expect(imageLoaderCompClass).toContain('sn-image-not-loaded');
      expect(imgSrc).toEqual('http://via.placeholder.com/35x15?text=placeholder');

      page.scrollTo(0, 580 * 1.5)
        .then(() => {
          browser.wait(() => page.getLoadedImageElement());
        });

      imageLoaderCompClass = page.getImageLoaderComp().getAttribute('class');
      imgSrc = page.getImageElement().getAttribute('srcset');
      expect(imageLoaderCompClass).toContain('sn-image-loaded');
      expect(imgSrc).toEqual('http://via.placeholder.com/150x350?text=xs+1x 1x, http://via.placeholder.com/300x700?text=xs+2x 2x');

    });

    it('should update full res image event count on when in viewport', () => {
      expect(page.getFullResCountElement().getText()).toEqual('0');

      page.scrollTo(0, 580 * 1.5)
        .then(() => {
          browser.wait(() => page.getLoadedImageElement());
        });

      expect(page.getFullResCountElement().getText()).toEqual('1');
    });

  });

  describe('responsive image', () => {
    beforeEach(() => page.setWindowSize(300, 580));

    it('should load correct image for device size', () => {
      page.scrollTo(0, 580 * 1.5)
        .then(() => {
          browser.wait(() => page.getLoadedImageElement());
        });

      const imageLoaderCompClass = page.getImageLoaderComp().getAttribute('class');
      let imgSrc = page.getImageElement().getAttribute('srcset');
      expect(imageLoaderCompClass).toContain('sn-image-loaded');
      expect(imgSrc).toEqual('http://via.placeholder.com/150x350?text=xs+1x 1x, http://via.placeholder.com/300x700?text=xs+2x 2x');

      page.setWindowSize(768, 580)
        .then(() => {
          browser.wait(() => page.getLoadedImageElementBySrcSet(
            'http://via.placeholder.com/350x250?text=md+1x 1x, http://via.placeholder.com/700x500?text=md+2x 2x'
          ), browserWaitTimeout);
        });

      imgSrc = page.getImageElement().getAttribute('srcset');
      expect(imgSrc).toEqual('http://via.placeholder.com/350x250?text=md+1x 1x, http://via.placeholder.com/700x500?text=md+2x 2x');

      page.setWindowSize(1024, 580)
        .then(() => {
          browser.wait(() => page.getLoadedImageElementBySrcSet(
            'http://via.placeholder.com/700x400?text=lg+1x 1x, http://via.placeholder.com/1400x800?text=lg+2x 2x'
          ), browserWaitTimeout);
        });

      imgSrc = page.getImageElement().getAttribute('srcset');
      expect(imgSrc).toEqual('http://via.placeholder.com/700x400?text=lg+1x 1x, http://via.placeholder.com/1400x800?text=lg+2x 2x');
    });

    it('should update image loaded event count on window resize when image in viewport', () => {
      expect(page.getFullResCountElement().getText()).toEqual('0');

      page.scrollTo(0, 580 * 1.5)
        .then(() => {
          browser.wait(() => page.getLoadedImageElement());
        });

      expect(page.getFullResCountElement().getText()).toEqual('1');

      page.setWindowSize(768, 580)
        .then(() => {
          browser.wait(() => page.getLoadedImageElementBySrcSet(
            'http://via.placeholder.com/350x250?text=md+1x 1x, http://via.placeholder.com/700x500?text=md+2x 2x'
          ), browserWaitTimeout);
        });
      expect(page.getFullResCountElement().getText()).toEqual('2');

      page.setWindowSize(1024, 580)
        .then(() => {
          browser.wait(() => page.getLoadedImageElementBySrcSet(
            'http://via.placeholder.com/700x400?text=lg+1x 1x, http://via.placeholder.com/1400x800?text=lg+2x 2x'
          ), browserWaitTimeout);
        });
      expect(page.getFullResCountElement().getText()).toEqual('3');
    });

  });

});

