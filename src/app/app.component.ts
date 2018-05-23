import { Component } from '@angular/core';

import { Breakpoint } from './image-loader/shared/breakpoint.model';
import { ResponsiveImage, Size } from './image-loader/shared/image.model';
import { ImageLoadedEvent } from './image-loader/shared/image-loaded-event.model';
import { ResponsiveVideo } from './video-loader/shared/video.model';
import { video, image, sizes } from './app-data';

@Component({
  selector: 'sn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sizes: Breakpoint[] = sizes;
  image: ResponsiveImage = image;
  video: ResponsiveVideo = video;

  /**
   * Set to true on placeholder loaded event.
   *
   * @type {boolean}
   * @memberof AppComponent
   */
  placeholderLoaded = false;

  /**
   * Incremented on each image load event.
   *
   * @type {number}
   * @memberof AppComponent
   */
  imageLoadedEventCount = 0;

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
  public onImageLoad(imageLoadedEvent: ImageLoadedEvent) {
    this.imageLoadedEventCount++;
  }
}
