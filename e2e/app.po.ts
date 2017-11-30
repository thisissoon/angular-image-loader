import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  scrollTo(x: number = 0, y: number = 0) {
    browser.executeScript(`window.scrollTo(${x}, ${y})`);
    browser.sleep(200);
  }

  setWindowSize(x: number, y: number) {
    browser.driver.manage().window().setSize(x, y);
    browser.sleep(200);
  }

  getImageLoaderComp() {
    return element(by.css('sn-image-loader'));
  }

  getImageElement() {
    return element(by.css('sn-image-loader .foo'));
  }
}
