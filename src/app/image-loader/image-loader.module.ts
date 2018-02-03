import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InViewportModule } from '@thisissoon/angular-inviewport';

import { ImageLoaderComponent } from './image-loader/image-loader.component';

/**
 * A simple progressive/responsive/lazy loading image library for
 * Angular that detects browser size and loads the appropriate
 * image only when the element is in view.
 * This package requires @thisissoon/angular-inviewport
 *
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
