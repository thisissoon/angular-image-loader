# Angular Image Loader
[![Build Status][travis-badge]][travis-badge-url]
[![Coverage Status][coveralls-badge]][coveralls-badge-url]

A simple progressive/responsive/lazy loading image library for [Angular (2/4+)][angular] that detects browser size and loads the appropriate image only when the element is in view. This package requires [angular-inviewport][angular-inviewport]

<img src="https://raw.githubusercontent.com/thisissoon/angular-image-loader/master/src/demo/example.gif" alt="example">

This is a simple library for [Angular][angular], implemented in the [Angular Package Format v4.0](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit#heading=h.k0mh3o8u5hx).


## Install

`npm i @thisissoon/{angular-image-loader,angular-inviewport} --save`

`app.module.ts`
```ts
import { ImageLoaderModule } from '@thisissoon/angular-image-loader';

@NgModule({
  imports: [
    ImageLoaderModule
  ]
})
export class AppModule { }
```


## Example

a working example can be found inside [/src/demo](https://github.com/thisissoon/angular-image-loader/tree/master/src/demo) folder

### `app.component.html`

```html
<sn-image-loader [image]="image" [sizes]="sizes" imgClass="foo" alt="lorem ipsum"></sn-image-loader>
```

### `app.component.ts`

```ts
export class AppComponent {
  sizes: Breakpoint[] = [
    { size: 'xs', width: 0},
    { size: 'md', width: 768},
    { size: 'lg', width: 992},
  ];

  image: ResponsiveImage = {
    placeholder: 'http://via.placeholder.com/35x15?text=placeholder',
    fallback: 'http://via.placeholder.com/350x150?text=fallback',
    xs: {
      '@1x': 'http://via.placeholder.com/150x350?text=xs+1x',
      '@2x': 'http://via.placeholder.com/300x700?text=xs+2x'
    },
    md: {
      '@1x': 'http://via.placeholder.com/350x250?text=md+1x',
      '@2x': 'http://via.placeholder.com/700x500?text=md+2x'
    },
    lg: {
      '@1x': 'http://via.placeholder.com/700x400?text=lg+1x',
      '@2x': 'http://via.placeholder.com/1400x800?text=lg+2x'
    }
  };
}
```

### `app.component.css`

```css
.foo {
  transition: all .35s ease-in-out;
}

.sn-image-not-loaded /deep/ .foo {
  filter: blur(20px);
}

.sn-image-loaded /deep/ .foo {
  filter: blur(0px);
}
```


[travis-badge]: https://travis-ci.org/thisissoon/angular-image-loader.svg?branch=master
[travis-badge-url]: https://travis-ci.org/thisissoon/angular-image-loader
[coveralls-badge]: https://coveralls.io/repos/github/thisissoon/angular-image-loader/badge.svg?branch=master
[coveralls-badge-url]: https://coveralls.io/github/thisissoon/angular-image-loader?branch=master
[angular]: https://angular.io/
[angular-inviewport]: https://github.com/thisissoon/angular-inviewport
