var Iv = Object.defineProperty;
var Ov = (e, t, n) => t in e ? Iv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var le = (e, t, n) => (Ov(e, typeof t != "symbol" ? t + "" : t, n), n);
import { effectScope as sl, ref as Q, markRaw as rr, toRaw as Yo, hasInjectionContext as Dv, inject as _t, getCurrentInstance as Hn, watch as Le, unref as W, reactive as jo, isRef as zt, isReactive as Wo, toRef as vo, nextTick as $n, computed as te, getCurrentScope as Pv, onScopeDispose as Av, toRefs as ys, defineComponent as pe, h as dr, onMounted as Ke, onUnmounted as ll, Fragment as Oe, shallowRef as cl, createVNode as z, Text as $v, openBlock as U, createElementBlock as X, createElementVNode as q, createBlock as de, resolveDynamicComponent as qo, withCtx as we, onBeforeUnmount as Zr, normalizeClass as be, renderSlot as Yn, shallowReactive as Nv, provide as An, watchEffect as Ct, pushScopeId as zo, popScopeId as Go, toDisplayString as ae, createCommentVNode as se, renderList as it, createTextVNode as Ge, normalizeStyle as Lv, withDirectives as Qd, vModelText as Rv, createStaticVNode as Mv, withModifiers as Ye, TransitionGroup as ul, Transition as ef, vShow as xv, Teleport as Bv, isVNode as Vv, resolveComponent as tf, useSlots as Uv, onBeforeMount as Fv, isReadonly as Hv, createApp as Yv } from "vue";
var Yt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function _r(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function jv(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else
    n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(r) {
    var o = Object.getOwnPropertyDescriptor(e, r);
    Object.defineProperty(n, r, o.get ? o : {
      enumerable: !0,
      get: function() {
        return e[r];
      }
    });
  }), n;
}
var nf = {};
function Pt(e, t) {
  typeof t == "boolean" && (t = { forever: t }), this._originalTimeouts = JSON.parse(JSON.stringify(e)), this._timeouts = e, this._options = t || {}, this._maxRetryTime = t && t.maxRetryTime || 1 / 0, this._fn = null, this._errors = [], this._attempts = 1, this._operationTimeout = null, this._operationTimeoutCb = null, this._timeout = null, this._operationStart = null, this._timer = null, this._options.forever && (this._cachedTimeouts = this._timeouts.slice(0));
}
var Wv = Pt;
Pt.prototype.reset = function() {
  this._attempts = 1, this._timeouts = this._originalTimeouts.slice(0);
};
Pt.prototype.stop = function() {
  this._timeout && clearTimeout(this._timeout), this._timer && clearTimeout(this._timer), this._timeouts = [], this._cachedTimeouts = null;
};
Pt.prototype.retry = function(e) {
  if (this._timeout && clearTimeout(this._timeout), !e)
    return !1;
  var t = (/* @__PURE__ */ new Date()).getTime();
  if (e && t - this._operationStart >= this._maxRetryTime)
    return this._errors.push(e), this._errors.unshift(new Error("RetryOperation timeout occurred")), !1;
  this._errors.push(e);
  var n = this._timeouts.shift();
  if (n === void 0)
    if (this._cachedTimeouts)
      this._errors.splice(0, this._errors.length - 1), n = this._cachedTimeouts.slice(-1);
    else
      return !1;
  var r = this;
  return this._timer = setTimeout(function() {
    r._attempts++, r._operationTimeoutCb && (r._timeout = setTimeout(function() {
      r._operationTimeoutCb(r._attempts);
    }, r._operationTimeout), r._options.unref && r._timeout.unref()), r._fn(r._attempts);
  }, n), this._options.unref && this._timer.unref(), !0;
};
Pt.prototype.attempt = function(e, t) {
  this._fn = e, t && (t.timeout && (this._operationTimeout = t.timeout), t.cb && (this._operationTimeoutCb = t.cb));
  var n = this;
  this._operationTimeoutCb && (this._timeout = setTimeout(function() {
    n._operationTimeoutCb();
  }, n._operationTimeout)), this._operationStart = (/* @__PURE__ */ new Date()).getTime(), this._fn(this._attempts);
};
Pt.prototype.try = function(e) {
  console.log("Using RetryOperation.try() is deprecated"), this.attempt(e);
};
Pt.prototype.start = function(e) {
  console.log("Using RetryOperation.start() is deprecated"), this.attempt(e);
};
Pt.prototype.start = Pt.prototype.try;
Pt.prototype.errors = function() {
  return this._errors;
};
Pt.prototype.attempts = function() {
  return this._attempts;
};
Pt.prototype.mainError = function() {
  if (this._errors.length === 0)
    return null;
  for (var e = {}, t = null, n = 0, r = 0; r < this._errors.length; r++) {
    var o = this._errors[r], a = o.message, i = (e[a] || 0) + 1;
    e[a] = i, i >= n && (t = o, n = i);
  }
  return t;
};
(function(e) {
  var t = Wv;
  e.operation = function(n) {
    var r = e.timeouts(n);
    return new t(r, {
      forever: n && (n.forever || n.retries === 1 / 0),
      unref: n && n.unref,
      maxRetryTime: n && n.maxRetryTime
    });
  }, e.timeouts = function(n) {
    if (n instanceof Array)
      return [].concat(n);
    var r = {
      retries: 10,
      factor: 2,
      minTimeout: 1 * 1e3,
      maxTimeout: 1 / 0,
      randomize: !1
    };
    for (var o in n)
      r[o] = n[o];
    if (r.minTimeout > r.maxTimeout)
      throw new Error("minTimeout is greater than maxTimeout");
    for (var a = [], i = 0; i < r.retries; i++)
      a.push(this.createTimeout(i, r));
    return n && n.forever && !a.length && a.push(this.createTimeout(i, r)), a.sort(function(l, s) {
      return l - s;
    }), a;
  }, e.createTimeout = function(n, r) {
    var o = r.randomize ? Math.random() + 1 : 1, a = Math.round(o * Math.max(r.minTimeout, 1) * Math.pow(r.factor, n));
    return a = Math.min(a, r.maxTimeout), a;
  }, e.wrap = function(n, r, o) {
    if (r instanceof Array && (o = r, r = null), !o) {
      o = [];
      for (var a in n)
        typeof n[a] == "function" && o.push(a);
    }
    for (var i = 0; i < o.length; i++) {
      var l = o[i], s = n[l];
      n[l] = (function(u) {
        var f = e.operation(r), d = Array.prototype.slice.call(arguments, 1), v = d.pop();
        d.push(function(p) {
          f.retry(p) || (p && (arguments[0] = f.mainError()), v.apply(this, arguments));
        }), f.attempt(function() {
          u.apply(n, d);
        });
      }).bind(n, s), n[l].options = r;
    }
  };
})(nf);
var qv = nf;
const zv = /* @__PURE__ */ _r(qv), Gv = Object.prototype.toString, Xv = (e) => Gv.call(e) === "[object Error]", Kv = /* @__PURE__ */ new Set([
  "network error",
  // Chrome
  "Failed to fetch",
  // Chrome
  "NetworkError when attempting to fetch resource.",
  // Firefox
  "The Internet connection appears to be offline.",
  // Safari 16
  "Load failed",
  // Safari 17+
  "Network request failed",
  // `cross-fetch`
  "fetch failed",
  // Undici (Node.js)
  "terminated"
  // Undici (Node.js)
]);
function Jv(e) {
  return e && Xv(e) && e.name === "TypeError" && typeof e.message == "string" ? e.message === "Load failed" ? e.stack === void 0 : Kv.has(e.message) : !1;
}
class Zv extends Error {
  constructor(t) {
    super(), t instanceof Error ? (this.originalError = t, { message: t } = t) : (this.originalError = new Error(t), this.originalError.stack = this.stack), this.name = "AbortError", this.message = t;
  }
}
const yc = (e, t, n) => {
  const r = n.retries - (t - 1);
  return e.attemptNumber = t, e.retriesLeft = r, e;
};
async function Qv(e, t) {
  return new Promise((n, r) => {
    t = {
      onFailedAttempt() {
      },
      retries: 10,
      shouldRetry: () => !0,
      ...t
    };
    const o = zv.operation(t), a = () => {
      var l;
      o.stop(), r((l = t.signal) == null ? void 0 : l.reason);
    };
    t.signal && !t.signal.aborted && t.signal.addEventListener("abort", a, { once: !0 });
    const i = () => {
      var l;
      (l = t.signal) == null || l.removeEventListener("abort", a), o.stop();
    };
    o.attempt(async (l) => {
      try {
        const s = await e(l);
        i(), n(s);
      } catch (s) {
        try {
          if (!(s instanceof Error))
            throw new TypeError(`Non-error was thrown: "${s}". You should only throw errors.`);
          if (s instanceof Zv)
            throw s.originalError;
          if (s instanceof TypeError && !Jv(s))
            throw s;
          if (yc(s, l, t), await t.shouldRetry(s) || (o.stop(), r(s)), await t.onFailedAttempt(s), !o.retry(s))
            throw o.mainError();
        } catch (c) {
          yc(c, l, t), i(), r(c);
        }
      }
    });
  });
}
var rf = !1;
function ha(e, t, n) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, n), n) : (e[t] = n, n);
}
function Bi(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
function eg() {
  return of().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function of() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const tg = typeof Proxy == "function", ng = "devtools-plugin:setup", rg = "plugin:settings:set";
let Tr, _s;
function og() {
  var e;
  return Tr !== void 0 || (typeof window < "u" && window.performance ? (Tr = !0, _s = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Tr = !0, _s = globalThis.perf_hooks.performance) : Tr = !1), Tr;
}
function ag() {
  return og() ? _s.now() : Date.now();
}
class ig {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const r = {};
    if (t.settings)
      for (const i in t.settings) {
        const l = t.settings[i];
        r[i] = l.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${t.id}`;
    let a = Object.assign({}, r);
    try {
      const i = localStorage.getItem(o), l = JSON.parse(i);
      Object.assign(a, l);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return a;
      },
      setSettings(i) {
        try {
          localStorage.setItem(o, JSON.stringify(i));
        } catch {
        }
        a = i;
      },
      now() {
        return ag();
      }
    }, n && n.on(rg, (i, l) => {
      i === this.plugin.id && this.fallbacks.setSettings(l);
    }), this.proxiedOn = new Proxy({}, {
      get: (i, l) => this.target ? this.target.on[l] : (...s) => {
        this.onQueue.push({
          method: l,
          args: s
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (i, l) => this.target ? this.target[l] : l === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(l) ? (...s) => (this.targetQueue.push({
        method: l,
        args: s,
        resolve: () => {
        }
      }), this.fallbacks[l](...s)) : (...s) => new Promise((c) => {
        this.targetQueue.push({
          method: l,
          args: s,
          resolve: c
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function ci(e, t) {
  const n = e, r = of(), o = eg(), a = tg && n.enableEarlyProxy;
  if (o && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a))
    o.emit(ng, e, t);
  else {
    const i = a ? new ig(n, o) : null;
    (r.__VUE_DEVTOOLS_PLUGINS__ = r.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: i
    }), i && t(i.proxiedTarget);
  }
}
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let po;
const ko = (e) => po = e, af = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function fr(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var qt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(qt || (qt = {}));
const ui = typeof window < "u", go = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && ui, _c = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function sg(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function dl(e, t, n) {
  const r = new XMLHttpRequest();
  r.open("GET", e), r.responseType = "blob", r.onload = function() {
    cf(r.response, t, n);
  }, r.onerror = function() {
    console.error("could not download file");
  }, r.send();
}
function sf(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function Ia(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const n = document.createEvent("MouseEvents");
    n.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(n);
  }
}
const Oa = typeof navigator == "object" ? navigator : { userAgent: "" }, lf = /Macintosh/.test(Oa.userAgent) && /AppleWebKit/.test(Oa.userAgent) && !/Safari/.test(Oa.userAgent), cf = ui ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !lf ? lg : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in Oa ? cg : (
      // Fallback to using FileReader and a popup
      ug
    )
  )
) : () => {
};
function lg(e, t = "download", n) {
  const r = document.createElement("a");
  r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin !== location.origin ? sf(r.href) ? dl(e, t, n) : (r.target = "_blank", Ia(r)) : Ia(r)) : (r.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(r.href);
  }, 4e4), setTimeout(function() {
    Ia(r);
  }, 0));
}
function cg(e, t = "download", n) {
  if (typeof e == "string")
    if (sf(e))
      dl(e, t, n);
    else {
      const r = document.createElement("a");
      r.href = e, r.target = "_blank", setTimeout(function() {
        Ia(r);
      });
    }
  else
    navigator.msSaveOrOpenBlob(sg(e, n), t);
}
function ug(e, t, n, r) {
  if (r = r || open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string")
    return dl(e, t, n);
  const o = e.type === "application/octet-stream", a = /constructor/i.test(String(_c.HTMLElement)) || "safari" in _c, i = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((i || o && a || lf) && typeof FileReader < "u") {
    const l = new FileReader();
    l.onloadend = function() {
      let s = l.result;
      if (typeof s != "string")
        throw r = null, new Error("Wrong reader.result type");
      s = i ? s : s.replace(/^data:[^;]*;/, "data:attachment/file;"), r ? r.location.href = s : location.assign(s), r = null;
    }, l.readAsDataURL(e);
  } else {
    const l = URL.createObjectURL(e);
    r ? r.location.assign(l) : location.href = l, r = null, setTimeout(function() {
      URL.revokeObjectURL(l);
    }, 4e4);
  }
}
function tt(e, t) {
  const n = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, t) : t === "error" ? console.error(n) : t === "warn" ? console.warn(n) : console.log(n);
}
function fl(e) {
  return "_a" in e && "install" in e;
}
function uf() {
  if (!("clipboard" in navigator))
    return tt("Your browser doesn't support the Clipboard API", "error"), !0;
}
function df(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (tt('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function dg(e) {
  if (!uf())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), tt("Global state copied to clipboard.");
    } catch (t) {
      if (df(t))
        return;
      tt("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function fg(e) {
  if (!uf())
    try {
      ff(e, JSON.parse(await navigator.clipboard.readText())), tt("Global state pasted from clipboard.");
    } catch (t) {
      if (df(t))
        return;
      tt("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function pg(e) {
  try {
    cf(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    tt("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let Qt;
function hg() {
  Qt || (Qt = document.createElement("input"), Qt.type = "file", Qt.accept = ".json");
  function e() {
    return new Promise((t, n) => {
      Qt.onchange = async () => {
        const r = Qt.files;
        if (!r)
          return t(null);
        const o = r.item(0);
        return t(o ? { text: await o.text(), file: o } : null);
      }, Qt.oncancel = () => t(null), Qt.onerror = n, Qt.click();
    });
  }
  return e;
}
async function mg(e) {
  try {
    const n = await hg()();
    if (!n)
      return;
    const { text: r, file: o } = n;
    ff(e, JSON.parse(r)), tt(`Global state imported from "${o.name}".`);
  } catch (t) {
    tt("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function ff(e, t) {
  for (const n in t) {
    const r = e.state.value[n];
    r ? Object.assign(r, t[n]) : e.state.value[n] = t[n];
  }
}
function Lt(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const pf = "🍍 Pinia (root)", bs = "_root";
function vg(e) {
  return fl(e) ? {
    id: bs,
    label: pf
  } : {
    id: e.$id,
    label: e.$id
  };
}
function gg(e) {
  if (fl(e)) {
    const n = Array.from(e._s.keys()), r = e._s;
    return {
      state: n.map((a) => ({
        editable: !0,
        key: a,
        value: e.state.value[a]
      })),
      getters: n.filter((a) => r.get(a)._getters).map((a) => {
        const i = r.get(a);
        return {
          editable: !1,
          key: a,
          value: i._getters.reduce((l, s) => (l[s] = i[s], l), {})
        };
      })
    };
  }
  const t = {
    state: Object.keys(e.$state).map((n) => ({
      editable: !0,
      key: n,
      value: e.$state[n]
    }))
  };
  return e._getters && e._getters.length && (t.getters = e._getters.map((n) => ({
    editable: !1,
    key: n,
    value: e[n]
  }))), e._customProperties.size && (t.customProperties = Array.from(e._customProperties).map((n) => ({
    editable: !0,
    key: n,
    value: e[n]
  }))), t;
}
function yg(e) {
  return e ? Array.isArray(e) ? e.reduce((t, n) => (t.keys.push(n.key), t.operations.push(n.type), t.oldValue[n.key] = n.oldValue, t.newValue[n.key] = n.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: Lt(e.type),
    key: Lt(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function _g(e) {
  switch (e) {
    case qt.direct:
      return "mutation";
    case qt.patchFunction:
      return "$patch";
    case qt.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let Lr = !0;
const Da = [], tr = "pinia:mutations", lt = "pinia", { assign: bg } = Object, Ua = (e) => "🍍 " + e;
function Eg(e, t) {
  ci({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: Da,
    app: e
  }, (n) => {
    typeof n.now != "function" && tt("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
      id: tr,
      label: "Pinia 🍍",
      color: 15064968
    }), n.addInspector({
      id: lt,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            dg(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await fg(t), n.sendInspectorTree(lt), n.sendInspectorState(lt);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            pg(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await mg(t), n.sendInspectorTree(lt), n.sendInspectorState(lt);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (r) => {
            const o = t._s.get(r);
            o ? typeof o.$reset != "function" ? tt(`Cannot reset "${r}" store because it doesn't have a "$reset" method implemented.`, "warn") : (o.$reset(), tt(`Store "${r}" reset.`)) : tt(`Cannot reset "${r}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((r, o) => {
      const a = r.componentInstance && r.componentInstance.proxy;
      if (a && a._pStores) {
        const i = r.componentInstance.proxy._pStores;
        Object.values(i).forEach((l) => {
          r.instanceData.state.push({
            type: Ua(l.$id),
            key: "state",
            editable: !0,
            value: l._isOptionsAPI ? {
              _custom: {
                value: Yo(l.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => l.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(l.$state).reduce((s, c) => (s[c] = l.$state[c], s), {})
            )
          }), l._getters && l._getters.length && r.instanceData.state.push({
            type: Ua(l.$id),
            key: "getters",
            editable: !1,
            value: l._getters.reduce((s, c) => {
              try {
                s[c] = l[c];
              } catch (u) {
                s[c] = u;
              }
              return s;
            }, {})
          });
        });
      }
    }), n.on.getInspectorTree((r) => {
      if (r.app === e && r.inspectorId === lt) {
        let o = [t];
        o = o.concat(Array.from(t._s.values())), r.rootNodes = (r.filter ? o.filter((a) => "$id" in a ? a.$id.toLowerCase().includes(r.filter.toLowerCase()) : pf.toLowerCase().includes(r.filter.toLowerCase())) : o).map(vg);
      }
    }), n.on.getInspectorState((r) => {
      if (r.app === e && r.inspectorId === lt) {
        const o = r.nodeId === bs ? t : t._s.get(r.nodeId);
        if (!o)
          return;
        o && (r.state = gg(o));
      }
    }), n.on.editInspectorState((r, o) => {
      if (r.app === e && r.inspectorId === lt) {
        const a = r.nodeId === bs ? t : t._s.get(r.nodeId);
        if (!a)
          return tt(`store "${r.nodeId}" not found`, "error");
        const { path: i } = r;
        fl(a) ? i.unshift("state") : (i.length !== 1 || !a._customProperties.has(i[0]) || i[0] in a.$state) && i.unshift("$state"), Lr = !1, r.set(a, i, r.state.value), Lr = !0;
      }
    }), n.on.editComponentState((r) => {
      if (r.type.startsWith("🍍")) {
        const o = r.type.replace(/^🍍\s*/, ""), a = t._s.get(o);
        if (!a)
          return tt(`store "${o}" not found`, "error");
        const { path: i } = r;
        if (i[0] !== "state")
          return tt(`Invalid path for store "${o}":
${i}
Only state can be modified.`);
        i[0] = "$state", Lr = !1, r.set(a, i, r.state.value), Lr = !0;
      }
    });
  });
}
function wg(e, t) {
  Da.includes(Ua(t.$id)) || Da.push(Ua(t.$id)), ci({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: Da,
    app: e,
    settings: {
      logStoreChanges: {
        label: "Notify about new/deleted stores",
        type: "boolean",
        defaultValue: !0
      }
      // useEmojis: {
      //   label: 'Use emojis in messages ⚡️',
      //   type: 'boolean',
      //   defaultValue: true,
      // },
    }
  }, (n) => {
    const r = typeof n.now == "function" ? n.now.bind(n) : Date.now;
    t.$onAction(({ after: i, onError: l, name: s, args: c }) => {
      const u = hf++;
      n.addTimelineEvent({
        layerId: tr,
        event: {
          time: r(),
          title: "🛫 " + s,
          subtitle: "start",
          data: {
            store: Lt(t.$id),
            action: Lt(s),
            args: c
          },
          groupId: u
        }
      }), i((f) => {
        kn = void 0, n.addTimelineEvent({
          layerId: tr,
          event: {
            time: r(),
            title: "🛬 " + s,
            subtitle: "end",
            data: {
              store: Lt(t.$id),
              action: Lt(s),
              args: c,
              result: f
            },
            groupId: u
          }
        });
      }), l((f) => {
        kn = void 0, n.addTimelineEvent({
          layerId: tr,
          event: {
            time: r(),
            logType: "error",
            title: "💥 " + s,
            subtitle: "end",
            data: {
              store: Lt(t.$id),
              action: Lt(s),
              args: c,
              error: f
            },
            groupId: u
          }
        });
      });
    }, !0), t._customProperties.forEach((i) => {
      Le(() => W(t[i]), (l, s) => {
        n.notifyComponentUpdate(), n.sendInspectorState(lt), Lr && n.addTimelineEvent({
          layerId: tr,
          event: {
            time: r(),
            title: "Change",
            subtitle: i,
            data: {
              newValue: l,
              oldValue: s
            },
            groupId: kn
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: i, type: l }, s) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState(lt), !Lr)
        return;
      const c = {
        time: r(),
        title: _g(l),
        data: bg({ store: Lt(t.$id) }, yg(i)),
        groupId: kn
      };
      l === qt.patchFunction ? c.subtitle = "⤵️" : l === qt.patchObject ? c.subtitle = "🧩" : i && !Array.isArray(i) && (c.subtitle = i.type), i && (c.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: i
        }
      }), n.addTimelineEvent({
        layerId: tr,
        event: c
      });
    }, { detached: !0, flush: "sync" });
    const o = t._hotUpdate;
    t._hotUpdate = rr((i) => {
      o(i), n.addTimelineEvent({
        layerId: tr,
        event: {
          time: r(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: Lt(t.$id),
            info: Lt("HMR update")
          }
        }
      }), n.notifyComponentUpdate(), n.sendInspectorTree(lt), n.sendInspectorState(lt);
    });
    const { $dispose: a } = t;
    t.$dispose = () => {
      a(), n.notifyComponentUpdate(), n.sendInspectorTree(lt), n.sendInspectorState(lt), n.getSettings().logStoreChanges && tt(`Disposed "${t.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree(lt), n.sendInspectorState(lt), n.getSettings().logStoreChanges && tt(`"${t.$id}" store installed 🆕`);
  });
}
let hf = 0, kn;
function bc(e, t, n) {
  const r = t.reduce((o, a) => (o[a] = Yo(e)[a], o), {});
  for (const o in r)
    e[o] = function() {
      const a = hf, i = n ? new Proxy(e, {
        get(...s) {
          return kn = a, Reflect.get(...s);
        },
        set(...s) {
          return kn = a, Reflect.set(...s);
        }
      }) : e;
      kn = a;
      const l = r[o].apply(i, arguments);
      return kn = void 0, l;
    };
}
function Cg({ app: e, store: t, options: n }) {
  if (t.$id.startsWith("__hot:"))
    return;
  t._isOptionsAPI = !!n.state, bc(t, Object.keys(n.actions), t._isOptionsAPI);
  const r = t._hotUpdate;
  Yo(t)._hotUpdate = function(o) {
    r.apply(this, arguments), bc(t, Object.keys(o._hmrPayload.actions), !!t._isOptionsAPI);
  }, wg(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    t
  );
}
function Tg() {
  const e = sl(!0), t = e.run(() => Q({}));
  let n = [], r = [];
  const o = rr({
    install(a) {
      ko(o), o._a = a, a.provide(af, o), a.config.globalProperties.$pinia = o, go && Eg(a, o), r.forEach((i) => n.push(i)), r = [];
    },
    use(a) {
      return !this._a && !rf ? r.push(a) : n.push(a), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return go && typeof Proxy < "u" && o.use(Cg), o;
}
function mf(e, t) {
  for (const n in t) {
    const r = t[n];
    if (!(n in e))
      continue;
    const o = e[n];
    fr(o) && fr(r) && !zt(r) && !Wo(r) ? e[n] = mf(o, r) : e[n] = r;
  }
  return e;
}
const vf = () => {
};
function Ec(e, t, n, r = vf) {
  e.push(t);
  const o = () => {
    const a = e.indexOf(t);
    a > -1 && (e.splice(a, 1), r());
  };
  return !n && Pv() && Av(o), o;
}
function Sr(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const Sg = (e) => e();
function Es(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((n, r) => e.set(r, n)), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const r = t[n], o = e[n];
    fr(o) && fr(r) && e.hasOwnProperty(n) && !zt(r) && !Wo(r) ? e[n] = Es(o, r) : e[n] = r;
  }
  return e;
}
const kg = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Ig(e) {
  return !fr(e) || !e.hasOwnProperty(kg);
}
const { assign: St } = Object;
function wc(e) {
  return !!(zt(e) && e.effect);
}
function Cc(e, t, n, r) {
  const { state: o, actions: a, getters: i } = t, l = n.state.value[e];
  let s;
  function c() {
    !l && (process.env.NODE_ENV === "production" || !r) && (n.state.value[e] = o ? o() : {});
    const u = process.env.NODE_ENV !== "production" && r ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      ys(Q(o ? o() : {}).value)
    ) : ys(n.state.value[e]);
    return St(u, a, Object.keys(i || {}).reduce((f, d) => (process.env.NODE_ENV !== "production" && d in u && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${d}" in store "${e}".`), f[d] = rr(te(() => {
      ko(n);
      const v = n._s.get(e);
      return i[d].call(v, v);
    })), f), {}));
  }
  return s = ws(e, c, t, n, r, !0), s;
}
function ws(e, t, n = {}, r, o, a) {
  let i;
  const l = St({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !r._e.active)
    throw new Error("Pinia destroyed");
  const s = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !rf && (s.onTrigger = (_) => {
    c ? v = _ : c == !1 && !b._hotUpdating && (Array.isArray(v) ? v.push(_) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let c, u, f = [], d = [], v;
  const p = r.state.value[e];
  !a && !p && (process.env.NODE_ENV === "production" || !o) && (r.state.value[e] = {});
  const g = Q({});
  let m;
  function h(_) {
    let S;
    c = u = !1, process.env.NODE_ENV !== "production" && (v = []), typeof _ == "function" ? (_(r.state.value[e]), S = {
      type: qt.patchFunction,
      storeId: e,
      events: v
    }) : (Es(r.state.value[e], _), S = {
      type: qt.patchObject,
      payload: _,
      storeId: e,
      events: v
    });
    const A = m = Symbol();
    $n().then(() => {
      m === A && (c = !0);
    }), u = !0, Sr(f, S, r.state.value[e]);
  }
  const y = a ? function() {
    const { state: S } = n, A = S ? S() : {};
    this.$patch((x) => {
      St(x, A);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : vf
  );
  function w() {
    i.stop(), f = [], d = [], r._s.delete(e);
  }
  function O(_, S) {
    return function() {
      ko(r);
      const A = Array.from(arguments), x = [], B = [];
      function N(L) {
        x.push(L);
      }
      function V(L) {
        B.push(L);
      }
      Sr(d, {
        args: A,
        name: _,
        store: b,
        after: N,
        onError: V
      });
      let G;
      try {
        G = S.apply(this && this.$id === e ? this : b, A);
      } catch (L) {
        throw Sr(B, L), L;
      }
      return G instanceof Promise ? G.then((L) => (Sr(x, L), L)).catch((L) => (Sr(B, L), Promise.reject(L))) : (Sr(x, G), G);
    };
  }
  const $ = /* @__PURE__ */ rr({
    actions: {},
    getters: {},
    state: [],
    hotState: g
  }), C = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: Ec.bind(null, d),
    $patch: h,
    $reset: y,
    $subscribe(_, S = {}) {
      const A = Ec(f, _, S.detached, () => x()), x = i.run(() => Le(() => r.state.value[e], (B) => {
        (S.flush === "sync" ? u : c) && _({
          storeId: e,
          type: qt.direct,
          events: v
        }, B);
      }, St({}, s, S)));
      return A;
    },
    $dispose: w
  }, b = jo(process.env.NODE_ENV !== "production" || go ? St(
    {
      _hmrPayload: $,
      _customProperties: rr(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    C
    // must be added later
    // setupStore
  ) : C);
  r._s.set(e, b);
  const k = (r._a && r._a.runWithContext || Sg)(() => r._e.run(() => (i = sl()).run(t)));
  for (const _ in k) {
    const S = k[_];
    if (zt(S) && !wc(S) || Wo(S))
      process.env.NODE_ENV !== "production" && o ? ha(g.value, _, vo(k, _)) : a || (p && Ig(S) && (zt(S) ? S.value = p[_] : Es(S, p[_])), r.state.value[e][_] = S), process.env.NODE_ENV !== "production" && $.state.push(_);
    else if (typeof S == "function") {
      const A = process.env.NODE_ENV !== "production" && o ? S : O(_, S);
      k[_] = A, process.env.NODE_ENV !== "production" && ($.actions[_] = S), l.actions[_] = S;
    } else
      process.env.NODE_ENV !== "production" && wc(S) && ($.getters[_] = a ? (
        // @ts-expect-error
        n.getters[_]
      ) : S, ui && (k._getters || // @ts-expect-error: same
      (k._getters = rr([]))).push(_));
  }
  if (St(b, k), St(Yo(b), k), Object.defineProperty(b, "$state", {
    get: () => process.env.NODE_ENV !== "production" && o ? g.value : r.state.value[e],
    set: (_) => {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error("cannot set hotState");
      h((S) => {
        St(S, _);
      });
    }
  }), process.env.NODE_ENV !== "production" && (b._hotUpdate = rr((_) => {
    b._hotUpdating = !0, _._hmrPayload.state.forEach((S) => {
      if (S in b.$state) {
        const A = _.$state[S], x = b.$state[S];
        typeof A == "object" && fr(A) && fr(x) ? mf(A, x) : _.$state[S] = x;
      }
      ha(b, S, vo(_.$state, S));
    }), Object.keys(b.$state).forEach((S) => {
      S in _.$state || Bi(b, S);
    }), c = !1, u = !1, r.state.value[e] = vo(_._hmrPayload, "hotState"), u = !0, $n().then(() => {
      c = !0;
    });
    for (const S in _._hmrPayload.actions) {
      const A = _[S];
      ha(b, S, O(S, A));
    }
    for (const S in _._hmrPayload.getters) {
      const A = _._hmrPayload.getters[S], x = a ? (
        // special handling of options api
        te(() => (ko(r), A.call(b, b)))
      ) : A;
      ha(b, S, x);
    }
    Object.keys(b._hmrPayload.getters).forEach((S) => {
      S in _._hmrPayload.getters || Bi(b, S);
    }), Object.keys(b._hmrPayload.actions).forEach((S) => {
      S in _._hmrPayload.actions || Bi(b, S);
    }), b._hmrPayload = _._hmrPayload, b._getters = _._getters, b._hotUpdating = !1;
  })), go) {
    const _ = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((S) => {
      Object.defineProperty(b, S, St({ value: b[S] }, _));
    });
  }
  return r._p.forEach((_) => {
    if (go) {
      const S = i.run(() => _({
        store: b,
        app: r._a,
        pinia: r,
        options: l
      }));
      Object.keys(S || {}).forEach((A) => b._customProperties.add(A)), St(b, S);
    } else
      St(b, i.run(() => _({
        store: b,
        app: r._a,
        pinia: r,
        options: l
      })));
  }), process.env.NODE_ENV !== "production" && b.$state && typeof b.$state == "object" && typeof b.$state.constructor == "function" && !b.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${b.$id}".`), p && a && n.hydrate && n.hydrate(b.$state, p), c = !0, u = !0, b;
}
function jn(e, t, n) {
  let r, o;
  const a = typeof t == "function";
  if (typeof e == "string")
    r = e, o = a ? n : t;
  else if (o = e, r = e.id, process.env.NODE_ENV !== "production" && typeof r != "string")
    throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
  function i(l, s) {
    const c = Dv();
    if (l = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && po && po._testing ? null : l) || (c ? _t(af, null) : null), l && ko(l), process.env.NODE_ENV !== "production" && !po)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    l = po, l._s.has(r) || (a ? ws(r, t, o, l) : Cc(r, o, l), process.env.NODE_ENV !== "production" && (i._pinia = l));
    const u = l._s.get(r);
    if (process.env.NODE_ENV !== "production" && s) {
      const f = "__hot:" + r, d = a ? ws(f, t, o, l, !0) : Cc(f, St({}, o), l, !0);
      s._hotUpdate(d), delete l.state.value[f], l._s.delete(f);
    }
    if (process.env.NODE_ENV !== "production" && ui) {
      const f = Hn();
      if (f && f.proxy && // avoid adding stores that are just built for hot module replacement
      !s) {
        const d = f.proxy, v = "_pStores" in d ? d._pStores : d._pStores = {};
        v[r] = u;
      }
    }
    return u;
  }
  return i.$id = r, i;
}
function Io(e) {
  {
    e = Yo(e);
    const t = {};
    for (const n in e) {
      const r = e[n];
      (zt(r) || Wo(r)) && (t[n] = // ---
      vo(e, n));
    }
    return t;
  }
}
var gf = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(Yt, function() {
    var n = 1e3, r = 6e4, o = 36e5, a = "millisecond", i = "second", l = "minute", s = "hour", c = "day", u = "week", f = "month", d = "quarter", v = "year", p = "date", g = "Invalid Date", m = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, h = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, y = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(B) {
      var N = ["th", "st", "nd", "rd"], V = B % 100;
      return "[" + B + (N[(V - 20) % 10] || N[V] || N[0]) + "]";
    } }, w = function(B, N, V) {
      var G = String(B);
      return !G || G.length >= N ? B : "" + Array(N + 1 - G.length).join(V) + B;
    }, O = { s: w, z: function(B) {
      var N = -B.utcOffset(), V = Math.abs(N), G = Math.floor(V / 60), L = V % 60;
      return (N <= 0 ? "+" : "-") + w(G, 2, "0") + ":" + w(L, 2, "0");
    }, m: function B(N, V) {
      if (N.date() < V.date())
        return -B(V, N);
      var G = 12 * (V.year() - N.year()) + (V.month() - N.month()), L = N.clone().add(G, f), F = V - L < 0, M = N.clone().add(G + (F ? -1 : 1), f);
      return +(-(G + (V - L) / (F ? L - M : M - L)) || 0);
    }, a: function(B) {
      return B < 0 ? Math.ceil(B) || 0 : Math.floor(B);
    }, p: function(B) {
      return { M: f, y: v, w: u, d: c, D: p, h: s, m: l, s: i, ms: a, Q: d }[B] || String(B || "").toLowerCase().replace(/s$/, "");
    }, u: function(B) {
      return B === void 0;
    } }, $ = "en", C = {};
    C[$] = y;
    var b = "$isDayjsObject", E = function(B) {
      return B instanceof A || !(!B || !B[b]);
    }, k = function B(N, V, G) {
      var L;
      if (!N)
        return $;
      if (typeof N == "string") {
        var F = N.toLowerCase();
        C[F] && (L = F), V && (C[F] = V, L = F);
        var M = N.split("-");
        if (!L && M.length > 1)
          return B(M[0]);
      } else {
        var K = N.name;
        C[K] = N, L = K;
      }
      return !G && L && ($ = L), L || !G && $;
    }, _ = function(B, N) {
      if (E(B))
        return B.clone();
      var V = typeof N == "object" ? N : {};
      return V.date = B, V.args = arguments, new A(V);
    }, S = O;
    S.l = k, S.i = E, S.w = function(B, N) {
      return _(B, { locale: N.$L, utc: N.$u, x: N.$x, $offset: N.$offset });
    };
    var A = function() {
      function B(V) {
        this.$L = k(V.locale, null, !0), this.parse(V), this.$x = this.$x || V.x || {}, this[b] = !0;
      }
      var N = B.prototype;
      return N.parse = function(V) {
        this.$d = function(G) {
          var L = G.date, F = G.utc;
          if (L === null)
            return /* @__PURE__ */ new Date(NaN);
          if (S.u(L))
            return /* @__PURE__ */ new Date();
          if (L instanceof Date)
            return new Date(L);
          if (typeof L == "string" && !/Z$/i.test(L)) {
            var M = L.match(m);
            if (M) {
              var K = M[2] - 1 || 0, re = (M[7] || "0").substring(0, 3);
              return F ? new Date(Date.UTC(M[1], K, M[3] || 1, M[4] || 0, M[5] || 0, M[6] || 0, re)) : new Date(M[1], K, M[3] || 1, M[4] || 0, M[5] || 0, M[6] || 0, re);
            }
          }
          return new Date(L);
        }(V), this.init();
      }, N.init = function() {
        var V = this.$d;
        this.$y = V.getFullYear(), this.$M = V.getMonth(), this.$D = V.getDate(), this.$W = V.getDay(), this.$H = V.getHours(), this.$m = V.getMinutes(), this.$s = V.getSeconds(), this.$ms = V.getMilliseconds();
      }, N.$utils = function() {
        return S;
      }, N.isValid = function() {
        return this.$d.toString() !== g;
      }, N.isSame = function(V, G) {
        var L = _(V);
        return this.startOf(G) <= L && L <= this.endOf(G);
      }, N.isAfter = function(V, G) {
        return _(V) < this.startOf(G);
      }, N.isBefore = function(V, G) {
        return this.endOf(G) < _(V);
      }, N.$g = function(V, G, L) {
        return S.u(V) ? this[G] : this.set(L, V);
      }, N.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, N.valueOf = function() {
        return this.$d.getTime();
      }, N.startOf = function(V, G) {
        var L = this, F = !!S.u(G) || G, M = S.p(V), K = function(T, D) {
          var R = S.w(L.$u ? Date.UTC(L.$y, D, T) : new Date(L.$y, D, T), L);
          return F ? R : R.endOf(c);
        }, re = function(T, D) {
          return S.w(L.toDate()[T].apply(L.toDate("s"), (F ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(D)), L);
        }, fe = this.$W, me = this.$M, Se = this.$D, ne = "set" + (this.$u ? "UTC" : "");
        switch (M) {
          case v:
            return F ? K(1, 0) : K(31, 11);
          case f:
            return F ? K(1, me) : K(0, me + 1);
          case u:
            var j = this.$locale().weekStart || 0, Y = (fe < j ? fe + 7 : fe) - j;
            return K(F ? Se - Y : Se + (6 - Y), me);
          case c:
          case p:
            return re(ne + "Hours", 0);
          case s:
            return re(ne + "Minutes", 1);
          case l:
            return re(ne + "Seconds", 2);
          case i:
            return re(ne + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, N.endOf = function(V) {
        return this.startOf(V, !1);
      }, N.$set = function(V, G) {
        var L, F = S.p(V), M = "set" + (this.$u ? "UTC" : ""), K = (L = {}, L[c] = M + "Date", L[p] = M + "Date", L[f] = M + "Month", L[v] = M + "FullYear", L[s] = M + "Hours", L[l] = M + "Minutes", L[i] = M + "Seconds", L[a] = M + "Milliseconds", L)[F], re = F === c ? this.$D + (G - this.$W) : G;
        if (F === f || F === v) {
          var fe = this.clone().set(p, 1);
          fe.$d[K](re), fe.init(), this.$d = fe.set(p, Math.min(this.$D, fe.daysInMonth())).$d;
        } else
          K && this.$d[K](re);
        return this.init(), this;
      }, N.set = function(V, G) {
        return this.clone().$set(V, G);
      }, N.get = function(V) {
        return this[S.p(V)]();
      }, N.add = function(V, G) {
        var L, F = this;
        V = Number(V);
        var M = S.p(G), K = function(me) {
          var Se = _(F);
          return S.w(Se.date(Se.date() + Math.round(me * V)), F);
        };
        if (M === f)
          return this.set(f, this.$M + V);
        if (M === v)
          return this.set(v, this.$y + V);
        if (M === c)
          return K(1);
        if (M === u)
          return K(7);
        var re = (L = {}, L[l] = r, L[s] = o, L[i] = n, L)[M] || 1, fe = this.$d.getTime() + V * re;
        return S.w(fe, this);
      }, N.subtract = function(V, G) {
        return this.add(-1 * V, G);
      }, N.format = function(V) {
        var G = this, L = this.$locale();
        if (!this.isValid())
          return L.invalidDate || g;
        var F = V || "YYYY-MM-DDTHH:mm:ssZ", M = S.z(this), K = this.$H, re = this.$m, fe = this.$M, me = L.weekdays, Se = L.months, ne = L.meridiem, j = function(D, R, J, I) {
          return D && (D[R] || D(G, F)) || J[R].slice(0, I);
        }, Y = function(D) {
          return S.s(K % 12 || 12, D, "0");
        }, T = ne || function(D, R, J) {
          var I = D < 12 ? "AM" : "PM";
          return J ? I.toLowerCase() : I;
        };
        return F.replace(h, function(D, R) {
          return R || function(J) {
            switch (J) {
              case "YY":
                return String(G.$y).slice(-2);
              case "YYYY":
                return S.s(G.$y, 4, "0");
              case "M":
                return fe + 1;
              case "MM":
                return S.s(fe + 1, 2, "0");
              case "MMM":
                return j(L.monthsShort, fe, Se, 3);
              case "MMMM":
                return j(Se, fe);
              case "D":
                return G.$D;
              case "DD":
                return S.s(G.$D, 2, "0");
              case "d":
                return String(G.$W);
              case "dd":
                return j(L.weekdaysMin, G.$W, me, 2);
              case "ddd":
                return j(L.weekdaysShort, G.$W, me, 3);
              case "dddd":
                return me[G.$W];
              case "H":
                return String(K);
              case "HH":
                return S.s(K, 2, "0");
              case "h":
                return Y(1);
              case "hh":
                return Y(2);
              case "a":
                return T(K, re, !0);
              case "A":
                return T(K, re, !1);
              case "m":
                return String(re);
              case "mm":
                return S.s(re, 2, "0");
              case "s":
                return String(G.$s);
              case "ss":
                return S.s(G.$s, 2, "0");
              case "SSS":
                return S.s(G.$ms, 3, "0");
              case "Z":
                return M;
            }
            return null;
          }(D) || M.replace(":", "");
        });
      }, N.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, N.diff = function(V, G, L) {
        var F, M = this, K = S.p(G), re = _(V), fe = (re.utcOffset() - this.utcOffset()) * r, me = this - re, Se = function() {
          return S.m(M, re);
        };
        switch (K) {
          case v:
            F = Se() / 12;
            break;
          case f:
            F = Se();
            break;
          case d:
            F = Se() / 3;
            break;
          case u:
            F = (me - fe) / 6048e5;
            break;
          case c:
            F = (me - fe) / 864e5;
            break;
          case s:
            F = me / o;
            break;
          case l:
            F = me / r;
            break;
          case i:
            F = me / n;
            break;
          default:
            F = me;
        }
        return L ? F : S.a(F);
      }, N.daysInMonth = function() {
        return this.endOf(f).$D;
      }, N.$locale = function() {
        return C[this.$L];
      }, N.locale = function(V, G) {
        if (!V)
          return this.$L;
        var L = this.clone(), F = k(V, G, !0);
        return F && (L.$L = F), L;
      }, N.clone = function() {
        return S.w(this.$d, this);
      }, N.toDate = function() {
        return new Date(this.valueOf());
      }, N.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, N.toISOString = function() {
        return this.$d.toISOString();
      }, N.toString = function() {
        return this.$d.toUTCString();
      }, B;
    }(), x = A.prototype;
    return _.prototype = x, [["$ms", a], ["$s", i], ["$m", l], ["$H", s], ["$W", c], ["$M", f], ["$y", v], ["$D", p]].forEach(function(B) {
      x[B[1]] = function(N) {
        return this.$g(N, B[0], B[1]);
      };
    }), _.extend = function(B, N) {
      return B.$i || (B(N, A, _), B.$i = !0), _;
    }, _.locale = k, _.isDayjs = E, _.unix = function(B) {
      return _(1e3 * B);
    }, _.en = C[$], _.Ls = C, _.p = {}, _;
  });
})(gf);
var Og = gf.exports;
const ue = /* @__PURE__ */ _r(Og);
var yf = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(Yt, function() {
    var n = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, r = {};
    return function(o, a, i) {
      var l, s = function(d, v, p) {
        p === void 0 && (p = {});
        var g = new Date(d), m = function(h, y) {
          y === void 0 && (y = {});
          var w = y.timeZoneName || "short", O = h + "|" + w, $ = r[O];
          return $ || ($ = new Intl.DateTimeFormat("en-US", { hour12: !1, timeZone: h, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: w }), r[O] = $), $;
        }(v, p);
        return m.formatToParts(g);
      }, c = function(d, v) {
        for (var p = s(d, v), g = [], m = 0; m < p.length; m += 1) {
          var h = p[m], y = h.type, w = h.value, O = n[y];
          O >= 0 && (g[O] = parseInt(w, 10));
        }
        var $ = g[3], C = $ === 24 ? 0 : $, b = g[0] + "-" + g[1] + "-" + g[2] + " " + C + ":" + g[4] + ":" + g[5] + ":000", E = +d;
        return (i.utc(b).valueOf() - (E -= E % 1e3)) / 6e4;
      }, u = a.prototype;
      u.tz = function(d, v) {
        d === void 0 && (d = l);
        var p = this.utcOffset(), g = this.toDate(), m = g.toLocaleString("en-US", { timeZone: d }), h = Math.round((g - new Date(m)) / 1e3 / 60), y = i(m, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(g.getTimezoneOffset() / 15) - h, !0);
        if (v) {
          var w = y.utcOffset();
          y = y.add(p - w, "minute");
        }
        return y.$x.$timezone = d, y;
      }, u.offsetName = function(d) {
        var v = this.$x.$timezone || i.tz.guess(), p = s(this.valueOf(), v, { timeZoneName: d }).find(function(g) {
          return g.type.toLowerCase() === "timezonename";
        });
        return p && p.value;
      };
      var f = u.startOf;
      u.startOf = function(d, v) {
        if (!this.$x || !this.$x.$timezone)
          return f.call(this, d, v);
        var p = i(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
        return f.call(p, d, v).tz(this.$x.$timezone, !0);
      }, i.tz = function(d, v, p) {
        var g = p && v, m = p || v || l, h = c(+i(), m);
        if (typeof d != "string")
          return i(d).tz(m);
        var y = function(C, b, E) {
          var k = C - 60 * b * 1e3, _ = c(k, E);
          if (b === _)
            return [k, b];
          var S = c(k -= 60 * (_ - b) * 1e3, E);
          return _ === S ? [k, _] : [C - 60 * Math.min(_, S) * 1e3, Math.max(_, S)];
        }(i.utc(d, g).valueOf(), h, m), w = y[0], O = y[1], $ = i(w).utcOffset(O);
        return $.$x.$timezone = m, $;
      }, i.tz.guess = function() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      }, i.tz.setDefault = function(d) {
        l = d;
      };
    };
  });
})(yf);
var Dg = yf.exports;
const Pg = /* @__PURE__ */ _r(Dg);
var _f = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(Yt, function() {
    var n = "minute", r = /[+-]\d\d(?::?\d\d)?/g, o = /([+-]|\d\d)/g;
    return function(a, i, l) {
      var s = i.prototype;
      l.utc = function(g) {
        var m = { date: g, utc: !0, args: arguments };
        return new i(m);
      }, s.utc = function(g) {
        var m = l(this.toDate(), { locale: this.$L, utc: !0 });
        return g ? m.add(this.utcOffset(), n) : m;
      }, s.local = function() {
        return l(this.toDate(), { locale: this.$L, utc: !1 });
      };
      var c = s.parse;
      s.parse = function(g) {
        g.utc && (this.$u = !0), this.$utils().u(g.$offset) || (this.$offset = g.$offset), c.call(this, g);
      };
      var u = s.init;
      s.init = function() {
        if (this.$u) {
          var g = this.$d;
          this.$y = g.getUTCFullYear(), this.$M = g.getUTCMonth(), this.$D = g.getUTCDate(), this.$W = g.getUTCDay(), this.$H = g.getUTCHours(), this.$m = g.getUTCMinutes(), this.$s = g.getUTCSeconds(), this.$ms = g.getUTCMilliseconds();
        } else
          u.call(this);
      };
      var f = s.utcOffset;
      s.utcOffset = function(g, m) {
        var h = this.$utils().u;
        if (h(g))
          return this.$u ? 0 : h(this.$offset) ? f.call(this) : this.$offset;
        if (typeof g == "string" && (g = function($) {
          $ === void 0 && ($ = "");
          var C = $.match(r);
          if (!C)
            return null;
          var b = ("" + C[0]).match(o) || ["-", 0, 0], E = b[0], k = 60 * +b[1] + +b[2];
          return k === 0 ? 0 : E === "+" ? k : -k;
        }(g), g === null))
          return this;
        var y = Math.abs(g) <= 16 ? 60 * g : g, w = this;
        if (m)
          return w.$offset = y, w.$u = g === 0, w;
        if (g !== 0) {
          var O = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          (w = this.local().add(y + O, n)).$offset = y, w.$x.$localOffset = O;
        } else
          w = this.utc();
        return w;
      };
      var d = s.format;
      s.format = function(g) {
        var m = g || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
        return d.call(this, m);
      }, s.valueOf = function() {
        var g = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
        return this.$d.valueOf() - 6e4 * g;
      }, s.isUTC = function() {
        return !!this.$u;
      }, s.toISOString = function() {
        return this.toDate().toISOString();
      }, s.toString = function() {
        return this.toDate().toUTCString();
      };
      var v = s.toDate;
      s.toDate = function(g) {
        return g === "s" && this.$offset ? l(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : v.call(this);
      };
      var p = s.diff;
      s.diff = function(g, m, h) {
        if (g && this.$u === g.$u)
          return p.call(this, g, m, h);
        var y = this.local(), w = l(g).local();
        return p.call(y, w, m, h);
      };
    };
  });
})(_f);
var Ag = _f.exports;
const $g = /* @__PURE__ */ _r(Ag);
/*!
  * shared v9.10.2
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
const xt = typeof window < "u";
let wt, pr;
if (process.env.NODE_ENV !== "production") {
  const e = xt && window.performance;
  e && e.mark && e.measure && e.clearMarks && // @ts-ignore browser compat
  e.clearMeasures && (wt = (t) => {
    e.mark(t);
  }, pr = (t, n, r) => {
    e.measure(t, n, r), e.clearMarks(n), e.clearMarks(r);
  });
}
const Ng = /\{([0-9a-zA-Z]+)\}/g;
function pl(e, ...t) {
  return t.length === 1 && Te(t[0]) && (t = t[0]), (!t || !t.hasOwnProperty) && (t = {}), e.replace(Ng, (n, r) => t.hasOwnProperty(r) ? t[r] : "");
}
const Kt = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), Lg = (e, t, n) => Rg({ l: e, k: t, s: n }), Rg = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), rt = (e) => typeof e == "number" && isFinite(e), Mg = (e) => Ef(e) === "[object Date]", Fa = (e) => Ef(e) === "[object RegExp]", di = (e) => Ce(e) && Object.keys(e).length === 0, ut = Object.assign;
let Tc;
const hl = () => Tc || (Tc = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Sc(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const xg = Object.prototype.hasOwnProperty;
function Ha(e, t) {
  return xg.call(e, t);
}
const Xe = Array.isArray, xe = (e) => typeof e == "function", ce = (e) => typeof e == "string", Be = (e) => typeof e == "boolean", Te = (e) => e !== null && typeof e == "object", Bg = (e) => Te(e) && xe(e.then) && xe(e.catch), bf = Object.prototype.toString, Ef = (e) => bf.call(e), Ce = (e) => {
  if (!Te(e))
    return !1;
  const t = Object.getPrototypeOf(e);
  return t === null || t.constructor === Object;
}, Vg = (e) => e == null ? "" : Xe(e) || Ce(e) && e.toString === bf ? JSON.stringify(e, null, 2) : String(e);
function Ug(e, t = "") {
  return e.reduce((n, r, o) => o === 0 ? n + r : n + t + r, "");
}
const kc = 2;
function Fg(e, t = 0, n = e.length) {
  const r = e.split(/\r?\n/);
  let o = 0;
  const a = [];
  for (let i = 0; i < r.length; i++)
    if (o += r[i].length + 1, o >= t) {
      for (let l = i - kc; l <= i + kc || n > o; l++) {
        if (l < 0 || l >= r.length)
          continue;
        const s = l + 1;
        a.push(`${s}${" ".repeat(3 - String(s).length)}|  ${r[l]}`);
        const c = r[l].length;
        if (l === i) {
          const u = t - (o - c) + 1, f = Math.max(1, n > o ? c - u : n - t);
          a.push("   |  " + " ".repeat(u) + "^".repeat(f));
        } else if (l > i) {
          if (n > o) {
            const u = Math.max(Math.min(n - o, c), 1);
            a.push("   |  " + "^".repeat(u));
          }
          o += c + 1;
        }
      }
      break;
    }
  return a.join(`
`);
}
function ml(e) {
  let t = e;
  return () => ++t;
}
function Jt(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const Ic = {};
function wf(e) {
  Ic[e] || (Ic[e] = !0, Jt(e));
}
function Cf() {
  const e = /* @__PURE__ */ new Map();
  return {
    events: e,
    on(n, r) {
      const o = e.get(n);
      o && o.push(r) || e.set(n, [r]);
    },
    off(n, r) {
      const o = e.get(n);
      o && o.splice(o.indexOf(r) >>> 0, 1);
    },
    emit(n, r) {
      (e.get(n) || []).slice().map((o) => o(r)), (e.get("*") || []).slice().map((o) => o(n, r));
    }
  };
}
const ma = (e) => !Te(e) || Xe(e);
function Pa(e, t) {
  if (ma(e) || ma(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: r, des: o } = n.pop();
    Object.keys(r).forEach((a) => {
      ma(r[a]) || ma(o[a]) ? o[a] = r[a] : n.push({ src: r[a], des: o[a] });
    });
  }
}
/*!
  * message-compiler v9.10.2
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
function Hg(e, t, n) {
  return { line: e, column: t, offset: n };
}
function Cs(e, t, n) {
  const r = { start: e, end: t };
  return n != null && (r.source = n), r;
}
const Yg = /\{([0-9a-zA-Z]+)\}/g;
function jg(e, ...t) {
  return t.length === 1 && Wg(t[0]) && (t = t[0]), (!t || !t.hasOwnProperty) && (t = {}), e.replace(Yg, (n, r) => t.hasOwnProperty(r) ? t[r] : "");
}
const Tf = Object.assign, Oc = (e) => typeof e == "string", Wg = (e) => e !== null && typeof e == "object";
function Sf(e, t = "") {
  return e.reduce((n, r, o) => o === 0 ? n + r : n + t + r, "");
}
const he = {
  // tokenizer error codes
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  // parser error codes
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  // generator error codes
  UNHANDLED_CODEGEN_NODE_TYPE: 15,
  // minifier error codes
  UNHANDLED_MINIFIER_NODE_TYPE: 16,
  // Special value for higher-order compilers to pick up the last code
  // to avoid collision of error codes. This should always be kept as the last
  // item.
  __EXTEND_POINT__: 17
}, qg = {
  // tokenizer error messages
  [he.EXPECTED_TOKEN]: "Expected token: '{0}'",
  [he.INVALID_TOKEN_IN_PLACEHOLDER]: "Invalid token in placeholder: '{0}'",
  [he.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: "Unterminated single quote in placeholder",
  [he.UNKNOWN_ESCAPE_SEQUENCE]: "Unknown escape sequence: \\{0}",
  [he.INVALID_UNICODE_ESCAPE_SEQUENCE]: "Invalid unicode escape sequence: {0}",
  [he.UNBALANCED_CLOSING_BRACE]: "Unbalanced closing brace",
  [he.UNTERMINATED_CLOSING_BRACE]: "Unterminated closing brace",
  [he.EMPTY_PLACEHOLDER]: "Empty placeholder",
  [he.NOT_ALLOW_NEST_PLACEHOLDER]: "Not allowed nest placeholder",
  [he.INVALID_LINKED_FORMAT]: "Invalid linked format",
  // parser error messages
  [he.MUST_HAVE_MESSAGES_IN_PLURAL]: "Plural must have messages",
  [he.UNEXPECTED_EMPTY_LINKED_MODIFIER]: "Unexpected empty linked modifier",
  [he.UNEXPECTED_EMPTY_LINKED_KEY]: "Unexpected empty linked key",
  [he.UNEXPECTED_LEXICAL_ANALYSIS]: "Unexpected lexical analysis in token: '{0}'",
  // generator error messages
  [he.UNHANDLED_CODEGEN_NODE_TYPE]: "unhandled codegen node type: '{0}'",
  // minimizer error messages
  [he.UNHANDLED_MINIFIER_NODE_TYPE]: "unhandled mimifier node type: '{0}'"
};
function Qr(e, t, n = {}) {
  const { domain: r, messages: o, args: a } = n, i = jg((o || qg)[e] || "", ...a || []), l = new SyntaxError(String(i));
  return l.code = e, t && (l.location = t), l.domain = r, l;
}
function zg(e) {
  throw e;
}
const Gg = /<\/?[\w\s="/.':;#-\/]+>/, Xg = (e) => Gg.test(e), en = " ", Kg = "\r", ft = `
`, Jg = "\u2028", Zg = "\u2029";
function Qg(e) {
  const t = e;
  let n = 0, r = 1, o = 1, a = 0;
  const i = (b) => t[b] === Kg && t[b + 1] === ft, l = (b) => t[b] === ft, s = (b) => t[b] === Zg, c = (b) => t[b] === Jg, u = (b) => i(b) || l(b) || s(b) || c(b), f = () => n, d = () => r, v = () => o, p = () => a, g = (b) => i(b) || s(b) || c(b) ? ft : t[b], m = () => g(n), h = () => g(n + a);
  function y() {
    return a = 0, u(n) && (r++, o = 0), i(n) && n++, n++, o++, t[n];
  }
  function w() {
    return i(n + a) && a++, a++, t[n + a];
  }
  function O() {
    n = 0, r = 1, o = 1, a = 0;
  }
  function $(b = 0) {
    a = b;
  }
  function C() {
    const b = n + a;
    for (; b !== n; )
      y();
    a = 0;
  }
  return {
    index: f,
    line: d,
    column: v,
    peekOffset: p,
    charAt: g,
    currentChar: m,
    currentPeek: h,
    next: y,
    peek: w,
    reset: O,
    resetPeek: $,
    skipToPeek: C
  };
}
const En = void 0, ey = ".", Dc = "'", ty = "tokenizer";
function ny(e, t = {}) {
  const n = t.location !== !1, r = Qg(e), o = () => r.index(), a = () => Hg(r.line(), r.column(), r.index()), i = a(), l = o(), s = {
    currentType: 14,
    offset: l,
    startLoc: i,
    endLoc: i,
    lastType: 14,
    lastOffset: l,
    lastStartLoc: i,
    lastEndLoc: i,
    braceNest: 0,
    inLinked: !1,
    text: ""
  }, c = () => s, { onError: u } = t;
  function f(I, P, H, ...ee) {
    const ie = c();
    if (P.column += H, P.offset += H, u) {
      const ve = n ? Cs(ie.startLoc, P) : null, Re = Qr(I, ve, {
        domain: ty,
        args: ee
      });
      u(Re);
    }
  }
  function d(I, P, H) {
    I.endLoc = a(), I.currentType = P;
    const ee = { type: P };
    return n && (ee.loc = Cs(I.startLoc, I.endLoc)), H != null && (ee.value = H), ee;
  }
  const v = (I) => d(
    I,
    14
    /* TokenTypes.EOF */
  );
  function p(I, P) {
    return I.currentChar() === P ? (I.next(), P) : (f(he.EXPECTED_TOKEN, a(), 0, P), "");
  }
  function g(I) {
    let P = "";
    for (; I.currentPeek() === en || I.currentPeek() === ft; )
      P += I.currentPeek(), I.peek();
    return P;
  }
  function m(I) {
    const P = g(I);
    return I.skipToPeek(), P;
  }
  function h(I) {
    if (I === En)
      return !1;
    const P = I.charCodeAt(0);
    return P >= 97 && P <= 122 || // a-z
    P >= 65 && P <= 90 || // A-Z
    P === 95;
  }
  function y(I) {
    if (I === En)
      return !1;
    const P = I.charCodeAt(0);
    return P >= 48 && P <= 57;
  }
  function w(I, P) {
    const { currentType: H } = P;
    if (H !== 2)
      return !1;
    g(I);
    const ee = h(I.currentPeek());
    return I.resetPeek(), ee;
  }
  function O(I, P) {
    const { currentType: H } = P;
    if (H !== 2)
      return !1;
    g(I);
    const ee = I.currentPeek() === "-" ? I.peek() : I.currentPeek(), ie = y(ee);
    return I.resetPeek(), ie;
  }
  function $(I, P) {
    const { currentType: H } = P;
    if (H !== 2)
      return !1;
    g(I);
    const ee = I.currentPeek() === Dc;
    return I.resetPeek(), ee;
  }
  function C(I, P) {
    const { currentType: H } = P;
    if (H !== 8)
      return !1;
    g(I);
    const ee = I.currentPeek() === ".";
    return I.resetPeek(), ee;
  }
  function b(I, P) {
    const { currentType: H } = P;
    if (H !== 9)
      return !1;
    g(I);
    const ee = h(I.currentPeek());
    return I.resetPeek(), ee;
  }
  function E(I, P) {
    const { currentType: H } = P;
    if (!(H === 8 || H === 12))
      return !1;
    g(I);
    const ee = I.currentPeek() === ":";
    return I.resetPeek(), ee;
  }
  function k(I, P) {
    const { currentType: H } = P;
    if (H !== 10)
      return !1;
    const ee = () => {
      const ve = I.currentPeek();
      return ve === "{" ? h(I.peek()) : ve === "@" || ve === "%" || ve === "|" || ve === ":" || ve === "." || ve === en || !ve ? !1 : ve === ft ? (I.peek(), ee()) : h(ve);
    }, ie = ee();
    return I.resetPeek(), ie;
  }
  function _(I) {
    g(I);
    const P = I.currentPeek() === "|";
    return I.resetPeek(), P;
  }
  function S(I) {
    const P = g(I), H = I.currentPeek() === "%" && I.peek() === "{";
    return I.resetPeek(), {
      isModulo: H,
      hasSpace: P.length > 0
    };
  }
  function A(I, P = !0) {
    const H = (ie = !1, ve = "", Re = !1) => {
      const Me = I.currentPeek();
      return Me === "{" ? ve === "%" ? !1 : ie : Me === "@" || !Me ? ve === "%" ? !0 : ie : Me === "%" ? (I.peek(), H(ie, "%", !0)) : Me === "|" ? ve === "%" || Re ? !0 : !(ve === en || ve === ft) : Me === en ? (I.peek(), H(!0, en, Re)) : Me === ft ? (I.peek(), H(!0, ft, Re)) : !0;
    }, ee = H();
    return P && I.resetPeek(), ee;
  }
  function x(I, P) {
    const H = I.currentChar();
    return H === En ? En : P(H) ? (I.next(), H) : null;
  }
  function B(I) {
    return x(I, (H) => {
      const ee = H.charCodeAt(0);
      return ee >= 97 && ee <= 122 || // a-z
      ee >= 65 && ee <= 90 || // A-Z
      ee >= 48 && ee <= 57 || // 0-9
      ee === 95 || // _
      ee === 36;
    });
  }
  function N(I) {
    return x(I, (H) => {
      const ee = H.charCodeAt(0);
      return ee >= 48 && ee <= 57;
    });
  }
  function V(I) {
    return x(I, (H) => {
      const ee = H.charCodeAt(0);
      return ee >= 48 && ee <= 57 || // 0-9
      ee >= 65 && ee <= 70 || // A-F
      ee >= 97 && ee <= 102;
    });
  }
  function G(I) {
    let P = "", H = "";
    for (; P = N(I); )
      H += P;
    return H;
  }
  function L(I) {
    m(I);
    const P = I.currentChar();
    return P !== "%" && f(he.EXPECTED_TOKEN, a(), 0, P), I.next(), "%";
  }
  function F(I) {
    let P = "";
    for (; ; ) {
      const H = I.currentChar();
      if (H === "{" || H === "}" || H === "@" || H === "|" || !H)
        break;
      if (H === "%")
        if (A(I))
          P += H, I.next();
        else
          break;
      else if (H === en || H === ft)
        if (A(I))
          P += H, I.next();
        else {
          if (_(I))
            break;
          P += H, I.next();
        }
      else
        P += H, I.next();
    }
    return P;
  }
  function M(I) {
    m(I);
    let P = "", H = "";
    for (; P = B(I); )
      H += P;
    return I.currentChar() === En && f(he.UNTERMINATED_CLOSING_BRACE, a(), 0), H;
  }
  function K(I) {
    m(I);
    let P = "";
    return I.currentChar() === "-" ? (I.next(), P += `-${G(I)}`) : P += G(I), I.currentChar() === En && f(he.UNTERMINATED_CLOSING_BRACE, a(), 0), P;
  }
  function re(I) {
    m(I), p(I, "'");
    let P = "", H = "";
    const ee = (ve) => ve !== Dc && ve !== ft;
    for (; P = x(I, ee); )
      P === "\\" ? H += fe(I) : H += P;
    const ie = I.currentChar();
    return ie === ft || ie === En ? (f(he.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, a(), 0), ie === ft && (I.next(), p(I, "'")), H) : (p(I, "'"), H);
  }
  function fe(I) {
    const P = I.currentChar();
    switch (P) {
      case "\\":
      case "'":
        return I.next(), `\\${P}`;
      case "u":
        return me(I, P, 4);
      case "U":
        return me(I, P, 6);
      default:
        return f(he.UNKNOWN_ESCAPE_SEQUENCE, a(), 0, P), "";
    }
  }
  function me(I, P, H) {
    p(I, P);
    let ee = "";
    for (let ie = 0; ie < H; ie++) {
      const ve = V(I);
      if (!ve) {
        f(he.INVALID_UNICODE_ESCAPE_SEQUENCE, a(), 0, `\\${P}${ee}${I.currentChar()}`);
        break;
      }
      ee += ve;
    }
    return `\\${P}${ee}`;
  }
  function Se(I) {
    m(I);
    let P = "", H = "";
    const ee = (ie) => ie !== "{" && ie !== "}" && ie !== en && ie !== ft;
    for (; P = x(I, ee); )
      H += P;
    return H;
  }
  function ne(I) {
    let P = "", H = "";
    for (; P = B(I); )
      H += P;
    return H;
  }
  function j(I) {
    const P = (H = !1, ee) => {
      const ie = I.currentChar();
      return ie === "{" || ie === "%" || ie === "@" || ie === "|" || ie === "(" || ie === ")" || !ie || ie === en ? ee : ie === ft || ie === ey ? (ee += ie, I.next(), P(H, ee)) : (ee += ie, I.next(), P(!0, ee));
    };
    return P(!1, "");
  }
  function Y(I) {
    m(I);
    const P = p(
      I,
      "|"
      /* TokenChars.Pipe */
    );
    return m(I), P;
  }
  function T(I, P) {
    let H = null;
    switch (I.currentChar()) {
      case "{":
        return P.braceNest >= 1 && f(he.NOT_ALLOW_NEST_PLACEHOLDER, a(), 0), I.next(), H = d(
          P,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), m(I), P.braceNest++, H;
      case "}":
        return P.braceNest > 0 && P.currentType === 2 && f(he.EMPTY_PLACEHOLDER, a(), 0), I.next(), H = d(
          P,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), P.braceNest--, P.braceNest > 0 && m(I), P.inLinked && P.braceNest === 0 && (P.inLinked = !1), H;
      case "@":
        return P.braceNest > 0 && f(he.UNTERMINATED_CLOSING_BRACE, a(), 0), H = D(I, P) || v(P), P.braceNest = 0, H;
      default: {
        let ie = !0, ve = !0, Re = !0;
        if (_(I))
          return P.braceNest > 0 && f(he.UNTERMINATED_CLOSING_BRACE, a(), 0), H = d(P, 1, Y(I)), P.braceNest = 0, P.inLinked = !1, H;
        if (P.braceNest > 0 && (P.currentType === 5 || P.currentType === 6 || P.currentType === 7))
          return f(he.UNTERMINATED_CLOSING_BRACE, a(), 0), P.braceNest = 0, R(I, P);
        if (ie = w(I, P))
          return H = d(P, 5, M(I)), m(I), H;
        if (ve = O(I, P))
          return H = d(P, 6, K(I)), m(I), H;
        if (Re = $(I, P))
          return H = d(P, 7, re(I)), m(I), H;
        if (!ie && !ve && !Re)
          return H = d(P, 13, Se(I)), f(he.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, H.value), m(I), H;
        break;
      }
    }
    return H;
  }
  function D(I, P) {
    const { currentType: H } = P;
    let ee = null;
    const ie = I.currentChar();
    switch ((H === 8 || H === 9 || H === 12 || H === 10) && (ie === ft || ie === en) && f(he.INVALID_LINKED_FORMAT, a(), 0), ie) {
      case "@":
        return I.next(), ee = d(
          P,
          8,
          "@"
          /* TokenChars.LinkedAlias */
        ), P.inLinked = !0, ee;
      case ".":
        return m(I), I.next(), d(
          P,
          9,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return m(I), I.next(), d(
          P,
          10,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return _(I) ? (ee = d(P, 1, Y(I)), P.braceNest = 0, P.inLinked = !1, ee) : C(I, P) || E(I, P) ? (m(I), D(I, P)) : b(I, P) ? (m(I), d(P, 12, ne(I))) : k(I, P) ? (m(I), ie === "{" ? T(I, P) || ee : d(P, 11, j(I))) : (H === 8 && f(he.INVALID_LINKED_FORMAT, a(), 0), P.braceNest = 0, P.inLinked = !1, R(I, P));
    }
  }
  function R(I, P) {
    let H = {
      type: 14
      /* TokenTypes.EOF */
    };
    if (P.braceNest > 0)
      return T(I, P) || v(P);
    if (P.inLinked)
      return D(I, P) || v(P);
    switch (I.currentChar()) {
      case "{":
        return T(I, P) || v(P);
      case "}":
        return f(he.UNBALANCED_CLOSING_BRACE, a(), 0), I.next(), d(
          P,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return D(I, P) || v(P);
      default: {
        if (_(I))
          return H = d(P, 1, Y(I)), P.braceNest = 0, P.inLinked = !1, H;
        const { isModulo: ie, hasSpace: ve } = S(I);
        if (ie)
          return ve ? d(P, 0, F(I)) : d(P, 4, L(I));
        if (A(I))
          return d(P, 0, F(I));
        break;
      }
    }
    return H;
  }
  function J() {
    const { currentType: I, offset: P, startLoc: H, endLoc: ee } = s;
    return s.lastType = I, s.lastOffset = P, s.lastStartLoc = H, s.lastEndLoc = ee, s.offset = o(), s.startLoc = a(), r.currentChar() === En ? d(
      s,
      14
      /* TokenTypes.EOF */
    ) : R(r, s);
  }
  return {
    nextToken: J,
    currentOffset: o,
    currentPosition: a,
    context: c
  };
}
const ry = "parser", oy = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function ay(e, t, n) {
  switch (e) {
    case "\\\\":
      return "\\";
    case "\\'":
      return "'";
    default: {
      const r = parseInt(t || n, 16);
      return r <= 55295 || r >= 57344 ? String.fromCodePoint(r) : "�";
    }
  }
}
function iy(e = {}) {
  const t = e.location !== !1, { onError: n } = e;
  function r(h, y, w, O, ...$) {
    const C = h.currentPosition();
    if (C.offset += O, C.column += O, n) {
      const b = t ? Cs(w, C) : null, E = Qr(y, b, {
        domain: ry,
        args: $
      });
      n(E);
    }
  }
  function o(h, y, w) {
    const O = { type: h };
    return t && (O.start = y, O.end = y, O.loc = { start: w, end: w }), O;
  }
  function a(h, y, w, O) {
    O && (h.type = O), t && (h.end = y, h.loc && (h.loc.end = w));
  }
  function i(h, y) {
    const w = h.context(), O = o(3, w.offset, w.startLoc);
    return O.value = y, a(O, h.currentOffset(), h.currentPosition()), O;
  }
  function l(h, y) {
    const w = h.context(), { lastOffset: O, lastStartLoc: $ } = w, C = o(5, O, $);
    return C.index = parseInt(y, 10), h.nextToken(), a(C, h.currentOffset(), h.currentPosition()), C;
  }
  function s(h, y) {
    const w = h.context(), { lastOffset: O, lastStartLoc: $ } = w, C = o(4, O, $);
    return C.key = y, h.nextToken(), a(C, h.currentOffset(), h.currentPosition()), C;
  }
  function c(h, y) {
    const w = h.context(), { lastOffset: O, lastStartLoc: $ } = w, C = o(9, O, $);
    return C.value = y.replace(oy, ay), h.nextToken(), a(C, h.currentOffset(), h.currentPosition()), C;
  }
  function u(h) {
    const y = h.nextToken(), w = h.context(), { lastOffset: O, lastStartLoc: $ } = w, C = o(8, O, $);
    return y.type !== 12 ? (r(h, he.UNEXPECTED_EMPTY_LINKED_MODIFIER, w.lastStartLoc, 0), C.value = "", a(C, O, $), {
      nextConsumeToken: y,
      node: C
    }) : (y.value == null && r(h, he.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, Vt(y)), C.value = y.value || "", a(C, h.currentOffset(), h.currentPosition()), {
      node: C
    });
  }
  function f(h, y) {
    const w = h.context(), O = o(7, w.offset, w.startLoc);
    return O.value = y, a(O, h.currentOffset(), h.currentPosition()), O;
  }
  function d(h) {
    const y = h.context(), w = o(6, y.offset, y.startLoc);
    let O = h.nextToken();
    if (O.type === 9) {
      const $ = u(h);
      w.modifier = $.node, O = $.nextConsumeToken || h.nextToken();
    }
    switch (O.type !== 10 && r(h, he.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Vt(O)), O = h.nextToken(), O.type === 2 && (O = h.nextToken()), O.type) {
      case 11:
        O.value == null && r(h, he.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Vt(O)), w.key = f(h, O.value || "");
        break;
      case 5:
        O.value == null && r(h, he.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Vt(O)), w.key = s(h, O.value || "");
        break;
      case 6:
        O.value == null && r(h, he.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Vt(O)), w.key = l(h, O.value || "");
        break;
      case 7:
        O.value == null && r(h, he.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Vt(O)), w.key = c(h, O.value || "");
        break;
      default: {
        r(h, he.UNEXPECTED_EMPTY_LINKED_KEY, y.lastStartLoc, 0);
        const $ = h.context(), C = o(7, $.offset, $.startLoc);
        return C.value = "", a(C, $.offset, $.startLoc), w.key = C, a(w, $.offset, $.startLoc), {
          nextConsumeToken: O,
          node: w
        };
      }
    }
    return a(w, h.currentOffset(), h.currentPosition()), {
      node: w
    };
  }
  function v(h) {
    const y = h.context(), w = y.currentType === 1 ? h.currentOffset() : y.offset, O = y.currentType === 1 ? y.endLoc : y.startLoc, $ = o(2, w, O);
    $.items = [];
    let C = null;
    do {
      const k = C || h.nextToken();
      switch (C = null, k.type) {
        case 0:
          k.value == null && r(h, he.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Vt(k)), $.items.push(i(h, k.value || ""));
          break;
        case 6:
          k.value == null && r(h, he.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Vt(k)), $.items.push(l(h, k.value || ""));
          break;
        case 5:
          k.value == null && r(h, he.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Vt(k)), $.items.push(s(h, k.value || ""));
          break;
        case 7:
          k.value == null && r(h, he.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Vt(k)), $.items.push(c(h, k.value || ""));
          break;
        case 8: {
          const _ = d(h);
          $.items.push(_.node), C = _.nextConsumeToken || null;
          break;
        }
      }
    } while (y.currentType !== 14 && y.currentType !== 1);
    const b = y.currentType === 1 ? y.lastOffset : h.currentOffset(), E = y.currentType === 1 ? y.lastEndLoc : h.currentPosition();
    return a($, b, E), $;
  }
  function p(h, y, w, O) {
    const $ = h.context();
    let C = O.items.length === 0;
    const b = o(1, y, w);
    b.cases = [], b.cases.push(O);
    do {
      const E = v(h);
      C || (C = E.items.length === 0), b.cases.push(E);
    } while ($.currentType !== 14);
    return C && r(h, he.MUST_HAVE_MESSAGES_IN_PLURAL, w, 0), a(b, h.currentOffset(), h.currentPosition()), b;
  }
  function g(h) {
    const y = h.context(), { offset: w, startLoc: O } = y, $ = v(h);
    return y.currentType === 14 ? $ : p(h, w, O, $);
  }
  function m(h) {
    const y = ny(h, Tf({}, e)), w = y.context(), O = o(0, w.offset, w.startLoc);
    return t && O.loc && (O.loc.source = h), O.body = g(y), e.onCacheKey && (O.cacheKey = e.onCacheKey(h)), w.currentType !== 14 && r(y, he.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, h[w.offset] || ""), a(O, y.currentOffset(), y.currentPosition()), O;
  }
  return { parse: m };
}
function Vt(e) {
  if (e.type === 14)
    return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function sy(e, t = {}) {
  const n = {
    ast: e,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => n, helper: (a) => (n.helpers.add(a), a) };
}
function Pc(e, t) {
  for (let n = 0; n < e.length; n++)
    vl(e[n], t);
}
function vl(e, t) {
  switch (e.type) {
    case 1:
      Pc(e.cases, t), t.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      Pc(e.items, t);
      break;
    case 6: {
      vl(e.key, t), t.helper(
        "linked"
        /* HelperNameMap.LINKED */
      ), t.helper(
        "type"
        /* HelperNameMap.TYPE */
      );
      break;
    }
    case 5:
      t.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), t.helper(
        "list"
        /* HelperNameMap.LIST */
      );
      break;
    case 4:
      t.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), t.helper(
        "named"
        /* HelperNameMap.NAMED */
      );
      break;
  }
}
function ly(e, t = {}) {
  const n = sy(e);
  n.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), e.body && vl(e.body, n);
  const r = n.context();
  e.helpers = Array.from(r.helpers);
}
function cy(e) {
  const t = e.body;
  return t.type === 2 ? Ac(t) : t.cases.forEach((n) => Ac(n)), e;
}
function Ac(e) {
  if (e.items.length === 1) {
    const t = e.items[0];
    (t.type === 3 || t.type === 9) && (e.static = t.value, delete t.value);
  } else {
    const t = [];
    for (let n = 0; n < e.items.length; n++) {
      const r = e.items[n];
      if (!(r.type === 3 || r.type === 9) || r.value == null)
        break;
      t.push(r.value);
    }
    if (t.length === e.items.length) {
      e.static = Sf(t);
      for (let n = 0; n < e.items.length; n++) {
        const r = e.items[n];
        (r.type === 3 || r.type === 9) && delete r.value;
      }
    }
  }
}
const uy = "minifier";
function Or(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      Or(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let r = 0; r < n.length; r++)
        Or(n[r]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let r = 0; r < n.length; r++)
        Or(n[r]);
      t.i = n, delete t.items, t.static && (t.s = t.static, delete t.static);
      break;
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const t = e;
      t.value && (t.v = t.value, delete t.value);
      break;
    }
    case 6: {
      const t = e;
      Or(t.key), t.k = t.key, delete t.key, t.modifier && (Or(t.modifier), t.m = t.modifier, delete t.modifier);
      break;
    }
    case 5: {
      const t = e;
      t.i = t.index, delete t.index;
      break;
    }
    case 4: {
      const t = e;
      t.k = t.key, delete t.key;
      break;
    }
    default:
      throw Qr(he.UNHANDLED_MINIFIER_NODE_TYPE, null, {
        domain: uy,
        args: [e.type]
      });
  }
  delete e.type;
}
const dy = "parser";
function fy(e, t) {
  const { sourceMap: n, filename: r, breakLineCode: o, needIndent: a } = t, i = t.location !== !1, l = {
    filename: r,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode: o,
    needIndent: a,
    indentLevel: 0
  };
  i && e.loc && (l.source = e.loc.source);
  const s = () => l;
  function c(m, h) {
    l.code += m;
  }
  function u(m, h = !0) {
    const y = h ? o : "";
    c(a ? y + "  ".repeat(m) : y);
  }
  function f(m = !0) {
    const h = ++l.indentLevel;
    m && u(h);
  }
  function d(m = !0) {
    const h = --l.indentLevel;
    m && u(h);
  }
  function v() {
    u(l.indentLevel);
  }
  return {
    context: s,
    push: c,
    indent: f,
    deindent: d,
    newline: v,
    helper: (m) => `_${m}`,
    needIndent: () => l.needIndent
  };
}
function py(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), Hr(e, t.key), t.modifier ? (e.push(", "), Hr(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function hy(e, t) {
  const { helper: n, needIndent: r } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(r());
  const o = t.items.length;
  for (let a = 0; a < o && (Hr(e, t.items[a]), a !== o - 1); a++)
    e.push(", ");
  e.deindent(r()), e.push("])");
}
function my(e, t) {
  const { helper: n, needIndent: r } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(r());
    const o = t.cases.length;
    for (let a = 0; a < o && (Hr(e, t.cases[a]), a !== o - 1); a++)
      e.push(", ");
    e.deindent(r()), e.push("])");
  }
}
function vy(e, t) {
  t.body ? Hr(e, t.body) : e.push("null");
}
function Hr(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      vy(e, t);
      break;
    case 1:
      my(e, t);
      break;
    case 2:
      hy(e, t);
      break;
    case 6:
      py(e, t);
      break;
    case 8:
      e.push(JSON.stringify(t.value), t);
      break;
    case 7:
      e.push(JSON.stringify(t.value), t);
      break;
    case 5:
      e.push(`${n(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${n(
        "list"
        /* HelperNameMap.LIST */
      )}(${t.index}))`, t);
      break;
    case 4:
      e.push(`${n(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${n(
        "named"
        /* HelperNameMap.NAMED */
      )}(${JSON.stringify(t.key)}))`, t);
      break;
    case 9:
      e.push(JSON.stringify(t.value), t);
      break;
    case 3:
      e.push(JSON.stringify(t.value), t);
      break;
    default:
      throw Qr(he.UNHANDLED_CODEGEN_NODE_TYPE, null, {
        domain: dy,
        args: [t.type]
      });
  }
}
const gy = (e, t = {}) => {
  const n = Oc(t.mode) ? t.mode : "normal", r = Oc(t.filename) ? t.filename : "message.intl", o = !!t.sourceMap, a = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, i = t.needIndent ? t.needIndent : n !== "arrow", l = e.helpers || [], s = fy(e, {
    mode: n,
    filename: r,
    sourceMap: o,
    breakLineCode: a,
    needIndent: i
  });
  s.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), s.indent(i), l.length > 0 && (s.push(`const { ${Sf(l.map((f) => `${f}: _${f}`), ", ")} } = ctx`), s.newline()), s.push("return "), Hr(s, e), s.deindent(i), s.push("}"), delete e.helpers;
  const { code: c, map: u } = s.context();
  return {
    ast: e,
    code: c,
    map: u ? u.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function yy(e, t = {}) {
  const n = Tf({}, t), r = !!n.jit, o = !!n.minify, a = n.optimize == null ? !0 : n.optimize, l = iy(n).parse(e);
  return r ? (a && cy(l), o && Or(l), { ast: l, code: "" }) : (ly(l, n), gy(l, n));
}
/*!
  * core-base v9.10.2
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
function _y() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (hl().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const Wn = [];
Wn[
  0
  /* States.BEFORE_PATH */
] = {
  w: [
    0
    /* States.BEFORE_PATH */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
Wn[
  1
  /* States.IN_PATH */
] = {
  w: [
    1
    /* States.IN_PATH */
  ],
  ".": [
    2
    /* States.BEFORE_IDENT */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
Wn[
  2
  /* States.BEFORE_IDENT */
] = {
  w: [
    2
    /* States.BEFORE_IDENT */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ]
};
Wn[
  3
  /* States.IN_IDENT */
] = {
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ],
  w: [
    1,
    1
    /* Actions.PUSH */
  ],
  ".": [
    2,
    1
    /* Actions.PUSH */
  ],
  "[": [
    4,
    1
    /* Actions.PUSH */
  ],
  o: [
    7,
    1
    /* Actions.PUSH */
  ]
};
Wn[
  4
  /* States.IN_SUB_PATH */
] = {
  "'": [
    5,
    0
    /* Actions.APPEND */
  ],
  '"': [
    6,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4,
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ],
  "]": [
    1,
    3
    /* Actions.PUSH_SUB_PATH */
  ],
  o: 8,
  l: [
    4,
    0
    /* Actions.APPEND */
  ]
};
Wn[
  5
  /* States.IN_SINGLE_QUOTE */
] = {
  "'": [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    5,
    0
    /* Actions.APPEND */
  ]
};
Wn[
  6
  /* States.IN_DOUBLE_QUOTE */
] = {
  '"': [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    6,
    0
    /* Actions.APPEND */
  ]
};
const by = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function Ey(e) {
  return by.test(e);
}
function wy(e) {
  const t = e.charCodeAt(0), n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function Cy(e) {
  if (e == null)
    return "o";
  switch (e.charCodeAt(0)) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return e;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function Ty(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : Ey(t) ? wy(t) : "*" + t;
}
function Sy(e) {
  const t = [];
  let n = -1, r = 0, o = 0, a, i, l, s, c, u, f;
  const d = [];
  d[
    0
    /* Actions.APPEND */
  ] = () => {
    i === void 0 ? i = l : i += l;
  }, d[
    1
    /* Actions.PUSH */
  ] = () => {
    i !== void 0 && (t.push(i), i = void 0);
  }, d[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    d[
      0
      /* Actions.APPEND */
    ](), o++;
  }, d[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (o > 0)
      o--, r = 4, d[
        0
        /* Actions.APPEND */
      ]();
    else {
      if (o = 0, i === void 0 || (i = Ty(i), i === !1))
        return !1;
      d[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function v() {
    const p = e[n + 1];
    if (r === 5 && p === "'" || r === 6 && p === '"')
      return n++, l = "\\" + p, d[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; r !== null; )
    if (n++, a = e[n], !(a === "\\" && v())) {
      if (s = Cy(a), f = Wn[r], c = f[s] || f.l || 8, c === 8 || (r = c[0], c[1] !== void 0 && (u = d[c[1]], u && (l = a, u() === !1))))
        return;
      if (r === 7)
        return t;
    }
}
const $c = /* @__PURE__ */ new Map();
function ky(e, t) {
  return Te(e) ? e[t] : null;
}
function Iy(e, t) {
  if (!Te(e))
    return null;
  let n = $c.get(t);
  if (n || (n = Sy(t), n && $c.set(t, n)), !n)
    return null;
  const r = n.length;
  let o = e, a = 0;
  for (; a < r; ) {
    const i = o[n[a]];
    if (i === void 0 || xe(o))
      return null;
    o = i, a++;
  }
  return o;
}
const Oy = (e) => e, Dy = (e) => "", Py = "text", Ay = (e) => e.length === 0 ? "" : Ug(e), $y = Vg;
function Nc(e, t) {
  return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function Ny(e) {
  const t = rt(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (rt(e.named.count) || rt(e.named.n)) ? rt(e.named.count) ? e.named.count : rt(e.named.n) ? e.named.n : t : t;
}
function Ly(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function Ry(e = {}) {
  const t = e.locale, n = Ny(e), r = Te(e.pluralRules) && ce(t) && xe(e.pluralRules[t]) ? e.pluralRules[t] : Nc, o = Te(e.pluralRules) && ce(t) && xe(e.pluralRules[t]) ? Nc : void 0, a = (h) => h[r(n, h.length, o)], i = e.list || [], l = (h) => i[h], s = e.named || {};
  rt(e.pluralIndex) && Ly(n, s);
  const c = (h) => s[h];
  function u(h) {
    const y = xe(e.messages) ? e.messages(h) : Te(e.messages) ? e.messages[h] : !1;
    return y || (e.parent ? e.parent.message(h) : Dy);
  }
  const f = (h) => e.modifiers ? e.modifiers[h] : Oy, d = Ce(e.processor) && xe(e.processor.normalize) ? e.processor.normalize : Ay, v = Ce(e.processor) && xe(e.processor.interpolate) ? e.processor.interpolate : $y, p = Ce(e.processor) && ce(e.processor.type) ? e.processor.type : Py, m = {
    list: l,
    named: c,
    plural: a,
    linked: (h, ...y) => {
      const [w, O] = y;
      let $ = "text", C = "";
      y.length === 1 ? Te(w) ? (C = w.modifier || C, $ = w.type || $) : ce(w) && (C = w || C) : y.length === 2 && (ce(w) && (C = w || C), ce(O) && ($ = O || $));
      const b = u(h)(m), E = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        $ === "vnode" && Xe(b) && C ? b[0] : b
      );
      return C ? f(C)(E, $) : E;
    },
    message: u,
    type: p,
    interpolate: v,
    normalize: d,
    values: ut({}, i, s)
  };
  return m;
}
let Oo = null;
function My(e) {
  Oo = e;
}
function xy(e, t, n) {
  Oo && Oo.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
const By = /* @__PURE__ */ Vy(
  "function:translate"
  /* IntlifyDevToolsHooks.FunctionTranslate */
);
function Vy(e) {
  return (t) => Oo && Oo.emit(e, t);
}
const pt = {
  NOT_FOUND_KEY: 1,
  FALLBACK_TO_TRANSLATE: 2,
  CANNOT_FORMAT_NUMBER: 3,
  FALLBACK_TO_NUMBER_FORMAT: 4,
  CANNOT_FORMAT_DATE: 5,
  FALLBACK_TO_DATE_FORMAT: 6,
  EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7,
  __EXTEND_POINT__: 8
}, Uy = {
  [pt.NOT_FOUND_KEY]: "Not found '{key}' key in '{locale}' locale messages.",
  [pt.FALLBACK_TO_TRANSLATE]: "Fall back to translate '{key}' key with '{target}' locale.",
  [pt.CANNOT_FORMAT_NUMBER]: "Cannot format a number value due to not supported Intl.NumberFormat.",
  [pt.FALLBACK_TO_NUMBER_FORMAT]: "Fall back to number format '{key}' key with '{target}' locale.",
  [pt.CANNOT_FORMAT_DATE]: "Cannot format a date value due to not supported Intl.DateTimeFormat.",
  [pt.FALLBACK_TO_DATE_FORMAT]: "Fall back to datetime format '{key}' key with '{target}' locale.",
  [pt.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER]: "This project is using Custom Message Compiler, which is an experimental feature. It may receive breaking changes or be removed in the future."
};
function hr(e, ...t) {
  return pl(Uy[e], ...t);
}
const kf = he.__EXTEND_POINT__, Qn = ml(kf), at = {
  INVALID_ARGUMENT: kf,
  // 18
  INVALID_DATE_ARGUMENT: Qn(),
  // 19
  INVALID_ISO_DATE_ARGUMENT: Qn(),
  // 20
  NOT_SUPPORT_NON_STRING_MESSAGE: Qn(),
  // 21
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: Qn(),
  // 22
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: Qn(),
  // 23
  NOT_SUPPORT_LOCALE_TYPE: Qn(),
  // 24
  __EXTEND_POINT__: Qn()
  // 25
};
function sn(e) {
  return Qr(e, null, process.env.NODE_ENV !== "production" ? { messages: Fy } : void 0);
}
const Fy = {
  [at.INVALID_ARGUMENT]: "Invalid arguments",
  [at.INVALID_DATE_ARGUMENT]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
  [at.INVALID_ISO_DATE_ARGUMENT]: "The argument provided is not a valid ISO date string",
  [at.NOT_SUPPORT_NON_STRING_MESSAGE]: "Not support non-string message",
  [at.NOT_SUPPORT_LOCALE_PROMISE_VALUE]: "cannot support promise value",
  [at.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION]: "cannot support async function",
  [at.NOT_SUPPORT_LOCALE_TYPE]: "cannot support locale type"
};
function gl(e, t) {
  return t.locale != null ? Lc(t.locale) : Lc(e.locale);
}
let Vi;
function Lc(e) {
  if (ce(e))
    return e;
  if (xe(e)) {
    if (e.resolvedOnce && Vi != null)
      return Vi;
    if (e.constructor.name === "Function") {
      const t = e();
      if (Bg(t))
        throw sn(at.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return Vi = t;
    } else
      throw sn(at.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw sn(at.NOT_SUPPORT_LOCALE_TYPE);
}
function Hy(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...Xe(t) ? t : Te(t) ? Object.keys(t) : ce(t) ? [t] : [n]
  ])];
}
function If(e, t, n) {
  const r = ce(n) ? n : Ya, o = e;
  o.__localeChainCache || (o.__localeChainCache = /* @__PURE__ */ new Map());
  let a = o.__localeChainCache.get(r);
  if (!a) {
    a = [];
    let i = [n];
    for (; Xe(i); )
      i = Rc(a, i, t);
    const l = Xe(t) || !Ce(t) ? t : t.default ? t.default : null;
    i = ce(l) ? [l] : l, Xe(i) && Rc(a, i, !1), o.__localeChainCache.set(r, a);
  }
  return a;
}
function Rc(e, t, n) {
  let r = !0;
  for (let o = 0; o < t.length && Be(r); o++) {
    const a = t[o];
    ce(a) && (r = Yy(e, t[o], n));
  }
  return r;
}
function Yy(e, t, n) {
  let r;
  const o = t.split("-");
  do {
    const a = o.join("-");
    r = jy(e, a, n), o.splice(-1, 1);
  } while (o.length && r === !0);
  return r;
}
function jy(e, t, n) {
  let r = !1;
  if (!e.includes(t) && (r = !0, t)) {
    r = t[t.length - 1] !== "!";
    const o = t.replace(/!/g, "");
    e.push(o), (Xe(n) || Ce(n)) && n[o] && (r = n[o]);
  }
  return r;
}
const Wy = "9.10.2", fi = -1, Ya = "en-US", ja = "", Mc = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function qy() {
  return {
    upper: (e, t) => t === "text" && ce(e) ? e.toUpperCase() : t === "vnode" && Te(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && ce(e) ? e.toLowerCase() : t === "vnode" && Te(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && ce(e) ? Mc(e) : t === "vnode" && Te(e) && "__v_isVNode" in e ? Mc(e.children) : e
  };
}
let Of;
function zy(e) {
  Of = e;
}
let Df;
function Gy(e) {
  Df = e;
}
let Pf;
function Xy(e) {
  Pf = e;
}
let Af = null;
const Ky = /* @__NO_SIDE_EFFECTS__ */ (e) => {
  Af = e;
}, Jy = /* @__NO_SIDE_EFFECTS__ */ () => Af;
let $f = null;
const xc = (e) => {
  $f = e;
}, Zy = () => $f;
let Bc = 0;
function Qy(e = {}) {
  const t = xe(e.onWarn) ? e.onWarn : Jt, n = ce(e.version) ? e.version : Wy, r = ce(e.locale) || xe(e.locale) ? e.locale : Ya, o = xe(r) ? Ya : r, a = Xe(e.fallbackLocale) || Ce(e.fallbackLocale) || ce(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : o, i = Ce(e.messages) ? e.messages : { [o]: {} }, l = Ce(e.datetimeFormats) ? e.datetimeFormats : { [o]: {} }, s = Ce(e.numberFormats) ? e.numberFormats : { [o]: {} }, c = ut({}, e.modifiers || {}, qy()), u = e.pluralRules || {}, f = xe(e.missing) ? e.missing : null, d = Be(e.missingWarn) || Fa(e.missingWarn) ? e.missingWarn : !0, v = Be(e.fallbackWarn) || Fa(e.fallbackWarn) ? e.fallbackWarn : !0, p = !!e.fallbackFormat, g = !!e.unresolving, m = xe(e.postTranslation) ? e.postTranslation : null, h = Ce(e.processor) ? e.processor : null, y = Be(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, w = !!e.escapeParameter, O = xe(e.messageCompiler) ? e.messageCompiler : Of;
  process.env.NODE_ENV !== "production" && xe(e.messageCompiler) && wf(hr(pt.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER));
  const $ = xe(e.messageResolver) ? e.messageResolver : Df || ky, C = xe(e.localeFallbacker) ? e.localeFallbacker : Pf || Hy, b = Te(e.fallbackContext) ? e.fallbackContext : void 0, E = e, k = Te(E.__datetimeFormatters) ? E.__datetimeFormatters : /* @__PURE__ */ new Map(), _ = Te(E.__numberFormatters) ? E.__numberFormatters : /* @__PURE__ */ new Map(), S = Te(E.__meta) ? E.__meta : {};
  Bc++;
  const A = {
    version: n,
    cid: Bc,
    locale: r,
    fallbackLocale: a,
    messages: i,
    modifiers: c,
    pluralRules: u,
    missing: f,
    missingWarn: d,
    fallbackWarn: v,
    fallbackFormat: p,
    unresolving: g,
    postTranslation: m,
    processor: h,
    warnHtmlMessage: y,
    escapeParameter: w,
    messageCompiler: O,
    messageResolver: $,
    localeFallbacker: C,
    fallbackContext: b,
    onWarn: t,
    __meta: S
  };
  return A.datetimeFormats = l, A.numberFormats = s, A.__datetimeFormatters = k, A.__numberFormatters = _, process.env.NODE_ENV !== "production" && (A.__v_emitter = E.__v_emitter != null ? E.__v_emitter : void 0), (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) && xy(A, n, S), A;
}
function pi(e, t) {
  return e instanceof RegExp ? e.test(t) : e;
}
function Nf(e, t) {
  return e instanceof RegExp ? e.test(t) : e;
}
function yl(e, t, n, r, o) {
  const { missing: a, onWarn: i } = e;
  if (process.env.NODE_ENV !== "production") {
    const l = e.__v_emitter;
    l && l.emit("missing", {
      locale: n,
      key: t,
      type: o,
      groupId: `${o}:${t}`
    });
  }
  if (a !== null) {
    const l = a(e, n, t, o);
    return ce(l) ? l : t;
  } else
    return process.env.NODE_ENV !== "production" && Nf(r, t) && i(hr(pt.NOT_FOUND_KEY, { key: t, locale: n })), t;
}
function lo(e, t, n) {
  const r = e;
  r.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function Ui(e) {
  return (n) => e_(n, e);
}
function e_(e, t) {
  const n = t.b || t.body;
  if ((n.t || n.type) === 1) {
    const r = n, o = r.c || r.cases;
    return e.plural(o.reduce((a, i) => [
      ...a,
      Vc(e, i)
    ], []));
  } else
    return Vc(e, n);
}
function Vc(e, t) {
  const n = t.s || t.static;
  if (n)
    return e.type === "text" ? n : e.normalize([n]);
  {
    const r = (t.i || t.items).reduce((o, a) => [...o, Ts(e, a)], []);
    return e.normalize(r);
  }
}
function Ts(e, t) {
  const n = t.t || t.type;
  switch (n) {
    case 3: {
      const r = t;
      return r.v || r.value;
    }
    case 9: {
      const r = t;
      return r.v || r.value;
    }
    case 4: {
      const r = t;
      return e.interpolate(e.named(r.k || r.key));
    }
    case 5: {
      const r = t;
      return e.interpolate(e.list(r.i != null ? r.i : r.index));
    }
    case 6: {
      const r = t, o = r.m || r.modifier;
      return e.linked(Ts(e, r.k || r.key), o ? Ts(e, o) : void 0, e.type);
    }
    case 7: {
      const r = t;
      return r.v || r.value;
    }
    case 8: {
      const r = t;
      return r.v || r.value;
    }
    default:
      throw new Error(`unhandled node type on format message part: ${n}`);
  }
}
const t_ = "Detected HTML in '{source}' message. Recommend not using HTML messages to avoid XSS.";
function n_(e, t) {
  t && Xg(e) && Jt(pl(t_, { source: e }));
}
const r_ = (e) => e;
let va = /* @__PURE__ */ Object.create(null);
const Nn = (e) => Te(e) && (e.t === 0 || e.type === 0) && ("b" in e || "body" in e);
function o_(e, t = {}) {
  let n = !1;
  const r = t.onError || zg;
  return t.onError = (o) => {
    n = !0, r(o);
  }, { ...yy(e, t), detectError: n };
}
function a_(e, t) {
  if (ce(e)) {
    const n = Be(t.warnHtmlMessage) ? t.warnHtmlMessage : !0;
    process.env.NODE_ENV !== "production" && n_(e, n);
    const o = (t.onCacheKey || r_)(e), a = va[o];
    if (a)
      return a;
    const { ast: i, detectError: l } = o_(e, {
      ...t,
      location: process.env.NODE_ENV !== "production",
      jit: !0
    }), s = Ui(i);
    return l ? s : va[o] = s;
  } else {
    if (process.env.NODE_ENV !== "production" && !Nn(e))
      return Jt(`the message that is resolve with key '${t.key}' is not supported for jit compilation`), () => e;
    const n = e.cacheKey;
    if (n) {
      const r = va[n];
      return r || (va[n] = Ui(e));
    } else
      return Ui(e);
  }
}
const Uc = () => "", kt = (e) => xe(e);
function Fc(e, ...t) {
  const { fallbackFormat: n, postTranslation: r, unresolving: o, messageCompiler: a, fallbackLocale: i, messages: l } = e, [s, c] = Ss(...t), u = Be(c.missingWarn) ? c.missingWarn : e.missingWarn, f = Be(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn, d = Be(c.escapeParameter) ? c.escapeParameter : e.escapeParameter, v = !!c.resolvedMessage, p = ce(c.default) || Be(c.default) ? Be(c.default) ? a ? s : () => s : c.default : n ? a ? s : () => s : "", g = n || p !== "", m = gl(e, c);
  d && i_(c);
  let [h, y, w] = v ? [
    s,
    m,
    l[m] || {}
  ] : Lf(e, s, m, i, f, u), O = h, $ = s;
  if (!v && !(ce(O) || Nn(O) || kt(O)) && g && (O = p, $ = O), !v && (!(ce(O) || Nn(O) || kt(O)) || !ce(y)))
    return o ? fi : s;
  if (process.env.NODE_ENV !== "production" && ce(O) && e.messageCompiler == null)
    return Jt(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${s}'.`), s;
  let C = !1;
  const b = () => {
    C = !0;
  }, E = kt(O) ? O : Rf(e, s, y, O, $, b);
  if (C)
    return O;
  const k = u_(e, y, w, c), _ = Ry(k), S = s_(e, E, _), A = r ? r(S, s) : S;
  if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
    const x = {
      timestamp: Date.now(),
      key: ce(s) ? s : kt(O) ? O.key : "",
      locale: y || (kt(O) ? O.locale : ""),
      format: ce(O) ? O : kt(O) ? O.source : "",
      message: A
    };
    x.meta = ut({}, e.__meta, /* @__PURE__ */ Jy() || {}), By(x);
  }
  return A;
}
function i_(e) {
  Xe(e.list) ? e.list = e.list.map((t) => ce(t) ? Sc(t) : t) : Te(e.named) && Object.keys(e.named).forEach((t) => {
    ce(e.named[t]) && (e.named[t] = Sc(e.named[t]));
  });
}
function Lf(e, t, n, r, o, a) {
  const { messages: i, onWarn: l, messageResolver: s, localeFallbacker: c } = e, u = c(e, r, n);
  let f = {}, d, v = null, p = n, g = null;
  const m = "translate";
  for (let h = 0; h < u.length; h++) {
    if (d = g = u[h], process.env.NODE_ENV !== "production" && n !== d && pi(o, t) && l(hr(pt.FALLBACK_TO_TRANSLATE, {
      key: t,
      target: d
    })), process.env.NODE_ENV !== "production" && n !== d) {
      const C = e.__v_emitter;
      C && C.emit("fallback", {
        type: m,
        key: t,
        from: p,
        to: g,
        groupId: `${m}:${t}`
      });
    }
    f = i[d] || {};
    let y = null, w, O;
    if (process.env.NODE_ENV !== "production" && xt && (y = window.performance.now(), w = "intlify-message-resolve-start", O = "intlify-message-resolve-end", wt && wt(w)), (v = s(f, t)) === null && (v = f[t]), process.env.NODE_ENV !== "production" && xt) {
      const C = window.performance.now(), b = e.__v_emitter;
      b && y && v && b.emit("message-resolve", {
        type: "message-resolve",
        key: t,
        message: v,
        time: C - y,
        groupId: `${m}:${t}`
      }), w && O && wt && pr && (wt(O), pr("intlify message resolve", w, O));
    }
    if (ce(v) || Nn(v) || kt(v))
      break;
    const $ = yl(
      e,
      // eslint-disable-line @typescript-eslint/no-explicit-any
      t,
      d,
      a,
      m
    );
    $ !== t && (v = $), p = g;
  }
  return [v, d, f];
}
function Rf(e, t, n, r, o, a) {
  const { messageCompiler: i, warnHtmlMessage: l } = e;
  if (kt(r)) {
    const d = r;
    return d.locale = d.locale || n, d.key = d.key || t, d;
  }
  if (i == null) {
    const d = () => r;
    return d.locale = n, d.key = t, d;
  }
  let s = null, c, u;
  process.env.NODE_ENV !== "production" && xt && (s = window.performance.now(), c = "intlify-message-compilation-start", u = "intlify-message-compilation-end", wt && wt(c));
  const f = i(r, l_(e, n, o, r, l, a));
  if (process.env.NODE_ENV !== "production" && xt) {
    const d = window.performance.now(), v = e.__v_emitter;
    v && s && v.emit("message-compilation", {
      type: "message-compilation",
      message: r,
      time: d - s,
      groupId: `translate:${t}`
    }), c && u && wt && pr && (wt(u), pr("intlify message compilation", c, u));
  }
  return f.locale = n, f.key = t, f.source = r, f;
}
function s_(e, t, n) {
  let r = null, o, a;
  process.env.NODE_ENV !== "production" && xt && (r = window.performance.now(), o = "intlify-message-evaluation-start", a = "intlify-message-evaluation-end", wt && wt(o));
  const i = t(n);
  if (process.env.NODE_ENV !== "production" && xt) {
    const l = window.performance.now(), s = e.__v_emitter;
    s && r && s.emit("message-evaluation", {
      type: "message-evaluation",
      value: i,
      time: l - r,
      groupId: `translate:${t.key}`
    }), o && a && wt && pr && (wt(a), pr("intlify message evaluation", o, a));
  }
  return i;
}
function Ss(...e) {
  const [t, n, r] = e, o = {};
  if (!ce(t) && !rt(t) && !kt(t) && !Nn(t))
    throw sn(at.INVALID_ARGUMENT);
  const a = rt(t) ? String(t) : (kt(t), t);
  return rt(n) ? o.plural = n : ce(n) ? o.default = n : Ce(n) && !di(n) ? o.named = n : Xe(n) && (o.list = n), rt(r) ? o.plural = r : ce(r) ? o.default = r : Ce(r) && ut(o, r), [a, o];
}
function l_(e, t, n, r, o, a) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: o,
    onError: (i) => {
      if (a && a(i), process.env.NODE_ENV !== "production") {
        const l = c_(r), s = `Message compilation error: ${i.message}`, c = i.location && l && Fg(l, i.location.start.offset, i.location.end.offset), u = e.__v_emitter;
        u && l && u.emit("compile-error", {
          message: l,
          error: i.message,
          start: i.location && i.location.start.offset,
          end: i.location && i.location.end.offset,
          groupId: `translate:${n}`
        }), console.error(c ? `${s}
${c}` : s);
      } else
        throw i;
    },
    onCacheKey: (i) => Lg(t, n, i)
  };
}
function c_(e) {
  if (ce(e))
    return e;
  if (e.loc && e.loc.source)
    return e.loc.source;
}
function u_(e, t, n, r) {
  const { modifiers: o, pluralRules: a, messageResolver: i, fallbackLocale: l, fallbackWarn: s, missingWarn: c, fallbackContext: u } = e, d = {
    locale: t,
    modifiers: o,
    pluralRules: a,
    messages: (v) => {
      let p = i(n, v);
      if (p == null && u) {
        const [, , g] = Lf(u, v, t, l, s, c);
        p = i(g, v);
      }
      if (ce(p) || Nn(p)) {
        let g = !1;
        const h = Rf(e, v, t, p, v, () => {
          g = !0;
        });
        return g ? Uc : h;
      } else
        return kt(p) ? p : Uc;
    }
  };
  return e.processor && (d.processor = e.processor), r.list && (d.list = r.list), r.named && (d.named = r.named), rt(r.plural) && (d.pluralIndex = r.plural), d;
}
const Hc = typeof Intl < "u", Mf = {
  dateTimeFormat: Hc && typeof Intl.DateTimeFormat < "u",
  numberFormat: Hc && typeof Intl.NumberFormat < "u"
};
function Yc(e, ...t) {
  const { datetimeFormats: n, unresolving: r, fallbackLocale: o, onWarn: a, localeFallbacker: i } = e, { __datetimeFormatters: l } = e;
  if (process.env.NODE_ENV !== "production" && !Mf.dateTimeFormat)
    return a(hr(pt.CANNOT_FORMAT_DATE)), ja;
  const [s, c, u, f] = ks(...t), d = Be(u.missingWarn) ? u.missingWarn : e.missingWarn, v = Be(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, p = !!u.part, g = gl(e, u), m = i(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    o,
    g
  );
  if (!ce(s) || s === "")
    return new Intl.DateTimeFormat(g, f).format(c);
  let h = {}, y, w = null, O = g, $ = null;
  const C = "datetime format";
  for (let k = 0; k < m.length; k++) {
    if (y = $ = m[k], process.env.NODE_ENV !== "production" && g !== y && pi(v, s) && a(hr(pt.FALLBACK_TO_DATE_FORMAT, {
      key: s,
      target: y
    })), process.env.NODE_ENV !== "production" && g !== y) {
      const _ = e.__v_emitter;
      _ && _.emit("fallback", {
        type: C,
        key: s,
        from: O,
        to: $,
        groupId: `${C}:${s}`
      });
    }
    if (h = n[y] || {}, w = h[s], Ce(w))
      break;
    yl(e, s, y, d, C), O = $;
  }
  if (!Ce(w) || !ce(y))
    return r ? fi : s;
  let b = `${y}__${s}`;
  di(f) || (b = `${b}__${JSON.stringify(f)}`);
  let E = l.get(b);
  return E || (E = new Intl.DateTimeFormat(y, ut({}, w, f)), l.set(b, E)), p ? E.formatToParts(c) : E.format(c);
}
const xf = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function ks(...e) {
  const [t, n, r, o] = e, a = {};
  let i = {}, l;
  if (ce(t)) {
    const s = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!s)
      throw sn(at.INVALID_ISO_DATE_ARGUMENT);
    const c = s[3] ? s[3].trim().startsWith("T") ? `${s[1].trim()}${s[3].trim()}` : `${s[1].trim()}T${s[3].trim()}` : s[1].trim();
    l = new Date(c);
    try {
      l.toISOString();
    } catch {
      throw sn(at.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (Mg(t)) {
    if (isNaN(t.getTime()))
      throw sn(at.INVALID_DATE_ARGUMENT);
    l = t;
  } else if (rt(t))
    l = t;
  else
    throw sn(at.INVALID_ARGUMENT);
  return ce(n) ? a.key = n : Ce(n) && Object.keys(n).forEach((s) => {
    xf.includes(s) ? i[s] = n[s] : a[s] = n[s];
  }), ce(r) ? a.locale = r : Ce(r) && (i = r), Ce(o) && (i = o), [a.key || "", l, a, i];
}
function jc(e, t, n) {
  const r = e;
  for (const o in n) {
    const a = `${t}__${o}`;
    r.__datetimeFormatters.has(a) && r.__datetimeFormatters.delete(a);
  }
}
function Wc(e, ...t) {
  const { numberFormats: n, unresolving: r, fallbackLocale: o, onWarn: a, localeFallbacker: i } = e, { __numberFormatters: l } = e;
  if (process.env.NODE_ENV !== "production" && !Mf.numberFormat)
    return a(hr(pt.CANNOT_FORMAT_NUMBER)), ja;
  const [s, c, u, f] = Is(...t), d = Be(u.missingWarn) ? u.missingWarn : e.missingWarn, v = Be(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, p = !!u.part, g = gl(e, u), m = i(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    o,
    g
  );
  if (!ce(s) || s === "")
    return new Intl.NumberFormat(g, f).format(c);
  let h = {}, y, w = null, O = g, $ = null;
  const C = "number format";
  for (let k = 0; k < m.length; k++) {
    if (y = $ = m[k], process.env.NODE_ENV !== "production" && g !== y && pi(v, s) && a(hr(pt.FALLBACK_TO_NUMBER_FORMAT, {
      key: s,
      target: y
    })), process.env.NODE_ENV !== "production" && g !== y) {
      const _ = e.__v_emitter;
      _ && _.emit("fallback", {
        type: C,
        key: s,
        from: O,
        to: $,
        groupId: `${C}:${s}`
      });
    }
    if (h = n[y] || {}, w = h[s], Ce(w))
      break;
    yl(e, s, y, d, C), O = $;
  }
  if (!Ce(w) || !ce(y))
    return r ? fi : s;
  let b = `${y}__${s}`;
  di(f) || (b = `${b}__${JSON.stringify(f)}`);
  let E = l.get(b);
  return E || (E = new Intl.NumberFormat(y, ut({}, w, f)), l.set(b, E)), p ? E.formatToParts(c) : E.format(c);
}
const Bf = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function Is(...e) {
  const [t, n, r, o] = e, a = {};
  let i = {};
  if (!rt(t))
    throw sn(at.INVALID_ARGUMENT);
  const l = t;
  return ce(n) ? a.key = n : Ce(n) && Object.keys(n).forEach((s) => {
    Bf.includes(s) ? i[s] = n[s] : a[s] = n[s];
  }), ce(r) ? a.locale = r : Ce(r) && (i = r), Ce(o) && (i = o), [a.key || "", l, a, i];
}
function qc(e, t, n) {
  const r = e;
  for (const o in n) {
    const a = `${t}__${o}`;
    r.__numberFormatters.has(a) && r.__numberFormatters.delete(a);
  }
}
_y();
/*!
  * vue-i18n v9.10.2
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
const d_ = "9.10.2";
function f_() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (hl().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const Vf = pt.__EXTEND_POINT__, tn = ml(Vf), st = {
  FALLBACK_TO_ROOT: Vf,
  // 9
  NOT_SUPPORTED_PRESERVE: tn(),
  // 10
  NOT_SUPPORTED_FORMATTER: tn(),
  // 11
  NOT_SUPPORTED_PRESERVE_DIRECTIVE: tn(),
  // 12
  NOT_SUPPORTED_GET_CHOICE_INDEX: tn(),
  // 13
  COMPONENT_NAME_LEGACY_COMPATIBLE: tn(),
  // 14
  NOT_FOUND_PARENT_SCOPE: tn(),
  // 15
  IGNORE_OBJ_FLATTEN: tn(),
  // 16
  NOTICE_DROP_ALLOW_COMPOSITION: tn(),
  // 17
  NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG: tn()
  // 18
}, p_ = {
  [st.FALLBACK_TO_ROOT]: "Fall back to {type} '{key}' with root locale.",
  [st.NOT_SUPPORTED_PRESERVE]: "Not supported 'preserve'.",
  [st.NOT_SUPPORTED_FORMATTER]: "Not supported 'formatter'.",
  [st.NOT_SUPPORTED_PRESERVE_DIRECTIVE]: "Not supported 'preserveDirectiveContent'.",
  [st.NOT_SUPPORTED_GET_CHOICE_INDEX]: "Not supported 'getChoiceIndex'.",
  [st.COMPONENT_NAME_LEGACY_COMPATIBLE]: "Component name legacy compatible: '{name}' -> 'i18n'",
  [st.NOT_FOUND_PARENT_SCOPE]: "Not found parent scope. use the global scope.",
  [st.IGNORE_OBJ_FLATTEN]: "Ignore object flatten: '{key}' key has an string value",
  [st.NOTICE_DROP_ALLOW_COMPOSITION]: "'allowComposition' option will be dropped in the next major version. For more information, please see 👉 https://tinyurl.com/2p97mcze",
  [st.NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG]: "'translateExistCompatible' option will be dropped in the next major version."
};
function Yr(e, ...t) {
  return pl(p_[e], ...t);
}
const Uf = at.__EXTEND_POINT__, mt = ml(Uf), Ae = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: Uf,
  // 26
  // legacy module errors
  INVALID_ARGUMENT: mt(),
  // 27
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: mt(),
  // 28
  NOT_INSTALLED: mt(),
  // 29
  NOT_AVAILABLE_IN_LEGACY_MODE: mt(),
  // 30
  // directive module errors
  REQUIRED_VALUE: mt(),
  // 31
  INVALID_VALUE: mt(),
  // 32
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: mt(),
  // 33
  NOT_INSTALLED_WITH_PROVIDE: mt(),
  // 34
  // unexpected error
  UNEXPECTED_ERROR: mt(),
  // 35
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: mt(),
  // 36
  // bridge support vue 2.x only
  BRIDGE_SUPPORT_VUE_2_ONLY: mt(),
  // 37
  // need to define `i18n` option in `allowComposition: true` and `useScope: 'local' at `useI18n``
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: mt(),
  // 38
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: mt(),
  // 39
  // for enhancement
  __EXTEND_POINT__: mt()
  // 40
};
function At(e, ...t) {
  return Qr(e, null, process.env.NODE_ENV !== "production" ? { messages: h_, args: t } : void 0);
}
const h_ = {
  [Ae.UNEXPECTED_RETURN_TYPE]: "Unexpected return type in composer",
  [Ae.INVALID_ARGUMENT]: "Invalid argument",
  [Ae.MUST_BE_CALL_SETUP_TOP]: "Must be called at the top of a `setup` function",
  [Ae.NOT_INSTALLED]: "Need to install with `app.use` function",
  [Ae.UNEXPECTED_ERROR]: "Unexpected error",
  [Ae.NOT_AVAILABLE_IN_LEGACY_MODE]: "Not available in legacy mode",
  [Ae.REQUIRED_VALUE]: "Required in value: {0}",
  [Ae.INVALID_VALUE]: "Invalid value",
  [Ae.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN]: "Cannot setup vue-devtools plugin",
  [Ae.NOT_INSTALLED_WITH_PROVIDE]: "Need to install with `provide` function",
  [Ae.NOT_COMPATIBLE_LEGACY_VUE_I18N]: "Not compatible legacy VueI18n.",
  [Ae.BRIDGE_SUPPORT_VUE_2_ONLY]: "vue-i18n-bridge support Vue 2.x only",
  [Ae.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION]: "Must define ‘i18n’ option or custom block in Composition API with using local scope in Legacy API mode",
  [Ae.NOT_AVAILABLE_COMPOSITION_IN_LEGACY]: "Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly"
}, Os = /* @__PURE__ */ Kt("__translateVNode"), Ds = /* @__PURE__ */ Kt("__datetimeParts"), Ps = /* @__PURE__ */ Kt("__numberParts"), Do = /* @__PURE__ */ Kt("__enableEmitter"), As = /* @__PURE__ */ Kt("__disableEmitter"), m_ = Kt("__setPluralRules"), v_ = /* @__PURE__ */ Kt("__injectWithOption"), $s = /* @__PURE__ */ Kt("__dispose");
function Po(e) {
  if (!Te(e))
    return e;
  for (const t in e)
    if (Ha(e, t))
      if (!t.includes("."))
        Te(e[t]) && Po(e[t]);
      else {
        const n = t.split("."), r = n.length - 1;
        let o = e, a = !1;
        for (let i = 0; i < r; i++) {
          if (n[i] in o || (o[n[i]] = {}), !Te(o[n[i]])) {
            process.env.NODE_ENV !== "production" && Jt(Yr(st.IGNORE_OBJ_FLATTEN, {
              key: n[i]
            })), a = !0;
            break;
          }
          o = o[n[i]];
        }
        a || (o[n[r]] = e[t], delete e[t]), Te(o[n[r]]) && Po(o[n[r]]);
      }
  return e;
}
function Ff(e, t) {
  const { messages: n, __i18n: r, messageResolver: o, flatJson: a } = t, i = Ce(n) ? n : Xe(r) ? {} : { [e]: {} };
  if (Xe(r) && r.forEach((l) => {
    if ("locale" in l && "resource" in l) {
      const { locale: s, resource: c } = l;
      s ? (i[s] = i[s] || {}, Pa(c, i[s])) : Pa(c, i);
    } else
      ce(l) && Pa(JSON.parse(l), i);
  }), o == null && a)
    for (const l in i)
      Ha(i, l) && Po(i[l]);
  return i;
}
function Hf(e) {
  return e.type;
}
function g_(e, t, n) {
  let r = Te(t.messages) ? t.messages : {};
  "__i18nGlobal" in n && (r = Ff(e.locale.value, {
    messages: r,
    __i18n: n.__i18nGlobal
  }));
  const o = Object.keys(r);
  o.length && o.forEach((a) => {
    e.mergeLocaleMessage(a, r[a]);
  });
  {
    if (Te(t.datetimeFormats)) {
      const a = Object.keys(t.datetimeFormats);
      a.length && a.forEach((i) => {
        e.mergeDateTimeFormat(i, t.datetimeFormats[i]);
      });
    }
    if (Te(t.numberFormats)) {
      const a = Object.keys(t.numberFormats);
      a.length && a.forEach((i) => {
        e.mergeNumberFormat(i, t.numberFormats[i]);
      });
    }
  }
}
function zc(e) {
  return z($v, null, e, 0);
}
const Gc = "__INTLIFY_META__", Xc = () => [], y_ = () => !1;
let Kc = 0;
function Jc(e) {
  return (t, n, r, o) => e(n, r, Hn() || void 0, o);
}
const __ = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = Hn();
  let t = null;
  return e && (t = Hf(e)[Gc]) ? { [Gc]: t } : null;
};
function Yf(e = {}, t) {
  const { __root: n, __injectWithOption: r } = e, o = n === void 0, a = e.flatJson, i = xt ? Q : cl, l = !!e.translateExistCompatible;
  process.env.NODE_ENV !== "production" && l && wf(Yr(st.NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG));
  let s = Be(e.inheritLocale) ? e.inheritLocale : !0;
  const c = i(
    // prettier-ignore
    n && s ? n.locale.value : ce(e.locale) ? e.locale : Ya
  ), u = i(
    // prettier-ignore
    n && s ? n.fallbackLocale.value : ce(e.fallbackLocale) || Xe(e.fallbackLocale) || Ce(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : c.value
  ), f = i(Ff(c.value, e)), d = i(Ce(e.datetimeFormats) ? e.datetimeFormats : { [c.value]: {} }), v = i(Ce(e.numberFormats) ? e.numberFormats : { [c.value]: {} });
  let p = n ? n.missingWarn : Be(e.missingWarn) || Fa(e.missingWarn) ? e.missingWarn : !0, g = n ? n.fallbackWarn : Be(e.fallbackWarn) || Fa(e.fallbackWarn) ? e.fallbackWarn : !0, m = n ? n.fallbackRoot : Be(e.fallbackRoot) ? e.fallbackRoot : !0, h = !!e.fallbackFormat, y = xe(e.missing) ? e.missing : null, w = xe(e.missing) ? Jc(e.missing) : null, O = xe(e.postTranslation) ? e.postTranslation : null, $ = n ? n.warnHtmlMessage : Be(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, C = !!e.escapeParameter;
  const b = n ? n.modifiers : Ce(e.modifiers) ? e.modifiers : {};
  let E = e.pluralRules || n && n.pluralRules, k;
  k = (() => {
    o && xc(null);
    const Z = {
      version: d_,
      locale: c.value,
      fallbackLocale: u.value,
      messages: f.value,
      modifiers: b,
      pluralRules: E,
      missing: w === null ? void 0 : w,
      missingWarn: p,
      fallbackWarn: g,
      fallbackFormat: h,
      unresolving: !0,
      postTranslation: O === null ? void 0 : O,
      warnHtmlMessage: $,
      escapeParameter: C,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    Z.datetimeFormats = d.value, Z.numberFormats = v.value, Z.__datetimeFormatters = Ce(k) ? k.__datetimeFormatters : void 0, Z.__numberFormatters = Ce(k) ? k.__numberFormatters : void 0, process.env.NODE_ENV !== "production" && (Z.__v_emitter = Ce(k) ? k.__v_emitter : void 0);
    const oe = Qy(Z);
    return o && xc(oe), oe;
  })(), lo(k, c.value, u.value);
  function S() {
    return [
      c.value,
      u.value,
      f.value,
      d.value,
      v.value
    ];
  }
  const A = te({
    get: () => c.value,
    set: (Z) => {
      c.value = Z, k.locale = c.value;
    }
  }), x = te({
    get: () => u.value,
    set: (Z) => {
      u.value = Z, k.fallbackLocale = u.value, lo(k, c.value, Z);
    }
  }), B = te(() => f.value), N = /* @__PURE__ */ te(() => d.value), V = /* @__PURE__ */ te(() => v.value);
  function G() {
    return xe(O) ? O : null;
  }
  function L(Z) {
    O = Z, k.postTranslation = Z;
  }
  function F() {
    return y;
  }
  function M(Z) {
    Z !== null && (w = Jc(Z)), y = Z, k.missing = w;
  }
  function K(Z, oe) {
    return Z !== "translate" || !oe.resolvedMessage;
  }
  const re = (Z, oe, ke, je, bn, pa) => {
    S();
    let Cr;
    try {
      process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, o || (k.fallbackContext = n ? Zy() : void 0), Cr = Z(k);
    } finally {
      process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, o || (k.fallbackContext = void 0);
    }
    if (ke !== "translate exists" && // for not `te` (e.g `t`)
    rt(Cr) && Cr === fi || ke === "translate exists" && !Cr) {
      const [Zn, kv] = oe();
      if (process.env.NODE_ENV !== "production" && n && ce(Zn) && K(ke, kv) && (m && (pi(g, Zn) || Nf(p, Zn)) && Jt(Yr(st.FALLBACK_TO_ROOT, {
        key: Zn,
        type: ke
      })), process.env.NODE_ENV !== "production")) {
        const { __v_emitter: gc } = k;
        gc && m && gc.emit("fallback", {
          type: ke,
          key: Zn,
          to: "global",
          groupId: `${ke}:${Zn}`
        });
      }
      return n && m ? je(n) : bn(Zn);
    } else {
      if (pa(Cr))
        return Cr;
      throw At(Ae.UNEXPECTED_RETURN_TYPE);
    }
  };
  function fe(...Z) {
    return re((oe) => Reflect.apply(Fc, null, [oe, ...Z]), () => Ss(...Z), "translate", (oe) => Reflect.apply(oe.t, oe, [...Z]), (oe) => oe, (oe) => ce(oe));
  }
  function me(...Z) {
    const [oe, ke, je] = Z;
    if (je && !Te(je))
      throw At(Ae.INVALID_ARGUMENT);
    return fe(oe, ke, ut({ resolvedMessage: !0 }, je || {}));
  }
  function Se(...Z) {
    return re((oe) => Reflect.apply(Yc, null, [oe, ...Z]), () => ks(...Z), "datetime format", (oe) => Reflect.apply(oe.d, oe, [...Z]), () => ja, (oe) => ce(oe));
  }
  function ne(...Z) {
    return re((oe) => Reflect.apply(Wc, null, [oe, ...Z]), () => Is(...Z), "number format", (oe) => Reflect.apply(oe.n, oe, [...Z]), () => ja, (oe) => ce(oe));
  }
  function j(Z) {
    return Z.map((oe) => ce(oe) || rt(oe) || Be(oe) ? zc(String(oe)) : oe);
  }
  const T = {
    normalize: j,
    interpolate: (Z) => Z,
    type: "vnode"
  };
  function D(...Z) {
    return re(
      (oe) => {
        let ke;
        const je = oe;
        try {
          je.processor = T, ke = Reflect.apply(Fc, null, [je, ...Z]);
        } finally {
          je.processor = null;
        }
        return ke;
      },
      () => Ss(...Z),
      "translate",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (oe) => oe[Os](...Z),
      (oe) => [zc(oe)],
      (oe) => Xe(oe)
    );
  }
  function R(...Z) {
    return re(
      (oe) => Reflect.apply(Wc, null, [oe, ...Z]),
      () => Is(...Z),
      "number format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (oe) => oe[Ps](...Z),
      Xc,
      (oe) => ce(oe) || Xe(oe)
    );
  }
  function J(...Z) {
    return re(
      (oe) => Reflect.apply(Yc, null, [oe, ...Z]),
      () => ks(...Z),
      "datetime format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (oe) => oe[Ds](...Z),
      Xc,
      (oe) => ce(oe) || Xe(oe)
    );
  }
  function I(Z) {
    E = Z, k.pluralRules = E;
  }
  function P(Z, oe) {
    return re(() => {
      if (!Z)
        return !1;
      const ke = ce(oe) ? oe : c.value, je = ie(ke), bn = k.messageResolver(je, Z);
      return l ? bn != null : Nn(bn) || kt(bn) || ce(bn);
    }, () => [Z], "translate exists", (ke) => Reflect.apply(ke.te, ke, [Z, oe]), y_, (ke) => Be(ke));
  }
  function H(Z) {
    let oe = null;
    const ke = If(k, u.value, c.value);
    for (let je = 0; je < ke.length; je++) {
      const bn = f.value[ke[je]] || {}, pa = k.messageResolver(bn, Z);
      if (pa != null) {
        oe = pa;
        break;
      }
    }
    return oe;
  }
  function ee(Z) {
    const oe = H(Z);
    return oe ?? (n ? n.tm(Z) || {} : {});
  }
  function ie(Z) {
    return f.value[Z] || {};
  }
  function ve(Z, oe) {
    if (a) {
      const ke = { [Z]: oe };
      for (const je in ke)
        Ha(ke, je) && Po(ke[je]);
      oe = ke[Z];
    }
    f.value[Z] = oe, k.messages = f.value;
  }
  function Re(Z, oe) {
    f.value[Z] = f.value[Z] || {};
    const ke = { [Z]: oe };
    if (a)
      for (const je in ke)
        Ha(ke, je) && Po(ke[je]);
    oe = ke[Z], Pa(oe, f.value[Z]), k.messages = f.value;
  }
  function Me(Z) {
    return d.value[Z] || {};
  }
  function We(Z, oe) {
    d.value[Z] = oe, k.datetimeFormats = d.value, jc(k, Z, oe);
  }
  function Fe(Z, oe) {
    d.value[Z] = ut(d.value[Z] || {}, oe), k.datetimeFormats = d.value, jc(k, Z, oe);
  }
  function _n(Z) {
    return v.value[Z] || {};
  }
  function fa(Z, oe) {
    v.value[Z] = oe, k.numberFormats = v.value, qc(k, Z, oe);
  }
  function Sv(Z, oe) {
    v.value[Z] = ut(v.value[Z] || {}, oe), k.numberFormats = v.value, qc(k, Z, oe);
  }
  Kc++, n && xt && (Le(n.locale, (Z) => {
    s && (c.value = Z, k.locale = Z, lo(k, c.value, u.value));
  }), Le(n.fallbackLocale, (Z) => {
    s && (u.value = Z, k.fallbackLocale = Z, lo(k, c.value, u.value));
  }));
  const qe = {
    id: Kc,
    locale: A,
    fallbackLocale: x,
    get inheritLocale() {
      return s;
    },
    set inheritLocale(Z) {
      s = Z, Z && n && (c.value = n.locale.value, u.value = n.fallbackLocale.value, lo(k, c.value, u.value));
    },
    get availableLocales() {
      return Object.keys(f.value).sort();
    },
    messages: B,
    get modifiers() {
      return b;
    },
    get pluralRules() {
      return E || {};
    },
    get isGlobal() {
      return o;
    },
    get missingWarn() {
      return p;
    },
    set missingWarn(Z) {
      p = Z, k.missingWarn = p;
    },
    get fallbackWarn() {
      return g;
    },
    set fallbackWarn(Z) {
      g = Z, k.fallbackWarn = g;
    },
    get fallbackRoot() {
      return m;
    },
    set fallbackRoot(Z) {
      m = Z;
    },
    get fallbackFormat() {
      return h;
    },
    set fallbackFormat(Z) {
      h = Z, k.fallbackFormat = h;
    },
    get warnHtmlMessage() {
      return $;
    },
    set warnHtmlMessage(Z) {
      $ = Z, k.warnHtmlMessage = Z;
    },
    get escapeParameter() {
      return C;
    },
    set escapeParameter(Z) {
      C = Z, k.escapeParameter = Z;
    },
    t: fe,
    getLocaleMessage: ie,
    setLocaleMessage: ve,
    mergeLocaleMessage: Re,
    getPostTranslationHandler: G,
    setPostTranslationHandler: L,
    getMissingHandler: F,
    setMissingHandler: M,
    [m_]: I
  };
  return qe.datetimeFormats = N, qe.numberFormats = V, qe.rt = me, qe.te = P, qe.tm = ee, qe.d = Se, qe.n = ne, qe.getDateTimeFormat = Me, qe.setDateTimeFormat = We, qe.mergeDateTimeFormat = Fe, qe.getNumberFormat = _n, qe.setNumberFormat = fa, qe.mergeNumberFormat = Sv, qe[v_] = r, qe[Os] = D, qe[Ds] = J, qe[Ps] = R, process.env.NODE_ENV !== "production" && (qe[Do] = (Z) => {
    k.__v_emitter = Z;
  }, qe[As] = () => {
    k.__v_emitter = void 0;
  }), qe;
}
const _l = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (e) => e === "parent" || e === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function b_({ slots: e }, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((r, o) => [
    ...r,
    // prettier-ignore
    ...o.type === Oe ? o.children : [o]
  ], []) : t.reduce((n, r) => {
    const o = e[r];
    return o && (n[r] = o()), n;
  }, {});
}
function jf(e) {
  return Oe;
}
const E_ = /* @__PURE__ */ pe({
  /* eslint-disable */
  name: "i18n-t",
  props: ut({
    keypath: {
      type: String,
      required: !0
    },
    plural: {
      type: [Number, String],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator: (e) => rt(e) || !isNaN(e)
    }
  }, _l),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const { slots: n, attrs: r } = t, o = e.i18n || De({
      useScope: e.scope,
      __useComponent: !0
    });
    return () => {
      const a = Object.keys(n).filter((f) => f !== "_"), i = {};
      e.locale && (i.locale = e.locale), e.plural !== void 0 && (i.plural = ce(e.plural) ? +e.plural : e.plural);
      const l = b_(t, a), s = o[Os](e.keypath, l, i), c = ut({}, r), u = ce(e.tag) || Te(e.tag) ? e.tag : jf();
      return dr(u, c, s);
    };
  }
}), Fi = E_;
function w_(e) {
  return Xe(e) && !ce(e[0]);
}
function Wf(e, t, n, r) {
  const { slots: o, attrs: a } = t;
  return () => {
    const i = { part: !0 };
    let l = {};
    e.locale && (i.locale = e.locale), ce(e.format) ? i.key = e.format : Te(e.format) && (ce(e.format.key) && (i.key = e.format.key), l = Object.keys(e.format).reduce((d, v) => n.includes(v) ? ut({}, d, { [v]: e.format[v] }) : d, {}));
    const s = r(e.value, i, l);
    let c = [i.key];
    Xe(s) ? c = s.map((d, v) => {
      const p = o[d.type], g = p ? p({ [d.type]: d.value, index: v, parts: s }) : [d.value];
      return w_(g) && (g[0].key = `${d.type}-${v}`), g;
    }) : ce(s) && (c = [s]);
    const u = ut({}, a), f = ce(e.tag) || Te(e.tag) ? e.tag : jf();
    return dr(f, u, c);
  };
}
const C_ = /* @__PURE__ */ pe({
  /* eslint-disable */
  name: "i18n-n",
  props: ut({
    value: {
      type: Number,
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, _l),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || De({
      useScope: "parent",
      __useComponent: !0
    });
    return Wf(e, t, Bf, (...r) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[Ps](...r)
    ));
  }
}), Zc = C_, T_ = /* @__PURE__ */ pe({
  /* eslint-disable */
  name: "i18n-d",
  props: ut({
    value: {
      type: [Number, Date],
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, _l),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || De({
      useScope: "parent",
      __useComponent: !0
    });
    return Wf(e, t, xf, (...r) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[Ds](...r)
    ));
  }
}), Qc = T_;
function S_(e, t) {
  const n = e;
  if (e.mode === "composition")
    return n.__getInstance(t) || e.global;
  {
    const r = n.__getInstance(t);
    return r != null ? r.__composer : e.global.__composer;
  }
}
function k_(e) {
  const t = (i) => {
    const { instance: l, modifiers: s, value: c } = i;
    if (!l || !l.$)
      throw At(Ae.UNEXPECTED_ERROR);
    const u = S_(e, l.$);
    process.env.NODE_ENV !== "production" && s.preserve && Jt(Yr(st.NOT_SUPPORTED_PRESERVE));
    const f = eu(c);
    return [
      Reflect.apply(u.t, u, [...tu(f)]),
      u
    ];
  };
  return {
    created: (i, l) => {
      const [s, c] = t(l);
      xt && e.global === c && (i.__i18nWatcher = Le(c.locale, () => {
        l.instance && l.instance.$forceUpdate();
      })), i.__composer = c, i.textContent = s;
    },
    unmounted: (i) => {
      xt && i.__i18nWatcher && (i.__i18nWatcher(), i.__i18nWatcher = void 0, delete i.__i18nWatcher), i.__composer && (i.__composer = void 0, delete i.__composer);
    },
    beforeUpdate: (i, { value: l }) => {
      if (i.__composer) {
        const s = i.__composer, c = eu(l);
        i.textContent = Reflect.apply(s.t, s, [
          ...tu(c)
        ]);
      }
    },
    getSSRProps: (i) => {
      const [l] = t(i);
      return { textContent: l };
    }
  };
}
function eu(e) {
  if (ce(e))
    return { path: e };
  if (Ce(e)) {
    if (!("path" in e))
      throw At(Ae.REQUIRED_VALUE, "path");
    return e;
  } else
    throw At(Ae.INVALID_VALUE);
}
function tu(e) {
  const { path: t, locale: n, args: r, choice: o, plural: a } = e, i = {}, l = r || {};
  return ce(n) && (i.locale = n), rt(o) && (i.plural = o), rt(a) && (i.plural = a), [t, l, i];
}
function I_(e, t, ...n) {
  const r = Ce(n[0]) ? n[0] : {}, o = !!r.useI18nComponentName, a = Be(r.globalInstall) ? r.globalInstall : !0;
  process.env.NODE_ENV !== "production" && a && o && Jt(Yr(st.COMPONENT_NAME_LEGACY_COMPATIBLE, {
    name: Fi.name
  })), a && ([o ? "i18n" : Fi.name, "I18nT"].forEach((i) => e.component(i, Fi)), [Zc.name, "I18nN"].forEach((i) => e.component(i, Zc)), [Qc.name, "I18nD"].forEach((i) => e.component(i, Qc))), e.directive("t", k_(t));
}
const Hi = {
  "vue-devtools-plugin-vue-i18n": "Vue I18n devtools",
  "vue-i18n-resource-inspector": "I18n Resources",
  "vue-i18n-timeline": "Vue I18n"
}, O_ = {
  "vue-i18n-resource-inspector": "Search for scopes ..."
}, D_ = {
  "vue-i18n-timeline": 16764185
}, qf = "vue-i18n: composer properties";
let Ns;
async function P_(e, t) {
  return new Promise((n, r) => {
    try {
      ci({
        id: "vue-devtools-plugin-vue-i18n",
        label: Hi[
          "vue-devtools-plugin-vue-i18n"
          /* VueDevToolsIDs.PLUGIN */
        ],
        packageName: "vue-i18n",
        homepage: "https://vue-i18n.intlify.dev",
        logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
        componentStateTypes: [qf],
        app: e
        // eslint-disable-line @typescript-eslint/no-explicit-any
      }, (o) => {
        Ns = o, o.on.visitComponentTree(({ componentInstance: i, treeNode: l }) => {
          A_(i, l, t);
        }), o.on.inspectComponent(({ componentInstance: i, instanceData: l }) => {
          i.vnode.el && i.vnode.el.__VUE_I18N__ && l && (t.mode === "legacy" ? i.vnode.el.__VUE_I18N__ !== t.global.__composer && nu(l, i.vnode.el.__VUE_I18N__) : nu(l, i.vnode.el.__VUE_I18N__));
        }), o.addInspector({
          id: "vue-i18n-resource-inspector",
          label: Hi[
            "vue-i18n-resource-inspector"
            /* VueDevToolsIDs.CUSTOM_INSPECTOR */
          ],
          icon: "language",
          treeFilterPlaceholder: O_[
            "vue-i18n-resource-inspector"
            /* VueDevToolsIDs.CUSTOM_INSPECTOR */
          ]
        }), o.on.getInspectorTree((i) => {
          i.app === e && i.inspectorId === "vue-i18n-resource-inspector" && M_(i, t);
        });
        const a = /* @__PURE__ */ new Map();
        o.on.getInspectorState(async (i) => {
          if (i.app === e && i.inspectorId === "vue-i18n-resource-inspector")
            if (o.unhighlightElement(), B_(i, t), i.nodeId === "global") {
              if (!a.has(i.app)) {
                const [l] = await o.getComponentInstances(i.app);
                a.set(i.app, l);
              }
              o.highlightElement(a.get(i.app));
            } else {
              const l = x_(i.nodeId, t);
              l && o.highlightElement(l);
            }
        }), o.on.editInspectorState((i) => {
          i.app === e && i.inspectorId === "vue-i18n-resource-inspector" && U_(i, t);
        }), o.addTimelineLayer({
          id: "vue-i18n-timeline",
          label: Hi[
            "vue-i18n-timeline"
            /* VueDevToolsIDs.TIMELINE */
          ],
          color: D_[
            "vue-i18n-timeline"
            /* VueDevToolsIDs.TIMELINE */
          ]
        }), n(!0);
      });
    } catch (o) {
      console.error(o), r(!1);
    }
  });
}
function zf(e) {
  return e.type.name || e.type.displayName || e.type.__file || "Anonymous";
}
function A_(e, t, n) {
  const r = n.mode === "composition" ? n.global : n.global.__composer;
  if (e && e.vnode.el && e.vnode.el.__VUE_I18N__ && e.vnode.el.__VUE_I18N__ !== r) {
    const o = {
      label: `i18n (${zf(e)} Scope)`,
      textColor: 0,
      backgroundColor: 16764185
    };
    t.tags.push(o);
  }
}
function nu(e, t) {
  const n = qf;
  e.state.push({
    type: n,
    key: "locale",
    editable: !0,
    value: t.locale.value
  }), e.state.push({
    type: n,
    key: "availableLocales",
    editable: !1,
    value: t.availableLocales
  }), e.state.push({
    type: n,
    key: "fallbackLocale",
    editable: !0,
    value: t.fallbackLocale.value
  }), e.state.push({
    type: n,
    key: "inheritLocale",
    editable: !0,
    value: t.inheritLocale
  }), e.state.push({
    type: n,
    key: "messages",
    editable: !1,
    value: bl(t.messages.value)
  }), e.state.push({
    type: n,
    key: "datetimeFormats",
    editable: !1,
    value: t.datetimeFormats.value
  }), e.state.push({
    type: n,
    key: "numberFormats",
    editable: !1,
    value: t.numberFormats.value
  });
}
function bl(e) {
  const t = {};
  return Object.keys(e).forEach((n) => {
    const r = e[n];
    xe(r) && "source" in r ? t[n] = R_(r) : Nn(r) && r.loc && r.loc.source ? t[n] = r.loc.source : Te(r) ? t[n] = bl(r) : t[n] = r;
  }), t;
}
const $_ = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "&": "&amp;"
};
function N_(e) {
  return e.replace(/[<>"&]/g, L_);
}
function L_(e) {
  return $_[e] || e;
}
function R_(e) {
  return {
    _custom: {
      type: "function",
      display: `<span>ƒ</span> ${e.source ? `("${N_(e.source)}")` : "(?)"}`
    }
  };
}
function M_(e, t) {
  e.rootNodes.push({
    id: "global",
    label: "Global Scope"
  });
  const n = t.mode === "composition" ? t.global : t.global.__composer;
  for (const [r, o] of t.__instances) {
    const a = t.mode === "composition" ? o : o.__composer;
    n !== a && e.rootNodes.push({
      id: a.id.toString(),
      label: `${zf(r)} Scope`
    });
  }
}
function x_(e, t) {
  let n = null;
  if (e !== "global") {
    for (const [r, o] of t.__instances.entries())
      if (o.id.toString() === e) {
        n = r;
        break;
      }
  }
  return n;
}
function Gf(e, t) {
  if (e === "global")
    return t.mode === "composition" ? t.global : t.global.__composer;
  {
    const n = Array.from(t.__instances.values()).find((r) => r.id.toString() === e);
    return n ? t.mode === "composition" ? n : n.__composer : null;
  }
}
function B_(e, t) {
  const n = Gf(e.nodeId, t);
  return n && (e.state = V_(n)), null;
}
function V_(e) {
  const t = {}, n = "Locale related info", r = [
    {
      type: n,
      key: "locale",
      editable: !0,
      value: e.locale.value
    },
    {
      type: n,
      key: "fallbackLocale",
      editable: !0,
      value: e.fallbackLocale.value
    },
    {
      type: n,
      key: "availableLocales",
      editable: !1,
      value: e.availableLocales
    },
    {
      type: n,
      key: "inheritLocale",
      editable: !0,
      value: e.inheritLocale
    }
  ];
  t[n] = r;
  const o = "Locale messages info", a = [
    {
      type: o,
      key: "messages",
      editable: !1,
      value: bl(e.messages.value)
    }
  ];
  t[o] = a;
  {
    const i = "Datetime formats info", l = [
      {
        type: i,
        key: "datetimeFormats",
        editable: !1,
        value: e.datetimeFormats.value
      }
    ];
    t[i] = l;
    const s = "Datetime formats info", c = [
      {
        type: s,
        key: "numberFormats",
        editable: !1,
        value: e.numberFormats.value
      }
    ];
    t[s] = c;
  }
  return t;
}
function Ls(e, t) {
  if (Ns) {
    let n;
    t && "groupId" in t && (n = t.groupId, delete t.groupId), Ns.addTimelineEvent({
      layerId: "vue-i18n-timeline",
      event: {
        title: e,
        groupId: n,
        time: Date.now(),
        meta: {},
        data: t || {},
        logType: e === "compile-error" ? "error" : e === "fallback" || e === "missing" ? "warning" : "default"
      }
    });
  }
}
function U_(e, t) {
  const n = Gf(e.nodeId, t);
  if (n) {
    const [r] = e.path;
    r === "locale" && ce(e.state.value) ? n.locale.value = e.state.value : r === "fallbackLocale" && (ce(e.state.value) || Xe(e.state.value) || Te(e.state.value)) ? n.fallbackLocale.value = e.state.value : r === "inheritLocale" && Be(e.state.value) && (n.inheritLocale = e.state.value);
  }
}
const F_ = /* @__PURE__ */ Kt("global-vue-i18n");
function H_(e = {}, t) {
  const n = Be(e.globalInjection) ? e.globalInjection : !0, r = !0, o = /* @__PURE__ */ new Map(), [a, i] = Y_(e), l = /* @__PURE__ */ Kt(process.env.NODE_ENV !== "production" ? "vue-i18n" : "");
  process.env.NODE_ENV;
  function s(f) {
    return o.get(f) || null;
  }
  function c(f, d) {
    o.set(f, d);
  }
  function u(f) {
    o.delete(f);
  }
  {
    const f = {
      // mode
      get mode() {
        return "composition";
      },
      // allowComposition
      get allowComposition() {
        return r;
      },
      // install plugin
      async install(d, ...v) {
        if (process.env.NODE_ENV !== "production" && (d.__VUE_I18N__ = f), d.__VUE_I18N_SYMBOL__ = l, d.provide(d.__VUE_I18N_SYMBOL__, f), Ce(v[0])) {
          const m = v[0];
          f.__composerExtend = m.__composerExtend, f.__vueI18nExtend = m.__vueI18nExtend;
        }
        let p = null;
        n && (p = J_(d, f.global)), I_(d, f, ...v);
        const g = d.unmount;
        if (d.unmount = () => {
          p && p(), f.dispose(), g();
        }, process.env.NODE_ENV !== "production") {
          if (!await P_(d, f))
            throw At(Ae.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN);
          const h = Cf();
          {
            const y = i;
            y[Do] && y[Do](h);
          }
          h.on("*", Ls);
        }
      },
      // global accessor
      get global() {
        return i;
      },
      dispose() {
        a.stop();
      },
      // @internal
      __instances: o,
      // @internal
      __getInstance: s,
      // @internal
      __setInstance: c,
      // @internal
      __deleteInstance: u
    };
    return f;
  }
}
function De(e = {}) {
  const t = Hn();
  if (t == null)
    throw At(Ae.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw At(Ae.NOT_INSTALLED);
  const n = j_(t), r = q_(n), o = Hf(t), a = W_(e, o);
  if (a === "global")
    return g_(r, e, o), r;
  if (a === "parent") {
    let s = z_(n, t, e.__useComponent);
    return s == null && (process.env.NODE_ENV !== "production" && Jt(Yr(st.NOT_FOUND_PARENT_SCOPE)), s = r), s;
  }
  const i = n;
  let l = i.__getInstance(t);
  if (l == null) {
    const s = ut({}, e);
    "__i18n" in o && (s.__i18n = o.__i18n), r && (s.__root = r), l = Yf(s), i.__composerExtend && (l[$s] = i.__composerExtend(l)), X_(i, t, l), i.__setInstance(t, l);
  }
  return l;
}
function Y_(e, t, n) {
  const r = sl();
  {
    const o = r.run(() => Yf(e));
    if (o == null)
      throw At(Ae.UNEXPECTED_ERROR);
    return [r, o];
  }
}
function j_(e) {
  {
    const t = _t(e.isCE ? F_ : e.appContext.app.__VUE_I18N_SYMBOL__);
    if (!t)
      throw At(e.isCE ? Ae.NOT_INSTALLED_WITH_PROVIDE : Ae.UNEXPECTED_ERROR);
    return t;
  }
}
function W_(e, t) {
  return di(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function q_(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function z_(e, t, n = !1) {
  let r = null;
  const o = t.root;
  let a = G_(t, n);
  for (; a != null; ) {
    const i = e;
    if (e.mode === "composition" && (r = i.__getInstance(a)), r != null || o === a)
      break;
    a = a.parent;
  }
  return r;
}
function G_(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function X_(e, t, n) {
  let r = null;
  Ke(() => {
    if (process.env.NODE_ENV !== "production" && t.vnode.el) {
      t.vnode.el.__VUE_I18N__ = n, r = Cf();
      const o = n;
      o[Do] && o[Do](r), r.on("*", Ls);
    }
  }, t), ll(() => {
    const o = n;
    process.env.NODE_ENV !== "production" && t.vnode.el && t.vnode.el.__VUE_I18N__ && (r && r.off("*", Ls), o[As] && o[As](), delete t.vnode.el.__VUE_I18N__), e.__deleteInstance(t);
    const a = o[$s];
    a && (a(), delete o[$s]);
  }, t);
}
const K_ = [
  "locale",
  "fallbackLocale",
  "availableLocales"
], ru = ["t", "rt", "d", "n", "tm", "te"];
function J_(e, t) {
  const n = /* @__PURE__ */ Object.create(null);
  return K_.forEach((o) => {
    const a = Object.getOwnPropertyDescriptor(t, o);
    if (!a)
      throw At(Ae.UNEXPECTED_ERROR);
    const i = zt(a.value) ? {
      get() {
        return a.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(l) {
        a.value.value = l;
      }
    } : {
      get() {
        return a.get && a.get();
      }
    };
    Object.defineProperty(n, o, i);
  }), e.config.globalProperties.$i18n = n, ru.forEach((o) => {
    const a = Object.getOwnPropertyDescriptor(t, o);
    if (!a || !a.value)
      throw At(Ae.UNEXPECTED_ERROR);
    Object.defineProperty(e.config.globalProperties, `$${o}`, a);
  }), () => {
    delete e.config.globalProperties.$i18n, ru.forEach((o) => {
      delete e.config.globalProperties[`$${o}`];
    });
  };
}
f_();
zy(a_);
Gy(Iy);
Xy(If);
if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
  const e = hl();
  e.__INTLIFY__ = !0, My(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
process.env.NODE_ENV;
const Xf = {
  afterMidnightsSlots: "After midnight:",
  date: "Date",
  pickATimeslot: "Pick a timeslot",
  selectDate: "Select date",
  selectTime: "Select time",
  selectTimeslot: "Select timeslot",
  time: "Time",
  today: "Today",
  tomorrow: "Tomorrow"
}, Kf = {
  adult: "Adult | { count } adults",
  child: "Child | { count } children",
  close: "Close",
  customizeYourExperience: "Customise your experience",
  family: "Family",
  guests: "Guests",
  mealsLeftWarning: "You have { count } meal left to chose | You have { count } meals left to chose",
  openTicket: "Open ticket",
  photo: "Photo | { count } photos",
  student: "Student",
  tickets: "Tickets",
  whoIsGoing: "Who's going?"
}, Jf = {
  addDiscountCode: "Add another discount",
  apply: "Apply",
  back: "Back to cart",
  cartIsEmpty: "Your cart is empty",
  delete: "Delete",
  discountCode: "Discount code (optional)",
  edit: "Edit",
  fee: "Booking fee",
  iHaveDiscountCode: "I have a discount code",
  remove: "Remove",
  selectACurrency: "Select a currency",
  startExploring: "Start exploring",
  startShopping: "Start shopping",
  subTotal: "Subtotal",
  tax: "Tax",
  timeslotIsExpired: "Product timeslot is expired",
  toCheckout: "To checkout",
  total: "Total",
  your: "Your cart ({ count })"
}, Zf = {
  agreement: "* I agree with the Terms and Conditions and the Privacy Policy",
  agreementWarning: "You must agree to the terms and conditions to go through the purchase.",
  back: "Back to details",
  bookingFeeNotice: "Displayed prices exclude any booking fees ({ fee } booking fee per transaction)",
  email: "Your e-mail address",
  emailWarning: "You must fill in the email field",
  entertainmentTax: ", and, if applicable, an additional entertainment tax of €{ fee } (per day) per ticket",
  expiredWarning: "Cart contains timeslots from the past.",
  name: "Your full name",
  nameWarning: "You must fill in the name field",
  newsletter: "{ siteTitle } may email me about my experience and special offers",
  nextStep: "Next step",
  payNow: "Pay now",
  payment: "Payment",
  personalDetails: "Your personal details",
  selectPaymentMethod: "Please select your payment method",
  summary: "Order summary",
  tickets: "Tickets",
  ticketsSentTo: "Your tickets will be sent to <b>{ email }</b>",
  upgrades: "Upgrades",
  validPricesInfo: "Prices are valid for another { time } minutes"
}, Qf = {
  back: "Back to upgrades",
  upsellBookSubtitle: "Make more memories with an extra experience.",
  upsellBookTitle: "Book together to save money"
}, ep = {
  Cancelled: "Payment is cancelled",
  Pending: "Payment is pending",
  Rebooked: "Rescheduled!",
  Refused: "Payment is refused",
  back: "Back to payment",
  downloadTickets: "Download tickets",
  enjoyYourTrip: "Booked!",
  errorOccurred: "Error occurred",
  moreActivities: "See more activities",
  paymentIsPending: "Payment is pending. Please stay on the page or check your email <b>{ email }</b> later.",
  success: "Please check your e-mail for the confirmation. The tickets will follow in a separate e-mail within the hour. If you do not receive them within an hour, please check your SPAM folder or contact us. We are happy to help.",
  thankForPurchase: "A confirmation email with your tickets is on its way to <b>{ email }</b>"
}, tp = {
  booking: "Booking your tickets...",
  nearly: "Nearly there!"
}, np = {
  customerService: "Excellent customer service",
  easyBooking: "Easy and secure booking",
  ticketOnSmartphone: "Ticket is directly available on smartphone"
}, rp = {
  addToCart: "Add to cart",
  bookNow: "Book now",
  booking: "{ count } booking | { count } bookings",
  enterEmail: "Please enter your email address",
  enterOrderReference: "Please enter your order reference",
  from: "From",
  loading: "Loading ...",
  showMore: "Show more info",
  submit: "Submit",
  unavailable: "Unavailable activity",
  update: "Update"
}, op = {
  customerDataHasBeenUpdated: "Customer data has been updated",
  error: "An error occurred",
  orderHasBeenUpdated: "Order has been updated",
  pricesHasBeenUpdated: "Prices have been updated",
  productHasBeenAdded: "Product has been added",
  productHasBeenRemoved: "Product has been removed",
  productHasBeenUpdated: "Product has been updated",
  success: "Success!",
  voucherHasBeenApplied: "Discount code { voucher } has been applied",
  voucherHasBeenDeleted: "Discount code { voucher } has been deleted",
  voucherNotFound: "Discount code { voucher } not found"
}, ap = {
  AddonParentRequired: "Extra experiences cannot be booked without a main experience",
  AddonQuantityLimit: "The maximum amount of guests that can be booked for an extra experience depends on the number of guests chosen for the main experience.",
  InvalidAddons: "Payment is not possible because one or more extra experiences are missing a main experience.",
  ADYEN_ERROR: "We received an error message from the Adyen Payment Gateway. Please try again later.",
  CART_EDIT_DISABLED: "You cannot edit your cart because you used the Self Rebook option.",
  CART_NOT_FOUND: "Your cart seems to be missing. Try adding items again.",
  DuplicateTimeslotInRequest: "One or more products in your cart have conflicting timeslots. Please edit your cart and try again.",
  EmptyCart: "Payment is not possible because your cart is empty. Add a product and try again.",
  MissingCustomerInfo: "There seem to be some personal details missing. Please review them to continue.",
  OldTimeslots: "Looks like some of your chosen activities have timeslots that are set in the past. Please edit them to continue.",
  SERVER_ERROR: "Oops, an error occurred while processing your request. Please try again.",
  TICKETHUB_CREATE_RESERVATION_CONFLICT: "One or more products in your cart have conflicting timeslots. Please edit your cart and try again.",
  TICKETHUB_CREATE_RESERVATION_ERROR: "We received an error message from TicketHub. Please try again later.",
  TICKETHUB_ERROR: "We received an error message from TicketHub. Please try again later."
}, Z_ = {
  calendar: Xf,
  options: Kf,
  cart: Jf,
  checkout: Zf,
  upgrades: Qf,
  payment: ep,
  paymentLoader: tp,
  achievements: np,
  booking: rp,
  toast: op,
  THError: ap
}, Q_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  THError: ap,
  achievements: np,
  booking: rp,
  calendar: Xf,
  cart: Jf,
  checkout: Zf,
  default: Z_,
  options: Kf,
  payment: ep,
  paymentLoader: tp,
  toast: op,
  upgrades: Qf
}, Symbol.toStringTag, { value: "Module" })), ip = {
  afterMidnightsSlots: "Nach Mitternacht:",
  date: "Datum",
  pickATimeslot: "Zeitfenster auswählen",
  selectDate: "Wählen Sie einen Tag aus",
  selectTime: "Zeit auswählen",
  selectTimeslot: "Zeitfenster auswählen",
  time: "Uhrzeit",
  today: "Heute",
  tomorrow: "Morgen"
}, sp = {
  adult: "Erwachsene | { count } erwachsene",
  child: "Kind | { count } kinder",
  close: "Schließen",
  customizeYourExperience: "Personalisieren Sie Ihr Erlebnis",
  family: "Familie",
  guests: "Gäste",
  mealsLeftWarning: "Sie haben noch { count } Mahlzeit zur Auswahl | Sie haben noch { count } Mahlzeiten zur Auswahl",
  openTicket: "offenes Ticket",
  photo: "Foto | { count } Fotos",
  student: "Student",
  tickets: "Tickets",
  whoIsGoing: "Wer kommt mit? "
}, lp = {
  addDiscountCode: "Einen weiteren Rabattcode hinzufügen",
  apply: "Anwenden",
  back: "Zurück zum warenkorb",
  cartIsEmpty: "Ihr warenkorb ist leer",
  delete: "Entfernen",
  discountCode: "Rabattcode (optional)",
  edit: "bearbeiten",
  fee: "Reservierungsgebühr",
  iHaveDiscountCode: "Ich habe einen Rabattcode",
  remove: "Entfernen",
  selectACurrency: "Währung auswählen",
  startExploring: "Jetzt entdecken",
  startShopping: "Einkaufen beginnen",
  subTotal: "Zwischensumme",
  tax: "Steuern",
  timeslotIsExpired: "Das Zeitfenster für das Produkt ist abgelaufen",
  toCheckout: "Zur Kasse gehen",
  total: "Insgesamt",
  your: "Ihr Einkaufswagen ({ count })"
}, cp = {
  agreement: "* Ich stimme den Allgemeinen Geschäftsbedingungen und der Datenschutzrichtlinie zu",
  agreementWarning: "Sie müssen den Bedingungen zustimmen, um den Kauf abzuschließen",
  back: "Zurück zu den Details",
  bookingFeeNotice: "Die angegebenen Preise sind exklusive Reservierungsgebühren ({ fee } Reservierungsgebühr pro Transaktion)",
  email: "Ihre E-Mail Adresse",
  emailWarning: "Sie müssen das E-Mail-Feld ausfüllen",
  entertainmentTax: " und ggf. einer zusätzlichen Vergnügungssteuer von €{ fee } (pro Tag) pro Ticket",
  expiredWarning: "Ihr Warenkorb enthält Zeitfenster, die abgelaufen sind",
  name: "Ihr vollständiger Name",
  nameWarning: "Sie müssen das Namensfeld ausfüllen",
  newsletter: "Die { siteTitle } darf mich per E-Mail über meine Erfahrungen und Sonderangebote informieren.",
  nextStep: "Nächster Schritt",
  payNow: "Jetzt bezahlen",
  payment: "Zahlung",
  personalDetails: "Ihre persönlichen Angaben",
  selectPaymentMethod: "Wählen Sie Ihre Zahlungsmethode",
  summary: "Bestellübersicht",
  tickets: "Tickets",
  ticketsSentTo: "Ihre Tickets werden an folgende Adresse geschickt: <b>{ email }</b>",
  upgrades: "Upgrades",
  validPricesInfo: "Preise sind für weitere {time} Minuten gültig"
}, up = {
  back: "Zurück zu den Upgrades",
  upsellBookSubtitle: "Schaffen Sie mehr Erinnerungen mit einem zusätzlichen Erlebnis.",
  upsellBookTitle: "Kombinieren und Geld sparen"
}, dp = {
  Cancelled: "Die Zahlung wird annulliert",
  Pending: "Die Zahlung ist ausstehend",
  Rebooked: "umdisponiert",
  Refused: "Zahlung verweigert",
  back: "Zurück zu Bezahlung",
  downloadTickets: "Tickets herunterladen",
  enjoyYourTrip: "gebucht!",
  errorOccurred: "Fehler aufgetreten",
  moreActivities: "Siehe mehr Aktivitäten",
  paymentIsPending: "Die Zahlung steht noch aus. Bleiben Sie bitte auf der Seite oder schauen Sie später in Ihre E-Mail.",
  success: "Bitte prüfen Sie Ihre E-Mail für die Bestätigung. Die Tickets werden innerhalb einer Stunde in einer separaten E-Mail verschickt. Sollten Sie sie nicht innerhalb einer Stunde erhalten, überprüfen Sie bitte Ihren SPAM-Ordner oder kontaktieren Sie uns. Wir helfen Ihnen gerne weiter.",
  thankForPurchase: "Eine Bestätigungs-E-Mail mit Ihren Tickets ist auf dem Weg zu <b>{ email }</b>"
}, fp = {
  booking: "Tickets werden gebucht...",
  nearly: "Beinahe fertig!"
}, pp = {
  customerService: "Ausgezeichneter Kundenservice",
  easyBooking: "Einfache und sichere Buchung",
  ticketOnSmartphone: "Ticket ist direkt erhältlich"
}, hp = {
  addToCart: "Zum Warenkorb hinzufügen",
  bookNow: "Jetzt buchen",
  booking: "{ count } Buchungen",
  enterEmail: "Bitte geben Sie bitte Ihre Email-Adresse ein",
  enterOrderReference: "Bitte geben Sie Ihre Bestellnummer ein",
  from: "ab",
  loading: "Laden ...",
  showMore: "Mehr Informationen",
  submit: "Einreichen",
  unavailable: "Nicht verfügbare Aktivität",
  update: "Update"
}, mp = {
  customerDataHasBeenUpdated: "Die Kundendaten wurden aktualisiert",
  error: "Ein Fehler ist aufgetreten",
  orderHasBeenUpdated: "Die Bestellung wurde aktualisiert",
  pricesHasBeenUpdated: "Die Preise wurden aktualisiert",
  productHasBeenAdded: "Das Produkt wurde hinzugefügt",
  productHasBeenRemoved: "Das Produkt wurde entfernt",
  productHasBeenUpdated: "Das Produkt wurde aktualisiert",
  success: "Erfolg",
  voucherHasBeenApplied: "Rabattcode { voucher } wurde angewendet",
  voucherHasBeenDeleted: "Der Rabattcode { voucher } wurde gelöscht",
  voucherNotFound: "Rabattcode { voucher } nicht gefunden"
}, vp = {
  AddonParentRequired: "Zusatzerlebnisse können nicht ohne ein Haupterlebnis gebucht werden.",
  AddonQuantityLimit: "Die maximale Anzahl an Gästen, die für ein zusätzliches Erlebnis gebucht werden können, hängt von der Anzahl der Gäste ab, die für das Haupterlebnis ausgewählt wurden.",
  ADYEN_ERROR: "Wir haben eine Fehlermeldung vom Adyen Payment Gateway erhalten. Bitte versuchen Sie es später noch einmal.",
  CART_EDIT_DISABLED: "Sie können Ihren Warenkorb nicht bearbeiten, weil Sie die Option Selbst umbuchen verwendet haben.",
  CART_NOT_FOUND: "Ihr Warenkorb scheint zu fehlen. Versuchen Sie, erneut Artikel hinzuzufügen.",
  DuplicateTimeslotInRequest: "Ein oder mehrere Produkte in Ihrem Warenkorb haben widersprüchliche Zeitfenster. Bitte bearbeiten Sie Ihren Warenkorb und versuchen Sie es erneut.",
  EmptyCart: "Die Zahlung ist nicht möglich, da Ihr Warenkorb leer ist.",
  InvalidAddons: "Eine Zahlung ist nicht möglich, da ein oder mehrere zusätzliche Erlebnisse zu einem Haupterlebnis fehlen.",
  MissingCustomerInfo: "Es scheinen einige persönliche Angaben zu fehlen. Bitte überprüfen Sie diese, um fortzufahren.",
  OldTimeslots: "Es sieht so aus, als ob einige der von Ihnen gewählten Aktivitäten Zeitfenster haben, die in der Vergangenheit liegen. Bitte bearbeiten Sie diese, um fortzufahren.",
  SERVER_ERROR: "Ups, bei der Bearbeitung Ihrer Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
  TICKETHUB_CREATE_RESERVATION_CONFLICT: "Ein oder mehrere Produkte in Ihrem Warenkorb haben widersprüchliche Zeitfenster. Bitte bearbeiten Sie Ihren Warenkorb und versuchen Sie es erneut.",
  TICKETHUB_CREATE_RESERVATION_ERROR: "Wir haben eine Fehlermeldung von TicketHub erhalten. Bitte versuchen Sie es später noch einmal.",
  TICKETHUB_ERROR: "Wir haben eine Fehlermeldung von TicketHub erhalten. Bitte versuchen Sie es später noch einmal."
}, eb = {
  calendar: ip,
  options: sp,
  cart: lp,
  checkout: cp,
  upgrades: up,
  payment: dp,
  paymentLoader: fp,
  achievements: pp,
  booking: hp,
  toast: mp,
  THError: vp
}, tb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  THError: vp,
  achievements: pp,
  booking: hp,
  calendar: ip,
  cart: lp,
  checkout: cp,
  default: eb,
  options: sp,
  payment: dp,
  paymentLoader: fp,
  toast: mp,
  upgrades: up
}, Symbol.toStringTag, { value: "Module" })), gp = {
  afterMidnightsSlots: "Después de medianoche:",
  date: "Fecha",
  pickATimeslot: "Elige una hora",
  selectDate: "Elige un día",
  selectTime: "Elige una hora",
  selectTimeslot: "Elige una hora",
  time: "Hora",
  today: "Hoy",
  tomorrow: "Mañana"
}, yp = {
  adult: "Adulto | { count } adultos",
  child: "Niño | { count } niños",
  close: "Cerrado",
  customizeYourExperience: "Personalice su experiencia",
  family: "Family",
  guests: "Personas",
  mealsLeftWarning: "Falta { count } comida por elegir | Faltan { count } comidas por elegir",
  openTicket: "ticket abierto",
  photo: "Foto | { count } fotos",
  student: "Student",
  tickets: "Tickets",
  whoIsGoing: "¿Quién viene?"
}, _p = {
  addDiscountCode: "Añadir otro código de descuento",
  apply: "Aplicar",
  back: "Volver al carrito",
  cartIsEmpty: "Tu carrito está vacio",
  delete: "Eliminar",
  discountCode: "código de descuento (opcional)",
  edit: "Editar",
  fee: "Comisión de reserva",
  iHaveDiscountCode: "Tengo un código de descuento",
  remove: "Eliminar",
  selectACurrency: "Selecciona una moneda",
  startExploring: "Empezar a explorar",
  startShopping: "Empezar a comprar",
  subTotal: "Subtotal",
  tax: "Tasas",
  timeslotIsExpired: "La sesión ha caducado. Vuelve a elegir una hora.",
  toCheckout: "Pasar por caja",
  total: "Total",
  your: "Su cesta de la Compra ({ count })"
}, bp = {
  agreement: "* Acepto los Términos y Condiciones y la Política de Privacidad",
  agreementWarning: "Debe aceptar los términos y condiciones para completar la compra",
  back: "Volver a los detalles",
  bookingFeeNotice: "Los precios indicados no incluyen los gastos de reserva ({ fee } de gastos de reserva por transacción)",
  email: "Tu dirección de e-mail",
  emailWarning: "Debes rellenar el campo de correo electrónico",
  entertainmentTax: " y, si procede, una tasa adicional por espectáculo de €{ fee } por día y entrada",
  expiredWarning: "Su cesta contiene franjas horarias que han caducado",
  name: "Tu nombre completo",
  nameWarning: "Debes completar el campo de nombre",
  newsletter: "{ siteTitle } puede enviarme correos electrónicos sobre mi experiencia y ofertas especiales",
  nextStep: "Próximo paso",
  payNow: "Pagar ahora",
  payment: "Pago",
  personalDetails: "Tus datos personales",
  selectPaymentMethod: "Elija su forma de pago",
  summary: "Resumen del pedido",
  tickets: "entradas",
  ticketsSentTo: "Tus entradas serán enviadas a <b>{ email }</b>",
  upgrades: "Upgrades",
  validPricesInfo: "Los precios son válidos durante otros {time} minutos"
}, Ep = {
  back: "Volver a las mejoras",
  upsellBookSubtitle: "Crea más recuerdos con una experiencia adicional.",
  upsellBookTitle: "Combina productos para ahorrar dinero"
}, wp = {
  Cancelled: "Se cancela el pago",
  Pending: "Pago pendiente",
  Rebooked: "reprogramado",
  Refused: "pago denegado",
  back: "Volver al pago",
  downloadTickets: "Descargar tickets",
  enjoyYourTrip: "reservado!",
  errorOccurred: "error ocurrido",
  moreActivities: "Ver más actividades",
  paymentIsPending: "El pago está pendiente. Por favor, permanece en la página o comprueba tu correo electrónico <b>{ email }</b> más tarde.",
  success: "Consulta tu correo electrónico para recibir la confirmación. Las entradas se enviarán por correo electrónico dentro de una hora. Si no las recibes en una hora, comprueba tu carpeta de SPAM o ponte en contacto con nosotros. Estamos encantados de ayudarte.",
  thankForPurchase: "Recibirás un correo electrónico de confirmación con tus entradas."
}, Cp = {
  booking: "Reservando tus entradas...",
  nearly: "¡Casi listo!"
}, Tp = {
  customerService: "Excelente servicio al cliente",
  easyBooking: "Reserva fácil y segura",
  ticketOnSmartphone: "El billete está disponible directamente"
}, Sp = {
  addToCart: "Añadir al carrito",
  bookNow: "Reserva ahora",
  booking: "{ count } reservas",
  enterEmail: "Por favor, introduce tu dirección de correo electrónico",
  enterOrderReference: "Por favor ingresa tu referencia de pedido",
  from: "desde",
  loading: "Cargando ...",
  showMore: "Más información",
  submit: "Enviar",
  unavailable: "Actividad no disponible",
  update: "Actualización"
}, kp = {
  customerDataHasBeenUpdated: "Se han actualizado los datos de los clientes",
  error: "Se ha producido un error",
  orderHasBeenUpdated: "Se ha actualizado el pedido",
  pricesHasBeenUpdated: "Se han actualizado los precios",
  productHasBeenAdded: "Se ha añadido el producto",
  productHasBeenRemoved: "Se ha retirado el producto",
  productHasBeenUpdated: "Se ha actualizado el producto",
  success: "éxito",
  voucherHasBeenApplied: "Se ha aplicado el código de descuento { voucher}",
  voucherHasBeenDeleted: "El código de descuento { voucher } ha sido eliminado",
  voucherNotFound: "Código de descuento { voucher } no encontrado"
}, Ip = {
  AddonParentRequired: "No se pueden reservar experiencias adicionales sin una experiencia principal",
  AddonQuantityLimit: "El número máximo de personas que se pueden reservar para una experiencia extra depende del número de personas elegidas para la experiencia principal.",
  InvalidAddons: "El pago no es posible porque a una o varias experiencias extra les falta una experiencia principal.",
  ADYEN_ERROR: "Hemos recibido un mensaje de error de la pasarela de pago Adyen. Vuelve a intentarlo más tarde.",
  CART_EDIT_DISABLED: "No puedes editar tu cesta porque has utilizado la opción Autorreserva.",
  CART_NOT_FOUND: "Parece que falta algo en tu cesta. Intenta añadir artículos de nuevo.",
  DuplicateTimeslotInRequest: "Uno o más productos de tu cesta tienen franjas horarias conflictivas. Edita tu cesta e inténtalo de nuevo.",
  EmptyCart: "El pago no es posible porque tu cesta está vacía. Añade un producto e inténtalo de nuevo.",
  MissingCustomerInfo: "Parece que faltan algunos datos personales. Por favor, revísalos para continuar.",
  OldTimeslots: "Parece que algunas de las actividades que has elegido tienen franjas horarias fijadas en el pasado. Por favor, edítalas para continuar.",
  SERVER_ERROR: "Se ha producido un error al procesar tu solicitud. Inténtalo de nuevo.",
  TICKETHUB_CREATE_RESERVATION_CONFLICT: "Uno o más productos de tu cesta tienen franjas horarias conflictivas. Edita tu cesta e inténtalo de nuevo.",
  TICKETHUB_CREATE_RESERVATION_ERROR: "Hemos recibido un mensaje de error de TicketHub. Vuelve a intentarlo más tarde.",
  TICKETHUB_ERROR: "Hemos recibido un mensaje de error de TicketHub. Vuelve a intentarlo más tarde."
}, nb = {
  calendar: gp,
  options: yp,
  cart: _p,
  checkout: bp,
  upgrades: Ep,
  payment: wp,
  paymentLoader: Cp,
  achievements: Tp,
  booking: Sp,
  toast: kp,
  THError: Ip
}, rb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  THError: Ip,
  achievements: Tp,
  booking: Sp,
  calendar: gp,
  cart: _p,
  checkout: bp,
  default: nb,
  options: yp,
  payment: wp,
  paymentLoader: Cp,
  toast: kp,
  upgrades: Ep
}, Symbol.toStringTag, { value: "Module" })), Op = {
  afterMidnightsSlots: "Na middernacht:",
  date: "Datum",
  pickATimeslot: "Kies een tijdslot",
  selectDate: "Kies een dag",
  selectTime: "Kies een tijd",
  selectTimeslot: "Kies een tijdslot",
  time: "Tijd",
  today: "Vandaag",
  tomorrow: "Morgen"
}, Dp = {
  adult: "Volwassene | { count } volwassenen",
  child: "Kind | { count } kinderen",
  close: "Sluiten",
  customizeYourExperience: "Pas je ervaring aan",
  family: "Familie",
  guests: "Gasten",
  mealsLeftWarning: "Je hebt nog { count } maaltijd te kiezen | Je hebt nog { count } maaltijden te kiezen",
  openTicket: "Open ticket",
  photo: "Foto | { count } foto's",
  student: "Student",
  tickets: "Tickets",
  whoIsGoing: "Wie gaat er mee?"
}, Pp = {
  addDiscountCode: "Voeg nog een kortingscode toe",
  apply: "Toepassen",
  back: "Terug naar winkelwagen",
  cartIsEmpty: "Je winkelwagen is leeg",
  delete: "Verwijderen",
  discountCode: "Kortingscode (optioneel)",
  edit: "Aanpassen",
  fee: "Boekingskosten",
  iHaveDiscountCode: "Ik heb een kortingscode",
  remove: "Verwijderen",
  selectACurrency: "Kies een valuta",
  startExploring: "Ontdek nu",
  startShopping: "Begin met winkelen",
  subTotal: "Subtotaal",
  tax: "BTW",
  timeslotIsExpired: "Tijdslot van het product is verlopen",
  toCheckout: "Naar de kassa",
  total: "Totaal",
  your: "Jouw winkelwagen ({ count })"
}, Ap = {
  agreement: "* Ik ga akkoord met de Algemene Voorwaarden en het Privacybeleid",
  agreementWarning: "Je moet akkoord gaan met de algemene voorwaarden om de aankoop te voltooien",
  back: "Terug naar detals",
  bookingFeeNotice: "De getoonde prijzen prijzen zijn exclusief boekingskosten ({ fee } boekingskosten per transactie)",
  email: "Je e-mail adres",
  emailWarning: "U moet het e-mailveld invullen",
  entertainmentTax: " en, indien van toepassing, een extra vermakelijkhedenretributie van €{ fee } (per dag) per ticket",
  expiredWarning: "Je winkelwagen bevat tijdsloten die zijn verlopen",
  name: "Volledige naam",
  nameWarning: "U moet het naamveld invullen",
  newsletter: "{ siteTitle } mag mij mailen over mijn ervaring en speciale aanbiedingen",
  nextStep: "Volgende stap",
  payNow: "Nu betalen",
  payment: "Betaling",
  personalDetails: "Jouw gegevens",
  selectPaymentMethod: "Kies jouw betaalwijze",
  summary: "Besteloverzicht",
  tickets: "Tickets",
  ticketsSentTo: "Jouw tickets worden verstuurd naar <b>{ email }</b>",
  upgrades: "Upgrades",
  validPricesInfo: "Prijzen zijn nog {time} minuten geldig"
}, $p = {
  back: "Terug naar upgrades",
  upsellBookSubtitle: "Maak meer herinneringen met een extra ervaring.",
  upsellBookTitle: "Boek samen en krijg korting"
}, Np = {
  Cancelled: "Betaling is geannuleerd",
  Pending: "Betaling is in behandeling",
  Rebooked: "Omgeboekt",
  Refused: "betaling geweigerd",
  back: "Terug naar betaling",
  downloadTickets: "Download tickets",
  enjoyYourTrip: "Geboekt!",
  errorOccurred: "fout opgetreden",
  moreActivities: "Bekijk meer activiteiten",
  paymentIsPending: "Betaling is in behandeling. Blijf op de pagina of bekijk je <b>{ email }</b> mail later.",
  success: "De bevestigingsmail is naar je inbox gestuurd. De tickets volgen binnen een uur in een aparte e-mail. Als je ze niet binnen een uur ontvangt, controleer dan je SPAM folder of neem contact met ons op. We helpen je graag verder.",
  thankForPurchase: "Een bevestigings mail met jouw tickets wordt verstuurd naar <b>{ email }</b>"
}, Lp = {
  booking: "Tickets worden geboekt...",
  nearly: "Bijna klaar!"
}, Rp = {
  customerService: "Uitstekende klantenservice",
  easyBooking: "Gemakkelijk en veilig boeken",
  ticketOnSmartphone: "Ticket is direct beschikbaar"
}, Mp = {
  addToCart: "Leg in winkelwagen",
  bookNow: "Boek nu",
  booking: "{ count } boeking | { count } boekingen",
  enterEmail: "Vul je e-mailadres in",
  enterOrderReference: "Vul je ordernummer in",
  from: "vanaf",
  loading: "Laden ...",
  showMore: "Meer informatie",
  submit: "Indienen",
  unavailable: "Activiteit niet beschikbaar",
  update: "Update"
}, xp = {
  customerDataHasBeenUpdated: "Klantgegevens zijn bijgewerkt",
  error: "Er is een fout opgetreden",
  orderHasBeenUpdated: "Bestelling is bijgewerkt",
  pricesHasBeenUpdated: "Prijzen zijn geüpdated",
  productHasBeenAdded: "Product is toegevoegd",
  productHasBeenRemoved: "Product is verwijderd",
  productHasBeenUpdated: "Product is bijgewerkt",
  success: "Gelukt!",
  voucherHasBeenApplied: "Kortingscode { voucher } is toegepast",
  voucherHasBeenDeleted: "Kortingscode {voucher } is verwijderd",
  voucherNotFound: "Kortingscode {voucher} niet gevonden"
}, Bp = {
  AddonParentRequired: "Extra ervaringen kunnen niet worden geboekt zonder een hoofdactiviteit",
  AddonQuantityLimit: "Het maximum aantal gasten dat kan worden geboekt voor een extra ervaring hangt af van het aantal gasten dat is gekozen voor de hoofdactiviteit.",
  InvalidAddons: "Betaling is niet mogelijk omdat een of meer extra ervaringen een hoofdactiviteit missen.",
  ADYEN_ERROR: "We hebben een foutmelding ontvangen van de Adyen Payment Gateway. Probeer het later nog eens.",
  CART_EDIT_DISABLED: "Je kunt je winkelwagen niet bewerken omdat je de Zelf omboeken-optie hebt gebruikt.",
  CART_NOT_FOUND: "Je winkelwagentje lijkt te ontbreken. Probeer opnieuw items toe te voegen.",
  DuplicateTimeslotInRequest: "Een of meer producten in je winkelwagen hebben conflicterende tijden. Wijzig je winkelwagentje en probeer het opnieuw.",
  EmptyCart: "Betalen is niet mogelijk omdat je winkelwagen leeg is. Voeg een product toe en probeer het opnieuw.",
  MissingCustomerInfo: "Er lijken wat persoonsgegevens te ontbreken. Controleer ze om verder te gaan.",
  OldTimeslots: "Het lijkt erop dat sommige van je gekozen activiteiten tijdsloten hebben die in het verleden zijn ingesteld. Pas ze aan om door te gaan.",
  SERVER_ERROR: "Oeps, er is een fout opgetreden tijdens het verwerken van je verzoek. Probeer het opnieuw.",
  TICKETHUB_CREATE_RESERVATION_CONFLICT: "Een of meer producten in je winkelwagen hebben conflicterende tijden. Wijzig je winkelwagentje en probeer het opnieuw.",
  TICKETHUB_CREATE_RESERVATION_ERROR: "We hebben een foutmelding ontvangen van TicketHub. Probeer het later nog eens.",
  TICKETHUB_ERROR: "We hebben een foutmelding ontvangen van TicketHub. Probeer het later nog eens."
}, ob = {
  calendar: Op,
  options: Dp,
  cart: Pp,
  checkout: Ap,
  upgrades: $p,
  payment: Np,
  paymentLoader: Lp,
  achievements: Rp,
  booking: Mp,
  toast: xp,
  THError: Bp
}, ab = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  THError: Bp,
  achievements: Rp,
  booking: Mp,
  calendar: Op,
  cart: Pp,
  checkout: Ap,
  default: ob,
  options: Dp,
  payment: Np,
  paymentLoader: Lp,
  toast: xp,
  upgrades: $p
}, Symbol.toStringTag, { value: "Module" })), Vp = {
  afterMidnightsSlots: "Après minuit:",
  date: "Date",
  pickATimeslot: "Sélectionnez un créneau horaire",
  selectDate: "Sélectionnez une date",
  selectTime: "Sélectionnez l'heure",
  selectTimeslot: "Sélectionnez un créneau horaire",
  time: "L'heure",
  today: "Aujourd'hui",
  tomorrow: "Demain"
}, Up = {
  adult: "Adulte | { count } Adultes",
  child: "Enfant | { count } Enfants",
  close: "Fermer",
  customizeYourExperience: "Personnalise ton expérience",
  family: "Famille",
  guests: "Invités",
  mealsLeftWarning: "Tu as { count } repas à choisir",
  openTicket: "Billet ouvert",
  photo: "Photo | { count } photos",
  student: "Étudiant",
  tickets: "Billets",
  whoIsGoing: "Qui y va ?"
}, Fp = {
  addDiscountCode: "Ajouter un autre code de réduction",
  apply: "Appliquer",
  back: "Retour au panier",
  cartIsEmpty: "Votre panier est vide",
  delete: "Enlever",
  discountCode: "Code de réduction (facultatif)",
  edit: "Éditer",
  fee: "Frais de réservation",
  iHaveDiscountCode: "J'ai un code de réduction",
  remove: "Enlever",
  selectACurrency: "Sélectionnez une devise",
  startExploring: "Commencez à explorer",
  startShopping: "Commencez à faire vos achats",
  subTotal: "Sous-total",
  tax: "Taxe",
  timeslotIsExpired: "Le créneau horaire pour le produit a expiré",
  toCheckout: "Passer à la caisse",
  total: "Total",
  your: "Votre panier ({ count })"
}, Hp = {
  agreement: "J'accepte les conditions générales et la politique de confidentialité.",
  agreementWarning: "Vous devez accepter les conditions générales pour effectuer l'achat.",
  back: "Retour à mes données personnelles",
  bookingFeeNotice: "Les prix affichés ne comprennent pas les frais de réservation ({ fee } de frais de réservation par transaction)",
  email: "Votre adresse e-mail",
  emailWarning: "Veuillez indiquer votre adresse e-mail",
  entertainmentTax: " et, le cas échéant, une taxe supplémentaire sur les divertissements de €{ fee } (par jour) par billet",
  expiredWarning: "Votre panier contient des créneaux horaires qui ont expiré.",
  name: "Votre nom et prénom",
  nameWarning: "Indiquez votre nom complet",
  newsletter: "Nous pouvons vous envoyer des courriels concernant votre expérience et des offres spéciales pour que vous profitiez au maximum de votre voyage.",
  nextStep: "L'étape suivante",
  payNow: "Payer maintenant",
  payment: "Paiement",
  personalDetails: "Vos données personnelles",
  selectPaymentMethod: "Veuillez sélectionner votre mode de paiement",
  summary: "Résumé de l'ordre",
  tickets: "Billets",
  ticketsSentTo: "Vos billets seront envoyés à <b>{ email }</b>",
  upgrades: "Upgrades",
  validPricesInfo: "Les prix sont valables pour une durée supplémentaire de { time } minutes."
}, Yp = {
  back: "Retour aux upgrades",
  upsellBookSubtitle: "Créez plus de souvenirs avec une expérience supplémentaire",
  upsellBookTitle: "Combinez des produits et économisez de l'argent"
}, jp = {
  Cancelled: "Le paiement est annulé",
  Pending: "Le paiement est en cours",
  Rebooked: "Reprogrammé !",
  Refused: "Le paiement est refusé",
  back: "Retour au paiement",
  downloadTickets: "Télécharger les tickets",
  enjoyYourTrip: "Réservé !",
  errorOccurred: "Une erreur s'est produite",
  moreActivities: "Voir plus d'activités",
  paymentIsPending: "Le paiement est en attente. Veuillez rester sur la page ou consulter votre e-mail <b>{ email }</b> ultérieurement.",
  success: "Veuillez vérifier votre e-mail pour la confirmation. Les billets vous seront envoyés dans un e-mail séparé dans l'heure qui suit. Si vous ne les recevez pas dans l'heure qui suit, veuillez vérifier votre dossier SPAM ou nous contacter. Nous nous ferons un plaisir de vous aider.",
  thankForPurchase: "Un courriel de confirmation contenant vos billets est en cours d'acheminement vers <b>{ email }</b>."
}, Wp = {
  booking: "Réservez vos billets...",
  nearly: "Presque prêt !"
}, qp = {
  customerService: "Excellent service à la clientèle",
  easyBooking: "Réservation facile et sécurisée",
  ticketOnSmartphone: "Le billet est directement disponible sur le smartphone"
}, zp = {
  addToCart: "Ajouter au panier",
  bookNow: "Réservez maintenant",
  booking: "{ count } réservation | { count } réservations",
  enterEmail: "S'il vous plaît entrez votre adresse email",
  enterOrderReference: "Veuillez entrer votre numéro de commande",
  from: "De",
  loading: "Chargement ...",
  showMore: "Plus d'informations",
  submit: "Soumettre",
  unavailable: "Activité indisponible",
  update: "Enregistrer les modifications"
}, Gp = {
  customerDataHasBeenUpdated: "Mise à jour des données clients",
  error: "Une erreur s'est produite",
  orderHasBeenUpdated: "L'ordre a été mis à jour",
  pricesHasBeenUpdated: "Les prix ont été mis à jour",
  productHasBeenAdded: "Le produit a été ajouté",
  productHasBeenRemoved: "Le produit a été retiré",
  productHasBeenUpdated: "Le produit a été mis à jour",
  success: "Succès !",
  voucherHasBeenApplied: "Le code de réduction { voucher } a été appliqué",
  voucherHasBeenDeleted: "Le code de réduction { voucher } a été supprimé",
  voucherNotFound: "Code de réduction { voucher } introuvable"
}, Xp = {
  AddonParentRequired: "Les expériences supplémentaires ne peuvent être réservées sans une expérience principale.",
  AddonQuantityLimit: "Le nombre maximum d'invités pouvant être réservés pour une expérience supplémentaire dépend du nombre d'invités choisis pour l'expérience principale.",
  InvalidAddons: "Le paiement n'est pas possible parce qu'il manque une expérience principale à une ou plusieurs expériences supplémentaires.",
  ADYEN_ERROR: "Nous avons reçu un message d'erreur de la part de la passerelle de paiement Adyen. Veuillez réessayer plus tard.",
  CART_EDIT_DISABLED: "Vous ne pouvez pas modifier votre panier parce que vous avez utilisé l'option Auto-Modification.",
  CART_NOT_FOUND: "Il semble que votre panier soit manquant. Essayez à nouveau d'ajouter des articles.",
  DuplicateTimeslotInRequest: "Un ou plusieurs produits de votre panier ont des créneaux horaires incompatibles. Veuillez modifier votre panier et réessayer.",
  EmptyCart: "Le paiement n'est pas possible car votre panier est vide.",
  MissingCustomerInfo: "Il semble que certaines données personnelles soient manquantes. Veuillez les vérifier pour continuer.",
  OldTimeslots: "Il semble que certaines des activités que vous avez choisies aient des plages horaires qui sont fixées dans le passé. Veuillez les modifier pour continuer.",
  SERVER_ERROR: "Oups, une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer.",
  TICKETHUB_CREATE_RESERVATION_CONFLICT: "Un ou plusieurs produits de votre panier ont des créneaux horaires incompatibles. Veuillez modifier votre panier et réessayer.",
  TICKETHUB_CREATE_RESERVATION_ERROR: "Nous avons reçu un message d'erreur de TicketHub. Veuillez réessayer plus tard.",
  TICKETHUB_ERROR: "Nous avons reçu un message d'erreur de TicketHub. Veuillez réessayer plus tard."
}, ib = {
  calendar: Vp,
  options: Up,
  cart: Fp,
  checkout: Hp,
  upgrades: Yp,
  payment: jp,
  paymentLoader: Wp,
  achievements: qp,
  booking: zp,
  toast: Gp,
  THError: Xp
}, sb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  THError: Xp,
  achievements: qp,
  booking: zp,
  calendar: Vp,
  cart: Fp,
  checkout: Hp,
  default: ib,
  options: Up,
  payment: jp,
  paymentLoader: Wp,
  toast: Gp,
  upgrades: Yp
}, Symbol.toStringTag, { value: "Module" })), ln = H_({
  legacy: !1,
  locale: "en",
  globalInjection: !0,
  fallbackLocale: "en",
  messages: {
    en: Q_,
    de: tb,
    es: rb,
    nl: ab,
    fr: sb
  }
}), { t: lb } = ln.global;
ue.extend($g);
ue.extend(Pg);
class Xo {
  constructor(t, n = void 0, r = !1) {
    le(this, "id");
    le(this, "dateTime");
    le(this, "capacity");
    le(this, "prices");
    le(this, "isOpen");
    le(this, "price");
    le(this, "isDynamic");
    var a;
    let o = [];
    typeof n < "u" && (o = n.sort(
      (i, l) => l.itemCategory.orderPriority - i.itemCategory.orderPriority
    ).map((i) => {
      const l = i.itemCategory.itemCategoryId;
      let s = i.itemPrice.itemPrice;
      return r && i.dynamicPrice && (s = i.dynamicPrice.dynamicPrice), {
        price: s,
        categoryId: l
      };
    })), this.id = t.timeslotId, this.dateTime = t.timeslotDateTime, this.prices = o, this.capacity = t.availableCapacity, this.price = ((a = this.prices[0]) == null ? void 0 : a.price) ?? 0, this.isOpen = t.isForOpenTicket, this.isDynamic = r;
  }
  get isAvailable() {
    return this.capacity !== 0;
  }
  get humanizedTime() {
    return this.isOpen ? lb("options.openTicket") : ue(this.dateTime).format("HH:mm");
  }
  get date() {
    return ue(this.dateTime).toDate();
  }
  get humanizedDate() {
    return ue(this.dateTime).format("DD/MM/YYYY");
  }
  get isExpired() {
    const t = $e(), n = ue.tz(this.dateTime, "Europe/Amsterdam"), r = t.getServerTime;
    return typeof r > "u" ? !1 : this.isOpen ? ue(n).isBefore(r, "day") : n.isBefore(r);
  }
  get cartTimeslotFormat() {
    return {
      timeslotId: this.id,
      timeslotDateTime: this.dateTime,
      isForOpenTicket: this.isOpen,
      availableCapacity: this.capacity
    };
  }
  categoryPrice(t) {
    const n = this.prices.find(
      (r) => t === r.categoryId
    );
    return n ? +n.price : 0;
  }
}
var Ao;
((e) => {
  e.price = (t) => "€" + (+t).toFixed(2), e.localizedTitle = (t, n) => {
    var o;
    let r;
    try {
      r = JSON.parse(t);
    } catch {
      r = t;
    }
    if (r !== null && typeof r == "object") {
      const a = n ?? ((o = window.ticketHub) == null ? void 0 : o.language);
      let i = Object.values(t)[0];
      return typeof a < "u" && (i = r[a]), i;
    }
    return r;
  };
})(Ao || (Ao = {}));
var ou = /^GTM-[0-9A-Z]+$/;
function Yi(e) {
  if (typeof e != "string" || !ou.test(e)) {
    let t = String(e).toUpperCase().replace(/.*-|[^0-9A-Z]/g, ""), n = t.length === 0 ? "" : ` Did you mean 'GTM-${t}'?`;
    throw new Error(`'${e}' is not a valid GTM-ID (${ou}).${n}`);
  }
}
function ho(e, t = "dataLayer") {
  return e[t] || (e[t] = []), e[t];
}
function Br(e, t) {
  let n = document, r = n.createElement("script"), o = (c) => {
    var u;
    (u = t.onReady) == null || u.call(t, { id: e, script: r }), r.removeEventListener("load", o);
  };
  r.addEventListener("load", o);
  let a = t.dataLayerName ?? "dataLayer";
  if (ho(window, a).push({ event: "gtm.js", "gtm.start": (/* @__PURE__ */ new Date()).getTime() }), !e)
    return r;
  r.async = !t.defer, r.defer = !!(t.defer || t.compatibility), t.nonce && r.setAttribute("nonce", t.nonce), t.scriptType && (r.type = t.scriptType);
  let i = new URLSearchParams({ id: e, ...t.dataLayerName ? { l: t.dataLayerName } : {}, ...t.queryParams ?? {} }), l = t.source ?? "https://www.googletagmanager.com/gtm.js";
  r.src = `${l}?${i}`;
  let s = t.parentElement ?? n.body;
  if (typeof (s == null ? void 0 : s.appendChild) != "function")
    throw new Error("parentElement must be a DOM element");
  return s.appendChild(r), r;
}
function cb(e = "https://www.googletagmanager.com/gtm.js") {
  return Array.from(document.getElementsByTagName("script")).some((t) => t.src.includes(e));
}
var ub = class {
  constructor(e) {
    le(this, "id");
    le(this, "options");
    le(this, "scriptElements", []);
    le(this, "isInBrowserContext", () => typeof window < "u");
    if (Array.isArray(e.id))
      for (let t of e.id)
        Yi(typeof t == "string" ? t : t.id);
    else
      Yi(e.id);
    this.id = e.id, this.options = { enabled: !0, debug: !1, loadScript: !0, defer: !1, compatibility: !1, dataLayerName: "dataLayer", ...e }, delete this.options.id;
  }
  enabled() {
    return this.options.enabled ?? !0;
  }
  enable(e = !0, t) {
    if (this.options.enabled = e, this.isInBrowserContext() && e && !cb(t) && this.options.loadScript)
      if (Array.isArray(this.id))
        this.id.forEach((n) => {
          let r;
          typeof n == "string" ? r = Br(n, { ...this.options }) : r = Br(n.id, { ...this.options, queryParams: n.queryParams }), this.scriptElements.push(r);
        });
      else {
        let n = Br(this.id, { ...this.options });
        this.scriptElements.push(n);
      }
  }
  debugEnabled() {
    return this.options.debug ?? !1;
  }
  debug(e) {
    this.options.debug = e;
  }
  dataLayer() {
    return this.isInBrowserContext() && this.options.enabled ? ho(window, this.options.dataLayerName) : !1;
  }
  trackView(e, t, n = {}) {
    let r = this.isInBrowserContext() && (this.options.enabled ?? !1);
    this.options.debug && console.log(`[GTM-Support${r ? "" : "(disabled)"}]: Dispatching TrackView`, { screenName: e, path: t }), r && ho(window, this.options.dataLayerName).push({ ...n, event: this.options.trackViewEventProperty ?? "content-view", "content-name": t, "content-view-name": e });
  }
  trackEvent({ event: e, category: t = null, action: n = null, label: r = null, value: o = null, noninteraction: a = !1, ...i } = {}) {
    let l = this.isInBrowserContext() && (this.options.enabled ?? !1);
    this.options.debug && console.log(`[GTM-Support${l ? "" : "(disabled)"}]: Dispatching event`, { event: e, category: t, action: n, label: r, value: o, ...i }), l && ho(window, this.options.dataLayerName).push({ event: e ?? "interaction", target: t, action: n, "target-properties": r, value: o, "interaction-type": a, ...i });
  }
  push(e) {
    let t = this.isInBrowserContext() && (this.options.enabled ?? !1);
    this.options.debug && console.log(`[GTM-Support${t ? "" : "(disabled)"}]: Dispatching event`, e), t && ho(window, this.options.dataLayerName).push(e);
  }
}, Qe;
function db(e, t = { id: "" }) {
  t = { trackOnNextTick: !1, ...t }, Qe = new ub(t), e.config.globalProperties.$gtm = Qe, Qe.isInBrowserContext() && (t.vueRouter && fb(e, t.vueRouter, t.ignoredViews, t.trackOnNextTick, t.vueRouterAdditionalEventData), Qe.options.enabled && Qe.options.loadScript && (Array.isArray(t.id) ? t.id.forEach((n) => {
    if (typeof n == "string")
      Br(n, t);
    else {
      let r = { ...t };
      n.queryParams != null && (r.queryParams = { ...r.queryParams, ...n.queryParams }), Br(n.id, r);
    }
  }) : Br(t.id, t))), e.provide("gtm", t);
}
function fb(e, t, n = [], r, o = () => ({})) {
  function a(i, l) {
    return i instanceof Error ? !!(i.type & l) : !1;
  }
  t.afterEach(async (i, l, s) => {
    var d, v, p;
    if (typeof i.name != "string" || Array.isArray(n) && n.includes(i.name) || typeof n == "function" && n(i, l))
      return;
    let c = i.meta && typeof i.meta.gtm == "string" && i.meta.gtm ? i.meta.gtm : i.name;
    a(s, 4) ? Qe != null && Qe.debugEnabled() && console.log(`[VueGtm]: '${c}' not tracked due to navigation aborted`) : a(s, 8) && (Qe != null && Qe.debugEnabled()) && console.log(`[VueGtm]: '${c}' not tracked due to navigation cancelled`);
    let u = { ...await o(i, l), ...(d = i.meta) == null ? void 0 : d.gtmAdditionalEventData }, f = ((p = (v = t.options) == null ? void 0 : v.history) == null ? void 0 : p.base) ?? "";
    f.endsWith("/") || (f += "/"), f += i.fullPath.startsWith("/") ? i.fullPath.substring(1) : i.fullPath, r ? $n(() => {
      Qe == null || Qe.trackView(c, f, u);
    }) : Qe == null || Qe.trackView(c, f, u);
  });
}
function pb(e) {
  return { install: (t) => db(t, e) };
}
function ji() {
  return Qe;
}
var Wa;
((e) => {
  let t, n;
  e.init = (r = "/actions/ticket-hub/currencies") => {
    n = r, t = new eo(r, void 0, {
      headers: {
        Authorization: "Basic TWFya2VuLUV4cHJlc3M6TWFya2VuLUV4cHJlc3MtU2VjcmV0"
      }
    });
  }, e.getCurrencies = async () => (await t.get(
    n,
    {},
    !0
  )).Cube.Cube.Cube;
})(Wa || (Wa = {}));
const Ln = jn(
  "currency",
  () => {
    const e = Q([
      {
        code: "EUR",
        symbol: "€",
        description: "Euro",
        rate: "1"
      }
    ]), t = Q(e.value[0]), n = te(() => t.value ?? e.value[0]);
    return {
      list: e,
      current: n,
      currentCurrency: t,
      setCurrency: (a) => {
        const i = e.value.find(
          (l) => l.code.toLowerCase() === a.toLowerCase()
        );
        typeof i < "u" ? t.value = i : t.value = e.value[0], !(typeof window.ticketHub > "u") && (window.ticketHub.selectedCurrency = t.value);
      },
      setCurrencies: async (a) => {
        let i = [];
        t.value || (t.value = a[0]), a.some(
          (l) => {
            var s;
            return l.code === ((s = t.value) == null ? void 0 : s.code);
          }
        ) || (t.value = a[0]);
        try {
          i = await Wa.getCurrencies();
        } catch {
        }
        e.value = a.map((l) => {
          const s = i.find(
            (u) => l.code.toLowerCase() === u["@attributes"].currency.toLowerCase()
          );
          let c = "1";
          return typeof s < "u" && (c = s["@attributes"].rate), {
            ...l,
            rate: c
          };
        });
      }
    };
  },
  {
    persist: !0
  }
), au = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  useCurrencyStore: Ln
}, Symbol.toStringTag, { value: "Module" }));
var jr;
((e) => {
  const t = (o) => {
    const a = Ln();
    return Number(+o * Number(a.currentCurrency.rate)).toFixed(2);
  }, n = async (o = "view_cart", a = {}, i) => {
    var v;
    const l = (await Promise.resolve().then(() => au)).useCurrencyStore(), s = (await Promise.resolve().then(() => th)).useCartStore();
    let c = s.items, u = s.cart.totalDiscountedPrice;
    if (typeof i < "u" && (c = i.items.map(
      (p) => Rn.getCartProduct(p)
    ), u = i.totalDiscountedPrice), c.length === 0)
      return;
    const f = [];
    for (const p of c)
      for (const g of p.selectedCategories)
        g.quantity <= 0 || f.push({
          item_id: p.itemId,
          item_name: p.title,
          category: g.itemCategoryName,
          quantity: g.quantity,
          price: t(
            g.totalDiscountedPrice / g.quantity
          )
        });
    const d = ji();
    d == null || d.trackEvent({
      event: o,
      currency: (v = l.currentCurrency) == null ? void 0 : v.code,
      value: t(u),
      items: f,
      ...a
    });
  }, r = async (o, a = "add_to_cart") => {
    var f;
    const i = (await Promise.resolve().then(() => au)).useCurrencyStore(), l = ji(), s = [];
    let c, u = o.isDisabled ? o.defaultPrice : o.productPrice;
    if (u = t(u), o.isDisabled)
      s.push({
        item_id: o.itemId,
        item_name: o.title,
        price: u
      }), c = "disabled";
    else
      for (const d of o.availableCategories)
        d.quantity <= 0 || s.push({
          item_id: o.itemId,
          item_name: o.title,
          category: d.itemCategoryName,
          quantity: d.quantity,
          price: t(
            o.getCategoryPrice(d.itemCategoryId)
          )
        });
    l == null || l.trackEvent({
      event: a,
      currency: (f = i.currentCurrency) == null ? void 0 : f.code,
      value: u,
      label: c,
      items: s
    });
  };
  e.addToCart = async (o) => r(o), e.viewItem = (o) => r(o, "view_item"), e.viewItemList = async (o, a = document.title) => {
    const i = ji();
    if (o.length === 0)
      return;
    const l = o.map((s) => ({
      ...s,
      price: t(s.price)
    }));
    i == null || i.trackEvent({
      event: "view_item_list",
      items: l,
      item_list_name: a
    });
  }, e.viewCart = async () => n("view_cart"), e.beginCheckout = () => n("begin_checkout"), e.addPaymentInfo = () => n("add_payment_info"), e.purchase = (o, a) => n(
    "purchase",
    {
      transaction_id: o
    },
    a
  );
})(jr || (jr = {}));
var iu = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const hb = (e = "", t = !0, n = null, r = n, o = iu.imageQuality, a = void 0, i = "center", l = "crop") => {
  let s;
  try {
    s = new URL(e);
  } catch {
    s = new URL(iu.baseUrl), s.pathname = e || "/assets/promo-banner.webp";
  }
  const c = 2, u = [];
  if (s.searchParams.set("quality", o), s.searchParams.set("anchor", i), s.searchParams.set("mode", l), typeof a < "u" && s.searchParams.set("crop", a), n || (n = s.searchParams.get("width"), r = s.searchParams.get("height")), n)
    for (let f = 1; f <= c; f++) {
      s.searchParams.set("width", `${+n * f}`), s.searchParams.set("height", `${+r * f}`);
      let d = `${s.href} ${f}x`;
      t && (d = `url(${s.href}) ${f}x`), u.push(d);
    }
  return u.join(", ");
}, { t: mb } = ln.global;
class Kp {
  constructor(t, n, r = 0, o = !1, a) {
    le(this, "content");
    le(this, "isVariant");
    le(this, "totalPrice");
    le(this, "id");
    le(this, "itemId");
    le(this, "selectedCategories");
    le(this, "isCombo");
    le(this, "isSingle");
    this.id = n, this.content = t, this.isVariant = o, this.totalPrice = r, this.selectedCategories = [], this.isCombo = !1, this.isSingle = !0, this.itemId = a;
  }
  get extraMealsText() {
    return "";
  }
  get metaData() {
    return this.content.metadata;
  }
  get isUpsell() {
    try {
      return this.metaData ? JSON.parse(this.metaData).upsell ?? !1 : !1;
    } catch {
      return !1;
    }
  }
  get isExpired() {
    let t = !1;
    for (const n of this.items)
      if (n.timeslot && (t = n.timeslot.isExpired, n.timeslot.isExpired))
        break;
    return t;
  }
  get preview() {
    return this.metaData && JSON.parse(this.metaData).image || "";
  }
  get url() {
    return this.metaData && JSON.parse(this.metaData).url || "";
  }
  get title() {
    var t;
    if (this.metaData) {
      const n = JSON.parse(this.metaData).title || "";
      if (n !== null && typeof n == "object" && window) {
        const r = (t = window.ticketHub) == null ? void 0 : t.language;
        let o = Object.values(n)[0];
        return typeof r < "u" && (o = n[r]), o;
      }
      return n;
    }
    return "";
  }
  get selectedVisitorsText() {
    const t = [];
    return this.selectedCategories.forEach((n) => {
      n.quantity > 0 && t.push(
        mb(
          `options.${n.itemCategoryName}`.toLowerCase(),
          n.quantity
        )
      );
    }), t.join(" - ");
  }
  getImageSrcset(t = 148) {
    return hb(this.preview, !1, t);
  }
  getItemLink(t = "en") {
    let n;
    return this.url && typeof this.url == "object" ? n = new URL(this.url[t]) : n = new URL(this.url), n.href;
  }
  getItemEditLink(t = "en") {
    const n = new URL(this.getItemLink(t));
    return n.searchParams.set("cartItemId", this.id), n.href;
  }
}
const { t: vb } = ln.global;
class hi {
  constructor(t, n = !1) {
    le(this, "itemCategoryId");
    le(this, "itemCategoryName");
    le(this, "orderPriority");
    le(this, "_quantity");
    le(this, "_totalPrice");
    le(this, "_totalDiscountedPrice");
    this.itemCategoryId = t.itemCategoryId, this.itemCategoryName = t.itemCategoryName, this.orderPriority = t.orderPriority || 0, this._quantity = n ? t.quantity : $e().getCategoryPreselectQuantity(this.itemCategoryId).value ?? 0, this._totalPrice = t.totalPrice || t.totalDiscountedPrice || 0, this._totalDiscountedPrice = t.totalDiscountedPrice || 0;
  }
  get quantity() {
    return this._quantity;
  }
  set quantity(t) {
    this._quantity = t, $e().updateCategoryPreselectQuantity(this.itemCategoryId, t);
  }
  get totalPrice() {
    return this._totalPrice;
  }
  set totalPrice(t) {
    this._totalPrice = Number(t);
  }
  get totalDiscountedPrice() {
    return this._totalDiscountedPrice;
  }
  set totalDiscountedPrice(t) {
    this._totalDiscountedPrice = Number(t);
  }
  get computedText() {
    return vb(`options.${this.itemCategoryName}`.toLowerCase(), this.quantity);
  }
}
class Jp extends Kp {
  constructor(n) {
    var r, o, a, i, l, s;
    super(
      (r = n.packageGroup) == null ? void 0 : r.contentInfo,
      (o = n.packageGroup) == null ? void 0 : o.cartPackageGroupId,
      (a = n.packageGroup) == null ? void 0 : a.totalPrice,
      (i = n.packageGroup) == null ? void 0 : i.contentInfo.isVariant,
      (l = n.packageGroup) == null ? void 0 : l.packageGroupId
    );
    le(this, "packages");
    this.isCombo = !0, this.isSingle = !1, this.packages = (s = n.packageGroup) == null ? void 0 : s.packages, this.selectedCategories = this.packages.map((c) => new hi(
      {
        orderPriority: 0,
        itemCategoryId: c.packageCategory.itemCategoryId,
        itemCategoryName: c.packageCategory.itemCategoryName,
        quantity: c.quantity,
        totalDiscountedPrice: c.totalPrice
      },
      !0
    ));
  }
  get items() {
    return this.packages[0].packageItems.map(
      (n) => {
        let r = null;
        return n.timeslot && (r = new Xo(n.timeslot)), {
          itemName: (() => {
            var i;
            const a = (i = window.ticketHub) == null ? void 0 : i.products.find(
              (l) => +l.itemId == +n.itemId
            );
            return a ? a.title : n.itemName;
          })(),
          itemType: n.itemType,
          timeslot: r
        };
      }
    );
  }
}
var gb = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const { localizedTitle: yb } = Ao, { t: Wi } = ln.global;
class Zp {
  constructor(t, n = !0, r = /* @__PURE__ */ new Date()) {
    le(this, "itemId");
    le(this, "_title");
    le(this, "bookingsCount");
    le(this, "rating");
    le(this, "reviewsCount");
    le(this, "duration");
    le(this, "discount");
    le(this, "id");
    le(this, "variants");
    le(this, "defaultPrice");
    le(this, "oldPrice");
    le(this, "image");
    le(this, "cancellationPolicy");
    le(this, "url");
    le(this, "options");
    le(this, "availableCategories");
    le(this, "availableDays");
    le(this, "selectedTimeslots");
    le(this, "items");
    le(this, "selectedDate");
    le(this, "metaData");
    le(this, "cartItemId");
    le(this, "isSellable");
    le(this, "isUpsell");
    le(this, "addonInfo");
    le(this, "_cartItem");
    this.id = t.id ?? 0, this.bookingsCount = t.bookingsCount ?? 0, this.rating = t.rating ?? 0, this.reviewsCount = t.reviewsCount ?? 0, this.duration = t.duration ?? "", this.defaultPrice = t.defaultPrice, this.oldPrice = t.oldPrice ?? 0, this.discount = t.discount ?? "", this.cancellationPolicy = t.cancellationPolicy || "", this.itemId = t.itemId, this.availableCategories = [], this.options = [], this.availableDays = [], this.selectedTimeslots = {}, this.selectedDate = r, this.items = [], this.url = t.url ?? window.location.href, this.metaData = "", this.addonInfo = t.addonInfo, this.cartItemId = 0, this._cartItem = null, this.isSellable = n, this.isUpsell = t.upsell ?? !1, this.variants = typeof t.variants < "u" ? t.variants.map(
      (o) => ({
        title: o.variantTitle,
        itemId: +o.variantItemId
      })
    ) : [], this._title = t.title, this.image = t.image ?? "", t.images !== void 0 && typeof t.images[0] < "u" && (this.image = t.images[0]), this.setMetaData(
      JSON.stringify({
        image: this.image,
        url: this.url,
        title: this._title,
        upsell: this.isUpsell
      })
    ), +gb.VITE_DEBUG && console.log("Product constructor end"), this.isAddon && this.selectParentProductDate();
  }
  get cartItem() {
    return this._cartItem ? this._cartItem : $e().getItemByCartItemId(this.cartItemId);
  }
  get title() {
    return yb(this._title);
  }
  get isHasVariants() {
    return this.variants && this.variants.length > 1;
  }
  get isEdit() {
    return typeof this.cartItem < "u";
  }
  get isHasOptions() {
    return this.options.length > 1;
  }
  get isAddon() {
    var t;
    return ((t = this.addonInfo) == null ? void 0 : t.isAddon) || !1;
  }
  get parents() {
    var n;
    return !this.isAddon || ((n = this.addonInfo) == null ? void 0 : n.parents.length) === 0 ? [] : $e().items.filter(
      (r) => {
        var o;
        return r instanceof Jp ? !1 : (o = this.addonInfo) == null ? void 0 : o.parents.some(
          (a) => a.itemId === r.itemId
        );
      }
    );
  }
  get availableCapacity() {
    let t = 100;
    return this.isOpen || this.items.forEach((n) => {
      n.selectedTimeslot && t > n.selectedTimeslot.capacity && (t = n.selectedTimeslot.capacity);
    }), t;
  }
  get selectedVisitorsCount() {
    return this.availableCategories.reduce(
      (t, n) => this.isCategoryAvailableForBooking(n) ? t + n.quantity : t,
      0
    );
  }
  get isVisitorsAreSelected() {
    return this.selectedVisitorsCount > 0;
  }
  get hasOptions() {
    return this.options.length > 0;
  }
  get isTimeslotsAreSelected() {
    if (this.isDisabled)
      return !1;
    if (this.isOpen)
      return !0;
    for (const t of this.showedItems)
      if (!t.selectedTimeslot)
        return !1;
    return !0;
  }
  get selectedVisitorsTitle() {
    const t = Wi("options.whoIsGoing");
    if (this.isDisabled)
      return t;
    const n = [];
    return this.availableCategories.forEach((r) => {
      this.isCategoryAvailableForBooking(r) && (r.quantity <= 0 || n.push(
        Wi(
          `options.${r.itemCategoryName}`.toLowerCase(),
          r.quantity
        )
      ));
    }), n.length === 0 ? t : n.join(" - ");
  }
  get isDisabled() {
    return !this.availableDays.length;
  }
  get hasDynamicPrices() {
    let t = !1;
    for (const n of this.items)
      if (n.dynamicPricingInfo) {
        t = !0;
        break;
      }
    return t;
  }
  get selectedMealsCount() {
    return this.options.length > 0 ? this.options.reduce(
      (t, n) => t + n.quantity,
      0
    ) : 0;
  }
  get isMealsCountEqualsVisitorsCount() {
    return this.selectedVisitorsCount === this.selectedMealsCount;
  }
  get calculatedOldPrice() {
    return this.isDisabled ? this.oldPrice : this.oldPrice * this.selectedVisitorsCount;
  }
  get price() {
    if (this.isDisabled)
      return this.defaultPrice;
    if (!(this.isTimeslotsAreSelected && this.selectedVisitorsCount > 0)) {
      const t = this.defaultPrice;
      if (t !== 0)
        return t * this.selectedVisitorsCount;
      try {
        return +this.items[0].itemPrices[0].itemPrice.itemPrice;
      } catch {
      }
    }
    return this.productPrice;
  }
  get productPrice() {
    return this.availableCategories.reduce((t, n) => this.getCategoryPrice(n.itemCategoryId) * n.quantity + t, 0);
  }
  get formattedCartCategories() {
    return this.availableCategories.filter((t) => this.isCategoryAvailableForBooking(t)).map((t) => ({
      itemCategoryId: t.itemCategoryId,
      quantity: t.quantity
    }));
  }
  get formattedCartMeals() {
    return this.options.map((t) => ({
      itemCategoryId: t.itemCategoryId,
      quantity: t.quantity,
      id: t.id
    }));
  }
  get selectedOptionsTitle() {
    const t = [];
    return this.options.forEach((n) => {
      n.quantity > 0 && t.push(n.quantity + " " + n.description);
    }), t.length === 0 ? Wi("options.customizeYourExperience") : t.join(" - ").toLowerCase();
  }
  selectParentProductDate() {
    if (!this.isAddon || this.parents.length === 0)
      return;
    const t = this.parents[0];
    if (!t.item.timeslot)
      return;
    const n = new Xo(t.item.timeslot);
    this.selectDate(n.date);
  }
  setCartItem(t) {
    this._cartItem = t;
  }
  async addToCart() {
    await (await Promise.resolve().then(() => th)).useCartStore().addCartItem(this.cartProductFormat), await jr.addToCart(this);
  }
  getCategoryPrice(t) {
    var n;
    if (this.isOpen) {
      const r = this.showedItems[0].itemPrices.find((o) => ue(o.dateTime).isSame(this.selectedDate, "day") && o.itemCategory.itemCategoryId === t);
      if (r)
        return Number(
          ((n = r.dynamicPrice) == null ? void 0 : n.dynamicPrice) || r.itemPrice.itemPrice
        );
    }
    return this.showedItems[0].selectedTimeslot ? this.showedItems[0].selectedTimeslot.categoryPrice(t) : this.defaultPrice;
  }
  loadCartItem(t) {
    this.cartItemId = t, this.fillEditData();
  }
  setMetaData(t) {
    this.metaData = t;
  }
  mealMaxValue(t) {
    const n = this.availableCategories.find(
      (o) => o.itemCategoryId === t.itemCategoryId
    );
    let r = (n == null ? void 0 : n.quantity) || 0;
    return this.options.forEach((o) => {
      o.id !== t.id && o.itemCategoryId === n.itemCategoryId && (r -= o.quantity);
    }), r;
  }
  resetSelectedTimeslots() {
    this.items.forEach(
      (t) => t.selectedTimeslot = null
    );
  }
  categoryAvailableCapacity(t) {
    let n = this.availableCapacity;
    return this.availableCategories.forEach((r) => {
      r.itemCategoryId !== t.itemCategoryId && (n -= r.quantity);
    }), this.isAddon ? this.parents.reduce(
      (r, o) => {
        const a = o.selectedCategories.find(
          (l) => l.itemCategoryId === t.itemCategoryId
        ), i = (a == null ? void 0 : a.quantity) || 0;
        return r + i;
      },
      0
    ) : this.availableCapacity >= n ? n : this.availableCapacity - n;
  }
  selectDate(t = /* @__PURE__ */ new Date()) {
    let n = t;
    this.availableDays.length > 0 && !this.availableDays.find((r) => ue(r.date).isSame(t, "day")) && (n = ue(this.availableDays[0].date).toDate()), this.selectedDate = n;
  }
  selectVariant(t) {
    this.itemId = t;
  }
  isDateExistsInAvailableDays(t) {
    const n = ue(t);
    return typeof this.availableDays.find(
      (o) => ue(o.date).isSame(n)
    ) < "u";
  }
  isCategoryAvailableForBooking(t) {
    let n = !1;
    return this.showedItems.forEach((r) => {
      r.isOpen && (n = !0);
      const o = r.selectedTimeslot && r.selectedTimeslot.prices.find(
        (a) => a.categoryId === t.itemCategoryId
      );
      typeof o < "u" && o && (n = !0);
    }), n;
  }
}
class Qp {
  constructor(t, n, r = !1) {
    le(this, "id");
    le(this, "itemName");
    le(this, "type");
    le(this, "timeslots");
    le(this, "dynamicPricingInfo");
    le(this, "itemPrices");
    le(this, "isCombo");
    le(this, "displayCapacity");
    le(this, "selectedTimeslot");
    this.id = t.itemId, this.itemName = t.itemName, this.type = t.itemType, this.dynamicPricingInfo = t.dynamicPricingInfo.hasItemDynamicPrices, this.timeslots = [], this.selectedTimeslot = null, this.itemPrices = n, this.isCombo = r, this.displayCapacity = !t.hideTimeslotCapacity, this.setBookingData(t, n);
  }
  get isOpen() {
    return this.type === "Open";
  }
  get name() {
    var n;
    const t = (n = window.ticketHub) == null ? void 0 : n.products.find(
      (r) => +r.itemId == +this.id
    );
    return t ? t.title : this.itemName;
  }
  setBookingData(t, n) {
    try {
      if (this.type === "TimeSlot") {
        const r = [];
        t.timeslots.forEach((o) => {
          let a = n;
          this.isCombo || (a = n && n.filter(
            (l) => o.timeslotDateTime === l.dateTime
          )), this.timeslots.find((l) => l.id === o.timeslotId) || r.push(
            new Xo(
              o,
              a,
              this.dynamicPricingInfo
            )
          );
        }), this.timeslots = this.timeslots.concat(r);
      }
    } catch (r) {
      console.log(r);
    }
  }
  dayTimeslots(t = /* @__PURE__ */ new Date()) {
    return this.timeslots.filter((n) => ue(n.dateTime).isSame(t, "day") && n.isOpen ? !0 : ue(n.dateTime).isSame(t, "day"));
  }
  nightTimeslots(t = /* @__PURE__ */ new Date()) {
    return this.timeslots.filter((r) => {
      if (r.isOpen)
        return !1;
      const o = ue(t).add(1, "day").set("hour", 6);
      return ue(r.dateTime).isAfter(t, "day") && ue(r.dateTime).isBefore(o, "minutes");
    });
  }
  selectTimeslot(t) {
    this.selectedTimeslot = t;
  }
}
var _b = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
class qi extends Zp {
  constructor(n, r = !0) {
    super(n, r);
    le(this, "isCombo", !0);
    le(this, "isSingle", !this.isCombo);
    le(this, "cartItemId", "00000000-0000-0000-0000-000000000000");
    le(this, "packageItems", []);
    +_b.VITE_DEBUG && console.log("Combo product constructor end");
  }
  get defaultPackage() {
    return this.packageItems.sort(
      (r, o) => o.availableCategory.orderPriority - r.availableCategory.orderPriority
    )[0];
  }
  get selectedVariant() {
    return this.variants.find(
      (n) => n.itemId === this.itemId
    );
  }
  get isOpen() {
    return !1;
  }
  get itemPrices() {
    const n = [];
    return this.packageItems.forEach((r) => {
      r.packagePriceInfos.forEach((o) => {
        n.push({
          dateTime: o.day,
          itemPrice: {
            itemPriceId: o.packagePrice.packagePriceId,
            itemPrice: o.packagePrice.packagePrice
          },
          itemCategory: r.availableCategory,
          dynamicPrice: null
        });
      });
    }), n;
  }
  get showedItems() {
    return this.items.filter(
      (n) => !n.isOpen
    );
  }
  get cartProductFormat() {
    return {
      item: null,
      packageGroup: {
        contentInfo: {
          isVariant: this.isHasVariants,
          metadata: this.metaData
        },
        cartPackageGroupId: this.cartItemId,
        packageGroupId: this.itemId,
        packages: this.packageItems.map(
          (n) => {
            const r = this.availableCategories.find(
              (o) => o.itemCategoryId === n.availableCategory.itemCategoryId
            );
            return {
              cartPackageId: n.cartPackageId,
              packageId: n.packageId,
              packageCategory: n.availableCategory,
              categoryId: r.itemCategoryId,
              quantity: r.quantity,
              totalPrice: r.totalPrice,
              packageItems: this.items.map(
                (o) => {
                  var a;
                  return {
                    itemId: o.id,
                    timeslot: ((a = o.selectedTimeslot) == null ? void 0 : a.cartTimeslotFormat) || null,
                    meals: []
                  };
                }
              )
            };
          }
        )
      }
    };
  }
  fillEditData() {
    typeof this.cartItem < "u" && this.cartItem.packageGroup && (this.cartItem.packageGroup.packages.forEach(
      (n) => {
        const r = this.availableCategories.find(
          (o) => o.itemCategoryId === n.packageCategory.itemCategoryId
        );
        typeof r < "u" && (r.quantity = n.quantity), this.packageItems.forEach(
          (o) => {
            o.availableCategory.itemCategoryId === n.packageCategory.itemCategoryId && (o.cartPackageId = n.cartPackageId);
          }
        );
      }
    ), this.fillTimeslots());
  }
  fillTimeslots() {
    this.items.forEach((n) => {
      var i, l;
      const r = (l = (i = this.cartItem) == null ? void 0 : i.packageGroup) == null ? void 0 : l.packages[0];
      if (typeof r > "u")
        return;
      const o = r.packageItems.find((s) => s.itemId === n.id);
      if (typeof o > "u" || !o.timeslot)
        return;
      const a = n.timeslots.find(
        (s) => {
          var c;
          return s.id === ((c = o == null ? void 0 : o.timeslot) == null ? void 0 : c.timeslotId);
        }
      );
      typeof a > "u" || n.selectTimeslot(a);
    });
  }
  setAvailableDays() {
    this.availableDays = this.defaultPackage.packagePriceInfos.map(
      (n) => ({
        date: n.day,
        price: n.packagePrice.packagePrice
      })
    );
  }
  setAvailableCategories() {
    this.availableCategories = this.packageItems.map((n) => new hi(n.availableCategory));
  }
  setItems() {
    this.items.length === 0 ? this.items = this.defaultPackage.packageItems.map(
      (n) => new Qp(n, this.itemPrices, !0)
    ) : this.items.forEach((n, r) => {
      n.setBookingData(
        this.defaultPackage.packageItems[r],
        this.itemPrices
      );
    });
  }
  async setBookingData(n) {
    try {
      this.packageItems = n.map(
        (r, o) => {
          let a = r.availableDays, i = r.packagePriceInfos;
          return typeof this.packageItems[o] < "u" && (a = a.concat(
            this.packageItems[o].availableDays
          ), i = i.concat(
            this.packageItems[o].packagePriceInfos
          )), {
            ...r,
            availableDays: a.sort(),
            packagePriceInfos: i
          };
        }
      );
    } catch (r) {
      console.log(r);
    }
    return this.setAvailableDays(), this.setAvailableCategories(), this.setItems(), this.selectDate(new Date(this.availableDays[0].date)), this.isEdit && this.fillEditData(), { daysAddedCount: 32 };
  }
}
class bb {
  constructor(t) {
    le(this, "id");
    le(this, "description");
    le(this, "itemCategoryId");
    le(this, "quantity");
    this.id = t.id, this.description = t.description, this.itemCategoryId = t.itemCategoryId, this.quantity = 0;
  }
}
var nn = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
class Eb extends Zp {
  constructor(n, r = !0, o = /* @__PURE__ */ new Date()) {
    super(n, r, o);
    le(this, "isSingle", !0);
    le(this, "isCombo", !this.isSingle);
    le(this, "items", []);
    +nn.VITE_DEBUG && console.log("Single product constructor end");
  }
  get defaultProductCategory() {
    return this.availableCategories.sort(
      (n, r) => r.orderPriority - n.orderPriority
    )[0];
  }
  get isOpen() {
    return this.isDisabled ? !1 : this.items.length > 0 && this.items[0].isOpen;
  }
  get showedItems() {
    return this.items;
  }
  get selectedVariant() {
    return this.variants.find((n) => +n.itemId == +this.itemId);
  }
  get cartProductFormat() {
    var n, r;
    return {
      item: {
        cartItemId: this.cartItemId,
        itemId: this.itemId,
        addonInfo: this.addonInfo,
        isAddon: !1,
        itemPriceInfos: this.formattedCartCategories,
        timeslot: ((r = (n = this.items[0]) == null ? void 0 : n.selectedTimeslot) == null ? void 0 : r.cartTimeslotFormat) || null,
        meals: this.formattedCartMeals,
        contentInfo: {
          isVariant: this.isHasVariants,
          metadata: this.metaData
        }
      },
      packageGroup: null
    };
  }
  fillEditData() {
    if (typeof this.cartItem < "u" && this.cartItem.item) {
      this.selectVariant(this.cartItem.item.itemId);
      const n = [];
      if (this.cartItem.item.meals.forEach((r) => {
        const o = this.options.find((a) => a.id === r.id);
        typeof o < "u" && (o.quantity = r.quantity);
      }), this.cartItem.item.itemPriceInfos.forEach(
        (r) => {
          var a;
          const o = this.availableCategories.find(
            (i) => {
              var l;
              return i.itemCategoryId === ((l = r.itemCategory) == null ? void 0 : l.itemCategoryId);
            }
          );
          typeof o < "u" && (o.quantity = r.quantity, n.push({
            itemCategory: o,
            itemPrice: {
              itemPriceId: 0,
              itemPrice: (((a = r.itemPrice) == null ? void 0 : a.price) || 0).toString()
            }
          }));
        }
      ), this.cartItem.item.timeslot) {
        const r = new Xo(
          this.cartItem.item.timeslot,
          n
        );
        this.items.forEach((o) => {
          const a = o.timeslots.find(
            (i) => i.id === r.id
          );
          typeof a > "u" || o.selectTimeslot(a);
        }), this.selectDate(ue(r.dateTime).toDate());
      }
    }
  }
  async setBookingData(n) {
    if (+nn.VITE_DEBUG && console.log("Set booking data start"), n.extra && n.extra.meals && (this.options = n.extra.meals.map(
      (i) => new bb(i)
    ), +nn.VITE_DEBUG && console.log("Set extra end")), this.availableCategories = n.availableCategories.map(
      (i) => new hi(i)
    ), +nn.VITE_DEBUG && console.log("Set categories end"), +nn.VITE_DEBUG && console.log("Set product booking start"), this.items.length === 0) {
      const i = new Qp(
        n,
        n.itemPriceInfos
      );
      this.items = [i], this.isEdit && this.fillEditData();
    } else
      this.items.forEach((i) => {
        i.setBookingData(n, n.itemPriceInfos);
      });
    +nn.VITE_DEBUG && console.log("Set product booking end");
    const { daysAddedCount: r } = await this.setAvailableDays(n), o = ue(this.selectedDate), a = this.availableDays.find(
      (i) => o.isSame(i.date, "day")
    );
    return (!this.selectedDate || typeof a > "u") && this.selectDate(new Date(this.availableDays[0].date)), +nn.VITE_DEBUG && console.log("Set booking data end"), { daysAddedCount: r };
  }
  async setAvailableDays(n) {
    +nn.VITE_DEBUG && console.log("Set days start");
    const r = n.availableDays.map(
      (o) => {
        var i;
        const a = n.itemPriceInfos.find((l) => l.itemCategory.itemCategoryId === this.defaultProductCategory.itemCategoryId && ue(l.dateTime).isSame(o, "day"));
        return {
          date: o,
          price: ((i = a == null ? void 0 : a.dynamicPrice) == null ? void 0 : i.dynamicPrice) || (a == null ? void 0 : a.itemPrice.itemPrice)
        };
      }
    );
    return this.availableDays = this.availableDays.concat(r).sort((o, a) => o.date < a.date ? -1 : o.date > a.date ? 1 : 0), +nn.VITE_DEBUG && console.log("Set days end"), { daysAddedCount: r.length };
  }
}
class wb extends Kp {
  constructor(n) {
    var r, o, a, i, l, s;
    super(
      (r = n.item) == null ? void 0 : r.contentInfo,
      ((o = n.item) == null ? void 0 : o.cartItemId).toString(),
      (a = n.item) == null ? void 0 : a.totalPrice,
      (i = n.item) == null ? void 0 : i.contentInfo.isVariant,
      (l = n.item) == null ? void 0 : l.itemId
    );
    le(this, "item");
    this.isCombo = !1, this.isSingle = !0, this.item = n.item, this.selectedCategories = (s = n.item) == null ? void 0 : s.itemPriceInfos.map(
      (c) => {
        var u, f;
        return new hi(
          {
            itemCategoryName: (u = c.itemCategory) == null ? void 0 : u.itemCategoryName,
            itemCategoryId: (f = c.itemCategory) == null ? void 0 : f.itemCategoryId,
            orderPriority: 0,
            quantity: c.quantity,
            totalPrice: c.totalPrice,
            totalDiscountedPrice: c.totalDiscountedPrice
          },
          !0
        );
      }
    );
  }
  get items() {
    let n = null;
    return this.item.timeslot && (n = new Xo(this.item.timeslot)), [
      {
        itemName: this.item.itemName,
        itemType: this.item.itemType,
        timeslot: n
      }
    ];
  }
  get extraMealsText() {
    const n = this.item.meals.filter(
      (o) => o.quantity !== 0
    ), r = [];
    return n.forEach((o) => {
      r.push(`${o.quantity} ${o.description}`);
    }), r.join(",<br/>");
  }
}
var mr;
((e) => {
  let t;
  e.init = (n, r, o = "", a = "") => {
    const i = {
      "Content-Type": "application/json;charset=utf-8"
    };
    o && (i["x-cart-id"] = o), a && (i["x-api-key"] = a), t = new eo(n, void 0, {
      params: { culture: r },
      headers: i
    });
  }, e.getAvailableDays = async (n, r = !0) => await t.get("capacity/item/available-days", {
    params: {
      itemId: n,
      firstDayOnly: r.toString()
    }
  }), e.getProductBookingData = async (n, r = ue().format("YYYY-MM-DD"), o = 45) => {
    let a = "capacity/item/price/for-days";
    const i = {
      daysRange: o,
      dateFrom: r,
      packageGroupId: "",
      itemId: ""
    };
    return n.isCombo ? (a = "capacity/package/price/for-days", i.packageGroupId = n.itemId.toString()) : i.itemId = n.itemId.toString(), await t.get(a, {
      params: i
    });
  };
})(mr || (mr = {}));
var Cb = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 }, Rn;
((e) => {
  e.getProduct = async (n) => {
    +Cb.VITE_DEBUG && console.log("Detect product");
    try {
      return typeof n.isCombo < "u" ? n.isCombo ? new qi(n) : await t(n) : await t(n);
    } catch {
      return typeof n.isCombo < "u" && !n.isCombo ? new qi(n, !1) : new qi(n);
    }
  };
  const t = async (n) => {
    try {
      const r = await mr.getAvailableDays(n.itemId);
      return new Eb(
        n,
        r.isSellable,
        new Date(r.availableDays[0])
      );
    } catch (r) {
      throw new Error(r);
    }
  };
  e.getCartProduct = (n) => n.item === null && n.packageGroup ? new Jp(n) : new wb(n);
})(Rn || (Rn = {}));
function ga(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var eh = { exports: {} };
(function(e, t) {
  (function(n) {
    e.exports = n();
  })(function() {
    return function n(r, o, a) {
      function i(c, u) {
        if (!o[c]) {
          if (!r[c]) {
            var f = typeof ga == "function" && ga;
            if (!u && f)
              return f(c, !0);
            if (l)
              return l(c, !0);
            throw new Error("Cannot find module '" + c + "'");
          }
          u = o[c] = { exports: {} }, r[c][0].call(u.exports, function(d) {
            var v = r[c][1][d];
            return i(v || d);
          }, u, u.exports, n, r, o, a);
        }
        return o[c].exports;
      }
      for (var l = typeof ga == "function" && ga, s = 0; s < a.length; s++)
        i(a[s]);
      return i;
    }({ 1: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        var p = n("crypto");
        function g(C, b) {
          b = y(C, b);
          var E;
          return (E = b.algorithm !== "passthrough" ? p.createHash(b.algorithm) : new $()).write === void 0 && (E.write = E.update, E.end = E.update), O(b, E).dispatch(C), E.update || E.end(""), E.digest ? E.digest(b.encoding === "buffer" ? void 0 : b.encoding) : (C = E.read(), b.encoding !== "buffer" ? C.toString(b.encoding) : C);
        }
        (o = r.exports = g).sha1 = function(C) {
          return g(C);
        }, o.keys = function(C) {
          return g(C, { excludeValues: !0, algorithm: "sha1", encoding: "hex" });
        }, o.MD5 = function(C) {
          return g(C, { algorithm: "md5", encoding: "hex" });
        }, o.keysMD5 = function(C) {
          return g(C, { algorithm: "md5", encoding: "hex", excludeValues: !0 });
        };
        var m = p.getHashes ? p.getHashes().slice() : ["sha1", "md5"], h = (m.push("passthrough"), ["buffer", "hex", "binary", "base64"]);
        function y(C, b) {
          var E = {};
          if (E.algorithm = (b = b || {}).algorithm || "sha1", E.encoding = b.encoding || "hex", E.excludeValues = !!b.excludeValues, E.algorithm = E.algorithm.toLowerCase(), E.encoding = E.encoding.toLowerCase(), E.ignoreUnknown = b.ignoreUnknown === !0, E.respectType = b.respectType !== !1, E.respectFunctionNames = b.respectFunctionNames !== !1, E.respectFunctionProperties = b.respectFunctionProperties !== !1, E.unorderedArrays = b.unorderedArrays === !0, E.unorderedSets = b.unorderedSets !== !1, E.unorderedObjects = b.unorderedObjects !== !1, E.replacer = b.replacer || void 0, E.excludeKeys = b.excludeKeys || void 0, C === void 0)
            throw new Error("Object argument required.");
          for (var k = 0; k < m.length; ++k)
            m[k].toLowerCase() === E.algorithm.toLowerCase() && (E.algorithm = m[k]);
          if (m.indexOf(E.algorithm) === -1)
            throw new Error('Algorithm "' + E.algorithm + '"  not supported. supported values: ' + m.join(", "));
          if (h.indexOf(E.encoding) === -1 && E.algorithm !== "passthrough")
            throw new Error('Encoding "' + E.encoding + '"  not supported. supported values: ' + h.join(", "));
          return E;
        }
        function w(C) {
          if (typeof C == "function")
            return /^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i.exec(Function.prototype.toString.call(C)) != null;
        }
        function O(C, b, E) {
          E = E || [];
          function k(_) {
            return b.update ? b.update(_, "utf8") : b.write(_, "utf8");
          }
          return { dispatch: function(_) {
            return this["_" + ((_ = C.replacer ? C.replacer(_) : _) === null ? "null" : typeof _)](_);
          }, _object: function(_) {
            var S, A = Object.prototype.toString.call(_), x = /\[object (.*)\]/i.exec(A);
            if (x = (x = x ? x[1] : "unknown:[" + A + "]").toLowerCase(), 0 <= (A = E.indexOf(_)))
              return this.dispatch("[CIRCULAR:" + A + "]");
            if (E.push(_), l !== void 0 && l.isBuffer && l.isBuffer(_))
              return k("buffer:"), k(_);
            if (x === "object" || x === "function" || x === "asyncfunction")
              return A = Object.keys(_), C.unorderedObjects && (A = A.sort()), C.respectType === !1 || w(_) || A.splice(0, 0, "prototype", "__proto__", "constructor"), C.excludeKeys && (A = A.filter(function(B) {
                return !C.excludeKeys(B);
              })), k("object:" + A.length + ":"), S = this, A.forEach(function(B) {
                S.dispatch(B), k(":"), C.excludeValues || S.dispatch(_[B]), k(",");
              });
            if (!this["_" + x]) {
              if (C.ignoreUnknown)
                return k("[" + x + "]");
              throw new Error('Unknown object type "' + x + '"');
            }
            this["_" + x](_);
          }, _array: function(_, B) {
            B = B !== void 0 ? B : C.unorderedArrays !== !1;
            var A = this;
            if (k("array:" + _.length + ":"), !B || _.length <= 1)
              return _.forEach(function(N) {
                return A.dispatch(N);
              });
            var x = [], B = _.map(function(N) {
              var V = new $(), G = E.slice();
              return O(C, V, G).dispatch(N), x = x.concat(G.slice(E.length)), V.read().toString();
            });
            return E = E.concat(x), B.sort(), this._array(B, !1);
          }, _date: function(_) {
            return k("date:" + _.toJSON());
          }, _symbol: function(_) {
            return k("symbol:" + _.toString());
          }, _error: function(_) {
            return k("error:" + _.toString());
          }, _boolean: function(_) {
            return k("bool:" + _.toString());
          }, _string: function(_) {
            k("string:" + _.length + ":"), k(_.toString());
          }, _function: function(_) {
            k("fn:"), w(_) ? this.dispatch("[native]") : this.dispatch(_.toString()), C.respectFunctionNames !== !1 && this.dispatch("function-name:" + String(_.name)), C.respectFunctionProperties && this._object(_);
          }, _number: function(_) {
            return k("number:" + _.toString());
          }, _xml: function(_) {
            return k("xml:" + _.toString());
          }, _null: function() {
            return k("Null");
          }, _undefined: function() {
            return k("Undefined");
          }, _regexp: function(_) {
            return k("regex:" + _.toString());
          }, _uint8array: function(_) {
            return k("uint8array:"), this.dispatch(Array.prototype.slice.call(_));
          }, _uint8clampedarray: function(_) {
            return k("uint8clampedarray:"), this.dispatch(Array.prototype.slice.call(_));
          }, _int8array: function(_) {
            return k("int8array:"), this.dispatch(Array.prototype.slice.call(_));
          }, _uint16array: function(_) {
            return k("uint16array:"), this.dispatch(Array.prototype.slice.call(_));
          }, _int16array: function(_) {
            return k("int16array:"), this.dispatch(Array.prototype.slice.call(_));
          }, _uint32array: function(_) {
            return k("uint32array:"), this.dispatch(Array.prototype.slice.call(_));
          }, _int32array: function(_) {
            return k("int32array:"), this.dispatch(Array.prototype.slice.call(_));
          }, _float32array: function(_) {
            return k("float32array:"), this.dispatch(Array.prototype.slice.call(_));
          }, _float64array: function(_) {
            return k("float64array:"), this.dispatch(Array.prototype.slice.call(_));
          }, _arraybuffer: function(_) {
            return k("arraybuffer:"), this.dispatch(new Uint8Array(_));
          }, _url: function(_) {
            return k("url:" + _.toString());
          }, _map: function(_) {
            return k("map:"), _ = Array.from(_), this._array(_, C.unorderedSets !== !1);
          }, _set: function(_) {
            return k("set:"), _ = Array.from(_), this._array(_, C.unorderedSets !== !1);
          }, _file: function(_) {
            return k("file:"), this.dispatch([_.name, _.size, _.type, _.lastModfied]);
          }, _blob: function() {
            if (C.ignoreUnknown)
              return k("[blob]");
            throw Error(`Hashing Blob objects is currently not supported
(see https://github.com/puleos/object-hash/issues/26)
Use "options.replacer" or "options.ignoreUnknown"
`);
          }, _domwindow: function() {
            return k("domwindow");
          }, _bigint: function(_) {
            return k("bigint:" + _.toString());
          }, _process: function() {
            return k("process");
          }, _timer: function() {
            return k("timer");
          }, _pipe: function() {
            return k("pipe");
          }, _tcp: function() {
            return k("tcp");
          }, _udp: function() {
            return k("udp");
          }, _tty: function() {
            return k("tty");
          }, _statwatcher: function() {
            return k("statwatcher");
          }, _securecontext: function() {
            return k("securecontext");
          }, _connection: function() {
            return k("connection");
          }, _zlib: function() {
            return k("zlib");
          }, _context: function() {
            return k("context");
          }, _nodescript: function() {
            return k("nodescript");
          }, _httpparser: function() {
            return k("httpparser");
          }, _dataview: function() {
            return k("dataview");
          }, _signal: function() {
            return k("signal");
          }, _fsevent: function() {
            return k("fsevent");
          }, _tlswrap: function() {
            return k("tlswrap");
          } };
        }
        function $() {
          return { buf: "", write: function(C) {
            this.buf += C;
          }, end: function(C) {
            this.buf += C;
          }, read: function() {
            return this.buf;
          } };
        }
        o.writeToStream = function(C, b, E) {
          return E === void 0 && (E = b, b = {}), O(b = y(C, b), E).dispatch(C);
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_9a5aa49d.js", "/");
    }, { buffer: 3, crypto: 5, lYpoI2: 11 }], 2: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        (function(p) {
          var g = typeof Uint8Array < "u" ? Uint8Array : Array, m = 43, h = 47, y = 48, w = 97, O = 65, $ = 45, C = 95;
          function b(E) {
            return E = E.charCodeAt(0), E === m || E === $ ? 62 : E === h || E === C ? 63 : E < y ? -1 : E < y + 10 ? E - y + 26 + 26 : E < O + 26 ? E - O : E < w + 26 ? E - w + 26 : void 0;
          }
          p.toByteArray = function(E) {
            var k, _;
            if (0 < E.length % 4)
              throw new Error("Invalid string. Length must be a multiple of 4");
            var S = E.length, S = E.charAt(S - 2) === "=" ? 2 : E.charAt(S - 1) === "=" ? 1 : 0, A = new g(3 * E.length / 4 - S), x = 0 < S ? E.length - 4 : E.length, B = 0;
            function N(V) {
              A[B++] = V;
            }
            for (k = 0; k < x; k += 4, 0)
              N((16711680 & (_ = b(E.charAt(k)) << 18 | b(E.charAt(k + 1)) << 12 | b(E.charAt(k + 2)) << 6 | b(E.charAt(k + 3)))) >> 16), N((65280 & _) >> 8), N(255 & _);
            return S == 2 ? N(255 & (_ = b(E.charAt(k)) << 2 | b(E.charAt(k + 1)) >> 4)) : S == 1 && (N((_ = b(E.charAt(k)) << 10 | b(E.charAt(k + 1)) << 4 | b(E.charAt(k + 2)) >> 2) >> 8 & 255), N(255 & _)), A;
          }, p.fromByteArray = function(E) {
            var k, _, S, A, x = E.length % 3, B = "";
            function N(V) {
              return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(V);
            }
            for (k = 0, S = E.length - x; k < S; k += 3)
              _ = (E[k] << 16) + (E[k + 1] << 8) + E[k + 2], B += N((A = _) >> 18 & 63) + N(A >> 12 & 63) + N(A >> 6 & 63) + N(63 & A);
            switch (x) {
              case 1:
                B = (B += N((_ = E[E.length - 1]) >> 2)) + N(_ << 4 & 63) + "==";
                break;
              case 2:
                B = (B = (B += N((_ = (E[E.length - 2] << 8) + E[E.length - 1]) >> 10)) + N(_ >> 4 & 63)) + N(_ << 2 & 63) + "=";
            }
            return B;
          };
        })(o === void 0 ? this.base64js = {} : o);
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js", "/node_modules/gulp-browserify/node_modules/base64-js/lib");
    }, { buffer: 3, lYpoI2: 11 }], 3: [function(n, r, o) {
      (function(a, i, m, s, c, u, f, d, v) {
        var p = n("base64-js"), g = n("ieee754");
        function m(T, D, R) {
          if (!(this instanceof m))
            return new m(T, D, R);
          var J, I, P, H, ee = typeof T;
          if (D === "base64" && ee == "string")
            for (T = (H = T).trim ? H.trim() : H.replace(/^\s+|\s+$/g, ""); T.length % 4 != 0; )
              T += "=";
          if (ee == "number")
            J = L(T);
          else if (ee == "string")
            J = m.byteLength(T, D);
          else {
            if (ee != "object")
              throw new Error("First argument needs to be a number, array or string.");
            J = L(T.length);
          }
          if (m._useTypedArrays ? I = m._augment(new Uint8Array(J)) : ((I = this).length = J, I._isBuffer = !0), m._useTypedArrays && typeof T.byteLength == "number")
            I._set(T);
          else if (F(H = T) || m.isBuffer(H) || H && typeof H == "object" && typeof H.length == "number")
            for (P = 0; P < J; P++)
              m.isBuffer(T) ? I[P] = T.readUInt8(P) : I[P] = T[P];
          else if (ee == "string")
            I.write(T, 0, D);
          else if (ee == "number" && !m._useTypedArrays && !R)
            for (P = 0; P < J; P++)
              I[P] = 0;
          return I;
        }
        function h(T, D, R, J) {
          return m._charsWritten = fe(function(I) {
            for (var P = [], H = 0; H < I.length; H++)
              P.push(255 & I.charCodeAt(H));
            return P;
          }(D), T, R, J);
        }
        function y(T, D, R, J) {
          return m._charsWritten = fe(function(I) {
            for (var P, H, ee = [], ie = 0; ie < I.length; ie++)
              H = I.charCodeAt(ie), P = H >> 8, H = H % 256, ee.push(H), ee.push(P);
            return ee;
          }(D), T, R, J);
        }
        function w(T, D, R) {
          var J = "";
          R = Math.min(T.length, R);
          for (var I = D; I < R; I++)
            J += String.fromCharCode(T[I]);
          return J;
        }
        function O(T, D, R, P) {
          P || (Y(typeof R == "boolean", "missing or invalid endian"), Y(D != null, "missing offset"), Y(D + 1 < T.length, "Trying to read beyond buffer length"));
          var I, P = T.length;
          if (!(P <= D))
            return R ? (I = T[D], D + 1 < P && (I |= T[D + 1] << 8)) : (I = T[D] << 8, D + 1 < P && (I |= T[D + 1])), I;
        }
        function $(T, D, R, P) {
          P || (Y(typeof R == "boolean", "missing or invalid endian"), Y(D != null, "missing offset"), Y(D + 3 < T.length, "Trying to read beyond buffer length"));
          var I, P = T.length;
          if (!(P <= D))
            return R ? (D + 2 < P && (I = T[D + 2] << 16), D + 1 < P && (I |= T[D + 1] << 8), I |= T[D], D + 3 < P && (I += T[D + 3] << 24 >>> 0)) : (D + 1 < P && (I = T[D + 1] << 16), D + 2 < P && (I |= T[D + 2] << 8), D + 3 < P && (I |= T[D + 3]), I += T[D] << 24 >>> 0), I;
        }
        function C(T, D, R, J) {
          if (J || (Y(typeof R == "boolean", "missing or invalid endian"), Y(D != null, "missing offset"), Y(D + 1 < T.length, "Trying to read beyond buffer length")), !(T.length <= D))
            return J = O(T, D, R, !0), 32768 & J ? -1 * (65535 - J + 1) : J;
        }
        function b(T, D, R, J) {
          if (J || (Y(typeof R == "boolean", "missing or invalid endian"), Y(D != null, "missing offset"), Y(D + 3 < T.length, "Trying to read beyond buffer length")), !(T.length <= D))
            return J = $(T, D, R, !0), 2147483648 & J ? -1 * (4294967295 - J + 1) : J;
        }
        function E(T, D, R, J) {
          return J || (Y(typeof R == "boolean", "missing or invalid endian"), Y(D + 3 < T.length, "Trying to read beyond buffer length")), g.read(T, D, R, 23, 4);
        }
        function k(T, D, R, J) {
          return J || (Y(typeof R == "boolean", "missing or invalid endian"), Y(D + 7 < T.length, "Trying to read beyond buffer length")), g.read(T, D, R, 52, 8);
        }
        function _(T, D, R, J, I) {
          if (I || (Y(D != null, "missing value"), Y(typeof J == "boolean", "missing or invalid endian"), Y(R != null, "missing offset"), Y(R + 1 < T.length, "trying to write beyond buffer length"), Se(D, 65535)), I = T.length, !(I <= R))
            for (var P = 0, H = Math.min(I - R, 2); P < H; P++)
              T[R + P] = (D & 255 << 8 * (J ? P : 1 - P)) >>> 8 * (J ? P : 1 - P);
        }
        function S(T, D, R, J, I) {
          if (I || (Y(D != null, "missing value"), Y(typeof J == "boolean", "missing or invalid endian"), Y(R != null, "missing offset"), Y(R + 3 < T.length, "trying to write beyond buffer length"), Se(D, 4294967295)), I = T.length, !(I <= R))
            for (var P = 0, H = Math.min(I - R, 4); P < H; P++)
              T[R + P] = D >>> 8 * (J ? P : 3 - P) & 255;
        }
        function A(T, D, R, J, I) {
          I || (Y(D != null, "missing value"), Y(typeof J == "boolean", "missing or invalid endian"), Y(R != null, "missing offset"), Y(R + 1 < T.length, "Trying to write beyond buffer length"), ne(D, 32767, -32768)), T.length <= R || _(T, 0 <= D ? D : 65535 + D + 1, R, J, I);
        }
        function x(T, D, R, J, I) {
          I || (Y(D != null, "missing value"), Y(typeof J == "boolean", "missing or invalid endian"), Y(R != null, "missing offset"), Y(R + 3 < T.length, "Trying to write beyond buffer length"), ne(D, 2147483647, -2147483648)), T.length <= R || S(T, 0 <= D ? D : 4294967295 + D + 1, R, J, I);
        }
        function B(T, D, R, J, I) {
          I || (Y(D != null, "missing value"), Y(typeof J == "boolean", "missing or invalid endian"), Y(R != null, "missing offset"), Y(R + 3 < T.length, "Trying to write beyond buffer length"), j(D, 34028234663852886e22, -34028234663852886e22)), T.length <= R || g.write(T, D, R, J, 23, 4);
        }
        function N(T, D, R, J, I) {
          I || (Y(D != null, "missing value"), Y(typeof J == "boolean", "missing or invalid endian"), Y(R != null, "missing offset"), Y(R + 7 < T.length, "Trying to write beyond buffer length"), j(D, 17976931348623157e292, -17976931348623157e292)), T.length <= R || g.write(T, D, R, J, 52, 8);
        }
        o.Buffer = m, o.SlowBuffer = m, o.INSPECT_MAX_BYTES = 50, m.poolSize = 8192, m._useTypedArrays = function() {
          try {
            var T = new ArrayBuffer(0), D = new Uint8Array(T);
            return D.foo = function() {
              return 42;
            }, D.foo() === 42 && typeof D.subarray == "function";
          } catch {
            return !1;
          }
        }(), m.isEncoding = function(T) {
          switch (String(T).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "binary":
            case "base64":
            case "raw":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        }, m.isBuffer = function(T) {
          return !(T == null || !T._isBuffer);
        }, m.byteLength = function(T, D) {
          var R;
          switch (T += "", D || "utf8") {
            case "hex":
              R = T.length / 2;
              break;
            case "utf8":
            case "utf-8":
              R = K(T).length;
              break;
            case "ascii":
            case "binary":
            case "raw":
              R = T.length;
              break;
            case "base64":
              R = re(T).length;
              break;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              R = 2 * T.length;
              break;
            default:
              throw new Error("Unknown encoding");
          }
          return R;
        }, m.concat = function(T, D) {
          if (Y(F(T), `Usage: Buffer.concat(list, [totalLength])
list should be an Array.`), T.length === 0)
            return new m(0);
          if (T.length === 1)
            return T[0];
          if (typeof D != "number")
            for (I = D = 0; I < T.length; I++)
              D += T[I].length;
          for (var R = new m(D), J = 0, I = 0; I < T.length; I++) {
            var P = T[I];
            P.copy(R, J), J += P.length;
          }
          return R;
        }, m.prototype.write = function(T, D, R, J) {
          isFinite(D) ? isFinite(R) || (J = R, R = void 0) : (ie = J, J = D, D = R, R = ie), D = Number(D) || 0;
          var I, P, H, ee, ie = this.length - D;
          switch ((!R || ie < (R = Number(R))) && (R = ie), J = String(J || "utf8").toLowerCase()) {
            case "hex":
              I = function(ve, Re, Me, We) {
                Me = Number(Me) || 0;
                var Fe = ve.length - Me;
                (!We || Fe < (We = Number(We))) && (We = Fe), Y((Fe = Re.length) % 2 == 0, "Invalid hex string"), Fe / 2 < We && (We = Fe / 2);
                for (var _n = 0; _n < We; _n++) {
                  var fa = parseInt(Re.substr(2 * _n, 2), 16);
                  Y(!isNaN(fa), "Invalid hex string"), ve[Me + _n] = fa;
                }
                return m._charsWritten = 2 * _n, _n;
              }(this, T, D, R);
              break;
            case "utf8":
            case "utf-8":
              P = this, H = D, ee = R, I = m._charsWritten = fe(K(T), P, H, ee);
              break;
            case "ascii":
            case "binary":
              I = h(this, T, D, R);
              break;
            case "base64":
              P = this, H = D, ee = R, I = m._charsWritten = fe(re(T), P, H, ee);
              break;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              I = y(this, T, D, R);
              break;
            default:
              throw new Error("Unknown encoding");
          }
          return I;
        }, m.prototype.toString = function(T, D, R) {
          var J, I, P, H, ee = this;
          if (T = String(T || "utf8").toLowerCase(), D = Number(D) || 0, (R = R !== void 0 ? Number(R) : ee.length) === D)
            return "";
          switch (T) {
            case "hex":
              J = function(ie, ve, Re) {
                var Me = ie.length;
                (!ve || ve < 0) && (ve = 0), (!Re || Re < 0 || Me < Re) && (Re = Me);
                for (var We = "", Fe = ve; Fe < Re; Fe++)
                  We += M(ie[Fe]);
                return We;
              }(ee, D, R);
              break;
            case "utf8":
            case "utf-8":
              J = function(ie, ve, Re) {
                var Me = "", We = "";
                Re = Math.min(ie.length, Re);
                for (var Fe = ve; Fe < Re; Fe++)
                  ie[Fe] <= 127 ? (Me += me(We) + String.fromCharCode(ie[Fe]), We = "") : We += "%" + ie[Fe].toString(16);
                return Me + me(We);
              }(ee, D, R);
              break;
            case "ascii":
            case "binary":
              J = w(ee, D, R);
              break;
            case "base64":
              I = ee, H = R, J = (P = D) === 0 && H === I.length ? p.fromByteArray(I) : p.fromByteArray(I.slice(P, H));
              break;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              J = function(ie, ve, Re) {
                for (var Me = ie.slice(ve, Re), We = "", Fe = 0; Fe < Me.length; Fe += 2)
                  We += String.fromCharCode(Me[Fe] + 256 * Me[Fe + 1]);
                return We;
              }(ee, D, R);
              break;
            default:
              throw new Error("Unknown encoding");
          }
          return J;
        }, m.prototype.toJSON = function() {
          return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
        }, m.prototype.copy = function(T, D, R, J) {
          if (D = D || 0, (J = J || J === 0 ? J : this.length) !== (R = R || 0) && T.length !== 0 && this.length !== 0) {
            Y(R <= J, "sourceEnd < sourceStart"), Y(0 <= D && D < T.length, "targetStart out of bounds"), Y(0 <= R && R < this.length, "sourceStart out of bounds"), Y(0 <= J && J <= this.length, "sourceEnd out of bounds"), J > this.length && (J = this.length);
            var I = (J = T.length - D < J - R ? T.length - D + R : J) - R;
            if (I < 100 || !m._useTypedArrays)
              for (var P = 0; P < I; P++)
                T[P + D] = this[P + R];
            else
              T._set(this.subarray(R, R + I), D);
          }
        }, m.prototype.slice = function(T, D) {
          var R = this.length;
          if (T = G(T, R, 0), D = G(D, R, R), m._useTypedArrays)
            return m._augment(this.subarray(T, D));
          for (var J = D - T, I = new m(J, void 0, !0), P = 0; P < J; P++)
            I[P] = this[P + T];
          return I;
        }, m.prototype.get = function(T) {
          return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(T);
        }, m.prototype.set = function(T, D) {
          return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(T, D);
        }, m.prototype.readUInt8 = function(T, D) {
          if (D || (Y(T != null, "missing offset"), Y(T < this.length, "Trying to read beyond buffer length")), !(T >= this.length))
            return this[T];
        }, m.prototype.readUInt16LE = function(T, D) {
          return O(this, T, !0, D);
        }, m.prototype.readUInt16BE = function(T, D) {
          return O(this, T, !1, D);
        }, m.prototype.readUInt32LE = function(T, D) {
          return $(this, T, !0, D);
        }, m.prototype.readUInt32BE = function(T, D) {
          return $(this, T, !1, D);
        }, m.prototype.readInt8 = function(T, D) {
          if (D || (Y(T != null, "missing offset"), Y(T < this.length, "Trying to read beyond buffer length")), !(T >= this.length))
            return 128 & this[T] ? -1 * (255 - this[T] + 1) : this[T];
        }, m.prototype.readInt16LE = function(T, D) {
          return C(this, T, !0, D);
        }, m.prototype.readInt16BE = function(T, D) {
          return C(this, T, !1, D);
        }, m.prototype.readInt32LE = function(T, D) {
          return b(this, T, !0, D);
        }, m.prototype.readInt32BE = function(T, D) {
          return b(this, T, !1, D);
        }, m.prototype.readFloatLE = function(T, D) {
          return E(this, T, !0, D);
        }, m.prototype.readFloatBE = function(T, D) {
          return E(this, T, !1, D);
        }, m.prototype.readDoubleLE = function(T, D) {
          return k(this, T, !0, D);
        }, m.prototype.readDoubleBE = function(T, D) {
          return k(this, T, !1, D);
        }, m.prototype.writeUInt8 = function(T, D, R) {
          R || (Y(T != null, "missing value"), Y(D != null, "missing offset"), Y(D < this.length, "trying to write beyond buffer length"), Se(T, 255)), D >= this.length || (this[D] = T);
        }, m.prototype.writeUInt16LE = function(T, D, R) {
          _(this, T, D, !0, R);
        }, m.prototype.writeUInt16BE = function(T, D, R) {
          _(this, T, D, !1, R);
        }, m.prototype.writeUInt32LE = function(T, D, R) {
          S(this, T, D, !0, R);
        }, m.prototype.writeUInt32BE = function(T, D, R) {
          S(this, T, D, !1, R);
        }, m.prototype.writeInt8 = function(T, D, R) {
          R || (Y(T != null, "missing value"), Y(D != null, "missing offset"), Y(D < this.length, "Trying to write beyond buffer length"), ne(T, 127, -128)), D >= this.length || (0 <= T ? this.writeUInt8(T, D, R) : this.writeUInt8(255 + T + 1, D, R));
        }, m.prototype.writeInt16LE = function(T, D, R) {
          A(this, T, D, !0, R);
        }, m.prototype.writeInt16BE = function(T, D, R) {
          A(this, T, D, !1, R);
        }, m.prototype.writeInt32LE = function(T, D, R) {
          x(this, T, D, !0, R);
        }, m.prototype.writeInt32BE = function(T, D, R) {
          x(this, T, D, !1, R);
        }, m.prototype.writeFloatLE = function(T, D, R) {
          B(this, T, D, !0, R);
        }, m.prototype.writeFloatBE = function(T, D, R) {
          B(this, T, D, !1, R);
        }, m.prototype.writeDoubleLE = function(T, D, R) {
          N(this, T, D, !0, R);
        }, m.prototype.writeDoubleBE = function(T, D, R) {
          N(this, T, D, !1, R);
        }, m.prototype.fill = function(T, D, R) {
          if (D = D || 0, R = R || this.length, Y(typeof (T = typeof (T = T || 0) == "string" ? T.charCodeAt(0) : T) == "number" && !isNaN(T), "value is not a number"), Y(D <= R, "end < start"), R !== D && this.length !== 0) {
            Y(0 <= D && D < this.length, "start out of bounds"), Y(0 <= R && R <= this.length, "end out of bounds");
            for (var J = D; J < R; J++)
              this[J] = T;
          }
        }, m.prototype.inspect = function() {
          for (var T = [], D = this.length, R = 0; R < D; R++)
            if (T[R] = M(this[R]), R === o.INSPECT_MAX_BYTES) {
              T[R + 1] = "...";
              break;
            }
          return "<Buffer " + T.join(" ") + ">";
        }, m.prototype.toArrayBuffer = function() {
          if (typeof Uint8Array > "u")
            throw new Error("Buffer.toArrayBuffer not supported in this browser");
          if (m._useTypedArrays)
            return new m(this).buffer;
          for (var T = new Uint8Array(this.length), D = 0, R = T.length; D < R; D += 1)
            T[D] = this[D];
          return T.buffer;
        };
        var V = m.prototype;
        function G(T, D, R) {
          return typeof T != "number" ? R : D <= (T = ~~T) ? D : 0 <= T || 0 <= (T += D) ? T : 0;
        }
        function L(T) {
          return (T = ~~Math.ceil(+T)) < 0 ? 0 : T;
        }
        function F(T) {
          return (Array.isArray || function(D) {
            return Object.prototype.toString.call(D) === "[object Array]";
          })(T);
        }
        function M(T) {
          return T < 16 ? "0" + T.toString(16) : T.toString(16);
        }
        function K(T) {
          for (var D = [], R = 0; R < T.length; R++) {
            var J = T.charCodeAt(R);
            if (J <= 127)
              D.push(T.charCodeAt(R));
            else
              for (var I = R, P = (55296 <= J && J <= 57343 && R++, encodeURIComponent(T.slice(I, R + 1)).substr(1).split("%")), H = 0; H < P.length; H++)
                D.push(parseInt(P[H], 16));
          }
          return D;
        }
        function re(T) {
          return p.toByteArray(T);
        }
        function fe(T, D, R, J) {
          for (var I = 0; I < J && !(I + R >= D.length || I >= T.length); I++)
            D[I + R] = T[I];
          return I;
        }
        function me(T) {
          try {
            return decodeURIComponent(T);
          } catch {
            return "�";
          }
        }
        function Se(T, D) {
          Y(typeof T == "number", "cannot write a non-number as a number"), Y(0 <= T, "specified a negative value for writing an unsigned value"), Y(T <= D, "value is larger than maximum value for type"), Y(Math.floor(T) === T, "value has a fractional component");
        }
        function ne(T, D, R) {
          Y(typeof T == "number", "cannot write a non-number as a number"), Y(T <= D, "value larger than maximum allowed value"), Y(R <= T, "value smaller than minimum allowed value"), Y(Math.floor(T) === T, "value has a fractional component");
        }
        function j(T, D, R) {
          Y(typeof T == "number", "cannot write a non-number as a number"), Y(T <= D, "value larger than maximum allowed value"), Y(R <= T, "value smaller than minimum allowed value");
        }
        function Y(T, D) {
          if (!T)
            throw new Error(D || "Failed assertion");
        }
        m._augment = function(T) {
          return T._isBuffer = !0, T._get = T.get, T._set = T.set, T.get = V.get, T.set = V.set, T.write = V.write, T.toString = V.toString, T.toLocaleString = V.toString, T.toJSON = V.toJSON, T.copy = V.copy, T.slice = V.slice, T.readUInt8 = V.readUInt8, T.readUInt16LE = V.readUInt16LE, T.readUInt16BE = V.readUInt16BE, T.readUInt32LE = V.readUInt32LE, T.readUInt32BE = V.readUInt32BE, T.readInt8 = V.readInt8, T.readInt16LE = V.readInt16LE, T.readInt16BE = V.readInt16BE, T.readInt32LE = V.readInt32LE, T.readInt32BE = V.readInt32BE, T.readFloatLE = V.readFloatLE, T.readFloatBE = V.readFloatBE, T.readDoubleLE = V.readDoubleLE, T.readDoubleBE = V.readDoubleBE, T.writeUInt8 = V.writeUInt8, T.writeUInt16LE = V.writeUInt16LE, T.writeUInt16BE = V.writeUInt16BE, T.writeUInt32LE = V.writeUInt32LE, T.writeUInt32BE = V.writeUInt32BE, T.writeInt8 = V.writeInt8, T.writeInt16LE = V.writeInt16LE, T.writeInt16BE = V.writeInt16BE, T.writeInt32LE = V.writeInt32LE, T.writeInt32BE = V.writeInt32BE, T.writeFloatLE = V.writeFloatLE, T.writeFloatBE = V.writeFloatBE, T.writeDoubleLE = V.writeDoubleLE, T.writeDoubleBE = V.writeDoubleBE, T.fill = V.fill, T.inspect = V.inspect, T.toArrayBuffer = V.toArrayBuffer, T;
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/buffer/index.js", "/node_modules/gulp-browserify/node_modules/buffer");
    }, { "base64-js": 2, buffer: 3, ieee754: 10, lYpoI2: 11 }], 4: [function(n, r, o) {
      (function(a, i, p, s, c, u, f, d, v) {
        var p = n("buffer").Buffer, g = 4, m = new p(g);
        m.fill(0), r.exports = { hash: function(h, y, w, O) {
          for (var $ = y(function(_, S) {
            _.length % g != 0 && (A = _.length + (g - _.length % g), _ = p.concat([_, m], A));
            for (var A, x = [], B = S ? _.readInt32BE : _.readInt32LE, N = 0; N < _.length; N += g)
              x.push(B.call(_, N));
            return x;
          }(h = p.isBuffer(h) ? h : new p(h), O), 8 * h.length), y = O, C = new p(w), b = y ? C.writeInt32BE : C.writeInt32LE, E = 0; E < $.length; E++)
            b.call(C, $[E], 4 * E, !0);
          return C;
        } };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { buffer: 3, lYpoI2: 11 }], 5: [function(n, r, o) {
      (function(a, i, p, s, c, u, f, d, v) {
        var p = n("buffer").Buffer, g = n("./sha"), m = n("./sha256"), h = n("./rng"), y = { sha1: g, sha256: m, md5: n("./md5") }, w = 64, O = new p(w);
        function $(_, S) {
          var A = y[_ = _ || "sha1"], x = [];
          return A || C("algorithm:", _, "is not yet supported"), { update: function(B) {
            return p.isBuffer(B) || (B = new p(B)), x.push(B), B.length, this;
          }, digest: function(B) {
            var N = p.concat(x), N = S ? function(V, G, L) {
              p.isBuffer(G) || (G = new p(G)), p.isBuffer(L) || (L = new p(L)), G.length > w ? G = V(G) : G.length < w && (G = p.concat([G, O], w));
              for (var F = new p(w), M = new p(w), K = 0; K < w; K++)
                F[K] = 54 ^ G[K], M[K] = 92 ^ G[K];
              return L = V(p.concat([F, L])), V(p.concat([M, L]));
            }(A, S, N) : A(N);
            return x = null, B ? N.toString(B) : N;
          } };
        }
        function C() {
          var _ = [].slice.call(arguments).join(" ");
          throw new Error([_, "we accept pull requests", "http://github.com/dominictarr/crypto-browserify"].join(`
`));
        }
        O.fill(0), o.createHash = function(_) {
          return $(_);
        }, o.createHmac = $, o.randomBytes = function(_, S) {
          if (!S || !S.call)
            return new p(h(_));
          try {
            S.call(this, void 0, new p(h(_)));
          } catch (A) {
            S(A);
          }
        };
        var b, E = ["createCredentials", "createCipher", "createCipheriv", "createDecipher", "createDecipheriv", "createSign", "createVerify", "createDiffieHellman", "pbkdf2"], k = function(_) {
          o[_] = function() {
            C("sorry,", _, "is not implemented yet");
          };
        };
        for (b in E)
          k(E[b]);
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./md5": 6, "./rng": 7, "./sha": 8, "./sha256": 9, buffer: 3, lYpoI2: 11 }], 6: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        var p = n("./helpers");
        function g(C, b) {
          C[b >> 5] |= 128 << b % 32, C[14 + (b + 64 >>> 9 << 4)] = b;
          for (var E = 1732584193, k = -271733879, _ = -1732584194, S = 271733878, A = 0; A < C.length; A += 16) {
            var x = E, B = k, N = _, V = S, E = h(E, k, _, S, C[A + 0], 7, -680876936), S = h(S, E, k, _, C[A + 1], 12, -389564586), _ = h(_, S, E, k, C[A + 2], 17, 606105819), k = h(k, _, S, E, C[A + 3], 22, -1044525330);
            E = h(E, k, _, S, C[A + 4], 7, -176418897), S = h(S, E, k, _, C[A + 5], 12, 1200080426), _ = h(_, S, E, k, C[A + 6], 17, -1473231341), k = h(k, _, S, E, C[A + 7], 22, -45705983), E = h(E, k, _, S, C[A + 8], 7, 1770035416), S = h(S, E, k, _, C[A + 9], 12, -1958414417), _ = h(_, S, E, k, C[A + 10], 17, -42063), k = h(k, _, S, E, C[A + 11], 22, -1990404162), E = h(E, k, _, S, C[A + 12], 7, 1804603682), S = h(S, E, k, _, C[A + 13], 12, -40341101), _ = h(_, S, E, k, C[A + 14], 17, -1502002290), E = y(E, k = h(k, _, S, E, C[A + 15], 22, 1236535329), _, S, C[A + 1], 5, -165796510), S = y(S, E, k, _, C[A + 6], 9, -1069501632), _ = y(_, S, E, k, C[A + 11], 14, 643717713), k = y(k, _, S, E, C[A + 0], 20, -373897302), E = y(E, k, _, S, C[A + 5], 5, -701558691), S = y(S, E, k, _, C[A + 10], 9, 38016083), _ = y(_, S, E, k, C[A + 15], 14, -660478335), k = y(k, _, S, E, C[A + 4], 20, -405537848), E = y(E, k, _, S, C[A + 9], 5, 568446438), S = y(S, E, k, _, C[A + 14], 9, -1019803690), _ = y(_, S, E, k, C[A + 3], 14, -187363961), k = y(k, _, S, E, C[A + 8], 20, 1163531501), E = y(E, k, _, S, C[A + 13], 5, -1444681467), S = y(S, E, k, _, C[A + 2], 9, -51403784), _ = y(_, S, E, k, C[A + 7], 14, 1735328473), E = w(E, k = y(k, _, S, E, C[A + 12], 20, -1926607734), _, S, C[A + 5], 4, -378558), S = w(S, E, k, _, C[A + 8], 11, -2022574463), _ = w(_, S, E, k, C[A + 11], 16, 1839030562), k = w(k, _, S, E, C[A + 14], 23, -35309556), E = w(E, k, _, S, C[A + 1], 4, -1530992060), S = w(S, E, k, _, C[A + 4], 11, 1272893353), _ = w(_, S, E, k, C[A + 7], 16, -155497632), k = w(k, _, S, E, C[A + 10], 23, -1094730640), E = w(E, k, _, S, C[A + 13], 4, 681279174), S = w(S, E, k, _, C[A + 0], 11, -358537222), _ = w(_, S, E, k, C[A + 3], 16, -722521979), k = w(k, _, S, E, C[A + 6], 23, 76029189), E = w(E, k, _, S, C[A + 9], 4, -640364487), S = w(S, E, k, _, C[A + 12], 11, -421815835), _ = w(_, S, E, k, C[A + 15], 16, 530742520), E = O(E, k = w(k, _, S, E, C[A + 2], 23, -995338651), _, S, C[A + 0], 6, -198630844), S = O(S, E, k, _, C[A + 7], 10, 1126891415), _ = O(_, S, E, k, C[A + 14], 15, -1416354905), k = O(k, _, S, E, C[A + 5], 21, -57434055), E = O(E, k, _, S, C[A + 12], 6, 1700485571), S = O(S, E, k, _, C[A + 3], 10, -1894986606), _ = O(_, S, E, k, C[A + 10], 15, -1051523), k = O(k, _, S, E, C[A + 1], 21, -2054922799), E = O(E, k, _, S, C[A + 8], 6, 1873313359), S = O(S, E, k, _, C[A + 15], 10, -30611744), _ = O(_, S, E, k, C[A + 6], 15, -1560198380), k = O(k, _, S, E, C[A + 13], 21, 1309151649), E = O(E, k, _, S, C[A + 4], 6, -145523070), S = O(S, E, k, _, C[A + 11], 10, -1120210379), _ = O(_, S, E, k, C[A + 2], 15, 718787259), k = O(k, _, S, E, C[A + 9], 21, -343485551), E = $(E, x), k = $(k, B), _ = $(_, N), S = $(S, V);
          }
          return Array(E, k, _, S);
        }
        function m(C, b, E, k, _, S) {
          return $((b = $($(b, C), $(k, S))) << _ | b >>> 32 - _, E);
        }
        function h(C, b, E, k, _, S, A) {
          return m(b & E | ~b & k, C, b, _, S, A);
        }
        function y(C, b, E, k, _, S, A) {
          return m(b & k | E & ~k, C, b, _, S, A);
        }
        function w(C, b, E, k, _, S, A) {
          return m(b ^ E ^ k, C, b, _, S, A);
        }
        function O(C, b, E, k, _, S, A) {
          return m(E ^ (b | ~k), C, b, _, S, A);
        }
        function $(C, b) {
          var E = (65535 & C) + (65535 & b);
          return (C >> 16) + (b >> 16) + (E >> 16) << 16 | 65535 & E;
        }
        r.exports = function(C) {
          return p.hash(C, g, 16);
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 7: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        r.exports = function(p) {
          for (var g, m = new Array(p), h = 0; h < p; h++)
            !(3 & h) && (g = 4294967296 * Math.random()), m[h] = g >>> ((3 & h) << 3) & 255;
          return m;
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { buffer: 3, lYpoI2: 11 }], 8: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        var p = n("./helpers");
        function g(y, w) {
          y[w >> 5] |= 128 << 24 - w % 32, y[15 + (w + 64 >> 9 << 4)] = w;
          for (var O, $, C, b = Array(80), E = 1732584193, k = -271733879, _ = -1732584194, S = 271733878, A = -1009589776, x = 0; x < y.length; x += 16) {
            for (var B = E, N = k, V = _, G = S, L = A, F = 0; F < 80; F++) {
              b[F] = F < 16 ? y[x + F] : h(b[F - 3] ^ b[F - 8] ^ b[F - 14] ^ b[F - 16], 1);
              var M = m(m(h(E, 5), (M = k, $ = _, C = S, (O = F) < 20 ? M & $ | ~M & C : !(O < 40) && O < 60 ? M & $ | M & C | $ & C : M ^ $ ^ C)), m(m(A, b[F]), (O = F) < 20 ? 1518500249 : O < 40 ? 1859775393 : O < 60 ? -1894007588 : -899497514)), A = S, S = _, _ = h(k, 30), k = E, E = M;
            }
            E = m(E, B), k = m(k, N), _ = m(_, V), S = m(S, G), A = m(A, L);
          }
          return Array(E, k, _, S, A);
        }
        function m(y, w) {
          var O = (65535 & y) + (65535 & w);
          return (y >> 16) + (w >> 16) + (O >> 16) << 16 | 65535 & O;
        }
        function h(y, w) {
          return y << w | y >>> 32 - w;
        }
        r.exports = function(y) {
          return p.hash(y, g, 20, !0);
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 9: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        function p(w, O) {
          var $ = (65535 & w) + (65535 & O);
          return (w >> 16) + (O >> 16) + ($ >> 16) << 16 | 65535 & $;
        }
        function g(w, O) {
          var $, C = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298), b = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225), E = new Array(64);
          w[O >> 5] |= 128 << 24 - O % 32, w[15 + (O + 64 >> 9 << 4)] = O;
          for (var k, _, S = 0; S < w.length; S += 16) {
            for (var A = b[0], x = b[1], B = b[2], N = b[3], V = b[4], G = b[5], L = b[6], F = b[7], M = 0; M < 64; M++)
              E[M] = M < 16 ? w[M + S] : p(p(p((_ = E[M - 2], h(_, 17) ^ h(_, 19) ^ y(_, 10)), E[M - 7]), (_ = E[M - 15], h(_, 7) ^ h(_, 18) ^ y(_, 3))), E[M - 16]), $ = p(p(p(p(F, h(_ = V, 6) ^ h(_, 11) ^ h(_, 25)), V & G ^ ~V & L), C[M]), E[M]), k = p(h(k = A, 2) ^ h(k, 13) ^ h(k, 22), A & x ^ A & B ^ x & B), F = L, L = G, G = V, V = p(N, $), N = B, B = x, x = A, A = p($, k);
            b[0] = p(A, b[0]), b[1] = p(x, b[1]), b[2] = p(B, b[2]), b[3] = p(N, b[3]), b[4] = p(V, b[4]), b[5] = p(G, b[5]), b[6] = p(L, b[6]), b[7] = p(F, b[7]);
          }
          return b;
        }
        var m = n("./helpers"), h = function(w, O) {
          return w >>> O | w << 32 - O;
        }, y = function(w, O) {
          return w >>> O;
        };
        r.exports = function(w) {
          return m.hash(w, g, 32, !0);
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 10: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        o.read = function(p, g, m, h, S) {
          var w, O, $ = 8 * S - h - 1, C = (1 << $) - 1, b = C >> 1, E = -7, k = m ? S - 1 : 0, _ = m ? -1 : 1, S = p[g + k];
          for (k += _, w = S & (1 << -E) - 1, S >>= -E, E += $; 0 < E; w = 256 * w + p[g + k], k += _, E -= 8)
            ;
          for (O = w & (1 << -E) - 1, w >>= -E, E += h; 0 < E; O = 256 * O + p[g + k], k += _, E -= 8)
            ;
          if (w === 0)
            w = 1 - b;
          else {
            if (w === C)
              return O ? NaN : 1 / 0 * (S ? -1 : 1);
            O += Math.pow(2, h), w -= b;
          }
          return (S ? -1 : 1) * O * Math.pow(2, w - h);
        }, o.write = function(p, g, m, h, y, A) {
          var O, $, C = 8 * A - y - 1, b = (1 << C) - 1, E = b >> 1, k = y === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, _ = h ? 0 : A - 1, S = h ? 1 : -1, A = g < 0 || g === 0 && 1 / g < 0 ? 1 : 0;
          for (g = Math.abs(g), isNaN(g) || g === 1 / 0 ? ($ = isNaN(g) ? 1 : 0, O = b) : (O = Math.floor(Math.log(g) / Math.LN2), g * (h = Math.pow(2, -O)) < 1 && (O--, h *= 2), 2 <= (g += 1 <= O + E ? k / h : k * Math.pow(2, 1 - E)) * h && (O++, h /= 2), b <= O + E ? ($ = 0, O = b) : 1 <= O + E ? ($ = (g * h - 1) * Math.pow(2, y), O += E) : ($ = g * Math.pow(2, E - 1) * Math.pow(2, y), O = 0)); 8 <= y; p[m + _] = 255 & $, _ += S, $ /= 256, y -= 8)
            ;
          for (O = O << y | $, C += y; 0 < C; p[m + _] = 255 & O, _ += S, O /= 256, C -= 8)
            ;
          p[m + _ - S] |= 128 * A;
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/ieee754/index.js", "/node_modules/gulp-browserify/node_modules/ieee754");
    }, { buffer: 3, lYpoI2: 11 }], 11: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        var p, g, m;
        function h() {
        }
        (a = r.exports = {}).nextTick = (g = typeof window < "u" && window.setImmediate, m = typeof window < "u" && window.postMessage && window.addEventListener, g ? function(y) {
          return window.setImmediate(y);
        } : m ? (p = [], window.addEventListener("message", function(y) {
          var w = y.source;
          w !== window && w !== null || y.data !== "process-tick" || (y.stopPropagation(), 0 < p.length && p.shift()());
        }, !0), function(y) {
          p.push(y), window.postMessage("process-tick", "*");
        }) : function(y) {
          setTimeout(y, 0);
        }), a.title = "browser", a.browser = !0, a.env = {}, a.argv = [], a.on = h, a.addListener = h, a.once = h, a.off = h, a.removeListener = h, a.removeAllListeners = h, a.emit = h, a.binding = function(y) {
          throw new Error("process.binding is not supported");
        }, a.cwd = function() {
          return "/";
        }, a.chdir = function(y) {
          throw new Error("process.chdir is not supported");
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/process/browser.js", "/node_modules/gulp-browserify/node_modules/process");
    }, { buffer: 3, lYpoI2: 11 }] }, {}, [1])(1);
  });
})(eh);
var Tb = eh.exports;
const Sb = /* @__PURE__ */ _r(Tb), El = [
  "Processed",
  "SelfRebooked",
  "ForceCancellation"
], su = [
  {
    itemCategoryId: 1,
    quantity: 2,
    itemCategoryName: "",
    orderPriority: 1
  }
], $e = jn(
  "cart",
  () => {
    const e = Q({
      bookingFee: 0,
      status: "NotPaid",
      cartId: "",
      items: [],
      customerInfo: {
        email: "",
        name: "",
        hasSpecialOffersApproved: !1,
        hasTermsAndConditionsApproved: !1,
        culture: ""
      },
      vouchers: [],
      totalPrice: 0,
      discountAmount: 0,
      totalDiscountedPrice: 0,
      vatAmount: 0
    }), t = Q(!1), n = Q([
      ...su
    ]), r = Q(Date.now()), o = Q(Date.now()), a = Q(null), i = Q(null), l = te(
      () => {
        var L;
        return (L = e.value) == null ? void 0 : L.items.map((F) => Rn.getCartProduct(F));
      }
    ), s = (L) => te(() => {
      const F = n.value.find(
        (M) => M.itemCategoryId === L
      );
      return typeof F < "u" ? F.quantity : 0;
    }), c = te(() => !!(e.value.customerInfo.email && e.value.customerInfo.name && e.value.customerInfo.hasTermsAndConditionsApproved)), u = te(() => e.value ? El.includes(e.value.status) : !1), f = te(() => Sb(e.value) + r.value), d = te(() => {
      var L;
      return ((L = l.value) == null ? void 0 : L.length) || 0;
    }), v = te(() => {
      var L;
      return ((L = e.value) == null ? void 0 : L.vouchers) || [];
    }), p = te(() => v.value.length !== 0), g = te(() => e.value.cartId), m = te(() => {
      var L;
      return (L = e.value) == null ? void 0 : L.vouchers.map((F) => {
        var re;
        const M = F.description;
        let K = F.value;
        return F.type === "Percentage" && (K = ((re = e.value) == null ? void 0 : re.totalPrice) / 100 * F.value), { title: M, amount: K };
      });
    }), h = te(() => {
      let L = !1;
      for (const F of l.value)
        if (F.isExpired && (L = F.isExpired, F.isExpired))
          break;
      return L;
    }), y = te(() => {
      if (i.value)
        return ue(i.value).tz("Europe/Amsterdam");
    }), w = (L) => {
      !L || i.value || (i.value = L, setInterval(() => {
        i.value = ue(i.value).add(1, "second").toISOString();
      }, 1e3));
    }, O = (L = Date.now()) => {
      a.value = null, r.value = L;
    }, $ = (L = Date.now()) => {
      o.value = L;
    }, C = () => {
      O(0);
    }, b = (L, F = 0) => {
      const M = n.value.find(
        (K) => K.itemCategoryId === L
      );
      if (typeof M < "u") {
        if (M.quantity = F, F === 0) {
          const K = su.find(
            (re) => re.itemCategoryId === L
          );
          typeof K < "u" && (M.quantity = K.quantity);
        }
      } else
        n.value.push({
          quantity: F,
          itemCategoryId: L,
          itemCategoryName: "",
          orderPriority: 0
        });
    }, E = async () => {
      t.value || (t.value = !0, e.value = await vt.recalculate(g.value), t.value = !1, $());
    }, k = (L) => {
      var M, K;
      let F = (M = e.value) == null ? void 0 : M.items.find(
        (re) => {
          var fe;
          return ((fe = re.item) == null ? void 0 : fe.cartItemId) === +L;
        }
      );
      return typeof F > "u" && (F = (K = e.value) == null ? void 0 : K.items.find(
        (re) => {
          var fe;
          return ((fe = re.packageGroup) == null ? void 0 : fe.cartPackageGroupId) === L;
        }
      )), F;
    }, _ = async () => {
      var L;
      if ((L = e.value) != null && L.cartId && u) {
        try {
          e.value = await vt.getCart(e.value.cartId);
        } catch {
          e.value = await vt.getNewCart();
        }
        return;
      }
      await S();
    }, S = async () => {
      e.value = await vt.getNewCart(), C();
    }, A = async (L) => {
      var F;
      if ((F = e.value) != null && F.cartId)
        try {
          const M = await vt.addCartItem(e.value.cartId, L);
          e.value = M.cart, C(), window.dispatchEvent(new CustomEvent("th:cartItemIsAdded"));
        } catch (M) {
          if (M instanceof It) {
            if (M.statusCode === 403) {
              await S(), await A(L);
              return;
            }
            throw M;
          }
        }
    }, x = async (L, F = !1) => {
      var M;
      if ((M = e.value) != null && M.cartId)
        try {
          const K = await vt.deleteCartItem(
            e.value.cartId,
            L,
            F
          );
          e.value = K.cart, C();
        } catch (K) {
          if (K instanceof It)
            if (K.statusCode === 403)
              await S(), await x(L, F);
            else
              throw K;
        }
    }, B = async () => {
      var L;
      if ((L = e.value) != null && L.cartId)
        try {
          return await vt.getCartUpsells(e.value.cartId);
        } catch (F) {
          if (F instanceof It)
            if (F.statusCode === 403)
              await S();
            else
              throw F;
        }
    }, N = async (L) => {
      var F;
      if ((F = e.value) != null && F.cartId)
        try {
          e.value = (await vt.setVoucher(e.value.cartId, L)).cart, C();
        } catch (M) {
          if (M instanceof It)
            if (M.statusCode === 403)
              await S(), await N(L);
            else
              throw M;
        }
    }, V = async (L) => {
      var F;
      if ((F = e.value) != null && F.cartId)
        try {
          e.value = (await vt.deleteVoucher(e.value.cartId, L)).cart, C();
        } catch (M) {
          if (M instanceof It)
            if (M.statusCode === 403)
              await S(), await V(L);
            else
              throw M;
        }
    }, G = async (L) => {
      var F, M;
      if ((F = e.value) != null && F.cartId)
        try {
          e.value = await vt.updateCustomerInfo(e.value.cartId, {
            ...(M = e.value) == null ? void 0 : M.customerInfo,
            ...L
          }), C();
        } catch (K) {
          if (K instanceof It)
            if (K.statusCode === 403)
              await S(), await G(L);
            else
              throw K;
        }
    };
    return {
      setServerTime: w,
      getServerTime: y,
      cart: e,
      lastPayCartRequestTime: r,
      items: l,
      count: d,
      vouchers: v,
      isVouchersApplied: p,
      discountSummaries: m,
      cartId: g,
      cartHash: f,
      isExpired: h,
      dropinSession: a,
      isTicketsAvailableForDownload: u,
      isCustomerInfoFilled: c,
      recalculate: E,
      updateLastPayCartRequest: O,
      clearLastPayCartRequest: C,
      getCart: _,
      getItemByCartItemId: k,
      addCartItem: A,
      deleteCartItem: x,
      setVoucher: N,
      deleteVoucher: V,
      updateCustomerInfo: G,
      createNewCart: S,
      preselectedVisitors: n,
      getCategoryPreselectQuantity: s,
      updateCategoryPreselectQuantity: b,
      getUpsellItems: B,
      updateLastCartRequest: $,
      lastCartRequestTime: o
    };
  },
  {
    persist: !0
  }
), th = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  availableTicketsStatutes: El,
  useCartStore: $e
}, Symbol.toStringTag, { value: "Module" }));
class It extends Error {
  constructor(n = 555, r) {
    super();
    le(this, "statusCode");
    this.statusCode = n, typeof r == "string" && (this.message = r), r !== null && typeof r == "object" && (this.message = r.error || r.message || r);
  }
}
class eo {
  constructor(t, n = 6e4, r = {}) {
    le(this, "options");
    le(this, "baseURL");
    le(this, "timeout");
    le(this, "abortController");
    this.baseURL = t, this.timeout = n, this.abortController = new AbortController(), this.options = r;
  }
  async query(t = "/", n = this.options, r = !1) {
    const o = new AbortController(), { signal: a } = o;
    return await Qv(async () => {
      var p, g, m, h;
      const l = setTimeout(() => this.abortController.abort(), this.timeout), s = new URL(t, this.baseURL);
      let c = "";
      const u = Object.assign({}, this.options.params, n.params);
      if (u && Object.entries(u).forEach((y) => {
        y[1] && s.searchParams.set(y[0], y[1]);
      }), !r) {
        if (window) {
          const y = new URLSearchParams(window.location.search);
          y.has("cartId") && (n.headers["x-cart-id"] = y.get("cartId"));
        }
        typeof u.cartId < "u" && (n.headers["x-cart-id"] = u.cartId);
      }
      const f = await fetch(s.href, {
        ...n,
        params: u,
        signal: this.abortController.signal
      });
      clearTimeout(l);
      const { setServerTime: d } = $e(), v = f.headers.get("Date");
      return d(v), (p = f.headers.get("Content-type")) != null && p.includes("application/json") ? c = await f.json() : (g = f.headers.get("Content-type")) != null && g.includes("application/pdf") ? c = await f.blob() : c = await f.text(), f.ok ? (m = f.headers.get("Content-type")) != null && m.includes("application/pdf") ? {
        blob: c,
        filename: (h = f.headers.get("Content-Disposition")) == null ? void 0 : h.split("filename=")[1].split(";")[0]
      } : c : Promise.reject(
        new It(f.status, c)
      );
    }, {
      onFailedAttempt: (l) => {
        [400, 401, 403, 404, 409].includes(l.statusCode) && o.abort(l);
      },
      signal: a,
      retries: 2
    });
  }
  async get(t = "/", n = {}, r = !1) {
    return this.query(
      t,
      { ...this.options, ...n, method: "GET" },
      r
    );
  }
  async post(t = "/", n = {}) {
    return this.query(t, { ...this.options, ...n, method: "POST" });
  }
  async delete(t = "/", n = {}) {
    return this.query(t, { ...this.options, ...n, method: "DELETE" });
  }
}
var vt;
((e) => {
  let t;
  e.init = (n, r, o = "", a = "") => {
    const i = {
      "Content-Type": "application/json;charset=utf-8"
    };
    o && (i["x-cart-id"] = o), a && (i["x-api-key"] = a), t = new eo(n, void 0, {
      params: { culture: r },
      headers: i
    });
  }, e.getNewCart = async () => {
    const n = { ...t.options.headers };
    delete n["x-cart-id"];
    const r = await t.get(
      "cart/new",
      {
        // @ts-ignore
        headers: n
      },
      !0
    );
    return $e().updateLastCartRequest(), r;
  }, e.recalculate = async (n) => {
    const r = await t.get("cart/recalculate", {
      params: { cartId: n }
    });
    return $e().updateLastCartRequest(), r;
  }, e.getCart = async (n) => {
    const r = await t.get("cart", {
      params: { cartId: n }
    });
    return $e().updateLastCartRequest(), r;
  }, e.addCartItem = async (n, r) => {
    const o = await t.post("cart/item", {
      params: {
        cartId: n
      },
      body: JSON.stringify(r)
    });
    return $e().updateLastCartRequest(), o;
  }, e.deleteCartItem = async (n, r, o = !1) => {
    const a = o ? "cartPackageGroupId" : "cartItemId", i = { cartId: n };
    i[a] = r;
    const l = await t.delete("cart/item", {
      params: i
    });
    return $e().updateLastCartRequest(), l;
  }, e.setVoucher = async (n, r) => {
    const o = await t.post("cart/voucher", {
      params: {
        cartId: n,
        voucherCode: r
      }
    });
    return $e().updateLastCartRequest(), o;
  }, e.deleteVoucher = async (n, r) => {
    const o = await t.delete("cart/voucher", {
      params: {
        cartId: n,
        voucherCode: r
      }
    });
    return $e().updateLastCartRequest(), o;
  }, e.updateCustomerInfo = async (n, r) => {
    const o = await t.post("cart/customer-info", {
      params: {
        cartId: n
      },
      body: JSON.stringify(r)
    });
    return $e().updateLastCartRequest(), o;
  }, e.getCartUpsells = async (n, r) => {
    const o = await t.get("upsell/cart", {
      params: {
        cartId: n,
        cityId: r
      }
    });
    return $e().updateLastCartRequest(), o;
  };
})(vt || (vt = {}));
var $o;
((e) => {
  let t;
  e.init = (n, r, o = "", a = "") => {
    const i = {
      "Content-Type": "application/json;charset=utf-8"
    };
    o && (i["x-cart-id"] = o), a && (i["x-api-key"] = a), t = new eo(n, void 0, {
      params: { culture: r },
      headers: i
    });
  }, e.getDropinSession = async (n, r) => await t.post("checkout/pay-cart", {
    params: {
      cartId: n
    },
    body: JSON.stringify({
      returnUrl: r
    })
  }), e.getDropinConfig = async () => await t.get("checkout/dropin-config"), e.downloadTickets = async (n) => await t.get("checkout/download-tickets", {
    params: {
      cartId: n
    }
  }), e.getDetails = async (n = "", r = "") => await t.post("checkout/payment-details", {
    params: {
      redirectResult: n,
      threeDSResult: r
    }
  });
})($o || ($o = {}));
var qa;
((e) => {
  let t, n;
  e.init = (r = "/") => {
    n = r.trim().toLowerCase(), n = n.endsWith("/") ? r : r + "/", n += "upsells/", t = new eo(n, 5e3);
  }, e.getUpsells = async (r) => {
    const o = new URLSearchParams();
    return r.forEach((a) => {
      o.append("itemId[]", a.toString());
    }), await t.get(
      `${n}?${o.toString()}`
    );
  }, e.getUpsellByItemId = async (r) => (await (0, e.getUpsells)([r]))[0];
})(qa || (qa = {}));
var za;
((e) => {
  let t;
  e.init = (n, r, o = "", a = "") => {
    const i = {
      "Content-Type": "application/json;charset=utf-8"
    };
    o && (i["x-cart-id"] = o), a && (i["x-api-key"] = a), t = new eo(n, void 0, {
      params: { culture: r },
      headers: i
    });
  }, e.getCart = async (n, r) => await t.get("rebook/cart", {
    params: { shopperEmail: n, orderReference: r }
  }), e.updateCart = async (n, r, o) => await t.post("rebook", {
    params: { cartId: n, orderReference: r },
    body: JSON.stringify(o)
  });
})(za || (za = {}));
const kb = (e, t, n = "/actions/ticket-hub/currencies", r = "", o = !1, a = "", i) => {
  new URL("api/", window.location.origin);
  const l = e, s = new URL(n, window.location.origin);
  o || Wa.init(s.href), typeof i < "u" && qa.init(i), vt.init(l, t, r, a), mr.init(l, t, r, a), $o.init(l, t, r, a), za.init(l, t, r, a);
}, mi = jn("cart-dialog", () => {
  const e = Q(!1);
  Le(e, (r) => {
    window.dispatchEvent(
      new CustomEvent(r ? "th:cartPopupOpen" : "th:cartPopupClose")
    );
  });
  function t() {
    e.value = !0;
  }
  function n() {
    e.value = !e.value;
  }
  return { isOpen: e, toggle: n, show: t };
}), ge = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
}, Ib = {}, Ob = {
  width: "14",
  height: "14",
  viewBox: "0 0 14 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, Db = /* @__PURE__ */ q("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: `M0.46967 12.4403C0.176777 12.7332 0.176777 13.208 0.46967 13.5009C0.762563
			13.7938 1.23744 13.7938 1.53033 13.5009L6.99989 8.03136L12.4694 13.5009C12.7623
			13.7938 13.2372 13.7938 13.5301 13.5009C13.823 13.208 13.823 12.7332 13.5301
			12.4403L8.06055 6.9707L13.4697 1.56158C13.7626 1.26869 13.7626 0.793813 13.4697
			0.50092C13.1768 0.208027 12.7019 0.208027 12.409 0.50092L6.99989 5.91004L1.59076
			0.500921C1.29787 0.208027 0.822997 0.208027 0.530103 0.500921C0.23721 0.793814
			0.23721 1.26869 0.530103 1.56158L5.93923 6.9707L0.46967 12.4403Z`,
  fill: "currentColor"
}, null, -1), Pb = [
  Db
];
function Ab(e, t) {
  return U(), X("svg", Ob, Pb);
}
const $b = /* @__PURE__ */ ge(Ib, [["render", Ab]]), Nb = /* @__PURE__ */ pe({
  __name: "CloseButton",
  props: {
    tag: { default: "button" },
    to: {}
  },
  setup(e) {
    return (t, n) => (U(), de(qo(t.tag), {
      class: "th-close-btn",
      to: t.to,
      bg: "accent",
      type: "button"
    }, {
      default: we(() => [
        z($b)
      ]),
      _: 1
    }, 8, ["to"]));
  }
}), nh = /* @__PURE__ */ ge(Nb, [["__scopeId", "data-v-d7b7cafe"]]);
/**
 * tua-body-scroll-lock v1.5.0
 * (c) 2024 Evinma, BuptStEve
 * @license MIT
 */
var vi = function() {
  return typeof window > "u";
}, Rs = function(t) {
  t = t || navigator.userAgent;
  var n = /(iPad).*OS\s([\d_]+)/.test(t), r = !n && /(iPhone\sOS)\s([\d_]+)/.test(t), o = /(Android);?[\s/]+([\d.]+)?/.test(t), a = r || n;
  return {
    ios: a,
    android: o
  };
};
function Lb(e) {
  if (vi())
    return !1;
  if (!e)
    throw new Error("options must be provided");
  var t = !1, n = {
    get passive() {
      t = !0;
    }
  }, r = function() {
  }, o = "__TUA_BSL_TEST_PASSIVE__";
  window.addEventListener(o, r, n), window.removeEventListener(o, r, n);
  var a = e.capture;
  return t ? e : typeof a < "u" ? a : !1;
}
function rh(e) {
  return e || e === null || process.env.NODE_ENV === "production" ? !1 : (process.env.NODE_ENV !== "test" && console.warn("If scrolling is also required in the floating layer, the target element must be provided."), !0);
}
function wl() {
  return "__BSL_PREVENT_DEFAULT__" in window || (window.__BSL_PREVENT_DEFAULT__ = function(e) {
    e.cancelable && e.preventDefault();
  }), window.__BSL_PREVENT_DEFAULT__;
}
var Aa = {
  lockedNum: 0,
  lockedElements: [],
  unLockCallback: null,
  documentListenerAdded: !1,
  initialClientPos: {
    clientX: 0,
    clientY: 0
  }
};
function gi(e) {
  if (vi())
    return Aa;
  if (!(e != null && e.useGlobalLockState))
    return gi.lockState;
  var t = "__BSL_LOCK_STATE__" in window ? Object.assign(Object.assign({}, Aa), window.__BSL_LOCK_STATE__) : Aa;
  return window.__BSL_LOCK_STATE__ = t, t;
}
gi.lockState = Aa;
function Rb(e, t, n) {
  if (t) {
    var r = t.scrollTop, o = t.scrollLeft, a = t.scrollWidth, i = t.scrollHeight, l = t.clientWidth, s = t.clientHeight, c = e.targetTouches[0].clientX - n.clientX, u = e.targetTouches[0].clientY - n.clientY, f = Math.abs(u) > Math.abs(c), d = u > 0 && r === 0, v = c > 0 && o === 0, p = c < 0 && o + l + 1 >= a, g = u < 0 && r + s + 1 >= i;
    if (f && (d || g) || !f && (v || p))
      return wl()(e);
  }
  return e.stopPropagation(), !0;
}
function Mb() {
  var e = document.documentElement, t = Object.assign({}, e.style), n = window.innerWidth - e.clientWidth, r = parseInt(window.getComputedStyle(e).paddingRight, 10);
  return e.style.overflow = "hidden", e.style.boxSizing = "border-box", e.style.paddingRight = "".concat(n + r, "px"), function() {
    ["overflow", "boxSizing", "paddingRight"].forEach(function(o) {
      e.style[o] = t[o] || "";
    });
  };
}
function xb(e) {
  var t = document.documentElement, n = document.body, r = t.scrollTop || n.scrollTop, o = Object.assign({}, t.style), a = Object.assign({}, n.style);
  return t.style.height = "100%", t.style.overflow = "hidden", n.style.top = "-".concat(r, "px"), n.style.width = "100%", n.style.height = "auto", n.style.position = "fixed", n.style.overflow = (e == null ? void 0 : e.overflowType) || "hidden", function() {
    t.style.height = o.height || "", t.style.overflow = o.overflow || "", ["top", "width", "height", "overflow", "position"].forEach(function(l) {
      n.style[l] = a[l] || "";
    });
    var i = "scrollBehavior" in document.documentElement.style;
    i ? window.scrollTo({
      top: r,
      behavior: "instant"
    }) : window.scrollTo(0, r);
  };
}
var oh = Lb({
  passive: !1
});
function ah(e, t) {
  if (!vi()) {
    rh(e);
    var n = gi(t);
    if (Rs().ios) {
      if (e) {
        var r = Array.isArray(e) ? e : [e];
        r.forEach(function(o) {
          o && n.lockedElements.indexOf(o) === -1 && (o.ontouchstart = function(a) {
            var i = a.targetTouches[0], l = i.clientX, s = i.clientY;
            n.initialClientPos = {
              clientX: l,
              clientY: s
            };
          }, o.ontouchmove = function(a) {
            a.targetTouches.length === 1 && Rb(a, o, n.initialClientPos);
          }, n.lockedElements.push(o));
        });
      }
      n.documentListenerAdded || (document.addEventListener("touchmove", wl(), oh), n.documentListenerAdded = !0);
    } else
      n.lockedNum <= 0 && (n.unLockCallback = Rs().android ? xb(t) : Mb());
    n.lockedNum += 1;
  }
}
function ih(e, t) {
  if (!vi()) {
    rh(e);
    var n = gi(t);
    if (n.lockedNum -= 1, !(n.lockedNum > 0)) {
      if (!Rs().ios && typeof n.unLockCallback == "function") {
        n.unLockCallback();
        return;
      }
      if (e) {
        var r = Array.isArray(e) ? e : [e];
        r.forEach(function(o) {
          var a = n.lockedElements.indexOf(o);
          a !== -1 && (o.ontouchmove = null, o.ontouchstart = null, n.lockedElements.splice(a, 1));
        });
      }
      n.documentListenerAdded && (document.removeEventListener("touchmove", wl(), oh), n.documentListenerAdded = !1);
    }
  }
}
const Bb = /* @__PURE__ */ pe({
  __name: "DialogComponent",
  props: {
    isOpen: { type: Boolean, default: !1 },
    toggle: {},
    center: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = Q(null), n = e, r = ({ key: o }) => {
      o === "Escape" && n.isOpen && n.toggle();
    };
    return Ke(() => {
      ah(t.value, { useGlobalLockState: !0, overflowType: "clip" }), window.addEventListener("keydown", r);
    }), Zr(() => {
      ih(t.value, { useGlobalLockState: !0, overflowType: "clip" }), window.removeEventListener("keydown", r);
    }), (o, a) => (U(), X("div", {
      ref_key: "dialog",
      ref: t,
      class: "th-dialog"
    }, [
      q("div", {
        class: "th-dialog__overlay th-down-lg:hidden",
        onClick: a[0] || (a[0] = //@ts-ignore
        (...i) => o.toggle && o.toggle(...i))
      }),
      q("div", {
        class: be([{ "th-dialog__content_center": n.center }, "th-dialog__content"])
      }, [
        z(nh, {
          class: be([{ "th-dialog__close-btn_center": n.center }, "th-dialog__close-btn"]),
          type: "button",
          onClick: o.toggle
        }, null, 8, ["class", "onClick"]),
        Yn(o.$slots, "default", {}, void 0, !0)
      ], 2)
    ], 512));
  }
}), Cl = /* @__PURE__ */ ge(Bb, [["__scopeId", "data-v-2181161d"]]);
/*!
  * vue-router v4.3.2
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */
const on = typeof document < "u";
function Vb(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const Ie = Object.assign;
function zi(e, t) {
  const n = {};
  for (const r in t) {
    const o = t[r];
    n[r] = Tt(o) ? o.map(e) : e(o);
  }
  return n;
}
const yo = () => {
}, Tt = Array.isArray;
function _e(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const sh = /#/g, Ub = /&/g, Fb = /\//g, Hb = /=/g, Yb = /\?/g, lh = /\+/g, jb = /%5B/g, Wb = /%5D/g, ch = /%5E/g, qb = /%60/g, uh = /%7B/g, zb = /%7C/g, dh = /%7D/g, Gb = /%20/g;
function Tl(e) {
  return encodeURI("" + e).replace(zb, "|").replace(jb, "[").replace(Wb, "]");
}
function Xb(e) {
  return Tl(e).replace(uh, "{").replace(dh, "}").replace(ch, "^");
}
function Ms(e) {
  return Tl(e).replace(lh, "%2B").replace(Gb, "+").replace(sh, "%23").replace(Ub, "%26").replace(qb, "`").replace(uh, "{").replace(dh, "}").replace(ch, "^");
}
function Kb(e) {
  return Ms(e).replace(Hb, "%3D");
}
function Jb(e) {
  return Tl(e).replace(sh, "%23").replace(Yb, "%3F");
}
function Zb(e) {
  return e == null ? "" : Jb(e).replace(Fb, "%2F");
}
function Wr(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && _e(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const Qb = /\/$/, e1 = (e) => e.replace(Qb, "");
function Gi(e, t, n = "/") {
  let r, o = {}, a = "", i = "";
  const l = t.indexOf("#");
  let s = t.indexOf("?");
  return l < s && l >= 0 && (s = -1), s > -1 && (r = t.slice(0, s), a = t.slice(s + 1, l > -1 ? l : t.length), o = e(a)), l > -1 && (r = r || t.slice(0, l), i = t.slice(l, t.length)), r = r1(r ?? t, n), {
    fullPath: r + (a && "?") + a + i,
    path: r,
    query: o,
    hash: Wr(i)
  };
}
function t1(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function lu(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function cu(e, t, n) {
  const r = t.matched.length - 1, o = n.matched.length - 1;
  return r > -1 && r === o && Mn(t.matched[r], n.matched[o]) && fh(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function Mn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function fh(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!n1(e[n], t[n]))
      return !1;
  return !0;
}
function n1(e, t) {
  return Tt(e) ? uu(e, t) : Tt(t) ? uu(t, e) : e === t;
}
function uu(e, t) {
  return Tt(t) ? e.length === t.length && e.every((n, r) => n === t[r]) : e.length === 1 && e[0] === t;
}
function r1(e, t) {
  if (e.startsWith("/"))
    return e;
  if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
    return _e(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e)
    return t;
  const n = t.split("/"), r = e.split("/"), o = r[r.length - 1];
  (o === ".." || o === ".") && r.push("");
  let a = n.length - 1, i, l;
  for (i = 0; i < r.length; i++)
    if (l = r[i], l !== ".")
      if (l === "..")
        a > 1 && a--;
      else
        break;
  return n.slice(0, a).join("/") + "/" + r.slice(i).join("/");
}
var No;
(function(e) {
  e.pop = "pop", e.push = "push";
})(No || (No = {}));
var _o;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(_o || (_o = {}));
function o1(e) {
  if (!e)
    if (on) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), e1(e);
}
const a1 = /^[^#]+#/;
function i1(e, t) {
  return e.replace(a1, "#") + t;
}
function s1(e, t) {
  const n = document.documentElement.getBoundingClientRect(), r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0)
  };
}
const yi = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function l1(e) {
  let t;
  if ("el" in e) {
    const n = e.el, r = typeof n == "string" && n.startsWith("#");
    if (process.env.NODE_ENV !== "production" && typeof e.el == "string" && (!r || !document.getElementById(e.el.slice(1))))
      try {
        const a = document.querySelector(e.el);
        if (r && a) {
          _e(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`);
          return;
        }
      } catch {
        _e(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
        return;
      }
    const o = typeof n == "string" ? r ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!o) {
      process.env.NODE_ENV !== "production" && _e(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);
      return;
    }
    t = s1(o, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function du(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const xs = /* @__PURE__ */ new Map();
function c1(e, t) {
  xs.set(e, t);
}
function u1(e) {
  const t = xs.get(e);
  return xs.delete(e), t;
}
let d1 = () => location.protocol + "//" + location.host;
function ph(e, t) {
  const { pathname: n, search: r, hash: o } = t, a = e.indexOf("#");
  if (a > -1) {
    let l = o.includes(e.slice(a)) ? e.slice(a).length : 1, s = o.slice(l);
    return s[0] !== "/" && (s = "/" + s), lu(s, "");
  }
  return lu(n, e) + r + o;
}
function f1(e, t, n, r) {
  let o = [], a = [], i = null;
  const l = ({ state: d }) => {
    const v = ph(e, location), p = n.value, g = t.value;
    let m = 0;
    if (d) {
      if (n.value = v, t.value = d, i && i === p) {
        i = null;
        return;
      }
      m = g ? d.position - g.position : 0;
    } else
      r(v);
    o.forEach((h) => {
      h(n.value, p, {
        delta: m,
        type: No.pop,
        direction: m ? m > 0 ? _o.forward : _o.back : _o.unknown
      });
    });
  };
  function s() {
    i = n.value;
  }
  function c(d) {
    o.push(d);
    const v = () => {
      const p = o.indexOf(d);
      p > -1 && o.splice(p, 1);
    };
    return a.push(v), v;
  }
  function u() {
    const { history: d } = window;
    d.state && d.replaceState(Ie({}, d.state, { scroll: yi() }), "");
  }
  function f() {
    for (const d of a)
      d();
    a = [], window.removeEventListener("popstate", l), window.removeEventListener("beforeunload", u);
  }
  return window.addEventListener("popstate", l), window.addEventListener("beforeunload", u, {
    passive: !0
  }), {
    pauseListeners: s,
    listen: c,
    destroy: f
  };
}
function fu(e, t, n, r = !1, o = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: o ? yi() : null
  };
}
function p1(e) {
  const { history: t, location: n } = window, r = {
    value: ph(e, n)
  }, o = { value: t.state };
  o.value || a(r.value, {
    back: null,
    current: r.value,
    forward: null,
    // the length is off by one, we need to decrease it
    position: t.length - 1,
    replaced: !0,
    // don't add a scroll as the user may have an anchor, and we want
    // scrollBehavior to be triggered without a saved position
    scroll: null
  }, !0);
  function a(s, c, u) {
    const f = e.indexOf("#"), d = f > -1 ? (n.host && document.querySelector("base") ? e : e.slice(f)) + s : d1() + e + s;
    try {
      t[u ? "replaceState" : "pushState"](c, "", d), o.value = c;
    } catch (v) {
      process.env.NODE_ENV !== "production" ? _e("Error with push/replace State", v) : console.error(v), n[u ? "replace" : "assign"](d);
    }
  }
  function i(s, c) {
    const u = Ie({}, t.state, fu(
      o.value.back,
      // keep back and forward entries but override current position
      s,
      o.value.forward,
      !0
    ), c, { position: o.value.position });
    a(s, u, !0), r.value = s;
  }
  function l(s, c) {
    const u = Ie(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      o.value,
      t.state,
      {
        forward: s,
        scroll: yi()
      }
    );
    process.env.NODE_ENV !== "production" && !t.state && _e(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), a(u.current, u, !0);
    const f = Ie({}, fu(r.value, s, null), { position: u.position + 1 }, c);
    a(s, f, !1), r.value = s;
  }
  return {
    location: r,
    state: o,
    push: l,
    replace: i
  };
}
function h1(e) {
  e = o1(e);
  const t = p1(e), n = f1(e, t.state, t.location, t.replace);
  function r(a, i = !0) {
    i || n.pauseListeners(), history.go(a);
  }
  const o = Ie({
    // it's overridden right after
    location: "",
    base: e,
    go: r,
    createHref: i1.bind(null, e)
  }, t, n);
  return Object.defineProperty(o, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(o, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), o;
}
function Ga(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function hh(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const wn = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
}, Bs = Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var pu;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(pu || (pu = {}));
const m1 = {
  1({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  2({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${g1(t)}" via a navigation guard.`;
  },
  4({ from: e, to: t }) {
    return `Navigation aborted from "${e.fullPath}" to "${t.fullPath}" via a navigation guard.`;
  },
  8({ from: e, to: t }) {
    return `Navigation cancelled from "${e.fullPath}" to "${t.fullPath}" with a new navigation.`;
  },
  16({ from: e, to: t }) {
    return `Avoided redundant navigation to current location: "${e.fullPath}".`;
  }
};
function qr(e, t) {
  return process.env.NODE_ENV !== "production" ? Ie(new Error(m1[e](t)), {
    type: e,
    [Bs]: !0
  }, t) : Ie(new Error(), {
    type: e,
    [Bs]: !0
  }, t);
}
function rn(e, t) {
  return e instanceof Error && Bs in e && (t == null || !!(e.type & t));
}
const v1 = ["params", "query", "hash"];
function g1(e) {
  if (typeof e == "string")
    return e;
  if (e.path != null)
    return e.path;
  const t = {};
  for (const n of v1)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const hu = "[^/]+?", y1 = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, _1 = /[.+*?^${}()[\]/\\]/g;
function b1(e, t) {
  const n = Ie({}, y1, t), r = [];
  let o = n.start ? "^" : "";
  const a = [];
  for (const c of e) {
    const u = c.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !c.length && (o += "/");
    for (let f = 0; f < c.length; f++) {
      const d = c[f];
      let v = 40 + (n.sensitive ? 0.25 : 0);
      if (d.type === 0)
        f || (o += "/"), o += d.value.replace(_1, "\\$&"), v += 40;
      else if (d.type === 1) {
        const { value: p, repeatable: g, optional: m, regexp: h } = d;
        a.push({
          name: p,
          repeatable: g,
          optional: m
        });
        const y = h || hu;
        if (y !== hu) {
          v += 10;
          try {
            new RegExp(`(${y})`);
          } catch (O) {
            throw new Error(`Invalid custom RegExp for param "${p}" (${y}): ` + O.message);
          }
        }
        let w = g ? `((?:${y})(?:/(?:${y}))*)` : `(${y})`;
        f || (w = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        m && c.length < 2 ? `(?:/${w})` : "/" + w), m && (w += "?"), o += w, v += 20, m && (v += -8), g && (v += -20), y === ".*" && (v += -50);
      }
      u.push(v);
    }
    r.push(u);
  }
  if (n.strict && n.end) {
    const c = r.length - 1;
    r[c][r[c].length - 1] += 0.7000000000000001;
  }
  n.strict || (o += "/?"), n.end ? o += "$" : n.strict && (o += "(?:/|$)");
  const i = new RegExp(o, n.sensitive ? "" : "i");
  function l(c) {
    const u = c.match(i), f = {};
    if (!u)
      return null;
    for (let d = 1; d < u.length; d++) {
      const v = u[d] || "", p = a[d - 1];
      f[p.name] = v && p.repeatable ? v.split("/") : v;
    }
    return f;
  }
  function s(c) {
    let u = "", f = !1;
    for (const d of e) {
      (!f || !u.endsWith("/")) && (u += "/"), f = !1;
      for (const v of d)
        if (v.type === 0)
          u += v.value;
        else if (v.type === 1) {
          const { value: p, repeatable: g, optional: m } = v, h = p in c ? c[p] : "";
          if (Tt(h) && !g)
            throw new Error(`Provided param "${p}" is an array but it is not repeatable (* or + modifiers)`);
          const y = Tt(h) ? h.join("/") : h;
          if (!y)
            if (m)
              d.length < 2 && (u.endsWith("/") ? u = u.slice(0, -1) : f = !0);
            else
              throw new Error(`Missing required param "${p}"`);
          u += y;
        }
    }
    return u || "/";
  }
  return {
    re: i,
    score: r,
    keys: a,
    parse: l,
    stringify: s
  };
}
function E1(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r)
      return r;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0;
}
function w1(e, t) {
  let n = 0;
  const r = e.score, o = t.score;
  for (; n < r.length && n < o.length; ) {
    const a = E1(r[n], o[n]);
    if (a)
      return a;
    n++;
  }
  if (Math.abs(o.length - r.length) === 1) {
    if (mu(r))
      return 1;
    if (mu(o))
      return -1;
  }
  return o.length - r.length;
}
function mu(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const C1 = {
  type: 0,
  value: ""
}, T1 = /[a-zA-Z0-9_]/;
function S1(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[C1]];
  if (!e.startsWith("/"))
    throw new Error(process.env.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(v) {
    throw new Error(`ERR (${n})/"${c}": ${v}`);
  }
  let n = 0, r = n;
  const o = [];
  let a;
  function i() {
    a && o.push(a), a = [];
  }
  let l = 0, s, c = "", u = "";
  function f() {
    c && (n === 0 ? a.push({
      type: 0,
      value: c
    }) : n === 1 || n === 2 || n === 3 ? (a.length > 1 && (s === "*" || s === "+") && t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`), a.push({
      type: 1,
      value: c,
      regexp: u,
      repeatable: s === "*" || s === "+",
      optional: s === "*" || s === "?"
    })) : t("Invalid state to consume buffer"), c = "");
  }
  function d() {
    c += s;
  }
  for (; l < e.length; ) {
    if (s = e[l++], s === "\\" && n !== 2) {
      r = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        s === "/" ? (c && f(), i()) : s === ":" ? (f(), n = 1) : d();
        break;
      case 4:
        d(), n = r;
        break;
      case 1:
        s === "(" ? n = 2 : T1.test(s) ? d() : (f(), n = 0, s !== "*" && s !== "?" && s !== "+" && l--);
        break;
      case 2:
        s === ")" ? u[u.length - 1] == "\\" ? u = u.slice(0, -1) + s : n = 3 : u += s;
        break;
      case 3:
        f(), n = 0, s !== "*" && s !== "?" && s !== "+" && l--, u = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${c}"`), f(), i(), o;
}
function k1(e, t, n) {
  const r = b1(S1(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const a = /* @__PURE__ */ new Set();
    for (const i of r.keys)
      a.has(i.name) && _e(`Found duplicated params with name "${i.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), a.add(i.name);
  }
  const o = Ie(r, {
    record: e,
    parent: t,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o;
}
function I1(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  t = yu({ strict: !1, end: !0, sensitive: !1 }, t);
  function o(u) {
    return r.get(u);
  }
  function a(u, f, d) {
    const v = !d, p = O1(u);
    process.env.NODE_ENV !== "production" && $1(p, f), p.aliasOf = d && d.record;
    const g = yu(t, u), m = [
      p
    ];
    if ("alias" in u) {
      const w = typeof u.alias == "string" ? [u.alias] : u.alias;
      for (const O of w)
        m.push(Ie({}, p, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: d ? d.record.components : p.components,
          path: O,
          // we might be the child of an alias
          aliasOf: d ? d.record : p
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let h, y;
    for (const w of m) {
      const { path: O } = w;
      if (f && O[0] !== "/") {
        const $ = f.record.path, C = $[$.length - 1] === "/" ? "" : "/";
        w.path = f.record.path + (O && C + O);
      }
      if (process.env.NODE_ENV !== "production" && w.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (h = k1(w, f, g), process.env.NODE_ENV !== "production" && f && O[0] === "/" && N1(h, f), d ? (d.alias.push(h), process.env.NODE_ENV !== "production" && A1(d, h)) : (y = y || h, y !== h && y.alias.push(h), v && u.name && !gu(h) && i(u.name)), p.children) {
        const $ = p.children;
        for (let C = 0; C < $.length; C++)
          a($[C], h, d && d.children[C]);
      }
      d = d || h, (h.record.components && Object.keys(h.record.components).length || h.record.name || h.record.redirect) && s(h);
    }
    return y ? () => {
      i(y);
    } : yo;
  }
  function i(u) {
    if (hh(u)) {
      const f = r.get(u);
      f && (r.delete(u), n.splice(n.indexOf(f), 1), f.children.forEach(i), f.alias.forEach(i));
    } else {
      const f = n.indexOf(u);
      f > -1 && (n.splice(f, 1), u.record.name && r.delete(u.record.name), u.children.forEach(i), u.alias.forEach(i));
    }
  }
  function l() {
    return n;
  }
  function s(u) {
    let f = 0;
    for (; f < n.length && w1(u, n[f]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (u.record.path !== n[f].record.path || !mh(u, n[f])); )
      f++;
    n.splice(f, 0, u), u.record.name && !gu(u) && r.set(u.record.name, u);
  }
  function c(u, f) {
    let d, v = {}, p, g;
    if ("name" in u && u.name) {
      if (d = r.get(u.name), !d)
        throw qr(1, {
          location: u
        });
      if (process.env.NODE_ENV !== "production") {
        const y = Object.keys(u.params || {}).filter((w) => !d.keys.find((O) => O.name === w));
        y.length && _e(`Discarded invalid param(s) "${y.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      g = d.record.name, v = Ie(
        // paramsFromLocation is a new object
        vu(
          f.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          d.keys.filter((y) => !y.optional).concat(d.parent ? d.parent.keys.filter((y) => y.optional) : []).map((y) => y.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        u.params && vu(u.params, d.keys.map((y) => y.name))
      ), p = d.stringify(v);
    } else if (u.path != null)
      p = u.path, process.env.NODE_ENV !== "production" && !p.startsWith("/") && _e(`The Matcher cannot resolve relative paths but received "${p}". Unless you directly called \`matcher.resolve("${p}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), d = n.find((y) => y.re.test(p)), d && (v = d.parse(p), g = d.record.name);
    else {
      if (d = f.name ? r.get(f.name) : n.find((y) => y.re.test(f.path)), !d)
        throw qr(1, {
          location: u,
          currentLocation: f
        });
      g = d.record.name, v = Ie({}, f.params, u.params), p = d.stringify(v);
    }
    const m = [];
    let h = d;
    for (; h; )
      m.unshift(h.record), h = h.parent;
    return {
      name: g,
      path: p,
      params: v,
      matched: m,
      meta: P1(m)
    };
  }
  return e.forEach((u) => a(u)), { addRoute: a, resolve: c, removeRoute: i, getRoutes: l, getRecordMatcher: o };
}
function vu(e, t) {
  const n = {};
  for (const r of t)
    r in e && (n[r] = e[r]);
  return n;
}
function O1(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: D1(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function D1(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e)
    t.default = n;
  else
    for (const r in e.components)
      t[r] = typeof n == "object" ? n[r] : n;
  return t;
}
function gu(e) {
  for (; e; ) {
    if (e.record.aliasOf)
      return !0;
    e = e.parent;
  }
  return !1;
}
function P1(e) {
  return e.reduce((t, n) => Ie(t, n.meta), {});
}
function yu(e, t) {
  const n = {};
  for (const r in e)
    n[r] = r in t ? t[r] : e[r];
  return n;
}
function Vs(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function A1(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(Vs.bind(null, n)))
      return _e(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(Vs.bind(null, n)))
      return _e(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function $1(e, t) {
  t && t.record.name && !e.name && !e.path && _e(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function N1(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(Vs.bind(null, n)))
      return _e(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function mh(e, t) {
  return t.children.some((n) => n === e || mh(e, n));
}
function L1(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const r = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let o = 0; o < r.length; ++o) {
    const a = r[o].replace(lh, " "), i = a.indexOf("="), l = Wr(i < 0 ? a : a.slice(0, i)), s = i < 0 ? null : Wr(a.slice(i + 1));
    if (l in t) {
      let c = t[l];
      Tt(c) || (c = t[l] = [c]), c.push(s);
    } else
      t[l] = s;
  }
  return t;
}
function _u(e) {
  let t = "";
  for (let n in e) {
    const r = e[n];
    if (n = Kb(n), r == null) {
      r !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (Tt(r) ? r.map((a) => a && Ms(a)) : [r && Ms(r)]).forEach((a) => {
      a !== void 0 && (t += (t.length ? "&" : "") + n, a != null && (t += "=" + a));
    });
  }
  return t;
}
function R1(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 && (t[n] = Tt(r) ? r.map((o) => o == null ? null : "" + o) : r == null ? r : "" + r);
  }
  return t;
}
const M1 = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), bu = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), _i = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), Sl = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), Us = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function co() {
  let e = [];
  function t(r) {
    return e.push(r), () => {
      const o = e.indexOf(r);
      o > -1 && e.splice(o, 1);
    };
  }
  function n() {
    e = [];
  }
  return {
    add: t,
    list: () => e.slice(),
    reset: n
  };
}
function Cn(e, t, n, r, o, a = (i) => i()) {
  const i = r && // name is defined if record is because of the function overload
  (r.enterCallbacks[o] = r.enterCallbacks[o] || []);
  return () => new Promise((l, s) => {
    const c = (d) => {
      d === !1 ? s(qr(4, {
        from: n,
        to: t
      })) : d instanceof Error ? s(d) : Ga(d) ? s(qr(2, {
        from: t,
        to: d
      })) : (i && // since enterCallbackArray is truthy, both record and name also are
      r.enterCallbacks[o] === i && typeof d == "function" && i.push(d), l());
    }, u = a(() => e.call(r && r.instances[o], t, n, process.env.NODE_ENV !== "production" ? x1(c, t, n) : c));
    let f = Promise.resolve(u);
    if (e.length < 3 && (f = f.then(c)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const d = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof u == "object" && "then" in u)
        f = f.then((v) => c._called ? v : (_e(d), Promise.reject(new Error("Invalid navigation guard"))));
      else if (u !== void 0 && !c._called) {
        _e(d), s(new Error("Invalid navigation guard"));
        return;
      }
    }
    f.catch((d) => s(d));
  });
}
function x1(e, t, n) {
  let r = 0;
  return function() {
    r++ === 1 && _e(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, r === 1 && e.apply(null, arguments);
  };
}
function Xi(e, t, n, r, o = (a) => a()) {
  const a = [];
  for (const i of e) {
    process.env.NODE_ENV !== "production" && !i.components && !i.children.length && _e(`Record with path "${i.path}" is either missing a "component(s)" or "children" property.`);
    for (const l in i.components) {
      let s = i.components[l];
      if (process.env.NODE_ENV !== "production") {
        if (!s || typeof s != "object" && typeof s != "function")
          throw _e(`Component "${l}" in record with path "${i.path}" is not a valid component. Received "${String(s)}".`), new Error("Invalid route component");
        if ("then" in s) {
          _e(`Component "${l}" in record with path "${i.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const c = s;
          s = () => c;
        } else
          s.__asyncLoader && // warn only once per component
          !s.__warnedDefineAsync && (s.__warnedDefineAsync = !0, _e(`Component "${l}" in record with path "${i.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !i.instances[l]))
        if (B1(s)) {
          const u = (s.__vccOpts || s)[t];
          u && a.push(Cn(u, n, r, i, l, o));
        } else {
          let c = s();
          process.env.NODE_ENV !== "production" && !("catch" in c) && (_e(`Component "${l}" in record with path "${i.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), c = Promise.resolve(c)), a.push(() => c.then((u) => {
            if (!u)
              return Promise.reject(new Error(`Couldn't resolve component "${l}" at "${i.path}"`));
            const f = Vb(u) ? u.default : u;
            i.components[l] = f;
            const v = (f.__vccOpts || f)[t];
            return v && Cn(v, n, r, i, l, o)();
          }));
        }
    }
  }
  return a;
}
function B1(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function Eu(e) {
  const t = _t(_i), n = _t(Sl);
  let r = !1, o = null;
  const a = te(() => {
    const u = W(e.to);
    return process.env.NODE_ENV !== "production" && (!r || u !== o) && (Ga(u) || (r ? _e(`Invalid value for prop "to" in useLink()
- to:`, u, `
- previous to:`, o, `
- props:`, e) : _e(`Invalid value for prop "to" in useLink()
- to:`, u, `
- props:`, e)), o = u, r = !0), t.resolve(u);
  }), i = te(() => {
    const { matched: u } = a.value, { length: f } = u, d = u[f - 1], v = n.matched;
    if (!d || !v.length)
      return -1;
    const p = v.findIndex(Mn.bind(null, d));
    if (p > -1)
      return p;
    const g = wu(u[f - 2]);
    return (
      // we are dealing with nested routes
      f > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      wu(d) === g && // avoid comparing the child with its parent
      v[v.length - 1].path !== g ? v.findIndex(Mn.bind(null, u[f - 2])) : p
    );
  }), l = te(() => i.value > -1 && H1(n.params, a.value.params)), s = te(() => i.value > -1 && i.value === n.matched.length - 1 && fh(n.params, a.value.params));
  function c(u = {}) {
    return F1(u) ? t[W(e.replace) ? "replace" : "push"](
      W(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(yo) : Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && on) {
    const u = Hn();
    if (u) {
      const f = {
        route: a.value,
        isActive: l.value,
        isExactActive: s.value,
        error: null
      };
      u.__vrl_devtools = u.__vrl_devtools || [], u.__vrl_devtools.push(f), Ct(() => {
        f.route = a.value, f.isActive = l.value, f.isExactActive = s.value, f.error = Ga(W(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: a,
    href: te(() => a.value.href),
    isActive: l,
    isExactActive: s,
    navigate: c
  };
}
const V1 = /* @__PURE__ */ pe({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink: Eu,
  setup(e, { slots: t }) {
    const n = jo(Eu(e)), { options: r } = _t(_i), o = te(() => ({
      [Cu(e.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [Cu(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const a = t.default && t.default(n);
      return e.custom ? a : dr("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: o.value
      }, a);
    };
  }
}), U1 = V1;
function F1(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function H1(e, t) {
  for (const n in t) {
    const r = t[n], o = e[n];
    if (typeof r == "string") {
      if (r !== o)
        return !1;
    } else if (!Tt(o) || o.length !== r.length || r.some((a, i) => a !== o[i]))
      return !1;
  }
  return !0;
}
function wu(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const Cu = (e, t, n) => e ?? t ?? n, Y1 = /* @__PURE__ */ pe({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t, slots: n }) {
    process.env.NODE_ENV !== "production" && W1();
    const r = _t(Us), o = te(() => e.route || r.value), a = _t(bu, 0), i = te(() => {
      let c = W(a);
      const { matched: u } = o.value;
      let f;
      for (; (f = u[c]) && !f.components; )
        c++;
      return c;
    }), l = te(() => o.value.matched[i.value]);
    An(bu, te(() => i.value + 1)), An(M1, l), An(Us, o);
    const s = Q();
    return Le(() => [s.value, l.value, e.name], ([c, u, f], [d, v, p]) => {
      u && (u.instances[f] = c, v && v !== u && c && c === d && (u.leaveGuards.size || (u.leaveGuards = v.leaveGuards), u.updateGuards.size || (u.updateGuards = v.updateGuards))), c && u && // if there is no instance but to and from are the same this might be
      // the first visit
      (!v || !Mn(u, v) || !d) && (u.enterCallbacks[f] || []).forEach((g) => g(c));
    }, { flush: "post" }), () => {
      const c = o.value, u = e.name, f = l.value, d = f && f.components[u];
      if (!d)
        return Tu(n.default, { Component: d, route: c });
      const v = f.props[u], p = v ? v === !0 ? c.params : typeof v == "function" ? v(c) : v : null, m = dr(d, Ie({}, p, t, {
        onVnodeUnmounted: (h) => {
          h.component.isUnmounted && (f.instances[u] = null);
        },
        ref: s
      }));
      if (process.env.NODE_ENV !== "production" && on && m.ref) {
        const h = {
          depth: i.value,
          name: f.name,
          path: f.path,
          meta: f.meta
        };
        (Tt(m.ref) ? m.ref.map((w) => w.i) : [m.ref.i]).forEach((w) => {
          w.__vrv_devtools = h;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        Tu(n.default, { Component: m, route: c }) || m
      );
    };
  }
});
function Tu(e, t) {
  if (!e)
    return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const j1 = Y1;
function W1() {
  const e = Hn(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
  if (t && (t === "KeepAlive" || t.includes("Transition")) && typeof n == "object" && n.name === "RouterView") {
    const r = t === "KeepAlive" ? "keep-alive" : "transition";
    _e(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${r}>
    <component :is="Component" />
  </${r}>
</router-view>`);
  }
}
function uo(e, t) {
  const n = Ie({}, e, {
    // remove variables that can contain vue instances
    matched: e.matched.map((r) => n0(r, ["instances", "children", "aliasOf"]))
  });
  return {
    _custom: {
      type: null,
      readOnly: !0,
      display: e.fullPath,
      tooltip: t,
      value: n
    }
  };
}
function ya(e) {
  return {
    _custom: {
      display: e
    }
  };
}
let q1 = 0;
function z1(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const r = q1++;
  ci({
    id: "org.vuejs.router" + (r ? "." + r : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app: e
  }, (o) => {
    typeof o.now != "function" && console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), o.on.inspectComponent((u, f) => {
      u.instanceData && u.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: !1,
        value: uo(t.currentRoute.value, "Current Route")
      });
    }), o.on.visitComponentTree(({ treeNode: u, componentInstance: f }) => {
      if (f.__vrv_devtools) {
        const d = f.__vrv_devtools;
        u.tags.push({
          label: (d.name ? `${d.name.toString()}: ` : "") + d.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: vh
        });
      }
      Tt(f.__vrl_devtools) && (f.__devtoolsApi = o, f.__vrl_devtools.forEach((d) => {
        let v = d.route.path, p = _h, g = "", m = 0;
        d.error ? (v = d.error, p = Z1, m = Q1) : d.isExactActive ? (p = yh, g = "This is exactly active") : d.isActive && (p = gh, g = "This link is active"), u.tags.push({
          label: v,
          textColor: m,
          tooltip: g,
          backgroundColor: p
        });
      }));
    }), Le(t.currentRoute, () => {
      s(), o.notifyComponentUpdate(), o.sendInspectorTree(l), o.sendInspectorState(l);
    });
    const a = "router:navigations:" + r;
    o.addTimelineLayer({
      id: a,
      label: `Router${r ? " " + r : ""} Navigations`,
      color: 4237508
    }), t.onError((u, f) => {
      o.addTimelineEvent({
        layerId: a,
        event: {
          title: "Error during Navigation",
          subtitle: f.fullPath,
          logType: "error",
          time: o.now(),
          data: { error: u },
          groupId: f.meta.__navigationId
        }
      });
    });
    let i = 0;
    t.beforeEach((u, f) => {
      const d = {
        guard: ya("beforeEach"),
        from: uo(f, "Current Location during this navigation"),
        to: uo(u, "Target location")
      };
      Object.defineProperty(u.meta, "__navigationId", {
        value: i++
      }), o.addTimelineEvent({
        layerId: a,
        event: {
          time: o.now(),
          title: "Start of navigation",
          subtitle: u.fullPath,
          data: d,
          groupId: u.meta.__navigationId
        }
      });
    }), t.afterEach((u, f, d) => {
      const v = {
        guard: ya("afterEach")
      };
      d ? (v.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: d ? d.message : "",
          tooltip: "Navigation Failure",
          value: d
        }
      }, v.status = ya("❌")) : v.status = ya("✅"), v.from = uo(f, "Current Location during this navigation"), v.to = uo(u, "Target location"), o.addTimelineEvent({
        layerId: a,
        event: {
          title: "End of navigation",
          subtitle: u.fullPath,
          time: o.now(),
          data: v,
          logType: d ? "warning" : "default",
          groupId: u.meta.__navigationId
        }
      });
    });
    const l = "router-inspector:" + r;
    o.addInspector({
      id: l,
      label: "Routes" + (r ? " " + r : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function s() {
      if (!c)
        return;
      const u = c;
      let f = n.getRoutes().filter((d) => !d.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !d.parent.record.components);
      f.forEach(wh), u.filter && (f = f.filter((d) => (
        // save matches state based on the payload
        Fs(d, u.filter.toLowerCase())
      ))), f.forEach((d) => Eh(d, t.currentRoute.value)), u.rootNodes = f.map(bh);
    }
    let c;
    o.on.getInspectorTree((u) => {
      c = u, u.app === e && u.inspectorId === l && s();
    }), o.on.getInspectorState((u) => {
      if (u.app === e && u.inspectorId === l) {
        const d = n.getRoutes().find((v) => v.record.__vd_id === u.nodeId);
        d && (u.state = {
          options: X1(d)
        });
      }
    }), o.sendInspectorTree(l), o.sendInspectorState(l);
  });
}
function G1(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function X1(e) {
  const { record: t } = e, n = [
    { editable: !1, key: "path", value: t.path }
  ];
  return t.name != null && n.push({
    editable: !1,
    key: "name",
    value: t.name
  }), n.push({ editable: !1, key: "regexp", value: e.re }), e.keys.length && n.push({
    editable: !1,
    key: "keys",
    value: {
      _custom: {
        type: null,
        readOnly: !0,
        display: e.keys.map((r) => `${r.name}${G1(r)}`).join(" "),
        tooltip: "Param keys",
        value: e.keys
      }
    }
  }), t.redirect != null && n.push({
    editable: !1,
    key: "redirect",
    value: t.redirect
  }), e.alias.length && n.push({
    editable: !1,
    key: "aliases",
    value: e.alias.map((r) => r.record.path)
  }), Object.keys(e.record.meta).length && n.push({
    editable: !1,
    key: "meta",
    value: e.record.meta
  }), n.push({
    key: "score",
    editable: !1,
    value: {
      _custom: {
        type: null,
        readOnly: !0,
        display: e.score.map((r) => r.join(", ")).join(" | "),
        tooltip: "Score used to sort routes",
        value: e.score
      }
    }
  }), n;
}
const vh = 15485081, gh = 2450411, yh = 8702998, K1 = 2282478, _h = 16486972, J1 = 6710886, Z1 = 16704226, Q1 = 12131356;
function bh(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: K1
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: _h
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: vh
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: yh
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: gh
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: J1
  });
  let r = n.__vd_id;
  return r == null && (r = String(e0++), n.__vd_id = r), {
    id: r,
    label: n.path,
    tags: t,
    children: e.children.map(bh)
  };
}
let e0 = 0;
const t0 = /^\/(.*)\/([a-z]*)$/;
function Eh(e, t) {
  const n = t.matched.length && Mn(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((r) => Mn(r, e.record))), e.children.forEach((r) => Eh(r, t));
}
function wh(e) {
  e.__vd_match = !1, e.children.forEach(wh);
}
function Fs(e, t) {
  const n = String(e.re).match(t0);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((i) => Fs(i, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const o = e.record.path.toLowerCase(), a = Wr(o);
  return !t.startsWith("/") && (a.includes(t) || o.includes(t)) || a.startsWith(t) || o.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((i) => Fs(i, t));
}
function n0(e, t) {
  const n = {};
  for (const r in e)
    t.includes(r) || (n[r] = e[r]);
  return n;
}
function r0(e) {
  const t = I1(e.routes, e), n = e.parseQuery || L1, r = e.stringifyQuery || _u, o = e.history;
  if (process.env.NODE_ENV !== "production" && !o)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const a = co(), i = co(), l = co(), s = cl(wn);
  let c = wn;
  on && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const u = zi.bind(null, (j) => "" + j), f = zi.bind(null, Zb), d = (
    // @ts-expect-error: intentionally avoid the type check
    zi.bind(null, Wr)
  );
  function v(j, Y) {
    let T, D;
    return hh(j) ? (T = t.getRecordMatcher(j), process.env.NODE_ENV !== "production" && !T && _e(`Parent route "${String(j)}" not found when adding child route`, Y), D = Y) : D = j, t.addRoute(D, T);
  }
  function p(j) {
    const Y = t.getRecordMatcher(j);
    Y ? t.removeRoute(Y) : process.env.NODE_ENV !== "production" && _e(`Cannot remove non-existent route "${String(j)}"`);
  }
  function g() {
    return t.getRoutes().map((j) => j.record);
  }
  function m(j) {
    return !!t.getRecordMatcher(j);
  }
  function h(j, Y) {
    if (Y = Ie({}, Y || s.value), typeof j == "string") {
      const P = Gi(n, j, Y.path), H = t.resolve({ path: P.path }, Y), ee = o.createHref(P.fullPath);
      return process.env.NODE_ENV !== "production" && (ee.startsWith("//") ? _e(`Location "${j}" resolved to "${ee}". A resolved location cannot start with multiple slashes.`) : H.matched.length || _e(`No match found for location with path "${j}"`)), Ie(P, H, {
        params: d(H.params),
        hash: Wr(P.hash),
        redirectedFrom: void 0,
        href: ee
      });
    }
    process.env.NODE_ENV !== "production" && !Ga(j) && (_e(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, j), j = {});
    let T;
    if (j.path != null)
      process.env.NODE_ENV !== "production" && "params" in j && !("name" in j) && // @ts-expect-error: the type is never
      Object.keys(j.params).length && _e(`Path "${j.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), T = Ie({}, j, {
        path: Gi(n, j.path, Y.path).path
      });
    else {
      const P = Ie({}, j.params);
      for (const H in P)
        P[H] == null && delete P[H];
      T = Ie({}, j, {
        params: f(P)
      }), Y.params = f(Y.params);
    }
    const D = t.resolve(T, Y), R = j.hash || "";
    process.env.NODE_ENV !== "production" && R && !R.startsWith("#") && _e(`A \`hash\` should always start with the character "#". Replace "${R}" with "#${R}".`), D.params = u(d(D.params));
    const J = t1(r, Ie({}, j, {
      hash: Xb(R),
      path: D.path
    })), I = o.createHref(J);
    return process.env.NODE_ENV !== "production" && (I.startsWith("//") ? _e(`Location "${j}" resolved to "${I}". A resolved location cannot start with multiple slashes.`) : D.matched.length || _e(`No match found for location with path "${j.path != null ? j.path : j}"`)), Ie({
      fullPath: J,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: R,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        r === _u ? R1(j.query) : j.query || {}
      )
    }, D, {
      redirectedFrom: void 0,
      href: I
    });
  }
  function y(j) {
    return typeof j == "string" ? Gi(n, j, s.value.path) : Ie({}, j);
  }
  function w(j, Y) {
    if (c !== j)
      return qr(8, {
        from: Y,
        to: j
      });
  }
  function O(j) {
    return b(j);
  }
  function $(j) {
    return O(Ie(y(j), { replace: !0 }));
  }
  function C(j) {
    const Y = j.matched[j.matched.length - 1];
    if (Y && Y.redirect) {
      const { redirect: T } = Y;
      let D = typeof T == "function" ? T(j) : T;
      if (typeof D == "string" && (D = D.includes("?") || D.includes("#") ? D = y(D) : (
        // force empty params
        { path: D }
      ), D.params = {}), process.env.NODE_ENV !== "production" && D.path == null && !("name" in D))
        throw _e(`Invalid redirect found:
${JSON.stringify(D, null, 2)}
 when navigating to "${j.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return Ie({
        query: j.query,
        hash: j.hash,
        // avoid transferring params if the redirect has a path
        params: D.path != null ? {} : j.params
      }, D);
    }
  }
  function b(j, Y) {
    const T = c = h(j), D = s.value, R = j.state, J = j.force, I = j.replace === !0, P = C(T);
    if (P)
      return b(
        Ie(y(P), {
          state: typeof P == "object" ? Ie({}, R, P.state) : R,
          force: J,
          replace: I
        }),
        // keep original redirectedFrom if it exists
        Y || T
      );
    const H = T;
    H.redirectedFrom = Y;
    let ee;
    return !J && cu(r, D, T) && (ee = qr(16, { to: H, from: D }), K(
      D,
      D,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (ee ? Promise.resolve(ee) : _(H, D)).catch((ie) => rn(ie) ? (
      // navigation redirects still mark the router as ready
      rn(
        ie,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? ie : M(ie)
    ) : (
      // reject any unknown error
      L(ie, H, D)
    )).then((ie) => {
      if (ie) {
        if (rn(
          ie,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return process.env.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          cu(r, h(ie.to), H) && // and we have done it a couple of times
          Y && // @ts-expect-error: added only in dev
          (Y._count = Y._count ? (
            // @ts-expect-error
            Y._count + 1
          ) : 1) > 30 ? (_e(`Detected a possibly infinite redirection in a navigation guard when going from "${D.fullPath}" to "${H.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : b(
            // keep options
            Ie({
              // preserve an existing replacement but allow the redirect to override it
              replace: I
            }, y(ie.to), {
              state: typeof ie.to == "object" ? Ie({}, R, ie.to.state) : R,
              force: J
            }),
            // preserve the original redirectedFrom if any
            Y || H
          );
      } else
        ie = A(H, D, !0, I, R);
      return S(H, D, ie), ie;
    });
  }
  function E(j, Y) {
    const T = w(j, Y);
    return T ? Promise.reject(T) : Promise.resolve();
  }
  function k(j) {
    const Y = me.values().next().value;
    return Y && typeof Y.runWithContext == "function" ? Y.runWithContext(j) : j();
  }
  function _(j, Y) {
    let T;
    const [D, R, J] = o0(j, Y);
    T = Xi(D.reverse(), "beforeRouteLeave", j, Y);
    for (const P of D)
      P.leaveGuards.forEach((H) => {
        T.push(Cn(H, j, Y));
      });
    const I = E.bind(null, j, Y);
    return T.push(I), ne(T).then(() => {
      T = [];
      for (const P of a.list())
        T.push(Cn(P, j, Y));
      return T.push(I), ne(T);
    }).then(() => {
      T = Xi(R, "beforeRouteUpdate", j, Y);
      for (const P of R)
        P.updateGuards.forEach((H) => {
          T.push(Cn(H, j, Y));
        });
      return T.push(I), ne(T);
    }).then(() => {
      T = [];
      for (const P of J)
        if (P.beforeEnter)
          if (Tt(P.beforeEnter))
            for (const H of P.beforeEnter)
              T.push(Cn(H, j, Y));
          else
            T.push(Cn(P.beforeEnter, j, Y));
      return T.push(I), ne(T);
    }).then(() => (j.matched.forEach((P) => P.enterCallbacks = {}), T = Xi(J, "beforeRouteEnter", j, Y, k), T.push(I), ne(T))).then(() => {
      T = [];
      for (const P of i.list())
        T.push(Cn(P, j, Y));
      return T.push(I), ne(T);
    }).catch((P) => rn(
      P,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? P : Promise.reject(P));
  }
  function S(j, Y, T) {
    l.list().forEach((D) => k(() => D(j, Y, T)));
  }
  function A(j, Y, T, D, R) {
    const J = w(j, Y);
    if (J)
      return J;
    const I = Y === wn, P = on ? history.state : {};
    T && (D || I ? o.replace(j.fullPath, Ie({
      scroll: I && P && P.scroll
    }, R)) : o.push(j.fullPath, R)), s.value = j, K(j, Y, T, I), M();
  }
  let x;
  function B() {
    x || (x = o.listen((j, Y, T) => {
      if (!Se.listening)
        return;
      const D = h(j), R = C(D);
      if (R) {
        b(Ie(R, { replace: !0 }), D).catch(yo);
        return;
      }
      c = D;
      const J = s.value;
      on && c1(du(J.fullPath, T.delta), yi()), _(D, J).catch((I) => rn(
        I,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? I : rn(
        I,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (b(
        I.to,
        D
        // avoid an uncaught rejection, let push call triggerError
      ).then((P) => {
        rn(
          P,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !T.delta && T.type === No.pop && o.go(-1, !1);
      }).catch(yo), Promise.reject()) : (T.delta && o.go(-T.delta, !1), L(I, D, J))).then((I) => {
        I = I || A(
          // after navigation, all matched components are resolved
          D,
          J,
          !1
        ), I && (T.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !rn(
          I,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? o.go(-T.delta, !1) : T.type === No.pop && rn(
          I,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && o.go(-1, !1)), S(D, J, I);
      }).catch(yo);
    }));
  }
  let N = co(), V = co(), G;
  function L(j, Y, T) {
    M(j);
    const D = V.list();
    return D.length ? D.forEach((R) => R(j, Y, T)) : (process.env.NODE_ENV !== "production" && _e("uncaught error during route navigation:"), console.error(j)), Promise.reject(j);
  }
  function F() {
    return G && s.value !== wn ? Promise.resolve() : new Promise((j, Y) => {
      N.add([j, Y]);
    });
  }
  function M(j) {
    return G || (G = !j, B(), N.list().forEach(([Y, T]) => j ? T(j) : Y()), N.reset()), j;
  }
  function K(j, Y, T, D) {
    const { scrollBehavior: R } = e;
    if (!on || !R)
      return Promise.resolve();
    const J = !T && u1(du(j.fullPath, 0)) || (D || !T) && history.state && history.state.scroll || null;
    return $n().then(() => R(j, Y, J)).then((I) => I && l1(I)).catch((I) => L(I, j, Y));
  }
  const re = (j) => o.go(j);
  let fe;
  const me = /* @__PURE__ */ new Set(), Se = {
    currentRoute: s,
    listening: !0,
    addRoute: v,
    removeRoute: p,
    hasRoute: m,
    getRoutes: g,
    resolve: h,
    options: e,
    push: O,
    replace: $,
    go: re,
    back: () => re(-1),
    forward: () => re(1),
    beforeEach: a.add,
    beforeResolve: i.add,
    afterEach: l.add,
    onError: V.add,
    isReady: F,
    install(j) {
      const Y = this;
      j.component("RouterLink", U1), j.component("RouterView", j1), j.config.globalProperties.$router = Y, Object.defineProperty(j.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => W(s)
      }), on && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !fe && s.value === wn && (fe = !0, O(o.location).catch((R) => {
        process.env.NODE_ENV !== "production" && _e("Unexpected error when starting the router:", R);
      }));
      const T = {};
      for (const R in wn)
        Object.defineProperty(T, R, {
          get: () => s.value[R],
          enumerable: !0
        });
      j.provide(_i, Y), j.provide(Sl, Nv(T)), j.provide(Us, s);
      const D = j.unmount;
      me.add(j), j.unmount = function() {
        me.delete(j), me.size < 1 && (c = wn, x && x(), x = null, s.value = wn, fe = !1, G = !1), D();
      }, process.env.NODE_ENV !== "production" && on && z1(j, Y, t);
    }
  };
  function ne(j) {
    return j.reduce((Y, T) => Y.then(() => k(T)), Promise.resolve());
  }
  return Se;
}
function o0(e, t) {
  const n = [], r = [], o = [], a = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < a; i++) {
    const l = t.matched[i];
    l && (e.matched.find((c) => Mn(c, l)) ? r.push(l) : n.push(l));
    const s = e.matched[i];
    s && (t.matched.find((c) => Mn(c, s)) || o.push(s));
  }
  return [n, r, o];
}
function bi() {
  return _t(_i);
}
function Ch() {
  return _t(Sl);
}
const a0 = (e) => (zo("data-v-610aa2b4"), e = e(), Go(), e), i0 = /* @__PURE__ */ a0(() => /* @__PURE__ */ q("svg", {
  viewBox: "21.904761904761905 21.904761904761905 43.80952380952381 43.80952380952381",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ q("circle", {
    cx: "43.80952380952381",
    cy: "43.80952380952381",
    fill: "transparent",
    r: "20",
    "stroke-dasharray": "125.664",
    "stroke-dashoffset": "125.66370614359172px",
    "stroke-width": "3.8095238095238093"
  })
], -1)), s0 = [
  i0
], l0 = /* @__PURE__ */ pe({
  __name: "ButtonComponent",
  props: {
    tag: { default: "button" },
    to: {},
    bg: {},
    bgHover: {},
    color: {},
    colorHover: {},
    loading: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    plain: { type: Boolean, default: !1 },
    wide: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = bi(), n = e, r = te(() => typeof n.to < "u" && typeof n.to != "string" ? t.resolve(n.to).href : n.to), o = te(() => n.bg ? `th-btn_bg-${n.bg}` : n.plain ? "" : "th-btn_bg-primary"), a = te(() => n.bgHover ? `th-btn_bg-hover-${n.bgHover}` : n.plain ? "" : "th-btn_bg-hover-accent2"), i = te(() => n.color ? `th-btn_color-${n.color}` : n.plain ? "th-btn_color-primary" : "th-btn_color-bg"), l = te(() => n.colorHover ? `th-btn_color-hover-${n.colorHover}` : n.plain ? "th-btn_color-hover-accent2" : "th-btn_color-hover-bg");
    return (s, c) => (U(), de(qo(s.tag), {
      class: be([
        "th-btn",
        o.value,
        a.value,
        i.value,
        l.value,
        {
          "th-btn_loading": s.loading,
          "th-btn_disabled": s.disabled,
          "th-btn_plain": s.plain,
          "th-btn_wide": s.wide
        }
      ]),
      disabled: s.disabled,
      href: r.value,
      to: s.to
    }, {
      default: we(() => [
        q("span", {
          class: be(["th-btn__slot", { "th-btn__slot_active": !s.loading }])
        }, [
          Yn(s.$slots, "default", {}, void 0, !0)
        ], 2),
        q("span", {
          class: be(["th-btn__loader", { "th-btn__loader_active": s.loading }])
        }, s0, 2)
      ]),
      _: 3
    }, 8, ["class", "disabled", "href", "to"]));
  }
}), ot = /* @__PURE__ */ ge(l0, [["__scopeId", "data-v-610aa2b4"]]), c0 = {}, u0 = { class: "th-divider" };
function d0(e, t) {
  return U(), X("hr", u0);
}
const Su = /* @__PURE__ */ ge(c0, [["render", d0], ["__scopeId", "data-v-31ecedc2"]]), kl = () => {
  const e = Ln();
  return (t) => {
    var a, i;
    const n = ((a = e.current) == null ? void 0 : a.rate) ?? 1;
    let r = Number.parseFloat((t * +n).toFixed(2));
    const o = ((i = e.current) == null ? void 0 : i.symbol) ?? "€";
    return Number.isInteger(r) || (r = r.toFixed(2)), `${o}${r}`;
  };
}, ct = /* @__PURE__ */ pe({
  __name: "PriceComponent",
  props: {
    amount: {}
  },
  setup(e) {
    const t = kl(), n = e;
    return (r, o) => ae(W(t)(+n.amount));
  }
}), br = jn("toasts", {
  state: () => ({
    toasts: []
  }),
  getters: {
    getToasts: (e) => e.toasts.toReversed()
  },
  actions: {
    showErrorToast(e = "", t = 5e3) {
      this.showToast(e, "error", t);
    },
    showToast(e, t = "success", n = 5e3) {
      const r = Date.now();
      this.toasts.push({
        text: e,
        type: t,
        timestamp: r
      }), setTimeout(() => {
        const o = this.toasts.findIndex((a) => a.timestamp === r);
        this.toasts.splice(o, 1);
      }, n);
    }
  },
  share: {
    enable: !1
  }
}), xn = jn("product-modal", () => {
  const e = Q(!1), t = Q(!0), n = Q(!1), r = Q(null);
  function o() {
    e.value = !0;
  }
  function a() {
    e.value = !1;
  }
  const i = (c) => {
    typeof c > "u" ? t.value = !t.value : t.value = c;
  }, l = (c) => {
    if (typeof c < "u") {
      r.value = c;
      return;
    }
    r.value = null;
  }, s = (c) => {
    typeof c > "u" ? n.value = !n.value : n.value = c;
  };
  return Le(e, (c) => {
    window.dispatchEvent(
      new CustomEvent(c ? "th:productPopupOpen" : "th:productPopupClose")
    );
  }), {
    isOpen: e,
    productIsLoading: t,
    productIsAvailable: n,
    open: o,
    close: a,
    toggleLoading: i,
    toggleAvailability: s,
    quickBuyProduct: r,
    setQuickBuyProduct: l
  };
}), f0 = ["data-cart-item-id"], p0 = { class: "th-cart-item__info" }, h0 = ["href"], m0 = ["src", "srcset"], v0 = { class: "th-cart-item__additional-info" }, g0 = { class: "th-cart-item__modifications" }, y0 = {
  key: 0,
  class: "th-cart-item__product-start"
}, _0 = { class: "th-cart-item__product-start-date" }, b0 = { class: "th-cart-item__product-start-time" }, E0 = {
  key: 0,
  class: "th-cart-item__message"
}, w0 = { class: "th-cart-item__message__text" }, C0 = {
  key: 0,
  class: "th-cart-item__modification th-cart-item__modification_visitors"
}, T0 = {
  key: 1,
  class: "th-cart-item__modification th-cart-item__modification_visitors"
}, S0 = { class: "th-cart-item__modification_visitor__title" }, k0 = { class: "th-cart-item__modification_visitor__price" }, I0 = {
  key: 0,
  class: "th-cart-item__modification_visitor__price_default"
}, O0 = ["innerHTML"], D0 = { class: "th-cart-item__meta" }, P0 = { class: "th-cart-item__actions" }, A0 = { class: "th-cart-item__price" }, $0 = { class: "th-cart-item__price_sale" }, N0 = /* @__PURE__ */ pe({
  __name: "CartItem",
  props: {
    product: {},
    small: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = bi(), { t: n, locale: r } = De(), { showToast: o, showErrorToast: a } = br(), { setQuickBuyProduct: i } = xn(), l = e, s = $e(), c = Q(!1), u = te(() => {
      var p;
      return (p = window.ticketHub) == null ? void 0 : p.detailedCartItemCategory;
    }), f = async (p) => {
      if (!l.product.isUpsell)
        return;
      p.preventDefault();
      const g = t.currentRoute;
      g.value.query.cartItemId = l.product.id, window.history.pushState(null, "", t.resolve(g.value).href), await t.push(g.value);
      try {
        let m = await qa.getUpsellByItemId(l.product.itemId);
        typeof m > "u" && (m = {
          title: l.product.item.itemName,
          itemId: l.product.itemId
        });
        let h = {
          isAddon: !1,
          parents: []
        };
        l.product.isSingle && (h = l.product.item.addonInfo), i({
          ...m,
          upsell: !0,
          addonInfo: h
        });
      } catch {
      }
    }, d = te(() => {
      var p;
      return (p = window.ticketHub) == null ? void 0 : p.editCartItemEnabled;
    }), v = async () => {
      var p, g, m, h;
      try {
        c.value = !0, await s.deleteCartItem(l.product.id, l.product.isCombo), o(n("toast.productHasBeenRemoved"));
      } catch (y) {
        if (!(y instanceof It))
          return a();
        const w = y.message;
        let O = y.message;
        (typeof ((p = w.errors[0]) == null ? void 0 : p.type) < "u" || typeof ((g = w.errors[0]) == null ? void 0 : g.code) < "u") && (O = ((m = w.errors[0]) == null ? void 0 : m.type) || ((h = w.errors[0]) == null ? void 0 : h.code), O = n(`THError.${O}`)), a(O, 1e4);
      } finally {
        c.value = !1;
      }
    };
    return (p, g) => (U(), X("div", {
      "data-cart-item-id": l.product.id,
      class: "th-cart-item"
    }, [
      q("div", p0, [
        l.product.preview ? (U(), X("a", {
          key: 0,
          href: l.product.getItemLink(W(r))
        }, [
          q("span", {
            class: be([{ "th-cart-item__image_small": p.small }, "th-cart-item__image"])
          }, [
            q("img", {
              src: l.product.preview,
              srcset: l.product.getImageSrcset(),
              alt: "",
              height: "104",
              loading: "lazy",
              width: "104"
            }, null, 8, m0)
          ], 2)
        ], 8, h0)) : se("", !0),
        q("div", {
          class: be([{ "th-cart-item__data_small": p.small }, "th-cart-item__data"])
        }, [
          q("div", {
            class: be([{ "th-cart-item__title_small": p.small }, "th-cart-item__title"])
          }, ae(l.product.title), 3),
          q("div", v0, [
            q("div", g0, [
              (U(!0), X(Oe, null, it(l.product.items, (m) => (U(), X("div", {
                key: m.itemName,
                class: "th-cart-item__product"
              }, [
                q("div", {
                  class: be([{ "th-cart-item__product-title_small": p.small }, "th-cart-item__product-title"])
                }, ae(m.itemName), 3),
                m.timeslot ? (U(), X("div", y0, [
                  q("div", _0, ae(m.timeslot.humanizedDate), 1),
                  q("div", b0, ae(m.timeslot.humanizedTime), 1),
                  m.timeslot.isExpired ? (U(), X("div", E0, [
                    q("span", w0, ae(W(n)("cart.timeslotIsExpired")), 1)
                  ])) : se("", !0)
                ])) : se("", !0)
              ]))), 128)),
              u.value ? (U(), X("div", T0, [
                (U(!0), X(Oe, null, it(l.product.selectedCategories, (m) => (U(), X("div", {
                  key: m.itemCategoryId,
                  class: "th-cart-item__modification_visitor"
                }, [
                  m.quantity > 0 ? (U(), X(Oe, { key: 0 }, [
                    q("div", S0, ae(m.computedText), 1),
                    q("div", k0, [
                      m.totalPrice !== m.totalDiscountedPrice ? (U(), X("span", I0, [
                        z(ct, {
                          amount: m.totalPrice
                        }, null, 8, ["amount"])
                      ])) : se("", !0),
                      q("span", null, [
                        z(ct, {
                          amount: m.totalDiscountedPrice
                        }, null, 8, ["amount"])
                      ])
                    ])
                  ], 64)) : se("", !0)
                ]))), 128))
              ])) : (U(), X("div", C0, ae(l.product.selectedVisitorsText), 1)),
              q("div", {
                innerHTML: l.product.extraMealsText
              }, null, 8, O0)
            ])
          ])
        ], 2)
      ]),
      q("div", D0, [
        q("div", P0, [
          l.product.url && d.value ? (U(), de(ot, {
            key: 0,
            to: l.product.getItemEditLink(W(r)),
            plain: "",
            tag: "a",
            type: "button",
            onClick: f
          }, {
            default: we(() => [
              Ge(ae(W(n)("cart.edit")), 1)
            ]),
            _: 1
          }, 8, ["to"])) : se("", !0),
          z(ot, {
            loading: c.value,
            plain: "",
            type: "button",
            onClick: v
          }, {
            default: we(() => [
              Ge(ae(W(n)("cart.remove")), 1)
            ]),
            _: 1
          }, 8, ["loading"])
        ]),
        q("div", A0, [
          q("span", $0, [
            z(ct, {
              amount: l.product.totalPrice
            }, null, 8, ["amount"])
          ])
        ])
      ])
    ], 8, f0));
  }
}), L0 = /* @__PURE__ */ ge(N0, [["__scopeId", "data-v-2398ab8d"]]), R0 = {}, M0 = {
  fill: "none",
  height: "32",
  viewBox: "0 0 32 32",
  width: "32",
  xmlns: "http://www.w3.org/2000/svg"
}, x0 = /* @__PURE__ */ q("path", {
  "clip-rule": "evenodd",
  d: "M25.2498 9.40004C25.5812 9.64857 25.6483 10.1187 25.3998 10.45L15.3229 23.8859C15.1925 24.0598 14.9929 24.1686 14.776 24.184C14.5591 24.1994 14.3461 24.1199 14.1924 23.966L7.4695 17.2388C7.1767 16.9458 7.17685 16.4709 7.46984 16.1781C7.76283 15.8853 8.2377 15.8855 8.5305 16.1785L14.642 22.2938L24.1998 9.55004C24.4483 9.21867 24.9184 9.15152 25.2498 9.40004Z",
  fill: "currentColor",
  "fill-rule": "evenodd"
}, null, -1), B0 = [
  x0
];
function V0(e, t) {
  return U(), X("svg", M0, B0);
}
const U0 = /* @__PURE__ */ ge(R0, [["render", V0]]), F0 = { class: "th-checkbox" }, H0 = ["checked", "disabled"], Y0 = {
  class: "th-checkbox__helper",
  tabindex: ""
}, j0 = ["innerHTML"], W0 = /* @__PURE__ */ pe({
  __name: "CheckboxComponent",
  props: {
    modelValue: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    text: {},
    size: { default: 9 }
  },
  setup(e) {
    return (t, n) => (U(), X("label", F0, [
      q("input", {
        checked: t.modelValue,
        disabled: t.readonly,
        class: "th-checkbox__input",
        type: "checkbox",
        onChange: n[0] || (n[0] = (r) => {
          var o;
          return t.$emit("update:modelValue", (o = r.target) == null ? void 0 : o.checked);
        })
      }, null, 40, H0),
      q("span", Y0, [
        z(U0, {
          style: Lv({ width: `${t.size}px` }),
          class: "th-checkbox__icon"
        }, null, 8, ["style"])
      ]),
      t.text ? (U(), X("span", {
        key: 0,
        class: "th-checkbox__text",
        innerHTML: t.text
      }, null, 8, j0)) : se("", !0)
    ]));
  }
}), q0 = /* @__PURE__ */ ge(W0, [["__scopeId", "data-v-9ff4adfc"]]), z0 = { class: "th-cart-coupon" }, G0 = ["readonly"], X0 = /* @__PURE__ */ pe({
  __name: "CartCouponInput",
  props: {
    voucher: { default: null }
  },
  emits: ["code-applied"],
  setup(e, { emit: t }) {
    const { t: n } = De(), { showToast: r, showErrorToast: o } = br(), a = e, i = $e(), l = Q(!1), s = Q(""), c = t, u = async () => {
      try {
        l.value = !0, await i.setVoucher(s.value), c("code-applied"), s.value = "", r(n("toast.voucherHasBeenApplied", { voucher: s.value }));
      } catch (d) {
        d instanceof It && (d.statusCode === 404 ? o(n("toast.voucherNotFound", { voucher: s.value })) : o());
      } finally {
        l.value = !1;
      }
    }, f = async () => {
      try {
        l.value = !0, await i.deleteVoucher(s.value), r(n("toast.voucherHasBeenDeleted", { voucher: s.value }));
      } catch (d) {
        d instanceof It && d.statusCode === 404 ? o(n("toast.voucherNotFound", { voucher: s.value })) : o();
      } finally {
        l.value = !1;
      }
    };
    return Ke(() => {
      a.voucher && (s.value = a.voucher.code);
    }), (d, v) => (U(), X("div", null, [
      q("div", z0, [
        Qd(q("input", {
          "onUpdate:modelValue": v[0] || (v[0] = (p) => s.value = p),
          readonly: !!d.voucher,
          class: "th-cart-coupon__input",
          type: "text"
        }, null, 8, G0), [
          [Rv, s.value]
        ]),
        s.value.length ? (U(), X(Oe, { key: 0 }, [
          d.voucher ? (U(), de(ot, {
            key: 1,
            loading: l.value,
            class: "th-cart-coupon__btn",
            plain: "",
            onClick: f
          }, {
            default: we(() => [
              Ge(ae(W(n)("cart.delete")), 1)
            ]),
            _: 1
          }, 8, ["loading"])) : (U(), de(ot, {
            key: 0,
            loading: l.value,
            class: "th-cart-coupon__btn",
            plain: "",
            onClick: u
          }, {
            default: we(() => [
              Ge(ae(W(n)("cart.apply")), 1)
            ]),
            _: 1
          }, 8, ["loading"]))
        ], 64)) : se("", !0)
      ])
    ]));
  }
}), ku = /* @__PURE__ */ ge(X0, [["__scopeId", "data-v-d34fbbef"]]), K0 = { class: "th-cart-discount cart-discount_expanded" }, J0 = {
  key: 1,
  class: "th-cart-discount__wrapper"
}, Z0 = { class: "th-cart-discount__heading" }, Q0 = {
  key: 0,
  class: "th-cart-discount__inputs"
}, eE = /* @__PURE__ */ pe({
  __name: "CartDiscount",
  props: {
    isShown: { type: Boolean, default: !1 }
  },
  setup(e) {
    const { t } = De(), n = e, r = $e(), o = Q(n.isShown), a = Q(!1);
    return Ke(() => {
      r.isVouchersApplied && (o.value = !0);
    }), (i, l) => (U(), X("div", K0, [
      n.isShown ? se("", !0) : (U(), de(q0, {
        key: 0,
        modelValue: o.value,
        "onUpdate:modelValue": l[0] || (l[0] = (s) => o.value = s),
        readonly: W(r).isVouchersApplied,
        text: W(t)("cart.iHaveDiscountCode"),
        class: "th-cart-discount__checkbox"
      }, null, 8, ["modelValue", "readonly", "text"])),
      o.value ? (U(), X("div", J0, [
        q("div", Z0, ae(W(t)("cart.discountCode")), 1),
        W(r).isVouchersApplied ? (U(), X("div", Q0, [
          (U(!0), X(Oe, null, it(W(r).vouchers, (s) => (U(), de(ku, {
            key: s.voucherId,
            voucher: s,
            onCodeApplied: l[1] || (l[1] = (c) => a.value = !1)
          }, null, 8, ["voucher"]))), 128))
        ])) : se("", !0),
        !a.value && W(r).isVouchersApplied ? (U(), de(ot, {
          key: 1,
          class: "th-cart-discount__btn",
          plain: "",
          onClick: l[2] || (l[2] = (s) => a.value = !0)
        }, {
          default: we(() => [
            Ge(ae(W(t)("cart.addDiscountCode")), 1)
          ]),
          _: 1
        })) : se("", !0),
        a.value || !W(r).isVouchersApplied ? (U(), de(ku, {
          key: 2,
          class: "th-cart-discount__new-input",
          onCodeApplied: l[3] || (l[3] = (s) => a.value = !1)
        })) : se("", !0)
      ])) : se("", !0)
    ]));
  }
}), tE = /* @__PURE__ */ ge(eE, [["__scopeId", "data-v-6a7d0a33"]]), nE = {}, rE = {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, oE = /* @__PURE__ */ q("path", {
  d: `M10.5894 6.05557C10.4727 5.93888 10.3156 5.87305 10.151 5.87305C9.98646 5.87305 9.82937
      5.93738 9.71267 6.05557L7.11991 8.63487L6.28957 7.79854C6.05019 7.55916 5.65672 7.55617
      5.41435 7.79405C5.17048 8.03193 5.16749 8.42541 5.40687 8.67077L6.67557 9.94845C6.79227
      10.0651 6.94936 10.131 7.11542 10.131C7.28 10.131 7.43559 10.0666 7.55229 9.94995L10.5864
      6.93379C10.8258 6.69441 10.8288 6.30093 10.5909 6.05856L10.5894 6.05557Z`,
  fill: "currentColor"
}, null, -1), aE = /* @__PURE__ */ q("path", {
  d: `M14.9105 5.08408C14.532 4.1909 13.9904 3.38899 13.3022 2.69928C12.6125 2.01107 11.8106
			1.46948 10.9174 1.09096C9.99282 0.698983 9.01137 0.5 8 0.5C3.86475 0.501496 0.5 3.86625 0.5
			8.0015C0.5 12.1367 3.86475 15.5015 8 15.5015C12.1352 15.5015 15.5 12.1367 15.5 8.0015C15.5
			6.99013 15.3025 6.00868 14.9105 5.08408ZM8 14.2612C4.54847 14.2612 1.74028 11.453 1.74028
			8.0015C1.74028 4.54997 4.54847 1.74177 8 1.74177C11.4515 1.74177 14.2597 4.54997 14.2597
			8.0015C14.2597 11.453 11.4515 14.2612 8 14.2612Z`,
  fill: "currentColor"
}, null, -1), iE = [
  oE,
  aE
];
function sE(e, t) {
  return U(), X("svg", rE, iE);
}
const Iu = /* @__PURE__ */ ge(nE, [["render", sE]]), lE = {}, cE = {
  height: "32",
  viewBox: "0 0 26 32",
  width: "26",
  xmlns: "http://www.w3.org/2000/svg"
}, uE = /* @__PURE__ */ Mv('<path d="M26.032 7.797c-0.032-0.744-0.434-1.454-1.136-1.833-0 0-0-0-0-0l-10.558-5.702s-0 0-0-0c-1.060-0.572-2.389-0.176-2.961 0.885l-11.115 20.583s0 0-0 0c-0.176 0.326-0.251 0.678-0.252 1.025l-0.008-0.014v1.416l0.009 0.008c0.019 0.758 0.423 1.487 1.136 1.872l10.558 5.701c1.060 0.573 2.389 0.176 2.962-0.885l11.115-20.583c0.194-0.359 0.268-0.749 0.252-1.13 0.001-0.008 0.010-0.013 0.010-0.021v-1.337l-0.010 0.015zM24.068 8.841l-10.426 19.307c-0.284 0.526-0.94 0.722-1.466 0.438l-9.778-5.28c-0.526-0.284-0.722-0.94-0.438-1.466l10.426-19.306c0.267-0.494 0.885-0.678 1.378-0.412l0.545 0.294c-0.268 0.714-0.034 1.51 0.596 1.851l6.425 3.47c0.626 0.338 1.418 0.101 1.871-0.518l0.455 0.246c0.494 0.267 0.678 0.885 0.412 1.378z" fill="currentColor"></path><path d="M7.317 15.142l3.829-6.902c0.085-0.153 0.278-0.208 0.431-0.123l0.394 0.218c0.153 0.085 0.208 0.278 0.123 0.431l-3.829 6.902c-0.085 0.153-0.278 0.208-0.431 0.123l-0.394-0.218c-0.153-0.085-0.208-0.278-0.123-0.431z" fill="currentColor"></path><path d="M9.522 16.365l3.829-6.903c0.085-0.153 0.278-0.208 0.431-0.123l0.791 0.439c0.153 0.085 0.208 0.278 0.123 0.431l-3.829 6.903c-0.085 0.153-0.278 0.208-0.431 0.123l-0.791-0.439c-0.153-0.085-0.208-0.278-0.123-0.431z" fill="currentColor"></path><path d="M12.432 17.979l3.829-6.902c0.085-0.153 0.278-0.208 0.431-0.123l0.317 0.176c0.153 0.085 0.208 0.278 0.123 0.431l-3.829 6.902c-0.085 0.153-0.278 0.208-0.431 0.123l-0.317-0.176c-0.153-0.085-0.208-0.278-0.123-0.431z" fill="currentColor"></path><path d="M14.099 18.903l3.829-6.902c0.085-0.153 0.278-0.208 0.431-0.123l0.945 0.524c0.153 0.085 0.208 0.278 0.123 0.431l-3.829 6.902c-0.085 0.153-0.278 0.208-0.431 0.123l-0.945-0.524c-0.153-0.085-0.208-0.278-0.123-0.431z" fill="currentColor"></path>', 5), dE = [
  uE
];
function fE(e, t) {
  return U(), X("svg", cE, dE);
}
const pE = /* @__PURE__ */ ge(lE, [["render", fE]]), hE = { class: "th-achievements" }, mE = { class: "th-achievements__item" }, vE = { class: "th-achievements__item" }, gE = { class: "th-achievements__item" }, yE = /* @__PURE__ */ pe({
  __name: "AchievementsComponent",
  setup(e) {
    const { t } = De();
    return (n, r) => (U(), X("div", hE, [
      q("div", mE, [
        z(Iu, { class: "th-achievements__icon" }),
        q("span", null, ae(W(t)("achievements.easyBooking")), 1)
      ]),
      q("div", vE, [
        z(pE, { class: "th-achievements__icon" }),
        q("span", null, ae(W(t)("achievements.ticketOnSmartphone")), 1)
      ]),
      q("div", gE, [
        z(Iu, { class: "th-achievements__icon" }),
        q("span", null, ae(W(t)("achievements.customerService")), 1)
      ])
    ]));
  }
}), _E = /* @__PURE__ */ ge(yE, [["__scopeId", "data-v-91d7f9e8"]]), bE = { class: "th-cost" }, EE = {
  key: 0,
  class: "th-cost__item"
}, wE = { class: "th-cost__item_value" }, CE = { class: "th-cost__item_value" }, TE = {
  key: 2,
  class: "th-cost__item"
}, SE = { class: "th-cost__item_value" }, kE = {
  key: 3,
  class: "th-cost__item"
}, IE = { class: "th-cost__item_value" }, OE = {
  key: 4,
  class: "th-cost__item th-cost__item_total"
}, DE = { class: "th-cost__item_value" }, PE = /* @__PURE__ */ pe({
  __name: "CostComponent",
  props: {
    discount: {},
    fee: {},
    subtotal: {},
    tax: {},
    total: {}
  },
  setup(e) {
    const { t } = De(), n = e;
    return (r, o) => (U(), X("div", bE, [
      n.subtotal ? (U(), X("div", EE, [
        q("span", null, ae(W(t)("cart.subTotal")), 1),
        q("span", wE, [
          z(ct, {
            amount: n.subtotal
          }, null, 8, ["amount"])
        ])
      ])) : se("", !0),
      n.discount ? (U(!0), X(Oe, { key: 1 }, it(n.discount, (a) => (U(), X("div", {
        key: a.title,
        class: "th-cost__item"
      }, [
        q("span", null, ae(a.title), 1),
        q("span", CE, [
          z(ct, {
            amount: a.amount
          }, null, 8, ["amount"])
        ])
      ]))), 128)) : se("", !0),
      typeof n.tax < "u" ? (U(), X("div", TE, [
        q("span", null, ae(W(t)("cart.tax")), 1),
        q("span", SE, [
          z(ct, {
            amount: n.tax
          }, null, 8, ["amount"])
        ])
      ])) : se("", !0),
      n.fee !== 0 ? (U(), X("div", kE, [
        q("span", null, ae(W(t)("cart.fee")), 1),
        q("span", IE, [
          z(ct, {
            amount: n.fee
          }, null, 8, ["amount"])
        ])
      ])) : se("", !0),
      typeof n.total < "u" ? (U(), X("div", OE, [
        q("span", null, ae(W(t)("cart.total")), 1),
        q("span", DE, [
          z(ct, {
            amount: n.total
          }, null, 8, ["amount"])
        ])
      ])) : se("", !0)
    ]));
  }
}), AE = /* @__PURE__ */ ge(PE, [["__scopeId", "data-v-06cad875"]]), $E = {
  key: 0,
  class: "th-cart__promo"
}, NE = /* @__PURE__ */ pe({
  __name: "CartPromo",
  setup(e) {
    const t = Q(null);
    return Ke(() => {
      var n, r;
      typeof ((n = window.ticketHub) == null ? void 0 : n.promoComponent) > "u" || (t.value = (r = window.ticketHub) == null ? void 0 : r.promoComponent);
    }), (n, r) => t.value ? (U(), X("div", $E, [
      (U(), de(qo(t.value)))
    ])) : se("", !0);
  }
});
var Th = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(Yt, function() {
    var n, r, o = 1e3, a = 6e4, i = 36e5, l = 864e5, s = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, c = 31536e6, u = 2628e6, f = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, d = { years: c, months: u, days: l, hours: i, minutes: a, seconds: o, milliseconds: 1, weeks: 6048e5 }, v = function(C) {
      return C instanceof O;
    }, p = function(C, b, E) {
      return new O(C, E, b.$l);
    }, g = function(C) {
      return r.p(C) + "s";
    }, m = function(C) {
      return C < 0;
    }, h = function(C) {
      return m(C) ? Math.ceil(C) : Math.floor(C);
    }, y = function(C) {
      return Math.abs(C);
    }, w = function(C, b) {
      return C ? m(C) ? { negative: !0, format: "" + y(C) + b } : { negative: !1, format: "" + C + b } : { negative: !1, format: "" };
    }, O = function() {
      function C(E, k, _) {
        var S = this;
        if (this.$d = {}, this.$l = _, E === void 0 && (this.$ms = 0, this.parseFromMilliseconds()), k)
          return p(E * d[g(k)], this);
        if (typeof E == "number")
          return this.$ms = E, this.parseFromMilliseconds(), this;
        if (typeof E == "object")
          return Object.keys(E).forEach(function(B) {
            S.$d[g(B)] = E[B];
          }), this.calMilliseconds(), this;
        if (typeof E == "string") {
          var A = E.match(f);
          if (A) {
            var x = A.slice(2).map(function(B) {
              return B != null ? Number(B) : 0;
            });
            return this.$d.years = x[0], this.$d.months = x[1], this.$d.weeks = x[2], this.$d.days = x[3], this.$d.hours = x[4], this.$d.minutes = x[5], this.$d.seconds = x[6], this.calMilliseconds(), this;
          }
        }
        return this;
      }
      var b = C.prototype;
      return b.calMilliseconds = function() {
        var E = this;
        this.$ms = Object.keys(this.$d).reduce(function(k, _) {
          return k + (E.$d[_] || 0) * d[_];
        }, 0);
      }, b.parseFromMilliseconds = function() {
        var E = this.$ms;
        this.$d.years = h(E / c), E %= c, this.$d.months = h(E / u), E %= u, this.$d.days = h(E / l), E %= l, this.$d.hours = h(E / i), E %= i, this.$d.minutes = h(E / a), E %= a, this.$d.seconds = h(E / o), E %= o, this.$d.milliseconds = E;
      }, b.toISOString = function() {
        var E = w(this.$d.years, "Y"), k = w(this.$d.months, "M"), _ = +this.$d.days || 0;
        this.$d.weeks && (_ += 7 * this.$d.weeks);
        var S = w(_, "D"), A = w(this.$d.hours, "H"), x = w(this.$d.minutes, "M"), B = this.$d.seconds || 0;
        this.$d.milliseconds && (B += this.$d.milliseconds / 1e3, B = Math.round(1e3 * B) / 1e3);
        var N = w(B, "S"), V = E.negative || k.negative || S.negative || A.negative || x.negative || N.negative, G = A.format || x.format || N.format ? "T" : "", L = (V ? "-" : "") + "P" + E.format + k.format + S.format + G + A.format + x.format + N.format;
        return L === "P" || L === "-P" ? "P0D" : L;
      }, b.toJSON = function() {
        return this.toISOString();
      }, b.format = function(E) {
        var k = E || "YYYY-MM-DDTHH:mm:ss", _ = { Y: this.$d.years, YY: r.s(this.$d.years, 2, "0"), YYYY: r.s(this.$d.years, 4, "0"), M: this.$d.months, MM: r.s(this.$d.months, 2, "0"), D: this.$d.days, DD: r.s(this.$d.days, 2, "0"), H: this.$d.hours, HH: r.s(this.$d.hours, 2, "0"), m: this.$d.minutes, mm: r.s(this.$d.minutes, 2, "0"), s: this.$d.seconds, ss: r.s(this.$d.seconds, 2, "0"), SSS: r.s(this.$d.milliseconds, 3, "0") };
        return k.replace(s, function(S, A) {
          return A || String(_[S]);
        });
      }, b.as = function(E) {
        return this.$ms / d[g(E)];
      }, b.get = function(E) {
        var k = this.$ms, _ = g(E);
        return _ === "milliseconds" ? k %= 1e3 : k = _ === "weeks" ? h(k / d[_]) : this.$d[_], k || 0;
      }, b.add = function(E, k, _) {
        var S;
        return S = k ? E * d[g(k)] : v(E) ? E.$ms : p(E, this).$ms, p(this.$ms + S * (_ ? -1 : 1), this);
      }, b.subtract = function(E, k) {
        return this.add(E, k, !0);
      }, b.locale = function(E) {
        var k = this.clone();
        return k.$l = E, k;
      }, b.clone = function() {
        return p(this.$ms, this);
      }, b.humanize = function(E) {
        return n().add(this.$ms, "ms").locale(this.$l).fromNow(!E);
      }, b.valueOf = function() {
        return this.asMilliseconds();
      }, b.milliseconds = function() {
        return this.get("milliseconds");
      }, b.asMilliseconds = function() {
        return this.as("milliseconds");
      }, b.seconds = function() {
        return this.get("seconds");
      }, b.asSeconds = function() {
        return this.as("seconds");
      }, b.minutes = function() {
        return this.get("minutes");
      }, b.asMinutes = function() {
        return this.as("minutes");
      }, b.hours = function() {
        return this.get("hours");
      }, b.asHours = function() {
        return this.as("hours");
      }, b.days = function() {
        return this.get("days");
      }, b.asDays = function() {
        return this.as("days");
      }, b.weeks = function() {
        return this.get("weeks");
      }, b.asWeeks = function() {
        return this.as("weeks");
      }, b.months = function() {
        return this.get("months");
      }, b.asMonths = function() {
        return this.as("months");
      }, b.years = function() {
        return this.get("years");
      }, b.asYears = function() {
        return this.as("years");
      }, C;
    }(), $ = function(C, b, E) {
      return C.add(b.years() * E, "y").add(b.months() * E, "M").add(b.days() * E, "d").add(b.hours() * E, "h").add(b.minutes() * E, "m").add(b.seconds() * E, "s").add(b.milliseconds() * E, "ms");
    };
    return function(C, b, E) {
      n = E, r = E().$utils(), E.duration = function(S, A) {
        var x = E.locale();
        return p(S, { $l: x }, A);
      }, E.isDuration = v;
      var k = b.prototype.add, _ = b.prototype.subtract;
      b.prototype.add = function(S, A) {
        return v(S) ? $(this, S, 1) : k.bind(this)(S, A);
      }, b.prototype.subtract = function(S, A) {
        return v(S) ? $(this, S, -1) : _.bind(this)(S, A);
      };
    };
  });
})(Th);
var LE = Th.exports;
const RE = /* @__PURE__ */ _r(LE);
var ME = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const xE = (e) => (zo("data-v-ab9c2d89"), e = e(), Go(), e), BE = { class: "valid-price-info" }, VE = /* @__PURE__ */ xE(() => /* @__PURE__ */ q("svg", {
  "data-v-39cbcd33": "",
  fill: "none",
  height: "24",
  viewBox: "0 0 24 24",
  width: "24",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ q("path", {
    d: `M15.2766 14.1538C15.5207 13.7633 15.3743 13.2751 15.0325 12.9822L13.0799
					11.7618V8.14941C13.0799 7.71006 12.6893 7.31953 12.25 7.31953C11.8107
					7.31953 11.4201 7.71006 11.4201 8.14941V12.25C11.4201 12.2988 11.4201
					12.2988 11.4201 12.3476V12.3965C11.4201 12.4453 11.4201 12.4941 11.4689
					12.5429C11.5178 12.6893 11.6642 12.8358 11.8107 12.9334L14.1538 14.3979C14.4956
					14.642 15.0325 14.4956 15.2766 14.1538C15.2766 14.105 15.2766 14.105 15.2766
					14.1538ZM18.8402 12.25C18.8402 15.9112 15.8624 18.8402 12.25 18.8402C8.63757
					18.8402 5.65976 15.9112 5.65976 12.25C5.65976 8.58876 8.58876 5.65976 12.25
					5.65976C15.9112 5.65976 18.8402 8.58876 18.8402 12.25ZM20.5 12.25C20.5 7.71006
					16.7899 4 12.25 4C7.71006 4 4 7.71006 4 12.25C4 16.7899 7.71006 20.5 12.25
					20.5C16.7899 20.5 20.5 16.7899 20.5 12.25Z`,
    "data-v-39cbcd33": "",
    fill: "currentColor"
  })
], -1)), UE = ["innerHTML"], FE = /* @__PURE__ */ pe({
  __name: "ValidPricesInfo",
  setup(e) {
    ue.extend(RE);
    const t = ME.VITE_RECALCULATE_CART_INTERVAL_MS, n = $e(), r = Q(0), o = Q(Date.now()), a = te(() => {
      const l = ue(ue(o.value)).diff(
        ue(n.lastCartRequestTime)
      );
      return ue.duration(t - l).format("mm:ss");
    }), { t: i } = De();
    return Ke(() => {
      r.value = setInterval(async () => {
        o.value = Date.now(), ue(Date.now()).diff(
          ue(n.lastCartRequestTime),
          "milliseconds"
        ) < t;
      }, 1e3);
    }), ll(() => {
      clearInterval(r.value);
    }), (l, s) => (U(), X("div", BE, [
      VE,
      q("span", {
        innerHTML: W(i)("checkout.validPricesInfo", { time: a.value })
      }, null, 8, UE)
    ]));
  }
}), HE = /* @__PURE__ */ ge(FE, [["__scopeId", "data-v-ab9c2d89"]]), YE = { class: "th-cart-popup" }, jE = {
  key: 0,
  class: "th-cart-popup__empty"
}, WE = { class: "th-cart-popup__empty-content" }, qE = { class: "th-cart-popup__empty-text" }, zE = ["href"], GE = {
  key: 1,
  class: "th-cart-popup__body"
}, XE = { class: "th-cart-popup__title" }, KE = { class: "th-cart-popup__list" }, JE = {
  key: 2,
  class: "th-cart-popup__footer"
}, ZE = { class: "th-cart-popup__total" }, QE = /* @__PURE__ */ pe({
  __name: "CartPopup",
  props: {
    emptyCartBrowseLink: { default: "" }
  },
  setup(e) {
    const { t } = De(), n = mi(), r = $e(), o = e, a = te(() => window ? new URL(o.emptyCartBrowseLink, window.location.origin).href : o.emptyCartBrowseLink), i = () => {
      n.toggle(), window && a.value !== window.location.href && (window.location.href = a.value);
    };
    return (l, s) => (U(), de(Cl, {
      toggle: W(n).toggle
    }, {
      default: we(() => {
        var c, u, f, d, v;
        return [
          q("div", YE, [
            W(r).count === 0 ? (U(), X("div", jE, [
              q("div", WE, [
                q("p", qE, ae(W(t)("cart.cartIsEmpty")), 1),
                q("a", {
                  href: o.emptyCartBrowseLink,
                  class: "th-cart-popup__empty-button",
                  onClick: Ye(i, ["prevent"])
                }, [
                  z(ot, {
                    bg: "accent",
                    type: "button"
                  }, {
                    default: we(() => [
                      Ge(ae(W(t)("cart.startExploring")), 1)
                    ]),
                    _: 1
                  })
                ], 8, zE)
              ])
            ])) : (U(), X("div", GE, [
              q("div", XE, ae(W(t)("cart.your", W(r).count)), 1),
              z(HE),
              q("div", KE, [
                (U(!0), X(Oe, null, it(W(r).items, (p) => (U(), de(L0, {
                  key: p.id,
                  product: p
                }, null, 8, ["product"]))), 128))
              ]),
              z(_E),
              z(Su),
              z(tE),
              z(NE),
              z(Su, { class: "th-cart-popup__bottom-divider" }),
              z(AE, {
                discount: W(r).discountSummaries,
                fee: (c = W(r).cart) == null ? void 0 : c.bookingFee,
                subtotal: (u = W(r).cart) == null ? void 0 : u.totalPrice,
                tax: (f = W(r).cart) == null ? void 0 : f.vatAmount,
                total: (d = W(r).cart) == null ? void 0 : d.totalDiscountedPrice
              }, null, 8, ["discount", "fee", "subtotal", "tax", "total"])
            ])),
            W(r).count > 0 ? (U(), X("div", JE, [
              q("div", ZE, [
                q("span", null, ae(W(t)("cart.total")), 1),
                q("span", null, [
                  z(ct, {
                    amount: (v = W(r).cart) == null ? void 0 : v.totalDiscountedPrice
                  }, null, 8, ["amount"])
                ])
              ]),
              z(ot, {
                disabled: W(r).isExpired,
                to: { name: "checkout" },
                bg: "accent",
                class: "th-cart-popup__submit",
                tag: "router-link",
                onClick: s[0] || (s[0] = Ye((p) => W(n).toggle(), ["prevent"]))
              }, {
                default: we(() => [
                  Ge(ae(W(t)("cart.toCheckout")), 1)
                ]),
                _: 1
              }, 8, ["disabled"])
            ])) : se("", !0)
          ])
        ];
      }),
      _: 1
    }, 8, ["toggle"]));
  }
}), ew = /* @__PURE__ */ ge(QE, [["__scopeId", "data-v-ff39ea57"]]), Hs = jn("currency-modal", () => {
  const e = Q(!1);
  function t() {
    e.value = !0;
  }
  function n() {
    e.value = !1;
  }
  function r(o) {
    e.value = typeof o < "u" && typeof o == "boolean" ? o : !e.value;
  }
  return Le(e, (o) => {
    window.dispatchEvent(
      new CustomEvent(o ? "th:currencyPopupOpen" : "th:currencyPopupClose")
    );
  }), { isOpen: e, open: t, close: n, toggle: r };
}), tw = { class: "th-modal__title" }, nw = { class: "th-modal__content" }, rw = ["onClick"], ow = { class: "th-modal__button-title" }, aw = { class: "th-modal__button-description" }, iw = /* @__PURE__ */ pe({
  __name: "CurrencyPopup",
  setup(e) {
    const { t } = De(), { isOpen: n } = Io(Hs()), { list: r, current: o } = Io(Ln()), { setCurrency: a } = Ln(), { toggle: i, close: l } = Hs();
    return (s, c) => W(n) ? (U(), de(Cl, {
      key: 0,
      center: !0,
      toggle: W(i),
      class: "th-modal_currency"
    }, {
      default: we(() => [
        q("div", tw, ae(W(t)("cart.selectACurrency")), 1),
        q("div", nw, [
          (U(!0), X(Oe, null, it(W(r), (u) => (U(), X("button", {
            key: u.code,
            class: be([{ "th-modal__button_selected": u.code === W(o).code }, "th-modal__button"]),
            type: "button",
            onClick: () => {
              W(a)(u.code), W(l)();
            }
          }, [
            q("span", ow, ae(u.code), 1),
            q("span", aw, ae(u.description) + " - " + ae(u.symbol), 1)
          ], 10, rw))), 128))
        ])
      ]),
      _: 1
    }, 8, ["toggle"])) : se("", !0);
  }
}), sw = /* @__PURE__ */ ge(iw, [["__scopeId", "data-v-c270df11"]]), lw = { class: "th-toast__heading" }, cw = { class: "th-toast__text" }, uw = /* @__PURE__ */ pe({
  __name: "ToastComponent",
  props: {
    text: {},
    type: {}
  },
  setup(e) {
    const { t } = De(), n = e, r = n.text ? n.text : t("toast.error");
    return (o, a) => (U(), X("div", {
      class: be([`th-toast__wrapper_${n.type}`, "th-toast__wrapper"]),
      role: "alert"
    }, [
      q("div", lw, ae(W(t)(`toast.${n.type}`)), 1),
      q("div", cw, ae(W(r)), 1)
    ], 2));
  }
}), dw = /* @__PURE__ */ ge(uw, [["__scopeId", "data-v-517193ae"]]), fw = { class: "th-toasts" }, pw = /* @__PURE__ */ pe({
  __name: "Toasts",
  setup(e) {
    const { getToasts: t } = ys(br());
    return (n, r) => (U(), X("div", fw, [
      z(ul, { name: "fade" }, {
        default: we(() => [
          (U(!0), X(Oe, null, it(W(t), (o) => (U(), de(dw, {
            key: o.timestamp,
            text: o.text,
            type: o.type
          }, null, 8, ["text", "type"]))), 128))
        ]),
        _: 1
      })
    ]));
  }
}), hw = /* @__PURE__ */ ge(pw, [["__scopeId", "data-v-d7679e7c"]]), Sh = (e) => (zo("data-v-d0770e43"), e = e(), Go(), e), mw = { class: "th-product-meta" }, vw = {
  key: 0,
  class: "th-product-meta__rating"
}, gw = {
  key: 0,
  class: "th-product-meta__stars"
}, yw = /* @__PURE__ */ Sh(() => /* @__PURE__ */ q("svg", {
  fill: "none",
  height: "16",
  viewBox: "0 0 17 16",
  width: "17",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ q("path", {
    d: `M12.4173 15.24C12.6366 15.36 12.8658 15.39 13.1051
					15.33C13.3443 15.27 13.5287 15.135 13.6583 14.925C13.7879
					14.715 13.8327 14.49 13.7928 14.25L13.0453 9.87L16.215
					6.78C16.3944 6.6 16.4891 6.39 16.4991 6.15C16.509 5.91 16.4393
					5.69 16.2897 5.49C16.1402 5.29 15.9359 5.17 15.6767 5.13L11.3109
					4.5L9.36719 0.54C9.24758 0.3 9.07314 0.14 8.84388 0.0600001C8.61463
					-0.02 8.38537 -0.02 8.15611 0.0600001C7.92686 0.14 7.75242 0.3
					7.63281 0.54L5.68911 4.5L1.32327 5.13C1.06411 5.17 0.859771 5.29
					0.710256 5.49C0.560741 5.69 0.490967 5.91 0.500934 6.15C0.510902
					6.39 0.605595 6.6 0.785013 6.78L3.95474 9.87L3.20716 14.25C3.16729
					14.49 3.21214 14.715 3.34172 14.925C3.4713 15.135 3.65571 15.27
					3.89493 15.33C4.13415 15.39 4.36341 15.36 4.5827 15.24L8.5 13.2L12.4173 15.24Z`,
    fill: "currentColor"
  })
], -1)), _w = {
  key: 1,
  class: "th-product-meta__divider"
}, bw = { key: 2 }, Ew = {
  key: 1,
  class: "th-product-meta__duration"
}, ww = /* @__PURE__ */ Sh(() => /* @__PURE__ */ q("svg", {
  fill: "none",
  height: "24",
  viewBox: "0 0 24 24",
  width: "24",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ q("path", {
    d: `M15.2766 14.1538C15.5207 13.7633 15.3743 13.2751 15.0325 12.9822L13.0799
					11.7618V8.14941C13.0799 7.71006 12.6893 7.31953 12.25 7.31953C11.8107
					7.31953 11.4201 7.71006 11.4201 8.14941V12.25C11.4201 12.2988 11.4201
					12.2988 11.4201 12.3476V12.3965C11.4201 12.4453 11.4201 12.4941 11.4689
					12.5429C11.5178 12.6893 11.6642 12.8358 11.8107 12.9334L14.1538 14.3979C14.4956
					14.642 15.0325 14.4956 15.2766 14.1538C15.2766 14.105 15.2766 14.105 15.2766
					14.1538ZM18.8402 12.25C18.8402 15.9112 15.8624 18.8402 12.25 18.8402C8.63757
					18.8402 5.65976 15.9112 5.65976 12.25C5.65976 8.58876 8.58876 5.65976 12.25
					5.65976C15.9112 5.65976 18.8402 8.58876 18.8402 12.25ZM20.5 12.25C20.5 7.71006
					16.7899 4 12.25 4C7.71006 4 4 7.71006 4 12.25C4 16.7899 7.71006 20.5 12.25
					20.5C16.7899 20.5 20.5 16.7899 20.5 12.25Z`,
    fill: "currentColor"
  })
], -1)), Cw = /* @__PURE__ */ pe({
  __name: "ProductMeta",
  props: {
    duration: {},
    rating: { default: 0 },
    bookingsCount: { default: 0 }
  },
  setup(e) {
    const { t } = De(), n = e;
    return (r, o) => (U(), X("div", mw, [
      n.rating || n.bookingsCount ? (U(), X("div", vw, [
        n.rating && n.rating >= 4 ? (U(), X("div", gw, [
          yw,
          q("span", null, ae(r.rating), 1)
        ])) : se("", !0),
        n.rating && n.rating >= 4 && n.bookingsCount ? (U(), X("span", _w)) : se("", !0),
        n.bookingsCount ? (U(), X("span", bw, ae(W(t)("booking.booking", n.bookingsCount)), 1)) : se("", !0)
      ])) : se("", !0),
      n.duration ? (U(), X("div", Ew, [
        ww,
        q("span", null, ae(n.duration), 1)
      ])) : se("", !0)
    ]));
  }
}), kh = /* @__PURE__ */ ge(Cw, [["__scopeId", "data-v-d0770e43"]]), Tw = {}, Sw = {
  fill: "none",
  height: "8",
  viewBox: "0 0 14 8",
  width: "14",
  xmlns: "http://www.w3.org/2000/svg"
}, kw = /* @__PURE__ */ q("path", {
  "clip-rule": "evenodd",
  d: "M12.9266 1.05445C13.1599 1.28974 13.1584 1.66963 12.9231 1.90297L8.12725 6.65917C7.5035 7.27777 6.49767 7.27776 5.87392 6.65917L1.07809 1.90297C0.842801 1.66963 0.841225 1.28974 1.07456 1.05445C1.30791 0.819168 1.6878 0.817591 1.92309 1.05093L6.71892 5.80713C6.87486 5.96178 7.12632 5.96178 7.28225 5.80713L12.0781 1.05093C12.3134 0.817592 12.6933 0.819168 12.9266 1.05445Z",
  fill: "currentColor",
  "fill-rule": "evenodd"
}, null, -1), Iw = [
  kw
];
function Ow(e, t) {
  return U(), X("svg", Sw, Iw);
}
const Ki = /* @__PURE__ */ ge(Tw, [["render", Ow]]), Dw = { class: "th-option-select__placeholder" }, Pw = { class: "th-option-select__placeholder-title" }, Aw = { class: "th-option-select__placeholder-title th-option-select__placeholder-title_extended" }, $w = { class: "th-option-select__placeholder-title" }, Nw = /* @__PURE__ */ pe({
  __name: "SelectComponent",
  props: {
    title: {},
    selectedOptionTitle: {},
    iconIsShown: { type: Boolean, default: !0 },
    titleIsBlack: { type: Boolean, default: !1 },
    footerIsExtended: { type: Boolean, default: !1 },
    isEnabled: { type: Boolean, default: !0 },
    isCalendar: { type: Boolean, default: !1 },
    isActive: { type: Boolean, default: !0 },
    isSticky: { type: Boolean, default: !1 },
    watcher: { type: Boolean, default: !1 },
    extendedHeaderTitle: { default: "" },
    showHeader: { type: Boolean, default: !0 }
  },
  setup(e, { expose: t }) {
    const { t: n } = De(), r = e, o = Q(!1), a = Q(null), i = Q(null), l = Q(null), s = (d) => {
      var v;
      o.value = !!(d.isTrusted && d.target && ((v = a.value) != null && v.contains(d.target)));
    }, c = (d) => {
      d.isTrusted && d.code.toLowerCase() === "escape" && f(!1);
    }, u = () => {
      window && setTimeout(() => {
        const d = i.value;
        if (d.style.transform = "translateY(0)", window.innerHeight < d.getBoundingClientRect().bottom) {
          const p = d.getBoundingClientRect().bottom - window.innerHeight + 30;
          d.style.transform = `translateY(-${p}px)`;
        }
      }, 0);
    };
    Le(o, (d) => {
      d ? (window.addEventListener("click", s), window.addEventListener("keydown", c), u()) : (window.removeEventListener("click", s), window.removeEventListener("keydown", c));
    });
    const f = (d = !0) => {
      !r.isEnabled || !r.isActive || setTimeout(() => {
        o.value = typeof d == "boolean" ? d : !o.value;
      }, 0);
    };
    return t({ showOption: f }), (d, v) => (U(), X("div", {
      ref_key: "select",
      ref: a,
      class: be([{
        "th-option-select__wrapper_disabled": !r.isActive,
        "th-option-select__wrapper_calendar": r.isCalendar
      }, "th-option-select__wrapper"])
    }, [
      q("div", {
        class: "th-option-select th-option-select_external",
        onClick: f
      }, [
        q("div", Dw, [
          q("div", Pw, ae(r.title), 1),
          q("div", {
            class: be([{
              "th-option-select__placeholder-value_black": r.titleIsBlack
            }, "th-option-select__placeholder-value"])
          }, ae(r.selectedOptionTitle), 3),
          r.iconIsShown ? (U(), de(Ki, {
            key: 0,
            class: "th-option-select__icon",
            size: "12"
          })) : se("", !0)
        ])
      ]),
      z(ef, { name: "fade" }, {
        default: we(() => [
          Qd(q("div", {
            ref_key: "optionContent",
            ref: i,
            class: be([{
              "th-option-select__content_sticky": r.isSticky
            }, "th-option-select th-option-select__content"])
          }, [
            r.showHeader ? (U(), X("div", {
              key: 0,
              class: "th-option-select__placeholder",
              onClick: f
            }, [
              d.extendedHeaderTitle ? (U(), X(Oe, { key: 0 }, [
                q("div", Aw, ae(d.extendedHeaderTitle), 1),
                r.iconIsShown ? (U(), de(Ki, {
                  key: 0,
                  class: be([{ "th-option-select__icon_shown": o.value }, "th-option-select__icon"]),
                  size: "12"
                }, null, 8, ["class"])) : se("", !0)
              ], 64)) : (U(), X(Oe, { key: 1 }, [
                q("div", $w, ae(d.title), 1),
                q("div", {
                  class: be([{
                    "th-option-select__placeholder-value_black": r.titleIsBlack
                  }, "th-option-select__placeholder-value"])
                }, ae(d.selectedOptionTitle), 3),
                r.iconIsShown ? (U(), de(Ki, {
                  key: 0,
                  class: be([{ "th-option-select__icon_shown": o.value }, "th-option-select__icon"]),
                  size: "12"
                }, null, 8, ["class"])) : se("", !0)
              ], 64))
            ])) : se("", !0),
            q("div", {
              ref_key: "content",
              ref: l,
              class: be([{
                "th-option-select__content-wrapper_no-border": !r.showHeader
              }, "th-option-select__content-wrapper"])
            }, [
              Yn(d.$slots, "default", {}, void 0, !0),
              q("div", {
                class: be([{
                  "th-option-select__footer_extended": r.footerIsExtended
                }, "th-option-select__footer"])
              }, [
                z(ot, {
                  class: "th-option-select__close-btn",
                  plain: "",
                  type: "button",
                  onClick: v[0] || (v[0] = Ye((p) => f(!1), ["stop"]))
                }, {
                  default: we(() => [
                    Ge(ae(W(n)("options.close")), 1)
                  ]),
                  _: 1
                })
              ], 2)
            ], 2)
          ], 2), [
            [xv, o.value]
          ])
        ]),
        _: 3
      })
    ], 2));
  }
}), jt = /* @__PURE__ */ ge(Nw, [["__scopeId", "data-v-8c870be8"]]), Lw = { class: "th-variant-list" }, Rw = ["onClick"], Mw = /* @__PURE__ */ pe({
  __name: "VariantSelector",
  props: {
    variants: {},
    selectedVariant: {}
  },
  emits: ["selectVariant"],
  setup(e, { emit: t }) {
    const { t: n } = De(), r = e, o = t;
    return (a, i) => (U(), de(jt, {
      "selected-option-title": r.selectedVariant.title,
      title: W(n)("options.tickets"),
      "title-is-black": !0
    }, {
      default: we(() => [
        q("div", Lw, [
          (U(!0), X(Oe, null, it(r.variants, (l) => (U(), X("div", {
            key: l.itemId,
            class: be([{
              "th-variant-list__item_active": r.selectedVariant.itemId === l.itemId
            }, "th-variant-list__item"]),
            onClick: (s) => o("selectVariant", l.itemId)
          }, ae(l.title), 11, Rw))), 128))
        ])
      ]),
      _: 1
    }, 8, ["selected-option-title", "title"]));
  }
}), Ou = /* @__PURE__ */ ge(Mw, [["__scopeId", "data-v-78d9bc03"]]);
function Ih(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function Ei(e) {
  return Ih(e) ? new Date(e.getTime()) : e == null ? /* @__PURE__ */ new Date(NaN) : new Date(e);
}
function xw(e) {
  return Ih(e) && !isNaN(e.getTime());
}
function Oh(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  if (!(t >= 0 && t <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6");
  var n = Ei(e), r = n.getDay(), o = (r + 7 - t) % 7;
  return n.setDate(n.getDate() - o), n.setHours(0, 0, 0, 0), n;
}
function Dh(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.firstDayOfWeek, r = n === void 0 ? 0 : n, o = t.firstWeekContainsDate, a = o === void 0 ? 1 : o;
  if (!(a >= 1 && a <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7");
  for (var i = Ei(e), l = i.getFullYear(), s = /* @__PURE__ */ new Date(0), c = l + 1; c >= l - 1 && (s.setFullYear(c, 0, a), s.setHours(0, 0, 0, 0), s = Oh(s, r), !(i.getTime() >= s.getTime())); c--)
    ;
  return s;
}
function Il(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.firstDayOfWeek, r = n === void 0 ? 0 : n, o = t.firstWeekContainsDate, a = o === void 0 ? 1 : o, i = Ei(e), l = Oh(i, r), s = Dh(i, {
    firstDayOfWeek: r,
    firstWeekContainsDate: a
  }), c = l.getTime() - s.getTime();
  return Math.round(c / (7 * 24 * 3600 * 1e3)) + 1;
}
var Ol = {
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  weekdaysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  firstDayOfWeek: 0,
  firstWeekContainsDate: 1
}, Bw = /\[([^\]]+)]|YYYY|YY?|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|Z{1,2}|S{1,3}|w{1,2}|x|X|a|A/g;
function Et(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2, n = "".concat(Math.abs(e)), r = e < 0 ? "-" : ""; n.length < t; )
    n = "0".concat(n);
  return r + n;
}
function Du(e) {
  return Math.round(e.getTimezoneOffset() / 15) * 15;
}
function Pu(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.floor(r / 60), a = r % 60;
  return n + Et(o, 2) + t + Et(a, 2);
}
var Au = function(t, n, r) {
  var o = t < 12 ? "AM" : "PM";
  return r ? o.toLocaleLowerCase() : o;
}, bo = {
  Y: function(t) {
    var n = t.getFullYear();
    return n <= 9999 ? "".concat(n) : "+".concat(n);
  },
  // Year: 00, 01, ..., 99
  YY: function(t) {
    return Et(t.getFullYear(), 4).substr(2);
  },
  // Year: 1900, 1901, ..., 2099
  YYYY: function(t) {
    return Et(t.getFullYear(), 4);
  },
  // Month: 1, 2, ..., 12
  M: function(t) {
    return t.getMonth() + 1;
  },
  // Month: 01, 02, ..., 12
  MM: function(t) {
    return Et(t.getMonth() + 1, 2);
  },
  MMM: function(t, n) {
    return n.monthsShort[t.getMonth()];
  },
  MMMM: function(t, n) {
    return n.months[t.getMonth()];
  },
  // Day of month: 1, 2, ..., 31
  D: function(t) {
    return t.getDate();
  },
  // Day of month: 01, 02, ..., 31
  DD: function(t) {
    return Et(t.getDate(), 2);
  },
  // Hour: 0, 1, ... 23
  H: function(t) {
    return t.getHours();
  },
  // Hour: 00, 01, ..., 23
  HH: function(t) {
    return Et(t.getHours(), 2);
  },
  // Hour: 1, 2, ..., 12
  h: function(t) {
    var n = t.getHours();
    return n === 0 ? 12 : n > 12 ? n % 12 : n;
  },
  // Hour: 01, 02, ..., 12
  hh: function() {
    var t = bo.h.apply(bo, arguments);
    return Et(t, 2);
  },
  // Minute: 0, 1, ..., 59
  m: function(t) {
    return t.getMinutes();
  },
  // Minute: 00, 01, ..., 59
  mm: function(t) {
    return Et(t.getMinutes(), 2);
  },
  // Second: 0, 1, ..., 59
  s: function(t) {
    return t.getSeconds();
  },
  // Second: 00, 01, ..., 59
  ss: function(t) {
    return Et(t.getSeconds(), 2);
  },
  // 1/10 of second: 0, 1, ..., 9
  S: function(t) {
    return Math.floor(t.getMilliseconds() / 100);
  },
  // 1/100 of second: 00, 01, ..., 99
  SS: function(t) {
    return Et(Math.floor(t.getMilliseconds() / 10), 2);
  },
  // Millisecond: 000, 001, ..., 999
  SSS: function(t) {
    return Et(t.getMilliseconds(), 3);
  },
  // Day of week: 0, 1, ..., 6
  d: function(t) {
    return t.getDay();
  },
  // Day of week: 'Su', 'Mo', ..., 'Sa'
  dd: function(t, n) {
    return n.weekdaysMin[t.getDay()];
  },
  // Day of week: 'Sun', 'Mon',..., 'Sat'
  ddd: function(t, n) {
    return n.weekdaysShort[t.getDay()];
  },
  // Day of week: 'Sunday', 'Monday', ...,'Saturday'
  dddd: function(t, n) {
    return n.weekdays[t.getDay()];
  },
  // AM, PM
  A: function(t, n) {
    var r = n.meridiem || Au;
    return r(t.getHours(), t.getMinutes(), !1);
  },
  // am, pm
  a: function(t, n) {
    var r = n.meridiem || Au;
    return r(t.getHours(), t.getMinutes(), !0);
  },
  // Timezone: -01:00, +00:00, ... +12:00
  Z: function(t) {
    return Pu(Du(t), ":");
  },
  // Timezone: -0100, +0000, ... +1200
  ZZ: function(t) {
    return Pu(Du(t));
  },
  // Seconds timestamp: 512969520
  X: function(t) {
    return Math.floor(t.getTime() / 1e3);
  },
  // Milliseconds timestamp: 512969520900
  x: function(t) {
    return t.getTime();
  },
  w: function(t, n) {
    return Il(t, {
      firstDayOfWeek: n.firstDayOfWeek,
      firstWeekContainsDate: n.firstWeekContainsDate
    });
  },
  ww: function(t, n) {
    return Et(bo.w(t, n), 2);
  }
};
function Dl(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = t ? String(t) : "YYYY-MM-DDTHH:mm:ss.SSSZ", o = Ei(e);
  if (!xw(o))
    return "Invalid Date";
  var a = n.locale || Ol;
  return r.replace(Bw, function(i, l) {
    return l || (typeof bo[i] == "function" ? "".concat(bo[i](o, a)) : i);
  });
}
function $u(e) {
  return Fw(e) || Uw(e) || Vw();
}
function Vw() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function Uw(e) {
  if (Symbol.iterator in Object(e) || Object.prototype.toString.call(e) === "[object Arguments]")
    return Array.from(e);
}
function Fw(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = new Array(e.length); t < e.length; t++)
      n[t] = e[t];
    return n;
  }
}
function Nu(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Hw(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Nu(n, !0).forEach(function(r) {
      qn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Nu(n).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Yw(e, t) {
  return qw(e) || Ww(e, t) || jw();
}
function jw() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function Ww(e, t) {
  if (Symbol.iterator in Object(e) || Object.prototype.toString.call(e) === "[object Arguments]") {
    var n = [], r = !0, o = !1, a = void 0;
    try {
      for (var i = e[Symbol.iterator](), l; !(r = (l = i.next()).done) && (n.push(l.value), !(t && n.length === t)); r = !0)
        ;
    } catch (s) {
      o = !0, a = s;
    } finally {
      try {
        !r && i.return != null && i.return();
      } finally {
        if (o)
          throw a;
      }
    }
    return n;
  }
}
function qw(e) {
  if (Array.isArray(e))
    return e;
}
function qn(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var zw = /(\[[^\[]*\])|(MM?M?M?|Do|DD?|ddd?d?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|S{1,3}|x|X|ZZ?|.)/g, Ph = /\d/, zn = /\d\d/, Gw = /\d{3}/, Xw = /\d{4}/, to = /\d\d?/, Kw = /[+-]\d\d:?\d\d/, Ah = /[+-]?\d+/, Jw = /[+-]?\d+(\.\d{1,3})?/, Pl = "year", wi = "month", $h = "day", Nh = "hour", Lh = "minute", Rh = "second", Al = "millisecond", Mh = {}, Pe = function(t, n, r) {
  var o = Array.isArray(t) ? t : [t], a;
  typeof r == "string" ? a = function(l) {
    var s = parseInt(l, 10);
    return qn({}, r, s);
  } : a = r, o.forEach(function(i) {
    Mh[i] = [n, a];
  });
}, Zw = function(t) {
  return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}, Ko = function(t) {
  return function(n) {
    var r = n[t];
    if (!Array.isArray(r))
      throw new Error("Locale[".concat(t, "] need an array"));
    return new RegExp(r.map(Zw).join("|"));
  };
}, Jo = function(t, n) {
  return function(r, o) {
    var a = o[t];
    if (!Array.isArray(a))
      throw new Error("Locale[".concat(t, "] need an array"));
    var i = a.indexOf(r);
    if (i < 0)
      throw new Error("Invalid Word");
    return qn({}, n, i);
  };
};
Pe("Y", Ah, Pl);
Pe("YY", zn, function(e) {
  var t = (/* @__PURE__ */ new Date()).getFullYear(), n = Math.floor(t / 100), r = parseInt(e, 10);
  return r = (r > 68 ? n - 1 : n) * 100 + r, qn({}, Pl, r);
});
Pe("YYYY", Xw, Pl);
Pe("M", to, function(e) {
  return qn({}, wi, parseInt(e, 10) - 1);
});
Pe("MM", zn, function(e) {
  return qn({}, wi, parseInt(e, 10) - 1);
});
Pe("MMM", Ko("monthsShort"), Jo("monthsShort", wi));
Pe("MMMM", Ko("months"), Jo("months", wi));
Pe("D", to, $h);
Pe("DD", zn, $h);
Pe(["H", "h"], to, Nh);
Pe(["HH", "hh"], zn, Nh);
Pe("m", to, Lh);
Pe("mm", zn, Lh);
Pe("s", to, Rh);
Pe("ss", zn, Rh);
Pe("S", Ph, function(e) {
  return qn({}, Al, parseInt(e, 10) * 100);
});
Pe("SS", zn, function(e) {
  return qn({}, Al, parseInt(e, 10) * 10);
});
Pe("SSS", Gw, Al);
function Qw(e) {
  return e.meridiemParse || /[ap]\.?m?\.?/i;
}
function eC(e) {
  return "".concat(e).toLowerCase().charAt(0) === "p";
}
Pe(["A", "a"], Qw, function(e, t) {
  var n = typeof t.isPM == "function" ? t.isPM(e) : eC(e);
  return {
    isPM: n
  };
});
function tC(e) {
  var t = e.match(/([+-]|\d\d)/g) || ["-", "0", "0"], n = Yw(t, 3), r = n[0], o = n[1], a = n[2], i = parseInt(o, 10) * 60 + parseInt(a, 10);
  return i === 0 ? 0 : r === "+" ? -i : +i;
}
Pe(["Z", "ZZ"], Kw, function(e) {
  return {
    offset: tC(e)
  };
});
Pe("x", Ah, function(e) {
  return {
    date: new Date(parseInt(e, 10))
  };
});
Pe("X", Jw, function(e) {
  return {
    date: new Date(parseFloat(e) * 1e3)
  };
});
Pe("d", Ph, "weekday");
Pe("dd", Ko("weekdaysMin"), Jo("weekdaysMin", "weekday"));
Pe("ddd", Ko("weekdaysShort"), Jo("weekdaysShort", "weekday"));
Pe("dddd", Ko("weekdays"), Jo("weekdays", "weekday"));
Pe("w", to, "week");
Pe("ww", zn, "week");
function nC(e, t) {
  if (e !== void 0 && t !== void 0) {
    if (t) {
      if (e < 12)
        return e + 12;
    } else if (e === 12)
      return 0;
  }
  return e;
}
function rC(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Date(), n = [0, 0, 1, 0, 0, 0, 0], r = [t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()], o = !0, a = 0; a < 7; a++)
    e[a] === void 0 ? n[a] = o ? r[a] : n[a] : (n[a] = e[a], o = !1);
  return n;
}
function oC(e, t, n, r, o, a, i) {
  var l;
  return e < 100 && e >= 0 ? (l = new Date(e + 400, t, n, r, o, a, i), isFinite(l.getFullYear()) && l.setFullYear(e)) : l = new Date(e, t, n, r, o, a, i), l;
}
function aC() {
  for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++)
    n[r] = arguments[r];
  var o = n[0];
  return o < 100 && o >= 0 ? (n[0] += 400, e = new Date(Date.UTC.apply(Date, n)), isFinite(e.getUTCFullYear()) && e.setUTCFullYear(o)) : e = new Date(Date.UTC.apply(Date, n)), e;
}
function iC(e, t, n) {
  var r = t.match(zw);
  if (!r)
    throw new Error();
  for (var o = r.length, a = {}, i = 0; i < o; i += 1) {
    var l = r[i], s = Mh[l];
    if (s) {
      var u = typeof s[0] == "function" ? s[0](n) : s[0], f = s[1], d = (u.exec(e) || [])[0], v = f(d, n);
      a = Hw({}, a, {}, v), e = e.replace(d, "");
    } else {
      var c = l.replace(/^\[|\]$/g, "");
      if (e.indexOf(c) === 0)
        e = e.substr(c.length);
      else
        throw new Error("not match");
    }
  }
  return a;
}
function sC(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  try {
    var r = n.locale, o = r === void 0 ? Ol : r, a = n.backupDate, i = a === void 0 ? /* @__PURE__ */ new Date() : a, l = iC(e, t, o), s = l.year, c = l.month, u = l.day, f = l.hour, d = l.minute, v = l.second, p = l.millisecond, g = l.isPM, m = l.date, h = l.offset, y = l.weekday, w = l.week;
    if (m)
      return m;
    var O = [s, c, u, f, d, v, p];
    if (O[3] = nC(O[3], g), w !== void 0 && c === void 0 && u === void 0) {
      var $ = Dh(s === void 0 ? i : new Date(s, 3), {
        firstDayOfWeek: o.firstDayOfWeek,
        firstWeekContainsDate: o.firstWeekContainsDate
      });
      return new Date($.getTime() + (w - 1) * 7 * 24 * 3600 * 1e3);
    }
    var C, b = rC(O, i);
    return h !== void 0 ? (b[6] += h * 60 * 1e3, C = aC.apply(void 0, $u(b))) : C = oC.apply(void 0, $u(b)), y !== void 0 && C.getDay() !== y ? /* @__PURE__ */ new Date(NaN) : C;
  } catch {
    return /* @__PURE__ */ new Date(NaN);
  }
}
var lC = Object.defineProperty, cC = Object.defineProperties, uC = Object.getOwnPropertyDescriptors, Xa = Object.getOwnPropertySymbols, xh = Object.prototype.hasOwnProperty, Bh = Object.prototype.propertyIsEnumerable, Lu = (e, t, n) => t in e ? lC(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, nt = (e, t) => {
  for (var n in t || (t = {}))
    xh.call(t, n) && Lu(e, n, t[n]);
  if (Xa)
    for (var n of Xa(t))
      Bh.call(t, n) && Lu(e, n, t[n]);
  return e;
}, $t = (e, t) => cC(e, uC(t)), dC = (e, t) => {
  var n = {};
  for (var r in e)
    xh.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && Xa)
    for (var r of Xa(e))
      t.indexOf(r) < 0 && Bh.call(e, r) && (n[r] = e[r]);
  return n;
};
const fC = {
  formatLocale: Ol,
  yearFormat: "YYYY",
  monthFormat: "MMM",
  monthBeforeYear: !0
};
let mo = "en";
const Dr = {};
Dr[mo] = fC;
function Vh(e, t, n = !1) {
  if (typeof e != "string")
    return Dr[mo];
  let r = mo;
  return Dr[e] && (r = e), t && (Dr[e] = t, r = e), n || (mo = r), Dr[e] || Dr[mo];
}
function Ys(e) {
  return Vh(e, void 0, !0);
}
function $l(e, t) {
  if (!Array.isArray(e))
    return [];
  const n = [], r = e.length;
  let o = 0;
  for (t = t || r; o < r; )
    n.push(e.slice(o, o += t));
  return n;
}
function Ru(e) {
  return Array.isArray(e) ? e[e.length - 1] : void 0;
}
function In(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function dn(e, t) {
  const n = {};
  return In(e) && (Array.isArray(t) || (t = [t]), t.forEach((r) => {
    Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
  })), n;
}
function Uh(e, t) {
  if (!In(e))
    return {};
  let n = e;
  return In(t) && Object.keys(t).forEach((r) => {
    let o = t[r];
    const a = e[r];
    In(o) && In(a) && (o = Uh(a, o)), n = $t(nt({}, n), { [r]: o });
  }), n;
}
function Ji(e) {
  const t = parseInt(String(e), 10);
  return t < 10 ? `0${t}` : `${t}`;
}
function pC(e) {
  const t = /-(\w)/g;
  return e.replace(t, (n, r) => r ? r.toUpperCase() : "");
}
const Fh = "datepicker_locale", Hh = "datepicker_prefixClass", Yh = "datepicker_getWeek";
function Nl() {
  return _t(Fh, cl(Ys()));
}
function hC(e) {
  const t = te(() => In(e.value) ? Uh(Ys(), e.value) : Ys(e.value));
  return An(Fh, t), t;
}
function mC(e) {
  An(Hh, e);
}
function ht() {
  return _t(Hh, "mx");
}
function vC(e) {
  An(Yh, e);
}
function gC() {
  return _t(Yh, Il);
}
function yC(e) {
  const t = e.style.display, n = e.style.visibility;
  e.style.display = "block", e.style.visibility = "hidden";
  const r = window.getComputedStyle(e), o = e.offsetWidth + parseInt(r.marginLeft, 10) + parseInt(r.marginRight, 10), a = e.offsetHeight + parseInt(r.marginTop, 10) + parseInt(r.marginBottom, 10);
  return e.style.display = t, e.style.visibility = n, { width: o, height: a };
}
function _C(e, t, n, r) {
  let o = 0, a = 0, i = 0, l = 0;
  const s = e.getBoundingClientRect(), c = document.documentElement.clientWidth, u = document.documentElement.clientHeight;
  return r && (i = window.pageXOffset + s.left, l = window.pageYOffset + s.top), c - s.left < t && s.right < t ? o = i - s.left + 1 : s.left + s.width / 2 <= c / 2 ? o = i : o = i + s.width - t, s.top <= n && u - s.bottom <= n ? a = l + u - s.top - n : s.top + s.height / 2 <= u / 2 ? a = l + s.height : a = l - n, { left: `${o}px`, top: `${a}px` };
}
function Ll(e, t = document.body) {
  if (!e || e === t)
    return null;
  const n = (a, i) => getComputedStyle(a, null).getPropertyValue(i);
  return /(auto|scroll)/.test(n(e, "overflow") + n(e, "overflow-y") + n(e, "overflow-x")) ? e : Ll(e.parentElement, t);
}
let _a;
function bC() {
  if (typeof window > "u")
    return 0;
  if (_a !== void 0)
    return _a;
  const e = document.createElement("div");
  e.style.visibility = "hidden", e.style.overflow = "scroll", e.style.width = "100px", e.style.position = "absolute", e.style.top = "-9999px", document.body.appendChild(e);
  const t = document.createElement("div");
  return t.style.width = "100%", e.appendChild(t), _a = e.offsetWidth - t.offsetWidth, e.parentNode.removeChild(e), _a;
}
const Mu = "ontouchend" in document ? "touchstart" : "mousedown";
function EC(e) {
  let t = !1;
  return function(...r) {
    t || (t = !0, requestAnimationFrame(() => {
      t = !1, e.apply(this, r);
    }));
  };
}
function gn(e, t) {
  return { setup: e, name: e.name, props: t };
}
function yn(e, t) {
  return new Proxy(e, {
    get(r, o) {
      const a = r[o];
      return a !== void 0 ? a : t[o];
    }
  });
}
const Gn = () => (e) => e, wC = (e, t) => {
  const n = {};
  for (const r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      const o = pC(r);
      let a = e[r];
      t.indexOf(o) !== -1 && a === "" && (a = !0), n[o] = a;
    }
  return n;
};
function CC(e, {
  slots: t
}) {
  const n = yn(e, {
    appendToBody: !0
  }), r = ht(), o = Q(null), a = Q({
    left: "",
    top: ""
  }), i = () => {
    if (!n.visible || !o.value)
      return;
    const s = n.getRelativeElement();
    if (!s)
      return;
    const {
      width: c,
      height: u
    } = yC(o.value);
    a.value = _C(s, c, u, n.appendToBody);
  };
  Ct(i, {
    flush: "post"
  }), Ct((s) => {
    const c = n.getRelativeElement();
    if (!c)
      return;
    const u = Ll(c) || window, f = EC(i);
    u.addEventListener("scroll", f), window.addEventListener("resize", f), s(() => {
      u.removeEventListener("scroll", f), window.removeEventListener("resize", f);
    });
  }, {
    flush: "post"
  });
  const l = (s) => {
    if (!n.visible)
      return;
    const c = s.target, u = o.value, f = n.getRelativeElement();
    u && !u.contains(c) && f && !f.contains(c) && n.onClickOutside(s);
  };
  return Ct((s) => {
    document.addEventListener(Mu, l), s(() => {
      document.removeEventListener(Mu, l);
    });
  }), () => z(Bv, {
    to: "body",
    disabled: !n.appendToBody
  }, {
    default: () => [z(ef, {
      name: `${r}-zoom-in-down`
    }, {
      default: () => {
        var s;
        return [n.visible && z("div", {
          ref: o,
          class: `${r}-datepicker-main ${r}-datepicker-popup ${n.className}`,
          style: [nt({
            position: "absolute"
          }, a.value), n.style || {}]
        }, [(s = t.default) == null ? void 0 : s.call(t)])];
      }
    })]
  });
}
const TC = Gn()(["style", "className", "visible", "appendToBody", "onClickOutside", "getRelativeElement"]);
var SC = gn(CC, TC);
const kC = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024",
  width: "1em",
  height: "1em"
}, IC = /* @__PURE__ */ q("path", { d: "M940.218 107.055H730.764v-60.51H665.6v60.51H363.055v-60.51H297.89v60.51H83.78c-18.617 0-32.581 13.963-32.581 32.581v805.237c0 18.618 13.964 32.582 32.582 32.582h861.09c18.619 0 32.583-13.964 32.583-32.582V139.636c-4.655-18.618-18.619-32.581-37.237-32.581zm-642.327 65.163v60.51h65.164v-60.51h307.2v60.51h65.163v-60.51h176.873v204.8H116.364v-204.8H297.89zM116.364 912.291V442.18H912.29v470.11H116.364z" }, null, -1), OC = [
  IC
];
function jh(e, t) {
  return U(), X("svg", kC, OC);
}
const DC = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024",
  width: "1em",
  height: "1em"
}, PC = /* @__PURE__ */ q("path", { d: "M810.005 274.005 572.011 512l237.994 237.995-60.01 60.01L512 572.011 274.005 810.005l-60.01-60.01L451.989 512 213.995 274.005l60.01-60.01L512 451.989l237.995-237.994z" }, null, -1), AC = [
  PC
];
function $C(e, t) {
  return U(), X("svg", DC, AC);
}
const NC = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
}, LC = /* @__PURE__ */ q("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1), RC = /* @__PURE__ */ q("path", { d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" }, null, -1), MC = /* @__PURE__ */ q("path", { d: "M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" }, null, -1), xC = [
  LC,
  RC,
  MC
];
function BC(e, t) {
  return U(), X("svg", NC, xC);
}
function or(e, t = 0, n = 1, r = 0, o = 0, a = 0, i = 0) {
  const l = new Date(e, t, n, r, o, a, i);
  return e < 100 && e >= 0 && l.setFullYear(e), l;
}
function pn(e) {
  return e instanceof Date && !isNaN(e.getTime());
}
function ar(e) {
  return Array.isArray(e) && e.length === 2 && e.every(pn) && e[0] <= e[1];
}
function VC(e) {
  return Array.isArray(e) && e.every(pn);
}
function Ci(...e) {
  if (e[0] !== void 0 && e[0] !== null) {
    const n = new Date(e[0]);
    if (pn(n))
      return n;
  }
  const t = e.slice(1);
  return t.length ? Ci(...t) : /* @__PURE__ */ new Date();
}
function UC(e) {
  const t = new Date(e);
  return t.setMonth(0, 1), t.setHours(0, 0, 0, 0), t;
}
function xu(e) {
  const t = new Date(e);
  return t.setDate(1), t.setHours(0, 0, 0, 0), t;
}
function Bn(e) {
  const t = new Date(e);
  return t.setHours(0, 0, 0, 0), t;
}
function FC({
  firstDayOfWeek: e,
  year: t,
  month: n
}) {
  const r = [], o = or(t, n, 0), a = o.getDate(), i = a - (o.getDay() + 7 - e) % 7;
  for (let u = i; u <= a; u++)
    r.push(or(t, n, u - a));
  o.setMonth(n + 1, 0);
  const l = o.getDate();
  for (let u = 1; u <= l; u++)
    r.push(or(t, n, u));
  const s = a - i + 1, c = 6 * 7 - s - l;
  for (let u = 1; u <= c; u++)
    r.push(or(t, n, l + u));
  return r;
}
function Ka(e, t) {
  const n = new Date(e), r = typeof t == "function" ? t(n.getMonth()) : Number(t), o = n.getFullYear(), a = or(o, r + 1, 0).getDate(), i = n.getDate();
  return n.setMonth(r, Math.min(i, a)), n;
}
function Rr(e, t) {
  const n = new Date(e), r = typeof t == "function" ? t(n.getFullYear()) : t;
  return n.setFullYear(r), n;
}
function HC(e, t) {
  const n = new Date(t), r = new Date(e), o = n.getFullYear() - r.getFullYear(), a = n.getMonth() - r.getMonth();
  return o * 12 + a;
}
function Ja(e, t) {
  const n = new Date(e), r = new Date(t);
  return n.setHours(r.getHours(), r.getMinutes(), r.getSeconds()), n;
}
function YC(e, {
  slots: t
}) {
  const n = yn(e, {
    editable: !0,
    disabled: !1,
    clearable: !0,
    range: !1,
    multiple: !1
  }), r = ht(), o = Q(null), a = te(() => n.separator || (n.range ? " ~ " : ",")), i = (v) => n.range ? ar(v) : n.multiple ? VC(v) : pn(v), l = (v) => Array.isArray(v) ? v.some((p) => n.disabledDate(p)) : n.disabledDate(v), s = te(() => o.value !== null ? o.value : typeof n.renderInputText == "function" ? n.renderInputText(n.value) : i(n.value) ? Array.isArray(n.value) ? n.value.map((v) => n.formatDate(v)).join(a.value) : n.formatDate(n.value) : ""), c = (v) => {
    var p;
    v && v.stopPropagation(), n.onChange(n.range ? [null, null] : null), (p = n.onClear) == null || p.call(n);
  }, u = () => {
    var v;
    if (!n.editable || o.value === null)
      return;
    const p = o.value.trim();
    if (o.value = null, p === "") {
      c();
      return;
    }
    let g;
    if (n.range) {
      let m = p.split(a.value);
      m.length !== 2 && (m = p.split(a.value.trim())), g = m.map((h) => n.parseDate(h.trim()));
    } else
      n.multiple ? g = p.split(a.value).map((m) => n.parseDate(m.trim())) : g = n.parseDate(p);
    i(g) && !l(g) ? n.onChange(g) : (v = n.onInputError) == null || v.call(n, p);
  }, f = (v) => {
    o.value = typeof v == "string" ? v : v.target.value;
  }, d = (v) => {
    const {
      keyCode: p
    } = v;
    p === 9 ? n.onBlur() : p === 13 && u();
  };
  return () => {
    var v, p, g;
    const m = !n.disabled && n.clearable && s.value, h = $t(nt({
      name: "date",
      type: "text",
      autocomplete: "off",
      value: s.value,
      class: n.inputClass || `${r}-input`,
      readonly: !n.editable,
      disabled: n.disabled,
      placeholder: n.placeholder
    }, n.inputAttr), {
      onFocus: n.onFocus,
      onKeydown: d,
      onInput: f,
      onChange: u
    });
    return z("div", {
      class: `${r}-input-wrapper`,
      onClick: n.onClick
    }, [((v = t.input) == null ? void 0 : v.call(t, h)) || z("input", h, null), m ? z("i", {
      class: `${r}-icon-clear`,
      onClick: c
    }, [((p = t["icon-clear"]) == null ? void 0 : p.call(t)) || z($C, null, null)]) : null, z("i", {
      class: `${r}-icon-calendar`
    }, [((g = t["icon-calendar"]) == null ? void 0 : g.call(t)) || z(jh, null, null)])]);
  };
}
const Rl = Gn()(["placeholder", "editable", "disabled", "clearable", "inputClass", "inputAttr", "range", "multiple", "separator", "renderInputText", "onInputError", "onClear"]), jC = Gn()(["value", "formatDate", "parseDate", "disabledDate", "onChange", "onFocus", "onBlur", "onClick", ...Rl]);
var WC = gn(YC, jC);
function qC(e, {
  slots: t
}) {
  var n;
  const r = yn(e, {
    prefixClass: "mx",
    valueType: "date",
    format: "YYYY-MM-DD",
    type: "date",
    disabledDate: () => !1,
    disabledTime: () => !1,
    confirmText: "OK"
  });
  mC(r.prefixClass), vC(((n = r.formatter) == null ? void 0 : n.getWeek) || Il);
  const o = hC(vo(e, "lang")), a = Q(), i = () => a.value, l = Q(!1), s = te(() => !r.disabled && (typeof r.open == "boolean" ? r.open : l.value)), c = () => {
    var C, b;
    r.disabled || s.value || (l.value = !0, (C = r["onUpdate:open"]) == null || C.call(r, !0), (b = r.onOpen) == null || b.call(r));
  }, u = () => {
    var C, b;
    s.value && (l.value = !1, (C = r["onUpdate:open"]) == null || C.call(r, !1), (b = r.onClose) == null || b.call(r));
  }, f = (C, b) => (b = b || r.format, In(r.formatter) && typeof r.formatter.stringify == "function" ? r.formatter.stringify(C, b) : Dl(C, b, {
    locale: o.value.formatLocale
  })), d = (C, b) => {
    if (b = b || r.format, In(r.formatter) && typeof r.formatter.parse == "function")
      return r.formatter.parse(C, b);
    const E = /* @__PURE__ */ new Date();
    return sC(C, b, {
      locale: o.value.formatLocale,
      backupDate: E
    });
  }, v = (C) => {
    switch (r.valueType) {
      case "date":
        return C instanceof Date ? new Date(C.getTime()) : /* @__PURE__ */ new Date(NaN);
      case "timestamp":
        return typeof C == "number" ? new Date(C) : /* @__PURE__ */ new Date(NaN);
      case "format":
        return typeof C == "string" ? d(C) : /* @__PURE__ */ new Date(NaN);
      default:
        return typeof C == "string" ? d(C, r.valueType) : /* @__PURE__ */ new Date(NaN);
    }
  }, p = (C) => {
    if (!pn(C))
      return null;
    switch (r.valueType) {
      case "date":
        return C;
      case "timestamp":
        return C.getTime();
      case "format":
        return f(C);
      default:
        return f(C, r.valueType);
    }
  }, g = te(() => {
    const C = r.value;
    return r.range ? (Array.isArray(C) ? C.slice(0, 2) : [null, null]).map(v) : r.multiple ? (Array.isArray(C) ? C : []).map(v) : v(C);
  }), m = (C, b, E = !0) => {
    var k, _;
    const S = Array.isArray(C) ? C.map(p) : p(C);
    return (k = r["onUpdate:value"]) == null || k.call(r, S), (_ = r.onChange) == null || _.call(r, S, b), E && u(), S;
  }, h = Q(/* @__PURE__ */ new Date());
  Ct(() => {
    s.value && (h.value = g.value);
  });
  const y = (C, b) => {
    r.confirm ? h.value = C : m(C, b, !r.multiple && (b === r.type || b === "time"));
  }, w = () => {
    var C;
    const b = m(h.value);
    (C = r.onConfirm) == null || C.call(r, b);
  }, O = (C) => r.disabledDate(C) || r.disabledTime(C), $ = (C) => {
    var b;
    const {
      prefixClass: E
    } = r;
    return z("div", {
      class: `${E}-datepicker-sidebar`
    }, [(b = t.sidebar) == null ? void 0 : b.call(t, C), (r.shortcuts || []).map((k, _) => z("button", {
      key: _,
      "data-index": _,
      type: "button",
      class: `${E}-btn ${E}-btn-text ${E}-btn-shortcut`,
      onClick: () => {
        var S;
        const A = (S = k.onClick) == null ? void 0 : S.call(k);
        A && m(A);
      }
    }, [k.text]))]);
  };
  return () => {
    var C, b;
    const {
      prefixClass: E,
      disabled: k,
      confirm: _,
      range: S,
      popupClass: A,
      popupStyle: x,
      appendToBody: B
    } = r, N = {
      value: h.value,
      "onUpdate:value": y,
      emit: m
    }, V = t.header && z("div", {
      class: `${E}-datepicker-header`
    }, [t.header(N)]), G = (t.footer || _) && z("div", {
      class: `${E}-datepicker-footer`
    }, [(C = t.footer) == null ? void 0 : C.call(t, N), _ && z("button", {
      type: "button",
      class: `${E}-btn ${E}-datepicker-btn-confirm`,
      onClick: w
    }, [r.confirmText])]), L = (b = t.content) == null ? void 0 : b.call(t, N), F = (t.sidebar || r.shortcuts) && $(N);
    return z("div", {
      ref: a,
      class: {
        [`${E}-datepicker`]: !0,
        [`${E}-datepicker-range`]: S,
        disabled: k
      }
    }, [z(WC, $t(nt({}, dn(r, Rl)), {
      value: g.value,
      formatDate: f,
      parseDate: d,
      disabledDate: O,
      onChange: m,
      onClick: c,
      onFocus: c,
      onBlur: u
    }), dn(t, ["icon-calendar", "icon-clear", "input"])), z(SC, {
      className: A,
      style: x,
      visible: s.value,
      appendToBody: B,
      getRelativeElement: i,
      onClickOutside: u
    }, {
      default: () => [F, z("div", {
        class: `${E}-datepicker-content`
      }, [V, L, G])]
    })]);
  };
}
const zC = Gn()(["value", "valueType", "type", "format", "formatter", "lang", "prefixClass", "appendToBody", "open", "popupClass", "popupStyle", "confirm", "confirmText", "shortcuts", "disabledDate", "disabledTime", "onOpen", "onClose", "onConfirm", "onChange", "onUpdate:open", "onUpdate:value"]), GC = [...zC, ...Rl];
var Bu = gn(qC, GC);
function ba(e) {
  var t = e, {
    value: n
  } = t, r = dC(t, [
    "value"
  ]);
  const o = ht();
  return z("button", $t(nt({}, r), {
    type: "button",
    class: `${o}-btn ${o}-btn-text ${o}-btn-icon-${n}`
  }), [z("i", {
    class: `${o}-icon-${n}`
  }, null)]);
}
function Ml({
  type: e,
  calendar: t,
  onUpdateCalendar: n
}, {
  slots: r
}) {
  var o;
  const a = ht(), i = () => {
    n(Ka(t, (d) => d - 1));
  }, l = () => {
    n(Ka(t, (d) => d + 1));
  }, s = () => {
    n(Rr(t, (d) => d - 1));
  }, c = () => {
    n(Rr(t, (d) => d + 1));
  }, u = () => {
    n(Rr(t, (d) => d - 10));
  }, f = () => {
    n(Rr(t, (d) => d + 10));
  };
  return z("div", {
    class: `${a}-calendar-header`
  }, [z(ba, {
    value: "double-left",
    onClick: e === "year" ? u : s
  }, null), e === "date" && z(ba, {
    value: "left",
    onClick: i
  }, null), z(ba, {
    value: "double-right",
    onClick: e === "year" ? f : c
  }, null), e === "date" && z(ba, {
    value: "right",
    onClick: l
  }, null), z("span", {
    class: `${a}-calendar-header-label`
  }, [(o = r.default) == null ? void 0 : o.call(r)])]);
}
function XC({
  calendar: e,
  isWeekMode: t,
  showWeekNumber: n,
  titleFormat: r,
  getWeekActive: o,
  getCellClasses: a,
  onSelect: i,
  onUpdatePanel: l,
  onUpdateCalendar: s,
  onDateMouseEnter: c,
  onDateMouseLeave: u
}) {
  const f = ht(), d = gC(), v = Nl().value, {
    yearFormat: p,
    monthBeforeYear: g,
    monthFormat: m = "MMM",
    formatLocale: h
  } = v, y = h.firstDayOfWeek || 0;
  let w = v.days || h.weekdaysMin;
  w = w.concat(w).slice(y, y + 7);
  const O = e.getFullYear(), $ = e.getMonth(), C = $l(FC({
    firstDayOfWeek: y,
    year: O,
    month: $
  }), 7), b = (N, V) => Dl(N, V, {
    locale: v.formatLocale
  }), E = (N) => {
    l(N);
  }, k = (N) => {
    const V = N.getAttribute("data-index"), [G, L] = V.split(",").map((M) => parseInt(M, 10)), F = C[G][L];
    return new Date(F);
  }, _ = (N) => {
    i(k(N.currentTarget));
  }, S = (N) => {
    c && c(k(N.currentTarget));
  }, A = (N) => {
    u && u(k(N.currentTarget));
  }, x = z("button", {
    type: "button",
    class: `${f}-btn ${f}-btn-text ${f}-btn-current-year`,
    onClick: () => E("year")
  }, [b(e, p)]), B = z("button", {
    type: "button",
    class: `${f}-btn ${f}-btn-text ${f}-btn-current-month`,
    onClick: () => E("month")
  }, [b(e, m)]);
  return n = typeof n == "boolean" ? n : t, z("div", {
    class: [`${f}-calendar ${f}-calendar-panel-date`, {
      [`${f}-calendar-week-mode`]: t
    }]
  }, [z(Ml, {
    type: "date",
    calendar: e,
    onUpdateCalendar: s
  }, {
    default: () => [g ? [B, x] : [x, B]]
  }), z("div", {
    class: `${f}-calendar-content`
  }, [z("table", {
    class: `${f}-table ${f}-table-date`
  }, [z("thead", null, [z("tr", null, [n && z("th", {
    class: `${f}-week-number-header`
  }, null), w.map((N) => z("th", {
    key: N
  }, [N]))])]), z("tbody", null, [C.map((N, V) => z("tr", {
    key: V,
    class: [`${f}-date-row`, {
      [`${f}-active-week`]: o(N)
    }]
  }, [n && z("td", {
    class: `${f}-week-number`,
    "data-index": `${V},0`,
    onClick: _
  }, [z("div", null, [d(N[0])])]), N.map((G, L) => z("td", {
    key: L,
    class: ["cell", a(G)],
    title: b(G, r),
    "data-index": `${V},${L}`,
    onClick: _,
    onMouseenter: S,
    onMouseleave: A
  }, [z("div", null, [G.getDate()])]))]))])])])]);
}
function KC({
  calendar: e,
  getCellClasses: t,
  onSelect: n,
  onUpdateCalendar: r,
  onUpdatePanel: o
}) {
  const a = ht(), i = Nl().value, l = i.months || i.formatLocale.monthsShort, s = (u) => or(e.getFullYear(), u), c = (u) => {
    const d = u.currentTarget.getAttribute("data-month");
    n(s(parseInt(d, 10)));
  };
  return z("div", {
    class: `${a}-calendar ${a}-calendar-panel-month`
  }, [z(Ml, {
    type: "month",
    calendar: e,
    onUpdateCalendar: r
  }, {
    default: () => [z("button", {
      type: "button",
      class: `${a}-btn ${a}-btn-text ${a}-btn-current-year`,
      onClick: () => o("year")
    }, [e.getFullYear()])]
  }), z("div", {
    class: `${a}-calendar-content`
  }, [z("table", {
    class: `${a}-table ${a}-table-month`
  }, [$l(l, 3).map((u, f) => z("tr", {
    key: f
  }, [u.map((d, v) => {
    const p = f * 3 + v;
    return z("td", {
      key: v,
      class: ["cell", t(s(p))],
      "data-month": p,
      onClick: c
    }, [z("div", null, [d])]);
  })]))])])]);
}
const JC = (e) => {
  const t = Math.floor(e.getFullYear() / 10) * 10, n = [];
  for (let r = 0; r < 10; r++)
    n.push(t + r);
  return $l(n, 2);
};
function ZC({
  calendar: e,
  getCellClasses: t = () => [],
  getYearPanel: n = JC,
  onSelect: r,
  onUpdateCalendar: o
}) {
  const a = ht(), i = (f) => or(f, 0), l = (f) => {
    const v = f.currentTarget.getAttribute("data-year");
    r(i(parseInt(v, 10)));
  }, s = n(new Date(e)), c = s[0][0], u = Ru(Ru(s));
  return z("div", {
    class: `${a}-calendar ${a}-calendar-panel-year`
  }, [z(Ml, {
    type: "year",
    calendar: e,
    onUpdateCalendar: o
  }, {
    default: () => [z("span", null, [c]), z("span", {
      class: `${a}-calendar-decade-separator`
    }, null), z("span", null, [u])]
  }), z("div", {
    class: `${a}-calendar-content`
  }, [z("table", {
    class: `${a}-table ${a}-table-year`
  }, [s.map((f, d) => z("tr", {
    key: d
  }, [f.map((v, p) => z("td", {
    key: p,
    class: ["cell", t(i(v))],
    "data-year": v,
    onClick: l
  }, [z("div", null, [v])]))]))])])]);
}
function QC(e) {
  const t = yn(e, {
    defaultValue: Bn(/* @__PURE__ */ new Date()),
    type: "date",
    disabledDate: () => !1,
    getClasses: () => [],
    titleFormat: "YYYY-MM-DD"
  }), n = te(() => (Array.isArray(t.value) ? t.value : [t.value]).filter(pn).map((y) => t.type === "year" ? UC(y) : t.type === "month" ? xu(y) : Bn(y))), r = Q(/* @__PURE__ */ new Date());
  Ct(() => {
    let h = t.calendar;
    if (!pn(h)) {
      const {
        length: y
      } = n.value;
      h = Ci(y > 0 ? n.value[y - 1] : t.defaultValue);
    }
    r.value = xu(h);
  });
  const o = (h) => {
    var y;
    r.value = h, (y = t.onCalendarChange) == null || y.call(t, h);
  }, a = Q("date");
  Ct(() => {
    const h = ["date", "month", "year"], y = Math.max(h.indexOf(t.type), h.indexOf(t.defaultPanel));
    a.value = y !== -1 ? h[y] : "date";
  });
  const i = (h) => {
    var y;
    const w = a.value;
    a.value = h, (y = t.onPanelChange) == null || y.call(t, h, w);
  }, l = (h) => t.disabledDate(new Date(h), n.value), s = (h, y) => {
    var w, O, $;
    if (!l(h))
      if ((w = t.onPick) == null || w.call(t, h), t.multiple === !0) {
        const C = n.value.filter((b) => b.getTime() !== h.getTime());
        C.length === n.value.length && C.push(h), (O = t["onUpdate:value"]) == null || O.call(t, C, y);
      } else
        ($ = t["onUpdate:value"]) == null || $.call(t, h, y);
  }, c = (h) => {
    s(h, t.type === "week" ? "week" : "date");
  }, u = (h) => {
    if (t.type === "year")
      s(h, "year");
    else if (o(h), i("month"), t.partialUpdate && n.value.length === 1) {
      const y = Rr(n.value[0], h.getFullYear());
      s(y, "year");
    }
  }, f = (h) => {
    if (t.type === "month")
      s(h, "month");
    else if (o(h), i("date"), t.partialUpdate && n.value.length === 1) {
      const y = Ka(Rr(n.value[0], h.getFullYear()), h.getMonth());
      s(y, "month");
    }
  }, d = (h, y = []) => (l(h) ? y.push("disabled") : n.value.some((w) => w.getTime() === h.getTime()) && y.push("active"), y.concat(t.getClasses(h, n.value, y.join(" ")))), v = (h) => {
    const y = h.getMonth() !== r.value.getMonth(), w = [];
    return h.getTime() === (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0) && w.push("today"), y && w.push("not-current-month"), d(h, w);
  }, p = (h) => t.type !== "month" ? r.value.getMonth() === h.getMonth() ? "active" : "" : d(h), g = (h) => t.type !== "year" ? r.value.getFullYear() === h.getFullYear() ? "active" : "" : d(h), m = (h) => {
    if (t.type !== "week")
      return !1;
    const y = h[0].getTime(), w = h[6].getTime();
    return n.value.some((O) => {
      const $ = O.getTime();
      return $ >= y && $ <= w;
    });
  };
  return () => a.value === "year" ? z(ZC, {
    calendar: r.value,
    getCellClasses: g,
    getYearPanel: t.getYearPanel,
    onSelect: u,
    onUpdateCalendar: o
  }, null) : a.value === "month" ? z(KC, {
    calendar: r.value,
    getCellClasses: p,
    onSelect: f,
    onUpdatePanel: i,
    onUpdateCalendar: o
  }, null) : z(XC, {
    isWeekMode: t.type === "week",
    showWeekNumber: t.showWeekNumber,
    titleFormat: t.titleFormat,
    calendar: r.value,
    getCellClasses: v,
    getWeekActive: m,
    onSelect: c,
    onUpdatePanel: i,
    onUpdateCalendar: o,
    onDateMouseEnter: t.onDateMouseEnter,
    onDateMouseLeave: t.onDateMouseLeave
  }, null);
}
const Ti = Gn()(["type", "value", "defaultValue", "defaultPanel", "disabledDate", "getClasses", "calendar", "multiple", "partialUpdate", "showWeekNumber", "titleFormat", "getYearPanel", "onDateMouseEnter", "onDateMouseLeave", "onCalendarChange", "onPanelChange", "onUpdate:value", "onPick"]);
var Si = gn(QC, Ti);
const Vu = (e, t) => {
  const n = e.getTime();
  let [r, o] = t.map((a) => a.getTime());
  return r > o && ([r, o] = [o, r]), n > r && n < o;
};
function eT(e) {
  const t = yn(e, {
    defaultValue: /* @__PURE__ */ new Date(),
    type: "date"
  }), n = ht(), r = te(() => {
    let m = Array.isArray(t.defaultValue) ? t.defaultValue : [t.defaultValue, t.defaultValue];
    return m = m.map((h) => Bn(h)), ar(m) ? m : [/* @__PURE__ */ new Date(), /* @__PURE__ */ new Date()].map((h) => Bn(h));
  }), o = Q([/* @__PURE__ */ new Date(NaN), /* @__PURE__ */ new Date(NaN)]);
  Ct(() => {
    ar(t.value) && (o.value = t.value);
  });
  const a = (m, h) => {
    var y;
    const [w, O] = o.value;
    pn(w) && !pn(O) ? (w.getTime() > m.getTime() ? o.value = [m, w] : o.value = [w, m], (y = t["onUpdate:value"]) == null || y.call(t, o.value, h)) : o.value = [m, /* @__PURE__ */ new Date(NaN)];
  }, i = Q([/* @__PURE__ */ new Date(), /* @__PURE__ */ new Date()]), l = te(() => ar(t.calendar) ? t.calendar : i.value), s = te(() => t.type === "year" ? 10 * 12 : t.type === "month" ? 1 * 12 : 1), c = (m, h) => {
    var y;
    const w = HC(m[0], m[1]), O = s.value - w;
    if (O > 0) {
      const $ = h === 1 ? 0 : 1;
      m[$] = Ka(m[$], (C) => C + ($ === 0 ? -O : O));
    }
    i.value = m, (y = t.onCalendarChange) == null || y.call(t, m, h);
  }, u = (m) => {
    c([m, l.value[1]], 0);
  }, f = (m) => {
    c([l.value[0], m], 1);
  };
  Ct(() => {
    const m = ar(t.value) ? t.value : r.value;
    c(m.slice(0, 2));
  });
  const d = Q(null), v = (m) => d.value = m, p = () => d.value = null, g = (m, h, y) => {
    const w = t.getClasses ? t.getClasses(m, h, y) : [], O = Array.isArray(w) ? w : [w];
    return /disabled|active/.test(y) ? O : (h.length === 2 && Vu(m, h) && O.push("in-range"), h.length === 1 && d.value && Vu(m, [h[0], d.value]) ? O.concat("hover-in-range") : O);
  };
  return () => {
    const m = l.value.map((h, y) => {
      const w = $t(nt({}, t), {
        calendar: h,
        value: o.value,
        defaultValue: r.value[y],
        getClasses: g,
        partialUpdate: !1,
        multiple: !1,
        "onUpdate:value": a,
        onCalendarChange: y === 0 ? u : f,
        onDateMouseLeave: p,
        onDateMouseEnter: v
      });
      return z(Si, w, null);
    });
    return z("div", {
      class: `${n}-calendar-range`
    }, [m]);
  };
}
const xl = Ti;
var Bl = gn(eT, xl);
const Wh = pe({
  setup(e, {
    slots: t
  }) {
    const n = ht(), r = Q(), o = Q(""), a = Q("");
    Ke(() => {
      if (!r.value)
        return;
      const p = r.value, g = p.clientHeight * 100 / p.scrollHeight;
      o.value = g < 100 ? `${g}%` : "";
    });
    const l = bC(), s = (p) => {
      const g = p.currentTarget, {
        scrollHeight: m,
        scrollTop: h
      } = g;
      a.value = `${h * 100 / m}%`;
    };
    let c = !1, u = 0;
    const f = (p) => {
      p.stopImmediatePropagation();
      const g = p.currentTarget, {
        offsetTop: m
      } = g;
      c = !0, u = p.clientY - m;
    }, d = (p) => {
      if (!c || !r.value)
        return;
      const {
        clientY: g
      } = p, {
        scrollHeight: m,
        clientHeight: h
      } = r.value, w = (g - u) * m / h;
      r.value.scrollTop = w;
    }, v = () => {
      c = !1;
    };
    return Ke(() => {
      document.addEventListener("mousemove", d), document.addEventListener("mouseup", v);
    }), ll(() => {
      document.addEventListener("mousemove", d), document.addEventListener("mouseup", v);
    }), () => {
      var p;
      return z("div", {
        class: `${n}-scrollbar`,
        style: {
          position: "relative",
          overflow: "hidden"
        }
      }, [z("div", {
        ref: r,
        class: `${n}-scrollbar-wrap`,
        style: {
          marginRight: `-${l}px`
        },
        onScroll: s
      }, [(p = t.default) == null ? void 0 : p.call(t)]), z("div", {
        class: `${n}-scrollbar-track`
      }, [z("div", {
        class: `${n}-scrollbar-thumb`,
        style: {
          height: o.value,
          top: a.value
        },
        onMousedown: f
      }, null)])]);
    };
  }
});
function tT({
  options: e,
  getClasses: t,
  onSelect: n
}) {
  const r = ht(), o = (a) => {
    const i = a.target, l = a.currentTarget;
    if (i.tagName.toUpperCase() !== "LI")
      return;
    const s = l.getAttribute("data-type"), c = parseInt(l.getAttribute("data-index"), 10), u = parseInt(i.getAttribute("data-index"), 10), f = e[c].list[u].value;
    n(f, s);
  };
  return z("div", {
    class: `${r}-time-columns`
  }, [e.map((a, i) => z(Wh, {
    key: a.type,
    class: `${r}-time-column`
  }, {
    default: () => [z("ul", {
      class: `${r}-time-list`,
      "data-index": i,
      "data-type": a.type,
      onClick: o
    }, [a.list.map((l, s) => z("li", {
      key: l.text,
      "data-index": s,
      class: [`${r}-time-item`, t(l.value, a.type)]
    }, [l.text]))])]
  }))]);
}
function nT(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Vv(e);
}
function rT(e) {
  let t;
  const n = ht();
  return z(Wh, null, nT(t = e.options.map((r) => z("div", {
    key: r.text,
    class: [`${n}-time-option`, e.getClasses(r.value, "time")],
    onClick: () => e.onSelect(r.value, "time")
  }, [r.text]))) ? t : {
    default: () => [t]
  });
}
function Zi({
  length: e,
  step: t = 1,
  options: n
}) {
  if (Array.isArray(n))
    return n.filter((o) => o >= 0 && o < e);
  t <= 0 && (t = 1);
  const r = [];
  for (let o = 0; o < e; o += t)
    r.push(o);
  return r;
}
function oT(e, t) {
  let { showHour: n, showMinute: r, showSecond: o, use12h: a } = t;
  const i = t.format || "HH:mm:ss";
  n = typeof n == "boolean" ? n : /[HhKk]/.test(i), r = typeof r == "boolean" ? r : /m/.test(i), o = typeof o == "boolean" ? o : /s/.test(i), a = typeof a == "boolean" ? a : /a/i.test(i);
  const l = [], s = a && e.getHours() >= 12;
  return n && l.push({
    type: "hour",
    list: Zi({
      length: a ? 12 : 24,
      step: t.hourStep,
      options: t.hourOptions
    }).map((c) => {
      const u = c === 0 && a ? "12" : Ji(c), f = new Date(e);
      return f.setHours(s ? c + 12 : c), { value: f, text: u };
    })
  }), r && l.push({
    type: "minute",
    list: Zi({
      length: 60,
      step: t.minuteStep,
      options: t.minuteOptions
    }).map((c) => {
      const u = new Date(e);
      return u.setMinutes(c), { value: u, text: Ji(c) };
    })
  }), o && l.push({
    type: "second",
    list: Zi({
      length: 60,
      step: t.secondStep,
      options: t.secondOptions
    }).map((c) => {
      const u = new Date(e);
      return u.setSeconds(c), { value: u, text: Ji(c) };
    })
  }), a && l.push({
    type: "ampm",
    list: ["AM", "PM"].map((c, u) => {
      const f = new Date(e);
      return f.setHours(f.getHours() % 12 + u * 12), { text: c, value: f };
    })
  }), l;
}
function Qi(e = "") {
  const t = e.split(":");
  if (t.length >= 2) {
    const n = parseInt(t[0], 10), r = parseInt(t[1], 10);
    return {
      hours: n,
      minutes: r
    };
  }
  return null;
}
function aT({
  date: e,
  option: t,
  format: n,
  formatDate: r
}) {
  const o = [];
  if (typeof t == "function")
    return t() || [];
  const a = Qi(t.start), i = Qi(t.end), l = Qi(t.step), s = t.format || n;
  if (a && i && l) {
    const c = a.minutes + a.hours * 60, u = i.minutes + i.hours * 60, f = l.minutes + l.hours * 60, d = Math.floor((u - c) / f);
    for (let v = 0; v <= d; v++) {
      const p = c + v * f, g = Math.floor(p / 60), m = p % 60, h = new Date(e);
      h.setHours(g, m, 0), o.push({
        value: h,
        text: r(h, s)
      });
    }
  }
  return o;
}
const qh = (e, t, n = 0) => {
  if (n <= 0) {
    requestAnimationFrame(() => {
      e.scrollTop = t;
    });
    return;
  }
  const o = (t - e.scrollTop) / n * 10;
  requestAnimationFrame(() => {
    const a = e.scrollTop + o;
    if (a >= t) {
      e.scrollTop = t;
      return;
    }
    e.scrollTop = a, qh(e, t, n - 10);
  });
};
function iT(e) {
  const t = yn(e, {
    defaultValue: Bn(/* @__PURE__ */ new Date()),
    format: "HH:mm:ss",
    timeTitleFormat: "YYYY-MM-DD",
    disabledTime: () => !1,
    scrollDuration: 100
  }), n = ht(), r = Nl(), o = (g, m) => Dl(g, m, {
    locale: r.value.formatLocale
  }), a = Q(/* @__PURE__ */ new Date());
  Ct(() => {
    a.value = Ci(t.value, t.defaultValue);
  });
  const i = (g) => Array.isArray(g) ? g.every((m) => t.disabledTime(new Date(m))) : t.disabledTime(new Date(g)), l = (g) => {
    const m = new Date(g);
    return i([m.getTime(), m.setMinutes(0, 0, 0), m.setMinutes(59, 59, 999)]);
  }, s = (g) => {
    const m = new Date(g);
    return i([m.getTime(), m.setSeconds(0, 0), m.setSeconds(59, 999)]);
  }, c = (g) => {
    const m = new Date(g), h = m.getHours() < 12 ? 0 : 12, y = h + 11;
    return i([m.getTime(), m.setHours(h, 0, 0, 0), m.setHours(y, 59, 59, 999)]);
  }, u = (g, m) => m === "hour" ? l(g) : m === "minute" ? s(g) : m === "ampm" ? c(g) : i(g), f = (g, m) => {
    var h;
    if (!u(g, m)) {
      const y = new Date(g);
      a.value = y, i(y) || (h = t["onUpdate:value"]) == null || h.call(t, y, m);
    }
  }, d = (g, m) => u(g, m) ? "disabled" : g.getTime() === a.value.getTime() ? "active" : "", v = Q(), p = (g) => {
    if (!v.value)
      return;
    const m = v.value.querySelectorAll(".active");
    for (let h = 0; h < m.length; h++) {
      const y = m[h], w = Ll(y, v.value);
      if (w) {
        const O = y.offsetTop;
        qh(w, O, g);
      }
    }
  };
  return Ke(() => p(0)), Le(a, () => p(t.scrollDuration), {
    flush: "post"
  }), () => {
    let g;
    return t.timePickerOptions ? g = z(rT, {
      onSelect: f,
      getClasses: d,
      options: aT({
        date: a.value,
        format: t.format,
        option: t.timePickerOptions,
        formatDate: o
      })
    }, null) : g = z(tT, {
      options: oT(a.value, t),
      onSelect: f,
      getClasses: d
    }, null), z("div", {
      class: `${n}-time`,
      ref: v
    }, [t.showTimeHeader && z("div", {
      class: `${n}-time-header`
    }, [z("button", {
      type: "button",
      class: `${n}-btn ${n}-btn-text ${n}-time-header-title`,
      onClick: t.onClickTitle
    }, [o(a.value, t.timeTitleFormat)])]), z("div", {
      class: `${n}-time-content`
    }, [g])]);
  };
}
const ki = Gn()(["value", "defaultValue", "format", "timeTitleFormat", "showTimeHeader", "disabledTime", "timePickerOptions", "hourOptions", "minuteOptions", "secondOptions", "hourStep", "minuteStep", "secondStep", "showHour", "showMinute", "showSecond", "use12h", "scrollDuration", "onClickTitle", "onUpdate:value"]);
var Lo = gn(iT, ki);
function sT(e) {
  const t = yn(e, {
    defaultValue: Bn(/* @__PURE__ */ new Date()),
    disabledTime: () => !1
  }), n = ht(), r = Q([/* @__PURE__ */ new Date(NaN), /* @__PURE__ */ new Date(NaN)]);
  Ct(() => {
    ar(t.value) ? r.value = t.value : r.value = [/* @__PURE__ */ new Date(NaN), /* @__PURE__ */ new Date(NaN)];
  });
  const o = (c, u) => {
    var f;
    (f = t["onUpdate:value"]) == null || f.call(t, r.value, c === "time" ? "time-range" : c, u);
  }, a = (c, u) => {
    r.value[0] = c, r.value[1].getTime() >= c.getTime() || (r.value[1] = c), o(u, 0);
  }, i = (c, u) => {
    r.value[1] = c, r.value[0].getTime() <= c.getTime() || (r.value[0] = c), o(u, 1);
  }, l = (c) => t.disabledTime(c, 0), s = (c) => c.getTime() < r.value[0].getTime() || t.disabledTime(c, 1);
  return () => {
    const c = Array.isArray(t.defaultValue) ? t.defaultValue : [t.defaultValue, t.defaultValue];
    return z("div", {
      class: `${n}-time-range`
    }, [z(Lo, $t(nt({}, t), {
      "onUpdate:value": a,
      value: r.value[0],
      defaultValue: c[0],
      disabledTime: l
    }), null), z(Lo, $t(nt({}, t), {
      "onUpdate:value": i,
      value: r.value[1],
      defaultValue: c[1],
      disabledTime: s
    }), null)]);
  };
}
const Vl = ki;
var Ul = gn(sT, Vl);
function zh(e) {
  const t = Q(!1), n = () => {
    var a;
    t.value = !1, (a = e.onShowTimePanelChange) == null || a.call(e, !1);
  }, r = () => {
    var a;
    t.value = !0, (a = e.onShowTimePanelChange) == null || a.call(e, !0);
  };
  return { timeVisible: te(() => typeof e.showTimePanel == "boolean" ? e.showTimePanel : t.value), openTimePanel: r, closeTimePanel: n };
}
function lT(e) {
  const t = yn(e, {
    disabledTime: () => !1,
    defaultValue: Bn(/* @__PURE__ */ new Date())
  }), n = Q(t.value);
  Ct(() => {
    n.value = t.value;
  });
  const {
    openTimePanel: r,
    closeTimePanel: o,
    timeVisible: a
  } = zh(t), i = (l, s) => {
    var c;
    s === "date" && r();
    let u = Ja(l, Ci(t.value, t.defaultValue));
    if (t.disabledTime(new Date(u)) && (u = Ja(l, t.defaultValue), t.disabledTime(new Date(u)))) {
      n.value = u;
      return;
    }
    (c = t["onUpdate:value"]) == null || c.call(t, u, s);
  };
  return () => {
    const l = ht(), s = $t(nt({}, dn(t, Ti)), {
      multiple: !1,
      type: "date",
      value: n.value,
      "onUpdate:value": i
    }), c = $t(nt({}, dn(t, ki)), {
      showTimeHeader: !0,
      value: n.value,
      "onUpdate:value": t["onUpdate:value"],
      onClickTitle: o
    });
    return z("div", {
      class: `${l}-date-time`
    }, [z(Si, s, null), a.value && z(Lo, c, null)]);
  };
}
const Gh = Gn()(["showTimePanel", "onShowTimePanelChange"]), cT = [...Gh, ...Ti, ...ki];
var Xh = gn(lT, cT);
function uT(e) {
  const t = yn(e, {
    defaultValue: Bn(/* @__PURE__ */ new Date()),
    disabledTime: () => !1
  }), n = Q(t.value);
  Ct(() => {
    n.value = t.value;
  });
  const {
    openTimePanel: r,
    closeTimePanel: o,
    timeVisible: a
  } = zh(t), i = (l, s) => {
    var c;
    s === "date" && r();
    const u = Array.isArray(t.defaultValue) ? t.defaultValue : [t.defaultValue, t.defaultValue];
    let f = l.map((d, v) => {
      const p = ar(t.value) ? t.value[v] : u[v];
      return Ja(d, p);
    });
    if (f[1].getTime() < f[0].getTime() && (f = [f[0], f[0]]), f.some(t.disabledTime) && (f = l.map((d, v) => Ja(d, u[v])), f.some(t.disabledTime))) {
      n.value = f;
      return;
    }
    (c = t["onUpdate:value"]) == null || c.call(t, f, s);
  };
  return () => {
    const l = ht(), s = $t(nt({}, dn(t, xl)), {
      type: "date",
      value: n.value,
      "onUpdate:value": i
    }), c = $t(nt({}, dn(t, Vl)), {
      showTimeHeader: !0,
      value: n.value,
      "onUpdate:value": t["onUpdate:value"],
      onClickTitle: o
    });
    return z("div", {
      class: `${l}-date-time-range`
    }, [z(Bl, s, null), a.value && z(Ul, c, null)]);
  };
}
const dT = [...Gh, ...Vl, ...xl];
var Kh = gn(uT, dT);
const fT = Gn()(["range", "open", "appendToBody", "clearable", "confirm", "disabled", "editable", "multiple", "partialUpdate", "showHour", "showMinute", "showSecond", "showTimeHeader", "showTimePanel", "showWeekNumber", "use12h"]), Uu = {
  date: "YYYY-MM-DD",
  datetime: "YYYY-MM-DD HH:mm:ss",
  year: "YYYY",
  month: "YYYY-MM",
  time: "HH:mm:ss",
  week: "w"
};
function Jh(e, {
  slots: t
}) {
  const n = e.type || "date", r = e.format || Uu[n] || Uu.date, o = $t(nt({}, wC(e, fT)), {
    type: n,
    format: r
  });
  return z(Bu, dn(o, Bu.props), nt({
    content: (a) => {
      if (o.range) {
        const i = n === "time" ? Ul : n === "datetime" ? Kh : Bl;
        return dr(i, dn(nt(nt({}, o), a), i.props));
      } else {
        const i = n === "time" ? Lo : n === "datetime" ? Xh : Si;
        return dr(i, dn(nt(nt({}, o), a), i.props));
      }
    },
    "icon-calendar": () => n === "time" ? z(BC, null, null) : z(jh, null, null)
  }, t));
}
const pT = {
  locale: Vh,
  install: (e) => {
    e.component("DatePicker", Jh);
  }
};
var ir = Object.assign(Jh, pT, {
  Calendar: Si,
  CalendarRange: Bl,
  TimePanel: Lo,
  TimeRange: Ul,
  DateTime: Xh,
  DateTimeRange: Kh
}), hT = {
  months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
  monthsShort: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
  weekdays: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
  weekdaysShort: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
  weekdaysMin: ["di", "lu", "ma", "me", "je", "ve", "sa"],
  firstDayOfWeek: 1,
  firstWeekContainsDate: 1
};
const mT = {
  formatLocale: hT,
  yearFormat: "YYYY",
  monthFormat: "MMM",
  monthBeforeYear: !0
};
ir.locale("fr", mT);
var vT = {
  months: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  monthsShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  weekdays: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
  weekdaysShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
  weekdaysMin: ["do", "lu", "ma", "mi", "ju", "vi", "sá"],
  firstDayOfWeek: 1,
  firstWeekContainsDate: 1
};
const gT = {
  formatLocale: vT,
  yearFormat: "YYYY",
  monthFormat: "MMM",
  monthBeforeYear: !0
};
ir.locale("es", gT);
var yT = {
  months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
  monthsShort: ["Jan", "Feb", "März", "Apr", "Mai", "Juni", "Juli", "Aug", "Sep", "Okt", "Nov", "Dez"],
  weekdays: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
  weekdaysShort: ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."],
  weekdaysMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
  firstDayOfWeek: 1,
  firstWeekContainsDate: 4
};
const _T = {
  formatLocale: yT,
  yearFormat: "YYYY",
  monthFormat: "MMM",
  monthBeforeYear: !0
};
ir.locale("de", _T);
var bT = {
  months: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
  monthsShort: ["jan.", "feb.", "mrt.", "apr.", "mei", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "dec."],
  weekdays: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
  weekdaysShort: ["zo.", "ma.", "di.", "wo.", "do.", "vr.", "za."],
  weekdaysMin: ["zo", "ma", "di", "wo", "do", "vr", "za"],
  firstDayOfWeek: 1,
  firstWeekContainsDate: 4
};
const ET = {
  formatLocale: bT,
  yearFormat: "YYYY",
  monthFormat: "MMM",
  monthBeforeYear: !0
};
ir.locale("nl", ET);
const wT = {
  key: 0,
  class: "mx-datepicker-sidebar"
}, CT = /* @__PURE__ */ pe({
  __name: "DatePicker",
  props: {
    product: {},
    isEnabled: { type: Boolean, default: !0 },
    isUpsell: { type: Boolean, default: !1 }
  },
  emits: ["hideSelect", "dateSelect"],
  setup(e, { emit: t }) {
    const { t: n } = De(), { getServerTime: r } = $e(), o = t, a = Q(null), i = e, l = Ln(), s = kl(), c = $e(), u = ir.locale(De().locale.value);
    u.formatLocale.firstDayOfWeek = 1, ir.locale(De().locale.value, u);
    const f = ir.Calendar, d = Q(!1), v = Q(!1), p = Q(!0), g = Q(!1), m = Q(!1), h = Q(null), y = te(() => ue(c.getServerTime)), w = te(() => {
      const x = ue().format("YYYY-MM-DDT00:00:00");
      return i.product.availableDays.map((N) => N.date).includes(x) || d.value;
    }), O = te(() => {
      const x = ue().add(1, "day").format("YYYY-MM-DDT00:00:00");
      return i.product.availableDays.map((N) => N.date).includes(x) || v.value;
    }), $ = (x) => !i.product.availableDays.some((N) => ue(x).isSame(N.date, "day")), C = () => {
      var V, G;
      if (!a.value)
        return;
      const x = (V = a.value) == null ? void 0 : V.querySelectorAll(
        ".th-datepicker .cell"
      ), N = ue(
        (G = x[x.length - 1]) == null ? void 0 : G.title
      ).add(
        1,
        "day"
      );
      g.value = !i.product.availableDays.some(
        (L) => ue(N).isBefore(L.date)
      );
    }, b = () => {
      var N, V;
      if (!a.value)
        return;
      const x = (N = a.value) == null ? void 0 : N.querySelectorAll(
        ".th-datepicker .cell"
      ), B = ue((V = x[0]) == null ? void 0 : V.title);
      p.value = B.isBefore(r);
    }, E = () => {
      $n(() => {
        document.querySelectorAll(
          ".th-datepicker .cell"
        ).forEach((B) => {
          var V;
          const N = ue(B.title);
          if (ue().isBefore(N, "month") ? B.classList.add("next-month") : ue().isAfter(N, "month") && B.classList.add("prev-month"), N.isBefore(ue()) && B.classList.add("past"), i.product.hasDynamicPrices)
            if (B.classList.contains("disabled"))
              (V = B.querySelector(".cell__price")) == null || V.remove();
            else {
              const G = i.product.availableDays.find(
                (F) => ue(F.date).isSame(N)
              ), L = s(Number(G == null ? void 0 : G.price));
              if (B.querySelector(".cell__price")) {
                const F = B.querySelector(
                  ".cell__price"
                );
                F.textContent = L;
              } else {
                const F = document.createElement("div");
                F.textContent = L, F.className = "cell__price", B.append(F);
              }
            }
        }), C(), b();
      });
    };
    Ke(() => {
      var x, B;
      i.isEnabled && (E(), typeof ((x = window.ticketHub) == null ? void 0 : x.loaderComponent) < "u" && (h.value = (B = window.ticketHub) == null ? void 0 : B.loaderComponent));
    }), Le(
      () => l.current,
      () => E()
    );
    const k = async (x) => {
      var B;
      try {
        m.value = !0;
        const N = 42, V = ((B = i.product.availableDays.at(-1)) == null ? void 0 : B.date) || x, G = ue(x).isBefore(i.product.selectedDate), L = !G, F = async (M = V) => {
          const K = await mr.getProductBookingData(
            i.product,
            ue(M).format("YYYY-MM-DD"),
            N
          );
          await i.product.setBookingData(K);
        };
        L && !i.product.isDateExistsInAvailableDays(
          ue(x).add(N, "days")
        ) ? await F() : G && !i.product.isDateExistsInAvailableDays(ue(x)) && await F(x);
      } catch {
      } finally {
        m.value = !1, E();
      }
    }, _ = te(() => typeof r > "u" ? !1 : r.isSame(
      ue(i.product.selectedDate).tz("Europe/Amsterdam", !0),
      "day"
    )), S = te(() => typeof r > "u" ? !1 : r.add(1, "day").isSame(
      ue(i.product.selectedDate).tz("Europe/Amsterdam", !0),
      "day"
    )), A = async (x) => {
      setTimeout(async () => {
        ue(i.product.selectedDate).isSame(x, "day") || (await k(x), i.product.resetSelectedTimeslots(), i.product.selectDate(x), E(), o("dateSelect"), i.product.isCombo && o("hideSelect"));
      }, 0);
    };
    return (x, B) => (U(), X(Oe, null, [
      m.value ? (U(), X("div", {
        key: 0,
        class: be([{ "th-datepicker-loader_custom": h.value }, "th-datepicker-loader"])
      }, [
        (U(), de(qo(h.value)))
      ], 2)) : se("", !0),
      q("div", {
        ref_key: "datePicker",
        ref: a,
        class: be([{ "th-datepicker_upsell": i.isUpsell }, "th-datepicker"])
      }, [
        w.value || O.value ? (U(), X("div", wT, [
          w.value ? (U(), X("button", {
            key: 0,
            class: be([{ "mx-btn-shortcut_active": _.value }, "mx-btn mx-btn-text mx-btn-shortcut"]),
            type: "button",
            onClick: B[0] || (B[0] = (N) => A(y.value.toDate()))
          }, ae(W(n)("calendar.today")), 3)) : se("", !0),
          O.value ? (U(), X("button", {
            key: 1,
            class: be([{ "mx-btn-shortcut_active": S.value }, "mx-btn mx-btn-text mx-btn-shortcut"]),
            type: "button",
            onClick: B[1] || (B[1] = (N) => A(y.value.add(1, "day").toDate()))
          }, ae(W(n)("calendar.tomorrow")), 3)) : se("", !0)
        ])) : se("", !0),
        z(W(f), {
          class: be({
            "mx-calendar_disabled-prev-month": p.value,
            "mx-calendar_disabled-next-month": g.value
          }),
          "disabled-date": $,
          value: i.product.selectedDate,
          onOpen: E,
          "onUpdate:value": A,
          onCalendarChange: k
        }, null, 8, ["class", "value"])
      ], 2)
    ], 64));
  }
}), $a = /* @__PURE__ */ ge(CT, [["__scopeId", "data-v-18cc3c13"]]);
/*!
 * perfect-scrollbar v1.5.3
 * Copyright 2021 Hyunje Jun, MDBootstrap and Contributors
 * Licensed under MIT
 */
function Wt(e) {
  return getComputedStyle(e);
}
function gt(e, t) {
  for (var n in t) {
    var r = t[n];
    typeof r == "number" && (r = r + "px"), e.style[n] = r;
  }
  return e;
}
function Ea(e) {
  var t = document.createElement("div");
  return t.className = e, t;
}
var Fu = typeof Element < "u" && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector);
function On(e, t) {
  if (!Fu)
    throw new Error("No element matching method supported");
  return Fu.call(e, t);
}
function Mr(e) {
  e.remove ? e.remove() : e.parentNode && e.parentNode.removeChild(e);
}
function Hu(e, t) {
  return Array.prototype.filter.call(
    e.children,
    function(n) {
      return On(n, t);
    }
  );
}
var ze = {
  main: "ps",
  rtl: "ps__rtl",
  element: {
    thumb: function(e) {
      return "ps__thumb-" + e;
    },
    rail: function(e) {
      return "ps__rail-" + e;
    },
    consuming: "ps__child--consume"
  },
  state: {
    focus: "ps--focus",
    clicking: "ps--clicking",
    active: function(e) {
      return "ps--active-" + e;
    },
    scrolling: function(e) {
      return "ps--scrolling-" + e;
    }
  }
}, Zh = { x: null, y: null };
function Qh(e, t) {
  var n = e.element.classList, r = ze.state.scrolling(t);
  n.contains(r) ? clearTimeout(Zh[t]) : n.add(r);
}
function em(e, t) {
  Zh[t] = setTimeout(
    function() {
      return e.isAlive && e.element.classList.remove(ze.state.scrolling(t));
    },
    e.settings.scrollingThreshold
  );
}
function TT(e, t) {
  Qh(e, t), em(e, t);
}
var Zo = function(t) {
  this.element = t, this.handlers = {};
}, tm = { isEmpty: { configurable: !0 } };
Zo.prototype.bind = function(t, n) {
  typeof this.handlers[t] > "u" && (this.handlers[t] = []), this.handlers[t].push(n), this.element.addEventListener(t, n, !1);
};
Zo.prototype.unbind = function(t, n) {
  var r = this;
  this.handlers[t] = this.handlers[t].filter(function(o) {
    return n && o !== n ? !0 : (r.element.removeEventListener(t, o, !1), !1);
  });
};
Zo.prototype.unbindAll = function() {
  for (var t in this.handlers)
    this.unbind(t);
};
tm.isEmpty.get = function() {
  var e = this;
  return Object.keys(this.handlers).every(
    function(t) {
      return e.handlers[t].length === 0;
    }
  );
};
Object.defineProperties(Zo.prototype, tm);
var no = function() {
  this.eventElements = [];
};
no.prototype.eventElement = function(t) {
  var n = this.eventElements.filter(function(r) {
    return r.element === t;
  })[0];
  return n || (n = new Zo(t), this.eventElements.push(n)), n;
};
no.prototype.bind = function(t, n, r) {
  this.eventElement(t).bind(n, r);
};
no.prototype.unbind = function(t, n, r) {
  var o = this.eventElement(t);
  o.unbind(n, r), o.isEmpty && this.eventElements.splice(this.eventElements.indexOf(o), 1);
};
no.prototype.unbindAll = function() {
  this.eventElements.forEach(function(t) {
    return t.unbindAll();
  }), this.eventElements = [];
};
no.prototype.once = function(t, n, r) {
  var o = this.eventElement(t), a = function(i) {
    o.unbind(n, a), r(i);
  };
  o.bind(n, a);
};
function wa(e) {
  if (typeof window.CustomEvent == "function")
    return new CustomEvent(e);
  var t = document.createEvent("CustomEvent");
  return t.initCustomEvent(e, !1, !1, void 0), t;
}
function Za(e, t, n, r, o) {
  r === void 0 && (r = !0), o === void 0 && (o = !1);
  var a;
  if (t === "top")
    a = [
      "contentHeight",
      "containerHeight",
      "scrollTop",
      "y",
      "up",
      "down"
    ];
  else if (t === "left")
    a = [
      "contentWidth",
      "containerWidth",
      "scrollLeft",
      "x",
      "left",
      "right"
    ];
  else
    throw new Error("A proper axis should be provided");
  ST(e, n, a, r, o);
}
function ST(e, t, n, r, o) {
  var a = n[0], i = n[1], l = n[2], s = n[3], c = n[4], u = n[5];
  r === void 0 && (r = !0), o === void 0 && (o = !1);
  var f = e.element;
  e.reach[s] = null, f[l] < 1 && (e.reach[s] = "start"), f[l] > e[a] - e[i] - 1 && (e.reach[s] = "end"), t && (f.dispatchEvent(wa("ps-scroll-" + s)), t < 0 ? f.dispatchEvent(wa("ps-scroll-" + c)) : t > 0 && f.dispatchEvent(wa("ps-scroll-" + u)), r && TT(e, s)), e.reach[s] && (t || o) && f.dispatchEvent(wa("ps-" + s + "-reach-" + e.reach[s]));
}
function Ve(e) {
  return parseInt(e, 10) || 0;
}
function kT(e) {
  return On(e, "input,[contenteditable]") || On(e, "select,[contenteditable]") || On(e, "textarea,[contenteditable]") || On(e, "button,[contenteditable]");
}
function IT(e) {
  var t = Wt(e);
  return Ve(t.width) + Ve(t.paddingLeft) + Ve(t.paddingRight) + Ve(t.borderLeftWidth) + Ve(t.borderRightWidth);
}
var Pr = {
  isWebKit: typeof document < "u" && "WebkitAppearance" in document.documentElement.style,
  supportsTouch: typeof window < "u" && ("ontouchstart" in window || "maxTouchPoints" in window.navigator && window.navigator.maxTouchPoints > 0 || window.DocumentTouch && document instanceof window.DocumentTouch),
  supportsIePointer: typeof navigator < "u" && navigator.msMaxTouchPoints,
  isChrome: typeof navigator < "u" && /Chrome/i.test(navigator && navigator.userAgent)
};
function hn(e) {
  var t = e.element, n = Math.floor(t.scrollTop), r = t.getBoundingClientRect();
  e.containerWidth = Math.round(r.width), e.containerHeight = Math.round(r.height), e.contentWidth = t.scrollWidth, e.contentHeight = t.scrollHeight, t.contains(e.scrollbarXRail) || (Hu(t, ze.element.rail("x")).forEach(
    function(o) {
      return Mr(o);
    }
  ), t.appendChild(e.scrollbarXRail)), t.contains(e.scrollbarYRail) || (Hu(t, ze.element.rail("y")).forEach(
    function(o) {
      return Mr(o);
    }
  ), t.appendChild(e.scrollbarYRail)), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive = !0, e.railXWidth = e.containerWidth - e.railXMarginWidth, e.railXRatio = e.containerWidth / e.railXWidth, e.scrollbarXWidth = Yu(
    e,
    Ve(e.railXWidth * e.containerWidth / e.contentWidth)
  ), e.scrollbarXLeft = Ve(
    (e.negativeScrollAdjustment + t.scrollLeft) * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth)
  )) : e.scrollbarXActive = !1, !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive = !0, e.railYHeight = e.containerHeight - e.railYMarginHeight, e.railYRatio = e.containerHeight / e.railYHeight, e.scrollbarYHeight = Yu(
    e,
    Ve(e.railYHeight * e.containerHeight / e.contentHeight)
  ), e.scrollbarYTop = Ve(
    n * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight)
  )) : e.scrollbarYActive = !1, e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight), OT(t, e), e.scrollbarXActive ? t.classList.add(ze.state.active("x")) : (t.classList.remove(ze.state.active("x")), e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, t.scrollLeft = e.isRtl === !0 ? e.contentWidth : 0), e.scrollbarYActive ? t.classList.add(ze.state.active("y")) : (t.classList.remove(ze.state.active("y")), e.scrollbarYHeight = 0, e.scrollbarYTop = 0, t.scrollTop = 0);
}
function Yu(e, t) {
  return e.settings.minScrollbarLength && (t = Math.max(t, e.settings.minScrollbarLength)), e.settings.maxScrollbarLength && (t = Math.min(t, e.settings.maxScrollbarLength)), t;
}
function OT(e, t) {
  var n = { width: t.railXWidth }, r = Math.floor(e.scrollTop);
  t.isRtl ? n.left = t.negativeScrollAdjustment + e.scrollLeft + t.containerWidth - t.contentWidth : n.left = e.scrollLeft, t.isScrollbarXUsingBottom ? n.bottom = t.scrollbarXBottom - r : n.top = t.scrollbarXTop + r, gt(t.scrollbarXRail, n);
  var o = { top: r, height: t.railYHeight };
  t.isScrollbarYUsingRight ? t.isRtl ? o.right = t.contentWidth - (t.negativeScrollAdjustment + e.scrollLeft) - t.scrollbarYRight - t.scrollbarYOuterWidth - 9 : o.right = t.scrollbarYRight - e.scrollLeft : t.isRtl ? o.left = t.negativeScrollAdjustment + e.scrollLeft + t.containerWidth * 2 - t.contentWidth - t.scrollbarYLeft - t.scrollbarYOuterWidth : o.left = t.scrollbarYLeft + e.scrollLeft, gt(t.scrollbarYRail, o), gt(t.scrollbarX, {
    left: t.scrollbarXLeft,
    width: t.scrollbarXWidth - t.railBorderXWidth
  }), gt(t.scrollbarY, {
    top: t.scrollbarYTop,
    height: t.scrollbarYHeight - t.railBorderYWidth
  });
}
function DT(e) {
  e.element, e.event.bind(e.scrollbarY, "mousedown", function(t) {
    return t.stopPropagation();
  }), e.event.bind(e.scrollbarYRail, "mousedown", function(t) {
    var n = t.pageY - window.pageYOffset - e.scrollbarYRail.getBoundingClientRect().top, r = n > e.scrollbarYTop ? 1 : -1;
    e.element.scrollTop += r * e.containerHeight, hn(e), t.stopPropagation();
  }), e.event.bind(e.scrollbarX, "mousedown", function(t) {
    return t.stopPropagation();
  }), e.event.bind(e.scrollbarXRail, "mousedown", function(t) {
    var n = t.pageX - window.pageXOffset - e.scrollbarXRail.getBoundingClientRect().left, r = n > e.scrollbarXLeft ? 1 : -1;
    e.element.scrollLeft += r * e.containerWidth, hn(e), t.stopPropagation();
  });
}
function PT(e) {
  ju(e, [
    "containerWidth",
    "contentWidth",
    "pageX",
    "railXWidth",
    "scrollbarX",
    "scrollbarXWidth",
    "scrollLeft",
    "x",
    "scrollbarXRail"
  ]), ju(e, [
    "containerHeight",
    "contentHeight",
    "pageY",
    "railYHeight",
    "scrollbarY",
    "scrollbarYHeight",
    "scrollTop",
    "y",
    "scrollbarYRail"
  ]);
}
function ju(e, t) {
  var n = t[0], r = t[1], o = t[2], a = t[3], i = t[4], l = t[5], s = t[6], c = t[7], u = t[8], f = e.element, d = null, v = null, p = null;
  function g(y) {
    y.touches && y.touches[0] && (y[o] = y.touches[0].pageY), f[s] = d + p * (y[o] - v), Qh(e, c), hn(e), y.stopPropagation(), y.type.startsWith("touch") && y.changedTouches.length > 1 && y.preventDefault();
  }
  function m() {
    em(e, c), e[u].classList.remove(ze.state.clicking), e.event.unbind(e.ownerDocument, "mousemove", g);
  }
  function h(y, w) {
    d = f[s], w && y.touches && (y[o] = y.touches[0].pageY), v = y[o], p = (e[r] - e[n]) / (e[a] - e[l]), w ? e.event.bind(e.ownerDocument, "touchmove", g) : (e.event.bind(e.ownerDocument, "mousemove", g), e.event.once(e.ownerDocument, "mouseup", m), y.preventDefault()), e[u].classList.add(ze.state.clicking), y.stopPropagation();
  }
  e.event.bind(e[i], "mousedown", function(y) {
    h(y);
  }), e.event.bind(e[i], "touchstart", function(y) {
    h(y, !0);
  });
}
function AT(e) {
  var t = e.element, n = function() {
    return On(t, ":hover");
  }, r = function() {
    return On(e.scrollbarX, ":focus") || On(e.scrollbarY, ":focus");
  };
  function o(a, i) {
    var l = Math.floor(t.scrollTop);
    if (a === 0) {
      if (!e.scrollbarYActive)
        return !1;
      if (l === 0 && i > 0 || l >= e.contentHeight - e.containerHeight && i < 0)
        return !e.settings.wheelPropagation;
    }
    var s = t.scrollLeft;
    if (i === 0) {
      if (!e.scrollbarXActive)
        return !1;
      if (s === 0 && a < 0 || s >= e.contentWidth - e.containerWidth && a > 0)
        return !e.settings.wheelPropagation;
    }
    return !0;
  }
  e.event.bind(e.ownerDocument, "keydown", function(a) {
    if (!(a.isDefaultPrevented && a.isDefaultPrevented() || a.defaultPrevented) && !(!n() && !r())) {
      var i = document.activeElement ? document.activeElement : e.ownerDocument.activeElement;
      if (i) {
        if (i.tagName === "IFRAME")
          i = i.contentDocument.activeElement;
        else
          for (; i.shadowRoot; )
            i = i.shadowRoot.activeElement;
        if (kT(i))
          return;
      }
      var l = 0, s = 0;
      switch (a.which) {
        case 37:
          a.metaKey ? l = -e.contentWidth : a.altKey ? l = -e.containerWidth : l = -30;
          break;
        case 38:
          a.metaKey ? s = e.contentHeight : a.altKey ? s = e.containerHeight : s = 30;
          break;
        case 39:
          a.metaKey ? l = e.contentWidth : a.altKey ? l = e.containerWidth : l = 30;
          break;
        case 40:
          a.metaKey ? s = -e.contentHeight : a.altKey ? s = -e.containerHeight : s = -30;
          break;
        case 32:
          a.shiftKey ? s = e.containerHeight : s = -e.containerHeight;
          break;
        case 33:
          s = e.containerHeight;
          break;
        case 34:
          s = -e.containerHeight;
          break;
        case 36:
          s = e.contentHeight;
          break;
        case 35:
          s = -e.contentHeight;
          break;
        default:
          return;
      }
      e.settings.suppressScrollX && l !== 0 || e.settings.suppressScrollY && s !== 0 || (t.scrollTop -= s, t.scrollLeft += l, hn(e), o(l, s) && a.preventDefault());
    }
  });
}
function $T(e) {
  var t = e.element;
  function n(i, l) {
    var s = Math.floor(t.scrollTop), c = t.scrollTop === 0, u = s + t.offsetHeight === t.scrollHeight, f = t.scrollLeft === 0, d = t.scrollLeft + t.offsetWidth === t.scrollWidth, v;
    return Math.abs(l) > Math.abs(i) ? v = c || u : v = f || d, v ? !e.settings.wheelPropagation : !0;
  }
  function r(i) {
    var l = i.deltaX, s = -1 * i.deltaY;
    return (typeof l > "u" || typeof s > "u") && (l = -1 * i.wheelDeltaX / 6, s = i.wheelDeltaY / 6), i.deltaMode && i.deltaMode === 1 && (l *= 10, s *= 10), l !== l && s !== s && (l = 0, s = i.wheelDelta), i.shiftKey ? [-s, -l] : [l, s];
  }
  function o(i, l, s) {
    if (!Pr.isWebKit && t.querySelector("select:focus"))
      return !0;
    if (!t.contains(i))
      return !1;
    for (var c = i; c && c !== t; ) {
      if (c.classList.contains(ze.element.consuming))
        return !0;
      var u = Wt(c);
      if (s && u.overflowY.match(/(scroll|auto)/)) {
        var f = c.scrollHeight - c.clientHeight;
        if (f > 0 && (c.scrollTop > 0 && s < 0 || c.scrollTop < f && s > 0))
          return !0;
      }
      if (l && u.overflowX.match(/(scroll|auto)/)) {
        var d = c.scrollWidth - c.clientWidth;
        if (d > 0 && (c.scrollLeft > 0 && l < 0 || c.scrollLeft < d && l > 0))
          return !0;
      }
      c = c.parentNode;
    }
    return !1;
  }
  function a(i) {
    var l = r(i), s = l[0], c = l[1];
    if (!o(i.target, s, c)) {
      var u = !1;
      e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (c ? t.scrollTop -= c * e.settings.wheelSpeed : t.scrollTop += s * e.settings.wheelSpeed, u = !0) : e.scrollbarXActive && !e.scrollbarYActive && (s ? t.scrollLeft += s * e.settings.wheelSpeed : t.scrollLeft -= c * e.settings.wheelSpeed, u = !0) : (t.scrollTop -= c * e.settings.wheelSpeed, t.scrollLeft += s * e.settings.wheelSpeed), hn(e), u = u || n(s, c), u && !i.ctrlKey && (i.stopPropagation(), i.preventDefault());
    }
  }
  typeof window.onwheel < "u" ? e.event.bind(t, "wheel", a) : typeof window.onmousewheel < "u" && e.event.bind(t, "mousewheel", a);
}
function NT(e) {
  if (!Pr.supportsTouch && !Pr.supportsIePointer)
    return;
  var t = e.element;
  function n(p, g) {
    var m = Math.floor(t.scrollTop), h = t.scrollLeft, y = Math.abs(p), w = Math.abs(g);
    if (w > y) {
      if (g < 0 && m === e.contentHeight - e.containerHeight || g > 0 && m === 0)
        return window.scrollY === 0 && g > 0 && Pr.isChrome;
    } else if (y > w && (p < 0 && h === e.contentWidth - e.containerWidth || p > 0 && h === 0))
      return !0;
    return !0;
  }
  function r(p, g) {
    t.scrollTop -= g, t.scrollLeft -= p, hn(e);
  }
  var o = {}, a = 0, i = {}, l = null;
  function s(p) {
    return p.targetTouches ? p.targetTouches[0] : p;
  }
  function c(p) {
    return p.pointerType && p.pointerType === "pen" && p.buttons === 0 ? !1 : !!(p.targetTouches && p.targetTouches.length === 1 || p.pointerType && p.pointerType !== "mouse" && p.pointerType !== p.MSPOINTER_TYPE_MOUSE);
  }
  function u(p) {
    if (c(p)) {
      var g = s(p);
      o.pageX = g.pageX, o.pageY = g.pageY, a = (/* @__PURE__ */ new Date()).getTime(), l !== null && clearInterval(l);
    }
  }
  function f(p, g, m) {
    if (!t.contains(p))
      return !1;
    for (var h = p; h && h !== t; ) {
      if (h.classList.contains(ze.element.consuming))
        return !0;
      var y = Wt(h);
      if (m && y.overflowY.match(/(scroll|auto)/)) {
        var w = h.scrollHeight - h.clientHeight;
        if (w > 0 && (h.scrollTop > 0 && m < 0 || h.scrollTop < w && m > 0))
          return !0;
      }
      if (g && y.overflowX.match(/(scroll|auto)/)) {
        var O = h.scrollWidth - h.clientWidth;
        if (O > 0 && (h.scrollLeft > 0 && g < 0 || h.scrollLeft < O && g > 0))
          return !0;
      }
      h = h.parentNode;
    }
    return !1;
  }
  function d(p) {
    if (c(p)) {
      var g = s(p), m = { pageX: g.pageX, pageY: g.pageY }, h = m.pageX - o.pageX, y = m.pageY - o.pageY;
      if (f(p.target, h, y))
        return;
      r(h, y), o = m;
      var w = (/* @__PURE__ */ new Date()).getTime(), O = w - a;
      O > 0 && (i.x = h / O, i.y = y / O, a = w), n(h, y) && p.preventDefault();
    }
  }
  function v() {
    e.settings.swipeEasing && (clearInterval(l), l = setInterval(function() {
      if (e.isInitialized) {
        clearInterval(l);
        return;
      }
      if (!i.x && !i.y) {
        clearInterval(l);
        return;
      }
      if (Math.abs(i.x) < 0.01 && Math.abs(i.y) < 0.01) {
        clearInterval(l);
        return;
      }
      if (!e.element) {
        clearInterval(l);
        return;
      }
      r(i.x * 30, i.y * 30), i.x *= 0.8, i.y *= 0.8;
    }, 10));
  }
  Pr.supportsTouch ? (e.event.bind(t, "touchstart", u), e.event.bind(t, "touchmove", d), e.event.bind(t, "touchend", v)) : Pr.supportsIePointer && (window.PointerEvent ? (e.event.bind(t, "pointerdown", u), e.event.bind(t, "pointermove", d), e.event.bind(t, "pointerup", v)) : window.MSPointerEvent && (e.event.bind(t, "MSPointerDown", u), e.event.bind(t, "MSPointerMove", d), e.event.bind(t, "MSPointerUp", v)));
}
var LT = function() {
  return {
    handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"],
    maxScrollbarLength: null,
    minScrollbarLength: null,
    scrollingThreshold: 1e3,
    scrollXMarginOffset: 0,
    scrollYMarginOffset: 0,
    suppressScrollX: !1,
    suppressScrollY: !1,
    swipeEasing: !0,
    useBothWheelAxes: !1,
    wheelPropagation: !0,
    wheelSpeed: 1
  };
}, RT = {
  "click-rail": DT,
  "drag-thumb": PT,
  keyboard: AT,
  wheel: $T,
  touch: NT
}, Qo = function(t, n) {
  var r = this;
  if (n === void 0 && (n = {}), typeof t == "string" && (t = document.querySelector(t)), !t || !t.nodeName)
    throw new Error("no element is specified to initialize PerfectScrollbar");
  this.element = t, t.classList.add(ze.main), this.settings = LT();
  for (var o in n)
    this.settings[o] = n[o];
  this.containerWidth = null, this.containerHeight = null, this.contentWidth = null, this.contentHeight = null;
  var a = function() {
    return t.classList.add(ze.state.focus);
  }, i = function() {
    return t.classList.remove(ze.state.focus);
  };
  this.isRtl = Wt(t).direction === "rtl", this.isRtl === !0 && t.classList.add(ze.rtl), this.isNegativeScroll = function() {
    var c = t.scrollLeft, u = null;
    return t.scrollLeft = -1, u = t.scrollLeft < 0, t.scrollLeft = c, u;
  }(), this.negativeScrollAdjustment = this.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, this.event = new no(), this.ownerDocument = t.ownerDocument || document, this.scrollbarXRail = Ea(ze.element.rail("x")), t.appendChild(this.scrollbarXRail), this.scrollbarX = Ea(ze.element.thumb("x")), this.scrollbarXRail.appendChild(this.scrollbarX), this.scrollbarX.setAttribute("tabindex", 0), this.event.bind(this.scrollbarX, "focus", a), this.event.bind(this.scrollbarX, "blur", i), this.scrollbarXActive = null, this.scrollbarXWidth = null, this.scrollbarXLeft = null;
  var l = Wt(this.scrollbarXRail);
  this.scrollbarXBottom = parseInt(l.bottom, 10), isNaN(this.scrollbarXBottom) ? (this.isScrollbarXUsingBottom = !1, this.scrollbarXTop = Ve(l.top)) : this.isScrollbarXUsingBottom = !0, this.railBorderXWidth = Ve(l.borderLeftWidth) + Ve(l.borderRightWidth), gt(this.scrollbarXRail, { display: "block" }), this.railXMarginWidth = Ve(l.marginLeft) + Ve(l.marginRight), gt(this.scrollbarXRail, { display: "" }), this.railXWidth = null, this.railXRatio = null, this.scrollbarYRail = Ea(ze.element.rail("y")), t.appendChild(this.scrollbarYRail), this.scrollbarY = Ea(ze.element.thumb("y")), this.scrollbarYRail.appendChild(this.scrollbarY), this.scrollbarY.setAttribute("tabindex", 0), this.event.bind(this.scrollbarY, "focus", a), this.event.bind(this.scrollbarY, "blur", i), this.scrollbarYActive = null, this.scrollbarYHeight = null, this.scrollbarYTop = null;
  var s = Wt(this.scrollbarYRail);
  this.scrollbarYRight = parseInt(s.right, 10), isNaN(this.scrollbarYRight) ? (this.isScrollbarYUsingRight = !1, this.scrollbarYLeft = Ve(s.left)) : this.isScrollbarYUsingRight = !0, this.scrollbarYOuterWidth = this.isRtl ? IT(this.scrollbarY) : null, this.railBorderYWidth = Ve(s.borderTopWidth) + Ve(s.borderBottomWidth), gt(this.scrollbarYRail, { display: "block" }), this.railYMarginHeight = Ve(s.marginTop) + Ve(s.marginBottom), gt(this.scrollbarYRail, { display: "" }), this.railYHeight = null, this.railYRatio = null, this.reach = {
    x: t.scrollLeft <= 0 ? "start" : t.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null,
    y: t.scrollTop <= 0 ? "start" : t.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null
  }, this.isAlive = !0, this.settings.handlers.forEach(function(c) {
    return RT[c](r);
  }), this.lastScrollTop = Math.floor(t.scrollTop), this.lastScrollLeft = t.scrollLeft, this.event.bind(this.element, "scroll", function(c) {
    return r.onScroll(c);
  }), hn(this);
};
Qo.prototype.update = function() {
  this.isAlive && (this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0, gt(this.scrollbarXRail, { display: "block" }), gt(this.scrollbarYRail, { display: "block" }), this.railXMarginWidth = Ve(Wt(this.scrollbarXRail).marginLeft) + Ve(Wt(this.scrollbarXRail).marginRight), this.railYMarginHeight = Ve(Wt(this.scrollbarYRail).marginTop) + Ve(Wt(this.scrollbarYRail).marginBottom), gt(this.scrollbarXRail, { display: "none" }), gt(this.scrollbarYRail, { display: "none" }), hn(this), Za(this, "top", 0, !1, !0), Za(this, "left", 0, !1, !0), gt(this.scrollbarXRail, { display: "" }), gt(this.scrollbarYRail, { display: "" }));
};
Qo.prototype.onScroll = function(t) {
  this.isAlive && (hn(this), Za(this, "top", this.element.scrollTop - this.lastScrollTop), Za(
    this,
    "left",
    this.element.scrollLeft - this.lastScrollLeft
  ), this.lastScrollTop = Math.floor(this.element.scrollTop), this.lastScrollLeft = this.element.scrollLeft);
};
Qo.prototype.destroy = function() {
  this.isAlive && (this.event.unbindAll(), Mr(this.scrollbarX), Mr(this.scrollbarY), Mr(this.scrollbarXRail), Mr(this.scrollbarYRail), this.removePsClasses(), this.element = null, this.scrollbarX = null, this.scrollbarY = null, this.scrollbarXRail = null, this.scrollbarYRail = null, this.isAlive = !1);
};
Qo.prototype.removePsClasses = function() {
  this.element.className = this.element.className.split(" ").filter(function(t) {
    return !t.match(/^ps([-_].+|)$/);
  }).join(" ");
};
const MT = {}, xT = {
  fill: "none",
  height: "16",
  viewBox: "0 0 16 16",
  width: "16",
  xmlns: "http://www.w3.org/2000/svg"
}, BT = /* @__PURE__ */ q("path", {
  "clip-rule": "evenodd",
  d: "M10.25 6C10.25 7.24264 9.24264 8.25 8 8.25C6.75736 8.25 5.75 7.24264 5.75 6C5.75 4.75736 6.75736 3.75 8 3.75C9.24264 3.75 10.25 4.75736 10.25 6ZM11 6C11 7.65685 9.65685 9 8 9C6.34315 9 5 7.65685 5 6C5 4.34315 6.34315 3 8 3C9.65685 3 11 4.34315 11 6ZM6.5 10.125C4.91218 10.125 3.625 11.4122 3.625 13C3.625 13.2071 3.79289 13.375 4 13.375C4.20711 13.375 4.375 13.2071 4.375 13C4.375 11.8264 5.3264 10.875 6.5 10.875H9.5C10.6736 10.875 11.625 11.8264 11.625 13C11.625 13.2071 11.7929 13.375 12 13.375C12.2071 13.375 12.375 13.2071 12.375 13C12.375 11.4122 11.0878 10.125 9.5 10.125H6.5Z",
  fill: "currentColor",
  "fill-rule": "evenodd"
}, null, -1), VT = [
  BT
];
function UT(e, t) {
  return U(), X("svg", xT, VT);
}
const FT = /* @__PURE__ */ ge(MT, [["render", UT]]), HT = ["disabled"], YT = { class: "th-time-option__time" }, jT = {
  key: 0,
  class: "th-time-option__date"
}, WT = {
  key: 0,
  class: "th-time-option__capacity"
}, qT = {
  key: 1,
  class: "th-time-option__price"
}, zT = /* @__PURE__ */ pe({
  __name: "TimeslotComponent",
  props: {
    displayCapacity: { type: Boolean },
    isActive: { type: Boolean },
    isCombo: { type: Boolean },
    isNight: { type: Boolean, default: !1 },
    timeslot: {}
  },
  setup(e) {
    const t = e, n = te(() => ue(t.timeslot.dateTime).format("DD/MM/YYYY"));
    return (r, o) => (U(), X("button", {
      class: be([{
        "th-time-option_active": t.isActive,
        "th-time-option_combo": t.isCombo,
        "th-time-option_disabled": !r.timeslot.isAvailable,
        "th-time-option_open": r.timeslot.isOpen
      }, "th-time-option"]),
      disabled: !r.timeslot.isAvailable
    }, [
      q("span", YT, [
        Ge(ae(r.timeslot.humanizedTime) + " ", 1),
        t.isNight ? (U(), X("span", jT, " (" + ae(n.value) + ") ", 1)) : se("", !0)
      ]),
      t.displayCapacity ? (U(), X("span", WT, [
        z(FT),
        Ge(" " + ae(r.timeslot.capacity), 1)
      ])) : se("", !0),
      r.timeslot.isDynamic && r.timeslot.price ? (U(), X("span", qT, [
        z(ct, {
          amount: r.timeslot.price
        }, null, 8, ["amount"])
      ])) : se("", !0)
    ], 10, HT));
  }
}), Wu = /* @__PURE__ */ ge(zT, [["__scopeId", "data-v-a44c6f0e"]]), GT = { class: "th-timeslots__divider" }, XT = /* @__PURE__ */ pe({
  __name: "TimeslotPicker",
  props: {
    item: {},
    product: {}
  },
  emits: ["selectTimeslot"],
  setup(e, { emit: t }) {
    const { t: n } = De(), r = e, o = t, a = Q(null), i = (l) => {
      r.item.selectTimeslot(l), r.product.selectDate(ue(l.dateTime).toDate()), o("selectTimeslot");
    };
    return Ke(() => {
      new Qo(a.value, {
        suppressScrollX: !0
      });
    }), (l, s) => (U(), X("div", {
      ref_key: "scrollbar",
      ref: a,
      class: "th-timeslots"
    }, [
      (U(!0), X(Oe, null, it(r.item.dayTimeslots(r.product.selectedDate), (c) => (U(), de(Wu, {
        key: c.id,
        "display-capacity": r.item.displayCapacity,
        "is-active": !!(r.item.selectedTimeslot && c.id === r.item.selectedTimeslot.id),
        "is-combo": r.product.isCombo,
        timeslot: c,
        onClick: Ye((u) => i(c), ["prevent"])
      }, null, 8, ["display-capacity", "is-active", "is-combo", "timeslot", "onClick"]))), 128)),
      r.item.nightTimeslots(r.product.selectedDate).length ? (U(), X(Oe, { key: 0 }, [
        q("span", GT, ae(W(n)("calendar.afterMidnightsSlots")), 1),
        (U(!0), X(Oe, null, it(r.item.nightTimeslots(
          r.product.selectedDate
        ), (c) => (U(), de(Wu, {
          key: c.id,
          "display-capacity": r.item.displayCapacity,
          "is-active": !!(r.item.selectedTimeslot && c.id === r.item.selectedTimeslot.id),
          "is-combo": r.product.isCombo,
          "is-night": !0,
          timeslot: c,
          onClick: Ye((u) => i(c), ["prevent"])
        }, null, 8, ["display-capacity", "is-active", "is-combo", "timeslot", "onClick"]))), 128))
      ], 64)) : se("", !0)
    ], 512));
  }
}), js = /* @__PURE__ */ ge(XT, [["__scopeId", "data-v-efb3de87"]]);
var Qa;
((e) => {
  e.mobile = 500, e.isMobile = () => window ? window.innerWidth <= e.mobile : !1, e.isDesktop = () => !(0, e.isMobile)();
})(Qa || (Qa = {}));
const KT = { class: "single-select" }, JT = { class: "single-select__content" }, ZT = { class: "single-select__tabs" }, QT = { class: "th-option-select__placeholder" }, eS = { class: "th-option-select__placeholder-title" }, tS = { class: "th-option-select__placeholder" }, nS = { class: "th-option-select__placeholder-title" }, rS = { class: "single-select__tabs-content" }, oS = {
  key: 0,
  class: "single-select__tabs-content"
}, aS = {
  key: 1,
  class: "single-select__tabs-content"
}, iS = /* @__PURE__ */ pe({
  __name: "SingleCalendarComponent",
  props: {
    product: {},
    isUpsell: { type: Boolean, default: !1 },
    tabsContent: {}
  },
  setup(e, { expose: t }) {
    const n = Q(null), r = e, o = Q(0), a = (l) => {
      var s;
      o.value = l, (s = n.value) == null || s.showOption(!0);
    }, i = () => {
      var l;
      (l = n.value) == null || l.showOption(!1);
    };
    return t({ openTab: a }), (l, s) => (U(), X("div", KT, [
      z(jt, {
        ref_key: "select",
        ref: n,
        "icon-is-shown": !1,
        "selected-option-title": r.tabsContent[0].selectedOptionTitle,
        "show-header": !1,
        title: r.tabsContent[0].title,
        "title-is-black": r.tabsContent[0].isBlack,
        onClick: s[4] || (s[4] = Ye((c) => a(0), ["prevent"]))
      }, {
        default: we(() => [
          q("div", JT, [
            q("div", ZT, [
              q("div", {
                class: be([{ "single-select__tab_active": o.value === 0 }, "single-select__tab"]),
                onClick: s[0] || (s[0] = Ye((c) => a(0), ["stop"]))
              }, [
                q("div", QT, [
                  q("div", eS, ae(r.tabsContent[0].title), 1),
                  q("div", {
                    class: be([{
                      "th-option-select__placeholder-value_black": r.tabsContent[0].isBlack
                    }, "th-option-select__placeholder-value"])
                  }, ae(r.tabsContent[0].selectedOptionTitle), 3)
                ])
              ], 2),
              q("div", {
                class: be([{ "single-select__tab_active": o.value === 1 }, "single-select__tab"]),
                onClick: s[1] || (s[1] = Ye((c) => a(1), ["stop"]))
              }, [
                q("div", tS, [
                  q("div", nS, ae(r.tabsContent[1].title), 1),
                  q("div", {
                    class: be([{
                      "th-option-select__placeholder-value_black": r.tabsContent[1].isBlack
                    }, "th-option-select__placeholder-value"])
                  }, ae(r.tabsContent[1].selectedOptionTitle), 3)
                ])
              ], 2)
            ]),
            q("div", rS, [
              o.value === 0 ? (U(), X("div", oS, [
                z($a, {
                  "is-upsell": r.isUpsell,
                  product: r.product,
                  onDateSelect: s[2] || (s[2] = (c) => a(1))
                }, null, 8, ["is-upsell", "product"])
              ])) : se("", !0),
              o.value === 1 ? (U(), X("div", aS, [
                z(js, {
                  item: r.product.showedItems[0],
                  product: r.product,
                  onClick: s[3] || (s[3] = Ye(() => {
                  }, ["stop"])),
                  onSelectTimeslot: i
                }, null, 8, ["item", "product"])
              ])) : se("", !0)
            ])
          ])
        ]),
        _: 1
      }, 8, ["selected-option-title", "title", "title-is-black"]),
      z(jt, {
        "icon-is-shown": !1,
        "is-enabled": !1,
        "selected-option-title": r.tabsContent[1].selectedOptionTitle,
        "show-header": !1,
        title: r.tabsContent[1].title,
        "title-is-black": r.tabsContent[1].isBlack,
        onClickCapture: s[5] || (s[5] = Ye((c) => a(1), ["prevent", "stop"]))
      }, null, 8, ["selected-option-title", "title", "title-is-black"])
    ]));
  }
}), sS = /* @__PURE__ */ ge(iS, [["__scopeId", "data-v-4f801f64"]]), lS = {
  key: 0,
  class: "th-calendar-wrapper"
}, cS = {
  key: 0,
  class: "th-calendar"
}, uS = { class: "th-timeslot-container" }, dS = {
  key: 0,
  class: "th-timeslot-title"
}, fS = {
  key: 2,
  class: "th-calendar-wrapper th-calendar-wrapper_column"
}, pS = { class: "th-timeslot-container th-timeslot-container_combo" }, hS = /* @__PURE__ */ pe({
  __name: "CalendarComponent",
  props: {
    product: {},
    isActive: { type: Boolean, default: !0 },
    isUpsell: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const { t: n } = De(), { isMobile: r } = Qa, o = e, a = Q([]), i = Q(null), l = te(() => {
      var p;
      return (p = o.product) != null && p.selectedDate ? ue(o.product.selectedDate).format("DD/MM/YYYY") : n("calendar.selectDate");
    }), s = () => {
      a.value[0].showOption(!1);
    }, c = () => {
      d.value || f();
    }, u = () => {
      d.value && (s(), f());
    }, f = () => {
      var g, m;
      if (i.value) {
        (g = o.product) != null && g.selectedDate ? i.value.openTab(1) : i.value.openTab(0);
        return;
      }
      let p = (m = o.product) == null ? void 0 : m.showedItems.findIndex((h) => !h.selectedTimeslot);
      p === -1 && (p = 0), p++, a.value[p].showOption(!0);
    }, d = te(() => r() || o.isUpsell), v = te(() => {
      var p, g, m, h;
      return [
        {
          title: n("calendar.date"),
          selectedOptionTitle: l.value,
          isBlack: !!((p = o.product) != null && p.selectedDate)
        },
        {
          title: n("calendar.selectTime"),
          selectedOptionTitle: (g = o.product) != null && g.items[0].selectedTimeslot ? (m = o.product) == null ? void 0 : m.items[0].selectedTimeslot.humanizedTime : n("calendar.selectTime"),
          isBlack: !!((h = o.product) != null && h.items[0].selectedTimeslot)
        }
      ];
    });
    return t({ openTimeslotPicker: f }), (p, g) => {
      var m;
      return o.product ? o.product.isSingle ? (U(), X("div", {
        key: 1,
        class: be([{ "th-calendar-wrapper_upsell": o.isUpsell }, "th-calendar-wrapper th-calendar-wrapper_single"])
      }, [
        d.value ? (U(), de(sS, {
          key: 0,
          ref_key: "singleComponent",
          ref: i,
          "is-upsell": o.isUpsell,
          product: o.product,
          "tabs-content": v.value
        }, null, 8, ["is-upsell", "product", "tabs-content"])) : (U(), X(Oe, { key: 1 }, [
          z(jt, {
            ref: (h) => a.value.push(h),
            "icon-is-shown": !1,
            "is-active": o.isActive,
            "is-calendar": !0,
            "is-enabled": d.value,
            "selected-option-title": l.value,
            title: W(n)("calendar.date"),
            "title-is-black": !!o.product.selectedDate,
            onClick: Ye(c, ["prevent"])
          }, {
            default: we(() => [
              z($a, {
                "is-enabled": d.value,
                "is-upsell": o.isUpsell,
                product: o.product,
                onDateSelect: u
              }, null, 8, ["is-enabled", "is-upsell", "product"])
            ]),
            _: 1
          }, 8, ["is-active", "is-enabled", "selected-option-title", "title", "title-is-black"]),
          (U(!0), X(Oe, null, it(o.product.items, (h) => (U(), de(jt, {
            key: h.id,
            ref_for: !0,
            ref: (y) => a.value.push(y),
            "extended-header-title": W(n)("calendar.selectTime"),
            "icon-is-shown": !1,
            "is-active": o.isActive,
            "is-calendar": !0,
            "selected-option-title": h.selectedTimeslot ? h.selectedTimeslot.humanizedTime : W(n)("calendar.selectTime"),
            title: W(n)("calendar.time"),
            "title-is-black": !!h.selectedTimeslot
          }, {
            default: we(() => {
              var y;
              return [
                o.isActive ? (U(), X("div", cS, [
                  d.value ? se("", !0) : (U(), de($a, {
                    key: 0,
                    "is-upsell": o.isUpsell,
                    product: o.product
                  }, null, 8, ["is-upsell", "product"])),
                  q("div", uS, [
                    d.value ? se("", !0) : (U(), X("div", dS, ae(W(n)("calendar.selectTimeslot")), 1)),
                    z(js, {
                      item: (y = o.product) == null ? void 0 : y.showedItems[0],
                      product: o.product,
                      onSelectTimeslot: g[0] || (g[0] = () => a.value[1].showOption(!1))
                    }, null, 8, ["item", "product"])
                  ])
                ])) : se("", !0)
              ];
            }),
            _: 2
          }, 1032, ["extended-header-title", "is-active", "selected-option-title", "title", "title-is-black"]))), 128))
        ], 64))
      ], 2)) : (U(), X("div", fS, [
        z(jt, {
          ref: (h) => {
            h && (a.value[0] = h);
          },
          "extended-header-title": W(n)("calendar.selectDate"),
          "icon-is-shown": !1,
          "is-active": o.isActive,
          "is-calendar": !0,
          "selected-option-title": l.value,
          title: W(n)("calendar.date"),
          "title-is-black": o.isActive
        }, {
          default: we(() => [
            o.isActive ? (U(), de($a, {
              key: 0,
              "is-upsell": o.isUpsell,
              product: o.product,
              onHideSelect: s
            }, null, 8, ["is-upsell", "product"])) : se("", !0)
          ]),
          _: 1
        }, 8, ["extended-header-title", "is-active", "selected-option-title", "title", "title-is-black"]),
        (U(!0), X(Oe, null, it((m = o.product) == null ? void 0 : m.showedItems, (h, y) => (U(), de(jt, {
          key: h.id,
          ref_for: !0,
          ref: (w) => {
            w && (a.value[y + 1] = w);
          },
          "icon-is-shown": !1,
          "is-active": o.isActive,
          "selected-option-title": h.selectedTimeslot ? h.selectedTimeslot.humanizedTime : W(n)("calendar.pickATimeslot"),
          title: h.name,
          "title-is-black": !!h.selectedTimeslot
        }, {
          default: we(() => [
            q("div", pS, [
              z(js, {
                item: h,
                product: o.product,
                onSelectTimeslot: () => a.value[y + 1].showOption(!1)
              }, null, 8, ["item", "product", "onSelectTimeslot"])
            ])
          ]),
          _: 2
        }, 1032, ["is-active", "selected-option-title", "title", "title-is-black"]))), 128))
      ])) : (U(), X("div", lS, [
        z(jt, {
          ref: (h) => a.value.push(h),
          "icon-is-shown": !1,
          "is-active": o.isActive,
          "is-calendar": !0,
          "is-enabled": d.value,
          "selected-option-title": l.value,
          title: W(n)("calendar.date"),
          onClick: Ye(c, ["prevent"])
        }, null, 8, ["is-active", "is-enabled", "selected-option-title", "title"])
      ]));
    };
  }
}), Ws = /* @__PURE__ */ ge(hS, [["__scopeId", "data-v-3913c7fa"]]), nm = (e) => (zo("data-v-69430df4"), e = e(), Go(), e), mS = { class: "th-option" }, vS = { class: "th-option__info" }, gS = { class: "th-option__title" }, yS = { class: "th-option__info" }, _S = { class: "th-option__counter" }, bS = ["disabled"], ES = /* @__PURE__ */ nm(() => /* @__PURE__ */ q("svg", {
  fill: "none",
  height: "2",
  viewBox: "0 0 14 2",
  width: "16",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ q("path", {
    "clip-rule": "evenodd",
    d: `M0 0.899805C0 0.568434 0.268629 0.299805 0.6 0.299805L13.4 0.299805C13.7314 0.299805
          14 0.568434 14 0.899805C14 1.23118 13.7314 1.4998 13.4 1.4998L0.6 1.4998C0.268629
          1.4998 0 1.23118 0 0.899805Z`,
    fill: "currentColor",
    "fill-rule": "evenodd"
  })
], -1)), wS = [
  ES
], CS = ["disabled"], TS = /* @__PURE__ */ nm(() => /* @__PURE__ */ q("svg", {
  fill: "none",
  height: "16",
  viewBox: "0 0 10 10",
  width: "16",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ q("path", {
    "clip-rule": "evenodd",
    d: `M5.30768 0.6C5.30768 0.372183 5.123 0.1875 4.89518 0.1875C4.66736 0.1875
          4.48268 0.372183 4.48268 0.6V4.58743H0.529688C0.30187 4.58743 0.117188
          4.77212 0.117188 4.99993C0.117188 5.22775 0.30187 5.41243 0.529688
          5.41243H4.48268V9.4C4.48268 9.62782 4.66736 9.8125 4.89518 9.8125C5.123
          9.8125 5.30768 9.62782 5.30768 9.4V5.41243H9.46719C9.695 5.41243 9.87969
          5.22775 9.87969 4.99993C9.87969 4.77212 9.695 4.58743 9.46719
          4.58743H5.30768V0.6Z`,
    fill: "currentColor",
    "fill-rule": "evenodd"
  })
], -1)), SS = [
  TS
], kS = /* @__PURE__ */ pe({
  __name: "OptionCounter",
  props: {
    value: { default: 0 },
    minValue: { default: 0 },
    maxValue: { default: 10 },
    title: {},
    description: { default: null },
    isGrey: { type: Boolean, default: !1 },
    info: {}
  },
  emits: ["update:value"],
  setup(e, { emit: t }) {
    const n = Q(0), r = Q(0), o = e, a = t, i = te(() => o.value <= o.minValue), l = te(() => o.value >= o.maxValue), s = (u = !1) => {
      a("update:value", u ? o.value + 1 : o.value - 1), r.value = window.setTimeout(() => {
        n.value = window.setInterval(() => {
          u && !l.value || !u && !i.value ? a("update:value", u ? o.value + 1 : o.value - 1) : c();
        }, 100);
      }, 500);
    }, c = () => {
      clearTimeout(r.value), clearInterval(n.value);
    };
    return (u, f) => (U(), X("div", mS, [
      q("div", vS, [
        q("div", gS, ae(u.title), 1),
        u.description ? (U(), X("div", {
          key: 0,
          class: be([{ "th-option__description_grey": u.isGrey }, "th-option__description"])
        }, ae(u.description), 3)) : se("", !0)
      ]),
      q("div", yS, ae(u.info), 1),
      q("div", _S, [
        q("button", {
          disabled: i.value,
          class: "th-option__counter-btn",
          type: "button",
          onClick: f[0] || (f[0] = Ye(() => {
          }, ["prevent"])),
          onMousedown: f[1] || (f[1] = Ye((d) => s(!1), ["prevent"])),
          onMouseup: Ye(c, ["prevent"]),
          onMouseleave: Ye(c, ["prevent"])
        }, wS, 40, bS),
        q("div", {
          class: be([{ "th-option__counter-value_disabled": u.value === 0 }, "th-option__counter-value"])
        }, ae(u.value), 3),
        q("button", {
          disabled: l.value,
          class: "th-option__counter-btn",
          type: "button",
          onClick: f[2] || (f[2] = Ye(() => {
          }, ["prevent"])),
          onMousedown: f[3] || (f[3] = Ye((d) => s(!0), ["prevent"])),
          onMouseup: Ye(c, ["prevent"]),
          onMouseleave: Ye(c, ["prevent"])
        }, SS, 40, CS)
      ])
    ]));
  }
}), rm = /* @__PURE__ */ ge(kS, [["__scopeId", "data-v-69430df4"]]), IS = {
  key: 0,
  class: "visitors-options"
}, OS = /* @__PURE__ */ pe({
  __name: "VisitorsSelector",
  props: {
    product: {},
    disabled: { type: Boolean, default: !0 },
    isActive: { type: Boolean, default: !0 }
  },
  setup(e, { expose: t }) {
    const n = kl(), { t: r } = De(), o = Q(null), a = e, i = (f) => {
      var d, v;
      return ((v = (d = a.product) == null ? void 0 : d.availableCategories.find(
        (p) => p.itemCategoryId === f.itemCategoryId
      )) == null ? void 0 : v.quantity) ?? 0;
    }, l = (f) => {
      var d;
      return ((d = a.product) == null ? void 0 : d.categoryAvailableCapacity(f)) ?? 0;
    };
    a.isActive && Le(
      () => {
        var f;
        return (f = a.product) == null ? void 0 : f.availableCapacity;
      },
      () => {
        var f;
        (f = a.product) == null || f.availableCategories.forEach((d) => {
          i(d) > l(d) && (d.quantity = l(d));
        });
      }
    );
    const s = te(() => {
      var f;
      return a.product ? (f = a.product) == null ? void 0 : f.selectedVisitorsTitle : r("options.whoIsGoing");
    }), c = (f) => te(() => n(a.product.getCategoryPrice(f)));
    return t({ open: () => te(() => {
      var f;
      return (f = o.value) == null ? void 0 : f.showOption();
    }).value }), (f, d) => (U(), de(jt, {
      ref_key: "selectElement",
      ref: o,
      "is-active": !f.disabled,
      "selected-option-title": s.value,
      title: W(r)("options.guests"),
      "title-is-black": a.isActive && !!a.product.selectedVisitorsCount
    }, {
      default: we(() => [
        a.isActive ? (U(), X("div", IS, [
          (U(!0), X(Oe, null, it(a.product.availableCategories, (v) => (U(), X(Oe, {
            key: v.itemCategoryId
          }, [
            a.product.isCategoryAvailableForBooking(v) ? (U(), de(rm, {
              key: 0,
              info: c(v.itemCategoryId).value,
              "max-value": l(v),
              title: W(r)(`options.${v.itemCategoryName}`.toLowerCase()),
              value: i(v),
              "onUpdate:value": (p) => v.quantity = p
            }, null, 8, ["info", "max-value", "title", "value", "onUpdate:value"])) : se("", !0)
          ], 64))), 128))
        ])) : se("", !0)
      ]),
      _: 1
    }, 8, ["is-active", "selected-option-title", "title", "title-is-black"]));
  }
}), qu = /* @__PURE__ */ ge(OS, [["__scopeId", "data-v-eda92be1"]]), DS = { class: "meals-options" }, PS = {
  key: 0,
  class: "meals-options__text"
}, AS = /* @__PURE__ */ pe({
  __name: "MealsSelector",
  props: {
    product: {},
    disabled: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const { t: n } = De(), r = e, o = Q(null), a = te(() => {
      const l = r.product.selectedVisitorsCount - r.product.selectedMealsCount;
      return n("options.mealsLeftWarning", l);
    });
    return Le(
      () => r.product.isMealsCountEqualsVisitorsCount,
      (l) => {
        var s;
        l && ((s = o.value) == null || s.showOption(!1));
      }
    ), t({ open: () => te(() => {
      var l;
      return (l = o.value) == null ? void 0 : l.showOption();
    }).value }), (l, s) => (U(), de(jt, {
      ref_key: "selectElement",
      ref: o,
      "is-active": !l.disabled,
      "selected-option-title": r.product.selectedOptionsTitle,
      "title-is-black": r.product.selectedMealsCount > 0,
      title: "Extras"
    }, {
      default: we(() => [
        q("div", DS, [
          (U(!0), X(Oe, null, it(r.product.options, (c) => (U(), de(rm, {
            key: c.id,
            "max-value": r.product.mealMaxValue(c),
            title: c.description,
            value: c.quantity,
            "onUpdate:value": (u) => c.quantity = u
          }, null, 8, ["max-value", "title", "value", "onUpdate:value"]))), 128))
        ]),
        r.product.isMealsCountEqualsVisitorsCount ? se("", !0) : (U(), X("div", PS, ae(a.value), 1))
      ]),
      _: 1
    }, 8, ["is-active", "selected-option-title", "title-is-black"]));
  }
}), $S = /* @__PURE__ */ ge(AS, [["__scopeId", "data-v-018b279a"]]);
var vr;
((e) => {
  e.getQueryParamFromString = (t, n) => {
    t = t.substring(1);
    const r = t.split("&");
    for (let o = 0; o < r.length; o++) {
      const a = r[o].split("=");
      if (decodeURIComponent(a[0]) === n)
        return decodeURIComponent(a[1]);
    }
  }, e.linkReplace = (t) => {
    var l;
    const n = window.location.pathname;
    let r = t.getAttribute("href");
    if (!r)
      return;
    r = new URL(r).pathname;
    const o = r.split("/")[1];
    let a = n.split(
      `/${(l = window.ticketHub) == null ? void 0 : l.language}/`
    )[1];
    typeof a > "u" && (a = n), a.startsWith("/") || (a = `/${a}`);
    const i = new URL(
      `${o}${a}`,
      window.location.origin
    );
    t.setAttribute("href", i.href), t.dataset.replaced = "true";
  }, e.replaceLangSwitcher = (t = ".lang-modal__list", n = "a") => {
    var a;
    if (typeof ((a = window.ticketHub) == null ? void 0 : a.language) > "u")
      return;
    const r = document.querySelector(t);
    if (!r)
      return;
    const o = r.querySelectorAll(n);
    !o || o.length === 0 || o.forEach((i) => {
      (0, e.linkReplace)(i);
    });
  };
})(vr || (vr = {}));
const NS = {}, Ii = (e) => (zo("data-v-188a412b"), e = e(), Go(), e), LS = { class: "th-skeleton__wrapper" }, RS = /* @__PURE__ */ Ii(() => /* @__PURE__ */ q("p", { class: "th-skeleton__select th-skeleton" }, null, -1)), MS = /* @__PURE__ */ Ii(() => /* @__PURE__ */ q("p", { class: "th-skeleton__select th-skeleton" }, null, -1)), xS = /* @__PURE__ */ Ii(() => /* @__PURE__ */ q("p", { class: "th-skeleton__prices th-skeleton" }, null, -1)), BS = /* @__PURE__ */ Ii(() => /* @__PURE__ */ q("p", { class: "th-skeleton__button th-skeleton" }, null, -1)), VS = [
  RS,
  MS,
  xS,
  BS
];
function US(e, t) {
  return U(), X("div", LS, VS);
}
const FS = /* @__PURE__ */ ge(NS, [["render", US], ["__scopeId", "data-v-188a412b"]]);
var HS = Error, YS = EvalError, jS = RangeError, WS = ReferenceError, om = SyntaxError, ea = TypeError, qS = URIError, zS = function() {
  if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
    return !1;
  if (typeof Symbol.iterator == "symbol")
    return !0;
  var t = {}, n = Symbol("test"), r = Object(n);
  if (typeof n == "string" || Object.prototype.toString.call(n) !== "[object Symbol]" || Object.prototype.toString.call(r) !== "[object Symbol]")
    return !1;
  var o = 42;
  t[n] = o;
  for (n in t)
    return !1;
  if (typeof Object.keys == "function" && Object.keys(t).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(t).length !== 0)
    return !1;
  var a = Object.getOwnPropertySymbols(t);
  if (a.length !== 1 || a[0] !== n || !Object.prototype.propertyIsEnumerable.call(t, n))
    return !1;
  if (typeof Object.getOwnPropertyDescriptor == "function") {
    var i = Object.getOwnPropertyDescriptor(t, n);
    if (i.value !== o || i.enumerable !== !0)
      return !1;
  }
  return !0;
}, zu = typeof Symbol < "u" && Symbol, GS = zS, XS = function() {
  return typeof zu != "function" || typeof Symbol != "function" || typeof zu("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : GS();
}, es = {
  __proto__: null,
  foo: {}
}, KS = Object, JS = function() {
  return { __proto__: es }.foo === es.foo && !(es instanceof KS);
}, ZS = "Function.prototype.bind called on incompatible ", QS = Object.prototype.toString, ek = Math.max, tk = "[object Function]", Gu = function(t, n) {
  for (var r = [], o = 0; o < t.length; o += 1)
    r[o] = t[o];
  for (var a = 0; a < n.length; a += 1)
    r[a + t.length] = n[a];
  return r;
}, nk = function(t, n) {
  for (var r = [], o = n || 0, a = 0; o < t.length; o += 1, a += 1)
    r[a] = t[o];
  return r;
}, rk = function(e, t) {
  for (var n = "", r = 0; r < e.length; r += 1)
    n += e[r], r + 1 < e.length && (n += t);
  return n;
}, ok = function(t) {
  var n = this;
  if (typeof n != "function" || QS.apply(n) !== tk)
    throw new TypeError(ZS + n);
  for (var r = nk(arguments, 1), o, a = function() {
    if (this instanceof o) {
      var u = n.apply(
        this,
        Gu(r, arguments)
      );
      return Object(u) === u ? u : this;
    }
    return n.apply(
      t,
      Gu(r, arguments)
    );
  }, i = ek(0, n.length - r.length), l = [], s = 0; s < i; s++)
    l[s] = "$" + s;
  if (o = Function("binder", "return function (" + rk(l, ",") + "){ return binder.apply(this,arguments); }")(a), n.prototype) {
    var c = function() {
    };
    c.prototype = n.prototype, o.prototype = new c(), c.prototype = null;
  }
  return o;
}, ak = ok, Fl = Function.prototype.bind || ak, ik = Function.prototype.call, sk = Object.prototype.hasOwnProperty, lk = Fl, ck = lk.call(ik, sk), Ee, uk = HS, dk = YS, fk = jS, pk = WS, zr = om, Vr = ea, hk = qS, am = Function, ts = function(e) {
  try {
    return am('"use strict"; return (' + e + ").constructor;")();
  } catch {
  }
}, sr = Object.getOwnPropertyDescriptor;
if (sr)
  try {
    sr({}, "");
  } catch {
    sr = null;
  }
var ns = function() {
  throw new Vr();
}, mk = sr ? function() {
  try {
    return arguments.callee, ns;
  } catch {
    try {
      return sr(arguments, "callee").get;
    } catch {
      return ns;
    }
  }
}() : ns, kr = XS(), vk = JS(), et = Object.getPrototypeOf || (vk ? function(e) {
  return e.__proto__;
} : null), Ar = {}, gk = typeof Uint8Array > "u" || !et ? Ee : et(Uint8Array), lr = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? Ee : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? Ee : ArrayBuffer,
  "%ArrayIteratorPrototype%": kr && et ? et([][Symbol.iterator]()) : Ee,
  "%AsyncFromSyncIteratorPrototype%": Ee,
  "%AsyncFunction%": Ar,
  "%AsyncGenerator%": Ar,
  "%AsyncGeneratorFunction%": Ar,
  "%AsyncIteratorPrototype%": Ar,
  "%Atomics%": typeof Atomics > "u" ? Ee : Atomics,
  "%BigInt%": typeof BigInt > "u" ? Ee : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? Ee : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? Ee : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? Ee : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": uk,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": dk,
  "%Float32Array%": typeof Float32Array > "u" ? Ee : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? Ee : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? Ee : FinalizationRegistry,
  "%Function%": am,
  "%GeneratorFunction%": Ar,
  "%Int8Array%": typeof Int8Array > "u" ? Ee : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? Ee : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? Ee : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": kr && et ? et(et([][Symbol.iterator]())) : Ee,
  "%JSON%": typeof JSON == "object" ? JSON : Ee,
  "%Map%": typeof Map > "u" ? Ee : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !kr || !et ? Ee : et((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? Ee : Promise,
  "%Proxy%": typeof Proxy > "u" ? Ee : Proxy,
  "%RangeError%": fk,
  "%ReferenceError%": pk,
  "%Reflect%": typeof Reflect > "u" ? Ee : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? Ee : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !kr || !et ? Ee : et((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? Ee : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": kr && et ? et(""[Symbol.iterator]()) : Ee,
  "%Symbol%": kr ? Symbol : Ee,
  "%SyntaxError%": zr,
  "%ThrowTypeError%": mk,
  "%TypedArray%": gk,
  "%TypeError%": Vr,
  "%Uint8Array%": typeof Uint8Array > "u" ? Ee : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? Ee : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? Ee : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? Ee : Uint32Array,
  "%URIError%": hk,
  "%WeakMap%": typeof WeakMap > "u" ? Ee : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? Ee : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? Ee : WeakSet
};
if (et)
  try {
    null.error;
  } catch (e) {
    var yk = et(et(e));
    lr["%Error.prototype%"] = yk;
  }
var _k = function e(t) {
  var n;
  if (t === "%AsyncFunction%")
    n = ts("async function () {}");
  else if (t === "%GeneratorFunction%")
    n = ts("function* () {}");
  else if (t === "%AsyncGeneratorFunction%")
    n = ts("async function* () {}");
  else if (t === "%AsyncGenerator%") {
    var r = e("%AsyncGeneratorFunction%");
    r && (n = r.prototype);
  } else if (t === "%AsyncIteratorPrototype%") {
    var o = e("%AsyncGenerator%");
    o && et && (n = et(o.prototype));
  }
  return lr[t] = n, n;
}, Xu = {
  __proto__: null,
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
}, ta = Fl, ei = ck, bk = ta.call(Function.call, Array.prototype.concat), Ek = ta.call(Function.apply, Array.prototype.splice), Ku = ta.call(Function.call, String.prototype.replace), ti = ta.call(Function.call, String.prototype.slice), wk = ta.call(Function.call, RegExp.prototype.exec), Ck = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, Tk = /\\(\\)?/g, Sk = function(t) {
  var n = ti(t, 0, 1), r = ti(t, -1);
  if (n === "%" && r !== "%")
    throw new zr("invalid intrinsic syntax, expected closing `%`");
  if (r === "%" && n !== "%")
    throw new zr("invalid intrinsic syntax, expected opening `%`");
  var o = [];
  return Ku(t, Ck, function(a, i, l, s) {
    o[o.length] = l ? Ku(s, Tk, "$1") : i || a;
  }), o;
}, kk = function(t, n) {
  var r = t, o;
  if (ei(Xu, r) && (o = Xu[r], r = "%" + o[0] + "%"), ei(lr, r)) {
    var a = lr[r];
    if (a === Ar && (a = _k(r)), typeof a > "u" && !n)
      throw new Vr("intrinsic " + t + " exists, but is not available. Please file an issue!");
    return {
      alias: o,
      name: r,
      value: a
    };
  }
  throw new zr("intrinsic " + t + " does not exist!");
}, ro = function(t, n) {
  if (typeof t != "string" || t.length === 0)
    throw new Vr("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof n != "boolean")
    throw new Vr('"allowMissing" argument must be a boolean');
  if (wk(/^%?[^%]*%?$/, t) === null)
    throw new zr("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var r = Sk(t), o = r.length > 0 ? r[0] : "", a = kk("%" + o + "%", n), i = a.name, l = a.value, s = !1, c = a.alias;
  c && (o = c[0], Ek(r, bk([0, 1], c)));
  for (var u = 1, f = !0; u < r.length; u += 1) {
    var d = r[u], v = ti(d, 0, 1), p = ti(d, -1);
    if ((v === '"' || v === "'" || v === "`" || p === '"' || p === "'" || p === "`") && v !== p)
      throw new zr("property names with quotes must have matching quotes");
    if ((d === "constructor" || !f) && (s = !0), o += "." + d, i = "%" + o + "%", ei(lr, i))
      l = lr[i];
    else if (l != null) {
      if (!(d in l)) {
        if (!n)
          throw new Vr("base intrinsic for " + t + " exists, but the property is not available.");
        return;
      }
      if (sr && u + 1 >= r.length) {
        var g = sr(l, d);
        f = !!g, f && "get" in g && !("originalValue" in g.get) ? l = g.get : l = l[d];
      } else
        f = ei(l, d), l = l[d];
      f && !s && (lr[i] = l);
    }
  }
  return l;
}, im = { exports: {} }, rs, Ju;
function Hl() {
  if (Ju)
    return rs;
  Ju = 1;
  var e = ro, t = e("%Object.defineProperty%", !0) || !1;
  if (t)
    try {
      t({}, "a", { value: 1 });
    } catch {
      t = !1;
    }
  return rs = t, rs;
}
var Ik = ro, Na = Ik("%Object.getOwnPropertyDescriptor%", !0);
if (Na)
  try {
    Na([], "length");
  } catch {
    Na = null;
  }
var sm = Na, Zu = Hl(), Ok = om, Ir = ea, Qu = sm, Dk = function(t, n, r) {
  if (!t || typeof t != "object" && typeof t != "function")
    throw new Ir("`obj` must be an object or a function`");
  if (typeof n != "string" && typeof n != "symbol")
    throw new Ir("`property` must be a string or a symbol`");
  if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
    throw new Ir("`nonEnumerable`, if provided, must be a boolean or null");
  if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
    throw new Ir("`nonWritable`, if provided, must be a boolean or null");
  if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
    throw new Ir("`nonConfigurable`, if provided, must be a boolean or null");
  if (arguments.length > 6 && typeof arguments[6] != "boolean")
    throw new Ir("`loose`, if provided, must be a boolean");
  var o = arguments.length > 3 ? arguments[3] : null, a = arguments.length > 4 ? arguments[4] : null, i = arguments.length > 5 ? arguments[5] : null, l = arguments.length > 6 ? arguments[6] : !1, s = !!Qu && Qu(t, n);
  if (Zu)
    Zu(t, n, {
      configurable: i === null && s ? s.configurable : !i,
      enumerable: o === null && s ? s.enumerable : !o,
      value: r,
      writable: a === null && s ? s.writable : !a
    });
  else if (l || !o && !a && !i)
    t[n] = r;
  else
    throw new Ok("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, qs = Hl(), lm = function() {
  return !!qs;
};
lm.hasArrayLengthDefineBug = function() {
  if (!qs)
    return null;
  try {
    return qs([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var Pk = lm, Ak = ro, ed = Dk, $k = Pk(), td = sm, nd = ea, Nk = Ak("%Math.floor%"), Lk = function(t, n) {
  if (typeof t != "function")
    throw new nd("`fn` is not a function");
  if (typeof n != "number" || n < 0 || n > 4294967295 || Nk(n) !== n)
    throw new nd("`length` must be a positive 32-bit integer");
  var r = arguments.length > 2 && !!arguments[2], o = !0, a = !0;
  if ("length" in t && td) {
    var i = td(t, "length");
    i && !i.configurable && (o = !1), i && !i.writable && (a = !1);
  }
  return (o || a || !r) && ($k ? ed(
    /** @type {Parameters<define>[0]} */
    t,
    "length",
    n,
    !0,
    !0
  ) : ed(
    /** @type {Parameters<define>[0]} */
    t,
    "length",
    n
  )), t;
};
(function(e) {
  var t = Fl, n = ro, r = Lk, o = ea, a = n("%Function.prototype.apply%"), i = n("%Function.prototype.call%"), l = n("%Reflect.apply%", !0) || t.call(i, a), s = Hl(), c = n("%Math.max%");
  e.exports = function(d) {
    if (typeof d != "function")
      throw new o("a function is required");
    var v = l(t, i, arguments);
    return r(
      v,
      1 + c(0, d.length - (arguments.length - 1)),
      !0
    );
  };
  var u = function() {
    return l(t, a, arguments);
  };
  s ? s(e.exports, "apply", { value: u }) : e.exports.apply = u;
})(im);
var Rk = im.exports, cm = ro, um = Rk, Mk = um(cm("String.prototype.indexOf")), xk = function(t, n) {
  var r = cm(t, !!n);
  return typeof r == "function" && Mk(t, ".prototype.") > -1 ? um(r) : r;
};
const Bk = {}, Vk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bk
}, Symbol.toStringTag, { value: "Module" })), Uk = /* @__PURE__ */ jv(Vk);
var Yl = typeof Map == "function" && Map.prototype, os = Object.getOwnPropertyDescriptor && Yl ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, ni = Yl && os && typeof os.get == "function" ? os.get : null, rd = Yl && Map.prototype.forEach, jl = typeof Set == "function" && Set.prototype, as = Object.getOwnPropertyDescriptor && jl ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, ri = jl && as && typeof as.get == "function" ? as.get : null, od = jl && Set.prototype.forEach, Fk = typeof WeakMap == "function" && WeakMap.prototype, Eo = Fk ? WeakMap.prototype.has : null, Hk = typeof WeakSet == "function" && WeakSet.prototype, wo = Hk ? WeakSet.prototype.has : null, Yk = typeof WeakRef == "function" && WeakRef.prototype, ad = Yk ? WeakRef.prototype.deref : null, jk = Boolean.prototype.valueOf, Wk = Object.prototype.toString, qk = Function.prototype.toString, zk = String.prototype.match, Wl = String.prototype.slice, Dn = String.prototype.replace, Gk = String.prototype.toUpperCase, id = String.prototype.toLowerCase, dm = RegExp.prototype.test, sd = Array.prototype.concat, Ht = Array.prototype.join, Xk = Array.prototype.slice, ld = Math.floor, zs = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, is = Object.getOwnPropertySymbols, Gs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, Gr = typeof Symbol == "function" && typeof Symbol.iterator == "object", dt = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === Gr || !0) ? Symbol.toStringTag : null, fm = Object.prototype.propertyIsEnumerable, cd = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(e) {
  return e.__proto__;
} : null);
function ud(e, t) {
  if (e === 1 / 0 || e === -1 / 0 || e !== e || e && e > -1e3 && e < 1e3 || dm.call(/e/, t))
    return t;
  var n = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof e == "number") {
    var r = e < 0 ? -ld(-e) : ld(e);
    if (r !== e) {
      var o = String(r), a = Wl.call(t, o.length + 1);
      return Dn.call(o, n, "$&_") + "." + Dn.call(Dn.call(a, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return Dn.call(t, n, "$&_");
}
var Xs = Uk, dd = Xs.custom, fd = hm(dd) ? dd : null, Kk = function e(t, n, r, o) {
  var a = n || {};
  if (Tn(a, "quoteStyle") && a.quoteStyle !== "single" && a.quoteStyle !== "double")
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  if (Tn(a, "maxStringLength") && (typeof a.maxStringLength == "number" ? a.maxStringLength < 0 && a.maxStringLength !== 1 / 0 : a.maxStringLength !== null))
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  var i = Tn(a, "customInspect") ? a.customInspect : !0;
  if (typeof i != "boolean" && i !== "symbol")
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  if (Tn(a, "indent") && a.indent !== null && a.indent !== "	" && !(parseInt(a.indent, 10) === a.indent && a.indent > 0))
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  if (Tn(a, "numericSeparator") && typeof a.numericSeparator != "boolean")
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  var l = a.numericSeparator;
  if (typeof t > "u")
    return "undefined";
  if (t === null)
    return "null";
  if (typeof t == "boolean")
    return t ? "true" : "false";
  if (typeof t == "string")
    return vm(t, a);
  if (typeof t == "number") {
    if (t === 0)
      return 1 / 0 / t > 0 ? "0" : "-0";
    var s = String(t);
    return l ? ud(t, s) : s;
  }
  if (typeof t == "bigint") {
    var c = String(t) + "n";
    return l ? ud(t, c) : c;
  }
  var u = typeof a.depth > "u" ? 5 : a.depth;
  if (typeof r > "u" && (r = 0), r >= u && u > 0 && typeof t == "object")
    return Ks(t) ? "[Array]" : "[Object]";
  var f = hI(a, r);
  if (typeof o > "u")
    o = [];
  else if (mm(o, t) >= 0)
    return "[Circular]";
  function d(x, B, N) {
    if (B && (o = Xk.call(o), o.push(B)), N) {
      var V = {
        depth: a.depth
      };
      return Tn(a, "quoteStyle") && (V.quoteStyle = a.quoteStyle), e(x, V, r + 1, o);
    }
    return e(x, a, r + 1, o);
  }
  if (typeof t == "function" && !pd(t)) {
    var v = aI(t), p = Ca(t, d);
    return "[Function" + (v ? ": " + v : " (anonymous)") + "]" + (p.length > 0 ? " { " + Ht.call(p, ", ") + " }" : "");
  }
  if (hm(t)) {
    var g = Gr ? Dn.call(String(t), /^(Symbol\(.*\))_[^)]*$/, "$1") : Gs.call(t);
    return typeof t == "object" && !Gr ? fo(g) : g;
  }
  if (dI(t)) {
    for (var m = "<" + id.call(String(t.nodeName)), h = t.attributes || [], y = 0; y < h.length; y++)
      m += " " + h[y].name + "=" + pm(Jk(h[y].value), "double", a);
    return m += ">", t.childNodes && t.childNodes.length && (m += "..."), m += "</" + id.call(String(t.nodeName)) + ">", m;
  }
  if (Ks(t)) {
    if (t.length === 0)
      return "[]";
    var w = Ca(t, d);
    return f && !pI(w) ? "[" + Js(w, f) + "]" : "[ " + Ht.call(w, ", ") + " ]";
  }
  if (Qk(t)) {
    var O = Ca(t, d);
    return !("cause" in Error.prototype) && "cause" in t && !fm.call(t, "cause") ? "{ [" + String(t) + "] " + Ht.call(sd.call("[cause]: " + d(t.cause), O), ", ") + " }" : O.length === 0 ? "[" + String(t) + "]" : "{ [" + String(t) + "] " + Ht.call(O, ", ") + " }";
  }
  if (typeof t == "object" && i) {
    if (fd && typeof t[fd] == "function" && Xs)
      return Xs(t, { depth: u - r });
    if (i !== "symbol" && typeof t.inspect == "function")
      return t.inspect();
  }
  if (iI(t)) {
    var $ = [];
    return rd && rd.call(t, function(x, B) {
      $.push(d(B, t, !0) + " => " + d(x, t));
    }), hd("Map", ni.call(t), $, f);
  }
  if (cI(t)) {
    var C = [];
    return od && od.call(t, function(x) {
      C.push(d(x, t));
    }), hd("Set", ri.call(t), C, f);
  }
  if (sI(t))
    return ss("WeakMap");
  if (uI(t))
    return ss("WeakSet");
  if (lI(t))
    return ss("WeakRef");
  if (tI(t))
    return fo(d(Number(t)));
  if (rI(t))
    return fo(d(zs.call(t)));
  if (nI(t))
    return fo(jk.call(t));
  if (eI(t))
    return fo(d(String(t)));
  if (typeof window < "u" && t === window)
    return "{ [object Window] }";
  if (t === Yt)
    return "{ [object globalThis] }";
  if (!Zk(t) && !pd(t)) {
    var b = Ca(t, d), E = cd ? cd(t) === Object.prototype : t instanceof Object || t.constructor === Object, k = t instanceof Object ? "" : "null prototype", _ = !E && dt && Object(t) === t && dt in t ? Wl.call(Xn(t), 8, -1) : k ? "Object" : "", S = E || typeof t.constructor != "function" ? "" : t.constructor.name ? t.constructor.name + " " : "", A = S + (_ || k ? "[" + Ht.call(sd.call([], _ || [], k || []), ": ") + "] " : "");
    return b.length === 0 ? A + "{}" : f ? A + "{" + Js(b, f) + "}" : A + "{ " + Ht.call(b, ", ") + " }";
  }
  return String(t);
};
function pm(e, t, n) {
  var r = (n.quoteStyle || t) === "double" ? '"' : "'";
  return r + e + r;
}
function Jk(e) {
  return Dn.call(String(e), /"/g, "&quot;");
}
function Ks(e) {
  return Xn(e) === "[object Array]" && (!dt || !(typeof e == "object" && dt in e));
}
function Zk(e) {
  return Xn(e) === "[object Date]" && (!dt || !(typeof e == "object" && dt in e));
}
function pd(e) {
  return Xn(e) === "[object RegExp]" && (!dt || !(typeof e == "object" && dt in e));
}
function Qk(e) {
  return Xn(e) === "[object Error]" && (!dt || !(typeof e == "object" && dt in e));
}
function eI(e) {
  return Xn(e) === "[object String]" && (!dt || !(typeof e == "object" && dt in e));
}
function tI(e) {
  return Xn(e) === "[object Number]" && (!dt || !(typeof e == "object" && dt in e));
}
function nI(e) {
  return Xn(e) === "[object Boolean]" && (!dt || !(typeof e == "object" && dt in e));
}
function hm(e) {
  if (Gr)
    return e && typeof e == "object" && e instanceof Symbol;
  if (typeof e == "symbol")
    return !0;
  if (!e || typeof e != "object" || !Gs)
    return !1;
  try {
    return Gs.call(e), !0;
  } catch {
  }
  return !1;
}
function rI(e) {
  if (!e || typeof e != "object" || !zs)
    return !1;
  try {
    return zs.call(e), !0;
  } catch {
  }
  return !1;
}
var oI = Object.prototype.hasOwnProperty || function(e) {
  return e in this;
};
function Tn(e, t) {
  return oI.call(e, t);
}
function Xn(e) {
  return Wk.call(e);
}
function aI(e) {
  if (e.name)
    return e.name;
  var t = zk.call(qk.call(e), /^function\s*([\w$]+)/);
  return t ? t[1] : null;
}
function mm(e, t) {
  if (e.indexOf)
    return e.indexOf(t);
  for (var n = 0, r = e.length; n < r; n++)
    if (e[n] === t)
      return n;
  return -1;
}
function iI(e) {
  if (!ni || !e || typeof e != "object")
    return !1;
  try {
    ni.call(e);
    try {
      ri.call(e);
    } catch {
      return !0;
    }
    return e instanceof Map;
  } catch {
  }
  return !1;
}
function sI(e) {
  if (!Eo || !e || typeof e != "object")
    return !1;
  try {
    Eo.call(e, Eo);
    try {
      wo.call(e, wo);
    } catch {
      return !0;
    }
    return e instanceof WeakMap;
  } catch {
  }
  return !1;
}
function lI(e) {
  if (!ad || !e || typeof e != "object")
    return !1;
  try {
    return ad.call(e), !0;
  } catch {
  }
  return !1;
}
function cI(e) {
  if (!ri || !e || typeof e != "object")
    return !1;
  try {
    ri.call(e);
    try {
      ni.call(e);
    } catch {
      return !0;
    }
    return e instanceof Set;
  } catch {
  }
  return !1;
}
function uI(e) {
  if (!wo || !e || typeof e != "object")
    return !1;
  try {
    wo.call(e, wo);
    try {
      Eo.call(e, Eo);
    } catch {
      return !0;
    }
    return e instanceof WeakSet;
  } catch {
  }
  return !1;
}
function dI(e) {
  return !e || typeof e != "object" ? !1 : typeof HTMLElement < "u" && e instanceof HTMLElement ? !0 : typeof e.nodeName == "string" && typeof e.getAttribute == "function";
}
function vm(e, t) {
  if (e.length > t.maxStringLength) {
    var n = e.length - t.maxStringLength, r = "... " + n + " more character" + (n > 1 ? "s" : "");
    return vm(Wl.call(e, 0, t.maxStringLength), t) + r;
  }
  var o = Dn.call(Dn.call(e, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, fI);
  return pm(o, "single", t);
}
function fI(e) {
  var t = e.charCodeAt(0), n = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[t];
  return n ? "\\" + n : "\\x" + (t < 16 ? "0" : "") + Gk.call(t.toString(16));
}
function fo(e) {
  return "Object(" + e + ")";
}
function ss(e) {
  return e + " { ? }";
}
function hd(e, t, n, r) {
  var o = r ? Js(n, r) : Ht.call(n, ", ");
  return e + " (" + t + ") {" + o + "}";
}
function pI(e) {
  for (var t = 0; t < e.length; t++)
    if (mm(e[t], `
`) >= 0)
      return !1;
  return !0;
}
function hI(e, t) {
  var n;
  if (e.indent === "	")
    n = "	";
  else if (typeof e.indent == "number" && e.indent > 0)
    n = Ht.call(Array(e.indent + 1), " ");
  else
    return null;
  return {
    base: n,
    prev: Ht.call(Array(t + 1), n)
  };
}
function Js(e, t) {
  if (e.length === 0)
    return "";
  var n = `
` + t.prev + t.base;
  return n + Ht.call(e, "," + n) + `
` + t.prev;
}
function Ca(e, t) {
  var n = Ks(e), r = [];
  if (n) {
    r.length = e.length;
    for (var o = 0; o < e.length; o++)
      r[o] = Tn(e, o) ? t(e[o], e) : "";
  }
  var a = typeof is == "function" ? is(e) : [], i;
  if (Gr) {
    i = {};
    for (var l = 0; l < a.length; l++)
      i["$" + a[l]] = a[l];
  }
  for (var s in e)
    Tn(e, s) && (n && String(Number(s)) === s && s < e.length || Gr && i["$" + s] instanceof Symbol || (dm.call(/[^\w$]/, s) ? r.push(t(s, e) + ": " + t(e[s], e)) : r.push(s + ": " + t(e[s], e))));
  if (typeof is == "function")
    for (var c = 0; c < a.length; c++)
      fm.call(e, a[c]) && r.push("[" + t(a[c]) + "]: " + t(e[a[c]], e));
  return r;
}
var gm = ro, oo = xk, mI = Kk, vI = ea, Ta = gm("%WeakMap%", !0), Sa = gm("%Map%", !0), gI = oo("WeakMap.prototype.get", !0), yI = oo("WeakMap.prototype.set", !0), _I = oo("WeakMap.prototype.has", !0), bI = oo("Map.prototype.get", !0), EI = oo("Map.prototype.set", !0), wI = oo("Map.prototype.has", !0), ql = function(e, t) {
  for (var n = e, r; (r = n.next) !== null; n = r)
    if (r.key === t)
      return n.next = r.next, r.next = /** @type {NonNullable<typeof list.next>} */
      e.next, e.next = r, r;
}, CI = function(e, t) {
  var n = ql(e, t);
  return n && n.value;
}, TI = function(e, t, n) {
  var r = ql(e, t);
  r ? r.value = n : e.next = /** @type {import('.').ListNode<typeof value>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: t,
    next: e.next,
    value: n
  };
}, SI = function(e, t) {
  return !!ql(e, t);
}, kI = function() {
  var t, n, r, o = {
    assert: function(a) {
      if (!o.has(a))
        throw new vI("Side channel does not contain " + mI(a));
    },
    get: function(a) {
      if (Ta && a && (typeof a == "object" || typeof a == "function")) {
        if (t)
          return gI(t, a);
      } else if (Sa) {
        if (n)
          return bI(n, a);
      } else if (r)
        return CI(r, a);
    },
    has: function(a) {
      if (Ta && a && (typeof a == "object" || typeof a == "function")) {
        if (t)
          return _I(t, a);
      } else if (Sa) {
        if (n)
          return wI(n, a);
      } else if (r)
        return SI(r, a);
      return !1;
    },
    set: function(a, i) {
      Ta && a && (typeof a == "object" || typeof a == "function") ? (t || (t = new Ta()), yI(t, a, i)) : Sa ? (n || (n = new Sa()), EI(n, a, i)) : (r || (r = { key: {}, next: null }), TI(r, a, i));
    }
  };
  return o;
}, II = String.prototype.replace, OI = /%20/g, ls = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, zl = {
  default: ls.RFC3986,
  formatters: {
    RFC1738: function(e) {
      return II.call(e, OI, "+");
    },
    RFC3986: function(e) {
      return String(e);
    }
  },
  RFC1738: ls.RFC1738,
  RFC3986: ls.RFC3986
}, DI = zl, cs = Object.prototype.hasOwnProperty, nr = Array.isArray, Ut = function() {
  for (var e = [], t = 0; t < 256; ++t)
    e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
  return e;
}(), PI = function(t) {
  for (; t.length > 1; ) {
    var n = t.pop(), r = n.obj[n.prop];
    if (nr(r)) {
      for (var o = [], a = 0; a < r.length; ++a)
        typeof r[a] < "u" && o.push(r[a]);
      n.obj[n.prop] = o;
    }
  }
}, ym = function(t, n) {
  for (var r = n && n.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o = 0; o < t.length; ++o)
    typeof t[o] < "u" && (r[o] = t[o]);
  return r;
}, AI = function e(t, n, r) {
  if (!n)
    return t;
  if (typeof n != "object") {
    if (nr(t))
      t.push(n);
    else if (t && typeof t == "object")
      (r && (r.plainObjects || r.allowPrototypes) || !cs.call(Object.prototype, n)) && (t[n] = !0);
    else
      return [t, n];
    return t;
  }
  if (!t || typeof t != "object")
    return [t].concat(n);
  var o = t;
  return nr(t) && !nr(n) && (o = ym(t, r)), nr(t) && nr(n) ? (n.forEach(function(a, i) {
    if (cs.call(t, i)) {
      var l = t[i];
      l && typeof l == "object" && a && typeof a == "object" ? t[i] = e(l, a, r) : t.push(a);
    } else
      t[i] = a;
  }), t) : Object.keys(n).reduce(function(a, i) {
    var l = n[i];
    return cs.call(a, i) ? a[i] = e(a[i], l, r) : a[i] = l, a;
  }, o);
}, $I = function(t, n) {
  return Object.keys(n).reduce(function(r, o) {
    return r[o] = n[o], r;
  }, t);
}, NI = function(e, t, n) {
  var r = e.replace(/\+/g, " ");
  if (n === "iso-8859-1")
    return r.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(r);
  } catch {
    return r;
  }
}, us = 1024, LI = function(t, n, r, o, a) {
  if (t.length === 0)
    return t;
  var i = t;
  if (typeof t == "symbol" ? i = Symbol.prototype.toString.call(t) : typeof t != "string" && (i = String(t)), r === "iso-8859-1")
    return escape(i).replace(/%u[0-9a-f]{4}/gi, function(v) {
      return "%26%23" + parseInt(v.slice(2), 16) + "%3B";
    });
  for (var l = "", s = 0; s < i.length; s += us) {
    for (var c = i.length >= us ? i.slice(s, s + us) : i, u = [], f = 0; f < c.length; ++f) {
      var d = c.charCodeAt(f);
      if (d === 45 || d === 46 || d === 95 || d === 126 || d >= 48 && d <= 57 || d >= 65 && d <= 90 || d >= 97 && d <= 122 || a === DI.RFC1738 && (d === 40 || d === 41)) {
        u[u.length] = c.charAt(f);
        continue;
      }
      if (d < 128) {
        u[u.length] = Ut[d];
        continue;
      }
      if (d < 2048) {
        u[u.length] = Ut[192 | d >> 6] + Ut[128 | d & 63];
        continue;
      }
      if (d < 55296 || d >= 57344) {
        u[u.length] = Ut[224 | d >> 12] + Ut[128 | d >> 6 & 63] + Ut[128 | d & 63];
        continue;
      }
      f += 1, d = 65536 + ((d & 1023) << 10 | c.charCodeAt(f) & 1023), u[u.length] = Ut[240 | d >> 18] + Ut[128 | d >> 12 & 63] + Ut[128 | d >> 6 & 63] + Ut[128 | d & 63];
    }
    l += u.join("");
  }
  return l;
}, RI = function(t) {
  for (var n = [{ obj: { o: t }, prop: "o" }], r = [], o = 0; o < n.length; ++o)
    for (var a = n[o], i = a.obj[a.prop], l = Object.keys(i), s = 0; s < l.length; ++s) {
      var c = l[s], u = i[c];
      typeof u == "object" && u !== null && r.indexOf(u) === -1 && (n.push({ obj: i, prop: c }), r.push(u));
    }
  return PI(n), t;
}, MI = function(t) {
  return Object.prototype.toString.call(t) === "[object RegExp]";
}, xI = function(t) {
  return !t || typeof t != "object" ? !1 : !!(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t));
}, BI = function(t, n) {
  return [].concat(t, n);
}, VI = function(t, n) {
  if (nr(t)) {
    for (var r = [], o = 0; o < t.length; o += 1)
      r.push(n(t[o]));
    return r;
  }
  return n(t);
}, _m = {
  arrayToObject: ym,
  assign: $I,
  combine: BI,
  compact: RI,
  decode: NI,
  encode: LI,
  isBuffer: xI,
  isRegExp: MI,
  maybeMap: VI,
  merge: AI
}, bm = kI, La = _m, Co = zl, UI = Object.prototype.hasOwnProperty, Em = {
  brackets: function(t) {
    return t + "[]";
  },
  comma: "comma",
  indices: function(t, n) {
    return t + "[" + n + "]";
  },
  repeat: function(t) {
    return t;
  }
}, Ft = Array.isArray, FI = Array.prototype.push, wm = function(e, t) {
  FI.apply(e, Ft(t) ? t : [t]);
}, HI = Date.prototype.toISOString, md = Co.default, Je = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: La.encode,
  encodeValuesOnly: !1,
  format: md,
  formatter: Co.formatters[md],
  // deprecated
  indices: !1,
  serializeDate: function(t) {
    return HI.call(t);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, YI = function(t) {
  return typeof t == "string" || typeof t == "number" || typeof t == "boolean" || typeof t == "symbol" || typeof t == "bigint";
}, ds = {}, jI = function e(t, n, r, o, a, i, l, s, c, u, f, d, v, p, g, m, h, y) {
  for (var w = t, O = y, $ = 0, C = !1; (O = O.get(ds)) !== void 0 && !C; ) {
    var b = O.get(t);
    if ($ += 1, typeof b < "u") {
      if (b === $)
        throw new RangeError("Cyclic object value");
      C = !0;
    }
    typeof O.get(ds) > "u" && ($ = 0);
  }
  if (typeof u == "function" ? w = u(n, w) : w instanceof Date ? w = v(w) : r === "comma" && Ft(w) && (w = La.maybeMap(w, function(M) {
    return M instanceof Date ? v(M) : M;
  })), w === null) {
    if (i)
      return c && !m ? c(n, Je.encoder, h, "key", p) : n;
    w = "";
  }
  if (YI(w) || La.isBuffer(w)) {
    if (c) {
      var E = m ? n : c(n, Je.encoder, h, "key", p);
      return [g(E) + "=" + g(c(w, Je.encoder, h, "value", p))];
    }
    return [g(n) + "=" + g(String(w))];
  }
  var k = [];
  if (typeof w > "u")
    return k;
  var _;
  if (r === "comma" && Ft(w))
    m && c && (w = La.maybeMap(w, c)), _ = [{ value: w.length > 0 ? w.join(",") || null : void 0 }];
  else if (Ft(u))
    _ = u;
  else {
    var S = Object.keys(w);
    _ = f ? S.sort(f) : S;
  }
  var A = s ? n.replace(/\./g, "%2E") : n, x = o && Ft(w) && w.length === 1 ? A + "[]" : A;
  if (a && Ft(w) && w.length === 0)
    return x + "[]";
  for (var B = 0; B < _.length; ++B) {
    var N = _[B], V = typeof N == "object" && typeof N.value < "u" ? N.value : w[N];
    if (!(l && V === null)) {
      var G = d && s ? N.replace(/\./g, "%2E") : N, L = Ft(w) ? typeof r == "function" ? r(x, G) : x : x + (d ? "." + G : "[" + G + "]");
      y.set(t, $);
      var F = bm();
      F.set(ds, y), wm(k, e(
        V,
        L,
        r,
        o,
        a,
        i,
        l,
        s,
        r === "comma" && m && Ft(w) ? null : c,
        u,
        f,
        d,
        v,
        p,
        g,
        m,
        h,
        F
      ));
    }
  }
  return k;
}, WI = function(t) {
  if (!t)
    return Je;
  if (typeof t.allowEmptyArrays < "u" && typeof t.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof t.encodeDotInKeys < "u" && typeof t.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (t.encoder !== null && typeof t.encoder < "u" && typeof t.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var n = t.charset || Je.charset;
  if (typeof t.charset < "u" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var r = Co.default;
  if (typeof t.format < "u") {
    if (!UI.call(Co.formatters, t.format))
      throw new TypeError("Unknown format option provided.");
    r = t.format;
  }
  var o = Co.formatters[r], a = Je.filter;
  (typeof t.filter == "function" || Ft(t.filter)) && (a = t.filter);
  var i;
  if (t.arrayFormat in Em ? i = t.arrayFormat : "indices" in t ? i = t.indices ? "indices" : "repeat" : i = Je.arrayFormat, "commaRoundTrip" in t && typeof t.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  var l = typeof t.allowDots > "u" ? t.encodeDotInKeys === !0 ? !0 : Je.allowDots : !!t.allowDots;
  return {
    addQueryPrefix: typeof t.addQueryPrefix == "boolean" ? t.addQueryPrefix : Je.addQueryPrefix,
    allowDots: l,
    allowEmptyArrays: typeof t.allowEmptyArrays == "boolean" ? !!t.allowEmptyArrays : Je.allowEmptyArrays,
    arrayFormat: i,
    charset: n,
    charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : Je.charsetSentinel,
    commaRoundTrip: t.commaRoundTrip,
    delimiter: typeof t.delimiter > "u" ? Je.delimiter : t.delimiter,
    encode: typeof t.encode == "boolean" ? t.encode : Je.encode,
    encodeDotInKeys: typeof t.encodeDotInKeys == "boolean" ? t.encodeDotInKeys : Je.encodeDotInKeys,
    encoder: typeof t.encoder == "function" ? t.encoder : Je.encoder,
    encodeValuesOnly: typeof t.encodeValuesOnly == "boolean" ? t.encodeValuesOnly : Je.encodeValuesOnly,
    filter: a,
    format: r,
    formatter: o,
    serializeDate: typeof t.serializeDate == "function" ? t.serializeDate : Je.serializeDate,
    skipNulls: typeof t.skipNulls == "boolean" ? t.skipNulls : Je.skipNulls,
    sort: typeof t.sort == "function" ? t.sort : null,
    strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : Je.strictNullHandling
  };
}, qI = function(e, t) {
  var n = e, r = WI(t), o, a;
  typeof r.filter == "function" ? (a = r.filter, n = a("", n)) : Ft(r.filter) && (a = r.filter, o = a);
  var i = [];
  if (typeof n != "object" || n === null)
    return "";
  var l = Em[r.arrayFormat], s = l === "comma" && r.commaRoundTrip;
  o || (o = Object.keys(n)), r.sort && o.sort(r.sort);
  for (var c = bm(), u = 0; u < o.length; ++u) {
    var f = o[u];
    r.skipNulls && n[f] === null || wm(i, jI(
      n[f],
      f,
      l,
      s,
      r.allowEmptyArrays,
      r.strictNullHandling,
      r.skipNulls,
      r.encodeDotInKeys,
      r.encode ? r.encoder : null,
      r.filter,
      r.sort,
      r.allowDots,
      r.serializeDate,
      r.format,
      r.formatter,
      r.encodeValuesOnly,
      r.charset,
      c
    ));
  }
  var d = i.join(r.delimiter), v = r.addQueryPrefix === !0 ? "?" : "";
  return r.charsetSentinel && (r.charset === "iso-8859-1" ? v += "utf8=%26%2310003%3B&" : v += "utf8=%E2%9C%93&"), d.length > 0 ? v + d : "";
}, Xr = _m, Zs = Object.prototype.hasOwnProperty, zI = Array.isArray, He = {
  allowDots: !1,
  allowEmptyArrays: !1,
  allowPrototypes: !1,
  allowSparse: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decodeDotInKeys: !1,
  decoder: Xr.decode,
  delimiter: "&",
  depth: 5,
  duplicates: "combine",
  ignoreQueryPrefix: !1,
  interpretNumericEntities: !1,
  parameterLimit: 1e3,
  parseArrays: !0,
  plainObjects: !1,
  strictDepth: !1,
  strictNullHandling: !1
}, GI = function(e) {
  return e.replace(/&#(\d+);/g, function(t, n) {
    return String.fromCharCode(parseInt(n, 10));
  });
}, Cm = function(e, t) {
  return e && typeof e == "string" && t.comma && e.indexOf(",") > -1 ? e.split(",") : e;
}, XI = "utf8=%26%2310003%3B", KI = "utf8=%E2%9C%93", JI = function(t, n) {
  var r = { __proto__: null }, o = n.ignoreQueryPrefix ? t.replace(/^\?/, "") : t;
  o = o.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  var a = n.parameterLimit === 1 / 0 ? void 0 : n.parameterLimit, i = o.split(n.delimiter, a), l = -1, s, c = n.charset;
  if (n.charsetSentinel)
    for (s = 0; s < i.length; ++s)
      i[s].indexOf("utf8=") === 0 && (i[s] === KI ? c = "utf-8" : i[s] === XI && (c = "iso-8859-1"), l = s, s = i.length);
  for (s = 0; s < i.length; ++s)
    if (s !== l) {
      var u = i[s], f = u.indexOf("]="), d = f === -1 ? u.indexOf("=") : f + 1, v, p;
      d === -1 ? (v = n.decoder(u, He.decoder, c, "key"), p = n.strictNullHandling ? null : "") : (v = n.decoder(u.slice(0, d), He.decoder, c, "key"), p = Xr.maybeMap(
        Cm(u.slice(d + 1), n),
        function(m) {
          return n.decoder(m, He.decoder, c, "value");
        }
      )), p && n.interpretNumericEntities && c === "iso-8859-1" && (p = GI(p)), u.indexOf("[]=") > -1 && (p = zI(p) ? [p] : p);
      var g = Zs.call(r, v);
      g && n.duplicates === "combine" ? r[v] = Xr.combine(r[v], p) : (!g || n.duplicates === "last") && (r[v] = p);
    }
  return r;
}, ZI = function(e, t, n, r) {
  for (var o = r ? t : Cm(t, n), a = e.length - 1; a >= 0; --a) {
    var i, l = e[a];
    if (l === "[]" && n.parseArrays)
      i = n.allowEmptyArrays && (o === "" || n.strictNullHandling && o === null) ? [] : [].concat(o);
    else {
      i = n.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var s = l.charAt(0) === "[" && l.charAt(l.length - 1) === "]" ? l.slice(1, -1) : l, c = n.decodeDotInKeys ? s.replace(/%2E/g, ".") : s, u = parseInt(c, 10);
      !n.parseArrays && c === "" ? i = { 0: o } : !isNaN(u) && l !== c && String(u) === c && u >= 0 && n.parseArrays && u <= n.arrayLimit ? (i = [], i[u] = o) : c !== "__proto__" && (i[c] = o);
    }
    o = i;
  }
  return o;
}, QI = function(t, n, r, o) {
  if (t) {
    var a = r.allowDots ? t.replace(/\.([^.[]+)/g, "[$1]") : t, i = /(\[[^[\]]*])/, l = /(\[[^[\]]*])/g, s = r.depth > 0 && i.exec(a), c = s ? a.slice(0, s.index) : a, u = [];
    if (c) {
      if (!r.plainObjects && Zs.call(Object.prototype, c) && !r.allowPrototypes)
        return;
      u.push(c);
    }
    for (var f = 0; r.depth > 0 && (s = l.exec(a)) !== null && f < r.depth; ) {
      if (f += 1, !r.plainObjects && Zs.call(Object.prototype, s[1].slice(1, -1)) && !r.allowPrototypes)
        return;
      u.push(s[1]);
    }
    if (s) {
      if (r.strictDepth === !0)
        throw new RangeError("Input depth exceeded depth option of " + r.depth + " and strictDepth is true");
      u.push("[" + a.slice(s.index) + "]");
    }
    return ZI(u, n, r, o);
  }
}, eO = function(t) {
  if (!t)
    return He;
  if (typeof t.allowEmptyArrays < "u" && typeof t.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof t.decodeDotInKeys < "u" && typeof t.decodeDotInKeys != "boolean")
    throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
  if (t.decoder !== null && typeof t.decoder < "u" && typeof t.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof t.charset < "u" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var n = typeof t.charset > "u" ? He.charset : t.charset, r = typeof t.duplicates > "u" ? He.duplicates : t.duplicates;
  if (r !== "combine" && r !== "first" && r !== "last")
    throw new TypeError("The duplicates option must be either combine, first, or last");
  var o = typeof t.allowDots > "u" ? t.decodeDotInKeys === !0 ? !0 : He.allowDots : !!t.allowDots;
  return {
    allowDots: o,
    allowEmptyArrays: typeof t.allowEmptyArrays == "boolean" ? !!t.allowEmptyArrays : He.allowEmptyArrays,
    allowPrototypes: typeof t.allowPrototypes == "boolean" ? t.allowPrototypes : He.allowPrototypes,
    allowSparse: typeof t.allowSparse == "boolean" ? t.allowSparse : He.allowSparse,
    arrayLimit: typeof t.arrayLimit == "number" ? t.arrayLimit : He.arrayLimit,
    charset: n,
    charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : He.charsetSentinel,
    comma: typeof t.comma == "boolean" ? t.comma : He.comma,
    decodeDotInKeys: typeof t.decodeDotInKeys == "boolean" ? t.decodeDotInKeys : He.decodeDotInKeys,
    decoder: typeof t.decoder == "function" ? t.decoder : He.decoder,
    delimiter: typeof t.delimiter == "string" || Xr.isRegExp(t.delimiter) ? t.delimiter : He.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof t.depth == "number" || t.depth === !1 ? +t.depth : He.depth,
    duplicates: r,
    ignoreQueryPrefix: t.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof t.interpretNumericEntities == "boolean" ? t.interpretNumericEntities : He.interpretNumericEntities,
    parameterLimit: typeof t.parameterLimit == "number" ? t.parameterLimit : He.parameterLimit,
    parseArrays: t.parseArrays !== !1,
    plainObjects: typeof t.plainObjects == "boolean" ? t.plainObjects : He.plainObjects,
    strictDepth: typeof t.strictDepth == "boolean" ? !!t.strictDepth : He.strictDepth,
    strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : He.strictNullHandling
  };
}, tO = function(e, t) {
  var n = eO(t);
  if (e === "" || e === null || typeof e > "u")
    return n.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var r = typeof e == "string" ? JI(e, n) : e, o = n.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, a = Object.keys(r), i = 0; i < a.length; ++i) {
    var l = a[i], s = QI(l, r[l], n, typeof e == "string");
    o = Xr.merge(o, s, n);
  }
  return n.allowSparse === !0 ? o : Xr.compact(o);
}, nO = qI, rO = tO, oO = zl, aO = {
  formats: oO,
  parse: rO,
  stringify: nO
};
const iO = /* @__PURE__ */ _r(aO), sO = {
  key: 1,
  class: "th-product__wrapper"
}, lO = { class: "th-product__options" }, cO = { class: "th-product__footer" }, uO = {
  key: 0,
  class: "th-product__footer-row"
}, dO = { class: "th-product__footer-title th-up-lg:hidden" }, fO = { class: "th-product__prices" }, pO = {
  key: 0,
  class: "th-product__prices-title"
}, hO = {
  key: 1,
  class: "th-product__price th-product__price_old th-down-lg:hidden"
}, mO = { class: "th-product__price th-product__price_current" }, vO = { class: "th-product__actions" }, gO = { class: "th-product__options" }, yO = { class: "th-product__footer" }, _O = { class: "th-product__footer-row" }, bO = { class: "th-product__footer-title th-up-lg:hidden" }, EO = {
  key: 0,
  class: "th-product__prices"
}, wO = {
  key: 0,
  class: "th-product__prices-title"
}, CO = {
  key: 1,
  class: "th-product__price th-product__price_old th-down-lg:hidden"
}, TO = { class: "th-product__price th-product__price_current" }, SO = { class: "th-product__actions" }, kO = ["innerHTML"], IO = /* @__PURE__ */ pe({
  __name: "BookingComponent",
  props: {
    product: {},
    hideBookNowButton: { type: Boolean, default: !1 },
    hidePrices: { type: Boolean, default: !1 },
    upsell: { type: Boolean, default: !1 }
  },
  emits: ["loaded", "booked", "priceIsChanged"],
  setup(e, { emit: t }) {
    const { localizedTitle: n } = Ao, r = Q(null), o = Q(null), a = Q(null), i = Q(!1), l = mi(), s = bi(), c = Q(null), { showToast: u, showErrorToast: f } = br(), d = Q(!0), v = e, p = t, { t: g, locale: m } = De(), h = async (_ = /* @__PURE__ */ new Date()) => {
      try {
        if (!c.value)
          return;
        d.value = !0;
        const S = await mr.getProductBookingData(
          c.value,
          ue(_).format("YYYY-MM-DD")
        );
        await c.value.setBookingData(S);
      } catch {
      } finally {
        p("loaded"), d.value = !1;
      }
    };
    Le(
      () => c.value && c.value.price,
      () => {
        c.value && v.hidePrices && p("priceIsChanged", {
          old: c.value.calculatedOldPrice,
          current: c.value.price,
          isHasDynamicPrices: c.value.hasDynamicPrices
        });
      }
    );
    const y = (_) => {
      var A;
      const S = ue(_);
      S.isValid() && ((A = c.value) == null || A.selectDate(S.toDate()));
    }, w = () => iO.parse(window.location.search.slice(1), {
      decoder(_) {
        if (/^(\d+|\d*\.\d+)$/.test(_))
          return parseFloat(_);
        const S = {
          true: !0,
          false: !1,
          null: null,
          undefined: void 0
        };
        return _ in S ? S[_] : _;
      }
    }), O = (_) => {
      c.value && Array.isArray(_) && _.forEach((S) => {
        var x;
        if (!Number.isInteger(S.id) || !Number.isInteger(S.count) || S.count <= 0)
          return;
        const A = (x = c.value) == null ? void 0 : x.availableCategories.find(
          (B) => B.itemCategoryId === S.id
        );
        typeof A > "u" || (A.quantity = S.count);
      });
    }, $ = () => {
      const _ = w();
      typeof _.filter > "u" || !_.filter || c.value && typeof _.date < "u" && y(_.date);
    };
    Ke(async () => {
      typeof window.ticketHub < "u" && (window.ticketHub.selectVariant = E), setTimeout(async () => {
        var A;
        const _ = vr.getQueryParamFromString(
          window.location.search,
          "cartItemId"
        );
        c.value = await Rn.getProduct(v.product);
        const S = w();
        if (c.value && c.value.isSellable) {
          typeof _ < "u" && ((A = c.value) == null || A.loadCartItem(_));
          let x = c.value.selectedDate;
          $(), c.value.isEdit && (x = ue(c.value.selectedDate).startOf("month").toDate()), await h(x), typeof S.guests < "u" && O(S.guests), await jr.viewItem(c.value);
          return;
        }
        p("loaded"), d.value = !1;
      }, 0);
    });
    const C = te(() => {
      var _, S;
      return (_ = c.value) != null && _.isOpen ? !0 : (S = c.value) == null ? void 0 : S.isTimeslotsAreSelected;
    }), b = te(() => {
      var _, S;
      return ((_ = c.value) == null ? void 0 : _.isTimeslotsAreSelected) && ((S = c.value) == null ? void 0 : S.isVisitorsAreSelected);
    }), E = async (_) => {
      var S, A, x, B, N;
      if (((A = (S = c.value) == null ? void 0 : S.selectedVariant) == null ? void 0 : A.itemId) !== _) {
        d.value = !0, c.value = await Rn.getProduct({
          ...v.product,
          itemId: _
        });
        const V = vr.getQueryParamFromString(
          window.location.search,
          "cartItemId"
        );
        typeof V < "u" && ((x = c.value) == null || x.loadCartItem(V)), (B = c.value) == null || B.selectVariant(_), await h(), (N = c.value) == null || N.selectVariant(_);
      }
    }, k = async (_ = !1) => {
      var S, A, x, B, N, V, G, L, F;
      try {
        if (!((S = c.value) != null && S.isTimeslotsAreSelected) && r.value)
          return r.value.openTimeslotPicker(), !1;
        if (!((A = c.value) != null && A.isVisitorsAreSelected) && o.value)
          return o.value.open(), !1;
        if (!((x = c.value) != null && x.isMealsCountEqualsVisitorsCount) && a.value)
          return a.value.open(), !1;
        const M = (B = c.value) != null && B.isEdit ? "toast.productHasBeenUpdated" : "toast.productHasBeenAdded";
        if (i.value = !0, await ((N = c.value) == null ? void 0 : N.addToCart()), u(g(M)), setTimeout(() => {
          p("booked");
        }, 0), setTimeout(() => {
          window.dispatchEvent(new CustomEvent("th:afterCartItemIsAdded"));
        }, 0), _) {
          await s.push({ name: "checkout" });
          return;
        }
        if (v.upsell)
          return;
        setTimeout(() => {
          l.show();
        }, 0);
      } catch (M) {
        if (!(M instanceof It))
          return f();
        const K = M.message;
        let re = M.message;
        (typeof ((V = K.errors[0]) == null ? void 0 : V.type) < "u" || typeof ((G = K.errors[0]) == null ? void 0 : G.code) < "u") && (re = ((L = K.errors[0]) == null ? void 0 : L.type) || ((F = K.errors[0]) == null ? void 0 : F.code), re = g(`THError.${re}`)), f(re, 1e4);
      } finally {
        i.value = !1;
      }
    };
    return (_, S) => {
      var A, x;
      return d.value ? (U(), de(FS, {
        key: 0,
        class: "th-product__options"
      })) : (U(), X("div", sO, [
        c.value !== null && !c.value.isDisabled ? (U(), X(Oe, { key: 0 }, [
          q("div", lO, [
            !c.value.isDisabled && c.value.isHasVariants && c.value.selectedVariant ? (U(), de(Ou, {
              key: 0,
              "selected-variant": c.value.selectedVariant,
              variants: c.value.variants,
              onSelectVariant: E
            }, null, 8, ["selected-variant", "variants"])) : se("", !0),
            c.value && !c.value.isOpen ? (U(), de(Ws, {
              key: 1,
              ref_key: "calendarElement",
              ref: r,
              "is-upsell": v.upsell,
              product: c.value
            }, null, 8, ["is-upsell", "product"])) : se("", !0),
            c.value ? (U(), de(qu, {
              key: 2,
              ref_key: "visitorsElement",
              ref: o,
              disabled: !C.value,
              product: c.value
            }, null, 8, ["disabled", "product"])) : se("", !0),
            c.value && !c.value.isDisabled && c.value.hasOptions ? (U(), de($S, {
              key: 3,
              ref_key: "mealsElement",
              ref: a,
              disabled: !b.value,
              product: c.value
            }, null, 8, ["disabled", "product"])) : se("", !0)
          ]),
          q("div", cO, [
            v.hidePrices ? se("", !0) : (U(), X("div", uO, [
              q("span", dO, ae(W(n)(v.product.title, W(m))), 1),
              q("div", fO, [
                c.value && c.value.hasDynamicPrices ? (U(), X("span", pO, ae(W(g)("booking.from")), 1)) : se("", !0),
                c.value && c.value.oldPrice ? (U(), X("div", hO, [
                  z(ct, {
                    amount: c.value.calculatedOldPrice
                  }, null, 8, ["amount"])
                ])) : se("", !0),
                q("div", mO, [
                  c.value ? (U(), de(ct, {
                    key: 0,
                    amount: c.value.price
                  }, null, 8, ["amount"])) : se("", !0)
                ])
              ])
            ])),
            q("div", vO, [
              c.value && c.value.isEdit ? (U(), de(ot, {
                key: 0,
                disabled: i.value,
                loading: i.value,
                bg: "accent",
                class: "th-product__actions-button",
                type: "button",
                onClick: S[0] || (S[0] = (B) => k(!1))
              }, {
                default: we(() => [
                  Ge(ae(W(g)("booking.update")), 1)
                ]),
                _: 1
              }, 8, ["disabled", "loading"])) : c.value ? (U(), X(Oe, { key: 1 }, [
                z(ot, {
                  disabled: i.value,
                  loading: i.value,
                  class: "th-product__actions-button",
                  type: "button",
                  onClick: S[1] || (S[1] = (B) => k(!1))
                }, {
                  default: we(() => [
                    Ge(ae(W(g)("booking.addToCart")), 1)
                  ]),
                  _: 1
                }, 8, ["disabled", "loading"]),
                v.hideBookNowButton ? se("", !0) : (U(), de(ot, {
                  key: 0,
                  disabled: i.value,
                  loading: i.value,
                  bg: "accent",
                  class: "th-product__actions-button",
                  type: "button",
                  onClick: S[2] || (S[2] = (B) => k(!0))
                }, {
                  default: we(() => [
                    Ge(ae(W(g)("booking.bookNow")), 1)
                  ]),
                  _: 1
                }, 8, ["disabled", "loading"]))
              ], 64)) : se("", !0)
            ])
          ])
        ], 64)) : c.value ? (U(), X(Oe, { key: 1 }, [
          q("div", gO, [
            c.value.isHasVariants && c.value.selectedVariant ? (U(), de(Ou, {
              key: 0,
              "selected-variant": c.value.selectedVariant,
              variants: c.value.variants,
              onSelectVariant: E
            }, null, 8, ["selected-variant", "variants"])) : se("", !0),
            z(Ws, {
              "is-active": !1,
              product: c.value,
              upsell: v.upsell
            }, null, 8, ["product", "upsell"]),
            c.value ? (U(), de(qu, {
              key: 1,
              disabled: !C.value,
              "is-active": !1,
              product: c.value
            }, null, 8, ["disabled", "product"])) : se("", !0)
          ]),
          q("div", yO, [
            q("div", _O, [
              q("span", bO, ae(W(n)(v.product.title, W(m))), 1),
              v.hidePrices ? se("", !0) : (U(), X("div", EO, [
                c.value && c.value.hasDynamicPrices ? (U(), X("span", wO, ae(W(g)("booking.from")), 1)) : se("", !0),
                v.product.oldPrice ? (U(), X("div", CO, [
                  c.value ? (U(), de(ct, {
                    key: 0,
                    amount: c.value.calculatedOldPrice
                  }, null, 8, ["amount"])) : se("", !0)
                ])) : se("", !0),
                q("div", TO, [
                  c.value ? (U(), de(ct, {
                    key: 0,
                    amount: c.value.price
                  }, null, 8, ["amount"])) : se("", !0)
                ])
              ]))
            ]),
            q("div", SO, [
              z(ot, {
                disabled: !0,
                bg: "black",
                class: "th-product__actions-button"
              }, {
                default: we(() => [
                  Ge(ae(W(g)("booking.unavailable")), 1)
                ]),
                _: 1
              })
            ])
          ])
        ], 64)) : se("", !0),
        (A = _.product) != null && A.cancellationPolicy ? (U(), X("div", {
          key: 2,
          class: "th-product__notice",
          innerHTML: (x = _.product) == null ? void 0 : x.cancellationPolicy
        }, null, 8, kO)) : se("", !0)
      ]));
    };
  }
}), OO = /* @__PURE__ */ ge(IO, [["__scopeId", "data-v-5c097f2a"]]), DO = { class: "th-product" }, PO = { class: "th-product__title" }, AO = /* @__PURE__ */ pe({
  __name: "AddToCart",
  props: {
    product: {},
    quickBuy: { type: Boolean, default: !1 }
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const { localizedTitle: n } = Ao, { locale: r } = De();
    Ke(() => {
      o.quickBuy && d();
    });
    const o = e, a = t, i = Q(!1), l = Q(null), s = xn();
    Zr(() => {
      (l.value && i.value || o.quickBuy) && v();
    });
    const c = () => {
      s.close(), s.setQuickBuyProduct();
    }, u = () => {
      s.toggleAvailability(!0), s.toggleLoading(!1);
    }, f = () => {
      s.close(), a("close");
    }, d = () => {
      i.value = !0, setTimeout(() => {
        ah(l.value, {
          useGlobalLockState: !0,
          overflowType: "clip"
        });
      }, 0);
    }, v = () => {
      i.value = !1, ih(l.value, {
        useGlobalLockState: !0,
        overflowType: "clip"
      });
    };
    return Le(
      () => s.isOpen || s.quickBuyProduct,
      (p) => {
        if (p) {
          d();
          return;
        }
        v();
      }
    ), (p, g) => (U(), X("div", {
      ref_key: "productModal",
      ref: l,
      class: be([{
        "th-product-modal--active": W(s).isOpen || W(s).quickBuyProduct,
        "th-product-modal_quick": o.quickBuy
      }, "th-product-modal"])
    }, [
      o.quickBuy || W(s).isOpen ? (U(), de(nh, {
        key: 0,
        class: "th-product-modal__close-btn",
        type: "button",
        onClick: f
      })) : se("", !0),
      q("form", DO, [
        o.product.duration || o.product.rating ? (U(), de(kh, {
          key: 0,
          "bookings-count": o.product.bookingsCount,
          duration: o.product.duration,
          rating: o.product.rating,
          class: "th-product__meta"
        }, null, 8, ["bookings-count", "duration", "rating"])) : se("", !0),
        q("h1", PO, ae(W(n)(o.product.title, W(r))), 1),
        z(OO, {
          product: p.product,
          onBooked: c,
          onLoaded: u
        }, null, 8, ["product"])
      ])
    ], 2));
  }
}), $O = /* @__PURE__ */ ge(AO, [["__scopeId", "data-v-fcda4023"]]), NO = { class: "th-default" }, Gl = /* @__PURE__ */ pe({
  __name: "ProductComponent",
  props: {
    product: {},
    quickBuy: { type: Boolean, default: !1 }
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = e, r = t;
    return (o, a) => (U(), X("div", NO, [
      z($O, {
        product: n.product,
        "quick-buy": n.quickBuy,
        onClose: a[0] || (a[0] = (i) => r("close"))
      }, null, 8, ["product", "quick-buy"])
    ]));
  }
}), LO = {
  key: 0,
  class: "th-modal th-modal_quick-buy"
}, RO = { class: "th-modal__wrapper" }, MO = /* @__PURE__ */ pe({
  __name: "QuickBuyModal",
  setup(e) {
    const t = xn(), n = () => {
      t.setQuickBuyProduct();
    }, r = (a) => {
      a.code === "Escape" && a.isTrusted && n();
    }, o = te(() => t.quickBuyProduct);
    return Le(o, (a) => {
      setTimeout(() => {
        if (a) {
          window.addEventListener("keydown", r, { passive: !0 }), window.dispatchEvent(new CustomEvent("th:quickBuyModalIsOpen"));
          return;
        }
        window.history.pushState({}, document.title, window.location.pathname), window.removeEventListener("keydown", r), window.dispatchEvent(new CustomEvent("th:quickBuyModalIsClose"));
      }, 0);
    }), (a, i) => o.value ? (U(), X("div", LO, [
      q("div", {
        class: "th-modal__backdrop",
        onClick: n
      }),
      q("div", RO, [
        o.value ? (U(), de(Gl, {
          key: 0,
          product: o.value,
          "quick-buy": !0,
          onClose: n
        }, null, 8, ["product"])) : se("", !0)
      ])
    ])) : se("", !0);
  }
}), xO = /* @__PURE__ */ ge(MO, [["__scopeId", "data-v-11dfbb8e"]]);
var vd = function(e, t, n) {
  if (!t.hasOwnProperty(n)) {
    var r = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(t, n, r);
  }
};
const BO = { props: { template: String, parent: Object, templateProps: { type: Object, default: function() {
  return {};
} } }, render: function() {
  if (this.template) {
    var e = this.parent || this.$parent, t = e.$data;
    t === void 0 && (t = {});
    var n = e.$props;
    n === void 0 && (n = {});
    var r = e.$options;
    r === void 0 && (r = {});
    var o = r.components;
    o === void 0 && (o = {});
    var a = r.computed;
    a === void 0 && (a = {});
    var i = r.methods;
    i === void 0 && (i = {});
    var l = this.$data;
    l === void 0 && (l = {});
    var s = this.$props;
    s === void 0 && (s = {});
    var c = this.$options;
    c === void 0 && (c = {});
    var u = c.methods;
    u === void 0 && (u = {});
    var f = c.computed;
    f === void 0 && (f = {});
    var d = c.components;
    d === void 0 && (d = {});
    var v = { $data: {}, $props: {}, $options: {}, components: {}, computed: {}, methods: {} };
    Object.keys(t).forEach(function(b) {
      l[b] === void 0 && (v.$data[b] = t[b]);
    }), Object.keys(n).forEach(function(b) {
      s[b] === void 0 && (v.$props[b] = n[b]);
    }), Object.keys(i).forEach(function(b) {
      u[b] === void 0 && (v.methods[b] = i[b]);
    }), Object.keys(a).forEach(function(b) {
      f[b] === void 0 && (v.computed[b] = a[b]);
    }), Object.keys(o).forEach(function(b) {
      d[b] === void 0 && (v.components[b] = o[b]);
    });
    var p = Object.keys(v.methods || {}), g = Object.keys(v.$data || {}), m = Object.keys(v.$props || {}), h = Object.keys(this.templateProps), y = g.concat(m).concat(p).concat(h), w = ($ = e, C = {}, p.forEach(function(b) {
      return vd($, C, b);
    }), C), O = function(b) {
      var E = {};
      return b.forEach(function(k) {
        k && Object.getOwnPropertyNames(k).forEach(function(_) {
          return vd(k, E, _);
        });
      }), E;
    }([v.$data, v.$props, w, this.templateProps]);
    return dr({ template: this.template || "<div></div>", props: y, computed: v.computed, components: v.components, provide: this.$parent.$.provides ? this.$parent.$.provides : {} }, Object.assign({}, O));
  }
  var $, C;
} }, Tm = /* @__PURE__ */ pe({
  __name: "CartButton",
  setup(e) {
    const t = mi();
    return (n, r) => (U(), X("button", {
      class: "th-cart__btn",
      type: "button",
      onClick: r[0] || (r[0] = //@ts-ignore
      (...o) => W(t).toggle && W(t).toggle(...o))
    }, [
      Yn(n.$slots, "default")
    ]));
  }
}), VO = ["data-count"], Sm = /* @__PURE__ */ pe({
  __name: "CartCount",
  setup(e) {
    const t = $e();
    return (n, r) => (U(), X("span", {
      "data-count": W(t).count,
      class: "th-cart__items-count"
    }, ae(W(t).count), 9, VO));
  }
}), UO = { class: "th-default" }, km = /* @__PURE__ */ pe({
  __name: "BookButton",
  setup(e) {
    const { productIsAvailable: t, productIsLoading: n } = Io(
      xn()
    ), { open: r } = xn(), { t: o } = De(), a = Ch(), i = te(() => !!a.query.cartItemId), l = te(() => t.value ? i.value ? o("booking.update") : o("booking.bookNow") : o("booking.unavailable"));
    return (s, c) => (U(), X("div", UO, [
      z(ot, {
        bg: W(t) ? "accent" : "black",
        disabled: !W(t) || W(n),
        loading: W(n),
        class: "th-up-lg:hidden",
        type: "button",
        wide: "",
        onClick: W(r)
      }, {
        default: we(() => [
          Ge(ae(l.value), 1)
        ]),
        _: 1
      }, 8, ["bg", "disabled", "loading", "onClick"])
    ]));
  }
}), FO = {
  data: () => ({
    template: ""
  }),
  methods: {
    async render(e) {
      this.template = e, await $n(), window.dispatchEvent(new CustomEvent("th:contentIsRendered"));
    }
  },
  props: {
    renderComponents: {
      default: () => [],
      type: Array
    }
  },
  mounted() {
    this.renderComponents.forEach((e) => {
      this.$options.components[e.name] = e;
    }), window.ticketHub.render = this.render, window.dispatchEvent(new CustomEvent("th:renderReady"));
  },
  components: {
    VRuntimeTemplate: BO,
    ThCartButton: Tm,
    // eslint-disable-line
    ThCartCount: Sm,
    // eslint-disable-line
    ThProduct: Gl,
    // eslint-disable-line
    ThBookButton: km,
    // eslint-disable-line
    ThPrice: ct
    // eslint-disable-line
  }
};
function HO(e, t, n, r, o, a) {
  const i = tf("v-runtime-template");
  return U(), de(i, { template: e.template }, null, 8, ["template"]);
}
const Im = /* @__PURE__ */ ge(FO, [["render", HO]]), Om = (e, t) => {
  if (typeof t > "u" || typeof e > "u")
    return e ?? e;
  if (typeof e == "string")
    return t ?? e;
  const n = {};
  return (/* @__PURE__ */ new Set([
    ...Object.keys(e),
    ...Object.keys(t)
  ])).forEach((o) => {
    if (typeof e[o] == "object") {
      n[o] = Om(
        e[o],
        t[o]
      );
      return;
    }
    n[o] = t[o] ?? e[o];
  }), n;
};
function gd(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function YO(e, t, n) {
  return t && gd(e.prototype, t), n && gd(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
/*!
 * Splide.js
 * Version  : 4.1.4
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
var yd = "(prefers-reduced-motion: reduce)", xr = 1, jO = 2, Kr = 3, ao = 4, na = 5, Ra = 6, oi = 7, WO = {
  CREATED: xr,
  MOUNTED: jO,
  IDLE: Kr,
  MOVING: ao,
  SCROLLING: na,
  DRAGGING: Ra,
  DESTROYED: oi
};
function mn(e) {
  e.length = 0;
}
function Kn(e, t, n) {
  return Array.prototype.slice.call(e, t, n);
}
function Ne(e) {
  return e.bind.apply(e, [null].concat(Kn(arguments, 1)));
}
var Dm = setTimeout, Qs = function() {
};
function _d(e) {
  return requestAnimationFrame(e);
}
function Oi(e, t) {
  return typeof t === e;
}
function Ro(e) {
  return !Kl(e) && Oi("object", e);
}
var Xl = Array.isArray, Pm = Ne(Oi, "function"), Vn = Ne(Oi, "string"), ra = Ne(Oi, "undefined");
function Kl(e) {
  return e === null;
}
function Am(e) {
  try {
    return e instanceof (e.ownerDocument.defaultView || window).HTMLElement;
  } catch {
    return !1;
  }
}
function oa(e) {
  return Xl(e) ? e : [e];
}
function Nt(e, t) {
  oa(e).forEach(t);
}
function Jl(e, t) {
  return e.indexOf(t) > -1;
}
function Ma(e, t) {
  return e.push.apply(e, oa(t)), e;
}
function cn(e, t, n) {
  e && Nt(t, function(r) {
    r && e.classList[n ? "add" : "remove"](r);
  });
}
function Gt(e, t) {
  cn(e, Vn(t) ? t.split(" ") : t, !0);
}
function aa(e, t) {
  Nt(t, e.appendChild.bind(e));
}
function Zl(e, t) {
  Nt(e, function(n) {
    var r = (t || n).parentNode;
    r && r.insertBefore(n, t);
  });
}
function Mo(e, t) {
  return Am(e) && (e.msMatchesSelector || e.matches).call(e, t);
}
function $m(e, t) {
  var n = e ? Kn(e.children) : [];
  return t ? n.filter(function(r) {
    return Mo(r, t);
  }) : n;
}
function ia(e, t) {
  return t ? $m(e, t)[0] : e.firstElementChild;
}
var xo = Object.keys;
function cr(e, t, n) {
  return e && (n ? xo(e).reverse() : xo(e)).forEach(function(r) {
    r !== "__proto__" && t(e[r], r);
  }), e;
}
function Bo(e) {
  return Kn(arguments, 1).forEach(function(t) {
    cr(t, function(n, r) {
      e[r] = t[r];
    });
  }), e;
}
function Pn(e) {
  return Kn(arguments, 1).forEach(function(t) {
    cr(t, function(n, r) {
      Xl(n) ? e[r] = n.slice() : Ro(n) ? e[r] = Pn({}, Ro(e[r]) ? e[r] : {}, n) : e[r] = n;
    });
  }), e;
}
function bd(e, t) {
  Nt(t || xo(e), function(n) {
    delete e[n];
  });
}
function Xt(e, t) {
  Nt(e, function(n) {
    Nt(t, function(r) {
      n && n.removeAttribute(r);
    });
  });
}
function ye(e, t, n) {
  Ro(t) ? cr(t, function(r, o) {
    ye(e, o, r);
  }) : Nt(e, function(r) {
    Kl(n) || n === "" ? Xt(r, t) : r.setAttribute(t, String(n));
  });
}
function Ur(e, t, n) {
  var r = document.createElement(e);
  return t && (Vn(t) ? Gt(r, t) : ye(r, t)), n && aa(n, r), r;
}
function Rt(e, t, n) {
  if (ra(n))
    return getComputedStyle(e)[t];
  Kl(n) || (e.style[t] = "" + n);
}
function Vo(e, t) {
  Rt(e, "display", t);
}
function Nm(e) {
  e.setActive && e.setActive() || e.focus({
    preventScroll: !0
  });
}
function Mt(e, t) {
  return e.getAttribute(t);
}
function Ed(e, t) {
  return e && e.classList.contains(t);
}
function Ot(e) {
  return e.getBoundingClientRect();
}
function gr(e) {
  Nt(e, function(t) {
    t && t.parentNode && t.parentNode.removeChild(t);
  });
}
function Lm(e) {
  return ia(new DOMParser().parseFromString(e, "text/html").body);
}
function an(e, t) {
  e.preventDefault(), t && (e.stopPropagation(), e.stopImmediatePropagation());
}
function Rm(e, t) {
  return e && e.querySelector(t);
}
function Ql(e, t) {
  return t ? Kn(e.querySelectorAll(t)) : [];
}
function un(e, t) {
  cn(e, t, !1);
}
function el(e) {
  return e.timeStamp;
}
function er(e) {
  return Vn(e) ? e : e ? e + "px" : "";
}
var sa = "splide", ec = "data-" + sa;
function To(e, t) {
  if (!e)
    throw new Error("[" + sa + "] " + (t || ""));
}
var Un = Math.min, ai = Math.max, ii = Math.floor, Uo = Math.ceil, yt = Math.abs;
function Mm(e, t, n) {
  return yt(e - t) < n;
}
function xa(e, t, n, r) {
  var o = Un(t, n), a = ai(t, n);
  return r ? o < e && e < a : o <= e && e <= a;
}
function $r(e, t, n) {
  var r = Un(t, n), o = ai(t, n);
  return Un(ai(r, e), o);
}
function tl(e) {
  return +(e > 0) - +(e < 0);
}
function nl(e, t) {
  return Nt(t, function(n) {
    e = e.replace("%s", "" + n);
  }), e;
}
function tc(e) {
  return e < 10 ? "0" + e : "" + e;
}
var wd = {};
function qO(e) {
  return "" + e + tc(wd[e] = (wd[e] || 0) + 1);
}
function xm() {
  var e = [];
  function t(i, l, s, c) {
    o(i, l, function(u, f, d) {
      var v = "addEventListener" in u, p = v ? u.removeEventListener.bind(u, f, s, c) : u.removeListener.bind(u, s);
      v ? u.addEventListener(f, s, c) : u.addListener(s), e.push([u, f, d, s, p]);
    });
  }
  function n(i, l, s) {
    o(i, l, function(c, u, f) {
      e = e.filter(function(d) {
        return d[0] === c && d[1] === u && d[2] === f && (!s || d[3] === s) ? (d[4](), !1) : !0;
      });
    });
  }
  function r(i, l, s) {
    var c, u = !0;
    return typeof CustomEvent == "function" ? c = new CustomEvent(l, {
      bubbles: u,
      detail: s
    }) : (c = document.createEvent("CustomEvent"), c.initCustomEvent(l, u, !1, s)), i.dispatchEvent(c), c;
  }
  function o(i, l, s) {
    Nt(i, function(c) {
      c && Nt(l, function(u) {
        u.split(" ").forEach(function(f) {
          var d = f.split(".");
          s(c, d[0], d[1]);
        });
      });
    });
  }
  function a() {
    e.forEach(function(i) {
      i[4]();
    }), mn(e);
  }
  return {
    bind: t,
    unbind: n,
    dispatch: r,
    destroy: a
  };
}
var Er = "mounted", Cd = "ready", Fn = "move", la = "moved", Bm = "click", zO = "active", GO = "inactive", XO = "visible", KO = "hidden", Ze = "refresh", bt = "updated", Fo = "resize", nc = "resized", JO = "drag", ZO = "dragging", QO = "dragged", rc = "scroll", io = "scrolled", eD = "overflow", Vm = "destroy", tD = "arrows:mounted", nD = "arrows:updated", rD = "pagination:mounted", oD = "pagination:updated", Um = "navigation:mounted", Fm = "autoplay:play", aD = "autoplay:playing", Hm = "autoplay:pause", Ym = "lazyload:loaded", jm = "sk", Wm = "sh", si = "ei";
function Ue(e) {
  var t = e ? e.event.bus : document.createDocumentFragment(), n = xm();
  function r(a, i) {
    n.bind(t, oa(a).join(" "), function(l) {
      i.apply(i, Xl(l.detail) ? l.detail : []);
    });
  }
  function o(a) {
    n.dispatch(t, a, Kn(arguments, 1));
  }
  return e && e.event.on(Vm, n.destroy), Bo(n, {
    bus: t,
    on: r,
    off: Ne(n.unbind, t),
    emit: o
  });
}
function Di(e, t, n, r) {
  var o = Date.now, a, i = 0, l, s = !0, c = 0;
  function u() {
    if (!s) {
      if (i = e ? Un((o() - a) / e, 1) : 1, n && n(i), i >= 1 && (t(), a = o(), r && ++c >= r))
        return d();
      l = _d(u);
    }
  }
  function f(h) {
    h || p(), a = o() - (h ? i * e : 0), s = !1, l = _d(u);
  }
  function d() {
    s = !0;
  }
  function v() {
    a = o(), i = 0, n && n(i);
  }
  function p() {
    l && cancelAnimationFrame(l), i = 0, l = 0, s = !0;
  }
  function g(h) {
    e = h;
  }
  function m() {
    return s;
  }
  return {
    start: f,
    rewind: v,
    pause: d,
    cancel: p,
    set: g,
    isPaused: m
  };
}
function iD(e) {
  var t = e;
  function n(o) {
    t = o;
  }
  function r(o) {
    return Jl(oa(o), t);
  }
  return {
    set: n,
    is: r
  };
}
function sD(e, t) {
  var n = Di(t || 0, e, null, 1);
  return function() {
    n.isPaused() && n.start();
  };
}
function lD(e, t, n) {
  var r = e.state, o = n.breakpoints || {}, a = n.reducedMotion || {}, i = xm(), l = [];
  function s() {
    var p = n.mediaQuery === "min";
    xo(o).sort(function(g, m) {
      return p ? +g - +m : +m - +g;
    }).forEach(function(g) {
      u(o[g], "(" + (p ? "min" : "max") + "-width:" + g + "px)");
    }), u(a, yd), f();
  }
  function c(p) {
    p && i.destroy();
  }
  function u(p, g) {
    var m = matchMedia(g);
    i.bind(m, "change", f), l.push([p, m]);
  }
  function f() {
    var p = r.is(oi), g = n.direction, m = l.reduce(function(h, y) {
      return Pn(h, y[1].matches ? y[0] : {});
    }, {});
    bd(n), v(m), n.destroy ? e.destroy(n.destroy === "completely") : p ? (c(!0), e.mount()) : g !== n.direction && e.refresh();
  }
  function d(p) {
    matchMedia(yd).matches && (p ? Pn(n, a) : bd(n, xo(a)));
  }
  function v(p, g, m) {
    Pn(n, p), g && Pn(Object.getPrototypeOf(n), p), (m || !r.is(xr)) && e.emit(bt, n);
  }
  return {
    setup: s,
    destroy: c,
    reduce: d,
    set: v
  };
}
var Pi = "Arrow", Ai = Pi + "Left", $i = Pi + "Right", qm = Pi + "Up", zm = Pi + "Down", Td = "rtl", Ni = "ttb", fs = {
  width: ["height"],
  left: ["top", "right"],
  right: ["bottom", "left"],
  x: ["y"],
  X: ["Y"],
  Y: ["X"],
  ArrowLeft: [qm, $i],
  ArrowRight: [zm, Ai]
};
function cD(e, t, n) {
  function r(a, i, l) {
    l = l || n.direction;
    var s = l === Td && !i ? 1 : l === Ni ? 0 : -1;
    return fs[a] && fs[a][s] || a.replace(/width|left|right/i, function(c, u) {
      var f = fs[c.toLowerCase()][s] || c;
      return u > 0 ? f.charAt(0).toUpperCase() + f.slice(1) : f;
    });
  }
  function o(a) {
    return a * (n.direction === Td ? 1 : -1);
  }
  return {
    resolve: r,
    orient: o
  };
}
var fn = "role", Fr = "tabindex", uD = "disabled", Bt = "aria-", ca = Bt + "controls", Gm = Bt + "current", Sd = Bt + "selected", Dt = Bt + "label", oc = Bt + "labelledby", Xm = Bt + "hidden", ac = Bt + "orientation", Ho = Bt + "roledescription", kd = Bt + "live", Id = Bt + "busy", Od = Bt + "atomic", ic = [fn, Fr, uD, ca, Gm, Dt, oc, Xm, ac, Ho], Zt = sa + "__", Jn = "is-", ps = sa, Dd = Zt + "track", dD = Zt + "list", Li = Zt + "slide", Km = Li + "--clone", fD = Li + "__container", sc = Zt + "arrows", Ri = Zt + "arrow", Jm = Ri + "--prev", Zm = Ri + "--next", Mi = Zt + "pagination", Qm = Mi + "__page", pD = Zt + "progress", hD = pD + "__bar", mD = Zt + "toggle", vD = Zt + "spinner", gD = Zt + "sr", yD = Jn + "initialized", yr = Jn + "active", ev = Jn + "prev", tv = Jn + "next", rl = Jn + "visible", ol = Jn + "loading", nv = Jn + "focus-in", rv = Jn + "overflow", _D = [yr, rl, ev, tv, ol, nv, rv], bD = {
  slide: Li,
  clone: Km,
  arrows: sc,
  arrow: Ri,
  prev: Jm,
  next: Zm,
  pagination: Mi,
  page: Qm,
  spinner: vD
};
function ED(e, t) {
  if (Pm(e.closest))
    return e.closest(t);
  for (var n = e; n && n.nodeType === 1 && !Mo(n, t); )
    n = n.parentElement;
  return n;
}
var wD = 5, Pd = 200, ov = "touchstart mousedown", hs = "touchmove mousemove", ms = "touchend touchcancel mouseup click";
function CD(e, t, n) {
  var r = Ue(e), o = r.on, a = r.bind, i = e.root, l = n.i18n, s = {}, c = [], u = [], f = [], d, v, p;
  function g() {
    w(), O(), y();
  }
  function m() {
    o(Ze, h), o(Ze, g), o(bt, y), a(document, ov + " keydown", function(b) {
      p = b.type === "keydown";
    }, {
      capture: !0
    }), a(i, "focusin", function() {
      cn(i, nv, !!p);
    });
  }
  function h(b) {
    var E = ic.concat("style");
    mn(c), un(i, u), un(d, f), Xt([d, v], E), Xt(i, b ? E : ["style", Ho]);
  }
  function y() {
    un(i, u), un(d, f), u = C(ps), f = C(Dd), Gt(i, u), Gt(d, f), ye(i, Dt, n.label), ye(i, oc, n.labelledby);
  }
  function w() {
    d = $("." + Dd), v = ia(d, "." + dD), To(d && v, "A track/list element is missing."), Ma(c, $m(v, "." + Li + ":not(." + Km + ")")), cr({
      arrows: sc,
      pagination: Mi,
      prev: Jm,
      next: Zm,
      bar: hD,
      toggle: mD
    }, function(b, E) {
      s[E] = $("." + b);
    }), Bo(s, {
      root: i,
      track: d,
      list: v,
      slides: c
    });
  }
  function O() {
    var b = i.id || qO(sa), E = n.role;
    i.id = b, d.id = d.id || b + "-track", v.id = v.id || b + "-list", !Mt(i, fn) && i.tagName !== "SECTION" && E && ye(i, fn, E), ye(i, Ho, l.carousel), ye(v, fn, "presentation");
  }
  function $(b) {
    var E = Rm(i, b);
    return E && ED(E, "." + ps) === i ? E : void 0;
  }
  function C(b) {
    return [b + "--" + n.type, b + "--" + n.direction, n.drag && b + "--draggable", n.isNavigation && b + "--nav", b === ps && yr];
  }
  return Bo(s, {
    setup: g,
    mount: m,
    destroy: h
  });
}
var Jr = "slide", so = "loop", ua = "fade";
function TD(e, t, n, r) {
  var o = Ue(e), a = o.on, i = o.emit, l = o.bind, s = e.Components, c = e.root, u = e.options, f = u.isNavigation, d = u.updateOnMove, v = u.i18n, p = u.pagination, g = u.slideFocus, m = s.Direction.resolve, h = Mt(r, "style"), y = Mt(r, Dt), w = n > -1, O = ia(r, "." + fD), $;
  function C() {
    w || (r.id = c.id + "-slide" + tc(t + 1), ye(r, fn, p ? "tabpanel" : "group"), ye(r, Ho, v.slide), ye(r, Dt, y || nl(v.slideLabel, [t + 1, e.length]))), b();
  }
  function b() {
    l(r, "click", Ne(i, Bm, L)), l(r, "keydown", Ne(i, jm, L)), a([la, Wm, io], S), a(Um, k), d && a(Fn, _);
  }
  function E() {
    $ = !0, o.destroy(), un(r, _D), Xt(r, ic), ye(r, "style", h), ye(r, Dt, y || "");
  }
  function k() {
    var F = e.splides.map(function(M) {
      var K = M.splide.Components.Slides.getAt(t);
      return K ? K.slide.id : "";
    }).join(" ");
    ye(r, Dt, nl(v.slideX, (w ? n : t) + 1)), ye(r, ca, F), ye(r, fn, g ? "button" : ""), g && Xt(r, Ho);
  }
  function _() {
    $ || S();
  }
  function S() {
    if (!$) {
      var F = e.index;
      A(), x(), cn(r, ev, t === F - 1), cn(r, tv, t === F + 1);
    }
  }
  function A() {
    var F = N();
    F !== Ed(r, yr) && (cn(r, yr, F), ye(r, Gm, f && F || ""), i(F ? zO : GO, L));
  }
  function x() {
    var F = V(), M = !F && (!N() || w);
    if (e.state.is([ao, na]) || ye(r, Xm, M || ""), ye(Ql(r, u.focusableNodes || ""), Fr, M ? -1 : ""), g && ye(r, Fr, M ? -1 : 0), F !== Ed(r, rl) && (cn(r, rl, F), i(F ? XO : KO, L)), !F && document.activeElement === r) {
      var K = s.Slides.getAt(e.index);
      K && Nm(K.slide);
    }
  }
  function B(F, M, K) {
    Rt(K && O || r, F, M);
  }
  function N() {
    var F = e.index;
    return F === t || u.cloneStatus && F === n;
  }
  function V() {
    if (e.is(ua))
      return N();
    var F = Ot(s.Elements.track), M = Ot(r), K = m("left", !0), re = m("right", !0);
    return ii(F[K]) <= Uo(M[K]) && ii(M[re]) <= Uo(F[re]);
  }
  function G(F, M) {
    var K = yt(F - t);
    return !w && (u.rewind || e.is(so)) && (K = Un(K, e.length - K)), K <= M;
  }
  var L = {
    index: t,
    slideIndex: n,
    slide: r,
    container: O,
    isClone: w,
    mount: C,
    destroy: E,
    update: S,
    style: B,
    isWithin: G
  };
  return L;
}
function SD(e, t, n) {
  var r = Ue(e), o = r.on, a = r.emit, i = r.bind, l = t.Elements, s = l.slides, c = l.list, u = [];
  function f() {
    d(), o(Ze, v), o(Ze, d);
  }
  function d() {
    s.forEach(function(S, A) {
      g(S, A, -1);
    });
  }
  function v() {
    $(function(S) {
      S.destroy();
    }), mn(u);
  }
  function p() {
    $(function(S) {
      S.update();
    });
  }
  function g(S, A, x) {
    var B = TD(e, A, x, S);
    B.mount(), u.push(B), u.sort(function(N, V) {
      return N.index - V.index;
    });
  }
  function m(S) {
    return S ? C(function(A) {
      return !A.isClone;
    }) : u;
  }
  function h(S) {
    var A = t.Controller, x = A.toIndex(S), B = A.hasFocus() ? 1 : n.perPage;
    return C(function(N) {
      return xa(N.index, x, x + B - 1);
    });
  }
  function y(S) {
    return C(S)[0];
  }
  function w(S, A) {
    Nt(S, function(x) {
      if (Vn(x) && (x = Lm(x)), Am(x)) {
        var B = s[A];
        B ? Zl(x, B) : aa(c, x), Gt(x, n.classes.slide), E(x, Ne(a, Fo));
      }
    }), a(Ze);
  }
  function O(S) {
    gr(C(S).map(function(A) {
      return A.slide;
    })), a(Ze);
  }
  function $(S, A) {
    m(A).forEach(S);
  }
  function C(S) {
    return u.filter(Pm(S) ? S : function(A) {
      return Vn(S) ? Mo(A.slide, S) : Jl(oa(S), A.index);
    });
  }
  function b(S, A, x) {
    $(function(B) {
      B.style(S, A, x);
    });
  }
  function E(S, A) {
    var x = Ql(S, "img"), B = x.length;
    B ? x.forEach(function(N) {
      i(N, "load error", function() {
        --B || A();
      });
    }) : A();
  }
  function k(S) {
    return S ? s.length : u.length;
  }
  function _() {
    return u.length > n.perPage;
  }
  return {
    mount: f,
    destroy: v,
    update: p,
    register: g,
    get: m,
    getIn: h,
    getAt: y,
    add: w,
    remove: O,
    forEach: $,
    filter: C,
    style: b,
    getLength: k,
    isEnough: _
  };
}
function kD(e, t, n) {
  var r = Ue(e), o = r.on, a = r.bind, i = r.emit, l = t.Slides, s = t.Direction.resolve, c = t.Elements, u = c.root, f = c.track, d = c.list, v = l.getAt, p = l.style, g, m, h;
  function y() {
    w(), a(window, "resize load", sD(Ne(i, Fo))), o([bt, Ze], w), o(Fo, O);
  }
  function w() {
    g = n.direction === Ni, Rt(u, "maxWidth", er(n.width)), Rt(f, s("paddingLeft"), $(!1)), Rt(f, s("paddingRight"), $(!0)), O(!0);
  }
  function O(L) {
    var F = Ot(u);
    (L || m.width !== F.width || m.height !== F.height) && (Rt(f, "height", C()), p(s("marginRight"), er(n.gap)), p("width", E()), p("height", k(), !0), m = F, i(nc), h !== (h = G()) && (cn(u, rv, h), i(eD, h)));
  }
  function $(L) {
    var F = n.padding, M = s(L ? "right" : "left");
    return F && er(F[M] || (Ro(F) ? 0 : F)) || "0px";
  }
  function C() {
    var L = "";
    return g && (L = b(), To(L, "height or heightRatio is missing."), L = "calc(" + L + " - " + $(!1) + " - " + $(!0) + ")"), L;
  }
  function b() {
    return er(n.height || Ot(d).width * n.heightRatio);
  }
  function E() {
    return n.autoWidth ? null : er(n.fixedWidth) || (g ? "" : _());
  }
  function k() {
    return er(n.fixedHeight) || (g ? n.autoHeight ? null : _() : b());
  }
  function _() {
    var L = er(n.gap);
    return "calc((100%" + (L && " + " + L) + ")/" + (n.perPage || 1) + (L && " - " + L) + ")";
  }
  function S() {
    return Ot(d)[s("width")];
  }
  function A(L, F) {
    var M = v(L || 0);
    return M ? Ot(M.slide)[s("width")] + (F ? 0 : N()) : 0;
  }
  function x(L, F) {
    var M = v(L);
    if (M) {
      var K = Ot(M.slide)[s("right")], re = Ot(d)[s("left")];
      return yt(K - re) + (F ? 0 : N());
    }
    return 0;
  }
  function B(L) {
    return x(e.length - 1) - x(0) + A(0, L);
  }
  function N() {
    var L = v(0);
    return L && parseFloat(Rt(L.slide, s("marginRight"))) || 0;
  }
  function V(L) {
    return parseFloat(Rt(f, s("padding" + (L ? "Right" : "Left")))) || 0;
  }
  function G() {
    return e.is(ua) || B(!0) > S();
  }
  return {
    mount: y,
    resize: O,
    listSize: S,
    slideSize: A,
    sliderSize: B,
    totalSize: x,
    getPadding: V,
    isOverflow: G
  };
}
var ID = 2;
function OD(e, t, n) {
  var r = Ue(e), o = r.on, a = t.Elements, i = t.Slides, l = t.Direction.resolve, s = [], c;
  function u() {
    o(Ze, f), o([bt, Fo], v), (c = m()) && (p(c), t.Layout.resize(!0));
  }
  function f() {
    d(), u();
  }
  function d() {
    gr(s), mn(s), r.destroy();
  }
  function v() {
    var h = m();
    c !== h && (c < h || !h) && r.emit(Ze);
  }
  function p(h) {
    var y = i.get().slice(), w = y.length;
    if (w) {
      for (; y.length < h; )
        Ma(y, y);
      Ma(y.slice(-h), y.slice(0, h)).forEach(function(O, $) {
        var C = $ < h, b = g(O.slide, $);
        C ? Zl(b, y[0].slide) : aa(a.list, b), Ma(s, b), i.register(b, $ - h + (C ? 0 : w), O.index);
      });
    }
  }
  function g(h, y) {
    var w = h.cloneNode(!0);
    return Gt(w, n.classes.clone), w.id = e.root.id + "-clone" + tc(y + 1), w;
  }
  function m() {
    var h = n.clones;
    if (!e.is(so))
      h = 0;
    else if (ra(h)) {
      var y = n[l("fixedWidth")] && t.Layout.slideSize(0), w = y && Uo(Ot(a.track)[l("width")] / y);
      h = w || n[l("autoWidth")] && e.length || n.perPage * ID;
    }
    return h;
  }
  return {
    mount: u,
    destroy: d
  };
}
function DD(e, t, n) {
  var r = Ue(e), o = r.on, a = r.emit, i = e.state.set, l = t.Layout, s = l.slideSize, c = l.getPadding, u = l.totalSize, f = l.listSize, d = l.sliderSize, v = t.Direction, p = v.resolve, g = v.orient, m = t.Elements, h = m.list, y = m.track, w;
  function O() {
    w = t.Transition, o([Er, nc, bt, Ze], $);
  }
  function $() {
    t.Controller.isBusy() || (t.Scroll.cancel(), b(e.index), t.Slides.update());
  }
  function C(M, K, re, fe) {
    M !== K && L(M > re) && (S(), E(_(B(), M > re), !0)), i(ao), a(Fn, K, re, M), w.start(K, function() {
      i(Kr), a(la, K, re, M), fe && fe();
    });
  }
  function b(M) {
    E(x(M, !0));
  }
  function E(M, K) {
    if (!e.is(ua)) {
      var re = K ? M : k(M);
      Rt(h, "transform", "translate" + p("X") + "(" + re + "px)"), M !== re && a(Wm);
    }
  }
  function k(M) {
    if (e.is(so)) {
      var K = A(M), re = K > t.Controller.getEnd(), fe = K < 0;
      (fe || re) && (M = _(M, re));
    }
    return M;
  }
  function _(M, K) {
    var re = M - G(K), fe = d();
    return M -= g(fe * (Uo(yt(re) / fe) || 1)) * (K ? 1 : -1), M;
  }
  function S() {
    E(B(), !0), w.cancel();
  }
  function A(M) {
    for (var K = t.Slides.get(), re = 0, fe = 1 / 0, me = 0; me < K.length; me++) {
      var Se = K[me].index, ne = yt(x(Se, !0) - M);
      if (ne <= fe)
        fe = ne, re = Se;
      else
        break;
    }
    return re;
  }
  function x(M, K) {
    var re = g(u(M - 1) - V(M));
    return K ? N(re) : re;
  }
  function B() {
    var M = p("left");
    return Ot(h)[M] - Ot(y)[M] + g(c(!1));
  }
  function N(M) {
    return n.trimSpace && e.is(Jr) && (M = $r(M, 0, g(d(!0) - f()))), M;
  }
  function V(M) {
    var K = n.focus;
    return K === "center" ? (f() - s(M, !0)) / 2 : +K * s(M) || 0;
  }
  function G(M) {
    return x(M ? t.Controller.getEnd() : 0, !!n.trimSpace);
  }
  function L(M) {
    var K = g(_(B(), M));
    return M ? K >= 0 : K <= h[p("scrollWidth")] - Ot(y)[p("width")];
  }
  function F(M, K) {
    K = ra(K) ? B() : K;
    var re = M !== !0 && g(K) < g(G(!1)), fe = M !== !1 && g(K) > g(G(!0));
    return re || fe;
  }
  return {
    mount: O,
    move: C,
    jump: b,
    translate: E,
    shift: _,
    cancel: S,
    toIndex: A,
    toPosition: x,
    getPosition: B,
    getLimit: G,
    exceededLimit: F,
    reposition: $
  };
}
function PD(e, t, n) {
  var r = Ue(e), o = r.on, a = r.emit, i = t.Move, l = i.getPosition, s = i.getLimit, c = i.toPosition, u = t.Slides, f = u.isEnough, d = u.getLength, v = n.omitEnd, p = e.is(so), g = e.is(Jr), m = Ne(B, !1), h = Ne(B, !0), y = n.start || 0, w, O = y, $, C, b;
  function E() {
    k(), o([bt, Ze, si], k), o(nc, _);
  }
  function k() {
    $ = d(!0), C = n.perMove, b = n.perPage, w = L();
    var ne = $r(y, 0, v ? w : $ - 1);
    ne !== y && (y = ne, i.reposition());
  }
  function _() {
    w !== L() && a(si);
  }
  function S(ne, j, Y) {
    if (!Se()) {
      var T = x(ne), D = G(T);
      D > -1 && (j || D !== y) && (re(D), i.move(T, D, O, Y));
    }
  }
  function A(ne, j, Y, T) {
    t.Scroll.scroll(ne, j, Y, function() {
      var D = G(i.toIndex(l()));
      re(v ? Un(D, w) : D), T && T();
    });
  }
  function x(ne) {
    var j = y;
    if (Vn(ne)) {
      var Y = ne.match(/([+\-<>])(\d+)?/) || [], T = Y[1], D = Y[2];
      T === "+" || T === "-" ? j = N(y + +("" + T + (+D || 1)), y) : T === ">" ? j = D ? F(+D) : m(!0) : T === "<" && (j = h(!0));
    } else
      j = p ? ne : $r(ne, 0, w);
    return j;
  }
  function B(ne, j) {
    var Y = C || (me() ? 1 : b), T = N(y + Y * (ne ? -1 : 1), y, !(C || me()));
    return T === -1 && g && !Mm(l(), s(!ne), 1) ? ne ? 0 : w : j ? T : G(T);
  }
  function N(ne, j, Y) {
    if (f() || me()) {
      var T = V(ne);
      T !== ne && (j = ne, ne = T, Y = !1), ne < 0 || ne > w ? !C && (xa(0, ne, j, !0) || xa(w, j, ne, !0)) ? ne = F(M(ne)) : p ? ne = Y ? ne < 0 ? -($ % b || b) : $ : ne : n.rewind ? ne = ne < 0 ? w : 0 : ne = -1 : Y && ne !== j && (ne = F(M(j) + (ne < j ? -1 : 1)));
    } else
      ne = -1;
    return ne;
  }
  function V(ne) {
    if (g && n.trimSpace === "move" && ne !== y)
      for (var j = l(); j === c(ne, !0) && xa(ne, 0, e.length - 1, !n.rewind); )
        ne < y ? --ne : ++ne;
    return ne;
  }
  function G(ne) {
    return p ? (ne + $) % $ || 0 : ne;
  }
  function L() {
    for (var ne = $ - (me() || p && C ? 1 : b); v && ne-- > 0; )
      if (c($ - 1, !0) !== c(ne, !0)) {
        ne++;
        break;
      }
    return $r(ne, 0, $ - 1);
  }
  function F(ne) {
    return $r(me() ? ne : b * ne, 0, w);
  }
  function M(ne) {
    return me() ? Un(ne, w) : ii((ne >= w ? $ - 1 : ne) / b);
  }
  function K(ne) {
    var j = i.toIndex(ne);
    return g ? $r(j, 0, w) : j;
  }
  function re(ne) {
    ne !== y && (O = y, y = ne);
  }
  function fe(ne) {
    return ne ? O : y;
  }
  function me() {
    return !ra(n.focus) || n.isNavigation;
  }
  function Se() {
    return e.state.is([ao, na]) && !!n.waitForTransition;
  }
  return {
    mount: E,
    go: S,
    scroll: A,
    getNext: m,
    getPrev: h,
    getAdjacent: B,
    getEnd: L,
    setIndex: re,
    getIndex: fe,
    toIndex: F,
    toPage: M,
    toDest: K,
    hasFocus: me,
    isBusy: Se
  };
}
var AD = "http://www.w3.org/2000/svg", $D = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z", ka = 40;
function ND(e, t, n) {
  var r = Ue(e), o = r.on, a = r.bind, i = r.emit, l = n.classes, s = n.i18n, c = t.Elements, u = t.Controller, f = c.arrows, d = c.track, v = f, p = c.prev, g = c.next, m, h, y = {};
  function w() {
    $(), o(bt, O);
  }
  function O() {
    C(), w();
  }
  function $() {
    var A = n.arrows;
    A && !(p && g) && k(), p && g && (Bo(y, {
      prev: p,
      next: g
    }), Vo(v, A ? "" : "none"), Gt(v, h = sc + "--" + n.direction), A && (b(), S(), ye([p, g], ca, d.id), i(tD, p, g)));
  }
  function C() {
    r.destroy(), un(v, h), m ? (gr(f ? [p, g] : v), p = g = null) : Xt([p, g], ic);
  }
  function b() {
    o([Er, la, Ze, io, si], S), a(g, "click", Ne(E, ">")), a(p, "click", Ne(E, "<"));
  }
  function E(A) {
    u.go(A, !0);
  }
  function k() {
    v = f || Ur("div", l.arrows), p = _(!0), g = _(!1), m = !0, aa(v, [p, g]), !f && Zl(v, d);
  }
  function _(A) {
    var x = '<button class="' + l.arrow + " " + (A ? l.prev : l.next) + '" type="button"><svg xmlns="' + AD + '" viewBox="0 0 ' + ka + " " + ka + '" width="' + ka + '" height="' + ka + '" focusable="false"><path d="' + (n.arrowPath || $D) + '" />';
    return Lm(x);
  }
  function S() {
    if (p && g) {
      var A = e.index, x = u.getPrev(), B = u.getNext(), N = x > -1 && A < x ? s.last : s.prev, V = B > -1 && A > B ? s.first : s.next;
      p.disabled = x < 0, g.disabled = B < 0, ye(p, Dt, N), ye(g, Dt, V), i(nD, p, g, x, B);
    }
  }
  return {
    arrows: y,
    mount: w,
    destroy: C,
    update: S
  };
}
var LD = ec + "-interval";
function RD(e, t, n) {
  var r = Ue(e), o = r.on, a = r.bind, i = r.emit, l = Di(n.interval, e.go.bind(e, ">"), b), s = l.isPaused, c = t.Elements, u = t.Elements, f = u.root, d = u.toggle, v = n.autoplay, p, g, m = v === "pause";
  function h() {
    v && (y(), d && ye(d, ca, c.track.id), m || w(), C());
  }
  function y() {
    n.pauseOnHover && a(f, "mouseenter mouseleave", function(k) {
      p = k.type === "mouseenter", $();
    }), n.pauseOnFocus && a(f, "focusin focusout", function(k) {
      g = k.type === "focusin", $();
    }), d && a(d, "click", function() {
      m ? w() : O(!0);
    }), o([Fn, rc, Ze], l.rewind), o(Fn, E);
  }
  function w() {
    s() && t.Slides.isEnough() && (l.start(!n.resetProgress), g = p = m = !1, C(), i(Fm));
  }
  function O(k) {
    k === void 0 && (k = !0), m = !!k, C(), s() || (l.pause(), i(Hm));
  }
  function $() {
    m || (p || g ? O(!1) : w());
  }
  function C() {
    d && (cn(d, yr, !m), ye(d, Dt, n.i18n[m ? "play" : "pause"]));
  }
  function b(k) {
    var _ = c.bar;
    _ && Rt(_, "width", k * 100 + "%"), i(aD, k);
  }
  function E(k) {
    var _ = t.Slides.getAt(k);
    l.set(_ && +Mt(_.slide, LD) || n.interval);
  }
  return {
    mount: h,
    destroy: l.cancel,
    play: w,
    pause: O,
    isPaused: s
  };
}
function MD(e, t, n) {
  var r = Ue(e), o = r.on;
  function a() {
    n.cover && (o(Ym, Ne(l, !0)), o([Er, bt, Ze], Ne(i, !0)));
  }
  function i(s) {
    t.Slides.forEach(function(c) {
      var u = ia(c.container || c.slide, "img");
      u && u.src && l(s, u, c);
    });
  }
  function l(s, c, u) {
    u.style("background", s ? 'center/cover no-repeat url("' + c.src + '")' : "", !0), Vo(c, s ? "none" : "");
  }
  return {
    mount: a,
    destroy: Ne(i, !1)
  };
}
var xD = 10, BD = 600, VD = 0.6, UD = 1.5, FD = 800;
function HD(e, t, n) {
  var r = Ue(e), o = r.on, a = r.emit, i = e.state.set, l = t.Move, s = l.getPosition, c = l.getLimit, u = l.exceededLimit, f = l.translate, d = e.is(Jr), v, p, g = 1;
  function m() {
    o(Fn, O), o([bt, Ze], $);
  }
  function h(b, E, k, _, S) {
    var A = s();
    if (O(), k && (!d || !u())) {
      var x = t.Layout.sliderSize(), B = tl(b) * x * ii(yt(b) / x) || 0;
      b = l.toPosition(t.Controller.toDest(b % x)) + B;
    }
    var N = Mm(A, b, 1);
    g = 1, E = N ? 0 : E || ai(yt(b - A) / UD, FD), p = _, v = Di(E, y, Ne(w, A, b, S), 1), i(na), a(rc), v.start();
  }
  function y() {
    i(Kr), p && p(), a(io);
  }
  function w(b, E, k, _) {
    var S = s(), A = b + (E - b) * C(_), x = (A - S) * g;
    f(S + x), d && !k && u() && (g *= VD, yt(x) < xD && h(c(u(!0)), BD, !1, p, !0));
  }
  function O() {
    v && v.cancel();
  }
  function $() {
    v && !v.isPaused() && (O(), y());
  }
  function C(b) {
    var E = n.easingFunc;
    return E ? E(b) : 1 - Math.pow(1 - b, 4);
  }
  return {
    mount: m,
    destroy: O,
    scroll: h,
    cancel: $
  };
}
var Nr = {
  passive: !1,
  capture: !0
};
function YD(e, t, n) {
  var r = Ue(e), o = r.on, a = r.emit, i = r.bind, l = r.unbind, s = e.state, c = t.Move, u = t.Scroll, f = t.Controller, d = t.Elements.track, v = t.Media.reduce, p = t.Direction, g = p.resolve, m = p.orient, h = c.getPosition, y = c.exceededLimit, w, O, $, C, b, E = !1, k, _, S;
  function A() {
    i(d, hs, Qs, Nr), i(d, ms, Qs, Nr), i(d, ov, B, Nr), i(d, "click", G, {
      capture: !0
    }), i(d, "dragstart", an), o([Er, bt], x);
  }
  function x() {
    var I = n.drag;
    J(!I), C = I === "free";
  }
  function B(I) {
    if (k = !1, !_) {
      var P = D(I);
      T(I.target) && (P || !I.button) && (f.isBusy() ? an(I, !0) : (S = P ? d : window, b = s.is([ao, na]), $ = null, i(S, hs, N, Nr), i(S, ms, V, Nr), c.cancel(), u.cancel(), L(I)));
    }
  }
  function N(I) {
    if (s.is(Ra) || (s.set(Ra), a(JO)), I.cancelable)
      if (b) {
        c.translate(w + Y(me(I)));
        var P = Se(I) > Pd, H = E !== (E = y());
        (P || H) && L(I), k = !0, a(ZO), an(I);
      } else
        K(I) && (b = M(I), an(I));
  }
  function V(I) {
    s.is(Ra) && (s.set(Kr), a(QO)), b && (F(I), an(I)), l(S, hs, N), l(S, ms, V), b = !1;
  }
  function G(I) {
    !_ && k && an(I, !0);
  }
  function L(I) {
    $ = O, O = I, w = h();
  }
  function F(I) {
    var P = re(I), H = fe(P), ee = n.rewind && n.rewindByDrag;
    v(!1), C ? f.scroll(H, 0, n.snap) : e.is(ua) ? f.go(m(tl(P)) < 0 ? ee ? "<" : "-" : ee ? ">" : "+") : e.is(Jr) && E && ee ? f.go(y(!0) ? ">" : "<") : f.go(f.toDest(H), !0), v(!0);
  }
  function M(I) {
    var P = n.dragMinThreshold, H = Ro(P), ee = H && P.mouse || 0, ie = (H ? P.touch : +P) || 10;
    return yt(me(I)) > (D(I) ? ie : ee);
  }
  function K(I) {
    return yt(me(I)) > yt(me(I, !0));
  }
  function re(I) {
    if (e.is(so) || !E) {
      var P = Se(I);
      if (P && P < Pd)
        return me(I) / P;
    }
    return 0;
  }
  function fe(I) {
    return h() + tl(I) * Un(yt(I) * (n.flickPower || 600), C ? 1 / 0 : t.Layout.listSize() * (n.flickMaxPages || 1));
  }
  function me(I, P) {
    return j(I, P) - j(ne(I), P);
  }
  function Se(I) {
    return el(I) - el(ne(I));
  }
  function ne(I) {
    return O === I && $ || O;
  }
  function j(I, P) {
    return (D(I) ? I.changedTouches[0] : I)["page" + g(P ? "Y" : "X")];
  }
  function Y(I) {
    return I / (E && e.is(Jr) ? wD : 1);
  }
  function T(I) {
    var P = n.noDrag;
    return !Mo(I, "." + Qm + ", ." + Ri) && (!P || !Mo(I, P));
  }
  function D(I) {
    return typeof TouchEvent < "u" && I instanceof TouchEvent;
  }
  function R() {
    return b;
  }
  function J(I) {
    _ = I;
  }
  return {
    mount: A,
    disable: J,
    isDragging: R
  };
}
var jD = {
  Spacebar: " ",
  Right: $i,
  Left: Ai,
  Up: qm,
  Down: zm
};
function lc(e) {
  return e = Vn(e) ? e : e.key, jD[e] || e;
}
var Ad = "keydown";
function WD(e, t, n) {
  var r = Ue(e), o = r.on, a = r.bind, i = r.unbind, l = e.root, s = t.Direction.resolve, c, u;
  function f() {
    d(), o(bt, v), o(bt, d), o(Fn, g);
  }
  function d() {
    var h = n.keyboard;
    h && (c = h === "global" ? window : l, a(c, Ad, m));
  }
  function v() {
    i(c, Ad);
  }
  function p(h) {
    u = h;
  }
  function g() {
    var h = u;
    u = !0, Dm(function() {
      u = h;
    });
  }
  function m(h) {
    if (!u) {
      var y = lc(h);
      y === s(Ai) ? e.go("<") : y === s($i) && e.go(">");
    }
  }
  return {
    mount: f,
    destroy: v,
    disable: p
  };
}
var So = ec + "-lazy", Ba = So + "-srcset", qD = "[" + So + "], [" + Ba + "]";
function zD(e, t, n) {
  var r = Ue(e), o = r.on, a = r.off, i = r.bind, l = r.emit, s = n.lazyLoad === "sequential", c = [la, io], u = [];
  function f() {
    n.lazyLoad && (d(), o(Ze, d));
  }
  function d() {
    mn(u), v(), s ? h() : (a(c), o(c, p), p());
  }
  function v() {
    t.Slides.forEach(function(y) {
      Ql(y.slide, qD).forEach(function(w) {
        var O = Mt(w, So), $ = Mt(w, Ba);
        if (O !== w.src || $ !== w.srcset) {
          var C = n.classes.spinner, b = w.parentElement, E = ia(b, "." + C) || Ur("span", C, b);
          u.push([w, y, E]), w.src || Vo(w, "none");
        }
      });
    });
  }
  function p() {
    u = u.filter(function(y) {
      var w = n.perPage * ((n.preloadPages || 1) + 1) - 1;
      return y[1].isWithin(e.index, w) ? g(y) : !0;
    }), u.length || a(c);
  }
  function g(y) {
    var w = y[0];
    Gt(y[1].slide, ol), i(w, "load error", Ne(m, y)), ye(w, "src", Mt(w, So)), ye(w, "srcset", Mt(w, Ba)), Xt(w, So), Xt(w, Ba);
  }
  function m(y, w) {
    var O = y[0], $ = y[1];
    un($.slide, ol), w.type !== "error" && (gr(y[2]), Vo(O, ""), l(Ym, O, $), l(Fo)), s && h();
  }
  function h() {
    u.length && g(u.shift());
  }
  return {
    mount: f,
    destroy: Ne(mn, u),
    check: p
  };
}
function GD(e, t, n) {
  var r = Ue(e), o = r.on, a = r.emit, i = r.bind, l = t.Slides, s = t.Elements, c = t.Controller, u = c.hasFocus, f = c.getIndex, d = c.go, v = t.Direction.resolve, p = s.pagination, g = [], m, h;
  function y() {
    w(), o([bt, Ze, si], y);
    var _ = n.pagination;
    p && Vo(p, _ ? "" : "none"), _ && (o([Fn, rc, io], k), O(), k(), a(rD, {
      list: m,
      items: g
    }, E(e.index)));
  }
  function w() {
    m && (gr(p ? Kn(m.children) : m), un(m, h), mn(g), m = null), r.destroy();
  }
  function O() {
    var _ = e.length, S = n.classes, A = n.i18n, x = n.perPage, B = u() ? c.getEnd() + 1 : Uo(_ / x);
    m = p || Ur("ul", S.pagination, s.track.parentElement), Gt(m, h = Mi + "--" + b()), ye(m, fn, "tablist"), ye(m, Dt, A.select), ye(m, ac, b() === Ni ? "vertical" : "");
    for (var N = 0; N < B; N++) {
      var V = Ur("li", null, m), G = Ur("button", {
        class: S.page,
        type: "button"
      }, V), L = l.getIn(N).map(function(M) {
        return M.slide.id;
      }), F = !u() && x > 1 ? A.pageX : A.slideX;
      i(G, "click", Ne($, N)), n.paginationKeyboard && i(G, "keydown", Ne(C, N)), ye(V, fn, "presentation"), ye(G, fn, "tab"), ye(G, ca, L.join(" ")), ye(G, Dt, nl(F, N + 1)), ye(G, Fr, -1), g.push({
        li: V,
        button: G,
        page: N
      });
    }
  }
  function $(_) {
    d(">" + _, !0);
  }
  function C(_, S) {
    var A = g.length, x = lc(S), B = b(), N = -1;
    x === v($i, !1, B) ? N = ++_ % A : x === v(Ai, !1, B) ? N = (--_ + A) % A : x === "Home" ? N = 0 : x === "End" && (N = A - 1);
    var V = g[N];
    V && (Nm(V.button), d(">" + N), an(S, !0));
  }
  function b() {
    return n.paginationDirection || n.direction;
  }
  function E(_) {
    return g[c.toPage(_)];
  }
  function k() {
    var _ = E(f(!0)), S = E(f());
    if (_) {
      var A = _.button;
      un(A, yr), Xt(A, Sd), ye(A, Fr, -1);
    }
    if (S) {
      var x = S.button;
      Gt(x, yr), ye(x, Sd, !0), ye(x, Fr, "");
    }
    a(oD, {
      list: m,
      items: g
    }, _, S);
  }
  return {
    items: g,
    mount: y,
    destroy: w,
    getAt: E,
    update: k
  };
}
var XD = [" ", "Enter"];
function KD(e, t, n) {
  var r = n.isNavigation, o = n.slideFocus, a = [];
  function i() {
    e.splides.forEach(function(p) {
      p.isParent || (c(e, p.splide), c(p.splide, e));
    }), r && u();
  }
  function l() {
    a.forEach(function(p) {
      p.destroy();
    }), mn(a);
  }
  function s() {
    l(), i();
  }
  function c(p, g) {
    var m = Ue(p);
    m.on(Fn, function(h, y, w) {
      g.go(g.is(so) ? w : h);
    }), a.push(m);
  }
  function u() {
    var p = Ue(e), g = p.on;
    g(Bm, d), g(jm, v), g([Er, bt], f), a.push(p), p.emit(Um, e.splides);
  }
  function f() {
    ye(t.Elements.list, ac, n.direction === Ni ? "vertical" : "");
  }
  function d(p) {
    e.go(p.index);
  }
  function v(p, g) {
    Jl(XD, lc(g)) && (d(p), an(g));
  }
  return {
    setup: Ne(t.Media.set, {
      slideFocus: ra(o) ? r : o
    }, !0),
    mount: i,
    destroy: l,
    remount: s
  };
}
function JD(e, t, n) {
  var r = Ue(e), o = r.bind, a = 0;
  function i() {
    n.wheel && o(t.Elements.track, "wheel", l, Nr);
  }
  function l(c) {
    if (c.cancelable) {
      var u = c.deltaY, f = u < 0, d = el(c), v = n.wheelMinThreshold || 0, p = n.wheelSleep || 0;
      yt(u) > v && d - a > p && (e.go(f ? "<" : ">"), a = d), s(f) && an(c);
    }
  }
  function s(c) {
    return !n.releaseWheel || e.state.is(ao) || t.Controller.getAdjacent(c) !== -1;
  }
  return {
    mount: i
  };
}
var ZD = 90;
function QD(e, t, n) {
  var r = Ue(e), o = r.on, a = t.Elements.track, i = n.live && !n.isNavigation, l = Ur("span", gD), s = Di(ZD, Ne(u, !1));
  function c() {
    i && (d(!t.Autoplay.isPaused()), ye(a, Od, !0), l.textContent = "…", o(Fm, Ne(d, !0)), o(Hm, Ne(d, !1)), o([la, io], Ne(u, !0)));
  }
  function u(v) {
    ye(a, Id, v), v ? (aa(a, l), s.start()) : (gr(l), s.cancel());
  }
  function f() {
    Xt(a, [kd, Od, Id]), gr(l);
  }
  function d(v) {
    i && ye(a, kd, v ? "off" : "polite");
  }
  return {
    mount: c,
    disable: d,
    destroy: f
  };
}
var eP = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Media: lD,
  Direction: cD,
  Elements: CD,
  Slides: SD,
  Layout: kD,
  Clones: OD,
  Move: DD,
  Controller: PD,
  Arrows: ND,
  Autoplay: RD,
  Cover: MD,
  Scroll: HD,
  Drag: YD,
  Keyboard: WD,
  LazyLoad: zD,
  Pagination: GD,
  Sync: KD,
  Wheel: JD,
  Live: QD
}), tP = {
  prev: "Previous slide",
  next: "Next slide",
  first: "Go to first slide",
  last: "Go to last slide",
  slideX: "Go to slide %s",
  pageX: "Go to page %s",
  play: "Start autoplay",
  pause: "Pause autoplay",
  carousel: "carousel",
  slide: "slide",
  select: "Select a slide to show",
  slideLabel: "%s of %s"
}, nP = {
  type: "slide",
  role: "region",
  speed: 400,
  perPage: 1,
  cloneStatus: !0,
  arrows: !0,
  pagination: !0,
  paginationKeyboard: !0,
  interval: 5e3,
  pauseOnHover: !0,
  pauseOnFocus: !0,
  resetProgress: !0,
  easing: "cubic-bezier(0.25, 1, 0.5, 1)",
  drag: !0,
  direction: "ltr",
  trimSpace: !0,
  focusableNodes: "a, button, textarea, input, select, iframe",
  live: !0,
  classes: bD,
  i18n: tP,
  reducedMotion: {
    speed: 0,
    rewindSpeed: 0,
    autoplay: "pause"
  }
};
function rP(e, t, n) {
  var r = t.Slides;
  function o() {
    Ue(e).on([Er, Ze], a);
  }
  function a() {
    r.forEach(function(l) {
      l.style("transform", "translateX(-" + 100 * l.index + "%)");
    });
  }
  function i(l, s) {
    r.style("transition", "opacity " + n.speed + "ms " + n.easing), Dm(s);
  }
  return {
    mount: o,
    start: i,
    cancel: Qs
  };
}
function oP(e, t, n) {
  var r = t.Move, o = t.Controller, a = t.Scroll, i = t.Elements.list, l = Ne(Rt, i, "transition"), s;
  function c() {
    Ue(e).bind(i, "transitionend", function(v) {
      v.target === i && s && (f(), s());
    });
  }
  function u(v, p) {
    var g = r.toPosition(v, !0), m = r.getPosition(), h = d(v);
    yt(g - m) >= 1 && h >= 1 ? n.useScroll ? a.scroll(g, h, !1, p) : (l("transform " + h + "ms " + n.easing), r.translate(g, !0), s = p) : (r.jump(v), p());
  }
  function f() {
    l(""), a.cancel();
  }
  function d(v) {
    var p = n.rewindSpeed;
    if (e.is(Jr) && p) {
      var g = o.getIndex(!0), m = o.getEnd();
      if (g === 0 && v >= m || g >= m && v === 0)
        return p;
    }
    return n.speed;
  }
  return {
    mount: c,
    start: u,
    cancel: f
  };
}
var aP = /* @__PURE__ */ function() {
  function e(n, r) {
    this.event = Ue(), this.Components = {}, this.state = iD(xr), this.splides = [], this._o = {}, this._E = {};
    var o = Vn(n) ? Rm(document, n) : n;
    To(o, o + " is invalid."), this.root = o, r = Pn({
      label: Mt(o, Dt) || "",
      labelledby: Mt(o, oc) || ""
    }, nP, e.defaults, r || {});
    try {
      Pn(r, JSON.parse(Mt(o, ec)));
    } catch {
      To(!1, "Invalid JSON");
    }
    this._o = Object.create(Pn({}, r));
  }
  var t = e.prototype;
  return t.mount = function(r, o) {
    var a = this, i = this.state, l = this.Components;
    To(i.is([xr, oi]), "Already mounted!"), i.set(xr), this._C = l, this._T = o || this._T || (this.is(ua) ? rP : oP), this._E = r || this._E;
    var s = Bo({}, eP, this._E, {
      Transition: this._T
    });
    return cr(s, function(c, u) {
      var f = c(a, l, a._o);
      l[u] = f, f.setup && f.setup();
    }), cr(l, function(c) {
      c.mount && c.mount();
    }), this.emit(Er), Gt(this.root, yD), i.set(Kr), this.emit(Cd), this;
  }, t.sync = function(r) {
    return this.splides.push({
      splide: r
    }), r.splides.push({
      splide: this,
      isParent: !0
    }), this.state.is(Kr) && (this._C.Sync.remount(), r.Components.Sync.remount()), this;
  }, t.go = function(r) {
    return this._C.Controller.go(r), this;
  }, t.on = function(r, o) {
    return this.event.on(r, o), this;
  }, t.off = function(r) {
    return this.event.off(r), this;
  }, t.emit = function(r) {
    var o;
    return (o = this.event).emit.apply(o, [r].concat(Kn(arguments, 1))), this;
  }, t.add = function(r, o) {
    return this._C.Slides.add(r, o), this;
  }, t.remove = function(r) {
    return this._C.Slides.remove(r), this;
  }, t.is = function(r) {
    return this._o.type === r;
  }, t.refresh = function() {
    return this.emit(Ze), this;
  }, t.destroy = function(r) {
    r === void 0 && (r = !0);
    var o = this.event, a = this.state;
    return a.is(xr) ? Ue(this).on(Cd, this.destroy.bind(this, r)) : (cr(this._C, function(i) {
      i.destroy && i.destroy(r);
    }, !0), o.emit(Vm), o.destroy(), r && mn(this.splides), a.set(oi)), this;
  }, YO(e, [{
    key: "options",
    get: function() {
      return this._o;
    },
    set: function(r) {
      this._C.Media.set(r, !0, !0);
    }
  }, {
    key: "length",
    get: function() {
      return this._C.Slides.getLength(!0);
    }
  }, {
    key: "index",
    get: function() {
      return this._C.Controller.getIndex();
    }
  }]), e;
}(), cc = aP;
cc.defaults = {};
cc.STATES = WO;
const iP = { class: "splide__track th-splide__track" }, sP = { class: "splide__list th-splide__list" }, lP = /* @__PURE__ */ pe({
  __name: "SliderComponent",
  setup(e) {
    const t = Q(null);
    return Ke(() => {
      t.value && new cc(".th-splide", {
        pagination: !1
      }).mount();
    }), (n, r) => (U(), X("div", {
      ref_key: "splide",
      ref: t,
      class: "th-splide splide"
    }, [
      q("div", iP, [
        q("ul", sP, [
          Yn(n.$slots, "default", {}, void 0, !0)
        ])
      ])
    ], 512));
  }
}), cP = /* @__PURE__ */ ge(lP, [["__scopeId", "data-v-405fedba"]]), av = jn("upsell-modal", () => {
  const e = Q(null), t = te(() => e.value), n = (o) => e.value = o, r = () => e.value = null;
  return Le(t, (o) => {
    window.dispatchEvent(
      new CustomEvent(o ? "th:upsellPopupOpen" : "th:upsellPopupClose")
    );
  }), {
    upsellProduct: e,
    isOpen: t,
    close: r,
    showUpsellModal: n
  };
}), uP = {
  key: 0,
  class: "th-upsell-modal__body"
}, dP = ["src"], fP = { class: "th-upsell-modal__content" }, pP = { class: "th-upsell-modal__header" }, hP = {
  key: 0,
  class: "th-upsell-modal__product-promo"
}, mP = { class: "th-upsell-modal__product-title" }, vP = { class: "th-upsell-modal__product-body__heading" }, gP = ["innerHTML"], yP = /* @__PURE__ */ pe({
  __name: "UpsellModal",
  emits: ["close"],
  setup(e, { emit: t }) {
    const { upsellProduct: n } = Io(av()), r = t, o = () => {
      r("close");
    }, a = (i) => {
      !i.isTrusted || i.code !== "Escape" || o();
    };
    return Ke(() => {
      window.addEventListener("keydown", a);
    }), Zr(() => {
      window.removeEventListener("keydown", a);
    }), (i, l) => W(n) ? (U(), X("div", uP, [
      z(Cl, { toggle: o }, {
        default: we(() => [
          W(n).images.length > 0 ? (U(), de(cP, {
            key: 0,
            class: "th-upsell-modal__images"
          }, {
            default: we(() => [
              (U(!0), X(Oe, null, it(W(n).images, (s) => (U(), X("img", {
                key: s,
                src: s,
                class: "th-splide__slide splide__slide"
              }, null, 8, dP))), 128))
            ]),
            _: 1
          })) : se("", !0),
          q("div", fP, [
            q("div", pP, [
              W(n).promoText ? (U(), X("div", hP, ae(W(n).promoText), 1)) : se("", !0),
              W(n).duration || W(n).rating ? (U(), de(kh, {
                key: 1,
                "bookings-count": W(n).bookingsCount,
                duration: W(n).duration,
                rating: W(n).rating,
                class: "th-upsell-modal__meta"
              }, null, 8, ["bookings-count", "duration", "rating"])) : se("", !0)
            ]),
            q("h1", mP, ae(W(n).title), 1),
            (U(!0), X(Oe, null, it(W(n).content, (s) => (U(), X("div", {
              key: s.heading,
              class: "th-upsell-modal__product-body"
            }, [
              q("div", vP, ae(s.heading), 1),
              q("div", {
                class: "th-upsell-modal__product-body__html",
                innerHTML: s.content
              }, null, 8, gP)
            ]))), 128))
          ])
        ]),
        _: 1
      })
    ])) : se("", !0);
  }
}), _P = /* @__PURE__ */ ge(yP, [["__scopeId", "data-v-95067087"]]);
var $d = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const bP = Qa.isDesktop, EP = /* @__PURE__ */ pe({
  __name: "App",
  props: {
    api: {},
    craftApi: {},
    currencies: { default: () => [
      {
        code: "EUR",
        symbol: "€",
        description: "Euro",
        rate: 1
      }
    ] },
    currencyApiUrl: {},
    detailedCartItemCategory: { type: Boolean, default: !1 },
    editCartItemEnabled: { type: Boolean, default: !0 },
    emptyCartBrowseLink: {},
    entertainmentTax: { default: "0" },
    language: {},
    messages: {},
    paymentMethods: { default: () => [] },
    products: { default: () => [] },
    quickProductEditing: { type: Boolean, default: !1 },
    resultTicketsLink: {},
    siteTitle: {},
    token: { default: "" },
    upgrades: { type: Boolean, default: !1 }
  },
  setup(e) {
    var h;
    const { open: t } = xn(), { locale: n } = De(), r = Uv(), o = e, a = $e(), i = Ln(), l = mi(), s = av(), c = xn(), u = Q(Date.now()), f = $d.VITE_RECALCULATE_CART_INTERVAL_MS, d = () => {
      const y = o.currencies.length === 1 && o.currencies[0].rate.toString() === "1";
      kb(
        o.api,
        o.language,
        o.currencyApiUrl,
        a.cartId,
        y,
        o.token,
        o.craftApi
      ), window.dispatchEvent(new CustomEvent("th:apiIsReady"));
    };
    a.$subscribe(() => {
      d(), window.dispatchEvent(new CustomEvent("th:apiIsUpdated"));
    }), window.ticketHub = {
      editCartItemEnabled: o.editCartItemEnabled,
      detailedCartItemCategory: o.detailedCartItemCategory,
      setCurrency: i.setCurrency,
      emptyCartLink: o.emptyCartBrowseLink,
      language: o.language,
      render: (h = Im.methods) == null ? void 0 : h.render,
      products: o.products,
      paymentMethods: o.paymentMethods,
      siteTitle: o.siteTitle,
      resultTicketsLink: o.resultTicketsLink,
      selectedCurrency: i.currentCurrency,
      entertainmentTax: o.entertainmentTax,
      langLinksReplacer: vr.replaceLangSwitcher
    }, typeof r.promo < "u" && (window.ticketHub.promoComponent = r.promo), typeof r.loader < "u" && (window.ticketHub.loaderComponent = r.loader), typeof o.messages < "u" && (/* @__PURE__ */ new Set([
      ...ln.global.availableLocales,
      ...Object.keys(o.messages)
    ])).forEach((w) => {
      const O = ln.global.getLocaleMessage(w);
      ln.global.setLocaleMessage(
        w,
        Om(O, o.messages[w])
      );
    }), window.ticketHub.translations = ln.global.messages;
    const v = te(() => [
      s.isOpen,
      l.isOpen,
      c.isOpen
    ].includes(!0)), p = () => {
      if (typeof vr.getQueryParamFromString(
        window.location.search,
        "cartItemId"
      ) < "u") {
        if (+$d.VITE_DEBUG && console.log("product editing"), o.quickProductEditing) {
          const w = document.querySelector(".th-quick-buy__button");
          w && w.click();
          return;
        }
        if (bP())
          return;
        t();
      }
    }, g = () => {
      setTimeout(() => {
        const y = document.querySelectorAll(".th-gtm-product"), w = [];
        y.forEach((O) => {
          const { itemId: $, price: C, title: b } = O.dataset;
          C && b && $ && w.push({
            item_id: $,
            item_name: b,
            price: Number(C)
          });
        }), jr.viewItemList(w);
      }, 0);
    }, m = () => {
      setInterval(async () => {
        u.value = Date.now(), !(ue(Date.now()).diff(
          ue(a.lastCartRequestTime),
          "milliseconds"
        ) < f) && a.cart.items.length && await a.recalculate();
      }, 1e3);
    };
    return Ke(async () => {
      window.dispatchEvent(new CustomEvent("th:pluginIsMounted")), m();
      try {
        d();
        const y = a.cart.customerInfo;
        n.value !== o.language && (n.value = o.language), y.culture !== n.value ? a.cartId ? await a.updateCustomerInfo({
          ...y,
          culture: o.language
        }) : await a.getCart() : await a.getCart(), await i.setCurrencies(o.currencies);
      } catch {
        await a.getCart();
      }
      window.dispatchEvent(new CustomEvent("th:pluginIsReady")), g(), p();
    }), (y, w) => {
      const O = tf("RouterView");
      return U(), X("div", {
        class: be([{ "th-default_shown-popup": v.value }, "th-default"])
      }, [
        z(hw),
        z(O),
        z(ul, {
          duration: 300,
          name: "dialog"
        }, {
          default: we(() => [
            W(s).isOpen ? (U(), de(_P, {
              key: 0,
              onClose: W(s).close
            }, null, 8, ["onClose"])) : se("", !0),
            W(l).isOpen ? (U(), de(ew, {
              key: 1,
              "empty-cart-browse-link": o.emptyCartBrowseLink
            }, null, 8, ["empty-cart-browse-link"])) : se("", !0)
          ]),
          _: 1
        }),
        z(sw),
        z(xO)
      ], 2);
    };
  }
}), wP = jn(
  "routes",
  () => {
    const e = Q(null), t = Q(null), n = (o) => {
      e.value = o;
    };
    return {
      lastRouteName: e,
      currentRouteName: t,
      setLastRouteName: n,
      setCurrentRouteName: (o) => {
        n(t.value), t.value = o;
      }
    };
  },
  {
    persist: !0
  }
), CP = /* @__PURE__ */ pe({
  __name: "PageCloseButton",
  setup(e) {
    const t = bi(), n = wP(), r = [];
    t.beforeEach((i, l) => {
      n.setCurrentRouteName(i.name), r.push(l);
    }), Ke(async () => {
      await t.isReady();
      const i = t.currentRoute;
      typeof i.value < "u" && n.setCurrentRouteName(i.value.name);
    });
    const o = () => {
      var i;
      if (typeof ((i = window.ticketHub) == null ? void 0 : i.language) < "u") {
        let l = window.location.pathname.split("/")[1];
        l = l === window.ticketHub.language ? l : "/";
        const s = new URL(l, window.location.origin);
        return window.location.assign(s.href.split("?")[0]);
      }
    }, a = () => {
      var l;
      if (window.dispatchEvent(new CustomEvent("th:pageCloseButtonClick")), n.currentRouteName === n.lastRouteName) {
        o();
        return;
      }
      const i = (l = r.filter((s) => !s.name).reverse()) == null ? void 0 : l[0];
      if (typeof i > "u") {
        window.history.back();
        return;
      }
      typeof i.href > "u" && o(), i && window.location.assign(i.href.split("?")[0]);
    };
    return (i, l) => (U(), X("button", {
      type: "button",
      onClick: a
    }, [
      Yn(i.$slots, "default")
    ]));
  }
}), TP = /* @__PURE__ */ pe({
  __name: "QuickBuyButton",
  props: {
    product: {}
  },
  setup(e) {
    const t = xn(), n = e;
    return (r, o) => (U(), X("div", {
      class: "th-quick-buy__button",
      onClick: o[0] || (o[0] = Ye((a) => W(t).setQuickBuyProduct(n.product), ["prevent", "stop"]))
    }, [
      Yn(r.$slots, "default")
    ]));
  }
}), SP = { class: "th-currency__symbol" }, kP = {
  key: 0,
  class: "th-currency__title"
}, IP = /* @__PURE__ */ pe({
  __name: "CurrencyComponent",
  props: {
    showTitle: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, { current: n } = Io(Ln()), { open: r } = Hs();
    return (o, a) => (U(), X("button", {
      class: "th-currency",
      type: "button",
      onClick: a[0] || (a[0] = //@ts-ignore
      (...i) => W(r) && W(r)(...i))
    }, [
      q("span", SP, ae(W(n).symbol), 1),
      t.showTitle ? (U(), X("span", kP, ae(W(n).description), 1)) : se("", !0)
    ]));
  }
}), OP = /* @__PURE__ */ ge(IP, [["__scopeId", "data-v-546b5f6c"]]);
var iv = { exports: {} };
(function(e, t) {
  (function(n, r) {
    r();
  })(Yt, function() {
    function n(c, u) {
      return typeof u > "u" ? u = { autoBom: !1 } : typeof u != "object" && (console.warn("Deprecated: Expected third argument to be a object"), u = { autoBom: !u }), u.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(c.type) ? new Blob(["\uFEFF", c], { type: c.type }) : c;
    }
    function r(c, u, f) {
      var d = new XMLHttpRequest();
      d.open("GET", c), d.responseType = "blob", d.onload = function() {
        s(d.response, u, f);
      }, d.onerror = function() {
        console.error("could not download file");
      }, d.send();
    }
    function o(c) {
      var u = new XMLHttpRequest();
      u.open("HEAD", c, !1);
      try {
        u.send();
      } catch {
      }
      return 200 <= u.status && 299 >= u.status;
    }
    function a(c) {
      try {
        c.dispatchEvent(new MouseEvent("click"));
      } catch {
        var u = document.createEvent("MouseEvents");
        u.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), c.dispatchEvent(u);
      }
    }
    var i = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof Yt == "object" && Yt.global === Yt ? Yt : void 0, l = i.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), s = i.saveAs || (typeof window != "object" || window !== i ? function() {
    } : "download" in HTMLAnchorElement.prototype && !l ? function(c, u, f) {
      var d = i.URL || i.webkitURL, v = document.createElement("a");
      u = u || c.name || "download", v.download = u, v.rel = "noopener", typeof c == "string" ? (v.href = c, v.origin === location.origin ? a(v) : o(v.href) ? r(c, u, f) : a(v, v.target = "_blank")) : (v.href = d.createObjectURL(c), setTimeout(function() {
        d.revokeObjectURL(v.href);
      }, 4e4), setTimeout(function() {
        a(v);
      }, 0));
    } : "msSaveOrOpenBlob" in navigator ? function(c, u, f) {
      if (u = u || c.name || "download", typeof c != "string")
        navigator.msSaveOrOpenBlob(n(c, f), u);
      else if (o(c))
        r(c, u, f);
      else {
        var d = document.createElement("a");
        d.href = c, d.target = "_blank", setTimeout(function() {
          a(d);
        });
      }
    } : function(c, u, f, d) {
      if (d = d || open("", "_blank"), d && (d.document.title = d.document.body.innerText = "downloading..."), typeof c == "string")
        return r(c, u, f);
      var v = c.type === "application/octet-stream", p = /constructor/i.test(i.HTMLElement) || i.safari, g = /CriOS\/[\d]+/.test(navigator.userAgent);
      if ((g || v && p || l) && typeof FileReader < "u") {
        var m = new FileReader();
        m.onloadend = function() {
          var w = m.result;
          w = g ? w : w.replace(/^data:[^;]*;/, "data:attachment/file;"), d ? d.location.href = w : location = w, d = null;
        }, m.readAsDataURL(c);
      } else {
        var h = i.URL || i.webkitURL, y = h.createObjectURL(c);
        d ? d.location = y : location.href = y, d = null, setTimeout(function() {
          h.revokeObjectURL(y);
        }, 4e4);
      }
    });
    i.saveAs = s.saveAs = s, e.exports = s;
  });
})(iv);
var DP = iv.exports;
const PP = { class: "th-result__content" }, AP = { class: "th-result__title" }, $P = ["innerHTML"], NP = {
  key: 0,
  class: "th-result__hint"
}, LP = { class: "th-result__actions" }, RP = $o.downloadTickets, MP = /* @__PURE__ */ pe({
  __name: "ResultComponent",
  setup(e) {
    const { t } = De(), n = $e(), { showErrorToast: r } = br(), o = Ch(), a = Q(!0), i = Q(n.cart), l = Q(t("payment.enjoyYourTrip")), s = Q(!1), c = Q(""), u = Q(0), f = Q(""), d = Q(!0), v = Q(!1), p = te(() => El.includes(i.value.status)), g = async () => {
      if (d.value)
        try {
          if (s.value && !p.value && await y(), p.value)
            d.value = !1;
          else
            throw Error("ticketsNotAvailable");
        } catch {
          setTimeout(() => {
            g();
          }, 1e3);
        }
    }, m = async (b) => {
      switch (b && (l.value = t(`payment.${b == null ? void 0 : b.resultCode}`), f.value = b.merchantReference), b.resultCode) {
        case "Authorised":
        case "Rebooked":
          n.cartId === o.query.cartId && await n.createNewCart(), s.value = !0, l.value = (b == null ? void 0 : b.resultCode) === "Rebooked" ? t(`payment.${b == null ? void 0 : b.resultCode}`) : t("payment.enjoyYourTrip"), c.value = t("payment.thankForPurchase", {
            email: i.value.customerInfo.email
          }), await jr.purchase(
            b.merchantReference || i.value.cartId,
            i.value
          ), await g();
          break;
        case "Pending":
          c.value = t("payment.paymentIsPending", {
            email: i.value.customerInfo.email
          }), setTimeout(() => {
            h();
          }, 1e4);
          break;
        default:
          l.value = t("payment.errorOccurred"), s.value = !1;
          break;
      }
    }, h = async () => {
      let b = null;
      try {
        if (o.query.isFree)
          b = { resultCode: "Authorised" }, o.query.rebooked && (b = { resultCode: "Rebooked" });
        else if (o.query.redirectResult) {
          const E = o.query.redirectResult;
          b = await $o.getDetails(E);
        } else
          b = o.query;
      } catch {
        alert("error");
      }
      await m(b), a.value = !1;
    }, y = async () => {
      i.value = await vt.getCart(
        o.query.cartId || n.cartId
      );
    }, w = te(() => {
      var b, E;
      return ((b = window.ticketHub) == null ? void 0 : b.resultTicketsLink) ?? ((E = window.ticketHub) == null ? void 0 : E.emptyCartLink);
    }), O = async () => {
      try {
        d.value = !0;
        const { blob: b } = await RP(i.value.cartId);
        DP.saveAs(b, `${f.value}.pdf`);
      } catch (b) {
        b instanceof It && r();
      } finally {
        d.value = !1;
      }
    }, $ = async () => {
      v.value || (v.value = !0, await y(), await h(), setTimeout(() => {
        p.value || (d.value = !1, clearInterval(u.value));
      }, 6e4));
    }, C = () => {
      var E;
      let b = (E = Hn()) == null ? void 0 : E.appContext.app._container;
      b || (b = document.querySelector("#app")), b && (b.dataset.resultStatus = s.value ? "success" : "error");
    };
    return Ke(() => {
      if (vr.replaceLangSwitcher(), C(), typeof o.name > "u") {
        window.addEventListener("th:apiIsReady", $);
        return;
      }
      $();
    }), Zr(() => {
      typeof o.name > "u" && window.addEventListener("th:apiIsReady", $);
    }), Le(s, () => {
      C();
    }), (b, E) => a.value ? se("", !0) : (U(), X("div", {
      key: 0,
      class: be([{
        "th-result__container_success": s.value,
        "th-result__container_error": !s.value
      }, "th-result__container"])
    }, [
      q("div", PP, [
        q("h1", AP, ae(l.value), 1),
        q("p", {
          class: "th-result__description",
          innerHTML: c.value
        }, null, 8, $P),
        s.value ? (U(), X("p", NP, ae(W(t)("payment.success")), 1)) : se("", !0)
      ]),
      q("div", LP, [
        s.value ? se("", !0) : (U(), de(ot, {
          key: 0,
          to: { name: "payment" },
          bg: "accent",
          tag: "router-link"
        }, {
          default: we(() => [
            Ge(ae(W(t)("payment.back")), 1)
          ]),
          _: 1
        })),
        s.value ? (U(), de(ot, {
          key: 1,
          disabled: !p.value,
          loading: d.value,
          bg: "accent",
          onClick: O
        }, {
          default: we(() => [
            Ge(ae(W(t)("payment.downloadTickets")), 1)
          ]),
          _: 1
        }, 8, ["disabled", "loading"])) : se("", !0),
        z(ot, {
          to: w.value,
          tag: "a"
        }, {
          default: we(() => [
            Ge(ae(W(t)("payment.moreActivities")), 1)
          ]),
          _: 1
        }, 8, ["to"])
      ])
    ], 2));
  }
}), xP = /* @__PURE__ */ ge(MP, [["__scopeId", "data-v-c7834c15"]]), BP = ["for"], VP = {
  key: 0,
  class: "th-input__label"
}, UP = { class: "th-input__wrapper" }, FP = ["id", "autocomplete", "disabled", "name", "type", "value"], HP = { class: "th-input__icon" }, YP = /* @__PURE__ */ pe({
  __name: "InputComponent",
  props: {
    value: {},
    type: { default: "text" },
    name: {},
    label: {},
    required: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = te(() => {
      const r = t.required ? "*" : "";
      return `${t.label}${r}`;
    });
    return (r, o) => (U(), X("label", {
      for: r.name,
      class: "th-input"
    }, [
      r.label ? (U(), X("span", VP, ae(n.value), 1)) : se("", !0),
      q("span", UP, [
        q("input", {
          id: r.name,
          autocomplete: r.name,
          disabled: r.disabled,
          name: r.name,
          type: r.type,
          value: r.value,
          class: "th-input__element",
          onInput: o[0] || (o[0] = (a) => {
            var i;
            return r.$emit("update:modelValue", (i = a.target) == null ? void 0 : i.value);
          })
        }, null, 40, FP),
        q("span", HP, [
          Yn(r.$slots, "default", {}, void 0, !0)
        ])
      ])
    ], 8, BP));
  }
}), Nd = /* @__PURE__ */ ge(YP, [["__scopeId", "data-v-05768fc3"]]), uc = (e) => {
  if (e = W(e), Array.isArray(e))
    return !!e.length;
  if (e == null)
    return !1;
  if (e === !1)
    return !0;
  if (e instanceof Date)
    return !isNaN(e.getTime());
  if (typeof e == "object") {
    for (let t in e)
      return !0;
    return !1;
  }
  return !!String(e).length;
}, jP = (e) => (e = W(e), Array.isArray(e) ? e.length : typeof e == "object" ? Object.keys(e).length : String(e).length);
function wr() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return (r) => (r = W(r), !uc(r) || t.every((o) => (o.lastIndex = 0, o.test(r))));
}
wr(/^[a-zA-Z]*$/);
wr(/^[a-zA-Z0-9]*$/);
wr(/^\d*(\.\d+)?$/);
const WP = /^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
var qP = wr(WP), zP = {
  $validator: qP,
  $message: "Value is not a valid email address",
  $params: {
    type: "email"
  }
};
function GP(e) {
  return (t) => !uc(t) || jP(t) <= W(e);
}
function Ld(e) {
  return {
    $validator: GP(e),
    $message: (t) => {
      let {
        $params: n
      } = t;
      return `The maximum length allowed is ${n.max}`;
    },
    $params: {
      max: e,
      type: "maxLength"
    }
  };
}
function XP(e) {
  return typeof e == "string" && (e = e.trim()), uc(e);
}
var Rd = {
  $validator: XP,
  $message: "Value is required",
  $params: {
    type: "required"
  }
};
const KP = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
wr(KP);
wr(/(^[0-9]*$)|(^-[0-9]+$)/);
wr(/^[-]?\d*(\.\d+)?$/);
function Md(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Sn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Md(Object(n), !0).forEach(function(r) {
      JP(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Md(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function JP(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function xd(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return Object.keys(e).reduce((n, r) => (t.includes(r) || (n[r] = W(e[r])), n), {});
}
function li(e) {
  return typeof e == "function";
}
function ZP(e) {
  return Wo(e) || Hv(e);
}
function sv(e, t, n) {
  let r = e;
  const o = t.split(".");
  for (let a = 0; a < o.length; a++) {
    if (!r[o[a]])
      return n;
    r = r[o[a]];
  }
  return r;
}
function vs(e, t, n) {
  return te(() => e.some((r) => sv(t, r, {
    [n]: !1
  })[n]));
}
function Bd(e, t, n) {
  return te(() => e.reduce((r, o) => {
    const a = sv(t, o, {
      [n]: !1
    })[n] || [];
    return r.concat(a);
  }, []));
}
function lv(e, t, n, r) {
  return e.call(r, W(t), W(n), r);
}
function cv(e) {
  return e.$valid !== void 0 ? !e.$valid : !e;
}
function QP(e, t, n, r, o, a, i) {
  let {
    $lazy: l,
    $rewardEarly: s
  } = o, c = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : [], u = arguments.length > 8 ? arguments[8] : void 0, f = arguments.length > 9 ? arguments[9] : void 0, d = arguments.length > 10 ? arguments[10] : void 0;
  const v = Q(!!r.value), p = Q(0);
  n.value = !1;
  const g = Le([t, r].concat(c, d), () => {
    if (l && !r.value || s && !f.value && !n.value)
      return;
    let m;
    try {
      m = lv(e, t, u, i);
    } catch (h) {
      m = Promise.reject(h);
    }
    p.value++, n.value = !!p.value, v.value = !1, Promise.resolve(m).then((h) => {
      p.value--, n.value = !!p.value, a.value = h, v.value = cv(h);
    }).catch((h) => {
      p.value--, n.value = !!p.value, a.value = h, v.value = !0;
    });
  }, {
    immediate: !0,
    deep: typeof t == "object"
  });
  return {
    $invalid: v,
    $unwatch: g
  };
}
function eA(e, t, n, r, o, a, i, l) {
  let {
    $lazy: s,
    $rewardEarly: c
  } = r;
  const u = () => ({}), f = te(() => {
    if (s && !n.value || c && !l.value)
      return !1;
    let d = !0;
    try {
      const v = lv(e, t, i, a);
      o.value = v, d = cv(v);
    } catch (v) {
      o.value = v;
    }
    return d;
  });
  return {
    $unwatch: u,
    $invalid: f
  };
}
function tA(e, t, n, r, o, a, i, l, s, c, u) {
  const f = Q(!1), d = e.$params || {}, v = Q(null);
  let p, g;
  e.$async ? {
    $invalid: p,
    $unwatch: g
  } = QP(e.$validator, t, f, n, r, v, o, e.$watchTargets, s, c, u) : {
    $invalid: p,
    $unwatch: g
  } = eA(e.$validator, t, n, r, v, o, s, c);
  const m = e.$message;
  return {
    $message: li(m) ? te(() => m(xd({
      $pending: f,
      $invalid: p,
      $params: xd(d),
      $model: t,
      $response: v,
      $validator: a,
      $propertyPath: l,
      $property: i
    }))) : m || "",
    $params: d,
    $pending: f,
    $invalid: p,
    $response: v,
    $unwatch: g
  };
}
function nA() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const t = W(e), n = Object.keys(t), r = {}, o = {}, a = {};
  let i = null;
  return n.forEach((l) => {
    const s = t[l];
    switch (!0) {
      case li(s.$validator):
        r[l] = s;
        break;
      case li(s):
        r[l] = {
          $validator: s
        };
        break;
      case l === "$validationGroups":
        i = s;
        break;
      case l.startsWith("$"):
        a[l] = s;
        break;
      default:
        o[l] = s;
    }
  }), {
    rules: r,
    nestedValidators: o,
    config: a,
    validationGroups: i
  };
}
const rA = "__root";
function oA(e, t, n, r, o, a, i, l, s) {
  const c = Object.keys(e), u = r.get(o, e), f = Q(!1), d = Q(!1), v = Q(0);
  if (u) {
    if (!u.$partial)
      return u;
    u.$unwatch(), f.value = u.$dirty.value;
  }
  const p = {
    $dirty: f,
    $path: o,
    $touch: () => {
      f.value || (f.value = !0);
    },
    $reset: () => {
      f.value && (f.value = !1);
    },
    $commit: () => {
    }
  };
  return c.length ? (c.forEach((g) => {
    p[g] = tA(e[g], t, p.$dirty, a, i, g, n, o, s, d, v);
  }), p.$externalResults = te(() => l.value ? [].concat(l.value).map((g, m) => ({
    $propertyPath: o,
    $property: n,
    $validator: "$externalResults",
    $uid: `${o}-externalResult-${m}`,
    $message: g,
    $params: {},
    $response: null,
    $pending: !1
  })) : []), p.$invalid = te(() => {
    const g = c.some((m) => W(p[m].$invalid));
    return d.value = g, !!p.$externalResults.value.length || g;
  }), p.$pending = te(() => c.some((g) => W(p[g].$pending))), p.$error = te(() => p.$dirty.value ? p.$pending.value || p.$invalid.value : !1), p.$silentErrors = te(() => c.filter((g) => W(p[g].$invalid)).map((g) => {
    const m = p[g];
    return jo({
      $propertyPath: o,
      $property: n,
      $validator: g,
      $uid: `${o}-${g}`,
      $message: m.$message,
      $params: m.$params,
      $response: m.$response,
      $pending: m.$pending
    });
  }).concat(p.$externalResults.value)), p.$errors = te(() => p.$dirty.value ? p.$silentErrors.value : []), p.$unwatch = () => c.forEach((g) => {
    p[g].$unwatch();
  }), p.$commit = () => {
    d.value = !0, v.value = Date.now();
  }, r.set(o, e, p), p) : (u && r.set(o, e, p), p);
}
function aA(e, t, n, r, o, a, i) {
  const l = Object.keys(e);
  return l.length ? l.reduce((s, c) => (s[c] = al({
    validations: e[c],
    state: t,
    key: c,
    parentKey: n,
    resultsCache: r,
    globalConfig: o,
    instance: a,
    externalResults: i
  }), s), {}) : {};
}
function iA(e, t, n) {
  const r = te(() => [t, n].filter((p) => p).reduce((p, g) => p.concat(Object.values(W(g))), [])), o = te({
    get() {
      return e.$dirty.value || (r.value.length ? r.value.every((p) => p.$dirty) : !1);
    },
    set(p) {
      e.$dirty.value = p;
    }
  }), a = te(() => {
    const p = W(e.$silentErrors) || [], g = r.value.filter((m) => (W(m).$silentErrors || []).length).reduce((m, h) => m.concat(...h.$silentErrors), []);
    return p.concat(g);
  }), i = te(() => {
    const p = W(e.$errors) || [], g = r.value.filter((m) => (W(m).$errors || []).length).reduce((m, h) => m.concat(...h.$errors), []);
    return p.concat(g);
  }), l = te(() => r.value.some((p) => p.$invalid) || W(e.$invalid) || !1), s = te(() => r.value.some((p) => W(p.$pending)) || W(e.$pending) || !1), c = te(() => r.value.some((p) => p.$dirty) || r.value.some((p) => p.$anyDirty) || o.value), u = te(() => o.value ? s.value || l.value : !1), f = () => {
    e.$touch(), r.value.forEach((p) => {
      p.$touch();
    });
  }, d = () => {
    e.$commit(), r.value.forEach((p) => {
      p.$commit();
    });
  }, v = () => {
    e.$reset(), r.value.forEach((p) => {
      p.$reset();
    });
  };
  return r.value.length && r.value.every((p) => p.$dirty) && f(), {
    $dirty: o,
    $errors: i,
    $invalid: l,
    $anyDirty: c,
    $error: u,
    $pending: s,
    $touch: f,
    $reset: v,
    $silentErrors: a,
    $commit: d
  };
}
function al(e) {
  let {
    validations: t,
    state: n,
    key: r,
    parentKey: o,
    childResults: a,
    resultsCache: i,
    globalConfig: l = {},
    instance: s,
    externalResults: c
  } = e;
  const u = o ? `${o}.${r}` : r, {
    rules: f,
    nestedValidators: d,
    config: v,
    validationGroups: p
  } = nA(t), g = Sn(Sn({}, l), v), m = r ? te(() => {
    const M = W(n);
    return M ? W(M[r]) : void 0;
  }) : n, h = Sn({}, W(c) || {}), y = te(() => {
    const M = W(c);
    return r ? M ? W(M[r]) : void 0 : M;
  }), w = oA(f, m, r, i, u, g, s, y, n), O = aA(d, m, u, i, g, s, y), $ = {};
  p && Object.entries(p).forEach((M) => {
    let [K, re] = M;
    $[K] = {
      $invalid: vs(re, O, "$invalid"),
      $error: vs(re, O, "$error"),
      $pending: vs(re, O, "$pending"),
      $errors: Bd(re, O, "$errors"),
      $silentErrors: Bd(re, O, "$silentErrors")
    };
  });
  const {
    $dirty: C,
    $errors: b,
    $invalid: E,
    $anyDirty: k,
    $error: _,
    $pending: S,
    $touch: A,
    $reset: x,
    $silentErrors: B,
    $commit: N
  } = iA(w, O, a), V = r ? te({
    get: () => W(m),
    set: (M) => {
      C.value = !0;
      const K = W(n), re = W(c);
      re && (re[r] = h[r]), zt(K[r]) ? K[r].value = M : K[r] = M;
    }
  }) : null;
  r && g.$autoDirty && Le(m, () => {
    C.value || A();
    const M = W(c);
    M && (M[r] = h[r]);
  }, {
    flush: "sync"
  });
  async function G() {
    return A(), g.$rewardEarly && (N(), await $n()), await $n(), new Promise((M) => {
      if (!S.value)
        return M(!E.value);
      const K = Le(S, () => {
        M(!E.value), K();
      });
    });
  }
  function L(M) {
    return (a.value || {})[M];
  }
  function F() {
    zt(c) ? c.value = h : Object.keys(h).length === 0 ? Object.keys(c).forEach((M) => {
      delete c[M];
    }) : Object.assign(c, h);
  }
  return jo(Sn(Sn(Sn({}, w), {}, {
    $model: V,
    $dirty: C,
    $error: _,
    $errors: b,
    $invalid: E,
    $anyDirty: k,
    $pending: S,
    $touch: A,
    $reset: x,
    $path: u || rA,
    $silentErrors: B,
    $validate: G,
    $commit: N
  }, a && {
    $getResultsForChild: L,
    $clearExternalResults: F,
    $validationGroups: $
  }), O));
}
class sA {
  constructor() {
    this.storage = /* @__PURE__ */ new Map();
  }
  set(t, n, r) {
    this.storage.set(t, {
      rules: n,
      result: r
    });
  }
  checkRulesValidity(t, n, r) {
    const o = Object.keys(r), a = Object.keys(n);
    return a.length !== o.length || !a.every((l) => o.includes(l)) ? !1 : a.every((l) => n[l].$params ? Object.keys(n[l].$params).every((s) => W(r[l].$params[s]) === W(n[l].$params[s])) : !0);
  }
  get(t, n) {
    const r = this.storage.get(t);
    if (!r)
      return;
    const {
      rules: o,
      result: a
    } = r, i = this.checkRulesValidity(t, n, o), l = a.$unwatch ? a.$unwatch : () => ({});
    return i ? a : {
      $dirty: a.$dirty,
      $partial: !0,
      $unwatch: l
    };
  }
}
const Va = {
  COLLECT_ALL: !0,
  COLLECT_NONE: !1
}, Vd = Symbol("vuelidate#injectChildResults"), Ud = Symbol("vuelidate#removeChildResults");
function lA(e) {
  let {
    $scope: t,
    instance: n
  } = e;
  const r = {}, o = Q([]), a = te(() => o.value.reduce((u, f) => (u[f] = W(r[f]), u), {}));
  function i(u, f) {
    let {
      $registerAs: d,
      $scope: v,
      $stopPropagation: p
    } = f;
    p || t === Va.COLLECT_NONE || v === Va.COLLECT_NONE || t !== Va.COLLECT_ALL && t !== v || (r[d] = u, o.value.push(d));
  }
  n.__vuelidateInjectInstances = [].concat(n.__vuelidateInjectInstances || [], i);
  function l(u) {
    o.value = o.value.filter((f) => f !== u), delete r[u];
  }
  n.__vuelidateRemoveInstances = [].concat(n.__vuelidateRemoveInstances || [], l);
  const s = _t(Vd, []);
  An(Vd, n.__vuelidateInjectInstances);
  const c = _t(Ud, []);
  return An(Ud, n.__vuelidateRemoveInstances), {
    childResults: a,
    sendValidationResultsToParent: s,
    removeValidationResultsFromParent: c
  };
}
function uv(e) {
  return new Proxy(e, {
    get(t, n) {
      return typeof t[n] == "object" ? uv(t[n]) : te(() => t[n]);
    }
  });
}
let Fd = 0;
function cA(e, t) {
  var n;
  let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  arguments.length === 1 && (r = e, e = void 0, t = void 0);
  let {
    $registerAs: o,
    $scope: a = Va.COLLECT_ALL,
    $stopPropagation: i,
    $externalResults: l,
    currentVueInstance: s
  } = r;
  const c = s || ((n = Hn()) === null || n === void 0 ? void 0 : n.proxy), u = c ? c.$options : {};
  o || (Fd += 1, o = `_vuelidate_${Fd}`);
  const f = Q({}), d = new sA(), {
    childResults: v,
    sendValidationResultsToParent: p,
    removeValidationResultsFromParent: g
  } = c ? lA({
    $scope: a,
    instance: c
  }) : {
    childResults: Q({})
  };
  if (!e && u.validations) {
    const m = u.validations;
    t = Q({}), Fv(() => {
      t.value = c, Le(() => li(m) ? m.call(t.value, new uv(t.value)) : m, (h) => {
        f.value = al({
          validations: h,
          state: t,
          childResults: v,
          resultsCache: d,
          globalConfig: r,
          instance: c,
          externalResults: l || c.vuelidateExternalResults
        });
      }, {
        immediate: !0
      });
    }), r = u.validationsConfig || r;
  } else {
    const m = zt(e) || ZP(e) ? e : jo(e || {});
    Le(m, (h) => {
      f.value = al({
        validations: h,
        state: t,
        childResults: v,
        resultsCache: d,
        globalConfig: r,
        instance: c ?? {},
        externalResults: l
      });
    }, {
      immediate: !0
    });
  }
  return c && (p.forEach((m) => m(f, {
    $registerAs: o,
    $scope: a,
    $stopPropagation: i
  })), Zr(() => g.forEach((m) => m(o)))), te(() => Sn(Sn({}, W(f.value)), v.value));
}
const uA = { class: "th-payment-loader" }, dA = 5e3, fA = /* @__PURE__ */ pe({
  __name: "PaymentLoader",
  setup(e) {
    const t = Q(0), n = Q(0), r = Q(null), { t: o } = De(), a = [o("paymentLoader.booking"), o("paymentLoader.nearly")];
    return Ke(() => {
      var i, l;
      typeof ((i = window.ticketHub) == null ? void 0 : i.loaderComponent) < "u" && (r.value = (l = window.ticketHub) == null ? void 0 : l.loaderComponent), n.value = window.setInterval(() => {
        if (t.value === a.length - 1) {
          t.value = 0;
          return;
        }
        t.value++;
      }, dA);
    }), Zr(() => {
      window.clearInterval(n.value);
    }), (i, l) => (U(), X("div", uA, [
      z(ul, {
        class: "th-payment-loader__messages",
        mode: "out-in",
        name: "payment-loader",
        tag: "div"
      }, {
        default: we(() => [
          (U(), X("span", {
            key: t.value,
            class: "th-payment-loader__message"
          }, ae(a[t.value]), 1))
        ]),
        _: 1
      }),
      q("div", {
        class: be([{ "th-payment-loader__progress_custom": r.value }, "th-payment-loader__progress"])
      }, [
        (U(), de(qo(r.value)))
      ], 2)
    ]));
  }
}), pA = /* @__PURE__ */ ge(fA, [["__scopeId", "data-v-fff17c45"]]), hA = {
  key: 0,
  class: "th-rebook-item"
}, mA = { class: "th-rebook-item__title" }, vA = /* @__PURE__ */ pe({
  __name: "RebookItem",
  props: {
    cartItem: {}
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const { showErrorToast: n } = br(), r = e, o = t, a = te(
      () => Rn.getCartProduct(r.cartItem)
    ), i = Q(!1), l = Q(null), s = te(() => {
      var c, u;
      return {
        cartProduct: (c = l.value) == null ? void 0 : c.cartProductFormat,
        isTimeslotsAreSelected: (u = l.value) == null ? void 0 : u.isTimeslotsAreSelected
      };
    });
    return Ke(async () => {
      var c;
      if (l.value = await Rn.getProduct(
        a.value
      ), !!l.value) {
        l.value.setCartItem(r.cartItem), (c = l.value) == null || c.loadCartItem(a.value.id);
        try {
          i.value = !0;
          const u = await mr.getProductBookingData(
            l.value,
            ue(/* @__PURE__ */ new Date()).format("YYYY-MM-DD")
          );
          await l.value.setBookingData(u);
        } catch (u) {
          n(u.message);
        } finally {
          i.value = !1;
        }
      }
    }), Le(s, () => {
      s.value && o("change", s.value);
    }), (c, u) => i.value ? (U(), de(pA, { key: 1 })) : (U(), X("div", hA, [
      q("h3", mA, ae(a.value.title), 1),
      l.value ? (U(), de(Ws, {
        key: 0,
        product: l.value
      }, null, 8, ["product"])) : se("", !0)
    ]));
  }
}), gA = { class: "th-rebook-form" }, yA = { class: "th-rebook__items" }, _A = /* @__PURE__ */ pe({
  __name: "RebookForm",
  setup(e) {
    const { getCart: t, updateCart: n } = za, { showErrorToast: r, showToast: o } = br(), { t: a } = De(), i = {
      email: { required: Rd, email: zP, maxLength: Ld(60) },
      orderReference: { required: Rd, maxLength: Ld(40) }
    }, l = Q([]), s = Q(null), c = Q(!1), u = Q([]), f = Q({
      email: "",
      orderReference: ""
    }), d = cA(i, f), v = te(() => u.value.some((y) => !y)), p = async () => {
      if (c.value = !0, !d.value.$invalid)
        try {
          s.value = await t(
            f.value.email,
            f.value.orderReference
          );
        } catch (y) {
          const w = /\s\[.*\]/gm;
          let O = y.message;
          O = O.replace(w, ""), r(O);
        } finally {
          c.value = !1;
        }
    }, g = () => {
      var y;
      if (typeof ((y = window.ticketHub) == null ? void 0 : y.language) < "u") {
        let w = window.location.pathname.split("/")[1];
        return w = w === window.ticketHub.language ? w : "", new URL(`${w}/result`, window.location.origin);
      }
      return new URL("result", window.location.origin);
    }, m = async () => {
      var y, w;
      c.value = !0;
      try {
        s.value = await n(
          (y = s.value) == null ? void 0 : y.cartId,
          f.value.orderReference,
          l.value
        ), o(a("toast.orderHasBeenUpdated"));
        const O = g();
        O.searchParams.set("isFree", "true"), O.searchParams.set("rebooked", "true"), O.searchParams.set("cartId", (w = s.value) == null ? void 0 : w.cartId), window.location.assign(O.href);
      } catch (O) {
        r(O.message);
      } finally {
        c.value = !1;
      }
    }, h = (y, w) => {
      l.value[y] = w.cartProduct, u.value[y] = w.isTimeslotsAreSelected;
    };
    return (y, w) => (U(), X("div", gA, [
      s.value ? (U(), X(Oe, { key: 1 }, [
        q("div", yA, [
          (U(!0), X(Oe, null, it(s.value.items, (O, $) => (U(), de(vA, {
            key: $,
            "cart-item": O,
            onChange: (C) => h($, C)
          }, null, 8, ["cart-item", "onChange"]))), 128))
        ]),
        z(ot, {
          disabled: v.value,
          loading: c.value,
          class: "th-rebook__form-button",
          type: "submit",
          wide: "",
          onClick: m
        }, {
          default: we(() => [
            Ge(ae(W(a)("booking.update")), 1)
          ]),
          _: 1
        }, 8, ["disabled", "loading"])
      ], 64)) : (U(), X("form", {
        key: 0,
        onSubmit: Ye(p, ["prevent"])
      }, [
        z(Nd, {
          modelValue: f.value.email,
          "onUpdate:modelValue": w[0] || (w[0] = (O) => f.value.email = O),
          label: W(a)("booking.enterEmail"),
          value: f.value.email,
          required: ""
        }, null, 8, ["modelValue", "label", "value"]),
        z(Nd, {
          modelValue: f.value.orderReference,
          "onUpdate:modelValue": w[1] || (w[1] = (O) => f.value.orderReference = O),
          label: W(a)("booking.enterOrderReference"),
          value: f.value.orderReference,
          required: ""
        }, null, 8, ["modelValue", "label", "value"]),
        z(ot, {
          disabled: W(d).$invalid,
          loading: c.value,
          class: "th-rebook__form-button",
          type: "submit",
          wide: ""
        }, {
          default: we(() => [
            Ge(ae(W(a)("booking.submit")), 1)
          ]),
          _: 1
        }, 8, ["disabled", "loading"])
      ], 32))
    ]));
  }
}), il = {
  ThCart: EP,
  ThCartButton: Tm,
  ThCartCount: Sm,
  ThPageCloseButton: CP,
  ThProduct: Gl,
  ThQuickBuyButton: TP,
  ThBookButton: km,
  ThPrice: ct,
  ThCurrency: OP,
  ThRebookForm: _A,
  ThRender: Im,
  ThPaymentResult: xP
}, bA = (e = "") => [
  {
    path: `${e}cart`,
    name: "cart",
    component: () => import("./CartView.js"),
    meta: {
      title: "Cart"
    }
  },
  {
    path: `${e}checkout`,
    name: "checkout",
    component: () => import("./CheckoutView.js"),
    meta: {
      title: "Checkout"
    }
  },
  {
    path: `${e}payment`,
    name: "payment",
    component: () => import("./PaymentView.js"),
    meta: {
      title: "Payment"
    }
  }
], EA = (e = "/", t = !1, n = !1) => {
  const r = bA(e);
  return t || r.push({
    path: `${e}result`,
    name: "result",
    component: () => import("./ResultView.js"),
    meta: {
      title: "Result"
    }
  }), n && r.push({
    path: `${e}upgrades`,
    name: "upgrades",
    component: () => import("./UpgradesView.js"),
    meta: {
      title: "Upgrades"
    }
  }), r0({
    history: h1(),
    routes: r,
    strict: !1,
    scrollBehavior(o) {
      if (!o.hash)
        return { top: 0 };
    }
  });
}, wA = (e, t, n = !1, r = !1) => {
  const o = EA(t, n, r);
  return o.beforeEach(
    (a, i) => {
      var l, s, c;
      if ((l = e._container) == null || l.classList.remove(`th-app_${i.name}`), (s = e._container) == null || s.classList.add(`th-app_${a.name}`), (c = e._container) == null || c.setAttribute("data-route", a.name), a.meta.title && (window.document.title = a.meta.title), typeof a.name > "u" && typeof i.name < "u")
        return setTimeout(() => {
          window.location.assign(
            a.href
          );
        }, 0), !1;
    }
  ), o;
};
function CA(e) {
  return typeof e == "object" && e !== null;
}
function Hd(e, t) {
  return e = CA(e) ? e : /* @__PURE__ */ Object.create(null), new Proxy(e, {
    get(n, r, o) {
      return r === "key" ? Reflect.get(n, r, o) : Reflect.get(n, r, o) || Reflect.get(t, r, o);
    }
  });
}
function TA(e, t) {
  return t.reduce((n, r) => n == null ? void 0 : n[r], e);
}
function SA(e, t, n) {
  return t.slice(0, -1).reduce((r, o) => /^(__proto__)$/.test(o) ? {} : r[o] = r[o] || {}, e)[t[t.length - 1]] = n, e;
}
function kA(e, t) {
  return t.reduce((n, r) => {
    const o = r.split(".");
    return SA(n, o, TA(e, o));
  }, {});
}
function IA(e, t) {
  return (n) => {
    var r;
    try {
      const {
        storage: o = localStorage,
        beforeRestore: a = void 0,
        afterRestore: i = void 0,
        serializer: l = {
          serialize: JSON.stringify,
          deserialize: JSON.parse
        },
        key: s = t.$id,
        paths: c = null,
        debug: u = !1
      } = n;
      return {
        storage: o,
        beforeRestore: a,
        afterRestore: i,
        serializer: l,
        key: ((r = e.key) != null ? r : (f) => f)(typeof s == "string" ? s : s(t.$id)),
        paths: c,
        debug: u
      };
    } catch (o) {
      return n.debug && console.error("[pinia-plugin-persistedstate]", o), null;
    }
  };
}
function Yd(e, { storage: t, serializer: n, key: r, debug: o }) {
  try {
    const a = t == null ? void 0 : t.getItem(r);
    a && e.$patch(n == null ? void 0 : n.deserialize(a));
  } catch (a) {
    o && console.error("[pinia-plugin-persistedstate]", a);
  }
}
function jd(e, { storage: t, serializer: n, key: r, paths: o, debug: a }) {
  try {
    const i = Array.isArray(o) ? kA(e, o) : e;
    t.setItem(r, n.serialize(i));
  } catch (i) {
    a && console.error("[pinia-plugin-persistedstate]", i);
  }
}
function OA(e = {}) {
  return (t) => {
    const { auto: n = !1 } = e, {
      options: { persist: r = n },
      store: o,
      pinia: a
    } = t;
    if (!r)
      return;
    if (!(o.$id in a.state.value)) {
      const l = a._s.get(o.$id.replace("__hot:", ""));
      l && Promise.resolve().then(() => l.$persist());
      return;
    }
    const i = (Array.isArray(r) ? r.map((l) => Hd(l, e)) : [Hd(r, e)]).map(IA(e, o)).filter(Boolean);
    o.$persist = () => {
      i.forEach((l) => {
        jd(o.$state, l);
      });
    }, o.$hydrate = ({ runHooks: l = !0 } = {}) => {
      i.forEach((s) => {
        const { beforeRestore: c, afterRestore: u } = s;
        l && (c == null || c(t)), Yd(o, s), l && (u == null || u(t));
      });
    }, i.forEach((l) => {
      const { beforeRestore: s, afterRestore: c } = l;
      s == null || s(t), Yd(o, l), c == null || c(t), o.$subscribe(
        (u, f) => {
          jd(f, l);
        },
        {
          detached: !0
        }
      );
    });
  };
}
var DA = OA();
function PA(e) {
  return e && typeof e.then == "function";
}
Promise.resolve(!1);
Promise.resolve(!0);
var ur = Promise.resolve();
function dv(e, t) {
  return e || (e = 0), new Promise(function(n) {
    return setTimeout(function() {
      return n(t);
    }, e);
  });
}
function AA(e, t) {
  return Math.floor(Math.random() * (t - e + 1) + e);
}
function dc() {
  return Math.random().toString(36).substring(2);
}
var gs = 0;
function da() {
  var e = Date.now() * 1e3;
  return e <= gs && (e = gs + 1), gs = e, e;
}
var $A = da, NA = "native";
function LA(e) {
  var t = {
    time: da(),
    messagesCallback: null,
    bc: new BroadcastChannel(e),
    subFns: []
    // subscriberFunctions
  };
  return t.bc.onmessage = function(n) {
    t.messagesCallback && t.messagesCallback(n.data);
  }, t;
}
function RA(e) {
  e.bc.close(), e.subFns = [];
}
function MA(e, t) {
  try {
    return e.bc.postMessage(t, !1), ur;
  } catch (n) {
    return Promise.reject(n);
  }
}
function xA(e, t) {
  e.messagesCallback = t;
}
function BA() {
  if (typeof globalThis < "u" && globalThis.Deno && globalThis.Deno.args)
    return !0;
  if ((typeof window < "u" || typeof self < "u") && typeof BroadcastChannel == "function") {
    if (BroadcastChannel._pubkey)
      throw new Error("BroadcastChannel: Do not overwrite window.BroadcastChannel with this module, this is not a polyfill");
    return !0;
  } else
    return !1;
}
function VA() {
  return 150;
}
var UA = {
  create: LA,
  close: RA,
  onMessage: xA,
  postMessage: MA,
  canBeUsed: BA,
  type: NA,
  averageResponseTime: VA,
  microSeconds: $A
};
class fv {
  constructor(t) {
    le(this, "ttl");
    le(this, "map", /* @__PURE__ */ new Map());
    /**
     * Creating calls to setTimeout() is expensive,
     * so we only do that if there is not timeout already open.
     */
    le(this, "_to", !1);
    this.ttl = t;
  }
  has(t) {
    return this.map.has(t);
  }
  add(t) {
    this.map.set(t, pv()), this._to || (this._to = !0, setTimeout(() => {
      this._to = !1, FA(this);
    }, 0));
  }
  clear() {
    this.map.clear();
  }
}
function FA(e) {
  const t = pv() - e.ttl, n = e.map[Symbol.iterator]();
  for (; ; ) {
    const r = n.next().value;
    if (!r)
      return;
    const o = r[0];
    if (r[1] < t)
      e.map.delete(o);
    else
      return;
  }
}
function pv() {
  return Date.now();
}
function fc() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = JSON.parse(JSON.stringify(e));
  return typeof t.webWorkerSupport > "u" && (t.webWorkerSupport = !0), t.idb || (t.idb = {}), t.idb.ttl || (t.idb.ttl = 1e3 * 45), t.idb.fallbackInterval || (t.idb.fallbackInterval = 150), e.idb && typeof e.idb.onclose == "function" && (t.idb.onclose = e.idb.onclose), t.localstorage || (t.localstorage = {}), t.localstorage.removeTimeout || (t.localstorage.removeTimeout = 1e3 * 60), e.methods && (t.methods = e.methods), t.node || (t.node = {}), t.node.ttl || (t.node.ttl = 1e3 * 60 * 2), t.node.maxParallelWrites || (t.node.maxParallelWrites = 2048), typeof t.node.useFastPath > "u" && (t.node.useFastPath = !0), t;
}
var HA = da, YA = "pubkey.broadcast-channel-0-", vn = "messages", xi = {
  durability: "relaxed"
}, jA = "idb";
function hv() {
  if (typeof indexedDB < "u")
    return indexedDB;
  if (typeof window < "u") {
    if (typeof window.mozIndexedDB < "u")
      return window.mozIndexedDB;
    if (typeof window.webkitIndexedDB < "u")
      return window.webkitIndexedDB;
    if (typeof window.msIndexedDB < "u")
      return window.msIndexedDB;
  }
  return !1;
}
function pc(e) {
  e.commit && e.commit();
}
function WA(e) {
  var t = hv(), n = YA + e, r = t.open(n);
  return r.onupgradeneeded = function(o) {
    var a = o.target.result;
    a.createObjectStore(vn, {
      keyPath: "id",
      autoIncrement: !0
    });
  }, new Promise(function(o, a) {
    r.onerror = function(i) {
      return a(i);
    }, r.onsuccess = function() {
      o(r.result);
    };
  });
}
function qA(e, t, n) {
  var r = Date.now(), o = {
    uuid: t,
    time: r,
    data: n
  }, a = e.transaction([vn], "readwrite", xi);
  return new Promise(function(i, l) {
    a.oncomplete = function() {
      return i();
    }, a.onerror = function(c) {
      return l(c);
    };
    var s = a.objectStore(vn);
    s.add(o), pc(a);
  });
}
function zA(e, t) {
  var n = e.transaction(vn, "readonly", xi), r = n.objectStore(vn), o = [], a = IDBKeyRange.bound(t + 1, 1 / 0);
  if (r.getAll) {
    var i = r.getAll(a);
    return new Promise(function(s, c) {
      i.onerror = function(u) {
        return c(u);
      }, i.onsuccess = function(u) {
        s(u.target.result);
      };
    });
  }
  function l() {
    try {
      return a = IDBKeyRange.bound(t + 1, 1 / 0), r.openCursor(a);
    } catch {
      return r.openCursor();
    }
  }
  return new Promise(function(s, c) {
    var u = l();
    u.onerror = function(f) {
      return c(f);
    }, u.onsuccess = function(f) {
      var d = f.target.result;
      d ? d.value.id < t + 1 ? d.continue(t + 1) : (o.push(d.value), d.continue()) : (pc(n), s(o));
    };
  });
}
function GA(e, t) {
  if (e.closed)
    return Promise.resolve([]);
  var n = e.db.transaction(vn, "readwrite", xi), r = n.objectStore(vn);
  return Promise.all(t.map(function(o) {
    var a = r.delete(o);
    return new Promise(function(i) {
      a.onsuccess = function() {
        return i();
      };
    });
  }));
}
function XA(e, t) {
  var n = Date.now() - t, r = e.transaction(vn, "readonly", xi), o = r.objectStore(vn), a = [];
  return new Promise(function(i) {
    o.openCursor().onsuccess = function(l) {
      var s = l.target.result;
      if (s) {
        var c = s.value;
        c.time < n ? (a.push(c), s.continue()) : (pc(r), i(a));
      } else
        i(a);
    };
  });
}
function KA(e) {
  return XA(e.db, e.options.idb.ttl).then(function(t) {
    return GA(e, t.map(function(n) {
      return n.id;
    }));
  });
}
function JA(e, t) {
  return t = fc(t), WA(e).then(function(n) {
    var r = {
      closed: !1,
      lastCursorId: 0,
      channelName: e,
      options: t,
      uuid: dc(),
      /**
       * emittedMessagesIds
       * contains all messages that have been emitted before
       * @type {ObliviousSet}
       */
      eMIs: new fv(t.idb.ttl * 2),
      // ensures we do not read messages in parallel
      writeBlockPromise: ur,
      messagesCallback: null,
      readQueuePromises: [],
      db: n
    };
    return n.onclose = function() {
      r.closed = !0, t.idb.onclose && t.idb.onclose();
    }, mv(r), r;
  });
}
function mv(e) {
  e.closed || vv(e).then(function() {
    return dv(e.options.idb.fallbackInterval);
  }).then(function() {
    return mv(e);
  });
}
function ZA(e, t) {
  return !(e.uuid === t.uuid || t.eMIs.has(e.id) || e.data.time < t.messagesCallbackTime);
}
function vv(e) {
  return e.closed || !e.messagesCallback ? ur : zA(e.db, e.lastCursorId).then(function(t) {
    var n = t.filter(function(r) {
      return !!r;
    }).map(function(r) {
      return r.id > e.lastCursorId && (e.lastCursorId = r.id), r;
    }).filter(function(r) {
      return ZA(r, e);
    }).sort(function(r, o) {
      return r.time - o.time;
    });
    return n.forEach(function(r) {
      e.messagesCallback && (e.eMIs.add(r.id), e.messagesCallback(r.data));
    }), ur;
  });
}
function QA(e) {
  e.closed = !0, e.db.close();
}
function e2(e, t) {
  return e.writeBlockPromise = e.writeBlockPromise.then(function() {
    return qA(e.db, e.uuid, t);
  }).then(function() {
    AA(0, 10) === 0 && KA(e);
  }), e.writeBlockPromise;
}
function t2(e, t, n) {
  e.messagesCallbackTime = n, e.messagesCallback = t, vv(e);
}
function n2() {
  return !!hv();
}
function r2(e) {
  return e.idb.fallbackInterval * 2;
}
var o2 = {
  create: JA,
  close: QA,
  onMessage: t2,
  postMessage: e2,
  canBeUsed: n2,
  type: jA,
  averageResponseTime: r2,
  microSeconds: HA
}, a2 = da, i2 = "pubkey.broadcastChannel-", s2 = "localstorage";
function gv() {
  var e;
  if (typeof window > "u")
    return null;
  try {
    e = window.localStorage, e = window["ie8-eventlistener/storage"] || window.localStorage;
  } catch {
  }
  return e;
}
function yv(e) {
  return i2 + e;
}
function l2(e, t) {
  return new Promise(function(n) {
    dv().then(function() {
      var r = yv(e.channelName), o = {
        token: dc(),
        time: Date.now(),
        data: t,
        uuid: e.uuid
      }, a = JSON.stringify(o);
      gv().setItem(r, a);
      var i = document.createEvent("Event");
      i.initEvent("storage", !0, !0), i.key = r, i.newValue = a, window.dispatchEvent(i), n();
    });
  });
}
function c2(e, t) {
  var n = yv(e), r = function(a) {
    a.key === n && t(JSON.parse(a.newValue));
  };
  return window.addEventListener("storage", r), r;
}
function u2(e) {
  window.removeEventListener("storage", e);
}
function d2(e, t) {
  if (t = fc(t), !_v())
    throw new Error("BroadcastChannel: localstorage cannot be used");
  var n = dc(), r = new fv(t.localstorage.removeTimeout), o = {
    channelName: e,
    uuid: n,
    eMIs: r
    // emittedMessagesIds
  };
  return o.listener = c2(e, function(a) {
    o.messagesCallback && a.uuid !== n && (!a.token || r.has(a.token) || a.data.time && a.data.time < o.messagesCallbackTime || (r.add(a.token), o.messagesCallback(a.data)));
  }), o;
}
function f2(e) {
  u2(e.listener);
}
function p2(e, t, n) {
  e.messagesCallbackTime = n, e.messagesCallback = t;
}
function _v() {
  var e = gv();
  if (!e)
    return !1;
  try {
    var t = "__broadcastchannel_check";
    e.setItem(t, "works"), e.removeItem(t);
  } catch {
    return !1;
  }
  return !0;
}
function h2() {
  var e = 120, t = navigator.userAgent.toLowerCase();
  return t.includes("safari") && !t.includes("chrome") ? e * 2 : e;
}
var m2 = {
  create: d2,
  close: f2,
  onMessage: p2,
  postMessage: l2,
  canBeUsed: _v,
  type: s2,
  averageResponseTime: h2,
  microSeconds: a2
}, bv = da, v2 = "simulate", hc = /* @__PURE__ */ new Set();
function g2(e) {
  var t = {
    time: bv(),
    name: e,
    messagesCallback: null
  };
  return hc.add(t), t;
}
function y2(e) {
  hc.delete(e);
}
var Ev = 5;
function _2(e, t) {
  return new Promise(function(n) {
    return setTimeout(function() {
      var r = Array.from(hc);
      r.forEach(function(o) {
        o.name === e.name && // has same name
        o !== e && o.messagesCallback && // has subscribers
        o.time < t.time && o.messagesCallback(t);
      }), n();
    }, Ev);
  });
}
function b2(e, t) {
  e.messagesCallback = t;
}
function E2() {
  return !0;
}
function w2() {
  return Ev;
}
var C2 = {
  create: g2,
  close: y2,
  onMessage: b2,
  postMessage: _2,
  canBeUsed: E2,
  type: v2,
  averageResponseTime: w2,
  microSeconds: bv
}, Wd = [
  UA,
  // fastest
  o2,
  m2
];
function T2(e) {
  var t = [].concat(e.methods, Wd).filter(Boolean);
  if (e.type) {
    if (e.type === "simulate")
      return C2;
    var n = t.find(function(o) {
      return o.type === e.type;
    });
    if (n)
      return n;
    throw new Error("method-type " + e.type + " not found");
  }
  e.webWorkerSupport || (t = t.filter(function(o) {
    return o.type !== "idb";
  }));
  var r = t.find(function(o) {
    return o.canBeUsed();
  });
  if (r)
    return r;
  throw new Error("No usable method found in " + JSON.stringify(Wd.map(function(o) {
    return o.type;
  })));
}
var wv = /* @__PURE__ */ new Set(), S2 = 0, mc = function(t, n) {
  this.id = S2++, wv.add(this), this.name = t, qd && (n = qd), this.options = fc(n), this.method = T2(this.options), this._iL = !1, this._onML = null, this._addEL = {
    message: [],
    internal: []
  }, this._uMP = /* @__PURE__ */ new Set(), this._befC = [], this._prepP = null, k2(this);
};
mc._pubkey = !0;
var qd;
mc.prototype = {
  postMessage: function(t) {
    if (this.closed)
      throw new Error("BroadcastChannel.postMessage(): Cannot post message after channel has closed " + /**
       * In the past when this error appeared, it was really hard to debug.
       * So now we log the msg together with the error so it at least
       * gives some clue about where in your application this happens.
       */
      JSON.stringify(t));
    return zd(this, "message", t);
  },
  postInternal: function(t) {
    return zd(this, "internal", t);
  },
  set onmessage(e) {
    var t = this.method.microSeconds(), n = {
      time: t,
      fn: e
    };
    Xd(this, "message", this._onML), e && typeof e == "function" ? (this._onML = n, Gd(this, "message", n)) : this._onML = null;
  },
  addEventListener: function(t, n) {
    var r = this.method.microSeconds(), o = {
      time: r,
      fn: n
    };
    Gd(this, t, o);
  },
  removeEventListener: function(t, n) {
    var r = this._addEL[t].find(function(o) {
      return o.fn === n;
    });
    Xd(this, t, r);
  },
  close: function() {
    var t = this;
    if (!this.closed) {
      wv.delete(this), this.closed = !0;
      var n = this._prepP ? this._prepP : ur;
      return this._onML = null, this._addEL.message = [], n.then(function() {
        return Promise.all(Array.from(t._uMP));
      }).then(function() {
        return Promise.all(t._befC.map(function(r) {
          return r();
        }));
      }).then(function() {
        return t.method.close(t._state);
      });
    }
  },
  get type() {
    return this.method.type;
  },
  get isClosed() {
    return this.closed;
  }
};
function zd(e, t, n) {
  var r = e.method.microSeconds(), o = {
    time: r,
    type: t,
    data: n
  }, a = e._prepP ? e._prepP : ur;
  return a.then(function() {
    var i = e.method.postMessage(e._state, o);
    return e._uMP.add(i), i.catch().then(function() {
      return e._uMP.delete(i);
    }), i;
  });
}
function k2(e) {
  var t = e.method.create(e.name, e.options);
  PA(t) ? (e._prepP = t, t.then(function(n) {
    e._state = n;
  })) : e._state = t;
}
function Cv(e) {
  return e._addEL.message.length > 0 || e._addEL.internal.length > 0;
}
function Gd(e, t, n) {
  e._addEL[t].push(n), I2(e);
}
function Xd(e, t, n) {
  e._addEL[t] = e._addEL[t].filter(function(r) {
    return r !== n;
  }), O2(e);
}
function I2(e) {
  if (!e._iL && Cv(e)) {
    var t = function(o) {
      e._addEL[o.type].forEach(function(a) {
        o.time >= a.time && a.fn(o.data);
      });
    }, n = e.method.microSeconds();
    e._prepP ? e._prepP.then(function() {
      e._iL = !0, e.method.onMessage(e._state, t, n);
    }) : (e._iL = !0, e.method.onMessage(e._state, t, n));
  }
}
function O2(e) {
  if (e._iL && !Cv(e)) {
    e._iL = !1;
    var t = e.method.microSeconds();
    e.method.onMessage(e._state, null, t);
  }
}
function Kd(e, t = { serialize: JSON.stringify, deserialize: JSON.parse }) {
  return t.deserialize(t.serialize(e));
}
function D2(e, t) {
  return Object.keys(t).includes(e);
}
function P2({
  enable: e = !0,
  initialize: t = !0,
  type: n,
  serializer: r
}) {
  return ({ store: o, options: a }) => {
    var v, p, g;
    const i = ((v = a == null ? void 0 : a.share) == null ? void 0 : v.enable) ?? e, l = ((p = a == null ? void 0 : a.share) == null ? void 0 : p.omit) ?? [];
    if (!i)
      return;
    const s = new mc(o.$id, {
      type: n
    });
    let c = 0, u = !1;
    const f = Object.keys(o.$state).filter((m) => !l.includes(m) && D2(m, o.$state));
    s.onmessage = (m) => {
      if (m === void 0) {
        s.postMessage({
          timestamp: c,
          state: Kd(o.$state, r)
        });
        return;
      }
      m.timestamp <= c || (u = !0, c = Date.now(), o.$patch((h) => {
        f.forEach((y) => {
          h[y] = m.state[y];
        });
      }));
    }, (((g = a == null ? void 0 : a.share) == null ? void 0 : g.initialize) ?? t) && s.postMessage(void 0), o.$subscribe((m, h) => {
      u || (c = Date.now(), s.postMessage({
        timestamp: c,
        state: Kd(h, r)
      })), u = !1;
    });
  };
}
const vc = Tg();
vc.use(DA);
vc.use(
  P2({
    enable: !0,
    type: "localstorage"
  })
);
var A2 = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const $2 = (e, t = !1) => {
  if (typeof e == "string")
    return pb({
      id: e,
      enabled: !!e,
      debug: !!A2.VITE_DEBUG,
      loadScript: t
    });
}, Tv = (e, t, n = !1, r = !1, o, a = !1) => {
  e.use(ln), e.use(
    wA(e, t, n, r)
  ), e.use(vc), typeof o < "u" && e.use($2(o, a));
}, N2 = (e, t, n, r = !1, o = !1, a, i) => {
  var l, s, c, u, f, d, v, p, g, m;
  typeof (t == null ? void 0 : t.container) < "u" && document.querySelector(t == null ? void 0 : t.container) && ((l = document.querySelector(t == null ? void 0 : t.container)) != null && l.getAttribute("data-base-url") && (n = (s = document.querySelector(t == null ? void 0 : t.container)) == null ? void 0 : s.getAttribute("data-base-url"), n = new URL(n).pathname), (c = document.querySelector(t == null ? void 0 : t.container)) != null && c.getAttribute("data-is-custom-result-page") && (r = !!((u = document.querySelector(t == null ? void 0 : t.container)) != null && u.getAttribute("data-is-custom-result-page"))), (f = document.querySelector(t == null ? void 0 : t.container)) != null && f.getAttribute("data-upgrades") && (o = !!Number(
    (d = document.querySelector(t == null ? void 0 : t.container)) == null ? void 0 : d.getAttribute("data-upgrades")
  )), (v = document.querySelector(t == null ? void 0 : t.container)) != null && v.getAttribute("data-gtm-id") && (a = (p = document.querySelector(t == null ? void 0 : t.container)) == null ? void 0 : p.getAttribute("data-gtm-id")), (g = document.querySelector(t == null ? void 0 : t.container)) != null && g.getAttribute("data-gtm-load-script") && (i = !!Number(
    (m = document.querySelector(t == null ? void 0 : t.container)) == null ? void 0 : m.getAttribute("data-gtm-load-script")
  ))), Object.keys(il).forEach((h) => {
    e.component(h, il[h]);
  }), Tv(
    e,
    n,
    r,
    o,
    a,
    i
  );
}, L2 = (e, t = !1, n = !1, r, o = !1) => {
  const a = document.querySelector("#th-app") || document.querySelector(".th-app");
  a && a.getAttribute("data-base-url") && (e = a.getAttribute("data-base-url"), e = new URL(e).pathname), a && a.getAttribute("data-is-custom-result-page") && (t = !!a.getAttribute("data-is-custom-result-page")), a && a.getAttribute("data-upgrades") && (n = !!Number(a.getAttribute("data-upgrades"))), a && a.getAttribute("data-gtm-id") && (r = a.getAttribute("data-gtm-id")), a && a.getAttribute("data-gtm-load-script") && (o = !!Number(a.getAttribute("data-gtm-load-script")));
  const i = Yv({ components: il });
  Tv(
    i,
    e,
    t,
    n,
    r,
    o
  ), i.mount(a);
}, Jd = "/", Zd = !1, x2 = {
  install: (e, t) => {
    if (typeof e > "u") {
      L2(Jd, Zd);
      return;
    }
    N2(
      e,
      t,
      Jd,
      Zd
    );
  }
};
export {
  tE as A,
  ot as B,
  L0 as C,
  AE as D,
  _E as E,
  It as F,
  jr as G,
  x2 as H,
  Nd as I,
  $o as P,
  xP as R,
  vr as U,
  HE as V,
  NE as _,
  De as a,
  $e as b,
  ge as c,
  kl as d,
  br as e,
  cA as f,
  U0 as g,
  q0 as h,
  zP as i,
  Yt as j,
  _r as k,
  ln as l,
  Ld as m,
  pA as n,
  ue as o,
  Qv as p,
  av as q,
  Rd as r,
  kh as s,
  ct as t,
  bi as u,
  OO as v,
  qa as w,
  Qa as x,
  ah as y,
  ih as z
};
