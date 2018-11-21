# Angular Image Loader

[![Build Status][circle-badge]][circle-badge-url]
[![Coverage Status][coveralls-badge]][coveralls-badge-url]
[![Commitizen friendly][commitizen-badge]][commitizen]
[![code style: prettier][prettier-badge]][prettier-badge-url]

A simple progressive/responsive/lazy loading image library for [Angular][angular] that detects browser size and loads the appropriate image only when the element is in view. Classes are attributed and events emited on image loads. This package requires [@thisissoon/angular-inviewport][angular-inviewport].

<img src="https://raw.githubusercontent.com/thisissoon/angular-image-loader/master/src/assets/example.gif" alt="example">

This is a simple library for [Angular][angular], implemented in the [Angular Package Format v5.0][apfv5].

## Install

### via NPM

`npm i @thisissoon/{angular-image-loader,angular-inviewport} --save`

### via Yarn

`yarn add @thisissoon/angular-image-loader @thisissoon/angular-inviewport`

`app.module.ts`

```ts
import {
  ImageLoaderModule,
  VideoLoaderModule,
} from '@thisissoon/angular-image-loader';
import { InViewportModule, WindowRef } from '@thisissoon/angular-inviewport';

// Provide window object for platform browser
export const providers: Provider[] = [
  { provide: WindowRef, useFactory: () => window },
];

@NgModule({
  imports: [
    InViewportModule.forRoot(providers),
    ImageLoaderModule, // Only this import required if using just the image loader
    VideoLoaderModule, // Only this import required if using just the video loader
  ],
})
export class AppModule {}
```

`app.server.module.ts` (Only needed if using Angular Universal)

```ts
import { ImageLoaderModule } from '@thisissoon/angular-image-loader';
import { InViewportModule, WindowRef } from '@thisissoon/angular-inviewport';

@NgModule({
  imports: [
    // No need to provide WindowRef
    InViewportModule.forRoot(),
    ImageLoaderModule,
    VideoLoaderModule,
  ],
})
export class AppModule {}
```

## Image Loader Example

A working example can be found inside [/src](https://github.com/thisissoon/angular-image-loader/tree/master/src) folder.

### `app.component.html`

```html
<sn-image-loader
  [image]="image"
  [sizes]="sizes"
  imgClass="img"
  alt="lorem ipsum"
  (placeholderLoaded)="onPlaceholderLoad($event)"
  (imageLoaded)="onImageLoad($event)"
>
</sn-image-loader>
```

### `app.component.ts`

```ts
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
        x2: 'http://via.placeholder.com/300x700?text=xs+2x',
      },
      {
        size: 'md',
        x1: 'http://via.placeholder.com/350x250?text=md+1x',
        x2: 'http://via.placeholder.com/700x500?text=md+2x',
      },
      {
        size: 'lg',
        x1: 'http://via.placeholder.com/700x400?text=lg+1x',
        x2: 'http://via.placeholder.com/1400x800?text=lg+2x',
      },
    ],
  };

  public onPlaceholderLoad(imageLoadedEvent: ImageLoadedEvent) {
    // Do something
  }

  public onImageLoad(imageLoadedEvent: ImageLoadedEvent) {
    // Do something
  }
}
```

### `app.component.css`

```css
.foo {
  transition: all 0.35s ease-in-out;
}

.sn-image-not-loaded ::ng-deep .img {
  filter: blur(20px);
}

.sn-image-loaded ::ng-deep .img {
  filter: blur(0px);
}
```

### Check inviewport status manually

```html
<sn-image-loader
  [image]="image"
  [sizes]="sizes"
  imgClass="img"
  alt="lorem ipsum"
  #imgEl
>
</sn-image-loader>

<button (click)="imgEl.checkInViewportStatus()">Check status</button>
```

## Video Loader Example

### `app.component.html`

```html
<sn-video-loader
  [sizes]="sizes"
  [video]="video"
  [loop]="true"
  [muted]="true"
  [autoplay]="true"
  [controls]="true"
  [playsInline]="true"
  type="video/mp4"
  videoClass="video"
  posterClass="img"
>
</sn-video-loader>
```

### `app.component.ts`

```ts
export class AppComponent {
  sizes: Breakpoint[] = [
    { size: 'xs', width: 0 },
    { size: 'md', width: 768 },
    { size: 'lg', width: 992 },
  ];

  video: ResponsiveVideo = {
    videos: [
      {
        size: 'xs',
        url:
          'http://res.cloudinary.com/thisissoon/video/upload/ac_none,c_fill,h_568,q_80,w_320/v1517616795/demos/jellyfish-25-mbps-hd-hevc.mp4',
      },
      {
        size: 'md',
        url:
          'http://res.cloudinary.com/thisissoon/video/upload/ac_none,c_fill,h_1024,q_80,w_768/v1517616795/demos/jellyfish-25-mbps-hd-hevc.mp4',
      },
      {
        size: 'lg',
        url:
          'http://res.cloudinary.com/thisissoon/video/upload/ac_none,c_fill,h_720,q_80,w_1280/v1517616795/demos/jellyfish-25-mbps-hd-hevc.mp4',
      },
    ],
    poster: {
      // Responsive image, the same object as used for the image loader
    },
  };
}
```

### Check inviewport status manually

```html
<sn-video-loader
  [sizes]="sizes"
  [video]="video"
  [loop]="true"
  [muted]="true"
  [autoplay]="true"
  [controls]="true"
  [playsInline]="true"
  type="video/mp4"
  videoClass="video"
  posterClass="img"
  #videoEl
>
</sn-video-loader>

<button (click)="videoEl.checkInViewportStatus()">Check status</button>
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma][karma].

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor][protractor].

## Making Commits

This repo uses [Commitizen CLI][commitizen] and [Conventional Changelog][conventional-changelog] to create commits and generate changelogs. Instead of running `git commit` run `git cz` and follow the prompts. Changelogs will then be generated when creating new releases by running `npm run release`.

## Making Releases

Run `npm run release` to create a new release. This will use [Standard Version][standard-version] to create a new release. [Standard Version][standard-version] will generate / update the changelog based on commits generated using [Commitizen CLI][commitizen], update the version number following semantic versioning rules and then commit and tag the commit for the release. Simply run `git push --follow-tags origin master`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README][angular-cli-readme].

[circle-badge]: https://circleci.com/gh/thisissoon/angular-image-loader.svg?branch=master
[circle-badge-url]: https://circleci.com/gh/thisissoon/angular-image-loader
[coveralls-badge]: https://coveralls.io/repos/github/thisissoon/angular-image-loader/badge.svg?branch=master
[coveralls-badge-url]: https://coveralls.io/github/thisissoon/angular-image-loader?branch=master
[prettier-badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=shield
[prettier-badge-url]: https://github.com/prettier/prettier
[angular]: https://angular.io/
[angular-inviewport]: https://github.com/thisissoon/angular-inviewport
[commitizen]: http://commitizen.github.io/cz-cli/
[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[conventional-changelog]: https://github.com/conventional-changelog/conventional-changelog
[standard-version]: https://github.com/conventional-changelog/standard-version
[karma]: https://karma-runner.github.io
[protractor]: http://www.protractortest.org/
[angular-cli]: https://github.com/angular/angular-cli
[angular-cli-readme]: https://github.com/angular/angular-cli/blob/master/README.md
[apfv5]: (https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit#heading=h.k0mh3o8u5hx)
