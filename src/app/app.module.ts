import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { InViewportModule, WindowRef } from '@thisissoon/angular-inviewport';

import { ImageLoaderModule } from './image-loader';
import { AppComponent } from './app.component';

export const getWindow = () => window;
export const providers: Provider[] = [
  { provide: WindowRef, useFactory: (getWindow) }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InViewportModule.forRoot(providers),
    ImageLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
