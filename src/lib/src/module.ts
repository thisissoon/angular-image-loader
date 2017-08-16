import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InViewportModule } from '@thisissoon/angular-inviewport';

import { ImageLoaderComponent } from './image-loader.component';

/**
 * A simple progressive/responsive/lazy loading image library
 * for Angular 2/4+ with no other dependencies that detects browser size and
 * loads the appropriate image on when the element is in view.
 *
 * @export
 * @class ImageLoaderModule
 */
@NgModule({
  imports: [
    CommonModule,
    InViewportModule
  ],
  declarations: [
    ImageLoaderComponent
  ],
  exports: [
    ImageLoaderComponent
  ]
})
export class ImageLoaderModule { }
