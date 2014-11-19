/*
 * periodic
 * http://github.com/typesettin/periodic
 *
 * Copyright (c) 2014 Yaw Joseph Etse. All rights reserved.
 */

'use strict';

var Viewcache = require('./viewcache'),
	Datacache = require('./datacache');
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
	this.DataCache = new Datacache();
	this.ViewCache = new Viewcache();
};

Cache.prototype.generateKeyFromRequestUrl = function(type,url){
	return type+'_'+url.replace('?','qqq').replace('.','ddd').replace('&','nnn').replace('=','eee').replace(/[^a-z0-9]/gi, '-').toLowerCase();
};

Cache.prototype.disableCache = function(req,res,next){
	req.headers.periodicCache = 'no-periodic-cache';
	res.set('X-Periodic-Cache-Disabled','true');
	next();
};

module.exports = Cache;
