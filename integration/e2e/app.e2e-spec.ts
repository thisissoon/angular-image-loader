import { browser, element, by } from 'protractor';

describe('ImageLoader Lib E2E Tests', function () {

  beforeEach(() => browser.get(''));

  beforeEach(() => browser.executeScript('window.scrollTo(0,0)'));

  afterEach(() => {
    browser.manage().logs().get('browser').then((browserLog: any[]) => {
      expect(browserLog).toEqual([]);
    });
  });

  describe('lazy load image', () => {
    beforeEach(() => browser.driver.manage().window().setSize(300, 580));

    it('should load image on when in viewport', () => {
      expect(element(by.css('sn-image-loader.sn-image-not-loaded')).isPresent()).toBeTruthy();
      expect
        (element(by.css('sn-image-loader.sn-image-not-loaded .foo'))
          .getAttribute('src'))
          .toEqual('http://via.placeholder.com/35x15?text=placeholder');
      browser.executeScript('window.scrollTo(0, window.innerHeight * 1.5)');
      browser.sleep(1000);
      expect(element(by.css('sn-image-loader.sn-image-loaded')).isPresent()).toBeTruthy();
      expect
        (element(by.css('sn-image-loader.sn-image-loaded .foo'))
          .getAttribute('srcset'))
          .toEqual('http://via.placeholder.com/150x350?text=xs+1x 1x, http://via.placeholder.com/300x700?text=xs+2x 2x');
    });
  });

  describe('responsive image', () => {
    beforeEach(() => browser.driver.manage().window().setSize(300, 580));

    it('should load correct image for device size', () => {
      browser.executeScript('window.scrollTo(0, window.innerHeight * 1.5)');
      browser.sleep(1000);
      expect(element(by.css('sn-image-loader.sn-image-loaded')).isPresent()).toBeTruthy();
      expect
        (element(by.css('sn-image-loader.sn-image-loaded .foo'))
          .getAttribute('srcset'))
          .toEqual('http://via.placeholder.com/150x350?text=xs+1x 1x, http://via.placeholder.com/300x700?text=xs+2x 2x');

      browser.driver.manage().window().setSize(768, 580);
      browser.sleep(1000);
      expect
        (element(by.css('sn-image-loader.sn-image-loaded .foo'))
          .getAttribute('srcset'))
          .toEqual('http://via.placeholder.com/350x250?text=md+1x 1x, http://via.placeholder.com/700x500?text=md+2x 2x');

      browser.driver.manage().window().setSize(1024, 580);
      browser.sleep(1000);
      expect
        (element(by.css('sn-image-loader.sn-image-loaded .foo'))
          .getAttribute('srcset'))
          .toEqual('http://via.placeholder.com/700x400?text=lg+1x 1x, http://via.placeholder.com/1400x800?text=lg+2x 2x');
    });
  });
});
