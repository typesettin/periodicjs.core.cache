periodicjs.core.cache
=====================

Extensible caching modules for periodic.

 [API Documentation](https://github.com/typesettin/periodicjs.core.cache/blob/master/doc/api.md)

## Installation

```
$ npm install periodicjs.core.cache
```

This is a part of Periodic's core.

## Usage

### Querying for tag
*JavaScript*
```javascript
//in periodic globally (already in app/lib/periodic.js)
var PeriodicCache = require('periodicjs.core.cache');
global.CoreCache = new PeriodicCache();

//in your routes to disable caching
module.exports = function (periodic) {
	extensionOrThemeRouter = periodic.express.Router();
	extensionOrThemeRouter.get('*',global.CoreCache.disableCache);
	periodic.app.use(extensionOrThemeRouter);
};

```

##Development
*Make sure you have grunt installed*
```
$ npm install -g grunt-cli
```

Then run grunt watch
```
$ grunt watch
```

For generating documentation
```
$ grunt doc
$ jsdoc2md lib/**/*.js index.js > doc/api.md
```


##Notes
* Check out https://github.com/typesettin/periodicjs for the full Periodic Documentation