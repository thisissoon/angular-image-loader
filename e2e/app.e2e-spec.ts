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
      expect(page.getImageBottomElement().getAttribute('src')).toEqual('http://via.placeholder.com/35x15?text=placeholder');
    });

    it('should update placeholder loaded boolean on init', () => {
      expect(page.getBottomPlaceholderBooleanElement().getText()).toEqual('true');
    });
  });

  describe('inviewport image on load', () => {
    beforeEach(() => page.setWindowSize(300, 580));

    it('should load full res image if image is in viewport on page load', () => {

      page.setWindowSize(300, 580);
      browser.wait(() => page.getLoadedImageTopElement());

      const imageLoaderCompClass = page.getImageTopLoaderComp().getAttribute('class');
      const imgSrc = page.getImageTopElement().getAttribute('srcset');
      expect(imageLoaderCompClass).toContain('sn-image-loaded');
      expect(imgSrc).toEqual('http://via.placeholder.com/150x350?text=xs+1x 1x, http://via.placeholder.com/300x700?text=xs+2x 2x');


    });

  });

  describe('lazy load image', () => {
    beforeEach(() => page.setWindowSize(300, 580));

    it('should load image when scrolled into viewport', () => {
      let imageLoaderCompClass = page.getImageBottomLoaderComp().getAttribute('class');
      let imgSrc = page.getImageBottomElement().getAttribute('src');
      expect(imageLoaderCompClass).toContain('sn-image-not-loaded');
      expect(imgSrc).toEqual('http://via.placeholder.com/35x15?text=placeholder');

      page.scrollTo(0, 580 * 2);
      browser.wait(() => page.getLoadedImageBottomElement());

      imageLoaderCompClass = page.getImageBottomLoaderComp().getAttribute('class');
      imgSrc = page.getImageBottomElement().getAttribute('srcset');
      expect(imageLoaderCompClass).toContain('sn-image-loaded');
      expect(imgSrc).toEqual('http://via.placeholder.com/150x350?text=xs+1x 1x, http://via.placeholder.com/300x700?text=xs+2x 2x');

    });

    it('should update full res image event count scroll into viewport', () => {
      expect(page.getBottomFullResCountElement().getText()).toEqual('0');

      page.scrollTo(0, 580 * 2);
      browser.wait(() => page.getLoadedImageBottomElement());
      expect(page.getBottomFullResCountElement().getText()).toEqual('1');
    });

  });

  describe('responsive image', () => {

    it('should load correct image for "xs" device size', () => {
      page.setWindowSize(300, 580);
      page.scrollTo(0, 580 * 2);
      browser.wait(() => page.getLoadedImageBottomElement());
      const imageLoaderCompClass = page.getImageBottomLoaderComp().getAttribute('class');
      const imgSrc = page.getImageBottomElement().getAttribute('srcset');
      expect(imageLoaderCompClass).toContain('sn-image-loaded');
      expect(imgSrc).toEqual('http://via.placeholder.com/150x350?text=xs+1x 1x, http://via.placeholder.com/300x700?text=xs+2x 2x');
    });

    it('should load correct image for "md" device size', () => {
      page.setWindowSize(768, 580);
      page.scrollTo(0, 580 * 2.5);
      browser.wait(() => page.getLoadedImageBottomElement());

      const imgSrc = page.getImageBottomElement().getAttribute('srcset');
      expect(imgSrc).toEqual('http://via.placeholder.com/350x250?text=md+1x 1x, http://via.placeholder.com/700x500?text=md+2x 2x');
    });

    it('should load correct image for "lg" device size', () => {
      page.setWindowSize(1024, 580);
      page.scrollTo(0, 580 * 2);
      browser.wait(() => page.getLoadedImageBottomElement());

      const imgSrc = page.getImageBottomElement().getAttribute('srcset');
      expect(imgSrc).toEqual('http://via.placeholder.com/700x400?text=lg+1x 1x, http://via.placeholder.com/1400x800?text=lg+2x 2x');
    });

    it('should update image loaded event count on window resize when image in viewport', () => {
      expect(page.getBottomFullResCountElement().getText()).toEqual('0');

      page.setWindowSize(320, 580);
      page.scrollTo(0, 580 * 3);
      browser.wait(() => page.getLoadedImageBottomElement());
      expect(page.getBottomFullResCountElement().getText()).toEqual('1');

      page.setWindowSize(768, 580);
      page.scrollTo(0, 580 * 3);
      browser.wait(() => page.getLoadedImageBottomElement());
      expect(page.getBottomFullResCountElement().getText()).toEqual('2');

      page.setWindowSize(1024, 580);
      page.scrollTo(0, 580 * 3);
      browser.wait(() => page.getLoadedImageBottomElement());
      expect(page.getBottomFullResCountElement().getText()).toEqual('3');
    });

  });

});

