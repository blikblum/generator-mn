# generator-mn [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Modern setup for Marionette applications

## Features

 * Uses webpack 3.x with dev-server
 * Uses babel 6.x with preset-env (ie 11 + green browsers) 
 * Configures service-worker (WorkBox).
 * Custom CSS framework (Bootstrap 3, Bootstrap 4, Framework7)
 * Custom renderer (Snabbdom, React, inferno, idom, virtual-dom, rivets) 
 
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
  * Bootstrap 4
  * Framework7

##### Renderers
  * Snabbdom
  * React
  * Inferno  
  * Superviews (incremental-dom)
  * Incremental-Bars (Handlebars + incremental-dom)
  * Virtual-Dom
  * Rivets (blikblum's fork)

> Some renderers offers specific options like configuration of JSX or jade transformer

##### Backbone plugins
  * backbone-computedfields
  * backbone.validation
  * backbone.syphon
  * backbone.localstorage
  
### Build the application

For development (a server will be started at http://localhost:8080)
```bash
npm run dev 
```

For production
```bash
npm run prod
```

## License

MIT © [Luiz Américo]()


[npm-image]: https://badge.fury.io/js/generator-mn.svg
[npm-url]: https://npmjs.org/package/generator-mn
[travis-image]: https://travis-ci.org/blikblum/generator-mn.svg?branch=master
[travis-url]: https://travis-ci.org/blikblum/generator-mn
[daviddm-image]: https://david-dm.org/blikblum/generator-mn.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/blikblum/generator-mn
