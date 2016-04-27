/*
 * periodic
 * http://github.com/typesettin/periodic
 *
 * Copyright (c) 2014 Yaw Joseph Etse. All rights reserved.
 */

'use strict';
const async = require('async');
const fs = require('fs-extra');
const merge = require('utils-merge');
const path = require('path');
const du = require('du');
var viewCacheDir = path.resolve(__dirname,'../../../cache');

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
	this.prefix='flatfile';
	this.driver = 'fs';
	this._size = 0;
	this._hits = 0;
	this._misses = 0;
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
 * Returns the current number of entries in the cache
 * @param  {object} options {key: of cached value}
 * @param {Function} asyncCallback asyncCallback(err,status)
 * @return {Function}  asyncCallback
 */
ViewCache.prototype.length = function(options,asyncCallback){
	try{
		fs.readdir(path.join(viewCacheDir), (err,files) => {
			this._size = files.length;

			asyncCallback(err,this._size);
		});
	}
	catch(e){
		asyncCallback(e);
	}
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
		fs.readFile(path.join(viewCacheDir,options.key), 'utf8', (err,data)=>{
		  if (err) {
		  	// console.log('error in getting mongo data');
		    asyncCallback(err);
		  } 
		  else if (!data) {
      	++this._misses;
		    asyncCallback(null, null);
		  } 
		  else {
  			++this._hits;
  			// console.log('cache doc',result);
		    asyncCallback(null, data);
		  }
		});
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
		let key = options.key; 
		let data = options.val;

    if (!key) return asyncCallback('no key supplied for cache set');
    if (!data) return asyncCallback('no data rupplied for cache set');
		fs.outputFile(path.join(viewCacheDir,options.key), options.val, (err,data)=>{
      if (err) {
		  	// console.log('error in setting mongo data');
		    asyncCallback(err);
      } 
      else {
  	    asyncCallback(null);
        ++this._size;
      }
		});
	}
	catch(e){
		asyncCallback(e);
	}
};
var util = require('util');
/**
 * deletes key-val from cache store
 * @param  {object} options {key: of cached value}
 * @param {Function} asyncCallback asyncCallback(err,status)
 * @return {Function}  asyncCallback
 */
ViewCache.prototype.del = function(options,asyncCallback){
	try{
		if(options.key){
			fs.remove(path.join(viewCacheDir,options.key), (err)=>{
				this._size--;
			  asyncCallback(err, options.key+': purged ');
			});
		}
		else if(options.model_name && options.model_name_plural && (options.docid || options.docname)){
			fs.readdir(viewCacheDir,(err,cachedViewFiles)=>{
				if (err){
					asyncCallback(err);
				}
				else{
					// console.log('matching files',cachedViewFiles);
					var filteredFiles = [];
					cachedViewFiles.forEach((cachedView) =>{
						if(( cachedView.indexOf(this.prefix) >= 0 && cachedView.indexOf(options.model_name) >= 0 &&  cachedView.indexOf(options.docid) >= 0 ) || 
							( cachedView.indexOf(this.prefix) >= 0 && cachedView.indexOf(options.model_name) >= 0 &&  cachedView.indexOf(options.docname) >= 0 )  || 
							( cachedView.indexOf(this.prefix) >= 0 && cachedView.indexOf(options.model_name_plural) >= 0 )  ){
							filteredFiles.push(cachedView);
						};
					});

					async.each(filteredFiles,
					(fileToRemove,eachCB) =>{
						fs.remove(path.join(viewCacheDir,fileToRemove),eachCB);
					},(err) =>{
						// console.log('filtered files',filteredFiles);
					  var count = filteredFiles.length || 0;
					  this._size = this._size - count;
						asyncCallback(err, 'purged ' + count);
					});

				}
			});
		}
		else{
			asyncCallback(new Error('missing delete key'));
		}
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
	return this._hits;
};
//Returns the number of cache misses.
ViewCache.prototype.misses = function(){
	return this._misses;
};

module.exports = ViewCache;
