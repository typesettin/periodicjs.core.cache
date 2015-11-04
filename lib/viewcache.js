/*
 * periodic
 * http://github.com/typesettin/periodic
 *
 * Copyright (c) 2014 Yaw Joseph Etse. All rights reserved.
 */

'use strict';

var fs = require('fs-extra'),
	merge = require('utils-merge'),
	path = require('path'),
	du = require('du'),
	viewCacheDir = path.resolve(__dirname,'../../../cache');

/**
 * A core constructor that provides numerous cache helper functions.
 * @{@link https://github.com/typesettin/periodicjs.core.cache}
 * @author Yaw Joseph Etse
 * @constructor
 * @copyright Copyright (c) 2014 Typesettin. All rights reserved.
 * @license MIT
 * @requires module:fs-extra
 * @requires module:path
 * @requires module:du
 * @param {object} options {viewCacheDir}
 */
var ViewCache = function (options) {
	var defaultOptions = {
		viewCacheDir: viewCacheDir,
		expires: 3600
	};
	this.type='flatfile';
	this.driver = 'fs';
	this.options = merge(defaultOptions,options);
	this.expires = this.options.expires;
	viewCacheDir = this.options.viewCacheDir;
	fs.ensureDir(viewCacheDir,function(err){
		if(err){
			console.error(err);
		}
	});
};

/**
 * set the expiretime on a cached view
 * @param {number} seconds [description]
 */
ViewCache.prototype.setExpires = function(seconds){
	this.expires = seconds;
};

/**
 * gets the value of a key from the cache
 * @param  {object} options {key: of cached value}
 * @param {Function} asyncCallback asyncCallback(err,viewdata) 
 * @return {Function} asyncCallback
 */
ViewCache.prototype.get = function(options,asyncCallback){
	try{
		fs.readFile(path.join(viewCacheDir,options.key), 'utf8', asyncCallback);
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
ViewCache.prototype.set = function(options,asyncCallback){
	try{
		fs.outputFile(path.join(viewCacheDir,options.key), options.val, asyncCallback);
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
ViewCache.prototype.del = function(options,asyncCallback){
	try{
		fs.remove(path.join(viewCacheDir,options.key), asyncCallback);
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
ViewCache.prototype.length = function(options,asyncCallback){
	try{
		fs.readdir(path.join(viewCacheDir), function(err,files){
			asyncCallback(err,files.length);
		});
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
ViewCache.prototype.size = function(options,asyncCallback){
	try{
		du(viewCacheDir, asyncCallback);
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
ViewCache.prototype.clearCache = function(options,asyncCallback){
	try{
		fs.remove(viewCacheDir, function(err){
			if(err){
				asyncCallback(err);
			}
			else{
				fs.ensureDir(viewCacheDir,asyncCallback);
			}
		});
	}
	catch(e){
		asyncCallback(e);
	}
};
//Returns the number of cache hits
ViewCache.prototype.hits = function(){
	return false;
};
//Returns the number of cache misses.
ViewCache.prototype.misses = function(){
	return false;
};

module.exports = ViewCache;
