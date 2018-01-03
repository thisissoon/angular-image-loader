import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  scrollTo(x: number = 0, y: number = 0) {
    return browser.executeScript(`window.scrollTo(${x}, ${y})`);
  }

  setWindowSize(x: number, y: number) {
    return browser.driver.manage().window().setSize(x, y);
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
