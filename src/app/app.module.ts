import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { InViewportModule } from '@thisissoon/angular-inviewport';

import { ImageLoaderModule } from './image-loader/image-loader.module';
import { VideoLoaderModule } from './video-loader/video-loader.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    InViewportModule,
    ImageLoaderModule,
    VideoLoaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
