import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  scrollTo(x: number = 0, y: number = 0) {
    browser.executeScript(`return window.scrollTo(${x}, ${y});`);
    return browser.wait(() =>
      this.getScrollYPosition()
        .then((posY) => posY === y));
  }

  setWindowSize(x: number, y: number) {
    browser.driver.manage().window().setSize(x, y);
    return browser.wait(() =>
      this.getWindowSize()
        .then((size: any) => size.height === y && size.width === x));
  }

  getWindowSize() {
    return browser.executeScript(`return { height: window.outerHeight, width: window.outerWidth };`);
  }

  getScrollYPosition() {
    return browser.executeScript('return window.pageYOffset;');
  }

  getImageTopLoaderComp() {
    return element(by.css('.sn-image-loader--top'));
  }

  getImageBottomLoaderComp() {
    return element(by.css('.sn-image-loader--bottom'));
  }

  getImageTopElement() {
    return element(by.css('.sn-image-loader--top .img'));
  }

  getImageBottomElement() {
    return element(by.css('.sn-image-loader--bottom .img'));
  }

  getLoadedImageBottomElement() {
    return element(by.css('.sn-image-loader--bottom.sn-image-loaded')).isPresent();
  }

  getLoadedImageTopElement() {
    return element(by.css('.sn-image-loader--top.sn-image-loaded')).isPresent();
  }

  getLoadedImageElementBySrcSet(srcSet) {
    return element(by.css(`.img--bottom[srcSet="${srcSet}"]`)).isPresent();
  }

  getBottomPlaceholderBooleanElement() {
    return element(by.css('.placeholder-boolean'));
  }

  getBottomFullResCountElement() {
    return element(by.css('.full-res-count'));
  }
}
