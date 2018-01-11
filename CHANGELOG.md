# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.0.0-rc.0"></a>
# [2.0.0-rc.0](https://github.com/thisissoon/angular-image-loader/compare/v1.2.2...v2.0.0-rc.0) (2018-01-11)


### Bug Fixes

* **build:** fix ts error in packagr build ([26e874b](https://github.com/thisissoon/angular-image-loader/commit/26e874b))


### Code Refactoring

* **app:** Changed the models for ResponsiveImage and RetinaImage to allow for more flexible ima ([d78fc4e](https://github.com/thisissoon/angular-image-loader/commit/d78fc4e))
* **function and variable names:** updated image and full res image loaded event handlers and tr ([2a1bb76](https://github.com/thisissoon/angular-image-loader/commit/2a1bb76))


### BREAKING CHANGES

* **function and variable names:** imagePlaceholderLoaded output changed to placeholderLoaded
* **app:** sn-image-loader component now expects a differently structured responsiveImage
object.



<a name="1.2.2"></a>
## [1.2.2](https://github.com/thisissoon/angular-image-loader/compare/v1.2.1...v1.2.2) (2018-01-03)


### Bug Fixes

* **component:** moved initial width update function from constructor to ngOnInit ([5f03694](https://github.com/thisissoon/angular-image-loader/commit/5f03694))
* **Demo app:** Updated dom query functions to target bottom image comp. Added tests for top image co ([d3e06d1](https://github.com/thisissoon/angular-image-loader/commit/d3e06d1))



<a name="1.2.1"></a>
## [1.2.1](https://github.com/thisissoon/angular-image-loader/compare/v1.2.0...v1.2.1) (2018-01-02)


### Bug Fixes

* **component:** size property updated by window ref width in component constructor. window ref width ([16906eb](https://github.com/thisissoon/angular-image-loader/commit/16906eb))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/thisissoon/angular-image-loader/compare/v1.2.0-rc.0...v1.2.0) (2017-12-14)



<a name="1.2.0-rc.0"></a>
# [1.2.0-rc.0](https://github.com/thisissoon/angular-image-loader/compare/v1.1.1...v1.2.0-rc.0) (2017-12-14)


### Code Refactoring

* **image-loader component:** Name change, placeholderLoaded and fullResLoaded updated to imageL ([31aee45](https://github.com/thisissoon/angular-image-loader/commit/31aee45))


### Features

* **app component:** updated app component implementation of image-loader component to match updated ([b420de7](https://github.com/thisissoon/angular-image-loader/commit/b420de7))
* **image-loaded-event.model.ts:** image loaded event model added for use by the image loader compon ([8ea1749](https://github.com/thisissoon/angular-image-loader/commit/8ea1749))
* **image-loader component:** Event outputs from image loader component added for placeholder image ([f564434](https://github.com/thisissoon/angular-image-loader/commit/f564434))
* **image-loader component:** installed commitizen config module ([1c0653a](https://github.com/thisissoon/angular-image-loader/commit/1c0653a))
* **ImageLoader:** implemented output event for image loaded. ([43e7e1d](https://github.com/thisissoon/angular-image-loader/commit/43e7e1d))


### BREAKING CHANGES

* **image-loader component:** Variable name changes affect the image-loader component API
* **app component:** image-loader components updated inputs and outputs implemented
* **image-loader component:** The inputs and outputs to the image-loader component have changed



<a name="1.1.1"></a>
## [1.1.1](https://github.com/thisissoon/angular-image-loader/compare/v1.1.0...v1.1.1) (2017-12-04)


### Bug Fixes

* **build:** generate correct metadata needed for ng-language-service ([f2446a5](https://github.com/thisissoon/angular-image-loader/commit/f2446a5))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/thisissoon/angular-image-loader/compare/v1.1.0-rc.0...v1.1.0) (2017-12-01)



<a name="1.1.0-rc.0"></a>
# [1.1.0-rc.0](https://github.com/thisissoon/angular-image-loader/compare/v1.0.1...v1.1.0-rc.0) (2017-12-01)


### Features

* **build:** Move build environment to angular cli and ng-packagr ([f053a47](https://github.com/thisissoon/angular-image-loader/commit/f053a47))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/thisissoon/angular-image-loader/compare/v1.0.0...v1.0.1) (2017-08-17)

### Fixing example in README

<a name="1.0.0"></a>
# 1.0.0 (2017-08-17)

### First Release
