import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  scrollTo(x: number = 0, y: number = 0) {
    browser.executeScript(`return window.scrollTo(${x}, ${y});`);
    return browser.wait(() =>
      this.getScrollYPosition().then(posY => posY === y)
    );
  }

  scrollIntoView(selector: string) {
    return browser.executeScript(
      `return document.querySelector('${selector}').scrollIntoView()`
    );
  }

  scrollToImageTopElement() {
    this.scrollIntoView('.sn-image-loader--top');
    return this.waitForImageTopElementLoaded();
  }

  scrollToImageBottomElement() {
    this.scrollIntoView('.sn-image-loader--bottom');
    return this.waitForImageBottomElementLoaded();
  }

  scrollToVideoElement() {
    this.scrollIntoView('sn-video-loader');
    return this.waitForVideoLoaded();
  }

  setWindowSize(x: number, y: number) {
    browser.driver
      .manage()
      .window()
      .setSize(x, y);
    return browser.wait(() =>
      this.getWindowSize().then(
        (size: any) => size.height === y && size.width === x
      )
    );
  }

  getWindowSize() {
    return browser.executeScript(
      `return { height: window.outerHeight, width: window.outerWidth };`
    );
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

  getImageTopLoaderCompClass() {
    return this.getImageTopLoaderComp().getAttribute('class');
  }

  getImageBottomLoaderCompClass() {
    return this.getImageBottomLoaderComp().getAttribute('class');
  }

  getImageTopElement() {
    return element(by.css('.sn-image-loader--top .img'));
  }

  getImageBottomElement() {
    return element(by.css('.sn-image-loader--bottom .img'));
  }

  getImageTopElementSrc() {
    return this.getImageTopElement().getAttribute('src');
  }

  getImageTopElementSrcSet() {
    return this.getImageTopElement().getAttribute('srcset');
  }

  getImageBottomElementSrc() {
    return this.getImageBottomElement().getAttribute('src');
  }

  getImageBottomElementSrcSet() {
    return this.getImageBottomElement().getAttribute('srcset');
  }

  getImageBottomPlaceholderLoadedElement() {
    return element(by.css('.placeholder-loaded'));
  }

  getImageBottomPlaceholderLoadedElementText() {
    return this.getImageBottomPlaceholderLoadedElement().getText();
  }

  getImageBottomLoadedCountElement() {
    return element(by.css('.image-loaded-count'));
  }

  getImageBottomLoadedCountElementText() {
    return this.getImageBottomLoadedCountElement().getText();
  }

  getVideoElement() {
    return element(by.css('sn-video-loader'));
  }

  getVideoSrc() {
    return element(by.css('sn-video-loader video')).getAttribute('src');
  }

  getVideoElementClass() {
    return this.getVideoElement().getAttribute('class');
  }

  isImageTopLoaded() {
    return this.getImageTopLoaderCompClass().then((result: string) =>
      result.includes('sn-image-loaded')
    );
  }

  isImageBottomLoaded() {
    return this.getImageBottomLoaderCompClass().then((result: string) =>
      result.includes('sn-image-loaded')
    );
  }

  isVideoLoaded() {
    return this.getVideoElementClass().then((result: string) =>
      result.includes('sn-video-loaded')
    );
  }

  waitForImageTopElementLoaded() {
    browser.wait(() => this.isImageTopLoaded());
  }

  waitForImageBottomElementLoaded() {
    browser.wait(() => this.isImageBottomLoaded());
  }

  waitForVideoLoaded() {
    return browser.wait(() => this.isVideoLoaded());
  }
}
