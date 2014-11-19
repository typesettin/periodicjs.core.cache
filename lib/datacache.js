/*
 * periodic
 * http://github.com/typesettin/periodic
 *
 * Copyright (c) 2014 Yaw Joseph Etse. All rights reserved.
 */

'use strict';

var TinyCache = require( 'tinycache' ),
	tinymemorycache = new TinyCache();
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
var DataCache = function (options) {
	this.type='memory';
	this.driver = 'tinycache';
	this.expires = (options && options.expires) ? options.expires : 60000; //300000;//5mins
};

/**
 * set the expiretime on a cached view
 * @param {number} milliseconds [description]
 */
DataCache.prototype.setExpires = function(milliseconds){
	this.expires = milliseconds;
};

/**
 * gets the value of a key from the cache
 * @param  {object} options {key: of cached value}
 * @param {Function} asyncCallback asyncCallback(err,viewdata) 
 * @return {Function} asyncCallback
 */
DataCache.prototype.get = function(options,asyncCallback){
	try{
		var getval = tinymemorycache.get(options.key);
		asyncCallback(null,getval);
	}
	catch(e){
		asyncCallback(e);
	}
};

/**
 * set the value of a key into the cache store
 * @param  {object} options {key: key name,val:key value,expiretime: number in milliseconds to expire (optional)}
 * @param {Function} asyncCallback asyncCallback(err,status)
 * @return {Function} asyncCallback
 */
DataCache.prototype.set = function(options,asyncCallback){
	try{
		tinymemorycache.put(options.key,options.val,this.expires);
		asyncCallback(null,this.expires);
	}
	catch(e){
		asyncCallback(e);
	}
};

/**
 * deletes key-val from cache store
 * @param  {object} options {key: of cached value}
 * @param {Function} asyncCallback asyncCallback(err,status)
 * @return {Function}  asyncCallback
 */
DataCache.prototype.del = function(options,asyncCallback){
	try{
		tinymemorycache.del(options.key);
		asyncCallback(null,'removed key');
	}
	catch(e){
		asyncCallback(e);
	}
};

/**
 * Returns the current number of entries in the cache
 * @param  {object} options {key: of cached value}
 * @param {Function} asyncCallback asyncCallback(err,status)
 * @return {Function}  asyncCallback
 */
DataCache.prototype.length = function(options,asyncCallback){
	try{
		asyncCallback(null,tinymemorycache.size());
	}
	catch(e){
		asyncCallback(e);
	}
};

/**
 * Returns the number of entries taking up space in the cache
 * @param  {object} options {key: of cached value}
 * @param {Function} asyncCallback asyncCallback(err,status)
 * @return {Function}  asyncCallback
 */
DataCache.prototype.size = function(options,asyncCallback){
	try{
		asyncCallback(null,tinymemorycache.memsize());
	}
	catch(e){
		asyncCallback(e);
	}
	return true;
};

/**
 * flush cache store
 * @param  {object} options {key: of cached value}
 * @param {Function} asyncCallback asyncCallback(err,status)
 * @return {Function}  asyncCallback
 */
DataCache.prototype.clearCache = function(options,asyncCallback){
	try{
		tinymemorycache.clear();
		asyncCallback(null,'cleared cache');
	}
	catch(e){
		asyncCallback(e);
	}
};

/**
 * Returns the number of cache hits
 * @param  {object} options {key: of cached value}
 * @param {Function} asyncCallback asyncCallback(err,status)
 * @return {Function}  asyncCallback
 */
DataCache.prototype.hits = function(options,asyncCallback){
	try{
		asyncCallback(null,tinymemorycache.hits());
	}
	catch(e){
		asyncCallback(e);
	}
};

/**
 * Returns the number of cache misses
 * @param  {object} options {key: of cached value}
 * @param {Function} asyncCallback asyncCallback(err,status)
 * @return {Function}  asyncCallback
 */
DataCache.prototype.misses = function(options,asyncCallback){
	try{
		asyncCallback(null,tinymemorycache.misses());
	}
	catch(e){
		asyncCallback(e);
	}
};

module.exports = DataCache;
