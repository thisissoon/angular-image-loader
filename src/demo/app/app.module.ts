import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ImageLoaderModule } from 'angular-image-loader';

import { AppComponent }  from './app.component';

@NgModule({
  imports: [BrowserModule, ImageLoaderModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
