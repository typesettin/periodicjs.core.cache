/*
 * periodic
 * http://github.com/typesettin/periodic
 *
 * Copyright (c) 2014 Yaw Joseph Etse. All rights reserved.
 */

'use strict';

var async = require('async'),
	merge = require('utils-merge'),
	Viewcache = require('./viewcache'),
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
var Cache = function (options) {
	var oneMinInMilliseconds = 60000,
		oneMegabyteInBytes = 1000000,
		defaultDataCacheSize = (30 * oneMegabyteInBytes),
		defaultExpireTimeout = (5 * oneMinInMilliseconds),
		defaultoptions = {
			item_doc_cache_expires : defaultExpireTimeout,
			item_doc_cache :[ 'item/:id','article/:id'],
			item_list_cache : ['items','articles'],
			asset_doc_cache_expires : defaultExpireTimeout,
			asset_doc_cache : ['asset/:id'],
			asset_list_cache : ['assets'],
			collection_doc_cache_expires : defaultExpireTimeout,
			collection_doc_cache : ['collection/:id'],
			collection_list_cache : ['collections'],
			compilation_doc_cache_expires : defaultExpireTimeout,
			compilation_doc_cache : ['compilation/:id'],
			compilation_list_cache : ['compilations'],
			user_doc_cache_expires : defaultExpireTimeout,
			user_doc_cache : ['author/:id'],
			user_list_cache : ['authors'],
			category_doc_cache_expires : defaultExpireTimeout,
			category_doc_cache : ['category/:id'],
			category_list_cache : ['browse/categories/:id'],
			tag_doc_cache_expires : defaultExpireTimeout,
			tag_doc_cache :[ 'tag/:id'],
			tag_list_cache : ['browse/tags/:id'],
			contenttype_doc_cache_expires : defaultExpireTimeout,
			contenttype_doc_cache : ['contenttype/:id'],
			contenttype_list_cache : ['browse/contenttypes/:id'],
			dataCacheSizeLimitInBytes: defaultDataCacheSize
		};
	this.status = (options && options.status)? options.status : 'active';
	this.options = merge(defaultoptions,options);
	this.DataCache = new Datacache();
	this.ViewCache = new Viewcache();
};

Cache.prototype.setOptions = function(options){
	this.options = merge(this.options,options);
};


Cache.prototype.setStatus = function(status){
	this.status = status;
};

/**
 * generate key from request url
 * @param  {string} type type of cache (flat, redis, couch, mongo, memory, etc)
 * @param  {url} url  request url
 * @return {string}      cache key
 */
Cache.prototype.generateKeyFromRequestUrl = function(type,url){
	return type+'_'+url.replace('?','qqq').replace('.','ddd').replace('&','nnn').replace('=','eee').replace(/[^a-z0-9]/gi, '-').toLowerCase();
};

/**
 * disables caching of view by setting request header
 * @param  {object}   req  express req object
 * @param  {object}   res  express res option
 * @param  {Function} next aync callback
 * @return {Function}        next();
 */
Cache.prototype.disableCache = function(req,res,next){
	req.headers.periodicCache = 'no-periodic-cache';
	res.set('X-Periodic-Cache-Disabled','true');
	next();
};

/**
 * clears both data and view cache, can be prevented on start
 * @param {Function} asyncCallback asyncCallback(err,status)
 * @return {Function}  asyncCallback
 */
Cache.prototype.clearCache = function(asyncCallback){
	// var self = this;
	// console.log('self',self);
	async.series({
		clearDataCache:function(cb){
			if(this.options && this.options.prevent_clear_data_cache_on_start===true){
				cb(null,'prevent data clear');
			}
			else{
				console.log('clearing data cache');
				this.DataCache.clearCache({},cb);
			}
		}.bind(this),
		clearViewCache:function(cb){
			if(this.options && this.options.prevent_clear_view_cache_on_start===true){
				cb(null,'prevent view clear');
			}
			else{
				console.log('clearing view cache');
				this.ViewCache.clearCache({},cb);
			}
		}.bind(this)
	},asyncCallback);
};

module.exports = Cache;
