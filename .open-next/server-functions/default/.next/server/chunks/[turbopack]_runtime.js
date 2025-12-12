const RUNTIME_PUBLIC_PATH = "server/chunks/[turbopack]_runtime.js";
const RELATIVE_ROOT_PATH = "..";
const ASSET_PREFIX = "/";
/**
 * This file contains runtime types and functions that are shared between all
 * TurboPack ECMAScript runtimes.
 *
 * It will be prepended to the runtime code of each runtime.
 */ /* eslint-disable @typescript-eslint/no-unused-vars */ /// <reference path="./runtime-types.d.ts" />
const REEXPORTED_OBJECTS = new WeakMap();
/**
 * Constructs the `__turbopack_context__` object for a module.
 */ function Context(module, exports) {
    this.m = module;
    // We need to store this here instead of accessing it from the module object to:
    // 1. Make it available to factories directly, since we rewrite `this` to
    //    `__turbopack_context__.e` in CJS modules.
    // 2. Support async modules which rewrite `module.exports` to a promise, so we
    //    can still access the original exports object from functions like
    //    `esmExport`
    // Ideally we could find a new approach for async modules and drop this property altogether.
    this.e = exports;
}
const contextPrototype = Context.prototype;
const hasOwnProperty = Object.prototype.hasOwnProperty;
const toStringTag = typeof Symbol !== 'undefined' && Symbol.toStringTag;
function defineProp(obj, name, options) {
    if (!hasOwnProperty.call(obj, name)) Object.defineProperty(obj, name, options);
}
function getOverwrittenModule(moduleCache, id) {
    let module = moduleCache[id];
    if (!module) {
        // This is invoked when a module is merged into another module, thus it wasn't invoked via
        // instantiateModule and the cache entry wasn't created yet.
        module = createModuleObject(id);
        moduleCache[id] = module;
    }
    return module;
}
/**
 * Creates the module object. Only done here to ensure all module objects have the same shape.
 */ function createModuleObject(id) {
    return {
        exports: {},
        error: undefined,
        id,
        namespaceObject: undefined
    };
}
const BindingTag_Value = 0;
/**
 * Adds the getters to the exports object.
 */ function esm(exports, bindings) {
    defineProp(exports, '__esModule', {
        value: true
    });
    if (toStringTag) defineProp(exports, toStringTag, {
        value: 'Module'
    });
    let i = 0;
    while(i < bindings.length){
        const propName = bindings[i++];
        const tagOrFunction = bindings[i++];
        if (typeof tagOrFunction === 'number') {
            if (tagOrFunction === BindingTag_Value) {
                defineProp(exports, propName, {
                    value: bindings[i++],
                    enumerable: true,
                    writable: false
                });
            } else {
                throw new Error(`unexpected tag: ${tagOrFunction}`);
            }
        } else {
            const getterFn = tagOrFunction;
            if (typeof bindings[i] === 'function') {
                const setterFn = bindings[i++];
                defineProp(exports, propName, {
                    get: getterFn,
                    set: setterFn,
                    enumerable: true
                });
            } else {
                defineProp(exports, propName, {
                    get: getterFn,
                    enumerable: true
                });
            }
        }
    }
    Object.seal(exports);
}
/**
 * Makes the module an ESM with exports
 */ function esmExport(bindings, id) {
    let module;
    let exports;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
        exports = module.exports;
    } else {
        module = this.m;
        exports = this.e;
    }
    module.namespaceObject = exports;
    esm(exports, bindings);
}
contextPrototype.s = esmExport;
function ensureDynamicExports(module, exports) {
    let reexportedObjects = REEXPORTED_OBJECTS.get(module);
    if (!reexportedObjects) {
        REEXPORTED_OBJECTS.set(module, reexportedObjects = []);
        module.exports = module.namespaceObject = new Proxy(exports, {
            get (target, prop) {
                if (hasOwnProperty.call(target, prop) || prop === 'default' || prop === '__esModule') {
                    return Reflect.get(target, prop);
                }
                for (const obj of reexportedObjects){
                    const value = Reflect.get(obj, prop);
                    if (value !== undefined) return value;
                }
                return undefined;
            },
            ownKeys (target) {
                const keys = Reflect.ownKeys(target);
                for (const obj of reexportedObjects){
                    for (const key of Reflect.ownKeys(obj)){
                        if (key !== 'default' && !keys.includes(key)) keys.push(key);
                    }
                }
                return keys;
            }
        });
    }
    return reexportedObjects;
}
/**
 * Dynamically exports properties from an object
 */ function dynamicExport(object, id) {
    let module;
    let exports;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
        exports = module.exports;
    } else {
        module = this.m;
        exports = this.e;
    }
    const reexportedObjects = ensureDynamicExports(module, exports);
    if (typeof object === 'object' && object !== null) {
        reexportedObjects.push(object);
    }
}
contextPrototype.j = dynamicExport;
function exportValue(value, id) {
    let module;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
    } else {
        module = this.m;
    }
    module.exports = value;
}
contextPrototype.v = exportValue;
function exportNamespace(namespace, id) {
    let module;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
    } else {
        module = this.m;
    }
    module.exports = module.namespaceObject = namespace;
}
contextPrototype.n = exportNamespace;
function createGetter(obj, key) {
    return ()=>obj[key];
}
/**
 * @returns prototype of the object
 */ const getProto = Object.getPrototypeOf ? (obj)=>Object.getPrototypeOf(obj) : (obj)=>obj.__proto__;
/** Prototypes that are not expanded for exports */ const LEAF_PROTOTYPES = [
    null,
    getProto({}),
    getProto([]),
    getProto(getProto)
];
/**
 * @param raw
 * @param ns
 * @param allowExportDefault
 *   * `false`: will have the raw module as default export
 *   * `true`: will have the default property as default export
 */ function interopEsm(raw, ns, allowExportDefault) {
    const bindings = [];
    let defaultLocation = -1;
    for(let current = raw; (typeof current === 'object' || typeof current === 'function') && !LEAF_PROTOTYPES.includes(current); current = getProto(current)){
        for (const key of Object.getOwnPropertyNames(current)){
            bindings.push(key, createGetter(raw, key));
            if (defaultLocation === -1 && key === 'default') {
                defaultLocation = bindings.length - 1;
            }
        }
    }
    // this is not really correct
    // we should set the `default` getter if the imported module is a `.cjs file`
    if (!(allowExportDefault && defaultLocation >= 0)) {
        // Replace the binding with one for the namespace itself in order to preserve iteration order.
        if (defaultLocation >= 0) {
            // Replace the getter with the value
            bindings.splice(defaultLocation, 1, BindingTag_Value, raw);
        } else {
            bindings.push('default', BindingTag_Value, raw);
        }
    }
    esm(ns, bindings);
    return ns;
}
function createNS(raw) {
    if (typeof raw === 'function') {
        return function(...args) {
            return raw.apply(this, args);
        };
    } else {
        return Object.create(null);
    }
}
function esmImport(id) {
    const module = getOrInstantiateModuleFromParent(id, this.m);
    // any ES module has to have `module.namespaceObject` defined.
    if (module.namespaceObject) return module.namespaceObject;
    // only ESM can be an async module, so we don't need to worry about exports being a promise here.
    const raw = module.exports;
    return module.namespaceObject = interopEsm(raw, createNS(raw), raw && raw.__esModule);
}
contextPrototype.i = esmImport;
function asyncLoader(moduleId) {
    const loader = this.r(moduleId);
    return loader(esmImport.bind(this));
}
contextPrototype.A = asyncLoader;
// Add a simple runtime require so that environments without one can still pass
// `typeof require` CommonJS checks so that exports are correctly registered.
const runtimeRequire = // @ts-ignore
typeof require === 'function' ? require : function require1() {
    throw new Error('Unexpected use of runtime require');
};
contextPrototype.t = runtimeRequire;
function commonJsRequire(id) {
    return getOrInstantiateModuleFromParent(id, this.m).exports;
}
contextPrototype.r = commonJsRequire;
/**
 * `require.context` and require/import expression runtime.
 */ function moduleContext(map) {
    function moduleContext(id) {
        if (hasOwnProperty.call(map, id)) {
            return map[id].module();
        }
        const e = new Error(`Cannot find module '${id}'`);
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    }
    moduleContext.keys = ()=>{
        return Object.keys(map);
    };
    moduleContext.resolve = (id)=>{
        if (hasOwnProperty.call(map, id)) {
            return map[id].id();
        }
        const e = new Error(`Cannot find module '${id}'`);
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    };
    moduleContext.import = async (id)=>{
        return await moduleContext(id);
    };
    return moduleContext;
}
contextPrototype.f = moduleContext;
/**
 * Returns the path of a chunk defined by its data.
 */ function getChunkPath(chunkData) {
    return typeof chunkData === 'string' ? chunkData : chunkData.path;
}
function isPromise(maybePromise) {
    return maybePromise != null && typeof maybePromise === 'object' && 'then' in maybePromise && typeof maybePromise.then === 'function';
}
function isAsyncModuleExt(obj) {
    return turbopackQueues in obj;
}
function createPromise() {
    let resolve;
    let reject;
    const promise = new Promise((res, rej)=>{
        reject = rej;
        resolve = res;
    });
    return {
        promise,
        resolve: resolve,
        reject: reject
    };
}
// Load the CompressedmoduleFactories of a chunk into the `moduleFactories` Map.
// The CompressedModuleFactories format is
// - 1 or more module ids
// - a module factory function
// So walking this is a little complex but the flat structure is also fast to
// traverse, we can use `typeof` operators to distinguish the two cases.
function installCompressedModuleFactories(chunkModules, offset, moduleFactories, newModuleId) {
    let i = offset;
    while(i < chunkModules.length){
        let moduleId = chunkModules[i];
        let end = i + 1;
        // Find our factory function
        while(end < chunkModules.length && typeof chunkModules[end] !== 'function'){
            end++;
        }
        if (end === chunkModules.length) {
            throw new Error('malformed chunk format, expected a factory function');
        }
        // Each chunk item has a 'primary id' and optional additional ids. If the primary id is already
        // present we know all the additional ids are also present, so we don't need to check.
        if (!moduleFactories.has(moduleId)) {
            const moduleFactoryFn = chunkModules[end];
            applyModuleFactoryName(moduleFactoryFn);
            newModuleId?.(moduleId);
            for(; i < end; i++){
                moduleId = chunkModules[i];
                moduleFactories.set(moduleId, moduleFactoryFn);
            }
        }
        i = end + 1; // end is pointing at the last factory advance to the next id or the end of the array.
    }
}
// everything below is adapted from webpack
// https://github.com/webpack/webpack/blob/6be4065ade1e252c1d8dcba4af0f43e32af1bdc1/lib/runtime/AsyncModuleRuntimeModule.js#L13
const turbopackQueues = Symbol('turbopack queues');
const turbopackExports = Symbol('turbopack exports');
const turbopackError = Symbol('turbopack error');
function resolveQueue(queue) {
    if (queue && queue.status !== 1) {
        queue.status = 1;
        queue.forEach((fn)=>fn.queueCount--);
        queue.forEach((fn)=>fn.queueCount-- ? fn.queueCount++ : fn());
    }
}
function wrapDeps(deps) {
    return deps.map((dep)=>{
        if (dep !== null && typeof dep === 'object') {
            if (isAsyncModuleExt(dep)) return dep;
            if (isPromise(dep)) {
                const queue = Object.assign([], {
                    status: 0
                });
                const obj = {
                    [turbopackExports]: {},
                    [turbopackQueues]: (fn)=>fn(queue)
                };
                dep.then((res)=>{
                    obj[turbopackExports] = res;
                    resolveQueue(queue);
                }, (err)=>{
                    obj[turbopackError] = err;
                    resolveQueue(queue);
                });
                return obj;
            }
        }
        return {
            [turbopackExports]: dep,
            [turbopackQueues]: ()=>{}
        };
    });
}
function asyncModule(body, hasAwait) {
    const module = this.m;
    const queue = hasAwait ? Object.assign([], {
        status: -1
    }) : undefined;
    const depQueues = new Set();
    const { resolve, reject, promise: rawPromise } = createPromise();
    const promise = Object.assign(rawPromise, {
        [turbopackExports]: module.exports,
        [turbopackQueues]: (fn)=>{
            queue && fn(queue);
            depQueues.forEach(fn);
            promise['catch'](()=>{});
        }
    });
    const attributes = {
        get () {
            return promise;
        },
        set (v) {
            // Calling `esmExport` leads to this.
            if (v !== promise) {
                promise[turbopackExports] = v;
            }
        }
    };
    Object.defineProperty(module, 'exports', attributes);
    Object.defineProperty(module, 'namespaceObject', attributes);
    function handleAsyncDependencies(deps) {
        const currentDeps = wrapDeps(deps);
        const getResult = ()=>currentDeps.map((d)=>{
                if (d[turbopackError]) throw d[turbopackError];
                return d[turbopackExports];
            });
        const { promise, resolve } = createPromise();
        const fn = Object.assign(()=>resolve(getResult), {
            queueCount: 0
        });
        function fnQueue(q) {
            if (q !== queue && !depQueues.has(q)) {
                depQueues.add(q);
                if (q && q.status === 0) {
                    fn.queueCount++;
                    q.push(fn);
                }
            }
        }
        currentDeps.map((dep)=>dep[turbopackQueues](fnQueue));
        return fn.queueCount ? promise : getResult();
    }
    function asyncResult(err) {
        if (err) {
            reject(promise[turbopackError] = err);
        } else {
            resolve(promise[turbopackExports]);
        }
        resolveQueue(queue);
    }
    body(handleAsyncDependencies, asyncResult);
    if (queue && queue.status === -1) {
        queue.status = 0;
    }
}
contextPrototype.a = asyncModule;
/**
 * A pseudo "fake" URL object to resolve to its relative path.
 *
 * When UrlRewriteBehavior is set to relative, calls to the `new URL()` will construct url without base using this
 * runtime function to generate context-agnostic urls between different rendering context, i.e ssr / client to avoid
 * hydration mismatch.
 *
 * This is based on webpack's existing implementation:
 * https://github.com/webpack/webpack/blob/87660921808566ef3b8796f8df61bd79fc026108/lib/runtime/RelativeUrlRuntimeModule.js
 */ const relativeURL = function relativeURL(inputUrl) {
    const realUrl = new URL(inputUrl, 'x:/');
    const values = {};
    for(const key in realUrl)values[key] = realUrl[key];
    values.href = inputUrl;
    values.pathname = inputUrl.replace(/[?#].*/, '');
    values.origin = values.protocol = '';
    values.toString = values.toJSON = (..._args)=>inputUrl;
    for(const key in values)Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        value: values[key]
    });
};
relativeURL.prototype = URL.prototype;
contextPrototype.U = relativeURL;
/**
 * Utility function to ensure all variants of an enum are handled.
 */ function invariant(never, computeMessage) {
    throw new Error(`Invariant: ${computeMessage(never)}`);
}
/**
 * A stub function to make `require` available but non-functional in ESM.
 */ function requireStub(_moduleId) {
    throw new Error('dynamic usage of require is not supported');
}
contextPrototype.z = requireStub;
// Make `globalThis` available to the module in a way that cannot be shadowed by a local variable.
contextPrototype.g = globalThis;
function applyModuleFactoryName(factory) {
    // Give the module factory a nice name to improve stack traces.
    Object.defineProperty(factory, 'name', {
        value: 'module evaluation'
    });
}
/// <reference path="../shared/runtime-utils.ts" />
/// A 'base' utilities to support runtime can have externals.
/// Currently this is for node.js / edge runtime both.
/// If a fn requires node.js specific behavior, it should be placed in `node-external-utils` instead.
async function externalImport(id) {
    let raw;
    try {
        switch (id) {
  case "next/dist/compiled/@vercel/og/index.node.js":
    raw = await import("next/dist/compiled/@vercel/og/index.edge.js");
    break;
  default:
    raw = await import(id);
};
    } catch (err) {
        // TODO(alexkirsz) This can happen when a client-side module tries to load
        // an external module we don't provide a shim for (e.g. querystring, url).
        // For now, we fail semi-silently, but in the future this should be a
        // compilation error.
        throw new Error(`Failed to load external module ${id}: ${err}`);
    }
    if (raw && raw.__esModule && raw.default && 'default' in raw.default) {
        return interopEsm(raw.default, createNS(raw), true);
    }
    return raw;
}
contextPrototype.y = externalImport;
function externalRequire(id, thunk, esm = false) {
    let raw;
    try {
        raw = thunk();
    } catch (err) {
        // TODO(alexkirsz) This can happen when a client-side module tries to load
        // an external module we don't provide a shim for (e.g. querystring, url).
        // For now, we fail semi-silently, but in the future this should be a
        // compilation error.
        throw new Error(`Failed to load external module ${id}: ${err}`);
    }
    if (!esm || raw.__esModule) {
        return raw;
    }
    return interopEsm(raw, createNS(raw), true);
}
externalRequire.resolve = (id, options)=>{
    return require.resolve(id, options);
};
contextPrototype.x = externalRequire;
/* eslint-disable @typescript-eslint/no-unused-vars */ const path = require('path');
const relativePathToRuntimeRoot = path.relative(RUNTIME_PUBLIC_PATH, '.');
// Compute the relative path to the `distDir`.
const relativePathToDistRoot = path.join(relativePathToRuntimeRoot, RELATIVE_ROOT_PATH);
const RUNTIME_ROOT = path.resolve(__filename, relativePathToRuntimeRoot);
// Compute the absolute path to the root, by stripping distDir from the absolute path to this file.
const ABSOLUTE_ROOT = path.resolve(__filename, relativePathToDistRoot);
/**
 * Returns an absolute path to the given module path.
 * Module path should be relative, either path to a file or a directory.
 *
 * This fn allows to calculate an absolute path for some global static values, such as
 * `__dirname` or `import.meta.url` that Turbopack will not embeds in compile time.
 * See ImportMetaBinding::code_generation for the usage.
 */ function resolveAbsolutePath(modulePath) {
    if (modulePath) {
        return path.join(ABSOLUTE_ROOT, modulePath);
    }
    return ABSOLUTE_ROOT;
}
Context.prototype.P = resolveAbsolutePath;
/* eslint-disable @typescript-eslint/no-unused-vars */ /// <reference path="../shared/runtime-utils.ts" />
function readWebAssemblyAsResponse(path) {
    const { createReadStream } = require('fs');
    const { Readable } = require('stream');
    const stream = createReadStream(path);
    // @ts-ignore unfortunately there's a slight type mismatch with the stream.
    return new Response(Readable.toWeb(stream), {
        headers: {
            'content-type': 'application/wasm'
        }
    });
}
async function compileWebAssemblyFromPath(path) {
    const response = readWebAssemblyAsResponse(path);
    return await WebAssembly.compileStreaming(response);
}
async function instantiateWebAssemblyFromPath(path, importsObj) {
    const response = readWebAssemblyAsResponse(path);
    const { instance } = await WebAssembly.instantiateStreaming(response, importsObj);
    return instance.exports;
}
/* eslint-disable @typescript-eslint/no-unused-vars */ /// <reference path="../shared/runtime-utils.ts" />
/// <reference path="../shared-node/base-externals-utils.ts" />
/// <reference path="../shared-node/node-externals-utils.ts" />
/// <reference path="../shared-node/node-wasm-utils.ts" />
var SourceType = /*#__PURE__*/ function(SourceType) {
    /**
   * The module was instantiated because it was included in an evaluated chunk's
   * runtime.
   * SourceData is a ChunkPath.
   */ SourceType[SourceType["Runtime"] = 0] = "Runtime";
    /**
   * The module was instantiated because a parent module imported it.
   * SourceData is a ModuleId.
   */ SourceType[SourceType["Parent"] = 1] = "Parent";
    return SourceType;
}(SourceType || {});
process.env.TURBOPACK = '1';
const nodeContextPrototype = Context.prototype;
const url = require('url');
const moduleFactories = new Map();
nodeContextPrototype.M = moduleFactories;
const moduleCache = Object.create(null);
nodeContextPrototype.c = moduleCache;
/**
 * Returns an absolute path to the given module's id.
 */ function resolvePathFromModule(moduleId) {
    const exported = this.r(moduleId);
    const exportedPath = exported?.default ?? exported;
    if (typeof exportedPath !== 'string') {
        return exported;
    }
    const strippedAssetPrefix = exportedPath.slice(ASSET_PREFIX.length);
    const resolved = path.resolve(RUNTIME_ROOT, strippedAssetPrefix);
    return url.pathToFileURL(resolved).href;
}
nodeContextPrototype.R = resolvePathFromModule;
function loadRuntimeChunk(sourcePath, chunkData) {
    if (typeof chunkData === 'string') {
        loadRuntimeChunkPath(sourcePath, chunkData);
    } else {
        loadRuntimeChunkPath(sourcePath, chunkData.path);
    }
}
const loadedChunks = new Set();
const unsupportedLoadChunk = Promise.resolve(undefined);
const loadedChunk = Promise.resolve(undefined);
const chunkCache = new Map();
function clearChunkCache() {
    chunkCache.clear();
}
function loadRuntimeChunkPath(sourcePath, chunkPath) {
    if (!isJs(chunkPath)) {
        // We only support loading JS chunks in Node.js.
        // This branch can be hit when trying to load a CSS chunk.
        return;
    }
    if (loadedChunks.has(chunkPath)) {
        return;
    }
    try {
        const resolved = path.resolve(RUNTIME_ROOT, chunkPath);
        const chunkModules = requireChunk(chunkPath);
        installCompressedModuleFactories(chunkModules, 0, moduleFactories);
        loadedChunks.add(chunkPath);
    } catch (e) {
        let errorMessage = `Failed to load chunk ${chunkPath}`;
        if (sourcePath) {
            errorMessage += ` from runtime for chunk ${sourcePath}`;
        }
        throw new Error(errorMessage, {
            cause: e
        });
    }
}
function loadChunkAsync(chunkData) {
    const chunkPath = typeof chunkData === 'string' ? chunkData : chunkData.path;
    if (!isJs(chunkPath)) {
        // We only support loading JS chunks in Node.js.
        // This branch can be hit when trying to load a CSS chunk.
        return unsupportedLoadChunk;
    }
    let entry = chunkCache.get(chunkPath);
    if (entry === undefined) {
        try {
            // resolve to an absolute path to simplify `require` handling
            const resolved = path.resolve(RUNTIME_ROOT, chunkPath);
            // TODO: consider switching to `import()` to enable concurrent chunk loading and async file io
            // However this is incompatible with hot reloading (since `import` doesn't use the require cache)
            const chunkModules = requireChunk(chunkPath);
            installCompressedModuleFactories(chunkModules, 0, moduleFactories);
            entry = loadedChunk;
        } catch (e) {
            const errorMessage = `Failed to load chunk ${chunkPath} from module ${this.m.id}`;
            // Cache the failure promise, future requests will also get this same rejection
            entry = Promise.reject(new Error(errorMessage, {
                cause: e
            }));
        }
        chunkCache.set(chunkPath, entry);
    }
    // TODO: Return an instrumented Promise that React can use instead of relying on referential equality.
    return entry;
}
contextPrototype.l = loadChunkAsync;
function loadChunkAsyncByUrl(chunkUrl) {
    const path1 = url.fileURLToPath(new URL(chunkUrl, RUNTIME_ROOT));
    return loadChunkAsync.call(this, path1);
}
contextPrototype.L = loadChunkAsyncByUrl;
function loadWebAssembly(chunkPath, _edgeModule, imports) {
    const resolved = path.resolve(RUNTIME_ROOT, chunkPath);
    return instantiateWebAssemblyFromPath(resolved, imports);
}
contextPrototype.w = loadWebAssembly;
function loadWebAssemblyModule(chunkPath, _edgeModule) {
    const resolved = path.resolve(RUNTIME_ROOT, chunkPath);
    return compileWebAssemblyFromPath(resolved);
}
contextPrototype.u = loadWebAssemblyModule;
function getWorkerBlobURL(_chunks) {
    throw new Error('Worker blobs are not implemented yet for Node.js');
}
nodeContextPrototype.b = getWorkerBlobURL;
function instantiateModule(id, sourceType, sourceData) {
    const moduleFactory = moduleFactories.get(id);
    if (typeof moduleFactory !== 'function') {
        // This can happen if modules incorrectly handle HMR disposes/updates,
        // e.g. when they keep a `setTimeout` around which still executes old code
        // and contains e.g. a `require("something")` call.
        let instantiationReason;
        switch(sourceType){
            case 0:
                instantiationReason = `as a runtime entry of chunk ${sourceData}`;
                break;
            case 1:
                instantiationReason = `because it was required from module ${sourceData}`;
                break;
            default:
                invariant(sourceType, (sourceType)=>`Unknown source type: ${sourceType}`);
        }
        throw new Error(`Module ${id} was instantiated ${instantiationReason}, but the module factory is not available.`);
    }
    const module1 = createModuleObject(id);
    const exports = module1.exports;
    moduleCache[id] = module1;
    const context = new Context(module1, exports);
    // NOTE(alexkirsz) This can fail when the module encounters a runtime error.
    try {
        moduleFactory(context, module1, exports);
    } catch (error) {
        module1.error = error;
        throw error;
    }
    module1.loaded = true;
    if (module1.namespaceObject && module1.exports !== module1.namespaceObject) {
        // in case of a circular dependency: cjs1 -> esm2 -> cjs1
        interopEsm(module1.exports, module1.namespaceObject);
    }
    return module1;
}
/**
 * Retrieves a module from the cache, or instantiate it if it is not cached.
 */ // @ts-ignore
function getOrInstantiateModuleFromParent(id, sourceModule) {
    const module1 = moduleCache[id];
    if (module1) {
        if (module1.error) {
            throw module1.error;
        }
        return module1;
    }
    return instantiateModule(id, 1, sourceModule.id);
}
/**
 * Instantiates a runtime module.
 */ function instantiateRuntimeModule(chunkPath, moduleId) {
    return instantiateModule(moduleId, 0, chunkPath);
}
/**
 * Retrieves a module from the cache, or instantiate it as a runtime module if it is not cached.
 */ // @ts-ignore TypeScript doesn't separate this module space from the browser runtime
function getOrInstantiateRuntimeModule(chunkPath, moduleId) {
    const module1 = moduleCache[moduleId];
    if (module1) {
        if (module1.error) {
            throw module1.error;
        }
        return module1;
    }
    return instantiateRuntimeModule(chunkPath, moduleId);
}
const regexJsUrl = /\.js(?:\?[^#]*)?(?:#.*)?$/;
/**
 * Checks if a given path/URL ends with .js, optionally followed by ?query or #fragment.
 */ function isJs(chunkUrlOrPath) {
    return regexJsUrl.test(chunkUrlOrPath);
}
module.exports = (sourcePath)=>({
        m: (id)=>getOrInstantiateRuntimeModule(sourcePath, id),
        c: (chunkData)=>loadRuntimeChunk(sourcePath, chunkData)
    });


//# sourceMappingURL=%5Bturbopack%5D_runtime.js.map

  function requireChunk(chunkPath) {
    switch(chunkPath) {
      case "server/chunks/ssr/[root-of-the-server]__10651817._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__10651817._.js");
      case "server/chunks/ssr/[root-of-the-server]__296a25b5._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__296a25b5._.js");
      case "server/chunks/ssr/[root-of-the-server]__39e3cd44._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__39e3cd44._.js");
      case "server/chunks/ssr/[root-of-the-server]__915ad491._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__915ad491._.js");
      case "server/chunks/ssr/[root-of-the-server]__ddd3df80._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__ddd3df80._.js");
      case "server/chunks/ssr/[root-of-the-server]__eca5f3a9._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__eca5f3a9._.js");
      case "server/chunks/ssr/[turbopack]_runtime.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[turbopack]_runtime.js");
      case "server/chunks/ssr/_315a9756._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_315a9756._.js");
      case "server/chunks/ssr/_53472598._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_53472598._.js");
      case "server/chunks/ssr/_c1d49e9d._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_c1d49e9d._.js");
      case "server/chunks/ssr/_d25179f9._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_d25179f9._.js");
      case "server/chunks/ssr/_next-internal_server_app__not-found_page_actions_554ec2bf.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app__not-found_page_actions_554ec2bf.js");
      case "server/chunks/ssr/app_b9b1292a._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/app_b9b1292a._.js");
      case "server/chunks/ssr/messages_ar_json_2a006680._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_ar_json_2a006680._.js");
      case "server/chunks/ssr/messages_bn_json_f48620f3._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_bn_json_f48620f3._.js");
      case "server/chunks/ssr/messages_cs_json_266049e1._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_cs_json_266049e1._.js");
      case "server/chunks/ssr/messages_de_json_56e8cde5._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_de_json_56e8cde5._.js");
      case "server/chunks/ssr/messages_el_json_752a6a1d._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_el_json_752a6a1d._.js");
      case "server/chunks/ssr/messages_en_json_a7997480._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_en_json_a7997480._.js");
      case "server/chunks/ssr/messages_es_json_dfd9a03c._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_es_json_dfd9a03c._.js");
      case "server/chunks/ssr/messages_fi_json_0b294a3c._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_fi_json_0b294a3c._.js");
      case "server/chunks/ssr/messages_fr_json_a62d012a._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_fr_json_a62d012a._.js");
      case "server/chunks/ssr/messages_hi_json_7ccbe714._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_hi_json_7ccbe714._.js");
      case "server/chunks/ssr/messages_hu_json_cfdfe9ec._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_hu_json_cfdfe9ec._.js");
      case "server/chunks/ssr/messages_id_json_af29cb1d._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_id_json_af29cb1d._.js");
      case "server/chunks/ssr/messages_it_json_7e811dc5._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_it_json_7e811dc5._.js");
      case "server/chunks/ssr/messages_ja_json_c8477a6a._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_ja_json_c8477a6a._.js");
      case "server/chunks/ssr/messages_ko_json_aa72aef8._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_ko_json_aa72aef8._.js");
      case "server/chunks/ssr/messages_nl_json_d8e58a8b._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_nl_json_d8e58a8b._.js");
      case "server/chunks/ssr/messages_pl_json_e1288e48._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_pl_json_e1288e48._.js");
      case "server/chunks/ssr/messages_pt_json_a6646401._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_pt_json_a6646401._.js");
      case "server/chunks/ssr/messages_ro_json_62860ec0._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_ro_json_62860ec0._.js");
      case "server/chunks/ssr/messages_ru_json_7cc162e8._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_ru_json_7cc162e8._.js");
      case "server/chunks/ssr/messages_sv_json_a464ec3c._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_sv_json_a464ec3c._.js");
      case "server/chunks/ssr/messages_th_json_395ff5ba._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_th_json_395ff5ba._.js");
      case "server/chunks/ssr/messages_tr_json_0bd12e11._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_tr_json_0bd12e11._.js");
      case "server/chunks/ssr/messages_uk_json_bd42ad04._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_uk_json_bd42ad04._.js");
      case "server/chunks/ssr/messages_vi_json_f8b416d8._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_vi_json_f8b416d8._.js");
      case "server/chunks/ssr/messages_zh_json_36af904a._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/messages_zh_json_36af904a._.js");
      case "server/chunks/ssr/node_modules_e9cda82e._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_e9cda82e._.js");
      case "server/chunks/ssr/node_modules_next_a12186a1._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_a12186a1._.js");
      case "server/chunks/ssr/node_modules_next_cf02c53c._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_cf02c53c._.js");
      case "server/chunks/ssr/node_modules_next_dist_7c0fddbd._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_7c0fddbd._.js");
      case "server/chunks/ssr/node_modules_next_dist_c64c4bb0._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_c64c4bb0._.js");
      case "server/chunks/ssr/node_modules_next_dist_client_components_9774470f._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_client_components_9774470f._.js");
      case "server/chunks/ssr/node_modules_next_dist_client_components_builtin_forbidden_45780354.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_client_components_builtin_forbidden_45780354.js");
      case "server/chunks/ssr/node_modules_next_dist_dfaf6e5f._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_dfaf6e5f._.js");
      case "server/chunks/ssr/node_modules_next_dist_esm_3fe9760a._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_esm_3fe9760a._.js");
      case "server/chunks/ssr/node_modules_next_dist_esm_build_templates_app-page_b8e1111a.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_esm_build_templates_app-page_b8e1111a.js");
      case "server/chunks/ssr/node_modules_next_dist_fe61b836._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_fe61b836._.js");
      case "server/chunks/ssr/node_modules_sonner_dist_index_mjs_1addfdea._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_sonner_dist_index_mjs_1addfdea._.js");
      case "server/chunks/ssr/node_modules_use-intl_dist_esm_production_react_ca139740.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_use-intl_dist_esm_production_react_ca139740.js");
      case "server/chunks/ssr/[root-of-the-server]__b9356576._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__b9356576._.js");
      case "server/chunks/ssr/_next-internal_server_app__global-error_page_actions_75761787.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app__global-error_page_actions_75761787.js");
      case "server/chunks/ssr/node_modules_next_dist_f21d913a._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_f21d913a._.js");
      case "server/chunks/[externals]_next_dist_server_app-render_action-async-storage_external_3e50b042.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[externals]_next_dist_server_app-render_action-async-storage_external_3e50b042.js");
      case "server/chunks/[root-of-the-server]__b8951fd1._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__b8951fd1._.js");
      case "server/chunks/[root-of-the-server]__e07722cb._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__e07722cb._.js");
      case "server/chunks/[turbopack]_runtime.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[turbopack]_runtime.js");
      case "server/chunks/_e2372279._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_e2372279._.js");
      case "server/chunks/_next-internal_server_app_api_admin_pros_[id]_approve_route_actions_2e21e603.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_pros_[id]_approve_route_actions_2e21e603.js");
      case "server/chunks/node_modules_e119a22d._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/node_modules_e119a22d._.js");
      case "server/chunks/node_modules_next_dist_a83da99a._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/node_modules_next_dist_a83da99a._.js");
      case "server/chunks/[root-of-the-server]__c3401b5e._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__c3401b5e._.js");
      case "server/chunks/_next-internal_server_app_api_admin_pros_[id]_reject_route_actions_7ed5ae86.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_pros_[id]_reject_route_actions_7ed5ae86.js");
      case "server/chunks/[root-of-the-server]__012b2fe5._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__012b2fe5._.js");
      case "server/chunks/_next-internal_server_app_api_admin_pros_route_actions_5b1e216a.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_admin_pros_route_actions_5b1e216a.js");
      case "server/chunks/[root-of-the-server]__5e997def._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__5e997def._.js");
      case "server/chunks/_46f6a161._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_46f6a161._.js");
      case "server/chunks/_next-internal_server_app_api_agents_[id]_route_actions_e879c4e4.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_agents_[id]_route_actions_e879c4e4.js");
      case "server/chunks/[root-of-the-server]__f7fe744c._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__f7fe744c._.js");
      case "server/chunks/_next-internal_server_app_api_agents_[id]_sessions_route_actions_647cd117.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_agents_[id]_sessions_route_actions_647cd117.js");
      case "server/chunks/node_modules_openai_index_mjs_88cf4560._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/node_modules_openai_index_mjs_88cf4560._.js");
      case "server/chunks/[root-of-the-server]__8d043b3f._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__8d043b3f._.js");
      case "server/chunks/_next-internal_server_app_api_agents_init_route_actions_a2b1528f.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_agents_init_route_actions_a2b1528f.js");
      case "server/chunks/node_modules_next_dist_esm_build_templates_app-route_bcc57f43.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/node_modules_next_dist_esm_build_templates_app-route_bcc57f43.js");
      case "server/chunks/[root-of-the-server]__67e336f1._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__67e336f1._.js");
      case "server/chunks/_next-internal_server_app_api_agents_route_actions_c250846f.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_agents_route_actions_c250846f.js");
      case "server/chunks/[root-of-the-server]__cd19a9a7._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__cd19a9a7._.js");
      case "server/chunks/_next-internal_server_app_api_auth_setup-role_route_actions_47fa5fad.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_auth_setup-role_route_actions_47fa5fad.js");
      case "server/chunks/[root-of-the-server]__08ca8982._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__08ca8982._.js");
      case "server/chunks/[root-of-the-server]__6d3ddead._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__6d3ddead._.js");
      case "server/chunks/_next-internal_server_app_api_auth_sync_route_actions_917f06ab.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_auth_sync_route_actions_917f06ab.js");
      case "server/chunks/[root-of-the-server]__c0884236._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__c0884236._.js");
      case "server/chunks/_next-internal_server_app_api_auth_user_route_actions_1508a899.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_auth_user_route_actions_1508a899.js");
      case "server/chunks/[root-of-the-server]__003bd0a7._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__003bd0a7._.js");
      case "server/chunks/_next-internal_server_app_api_baseten_generate_route_actions_1400701b.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_baseten_generate_route_actions_1400701b.js");
      case "server/chunks/[root-of-the-server]__158f6117._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__158f6117._.js");
      case "server/chunks/_next-internal_server_app_api_chats_[id]_messages_route_actions_5a10e796.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_chats_[id]_messages_route_actions_5a10e796.js");
      case "server/chunks/[root-of-the-server]__4af55e96._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__4af55e96._.js");
      case "server/chunks/_next-internal_server_app_api_chats_[id]_read_route_actions_dbdf98e6.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_chats_[id]_read_route_actions_dbdf98e6.js");
      case "server/chunks/[root-of-the-server]__197da806._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__197da806._.js");
      case "server/chunks/_next-internal_server_app_api_chats_[id]_route_actions_0bd336ca.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_chats_[id]_route_actions_0bd336ca.js");
      case "server/chunks/[root-of-the-server]__8738dfc1._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__8738dfc1._.js");
      case "server/chunks/_next-internal_server_app_api_chats_direct_route_actions_ab1d8a1e.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_chats_direct_route_actions_ab1d8a1e.js");
      case "server/chunks/[root-of-the-server]__43e3de5e._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__43e3de5e._.js");
      case "server/chunks/_next-internal_server_app_api_chats_route_actions_da503915.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_chats_route_actions_da503915.js");
      case "server/chunks/[root-of-the-server]__601c4598._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__601c4598._.js");
      case "server/chunks/_next-internal_server_app_api_clients_route_actions_cf8c8248.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_clients_route_actions_cf8c8248.js");
      case "server/chunks/[root-of-the-server]__f62fb9e1._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__f62fb9e1._.js");
      case "server/chunks/_next-internal_server_app_api_dashboard_stats_route_actions_18a773f6.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_dashboard_stats_route_actions_18a773f6.js");
      case "server/chunks/[root-of-the-server]__027b005e._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__027b005e._.js");
      case "server/chunks/_next-internal_server_app_api_invitations_route_actions_fde7d3ae.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_invitations_route_actions_fde7d3ae.js");
      case "server/chunks/[root-of-the-server]__b8196cfe._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__b8196cfe._.js");
      case "server/chunks/_next-internal_server_app_api_messages_[id]_read_route_actions_8f709538.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_messages_[id]_read_route_actions_8f709538.js");
      case "server/chunks/[root-of-the-server]__ed154f73._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__ed154f73._.js");
      case "server/chunks/bec2d_app_api_organizations_[id]_invitations_[invitationId]_route_actions_4eb45b45.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/bec2d_app_api_organizations_[id]_invitations_[invitationId]_route_actions_4eb45b45.js");
      case "server/chunks/[root-of-the-server]__9cf06f41._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__9cf06f41._.js");
      case "server/chunks/ce889_server_app_api_organizations_[id]_invitations_route_actions_c4859709.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ce889_server_app_api_organizations_[id]_invitations_route_actions_c4859709.js");
      case "server/chunks/[root-of-the-server]__a1cd369e._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__a1cd369e._.js");
      case "server/chunks/_next-internal_server_app_api_organizations_[id]_invite_route_actions_dbd9a69b.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_organizations_[id]_invite_route_actions_dbd9a69b.js");
      case "server/chunks/[root-of-the-server]__e43c83a3._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__e43c83a3._.js");
      case "server/chunks/_next-internal_server_app_api_organizations_[id]_join_route_actions_b30e6604.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_organizations_[id]_join_route_actions_b30e6604.js");
      case "server/chunks/[root-of-the-server]__38de3246._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__38de3246._.js");
      case "server/chunks/_next-internal_server_app_api_organizations_[id]_request_route_actions_14194b2e.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_organizations_[id]_request_route_actions_14194b2e.js");
      case "server/chunks/[root-of-the-server]__7573898f._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__7573898f._.js");
      case "server/chunks/ce889_server_app_api_organizations_[id]_requests_[requestId]_route_actions_8b6b1b01.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ce889_server_app_api_organizations_[id]_requests_[requestId]_route_actions_8b6b1b01.js");
      case "server/chunks/[root-of-the-server]__c339a181._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__c339a181._.js");
      case "server/chunks/_next-internal_server_app_api_organizations_[id]_requests_route_actions_3c0af352.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_organizations_[id]_requests_route_actions_3c0af352.js");
      case "server/chunks/[root-of-the-server]__806bb250._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__806bb250._.js");
      case "server/chunks/_next-internal_server_app_api_organizations_[id]_route_actions_a5431fda.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_organizations_[id]_route_actions_a5431fda.js");
      case "server/chunks/[root-of-the-server]__e69ea1d6._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__e69ea1d6._.js");
      case "server/chunks/_next-internal_server_app_api_organizations_public_route_actions_6021a7ce.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_organizations_public_route_actions_6021a7ce.js");
      case "server/chunks/[root-of-the-server]__02e7cbeb._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__02e7cbeb._.js");
      case "server/chunks/_next-internal_server_app_api_organizations_route_actions_caf7186a.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_organizations_route_actions_caf7186a.js");
      case "server/chunks/[root-of-the-server]__b7be3874._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__b7be3874._.js");
      case "server/chunks/_next-internal_server_app_api_programs_[id]_route_actions_c76dfa04.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_programs_[id]_route_actions_c76dfa04.js");
      case "server/chunks/[root-of-the-server]__ad270983._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__ad270983._.js");
      case "server/chunks/_next-internal_server_app_api_programs_migrate_route_actions_927da495.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_programs_migrate_route_actions_927da495.js");
      case "server/chunks/[root-of-the-server]__d6be1424._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__d6be1424._.js");
      case "server/chunks/_next-internal_server_app_api_programs_route_actions_09abf037.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_programs_route_actions_09abf037.js");
      case "server/chunks/[root-of-the-server]__ea71471c._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__ea71471c._.js");
      case "server/chunks/_next-internal_server_app_api_requests_route_actions_7bfff56e.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_requests_route_actions_7bfff56e.js");
      case "server/chunks/[root-of-the-server]__1a7624bd._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__1a7624bd._.js");
      case "server/chunks/[root-of-the-server]__4cc131b7._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__4cc131b7._.js");
      case "server/chunks/_next-internal_server_app_api_stripe_create-checkout_route_actions_e96ec3ea.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_stripe_create-checkout_route_actions_e96ec3ea.js");
      case "server/chunks/[root-of-the-server]__bb8de457._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__bb8de457._.js");
      case "server/chunks/_next-internal_server_app_api_stripe_create-portal_route_actions_0663465b.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_stripe_create-portal_route_actions_0663465b.js");
      case "server/chunks/[root-of-the-server]__561aa367._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__561aa367._.js");
      case "server/chunks/_next-internal_server_app_api_stripe_invoices_route_actions_8554dd56.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_stripe_invoices_route_actions_8554dd56.js");
      case "server/chunks/[root-of-the-server]__d3ee5860._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__d3ee5860._.js");
      case "server/chunks/_next-internal_server_app_api_subscription_route_actions_1047f468.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_subscription_route_actions_1047f468.js");
      case "server/chunks/[root-of-the-server]__561231ed._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__561231ed._.js");
      case "server/chunks/_next-internal_server_app_api_subscription_sync_route_actions_a49f9c75.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_subscription_sync_route_actions_a49f9c75.js");
      case "server/chunks/[root-of-the-server]__d7b5f461._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__d7b5f461._.js");
      case "server/chunks/_next-internal_server_app_api_users_[id]_profile_route_actions_9f8a470b.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_users_[id]_profile_route_actions_9f8a470b.js");
      case "server/chunks/[root-of-the-server]__f9e74051._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__f9e74051._.js");
      case "server/chunks/_next-internal_server_app_api_users_[id]_route_actions_e7269cbb.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_users_[id]_route_actions_e7269cbb.js");
      case "server/chunks/[root-of-the-server]__e886976d._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__e886976d._.js");
      case "server/chunks/_next-internal_server_app_api_users_route_actions_4b9121e3.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_users_route_actions_4b9121e3.js");
      case "server/chunks/ssr/[root-of-the-server]__07ef8195._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__07ef8195._.js");
      case "server/chunks/ssr/[root-of-the-server]__27a804c7._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__27a804c7._.js");
      case "server/chunks/ssr/[root-of-the-server]__a457c799._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__a457c799._.js");
      case "server/chunks/ssr/[root-of-the-server]__b3ad609b._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__b3ad609b._.js");
      case "server/chunks/ssr/[root-of-the-server]__cbaa360a._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__cbaa360a._.js");
      case "server/chunks/ssr/_0de666a0._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_0de666a0._.js");
      case "server/chunks/ssr/_14123c0b._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_14123c0b._.js");
      case "server/chunks/ssr/_151a9990._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_151a9990._.js");
      case "server/chunks/ssr/_15b8f404._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_15b8f404._.js");
      case "server/chunks/ssr/_582dfaa3._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_582dfaa3._.js");
      case "server/chunks/ssr/_86df7590._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_86df7590._.js");
      case "server/chunks/ssr/_8a6e2ab2._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_8a6e2ab2._.js");
      case "server/chunks/ssr/_8bc27589._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_8bc27589._.js");
      case "server/chunks/ssr/_f807bb83._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_f807bb83._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_admin_organizations_page_actions_95b2fe0d.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_admin_organizations_page_actions_95b2fe0d.js");
      case "server/chunks/ssr/components_ui_select_tsx_7ab5c347._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/components_ui_select_tsx_7ab5c347._.js");
      case "server/chunks/ssr/components_ui_sidebar_tsx_a6674021._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/components_ui_sidebar_tsx_a6674021._.js");
      case "server/chunks/ssr/node_modules_@radix-ui_react-popper_dist_index_mjs_0d6fc757._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_@radix-ui_react-popper_dist_index_mjs_0d6fc757._.js");
      case "server/chunks/ssr/node_modules_next_180037a9._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_180037a9._.js");
      case "server/chunks/ssr/node_modules_next_dist_client_components_builtin_global-error_ece394eb.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_client_components_builtin_global-error_ece394eb.js");
      case "server/chunks/ssr/node_modules_next_dist_client_components_builtin_unauthorized_15817684.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_client_components_builtin_unauthorized_15817684.js");
      case "server/chunks/ssr/[root-of-the-server]__57a686b9._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__57a686b9._.js");
      case "server/chunks/ssr/_66e8303e._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_66e8303e._.js");
      case "server/chunks/ssr/_8175bd11._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_8175bd11._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_admin_pros_page_actions_fc5222cb.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_admin_pros_page_actions_fc5222cb.js");
      case "server/chunks/ssr/[root-of-the-server]__69109c06._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__69109c06._.js");
      case "server/chunks/ssr/_d4d37dde._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_d4d37dde._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_admin_users_page_actions_dbfb3f1c.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_admin_users_page_actions_dbfb3f1c.js");
      case "server/chunks/ssr/app_dashboard_admin_users_page_tsx_013aa17e._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/app_dashboard_admin_users_page_tsx_013aa17e._.js");
      case "server/chunks/ssr/[root-of-the-server]__256e6a37._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__256e6a37._.js");
      case "server/chunks/ssr/[root-of-the-server]__2ec455d0._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__2ec455d0._.js");
      case "server/chunks/ssr/_075009a0._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_075009a0._.js");
      case "server/chunks/ssr/_c5626071._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_c5626071._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_assistants_[id]_chat_page_actions_5049415b.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_assistants_[id]_chat_page_actions_5049415b.js");
      case "server/chunks/ssr/app_dashboard_assistants_[id]_chat_page_tsx_d4758241._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/app_dashboard_assistants_[id]_chat_page_tsx_d4758241._.js");
      case "server/chunks/ssr/components_ui_scroll-area_tsx_9eb30ae5._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/components_ui_scroll-area_tsx_9eb30ae5._.js");
      case "server/chunks/ssr/[root-of-the-server]__48514958._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__48514958._.js");
      case "server/chunks/ssr/_a5f7fa7a._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_a5f7fa7a._.js");
      case "server/chunks/ssr/_aa0f7581._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_aa0f7581._.js");
      case "server/chunks/ssr/ce889_server_app_dashboard_assistants_[id]_history_page_actions_7d742117.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/ce889_server_app_dashboard_assistants_[id]_history_page_actions_7d742117.js");
      case "server/chunks/ssr/node_modules_date-fns_format_7ee61538.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_date-fns_format_7ee61538.js");
      case "server/chunks/ssr/[root-of-the-server]__9db02d93._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__9db02d93._.js");
      case "server/chunks/ssr/_448fd9ea._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_448fd9ea._.js");
      case "server/chunks/ssr/_cfc39c30._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_cfc39c30._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_assistants_page_actions_34b7bf25.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_assistants_page_actions_34b7bf25.js");
      case "server/chunks/ssr/app_dashboard_assistants_page_tsx_2d98669e._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/app_dashboard_assistants_page_tsx_2d98669e._.js");
      case "server/chunks/ssr/components_ui_dropdown-menu_tsx_8ea2dd85._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/components_ui_dropdown-menu_tsx_8ea2dd85._.js");
      case "server/chunks/ssr/[root-of-the-server]__a97a7ad0._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__a97a7ad0._.js");
      case "server/chunks/ssr/_6cb0c8a8._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_6cb0c8a8._.js");
      case "server/chunks/ssr/_90adc9d2._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_90adc9d2._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_calculators_page_actions_7f3b6e15.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_calculators_page_actions_7f3b6e15.js");
      case "server/chunks/ssr/app_dashboard_calculators_page_tsx_1325d5cd._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/app_dashboard_calculators_page_tsx_1325d5cd._.js");
      case "server/chunks/ssr/[root-of-the-server]__5865e2d4._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__5865e2d4._.js");
      case "server/chunks/ssr/_91f42ca0._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_91f42ca0._.js");
      case "server/chunks/ssr/_be2f34a0._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_be2f34a0._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_clients_[id]_follow-up_page_actions_d314ee91.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_clients_[id]_follow-up_page_actions_d314ee91.js");
      case "server/chunks/ssr/[root-of-the-server]__f69b76c5._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__f69b76c5._.js");
      case "server/chunks/ssr/_26b9c060._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_26b9c060._.js");
      case "server/chunks/ssr/_bd7d2e9e._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_bd7d2e9e._.js");
      case "server/chunks/ssr/_d4f6abf7._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_d4f6abf7._.js");
      case "server/chunks/ssr/ce889_server_app_dashboard_clients_[id]_measurements_page_actions_1e7861f7.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/ce889_server_app_dashboard_clients_[id]_measurements_page_actions_1e7861f7.js");
      case "server/chunks/ssr/[root-of-the-server]__9ab5e9bd._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__9ab5e9bd._.js");
      case "server/chunks/ssr/_17423ff0._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_17423ff0._.js");
      case "server/chunks/ssr/_7f43cc1f._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_7f43cc1f._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_clients_[id]_sessions_page_actions_59d1beb3.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_clients_[id]_sessions_page_actions_59d1beb3.js");
      case "server/chunks/ssr/app_dashboard_clients_[id]_sessions_page_tsx_a15e3a63._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/app_dashboard_clients_[id]_sessions_page_tsx_a15e3a63._.js");
      case "server/chunks/ssr/[root-of-the-server]__e3e8f1b9._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__e3e8f1b9._.js");
      case "server/chunks/ssr/_23d97b38._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_23d97b38._.js");
      case "server/chunks/ssr/_60b5764e._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_60b5764e._.js");
      case "server/chunks/ssr/_6a1319a6._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_6a1319a6._.js");
      case "server/chunks/ssr/_c85e47f9._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_c85e47f9._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_clients_page_actions_6d11b09b.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_clients_page_actions_6d11b09b.js");
      case "server/chunks/ssr/app_dashboard_clients_page_tsx_be602588._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/app_dashboard_clients_page_tsx_be602588._.js");
      case "server/chunks/ssr/components_dashboard_program-generator-form_tsx_b10e5587._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/components_dashboard_program-generator-form_tsx_b10e5587._.js");
      case "server/chunks/ssr/components_dashboard_user-profile-form_tsx_7bd06f1c._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/components_dashboard_user-profile-form_tsx_7bd06f1c._.js");
      case "server/chunks/ssr/[root-of-the-server]__a92d5fbc._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__a92d5fbc._.js");
      case "server/chunks/ssr/_082f4e6d._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_082f4e6d._.js");
      case "server/chunks/ssr/_2f2df754._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_2f2df754._.js");
      case "server/chunks/ssr/_931c2ab5._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_931c2ab5._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_messaging_page_actions_e93804de.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_messaging_page_actions_e93804de.js");
      case "server/chunks/ssr/app_dashboard_messaging_page_tsx_eb7f5d6b._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/app_dashboard_messaging_page_tsx_eb7f5d6b._.js");
      case "server/chunks/ssr/[root-of-the-server]__c8fe80cb._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__c8fe80cb._.js");
      case "server/chunks/ssr/_589c1286._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_589c1286._.js");
      case "server/chunks/ssr/_69f63522._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_69f63522._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_nutrition_page_actions_b0c6ba26.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_nutrition_page_actions_b0c6ba26.js");
      case "server/chunks/ssr/[root-of-the-server]__50e7eb1d._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__50e7eb1d._.js");
      case "server/chunks/ssr/_404f9cd8._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_404f9cd8._.js");
      case "server/chunks/ssr/_d3ccd21b._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_d3ccd21b._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_organizations_[id]_page_actions_1e8f9567.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_organizations_[id]_page_actions_1e8f9567.js");
      case "server/chunks/ssr/app_dashboard_organizations_[id]_page_tsx_cb05b0d4._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/app_dashboard_organizations_[id]_page_tsx_cb05b0d4._.js");
      case "server/chunks/ssr/[root-of-the-server]__cf520bbc._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__cf520bbc._.js");
      case "server/chunks/ssr/_34479f58._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_34479f58._.js");
      case "server/chunks/ssr/_b20c25be._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_b20c25be._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_organizations_migrate_page_actions_1bbf5266.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_organizations_migrate_page_actions_1bbf5266.js");
      case "server/chunks/ssr/[root-of-the-server]__fa6d9bdd._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__fa6d9bdd._.js");
      case "server/chunks/ssr/_8928197d._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_8928197d._.js");
      case "server/chunks/ssr/_b7fb533a._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_b7fb533a._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_organizations_page_actions_d75959d1.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_organizations_page_actions_d75959d1.js");
      case "server/chunks/ssr/app_dashboard_organizations_page_tsx_f2196916._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/app_dashboard_organizations_page_tsx_f2196916._.js");
      case "server/chunks/ssr/[root-of-the-server]__2471ce13._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__2471ce13._.js");
      case "server/chunks/ssr/_a6a6ca29._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_a6a6ca29._.js");
      case "server/chunks/ssr/_ba9eeba4._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_ba9eeba4._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_organizations_user_page_actions_300dedae.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_organizations_user_page_actions_300dedae.js");
      case "server/chunks/ssr/[root-of-the-server]__aab0992a._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__aab0992a._.js");
      case "server/chunks/ssr/_1576cb22._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_1576cb22._.js");
      case "server/chunks/ssr/_3cc60cce._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_3cc60cce._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_page_actions_7f01ccec.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_page_actions_7f01ccec.js");
      case "server/chunks/ssr/[root-of-the-server]__f11ed5db._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__f11ed5db._.js");
      case "server/chunks/ssr/_02764777._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_02764777._.js");
      case "server/chunks/ssr/_1cee4417._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_1cee4417._.js");
      case "server/chunks/ssr/_b38ed396._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_b38ed396._.js");
      case "server/chunks/ssr/_b66ac070._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_b66ac070._.js");
      case "server/chunks/ssr/_d3c0ff45._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_d3c0ff45._.js");
      case "server/chunks/ssr/[root-of-the-server]__265ca155._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__265ca155._.js");
      case "server/chunks/ssr/_64ba27ae._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_64ba27ae._.js");
      case "server/chunks/ssr/_f232a06b._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_f232a06b._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_programs_[id]_edit_page_actions_9bba7b02.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_programs_[id]_edit_page_actions_9bba7b02.js");
      case "server/chunks/ssr/app_dashboard_programs_[id]_edit_page_tsx_65d2200f._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/app_dashboard_programs_[id]_edit_page_tsx_65d2200f._.js");
      case "server/chunks/ssr/[root-of-the-server]__2b622cad._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__2b622cad._.js");
      case "server/chunks/ssr/_08fa9868._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_08fa9868._.js");
      case "server/chunks/ssr/_2fec3ffb._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_2fec3ffb._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_programs_[id]_page_actions_fc41ab8a.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_programs_[id]_page_actions_fc41ab8a.js");
      case "server/chunks/ssr/[root-of-the-server]__70566632._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__70566632._.js");
      case "server/chunks/ssr/_0a555d0a._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_0a555d0a._.js");
      case "server/chunks/ssr/_947556c8._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_947556c8._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_programs_builder_page_actions_015f4583.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_programs_builder_page_actions_015f4583.js");
      case "server/chunks/ssr/app_dashboard_programs_builder_page_tsx_466ac906._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/app_dashboard_programs_builder_page_tsx_466ac906._.js");
      case "server/chunks/ssr/[root-of-the-server]__f284563a._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__f284563a._.js");
      case "server/chunks/ssr/_81a3a37f._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_81a3a37f._.js");
      case "server/chunks/ssr/_f681f85b._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_f681f85b._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_programs_page_actions_4b53d549.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_programs_page_actions_4b53d549.js");
      case "server/chunks/ssr/[root-of-the-server]__45e5a105._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__45e5a105._.js");
      case "server/chunks/ssr/_83004e28._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_83004e28._.js");
      case "server/chunks/ssr/_ffb0eab1._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_ffb0eab1._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_trainings_page_actions_f6f1bf2a.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_trainings_page_actions_f6f1bf2a.js");
      case "server/chunks/[root-of-the-server]__3e40c974._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__3e40c974._.js");
      case "server/chunks/_next-internal_server_app_favicon_ico_route_actions_353150a5.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_favicon_ico_route_actions_353150a5.js");
      case "server/chunks/node_modules_next_dist_esm_build_templates_app-route_d6a474cc.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/node_modules_next_dist_esm_build_templates_app-route_d6a474cc.js");
      case "server/chunks/ssr/[root-of-the-server]__eeeef909._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__eeeef909._.js");
      case "server/chunks/ssr/_76397f7b._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_76397f7b._.js");
      case "server/chunks/ssr/_next-internal_server_app_legal_cgv_page_actions_3abaec46.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_legal_cgv_page_actions_3abaec46.js");
      case "server/chunks/ssr/[root-of-the-server]__0108c5ad._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__0108c5ad._.js");
      case "server/chunks/ssr/_cd08d772._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_cd08d772._.js");
      case "server/chunks/ssr/_next-internal_server_app_legal_mentions_page_actions_3b578b0a.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_legal_mentions_page_actions_3b578b0a.js");
      case "server/chunks/ssr/[root-of-the-server]__2e32be29._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__2e32be29._.js");
      case "server/chunks/ssr/_58ae9f5c._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_58ae9f5c._.js");
      case "server/chunks/ssr/_next-internal_server_app_legal_privacy_page_actions_58e1a65f.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_legal_privacy_page_actions_58e1a65f.js");
      case "server/chunks/ssr/app_legal_privacy_page_tsx_f5d6dbd0._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/app_legal_privacy_page_tsx_f5d6dbd0._.js");
      case "server/chunks/ssr/[root-of-the-server]__54ae745a._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__54ae745a._.js");
      case "server/chunks/ssr/_7278dc60._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_7278dc60._.js");
      case "server/chunks/ssr/_next-internal_server_app_legal_termination_page_actions_f1b6429a.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_legal_termination_page_actions_f1b6429a.js");
      case "server/chunks/ssr/_4276b63a._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_4276b63a._.js");
      case "server/chunks/ssr/_next-internal_server_app_legal_terms_page_actions_2eb0a351.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_legal_terms_page_actions_2eb0a351.js");
      case "server/chunks/ssr/app_legal_terms_page_tsx_7b7227c8._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/app_legal_terms_page_tsx_7b7227c8._.js");
      case "server/chunks/ssr/[root-of-the-server]__3a4bf366._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__3a4bf366._.js");
      case "server/chunks/ssr/_3384b485._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_3384b485._.js");
      case "server/chunks/ssr/_a61ac388._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_a61ac388._.js");
      case "server/chunks/ssr/_next-internal_server_app_logout_page_actions_c6b70193.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_logout_page_actions_c6b70193.js");
      case "server/chunks/ssr/[root-of-the-server]__dd858d22._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__dd858d22._.js");
      case "server/chunks/ssr/_0c73b96c._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_0c73b96c._.js");
      case "server/chunks/ssr/_27f38564._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_27f38564._.js");
      case "server/chunks/ssr/_52a4995a._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_52a4995a._.js");
      case "server/chunks/ssr/_5cf7b57d._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_5cf7b57d._.js");
      case "server/chunks/ssr/_86989c8d._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_86989c8d._.js");
      case "server/chunks/ssr/_d8169a43._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_d8169a43._.js");
      case "server/chunks/ssr/_ed81f6d8._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_ed81f6d8._.js");
      case "server/chunks/ssr/_next-internal_server_app_page_actions_39d4fc33.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_page_actions_39d4fc33.js");
      case "server/chunks/ssr/[root-of-the-server]__bc7733a9._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__bc7733a9._.js");
      case "server/chunks/ssr/_1b4a1a4b._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_1b4a1a4b._.js");
      case "server/chunks/ssr/_4e3bd87e._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_4e3bd87e._.js");
      case "server/chunks/ssr/_69907a52._.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_69907a52._.js");
      case "server/chunks/ssr/_next-internal_server_app_signup_page_actions_0a2f511f.js": return require("/Users/k7/PRO/ATLETIA/dashboard/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_signup_page_actions_0a2f511f.js");
      default:
        throw new Error(`Not found ${chunkPath}`);
    }
  }
