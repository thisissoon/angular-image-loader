import { browser, element, by } from 'protractor';

describe('ImageLoader Lib E2E Tests', function () {

  beforeEach(() => browser.get(''));

  beforeEach(() => browser.executeScript('window.scrollTo(0,0)'));

  afterEach(() => {
    browser.manage().logs().get('browser').then((browserLog: any[]) => {
      expect(browserLog).toEqual([]);
    });
  });

  // describe('lazy load image', () => {
  //   it('should load image on when in viewport', () => {

  //   });
  // });
});
