
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.9.4";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/@opennextjs/aws/node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/@opennextjs/aws/node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream2({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream2({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream2({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// .next/server/edge/chunks/[root-of-the-server]__ad53bf88._.js
var require_root_of_the_server_ad53bf88 = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__ad53bf88._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__ad53bf88._.js", 372418, (t) => {
      t.v({ name: "@auth0/nextjs-auth0", version: "4.12.1", description: "Auth0 Next.js SDK", type: "module", repository: { type: "git", url: "git+https://github.com/auth0/nextjs-auth0.git" }, keywords: ["auth0", "next.js", "react", "oidc", "authentication", "vercel"], author: "Auth0 (https://auth0.com)", license: "MIT", bugs: { url: "https://github.com/auth0/nextjs-auth0/issues" }, homepage: "https://github.com/auth0/nextjs-auth0#readme", devDependencies: { "@eslint/js": "^9.20.0", "@ianvs/prettier-plugin-sort-imports": "^4.3.1", "@playwright/test": "^1.48.2", "@stylistic/eslint-plugin-ts": "^3.1.0", "@testing-library/react": "^16.3.0", "@types/node": "^22.8.6", "@types/react": "*", "@types/react-dom": "*", "@vitest/coverage-v8": "2.1.9", eslint: "^9.20.0", "eslint-config-prettier": "10.1.8", "eslint-plugin-prettier": "5.5.4", "eslint-plugin-react": "^7.37.4", globals: "^15.14.0", jsdom: "^26.1.0", msw: "^2.7.5", next: "15.2.3", prettier: "^3.3.3", typedoc: "^0.28.4", typescript: "^5.6.3", "typescript-eslint": "^8.23.0", vite: "^5.4.11", vitest: "^2.1.4" }, peerDependencies: { next: "^14.2.25 || ^15.2.3", react: "^18.0.0 || ^19.0.0 || ^19.0.0-0", "react-dom": "^18.0.0 || ^19.0.0 || ^19.0.0-0" }, exports: { ".": { default: "./dist/client/index.js" }, "./client": { default: "./dist/client/index.js" }, "./server": { default: "./dist/server/index.js" }, "./errors": { default: "./dist/errors/index.js" }, "./types": { default: "./dist/types/index.d.ts" }, "./testing": { default: "./dist/testing/index.js" } }, dependencies: { "@edge-runtime/cookies": "^5.0.1", "@panva/hkdf": "^1.2.1", jose: "^6.0.11", oauth4webapi: "^3.8.2", "openid-client": "^6.8.0", swr: "^2.2.5" }, publishConfig: { access: "public" }, typesVersions: { "*": { testing: ["./dist/testing/index.d.ts"], types: ["./dist/types/index.d.ts"], server: ["./dist/server/index.d.ts"], errors: ["./dist/errors/index.d.ts"], "*": ["./dist/client/*", "./dist/client/index.d.ts"] } }, files: ["dist"], scripts: { build: "tsc", "build:watch": "tsc -w", "test:unit": "vitest --run", "test:coverage": "vitest run --run --coverage", "test:e2e": "playwright test", "install:examples": "pnpm install --filter ./examples/with-next-intl --shamefully-hoist && pnpm install --filter ./examples/with-shadcn --shamefully-hoist", docs: "typedoc", lint: "tsc --noEmit && tsc --noEmit --project tsconfig.test.json && eslint ./src", "lint:fix": "tsc --noEmit && tsc --noEmit --project tsconfig.test.json && eslint --fix ./src" } });
    }, 951615, (t, e, s) => {
      e.exports = t.x("node:buffer", () => (init_node_buffer(), __toCommonJS(node_buffer_exports)));
    }, 478500, (t, e, s) => {
      e.exports = t.x("node:async_hooks", () => (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports)));
    }, 732442, (t, e, s) => {
      self._ENTRIES ||= {};
      let i = Promise.resolve().then(() => t.i(242738));
      i.catch(() => {
      }), self._ENTRIES.middleware_middleware = new Proxy(i, { get(t2, e2) {
        if ("then" === e2) return (e3, s3) => t2.then(e3, s3);
        let s2 = (...s3) => t2.then((t3) => (0, t3[e2])(...s3));
        return s2.then = (s3, i2) => t2.then((t3) => t3[e2]).then(s3, i2), s2;
      } });
    }]);
  }
});

// .next/server/edge/chunks/node_modules_next_dist_82203b28._.js
var require_node_modules_next_dist_82203b28 = __commonJS({
  ".next/server/edge/chunks/node_modules_next_dist_82203b28._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/node_modules_next_dist_82203b28._.js", 987049, (e, r, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = { bindSnapshot: function() {
        return u;
      }, createAsyncLocalStorage: function() {
        return s;
      }, createSnapshot: function() {
        return l;
      } };
      for (var a in n) Object.defineProperty(t, a, { enumerable: true, get: n[a] });
      let o = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class i {
        disable() {
          throw o;
        }
        getStore() {
        }
        run() {
          throw o;
        }
        exit() {
          throw o;
        }
        enterWith() {
          throw o;
        }
        static bind(e2) {
          return e2;
        }
      }
      let c = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function s() {
        return c ? new c() : new i();
      }
      function u(e2) {
        return c ? c.bind(e2) : i.bind(e2);
      }
      function l() {
        return c ? c.snapshot() : function(e2, ...r2) {
          return e2(...r2);
        };
      }
    }, 290063, (e, r, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), Object.defineProperty(t, "workAsyncStorageInstance", { enumerable: true, get: function() {
        return n;
      } });
      let n = (0, e.r(987049).createAsyncLocalStorage)();
    }, 70590, (e, r, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), Object.defineProperty(t, "workAsyncStorage", { enumerable: true, get: function() {
        return n.workAsyncStorageInstance;
      } });
      let n = e.r(290063);
    }, 751306, (e, r, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), Object.defineProperty(t, "workUnitAsyncStorageInstance", { enumerable: true, get: function() {
        return n;
      } });
      let n = (0, e.r(987049).createAsyncLocalStorage)();
    }, 833220, (e, r, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = { ACTION_HEADER: function() {
        return i;
      }, FLIGHT_HEADERS: function() {
        return h;
      }, NEXT_ACTION_NOT_FOUND_HEADER: function() {
        return v;
      }, NEXT_DID_POSTPONE_HEADER: function() {
        return g;
      }, NEXT_HMR_REFRESH_HASH_COOKIE: function() {
        return d;
      }, NEXT_HMR_REFRESH_HEADER: function() {
        return l;
      }, NEXT_HTML_REQUEST_ID_HEADER: function() {
        return S;
      }, NEXT_IS_PRERENDER_HEADER: function() {
        return b;
      }, NEXT_REQUEST_ID_HEADER: function() {
        return R;
      }, NEXT_REWRITTEN_PATH_HEADER: function() {
        return _;
      }, NEXT_REWRITTEN_QUERY_HEADER: function() {
        return E;
      }, NEXT_ROUTER_PREFETCH_HEADER: function() {
        return s;
      }, NEXT_ROUTER_SEGMENT_PREFETCH_HEADER: function() {
        return u;
      }, NEXT_ROUTER_STALE_TIME_HEADER: function() {
        return m;
      }, NEXT_ROUTER_STATE_TREE_HEADER: function() {
        return c;
      }, NEXT_RSC_UNION_QUERY: function() {
        return y;
      }, NEXT_URL: function() {
        return f;
      }, RSC_CONTENT_TYPE_HEADER: function() {
        return p;
      }, RSC_HEADER: function() {
        return o;
      } };
      for (var a in n) Object.defineProperty(t, a, { enumerable: true, get: n[a] });
      let o = "rsc", i = "next-action", c = "next-router-state-tree", s = "next-router-prefetch", u = "next-router-segment-prefetch", l = "next-hmr-refresh", d = "__next_hmr_refresh_hash__", f = "next-url", p = "text/x-component", h = [o, c, s, l, u], y = "_rsc", m = "x-nextjs-stale-time", g = "x-nextjs-postponed", _ = "x-nextjs-rewritten-path", E = "x-nextjs-rewritten-query", b = "x-nextjs-prerender", v = "x-nextjs-action-not-found", R = "x-nextjs-request-id", S = "x-nextjs-html-request-id";
      ("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", { value: true }), Object.assign(t.default, t), r.exports = t.default);
    }, 802014, (e, r, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), Object.defineProperty(t, "InvariantError", { enumerable: true, get: function() {
        return n;
      } });
      class n extends Error {
        constructor(e2, r2) {
          super(`Invariant: ${e2.endsWith(".") ? e2 : e2 + "."} This is a bug in Next.js.`, r2), this.name = "InvariantError";
        }
      }
    }, 108048, (e, r, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = { getCacheSignal: function() {
        return m;
      }, getDraftModeProviderForCacheScope: function() {
        return y;
      }, getHmrRefreshHash: function() {
        return f;
      }, getPrerenderResumeDataCache: function() {
        return l;
      }, getRenderResumeDataCache: function() {
        return d;
      }, getRuntimeStagePromise: function() {
        return g;
      }, getServerComponentsHmrCache: function() {
        return h;
      }, isHmrRefresh: function() {
        return p;
      }, throwForMissingRequestStore: function() {
        return s;
      }, throwInvariantForMissingStore: function() {
        return u;
      }, workUnitAsyncStorage: function() {
        return o.workUnitAsyncStorageInstance;
      } };
      for (var a in n) Object.defineProperty(t, a, { enumerable: true, get: n[a] });
      let o = e.r(751306), i = e.r(833220), c = e.r(802014);
      function s(e2) {
        throw Object.defineProperty(Error(`\`${e2}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E251", enumerable: false, configurable: true });
      }
      function u() {
        throw Object.defineProperty(new c.InvariantError("Expected workUnitAsyncStorage to have a store."), "__NEXT_ERROR_CODE", { value: "E696", enumerable: false, configurable: true });
      }
      function l(e2) {
        switch (e2.type) {
          case "prerender":
          case "prerender-runtime":
          case "prerender-ppr":
          case "prerender-client":
            return e2.prerenderResumeDataCache;
          case "request":
            if (e2.prerenderResumeDataCache) return e2.prerenderResumeDataCache;
          case "prerender-legacy":
          case "cache":
          case "private-cache":
          case "unstable-cache":
            return null;
          default:
            return e2;
        }
      }
      function d(e2) {
        switch (e2.type) {
          case "request":
          case "prerender":
          case "prerender-runtime":
          case "prerender-client":
            if (e2.renderResumeDataCache) return e2.renderResumeDataCache;
          case "prerender-ppr":
            return e2.prerenderResumeDataCache ?? null;
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "prerender-legacy":
            return null;
          default:
            return e2;
        }
      }
      function f(e2, r2) {
        if (e2.dev) switch (r2.type) {
          case "cache":
          case "private-cache":
          case "prerender":
          case "prerender-runtime":
            return r2.hmrRefreshHash;
          case "request":
            var t2;
            return null == (t2 = r2.cookies.get(i.NEXT_HMR_REFRESH_HASH_COOKIE)) ? void 0 : t2.value;
        }
      }
      function p(e2, r2) {
        if (e2.dev) switch (r2.type) {
          case "cache":
          case "private-cache":
          case "request":
            return r2.isHmrRefresh ?? false;
        }
        return false;
      }
      function h(e2, r2) {
        if (e2.dev) switch (r2.type) {
          case "cache":
          case "private-cache":
          case "request":
            return r2.serverComponentsHmrCache;
        }
      }
      function y(e2, r2) {
        if (e2.isDraftMode) switch (r2.type) {
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "prerender-runtime":
          case "request":
            return r2.draftMode;
        }
      }
      function m(e2) {
        switch (e2.type) {
          case "prerender":
          case "prerender-client":
          case "prerender-runtime":
            return e2.cacheSignal;
          case "request":
            if (e2.cacheSignal) return e2.cacheSignal;
          case "prerender-ppr":
          case "prerender-legacy":
          case "cache":
          case "private-cache":
          case "unstable-cache":
            return null;
          default:
            return e2;
        }
      }
      function g(e2) {
        switch (e2.type) {
          case "prerender-runtime":
          case "private-cache":
            return e2.runtimeStagePromise;
          case "prerender":
          case "prerender-client":
          case "prerender-ppr":
          case "prerender-legacy":
          case "request":
          case "cache":
          case "unstable-cache":
            return null;
          default:
            return e2;
        }
      }
    }, 708946, (e, r, t) => {
      "use strict";
      var n = { H: null, A: null };
      function a(e2) {
        var r2 = "https://react.dev/errors/" + e2;
        if (1 < arguments.length) {
          r2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var t2 = 2; t2 < arguments.length; t2++) r2 += "&args[]=" + encodeURIComponent(arguments[t2]);
        }
        return "Minified React error #" + e2 + "; visit " + r2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var o = Array.isArray;
      function i() {
      }
      var c = Symbol.for("react.transitional.element"), s = Symbol.for("react.portal"), u = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), f = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), m = Symbol.for("react.activity"), g = Symbol.for("react.view_transition"), _ = Symbol.iterator, E = Object.prototype.hasOwnProperty, b = Object.assign;
      function v(e2, r2, t2) {
        var n2 = t2.ref;
        return { $$typeof: c, type: e2, key: r2, ref: void 0 !== n2 ? n2 : null, props: t2 };
      }
      function R(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === c;
      }
      var S = /\/+/g;
      function w(e2, r2) {
        var t2, n2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (t2 = "" + e2.key, n2 = { "=": "=0", ":": "=2" }, "$" + t2.replace(/[=:]/g, function(e3) {
          return n2[e3];
        })) : r2.toString(36);
      }
      function O(e2, r2, t2) {
        if (null == e2) return e2;
        var n2 = [], u2 = 0;
        return !function e3(r3, t3, n3, u3, l2) {
          var d2, f2, p2, h2 = typeof r3;
          ("undefined" === h2 || "boolean" === h2) && (r3 = null);
          var m2 = false;
          if (null === r3) m2 = true;
          else switch (h2) {
            case "bigint":
            case "string":
            case "number":
              m2 = true;
              break;
            case "object":
              switch (r3.$$typeof) {
                case c:
                case s:
                  m2 = true;
                  break;
                case y:
                  return e3((m2 = r3._init)(r3._payload), t3, n3, u3, l2);
              }
          }
          if (m2) return l2 = l2(r3), m2 = "" === u3 ? "." + w(r3, 0) : u3, o(l2) ? (n3 = "", null != m2 && (n3 = m2.replace(S, "$&/") + "/"), e3(l2, t3, n3, "", function(e4) {
            return e4;
          })) : null != l2 && (R(l2) && (d2 = l2, f2 = n3 + (null == l2.key || r3 && r3.key === l2.key ? "" : ("" + l2.key).replace(S, "$&/") + "/") + m2, l2 = v(d2.type, f2, d2.props)), t3.push(l2)), 1;
          m2 = 0;
          var g2 = "" === u3 ? "." : u3 + ":";
          if (o(r3)) for (var E2 = 0; E2 < r3.length; E2++) h2 = g2 + w(u3 = r3[E2], E2), m2 += e3(u3, t3, n3, h2, l2);
          else if ("function" == typeof (E2 = null === (p2 = r3) || "object" != typeof p2 ? null : "function" == typeof (p2 = _ && p2[_] || p2["@@iterator"]) ? p2 : null)) for (r3 = E2.call(r3), E2 = 0; !(u3 = r3.next()).done; ) h2 = g2 + w(u3 = u3.value, E2++), m2 += e3(u3, t3, n3, h2, l2);
          else if ("object" === h2) {
            if ("function" == typeof r3.then) return e3(function(e4) {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" == typeof e4.status ? e4.then(i, i) : (e4.status = "pending", e4.then(function(r4) {
                    "pending" === e4.status && (e4.status = "fulfilled", e4.value = r4);
                  }, function(r4) {
                    "pending" === e4.status && (e4.status = "rejected", e4.reason = r4);
                  })), e4.status) {
                    case "fulfilled":
                      return e4.value;
                    case "rejected":
                      throw e4.reason;
                  }
              }
              throw e4;
            }(r3), t3, n3, u3, l2);
            throw Error(a(31, "[object Object]" === (t3 = String(r3)) ? "object with keys {" + Object.keys(r3).join(", ") + "}" : t3));
          }
          return m2;
        }(e2, n2, "", "", function(e3) {
          return r2.call(t2, e3, u2++);
        }), n2;
      }
      function T(e2) {
        if (-1 === e2._status) {
          var r2 = e2._result;
          (r2 = r2()).then(function(r3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = r3);
          }, function(r3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = r3);
          }), -1 === e2._status && (e2._status = 0, e2._result = r2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function D() {
        return /* @__PURE__ */ new WeakMap();
      }
      function A() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      t.Activity = m, t.Children = { map: O, forEach: function(e2, r2, t2) {
        O(e2, function() {
          r2.apply(this, arguments);
        }, t2);
      }, count: function(e2) {
        var r2 = 0;
        return O(e2, function() {
          r2++;
        }), r2;
      }, toArray: function(e2) {
        return O(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!R(e2)) throw Error(a(143));
        return e2;
      } }, t.Fragment = u, t.Profiler = d, t.StrictMode = l, t.Suspense = p, t.ViewTransition = g, t.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = n, t.cache = function(e2) {
        return function() {
          var r2 = n.A;
          if (!r2) return e2.apply(null, arguments);
          var t2 = r2.getCacheForType(D);
          void 0 === (r2 = t2.get(e2)) && (r2 = A(), t2.set(e2, r2)), t2 = 0;
          for (var a2 = arguments.length; t2 < a2; t2++) {
            var o2 = arguments[t2];
            if ("function" == typeof o2 || "object" == typeof o2 && null !== o2) {
              var i2 = r2.o;
              null === i2 && (r2.o = i2 = /* @__PURE__ */ new WeakMap()), void 0 === (r2 = i2.get(o2)) && (r2 = A(), i2.set(o2, r2));
            } else null === (i2 = r2.p) && (r2.p = i2 = /* @__PURE__ */ new Map()), void 0 === (r2 = i2.get(o2)) && (r2 = A(), i2.set(o2, r2));
          }
          if (1 === r2.s) return r2.v;
          if (2 === r2.s) throw r2.v;
          try {
            var c2 = e2.apply(null, arguments);
            return (t2 = r2).s = 1, t2.v = c2;
          } catch (e3) {
            throw (c2 = r2).s = 2, c2.v = e3, e3;
          }
        };
      }, t.cacheSignal = function() {
        var e2 = n.A;
        return e2 ? e2.cacheSignal() : null;
      }, t.captureOwnerStack = function() {
        return null;
      }, t.cloneElement = function(e2, r2, t2) {
        if (null == e2) throw Error(a(267, e2));
        var n2 = b({}, e2.props), o2 = e2.key;
        if (null != r2) for (i2 in void 0 !== r2.key && (o2 = "" + r2.key), r2) E.call(r2, i2) && "key" !== i2 && "__self" !== i2 && "__source" !== i2 && ("ref" !== i2 || void 0 !== r2.ref) && (n2[i2] = r2[i2]);
        var i2 = arguments.length - 2;
        if (1 === i2) n2.children = t2;
        else if (1 < i2) {
          for (var c2 = Array(i2), s2 = 0; s2 < i2; s2++) c2[s2] = arguments[s2 + 2];
          n2.children = c2;
        }
        return v(e2.type, o2, n2);
      }, t.createElement = function(e2, r2, t2) {
        var n2, a2 = {}, o2 = null;
        if (null != r2) for (n2 in void 0 !== r2.key && (o2 = "" + r2.key), r2) E.call(r2, n2) && "key" !== n2 && "__self" !== n2 && "__source" !== n2 && (a2[n2] = r2[n2]);
        var i2 = arguments.length - 2;
        if (1 === i2) a2.children = t2;
        else if (1 < i2) {
          for (var c2 = Array(i2), s2 = 0; s2 < i2; s2++) c2[s2] = arguments[s2 + 2];
          a2.children = c2;
        }
        if (e2 && e2.defaultProps) for (n2 in i2 = e2.defaultProps) void 0 === a2[n2] && (a2[n2] = i2[n2]);
        return v(e2, o2, a2);
      }, t.createRef = function() {
        return { current: null };
      }, t.forwardRef = function(e2) {
        return { $$typeof: f, render: e2 };
      }, t.isValidElement = R, t.lazy = function(e2) {
        return { $$typeof: y, _payload: { _status: -1, _result: e2 }, _init: T };
      }, t.memo = function(e2, r2) {
        return { $$typeof: h, type: e2, compare: void 0 === r2 ? null : r2 };
      }, t.use = function(e2) {
        return n.H.use(e2);
      }, t.useCallback = function(e2, r2) {
        return n.H.useCallback(e2, r2);
      }, t.useDebugValue = function() {
      }, t.useId = function() {
        return n.H.useId();
      }, t.useMemo = function(e2, r2) {
        return n.H.useMemo(e2, r2);
      }, t.version = "19.3.0-canary-52684925-20251110";
    }, 40049, (e, r, t) => {
      "use strict";
      r.exports = e.r(708946);
    }, 993476, (e, r, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = { DynamicServerError: function() {
        return i;
      }, isDynamicServerError: function() {
        return c;
      } };
      for (var a in n) Object.defineProperty(t, a, { enumerable: true, get: n[a] });
      let o = "DYNAMIC_SERVER_USAGE";
      class i extends Error {
        constructor(e2) {
          super(`Dynamic server usage: ${e2}`), this.description = e2, this.digest = o;
        }
      }
      function c(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && "string" == typeof e2.digest && e2.digest === o;
      }
      ("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", { value: true }), Object.assign(t.default, t), r.exports = t.default);
    }, 796021, (e, r, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = { StaticGenBailoutError: function() {
        return i;
      }, isStaticGenBailoutError: function() {
        return c;
      } };
      for (var a in n) Object.defineProperty(t, a, { enumerable: true, get: n[a] });
      let o = "NEXT_STATIC_GEN_BAILOUT";
      class i extends Error {
        constructor(...e2) {
          super(...e2), this.code = o;
        }
      }
      function c(e2) {
        return "object" == typeof e2 && null !== e2 && "code" in e2 && e2.code === o;
      }
      ("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", { value: true }), Object.assign(t.default, t), r.exports = t.default);
    }, 887014, (e, r, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = { isHangingPromiseRejectionError: function() {
        return o;
      }, makeDevtoolsIOAwarePromise: function() {
        return d;
      }, makeHangingPromise: function() {
        return u;
      } };
      for (var a in n) Object.defineProperty(t, a, { enumerable: true, get: n[a] });
      function o(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && e2.digest === i;
      }
      let i = "HANGING_PROMISE_REJECTION";
      class c extends Error {
        constructor(e2, r2) {
          super(`During prerendering, ${r2} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${r2} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${e2}".`), this.route = e2, this.expression = r2, this.digest = i;
        }
      }
      let s = /* @__PURE__ */ new WeakMap();
      function u(e2, r2, t2) {
        if (e2.aborted) return Promise.reject(new c(r2, t2));
        {
          let n2 = new Promise((n3, a2) => {
            let o2 = a2.bind(null, new c(r2, t2)), i2 = s.get(e2);
            if (i2) i2.push(o2);
            else {
              let r3 = [o2];
              s.set(e2, r3), e2.addEventListener("abort", () => {
                for (let e3 = 0; e3 < r3.length; e3++) r3[e3]();
              }, { once: true });
            }
          });
          return n2.catch(l), n2;
        }
      }
      function l() {
      }
      function d(e2, r2, t2) {
        return r2.stagedRendering ? r2.stagedRendering.delayUntilStage(t2, void 0, e2) : new Promise((r3) => {
          setTimeout(() => {
            r3(e2);
          }, 0);
        });
      }
    }, 323290, (e, r, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = { METADATA_BOUNDARY_NAME: function() {
        return o;
      }, OUTLET_BOUNDARY_NAME: function() {
        return c;
      }, ROOT_LAYOUT_BOUNDARY_NAME: function() {
        return s;
      }, VIEWPORT_BOUNDARY_NAME: function() {
        return i;
      } };
      for (var a in n) Object.defineProperty(t, a, { enumerable: true, get: n[a] });
      let o = "__next_metadata_boundary__", i = "__next_viewport_boundary__", c = "__next_outlet_boundary__", s = "__next_root_layout_boundary__";
    }, 325701, (e, r, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = { atLeastOneTask: function() {
        return c;
      }, scheduleImmediate: function() {
        return i;
      }, scheduleOnNextTick: function() {
        return o;
      }, waitAtLeastOneReactRenderTask: function() {
        return s;
      } };
      for (var a in n) Object.defineProperty(t, a, { enumerable: true, get: n[a] });
      let o = (e2) => {
        Promise.resolve().then(() => {
          setTimeout(e2, 0);
        });
      }, i = (e2) => {
        setTimeout(e2, 0);
      };
      function c() {
        return new Promise((e2) => i(e2));
      }
      function s() {
        return new Promise((e2) => setTimeout(e2, 0));
      }
    }, 717954, (e, r, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = { BailoutToCSRError: function() {
        return i;
      }, isBailoutToCSRError: function() {
        return c;
      } };
      for (var a in n) Object.defineProperty(t, a, { enumerable: true, get: n[a] });
      let o = "BAILOUT_TO_CLIENT_SIDE_RENDERING";
      class i extends Error {
        constructor(e2) {
          super(`Bail out to client-side rendering: ${e2}`), this.reason = e2, this.digest = o;
        }
      }
      function c(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && e2.digest === o;
      }
    }, 79383, (e, r, t) => {
      "use strict";
      function n() {
        let e2, r2, t2 = new Promise((t3, n2) => {
          e2 = t3, r2 = n2;
        });
        return { resolve: e2, reject: r2, promise: t2 };
      }
      Object.defineProperty(t, "__esModule", { value: true }), Object.defineProperty(t, "createPromiseWithResolvers", { enumerable: true, get: function() {
        return n;
      } });
    }, 847122, (e, r, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n, a = { RenderStage: function() {
        return s;
      }, StagedRenderingController: function() {
        return u;
      } };
      for (var o in a) Object.defineProperty(t, o, { enumerable: true, get: a[o] });
      let i = e.r(802014), c = e.r(79383);
      var s = ((n = {})[n.Static = 1] = "Static", n[n.Runtime = 2] = "Runtime", n[n.Dynamic = 3] = "Dynamic", n);
      class u {
        constructor(e2 = null) {
          this.abortSignal = e2, this.currentStage = 1, this.runtimeStagePromise = (0, c.createPromiseWithResolvers)(), this.dynamicStagePromise = (0, c.createPromiseWithResolvers)(), e2 && e2.addEventListener("abort", () => {
            let { reason: r2 } = e2;
            this.currentStage < 2 && (this.runtimeStagePromise.promise.catch(l), this.runtimeStagePromise.reject(r2)), this.currentStage < 3 && (this.dynamicStagePromise.promise.catch(l), this.dynamicStagePromise.reject(r2));
          }, { once: true });
        }
        advanceStage(e2) {
          !(this.currentStage >= e2) && (this.currentStage = e2, e2 >= 2 && this.runtimeStagePromise.resolve(), e2 >= 3 && this.dynamicStagePromise.resolve());
        }
        getStagePromise(e2) {
          switch (e2) {
            case 2:
              return this.runtimeStagePromise.promise;
            case 3:
              return this.dynamicStagePromise.promise;
            default:
              throw Object.defineProperty(new i.InvariantError(`Invalid render stage: ${e2}`), "__NEXT_ERROR_CODE", { value: "E881", enumerable: false, configurable: true });
          }
        }
        waitForStage(e2) {
          return this.getStagePromise(e2);
        }
        delayUntilStage(e2, r2, t2) {
          var n2, a2, o2;
          let i2, c2 = (n2 = this.getStagePromise(e2), a2 = r2, o2 = t2, i2 = new Promise((e3, r3) => {
            n2.then(e3.bind(null, o2), r3);
          }), void 0 !== a2 && (i2.displayName = a2), i2);
          return this.abortSignal && c2.catch(l), c2;
        }
      }
      function l() {
      }
    }, 432459, (e, r, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n, a, o = { Postpone: function() {
        return P;
      }, PreludeState: function() {
        return Q;
      }, abortAndThrowOnSynchronousRequestDataAccess: function() {
        return A;
      }, abortOnSynchronousPlatformIOAccess: function() {
        return T;
      }, accessedDynamicData: function() {
        return $;
      }, annotateDynamicAccess: function() {
        return L;
      }, consumeDynamicAccess: function() {
        return H;
      }, createDynamicTrackingState: function() {
        return E;
      }, createDynamicValidationState: function() {
        return b;
      }, createHangingInputAbortSignal: function() {
        return B;
      }, createRenderInBrowserAbortSignal: function() {
        return X;
      }, delayUntilRuntimeStage: function() {
        return ee;
      }, formatDynamicAPIAccesses: function() {
        return U;
      }, getFirstDynamicReason: function() {
        return v;
      }, isDynamicPostpone: function() {
        return N;
      }, isPrerenderInterruptedError: function() {
        return M;
      }, logDisallowedDynamicError: function() {
        return J;
      }, markCurrentScopeAsDynamic: function() {
        return R;
      }, postponeWithTracking: function() {
        return j;
      }, throwIfDisallowedDynamic: function() {
        return Z;
      }, throwToInterruptStaticGeneration: function() {
        return S;
      }, trackAllowedDynamicAccess: function() {
        return K;
      }, trackDynamicDataInDynamicRender: function() {
        return w;
      }, trackSynchronousPlatformIOAccessInDev: function() {
        return D;
      }, useDynamicRouteParams: function() {
        return W;
      }, useDynamicSearchParams: function() {
        return q;
      } };
      for (var i in o) Object.defineProperty(t, i, { enumerable: true, get: o[i] });
      let c = (n = e.r(40049)) && n.__esModule ? n : { default: n }, s = e.r(993476), u = e.r(796021), l = e.r(108048), d = e.r(70590), f = e.r(887014), p = e.r(323290), h = e.r(325701), y = e.r(717954), m = e.r(802014), g = e.r(847122), _ = "function" == typeof c.default.unstable_postpone;
      function E(e2) {
        return { isDebugDynamicAccesses: e2, dynamicAccesses: [], syncDynamicErrorWithStack: null };
      }
      function b() {
        return { hasSuspenseAboveBody: false, hasDynamicMetadata: false, hasDynamicViewport: false, hasAllowedDynamic: false, dynamicErrors: [] };
      }
      function v(e2) {
        var r2;
        return null == (r2 = e2.dynamicAccesses[0]) ? void 0 : r2.expression;
      }
      function R(e2, r2, t2) {
        if (r2) switch (r2.type) {
          case "cache":
          case "unstable-cache":
          case "private-cache":
            return;
        }
        if (!e2.forceDynamic && !e2.forceStatic) {
          if (e2.dynamicShouldError) throw Object.defineProperty(new u.StaticGenBailoutError(`Route ${e2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${t2}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E553", enumerable: false, configurable: true });
          if (r2) switch (r2.type) {
            case "prerender-ppr":
              return j(e2.route, t2, r2.dynamicTracking);
            case "prerender-legacy":
              r2.revalidate = 0;
              let n2 = Object.defineProperty(new s.DynamicServerError(`Route ${e2.route} couldn't be rendered statically because it used ${t2}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E550", enumerable: false, configurable: true });
              throw e2.dynamicUsageDescription = t2, e2.dynamicUsageStack = n2.stack, n2;
          }
        }
      }
      function S(e2, r2, t2) {
        let n2 = Object.defineProperty(new s.DynamicServerError(`Route ${r2.route} couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E558", enumerable: false, configurable: true });
        throw t2.revalidate = 0, r2.dynamicUsageDescription = e2, r2.dynamicUsageStack = n2.stack, n2;
      }
      function w(e2) {
        switch (e2.type) {
          case "cache":
          case "unstable-cache":
          case "private-cache":
            return;
        }
      }
      function O(e2, r2, t2) {
        let n2 = I(`Route ${e2} needs to bail out of prerendering at this point because it used ${r2}.`);
        t2.controller.abort(n2);
        let a2 = t2.dynamicTracking;
        a2 && a2.dynamicAccesses.push({ stack: a2.isDebugDynamicAccesses ? Error().stack : void 0, expression: r2 });
      }
      function T(e2, r2, t2, n2) {
        let a2 = n2.dynamicTracking;
        O(e2, r2, n2), a2 && null === a2.syncDynamicErrorWithStack && (a2.syncDynamicErrorWithStack = t2);
      }
      function D(e2) {
        e2.stagedRendering && e2.stagedRendering.advanceStage(g.RenderStage.Dynamic);
      }
      function A(e2, r2, t2, n2) {
        if (false === n2.controller.signal.aborted) {
          O(e2, r2, n2);
          let a2 = n2.dynamicTracking;
          a2 && null === a2.syncDynamicErrorWithStack && (a2.syncDynamicErrorWithStack = t2);
        }
        throw I(`Route ${e2} needs to bail out of prerendering at this point because it used ${r2}.`);
      }
      function P({ reason: e2, route: r2 }) {
        let t2 = l.workUnitAsyncStorage.getStore();
        j(r2, e2, t2 && "prerender-ppr" === t2.type ? t2.dynamicTracking : null);
      }
      function j(e2, r2, t2) {
        (function() {
          if (!_) throw Object.defineProperty(Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E224", enumerable: false, configurable: true });
        })(), t2 && t2.dynamicAccesses.push({ stack: t2.isDebugDynamicAccesses ? Error().stack : void 0, expression: r2 }), c.default.unstable_postpone(k(e2, r2));
      }
      function k(e2, r2) {
        return `Route ${e2} needs to bail out of prerendering at this point because it used ${r2}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
      }
      function N(e2) {
        return "object" == typeof e2 && null !== e2 && "string" == typeof e2.message && x(e2.message);
      }
      function x(e2) {
        return e2.includes("needs to bail out of prerendering at this point because it used") && e2.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
      }
      if (false === x(k("%%%", "^^^"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      let C = "NEXT_PRERENDER_INTERRUPTED";
      function I(e2) {
        let r2 = Object.defineProperty(Error(e2), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        return r2.digest = C, r2;
      }
      function M(e2) {
        return "object" == typeof e2 && null !== e2 && e2.digest === C && "name" in e2 && "message" in e2 && e2 instanceof Error;
      }
      function $(e2) {
        return e2.length > 0;
      }
      function H(e2, r2) {
        return e2.dynamicAccesses.push(...r2.dynamicAccesses), e2.dynamicAccesses;
      }
      function U(e2) {
        return e2.filter((e3) => "string" == typeof e3.stack && e3.stack.length > 0).map(({ expression: e3, stack: r2 }) => (r2 = r2.split("\n").slice(4).filter((e4) => !(e4.includes("node_modules/next/") || e4.includes(" (<anonymous>)") || e4.includes(" (node:"))).join("\n"), `Dynamic API Usage Debug - ${e3}:
${r2}`));
      }
      function X() {
        let e2 = new AbortController();
        return e2.abort(Object.defineProperty(new y.BailoutToCSRError("Render in Browser"), "__NEXT_ERROR_CODE", { value: "E721", enumerable: false, configurable: true })), e2.signal;
      }
      function B(e2) {
        switch (e2.type) {
          case "prerender":
          case "prerender-runtime":
            let r2 = new AbortController();
            if (e2.cacheSignal) e2.cacheSignal.inputReady().then(() => {
              r2.abort();
            });
            else {
              let t2 = (0, l.getRuntimeStagePromise)(e2);
              t2 ? t2.then(() => (0, h.scheduleOnNextTick)(() => r2.abort())) : (0, h.scheduleOnNextTick)(() => r2.abort());
            }
            return r2.signal;
          case "prerender-client":
          case "prerender-ppr":
          case "prerender-legacy":
          case "request":
          case "cache":
          case "private-cache":
          case "unstable-cache":
            return;
        }
      }
      function L(e2, r2) {
        let t2 = r2.dynamicTracking;
        t2 && t2.dynamicAccesses.push({ stack: t2.isDebugDynamicAccesses ? Error().stack : void 0, expression: e2 });
      }
      function W(e2) {
        let r2 = d.workAsyncStorage.getStore(), t2 = l.workUnitAsyncStorage.getStore();
        if (r2 && t2) switch (t2.type) {
          case "prerender-client":
          case "prerender": {
            let n2 = t2.fallbackRouteParams;
            n2 && n2.size > 0 && c.default.use((0, f.makeHangingPromise)(t2.renderSignal, r2.route, e2));
            break;
          }
          case "prerender-ppr": {
            let n2 = t2.fallbackRouteParams;
            if (n2 && n2.size > 0) return j(r2.route, e2, t2.dynamicTracking);
            break;
          }
          case "prerender-runtime":
            throw Object.defineProperty(new m.InvariantError(`\`${e2}\` was called during a runtime prerender. Next.js should be preventing ${e2} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E771", enumerable: false, configurable: true });
          case "cache":
          case "private-cache":
            throw Object.defineProperty(new m.InvariantError(`\`${e2}\` was called inside a cache scope. Next.js should be preventing ${e2} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E745", enumerable: false, configurable: true });
        }
      }
      function q(e2) {
        let r2 = d.workAsyncStorage.getStore(), t2 = l.workUnitAsyncStorage.getStore();
        if (r2) switch (!t2 && (0, l.throwForMissingRequestStore)(e2), t2.type) {
          case "prerender-client":
            c.default.use((0, f.makeHangingPromise)(t2.renderSignal, r2.route, e2));
            break;
          case "prerender-legacy":
          case "prerender-ppr":
            if (r2.forceStatic) return;
            throw Object.defineProperty(new y.BailoutToCSRError(e2), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          case "prerender":
          case "prerender-runtime":
            throw Object.defineProperty(new m.InvariantError(`\`${e2}\` was called from a Server Component. Next.js should be preventing ${e2} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E795", enumerable: false, configurable: true });
          case "cache":
          case "unstable-cache":
          case "private-cache":
            throw Object.defineProperty(new m.InvariantError(`\`${e2}\` was called inside a cache scope. Next.js should be preventing ${e2} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E745", enumerable: false, configurable: true });
          case "request":
            return;
        }
      }
      let F = /\n\s+at Suspense \(<anonymous>\)/, G = RegExp(`\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at ${p.ROOT_LAYOUT_BOUNDARY_NAME} \\([^\\n]*\\)`), Y = RegExp(`\\n\\s+at ${p.METADATA_BOUNDARY_NAME}[\\n\\s]`), V = RegExp(`\\n\\s+at ${p.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`), z = RegExp(`\\n\\s+at ${p.OUTLET_BOUNDARY_NAME}[\\n\\s]`);
      function K(e2, r2, t2, n2) {
        if (!z.test(r2)) {
          if (Y.test(r2)) {
            t2.hasDynamicMetadata = true;
            return;
          }
          if (V.test(r2)) {
            t2.hasDynamicViewport = true;
            return;
          }
          if (G.test(r2)) {
            t2.hasAllowedDynamic = true, t2.hasSuspenseAboveBody = true;
            return;
          } else if (F.test(r2)) {
            t2.hasAllowedDynamic = true;
            return;
          } else {
            var a2, o2;
            let i2;
            if (n2.syncDynamicErrorWithStack) return void t2.dynamicErrors.push(n2.syncDynamicErrorWithStack);
            let c2 = (a2 = `Route "${e2.route}": Uncached data was accessed outside of <Suspense>. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/blocking-route`, o2 = r2, (i2 = Object.defineProperty(Error(a2), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true })).stack = i2.name + ": " + a2 + o2, i2);
            return void t2.dynamicErrors.push(c2);
          }
        }
      }
      var Q = ((a = {})[a.Full = 0] = "Full", a[a.Empty = 1] = "Empty", a[a.Errored = 2] = "Errored", a);
      function J(e2, r2) {
        console.error(r2), e2.dev || (e2.hasReadableErrorStacks ? console.error(`To get a more detailed stack trace and pinpoint the issue, start the app in development mode by running \`next dev\`, then open "${e2.route}" in your browser to investigate the error.`) : console.error(`To get a more detailed stack trace and pinpoint the issue, try one of the following:
  - Start the app in development mode by running \`next dev\`, then open "${e2.route}" in your browser to investigate the error.
  - Rerun the production build with \`next build --debug-prerender\` to generate better stack traces.`));
      }
      function Z(e2, r2, t2, n2) {
        if (n2.syncDynamicErrorWithStack) throw J(e2, n2.syncDynamicErrorWithStack), new u.StaticGenBailoutError();
        if (0 !== r2) {
          if (t2.hasSuspenseAboveBody) return;
          let n3 = t2.dynamicErrors;
          if (n3.length > 0) {
            for (let r3 = 0; r3 < n3.length; r3++) J(e2, n3[r3]);
            throw new u.StaticGenBailoutError();
          }
          if (t2.hasDynamicViewport) throw console.error(`Route "${e2.route}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) without explicitly allowing fully dynamic rendering. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`), new u.StaticGenBailoutError();
          if (1 === r2) throw console.error(`Route "${e2.route}" did not produce a static shell and Next.js was unable to determine a reason. This is a bug in Next.js.`), new u.StaticGenBailoutError();
        } else if (false === t2.hasAllowedDynamic && t2.hasDynamicMetadata) throw console.error(`Route "${e2.route}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) when the rest of the route does not. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`), new u.StaticGenBailoutError();
      }
      function ee(e2, r2) {
        return e2.runtimeStagePromise ? e2.runtimeStagePromise.then(() => r2) : r2;
      }
    }]);
  }
});

// .next/server/edge/chunks/node_modules_91242dc2._.js
var require_node_modules_91242dc2 = __commonJS({
  ".next/server/edge/chunks/node_modules_91242dc2._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/node_modules_91242dc2._.js", 776993, (e, t, r) => {
      "use strict";
      function n(e2) {
        if ("function" != typeof WeakMap) return null;
        var t2 = /* @__PURE__ */ new WeakMap(), r2 = /* @__PURE__ */ new WeakMap();
        return (n = function(e3) {
          return e3 ? r2 : t2;
        })(e2);
      }
      r._ = function(e2, t2) {
        if (!t2 && e2 && e2.__esModule) return e2;
        if (null === e2 || "object" != typeof e2 && "function" != typeof e2) return { default: e2 };
        var r2 = n(t2);
        if (r2 && r2.has(e2)) return r2.get(e2);
        var o = { __proto__: null }, i = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var a in e2) if ("default" !== a && Object.prototype.hasOwnProperty.call(e2, a)) {
          var u = i ? Object.getOwnPropertyDescriptor(e2, a) : null;
          u && (u.get || u.set) ? Object.defineProperty(o, a, u) : o[a] = e2[a];
        }
        return o.default = e2, r2 && r2.set(e2, o), o;
      };
    }, 99212, (e, t, r) => {
      "use strict";
      var n = e.r(40049);
      function o() {
      }
      var i = { d: { f: o, r: function() {
        throw Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.");
      }, D: o, C: o, L: o, m: o, X: o, S: o, M: o }, p: 0, findDOMNode: null };
      if (!n.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE) throw Error('The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.');
      function a(e2, t2) {
        return "font" === e2 ? "" : "string" == typeof t2 ? "use-credentials" === t2 ? t2 : "" : void 0;
      }
      r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, r.preconnect = function(e2, t2) {
        "string" == typeof e2 && (t2 = t2 ? "string" == typeof (t2 = t2.crossOrigin) ? "use-credentials" === t2 ? t2 : "" : void 0 : null, i.d.C(e2, t2));
      }, r.prefetchDNS = function(e2) {
        "string" == typeof e2 && i.d.D(e2);
      }, r.preinit = function(e2, t2) {
        if ("string" == typeof e2 && t2 && "string" == typeof t2.as) {
          var r2 = t2.as, n2 = a(r2, t2.crossOrigin), o2 = "string" == typeof t2.integrity ? t2.integrity : void 0, u = "string" == typeof t2.fetchPriority ? t2.fetchPriority : void 0;
          "style" === r2 ? i.d.S(e2, "string" == typeof t2.precedence ? t2.precedence : void 0, { crossOrigin: n2, integrity: o2, fetchPriority: u }) : "script" === r2 && i.d.X(e2, { crossOrigin: n2, integrity: o2, fetchPriority: u, nonce: "string" == typeof t2.nonce ? t2.nonce : void 0 });
        }
      }, r.preinitModule = function(e2, t2) {
        if ("string" == typeof e2) if ("object" == typeof t2 && null !== t2) {
          if (null == t2.as || "script" === t2.as) {
            var r2 = a(t2.as, t2.crossOrigin);
            i.d.M(e2, { crossOrigin: r2, integrity: "string" == typeof t2.integrity ? t2.integrity : void 0, nonce: "string" == typeof t2.nonce ? t2.nonce : void 0 });
          }
        } else null == t2 && i.d.M(e2);
      }, r.preload = function(e2, t2) {
        if ("string" == typeof e2 && "object" == typeof t2 && null !== t2 && "string" == typeof t2.as) {
          var r2 = t2.as, n2 = a(r2, t2.crossOrigin);
          i.d.L(e2, r2, { crossOrigin: n2, integrity: "string" == typeof t2.integrity ? t2.integrity : void 0, nonce: "string" == typeof t2.nonce ? t2.nonce : void 0, type: "string" == typeof t2.type ? t2.type : void 0, fetchPriority: "string" == typeof t2.fetchPriority ? t2.fetchPriority : void 0, referrerPolicy: "string" == typeof t2.referrerPolicy ? t2.referrerPolicy : void 0, imageSrcSet: "string" == typeof t2.imageSrcSet ? t2.imageSrcSet : void 0, imageSizes: "string" == typeof t2.imageSizes ? t2.imageSizes : void 0, media: "string" == typeof t2.media ? t2.media : void 0 });
        }
      }, r.preloadModule = function(e2, t2) {
        if ("string" == typeof e2) if (t2) {
          var r2 = a(t2.as, t2.crossOrigin);
          i.d.m(e2, { as: "string" == typeof t2.as && "script" !== t2.as ? t2.as : void 0, crossOrigin: r2, integrity: "string" == typeof t2.integrity ? t2.integrity : void 0 });
        } else i.d.m(e2);
      }, r.version = "19.3.0-canary-52684925-20251110";
    }, 579412, (e, t, r) => {
      "use strict";
      t.exports = e.r(99212);
    }, 709822, (e, t, r) => {
      "use strict";
      var n = e.r(579412), o = e.r(40049), i = Symbol.for("react.element"), a = Symbol.for("react.transitional.element"), u = Symbol.for("react.fragment"), s = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), y = Symbol.for("react.memo_cache_sentinel"), h = Symbol.for("react.view_transition"), v = Symbol.iterator;
      function g(e10) {
        return null === e10 || "object" != typeof e10 ? null : "function" == typeof (e10 = v && e10[v] || e10["@@iterator"]) ? e10 : null;
      }
      var m = Symbol.asyncIterator;
      function b(e10) {
        setTimeout(function() {
          throw e10;
        });
      }
      var _ = Promise, S = "function" == typeof queueMicrotask ? queueMicrotask : function(e10) {
        _.resolve(null).then(e10).catch(b);
      }, C = null, R = 0;
      function E(e10, t2) {
        if (0 !== t2.byteLength) if (4096 < t2.byteLength) 0 < R && (e10.enqueue(new Uint8Array(C.buffer, 0, R)), C = new Uint8Array(4096), R = 0), e10.enqueue(t2);
        else {
          var r2 = C.length - R;
          r2 < t2.byteLength && (0 === r2 ? e10.enqueue(C) : (C.set(t2.subarray(0, r2), R), e10.enqueue(C), t2 = t2.subarray(r2)), C = new Uint8Array(4096), R = 0), C.set(t2, R), R += t2.byteLength;
        }
        return true;
      }
      var O = new TextEncoder();
      function P(e10) {
        return O.encode(e10);
      }
      function w(e10) {
        return e10.byteLength;
      }
      function $(e10, t2) {
        "function" == typeof e10.error ? e10.error(t2) : e10.close();
      }
      var j = Symbol.for("react.client.reference"), T = Symbol.for("react.server.reference");
      function k(e10, t2, r2) {
        return Object.defineProperties(e10, { $$typeof: { value: j }, $$id: { value: t2 }, $$async: { value: r2 } });
      }
      var A = Function.prototype.bind, x = Array.prototype.slice;
      function M() {
        var e10 = A.apply(this, arguments);
        if (this.$$typeof === T) {
          var t2 = x.call(arguments, 1);
          return Object.defineProperties(e10, { $$typeof: { value: T }, $$id: { value: this.$$id }, $$bound: t2 = { value: this.$$bound ? this.$$bound.concat(t2) : t2 }, bind: { value: M, configurable: true } });
        }
        return e10;
      }
      var I = Promise.prototype, D = { get: function(e10, t2) {
        switch (t2) {
          case "$$typeof":
            return e10.$$typeof;
          case "$$id":
            return e10.$$id;
          case "$$async":
            return e10.$$async;
          case "name":
            return e10.name;
          case "displayName":
          case "defaultProps":
          case "_debugInfo":
          case "toJSON":
            return;
          case Symbol.toPrimitive:
            return Object.prototype[Symbol.toPrimitive];
          case Symbol.toStringTag:
            return Object.prototype[Symbol.toStringTag];
          case "Provider":
            throw Error("Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider.");
          case "then":
            throw Error("Cannot await or return from a thenable. You cannot await a client module from a server component.");
        }
        throw Error("Cannot access " + String(e10.name) + "." + String(t2) + " on the server. You cannot dot into a client module from a server component. You can only pass the imported name through.");
      }, set: function() {
        throw Error("Cannot assign to a client module from a server module.");
      } };
      function L(e10, t2) {
        switch (t2) {
          case "$$typeof":
            return e10.$$typeof;
          case "$$id":
            return e10.$$id;
          case "$$async":
            return e10.$$async;
          case "name":
            return e10.name;
          case "defaultProps":
          case "_debugInfo":
          case "toJSON":
            return;
          case Symbol.toPrimitive:
            return Object.prototype[Symbol.toPrimitive];
          case Symbol.toStringTag:
            return Object.prototype[Symbol.toStringTag];
          case "__esModule":
            var r2 = e10.$$id;
            return e10.default = k(function() {
              throw Error("Attempted to call the default export of " + r2 + " from the server but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
            }, e10.$$id + "#", e10.$$async), true;
          case "then":
            if (e10.then) return e10.then;
            if (e10.$$async) return;
            var n2 = k({}, e10.$$id, true), o2 = new Proxy(n2, N);
            return e10.status = "fulfilled", e10.value = o2, e10.then = k(function(e11) {
              return Promise.resolve(e11(o2));
            }, e10.$$id + "#then", false);
        }
        if ("symbol" == typeof t2) throw Error("Cannot read Symbol exports. Only named exports are supported on a client module imported on the server.");
        return (n2 = e10[t2]) || (Object.defineProperty(n2 = k(function() {
          throw Error("Attempted to call " + String(t2) + "() from the server but " + String(t2) + " is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
        }, e10.$$id + "#" + t2, e10.$$async), "name", { value: t2 }), n2 = e10[t2] = new Proxy(n2, D)), n2;
      }
      var N = { get: function(e10, t2) {
        return L(e10, t2);
      }, getOwnPropertyDescriptor: function(e10, t2) {
        var r2 = Object.getOwnPropertyDescriptor(e10, t2);
        return r2 || (r2 = { value: L(e10, t2), writable: false, configurable: false, enumerable: false }, Object.defineProperty(e10, t2, r2)), r2;
      }, getPrototypeOf: function() {
        return I;
      }, set: function() {
        throw Error("Cannot assign to a client module from a server module.");
      } }, U = n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = U.d;
      function B(e10, t2, r2) {
        if ("string" == typeof e10) {
          var n2 = e_();
          if (n2) {
            var o2 = n2.hints, i2 = "L";
            if ("image" === t2 && r2) {
              var a2 = r2.imageSrcSet, u2 = r2.imageSizes, s2 = "";
              "string" == typeof a2 && "" !== a2 ? (s2 += "[" + a2 + "]", "string" == typeof u2 && (s2 += "[" + u2 + "]")) : s2 += "[][]" + e10, i2 += "[image]" + s2;
            } else i2 += "[" + t2 + "]" + e10;
            o2.has(i2) || (o2.add(i2), (r2 = z(r2)) ? eC(n2, "L", [e10, t2, r2]) : eC(n2, "L", [e10, t2]));
          } else F.L(e10, t2, r2);
        }
      }
      function H(e10, t2) {
        if ("string" == typeof e10) {
          var r2 = e_();
          if (r2) {
            var n2 = r2.hints, o2 = "m|" + e10;
            if (n2.has(o2)) return;
            return n2.add(o2), (t2 = z(t2)) ? eC(r2, "m", [e10, t2]) : eC(r2, "m", e10);
          }
          F.m(e10, t2);
        }
      }
      function z(e10) {
        if (null == e10) return null;
        var t2, r2 = false, n2 = {};
        for (t2 in e10) null != e10[t2] && (r2 = true, n2[t2] = e10[t2]);
        return r2 ? n2 : null;
      }
      U.d = { f: F.f, r: F.r, D: function(e10) {
        if ("string" == typeof e10 && e10) {
          var t2 = e_();
          if (t2) {
            var r2 = t2.hints, n2 = "D|" + e10;
            r2.has(n2) || (r2.add(n2), eC(t2, "D", e10));
          } else F.D(e10);
        }
      }, C: function(e10, t2) {
        if ("string" == typeof e10) {
          var r2 = e_();
          if (r2) {
            var n2 = r2.hints, o2 = "C|" + (null == t2 ? "null" : t2) + "|" + e10;
            n2.has(o2) || (n2.add(o2), "string" == typeof t2 ? eC(r2, "C", [e10, t2]) : eC(r2, "C", e10));
          } else F.C(e10, t2);
        }
      }, L: B, m: H, X: function(e10, t2) {
        if ("string" == typeof e10) {
          var r2 = e_();
          if (r2) {
            var n2 = r2.hints, o2 = "X|" + e10;
            if (n2.has(o2)) return;
            return n2.add(o2), (t2 = z(t2)) ? eC(r2, "X", [e10, t2]) : eC(r2, "X", e10);
          }
          F.X(e10, t2);
        }
      }, S: function(e10, t2, r2) {
        if ("string" == typeof e10) {
          var n2 = e_();
          if (n2) {
            var o2 = n2.hints, i2 = "S|" + e10;
            if (o2.has(i2)) return;
            return o2.add(i2), (r2 = z(r2)) ? eC(n2, "S", [e10, "string" == typeof t2 ? t2 : 0, r2]) : "string" == typeof t2 ? eC(n2, "S", [e10, t2]) : eC(n2, "S", e10);
          }
          F.S(e10, t2, r2);
        }
      }, M: function(e10, t2) {
        if ("string" == typeof e10) {
          var r2 = e_();
          if (r2) {
            var n2 = r2.hints, o2 = "M|" + e10;
            if (n2.has(o2)) return;
            return n2.add(o2), (t2 = z(t2)) ? eC(r2, "M", [e10, t2]) : eC(r2, "M", e10);
          }
          F.M(e10, t2);
        }
      } };
      var W = "function" == typeof AsyncLocalStorage, X = W ? new AsyncLocalStorage() : null, q = Symbol.for("react.temporary.reference"), V = { get: function(e10, t2) {
        switch (t2) {
          case "$$typeof":
            return e10.$$typeof;
          case "name":
          case "displayName":
          case "defaultProps":
          case "_debugInfo":
          case "toJSON":
            return;
          case Symbol.toPrimitive:
            return Object.prototype[Symbol.toPrimitive];
          case Symbol.toStringTag:
            return Object.prototype[Symbol.toStringTag];
          case "Provider":
            throw Error("Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider.");
          case "then":
            return;
        }
        throw Error("Cannot access " + String(t2) + " on the server. You cannot dot into a temporary client reference from a server component. You can only pass the value through to the client.");
      }, set: function() {
        throw Error("Cannot assign to a temporary client reference from a server module.");
      } };
      function Y() {
      }
      var J = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."), G = null;
      function K() {
        if (null === G) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
        var e10 = G;
        return G = null, e10;
      }
      var Z = null, Q = 0, ee = null;
      function et() {
        var e10 = ee || [];
        return ee = null, e10;
      }
      var er = { readContext: ei, use: function(e10) {
        if (null !== e10 && "object" == typeof e10 || "function" == typeof e10) {
          if ("function" == typeof e10.then) {
            var t2 = Q;
            Q += 1, null === ee && (ee = []);
            var r2 = ee, n2 = e10, o2 = t2;
            switch (void 0 === (o2 = r2[o2]) ? r2.push(n2) : o2 !== n2 && (n2.then(Y, Y), n2 = o2), n2.status) {
              case "fulfilled":
                return n2.value;
              case "rejected":
                throw n2.reason;
              default:
                switch ("string" == typeof n2.status ? n2.then(Y, Y) : ((r2 = n2).status = "pending", r2.then(function(e11) {
                  if ("pending" === n2.status) {
                    var t3 = n2;
                    t3.status = "fulfilled", t3.value = e11;
                  }
                }, function(e11) {
                  if ("pending" === n2.status) {
                    var t3 = n2;
                    t3.status = "rejected", t3.reason = e11;
                  }
                })), n2.status) {
                  case "fulfilled":
                    return n2.value;
                  case "rejected":
                    throw n2.reason;
                }
                throw G = n2, J;
            }
          }
          e10.$$typeof === s && ei();
        }
        if (e10.$$typeof === j) {
          if (null != e10.value && e10.value.$$typeof === s) throw Error("Cannot read a Client Context from a Server Component.");
          throw Error("Cannot use() an already resolved Client Reference.");
        }
        throw Error("An unsupported type was passed to use(): " + String(e10));
      }, useCallback: function(e10) {
        return e10;
      }, useContext: ei, useEffect: en, useImperativeHandle: en, useLayoutEffect: en, useInsertionEffect: en, useMemo: function(e10) {
        return e10();
      }, useReducer: en, useRef: en, useState: en, useDebugValue: function() {
      }, useDeferredValue: en, useTransition: en, useSyncExternalStore: en, useId: function() {
        if (null === Z) throw Error("useId can only be used while React is rendering");
        var e10 = Z.identifierCount++;
        return "_" + Z.identifierPrefix + "S_" + e10.toString(32) + "_";
      }, useHostTransitionStatus: en, useFormState: en, useActionState: en, useOptimistic: en, useMemoCache: function(e10) {
        for (var t2 = Array(e10), r2 = 0; r2 < e10; r2++) t2[r2] = y;
        return t2;
      }, useCacheRefresh: function() {
        return eo;
      } };
      function en() {
        throw Error("This Hook is not supported in Server Components.");
      }
      function eo() {
        throw Error("Refreshing the cache is not supported in Server Components.");
      }
      function ei() {
        throw Error("Cannot read a Client Context from a Server Component.");
      }
      er.useEffectEvent = en;
      var ea = { getCacheForType: function(e10) {
        var t2 = (t2 = e_()) ? t2.cache : /* @__PURE__ */ new Map(), r2 = t2.get(e10);
        return void 0 === r2 && (r2 = e10(), t2.set(e10, r2)), r2;
      }, cacheSignal: function() {
        var e10 = e_();
        return e10 ? e10.cacheController.signal : null;
      } }, eu = o.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      if (!eu) throw Error('The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.');
      var es = Array.isArray, el = Object.getPrototypeOf;
      function ec(e10) {
        return (e10 = Object.prototype.toString.call(e10)).slice(8, e10.length - 1);
      }
      function ef(e10) {
        switch (typeof e10) {
          case "string":
            return JSON.stringify(10 >= e10.length ? e10 : e10.slice(0, 10) + "...");
          case "object":
            if (es(e10)) return "[...]";
            if (null !== e10 && e10.$$typeof === ed) return "client";
            return "Object" === (e10 = ec(e10)) ? "{...}" : e10;
          case "function":
            return e10.$$typeof === ed ? "client" : (e10 = e10.displayName || e10.name) ? "function " + e10 : "function";
          default:
            return String(e10);
        }
      }
      var ed = Symbol.for("react.client.reference");
      function ep(e10, t2) {
        var r2 = ec(e10);
        if ("Object" !== r2 && "Array" !== r2) return r2;
        r2 = -1;
        var n2 = 0;
        if (es(e10)) {
          for (var o2 = "[", i2 = 0; i2 < e10.length; i2++) {
            0 < i2 && (o2 += ", ");
            var u2 = e10[i2];
            u2 = "object" == typeof u2 && null !== u2 ? ep(u2) : ef(u2), "" + i2 === t2 ? (r2 = o2.length, n2 = u2.length, o2 += u2) : o2 = 10 > u2.length && 40 > o2.length + u2.length ? o2 + u2 : o2 + "...";
          }
          o2 += "]";
        } else if (e10.$$typeof === a) o2 = "<" + function e11(t3) {
          if ("string" == typeof t3) return t3;
          switch (t3) {
            case c:
              return "Suspense";
            case f:
              return "SuspenseList";
            case h:
              return "ViewTransition";
          }
          if ("object" == typeof t3) switch (t3.$$typeof) {
            case l:
              return e11(t3.render);
            case d:
              return e11(t3.type);
            case p:
              var r3 = t3._payload;
              t3 = t3._init;
              try {
                return e11(t3(r3));
              } catch (e12) {
              }
          }
          return "";
        }(e10.type) + "/>";
        else {
          if (e10.$$typeof === ed) return "client";
          for (u2 = 0, o2 = "{", i2 = Object.keys(e10); u2 < i2.length; u2++) {
            0 < u2 && (o2 += ", ");
            var s2 = i2[u2], y2 = JSON.stringify(s2);
            o2 += ('"' + s2 + '"' === y2 ? s2 : y2) + ": ", y2 = "object" == typeof (y2 = e10[s2]) && null !== y2 ? ep(y2) : ef(y2), s2 === t2 ? (r2 = o2.length, n2 = y2.length, o2 += y2) : o2 = 10 > y2.length && 40 > o2.length + y2.length ? o2 + y2 : o2 + "...";
          }
          o2 += "}";
        }
        return void 0 === t2 ? o2 : -1 < r2 && 0 < n2 ? "\n  " + o2 + "\n  " + (e10 = " ".repeat(r2) + "^".repeat(n2)) : "\n  " + o2;
      }
      var ey = Object.prototype.hasOwnProperty, eh = Object.prototype, ev = JSON.stringify;
      function eg(e10) {
        console.error(e10);
      }
      function em(e10, t2, r2, n2, o2, i2, a2, u2) {
        if (null !== eu.A && eu.A !== ea) throw Error("Currently React only supports one RSC renderer at a time.");
        eu.A = ea;
        var s2 = /* @__PURE__ */ new Set(), l2 = [], c2 = /* @__PURE__ */ new Set();
        this.type = e10, this.status = 10, this.flushScheduled = false, this.destination = this.fatalError = null, this.bundlerConfig = r2, this.cache = /* @__PURE__ */ new Map(), this.cacheController = new AbortController(), this.pendingChunks = this.nextChunkId = 0, this.hints = c2, this.abortableTasks = s2, this.pingedTasks = l2, this.completedImportChunks = [], this.completedHintChunks = [], this.completedRegularChunks = [], this.completedErrorChunks = [], this.writtenSymbols = /* @__PURE__ */ new Map(), this.writtenClientReferences = /* @__PURE__ */ new Map(), this.writtenServerReferences = /* @__PURE__ */ new Map(), this.writtenObjects = /* @__PURE__ */ new WeakMap(), this.temporaryReferences = u2, this.identifierPrefix = a2 || "", this.identifierCount = 1, this.taintCleanupQueue = [], this.onError = void 0 === n2 ? eg : n2, this.onAllReady = o2, this.onFatalError = i2, l2.push(e10 = eT(this, t2, null, false, 0, s2));
      }
      var eb = null;
      function e_() {
        if (eb) return eb;
        if (W) {
          var e10 = X.getStore();
          if (e10) return e10;
        }
        return null;
      }
      function eS(e10, t2, r2) {
        var n2 = eT(e10, r2, t2.keyPath, t2.implicitSlot, t2.formatContext, e10.abortableTasks);
        switch (r2.status) {
          case "fulfilled":
            return n2.model = r2.value, ej(e10, n2), n2.id;
          case "rejected":
            return eq(e10, n2, r2.reason), n2.id;
          default:
            if (12 === e10.status) return e10.abortableTasks.delete(n2), 21 === e10.type ? (eQ(n2), e0(n2, e10)) : (t2 = e10.fatalError, eK(n2), eZ(n2, e10, t2)), n2.id;
            "string" != typeof r2.status && (r2.status = "pending", r2.then(function(e11) {
              "pending" === r2.status && (r2.status = "fulfilled", r2.value = e11);
            }, function(e11) {
              "pending" === r2.status && (r2.status = "rejected", r2.reason = e11);
            }));
        }
        return r2.then(function(t3) {
          n2.model = t3, ej(e10, n2);
        }, function(t3) {
          0 === n2.status && (eq(e10, n2, t3), e4(e10));
        }), n2.id;
      }
      function eC(e10, t2, r2) {
        t2 = P(":H" + t2 + (r2 = ev(r2)) + "\n"), e10.completedHintChunks.push(t2), e4(e10);
      }
      function eR(e10) {
        if ("fulfilled" === e10.status) return e10.value;
        if ("rejected" === e10.status) throw e10.reason;
        throw e10;
      }
      function eE() {
      }
      function eO(e10, t2, r2, n2, o2) {
        var i2 = t2.thenableState;
        if (t2.thenableState = null, Q = 0, ee = i2, o2 = n2(o2, void 0), 12 === e10.status) throw "object" == typeof o2 && null !== o2 && "function" == typeof o2.then && o2.$$typeof !== j && o2.then(eE, eE), null;
        return o2 = function(e11, t3, r3, n3) {
          if ("object" != typeof n3 || null === n3 || n3.$$typeof === j) return n3;
          if ("function" == typeof n3.then) {
            switch (n3.status) {
              case "fulfilled":
                return n3.value;
              case "rejected":
                break;
              default:
                "string" != typeof n3.status && (n3.status = "pending", n3.then(function(e12) {
                  "pending" === n3.status && (n3.status = "fulfilled", n3.value = e12);
                }, function(e12) {
                  "pending" === n3.status && (n3.status = "rejected", n3.reason = e12);
                }));
            }
            return { $$typeof: p, _payload: n3, _init: eR };
          }
          var o3 = g(n3);
          return o3 ? ((e11 = {})[Symbol.iterator] = function() {
            return o3.call(n3);
          }, e11) : "function" != typeof n3[m] || "function" == typeof ReadableStream && n3 instanceof ReadableStream ? n3 : ((e11 = {})[m] = function() {
            return n3[m]();
          }, e11);
        }(e10, 0, 0, o2), n2 = t2.keyPath, i2 = t2.implicitSlot, null !== r2 ? t2.keyPath = null === n2 ? r2 : n2 + "," + r2 : null === n2 && (t2.implicitSlot = true), e10 = eN(e10, t2, eV, "", o2), t2.keyPath = n2, t2.implicitSlot = i2, e10;
      }
      function eP(e10, t2, r2) {
        return null !== t2.keyPath ? (e10 = [a, u, t2.keyPath, { children: r2 }], t2.implicitSlot ? [e10] : e10) : r2;
      }
      var ew = 0;
      function e$(e10, t2) {
        return t2 = eT(e10, t2.model, t2.keyPath, t2.implicitSlot, t2.formatContext, e10.abortableTasks), ej(e10, t2), eA(t2.id);
      }
      function ej(e10, t2) {
        var r2 = e10.pingedTasks;
        r2.push(t2), 1 === r2.length && (e10.flushScheduled = null !== e10.destination, 21 === e10.type || 10 === e10.status ? S(function() {
          return eG(e10);
        }) : setTimeout(function() {
          return eG(e10);
        }, 0));
      }
      function eT(e10, t2, r2, n2, o2, i2) {
        e10.pendingChunks++;
        var u2 = e10.nextChunkId++;
        "object" != typeof t2 || null === t2 || null !== r2 || n2 || e10.writtenObjects.set(t2, ek(u2));
        var s2 = { id: u2, status: 0, model: t2, keyPath: r2, implicitSlot: n2, formatContext: o2, ping: function() {
          return ej(e10, s2);
        }, toJSON: function(t3, r3) {
          ew += t3.length;
          var n3 = s2.keyPath, o3 = s2.implicitSlot;
          try {
            var i3 = eN(e10, s2, this, t3, r3);
          } catch (l2) {
            if (t3 = "object" == typeof (t3 = s2.model) && null !== t3 && (t3.$$typeof === a || t3.$$typeof === p), 12 === e10.status) s2.status = 3, 21 === e10.type ? (n3 = e10.nextChunkId++, i3 = n3 = t3 ? eA(n3) : ek(n3)) : (n3 = e10.fatalError, i3 = t3 ? eA(n3) : ek(n3));
            else if ("object" == typeof (r3 = l2 === J ? K() : l2) && null !== r3 && "function" == typeof r3.then) {
              var u3 = (i3 = eT(e10, s2.model, s2.keyPath, s2.implicitSlot, s2.formatContext, e10.abortableTasks)).ping;
              r3.then(u3, u3), i3.thenableState = et(), s2.keyPath = n3, s2.implicitSlot = o3, i3 = t3 ? eA(i3.id) : ek(i3.id);
            } else s2.keyPath = n3, s2.implicitSlot = o3, e10.pendingChunks++, n3 = e10.nextChunkId++, o3 = eU(e10, r3, s2), eB(e10, n3, o3), i3 = t3 ? eA(n3) : ek(n3);
          }
          return i3;
        }, thenableState: null };
        return i2.add(s2), s2;
      }
      function ek(e10) {
        return "$" + e10.toString(16);
      }
      function eA(e10) {
        return "$L" + e10.toString(16);
      }
      function ex(e10, t2, r2) {
        return e10 = ev(r2), P(t2 = t2.toString(16) + ":" + e10 + "\n");
      }
      function eM(e10, t2, r2, n2) {
        var o2 = n2.$$async ? n2.$$id + "#async" : n2.$$id, i2 = e10.writtenClientReferences, u2 = i2.get(o2);
        if (void 0 !== u2) return t2[0] === a && "1" === r2 ? eA(u2) : ek(u2);
        try {
          var s2 = e10.bundlerConfig, l2 = n2.$$id;
          u2 = "";
          var c2 = s2[l2];
          if (c2) u2 = c2.name;
          else {
            var f2 = l2.lastIndexOf("#");
            if (-1 !== f2 && (u2 = l2.slice(f2 + 1), c2 = s2[l2.slice(0, f2)]), !c2) throw Error('Could not find the module "' + l2 + '" in the React Client Manifest. This is probably a bug in the React Server Components bundler.');
          }
          if (true === c2.async && true === n2.$$async) throw Error('The module "' + l2 + '" is marked as an async ESM module but was loaded as a CJS proxy. This is probably a bug in the React Server Components bundler.');
          var d2 = true === c2.async || true === n2.$$async ? [c2.id, c2.chunks, u2, 1] : [c2.id, c2.chunks, u2];
          e10.pendingChunks++;
          var p2 = e10.nextChunkId++, y2 = ev(d2), h2 = p2.toString(16) + ":I" + y2 + "\n", v2 = P(h2);
          return e10.completedImportChunks.push(v2), i2.set(o2, p2), t2[0] === a && "1" === r2 ? eA(p2) : ek(p2);
        } catch (n3) {
          return e10.pendingChunks++, t2 = e10.nextChunkId++, r2 = eU(e10, n3, null), eB(e10, t2, r2), ek(t2);
        }
      }
      function eI(e10, t2, r2) {
        return t2 = eT(e10, t2, null, false, r2, e10.abortableTasks), eY(e10, t2), t2.id;
      }
      function eD(e10, t2, r2) {
        e10.pendingChunks++;
        var n2 = e10.nextChunkId++;
        return ez(e10, n2, t2, r2, false), ek(n2);
      }
      var eL = false;
      function eN(e10, t2, r2, n2, o2) {
        if (t2.model = o2, o2 === a) return "$";
        if (null === o2) return null;
        if ("object" == typeof o2) {
          switch (o2.$$typeof) {
            case a:
              var s2 = null, c2 = e10.writtenObjects;
              if (null === t2.keyPath && !t2.implicitSlot) {
                var f2 = c2.get(o2);
                if (void 0 !== f2) if (eL !== o2) return f2;
                else eL = null;
                else -1 === n2.indexOf(":") && void 0 !== (r2 = c2.get(r2)) && (s2 = r2 + ":" + n2, c2.set(o2, s2));
              }
              if (3200 < ew) return e$(e10, t2);
              return r2 = (n2 = o2.props).ref, "object" == typeof (e10 = function e11(t3, r3, n3, o3, i2, s3) {
                if (null != i2) throw Error("Refs cannot be used in Server Components, nor passed to Client Components.");
                if ("function" == typeof n3 && n3.$$typeof !== j && n3.$$typeof !== q) return eO(t3, r3, o3, n3, s3);
                if (n3 === u && null === o3) return n3 = r3.implicitSlot, null === r3.keyPath && (r3.implicitSlot = true), s3 = eN(t3, r3, eV, "", s3.children), r3.implicitSlot = n3, s3;
                if (null != n3 && "object" == typeof n3 && n3.$$typeof !== j) switch (n3.$$typeof) {
                  case p:
                    var c3 = n3._init;
                    if (n3 = c3(n3._payload), 12 === t3.status) throw null;
                    return e11(t3, r3, n3, o3, i2, s3);
                  case l:
                    return eO(t3, r3, o3, n3.render, s3);
                  case d:
                    return e11(t3, r3, n3.type, o3, i2, s3);
                }
                else "string" == typeof n3 && (c3 = function(e12, t4, r4) {
                  switch (t4) {
                    case "img":
                      t4 = r4.src;
                      var n4 = r4.srcSet;
                      if (!("lazy" === r4.loading || !t4 && !n4 || "string" != typeof t4 && null != t4 || "string" != typeof n4 && null != n4 || "low" === r4.fetchPriority || 3 & e12) && ("string" != typeof t4 || ":" !== t4[4] || "d" !== t4[0] && "D" !== t4[0] || "a" !== t4[1] && "A" !== t4[1] || "t" !== t4[2] && "T" !== t4[2] || "a" !== t4[3] && "A" !== t4[3]) && ("string" != typeof n4 || ":" !== n4[4] || "d" !== n4[0] && "D" !== n4[0] || "a" !== n4[1] && "A" !== n4[1] || "t" !== n4[2] && "T" !== n4[2] || "a" !== n4[3] && "A" !== n4[3])) {
                        var o4 = "string" == typeof r4.sizes ? r4.sizes : void 0, i3 = r4.crossOrigin;
                        B(t4 || "", "image", { imageSrcSet: n4, imageSizes: o4, crossOrigin: "string" == typeof i3 ? "use-credentials" === i3 ? i3 : "" : void 0, integrity: r4.integrity, type: r4.type, fetchPriority: r4.fetchPriority, referrerPolicy: r4.referrerPolicy });
                      }
                      return e12;
                    case "link":
                      if (t4 = r4.rel, n4 = r4.href, !(1 & e12 || null != r4.itemProp || "string" != typeof t4 || "string" != typeof n4 || "" === n4)) switch (t4) {
                        case "preload":
                          B(n4, r4.as, { crossOrigin: r4.crossOrigin, integrity: r4.integrity, nonce: r4.nonce, type: r4.type, fetchPriority: r4.fetchPriority, referrerPolicy: r4.referrerPolicy, imageSrcSet: r4.imageSrcSet, imageSizes: r4.imageSizes, media: r4.media });
                          break;
                        case "modulepreload":
                          H(n4, { as: r4.as, crossOrigin: r4.crossOrigin, integrity: r4.integrity, nonce: r4.nonce });
                          break;
                        case "stylesheet":
                          B(n4, "style", { crossOrigin: r4.crossOrigin, integrity: r4.integrity, nonce: r4.nonce, type: r4.type, fetchPriority: r4.fetchPriority, referrerPolicy: r4.referrerPolicy, media: r4.media });
                      }
                      return e12;
                    case "picture":
                      return 2 | e12;
                    case "noscript":
                      return 1 | e12;
                    default:
                      return e12;
                  }
                }(i2 = r3.formatContext, n3, s3), i2 !== c3 && null != s3.children && eI(t3, s3.children, c3));
                return t3 = o3, o3 = r3.keyPath, null === t3 ? t3 = o3 : null !== o3 && (t3 = o3 + "," + t3), s3 = [a, n3, t3, s3], r3 = r3.implicitSlot && null !== t3 ? [s3] : s3;
              }(e10, t2, o2.type, o2.key, void 0 !== r2 ? r2 : null, n2)) && null !== e10 && null !== s2 && (c2.has(e10) || c2.set(e10, s2)), e10;
            case p:
              if (3200 < ew) return e$(e10, t2);
              if (t2.thenableState = null, o2 = (n2 = o2._init)(o2._payload), 12 === e10.status) throw null;
              return eN(e10, t2, eV, "", o2);
            case i:
              throw Error('A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the "react" package is used.\n- A library pre-bundled an old copy of "react" or "react/jsx-runtime".\n- A compiler tries to "inline" JSX instead of using the runtime.');
          }
          if (o2.$$typeof === j) return eM(e10, r2, n2, o2);
          if (void 0 !== e10.temporaryReferences && void 0 !== (s2 = e10.temporaryReferences.get(o2))) return "$T" + s2;
          if (c2 = (s2 = e10.writtenObjects).get(o2), "function" == typeof o2.then) {
            if (void 0 !== c2) {
              if (null !== t2.keyPath || t2.implicitSlot) return "$@" + eS(e10, t2, o2).toString(16);
              if (eL !== o2) return c2;
              eL = null;
            }
            return e10 = "$@" + eS(e10, t2, o2).toString(16), s2.set(o2, e10), e10;
          }
          if (void 0 !== c2) if (eL !== o2) return c2;
          else {
            if (c2 !== ek(t2.id)) return c2;
            eL = null;
          }
          else if (-1 === n2.indexOf(":") && void 0 !== (c2 = s2.get(r2))) {
            if (f2 = n2, es(r2) && r2[0] === a) switch (n2) {
              case "1":
                f2 = "type";
                break;
              case "2":
                f2 = "key";
                break;
              case "3":
                f2 = "props";
                break;
              case "4":
                f2 = "_owner";
            }
            s2.set(o2, c2 + ":" + f2);
          }
          if (es(o2)) return eP(e10, t2, o2);
          if (o2 instanceof Map) return "$Q" + eI(e10, o2 = Array.from(o2), 0).toString(16);
          if (o2 instanceof Set) return "$W" + eI(e10, o2 = Array.from(o2), 0).toString(16);
          if ("function" == typeof FormData && o2 instanceof FormData) return "$K" + eI(e10, o2 = Array.from(o2.entries()), 0).toString(16);
          if (o2 instanceof Error) return "$Z";
          if (o2 instanceof ArrayBuffer) return eD(e10, "A", new Uint8Array(o2));
          if (o2 instanceof Int8Array) return eD(e10, "O", o2);
          if (o2 instanceof Uint8Array) return eD(e10, "o", o2);
          if (o2 instanceof Uint8ClampedArray) return eD(e10, "U", o2);
          if (o2 instanceof Int16Array) return eD(e10, "S", o2);
          if (o2 instanceof Uint16Array) return eD(e10, "s", o2);
          if (o2 instanceof Int32Array) return eD(e10, "L", o2);
          if (o2 instanceof Uint32Array) return eD(e10, "l", o2);
          if (o2 instanceof Float32Array) return eD(e10, "G", o2);
          if (o2 instanceof Float64Array) return eD(e10, "g", o2);
          if (o2 instanceof BigInt64Array) return eD(e10, "M", o2);
          if (o2 instanceof BigUint64Array) return eD(e10, "m", o2);
          if (o2 instanceof DataView) return eD(e10, "V", o2);
          if ("function" == typeof Blob && o2 instanceof Blob) return function(e11, t3) {
            function r3(t4) {
              0 === i2.status && (e11.cacheController.signal.removeEventListener("abort", n3), eq(e11, i2, t4), e4(e11), a2.cancel(t4).then(r3, r3));
            }
            function n3() {
              if (0 === i2.status) {
                var t4 = e11.cacheController.signal;
                t4.removeEventListener("abort", n3), t4 = t4.reason, 21 === e11.type ? (e11.abortableTasks.delete(i2), eQ(i2), e0(i2, e11)) : (eq(e11, i2, t4), e4(e11)), a2.cancel(t4).then(r3, r3);
              }
            }
            var o3 = [t3.type], i2 = eT(e11, o3, null, false, 0, e11.abortableTasks), a2 = t3.stream().getReader();
            return e11.cacheController.signal.addEventListener("abort", n3), a2.read().then(function t4(u2) {
              if (0 === i2.status) if (!u2.done) return o3.push(u2.value), a2.read().then(t4).catch(r3);
              else e11.cacheController.signal.removeEventListener("abort", n3), ej(e11, i2);
            }).catch(r3), "$B" + i2.id.toString(16);
          }(e10, o2);
          if (s2 = g(o2)) return (n2 = s2.call(o2)) === o2 ? "$i" + eI(e10, o2 = Array.from(n2), 0).toString(16) : eP(e10, t2, Array.from(n2));
          if ("function" == typeof ReadableStream && o2 instanceof ReadableStream) return function(e11, t3, r3) {
            function n3(t4) {
              0 === u2.status && (e11.cacheController.signal.removeEventListener("abort", o3), eq(e11, u2, t4), e4(e11), a2.cancel(t4).then(n3, n3));
            }
            function o3() {
              if (0 === u2.status) {
                var t4 = e11.cacheController.signal;
                t4.removeEventListener("abort", o3), t4 = t4.reason, 21 === e11.type ? (e11.abortableTasks.delete(u2), eQ(u2), e0(u2, e11)) : (eq(e11, u2, t4), e4(e11)), a2.cancel(t4).then(n3, n3);
              }
            }
            var i2 = r3.supportsBYOB;
            if (void 0 === i2) try {
              r3.getReader({ mode: "byob" }).releaseLock(), i2 = true;
            } catch (e12) {
              i2 = false;
            }
            var a2 = r3.getReader(), u2 = eT(e11, t3.model, t3.keyPath, t3.implicitSlot, t3.formatContext, e11.abortableTasks);
            return e11.pendingChunks++, t3 = u2.id.toString(16) + ":" + (i2 ? "r" : "R") + "\n", e11.completedRegularChunks.push(P(t3)), e11.cacheController.signal.addEventListener("abort", o3), a2.read().then(function t4(r4) {
              if (0 === u2.status) if (r4.done) u2.status = 1, r4 = u2.id.toString(16) + ":C\n", e11.completedRegularChunks.push(P(r4)), e11.abortableTasks.delete(u2), e11.cacheController.signal.removeEventListener("abort", o3), e4(e11), e6(e11);
              else try {
                u2.model = r4.value, e11.pendingChunks++, eJ(e11, u2), e4(e11), a2.read().then(t4, n3);
              } catch (e12) {
                n3(e12);
              }
            }, n3), ek(u2.id);
          }(e10, t2, o2);
          if ("function" == typeof (s2 = o2[m])) return null !== t2.keyPath ? (e10 = [a, u, t2.keyPath, { children: o2 }], e10 = t2.implicitSlot ? [e10] : e10) : (n2 = s2.call(o2), e10 = function(e11, t3, r3, n3) {
            function o3(t4) {
              0 === a2.status && (e11.cacheController.signal.removeEventListener("abort", i2), eq(e11, a2, t4), e4(e11), "function" == typeof n3.throw && n3.throw(t4).then(o3, o3));
            }
            function i2() {
              if (0 === a2.status) {
                var t4 = e11.cacheController.signal;
                t4.removeEventListener("abort", i2);
                var r4 = t4.reason;
                21 === e11.type ? (e11.abortableTasks.delete(a2), eQ(a2), e0(a2, e11)) : (eq(e11, a2, t4.reason), e4(e11)), "function" == typeof n3.throw && n3.throw(r4).then(o3, o3);
              }
            }
            r3 = r3 === n3;
            var a2 = eT(e11, t3.model, t3.keyPath, t3.implicitSlot, t3.formatContext, e11.abortableTasks);
            return e11.pendingChunks++, t3 = a2.id.toString(16) + ":" + (r3 ? "x" : "X") + "\n", e11.completedRegularChunks.push(P(t3)), e11.cacheController.signal.addEventListener("abort", i2), n3.next().then(function t4(r4) {
              if (0 === a2.status) if (r4.done) {
                if (a2.status = 1, void 0 === r4.value) var u2 = a2.id.toString(16) + ":C\n";
                else try {
                  var s3 = eI(e11, r4.value, 0);
                  u2 = a2.id.toString(16) + ":C" + ev(ek(s3)) + "\n";
                } catch (e12) {
                  o3(e12);
                  return;
                }
                e11.completedRegularChunks.push(P(u2)), e11.abortableTasks.delete(a2), e11.cacheController.signal.removeEventListener("abort", i2), e4(e11), e6(e11);
              } else try {
                a2.model = r4.value, e11.pendingChunks++, eJ(e11, a2), e4(e11), n3.next().then(t4, o3);
              } catch (e12) {
                o3(e12);
              }
            }, o3), ek(a2.id);
          }(e10, t2, o2, n2)), e10;
          if (o2 instanceof Date) return "$D" + o2.toJSON();
          if ((e10 = el(o2)) !== eh && (null === e10 || null !== el(e10))) throw Error("Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported." + ep(r2, n2));
          return o2;
        }
        if ("string" == typeof o2) return (ew += o2.length, "Z" === o2[o2.length - 1] && r2[n2] instanceof Date) ? "$D" + o2 : 1024 <= o2.length && null !== w ? (e10.pendingChunks++, t2 = e10.nextChunkId++, eW(e10, t2, o2, false), ek(t2)) : e10 = "$" === o2[0] ? "$" + o2 : o2;
        if ("boolean" == typeof o2) return o2;
        if ("number" == typeof o2) return Number.isFinite(o2) ? 0 === o2 && -1 / 0 == 1 / o2 ? "$-0" : o2 : 1 / 0 === o2 ? "$Infinity" : -1 / 0 === o2 ? "$-Infinity" : "$NaN";
        if (void 0 === o2) return "$undefined";
        if ("function" == typeof o2) {
          if (o2.$$typeof === j) return eM(e10, r2, n2, o2);
          if (o2.$$typeof === T) return void 0 !== (n2 = (t2 = e10.writtenServerReferences).get(o2)) ? e10 = "$F" + n2.toString(16) : (n2 = null === (n2 = o2.$$bound) ? null : Promise.resolve(n2), e10 = eI(e10, { id: o2.$$id, bound: n2 }, 0), t2.set(o2, e10), e10 = "$F" + e10.toString(16)), e10;
          if (void 0 !== e10.temporaryReferences && void 0 !== (e10 = e10.temporaryReferences.get(o2))) return "$T" + e10;
          if (o2.$$typeof === q) throw Error("Could not reference an opaque temporary reference. This is likely due to misconfiguring the temporaryReferences options on the server.");
          if (/^on[A-Z]/.test(n2)) throw Error("Event handlers cannot be passed to Client Component props." + ep(r2, n2) + "\nIf you need interactivity, consider converting part of this to a Client Component.");
          throw Error('Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server". Or maybe you meant to call this function rather than return it.' + ep(r2, n2));
        }
        if ("symbol" == typeof o2) {
          if (void 0 !== (s2 = (t2 = e10.writtenSymbols).get(o2))) return ek(s2);
          if (Symbol.for(s2 = o2.description) !== o2) throw Error("Only global symbols received from Symbol.for(...) can be passed to Client Components. The symbol Symbol.for(" + o2.description + ") cannot be found among global symbols." + ep(r2, n2));
          return e10.pendingChunks++, n2 = e10.nextChunkId++, r2 = ex(e10, n2, "$S" + s2), e10.completedImportChunks.push(r2), t2.set(o2, n2), ek(n2);
        }
        if ("bigint" == typeof o2) return "$n" + o2.toString(10);
        throw Error("Type " + typeof o2 + " is not supported in Client Component props." + ep(r2, n2));
      }
      function eU(e10, t2) {
        var r2 = eb;
        eb = null;
        try {
          var n2 = e10.onError, o2 = W ? X.run(void 0, n2, t2) : n2(t2);
        } finally {
          eb = r2;
        }
        if (null != o2 && "string" != typeof o2) throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof o2 + '" instead');
        return o2 || "";
      }
      function eF(e10, t2) {
        (0, e10.onFatalError)(t2), null !== e10.destination ? (e10.status = 14, $(e10.destination, t2)) : (e10.status = 13, e10.fatalError = t2), e10.cacheController.abort(Error("The render was aborted due to a fatal error.", { cause: t2 }));
      }
      function eB(e10, t2, r2) {
        r2 = { digest: r2 }, t2 = P(t2 = t2.toString(16) + ":E" + ev(r2) + "\n"), e10.completedErrorChunks.push(t2);
      }
      function eH(e10, t2, r2) {
        t2 = P(t2 = t2.toString(16) + ":" + r2 + "\n"), e10.completedRegularChunks.push(t2);
      }
      function ez(e10, t2, r2, n2, o2) {
        o2 ? e10.pendingDebugChunks++ : e10.pendingChunks++, o2 = (n2 = new Uint8Array(n2.buffer, n2.byteOffset, n2.byteLength)).byteLength, t2 = P(t2 = t2.toString(16) + ":" + r2 + o2.toString(16) + ","), e10.completedRegularChunks.push(t2, n2);
      }
      function eW(e10, t2, r2, n2) {
        if (null === w) throw Error("Existence of byteLengthOfChunk should have already been checked. This is a bug in React.");
        n2 ? e10.pendingDebugChunks++ : e10.pendingChunks++, n2 = (r2 = P(r2)).byteLength, t2 = P(t2 = t2.toString(16) + ":T" + n2.toString(16) + ","), e10.completedRegularChunks.push(t2, r2);
      }
      function eX(e10, t2, r2) {
        var n2 = t2.id;
        "string" == typeof r2 && null !== w ? eW(e10, n2, r2, false) : r2 instanceof ArrayBuffer ? ez(e10, n2, "A", new Uint8Array(r2), false) : r2 instanceof Int8Array ? ez(e10, n2, "O", r2, false) : r2 instanceof Uint8Array ? ez(e10, n2, "o", r2, false) : r2 instanceof Uint8ClampedArray ? ez(e10, n2, "U", r2, false) : r2 instanceof Int16Array ? ez(e10, n2, "S", r2, false) : r2 instanceof Uint16Array ? ez(e10, n2, "s", r2, false) : r2 instanceof Int32Array ? ez(e10, n2, "L", r2, false) : r2 instanceof Uint32Array ? ez(e10, n2, "l", r2, false) : r2 instanceof Float32Array ? ez(e10, n2, "G", r2, false) : r2 instanceof Float64Array ? ez(e10, n2, "g", r2, false) : r2 instanceof BigInt64Array ? ez(e10, n2, "M", r2, false) : r2 instanceof BigUint64Array ? ez(e10, n2, "m", r2, false) : r2 instanceof DataView ? ez(e10, n2, "V", r2, false) : (r2 = ev(r2, t2.toJSON), eH(e10, t2.id, r2));
      }
      function eq(e10, t2, r2) {
        t2.status = 4, r2 = eU(e10, r2, t2), eB(e10, t2.id, r2), e10.abortableTasks.delete(t2), e6(e10);
      }
      var eV = {};
      function eY(e10, t2) {
        if (0 === t2.status) {
          t2.status = 5;
          var r2 = ew;
          try {
            eL = t2.model;
            var n2 = eN(e10, t2, eV, "", t2.model);
            if (eL = n2, t2.keyPath = null, t2.implicitSlot = false, "object" == typeof n2 && null !== n2) e10.writtenObjects.set(n2, ek(t2.id)), eX(e10, t2, n2);
            else {
              var o2 = ev(n2);
              eH(e10, t2.id, o2);
            }
            t2.status = 1, e10.abortableTasks.delete(t2), e6(e10);
          } catch (r3) {
            if (12 === e10.status) if (e10.abortableTasks.delete(t2), t2.status = 0, 21 === e10.type) eQ(t2), e0(t2, e10);
            else {
              var i2 = e10.fatalError;
              eK(t2), eZ(t2, e10, i2);
            }
            else {
              var a2 = r3 === J ? K() : r3;
              if ("object" == typeof a2 && null !== a2 && "function" == typeof a2.then) {
                t2.status = 0, t2.thenableState = et();
                var u2 = t2.ping;
                a2.then(u2, u2);
              } else eq(e10, t2, a2);
            }
          } finally {
            ew = r2;
          }
        }
      }
      function eJ(e10, t2) {
        var r2 = ew;
        try {
          eX(e10, t2, t2.model);
        } finally {
          ew = r2;
        }
      }
      function eG(e10) {
        var t2 = eu.H;
        eu.H = er;
        var r2 = eb;
        Z = eb = e10;
        try {
          var n2 = e10.pingedTasks;
          e10.pingedTasks = [];
          for (var o2 = 0; o2 < n2.length; o2++) eY(e10, n2[o2]);
          e1(e10);
        } catch (t3) {
          eU(e10, t3, null), eF(e10, t3);
        } finally {
          eu.H = t2, Z = null, eb = r2;
        }
      }
      function eK(e10) {
        0 === e10.status && (e10.status = 3);
      }
      function eZ(e10, t2, r2) {
        3 === e10.status && (r2 = ek(r2), e10 = ex(t2, e10.id, r2), t2.completedErrorChunks.push(e10));
      }
      function eQ(e10) {
        0 === e10.status && (e10.status = 3);
      }
      function e0(e10, t2) {
        3 === e10.status && t2.pendingChunks--;
      }
      function e1(e10) {
        var t2 = e10.destination;
        if (null !== t2) {
          C = new Uint8Array(4096), R = 0;
          try {
            for (var r2 = e10.completedImportChunks, n2 = 0; n2 < r2.length; n2++) e10.pendingChunks--, E(t2, r2[n2]);
            r2.splice(0, n2);
            var o2 = e10.completedHintChunks;
            for (n2 = 0; n2 < o2.length; n2++) E(t2, o2[n2]);
            o2.splice(0, n2);
            var i2 = e10.completedRegularChunks;
            for (n2 = 0; n2 < i2.length; n2++) e10.pendingChunks--, E(t2, i2[n2]);
            i2.splice(0, n2);
            var a2 = e10.completedErrorChunks;
            for (n2 = 0; n2 < a2.length; n2++) e10.pendingChunks--, E(t2, a2[n2]);
            a2.splice(0, n2);
          } finally {
            e10.flushScheduled = false, C && 0 < R && (t2.enqueue(new Uint8Array(C.buffer, 0, R)), C = null, R = 0);
          }
        }
        0 === e10.pendingChunks && (12 > e10.status && e10.cacheController.abort(Error("This render completed successfully. All cacheSignals are now aborted to allow clean up of any unused resources.")), null !== e10.destination && (e10.status = 14, e10.destination.close(), e10.destination = null));
      }
      function e2(e10) {
        e10.flushScheduled = null !== e10.destination, W ? S(function() {
          X.run(e10, eG, e10);
        }) : S(function() {
          return eG(e10);
        }), setTimeout(function() {
          10 === e10.status && (e10.status = 11);
        }, 0);
      }
      function e4(e10) {
        false === e10.flushScheduled && 0 === e10.pingedTasks.length && null !== e10.destination && (e10.flushScheduled = true, setTimeout(function() {
          e10.flushScheduled = false, e1(e10);
        }, 0));
      }
      function e6(e10) {
        0 === e10.abortableTasks.size && (e10 = e10.onAllReady)();
      }
      function e3(e10, t2) {
        if (13 === e10.status) e10.status = 14, $(t2, e10.fatalError);
        else if (14 !== e10.status && null === e10.destination) {
          e10.destination = t2;
          try {
            e1(e10);
          } catch (t3) {
            eU(e10, t3, null), eF(e10, t3);
          }
        }
      }
      function e9(e10, t2) {
        if (!(11 < e10.status)) try {
          e10.status = 12, e10.cacheController.abort(t2);
          var r2 = e10.abortableTasks;
          if (0 < r2.size) if (21 === e10.type) r2.forEach(function(t3) {
            return eQ(t3, e10);
          }), setTimeout(function() {
            try {
              r2.forEach(function(t3) {
                return e0(t3, e10);
              }), (0, e10.onAllReady)(), e1(e10);
            } catch (t3) {
              eU(e10, t3, null), eF(e10, t3);
            }
          }, 0);
          else {
            var n2 = void 0 === t2 ? Error("The render was aborted by the server without a reason.") : "object" == typeof t2 && null !== t2 && "function" == typeof t2.then ? Error("The render was aborted by the server with a promise.") : t2, o2 = eU(e10, n2, null), i2 = e10.nextChunkId++;
            e10.fatalError = i2, e10.pendingChunks++, eB(e10, i2, o2, n2, false, null), r2.forEach(function(t3) {
              return eK(t3, e10, i2);
            }), setTimeout(function() {
              try {
                r2.forEach(function(t3) {
                  return eZ(t3, e10, i2);
                }), (0, e10.onAllReady)(), e1(e10);
              } catch (t3) {
                eU(e10, t3, null), eF(e10, t3);
              }
            }, 0);
          }
          else (0, e10.onAllReady)(), e1(e10);
        } catch (t3) {
          eU(e10, t3, null), eF(e10, t3);
        }
      }
      function e5(e10, t2) {
        var r2 = "", n2 = e10[t2];
        if (n2) r2 = n2.name;
        else {
          var o2 = t2.lastIndexOf("#");
          if (-1 !== o2 && (r2 = t2.slice(o2 + 1), n2 = e10[t2.slice(0, o2)]), !n2) throw Error('Could not find the module "' + t2 + '" in the React Server Manifest. This is probably a bug in the React Server Components bundler.');
        }
        return n2.async ? [n2.id, n2.chunks, r2, 1] : [n2.id, n2.chunks, r2];
      }
      function e8(e10) {
        var t2 = globalThis.__next_require__(e10);
        return "function" != typeof t2.then || "fulfilled" === t2.status ? null : (t2.then(function(e11) {
          t2.status = "fulfilled", t2.value = e11;
        }, function(e11) {
          t2.status = "rejected", t2.reason = e11;
        }), t2);
      }
      var e7 = /* @__PURE__ */ new WeakSet(), te = /* @__PURE__ */ new WeakSet();
      function tt() {
      }
      function tr(e10) {
        for (var t2 = e10[1], r2 = [], n2 = 0; n2 < t2.length; n2++) {
          var o2 = globalThis.__next_chunk_load__(t2[n2]);
          if (te.has(o2) || r2.push(o2), !e7.has(o2)) {
            var i2 = te.add.bind(te, o2);
            o2.then(i2, tt), e7.add(o2);
          }
        }
        return 4 === e10.length ? 0 === r2.length ? e8(e10[0]) : Promise.all(r2).then(function() {
          return e8(e10[0]);
        }) : 0 < r2.length ? Promise.all(r2) : null;
      }
      function tn(e10) {
        var t2 = globalThis.__next_require__(e10[0]);
        if (4 === e10.length && "function" == typeof t2.then) if ("fulfilled" === t2.status) t2 = t2.value;
        else throw t2.reason;
        return "*" === e10[2] ? t2 : "" === e10[2] ? t2.__esModule ? t2.default : t2 : t2[e10[2]];
      }
      function to(e10, t2, r2, n2) {
        this.status = e10, this.value = t2, this.reason = r2, this._response = n2;
      }
      function ti(e10) {
        return new to("pending", null, null, e10);
      }
      function ta(e10, t2) {
        for (var r2 = 0; r2 < e10.length; r2++) (0, e10[r2])(t2);
      }
      function tu(e10, t2) {
        if ("pending" !== e10.status && "blocked" !== e10.status) e10.reason.error(t2);
        else {
          var r2 = e10.reason;
          e10.status = "rejected", e10.reason = t2, null !== r2 && ta(r2, t2);
        }
      }
      function ts(e10, t2, r2) {
        if ("pending" !== e10.status) e10 = e10.reason, "C" === t2[0] ? e10.close("C" === t2 ? '"$undefined"' : t2.slice(1)) : e10.enqueueModel(t2);
        else {
          var n2 = e10.value, o2 = e10.reason;
          if (e10.status = "resolved_model", e10.value = t2, e10.reason = r2, null !== n2) switch (tp(e10), e10.status) {
            case "fulfilled":
              ta(n2, e10.value);
              break;
            case "pending":
            case "blocked":
            case "cyclic":
              if (e10.value) for (t2 = 0; t2 < n2.length; t2++) e10.value.push(n2[t2]);
              else e10.value = n2;
              if (e10.reason) {
                if (o2) for (t2 = 0; t2 < o2.length; t2++) e10.reason.push(o2[t2]);
              } else e10.reason = o2;
              break;
            case "rejected":
              o2 && ta(o2, e10.reason);
          }
        }
      }
      function tl(e10, t2, r2) {
        return new to("resolved_model", (r2 ? '{"done":true,"value":' : '{"done":false,"value":') + t2 + "}", -1, e10);
      }
      function tc(e10, t2, r2) {
        ts(e10, (r2 ? '{"done":true,"value":' : '{"done":false,"value":') + t2 + "}", -1);
      }
      to.prototype = Object.create(Promise.prototype), to.prototype.then = function(e10, t2) {
        switch ("resolved_model" === this.status && tp(this), this.status) {
          case "fulfilled":
            e10(this.value);
            break;
          case "pending":
          case "blocked":
          case "cyclic":
            e10 && (null === this.value && (this.value = []), this.value.push(e10)), t2 && (null === this.reason && (this.reason = []), this.reason.push(t2));
            break;
          default:
            t2(this.reason);
        }
      };
      var tf = null, td = null;
      function tp(e10) {
        var t2 = tf, r2 = td;
        tf = e10, td = null;
        var n2 = -1 === e10.reason ? void 0 : e10.reason.toString(16), o2 = e10.value;
        e10.status = "cyclic", e10.value = null, e10.reason = null;
        try {
          var i2 = JSON.parse(o2), a2 = function e11(t3, r3, n3, o3, i3) {
            if ("string" == typeof o3) return function(e12, t4, r4, n4, o4) {
              if ("$" === n4[0]) {
                switch (n4[1]) {
                  case "$":
                    return n4.slice(1);
                  case "@":
                    return th(e12, t4 = parseInt(n4.slice(2), 16));
                  case "F":
                    return n4 = tm(e12, n4 = n4.slice(2), t4, r4, tC), function(e13, t5, r5, n5, o5, i5) {
                      var a5 = e5(e13._bundlerConfig, t5);
                      if (t5 = tr(a5), r5) r5 = Promise.all([r5, t5]).then(function(e14) {
                        e14 = e14[0];
                        var t6 = tn(a5);
                        return t6.bind.apply(t6, [null].concat(e14));
                      });
                      else {
                        if (!t5) return tn(a5);
                        r5 = Promise.resolve(t5).then(function() {
                          return tn(a5);
                        });
                      }
                      return r5.then(tv(n5, o5, i5, false, e13, tC, []), tg(n5)), null;
                    }(e12, n4.id, n4.bound, tf, t4, r4);
                  case "T":
                    var i4, a4;
                    if (void 0 === o4 || void 0 === e12._temporaryReferences) throw Error("Could not reference an opaque temporary reference. This is likely due to misconfiguring the temporaryReferences options on the server.");
                    return i4 = e12._temporaryReferences, a4 = new Proxy(a4 = Object.defineProperties(function() {
                      throw Error("Attempted to call a temporary Client Reference from the server but it is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
                    }, { $$typeof: { value: q } }), V), i4.set(a4, o4), a4;
                  case "Q":
                    return tm(e12, n4 = n4.slice(2), t4, r4, tb);
                  case "W":
                    return tm(e12, n4 = n4.slice(2), t4, r4, t_);
                  case "K":
                    t4 = n4.slice(2);
                    var u3 = e12._prefix + t4 + "_", s2 = new FormData();
                    return e12._formData.forEach(function(e13, t5) {
                      t5.startsWith(u3) && s2.append(t5.slice(u3.length), e13);
                    }), s2;
                  case "i":
                    return tm(e12, n4 = n4.slice(2), t4, r4, tS);
                  case "I":
                    return 1 / 0;
                  case "-":
                    return "$-0" === n4 ? -0 : -1 / 0;
                  case "N":
                    return NaN;
                  case "u":
                    return;
                  case "D":
                    return new Date(Date.parse(n4.slice(2)));
                  case "n":
                    return BigInt(n4.slice(2));
                }
                switch (n4[1]) {
                  case "A":
                    return tR(e12, n4, ArrayBuffer, 1, t4, r4);
                  case "O":
                    return tR(e12, n4, Int8Array, 1, t4, r4);
                  case "o":
                    return tR(e12, n4, Uint8Array, 1, t4, r4);
                  case "U":
                    return tR(e12, n4, Uint8ClampedArray, 1, t4, r4);
                  case "S":
                    return tR(e12, n4, Int16Array, 2, t4, r4);
                  case "s":
                    return tR(e12, n4, Uint16Array, 2, t4, r4);
                  case "L":
                    return tR(e12, n4, Int32Array, 4, t4, r4);
                  case "l":
                    return tR(e12, n4, Uint32Array, 4, t4, r4);
                  case "G":
                    return tR(e12, n4, Float32Array, 4, t4, r4);
                  case "g":
                    return tR(e12, n4, Float64Array, 8, t4, r4);
                  case "M":
                    return tR(e12, n4, BigInt64Array, 8, t4, r4);
                  case "m":
                    return tR(e12, n4, BigUint64Array, 8, t4, r4);
                  case "V":
                    return tR(e12, n4, DataView, 1, t4, r4);
                  case "B":
                    return t4 = parseInt(n4.slice(2), 16), e12._formData.get(e12._prefix + t4);
                }
                switch (n4[1]) {
                  case "R":
                    return tO(e12, n4, void 0);
                  case "r":
                    return tO(e12, n4, "bytes");
                  case "X":
                    return tw(e12, n4, false);
                  case "x":
                    return tw(e12, n4, true);
                }
                return tm(e12, n4 = n4.slice(1), t4, r4, tC);
              }
              return n4;
            }(t3, r3, n3, o3, i3);
            if ("object" == typeof o3 && null !== o3) if (void 0 !== i3 && void 0 !== t3._temporaryReferences && t3._temporaryReferences.set(o3, i3), Array.isArray(o3)) for (var a3 = 0; a3 < o3.length; a3++) o3[a3] = e11(t3, o3, "" + a3, o3[a3], void 0 !== i3 ? i3 + ":" + a3 : void 0);
            else for (a3 in o3) ey.call(o3, a3) && (r3 = void 0 !== i3 && -1 === a3.indexOf(":") ? i3 + ":" + a3 : void 0, void 0 !== (r3 = e11(t3, o3, a3, o3[a3], r3)) ? o3[a3] = r3 : delete o3[a3]);
            return o3;
          }(e10._response, { "": i2 }, "", i2, n2);
          if (null !== td && 0 < td.deps) td.value = a2, e10.status = "blocked";
          else {
            var u2 = e10.value;
            e10.status = "fulfilled", e10.value = a2, null !== u2 && ta(u2, a2);
          }
        } catch (t3) {
          e10.status = "rejected", e10.reason = t3;
        } finally {
          tf = t2, td = r2;
        }
      }
      function ty(e10, t2) {
        e10._closed = true, e10._closedReason = t2, e10._chunks.forEach(function(e11) {
          "pending" === e11.status && tu(e11, t2);
        });
      }
      function th(e10, t2) {
        var r2 = e10._chunks, n2 = r2.get(t2);
        return n2 || (n2 = null != (n2 = e10._formData.get(e10._prefix + t2)) ? new to("resolved_model", n2, t2, e10) : e10._closed ? new to("rejected", null, e10._closedReason, e10) : ti(e10), r2.set(t2, n2)), n2;
      }
      function tv(e10, t2, r2, n2, o2, i2, a2) {
        if (td) {
          var u2 = td;
          n2 || u2.deps++;
        } else u2 = td = { deps: +!n2, value: null };
        return function(n3) {
          for (var s2 = 1; s2 < a2.length; s2++) n3 = n3[a2[s2]];
          t2[r2] = i2(o2, n3), "" === r2 && null === u2.value && (u2.value = t2[r2]), u2.deps--, 0 === u2.deps && "blocked" === e10.status && (n3 = e10.value, e10.status = "fulfilled", e10.value = u2.value, null !== n3 && ta(n3, u2.value));
        };
      }
      function tg(e10) {
        return function(t2) {
          return tu(e10, t2);
        };
      }
      function tm(e10, t2, r2, n2, o2) {
        var i2 = parseInt((t2 = t2.split(":"))[0], 16);
        switch ("resolved_model" === (i2 = th(e10, i2)).status && tp(i2), i2.status) {
          case "fulfilled":
            for (n2 = 1, r2 = i2.value; n2 < t2.length; n2++) r2 = r2[t2[n2]];
            return o2(e10, r2);
          case "pending":
          case "blocked":
          case "cyclic":
            var a2 = tf;
            return i2.then(tv(a2, r2, n2, "cyclic" === i2.status, e10, o2, t2), tg(a2)), null;
          default:
            throw i2.reason;
        }
      }
      function tb(e10, t2) {
        return new Map(t2);
      }
      function t_(e10, t2) {
        return new Set(t2);
      }
      function tS(e10, t2) {
        return t2[Symbol.iterator]();
      }
      function tC(e10, t2) {
        return t2;
      }
      function tR(e10, t2, r2, n2, o2, i2) {
        return t2 = parseInt(t2.slice(2), 16), t2 = e10._formData.get(e10._prefix + t2), t2 = r2 === ArrayBuffer ? t2.arrayBuffer() : t2.arrayBuffer().then(function(e11) {
          return new r2(e11);
        }), n2 = tf, t2.then(tv(n2, o2, i2, false, e10, tC, []), tg(n2)), null;
      }
      function tE(e10, t2, r2, n2) {
        var o2 = e10._chunks;
        for (r2 = new to("fulfilled", r2, n2, e10), o2.set(t2, r2), e10 = e10._formData.getAll(e10._prefix + t2), t2 = 0; t2 < e10.length; t2++) "C" === (o2 = e10[t2])[0] ? n2.close("C" === o2 ? '"$undefined"' : o2.slice(1)) : n2.enqueueModel(o2);
      }
      function tO(e10, t2, r2) {
        t2 = parseInt(t2.slice(2), 16);
        var n2 = null;
        r2 = new ReadableStream({ type: r2, start: function(e11) {
          n2 = e11;
        } });
        var o2 = null;
        return tE(e10, t2, r2, { enqueueModel: function(t3) {
          if (null === o2) {
            var r3 = new to("resolved_model", t3, -1, e10);
            tp(r3), "fulfilled" === r3.status ? n2.enqueue(r3.value) : (r3.then(function(e11) {
              return n2.enqueue(e11);
            }, function(e11) {
              return n2.error(e11);
            }), o2 = r3);
          } else {
            r3 = o2;
            var i2 = ti(e10);
            i2.then(function(e11) {
              return n2.enqueue(e11);
            }, function(e11) {
              return n2.error(e11);
            }), o2 = i2, r3.then(function() {
              o2 === i2 && (o2 = null), ts(i2, t3, -1);
            });
          }
        }, close: function() {
          if (null === o2) n2.close();
          else {
            var e11 = o2;
            o2 = null, e11.then(function() {
              return n2.close();
            });
          }
        }, error: function(e11) {
          if (null === o2) n2.error(e11);
          else {
            var t3 = o2;
            o2 = null, t3.then(function() {
              return n2.error(e11);
            });
          }
        } }), r2;
      }
      function tP() {
        return this;
      }
      function tw(e10, t2, r2) {
        t2 = parseInt(t2.slice(2), 16);
        var n2 = [], o2 = false, i2 = 0, a2 = {};
        return a2[m] = function() {
          var t3, r3 = 0;
          return (t3 = { next: t3 = function(t4) {
            if (void 0 !== t4) throw Error("Values cannot be passed to next() of AsyncIterables passed to Client Components.");
            if (r3 === n2.length) {
              if (o2) return new to("fulfilled", { done: true, value: void 0 }, null, e10);
              n2[r3] = ti(e10);
            }
            return n2[r3++];
          } })[m] = tP, t3;
        }, tE(e10, t2, r2 = r2 ? a2[m]() : a2, { enqueueModel: function(t3) {
          i2 === n2.length ? n2[i2] = tl(e10, t3, false) : tc(n2[i2], t3, false), i2++;
        }, close: function(t3) {
          for (o2 = true, i2 === n2.length ? n2[i2] = tl(e10, t3, true) : tc(n2[i2], t3, true), i2++; i2 < n2.length; ) tc(n2[i2++], '"$undefined"', true);
        }, error: function(t3) {
          for (o2 = true, i2 === n2.length && (n2[i2] = ti(e10)); i2 < n2.length; ) tu(n2[i2++], t3);
        } }), r2;
      }
      function t$(e10, t2, r2) {
        var n2 = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : new FormData();
        return { _bundlerConfig: e10, _prefix: t2, _formData: n2, _chunks: /* @__PURE__ */ new Map(), _closed: false, _closedReason: null, _temporaryReferences: r2 };
      }
      function tj(e10) {
        ty(e10, Error("Connection closed."));
      }
      function tT(e10, t2, r2) {
        var n2 = e5(e10, t2);
        return e10 = tr(n2), r2 ? Promise.all([r2, e10]).then(function(e11) {
          e11 = e11[0];
          var t3 = tn(n2);
          return t3.bind.apply(t3, [null].concat(e11));
        }) : e10 ? Promise.resolve(e10).then(function() {
          return tn(n2);
        }) : Promise.resolve(tn(n2));
      }
      function tk(e10, t2, r2) {
        if (tj(e10 = t$(t2, r2, void 0, e10)), (e10 = th(e10, 0)).then(function() {
        }), "fulfilled" !== e10.status) throw e10.reason;
        return e10.value;
      }
      r.createClientModuleProxy = function(e10) {
        return new Proxy(e10 = k({}, e10, false), N);
      }, r.createTemporaryReferenceSet = function() {
        return /* @__PURE__ */ new WeakMap();
      }, r.decodeAction = function(e10, t2) {
        var r2 = new FormData(), n2 = null;
        return e10.forEach(function(o2, i2) {
          i2.startsWith("$ACTION_") ? i2.startsWith("$ACTION_REF_") ? (o2 = tk(e10, t2, o2 = "$ACTION_" + i2.slice(12) + ":"), n2 = tT(t2, o2.id, o2.bound)) : i2.startsWith("$ACTION_ID_") && (n2 = tT(t2, o2 = i2.slice(11), null)) : r2.append(i2, o2);
        }), null === n2 ? null : n2.then(function(e11) {
          return e11.bind(null, r2);
        });
      }, r.decodeFormState = function(e10, t2, r2) {
        var n2 = t2.get("$ACTION_KEY");
        if ("string" != typeof n2) return Promise.resolve(null);
        var o2 = null;
        if (t2.forEach(function(e11, n3) {
          n3.startsWith("$ACTION_REF_") && (o2 = tk(t2, r2, "$ACTION_" + n3.slice(12) + ":"));
        }), null === o2) return Promise.resolve(null);
        var i2 = o2.id;
        return Promise.resolve(o2.bound).then(function(t3) {
          return null === t3 ? null : [e10, n2, i2, t3.length - 1];
        });
      }, r.decodeReply = function(e10, t2, r2) {
        if ("string" == typeof e10) {
          var n2 = new FormData();
          n2.append("0", e10), e10 = n2;
        }
        return t2 = th(e10 = t$(t2, "", r2 ? r2.temporaryReferences : void 0, e10), 0), tj(e10), t2;
      }, r.decodeReplyFromAsyncIterable = function(e10, t2, r2) {
        function n2(e11) {
          ty(i2, e11), "function" == typeof o2.throw && o2.throw(e11).then(n2, n2);
        }
        var o2 = e10[m](), i2 = t$(t2, "", r2 ? r2.temporaryReferences : void 0);
        return o2.next().then(function e11(t3) {
          if (t3.done) tj(i2);
          else {
            var r3 = (t3 = t3.value)[0];
            if ("string" == typeof (t3 = t3[1])) {
              i2._formData.append(r3, t3);
              var a2 = i2._prefix;
              if (r3.startsWith(a2)) {
                var u2 = i2._chunks;
                r3 = +r3.slice(a2.length), (u2 = u2.get(r3)) && ts(u2, t3, r3);
              }
            } else i2._formData.append(r3, t3);
            o2.next().then(e11, n2);
          }
        }, n2), th(i2, 0);
      }, r.prerender = function(e10, t2, r2) {
        return new Promise(function(n2, o2) {
          var i2 = new em(21, e10, t2, r2 ? r2.onError : void 0, function() {
            n2({ prelude: new ReadableStream({ type: "bytes", pull: function(e11) {
              e3(i2, e11);
            }, cancel: function(e11) {
              i2.destination = null, e9(i2, e11);
            } }, { highWaterMark: 0 }) });
          }, o2, r2 ? r2.identifierPrefix : void 0, r2 ? r2.temporaryReferences : void 0);
          if (r2 && r2.signal) {
            var a2 = r2.signal;
            if (a2.aborted) e9(i2, a2.reason);
            else {
              var u2 = function() {
                e9(i2, a2.reason), a2.removeEventListener("abort", u2);
              };
              a2.addEventListener("abort", u2);
            }
          }
          e2(i2);
        });
      }, r.registerClientReference = function(e10, t2, r2) {
        return k(e10, t2 + "#" + r2, false);
      }, r.registerServerReference = function(e10, t2, r2) {
        return Object.defineProperties(e10, { $$typeof: { value: T }, $$id: { value: null === r2 ? t2 : t2 + "#" + r2, configurable: true }, $$bound: { value: null, configurable: true }, bind: { value: M, configurable: true } });
      }, r.renderToReadableStream = function(e10, t2, r2) {
        var n2 = new em(20, e10, t2, r2 ? r2.onError : void 0, Y, Y, r2 ? r2.identifierPrefix : void 0, r2 ? r2.temporaryReferences : void 0);
        if (r2 && r2.signal) {
          var o2 = r2.signal;
          if (o2.aborted) e9(n2, o2.reason);
          else {
            var i2 = function() {
              e9(n2, o2.reason), o2.removeEventListener("abort", i2);
            };
            o2.addEventListener("abort", i2);
          }
        }
        return new ReadableStream({ type: "bytes", start: function() {
          e2(n2);
        }, pull: function(e11) {
          e3(n2, e11);
        }, cancel: function(e11) {
          n2.destination = null, e9(n2, e11);
        } }, { highWaterMark: 0 });
      };
    }, 584174, (e, t, r) => {
      "use strict";
      var n;
      r.renderToReadableStream = (n = e.r(709822)).renderToReadableStream, r.decodeReply = n.decodeReply, r.decodeReplyFromAsyncIterable = n.decodeReplyFromAsyncIterable, r.decodeAction = n.decodeAction, r.decodeFormState = n.decodeFormState, r.registerServerReference = n.registerServerReference, r.registerClientReference = n.registerClientReference, r.createClientModuleProxy = n.createClientModuleProxy, r.createTemporaryReferenceSet = n.createTemporaryReferenceSet;
    }, 467762, (e, t, r) => {
      let { createClientModuleProxy: n } = e.r(584174);
      e.n(n("[project]/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js <module evaluation>"));
    }, 735259, (e, t, r) => {
      let { createClientModuleProxy: n } = e.r(584174);
      e.n(n("[project]/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js"));
    }, 172956, (e) => {
      "use strict";
      e.i(467762);
      var t = e.i(735259);
      e.n(t);
    }, 362915, (e, t, r) => {
      let { createClientModuleProxy: n } = e.r(584174);
      e.n(n("[project]/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js <module evaluation>"));
    }, 402988, (e, t, r) => {
      let { createClientModuleProxy: n } = e.r(584174);
      e.n(n("[project]/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js"));
    }, 327999, (e) => {
      "use strict";
      e.i(362915);
      var t = e.i(402988);
      e.n(t);
    }, 818902, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { DEFAULT_SEGMENT_KEY: function() {
        return f;
      }, PAGE_SEGMENT_KEY: function() {
        return c;
      }, addSearchParamsIfPageSegment: function() {
        return s;
      }, computeSelectedLayoutSegment: function() {
        return l;
      }, getSegmentValue: function() {
        return i;
      }, getSelectedLayoutSegmentPath: function() {
        return function e2(t2, r2, n2 = true, o2 = []) {
          let a2;
          if (n2) a2 = t2[1][r2];
          else {
            let e3 = t2[1];
            a2 = e3.children ?? Object.values(e3)[0];
          }
          if (!a2) return o2;
          let u2 = i(a2[0]);
          return !u2 || u2.startsWith(c) ? o2 : (o2.push(u2), e2(a2, r2, false, o2));
        };
      }, isGroupSegment: function() {
        return a;
      }, isParallelRouteSegment: function() {
        return u;
      } };
      for (var o in n) Object.defineProperty(r, o, { enumerable: true, get: n[o] });
      function i(e2) {
        return Array.isArray(e2) ? e2[1] : e2;
      }
      function a(e2) {
        return "(" === e2[0] && e2.endsWith(")");
      }
      function u(e2) {
        return e2.startsWith("@") && "@children" !== e2;
      }
      function s(e2, t2) {
        if (e2.includes(c)) {
          let e3 = JSON.stringify(t2);
          return "{}" !== e3 ? c + "?" + e3 : c;
        }
        return e2;
      }
      function l(e2, t2) {
        if (!e2 || 0 === e2.length) return null;
        let r2 = "children" === t2 ? e2[0] : e2[e2.length - 1];
        return r2 === f ? null : r2;
      }
      let c = "__PAGE__", f = "__DEFAULT__";
    }, 158883, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "ReadonlyURLSearchParams", { enumerable: true, get: function() {
        return o;
      } });
      class n extends Error {
        constructor() {
          super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams");
        }
      }
      class o extends URLSearchParams {
        append() {
          throw new n();
        }
        delete() {
          throw new n();
        }
        set() {
          throw new n();
        }
        sort() {
          throw new n();
        }
      }
      ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
    }, 875752, (e, t, r) => {
      let { createClientModuleProxy: n } = e.r(584174);
      e.n(n("[project]/node_modules/next/dist/shared/lib/server-inserted-html.shared-runtime.js <module evaluation>"));
    }, 266332, (e, t, r) => {
      let { createClientModuleProxy: n } = e.r(584174);
      e.n(n("[project]/node_modules/next/dist/shared/lib/server-inserted-html.shared-runtime.js"));
    }, 552939, (e) => {
      "use strict";
      e.i(875752);
      var t = e.i(266332);
      e.n(t);
    }, 548569, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { UnrecognizedActionError: function() {
        return i;
      }, unstable_isUnrecognizedActionError: function() {
        return a;
      } };
      for (var o in n) Object.defineProperty(r, o, { enumerable: true, get: n[o] });
      class i extends Error {
        constructor(...e2) {
          super(...e2), this.name = "UnrecognizedActionError";
        }
      }
      function a(e2) {
        return !!(e2 && "object" == typeof e2 && e2 instanceof i);
      }
      ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
    }, 301659, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "RedirectStatusCode", { enumerable: true, get: function() {
        return o;
      } });
      var n, o = ((n = {})[n.SeeOther = 303] = "SeeOther", n[n.TemporaryRedirect = 307] = "TemporaryRedirect", n[n.PermanentRedirect = 308] = "PermanentRedirect", n);
      ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
    }, 557976, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n, o = { REDIRECT_ERROR_CODE: function() {
        return u;
      }, RedirectType: function() {
        return s;
      }, isRedirectError: function() {
        return l;
      } };
      for (var i in o) Object.defineProperty(r, i, { enumerable: true, get: o[i] });
      let a = e.r(301659), u = "NEXT_REDIRECT";
      var s = ((n = {}).push = "push", n.replace = "replace", n);
      function l(e2) {
        if ("object" != typeof e2 || null === e2 || !("digest" in e2) || "string" != typeof e2.digest) return false;
        let t2 = e2.digest.split(";"), [r2, n2] = t2, o2 = t2.slice(2, -2).join(";"), i2 = Number(t2.at(-2));
        return r2 === u && ("replace" === n2 || "push" === n2) && "string" == typeof o2 && !isNaN(i2) && i2 in a.RedirectStatusCode;
      }
      ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
    }, 88579, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "actionAsyncStorageInstance", { enumerable: true, get: function() {
        return n;
      } });
      let n = (0, e.r(987049).createAsyncLocalStorage)();
    }, 447056, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "actionAsyncStorage", { enumerable: true, get: function() {
        return n.actionAsyncStorageInstance;
      } });
      let n = e.r(88579);
    }, 767712, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { getRedirectError: function() {
        return s;
      }, getRedirectStatusCodeFromError: function() {
        return p;
      }, getRedirectTypeFromError: function() {
        return d;
      }, getURLFromRedirectError: function() {
        return f;
      }, permanentRedirect: function() {
        return c;
      }, redirect: function() {
        return l;
      } };
      for (var o in n) Object.defineProperty(r, o, { enumerable: true, get: n[o] });
      let i = e.r(301659), a = e.r(557976), u = e.r(447056).actionAsyncStorage;
      function s(e2, t2, r2 = i.RedirectStatusCode.TemporaryRedirect) {
        let n2 = Object.defineProperty(Error(a.REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        return n2.digest = `${a.REDIRECT_ERROR_CODE};${t2};${e2};${r2};`, n2;
      }
      function l(e2, t2) {
        throw s(e2, t2 ??= u?.getStore()?.isAction ? a.RedirectType.push : a.RedirectType.replace, i.RedirectStatusCode.TemporaryRedirect);
      }
      function c(e2, t2 = a.RedirectType.replace) {
        throw s(e2, t2, i.RedirectStatusCode.PermanentRedirect);
      }
      function f(e2) {
        return (0, a.isRedirectError)(e2) ? e2.digest.split(";").slice(2, -2).join(";") : null;
      }
      function d(e2) {
        if (!(0, a.isRedirectError)(e2)) throw Object.defineProperty(Error("Not a redirect error"), "__NEXT_ERROR_CODE", { value: "E260", enumerable: false, configurable: true });
        return e2.digest.split(";", 2)[1];
      }
      function p(e2) {
        if (!(0, a.isRedirectError)(e2)) throw Object.defineProperty(Error("Not a redirect error"), "__NEXT_ERROR_CODE", { value: "E260", enumerable: false, configurable: true });
        return Number(e2.digest.split(";").at(-2));
      }
      ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
    }, 810354, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { HTTPAccessErrorStatus: function() {
        return i;
      }, HTTP_ERROR_FALLBACK_ERROR_CODE: function() {
        return u;
      }, getAccessFallbackErrorTypeByStatus: function() {
        return c;
      }, getAccessFallbackHTTPStatus: function() {
        return l;
      }, isHTTPAccessFallbackError: function() {
        return s;
      } };
      for (var o in n) Object.defineProperty(r, o, { enumerable: true, get: n[o] });
      let i = { NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 }, a = new Set(Object.values(i)), u = "NEXT_HTTP_ERROR_FALLBACK";
      function s(e2) {
        if ("object" != typeof e2 || null === e2 || !("digest" in e2) || "string" != typeof e2.digest) return false;
        let [t2, r2] = e2.digest.split(";");
        return t2 === u && a.has(Number(r2));
      }
      function l(e2) {
        return Number(e2.digest.split(";")[1]);
      }
      function c(e2) {
        switch (e2) {
          case 401:
            return "unauthorized";
          case 403:
            return "forbidden";
          case 404:
            return "not-found";
          default:
            return;
        }
      }
      ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
    }, 212022, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "notFound", { enumerable: true, get: function() {
        return i;
      } });
      let n = e.r(810354), o = `${n.HTTP_ERROR_FALLBACK_ERROR_CODE};404`;
      function i() {
        let e2 = Object.defineProperty(Error(o), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        throw e2.digest = o, e2;
      }
      ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
    }, 79372, (e, t, r) => {
      "use strict";
      function n() {
        throw Object.defineProperty(Error("`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled."), "__NEXT_ERROR_CODE", { value: "E488", enumerable: false, configurable: true });
      }
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "forbidden", { enumerable: true, get: function() {
        return n;
      } }), e.r(810354).HTTP_ERROR_FALLBACK_ERROR_CODE, ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
    }, 753520, (e, t, r) => {
      "use strict";
      function n() {
        throw Object.defineProperty(Error("`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled."), "__NEXT_ERROR_CODE", { value: "E411", enumerable: false, configurable: true });
      }
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "unauthorized", { enumerable: true, get: function() {
        return n;
      } }), e.r(810354).HTTP_ERROR_FALLBACK_ERROR_CODE, ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
    }, 263145, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "isPostpone", { enumerable: true, get: function() {
        return o;
      } });
      let n = Symbol.for("react.postpone");
      function o(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === n;
      }
    }, 62427, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "isNextRouterError", { enumerable: true, get: function() {
        return i;
      } });
      let n = e.r(810354), o = e.r(557976);
      function i(e2) {
        return (0, o.isRedirectError)(e2) || (0, n.isHTTPAccessFallbackError)(e2);
      }
      ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
    }, 517696, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "unstable_rethrow", { enumerable: true, get: function() {
        return function e2(t2) {
          if ((0, a.isNextRouterError)(t2) || (0, i.isBailoutToCSRError)(t2) || (0, s.isDynamicServerError)(t2) || (0, u.isDynamicPostpone)(t2) || (0, o.isPostpone)(t2) || (0, n.isHangingPromiseRejectionError)(t2) || (0, u.isPrerenderInterruptedError)(t2)) throw t2;
          t2 instanceof Error && "cause" in t2 && e2(t2.cause);
        };
      } });
      let n = e.r(887014), o = e.r(263145), i = e.r(717954), a = e.r(62427), u = e.r(432459), s = e.r(993476);
      ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
    }, 795348, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "unstable_rethrow", { enumerable: true, get: function() {
        return n;
      } });
      let n = e.r(517696).unstable_rethrow;
      ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
    }, 219736, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { ReadonlyURLSearchParams: function() {
        return i.ReadonlyURLSearchParams;
      }, RedirectType: function() {
        return u.RedirectType;
      }, forbidden: function() {
        return l.forbidden;
      }, notFound: function() {
        return s.notFound;
      }, permanentRedirect: function() {
        return a.permanentRedirect;
      }, redirect: function() {
        return a.redirect;
      }, unauthorized: function() {
        return c.unauthorized;
      }, unstable_isUnrecognizedActionError: function() {
        return d;
      }, unstable_rethrow: function() {
        return f.unstable_rethrow;
      } };
      for (var o in n) Object.defineProperty(r, o, { enumerable: true, get: n[o] });
      let i = e.r(158883), a = e.r(767712), u = e.r(557976), s = e.r(212022), l = e.r(79372), c = e.r(753520), f = e.r(795348);
      function d() {
        throw Object.defineProperty(Error("`unstable_isUnrecognizedActionError` can only be used on the client."), "__NEXT_ERROR_CODE", { value: "E776", enumerable: false, configurable: true });
      }
      ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
    }, 64524, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { ReadonlyURLSearchParams: function() {
        return d.ReadonlyURLSearchParams;
      }, RedirectType: function() {
        return d.RedirectType;
      }, ServerInsertedHTMLContext: function() {
        return c.ServerInsertedHTMLContext;
      }, forbidden: function() {
        return d.forbidden;
      }, notFound: function() {
        return d.notFound;
      }, permanentRedirect: function() {
        return d.permanentRedirect;
      }, redirect: function() {
        return d.redirect;
      }, unauthorized: function() {
        return d.unauthorized;
      }, unstable_isUnrecognizedActionError: function() {
        return f.unstable_isUnrecognizedActionError;
      }, unstable_rethrow: function() {
        return d.unstable_rethrow;
      }, useParams: function() {
        return m;
      }, usePathname: function() {
        return v;
      }, useRouter: function() {
        return g;
      }, useSearchParams: function() {
        return h;
      }, useSelectedLayoutSegment: function() {
        return _;
      }, useSelectedLayoutSegments: function() {
        return b;
      }, useServerInsertedHTML: function() {
        return c.useServerInsertedHTML;
      } };
      for (var o in n) Object.defineProperty(r, o, { enumerable: true, get: n[o] });
      let i = e.r(776993)._(e.r(40049)), a = e.r(172956), u = e.r(327999), s = e.r(818902), l = e.r(158883), c = e.r(552939), f = e.r(548569), d = e.r(219736), p = e.r(432459).useDynamicRouteParams, y = e.r(432459).useDynamicSearchParams;
      function h() {
        y?.("useSearchParams()");
        let e2 = (0, i.useContext)(u.SearchParamsContext);
        return (0, i.useMemo)(() => e2 ? new l.ReadonlyURLSearchParams(e2) : null, [e2]);
      }
      function v() {
        return p?.("usePathname()"), (0, i.useContext)(u.PathnameContext);
      }
      function g() {
        let e2 = (0, i.useContext)(a.AppRouterContext);
        if (null === e2) throw Object.defineProperty(Error("invariant expected app router to be mounted"), "__NEXT_ERROR_CODE", { value: "E238", enumerable: false, configurable: true });
        return e2;
      }
      function m() {
        return p?.("useParams()"), (0, i.useContext)(u.PathParamsContext);
      }
      function b(e2 = "children") {
        p?.("useSelectedLayoutSegments()");
        let t2 = (0, i.useContext)(a.LayoutRouterContext);
        return t2 ? (0, s.getSelectedLayoutSegmentPath)(t2.parentTree, e2) : null;
      }
      function _(e2 = "children") {
        p?.("useSelectedLayoutSegment()"), (0, i.useContext)(u.NavigationPromisesContext);
        let t2 = b(e2);
        return (0, s.computeSelectedLayoutSegment)(t2, e2);
      }
      ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
    }, 626972, (e, t, r) => {
      t.exports = e.r(64524);
    }]);
  }
});

// .next/server/edge/chunks/_74669f4d._.js
var require_f4d = __commonJS({
  ".next/server/edge/chunks/_74669f4d._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/_74669f4d._.js", 828042, (e, t, r) => {
      "use strict";
      var n = Object.defineProperty, a = Object.getOwnPropertyDescriptor, i = Object.getOwnPropertyNames, o = Object.prototype.hasOwnProperty, s = {}, c = { RequestCookies: () => g, ResponseCookies: () => y, parseCookie: () => d, parseSetCookie: () => h, stringifyCookie: () => u };
      for (var l in c) n(s, l, { get: c[l], enumerable: true });
      function u(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function d(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, a2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != a2 ? a2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function h(e2) {
        if (!e2) return;
        let [[t2, r2], ...n2] = d(e2), { domain: a2, expires: i2, httponly: o2, maxage: s2, path: c2, samesite: l2, secure: u2, partitioned: h2, priority: g2 } = Object.fromEntries(n2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          var y2, m, w = { name: t2, value: decodeURIComponent(r2), domain: a2, ...i2 && { expires: new Date(i2) }, ...o2 && { httpOnly: true }, ..."string" == typeof s2 && { maxAge: Number(s2) }, path: c2, ...l2 && { sameSite: p.includes(y2 = (y2 = l2).toLowerCase()) ? y2 : void 0 }, ...u2 && { secure: true }, ...g2 && { priority: f.includes(m = (m = g2).toLowerCase()) ? m : void 0 }, ...h2 && { partitioned: true } };
          let e3 = {};
          for (let t3 in w) w[t3] && (e3[t3] = w[t3]);
          return e3;
        }
      }
      t.exports = ((e2, t2, r2, s2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let c2 of i(t2)) o.call(e2, c2) || c2 === r2 || n(e2, c2, { get: () => t2[c2], enumerable: !(s2 = a(t2, c2)) || s2.enumerable });
        return e2;
      })(n({}, "__esModule", { value: true }), s);
      var p = ["strict", "lax", "none"], f = ["low", "medium", "high"], g = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const t2 = e2.get("cookie");
          if (t2) for (const [e3, r2] of d(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => u(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => u(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, y = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const a2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (const e3 of Array.isArray(a2) ? a2 : function(e4) {
            if (!e4) return [];
            var t3, r3, n3, a3, i2, o2 = [], s2 = 0;
            function c2() {
              for (; s2 < e4.length && /\s/.test(e4.charAt(s2)); ) s2 += 1;
              return s2 < e4.length;
            }
            for (; s2 < e4.length; ) {
              for (t3 = s2, i2 = false; c2(); ) if ("," === (r3 = e4.charAt(s2))) {
                for (n3 = s2, s2 += 1, c2(), a3 = s2; s2 < e4.length && "=" !== (r3 = e4.charAt(s2)) && ";" !== r3 && "," !== r3; ) s2 += 1;
                s2 < e4.length && "=" === e4.charAt(s2) ? (i2 = true, s2 = a3, o2.push(e4.substring(t3, n3)), t3 = s2) : s2 = n3 + 1;
              } else s2 += 1;
              (!i2 || s2 >= e4.length) && o2.push(e4.substring(t3, e4.length));
            }
            return o2;
          }(a2)) {
            const t3 = h(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, a2 = this._parsed;
          return a2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...n2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = u(r3);
              t3.append("set-cookie", e4);
            }
          }(a2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(u).join("; ");
        }
      };
    }, 234144, 726430, 757841, 265664, (e) => {
      "use strict";
      let t = "nxtP", r = "nxtI", n = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function a(e2) {
        let t2 = new Headers();
        for (let [r2, n2] of Object.entries(e2)) for (let e3 of Array.isArray(n2) ? n2 : [n2]) void 0 !== e3 && ("number" == typeof e3 && (e3 = e3.toString()), t2.append(r2, e3));
        return t2;
      }
      function i(e2) {
        var t2, r2, n2, a2, i2, o2 = [], s2 = 0;
        function c2() {
          for (; s2 < e2.length && /\s/.test(e2.charAt(s2)); ) s2 += 1;
          return s2 < e2.length;
        }
        for (; s2 < e2.length; ) {
          for (t2 = s2, i2 = false; c2(); ) if ("," === (r2 = e2.charAt(s2))) {
            for (n2 = s2, s2 += 1, c2(), a2 = s2; s2 < e2.length && "=" !== (r2 = e2.charAt(s2)) && ";" !== r2 && "," !== r2; ) s2 += 1;
            s2 < e2.length && "=" === e2.charAt(s2) ? (i2 = true, s2 = a2, o2.push(e2.substring(t2, n2)), t2 = s2) : s2 = n2 + 1;
          } else s2 += 1;
          (!i2 || s2 >= e2.length) && o2.push(e2.substring(t2, e2.length));
        }
        return o2;
      }
      function o(e2) {
        let t2 = {}, r2 = [];
        if (e2) for (let [n2, a2] of e2.entries()) "set-cookie" === n2.toLowerCase() ? (r2.push(...i(a2)), t2[n2] = 1 === r2.length ? r2[0] : r2) : t2[n2] = a2;
        return t2;
      }
      function s(e2) {
        try {
          return String(new URL(String(e2)));
        } catch (t2) {
          throw Object.defineProperty(Error(`URL is malformed "${String(e2)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t2 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      function c(e2) {
        for (let n2 of [t, r]) if (e2 !== n2 && e2.startsWith(n2)) return e2.substring(n2.length);
        return null;
      }
      function l(e2) {
        return e2.replace(/\/$/, "") || "/";
      }
      function u(e2) {
        let t2 = e2.indexOf("#"), r2 = e2.indexOf("?"), n2 = r2 > -1 && (t2 < 0 || r2 < t2);
        return n2 || t2 > -1 ? { pathname: e2.substring(0, n2 ? r2 : t2), query: n2 ? e2.substring(r2, t2 > -1 ? t2 : void 0) : "", hash: t2 > -1 ? e2.slice(t2) : "" } : { pathname: e2, query: "", hash: "" };
      }
      function d(e2, t2) {
        if (!e2.startsWith("/") || !t2) return e2;
        let { pathname: r2, query: n2, hash: a2 } = u(e2);
        return `${t2}${r2}${n2}${a2}`;
      }
      function h(e2, t2) {
        if (!e2.startsWith("/") || !t2) return e2;
        let { pathname: r2, query: n2, hash: a2 } = u(e2);
        return `${r2}${t2}${n2}${a2}`;
      }
      function p(e2, t2) {
        if ("string" != typeof e2) return false;
        let { pathname: r2 } = u(e2);
        return r2 === t2 || r2.startsWith(t2 + "/");
      }
      n.reactServerComponents, n.actionBrowser, n.reactServerComponents, n.actionBrowser, n.instrument, n.middleware, n.apiNode, n.apiEdge, n.serverSideRendering, n.appPagesBrowser, n.reactServerComponents, n.actionBrowser, n.serverSideRendering, n.appPagesBrowser, n.shared, n.instrument, n.middleware, n.reactServerComponents, n.serverSideRendering, n.appPagesBrowser, n.actionBrowser, e.s(["NEXT_CACHE_IMPLICIT_TAG_ID", 0, "_N_T_", "NEXT_INTERCEPTION_MARKER_PREFIX", 0, r, "NEXT_QUERY_PARAM_PREFIX", 0, t, "PRERENDER_REVALIDATE_HEADER", 0, "x-prerender-revalidate", "PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER", 0, "x-prerender-revalidate-if-generated"], 726430), e.s(["fromNodeOutgoingHttpHeaders", () => a, "normalizeNextQueryParam", () => c, "splitCookiesString", () => i, "toNodeOutgoingHttpHeaders", () => o, "validateURL", () => s], 234144);
      let f = /* @__PURE__ */ new WeakMap();
      function g(e2, t2) {
        let r2;
        if (!t2) return { pathname: e2 };
        let n2 = f.get(t2);
        n2 || (n2 = t2.map((e3) => e3.toLowerCase()), f.set(t2, n2));
        let a2 = e2.split("/", 2);
        if (!a2[1]) return { pathname: e2 };
        let i2 = a2[1].toLowerCase(), o2 = n2.indexOf(i2);
        return o2 < 0 ? { pathname: e2 } : (r2 = t2[o2], { pathname: e2 = e2.slice(r2.length + 1) || "/", detectedLocale: r2 });
      }
      let y = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function m(e2, t2) {
        return new URL(String(e2).replace(y, "localhost"), t2 && String(t2).replace(y, "localhost"));
      }
      let w = Symbol("NextURLInternal");
      class b {
        constructor(e2, t2, r2) {
          let n2, a2;
          "object" == typeof t2 && "pathname" in t2 || "string" == typeof t2 ? (n2 = t2, a2 = r2 || {}) : a2 = r2 || t2 || {}, this[w] = { url: m(e2, n2 ?? a2.base), options: a2, basePath: "" }, this.analyze();
        }
        analyze() {
          var e2, t2, r2, n2, a2;
          let i2 = function(e3, t3) {
            let { basePath: r3, i18n: n3, trailingSlash: a3 } = t3.nextConfig ?? {}, i3 = { pathname: e3, trailingSlash: "/" !== e3 ? e3.endsWith("/") : a3 };
            r3 && p(i3.pathname, r3) && (i3.pathname = function(e4, t4) {
              if (!p(e4, t4)) return e4;
              let r4 = e4.slice(t4.length);
              return r4.startsWith("/") ? r4 : `/${r4}`;
            }(i3.pathname, r3), i3.basePath = r3);
            let o3 = i3.pathname;
            if (i3.pathname.startsWith("/_next/data/") && i3.pathname.endsWith(".json")) {
              let e4 = i3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              i3.buildId = e4[0], o3 = "index" !== e4[1] ? `/${e4.slice(1).join("/")}` : "/", true === t3.parseData && (i3.pathname = o3);
            }
            if (n3) {
              let e4 = t3.i18nProvider ? t3.i18nProvider.analyze(i3.pathname) : g(i3.pathname, n3.locales);
              i3.locale = e4.detectedLocale, i3.pathname = e4.pathname ?? i3.pathname, !e4.detectedLocale && i3.buildId && (e4 = t3.i18nProvider ? t3.i18nProvider.analyze(o3) : g(o3, n3.locales)).detectedLocale && (i3.locale = e4.detectedLocale);
            }
            return i3;
          }(this[w].url.pathname, { nextConfig: this[w].options.nextConfig, parseData: true, i18nProvider: this[w].options.i18nProvider }), o2 = function(e3, t3) {
            let r3;
            if (t3?.host && !Array.isArray(t3.host)) r3 = t3.host.toString().split(":", 1)[0];
            else {
              if (!e3.hostname) return;
              r3 = e3.hostname;
            }
            return r3.toLowerCase();
          }(this[w].url, this[w].options.headers);
          this[w].domainLocale = this[w].options.i18nProvider ? this[w].options.i18nProvider.detectDomainLocale(o2) : function(e3, t3, r3) {
            if (e3) {
              for (let n3 of (r3 && (r3 = r3.toLowerCase()), e3)) if (t3 === n3.domain?.split(":", 1)[0].toLowerCase() || r3 === n3.defaultLocale.toLowerCase() || n3.locales?.some((e4) => e4.toLowerCase() === r3)) return n3;
            }
          }(null == (t2 = this[w].options.nextConfig) || null == (e2 = t2.i18n) ? void 0 : e2.domains, o2);
          let s2 = (null == (r2 = this[w].domainLocale) ? void 0 : r2.defaultLocale) || (null == (a2 = this[w].options.nextConfig) || null == (n2 = a2.i18n) ? void 0 : n2.defaultLocale);
          this[w].url.pathname = i2.pathname, this[w].defaultLocale = s2, this[w].basePath = i2.basePath ?? "", this[w].buildId = i2.buildId, this[w].locale = i2.locale ?? s2, this[w].trailingSlash = i2.trailingSlash;
        }
        formatPathname() {
          var e2;
          let t2;
          return t2 = function(e3, t3, r2, n2) {
            if (!t3 || t3 === r2) return e3;
            let a2 = e3.toLowerCase();
            return !n2 && (p(a2, "/api") || p(a2, `/${t3.toLowerCase()}`)) ? e3 : d(e3, `/${t3}`);
          }((e2 = { basePath: this[w].basePath, buildId: this[w].buildId, defaultLocale: this[w].options.forceLocale ? void 0 : this[w].defaultLocale, locale: this[w].locale, pathname: this[w].url.pathname, trailingSlash: this[w].trailingSlash }).pathname, e2.locale, e2.buildId ? void 0 : e2.defaultLocale, e2.ignorePrefix), (e2.buildId || !e2.trailingSlash) && (t2 = l(t2)), e2.buildId && (t2 = h(d(t2, `/_next/data/${e2.buildId}`), "/" === e2.pathname ? "index.json" : ".json")), t2 = d(t2, e2.basePath), !e2.buildId && e2.trailingSlash ? t2.endsWith("/") ? t2 : h(t2, "/") : l(t2);
        }
        formatSearch() {
          return this[w].url.search;
        }
        get buildId() {
          return this[w].buildId;
        }
        set buildId(e2) {
          this[w].buildId = e2;
        }
        get locale() {
          return this[w].locale ?? "";
        }
        set locale(e2) {
          var t2, r2;
          if (!this[w].locale || !(null == (r2 = this[w].options.nextConfig) || null == (t2 = r2.i18n) ? void 0 : t2.locales.includes(e2))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${e2}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[w].locale = e2;
        }
        get defaultLocale() {
          return this[w].defaultLocale;
        }
        get domainLocale() {
          return this[w].domainLocale;
        }
        get searchParams() {
          return this[w].url.searchParams;
        }
        get host() {
          return this[w].url.host;
        }
        set host(e2) {
          this[w].url.host = e2;
        }
        get hostname() {
          return this[w].url.hostname;
        }
        set hostname(e2) {
          this[w].url.hostname = e2;
        }
        get port() {
          return this[w].url.port;
        }
        set port(e2) {
          this[w].url.port = e2;
        }
        get protocol() {
          return this[w].url.protocol;
        }
        set protocol(e2) {
          this[w].url.protocol = e2;
        }
        get href() {
          let e2 = this.formatPathname(), t2 = this.formatSearch();
          return `${this.protocol}//${this.host}${e2}${t2}${this.hash}`;
        }
        set href(e2) {
          this[w].url = m(e2), this.analyze();
        }
        get origin() {
          return this[w].url.origin;
        }
        get pathname() {
          return this[w].url.pathname;
        }
        set pathname(e2) {
          this[w].url.pathname = e2;
        }
        get hash() {
          return this[w].url.hash;
        }
        set hash(e2) {
          this[w].url.hash = e2;
        }
        get search() {
          return this[w].url.search;
        }
        set search(e2) {
          this[w].url.search = e2;
        }
        get password() {
          return this[w].url.password;
        }
        set password(e2) {
          this[w].url.password = e2;
        }
        get username() {
          return this[w].url.username;
        }
        set username(e2) {
          this[w].url.username = e2;
        }
        get basePath() {
          return this[w].basePath;
        }
        set basePath(e2) {
          this[w].basePath = e2.startsWith("/") ? e2 : `/${e2}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new b(String(this), this[w].options);
        }
      }
      e.s(["NextURL", () => b], 757841), e.i(828042), e.s([], 265664);
    }, 823407, 44655, (e) => {
      "use strict";
      class t extends Error {
        constructor({ page: e2 }) {
          super(`The middleware "${e2}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class r extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class n extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      e.s(["PageSignatureError", () => t, "RemovedPageError", () => r, "RemovedUAError", () => n], 823407);
      var a = e.i(757841), i = e.i(234144);
      e.i(265664);
      var o = e.i(828042);
      let s = Symbol("internal request");
      class c extends Request {
        constructor(e2, t2 = {}) {
          const r2 = "string" != typeof e2 && "url" in e2 ? e2.url : String(e2);
          (0, i.validateURL)(r2), e2 instanceof Request ? super(e2, t2) : super(r2, t2);
          const n2 = new a.NextURL(r2, { headers: (0, i.toNodeOutgoingHttpHeaders)(this.headers), nextConfig: t2.nextConfig });
          this[s] = { cookies: new o.RequestCookies(this.headers), nextUrl: n2, url: n2.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[s].cookies;
        }
        get nextUrl() {
          return this[s].nextUrl;
        }
        get page() {
          throw new r();
        }
        get ua() {
          throw new n();
        }
        get url() {
          return this[s].url;
        }
      }
      e.s(["INTERNALS", 0, s, "NextRequest", () => c], 44655);
    }, 180233, 17536, (e) => {
      "use strict";
      e.i(265664);
      var t = e.i(828042), r = e.i(757841), n = e.i(234144);
      class a {
        static get(e2, t2, r2) {
          let n2 = Reflect.get(e2, t2, r2);
          return "function" == typeof n2 ? n2.bind(e2) : n2;
        }
        static set(e2, t2, r2, n2) {
          return Reflect.set(e2, t2, r2, n2);
        }
        static has(e2, t2) {
          return Reflect.has(e2, t2);
        }
        static deleteProperty(e2, t2) {
          return Reflect.deleteProperty(e2, t2);
        }
      }
      e.s(["ReflectAdapter", () => a], 17536);
      let i = Symbol("internal response"), o = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function s(e2, t2) {
        var r2;
        if (null == e2 || null == (r2 = e2.request) ? void 0 : r2.headers) {
          if (!(e2.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          let r3 = [];
          for (let [n2, a2] of e2.request.headers) t2.set("x-middleware-request-" + n2, a2), r3.push(n2);
          t2.set("x-middleware-override-headers", r3.join(","));
        }
      }
      class c extends Response {
        constructor(e2, o2 = {}) {
          super(e2, o2);
          const c2 = this.headers, l = new Proxy(new t.ResponseCookies(c2), { get(e3, r2, n2) {
            switch (r2) {
              case "delete":
              case "set":
                return (...n3) => {
                  let a2 = Reflect.apply(e3[r2], e3, n3), i2 = new Headers(c2);
                  return a2 instanceof t.ResponseCookies && c2.set("x-middleware-set-cookie", a2.getAll().map((e4) => (0, t.stringifyCookie)(e4)).join(",")), s(o2, i2), a2;
                };
              default:
                return a.get(e3, r2, n2);
            }
          } });
          this[i] = { cookies: l, url: o2.url ? new r.NextURL(o2.url, { headers: (0, n.toNodeOutgoingHttpHeaders)(c2), nextConfig: o2.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[i].cookies;
        }
        static json(e2, t2) {
          let r2 = Response.json(e2, t2);
          return new c(r2.body, r2);
        }
        static redirect(e2, t2) {
          let r2 = "number" == typeof t2 ? t2 : (null == t2 ? void 0 : t2.status) ?? 307;
          if (!o.has(r2)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          let a2 = "object" == typeof t2 ? t2 : {}, i2 = new Headers(null == a2 ? void 0 : a2.headers);
          return i2.set("Location", (0, n.validateURL)(e2)), new c(null, { ...a2, headers: i2, status: r2 });
        }
        static rewrite(e2, t2) {
          let r2 = new Headers(null == t2 ? void 0 : t2.headers);
          return r2.set("x-middleware-rewrite", (0, n.validateURL)(e2)), s(t2, r2), new c(null, { ...t2, headers: r2 });
        }
        static next(e2) {
          let t2 = new Headers(null == e2 ? void 0 : e2.headers);
          return t2.set("x-middleware-next", "1"), s(e2, t2), new c(null, { ...e2, headers: t2 });
        }
      }
      e.s(["NextResponse", () => c], 180233);
    }, 407754, 290044, 290460, (e) => {
      "use strict";
      let t = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class r {
        disable() {
          throw t;
        }
        getStore() {
        }
        run() {
          throw t;
        }
        exit() {
          throw t;
        }
        enterWith() {
          throw t;
        }
        static bind(e2) {
          return e2;
        }
      }
      let n = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function a() {
        return n ? new n() : new r();
      }
      function i(e2) {
        return n ? n.bind(e2) : r.bind(e2);
      }
      function o() {
        return n ? n.snapshot() : function(e2, ...t2) {
          return e2(...t2);
        };
      }
      e.s(["bindSnapshot", () => i, "createAsyncLocalStorage", () => a, "createSnapshot", () => o], 290044);
      let s = a();
      e.s([], 407754), e.s(["workAsyncStorage", 0, s], 290460);
    }, 459110, (e, t, r) => {
      (() => {
        "use strict";
        let r2, n, a, i, o;
        var s, c, l, u, d, h, p, f, g, y, m, w, b, _, v, E, S = { 491: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ContextAPI = void 0;
          let n2 = r3(223), a2 = r3(172), i2 = r3(930), o2 = "context", s2 = new n2.NoopContextManager();
          class c2 {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new c2()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, a2.registerGlobal)(o2, e3, i2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t3, r4, ...n3) {
              return this._getContextManager().with(e3, t3, r4, ...n3);
            }
            bind(e3, t3) {
              return this._getContextManager().bind(e3, t3);
            }
            _getContextManager() {
              return (0, a2.getGlobal)(o2) || s2;
            }
            disable() {
              this._getContextManager().disable(), (0, a2.unregisterGlobal)(o2, i2.DiagAPI.instance());
            }
          }
          t2.ContextAPI = c2;
        }, 930: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagAPI = void 0;
          let n2 = r3(56), a2 = r3(912), i2 = r3(957), o2 = r3(172);
          class s2 {
            constructor() {
              function e3(e4) {
                return function(...t4) {
                  let r4 = (0, o2.getGlobal)("diag");
                  if (r4) return r4[e4](...t4);
                };
              }
              const t3 = this;
              t3.setLogger = (e4, r4 = { logLevel: i2.DiagLogLevel.INFO }) => {
                var n3, s3, c2;
                if (e4 === t3) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t3.error(null != (n3 = e5.stack) ? n3 : e5.message), false;
                }
                "number" == typeof r4 && (r4 = { logLevel: r4 });
                let l2 = (0, o2.getGlobal)("diag"), u2 = (0, a2.createLogLevelDiagLogger)(null != (s3 = r4.logLevel) ? s3 : i2.DiagLogLevel.INFO, e4);
                if (l2 && !r4.suppressOverrideMessage) {
                  let e5 = null != (c2 = Error().stack) ? c2 : "<failed to generate stacktrace>";
                  l2.warn(`Current logger will be overwritten from ${e5}`), u2.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, o2.registerGlobal)("diag", u2, t3, true);
              }, t3.disable = () => {
                (0, o2.unregisterGlobal)("diag", t3);
              }, t3.createComponentLogger = (e4) => new n2.DiagComponentLogger(e4), t3.verbose = e3("verbose"), t3.debug = e3("debug"), t3.info = e3("info"), t3.warn = e3("warn"), t3.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new s2()), this._instance;
            }
          }
          t2.DiagAPI = s2;
        }, 653: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.MetricsAPI = void 0;
          let n2 = r3(660), a2 = r3(172), i2 = r3(930), o2 = "metrics";
          class s2 {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new s2()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, a2.registerGlobal)(o2, e3, i2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, a2.getGlobal)(o2) || n2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t3, r4) {
              return this.getMeterProvider().getMeter(e3, t3, r4);
            }
            disable() {
              (0, a2.unregisterGlobal)(o2, i2.DiagAPI.instance());
            }
          }
          t2.MetricsAPI = s2;
        }, 181: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.PropagationAPI = void 0;
          let n2 = r3(172), a2 = r3(874), i2 = r3(194), o2 = r3(277), s2 = r3(369), c2 = r3(930), l2 = "propagation", u2 = new a2.NoopTextMapPropagator();
          class d2 {
            constructor() {
              this.createBaggage = s2.createBaggage, this.getBaggage = o2.getBaggage, this.getActiveBaggage = o2.getActiveBaggage, this.setBaggage = o2.setBaggage, this.deleteBaggage = o2.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new d2()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, n2.registerGlobal)(l2, e3, c2.DiagAPI.instance());
            }
            inject(e3, t3, r4 = i2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t3, r4);
            }
            extract(e3, t3, r4 = i2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t3, r4);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, n2.unregisterGlobal)(l2, c2.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, n2.getGlobal)(l2) || u2;
            }
          }
          t2.PropagationAPI = d2;
        }, 997: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceAPI = void 0;
          let n2 = r3(172), a2 = r3(846), i2 = r3(139), o2 = r3(607), s2 = r3(930), c2 = "trace";
          class l2 {
            constructor() {
              this._proxyTracerProvider = new a2.ProxyTracerProvider(), this.wrapSpanContext = i2.wrapSpanContext, this.isSpanContextValid = i2.isSpanContextValid, this.deleteSpan = o2.deleteSpan, this.getSpan = o2.getSpan, this.getActiveSpan = o2.getActiveSpan, this.getSpanContext = o2.getSpanContext, this.setSpan = o2.setSpan, this.setSpanContext = o2.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new l2()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t3 = (0, n2.registerGlobal)(c2, this._proxyTracerProvider, s2.DiagAPI.instance());
              return t3 && this._proxyTracerProvider.setDelegate(e3), t3;
            }
            getTracerProvider() {
              return (0, n2.getGlobal)(c2) || this._proxyTracerProvider;
            }
            getTracer(e3, t3) {
              return this.getTracerProvider().getTracer(e3, t3);
            }
            disable() {
              (0, n2.unregisterGlobal)(c2, s2.DiagAPI.instance()), this._proxyTracerProvider = new a2.ProxyTracerProvider();
            }
          }
          t2.TraceAPI = l2;
        }, 277: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.deleteBaggage = t2.setBaggage = t2.getActiveBaggage = t2.getBaggage = void 0;
          let n2 = r3(491), a2 = (0, r3(780).createContextKey)("OpenTelemetry Baggage Key");
          function i2(e3) {
            return e3.getValue(a2) || void 0;
          }
          t2.getBaggage = i2, t2.getActiveBaggage = function() {
            return i2(n2.ContextAPI.getInstance().active());
          }, t2.setBaggage = function(e3, t3) {
            return e3.setValue(a2, t3);
          }, t2.deleteBaggage = function(e3) {
            return e3.deleteValue(a2);
          };
        }, 993: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BaggageImpl = void 0;
          class r3 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t3 = this._entries.get(e3);
              if (t3) return Object.assign({}, t3);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t3]) => [e3, t3]);
            }
            setEntry(e3, t3) {
              let n2 = new r3(this._entries);
              return n2._entries.set(e3, t3), n2;
            }
            removeEntry(e3) {
              let t3 = new r3(this._entries);
              return t3._entries.delete(e3), t3;
            }
            removeEntries(...e3) {
              let t3 = new r3(this._entries);
              for (let r4 of e3) t3._entries.delete(r4);
              return t3;
            }
            clear() {
              return new r3();
            }
          }
          t2.BaggageImpl = r3;
        }, 830: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataSymbol = void 0, t2.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataFromString = t2.createBaggage = void 0;
          let n2 = r3(930), a2 = r3(993), i2 = r3(830), o2 = n2.DiagAPI.instance();
          t2.createBaggage = function(e3 = {}) {
            return new a2.BaggageImpl(new Map(Object.entries(e3)));
          }, t2.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (o2.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: i2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.context = void 0, t2.context = r3(491).ContextAPI.getInstance();
        }, 223: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopContextManager = void 0;
          let n2 = r3(780);
          t2.NoopContextManager = class {
            active() {
              return n2.ROOT_CONTEXT;
            }
            with(e3, t3, r4, ...n3) {
              return t3.call(r4, ...n3);
            }
            bind(e3, t3) {
              return t3;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          };
        }, 780: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ROOT_CONTEXT = t2.createContextKey = void 0, t2.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r3 {
            constructor(e3) {
              const t3 = this;
              t3._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t3.getValue = (e4) => t3._currentContext.get(e4), t3.setValue = (e4, n2) => {
                let a2 = new r3(t3._currentContext);
                return a2._currentContext.set(e4, n2), a2;
              }, t3.deleteValue = (e4) => {
                let n2 = new r3(t3._currentContext);
                return n2._currentContext.delete(e4), n2;
              };
            }
          }
          t2.ROOT_CONTEXT = new r3();
        }, 506: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.diag = void 0, t2.diag = r3(930).DiagAPI.instance();
        }, 56: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagComponentLogger = void 0;
          let n2 = r3(172);
          function a2(e3, t3, r4) {
            let a3 = (0, n2.getGlobal)("diag");
            if (a3) return r4.unshift(t3), a3[e3](...r4);
          }
          t2.DiagComponentLogger = class {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return a2("debug", this._namespace, e3);
            }
            error(...e3) {
              return a2("error", this._namespace, e3);
            }
            info(...e3) {
              return a2("info", this._namespace, e3);
            }
            warn(...e3) {
              return a2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return a2("verbose", this._namespace, e3);
            }
          };
        }, 972: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagConsoleLogger = void 0;
          let r3 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          t2.DiagConsoleLogger = class {
            constructor() {
              for (let e3 = 0; e3 < r3.length; e3++) this[r3[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t3) {
                  if (console) {
                    let r4 = console[e4];
                    if ("function" != typeof r4 && (r4 = console.log), "function" == typeof r4) return r4.apply(console, t3);
                  }
                };
              }(r3[e3].c);
            }
          };
        }, 912: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createLogLevelDiagLogger = void 0;
          let n2 = r3(957);
          t2.createLogLevelDiagLogger = function(e3, t3) {
            function r4(r5, n3) {
              let a2 = t3[r5];
              return "function" == typeof a2 && e3 >= n3 ? a2.bind(t3) : function() {
              };
            }
            return e3 < n2.DiagLogLevel.NONE ? e3 = n2.DiagLogLevel.NONE : e3 > n2.DiagLogLevel.ALL && (e3 = n2.DiagLogLevel.ALL), t3 = t3 || {}, { error: r4("error", n2.DiagLogLevel.ERROR), warn: r4("warn", n2.DiagLogLevel.WARN), info: r4("info", n2.DiagLogLevel.INFO), debug: r4("debug", n2.DiagLogLevel.DEBUG), verbose: r4("verbose", n2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagLogLevel = void 0, (r3 = t2.DiagLogLevel || (t2.DiagLogLevel = {}))[r3.NONE = 0] = "NONE", r3[r3.ERROR = 30] = "ERROR", r3[r3.WARN = 50] = "WARN", r3[r3.INFO = 60] = "INFO", r3[r3.DEBUG = 70] = "DEBUG", r3[r3.VERBOSE = 80] = "VERBOSE", r3[r3.ALL = 9999] = "ALL";
        }, 172: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.unregisterGlobal = t2.getGlobal = t2.registerGlobal = void 0;
          let n2 = r3(200), a2 = r3(521), i2 = r3(130), o2 = a2.VERSION.split(".")[0], s2 = Symbol.for(`opentelemetry.js.api.${o2}`), c2 = n2._globalThis;
          t2.registerGlobal = function(e3, t3, r4, n3 = false) {
            var i3;
            let o3 = c2[s2] = null != (i3 = c2[s2]) ? i3 : { version: a2.VERSION };
            if (!n3 && o3[e3]) {
              let t4 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r4.error(t4.stack || t4.message), false;
            }
            if (o3.version !== a2.VERSION) {
              let t4 = Error(`@opentelemetry/api: Registration of version v${o3.version} for ${e3} does not match previously registered API v${a2.VERSION}`);
              return r4.error(t4.stack || t4.message), false;
            }
            return o3[e3] = t3, r4.debug(`@opentelemetry/api: Registered a global for ${e3} v${a2.VERSION}.`), true;
          }, t2.getGlobal = function(e3) {
            var t3, r4;
            let n3 = null == (t3 = c2[s2]) ? void 0 : t3.version;
            if (n3 && (0, i2.isCompatible)(n3)) return null == (r4 = c2[s2]) ? void 0 : r4[e3];
          }, t2.unregisterGlobal = function(e3, t3) {
            t3.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${a2.VERSION}.`);
            let r4 = c2[s2];
            r4 && delete r4[e3];
          };
        }, 130: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.isCompatible = t2._makeCompatibilityCheck = void 0;
          let n2 = r3(521), a2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function i2(e3) {
            let t3 = /* @__PURE__ */ new Set([e3]), r4 = /* @__PURE__ */ new Set(), n3 = e3.match(a2);
            if (!n3) return () => false;
            let i3 = { major: +n3[1], minor: +n3[2], patch: +n3[3], prerelease: n3[4] };
            if (null != i3.prerelease) return function(t4) {
              return t4 === e3;
            };
            function o2(e4) {
              return r4.add(e4), false;
            }
            return function(e4) {
              if (t3.has(e4)) return true;
              if (r4.has(e4)) return false;
              let n4 = e4.match(a2);
              if (!n4) return o2(e4);
              let s2 = { major: +n4[1], minor: +n4[2], patch: +n4[3], prerelease: n4[4] };
              if (null != s2.prerelease || i3.major !== s2.major) return o2(e4);
              if (0 === i3.major) return i3.minor === s2.minor && i3.patch <= s2.patch ? (t3.add(e4), true) : o2(e4);
              return i3.minor <= s2.minor ? (t3.add(e4), true) : o2(e4);
            };
          }
          t2._makeCompatibilityCheck = i2, t2.isCompatible = i2(n2.VERSION);
        }, 886: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.metrics = void 0, t2.metrics = r3(653).MetricsAPI.getInstance();
        }, 901: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ValueType = void 0, (r3 = t2.ValueType || (t2.ValueType = {}))[r3.INT = 0] = "INT", r3[r3.DOUBLE = 1] = "DOUBLE";
        }, 102: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createNoopMeter = t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t2.NOOP_OBSERVABLE_GAUGE_METRIC = t2.NOOP_OBSERVABLE_COUNTER_METRIC = t2.NOOP_UP_DOWN_COUNTER_METRIC = t2.NOOP_HISTOGRAM_METRIC = t2.NOOP_COUNTER_METRIC = t2.NOOP_METER = t2.NoopObservableUpDownCounterMetric = t2.NoopObservableGaugeMetric = t2.NoopObservableCounterMetric = t2.NoopObservableMetric = t2.NoopHistogramMetric = t2.NoopUpDownCounterMetric = t2.NoopCounterMetric = t2.NoopMetric = t2.NoopMeter = void 0;
          class r3 {
            constructor() {
            }
            createHistogram(e3, r4) {
              return t2.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r4) {
              return t2.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r4) {
              return t2.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r4) {
              return t2.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t3) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t2.NoopMeter = r3;
          class n2 {
          }
          t2.NoopMetric = n2;
          class a2 extends n2 {
            add(e3, t3) {
            }
          }
          t2.NoopCounterMetric = a2;
          class i2 extends n2 {
            add(e3, t3) {
            }
          }
          t2.NoopUpDownCounterMetric = i2;
          class o2 extends n2 {
            record(e3, t3) {
            }
          }
          t2.NoopHistogramMetric = o2;
          class s2 {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t2.NoopObservableMetric = s2;
          class c2 extends s2 {
          }
          t2.NoopObservableCounterMetric = c2;
          class l2 extends s2 {
          }
          t2.NoopObservableGaugeMetric = l2;
          class u2 extends s2 {
          }
          t2.NoopObservableUpDownCounterMetric = u2, t2.NOOP_METER = new r3(), t2.NOOP_COUNTER_METRIC = new a2(), t2.NOOP_HISTOGRAM_METRIC = new o2(), t2.NOOP_UP_DOWN_COUNTER_METRIC = new i2(), t2.NOOP_OBSERVABLE_COUNTER_METRIC = new c2(), t2.NOOP_OBSERVABLE_GAUGE_METRIC = new l2(), t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new u2(), t2.createNoopMeter = function() {
            return t2.NOOP_METER;
          };
        }, 660: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NOOP_METER_PROVIDER = t2.NoopMeterProvider = void 0;
          let n2 = r3(102);
          class a2 {
            getMeter(e3, t3, r4) {
              return n2.NOOP_METER;
            }
          }
          t2.NoopMeterProvider = a2, t2.NOOP_METER_PROVIDER = new a2();
        }, 200: function(e2, t2, r3) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), e3[n3] = t3[r4];
          }), a2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || n2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), a2(r3(46), t2);
        }, 651: (t2, r3) => {
          Object.defineProperty(r3, "__esModule", { value: true }), r3._globalThis = void 0, r3._globalThis = "object" == typeof globalThis ? globalThis : e.g;
        }, 46: function(e2, t2, r3) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), e3[n3] = t3[r4];
          }), a2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || n2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), a2(r3(651), t2);
        }, 939: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.propagation = void 0, t2.propagation = r3(181).PropagationAPI.getInstance();
        }, 874: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTextMapPropagator = void 0, t2.NoopTextMapPropagator = class {
            inject(e3, t3) {
            }
            extract(e3, t3) {
              return e3;
            }
            fields() {
              return [];
            }
          };
        }, 194: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.defaultTextMapSetter = t2.defaultTextMapGetter = void 0, t2.defaultTextMapGetter = { get(e3, t3) {
            if (null != e3) return e3[t3];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t2.defaultTextMapSetter = { set(e3, t3, r3) {
            null != e3 && (e3[t3] = r3);
          } };
        }, 845: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.trace = void 0, t2.trace = r3(997).TraceAPI.getInstance();
        }, 403: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NonRecordingSpan = void 0;
          let n2 = r3(476);
          t2.NonRecordingSpan = class {
            constructor(e3 = n2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t3) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t3) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t3) {
            }
          };
        }, 614: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracer = void 0;
          let n2 = r3(491), a2 = r3(607), i2 = r3(403), o2 = r3(139), s2 = n2.ContextAPI.getInstance();
          t2.NoopTracer = class {
            startSpan(e3, t3, r4 = s2.active()) {
              var n3;
              if (null == t3 ? void 0 : t3.root) return new i2.NonRecordingSpan();
              let c2 = r4 && (0, a2.getSpanContext)(r4);
              return "object" == typeof (n3 = c2) && "string" == typeof n3.spanId && "string" == typeof n3.traceId && "number" == typeof n3.traceFlags && (0, o2.isSpanContextValid)(c2) ? new i2.NonRecordingSpan(c2) : new i2.NonRecordingSpan();
            }
            startActiveSpan(e3, t3, r4, n3) {
              let i3, o3, c2;
              if (arguments.length < 2) return;
              2 == arguments.length ? c2 = t3 : 3 == arguments.length ? (i3 = t3, c2 = r4) : (i3 = t3, o3 = r4, c2 = n3);
              let l2 = null != o3 ? o3 : s2.active(), u2 = this.startSpan(e3, i3, l2), d2 = (0, a2.setSpan)(l2, u2);
              return s2.with(d2, c2, void 0, u2);
            }
          };
        }, 124: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracerProvider = void 0;
          let n2 = r3(614);
          t2.NoopTracerProvider = class {
            getTracer(e3, t3, r4) {
              return new n2.NoopTracer();
            }
          };
        }, 125: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracer = void 0;
          let n2 = new (r3(614)).NoopTracer();
          t2.ProxyTracer = class {
            constructor(e3, t3, r4, n3) {
              this._provider = e3, this.name = t3, this.version = r4, this.options = n3;
            }
            startSpan(e3, t3, r4) {
              return this._getTracer().startSpan(e3, t3, r4);
            }
            startActiveSpan(e3, t3, r4, n3) {
              let a2 = this._getTracer();
              return Reflect.apply(a2.startActiveSpan, a2, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : n2;
            }
          };
        }, 846: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracerProvider = void 0;
          let n2 = r3(125), a2 = new (r3(124)).NoopTracerProvider();
          t2.ProxyTracerProvider = class {
            getTracer(e3, t3, r4) {
              var a3;
              return null != (a3 = this.getDelegateTracer(e3, t3, r4)) ? a3 : new n2.ProxyTracer(this, e3, t3, r4);
            }
            getDelegate() {
              var e3;
              return null != (e3 = this._delegate) ? e3 : a2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t3, r4) {
              var n3;
              return null == (n3 = this._delegate) ? void 0 : n3.getTracer(e3, t3, r4);
            }
          };
        }, 996: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SamplingDecision = void 0, (r3 = t2.SamplingDecision || (t2.SamplingDecision = {}))[r3.NOT_RECORD = 0] = "NOT_RECORD", r3[r3.RECORD = 1] = "RECORD", r3[r3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
        }, 607: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.getSpanContext = t2.setSpanContext = t2.deleteSpan = t2.setSpan = t2.getActiveSpan = t2.getSpan = void 0;
          let n2 = r3(780), a2 = r3(403), i2 = r3(491), o2 = (0, n2.createContextKey)("OpenTelemetry Context Key SPAN");
          function s2(e3) {
            return e3.getValue(o2) || void 0;
          }
          function c2(e3, t3) {
            return e3.setValue(o2, t3);
          }
          t2.getSpan = s2, t2.getActiveSpan = function() {
            return s2(i2.ContextAPI.getInstance().active());
          }, t2.setSpan = c2, t2.deleteSpan = function(e3) {
            return e3.deleteValue(o2);
          }, t2.setSpanContext = function(e3, t3) {
            return c2(e3, new a2.NonRecordingSpan(t3));
          }, t2.getSpanContext = function(e3) {
            var t3;
            return null == (t3 = s2(e3)) ? void 0 : t3.spanContext();
          };
        }, 325: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceStateImpl = void 0;
          let n2 = r3(564);
          class a2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t3) {
              let r4 = this._clone();
              return r4._internalState.has(e3) && r4._internalState.delete(e3), r4._internalState.set(e3, t3), r4;
            }
            unset(e3) {
              let t3 = this._clone();
              return t3._internalState.delete(e3), t3;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t3) => (e3.push(t3 + "=" + this.get(t3)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t3) => {
                let r4 = t3.trim(), a3 = r4.indexOf("=");
                if (-1 !== a3) {
                  let i2 = r4.slice(0, a3), o2 = r4.slice(a3 + 1, t3.length);
                  (0, n2.validateKey)(i2) && (0, n2.validateValue)(o2) && e4.set(i2, o2);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new a2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t2.TraceStateImpl = a2;
        }, 564: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.validateValue = t2.validateKey = void 0;
          let r3 = "[_0-9a-z-*/]", n2 = `[a-z]${r3}{0,255}`, a2 = `[a-z0-9]${r3}{0,240}@[a-z]${r3}{0,13}`, i2 = RegExp(`^(?:${n2}|${a2})$`), o2 = /^[ -~]{0,255}[!-~]$/, s2 = /,|=/;
          t2.validateKey = function(e3) {
            return i2.test(e3);
          }, t2.validateValue = function(e3) {
            return o2.test(e3) && !s2.test(e3);
          };
        }, 98: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createTraceState = void 0;
          let n2 = r3(325);
          t2.createTraceState = function(e3) {
            return new n2.TraceStateImpl(e3);
          };
        }, 476: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.INVALID_SPAN_CONTEXT = t2.INVALID_TRACEID = t2.INVALID_SPANID = void 0;
          let n2 = r3(475);
          t2.INVALID_SPANID = "0000000000000000", t2.INVALID_TRACEID = "00000000000000000000000000000000", t2.INVALID_SPAN_CONTEXT = { traceId: t2.INVALID_TRACEID, spanId: t2.INVALID_SPANID, traceFlags: n2.TraceFlags.NONE };
        }, 357: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanKind = void 0, (r3 = t2.SpanKind || (t2.SpanKind = {}))[r3.INTERNAL = 0] = "INTERNAL", r3[r3.SERVER = 1] = "SERVER", r3[r3.CLIENT = 2] = "CLIENT", r3[r3.PRODUCER = 3] = "PRODUCER", r3[r3.CONSUMER = 4] = "CONSUMER";
        }, 139: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.wrapSpanContext = t2.isSpanContextValid = t2.isValidSpanId = t2.isValidTraceId = void 0;
          let n2 = r3(476), a2 = r3(403), i2 = /^([0-9a-f]{32})$/i, o2 = /^[0-9a-f]{16}$/i;
          function s2(e3) {
            return i2.test(e3) && e3 !== n2.INVALID_TRACEID;
          }
          function c2(e3) {
            return o2.test(e3) && e3 !== n2.INVALID_SPANID;
          }
          t2.isValidTraceId = s2, t2.isValidSpanId = c2, t2.isSpanContextValid = function(e3) {
            return s2(e3.traceId) && c2(e3.spanId);
          }, t2.wrapSpanContext = function(e3) {
            return new a2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanStatusCode = void 0, (r3 = t2.SpanStatusCode || (t2.SpanStatusCode = {}))[r3.UNSET = 0] = "UNSET", r3[r3.OK = 1] = "OK", r3[r3.ERROR = 2] = "ERROR";
        }, 475: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceFlags = void 0, (r3 = t2.TraceFlags || (t2.TraceFlags = {}))[r3.NONE = 0] = "NONE", r3[r3.SAMPLED = 1] = "SAMPLED";
        }, 521: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.VERSION = void 0, t2.VERSION = "1.6.0";
        } }, A = {};
        function T(e2) {
          var t2 = A[e2];
          if (void 0 !== t2) return t2.exports;
          var r3 = A[e2] = { exports: {} }, n2 = true;
          try {
            S[e2].call(r3.exports, r3, r3.exports, T), n2 = false;
          } finally {
            n2 && delete A[e2];
          }
          return r3.exports;
        }
        T.ab = "/ROOT/node_modules/next/dist/compiled/@opentelemetry/api/";
        var P = {};
        Object.defineProperty(P, "__esModule", { value: true }), P.trace = P.propagation = P.metrics = P.diag = P.context = P.INVALID_SPAN_CONTEXT = P.INVALID_TRACEID = P.INVALID_SPANID = P.isValidSpanId = P.isValidTraceId = P.isSpanContextValid = P.createTraceState = P.TraceFlags = P.SpanStatusCode = P.SpanKind = P.SamplingDecision = P.ProxyTracerProvider = P.ProxyTracer = P.defaultTextMapSetter = P.defaultTextMapGetter = P.ValueType = P.createNoopMeter = P.DiagLogLevel = P.DiagConsoleLogger = P.ROOT_CONTEXT = P.createContextKey = P.baggageEntryMetadataFromString = void 0, s = T(369), Object.defineProperty(P, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
          return s.baggageEntryMetadataFromString;
        } }), c = T(780), Object.defineProperty(P, "createContextKey", { enumerable: true, get: function() {
          return c.createContextKey;
        } }), Object.defineProperty(P, "ROOT_CONTEXT", { enumerable: true, get: function() {
          return c.ROOT_CONTEXT;
        } }), l = T(972), Object.defineProperty(P, "DiagConsoleLogger", { enumerable: true, get: function() {
          return l.DiagConsoleLogger;
        } }), u = T(957), Object.defineProperty(P, "DiagLogLevel", { enumerable: true, get: function() {
          return u.DiagLogLevel;
        } }), d = T(102), Object.defineProperty(P, "createNoopMeter", { enumerable: true, get: function() {
          return d.createNoopMeter;
        } }), h = T(901), Object.defineProperty(P, "ValueType", { enumerable: true, get: function() {
          return h.ValueType;
        } }), p = T(194), Object.defineProperty(P, "defaultTextMapGetter", { enumerable: true, get: function() {
          return p.defaultTextMapGetter;
        } }), Object.defineProperty(P, "defaultTextMapSetter", { enumerable: true, get: function() {
          return p.defaultTextMapSetter;
        } }), f = T(125), Object.defineProperty(P, "ProxyTracer", { enumerable: true, get: function() {
          return f.ProxyTracer;
        } }), g = T(846), Object.defineProperty(P, "ProxyTracerProvider", { enumerable: true, get: function() {
          return g.ProxyTracerProvider;
        } }), y = T(996), Object.defineProperty(P, "SamplingDecision", { enumerable: true, get: function() {
          return y.SamplingDecision;
        } }), m = T(357), Object.defineProperty(P, "SpanKind", { enumerable: true, get: function() {
          return m.SpanKind;
        } }), w = T(847), Object.defineProperty(P, "SpanStatusCode", { enumerable: true, get: function() {
          return w.SpanStatusCode;
        } }), b = T(475), Object.defineProperty(P, "TraceFlags", { enumerable: true, get: function() {
          return b.TraceFlags;
        } }), _ = T(98), Object.defineProperty(P, "createTraceState", { enumerable: true, get: function() {
          return _.createTraceState;
        } }), v = T(139), Object.defineProperty(P, "isSpanContextValid", { enumerable: true, get: function() {
          return v.isSpanContextValid;
        } }), Object.defineProperty(P, "isValidTraceId", { enumerable: true, get: function() {
          return v.isValidTraceId;
        } }), Object.defineProperty(P, "isValidSpanId", { enumerable: true, get: function() {
          return v.isValidSpanId;
        } }), E = T(476), Object.defineProperty(P, "INVALID_SPANID", { enumerable: true, get: function() {
          return E.INVALID_SPANID;
        } }), Object.defineProperty(P, "INVALID_TRACEID", { enumerable: true, get: function() {
          return E.INVALID_TRACEID;
        } }), Object.defineProperty(P, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
          return E.INVALID_SPAN_CONTEXT;
        } }), r2 = T(67), Object.defineProperty(P, "context", { enumerable: true, get: function() {
          return r2.context;
        } }), n = T(506), Object.defineProperty(P, "diag", { enumerable: true, get: function() {
          return n.diag;
        } }), a = T(886), Object.defineProperty(P, "metrics", { enumerable: true, get: function() {
          return a.metrics;
        } }), i = T(939), Object.defineProperty(P, "propagation", { enumerable: true, get: function() {
          return i.propagation;
        } }), o = T(845), Object.defineProperty(P, "trace", { enumerable: true, get: function() {
          return o.trace;
        } }), P.default = { context: r2.context, diag: n.diag, metrics: a.metrics, propagation: i.propagation, trace: o.trace }, t.exports = P;
      })();
    }, 871498, (e, t, r) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/cookie/");
        var e2, r2, n, a, i = {};
        i.parse = function(t2, r3) {
          if ("string" != typeof t2) throw TypeError("argument str must be a string");
          for (var a2 = {}, i2 = t2.split(n), o = (r3 || {}).decode || e2, s = 0; s < i2.length; s++) {
            var c = i2[s], l = c.indexOf("=");
            if (!(l < 0)) {
              var u = c.substr(0, l).trim(), d = c.substr(++l, c.length).trim();
              '"' == d[0] && (d = d.slice(1, -1)), void 0 == a2[u] && (a2[u] = function(e3, t3) {
                try {
                  return t3(e3);
                } catch (t4) {
                  return e3;
                }
              }(d, o));
            }
          }
          return a2;
        }, i.serialize = function(e3, t2, n2) {
          var i2 = n2 || {}, o = i2.encode || r2;
          if ("function" != typeof o) throw TypeError("option encode is invalid");
          if (!a.test(e3)) throw TypeError("argument name is invalid");
          var s = o(t2);
          if (s && !a.test(s)) throw TypeError("argument val is invalid");
          var c = e3 + "=" + s;
          if (null != i2.maxAge) {
            var l = i2.maxAge - 0;
            if (isNaN(l) || !isFinite(l)) throw TypeError("option maxAge is invalid");
            c += "; Max-Age=" + Math.floor(l);
          }
          if (i2.domain) {
            if (!a.test(i2.domain)) throw TypeError("option domain is invalid");
            c += "; Domain=" + i2.domain;
          }
          if (i2.path) {
            if (!a.test(i2.path)) throw TypeError("option path is invalid");
            c += "; Path=" + i2.path;
          }
          if (i2.expires) {
            if ("function" != typeof i2.expires.toUTCString) throw TypeError("option expires is invalid");
            c += "; Expires=" + i2.expires.toUTCString();
          }
          if (i2.httpOnly && (c += "; HttpOnly"), i2.secure && (c += "; Secure"), i2.sameSite) switch ("string" == typeof i2.sameSite ? i2.sameSite.toLowerCase() : i2.sameSite) {
            case true:
            case "strict":
              c += "; SameSite=Strict";
              break;
            case "lax":
              c += "; SameSite=Lax";
              break;
            case "none":
              c += "; SameSite=None";
              break;
            default:
              throw TypeError("option sameSite is invalid");
          }
          return c;
        }, e2 = decodeURIComponent, r2 = encodeURIComponent, n = /; */, a = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, t.exports = i;
      })();
    }, 299734, (e, t, r) => {
      (() => {
        "use strict";
        let e2, r2, n, a, i;
        var o = { 993: (e3) => {
          var t2 = Object.prototype.hasOwnProperty, r3 = "~";
          function n2() {
          }
          function a2(e4, t3, r4) {
            this.fn = e4, this.context = t3, this.once = r4 || false;
          }
          function i2(e4, t3, n3, i3, o3) {
            if ("function" != typeof n3) throw TypeError("The listener must be a function");
            var s3 = new a2(n3, i3 || e4, o3), c2 = r3 ? r3 + t3 : t3;
            return e4._events[c2] ? e4._events[c2].fn ? e4._events[c2] = [e4._events[c2], s3] : e4._events[c2].push(s3) : (e4._events[c2] = s3, e4._eventsCount++), e4;
          }
          function o2(e4, t3) {
            0 == --e4._eventsCount ? e4._events = new n2() : delete e4._events[t3];
          }
          function s2() {
            this._events = new n2(), this._eventsCount = 0;
          }
          Object.create && (n2.prototype = /* @__PURE__ */ Object.create(null), new n2().__proto__ || (r3 = false)), s2.prototype.eventNames = function() {
            var e4, n3, a3 = [];
            if (0 === this._eventsCount) return a3;
            for (n3 in e4 = this._events) t2.call(e4, n3) && a3.push(r3 ? n3.slice(1) : n3);
            return Object.getOwnPropertySymbols ? a3.concat(Object.getOwnPropertySymbols(e4)) : a3;
          }, s2.prototype.listeners = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, n3 = this._events[t3];
            if (!n3) return [];
            if (n3.fn) return [n3.fn];
            for (var a3 = 0, i3 = n3.length, o3 = Array(i3); a3 < i3; a3++) o3[a3] = n3[a3].fn;
            return o3;
          }, s2.prototype.listenerCount = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, n3 = this._events[t3];
            return n3 ? n3.fn ? 1 : n3.length : 0;
          }, s2.prototype.emit = function(e4, t3, n3, a3, i3, o3) {
            var s3 = r3 ? r3 + e4 : e4;
            if (!this._events[s3]) return false;
            var c2, l2, u = this._events[s3], d = arguments.length;
            if (u.fn) {
              switch (u.once && this.removeListener(e4, u.fn, void 0, true), d) {
                case 1:
                  return u.fn.call(u.context), true;
                case 2:
                  return u.fn.call(u.context, t3), true;
                case 3:
                  return u.fn.call(u.context, t3, n3), true;
                case 4:
                  return u.fn.call(u.context, t3, n3, a3), true;
                case 5:
                  return u.fn.call(u.context, t3, n3, a3, i3), true;
                case 6:
                  return u.fn.call(u.context, t3, n3, a3, i3, o3), true;
              }
              for (l2 = 1, c2 = Array(d - 1); l2 < d; l2++) c2[l2 - 1] = arguments[l2];
              u.fn.apply(u.context, c2);
            } else {
              var h, p = u.length;
              for (l2 = 0; l2 < p; l2++) switch (u[l2].once && this.removeListener(e4, u[l2].fn, void 0, true), d) {
                case 1:
                  u[l2].fn.call(u[l2].context);
                  break;
                case 2:
                  u[l2].fn.call(u[l2].context, t3);
                  break;
                case 3:
                  u[l2].fn.call(u[l2].context, t3, n3);
                  break;
                case 4:
                  u[l2].fn.call(u[l2].context, t3, n3, a3);
                  break;
                default:
                  if (!c2) for (h = 1, c2 = Array(d - 1); h < d; h++) c2[h - 1] = arguments[h];
                  u[l2].fn.apply(u[l2].context, c2);
              }
            }
            return true;
          }, s2.prototype.on = function(e4, t3, r4) {
            return i2(this, e4, t3, r4, false);
          }, s2.prototype.once = function(e4, t3, r4) {
            return i2(this, e4, t3, r4, true);
          }, s2.prototype.removeListener = function(e4, t3, n3, a3) {
            var i3 = r3 ? r3 + e4 : e4;
            if (!this._events[i3]) return this;
            if (!t3) return o2(this, i3), this;
            var s3 = this._events[i3];
            if (s3.fn) s3.fn !== t3 || a3 && !s3.once || n3 && s3.context !== n3 || o2(this, i3);
            else {
              for (var c2 = 0, l2 = [], u = s3.length; c2 < u; c2++) (s3[c2].fn !== t3 || a3 && !s3[c2].once || n3 && s3[c2].context !== n3) && l2.push(s3[c2]);
              l2.length ? this._events[i3] = 1 === l2.length ? l2[0] : l2 : o2(this, i3);
            }
            return this;
          }, s2.prototype.removeAllListeners = function(e4) {
            var t3;
            return e4 ? (t3 = r3 ? r3 + e4 : e4, this._events[t3] && o2(this, t3)) : (this._events = new n2(), this._eventsCount = 0), this;
          }, s2.prototype.off = s2.prototype.removeListener, s2.prototype.addListener = s2.prototype.on, s2.prefixed = r3, s2.EventEmitter = s2, e3.exports = s2;
        }, 213: (e3) => {
          e3.exports = (e4, t2) => (t2 = t2 || (() => {
          }), e4.then((e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => e5), (e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => {
            throw e5;
          })));
        }, 574: (e3, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e4, t3, r3) {
            let n2 = 0, a2 = e4.length;
            for (; a2 > 0; ) {
              let i2 = a2 / 2 | 0, o2 = n2 + i2;
              0 >= r3(e4[o2], t3) ? (n2 = ++o2, a2 -= i2 + 1) : a2 = i2;
            }
            return n2;
          };
        }, 821: (e3, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let n2 = r3(574);
          t2.default = class {
            constructor() {
              this._queue = [];
            }
            enqueue(e4, t3) {
              let r4 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e4 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) return void this._queue.push(r4);
              let a2 = n2.default(this._queue, r4, (e5, t4) => t4.priority - e5.priority);
              this._queue.splice(a2, 0, r4);
            }
            dequeue() {
              let e4 = this._queue.shift();
              return null == e4 ? void 0 : e4.run;
            }
            filter(e4) {
              return this._queue.filter((t3) => t3.priority === e4.priority).map((e5) => e5.run);
            }
            get size() {
              return this._queue.length;
            }
          };
        }, 816: (e3, t2, r3) => {
          let n2 = r3(213);
          class a2 extends Error {
            constructor(e4) {
              super(e4), this.name = "TimeoutError";
            }
          }
          let i2 = (e4, t3, r4) => new Promise((i3, o2) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) return void i3(e4);
            let s2 = setTimeout(() => {
              if ("function" == typeof r4) {
                try {
                  i3(r4());
                } catch (e5) {
                  o2(e5);
                }
                return;
              }
              let n3 = "string" == typeof r4 ? r4 : `Promise timed out after ${t3} milliseconds`, s3 = r4 instanceof Error ? r4 : new a2(n3);
              "function" == typeof e4.cancel && e4.cancel(), o2(s3);
            }, t3);
            n2(e4.then(i3, o2), () => {
              clearTimeout(s2);
            });
          });
          e3.exports = i2, e3.exports.default = i2, e3.exports.TimeoutError = a2;
        } }, s = {};
        function c(e3) {
          var t2 = s[e3];
          if (void 0 !== t2) return t2.exports;
          var r3 = s[e3] = { exports: {} }, n2 = true;
          try {
            o[e3](r3, r3.exports, c), n2 = false;
          } finally {
            n2 && delete s[e3];
          }
          return r3.exports;
        }
        c.ab = "/ROOT/node_modules/next/dist/compiled/p-queue/";
        var l = {};
        Object.defineProperty(l, "__esModule", { value: true }), e2 = c(993), r2 = c(816), n = c(821), a = () => {
        }, i = new r2.TimeoutError(), l.default = class extends e2 {
          constructor(e3) {
            var t2, r3, i2, o2;
            if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = a, this._resolveIdle = a, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: n.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (r3 = null == (t2 = e3.intervalCap) ? void 0 : t2.toString()) ? r3 : ""}\` (${typeof e3.intervalCap})`);
            if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (o2 = null == (i2 = e3.interval) ? void 0 : i2.toString()) ? o2 : ""}\` (${typeof e3.interval})`);
            this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = e3.intervalCap === 1 / 0 || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
          }
          get _doesIntervalAllowAnother() {
            return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
          }
          get _doesConcurrentAllowAnother() {
            return this._pendingCount < this._concurrency;
          }
          _next() {
            this._pendingCount--, this._tryToStartAnother(), this.emit("next");
          }
          _resolvePromises() {
            this._resolveEmpty(), this._resolveEmpty = a, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = a, this.emit("idle"));
          }
          _onResumeInterval() {
            this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
          }
          _isIntervalPaused() {
            let e3 = Date.now();
            if (void 0 === this._intervalId) {
              let t2 = this._intervalEnd - e3;
              if (!(t2 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                this._onResumeInterval();
              }, t2)), true;
              this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
            }
            return false;
          }
          _tryToStartAnother() {
            if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
            if (!this._isPaused) {
              let e3 = !this._isIntervalPaused();
              if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                let t2 = this._queue.dequeue();
                return !!t2 && (this.emit("active"), t2(), e3 && this._initializeIntervalIfNeeded(), true);
              }
            }
            return false;
          }
          _initializeIntervalIfNeeded() {
            this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
              this._onInterval();
            }, this._interval), this._intervalEnd = Date.now() + this._interval);
          }
          _onInterval() {
            0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
          }
          _processQueue() {
            for (; this._tryToStartAnother(); ) ;
          }
          get concurrency() {
            return this._concurrency;
          }
          set concurrency(e3) {
            if (!("number" == typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
            this._concurrency = e3, this._processQueue();
          }
          async add(e3, t2 = {}) {
            return new Promise((n2, a2) => {
              let o2 = async () => {
                this._pendingCount++, this._intervalCount++;
                try {
                  let o3 = void 0 === this._timeout && void 0 === t2.timeout ? e3() : r2.default(Promise.resolve(e3()), void 0 === t2.timeout ? this._timeout : t2.timeout, () => {
                    (void 0 === t2.throwOnTimeout ? this._throwOnTimeout : t2.throwOnTimeout) && a2(i);
                  });
                  n2(await o3);
                } catch (e4) {
                  a2(e4);
                }
                this._next();
              };
              this._queue.enqueue(o2, t2), this._tryToStartAnother(), this.emit("add");
            });
          }
          async addAll(e3, t2) {
            return Promise.all(e3.map(async (e4) => this.add(e4, t2)));
          }
          start() {
            return this._isPaused && (this._isPaused = false, this._processQueue()), this;
          }
          pause() {
            this._isPaused = true;
          }
          clear() {
            this._queue = new this._queueClass();
          }
          async onEmpty() {
            if (0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveEmpty;
              this._resolveEmpty = () => {
                t2(), e3();
              };
            });
          }
          async onIdle() {
            if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveIdle;
              this._resolveIdle = () => {
                t2(), e3();
              };
            });
          }
          get size() {
            return this._queue.size;
          }
          sizeBy(e3) {
            return this._queue.filter(e3).length;
          }
          get pending() {
            return this._pendingCount;
          }
          get isPaused() {
            return this._isPaused;
          }
          get timeout() {
            return this._timeout;
          }
          set timeout(e3) {
            this._timeout = e3;
          }
        }, t.exports = l;
      })();
    }, 924628, 325753, 153835, 182453, 544789, 269487, (e) => {
      "use strict";
      let t = "next-router-prefetch", r = ["rsc", "next-router-state-tree", t, "next-hmr-refresh", "next-router-segment-prefetch"];
      e.s(["FLIGHT_HEADERS", 0, r, "NEXT_HMR_REFRESH_HASH_COOKIE", 0, "__next_hmr_refresh_hash__", "NEXT_REWRITTEN_PATH_HEADER", 0, "x-nextjs-rewritten-path", "NEXT_REWRITTEN_QUERY_HEADER", 0, "x-nextjs-rewritten-query", "NEXT_ROUTER_PREFETCH_HEADER", 0, t, "NEXT_RSC_UNION_QUERY", 0, "_rsc", "RSC_HEADER", 0, "rsc"], 924628);
      var n = e.i(290044);
      let a = (0, n.createAsyncLocalStorage)();
      class i extends Error {
        constructor(e2, t2) {
          super(`Invariant: ${e2.endsWith(".") ? e2 : e2 + "."} This is a bug in Next.js.`, t2), this.name = "InvariantError";
        }
      }
      function o(e2) {
        throw Object.defineProperty(Error(`\`${e2}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E251", enumerable: false, configurable: true });
      }
      function s(e2) {
        switch (e2.type) {
          case "prerender-runtime":
          case "private-cache":
            return e2.runtimeStagePromise;
          case "prerender":
          case "prerender-client":
          case "prerender-ppr":
          case "prerender-legacy":
          case "request":
          case "cache":
          case "unstable-cache":
            return null;
          default:
            return e2;
        }
      }
      e.s(["InvariantError", () => i], 325753), e.s(["getRuntimeStagePromise", () => s, "throwForMissingRequestStore", () => o], 153835), e.s(["workUnitAsyncStorage", 0, a], 182453);
      let c = (0, n.createAsyncLocalStorage)();
      e.s([], 544789), e.s(["afterTaskAsyncStorage", 0, c], 269487);
    }, 369307, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { getTestReqInfo: function() {
        return c;
      }, withRequest: function() {
        return s;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = new (e.r(478500)).AsyncLocalStorage();
      function o(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        let n2 = t2.url(e2);
        return { url: n2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function s(e2, t2, r2) {
        let n2 = o(e2, t2);
        return n2 ? i.run(n2, r2) : r2();
      }
      function c(e2, t2) {
        let r2 = i.getStore();
        return r2 || (e2 && t2 ? o(e2, t2) : void 0);
      }
    }, 928325, (e, t, r) => {
      "use strict";
      var n = e.i(951615);
      Object.defineProperty(r, "__esModule", { value: true });
      var a = { handleFetch: function() {
        return l;
      }, interceptFetch: function() {
        return u;
      }, reader: function() {
        return s;
      } };
      for (var i in a) Object.defineProperty(r, i, { enumerable: true, get: a[i] });
      let o = e.r(369307), s = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function c(e2, t2) {
        let { url: r2, method: a2, headers: i2, body: o2, cache: s2, credentials: c2, integrity: l2, mode: u2, redirect: d, referrer: h, referrerPolicy: p } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: a2, headers: [...Array.from(i2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: o2 ? n.Buffer.from(await t2.arrayBuffer()).toString("base64") : null, cache: s2, credentials: c2, integrity: l2, mode: u2, redirect: d, referrer: h, referrerPolicy: p } };
      }
      async function l(e2, t2) {
        let r2 = (0, o.getTestReqInfo)(t2, s);
        if (!r2) return e2(t2);
        let { testData: a2, proxyPort: i2 } = r2, l2 = await c(a2, t2), u2 = await e2(`http://localhost:${i2}`, { method: "POST", body: JSON.stringify(l2), next: { internal: true } });
        if (!u2.ok) throw Object.defineProperty(Error(`Proxy request failed: ${u2.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        let d = await u2.json(), { api: h } = d;
        switch (h) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(Error(`Proxy request aborted [${t2.method} ${t2.url}]`), "__NEXT_ERROR_CODE", { value: "E145", enumerable: false, configurable: true });
          case "fetch":
            return function(e3) {
              let { status: t3, headers: r3, body: a3 } = e3.response;
              return new Response(a3 ? n.Buffer.from(a3, "base64") : null, { status: t3, headers: new Headers(r3) });
            }(d);
          default:
            return h;
        }
      }
      function u(t2) {
        return e.g.fetch = function(e2, r2) {
          var n2;
          return (null == r2 || null == (n2 = r2.next) ? void 0 : n2.internal) ? t2(e2, r2) : l(t2, new Request(e2, r2));
        }, () => {
          e.g.fetch = t2;
        };
      }
    }, 494165, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { interceptTestApis: function() {
        return s;
      }, wrapRequestHandler: function() {
        return c;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = e.r(369307), o = e.r(928325);
      function s() {
        return (0, o.interceptFetch)(e.g.fetch);
      }
      function c(e2) {
        return (t2, r2) => (0, i.withRequest)(t2, o.reader, () => e2(t2, r2));
      }
    }, 624272, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { RequestCookies: function() {
        return i.RequestCookies;
      }, ResponseCookies: function() {
        return i.ResponseCookies;
      }, stringifyCookie: function() {
        return i.stringifyCookie;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = e.r(828042);
    }, 158728, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "ReflectAdapter", { enumerable: true, get: function() {
        return n;
      } });
      class n {
        static get(e2, t2, r2) {
          let n2 = Reflect.get(e2, t2, r2);
          return "function" == typeof n2 ? n2.bind(e2) : n2;
        }
        static set(e2, t2, r2, n2) {
          return Reflect.set(e2, t2, r2, n2);
        }
        static has(e2, t2) {
          return Reflect.has(e2, t2);
        }
        static deleteProperty(e2, t2) {
          return Reflect.deleteProperty(e2, t2);
        }
      }
    }, 321420, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { MutableRequestCookiesAdapter: function() {
        return p;
      }, ReadonlyRequestCookiesError: function() {
        return c;
      }, RequestCookiesAdapter: function() {
        return l;
      }, appendMutableCookies: function() {
        return h;
      }, areCookiesMutableInCurrentPhase: function() {
        return g;
      }, createCookiesWithMutableAccessCheck: function() {
        return f;
      }, getModifiedCookieValues: function() {
        return d;
      }, responseCookiesToRequestCookies: function() {
        return m;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = e.r(624272), o = e.r(158728), s = e.r(70590);
      class c extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new c();
        }
      }
      class l {
        static seal(e2) {
          return new Proxy(e2, { get(e3, t2, r2) {
            switch (t2) {
              case "clear":
              case "delete":
              case "set":
                return c.callable;
              default:
                return o.ReflectAdapter.get(e3, t2, r2);
            }
          } });
        }
      }
      let u = Symbol.for("next.mutated.cookies");
      function d(e2) {
        let t2 = e2[u];
        return t2 && Array.isArray(t2) && 0 !== t2.length ? t2 : [];
      }
      function h(e2, t2) {
        let r2 = d(t2);
        if (0 === r2.length) return false;
        let n2 = new i.ResponseCookies(e2), a2 = n2.getAll();
        for (let e3 of r2) n2.set(e3);
        for (let e3 of a2) n2.set(e3);
        return true;
      }
      class p {
        static wrap(e2, t2) {
          let r2 = new i.ResponseCookies(new Headers());
          for (let t3 of e2.getAll()) r2.set(t3);
          let n2 = [], a2 = /* @__PURE__ */ new Set(), c2 = () => {
            let e3 = s.workAsyncStorage.getStore();
            if (e3 && (e3.pathWasRevalidated = true), n2 = r2.getAll().filter((e4) => a2.has(e4.name)), t2) {
              let e4 = [];
              for (let t3 of n2) {
                let r3 = new i.ResponseCookies(new Headers());
                r3.set(t3), e4.push(r3.toString());
              }
              t2(e4);
            }
          }, l2 = new Proxy(r2, { get(e3, t3, r3) {
            switch (t3) {
              case u:
                return n2;
              case "delete":
                return function(...t4) {
                  a2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    return e3.delete(...t4), l2;
                  } finally {
                    c2();
                  }
                };
              case "set":
                return function(...t4) {
                  a2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    return e3.set(...t4), l2;
                  } finally {
                    c2();
                  }
                };
              default:
                return o.ReflectAdapter.get(e3, t3, r3);
            }
          } });
          return l2;
        }
      }
      function f(e2) {
        let t2 = new Proxy(e2.mutableCookies, { get(r2, n2, a2) {
          switch (n2) {
            case "delete":
              return function(...n3) {
                return y(e2, "cookies().delete"), r2.delete(...n3), t2;
              };
            case "set":
              return function(...n3) {
                return y(e2, "cookies().set"), r2.set(...n3), t2;
              };
            default:
              return o.ReflectAdapter.get(r2, n2, a2);
          }
        } });
        return t2;
      }
      function g(e2) {
        return "action" === e2.phase;
      }
      function y(e2, t2) {
        if (!g(e2)) throw new c();
      }
      function m(e2) {
        let t2 = new i.RequestCookies(new Headers());
        for (let r2 of e2.getAll()) t2.set(r2);
        return t2;
      }
    }, 457857, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "createDedupedByCallsiteServerErrorLoggerDev", { enumerable: true, get: function() {
        return c;
      } });
      let n = function(e2, t2) {
        if (e2 && e2.__esModule) return e2;
        if (null === e2 || "object" != typeof e2 && "function" != typeof e2) return { default: e2 };
        var r2 = a(void 0);
        if (r2 && r2.has(e2)) return r2.get(e2);
        var n2 = { __proto__: null }, i2 = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var o2 in e2) if ("default" !== o2 && Object.prototype.hasOwnProperty.call(e2, o2)) {
          var s2 = i2 ? Object.getOwnPropertyDescriptor(e2, o2) : null;
          s2 && (s2.get || s2.set) ? Object.defineProperty(n2, o2, s2) : n2[o2] = e2[o2];
        }
        return n2.default = e2, r2 && r2.set(e2, n2), n2;
      }(e.r(40049));
      function a(e2) {
        if ("function" != typeof WeakMap) return null;
        var t2 = /* @__PURE__ */ new WeakMap(), r2 = /* @__PURE__ */ new WeakMap();
        return (a = function(e3) {
          return e3 ? r2 : t2;
        })(e2);
      }
      let i = { current: null }, o = "function" == typeof n.cache ? n.cache : (e2) => e2, s = console.warn;
      function c(e2) {
        return function(...t2) {
          s(e2(...t2));
        };
      }
      o((e2) => {
        try {
          s(i.current);
        } finally {
          i.current = null;
        }
      });
    }, 721397, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "afterTaskAsyncStorageInstance", { enumerable: true, get: function() {
        return n;
      } });
      let n = (0, e.r(987049).createAsyncLocalStorage)();
    }, 473415, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "afterTaskAsyncStorage", { enumerable: true, get: function() {
        return n.afterTaskAsyncStorageInstance;
      } });
      let n = e.r(721397);
    }, 643821, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { isRequestAPICallableInsideAfter: function() {
        return l;
      }, throwForSearchParamsAccessInUseCache: function() {
        return c;
      }, throwWithStaticGenerationBailoutErrorWithDynamicError: function() {
        return s;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = e.r(796021), o = e.r(473415);
      function s(e2, t2) {
        throw Object.defineProperty(new i.StaticGenBailoutError(`Route ${e2} with \`dynamic = "error"\` couldn't be rendered statically because it used ${t2}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E543", enumerable: false, configurable: true });
      }
      function c(e2, t2) {
        let r2 = Object.defineProperty(Error(`Route ${e2.route} used \`searchParams\` inside "use cache". Accessing dynamic request data inside a cache scope is not supported. If you need some search params inside a cached function await \`searchParams\` outside of the cached function and pass only the required search params as arguments to the cached function. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E842", enumerable: false, configurable: true });
        throw Error.captureStackTrace(r2, t2), e2.invalidDynamicUsageError ??= r2, r2;
      }
      function l() {
        let e2 = o.afterTaskAsyncStorage.getStore();
        return (null == e2 ? void 0 : e2.rootTaskSpawnPhase) === "action";
      }
    }, 140823, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "cookies", { enumerable: true, get: function() {
        return p;
      } });
      let n = e.r(321420), a = e.r(624272), i = e.r(70590), o = e.r(108048), s = e.r(432459), c = e.r(796021), l = e.r(887014), u = e.r(457857), d = e.r(643821), h = e.r(802014);
      function p() {
        let e2 = "cookies", t2 = i.workAsyncStorage.getStore(), r2 = o.workUnitAsyncStorage.getStore();
        if (t2) {
          if (r2 && "after" === r2.phase && !(0, d.isRequestAPICallableInsideAfter)()) throw Object.defineProperty(Error(`Route ${t2.route} used \`cookies()\` inside \`after()\`. This is not supported. If you need this data inside an \`after()\` callback, use \`cookies()\` outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E843", enumerable: false, configurable: true });
          if (t2.forceStatic) return g(n.RequestCookiesAdapter.seal(new a.RequestCookies(new Headers({}))));
          if (t2.dynamicShouldError) throw Object.defineProperty(new c.StaticGenBailoutError(`Route ${t2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`cookies()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E849", enumerable: false, configurable: true });
          if (r2) switch (r2.type) {
            case "cache":
              let i2 = Object.defineProperty(Error(`Route ${t2.route} used \`cookies()\` inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`cookies()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E831", enumerable: false, configurable: true });
              throw Error.captureStackTrace(i2, p), t2.invalidDynamicUsageError ??= i2, i2;
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${t2.route} used \`cookies()\` inside a function cached with \`unstable_cache()\`. Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`cookies()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E846", enumerable: false, configurable: true });
            case "prerender":
              var u2 = t2, y = r2;
              let o2 = f.get(y);
              if (o2) return o2;
              let m = (0, l.makeHangingPromise)(y.renderSignal, u2.route, "`cookies()`");
              return f.set(y, m), m;
            case "prerender-client":
              let w = "`cookies`";
              throw Object.defineProperty(new h.InvariantError(`${w} must not be used within a Client Component. Next.js should be preventing ${w} from being included in Client Components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E832", enumerable: false, configurable: true });
            case "prerender-ppr":
              return (0, s.postponeWithTracking)(t2.route, e2, r2.dynamicTracking);
            case "prerender-legacy":
              return (0, s.throwToInterruptStaticGeneration)(e2, t2, r2);
            case "prerender-runtime":
              return (0, s.delayUntilRuntimeStage)(r2, g(r2.cookies));
            case "private-cache":
              return g(r2.cookies);
            case "request":
              return (0, s.trackDynamicDataInDynamicRender)(r2), g((0, n.areCookiesMutableInCurrentPhase)(r2) ? r2.userspaceMutableCookies : r2.cookies);
          }
        }
        (0, o.throwForMissingRequestStore)(e2);
      }
      e.r(847122);
      let f = /* @__PURE__ */ new WeakMap();
      function g(e2) {
        let t2 = f.get(e2);
        if (t2) return t2;
        let r2 = Promise.resolve(e2);
        return f.set(e2, r2), r2;
      }
      (0, u.createDedupedByCallsiteServerErrorLoggerDev)(function(e2, t2) {
        let r2 = e2 ? `Route "${e2}" ` : "This route ";
        return Object.defineProperty(Error(`${r2}used ${t2}. \`cookies()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E830", enumerable: false, configurable: true });
      });
    }, 559851, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { HeadersAdapter: function() {
        return s;
      }, ReadonlyHeadersError: function() {
        return o;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = e.r(158728);
      class o extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new o();
        }
      }
      class s extends Headers {
        constructor(e2) {
          super(), this.headers = new Proxy(e2, { get(t2, r2, n2) {
            if ("symbol" == typeof r2) return i.ReflectAdapter.get(t2, r2, n2);
            let a2 = r2.toLowerCase(), o2 = Object.keys(e2).find((e3) => e3.toLowerCase() === a2);
            if (void 0 !== o2) return i.ReflectAdapter.get(t2, o2, n2);
          }, set(t2, r2, n2, a2) {
            if ("symbol" == typeof r2) return i.ReflectAdapter.set(t2, r2, n2, a2);
            let o2 = r2.toLowerCase(), s2 = Object.keys(e2).find((e3) => e3.toLowerCase() === o2);
            return i.ReflectAdapter.set(t2, s2 ?? r2, n2, a2);
          }, has(t2, r2) {
            if ("symbol" == typeof r2) return i.ReflectAdapter.has(t2, r2);
            let n2 = r2.toLowerCase(), a2 = Object.keys(e2).find((e3) => e3.toLowerCase() === n2);
            return void 0 !== a2 && i.ReflectAdapter.has(t2, a2);
          }, deleteProperty(t2, r2) {
            if ("symbol" == typeof r2) return i.ReflectAdapter.deleteProperty(t2, r2);
            let n2 = r2.toLowerCase(), a2 = Object.keys(e2).find((e3) => e3.toLowerCase() === n2);
            return void 0 === a2 || i.ReflectAdapter.deleteProperty(t2, a2);
          } });
        }
        static seal(e2) {
          return new Proxy(e2, { get(e3, t2, r2) {
            switch (t2) {
              case "append":
              case "delete":
              case "set":
                return o.callable;
              default:
                return i.ReflectAdapter.get(e3, t2, r2);
            }
          } });
        }
        merge(e2) {
          return Array.isArray(e2) ? e2.join(", ") : e2;
        }
        static from(e2) {
          return e2 instanceof Headers ? e2 : new s(e2);
        }
        append(e2, t2) {
          let r2 = this.headers[e2];
          "string" == typeof r2 ? this.headers[e2] = [r2, t2] : Array.isArray(r2) ? r2.push(t2) : this.headers[e2] = t2;
        }
        delete(e2) {
          delete this.headers[e2];
        }
        get(e2) {
          let t2 = this.headers[e2];
          return void 0 !== t2 ? this.merge(t2) : null;
        }
        has(e2) {
          return void 0 !== this.headers[e2];
        }
        set(e2, t2) {
          this.headers[e2] = t2;
        }
        forEach(e2, t2) {
          for (let [r2, n2] of this.entries()) e2.call(t2, n2, r2, this);
        }
        *entries() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase(), r2 = this.get(t2);
            yield [t2, r2];
          }
        }
        *keys() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase();
            yield t2;
          }
        }
        *values() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = this.get(e2);
            yield t2;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
    }, 674537, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "headers", { enumerable: true, get: function() {
        return h;
      } });
      let n = e.r(559851), a = e.r(70590), i = e.r(108048), o = e.r(432459), s = e.r(796021), c = e.r(887014), l = e.r(457857), u = e.r(643821), d = e.r(802014);
      function h() {
        let e2 = "headers", t2 = a.workAsyncStorage.getStore(), r2 = i.workUnitAsyncStorage.getStore();
        if (t2) {
          if (r2 && "after" === r2.phase && !(0, u.isRequestAPICallableInsideAfter)()) throw Object.defineProperty(Error(`Route ${t2.route} used \`headers()\` inside \`after()\`. This is not supported. If you need this data inside an \`after()\` callback, use \`headers()\` outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E839", enumerable: false, configurable: true });
          if (t2.forceStatic) return f(n.HeadersAdapter.seal(new Headers({})));
          if (r2) switch (r2.type) {
            case "cache": {
              let e3 = Object.defineProperty(Error(`Route ${t2.route} used \`headers()\` inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`headers()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E833", enumerable: false, configurable: true });
              throw Error.captureStackTrace(e3, h), t2.invalidDynamicUsageError ??= e3, e3;
            }
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${t2.route} used \`headers()\` inside a function cached with \`unstable_cache()\`. Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`headers()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E838", enumerable: false, configurable: true });
          }
          if (t2.dynamicShouldError) throw Object.defineProperty(new s.StaticGenBailoutError(`Route ${t2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E828", enumerable: false, configurable: true });
          if (r2) switch (r2.type) {
            case "prerender":
              var l2 = t2, g = r2;
              let a2 = p.get(g);
              if (a2) return a2;
              let i2 = (0, c.makeHangingPromise)(g.renderSignal, l2.route, "`headers()`");
              return p.set(g, i2), i2;
            case "prerender-client":
              let y = "`headers`";
              throw Object.defineProperty(new d.InvariantError(`${y} must not be used within a client component. Next.js should be preventing ${y} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E693", enumerable: false, configurable: true });
            case "prerender-ppr":
              return (0, o.postponeWithTracking)(t2.route, e2, r2.dynamicTracking);
            case "prerender-legacy":
              return (0, o.throwToInterruptStaticGeneration)(e2, t2, r2);
            case "prerender-runtime":
              return (0, o.delayUntilRuntimeStage)(r2, f(r2.headers));
            case "private-cache":
              return f(r2.headers);
            case "request":
              return (0, o.trackDynamicDataInDynamicRender)(r2), f(r2.headers);
          }
        }
        (0, i.throwForMissingRequestStore)(e2);
      }
      e.r(847122);
      let p = /* @__PURE__ */ new WeakMap();
      function f(e2) {
        let t2 = p.get(e2);
        if (t2) return t2;
        let r2 = Promise.resolve(e2);
        return p.set(e2, r2), r2;
      }
      (0, l.createDedupedByCallsiteServerErrorLoggerDev)(function(e2, t2) {
        let r2 = e2 ? `Route "${e2}" ` : "This route ";
        return Object.defineProperty(Error(`${r2}used ${t2}. \`headers()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E836", enumerable: false, configurable: true });
      });
    }, 978393, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "draftMode", { enumerable: true, get: function() {
        return u;
      } });
      let n = e.r(108048), a = e.r(70590), i = e.r(432459), o = e.r(457857), s = e.r(796021), c = e.r(993476), l = e.r(802014);
      function u() {
        let e2 = a.workAsyncStorage.getStore(), t2 = n.workUnitAsyncStorage.getStore();
        switch ((!e2 || !t2) && (0, n.throwForMissingRequestStore)("draftMode"), t2.type) {
          case "prerender-runtime":
            return (0, i.delayUntilRuntimeStage)(t2, d(t2.draftMode, e2));
          case "request":
            return d(t2.draftMode, e2);
          case "cache":
          case "private-cache":
          case "unstable-cache":
            let r2 = (0, n.getDraftModeProviderForCacheScope)(e2, t2);
            if (r2) return d(r2, e2);
          case "prerender":
          case "prerender-client":
          case "prerender-ppr":
          case "prerender-legacy":
            return d(null, e2);
          default:
            return t2;
        }
      }
      function d(e2, t2) {
        let r2 = p.get(e2 ?? h);
        return r2 || Promise.resolve(new f(e2));
      }
      e.r(158728);
      let h = {}, p = /* @__PURE__ */ new WeakMap();
      class f {
        constructor(e2) {
          this._provider = e2;
        }
        get isEnabled() {
          return null !== this._provider && this._provider.isEnabled;
        }
        enable() {
          g("draftMode().enable()", this.enable), null !== this._provider && this._provider.enable();
        }
        disable() {
          g("draftMode().disable()", this.disable), null !== this._provider && this._provider.disable();
        }
      }
      function g(e2, t2) {
        let r2 = a.workAsyncStorage.getStore(), o2 = n.workUnitAsyncStorage.getStore();
        if (r2) {
          if ((null == o2 ? void 0 : o2.phase) === "after") throw Object.defineProperty(Error(`Route ${r2.route} used "${e2}" inside \`after()\`. The enabled status of \`draftMode()\` can be read inside \`after()\` but you cannot enable or disable \`draftMode()\`. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E845", enumerable: false, configurable: true });
          if (r2.dynamicShouldError) throw Object.defineProperty(new s.StaticGenBailoutError(`Route ${r2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E553", enumerable: false, configurable: true });
          if (o2) switch (o2.type) {
            case "cache":
            case "private-cache": {
              let n3 = Object.defineProperty(Error(`Route ${r2.route} used "${e2}" inside "use cache". The enabled status of \`draftMode()\` can be read in caches but you must not enable or disable \`draftMode()\` inside a cache. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E829", enumerable: false, configurable: true });
              throw Error.captureStackTrace(n3, t2), r2.invalidDynamicUsageError ??= n3, n3;
            }
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${r2.route} used "${e2}" inside a function cached with \`unstable_cache()\`. The enabled status of \`draftMode()\` can be read in caches but you must not enable or disable \`draftMode()\` inside a cache. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E844", enumerable: false, configurable: true });
            case "prerender":
            case "prerender-runtime": {
              let t3 = Object.defineProperty(Error(`Route ${r2.route} used ${e2} without first calling \`await connection()\`. See more info here: https://nextjs.org/docs/messages/next-prerender-sync-headers`), "__NEXT_ERROR_CODE", { value: "E126", enumerable: false, configurable: true });
              return (0, i.abortAndThrowOnSynchronousRequestDataAccess)(r2.route, e2, t3, o2);
            }
            case "prerender-client":
              let n2 = "`draftMode`";
              throw Object.defineProperty(new l.InvariantError(`${n2} must not be used within a Client Component. Next.js should be preventing ${n2} from being included in Client Components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E832", enumerable: false, configurable: true });
            case "prerender-ppr":
              return (0, i.postponeWithTracking)(r2.route, e2, o2.dynamicTracking);
            case "prerender-legacy":
              o2.revalidate = 0;
              let a2 = Object.defineProperty(new c.DynamicServerError(`Route ${r2.route} couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E558", enumerable: false, configurable: true });
              throw r2.dynamicUsageDescription = e2, r2.dynamicUsageStack = a2.stack, a2;
            case "request":
              (0, i.trackDynamicDataInDynamicRender)(o2);
          }
        }
      }
      (0, o.createDedupedByCallsiteServerErrorLoggerDev)(function(e2, t2) {
        let r2 = e2 ? `Route "${e2}" ` : "This route ";
        return Object.defineProperty(Error(`${r2}used ${t2}. \`draftMode()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E835", enumerable: false, configurable: true });
      });
    }, 661043, (e, t, r) => {
      t.exports.cookies = e.r(140823).cookies, t.exports.headers = e.r(674537).headers, t.exports.draftMode = e.r(978393).draftMode;
    }, 855764, (e) => {
      "use strict";
      function t() {
        throw Object.defineProperty(Error('ImageResponse moved from "next/server" to "next/og" since Next.js 14, please import from "next/og" instead'), "__NEXT_ERROR_CODE", { value: "E183", enumerable: false, configurable: true });
      }
      e.s(["ImageResponse", () => t]);
    }, 164445, (e, t, r) => {
      var n = { 226: function(t2, r2) {
        !function(n2, a2) {
          "use strict";
          var i2 = "function", o = "undefined", s = "object", c = "string", l = "major", u = "model", d = "name", h = "type", p = "vendor", f = "version", g = "architecture", y = "console", m = "mobile", w = "tablet", b = "smarttv", _ = "wearable", v = "embedded", E = "Amazon", S = "Apple", A = "ASUS", T = "BlackBerry", P = "Browser", R = "Chrome", k = "Firefox", C = "Google", x = "Huawei", O = "Microsoft", N = "Motorola", I = "Opera", D = "Samsung", M = "Sharp", j = "Sony", U = "Xiaomi", L = "Zebra", H = "Facebook", K = "Chromium OS", W = "Mac OS", $ = function(e2, t3) {
            var r3 = {};
            for (var n3 in e2) t3[n3] && t3[n3].length % 2 == 0 ? r3[n3] = t3[n3].concat(e2[n3]) : r3[n3] = e2[n3];
            return r3;
          }, q = function(e2) {
            for (var t3 = {}, r3 = 0; r3 < e2.length; r3++) t3[e2[r3].toUpperCase()] = e2[r3];
            return t3;
          }, B = function(e2, t3) {
            return typeof e2 === c && -1 !== J(t3).indexOf(J(e2));
          }, J = function(e2) {
            return e2.toLowerCase();
          }, z = function(e2, t3) {
            if (typeof e2 === c) return e2 = e2.replace(/^\s\s*/, ""), typeof t3 === o ? e2 : e2.substring(0, 350);
          }, G = function(e2, t3) {
            for (var r3, n3, a3, o2, c2, l2, u2 = 0; u2 < t3.length && !c2; ) {
              var d2 = t3[u2], h2 = t3[u2 + 1];
              for (r3 = n3 = 0; r3 < d2.length && !c2 && d2[r3]; ) if (c2 = d2[r3++].exec(e2)) for (a3 = 0; a3 < h2.length; a3++) l2 = c2[++n3], typeof (o2 = h2[a3]) === s && o2.length > 0 ? 2 === o2.length ? typeof o2[1] == i2 ? this[o2[0]] = o2[1].call(this, l2) : this[o2[0]] = o2[1] : 3 === o2.length ? typeof o2[1] !== i2 || o2[1].exec && o2[1].test ? this[o2[0]] = l2 ? l2.replace(o2[1], o2[2]) : void 0 : this[o2[0]] = l2 ? o2[1].call(this, l2, o2[2]) : void 0 : 4 === o2.length && (this[o2[0]] = l2 ? o2[3].call(this, l2.replace(o2[1], o2[2])) : void 0) : this[o2] = l2 || void 0;
              u2 += 2;
            }
          }, F = function(e2, t3) {
            for (var r3 in t3) if (typeof t3[r3] === s && t3[r3].length > 0) {
              for (var n3 = 0; n3 < t3[r3].length; n3++) if (B(t3[r3][n3], e2)) return "?" === r3 ? void 0 : r3;
            } else if (B(t3[r3], e2)) return "?" === r3 ? void 0 : r3;
            return e2;
          }, V = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, X = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [f, [d, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [f, [d, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [d, f], [/opios[\/ ]+([\w\.]+)/i], [f, [d, I + " Mini"]], [/\bopr\/([\w\.]+)/i], [f, [d, I]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [d, f], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [f, [d, "UC" + P]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [f, [d, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [f, [d, "WeChat"]], [/konqueror\/([\w\.]+)/i], [f, [d, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [f, [d, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [f, [d, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[d, /(.+)/, "$1 Secure " + P], f], [/\bfocus\/([\w\.]+)/i], [f, [d, k + " Focus"]], [/\bopt\/([\w\.]+)/i], [f, [d, I + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [f, [d, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [f, [d, "Dolphin"]], [/coast\/([\w\.]+)/i], [f, [d, I + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [f, [d, "MIUI " + P]], [/fxios\/([-\w\.]+)/i], [f, [d, k]], [/\bqihu|(qi?ho?o?|360)browser/i], [[d, "360 " + P]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[d, /(.+)/, "$1 " + P], f], [/(comodo_dragon)\/([\w\.]+)/i], [[d, /_/g, " "], f], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [d, f], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [d], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[d, H], f], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [d, f], [/\bgsa\/([\w\.]+) .*safari\//i], [f, [d, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [f, [d, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [f, [d, R + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[d, R + " WebView"], f], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [f, [d, "Android " + P]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [d, f], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [f, [d, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [f, d], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [d, [f, F, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [d, f], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[d, "Netscape"], f], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [f, [d, k + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [d, f], [/(cobalt)\/([\w\.]+)/i], [d, [f, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[g, "amd64"]], [/(ia32(?=;))/i], [[g, J]], [/((?:i[346]|x)86)[;\)]/i], [[g, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[g, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[g, "armhf"]], [/windows (ce|mobile); ppc;/i], [[g, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[g, /ower/, "", J]], [/(sun4\w)[;\)]/i], [[g, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[g, J]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [u, [p, D], [h, w]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [u, [p, D], [h, m]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [u, [p, S], [h, m]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [u, [p, S], [h, w]], [/(macintosh);/i], [u, [p, S]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [u, [p, M], [h, m]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [u, [p, x], [h, w]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [u, [p, x], [h, m]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[u, /_/g, " "], [p, U], [h, m]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[u, /_/g, " "], [p, U], [h, w]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [u, [p, "OPPO"], [h, m]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [u, [p, "Vivo"], [h, m]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [u, [p, "Realme"], [h, m]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [u, [p, N], [h, m]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [u, [p, N], [h, w]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [u, [p, "LG"], [h, w]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [u, [p, "LG"], [h, m]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [u, [p, "Lenovo"], [h, w]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[u, /_/g, " "], [p, "Nokia"], [h, m]], [/(pixel c)\b/i], [u, [p, C], [h, w]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [u, [p, C], [h, m]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [u, [p, j], [h, m]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[u, "Xperia Tablet"], [p, j], [h, w]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [u, [p, "OnePlus"], [h, m]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [u, [p, E], [h, w]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[u, /(.+)/g, "Fire Phone $1"], [p, E], [h, m]], [/(playbook);[-\w\),; ]+(rim)/i], [u, p, [h, w]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [u, [p, T], [h, m]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [u, [p, A], [h, w]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [u, [p, A], [h, m]], [/(nexus 9)/i], [u, [p, "HTC"], [h, w]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [p, [u, /_/g, " "], [h, m]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [u, [p, "Acer"], [h, w]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [u, [p, "Meizu"], [h, m]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [p, u, [h, m]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [p, u, [h, w]], [/(surface duo)/i], [u, [p, O], [h, w]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [u, [p, "Fairphone"], [h, m]], [/(u304aa)/i], [u, [p, "AT&T"], [h, m]], [/\bsie-(\w*)/i], [u, [p, "Siemens"], [h, m]], [/\b(rct\w+) b/i], [u, [p, "RCA"], [h, w]], [/\b(venue[\d ]{2,7}) b/i], [u, [p, "Dell"], [h, w]], [/\b(q(?:mv|ta)\w+) b/i], [u, [p, "Verizon"], [h, w]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [u, [p, "Barnes & Noble"], [h, w]], [/\b(tm\d{3}\w+) b/i], [u, [p, "NuVision"], [h, w]], [/\b(k88) b/i], [u, [p, "ZTE"], [h, w]], [/\b(nx\d{3}j) b/i], [u, [p, "ZTE"], [h, m]], [/\b(gen\d{3}) b.+49h/i], [u, [p, "Swiss"], [h, m]], [/\b(zur\d{3}) b/i], [u, [p, "Swiss"], [h, w]], [/\b((zeki)?tb.*\b) b/i], [u, [p, "Zeki"], [h, w]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[p, "Dragon Touch"], u, [h, w]], [/\b(ns-?\w{0,9}) b/i], [u, [p, "Insignia"], [h, w]], [/\b((nxa|next)-?\w{0,9}) b/i], [u, [p, "NextBook"], [h, w]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[p, "Voice"], u, [h, m]], [/\b(lvtel\-)?(v1[12]) b/i], [[p, "LvTel"], u, [h, m]], [/\b(ph-1) /i], [u, [p, "Essential"], [h, m]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [u, [p, "Envizen"], [h, w]], [/\b(trio[-\w\. ]+) b/i], [u, [p, "MachSpeed"], [h, w]], [/\btu_(1491) b/i], [u, [p, "Rotor"], [h, w]], [/(shield[\w ]+) b/i], [u, [p, "Nvidia"], [h, w]], [/(sprint) (\w+)/i], [p, u, [h, m]], [/(kin\.[onetw]{3})/i], [[u, /\./g, " "], [p, O], [h, m]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [u, [p, L], [h, w]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [u, [p, L], [h, m]], [/smart-tv.+(samsung)/i], [p, [h, b]], [/hbbtv.+maple;(\d+)/i], [[u, /^/, "SmartTV"], [p, D], [h, b]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[p, "LG"], [h, b]], [/(apple) ?tv/i], [p, [u, S + " TV"], [h, b]], [/crkey/i], [[u, R + "cast"], [p, C], [h, b]], [/droid.+aft(\w)( bui|\))/i], [u, [p, E], [h, b]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [u, [p, M], [h, b]], [/(bravia[\w ]+)( bui|\))/i], [u, [p, j], [h, b]], [/(mitv-\w{5}) bui/i], [u, [p, U], [h, b]], [/Hbbtv.*(technisat) (.*);/i], [p, u, [h, b]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[p, z], [u, z], [h, b]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[h, b]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [p, u, [h, y]], [/droid.+; (shield) bui/i], [u, [p, "Nvidia"], [h, y]], [/(playstation [345portablevi]+)/i], [u, [p, j], [h, y]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [u, [p, O], [h, y]], [/((pebble))app/i], [p, u, [h, _]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [u, [p, S], [h, _]], [/droid.+; (glass) \d/i], [u, [p, C], [h, _]], [/droid.+; (wt63?0{2,3})\)/i], [u, [p, L], [h, _]], [/(quest( 2| pro)?)/i], [u, [p, H], [h, _]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [p, [h, v]], [/(aeobc)\b/i], [u, [p, E], [h, v]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [u, [h, m]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [u, [h, w]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[h, w]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[h, m]], [/(android[-\w\. ]{0,9});.+buil/i], [u, [p, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [f, [d, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [f, [d, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [d, f], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [f, d]], os: [[/microsoft (windows) (vista|xp)/i], [d, f], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [d, [f, F, V]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[d, "Windows"], [f, F, V]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[f, /_/g, "."], [d, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[d, W], [f, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [f, d], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [d, f], [/\(bb(10);/i], [f, [d, T]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [f, [d, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [f, [d, k + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [f, [d, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [f, [d, "watchOS"]], [/crkey\/([\d\.]+)/i], [f, [d, R + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[d, K], f], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [d, f], [/(sunos) ?([\w\.\d]*)/i], [[d, "Solaris"], f], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [d, f]] }, Y = function(e2, t3) {
            if (typeof e2 === s && (t3 = e2, e2 = void 0), !(this instanceof Y)) return new Y(e2, t3).getResult();
            var r3 = typeof n2 !== o && n2.navigator ? n2.navigator : void 0, a3 = e2 || (r3 && r3.userAgent ? r3.userAgent : ""), y2 = r3 && r3.userAgentData ? r3.userAgentData : void 0, b2 = t3 ? $(X, t3) : X, _2 = r3 && r3.userAgent == a3;
            return this.getBrowser = function() {
              var e3, t4 = {};
              return t4[d] = void 0, t4[f] = void 0, G.call(t4, a3, b2.browser), t4[l] = typeof (e3 = t4[f]) === c ? e3.replace(/[^\d\.]/g, "").split(".")[0] : void 0, _2 && r3 && r3.brave && typeof r3.brave.isBrave == i2 && (t4[d] = "Brave"), t4;
            }, this.getCPU = function() {
              var e3 = {};
              return e3[g] = void 0, G.call(e3, a3, b2.cpu), e3;
            }, this.getDevice = function() {
              var e3 = {};
              return e3[p] = void 0, e3[u] = void 0, e3[h] = void 0, G.call(e3, a3, b2.device), _2 && !e3[h] && y2 && y2.mobile && (e3[h] = m), _2 && "Macintosh" == e3[u] && r3 && typeof r3.standalone !== o && r3.maxTouchPoints && r3.maxTouchPoints > 2 && (e3[u] = "iPad", e3[h] = w), e3;
            }, this.getEngine = function() {
              var e3 = {};
              return e3[d] = void 0, e3[f] = void 0, G.call(e3, a3, b2.engine), e3;
            }, this.getOS = function() {
              var e3 = {};
              return e3[d] = void 0, e3[f] = void 0, G.call(e3, a3, b2.os), _2 && !e3[d] && y2 && "Unknown" != y2.platform && (e3[d] = y2.platform.replace(/chrome os/i, K).replace(/macos/i, W)), e3;
            }, this.getResult = function() {
              return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
            }, this.getUA = function() {
              return a3;
            }, this.setUA = function(e3) {
              return a3 = typeof e3 === c && e3.length > 350 ? z(e3, 350) : e3, this;
            }, this.setUA(a3), this;
          };
          if (Y.VERSION = "1.0.35", Y.BROWSER = q([d, f, l]), Y.CPU = q([g]), Y.DEVICE = q([u, p, h, y, m, b, w, _, v]), Y.ENGINE = Y.OS = q([d, f]), typeof r2 !== o) t2.exports && (r2 = t2.exports = Y), r2.UAParser = Y;
          else if (typeof define === i2 && define.amd) e.r, void 0 !== Y && e.v(Y);
          else typeof n2 !== o && (n2.UAParser = Y);
          var Q = typeof n2 !== o && (n2.jQuery || n2.Zepto);
          if (Q && !Q.ua) {
            var Z = new Y();
            Q.ua = Z.getResult(), Q.ua.get = function() {
              return Z.getUA();
            }, Q.ua.set = function(e2) {
              Z.setUA(e2);
              var t3 = Z.getResult();
              for (var r3 in t3) Q.ua[r3] = t3[r3];
            };
          }
        }(this);
      } }, a = {};
      function i(e2) {
        var t2 = a[e2];
        if (void 0 !== t2) return t2.exports;
        var r2 = a[e2] = { exports: {} }, o = true;
        try {
          n[e2].call(r2.exports, r2, r2.exports, i), o = false;
        } finally {
          o && delete a[e2];
        }
        return r2.exports;
      }
      i.ab = "/ROOT/node_modules/next/dist/compiled/ua-parser-js/", t.exports = i(226);
    }, 353674, (e) => {
      "use strict";
      var t = e.i(164445);
      function r(e2) {
        return /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Google-InspectionTool|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(e2);
      }
      function n(e2) {
        return { ...(0, t.default)(e2), isBot: void 0 !== e2 && r(e2) };
      }
      function a({ headers: e2 }) {
        return n(e2.get("user-agent") || void 0);
      }
      e.s(["isBot", () => r, "userAgent", () => a, "userAgentFromString", () => n]);
    }, 807722, (e) => {
      "use strict";
      let t = "undefined" == typeof URLPattern ? void 0 : URLPattern;
      e.s(["URLPattern", () => t]);
    }, 334272, (e) => {
      "use strict";
      e.i(407754);
      var t = e.i(290460);
      function r(e2) {
        let r2 = t.workAsyncStorage.getStore();
        if (!r2) throw Object.defineProperty(Error("`after` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context"), "__NEXT_ERROR_CODE", { value: "E468", enumerable: false, configurable: true });
        let { afterContext: n } = r2;
        return n.after(e2);
      }
      e.s(["after", () => r], 707662), e.s([], 56179), e.i(56179), e.i(707662), e.s(["after", () => r], 334272);
    }, 538242, (e) => {
      "use strict";
      e.i(407754);
      var t, r = e.i(290460), n = e.i(153835), a = e.i(182453), i = e.i(40049);
      class o extends Error {
        constructor(e2) {
          super(`Dynamic server usage: ${e2}`), this.description = e2, this.digest = "DYNAMIC_SERVER_USAGE";
        }
      }
      class s extends Error {
        constructor(...e2) {
          super(...e2), this.code = "NEXT_STATIC_GEN_BAILOUT";
        }
      }
      class c extends Error {
        constructor(e2, t2) {
          super(`During prerendering, ${t2} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${t2} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${e2}".`), this.route = e2, this.expression = t2, this.digest = "HANGING_PROMISE_REJECTION";
        }
      }
      let l = /* @__PURE__ */ new WeakMap();
      function u() {
      }
      e.i(325753);
      let d = "function" == typeof i.default.unstable_postpone;
      function h(e2, t2) {
        return `Route ${e2} needs to bail out of prerendering at this point because it used ${t2}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
      }
      if (false === ((t = h("%%%", "^^^")).includes("needs to bail out of prerendering at this point because it used") && t.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      RegExp(`\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at __next_root_layout_boundary__ \\([^\\n]*\\)`), RegExp(`\\n\\s+at __next_metadata_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_viewport_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_outlet_boundary__[\\n\\s]`), e.i(544789);
      var p = e.i(269487);
      function f() {
        let e2 = r.workAsyncStorage.getStore(), t2 = a.workUnitAsyncStorage.getStore();
        if (e2) {
          let r2;
          if (t2 && "after" === t2.phase && (null == (r2 = p.afterTaskAsyncStorage.getStore()) ? void 0 : r2.rootTaskSpawnPhase) !== "action") throw Object.defineProperty(Error(`Route ${e2.route} used \`connection()\` inside \`after()\`. The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but \`after()\` executes after the request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E827", enumerable: false, configurable: true });
          if (e2.forceStatic) return Promise.resolve(void 0);
          if (e2.dynamicShouldError) throw Object.defineProperty(new s(`Route ${e2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`connection()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E847", enumerable: false, configurable: true });
          if (t2) switch (t2.type) {
            case "cache": {
              let t3 = Object.defineProperty(Error(`Route ${e2.route} used \`connection()\` inside "use cache". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual request, but caches must be able to be produced before a request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E841", enumerable: false, configurable: true });
              throw Error.captureStackTrace(t3, f), e2.invalidDynamicUsageError ??= t3, t3;
            }
            case "private-cache": {
              let t3 = Object.defineProperty(Error(`Route ${e2.route} used \`connection()\` inside "use cache: private". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual navigation request, but caches must be able to be produced before a navigation request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E837", enumerable: false, configurable: true });
              throw Error.captureStackTrace(t3, f), e2.invalidDynamicUsageError ??= t3, t3;
            }
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${e2.route} used \`connection()\` inside a function cached with \`unstable_cache()\`. The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E840", enumerable: false, configurable: true });
            case "prerender":
            case "prerender-client":
            case "prerender-runtime":
              return function(e3, t3, r3) {
                if (e3.aborted) return Promise.reject(new c(t3, r3));
                {
                  let n3 = new Promise((n4, a2) => {
                    let i2 = a2.bind(null, new c(t3, r3)), o2 = l.get(e3);
                    if (o2) o2.push(i2);
                    else {
                      let t4 = [i2];
                      l.set(e3, t4), e3.addEventListener("abort", () => {
                        for (let e4 = 0; e4 < t4.length; e4++) t4[e4]();
                      }, { once: true });
                    }
                  });
                  return n3.catch(u), n3;
                }
              }(t2.renderSignal, e2.route, "`connection()`");
            case "prerender-ppr":
              var g, y, m;
              return g = e2.route, y = "connection", m = t2.dynamicTracking, void (function() {
                if (!d) throw Object.defineProperty(Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E224", enumerable: false, configurable: true });
              }(), m && m.dynamicAccesses.push({ stack: m.isDebugDynamicAccesses ? Error().stack : void 0, expression: y }), i.default.unstable_postpone(h(g, y)));
            case "prerender-legacy":
              var w = "connection";
              let n2 = Object.defineProperty(new o(`Route ${e2.route} couldn't be rendered statically because it used \`${w}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E558", enumerable: false, configurable: true });
              throw t2.revalidate = 0, e2.dynamicUsageDescription = w, e2.dynamicUsageStack = n2.stack, n2;
            case "request":
              return !function(e3) {
                switch (e3.type) {
                  case "cache":
                  case "unstable-cache":
                  case "private-cache":
                    return;
                }
              }(t2), Promise.resolve(void 0);
          }
        }
        (0, n.throwForMissingRequestStore)("connection");
      }
      e.s(["connection", () => f], 538242);
    }, 397880, (e, t, r) => {
      let n = { NextRequest: e.r(44655).NextRequest, NextResponse: e.r(180233).NextResponse, ImageResponse: e.r(855764).ImageResponse, userAgentFromString: e.r(353674).userAgentFromString, userAgent: e.r(353674).userAgent, URLPattern: e.r(807722).URLPattern, after: e.r(334272).after, connection: e.r(538242).connection };
      t.exports = n, r.NextRequest = n.NextRequest, r.NextResponse = n.NextResponse, r.ImageResponse = n.ImageResponse, r.userAgentFromString = n.userAgentFromString, r.userAgent = n.userAgent, r.URLPattern = n.URLPattern, r.after = n.after, r.connection = n.connection;
    }, 190894, (e, t, r) => {
      e.n(__import_unsupported("crypto"));
    }, 242738, (e) => {
      "use strict";
      let t, r, n, a, i, o, s, c, l, u, d;
      async function h() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      let p = null;
      async function f() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        p || (p = h());
        let e10 = await p;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function g(...e10) {
        let t10 = await h();
        try {
          var r10;
          await (null == t10 || null == (r10 = t10.onRequestError) ? void 0 : r10.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let y = null;
      function m() {
        return y || (y = f()), y;
      }
      function w(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== e.g.process && (process.env = e.g.process.env, e.g.process = process);
      try {
        Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
          let t10 = new Proxy(function() {
          }, { get(t11, r10) {
            if ("then" === r10) return {};
            throw Object.defineProperty(Error(w(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, construct() {
            throw Object.defineProperty(Error(w(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, apply(r10, n10, a10) {
            if ("function" == typeof a10[0]) return a10[0](t10);
            throw Object.defineProperty(Error(w(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          } });
          return new Proxy({}, { get: () => t10 });
        }, enumerable: false, configurable: false });
      } catch {
      }
      m();
      var b, _, v, E, S, A, T, P, R, k, C, x, O, N, I, D, M, j, U, L, H, K, W, $, q, B, J, z, G, F, V, X = e.i(823407), Y = e.i(234144);
      let Q = Symbol("response"), Z = Symbol("passThrough"), ee = Symbol("waitUntil");
      class et {
        constructor(e10, t10) {
          this[Z] = false, this[ee] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[Q] || (this[Q] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[Z] = true;
        }
        waitUntil(e10) {
          if ("external" === this[ee].kind) return (0, this[ee].function)(e10);
          this[ee].promises.push(e10);
        }
      }
      class er extends et {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new X.PageSignatureError({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new X.PageSignatureError({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      var en = e.i(44655), ea = e.i(180233);
      function ei(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, n10 = new URL(e10, t10), a10 = n10.origin === r10.origin;
        return { url: a10 ? n10.toString().slice(r10.origin.length) : n10.toString(), isRelative: a10 };
      }
      var eo = e.i(757841), es = e.i(924628);
      es.NEXT_RSC_UNION_QUERY;
      var ec = e.i(17536);
      class el extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new el();
        }
      }
      class eu extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t10, r10, n10) {
            if ("symbol" == typeof r10) return ec.ReflectAdapter.get(t10, r10, n10);
            let a10 = r10.toLowerCase(), i10 = Object.keys(e10).find((e11) => e11.toLowerCase() === a10);
            if (void 0 !== i10) return ec.ReflectAdapter.get(t10, i10, n10);
          }, set(t10, r10, n10, a10) {
            if ("symbol" == typeof r10) return ec.ReflectAdapter.set(t10, r10, n10, a10);
            let i10 = r10.toLowerCase(), o2 = Object.keys(e10).find((e11) => e11.toLowerCase() === i10);
            return ec.ReflectAdapter.set(t10, o2 ?? r10, n10, a10);
          }, has(t10, r10) {
            if ("symbol" == typeof r10) return ec.ReflectAdapter.has(t10, r10);
            let n10 = r10.toLowerCase(), a10 = Object.keys(e10).find((e11) => e11.toLowerCase() === n10);
            return void 0 !== a10 && ec.ReflectAdapter.has(t10, a10);
          }, deleteProperty(t10, r10) {
            if ("symbol" == typeof r10) return ec.ReflectAdapter.deleteProperty(t10, r10);
            let n10 = r10.toLowerCase(), a10 = Object.keys(e10).find((e11) => e11.toLowerCase() === n10);
            return void 0 === a10 || ec.ReflectAdapter.deleteProperty(t10, a10);
          } });
        }
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "append":
              case "delete":
              case "set":
                return el.callable;
              default:
                return ec.ReflectAdapter.get(e11, t10, r10);
            }
          } });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new eu(e10);
        }
        append(e10, t10) {
          let r10 = this.headers[e10];
          "string" == typeof r10 ? this.headers[e10] = [r10, t10] : Array.isArray(r10) ? r10.push(t10) : this.headers[e10] = t10;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t10 = this.headers[e10];
          return void 0 !== t10 ? this.merge(t10) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t10) {
          this.headers[e10] = t10;
        }
        forEach(e10, t10) {
          for (let [r10, n10] of this.entries()) e10.call(t10, n10, r10, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase(), r10 = this.get(t10);
            yield [t10, r10];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase();
            yield t10;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = this.get(e10);
            yield t10;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      e.i(265664);
      var ed = e.i(828042);
      e.i(407754);
      var eh = e.i(290460);
      class ep extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new ep();
        }
      }
      class ef {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "clear":
              case "delete":
              case "set":
                return ep.callable;
              default:
                return ec.ReflectAdapter.get(e11, t10, r10);
            }
          } });
        }
      }
      let eg = Symbol.for("next.mutated.cookies");
      class ey {
        static wrap(e10, t10) {
          let r10 = new ed.ResponseCookies(new Headers());
          for (let t11 of e10.getAll()) r10.set(t11);
          let n10 = [], a10 = /* @__PURE__ */ new Set(), i10 = () => {
            let e11 = eh.workAsyncStorage.getStore();
            if (e11 && (e11.pathWasRevalidated = true), n10 = r10.getAll().filter((e12) => a10.has(e12.name)), t10) {
              let e12 = [];
              for (let t11 of n10) {
                let r11 = new ed.ResponseCookies(new Headers());
                r11.set(t11), e12.push(r11.toString());
              }
              t10(e12);
            }
          }, o2 = new Proxy(r10, { get(e11, t11, r11) {
            switch (t11) {
              case eg:
                return n10;
              case "delete":
                return function(...t12) {
                  a10.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.delete(...t12), o2;
                  } finally {
                    i10();
                  }
                };
              case "set":
                return function(...t12) {
                  a10.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.set(...t12), o2;
                  } finally {
                    i10();
                  }
                };
              default:
                return ec.ReflectAdapter.get(e11, t11, r11);
            }
          } });
          return o2;
        }
      }
      function em(e10, t10) {
        if ("action" !== e10.phase) throw new ep();
      }
      var ew = e.i(726430), eb = ((b = eb || {}).handleRequest = "BaseServer.handleRequest", b.run = "BaseServer.run", b.pipe = "BaseServer.pipe", b.getStaticHTML = "BaseServer.getStaticHTML", b.render = "BaseServer.render", b.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", b.renderToResponse = "BaseServer.renderToResponse", b.renderToHTML = "BaseServer.renderToHTML", b.renderError = "BaseServer.renderError", b.renderErrorToResponse = "BaseServer.renderErrorToResponse", b.renderErrorToHTML = "BaseServer.renderErrorToHTML", b.render404 = "BaseServer.render404", b), e_ = ((_ = e_ || {}).loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", _.loadComponents = "LoadComponents.loadComponents", _), ev = ((v = ev || {}).getRequestHandler = "NextServer.getRequestHandler", v.getRequestHandlerWithMetadata = "NextServer.getRequestHandlerWithMetadata", v.getServer = "NextServer.getServer", v.getServerRequestHandler = "NextServer.getServerRequestHandler", v.createServer = "createServer.createServer", v), eE = ((E = eE || {}).compression = "NextNodeServer.compression", E.getBuildId = "NextNodeServer.getBuildId", E.createComponentTree = "NextNodeServer.createComponentTree", E.clientComponentLoading = "NextNodeServer.clientComponentLoading", E.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", E.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", E.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", E.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", E.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", E.sendRenderResult = "NextNodeServer.sendRenderResult", E.proxyRequest = "NextNodeServer.proxyRequest", E.runApi = "NextNodeServer.runApi", E.render = "NextNodeServer.render", E.renderHTML = "NextNodeServer.renderHTML", E.imageOptimizer = "NextNodeServer.imageOptimizer", E.getPagePath = "NextNodeServer.getPagePath", E.getRoutesManifest = "NextNodeServer.getRoutesManifest", E.findPageComponents = "NextNodeServer.findPageComponents", E.getFontManifest = "NextNodeServer.getFontManifest", E.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", E.getRequestHandler = "NextNodeServer.getRequestHandler", E.renderToHTML = "NextNodeServer.renderToHTML", E.renderError = "NextNodeServer.renderError", E.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", E.render404 = "NextNodeServer.render404", E.startResponse = "NextNodeServer.startResponse", E.route = "route", E.onProxyReq = "onProxyReq", E.apiResolver = "apiResolver", E.internalFetch = "internalFetch", E), eS = ((S = eS || {}).startServer = "startServer.startServer", S), eA = ((A = eA || {}).getServerSideProps = "Render.getServerSideProps", A.getStaticProps = "Render.getStaticProps", A.renderToString = "Render.renderToString", A.renderDocument = "Render.renderDocument", A.createBodyResult = "Render.createBodyResult", A), eT = ((T = eT || {}).renderToString = "AppRender.renderToString", T.renderToReadableStream = "AppRender.renderToReadableStream", T.getBodyResult = "AppRender.getBodyResult", T.fetch = "AppRender.fetch", T), eP = ((P = eP || {}).executeRoute = "Router.executeRoute", P), eR = ((R = eR || {}).runHandler = "Node.runHandler", R), ek = ((k = ek || {}).runHandler = "AppRouteRouteHandlers.runHandler", k), eC = ((C = eC || {}).generateMetadata = "ResolveMetadata.generateMetadata", C.generateViewport = "ResolveMetadata.generateViewport", C), ex = ((x = ex || {}).execute = "Middleware.execute", x);
      let eO = /* @__PURE__ */ new Set(["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"]), eN = /* @__PURE__ */ new Set(["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"]);
      function eI(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let eD = process.env.NEXT_OTEL_PERFORMANCE_PREFIX, { context: eM, propagation: ej, trace: eU, SpanStatusCode: eL, SpanKind: eH, ROOT_CONTEXT: eK } = t = e.r(459110);
      class eW extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let e$ = (e10, t10) => {
        "object" == typeof t10 && null !== t10 && t10 instanceof eW && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && (e10.recordException(t10), e10.setAttribute("error.type", t10.name)), e10.setStatus({ code: eL.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, eq = /* @__PURE__ */ new Map(), eB = t.createContextKey("next.rootSpanId"), eJ = 0, ez = { set(e10, t10, r10) {
        e10.push({ key: t10, value: r10 });
      } }, eG = (d = new class e {
        getTracerInstance() {
          return eU.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return eM;
        }
        getTracePropagationData() {
          let e10 = eM.active(), t10 = [];
          return ej.inject(e10, t10, ez), t10;
        }
        getActiveScopeSpan() {
          return eU.getSpan(null == eM ? void 0 : eM.active());
        }
        withPropagatedContext(e10, t10, r10) {
          let n10 = eM.active();
          if (eU.getSpanContext(n10)) return t10();
          let a10 = ej.extract(n10, e10, r10);
          return eM.with(a10, t10);
        }
        trace(...e10) {
          let [t10, r10, n10] = e10, { fn: a10, options: i10 } = "function" == typeof r10 ? { fn: r10, options: {} } : { fn: n10, options: { ...r10 } }, o2 = i10.spanName ?? t10;
          if (!eO.has(t10) && "1" !== process.env.NEXT_OTEL_VERBOSE || i10.hideSpan) return a10();
          let s2 = this.getSpanContext((null == i10 ? void 0 : i10.parentSpan) ?? this.getActiveScopeSpan());
          s2 || (s2 = (null == eM ? void 0 : eM.active()) ?? eK);
          let c2 = s2.getValue(eB), l2 = "number" != typeof c2 || !eq.has(c2), u2 = eJ++;
          return i10.attributes = { "next.span_name": o2, "next.span_type": t10, ...i10.attributes }, eM.with(s2.setValue(eB, u2), () => this.getTracerInstance().startActiveSpan(o2, i10, (e11) => {
            let r11;
            eD && t10 && eN.has(t10) && (r11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0);
            let n11 = false, o3 = () => {
              !n11 && (n11 = true, eq.delete(u2), r11 && performance.measure(`${eD}:next-${(t10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: r11, end: performance.now() }));
            };
            if (l2 && eq.set(u2, new Map(Object.entries(i10.attributes ?? {}))), a10.length > 1) try {
              return a10(e11, (t11) => e$(e11, t11));
            } catch (t11) {
              throw e$(e11, t11), t11;
            } finally {
              o3();
            }
            try {
              let t11 = a10(e11);
              if (eI(t11)) return t11.then((t12) => (e11.end(), t12)).catch((t12) => {
                throw e$(e11, t12), t12;
              }).finally(o3);
              return e11.end(), o3(), t11;
            } catch (t11) {
              throw e$(e11, t11), o3(), t11;
            }
          }));
        }
        wrap(...e10) {
          let t10 = this, [r10, n10, a10] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return eO.has(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = n10;
            "function" == typeof e11 && "function" == typeof a10 && (e11 = e11.apply(this, arguments));
            let i10 = arguments.length - 1, o2 = arguments[i10];
            if ("function" != typeof o2) return t10.trace(r10, e11, () => a10.apply(this, arguments));
            {
              let n11 = t10.getContext().bind(eM.active(), o2);
              return t10.trace(r10, e11, (e12, t11) => (arguments[i10] = function(e13) {
                return null == t11 || t11(e13), n11.apply(this, arguments);
              }, a10.apply(this, arguments)));
            }
          } : a10;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, n10 = this.getSpanContext((null == r10 ? void 0 : r10.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t10, r10, n10);
        }
        getSpanContext(e10) {
          return e10 ? eU.setSpan(eM.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = eM.active().getValue(eB);
          return eq.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r10 = eM.active().getValue(eB), n10 = eq.get(r10);
          n10 && !n10.has(e10) && n10.set(e10, t10);
        }
      }(), () => d), eF = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(eF);
      class eV {
        constructor(e10, t10, r10, n10) {
          var a10;
          const i10 = e10 && function(e11, t11) {
            let r11 = eu.from(e11.headers);
            return { isOnDemandRevalidate: r11.get(ew.PRERENDER_REVALIDATE_HEADER) === t11.previewModeId, revalidateOnlyGenerated: r11.has(ew.PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER) };
          }(t10, e10).isOnDemandRevalidate, o2 = null == (a10 = r10.get(eF)) ? void 0 : a10.value;
          this._isEnabled = !!(!i10 && o2 && e10 && o2 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = n10;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: eF, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: eF, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      function eX(e10, t10) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r10 = e10.headers["x-middleware-set-cookie"], n10 = new Headers();
          for (let e11 of (0, Y.splitCookiesString)(r10)) n10.append("set-cookie", e11);
          for (let e11 of new ed.ResponseCookies(n10).getAll()) t10.set(e11);
        }
      }
      e.i(153835);
      var eY = e.i(182453), eQ = e.i(299734), eZ = e.i(325753);
      e.i(951615);
      process.env.NEXT_PRIVATE_DEBUG_CACHE && ((e10, ...t10) => {
        console.log(`use-cache: ${e10}`, ...t10);
      }), Symbol.for("@next/cache-handlers");
      let e0 = Symbol.for("@next/cache-handlers-map"), e1 = Symbol.for("@next/cache-handlers-set"), e2 = globalThis;
      function e4() {
        if (e2[e0]) return e2[e0].entries();
      }
      async function e5(e10, t10) {
        if (!e10) return t10();
        let r10 = e8(e10);
        try {
          return await t10();
        } finally {
          var n10, a10;
          let t11, i10, o2 = (n10 = r10, a10 = e8(e10), t11 = new Set(n10.pendingRevalidatedTags.map((e11) => {
            let t12 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return `${e11.tag}:${t12}`;
          })), i10 = new Set(n10.pendingRevalidateWrites), { pendingRevalidatedTags: a10.pendingRevalidatedTags.filter((e11) => {
            let r11 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return !t11.has(`${e11.tag}:${r11}`);
          }), pendingRevalidates: Object.fromEntries(Object.entries(a10.pendingRevalidates).filter(([e11]) => !(e11 in n10.pendingRevalidates))), pendingRevalidateWrites: a10.pendingRevalidateWrites.filter((e11) => !i10.has(e11)) });
          await e6(e10, o2);
        }
      }
      function e8(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? [...e10.pendingRevalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function e3(e10, t10, r10) {
        if (0 === e10.length) return;
        let n10 = function() {
          if (e2[e1]) return e2[e1].values();
        }(), a10 = [], i10 = /* @__PURE__ */ new Map();
        for (let t11 of e10) {
          let e11, r11 = t11.profile;
          for (let [t12] of i10) if ("string" == typeof t12 && "string" == typeof r11 && t12 === r11 || "object" == typeof t12 && "object" == typeof r11 && JSON.stringify(t12) === JSON.stringify(r11) || t12 === r11) {
            e11 = t12;
            break;
          }
          let n11 = e11 || r11;
          i10.has(n11) || i10.set(n11, []), i10.get(n11).push(t11.tag);
        }
        for (let [e11, s2] of i10) {
          let i11;
          if (e11) {
            let t11;
            if ("object" == typeof e11) t11 = e11;
            else if ("string" == typeof e11) {
              var o2;
              if (!(t11 = null == r10 || null == (o2 = r10.cacheLifeProfiles) ? void 0 : o2[e11])) throw Object.defineProperty(Error(`Invalid profile provided "${e11}" must be configured under cacheLife in next.config or be "max"`), "__NEXT_ERROR_CODE", { value: "E873", enumerable: false, configurable: true });
            }
            t11 && (i11 = { expire: t11.expire });
          }
          for (let t11 of n10 || []) e11 ? a10.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, s2, i11)) : a10.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, s2));
          t10 && a10.push(t10.revalidateTag(s2, i11));
        }
        await Promise.all(a10);
      }
      async function e6(e10, t10) {
        let r10 = (null == t10 ? void 0 : t10.pendingRevalidatedTags) ?? e10.pendingRevalidatedTags ?? [], n10 = (null == t10 ? void 0 : t10.pendingRevalidates) ?? e10.pendingRevalidates ?? {}, a10 = (null == t10 ? void 0 : t10.pendingRevalidateWrites) ?? e10.pendingRevalidateWrites ?? [];
        return Promise.all([e3(r10, e10.incrementalCache, e10), ...Object.values(n10), ...a10]);
      }
      var e9 = e.i(290044);
      e.i(544789);
      var e7 = e.i(269487);
      class te {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r10 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r10, this.callbackQueue = new eQ.default(), this.callbackQueue.pause();
        }
        after(e10) {
          if (eI(e10)) this.waitUntil || tt(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" == typeof e10) this.addCallback(e10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addCallback(e10) {
          this.waitUntil || tt();
          let t10 = eY.workUnitAsyncStorage.getStore();
          t10 && this.workUnitStores.add(t10);
          let r10 = e7.afterTaskAsyncStorage.getStore(), n10 = r10 ? r10.rootTaskSpawnPhase : null == t10 ? void 0 : t10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let a10 = (0, e9.bindSnapshot)(async () => {
            try {
              await e7.afterTaskAsyncStorage.run({ rootTaskSpawnPhase: n10 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          });
          this.callbackQueue.add(a10);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let e11 of this.workUnitStores) e11.phase = "after";
          let e10 = eh.workAsyncStorage.getStore();
          if (!e10) throw Object.defineProperty(new eZ.InvariantError("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return e5(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(Object.defineProperty(new eZ.InvariantError("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function tt() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function tr(e10) {
        let t10, r10 = { then: (n10, a10) => (t10 || (t10 = e10()), t10.then((e11) => {
          r10.value = e11;
        }).catch(() => {
        }), t10.then(n10, a10)) };
        return r10;
      }
      class tn {
        onClose(e10) {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", { value: "E365", enumerable: false, configurable: true });
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", { value: "E229", enumerable: false, configurable: true });
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function ta() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let ti = Symbol.for("@next/request-context");
      async function to(e10, t10, r10) {
        let n10 = /* @__PURE__ */ new Set();
        for (let t11 of ((e11) => {
          let t12 = ["/layout"];
          if (e11.startsWith("/")) {
            let r11 = e11.split("/");
            for (let e12 = 1; e12 < r11.length + 1; e12++) {
              let n11 = r11.slice(0, e12).join("/");
              n11 && (n11.endsWith("/page") || n11.endsWith("/route") || (n11 = `${n11}${!n11.endsWith("/") ? "/" : ""}layout`), t12.push(n11));
            }
          }
          return t12;
        })(e10)) t11 = `${ew.NEXT_CACHE_IMPLICIT_TAG_ID}${t11}`, n10.add(t11);
        if (t10.pathname && (!r10 || 0 === r10.size)) {
          let e11 = `${ew.NEXT_CACHE_IMPLICIT_TAG_ID}${t10.pathname}`;
          n10.add(e11);
        }
        n10.has(`${ew.NEXT_CACHE_IMPLICIT_TAG_ID}/`) && n10.add(`${ew.NEXT_CACHE_IMPLICIT_TAG_ID}/index`), n10.has(`${ew.NEXT_CACHE_IMPLICIT_TAG_ID}/index`) && n10.add(`${ew.NEXT_CACHE_IMPLICIT_TAG_ID}/`);
        let a10 = Array.from(n10);
        return { tags: a10, expirationsByCacheKind: function(e11) {
          let t11 = /* @__PURE__ */ new Map(), r11 = e4();
          if (r11) for (let [n11, a11] of r11) "getExpiration" in a11 && t11.set(n11, tr(async () => a11.getExpiration(e11)));
          return t11;
        }(a10) };
      }
      class ts extends en.NextRequest {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new X.PageSignatureError({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new X.PageSignatureError({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new X.PageSignatureError({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      let tc = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, tl = (e10, t10) => eG().withPropagatedContext(e10.headers, t10, tc), tu = false;
      async function td(t10) {
        var r10, n10, a10, i10;
        let o2, s2, c2, l2, u2;
        !function() {
          if (!tu && (tu = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: t11, wrapRequestHandler: r11 } = e.r(494165);
            t11(), tl = r11(tl);
          }
        }(), await m();
        let d2 = void 0 !== globalThis.__BUILD_MANIFEST;
        t10.request.url = t10.request.url.replace(/\.rsc($|\?)/, "$1");
        let h2 = t10.bypassNextUrl ? new URL(t10.request.url) : new eo.NextURL(t10.request.url, { headers: t10.request.headers, nextConfig: t10.request.nextConfig });
        for (let e10 of [...h2.searchParams.keys()]) {
          let t11 = h2.searchParams.getAll(e10), r11 = (0, Y.normalizeNextQueryParam)(e10);
          if (r11) {
            for (let e11 of (h2.searchParams.delete(r11), t11)) h2.searchParams.append(r11, e11);
            h2.searchParams.delete(e10);
          }
        }
        let p2 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in h2 && (p2 = h2.buildId || "", h2.buildId = "");
        let f2 = (0, Y.fromNodeOutgoingHttpHeaders)(t10.request.headers), g2 = f2.has("x-nextjs-data"), y2 = "1" === f2.get(es.RSC_HEADER);
        g2 && "/index" === h2.pathname && (h2.pathname = "/");
        let w2 = /* @__PURE__ */ new Map();
        if (!d2) for (let e10 of es.FLIGHT_HEADERS) {
          let t11 = f2.get(e10);
          null !== t11 && (w2.set(e10, t11), f2.delete(e10));
        }
        let b2 = h2.searchParams.get(es.NEXT_RSC_UNION_QUERY), _2 = new ts({ page: t10.page, input: ((l2 = (c2 = "string" == typeof h2) ? new URL(h2) : h2).searchParams.delete(es.NEXT_RSC_UNION_QUERY), c2 ? l2.toString() : l2).toString(), init: { body: t10.request.body, headers: f2, method: t10.request.method, nextConfig: t10.request.nextConfig, signal: t10.request.signal } });
        g2 && Object.defineProperty(_2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && t10.IncrementalCache && (globalThis.__incrementalCache = new t10.IncrementalCache({ CurCacheHandler: t10.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: t10.request.headers, getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: ta() }) }));
        let v2 = t10.request.waitUntil ?? (null == (r10 = null == (u2 = globalThis[ti]) ? void 0 : u2.get()) ? void 0 : r10.waitUntil), E2 = new er({ request: _2, page: t10.page, context: v2 ? { waitUntil: v2 } : void 0 });
        if ((o2 = await tl(_2, () => {
          if ("/middleware" === t10.page || "/src/middleware" === t10.page || "/proxy" === t10.page || "/src/proxy" === t10.page) {
            let e10 = E2.waitUntil.bind(E2), r11 = new tn();
            return eG().trace(ex.execute, { spanName: `middleware ${_2.method}`, attributes: { "http.target": _2.nextUrl.pathname, "http.method": _2.method } }, async () => {
              try {
                var n11, a11, i11, o3, c3, l3;
                let u3 = ta(), d3 = await to("/", _2.nextUrl, null), h3 = (c3 = _2.nextUrl, l3 = (e11) => {
                  s2 = e11;
                }, function(e11, t11, r12, n12, a12, i12, o4, s3, c4, l4, u4, d4) {
                  function h4(e12) {
                    r12 && r12.setHeader("Set-Cookie", e12);
                  }
                  let p3 = {};
                  return { type: "request", phase: e11, implicitTags: i12, url: { pathname: n12.pathname, search: n12.search ?? "" }, rootParams: a12, get headers() {
                    return p3.headers || (p3.headers = function(e12) {
                      let t12 = eu.from(e12);
                      for (let e13 of es.FLIGHT_HEADERS) t12.delete(e13);
                      return eu.seal(t12);
                    }(t11.headers)), p3.headers;
                  }, get cookies() {
                    if (!p3.cookies) {
                      let e12 = new ed.RequestCookies(eu.from(t11.headers));
                      eX(t11, e12), p3.cookies = ef.seal(e12);
                    }
                    return p3.cookies;
                  }, set cookies(value) {
                    p3.cookies = value;
                  }, get mutableCookies() {
                    if (!p3.mutableCookies) {
                      var f4, g3;
                      let e12, n13 = (f4 = t11.headers, g3 = o4 || (r12 ? h4 : void 0), e12 = new ed.RequestCookies(eu.from(f4)), ey.wrap(e12, g3));
                      eX(t11, n13), p3.mutableCookies = n13;
                    }
                    return p3.mutableCookies;
                  }, get userspaceMutableCookies() {
                    if (!p3.userspaceMutableCookies) {
                      var y3;
                      let e12;
                      y3 = this, p3.userspaceMutableCookies = e12 = new Proxy(y3.mutableCookies, { get(t12, r13, n13) {
                        switch (r13) {
                          case "delete":
                            return function(...r14) {
                              return em(y3, "cookies().delete"), t12.delete(...r14), e12;
                            };
                          case "set":
                            return function(...r14) {
                              return em(y3, "cookies().set"), t12.set(...r14), e12;
                            };
                          default:
                            return ec.ReflectAdapter.get(t12, r13, n13);
                        }
                      } });
                    }
                    return p3.userspaceMutableCookies;
                  }, get draftMode() {
                    return p3.draftMode || (p3.draftMode = new eV(c4, t11, this.cookies, this.mutableCookies)), p3.draftMode;
                  }, renderResumeDataCache: null, isHmrRefresh: l4, serverComponentsHmrCache: u4 || globalThis.__serverComponentsHmrCache, devFallbackParams: null };
                }("action", _2, void 0, c3, {}, d3, l3, null, u3, false, void 0, null)), f3 = function({ page: e11, renderOpts: t11, isPrefetchRequest: r12, buildId: n12, previouslyRevalidatedTags: a12, nonce: i12 }) {
                  var o4;
                  let s3 = !t11.shouldWaitOnAllReady && !t11.supportsDynamicResponse && !t11.isDraftMode && !t11.isPossibleServerAction, c4 = t11.dev ?? false, l4 = c4 || s3 && (!!process.env.NEXT_DEBUG_BUILD || "1" === process.env.NEXT_SSG_FETCH_METRICS), u4 = { isStaticGeneration: s3, page: e11, route: (o4 = e11.split("/").reduce((e12, t12, r13, n13) => t12 ? "(" === t12[0] && t12.endsWith(")") || "@" === t12[0] || ("page" === t12 || "route" === t12) && r13 === n13.length - 1 ? e12 : `${e12}/${t12}` : e12, "")).startsWith("/") ? o4 : `/${o4}`, incrementalCache: t11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: t11.cacheLifeProfiles, isBuildTimePrerendering: t11.nextExport, hasReadableErrorStacks: t11.hasReadableErrorStacks, fetchCache: t11.fetchCache, isOnDemandRevalidate: t11.isOnDemandRevalidate, isDraftMode: t11.isDraftMode, isPrefetchRequest: r12, buildId: n12, reactLoadableManifest: (null == t11 ? void 0 : t11.reactLoadableManifest) || {}, assetPrefix: (null == t11 ? void 0 : t11.assetPrefix) || "", nonce: i12, afterContext: function(e12) {
                    let { waitUntil: t12, onClose: r13, onAfterTaskError: n13 } = e12;
                    return new te({ waitUntil: t12, onClose: r13, onTaskError: n13 });
                  }(t11), cacheComponentsEnabled: t11.cacheComponents, dev: c4, previouslyRevalidatedTags: a12, refreshTagsByCacheKind: function() {
                    let e12 = /* @__PURE__ */ new Map(), t12 = e4();
                    if (t12) for (let [r13, n13] of t12) "refreshTags" in n13 && e12.set(r13, tr(async () => n13.refreshTags()));
                    return e12;
                  }(), runInCleanSnapshot: (0, e9.createSnapshot)(), shouldTrackFetchMetrics: l4 };
                  return t11.store = u4, u4;
                }({ page: "/", renderOpts: { cacheLifeProfiles: null == (a11 = t10.request.nextConfig) || null == (n11 = a11.experimental) ? void 0 : n11.cacheLife, cacheComponents: false, experimental: { isRoutePPREnabled: false, authInterrupts: !!(null == (o3 = t10.request.nextConfig) || null == (i11 = o3.experimental) ? void 0 : i11.authInterrupts) }, supportsDynamicResponse: true, waitUntil: e10, onClose: r11.onClose.bind(r11), onAfterTaskError: void 0 }, isPrefetchRequest: "1" === _2.headers.get(es.NEXT_ROUTER_PREFETCH_HEADER), buildId: p2 ?? "", previouslyRevalidatedTags: [] });
                return await eh.workAsyncStorage.run(f3, () => eY.workUnitAsyncStorage.run(h3, t10.handler, _2, E2));
              } finally {
                setTimeout(() => {
                  r11.dispatchClose();
                }, 0);
              }
            });
          }
          return t10.handler(_2, E2);
        })) && !(o2 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        o2 && s2 && o2.headers.set("set-cookie", s2);
        let S2 = null == o2 ? void 0 : o2.headers.get("x-middleware-rewrite");
        if (o2 && S2 && (y2 || !d2)) {
          let e10 = new eo.NextURL(S2, { forceLocale: true, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          d2 || e10.host !== _2.nextUrl.host || (e10.buildId = p2 || e10.buildId, o2.headers.set("x-middleware-rewrite", String(e10)));
          let { url: r11, isRelative: s3 } = ei(e10.toString(), h2.toString());
          !d2 && g2 && o2.headers.set("x-nextjs-rewrite", r11);
          let c3 = !s3 && (null == (i10 = t10.request.nextConfig) || null == (a10 = i10.experimental) || null == (n10 = a10.clientParamParsingOrigins) ? void 0 : n10.some((t11) => new RegExp(t11).test(e10.origin)));
          y2 && (s3 || c3) && (h2.pathname !== e10.pathname && o2.headers.set(es.NEXT_REWRITTEN_PATH_HEADER, e10.pathname), h2.search !== e10.search && o2.headers.set(es.NEXT_REWRITTEN_QUERY_HEADER, e10.search.slice(1)));
        }
        if (o2 && S2 && y2 && b2) {
          let e10 = new URL(S2);
          e10.searchParams.has(es.NEXT_RSC_UNION_QUERY) || (e10.searchParams.set(es.NEXT_RSC_UNION_QUERY, b2), o2.headers.set("x-middleware-rewrite", e10.toString()));
        }
        let A2 = null == o2 ? void 0 : o2.headers.get("Location");
        if (o2 && A2 && !d2) {
          let e10 = new eo.NextURL(A2, { forceLocale: false, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          o2 = new Response(o2.body, o2), e10.host === h2.host && (e10.buildId = p2 || e10.buildId, o2.headers.set("Location", e10.toString())), g2 && (o2.headers.delete("Location"), o2.headers.set("x-nextjs-redirect", ei(e10.toString(), h2.toString()).url));
        }
        let T2 = o2 || ea.NextResponse.next(), P2 = T2.headers.get("x-middleware-override-headers"), R2 = [];
        if (P2) {
          for (let [e10, t11] of w2) T2.headers.set(`x-middleware-request-${e10}`, t11), R2.push(e10);
          R2.length > 0 && T2.headers.set("x-middleware-override-headers", P2 + "," + R2.join(","));
        }
        return { response: T2, waitUntil: ("internal" === E2[ee].kind ? Promise.all(E2[ee].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: _2.fetchMetrics };
      }
      var th = e.i(661043), tp = e.i(397880);
      class tf extends Error {
      }
      class tg extends tf {
        constructor({ code: e10, message: t10 }) {
          super(t10 ?? "An error occurred while interacting with the authorization server."), this.name = "OAuth2Error", this.code = e10;
        }
      }
      class ty extends tf {
        constructor(e10) {
          super(e10 ?? "Discovery failed for the OpenID Connect configuration."), this.code = "discovery_error", this.name = "DiscoveryError";
        }
      }
      class tm extends tf {
        constructor(e10) {
          super(e10 ?? "The state parameter is missing."), this.code = "missing_state", this.name = "MissingStateError";
        }
      }
      class tw extends tf {
        constructor(e10) {
          super(e10 ?? "The state parameter is invalid."), this.code = "invalid_state", this.name = "InvalidStateError";
        }
      }
      class tb extends tf {
        constructor(e10) {
          super(e10 ?? "The configuration is invalid."), this.code = "invalid_configuration", this.name = "InvalidConfigurationError";
        }
      }
      class t_ extends tf {
        constructor({ cause: e10, message: t10 }) {
          super(t10 ?? "An error occurred during the authorization flow."), this.code = "authorization_error", this.cause = e10, this.name = "AuthorizationError";
        }
      }
      class tv extends tf {
        constructor(e10) {
          super(e10 ?? "An error occurred while preparing or performing the authorization code grant request."), this.code = "authorization_code_grant_request_error", this.name = "AuthorizationCodeGrantRequestError";
        }
      }
      class tE extends tf {
        constructor({ cause: e10, message: t10 }) {
          super(t10 ?? "An error occurred while trying to exchange the authorization code."), this.code = "authorization_code_grant_error", this.cause = e10, this.name = "AuthorizationCodeGrantError";
        }
      }
      class tS extends tf {
        constructor(e10) {
          super(e10 ?? "An error occurred while completing the backchannel logout request."), this.code = "backchannel_logout_error", this.name = "BackchannelLogoutError";
        }
      }
      class tA extends tf {
        constructor() {
          super("The authorization server does not support backchannel authentication. Learn how to enable it here: https://auth0.com/docs/get-started/applications/configure-client-initiated-backchannel-authentication"), this.code = "backchannel_authentication_not_supported_error", this.name = "BackchannelAuthenticationNotSupportedError";
        }
      }
      class tT extends tf {
        constructor({ cause: e10 }) {
          super("There was an error when trying to use Client-Initiated Backchannel Authentication."), this.code = "backchannel_authentication_error", this.cause = e10, this.name = "BackchannelAuthenticationError";
        }
      }
      (O = U || (U = {})).MISSING_SESSION = "missing_session", O.MISSING_REFRESH_TOKEN = "missing_refresh_token", O.FAILED_TO_REFRESH_TOKEN = "failed_to_refresh_token";
      class tP extends tf {
        constructor(e10, t10, r10) {
          super(t10), this.name = "AccessTokenError", this.code = e10, this.cause = r10;
        }
      }
      (N = L || (L = {})).MISSING_SESSION = "missing_session", N.MISSING_REFRESH_TOKEN = "missing_refresh_token", N.FAILED_TO_EXCHANGE = "failed_to_exchange_refresh_token";
      class tR extends tf {
        constructor(e10, t10, r10) {
          super(t10), this.name = "AccessTokenForConnectionError", this.code = e10, this.cause = r10;
        }
      }
      (I = H || (H = {})).DPOP_JKT_CALCULATION_FAILED = "dpop_jkt_calculation_failed", I.DPOP_KEY_EXPORT_FAILED = "dpop_key_export_failed", I.DPOP_CONFIGURATION_ERROR = "dpop_configuration_error";
      class tk extends tf {
        constructor(e10, t10, r10) {
          super(t10), this.name = "DPoPError", this.code = e10, this.cause = r10;
        }
      }
      class tC extends tf {
        constructor({ type: e10, title: t10, detail: r10, status: n10, validationErrors: a10 }) {
          super(`${t10}: ${r10}`), this.name = "MyAccountApiError", this.code = "my_account_api_error", this.type = e10, this.title = t10, this.detail = r10, this.status = n10, this.validationErrors = a10;
        }
      }
      (D = K || (K = {})).MISSING_SESSION = "missing_session", D.FAILED_TO_INITIATE = "failed_to_initiate", D.FAILED_TO_COMPLETE = "failed_to_complete";
      class tx extends tf {
        constructor({ code: e10, message: t10, cause: r10 }) {
          super(t10), this.name = "ConnectAccountError", this.code = e10, this.cause = r10;
        }
      }
      let tO = "openid profile email offline_access";
      var tN = e.i(190894);
      function tI(e10, t10) {
        if (null == e10) return false;
        try {
          return e10 instanceof t10 || Object.getPrototypeOf(e10)[Symbol.toStringTag] === t10.prototype[Symbol.toStringTag];
        } catch {
          return false;
        }
      }
      "undefined" != typeof navigator && navigator.userAgent?.startsWith?.("Mozilla/5.0 ") || (r = "oauth4webapi/v3.8.2");
      let tD = "ERR_INVALID_ARG_VALUE", tM = "ERR_INVALID_ARG_TYPE";
      function tj(e10, t10, r10) {
        let n10 = TypeError(e10, { cause: r10 });
        return Object.assign(n10, { code: t10 }), n10;
      }
      let tU = Symbol(), tL = Symbol(), tH = Symbol(), tK = Symbol(), tW = Symbol(), t$ = Symbol();
      Symbol();
      let tq = new TextEncoder(), tB = new TextDecoder();
      function tJ(e10) {
        return "string" == typeof e10 ? tq.encode(e10) : tB.decode(e10);
      }
      function tz(e10) {
        return "string" == typeof e10 ? a(e10) : n(e10);
      }
      n = Uint8Array.prototype.toBase64 ? (e10) => (e10 instanceof ArrayBuffer && (e10 = new Uint8Array(e10)), e10.toBase64({ alphabet: "base64url", omitPadding: true })) : (e10) => {
        e10 instanceof ArrayBuffer && (e10 = new Uint8Array(e10));
        let t10 = [];
        for (let r10 = 0; r10 < e10.byteLength; r10 += 32768) t10.push(String.fromCharCode.apply(null, e10.subarray(r10, r10 + 32768)));
        return btoa(t10.join("")).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }, a = Uint8Array.fromBase64 ? (e10) => {
        try {
          return Uint8Array.fromBase64(e10, { alphabet: "base64url" });
        } catch (e11) {
          throw tj("The input to be decoded is not correctly encoded.", tD, e11);
        }
      } : (e10) => {
        try {
          let t10 = atob(e10.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "")), r10 = new Uint8Array(t10.length);
          for (let e11 = 0; e11 < t10.length; e11++) r10[e11] = t10.charCodeAt(e11);
          return r10;
        } catch (e11) {
          throw tj("The input to be decoded is not correctly encoded.", tD, e11);
        }
      };
      class tG extends Error {
        code;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = r2, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class tF extends Error {
        code;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, t10?.code && (this.code = t10?.code), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      function tV(e10, t10, r10) {
        return new tF(e10, { code: t10, cause: r10 });
      }
      async function tX(e10) {
        let t10;
        switch (e10.kty) {
          case "EC":
            t10 = { crv: e10.crv, kty: e10.kty, x: e10.x, y: e10.y };
            break;
          case "OKP":
            t10 = { crv: e10.crv, kty: e10.kty, x: e10.x };
            break;
          case "AKP":
            t10 = { alg: e10.alg, kty: e10.kty, pub: e10.pub };
            break;
          case "RSA":
            t10 = { e: e10.e, kty: e10.kty, n: e10.n };
            break;
          default:
            throw new tG("unsupported JWK key type", { cause: e10 });
        }
        return tz(await crypto.subtle.digest("SHA-256", tJ(JSON.stringify(t10))));
      }
      function tY(e10, t10) {
        if (!(e10 instanceof CryptoKey)) throw tj(`${t10} must be a CryptoKey`, tM);
      }
      function tQ(e10, t10) {
        if (tY(e10, t10), "private" !== e10.type) throw tj(`${t10} must be a private CryptoKey`, tD);
      }
      function tZ(e10) {
        return !(null === e10 || "object" != typeof e10 || Array.isArray(e10));
      }
      function t0(e10) {
        tI(e10, Headers) && (e10 = Object.fromEntries(e10.entries()));
        let t10 = new Headers(e10 ?? {});
        if (r && !t10.has("user-agent") && t10.set("user-agent", r), t10.has("authorization")) throw tj('"options.headers" must not include the "authorization" header name', tD);
        return t10;
      }
      function t1(e10, t10) {
        if (void 0 !== t10) {
          if ("function" == typeof t10 && (t10 = t10(e10.href)), !(t10 instanceof AbortSignal)) throw tj('"options.signal" must return or be an instance of AbortSignal', tM);
          return t10;
        }
      }
      function t2(e10) {
        return e10.includes("//") ? e10.replace("//", "/") : e10;
      }
      async function t4(e10, t10, r10, n10) {
        if (!(e10 instanceof URL)) throw tj(`"${t10}" must be an instance of URL`, tM);
        rh(e10, n10?.[tU] !== true);
        let a10 = r10(new URL(e10.href)), i10 = t0(n10?.headers);
        return i10.set("accept", "application/json"), (n10?.[tK] || fetch)(a10.href, { body: void 0, headers: Object.fromEntries(i10.entries()), method: "GET", redirect: "manual", signal: t1(a10, n10?.signal) });
      }
      async function t5(e10, t10) {
        return t4(e10, "issuerIdentifier", (e11) => {
          switch (t10?.algorithm) {
            case void 0:
            case "oidc":
              e11.pathname = t2(`${e11.pathname}/.well-known/openid-configuration`);
              break;
            case "oauth2":
              !function(e12, t11, r10 = false) {
                "/" === e12.pathname ? e12.pathname = t11 : e12.pathname = t2(`${t11}/${r10 ? e12.pathname : e12.pathname.replace(/(\/)$/, "")}`);
              }(e11, ".well-known/oauth-authorization-server");
              break;
            default:
              throw tj('"options.algorithm" must be "oidc" (default), or "oauth2"', tD);
          }
          return e11;
        }, t10);
      }
      function t8(e10, t10, r10, n10, a10) {
        try {
          if ("number" != typeof e10 || !Number.isFinite(e10)) throw tj(`${r10} must be a number`, tM, a10);
          if (e10 > 0) return;
          if (t10) {
            if (0 !== e10) throw tj(`${r10} must be a non-negative number`, tD, a10);
            return;
          }
          throw tj(`${r10} must be a positive number`, tD, a10);
        } catch (e11) {
          if (n10) throw tV(e11.message, n10, a10);
          throw e11;
        }
      }
      function t3(e10, t10, r10, n10) {
        try {
          if ("string" != typeof e10) throw tj(`${t10} must be a string`, tM, n10);
          if (0 === e10.length) throw tj(`${t10} must not be empty`, tD, n10);
        } catch (e11) {
          if (r10) throw tV(e11.message, r10, n10);
          throw e11;
        }
      }
      async function t6(e10, t10) {
        if (!(e10 instanceof URL) && e10 !== nb) throw tj('"expectedIssuerIdentifier" must be an instance of URL', tM);
        if (!tI(t10, Response)) throw tj('"response" must be an instance of Response', tM);
        if (200 !== t10.status) throw tV('"response" is not a conform Authorization Server Metadata response (unexpected HTTP status code)', r6, t10);
        ns(t10);
        let r10 = await nw(t10);
        if (t3(r10.issuer, '"response" body "issuer" property', r8, { body: r10 }), e10 !== nb && new URL(r10.issuer).href !== e10.href) throw tV('"response" body "issuer" property does not match the expected value', nr, { expected: e10.href, body: r10, attribute: "issuer" });
        return r10;
      }
      function t9(e10) {
        var t10, r10 = e10, n10 = "application/json";
        if (t10 = r10, t10.headers.get("content-type")?.split(";")[0] !== n10) throw function(e11, ...t11) {
          let r11 = '"response" content-type must be ';
          if (t11.length > 2) {
            let e12 = t11.pop();
            r11 += `${t11.join(", ")}, or ${e12}`;
          } else 2 === t11.length ? r11 += `${t11[0]} or ${t11[1]}` : r11 += t11[0];
          return tV(r11, r3, e11);
        }(r10, n10);
      }
      function t7() {
        return tz(crypto.getRandomValues(new Uint8Array(32)));
      }
      async function re(e10) {
        return t3(e10, "codeVerifier"), tz(await crypto.subtle.digest("SHA-256", tJ(e10)));
      }
      function rt(e10) {
        switch (e10.algorithm.name) {
          case "RSA-PSS":
            switch (e10.algorithm.hash.name) {
              case "SHA-256":
                return "PS256";
              case "SHA-384":
                return "PS384";
              case "SHA-512":
                return "PS512";
              default:
                throw new tG("unsupported RsaHashedKeyAlgorithm hash name", { cause: e10 });
            }
          case "RSASSA-PKCS1-v1_5":
            switch (e10.algorithm.hash.name) {
              case "SHA-256":
                return "RS256";
              case "SHA-384":
                return "RS384";
              case "SHA-512":
                return "RS512";
              default:
                throw new tG("unsupported RsaHashedKeyAlgorithm hash name", { cause: e10 });
            }
          case "ECDSA":
            switch (e10.algorithm.namedCurve) {
              case "P-256":
                return "ES256";
              case "P-384":
                return "ES384";
              case "P-521":
                return "ES512";
              default:
                throw new tG("unsupported EcKeyAlgorithm namedCurve", { cause: e10 });
            }
          case "Ed25519":
          case "ML-DSA-44":
          case "ML-DSA-65":
          case "ML-DSA-87":
            return e10.algorithm.name;
          case "EdDSA":
            return "Ed25519";
          default:
            throw new tG("unsupported CryptoKey algorithm name", { cause: e10 });
        }
      }
      function rr(e10) {
        let t10 = e10?.[tL];
        return "number" == typeof t10 && Number.isFinite(t10) ? t10 : 0;
      }
      function rn(e10) {
        let t10 = e10?.[tH];
        return "number" == typeof t10 && Number.isFinite(t10) && -1 !== Math.sign(t10) ? t10 : 30;
      }
      function ra() {
        return Math.floor(Date.now() / 1e3);
      }
      function ri(e10) {
        if ("object" != typeof e10 || null === e10) throw tj('"as" must be an object', tM);
        t3(e10.issuer, '"as.issuer"');
      }
      function ro(e10) {
        if ("object" != typeof e10 || null === e10) throw tj('"client" must be an object', tM);
        t3(e10.client_id, '"client.client_id"');
      }
      function rs(e10) {
        return t3(e10, '"clientSecret"'), (t10, r10, n10, a10) => {
          n10.set("client_id", r10.client_id), n10.set("client_secret", e10);
        };
      }
      async function rc(e10, t10, r10) {
        if (!r10.usages.includes("sign")) throw tj('CryptoKey instances used for signing assertions must include "sign" in their "usages"', tD);
        let n10 = `${tz(tJ(JSON.stringify(e10)))}.${tz(tJ(JSON.stringify(t10)))}`, a10 = tz(await crypto.subtle.sign(function(e11) {
          switch (e11.algorithm.name) {
            case "ECDSA":
              return { name: e11.algorithm.name, hash: function(e12) {
                let { algorithm: t11 } = e12;
                switch (t11.namedCurve) {
                  case "P-256":
                    return "SHA-256";
                  case "P-384":
                    return "SHA-384";
                  case "P-521":
                    return "SHA-512";
                  default:
                    throw new tG("unsupported ECDSA namedCurve", { cause: e12 });
                }
              }(e11) };
            case "RSA-PSS":
              switch (nc(e11), e11.algorithm.hash.name) {
                case "SHA-256":
                case "SHA-384":
                case "SHA-512":
                  return { name: e11.algorithm.name, saltLength: parseInt(e11.algorithm.hash.name.slice(-3), 10) >> 3 };
                default:
                  throw new tG("unsupported RSA-PSS hash name", { cause: e11 });
              }
            case "RSASSA-PKCS1-v1_5":
              return nc(e11), e11.algorithm.name;
            case "ML-DSA-44":
            case "ML-DSA-65":
            case "ML-DSA-87":
            case "Ed25519":
              return e11.algorithm.name;
          }
          throw new tG("unsupported CryptoKey algorithm name", { cause: e11 });
        }(r10), r10, tJ(n10)));
        return `${n10}.${a10}`;
      }
      async function rl(e10, t10) {
        let { kty: r10, e: n10, n: a10, x: o2, y: s2, crv: c2, pub: l2 } = await crypto.subtle.exportKey("jwk", e10), u2 = { kty: r10, e: n10, n: a10, x: o2, y: s2, crv: c2, pub: l2 };
        return "AKP" === r10 && (u2.alg = t10), i.set(e10, u2), u2;
      }
      async function ru(e10, t10) {
        return (i ||= /* @__PURE__ */ new WeakMap()).get(e10) || rl(e10, t10);
      }
      let rd = URL.parse ? (e10, t10) => URL.parse(e10, t10) : (e10, t10) => {
        try {
          return new URL(e10, t10);
        } catch {
          return null;
        }
      };
      function rh(e10, t10) {
        if (t10 && "https:" !== e10.protocol) throw tV("only requests to HTTPS are allowed", r9, e10);
        if ("https:" !== e10.protocol && "http:" !== e10.protocol) throw tV("only HTTP and HTTPS requests are allowed", r7, e10);
      }
      function rp(e10, t10, r10, n10) {
        let a10;
        if ("string" != typeof e10 || !(a10 = rd(e10))) throw tV(`authorization server metadata does not contain a valid ${r10 ? `"as.mtls_endpoint_aliases.${t10}"` : `"as.${t10}"`}`, void 0 === e10 ? nn : na, { attribute: r10 ? `mtls_endpoint_aliases.${t10}` : t10 });
        return rh(a10, n10), a10;
      }
      function rf(e10, t10, r10, n10) {
        return r10 && e10.mtls_endpoint_aliases && t10 in e10.mtls_endpoint_aliases ? rp(e10.mtls_endpoint_aliases[t10], t10, r10, n10) : rp(e10[t10], t10, r10, n10);
      }
      async function rg(e10, t10, r10, n10, a10) {
        ri(e10), ro(t10);
        let i10 = rf(e10, "pushed_authorization_request_endpoint", t10.use_mtls_endpoint_aliases, a10?.[tU] !== true), o2 = new URLSearchParams(n10);
        o2.set("client_id", t10.client_id);
        let s2 = t0(a10?.headers);
        s2.set("accept", "application/json"), a10?.DPoP !== void 0 && (rx(a10.DPoP), await a10.DPoP.addProof(i10, s2, "POST"));
        let c2 = await rI(e10, t10, r10, i10, o2, s2, a10);
        return a10?.DPoP?.cacheNonce(c2, i10), c2;
      }
      class ry {
        #e;
        #t;
        #r;
        #n;
        #a;
        #i;
        #o;
        constructor(e10, t10, r10) {
          if (tQ(t10?.privateKey, '"DPoP.privateKey"'), !function(e11, t11) {
            if (tY(e11, t11), "public" !== e11.type) throw tj(`${t11} must be a public CryptoKey`, tD);
          }(t10?.publicKey, '"DPoP.publicKey"'), !t10.publicKey.extractable) throw tj('"DPoP.publicKey.extractable" must be true', tD);
          this.#a = r10?.[tW], this.#n = rr(e10), this.#t = t10.privateKey, this.#r = t10.publicKey, rB.add(this);
        }
        #s(e10) {
          this.#i ||= /* @__PURE__ */ new Map();
          let t10 = this.#i.get(e10);
          return t10 && (this.#i.delete(e10), this.#i.set(e10, t10)), t10;
        }
        #c(e10, t10) {
          this.#i ||= /* @__PURE__ */ new Map(), this.#i.delete(e10), 100 === this.#i.size && this.#i.delete(this.#i.keys().next().value), this.#i.set(e10, t10);
        }
        async calculateThumbprint() {
          if (!this.#o) {
            let e10 = await crypto.subtle.exportKey("jwk", this.#r);
            this.#o ||= await tX(e10);
          }
          return this.#o;
        }
        async addProof(e10, t10, r10, n10) {
          let a10 = rt(this.#t);
          this.#e ||= { alg: a10, typ: "dpop+jwt", jwk: await ru(this.#r, a10) };
          let i10 = this.#s(e10.origin), o2 = { iat: ra() + this.#n, jti: t7(), htm: r10, nonce: i10, htu: `${e10.origin}${e10.pathname}`, ath: n10 ? tz(await crypto.subtle.digest("SHA-256", tJ(n10))) : void 0 };
          this.#a?.(this.#e, o2), t10.set("dpop", await rc(this.#e, o2, this.#t));
        }
        cacheNonce(e10, t10) {
          try {
            let r10 = e10.headers.get("dpop-nonce");
            r10 && this.#c(t10.origin, r10);
          } catch {
          }
        }
      }
      function rm(e10) {
        if (e10 instanceof rv) {
          let { 0: t10, length: r10 } = e10.cause;
          return 1 === r10 && "dpop" === t10.scheme && "use_dpop_nonce" === t10.parameters.error;
        }
        return e10 instanceof rb && "use_dpop_nonce" === e10.error;
      }
      function rw(e10, t10, r10) {
        return new ry(e10, t10, r10);
      }
      class rb extends Error {
        cause;
        code;
        error;
        status;
        error_description;
        response;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = r1, this.cause = t10.cause, this.error = t10.cause.error, this.status = t10.response.status, this.error_description = t10.cause.error_description, Object.defineProperty(this, "response", { enumerable: false, value: t10.response }), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class r_ extends Error {
        cause;
        code;
        error;
        error_description;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = r4, this.cause = t10.cause, this.error = t10.cause.get("error"), this.error_description = t10.cause.get("error_description") ?? void 0, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class rv extends Error {
        cause;
        code;
        response;
        status;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = r0, this.cause = t10.cause, this.status = t10.response.status, this.response = t10.response, Object.defineProperty(this, "response", { enumerable: false }), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      let rE = "[a-zA-Z0-9!#$%&\\'\\*\\+\\-\\.\\^_`\\|~]+", rS = RegExp("^[,\\s]*(" + rE + ")\\s(.*)"), rA = RegExp("^[,\\s]*(" + rE + ')\\s*=\\s*"((?:[^"\\\\]|\\\\.)*)"[,\\s]*(.*)'), rT = RegExp("^[,\\s]*" + ("(" + rE + ")\\s*=\\s*(") + rE + ")[,\\s]*(.*)"), rP = RegExp("^([a-zA-Z0-9\\-\\._\\~\\+\\/]+[=]{0,2})(?:$|[,\\s])(.*)");
      async function rR(e10, t10, r10) {
        if (ri(e10), ro(t10), !tI(r10, Response)) throw tj('"response" must be an instance of Response', tM);
        await rC(r10, 201, "Pushed Authorization Request Endpoint"), ns(r10);
        let n10 = await nw(r10);
        t3(n10.request_uri, '"response" body "request_uri" property', r8, { body: n10 });
        let a10 = "number" != typeof n10.expires_in ? parseFloat(n10.expires_in) : n10.expires_in;
        return t8(a10, true, '"response" body "expires_in" property', r8, { body: n10 }), n10.expires_in = a10, n10;
      }
      async function rk(e10) {
        if (e10.status > 399 && e10.status < 500) {
          ns(e10), t9(e10);
          try {
            let t10 = await e10.clone().json();
            if (tZ(t10) && "string" == typeof t10.error && t10.error.length) return t10;
          } catch {
          }
        }
      }
      async function rC(e10, t10, r10) {
        if (e10.status !== t10) {
          let t11;
          if (rK(e10), t11 = await rk(e10)) throw await e10.body?.cancel(), new rb("server responded with an error in the response body", { cause: t11, response: e10 });
          throw tV(`"response" is not a conform ${r10} response (unexpected HTTP status code)`, r6, e10);
        }
      }
      function rx(e10) {
        if (!rB.has(e10)) throw tj('"options.DPoP" is not a valid DPoPHandle', tD);
      }
      async function rO(e10, t10, r10, n10, a10, i10) {
        if (t3(e10, '"accessToken"'), !(r10 instanceof URL)) throw tj('"url" must be an instance of URL', tM);
        rh(r10, i10?.[tU] !== true), n10 = t0(n10), i10?.DPoP && (rx(i10.DPoP), await i10.DPoP.addProof(r10, n10, t10.toUpperCase(), e10)), n10.set("authorization", `${n10.has("dpop") ? "DPoP" : "Bearer"} ${e10}`);
        let o2 = await (i10?.[tK] || fetch)(r10.href, { body: a10, headers: Object.fromEntries(n10.entries()), method: t10, redirect: "manual", signal: t1(r10, i10?.signal) });
        return i10?.DPoP?.cacheNonce(o2, r10), o2;
      }
      async function rN(e10, t10, r10, n10, a10, i10) {
        let o2 = await rO(e10, t10, r10, n10, a10, i10);
        return rK(o2), o2;
      }
      async function rI(e10, t10, r10, n10, a10, i10, o2) {
        return await r10(e10, t10, a10, i10), i10.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), (o2?.[tK] || fetch)(n10.href, { body: a10, headers: Object.fromEntries(i10.entries()), method: "POST", redirect: "manual", signal: t1(n10, o2?.signal) });
      }
      async function rD(e10, t10, r10, n10, a10, i10) {
        let o2 = rf(e10, "token_endpoint", t10.use_mtls_endpoint_aliases, i10?.[tU] !== true);
        a10.set("grant_type", n10);
        let s2 = t0(i10?.headers);
        s2.set("accept", "application/json"), i10?.DPoP !== void 0 && (rx(i10.DPoP), await i10.DPoP.addProof(o2, s2, "POST"));
        let c2 = await rI(e10, t10, r10, o2, a10, s2, i10);
        return i10?.DPoP?.cacheNonce(c2, o2), c2;
      }
      async function rM(e10, t10, r10, n10, a10) {
        ri(e10), ro(t10), t3(n10, '"refreshToken"');
        let i10 = new URLSearchParams(a10?.additionalParameters);
        return i10.set("refresh_token", n10), rD(e10, t10, r10, "refresh_token", i10, a10);
      }
      Symbol();
      let rj = /* @__PURE__ */ new WeakMap(), rU = /* @__PURE__ */ new WeakMap();
      function rL(e10) {
        if (!e10.id_token) return;
        let t10 = rj.get(e10);
        if (!t10) throw tj('"ref" was already garbage collected or did not resolve from the proper sources', tD);
        return t10;
      }
      async function rH(e10, t10, r10, n10, a10, i10) {
        if (ri(e10), ro(t10), !tI(r10, Response)) throw tj('"response" must be an instance of Response', tM);
        await rC(r10, 200, "Token Endpoint"), ns(r10);
        let o2 = await nw(r10);
        if (t3(o2.access_token, '"response" body "access_token" property', r8, { body: o2 }), t3(o2.token_type, '"response" body "token_type" property', r8, { body: o2 }), o2.token_type = o2.token_type.toLowerCase(), void 0 !== o2.expires_in) {
          let e11 = "number" != typeof o2.expires_in ? parseFloat(o2.expires_in) : o2.expires_in;
          t8(e11, true, '"response" body "expires_in" property', r8, { body: o2 }), o2.expires_in = e11;
        }
        if (void 0 !== o2.refresh_token && t3(o2.refresh_token, '"response" body "refresh_token" property', r8, { body: o2 }), void 0 !== o2.scope && "string" != typeof o2.scope) throw tV('"response" body "scope" property must be a string', r8, { body: o2 });
        if (void 0 !== o2.id_token) {
          t3(o2.id_token, '"response" body "id_token" property', r8, { body: o2 });
          let i11 = ["aud", "exp", "iat", "iss", "sub"];
          true === t10.require_auth_time && i11.push("auth_time"), void 0 !== t10.default_max_age && (t8(t10.default_max_age, true, '"client.default_max_age"'), i11.push("auth_time")), n10?.length && i11.push(...n10);
          let { claims: s2, jwt: c2 } = await nl(o2.id_token, nu.bind(void 0, t10.id_token_signed_response_alg, e10.id_token_signing_alg_values_supported, "RS256"), rr(t10), rn(t10), a10).then(rF.bind(void 0, i11)).then(rq.bind(void 0, e10)).then(r$.bind(void 0, t10.client_id));
          if (Array.isArray(s2.aud) && 1 !== s2.aud.length) {
            if (void 0 === s2.azp) throw tV('ID Token "aud" (audience) claim includes additional untrusted audiences', nt, { claims: s2, claim: "aud" });
            if (s2.azp !== t10.client_id) throw tV('unexpected ID Token "azp" (authorized party) claim value', nt, { expected: t10.client_id, claims: s2, claim: "azp" });
          }
          void 0 !== s2.auth_time && t8(s2.auth_time, true, 'ID Token "auth_time" (authentication time)', r8, { claims: s2 }), rU.set(r10, c2), rj.set(o2, s2);
        }
        if (i10?.[o2.token_type] !== void 0) i10[o2.token_type](r10, o2);
        else if ("dpop" !== o2.token_type && "bearer" !== o2.token_type) throw new tG("unsupported `token_type` value", { cause: { body: o2 } });
        return o2;
      }
      function rK(e10) {
        let t10;
        if (t10 = function(e11) {
          if (!tI(e11, Response)) throw tj('"response" must be an instance of Response', tM);
          let t11 = e11.headers.get("www-authenticate");
          if (null === t11) return;
          let r10 = [], n10 = t11;
          for (; n10; ) {
            let e12, t12 = n10.match(rS), a10 = t12?.["1"].toLowerCase();
            if (n10 = t12?.["2"], !a10) return;
            let i10 = {};
            for (; n10; ) {
              let r11, a11;
              if (t12 = n10.match(rA)) {
                if ([, r11, a11, n10] = t12, a11.includes("\\")) try {
                  a11 = JSON.parse(`"${a11}"`);
                } catch {
                }
                i10[r11.toLowerCase()] = a11;
                continue;
              }
              if (t12 = n10.match(rT)) {
                [, r11, a11, n10] = t12, i10[r11.toLowerCase()] = a11;
                continue;
              }
              if (t12 = n10.match(rP)) {
                if (Object.keys(i10).length) break;
                [, e12, n10] = t12;
                break;
              }
              return;
            }
            let o2 = { scheme: a10, parameters: i10 };
            e12 && (o2.token68 = e12), r10.push(o2);
          }
          if (r10.length) return r10;
        }(e10)) throw new rv("server responded with a challenge in the WWW-Authenticate HTTP Header", { cause: t10, response: e10 });
      }
      async function rW(e10, t10, r10, n10) {
        return rH(e10, t10, r10, void 0, n10?.[t$], n10?.recognizedTokenTypes);
      }
      function r$(e10, t10) {
        if (Array.isArray(t10.claims.aud)) {
          if (!t10.claims.aud.includes(e10)) throw tV('unexpected JWT "aud" (audience) claim value', nt, { expected: e10, claims: t10.claims, claim: "aud" });
        } else if (t10.claims.aud !== e10) throw tV('unexpected JWT "aud" (audience) claim value', nt, { expected: e10, claims: t10.claims, claim: "aud" });
        return t10;
      }
      function rq(e10, t10) {
        let r10 = e10[n_]?.(t10) ?? e10.issuer;
        if (t10.claims.iss !== r10) throw tV('unexpected JWT "iss" (issuer) claim value', nt, { expected: r10, claims: t10.claims, claim: "iss" });
        return t10;
      }
      let rB = /* @__PURE__ */ new WeakSet(), rJ = Symbol();
      async function rz(e10, t10, r10, n10, a10, i10, o2) {
        if (ri(e10), ro(t10), !rB.has(n10)) throw tj('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()', tD);
        t3(a10, '"redirectUri"');
        let s2 = nd(n10, "code");
        if (!s2) throw tV('no authorization code in "callbackParameters"', r8);
        let c2 = new URLSearchParams(o2?.additionalParameters);
        return c2.set("redirect_uri", a10), c2.set("code", s2), i10 !== rJ && (t3(i10, '"codeVerifier"'), c2.set("code_verifier", i10)), rD(e10, t10, r10, "authorization_code", c2, o2);
      }
      let rG = { aud: "audience", c_hash: "code hash", client_id: "client id", exp: "expiration time", iat: "issued at", iss: "issuer", jti: "jwt id", nonce: "nonce", s_hash: "state hash", sub: "subject", ath: "access token hash", htm: "http method", htu: "http uri", cnf: "confirmation", auth_time: "authentication time" };
      function rF(e10, t10) {
        for (let r10 of e10) if (void 0 === t10.claims[r10]) throw tV(`JWT "${r10}" (${rG[r10]}) claim missing`, r8, { claims: t10.claims });
        return t10;
      }
      let rV = Symbol(), rX = Symbol();
      async function rY(e10, t10, r10, n10) {
        return "string" == typeof n10?.expectedNonce || "number" == typeof n10?.maxAge || n10?.requireIdToken ? rQ(e10, t10, r10, n10.expectedNonce, n10.maxAge, n10[t$], n10.recognizedTokenTypes) : rZ(e10, t10, r10, n10?.[t$], n10?.recognizedTokenTypes);
      }
      async function rQ(e10, t10, r10, n10, a10, i10, o2) {
        let s2 = [];
        switch (n10) {
          case void 0:
            n10 = rV;
            break;
          case rV:
            break;
          default:
            t3(n10, '"expectedNonce" argument'), s2.push("nonce");
        }
        switch (a10 ??= t10.default_max_age) {
          case void 0:
            a10 = rX;
            break;
          case rX:
            break;
          default:
            t8(a10, true, '"maxAge" argument'), s2.push("auth_time");
        }
        let c2 = await rH(e10, t10, r10, s2, i10, o2);
        t3(c2.id_token, '"response" body "id_token" property', r8, { body: c2 });
        let l2 = rL(c2);
        if (a10 !== rX) {
          let e11 = ra() + rr(t10), r11 = rn(t10);
          if (l2.auth_time + a10 < e11 - r11) throw tV("too much time has elapsed since the last End-User authentication", ne, { claims: l2, now: e11, tolerance: r11, claim: "auth_time" });
        }
        if (n10 === rV) {
          if (void 0 !== l2.nonce) throw tV('unexpected ID Token "nonce" claim value', nt, { expected: void 0, claims: l2, claim: "nonce" });
        } else if (l2.nonce !== n10) throw tV('unexpected ID Token "nonce" claim value', nt, { expected: n10, claims: l2, claim: "nonce" });
        return c2;
      }
      async function rZ(e10, t10, r10, n10, a10) {
        let i10 = await rH(e10, t10, r10, void 0, n10, a10), o2 = rL(i10);
        if (o2) {
          if (void 0 !== t10.default_max_age) {
            t8(t10.default_max_age, true, '"client.default_max_age"');
            let e11 = ra() + rr(t10), r11 = rn(t10);
            if (o2.auth_time + t10.default_max_age < e11 - r11) throw tV("too much time has elapsed since the last End-User authentication", ne, { claims: o2, now: e11, tolerance: r11, claim: "auth_time" });
          }
          if (void 0 !== o2.nonce) throw tV('unexpected ID Token "nonce" claim value', nt, { expected: void 0, claims: o2, claim: "nonce" });
        }
        return i10;
      }
      let r0 = "OAUTH_WWW_AUTHENTICATE_CHALLENGE", r1 = "OAUTH_RESPONSE_BODY_ERROR", r2 = "OAUTH_UNSUPPORTED_OPERATION", r4 = "OAUTH_AUTHORIZATION_RESPONSE_ERROR", r5 = "OAUTH_PARSE_ERROR", r8 = "OAUTH_INVALID_RESPONSE", r3 = "OAUTH_RESPONSE_IS_NOT_JSON", r6 = "OAUTH_RESPONSE_IS_NOT_CONFORM", r9 = "OAUTH_HTTP_REQUEST_FORBIDDEN", r7 = "OAUTH_REQUEST_PROTOCOL_FORBIDDEN", ne = "OAUTH_JWT_TIMESTAMP_CHECK_FAILED", nt = "OAUTH_JWT_CLAIM_COMPARISON_FAILED", nr = "OAUTH_JSON_ATTRIBUTE_COMPARISON_FAILED", nn = "OAUTH_MISSING_SERVER_METADATA", na = "OAUTH_INVALID_SERVER_METADATA";
      async function ni(e10, t10, r10, n10, a10, i10) {
        return ri(e10), ro(t10), t3(n10, '"grantType"'), rD(e10, t10, r10, n10, new URLSearchParams(a10), i10);
      }
      async function no(e10, t10, r10, n10) {
        return rH(e10, t10, r10, void 0, n10?.[t$], n10?.recognizedTokenTypes);
      }
      function ns(e10) {
        if (e10.bodyUsed) throw tj('"response" body has been used already', tD);
      }
      function nc(e10) {
        let { algorithm: t10 } = e10;
        if ("number" != typeof t10.modulusLength || t10.modulusLength < 2048) throw new tG(`unsupported ${t10.name} modulusLength`, { cause: e10 });
      }
      async function nl(e10, t10, r10, n10, a10) {
        let i10, o2, { 0: s2, 1: c2, length: l2 } = e10.split(".");
        if (5 === l2) if (void 0 !== a10) e10 = await a10(e10), { 0: s2, 1: c2, length: l2 } = e10.split(".");
        else throw new tG("JWE decryption is not configured", { cause: e10 });
        if (3 !== l2) throw tV("Invalid JWT", r8, e10);
        try {
          i10 = JSON.parse(tJ(tz(s2)));
        } catch (e11) {
          throw tV("failed to parse JWT Header body as base64url encoded JSON", r5, e11);
        }
        if (!tZ(i10)) throw tV("JWT Header must be a top level object", r8, e10);
        if (t10(i10), void 0 !== i10.crit) throw new tG('no JWT "crit" header parameter extensions are supported', { cause: { header: i10 } });
        try {
          o2 = JSON.parse(tJ(tz(c2)));
        } catch (e11) {
          throw tV("failed to parse JWT Payload body as base64url encoded JSON", r5, e11);
        }
        if (!tZ(o2)) throw tV("JWT Payload must be a top level object", r8, e10);
        let u2 = ra() + r10;
        if (void 0 !== o2.exp) {
          if ("number" != typeof o2.exp) throw tV('unexpected JWT "exp" (expiration time) claim type', r8, { claims: o2 });
          if (o2.exp <= u2 - n10) throw tV('unexpected JWT "exp" (expiration time) claim value, expiration is past current timestamp', ne, { claims: o2, now: u2, tolerance: n10, claim: "exp" });
        }
        if (void 0 !== o2.iat && "number" != typeof o2.iat) throw tV('unexpected JWT "iat" (issued at) claim type', r8, { claims: o2 });
        if (void 0 !== o2.iss && "string" != typeof o2.iss) throw tV('unexpected JWT "iss" (issuer) claim type', r8, { claims: o2 });
        if (void 0 !== o2.nbf) {
          if ("number" != typeof o2.nbf) throw tV('unexpected JWT "nbf" (not before) claim type', r8, { claims: o2 });
          if (o2.nbf > u2 + n10) throw tV('unexpected JWT "nbf" (not before) claim value', ne, { claims: o2, now: u2, tolerance: n10, claim: "nbf" });
        }
        if (void 0 !== o2.aud && "string" != typeof o2.aud && !Array.isArray(o2.aud)) throw tV('unexpected JWT "aud" (audience) claim type', r8, { claims: o2 });
        return { header: i10, claims: o2, jwt: e10 };
      }
      function nu(e10, t10, r10, n10) {
        if (void 0 !== e10) {
          if ("string" == typeof e10 ? n10.alg !== e10 : !e10.includes(n10.alg)) throw tV('unexpected JWT "alg" header parameter', r8, { header: n10, expected: e10, reason: "client configuration" });
          return;
        }
        if (Array.isArray(t10)) {
          if (!t10.includes(n10.alg)) throw tV('unexpected JWT "alg" header parameter', r8, { header: n10, expected: t10, reason: "authorization server metadata" });
          return;
        }
        if (void 0 !== r10) {
          if ("string" == typeof r10 ? n10.alg !== r10 : "function" == typeof r10 ? !r10(n10.alg) : !r10.includes(n10.alg)) throw tV('unexpected JWT "alg" header parameter', r8, { header: n10, expected: r10, reason: "default value" });
          return;
        }
        throw tV('missing client or server configuration to verify used JWT "alg" header parameter', void 0, { client: e10, issuer: t10, fallback: r10 });
      }
      function nd(e10, t10) {
        let { 0: r10, length: n10 } = e10.getAll(t10);
        if (n10 > 1) throw tV(`"${t10}" parameter must be provided only once`, r8);
        return r10;
      }
      let nh = Symbol(), np = Symbol();
      async function nf(e10, t10, r10, n10, a10) {
        ri(e10), ro(t10);
        let i10 = rf(e10, "backchannel_authentication_endpoint", t10.use_mtls_endpoint_aliases, a10?.[tU] !== true), o2 = new URLSearchParams(n10);
        o2.set("client_id", t10.client_id);
        let s2 = t0(a10?.headers);
        return s2.set("accept", "application/json"), rI(e10, t10, r10, i10, o2, s2, a10);
      }
      async function ng(e10, t10, r10) {
        if (ri(e10), ro(t10), !tI(r10, Response)) throw tj('"response" must be an instance of Response', tM);
        await rC(r10, 200, "Backchannel Authentication Endpoint"), ns(r10);
        let n10 = await nw(r10);
        t3(n10.auth_req_id, '"response" body "auth_req_id" property', r8, { body: n10 });
        let a10 = "number" != typeof n10.expires_in ? parseFloat(n10.expires_in) : n10.expires_in;
        return t8(a10, true, '"response" body "expires_in" property', r8, { body: n10 }), n10.expires_in = a10, void 0 !== n10.interval && t8(n10.interval, false, '"response" body "interval" property', r8, { body: n10 }), n10;
      }
      async function ny(e10, t10, r10, n10, a10) {
        ri(e10), ro(t10), t3(n10, '"authReqId"');
        let i10 = new URLSearchParams(a10?.additionalParameters);
        return i10.set("auth_req_id", n10), rD(e10, t10, r10, "urn:openid:params:grant-type:ciba", i10, a10);
      }
      async function nm(e10, t10, r10, n10) {
        return rH(e10, t10, r10, void 0, n10?.[t$], n10?.recognizedTokenTypes);
      }
      async function nw(e10, t10 = t9) {
        let r10;
        try {
          r10 = await e10.json();
        } catch (r11) {
          throw t10(e10), tV('failed to parse "response" body as JSON', r5, r11);
        }
        if (!tZ(r10)) throw tV('"response" body must be a top level object', r8, { body: r10 });
        return r10;
      }
      let nb = Symbol(), n_ = Symbol();
      function nv() {
        return "string" == typeof globalThis.EdgeRuntime;
      }
      let nE = async (e10) => {
        let t10 = e10?.delay ?? 100, r10 = e10?.jitter ?? true, n10 = t10;
        r10 && (n10 = t10 * (0.5 + 0.5 * Math.random())), await new Promise((e11) => setTimeout(e11, n10));
      };
      async function nS(e10, t10) {
        if (!t10?.isDPoPEnabled) return await e10();
        try {
          let r10 = await e10();
          if (r10 instanceof Response && 400 === r10.status) try {
            let n10 = await r10.clone().json();
            if ("use_dpop_nonce" === n10.error) return await nE(t10), await e10();
          } catch {
          }
          return r10;
        } catch (r10) {
          if (rm(r10)) return await nE(t10), await e10();
          throw r10;
        }
      }
      function nA(e10, t10) {
        if (e10) {
          if ("string" == typeof e10) return e10;
          if (!t10) throw new tb("When defining scope as a Map, an audience is required to look up the correct scope.");
          return e10[t10];
        }
      }
      function nT(e10, t10) {
        return { accessToken: e10.accessToken, expiresAt: e10.expiresAt, audience: t10.audience, scope: e10.scope, requestedScope: e10.requestedScope, ...e10.token_type && { token_type: e10.token_type } };
      }
      function nP(e10) {
        return e10 ? e10.trim().split(" ").filter(Boolean) : [];
      }
      let nR = (e10, t10, r10 = {}) => {
        if (e10 === t10) return true;
        if (!e10 || !t10) return false;
        let n10 = new Set(nP(e10)), a10 = new Set(nP(t10)), i10 = Array.from(a10).every((e11) => n10.has(e11));
        return r10.strict ? i10 && n10.size === a10.size : i10;
      };
      function nk(e10, t10) {
        return Array.from(/* @__PURE__ */ new Set([...e10 ? nP(e10) : [], ...t10 ? nP(t10) : []])).join(" ");
      }
      function nC(e10, t10) {
        let r10 = t10.matchMode ?? "requestedScope", n10 = e10?.accessTokens;
        if (!n10 || 0 === n10.length) return;
        let a10 = n10.filter((e11) => e11.audience === t10.audience && nR("scope" === r10 ? e11.scope : e11.requestedScope ?? e11.scope, t10.scope, { strict: "scope" === r10 }));
        if (0 !== a10.length) return a10.sort((e11, t11) => {
          let r11 = new Set(nP(e11.scope)), n11 = new Set(nP(t11.scope));
          return r11.size - n11.size;
        }), a10[0];
      }
      function nx(e10, t10, r10) {
        if (r10) return { accessTokens: r10.accessTokens, tokenSet: { ...e10.tokenSet, idToken: t10.idToken, refreshToken: t10.refreshToken } };
      }
      function nO(e10, t10, r10) {
        let n10, a10, i10 = nA(r10.scope, t10.audience ?? r10.audience);
        if (n10 = !t10.audience || t10.audience === (e10.tokenSet.audience ?? r10.audience), a10 = !t10.requestedScope || nR(e10.tokenSet.requestedScope ?? i10, t10.requestedScope), n10 && a10) return t10.accessToken !== e10.tokenSet.accessToken || t10.expiresAt !== e10.tokenSet.expiresAt || t10.refreshToken !== e10.tokenSet.refreshToken ? { tokenSet: t10 } : void 0;
        let o2 = t10.audience ?? r10.audience, s2 = t10.requestedScope ?? i10 ?? void 0;
        if (o2) return function(e11, t11, r11, n11) {
          var a11;
          let i11 = nC(e11, { scope: n11, audience: r11, matchMode: "requestedScope" });
          if (i11) {
            let n12 = function(e12, t12, r12, n13) {
              if (t12.accessToken !== r12.accessToken) return { accessTokens: e12.accessTokens?.map((e13) => e13 === r12 ? nT(t12, { audience: n13 }) : e13) };
            }(e11, t11, i11, r11);
            return nx(e11, t11, n12);
          }
          if (i11 = nC(e11, { scope: t11.scope, audience: r11, matchMode: "scope" })) {
            let n12 = (a11 = i11, { accessTokens: e11.accessTokens?.map((e12) => e12 === a11 ? nT({ ...t11, requestedScope: nk(e12.requestedScope, t11.requestedScope), scope: t11.scope }, { audience: r11 }) : e12) });
            return nx(e11, t11, n12);
          }
          {
            let n12 = { accessTokens: [...e11.accessTokens || [], nT(t11, { audience: r11 })] };
            return nx(e11, t11, n12);
          }
        }(e10, t10, o2, s2);
      }
      function nN(e10, t10, ...r10) {
        if ((r10 = r10.filter(Boolean)).length > 2) {
          let t11 = r10.pop();
          e10 += `one of type ${r10.join(", ")}, or ${t11}.`;
        } else 2 === r10.length ? e10 += `one of type ${r10[0]} or ${r10[1]}.` : e10 += `of type ${r10[0]}.`;
        return null == t10 ? e10 += ` Received ${t10}` : "function" == typeof t10 && t10.name ? e10 += ` Received function ${t10.name}` : "object" == typeof t10 && null != t10 && t10.constructor?.name && (e10 += ` Received an instance of ${t10.constructor.name}`), e10;
      }
      let nI = (e10, ...t10) => nN("Key must be ", e10, ...t10), nD = (e10, t10, ...r10) => nN(`Key for the ${e10} algorithm must be `, t10, ...r10);
      function nM(e10) {
        if (Uint8Array.fromBase64) return Uint8Array.fromBase64(e10);
        let t10 = atob(e10), r10 = new Uint8Array(t10.length);
        for (let e11 = 0; e11 < t10.length; e11++) r10[e11] = t10.charCodeAt(e11);
        return r10;
      }
      class nj extends Error {
        static code = "ERR_JOSE_GENERIC";
        code = "ERR_JOSE_GENERIC";
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class nU extends nj {
        static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        claim;
        reason;
        payload;
        constructor(e10, t10, r10 = "unspecified", n10 = "unspecified") {
          super(e10, { cause: { claim: r10, reason: n10, payload: t10 } }), this.claim = r10, this.reason = n10, this.payload = t10;
        }
      }
      class nL extends nj {
        static code = "ERR_JWT_EXPIRED";
        code = "ERR_JWT_EXPIRED";
        claim;
        reason;
        payload;
        constructor(e10, t10, r10 = "unspecified", n10 = "unspecified") {
          super(e10, { cause: { claim: r10, reason: n10, payload: t10 } }), this.claim = r10, this.reason = n10, this.payload = t10;
        }
      }
      class nH extends nj {
        static code = "ERR_JOSE_ALG_NOT_ALLOWED";
        code = "ERR_JOSE_ALG_NOT_ALLOWED";
      }
      class nK extends nj {
        static code = "ERR_JOSE_NOT_SUPPORTED";
        code = "ERR_JOSE_NOT_SUPPORTED";
      }
      class nW extends nj {
        static code = "ERR_JWE_DECRYPTION_FAILED";
        code = "ERR_JWE_DECRYPTION_FAILED";
        constructor(e10 = "decryption operation failed", t10) {
          super(e10, t10);
        }
      }
      class n$ extends nj {
        static code = "ERR_JWE_INVALID";
        code = "ERR_JWE_INVALID";
      }
      class nq extends nj {
        static code = "ERR_JWS_INVALID";
        code = "ERR_JWS_INVALID";
      }
      class nB extends nj {
        static code = "ERR_JWT_INVALID";
        code = "ERR_JWT_INVALID";
      }
      class nJ extends nj {
        static code = "ERR_JWK_INVALID";
        code = "ERR_JWK_INVALID";
      }
      class nz extends nj {
        static code = "ERR_JWKS_INVALID";
        code = "ERR_JWKS_INVALID";
      }
      class nG extends nj {
        static code = "ERR_JWKS_NO_MATCHING_KEY";
        code = "ERR_JWKS_NO_MATCHING_KEY";
        constructor(e10 = "no applicable key found in the JSON Web Key Set", t10) {
          super(e10, t10);
        }
      }
      class nF extends nj {
        [Symbol.asyncIterator];
        static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        constructor(e10 = "multiple matching keys found in the JSON Web Key Set", t10) {
          super(e10, t10);
        }
      }
      class nV extends nj {
        static code = "ERR_JWKS_TIMEOUT";
        code = "ERR_JWKS_TIMEOUT";
        constructor(e10 = "request timed out", t10) {
          super(e10, t10);
        }
      }
      class nX extends nj {
        static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        constructor(e10 = "signature verification failed", t10) {
          super(e10, t10);
        }
      }
      function nY(e10) {
        if (!nQ(e10)) throw Error("CryptoKey instance expected");
      }
      let nQ = (e10) => {
        if (e10?.[Symbol.toStringTag] === "CryptoKey") return true;
        try {
          return e10 instanceof CryptoKey;
        } catch {
          return false;
        }
      }, nZ = (e10) => e10?.[Symbol.toStringTag] === "KeyObject", n0 = (e10) => nQ(e10) || nZ(e10), n1 = (e10, t10) => {
        if (e10.byteLength !== t10.length) return false;
        for (let r10 = 0; r10 < e10.byteLength; r10++) if (e10[r10] !== t10[r10]) return false;
        return true;
      }, n2 = (e10) => {
        let t10 = e10.data[e10.pos++];
        if (128 & t10) {
          let r10 = 127 & t10, n10 = 0;
          for (let t11 = 0; t11 < r10; t11++) n10 = n10 << 8 | e10.data[e10.pos++];
          return n10;
        }
        return t10;
      }, n4 = (e10, t10, r10) => {
        if (e10.data[e10.pos++] !== t10) throw Error(r10);
      }, n5 = (e10, t10) => {
        let r10 = e10.data.subarray(e10.pos, e10.pos + t10);
        return e10.pos += t10, r10;
      }, n8 = async (e10, t10, r10, n10) => {
        let a10, i10, o2 = "spki" === e10, s2 = () => o2 ? ["verify"] : ["sign"];
        switch (r10) {
          case "PS256":
          case "PS384":
          case "PS512":
            a10 = { name: "RSA-PSS", hash: `SHA-${r10.slice(-3)}` }, i10 = s2();
            break;
          case "RS256":
          case "RS384":
          case "RS512":
            a10 = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${r10.slice(-3)}` }, i10 = s2();
            break;
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            a10 = { name: "RSA-OAEP", hash: `SHA-${parseInt(r10.slice(-3), 10) || 1}` }, i10 = o2 ? ["encrypt", "wrapKey"] : ["decrypt", "unwrapKey"];
            break;
          case "ES256":
          case "ES384":
          case "ES512":
            a10 = { name: "ECDSA", namedCurve: { ES256: "P-256", ES384: "P-384", ES512: "P-521" }[r10] }, i10 = s2();
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW":
            try {
              let e11 = n10.getNamedCurve(t10);
              a10 = "X25519" === e11 ? { name: "X25519" } : { name: "ECDH", namedCurve: e11 };
            } catch (e11) {
              throw new nK("Invalid or unsupported key format");
            }
            i10 = o2 ? [] : ["deriveBits"];
            break;
          case "Ed25519":
          case "EdDSA":
            a10 = { name: "Ed25519" }, i10 = s2();
            break;
          case "ML-DSA-44":
          case "ML-DSA-65":
          case "ML-DSA-87":
            a10 = { name: r10 }, i10 = s2();
            break;
          default:
            throw new nK('Invalid or unsupported "alg" (Algorithm) value');
        }
        return crypto.subtle.importKey(e10, t10, a10, n10?.extractable ?? !!o2, i10);
      }, n3 = new TextEncoder(), n6 = new TextDecoder();
      function n9(...e10) {
        let t10 = new Uint8Array(e10.reduce((e11, { length: t11 }) => e11 + t11, 0)), r10 = 0;
        for (let n10 of e10) t10.set(n10, r10), r10 += n10.length;
        return t10;
      }
      function n7(e10, t10, r10) {
        if (t10 < 0 || t10 >= 4294967296) throw RangeError(`value must be >= 0 and <= ${4294967296 - 1}. Received ${t10}`);
        e10.set([t10 >>> 24, t10 >>> 16, t10 >>> 8, 255 & t10], r10);
      }
      function ae(e10) {
        let t10 = Math.floor(e10 / 4294967296), r10 = new Uint8Array(8);
        return n7(r10, t10, 0), n7(r10, e10 % 4294967296, 4), r10;
      }
      function at(e10) {
        let t10 = new Uint8Array(4);
        return n7(t10, e10), t10;
      }
      function ar(e10) {
        let t10 = new Uint8Array(e10.length);
        for (let r10 = 0; r10 < e10.length; r10++) {
          let n10 = e10.charCodeAt(r10);
          if (n10 > 127) throw TypeError("non-ASCII string encountered in encode()");
          t10[r10] = n10;
        }
        return t10;
      }
      function an(e10) {
        if (Uint8Array.fromBase64) return Uint8Array.fromBase64("string" == typeof e10 ? e10 : n6.decode(e10), { alphabet: "base64url" });
        let t10 = e10;
        t10 instanceof Uint8Array && (t10 = n6.decode(t10)), t10 = t10.replace(/-/g, "+").replace(/_/g, "/");
        try {
          return nM(t10);
        } catch {
          throw TypeError("The input to be decoded is not correctly encoded.");
        }
      }
      function aa(e10) {
        let t10 = e10;
        return ("string" == typeof t10 && (t10 = n3.encode(t10)), Uint8Array.prototype.toBase64) ? t10.toBase64({ alphabet: "base64url", omitPadding: true }) : function(e11) {
          if (Uint8Array.prototype.toBase64) return e11.toBase64();
          let t11 = [];
          for (let r10 = 0; r10 < e11.length; r10 += 32768) t11.push(String.fromCharCode.apply(null, e11.subarray(r10, r10 + 32768)));
          return btoa(t11.join(""));
        }(t10).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }
      async function ai(e10) {
        if (nZ(e10)) if ("secret" !== e10.type) return e10.export({ format: "jwk" });
        else e10 = e10.export();
        if (e10 instanceof Uint8Array) return { kty: "oct", k: aa(e10) };
        if (!nQ(e10)) throw TypeError(nI(e10, "CryptoKey", "KeyObject", "Uint8Array"));
        if (!e10.extractable) throw TypeError("non-extractable CryptoKey cannot be exported as a JWK");
        let { ext: t10, key_ops: r10, alg: n10, use: a10, ...i10 } = await crypto.subtle.exportKey("jwk", e10);
        return "AKP" === i10.kty && (i10.alg = n10), i10;
      }
      async function ao(e10) {
        return ai(e10);
      }
      async function as(e10, t10) {
        let r10 = `SHA-${e10.slice(-3)}`;
        return new Uint8Array(await crypto.subtle.digest(r10, t10));
      }
      function ac(e10) {
        if ("object" != typeof e10 || null === e10 || "[object Object]" !== Object.prototype.toString.call(e10)) return false;
        if (null === Object.getPrototypeOf(e10)) return true;
        let t10 = e10;
        for (; null !== Object.getPrototypeOf(t10); ) t10 = Object.getPrototypeOf(t10);
        return Object.getPrototypeOf(e10) === t10;
      }
      e.s(["decode", () => an, "encode", () => aa], 422423);
      let al = (e10) => ac(e10) && "string" == typeof e10.kty, au = (e10, t10) => {
        if ("string" != typeof e10 || !e10) throw new nJ(`${t10} missing or invalid`);
      };
      async function ad(e10, t10) {
        let r10, n10;
        if (al(e10)) r10 = e10;
        else if (n0(e10)) r10 = await ao(e10);
        else throw TypeError(nI(e10, "CryptoKey", "KeyObject", "JSON Web Key"));
        if ("sha256" !== (t10 ??= "sha256") && "sha384" !== t10 && "sha512" !== t10) throw TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
        switch (r10.kty) {
          case "AKP":
            au(r10.alg, '"alg" (Algorithm) Parameter'), au(r10.pub, '"pub" (Public key) Parameter'), n10 = { alg: r10.alg, kty: r10.kty, pub: r10.pub };
            break;
          case "EC":
            au(r10.crv, '"crv" (Curve) Parameter'), au(r10.x, '"x" (X Coordinate) Parameter'), au(r10.y, '"y" (Y Coordinate) Parameter'), n10 = { crv: r10.crv, kty: r10.kty, x: r10.x, y: r10.y };
            break;
          case "OKP":
            au(r10.crv, '"crv" (Subtype of Key Pair) Parameter'), au(r10.x, '"x" (Public Key) Parameter'), n10 = { crv: r10.crv, kty: r10.kty, x: r10.x };
            break;
          case "RSA":
            au(r10.e, '"e" (Exponent) Parameter'), au(r10.n, '"n" (Modulus) Parameter'), n10 = { e: r10.e, kty: r10.kty, n: r10.n };
            break;
          case "oct":
            au(r10.k, '"k" (Key Value) Parameter'), n10 = { k: r10.k, kty: r10.kty };
            break;
          default:
            throw new nK('"kty" (Key Type) Parameter missing or unsupported');
        }
        let a10 = ar(JSON.stringify(n10));
        return aa(await as(t10, a10));
      }
      async function ah(e10) {
        if (!e10.alg) throw TypeError('"alg" argument is required when "jwk.alg" is not present');
        let { algorithm: t10, keyUsages: r10 } = function(e11) {
          let t11, r11;
          switch (e11.kty) {
            case "AKP":
              switch (e11.alg) {
                case "ML-DSA-44":
                case "ML-DSA-65":
                case "ML-DSA-87":
                  t11 = { name: e11.alg }, r11 = e11.priv ? ["sign"] : ["verify"];
                  break;
                default:
                  throw new nK('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            case "RSA":
              switch (e11.alg) {
                case "PS256":
                case "PS384":
                case "PS512":
                  t11 = { name: "RSA-PSS", hash: `SHA-${e11.alg.slice(-3)}` }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RS256":
                case "RS384":
                case "RS512":
                  t11 = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${e11.alg.slice(-3)}` }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RSA-OAEP":
                case "RSA-OAEP-256":
                case "RSA-OAEP-384":
                case "RSA-OAEP-512":
                  t11 = { name: "RSA-OAEP", hash: `SHA-${parseInt(e11.alg.slice(-3), 10) || 1}` }, r11 = e11.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
                  break;
                default:
                  throw new nK('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            case "EC":
              switch (e11.alg) {
                case "ES256":
                  t11 = { name: "ECDSA", namedCurve: "P-256" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ES384":
                  t11 = { name: "ECDSA", namedCurve: "P-384" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ES512":
                  t11 = { name: "ECDSA", namedCurve: "P-521" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t11 = { name: "ECDH", namedCurve: e11.crv }, r11 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new nK('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            case "OKP":
              switch (e11.alg) {
                case "Ed25519":
                case "EdDSA":
                  t11 = { name: "Ed25519" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t11 = { name: e11.crv }, r11 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new nK('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            default:
              throw new nK('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
          }
          return { algorithm: t11, keyUsages: r11 };
        }(e10), n10 = { ...e10 };
        return "AKP" !== n10.kty && delete n10.alg, delete n10.use, crypto.subtle.importKey("jwk", n10, t10, e10.ext ?? (!e10.d && !e10.priv), e10.key_ops ?? r10);
      }
      async function ap(e10, t10, r10) {
        let n10, a10, i10;
        if ("string" != typeof e10 || 0 !== e10.indexOf("-----BEGIN PRIVATE KEY-----")) throw TypeError('"pkcs8" must be PKCS#8 formatted string');
        return n10 = /(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, a10 = nM(e10.replace(n10, "")), i10 = r10, t10?.startsWith?.("ECDH-ES") && ((i10 ||= {}).getNamedCurve = (e11) => {
          let t11, r11 = { data: e11, pos: 0 };
          return n4(r11, 48, "Invalid PKCS#8 structure"), n2(r11), n4(r11, 2, "Expected version field"), t11 = n2(r11), r11.pos += t11, n4(r11, 48, "Expected algorithm identifier"), n2(r11), r11.pos, ((e12) => {
            let t12, r12 = (n4(e12, 6, "Expected algorithm OID"), t12 = n2(e12), n5(e12, t12));
            if (n1(r12, [43, 101, 110])) return "X25519";
            if (!n1(r12, [42, 134, 72, 206, 61, 2, 1])) throw Error("Unsupported key algorithm");
            n4(e12, 6, "Expected curve OID");
            let n11 = n2(e12), a11 = n5(e12, n11);
            for (let { name: e13, oid: t13 } of [{ name: "P-256", oid: [42, 134, 72, 206, 61, 3, 1, 7] }, { name: "P-384", oid: [43, 129, 4, 0, 34] }, { name: "P-521", oid: [43, 129, 4, 0, 35] }]) if (n1(a11, t13)) return e13;
            throw Error("Unsupported named curve");
          })(r11);
        }), n8("pkcs8", a10, t10, i10);
      }
      async function af(e10, t10, r10) {
        let n10;
        if (!ac(e10)) throw TypeError("JWK must be an object");
        switch (t10 ??= e10.alg, n10 ??= r10?.extractable ?? e10.ext, e10.kty) {
          case "oct":
            if ("string" != typeof e10.k || !e10.k) throw TypeError('missing "k" (Key Value) Parameter value');
            return an(e10.k);
          case "RSA":
            if ("oth" in e10 && void 0 !== e10.oth) throw new nK('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
            return ah({ ...e10, alg: t10, ext: n10 });
          case "AKP":
            if ("string" != typeof e10.alg || !e10.alg) throw TypeError('missing "alg" (Algorithm) Parameter value');
            if (void 0 !== t10 && t10 !== e10.alg) throw TypeError("JWK alg and alg option value mismatch");
            return ah({ ...e10, ext: n10 });
          case "EC":
          case "OKP":
            return ah({ ...e10, alg: t10, ext: n10 });
          default:
            throw new nK('Unsupported "kty" (Key Type) Parameter value');
        }
      }
      function ag(e10) {
        return ac(e10);
      }
      class ay {
        #l;
        #u = /* @__PURE__ */ new WeakMap();
        constructor(e10) {
          if (!function(e11) {
            return e11 && "object" == typeof e11 && Array.isArray(e11.keys) && e11.keys.every(ag);
          }(e10)) throw new nz("JSON Web Key Set malformed");
          this.#l = structuredClone(e10);
        }
        jwks() {
          return this.#l;
        }
        async getKey(e10, t10) {
          let { alg: r10, kid: n10 } = { ...e10, ...t10?.header }, a10 = function(e11) {
            switch ("string" == typeof e11 && e11.slice(0, 2)) {
              case "RS":
              case "PS":
                return "RSA";
              case "ES":
                return "EC";
              case "Ed":
                return "OKP";
              case "ML":
                return "AKP";
              default:
                throw new nK('Unsupported "alg" value for a JSON Web Key Set');
            }
          }(r10), i10 = this.#l.keys.filter((e11) => {
            let t11 = a10 === e11.kty;
            if (t11 && "string" == typeof n10 && (t11 = n10 === e11.kid), t11 && ("string" == typeof e11.alg || "AKP" === a10) && (t11 = r10 === e11.alg), t11 && "string" == typeof e11.use && (t11 = "sig" === e11.use), t11 && Array.isArray(e11.key_ops) && (t11 = e11.key_ops.includes("verify")), t11) switch (r10) {
              case "ES256":
                t11 = "P-256" === e11.crv;
                break;
              case "ES384":
                t11 = "P-384" === e11.crv;
                break;
              case "ES512":
                t11 = "P-521" === e11.crv;
                break;
              case "Ed25519":
              case "EdDSA":
                t11 = "Ed25519" === e11.crv;
            }
            return t11;
          }), { 0: o2, length: s2 } = i10;
          if (0 === s2) throw new nG();
          if (1 !== s2) {
            let e11 = new nF(), t11 = this.#u;
            throw e11[Symbol.asyncIterator] = async function* () {
              for (let e12 of i10) try {
                yield await am(t11, e12, r10);
              } catch {
              }
            }, e11;
          }
          return am(this.#u, o2, r10);
        }
      }
      async function am(e10, t10, r10) {
        let n10 = e10.get(t10) || e10.set(t10, {}).get(t10);
        if (void 0 === n10[r10]) {
          let e11 = await af({ ...t10, ext: true }, r10);
          if (e11 instanceof Uint8Array || "public" !== e11.type) throw new nz("JSON Web Key Set members must be public keys");
          n10[r10] = e11;
        }
        return n10[r10];
      }
      function aw(e10) {
        let t10 = new ay(e10), r10 = async (e11, r11) => t10.getKey(e11, r11);
        return Object.defineProperties(r10, { jwks: { value: () => structuredClone(t10.jwks()), enumerable: false, configurable: false, writable: false } }), r10;
      }
      "undefined" != typeof navigator && navigator.userAgent?.startsWith?.("Mozilla/5.0 ") || (o = "jose/v6.1.2");
      let ab = Symbol();
      async function a_(e10, t10, r10, n10 = fetch) {
        let a10 = await n10(e10, { method: "GET", signal: r10, redirect: "manual", headers: t10 }).catch((e11) => {
          if ("TimeoutError" === e11.name) throw new nV();
          throw e11;
        });
        if (200 !== a10.status) throw new nj("Expected 200 OK from the JSON Web Key Set HTTP response");
        try {
          return await a10.json();
        } catch {
          throw new nj("Failed to parse the JSON Web Key Set HTTP response as JSON");
        }
      }
      let av = Symbol();
      class aE {
        #d;
        #h;
        #p;
        #f;
        #g;
        #y;
        #m;
        #w;
        #b;
        #_;
        constructor(e10, t10) {
          if (!(e10 instanceof URL)) throw TypeError("url must be an instance of URL");
          this.#d = new URL(e10.href), this.#h = "number" == typeof t10?.timeoutDuration ? t10?.timeoutDuration : 5e3, this.#p = "number" == typeof t10?.cooldownDuration ? t10?.cooldownDuration : 3e4, this.#f = "number" == typeof t10?.cacheMaxAge ? t10?.cacheMaxAge : 6e5, this.#m = new Headers(t10?.headers), o && !this.#m.has("User-Agent") && this.#m.set("User-Agent", o), this.#m.has("accept") || (this.#m.set("accept", "application/json"), this.#m.append("accept", "application/jwk-set+json")), this.#w = t10?.[ab], t10?.[av] !== void 0 && (this.#_ = t10?.[av], function(e11, t11) {
            return !("object" != typeof e11 || null === e11 || !("uat" in e11) || "number" != typeof e11.uat || Date.now() - e11.uat >= t11) && "jwks" in e11 && !!ac(e11.jwks) && !!Array.isArray(e11.jwks.keys) && !!Array.prototype.every.call(e11.jwks.keys, ac);
          }(t10?.[av], this.#f) && (this.#g = this.#_.uat, this.#b = aw(this.#_.jwks)));
        }
        pendingFetch() {
          return !!this.#y;
        }
        coolingDown() {
          return "number" == typeof this.#g && Date.now() < this.#g + this.#p;
        }
        fresh() {
          return "number" == typeof this.#g && Date.now() < this.#g + this.#f;
        }
        jwks() {
          return this.#b?.jwks();
        }
        async getKey(e10, t10) {
          this.#b && this.fresh() || await this.reload();
          try {
            return await this.#b(e10, t10);
          } catch (r10) {
            if (r10 instanceof nG && false === this.coolingDown()) return await this.reload(), this.#b(e10, t10);
            throw r10;
          }
        }
        async reload() {
          this.#y && ("undefined" != typeof WebSocketPair || "undefined" != typeof navigator && "Cloudflare-Workers" === navigator.userAgent) && (this.#y = void 0), this.#y ||= a_(this.#d.href, this.#m, AbortSignal.timeout(this.#h), this.#w).then((e10) => {
            this.#b = aw(e10), this.#_ && (this.#_.uat = Date.now(), this.#_.jwks = e10), this.#g = Date.now(), this.#y = void 0;
          }).catch((e10) => {
            throw this.#y = void 0, e10;
          }), await this.#y;
        }
      }
      function aS(e10, t10) {
        if (e10.startsWith("RS") || e10.startsWith("PS")) {
          let { modulusLength: r10 } = t10.algorithm;
          if ("number" != typeof r10 || r10 < 2048) throw TypeError(`${e10} requires key modulusLength to be 2048 bits or larger`);
        }
      }
      let aA = (e10, t10 = "algorithm.name") => TypeError(`CryptoKey does not support this operation, its ${t10} must be ${e10}`);
      function aT(e10) {
        return parseInt(e10.name.slice(4), 10);
      }
      function aP(e10, t10) {
        if (t10 && !e10.usages.includes(t10)) throw TypeError(`CryptoKey does not support this operation, its usages must include ${t10}.`);
      }
      function aR(e10, t10, r10) {
        switch (t10) {
          case "A128GCM":
          case "A192GCM":
          case "A256GCM": {
            if ("AES-GCM" !== e10.algorithm.name) throw aA("AES-GCM");
            let r11 = parseInt(t10.slice(1, 4), 10);
            if (e10.algorithm.length !== r11) throw aA(r11, "algorithm.length");
            break;
          }
          case "A128KW":
          case "A192KW":
          case "A256KW": {
            if ("AES-KW" !== e10.algorithm.name) throw aA("AES-KW");
            let r11 = parseInt(t10.slice(1, 4), 10);
            if (e10.algorithm.length !== r11) throw aA(r11, "algorithm.length");
            break;
          }
          case "ECDH":
            switch (e10.algorithm.name) {
              case "ECDH":
              case "X25519":
                break;
              default:
                throw aA("ECDH or X25519");
            }
            break;
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW":
            if ("PBKDF2" !== e10.algorithm.name) throw aA("PBKDF2");
            break;
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512": {
            if ("RSA-OAEP" !== e10.algorithm.name) throw aA("RSA-OAEP");
            let r11 = parseInt(t10.slice(9), 10) || 1;
            if (aT(e10.algorithm.hash) !== r11) throw aA(`SHA-${r11}`, "algorithm.hash");
            break;
          }
          default:
            throw TypeError("CryptoKey does not support this operation");
        }
        aP(e10, r10);
      }
      async function ak(e10, t10, r10) {
        if (t10 instanceof Uint8Array) {
          if (!e10.startsWith("HS")) throw TypeError(nI(t10, "CryptoKey", "KeyObject", "JSON Web Key"));
          return crypto.subtle.importKey("raw", t10, { hash: `SHA-${e10.slice(-3)}`, name: "HMAC" }, false, [r10]);
        }
        return !function(e11, t11, r11) {
          switch (t11) {
            case "HS256":
            case "HS384":
            case "HS512": {
              if ("HMAC" !== e11.algorithm.name) throw aA("HMAC");
              let r12 = parseInt(t11.slice(2), 10);
              if (aT(e11.algorithm.hash) !== r12) throw aA(`SHA-${r12}`, "algorithm.hash");
              break;
            }
            case "RS256":
            case "RS384":
            case "RS512": {
              if ("RSASSA-PKCS1-v1_5" !== e11.algorithm.name) throw aA("RSASSA-PKCS1-v1_5");
              let r12 = parseInt(t11.slice(2), 10);
              if (aT(e11.algorithm.hash) !== r12) throw aA(`SHA-${r12}`, "algorithm.hash");
              break;
            }
            case "PS256":
            case "PS384":
            case "PS512": {
              if ("RSA-PSS" !== e11.algorithm.name) throw aA("RSA-PSS");
              let r12 = parseInt(t11.slice(2), 10);
              if (aT(e11.algorithm.hash) !== r12) throw aA(`SHA-${r12}`, "algorithm.hash");
              break;
            }
            case "Ed25519":
            case "EdDSA":
              if ("Ed25519" !== e11.algorithm.name) throw aA("Ed25519");
              break;
            case "ML-DSA-44":
            case "ML-DSA-65":
            case "ML-DSA-87":
              let n10;
              if (n10 = e11.algorithm, n10.name !== t11) throw aA(t11);
              break;
            case "ES256":
            case "ES384":
            case "ES512": {
              if ("ECDSA" !== e11.algorithm.name) throw aA("ECDSA");
              let r12 = function(e12) {
                switch (e12) {
                  case "ES256":
                    return "P-256";
                  case "ES384":
                    return "P-384";
                  case "ES512":
                    return "P-521";
                  default:
                    throw Error("unreachable");
                }
              }(t11);
              if (e11.algorithm.namedCurve !== r12) throw aA(r12, "algorithm.namedCurve");
              break;
            }
            default:
              throw TypeError("CryptoKey does not support this operation");
          }
          aP(e11, r11);
        }(t10, e10, r10), t10;
      }
      async function aC(e10, t10, r10, n10) {
        let a10 = await ak(e10, t10, "verify");
        aS(e10, a10);
        let i10 = function(e11, t11) {
          let r11 = `SHA-${e11.slice(-3)}`;
          switch (e11) {
            case "HS256":
            case "HS384":
            case "HS512":
              return { hash: r11, name: "HMAC" };
            case "PS256":
            case "PS384":
            case "PS512":
              return { hash: r11, name: "RSA-PSS", saltLength: parseInt(e11.slice(-3), 10) >> 3 };
            case "RS256":
            case "RS384":
            case "RS512":
              return { hash: r11, name: "RSASSA-PKCS1-v1_5" };
            case "ES256":
            case "ES384":
            case "ES512":
              return { hash: r11, name: "ECDSA", namedCurve: t11.namedCurve };
            case "Ed25519":
            case "EdDSA":
              return { name: "Ed25519" };
            case "ML-DSA-44":
            case "ML-DSA-65":
            case "ML-DSA-87":
              return { name: e11 };
            default:
              throw new nK(`alg ${e11} is not supported either by JOSE or your javascript runtime`);
          }
        }(e10, a10.algorithm);
        try {
          return await crypto.subtle.verify(i10, a10, r10, n10);
        } catch {
          return false;
        }
      }
      function ax(...e10) {
        let t10, r10 = e10.filter(Boolean);
        if (0 === r10.length || 1 === r10.length) return true;
        for (let e11 of r10) {
          let r11 = Object.keys(e11);
          if (!t10 || 0 === t10.size) {
            t10 = new Set(r11);
            continue;
          }
          for (let e12 of r11) {
            if (t10.has(e12)) return false;
            t10.add(e12);
          }
        }
        return true;
      }
      let aO = (e10) => e10?.[Symbol.toStringTag], aN = (e10, t10, r10) => {
        if (void 0 !== t10.use) {
          let e11;
          switch (r10) {
            case "sign":
            case "verify":
              e11 = "sig";
              break;
            case "encrypt":
            case "decrypt":
              e11 = "enc";
          }
          if (t10.use !== e11) throw TypeError(`Invalid key for this operation, its "use" must be "${e11}" when present`);
        }
        if (void 0 !== t10.alg && t10.alg !== e10) throw TypeError(`Invalid key for this operation, its "alg" must be "${e10}" when present`);
        if (Array.isArray(t10.key_ops)) {
          let n10;
          switch (true) {
            case ("sign" === r10 || "verify" === r10):
            case "dir" === e10:
            case e10.includes("CBC-HS"):
              n10 = r10;
              break;
            case e10.startsWith("PBES2"):
              n10 = "deriveBits";
              break;
            case /^A\d{3}(?:GCM)?(?:KW)?$/.test(e10):
              n10 = !e10.includes("GCM") && e10.endsWith("KW") ? "encrypt" === r10 ? "wrapKey" : "unwrapKey" : r10;
              break;
            case ("encrypt" === r10 && e10.startsWith("RSA")):
              n10 = "wrapKey";
              break;
            case "decrypt" === r10:
              n10 = e10.startsWith("RSA") ? "unwrapKey" : "deriveBits";
          }
          if (n10 && t10.key_ops?.includes?.(n10) === false) throw TypeError(`Invalid key for this operation, its "key_ops" must include "${n10}" when present`);
        }
        return true;
      };
      function aI(e10, t10, r10) {
        switch (e10.substring(0, 2)) {
          case "A1":
          case "A2":
          case "di":
          case "HS":
          case "PB":
            ((e11, t11, r11) => {
              if (!(t11 instanceof Uint8Array)) {
                if (al(t11)) {
                  if ("oct" === t11.kty && "string" == typeof t11.k && aN(e11, t11, r11)) return;
                  throw TypeError('JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present');
                }
                if (!n0(t11)) throw TypeError(nD(e11, t11, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array"));
                if ("secret" !== t11.type) throw TypeError(`${aO(t11)} instances for symmetric algorithms must be of type "secret"`);
              }
            })(e10, t10, r10);
            break;
          default:
            ((e11, t11, r11) => {
              if (al(t11)) switch (r11) {
                case "decrypt":
                case "sign":
                  if ("oct" !== t11.kty && ("AKP" === t11.kty && "string" == typeof t11.priv || "string" == typeof t11.d) && aN(e11, t11, r11)) return;
                  throw TypeError("JSON Web Key for this operation be a private JWK");
                case "encrypt":
                case "verify":
                  if ("oct" !== t11.kty && void 0 === t11.d && void 0 === t11.priv && aN(e11, t11, r11)) return;
                  throw TypeError("JSON Web Key for this operation be a public JWK");
              }
              if (!n0(t11)) throw TypeError(nD(e11, t11, "CryptoKey", "KeyObject", "JSON Web Key"));
              if ("secret" === t11.type) throw TypeError(`${aO(t11)} instances for asymmetric algorithms must not be of type "secret"`);
              if ("public" === t11.type) switch (r11) {
                case "sign":
                  throw TypeError(`${aO(t11)} instances for asymmetric algorithm signing must be of type "private"`);
                case "decrypt":
                  throw TypeError(`${aO(t11)} instances for asymmetric algorithm decryption must be of type "private"`);
              }
              if ("private" === t11.type) switch (r11) {
                case "verify":
                  throw TypeError(`${aO(t11)} instances for asymmetric algorithm verifying must be of type "public"`);
                case "encrypt":
                  throw TypeError(`${aO(t11)} instances for asymmetric algorithm encryption must be of type "public"`);
              }
            })(e10, t10, r10);
        }
      }
      function aD(e10, t10, r10, n10, a10) {
        let i10;
        if (void 0 !== a10.crit && n10?.crit === void 0) throw new e10('"crit" (Critical) Header Parameter MUST be integrity protected');
        if (!n10 || void 0 === n10.crit) return /* @__PURE__ */ new Set();
        if (!Array.isArray(n10.crit) || 0 === n10.crit.length || n10.crit.some((e11) => "string" != typeof e11 || 0 === e11.length)) throw new e10('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
        for (let o2 of (i10 = void 0 !== r10 ? new Map([...Object.entries(r10), ...t10.entries()]) : t10, n10.crit)) {
          if (!i10.has(o2)) throw new nK(`Extension Header Parameter "${o2}" is not recognized`);
          if (void 0 === a10[o2]) throw new e10(`Extension Header Parameter "${o2}" is missing`);
          if (i10.get(o2) && void 0 === n10[o2]) throw new e10(`Extension Header Parameter "${o2}" MUST be integrity protected`);
        }
        return new Set(n10.crit);
      }
      function aM(e10, t10) {
        if (void 0 !== t10 && (!Array.isArray(t10) || t10.some((e11) => "string" != typeof e11))) throw TypeError(`"${e10}" option must be an array of strings`);
        if (t10) return new Set(t10);
      }
      let aj = async (e10, t10, r10, n10 = false) => {
        let a10 = (s ||= /* @__PURE__ */ new WeakMap()).get(e10);
        if (a10?.[r10]) return a10[r10];
        let i10 = await ah({ ...t10, alg: r10 });
        return n10 && Object.freeze(e10), a10 ? a10[r10] = i10 : s.set(e10, { [r10]: i10 }), i10;
      };
      async function aU(e10, t10) {
        if (e10 instanceof Uint8Array || nQ(e10)) return e10;
        if (nZ(e10)) {
          if ("secret" === e10.type) return e10.export();
          if ("toCryptoKey" in e10 && "function" == typeof e10.toCryptoKey) try {
            return ((e11, t11) => {
              let r11, n10 = (s ||= /* @__PURE__ */ new WeakMap()).get(e11);
              if (n10?.[t11]) return n10[t11];
              let a10 = "public" === e11.type, i10 = !!a10;
              if ("x25519" === e11.asymmetricKeyType) {
                switch (t11) {
                  case "ECDH-ES":
                  case "ECDH-ES+A128KW":
                  case "ECDH-ES+A192KW":
                  case "ECDH-ES+A256KW":
                    break;
                  default:
                    throw TypeError("given KeyObject instance cannot be used for this algorithm");
                }
                r11 = e11.toCryptoKey(e11.asymmetricKeyType, i10, a10 ? [] : ["deriveBits"]);
              }
              if ("ed25519" === e11.asymmetricKeyType) {
                if ("EdDSA" !== t11 && "Ed25519" !== t11) throw TypeError("given KeyObject instance cannot be used for this algorithm");
                r11 = e11.toCryptoKey(e11.asymmetricKeyType, i10, [a10 ? "verify" : "sign"]);
              }
              switch (e11.asymmetricKeyType) {
                case "ml-dsa-44":
                case "ml-dsa-65":
                case "ml-dsa-87":
                  if (t11 !== e11.asymmetricKeyType.toUpperCase()) throw TypeError("given KeyObject instance cannot be used for this algorithm");
                  r11 = e11.toCryptoKey(e11.asymmetricKeyType, i10, [a10 ? "verify" : "sign"]);
              }
              if ("rsa" === e11.asymmetricKeyType) {
                let n11;
                switch (t11) {
                  case "RSA-OAEP":
                    n11 = "SHA-1";
                    break;
                  case "RS256":
                  case "PS256":
                  case "RSA-OAEP-256":
                    n11 = "SHA-256";
                    break;
                  case "RS384":
                  case "PS384":
                  case "RSA-OAEP-384":
                    n11 = "SHA-384";
                    break;
                  case "RS512":
                  case "PS512":
                  case "RSA-OAEP-512":
                    n11 = "SHA-512";
                    break;
                  default:
                    throw TypeError("given KeyObject instance cannot be used for this algorithm");
                }
                if (t11.startsWith("RSA-OAEP")) return e11.toCryptoKey({ name: "RSA-OAEP", hash: n11 }, i10, a10 ? ["encrypt"] : ["decrypt"]);
                r11 = e11.toCryptoKey({ name: t11.startsWith("PS") ? "RSA-PSS" : "RSASSA-PKCS1-v1_5", hash: n11 }, i10, [a10 ? "verify" : "sign"]);
              }
              if ("ec" === e11.asymmetricKeyType) {
                let n11 = (/* @__PURE__ */ new Map([["prime256v1", "P-256"], ["secp384r1", "P-384"], ["secp521r1", "P-521"]])).get(e11.asymmetricKeyDetails?.namedCurve);
                if (!n11) throw TypeError("given KeyObject instance cannot be used for this algorithm");
                "ES256" === t11 && "P-256" === n11 && (r11 = e11.toCryptoKey({ name: "ECDSA", namedCurve: n11 }, i10, [a10 ? "verify" : "sign"])), "ES384" === t11 && "P-384" === n11 && (r11 = e11.toCryptoKey({ name: "ECDSA", namedCurve: n11 }, i10, [a10 ? "verify" : "sign"])), "ES512" === t11 && "P-521" === n11 && (r11 = e11.toCryptoKey({ name: "ECDSA", namedCurve: n11 }, i10, [a10 ? "verify" : "sign"])), t11.startsWith("ECDH-ES") && (r11 = e11.toCryptoKey({ name: "ECDH", namedCurve: n11 }, i10, a10 ? [] : ["deriveBits"]));
              }
              if (!r11) throw TypeError("given KeyObject instance cannot be used for this algorithm");
              return n10 ? n10[t11] = r11 : s.set(e11, { [t11]: r11 }), r11;
            })(e10, t10);
          } catch (e11) {
            if (e11 instanceof TypeError) throw e11;
          }
          let r10 = e10.export({ format: "jwk" });
          return aj(e10, r10, t10);
        }
        if (al(e10)) return e10.k ? an(e10.k) : aj(e10, e10, t10, true);
        throw Error("unreachable");
      }
      async function aL(e10, t10, r10) {
        let n10, a10;
        if (!ac(e10)) throw new nq("Flattened JWS must be an object");
        if (void 0 === e10.protected && void 0 === e10.header) throw new nq('Flattened JWS must have either of the "protected" or "header" members');
        if (void 0 !== e10.protected && "string" != typeof e10.protected) throw new nq("JWS Protected Header incorrect type");
        if (void 0 === e10.payload) throw new nq("JWS Payload missing");
        if ("string" != typeof e10.signature) throw new nq("JWS Signature missing or incorrect type");
        if (void 0 !== e10.header && !ac(e10.header)) throw new nq("JWS Unprotected Header incorrect type");
        let i10 = {};
        if (e10.protected) try {
          let t11 = an(e10.protected);
          i10 = JSON.parse(n6.decode(t11));
        } catch {
          throw new nq("JWS Protected Header is invalid");
        }
        if (!ax(i10, e10.header)) throw new nq("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
        let o2 = { ...i10, ...e10.header }, s2 = aD(nq, /* @__PURE__ */ new Map([["b64", true]]), r10?.crit, i10, o2), c2 = true;
        if (s2.has("b64") && "boolean" != typeof (c2 = i10.b64)) throw new nq('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
        let { alg: l2 } = o2;
        if ("string" != typeof l2 || !l2) throw new nq('JWS "alg" (Algorithm) Header Parameter missing or invalid');
        let u2 = r10 && aM("algorithms", r10.algorithms);
        if (u2 && !u2.has(l2)) throw new nH('"alg" (Algorithm) Header Parameter value not allowed');
        if (c2) {
          if ("string" != typeof e10.payload) throw new nq("JWS Payload must be a string");
        } else if ("string" != typeof e10.payload && !(e10.payload instanceof Uint8Array)) throw new nq("JWS Payload must be a string or an Uint8Array instance");
        let d2 = false;
        "function" == typeof t10 && (t10 = await t10(i10, e10), d2 = true), aI(l2, t10, "verify");
        let h2 = n9(void 0 !== e10.protected ? ar(e10.protected) : new Uint8Array(), ar("."), "string" == typeof e10.payload ? c2 ? ar(e10.payload) : n3.encode(e10.payload) : e10.payload);
        try {
          n10 = an(e10.signature);
        } catch {
          throw new nq("Failed to base64url decode the signature");
        }
        let p2 = await aU(t10, l2);
        if (!await aC(l2, p2, n10, h2)) throw new nX();
        if (c2) try {
          a10 = an(e10.payload);
        } catch {
          throw new nq("Failed to base64url decode the payload");
        }
        else a10 = "string" == typeof e10.payload ? n3.encode(e10.payload) : e10.payload;
        let f2 = { payload: a10 };
        return (void 0 !== e10.protected && (f2.protectedHeader = i10), void 0 !== e10.header && (f2.unprotectedHeader = e10.header), d2) ? { ...f2, key: p2 } : f2;
      }
      async function aH(e10, t10, r10) {
        if (e10 instanceof Uint8Array && (e10 = n6.decode(e10)), "string" != typeof e10) throw new nq("Compact JWS must be a string or Uint8Array");
        let { 0: n10, 1: a10, 2: i10, length: o2 } = e10.split(".");
        if (3 !== o2) throw new nq("Invalid Compact JWS");
        let s2 = await aL({ payload: a10, protected: n10, signature: i10 }, t10, r10), c2 = { payload: s2.payload, protectedHeader: s2.protectedHeader };
        return "function" == typeof t10 ? { ...c2, key: s2.key } : c2;
      }
      let aK = (e10) => Math.floor(e10.getTime() / 1e3), aW = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
      function a$(e10) {
        let t10, r10 = aW.exec(e10);
        if (!r10 || r10[4] && r10[1]) throw TypeError("Invalid time period format");
        let n10 = parseFloat(r10[2]);
        switch (r10[3].toLowerCase()) {
          case "sec":
          case "secs":
          case "second":
          case "seconds":
          case "s":
            t10 = Math.round(n10);
            break;
          case "minute":
          case "minutes":
          case "min":
          case "mins":
          case "m":
            t10 = Math.round(60 * n10);
            break;
          case "hour":
          case "hours":
          case "hr":
          case "hrs":
          case "h":
            t10 = Math.round(3600 * n10);
            break;
          case "day":
          case "days":
          case "d":
            t10 = Math.round(86400 * n10);
            break;
          case "week":
          case "weeks":
          case "w":
            t10 = Math.round(604800 * n10);
            break;
          default:
            t10 = Math.round(31557600 * n10);
        }
        return "-" === r10[1] || "ago" === r10[4] ? -t10 : t10;
      }
      function aq(e10, t10) {
        if (!Number.isFinite(t10)) throw TypeError(`Invalid ${e10} input`);
        return t10;
      }
      let aB = (e10) => e10.includes("/") ? e10.toLowerCase() : `application/${e10.toLowerCase()}`;
      function aJ(e10, t10, r10 = {}) {
        var n10, a10;
        let i10, o2;
        try {
          i10 = JSON.parse(n6.decode(t10));
        } catch {
        }
        if (!ac(i10)) throw new nB("JWT Claims Set must be a top-level JSON object");
        let { typ: s2 } = r10;
        if (s2 && ("string" != typeof e10.typ || aB(e10.typ) !== aB(s2))) throw new nU('unexpected "typ" JWT header value', i10, "typ", "check_failed");
        let { requiredClaims: c2 = [], issuer: l2, subject: u2, audience: d2, maxTokenAge: h2 } = r10, p2 = [...c2];
        for (let e11 of (void 0 !== h2 && p2.push("iat"), void 0 !== d2 && p2.push("aud"), void 0 !== u2 && p2.push("sub"), void 0 !== l2 && p2.push("iss"), new Set(p2.reverse()))) if (!(e11 in i10)) throw new nU(`missing required "${e11}" claim`, i10, e11, "missing");
        if (l2 && !(Array.isArray(l2) ? l2 : [l2]).includes(i10.iss)) throw new nU('unexpected "iss" claim value', i10, "iss", "check_failed");
        if (u2 && i10.sub !== u2) throw new nU('unexpected "sub" claim value', i10, "sub", "check_failed");
        if (d2 && (n10 = i10.aud, a10 = "string" == typeof d2 ? [d2] : d2, "string" == typeof n10 ? !a10.includes(n10) : !(Array.isArray(n10) && a10.some(Set.prototype.has.bind(new Set(n10)))))) throw new nU('unexpected "aud" claim value', i10, "aud", "check_failed");
        switch (typeof r10.clockTolerance) {
          case "string":
            o2 = a$(r10.clockTolerance);
            break;
          case "number":
            o2 = r10.clockTolerance;
            break;
          case "undefined":
            o2 = 0;
            break;
          default:
            throw TypeError("Invalid clockTolerance option type");
        }
        let { currentDate: f2 } = r10, g2 = aK(f2 || /* @__PURE__ */ new Date());
        if ((void 0 !== i10.iat || h2) && "number" != typeof i10.iat) throw new nU('"iat" claim must be a number', i10, "iat", "invalid");
        if (void 0 !== i10.nbf) {
          if ("number" != typeof i10.nbf) throw new nU('"nbf" claim must be a number', i10, "nbf", "invalid");
          if (i10.nbf > g2 + o2) throw new nU('"nbf" claim timestamp check failed', i10, "nbf", "check_failed");
        }
        if (void 0 !== i10.exp) {
          if ("number" != typeof i10.exp) throw new nU('"exp" claim must be a number', i10, "exp", "invalid");
          if (i10.exp <= g2 - o2) throw new nL('"exp" claim timestamp check failed', i10, "exp", "check_failed");
        }
        if (h2) {
          let e11 = g2 - i10.iat;
          if (e11 - o2 > ("number" == typeof h2 ? h2 : a$(h2))) throw new nL('"iat" claim timestamp check failed (too far in the past)', i10, "iat", "check_failed");
          if (e11 < 0 - o2) throw new nU('"iat" claim timestamp check failed (it should be in the past)', i10, "iat", "check_failed");
        }
        return i10;
      }
      class az {
        #v;
        constructor(e10) {
          if (!ac(e10)) throw TypeError("JWT Claims Set MUST be an object");
          this.#v = structuredClone(e10);
        }
        data() {
          return n3.encode(JSON.stringify(this.#v));
        }
        get iss() {
          return this.#v.iss;
        }
        set iss(e10) {
          this.#v.iss = e10;
        }
        get sub() {
          return this.#v.sub;
        }
        set sub(e10) {
          this.#v.sub = e10;
        }
        get aud() {
          return this.#v.aud;
        }
        set aud(e10) {
          this.#v.aud = e10;
        }
        set jti(e10) {
          this.#v.jti = e10;
        }
        set nbf(e10) {
          "number" == typeof e10 ? this.#v.nbf = aq("setNotBefore", e10) : e10 instanceof Date ? this.#v.nbf = aq("setNotBefore", aK(e10)) : this.#v.nbf = aK(/* @__PURE__ */ new Date()) + a$(e10);
        }
        set exp(e10) {
          "number" == typeof e10 ? this.#v.exp = aq("setExpirationTime", e10) : e10 instanceof Date ? this.#v.exp = aq("setExpirationTime", aK(e10)) : this.#v.exp = aK(/* @__PURE__ */ new Date()) + a$(e10);
        }
        set iat(e10) {
          void 0 === e10 ? this.#v.iat = aK(/* @__PURE__ */ new Date()) : e10 instanceof Date ? this.#v.iat = aq("setIssuedAt", aK(e10)) : "string" == typeof e10 ? this.#v.iat = aq("setIssuedAt", aK(/* @__PURE__ */ new Date()) + a$(e10)) : this.#v.iat = aq("setIssuedAt", e10);
        }
      }
      async function aG(e10, t10, r10) {
        let n10 = await aH(e10, t10, r10);
        if (n10.protectedHeader.crit?.includes("b64") && false === n10.protectedHeader.b64) throw new nB("JWTs MUST NOT use unencoded payload");
        let a10 = { payload: aJ(n10.protectedHeader, n10.payload, r10), protectedHeader: n10.protectedHeader };
        return "function" == typeof t10 ? { ...a10, key: n10.key } : a10;
      }
      function aF(e10) {
        switch (e10) {
          case "A128GCM":
          case "A128GCMKW":
          case "A192GCM":
          case "A192GCMKW":
          case "A256GCM":
          case "A256GCMKW":
            return 96;
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return 128;
          default:
            throw new nK(`Unsupported JWE Algorithm: ${e10}`);
        }
      }
      function aV(e10, t10) {
        if (t10.length << 3 !== aF(e10)) throw new n$("Invalid Initialization Vector length");
      }
      function aX(e10, t10) {
        let r10 = e10.byteLength << 3;
        if (r10 !== t10) throw new n$(`Invalid Content Encryption Key length. Expected ${t10} bits, got ${r10} bits`);
      }
      async function aY(e10, t10) {
        if (!(e10 instanceof Uint8Array)) throw TypeError("First argument must be a buffer");
        if (!(t10 instanceof Uint8Array)) throw TypeError("Second argument must be a buffer");
        let r10 = { name: "HMAC", hash: "SHA-256" }, n10 = await crypto.subtle.generateKey(r10, false, ["sign"]), a10 = new Uint8Array(await crypto.subtle.sign(r10, n10, e10)), i10 = new Uint8Array(await crypto.subtle.sign(r10, n10, t10)), o2 = 0, s2 = -1;
        for (; ++s2 < 32; ) o2 |= a10[s2] ^ i10[s2];
        return 0 === o2;
      }
      async function aQ(e10, t10, r10, n10, a10, i10) {
        let o2, s2;
        if (!(t10 instanceof Uint8Array)) throw TypeError(nI(t10, "Uint8Array"));
        let c2 = parseInt(e10.slice(1, 4), 10), l2 = await crypto.subtle.importKey("raw", t10.subarray(c2 >> 3), "AES-CBC", false, ["decrypt"]), u2 = await crypto.subtle.importKey("raw", t10.subarray(0, c2 >> 3), { hash: `SHA-${c2 << 1}`, name: "HMAC" }, false, ["sign"]), d2 = n9(i10, n10, r10, ae(i10.length << 3)), h2 = new Uint8Array((await crypto.subtle.sign("HMAC", u2, d2)).slice(0, c2 >> 3));
        try {
          o2 = await aY(a10, h2);
        } catch {
        }
        if (!o2) throw new nW();
        try {
          s2 = new Uint8Array(await crypto.subtle.decrypt({ iv: n10, name: "AES-CBC" }, l2, r10));
        } catch {
        }
        if (!s2) throw new nW();
        return s2;
      }
      async function aZ(e10, t10, r10, n10, a10, i10) {
        let o2;
        t10 instanceof Uint8Array ? o2 = await crypto.subtle.importKey("raw", t10, "AES-GCM", false, ["decrypt"]) : (aR(t10, e10, "decrypt"), o2 = t10);
        try {
          return new Uint8Array(await crypto.subtle.decrypt({ additionalData: i10, iv: n10, name: "AES-GCM", tagLength: 128 }, o2, n9(r10, a10)));
        } catch {
          throw new nW();
        }
      }
      async function a0(e10, t10, r10, n10, a10, i10) {
        if (!nQ(t10) && !(t10 instanceof Uint8Array)) throw TypeError(nI(t10, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
        if (!n10) throw new n$("JWE Initialization Vector missing");
        if (!a10) throw new n$("JWE Authentication Tag missing");
        switch (aV(e10, n10), e10) {
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return t10 instanceof Uint8Array && aX(t10, parseInt(e10.slice(-3), 10)), aQ(e10, t10, r10, n10, a10, i10);
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            return t10 instanceof Uint8Array && aX(t10, parseInt(e10.slice(1, 4), 10)), aZ(e10, t10, r10, n10, a10, i10);
          default:
            throw new nK("Unsupported JWE Content Encryption Algorithm");
        }
      }
      function a1(e10, t10) {
        if (e10.algorithm.length !== parseInt(t10.slice(1, 4), 10)) throw TypeError(`Invalid key size for alg: ${t10}`);
      }
      function a2(e10, t10, r10) {
        return e10 instanceof Uint8Array ? crypto.subtle.importKey("raw", e10, "AES-KW", true, [r10]) : (aR(e10, t10, r10), e10);
      }
      async function a4(e10, t10, r10) {
        let n10 = await a2(t10, e10, "wrapKey");
        a1(n10, e10);
        let a10 = await crypto.subtle.importKey("raw", r10, { hash: "SHA-256", name: "HMAC" }, true, ["sign"]);
        return new Uint8Array(await crypto.subtle.wrapKey("raw", a10, n10, "AES-KW"));
      }
      async function a5(e10, t10, r10) {
        let n10 = await a2(t10, e10, "unwrapKey");
        a1(n10, e10);
        let a10 = await crypto.subtle.unwrapKey("raw", r10, n10, "AES-KW", { hash: "SHA-256", name: "HMAC" }, true, ["sign"]);
        return new Uint8Array(await crypto.subtle.exportKey("raw", a10));
      }
      function a8(e10) {
        return n9(at(e10.length), e10);
      }
      async function a3(e10, t10, r10) {
        let n10 = t10 >> 3, a10 = Math.ceil(n10 / 32), i10 = new Uint8Array(32 * a10);
        for (let t11 = 1; t11 <= a10; t11++) {
          let n11 = new Uint8Array(4 + e10.length + r10.length);
          n11.set(at(t11), 0), n11.set(e10, 4), n11.set(r10, 4 + e10.length);
          let a11 = await as("sha256", n11);
          i10.set(a11, (t11 - 1) * 32);
        }
        return i10.slice(0, n10);
      }
      async function a6(e10, t10, r10, n10, a10 = new Uint8Array(), i10 = new Uint8Array()) {
        var o2;
        aR(e10, "ECDH"), aR(t10, "ECDH", "deriveBits");
        let s2 = n9(a8(ar(r10)), a8(a10), a8(i10), at(n10), new Uint8Array());
        return a3(new Uint8Array(await crypto.subtle.deriveBits({ name: e10.algorithm.name, public: e10 }, t10, "X25519" === (o2 = e10).algorithm.name ? 256 : Math.ceil(parseInt(o2.algorithm.namedCurve.slice(-3), 10) / 8) << 3)), n10, s2);
      }
      function a9(e10) {
        switch (e10.algorithm.namedCurve) {
          case "P-256":
          case "P-384":
          case "P-521":
            return true;
          default:
            return "X25519" === e10.algorithm.name;
        }
      }
      async function a7(e10, t10, r10, n10) {
        if (!(e10 instanceof Uint8Array) || e10.length < 8) throw new n$("PBES2 Salt Input must be 8 or more octets");
        let a10 = n9(ar(t10), Uint8Array.of(0), e10), i10 = parseInt(t10.slice(13, 16), 10), o2 = { hash: `SHA-${t10.slice(8, 11)}`, iterations: r10, name: "PBKDF2", salt: a10 }, s2 = await (n10 instanceof Uint8Array ? crypto.subtle.importKey("raw", n10, "PBKDF2", false, ["deriveBits"]) : (aR(n10, t10, "deriveBits"), n10));
        return new Uint8Array(await crypto.subtle.deriveBits(o2, s2, i10));
      }
      async function ie(e10, t10, r10, n10 = 2048, a10 = crypto.getRandomValues(new Uint8Array(16))) {
        let i10 = await a7(a10, e10, n10, t10);
        return { encryptedKey: await a4(e10.slice(-6), i10, r10), p2c: n10, p2s: aa(a10) };
      }
      async function it(e10, t10, r10, n10, a10) {
        let i10 = await a7(a10, e10, n10, t10);
        return a5(e10.slice(-6), i10, r10);
      }
      let ir = (e10) => {
        switch (e10) {
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            return "RSA-OAEP";
          default:
            throw new nK(`alg ${e10} is not supported either by JOSE or your javascript runtime`);
        }
      };
      async function ia(e10, t10, r10) {
        return aR(t10, e10, "encrypt"), aS(e10, t10), new Uint8Array(await crypto.subtle.encrypt(ir(e10), t10, r10));
      }
      async function ii(e10, t10, r10) {
        return aR(t10, e10, "decrypt"), aS(e10, t10), new Uint8Array(await crypto.subtle.decrypt(ir(e10), t10, r10));
      }
      function io(e10) {
        switch (e10) {
          case "A128GCM":
            return 128;
          case "A192GCM":
            return 192;
          case "A256GCM":
          case "A128CBC-HS256":
            return 256;
          case "A192CBC-HS384":
            return 384;
          case "A256CBC-HS512":
            return 512;
          default:
            throw new nK(`Unsupported JWE Algorithm: ${e10}`);
        }
      }
      let is = (e10) => crypto.getRandomValues(new Uint8Array(io(e10) >> 3));
      async function ic(e10, t10, r10, n10, a10) {
        if (!(r10 instanceof Uint8Array)) throw TypeError(nI(r10, "Uint8Array"));
        let i10 = parseInt(e10.slice(1, 4), 10), o2 = await crypto.subtle.importKey("raw", r10.subarray(i10 >> 3), "AES-CBC", false, ["encrypt"]), s2 = await crypto.subtle.importKey("raw", r10.subarray(0, i10 >> 3), { hash: `SHA-${i10 << 1}`, name: "HMAC" }, false, ["sign"]), c2 = new Uint8Array(await crypto.subtle.encrypt({ iv: n10, name: "AES-CBC" }, o2, t10)), l2 = n9(a10, n10, c2, ae(a10.length << 3));
        return { ciphertext: c2, tag: new Uint8Array((await crypto.subtle.sign("HMAC", s2, l2)).slice(0, i10 >> 3)), iv: n10 };
      }
      async function il(e10, t10, r10, n10, a10) {
        let i10;
        r10 instanceof Uint8Array ? i10 = await crypto.subtle.importKey("raw", r10, "AES-GCM", false, ["encrypt"]) : (aR(r10, e10, "encrypt"), i10 = r10);
        let o2 = new Uint8Array(await crypto.subtle.encrypt({ additionalData: a10, iv: n10, name: "AES-GCM", tagLength: 128 }, i10, t10)), s2 = o2.slice(-16);
        return { ciphertext: o2.slice(0, -16), tag: s2, iv: n10 };
      }
      async function iu(e10, t10, r10, n10, a10) {
        if (!nQ(r10) && !(r10 instanceof Uint8Array)) throw TypeError(nI(r10, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
        if (n10) aV(e10, n10);
        else n10 = crypto.getRandomValues(new Uint8Array(aF(e10) >> 3));
        switch (e10) {
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return r10 instanceof Uint8Array && aX(r10, parseInt(e10.slice(-3), 10)), ic(e10, t10, r10, n10, a10);
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            return r10 instanceof Uint8Array && aX(r10, parseInt(e10.slice(1, 4), 10)), il(e10, t10, r10, n10, a10);
          default:
            throw new nK("Unsupported JWE Content Encryption Algorithm");
        }
      }
      async function id(e10, t10, r10, n10) {
        let a10 = e10.slice(0, 7), i10 = await iu(a10, r10, t10, n10, new Uint8Array());
        return { encryptedKey: i10.ciphertext, iv: aa(i10.iv), tag: aa(i10.tag) };
      }
      async function ih(e10, t10, r10, n10, a10) {
        return a0(e10.slice(0, 7), t10, r10, n10, a10, new Uint8Array());
      }
      async function ip(e10, t10, r10, n10, a10) {
        switch (e10) {
          case "dir":
            if (void 0 !== r10) throw new n$("Encountered unexpected JWE Encrypted Key");
            return t10;
          case "ECDH-ES":
            if (void 0 !== r10) throw new n$("Encountered unexpected JWE Encrypted Key");
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            let a11, i10;
            if (!ac(n10.epk)) throw new n$('JOSE Header "epk" (Ephemeral Public Key) missing or invalid');
            if (nY(t10), !a9(t10)) throw new nK("ECDH with the provided key is not allowed or not supported by your javascript runtime");
            let o2 = await af(n10.epk, e10);
            if (nY(o2), void 0 !== n10.apu) {
              if ("string" != typeof n10.apu) throw new n$('JOSE Header "apu" (Agreement PartyUInfo) invalid');
              try {
                a11 = an(n10.apu);
              } catch {
                throw new n$("Failed to base64url decode the apu");
              }
            }
            if (void 0 !== n10.apv) {
              if ("string" != typeof n10.apv) throw new n$('JOSE Header "apv" (Agreement PartyVInfo) invalid');
              try {
                i10 = an(n10.apv);
              } catch {
                throw new n$("Failed to base64url decode the apv");
              }
            }
            let s2 = await a6(o2, t10, "ECDH-ES" === e10 ? n10.enc : e10, "ECDH-ES" === e10 ? io(n10.enc) : parseInt(e10.slice(-5, -2), 10), a11, i10);
            if ("ECDH-ES" === e10) return s2;
            if (void 0 === r10) throw new n$("JWE Encrypted Key missing");
            return a5(e10.slice(-6), s2, r10);
          }
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            if (void 0 === r10) throw new n$("JWE Encrypted Key missing");
            return nY(t10), ii(e10, t10, r10);
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW": {
            let i10;
            if (void 0 === r10) throw new n$("JWE Encrypted Key missing");
            if ("number" != typeof n10.p2c) throw new n$('JOSE Header "p2c" (PBES2 Count) missing or invalid');
            let o2 = a10?.maxPBES2Count || 1e4;
            if (n10.p2c > o2) throw new n$('JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds');
            if ("string" != typeof n10.p2s) throw new n$('JOSE Header "p2s" (PBES2 Salt) missing or invalid');
            try {
              i10 = an(n10.p2s);
            } catch {
              throw new n$("Failed to base64url decode the p2s");
            }
            return it(e10, t10, r10, n10.p2c, i10);
          }
          case "A128KW":
          case "A192KW":
          case "A256KW":
            if (void 0 === r10) throw new n$("JWE Encrypted Key missing");
            return a5(e10, t10, r10);
          case "A128GCMKW":
          case "A192GCMKW":
          case "A256GCMKW": {
            let a11, i10;
            if (void 0 === r10) throw new n$("JWE Encrypted Key missing");
            if ("string" != typeof n10.iv) throw new n$('JOSE Header "iv" (Initialization Vector) missing or invalid');
            if ("string" != typeof n10.tag) throw new n$('JOSE Header "tag" (Authentication Tag) missing or invalid');
            try {
              a11 = an(n10.iv);
            } catch {
              throw new n$("Failed to base64url decode the iv");
            }
            try {
              i10 = an(n10.tag);
            } catch {
              throw new n$("Failed to base64url decode the tag");
            }
            return ih(e10, t10, r10, a11, i10);
          }
          default:
            throw new nK('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
      }
      async function ig(e10, t10, r10) {
        let n10, a10, i10, o2, s2, c2, l2;
        if (!ac(e10)) throw new n$("Flattened JWE must be an object");
        if (void 0 === e10.protected && void 0 === e10.header && void 0 === e10.unprotected) throw new n$("JOSE Header missing");
        if (void 0 !== e10.iv && "string" != typeof e10.iv) throw new n$("JWE Initialization Vector incorrect type");
        if ("string" != typeof e10.ciphertext) throw new n$("JWE Ciphertext missing or incorrect type");
        if (void 0 !== e10.tag && "string" != typeof e10.tag) throw new n$("JWE Authentication Tag incorrect type");
        if (void 0 !== e10.protected && "string" != typeof e10.protected) throw new n$("JWE Protected Header incorrect type");
        if (void 0 !== e10.encrypted_key && "string" != typeof e10.encrypted_key) throw new n$("JWE Encrypted Key incorrect type");
        if (void 0 !== e10.aad && "string" != typeof e10.aad) throw new n$("JWE AAD incorrect type");
        if (void 0 !== e10.header && !ac(e10.header)) throw new n$("JWE Shared Unprotected Header incorrect type");
        if (void 0 !== e10.unprotected && !ac(e10.unprotected)) throw new n$("JWE Per-Recipient Unprotected Header incorrect type");
        if (e10.protected) try {
          let t11 = an(e10.protected);
          n10 = JSON.parse(n6.decode(t11));
        } catch {
          throw new n$("JWE Protected Header is invalid");
        }
        if (!ax(n10, e10.header, e10.unprotected)) throw new n$("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
        let u2 = { ...n10, ...e10.header, ...e10.unprotected };
        if (aD(n$, /* @__PURE__ */ new Map(), r10?.crit, n10, u2), void 0 !== u2.zip) throw new nK('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
        let { alg: d2, enc: h2 } = u2;
        if ("string" != typeof d2 || !d2) throw new n$("missing JWE Algorithm (alg) in JWE Header");
        if ("string" != typeof h2 || !h2) throw new n$("missing JWE Encryption Algorithm (enc) in JWE Header");
        let p2 = r10 && aM("keyManagementAlgorithms", r10.keyManagementAlgorithms), f2 = r10 && aM("contentEncryptionAlgorithms", r10.contentEncryptionAlgorithms);
        if (p2 && !p2.has(d2) || !p2 && d2.startsWith("PBES2")) throw new nH('"alg" (Algorithm) Header Parameter value not allowed');
        if (f2 && !f2.has(h2)) throw new nH('"enc" (Encryption Algorithm) Header Parameter value not allowed');
        if (void 0 !== e10.encrypted_key) try {
          a10 = an(e10.encrypted_key);
        } catch {
          throw new n$("Failed to base64url decode the encrypted_key");
        }
        let g2 = false;
        "function" == typeof t10 && (t10 = await t10(n10, e10), g2 = true), aI("dir" === d2 ? h2 : d2, t10, "decrypt");
        let y2 = await aU(t10, d2);
        try {
          i10 = await ip(d2, y2, a10, u2, r10);
        } catch (e11) {
          if (e11 instanceof TypeError || e11 instanceof n$ || e11 instanceof nK) throw e11;
          i10 = is(h2);
        }
        if (void 0 !== e10.iv) try {
          o2 = an(e10.iv);
        } catch {
          throw new n$("Failed to base64url decode the iv");
        }
        if (void 0 !== e10.tag) try {
          s2 = an(e10.tag);
        } catch {
          throw new n$("Failed to base64url decode the tag");
        }
        let m2 = void 0 !== e10.protected ? ar(e10.protected) : new Uint8Array();
        c2 = void 0 !== e10.aad ? n9(m2, ar("."), ar(e10.aad)) : m2;
        try {
          l2 = an(e10.ciphertext);
        } catch {
          throw new n$("Failed to base64url decode the ciphertext");
        }
        let w2 = { plaintext: await a0(h2, i10, l2, o2, s2, c2) };
        if (void 0 !== e10.protected && (w2.protectedHeader = n10), void 0 !== e10.aad) try {
          w2.additionalAuthenticatedData = an(e10.aad);
        } catch {
          throw new n$("Failed to base64url decode the aad");
        }
        return (void 0 !== e10.unprotected && (w2.sharedUnprotectedHeader = e10.unprotected), void 0 !== e10.header && (w2.unprotectedHeader = e10.header), g2) ? { ...w2, key: y2 } : w2;
      }
      async function iy(e10, t10, r10) {
        if (e10 instanceof Uint8Array && (e10 = n6.decode(e10)), "string" != typeof e10) throw new n$("Compact JWE must be a string or Uint8Array");
        let { 0: n10, 1: a10, 2: i10, 3: o2, 4: s2, length: c2 } = e10.split(".");
        if (5 !== c2) throw new n$("Invalid Compact JWE");
        let l2 = await ig({ ciphertext: o2, iv: i10 || void 0, protected: n10, tag: s2 || void 0, encrypted_key: a10 || void 0 }, t10, r10), u2 = { plaintext: l2.plaintext, protectedHeader: l2.protectedHeader };
        return "function" == typeof t10 ? { ...u2, key: l2.key } : u2;
      }
      "undefined" != typeof navigator && navigator.userAgent?.startsWith?.("Mozilla/5.0 ") || (c = { "user-agent": "openid-client/v6.8.1" });
      let im = "ERR_INVALID_ARG_VALUE", iw = "ERR_INVALID_ARG_TYPE";
      function ib(e10, t10, r10) {
        let n10 = TypeError(e10, { cause: r10 });
        return Object.assign(n10, { code: t10 }), n10;
      }
      class i_ extends Error {
        code;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = t10?.code, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      function iv(e10, t10, r10) {
        return new i_(e10, { cause: t10, code: r10 });
      }
      function iE(e10) {
        if (e10 instanceof TypeError || e10 instanceof i_ || e10 instanceof rb || e10 instanceof r_ || e10 instanceof rv) throw e10;
        if (e10 instanceof tF) switch (e10.code) {
          case r9:
            throw iv("only requests to HTTPS are allowed", e10, e10.code);
          case r7:
            throw iv("only requests to HTTP or HTTPS are allowed", e10, e10.code);
          case r6:
            throw iv("unexpected HTTP response status code", e10.cause, e10.code);
          case r3:
            throw iv("unexpected response content-type", e10.cause, e10.code);
          case r5:
            throw iv("parsing error occured", e10, e10.code);
          case r8:
            throw iv("invalid response encountered", e10, e10.code);
          case nt:
            throw iv("unexpected JWT claim value encountered", e10, e10.code);
          case nr:
            throw iv("unexpected JSON attribute value encountered", e10, e10.code);
          case ne:
            throw iv("JWT timestamp claim value failed validation", e10, e10.code);
          default:
            throw iv(e10.message, e10, e10.code);
        }
        if (e10 instanceof tG) throw iv("unsupported operation", e10, e10.code);
        if (e10 instanceof DOMException) switch (e10.name) {
          case "OperationError":
            throw iv("runtime operation error", e10, r2);
          case "NotSupportedError":
            throw iv("runtime unsupported operation", e10, r2);
          case "TimeoutError":
            throw iv("operation timed out", e10, "OAUTH_TIMEOUT");
          case "AbortError":
            throw iv("operation aborted", e10, "OAUTH_ABORT");
        }
        throw new i_("something went wrong", { cause: e10 });
      }
      new TextDecoder();
      let iS = Symbol();
      class iA {
        constructor(e10, t10, r10, n10) {
          let a10;
          if ("string" != typeof t10 || !t10.length) throw ib('"clientId" must be a non-empty string', iw);
          if ("string" == typeof r10 && (r10 = { client_secret: r10 }), r10?.client_id !== void 0 && t10 !== r10.client_id) throw ib('"clientId" and "metadata.client_id" must be the same', im);
          const i10 = { ...structuredClone(r10), client_id: t10 };
          i10[tL] = r10?.[tL] ?? 0, i10[tH] = r10?.[tH] ?? 30, a10 = n10 || ("string" == typeof i10.client_secret && i10.client_secret.length ? function(e11) {
            return void 0 !== e11 ? rs(e11) : (u ||= /* @__PURE__ */ new WeakMap(), (e12, t11, r11, n11) => {
              let a11;
              return (a11 = u.get(t11)) || (function(e13, t12) {
                if ("string" != typeof e13) throw ib(`${t12} must be a string`, iw);
                if (0 === e13.length) throw ib(`${t12} must not be empty`, im);
              }(t11.client_secret, '"metadata.client_secret"'), a11 = rs(t11.client_secret), u.set(t11, a11)), a11(e12, t11, r11, n11);
            });
          }(i10.client_secret) : (e11, t11, r11, n11) => {
            r11.set("client_id", t11.client_id);
          });
          let o2 = Object.freeze(i10);
          const s2 = structuredClone(e10);
          iS in e10 && (s2[n_] = ({ claims: { tid: t11 } }) => e10.issuer.replace("{tenantid}", t11));
          let c2 = Object.freeze(s2);
          (l ||= /* @__PURE__ */ new WeakMap()).set(this, { __proto__: null, as: c2, c: o2, auth: a10, tlsOnly: true, jwksCache: {} });
        }
        serverMetadata() {
          let e10 = structuredClone(l.get(this).as);
          return Object.defineProperties(e10, { supportsPKCE: { __proto__: null, value: (t10 = "S256") => e10.code_challenge_methods_supported?.includes(t10) === true } }), e10;
        }
        clientMetadata() {
          return structuredClone(l.get(this).c);
        }
        get timeout() {
          return l.get(this).timeout;
        }
        set timeout(e10) {
          l.get(this).timeout = e10;
        }
        get [tK]() {
          return l.get(this).fetch;
        }
        set [tK](e10) {
          l.get(this).fetch = e10;
        }
      }
      async function iT(e10, t10, r10, n10 = false) {
        let a10, i10 = e10.headers.get("retry-after")?.trim();
        if (void 0 !== i10) {
          if (/^\d+$/.test(i10)) a10 = parseInt(i10, 10);
          else {
            let e11 = new Date(i10);
            if (Number.isFinite(e11.getTime())) {
              let t11 = /* @__PURE__ */ new Date(), r11 = e11.getTime() - t11.getTime();
              r11 > 0 && (a10 = Math.ceil(r11 / 1e3));
            }
          }
          if (n10 && !Number.isFinite(a10)) throw new tF("invalid Retry-After header value", { cause: e10 });
          a10 > t10 && await iP(a10 - t10, r10);
        }
      }
      function iP(e10, t10) {
        return new Promise((r10, n10) => {
          let a10 = (e11) => {
            try {
              t10.throwIfAborted();
            } catch (e12) {
              n10(e12);
              return;
            }
            if (e11 <= 0) return void r10();
            let i10 = Math.min(e11, 5);
            setTimeout(() => a10(e11 - i10), 1e3 * i10);
          };
          a10(e10);
        });
      }
      async function iR(e10, t10) {
        iC(e10);
        let { as: r10, c: n10, auth: a10, fetch: i10, tlsOnly: o2, timeout: s2 } = l.get(e10);
        return nf(r10, n10, a10, t10, { [tK]: i10, [tU]: !o2, headers: new Headers(c), signal: ix(s2) }).then((e11) => ng(r10, n10, e11)).catch(iE);
      }
      async function ik(e10, t10, r10, n10) {
        var a10, i10, o2;
        let s2;
        iC(e10), r10 = new URLSearchParams(r10);
        let u2 = t10.interval ?? 5, d2 = n10?.signal ?? AbortSignal.timeout(1e3 * t10.expires_in);
        try {
          await iP(u2, d2);
        } catch (e11) {
          iE(e11);
        }
        let { as: h2, c: p2, auth: f2, fetch: g2, tlsOnly: y2, nonRepudiation: m2, timeout: w2, decrypt: b2 } = l.get(e10), _2 = (a11, i11) => ik(e10, { ...t10, interval: a11 }, r10, { ...n10, signal: d2, flag: i11 }), v2 = await ny(h2, p2, f2, t10.auth_req_id, { [tK]: g2, [tU]: !y2, additionalParameters: r10, DPoP: n10?.DPoP, headers: new Headers(c), signal: d2.aborted ? d2 : ix(w2) }).catch(iE);
        if (503 === v2.status && v2.headers.has("retry-after")) return await iT(v2, u2, d2, true), await v2.body?.cancel(), _2(u2);
        let E2 = nm(h2, p2, v2, { [t$]: b2 });
        try {
          s2 = await E2;
        } catch (e11) {
          if (i10 = e11, o2 = n10, o2?.DPoP && o2.flag !== iO && rm(i10)) return _2(u2, iO);
          if (e11 instanceof rb) switch (e11.error) {
            case "slow_down":
              u2 += 5;
            case "authorization_pending":
              return await iT(e11.response, u2, d2), _2(u2);
          }
          iE(e11);
        }
        return s2.id_token && await m2?.(v2), Object.defineProperties(a10 = s2, function(e11) {
          let t11;
          if (void 0 !== e11.expires_in) {
            let r11 = /* @__PURE__ */ new Date();
            r11.setSeconds(r11.getSeconds() + e11.expires_in), t11 = r11.getTime();
          }
          return { expiresIn: { __proto__: null, value() {
            if (t11) {
              let e12 = Date.now();
              return t11 > e12 ? Math.floor((t11 - e12) / 1e3) : 0;
            }
          } }, claims: { __proto__: null, value() {
            try {
              return rL(this);
            } catch {
              return;
            }
          } } };
        }(a10)), s2;
      }
      function iC(e10) {
        if (!(e10 instanceof iA)) throw ib('"config" must be an instance of Configuration', iw);
        if (Object.getPrototypeOf(e10) !== iA.prototype) throw ib("subclassing Configuration is not allowed", im);
      }
      function ix(e10) {
        return e10 ? AbortSignal.timeout(1e3 * e10) : void 0;
      }
      Object.freeze(iA.prototype);
      let iO = Symbol();
      var iN = e.i(372418);
      function iI(e10, t10, r10 = []) {
        let n10 = new URLSearchParams(), a10 = { ...e10, ...t10 };
        return Object.entries(a10).forEach(([e11, t11]) => {
          r10 && (r10.includes(e11) || null == t11) || ("scope" === e11 && "object" == typeof t11 && (t11 = nA(t11, a10.audience)), t11 && n10.set(e11, String(t11)));
        }), n10;
      }
      function iD(e10) {
        return e10 && !e10.endsWith("/") ? `${e10}/` : e10;
      }
      function iM(e10) {
        return e10 && e10.startsWith("/") ? e10.substring(1, e10.length) : e10;
      }
      (M = W || (W = {})).SUBJECT_TYPE_REFRESH_TOKEN = "urn:ietf:params:oauth:token-type:refresh_token", M.SUBJECT_TYPE_ACCESS_TOKEN = "urn:ietf:params:oauth:token-type:access_token", (j = $ || ($ = {})).CODE = "code", j.CONNECT_CODE = "connect_code";
      let ij = /* @__PURE__ */ new Set(["accept", "accept-language", "content-language", "content-type", "user-agent", "cache-control", "if-match", "if-none-match", "if-modified-since", "if-unmodified-since", "etag", "x-request-id", "x-correlation-id", "traceparent", "tracestate", "x-forwarded-for", "x-forwarded-host", "x-forwarded-proto", "x-real-ip", "origin", "access-control-request-method", "access-control-request-headers"]), iU = /* @__PURE__ */ new Set(["connection", "keep-alive", "proxy-authenticate", "proxy-authorization", "te", "trailer", "transfer-encoding", "upgrade"]);
      function iL(e10) {
        let t10 = new Headers();
        return e10.headers.forEach((e11, r10) => {
          let n10 = r10.toLowerCase();
          ij.has(n10) && !iU.has(n10) && t10.set(r10, e11);
        }), t10;
      }
      function iH(e10) {
        let t10 = new Headers();
        return e10.headers.forEach((e11, r10) => {
          let n10 = r10.toLowerCase();
          iU.has(n10) || t10.set(r10, e11);
        }), t10;
      }
      function iK(e10, t10) {
        let r10 = t10.targetBaseUrl, n10 = e10.nextUrl.pathname.startsWith(t10.proxyPath) ? e10.nextUrl.pathname.slice(t10.proxyPath.length) : e10.nextUrl.pathname;
        n10 && !n10.startsWith("/") && (n10 = "/" + n10);
        let a10 = new URL(r10.replace(/\/$/, "")), i10 = a10.pathname, o2 = i10;
        if (n10 && "/" !== n10) {
          let e11 = i10.split("/").filter(Boolean), t11 = n10.split("/").filter(Boolean), r11 = 0, a11 = Math.min(e11.length, t11.length);
          for (let n11 = a11; n11 >= 1; n11--) {
            let a12 = e11.slice(-n11), i11 = t11.slice(0, n11);
            if (a12.every((e12, t12) => e12 === i11[t12])) {
              r11 = n11;
              break;
            }
          }
          let s3 = t11.slice(r11);
          if (s3.length > 0) {
            let e12 = "/" === i10 || i10.endsWith("/") ? "" : "/";
            o2 = i10 + e12 + s3.join("/");
          }
        }
        let s2 = new URL(a10.origin + o2);
        return e10.nextUrl.searchParams.forEach((e11, t11) => {
          s2.searchParams.set(t11, e11);
        }), s2;
      }
      function iW(e10, t10) {
        let r10;
        try {
          r10 = new URL(e10, t10);
        } catch (e11) {
          return;
        }
        if (r10.origin === t10.origin) return r10;
      }
      function i$(e10) {
        var t10;
        let r10 = ["path" in e10 && e10.path && `Path=${e10.path}`, "expires" in e10 && (e10.expires || 0 === e10.expires) && `Expires=${("number" == typeof e10.expires ? new Date(e10.expires) : e10.expires).toUTCString()}`, "maxAge" in e10 && "number" == typeof e10.maxAge && `Max-Age=${e10.maxAge}`, "domain" in e10 && e10.domain && `Domain=${e10.domain}`, "secure" in e10 && e10.secure && "Secure", "httpOnly" in e10 && e10.httpOnly && "HttpOnly", "sameSite" in e10 && e10.sameSite && `SameSite=${e10.sameSite}`, "partitioned" in e10 && e10.partitioned && "Partitioned", "priority" in e10 && e10.priority && `Priority=${e10.priority}`].filter(Boolean), n10 = `${e10.name}=${encodeURIComponent(null != (t10 = e10.value) ? t10 : "")}`;
        return 0 === r10.length ? n10 : `${n10}; ${r10.join("; ")}`;
      }
      function iq(e10) {
        let t10 = /* @__PURE__ */ new Map();
        for (let r10 of e10.split(/; */)) {
          if (!r10) continue;
          let e11 = r10.indexOf("=");
          if (-1 === e11) {
            t10.set(r10, "true");
            continue;
          }
          let [n10, a10] = [r10.slice(0, e11), r10.slice(e11 + 1)];
          try {
            t10.set(n10, decodeURIComponent(null != a10 ? a10 : "true"));
          } catch {
          }
        }
        return t10;
      }
      var iB = ["strict", "lax", "none"], iJ = ["low", "medium", "high"], iz = class {
        constructor(e10) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e10;
          const t10 = e10.get("cookie");
          if (t10) for (const [e11, r10] of iq(t10)) this._parsed.set(e11, { name: e11, value: r10 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e10) {
          let t10 = "string" == typeof e10[0] ? e10[0] : e10[0].name;
          return this._parsed.get(t10);
        }
        getAll(...e10) {
          var t10;
          let r10 = Array.from(this._parsed);
          if (!e10.length) return r10.map(([e11, t11]) => t11);
          let n10 = "string" == typeof e10[0] ? e10[0] : null == (t10 = e10[0]) ? void 0 : t10.name;
          return r10.filter(([e11]) => e11 === n10).map(([e11, t11]) => t11);
        }
        has(e10) {
          return this._parsed.has(e10);
        }
        set(...e10) {
          let [t10, r10] = 1 === e10.length ? [e10[0].name, e10[0].value] : e10, n10 = this._parsed;
          return n10.set(t10, { name: t10, value: r10 }), this._headers.set("cookie", Array.from(n10).map(([e11, t11]) => i$(t11)).join("; ")), this;
        }
        delete(e10) {
          let t10 = this._parsed, r10 = Array.isArray(e10) ? e10.map((e11) => t10.delete(e11)) : t10.delete(e10);
          return this._headers.set("cookie", Array.from(t10).map(([e11, t11]) => i$(t11)).join("; ")), r10;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e10) => `${e10.name}=${encodeURIComponent(e10.value)}`).join("; ");
        }
      }, iG = class {
        constructor(e10) {
          var t10, r10, n10;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e10;
          const a10 = null != (n10 = null != (r10 = null == (t10 = e10.getSetCookie) ? void 0 : t10.call(e10)) ? r10 : e10.get("set-cookie")) ? n10 : [];
          for (const e11 of Array.isArray(a10) ? a10 : function(e12) {
            if (!e12) return [];
            var t11, r11, n11, a11, i10, o2 = [], s2 = 0;
            function c2() {
              for (; s2 < e12.length && /\s/.test(e12.charAt(s2)); ) s2 += 1;
              return s2 < e12.length;
            }
            for (; s2 < e12.length; ) {
              for (t11 = s2, i10 = false; c2(); ) if ("," === (r11 = e12.charAt(s2))) {
                for (n11 = s2, s2 += 1, c2(), a11 = s2; s2 < e12.length && "=" !== (r11 = e12.charAt(s2)) && ";" !== r11 && "," !== r11; ) s2 += 1;
                s2 < e12.length && "=" === e12.charAt(s2) ? (i10 = true, s2 = a11, o2.push(e12.substring(t11, n11)), t11 = s2) : s2 = n11 + 1;
              } else s2 += 1;
              (!i10 || s2 >= e12.length) && o2.push(e12.substring(t11, e12.length));
            }
            return o2;
          }(a10)) {
            const t11 = function(e12) {
              var t12, r11;
              if (!e12) return;
              let [[n11, a11], ...i10] = iq(e12), { domain: o2, expires: s2, httponly: c2, maxage: l2, path: u2, samesite: d2, secure: h2, partitioned: p2, priority: f2 } = Object.fromEntries(i10.map(([e13, t13]) => [e13.toLowerCase().replace(/-/g, ""), t13]));
              return function(e13) {
                let t13 = {};
                for (let r12 in e13) e13[r12] && (t13[r12] = e13[r12]);
                return t13;
              }({ name: n11, value: decodeURIComponent(a11), domain: o2, ...s2 && { expires: new Date(s2) }, ...c2 && { httpOnly: true }, ..."string" == typeof l2 && { maxAge: Number(l2) }, path: u2, ...d2 && { sameSite: (t12 = (t12 = d2).toLowerCase(), iB.includes(t12) ? t12 : void 0) }, ...h2 && { secure: true }, ...f2 && { priority: (r11 = (r11 = f2).toLowerCase(), iJ.includes(r11) ? r11 : void 0) }, ...p2 && { partitioned: true } });
            }(e11);
            t11 && this._parsed.set(t11.name, t11);
          }
        }
        get(...e10) {
          let t10 = "string" == typeof e10[0] ? e10[0] : e10[0].name;
          return this._parsed.get(t10);
        }
        getAll(...e10) {
          var t10;
          let r10 = Array.from(this._parsed.values());
          if (!e10.length) return r10;
          let n10 = "string" == typeof e10[0] ? e10[0] : null == (t10 = e10[0]) ? void 0 : t10.name;
          return r10.filter((e11) => e11.name === n10);
        }
        has(e10) {
          return this._parsed.has(e10);
        }
        set(...e10) {
          let [t10, r10, n10] = 1 === e10.length ? [e10[0].name, e10[0].value, e10[0]] : e10, a10 = this._parsed;
          return a10.set(t10, function(e11 = { name: "", value: "" }) {
            return "number" == typeof e11.expires && (e11.expires = new Date(e11.expires)), e11.maxAge && (e11.expires = new Date(Date.now() + 1e3 * e11.maxAge)), (null === e11.path || void 0 === e11.path) && (e11.path = "/"), e11;
          }({ name: t10, value: r10, ...n10 })), function(e11, t11) {
            for (let [, r11] of (t11.delete("set-cookie"), e11)) {
              let e12 = i$(r11);
              t11.append("set-cookie", e12);
            }
          }(a10, this._headers), this;
        }
        delete(...e10) {
          let [t10, r10] = "string" == typeof e10[0] ? [e10[0]] : [e10[0].name, e10[0]];
          return this.set({ ...r10, name: t10, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(i$).join("; ");
        }
      };
      let iF = async (e10, t10, r10, n10, a10) => {
        let { crypto: { subtle: i10 } } = (() => {
          if ("undefined" != typeof globalThis) return globalThis;
          if ("undefined" != typeof self) return self;
          throw Error("unable to locate global object");
        })();
        return new Uint8Array(await i10.deriveBits({ name: "HKDF", hash: `SHA-${e10.substr(3)}`, salt: r10, info: n10 }, await i10.importKey("raw", t10, "HKDF", false, ["deriveBits"]), a10 << 3));
      };
      function iV(e10, t10) {
        if ("string" == typeof e10) return new TextEncoder().encode(e10);
        if (!(e10 instanceof Uint8Array)) throw TypeError(`"${t10}"" must be an instance of Uint8Array or a string`);
        return e10;
      }
      async function iX(e10, t10, r10, n10, a10) {
        return iF(function(e11) {
          switch (e11) {
            case "sha256":
            case "sha384":
            case "sha512":
            case "sha1":
              return e11;
            default:
              throw TypeError('unsupported "digest" value');
          }
        }(e10), function(e11) {
          let t11 = iV(e11, "ikm");
          if (!t11.byteLength) throw TypeError('"ikm" must be at least one byte in length');
          return t11;
        }(t10), iV(r10, "salt"), function(e11) {
          let t11 = iV(e11, "info");
          if (t11.byteLength > 1024) throw TypeError('"info" must not contain more than 1024 bytes');
          return t11;
        }(n10), function(e11, t11) {
          if ("number" != typeof e11 || !Number.isInteger(e11) || e11 < 1) throw TypeError('"keylen" must be a positive integer');
          if (e11 > 255 * (parseInt(t11.substr(3), 10) >> 3 || 20)) throw TypeError('"keylen" too large');
          return e11;
        }(a10, e10));
      }
      let iY = Symbol();
      async function iQ(e10, t10, r10, n10, a10 = {}) {
        let i10, o2, s2;
        switch (e10) {
          case "dir":
            s2 = r10;
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            let c2;
            if (nY(r10), !a9(r10)) throw new nK("ECDH with the provided key is not allowed or not supported by your javascript runtime");
            let { apu: l2, apv: u2 } = a10;
            c2 = a10.epk ? await aU(a10.epk, e10) : (await crypto.subtle.generateKey(r10.algorithm, true, ["deriveBits"])).privateKey;
            let { x: d2, y: h2, crv: p2, kty: f2 } = await ao(c2), g2 = await a6(r10, c2, "ECDH-ES" === e10 ? t10 : e10, "ECDH-ES" === e10 ? io(t10) : parseInt(e10.slice(-5, -2), 10), l2, u2);
            if (o2 = { epk: { x: d2, crv: p2, kty: f2 } }, "EC" === f2 && (o2.epk.y = h2), l2 && (o2.apu = aa(l2)), u2 && (o2.apv = aa(u2)), "ECDH-ES" === e10) {
              s2 = g2;
              break;
            }
            s2 = n10 || is(t10);
            let y2 = e10.slice(-6);
            i10 = await a4(y2, g2, s2);
            break;
          }
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            s2 = n10 || is(t10), nY(r10), i10 = await ia(e10, r10, s2);
            break;
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW": {
            s2 = n10 || is(t10);
            let { p2c: c2, p2s: l2 } = a10;
            ({ encryptedKey: i10, ...o2 } = await ie(e10, r10, s2, c2, l2));
            break;
          }
          case "A128KW":
          case "A192KW":
          case "A256KW":
            s2 = n10 || is(t10), i10 = await a4(e10, r10, s2);
            break;
          case "A128GCMKW":
          case "A192GCMKW":
          case "A256GCMKW": {
            s2 = n10 || is(t10);
            let { iv: c2 } = a10;
            ({ encryptedKey: i10, ...o2 } = await id(e10, r10, s2, c2));
            break;
          }
          default:
            throw new nK('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
        return { cek: s2, encryptedKey: i10, parameters: o2 };
      }
      class iZ {
        #E;
        #S;
        #A;
        #T;
        #P;
        #R;
        #k;
        #C;
        constructor(e10) {
          if (!(e10 instanceof Uint8Array)) throw TypeError("plaintext must be an instance of Uint8Array");
          this.#E = e10;
        }
        setKeyManagementParameters(e10) {
          if (this.#C) throw TypeError("setKeyManagementParameters can only be called once");
          return this.#C = e10, this;
        }
        setProtectedHeader(e10) {
          if (this.#S) throw TypeError("setProtectedHeader can only be called once");
          return this.#S = e10, this;
        }
        setSharedUnprotectedHeader(e10) {
          if (this.#A) throw TypeError("setSharedUnprotectedHeader can only be called once");
          return this.#A = e10, this;
        }
        setUnprotectedHeader(e10) {
          if (this.#T) throw TypeError("setUnprotectedHeader can only be called once");
          return this.#T = e10, this;
        }
        setAdditionalAuthenticatedData(e10) {
          return this.#P = e10, this;
        }
        setContentEncryptionKey(e10) {
          if (this.#R) throw TypeError("setContentEncryptionKey can only be called once");
          return this.#R = e10, this;
        }
        setInitializationVector(e10) {
          if (this.#k) throw TypeError("setInitializationVector can only be called once");
          return this.#k = e10, this;
        }
        async encrypt(e10, t10) {
          let r10, n10, a10, i10, o2, s2;
          if (!this.#S && !this.#T && !this.#A) throw new n$("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
          if (!ax(this.#S, this.#T, this.#A)) throw new n$("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
          let c2 = { ...this.#S, ...this.#T, ...this.#A };
          if (aD(n$, /* @__PURE__ */ new Map(), t10?.crit, this.#S, c2), void 0 !== c2.zip) throw new nK('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
          let { alg: l2, enc: u2 } = c2;
          if ("string" != typeof l2 || !l2) throw new n$('JWE "alg" (Algorithm) Header Parameter missing or invalid');
          if ("string" != typeof u2 || !u2) throw new n$('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
          if (this.#R && ("dir" === l2 || "ECDH-ES" === l2)) throw TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${l2}`);
          aI("dir" === l2 ? u2 : l2, e10, "encrypt");
          {
            let a11, i11 = await aU(e10, l2);
            ({ cek: n10, encryptedKey: r10, parameters: a11 } = await iQ(l2, u2, i11, this.#R, this.#C)), a11 && (t10 && iY in t10 ? this.#T ? this.#T = { ...this.#T, ...a11 } : this.setUnprotectedHeader(a11) : this.#S ? this.#S = { ...this.#S, ...a11 } : this.setProtectedHeader(a11));
          }
          if (this.#S ? o2 = ar(i10 = aa(JSON.stringify(this.#S))) : (i10 = "", o2 = new Uint8Array()), this.#P) {
            let e11 = ar(s2 = aa(this.#P));
            a10 = n9(o2, ar("."), e11);
          } else a10 = o2;
          let { ciphertext: d2, tag: h2, iv: p2 } = await iu(u2, this.#E, n10, this.#k, a10), f2 = { ciphertext: aa(d2) };
          return p2 && (f2.iv = aa(p2)), h2 && (f2.tag = aa(h2)), r10 && (f2.encrypted_key = aa(r10)), s2 && (f2.aad = s2), this.#S && (f2.protected = i10), this.#A && (f2.unprotected = this.#A), this.#T && (f2.header = this.#T), f2;
        }
      }
      class i0 {
        #x;
        constructor(e10) {
          this.#x = new iZ(e10);
        }
        setContentEncryptionKey(e10) {
          return this.#x.setContentEncryptionKey(e10), this;
        }
        setInitializationVector(e10) {
          return this.#x.setInitializationVector(e10), this;
        }
        setProtectedHeader(e10) {
          return this.#x.setProtectedHeader(e10), this;
        }
        setKeyManagementParameters(e10) {
          return this.#x.setKeyManagementParameters(e10), this;
        }
        async encrypt(e10, t10) {
          let r10 = await this.#x.encrypt(e10, t10);
          return [r10.protected, r10.encrypted_key, r10.iv, r10.ciphertext, r10.tag].join(".");
        }
      }
      class i1 {
        #R;
        #k;
        #C;
        #S;
        #O;
        #N;
        #I;
        #D;
        constructor(e10 = {}) {
          this.#D = new az(e10);
        }
        setIssuer(e10) {
          return this.#D.iss = e10, this;
        }
        setSubject(e10) {
          return this.#D.sub = e10, this;
        }
        setAudience(e10) {
          return this.#D.aud = e10, this;
        }
        setJti(e10) {
          return this.#D.jti = e10, this;
        }
        setNotBefore(e10) {
          return this.#D.nbf = e10, this;
        }
        setExpirationTime(e10) {
          return this.#D.exp = e10, this;
        }
        setIssuedAt(e10) {
          return this.#D.iat = e10, this;
        }
        setProtectedHeader(e10) {
          if (this.#S) throw TypeError("setProtectedHeader can only be called once");
          return this.#S = e10, this;
        }
        setKeyManagementParameters(e10) {
          if (this.#C) throw TypeError("setKeyManagementParameters can only be called once");
          return this.#C = e10, this;
        }
        setContentEncryptionKey(e10) {
          if (this.#R) throw TypeError("setContentEncryptionKey can only be called once");
          return this.#R = e10, this;
        }
        setInitializationVector(e10) {
          if (this.#k) throw TypeError("setInitializationVector can only be called once");
          return this.#k = e10, this;
        }
        replicateIssuerAsHeader() {
          return this.#O = true, this;
        }
        replicateSubjectAsHeader() {
          return this.#N = true, this;
        }
        replicateAudienceAsHeader() {
          return this.#I = true, this;
        }
        async encrypt(e10, t10) {
          let r10 = new i0(this.#D.data());
          return this.#S && (this.#O || this.#N || this.#I) && (this.#S = { ...this.#S, iss: this.#O ? this.#D.iss : void 0, sub: this.#N ? this.#D.sub : void 0, aud: this.#I ? this.#D.aud : void 0 }), r10.setProtectedHeader(this.#S), this.#k && r10.setInitializationVector(this.#k), this.#R && r10.setContentEncryptionKey(this.#R), this.#C && r10.setKeyManagementParameters(this.#C), r10.encrypt(e10, t10);
        }
      }
      async function i2(e10, t10, r10) {
        let n10 = await iy(e10, t10, r10), a10 = aJ(n10.protectedHeader, n10.plaintext, r10), { protectedHeader: i10 } = n10;
        if (void 0 !== i10.iss && i10.iss !== a10.iss) throw new nU('replicated "iss" claim header parameter mismatch', a10, "iss", "mismatch");
        if (void 0 !== i10.sub && i10.sub !== a10.sub) throw new nU('replicated "sub" claim header parameter mismatch', a10, "sub", "mismatch");
        if (void 0 !== i10.aud && JSON.stringify(i10.aud) !== JSON.stringify(a10.aud)) throw new nU('replicated "aud" claim header parameter mismatch', a10, "aud", "mismatch");
        let o2 = { payload: a10, protectedHeader: i10 };
        return "function" == typeof t10 ? { ...o2, key: n10.key } : o2;
      }
      var i4 = e.i(422423), i4 = i4;
      let i5 = "sha256", i8 = "JWE CEK";
      async function i3(e10, t10, r10, n10) {
        let a10 = await iX(i5, t10, "", i8, 32);
        return (await new i1(e10).setProtectedHeader({ enc: "A256GCM", alg: "dir", ...n10 }).setExpirationTime(r10).encrypt(a10)).toString();
      }
      async function i6(e10, t10, r10) {
        try {
          let n10 = await iX(i5, t10, "", i8, 32);
          return await i2(e10, n10, { ...r10, clockTolerance: 15 });
        } catch (e11) {
          if ("ERR_JWT_EXPIRED" === e11.code) return null;
          throw e11;
        }
      }
      async function i9(e10, t10, r10) {
        if (!t10) return;
        let [n10, a10] = t10.split("."), i10 = { protected: i4.encode(JSON.stringify({ alg: "HS256", b64: false, crit: ["b64"] })), payload: `${e10}=${n10}`, signature: a10 }, o2 = await iX("sha256", r10, "", "JWS Cookie Signing", 32);
        try {
          return await aL(i10, o2, { algorithms: ["HS256"] }), n10;
        } catch (e11) {
          return;
        }
      }
      let i7 = RegExp("__(\\d+)$"), oe = /\.(\d+)$/, ot = (e10, t10) => {
        let r10 = t10 ? oe.exec(e10) : i7.exec(e10);
        if (r10) return parseInt(r10[1], 10);
      }, or = (e10, t10, r10) => {
        let n10 = new RegExp(r10 ? `^${t10}${oe.source}$` : `^${t10}__\\d+$`);
        return e10.getAll().filter((e11) => n10.test(e11.name));
      };
      function on(e10, t10, r10) {
        let n10 = t10.get(e10);
        if (n10?.value) return n10.value;
        let a10 = or(t10, e10, r10).sort((e11, t11) => ot(e11.name, r10) - ot(t11.name, r10));
        if (0 === a10.length) return;
        let i10 = ot(a10[a10.length - 1].name, r10);
        return a10.length !== i10 + 1 ? void console.warn(`Incomplete chunked cookie '${e10}': Found ${a10.length} chunks, expected ${i10 + 1}`) : a10.map((e11) => e11.value).join("");
      }
      function oa(e10, t10, r10, n10, a10) {
        oo(r10, e10, a10), or(t10, e10, n10).forEach((e11) => {
          oo(r10, e11.name, a10);
        });
      }
      function oi(e10) {
        e10.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate, max-age=0"), e10.headers.set("Pragma", "no-cache"), e10.headers.set("Expires", "0");
      }
      function oo(e10, t10, r10) {
        let n10 = { maxAge: 0 };
        r10?.domain && (n10.domain = r10.domain), r10?.path && (n10.path = r10.path), e10.set(t10, "", n10);
      }
      class os {
        constructor(e10, t10) {
          this.hooks = t10, this.config = { ...e10, fetch: e10.fetch || fetch };
        }
        isAbsoluteUrl(e10) {
          try {
            return new URL(e10), true;
          } catch {
            return false;
          }
        }
        buildUrl(e10, t10) {
          if (t10) {
            if (this.isAbsoluteUrl(t10)) return t10;
            if (e10) return `${e10.replace(/\/?\/$/, "")}/${t10.replace(/^\/+/, "")}`;
          }
          throw TypeError("`url` must be absolute or `baseUrl` non-empty.");
        }
        getAccessToken(e10) {
          return this.config.getAccessToken ? this.config.getAccessToken(e10 ?? {}) : this.hooks.getAccessToken(e10 ?? {});
        }
        buildBaseRequest(e10, t10) {
          let r10;
          return r10 = e10 instanceof Request ? e10.url : e10 instanceof URL ? e10.toString() : this.config.baseUrl && !this.isAbsoluteUrl(e10) ? this.buildUrl(this.config.baseUrl, e10) : e10, new Request(r10, t10);
        }
        getHeader(e10, t10) {
          return Array.isArray(e10) ? new Headers(e10).get(t10) || "" : "function" == typeof e10.get ? e10.get(t10) || "" : e10[t10] || "";
        }
        async internalFetchWithAuth(e10, t10, r10, n10) {
          let a10, i10, o2 = this.buildBaseRequest(e10, t10), s2 = await this.getAccessToken(n10);
          "string" == typeof s2 ? (a10 = !!this.config.dpopHandle, i10 = s2) : (a10 = !!this.config.dpopHandle && s2.token_type?.toLowerCase() === "dpop", i10 = s2.accessToken);
          try {
            return await rN(i10, o2.method, new URL(o2.url), o2.headers, o2.body, { ...this.config.httpOptions(), [tK]: (e11, t11) => this.config.fetch(e11, t11), [tU]: this.config.allowInsecureRequests || false, ...a10 && { DPoP: this.config.dpopHandle } });
          } catch (e11) {
            if (rm(e11) && r10.onUseDpopNonceError) return r10.onUseDpopNonceError();
            throw e11;
          }
        }
        isRequestInit(e10) {
          return !!e10 && "object" == typeof e10 && !["refresh", "scope", "audience"].some((t10) => Object.prototype.hasOwnProperty.call(e10, t10));
        }
        fetchWithAuth(e10, t10, r10) {
          let n10, a10;
          2 == arguments.length && void 0 !== t10 ? this.isRequestInit(t10) ? (n10 = t10, a10 = void 0) : (n10 = void 0, a10 = t10) : (n10 = t10, a10 = r10);
          let i10 = { onUseDpopNonceError: async () => {
            let t11 = this.config.retryConfig ?? { delay: 100, jitter: true }, r11 = t11.delay ?? 100;
            t11.jitter && (r11 *= 0.5 + 0.5 * Math.random()), await new Promise((e11) => setTimeout(e11, r11));
            try {
              return await this.internalFetchWithAuth(e10, n10, { ...i10, onUseDpopNonceError: void 0 }, a10);
            } catch (e11) {
              if (rm(e11)) {
                let t12 = Error(`DPoP nonce error persisted after retry: ${e11.message}`);
                throw t12.code = e11.code || "dpop_nonce_retry_failed", t12;
              }
              throw e11;
            }
          } };
          return this.internalFetchWithAuth(e10, n10, i10, a10);
        }
      }
      let oc = ["sub", "name", "nickname", "given_name", "family_name", "picture", "email", "email_verified", "org_id"];
      var ol = function(e10, t10, r10, n10) {
        if ("a" === r10 && !n10) throw TypeError("Private accessor was defined without a getter");
        if ("function" == typeof t10 ? e10 !== t10 || !n10 : !t10.has(e10)) throw TypeError("Cannot read private member from an object whose class did not declare it");
        return "m" === r10 ? n10 : "a" === r10 ? n10.call(e10) : n10 ? n10.value : t10.get(e10);
      };
      let ou = ["client_id", "redirect_uri", "response_type", "code_challenge", "code_challenge_method", "state", "nonce"];
      function od(e10, t10) {
        return new URL(iM(((e11) => {
          let t11 = process.env.NEXT_PUBLIC_BASE_PATH;
          return t11 ? iD(t11 && !t11.startsWith("/") ? `/${t11}` : t11) + iM(e11) : e11;
        })(e10)), iD(t10));
      }
      class oh {
        constructor(e10) {
          q.add(this), this.proxyFetchers = {}, this.fetch = e10.fetch || fetch, this.jwksCache = e10.jwksCache || {}, this.allowInsecureRequests = e10.allowInsecureRequests ?? false, this.httpTimeout = e10.httpTimeout ?? 5e3, this.httpOptions = () => {
            let t11 = new Headers();
            if (e10.enableTelemetry ?? true) {
              let e11 = "nextjs-auth0", r11 = iN.default.version;
              t11.set("User-Agent", `${e11}/${r11}`), t11.set("Auth0-Client", op(JSON.stringify({ name: e11, version: r11 })));
            }
            return { signal: AbortSignal.timeout(this.httpTimeout), headers: t11 };
          }, this.allowInsecureRequests && console.warn("allowInsecureRequests is enabled in a production environment. This is not recommended."), this.transactionStore = e10.transactionStore, this.sessionStore = e10.sessionStore, this.domain = e10.domain, this.clientMetadata = { client_id: e10.clientId }, e10.dpopOptions && ("number" == typeof e10.dpopOptions.clockSkew && (this.clientMetadata[tL] = e10.dpopOptions.clockSkew), "number" == typeof e10.dpopOptions.clockTolerance && (this.clientMetadata[tH] = e10.dpopOptions.clockTolerance)), this.dpopOptions = e10.dpopOptions, this.clientSecret = e10.clientSecret, this.authorizationParameters = e10.authorizationParameters || { scope: tO }, this.pushedAuthorizationRequests = e10.pushedAuthorizationRequests ?? false, this.clientAssertionSigningKey = e10.clientAssertionSigningKey, this.clientAssertionSigningAlg = e10.clientAssertionSigningAlg || "RS256", this.authorizationParameters.scope = function(e11) {
            if (!e11.scope) return tO;
            if ("object" == typeof e11.scope && !nA(e11.scope, e11.audience)) {
              let t11 = e11.audience;
              return { ...e11.scope, [t11]: tO };
            }
            return e11.scope;
          }(this.authorizationParameters);
          const t10 = nA(this.authorizationParameters.scope, this.authorizationParameters.audience)?.split(" ").map((e11) => e11.trim());
          if (!t10 || !t10.includes("openid")) throw Error("The 'openid' scope must be included in the set of scopes. See https://auth0.com/docs");
          this.appBaseUrl = e10.appBaseUrl, this.signInReturnToPath = e10.signInReturnToPath || "/";
          const r10 = ["auto", "oidc", "v2"];
          let n10 = e10.logoutStrategy || "auto";
          r10.includes(n10) || (console.error(`Invalid logoutStrategy: ${n10}. Must be one of: ${r10.join(", ")}. Defaulting to "auto"`), n10 = "auto"), this.logoutStrategy = n10, this.includeIdTokenHintInOIDCLogoutUrl = e10.includeIdTokenHintInOIDCLogoutUrl ?? true, this.beforeSessionSaved = e10.beforeSessionSaved, this.onCallback = e10.onCallback || this.defaultOnCallback, this.routes = e10.routes, this.enableAccessTokenEndpoint = e10.enableAccessTokenEndpoint ?? true, this.noContentProfileResponseWhenUnauthenticated = e10.noContentProfileResponseWhenUnauthenticated ?? false, this.enableConnectAccountEndpoint = e10.enableConnectAccountEndpoint ?? false, this.useDPoP = e10.useDPoP ?? false, e10.useDPoP && e10.dpopKeyPair && (this.dpopKeyPair = e10.dpopKeyPair);
        }
        async handler(e10) {
          let t10, { pathname: r10 } = e10.nextUrl, n10 = e10.nextUrl.basePath;
          n10 && r10.startsWith(n10) && (r10 = r10.slice(n10.length) || "/");
          let a10 = (t10 = r10).endsWith("/") ? t10.slice(0, -1) : t10, i10 = e10.method;
          if ("GET" === i10 && a10 === this.routes.login) return this.handleLogin(e10);
          {
            if ("GET" === i10 && a10 === this.routes.logout) return this.handleLogout(e10);
            if ("GET" === i10 && a10 === this.routes.callback) return this.handleCallback(e10);
            if ("GET" === i10 && a10 === this.routes.profile) return this.handleProfile(e10);
            if ("GET" === i10 && a10 === this.routes.accessToken && this.enableAccessTokenEndpoint) return this.handleAccessToken(e10);
            if ("POST" === i10 && a10 === this.routes.backChannelLogout) return this.handleBackChannelLogout(e10);
            if ("GET" === i10 && a10 === this.routes.connectAccount && this.enableConnectAccountEndpoint) return this.handleConnectAccount(e10);
            if (a10.startsWith("/me/")) return this.handleMyAccount(e10);
            if (a10.startsWith("/my-org/")) return this.handleMyOrg(e10);
            let t11 = tp.NextResponse.next(), r11 = await this.sessionStore.get(e10.cookies);
            return r11 && (await this.sessionStore.set(e10.cookies, t11.cookies, { ...r11 }), oi(t11)), t11;
          }
        }
        async startInteractiveLogin(e10 = {}) {
          let t10 = od(this.routes.callback, this.appBaseUrl), r10 = this.signInReturnToPath;
          if (e10.returnTo) {
            let t11 = new URL(this.authorizationParameters.redirect_uri || this.appBaseUrl), n11 = iW(e10.returnTo, t11);
            n11 && (r10 = n11.pathname + n11.search + n11.hash);
          }
          let n10 = t7(), a10 = await re(n10), i10 = t7(), o2 = t7(), s2 = iI(this.authorizationParameters, e10.authorizationParameters, ou);
          if (s2.set("client_id", this.clientMetadata.client_id), s2.set("redirect_uri", t10.toString()), s2.set("response_type", $.CODE), s2.set("code_challenge", a10), s2.set("code_challenge_method", "S256"), s2.set("state", i10), s2.set("nonce", o2), this.dpopKeyPair) try {
            let e11 = await ao(this.dpopKeyPair.publicKey), t11 = await ad(e11);
            s2.set("dpop_jkt", t11);
          } catch (e11) {
            throw new tk(H.DPOP_JKT_CALCULATION_FAILED, "DPoP is enabled but failed to calculate key thumbprint (dpop_jkt). This is required for secure DPoP binding. Please check your key configuration.", e11 instanceof Error ? e11 : void 0);
          }
          let c2 = { nonce: o2, maxAge: this.authorizationParameters.max_age, codeVerifier: n10, responseType: $.CODE, state: i10, returnTo: r10, scope: s2.get("scope") || void 0, audience: s2.get("audience") || void 0 }, [l2, u2] = await this.authorizationUrl(s2);
          if (l2) return new tp.NextResponse("An error occurred while trying to initiate the login request.", { status: 500 });
          let d2 = tp.NextResponse.redirect(u2.toString());
          return await this.transactionStore.save(d2.cookies, c2), d2;
        }
        async handleLogin(e10) {
          let { returnTo: t10, ...r10 } = Object.fromEntries(e10.nextUrl.searchParams.entries());
          return this.startInteractiveLogin({ authorizationParameters: r10, returnTo: t10 });
        }
        async handleLogout(e10) {
          let t10, r10 = await this.sessionStore.get(e10.cookies), [n10, a10] = await this.discoverAuthorizationServerMetadata();
          if (n10) {
            let t11 = new tp.NextResponse("An error occurred while trying to initiate the logout request.", { status: 500 });
            return await this.sessionStore.delete(e10.cookies, t11.cookies), await this.transactionStore.deleteAll(e10.cookies, t11.cookies), t11;
          }
          let i10 = e10.nextUrl.searchParams.get("returnTo") || this.appBaseUrl, o2 = e10.nextUrl.searchParams.has("federated"), s2 = () => {
            let e11 = new URL("/v2/logout", this.issuer);
            return e11.searchParams.set("returnTo", i10), e11.searchParams.set("client_id", this.clientMetadata.client_id), o2 && e11.searchParams.set("federated", ""), tp.NextResponse.redirect(e11);
          }, c2 = () => {
            let e11 = new URL(a10.end_session_endpoint);
            return e11.searchParams.set("client_id", this.clientMetadata.client_id), e11.searchParams.set("post_logout_redirect_uri", i10), r10?.internal.sid && e11.searchParams.set("logout_hint", r10.internal.sid), this.includeIdTokenHintInOIDCLogoutUrl && r10?.tokenSet.idToken && e11.searchParams.set("id_token_hint", r10.tokenSet.idToken), o2 && e11.searchParams.set("federated", ""), tp.NextResponse.redirect(e11);
          };
          if ("v2" === this.logoutStrategy) t10 = s2();
          else if ("oidc" === this.logoutStrategy) {
            if (!a10.end_session_endpoint) {
              let t11 = new tp.NextResponse("OIDC RP-Initiated Logout is not supported by the authorization server. Enable it or use a different logout strategy.", { status: 500 });
              return await this.sessionStore.delete(e10.cookies, t11.cookies), await this.transactionStore.deleteAll(e10.cookies, t11.cookies), t11;
            }
            t10 = c2();
          } else a10.end_session_endpoint ? t10 = c2() : (console.warn("The Auth0 client does not have RP-initiated logout enabled, the user will be redirected to the `/v2/logout` endpoint instead. Learn how to enable it here: https://auth0.com/docs/authenticate/login/logout/log-users-out-of-auth0#enable-endpoint-discovery"), t10 = s2());
          return await this.sessionStore.delete(e10.cookies, t10.cookies), oi(t10), await this.transactionStore.deleteAll(e10.cookies, t10.cookies), t10;
        }
        async handleCallback(e10) {
          let t10, r10, n10, a10, i10, o2 = e10.nextUrl.searchParams.get("state");
          if (!o2) return this.handleCallbackError(new tm(), {}, e10);
          let s2 = await this.transactionStore.get(e10.cookies, o2);
          if (!s2) return this.onCallback(new tw(), {}, null);
          let c2 = s2.payload, l2 = { responseType: c2.responseType, returnTo: c2.returnTo };
          if (c2.responseType === $.CONNECT_CODE) {
            let t11 = await this.sessionStore.get(e10.cookies);
            if (!t11) return this.handleCallbackError(new tx({ code: K.MISSING_SESSION, message: "The user does not have an active session." }), l2, e10, o2);
            let [r11, n11] = await this.getTokenSet(t11, { audience: `${this.issuer}/me/`, scope: "create:me:connected_accounts" });
            if (r11) return this.handleCallbackError(r11, l2, e10, o2);
            let [a11, i11] = await this.completeConnectAccount({ tokenSet: n11.tokenSet, authSession: c2.authSession, connectCode: e10.nextUrl.searchParams.get("connect_code"), redirectUri: od(this.routes.callback, this.appBaseUrl).toString(), codeVerifier: c2.codeVerifier });
            if (a11) return this.handleCallbackError(a11, l2, e10, o2);
            let s3 = await this.onCallback(null, { ...l2, connectedAccount: i11 }, t11);
            return await this.transactionStore.delete(s3.cookies, o2), s3;
          }
          let [u2, d2] = await this.discoverAuthorizationServerMetadata();
          if (u2) return this.handleCallbackError(u2, l2, e10, o2);
          try {
            t10 = function(e11, t11, r11, n11) {
              var a11;
              if (ri(e11), ro(t11), r11 instanceof URL && (r11 = r11.searchParams), !(r11 instanceof URLSearchParams)) throw tj('"parameters" must be an instance of URLSearchParams, or URL', tM);
              if (nd(r11, "response")) throw tV('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()', r8, { parameters: r11 });
              let i11 = nd(r11, "iss"), o3 = nd(r11, "state");
              if (!i11 && e11.authorization_response_iss_parameter_supported) throw tV('response parameter "iss" (issuer) missing', r8, { parameters: r11 });
              if (i11 && i11 !== e11.issuer) throw tV('unexpected "iss" (issuer) response parameter value', r8, { expected: e11.issuer, parameters: r11 });
              switch (n11) {
                case void 0:
                case np:
                  if (void 0 !== o3) throw tV('unexpected "state" response parameter encountered', r8, { expected: void 0, parameters: r11 });
                  break;
                case nh:
                  break;
                default:
                  if (t3(n11, '"expectedState" argument'), o3 !== n11) throw tV(void 0 === o3 ? 'response parameter "state" missing' : 'unexpected "state" response parameter value', r8, { expected: n11, parameters: r11 });
              }
              if (nd(r11, "error")) throw new r_("authorization response from the server is an error", { cause: r11 });
              let s3 = nd(r11, "id_token"), c3 = nd(r11, "token");
              if (void 0 !== s3 || void 0 !== c3) throw new tG("implicit and hybrid flows are not supported");
              return a11 = new URLSearchParams(r11), rB.add(a11), a11;
            }(d2, this.clientMetadata, e10.nextUrl.searchParams, c2.state);
          } catch (t11) {
            return this.handleCallbackError(new t_({ cause: new tg({ code: t11.error, message: t11.error_description }) }), l2, e10, o2);
          }
          try {
            n10 = od(this.routes.callback, this.appBaseUrl);
            let e11 = this.useDPoP && this.dpopKeyPair ? rw(this.clientMetadata, this.dpopKeyPair) : void 0;
            a10 = async () => rz(d2, this.clientMetadata, await this.getClientAuth(), t10, n10.toString(), c2.codeVerifier, { ...this.httpOptions(), [tK]: this.fetch, [tU]: this.allowInsecureRequests, ...e11 && { DPoP: e11 } }), r10 = await nS(a10, { isDPoPEnabled: !!e11, ...this.dpopOptions?.retry });
          } catch (t11) {
            return this.handleCallbackError(new tv(t11.message), l2, e10, o2);
          }
          try {
            i10 = await rY(d2, this.clientMetadata, r10, { expectedNonce: c2.nonce, maxAge: c2.maxAge, requireIdToken: true });
          } catch (t11) {
            return this.handleCallbackError(new tE({ cause: new tg({ code: t11.error, message: t11.error_description }) }), l2, e10, o2);
          }
          let h2 = rL(i10), p2 = { user: h2, tokenSet: { accessToken: i10.access_token, idToken: i10.id_token, scope: i10.scope, requestedScope: c2.scope, audience: c2.audience, refreshToken: i10.refresh_token, expiresAt: Math.floor(Date.now() / 1e3) + Number(i10.expires_in) }, internal: { sid: h2.sid, createdAt: Math.floor(Date.now() / 1e3) } }, f2 = await this.onCallback(null, l2, p2);
          return p2 = await this.finalizeSession(p2, i10.id_token), await this.sessionStore.set(e10.cookies, f2.cookies, p2, true), oi(f2), await this.transactionStore.delete(f2.cookies, o2), f2;
        }
        async handleProfile(e10) {
          let t10 = await this.sessionStore.get(e10.cookies);
          if (!t10) return this.noContentProfileResponseWhenUnauthenticated ? new tp.NextResponse(null, { status: 204 }) : new tp.NextResponse(null, { status: 401 });
          let r10 = tp.NextResponse.json(t10?.user);
          return oi(r10), r10;
        }
        async handleAccessToken(e10) {
          let t10 = await this.sessionStore.get(e10.cookies), r10 = e10.nextUrl.searchParams.get("audience"), n10 = e10.nextUrl.searchParams.get("scope");
          if (!t10) return tp.NextResponse.json({ error: { message: "The user does not have an active session.", code: U.MISSING_SESSION } }, { status: 401 });
          let [a10, i10] = await this.getTokenSet(t10, { scope: n10, audience: r10 });
          if (a10) return tp.NextResponse.json({ error: { message: a10.message, code: a10.code } }, { status: 401 });
          let { tokenSet: o2 } = i10, s2 = tp.NextResponse.json({ token: o2.accessToken, scope: o2.scope, expires_at: o2.expiresAt, ...o2.token_type && { token_type: o2.token_type } });
          return await ol(this, q, "m", G).call(this, e10, s2, t10, i10), s2;
        }
        async handleBackChannelLogout(e10) {
          if (!this.sessionStore.store) return new tp.NextResponse("A session data store is not configured.", { status: 500 });
          if (!this.sessionStore.store.deleteByLogoutToken) return new tp.NextResponse("Back-channel logout is not supported by the session data store.", { status: 500 });
          let t10 = new URLSearchParams(await e10.text()).get("logout_token");
          if (!t10) return new tp.NextResponse("Missing `logout_token` in the request body.", { status: 400 });
          let [r10, n10] = await this.verifyLogoutToken(t10);
          return r10 ? new tp.NextResponse(r10.message, { status: 400 }) : (await this.sessionStore.store.deleteByLogoutToken(n10), new tp.NextResponse(null, { status: 204 }));
        }
        async handleConnectAccount(e10) {
          let t10 = await this.sessionStore.get(e10.cookies), r10 = e10.nextUrl.searchParams.get("connection"), n10 = e10.nextUrl.searchParams.get("returnTo") ?? void 0, a10 = Object.fromEntries([...e10.nextUrl.searchParams.entries()].filter(([e11]) => "connection" !== e11 && "returnTo" !== e11));
          if (!r10) return new tp.NextResponse("A connection is required.", { status: 400 });
          if (!t10) return new tp.NextResponse("The user does not have an active session.", { status: 401 });
          let [i10, o2] = await this.getTokenSet(t10, { scope: "create:me:connected_accounts", audience: `${this.issuer}/me/` });
          if (i10) return new tp.NextResponse("Failed to retrieve a connected account access token.", { status: 401 });
          let { tokenSet: s2 } = o2, [c2, l2] = await this.connectAccount({ tokenSet: s2, connection: r10, authorizationParams: a10, returnTo: n10 });
          return c2 ? new tp.NextResponse(c2.message, { status: c2.cause?.status ?? 500 }) : (await ol(this, q, "m", G).call(this, e10, l2, t10, o2), l2);
        }
        async handleMyAccount(e10) {
          return ol(this, q, "m", z).call(this, e10, { proxyPath: "/me", targetBaseUrl: `${this.issuer}/me/v1`, audience: `${this.issuer}/me/`, scope: e10.headers.get("scope") });
        }
        async handleMyOrg(e10) {
          return ol(this, q, "m", z).call(this, e10, { proxyPath: "/my-org", targetBaseUrl: `${this.issuer}/my-org`, audience: `${this.issuer}/my-org/`, scope: e10.headers.get("scope") });
        }
        async getTokenSet(e10, t10 = {}) {
          let r10 = nk(nA(this.authorizationParameters.scope, t10.audience ?? this.authorizationParameters.audience), t10.scope), n10 = ol(this, q, "m", B).call(this, e10, { scope: r10, audience: t10.audience ?? this.authorizationParameters.audience });
          if (!n10.refreshToken && !n10.accessToken) return [new tP(U.MISSING_REFRESH_TOKEN, "No access token found and a refresh token was not provided. The user needs to re-authenticate."), null];
          if (!n10.refreshToken && n10.accessToken && n10.expiresAt && n10.expiresAt <= Date.now() / 1e3) return [new tP(U.MISSING_REFRESH_TOKEN, "The access token has expired and a refresh token was not provided. The user needs to re-authenticate."), null];
          if (n10.refreshToken && (t10.refresh || !n10.expiresAt || n10.expiresAt <= Date.now() / 1e3)) {
            let [e11, a10] = await ol(this, q, "m", F).call(this, n10, { audience: t10.audience, scope: t10.scope ? r10 : void 0, requestedScope: r10 });
            return e11 ? [e11, null] : [null, { tokenSet: a10.updatedTokenSet, idTokenClaims: a10.idTokenClaims }];
          }
          return [null, { tokenSet: n10, idTokenClaims: void 0 }];
        }
        async backchannelAuthentication(e10) {
          let [t10, r10] = await this.discoverAuthorizationServerMetadata();
          if (t10) return [t10, null];
          if (!r10.backchannel_authentication_endpoint) return [new tA(), null];
          let n10 = iI(this.authorizationParameters, e10.authorizationParams, ou);
          n10.get("scope") || n10.set("scope", tO), n10.set("client_id", this.clientMetadata.client_id), n10.set("binding_message", e10.bindingMessage), n10.set("login_hint", JSON.stringify({ format: "iss_sub", iss: r10.issuer, sub: e10.loginHint.sub })), e10.requestedExpiry && n10.append("requested_expiry", e10.requestedExpiry.toString()), e10.authorizationDetails && n10.append("authorization_details", JSON.stringify(e10.authorizationDetails));
          let [a10, i10] = await this.getOpenIdClientConfig();
          if (a10) return [a10, null];
          try {
            let e11 = await iR(i10, n10), t11 = await ik(i10, e11), r11 = Math.floor(Date.now() / 1e3) + Number(t11.expires_in);
            return [null, { tokenSet: { accessToken: t11.access_token, idToken: t11.id_token, scope: t11.scope, refreshToken: t11.refresh_token, expiresAt: r11 }, idTokenClaims: t11.claims(), authorizationDetails: t11.authorization_details }];
          } catch (e11) {
            return [new tT({ cause: new tg({ code: e11.error, message: e11.error_description }) }), null];
          }
        }
        async discoverAuthorizationServerMetadata() {
          if (this.authorizationServerMetadata) return [null, this.authorizationServerMetadata];
          let e10 = new URL(this.issuer);
          try {
            let t10 = await t5(e10, { ...this.httpOptions(), [tK]: this.fetch, [tU]: this.allowInsecureRequests }).then((t11) => t6(e10, t11));
            return this.authorizationServerMetadata = t10, [null, t10];
          } catch (t10) {
            return console.error(`An error occurred while performing the discovery request. issuer=${e10.toString()}, error:`, t10), [new ty("Discovery failed for the OpenID Connect configuration."), null];
          }
        }
        async defaultOnCallback(e10, t10) {
          return e10 ? new tp.NextResponse(e10.message, { status: 500 }) : tp.NextResponse.redirect(od(t10.returnTo || "/", this.appBaseUrl));
        }
        async handleCallbackError(e10, t10, r10, n10) {
          let a10 = await this.onCallback(e10, t10, null);
          return n10 && await this.transactionStore.delete(a10.cookies, n10), a10;
        }
        async verifyLogoutToken(e10) {
          let t10, r10, [n10, a10] = await this.discoverAuthorizationServerMetadata();
          if (n10) return [n10, null];
          let i10 = (t10 = new aE(new URL(a10.jwks_uri), { [av]: this.jwksCache }), Object.defineProperties(r10 = async (e11, r11) => t10.getKey(e11, r11), { coolingDown: { get: () => t10.coolingDown(), enumerable: true, configurable: false }, fresh: { get: () => t10.fresh(), enumerable: true, configurable: false }, reload: { value: () => t10.reload(), enumerable: true, configurable: false, writable: false }, reloading: { get: () => t10.pendingFetch(), enumerable: true, configurable: false }, jwks: { value: () => t10.jwks(), enumerable: true, configurable: false, writable: false } }), r10), { payload: o2 } = await aG(e10, i10, { issuer: a10.issuer, audience: this.clientMetadata.client_id, algorithms: ["RS256"], requiredClaims: ["iat"] });
          return "sid" in o2 || "sub" in o2 ? "sid" in o2 && "string" != typeof o2.sid ? [new tS('"sid" claim must be a string'), null] : "sub" in o2 && "string" != typeof o2.sub ? [new tS('"sub" claim must be a string'), null] : "nonce" in o2 ? [new tS('"nonce" claim is prohibited'), null] : "events" in o2 ? "object" != typeof o2.events || null === o2.events ? [new tS('"events" claim must be an object'), null] : "http://schemas.openid.net/event/backchannel-logout" in o2.events ? "object" != typeof o2.events["http://schemas.openid.net/event/backchannel-logout"] ? [new tS('"http://schemas.openid.net/event/backchannel-logout" member in the "events" claim must be an object'), null] : [null, { sid: o2.sid, sub: o2.sub }] : [new tS('"http://schemas.openid.net/event/backchannel-logout" member is missing in the "events" claim'), null] : [new tS('"events" claim is missing'), null] : [new tS('either "sid" or "sub" (or both) claims must be present'), null];
        }
        async authorizationUrl(e10) {
          let [t10, r10] = await this.discoverAuthorizationServerMetadata();
          if (t10) return [t10, null];
          if (this.pushedAuthorizationRequests && !r10.pushed_authorization_request_endpoint) return console.error("The Auth0 tenant does not have pushed authorization requests enabled. Learn how to enable it here: https://auth0.com/docs/get-started/applications/configure-par"), [Error("The authorization server does not support pushed authorization requests."), null];
          let n10 = new URL(r10.authorization_endpoint);
          if (this.pushedAuthorizationRequests) {
            let t11, a10 = await rg(r10, this.clientMetadata, await this.getClientAuth(), e10, { ...this.httpOptions(), [tK]: this.fetch, [tU]: this.allowInsecureRequests });
            try {
              t11 = await rR(r10, this.clientMetadata, a10);
            } catch (e11) {
              return [new t_({ cause: new tg({ code: e11.error, message: e11.error_description }), message: "An error occurred while pushing the authorization request." }), null];
            }
            return n10.searchParams.set("request_uri", t11.request_uri), n10.searchParams.set("client_id", this.clientMetadata.client_id), [null, n10];
          }
          return n10.search = e10.toString(), [null, n10];
        }
        async getClientAuth() {
          if (!this.clientSecret && !this.clientAssertionSigningKey) throw Error("The client secret or client assertion signing key must be provided.");
          let e10 = this.clientAssertionSigningKey;
          return e10 && "string" == typeof e10 && (e10 = await ap(e10, this.clientAssertionSigningAlg)), e10 ? function(e11, t10) {
            let { key: r10, kid: n10 } = e11 instanceof CryptoKey ? { key: e11 } : e11?.key instanceof CryptoKey ? (void 0 !== e11.kid && t3(e11.kid, '"kid"'), { key: e11.key, kid: e11.kid }) : {};
            return tQ(r10, '"clientPrivateKey.key"'), async (e12, t11, a10, i10) => {
              let o2, s2 = { alg: rt(r10), kid: n10 }, c2 = (o2 = ra() + rr(t11), { jti: t7(), aud: e12.issuer, exp: o2 + 60, iat: o2, nbf: o2, iss: t11.client_id, sub: t11.client_id });
              a10.set("client_id", t11.client_id), a10.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), a10.set("client_assertion", await rc(s2, c2, r10));
            };
          }(e10) : rs(this.clientSecret);
        }
        get issuer() {
          return this.domain.startsWith("http://") || this.domain.startsWith("https://") ? this.domain : `https://${this.domain}`;
        }
        async getConnectionTokenSet(e10, t10, r10) {
          if (!e10.refreshToken && (!t10 || t10.expiresAt <= Date.now() / 1e3)) return [new tR(L.MISSING_REFRESH_TOKEN, "A refresh token was not present, Connection Access Token requires a refresh token. The user needs to re-authenticate."), null];
          if (e10.refreshToken && (!t10 || t10.expiresAt <= Date.now() / 1e3)) {
            let t11, n10 = new URLSearchParams();
            n10.append("connection", r10.connection);
            let a10 = r10.subject_token_type ?? W.SUBJECT_TYPE_REFRESH_TOKEN, i10 = a10 === W.SUBJECT_TYPE_ACCESS_TOKEN ? e10.accessToken : e10.refreshToken;
            n10.append("subject_token_type", a10), n10.append("subject_token", i10), n10.append("requested_token_type", "http://auth0.com/oauth/token-type/federated-connection-access-token"), r10.login_hint && n10.append("login_hint", r10.login_hint);
            let [o2, s2] = await this.discoverAuthorizationServerMetadata();
            if (o2) return [o2, null];
            let c2 = this.useDPoP && this.dpopKeyPair ? rw(this.clientMetadata, this.dpopKeyPair) : void 0, l2 = async () => ni(s2, this.clientMetadata, await this.getClientAuth(), "urn:auth0:params:oauth:grant-type:token-exchange:federated-connection-access-token", n10, { [tK]: this.fetch, [tU]: this.allowInsecureRequests, ...c2 && { DPoP: c2 } }), u2 = async () => {
              let e11 = await l2();
              return no(s2, this.clientMetadata, e11);
            };
            try {
              t11 = await nS(u2, { isDPoPEnabled: !!(this.useDPoP && this.dpopKeyPair), ...this.dpopOptions?.retry });
            } catch (e11) {
              return [new tR(L.FAILED_TO_EXCHANGE, "There was an error trying to exchange the refresh token for a connection access token.", new tg({ code: e11.error, message: e11.error_description })), null];
            }
            return [null, { accessToken: t11.access_token, expiresAt: Math.floor(Date.now() / 1e3) + Number(t11.expires_in), scope: t11.scope, connection: r10.connection }];
          }
          return [null, t10];
        }
        async finalizeSession(e10, t10) {
          if (this.beforeSessionSaved) e10 = { ...await this.beforeSessionSaved(e10, t10 ?? null), internal: e10.internal };
          else {
            var r10;
            e10.user = Object.keys(r10 = e10.user).reduce((e11, t11) => (oc.includes(t11) && (e11[t11] = r10[t11]), e11), {});
          }
          return e10;
        }
        async connectAccount(e10) {
          let t10 = od(this.routes.callback, this.appBaseUrl), r10 = this.signInReturnToPath;
          if (e10.returnTo) {
            let t11 = new URL(this.authorizationParameters.redirect_uri || this.appBaseUrl), n11 = iW(e10.returnTo, t11);
            n11 && (r10 = n11.pathname + n11.search + n11.hash);
          }
          let n10 = t7(), a10 = await re(n10), i10 = t7(), [o2, s2] = await this.createConnectAccountTicket({ tokenSet: e10.tokenSet, connection: e10.connection, redirectUri: t10.toString(), state: i10, codeChallenge: a10, codeChallengeMethod: "S256", authorizationParams: e10.authorizationParams });
          if (o2) return [o2, null];
          let c2 = { codeVerifier: n10, responseType: $.CONNECT_CODE, state: i10, returnTo: r10, authSession: s2.authSession }, l2 = tp.NextResponse.redirect(`${s2.connectUri}?ticket=${encodeURIComponent(s2.connectParams.ticket)}`);
          return await this.transactionStore.save(l2.cookies, c2), [null, l2];
        }
        async createConnectAccountTicket(e10) {
          try {
            let t10 = new URL("/me/v1/connected-accounts/connect", this.issuer), r10 = await this.fetcherFactory({ useDPoP: this.useDPoP, getAccessToken: async () => ({ accessToken: e10.tokenSet.accessToken, expiresAt: e10.tokenSet.expiresAt || 0, scope: e10.tokenSet.scope, token_type: e10.tokenSet.token_type }), fetch: this.fetch }), n10 = this.httpOptions();
            new Headers(n10.headers).set("Content-Type", "application/json");
            let a10 = { connection: e10.connection, redirect_uri: e10.redirectUri, state: e10.state, code_challenge: e10.codeChallenge, code_challenge_method: e10.codeChallengeMethod, authorization_params: e10.authorizationParams }, i10 = await r10.fetchWithAuth(t10.toString(), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(a10) });
            if (!i10.ok) try {
              let e11 = await i10.json();
              return [new tx({ code: K.FAILED_TO_INITIATE, message: `The request to initiate the connect account flow failed with status ${i10.status}.`, cause: new tC({ type: e11.type, title: e11.title, detail: e11.detail, status: i10.status, validationErrors: e11.validation_errors }) }), null];
            } catch (e11) {
              return [new tx({ code: K.FAILED_TO_INITIATE, message: `The request to initiate the connect account flow failed with status ${i10.status}.` }), null];
            }
            let { connect_uri: o2, connect_params: s2, auth_session: c2, expires_in: l2 } = await i10.json();
            return [null, { connectUri: o2, connectParams: s2, authSession: c2, expiresIn: l2 }];
          } catch (t10) {
            let e11 = "An unexpected error occurred while trying to initiate the connect account flow.";
            return t10 instanceof tk && (e11 = t10.message), [new tx({ code: K.FAILED_TO_INITIATE, message: e11 }), null];
          }
        }
        async completeConnectAccount(e10) {
          let t10 = new URL("/me/v1/connected-accounts/complete", this.issuer);
          try {
            let r10 = this.httpOptions();
            new Headers(r10.headers).set("Content-Type", "application/json");
            let n10 = await this.fetcherFactory({ useDPoP: this.useDPoP, getAccessToken: async () => ({ accessToken: e10.tokenSet.accessToken, expiresAt: e10.tokenSet.expiresAt || 0, scope: e10.tokenSet.scope, token_type: e10.tokenSet.token_type }), fetch: this.fetch }), a10 = { auth_session: e10.authSession, connect_code: e10.connectCode, redirect_uri: e10.redirectUri, code_verifier: e10.codeVerifier }, i10 = await n10.fetchWithAuth(t10, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(a10) });
            if (!i10.ok) try {
              let e11 = await i10.json();
              return [new tx({ code: K.FAILED_TO_COMPLETE, message: `The request to complete the connect account flow failed with status ${i10.status}.`, cause: new tC({ type: e11.type, title: e11.title, detail: e11.detail, status: i10.status, validationErrors: e11.validation_errors }) }), null];
            } catch (e11) {
              return [new tx({ code: K.FAILED_TO_COMPLETE, message: `The request to complete the connect account flow failed with status ${i10.status}.` }), null];
            }
            let { id: o2, connection: s2, access_type: c2, scopes: l2, created_at: u2, expires_at: d2 } = await i10.json();
            return [null, { id: o2, connection: s2, accessType: c2, scopes: l2, createdAt: u2, expiresAt: d2 }];
          } catch (e11) {
            return [new tx({ code: K.FAILED_TO_COMPLETE, message: "An unexpected error occurred while trying to complete the connect account flow." }), null];
          }
        }
        async getOpenIdClientConfig() {
          let [e10, t10] = await this.discoverAuthorizationServerMetadata();
          if (e10) return [e10, null];
          let r10 = new iA(t10, this.clientMetadata.client_id, {}, await this.getClientAuth()), n10 = new Headers(this.httpOptions().headers);
          return r10[tK] = (...e11) => {
            let t11 = new Headers(e11[1].headers);
            return this.fetch(e11[0], { ...e11[1], body: e11[1].body, headers: new Headers([...n10, ...t11]) });
          }, r10.timeout = this.httpTimeout, this.allowInsecureRequests && (l.get(r10).tlsOnly = false), [null, r10];
        }
        async fetcherFactory(e10) {
          if (this.useDPoP && !this.dpopKeyPair) throw new tk(H.DPOP_CONFIGURATION_ERROR, "DPoP is enabled but no keypair is configured.");
          let [t10, r10] = await this.discoverAuthorizationServerMetadata();
          if (t10) throw t10;
          return new os({ dpopHandle: this.useDPoP && (e10.useDPoP ?? true) ? rw(this.clientMetadata, this.dpopKeyPair) : void 0, httpOptions: this.httpOptions, allowInsecureRequests: this.allowInsecureRequests, retryConfig: this.dpopOptions?.retry, fetch: e10.fetch, getAccessToken: e10.getAccessToken, baseUrl: e10.baseUrl }, { getAccessToken: e10.getAccessToken, isDpopEnabled: () => e10.useDPoP ?? this.useDPoP ?? false });
        }
      }
      q = /* @__PURE__ */ new WeakSet(), B = function(e10, t10) {
        var r10;
        let n10, a10 = e10.tokenSet, i10 = t10.audience, o2 = t10.scope, s2 = !i10 || i10 === (a10.audience || this.authorizationParameters.audience), c2 = !o2 || nR(a10.requestedScope || nA(this.authorizationParameters.scope, i10), o2);
        return s2 && c2 ? a10 : (i10 && (n10 = nC(e10, { scope: o2, audience: i10 })), r10 = n10, { ...a10, accessToken: r10?.accessToken, expiresAt: r10?.expiresAt, scope: r10?.scope, requestedScope: r10?.requestedScope, audience: r10?.audience, ...r10?.token_type && { token_type: r10.token_type } });
      }, J = async function(e10, t10) {
        let r10 = iL(e10), n10 = iK(e10, t10);
        r10.set("host", n10.host);
        try {
          let e11 = await this.fetch(n10.toString(), { method: "OPTIONS", headers: r10 });
          return new tp.NextResponse(null, { status: e11.status, headers: iH(e11) });
        } catch (e11) {
          return new tp.NextResponse(e11.cause || e11.message || "Preflight request failed", { status: 500 });
        }
      }, z = async function(e10, t10) {
        let r10, n10 = await this.sessionStore.get(e10.cookies);
        if (!n10) return new tp.NextResponse("The user does not have an active session.", { status: 401 });
        if ("OPTIONS" === e10.method && e10.headers.has("access-control-request-method")) return ol(this, q, "m", J).call(this, e10, t10);
        let a10 = iL(e10), i10 = this.useDPoP ? e10.clone() : e10, o2 = iK(e10, t10);
        a10.set("host", o2.host);
        let s2 = i10.body ? await i10.arrayBuffer() : void 0, c2 = async (e11) => {
          let [t11, a11] = await this.getTokenSet(n10, { audience: e11.audience, scope: e11.scope });
          if (t11) throw t11;
          return r10 = a11, a11.tokenSet;
        }, l2 = this.proxyFetchers[t10.audience];
        l2 ? l2.getAccessToken = c2 : (l2 = await this.fetcherFactory({ useDPoP: this.useDPoP, fetch: this.fetch, getAccessToken: c2 }), this.proxyFetchers[t10.audience] = l2);
        try {
          let c3 = await l2.fetchWithAuth(o2.toString(), { method: i10.method, headers: a10, body: s2 }, { scope: t10.scope, audience: t10.audience }), u2 = new tp.NextResponse(c3.body, { status: c3.status, statusText: c3.statusText, headers: iH(c3) });
          return r10 && await ol(this, q, "m", G).call(this, e10, u2, n10, r10), u2;
        } catch (e11) {
          if (e11 instanceof tP && e11.code === U.MISSING_REFRESH_TOKEN) return new tp.NextResponse(e11.message, { status: 401 });
          return new tp.NextResponse(e11.cause || e11.message || "An error occurred while proxying the request.", { status: 500 });
        }
      }, G = async function(e10, t10, r10, n10) {
        let a10 = nO(r10, n10.tokenSet, { scope: this.authorizationParameters?.scope ?? tO, audience: this.authorizationParameters?.audience });
        if (a10) {
          n10.idTokenClaims && (r10.user = n10.idTokenClaims);
          let i10 = await this.finalizeSession({ ...r10, ...a10 }, n10.tokenSet.idToken);
          await this.sessionStore.set(e10.cookies, t10.cookies, i10), oi(t10);
        }
      }, F = async function(e10, t10) {
        let r10, [n10, a10] = await this.discoverAuthorizationServerMetadata();
        if (n10) return [n10, null];
        let i10 = new URLSearchParams();
        t10.scope && i10.append("scope", t10.scope), t10.audience && i10.append("audience", t10.audience);
        let o2 = this.useDPoP && this.dpopKeyPair ? rw(this.clientMetadata, this.dpopKeyPair) : void 0, s2 = async () => rM(a10, this.clientMetadata, await this.getClientAuth(), e10.refreshToken, { ...this.httpOptions(), [tK]: this.fetch, [tU]: this.allowInsecureRequests, additionalParameters: i10, ...o2 && { DPoP: o2 } }), c2 = (e11) => rW(a10, this.clientMetadata, e11);
        try {
          r10 = await nS(async () => {
            let e11 = await s2();
            return await c2(e11);
          }, { isDPoPEnabled: !!(this.useDPoP && this.dpopKeyPair), ...this.dpopOptions?.retry });
        } catch (e11) {
          return [new tP(U.FAILED_TO_REFRESH_TOKEN, "The access token has expired and there was an error while trying to refresh it.", new tg({ code: e11.error, message: e11.error_description })), null];
        }
        let l2 = rL(r10), u2 = Math.floor(Date.now() / 1e3) + Number(r10.expires_in), d2 = { ...e10, accessToken: r10.access_token, idToken: r10.id_token, scope: r10.scope, requestedScope: t10.requestedScope, expiresAt: u2, audience: e10.audience || t10.audience || void 0, ...r10.token_type && { token_type: r10.token_type } };
        return r10.refresh_token ? d2.refreshToken = r10.refresh_token : d2.refreshToken = e10.refreshToken, [null, { updatedTokenSet: d2, idTokenClaims: l2 }];
      };
      let op = (e10) => {
        let t10 = new TextEncoder().encode(e10), r10 = [];
        for (let e11 = 0; e11 < t10.length; e11 += 32768) r10.push(String.fromCharCode.apply(null, t10.subarray(e11, e11 + 32768)));
        return btoa(r10.join(""));
      };
      class of {
        constructor({ secret: e10, rolling: t10 = true, absoluteDuration: r10 = 259200, inactivityDuration: n10 = 86400, store: a10, cookieOptions: i10 }) {
          this.secret = e10, this.rolling = t10, this.absoluteDuration = r10, this.inactivityDuration = n10, this.store = a10, this.sessionCookieName = i10?.name ?? "__session", this.cookieConfig = { httpOnly: true, sameSite: i10?.sameSite ?? "lax", secure: i10?.secure ?? false, path: i10?.path ?? "/", domain: i10?.domain, transient: i10?.transient };
        }
        epoch() {
          return Date.now() / 1e3 | 0;
        }
        calculateMaxAge(e10) {
          if (!this.rolling) return this.absoluteDuration;
          let t10 = this.epoch(), r10 = Math.min(t10 + this.inactivityDuration, e10 + this.absoluteDuration) - t10;
          return r10 > 0 ? r10 : 0;
        }
      }
      let og = "appSession";
      function oy(e10, t10) {
        let r10 = t10.user;
        return { user: r10, tokenSet: { idToken: t10.idToken ?? void 0, accessToken: t10.accessToken ?? void 0, scope: t10.accessTokenScope, refreshToken: t10.refreshToken, expiresAt: t10.accessTokenExpiresAt }, internal: { sid: r10.sid, createdAt: e10.iat } };
      }
      let om = () => {
        let e10 = new Uint8Array(16);
        return crypto.getRandomValues(e10), Array.from(e10).map((e11) => e11.toString(16).padStart(2, "0")).join("");
      };
      class ow extends of {
        constructor({ secret: e10, store: t10, rolling: r10, absoluteDuration: n10, inactivityDuration: a10, cookieOptions: i10 }) {
          super({ secret: e10, rolling: r10, absoluteDuration: n10, inactivityDuration: a10, cookieOptions: i10 }), this.store = t10;
        }
        async get(e10) {
          let t10 = e10.get(this.sessionCookieName) || e10.get(og);
          if (!t10 || !t10.value) return null;
          let r10 = null;
          try {
            let e11 = await i6(t10.value, this.secret);
            if (null === e11) return null;
            r10 = e11.payload.id;
          } catch (e11) {
            if ("ERR_JWE_INVALID" === e11.code) {
              let e12 = await i9(t10.name, t10.value, this.secret);
              if (!e12) return null;
              r10 = e12;
            }
          }
          if (!r10) return null;
          let n10 = await this.store.get(r10);
          return n10 ? n10.header?.iat ? oy(n10.header, n10.data) : n10 : null;
        }
        async set(e10, t10, r10, n10 = false) {
          let a10 = null, i10 = e10.get(this.sessionCookieName)?.value;
          if (i10) {
            let e11 = await i6(i10, this.secret);
            e11 && (a10 = e11.payload.id);
          }
          a10 && n10 && (await this.store.delete(a10), a10 = om()), a10 || (a10 = om());
          let o2 = this.calculateMaxAge(r10.internal.createdAt), s2 = this.epoch(), c2 = await i3({ id: a10 }, this.secret, s2 + o2);
          t10.set(this.sessionCookieName, c2.toString(), { ...this.cookieConfig, maxAge: o2 }), await this.store.set(a10, r10), e10.set(this.sessionCookieName, c2.toString()), this.sessionCookieName !== og && e10.has(og) && oo(t10, og, { domain: this.cookieConfig.domain, path: this.cookieConfig.path });
        }
        async delete(e10, t10) {
          let r10 = e10.get(this.sessionCookieName)?.value;
          if (oo(t10, this.sessionCookieName, { domain: this.cookieConfig.domain, path: this.cookieConfig.path }), !r10) return;
          let n10 = await i6(r10, this.secret);
          n10 && await this.store.delete(n10.payload.id);
        }
      }
      class ob extends of {
        constructor({ secret: e10, rolling: t10, absoluteDuration: r10, inactivityDuration: n10, cookieOptions: a10 }) {
          super({ secret: e10, rolling: t10, absoluteDuration: r10, inactivityDuration: n10, cookieOptions: a10 }), this.connectionTokenSetsCookieName = "__FC";
        }
        async get(e10) {
          let t10 = on(this.sessionCookieName, e10) ?? on(og, e10, true);
          if (!t10) return null;
          let r10 = await i6(t10, this.secret);
          if (!r10) return null;
          let n10 = r10.protectedHeader.iat ? oy(r10.protectedHeader, r10.payload) : r10.payload, a10 = this.getConnectionTokenSetsCookies(e10), i10 = [];
          for (let e11 of a10) {
            let t11 = await i6(e11.value, this.secret);
            t11 && i10.push(t11.payload);
          }
          return { ...n10, ...i10.length ? { connectionTokenSets: i10 } : {} };
        }
        async set(e10, t10, r10) {
          let { connectionTokenSets: n10, ...a10 } = r10, i10 = this.calculateMaxAge(r10.internal.createdAt), o2 = this.epoch(), s2 = (await i3(a10, this.secret, o2 + i10)).toString(), c2 = { ...this.cookieConfig, maxAge: i10 };
          !function(e11, t11, r11, n11, a11) {
            let { transient: i11, ...o3 } = r11, s3 = { ...o3 };
            if (i11 && delete s3.maxAge, new TextEncoder().encode(t11).length <= 3500) {
              a11.set(e11, t11, s3), n11.set(e11, t11), or(n11, e11).forEach((e12) => {
                oo(a11, e12.name, { path: s3.path, domain: s3.domain }), n11.delete(e12.name);
              });
              return;
            }
            let c3 = 0, l2 = 0;
            for (; c3 < t11.length; ) {
              let r12 = t11.slice(c3, c3 + 3500), i12 = `${e11}__${l2}`;
              a11.set(i12, r12, s3), n11.set(i12, r12), c3 += 3500, l2++;
            }
            let u2 = or(n11, e11).length - l2;
            if (u2 > 0) for (let t12 = 0; t12 < u2; t12++) {
              let r12 = l2 + t12, i12 = `${e11}__${r12}`;
              oo(a11, i12, { path: s3.path, domain: s3.domain }), n11.delete(i12);
            }
            oo(a11, e11, { path: s3.path, domain: s3.domain }), n11.delete(e11);
          }(this.sessionCookieName, s2, c2, e10, t10), n10?.length && await Promise.all(n10.map((r11, n11) => this.storeInCookie(e10, t10, r11, `${this.connectionTokenSetsCookieName}_${n11}`, i10))), on(og, e10, true) && oa(og, e10, t10, true, { domain: this.cookieConfig.domain, path: this.cookieConfig.path });
        }
        async delete(e10, t10) {
          let r10 = { domain: this.cookieConfig.domain, path: this.cookieConfig.path };
          oa(this.sessionCookieName, e10, t10, false, r10), this.getConnectionTokenSetsCookies(e10).forEach((e11) => oo(t10, e11.name, r10));
        }
        async storeInCookie(e10, t10, r10, n10, a10) {
          let i10 = Math.floor(Date.now() / 1e3 + a10), o2 = await i3(r10, this.secret, i10), s2 = o2.toString();
          t10.set(n10, o2.toString(), { ...this.cookieConfig, maxAge: a10 }), e10.set(n10, s2);
          let c2 = new iG(new Headers());
          c2.set(n10, s2, { ...this.cookieConfig, maxAge: a10 }), new TextEncoder().encode(c2.toString()).length >= 4096 && (n10 === this.sessionCookieName ? console.warn(`The ${n10} cookie size exceeds 4096 bytes, which may cause issues in some browsers. Consider removing any unnecessary custom claims from the access token or the user profile. Alternatively, you can use a stateful session implementation to store the session data in a data store.`) : console.warn(`The ${n10} cookie size exceeds 4096 bytes, which may cause issues in some browsers. You can use a stateful session implementation to store the session data in a data store.`));
        }
        getConnectionTokenSetsCookies(e10) {
          return e10.getAll().filter((e11) => e11.name.startsWith(this.connectionTokenSetsCookieName));
        }
      }
      class o_ {
        constructor({ secret: e10, cookieOptions: t10, enableParallelTransactions: r10 }) {
          this.secret = e10, this.transactionCookiePrefix = t10?.prefix ?? "__txn_", this.cookieOptions = { httpOnly: true, sameSite: t10?.sameSite ?? "lax", secure: t10?.secure ?? false, path: t10?.path ?? "/", domain: t10?.domain, maxAge: t10?.maxAge || 3600 }, this.enableParallelTransactions = r10 ?? true;
        }
        getTransactionCookieName(e10) {
          return this.enableParallelTransactions ? `${this.transactionCookiePrefix}${e10}` : `${this.transactionCookiePrefix}`;
        }
        getCookiePrefix() {
          return this.transactionCookiePrefix;
        }
        async save(e10, t10, r10) {
          if (!t10.state) throw Error("Transaction state is required");
          if (r10 && !this.enableParallelTransactions) {
            let e11 = this.getTransactionCookieName(t10.state);
            if (r10.get(e11)) return void console.warn("A transaction is already in progress. Only one transaction is allowed when parallel transactions are disabled.");
          }
          let n10 = this.cookieOptions.maxAge, a10 = Math.floor(Date.now() / 1e3 + n10), i10 = await i3(t10, this.secret, a10);
          e10.set(this.getTransactionCookieName(t10.state), i10.toString(), this.cookieOptions);
        }
        async get(e10, t10) {
          let r10 = this.getTransactionCookieName(t10), n10 = e10.get(r10)?.value;
          return n10 ? i6(n10, this.secret) : null;
        }
        async delete(e10, t10) {
          oo(e10, this.getTransactionCookieName(t10), { domain: this.cookieOptions.domain, path: this.cookieOptions.path });
        }
        async deleteAll(e10, t10) {
          let r10 = this.getCookiePrefix(), n10 = { domain: this.cookieOptions.domain, path: this.cookieOptions.path };
          e10.getAll().forEach((e11) => {
            e11.name.startsWith(r10) && oo(t10, e11.name, n10);
          });
        }
      }
      var ov = function(e10, t10, r10, n10, a10) {
        if ("m" === n10) throw TypeError("Private method is not writable");
        if ("a" === n10 && !a10) throw TypeError("Private accessor was defined without a setter");
        if ("function" == typeof t10 ? e10 !== t10 || !a10 : !t10.has(e10)) throw TypeError("Cannot write private member to an object whose class did not declare it");
        return "a" === n10 ? a10.call(e10, r10) : a10 ? a10.value = r10 : t10.set(e10, r10), r10;
      }, oE = function(e10, t10, r10, n10) {
        if ("a" === r10 && !n10) throw TypeError("Private accessor was defined without a getter");
        if ("function" == typeof t10 ? e10 !== t10 || !n10 : !t10.has(e10)) throw TypeError("Cannot read private member from an object whose class did not declare it");
        return "m" === r10 ? n10 : "a" === r10 ? n10.call(e10) : n10 ? n10.value : t10.get(e10);
      };
      V = /* @__PURE__ */ new WeakMap();
      let oS = new class {
        constructor(e10 = {}) {
          V.set(this, void 0), ov(this, V, e10, "f");
          const { domain: t10, clientId: r10, clientSecret: n10, appBaseUrl: a10, secret: i10, clientAssertionSigningKey: o2 } = this.validateAndExtractRequiredOptions(e10);
          this.domain = t10;
          const s2 = e10.clientAssertionSigningAlg || process.env.AUTH0_CLIENT_ASSERTION_SIGNING_ALG, { dpopKeyPair: c2, dpopOptions: l2 } = function(e11) {
            let t11 = e11.useDPoP || false;
            if (!t11) return { dpopKeyPair: void 0, dpopOptions: void 0 };
            let r11 = e11.dpopOptions?.clockTolerance ?? (process.env.AUTH0_DPOP_CLOCK_TOLERANCE ? parseInt(process.env.AUTH0_DPOP_CLOCK_TOLERANCE, 10) : 30);
            if (r11 > 300) {
              let e12 = process.env.AUTH0_DPOP_CLOCK_TOLERANCE_MAX_PROD ? parseInt(process.env.AUTH0_DPOP_CLOCK_TOLERANCE_MAX_PROD, 10) : 300;
              if (r11 > e12) throw Error(`clockTolerance of ${r11}s exceeds maximum allowed ${e12}s in production. This could significantly weaken DPoP replay attack protection. Set AUTH0_DPOP_CLOCK_TOLERANCE_MAX_PROD environment variable to override this limit in production.`);
              console.warn(`WARNING: clockTolerance of ${r11}s exceeds recommended maximum of 300s. This may weaken DPoP security by allowing replay attacks within a wider time window. Consider synchronizing server clocks using NTP instead of increasing tolerance.`);
            }
            let n11 = { clockSkew: e11.dpopOptions?.clockSkew ?? (process.env.AUTH0_DPOP_CLOCK_SKEW ? parseInt(process.env.AUTH0_DPOP_CLOCK_SKEW, 10) : 0), clockTolerance: r11, retry: { delay: e11.dpopOptions?.retry?.delay ?? (process.env.AUTH0_RETRY_DELAY ? parseInt(process.env.AUTH0_RETRY_DELAY, 10) : 100), jitter: e11.dpopOptions?.retry?.jitter ?? (!process.env.AUTH0_RETRY_JITTER || "true" === process.env.AUTH0_RETRY_JITTER) } };
            if (n11.retry && "number" == typeof n11.retry.delay && n11.retry.delay < 0) throw Error("Retry delay must be non-negative");
            if (e11.dpopKeyPair) return { dpopKeyPair: e11.dpopKeyPair, dpopOptions: n11 };
            if (t11) {
              let e12 = process.env.AUTH0_DPOP_PRIVATE_KEY, t12 = process.env.AUTH0_DPOP_PUBLIC_KEY;
              if (nv() && (e12 || t12)) return console.warn("WARNING: Running in Edge Runtime environment. DPoP keypair loading from environment variables is not supported due to limited Node.js crypto API access. DPoP has been disabled. To use DPoP in Edge Runtime, provide a pre-generated keypair via the dpopKeyPair option."), { dpopKeyPair: void 0, dpopOptions: void 0 };
              if (e12 && t12) try {
                let r12 = (0, tN.createPrivateKey)(e12), a11 = (0, tN.createPublicKey)(t12);
                if ("ec" !== r12.asymmetricKeyType) throw Error(`DPoP private key must be an Elliptic Curve key for ES256 algorithm, got: ${r12.asymmetricKeyType}`);
                if ("ec" !== a11.asymmetricKeyType) throw Error(`DPoP public key must be an Elliptic Curve key for ES256 algorithm, got: ${a11.asymmetricKeyType}`);
                let i11 = r12.asymmetricKeyDetails, o3 = a11.asymmetricKeyDetails;
                if (i11?.namedCurve !== "prime256v1") throw Error(`DPoP private key must use P-256 curve (prime256v1) for ES256 algorithm, got: ${i11?.namedCurve}`);
                if (o3?.namedCurve !== "prime256v1") throw Error(`DPoP public key must use P-256 curve (prime256v1) for ES256 algorithm, got: ${o3?.namedCurve}`);
                if (!function(e13, t13) {
                  if (nv()) return true;
                  try {
                    let r13 = "test-data-for-key-pair-validation", n12 = (0, tN.createSign)("sha256");
                    n12.update(r13);
                    let a12 = n12.sign(e13), i12 = (0, tN.createVerify)("sha256");
                    if (i12.update(r13), !i12.verify(t13, a12)) return console.warn("WARNING: Private and public keys do not form a valid key pair - signature verification failed. Please ensure the keys are properly paired and in the correct format. DPoP will be disabled and bearer authentication will be used instead."), false;
                    return true;
                  } catch (e14) {
                    return console.warn(`WARNING: Failed to validate key pair compatibility. This may indicate invalid key format, mismatched algorithms, or corrupted key data. DPoP will be disabled and bearer authentication will be used instead. Error: ${e14 instanceof Error ? e14.message : String(e14)}`), false;
                  }
                }(r12, a11)) return console.warn("WARNING: DPoP key pair validation failed. DPoP has been completely disabled. Falling back to bearer authentication. Please verify your key pair configuration."), { dpopKeyPair: void 0, dpopOptions: void 0 };
                let s3 = r12.toCryptoKey("ES256", false, ["sign"]), c3 = a11.toCryptoKey("ES256", false, ["verify"]);
                return { dpopKeyPair: { privateKey: s3, publicKey: c3 }, dpopOptions: n11 };
              } catch (e13) {
                console.warn(`WARNING: Failed to load DPoP keypair from environment variables. Please ensure AUTH0_DPOP_PUBLIC_KEY and AUTH0_DPOP_PRIVATE_KEY contain valid ES256 keys in PEM format. Error: ${e13 instanceof Error ? e13.message : String(e13)}`);
              }
              e12 && t12 || console.warn("WARNING: useDPoP is set to true but dpopKeyPair is not provided. DPoP will not be used and protected requests will use bearer authentication instead. To enable DPoP, provide a dpopKeyPair in the Auth0Client options or set AUTH0_DPOP_PUBLIC_KEY and AUTH0_DPOP_PRIVATE_KEY environment variables.");
            }
            return { dpopKeyPair: void 0, dpopOptions: n11 };
          }(e10), u2 = process.env.NEXT_PUBLIC_BASE_PATH, d2 = { name: e10.session?.cookie?.name ?? "__session", secure: e10.session?.cookie?.secure ?? "true" === process.env.AUTH0_COOKIE_SECURE, sameSite: e10.session?.cookie?.sameSite ?? process.env.AUTH0_COOKIE_SAME_SITE ?? "lax", path: e10.session?.cookie?.path ?? process.env.AUTH0_COOKIE_PATH ?? u2 ?? "/", transient: e10.session?.cookie?.transient ?? "true" === process.env.AUTH0_COOKIE_TRANSIENT, domain: e10.session?.cookie?.domain ?? process.env.AUTH0_COOKIE_DOMAIN }, h2 = { prefix: e10.transactionCookie?.prefix ?? "__txn_", secure: e10.transactionCookie?.secure ?? false, sameSite: e10.transactionCookie?.sameSite ?? "lax", path: e10.transactionCookie?.path ?? u2 ?? "/", maxAge: e10.transactionCookie?.maxAge ?? 3600 };
          if (a10) {
            const { protocol: e11 } = new URL(a10);
            "https:" === e11 && (d2.secure = true, h2.secure = true);
          }
          this.routes = { login: process.env.NEXT_PUBLIC_LOGIN_ROUTE || "/auth/login", logout: "/auth/logout", callback: "/auth/callback", backChannelLogout: "/auth/backchannel-logout", profile: process.env.NEXT_PUBLIC_PROFILE_ROUTE || "/auth/profile", accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN_ROUTE || "/auth/access-token", connectAccount: "/auth/connect", ...e10.routes }, this.transactionStore = new o_({ secret: i10, cookieOptions: h2, enableParallelTransactions: e10.enableParallelTransactions ?? true }), this.sessionStore = e10.sessionStore ? new ow({ ...e10.session, secret: i10, store: e10.sessionStore, cookieOptions: d2 }) : new ob({ ...e10.session, secret: i10, cookieOptions: d2 }), this.authClient = new oh({ transactionStore: this.transactionStore, sessionStore: this.sessionStore, domain: t10, clientId: r10, clientSecret: n10, clientAssertionSigningKey: o2, clientAssertionSigningAlg: s2, authorizationParameters: e10.authorizationParameters, pushedAuthorizationRequests: e10.pushedAuthorizationRequests, appBaseUrl: a10, secret: i10, signInReturnToPath: e10.signInReturnToPath, logoutStrategy: e10.logoutStrategy, includeIdTokenHintInOIDCLogoutUrl: e10.includeIdTokenHintInOIDCLogoutUrl, beforeSessionSaved: e10.beforeSessionSaved, onCallback: e10.onCallback, routes: this.routes, allowInsecureRequests: e10.allowInsecureRequests, httpTimeout: e10.httpTimeout, enableTelemetry: e10.enableTelemetry, enableAccessTokenEndpoint: e10.enableAccessTokenEndpoint, noContentProfileResponseWhenUnauthenticated: e10.noContentProfileResponseWhenUnauthenticated, enableConnectAccountEndpoint: e10.enableConnectAccountEndpoint, useDPoP: e10.useDPoP || false, dpopKeyPair: e10.dpopKeyPair || c2, dpopOptions: e10.dpopOptions || l2 });
        }
        middleware(e10) {
          return this.authClient.handler.bind(this.authClient)(e10);
        }
        async getSession(e10) {
          return e10 ? e10 instanceof tp.NextRequest ? this.sessionStore.get(e10.cookies) : this.sessionStore.get(this.createRequestCookies(e10)) : this.sessionStore.get(await (0, th.cookies)());
        }
        async getAccessToken(e10, t10, r10) {
          let n10, a10, i10 = { refresh: false }, o2 = {};
          if (e10 && (e10 instanceof Request || "object" == typeof e10.headers)) {
            if (n10 = e10, a10 = t10, o2 = { ...i10, ...r10 ?? {} }, !a10) throw TypeError("getAccessToken(req, res): The 'res' argument is missing. Both 'req' and 'res' must be provided together for Pages Router or middleware usage.");
          } else {
            if (void 0 !== t10 || void 0 !== r10) throw TypeError("getAccessToken: Invalid arguments. Valid signatures are getAccessToken(), getAccessToken(options), or getAccessToken(req, res, options).");
            o2 = { ...i10, ...e10 ?? {} };
          }
          return this.executeGetAccessToken(n10, a10, o2);
        }
        async executeGetAccessToken(e10, t10, r10) {
          let n10 = e10 ? await this.getSession(e10) : await this.getSession();
          if (!n10) throw new tP(U.MISSING_SESSION, "The user does not have an active session.");
          let [a10, i10] = await this.authClient.getTokenSet(n10, r10);
          if (a10) throw a10;
          let { tokenSet: o2, idTokenClaims: s2 } = i10, c2 = nO(n10, o2, { scope: oE(this, V, "f").authorizationParameters?.scope ?? tO, audience: oE(this, V, "f").authorizationParameters?.audience });
          if (c2) {
            s2 && (n10.user = s2);
            let r11 = await this.authClient.finalizeSession(n10, o2.idToken);
            await this.saveToSession({ ...r11, ...c2 }, e10, t10);
          }
          return { token: o2.accessToken, scope: o2.scope, expiresAt: o2.expiresAt, token_type: o2.token_type, audience: o2.audience };
        }
        async getAccessTokenForConnection(e10, t10, r10) {
          let n10 = t10 ? await this.getSession(t10) : await this.getSession();
          if (!n10) throw new tR(L.MISSING_SESSION, "The user does not have an active session.");
          let a10 = n10.connectionTokenSets?.find((t11) => t11.connection === e10.connection), [i10, o2] = await this.authClient.getConnectionTokenSet(n10.tokenSet, a10, e10);
          if (null !== i10) throw i10;
          if (o2 && (!a10 || o2.accessToken !== a10.accessToken || o2.expiresAt !== a10.expiresAt || o2.scope !== a10.scope)) {
            let i11;
            i11 = a10 ? n10.connectionTokenSets?.map((t11) => t11.connection === e10.connection ? o2 : t11) : [...n10.connectionTokenSets || [], o2], await this.saveToSession({ ...n10, connectionTokenSets: i11 }, t10, r10);
          }
          return { token: o2.accessToken, scope: o2.scope, expiresAt: o2.expiresAt };
        }
        async updateSession(e10, t10, r10) {
          if (t10) {
            if (!r10) throw Error("The session data is missing.");
            if (e10 instanceof tp.NextRequest && t10 instanceof tp.NextResponse) {
              let n10 = await this.getSession(e10);
              if (!n10) throw Error("The user is not authenticated.");
              await this.sessionStore.set(e10.cookies, t10.cookies, { ...r10, internal: { ...n10.internal } });
            } else {
              let n10 = await this.getSession(e10);
              if (!n10) throw Error("The user is not authenticated.");
              let a10 = new Headers(), i10 = new iG(a10), o2 = this.createRequestCookies(e10);
              await this.sessionStore.set(o2, i10, { ...r10, internal: { ...n10.internal } });
              let s2 = [], c2 = {};
              for (let [e11, t11] of a10.entries()) "set-cookie" === e11.toLowerCase() ? s2.push(t11) : c2[e11] = t11;
              for (let [e11, r11] of (s2.length > 0 && t10.setHeader("set-cookie", s2), Object.entries(c2))) t10.setHeader(e11, r11);
            }
          } else {
            let t11 = await this.getSession();
            if (!t11) throw Error("The user is not authenticated.");
            if (!e10) throw Error("The session data is missing.");
            await this.sessionStore.set(await (0, th.cookies)(), await (0, th.cookies)(), { ...e10, internal: { ...t11.internal } });
          }
        }
        createRequestCookies(e10) {
          let t10 = new Headers();
          for (let r10 in e10.headers) if (Array.isArray(e10.headers[r10])) for (let n10 of e10.headers[r10]) t10.append(r10, n10);
          else t10.append(r10, e10.headers[r10] ?? "");
          return new iz(t10);
        }
        async startInteractiveLogin(e10 = {}) {
          return this.authClient.startInteractiveLogin(e10);
        }
        async getTokenByBackchannelAuth(e10) {
          let [t10, r10] = await this.authClient.backchannelAuthentication(e10);
          if (t10) throw t10;
          return r10;
        }
        async connectAccount(e10) {
          if (!await this.getSession()) throw new tx({ code: K.MISSING_SESSION, message: "The user does not have an active session." });
          let t10 = { audience: `${this.issuer}/me/`, scope: "create:me:connected_accounts" }, r10 = await this.getAccessToken(t10), [n10, a10] = await this.authClient.connectAccount({ ...e10, tokenSet: { accessToken: r10.token, expiresAt: r10.expiresAt, scope: t10.scope, audience: r10.audience } });
          if (n10) throw n10;
          return a10;
        }
        withPageAuthRequired(t10, r10) {
          let n10, a10, i10 = { loginUrl: this.routes.login }, o2 = (n10 = this, (t11, r11 = {}) => async (a11) => {
            let o3 = await n10.getSession();
            if (!o3?.user) {
              let t12 = "function" == typeof r11.returnTo ? await r11.returnTo(a11) : r11.returnTo, { redirect: n11 } = await Promise.resolve().then(() => e.i(626972));
              n11(`${i10.loginUrl}${r11.returnTo ? `?returnTo=${t12}` : ""}`);
            }
            return t11(a11);
          }), s2 = (a10 = this, ({ getServerSideProps: e10, returnTo: t11 } = {}) => async (r11) => {
            let n11 = await a10.getSession(r11.req);
            if (!n11?.user) return { redirect: { destination: `${i10.loginUrl}?returnTo=${encodeURIComponent(t11 || r11.resolvedUrl)}`, permanent: false } };
            let o3 = { props: {} };
            if (e10 && (o3 = await e10(r11)), o3.props instanceof Promise) {
              let e11 = await o3.props;
              return { ...o3, props: { user: n11.user, ...e11 } };
            }
            return { ...o3, props: { user: n11.user, ...o3.props } };
          });
          return "function" == typeof t10 ? o2(t10, r10) : s2(t10);
        }
        withApiAuthRequired(e10) {
          let t10, r10, n10 = (t10 = this, (e11) => async (r11, n11) => {
            let a11 = await t10.getSession(r11);
            a11 && a11.user ? await e11(r11, n11) : n11.status(401).json({ error: "not_authenticated", description: "The user does not have an active session or is not authenticated" });
          }), a10 = (r10 = this, (e11) => async (t11, n11) => {
            let a11 = await r10.getSession();
            if (!a11 || !a11.user) return tp.NextResponse.json({ error: "not_authenticated", description: "The user does not have an active session or is not authenticated" }, { status: 401 });
            let i10 = await e11(t11, n11);
            return i10 instanceof tp.NextResponse ? i10 : new tp.NextResponse(i10.body, i10);
          });
          return (t11, r11) => t11 instanceof Request || t11.headers instanceof Headers || "boolean" == typeof t11.bodyUsed ? a10(e10)(t11, r11) : n10(e10)(t11, r11);
        }
        async saveToSession(e10, t10, r10) {
          if (t10 && r10) if (t10 instanceof tp.NextRequest && r10 instanceof tp.NextResponse) await this.sessionStore.set(t10.cookies, r10.cookies, e10);
          else {
            let n10 = new Headers(), a10 = new iG(n10);
            for (let [i10, o2] of (await this.sessionStore.set(this.createRequestCookies(t10), a10, e10), n10.entries())) r10.setHeader(i10, o2);
          }
          else try {
            await this.sessionStore.set(await (0, th.cookies)(), await (0, th.cookies)(), e10);
          } catch (e11) {
          }
        }
        validateAndExtractRequiredOptions(e10) {
          let t10 = { domain: e10.domain ?? process.env.AUTH0_DOMAIN, clientId: e10.clientId ?? process.env.AUTH0_CLIENT_ID, appBaseUrl: e10.appBaseUrl ?? process.env.APP_BASE_URL, secret: e10.secret ?? process.env.AUTH0_SECRET }, r10 = e10.clientSecret ?? process.env.AUTH0_CLIENT_SECRET, n10 = e10.clientAssertionSigningKey ?? process.env.AUTH0_CLIENT_ASSERTION_SIGNING_KEY, a10 = Object.entries(t10).filter(([, e11]) => !e11).map(([e11]) => e11);
          if (r10 || n10 || a10.push("clientAuthentication"), a10.length) {
            let e11 = { domain: "AUTH0_DOMAIN", clientId: "AUTH0_CLIENT_ID", appBaseUrl: "APP_BASE_URL", secret: "AUTH0_SECRET" }, t11 = "WARNING: Not all required options were provided when creating an instance of Auth0Client. Ensure to provide all missing options, either by passing it to the Auth0Client constructor, or by setting the corresponding environment variable.\n";
            a10.forEach((r11) => {
              "clientAuthentication" === r11 ? t11 += `Missing: clientAuthentication: Set either AUTH0_CLIENT_SECRET env var or AUTH0_CLIENT_ASSERTION_SIGNING_KEY env var, or pass clientSecret or clientAssertionSigningKey in options
` : e11[r11] ? t11 += `Missing: ${r11}: Set ${e11[r11]} env var or pass ${r11} in options
` : t11 += `Missing: ${r11}
`;
            }), console.error(t11.trim());
          }
          return { ...t10, clientSecret: r10, clientAssertionSigningKey: n10 };
        }
        async createFetcher(e10, t10) {
          let r10 = e10 ? await this.getSession(e10) : await this.getSession();
          if (!r10) throw new tP(U.MISSING_SESSION, "The user does not have an active session.");
          let n10 = async (e11) => {
            let [t11, n11] = await this.authClient.getTokenSet(r10, e11 || {});
            if (t11) throw t11;
            return n11.tokenSet;
          };
          return await this.authClient.fetcherFactory({ ...t10, getAccessToken: n10 });
        }
        get issuer() {
          return this.domain.startsWith("http://") || this.domain.startsWith("https://") ? this.domain : `https://${this.domain}`;
        }
      }();
      async function oA(e10) {
        try {
          return await oS.middleware(e10);
        } catch (e11) {
          return console.error("Middleware error:", e11), new Response(null, { status: 200 });
        }
      }
      e.s(["config", 0, { matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"] }, "middleware", () => oA], 999446);
      var oT = e.i(999446);
      Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 });
      let oP = { ...oT }, oR = "/middleware", ok = oP.middleware || oP.default;
      if ("function" != typeof ok) throw new class extends Error {
        constructor(e10) {
          super(e10), this.stack = "";
        }
      }(`The Middleware file "${oR}" must export a function named \`middleware\` or a default function.`);
      function oC(e10) {
        return td({ ...e10, page: oR, handler: async (...e11) => {
          try {
            return await ok(...e11);
          } catch (a10) {
            let t10 = e11[0], r10 = new URL(t10.url), n10 = r10.pathname + r10.search;
            throw await g(a10, { path: n10, method: t10.method, headers: Object.fromEntries(t10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/proxy", routeType: "proxy", revalidateReason: void 0 }), a10;
          }
        } });
      }
      e.s(["default", () => oC], 242738);
    }]);
  }
});

// .next/server/edge/chunks/turbopack-edge-wrapper_7b27dc96.js
var require_turbopack_edge_wrapper_7b27dc96 = __commonJS({
  ".next/server/edge/chunks/turbopack-edge-wrapper_7b27dc96.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/turbopack-edge-wrapper_7b27dc96.js", { otherChunks: ["chunks/[root-of-the-server]__ad53bf88._.js", "chunks/node_modules_next_dist_82203b28._.js", "chunks/node_modules_91242dc2._.js", "chunks/_74669f4d._.js"], runtimeModuleIds: [732442] }]), (() => {
      let e;
      if (!Array.isArray(globalThis.TURBOPACK)) return;
      let t = /* @__PURE__ */ new WeakMap();
      function r(e2, t2) {
        this.m = e2, this.e = t2;
      }
      let n = r.prototype, o = Object.prototype.hasOwnProperty, u = "undefined" != typeof Symbol && Symbol.toStringTag;
      function l(e2, t2, r2) {
        o.call(e2, t2) || Object.defineProperty(e2, t2, r2);
      }
      function i(e2, t2) {
        let r2 = e2[t2];
        return r2 || (r2 = s(t2), e2[t2] = r2), r2;
      }
      function s(e2) {
        return { exports: {}, error: void 0, id: e2, namespaceObject: void 0 };
      }
      function a(e2, t2) {
        l(e2, "__esModule", { value: true }), u && l(e2, u, { value: "Module" });
        let r2 = 0;
        for (; r2 < t2.length; ) {
          let n2 = t2[r2++], o2 = t2[r2++];
          if ("number" == typeof o2) if (0 === o2) l(e2, n2, { value: t2[r2++], enumerable: true, writable: false });
          else throw Error(`unexpected tag: ${o2}`);
          else "function" == typeof t2[r2] ? l(e2, n2, { get: o2, set: t2[r2++], enumerable: true }) : l(e2, n2, { get: o2, enumerable: true });
        }
        Object.seal(e2);
      }
      n.s = function(e2, t2) {
        let r2, n2;
        null != t2 ? n2 = (r2 = i(this.c, t2)).exports : (r2 = this.m, n2 = this.e), r2.namespaceObject = n2, a(n2, e2);
      }, n.j = function(e2, r2) {
        var n2, u2;
        let l2, s2, a2;
        null != r2 ? s2 = (l2 = i(this.c, r2)).exports : (l2 = this.m, s2 = this.e);
        let c2 = (n2 = l2, u2 = s2, (a2 = t.get(n2)) || (t.set(n2, a2 = []), n2.exports = n2.namespaceObject = new Proxy(u2, { get(e3, t2) {
          if (o.call(e3, t2) || "default" === t2 || "__esModule" === t2) return Reflect.get(e3, t2);
          for (let e4 of a2) {
            let r3 = Reflect.get(e4, t2);
            if (void 0 !== r3) return r3;
          }
        }, ownKeys(e3) {
          let t2 = Reflect.ownKeys(e3);
          for (let e4 of a2) for (let r3 of Reflect.ownKeys(e4)) "default" === r3 || t2.includes(r3) || t2.push(r3);
          return t2;
        } })), a2);
        "object" == typeof e2 && null !== e2 && c2.push(e2);
      }, n.v = function(e2, t2) {
        (null != t2 ? i(this.c, t2) : this.m).exports = e2;
      }, n.n = function(e2, t2) {
        let r2;
        (r2 = null != t2 ? i(this.c, t2) : this.m).exports = r2.namespaceObject = e2;
      };
      let c = Object.getPrototypeOf ? (e2) => Object.getPrototypeOf(e2) : (e2) => e2.__proto__, f = [null, c({}), c([]), c(c)];
      function d(e2, t2, r2) {
        let n2 = [], o2 = -1;
        for (let t3 = e2; ("object" == typeof t3 || "function" == typeof t3) && !f.includes(t3); t3 = c(t3)) for (let r3 of Object.getOwnPropertyNames(t3)) n2.push(r3, /* @__PURE__ */ function(e3, t4) {
          return () => e3[t4];
        }(e2, r3)), -1 === o2 && "default" === r3 && (o2 = n2.length - 1);
        return r2 && o2 >= 0 || (o2 >= 0 ? n2.splice(o2, 1, 0, e2) : n2.push("default", 0, e2)), a(t2, n2), t2;
      }
      function h(e2) {
        return "function" == typeof e2 ? function(...t2) {
          return e2.apply(this, t2);
        } : /* @__PURE__ */ Object.create(null);
      }
      function p(e2) {
        let t2 = S(e2, this.m);
        if (t2.namespaceObject) return t2.namespaceObject;
        let r2 = t2.exports;
        return t2.namespaceObject = d(r2, h(r2), r2 && r2.__esModule);
      }
      function m(e2) {
        return "string" == typeof e2 ? e2 : e2.path;
      }
      function b() {
        let e2, t2;
        return { promise: new Promise((r2, n2) => {
          t2 = n2, e2 = r2;
        }), resolve: e2, reject: t2 };
      }
      n.i = p, n.A = function(e2) {
        return this.r(e2)(p.bind(this));
      }, n.t = "function" == typeof __require ? __require : function() {
        throw Error("Unexpected use of runtime require");
      }, n.r = function(e2) {
        return S(e2, this.m).exports;
      }, n.f = function(e2) {
        function t2(t3) {
          if (o.call(e2, t3)) return e2[t3].module();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }
        return t2.keys = () => Object.keys(e2), t2.resolve = (t3) => {
          if (o.call(e2, t3)) return e2[t3].id();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }, t2.import = async (e3) => await t2(e3), t2;
      };
      let y = Symbol("turbopack queues"), O = Symbol("turbopack exports"), g = Symbol("turbopack error");
      function w(e2) {
        e2 && 1 !== e2.status && (e2.status = 1, e2.forEach((e3) => e3.queueCount--), e2.forEach((e3) => e3.queueCount-- ? e3.queueCount++ : e3()));
      }
      n.a = function(e2, t2) {
        let r2 = this.m, n2 = t2 ? Object.assign([], { status: -1 }) : void 0, o2 = /* @__PURE__ */ new Set(), { resolve: u2, reject: l2, promise: i2 } = b(), s2 = Object.assign(i2, { [O]: r2.exports, [y]: (e3) => {
          n2 && e3(n2), o2.forEach(e3), s2.catch(() => {
          });
        } }), a2 = { get: () => s2, set(e3) {
          e3 !== s2 && (s2[O] = e3);
        } };
        Object.defineProperty(r2, "exports", a2), Object.defineProperty(r2, "namespaceObject", a2), e2(function(e3) {
          let t3 = e3.map((e4) => {
            if (null !== e4 && "object" == typeof e4) {
              if (y in e4) return e4;
              if (null != e4 && "object" == typeof e4 && "then" in e4 && "function" == typeof e4.then) {
                let t4 = Object.assign([], { status: 0 }), r4 = { [O]: {}, [y]: (e5) => e5(t4) };
                return e4.then((e5) => {
                  r4[O] = e5, w(t4);
                }, (e5) => {
                  r4[g] = e5, w(t4);
                }), r4;
              }
            }
            return { [O]: e4, [y]: () => {
            } };
          }), r3 = () => t3.map((e4) => {
            if (e4[g]) throw e4[g];
            return e4[O];
          }), { promise: u3, resolve: l3 } = b(), i3 = Object.assign(() => l3(r3), { queueCount: 0 });
          function s3(e4) {
            e4 !== n2 && !o2.has(e4) && (o2.add(e4), e4 && 0 === e4.status && (i3.queueCount++, e4.push(i3)));
          }
          return t3.map((e4) => e4[y](s3)), i3.queueCount ? u3 : r3();
        }, function(e3) {
          e3 ? l2(s2[g] = e3) : u2(s2[O]), w(n2);
        }), n2 && -1 === n2.status && (n2.status = 0);
      };
      let _ = function(e2) {
        let t2 = new URL(e2, "x:/"), r2 = {};
        for (let e3 in t2) r2[e3] = t2[e3];
        for (let t3 in r2.href = e2, r2.pathname = e2.replace(/[?#].*/, ""), r2.origin = r2.protocol = "", r2.toString = r2.toJSON = (...t4) => e2, r2) Object.defineProperty(this, t3, { enumerable: true, configurable: true, value: r2[t3] });
      };
      function j(e2, t2) {
        throw Error(`Invariant: ${t2(e2)}`);
      }
      _.prototype = URL.prototype, n.U = _, n.z = function(e2) {
        throw Error("dynamic usage of require is not supported");
      }, n.g = globalThis;
      let k = r.prototype;
      var C, R = ((C = R || {})[C.Runtime = 0] = "Runtime", C[C.Parent = 1] = "Parent", C[C.Update = 2] = "Update", C);
      let U = /* @__PURE__ */ new Map();
      n.M = U;
      let v = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Map();
      async function T(e2, t2, r2) {
        let n2;
        if ("string" == typeof r2) return M(e2, t2, x(r2));
        let o2 = r2.included || [], u2 = o2.map((e3) => !!U.has(e3) || v.get(e3));
        if (u2.length > 0 && u2.every((e3) => e3)) return void await Promise.all(u2);
        let l2 = r2.moduleChunks || [], i2 = l2.map((e3) => P.get(e3)).filter((e3) => e3);
        if (i2.length > 0) {
          if (i2.length === l2.length) return void await Promise.all(i2);
          let r3 = /* @__PURE__ */ new Set();
          for (let e3 of l2) P.has(e3) || r3.add(e3);
          for (let n3 of r3) {
            let r4 = M(e2, t2, x(n3));
            P.set(n3, r4), i2.push(r4);
          }
          n2 = Promise.all(i2);
        } else {
          for (let o3 of (n2 = M(e2, t2, x(r2.path)), l2)) P.has(o3) || P.set(o3, n2);
        }
        for (let e3 of o2) v.has(e3) || v.set(e3, n2);
        await n2;
      }
      k.l = function(e2) {
        return T(1, this.m.id, e2);
      };
      let $ = Promise.resolve(void 0), E = /* @__PURE__ */ new WeakMap();
      function M(t2, r2, n2) {
        let o2 = e.loadChunkCached(t2, n2), u2 = E.get(o2);
        if (void 0 === u2) {
          let e2 = E.set.bind(E, o2, $);
          u2 = o2.then(e2).catch((e3) => {
            let o3;
            switch (t2) {
              case 0:
                o3 = `as a runtime dependency of chunk ${r2}`;
                break;
              case 1:
                o3 = `from module ${r2}`;
                break;
              case 2:
                o3 = "from an HMR update";
                break;
              default:
                j(t2, (e4) => `Unknown source type: ${e4}`);
            }
            throw Error(`Failed to load chunk ${n2} ${o3}${e3 ? `: ${e3}` : ""}`, e3 ? { cause: e3 } : void 0);
          }), E.set(o2, u2);
        }
        return u2;
      }
      function x(e2) {
        return `${e2.split("/").map((e3) => encodeURIComponent(e3)).join("/")}`;
      }
      k.L = function(e2) {
        return M(1, this.m.id, e2);
      }, k.R = function(e2) {
        let t2 = this.r(e2);
        return t2?.default ?? t2;
      }, k.P = function(e2) {
        return `/ROOT/${e2 ?? ""}`;
      }, k.b = function(e2) {
        let t2 = new Blob([`self.TURBOPACK_WORKER_LOCATION = ${JSON.stringify(location.origin)};
self.TURBOPACK_NEXT_CHUNK_URLS = ${JSON.stringify(e2.reverse().map(x), null, 2)};
importScripts(...self.TURBOPACK_NEXT_CHUNK_URLS.map(c => self.TURBOPACK_WORKER_LOCATION + c).reverse());`], { type: "text/javascript" });
        return URL.createObjectURL(t2);
      };
      let A = /\.js(?:\?[^#]*)?(?:#.*)?$/;
      n.w = function(t2, r2, n2) {
        return e.loadWebAssembly(1, this.m.id, t2, r2, n2);
      }, n.u = function(t2, r2) {
        return e.loadWebAssemblyModule(1, this.m.id, t2, r2);
      };
      let K = {};
      n.c = K;
      let S = (e2, t2) => {
        let r2 = K[e2];
        if (r2) {
          if (r2.error) throw r2.error;
          return r2;
        }
        return N(e2, R.Parent, t2.id);
      };
      function N(e2, t2, n2) {
        let o2 = U.get(e2);
        if ("function" != typeof o2) throw Error(function(e3, t3, r2) {
          let n3;
          switch (t3) {
            case 0:
              n3 = `as a runtime entry of chunk ${r2}`;
              break;
            case 1:
              n3 = `because it was required from module ${r2}`;
              break;
            case 2:
              n3 = "because of an HMR update";
              break;
            default:
              j(t3, (e4) => `Unknown source type: ${e4}`);
          }
          return `Module ${e3} was instantiated ${n3}, but the module factory is not available.`;
        }(e2, t2, n2));
        let u2 = s(e2), l2 = u2.exports;
        K[e2] = u2;
        let i2 = new r(u2, l2);
        try {
          o2(i2, u2, l2);
        } catch (e3) {
          throw u2.error = e3, e3;
        }
        return u2.namespaceObject && u2.exports !== u2.namespaceObject && d(u2.exports, u2.namespaceObject), u2;
      }
      function q(t2) {
        let r2, n2 = function(e2) {
          if ("string" == typeof e2) return e2;
          let t3 = decodeURIComponent(("undefined" != typeof TURBOPACK_NEXT_CHUNK_URLS ? TURBOPACK_NEXT_CHUNK_URLS.pop() : e2.getAttribute("src")).replace(/[?#].*$/, ""));
          return t3.startsWith("") ? t3.slice(0) : t3;
        }(t2[0]);
        return 2 === t2.length ? r2 = t2[1] : (r2 = void 0, !function(e2, t3, r3, n3) {
          let o2 = 1;
          for (; o2 < e2.length; ) {
            let t4 = e2[o2], n4 = o2 + 1;
            for (; n4 < e2.length && "function" != typeof e2[n4]; ) n4++;
            if (n4 === e2.length) throw Error("malformed chunk format, expected a factory function");
            if (!r3.has(t4)) {
              let u2 = e2[n4];
              for (Object.defineProperty(u2, "name", { value: "module evaluation" }); o2 < n4; o2++) t4 = e2[o2], r3.set(t4, u2);
            }
            o2 = n4 + 1;
          }
        }(t2, 0, U)), e.registerChunk(n2, r2);
      }
      function L(e2, t2, r2 = false) {
        let n2;
        try {
          n2 = t2();
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return !r2 || n2.__esModule ? n2 : d(n2, h(n2), true);
      }
      n.y = async function(e2) {
        let t2;
        try {
          t2 = await import(e2);
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return t2 && t2.__esModule && t2.default && "default" in t2.default ? d(t2.default, h(t2), true) : t2;
      }, L.resolve = (e2, t2) => __require.resolve(e2, t2), n.x = L, e = { registerChunk(e2, t2) {
        B.add(e2), function(e3) {
          let t3 = W.get(e3);
          if (null != t3) {
            for (let r2 of t3) r2.requiredChunks.delete(e3), 0 === r2.requiredChunks.size && I(r2.runtimeModuleIds, r2.chunkPath);
            W.delete(e3);
          }
        }(e2), null != t2 && (0 === t2.otherChunks.length ? I(t2.runtimeModuleIds, e2) : function(e3, t3, r2) {
          let n2 = /* @__PURE__ */ new Set(), o2 = { runtimeModuleIds: r2, chunkPath: e3, requiredChunks: n2 };
          for (let e4 of t3) {
            let t4 = m(e4);
            if (B.has(t4)) continue;
            n2.add(t4);
            let r3 = W.get(t4);
            null == r3 && (r3 = /* @__PURE__ */ new Set(), W.set(t4, r3)), r3.add(o2);
          }
          0 === o2.requiredChunks.size && I(o2.runtimeModuleIds, o2.chunkPath);
        }(e2, t2.otherChunks.filter((e3) => {
          var t3;
          return t3 = m(e3), A.test(t3);
        }), t2.runtimeModuleIds));
      }, loadChunkCached(e2, t2) {
        throw Error("chunk loading is not supported");
      }, async loadWebAssembly(e2, t2, r2, n2, o2) {
        let u2 = await H(r2, n2);
        return await WebAssembly.instantiate(u2, o2);
      }, loadWebAssemblyModule: async (e2, t2, r2, n2) => H(r2, n2) };
      let B = /* @__PURE__ */ new Set(), W = /* @__PURE__ */ new Map();
      function I(e2, t2) {
        for (let r2 of e2) !function(e3, t3) {
          let r3 = K[t3];
          if (r3) {
            if (r3.error) throw r3.error;
            return;
          }
          N(t3, R.Runtime, e3);
        }(t2, r2);
      }
      async function H(e2, t2) {
        let r2;
        try {
          r2 = t2();
        } catch (e3) {
        }
        if (!r2) throw Error(`dynamically loading WebAssembly is not supported in this runtime as global was not injected for chunk '${e2}'`);
        return r2;
      }
      let F = globalThis.TURBOPACK;
      globalThis.TURBOPACK = { push: q }, F.forEach(q);
    })();
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/static|_next\\/image|favicon.ico|sitemap.xml|robots.txt).*))(\\\\.json)?[\\/#\\?]?$"] }];
    require_root_of_the_server_ad53bf88();
    require_node_modules_next_dist_82203b28();
    require_node_modules_91242dc2();
    require_f4d();
    require_turbopack_edge_wrapper_7b27dc96();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "typescript": { "ignoreBuildErrors": false }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 14400, "formats": ["image/webp"], "maximumRedirects": 3, "dangerouslyAllowLocalIP": false, "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "localPatterns": [{ "pathname": "**", "search": "" }], "remotePatterns": [], "qualities": [75], "unoptimized": true }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": {}, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/Users/k7/PRO/ATLETIA/dashboard", "cacheComponents": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 31536e3 } }, "cacheHandlers": {}, "experimental": { "useSkewCookie": false, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "dynamicOnHover": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "proxyPrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 9, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptSkipMetadata": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "viewTransition": false, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": false, "staleTimes": { "dynamic": 0, "static": 300 }, "reactDebugChannel": false, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "inlineCss": false, "useCache": false, "globalNotFound": false, "browserDebugInfoInTerminal": false, "lockDistDir": true, "isolatedDevBuild": true, "proxyClientMaxBodySize": 10485760, "hideLogsAfterAbort": false, "mcpServer": true, "serverActions": { "bodySizeLimit": "2mb" }, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts", "turbopack": { "resolveAlias": { "next-intl/config": "./lib/i18n.ts" }, "root": "/Users/k7/PRO/ATLETIA/dashboard" }, "distDirRoot": ".next" };
var BuildId = "dlAoypti2Hm3aXb0sWOI7";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "priority": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_global-error", "regex": "^/_global\\-error(?:/)?$", "routeKeys": {}, "namedRegex": "^/_global\\-error(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/api/admin/pros", "regex": "^/api/admin/pros(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/pros(?:/)?$" }, { "page": "/api/agents", "regex": "^/api/agents(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/agents(?:/)?$" }, { "page": "/api/agents/init", "regex": "^/api/agents/init(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/agents/init(?:/)?$" }, { "page": "/api/auth/setup-role", "regex": "^/api/auth/setup\\-role(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/setup\\-role(?:/)?$" }, { "page": "/api/auth/sync", "regex": "^/api/auth/sync(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/sync(?:/)?$" }, { "page": "/api/auth/user", "regex": "^/api/auth/user(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/user(?:/)?$" }, { "page": "/api/baseten/generate", "regex": "^/api/baseten/generate(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/baseten/generate(?:/)?$" }, { "page": "/api/chats", "regex": "^/api/chats(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/chats(?:/)?$" }, { "page": "/api/chats/direct", "regex": "^/api/chats/direct(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/chats/direct(?:/)?$" }, { "page": "/api/clients", "regex": "^/api/clients(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/clients(?:/)?$" }, { "page": "/api/dashboard/stats", "regex": "^/api/dashboard/stats(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/dashboard/stats(?:/)?$" }, { "page": "/api/exercises", "regex": "^/api/exercises(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/exercises(?:/)?$" }, { "page": "/api/exercises/grouped", "regex": "^/api/exercises/grouped(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/exercises/grouped(?:/)?$" }, { "page": "/api/invitations", "regex": "^/api/invitations(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/invitations(?:/)?$" }, { "page": "/api/logout", "regex": "^/api/logout(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/logout(?:/)?$" }, { "page": "/api/organizations", "regex": "^/api/organizations(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/organizations(?:/)?$" }, { "page": "/api/organizations/public", "regex": "^/api/organizations/public(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/organizations/public(?:/)?$" }, { "page": "/api/programs", "regex": "^/api/programs(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/programs(?:/)?$" }, { "page": "/api/programs/migrate", "regex": "^/api/programs/migrate(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/programs/migrate(?:/)?$" }, { "page": "/api/public/stats", "regex": "^/api/public/stats(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/public/stats(?:/)?$" }, { "page": "/api/requests", "regex": "^/api/requests(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/requests(?:/)?$" }, { "page": "/api/stripe/create-checkout", "regex": "^/api/stripe/create\\-checkout(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/stripe/create\\-checkout(?:/)?$" }, { "page": "/api/stripe/create-portal", "regex": "^/api/stripe/create\\-portal(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/stripe/create\\-portal(?:/)?$" }, { "page": "/api/stripe/invoices", "regex": "^/api/stripe/invoices(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/stripe/invoices(?:/)?$" }, { "page": "/api/stripe/webhook", "regex": "^/api/stripe/webhook(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/stripe/webhook(?:/)?$" }, { "page": "/api/subscription", "regex": "^/api/subscription(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/subscription(?:/)?$" }, { "page": "/api/subscription/sync", "regex": "^/api/subscription/sync(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/subscription/sync(?:/)?$" }, { "page": "/api/users", "regex": "^/api/users(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/users(?:/)?$" }, { "page": "/dashboard", "regex": "^/dashboard(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard(?:/)?$" }, { "page": "/dashboard/admin/organizations", "regex": "^/dashboard/admin/organizations(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/admin/organizations(?:/)?$" }, { "page": "/dashboard/admin/pros", "regex": "^/dashboard/admin/pros(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/admin/pros(?:/)?$" }, { "page": "/dashboard/admin/users", "regex": "^/dashboard/admin/users(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/admin/users(?:/)?$" }, { "page": "/dashboard/assistants", "regex": "^/dashboard/assistants(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/assistants(?:/)?$" }, { "page": "/dashboard/calculators", "regex": "^/dashboard/calculators(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/calculators(?:/)?$" }, { "page": "/dashboard/clients", "regex": "^/dashboard/clients(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/clients(?:/)?$" }, { "page": "/dashboard/messaging", "regex": "^/dashboard/messaging(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/messaging(?:/)?$" }, { "page": "/dashboard/nutrition", "regex": "^/dashboard/nutrition(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/nutrition(?:/)?$" }, { "page": "/dashboard/organizations", "regex": "^/dashboard/organizations(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/organizations(?:/)?$" }, { "page": "/dashboard/organizations/migrate", "regex": "^/dashboard/organizations/migrate(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/organizations/migrate(?:/)?$" }, { "page": "/dashboard/organizations/user", "regex": "^/dashboard/organizations/user(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/organizations/user(?:/)?$" }, { "page": "/dashboard/profile", "regex": "^/dashboard/profile(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/profile(?:/)?$" }, { "page": "/dashboard/programs", "regex": "^/dashboard/programs(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/programs(?:/)?$" }, { "page": "/dashboard/programs/builder", "regex": "^/dashboard/programs/builder(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/programs/builder(?:/)?$" }, { "page": "/dashboard/subscription", "regex": "^/dashboard/subscription(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/subscription(?:/)?$" }, { "page": "/dashboard/trainings", "regex": "^/dashboard/trainings(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/trainings(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/legal/cgv", "regex": "^/legal/cgv(?:/)?$", "routeKeys": {}, "namedRegex": "^/legal/cgv(?:/)?$" }, { "page": "/legal/mentions", "regex": "^/legal/mentions(?:/)?$", "routeKeys": {}, "namedRegex": "^/legal/mentions(?:/)?$" }, { "page": "/legal/privacy", "regex": "^/legal/privacy(?:/)?$", "routeKeys": {}, "namedRegex": "^/legal/privacy(?:/)?$" }, { "page": "/legal/termination", "regex": "^/legal/termination(?:/)?$", "routeKeys": {}, "namedRegex": "^/legal/termination(?:/)?$" }, { "page": "/legal/terms", "regex": "^/legal/terms(?:/)?$", "routeKeys": {}, "namedRegex": "^/legal/terms(?:/)?$" }, { "page": "/logout", "regex": "^/logout(?:/)?$", "routeKeys": {}, "namedRegex": "^/logout(?:/)?$" }, { "page": "/signup", "regex": "^/signup(?:/)?$", "routeKeys": {}, "namedRegex": "^/signup(?:/)?$" }], "dynamic": [{ "page": "/api/admin/pros/[id]/approve", "regex": "^/api/admin/pros/([^/]+?)/approve(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/admin/pros/(?<nxtPid>[^/]+?)/approve(?:/)?$" }, { "page": "/api/admin/pros/[id]/reject", "regex": "^/api/admin/pros/([^/]+?)/reject(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/admin/pros/(?<nxtPid>[^/]+?)/reject(?:/)?$" }, { "page": "/api/agents/[id]", "regex": "^/api/agents/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/agents/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/api/agents/[id]/sessions", "regex": "^/api/agents/([^/]+?)/sessions(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/agents/(?<nxtPid>[^/]+?)/sessions(?:/)?$" }, { "page": "/api/chats/[id]", "regex": "^/api/chats/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/chats/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/api/chats/[id]/messages", "regex": "^/api/chats/([^/]+?)/messages(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/chats/(?<nxtPid>[^/]+?)/messages(?:/)?$" }, { "page": "/api/chats/[id]/read", "regex": "^/api/chats/([^/]+?)/read(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/chats/(?<nxtPid>[^/]+?)/read(?:/)?$" }, { "page": "/api/coaching/[organizationId]/analyze-program", "regex": "^/api/coaching/([^/]+?)/analyze\\-program(?:/)?$", "routeKeys": { "nxtPorganizationId": "nxtPorganizationId" }, "namedRegex": "^/api/coaching/(?<nxtPorganizationId>[^/]+?)/analyze\\-program(?:/)?$" }, { "page": "/api/coaching/[organizationId]/notes", "regex": "^/api/coaching/([^/]+?)/notes(?:/)?$", "routeKeys": { "nxtPorganizationId": "nxtPorganizationId" }, "namedRegex": "^/api/coaching/(?<nxtPorganizationId>[^/]+?)/notes(?:/)?$" }, { "page": "/api/measurements/users/[userId]", "regex": "^/api/measurements/users/([^/]+?)(?:/)?$", "routeKeys": { "nxtPuserId": "nxtPuserId" }, "namedRegex": "^/api/measurements/users/(?<nxtPuserId>[^/]+?)(?:/)?$" }, { "page": "/api/measurements/users/[userId]/stats", "regex": "^/api/measurements/users/([^/]+?)/stats(?:/)?$", "routeKeys": { "nxtPuserId": "nxtPuserId" }, "namedRegex": "^/api/measurements/users/(?<nxtPuserId>[^/]+?)/stats(?:/)?$" }, { "page": "/api/messages/[id]/read", "regex": "^/api/messages/([^/]+?)/read(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/messages/(?<nxtPid>[^/]+?)/read(?:/)?$" }, { "page": "/api/organizations/[id]", "regex": "^/api/organizations/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/organizations/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/api/organizations/[id]/invitations", "regex": "^/api/organizations/([^/]+?)/invitations(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/organizations/(?<nxtPid>[^/]+?)/invitations(?:/)?$" }, { "page": "/api/organizations/[id]/invitations/[invitationId]", "regex": "^/api/organizations/([^/]+?)/invitations/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid", "nxtPinvitationId": "nxtPinvitationId" }, "namedRegex": "^/api/organizations/(?<nxtPid>[^/]+?)/invitations/(?<nxtPinvitationId>[^/]+?)(?:/)?$" }, { "page": "/api/organizations/[id]/invite", "regex": "^/api/organizations/([^/]+?)/invite(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/organizations/(?<nxtPid>[^/]+?)/invite(?:/)?$" }, { "page": "/api/organizations/[id]/join", "regex": "^/api/organizations/([^/]+?)/join(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/organizations/(?<nxtPid>[^/]+?)/join(?:/)?$" }, { "page": "/api/organizations/[id]/request", "regex": "^/api/organizations/([^/]+?)/request(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/organizations/(?<nxtPid>[^/]+?)/request(?:/)?$" }, { "page": "/api/organizations/[id]/requests", "regex": "^/api/organizations/([^/]+?)/requests(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/organizations/(?<nxtPid>[^/]+?)/requests(?:/)?$" }, { "page": "/api/organizations/[id]/requests/[requestId]", "regex": "^/api/organizations/([^/]+?)/requests/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid", "nxtPrequestId": "nxtPrequestId" }, "namedRegex": "^/api/organizations/(?<nxtPid>[^/]+?)/requests/(?<nxtPrequestId>[^/]+?)(?:/)?$" }, { "page": "/api/programs/[id]", "regex": "^/api/programs/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/programs/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/api/users/[id]", "regex": "^/api/users/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/users/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/api/users/[id]/profile", "regex": "^/api/users/([^/]+?)/profile(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/users/(?<nxtPid>[^/]+?)/profile(?:/)?$" }, { "page": "/api/workout-sessions/users/[userId]", "regex": "^/api/workout\\-sessions/users/([^/]+?)(?:/)?$", "routeKeys": { "nxtPuserId": "nxtPuserId" }, "namedRegex": "^/api/workout\\-sessions/users/(?<nxtPuserId>[^/]+?)(?:/)?$" }, { "page": "/api/workout-sessions/users/[userId]/stats", "regex": "^/api/workout\\-sessions/users/([^/]+?)/stats(?:/)?$", "routeKeys": { "nxtPuserId": "nxtPuserId" }, "namedRegex": "^/api/workout\\-sessions/users/(?<nxtPuserId>[^/]+?)/stats(?:/)?$" }, { "page": "/dashboard/assistants/[id]/chat", "regex": "^/dashboard/assistants/([^/]+?)/chat(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/dashboard/assistants/(?<nxtPid>[^/]+?)/chat(?:/)?$" }, { "page": "/dashboard/assistants/[id]/history", "regex": "^/dashboard/assistants/([^/]+?)/history(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/dashboard/assistants/(?<nxtPid>[^/]+?)/history(?:/)?$" }, { "page": "/dashboard/clients/[id]/follow-up", "regex": "^/dashboard/clients/([^/]+?)/follow\\-up(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/dashboard/clients/(?<nxtPid>[^/]+?)/follow\\-up(?:/)?$" }, { "page": "/dashboard/clients/[id]/measurements", "regex": "^/dashboard/clients/([^/]+?)/measurements(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/dashboard/clients/(?<nxtPid>[^/]+?)/measurements(?:/)?$" }, { "page": "/dashboard/clients/[id]/sessions", "regex": "^/dashboard/clients/([^/]+?)/sessions(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/dashboard/clients/(?<nxtPid>[^/]+?)/sessions(?:/)?$" }, { "page": "/dashboard/organizations/[id]", "regex": "^/dashboard/organizations/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/dashboard/organizations/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/dashboard/programs/[id]", "regex": "^/dashboard/programs/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/dashboard/programs/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/dashboard/programs/[id]/edit", "regex": "^/dashboard/programs/([^/]+?)/edit(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/dashboard/programs/(?<nxtPid>[^/]+?)/edit(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/_global-error": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_global-error", "dataRoute": "/_global-error.rsc", "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "c4c3d0ef1339e09e41bad08580252e0e", "previewModeSigningKey": "4b5d650411df94ae78227660bf3b123420646615d2ce13334574929655801c69", "previewModeEncryptionKey": "fc657dccdb5e63a865320a3cdffb246e2d3e98fb64d9e1d6577ec34cb0d35c21" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge/chunks/[root-of-the-server]__ad53bf88._.js", "server/edge/chunks/node_modules_next_dist_82203b28._.js", "server/edge/chunks/node_modules_91242dc2._.js", "server/edge/chunks/_74669f4d._.js", "server/edge/chunks/turbopack-edge-wrapper_7b27dc96.js"], "name": "middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/static|_next\\/image|favicon.ico|sitemap.xml|robots.txt).*))(\\\\.json)?[\\/#\\?]?$", "originalSource": "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "dlAoypti2Hm3aXb0sWOI7", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "EgmNF13NUN/tapjpWa4t5P23JF2yT5XlzGtTzpfMq08=", "__NEXT_PREVIEW_MODE_ID": "c4c3d0ef1339e09e41bad08580252e0e", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "fc657dccdb5e63a865320a3cdffb246e2d3e98fb64d9e1d6577ec34cb0d35c21", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "4b5d650411df94ae78227660bf3b123420646615d2ce13334574929655801c69" } } }, "sortedMiddleware": ["/"], "functions": { "/api/coaching/[organizationId]/analyze-program/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/server-reference-manifest.js", "server/app/api/coaching/[organizationId]/analyze-program/route_client-reference-manifest.js", "server/edge/chunks/ce889_server_app_api_coaching_[organizationId]_analyze-program_route_actions_a4321d20.js", "server/edge/chunks/[root-of-the-server]__1d278b79._.js", "server/edge/chunks/node_modules_next_dist_1ee357a9._.js", "server/edge/chunks/turbopack-edge-wrapper_014b09da.js"], "name": "app/api/coaching/[organizationId]/analyze-program/route", "page": "/api/coaching/[organizationId]/analyze-program/route", "matchers": [{ "regexp": "^/api/coaching/(?P<nxtPorganizationId>[^/]+?)/analyze-program(?:/)?$", "originalSource": "/api/coaching/[organizationId]/analyze-program" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "dlAoypti2Hm3aXb0sWOI7", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "EgmNF13NUN/tapjpWa4t5P23JF2yT5XlzGtTzpfMq08=", "__NEXT_PREVIEW_MODE_ID": "c4c3d0ef1339e09e41bad08580252e0e", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "fc657dccdb5e63a865320a3cdffb246e2d3e98fb64d9e1d6577ec34cb0d35c21", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "4b5d650411df94ae78227660bf3b123420646615d2ce13334574929655801c69" } }, "/api/coaching/[organizationId]/notes/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/server-reference-manifest.js", "server/app/api/coaching/[organizationId]/notes/route_client-reference-manifest.js", "server/edge/chunks/ce889_server_app_api_coaching_[organizationId]_notes_route_actions_32f431c1.js", "server/edge/chunks/[root-of-the-server]__a59c03e7._.js", "server/edge/chunks/node_modules_next_dist_1ee357a9._.js", "server/edge/chunks/turbopack-edge-wrapper_3080243d.js"], "name": "app/api/coaching/[organizationId]/notes/route", "page": "/api/coaching/[organizationId]/notes/route", "matchers": [{ "regexp": "^/api/coaching/(?P<nxtPorganizationId>[^/]+?)/notes(?:/)?$", "originalSource": "/api/coaching/[organizationId]/notes" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "dlAoypti2Hm3aXb0sWOI7", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "EgmNF13NUN/tapjpWa4t5P23JF2yT5XlzGtTzpfMq08=", "__NEXT_PREVIEW_MODE_ID": "c4c3d0ef1339e09e41bad08580252e0e", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "fc657dccdb5e63a865320a3cdffb246e2d3e98fb64d9e1d6577ec34cb0d35c21", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "4b5d650411df94ae78227660bf3b123420646615d2ce13334574929655801c69" } }, "/api/exercises/grouped/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/server-reference-manifest.js", "server/app/api/exercises/grouped/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_exercises_grouped_route_actions_1849a913.js", "server/edge/chunks/[root-of-the-server]__77347e06._.js", "server/edge/chunks/node_modules_next_dist_1ee357a9._.js", "server/edge/chunks/turbopack-edge-wrapper_d6a55f5b.js"], "name": "app/api/exercises/grouped/route", "page": "/api/exercises/grouped/route", "matchers": [{ "regexp": "^/api/exercises/grouped(?:/)?$", "originalSource": "/api/exercises/grouped" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "dlAoypti2Hm3aXb0sWOI7", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "EgmNF13NUN/tapjpWa4t5P23JF2yT5XlzGtTzpfMq08=", "__NEXT_PREVIEW_MODE_ID": "c4c3d0ef1339e09e41bad08580252e0e", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "fc657dccdb5e63a865320a3cdffb246e2d3e98fb64d9e1d6577ec34cb0d35c21", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "4b5d650411df94ae78227660bf3b123420646615d2ce13334574929655801c69" } }, "/api/exercises/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/server-reference-manifest.js", "server/app/api/exercises/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_exercises_route_actions_5910f22c.js", "server/edge/chunks/[root-of-the-server]__c5534fee._.js", "server/edge/chunks/node_modules_next_dist_1ee357a9._.js", "server/edge/chunks/turbopack-edge-wrapper_34109ab3.js"], "name": "app/api/exercises/route", "page": "/api/exercises/route", "matchers": [{ "regexp": "^/api/exercises(?:/)?$", "originalSource": "/api/exercises" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "dlAoypti2Hm3aXb0sWOI7", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "EgmNF13NUN/tapjpWa4t5P23JF2yT5XlzGtTzpfMq08=", "__NEXT_PREVIEW_MODE_ID": "c4c3d0ef1339e09e41bad08580252e0e", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "fc657dccdb5e63a865320a3cdffb246e2d3e98fb64d9e1d6577ec34cb0d35c21", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "4b5d650411df94ae78227660bf3b123420646615d2ce13334574929655801c69" } }, "/api/logout/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/server-reference-manifest.js", "server/app/api/logout/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_logout_route_actions_ef40b8fa.js", "server/edge/chunks/[root-of-the-server]__608b62e5._.js", "server/edge/chunks/node_modules_next_dist_1ee357a9._.js", "server/edge/chunks/turbopack-edge-wrapper_b07ccfb4.js"], "name": "app/api/logout/route", "page": "/api/logout/route", "matchers": [{ "regexp": "^/api/logout(?:/)?$", "originalSource": "/api/logout" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "dlAoypti2Hm3aXb0sWOI7", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "EgmNF13NUN/tapjpWa4t5P23JF2yT5XlzGtTzpfMq08=", "__NEXT_PREVIEW_MODE_ID": "c4c3d0ef1339e09e41bad08580252e0e", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "fc657dccdb5e63a865320a3cdffb246e2d3e98fb64d9e1d6577ec34cb0d35c21", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "4b5d650411df94ae78227660bf3b123420646615d2ce13334574929655801c69" } }, "/api/measurements/users/[userId]/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/server-reference-manifest.js", "server/app/api/measurements/users/[userId]/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_measurements_users_[userId]_route_actions_a19f00c0.js", "server/edge/chunks/[root-of-the-server]__c127b6d4._.js", "server/edge/chunks/node_modules_next_dist_1ee357a9._.js", "server/edge/chunks/turbopack-edge-wrapper_c5a226f5.js"], "name": "app/api/measurements/users/[userId]/route", "page": "/api/measurements/users/[userId]/route", "matchers": [{ "regexp": "^/api/measurements/users/(?P<nxtPuserId>[^/]+?)(?:/)?$", "originalSource": "/api/measurements/users/[userId]" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "dlAoypti2Hm3aXb0sWOI7", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "EgmNF13NUN/tapjpWa4t5P23JF2yT5XlzGtTzpfMq08=", "__NEXT_PREVIEW_MODE_ID": "c4c3d0ef1339e09e41bad08580252e0e", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "fc657dccdb5e63a865320a3cdffb246e2d3e98fb64d9e1d6577ec34cb0d35c21", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "4b5d650411df94ae78227660bf3b123420646615d2ce13334574929655801c69" } }, "/api/measurements/users/[userId]/stats/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/server-reference-manifest.js", "server/app/api/measurements/users/[userId]/stats/route_client-reference-manifest.js", "server/edge/chunks/ce889_server_app_api_measurements_users_[userId]_stats_route_actions_294c7d70.js", "server/edge/chunks/[root-of-the-server]__b15a0072._.js", "server/edge/chunks/node_modules_next_dist_1ee357a9._.js", "server/edge/chunks/turbopack-edge-wrapper_153819ee.js"], "name": "app/api/measurements/users/[userId]/stats/route", "page": "/api/measurements/users/[userId]/stats/route", "matchers": [{ "regexp": "^/api/measurements/users/(?P<nxtPuserId>[^/]+?)/stats(?:/)?$", "originalSource": "/api/measurements/users/[userId]/stats" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "dlAoypti2Hm3aXb0sWOI7", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "EgmNF13NUN/tapjpWa4t5P23JF2yT5XlzGtTzpfMq08=", "__NEXT_PREVIEW_MODE_ID": "c4c3d0ef1339e09e41bad08580252e0e", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "fc657dccdb5e63a865320a3cdffb246e2d3e98fb64d9e1d6577ec34cb0d35c21", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "4b5d650411df94ae78227660bf3b123420646615d2ce13334574929655801c69" } }, "/api/public/stats/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/server-reference-manifest.js", "server/app/api/public/stats/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_public_stats_route_actions_76f89835.js", "server/edge/chunks/[root-of-the-server]__0b003bdf._.js", "server/edge/chunks/node_modules_next_dist_1ee357a9._.js", "server/edge/chunks/_514b03cf._.js", "server/edge/chunks/turbopack-edge-wrapper_31223102.js"], "name": "app/api/public/stats/route", "page": "/api/public/stats/route", "matchers": [{ "regexp": "^/api/public/stats(?:/)?$", "originalSource": "/api/public/stats" }], "wasm": [{ "name": "wasm_5ff7258941bdfe0f", "filePath": "server/edge/chunks/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "dlAoypti2Hm3aXb0sWOI7", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "EgmNF13NUN/tapjpWa4t5P23JF2yT5XlzGtTzpfMq08=", "__NEXT_PREVIEW_MODE_ID": "c4c3d0ef1339e09e41bad08580252e0e", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "fc657dccdb5e63a865320a3cdffb246e2d3e98fb64d9e1d6577ec34cb0d35c21", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "4b5d650411df94ae78227660bf3b123420646615d2ce13334574929655801c69" } }, "/api/stripe/webhook/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/server-reference-manifest.js", "server/app/api/stripe/webhook/route_client-reference-manifest.js", "server/edge/chunks/_next-internal_server_app_api_stripe_webhook_route_actions_371d5332.js", "server/edge/chunks/[root-of-the-server]__bafad193._.js", "server/edge/chunks/_514b03cf._.js", "server/edge/chunks/node_modules_next_dist_1ee357a9._.js", "server/edge/chunks/node_modules_d9643d43._.js", "server/edge/chunks/turbopack-edge-wrapper_5639d93a.js"], "name": "app/api/stripe/webhook/route", "page": "/api/stripe/webhook/route", "matchers": [{ "regexp": "^/api/stripe/webhook(?:/)?$", "originalSource": "/api/stripe/webhook" }], "wasm": [{ "name": "wasm_5ff7258941bdfe0f", "filePath": "server/edge/chunks/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "dlAoypti2Hm3aXb0sWOI7", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "EgmNF13NUN/tapjpWa4t5P23JF2yT5XlzGtTzpfMq08=", "__NEXT_PREVIEW_MODE_ID": "c4c3d0ef1339e09e41bad08580252e0e", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "fc657dccdb5e63a865320a3cdffb246e2d3e98fb64d9e1d6577ec34cb0d35c21", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "4b5d650411df94ae78227660bf3b123420646615d2ce13334574929655801c69" } }, "/api/workout-sessions/users/[userId]/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/server-reference-manifest.js", "server/app/api/workout-sessions/users/[userId]/route_client-reference-manifest.js", "server/edge/chunks/ce889_server_app_api_workout-sessions_users_[userId]_route_actions_f65fde18.js", "server/edge/chunks/[root-of-the-server]__059d4b9f._.js", "server/edge/chunks/node_modules_next_dist_1ee357a9._.js", "server/edge/chunks/turbopack-edge-wrapper_42ff7551.js"], "name": "app/api/workout-sessions/users/[userId]/route", "page": "/api/workout-sessions/users/[userId]/route", "matchers": [{ "regexp": "^/api/workout-sessions/users/(?P<nxtPuserId>[^/]+?)(?:/)?$", "originalSource": "/api/workout-sessions/users/[userId]" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "dlAoypti2Hm3aXb0sWOI7", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "EgmNF13NUN/tapjpWa4t5P23JF2yT5XlzGtTzpfMq08=", "__NEXT_PREVIEW_MODE_ID": "c4c3d0ef1339e09e41bad08580252e0e", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "fc657dccdb5e63a865320a3cdffb246e2d3e98fb64d9e1d6577ec34cb0d35c21", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "4b5d650411df94ae78227660bf3b123420646615d2ce13334574929655801c69" } }, "/api/workout-sessions/users/[userId]/stats/route": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/server-reference-manifest.js", "server/app/api/workout-sessions/users/[userId]/stats/route_client-reference-manifest.js", "server/edge/chunks/ce889_server_app_api_workout-sessions_users_[userId]_stats_route_actions_a1ea547f.js", "server/edge/chunks/[root-of-the-server]__f11cc950._.js", "server/edge/chunks/node_modules_next_dist_1ee357a9._.js", "server/edge/chunks/turbopack-edge-wrapper_ce07318e.js"], "name": "app/api/workout-sessions/users/[userId]/stats/route", "page": "/api/workout-sessions/users/[userId]/stats/route", "matchers": [{ "regexp": "^/api/workout-sessions/users/(?P<nxtPuserId>[^/]+?)/stats(?:/)?$", "originalSource": "/api/workout-sessions/users/[userId]/stats" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "dlAoypti2Hm3aXb0sWOI7", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "EgmNF13NUN/tapjpWa4t5P23JF2yT5XlzGtTzpfMq08=", "__NEXT_PREVIEW_MODE_ID": "c4c3d0ef1339e09e41bad08580252e0e", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "fc657dccdb5e63a865320a3cdffb246e2d3e98fb64d9e1d6577ec34cb0d35c21", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "4b5d650411df94ae78227660bf3b123420646615d2ce13334574929655801c69" } }, "/dashboard/subscription/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_c00b1214._.js", "server/edge/chunks/ssr/node_modules_25f7ace7._.js", "server/edge/chunks/ssr/node_modules_next_dist_7f07cde4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_e5eeb198._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/_97fb8d0f._.js", "server/edge/chunks/ssr/node_modules_6bd593ec._.js", "server/edge/chunks/ssr/node_modules_bae079aa._.js", "server/edge/chunks/ssr/_08e2b131._.js", "server/edge/chunks/ssr/node_modules_next_dist_41c11b27._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_82294b61._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_dd9bd04d._.js", "server/edge/chunks/ssr/_021848b5._.js", "server/edge/chunks/ssr/_838b99d6._.js", "server/edge/chunks/ssr/app_dashboard_subscription_subscription-content_tsx_d22a83a4._.js", "server/app/dashboard/subscription/page_client-reference-manifest.js", "server/edge/chunks/ssr/_next-internal_server_app_dashboard_subscription_page_actions_3ece0863.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_22086735._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_8a63ea84._.js", "server/edge/chunks/ssr/node_modules_ce586a77._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_18bd30a1._.js", "server/edge/chunks/ssr/[root-of-the-server]__4be8a7d0._.js", "server/edge/chunks/ssr/node_modules_next_dist_11e13324._.js", "server/edge/chunks/ssr/node_modules_next_dist_339889d6._.js", "server/edge/chunks/ssr/node_modules_next_dist_a982dfac._.js", "server/edge/chunks/ssr/_713d0f81._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_9e149d85._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/_48b0f63a._.js", "server/edge/chunks/ssr/[root-of-the-server]__c7f19159._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_1b74ec03.js", "server/app/dashboard/subscription/page/react-loadable-manifest.js"], "name": "app/dashboard/subscription/page", "page": "/dashboard/subscription/page", "matchers": [{ "regexp": "^/dashboard/subscription(?:/)?$", "originalSource": "/dashboard/subscription" }], "wasm": [{ "name": "wasm_5ff7258941bdfe0f", "filePath": "server/edge/chunks/ssr/node_modules__prisma_client_query_engine_bg_23ace1ce.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "dlAoypti2Hm3aXb0sWOI7", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "EgmNF13NUN/tapjpWa4t5P23JF2yT5XlzGtTzpfMq08=", "__NEXT_PREVIEW_MODE_ID": "c4c3d0ef1339e09e41bad08580252e0e", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "fc657dccdb5e63a865320a3cdffb246e2d3e98fb64d9e1d6577ec34cb0d35c21", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "4b5d650411df94ae78227660bf3b123420646615d2ce13334574929655801c69" } } } };
var AppPathRoutesManifest = { "/_global-error/page": "/_global-error", "/_not-found/page": "/_not-found", "/api/admin/pros/[id]/approve/route": "/api/admin/pros/[id]/approve", "/api/admin/pros/[id]/reject/route": "/api/admin/pros/[id]/reject", "/api/admin/pros/route": "/api/admin/pros", "/api/agents/[id]/route": "/api/agents/[id]", "/api/agents/[id]/sessions/route": "/api/agents/[id]/sessions", "/api/agents/init/route": "/api/agents/init", "/api/agents/route": "/api/agents", "/api/auth/setup-role/route": "/api/auth/setup-role", "/api/auth/sync/route": "/api/auth/sync", "/api/auth/user/route": "/api/auth/user", "/api/baseten/generate/route": "/api/baseten/generate", "/api/chats/[id]/messages/route": "/api/chats/[id]/messages", "/api/chats/[id]/read/route": "/api/chats/[id]/read", "/api/chats/[id]/route": "/api/chats/[id]", "/api/chats/direct/route": "/api/chats/direct", "/api/chats/route": "/api/chats", "/api/clients/route": "/api/clients", "/api/coaching/[organizationId]/analyze-program/route": "/api/coaching/[organizationId]/analyze-program", "/api/coaching/[organizationId]/notes/route": "/api/coaching/[organizationId]/notes", "/api/dashboard/stats/route": "/api/dashboard/stats", "/api/exercises/grouped/route": "/api/exercises/grouped", "/api/exercises/route": "/api/exercises", "/api/invitations/route": "/api/invitations", "/api/logout/route": "/api/logout", "/api/measurements/users/[userId]/route": "/api/measurements/users/[userId]", "/api/measurements/users/[userId]/stats/route": "/api/measurements/users/[userId]/stats", "/api/messages/[id]/read/route": "/api/messages/[id]/read", "/api/organizations/[id]/invitations/[invitationId]/route": "/api/organizations/[id]/invitations/[invitationId]", "/api/organizations/[id]/invitations/route": "/api/organizations/[id]/invitations", "/api/organizations/[id]/invite/route": "/api/organizations/[id]/invite", "/api/organizations/[id]/join/route": "/api/organizations/[id]/join", "/api/organizations/[id]/request/route": "/api/organizations/[id]/request", "/api/organizations/[id]/requests/[requestId]/route": "/api/organizations/[id]/requests/[requestId]", "/api/organizations/[id]/requests/route": "/api/organizations/[id]/requests", "/api/organizations/[id]/route": "/api/organizations/[id]", "/api/organizations/public/route": "/api/organizations/public", "/api/organizations/route": "/api/organizations", "/api/programs/[id]/route": "/api/programs/[id]", "/api/programs/migrate/route": "/api/programs/migrate", "/api/programs/route": "/api/programs", "/api/public/stats/route": "/api/public/stats", "/api/requests/route": "/api/requests", "/api/stripe/create-checkout/route": "/api/stripe/create-checkout", "/api/stripe/create-portal/route": "/api/stripe/create-portal", "/api/stripe/invoices/route": "/api/stripe/invoices", "/api/stripe/webhook/route": "/api/stripe/webhook", "/api/subscription/route": "/api/subscription", "/api/subscription/sync/route": "/api/subscription/sync", "/api/users/[id]/profile/route": "/api/users/[id]/profile", "/api/users/[id]/route": "/api/users/[id]", "/api/users/route": "/api/users", "/api/workout-sessions/users/[userId]/route": "/api/workout-sessions/users/[userId]", "/api/workout-sessions/users/[userId]/stats/route": "/api/workout-sessions/users/[userId]/stats", "/dashboard/admin/organizations/page": "/dashboard/admin/organizations", "/dashboard/admin/pros/page": "/dashboard/admin/pros", "/dashboard/admin/users/page": "/dashboard/admin/users", "/dashboard/assistants/[id]/chat/page": "/dashboard/assistants/[id]/chat", "/dashboard/assistants/[id]/history/page": "/dashboard/assistants/[id]/history", "/dashboard/assistants/page": "/dashboard/assistants", "/dashboard/calculators/page": "/dashboard/calculators", "/dashboard/clients/[id]/follow-up/page": "/dashboard/clients/[id]/follow-up", "/dashboard/clients/[id]/measurements/page": "/dashboard/clients/[id]/measurements", "/dashboard/clients/[id]/sessions/page": "/dashboard/clients/[id]/sessions", "/dashboard/clients/page": "/dashboard/clients", "/dashboard/messaging/page": "/dashboard/messaging", "/dashboard/nutrition/page": "/dashboard/nutrition", "/dashboard/organizations/[id]/page": "/dashboard/organizations/[id]", "/dashboard/organizations/migrate/page": "/dashboard/organizations/migrate", "/dashboard/organizations/page": "/dashboard/organizations", "/dashboard/organizations/user/page": "/dashboard/organizations/user", "/dashboard/page": "/dashboard", "/dashboard/profile/page": "/dashboard/profile", "/dashboard/programs/[id]/edit/page": "/dashboard/programs/[id]/edit", "/dashboard/programs/[id]/page": "/dashboard/programs/[id]", "/dashboard/programs/builder/page": "/dashboard/programs/builder", "/dashboard/programs/page": "/dashboard/programs", "/dashboard/subscription/page": "/dashboard/subscription", "/dashboard/trainings/page": "/dashboard/trainings", "/favicon.ico/route": "/favicon.ico", "/legal/cgv/page": "/legal/cgv", "/legal/mentions/page": "/legal/mentions", "/legal/privacy/page": "/legal/privacy", "/legal/termination/page": "/legal/termination", "/legal/terms/page": "/legal/terms", "/logout/page": "/logout", "/page": "/", "/signup/page": "/signup" };
var FunctionsConfigManifest = { "version": 1, "functions": { "/api/coaching/[organizationId]/analyze-program": {}, "/api/coaching/[organizationId]/notes": {}, "/api/exercises/grouped": {}, "/api/exercises": {}, "/api/measurements/users/[userId]/stats": {}, "/api/measurements/users/[userId]": {}, "/api/logout": {}, "/api/public/stats": {}, "/api/stripe/webhook": {}, "/api/workout-sessions/users/[userId]": {}, "/api/workout-sessions/users/[userId]/stats": {}, "/dashboard/subscription": {} } };
var PagesManifest = { "/500": "pages/500.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream3 } from "node:stream/web";

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: constructNextUrl(internalEvent.url, `/${detectedLocale}`)
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream3({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location2, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location2)) {
    return location2;
  }
  const locationURL = new URL(location2);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
    delete value.meta?.headers?.["x-next-cache-tags"];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  if (finalRevalidate !== CACHE_ONE_YEAR) {
    const sMaxAge = Math.max(finalRevalidate - age, 1);
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate
    });
    const isStale = sMaxAge === 1;
    if (isStale) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  try {
    const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
    const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {});
    const body = isSegmentResponse ? cachedValue.segmentData[segmentHeader] : cachedValue.rsc;
    return {
      body,
      additionalHeaders: isSegmentResponse ? { [NEXT_PRERENDER_HEADER]: "1", [NEXT_POSTPONED_HEADER]: "2" } : {}
    };
  } catch (e) {
    error("Error while getting body for app router from cache:", e);
    return { body: cachedValue.rsc, additionalHeaders: {} };
  }
}
async function generateResult(event, localizedPath, cachedValue, lastModified) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = Boolean(event.headers.rsc);
    if (isDataRequest) {
      const { body: appRouterBody, additionalHeaders: appHeaders } = getBodyForAppRouter(event, cachedValue);
      body = appRouterBody;
      additionalHeaders = appHeaders;
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified);
  return {
    type: "core",
    // Sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    // Also set the status code to the rewriteStatusCode if defined
    // This can happen in handleMiddleware in routingHandler.
    // `NextResponse.rewrite(url, { status: xxx})
    // The rewrite status code should take precedence over the cached one
    statusCode: event.rewriteStatusCode ?? cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER,
      ...additionalHeaders
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath ?? "/") || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const tags = getTagsFromValue(cachedData.value);
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: event.rewriteStatusCode ?? cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
