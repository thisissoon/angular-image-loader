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
    placeholder: 'http://via.placeholder.com/35x15?text=placeholder',
    fallback: 'http://via.placeholder.com/350x150?text=fallback',
    images: [
      {
        size: 'xs',
        x1: 'http://via.placeholder.com/150x350?text=xs+1x',
        x2: 'http://via.placeholder.com/300x700?text=xs+2x'
      },
      {
        size: 'md',
        x1: 'http://via.placeholder.com/350x250?text=md+1x',
        x2: 'http://via.placeholder.com/700x500?text=md+2x'
      },
      {
        size: 'lg',
        x1: 'http://via.placeholder.com/700x400?text=lg+1x',
        x2: 'http://via.placeholder.com/1400x800?text=lg+2x'
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
