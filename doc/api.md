#Index

**Classes**

* [class: Cache](#Cache)
  * [new Cache(resources)](#new_Cache)
  * [cache.generateKeyFromRequestUrl(type, url)](#Cache#generateKeyFromRequestUrl)
  * [cache.disableCache(req, res, next)](#Cache#disableCache)
  * [cache.clearCache(asyncCallback)](#Cache#clearCache)
* [class: DataCache](#DataCache)
  * [new DataCache(resources)](#new_DataCache)
  * [dataCache.get(key)](#DataCache#get)
  * [dataCache.set(key, val, expiretime)](#DataCache#set)
  * [dataCache.del(key)](#DataCache#del)
* [class: ViewCache](#ViewCache)
  * [new ViewCache(options)](#new_ViewCache)
  * [viewCache.setExpires(seconds)](#ViewCache#setExpires)
  * [viewCache.get(options, asyncCallback)](#ViewCache#get)
  * [viewCache.set(options, asyncCallback)](#ViewCache#set)
  * [viewCache.del(options, asyncCallback)](#ViewCache#del)
  * [viewCache.length(options, asyncCallback)](#ViewCache#length)
 
<a name="Cache"></a>
#class: Cache
**Members**

* [class: Cache](#Cache)
  * [new Cache(resources)](#new_Cache)
  * [cache.generateKeyFromRequestUrl(type, url)](#Cache#generateKeyFromRequestUrl)
  * [cache.disableCache(req, res, next)](#Cache#disableCache)
  * [cache.clearCache(asyncCallback)](#Cache#clearCache)

<a name="new_Cache"></a>
##new Cache(resources)
A core constructor that provides numerous controller helper functions.

**Params**

- resources `object` - variable injection from resources from instantiated periodic express app  

**Author**: Yaw Joseph Etse  
**License**: MIT  
**Copyright**: Copyright (c) 2014 Typesettin. All rights reserved.  
<a name="Cache#generateKeyFromRequestUrl"></a>
##cache.generateKeyFromRequestUrl(type, url)
generate key from request url

**Params**

- type `string` - type of cache (flat, redis, couch, mongo, memory, etc)  
- url `url` - request url  

**Returns**: `string` - cache key  
<a name="Cache#disableCache"></a>
##cache.disableCache(req, res, next)
disables caching of view by setting request header

**Params**

- req `object` - express req object  
- res `object` - express res option  
- next `function` - aync callback  

**Returns**: `function` - next();  
<a name="Cache#clearCache"></a>
##cache.clearCache(asyncCallback)
clears both data and view cache, can be prevented on start

**Params**

- asyncCallback `function` - asyncCallback(err,status)  

**Returns**: `function` - asyncCallback  
<a name="DataCache"></a>
#class: DataCache
**Members**

* [class: DataCache](#DataCache)
  * [new DataCache(resources)](#new_DataCache)
  * [dataCache.get(key)](#DataCache#get)
  * [dataCache.set(key, val, expiretime)](#DataCache#set)
  * [dataCache.del(key)](#DataCache#del)

<a name="new_DataCache"></a>
##new DataCache(resources)
A core constructor that provides numerous controller helper functions.

**Params**

- resources `object` - variable injection from resources from instantiated periodic express app  

**Author**: Yaw Joseph Etse  
**License**: MIT  
**Copyright**: Copyright (c) 2014 Typesettin. All rights reserved.  
<a name="DataCache#get"></a>
##dataCache.get(key)
gets the value of a key from the cache

**Params**

- key `string` - key of cached value  

**Returns**: `object` - object value of key  
<a name="DataCache#set"></a>
##dataCache.set(key, val, expiretime)
set the value of a key into the cache store

**Params**

- key `string` - key name  
- val `object` - key value  
- expiretime `number` - number in milliseconds to expire (optional)  

<a name="DataCache#del"></a>
##dataCache.del(key)
deletes key-val from cache store

**Params**

- key `string` - key of cached value  

**Returns**: `object` - object value of key  
<a name="ViewCache"></a>
#class: ViewCache
**Members**

* [class: ViewCache](#ViewCache)
  * [new ViewCache(options)](#new_ViewCache)
  * [viewCache.setExpires(seconds)](#ViewCache#setExpires)
  * [viewCache.get(options, asyncCallback)](#ViewCache#get)
  * [viewCache.set(options, asyncCallback)](#ViewCache#set)
  * [viewCache.del(options, asyncCallback)](#ViewCache#del)
  * [viewCache.length(options, asyncCallback)](#ViewCache#length)

<a name="new_ViewCache"></a>
##new ViewCache(options)
A core constructor that provides numerous cache helper functions.

**Params**

- options `object` - {viewCacheDir}  

**Author**: Yaw Joseph Etse  
**License**: MIT  
**Copyright**: Copyright (c) 2014 Typesettin. All rights reserved.  
<a name="ViewCache#setExpires"></a>
##viewCache.setExpires(seconds)
set the expiretime on a cached view

**Params**

- seconds `number` - [description]  

<a name="ViewCache#get"></a>
##viewCache.get(options, asyncCallback)
gets the value of a key from the cache

**Params**

- options `object` - {key: of cached value}  
- asyncCallback `function` - asyncCallback(err,viewdata)  

**Returns**: `function` - asyncCallback  
<a name="ViewCache#set"></a>
##viewCache.set(options, asyncCallback)
set the value of a key into the cache store

**Params**

- options `object` - {key: key name,val:key value,expiretime: number in milliseconds to expire (optional)}  
- asyncCallback `function` - asyncCallback(err,status)  

**Returns**: `function` - asyncCallback  
<a name="ViewCache#del"></a>
##viewCache.del(options, asyncCallback)
deletes key-val from cache store

**Params**

- options `object` - {key: of cached value}  
- asyncCallback `function` - asyncCallback(err,status)  

**Returns**: `function` - asyncCallback  
<a name="ViewCache#length"></a>
##viewCache.length(options, asyncCallback)
Returns the current number of entries in the cache

**Params**

- options `object` - {key: of cached value}  
- asyncCallback `function` - asyncCallback(err,status)  

**Returns**: `function` - asyncCallback  
