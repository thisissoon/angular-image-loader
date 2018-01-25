import { Component } from '@angular/core';
import { ResponsiveImage, Breakpoint, Size } from './image-loader';
import { ImageLoadedEvent } from './image-loader/shared';

@Component({
  selector: 'sn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sizes: Breakpoint[] = [
    { size: 'xs', width: 0 },
    { size: 'md', width: 768 },
    { size: 'lg', width: 992 },
  ];

  image: ResponsiveImage = {
    placeholder: 'http://via.placeholder.com/40x40?text=placeholder',
    fallback: 'http://via.placeholder.com/400x400?text=fallback',
    images: [
      {
        size: 'xs',
        x1: 'http://via.placeholder.com/400x400?text=xs+1x',
        x2: 'http://via.placeholder.com/800x800?text=xs+2x'
      },
      {
        size: 'md',
        x1: 'http://via.placeholder.com/768x400?text=md+1x',
        x2: 'http://via.placeholder.com/1536x800?text=md+2x'
      },
      {
        size: 'lg',
        x1: 'http://via.placeholder.com/1024x400?text=lg+1x',
        x2: 'http://via.placeholder.com/2048x800?text=lg+2x'
      }
    ]
  };

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
