import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InViewportModule } from '@thisissoon/angular-inviewport';

import { ImageLoaderModule } from '../image-loader/image-loader.module';
import { VideoLoaderComponent } from './video-loader/video-loader.component';

/**
 * Progressive/lazy video loader module that loads
 * correct video size for any breakpoint when in the
 * browser viewport.
 *
 */
@NgModule({
  imports: [CommonModule, InViewportModule, ImageLoaderModule],
  declarations: [VideoLoaderComponent],
  exports: [VideoLoaderComponent]
})
export class VideoLoaderModule {}
