# generator-mn
> Modern setup for Marionette applications

## Features

 * Bundling with webpack
   * Configures `dev` npm script with a live server for development
   * Configures `prod` npm script for production
   * Uses the newer webpack tools (webpack-command and webpack-serve)
 * Compilation with babel 6.x
   * Uses preset-env
   * Out of the box configured to support ie 11 and green browsers 
 * Preconfigured service-worker using [Workbox](https://github.com/GoogleChrome/workbox) 
 * Option to install CSS/UI frameworks
 * Option to install custom renderers
 * Option to install [bottlejs](https://github.com/young-steveo/bottlejs) (dependency injection micro library)
 * Option to install [hygen](https://github.com/jondot/hygen) templates (view, model, route)
 
## Installation

First, install [Yeoman](http://yeoman.io) and generator-mn using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-mn
```

## Usage

### Generate a new project

```bash
yo mn
```

The generator will ask for some options:

##### CSS/UI framework
  * none
  * Bootstrap 3
  * Bootstrap 4 - with font awesome
  * Framework7 v2

##### Renderers
  * Snabbdom
  * React
  * Inferno  
  * Incremental-Bars (Handlebars + incremental-dom)
  * Virtual-Dom
  * Tinybind (based on rivets)

> Some renderers offers specific options for addons like configuration of JSX or jade transformer

##### Backbone/Marionette plugins
  * backbone-computedfields
  * backbone.validation
  * backbone.syphon
  * backbone.localstorage
  * marionette.native
  * marionette.routing
  * marionette.modalservices
  * radio.service

##### Extra libraries 
  * bottlejs (dependency injection micro library)
  * hygen templates for creating model, view, route (needs hygen installed globally)

### Build the application

For development (a server will be started usually at http://localhost:8080)
```bash
npm run dev 
```

For production
```bash
npm run prod
```

## License

MIT © [Luiz Américo Pereira Câmara]()


[npm-image]: https://badge.fury.io/js/generator-mn.svg
[npm-url]: https://npmjs.org/package/generator-mn
[travis-image]: https://travis-ci.org/blikblum/generator-mn.svg?branch=master
[travis-url]: https://travis-ci.org/blikblum/generator-mn
[daviddm-image]: https://david-dm.org/blikblum/generator-mn.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/blikblum/generator-mn
