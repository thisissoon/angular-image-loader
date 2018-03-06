import {
  Component,
  Input,
  HostBinding,
  NgZone,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  ElementRef
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { takeUntil, debounceTime, startWith } from 'rxjs/operators';
import { WindowRef, InViewportDirective } from '@thisissoon/angular-inviewport';

import { ResponsiveImage, Size } from '../../image-loader/shared/image.model';
import { Breakpoint } from '../../image-loader/shared/breakpoint.model';
import { ResponsiveVideo } from '../shared/video.model';
import * as classes from '../shared/classes';
import * as events from '../../image-loader/shared/events';
import { ImageLoadedEvent } from '../../image-loader/shared/image-loaded-event.model';


/**
 * A component that load a `video` element with the correct
 * video and poster for the device size
 *
 * @example
 * ```html
 * <sn-video-loader
 *   [sizes]="sizes"
 *   [video]="video"
 *   [loop]="true"
 *   [muted]="true"
 *   [autoplay]="true"
 *   [playsInline]="true"
 *   type="video/mp4"
 *   videoClass="video"
 *   posterClass="img">
 * </sn-video-loader>
 * ```
 */
@Component({
  selector: 'sn-video-loader',
  templateUrl: './video-loader.component.html',
  styleUrls: ['./video-loader.component.scss']
})
export class VideoLoaderComponent implements AfterViewInit, OnDestroy {
  /**
   * Videos to select from
   *
   * @memberof VideoLoaderComponent
   */
  @Input()
  public video: ResponsiveVideo;
  /**
   * Current src value to set to video
   *
   * @memberof VideoLoaderComponent
   */
  public src = '';
  /**
   * Alt tag for fallback image
   *
   * @memberof VideoLoaderComponent
   */
  public alt = '';
  /**
   * If true the video will be set to loop
   *
   * @memberof VideoLoaderComponent
   */
  @Input()
  public loop: boolean;
  /**
   * If true displays the video controls
   *
   * @memberof VideoLoaderComponent
   */
  @Input()
  public controls: boolean;
  /**
   * If true the video will be muted
   *
   * @memberof VideoLoaderComponent
   */
  @Input()
  public muted: boolean;
  /**
   * If true video should autoplay
   *
   * @memberof VideoLoaderComponent
   */
  @Input()
  public autoplay: boolean;
  /**
   * If true the video will playinline rather then
   * in a modal window on iOS
   *
   * @memberof VideoLoaderComponent
   */
  @Input()
  public playsInline: boolean;
  /**
   * Reference to inviewport directive instance
   *
   */
  @ViewChild('snInViewport')
  public snInViewport: InViewportDirective;
  /**
   * Reference to HTML Video element
   *
   * @memberof VideoLoaderComponent
   */
  @ViewChild('videoEl')
  public videoEl: ElementRef;
  /**
   * List of breakpoints to select video from
   *
   * @memberof VideoLoaderComponent
   */
  @Input()
  public sizes: Breakpoint[] = [
    { size: 'xs', width: 0 },
    { size: 'sm', width: 576 },
    { size: 'md', width: 768 },
    { size: 'lg', width: 992 },
    { size: 'xl', width: 1200 }
  ];
  /**
   * Current size of video to display
   * @memberof VideoLoaderComponent
   */
  public size: Size = 'xs';
  /**
   * Video type e.g. video/mp4
   *
   * @memberof VideoLoaderComponent
   */
  @Input()
  public type: string;
  /**
   * If true means the element is inside the browser viewport
   *
   * @memberof VideoLoaderComponent
   */
  public inViewport: boolean;
  /**
   * Amount of time to wait after last event
   *
   * @memberof VideoLoaderComponent
   */
  public debounce = 100;
  /**
   * Classes to pass on to video element
   * @memberof VideoLoaderComponent
   */
  @Input()
  public videoClass = '';
  /**
   * Classes to pass on to image element
   * @memberof VideoLoaderComponent
   */
  @Input()
  public posterClass = '';
  /**
   * Value for video poster property
   *
   * @memberof VideoLoaderComponent
   */
  public poster = '';
  /**
   * Completes on component destroy lifecycle event
   * use to handle unsubscription from infinite observables
   *
   * @memberof VideoLoaderComponent
   */
  public ngUnsubscribe$ = new Subject<void>();
  /**
   * If true means the video has not been loaded yet and
   * the placeholder video is currently displayed
   *
   * @memberof VideoLoaderComponent
   */
  @HostBinding(classes.loadedClass)
  public loaded = false;
  /**
   * If true means the video has not been loaded yet and
   * the placeholder video is currently displayed
   *
   * @readonly
   * @memberof VideoLoaderComponent
   */
  @HostBinding(classes.notLoadedClass)
  public get notLoaded(): boolean {
    return !this.loaded;
  }
  /**
    * Creates an instance of VideoLoaderComponent.
    * @memberof VideoLoaderComponent
    */
  constructor(
    private windowRef: WindowRef,
    private ngZone: NgZone,
    private cdRef: ChangeDetectorRef
  ) { }
  /**
   * Subscribe to `resize` window event observable
   * and run callback
   *
   * @memberof VideoLoaderComponent
   */
  public ngAfterViewInit(): void {
    // Listen for window scroll/resize events.
    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.windowRef as any, events.eventResize)
      .pipe(
          takeUntil(this.ngUnsubscribe$),
          debounceTime(this.debounce),
          startWith({ target: { innerWidth: this.windowRef.innerWidth } })
        )
        .subscribe((event: any) =>
          this.ngZone.run(() => this.onWidthChange(event.target.innerWidth))
        );
    });
  }
  /**
   * If element is in viewport preload video by setting the src
   * of the dummy video element.
   *
   * @memberof VideoLoaderComponent
   */
  public onInViewportChange(inViewport: boolean): void {
    this.inViewport = inViewport;
    this.loadVideo();
  }
  /**
   * Checks if video element is in viewport
   *
   * @memberof VideoLoaderComponent
   */
  public checkInViewportStatus(): void {
    this.snInViewport.calculateInViewportStatus();
  }
  /**
   * On width change, determine if device has changed and
   * reset directive
   *
   * @memberof VideoLoaderComponent
   */
  public onWidthChange(width: number): void {
    const sizes = this.sizes.filter((size) => size.width <= width);
    const lastSize = sizes[sizes.length - 1];
    if (!this.size || this.size !== lastSize.size) {
      this.size = lastSize.size;
      this.loadVideo();
    }
  }
  /**
   * Set poster on image load
   *
   * @memberof VideoLoaderComponent
   */
  public onImageLoad($event: ImageLoadedEvent): void {
    this.poster = $event.src;
  }
  /**
   * Set loaded to true when video has been loaded
   *
   * @memberof VideoLoaderComponent
   */
  public onVideoLoad(): void {
    this.loaded = true;
  }
  /**
   * Trigger video preload if element is within viewport
   * and hasn't been preloaded
   *
   * @memberof VideoLoaderComponent
   */
  public loadVideo(): void {
    if (this.inViewport && this.video) {
      const video = this.video.videos.find(item => item.size === this.size);
      this.loaded = false;
      this.src = video.url;
      this.cdRef.detectChanges();
    }
  }
  /**
   * Trigger `ngUnsubscribe` complete on
   * component destroy lifecycle hook
   *
   * @memberof VideoLoaderComponent
   */
  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
