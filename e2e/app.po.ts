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

  getImageLoaderComp() {
    return element(by.css('sn-image-loader'));
  }

  getImageElement() {
    return element(by.css('sn-image-loader .foo'));
  }

  getLoadedImageElement() {
    return element(by.css('.sn-image-loaded')).isPresent();
  }

  getplaceholderBooleanElement() {
    return element(by.css('.placeholder-boolean'));
  }

  getFullResCountElement() {
    return element(by.css('.full-res-count'));
  }
}
