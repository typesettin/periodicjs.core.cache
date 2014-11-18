/*
 * periodic
 * http://github.com/typesettin/periodic
 *
 * Copyright (c) 2014 Yaw Joseph Etse. All rights reserved.
 */

'use strict';

var fs = require('fs-extra');

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
var ViewCache = function () {
	this.type='flatfile';
	this.driver = fs;
};

/**
 * gets the value of a key from the cache
 * @param  {string} key key of cached value
 * @return {object}     object value of key
 */
ViewCache.prototype.get = function(key){
	return key;
};

/**
 * set the value of a key into the cache store
 * @param {string} key        key name
 * @param {object} val        key value
 * @param {number} expiretime number in milliseconds to expire (optional)
 */
ViewCache.prototype.set = function(key,val,expiretime){
	return [key,val,expiretime];
};

/**
 * deletes key-val from cache store
 * @param  {string} key key of cached value
 * @return {object}     object value of key
 */
ViewCache.prototype.del = function(key){
 	return [key,true];
};
//Returns the current number of entries in the cache
ViewCache.prototype.length = function(){
	return true;
};
//Returns the number of entries taking up space in the cache
ViewCache.prototype.size = function(){
	return true;
};
//Deletes all keys
ViewCache.prototype.clear = function(){
	return true;
};
//Returns the number of cache hits
ViewCache.prototype.hits = function(){
	return true;
};
//Returns the number of cache misses.
ViewCache.prototype.misses = function(){
	return true;
};

module.exports = ViewCache;
