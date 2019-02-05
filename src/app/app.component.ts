import { Component, OnInit } from '@angular/core';

import { Breakpoint } from './image-loader/shared/breakpoint.model';
import { ResponsiveImage, Size } from './image-loader/shared/image.model';
import { ImageLoadedEvent } from './image-loader/shared/image-loaded-event.model';
import { ResponsiveVideo } from './video-loader/shared/video.model';
import { video, image, sizes } from './app-data';

@Component({
  selector: 'sn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  sizes: Breakpoint[] = sizes;
  image: ResponsiveImage = image;
  video: ResponsiveVideo = video;
  asyncImage: ResponsiveImage;

  /**
   * Set to true on placeholder loaded event.
   *
   * @type {boolean}
   * @memberof AppComponent
   */
  placeholderLoaded = false;

  /**
   * Set to true on placeholder loaded event.
   *
   * @type {boolean}
   * @memberof AppComponent
   */
  placeholderAsyncImageLoaded = false;

  /**
   * Incremented on each image load event.
   *
   * @type {number}
   * @memberof AppComponent
   */
  imageLoadedEventCount = 0;

  /**
   * Incremented on each async image load event.
   *
   * @type {number}
   * @memberof AppComponent
   */
  asyncImageLoadedEventCount = 0;

  /**
   * Increments event count on each image loaded event.
   * Counter displayed in component template.
   *
   * @memberof AppComponent
   */
  public onPlaceholderLoad(imageLoadedEvent: ImageLoadedEvent) {
    this.placeholderLoaded = true;
  }

  /**
   * Increments event count on each image loaded event.
   * Counter displayed in component template.
   *
   * @memberof AppComponent
   */
  public onAsyncImagePlaceholderLoad(imageLoadedEvent: ImageLoadedEvent) {
    this.placeholderAsyncImageLoaded = true;
  }

  /**
   * Increments event count on each image loaded event.
   * Counter displayed in component template.
   *
   * @memberof AppComponent
   */
  public onImageLoad(imageLoadedEvent: ImageLoadedEvent) {
    this.imageLoadedEventCount++;
  }

  /**
   * Increments event count on each image loaded event.
   * Counter displayed in component template.
   *
   * @memberof AppComponent
   */
  public onAsyncImageLoad(imageLoadedEvent: ImageLoadedEvent) {
    this.asyncImageLoadedEventCount++;
  }

  /**
   * Resets async image data and simulates loading
   *
   * @memberof AppComponent
   */
  public startAsyncLoading() {
    this.asyncImageLoadedEventCount = 0;
    this.placeholderAsyncImageLoaded = false;
    this.loadAsyncImageData();
  }

  ngOnInit() {
    this.asyncImage = {
      placeholder: image.placeholder,
      images: [],
      fallback: image.fallback,
    };
  }

  /**
   * Sets a placeholder for the image and simulates loading of image data (typically from some API endpoint)
   * After 3 seconds the image data is set
   */
  private loadAsyncImageData() {
    this.asyncImage = {
      placeholder: image.placeholder,
      images: [],
      fallback: image.fallback,
    };
    setTimeout(() => {
      this.asyncImage = image;
    }, 3000);
  }
}
