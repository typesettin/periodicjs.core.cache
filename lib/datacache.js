/*
 * periodic
 * http://github.com/typesettin/periodic
 *
 * Copyright (c) 2014 Yaw Joseph Etse. All rights reserved.
 */

'use strict';

var tinycache = require('tinycache');

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
var DataCache = function () {
	this.type='memory';
	this.driver = tinycache;
};

/**
 * gets the value of a key from the cache
 * @param  {string} key key of cached value
 * @return {object}     object value of key
 */
DataCache.prototype.get = function(key){
	return key;
};

/**
 * set the value of a key into the cache store
 * @param {string} key        key name
 * @param {object} val        key value
 * @param {number} expiretime number in milliseconds to expire (optional)
 */
DataCache.prototype.set = function(key,val,expiretime){
	return [key,val,expiretime];
};

/**
 * deletes key-val from cache store
 * @param  {string} key key of cached value
 * @return {object}     object value of key
 */
DataCache.prototype.del = function(key){
 	return [key,true];
};
//Returns the current number of entries in the cache
DataCache.prototype.length = function(){
	return true;
};
//Returns the number of entries taking up space in the cache
DataCache.prototype.size = function(){
	return true;
};
//Deletes all keys
DataCache.prototype.clear = function(){
	return true;
};
//Returns the number of cache hits
DataCache.prototype.hits = function(){
	return true;
};
//Returns the number of cache misses.
DataCache.prototype.misses = function(){
	return true;
};

module.exports = DataCache;
