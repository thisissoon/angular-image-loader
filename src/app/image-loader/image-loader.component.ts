import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  HostBinding,
  HostListener,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/debounceTime';

import * as classes from './shared/classes';
import * as events from './shared/events';
import { ImageLoadedEvent, ResponsiveImage, RetinaImage, Size, Breakpoint, Retina } from './shared';
import { WindowRef } from '@thisissoon/angular-inviewport';

/**
 * A component that renders a `img` element with the correct image url
 * for the device size
 *
 * @example
 * ```
 * <sn-image-loader
 *   [image]="image"
 *   [sizes]="sizes"
 *   imgClass="foo"
 *   (imagePlaceholderLoaded)="onPlaceholderLoad($event)"
 *   (imageLoaded)="onFullResLoad($event)"
 *   alt="lorem ipsum">
 * </sn-image-loader>
 * ```
 *
 * @export
 * @class ImageLoaderComponent
 * @implements {OnInit}
 * @implements {AfterViewInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'sn-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: [ './image-loader.component.scss' ]
})
export class ImageLoaderComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * URL of image for `img` element to display
   * @type {string}
   * @memberof ImageLoaderComponent
   */
  public src = '';
  /**
   * srcset string for `img` element
   * @type {string}
   * @memberof ImageLoaderComponent
   */
  public srcset = '';
  /**
   * Alt tag for image
   * @type {string}
   * @memberof ImageLoaderComponent
   */
  @Input()
  public alt = '';
  /**
   * Classes to pass on to image element
   * @type {string}
   * @memberof ImageLoaderComponent
   */
  @Input()
  public imgClass = '';
  /**
   * URL of image to preload using a dummy image element
   * @type {string}
   * @memberof ImageLoaderComponent
   */
  public preloadSrc = '';
  /**
   * srcset value of retina image to preload using a dummy image
   * element
   * @type {string}
   * @memberof ImageLoaderComponent
   */
  public preloadSrcset = '';
  /**
   * List of image breakpoints
   * @type {Breakpoint[]}
   * @memberof ImageLoaderComponent
   */
  @Input()
  public sizes: Breakpoint[] = [
    { size: 'xs', width: 0},
    { size: 'sm', width: 576},
    { size: 'md', width: 768},
    { size: 'lg', width: 992},
    { size: 'xl', width: 1200}
  ];
  /**
   * Current size of image to display
   * @type {Size}
   * @memberof ImageLoaderComponent
   */
  public size: Size = 'xs';
  /**
   * Set of images for different viewports
   *
   * @type {ResponsiveImage}
   * @memberof ImageLoaderComponent
   */
  @Input()
  public image: ResponsiveImage;
  /**
   * If true means the element is inside the browser viewport
   *
   * @type {boolean}
   * @memberof ImageLoaderComponent
   */
  public inViewport: boolean;
  /**
   * Observable that emits the width of the viewport
   *
   * @memberof ImageLoaderComponent
   */
  public width$ = new Subject<number>();
  /**
   * Completes on component destroy lifecycle event
   * use to handle unsubscription from infinite observables
   *
   * @type {Subject<void>}
   * @memberof ImageLoaderComponent
   */
  public ngUnsubscribe$ = new Subject<void>();
  /**
   * Reference to dummy image element
   *
   * @type {ElementRef}
   * @memberof ImageLoaderComponent
   */
  @ViewChild('dummyImg')
  public dummyImg: ElementRef;
  /**
   * If true it means the browser supports `srcset`
   * @type {boolean}
   * @memberof ImageLoaderComponent
   */
  public supportsSrcSet = false;
  /**
   * Output for placeholder image loaded event.
   *
   * @type {EventEmitter}
   * @memberof ImageLoaderComponent
   */
  @Output()
  public imagePlaceholderLoaded: EventEmitter<ImageLoadedEvent> = new EventEmitter<ImageLoadedEvent>();
  /**
   * Output for full res image loaded event.
   *
   * @type {EventEmitter}
   * @memberof ImageLoaderComponent
   */
  @Output()
  public imageLoaded: EventEmitter<ImageLoadedEvent> = new EventEmitter<ImageLoadedEvent>();
  /**
   * If true means the image has not been loaded yet and
   * the placeholder image is currently displayed
   *
   * @type {boolean}
   * @memberof ImageLoaderComponent
   */
  @HostBinding(classes.loadedClass)
  public loaded = false;
  /**
   * If true means the image has not been loaded yet and
   * the placeholder image is currently displayed
   *
   * @readonly
   * @type {boolean}
   * @memberof ImageLoaderComponent
   */
  @HostBinding(classes.notLoadedClass)
  public get notLoaded(): boolean {
    return !this.loaded;
  }
  /**
   * Creates instance of component. Updates this.size
   * based on window width.
   *
   * @memberof ImageLoaderComponent
   */
  constructor(private windowRef: WindowRef) {
    this.onWidthChange(this.windowRef.innerWidth);
  }
  /**
   * Set placeholder image as image on component init
   *
   * @memberof ImageLoaderComponent
   */
  public ngOnInit(): void {
    this.setPlaceholder();
  }
  /**
   * Subscribe to `width$` observable to update device
   *
   * @memberof ImageLoaderComponent
   */
  public ngAfterViewInit(): void {
    const dummyImg: HTMLElement = this.dummyImg.nativeElement;
    if ('srcset' in dummyImg) {
      this.supportsSrcSet = true;
    }
    this.width$
      .takeUntil(this.ngUnsubscribe$)
      .debounceTime(10)
      .subscribe((width) => this.onWidthChange(width));
    this.width$.next(this.windowRef.innerWidth);
  }
  /**
   * If element is in viewport preload image by setting the src
   * of the dummy image element.
   *
   * @param {boolean} inViewport
   * @memberof ImageLoaderComponent
   */
  public onInViewportChange(inViewport: boolean): void {
    this.inViewport = inViewport;
    this.preloadImage();
  }
  /**
   * On width change, determine if device has changed and
   * reset directive
   *
   * @param {number} width
   * @memberof ImageLoaderComponent
   */
  public onWidthChange(width: number): void {
    const sizes = this.sizes.filter((size) => size.width <= width);
    const lastSize = sizes[sizes.length - 1];
    if (!this.size || this.size !== lastSize.size) {
      this.size = lastSize.size;
      this.setPlaceholder();
      this.preloadImage();
    }
  }
  /**
   * Event handler for window resize;
   *
   * @param {number} width
   * @memberof ImageLoaderComponent
   */
  @HostListener(events.eventResize, events.eventPathResize)
  public onResize(width: number) {
    this.width$.next(width);
  }
  /**
   * Set image to placeholder image
   *
   * @memberof ImageLoaderComponent
   */
  public setPlaceholder(): void {
    this.loaded = false;
    this.src = this.image ? this.image.placeholder : this.src;
  }
  /**
   * Trigger image preload if element is within viewport
   * and hasn't been preloaded
   *
   * @memberof ImageLoaderComponent
   */
  public preloadImage(): void {
    if (this.inViewport && this.notLoaded) {
      const imageNormal = this.image[this.size]['@1x'];
      const imageRetina = this.image[this.size]['@2x'];
      this.supportsSrcSet ?
        this.preloadSrcset = `${imageNormal} 1x, ${imageRetina} 2x` :
        this.preloadSrc = `${imageNormal}`;
    }
  }
  /**
   * When image has been preloaded set the src for the
   * main `img` element to replace the placeholder
   *
   * @memberof ImageLoaderComponent
   */
  public onImagePreload(): void {
    const imageNormal = this.image[this.size]['@1x'];
    const imageRetina = this.image[this.size]['@2x'];
    this.supportsSrcSet ?
      this.srcset = `${imageNormal} 1x, ${imageRetina} 2x` :
      this.src = this.preloadSrc;
    this.preloadSrc = '';
    this.loaded = true;
  }
  /**
   * When the main `img` element has loaded
   *
   * @memberof ImageLoaderComponent
   */
  public onImageLoad($event: Event): void {
    const eventData = {
      $event,
      src: this.src,
      srcset: this.srcset
    };
    if (!this.loaded) {
      this.imagePlaceholderLoaded.emit(eventData);
      return;
    }
    this.imageLoaded.emit(eventData);
  }
  /**
   * Trigger `ngUnsubscribe` complete on
   * component destroy lifecycle hook
   *
   * @memberof ImageLoaderComponent
   */
  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
