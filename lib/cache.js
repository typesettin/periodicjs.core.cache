/*
 * periodic
 * http://github.com/typesettin/periodic
 *
 * Copyright (c) 2014 Yaw Joseph Etse. All rights reserved.
 */

'use strict';

/**
 * A core constructor that provides numerous controller helper functions.
 * @{@link https://github.com/typesettin/periodicjs.core.controller}
 * @author Yaw Joseph Etse
 * @constructor
 * @copyright Copyright (c) 2014 Typesettin. All rights reserved.
 * @license MIT
 * @requires module:fs-extra
 * @requires module:path
 * @requires module:periodicjs.core.utilities
 * @param {object} resources variable injection from resources from instantiated periodic express app
 */
var Cache = function () {
	this.status = 'active';
};

Cache.prototype.DataCache = require('./datacache');

Cache.prototype.ViewCache = require('./viewcache');

module.exports = Cache;
