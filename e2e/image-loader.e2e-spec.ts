import { AppPage } from './app.po';
import { browser } from 'protractor';
import { image } from '../src/app/app-data';

describe('ImageLoader Lib E2E Tests', function () {
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

  describe('placeholder image', () => {
    beforeEach(() => page.setWindowSize(400, 580));

    it('should set src to placeholder image', () => {
      const result = page.getImageBottomElementSrc();
      const expected = image.placeholder;
      expect(result).toEqual(expected);
    });

    it('should set placeholder loaded text to true on init', () => {
      const result = page.getImageBottomPlaceholderLoadedElementText();
      const expected = 'true';
      expect(result).toEqual(expected);
    });
  });

  describe('image in viewport on page load', () => {
    beforeEach(() => page.setWindowSize(400, 580));

    it('should load image when in viewport on page load', () => {
      page.waitForImageTopElementLoaded();

      const resultLoaded = page.isImageTopLoaded();
      const resultSrcset = page.getImageTopElementSrcSet();
      const expectedSrcset = `${image.images[0].x1} 1x, ${image.images[0].x2} 2x`;
      expect(resultLoaded).toBeTruthy();
      expect(resultSrcset).toEqual(expectedSrcset);
    });

  });

  describe('lazy load image', () => {
    beforeEach(() => page.setWindowSize(400, 580));

    it('should load image when scrolled into viewport', () => {
      let resultLoaded = page.isImageBottomLoaded();
      let expectedLoaded = false;
      let resultSrc = page.getImageBottomElementSrc();
      let expectedSrc = image.placeholder;
      expect(resultLoaded).toEqual(expectedLoaded);
      expect(resultSrc).toEqual(expectedSrc);

      page.scrollToImageBottomElement();

      resultLoaded = page.isImageBottomLoaded();
      expectedLoaded = true;
      resultSrc = page.getImageBottomElementSrc();
      expectedSrc = image.images[0].x1;
      expect(resultLoaded).toEqual(expectedLoaded);
      expect(resultSrc).toEqual(expectedSrc);

    });

    it('should update image loaded count element when image scrolled into viewport', () => {
      expect(page.getImageBottomLoadedCountElementText()).toEqual('0');
      page.scrollToImageBottomElement();
      expect(page.getImageBottomLoadedCountElementText()).toEqual('1');
    });

  });

  describe('responsive image', () => {

    it('should load correct image for "xs" device size', () => {
      page.setWindowSize(400, 580);
      page.scrollToImageBottomElement();

      const resultLoaded = page.isImageBottomLoaded();
      const expectedLoaded = true;
      const resultSrcset = page.getImageBottomElementSrcSet();
      const expectedSrcset = `${image.images[0].x1} 1x, ${image.images[0].x2} 2x`;

      expect(resultLoaded).toEqual(expectedLoaded);
      expect(resultSrcset).toEqual(expectedSrcset);
    });

    it('should load correct image for "md" device size', () => {
      page.setWindowSize(768, 580);
      page.scrollToImageBottomElement();

      const resultLoaded = page.isImageBottomLoaded();
      const expectedLoaded = true;
      const resultSrcset = page.getImageBottomElementSrcSet();
      const expectedSrcset = `${image.images[1].x1} 1x, ${image.images[1].x2} 2x`;

      expect(resultLoaded).toEqual(expectedLoaded);
      expect(resultSrcset).toEqual(expectedSrcset);
    });

    it('should load correct image for "lg" device size', () => {
      page.setWindowSize(1024, 580);
      page.scrollToImageBottomElement();

      const resultLoaded = page.isImageBottomLoaded();
      const expectedLoaded = true;
      const resultSrcset = page.getImageBottomElementSrcSet();
      const expectedSrcset = `${image.images[2].x1} 1x, ${image.images[2].x2} 2x`;

      expect(resultLoaded).toEqual(expectedLoaded);
      expect(resultSrcset).toEqual(expectedSrcset);
    });

    it('should update image loaded event count on window resize when image in viewport', () => {
      let result = page.getImageBottomLoadedCountElementText();
      let expected = '0';
      expect(result).toEqual(expected);

      page.setWindowSize(400, 580);
      page.scrollToImageBottomElement();
      result = page.getImageBottomLoadedCountElementText();
      expected = '1';
      expect(result).toEqual(expected);

      page.setWindowSize(768, 580);
      page.scrollToImageBottomElement();
      result = page.getImageBottomLoadedCountElementText();
      expected = '2';
      expect(result).toEqual(expected);

      page.setWindowSize(1024, 580);
      page.scrollToImageBottomElement();
      result = page.getImageBottomLoadedCountElementText();
      expected = '3';
      expect(result).toEqual(expected);
    });

  });

});

