var Sv = Object.defineProperty;
var kv = (e, t, n) => t in e ? Sv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var le = (e, t, n) => (kv(e, typeof t != "symbol" ? t + "" : t, n), n);
import { effectScope as sl, ref as Q, markRaw as rr, toRaw as Yo, hasInjectionContext as Iv, inject as _t, getCurrentInstance as Hn, watch as Ne, unref as W, reactive as jo, isRef as zt, isReactive as Wo, toRef as vo, nextTick as $n, computed as te, getCurrentScope as Ov, onScopeDispose as Pv, toRefs as ys, defineComponent as me, h as dr, onMounted as rt, onUnmounted as Jd, Fragment as Oe, shallowRef as ll, createVNode as G, Text as Dv, openBlock as U, createElementBlock as X, createElementVNode as z, createBlock as ue, resolveDynamicComponent as ii, withCtx as we, onBeforeUnmount as Jr, normalizeClass as be, renderSlot as Yn, shallowReactive as Av, provide as An, watchEffect as Ct, pushScopeId as si, popScopeId as li, toDisplayString as oe, createCommentVNode as se, renderList as at, createTextVNode as qe, normalizeStyle as $v, withDirectives as Zd, vModelText as Nv, createStaticVNode as Lv, withModifiers as He, TransitionGroup as cl, Transition as Qd, vShow as Rv, Teleport as Mv, isVNode as xv, resolveComponent as ef, useSlots as Bv, onBeforeMount as Vv, isReadonly as Uv, createApp as Fv } from "vue";
var an = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Zr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Hv(e) {
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
var tf = {};
function Dt(e, t) {
  typeof t == "boolean" && (t = { forever: t }), this._originalTimeouts = JSON.parse(JSON.stringify(e)), this._timeouts = e, this._options = t || {}, this._maxRetryTime = t && t.maxRetryTime || 1 / 0, this._fn = null, this._errors = [], this._attempts = 1, this._operationTimeout = null, this._operationTimeoutCb = null, this._timeout = null, this._operationStart = null, this._timer = null, this._options.forever && (this._cachedTimeouts = this._timeouts.slice(0));
}
var Yv = Dt;
Dt.prototype.reset = function() {
  this._attempts = 1, this._timeouts = this._originalTimeouts.slice(0);
};
Dt.prototype.stop = function() {
  this._timeout && clearTimeout(this._timeout), this._timer && clearTimeout(this._timer), this._timeouts = [], this._cachedTimeouts = null;
};
Dt.prototype.retry = function(e) {
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
Dt.prototype.attempt = function(e, t) {
  this._fn = e, t && (t.timeout && (this._operationTimeout = t.timeout), t.cb && (this._operationTimeoutCb = t.cb));
  var n = this;
  this._operationTimeoutCb && (this._timeout = setTimeout(function() {
    n._operationTimeoutCb();
  }, n._operationTimeout)), this._operationStart = (/* @__PURE__ */ new Date()).getTime(), this._fn(this._attempts);
};
Dt.prototype.try = function(e) {
  console.log("Using RetryOperation.try() is deprecated"), this.attempt(e);
};
Dt.prototype.start = function(e) {
  console.log("Using RetryOperation.start() is deprecated"), this.attempt(e);
};
Dt.prototype.start = Dt.prototype.try;
Dt.prototype.errors = function() {
  return this._errors;
};
Dt.prototype.attempts = function() {
  return this._attempts;
};
Dt.prototype.mainError = function() {
  if (this._errors.length === 0)
    return null;
  for (var e = {}, t = null, n = 0, r = 0; r < this._errors.length; r++) {
    var o = this._errors[r], a = o.message, i = (e[a] || 0) + 1;
    e[a] = i, i >= n && (t = o, n = i);
  }
  return t;
};
(function(e) {
  var t = Yv;
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
})(tf);
var jv = tf;
const Wv = /* @__PURE__ */ Zr(jv), zv = Object.prototype.toString, qv = (e) => zv.call(e) === "[object Error]", Gv = /* @__PURE__ */ new Set([
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
function Xv(e) {
  return e && qv(e) && e.name === "TypeError" && typeof e.message == "string" ? e.message === "Load failed" ? e.stack === void 0 : Gv.has(e.message) : !1;
}
class Kv extends Error {
  constructor(t) {
    super(), t instanceof Error ? (this.originalError = t, { message: t } = t) : (this.originalError = new Error(t), this.originalError.stack = this.stack), this.name = "AbortError", this.message = t;
  }
}
const gc = (e, t, n) => {
  const r = n.retries - (t - 1);
  return e.attemptNumber = t, e.retriesLeft = r, e;
};
async function Jv(e, t) {
  return new Promise((n, r) => {
    t = {
      onFailedAttempt() {
      },
      retries: 10,
      shouldRetry: () => !0,
      ...t
    };
    const o = Wv.operation(t), a = () => {
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
          if (s instanceof Kv)
            throw s.originalError;
          if (s instanceof TypeError && !Xv(s))
            throw s;
          if (gc(s, l, t), await t.shouldRetry(s) || (o.stop(), r(s)), await t.onFailedAttempt(s), !o.retry(s))
            throw o.mainError();
        } catch (c) {
          gc(c, l, t), i(), r(c);
        }
      }
    });
  });
}
var nf = !1;
function da(e, t, n) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, n), n) : (e[t] = n, n);
}
function Bi(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
function Zv() {
  return rf().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function rf() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Qv = typeof Proxy == "function", eg = "devtools-plugin:setup", tg = "plugin:settings:set";
let Cr, _s;
function ng() {
  var e;
  return Cr !== void 0 || (typeof window < "u" && window.performance ? (Cr = !0, _s = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Cr = !0, _s = globalThis.perf_hooks.performance) : Cr = !1), Cr;
}
function rg() {
  return ng() ? _s.now() : Date.now();
}
class og {
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
        return rg();
      }
    }, n && n.on(tg, (i, l) => {
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
  const n = e, r = rf(), o = Zv(), a = Qv && n.enableEarlyProxy;
  if (o && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a))
    o.emit(eg, e, t);
  else {
    const i = a ? new og(n, o) : null;
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
const ko = (e) => po = e, of = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function fr(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Wt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Wt || (Wt = {}));
const ui = typeof window < "u", go = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && ui, yc = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function ag(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function ul(e, t, n) {
  const r = new XMLHttpRequest();
  r.open("GET", e), r.responseType = "blob", r.onload = function() {
    lf(r.response, t, n);
  }, r.onerror = function() {
    console.error("could not download file");
  }, r.send();
}
function af(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function Ta(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const n = document.createEvent("MouseEvents");
    n.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(n);
  }
}
const Sa = typeof navigator == "object" ? navigator : { userAgent: "" }, sf = /Macintosh/.test(Sa.userAgent) && /AppleWebKit/.test(Sa.userAgent) && !/Safari/.test(Sa.userAgent), lf = ui ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !sf ? ig : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in Sa ? sg : (
      // Fallback to using FileReader and a popup
      lg
    )
  )
) : () => {
};
function ig(e, t = "download", n) {
  const r = document.createElement("a");
  r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin !== location.origin ? af(r.href) ? ul(e, t, n) : (r.target = "_blank", Ta(r)) : Ta(r)) : (r.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(r.href);
  }, 4e4), setTimeout(function() {
    Ta(r);
  }, 0));
}
function sg(e, t = "download", n) {
  if (typeof e == "string")
    if (af(e))
      ul(e, t, n);
    else {
      const r = document.createElement("a");
      r.href = e, r.target = "_blank", setTimeout(function() {
        Ta(r);
      });
    }
  else
    navigator.msSaveOrOpenBlob(ag(e, n), t);
}
function lg(e, t, n, r) {
  if (r = r || open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string")
    return ul(e, t, n);
  const o = e.type === "application/octet-stream", a = /constructor/i.test(String(yc.HTMLElement)) || "safari" in yc, i = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((i || o && a || sf) && typeof FileReader < "u") {
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
function Qe(e, t) {
  const n = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, t) : t === "error" ? console.error(n) : t === "warn" ? console.warn(n) : console.log(n);
}
function dl(e) {
  return "_a" in e && "install" in e;
}
function cf() {
  if (!("clipboard" in navigator))
    return Qe("Your browser doesn't support the Clipboard API", "error"), !0;
}
function uf(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (Qe('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function cg(e) {
  if (!cf())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), Qe("Global state copied to clipboard.");
    } catch (t) {
      if (uf(t))
        return;
      Qe("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function ug(e) {
  if (!cf())
    try {
      df(e, JSON.parse(await navigator.clipboard.readText())), Qe("Global state pasted from clipboard.");
    } catch (t) {
      if (uf(t))
        return;
      Qe("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function dg(e) {
  try {
    lf(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    Qe("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let Zt;
function fg() {
  Zt || (Zt = document.createElement("input"), Zt.type = "file", Zt.accept = ".json");
  function e() {
    return new Promise((t, n) => {
      Zt.onchange = async () => {
        const r = Zt.files;
        if (!r)
          return t(null);
        const o = r.item(0);
        return t(o ? { text: await o.text(), file: o } : null);
      }, Zt.oncancel = () => t(null), Zt.onerror = n, Zt.click();
    });
  }
  return e;
}
async function pg(e) {
  try {
    const n = await fg()();
    if (!n)
      return;
    const { text: r, file: o } = n;
    df(e, JSON.parse(r)), Qe(`Global state imported from "${o.name}".`);
  } catch (t) {
    Qe("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function df(e, t) {
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
const ff = "🍍 Pinia (root)", bs = "_root";
function mg(e) {
  return dl(e) ? {
    id: bs,
    label: ff
  } : {
    id: e.$id,
    label: e.$id
  };
}
function hg(e) {
  if (dl(e)) {
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
function vg(e) {
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
function gg(e) {
  switch (e) {
    case Wt.direct:
      return "mutation";
    case Wt.patchFunction:
      return "$patch";
    case Wt.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let Nr = !0;
const ka = [], tr = "pinia:mutations", st = "pinia", { assign: yg } = Object, xa = (e) => "🍍 " + e;
function _g(e, t) {
  ci({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: ka,
    app: e
  }, (n) => {
    typeof n.now != "function" && Qe("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
      id: tr,
      label: "Pinia 🍍",
      color: 15064968
    }), n.addInspector({
      id: st,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            cg(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await ug(t), n.sendInspectorTree(st), n.sendInspectorState(st);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            dg(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await pg(t), n.sendInspectorTree(st), n.sendInspectorState(st);
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
            o ? typeof o.$reset != "function" ? Qe(`Cannot reset "${r}" store because it doesn't have a "$reset" method implemented.`, "warn") : (o.$reset(), Qe(`Store "${r}" reset.`)) : Qe(`Cannot reset "${r}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((r, o) => {
      const a = r.componentInstance && r.componentInstance.proxy;
      if (a && a._pStores) {
        const i = r.componentInstance.proxy._pStores;
        Object.values(i).forEach((l) => {
          r.instanceData.state.push({
            type: xa(l.$id),
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
            type: xa(l.$id),
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
      if (r.app === e && r.inspectorId === st) {
        let o = [t];
        o = o.concat(Array.from(t._s.values())), r.rootNodes = (r.filter ? o.filter((a) => "$id" in a ? a.$id.toLowerCase().includes(r.filter.toLowerCase()) : ff.toLowerCase().includes(r.filter.toLowerCase())) : o).map(mg);
      }
    }), n.on.getInspectorState((r) => {
      if (r.app === e && r.inspectorId === st) {
        const o = r.nodeId === bs ? t : t._s.get(r.nodeId);
        if (!o)
          return;
        o && (r.state = hg(o));
      }
    }), n.on.editInspectorState((r, o) => {
      if (r.app === e && r.inspectorId === st) {
        const a = r.nodeId === bs ? t : t._s.get(r.nodeId);
        if (!a)
          return Qe(`store "${r.nodeId}" not found`, "error");
        const { path: i } = r;
        dl(a) ? i.unshift("state") : (i.length !== 1 || !a._customProperties.has(i[0]) || i[0] in a.$state) && i.unshift("$state"), Nr = !1, r.set(a, i, r.state.value), Nr = !0;
      }
    }), n.on.editComponentState((r) => {
      if (r.type.startsWith("🍍")) {
        const o = r.type.replace(/^🍍\s*/, ""), a = t._s.get(o);
        if (!a)
          return Qe(`store "${o}" not found`, "error");
        const { path: i } = r;
        if (i[0] !== "state")
          return Qe(`Invalid path for store "${o}":
${i}
Only state can be modified.`);
        i[0] = "$state", Nr = !1, r.set(a, i, r.state.value), Nr = !0;
      }
    });
  });
}
function bg(e, t) {
  ka.includes(xa(t.$id)) || ka.push(xa(t.$id)), ci({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: ka,
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
      const u = pf++;
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
      Ne(() => W(t[i]), (l, s) => {
        n.notifyComponentUpdate(), n.sendInspectorState(st), Nr && n.addTimelineEvent({
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
      if (n.notifyComponentUpdate(), n.sendInspectorState(st), !Nr)
        return;
      const c = {
        time: r(),
        title: gg(l),
        data: yg({ store: Lt(t.$id) }, vg(i)),
        groupId: kn
      };
      l === Wt.patchFunction ? c.subtitle = "⤵️" : l === Wt.patchObject ? c.subtitle = "🧩" : i && !Array.isArray(i) && (c.subtitle = i.type), i && (c.data["rawEvent(s)"] = {
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
      }), n.notifyComponentUpdate(), n.sendInspectorTree(st), n.sendInspectorState(st);
    });
    const { $dispose: a } = t;
    t.$dispose = () => {
      a(), n.notifyComponentUpdate(), n.sendInspectorTree(st), n.sendInspectorState(st), n.getSettings().logStoreChanges && Qe(`Disposed "${t.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree(st), n.sendInspectorState(st), n.getSettings().logStoreChanges && Qe(`"${t.$id}" store installed 🆕`);
  });
}
let pf = 0, kn;
function _c(e, t, n) {
  const r = t.reduce((o, a) => (o[a] = Yo(e)[a], o), {});
  for (const o in r)
    e[o] = function() {
      const a = pf, i = n ? new Proxy(e, {
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
function Eg({ app: e, store: t, options: n }) {
  if (t.$id.startsWith("__hot:"))
    return;
  t._isOptionsAPI = !!n.state, _c(t, Object.keys(n.actions), t._isOptionsAPI);
  const r = t._hotUpdate;
  Yo(t)._hotUpdate = function(o) {
    r.apply(this, arguments), _c(t, Object.keys(o._hmrPayload.actions), !!t._isOptionsAPI);
  }, bg(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    t
  );
}
function wg() {
  const e = sl(!0), t = e.run(() => Q({}));
  let n = [], r = [];
  const o = rr({
    install(a) {
      ko(o), o._a = a, a.provide(of, o), a.config.globalProperties.$pinia = o, go && _g(a, o), r.forEach((i) => n.push(i)), r = [];
    },
    use(a) {
      return !this._a && !nf ? r.push(a) : n.push(a), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return go && typeof Proxy < "u" && o.use(Eg), o;
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
const hf = () => {
};
function bc(e, t, n, r = hf) {
  e.push(t);
  const o = () => {
    const a = e.indexOf(t);
    a > -1 && (e.splice(a, 1), r());
  };
  return !n && Ov() && Pv(o), o;
}
function Tr(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const Cg = (e) => e();
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
const Tg = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Sg(e) {
  return !fr(e) || !e.hasOwnProperty(Tg);
}
const { assign: St } = Object;
function Ec(e) {
  return !!(zt(e) && e.effect);
}
function wc(e, t, n, r) {
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
  process.env.NODE_ENV !== "production" && !nf && (s.onTrigger = (_) => {
    c ? v = _ : c == !1 && !E._hotUpdating && (Array.isArray(v) ? v.push(_) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let c, u, f = [], d = [], v;
  const p = r.state.value[e];
  !a && !p && (process.env.NODE_ENV === "production" || !o) && (r.state.value[e] = {});
  const g = Q({});
  let h;
  function m(_) {
    let k;
    c = u = !1, process.env.NODE_ENV !== "production" && (v = []), typeof _ == "function" ? (_(r.state.value[e]), k = {
      type: Wt.patchFunction,
      storeId: e,
      events: v
    }) : (Es(r.state.value[e], _), k = {
      type: Wt.patchObject,
      payload: _,
      storeId: e,
      events: v
    });
    const A = h = Symbol();
    $n().then(() => {
      h === A && (c = !0);
    }), u = !0, Tr(f, k, r.state.value[e]);
  }
  const y = a ? function() {
    const { state: k } = n, A = k ? k() : {};
    this.$patch((x) => {
      St(x, A);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : hf
  );
  function b() {
    i.stop(), f = [], d = [], r._s.delete(e);
  }
  function O(_, k) {
    return function() {
      ko(r);
      const A = Array.from(arguments), x = [], M = [];
      function $(V) {
        x.push(V);
      }
      function L(V) {
        M.push(V);
      }
      Tr(d, {
        args: A,
        name: _,
        store: E,
        after: $,
        onError: L
      });
      let F;
      try {
        F = k.apply(this && this.$id === e ? this : E, A);
      } catch (V) {
        throw Tr(M, V), V;
      }
      return F instanceof Promise ? F.then((V) => (Tr(x, V), V)).catch((V) => (Tr(M, V), Promise.reject(V))) : (Tr(x, F), F);
    };
  }
  const N = /* @__PURE__ */ rr({
    actions: {},
    getters: {},
    state: [],
    hotState: g
  }), S = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: bc.bind(null, d),
    $patch: m,
    $reset: y,
    $subscribe(_, k = {}) {
      const A = bc(f, _, k.detached, () => x()), x = i.run(() => Ne(() => r.state.value[e], (M) => {
        (k.flush === "sync" ? u : c) && _({
          storeId: e,
          type: Wt.direct,
          events: v
        }, M);
      }, St({}, s, k)));
      return A;
    },
    $dispose: b
  }, E = jo(process.env.NODE_ENV !== "production" || go ? St(
    {
      _hmrPayload: N,
      _customProperties: rr(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    S
    // must be added later
    // setupStore
  ) : S);
  r._s.set(e, E);
  const I = (r._a && r._a.runWithContext || Cg)(() => r._e.run(() => (i = sl()).run(t)));
  for (const _ in I) {
    const k = I[_];
    if (zt(k) && !Ec(k) || Wo(k))
      process.env.NODE_ENV !== "production" && o ? da(g.value, _, vo(I, _)) : a || (p && Sg(k) && (zt(k) ? k.value = p[_] : Es(k, p[_])), r.state.value[e][_] = k), process.env.NODE_ENV !== "production" && N.state.push(_);
    else if (typeof k == "function") {
      const A = process.env.NODE_ENV !== "production" && o ? k : O(_, k);
      I[_] = A, process.env.NODE_ENV !== "production" && (N.actions[_] = k), l.actions[_] = k;
    } else
      process.env.NODE_ENV !== "production" && Ec(k) && (N.getters[_] = a ? (
        // @ts-expect-error
        n.getters[_]
      ) : k, ui && (I._getters || // @ts-expect-error: same
      (I._getters = rr([]))).push(_));
  }
  if (St(E, I), St(Yo(E), I), Object.defineProperty(E, "$state", {
    get: () => process.env.NODE_ENV !== "production" && o ? g.value : r.state.value[e],
    set: (_) => {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error("cannot set hotState");
      m((k) => {
        St(k, _);
      });
    }
  }), process.env.NODE_ENV !== "production" && (E._hotUpdate = rr((_) => {
    E._hotUpdating = !0, _._hmrPayload.state.forEach((k) => {
      if (k in E.$state) {
        const A = _.$state[k], x = E.$state[k];
        typeof A == "object" && fr(A) && fr(x) ? mf(A, x) : _.$state[k] = x;
      }
      da(E, k, vo(_.$state, k));
    }), Object.keys(E.$state).forEach((k) => {
      k in _.$state || Bi(E, k);
    }), c = !1, u = !1, r.state.value[e] = vo(_._hmrPayload, "hotState"), u = !0, $n().then(() => {
      c = !0;
    });
    for (const k in _._hmrPayload.actions) {
      const A = _[k];
      da(E, k, O(k, A));
    }
    for (const k in _._hmrPayload.getters) {
      const A = _._hmrPayload.getters[k], x = a ? (
        // special handling of options api
        te(() => (ko(r), A.call(E, E)))
      ) : A;
      da(E, k, x);
    }
    Object.keys(E._hmrPayload.getters).forEach((k) => {
      k in _._hmrPayload.getters || Bi(E, k);
    }), Object.keys(E._hmrPayload.actions).forEach((k) => {
      k in _._hmrPayload.actions || Bi(E, k);
    }), E._hmrPayload = _._hmrPayload, E._getters = _._getters, E._hotUpdating = !1;
  })), go) {
    const _ = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((k) => {
      Object.defineProperty(E, k, St({ value: E[k] }, _));
    });
  }
  return r._p.forEach((_) => {
    if (go) {
      const k = i.run(() => _({
        store: E,
        app: r._a,
        pinia: r,
        options: l
      }));
      Object.keys(k || {}).forEach((A) => E._customProperties.add(A)), St(E, k);
    } else
      St(E, i.run(() => _({
        store: E,
        app: r._a,
        pinia: r,
        options: l
      })));
  }), process.env.NODE_ENV !== "production" && E.$state && typeof E.$state == "object" && typeof E.$state.constructor == "function" && !E.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${E.$id}".`), p && a && n.hydrate && n.hydrate(E.$state, p), c = !0, u = !0, E;
}
function jn(e, t, n) {
  let r, o;
  const a = typeof t == "function";
  if (typeof e == "string")
    r = e, o = a ? n : t;
  else if (o = e, r = e.id, process.env.NODE_ENV !== "production" && typeof r != "string")
    throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
  function i(l, s) {
    const c = Iv();
    if (l = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && po && po._testing ? null : l) || (c ? _t(of, null) : null), l && ko(l), process.env.NODE_ENV !== "production" && !po)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    l = po, l._s.has(r) || (a ? ws(r, t, o, l) : wc(r, o, l), process.env.NODE_ENV !== "production" && (i._pinia = l));
    const u = l._s.get(r);
    if (process.env.NODE_ENV !== "production" && s) {
      const f = "__hot:" + r, d = a ? ws(f, t, o, l, !0) : wc(f, St({}, o), l, !0);
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
var vf = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(an, function() {
    var n = 1e3, r = 6e4, o = 36e5, a = "millisecond", i = "second", l = "minute", s = "hour", c = "day", u = "week", f = "month", d = "quarter", v = "year", p = "date", g = "Invalid Date", h = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, m = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, y = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(M) {
      var $ = ["th", "st", "nd", "rd"], L = M % 100;
      return "[" + M + ($[(L - 20) % 10] || $[L] || $[0]) + "]";
    } }, b = function(M, $, L) {
      var F = String(M);
      return !F || F.length >= $ ? M : "" + Array($ + 1 - F.length).join(L) + M;
    }, O = { s: b, z: function(M) {
      var $ = -M.utcOffset(), L = Math.abs($), F = Math.floor(L / 60), V = L % 60;
      return ($ <= 0 ? "+" : "-") + b(F, 2, "0") + ":" + b(V, 2, "0");
    }, m: function M($, L) {
      if ($.date() < L.date())
        return -M(L, $);
      var F = 12 * (L.year() - $.year()) + (L.month() - $.month()), V = $.clone().add(F, f), q = L - V < 0, B = $.clone().add(F + (q ? -1 : 1), f);
      return +(-(F + (L - V) / (q ? V - B : B - V)) || 0);
    }, a: function(M) {
      return M < 0 ? Math.ceil(M) || 0 : Math.floor(M);
    }, p: function(M) {
      return { M: f, y: v, w: u, d: c, D: p, h: s, m: l, s: i, ms: a, Q: d }[M] || String(M || "").toLowerCase().replace(/s$/, "");
    }, u: function(M) {
      return M === void 0;
    } }, N = "en", S = {};
    S[N] = y;
    var E = "$isDayjsObject", C = function(M) {
      return M instanceof A || !(!M || !M[E]);
    }, I = function M($, L, F) {
      var V;
      if (!$)
        return N;
      if (typeof $ == "string") {
        var q = $.toLowerCase();
        S[q] && (V = q), L && (S[q] = L, V = q);
        var B = $.split("-");
        if (!V && B.length > 1)
          return M(B[0]);
      } else {
        var Z = $.name;
        S[Z] = $, V = Z;
      }
      return !F && V && (N = V), V || !F && N;
    }, _ = function(M, $) {
      if (C(M))
        return M.clone();
      var L = typeof $ == "object" ? $ : {};
      return L.date = M, L.args = arguments, new A(L);
    }, k = O;
    k.l = I, k.i = C, k.w = function(M, $) {
      return _(M, { locale: $.$L, utc: $.$u, x: $.$x, $offset: $.$offset });
    };
    var A = function() {
      function M(L) {
        this.$L = I(L.locale, null, !0), this.parse(L), this.$x = this.$x || L.x || {}, this[E] = !0;
      }
      var $ = M.prototype;
      return $.parse = function(L) {
        this.$d = function(F) {
          var V = F.date, q = F.utc;
          if (V === null)
            return /* @__PURE__ */ new Date(NaN);
          if (k.u(V))
            return /* @__PURE__ */ new Date();
          if (V instanceof Date)
            return new Date(V);
          if (typeof V == "string" && !/Z$/i.test(V)) {
            var B = V.match(h);
            if (B) {
              var Z = B[2] - 1 || 0, ae = (B[7] || "0").substring(0, 3);
              return q ? new Date(Date.UTC(B[1], Z, B[3] || 1, B[4] || 0, B[5] || 0, B[6] || 0, ae)) : new Date(B[1], Z, B[3] || 1, B[4] || 0, B[5] || 0, B[6] || 0, ae);
            }
          }
          return new Date(V);
        }(L), this.init();
      }, $.init = function() {
        var L = this.$d;
        this.$y = L.getFullYear(), this.$M = L.getMonth(), this.$D = L.getDate(), this.$W = L.getDay(), this.$H = L.getHours(), this.$m = L.getMinutes(), this.$s = L.getSeconds(), this.$ms = L.getMilliseconds();
      }, $.$utils = function() {
        return k;
      }, $.isValid = function() {
        return this.$d.toString() !== g;
      }, $.isSame = function(L, F) {
        var V = _(L);
        return this.startOf(F) <= V && V <= this.endOf(F);
      }, $.isAfter = function(L, F) {
        return _(L) < this.startOf(F);
      }, $.isBefore = function(L, F) {
        return this.endOf(F) < _(L);
      }, $.$g = function(L, F, V) {
        return k.u(L) ? this[F] : this.set(V, L);
      }, $.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, $.valueOf = function() {
        return this.$d.getTime();
      }, $.startOf = function(L, F) {
        var V = this, q = !!k.u(F) || F, B = k.p(L), Z = function(w, P) {
          var R = k.w(V.$u ? Date.UTC(V.$y, P, w) : new Date(V.$y, P, w), V);
          return q ? R : R.endOf(c);
        }, ae = function(w, P) {
          return k.w(V.toDate()[w].apply(V.toDate("s"), (q ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(P)), V);
        }, de = this.$W, he = this.$M, Se = this.$D, ne = "set" + (this.$u ? "UTC" : "");
        switch (B) {
          case v:
            return q ? Z(1, 0) : Z(31, 11);
          case f:
            return q ? Z(1, he) : Z(0, he + 1);
          case u:
            var j = this.$locale().weekStart || 0, Y = (de < j ? de + 7 : de) - j;
            return Z(q ? Se - Y : Se + (6 - Y), he);
          case c:
          case p:
            return ae(ne + "Hours", 0);
          case s:
            return ae(ne + "Minutes", 1);
          case l:
            return ae(ne + "Seconds", 2);
          case i:
            return ae(ne + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, $.endOf = function(L) {
        return this.startOf(L, !1);
      }, $.$set = function(L, F) {
        var V, q = k.p(L), B = "set" + (this.$u ? "UTC" : ""), Z = (V = {}, V[c] = B + "Date", V[p] = B + "Date", V[f] = B + "Month", V[v] = B + "FullYear", V[s] = B + "Hours", V[l] = B + "Minutes", V[i] = B + "Seconds", V[a] = B + "Milliseconds", V)[q], ae = q === c ? this.$D + (F - this.$W) : F;
        if (q === f || q === v) {
          var de = this.clone().set(p, 1);
          de.$d[Z](ae), de.init(), this.$d = de.set(p, Math.min(this.$D, de.daysInMonth())).$d;
        } else
          Z && this.$d[Z](ae);
        return this.init(), this;
      }, $.set = function(L, F) {
        return this.clone().$set(L, F);
      }, $.get = function(L) {
        return this[k.p(L)]();
      }, $.add = function(L, F) {
        var V, q = this;
        L = Number(L);
        var B = k.p(F), Z = function(he) {
          var Se = _(q);
          return k.w(Se.date(Se.date() + Math.round(he * L)), q);
        };
        if (B === f)
          return this.set(f, this.$M + L);
        if (B === v)
          return this.set(v, this.$y + L);
        if (B === c)
          return Z(1);
        if (B === u)
          return Z(7);
        var ae = (V = {}, V[l] = r, V[s] = o, V[i] = n, V)[B] || 1, de = this.$d.getTime() + L * ae;
        return k.w(de, this);
      }, $.subtract = function(L, F) {
        return this.add(-1 * L, F);
      }, $.format = function(L) {
        var F = this, V = this.$locale();
        if (!this.isValid())
          return V.invalidDate || g;
        var q = L || "YYYY-MM-DDTHH:mm:ssZ", B = k.z(this), Z = this.$H, ae = this.$m, de = this.$M, he = V.weekdays, Se = V.months, ne = V.meridiem, j = function(P, R, K, T) {
          return P && (P[R] || P(F, q)) || K[R].slice(0, T);
        }, Y = function(P) {
          return k.s(Z % 12 || 12, P, "0");
        }, w = ne || function(P, R, K) {
          var T = P < 12 ? "AM" : "PM";
          return K ? T.toLowerCase() : T;
        };
        return q.replace(m, function(P, R) {
          return R || function(K) {
            switch (K) {
              case "YY":
                return String(F.$y).slice(-2);
              case "YYYY":
                return k.s(F.$y, 4, "0");
              case "M":
                return de + 1;
              case "MM":
                return k.s(de + 1, 2, "0");
              case "MMM":
                return j(V.monthsShort, de, Se, 3);
              case "MMMM":
                return j(Se, de);
              case "D":
                return F.$D;
              case "DD":
                return k.s(F.$D, 2, "0");
              case "d":
                return String(F.$W);
              case "dd":
                return j(V.weekdaysMin, F.$W, he, 2);
              case "ddd":
                return j(V.weekdaysShort, F.$W, he, 3);
              case "dddd":
                return he[F.$W];
              case "H":
                return String(Z);
              case "HH":
                return k.s(Z, 2, "0");
              case "h":
                return Y(1);
              case "hh":
                return Y(2);
              case "a":
                return w(Z, ae, !0);
              case "A":
                return w(Z, ae, !1);
              case "m":
                return String(ae);
              case "mm":
                return k.s(ae, 2, "0");
              case "s":
                return String(F.$s);
              case "ss":
                return k.s(F.$s, 2, "0");
              case "SSS":
                return k.s(F.$ms, 3, "0");
              case "Z":
                return B;
            }
            return null;
          }(P) || B.replace(":", "");
        });
      }, $.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, $.diff = function(L, F, V) {
        var q, B = this, Z = k.p(F), ae = _(L), de = (ae.utcOffset() - this.utcOffset()) * r, he = this - ae, Se = function() {
          return k.m(B, ae);
        };
        switch (Z) {
          case v:
            q = Se() / 12;
            break;
          case f:
            q = Se();
            break;
          case d:
            q = Se() / 3;
            break;
          case u:
            q = (he - de) / 6048e5;
            break;
          case c:
            q = (he - de) / 864e5;
            break;
          case s:
            q = he / o;
            break;
          case l:
            q = he / r;
            break;
          case i:
            q = he / n;
            break;
          default:
            q = he;
        }
        return V ? q : k.a(q);
      }, $.daysInMonth = function() {
        return this.endOf(f).$D;
      }, $.$locale = function() {
        return S[this.$L];
      }, $.locale = function(L, F) {
        if (!L)
          return this.$L;
        var V = this.clone(), q = I(L, F, !0);
        return q && (V.$L = q), V;
      }, $.clone = function() {
        return k.w(this.$d, this);
      }, $.toDate = function() {
        return new Date(this.valueOf());
      }, $.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, $.toISOString = function() {
        return this.$d.toISOString();
      }, $.toString = function() {
        return this.$d.toUTCString();
      }, M;
    }(), x = A.prototype;
    return _.prototype = x, [["$ms", a], ["$s", i], ["$m", l], ["$H", s], ["$W", c], ["$M", f], ["$y", v], ["$D", p]].forEach(function(M) {
      x[M[1]] = function($) {
        return this.$g($, M[0], M[1]);
      };
    }), _.extend = function(M, $) {
      return M.$i || (M($, A, _), M.$i = !0), _;
    }, _.locale = I, _.isDayjs = C, _.unix = function(M) {
      return _(1e3 * M);
    }, _.en = S[N], _.Ls = S, _.p = {}, _;
  });
})(vf);
var kg = vf.exports;
const fe = /* @__PURE__ */ Zr(kg);
var gf = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(an, function() {
    var n = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, r = {};
    return function(o, a, i) {
      var l, s = function(d, v, p) {
        p === void 0 && (p = {});
        var g = new Date(d), h = function(m, y) {
          y === void 0 && (y = {});
          var b = y.timeZoneName || "short", O = m + "|" + b, N = r[O];
          return N || (N = new Intl.DateTimeFormat("en-US", { hour12: !1, timeZone: m, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: b }), r[O] = N), N;
        }(v, p);
        return h.formatToParts(g);
      }, c = function(d, v) {
        for (var p = s(d, v), g = [], h = 0; h < p.length; h += 1) {
          var m = p[h], y = m.type, b = m.value, O = n[y];
          O >= 0 && (g[O] = parseInt(b, 10));
        }
        var N = g[3], S = N === 24 ? 0 : N, E = g[0] + "-" + g[1] + "-" + g[2] + " " + S + ":" + g[4] + ":" + g[5] + ":000", C = +d;
        return (i.utc(E).valueOf() - (C -= C % 1e3)) / 6e4;
      }, u = a.prototype;
      u.tz = function(d, v) {
        d === void 0 && (d = l);
        var p = this.utcOffset(), g = this.toDate(), h = g.toLocaleString("en-US", { timeZone: d }), m = Math.round((g - new Date(h)) / 1e3 / 60), y = i(h, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(g.getTimezoneOffset() / 15) - m, !0);
        if (v) {
          var b = y.utcOffset();
          y = y.add(p - b, "minute");
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
        var g = p && v, h = p || v || l, m = c(+i(), h);
        if (typeof d != "string")
          return i(d).tz(h);
        var y = function(S, E, C) {
          var I = S - 60 * E * 1e3, _ = c(I, C);
          if (E === _)
            return [I, E];
          var k = c(I -= 60 * (_ - E) * 1e3, C);
          return _ === k ? [I, _] : [S - 60 * Math.min(_, k) * 1e3, Math.max(_, k)];
        }(i.utc(d, g).valueOf(), m, h), b = y[0], O = y[1], N = i(b).utcOffset(O);
        return N.$x.$timezone = h, N;
      }, i.tz.guess = function() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      }, i.tz.setDefault = function(d) {
        l = d;
      };
    };
  });
})(gf);
var Ig = gf.exports;
const Og = /* @__PURE__ */ Zr(Ig);
var yf = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(an, function() {
    var n = "minute", r = /[+-]\d\d(?::?\d\d)?/g, o = /([+-]|\d\d)/g;
    return function(a, i, l) {
      var s = i.prototype;
      l.utc = function(g) {
        var h = { date: g, utc: !0, args: arguments };
        return new i(h);
      }, s.utc = function(g) {
        var h = l(this.toDate(), { locale: this.$L, utc: !0 });
        return g ? h.add(this.utcOffset(), n) : h;
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
      s.utcOffset = function(g, h) {
        var m = this.$utils().u;
        if (m(g))
          return this.$u ? 0 : m(this.$offset) ? f.call(this) : this.$offset;
        if (typeof g == "string" && (g = function(N) {
          N === void 0 && (N = "");
          var S = N.match(r);
          if (!S)
            return null;
          var E = ("" + S[0]).match(o) || ["-", 0, 0], C = E[0], I = 60 * +E[1] + +E[2];
          return I === 0 ? 0 : C === "+" ? I : -I;
        }(g), g === null))
          return this;
        var y = Math.abs(g) <= 16 ? 60 * g : g, b = this;
        if (h)
          return b.$offset = y, b.$u = g === 0, b;
        if (g !== 0) {
          var O = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          (b = this.local().add(y + O, n)).$offset = y, b.$x.$localOffset = O;
        } else
          b = this.utc();
        return b;
      };
      var d = s.format;
      s.format = function(g) {
        var h = g || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
        return d.call(this, h);
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
      s.diff = function(g, h, m) {
        if (g && this.$u === g.$u)
          return p.call(this, g, h, m);
        var y = this.local(), b = l(g).local();
        return p.call(y, b, h, m);
      };
    };
  });
})(yf);
var Pg = yf.exports;
const Dg = /* @__PURE__ */ Zr(Pg);
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
const Ag = /\{([0-9a-zA-Z]+)\}/g;
function fl(e, ...t) {
  return t.length === 1 && Te(t[0]) && (t = t[0]), (!t || !t.hasOwnProperty) && (t = {}), e.replace(Ag, (n, r) => t.hasOwnProperty(r) ? t[r] : "");
}
const Xt = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), $g = (e, t, n) => Ng({ l: e, k: t, s: n }), Ng = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), tt = (e) => typeof e == "number" && isFinite(e), Lg = (e) => bf(e) === "[object Date]", Ba = (e) => bf(e) === "[object RegExp]", di = (e) => Ce(e) && Object.keys(e).length === 0, ct = Object.assign;
let Cc;
const pl = () => Cc || (Cc = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Tc(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const Rg = Object.prototype.hasOwnProperty;
function Va(e, t) {
  return Rg.call(e, t);
}
const Ge = Array.isArray, Me = (e) => typeof e == "function", ce = (e) => typeof e == "string", xe = (e) => typeof e == "boolean", Te = (e) => e !== null && typeof e == "object", Mg = (e) => Te(e) && Me(e.then) && Me(e.catch), _f = Object.prototype.toString, bf = (e) => _f.call(e), Ce = (e) => {
  if (!Te(e))
    return !1;
  const t = Object.getPrototypeOf(e);
  return t === null || t.constructor === Object;
}, xg = (e) => e == null ? "" : Ge(e) || Ce(e) && e.toString === _f ? JSON.stringify(e, null, 2) : String(e);
function Bg(e, t = "") {
  return e.reduce((n, r, o) => o === 0 ? n + r : n + t + r, "");
}
const Sc = 2;
function Vg(e, t = 0, n = e.length) {
  const r = e.split(/\r?\n/);
  let o = 0;
  const a = [];
  for (let i = 0; i < r.length; i++)
    if (o += r[i].length + 1, o >= t) {
      for (let l = i - Sc; l <= i + Sc || n > o; l++) {
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
function Kt(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const kc = {};
function Ef(e) {
  kc[e] || (kc[e] = !0, Kt(e));
}
function wf() {
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
const fa = (e) => !Te(e) || Ge(e);
function Ia(e, t) {
  if (fa(e) || fa(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: r, des: o } = n.pop();
    Object.keys(r).forEach((a) => {
      fa(r[a]) || fa(o[a]) ? o[a] = r[a] : n.push({ src: r[a], des: o[a] });
    });
  }
}
/*!
  * message-compiler v9.10.2
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
function Ug(e, t, n) {
  return { line: e, column: t, offset: n };
}
function Cs(e, t, n) {
  const r = { start: e, end: t };
  return n != null && (r.source = n), r;
}
const Fg = /\{([0-9a-zA-Z]+)\}/g;
function Hg(e, ...t) {
  return t.length === 1 && Yg(t[0]) && (t = t[0]), (!t || !t.hasOwnProperty) && (t = {}), e.replace(Fg, (n, r) => t.hasOwnProperty(r) ? t[r] : "");
}
const Cf = Object.assign, Ic = (e) => typeof e == "string", Yg = (e) => e !== null && typeof e == "object";
function Tf(e, t = "") {
  return e.reduce((n, r, o) => o === 0 ? n + r : n + t + r, "");
}
const pe = {
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
}, jg = {
  // tokenizer error messages
  [pe.EXPECTED_TOKEN]: "Expected token: '{0}'",
  [pe.INVALID_TOKEN_IN_PLACEHOLDER]: "Invalid token in placeholder: '{0}'",
  [pe.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: "Unterminated single quote in placeholder",
  [pe.UNKNOWN_ESCAPE_SEQUENCE]: "Unknown escape sequence: \\{0}",
  [pe.INVALID_UNICODE_ESCAPE_SEQUENCE]: "Invalid unicode escape sequence: {0}",
  [pe.UNBALANCED_CLOSING_BRACE]: "Unbalanced closing brace",
  [pe.UNTERMINATED_CLOSING_BRACE]: "Unterminated closing brace",
  [pe.EMPTY_PLACEHOLDER]: "Empty placeholder",
  [pe.NOT_ALLOW_NEST_PLACEHOLDER]: "Not allowed nest placeholder",
  [pe.INVALID_LINKED_FORMAT]: "Invalid linked format",
  // parser error messages
  [pe.MUST_HAVE_MESSAGES_IN_PLURAL]: "Plural must have messages",
  [pe.UNEXPECTED_EMPTY_LINKED_MODIFIER]: "Unexpected empty linked modifier",
  [pe.UNEXPECTED_EMPTY_LINKED_KEY]: "Unexpected empty linked key",
  [pe.UNEXPECTED_LEXICAL_ANALYSIS]: "Unexpected lexical analysis in token: '{0}'",
  // generator error messages
  [pe.UNHANDLED_CODEGEN_NODE_TYPE]: "unhandled codegen node type: '{0}'",
  // minimizer error messages
  [pe.UNHANDLED_MINIFIER_NODE_TYPE]: "unhandled mimifier node type: '{0}'"
};
function Qr(e, t, n = {}) {
  const { domain: r, messages: o, args: a } = n, i = Hg((o || jg)[e] || "", ...a || []), l = new SyntaxError(String(i));
  return l.code = e, t && (l.location = t), l.domain = r, l;
}
function Wg(e) {
  throw e;
}
const zg = /<\/?[\w\s="/.':;#-\/]+>/, qg = (e) => zg.test(e), Qt = " ", Gg = "\r", ft = `
`, Xg = "\u2028", Kg = "\u2029";
function Jg(e) {
  const t = e;
  let n = 0, r = 1, o = 1, a = 0;
  const i = (E) => t[E] === Gg && t[E + 1] === ft, l = (E) => t[E] === ft, s = (E) => t[E] === Kg, c = (E) => t[E] === Xg, u = (E) => i(E) || l(E) || s(E) || c(E), f = () => n, d = () => r, v = () => o, p = () => a, g = (E) => i(E) || s(E) || c(E) ? ft : t[E], h = () => g(n), m = () => g(n + a);
  function y() {
    return a = 0, u(n) && (r++, o = 0), i(n) && n++, n++, o++, t[n];
  }
  function b() {
    return i(n + a) && a++, a++, t[n + a];
  }
  function O() {
    n = 0, r = 1, o = 1, a = 0;
  }
  function N(E = 0) {
    a = E;
  }
  function S() {
    const E = n + a;
    for (; E !== n; )
      y();
    a = 0;
  }
  return {
    index: f,
    line: d,
    column: v,
    peekOffset: p,
    charAt: g,
    currentChar: h,
    currentPeek: m,
    next: y,
    peek: b,
    reset: O,
    resetPeek: N,
    skipToPeek: S
  };
}
const En = void 0, Zg = ".", Oc = "'", Qg = "tokenizer";
function ey(e, t = {}) {
  const n = t.location !== !1, r = Jg(e), o = () => r.index(), a = () => Ug(r.line(), r.column(), r.index()), i = a(), l = o(), s = {
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
  function f(T, D, H, ...ee) {
    const ie = c();
    if (D.column += H, D.offset += H, u) {
      const ve = n ? Cs(ie.startLoc, D) : null, Le = Qr(T, ve, {
        domain: Qg,
        args: ee
      });
      u(Le);
    }
  }
  function d(T, D, H) {
    T.endLoc = a(), T.currentType = D;
    const ee = { type: D };
    return n && (ee.loc = Cs(T.startLoc, T.endLoc)), H != null && (ee.value = H), ee;
  }
  const v = (T) => d(
    T,
    14
    /* TokenTypes.EOF */
  );
  function p(T, D) {
    return T.currentChar() === D ? (T.next(), D) : (f(pe.EXPECTED_TOKEN, a(), 0, D), "");
  }
  function g(T) {
    let D = "";
    for (; T.currentPeek() === Qt || T.currentPeek() === ft; )
      D += T.currentPeek(), T.peek();
    return D;
  }
  function h(T) {
    const D = g(T);
    return T.skipToPeek(), D;
  }
  function m(T) {
    if (T === En)
      return !1;
    const D = T.charCodeAt(0);
    return D >= 97 && D <= 122 || // a-z
    D >= 65 && D <= 90 || // A-Z
    D === 95;
  }
  function y(T) {
    if (T === En)
      return !1;
    const D = T.charCodeAt(0);
    return D >= 48 && D <= 57;
  }
  function b(T, D) {
    const { currentType: H } = D;
    if (H !== 2)
      return !1;
    g(T);
    const ee = m(T.currentPeek());
    return T.resetPeek(), ee;
  }
  function O(T, D) {
    const { currentType: H } = D;
    if (H !== 2)
      return !1;
    g(T);
    const ee = T.currentPeek() === "-" ? T.peek() : T.currentPeek(), ie = y(ee);
    return T.resetPeek(), ie;
  }
  function N(T, D) {
    const { currentType: H } = D;
    if (H !== 2)
      return !1;
    g(T);
    const ee = T.currentPeek() === Oc;
    return T.resetPeek(), ee;
  }
  function S(T, D) {
    const { currentType: H } = D;
    if (H !== 8)
      return !1;
    g(T);
    const ee = T.currentPeek() === ".";
    return T.resetPeek(), ee;
  }
  function E(T, D) {
    const { currentType: H } = D;
    if (H !== 9)
      return !1;
    g(T);
    const ee = m(T.currentPeek());
    return T.resetPeek(), ee;
  }
  function C(T, D) {
    const { currentType: H } = D;
    if (!(H === 8 || H === 12))
      return !1;
    g(T);
    const ee = T.currentPeek() === ":";
    return T.resetPeek(), ee;
  }
  function I(T, D) {
    const { currentType: H } = D;
    if (H !== 10)
      return !1;
    const ee = () => {
      const ve = T.currentPeek();
      return ve === "{" ? m(T.peek()) : ve === "@" || ve === "%" || ve === "|" || ve === ":" || ve === "." || ve === Qt || !ve ? !1 : ve === ft ? (T.peek(), ee()) : m(ve);
    }, ie = ee();
    return T.resetPeek(), ie;
  }
  function _(T) {
    g(T);
    const D = T.currentPeek() === "|";
    return T.resetPeek(), D;
  }
  function k(T) {
    const D = g(T), H = T.currentPeek() === "%" && T.peek() === "{";
    return T.resetPeek(), {
      isModulo: H,
      hasSpace: D.length > 0
    };
  }
  function A(T, D = !0) {
    const H = (ie = !1, ve = "", Le = !1) => {
      const Re = T.currentPeek();
      return Re === "{" ? ve === "%" ? !1 : ie : Re === "@" || !Re ? ve === "%" ? !0 : ie : Re === "%" ? (T.peek(), H(ie, "%", !0)) : Re === "|" ? ve === "%" || Le ? !0 : !(ve === Qt || ve === ft) : Re === Qt ? (T.peek(), H(!0, Qt, Le)) : Re === ft ? (T.peek(), H(!0, ft, Le)) : !0;
    }, ee = H();
    return D && T.resetPeek(), ee;
  }
  function x(T, D) {
    const H = T.currentChar();
    return H === En ? En : D(H) ? (T.next(), H) : null;
  }
  function M(T) {
    return x(T, (H) => {
      const ee = H.charCodeAt(0);
      return ee >= 97 && ee <= 122 || // a-z
      ee >= 65 && ee <= 90 || // A-Z
      ee >= 48 && ee <= 57 || // 0-9
      ee === 95 || // _
      ee === 36;
    });
  }
  function $(T) {
    return x(T, (H) => {
      const ee = H.charCodeAt(0);
      return ee >= 48 && ee <= 57;
    });
  }
  function L(T) {
    return x(T, (H) => {
      const ee = H.charCodeAt(0);
      return ee >= 48 && ee <= 57 || // 0-9
      ee >= 65 && ee <= 70 || // A-F
      ee >= 97 && ee <= 102;
    });
  }
  function F(T) {
    let D = "", H = "";
    for (; D = $(T); )
      H += D;
    return H;
  }
  function V(T) {
    h(T);
    const D = T.currentChar();
    return D !== "%" && f(pe.EXPECTED_TOKEN, a(), 0, D), T.next(), "%";
  }
  function q(T) {
    let D = "";
    for (; ; ) {
      const H = T.currentChar();
      if (H === "{" || H === "}" || H === "@" || H === "|" || !H)
        break;
      if (H === "%")
        if (A(T))
          D += H, T.next();
        else
          break;
      else if (H === Qt || H === ft)
        if (A(T))
          D += H, T.next();
        else {
          if (_(T))
            break;
          D += H, T.next();
        }
      else
        D += H, T.next();
    }
    return D;
  }
  function B(T) {
    h(T);
    let D = "", H = "";
    for (; D = M(T); )
      H += D;
    return T.currentChar() === En && f(pe.UNTERMINATED_CLOSING_BRACE, a(), 0), H;
  }
  function Z(T) {
    h(T);
    let D = "";
    return T.currentChar() === "-" ? (T.next(), D += `-${F(T)}`) : D += F(T), T.currentChar() === En && f(pe.UNTERMINATED_CLOSING_BRACE, a(), 0), D;
  }
  function ae(T) {
    h(T), p(T, "'");
    let D = "", H = "";
    const ee = (ve) => ve !== Oc && ve !== ft;
    for (; D = x(T, ee); )
      D === "\\" ? H += de(T) : H += D;
    const ie = T.currentChar();
    return ie === ft || ie === En ? (f(pe.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, a(), 0), ie === ft && (T.next(), p(T, "'")), H) : (p(T, "'"), H);
  }
  function de(T) {
    const D = T.currentChar();
    switch (D) {
      case "\\":
      case "'":
        return T.next(), `\\${D}`;
      case "u":
        return he(T, D, 4);
      case "U":
        return he(T, D, 6);
      default:
        return f(pe.UNKNOWN_ESCAPE_SEQUENCE, a(), 0, D), "";
    }
  }
  function he(T, D, H) {
    p(T, D);
    let ee = "";
    for (let ie = 0; ie < H; ie++) {
      const ve = L(T);
      if (!ve) {
        f(pe.INVALID_UNICODE_ESCAPE_SEQUENCE, a(), 0, `\\${D}${ee}${T.currentChar()}`);
        break;
      }
      ee += ve;
    }
    return `\\${D}${ee}`;
  }
  function Se(T) {
    h(T);
    let D = "", H = "";
    const ee = (ie) => ie !== "{" && ie !== "}" && ie !== Qt && ie !== ft;
    for (; D = x(T, ee); )
      H += D;
    return H;
  }
  function ne(T) {
    let D = "", H = "";
    for (; D = M(T); )
      H += D;
    return H;
  }
  function j(T) {
    const D = (H = !1, ee) => {
      const ie = T.currentChar();
      return ie === "{" || ie === "%" || ie === "@" || ie === "|" || ie === "(" || ie === ")" || !ie || ie === Qt ? ee : ie === ft || ie === Zg ? (ee += ie, T.next(), D(H, ee)) : (ee += ie, T.next(), D(!0, ee));
    };
    return D(!1, "");
  }
  function Y(T) {
    h(T);
    const D = p(
      T,
      "|"
      /* TokenChars.Pipe */
    );
    return h(T), D;
  }
  function w(T, D) {
    let H = null;
    switch (T.currentChar()) {
      case "{":
        return D.braceNest >= 1 && f(pe.NOT_ALLOW_NEST_PLACEHOLDER, a(), 0), T.next(), H = d(
          D,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), h(T), D.braceNest++, H;
      case "}":
        return D.braceNest > 0 && D.currentType === 2 && f(pe.EMPTY_PLACEHOLDER, a(), 0), T.next(), H = d(
          D,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), D.braceNest--, D.braceNest > 0 && h(T), D.inLinked && D.braceNest === 0 && (D.inLinked = !1), H;
      case "@":
        return D.braceNest > 0 && f(pe.UNTERMINATED_CLOSING_BRACE, a(), 0), H = P(T, D) || v(D), D.braceNest = 0, H;
      default: {
        let ie = !0, ve = !0, Le = !0;
        if (_(T))
          return D.braceNest > 0 && f(pe.UNTERMINATED_CLOSING_BRACE, a(), 0), H = d(D, 1, Y(T)), D.braceNest = 0, D.inLinked = !1, H;
        if (D.braceNest > 0 && (D.currentType === 5 || D.currentType === 6 || D.currentType === 7))
          return f(pe.UNTERMINATED_CLOSING_BRACE, a(), 0), D.braceNest = 0, R(T, D);
        if (ie = b(T, D))
          return H = d(D, 5, B(T)), h(T), H;
        if (ve = O(T, D))
          return H = d(D, 6, Z(T)), h(T), H;
        if (Le = N(T, D))
          return H = d(D, 7, ae(T)), h(T), H;
        if (!ie && !ve && !Le)
          return H = d(D, 13, Se(T)), f(pe.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, H.value), h(T), H;
        break;
      }
    }
    return H;
  }
  function P(T, D) {
    const { currentType: H } = D;
    let ee = null;
    const ie = T.currentChar();
    switch ((H === 8 || H === 9 || H === 12 || H === 10) && (ie === ft || ie === Qt) && f(pe.INVALID_LINKED_FORMAT, a(), 0), ie) {
      case "@":
        return T.next(), ee = d(
          D,
          8,
          "@"
          /* TokenChars.LinkedAlias */
        ), D.inLinked = !0, ee;
      case ".":
        return h(T), T.next(), d(
          D,
          9,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return h(T), T.next(), d(
          D,
          10,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return _(T) ? (ee = d(D, 1, Y(T)), D.braceNest = 0, D.inLinked = !1, ee) : S(T, D) || C(T, D) ? (h(T), P(T, D)) : E(T, D) ? (h(T), d(D, 12, ne(T))) : I(T, D) ? (h(T), ie === "{" ? w(T, D) || ee : d(D, 11, j(T))) : (H === 8 && f(pe.INVALID_LINKED_FORMAT, a(), 0), D.braceNest = 0, D.inLinked = !1, R(T, D));
    }
  }
  function R(T, D) {
    let H = {
      type: 14
      /* TokenTypes.EOF */
    };
    if (D.braceNest > 0)
      return w(T, D) || v(D);
    if (D.inLinked)
      return P(T, D) || v(D);
    switch (T.currentChar()) {
      case "{":
        return w(T, D) || v(D);
      case "}":
        return f(pe.UNBALANCED_CLOSING_BRACE, a(), 0), T.next(), d(
          D,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return P(T, D) || v(D);
      default: {
        if (_(T))
          return H = d(D, 1, Y(T)), D.braceNest = 0, D.inLinked = !1, H;
        const { isModulo: ie, hasSpace: ve } = k(T);
        if (ie)
          return ve ? d(D, 0, q(T)) : d(D, 4, V(T));
        if (A(T))
          return d(D, 0, q(T));
        break;
      }
    }
    return H;
  }
  function K() {
    const { currentType: T, offset: D, startLoc: H, endLoc: ee } = s;
    return s.lastType = T, s.lastOffset = D, s.lastStartLoc = H, s.lastEndLoc = ee, s.offset = o(), s.startLoc = a(), r.currentChar() === En ? d(
      s,
      14
      /* TokenTypes.EOF */
    ) : R(r, s);
  }
  return {
    nextToken: K,
    currentOffset: o,
    currentPosition: a,
    context: c
  };
}
const ty = "parser", ny = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function ry(e, t, n) {
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
function oy(e = {}) {
  const t = e.location !== !1, { onError: n } = e;
  function r(m, y, b, O, ...N) {
    const S = m.currentPosition();
    if (S.offset += O, S.column += O, n) {
      const E = t ? Cs(b, S) : null, C = Qr(y, E, {
        domain: ty,
        args: N
      });
      n(C);
    }
  }
  function o(m, y, b) {
    const O = { type: m };
    return t && (O.start = y, O.end = y, O.loc = { start: b, end: b }), O;
  }
  function a(m, y, b, O) {
    O && (m.type = O), t && (m.end = y, m.loc && (m.loc.end = b));
  }
  function i(m, y) {
    const b = m.context(), O = o(3, b.offset, b.startLoc);
    return O.value = y, a(O, m.currentOffset(), m.currentPosition()), O;
  }
  function l(m, y) {
    const b = m.context(), { lastOffset: O, lastStartLoc: N } = b, S = o(5, O, N);
    return S.index = parseInt(y, 10), m.nextToken(), a(S, m.currentOffset(), m.currentPosition()), S;
  }
  function s(m, y) {
    const b = m.context(), { lastOffset: O, lastStartLoc: N } = b, S = o(4, O, N);
    return S.key = y, m.nextToken(), a(S, m.currentOffset(), m.currentPosition()), S;
  }
  function c(m, y) {
    const b = m.context(), { lastOffset: O, lastStartLoc: N } = b, S = o(9, O, N);
    return S.value = y.replace(ny, ry), m.nextToken(), a(S, m.currentOffset(), m.currentPosition()), S;
  }
  function u(m) {
    const y = m.nextToken(), b = m.context(), { lastOffset: O, lastStartLoc: N } = b, S = o(8, O, N);
    return y.type !== 12 ? (r(m, pe.UNEXPECTED_EMPTY_LINKED_MODIFIER, b.lastStartLoc, 0), S.value = "", a(S, O, N), {
      nextConsumeToken: y,
      node: S
    }) : (y.value == null && r(m, pe.UNEXPECTED_LEXICAL_ANALYSIS, b.lastStartLoc, 0, Vt(y)), S.value = y.value || "", a(S, m.currentOffset(), m.currentPosition()), {
      node: S
    });
  }
  function f(m, y) {
    const b = m.context(), O = o(7, b.offset, b.startLoc);
    return O.value = y, a(O, m.currentOffset(), m.currentPosition()), O;
  }
  function d(m) {
    const y = m.context(), b = o(6, y.offset, y.startLoc);
    let O = m.nextToken();
    if (O.type === 9) {
      const N = u(m);
      b.modifier = N.node, O = N.nextConsumeToken || m.nextToken();
    }
    switch (O.type !== 10 && r(m, pe.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Vt(O)), O = m.nextToken(), O.type === 2 && (O = m.nextToken()), O.type) {
      case 11:
        O.value == null && r(m, pe.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Vt(O)), b.key = f(m, O.value || "");
        break;
      case 5:
        O.value == null && r(m, pe.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Vt(O)), b.key = s(m, O.value || "");
        break;
      case 6:
        O.value == null && r(m, pe.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Vt(O)), b.key = l(m, O.value || "");
        break;
      case 7:
        O.value == null && r(m, pe.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Vt(O)), b.key = c(m, O.value || "");
        break;
      default: {
        r(m, pe.UNEXPECTED_EMPTY_LINKED_KEY, y.lastStartLoc, 0);
        const N = m.context(), S = o(7, N.offset, N.startLoc);
        return S.value = "", a(S, N.offset, N.startLoc), b.key = S, a(b, N.offset, N.startLoc), {
          nextConsumeToken: O,
          node: b
        };
      }
    }
    return a(b, m.currentOffset(), m.currentPosition()), {
      node: b
    };
  }
  function v(m) {
    const y = m.context(), b = y.currentType === 1 ? m.currentOffset() : y.offset, O = y.currentType === 1 ? y.endLoc : y.startLoc, N = o(2, b, O);
    N.items = [];
    let S = null;
    do {
      const I = S || m.nextToken();
      switch (S = null, I.type) {
        case 0:
          I.value == null && r(m, pe.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Vt(I)), N.items.push(i(m, I.value || ""));
          break;
        case 6:
          I.value == null && r(m, pe.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Vt(I)), N.items.push(l(m, I.value || ""));
          break;
        case 5:
          I.value == null && r(m, pe.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Vt(I)), N.items.push(s(m, I.value || ""));
          break;
        case 7:
          I.value == null && r(m, pe.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Vt(I)), N.items.push(c(m, I.value || ""));
          break;
        case 8: {
          const _ = d(m);
          N.items.push(_.node), S = _.nextConsumeToken || null;
          break;
        }
      }
    } while (y.currentType !== 14 && y.currentType !== 1);
    const E = y.currentType === 1 ? y.lastOffset : m.currentOffset(), C = y.currentType === 1 ? y.lastEndLoc : m.currentPosition();
    return a(N, E, C), N;
  }
  function p(m, y, b, O) {
    const N = m.context();
    let S = O.items.length === 0;
    const E = o(1, y, b);
    E.cases = [], E.cases.push(O);
    do {
      const C = v(m);
      S || (S = C.items.length === 0), E.cases.push(C);
    } while (N.currentType !== 14);
    return S && r(m, pe.MUST_HAVE_MESSAGES_IN_PLURAL, b, 0), a(E, m.currentOffset(), m.currentPosition()), E;
  }
  function g(m) {
    const y = m.context(), { offset: b, startLoc: O } = y, N = v(m);
    return y.currentType === 14 ? N : p(m, b, O, N);
  }
  function h(m) {
    const y = ey(m, Cf({}, e)), b = y.context(), O = o(0, b.offset, b.startLoc);
    return t && O.loc && (O.loc.source = m), O.body = g(y), e.onCacheKey && (O.cacheKey = e.onCacheKey(m)), b.currentType !== 14 && r(y, pe.UNEXPECTED_LEXICAL_ANALYSIS, b.lastStartLoc, 0, m[b.offset] || ""), a(O, y.currentOffset(), y.currentPosition()), O;
  }
  return { parse: h };
}
function Vt(e) {
  if (e.type === 14)
    return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function ay(e, t = {}) {
  const n = {
    ast: e,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => n, helper: (a) => (n.helpers.add(a), a) };
}
function Pc(e, t) {
  for (let n = 0; n < e.length; n++)
    hl(e[n], t);
}
function hl(e, t) {
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
      hl(e.key, t), t.helper(
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
function iy(e, t = {}) {
  const n = ay(e);
  n.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), e.body && hl(e.body, n);
  const r = n.context();
  e.helpers = Array.from(r.helpers);
}
function sy(e) {
  const t = e.body;
  return t.type === 2 ? Dc(t) : t.cases.forEach((n) => Dc(n)), e;
}
function Dc(e) {
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
      e.static = Tf(t);
      for (let n = 0; n < e.items.length; n++) {
        const r = e.items[n];
        (r.type === 3 || r.type === 9) && delete r.value;
      }
    }
  }
}
const ly = "minifier";
function Ir(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      Ir(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let r = 0; r < n.length; r++)
        Ir(n[r]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let r = 0; r < n.length; r++)
        Ir(n[r]);
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
      Ir(t.key), t.k = t.key, delete t.key, t.modifier && (Ir(t.modifier), t.m = t.modifier, delete t.modifier);
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
      throw Qr(pe.UNHANDLED_MINIFIER_NODE_TYPE, null, {
        domain: ly,
        args: [e.type]
      });
  }
  delete e.type;
}
const cy = "parser";
function uy(e, t) {
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
  function c(h, m) {
    l.code += h;
  }
  function u(h, m = !0) {
    const y = m ? o : "";
    c(a ? y + "  ".repeat(h) : y);
  }
  function f(h = !0) {
    const m = ++l.indentLevel;
    h && u(m);
  }
  function d(h = !0) {
    const m = --l.indentLevel;
    h && u(m);
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
    helper: (h) => `_${h}`,
    needIndent: () => l.needIndent
  };
}
function dy(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), Fr(e, t.key), t.modifier ? (e.push(", "), Fr(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function fy(e, t) {
  const { helper: n, needIndent: r } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(r());
  const o = t.items.length;
  for (let a = 0; a < o && (Fr(e, t.items[a]), a !== o - 1); a++)
    e.push(", ");
  e.deindent(r()), e.push("])");
}
function py(e, t) {
  const { helper: n, needIndent: r } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(r());
    const o = t.cases.length;
    for (let a = 0; a < o && (Fr(e, t.cases[a]), a !== o - 1); a++)
      e.push(", ");
    e.deindent(r()), e.push("])");
  }
}
function my(e, t) {
  t.body ? Fr(e, t.body) : e.push("null");
}
function Fr(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      my(e, t);
      break;
    case 1:
      py(e, t);
      break;
    case 2:
      fy(e, t);
      break;
    case 6:
      dy(e, t);
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
      throw Qr(pe.UNHANDLED_CODEGEN_NODE_TYPE, null, {
        domain: cy,
        args: [t.type]
      });
  }
}
const hy = (e, t = {}) => {
  const n = Ic(t.mode) ? t.mode : "normal", r = Ic(t.filename) ? t.filename : "message.intl", o = !!t.sourceMap, a = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, i = t.needIndent ? t.needIndent : n !== "arrow", l = e.helpers || [], s = uy(e, {
    mode: n,
    filename: r,
    sourceMap: o,
    breakLineCode: a,
    needIndent: i
  });
  s.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), s.indent(i), l.length > 0 && (s.push(`const { ${Tf(l.map((f) => `${f}: _${f}`), ", ")} } = ctx`), s.newline()), s.push("return "), Fr(s, e), s.deindent(i), s.push("}"), delete e.helpers;
  const { code: c, map: u } = s.context();
  return {
    ast: e,
    code: c,
    map: u ? u.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function vy(e, t = {}) {
  const n = Cf({}, t), r = !!n.jit, o = !!n.minify, a = n.optimize == null ? !0 : n.optimize, l = oy(n).parse(e);
  return r ? (a && sy(l), o && Ir(l), { ast: l, code: "" }) : (iy(l, n), hy(l, n));
}
/*!
  * core-base v9.10.2
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
function gy() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (pl().__INTLIFY_PROD_DEVTOOLS__ = !1);
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
const yy = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function _y(e) {
  return yy.test(e);
}
function by(e) {
  const t = e.charCodeAt(0), n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function Ey(e) {
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
function wy(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : _y(t) ? by(t) : "*" + t;
}
function Cy(e) {
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
      if (o = 0, i === void 0 || (i = wy(i), i === !1))
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
      if (s = Ey(a), f = Wn[r], c = f[s] || f.l || 8, c === 8 || (r = c[0], c[1] !== void 0 && (u = d[c[1]], u && (l = a, u() === !1))))
        return;
      if (r === 7)
        return t;
    }
}
const Ac = /* @__PURE__ */ new Map();
function Ty(e, t) {
  return Te(e) ? e[t] : null;
}
function Sy(e, t) {
  if (!Te(e))
    return null;
  let n = Ac.get(t);
  if (n || (n = Cy(t), n && Ac.set(t, n)), !n)
    return null;
  const r = n.length;
  let o = e, a = 0;
  for (; a < r; ) {
    const i = o[n[a]];
    if (i === void 0 || Me(o))
      return null;
    o = i, a++;
  }
  return o;
}
const ky = (e) => e, Iy = (e) => "", Oy = "text", Py = (e) => e.length === 0 ? "" : Bg(e), Dy = xg;
function $c(e, t) {
  return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function Ay(e) {
  const t = tt(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (tt(e.named.count) || tt(e.named.n)) ? tt(e.named.count) ? e.named.count : tt(e.named.n) ? e.named.n : t : t;
}
function $y(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function Ny(e = {}) {
  const t = e.locale, n = Ay(e), r = Te(e.pluralRules) && ce(t) && Me(e.pluralRules[t]) ? e.pluralRules[t] : $c, o = Te(e.pluralRules) && ce(t) && Me(e.pluralRules[t]) ? $c : void 0, a = (m) => m[r(n, m.length, o)], i = e.list || [], l = (m) => i[m], s = e.named || {};
  tt(e.pluralIndex) && $y(n, s);
  const c = (m) => s[m];
  function u(m) {
    const y = Me(e.messages) ? e.messages(m) : Te(e.messages) ? e.messages[m] : !1;
    return y || (e.parent ? e.parent.message(m) : Iy);
  }
  const f = (m) => e.modifiers ? e.modifiers[m] : ky, d = Ce(e.processor) && Me(e.processor.normalize) ? e.processor.normalize : Py, v = Ce(e.processor) && Me(e.processor.interpolate) ? e.processor.interpolate : Dy, p = Ce(e.processor) && ce(e.processor.type) ? e.processor.type : Oy, h = {
    list: l,
    named: c,
    plural: a,
    linked: (m, ...y) => {
      const [b, O] = y;
      let N = "text", S = "";
      y.length === 1 ? Te(b) ? (S = b.modifier || S, N = b.type || N) : ce(b) && (S = b || S) : y.length === 2 && (ce(b) && (S = b || S), ce(O) && (N = O || N));
      const E = u(m)(h), C = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        N === "vnode" && Ge(E) && S ? E[0] : E
      );
      return S ? f(S)(C, N) : C;
    },
    message: u,
    type: p,
    interpolate: v,
    normalize: d,
    values: ct({}, i, s)
  };
  return h;
}
let Oo = null;
function Ly(e) {
  Oo = e;
}
function Ry(e, t, n) {
  Oo && Oo.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
const My = /* @__PURE__ */ xy(
  "function:translate"
  /* IntlifyDevToolsHooks.FunctionTranslate */
);
function xy(e) {
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
}, By = {
  [pt.NOT_FOUND_KEY]: "Not found '{key}' key in '{locale}' locale messages.",
  [pt.FALLBACK_TO_TRANSLATE]: "Fall back to translate '{key}' key with '{target}' locale.",
  [pt.CANNOT_FORMAT_NUMBER]: "Cannot format a number value due to not supported Intl.NumberFormat.",
  [pt.FALLBACK_TO_NUMBER_FORMAT]: "Fall back to number format '{key}' key with '{target}' locale.",
  [pt.CANNOT_FORMAT_DATE]: "Cannot format a date value due to not supported Intl.DateTimeFormat.",
  [pt.FALLBACK_TO_DATE_FORMAT]: "Fall back to datetime format '{key}' key with '{target}' locale.",
  [pt.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER]: "This project is using Custom Message Compiler, which is an experimental feature. It may receive breaking changes or be removed in the future."
};
function mr(e, ...t) {
  return fl(By[e], ...t);
}
const Sf = pe.__EXTEND_POINT__, Qn = ml(Sf), ot = {
  INVALID_ARGUMENT: Sf,
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
  return Qr(e, null, process.env.NODE_ENV !== "production" ? { messages: Vy } : void 0);
}
const Vy = {
  [ot.INVALID_ARGUMENT]: "Invalid arguments",
  [ot.INVALID_DATE_ARGUMENT]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
  [ot.INVALID_ISO_DATE_ARGUMENT]: "The argument provided is not a valid ISO date string",
  [ot.NOT_SUPPORT_NON_STRING_MESSAGE]: "Not support non-string message",
  [ot.NOT_SUPPORT_LOCALE_PROMISE_VALUE]: "cannot support promise value",
  [ot.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION]: "cannot support async function",
  [ot.NOT_SUPPORT_LOCALE_TYPE]: "cannot support locale type"
};
function vl(e, t) {
  return t.locale != null ? Nc(t.locale) : Nc(e.locale);
}
let Vi;
function Nc(e) {
  if (ce(e))
    return e;
  if (Me(e)) {
    if (e.resolvedOnce && Vi != null)
      return Vi;
    if (e.constructor.name === "Function") {
      const t = e();
      if (Mg(t))
        throw sn(ot.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return Vi = t;
    } else
      throw sn(ot.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw sn(ot.NOT_SUPPORT_LOCALE_TYPE);
}
function Uy(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...Ge(t) ? t : Te(t) ? Object.keys(t) : ce(t) ? [t] : [n]
  ])];
}
function kf(e, t, n) {
  const r = ce(n) ? n : Ua, o = e;
  o.__localeChainCache || (o.__localeChainCache = /* @__PURE__ */ new Map());
  let a = o.__localeChainCache.get(r);
  if (!a) {
    a = [];
    let i = [n];
    for (; Ge(i); )
      i = Lc(a, i, t);
    const l = Ge(t) || !Ce(t) ? t : t.default ? t.default : null;
    i = ce(l) ? [l] : l, Ge(i) && Lc(a, i, !1), o.__localeChainCache.set(r, a);
  }
  return a;
}
function Lc(e, t, n) {
  let r = !0;
  for (let o = 0; o < t.length && xe(r); o++) {
    const a = t[o];
    ce(a) && (r = Fy(e, t[o], n));
  }
  return r;
}
function Fy(e, t, n) {
  let r;
  const o = t.split("-");
  do {
    const a = o.join("-");
    r = Hy(e, a, n), o.splice(-1, 1);
  } while (o.length && r === !0);
  return r;
}
function Hy(e, t, n) {
  let r = !1;
  if (!e.includes(t) && (r = !0, t)) {
    r = t[t.length - 1] !== "!";
    const o = t.replace(/!/g, "");
    e.push(o), (Ge(n) || Ce(n)) && n[o] && (r = n[o]);
  }
  return r;
}
const Yy = "9.10.2", fi = -1, Ua = "en-US", Fa = "", Rc = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function jy() {
  return {
    upper: (e, t) => t === "text" && ce(e) ? e.toUpperCase() : t === "vnode" && Te(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && ce(e) ? e.toLowerCase() : t === "vnode" && Te(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && ce(e) ? Rc(e) : t === "vnode" && Te(e) && "__v_isVNode" in e ? Rc(e.children) : e
  };
}
let If;
function Wy(e) {
  If = e;
}
let Of;
function zy(e) {
  Of = e;
}
let Pf;
function qy(e) {
  Pf = e;
}
let Df = null;
const Gy = /* @__NO_SIDE_EFFECTS__ */ (e) => {
  Df = e;
}, Xy = /* @__NO_SIDE_EFFECTS__ */ () => Df;
let Af = null;
const Mc = (e) => {
  Af = e;
}, Ky = () => Af;
let xc = 0;
function Jy(e = {}) {
  const t = Me(e.onWarn) ? e.onWarn : Kt, n = ce(e.version) ? e.version : Yy, r = ce(e.locale) || Me(e.locale) ? e.locale : Ua, o = Me(r) ? Ua : r, a = Ge(e.fallbackLocale) || Ce(e.fallbackLocale) || ce(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : o, i = Ce(e.messages) ? e.messages : { [o]: {} }, l = Ce(e.datetimeFormats) ? e.datetimeFormats : { [o]: {} }, s = Ce(e.numberFormats) ? e.numberFormats : { [o]: {} }, c = ct({}, e.modifiers || {}, jy()), u = e.pluralRules || {}, f = Me(e.missing) ? e.missing : null, d = xe(e.missingWarn) || Ba(e.missingWarn) ? e.missingWarn : !0, v = xe(e.fallbackWarn) || Ba(e.fallbackWarn) ? e.fallbackWarn : !0, p = !!e.fallbackFormat, g = !!e.unresolving, h = Me(e.postTranslation) ? e.postTranslation : null, m = Ce(e.processor) ? e.processor : null, y = xe(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, b = !!e.escapeParameter, O = Me(e.messageCompiler) ? e.messageCompiler : If;
  process.env.NODE_ENV !== "production" && Me(e.messageCompiler) && Ef(mr(pt.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER));
  const N = Me(e.messageResolver) ? e.messageResolver : Of || Ty, S = Me(e.localeFallbacker) ? e.localeFallbacker : Pf || Uy, E = Te(e.fallbackContext) ? e.fallbackContext : void 0, C = e, I = Te(C.__datetimeFormatters) ? C.__datetimeFormatters : /* @__PURE__ */ new Map(), _ = Te(C.__numberFormatters) ? C.__numberFormatters : /* @__PURE__ */ new Map(), k = Te(C.__meta) ? C.__meta : {};
  xc++;
  const A = {
    version: n,
    cid: xc,
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
    postTranslation: h,
    processor: m,
    warnHtmlMessage: y,
    escapeParameter: b,
    messageCompiler: O,
    messageResolver: N,
    localeFallbacker: S,
    fallbackContext: E,
    onWarn: t,
    __meta: k
  };
  return A.datetimeFormats = l, A.numberFormats = s, A.__datetimeFormatters = I, A.__numberFormatters = _, process.env.NODE_ENV !== "production" && (A.__v_emitter = C.__v_emitter != null ? C.__v_emitter : void 0), (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) && Ry(A, n, k), A;
}
function pi(e, t) {
  return e instanceof RegExp ? e.test(t) : e;
}
function $f(e, t) {
  return e instanceof RegExp ? e.test(t) : e;
}
function gl(e, t, n, r, o) {
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
    return process.env.NODE_ENV !== "production" && $f(r, t) && i(mr(pt.NOT_FOUND_KEY, { key: t, locale: n })), t;
}
function lo(e, t, n) {
  const r = e;
  r.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function Ui(e) {
  return (n) => Zy(n, e);
}
function Zy(e, t) {
  const n = t.b || t.body;
  if ((n.t || n.type) === 1) {
    const r = n, o = r.c || r.cases;
    return e.plural(o.reduce((a, i) => [
      ...a,
      Bc(e, i)
    ], []));
  } else
    return Bc(e, n);
}
function Bc(e, t) {
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
const Qy = "Detected HTML in '{source}' message. Recommend not using HTML messages to avoid XSS.";
function e_(e, t) {
  t && qg(e) && Kt(fl(Qy, { source: e }));
}
const t_ = (e) => e;
let pa = /* @__PURE__ */ Object.create(null);
const Nn = (e) => Te(e) && (e.t === 0 || e.type === 0) && ("b" in e || "body" in e);
function n_(e, t = {}) {
  let n = !1;
  const r = t.onError || Wg;
  return t.onError = (o) => {
    n = !0, r(o);
  }, { ...vy(e, t), detectError: n };
}
function r_(e, t) {
  if (ce(e)) {
    const n = xe(t.warnHtmlMessage) ? t.warnHtmlMessage : !0;
    process.env.NODE_ENV !== "production" && e_(e, n);
    const o = (t.onCacheKey || t_)(e), a = pa[o];
    if (a)
      return a;
    const { ast: i, detectError: l } = n_(e, {
      ...t,
      location: process.env.NODE_ENV !== "production",
      jit: !0
    }), s = Ui(i);
    return l ? s : pa[o] = s;
  } else {
    if (process.env.NODE_ENV !== "production" && !Nn(e))
      return Kt(`the message that is resolve with key '${t.key}' is not supported for jit compilation`), () => e;
    const n = e.cacheKey;
    if (n) {
      const r = pa[n];
      return r || (pa[n] = Ui(e));
    } else
      return Ui(e);
  }
}
const Vc = () => "", kt = (e) => Me(e);
function Uc(e, ...t) {
  const { fallbackFormat: n, postTranslation: r, unresolving: o, messageCompiler: a, fallbackLocale: i, messages: l } = e, [s, c] = Ss(...t), u = xe(c.missingWarn) ? c.missingWarn : e.missingWarn, f = xe(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn, d = xe(c.escapeParameter) ? c.escapeParameter : e.escapeParameter, v = !!c.resolvedMessage, p = ce(c.default) || xe(c.default) ? xe(c.default) ? a ? s : () => s : c.default : n ? a ? s : () => s : "", g = n || p !== "", h = vl(e, c);
  d && o_(c);
  let [m, y, b] = v ? [
    s,
    h,
    l[h] || {}
  ] : Nf(e, s, h, i, f, u), O = m, N = s;
  if (!v && !(ce(O) || Nn(O) || kt(O)) && g && (O = p, N = O), !v && (!(ce(O) || Nn(O) || kt(O)) || !ce(y)))
    return o ? fi : s;
  if (process.env.NODE_ENV !== "production" && ce(O) && e.messageCompiler == null)
    return Kt(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${s}'.`), s;
  let S = !1;
  const E = () => {
    S = !0;
  }, C = kt(O) ? O : Lf(e, s, y, O, N, E);
  if (S)
    return O;
  const I = l_(e, y, b, c), _ = Ny(I), k = a_(e, C, _), A = r ? r(k, s) : k;
  if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
    const x = {
      timestamp: Date.now(),
      key: ce(s) ? s : kt(O) ? O.key : "",
      locale: y || (kt(O) ? O.locale : ""),
      format: ce(O) ? O : kt(O) ? O.source : "",
      message: A
    };
    x.meta = ct({}, e.__meta, /* @__PURE__ */ Xy() || {}), My(x);
  }
  return A;
}
function o_(e) {
  Ge(e.list) ? e.list = e.list.map((t) => ce(t) ? Tc(t) : t) : Te(e.named) && Object.keys(e.named).forEach((t) => {
    ce(e.named[t]) && (e.named[t] = Tc(e.named[t]));
  });
}
function Nf(e, t, n, r, o, a) {
  const { messages: i, onWarn: l, messageResolver: s, localeFallbacker: c } = e, u = c(e, r, n);
  let f = {}, d, v = null, p = n, g = null;
  const h = "translate";
  for (let m = 0; m < u.length; m++) {
    if (d = g = u[m], process.env.NODE_ENV !== "production" && n !== d && pi(o, t) && l(mr(pt.FALLBACK_TO_TRANSLATE, {
      key: t,
      target: d
    })), process.env.NODE_ENV !== "production" && n !== d) {
      const S = e.__v_emitter;
      S && S.emit("fallback", {
        type: h,
        key: t,
        from: p,
        to: g,
        groupId: `${h}:${t}`
      });
    }
    f = i[d] || {};
    let y = null, b, O;
    if (process.env.NODE_ENV !== "production" && xt && (y = window.performance.now(), b = "intlify-message-resolve-start", O = "intlify-message-resolve-end", wt && wt(b)), (v = s(f, t)) === null && (v = f[t]), process.env.NODE_ENV !== "production" && xt) {
      const S = window.performance.now(), E = e.__v_emitter;
      E && y && v && E.emit("message-resolve", {
        type: "message-resolve",
        key: t,
        message: v,
        time: S - y,
        groupId: `${h}:${t}`
      }), b && O && wt && pr && (wt(O), pr("intlify message resolve", b, O));
    }
    if (ce(v) || Nn(v) || kt(v))
      break;
    const N = gl(
      e,
      // eslint-disable-line @typescript-eslint/no-explicit-any
      t,
      d,
      a,
      h
    );
    N !== t && (v = N), p = g;
  }
  return [v, d, f];
}
function Lf(e, t, n, r, o, a) {
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
  const f = i(r, i_(e, n, o, r, l, a));
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
function a_(e, t, n) {
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
  if (!ce(t) && !tt(t) && !kt(t) && !Nn(t))
    throw sn(ot.INVALID_ARGUMENT);
  const a = tt(t) ? String(t) : (kt(t), t);
  return tt(n) ? o.plural = n : ce(n) ? o.default = n : Ce(n) && !di(n) ? o.named = n : Ge(n) && (o.list = n), tt(r) ? o.plural = r : ce(r) ? o.default = r : Ce(r) && ct(o, r), [a, o];
}
function i_(e, t, n, r, o, a) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: o,
    onError: (i) => {
      if (a && a(i), process.env.NODE_ENV !== "production") {
        const l = s_(r), s = `Message compilation error: ${i.message}`, c = i.location && l && Vg(l, i.location.start.offset, i.location.end.offset), u = e.__v_emitter;
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
    onCacheKey: (i) => $g(t, n, i)
  };
}
function s_(e) {
  if (ce(e))
    return e;
  if (e.loc && e.loc.source)
    return e.loc.source;
}
function l_(e, t, n, r) {
  const { modifiers: o, pluralRules: a, messageResolver: i, fallbackLocale: l, fallbackWarn: s, missingWarn: c, fallbackContext: u } = e, d = {
    locale: t,
    modifiers: o,
    pluralRules: a,
    messages: (v) => {
      let p = i(n, v);
      if (p == null && u) {
        const [, , g] = Nf(u, v, t, l, s, c);
        p = i(g, v);
      }
      if (ce(p) || Nn(p)) {
        let g = !1;
        const m = Lf(e, v, t, p, v, () => {
          g = !0;
        });
        return g ? Vc : m;
      } else
        return kt(p) ? p : Vc;
    }
  };
  return e.processor && (d.processor = e.processor), r.list && (d.list = r.list), r.named && (d.named = r.named), tt(r.plural) && (d.pluralIndex = r.plural), d;
}
const Fc = typeof Intl < "u", Rf = {
  dateTimeFormat: Fc && typeof Intl.DateTimeFormat < "u",
  numberFormat: Fc && typeof Intl.NumberFormat < "u"
};
function Hc(e, ...t) {
  const { datetimeFormats: n, unresolving: r, fallbackLocale: o, onWarn: a, localeFallbacker: i } = e, { __datetimeFormatters: l } = e;
  if (process.env.NODE_ENV !== "production" && !Rf.dateTimeFormat)
    return a(mr(pt.CANNOT_FORMAT_DATE)), Fa;
  const [s, c, u, f] = ks(...t), d = xe(u.missingWarn) ? u.missingWarn : e.missingWarn, v = xe(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, p = !!u.part, g = vl(e, u), h = i(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    o,
    g
  );
  if (!ce(s) || s === "")
    return new Intl.DateTimeFormat(g, f).format(c);
  let m = {}, y, b = null, O = g, N = null;
  const S = "datetime format";
  for (let I = 0; I < h.length; I++) {
    if (y = N = h[I], process.env.NODE_ENV !== "production" && g !== y && pi(v, s) && a(mr(pt.FALLBACK_TO_DATE_FORMAT, {
      key: s,
      target: y
    })), process.env.NODE_ENV !== "production" && g !== y) {
      const _ = e.__v_emitter;
      _ && _.emit("fallback", {
        type: S,
        key: s,
        from: O,
        to: N,
        groupId: `${S}:${s}`
      });
    }
    if (m = n[y] || {}, b = m[s], Ce(b))
      break;
    gl(e, s, y, d, S), O = N;
  }
  if (!Ce(b) || !ce(y))
    return r ? fi : s;
  let E = `${y}__${s}`;
  di(f) || (E = `${E}__${JSON.stringify(f)}`);
  let C = l.get(E);
  return C || (C = new Intl.DateTimeFormat(y, ct({}, b, f)), l.set(E, C)), p ? C.formatToParts(c) : C.format(c);
}
const Mf = [
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
      throw sn(ot.INVALID_ISO_DATE_ARGUMENT);
    const c = s[3] ? s[3].trim().startsWith("T") ? `${s[1].trim()}${s[3].trim()}` : `${s[1].trim()}T${s[3].trim()}` : s[1].trim();
    l = new Date(c);
    try {
      l.toISOString();
    } catch {
      throw sn(ot.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (Lg(t)) {
    if (isNaN(t.getTime()))
      throw sn(ot.INVALID_DATE_ARGUMENT);
    l = t;
  } else if (tt(t))
    l = t;
  else
    throw sn(ot.INVALID_ARGUMENT);
  return ce(n) ? a.key = n : Ce(n) && Object.keys(n).forEach((s) => {
    Mf.includes(s) ? i[s] = n[s] : a[s] = n[s];
  }), ce(r) ? a.locale = r : Ce(r) && (i = r), Ce(o) && (i = o), [a.key || "", l, a, i];
}
function Yc(e, t, n) {
  const r = e;
  for (const o in n) {
    const a = `${t}__${o}`;
    r.__datetimeFormatters.has(a) && r.__datetimeFormatters.delete(a);
  }
}
function jc(e, ...t) {
  const { numberFormats: n, unresolving: r, fallbackLocale: o, onWarn: a, localeFallbacker: i } = e, { __numberFormatters: l } = e;
  if (process.env.NODE_ENV !== "production" && !Rf.numberFormat)
    return a(mr(pt.CANNOT_FORMAT_NUMBER)), Fa;
  const [s, c, u, f] = Is(...t), d = xe(u.missingWarn) ? u.missingWarn : e.missingWarn, v = xe(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, p = !!u.part, g = vl(e, u), h = i(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    o,
    g
  );
  if (!ce(s) || s === "")
    return new Intl.NumberFormat(g, f).format(c);
  let m = {}, y, b = null, O = g, N = null;
  const S = "number format";
  for (let I = 0; I < h.length; I++) {
    if (y = N = h[I], process.env.NODE_ENV !== "production" && g !== y && pi(v, s) && a(mr(pt.FALLBACK_TO_NUMBER_FORMAT, {
      key: s,
      target: y
    })), process.env.NODE_ENV !== "production" && g !== y) {
      const _ = e.__v_emitter;
      _ && _.emit("fallback", {
        type: S,
        key: s,
        from: O,
        to: N,
        groupId: `${S}:${s}`
      });
    }
    if (m = n[y] || {}, b = m[s], Ce(b))
      break;
    gl(e, s, y, d, S), O = N;
  }
  if (!Ce(b) || !ce(y))
    return r ? fi : s;
  let E = `${y}__${s}`;
  di(f) || (E = `${E}__${JSON.stringify(f)}`);
  let C = l.get(E);
  return C || (C = new Intl.NumberFormat(y, ct({}, b, f)), l.set(E, C)), p ? C.formatToParts(c) : C.format(c);
}
const xf = [
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
  if (!tt(t))
    throw sn(ot.INVALID_ARGUMENT);
  const l = t;
  return ce(n) ? a.key = n : Ce(n) && Object.keys(n).forEach((s) => {
    xf.includes(s) ? i[s] = n[s] : a[s] = n[s];
  }), ce(r) ? a.locale = r : Ce(r) && (i = r), Ce(o) && (i = o), [a.key || "", l, a, i];
}
function Wc(e, t, n) {
  const r = e;
  for (const o in n) {
    const a = `${t}__${o}`;
    r.__numberFormatters.has(a) && r.__numberFormatters.delete(a);
  }
}
gy();
/*!
  * vue-i18n v9.10.2
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
const c_ = "9.10.2";
function u_() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (pl().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const Bf = pt.__EXTEND_POINT__, en = ml(Bf), it = {
  FALLBACK_TO_ROOT: Bf,
  // 9
  NOT_SUPPORTED_PRESERVE: en(),
  // 10
  NOT_SUPPORTED_FORMATTER: en(),
  // 11
  NOT_SUPPORTED_PRESERVE_DIRECTIVE: en(),
  // 12
  NOT_SUPPORTED_GET_CHOICE_INDEX: en(),
  // 13
  COMPONENT_NAME_LEGACY_COMPATIBLE: en(),
  // 14
  NOT_FOUND_PARENT_SCOPE: en(),
  // 15
  IGNORE_OBJ_FLATTEN: en(),
  // 16
  NOTICE_DROP_ALLOW_COMPOSITION: en(),
  // 17
  NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG: en()
  // 18
}, d_ = {
  [it.FALLBACK_TO_ROOT]: "Fall back to {type} '{key}' with root locale.",
  [it.NOT_SUPPORTED_PRESERVE]: "Not supported 'preserve'.",
  [it.NOT_SUPPORTED_FORMATTER]: "Not supported 'formatter'.",
  [it.NOT_SUPPORTED_PRESERVE_DIRECTIVE]: "Not supported 'preserveDirectiveContent'.",
  [it.NOT_SUPPORTED_GET_CHOICE_INDEX]: "Not supported 'getChoiceIndex'.",
  [it.COMPONENT_NAME_LEGACY_COMPATIBLE]: "Component name legacy compatible: '{name}' -> 'i18n'",
  [it.NOT_FOUND_PARENT_SCOPE]: "Not found parent scope. use the global scope.",
  [it.IGNORE_OBJ_FLATTEN]: "Ignore object flatten: '{key}' key has an string value",
  [it.NOTICE_DROP_ALLOW_COMPOSITION]: "'allowComposition' option will be dropped in the next major version. For more information, please see 👉 https://tinyurl.com/2p97mcze",
  [it.NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG]: "'translateExistCompatible' option will be dropped in the next major version."
};
function Hr(e, ...t) {
  return fl(d_[e], ...t);
}
const Vf = ot.__EXTEND_POINT__, ht = ml(Vf), Ae = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: Vf,
  // 26
  // legacy module errors
  INVALID_ARGUMENT: ht(),
  // 27
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: ht(),
  // 28
  NOT_INSTALLED: ht(),
  // 29
  NOT_AVAILABLE_IN_LEGACY_MODE: ht(),
  // 30
  // directive module errors
  REQUIRED_VALUE: ht(),
  // 31
  INVALID_VALUE: ht(),
  // 32
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: ht(),
  // 33
  NOT_INSTALLED_WITH_PROVIDE: ht(),
  // 34
  // unexpected error
  UNEXPECTED_ERROR: ht(),
  // 35
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: ht(),
  // 36
  // bridge support vue 2.x only
  BRIDGE_SUPPORT_VUE_2_ONLY: ht(),
  // 37
  // need to define `i18n` option in `allowComposition: true` and `useScope: 'local' at `useI18n``
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: ht(),
  // 38
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: ht(),
  // 39
  // for enhancement
  __EXTEND_POINT__: ht()
  // 40
};
function At(e, ...t) {
  return Qr(e, null, process.env.NODE_ENV !== "production" ? { messages: f_, args: t } : void 0);
}
const f_ = {
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
}, Os = /* @__PURE__ */ Xt("__translateVNode"), Ps = /* @__PURE__ */ Xt("__datetimeParts"), Ds = /* @__PURE__ */ Xt("__numberParts"), Po = /* @__PURE__ */ Xt("__enableEmitter"), As = /* @__PURE__ */ Xt("__disableEmitter"), p_ = Xt("__setPluralRules"), m_ = /* @__PURE__ */ Xt("__injectWithOption"), $s = /* @__PURE__ */ Xt("__dispose");
function Do(e) {
  if (!Te(e))
    return e;
  for (const t in e)
    if (Va(e, t))
      if (!t.includes("."))
        Te(e[t]) && Do(e[t]);
      else {
        const n = t.split("."), r = n.length - 1;
        let o = e, a = !1;
        for (let i = 0; i < r; i++) {
          if (n[i] in o || (o[n[i]] = {}), !Te(o[n[i]])) {
            process.env.NODE_ENV !== "production" && Kt(Hr(it.IGNORE_OBJ_FLATTEN, {
              key: n[i]
            })), a = !0;
            break;
          }
          o = o[n[i]];
        }
        a || (o[n[r]] = e[t], delete e[t]), Te(o[n[r]]) && Do(o[n[r]]);
      }
  return e;
}
function Uf(e, t) {
  const { messages: n, __i18n: r, messageResolver: o, flatJson: a } = t, i = Ce(n) ? n : Ge(r) ? {} : { [e]: {} };
  if (Ge(r) && r.forEach((l) => {
    if ("locale" in l && "resource" in l) {
      const { locale: s, resource: c } = l;
      s ? (i[s] = i[s] || {}, Ia(c, i[s])) : Ia(c, i);
    } else
      ce(l) && Ia(JSON.parse(l), i);
  }), o == null && a)
    for (const l in i)
      Va(i, l) && Do(i[l]);
  return i;
}
function Ff(e) {
  return e.type;
}
function h_(e, t, n) {
  let r = Te(t.messages) ? t.messages : {};
  "__i18nGlobal" in n && (r = Uf(e.locale.value, {
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
  return G(Dv, null, e, 0);
}
const qc = "__INTLIFY_META__", Gc = () => [], v_ = () => !1;
let Xc = 0;
function Kc(e) {
  return (t, n, r, o) => e(n, r, Hn() || void 0, o);
}
const g_ = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = Hn();
  let t = null;
  return e && (t = Ff(e)[qc]) ? { [qc]: t } : null;
};
function Hf(e = {}, t) {
  const { __root: n, __injectWithOption: r } = e, o = n === void 0, a = e.flatJson, i = xt ? Q : ll, l = !!e.translateExistCompatible;
  process.env.NODE_ENV !== "production" && l && Ef(Hr(it.NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG));
  let s = xe(e.inheritLocale) ? e.inheritLocale : !0;
  const c = i(
    // prettier-ignore
    n && s ? n.locale.value : ce(e.locale) ? e.locale : Ua
  ), u = i(
    // prettier-ignore
    n && s ? n.fallbackLocale.value : ce(e.fallbackLocale) || Ge(e.fallbackLocale) || Ce(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : c.value
  ), f = i(Uf(c.value, e)), d = i(Ce(e.datetimeFormats) ? e.datetimeFormats : { [c.value]: {} }), v = i(Ce(e.numberFormats) ? e.numberFormats : { [c.value]: {} });
  let p = n ? n.missingWarn : xe(e.missingWarn) || Ba(e.missingWarn) ? e.missingWarn : !0, g = n ? n.fallbackWarn : xe(e.fallbackWarn) || Ba(e.fallbackWarn) ? e.fallbackWarn : !0, h = n ? n.fallbackRoot : xe(e.fallbackRoot) ? e.fallbackRoot : !0, m = !!e.fallbackFormat, y = Me(e.missing) ? e.missing : null, b = Me(e.missing) ? Kc(e.missing) : null, O = Me(e.postTranslation) ? e.postTranslation : null, N = n ? n.warnHtmlMessage : xe(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, S = !!e.escapeParameter;
  const E = n ? n.modifiers : Ce(e.modifiers) ? e.modifiers : {};
  let C = e.pluralRules || n && n.pluralRules, I;
  I = (() => {
    o && Mc(null);
    const J = {
      version: c_,
      locale: c.value,
      fallbackLocale: u.value,
      messages: f.value,
      modifiers: E,
      pluralRules: C,
      missing: b === null ? void 0 : b,
      missingWarn: p,
      fallbackWarn: g,
      fallbackFormat: m,
      unresolving: !0,
      postTranslation: O === null ? void 0 : O,
      warnHtmlMessage: N,
      escapeParameter: S,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    J.datetimeFormats = d.value, J.numberFormats = v.value, J.__datetimeFormatters = Ce(I) ? I.__datetimeFormatters : void 0, J.__numberFormatters = Ce(I) ? I.__numberFormatters : void 0, process.env.NODE_ENV !== "production" && (J.__v_emitter = Ce(I) ? I.__v_emitter : void 0);
    const re = Jy(J);
    return o && Mc(re), re;
  })(), lo(I, c.value, u.value);
  function k() {
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
    set: (J) => {
      c.value = J, I.locale = c.value;
    }
  }), x = te({
    get: () => u.value,
    set: (J) => {
      u.value = J, I.fallbackLocale = u.value, lo(I, c.value, J);
    }
  }), M = te(() => f.value), $ = /* @__PURE__ */ te(() => d.value), L = /* @__PURE__ */ te(() => v.value);
  function F() {
    return Me(O) ? O : null;
  }
  function V(J) {
    O = J, I.postTranslation = J;
  }
  function q() {
    return y;
  }
  function B(J) {
    J !== null && (b = Kc(J)), y = J, I.missing = b;
  }
  function Z(J, re) {
    return J !== "translate" || !re.resolvedMessage;
  }
  const ae = (J, re, ke, Ye, bn, ua) => {
    k();
    let wr;
    try {
      process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, o || (I.fallbackContext = n ? Ky() : void 0), wr = J(I);
    } finally {
      process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, o || (I.fallbackContext = void 0);
    }
    if (ke !== "translate exists" && // for not `te` (e.g `t`)
    tt(wr) && wr === fi || ke === "translate exists" && !wr) {
      const [Zn, Tv] = re();
      if (process.env.NODE_ENV !== "production" && n && ce(Zn) && Z(ke, Tv) && (h && (pi(g, Zn) || $f(p, Zn)) && Kt(Hr(it.FALLBACK_TO_ROOT, {
        key: Zn,
        type: ke
      })), process.env.NODE_ENV !== "production")) {
        const { __v_emitter: vc } = I;
        vc && h && vc.emit("fallback", {
          type: ke,
          key: Zn,
          to: "global",
          groupId: `${ke}:${Zn}`
        });
      }
      return n && h ? Ye(n) : bn(Zn);
    } else {
      if (ua(wr))
        return wr;
      throw At(Ae.UNEXPECTED_RETURN_TYPE);
    }
  };
  function de(...J) {
    return ae((re) => Reflect.apply(Uc, null, [re, ...J]), () => Ss(...J), "translate", (re) => Reflect.apply(re.t, re, [...J]), (re) => re, (re) => ce(re));
  }
  function he(...J) {
    const [re, ke, Ye] = J;
    if (Ye && !Te(Ye))
      throw At(Ae.INVALID_ARGUMENT);
    return de(re, ke, ct({ resolvedMessage: !0 }, Ye || {}));
  }
  function Se(...J) {
    return ae((re) => Reflect.apply(Hc, null, [re, ...J]), () => ks(...J), "datetime format", (re) => Reflect.apply(re.d, re, [...J]), () => Fa, (re) => ce(re));
  }
  function ne(...J) {
    return ae((re) => Reflect.apply(jc, null, [re, ...J]), () => Is(...J), "number format", (re) => Reflect.apply(re.n, re, [...J]), () => Fa, (re) => ce(re));
  }
  function j(J) {
    return J.map((re) => ce(re) || tt(re) || xe(re) ? zc(String(re)) : re);
  }
  const w = {
    normalize: j,
    interpolate: (J) => J,
    type: "vnode"
  };
  function P(...J) {
    return ae(
      (re) => {
        let ke;
        const Ye = re;
        try {
          Ye.processor = w, ke = Reflect.apply(Uc, null, [Ye, ...J]);
        } finally {
          Ye.processor = null;
        }
        return ke;
      },
      () => Ss(...J),
      "translate",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (re) => re[Os](...J),
      (re) => [zc(re)],
      (re) => Ge(re)
    );
  }
  function R(...J) {
    return ae(
      (re) => Reflect.apply(jc, null, [re, ...J]),
      () => Is(...J),
      "number format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (re) => re[Ds](...J),
      Gc,
      (re) => ce(re) || Ge(re)
    );
  }
  function K(...J) {
    return ae(
      (re) => Reflect.apply(Hc, null, [re, ...J]),
      () => ks(...J),
      "datetime format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (re) => re[Ps](...J),
      Gc,
      (re) => ce(re) || Ge(re)
    );
  }
  function T(J) {
    C = J, I.pluralRules = C;
  }
  function D(J, re) {
    return ae(() => {
      if (!J)
        return !1;
      const ke = ce(re) ? re : c.value, Ye = ie(ke), bn = I.messageResolver(Ye, J);
      return l ? bn != null : Nn(bn) || kt(bn) || ce(bn);
    }, () => [J], "translate exists", (ke) => Reflect.apply(ke.te, ke, [J, re]), v_, (ke) => xe(ke));
  }
  function H(J) {
    let re = null;
    const ke = kf(I, u.value, c.value);
    for (let Ye = 0; Ye < ke.length; Ye++) {
      const bn = f.value[ke[Ye]] || {}, ua = I.messageResolver(bn, J);
      if (ua != null) {
        re = ua;
        break;
      }
    }
    return re;
  }
  function ee(J) {
    const re = H(J);
    return re ?? (n ? n.tm(J) || {} : {});
  }
  function ie(J) {
    return f.value[J] || {};
  }
  function ve(J, re) {
    if (a) {
      const ke = { [J]: re };
      for (const Ye in ke)
        Va(ke, Ye) && Do(ke[Ye]);
      re = ke[J];
    }
    f.value[J] = re, I.messages = f.value;
  }
  function Le(J, re) {
    f.value[J] = f.value[J] || {};
    const ke = { [J]: re };
    if (a)
      for (const Ye in ke)
        Va(ke, Ye) && Do(ke[Ye]);
    re = ke[J], Ia(re, f.value[J]), I.messages = f.value;
  }
  function Re(J) {
    return d.value[J] || {};
  }
  function je(J, re) {
    d.value[J] = re, I.datetimeFormats = d.value, Yc(I, J, re);
  }
  function Ue(J, re) {
    d.value[J] = ct(d.value[J] || {}, re), I.datetimeFormats = d.value, Yc(I, J, re);
  }
  function _n(J) {
    return v.value[J] || {};
  }
  function ca(J, re) {
    v.value[J] = re, I.numberFormats = v.value, Wc(I, J, re);
  }
  function Cv(J, re) {
    v.value[J] = ct(v.value[J] || {}, re), I.numberFormats = v.value, Wc(I, J, re);
  }
  Xc++, n && xt && (Ne(n.locale, (J) => {
    s && (c.value = J, I.locale = J, lo(I, c.value, u.value));
  }), Ne(n.fallbackLocale, (J) => {
    s && (u.value = J, I.fallbackLocale = J, lo(I, c.value, u.value));
  }));
  const We = {
    id: Xc,
    locale: A,
    fallbackLocale: x,
    get inheritLocale() {
      return s;
    },
    set inheritLocale(J) {
      s = J, J && n && (c.value = n.locale.value, u.value = n.fallbackLocale.value, lo(I, c.value, u.value));
    },
    get availableLocales() {
      return Object.keys(f.value).sort();
    },
    messages: M,
    get modifiers() {
      return E;
    },
    get pluralRules() {
      return C || {};
    },
    get isGlobal() {
      return o;
    },
    get missingWarn() {
      return p;
    },
    set missingWarn(J) {
      p = J, I.missingWarn = p;
    },
    get fallbackWarn() {
      return g;
    },
    set fallbackWarn(J) {
      g = J, I.fallbackWarn = g;
    },
    get fallbackRoot() {
      return h;
    },
    set fallbackRoot(J) {
      h = J;
    },
    get fallbackFormat() {
      return m;
    },
    set fallbackFormat(J) {
      m = J, I.fallbackFormat = m;
    },
    get warnHtmlMessage() {
      return N;
    },
    set warnHtmlMessage(J) {
      N = J, I.warnHtmlMessage = J;
    },
    get escapeParameter() {
      return S;
    },
    set escapeParameter(J) {
      S = J, I.escapeParameter = J;
    },
    t: de,
    getLocaleMessage: ie,
    setLocaleMessage: ve,
    mergeLocaleMessage: Le,
    getPostTranslationHandler: F,
    setPostTranslationHandler: V,
    getMissingHandler: q,
    setMissingHandler: B,
    [p_]: T
  };
  return We.datetimeFormats = $, We.numberFormats = L, We.rt = he, We.te = D, We.tm = ee, We.d = Se, We.n = ne, We.getDateTimeFormat = Re, We.setDateTimeFormat = je, We.mergeDateTimeFormat = Ue, We.getNumberFormat = _n, We.setNumberFormat = ca, We.mergeNumberFormat = Cv, We[m_] = r, We[Os] = P, We[Ps] = K, We[Ds] = R, process.env.NODE_ENV !== "production" && (We[Po] = (J) => {
    I.__v_emitter = J;
  }, We[As] = () => {
    I.__v_emitter = void 0;
  }), We;
}
const yl = {
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
function y_({ slots: e }, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((r, o) => [
    ...r,
    // prettier-ignore
    ...o.type === Oe ? o.children : [o]
  ], []) : t.reduce((n, r) => {
    const o = e[r];
    return o && (n[r] = o()), n;
  }, {});
}
function Yf(e) {
  return Oe;
}
const __ = /* @__PURE__ */ me({
  /* eslint-disable */
  name: "i18n-t",
  props: ct({
    keypath: {
      type: String,
      required: !0
    },
    plural: {
      type: [Number, String],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator: (e) => tt(e) || !isNaN(e)
    }
  }, yl),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const { slots: n, attrs: r } = t, o = e.i18n || Pe({
      useScope: e.scope,
      __useComponent: !0
    });
    return () => {
      const a = Object.keys(n).filter((f) => f !== "_"), i = {};
      e.locale && (i.locale = e.locale), e.plural !== void 0 && (i.plural = ce(e.plural) ? +e.plural : e.plural);
      const l = y_(t, a), s = o[Os](e.keypath, l, i), c = ct({}, r), u = ce(e.tag) || Te(e.tag) ? e.tag : Yf();
      return dr(u, c, s);
    };
  }
}), Fi = __;
function b_(e) {
  return Ge(e) && !ce(e[0]);
}
function jf(e, t, n, r) {
  const { slots: o, attrs: a } = t;
  return () => {
    const i = { part: !0 };
    let l = {};
    e.locale && (i.locale = e.locale), ce(e.format) ? i.key = e.format : Te(e.format) && (ce(e.format.key) && (i.key = e.format.key), l = Object.keys(e.format).reduce((d, v) => n.includes(v) ? ct({}, d, { [v]: e.format[v] }) : d, {}));
    const s = r(e.value, i, l);
    let c = [i.key];
    Ge(s) ? c = s.map((d, v) => {
      const p = o[d.type], g = p ? p({ [d.type]: d.value, index: v, parts: s }) : [d.value];
      return b_(g) && (g[0].key = `${d.type}-${v}`), g;
    }) : ce(s) && (c = [s]);
    const u = ct({}, a), f = ce(e.tag) || Te(e.tag) ? e.tag : Yf();
    return dr(f, u, c);
  };
}
const E_ = /* @__PURE__ */ me({
  /* eslint-disable */
  name: "i18n-n",
  props: ct({
    value: {
      type: Number,
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, yl),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || Pe({
      useScope: "parent",
      __useComponent: !0
    });
    return jf(e, t, xf, (...r) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[Ds](...r)
    ));
  }
}), Jc = E_, w_ = /* @__PURE__ */ me({
  /* eslint-disable */
  name: "i18n-d",
  props: ct({
    value: {
      type: [Number, Date],
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, yl),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || Pe({
      useScope: "parent",
      __useComponent: !0
    });
    return jf(e, t, Mf, (...r) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[Ps](...r)
    ));
  }
}), Zc = w_;
function C_(e, t) {
  const n = e;
  if (e.mode === "composition")
    return n.__getInstance(t) || e.global;
  {
    const r = n.__getInstance(t);
    return r != null ? r.__composer : e.global.__composer;
  }
}
function T_(e) {
  const t = (i) => {
    const { instance: l, modifiers: s, value: c } = i;
    if (!l || !l.$)
      throw At(Ae.UNEXPECTED_ERROR);
    const u = C_(e, l.$);
    process.env.NODE_ENV !== "production" && s.preserve && Kt(Hr(it.NOT_SUPPORTED_PRESERVE));
    const f = Qc(c);
    return [
      Reflect.apply(u.t, u, [...eu(f)]),
      u
    ];
  };
  return {
    created: (i, l) => {
      const [s, c] = t(l);
      xt && e.global === c && (i.__i18nWatcher = Ne(c.locale, () => {
        l.instance && l.instance.$forceUpdate();
      })), i.__composer = c, i.textContent = s;
    },
    unmounted: (i) => {
      xt && i.__i18nWatcher && (i.__i18nWatcher(), i.__i18nWatcher = void 0, delete i.__i18nWatcher), i.__composer && (i.__composer = void 0, delete i.__composer);
    },
    beforeUpdate: (i, { value: l }) => {
      if (i.__composer) {
        const s = i.__composer, c = Qc(l);
        i.textContent = Reflect.apply(s.t, s, [
          ...eu(c)
        ]);
      }
    },
    getSSRProps: (i) => {
      const [l] = t(i);
      return { textContent: l };
    }
  };
}
function Qc(e) {
  if (ce(e))
    return { path: e };
  if (Ce(e)) {
    if (!("path" in e))
      throw At(Ae.REQUIRED_VALUE, "path");
    return e;
  } else
    throw At(Ae.INVALID_VALUE);
}
function eu(e) {
  const { path: t, locale: n, args: r, choice: o, plural: a } = e, i = {}, l = r || {};
  return ce(n) && (i.locale = n), tt(o) && (i.plural = o), tt(a) && (i.plural = a), [t, l, i];
}
function S_(e, t, ...n) {
  const r = Ce(n[0]) ? n[0] : {}, o = !!r.useI18nComponentName, a = xe(r.globalInstall) ? r.globalInstall : !0;
  process.env.NODE_ENV !== "production" && a && o && Kt(Hr(it.COMPONENT_NAME_LEGACY_COMPATIBLE, {
    name: Fi.name
  })), a && ([o ? "i18n" : Fi.name, "I18nT"].forEach((i) => e.component(i, Fi)), [Jc.name, "I18nN"].forEach((i) => e.component(i, Jc)), [Zc.name, "I18nD"].forEach((i) => e.component(i, Zc))), e.directive("t", T_(t));
}
const Hi = {
  "vue-devtools-plugin-vue-i18n": "Vue I18n devtools",
  "vue-i18n-resource-inspector": "I18n Resources",
  "vue-i18n-timeline": "Vue I18n"
}, k_ = {
  "vue-i18n-resource-inspector": "Search for scopes ..."
}, I_ = {
  "vue-i18n-timeline": 16764185
}, Wf = "vue-i18n: composer properties";
let Ns;
async function O_(e, t) {
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
        componentStateTypes: [Wf],
        app: e
        // eslint-disable-line @typescript-eslint/no-explicit-any
      }, (o) => {
        Ns = o, o.on.visitComponentTree(({ componentInstance: i, treeNode: l }) => {
          P_(i, l, t);
        }), o.on.inspectComponent(({ componentInstance: i, instanceData: l }) => {
          i.vnode.el && i.vnode.el.__VUE_I18N__ && l && (t.mode === "legacy" ? i.vnode.el.__VUE_I18N__ !== t.global.__composer && tu(l, i.vnode.el.__VUE_I18N__) : tu(l, i.vnode.el.__VUE_I18N__));
        }), o.addInspector({
          id: "vue-i18n-resource-inspector",
          label: Hi[
            "vue-i18n-resource-inspector"
            /* VueDevToolsIDs.CUSTOM_INSPECTOR */
          ],
          icon: "language",
          treeFilterPlaceholder: k_[
            "vue-i18n-resource-inspector"
            /* VueDevToolsIDs.CUSTOM_INSPECTOR */
          ]
        }), o.on.getInspectorTree((i) => {
          i.app === e && i.inspectorId === "vue-i18n-resource-inspector" && L_(i, t);
        });
        const a = /* @__PURE__ */ new Map();
        o.on.getInspectorState(async (i) => {
          if (i.app === e && i.inspectorId === "vue-i18n-resource-inspector")
            if (o.unhighlightElement(), M_(i, t), i.nodeId === "global") {
              if (!a.has(i.app)) {
                const [l] = await o.getComponentInstances(i.app);
                a.set(i.app, l);
              }
              o.highlightElement(a.get(i.app));
            } else {
              const l = R_(i.nodeId, t);
              l && o.highlightElement(l);
            }
        }), o.on.editInspectorState((i) => {
          i.app === e && i.inspectorId === "vue-i18n-resource-inspector" && B_(i, t);
        }), o.addTimelineLayer({
          id: "vue-i18n-timeline",
          label: Hi[
            "vue-i18n-timeline"
            /* VueDevToolsIDs.TIMELINE */
          ],
          color: I_[
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
function P_(e, t, n) {
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
function tu(e, t) {
  const n = Wf;
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
    value: _l(t.messages.value)
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
function _l(e) {
  const t = {};
  return Object.keys(e).forEach((n) => {
    const r = e[n];
    Me(r) && "source" in r ? t[n] = N_(r) : Nn(r) && r.loc && r.loc.source ? t[n] = r.loc.source : Te(r) ? t[n] = _l(r) : t[n] = r;
  }), t;
}
const D_ = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "&": "&amp;"
};
function A_(e) {
  return e.replace(/[<>"&]/g, $_);
}
function $_(e) {
  return D_[e] || e;
}
function N_(e) {
  return {
    _custom: {
      type: "function",
      display: `<span>ƒ</span> ${e.source ? `("${A_(e.source)}")` : "(?)"}`
    }
  };
}
function L_(e, t) {
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
function R_(e, t) {
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
function qf(e, t) {
  if (e === "global")
    return t.mode === "composition" ? t.global : t.global.__composer;
  {
    const n = Array.from(t.__instances.values()).find((r) => r.id.toString() === e);
    return n ? t.mode === "composition" ? n : n.__composer : null;
  }
}
function M_(e, t) {
  const n = qf(e.nodeId, t);
  return n && (e.state = x_(n)), null;
}
function x_(e) {
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
      value: _l(e.messages.value)
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
function B_(e, t) {
  const n = qf(e.nodeId, t);
  if (n) {
    const [r] = e.path;
    r === "locale" && ce(e.state.value) ? n.locale.value = e.state.value : r === "fallbackLocale" && (ce(e.state.value) || Ge(e.state.value) || Te(e.state.value)) ? n.fallbackLocale.value = e.state.value : r === "inheritLocale" && xe(e.state.value) && (n.inheritLocale = e.state.value);
  }
}
const V_ = /* @__PURE__ */ Xt("global-vue-i18n");
function U_(e = {}, t) {
  const n = xe(e.globalInjection) ? e.globalInjection : !0, r = !0, o = /* @__PURE__ */ new Map(), [a, i] = F_(e), l = /* @__PURE__ */ Xt(process.env.NODE_ENV !== "production" ? "vue-i18n" : "");
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
          const h = v[0];
          f.__composerExtend = h.__composerExtend, f.__vueI18nExtend = h.__vueI18nExtend;
        }
        let p = null;
        n && (p = X_(d, f.global)), S_(d, f, ...v);
        const g = d.unmount;
        if (d.unmount = () => {
          p && p(), f.dispose(), g();
        }, process.env.NODE_ENV !== "production") {
          if (!await O_(d, f))
            throw At(Ae.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN);
          const m = wf();
          {
            const y = i;
            y[Po] && y[Po](m);
          }
          m.on("*", Ls);
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
function Pe(e = {}) {
  const t = Hn();
  if (t == null)
    throw At(Ae.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw At(Ae.NOT_INSTALLED);
  const n = H_(t), r = j_(n), o = Ff(t), a = Y_(e, o);
  if (a === "global")
    return h_(r, e, o), r;
  if (a === "parent") {
    let s = W_(n, t, e.__useComponent);
    return s == null && (process.env.NODE_ENV !== "production" && Kt(Hr(it.NOT_FOUND_PARENT_SCOPE)), s = r), s;
  }
  const i = n;
  let l = i.__getInstance(t);
  if (l == null) {
    const s = ct({}, e);
    "__i18n" in o && (s.__i18n = o.__i18n), r && (s.__root = r), l = Hf(s), i.__composerExtend && (l[$s] = i.__composerExtend(l)), q_(i, t, l), i.__setInstance(t, l);
  }
  return l;
}
function F_(e, t, n) {
  const r = sl();
  {
    const o = r.run(() => Hf(e));
    if (o == null)
      throw At(Ae.UNEXPECTED_ERROR);
    return [r, o];
  }
}
function H_(e) {
  {
    const t = _t(e.isCE ? V_ : e.appContext.app.__VUE_I18N_SYMBOL__);
    if (!t)
      throw At(e.isCE ? Ae.NOT_INSTALLED_WITH_PROVIDE : Ae.UNEXPECTED_ERROR);
    return t;
  }
}
function Y_(e, t) {
  return di(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function j_(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function W_(e, t, n = !1) {
  let r = null;
  const o = t.root;
  let a = z_(t, n);
  for (; a != null; ) {
    const i = e;
    if (e.mode === "composition" && (r = i.__getInstance(a)), r != null || o === a)
      break;
    a = a.parent;
  }
  return r;
}
function z_(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function q_(e, t, n) {
  let r = null;
  rt(() => {
    if (process.env.NODE_ENV !== "production" && t.vnode.el) {
      t.vnode.el.__VUE_I18N__ = n, r = wf();
      const o = n;
      o[Po] && o[Po](r), r.on("*", Ls);
    }
  }, t), Jd(() => {
    const o = n;
    process.env.NODE_ENV !== "production" && t.vnode.el && t.vnode.el.__VUE_I18N__ && (r && r.off("*", Ls), o[As] && o[As](), delete t.vnode.el.__VUE_I18N__), e.__deleteInstance(t);
    const a = o[$s];
    a && (a(), delete o[$s]);
  }, t);
}
const G_ = [
  "locale",
  "fallbackLocale",
  "availableLocales"
], nu = ["t", "rt", "d", "n", "tm", "te"];
function X_(e, t) {
  const n = /* @__PURE__ */ Object.create(null);
  return G_.forEach((o) => {
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
  }), e.config.globalProperties.$i18n = n, nu.forEach((o) => {
    const a = Object.getOwnPropertyDescriptor(t, o);
    if (!a || !a.value)
      throw At(Ae.UNEXPECTED_ERROR);
    Object.defineProperty(e.config.globalProperties, `$${o}`, a);
  }), () => {
    delete e.config.globalProperties.$i18n, nu.forEach((o) => {
      delete e.config.globalProperties[`$${o}`];
    });
  };
}
u_();
Wy(r_);
zy(Sy);
qy(kf);
if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
  const e = pl();
  e.__INTLIFY__ = !0, Ly(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
process.env.NODE_ENV;
const Gf = {
  afterMidnightsSlots: "After midnight:",
  date: "Date",
  pickATimeslot: "Pick a timeslot",
  selectDate: "Select date",
  selectTime: "Select time",
  selectTimeslot: "Select timeslot",
  time: "Time",
  today: "Today",
  tomorrow: "Tomorrow"
}, Xf = {
  adult: "Adult | { count } adults",
  child: "Child | { count } children",
  close: "Close",
  customizeYourExperience: "Customise your experience",
  family: "Family",
  guests: "Guests",
  mealsLeftWarning: "You have { count } meal left to chose | You have { count } meals left to chose",
  openTicket: "Open ticket",
  photo: "photos",
  student: "Student",
  tickets: "Tickets",
  whoIsGoing: "Who's going?"
}, Kf = {
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
}, Jf = {
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
}, Zf = {
  back: "Back to upgrades",
  upsellBookSubtitle: "Make more memories with an extra experience.",
  upsellBookTitle: "Book together to save money"
}, Qf = {
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
}, ep = {
  booking: "Booking your tickets...",
  nearly: "Nearly there!"
}, tp = {
  customerService: "Excellent customer service",
  easyBooking: "Easy and secure booking",
  ticketOnSmartphone: "Ticket is directly available on smartphone"
}, np = {
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
}, rp = {
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
}, op = {
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
}, K_ = {
  calendar: Gf,
  options: Xf,
  cart: Kf,
  checkout: Jf,
  upgrades: Zf,
  payment: Qf,
  paymentLoader: ep,
  achievements: tp,
  booking: np,
  toast: rp,
  THError: op
}, J_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  THError: op,
  achievements: tp,
  booking: np,
  calendar: Gf,
  cart: Kf,
  checkout: Jf,
  default: K_,
  options: Xf,
  payment: Qf,
  paymentLoader: ep,
  toast: rp,
  upgrades: Zf
}, Symbol.toStringTag, { value: "Module" })), ap = {
  afterMidnightsSlots: "Nach Mitternacht:",
  date: "Datum",
  pickATimeslot: "Zeitfenster auswählen",
  selectDate: "Wählen Sie einen Tag aus",
  selectTime: "Zeit auswählen",
  selectTimeslot: "Zeitfenster auswählen",
  time: "Uhrzeit",
  today: "Heute",
  tomorrow: "Morgen"
}, ip = {
  adult: "Erwachsene | { count } erwachsene",
  child: "Kind | { count } kinder",
  close: "Schließen",
  customizeYourExperience: "Personalisieren Sie Ihr Erlebnis",
  family: "Familie",
  guests: "Gäste",
  mealsLeftWarning: "Sie haben noch { count } Mahlzeit zur Auswahl | Sie haben noch { count } Mahlzeiten zur Auswahl",
  openTicket: "offenes Ticket",
  photo: "Fotos",
  student: "Student",
  tickets: "Tickets",
  whoIsGoing: "Wer kommt mit? "
}, sp = {
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
}, lp = {
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
}, cp = {
  back: "Zurück zu den Upgrades",
  upsellBookSubtitle: "Schaffen Sie mehr Erinnerungen mit einem zusätzlichen Erlebnis.",
  upsellBookTitle: "Kombinieren und Geld sparen"
}, up = {
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
}, dp = {
  booking: "Tickets werden gebucht...",
  nearly: "Beinahe fertig!"
}, fp = {
  customerService: "Ausgezeichneter Kundenservice",
  easyBooking: "Einfache und sichere Buchung",
  ticketOnSmartphone: "Ticket ist direkt erhältlich"
}, pp = {
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
}, hp = {
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
}, Z_ = {
  calendar: ap,
  options: ip,
  cart: sp,
  checkout: lp,
  upgrades: cp,
  payment: up,
  paymentLoader: dp,
  achievements: fp,
  booking: pp,
  toast: mp,
  THError: hp
}, Q_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  THError: hp,
  achievements: fp,
  booking: pp,
  calendar: ap,
  cart: sp,
  checkout: lp,
  default: Z_,
  options: ip,
  payment: up,
  paymentLoader: dp,
  toast: mp,
  upgrades: cp
}, Symbol.toStringTag, { value: "Module" })), vp = {
  afterMidnightsSlots: "Después de medianoche:",
  date: "Fecha",
  pickATimeslot: "Elige una hora",
  selectDate: "Elige un día",
  selectTime: "Elige una hora",
  selectTimeslot: "Elige una hora",
  time: "Hora",
  today: "Hoy",
  tomorrow: "Mañana"
}, gp = {
  adult: "Adulto | { count } adultos",
  child: "Niño | { count } niños",
  close: "Cerrado",
  customizeYourExperience: "Personalice su experiencia",
  family: "Family",
  guests: "Personas",
  mealsLeftWarning: "Falta { count } comida por elegir | Faltan { count } comidas por elegir",
  openTicket: "ticket abierto",
  photo: "fotos",
  student: "Student",
  tickets: "Tickets",
  whoIsGoing: "¿Quién viene?"
}, yp = {
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
}, _p = {
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
}, bp = {
  back: "Volver a las mejoras",
  upsellBookSubtitle: "Crea más recuerdos con una experiencia adicional.",
  upsellBookTitle: "Combina productos para ahorrar dinero"
}, Ep = {
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
}, wp = {
  booking: "Reservando tus entradas...",
  nearly: "¡Casi listo!"
}, Cp = {
  customerService: "Excelente servicio al cliente",
  easyBooking: "Reserva fácil y segura",
  ticketOnSmartphone: "El billete está disponible directamente"
}, Tp = {
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
}, Sp = {
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
}, kp = {
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
}, eb = {
  calendar: vp,
  options: gp,
  cart: yp,
  checkout: _p,
  upgrades: bp,
  payment: Ep,
  paymentLoader: wp,
  achievements: Cp,
  booking: Tp,
  toast: Sp,
  THError: kp
}, tb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  THError: kp,
  achievements: Cp,
  booking: Tp,
  calendar: vp,
  cart: yp,
  checkout: _p,
  default: eb,
  options: gp,
  payment: Ep,
  paymentLoader: wp,
  toast: Sp,
  upgrades: bp
}, Symbol.toStringTag, { value: "Module" })), Ip = {
  afterMidnightsSlots: "Na middernacht:",
  date: "Datum",
  pickATimeslot: "Kies een tijdslot",
  selectDate: "Kies een dag",
  selectTime: "Kies een tijd",
  selectTimeslot: "Kies een tijdslot",
  time: "Tijd",
  today: "Vandaag",
  tomorrow: "Morgen"
}, Op = {
  adult: "Volwassene | { count } volwassenen",
  child: "Kind | { count } kinderen",
  close: "Sluiten",
  customizeYourExperience: "Pas je ervaring aan",
  family: "Familie",
  guests: "Gasten",
  mealsLeftWarning: "Je hebt nog { count } maaltijd te kiezen | Je hebt nog { count } maaltijden te kiezen",
  openTicket: "Open ticket",
  photo: "foto's",
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
}, Dp = {
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
}, Ap = {
  back: "Terug naar upgrades",
  upsellBookSubtitle: "Maak meer herinneringen met een extra ervaring.",
  upsellBookTitle: "Boek samen en krijg korting"
}, $p = {
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
}, Np = {
  booking: "Tickets worden geboekt...",
  nearly: "Bijna klaar!"
}, Lp = {
  customerService: "Uitstekende klantenservice",
  easyBooking: "Gemakkelijk en veilig boeken",
  ticketOnSmartphone: "Ticket is direct beschikbaar"
}, Rp = {
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
}, Mp = {
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
}, xp = {
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
}, nb = {
  calendar: Ip,
  options: Op,
  cart: Pp,
  checkout: Dp,
  upgrades: Ap,
  payment: $p,
  paymentLoader: Np,
  achievements: Lp,
  booking: Rp,
  toast: Mp,
  THError: xp
}, rb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  THError: xp,
  achievements: Lp,
  booking: Rp,
  calendar: Ip,
  cart: Pp,
  checkout: Dp,
  default: nb,
  options: Op,
  payment: $p,
  paymentLoader: Np,
  toast: Mp,
  upgrades: Ap
}, Symbol.toStringTag, { value: "Module" })), Bp = {
  afterMidnightsSlots: "Après minuit:",
  date: "Date",
  pickATimeslot: "Sélectionnez un créneau horaire",
  selectDate: "Sélectionnez une date",
  selectTime: "Sélectionnez l'heure",
  selectTimeslot: "Sélectionnez un créneau horaire",
  time: "L'heure",
  today: "Aujourd'hui",
  tomorrow: "Demain"
}, Vp = {
  adult: "Adulte | { count } Adultes",
  child: "Enfant | { count } Enfants",
  close: "Fermer",
  customizeYourExperience: "Personnalise ton expérience",
  family: "Famille",
  guests: "Invités",
  mealsLeftWarning: "Tu as { count } repas à choisir",
  openTicket: "Billet ouvert",
  photo: "photos",
  student: "Étudiant",
  tickets: "Billets",
  whoIsGoing: "Qui y va ?"
}, Up = {
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
}, Fp = {
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
}, Hp = {
  back: "Retour aux upgrades",
  upsellBookSubtitle: "Créez plus de souvenirs avec une expérience supplémentaire",
  upsellBookTitle: "Combinez des produits et économisez de l'argent"
}, Yp = {
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
}, jp = {
  booking: "Réservez vos billets...",
  nearly: "Presque prêt !"
}, Wp = {
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
}, qp = {
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
}, Gp = {
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
}, ob = {
  calendar: Bp,
  options: Vp,
  cart: Up,
  checkout: Fp,
  upgrades: Hp,
  payment: Yp,
  paymentLoader: jp,
  achievements: Wp,
  booking: zp,
  toast: qp,
  THError: Gp
}, ab = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  THError: Gp,
  achievements: Wp,
  booking: zp,
  calendar: Bp,
  cart: Up,
  checkout: Fp,
  default: ob,
  options: Vp,
  payment: Yp,
  paymentLoader: jp,
  toast: qp,
  upgrades: Hp
}, Symbol.toStringTag, { value: "Module" })), ln = U_({
  legacy: !1,
  locale: "en",
  globalInjection: !0,
  fallbackLocale: "en",
  messages: {
    en: J_,
    de: Q_,
    es: tb,
    nl: rb,
    fr: ab
  }
}), { t: ib } = ln.global;
fe.extend(Dg);
fe.extend(Og);
class zo {
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
    return this.isOpen ? ib("options.openTicket") : fe(this.dateTime).format("HH:mm");
  }
  get date() {
    return fe(this.dateTime).toDate();
  }
  get humanizedDate() {
    return fe(this.dateTime).format("DD/MM/YYYY");
  }
  get isExpired() {
    const t = ut(), n = fe.tz(this.dateTime, "Europe/Amsterdam"), r = t.getServerTime;
    return typeof r > "u" ? !1 : this.isOpen ? fe(n).isBefore(r, "day") : n.isBefore(r);
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
var ru = /^GTM-[0-9A-Z]+$/;
function Yi(e) {
  if (typeof e != "string" || !ru.test(e)) {
    let t = String(e).toUpperCase().replace(/.*-|[^0-9A-Z]/g, ""), n = t.length === 0 ? "" : ` Did you mean 'GTM-${t}'?`;
    throw new Error(`'${e}' is not a valid GTM-ID (${ru}).${n}`);
  }
}
function mo(e, t = "dataLayer") {
  return e[t] || (e[t] = []), e[t];
}
function xr(e, t) {
  let n = document, r = n.createElement("script"), o = (c) => {
    var u;
    (u = t.onReady) == null || u.call(t, { id: e, script: r }), r.removeEventListener("load", o);
  };
  r.addEventListener("load", o);
  let a = t.dataLayerName ?? "dataLayer";
  if (mo(window, a).push({ event: "gtm.js", "gtm.start": (/* @__PURE__ */ new Date()).getTime() }), !e)
    return r;
  r.async = !t.defer, r.defer = !!(t.defer || t.compatibility), t.nonce && r.setAttribute("nonce", t.nonce), t.scriptType && (r.type = t.scriptType);
  let i = new URLSearchParams({ id: e, ...t.dataLayerName ? { l: t.dataLayerName } : {}, ...t.queryParams ?? {} }), l = t.source ?? "https://www.googletagmanager.com/gtm.js";
  r.src = `${l}?${i}`;
  let s = t.parentElement ?? n.body;
  if (typeof (s == null ? void 0 : s.appendChild) != "function")
    throw new Error("parentElement must be a DOM element");
  return s.appendChild(r), r;
}
function sb(e = "https://www.googletagmanager.com/gtm.js") {
  return Array.from(document.getElementsByTagName("script")).some((t) => t.src.includes(e));
}
var lb = class {
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
    if (this.options.enabled = e, this.isInBrowserContext() && e && !sb(t) && this.options.loadScript)
      if (Array.isArray(this.id))
        this.id.forEach((n) => {
          let r;
          typeof n == "string" ? r = xr(n, { ...this.options }) : r = xr(n.id, { ...this.options, queryParams: n.queryParams }), this.scriptElements.push(r);
        });
      else {
        let n = xr(this.id, { ...this.options });
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
    return this.isInBrowserContext() && this.options.enabled ? mo(window, this.options.dataLayerName) : !1;
  }
  trackView(e, t, n = {}) {
    let r = this.isInBrowserContext() && (this.options.enabled ?? !1);
    this.options.debug && console.log(`[GTM-Support${r ? "" : "(disabled)"}]: Dispatching TrackView`, { screenName: e, path: t }), r && mo(window, this.options.dataLayerName).push({ ...n, event: this.options.trackViewEventProperty ?? "content-view", "content-name": t, "content-view-name": e });
  }
  trackEvent({ event: e, category: t = null, action: n = null, label: r = null, value: o = null, noninteraction: a = !1, ...i } = {}) {
    let l = this.isInBrowserContext() && (this.options.enabled ?? !1);
    this.options.debug && console.log(`[GTM-Support${l ? "" : "(disabled)"}]: Dispatching event`, { event: e, category: t, action: n, label: r, value: o, ...i }), l && mo(window, this.options.dataLayerName).push({ event: e ?? "interaction", target: t, action: n, "target-properties": r, value: o, "interaction-type": a, ...i });
  }
  push(e) {
    let t = this.isInBrowserContext() && (this.options.enabled ?? !1);
    this.options.debug && console.log(`[GTM-Support${t ? "" : "(disabled)"}]: Dispatching event`, e), t && mo(window, this.options.dataLayerName).push(e);
  }
}, Je;
function cb(e, t = { id: "" }) {
  t = { trackOnNextTick: !1, ...t }, Je = new lb(t), e.config.globalProperties.$gtm = Je, Je.isInBrowserContext() && (t.vueRouter && ub(e, t.vueRouter, t.ignoredViews, t.trackOnNextTick, t.vueRouterAdditionalEventData), Je.options.enabled && Je.options.loadScript && (Array.isArray(t.id) ? t.id.forEach((n) => {
    if (typeof n == "string")
      xr(n, t);
    else {
      let r = { ...t };
      n.queryParams != null && (r.queryParams = { ...r.queryParams, ...n.queryParams }), xr(n.id, r);
    }
  }) : xr(t.id, t))), e.provide("gtm", t);
}
function ub(e, t, n = [], r, o = () => ({})) {
  function a(i, l) {
    return i instanceof Error ? !!(i.type & l) : !1;
  }
  t.afterEach(async (i, l, s) => {
    var d, v, p;
    if (typeof i.name != "string" || Array.isArray(n) && n.includes(i.name) || typeof n == "function" && n(i, l))
      return;
    let c = i.meta && typeof i.meta.gtm == "string" && i.meta.gtm ? i.meta.gtm : i.name;
    a(s, 4) ? Je != null && Je.debugEnabled() && console.log(`[VueGtm]: '${c}' not tracked due to navigation aborted`) : a(s, 8) && (Je != null && Je.debugEnabled()) && console.log(`[VueGtm]: '${c}' not tracked due to navigation cancelled`);
    let u = { ...await o(i, l), ...(d = i.meta) == null ? void 0 : d.gtmAdditionalEventData }, f = ((p = (v = t.options) == null ? void 0 : v.history) == null ? void 0 : p.base) ?? "";
    f.endsWith("/") || (f += "/"), f += i.fullPath.startsWith("/") ? i.fullPath.substring(1) : i.fullPath, r ? $n(() => {
      Je == null || Je.trackView(c, f, u);
    }) : Je == null || Je.trackView(c, f, u);
  });
}
function db(e) {
  return { install: (t) => cb(t, e) };
}
function ji() {
  return Je;
}
var Ha;
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
})(Ha || (Ha = {}));
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
          i = await Ha.getCurrencies();
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
), ou = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  useCurrencyStore: Ln
}, Symbol.toStringTag, { value: "Module" }));
var Yr;
((e) => {
  const t = (o) => {
    const a = Ln();
    return Number(+o * Number(a.currentCurrency.rate)).toFixed(2);
  }, n = async (o = "view_cart", a = {}, i) => {
    var v;
    const l = (await Promise.resolve().then(() => ou)).useCurrencyStore(), s = (await Promise.resolve().then(() => em)).useCartStore();
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
    const i = (await Promise.resolve().then(() => ou)).useCurrencyStore(), l = ji(), s = [];
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
})(Yr || (Yr = {}));
var au = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const fb = (e = "", t = !0, n = null, r = n, o = au.imageQuality, a = void 0, i = "center", l = "crop") => {
  let s;
  try {
    s = new URL(e);
  } catch {
    s = new URL(au.baseUrl), s.pathname = e || "/assets/promo-banner.webp";
  }
  const c = 2, u = [];
  if (s.searchParams.set("quality", o), s.searchParams.set("anchor", i), s.searchParams.set("mode", l), typeof a < "u" && s.searchParams.set("crop", a), n || (n = s.searchParams.get("width"), r = s.searchParams.get("height")), n)
    for (let f = 1; f <= c; f++) {
      s.searchParams.set("width", `${+n * f}`), s.searchParams.set("height", `${+r * f}`);
      let d = `${s.href} ${f}x`;
      t && (d = `url(${s.href}) ${f}x`), u.push(d);
    }
  return u.join(", ");
}, { t: pb } = ln.global;
class Xp {
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
        pb(
          `options.${n.itemCategoryName}`.toLowerCase(),
          n.quantity
        )
      );
    }), t.join(" - ");
  }
  getImageSrcset(t = 148) {
    return fb(this.preview, !1, t);
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
const { t: mb } = ln.global;
class mi {
  constructor(t, n = !1) {
    le(this, "itemCategoryId");
    le(this, "itemCategoryName");
    le(this, "orderPriority");
    le(this, "_quantity");
    le(this, "_totalPrice");
    le(this, "_totalDiscountedPrice");
    this.itemCategoryId = t.itemCategoryId, this.itemCategoryName = t.itemCategoryName, this.orderPriority = t.orderPriority || 0, this._quantity = n ? t.quantity : ut().getCategoryPreselectQuantity(this.itemCategoryId).value ?? 0, this._totalPrice = t.totalPrice || t.totalDiscountedPrice || 0, this._totalDiscountedPrice = t.totalDiscountedPrice || 0;
  }
  get quantity() {
    return this._quantity;
  }
  set quantity(t) {
    this._quantity = t, ut().updateCategoryPreselectQuantity(this.itemCategoryId, t);
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
    return mb(`options.${this.itemCategoryName}`.toLowerCase(), this.quantity);
  }
}
class Kp extends Xp {
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
    this.isCombo = !0, this.isSingle = !1, this.packages = (s = n.packageGroup) == null ? void 0 : s.packages, this.selectedCategories = this.packages.map((c) => new mi(
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
        return n.timeslot && (r = new zo(n.timeslot)), {
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
var hb = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const { localizedTitle: vb } = Ao, { t: Wi } = ln.global;
class Jp {
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
    ), +hb.VITE_DEBUG && console.log("Product constructor end"), this.isAddon && this.selectParentProductDate();
  }
  get cartItem() {
    return this._cartItem ? this._cartItem : ut().getItemByCartItemId(this.cartItemId);
  }
  get title() {
    return vb(this._title);
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
    return !this.isAddon || ((n = this.addonInfo) == null ? void 0 : n.parents.length) === 0 ? [] : ut().items.filter(
      (r) => {
        var o;
        return r instanceof Kp ? !1 : (o = this.addonInfo) == null ? void 0 : o.parents.some(
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
      (t, n) => t + n.quantity,
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
      r.quantity > 0 && n.push(
        Wi(
          `options.${r.itemCategoryName}`.toLowerCase(),
          r.quantity
        )
      );
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
    return this.availableCategories.map((t) => ({
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
    const n = new zo(t.item.timeslot);
    this.selectDate(n.date);
  }
  setCartItem(t) {
    this._cartItem = t;
  }
  async addToCart() {
    await (await Promise.resolve().then(() => em)).useCartStore().addCartItem(this.cartProductFormat), await Yr.addToCart(this);
  }
  getCategoryPrice(t) {
    var n;
    if (this.isOpen) {
      const r = this.showedItems[0].itemPrices.find((o) => fe(o.dateTime).isSame(this.selectedDate, "day") && o.itemCategory.itemCategoryId === t);
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
    this.availableDays.length > 0 && !this.availableDays.find((r) => fe(r.date).isSame(t, "day")) && (n = fe(this.availableDays[0].date).toDate()), this.selectedDate = n;
  }
  selectVariant(t) {
    this.itemId = t;
  }
  isDateExistsInAvailableDays(t) {
    const n = fe(t);
    return typeof this.availableDays.find(
      (o) => fe(o.date).isSame(n)
    ) < "u";
  }
  isCategoryAvailableForBooking(t) {
    let n = !1;
    return this.showedItems.forEach((r) => {
      r.isOpen && (n = !0), r.selectedTimeslot && r.selectedTimeslot.prices.find(
        (a) => a.categoryId === t.itemCategoryId
      ) && (n = !0);
    }), n;
  }
}
class Zp {
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
            new zo(
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
    return this.timeslots.filter((n) => fe(n.dateTime).isSame(t, "day") && n.isOpen ? !0 : fe(n.dateTime).isSame(t, "day"));
  }
  nightTimeslots(t = /* @__PURE__ */ new Date()) {
    return this.timeslots.filter((r) => {
      if (r.isOpen)
        return !1;
      const o = fe(t).add(1, "day").set("hour", 6);
      return fe(r.dateTime).isAfter(t, "day") && fe(r.dateTime).isBefore(o, "minutes");
    });
  }
  selectTimeslot(t) {
    this.selectedTimeslot = t;
  }
}
var gb = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
class zi extends Jp {
  constructor(n, r = !0) {
    super(n, r);
    le(this, "isCombo", !0);
    le(this, "isSingle", !this.isCombo);
    le(this, "cartItemId", "00000000-0000-0000-0000-000000000000");
    le(this, "packageItems", []);
    +gb.VITE_DEBUG && console.log("Combo product constructor end");
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
    this.availableCategories = this.packageItems.map((n) => new mi(n.availableCategory));
  }
  setItems() {
    this.items.length === 0 ? this.items = this.defaultPackage.packageItems.map(
      (n) => new Zp(n, this.itemPrices, !0)
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
class yb {
  constructor(t) {
    le(this, "id");
    le(this, "description");
    le(this, "itemCategoryId");
    le(this, "quantity");
    this.id = t.id, this.description = t.description, this.itemCategoryId = t.itemCategoryId, this.quantity = 0;
  }
}
var tn = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
class _b extends Jp {
  constructor(n, r = !0, o = /* @__PURE__ */ new Date()) {
    super(n, r, o);
    le(this, "isSingle", !0);
    le(this, "isCombo", !this.isSingle);
    le(this, "items", []);
    +tn.VITE_DEBUG && console.log("Single product constructor end");
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
        const r = new zo(
          this.cartItem.item.timeslot,
          n
        );
        this.items.forEach((o) => {
          const a = o.timeslots.find(
            (i) => i.id === r.id
          );
          typeof a > "u" || o.selectTimeslot(a);
        }), this.selectDate(fe(r.dateTime).toDate());
      }
    }
  }
  async setBookingData(n) {
    if (+tn.VITE_DEBUG && console.log("Set booking data start"), n.extra && n.extra.meals && (this.options = n.extra.meals.map(
      (i) => new yb(i)
    ), +tn.VITE_DEBUG && console.log("Set extra end")), this.availableCategories = n.availableCategories.map(
      (i) => new mi(i)
    ), +tn.VITE_DEBUG && console.log("Set categories end"), +tn.VITE_DEBUG && console.log("Set product booking start"), this.items.length === 0) {
      const i = new Zp(
        n,
        n.itemPriceInfos
      );
      this.items = [i], this.isEdit && this.fillEditData();
    } else
      this.items.forEach((i) => {
        i.setBookingData(n, n.itemPriceInfos);
      });
    +tn.VITE_DEBUG && console.log("Set product booking end");
    const { daysAddedCount: r } = await this.setAvailableDays(n), o = fe(this.selectedDate), a = this.availableDays.find(
      (i) => o.isSame(i.date, "day")
    );
    return (!this.selectedDate || typeof a > "u") && this.selectDate(new Date(this.availableDays[0].date)), +tn.VITE_DEBUG && console.log("Set booking data end"), { daysAddedCount: r };
  }
  async setAvailableDays(n) {
    +tn.VITE_DEBUG && console.log("Set days start");
    const r = n.availableDays.map(
      (o) => {
        var i;
        const a = n.itemPriceInfos.find((l) => l.itemCategory.itemCategoryId === this.defaultProductCategory.itemCategoryId && fe(l.dateTime).isSame(o, "day"));
        return {
          date: o,
          price: ((i = a == null ? void 0 : a.dynamicPrice) == null ? void 0 : i.dynamicPrice) || (a == null ? void 0 : a.itemPrice.itemPrice)
        };
      }
    );
    return this.availableDays = this.availableDays.concat(r).sort((o, a) => o.date < a.date ? -1 : o.date > a.date ? 1 : 0), +tn.VITE_DEBUG && console.log("Set days end"), { daysAddedCount: r.length };
  }
}
class bb extends Xp {
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
        return new mi(
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
    return this.item.timeslot && (n = new zo(this.item.timeslot)), [
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
var hr;
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
  }), e.getProductBookingData = async (n, r = fe().format("YYYY-MM-DD"), o = 45) => {
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
})(hr || (hr = {}));
var Eb = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 }, Rn;
((e) => {
  e.getProduct = async (n) => {
    +Eb.VITE_DEBUG && console.log("Detect product");
    try {
      return typeof n.isCombo < "u" ? n.isCombo ? new zi(n) : await t(n) : await t(n);
    } catch {
      return typeof n.isCombo < "u" && !n.isCombo ? new zi(n, !1) : new zi(n);
    }
  };
  const t = async (n) => {
    try {
      const r = await hr.getAvailableDays(n.itemId);
      return new _b(
        n,
        r.isSellable,
        new Date(r.availableDays[0])
      );
    } catch (r) {
      throw new Error(r);
    }
  };
  e.getCartProduct = (n) => n.item === null && n.packageGroup ? new Kp(n) : new bb(n);
})(Rn || (Rn = {}));
function ma(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Qp = { exports: {} };
(function(e, t) {
  (function(n) {
    e.exports = n();
  })(function() {
    return function n(r, o, a) {
      function i(c, u) {
        if (!o[c]) {
          if (!r[c]) {
            var f = typeof ma == "function" && ma;
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
      for (var l = typeof ma == "function" && ma, s = 0; s < a.length; s++)
        i(a[s]);
      return i;
    }({ 1: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        var p = n("crypto");
        function g(S, E) {
          E = y(S, E);
          var C;
          return (C = E.algorithm !== "passthrough" ? p.createHash(E.algorithm) : new N()).write === void 0 && (C.write = C.update, C.end = C.update), O(E, C).dispatch(S), C.update || C.end(""), C.digest ? C.digest(E.encoding === "buffer" ? void 0 : E.encoding) : (S = C.read(), E.encoding !== "buffer" ? S.toString(E.encoding) : S);
        }
        (o = r.exports = g).sha1 = function(S) {
          return g(S);
        }, o.keys = function(S) {
          return g(S, { excludeValues: !0, algorithm: "sha1", encoding: "hex" });
        }, o.MD5 = function(S) {
          return g(S, { algorithm: "md5", encoding: "hex" });
        }, o.keysMD5 = function(S) {
          return g(S, { algorithm: "md5", encoding: "hex", excludeValues: !0 });
        };
        var h = p.getHashes ? p.getHashes().slice() : ["sha1", "md5"], m = (h.push("passthrough"), ["buffer", "hex", "binary", "base64"]);
        function y(S, E) {
          var C = {};
          if (C.algorithm = (E = E || {}).algorithm || "sha1", C.encoding = E.encoding || "hex", C.excludeValues = !!E.excludeValues, C.algorithm = C.algorithm.toLowerCase(), C.encoding = C.encoding.toLowerCase(), C.ignoreUnknown = E.ignoreUnknown === !0, C.respectType = E.respectType !== !1, C.respectFunctionNames = E.respectFunctionNames !== !1, C.respectFunctionProperties = E.respectFunctionProperties !== !1, C.unorderedArrays = E.unorderedArrays === !0, C.unorderedSets = E.unorderedSets !== !1, C.unorderedObjects = E.unorderedObjects !== !1, C.replacer = E.replacer || void 0, C.excludeKeys = E.excludeKeys || void 0, S === void 0)
            throw new Error("Object argument required.");
          for (var I = 0; I < h.length; ++I)
            h[I].toLowerCase() === C.algorithm.toLowerCase() && (C.algorithm = h[I]);
          if (h.indexOf(C.algorithm) === -1)
            throw new Error('Algorithm "' + C.algorithm + '"  not supported. supported values: ' + h.join(", "));
          if (m.indexOf(C.encoding) === -1 && C.algorithm !== "passthrough")
            throw new Error('Encoding "' + C.encoding + '"  not supported. supported values: ' + m.join(", "));
          return C;
        }
        function b(S) {
          if (typeof S == "function")
            return /^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i.exec(Function.prototype.toString.call(S)) != null;
        }
        function O(S, E, C) {
          C = C || [];
          function I(_) {
            return E.update ? E.update(_, "utf8") : E.write(_, "utf8");
          }
          return { dispatch: function(_) {
            return this["_" + ((_ = S.replacer ? S.replacer(_) : _) === null ? "null" : typeof _)](_);
          }, _object: function(_) {
            var k, A = Object.prototype.toString.call(_), x = /\[object (.*)\]/i.exec(A);
            if (x = (x = x ? x[1] : "unknown:[" + A + "]").toLowerCase(), 0 <= (A = C.indexOf(_)))
              return this.dispatch("[CIRCULAR:" + A + "]");
            if (C.push(_), l !== void 0 && l.isBuffer && l.isBuffer(_))
              return I("buffer:"), I(_);
            if (x === "object" || x === "function" || x === "asyncfunction")
              return A = Object.keys(_), S.unorderedObjects && (A = A.sort()), S.respectType === !1 || b(_) || A.splice(0, 0, "prototype", "__proto__", "constructor"), S.excludeKeys && (A = A.filter(function(M) {
                return !S.excludeKeys(M);
              })), I("object:" + A.length + ":"), k = this, A.forEach(function(M) {
                k.dispatch(M), I(":"), S.excludeValues || k.dispatch(_[M]), I(",");
              });
            if (!this["_" + x]) {
              if (S.ignoreUnknown)
                return I("[" + x + "]");
              throw new Error('Unknown object type "' + x + '"');
            }
            this["_" + x](_);
          }, _array: function(_, M) {
            M = M !== void 0 ? M : S.unorderedArrays !== !1;
            var A = this;
            if (I("array:" + _.length + ":"), !M || _.length <= 1)
              return _.forEach(function($) {
                return A.dispatch($);
              });
            var x = [], M = _.map(function($) {
              var L = new N(), F = C.slice();
              return O(S, L, F).dispatch($), x = x.concat(F.slice(C.length)), L.read().toString();
            });
            return C = C.concat(x), M.sort(), this._array(M, !1);
          }, _date: function(_) {
            return I("date:" + _.toJSON());
          }, _symbol: function(_) {
            return I("symbol:" + _.toString());
          }, _error: function(_) {
            return I("error:" + _.toString());
          }, _boolean: function(_) {
            return I("bool:" + _.toString());
          }, _string: function(_) {
            I("string:" + _.length + ":"), I(_.toString());
          }, _function: function(_) {
            I("fn:"), b(_) ? this.dispatch("[native]") : this.dispatch(_.toString()), S.respectFunctionNames !== !1 && this.dispatch("function-name:" + String(_.name)), S.respectFunctionProperties && this._object(_);
          }, _number: function(_) {
            return I("number:" + _.toString());
          }, _xml: function(_) {
            return I("xml:" + _.toString());
          }, _null: function() {
            return I("Null");
          }, _undefined: function() {
            return I("Undefined");
          }, _regexp: function(_) {
            return I("regex:" + _.toString());
          }, _uint8array: function(_) {
            return I("uint8array:"), this.dispatch(Array.prototype.slice.call(_));
          }, _uint8clampedarray: function(_) {
            return I("uint8clampedarray:"), this.dispatch(Array.prototype.slice.call(_));
          }, _int8array: function(_) {
            return I("int8array:"), this.dispatch(Array.prototype.slice.call(_));
          }, _uint16array: function(_) {
            return I("uint16array:"), this.dispatch(Array.prototype.slice.call(_));
          }, _int16array: function(_) {
            return I("int16array:"), this.dispatch(Array.prototype.slice.call(_));
          }, _uint32array: function(_) {
            return I("uint32array:"), this.dispatch(Array.prototype.slice.call(_));
          }, _int32array: function(_) {
            return I("int32array:"), this.dispatch(Array.prototype.slice.call(_));
          }, _float32array: function(_) {
            return I("float32array:"), this.dispatch(Array.prototype.slice.call(_));
          }, _float64array: function(_) {
            return I("float64array:"), this.dispatch(Array.prototype.slice.call(_));
          }, _arraybuffer: function(_) {
            return I("arraybuffer:"), this.dispatch(new Uint8Array(_));
          }, _url: function(_) {
            return I("url:" + _.toString());
          }, _map: function(_) {
            return I("map:"), _ = Array.from(_), this._array(_, S.unorderedSets !== !1);
          }, _set: function(_) {
            return I("set:"), _ = Array.from(_), this._array(_, S.unorderedSets !== !1);
          }, _file: function(_) {
            return I("file:"), this.dispatch([_.name, _.size, _.type, _.lastModfied]);
          }, _blob: function() {
            if (S.ignoreUnknown)
              return I("[blob]");
            throw Error(`Hashing Blob objects is currently not supported
(see https://github.com/puleos/object-hash/issues/26)
Use "options.replacer" or "options.ignoreUnknown"
`);
          }, _domwindow: function() {
            return I("domwindow");
          }, _bigint: function(_) {
            return I("bigint:" + _.toString());
          }, _process: function() {
            return I("process");
          }, _timer: function() {
            return I("timer");
          }, _pipe: function() {
            return I("pipe");
          }, _tcp: function() {
            return I("tcp");
          }, _udp: function() {
            return I("udp");
          }, _tty: function() {
            return I("tty");
          }, _statwatcher: function() {
            return I("statwatcher");
          }, _securecontext: function() {
            return I("securecontext");
          }, _connection: function() {
            return I("connection");
          }, _zlib: function() {
            return I("zlib");
          }, _context: function() {
            return I("context");
          }, _nodescript: function() {
            return I("nodescript");
          }, _httpparser: function() {
            return I("httpparser");
          }, _dataview: function() {
            return I("dataview");
          }, _signal: function() {
            return I("signal");
          }, _fsevent: function() {
            return I("fsevent");
          }, _tlswrap: function() {
            return I("tlswrap");
          } };
        }
        function N() {
          return { buf: "", write: function(S) {
            this.buf += S;
          }, end: function(S) {
            this.buf += S;
          }, read: function() {
            return this.buf;
          } };
        }
        o.writeToStream = function(S, E, C) {
          return C === void 0 && (C = E, E = {}), O(E = y(S, E), C).dispatch(S);
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_9a5aa49d.js", "/");
    }, { buffer: 3, crypto: 5, lYpoI2: 11 }], 2: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        (function(p) {
          var g = typeof Uint8Array < "u" ? Uint8Array : Array, h = 43, m = 47, y = 48, b = 97, O = 65, N = 45, S = 95;
          function E(C) {
            return C = C.charCodeAt(0), C === h || C === N ? 62 : C === m || C === S ? 63 : C < y ? -1 : C < y + 10 ? C - y + 26 + 26 : C < O + 26 ? C - O : C < b + 26 ? C - b + 26 : void 0;
          }
          p.toByteArray = function(C) {
            var I, _;
            if (0 < C.length % 4)
              throw new Error("Invalid string. Length must be a multiple of 4");
            var k = C.length, k = C.charAt(k - 2) === "=" ? 2 : C.charAt(k - 1) === "=" ? 1 : 0, A = new g(3 * C.length / 4 - k), x = 0 < k ? C.length - 4 : C.length, M = 0;
            function $(L) {
              A[M++] = L;
            }
            for (I = 0; I < x; I += 4, 0)
              $((16711680 & (_ = E(C.charAt(I)) << 18 | E(C.charAt(I + 1)) << 12 | E(C.charAt(I + 2)) << 6 | E(C.charAt(I + 3)))) >> 16), $((65280 & _) >> 8), $(255 & _);
            return k == 2 ? $(255 & (_ = E(C.charAt(I)) << 2 | E(C.charAt(I + 1)) >> 4)) : k == 1 && ($((_ = E(C.charAt(I)) << 10 | E(C.charAt(I + 1)) << 4 | E(C.charAt(I + 2)) >> 2) >> 8 & 255), $(255 & _)), A;
          }, p.fromByteArray = function(C) {
            var I, _, k, A, x = C.length % 3, M = "";
            function $(L) {
              return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(L);
            }
            for (I = 0, k = C.length - x; I < k; I += 3)
              _ = (C[I] << 16) + (C[I + 1] << 8) + C[I + 2], M += $((A = _) >> 18 & 63) + $(A >> 12 & 63) + $(A >> 6 & 63) + $(63 & A);
            switch (x) {
              case 1:
                M = (M += $((_ = C[C.length - 1]) >> 2)) + $(_ << 4 & 63) + "==";
                break;
              case 2:
                M = (M = (M += $((_ = (C[C.length - 2] << 8) + C[C.length - 1]) >> 10)) + $(_ >> 4 & 63)) + $(_ << 2 & 63) + "=";
            }
            return M;
          };
        })(o === void 0 ? this.base64js = {} : o);
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js", "/node_modules/gulp-browserify/node_modules/base64-js/lib");
    }, { buffer: 3, lYpoI2: 11 }], 3: [function(n, r, o) {
      (function(a, i, h, s, c, u, f, d, v) {
        var p = n("base64-js"), g = n("ieee754");
        function h(w, P, R) {
          if (!(this instanceof h))
            return new h(w, P, R);
          var K, T, D, H, ee = typeof w;
          if (P === "base64" && ee == "string")
            for (w = (H = w).trim ? H.trim() : H.replace(/^\s+|\s+$/g, ""); w.length % 4 != 0; )
              w += "=";
          if (ee == "number")
            K = V(w);
          else if (ee == "string")
            K = h.byteLength(w, P);
          else {
            if (ee != "object")
              throw new Error("First argument needs to be a number, array or string.");
            K = V(w.length);
          }
          if (h._useTypedArrays ? T = h._augment(new Uint8Array(K)) : ((T = this).length = K, T._isBuffer = !0), h._useTypedArrays && typeof w.byteLength == "number")
            T._set(w);
          else if (q(H = w) || h.isBuffer(H) || H && typeof H == "object" && typeof H.length == "number")
            for (D = 0; D < K; D++)
              h.isBuffer(w) ? T[D] = w.readUInt8(D) : T[D] = w[D];
          else if (ee == "string")
            T.write(w, 0, P);
          else if (ee == "number" && !h._useTypedArrays && !R)
            for (D = 0; D < K; D++)
              T[D] = 0;
          return T;
        }
        function m(w, P, R, K) {
          return h._charsWritten = de(function(T) {
            for (var D = [], H = 0; H < T.length; H++)
              D.push(255 & T.charCodeAt(H));
            return D;
          }(P), w, R, K);
        }
        function y(w, P, R, K) {
          return h._charsWritten = de(function(T) {
            for (var D, H, ee = [], ie = 0; ie < T.length; ie++)
              H = T.charCodeAt(ie), D = H >> 8, H = H % 256, ee.push(H), ee.push(D);
            return ee;
          }(P), w, R, K);
        }
        function b(w, P, R) {
          var K = "";
          R = Math.min(w.length, R);
          for (var T = P; T < R; T++)
            K += String.fromCharCode(w[T]);
          return K;
        }
        function O(w, P, R, D) {
          D || (Y(typeof R == "boolean", "missing or invalid endian"), Y(P != null, "missing offset"), Y(P + 1 < w.length, "Trying to read beyond buffer length"));
          var T, D = w.length;
          if (!(D <= P))
            return R ? (T = w[P], P + 1 < D && (T |= w[P + 1] << 8)) : (T = w[P] << 8, P + 1 < D && (T |= w[P + 1])), T;
        }
        function N(w, P, R, D) {
          D || (Y(typeof R == "boolean", "missing or invalid endian"), Y(P != null, "missing offset"), Y(P + 3 < w.length, "Trying to read beyond buffer length"));
          var T, D = w.length;
          if (!(D <= P))
            return R ? (P + 2 < D && (T = w[P + 2] << 16), P + 1 < D && (T |= w[P + 1] << 8), T |= w[P], P + 3 < D && (T += w[P + 3] << 24 >>> 0)) : (P + 1 < D && (T = w[P + 1] << 16), P + 2 < D && (T |= w[P + 2] << 8), P + 3 < D && (T |= w[P + 3]), T += w[P] << 24 >>> 0), T;
        }
        function S(w, P, R, K) {
          if (K || (Y(typeof R == "boolean", "missing or invalid endian"), Y(P != null, "missing offset"), Y(P + 1 < w.length, "Trying to read beyond buffer length")), !(w.length <= P))
            return K = O(w, P, R, !0), 32768 & K ? -1 * (65535 - K + 1) : K;
        }
        function E(w, P, R, K) {
          if (K || (Y(typeof R == "boolean", "missing or invalid endian"), Y(P != null, "missing offset"), Y(P + 3 < w.length, "Trying to read beyond buffer length")), !(w.length <= P))
            return K = N(w, P, R, !0), 2147483648 & K ? -1 * (4294967295 - K + 1) : K;
        }
        function C(w, P, R, K) {
          return K || (Y(typeof R == "boolean", "missing or invalid endian"), Y(P + 3 < w.length, "Trying to read beyond buffer length")), g.read(w, P, R, 23, 4);
        }
        function I(w, P, R, K) {
          return K || (Y(typeof R == "boolean", "missing or invalid endian"), Y(P + 7 < w.length, "Trying to read beyond buffer length")), g.read(w, P, R, 52, 8);
        }
        function _(w, P, R, K, T) {
          if (T || (Y(P != null, "missing value"), Y(typeof K == "boolean", "missing or invalid endian"), Y(R != null, "missing offset"), Y(R + 1 < w.length, "trying to write beyond buffer length"), Se(P, 65535)), T = w.length, !(T <= R))
            for (var D = 0, H = Math.min(T - R, 2); D < H; D++)
              w[R + D] = (P & 255 << 8 * (K ? D : 1 - D)) >>> 8 * (K ? D : 1 - D);
        }
        function k(w, P, R, K, T) {
          if (T || (Y(P != null, "missing value"), Y(typeof K == "boolean", "missing or invalid endian"), Y(R != null, "missing offset"), Y(R + 3 < w.length, "trying to write beyond buffer length"), Se(P, 4294967295)), T = w.length, !(T <= R))
            for (var D = 0, H = Math.min(T - R, 4); D < H; D++)
              w[R + D] = P >>> 8 * (K ? D : 3 - D) & 255;
        }
        function A(w, P, R, K, T) {
          T || (Y(P != null, "missing value"), Y(typeof K == "boolean", "missing or invalid endian"), Y(R != null, "missing offset"), Y(R + 1 < w.length, "Trying to write beyond buffer length"), ne(P, 32767, -32768)), w.length <= R || _(w, 0 <= P ? P : 65535 + P + 1, R, K, T);
        }
        function x(w, P, R, K, T) {
          T || (Y(P != null, "missing value"), Y(typeof K == "boolean", "missing or invalid endian"), Y(R != null, "missing offset"), Y(R + 3 < w.length, "Trying to write beyond buffer length"), ne(P, 2147483647, -2147483648)), w.length <= R || k(w, 0 <= P ? P : 4294967295 + P + 1, R, K, T);
        }
        function M(w, P, R, K, T) {
          T || (Y(P != null, "missing value"), Y(typeof K == "boolean", "missing or invalid endian"), Y(R != null, "missing offset"), Y(R + 3 < w.length, "Trying to write beyond buffer length"), j(P, 34028234663852886e22, -34028234663852886e22)), w.length <= R || g.write(w, P, R, K, 23, 4);
        }
        function $(w, P, R, K, T) {
          T || (Y(P != null, "missing value"), Y(typeof K == "boolean", "missing or invalid endian"), Y(R != null, "missing offset"), Y(R + 7 < w.length, "Trying to write beyond buffer length"), j(P, 17976931348623157e292, -17976931348623157e292)), w.length <= R || g.write(w, P, R, K, 52, 8);
        }
        o.Buffer = h, o.SlowBuffer = h, o.INSPECT_MAX_BYTES = 50, h.poolSize = 8192, h._useTypedArrays = function() {
          try {
            var w = new ArrayBuffer(0), P = new Uint8Array(w);
            return P.foo = function() {
              return 42;
            }, P.foo() === 42 && typeof P.subarray == "function";
          } catch {
            return !1;
          }
        }(), h.isEncoding = function(w) {
          switch (String(w).toLowerCase()) {
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
        }, h.isBuffer = function(w) {
          return !(w == null || !w._isBuffer);
        }, h.byteLength = function(w, P) {
          var R;
          switch (w += "", P || "utf8") {
            case "hex":
              R = w.length / 2;
              break;
            case "utf8":
            case "utf-8":
              R = Z(w).length;
              break;
            case "ascii":
            case "binary":
            case "raw":
              R = w.length;
              break;
            case "base64":
              R = ae(w).length;
              break;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              R = 2 * w.length;
              break;
            default:
              throw new Error("Unknown encoding");
          }
          return R;
        }, h.concat = function(w, P) {
          if (Y(q(w), `Usage: Buffer.concat(list, [totalLength])
list should be an Array.`), w.length === 0)
            return new h(0);
          if (w.length === 1)
            return w[0];
          if (typeof P != "number")
            for (T = P = 0; T < w.length; T++)
              P += w[T].length;
          for (var R = new h(P), K = 0, T = 0; T < w.length; T++) {
            var D = w[T];
            D.copy(R, K), K += D.length;
          }
          return R;
        }, h.prototype.write = function(w, P, R, K) {
          isFinite(P) ? isFinite(R) || (K = R, R = void 0) : (ie = K, K = P, P = R, R = ie), P = Number(P) || 0;
          var T, D, H, ee, ie = this.length - P;
          switch ((!R || ie < (R = Number(R))) && (R = ie), K = String(K || "utf8").toLowerCase()) {
            case "hex":
              T = function(ve, Le, Re, je) {
                Re = Number(Re) || 0;
                var Ue = ve.length - Re;
                (!je || Ue < (je = Number(je))) && (je = Ue), Y((Ue = Le.length) % 2 == 0, "Invalid hex string"), Ue / 2 < je && (je = Ue / 2);
                for (var _n = 0; _n < je; _n++) {
                  var ca = parseInt(Le.substr(2 * _n, 2), 16);
                  Y(!isNaN(ca), "Invalid hex string"), ve[Re + _n] = ca;
                }
                return h._charsWritten = 2 * _n, _n;
              }(this, w, P, R);
              break;
            case "utf8":
            case "utf-8":
              D = this, H = P, ee = R, T = h._charsWritten = de(Z(w), D, H, ee);
              break;
            case "ascii":
            case "binary":
              T = m(this, w, P, R);
              break;
            case "base64":
              D = this, H = P, ee = R, T = h._charsWritten = de(ae(w), D, H, ee);
              break;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              T = y(this, w, P, R);
              break;
            default:
              throw new Error("Unknown encoding");
          }
          return T;
        }, h.prototype.toString = function(w, P, R) {
          var K, T, D, H, ee = this;
          if (w = String(w || "utf8").toLowerCase(), P = Number(P) || 0, (R = R !== void 0 ? Number(R) : ee.length) === P)
            return "";
          switch (w) {
            case "hex":
              K = function(ie, ve, Le) {
                var Re = ie.length;
                (!ve || ve < 0) && (ve = 0), (!Le || Le < 0 || Re < Le) && (Le = Re);
                for (var je = "", Ue = ve; Ue < Le; Ue++)
                  je += B(ie[Ue]);
                return je;
              }(ee, P, R);
              break;
            case "utf8":
            case "utf-8":
              K = function(ie, ve, Le) {
                var Re = "", je = "";
                Le = Math.min(ie.length, Le);
                for (var Ue = ve; Ue < Le; Ue++)
                  ie[Ue] <= 127 ? (Re += he(je) + String.fromCharCode(ie[Ue]), je = "") : je += "%" + ie[Ue].toString(16);
                return Re + he(je);
              }(ee, P, R);
              break;
            case "ascii":
            case "binary":
              K = b(ee, P, R);
              break;
            case "base64":
              T = ee, H = R, K = (D = P) === 0 && H === T.length ? p.fromByteArray(T) : p.fromByteArray(T.slice(D, H));
              break;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              K = function(ie, ve, Le) {
                for (var Re = ie.slice(ve, Le), je = "", Ue = 0; Ue < Re.length; Ue += 2)
                  je += String.fromCharCode(Re[Ue] + 256 * Re[Ue + 1]);
                return je;
              }(ee, P, R);
              break;
            default:
              throw new Error("Unknown encoding");
          }
          return K;
        }, h.prototype.toJSON = function() {
          return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
        }, h.prototype.copy = function(w, P, R, K) {
          if (P = P || 0, (K = K || K === 0 ? K : this.length) !== (R = R || 0) && w.length !== 0 && this.length !== 0) {
            Y(R <= K, "sourceEnd < sourceStart"), Y(0 <= P && P < w.length, "targetStart out of bounds"), Y(0 <= R && R < this.length, "sourceStart out of bounds"), Y(0 <= K && K <= this.length, "sourceEnd out of bounds"), K > this.length && (K = this.length);
            var T = (K = w.length - P < K - R ? w.length - P + R : K) - R;
            if (T < 100 || !h._useTypedArrays)
              for (var D = 0; D < T; D++)
                w[D + P] = this[D + R];
            else
              w._set(this.subarray(R, R + T), P);
          }
        }, h.prototype.slice = function(w, P) {
          var R = this.length;
          if (w = F(w, R, 0), P = F(P, R, R), h._useTypedArrays)
            return h._augment(this.subarray(w, P));
          for (var K = P - w, T = new h(K, void 0, !0), D = 0; D < K; D++)
            T[D] = this[D + w];
          return T;
        }, h.prototype.get = function(w) {
          return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(w);
        }, h.prototype.set = function(w, P) {
          return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(w, P);
        }, h.prototype.readUInt8 = function(w, P) {
          if (P || (Y(w != null, "missing offset"), Y(w < this.length, "Trying to read beyond buffer length")), !(w >= this.length))
            return this[w];
        }, h.prototype.readUInt16LE = function(w, P) {
          return O(this, w, !0, P);
        }, h.prototype.readUInt16BE = function(w, P) {
          return O(this, w, !1, P);
        }, h.prototype.readUInt32LE = function(w, P) {
          return N(this, w, !0, P);
        }, h.prototype.readUInt32BE = function(w, P) {
          return N(this, w, !1, P);
        }, h.prototype.readInt8 = function(w, P) {
          if (P || (Y(w != null, "missing offset"), Y(w < this.length, "Trying to read beyond buffer length")), !(w >= this.length))
            return 128 & this[w] ? -1 * (255 - this[w] + 1) : this[w];
        }, h.prototype.readInt16LE = function(w, P) {
          return S(this, w, !0, P);
        }, h.prototype.readInt16BE = function(w, P) {
          return S(this, w, !1, P);
        }, h.prototype.readInt32LE = function(w, P) {
          return E(this, w, !0, P);
        }, h.prototype.readInt32BE = function(w, P) {
          return E(this, w, !1, P);
        }, h.prototype.readFloatLE = function(w, P) {
          return C(this, w, !0, P);
        }, h.prototype.readFloatBE = function(w, P) {
          return C(this, w, !1, P);
        }, h.prototype.readDoubleLE = function(w, P) {
          return I(this, w, !0, P);
        }, h.prototype.readDoubleBE = function(w, P) {
          return I(this, w, !1, P);
        }, h.prototype.writeUInt8 = function(w, P, R) {
          R || (Y(w != null, "missing value"), Y(P != null, "missing offset"), Y(P < this.length, "trying to write beyond buffer length"), Se(w, 255)), P >= this.length || (this[P] = w);
        }, h.prototype.writeUInt16LE = function(w, P, R) {
          _(this, w, P, !0, R);
        }, h.prototype.writeUInt16BE = function(w, P, R) {
          _(this, w, P, !1, R);
        }, h.prototype.writeUInt32LE = function(w, P, R) {
          k(this, w, P, !0, R);
        }, h.prototype.writeUInt32BE = function(w, P, R) {
          k(this, w, P, !1, R);
        }, h.prototype.writeInt8 = function(w, P, R) {
          R || (Y(w != null, "missing value"), Y(P != null, "missing offset"), Y(P < this.length, "Trying to write beyond buffer length"), ne(w, 127, -128)), P >= this.length || (0 <= w ? this.writeUInt8(w, P, R) : this.writeUInt8(255 + w + 1, P, R));
        }, h.prototype.writeInt16LE = function(w, P, R) {
          A(this, w, P, !0, R);
        }, h.prototype.writeInt16BE = function(w, P, R) {
          A(this, w, P, !1, R);
        }, h.prototype.writeInt32LE = function(w, P, R) {
          x(this, w, P, !0, R);
        }, h.prototype.writeInt32BE = function(w, P, R) {
          x(this, w, P, !1, R);
        }, h.prototype.writeFloatLE = function(w, P, R) {
          M(this, w, P, !0, R);
        }, h.prototype.writeFloatBE = function(w, P, R) {
          M(this, w, P, !1, R);
        }, h.prototype.writeDoubleLE = function(w, P, R) {
          $(this, w, P, !0, R);
        }, h.prototype.writeDoubleBE = function(w, P, R) {
          $(this, w, P, !1, R);
        }, h.prototype.fill = function(w, P, R) {
          if (P = P || 0, R = R || this.length, Y(typeof (w = typeof (w = w || 0) == "string" ? w.charCodeAt(0) : w) == "number" && !isNaN(w), "value is not a number"), Y(P <= R, "end < start"), R !== P && this.length !== 0) {
            Y(0 <= P && P < this.length, "start out of bounds"), Y(0 <= R && R <= this.length, "end out of bounds");
            for (var K = P; K < R; K++)
              this[K] = w;
          }
        }, h.prototype.inspect = function() {
          for (var w = [], P = this.length, R = 0; R < P; R++)
            if (w[R] = B(this[R]), R === o.INSPECT_MAX_BYTES) {
              w[R + 1] = "...";
              break;
            }
          return "<Buffer " + w.join(" ") + ">";
        }, h.prototype.toArrayBuffer = function() {
          if (typeof Uint8Array > "u")
            throw new Error("Buffer.toArrayBuffer not supported in this browser");
          if (h._useTypedArrays)
            return new h(this).buffer;
          for (var w = new Uint8Array(this.length), P = 0, R = w.length; P < R; P += 1)
            w[P] = this[P];
          return w.buffer;
        };
        var L = h.prototype;
        function F(w, P, R) {
          return typeof w != "number" ? R : P <= (w = ~~w) ? P : 0 <= w || 0 <= (w += P) ? w : 0;
        }
        function V(w) {
          return (w = ~~Math.ceil(+w)) < 0 ? 0 : w;
        }
        function q(w) {
          return (Array.isArray || function(P) {
            return Object.prototype.toString.call(P) === "[object Array]";
          })(w);
        }
        function B(w) {
          return w < 16 ? "0" + w.toString(16) : w.toString(16);
        }
        function Z(w) {
          for (var P = [], R = 0; R < w.length; R++) {
            var K = w.charCodeAt(R);
            if (K <= 127)
              P.push(w.charCodeAt(R));
            else
              for (var T = R, D = (55296 <= K && K <= 57343 && R++, encodeURIComponent(w.slice(T, R + 1)).substr(1).split("%")), H = 0; H < D.length; H++)
                P.push(parseInt(D[H], 16));
          }
          return P;
        }
        function ae(w) {
          return p.toByteArray(w);
        }
        function de(w, P, R, K) {
          for (var T = 0; T < K && !(T + R >= P.length || T >= w.length); T++)
            P[T + R] = w[T];
          return T;
        }
        function he(w) {
          try {
            return decodeURIComponent(w);
          } catch {
            return "�";
          }
        }
        function Se(w, P) {
          Y(typeof w == "number", "cannot write a non-number as a number"), Y(0 <= w, "specified a negative value for writing an unsigned value"), Y(w <= P, "value is larger than maximum value for type"), Y(Math.floor(w) === w, "value has a fractional component");
        }
        function ne(w, P, R) {
          Y(typeof w == "number", "cannot write a non-number as a number"), Y(w <= P, "value larger than maximum allowed value"), Y(R <= w, "value smaller than minimum allowed value"), Y(Math.floor(w) === w, "value has a fractional component");
        }
        function j(w, P, R) {
          Y(typeof w == "number", "cannot write a non-number as a number"), Y(w <= P, "value larger than maximum allowed value"), Y(R <= w, "value smaller than minimum allowed value");
        }
        function Y(w, P) {
          if (!w)
            throw new Error(P || "Failed assertion");
        }
        h._augment = function(w) {
          return w._isBuffer = !0, w._get = w.get, w._set = w.set, w.get = L.get, w.set = L.set, w.write = L.write, w.toString = L.toString, w.toLocaleString = L.toString, w.toJSON = L.toJSON, w.copy = L.copy, w.slice = L.slice, w.readUInt8 = L.readUInt8, w.readUInt16LE = L.readUInt16LE, w.readUInt16BE = L.readUInt16BE, w.readUInt32LE = L.readUInt32LE, w.readUInt32BE = L.readUInt32BE, w.readInt8 = L.readInt8, w.readInt16LE = L.readInt16LE, w.readInt16BE = L.readInt16BE, w.readInt32LE = L.readInt32LE, w.readInt32BE = L.readInt32BE, w.readFloatLE = L.readFloatLE, w.readFloatBE = L.readFloatBE, w.readDoubleLE = L.readDoubleLE, w.readDoubleBE = L.readDoubleBE, w.writeUInt8 = L.writeUInt8, w.writeUInt16LE = L.writeUInt16LE, w.writeUInt16BE = L.writeUInt16BE, w.writeUInt32LE = L.writeUInt32LE, w.writeUInt32BE = L.writeUInt32BE, w.writeInt8 = L.writeInt8, w.writeInt16LE = L.writeInt16LE, w.writeInt16BE = L.writeInt16BE, w.writeInt32LE = L.writeInt32LE, w.writeInt32BE = L.writeInt32BE, w.writeFloatLE = L.writeFloatLE, w.writeFloatBE = L.writeFloatBE, w.writeDoubleLE = L.writeDoubleLE, w.writeDoubleBE = L.writeDoubleBE, w.fill = L.fill, w.inspect = L.inspect, w.toArrayBuffer = L.toArrayBuffer, w;
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/buffer/index.js", "/node_modules/gulp-browserify/node_modules/buffer");
    }, { "base64-js": 2, buffer: 3, ieee754: 10, lYpoI2: 11 }], 4: [function(n, r, o) {
      (function(a, i, p, s, c, u, f, d, v) {
        var p = n("buffer").Buffer, g = 4, h = new p(g);
        h.fill(0), r.exports = { hash: function(m, y, b, O) {
          for (var N = y(function(_, k) {
            _.length % g != 0 && (A = _.length + (g - _.length % g), _ = p.concat([_, h], A));
            for (var A, x = [], M = k ? _.readInt32BE : _.readInt32LE, $ = 0; $ < _.length; $ += g)
              x.push(M.call(_, $));
            return x;
          }(m = p.isBuffer(m) ? m : new p(m), O), 8 * m.length), y = O, S = new p(b), E = y ? S.writeInt32BE : S.writeInt32LE, C = 0; C < N.length; C++)
            E.call(S, N[C], 4 * C, !0);
          return S;
        } };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { buffer: 3, lYpoI2: 11 }], 5: [function(n, r, o) {
      (function(a, i, p, s, c, u, f, d, v) {
        var p = n("buffer").Buffer, g = n("./sha"), h = n("./sha256"), m = n("./rng"), y = { sha1: g, sha256: h, md5: n("./md5") }, b = 64, O = new p(b);
        function N(_, k) {
          var A = y[_ = _ || "sha1"], x = [];
          return A || S("algorithm:", _, "is not yet supported"), { update: function(M) {
            return p.isBuffer(M) || (M = new p(M)), x.push(M), M.length, this;
          }, digest: function(M) {
            var $ = p.concat(x), $ = k ? function(L, F, V) {
              p.isBuffer(F) || (F = new p(F)), p.isBuffer(V) || (V = new p(V)), F.length > b ? F = L(F) : F.length < b && (F = p.concat([F, O], b));
              for (var q = new p(b), B = new p(b), Z = 0; Z < b; Z++)
                q[Z] = 54 ^ F[Z], B[Z] = 92 ^ F[Z];
              return V = L(p.concat([q, V])), L(p.concat([B, V]));
            }(A, k, $) : A($);
            return x = null, M ? $.toString(M) : $;
          } };
        }
        function S() {
          var _ = [].slice.call(arguments).join(" ");
          throw new Error([_, "we accept pull requests", "http://github.com/dominictarr/crypto-browserify"].join(`
`));
        }
        O.fill(0), o.createHash = function(_) {
          return N(_);
        }, o.createHmac = N, o.randomBytes = function(_, k) {
          if (!k || !k.call)
            return new p(m(_));
          try {
            k.call(this, void 0, new p(m(_)));
          } catch (A) {
            k(A);
          }
        };
        var E, C = ["createCredentials", "createCipher", "createCipheriv", "createDecipher", "createDecipheriv", "createSign", "createVerify", "createDiffieHellman", "pbkdf2"], I = function(_) {
          o[_] = function() {
            S("sorry,", _, "is not implemented yet");
          };
        };
        for (E in C)
          I(C[E]);
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./md5": 6, "./rng": 7, "./sha": 8, "./sha256": 9, buffer: 3, lYpoI2: 11 }], 6: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        var p = n("./helpers");
        function g(S, E) {
          S[E >> 5] |= 128 << E % 32, S[14 + (E + 64 >>> 9 << 4)] = E;
          for (var C = 1732584193, I = -271733879, _ = -1732584194, k = 271733878, A = 0; A < S.length; A += 16) {
            var x = C, M = I, $ = _, L = k, C = m(C, I, _, k, S[A + 0], 7, -680876936), k = m(k, C, I, _, S[A + 1], 12, -389564586), _ = m(_, k, C, I, S[A + 2], 17, 606105819), I = m(I, _, k, C, S[A + 3], 22, -1044525330);
            C = m(C, I, _, k, S[A + 4], 7, -176418897), k = m(k, C, I, _, S[A + 5], 12, 1200080426), _ = m(_, k, C, I, S[A + 6], 17, -1473231341), I = m(I, _, k, C, S[A + 7], 22, -45705983), C = m(C, I, _, k, S[A + 8], 7, 1770035416), k = m(k, C, I, _, S[A + 9], 12, -1958414417), _ = m(_, k, C, I, S[A + 10], 17, -42063), I = m(I, _, k, C, S[A + 11], 22, -1990404162), C = m(C, I, _, k, S[A + 12], 7, 1804603682), k = m(k, C, I, _, S[A + 13], 12, -40341101), _ = m(_, k, C, I, S[A + 14], 17, -1502002290), C = y(C, I = m(I, _, k, C, S[A + 15], 22, 1236535329), _, k, S[A + 1], 5, -165796510), k = y(k, C, I, _, S[A + 6], 9, -1069501632), _ = y(_, k, C, I, S[A + 11], 14, 643717713), I = y(I, _, k, C, S[A + 0], 20, -373897302), C = y(C, I, _, k, S[A + 5], 5, -701558691), k = y(k, C, I, _, S[A + 10], 9, 38016083), _ = y(_, k, C, I, S[A + 15], 14, -660478335), I = y(I, _, k, C, S[A + 4], 20, -405537848), C = y(C, I, _, k, S[A + 9], 5, 568446438), k = y(k, C, I, _, S[A + 14], 9, -1019803690), _ = y(_, k, C, I, S[A + 3], 14, -187363961), I = y(I, _, k, C, S[A + 8], 20, 1163531501), C = y(C, I, _, k, S[A + 13], 5, -1444681467), k = y(k, C, I, _, S[A + 2], 9, -51403784), _ = y(_, k, C, I, S[A + 7], 14, 1735328473), C = b(C, I = y(I, _, k, C, S[A + 12], 20, -1926607734), _, k, S[A + 5], 4, -378558), k = b(k, C, I, _, S[A + 8], 11, -2022574463), _ = b(_, k, C, I, S[A + 11], 16, 1839030562), I = b(I, _, k, C, S[A + 14], 23, -35309556), C = b(C, I, _, k, S[A + 1], 4, -1530992060), k = b(k, C, I, _, S[A + 4], 11, 1272893353), _ = b(_, k, C, I, S[A + 7], 16, -155497632), I = b(I, _, k, C, S[A + 10], 23, -1094730640), C = b(C, I, _, k, S[A + 13], 4, 681279174), k = b(k, C, I, _, S[A + 0], 11, -358537222), _ = b(_, k, C, I, S[A + 3], 16, -722521979), I = b(I, _, k, C, S[A + 6], 23, 76029189), C = b(C, I, _, k, S[A + 9], 4, -640364487), k = b(k, C, I, _, S[A + 12], 11, -421815835), _ = b(_, k, C, I, S[A + 15], 16, 530742520), C = O(C, I = b(I, _, k, C, S[A + 2], 23, -995338651), _, k, S[A + 0], 6, -198630844), k = O(k, C, I, _, S[A + 7], 10, 1126891415), _ = O(_, k, C, I, S[A + 14], 15, -1416354905), I = O(I, _, k, C, S[A + 5], 21, -57434055), C = O(C, I, _, k, S[A + 12], 6, 1700485571), k = O(k, C, I, _, S[A + 3], 10, -1894986606), _ = O(_, k, C, I, S[A + 10], 15, -1051523), I = O(I, _, k, C, S[A + 1], 21, -2054922799), C = O(C, I, _, k, S[A + 8], 6, 1873313359), k = O(k, C, I, _, S[A + 15], 10, -30611744), _ = O(_, k, C, I, S[A + 6], 15, -1560198380), I = O(I, _, k, C, S[A + 13], 21, 1309151649), C = O(C, I, _, k, S[A + 4], 6, -145523070), k = O(k, C, I, _, S[A + 11], 10, -1120210379), _ = O(_, k, C, I, S[A + 2], 15, 718787259), I = O(I, _, k, C, S[A + 9], 21, -343485551), C = N(C, x), I = N(I, M), _ = N(_, $), k = N(k, L);
          }
          return Array(C, I, _, k);
        }
        function h(S, E, C, I, _, k) {
          return N((E = N(N(E, S), N(I, k))) << _ | E >>> 32 - _, C);
        }
        function m(S, E, C, I, _, k, A) {
          return h(E & C | ~E & I, S, E, _, k, A);
        }
        function y(S, E, C, I, _, k, A) {
          return h(E & I | C & ~I, S, E, _, k, A);
        }
        function b(S, E, C, I, _, k, A) {
          return h(E ^ C ^ I, S, E, _, k, A);
        }
        function O(S, E, C, I, _, k, A) {
          return h(C ^ (E | ~I), S, E, _, k, A);
        }
        function N(S, E) {
          var C = (65535 & S) + (65535 & E);
          return (S >> 16) + (E >> 16) + (C >> 16) << 16 | 65535 & C;
        }
        r.exports = function(S) {
          return p.hash(S, g, 16);
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 7: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        r.exports = function(p) {
          for (var g, h = new Array(p), m = 0; m < p; m++)
            !(3 & m) && (g = 4294967296 * Math.random()), h[m] = g >>> ((3 & m) << 3) & 255;
          return h;
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { buffer: 3, lYpoI2: 11 }], 8: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        var p = n("./helpers");
        function g(y, b) {
          y[b >> 5] |= 128 << 24 - b % 32, y[15 + (b + 64 >> 9 << 4)] = b;
          for (var O, N, S, E = Array(80), C = 1732584193, I = -271733879, _ = -1732584194, k = 271733878, A = -1009589776, x = 0; x < y.length; x += 16) {
            for (var M = C, $ = I, L = _, F = k, V = A, q = 0; q < 80; q++) {
              E[q] = q < 16 ? y[x + q] : m(E[q - 3] ^ E[q - 8] ^ E[q - 14] ^ E[q - 16], 1);
              var B = h(h(m(C, 5), (B = I, N = _, S = k, (O = q) < 20 ? B & N | ~B & S : !(O < 40) && O < 60 ? B & N | B & S | N & S : B ^ N ^ S)), h(h(A, E[q]), (O = q) < 20 ? 1518500249 : O < 40 ? 1859775393 : O < 60 ? -1894007588 : -899497514)), A = k, k = _, _ = m(I, 30), I = C, C = B;
            }
            C = h(C, M), I = h(I, $), _ = h(_, L), k = h(k, F), A = h(A, V);
          }
          return Array(C, I, _, k, A);
        }
        function h(y, b) {
          var O = (65535 & y) + (65535 & b);
          return (y >> 16) + (b >> 16) + (O >> 16) << 16 | 65535 & O;
        }
        function m(y, b) {
          return y << b | y >>> 32 - b;
        }
        r.exports = function(y) {
          return p.hash(y, g, 20, !0);
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 9: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        function p(b, O) {
          var N = (65535 & b) + (65535 & O);
          return (b >> 16) + (O >> 16) + (N >> 16) << 16 | 65535 & N;
        }
        function g(b, O) {
          var N, S = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298), E = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225), C = new Array(64);
          b[O >> 5] |= 128 << 24 - O % 32, b[15 + (O + 64 >> 9 << 4)] = O;
          for (var I, _, k = 0; k < b.length; k += 16) {
            for (var A = E[0], x = E[1], M = E[2], $ = E[3], L = E[4], F = E[5], V = E[6], q = E[7], B = 0; B < 64; B++)
              C[B] = B < 16 ? b[B + k] : p(p(p((_ = C[B - 2], m(_, 17) ^ m(_, 19) ^ y(_, 10)), C[B - 7]), (_ = C[B - 15], m(_, 7) ^ m(_, 18) ^ y(_, 3))), C[B - 16]), N = p(p(p(p(q, m(_ = L, 6) ^ m(_, 11) ^ m(_, 25)), L & F ^ ~L & V), S[B]), C[B]), I = p(m(I = A, 2) ^ m(I, 13) ^ m(I, 22), A & x ^ A & M ^ x & M), q = V, V = F, F = L, L = p($, N), $ = M, M = x, x = A, A = p(N, I);
            E[0] = p(A, E[0]), E[1] = p(x, E[1]), E[2] = p(M, E[2]), E[3] = p($, E[3]), E[4] = p(L, E[4]), E[5] = p(F, E[5]), E[6] = p(V, E[6]), E[7] = p(q, E[7]);
          }
          return E;
        }
        var h = n("./helpers"), m = function(b, O) {
          return b >>> O | b << 32 - O;
        }, y = function(b, O) {
          return b >>> O;
        };
        r.exports = function(b) {
          return h.hash(b, g, 32, !0);
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 10: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        o.read = function(p, g, h, m, k) {
          var b, O, N = 8 * k - m - 1, S = (1 << N) - 1, E = S >> 1, C = -7, I = h ? k - 1 : 0, _ = h ? -1 : 1, k = p[g + I];
          for (I += _, b = k & (1 << -C) - 1, k >>= -C, C += N; 0 < C; b = 256 * b + p[g + I], I += _, C -= 8)
            ;
          for (O = b & (1 << -C) - 1, b >>= -C, C += m; 0 < C; O = 256 * O + p[g + I], I += _, C -= 8)
            ;
          if (b === 0)
            b = 1 - E;
          else {
            if (b === S)
              return O ? NaN : 1 / 0 * (k ? -1 : 1);
            O += Math.pow(2, m), b -= E;
          }
          return (k ? -1 : 1) * O * Math.pow(2, b - m);
        }, o.write = function(p, g, h, m, y, A) {
          var O, N, S = 8 * A - y - 1, E = (1 << S) - 1, C = E >> 1, I = y === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, _ = m ? 0 : A - 1, k = m ? 1 : -1, A = g < 0 || g === 0 && 1 / g < 0 ? 1 : 0;
          for (g = Math.abs(g), isNaN(g) || g === 1 / 0 ? (N = isNaN(g) ? 1 : 0, O = E) : (O = Math.floor(Math.log(g) / Math.LN2), g * (m = Math.pow(2, -O)) < 1 && (O--, m *= 2), 2 <= (g += 1 <= O + C ? I / m : I * Math.pow(2, 1 - C)) * m && (O++, m /= 2), E <= O + C ? (N = 0, O = E) : 1 <= O + C ? (N = (g * m - 1) * Math.pow(2, y), O += C) : (N = g * Math.pow(2, C - 1) * Math.pow(2, y), O = 0)); 8 <= y; p[h + _] = 255 & N, _ += k, N /= 256, y -= 8)
            ;
          for (O = O << y | N, S += y; 0 < S; p[h + _] = 255 & O, _ += k, O /= 256, S -= 8)
            ;
          p[h + _ - k] |= 128 * A;
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/ieee754/index.js", "/node_modules/gulp-browserify/node_modules/ieee754");
    }, { buffer: 3, lYpoI2: 11 }], 11: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        var p, g, h;
        function m() {
        }
        (a = r.exports = {}).nextTick = (g = typeof window < "u" && window.setImmediate, h = typeof window < "u" && window.postMessage && window.addEventListener, g ? function(y) {
          return window.setImmediate(y);
        } : h ? (p = [], window.addEventListener("message", function(y) {
          var b = y.source;
          b !== window && b !== null || y.data !== "process-tick" || (y.stopPropagation(), 0 < p.length && p.shift()());
        }, !0), function(y) {
          p.push(y), window.postMessage("process-tick", "*");
        }) : function(y) {
          setTimeout(y, 0);
        }), a.title = "browser", a.browser = !0, a.env = {}, a.argv = [], a.on = m, a.addListener = m, a.once = m, a.off = m, a.removeListener = m, a.removeAllListeners = m, a.emit = m, a.binding = function(y) {
          throw new Error("process.binding is not supported");
        }, a.cwd = function() {
          return "/";
        }, a.chdir = function(y) {
          throw new Error("process.chdir is not supported");
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/process/browser.js", "/node_modules/gulp-browserify/node_modules/process");
    }, { buffer: 3, lYpoI2: 11 }] }, {}, [1])(1);
  });
})(Qp);
var wb = Qp.exports;
const Cb = /* @__PURE__ */ Zr(wb), bl = [
  "Processed",
  "SelfRebooked",
  "ForceCancellation"
], iu = [
  {
    itemCategoryId: 1,
    quantity: 2,
    itemCategoryName: "",
    orderPriority: 1
  }
], ut = jn(
  "cart",
  () => {
    const e = Q({
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
    }), t = Q([
      ...iu
    ]), n = Q(Date.now()), r = Q(null), o = Q(null), a = te(
      () => {
        var $;
        return ($ = e.value) == null ? void 0 : $.items.map((L) => Rn.getCartProduct(L));
      }
    ), i = ($) => te(() => {
      const L = t.value.find(
        (F) => F.itemCategoryId === $
      );
      return typeof L < "u" ? L.quantity : 0;
    }), l = te(() => !!(e.value.customerInfo.email && e.value.customerInfo.name && e.value.customerInfo.hasTermsAndConditionsApproved)), s = te(() => e.value ? bl.includes(e.value.status) : !1), c = te(() => Cb(e.value) + n.value), u = te(() => {
      var $;
      return (($ = a.value) == null ? void 0 : $.length) || 0;
    }), f = te(() => {
      var $;
      return (($ = e.value) == null ? void 0 : $.vouchers) || [];
    }), d = te(() => f.value.length !== 0), v = te(() => e.value.cartId), p = te(() => {
      var $;
      return ($ = e.value) == null ? void 0 : $.vouchers.map((L) => {
        var q;
        const F = L.description;
        let V = L.value;
        return L.type === "Percentage" && (V = ((q = e.value) == null ? void 0 : q.totalPrice) / 100 * L.value), { title: F, amount: V };
      });
    }), g = te(() => {
      let $ = !1;
      for (const L of a.value)
        if (L.isExpired && ($ = L.isExpired, L.isExpired))
          break;
      return $;
    }), h = te(() => {
      if (o.value)
        return fe(o.value).tz("Europe/Amsterdam");
    }), m = ($) => {
      !$ || o.value || (o.value = $, setInterval(() => {
        o.value = fe(o.value).add(1, "second").toISOString();
      }, 1e3));
    }, y = ($ = Date.now()) => {
      r.value = null, n.value = $;
    }, b = () => {
      y(0);
    }, O = ($, L = 0) => {
      const F = t.value.find(
        (V) => V.itemCategoryId === $
      );
      if (typeof F < "u") {
        if (F.quantity = L, L === 0) {
          const V = iu.find(
            (q) => q.itemCategoryId === $
          );
          typeof V < "u" && (F.quantity = V.quantity);
        }
      } else
        t.value.push({
          quantity: L,
          itemCategoryId: $,
          itemCategoryName: "",
          orderPriority: 0
        });
    }, N = async () => {
      e.value = await vt.recalculate(v.value);
    }, S = ($) => {
      var F, V;
      let L = (F = e.value) == null ? void 0 : F.items.find(
        (q) => {
          var B;
          return ((B = q.item) == null ? void 0 : B.cartItemId) === +$;
        }
      );
      return typeof L > "u" && (L = (V = e.value) == null ? void 0 : V.items.find(
        (q) => {
          var B;
          return ((B = q.packageGroup) == null ? void 0 : B.cartPackageGroupId) === $;
        }
      )), L;
    }, E = async () => {
      var $;
      if (($ = e.value) != null && $.cartId && s)
        try {
          e.value = await vt.getCart(e.value.cartId);
        } catch {
          e.value = await vt.getNewCart();
        }
      else
        await C();
    }, C = async () => {
      e.value = await vt.getNewCart(), b();
    }, I = async ($) => {
      var L;
      if ((L = e.value) != null && L.cartId)
        try {
          const F = await vt.addCartItem(e.value.cartId, $);
          e.value = F.cart, b(), window.dispatchEvent(new CustomEvent("th:cartItemIsAdded"));
        } catch (F) {
          if (F instanceof It) {
            if (F.statusCode === 403) {
              await C(), await I($);
              return;
            }
            throw F;
          }
        }
    }, _ = async ($, L = !1) => {
      var F;
      if ((F = e.value) != null && F.cartId)
        try {
          const V = await vt.deleteCartItem(
            e.value.cartId,
            $,
            L
          );
          e.value = V.cart, b();
        } catch (V) {
          if (V instanceof It)
            if (V.statusCode === 403)
              await C(), await _($, L);
            else
              throw V;
        }
    }, k = async () => {
      var $;
      if (($ = e.value) != null && $.cartId)
        try {
          return await vt.getCartUpsells(e.value.cartId);
        } catch (L) {
          if (L instanceof It)
            if (L.statusCode === 403)
              await C();
            else
              throw L;
        }
    }, A = async ($) => {
      var L;
      if ((L = e.value) != null && L.cartId)
        try {
          e.value = (await vt.setVoucher(e.value.cartId, $)).cart, b();
        } catch (F) {
          if (F instanceof It)
            if (F.statusCode === 403)
              await C(), await A($);
            else
              throw F;
        }
    }, x = async ($) => {
      var L;
      if ((L = e.value) != null && L.cartId)
        try {
          e.value = (await vt.deleteVoucher(e.value.cartId, $)).cart, b();
        } catch (F) {
          if (F instanceof It)
            if (F.statusCode === 403)
              await C(), await x($);
            else
              throw F;
        }
    }, M = async ($) => {
      var L, F;
      if ((L = e.value) != null && L.cartId)
        try {
          e.value = await vt.updateCustomerInfo(e.value.cartId, {
            ...(F = e.value) == null ? void 0 : F.customerInfo,
            ...$
          }), b();
        } catch (V) {
          if (V instanceof It)
            if (V.statusCode === 403)
              await C(), await M($);
            else
              throw V;
        }
    };
    return {
      setServerTime: m,
      getServerTime: h,
      cart: e,
      lastPayCartRequestTime: n,
      items: a,
      count: u,
      vouchers: f,
      isVouchersApplied: d,
      discountSummaries: p,
      cartId: v,
      cartHash: c,
      isExpired: g,
      dropinSession: r,
      isTicketsAvailableForDownload: s,
      isCustomerInfoFilled: l,
      recalculate: N,
      updateLastPayCartRequest: y,
      clearLastPayCartRequest: b,
      getCart: E,
      getItemByCartItemId: S,
      addCartItem: I,
      deleteCartItem: _,
      setVoucher: A,
      deleteVoucher: x,
      updateCustomerInfo: M,
      createNewCart: C,
      preselectedVisitors: t,
      getCategoryPreselectQuantity: i,
      updateCategoryPreselectQuantity: O,
      getUpsellItems: k
    };
  },
  {
    persist: !0
  }
), em = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  availableTicketsStatutes: bl,
  useCartStore: ut
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
    return await Jv(async () => {
      var p, g, h, m;
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
      const { setServerTime: d } = ut(), v = f.headers.get("Date");
      return d(v), (p = f.headers.get("Content-type")) != null && p.includes("application/json") ? c = await f.json() : (g = f.headers.get("Content-type")) != null && g.includes("application/pdf") ? c = await f.blob() : c = await f.text(), f.ok ? (h = f.headers.get("Content-type")) != null && h.includes("application/pdf") ? {
        blob: c,
        filename: (m = f.headers.get("Content-Disposition")) == null ? void 0 : m.split("filename=")[1].split(";")[0]
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
    return delete n["x-cart-id"], await t.get(
      "cart/new",
      {
        // @ts-ignore
        headers: n
      },
      !0
    );
  }, e.recalculate = async (n) => await t.get("cart/recalculate", {
    params: { cartId: n }
  }), e.getCart = async (n) => await t.get("cart", {
    params: { cartId: n }
  }), e.addCartItem = async (n, r) => await t.post("cart/item", {
    params: {
      cartId: n
    },
    body: JSON.stringify(r)
  }), e.deleteCartItem = async (n, r, o = !1) => {
    const a = o ? "cartPackageGroupId" : "cartItemId", i = { cartId: n };
    return i[a] = r, await t.delete("cart/item", {
      params: i
    });
  }, e.setVoucher = async (n, r) => await t.post("cart/voucher", {
    params: {
      cartId: n,
      voucherCode: r
    }
  }), e.deleteVoucher = async (n, r) => await t.delete("cart/voucher", {
    params: {
      cartId: n,
      voucherCode: r
    }
  }), e.updateCustomerInfo = async (n, r) => await t.post("cart/customer-info", {
    params: {
      cartId: n
    },
    body: JSON.stringify(r)
  }), e.getCartUpsells = async (n, r) => await t.get("upsell/cart", {
    params: {
      cartId: n,
      cityId: r
    }
  });
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
var Ya;
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
})(Ya || (Ya = {}));
var ja;
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
})(ja || (ja = {}));
const Tb = (e, t, n = "/actions/ticket-hub/currencies", r = "", o = !1, a = "", i) => {
  new URL("api/", window.location.origin);
  const l = e, s = new URL(n, window.location.origin);
  o || Ha.init(s.href), typeof i < "u" && Ya.init(i), vt.init(l, t, r, a), hr.init(l, t, r, a), $o.init(l, t, r, a), ja.init(l, t, r, a);
}, hi = jn("cart-dialog", () => {
  const e = Q(!1);
  Ne(e, (r) => {
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
}, Sb = {}, kb = {
  width: "14",
  height: "14",
  viewBox: "0 0 14 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, Ib = /* @__PURE__ */ z("path", {
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
}, null, -1), Ob = [
  Ib
];
function Pb(e, t) {
  return U(), X("svg", kb, Ob);
}
const Db = /* @__PURE__ */ ge(Sb, [["render", Pb]]), Ab = /* @__PURE__ */ me({
  __name: "CloseButton",
  props: {
    tag: { default: "button" },
    to: {}
  },
  setup(e) {
    return (t, n) => (U(), ue(ii(t.tag), {
      class: "th-close-btn",
      to: t.to,
      bg: "accent",
      type: "button"
    }, {
      default: we(() => [
        G(Db)
      ]),
      _: 1
    }, 8, ["to"]));
  }
}), tm = /* @__PURE__ */ ge(Ab, [["__scopeId", "data-v-d7b7cafe"]]);
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
function $b(e) {
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
function nm(e) {
  return e || e === null || process.env.NODE_ENV === "production" ? !1 : (process.env.NODE_ENV !== "test" && console.warn("If scrolling is also required in the floating layer, the target element must be provided."), !0);
}
function El() {
  return "__BSL_PREVENT_DEFAULT__" in window || (window.__BSL_PREVENT_DEFAULT__ = function(e) {
    e.cancelable && e.preventDefault();
  }), window.__BSL_PREVENT_DEFAULT__;
}
var Oa = {
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
    return Oa;
  if (!(e != null && e.useGlobalLockState))
    return gi.lockState;
  var t = "__BSL_LOCK_STATE__" in window ? Object.assign(Object.assign({}, Oa), window.__BSL_LOCK_STATE__) : Oa;
  return window.__BSL_LOCK_STATE__ = t, t;
}
gi.lockState = Oa;
function Nb(e, t, n) {
  if (t) {
    var r = t.scrollTop, o = t.scrollLeft, a = t.scrollWidth, i = t.scrollHeight, l = t.clientWidth, s = t.clientHeight, c = e.targetTouches[0].clientX - n.clientX, u = e.targetTouches[0].clientY - n.clientY, f = Math.abs(u) > Math.abs(c), d = u > 0 && r === 0, v = c > 0 && o === 0, p = c < 0 && o + l + 1 >= a, g = u < 0 && r + s + 1 >= i;
    if (f && (d || g) || !f && (v || p))
      return El()(e);
  }
  return e.stopPropagation(), !0;
}
function Lb() {
  var e = document.documentElement, t = Object.assign({}, e.style), n = window.innerWidth - e.clientWidth, r = parseInt(window.getComputedStyle(e).paddingRight, 10);
  return e.style.overflow = "hidden", e.style.boxSizing = "border-box", e.style.paddingRight = "".concat(n + r, "px"), function() {
    ["overflow", "boxSizing", "paddingRight"].forEach(function(o) {
      e.style[o] = t[o] || "";
    });
  };
}
function Rb(e) {
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
var rm = $b({
  passive: !1
});
function om(e, t) {
  if (!vi()) {
    nm(e);
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
            a.targetTouches.length === 1 && Nb(a, o, n.initialClientPos);
          }, n.lockedElements.push(o));
        });
      }
      n.documentListenerAdded || (document.addEventListener("touchmove", El(), rm), n.documentListenerAdded = !0);
    } else
      n.lockedNum <= 0 && (n.unLockCallback = Rs().android ? Rb(t) : Lb());
    n.lockedNum += 1;
  }
}
function am(e, t) {
  if (!vi()) {
    nm(e);
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
      n.documentListenerAdded && (document.removeEventListener("touchmove", El(), rm), n.documentListenerAdded = !1);
    }
  }
}
const Mb = /* @__PURE__ */ me({
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
    return rt(() => {
      om(t.value, { useGlobalLockState: !0, overflowType: "clip" }), window.addEventListener("keydown", r);
    }), Jr(() => {
      am(t.value, { useGlobalLockState: !0, overflowType: "clip" }), window.removeEventListener("keydown", r);
    }), (o, a) => (U(), X("div", {
      ref_key: "dialog",
      ref: t,
      class: "th-dialog"
    }, [
      z("div", {
        class: "th-dialog__overlay th-down-lg:hidden",
        onClick: a[0] || (a[0] = //@ts-ignore
        (...i) => o.toggle && o.toggle(...i))
      }),
      z("div", {
        class: be([{ "th-dialog__content_center": n.center }, "th-dialog__content"])
      }, [
        G(tm, {
          class: be([{ "th-dialog__close-btn_center": n.center }, "th-dialog__close-btn"]),
          type: "button",
          onClick: o.toggle
        }, null, 8, ["class", "onClick"]),
        Yn(o.$slots, "default", {}, void 0, !0)
      ], 2)
    ], 512));
  }
}), wl = /* @__PURE__ */ ge(Mb, [["__scopeId", "data-v-2181161d"]]);
/*!
  * vue-router v4.3.2
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */
const rn = typeof document < "u";
function xb(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const Ie = Object.assign;
function qi(e, t) {
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
const im = /#/g, Bb = /&/g, Vb = /\//g, Ub = /=/g, Fb = /\?/g, sm = /\+/g, Hb = /%5B/g, Yb = /%5D/g, lm = /%5E/g, jb = /%60/g, cm = /%7B/g, Wb = /%7C/g, um = /%7D/g, zb = /%20/g;
function Cl(e) {
  return encodeURI("" + e).replace(Wb, "|").replace(Hb, "[").replace(Yb, "]");
}
function qb(e) {
  return Cl(e).replace(cm, "{").replace(um, "}").replace(lm, "^");
}
function Ms(e) {
  return Cl(e).replace(sm, "%2B").replace(zb, "+").replace(im, "%23").replace(Bb, "%26").replace(jb, "`").replace(cm, "{").replace(um, "}").replace(lm, "^");
}
function Gb(e) {
  return Ms(e).replace(Ub, "%3D");
}
function Xb(e) {
  return Cl(e).replace(im, "%23").replace(Fb, "%3F");
}
function Kb(e) {
  return e == null ? "" : Xb(e).replace(Vb, "%2F");
}
function jr(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && _e(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const Jb = /\/$/, Zb = (e) => e.replace(Jb, "");
function Gi(e, t, n = "/") {
  let r, o = {}, a = "", i = "";
  const l = t.indexOf("#");
  let s = t.indexOf("?");
  return l < s && l >= 0 && (s = -1), s > -1 && (r = t.slice(0, s), a = t.slice(s + 1, l > -1 ? l : t.length), o = e(a)), l > -1 && (r = r || t.slice(0, l), i = t.slice(l, t.length)), r = t0(r ?? t, n), {
    fullPath: r + (a && "?") + a + i,
    path: r,
    query: o,
    hash: jr(i)
  };
}
function Qb(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function su(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function lu(e, t, n) {
  const r = t.matched.length - 1, o = n.matched.length - 1;
  return r > -1 && r === o && Mn(t.matched[r], n.matched[o]) && dm(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function Mn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function dm(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!e0(e[n], t[n]))
      return !1;
  return !0;
}
function e0(e, t) {
  return Tt(e) ? cu(e, t) : Tt(t) ? cu(t, e) : e === t;
}
function cu(e, t) {
  return Tt(t) ? e.length === t.length && e.every((n, r) => n === t[r]) : e.length === 1 && e[0] === t;
}
function t0(e, t) {
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
function n0(e) {
  if (!e)
    if (rn) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Zb(e);
}
const r0 = /^[^#]+#/;
function o0(e, t) {
  return e.replace(r0, "#") + t;
}
function a0(e, t) {
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
function i0(e) {
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
    t = a0(o, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function uu(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const xs = /* @__PURE__ */ new Map();
function s0(e, t) {
  xs.set(e, t);
}
function l0(e) {
  const t = xs.get(e);
  return xs.delete(e), t;
}
let c0 = () => location.protocol + "//" + location.host;
function fm(e, t) {
  const { pathname: n, search: r, hash: o } = t, a = e.indexOf("#");
  if (a > -1) {
    let l = o.includes(e.slice(a)) ? e.slice(a).length : 1, s = o.slice(l);
    return s[0] !== "/" && (s = "/" + s), su(s, "");
  }
  return su(n, e) + r + o;
}
function u0(e, t, n, r) {
  let o = [], a = [], i = null;
  const l = ({ state: d }) => {
    const v = fm(e, location), p = n.value, g = t.value;
    let h = 0;
    if (d) {
      if (n.value = v, t.value = d, i && i === p) {
        i = null;
        return;
      }
      h = g ? d.position - g.position : 0;
    } else
      r(v);
    o.forEach((m) => {
      m(n.value, p, {
        delta: h,
        type: No.pop,
        direction: h ? h > 0 ? _o.forward : _o.back : _o.unknown
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
function du(e, t, n, r = !1, o = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: o ? yi() : null
  };
}
function d0(e) {
  const { history: t, location: n } = window, r = {
    value: fm(e, n)
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
    const f = e.indexOf("#"), d = f > -1 ? (n.host && document.querySelector("base") ? e : e.slice(f)) + s : c0() + e + s;
    try {
      t[u ? "replaceState" : "pushState"](c, "", d), o.value = c;
    } catch (v) {
      process.env.NODE_ENV !== "production" ? _e("Error with push/replace State", v) : console.error(v), n[u ? "replace" : "assign"](d);
    }
  }
  function i(s, c) {
    const u = Ie({}, t.state, du(
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
    const f = Ie({}, du(r.value, s, null), { position: u.position + 1 }, c);
    a(s, f, !1), r.value = s;
  }
  return {
    location: r,
    state: o,
    push: l,
    replace: i
  };
}
function f0(e) {
  e = n0(e);
  const t = d0(e), n = u0(e, t.state, t.location, t.replace);
  function r(a, i = !0) {
    i || n.pauseListeners(), history.go(a);
  }
  const o = Ie({
    // it's overridden right after
    location: "",
    base: e,
    go: r,
    createHref: o0.bind(null, e)
  }, t, n);
  return Object.defineProperty(o, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(o, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), o;
}
function Wa(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function pm(e) {
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
var fu;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(fu || (fu = {}));
const p0 = {
  1({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  2({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${h0(t)}" via a navigation guard.`;
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
function Wr(e, t) {
  return process.env.NODE_ENV !== "production" ? Ie(new Error(p0[e](t)), {
    type: e,
    [Bs]: !0
  }, t) : Ie(new Error(), {
    type: e,
    [Bs]: !0
  }, t);
}
function nn(e, t) {
  return e instanceof Error && Bs in e && (t == null || !!(e.type & t));
}
const m0 = ["params", "query", "hash"];
function h0(e) {
  if (typeof e == "string")
    return e;
  if (e.path != null)
    return e.path;
  const t = {};
  for (const n of m0)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const pu = "[^/]+?", v0 = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, g0 = /[.+*?^${}()[\]/\\]/g;
function y0(e, t) {
  const n = Ie({}, v0, t), r = [];
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
        f || (o += "/"), o += d.value.replace(g0, "\\$&"), v += 40;
      else if (d.type === 1) {
        const { value: p, repeatable: g, optional: h, regexp: m } = d;
        a.push({
          name: p,
          repeatable: g,
          optional: h
        });
        const y = m || pu;
        if (y !== pu) {
          v += 10;
          try {
            new RegExp(`(${y})`);
          } catch (O) {
            throw new Error(`Invalid custom RegExp for param "${p}" (${y}): ` + O.message);
          }
        }
        let b = g ? `((?:${y})(?:/(?:${y}))*)` : `(${y})`;
        f || (b = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        h && c.length < 2 ? `(?:/${b})` : "/" + b), h && (b += "?"), o += b, v += 20, h && (v += -8), g && (v += -20), y === ".*" && (v += -50);
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
          const { value: p, repeatable: g, optional: h } = v, m = p in c ? c[p] : "";
          if (Tt(m) && !g)
            throw new Error(`Provided param "${p}" is an array but it is not repeatable (* or + modifiers)`);
          const y = Tt(m) ? m.join("/") : m;
          if (!y)
            if (h)
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
function _0(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r)
      return r;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0;
}
function b0(e, t) {
  let n = 0;
  const r = e.score, o = t.score;
  for (; n < r.length && n < o.length; ) {
    const a = _0(r[n], o[n]);
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
const E0 = {
  type: 0,
  value: ""
}, w0 = /[a-zA-Z0-9_]/;
function C0(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[E0]];
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
        s === "(" ? n = 2 : w0.test(s) ? d() : (f(), n = 0, s !== "*" && s !== "?" && s !== "+" && l--);
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
function T0(e, t, n) {
  const r = y0(C0(e.path), n);
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
function S0(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  t = gu({ strict: !1, end: !0, sensitive: !1 }, t);
  function o(u) {
    return r.get(u);
  }
  function a(u, f, d) {
    const v = !d, p = k0(u);
    process.env.NODE_ENV !== "production" && D0(p, f), p.aliasOf = d && d.record;
    const g = gu(t, u), h = [
      p
    ];
    if ("alias" in u) {
      const b = typeof u.alias == "string" ? [u.alias] : u.alias;
      for (const O of b)
        h.push(Ie({}, p, {
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
    let m, y;
    for (const b of h) {
      const { path: O } = b;
      if (f && O[0] !== "/") {
        const N = f.record.path, S = N[N.length - 1] === "/" ? "" : "/";
        b.path = f.record.path + (O && S + O);
      }
      if (process.env.NODE_ENV !== "production" && b.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (m = T0(b, f, g), process.env.NODE_ENV !== "production" && f && O[0] === "/" && A0(m, f), d ? (d.alias.push(m), process.env.NODE_ENV !== "production" && P0(d, m)) : (y = y || m, y !== m && y.alias.push(m), v && u.name && !vu(m) && i(u.name)), p.children) {
        const N = p.children;
        for (let S = 0; S < N.length; S++)
          a(N[S], m, d && d.children[S]);
      }
      d = d || m, (m.record.components && Object.keys(m.record.components).length || m.record.name || m.record.redirect) && s(m);
    }
    return y ? () => {
      i(y);
    } : yo;
  }
  function i(u) {
    if (pm(u)) {
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
    for (; f < n.length && b0(u, n[f]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (u.record.path !== n[f].record.path || !mm(u, n[f])); )
      f++;
    n.splice(f, 0, u), u.record.name && !vu(u) && r.set(u.record.name, u);
  }
  function c(u, f) {
    let d, v = {}, p, g;
    if ("name" in u && u.name) {
      if (d = r.get(u.name), !d)
        throw Wr(1, {
          location: u
        });
      if (process.env.NODE_ENV !== "production") {
        const y = Object.keys(u.params || {}).filter((b) => !d.keys.find((O) => O.name === b));
        y.length && _e(`Discarded invalid param(s) "${y.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      g = d.record.name, v = Ie(
        // paramsFromLocation is a new object
        hu(
          f.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          d.keys.filter((y) => !y.optional).concat(d.parent ? d.parent.keys.filter((y) => y.optional) : []).map((y) => y.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        u.params && hu(u.params, d.keys.map((y) => y.name))
      ), p = d.stringify(v);
    } else if (u.path != null)
      p = u.path, process.env.NODE_ENV !== "production" && !p.startsWith("/") && _e(`The Matcher cannot resolve relative paths but received "${p}". Unless you directly called \`matcher.resolve("${p}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), d = n.find((y) => y.re.test(p)), d && (v = d.parse(p), g = d.record.name);
    else {
      if (d = f.name ? r.get(f.name) : n.find((y) => y.re.test(f.path)), !d)
        throw Wr(1, {
          location: u,
          currentLocation: f
        });
      g = d.record.name, v = Ie({}, f.params, u.params), p = d.stringify(v);
    }
    const h = [];
    let m = d;
    for (; m; )
      h.unshift(m.record), m = m.parent;
    return {
      name: g,
      path: p,
      params: v,
      matched: h,
      meta: O0(h)
    };
  }
  return e.forEach((u) => a(u)), { addRoute: a, resolve: c, removeRoute: i, getRoutes: l, getRecordMatcher: o };
}
function hu(e, t) {
  const n = {};
  for (const r of t)
    r in e && (n[r] = e[r]);
  return n;
}
function k0(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: I0(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function I0(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e)
    t.default = n;
  else
    for (const r in e.components)
      t[r] = typeof n == "object" ? n[r] : n;
  return t;
}
function vu(e) {
  for (; e; ) {
    if (e.record.aliasOf)
      return !0;
    e = e.parent;
  }
  return !1;
}
function O0(e) {
  return e.reduce((t, n) => Ie(t, n.meta), {});
}
function gu(e, t) {
  const n = {};
  for (const r in e)
    n[r] = r in t ? t[r] : e[r];
  return n;
}
function Vs(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function P0(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(Vs.bind(null, n)))
      return _e(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(Vs.bind(null, n)))
      return _e(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function D0(e, t) {
  t && t.record.name && !e.name && !e.path && _e(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function A0(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(Vs.bind(null, n)))
      return _e(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function mm(e, t) {
  return t.children.some((n) => n === e || mm(e, n));
}
function $0(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const r = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let o = 0; o < r.length; ++o) {
    const a = r[o].replace(sm, " "), i = a.indexOf("="), l = jr(i < 0 ? a : a.slice(0, i)), s = i < 0 ? null : jr(a.slice(i + 1));
    if (l in t) {
      let c = t[l];
      Tt(c) || (c = t[l] = [c]), c.push(s);
    } else
      t[l] = s;
  }
  return t;
}
function yu(e) {
  let t = "";
  for (let n in e) {
    const r = e[n];
    if (n = Gb(n), r == null) {
      r !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (Tt(r) ? r.map((a) => a && Ms(a)) : [r && Ms(r)]).forEach((a) => {
      a !== void 0 && (t += (t.length ? "&" : "") + n, a != null && (t += "=" + a));
    });
  }
  return t;
}
function N0(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 && (t[n] = Tt(r) ? r.map((o) => o == null ? null : "" + o) : r == null ? r : "" + r);
  }
  return t;
}
const L0 = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), _u = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), _i = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), Tl = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), Us = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
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
      d === !1 ? s(Wr(4, {
        from: n,
        to: t
      })) : d instanceof Error ? s(d) : Wa(d) ? s(Wr(2, {
        from: t,
        to: d
      })) : (i && // since enterCallbackArray is truthy, both record and name also are
      r.enterCallbacks[o] === i && typeof d == "function" && i.push(d), l());
    }, u = a(() => e.call(r && r.instances[o], t, n, process.env.NODE_ENV !== "production" ? R0(c, t, n) : c));
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
function R0(e, t, n) {
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
        if (M0(s)) {
          const u = (s.__vccOpts || s)[t];
          u && a.push(Cn(u, n, r, i, l, o));
        } else {
          let c = s();
          process.env.NODE_ENV !== "production" && !("catch" in c) && (_e(`Component "${l}" in record with path "${i.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), c = Promise.resolve(c)), a.push(() => c.then((u) => {
            if (!u)
              return Promise.reject(new Error(`Couldn't resolve component "${l}" at "${i.path}"`));
            const f = xb(u) ? u.default : u;
            i.components[l] = f;
            const v = (f.__vccOpts || f)[t];
            return v && Cn(v, n, r, i, l, o)();
          }));
        }
    }
  }
  return a;
}
function M0(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function bu(e) {
  const t = _t(_i), n = _t(Tl);
  let r = !1, o = null;
  const a = te(() => {
    const u = W(e.to);
    return process.env.NODE_ENV !== "production" && (!r || u !== o) && (Wa(u) || (r ? _e(`Invalid value for prop "to" in useLink()
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
    const g = Eu(u[f - 2]);
    return (
      // we are dealing with nested routes
      f > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      Eu(d) === g && // avoid comparing the child with its parent
      v[v.length - 1].path !== g ? v.findIndex(Mn.bind(null, u[f - 2])) : p
    );
  }), l = te(() => i.value > -1 && U0(n.params, a.value.params)), s = te(() => i.value > -1 && i.value === n.matched.length - 1 && dm(n.params, a.value.params));
  function c(u = {}) {
    return V0(u) ? t[W(e.replace) ? "replace" : "push"](
      W(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(yo) : Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && rn) {
    const u = Hn();
    if (u) {
      const f = {
        route: a.value,
        isActive: l.value,
        isExactActive: s.value,
        error: null
      };
      u.__vrl_devtools = u.__vrl_devtools || [], u.__vrl_devtools.push(f), Ct(() => {
        f.route = a.value, f.isActive = l.value, f.isExactActive = s.value, f.error = Wa(W(e.to)) ? null : 'Invalid "to" value';
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
const x0 = /* @__PURE__ */ me({
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
  useLink: bu,
  setup(e, { slots: t }) {
    const n = jo(bu(e)), { options: r } = _t(_i), o = te(() => ({
      [wu(e.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [wu(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
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
}), B0 = x0;
function V0(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function U0(e, t) {
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
function Eu(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const wu = (e, t, n) => e ?? t ?? n, F0 = /* @__PURE__ */ me({
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
    process.env.NODE_ENV !== "production" && Y0();
    const r = _t(Us), o = te(() => e.route || r.value), a = _t(_u, 0), i = te(() => {
      let c = W(a);
      const { matched: u } = o.value;
      let f;
      for (; (f = u[c]) && !f.components; )
        c++;
      return c;
    }), l = te(() => o.value.matched[i.value]);
    An(_u, te(() => i.value + 1)), An(L0, l), An(Us, o);
    const s = Q();
    return Ne(() => [s.value, l.value, e.name], ([c, u, f], [d, v, p]) => {
      u && (u.instances[f] = c, v && v !== u && c && c === d && (u.leaveGuards.size || (u.leaveGuards = v.leaveGuards), u.updateGuards.size || (u.updateGuards = v.updateGuards))), c && u && // if there is no instance but to and from are the same this might be
      // the first visit
      (!v || !Mn(u, v) || !d) && (u.enterCallbacks[f] || []).forEach((g) => g(c));
    }, { flush: "post" }), () => {
      const c = o.value, u = e.name, f = l.value, d = f && f.components[u];
      if (!d)
        return Cu(n.default, { Component: d, route: c });
      const v = f.props[u], p = v ? v === !0 ? c.params : typeof v == "function" ? v(c) : v : null, h = dr(d, Ie({}, p, t, {
        onVnodeUnmounted: (m) => {
          m.component.isUnmounted && (f.instances[u] = null);
        },
        ref: s
      }));
      if (process.env.NODE_ENV !== "production" && rn && h.ref) {
        const m = {
          depth: i.value,
          name: f.name,
          path: f.path,
          meta: f.meta
        };
        (Tt(h.ref) ? h.ref.map((b) => b.i) : [h.ref.i]).forEach((b) => {
          b.__vrv_devtools = m;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        Cu(n.default, { Component: h, route: c }) || h
      );
    };
  }
});
function Cu(e, t) {
  if (!e)
    return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const H0 = F0;
function Y0() {
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
    matched: e.matched.map((r) => e1(r, ["instances", "children", "aliasOf"]))
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
function ha(e) {
  return {
    _custom: {
      display: e
    }
  };
}
let j0 = 0;
function W0(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const r = j0++;
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
          backgroundColor: hm
        });
      }
      Tt(f.__vrl_devtools) && (f.__devtoolsApi = o, f.__vrl_devtools.forEach((d) => {
        let v = d.route.path, p = ym, g = "", h = 0;
        d.error ? (v = d.error, p = K0, h = J0) : d.isExactActive ? (p = gm, g = "This is exactly active") : d.isActive && (p = vm, g = "This link is active"), u.tags.push({
          label: v,
          textColor: h,
          tooltip: g,
          backgroundColor: p
        });
      }));
    }), Ne(t.currentRoute, () => {
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
        guard: ha("beforeEach"),
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
        guard: ha("afterEach")
      };
      d ? (v.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: d ? d.message : "",
          tooltip: "Navigation Failure",
          value: d
        }
      }, v.status = ha("❌")) : v.status = ha("✅"), v.from = uo(f, "Current Location during this navigation"), v.to = uo(u, "Target location"), o.addTimelineEvent({
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
      f.forEach(Em), u.filter && (f = f.filter((d) => (
        // save matches state based on the payload
        Fs(d, u.filter.toLowerCase())
      ))), f.forEach((d) => bm(d, t.currentRoute.value)), u.rootNodes = f.map(_m);
    }
    let c;
    o.on.getInspectorTree((u) => {
      c = u, u.app === e && u.inspectorId === l && s();
    }), o.on.getInspectorState((u) => {
      if (u.app === e && u.inspectorId === l) {
        const d = n.getRoutes().find((v) => v.record.__vd_id === u.nodeId);
        d && (u.state = {
          options: q0(d)
        });
      }
    }), o.sendInspectorTree(l), o.sendInspectorState(l);
  });
}
function z0(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function q0(e) {
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
        display: e.keys.map((r) => `${r.name}${z0(r)}`).join(" "),
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
const hm = 15485081, vm = 2450411, gm = 8702998, G0 = 2282478, ym = 16486972, X0 = 6710886, K0 = 16704226, J0 = 12131356;
function _m(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: G0
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: ym
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: hm
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: gm
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: vm
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: X0
  });
  let r = n.__vd_id;
  return r == null && (r = String(Z0++), n.__vd_id = r), {
    id: r,
    label: n.path,
    tags: t,
    children: e.children.map(_m)
  };
}
let Z0 = 0;
const Q0 = /^\/(.*)\/([a-z]*)$/;
function bm(e, t) {
  const n = t.matched.length && Mn(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((r) => Mn(r, e.record))), e.children.forEach((r) => bm(r, t));
}
function Em(e) {
  e.__vd_match = !1, e.children.forEach(Em);
}
function Fs(e, t) {
  const n = String(e.re).match(Q0);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((i) => Fs(i, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const o = e.record.path.toLowerCase(), a = jr(o);
  return !t.startsWith("/") && (a.includes(t) || o.includes(t)) || a.startsWith(t) || o.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((i) => Fs(i, t));
}
function e1(e, t) {
  const n = {};
  for (const r in e)
    t.includes(r) || (n[r] = e[r]);
  return n;
}
function t1(e) {
  const t = S0(e.routes, e), n = e.parseQuery || $0, r = e.stringifyQuery || yu, o = e.history;
  if (process.env.NODE_ENV !== "production" && !o)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const a = co(), i = co(), l = co(), s = ll(wn);
  let c = wn;
  rn && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const u = qi.bind(null, (j) => "" + j), f = qi.bind(null, Kb), d = (
    // @ts-expect-error: intentionally avoid the type check
    qi.bind(null, jr)
  );
  function v(j, Y) {
    let w, P;
    return pm(j) ? (w = t.getRecordMatcher(j), process.env.NODE_ENV !== "production" && !w && _e(`Parent route "${String(j)}" not found when adding child route`, Y), P = Y) : P = j, t.addRoute(P, w);
  }
  function p(j) {
    const Y = t.getRecordMatcher(j);
    Y ? t.removeRoute(Y) : process.env.NODE_ENV !== "production" && _e(`Cannot remove non-existent route "${String(j)}"`);
  }
  function g() {
    return t.getRoutes().map((j) => j.record);
  }
  function h(j) {
    return !!t.getRecordMatcher(j);
  }
  function m(j, Y) {
    if (Y = Ie({}, Y || s.value), typeof j == "string") {
      const D = Gi(n, j, Y.path), H = t.resolve({ path: D.path }, Y), ee = o.createHref(D.fullPath);
      return process.env.NODE_ENV !== "production" && (ee.startsWith("//") ? _e(`Location "${j}" resolved to "${ee}". A resolved location cannot start with multiple slashes.`) : H.matched.length || _e(`No match found for location with path "${j}"`)), Ie(D, H, {
        params: d(H.params),
        hash: jr(D.hash),
        redirectedFrom: void 0,
        href: ee
      });
    }
    process.env.NODE_ENV !== "production" && !Wa(j) && (_e(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, j), j = {});
    let w;
    if (j.path != null)
      process.env.NODE_ENV !== "production" && "params" in j && !("name" in j) && // @ts-expect-error: the type is never
      Object.keys(j.params).length && _e(`Path "${j.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), w = Ie({}, j, {
        path: Gi(n, j.path, Y.path).path
      });
    else {
      const D = Ie({}, j.params);
      for (const H in D)
        D[H] == null && delete D[H];
      w = Ie({}, j, {
        params: f(D)
      }), Y.params = f(Y.params);
    }
    const P = t.resolve(w, Y), R = j.hash || "";
    process.env.NODE_ENV !== "production" && R && !R.startsWith("#") && _e(`A \`hash\` should always start with the character "#". Replace "${R}" with "#${R}".`), P.params = u(d(P.params));
    const K = Qb(r, Ie({}, j, {
      hash: qb(R),
      path: P.path
    })), T = o.createHref(K);
    return process.env.NODE_ENV !== "production" && (T.startsWith("//") ? _e(`Location "${j}" resolved to "${T}". A resolved location cannot start with multiple slashes.`) : P.matched.length || _e(`No match found for location with path "${j.path != null ? j.path : j}"`)), Ie({
      fullPath: K,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: R,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        r === yu ? N0(j.query) : j.query || {}
      )
    }, P, {
      redirectedFrom: void 0,
      href: T
    });
  }
  function y(j) {
    return typeof j == "string" ? Gi(n, j, s.value.path) : Ie({}, j);
  }
  function b(j, Y) {
    if (c !== j)
      return Wr(8, {
        from: Y,
        to: j
      });
  }
  function O(j) {
    return E(j);
  }
  function N(j) {
    return O(Ie(y(j), { replace: !0 }));
  }
  function S(j) {
    const Y = j.matched[j.matched.length - 1];
    if (Y && Y.redirect) {
      const { redirect: w } = Y;
      let P = typeof w == "function" ? w(j) : w;
      if (typeof P == "string" && (P = P.includes("?") || P.includes("#") ? P = y(P) : (
        // force empty params
        { path: P }
      ), P.params = {}), process.env.NODE_ENV !== "production" && P.path == null && !("name" in P))
        throw _e(`Invalid redirect found:
${JSON.stringify(P, null, 2)}
 when navigating to "${j.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return Ie({
        query: j.query,
        hash: j.hash,
        // avoid transferring params if the redirect has a path
        params: P.path != null ? {} : j.params
      }, P);
    }
  }
  function E(j, Y) {
    const w = c = m(j), P = s.value, R = j.state, K = j.force, T = j.replace === !0, D = S(w);
    if (D)
      return E(
        Ie(y(D), {
          state: typeof D == "object" ? Ie({}, R, D.state) : R,
          force: K,
          replace: T
        }),
        // keep original redirectedFrom if it exists
        Y || w
      );
    const H = w;
    H.redirectedFrom = Y;
    let ee;
    return !K && lu(r, P, w) && (ee = Wr(16, { to: H, from: P }), Z(
      P,
      P,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (ee ? Promise.resolve(ee) : _(H, P)).catch((ie) => nn(ie) ? (
      // navigation redirects still mark the router as ready
      nn(
        ie,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? ie : B(ie)
    ) : (
      // reject any unknown error
      V(ie, H, P)
    )).then((ie) => {
      if (ie) {
        if (nn(
          ie,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return process.env.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          lu(r, m(ie.to), H) && // and we have done it a couple of times
          Y && // @ts-expect-error: added only in dev
          (Y._count = Y._count ? (
            // @ts-expect-error
            Y._count + 1
          ) : 1) > 30 ? (_e(`Detected a possibly infinite redirection in a navigation guard when going from "${P.fullPath}" to "${H.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : E(
            // keep options
            Ie({
              // preserve an existing replacement but allow the redirect to override it
              replace: T
            }, y(ie.to), {
              state: typeof ie.to == "object" ? Ie({}, R, ie.to.state) : R,
              force: K
            }),
            // preserve the original redirectedFrom if any
            Y || H
          );
      } else
        ie = A(H, P, !0, T, R);
      return k(H, P, ie), ie;
    });
  }
  function C(j, Y) {
    const w = b(j, Y);
    return w ? Promise.reject(w) : Promise.resolve();
  }
  function I(j) {
    const Y = he.values().next().value;
    return Y && typeof Y.runWithContext == "function" ? Y.runWithContext(j) : j();
  }
  function _(j, Y) {
    let w;
    const [P, R, K] = n1(j, Y);
    w = Xi(P.reverse(), "beforeRouteLeave", j, Y);
    for (const D of P)
      D.leaveGuards.forEach((H) => {
        w.push(Cn(H, j, Y));
      });
    const T = C.bind(null, j, Y);
    return w.push(T), ne(w).then(() => {
      w = [];
      for (const D of a.list())
        w.push(Cn(D, j, Y));
      return w.push(T), ne(w);
    }).then(() => {
      w = Xi(R, "beforeRouteUpdate", j, Y);
      for (const D of R)
        D.updateGuards.forEach((H) => {
          w.push(Cn(H, j, Y));
        });
      return w.push(T), ne(w);
    }).then(() => {
      w = [];
      for (const D of K)
        if (D.beforeEnter)
          if (Tt(D.beforeEnter))
            for (const H of D.beforeEnter)
              w.push(Cn(H, j, Y));
          else
            w.push(Cn(D.beforeEnter, j, Y));
      return w.push(T), ne(w);
    }).then(() => (j.matched.forEach((D) => D.enterCallbacks = {}), w = Xi(K, "beforeRouteEnter", j, Y, I), w.push(T), ne(w))).then(() => {
      w = [];
      for (const D of i.list())
        w.push(Cn(D, j, Y));
      return w.push(T), ne(w);
    }).catch((D) => nn(
      D,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? D : Promise.reject(D));
  }
  function k(j, Y, w) {
    l.list().forEach((P) => I(() => P(j, Y, w)));
  }
  function A(j, Y, w, P, R) {
    const K = b(j, Y);
    if (K)
      return K;
    const T = Y === wn, D = rn ? history.state : {};
    w && (P || T ? o.replace(j.fullPath, Ie({
      scroll: T && D && D.scroll
    }, R)) : o.push(j.fullPath, R)), s.value = j, Z(j, Y, w, T), B();
  }
  let x;
  function M() {
    x || (x = o.listen((j, Y, w) => {
      if (!Se.listening)
        return;
      const P = m(j), R = S(P);
      if (R) {
        E(Ie(R, { replace: !0 }), P).catch(yo);
        return;
      }
      c = P;
      const K = s.value;
      rn && s0(uu(K.fullPath, w.delta), yi()), _(P, K).catch((T) => nn(
        T,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? T : nn(
        T,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (E(
        T.to,
        P
        // avoid an uncaught rejection, let push call triggerError
      ).then((D) => {
        nn(
          D,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !w.delta && w.type === No.pop && o.go(-1, !1);
      }).catch(yo), Promise.reject()) : (w.delta && o.go(-w.delta, !1), V(T, P, K))).then((T) => {
        T = T || A(
          // after navigation, all matched components are resolved
          P,
          K,
          !1
        ), T && (w.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !nn(
          T,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? o.go(-w.delta, !1) : w.type === No.pop && nn(
          T,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && o.go(-1, !1)), k(P, K, T);
      }).catch(yo);
    }));
  }
  let $ = co(), L = co(), F;
  function V(j, Y, w) {
    B(j);
    const P = L.list();
    return P.length ? P.forEach((R) => R(j, Y, w)) : (process.env.NODE_ENV !== "production" && _e("uncaught error during route navigation:"), console.error(j)), Promise.reject(j);
  }
  function q() {
    return F && s.value !== wn ? Promise.resolve() : new Promise((j, Y) => {
      $.add([j, Y]);
    });
  }
  function B(j) {
    return F || (F = !j, M(), $.list().forEach(([Y, w]) => j ? w(j) : Y()), $.reset()), j;
  }
  function Z(j, Y, w, P) {
    const { scrollBehavior: R } = e;
    if (!rn || !R)
      return Promise.resolve();
    const K = !w && l0(uu(j.fullPath, 0)) || (P || !w) && history.state && history.state.scroll || null;
    return $n().then(() => R(j, Y, K)).then((T) => T && i0(T)).catch((T) => V(T, j, Y));
  }
  const ae = (j) => o.go(j);
  let de;
  const he = /* @__PURE__ */ new Set(), Se = {
    currentRoute: s,
    listening: !0,
    addRoute: v,
    removeRoute: p,
    hasRoute: h,
    getRoutes: g,
    resolve: m,
    options: e,
    push: O,
    replace: N,
    go: ae,
    back: () => ae(-1),
    forward: () => ae(1),
    beforeEach: a.add,
    beforeResolve: i.add,
    afterEach: l.add,
    onError: L.add,
    isReady: q,
    install(j) {
      const Y = this;
      j.component("RouterLink", B0), j.component("RouterView", H0), j.config.globalProperties.$router = Y, Object.defineProperty(j.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => W(s)
      }), rn && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !de && s.value === wn && (de = !0, O(o.location).catch((R) => {
        process.env.NODE_ENV !== "production" && _e("Unexpected error when starting the router:", R);
      }));
      const w = {};
      for (const R in wn)
        Object.defineProperty(w, R, {
          get: () => s.value[R],
          enumerable: !0
        });
      j.provide(_i, Y), j.provide(Tl, Av(w)), j.provide(Us, s);
      const P = j.unmount;
      he.add(j), j.unmount = function() {
        he.delete(j), he.size < 1 && (c = wn, x && x(), x = null, s.value = wn, de = !1, F = !1), P();
      }, process.env.NODE_ENV !== "production" && rn && W0(j, Y, t);
    }
  };
  function ne(j) {
    return j.reduce((Y, w) => Y.then(() => I(w)), Promise.resolve());
  }
  return Se;
}
function n1(e, t) {
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
function wm() {
  return _t(Tl);
}
const r1 = (e) => (si("data-v-610aa2b4"), e = e(), li(), e), o1 = /* @__PURE__ */ r1(() => /* @__PURE__ */ z("svg", {
  viewBox: "21.904761904761905 21.904761904761905 43.80952380952381 43.80952380952381",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ z("circle", {
    cx: "43.80952380952381",
    cy: "43.80952380952381",
    fill: "transparent",
    r: "20",
    "stroke-dasharray": "125.664",
    "stroke-dashoffset": "125.66370614359172px",
    "stroke-width": "3.8095238095238093"
  })
], -1)), a1 = [
  o1
], i1 = /* @__PURE__ */ me({
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
    return (s, c) => (U(), ue(ii(s.tag), {
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
        z("span", {
          class: be(["th-btn__slot", { "th-btn__slot_active": !s.loading }])
        }, [
          Yn(s.$slots, "default", {}, void 0, !0)
        ], 2),
        z("span", {
          class: be(["th-btn__loader", { "th-btn__loader_active": s.loading }])
        }, a1, 2)
      ]),
      _: 3
    }, 8, ["class", "disabled", "href", "to"]));
  }
}), nt = /* @__PURE__ */ ge(i1, [["__scopeId", "data-v-610aa2b4"]]), s1 = {}, l1 = { class: "th-divider" };
function c1(e, t) {
  return U(), X("hr", l1);
}
const Tu = /* @__PURE__ */ ge(s1, [["render", c1], ["__scopeId", "data-v-31ecedc2"]]), Sl = () => {
  const e = Ln();
  return (t) => {
    var a, i;
    const n = ((a = e.current) == null ? void 0 : a.rate) ?? 1;
    let r = Number.parseFloat((t * +n).toFixed(2));
    const o = ((i = e.current) == null ? void 0 : i.symbol) ?? "€";
    return Number.isInteger(r) || (r = r.toFixed(2)), `${o}${r}`;
  };
}, lt = /* @__PURE__ */ me({
  __name: "PriceComponent",
  props: {
    amount: {}
  },
  setup(e) {
    const t = Sl(), n = e;
    return (r, o) => oe(W(t)(+n.amount));
  }
}), _r = jn("toasts", {
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
  return Ne(e, (c) => {
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
}), u1 = ["data-cart-item-id"], d1 = { class: "th-cart-item__info" }, f1 = ["href"], p1 = ["src", "srcset"], m1 = { class: "th-cart-item__additional-info" }, h1 = { class: "th-cart-item__modifications" }, v1 = {
  key: 0,
  class: "th-cart-item__product-start"
}, g1 = { class: "th-cart-item__product-start-date" }, y1 = { class: "th-cart-item__product-start-time" }, _1 = {
  key: 0,
  class: "th-cart-item__message"
}, b1 = { class: "th-cart-item__message__text" }, E1 = {
  key: 0,
  class: "th-cart-item__modification th-cart-item__modification_visitors"
}, w1 = {
  key: 1,
  class: "th-cart-item__modification th-cart-item__modification_visitors"
}, C1 = { class: "th-cart-item__modification_visitor__title" }, T1 = { class: "th-cart-item__modification_visitor__price" }, S1 = {
  key: 0,
  class: "th-cart-item__modification_visitor__price_default"
}, k1 = ["innerHTML"], I1 = { class: "th-cart-item__meta" }, O1 = { class: "th-cart-item__actions" }, P1 = { class: "th-cart-item__price" }, D1 = { class: "th-cart-item__price_sale" }, A1 = /* @__PURE__ */ me({
  __name: "CartItem",
  props: {
    product: {},
    small: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = bi(), { t: n, locale: r } = Pe(), { showToast: o, showErrorToast: a } = _r(), { setQuickBuyProduct: i } = xn(), l = e, s = ut(), c = Q(!1), u = te(() => {
      var p;
      return (p = window.ticketHub) == null ? void 0 : p.detailedCartItemCategory;
    }), f = async (p) => {
      if (!l.product.isUpsell)
        return;
      p.preventDefault();
      const g = t.currentRoute;
      g.value.query.cartItemId = l.product.id, window.history.pushState(null, "", t.resolve(g.value).href), await t.push(g.value);
      try {
        const h = await Ya.getUpsellByItemId(l.product.itemId);
        let m = {
          isAddon: !1,
          parents: []
        };
        l.product.isSingle && (m = l.product.item.addonInfo), i({
          ...h,
          upsell: !0,
          addonInfo: m
        });
      } catch {
      }
    }, d = te(() => {
      var p;
      return (p = window.ticketHub) == null ? void 0 : p.editCartItemEnabled;
    }), v = async () => {
      var p, g, h, m;
      try {
        c.value = !0, await s.deleteCartItem(l.product.id, l.product.isCombo), o(n("toast.productHasBeenRemoved"));
      } catch (y) {
        if (!(y instanceof It))
          return a();
        const b = y.message;
        let O = y.message;
        (typeof ((p = b.errors[0]) == null ? void 0 : p.type) < "u" || typeof ((g = b.errors[0]) == null ? void 0 : g.code) < "u") && (O = ((h = b.errors[0]) == null ? void 0 : h.type) || ((m = b.errors[0]) == null ? void 0 : m.code), O = n(`THError.${O}`)), a(O, 1e4);
      } finally {
        c.value = !1;
      }
    };
    return (p, g) => (U(), X("div", {
      "data-cart-item-id": l.product.id,
      class: "th-cart-item"
    }, [
      z("div", d1, [
        l.product.preview ? (U(), X("a", {
          key: 0,
          href: l.product.getItemLink(W(r))
        }, [
          z("span", {
            class: be([{ "th-cart-item__image_small": p.small }, "th-cart-item__image"])
          }, [
            z("img", {
              src: l.product.preview,
              srcset: l.product.getImageSrcset(),
              alt: "",
              height: "104",
              loading: "lazy",
              width: "104"
            }, null, 8, p1)
          ], 2)
        ], 8, f1)) : se("", !0),
        z("div", {
          class: be([{ "th-cart-item__data_small": p.small }, "th-cart-item__data"])
        }, [
          z("div", {
            class: be([{ "th-cart-item__title_small": p.small }, "th-cart-item__title"])
          }, oe(l.product.title), 3),
          z("div", m1, [
            z("div", h1, [
              (U(!0), X(Oe, null, at(l.product.items, (h) => (U(), X("div", {
                key: h.itemName,
                class: "th-cart-item__product"
              }, [
                z("div", {
                  class: be([{ "th-cart-item__product-title_small": p.small }, "th-cart-item__product-title"])
                }, oe(h.itemName), 3),
                h.timeslot ? (U(), X("div", v1, [
                  z("div", g1, oe(h.timeslot.humanizedDate), 1),
                  z("div", y1, oe(h.timeslot.humanizedTime), 1),
                  h.timeslot.isExpired ? (U(), X("div", _1, [
                    z("span", b1, oe(W(n)("cart.timeslotIsExpired")), 1)
                  ])) : se("", !0)
                ])) : se("", !0)
              ]))), 128)),
              u.value ? (U(), X("div", w1, [
                (U(!0), X(Oe, null, at(l.product.selectedCategories, (h) => (U(), X("div", {
                  key: h.itemCategoryId,
                  class: "th-cart-item__modification_visitor"
                }, [
                  h.quantity > 0 ? (U(), X(Oe, { key: 0 }, [
                    z("div", C1, oe(h.computedText), 1),
                    z("div", T1, [
                      h.totalPrice !== h.totalDiscountedPrice ? (U(), X("span", S1, [
                        G(lt, {
                          amount: h.totalPrice
                        }, null, 8, ["amount"])
                      ])) : se("", !0),
                      z("span", null, [
                        G(lt, {
                          amount: h.totalDiscountedPrice
                        }, null, 8, ["amount"])
                      ])
                    ])
                  ], 64)) : se("", !0)
                ]))), 128))
              ])) : (U(), X("div", E1, oe(l.product.selectedVisitorsText), 1)),
              z("div", {
                innerHTML: l.product.extraMealsText
              }, null, 8, k1)
            ])
          ])
        ], 2)
      ]),
      z("div", I1, [
        z("div", O1, [
          l.product.url && d.value ? (U(), ue(nt, {
            key: 0,
            to: l.product.getItemEditLink(W(r)),
            plain: "",
            tag: "a",
            type: "button",
            onClick: f
          }, {
            default: we(() => [
              qe(oe(W(n)("cart.edit")), 1)
            ]),
            _: 1
          }, 8, ["to"])) : se("", !0),
          G(nt, {
            loading: c.value,
            plain: "",
            type: "button",
            onClick: v
          }, {
            default: we(() => [
              qe(oe(W(n)("cart.remove")), 1)
            ]),
            _: 1
          }, 8, ["loading"])
        ]),
        z("div", P1, [
          z("span", D1, [
            G(lt, {
              amount: l.product.totalPrice
            }, null, 8, ["amount"])
          ])
        ])
      ])
    ], 8, u1));
  }
}), $1 = /* @__PURE__ */ ge(A1, [["__scopeId", "data-v-3da657c5"]]), N1 = {}, L1 = {
  fill: "none",
  height: "32",
  viewBox: "0 0 32 32",
  width: "32",
  xmlns: "http://www.w3.org/2000/svg"
}, R1 = /* @__PURE__ */ z("path", {
  "clip-rule": "evenodd",
  d: "M25.2498 9.40004C25.5812 9.64857 25.6483 10.1187 25.3998 10.45L15.3229 23.8859C15.1925 24.0598 14.9929 24.1686 14.776 24.184C14.5591 24.1994 14.3461 24.1199 14.1924 23.966L7.4695 17.2388C7.1767 16.9458 7.17685 16.4709 7.46984 16.1781C7.76283 15.8853 8.2377 15.8855 8.5305 16.1785L14.642 22.2938L24.1998 9.55004C24.4483 9.21867 24.9184 9.15152 25.2498 9.40004Z",
  fill: "currentColor",
  "fill-rule": "evenodd"
}, null, -1), M1 = [
  R1
];
function x1(e, t) {
  return U(), X("svg", L1, M1);
}
const B1 = /* @__PURE__ */ ge(N1, [["render", x1]]), V1 = { class: "th-checkbox" }, U1 = ["checked", "disabled"], F1 = {
  class: "th-checkbox__helper",
  tabindex: ""
}, H1 = ["innerHTML"], Y1 = /* @__PURE__ */ me({
  __name: "CheckboxComponent",
  props: {
    modelValue: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    text: {},
    size: { default: 9 }
  },
  setup(e) {
    return (t, n) => (U(), X("label", V1, [
      z("input", {
        checked: t.modelValue,
        disabled: t.readonly,
        class: "th-checkbox__input",
        type: "checkbox",
        onChange: n[0] || (n[0] = (r) => {
          var o;
          return t.$emit("update:modelValue", (o = r.target) == null ? void 0 : o.checked);
        })
      }, null, 40, U1),
      z("span", F1, [
        G(B1, {
          style: $v({ width: `${t.size}px` }),
          class: "th-checkbox__icon"
        }, null, 8, ["style"])
      ]),
      t.text ? (U(), X("span", {
        key: 0,
        class: "th-checkbox__text",
        innerHTML: t.text
      }, null, 8, H1)) : se("", !0)
    ]));
  }
}), j1 = /* @__PURE__ */ ge(Y1, [["__scopeId", "data-v-9ff4adfc"]]), W1 = { class: "th-cart-coupon" }, z1 = ["readonly"], q1 = /* @__PURE__ */ me({
  __name: "CartCouponInput",
  props: {
    voucher: { default: null }
  },
  emits: ["code-applied"],
  setup(e, { emit: t }) {
    const { t: n } = Pe(), { showToast: r, showErrorToast: o } = _r(), a = e, i = ut(), l = Q(!1), s = Q(""), c = t, u = async () => {
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
    return rt(() => {
      a.voucher && (s.value = a.voucher.code);
    }), (d, v) => (U(), X("div", null, [
      z("div", W1, [
        Zd(z("input", {
          "onUpdate:modelValue": v[0] || (v[0] = (p) => s.value = p),
          readonly: !!d.voucher,
          class: "th-cart-coupon__input",
          type: "text"
        }, null, 8, z1), [
          [Nv, s.value]
        ]),
        s.value.length ? (U(), X(Oe, { key: 0 }, [
          d.voucher ? (U(), ue(nt, {
            key: 1,
            loading: l.value,
            class: "th-cart-coupon__btn",
            plain: "",
            onClick: f
          }, {
            default: we(() => [
              qe(oe(W(n)("cart.delete")), 1)
            ]),
            _: 1
          }, 8, ["loading"])) : (U(), ue(nt, {
            key: 0,
            loading: l.value,
            class: "th-cart-coupon__btn",
            plain: "",
            onClick: u
          }, {
            default: we(() => [
              qe(oe(W(n)("cart.apply")), 1)
            ]),
            _: 1
          }, 8, ["loading"]))
        ], 64)) : se("", !0)
      ])
    ]));
  }
}), Su = /* @__PURE__ */ ge(q1, [["__scopeId", "data-v-d34fbbef"]]), G1 = { class: "th-cart-discount cart-discount_expanded" }, X1 = {
  key: 1,
  class: "th-cart-discount__wrapper"
}, K1 = { class: "th-cart-discount__heading" }, J1 = {
  key: 0,
  class: "th-cart-discount__inputs"
}, Z1 = /* @__PURE__ */ me({
  __name: "CartDiscount",
  props: {
    isShown: { type: Boolean, default: !1 }
  },
  setup(e) {
    const { t } = Pe(), n = e, r = ut(), o = Q(n.isShown), a = Q(!1);
    return rt(() => {
      r.isVouchersApplied && (o.value = !0);
    }), (i, l) => (U(), X("div", G1, [
      n.isShown ? se("", !0) : (U(), ue(j1, {
        key: 0,
        modelValue: o.value,
        "onUpdate:modelValue": l[0] || (l[0] = (s) => o.value = s),
        readonly: W(r).isVouchersApplied,
        text: W(t)("cart.iHaveDiscountCode"),
        class: "th-cart-discount__checkbox"
      }, null, 8, ["modelValue", "readonly", "text"])),
      o.value ? (U(), X("div", X1, [
        z("div", K1, oe(W(t)("cart.discountCode")), 1),
        W(r).isVouchersApplied ? (U(), X("div", J1, [
          (U(!0), X(Oe, null, at(W(r).vouchers, (s) => (U(), ue(Su, {
            key: s.voucherId,
            voucher: s,
            onCodeApplied: l[1] || (l[1] = (c) => a.value = !1)
          }, null, 8, ["voucher"]))), 128))
        ])) : se("", !0),
        !a.value && W(r).isVouchersApplied ? (U(), ue(nt, {
          key: 1,
          class: "th-cart-discount__btn",
          plain: "",
          onClick: l[2] || (l[2] = (s) => a.value = !0)
        }, {
          default: we(() => [
            qe(oe(W(t)("cart.addDiscountCode")), 1)
          ]),
          _: 1
        })) : se("", !0),
        a.value || !W(r).isVouchersApplied ? (U(), ue(Su, {
          key: 2,
          class: "th-cart-discount__new-input",
          onCodeApplied: l[3] || (l[3] = (s) => a.value = !1)
        })) : se("", !0)
      ])) : se("", !0)
    ]));
  }
}), Q1 = /* @__PURE__ */ ge(Z1, [["__scopeId", "data-v-6a7d0a33"]]), eE = {}, tE = {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, nE = /* @__PURE__ */ z("path", {
  d: `M10.5894 6.05557C10.4727 5.93888 10.3156 5.87305 10.151 5.87305C9.98646 5.87305 9.82937
      5.93738 9.71267 6.05557L7.11991 8.63487L6.28957 7.79854C6.05019 7.55916 5.65672 7.55617
      5.41435 7.79405C5.17048 8.03193 5.16749 8.42541 5.40687 8.67077L6.67557 9.94845C6.79227
      10.0651 6.94936 10.131 7.11542 10.131C7.28 10.131 7.43559 10.0666 7.55229 9.94995L10.5864
      6.93379C10.8258 6.69441 10.8288 6.30093 10.5909 6.05856L10.5894 6.05557Z`,
  fill: "currentColor"
}, null, -1), rE = /* @__PURE__ */ z("path", {
  d: `M14.9105 5.08408C14.532 4.1909 13.9904 3.38899 13.3022 2.69928C12.6125 2.01107 11.8106
			1.46948 10.9174 1.09096C9.99282 0.698983 9.01137 0.5 8 0.5C3.86475 0.501496 0.5 3.86625 0.5
			8.0015C0.5 12.1367 3.86475 15.5015 8 15.5015C12.1352 15.5015 15.5 12.1367 15.5 8.0015C15.5
			6.99013 15.3025 6.00868 14.9105 5.08408ZM8 14.2612C4.54847 14.2612 1.74028 11.453 1.74028
			8.0015C1.74028 4.54997 4.54847 1.74177 8 1.74177C11.4515 1.74177 14.2597 4.54997 14.2597
			8.0015C14.2597 11.453 11.4515 14.2612 8 14.2612Z`,
  fill: "currentColor"
}, null, -1), oE = [
  nE,
  rE
];
function aE(e, t) {
  return U(), X("svg", tE, oE);
}
const ku = /* @__PURE__ */ ge(eE, [["render", aE]]), iE = {}, sE = {
  height: "32",
  viewBox: "0 0 26 32",
  width: "26",
  xmlns: "http://www.w3.org/2000/svg"
}, lE = /* @__PURE__ */ Lv('<path d="M26.032 7.797c-0.032-0.744-0.434-1.454-1.136-1.833-0 0-0-0-0-0l-10.558-5.702s-0 0-0-0c-1.060-0.572-2.389-0.176-2.961 0.885l-11.115 20.583s0 0-0 0c-0.176 0.326-0.251 0.678-0.252 1.025l-0.008-0.014v1.416l0.009 0.008c0.019 0.758 0.423 1.487 1.136 1.872l10.558 5.701c1.060 0.573 2.389 0.176 2.962-0.885l11.115-20.583c0.194-0.359 0.268-0.749 0.252-1.13 0.001-0.008 0.010-0.013 0.010-0.021v-1.337l-0.010 0.015zM24.068 8.841l-10.426 19.307c-0.284 0.526-0.94 0.722-1.466 0.438l-9.778-5.28c-0.526-0.284-0.722-0.94-0.438-1.466l10.426-19.306c0.267-0.494 0.885-0.678 1.378-0.412l0.545 0.294c-0.268 0.714-0.034 1.51 0.596 1.851l6.425 3.47c0.626 0.338 1.418 0.101 1.871-0.518l0.455 0.246c0.494 0.267 0.678 0.885 0.412 1.378z" fill="currentColor"></path><path d="M7.317 15.142l3.829-6.902c0.085-0.153 0.278-0.208 0.431-0.123l0.394 0.218c0.153 0.085 0.208 0.278 0.123 0.431l-3.829 6.902c-0.085 0.153-0.278 0.208-0.431 0.123l-0.394-0.218c-0.153-0.085-0.208-0.278-0.123-0.431z" fill="currentColor"></path><path d="M9.522 16.365l3.829-6.903c0.085-0.153 0.278-0.208 0.431-0.123l0.791 0.439c0.153 0.085 0.208 0.278 0.123 0.431l-3.829 6.903c-0.085 0.153-0.278 0.208-0.431 0.123l-0.791-0.439c-0.153-0.085-0.208-0.278-0.123-0.431z" fill="currentColor"></path><path d="M12.432 17.979l3.829-6.902c0.085-0.153 0.278-0.208 0.431-0.123l0.317 0.176c0.153 0.085 0.208 0.278 0.123 0.431l-3.829 6.902c-0.085 0.153-0.278 0.208-0.431 0.123l-0.317-0.176c-0.153-0.085-0.208-0.278-0.123-0.431z" fill="currentColor"></path><path d="M14.099 18.903l3.829-6.902c0.085-0.153 0.278-0.208 0.431-0.123l0.945 0.524c0.153 0.085 0.208 0.278 0.123 0.431l-3.829 6.902c-0.085 0.153-0.278 0.208-0.431 0.123l-0.945-0.524c-0.153-0.085-0.208-0.278-0.123-0.431z" fill="currentColor"></path>', 5), cE = [
  lE
];
function uE(e, t) {
  return U(), X("svg", sE, cE);
}
const dE = /* @__PURE__ */ ge(iE, [["render", uE]]), fE = { class: "th-achievements" }, pE = { class: "th-achievements__item" }, mE = { class: "th-achievements__item" }, hE = { class: "th-achievements__item" }, vE = /* @__PURE__ */ me({
  __name: "AchievementsComponent",
  setup(e) {
    const { t } = Pe();
    return (n, r) => (U(), X("div", fE, [
      z("div", pE, [
        G(ku, { class: "th-achievements__icon" }),
        z("span", null, oe(W(t)("achievements.easyBooking")), 1)
      ]),
      z("div", mE, [
        G(dE, { class: "th-achievements__icon" }),
        z("span", null, oe(W(t)("achievements.ticketOnSmartphone")), 1)
      ]),
      z("div", hE, [
        G(ku, { class: "th-achievements__icon" }),
        z("span", null, oe(W(t)("achievements.customerService")), 1)
      ])
    ]));
  }
}), gE = /* @__PURE__ */ ge(vE, [["__scopeId", "data-v-91d7f9e8"]]), yE = { class: "th-cost" }, _E = {
  key: 0,
  class: "th-cost__item"
}, bE = { class: "th-cost__item_value" }, EE = { class: "th-cost__item_value" }, wE = {
  key: 2,
  class: "th-cost__item"
}, CE = { class: "th-cost__item_value" }, TE = {
  key: 3,
  class: "th-cost__item"
}, SE = { class: "th-cost__item_value" }, kE = {
  key: 4,
  class: "th-cost__item th-cost__item_total"
}, IE = { class: "th-cost__item_value" }, OE = /* @__PURE__ */ me({
  __name: "CostComponent",
  props: {
    discount: {},
    fee: {},
    subtotal: {},
    tax: {},
    total: {}
  },
  setup(e) {
    const { t } = Pe(), n = e;
    return (r, o) => (U(), X("div", yE, [
      n.subtotal ? (U(), X("div", _E, [
        z("span", null, oe(W(t)("cart.subTotal")), 1),
        z("span", bE, [
          G(lt, {
            amount: n.subtotal
          }, null, 8, ["amount"])
        ])
      ])) : se("", !0),
      n.discount ? (U(!0), X(Oe, { key: 1 }, at(n.discount, (a) => (U(), X("div", {
        key: a.title,
        class: "th-cost__item"
      }, [
        z("span", null, oe(a.title), 1),
        z("span", EE, [
          G(lt, {
            amount: a.amount
          }, null, 8, ["amount"])
        ])
      ]))), 128)) : se("", !0),
      typeof n.tax < "u" ? (U(), X("div", wE, [
        z("span", null, oe(W(t)("cart.tax")), 1),
        z("span", CE, [
          G(lt, {
            amount: n.tax
          }, null, 8, ["amount"])
        ])
      ])) : se("", !0),
      n.fee !== 0 ? (U(), X("div", TE, [
        z("span", null, oe(W(t)("cart.fee")), 1),
        z("span", SE, [
          G(lt, {
            amount: n.fee
          }, null, 8, ["amount"])
        ])
      ])) : se("", !0),
      typeof n.total < "u" ? (U(), X("div", kE, [
        z("span", null, oe(W(t)("cart.total")), 1),
        z("span", IE, [
          G(lt, {
            amount: n.total
          }, null, 8, ["amount"])
        ])
      ])) : se("", !0)
    ]));
  }
}), PE = /* @__PURE__ */ ge(OE, [["__scopeId", "data-v-06cad875"]]), DE = { class: "th-cart-popup" }, AE = {
  key: 0,
  class: "th-cart-popup__empty"
}, $E = { class: "th-cart-popup__empty-content" }, NE = { class: "th-cart-popup__empty-text" }, LE = ["href"], RE = {
  key: 1,
  class: "th-cart-popup__body"
}, ME = { class: "th-cart-popup__title" }, xE = { class: "th-cart-popup__list" }, BE = {
  key: 2,
  class: "th-cart-popup__footer"
}, VE = { class: "th-cart-popup__total" }, UE = /* @__PURE__ */ me({
  __name: "CartPopup",
  props: {
    emptyCartBrowseLink: { default: "" }
  },
  setup(e) {
    const { t } = Pe(), n = hi(), r = ut(), o = e, a = te(() => window ? new URL(o.emptyCartBrowseLink, window.location.origin).href : o.emptyCartBrowseLink), i = () => {
      n.toggle(), window && a.value !== window.location.href && (window.location.href = a.value);
    };
    return (l, s) => (U(), ue(wl, {
      toggle: W(n).toggle
    }, {
      default: we(() => {
        var c, u, f, d, v;
        return [
          z("div", DE, [
            W(r).count === 0 ? (U(), X("div", AE, [
              z("div", $E, [
                z("p", NE, oe(W(t)("cart.cartIsEmpty")), 1),
                z("a", {
                  href: o.emptyCartBrowseLink,
                  class: "th-cart-popup__empty-button",
                  onClick: He(i, ["prevent"])
                }, [
                  G(nt, {
                    bg: "accent",
                    type: "button"
                  }, {
                    default: we(() => [
                      qe(oe(W(t)("cart.startExploring")), 1)
                    ]),
                    _: 1
                  })
                ], 8, LE)
              ])
            ])) : (U(), X("div", RE, [
              z("div", ME, oe(W(t)("cart.your", W(r).count)), 1),
              z("div", xE, [
                (U(!0), X(Oe, null, at(W(r).items, (p) => (U(), ue($1, {
                  key: p.id,
                  product: p
                }, null, 8, ["product"]))), 128))
              ]),
              G(gE),
              G(Tu),
              G(Q1),
              G(Tu, { class: "th-cart-popup__bottom-divider" }),
              G(PE, {
                discount: W(r).discountSummaries,
                fee: (c = W(r).cart) == null ? void 0 : c.bookingFee,
                subtotal: (u = W(r).cart) == null ? void 0 : u.totalPrice,
                tax: (f = W(r).cart) == null ? void 0 : f.vatAmount,
                total: (d = W(r).cart) == null ? void 0 : d.totalDiscountedPrice
              }, null, 8, ["discount", "fee", "subtotal", "tax", "total"])
            ])),
            W(r).count > 0 ? (U(), X("div", BE, [
              z("div", VE, [
                z("span", null, oe(W(t)("cart.total")), 1),
                z("span", null, [
                  G(lt, {
                    amount: (v = W(r).cart) == null ? void 0 : v.totalDiscountedPrice
                  }, null, 8, ["amount"])
                ])
              ]),
              G(nt, {
                disabled: W(r).isExpired,
                to: { name: "checkout" },
                bg: "accent",
                class: "th-cart-popup__submit",
                tag: "router-link",
                onClick: s[0] || (s[0] = He((p) => W(n).toggle(), ["prevent"]))
              }, {
                default: we(() => [
                  qe(oe(W(t)("cart.toCheckout")), 1)
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
}), FE = /* @__PURE__ */ ge(UE, [["__scopeId", "data-v-1fac5ce5"]]), Hs = jn("currency-modal", () => {
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
  return Ne(e, (o) => {
    window.dispatchEvent(
      new CustomEvent(o ? "th:currencyPopupOpen" : "th:currencyPopupClose")
    );
  }), { isOpen: e, open: t, close: n, toggle: r };
}), HE = { class: "th-modal__title" }, YE = { class: "th-modal__content" }, jE = ["onClick"], WE = { class: "th-modal__button-title" }, zE = { class: "th-modal__button-description" }, qE = /* @__PURE__ */ me({
  __name: "CurrencyPopup",
  setup(e) {
    const { t } = Pe(), { isOpen: n } = Io(Hs()), { list: r, current: o } = Io(Ln()), { setCurrency: a } = Ln(), { toggle: i, close: l } = Hs();
    return (s, c) => W(n) ? (U(), ue(wl, {
      key: 0,
      center: !0,
      toggle: W(i),
      class: "th-modal_currency"
    }, {
      default: we(() => [
        z("div", HE, oe(W(t)("cart.selectACurrency")), 1),
        z("div", YE, [
          (U(!0), X(Oe, null, at(W(r), (u) => (U(), X("button", {
            key: u.code,
            class: be([{ "th-modal__button_selected": u.code === W(o).code }, "th-modal__button"]),
            type: "button",
            onClick: () => {
              W(a)(u.code), W(l)();
            }
          }, [
            z("span", WE, oe(u.code), 1),
            z("span", zE, oe(u.description) + " - " + oe(u.symbol), 1)
          ], 10, jE))), 128))
        ])
      ]),
      _: 1
    }, 8, ["toggle"])) : se("", !0);
  }
}), GE = /* @__PURE__ */ ge(qE, [["__scopeId", "data-v-c270df11"]]), XE = { class: "th-toast__heading" }, KE = { class: "th-toast__text" }, JE = /* @__PURE__ */ me({
  __name: "ToastComponent",
  props: {
    text: {},
    type: {}
  },
  setup(e) {
    const { t } = Pe(), n = e, r = n.text ? n.text : t("toast.error");
    return (o, a) => (U(), X("div", {
      class: be([`th-toast__wrapper_${n.type}`, "th-toast__wrapper"]),
      role: "alert"
    }, [
      z("div", XE, oe(W(t)(`toast.${n.type}`)), 1),
      z("div", KE, oe(W(r)), 1)
    ], 2));
  }
}), ZE = /* @__PURE__ */ ge(JE, [["__scopeId", "data-v-517193ae"]]), QE = { class: "th-toasts" }, ew = /* @__PURE__ */ me({
  __name: "Toasts",
  setup(e) {
    const { getToasts: t } = ys(_r());
    return (n, r) => (U(), X("div", QE, [
      G(cl, { name: "fade" }, {
        default: we(() => [
          (U(!0), X(Oe, null, at(W(t), (o) => (U(), ue(ZE, {
            key: o.timestamp,
            text: o.text,
            type: o.type
          }, null, 8, ["text", "type"]))), 128))
        ]),
        _: 1
      })
    ]));
  }
}), tw = /* @__PURE__ */ ge(ew, [["__scopeId", "data-v-d7679e7c"]]), Cm = (e) => (si("data-v-d0770e43"), e = e(), li(), e), nw = { class: "th-product-meta" }, rw = {
  key: 0,
  class: "th-product-meta__rating"
}, ow = {
  key: 0,
  class: "th-product-meta__stars"
}, aw = /* @__PURE__ */ Cm(() => /* @__PURE__ */ z("svg", {
  fill: "none",
  height: "16",
  viewBox: "0 0 17 16",
  width: "17",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ z("path", {
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
], -1)), iw = {
  key: 1,
  class: "th-product-meta__divider"
}, sw = { key: 2 }, lw = {
  key: 1,
  class: "th-product-meta__duration"
}, cw = /* @__PURE__ */ Cm(() => /* @__PURE__ */ z("svg", {
  fill: "none",
  height: "24",
  viewBox: "0 0 24 24",
  width: "24",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ z("path", {
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
], -1)), uw = /* @__PURE__ */ me({
  __name: "ProductMeta",
  props: {
    duration: {},
    rating: { default: 0 },
    bookingsCount: { default: 0 }
  },
  setup(e) {
    const { t } = Pe(), n = e;
    return (r, o) => (U(), X("div", nw, [
      n.rating || n.bookingsCount ? (U(), X("div", rw, [
        n.rating && n.rating >= 4 ? (U(), X("div", ow, [
          aw,
          z("span", null, oe(r.rating), 1)
        ])) : se("", !0),
        n.rating && n.rating >= 4 && n.bookingsCount ? (U(), X("span", iw)) : se("", !0),
        n.bookingsCount ? (U(), X("span", sw, oe(W(t)("booking.booking", n.bookingsCount)), 1)) : se("", !0)
      ])) : se("", !0),
      n.duration ? (U(), X("div", lw, [
        cw,
        z("span", null, oe(n.duration), 1)
      ])) : se("", !0)
    ]));
  }
}), Tm = /* @__PURE__ */ ge(uw, [["__scopeId", "data-v-d0770e43"]]), dw = {}, fw = {
  fill: "none",
  height: "8",
  viewBox: "0 0 14 8",
  width: "14",
  xmlns: "http://www.w3.org/2000/svg"
}, pw = /* @__PURE__ */ z("path", {
  "clip-rule": "evenodd",
  d: "M12.9266 1.05445C13.1599 1.28974 13.1584 1.66963 12.9231 1.90297L8.12725 6.65917C7.5035 7.27777 6.49767 7.27776 5.87392 6.65917L1.07809 1.90297C0.842801 1.66963 0.841225 1.28974 1.07456 1.05445C1.30791 0.819168 1.6878 0.817591 1.92309 1.05093L6.71892 5.80713C6.87486 5.96178 7.12632 5.96178 7.28225 5.80713L12.0781 1.05093C12.3134 0.817592 12.6933 0.819168 12.9266 1.05445Z",
  fill: "currentColor",
  "fill-rule": "evenodd"
}, null, -1), mw = [
  pw
];
function hw(e, t) {
  return U(), X("svg", fw, mw);
}
const Ki = /* @__PURE__ */ ge(dw, [["render", hw]]), vw = { class: "th-option-select__placeholder" }, gw = { class: "th-option-select__placeholder-title" }, yw = { class: "th-option-select__placeholder-title th-option-select__placeholder-title_extended" }, _w = { class: "th-option-select__placeholder-title" }, bw = /* @__PURE__ */ me({
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
    const { t: n } = Pe(), r = e, o = Q(!1), a = Q(null), i = Q(null), l = Q(null), s = (d) => {
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
    Ne(o, (d) => {
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
      z("div", {
        class: "th-option-select th-option-select_external",
        onClick: f
      }, [
        z("div", vw, [
          z("div", gw, oe(r.title), 1),
          z("div", {
            class: be([{
              "th-option-select__placeholder-value_black": r.titleIsBlack
            }, "th-option-select__placeholder-value"])
          }, oe(r.selectedOptionTitle), 3),
          r.iconIsShown ? (U(), ue(Ki, {
            key: 0,
            class: "th-option-select__icon",
            size: "12"
          })) : se("", !0)
        ])
      ]),
      G(Qd, { name: "fade" }, {
        default: we(() => [
          Zd(z("div", {
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
                z("div", yw, oe(d.extendedHeaderTitle), 1),
                r.iconIsShown ? (U(), ue(Ki, {
                  key: 0,
                  class: be([{ "th-option-select__icon_shown": o.value }, "th-option-select__icon"]),
                  size: "12"
                }, null, 8, ["class"])) : se("", !0)
              ], 64)) : (U(), X(Oe, { key: 1 }, [
                z("div", _w, oe(d.title), 1),
                z("div", {
                  class: be([{
                    "th-option-select__placeholder-value_black": r.titleIsBlack
                  }, "th-option-select__placeholder-value"])
                }, oe(d.selectedOptionTitle), 3),
                r.iconIsShown ? (U(), ue(Ki, {
                  key: 0,
                  class: be([{ "th-option-select__icon_shown": o.value }, "th-option-select__icon"]),
                  size: "12"
                }, null, 8, ["class"])) : se("", !0)
              ], 64))
            ])) : se("", !0),
            z("div", {
              ref_key: "content",
              ref: l,
              class: be([{
                "th-option-select__content-wrapper_no-border": !r.showHeader
              }, "th-option-select__content-wrapper"])
            }, [
              Yn(d.$slots, "default", {}, void 0, !0),
              z("div", {
                class: be([{
                  "th-option-select__footer_extended": r.footerIsExtended
                }, "th-option-select__footer"])
              }, [
                G(nt, {
                  class: "th-option-select__close-btn",
                  plain: "",
                  type: "button",
                  onClick: v[0] || (v[0] = He((p) => f(!1), ["stop"]))
                }, {
                  default: we(() => [
                    qe(oe(W(n)("options.close")), 1)
                  ]),
                  _: 1
                })
              ], 2)
            ], 2)
          ], 2), [
            [Rv, o.value]
          ])
        ]),
        _: 3
      })
    ], 2));
  }
}), Yt = /* @__PURE__ */ ge(bw, [["__scopeId", "data-v-8c870be8"]]), Ew = { class: "th-variant-list" }, ww = ["onClick"], Cw = /* @__PURE__ */ me({
  __name: "VariantSelector",
  props: {
    variants: {},
    selectedVariant: {}
  },
  emits: ["selectVariant"],
  setup(e, { emit: t }) {
    const { t: n } = Pe(), r = e, o = t;
    return (a, i) => (U(), ue(Yt, {
      "selected-option-title": r.selectedVariant.title,
      title: W(n)("options.tickets"),
      "title-is-black": !0
    }, {
      default: we(() => [
        z("div", Ew, [
          (U(!0), X(Oe, null, at(r.variants, (l) => (U(), X("div", {
            key: l.itemId,
            class: be([{
              "th-variant-list__item_active": r.selectedVariant.itemId === l.itemId
            }, "th-variant-list__item"]),
            onClick: (s) => o("selectVariant", l.itemId)
          }, oe(l.title), 11, ww))), 128))
        ])
      ]),
      _: 1
    }, 8, ["selected-option-title", "title"]));
  }
}), Iu = /* @__PURE__ */ ge(Cw, [["__scopeId", "data-v-78d9bc03"]]);
function Sm(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function Ei(e) {
  return Sm(e) ? new Date(e.getTime()) : e == null ? /* @__PURE__ */ new Date(NaN) : new Date(e);
}
function Tw(e) {
  return Sm(e) && !isNaN(e.getTime());
}
function km(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  if (!(t >= 0 && t <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6");
  var n = Ei(e), r = n.getDay(), o = (r + 7 - t) % 7;
  return n.setDate(n.getDate() - o), n.setHours(0, 0, 0, 0), n;
}
function Im(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.firstDayOfWeek, r = n === void 0 ? 0 : n, o = t.firstWeekContainsDate, a = o === void 0 ? 1 : o;
  if (!(a >= 1 && a <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7");
  for (var i = Ei(e), l = i.getFullYear(), s = /* @__PURE__ */ new Date(0), c = l + 1; c >= l - 1 && (s.setFullYear(c, 0, a), s.setHours(0, 0, 0, 0), s = km(s, r), !(i.getTime() >= s.getTime())); c--)
    ;
  return s;
}
function kl(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.firstDayOfWeek, r = n === void 0 ? 0 : n, o = t.firstWeekContainsDate, a = o === void 0 ? 1 : o, i = Ei(e), l = km(i, r), s = Im(i, {
    firstDayOfWeek: r,
    firstWeekContainsDate: a
  }), c = l.getTime() - s.getTime();
  return Math.round(c / (7 * 24 * 3600 * 1e3)) + 1;
}
var Il = {
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  weekdaysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  firstDayOfWeek: 0,
  firstWeekContainsDate: 1
}, Sw = /\[([^\]]+)]|YYYY|YY?|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|Z{1,2}|S{1,3}|w{1,2}|x|X|a|A/g;
function Et(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2, n = "".concat(Math.abs(e)), r = e < 0 ? "-" : ""; n.length < t; )
    n = "0".concat(n);
  return r + n;
}
function Ou(e) {
  return Math.round(e.getTimezoneOffset() / 15) * 15;
}
function Pu(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.floor(r / 60), a = r % 60;
  return n + Et(o, 2) + t + Et(a, 2);
}
var Du = function(t, n, r) {
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
    var r = n.meridiem || Du;
    return r(t.getHours(), t.getMinutes(), !1);
  },
  // am, pm
  a: function(t, n) {
    var r = n.meridiem || Du;
    return r(t.getHours(), t.getMinutes(), !0);
  },
  // Timezone: -01:00, +00:00, ... +12:00
  Z: function(t) {
    return Pu(Ou(t), ":");
  },
  // Timezone: -0100, +0000, ... +1200
  ZZ: function(t) {
    return Pu(Ou(t));
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
    return kl(t, {
      firstDayOfWeek: n.firstDayOfWeek,
      firstWeekContainsDate: n.firstWeekContainsDate
    });
  },
  ww: function(t, n) {
    return Et(bo.w(t, n), 2);
  }
};
function Ol(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = t ? String(t) : "YYYY-MM-DDTHH:mm:ss.SSSZ", o = Ei(e);
  if (!Tw(o))
    return "Invalid Date";
  var a = n.locale || Il;
  return r.replace(Sw, function(i, l) {
    return l || (typeof bo[i] == "function" ? "".concat(bo[i](o, a)) : i);
  });
}
function Au(e) {
  return Ow(e) || Iw(e) || kw();
}
function kw() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function Iw(e) {
  if (Symbol.iterator in Object(e) || Object.prototype.toString.call(e) === "[object Arguments]")
    return Array.from(e);
}
function Ow(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = new Array(e.length); t < e.length; t++)
      n[t] = e[t];
    return n;
  }
}
function $u(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Pw(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $u(n, !0).forEach(function(r) {
      zn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : $u(n).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Dw(e, t) {
  return Nw(e) || $w(e, t) || Aw();
}
function Aw() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function $w(e, t) {
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
function Nw(e) {
  if (Array.isArray(e))
    return e;
}
function zn(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var Lw = /(\[[^\[]*\])|(MM?M?M?|Do|DD?|ddd?d?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|S{1,3}|x|X|ZZ?|.)/g, Om = /\d/, qn = /\d\d/, Rw = /\d{3}/, Mw = /\d{4}/, to = /\d\d?/, xw = /[+-]\d\d:?\d\d/, Pm = /[+-]?\d+/, Bw = /[+-]?\d+(\.\d{1,3})?/, Pl = "year", wi = "month", Dm = "day", Am = "hour", $m = "minute", Nm = "second", Dl = "millisecond", Lm = {}, De = function(t, n, r) {
  var o = Array.isArray(t) ? t : [t], a;
  typeof r == "string" ? a = function(l) {
    var s = parseInt(l, 10);
    return zn({}, r, s);
  } : a = r, o.forEach(function(i) {
    Lm[i] = [n, a];
  });
}, Vw = function(t) {
  return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}, qo = function(t) {
  return function(n) {
    var r = n[t];
    if (!Array.isArray(r))
      throw new Error("Locale[".concat(t, "] need an array"));
    return new RegExp(r.map(Vw).join("|"));
  };
}, Go = function(t, n) {
  return function(r, o) {
    var a = o[t];
    if (!Array.isArray(a))
      throw new Error("Locale[".concat(t, "] need an array"));
    var i = a.indexOf(r);
    if (i < 0)
      throw new Error("Invalid Word");
    return zn({}, n, i);
  };
};
De("Y", Pm, Pl);
De("YY", qn, function(e) {
  var t = (/* @__PURE__ */ new Date()).getFullYear(), n = Math.floor(t / 100), r = parseInt(e, 10);
  return r = (r > 68 ? n - 1 : n) * 100 + r, zn({}, Pl, r);
});
De("YYYY", Mw, Pl);
De("M", to, function(e) {
  return zn({}, wi, parseInt(e, 10) - 1);
});
De("MM", qn, function(e) {
  return zn({}, wi, parseInt(e, 10) - 1);
});
De("MMM", qo("monthsShort"), Go("monthsShort", wi));
De("MMMM", qo("months"), Go("months", wi));
De("D", to, Dm);
De("DD", qn, Dm);
De(["H", "h"], to, Am);
De(["HH", "hh"], qn, Am);
De("m", to, $m);
De("mm", qn, $m);
De("s", to, Nm);
De("ss", qn, Nm);
De("S", Om, function(e) {
  return zn({}, Dl, parseInt(e, 10) * 100);
});
De("SS", qn, function(e) {
  return zn({}, Dl, parseInt(e, 10) * 10);
});
De("SSS", Rw, Dl);
function Uw(e) {
  return e.meridiemParse || /[ap]\.?m?\.?/i;
}
function Fw(e) {
  return "".concat(e).toLowerCase().charAt(0) === "p";
}
De(["A", "a"], Uw, function(e, t) {
  var n = typeof t.isPM == "function" ? t.isPM(e) : Fw(e);
  return {
    isPM: n
  };
});
function Hw(e) {
  var t = e.match(/([+-]|\d\d)/g) || ["-", "0", "0"], n = Dw(t, 3), r = n[0], o = n[1], a = n[2], i = parseInt(o, 10) * 60 + parseInt(a, 10);
  return i === 0 ? 0 : r === "+" ? -i : +i;
}
De(["Z", "ZZ"], xw, function(e) {
  return {
    offset: Hw(e)
  };
});
De("x", Pm, function(e) {
  return {
    date: new Date(parseInt(e, 10))
  };
});
De("X", Bw, function(e) {
  return {
    date: new Date(parseFloat(e) * 1e3)
  };
});
De("d", Om, "weekday");
De("dd", qo("weekdaysMin"), Go("weekdaysMin", "weekday"));
De("ddd", qo("weekdaysShort"), Go("weekdaysShort", "weekday"));
De("dddd", qo("weekdays"), Go("weekdays", "weekday"));
De("w", to, "week");
De("ww", qn, "week");
function Yw(e, t) {
  if (e !== void 0 && t !== void 0) {
    if (t) {
      if (e < 12)
        return e + 12;
    } else if (e === 12)
      return 0;
  }
  return e;
}
function jw(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Date(), n = [0, 0, 1, 0, 0, 0, 0], r = [t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()], o = !0, a = 0; a < 7; a++)
    e[a] === void 0 ? n[a] = o ? r[a] : n[a] : (n[a] = e[a], o = !1);
  return n;
}
function Ww(e, t, n, r, o, a, i) {
  var l;
  return e < 100 && e >= 0 ? (l = new Date(e + 400, t, n, r, o, a, i), isFinite(l.getFullYear()) && l.setFullYear(e)) : l = new Date(e, t, n, r, o, a, i), l;
}
function zw() {
  for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++)
    n[r] = arguments[r];
  var o = n[0];
  return o < 100 && o >= 0 ? (n[0] += 400, e = new Date(Date.UTC.apply(Date, n)), isFinite(e.getUTCFullYear()) && e.setUTCFullYear(o)) : e = new Date(Date.UTC.apply(Date, n)), e;
}
function qw(e, t, n) {
  var r = t.match(Lw);
  if (!r)
    throw new Error();
  for (var o = r.length, a = {}, i = 0; i < o; i += 1) {
    var l = r[i], s = Lm[l];
    if (s) {
      var u = typeof s[0] == "function" ? s[0](n) : s[0], f = s[1], d = (u.exec(e) || [])[0], v = f(d, n);
      a = Pw({}, a, {}, v), e = e.replace(d, "");
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
function Gw(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  try {
    var r = n.locale, o = r === void 0 ? Il : r, a = n.backupDate, i = a === void 0 ? /* @__PURE__ */ new Date() : a, l = qw(e, t, o), s = l.year, c = l.month, u = l.day, f = l.hour, d = l.minute, v = l.second, p = l.millisecond, g = l.isPM, h = l.date, m = l.offset, y = l.weekday, b = l.week;
    if (h)
      return h;
    var O = [s, c, u, f, d, v, p];
    if (O[3] = Yw(O[3], g), b !== void 0 && c === void 0 && u === void 0) {
      var N = Im(s === void 0 ? i : new Date(s, 3), {
        firstDayOfWeek: o.firstDayOfWeek,
        firstWeekContainsDate: o.firstWeekContainsDate
      });
      return new Date(N.getTime() + (b - 1) * 7 * 24 * 3600 * 1e3);
    }
    var S, E = jw(O, i);
    return m !== void 0 ? (E[6] += m * 60 * 1e3, S = zw.apply(void 0, Au(E))) : S = Ww.apply(void 0, Au(E)), y !== void 0 && S.getDay() !== y ? /* @__PURE__ */ new Date(NaN) : S;
  } catch {
    return /* @__PURE__ */ new Date(NaN);
  }
}
var Xw = Object.defineProperty, Kw = Object.defineProperties, Jw = Object.getOwnPropertyDescriptors, za = Object.getOwnPropertySymbols, Rm = Object.prototype.hasOwnProperty, Mm = Object.prototype.propertyIsEnumerable, Nu = (e, t, n) => t in e ? Xw(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, et = (e, t) => {
  for (var n in t || (t = {}))
    Rm.call(t, n) && Nu(e, n, t[n]);
  if (za)
    for (var n of za(t))
      Mm.call(t, n) && Nu(e, n, t[n]);
  return e;
}, $t = (e, t) => Kw(e, Jw(t)), Zw = (e, t) => {
  var n = {};
  for (var r in e)
    Rm.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && za)
    for (var r of za(e))
      t.indexOf(r) < 0 && Mm.call(e, r) && (n[r] = e[r]);
  return n;
};
const Qw = {
  formatLocale: Il,
  yearFormat: "YYYY",
  monthFormat: "MMM",
  monthBeforeYear: !0
};
let ho = "en";
const Or = {};
Or[ho] = Qw;
function xm(e, t, n = !1) {
  if (typeof e != "string")
    return Or[ho];
  let r = ho;
  return Or[e] && (r = e), t && (Or[e] = t, r = e), n || (ho = r), Or[e] || Or[ho];
}
function Ys(e) {
  return xm(e, void 0, !0);
}
function Al(e, t) {
  if (!Array.isArray(e))
    return [];
  const n = [], r = e.length;
  let o = 0;
  for (t = t || r; o < r; )
    n.push(e.slice(o, o += t));
  return n;
}
function Lu(e) {
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
function Bm(e, t) {
  if (!In(e))
    return {};
  let n = e;
  return In(t) && Object.keys(t).forEach((r) => {
    let o = t[r];
    const a = e[r];
    In(o) && In(a) && (o = Bm(a, o)), n = $t(et({}, n), { [r]: o });
  }), n;
}
function Ji(e) {
  const t = parseInt(String(e), 10);
  return t < 10 ? `0${t}` : `${t}`;
}
function eC(e) {
  const t = /-(\w)/g;
  return e.replace(t, (n, r) => r ? r.toUpperCase() : "");
}
const Vm = "datepicker_locale", Um = "datepicker_prefixClass", Fm = "datepicker_getWeek";
function $l() {
  return _t(Vm, ll(Ys()));
}
function tC(e) {
  const t = te(() => In(e.value) ? Bm(Ys(), e.value) : Ys(e.value));
  return An(Vm, t), t;
}
function nC(e) {
  An(Um, e);
}
function mt() {
  return _t(Um, "mx");
}
function rC(e) {
  An(Fm, e);
}
function oC() {
  return _t(Fm, kl);
}
function aC(e) {
  const t = e.style.display, n = e.style.visibility;
  e.style.display = "block", e.style.visibility = "hidden";
  const r = window.getComputedStyle(e), o = e.offsetWidth + parseInt(r.marginLeft, 10) + parseInt(r.marginRight, 10), a = e.offsetHeight + parseInt(r.marginTop, 10) + parseInt(r.marginBottom, 10);
  return e.style.display = t, e.style.visibility = n, { width: o, height: a };
}
function iC(e, t, n, r) {
  let o = 0, a = 0, i = 0, l = 0;
  const s = e.getBoundingClientRect(), c = document.documentElement.clientWidth, u = document.documentElement.clientHeight;
  return r && (i = window.pageXOffset + s.left, l = window.pageYOffset + s.top), c - s.left < t && s.right < t ? o = i - s.left + 1 : s.left + s.width / 2 <= c / 2 ? o = i : o = i + s.width - t, s.top <= n && u - s.bottom <= n ? a = l + u - s.top - n : s.top + s.height / 2 <= u / 2 ? a = l + s.height : a = l - n, { left: `${o}px`, top: `${a}px` };
}
function Nl(e, t = document.body) {
  if (!e || e === t)
    return null;
  const n = (a, i) => getComputedStyle(a, null).getPropertyValue(i);
  return /(auto|scroll)/.test(n(e, "overflow") + n(e, "overflow-y") + n(e, "overflow-x")) ? e : Nl(e.parentElement, t);
}
let va;
function sC() {
  if (typeof window > "u")
    return 0;
  if (va !== void 0)
    return va;
  const e = document.createElement("div");
  e.style.visibility = "hidden", e.style.overflow = "scroll", e.style.width = "100px", e.style.position = "absolute", e.style.top = "-9999px", document.body.appendChild(e);
  const t = document.createElement("div");
  return t.style.width = "100%", e.appendChild(t), va = e.offsetWidth - t.offsetWidth, e.parentNode.removeChild(e), va;
}
const Ru = "ontouchend" in document ? "touchstart" : "mousedown";
function lC(e) {
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
const Gn = () => (e) => e, cC = (e, t) => {
  const n = {};
  for (const r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      const o = eC(r);
      let a = e[r];
      t.indexOf(o) !== -1 && a === "" && (a = !0), n[o] = a;
    }
  return n;
};
function uC(e, {
  slots: t
}) {
  const n = yn(e, {
    appendToBody: !0
  }), r = mt(), o = Q(null), a = Q({
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
    } = aC(o.value);
    a.value = iC(s, c, u, n.appendToBody);
  };
  Ct(i, {
    flush: "post"
  }), Ct((s) => {
    const c = n.getRelativeElement();
    if (!c)
      return;
    const u = Nl(c) || window, f = lC(i);
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
    document.addEventListener(Ru, l), s(() => {
      document.removeEventListener(Ru, l);
    });
  }), () => G(Mv, {
    to: "body",
    disabled: !n.appendToBody
  }, {
    default: () => [G(Qd, {
      name: `${r}-zoom-in-down`
    }, {
      default: () => {
        var s;
        return [n.visible && G("div", {
          ref: o,
          class: `${r}-datepicker-main ${r}-datepicker-popup ${n.className}`,
          style: [et({
            position: "absolute"
          }, a.value), n.style || {}]
        }, [(s = t.default) == null ? void 0 : s.call(t)])];
      }
    })]
  });
}
const dC = Gn()(["style", "className", "visible", "appendToBody", "onClickOutside", "getRelativeElement"]);
var fC = gn(uC, dC);
const pC = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024",
  width: "1em",
  height: "1em"
}, mC = /* @__PURE__ */ z("path", { d: "M940.218 107.055H730.764v-60.51H665.6v60.51H363.055v-60.51H297.89v60.51H83.78c-18.617 0-32.581 13.963-32.581 32.581v805.237c0 18.618 13.964 32.582 32.582 32.582h861.09c18.619 0 32.583-13.964 32.583-32.582V139.636c-4.655-18.618-18.619-32.581-37.237-32.581zm-642.327 65.163v60.51h65.164v-60.51h307.2v60.51h65.163v-60.51h176.873v204.8H116.364v-204.8H297.89zM116.364 912.291V442.18H912.29v470.11H116.364z" }, null, -1), hC = [
  mC
];
function Hm(e, t) {
  return U(), X("svg", pC, hC);
}
const vC = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024",
  width: "1em",
  height: "1em"
}, gC = /* @__PURE__ */ z("path", { d: "M810.005 274.005 572.011 512l237.994 237.995-60.01 60.01L512 572.011 274.005 810.005l-60.01-60.01L451.989 512 213.995 274.005l60.01-60.01L512 451.989l237.995-237.994z" }, null, -1), yC = [
  gC
];
function _C(e, t) {
  return U(), X("svg", vC, yC);
}
const bC = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
}, EC = /* @__PURE__ */ z("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1), wC = /* @__PURE__ */ z("path", { d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" }, null, -1), CC = /* @__PURE__ */ z("path", { d: "M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" }, null, -1), TC = [
  EC,
  wC,
  CC
];
function SC(e, t) {
  return U(), X("svg", bC, TC);
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
function kC(e) {
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
function IC(e) {
  const t = new Date(e);
  return t.setMonth(0, 1), t.setHours(0, 0, 0, 0), t;
}
function Mu(e) {
  const t = new Date(e);
  return t.setDate(1), t.setHours(0, 0, 0, 0), t;
}
function Bn(e) {
  const t = new Date(e);
  return t.setHours(0, 0, 0, 0), t;
}
function OC({
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
function qa(e, t) {
  const n = new Date(e), r = typeof t == "function" ? t(n.getMonth()) : Number(t), o = n.getFullYear(), a = or(o, r + 1, 0).getDate(), i = n.getDate();
  return n.setMonth(r, Math.min(i, a)), n;
}
function Lr(e, t) {
  const n = new Date(e), r = typeof t == "function" ? t(n.getFullYear()) : t;
  return n.setFullYear(r), n;
}
function PC(e, t) {
  const n = new Date(t), r = new Date(e), o = n.getFullYear() - r.getFullYear(), a = n.getMonth() - r.getMonth();
  return o * 12 + a;
}
function Ga(e, t) {
  const n = new Date(e), r = new Date(t);
  return n.setHours(r.getHours(), r.getMinutes(), r.getSeconds()), n;
}
function DC(e, {
  slots: t
}) {
  const n = yn(e, {
    editable: !0,
    disabled: !1,
    clearable: !0,
    range: !1,
    multiple: !1
  }), r = mt(), o = Q(null), a = te(() => n.separator || (n.range ? " ~ " : ",")), i = (v) => n.range ? ar(v) : n.multiple ? kC(v) : pn(v), l = (v) => Array.isArray(v) ? v.some((p) => n.disabledDate(p)) : n.disabledDate(v), s = te(() => o.value !== null ? o.value : typeof n.renderInputText == "function" ? n.renderInputText(n.value) : i(n.value) ? Array.isArray(n.value) ? n.value.map((v) => n.formatDate(v)).join(a.value) : n.formatDate(n.value) : ""), c = (v) => {
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
      let h = p.split(a.value);
      h.length !== 2 && (h = p.split(a.value.trim())), g = h.map((m) => n.parseDate(m.trim()));
    } else
      n.multiple ? g = p.split(a.value).map((h) => n.parseDate(h.trim())) : g = n.parseDate(p);
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
    const h = !n.disabled && n.clearable && s.value, m = $t(et({
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
    return G("div", {
      class: `${r}-input-wrapper`,
      onClick: n.onClick
    }, [((v = t.input) == null ? void 0 : v.call(t, m)) || G("input", m, null), h ? G("i", {
      class: `${r}-icon-clear`,
      onClick: c
    }, [((p = t["icon-clear"]) == null ? void 0 : p.call(t)) || G(_C, null, null)]) : null, G("i", {
      class: `${r}-icon-calendar`
    }, [((g = t["icon-calendar"]) == null ? void 0 : g.call(t)) || G(Hm, null, null)])]);
  };
}
const Ll = Gn()(["placeholder", "editable", "disabled", "clearable", "inputClass", "inputAttr", "range", "multiple", "separator", "renderInputText", "onInputError", "onClear"]), AC = Gn()(["value", "formatDate", "parseDate", "disabledDate", "onChange", "onFocus", "onBlur", "onClick", ...Ll]);
var $C = gn(DC, AC);
function NC(e, {
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
  nC(r.prefixClass), rC(((n = r.formatter) == null ? void 0 : n.getWeek) || kl);
  const o = tC(vo(e, "lang")), a = Q(), i = () => a.value, l = Q(!1), s = te(() => !r.disabled && (typeof r.open == "boolean" ? r.open : l.value)), c = () => {
    var S, E;
    r.disabled || s.value || (l.value = !0, (S = r["onUpdate:open"]) == null || S.call(r, !0), (E = r.onOpen) == null || E.call(r));
  }, u = () => {
    var S, E;
    s.value && (l.value = !1, (S = r["onUpdate:open"]) == null || S.call(r, !1), (E = r.onClose) == null || E.call(r));
  }, f = (S, E) => (E = E || r.format, In(r.formatter) && typeof r.formatter.stringify == "function" ? r.formatter.stringify(S, E) : Ol(S, E, {
    locale: o.value.formatLocale
  })), d = (S, E) => {
    if (E = E || r.format, In(r.formatter) && typeof r.formatter.parse == "function")
      return r.formatter.parse(S, E);
    const C = /* @__PURE__ */ new Date();
    return Gw(S, E, {
      locale: o.value.formatLocale,
      backupDate: C
    });
  }, v = (S) => {
    switch (r.valueType) {
      case "date":
        return S instanceof Date ? new Date(S.getTime()) : /* @__PURE__ */ new Date(NaN);
      case "timestamp":
        return typeof S == "number" ? new Date(S) : /* @__PURE__ */ new Date(NaN);
      case "format":
        return typeof S == "string" ? d(S) : /* @__PURE__ */ new Date(NaN);
      default:
        return typeof S == "string" ? d(S, r.valueType) : /* @__PURE__ */ new Date(NaN);
    }
  }, p = (S) => {
    if (!pn(S))
      return null;
    switch (r.valueType) {
      case "date":
        return S;
      case "timestamp":
        return S.getTime();
      case "format":
        return f(S);
      default:
        return f(S, r.valueType);
    }
  }, g = te(() => {
    const S = r.value;
    return r.range ? (Array.isArray(S) ? S.slice(0, 2) : [null, null]).map(v) : r.multiple ? (Array.isArray(S) ? S : []).map(v) : v(S);
  }), h = (S, E, C = !0) => {
    var I, _;
    const k = Array.isArray(S) ? S.map(p) : p(S);
    return (I = r["onUpdate:value"]) == null || I.call(r, k), (_ = r.onChange) == null || _.call(r, k, E), C && u(), k;
  }, m = Q(/* @__PURE__ */ new Date());
  Ct(() => {
    s.value && (m.value = g.value);
  });
  const y = (S, E) => {
    r.confirm ? m.value = S : h(S, E, !r.multiple && (E === r.type || E === "time"));
  }, b = () => {
    var S;
    const E = h(m.value);
    (S = r.onConfirm) == null || S.call(r, E);
  }, O = (S) => r.disabledDate(S) || r.disabledTime(S), N = (S) => {
    var E;
    const {
      prefixClass: C
    } = r;
    return G("div", {
      class: `${C}-datepicker-sidebar`
    }, [(E = t.sidebar) == null ? void 0 : E.call(t, S), (r.shortcuts || []).map((I, _) => G("button", {
      key: _,
      "data-index": _,
      type: "button",
      class: `${C}-btn ${C}-btn-text ${C}-btn-shortcut`,
      onClick: () => {
        var k;
        const A = (k = I.onClick) == null ? void 0 : k.call(I);
        A && h(A);
      }
    }, [I.text]))]);
  };
  return () => {
    var S, E;
    const {
      prefixClass: C,
      disabled: I,
      confirm: _,
      range: k,
      popupClass: A,
      popupStyle: x,
      appendToBody: M
    } = r, $ = {
      value: m.value,
      "onUpdate:value": y,
      emit: h
    }, L = t.header && G("div", {
      class: `${C}-datepicker-header`
    }, [t.header($)]), F = (t.footer || _) && G("div", {
      class: `${C}-datepicker-footer`
    }, [(S = t.footer) == null ? void 0 : S.call(t, $), _ && G("button", {
      type: "button",
      class: `${C}-btn ${C}-datepicker-btn-confirm`,
      onClick: b
    }, [r.confirmText])]), V = (E = t.content) == null ? void 0 : E.call(t, $), q = (t.sidebar || r.shortcuts) && N($);
    return G("div", {
      ref: a,
      class: {
        [`${C}-datepicker`]: !0,
        [`${C}-datepicker-range`]: k,
        disabled: I
      }
    }, [G($C, $t(et({}, dn(r, Ll)), {
      value: g.value,
      formatDate: f,
      parseDate: d,
      disabledDate: O,
      onChange: h,
      onClick: c,
      onFocus: c,
      onBlur: u
    }), dn(t, ["icon-calendar", "icon-clear", "input"])), G(fC, {
      className: A,
      style: x,
      visible: s.value,
      appendToBody: M,
      getRelativeElement: i,
      onClickOutside: u
    }, {
      default: () => [q, G("div", {
        class: `${C}-datepicker-content`
      }, [L, V, F])]
    })]);
  };
}
const LC = Gn()(["value", "valueType", "type", "format", "formatter", "lang", "prefixClass", "appendToBody", "open", "popupClass", "popupStyle", "confirm", "confirmText", "shortcuts", "disabledDate", "disabledTime", "onOpen", "onClose", "onConfirm", "onChange", "onUpdate:open", "onUpdate:value"]), RC = [...LC, ...Ll];
var xu = gn(NC, RC);
function ga(e) {
  var t = e, {
    value: n
  } = t, r = Zw(t, [
    "value"
  ]);
  const o = mt();
  return G("button", $t(et({}, r), {
    type: "button",
    class: `${o}-btn ${o}-btn-text ${o}-btn-icon-${n}`
  }), [G("i", {
    class: `${o}-icon-${n}`
  }, null)]);
}
function Rl({
  type: e,
  calendar: t,
  onUpdateCalendar: n
}, {
  slots: r
}) {
  var o;
  const a = mt(), i = () => {
    n(qa(t, (d) => d - 1));
  }, l = () => {
    n(qa(t, (d) => d + 1));
  }, s = () => {
    n(Lr(t, (d) => d - 1));
  }, c = () => {
    n(Lr(t, (d) => d + 1));
  }, u = () => {
    n(Lr(t, (d) => d - 10));
  }, f = () => {
    n(Lr(t, (d) => d + 10));
  };
  return G("div", {
    class: `${a}-calendar-header`
  }, [G(ga, {
    value: "double-left",
    onClick: e === "year" ? u : s
  }, null), e === "date" && G(ga, {
    value: "left",
    onClick: i
  }, null), G(ga, {
    value: "double-right",
    onClick: e === "year" ? f : c
  }, null), e === "date" && G(ga, {
    value: "right",
    onClick: l
  }, null), G("span", {
    class: `${a}-calendar-header-label`
  }, [(o = r.default) == null ? void 0 : o.call(r)])]);
}
function MC({
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
  const f = mt(), d = oC(), v = $l().value, {
    yearFormat: p,
    monthBeforeYear: g,
    monthFormat: h = "MMM",
    formatLocale: m
  } = v, y = m.firstDayOfWeek || 0;
  let b = v.days || m.weekdaysMin;
  b = b.concat(b).slice(y, y + 7);
  const O = e.getFullYear(), N = e.getMonth(), S = Al(OC({
    firstDayOfWeek: y,
    year: O,
    month: N
  }), 7), E = ($, L) => Ol($, L, {
    locale: v.formatLocale
  }), C = ($) => {
    l($);
  }, I = ($) => {
    const L = $.getAttribute("data-index"), [F, V] = L.split(",").map((B) => parseInt(B, 10)), q = S[F][V];
    return new Date(q);
  }, _ = ($) => {
    i(I($.currentTarget));
  }, k = ($) => {
    c && c(I($.currentTarget));
  }, A = ($) => {
    u && u(I($.currentTarget));
  }, x = G("button", {
    type: "button",
    class: `${f}-btn ${f}-btn-text ${f}-btn-current-year`,
    onClick: () => C("year")
  }, [E(e, p)]), M = G("button", {
    type: "button",
    class: `${f}-btn ${f}-btn-text ${f}-btn-current-month`,
    onClick: () => C("month")
  }, [E(e, h)]);
  return n = typeof n == "boolean" ? n : t, G("div", {
    class: [`${f}-calendar ${f}-calendar-panel-date`, {
      [`${f}-calendar-week-mode`]: t
    }]
  }, [G(Rl, {
    type: "date",
    calendar: e,
    onUpdateCalendar: s
  }, {
    default: () => [g ? [M, x] : [x, M]]
  }), G("div", {
    class: `${f}-calendar-content`
  }, [G("table", {
    class: `${f}-table ${f}-table-date`
  }, [G("thead", null, [G("tr", null, [n && G("th", {
    class: `${f}-week-number-header`
  }, null), b.map(($) => G("th", {
    key: $
  }, [$]))])]), G("tbody", null, [S.map(($, L) => G("tr", {
    key: L,
    class: [`${f}-date-row`, {
      [`${f}-active-week`]: o($)
    }]
  }, [n && G("td", {
    class: `${f}-week-number`,
    "data-index": `${L},0`,
    onClick: _
  }, [G("div", null, [d($[0])])]), $.map((F, V) => G("td", {
    key: V,
    class: ["cell", a(F)],
    title: E(F, r),
    "data-index": `${L},${V}`,
    onClick: _,
    onMouseenter: k,
    onMouseleave: A
  }, [G("div", null, [F.getDate()])]))]))])])])]);
}
function xC({
  calendar: e,
  getCellClasses: t,
  onSelect: n,
  onUpdateCalendar: r,
  onUpdatePanel: o
}) {
  const a = mt(), i = $l().value, l = i.months || i.formatLocale.monthsShort, s = (u) => or(e.getFullYear(), u), c = (u) => {
    const d = u.currentTarget.getAttribute("data-month");
    n(s(parseInt(d, 10)));
  };
  return G("div", {
    class: `${a}-calendar ${a}-calendar-panel-month`
  }, [G(Rl, {
    type: "month",
    calendar: e,
    onUpdateCalendar: r
  }, {
    default: () => [G("button", {
      type: "button",
      class: `${a}-btn ${a}-btn-text ${a}-btn-current-year`,
      onClick: () => o("year")
    }, [e.getFullYear()])]
  }), G("div", {
    class: `${a}-calendar-content`
  }, [G("table", {
    class: `${a}-table ${a}-table-month`
  }, [Al(l, 3).map((u, f) => G("tr", {
    key: f
  }, [u.map((d, v) => {
    const p = f * 3 + v;
    return G("td", {
      key: v,
      class: ["cell", t(s(p))],
      "data-month": p,
      onClick: c
    }, [G("div", null, [d])]);
  })]))])])]);
}
const BC = (e) => {
  const t = Math.floor(e.getFullYear() / 10) * 10, n = [];
  for (let r = 0; r < 10; r++)
    n.push(t + r);
  return Al(n, 2);
};
function VC({
  calendar: e,
  getCellClasses: t = () => [],
  getYearPanel: n = BC,
  onSelect: r,
  onUpdateCalendar: o
}) {
  const a = mt(), i = (f) => or(f, 0), l = (f) => {
    const v = f.currentTarget.getAttribute("data-year");
    r(i(parseInt(v, 10)));
  }, s = n(new Date(e)), c = s[0][0], u = Lu(Lu(s));
  return G("div", {
    class: `${a}-calendar ${a}-calendar-panel-year`
  }, [G(Rl, {
    type: "year",
    calendar: e,
    onUpdateCalendar: o
  }, {
    default: () => [G("span", null, [c]), G("span", {
      class: `${a}-calendar-decade-separator`
    }, null), G("span", null, [u])]
  }), G("div", {
    class: `${a}-calendar-content`
  }, [G("table", {
    class: `${a}-table ${a}-table-year`
  }, [s.map((f, d) => G("tr", {
    key: d
  }, [f.map((v, p) => G("td", {
    key: p,
    class: ["cell", t(i(v))],
    "data-year": v,
    onClick: l
  }, [G("div", null, [v])]))]))])])]);
}
function UC(e) {
  const t = yn(e, {
    defaultValue: Bn(/* @__PURE__ */ new Date()),
    type: "date",
    disabledDate: () => !1,
    getClasses: () => [],
    titleFormat: "YYYY-MM-DD"
  }), n = te(() => (Array.isArray(t.value) ? t.value : [t.value]).filter(pn).map((y) => t.type === "year" ? IC(y) : t.type === "month" ? Mu(y) : Bn(y))), r = Q(/* @__PURE__ */ new Date());
  Ct(() => {
    let m = t.calendar;
    if (!pn(m)) {
      const {
        length: y
      } = n.value;
      m = Ci(y > 0 ? n.value[y - 1] : t.defaultValue);
    }
    r.value = Mu(m);
  });
  const o = (m) => {
    var y;
    r.value = m, (y = t.onCalendarChange) == null || y.call(t, m);
  }, a = Q("date");
  Ct(() => {
    const m = ["date", "month", "year"], y = Math.max(m.indexOf(t.type), m.indexOf(t.defaultPanel));
    a.value = y !== -1 ? m[y] : "date";
  });
  const i = (m) => {
    var y;
    const b = a.value;
    a.value = m, (y = t.onPanelChange) == null || y.call(t, m, b);
  }, l = (m) => t.disabledDate(new Date(m), n.value), s = (m, y) => {
    var b, O, N;
    if (!l(m))
      if ((b = t.onPick) == null || b.call(t, m), t.multiple === !0) {
        const S = n.value.filter((E) => E.getTime() !== m.getTime());
        S.length === n.value.length && S.push(m), (O = t["onUpdate:value"]) == null || O.call(t, S, y);
      } else
        (N = t["onUpdate:value"]) == null || N.call(t, m, y);
  }, c = (m) => {
    s(m, t.type === "week" ? "week" : "date");
  }, u = (m) => {
    if (t.type === "year")
      s(m, "year");
    else if (o(m), i("month"), t.partialUpdate && n.value.length === 1) {
      const y = Lr(n.value[0], m.getFullYear());
      s(y, "year");
    }
  }, f = (m) => {
    if (t.type === "month")
      s(m, "month");
    else if (o(m), i("date"), t.partialUpdate && n.value.length === 1) {
      const y = qa(Lr(n.value[0], m.getFullYear()), m.getMonth());
      s(y, "month");
    }
  }, d = (m, y = []) => (l(m) ? y.push("disabled") : n.value.some((b) => b.getTime() === m.getTime()) && y.push("active"), y.concat(t.getClasses(m, n.value, y.join(" ")))), v = (m) => {
    const y = m.getMonth() !== r.value.getMonth(), b = [];
    return m.getTime() === (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0) && b.push("today"), y && b.push("not-current-month"), d(m, b);
  }, p = (m) => t.type !== "month" ? r.value.getMonth() === m.getMonth() ? "active" : "" : d(m), g = (m) => t.type !== "year" ? r.value.getFullYear() === m.getFullYear() ? "active" : "" : d(m), h = (m) => {
    if (t.type !== "week")
      return !1;
    const y = m[0].getTime(), b = m[6].getTime();
    return n.value.some((O) => {
      const N = O.getTime();
      return N >= y && N <= b;
    });
  };
  return () => a.value === "year" ? G(VC, {
    calendar: r.value,
    getCellClasses: g,
    getYearPanel: t.getYearPanel,
    onSelect: u,
    onUpdateCalendar: o
  }, null) : a.value === "month" ? G(xC, {
    calendar: r.value,
    getCellClasses: p,
    onSelect: f,
    onUpdatePanel: i,
    onUpdateCalendar: o
  }, null) : G(MC, {
    isWeekMode: t.type === "week",
    showWeekNumber: t.showWeekNumber,
    titleFormat: t.titleFormat,
    calendar: r.value,
    getCellClasses: v,
    getWeekActive: h,
    onSelect: c,
    onUpdatePanel: i,
    onUpdateCalendar: o,
    onDateMouseEnter: t.onDateMouseEnter,
    onDateMouseLeave: t.onDateMouseLeave
  }, null);
}
const Ti = Gn()(["type", "value", "defaultValue", "defaultPanel", "disabledDate", "getClasses", "calendar", "multiple", "partialUpdate", "showWeekNumber", "titleFormat", "getYearPanel", "onDateMouseEnter", "onDateMouseLeave", "onCalendarChange", "onPanelChange", "onUpdate:value", "onPick"]);
var Si = gn(UC, Ti);
const Bu = (e, t) => {
  const n = e.getTime();
  let [r, o] = t.map((a) => a.getTime());
  return r > o && ([r, o] = [o, r]), n > r && n < o;
};
function FC(e) {
  const t = yn(e, {
    defaultValue: /* @__PURE__ */ new Date(),
    type: "date"
  }), n = mt(), r = te(() => {
    let h = Array.isArray(t.defaultValue) ? t.defaultValue : [t.defaultValue, t.defaultValue];
    return h = h.map((m) => Bn(m)), ar(h) ? h : [/* @__PURE__ */ new Date(), /* @__PURE__ */ new Date()].map((m) => Bn(m));
  }), o = Q([/* @__PURE__ */ new Date(NaN), /* @__PURE__ */ new Date(NaN)]);
  Ct(() => {
    ar(t.value) && (o.value = t.value);
  });
  const a = (h, m) => {
    var y;
    const [b, O] = o.value;
    pn(b) && !pn(O) ? (b.getTime() > h.getTime() ? o.value = [h, b] : o.value = [b, h], (y = t["onUpdate:value"]) == null || y.call(t, o.value, m)) : o.value = [h, /* @__PURE__ */ new Date(NaN)];
  }, i = Q([/* @__PURE__ */ new Date(), /* @__PURE__ */ new Date()]), l = te(() => ar(t.calendar) ? t.calendar : i.value), s = te(() => t.type === "year" ? 10 * 12 : t.type === "month" ? 1 * 12 : 1), c = (h, m) => {
    var y;
    const b = PC(h[0], h[1]), O = s.value - b;
    if (O > 0) {
      const N = m === 1 ? 0 : 1;
      h[N] = qa(h[N], (S) => S + (N === 0 ? -O : O));
    }
    i.value = h, (y = t.onCalendarChange) == null || y.call(t, h, m);
  }, u = (h) => {
    c([h, l.value[1]], 0);
  }, f = (h) => {
    c([l.value[0], h], 1);
  };
  Ct(() => {
    const h = ar(t.value) ? t.value : r.value;
    c(h.slice(0, 2));
  });
  const d = Q(null), v = (h) => d.value = h, p = () => d.value = null, g = (h, m, y) => {
    const b = t.getClasses ? t.getClasses(h, m, y) : [], O = Array.isArray(b) ? b : [b];
    return /disabled|active/.test(y) ? O : (m.length === 2 && Bu(h, m) && O.push("in-range"), m.length === 1 && d.value && Bu(h, [m[0], d.value]) ? O.concat("hover-in-range") : O);
  };
  return () => {
    const h = l.value.map((m, y) => {
      const b = $t(et({}, t), {
        calendar: m,
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
      return G(Si, b, null);
    });
    return G("div", {
      class: `${n}-calendar-range`
    }, [h]);
  };
}
const Ml = Ti;
var xl = gn(FC, Ml);
const Ym = me({
  setup(e, {
    slots: t
  }) {
    const n = mt(), r = Q(), o = Q(""), a = Q("");
    rt(() => {
      if (!r.value)
        return;
      const p = r.value, g = p.clientHeight * 100 / p.scrollHeight;
      o.value = g < 100 ? `${g}%` : "";
    });
    const l = sC(), s = (p) => {
      const g = p.currentTarget, {
        scrollHeight: h,
        scrollTop: m
      } = g;
      a.value = `${m * 100 / h}%`;
    };
    let c = !1, u = 0;
    const f = (p) => {
      p.stopImmediatePropagation();
      const g = p.currentTarget, {
        offsetTop: h
      } = g;
      c = !0, u = p.clientY - h;
    }, d = (p) => {
      if (!c || !r.value)
        return;
      const {
        clientY: g
      } = p, {
        scrollHeight: h,
        clientHeight: m
      } = r.value, b = (g - u) * h / m;
      r.value.scrollTop = b;
    }, v = () => {
      c = !1;
    };
    return rt(() => {
      document.addEventListener("mousemove", d), document.addEventListener("mouseup", v);
    }), Jd(() => {
      document.addEventListener("mousemove", d), document.addEventListener("mouseup", v);
    }), () => {
      var p;
      return G("div", {
        class: `${n}-scrollbar`,
        style: {
          position: "relative",
          overflow: "hidden"
        }
      }, [G("div", {
        ref: r,
        class: `${n}-scrollbar-wrap`,
        style: {
          marginRight: `-${l}px`
        },
        onScroll: s
      }, [(p = t.default) == null ? void 0 : p.call(t)]), G("div", {
        class: `${n}-scrollbar-track`
      }, [G("div", {
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
function HC({
  options: e,
  getClasses: t,
  onSelect: n
}) {
  const r = mt(), o = (a) => {
    const i = a.target, l = a.currentTarget;
    if (i.tagName.toUpperCase() !== "LI")
      return;
    const s = l.getAttribute("data-type"), c = parseInt(l.getAttribute("data-index"), 10), u = parseInt(i.getAttribute("data-index"), 10), f = e[c].list[u].value;
    n(f, s);
  };
  return G("div", {
    class: `${r}-time-columns`
  }, [e.map((a, i) => G(Ym, {
    key: a.type,
    class: `${r}-time-column`
  }, {
    default: () => [G("ul", {
      class: `${r}-time-list`,
      "data-index": i,
      "data-type": a.type,
      onClick: o
    }, [a.list.map((l, s) => G("li", {
      key: l.text,
      "data-index": s,
      class: [`${r}-time-item`, t(l.value, a.type)]
    }, [l.text]))])]
  }))]);
}
function YC(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !xv(e);
}
function jC(e) {
  let t;
  const n = mt();
  return G(Ym, null, YC(t = e.options.map((r) => G("div", {
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
function WC(e, t) {
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
function zC({
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
      const p = c + v * f, g = Math.floor(p / 60), h = p % 60, m = new Date(e);
      m.setHours(g, h, 0), o.push({
        value: m,
        text: r(m, s)
      });
    }
  }
  return o;
}
const jm = (e, t, n = 0) => {
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
    e.scrollTop = a, jm(e, t, n - 10);
  });
};
function qC(e) {
  const t = yn(e, {
    defaultValue: Bn(/* @__PURE__ */ new Date()),
    format: "HH:mm:ss",
    timeTitleFormat: "YYYY-MM-DD",
    disabledTime: () => !1,
    scrollDuration: 100
  }), n = mt(), r = $l(), o = (g, h) => Ol(g, h, {
    locale: r.value.formatLocale
  }), a = Q(/* @__PURE__ */ new Date());
  Ct(() => {
    a.value = Ci(t.value, t.defaultValue);
  });
  const i = (g) => Array.isArray(g) ? g.every((h) => t.disabledTime(new Date(h))) : t.disabledTime(new Date(g)), l = (g) => {
    const h = new Date(g);
    return i([h.getTime(), h.setMinutes(0, 0, 0), h.setMinutes(59, 59, 999)]);
  }, s = (g) => {
    const h = new Date(g);
    return i([h.getTime(), h.setSeconds(0, 0), h.setSeconds(59, 999)]);
  }, c = (g) => {
    const h = new Date(g), m = h.getHours() < 12 ? 0 : 12, y = m + 11;
    return i([h.getTime(), h.setHours(m, 0, 0, 0), h.setHours(y, 59, 59, 999)]);
  }, u = (g, h) => h === "hour" ? l(g) : h === "minute" ? s(g) : h === "ampm" ? c(g) : i(g), f = (g, h) => {
    var m;
    if (!u(g, h)) {
      const y = new Date(g);
      a.value = y, i(y) || (m = t["onUpdate:value"]) == null || m.call(t, y, h);
    }
  }, d = (g, h) => u(g, h) ? "disabled" : g.getTime() === a.value.getTime() ? "active" : "", v = Q(), p = (g) => {
    if (!v.value)
      return;
    const h = v.value.querySelectorAll(".active");
    for (let m = 0; m < h.length; m++) {
      const y = h[m], b = Nl(y, v.value);
      if (b) {
        const O = y.offsetTop;
        jm(b, O, g);
      }
    }
  };
  return rt(() => p(0)), Ne(a, () => p(t.scrollDuration), {
    flush: "post"
  }), () => {
    let g;
    return t.timePickerOptions ? g = G(jC, {
      onSelect: f,
      getClasses: d,
      options: zC({
        date: a.value,
        format: t.format,
        option: t.timePickerOptions,
        formatDate: o
      })
    }, null) : g = G(HC, {
      options: WC(a.value, t),
      onSelect: f,
      getClasses: d
    }, null), G("div", {
      class: `${n}-time`,
      ref: v
    }, [t.showTimeHeader && G("div", {
      class: `${n}-time-header`
    }, [G("button", {
      type: "button",
      class: `${n}-btn ${n}-btn-text ${n}-time-header-title`,
      onClick: t.onClickTitle
    }, [o(a.value, t.timeTitleFormat)])]), G("div", {
      class: `${n}-time-content`
    }, [g])]);
  };
}
const ki = Gn()(["value", "defaultValue", "format", "timeTitleFormat", "showTimeHeader", "disabledTime", "timePickerOptions", "hourOptions", "minuteOptions", "secondOptions", "hourStep", "minuteStep", "secondStep", "showHour", "showMinute", "showSecond", "use12h", "scrollDuration", "onClickTitle", "onUpdate:value"]);
var Lo = gn(qC, ki);
function GC(e) {
  const t = yn(e, {
    defaultValue: Bn(/* @__PURE__ */ new Date()),
    disabledTime: () => !1
  }), n = mt(), r = Q([/* @__PURE__ */ new Date(NaN), /* @__PURE__ */ new Date(NaN)]);
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
    return G("div", {
      class: `${n}-time-range`
    }, [G(Lo, $t(et({}, t), {
      "onUpdate:value": a,
      value: r.value[0],
      defaultValue: c[0],
      disabledTime: l
    }), null), G(Lo, $t(et({}, t), {
      "onUpdate:value": i,
      value: r.value[1],
      defaultValue: c[1],
      disabledTime: s
    }), null)]);
  };
}
const Bl = ki;
var Vl = gn(GC, Bl);
function Wm(e) {
  const t = Q(!1), n = () => {
    var a;
    t.value = !1, (a = e.onShowTimePanelChange) == null || a.call(e, !1);
  }, r = () => {
    var a;
    t.value = !0, (a = e.onShowTimePanelChange) == null || a.call(e, !0);
  };
  return { timeVisible: te(() => typeof e.showTimePanel == "boolean" ? e.showTimePanel : t.value), openTimePanel: r, closeTimePanel: n };
}
function XC(e) {
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
  } = Wm(t), i = (l, s) => {
    var c;
    s === "date" && r();
    let u = Ga(l, Ci(t.value, t.defaultValue));
    if (t.disabledTime(new Date(u)) && (u = Ga(l, t.defaultValue), t.disabledTime(new Date(u)))) {
      n.value = u;
      return;
    }
    (c = t["onUpdate:value"]) == null || c.call(t, u, s);
  };
  return () => {
    const l = mt(), s = $t(et({}, dn(t, Ti)), {
      multiple: !1,
      type: "date",
      value: n.value,
      "onUpdate:value": i
    }), c = $t(et({}, dn(t, ki)), {
      showTimeHeader: !0,
      value: n.value,
      "onUpdate:value": t["onUpdate:value"],
      onClickTitle: o
    });
    return G("div", {
      class: `${l}-date-time`
    }, [G(Si, s, null), a.value && G(Lo, c, null)]);
  };
}
const zm = Gn()(["showTimePanel", "onShowTimePanelChange"]), KC = [...zm, ...Ti, ...ki];
var qm = gn(XC, KC);
function JC(e) {
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
  } = Wm(t), i = (l, s) => {
    var c;
    s === "date" && r();
    const u = Array.isArray(t.defaultValue) ? t.defaultValue : [t.defaultValue, t.defaultValue];
    let f = l.map((d, v) => {
      const p = ar(t.value) ? t.value[v] : u[v];
      return Ga(d, p);
    });
    if (f[1].getTime() < f[0].getTime() && (f = [f[0], f[0]]), f.some(t.disabledTime) && (f = l.map((d, v) => Ga(d, u[v])), f.some(t.disabledTime))) {
      n.value = f;
      return;
    }
    (c = t["onUpdate:value"]) == null || c.call(t, f, s);
  };
  return () => {
    const l = mt(), s = $t(et({}, dn(t, Ml)), {
      type: "date",
      value: n.value,
      "onUpdate:value": i
    }), c = $t(et({}, dn(t, Bl)), {
      showTimeHeader: !0,
      value: n.value,
      "onUpdate:value": t["onUpdate:value"],
      onClickTitle: o
    });
    return G("div", {
      class: `${l}-date-time-range`
    }, [G(xl, s, null), a.value && G(Vl, c, null)]);
  };
}
const ZC = [...zm, ...Bl, ...Ml];
var Gm = gn(JC, ZC);
const QC = Gn()(["range", "open", "appendToBody", "clearable", "confirm", "disabled", "editable", "multiple", "partialUpdate", "showHour", "showMinute", "showSecond", "showTimeHeader", "showTimePanel", "showWeekNumber", "use12h"]), Vu = {
  date: "YYYY-MM-DD",
  datetime: "YYYY-MM-DD HH:mm:ss",
  year: "YYYY",
  month: "YYYY-MM",
  time: "HH:mm:ss",
  week: "w"
};
function Xm(e, {
  slots: t
}) {
  const n = e.type || "date", r = e.format || Vu[n] || Vu.date, o = $t(et({}, cC(e, QC)), {
    type: n,
    format: r
  });
  return G(xu, dn(o, xu.props), et({
    content: (a) => {
      if (o.range) {
        const i = n === "time" ? Vl : n === "datetime" ? Gm : xl;
        return dr(i, dn(et(et({}, o), a), i.props));
      } else {
        const i = n === "time" ? Lo : n === "datetime" ? qm : Si;
        return dr(i, dn(et(et({}, o), a), i.props));
      }
    },
    "icon-calendar": () => n === "time" ? G(SC, null, null) : G(Hm, null, null)
  }, t));
}
const eT = {
  locale: xm,
  install: (e) => {
    e.component("DatePicker", Xm);
  }
};
var ir = Object.assign(Xm, eT, {
  Calendar: Si,
  CalendarRange: xl,
  TimePanel: Lo,
  TimeRange: Vl,
  DateTime: qm,
  DateTimeRange: Gm
}), tT = {
  months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
  monthsShort: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
  weekdays: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
  weekdaysShort: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
  weekdaysMin: ["di", "lu", "ma", "me", "je", "ve", "sa"],
  firstDayOfWeek: 1,
  firstWeekContainsDate: 1
};
const nT = {
  formatLocale: tT,
  yearFormat: "YYYY",
  monthFormat: "MMM",
  monthBeforeYear: !0
};
ir.locale("fr", nT);
var rT = {
  months: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  monthsShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  weekdays: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
  weekdaysShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
  weekdaysMin: ["do", "lu", "ma", "mi", "ju", "vi", "sá"],
  firstDayOfWeek: 1,
  firstWeekContainsDate: 1
};
const oT = {
  formatLocale: rT,
  yearFormat: "YYYY",
  monthFormat: "MMM",
  monthBeforeYear: !0
};
ir.locale("es", oT);
var aT = {
  months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
  monthsShort: ["Jan", "Feb", "März", "Apr", "Mai", "Juni", "Juli", "Aug", "Sep", "Okt", "Nov", "Dez"],
  weekdays: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
  weekdaysShort: ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."],
  weekdaysMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
  firstDayOfWeek: 1,
  firstWeekContainsDate: 4
};
const iT = {
  formatLocale: aT,
  yearFormat: "YYYY",
  monthFormat: "MMM",
  monthBeforeYear: !0
};
ir.locale("de", iT);
var sT = {
  months: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
  monthsShort: ["jan.", "feb.", "mrt.", "apr.", "mei", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "dec."],
  weekdays: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
  weekdaysShort: ["zo.", "ma.", "di.", "wo.", "do.", "vr.", "za."],
  weekdaysMin: ["zo", "ma", "di", "wo", "do", "vr", "za"],
  firstDayOfWeek: 1,
  firstWeekContainsDate: 4
};
const lT = {
  formatLocale: sT,
  yearFormat: "YYYY",
  monthFormat: "MMM",
  monthBeforeYear: !0
};
ir.locale("nl", lT);
const cT = {
  key: 0,
  class: "mx-datepicker-sidebar"
}, uT = /* @__PURE__ */ me({
  __name: "DatePicker",
  props: {
    product: {},
    isEnabled: { type: Boolean, default: !0 },
    isUpsell: { type: Boolean, default: !1 }
  },
  emits: ["hideSelect", "dateSelect"],
  setup(e, { emit: t }) {
    const { t: n } = Pe(), { getServerTime: r } = ut(), o = t, a = Q(null), i = e, l = Ln(), s = Sl(), c = ut(), u = ir.locale(Pe().locale.value);
    u.formatLocale.firstDayOfWeek = 1, ir.locale(Pe().locale.value, u);
    const f = ir.Calendar, d = Q(!1), v = Q(!1), p = Q(!0), g = Q(!1), h = Q(!1), m = Q(null), y = te(() => fe(c.getServerTime)), b = te(() => {
      const x = fe().format("YYYY-MM-DDT00:00:00");
      return i.product.availableDays.map(($) => $.date).includes(x) || d.value;
    }), O = te(() => {
      const x = fe().add(1, "day").format("YYYY-MM-DDT00:00:00");
      return i.product.availableDays.map(($) => $.date).includes(x) || v.value;
    }), N = (x) => !i.product.availableDays.some(($) => fe(x).isSame($.date, "day")), S = () => {
      var L, F;
      if (!a.value)
        return;
      const x = (L = a.value) == null ? void 0 : L.querySelectorAll(
        ".th-datepicker .cell"
      ), $ = fe(
        (F = x[x.length - 1]) == null ? void 0 : F.title
      ).add(
        1,
        "day"
      );
      g.value = !i.product.availableDays.some(
        (V) => fe($).isBefore(V.date)
      );
    }, E = () => {
      var $, L;
      if (!a.value)
        return;
      const x = ($ = a.value) == null ? void 0 : $.querySelectorAll(
        ".th-datepicker .cell"
      ), M = fe((L = x[0]) == null ? void 0 : L.title);
      p.value = M.isBefore(r);
    }, C = () => {
      $n(() => {
        document.querySelectorAll(
          ".th-datepicker .cell"
        ).forEach((M) => {
          var L;
          const $ = fe(M.title);
          if (fe().isBefore($, "month") ? M.classList.add("next-month") : fe().isAfter($, "month") && M.classList.add("prev-month"), $.isBefore(fe()) && M.classList.add("past"), i.product.hasDynamicPrices)
            if (M.classList.contains("disabled"))
              (L = M.querySelector(".cell__price")) == null || L.remove();
            else {
              const F = i.product.availableDays.find(
                (q) => fe(q.date).isSame($)
              ), V = s(Number(F == null ? void 0 : F.price));
              if (M.querySelector(".cell__price")) {
                const q = M.querySelector(
                  ".cell__price"
                );
                q.textContent = V;
              } else {
                const q = document.createElement("div");
                q.textContent = V, q.className = "cell__price", M.append(q);
              }
            }
        }), S(), E();
      });
    };
    rt(() => {
      var x, M;
      i.isEnabled && (C(), typeof ((x = window.ticketHub) == null ? void 0 : x.loaderComponent) < "u" && (m.value = (M = window.ticketHub) == null ? void 0 : M.loaderComponent));
    }), Ne(
      () => l.current,
      () => C()
    );
    const I = async (x) => {
      var M;
      try {
        h.value = !0;
        const $ = 42, L = ((M = i.product.availableDays.at(-1)) == null ? void 0 : M.date) || x, F = fe(x).isBefore(i.product.selectedDate), V = !F, q = async (B = L) => {
          const Z = await hr.getProductBookingData(
            i.product,
            fe(B).format("YYYY-MM-DD"),
            $
          );
          await i.product.setBookingData(Z);
        };
        V && !i.product.isDateExistsInAvailableDays(
          fe(x).add($, "days")
        ) ? await q() : F && !i.product.isDateExistsInAvailableDays(fe(x)) && await q(x);
      } catch {
      } finally {
        h.value = !1, C();
      }
    }, _ = te(() => typeof r > "u" ? !1 : r.isSame(
      fe(i.product.selectedDate).tz("Europe/Amsterdam", !0),
      "day"
    )), k = te(() => typeof r > "u" ? !1 : r.add(1, "day").isSame(
      fe(i.product.selectedDate).tz("Europe/Amsterdam", !0),
      "day"
    )), A = async (x) => {
      setTimeout(async () => {
        fe(i.product.selectedDate).isSame(x, "day") || (await I(x), i.product.resetSelectedTimeslots(), i.product.selectDate(x), C(), o("dateSelect"), i.product.isCombo && o("hideSelect"));
      }, 0);
    };
    return (x, M) => (U(), X(Oe, null, [
      h.value ? (U(), X("div", {
        key: 0,
        class: be([{ "th-datepicker-loader_custom": m.value }, "th-datepicker-loader"])
      }, [
        (U(), ue(ii(m.value)))
      ], 2)) : se("", !0),
      z("div", {
        ref_key: "datePicker",
        ref: a,
        class: be([{ "th-datepicker_upsell": i.isUpsell }, "th-datepicker"])
      }, [
        b.value || O.value ? (U(), X("div", cT, [
          b.value ? (U(), X("button", {
            key: 0,
            class: be([{ "mx-btn-shortcut_active": _.value }, "mx-btn mx-btn-text mx-btn-shortcut"]),
            type: "button",
            onClick: M[0] || (M[0] = ($) => A(y.value.toDate()))
          }, oe(W(n)("calendar.today")), 3)) : se("", !0),
          O.value ? (U(), X("button", {
            key: 1,
            class: be([{ "mx-btn-shortcut_active": k.value }, "mx-btn mx-btn-text mx-btn-shortcut"]),
            type: "button",
            onClick: M[1] || (M[1] = ($) => A(y.value.add(1, "day").toDate()))
          }, oe(W(n)("calendar.tomorrow")), 3)) : se("", !0)
        ])) : se("", !0),
        G(W(f), {
          class: be({
            "mx-calendar_disabled-prev-month": p.value,
            "mx-calendar_disabled-next-month": g.value
          }),
          "disabled-date": N,
          value: i.product.selectedDate,
          onOpen: C,
          "onUpdate:value": A,
          onCalendarChange: I
        }, null, 8, ["class", "value"])
      ], 2)
    ], 64));
  }
}), Pa = /* @__PURE__ */ ge(uT, [["__scopeId", "data-v-18cc3c13"]]);
/*!
 * perfect-scrollbar v1.5.3
 * Copyright 2021 Hyunje Jun, MDBootstrap and Contributors
 * Licensed under MIT
 */
function jt(e) {
  return getComputedStyle(e);
}
function gt(e, t) {
  for (var n in t) {
    var r = t[n];
    typeof r == "number" && (r = r + "px"), e.style[n] = r;
  }
  return e;
}
function ya(e) {
  var t = document.createElement("div");
  return t.className = e, t;
}
var Uu = typeof Element < "u" && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector);
function On(e, t) {
  if (!Uu)
    throw new Error("No element matching method supported");
  return Uu.call(e, t);
}
function Rr(e) {
  e.remove ? e.remove() : e.parentNode && e.parentNode.removeChild(e);
}
function Fu(e, t) {
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
}, Km = { x: null, y: null };
function Jm(e, t) {
  var n = e.element.classList, r = ze.state.scrolling(t);
  n.contains(r) ? clearTimeout(Km[t]) : n.add(r);
}
function Zm(e, t) {
  Km[t] = setTimeout(
    function() {
      return e.isAlive && e.element.classList.remove(ze.state.scrolling(t));
    },
    e.settings.scrollingThreshold
  );
}
function dT(e, t) {
  Jm(e, t), Zm(e, t);
}
var Xo = function(t) {
  this.element = t, this.handlers = {};
}, Qm = { isEmpty: { configurable: !0 } };
Xo.prototype.bind = function(t, n) {
  typeof this.handlers[t] > "u" && (this.handlers[t] = []), this.handlers[t].push(n), this.element.addEventListener(t, n, !1);
};
Xo.prototype.unbind = function(t, n) {
  var r = this;
  this.handlers[t] = this.handlers[t].filter(function(o) {
    return n && o !== n ? !0 : (r.element.removeEventListener(t, o, !1), !1);
  });
};
Xo.prototype.unbindAll = function() {
  for (var t in this.handlers)
    this.unbind(t);
};
Qm.isEmpty.get = function() {
  var e = this;
  return Object.keys(this.handlers).every(
    function(t) {
      return e.handlers[t].length === 0;
    }
  );
};
Object.defineProperties(Xo.prototype, Qm);
var no = function() {
  this.eventElements = [];
};
no.prototype.eventElement = function(t) {
  var n = this.eventElements.filter(function(r) {
    return r.element === t;
  })[0];
  return n || (n = new Xo(t), this.eventElements.push(n)), n;
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
function _a(e) {
  if (typeof window.CustomEvent == "function")
    return new CustomEvent(e);
  var t = document.createEvent("CustomEvent");
  return t.initCustomEvent(e, !1, !1, void 0), t;
}
function Xa(e, t, n, r, o) {
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
  fT(e, n, a, r, o);
}
function fT(e, t, n, r, o) {
  var a = n[0], i = n[1], l = n[2], s = n[3], c = n[4], u = n[5];
  r === void 0 && (r = !0), o === void 0 && (o = !1);
  var f = e.element;
  e.reach[s] = null, f[l] < 1 && (e.reach[s] = "start"), f[l] > e[a] - e[i] - 1 && (e.reach[s] = "end"), t && (f.dispatchEvent(_a("ps-scroll-" + s)), t < 0 ? f.dispatchEvent(_a("ps-scroll-" + c)) : t > 0 && f.dispatchEvent(_a("ps-scroll-" + u)), r && dT(e, s)), e.reach[s] && (t || o) && f.dispatchEvent(_a("ps-" + s + "-reach-" + e.reach[s]));
}
function Be(e) {
  return parseInt(e, 10) || 0;
}
function pT(e) {
  return On(e, "input,[contenteditable]") || On(e, "select,[contenteditable]") || On(e, "textarea,[contenteditable]") || On(e, "button,[contenteditable]");
}
function mT(e) {
  var t = jt(e);
  return Be(t.width) + Be(t.paddingLeft) + Be(t.paddingRight) + Be(t.borderLeftWidth) + Be(t.borderRightWidth);
}
var Pr = {
  isWebKit: typeof document < "u" && "WebkitAppearance" in document.documentElement.style,
  supportsTouch: typeof window < "u" && ("ontouchstart" in window || "maxTouchPoints" in window.navigator && window.navigator.maxTouchPoints > 0 || window.DocumentTouch && document instanceof window.DocumentTouch),
  supportsIePointer: typeof navigator < "u" && navigator.msMaxTouchPoints,
  isChrome: typeof navigator < "u" && /Chrome/i.test(navigator && navigator.userAgent)
};
function mn(e) {
  var t = e.element, n = Math.floor(t.scrollTop), r = t.getBoundingClientRect();
  e.containerWidth = Math.round(r.width), e.containerHeight = Math.round(r.height), e.contentWidth = t.scrollWidth, e.contentHeight = t.scrollHeight, t.contains(e.scrollbarXRail) || (Fu(t, ze.element.rail("x")).forEach(
    function(o) {
      return Rr(o);
    }
  ), t.appendChild(e.scrollbarXRail)), t.contains(e.scrollbarYRail) || (Fu(t, ze.element.rail("y")).forEach(
    function(o) {
      return Rr(o);
    }
  ), t.appendChild(e.scrollbarYRail)), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive = !0, e.railXWidth = e.containerWidth - e.railXMarginWidth, e.railXRatio = e.containerWidth / e.railXWidth, e.scrollbarXWidth = Hu(
    e,
    Be(e.railXWidth * e.containerWidth / e.contentWidth)
  ), e.scrollbarXLeft = Be(
    (e.negativeScrollAdjustment + t.scrollLeft) * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth)
  )) : e.scrollbarXActive = !1, !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive = !0, e.railYHeight = e.containerHeight - e.railYMarginHeight, e.railYRatio = e.containerHeight / e.railYHeight, e.scrollbarYHeight = Hu(
    e,
    Be(e.railYHeight * e.containerHeight / e.contentHeight)
  ), e.scrollbarYTop = Be(
    n * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight)
  )) : e.scrollbarYActive = !1, e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight), hT(t, e), e.scrollbarXActive ? t.classList.add(ze.state.active("x")) : (t.classList.remove(ze.state.active("x")), e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, t.scrollLeft = e.isRtl === !0 ? e.contentWidth : 0), e.scrollbarYActive ? t.classList.add(ze.state.active("y")) : (t.classList.remove(ze.state.active("y")), e.scrollbarYHeight = 0, e.scrollbarYTop = 0, t.scrollTop = 0);
}
function Hu(e, t) {
  return e.settings.minScrollbarLength && (t = Math.max(t, e.settings.minScrollbarLength)), e.settings.maxScrollbarLength && (t = Math.min(t, e.settings.maxScrollbarLength)), t;
}
function hT(e, t) {
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
function vT(e) {
  e.element, e.event.bind(e.scrollbarY, "mousedown", function(t) {
    return t.stopPropagation();
  }), e.event.bind(e.scrollbarYRail, "mousedown", function(t) {
    var n = t.pageY - window.pageYOffset - e.scrollbarYRail.getBoundingClientRect().top, r = n > e.scrollbarYTop ? 1 : -1;
    e.element.scrollTop += r * e.containerHeight, mn(e), t.stopPropagation();
  }), e.event.bind(e.scrollbarX, "mousedown", function(t) {
    return t.stopPropagation();
  }), e.event.bind(e.scrollbarXRail, "mousedown", function(t) {
    var n = t.pageX - window.pageXOffset - e.scrollbarXRail.getBoundingClientRect().left, r = n > e.scrollbarXLeft ? 1 : -1;
    e.element.scrollLeft += r * e.containerWidth, mn(e), t.stopPropagation();
  });
}
function gT(e) {
  Yu(e, [
    "containerWidth",
    "contentWidth",
    "pageX",
    "railXWidth",
    "scrollbarX",
    "scrollbarXWidth",
    "scrollLeft",
    "x",
    "scrollbarXRail"
  ]), Yu(e, [
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
function Yu(e, t) {
  var n = t[0], r = t[1], o = t[2], a = t[3], i = t[4], l = t[5], s = t[6], c = t[7], u = t[8], f = e.element, d = null, v = null, p = null;
  function g(y) {
    y.touches && y.touches[0] && (y[o] = y.touches[0].pageY), f[s] = d + p * (y[o] - v), Jm(e, c), mn(e), y.stopPropagation(), y.type.startsWith("touch") && y.changedTouches.length > 1 && y.preventDefault();
  }
  function h() {
    Zm(e, c), e[u].classList.remove(ze.state.clicking), e.event.unbind(e.ownerDocument, "mousemove", g);
  }
  function m(y, b) {
    d = f[s], b && y.touches && (y[o] = y.touches[0].pageY), v = y[o], p = (e[r] - e[n]) / (e[a] - e[l]), b ? e.event.bind(e.ownerDocument, "touchmove", g) : (e.event.bind(e.ownerDocument, "mousemove", g), e.event.once(e.ownerDocument, "mouseup", h), y.preventDefault()), e[u].classList.add(ze.state.clicking), y.stopPropagation();
  }
  e.event.bind(e[i], "mousedown", function(y) {
    m(y);
  }), e.event.bind(e[i], "touchstart", function(y) {
    m(y, !0);
  });
}
function yT(e) {
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
        if (pT(i))
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
      e.settings.suppressScrollX && l !== 0 || e.settings.suppressScrollY && s !== 0 || (t.scrollTop -= s, t.scrollLeft += l, mn(e), o(l, s) && a.preventDefault());
    }
  });
}
function _T(e) {
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
      var u = jt(c);
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
      e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (c ? t.scrollTop -= c * e.settings.wheelSpeed : t.scrollTop += s * e.settings.wheelSpeed, u = !0) : e.scrollbarXActive && !e.scrollbarYActive && (s ? t.scrollLeft += s * e.settings.wheelSpeed : t.scrollLeft -= c * e.settings.wheelSpeed, u = !0) : (t.scrollTop -= c * e.settings.wheelSpeed, t.scrollLeft += s * e.settings.wheelSpeed), mn(e), u = u || n(s, c), u && !i.ctrlKey && (i.stopPropagation(), i.preventDefault());
    }
  }
  typeof window.onwheel < "u" ? e.event.bind(t, "wheel", a) : typeof window.onmousewheel < "u" && e.event.bind(t, "mousewheel", a);
}
function bT(e) {
  if (!Pr.supportsTouch && !Pr.supportsIePointer)
    return;
  var t = e.element;
  function n(p, g) {
    var h = Math.floor(t.scrollTop), m = t.scrollLeft, y = Math.abs(p), b = Math.abs(g);
    if (b > y) {
      if (g < 0 && h === e.contentHeight - e.containerHeight || g > 0 && h === 0)
        return window.scrollY === 0 && g > 0 && Pr.isChrome;
    } else if (y > b && (p < 0 && m === e.contentWidth - e.containerWidth || p > 0 && m === 0))
      return !0;
    return !0;
  }
  function r(p, g) {
    t.scrollTop -= g, t.scrollLeft -= p, mn(e);
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
  function f(p, g, h) {
    if (!t.contains(p))
      return !1;
    for (var m = p; m && m !== t; ) {
      if (m.classList.contains(ze.element.consuming))
        return !0;
      var y = jt(m);
      if (h && y.overflowY.match(/(scroll|auto)/)) {
        var b = m.scrollHeight - m.clientHeight;
        if (b > 0 && (m.scrollTop > 0 && h < 0 || m.scrollTop < b && h > 0))
          return !0;
      }
      if (g && y.overflowX.match(/(scroll|auto)/)) {
        var O = m.scrollWidth - m.clientWidth;
        if (O > 0 && (m.scrollLeft > 0 && g < 0 || m.scrollLeft < O && g > 0))
          return !0;
      }
      m = m.parentNode;
    }
    return !1;
  }
  function d(p) {
    if (c(p)) {
      var g = s(p), h = { pageX: g.pageX, pageY: g.pageY }, m = h.pageX - o.pageX, y = h.pageY - o.pageY;
      if (f(p.target, m, y))
        return;
      r(m, y), o = h;
      var b = (/* @__PURE__ */ new Date()).getTime(), O = b - a;
      O > 0 && (i.x = m / O, i.y = y / O, a = b), n(m, y) && p.preventDefault();
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
var ET = function() {
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
}, wT = {
  "click-rail": vT,
  "drag-thumb": gT,
  keyboard: yT,
  wheel: _T,
  touch: bT
}, Ko = function(t, n) {
  var r = this;
  if (n === void 0 && (n = {}), typeof t == "string" && (t = document.querySelector(t)), !t || !t.nodeName)
    throw new Error("no element is specified to initialize PerfectScrollbar");
  this.element = t, t.classList.add(ze.main), this.settings = ET();
  for (var o in n)
    this.settings[o] = n[o];
  this.containerWidth = null, this.containerHeight = null, this.contentWidth = null, this.contentHeight = null;
  var a = function() {
    return t.classList.add(ze.state.focus);
  }, i = function() {
    return t.classList.remove(ze.state.focus);
  };
  this.isRtl = jt(t).direction === "rtl", this.isRtl === !0 && t.classList.add(ze.rtl), this.isNegativeScroll = function() {
    var c = t.scrollLeft, u = null;
    return t.scrollLeft = -1, u = t.scrollLeft < 0, t.scrollLeft = c, u;
  }(), this.negativeScrollAdjustment = this.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, this.event = new no(), this.ownerDocument = t.ownerDocument || document, this.scrollbarXRail = ya(ze.element.rail("x")), t.appendChild(this.scrollbarXRail), this.scrollbarX = ya(ze.element.thumb("x")), this.scrollbarXRail.appendChild(this.scrollbarX), this.scrollbarX.setAttribute("tabindex", 0), this.event.bind(this.scrollbarX, "focus", a), this.event.bind(this.scrollbarX, "blur", i), this.scrollbarXActive = null, this.scrollbarXWidth = null, this.scrollbarXLeft = null;
  var l = jt(this.scrollbarXRail);
  this.scrollbarXBottom = parseInt(l.bottom, 10), isNaN(this.scrollbarXBottom) ? (this.isScrollbarXUsingBottom = !1, this.scrollbarXTop = Be(l.top)) : this.isScrollbarXUsingBottom = !0, this.railBorderXWidth = Be(l.borderLeftWidth) + Be(l.borderRightWidth), gt(this.scrollbarXRail, { display: "block" }), this.railXMarginWidth = Be(l.marginLeft) + Be(l.marginRight), gt(this.scrollbarXRail, { display: "" }), this.railXWidth = null, this.railXRatio = null, this.scrollbarYRail = ya(ze.element.rail("y")), t.appendChild(this.scrollbarYRail), this.scrollbarY = ya(ze.element.thumb("y")), this.scrollbarYRail.appendChild(this.scrollbarY), this.scrollbarY.setAttribute("tabindex", 0), this.event.bind(this.scrollbarY, "focus", a), this.event.bind(this.scrollbarY, "blur", i), this.scrollbarYActive = null, this.scrollbarYHeight = null, this.scrollbarYTop = null;
  var s = jt(this.scrollbarYRail);
  this.scrollbarYRight = parseInt(s.right, 10), isNaN(this.scrollbarYRight) ? (this.isScrollbarYUsingRight = !1, this.scrollbarYLeft = Be(s.left)) : this.isScrollbarYUsingRight = !0, this.scrollbarYOuterWidth = this.isRtl ? mT(this.scrollbarY) : null, this.railBorderYWidth = Be(s.borderTopWidth) + Be(s.borderBottomWidth), gt(this.scrollbarYRail, { display: "block" }), this.railYMarginHeight = Be(s.marginTop) + Be(s.marginBottom), gt(this.scrollbarYRail, { display: "" }), this.railYHeight = null, this.railYRatio = null, this.reach = {
    x: t.scrollLeft <= 0 ? "start" : t.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null,
    y: t.scrollTop <= 0 ? "start" : t.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null
  }, this.isAlive = !0, this.settings.handlers.forEach(function(c) {
    return wT[c](r);
  }), this.lastScrollTop = Math.floor(t.scrollTop), this.lastScrollLeft = t.scrollLeft, this.event.bind(this.element, "scroll", function(c) {
    return r.onScroll(c);
  }), mn(this);
};
Ko.prototype.update = function() {
  this.isAlive && (this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0, gt(this.scrollbarXRail, { display: "block" }), gt(this.scrollbarYRail, { display: "block" }), this.railXMarginWidth = Be(jt(this.scrollbarXRail).marginLeft) + Be(jt(this.scrollbarXRail).marginRight), this.railYMarginHeight = Be(jt(this.scrollbarYRail).marginTop) + Be(jt(this.scrollbarYRail).marginBottom), gt(this.scrollbarXRail, { display: "none" }), gt(this.scrollbarYRail, { display: "none" }), mn(this), Xa(this, "top", 0, !1, !0), Xa(this, "left", 0, !1, !0), gt(this.scrollbarXRail, { display: "" }), gt(this.scrollbarYRail, { display: "" }));
};
Ko.prototype.onScroll = function(t) {
  this.isAlive && (mn(this), Xa(this, "top", this.element.scrollTop - this.lastScrollTop), Xa(
    this,
    "left",
    this.element.scrollLeft - this.lastScrollLeft
  ), this.lastScrollTop = Math.floor(this.element.scrollTop), this.lastScrollLeft = this.element.scrollLeft);
};
Ko.prototype.destroy = function() {
  this.isAlive && (this.event.unbindAll(), Rr(this.scrollbarX), Rr(this.scrollbarY), Rr(this.scrollbarXRail), Rr(this.scrollbarYRail), this.removePsClasses(), this.element = null, this.scrollbarX = null, this.scrollbarY = null, this.scrollbarXRail = null, this.scrollbarYRail = null, this.isAlive = !1);
};
Ko.prototype.removePsClasses = function() {
  this.element.className = this.element.className.split(" ").filter(function(t) {
    return !t.match(/^ps([-_].+|)$/);
  }).join(" ");
};
const CT = {}, TT = {
  fill: "none",
  height: "16",
  viewBox: "0 0 16 16",
  width: "16",
  xmlns: "http://www.w3.org/2000/svg"
}, ST = /* @__PURE__ */ z("path", {
  "clip-rule": "evenodd",
  d: "M10.25 6C10.25 7.24264 9.24264 8.25 8 8.25C6.75736 8.25 5.75 7.24264 5.75 6C5.75 4.75736 6.75736 3.75 8 3.75C9.24264 3.75 10.25 4.75736 10.25 6ZM11 6C11 7.65685 9.65685 9 8 9C6.34315 9 5 7.65685 5 6C5 4.34315 6.34315 3 8 3C9.65685 3 11 4.34315 11 6ZM6.5 10.125C4.91218 10.125 3.625 11.4122 3.625 13C3.625 13.2071 3.79289 13.375 4 13.375C4.20711 13.375 4.375 13.2071 4.375 13C4.375 11.8264 5.3264 10.875 6.5 10.875H9.5C10.6736 10.875 11.625 11.8264 11.625 13C11.625 13.2071 11.7929 13.375 12 13.375C12.2071 13.375 12.375 13.2071 12.375 13C12.375 11.4122 11.0878 10.125 9.5 10.125H6.5Z",
  fill: "currentColor",
  "fill-rule": "evenodd"
}, null, -1), kT = [
  ST
];
function IT(e, t) {
  return U(), X("svg", TT, kT);
}
const OT = /* @__PURE__ */ ge(CT, [["render", IT]]), PT = ["disabled"], DT = { class: "th-time-option__time" }, AT = {
  key: 0,
  class: "th-time-option__date"
}, $T = {
  key: 0,
  class: "th-time-option__capacity"
}, NT = {
  key: 1,
  class: "th-time-option__price"
}, LT = /* @__PURE__ */ me({
  __name: "TimeslotComponent",
  props: {
    displayCapacity: { type: Boolean },
    isActive: { type: Boolean },
    isCombo: { type: Boolean },
    isNight: { type: Boolean, default: !1 },
    timeslot: {}
  },
  setup(e) {
    const t = e, n = te(() => fe(t.timeslot.dateTime).format("DD/MM/YYYY"));
    return (r, o) => (U(), X("button", {
      class: be([{
        "th-time-option_active": t.isActive,
        "th-time-option_combo": t.isCombo,
        "th-time-option_disabled": !r.timeslot.isAvailable,
        "th-time-option_open": r.timeslot.isOpen
      }, "th-time-option"]),
      disabled: !r.timeslot.isAvailable
    }, [
      z("span", DT, [
        qe(oe(r.timeslot.humanizedTime) + " ", 1),
        t.isNight ? (U(), X("span", AT, " (" + oe(n.value) + ") ", 1)) : se("", !0)
      ]),
      t.displayCapacity ? (U(), X("span", $T, [
        G(OT),
        qe(" " + oe(r.timeslot.capacity), 1)
      ])) : se("", !0),
      r.timeslot.isDynamic && r.timeslot.price ? (U(), X("span", NT, [
        G(lt, {
          amount: r.timeslot.price
        }, null, 8, ["amount"])
      ])) : se("", !0)
    ], 10, PT));
  }
}), ju = /* @__PURE__ */ ge(LT, [["__scopeId", "data-v-a44c6f0e"]]), RT = { class: "th-timeslots__divider" }, MT = /* @__PURE__ */ me({
  __name: "TimeslotPicker",
  props: {
    item: {},
    product: {}
  },
  emits: ["selectTimeslot"],
  setup(e, { emit: t }) {
    const { t: n } = Pe(), r = e, o = t, a = Q(null), i = (l) => {
      r.item.selectTimeslot(l), r.product.selectDate(fe(l.dateTime).toDate()), o("selectTimeslot");
    };
    return rt(() => {
      new Ko(a.value, {
        suppressScrollX: !0
      });
    }), (l, s) => (U(), X("div", {
      ref_key: "scrollbar",
      ref: a,
      class: "th-timeslots"
    }, [
      (U(!0), X(Oe, null, at(r.item.dayTimeslots(r.product.selectedDate), (c) => (U(), ue(ju, {
        key: c.id,
        "display-capacity": r.item.displayCapacity,
        "is-active": !!(r.item.selectedTimeslot && c.id === r.item.selectedTimeslot.id),
        "is-combo": r.product.isCombo,
        timeslot: c,
        onClick: He((u) => i(c), ["prevent"])
      }, null, 8, ["display-capacity", "is-active", "is-combo", "timeslot", "onClick"]))), 128)),
      r.item.nightTimeslots(r.product.selectedDate).length ? (U(), X(Oe, { key: 0 }, [
        z("span", RT, oe(W(n)("calendar.afterMidnightsSlots")), 1),
        (U(!0), X(Oe, null, at(r.item.nightTimeslots(
          r.product.selectedDate
        ), (c) => (U(), ue(ju, {
          key: c.id,
          "display-capacity": r.item.displayCapacity,
          "is-active": !!(r.item.selectedTimeslot && c.id === r.item.selectedTimeslot.id),
          "is-combo": r.product.isCombo,
          "is-night": !0,
          timeslot: c,
          onClick: He((u) => i(c), ["prevent"])
        }, null, 8, ["display-capacity", "is-active", "is-combo", "timeslot", "onClick"]))), 128))
      ], 64)) : se("", !0)
    ], 512));
  }
}), js = /* @__PURE__ */ ge(MT, [["__scopeId", "data-v-efb3de87"]]);
var Ka;
((e) => {
  e.mobile = 500, e.isMobile = () => window ? window.innerWidth <= e.mobile : !1, e.isDesktop = () => !(0, e.isMobile)();
})(Ka || (Ka = {}));
const xT = { class: "single-select" }, BT = { class: "single-select__content" }, VT = { class: "single-select__tabs" }, UT = { class: "th-option-select__placeholder" }, FT = { class: "th-option-select__placeholder-title" }, HT = { class: "th-option-select__placeholder" }, YT = { class: "th-option-select__placeholder-title" }, jT = { class: "single-select__tabs-content" }, WT = {
  key: 0,
  class: "single-select__tabs-content"
}, zT = {
  key: 1,
  class: "single-select__tabs-content"
}, qT = /* @__PURE__ */ me({
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
    return t({ openTab: a }), (l, s) => (U(), X("div", xT, [
      G(Yt, {
        ref_key: "select",
        ref: n,
        "icon-is-shown": !1,
        "selected-option-title": r.tabsContent[0].selectedOptionTitle,
        "show-header": !1,
        title: r.tabsContent[0].title,
        "title-is-black": r.tabsContent[0].isBlack,
        onClick: s[4] || (s[4] = He((c) => a(0), ["prevent"]))
      }, {
        default: we(() => [
          z("div", BT, [
            z("div", VT, [
              z("div", {
                class: be([{ "single-select__tab_active": o.value === 0 }, "single-select__tab"]),
                onClick: s[0] || (s[0] = He((c) => a(0), ["stop"]))
              }, [
                z("div", UT, [
                  z("div", FT, oe(r.tabsContent[0].title), 1),
                  z("div", {
                    class: be([{
                      "th-option-select__placeholder-value_black": r.tabsContent[0].isBlack
                    }, "th-option-select__placeholder-value"])
                  }, oe(r.tabsContent[0].selectedOptionTitle), 3)
                ])
              ], 2),
              z("div", {
                class: be([{ "single-select__tab_active": o.value === 1 }, "single-select__tab"]),
                onClick: s[1] || (s[1] = He((c) => a(1), ["stop"]))
              }, [
                z("div", HT, [
                  z("div", YT, oe(r.tabsContent[1].title), 1),
                  z("div", {
                    class: be([{
                      "th-option-select__placeholder-value_black": r.tabsContent[1].isBlack
                    }, "th-option-select__placeholder-value"])
                  }, oe(r.tabsContent[1].selectedOptionTitle), 3)
                ])
              ], 2)
            ]),
            z("div", jT, [
              o.value === 0 ? (U(), X("div", WT, [
                G(Pa, {
                  "is-upsell": r.isUpsell,
                  product: r.product,
                  onDateSelect: s[2] || (s[2] = (c) => a(1))
                }, null, 8, ["is-upsell", "product"])
              ])) : se("", !0),
              o.value === 1 ? (U(), X("div", zT, [
                G(js, {
                  item: r.product.showedItems[0],
                  product: r.product,
                  onClick: s[3] || (s[3] = He(() => {
                  }, ["stop"])),
                  onSelectTimeslot: i
                }, null, 8, ["item", "product"])
              ])) : se("", !0)
            ])
          ])
        ]),
        _: 1
      }, 8, ["selected-option-title", "title", "title-is-black"]),
      G(Yt, {
        "icon-is-shown": !1,
        "is-enabled": !1,
        "selected-option-title": r.tabsContent[1].selectedOptionTitle,
        "show-header": !1,
        title: r.tabsContent[1].title,
        "title-is-black": r.tabsContent[1].isBlack,
        onClickCapture: s[5] || (s[5] = He((c) => a(1), ["prevent", "stop"]))
      }, null, 8, ["selected-option-title", "title", "title-is-black"])
    ]));
  }
}), GT = /* @__PURE__ */ ge(qT, [["__scopeId", "data-v-4f801f64"]]), XT = {
  key: 0,
  class: "th-calendar-wrapper"
}, KT = {
  key: 0,
  class: "th-calendar"
}, JT = { class: "th-timeslot-container" }, ZT = {
  key: 0,
  class: "th-timeslot-title"
}, QT = {
  key: 2,
  class: "th-calendar-wrapper th-calendar-wrapper_column"
}, eS = { class: "th-timeslot-container th-timeslot-container_combo" }, tS = /* @__PURE__ */ me({
  __name: "CalendarComponent",
  props: {
    product: {},
    isActive: { type: Boolean, default: !0 },
    isUpsell: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const { t: n } = Pe(), { isMobile: r } = Ka, o = e, a = Q([]), i = Q(null), l = te(() => {
      var p;
      return (p = o.product) != null && p.selectedDate ? fe(o.product.selectedDate).format("DD/MM/YYYY") : n("calendar.selectDate");
    }), s = () => {
      a.value[0].showOption(!1);
    }, c = () => {
      d.value || f();
    }, u = () => {
      d.value && (s(), f());
    }, f = () => {
      var g, h;
      if (i.value) {
        (g = o.product) != null && g.selectedDate ? i.value.openTab(1) : i.value.openTab(0);
        return;
      }
      let p = (h = o.product) == null ? void 0 : h.showedItems.findIndex((m) => !m.selectedTimeslot);
      p === -1 && (p = 0), p++, a.value[p].showOption(!0);
    }, d = te(() => r() || o.isUpsell), v = te(() => {
      var p, g, h, m;
      return [
        {
          title: n("calendar.date"),
          selectedOptionTitle: l.value,
          isBlack: !!((p = o.product) != null && p.selectedDate)
        },
        {
          title: n("calendar.selectTime"),
          selectedOptionTitle: (g = o.product) != null && g.items[0].selectedTimeslot ? (h = o.product) == null ? void 0 : h.items[0].selectedTimeslot.humanizedTime : n("calendar.selectTime"),
          isBlack: !!((m = o.product) != null && m.items[0].selectedTimeslot)
        }
      ];
    });
    return t({ openTimeslotPicker: f }), (p, g) => {
      var h;
      return o.product ? o.product.isSingle ? (U(), X("div", {
        key: 1,
        class: be([{ "th-calendar-wrapper_upsell": o.isUpsell }, "th-calendar-wrapper th-calendar-wrapper_single"])
      }, [
        d.value ? (U(), ue(GT, {
          key: 0,
          ref_key: "singleComponent",
          ref: i,
          "is-upsell": o.isUpsell,
          product: o.product,
          "tabs-content": v.value
        }, null, 8, ["is-upsell", "product", "tabs-content"])) : (U(), X(Oe, { key: 1 }, [
          G(Yt, {
            ref: (m) => a.value.push(m),
            "icon-is-shown": !1,
            "is-active": o.isActive,
            "is-calendar": !0,
            "is-enabled": d.value,
            "selected-option-title": l.value,
            title: W(n)("calendar.date"),
            "title-is-black": !!o.product.selectedDate,
            onClick: He(c, ["prevent"])
          }, {
            default: we(() => [
              G(Pa, {
                "is-enabled": d.value,
                "is-upsell": o.isUpsell,
                product: o.product,
                onDateSelect: u
              }, null, 8, ["is-enabled", "is-upsell", "product"])
            ]),
            _: 1
          }, 8, ["is-active", "is-enabled", "selected-option-title", "title", "title-is-black"]),
          (U(!0), X(Oe, null, at(o.product.items, (m) => (U(), ue(Yt, {
            key: m.id,
            ref_for: !0,
            ref: (y) => a.value.push(y),
            "extended-header-title": W(n)("calendar.selectTime"),
            "icon-is-shown": !1,
            "is-active": o.isActive,
            "is-calendar": !0,
            "selected-option-title": m.selectedTimeslot ? m.selectedTimeslot.humanizedTime : W(n)("calendar.selectTime"),
            title: W(n)("calendar.time"),
            "title-is-black": !!m.selectedTimeslot
          }, {
            default: we(() => {
              var y;
              return [
                o.isActive ? (U(), X("div", KT, [
                  d.value ? se("", !0) : (U(), ue(Pa, {
                    key: 0,
                    "is-upsell": o.isUpsell,
                    product: o.product
                  }, null, 8, ["is-upsell", "product"])),
                  z("div", JT, [
                    d.value ? se("", !0) : (U(), X("div", ZT, oe(W(n)("calendar.selectTimeslot")), 1)),
                    G(js, {
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
      ], 2)) : (U(), X("div", QT, [
        G(Yt, {
          ref: (m) => {
            m && (a.value[0] = m);
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
            o.isActive ? (U(), ue(Pa, {
              key: 0,
              "is-upsell": o.isUpsell,
              product: o.product,
              onHideSelect: s
            }, null, 8, ["is-upsell", "product"])) : se("", !0)
          ]),
          _: 1
        }, 8, ["extended-header-title", "is-active", "selected-option-title", "title", "title-is-black"]),
        (U(!0), X(Oe, null, at((h = o.product) == null ? void 0 : h.showedItems, (m, y) => (U(), ue(Yt, {
          key: m.id,
          ref_for: !0,
          ref: (b) => {
            b && (a.value[y + 1] = b);
          },
          "icon-is-shown": !1,
          "is-active": o.isActive,
          "selected-option-title": m.selectedTimeslot ? m.selectedTimeslot.humanizedTime : W(n)("calendar.pickATimeslot"),
          title: m.name,
          "title-is-black": !!m.selectedTimeslot
        }, {
          default: we(() => [
            z("div", eS, [
              G(js, {
                item: m,
                product: o.product,
                onSelectTimeslot: () => a.value[y + 1].showOption(!1)
              }, null, 8, ["item", "product", "onSelectTimeslot"])
            ])
          ]),
          _: 2
        }, 1032, ["is-active", "selected-option-title", "title", "title-is-black"]))), 128))
      ])) : (U(), X("div", XT, [
        G(Yt, {
          ref: (m) => a.value.push(m),
          "icon-is-shown": !1,
          "is-active": o.isActive,
          "is-calendar": !0,
          "is-enabled": d.value,
          "selected-option-title": l.value,
          title: W(n)("calendar.date"),
          onClick: He(c, ["prevent"])
        }, null, 8, ["is-active", "is-enabled", "selected-option-title", "title"])
      ]));
    };
  }
}), Ws = /* @__PURE__ */ ge(tS, [["__scopeId", "data-v-3913c7fa"]]), eh = (e) => (si("data-v-69430df4"), e = e(), li(), e), nS = { class: "th-option" }, rS = { class: "th-option__info" }, oS = { class: "th-option__title" }, aS = { class: "th-option__info" }, iS = { class: "th-option__counter" }, sS = ["disabled"], lS = /* @__PURE__ */ eh(() => /* @__PURE__ */ z("svg", {
  fill: "none",
  height: "2",
  viewBox: "0 0 14 2",
  width: "16",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ z("path", {
    "clip-rule": "evenodd",
    d: `M0 0.899805C0 0.568434 0.268629 0.299805 0.6 0.299805L13.4 0.299805C13.7314 0.299805
          14 0.568434 14 0.899805C14 1.23118 13.7314 1.4998 13.4 1.4998L0.6 1.4998C0.268629
          1.4998 0 1.23118 0 0.899805Z`,
    fill: "currentColor",
    "fill-rule": "evenodd"
  })
], -1)), cS = [
  lS
], uS = ["disabled"], dS = /* @__PURE__ */ eh(() => /* @__PURE__ */ z("svg", {
  fill: "none",
  height: "16",
  viewBox: "0 0 10 10",
  width: "16",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ z("path", {
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
], -1)), fS = [
  dS
], pS = /* @__PURE__ */ me({
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
    return (u, f) => (U(), X("div", nS, [
      z("div", rS, [
        z("div", oS, oe(u.title), 1),
        u.description ? (U(), X("div", {
          key: 0,
          class: be([{ "th-option__description_grey": u.isGrey }, "th-option__description"])
        }, oe(u.description), 3)) : se("", !0)
      ]),
      z("div", aS, oe(u.info), 1),
      z("div", iS, [
        z("button", {
          disabled: i.value,
          class: "th-option__counter-btn",
          type: "button",
          onClick: f[0] || (f[0] = He(() => {
          }, ["prevent"])),
          onMousedown: f[1] || (f[1] = He((d) => s(!1), ["prevent"])),
          onMouseup: He(c, ["prevent"]),
          onMouseleave: He(c, ["prevent"])
        }, cS, 40, sS),
        z("div", {
          class: be([{ "th-option__counter-value_disabled": u.value === 0 }, "th-option__counter-value"])
        }, oe(u.value), 3),
        z("button", {
          disabled: l.value,
          class: "th-option__counter-btn",
          type: "button",
          onClick: f[2] || (f[2] = He(() => {
          }, ["prevent"])),
          onMousedown: f[3] || (f[3] = He((d) => s(!0), ["prevent"])),
          onMouseup: He(c, ["prevent"]),
          onMouseleave: He(c, ["prevent"])
        }, fS, 40, uS)
      ])
    ]));
  }
}), th = /* @__PURE__ */ ge(pS, [["__scopeId", "data-v-69430df4"]]), mS = {
  key: 0,
  class: "visitors-options"
}, hS = /* @__PURE__ */ me({
  __name: "VisitorsSelector",
  props: {
    product: {},
    disabled: { type: Boolean, default: !0 },
    isActive: { type: Boolean, default: !0 }
  },
  setup(e, { expose: t }) {
    const n = Sl(), { t: r } = Pe(), o = Q(null), a = e, i = (f) => {
      var d, v;
      return ((v = (d = a.product) == null ? void 0 : d.availableCategories.find(
        (p) => p.itemCategoryId === f.itemCategoryId
      )) == null ? void 0 : v.quantity) ?? 0;
    }, l = (f) => {
      var d;
      return ((d = a.product) == null ? void 0 : d.categoryAvailableCapacity(f)) ?? 0;
    };
    a.isActive && Ne(
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
    }).value }), (f, d) => (U(), ue(Yt, {
      ref_key: "selectElement",
      ref: o,
      "is-active": !f.disabled,
      "selected-option-title": s.value,
      title: W(r)("options.guests"),
      "title-is-black": a.isActive && !!a.product.selectedVisitorsCount
    }, {
      default: we(() => [
        a.isActive ? (U(), X("div", mS, [
          (U(!0), X(Oe, null, at(a.product.availableCategories, (v) => (U(), X(Oe, {
            key: v.itemCategoryId
          }, [
            a.product.isCategoryAvailableForBooking(v) ? (U(), ue(th, {
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
}), Wu = /* @__PURE__ */ ge(hS, [["__scopeId", "data-v-eda92be1"]]), vS = { class: "meals-options" }, gS = {
  key: 0,
  class: "meals-options__text"
}, yS = /* @__PURE__ */ me({
  __name: "MealsSelector",
  props: {
    product: {},
    disabled: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const { t: n } = Pe(), r = e, o = Q(null), a = te(() => {
      const l = r.product.selectedVisitorsCount - r.product.selectedMealsCount;
      return n("options.mealsLeftWarning", l);
    });
    return Ne(
      () => r.product.isMealsCountEqualsVisitorsCount,
      (l) => {
        var s;
        l && ((s = o.value) == null || s.showOption(!1));
      }
    ), t({ open: () => te(() => {
      var l;
      return (l = o.value) == null ? void 0 : l.showOption();
    }).value }), (l, s) => (U(), ue(Yt, {
      ref_key: "selectElement",
      ref: o,
      "is-active": !l.disabled,
      "selected-option-title": r.product.selectedOptionsTitle,
      "title-is-black": r.product.selectedMealsCount > 0,
      title: "Extras"
    }, {
      default: we(() => [
        z("div", vS, [
          (U(!0), X(Oe, null, at(r.product.options, (c) => (U(), ue(th, {
            key: c.id,
            "max-value": r.product.mealMaxValue(c),
            title: c.description,
            value: c.quantity,
            "onUpdate:value": (u) => c.quantity = u
          }, null, 8, ["max-value", "title", "value", "onUpdate:value"]))), 128))
        ]),
        r.product.isMealsCountEqualsVisitorsCount ? se("", !0) : (U(), X("div", gS, oe(a.value), 1))
      ]),
      _: 1
    }, 8, ["is-active", "selected-option-title", "title-is-black"]));
  }
}), _S = /* @__PURE__ */ ge(yS, [["__scopeId", "data-v-018b279a"]]);
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
  }, e.replaceLangSwitcher = (t = ".lang-modal__list") => {
    var a, i;
    const n = document.querySelector(t), r = window.location.pathname;
    if (!n)
      return;
    const o = n.querySelectorAll("a");
    if (!(!o || o.length === 0))
      for (const l in o) {
        const s = o[l];
        let c = s.getAttribute("href");
        if (typeof ((a = window.ticketHub) == null ? void 0 : a.language) > "u" || !c)
          return;
        c = new URL(c).pathname;
        const u = c.split("/")[1];
        let f = r.split(
          `/${(i = window.ticketHub) == null ? void 0 : i.language}/`
        )[1];
        f = typeof f < "u" ? f : r;
        const d = new URL(
          `${u}${f}`,
          window.location.origin
        );
        s.setAttribute("href", d.href);
      }
  };
})(vr || (vr = {}));
const bS = {}, Ii = (e) => (si("data-v-188a412b"), e = e(), li(), e), ES = { class: "th-skeleton__wrapper" }, wS = /* @__PURE__ */ Ii(() => /* @__PURE__ */ z("p", { class: "th-skeleton__select th-skeleton" }, null, -1)), CS = /* @__PURE__ */ Ii(() => /* @__PURE__ */ z("p", { class: "th-skeleton__select th-skeleton" }, null, -1)), TS = /* @__PURE__ */ Ii(() => /* @__PURE__ */ z("p", { class: "th-skeleton__prices th-skeleton" }, null, -1)), SS = /* @__PURE__ */ Ii(() => /* @__PURE__ */ z("p", { class: "th-skeleton__button th-skeleton" }, null, -1)), kS = [
  wS,
  CS,
  TS,
  SS
];
function IS(e, t) {
  return U(), X("div", ES, kS);
}
const OS = /* @__PURE__ */ ge(bS, [["render", IS], ["__scopeId", "data-v-188a412b"]]);
var PS = Error, DS = EvalError, AS = RangeError, $S = ReferenceError, nh = SyntaxError, Jo = TypeError, NS = URIError, LS = function() {
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
}, zu = typeof Symbol < "u" && Symbol, RS = LS, MS = function() {
  return typeof zu != "function" || typeof Symbol != "function" || typeof zu("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : RS();
}, es = {
  __proto__: null,
  foo: {}
}, xS = Object, BS = function() {
  return { __proto__: es }.foo === es.foo && !(es instanceof xS);
}, VS = "Function.prototype.bind called on incompatible ", US = Object.prototype.toString, FS = Math.max, HS = "[object Function]", qu = function(t, n) {
  for (var r = [], o = 0; o < t.length; o += 1)
    r[o] = t[o];
  for (var a = 0; a < n.length; a += 1)
    r[a + t.length] = n[a];
  return r;
}, YS = function(t, n) {
  for (var r = [], o = n || 0, a = 0; o < t.length; o += 1, a += 1)
    r[a] = t[o];
  return r;
}, jS = function(e, t) {
  for (var n = "", r = 0; r < e.length; r += 1)
    n += e[r], r + 1 < e.length && (n += t);
  return n;
}, WS = function(t) {
  var n = this;
  if (typeof n != "function" || US.apply(n) !== HS)
    throw new TypeError(VS + n);
  for (var r = YS(arguments, 1), o, a = function() {
    if (this instanceof o) {
      var u = n.apply(
        this,
        qu(r, arguments)
      );
      return Object(u) === u ? u : this;
    }
    return n.apply(
      t,
      qu(r, arguments)
    );
  }, i = FS(0, n.length - r.length), l = [], s = 0; s < i; s++)
    l[s] = "$" + s;
  if (o = Function("binder", "return function (" + jS(l, ",") + "){ return binder.apply(this,arguments); }")(a), n.prototype) {
    var c = function() {
    };
    c.prototype = n.prototype, o.prototype = new c(), c.prototype = null;
  }
  return o;
}, zS = WS, Ul = Function.prototype.bind || zS, qS = Function.prototype.call, GS = Object.prototype.hasOwnProperty, XS = Ul, KS = XS.call(qS, GS), Ee, JS = PS, ZS = DS, QS = AS, ek = $S, zr = nh, Br = Jo, tk = NS, rh = Function, ts = function(e) {
  try {
    return rh('"use strict"; return (' + e + ").constructor;")();
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
  throw new Br();
}, nk = sr ? function() {
  try {
    return arguments.callee, ns;
  } catch {
    try {
      return sr(arguments, "callee").get;
    } catch {
      return ns;
    }
  }
}() : ns, Sr = MS(), rk = BS(), Ze = Object.getPrototypeOf || (rk ? function(e) {
  return e.__proto__;
} : null), Dr = {}, ok = typeof Uint8Array > "u" || !Ze ? Ee : Ze(Uint8Array), lr = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? Ee : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? Ee : ArrayBuffer,
  "%ArrayIteratorPrototype%": Sr && Ze ? Ze([][Symbol.iterator]()) : Ee,
  "%AsyncFromSyncIteratorPrototype%": Ee,
  "%AsyncFunction%": Dr,
  "%AsyncGenerator%": Dr,
  "%AsyncGeneratorFunction%": Dr,
  "%AsyncIteratorPrototype%": Dr,
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
  "%Error%": JS,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": ZS,
  "%Float32Array%": typeof Float32Array > "u" ? Ee : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? Ee : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? Ee : FinalizationRegistry,
  "%Function%": rh,
  "%GeneratorFunction%": Dr,
  "%Int8Array%": typeof Int8Array > "u" ? Ee : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? Ee : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? Ee : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": Sr && Ze ? Ze(Ze([][Symbol.iterator]())) : Ee,
  "%JSON%": typeof JSON == "object" ? JSON : Ee,
  "%Map%": typeof Map > "u" ? Ee : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !Sr || !Ze ? Ee : Ze((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? Ee : Promise,
  "%Proxy%": typeof Proxy > "u" ? Ee : Proxy,
  "%RangeError%": QS,
  "%ReferenceError%": ek,
  "%Reflect%": typeof Reflect > "u" ? Ee : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? Ee : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !Sr || !Ze ? Ee : Ze((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? Ee : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": Sr && Ze ? Ze(""[Symbol.iterator]()) : Ee,
  "%Symbol%": Sr ? Symbol : Ee,
  "%SyntaxError%": zr,
  "%ThrowTypeError%": nk,
  "%TypedArray%": ok,
  "%TypeError%": Br,
  "%Uint8Array%": typeof Uint8Array > "u" ? Ee : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? Ee : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? Ee : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? Ee : Uint32Array,
  "%URIError%": tk,
  "%WeakMap%": typeof WeakMap > "u" ? Ee : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? Ee : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? Ee : WeakSet
};
if (Ze)
  try {
    null.error;
  } catch (e) {
    var ak = Ze(Ze(e));
    lr["%Error.prototype%"] = ak;
  }
var ik = function e(t) {
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
    o && Ze && (n = Ze(o.prototype));
  }
  return lr[t] = n, n;
}, Gu = {
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
}, Zo = Ul, Ja = KS, sk = Zo.call(Function.call, Array.prototype.concat), lk = Zo.call(Function.apply, Array.prototype.splice), Xu = Zo.call(Function.call, String.prototype.replace), Za = Zo.call(Function.call, String.prototype.slice), ck = Zo.call(Function.call, RegExp.prototype.exec), uk = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, dk = /\\(\\)?/g, fk = function(t) {
  var n = Za(t, 0, 1), r = Za(t, -1);
  if (n === "%" && r !== "%")
    throw new zr("invalid intrinsic syntax, expected closing `%`");
  if (r === "%" && n !== "%")
    throw new zr("invalid intrinsic syntax, expected opening `%`");
  var o = [];
  return Xu(t, uk, function(a, i, l, s) {
    o[o.length] = l ? Xu(s, dk, "$1") : i || a;
  }), o;
}, pk = function(t, n) {
  var r = t, o;
  if (Ja(Gu, r) && (o = Gu[r], r = "%" + o[0] + "%"), Ja(lr, r)) {
    var a = lr[r];
    if (a === Dr && (a = ik(r)), typeof a > "u" && !n)
      throw new Br("intrinsic " + t + " exists, but is not available. Please file an issue!");
    return {
      alias: o,
      name: r,
      value: a
    };
  }
  throw new zr("intrinsic " + t + " does not exist!");
}, ro = function(t, n) {
  if (typeof t != "string" || t.length === 0)
    throw new Br("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof n != "boolean")
    throw new Br('"allowMissing" argument must be a boolean');
  if (ck(/^%?[^%]*%?$/, t) === null)
    throw new zr("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var r = fk(t), o = r.length > 0 ? r[0] : "", a = pk("%" + o + "%", n), i = a.name, l = a.value, s = !1, c = a.alias;
  c && (o = c[0], lk(r, sk([0, 1], c)));
  for (var u = 1, f = !0; u < r.length; u += 1) {
    var d = r[u], v = Za(d, 0, 1), p = Za(d, -1);
    if ((v === '"' || v === "'" || v === "`" || p === '"' || p === "'" || p === "`") && v !== p)
      throw new zr("property names with quotes must have matching quotes");
    if ((d === "constructor" || !f) && (s = !0), o += "." + d, i = "%" + o + "%", Ja(lr, i))
      l = lr[i];
    else if (l != null) {
      if (!(d in l)) {
        if (!n)
          throw new Br("base intrinsic for " + t + " exists, but the property is not available.");
        return;
      }
      if (sr && u + 1 >= r.length) {
        var g = sr(l, d);
        f = !!g, f && "get" in g && !("originalValue" in g.get) ? l = g.get : l = l[d];
      } else
        f = Ja(l, d), l = l[d];
      f && !s && (lr[i] = l);
    }
  }
  return l;
}, oh = { exports: {} }, rs, Ku;
function Fl() {
  if (Ku)
    return rs;
  Ku = 1;
  var e = ro, t = e("%Object.defineProperty%", !0) || !1;
  if (t)
    try {
      t({}, "a", { value: 1 });
    } catch {
      t = !1;
    }
  return rs = t, rs;
}
var mk = ro, Da = mk("%Object.getOwnPropertyDescriptor%", !0);
if (Da)
  try {
    Da([], "length");
  } catch {
    Da = null;
  }
var ah = Da, Ju = Fl(), hk = nh, kr = Jo, Zu = ah, vk = function(t, n, r) {
  if (!t || typeof t != "object" && typeof t != "function")
    throw new kr("`obj` must be an object or a function`");
  if (typeof n != "string" && typeof n != "symbol")
    throw new kr("`property` must be a string or a symbol`");
  if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
    throw new kr("`nonEnumerable`, if provided, must be a boolean or null");
  if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
    throw new kr("`nonWritable`, if provided, must be a boolean or null");
  if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
    throw new kr("`nonConfigurable`, if provided, must be a boolean or null");
  if (arguments.length > 6 && typeof arguments[6] != "boolean")
    throw new kr("`loose`, if provided, must be a boolean");
  var o = arguments.length > 3 ? arguments[3] : null, a = arguments.length > 4 ? arguments[4] : null, i = arguments.length > 5 ? arguments[5] : null, l = arguments.length > 6 ? arguments[6] : !1, s = !!Zu && Zu(t, n);
  if (Ju)
    Ju(t, n, {
      configurable: i === null && s ? s.configurable : !i,
      enumerable: o === null && s ? s.enumerable : !o,
      value: r,
      writable: a === null && s ? s.writable : !a
    });
  else if (l || !o && !a && !i)
    t[n] = r;
  else
    throw new hk("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, zs = Fl(), ih = function() {
  return !!zs;
};
ih.hasArrayLengthDefineBug = function() {
  if (!zs)
    return null;
  try {
    return zs([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var gk = ih, yk = ro, Qu = vk, _k = gk(), ed = ah, td = Jo, bk = yk("%Math.floor%"), Ek = function(t, n) {
  if (typeof t != "function")
    throw new td("`fn` is not a function");
  if (typeof n != "number" || n < 0 || n > 4294967295 || bk(n) !== n)
    throw new td("`length` must be a positive 32-bit integer");
  var r = arguments.length > 2 && !!arguments[2], o = !0, a = !0;
  if ("length" in t && ed) {
    var i = ed(t, "length");
    i && !i.configurable && (o = !1), i && !i.writable && (a = !1);
  }
  return (o || a || !r) && (_k ? Qu(
    /** @type {Parameters<define>[0]} */
    t,
    "length",
    n,
    !0,
    !0
  ) : Qu(
    /** @type {Parameters<define>[0]} */
    t,
    "length",
    n
  )), t;
};
(function(e) {
  var t = Ul, n = ro, r = Ek, o = Jo, a = n("%Function.prototype.apply%"), i = n("%Function.prototype.call%"), l = n("%Reflect.apply%", !0) || t.call(i, a), s = Fl(), c = n("%Math.max%");
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
})(oh);
var wk = oh.exports, sh = ro, lh = wk, Ck = lh(sh("String.prototype.indexOf")), Tk = function(t, n) {
  var r = sh(t, !!n);
  return typeof r == "function" && Ck(t, ".prototype.") > -1 ? lh(r) : r;
};
const Sk = {}, kk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sk
}, Symbol.toStringTag, { value: "Module" })), Ik = /* @__PURE__ */ Hv(kk);
var Hl = typeof Map == "function" && Map.prototype, os = Object.getOwnPropertyDescriptor && Hl ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, Qa = Hl && os && typeof os.get == "function" ? os.get : null, nd = Hl && Map.prototype.forEach, Yl = typeof Set == "function" && Set.prototype, as = Object.getOwnPropertyDescriptor && Yl ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, ei = Yl && as && typeof as.get == "function" ? as.get : null, rd = Yl && Set.prototype.forEach, Ok = typeof WeakMap == "function" && WeakMap.prototype, Eo = Ok ? WeakMap.prototype.has : null, Pk = typeof WeakSet == "function" && WeakSet.prototype, wo = Pk ? WeakSet.prototype.has : null, Dk = typeof WeakRef == "function" && WeakRef.prototype, od = Dk ? WeakRef.prototype.deref : null, Ak = Boolean.prototype.valueOf, $k = Object.prototype.toString, Nk = Function.prototype.toString, Lk = String.prototype.match, jl = String.prototype.slice, Pn = String.prototype.replace, Rk = String.prototype.toUpperCase, ad = String.prototype.toLowerCase, ch = RegExp.prototype.test, id = Array.prototype.concat, Ht = Array.prototype.join, Mk = Array.prototype.slice, sd = Math.floor, qs = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, is = Object.getOwnPropertySymbols, Gs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, qr = typeof Symbol == "function" && typeof Symbol.iterator == "object", dt = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === qr || !0) ? Symbol.toStringTag : null, uh = Object.prototype.propertyIsEnumerable, ld = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(e) {
  return e.__proto__;
} : null);
function cd(e, t) {
  if (e === 1 / 0 || e === -1 / 0 || e !== e || e && e > -1e3 && e < 1e3 || ch.call(/e/, t))
    return t;
  var n = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof e == "number") {
    var r = e < 0 ? -sd(-e) : sd(e);
    if (r !== e) {
      var o = String(r), a = jl.call(t, o.length + 1);
      return Pn.call(o, n, "$&_") + "." + Pn.call(Pn.call(a, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return Pn.call(t, n, "$&_");
}
var Xs = Ik, ud = Xs.custom, dd = fh(ud) ? ud : null, xk = function e(t, n, r, o) {
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
    return mh(t, a);
  if (typeof t == "number") {
    if (t === 0)
      return 1 / 0 / t > 0 ? "0" : "-0";
    var s = String(t);
    return l ? cd(t, s) : s;
  }
  if (typeof t == "bigint") {
    var c = String(t) + "n";
    return l ? cd(t, c) : c;
  }
  var u = typeof a.depth > "u" ? 5 : a.depth;
  if (typeof r > "u" && (r = 0), r >= u && u > 0 && typeof t == "object")
    return Ks(t) ? "[Array]" : "[Object]";
  var f = tI(a, r);
  if (typeof o > "u")
    o = [];
  else if (ph(o, t) >= 0)
    return "[Circular]";
  function d(x, M, $) {
    if (M && (o = Mk.call(o), o.push(M)), $) {
      var L = {
        depth: a.depth
      };
      return Tn(a, "quoteStyle") && (L.quoteStyle = a.quoteStyle), e(x, L, r + 1, o);
    }
    return e(x, a, r + 1, o);
  }
  if (typeof t == "function" && !fd(t)) {
    var v = zk(t), p = ba(t, d);
    return "[Function" + (v ? ": " + v : " (anonymous)") + "]" + (p.length > 0 ? " { " + Ht.call(p, ", ") + " }" : "");
  }
  if (fh(t)) {
    var g = qr ? Pn.call(String(t), /^(Symbol\(.*\))_[^)]*$/, "$1") : Gs.call(t);
    return typeof t == "object" && !qr ? fo(g) : g;
  }
  if (Zk(t)) {
    for (var h = "<" + ad.call(String(t.nodeName)), m = t.attributes || [], y = 0; y < m.length; y++)
      h += " " + m[y].name + "=" + dh(Bk(m[y].value), "double", a);
    return h += ">", t.childNodes && t.childNodes.length && (h += "..."), h += "</" + ad.call(String(t.nodeName)) + ">", h;
  }
  if (Ks(t)) {
    if (t.length === 0)
      return "[]";
    var b = ba(t, d);
    return f && !eI(b) ? "[" + Js(b, f) + "]" : "[ " + Ht.call(b, ", ") + " ]";
  }
  if (Uk(t)) {
    var O = ba(t, d);
    return !("cause" in Error.prototype) && "cause" in t && !uh.call(t, "cause") ? "{ [" + String(t) + "] " + Ht.call(id.call("[cause]: " + d(t.cause), O), ", ") + " }" : O.length === 0 ? "[" + String(t) + "]" : "{ [" + String(t) + "] " + Ht.call(O, ", ") + " }";
  }
  if (typeof t == "object" && i) {
    if (dd && typeof t[dd] == "function" && Xs)
      return Xs(t, { depth: u - r });
    if (i !== "symbol" && typeof t.inspect == "function")
      return t.inspect();
  }
  if (qk(t)) {
    var N = [];
    return nd && nd.call(t, function(x, M) {
      N.push(d(M, t, !0) + " => " + d(x, t));
    }), pd("Map", Qa.call(t), N, f);
  }
  if (Kk(t)) {
    var S = [];
    return rd && rd.call(t, function(x) {
      S.push(d(x, t));
    }), pd("Set", ei.call(t), S, f);
  }
  if (Gk(t))
    return ss("WeakMap");
  if (Jk(t))
    return ss("WeakSet");
  if (Xk(t))
    return ss("WeakRef");
  if (Hk(t))
    return fo(d(Number(t)));
  if (jk(t))
    return fo(d(qs.call(t)));
  if (Yk(t))
    return fo(Ak.call(t));
  if (Fk(t))
    return fo(d(String(t)));
  if (typeof window < "u" && t === window)
    return "{ [object Window] }";
  if (t === an)
    return "{ [object globalThis] }";
  if (!Vk(t) && !fd(t)) {
    var E = ba(t, d), C = ld ? ld(t) === Object.prototype : t instanceof Object || t.constructor === Object, I = t instanceof Object ? "" : "null prototype", _ = !C && dt && Object(t) === t && dt in t ? jl.call(Xn(t), 8, -1) : I ? "Object" : "", k = C || typeof t.constructor != "function" ? "" : t.constructor.name ? t.constructor.name + " " : "", A = k + (_ || I ? "[" + Ht.call(id.call([], _ || [], I || []), ": ") + "] " : "");
    return E.length === 0 ? A + "{}" : f ? A + "{" + Js(E, f) + "}" : A + "{ " + Ht.call(E, ", ") + " }";
  }
  return String(t);
};
function dh(e, t, n) {
  var r = (n.quoteStyle || t) === "double" ? '"' : "'";
  return r + e + r;
}
function Bk(e) {
  return Pn.call(String(e), /"/g, "&quot;");
}
function Ks(e) {
  return Xn(e) === "[object Array]" && (!dt || !(typeof e == "object" && dt in e));
}
function Vk(e) {
  return Xn(e) === "[object Date]" && (!dt || !(typeof e == "object" && dt in e));
}
function fd(e) {
  return Xn(e) === "[object RegExp]" && (!dt || !(typeof e == "object" && dt in e));
}
function Uk(e) {
  return Xn(e) === "[object Error]" && (!dt || !(typeof e == "object" && dt in e));
}
function Fk(e) {
  return Xn(e) === "[object String]" && (!dt || !(typeof e == "object" && dt in e));
}
function Hk(e) {
  return Xn(e) === "[object Number]" && (!dt || !(typeof e == "object" && dt in e));
}
function Yk(e) {
  return Xn(e) === "[object Boolean]" && (!dt || !(typeof e == "object" && dt in e));
}
function fh(e) {
  if (qr)
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
function jk(e) {
  if (!e || typeof e != "object" || !qs)
    return !1;
  try {
    return qs.call(e), !0;
  } catch {
  }
  return !1;
}
var Wk = Object.prototype.hasOwnProperty || function(e) {
  return e in this;
};
function Tn(e, t) {
  return Wk.call(e, t);
}
function Xn(e) {
  return $k.call(e);
}
function zk(e) {
  if (e.name)
    return e.name;
  var t = Lk.call(Nk.call(e), /^function\s*([\w$]+)/);
  return t ? t[1] : null;
}
function ph(e, t) {
  if (e.indexOf)
    return e.indexOf(t);
  for (var n = 0, r = e.length; n < r; n++)
    if (e[n] === t)
      return n;
  return -1;
}
function qk(e) {
  if (!Qa || !e || typeof e != "object")
    return !1;
  try {
    Qa.call(e);
    try {
      ei.call(e);
    } catch {
      return !0;
    }
    return e instanceof Map;
  } catch {
  }
  return !1;
}
function Gk(e) {
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
function Xk(e) {
  if (!od || !e || typeof e != "object")
    return !1;
  try {
    return od.call(e), !0;
  } catch {
  }
  return !1;
}
function Kk(e) {
  if (!ei || !e || typeof e != "object")
    return !1;
  try {
    ei.call(e);
    try {
      Qa.call(e);
    } catch {
      return !0;
    }
    return e instanceof Set;
  } catch {
  }
  return !1;
}
function Jk(e) {
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
function Zk(e) {
  return !e || typeof e != "object" ? !1 : typeof HTMLElement < "u" && e instanceof HTMLElement ? !0 : typeof e.nodeName == "string" && typeof e.getAttribute == "function";
}
function mh(e, t) {
  if (e.length > t.maxStringLength) {
    var n = e.length - t.maxStringLength, r = "... " + n + " more character" + (n > 1 ? "s" : "");
    return mh(jl.call(e, 0, t.maxStringLength), t) + r;
  }
  var o = Pn.call(Pn.call(e, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, Qk);
  return dh(o, "single", t);
}
function Qk(e) {
  var t = e.charCodeAt(0), n = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[t];
  return n ? "\\" + n : "\\x" + (t < 16 ? "0" : "") + Rk.call(t.toString(16));
}
function fo(e) {
  return "Object(" + e + ")";
}
function ss(e) {
  return e + " { ? }";
}
function pd(e, t, n, r) {
  var o = r ? Js(n, r) : Ht.call(n, ", ");
  return e + " (" + t + ") {" + o + "}";
}
function eI(e) {
  for (var t = 0; t < e.length; t++)
    if (ph(e[t], `
`) >= 0)
      return !1;
  return !0;
}
function tI(e, t) {
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
function ba(e, t) {
  var n = Ks(e), r = [];
  if (n) {
    r.length = e.length;
    for (var o = 0; o < e.length; o++)
      r[o] = Tn(e, o) ? t(e[o], e) : "";
  }
  var a = typeof is == "function" ? is(e) : [], i;
  if (qr) {
    i = {};
    for (var l = 0; l < a.length; l++)
      i["$" + a[l]] = a[l];
  }
  for (var s in e)
    Tn(e, s) && (n && String(Number(s)) === s && s < e.length || qr && i["$" + s] instanceof Symbol || (ch.call(/[^\w$]/, s) ? r.push(t(s, e) + ": " + t(e[s], e)) : r.push(s + ": " + t(e[s], e))));
  if (typeof is == "function")
    for (var c = 0; c < a.length; c++)
      uh.call(e, a[c]) && r.push("[" + t(a[c]) + "]: " + t(e[a[c]], e));
  return r;
}
var hh = ro, oo = Tk, nI = xk, rI = Jo, Ea = hh("%WeakMap%", !0), wa = hh("%Map%", !0), oI = oo("WeakMap.prototype.get", !0), aI = oo("WeakMap.prototype.set", !0), iI = oo("WeakMap.prototype.has", !0), sI = oo("Map.prototype.get", !0), lI = oo("Map.prototype.set", !0), cI = oo("Map.prototype.has", !0), Wl = function(e, t) {
  for (var n = e, r; (r = n.next) !== null; n = r)
    if (r.key === t)
      return n.next = r.next, r.next = /** @type {NonNullable<typeof list.next>} */
      e.next, e.next = r, r;
}, uI = function(e, t) {
  var n = Wl(e, t);
  return n && n.value;
}, dI = function(e, t, n) {
  var r = Wl(e, t);
  r ? r.value = n : e.next = /** @type {import('.').ListNode<typeof value>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: t,
    next: e.next,
    value: n
  };
}, fI = function(e, t) {
  return !!Wl(e, t);
}, pI = function() {
  var t, n, r, o = {
    assert: function(a) {
      if (!o.has(a))
        throw new rI("Side channel does not contain " + nI(a));
    },
    get: function(a) {
      if (Ea && a && (typeof a == "object" || typeof a == "function")) {
        if (t)
          return oI(t, a);
      } else if (wa) {
        if (n)
          return sI(n, a);
      } else if (r)
        return uI(r, a);
    },
    has: function(a) {
      if (Ea && a && (typeof a == "object" || typeof a == "function")) {
        if (t)
          return iI(t, a);
      } else if (wa) {
        if (n)
          return cI(n, a);
      } else if (r)
        return fI(r, a);
      return !1;
    },
    set: function(a, i) {
      Ea && a && (typeof a == "object" || typeof a == "function") ? (t || (t = new Ea()), aI(t, a, i)) : wa ? (n || (n = new wa()), lI(n, a, i)) : (r || (r = { key: {}, next: null }), dI(r, a, i));
    }
  };
  return o;
}, mI = String.prototype.replace, hI = /%20/g, ls = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, zl = {
  default: ls.RFC3986,
  formatters: {
    RFC1738: function(e) {
      return mI.call(e, hI, "+");
    },
    RFC3986: function(e) {
      return String(e);
    }
  },
  RFC1738: ls.RFC1738,
  RFC3986: ls.RFC3986
}, vI = zl, cs = Object.prototype.hasOwnProperty, nr = Array.isArray, Ut = function() {
  for (var e = [], t = 0; t < 256; ++t)
    e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
  return e;
}(), gI = function(t) {
  for (; t.length > 1; ) {
    var n = t.pop(), r = n.obj[n.prop];
    if (nr(r)) {
      for (var o = [], a = 0; a < r.length; ++a)
        typeof r[a] < "u" && o.push(r[a]);
      n.obj[n.prop] = o;
    }
  }
}, vh = function(t, n) {
  for (var r = n && n.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o = 0; o < t.length; ++o)
    typeof t[o] < "u" && (r[o] = t[o]);
  return r;
}, yI = function e(t, n, r) {
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
  return nr(t) && !nr(n) && (o = vh(t, r)), nr(t) && nr(n) ? (n.forEach(function(a, i) {
    if (cs.call(t, i)) {
      var l = t[i];
      l && typeof l == "object" && a && typeof a == "object" ? t[i] = e(l, a, r) : t.push(a);
    } else
      t[i] = a;
  }), t) : Object.keys(n).reduce(function(a, i) {
    var l = n[i];
    return cs.call(a, i) ? a[i] = e(a[i], l, r) : a[i] = l, a;
  }, o);
}, _I = function(t, n) {
  return Object.keys(n).reduce(function(r, o) {
    return r[o] = n[o], r;
  }, t);
}, bI = function(e, t, n) {
  var r = e.replace(/\+/g, " ");
  if (n === "iso-8859-1")
    return r.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(r);
  } catch {
    return r;
  }
}, us = 1024, EI = function(t, n, r, o, a) {
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
      if (d === 45 || d === 46 || d === 95 || d === 126 || d >= 48 && d <= 57 || d >= 65 && d <= 90 || d >= 97 && d <= 122 || a === vI.RFC1738 && (d === 40 || d === 41)) {
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
}, wI = function(t) {
  for (var n = [{ obj: { o: t }, prop: "o" }], r = [], o = 0; o < n.length; ++o)
    for (var a = n[o], i = a.obj[a.prop], l = Object.keys(i), s = 0; s < l.length; ++s) {
      var c = l[s], u = i[c];
      typeof u == "object" && u !== null && r.indexOf(u) === -1 && (n.push({ obj: i, prop: c }), r.push(u));
    }
  return gI(n), t;
}, CI = function(t) {
  return Object.prototype.toString.call(t) === "[object RegExp]";
}, TI = function(t) {
  return !t || typeof t != "object" ? !1 : !!(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t));
}, SI = function(t, n) {
  return [].concat(t, n);
}, kI = function(t, n) {
  if (nr(t)) {
    for (var r = [], o = 0; o < t.length; o += 1)
      r.push(n(t[o]));
    return r;
  }
  return n(t);
}, gh = {
  arrayToObject: vh,
  assign: _I,
  combine: SI,
  compact: wI,
  decode: bI,
  encode: EI,
  isBuffer: TI,
  isRegExp: CI,
  maybeMap: kI,
  merge: yI
}, yh = pI, Aa = gh, Co = zl, II = Object.prototype.hasOwnProperty, _h = {
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
}, Ft = Array.isArray, OI = Array.prototype.push, bh = function(e, t) {
  OI.apply(e, Ft(t) ? t : [t]);
}, PI = Date.prototype.toISOString, md = Co.default, Xe = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: Aa.encode,
  encodeValuesOnly: !1,
  format: md,
  formatter: Co.formatters[md],
  // deprecated
  indices: !1,
  serializeDate: function(t) {
    return PI.call(t);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, DI = function(t) {
  return typeof t == "string" || typeof t == "number" || typeof t == "boolean" || typeof t == "symbol" || typeof t == "bigint";
}, ds = {}, AI = function e(t, n, r, o, a, i, l, s, c, u, f, d, v, p, g, h, m, y) {
  for (var b = t, O = y, N = 0, S = !1; (O = O.get(ds)) !== void 0 && !S; ) {
    var E = O.get(t);
    if (N += 1, typeof E < "u") {
      if (E === N)
        throw new RangeError("Cyclic object value");
      S = !0;
    }
    typeof O.get(ds) > "u" && (N = 0);
  }
  if (typeof u == "function" ? b = u(n, b) : b instanceof Date ? b = v(b) : r === "comma" && Ft(b) && (b = Aa.maybeMap(b, function(B) {
    return B instanceof Date ? v(B) : B;
  })), b === null) {
    if (i)
      return c && !h ? c(n, Xe.encoder, m, "key", p) : n;
    b = "";
  }
  if (DI(b) || Aa.isBuffer(b)) {
    if (c) {
      var C = h ? n : c(n, Xe.encoder, m, "key", p);
      return [g(C) + "=" + g(c(b, Xe.encoder, m, "value", p))];
    }
    return [g(n) + "=" + g(String(b))];
  }
  var I = [];
  if (typeof b > "u")
    return I;
  var _;
  if (r === "comma" && Ft(b))
    h && c && (b = Aa.maybeMap(b, c)), _ = [{ value: b.length > 0 ? b.join(",") || null : void 0 }];
  else if (Ft(u))
    _ = u;
  else {
    var k = Object.keys(b);
    _ = f ? k.sort(f) : k;
  }
  var A = s ? n.replace(/\./g, "%2E") : n, x = o && Ft(b) && b.length === 1 ? A + "[]" : A;
  if (a && Ft(b) && b.length === 0)
    return x + "[]";
  for (var M = 0; M < _.length; ++M) {
    var $ = _[M], L = typeof $ == "object" && typeof $.value < "u" ? $.value : b[$];
    if (!(l && L === null)) {
      var F = d && s ? $.replace(/\./g, "%2E") : $, V = Ft(b) ? typeof r == "function" ? r(x, F) : x : x + (d ? "." + F : "[" + F + "]");
      y.set(t, N);
      var q = yh();
      q.set(ds, y), bh(I, e(
        L,
        V,
        r,
        o,
        a,
        i,
        l,
        s,
        r === "comma" && h && Ft(b) ? null : c,
        u,
        f,
        d,
        v,
        p,
        g,
        h,
        m,
        q
      ));
    }
  }
  return I;
}, $I = function(t) {
  if (!t)
    return Xe;
  if (typeof t.allowEmptyArrays < "u" && typeof t.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof t.encodeDotInKeys < "u" && typeof t.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (t.encoder !== null && typeof t.encoder < "u" && typeof t.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var n = t.charset || Xe.charset;
  if (typeof t.charset < "u" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var r = Co.default;
  if (typeof t.format < "u") {
    if (!II.call(Co.formatters, t.format))
      throw new TypeError("Unknown format option provided.");
    r = t.format;
  }
  var o = Co.formatters[r], a = Xe.filter;
  (typeof t.filter == "function" || Ft(t.filter)) && (a = t.filter);
  var i;
  if (t.arrayFormat in _h ? i = t.arrayFormat : "indices" in t ? i = t.indices ? "indices" : "repeat" : i = Xe.arrayFormat, "commaRoundTrip" in t && typeof t.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  var l = typeof t.allowDots > "u" ? t.encodeDotInKeys === !0 ? !0 : Xe.allowDots : !!t.allowDots;
  return {
    addQueryPrefix: typeof t.addQueryPrefix == "boolean" ? t.addQueryPrefix : Xe.addQueryPrefix,
    allowDots: l,
    allowEmptyArrays: typeof t.allowEmptyArrays == "boolean" ? !!t.allowEmptyArrays : Xe.allowEmptyArrays,
    arrayFormat: i,
    charset: n,
    charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : Xe.charsetSentinel,
    commaRoundTrip: t.commaRoundTrip,
    delimiter: typeof t.delimiter > "u" ? Xe.delimiter : t.delimiter,
    encode: typeof t.encode == "boolean" ? t.encode : Xe.encode,
    encodeDotInKeys: typeof t.encodeDotInKeys == "boolean" ? t.encodeDotInKeys : Xe.encodeDotInKeys,
    encoder: typeof t.encoder == "function" ? t.encoder : Xe.encoder,
    encodeValuesOnly: typeof t.encodeValuesOnly == "boolean" ? t.encodeValuesOnly : Xe.encodeValuesOnly,
    filter: a,
    format: r,
    formatter: o,
    serializeDate: typeof t.serializeDate == "function" ? t.serializeDate : Xe.serializeDate,
    skipNulls: typeof t.skipNulls == "boolean" ? t.skipNulls : Xe.skipNulls,
    sort: typeof t.sort == "function" ? t.sort : null,
    strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : Xe.strictNullHandling
  };
}, NI = function(e, t) {
  var n = e, r = $I(t), o, a;
  typeof r.filter == "function" ? (a = r.filter, n = a("", n)) : Ft(r.filter) && (a = r.filter, o = a);
  var i = [];
  if (typeof n != "object" || n === null)
    return "";
  var l = _h[r.arrayFormat], s = l === "comma" && r.commaRoundTrip;
  o || (o = Object.keys(n)), r.sort && o.sort(r.sort);
  for (var c = yh(), u = 0; u < o.length; ++u) {
    var f = o[u];
    r.skipNulls && n[f] === null || bh(i, AI(
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
}, Gr = gh, Zs = Object.prototype.hasOwnProperty, LI = Array.isArray, Fe = {
  allowDots: !1,
  allowEmptyArrays: !1,
  allowPrototypes: !1,
  allowSparse: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decodeDotInKeys: !1,
  decoder: Gr.decode,
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
}, RI = function(e) {
  return e.replace(/&#(\d+);/g, function(t, n) {
    return String.fromCharCode(parseInt(n, 10));
  });
}, Eh = function(e, t) {
  return e && typeof e == "string" && t.comma && e.indexOf(",") > -1 ? e.split(",") : e;
}, MI = "utf8=%26%2310003%3B", xI = "utf8=%E2%9C%93", BI = function(t, n) {
  var r = { __proto__: null }, o = n.ignoreQueryPrefix ? t.replace(/^\?/, "") : t;
  o = o.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  var a = n.parameterLimit === 1 / 0 ? void 0 : n.parameterLimit, i = o.split(n.delimiter, a), l = -1, s, c = n.charset;
  if (n.charsetSentinel)
    for (s = 0; s < i.length; ++s)
      i[s].indexOf("utf8=") === 0 && (i[s] === xI ? c = "utf-8" : i[s] === MI && (c = "iso-8859-1"), l = s, s = i.length);
  for (s = 0; s < i.length; ++s)
    if (s !== l) {
      var u = i[s], f = u.indexOf("]="), d = f === -1 ? u.indexOf("=") : f + 1, v, p;
      d === -1 ? (v = n.decoder(u, Fe.decoder, c, "key"), p = n.strictNullHandling ? null : "") : (v = n.decoder(u.slice(0, d), Fe.decoder, c, "key"), p = Gr.maybeMap(
        Eh(u.slice(d + 1), n),
        function(h) {
          return n.decoder(h, Fe.decoder, c, "value");
        }
      )), p && n.interpretNumericEntities && c === "iso-8859-1" && (p = RI(p)), u.indexOf("[]=") > -1 && (p = LI(p) ? [p] : p);
      var g = Zs.call(r, v);
      g && n.duplicates === "combine" ? r[v] = Gr.combine(r[v], p) : (!g || n.duplicates === "last") && (r[v] = p);
    }
  return r;
}, VI = function(e, t, n, r) {
  for (var o = r ? t : Eh(t, n), a = e.length - 1; a >= 0; --a) {
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
}, UI = function(t, n, r, o) {
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
    return VI(u, n, r, o);
  }
}, FI = function(t) {
  if (!t)
    return Fe;
  if (typeof t.allowEmptyArrays < "u" && typeof t.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof t.decodeDotInKeys < "u" && typeof t.decodeDotInKeys != "boolean")
    throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
  if (t.decoder !== null && typeof t.decoder < "u" && typeof t.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof t.charset < "u" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var n = typeof t.charset > "u" ? Fe.charset : t.charset, r = typeof t.duplicates > "u" ? Fe.duplicates : t.duplicates;
  if (r !== "combine" && r !== "first" && r !== "last")
    throw new TypeError("The duplicates option must be either combine, first, or last");
  var o = typeof t.allowDots > "u" ? t.decodeDotInKeys === !0 ? !0 : Fe.allowDots : !!t.allowDots;
  return {
    allowDots: o,
    allowEmptyArrays: typeof t.allowEmptyArrays == "boolean" ? !!t.allowEmptyArrays : Fe.allowEmptyArrays,
    allowPrototypes: typeof t.allowPrototypes == "boolean" ? t.allowPrototypes : Fe.allowPrototypes,
    allowSparse: typeof t.allowSparse == "boolean" ? t.allowSparse : Fe.allowSparse,
    arrayLimit: typeof t.arrayLimit == "number" ? t.arrayLimit : Fe.arrayLimit,
    charset: n,
    charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : Fe.charsetSentinel,
    comma: typeof t.comma == "boolean" ? t.comma : Fe.comma,
    decodeDotInKeys: typeof t.decodeDotInKeys == "boolean" ? t.decodeDotInKeys : Fe.decodeDotInKeys,
    decoder: typeof t.decoder == "function" ? t.decoder : Fe.decoder,
    delimiter: typeof t.delimiter == "string" || Gr.isRegExp(t.delimiter) ? t.delimiter : Fe.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof t.depth == "number" || t.depth === !1 ? +t.depth : Fe.depth,
    duplicates: r,
    ignoreQueryPrefix: t.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof t.interpretNumericEntities == "boolean" ? t.interpretNumericEntities : Fe.interpretNumericEntities,
    parameterLimit: typeof t.parameterLimit == "number" ? t.parameterLimit : Fe.parameterLimit,
    parseArrays: t.parseArrays !== !1,
    plainObjects: typeof t.plainObjects == "boolean" ? t.plainObjects : Fe.plainObjects,
    strictDepth: typeof t.strictDepth == "boolean" ? !!t.strictDepth : Fe.strictDepth,
    strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : Fe.strictNullHandling
  };
}, HI = function(e, t) {
  var n = FI(t);
  if (e === "" || e === null || typeof e > "u")
    return n.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var r = typeof e == "string" ? BI(e, n) : e, o = n.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, a = Object.keys(r), i = 0; i < a.length; ++i) {
    var l = a[i], s = UI(l, r[l], n, typeof e == "string");
    o = Gr.merge(o, s, n);
  }
  return n.allowSparse === !0 ? o : Gr.compact(o);
}, YI = NI, jI = HI, WI = zl, zI = {
  formats: WI,
  parse: jI,
  stringify: YI
};
const qI = /* @__PURE__ */ Zr(zI), GI = {
  key: 1,
  class: "th-product__wrapper"
}, XI = { class: "th-product__options" }, KI = { class: "th-product__footer" }, JI = {
  key: 0,
  class: "th-product__footer-row"
}, ZI = { class: "th-product__footer-title th-up-lg:hidden" }, QI = { class: "th-product__prices" }, eO = {
  key: 0,
  class: "th-product__prices-title"
}, tO = {
  key: 1,
  class: "th-product__price th-product__price_old th-down-lg:hidden"
}, nO = { class: "th-product__price th-product__price_current" }, rO = { class: "th-product__actions" }, oO = { class: "th-product__options" }, aO = { class: "th-product__footer" }, iO = { class: "th-product__footer-row" }, sO = { class: "th-product__footer-title th-up-lg:hidden" }, lO = {
  key: 0,
  class: "th-product__prices"
}, cO = {
  key: 0,
  class: "th-product__prices-title"
}, uO = {
  key: 1,
  class: "th-product__price th-product__price_old th-down-lg:hidden"
}, dO = { class: "th-product__price th-product__price_current" }, fO = { class: "th-product__actions" }, pO = ["innerHTML"], mO = /* @__PURE__ */ me({
  __name: "BookingComponent",
  props: {
    product: {},
    hideBookNowButton: { type: Boolean, default: !1 },
    hidePrices: { type: Boolean, default: !1 },
    upsell: { type: Boolean, default: !1 }
  },
  emits: ["loaded", "booked", "priceIsChanged"],
  setup(e, { emit: t }) {
    const { localizedTitle: n } = Ao, r = Q(null), o = Q(null), a = Q(null), i = Q(!1), l = hi(), s = bi(), c = Q(null), { showToast: u, showErrorToast: f } = _r(), d = Q(!0), v = e, p = t, { t: g, locale: h } = Pe(), m = async (_ = /* @__PURE__ */ new Date()) => {
      try {
        if (!c.value)
          return;
        d.value = !0;
        const k = await hr.getProductBookingData(
          c.value,
          fe(_).format("YYYY-MM-DD")
        );
        await c.value.setBookingData(k);
      } catch {
      } finally {
        p("loaded"), d.value = !1;
      }
    };
    Ne(
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
      const k = fe(_);
      k.isValid() && ((A = c.value) == null || A.selectDate(k.toDate()));
    }, b = () => qI.parse(window.location.search.slice(1), {
      decoder(_) {
        if (/^(\d+|\d*\.\d+)$/.test(_))
          return parseFloat(_);
        const k = {
          true: !0,
          false: !1,
          null: null,
          undefined: void 0
        };
        return _ in k ? k[_] : _;
      }
    }), O = (_) => {
      c.value && Array.isArray(_) && _.forEach((k) => {
        var x;
        if (!Number.isInteger(k.id) || !Number.isInteger(k.count) || k.count <= 0)
          return;
        const A = (x = c.value) == null ? void 0 : x.availableCategories.find(
          (M) => M.itemCategoryId === k.id
        );
        typeof A > "u" || (A.quantity = k.count);
      });
    }, N = () => {
      const _ = b();
      typeof _.filter > "u" || !_.filter || c.value && typeof _.date < "u" && y(_.date);
    };
    rt(async () => {
      typeof window.ticketHub < "u" && (window.ticketHub.selectVariant = C), setTimeout(async () => {
        var A;
        const _ = vr.getQueryParamFromString(
          window.location.search,
          "cartItemId"
        );
        c.value = await Rn.getProduct(v.product);
        const k = b();
        if (c.value && c.value.isSellable) {
          typeof _ < "u" && ((A = c.value) == null || A.loadCartItem(_));
          let x = c.value.selectedDate;
          N(), c.value.isEdit && (x = fe(c.value.selectedDate).startOf("month").toDate()), await m(x), typeof k.guests < "u" && O(k.guests), await Yr.viewItem(c.value);
          return;
        }
        p("loaded"), d.value = !1;
      }, 0);
    });
    const S = te(() => {
      var _, k;
      return (_ = c.value) != null && _.isOpen ? !0 : (k = c.value) == null ? void 0 : k.isTimeslotsAreSelected;
    }), E = te(() => {
      var _, k;
      return ((_ = c.value) == null ? void 0 : _.isTimeslotsAreSelected) && ((k = c.value) == null ? void 0 : k.isVisitorsAreSelected);
    }), C = async (_) => {
      var k, A, x, M, $;
      if (((A = (k = c.value) == null ? void 0 : k.selectedVariant) == null ? void 0 : A.itemId) !== _) {
        d.value = !0, c.value = await Rn.getProduct({
          ...v.product,
          itemId: _
        });
        const L = vr.getQueryParamFromString(
          window.location.search,
          "cartItemId"
        );
        typeof L < "u" && ((x = c.value) == null || x.loadCartItem(L)), (M = c.value) == null || M.selectVariant(_), await m(), ($ = c.value) == null || $.selectVariant(_);
      }
    }, I = async (_ = !1) => {
      var k, A, x, M, $, L, F, V, q;
      try {
        if (!((k = c.value) != null && k.isTimeslotsAreSelected) && r.value)
          return r.value.openTimeslotPicker(), !1;
        if (!((A = c.value) != null && A.isVisitorsAreSelected) && o.value)
          return o.value.open(), !1;
        if (!((x = c.value) != null && x.isMealsCountEqualsVisitorsCount) && a.value)
          return a.value.open(), !1;
        const B = (M = c.value) != null && M.isEdit ? "toast.productHasBeenUpdated" : "toast.productHasBeenAdded";
        if (i.value = !0, await (($ = c.value) == null ? void 0 : $.addToCart()), u(g(B)), setTimeout(() => {
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
      } catch (B) {
        if (!(B instanceof It))
          return f();
        const Z = B.message;
        let ae = B.message;
        (typeof ((L = Z.errors[0]) == null ? void 0 : L.type) < "u" || typeof ((F = Z.errors[0]) == null ? void 0 : F.code) < "u") && (ae = ((V = Z.errors[0]) == null ? void 0 : V.type) || ((q = Z.errors[0]) == null ? void 0 : q.code), ae = g(`THError.${ae}`)), f(ae, 1e4);
      } finally {
        i.value = !1;
      }
    };
    return (_, k) => {
      var A, x;
      return d.value ? (U(), ue(OS, {
        key: 0,
        class: "th-product__options"
      })) : (U(), X("div", GI, [
        c.value !== null && !c.value.isDisabled ? (U(), X(Oe, { key: 0 }, [
          z("div", XI, [
            !c.value.isDisabled && c.value.isHasVariants && c.value.selectedVariant ? (U(), ue(Iu, {
              key: 0,
              "selected-variant": c.value.selectedVariant,
              variants: c.value.variants,
              onSelectVariant: C
            }, null, 8, ["selected-variant", "variants"])) : se("", !0),
            c.value && !c.value.isOpen ? (U(), ue(Ws, {
              key: 1,
              ref_key: "calendarElement",
              ref: r,
              "is-upsell": v.upsell,
              product: c.value
            }, null, 8, ["is-upsell", "product"])) : se("", !0),
            c.value ? (U(), ue(Wu, {
              key: 2,
              ref_key: "visitorsElement",
              ref: o,
              disabled: !S.value,
              product: c.value
            }, null, 8, ["disabled", "product"])) : se("", !0),
            c.value && !c.value.isDisabled && c.value.hasOptions ? (U(), ue(_S, {
              key: 3,
              ref_key: "mealsElement",
              ref: a,
              disabled: !E.value,
              product: c.value
            }, null, 8, ["disabled", "product"])) : se("", !0)
          ]),
          z("div", KI, [
            v.hidePrices ? se("", !0) : (U(), X("div", JI, [
              z("span", ZI, oe(W(n)(v.product.title, W(h))), 1),
              z("div", QI, [
                c.value && c.value.hasDynamicPrices ? (U(), X("span", eO, oe(W(g)("booking.from")), 1)) : se("", !0),
                c.value && c.value.oldPrice ? (U(), X("div", tO, [
                  G(lt, {
                    amount: c.value.calculatedOldPrice
                  }, null, 8, ["amount"])
                ])) : se("", !0),
                z("div", nO, [
                  c.value ? (U(), ue(lt, {
                    key: 0,
                    amount: c.value.price
                  }, null, 8, ["amount"])) : se("", !0)
                ])
              ])
            ])),
            z("div", rO, [
              c.value && c.value.isEdit ? (U(), ue(nt, {
                key: 0,
                disabled: i.value,
                loading: i.value,
                bg: "accent",
                class: "th-product__actions-button",
                type: "button",
                onClick: k[0] || (k[0] = (M) => I(!1))
              }, {
                default: we(() => [
                  qe(oe(W(g)("booking.update")), 1)
                ]),
                _: 1
              }, 8, ["disabled", "loading"])) : c.value ? (U(), X(Oe, { key: 1 }, [
                G(nt, {
                  disabled: i.value,
                  loading: i.value,
                  class: "th-product__actions-button",
                  type: "button",
                  onClick: k[1] || (k[1] = (M) => I(!1))
                }, {
                  default: we(() => [
                    qe(oe(W(g)("booking.addToCart")), 1)
                  ]),
                  _: 1
                }, 8, ["disabled", "loading"]),
                v.hideBookNowButton ? se("", !0) : (U(), ue(nt, {
                  key: 0,
                  disabled: i.value,
                  loading: i.value,
                  bg: "accent",
                  class: "th-product__actions-button",
                  type: "button",
                  onClick: k[2] || (k[2] = (M) => I(!0))
                }, {
                  default: we(() => [
                    qe(oe(W(g)("booking.bookNow")), 1)
                  ]),
                  _: 1
                }, 8, ["disabled", "loading"]))
              ], 64)) : se("", !0)
            ])
          ])
        ], 64)) : c.value ? (U(), X(Oe, { key: 1 }, [
          z("div", oO, [
            c.value.isHasVariants && c.value.selectedVariant ? (U(), ue(Iu, {
              key: 0,
              "selected-variant": c.value.selectedVariant,
              variants: c.value.variants,
              onSelectVariant: C
            }, null, 8, ["selected-variant", "variants"])) : se("", !0),
            G(Ws, {
              "is-active": !1,
              product: c.value,
              upsell: v.upsell
            }, null, 8, ["product", "upsell"]),
            c.value ? (U(), ue(Wu, {
              key: 1,
              disabled: !S.value,
              "is-active": !1,
              product: c.value
            }, null, 8, ["disabled", "product"])) : se("", !0)
          ]),
          z("div", aO, [
            z("div", iO, [
              z("span", sO, oe(W(n)(v.product.title, W(h))), 1),
              v.hidePrices ? se("", !0) : (U(), X("div", lO, [
                c.value && c.value.hasDynamicPrices ? (U(), X("span", cO, oe(W(g)("booking.from")), 1)) : se("", !0),
                v.product.oldPrice ? (U(), X("div", uO, [
                  c.value ? (U(), ue(lt, {
                    key: 0,
                    amount: c.value.calculatedOldPrice
                  }, null, 8, ["amount"])) : se("", !0)
                ])) : se("", !0),
                z("div", dO, [
                  c.value ? (U(), ue(lt, {
                    key: 0,
                    amount: c.value.price
                  }, null, 8, ["amount"])) : se("", !0)
                ])
              ]))
            ]),
            z("div", fO, [
              G(nt, {
                disabled: !0,
                bg: "black",
                class: "th-product__actions-button"
              }, {
                default: we(() => [
                  qe(oe(W(g)("booking.unavailable")), 1)
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
        }, null, 8, pO)) : se("", !0)
      ]));
    };
  }
}), hO = /* @__PURE__ */ ge(mO, [["__scopeId", "data-v-05f92300"]]), vO = { class: "th-product" }, gO = { class: "th-product__title" }, yO = /* @__PURE__ */ me({
  __name: "AddToCart",
  props: {
    product: {},
    quickBuy: { type: Boolean, default: !1 }
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const { localizedTitle: n } = Ao, { locale: r } = Pe();
    rt(() => {
      o.quickBuy && d();
    });
    const o = e, a = t, i = Q(!1), l = Q(null), s = xn();
    Jr(() => {
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
        om(l.value, {
          useGlobalLockState: !0,
          overflowType: "clip"
        });
      }, 0);
    }, v = () => {
      i.value = !1, am(l.value, {
        useGlobalLockState: !0,
        overflowType: "clip"
      });
    };
    return Ne(
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
      o.quickBuy || W(s).isOpen ? (U(), ue(tm, {
        key: 0,
        class: "th-product-modal__close-btn",
        type: "button",
        onClick: f
      })) : se("", !0),
      z("form", vO, [
        o.product.duration || o.product.rating ? (U(), ue(Tm, {
          key: 0,
          "bookings-count": o.product.bookingsCount,
          duration: o.product.duration,
          rating: o.product.rating,
          class: "th-product__meta"
        }, null, 8, ["bookings-count", "duration", "rating"])) : se("", !0),
        z("h1", gO, oe(W(n)(o.product.title, W(r))), 1),
        G(hO, {
          product: p.product,
          onBooked: c,
          onLoaded: u
        }, null, 8, ["product"])
      ])
    ], 2));
  }
}), _O = /* @__PURE__ */ ge(yO, [["__scopeId", "data-v-fcda4023"]]), bO = { class: "th-default" }, ql = /* @__PURE__ */ me({
  __name: "ProductComponent",
  props: {
    product: {},
    quickBuy: { type: Boolean, default: !1 }
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = e, r = t;
    return (o, a) => (U(), X("div", bO, [
      G(_O, {
        product: n.product,
        "quick-buy": n.quickBuy,
        onClose: a[0] || (a[0] = (i) => r("close"))
      }, null, 8, ["product", "quick-buy"])
    ]));
  }
}), EO = {
  key: 0,
  class: "th-modal th-modal_quick-buy"
}, wO = { class: "th-modal__wrapper" }, CO = /* @__PURE__ */ me({
  __name: "QuickBuyModal",
  setup(e) {
    const t = xn(), n = () => {
      t.setQuickBuyProduct();
    }, r = (a) => {
      a.code === "Escape" && a.isTrusted && n();
    }, o = te(() => t.quickBuyProduct);
    return Ne(o, (a) => {
      setTimeout(() => {
        if (a) {
          window.addEventListener("keydown", r, { passive: !0 }), window.dispatchEvent(new CustomEvent("th:quickBuyModalIsOpen"));
          return;
        }
        window.history.pushState({}, document.title, window.location.pathname), window.removeEventListener("keydown", r), window.dispatchEvent(new CustomEvent("th:quickBuyModalIsClose"));
      }, 0);
    }), (a, i) => o.value ? (U(), X("div", EO, [
      z("div", {
        class: "th-modal__backdrop",
        onClick: n
      }),
      z("div", wO, [
        o.value ? (U(), ue(ql, {
          key: 0,
          product: o.value,
          "quick-buy": !0,
          onClose: n
        }, null, 8, ["product"])) : se("", !0)
      ])
    ])) : se("", !0);
  }
}), TO = /* @__PURE__ */ ge(CO, [["__scopeId", "data-v-11dfbb8e"]]);
var hd = function(e, t, n) {
  if (!t.hasOwnProperty(n)) {
    var r = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(t, n, r);
  }
};
const SO = { props: { template: String, parent: Object, templateProps: { type: Object, default: function() {
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
    Object.keys(t).forEach(function(E) {
      l[E] === void 0 && (v.$data[E] = t[E]);
    }), Object.keys(n).forEach(function(E) {
      s[E] === void 0 && (v.$props[E] = n[E]);
    }), Object.keys(i).forEach(function(E) {
      u[E] === void 0 && (v.methods[E] = i[E]);
    }), Object.keys(a).forEach(function(E) {
      f[E] === void 0 && (v.computed[E] = a[E]);
    }), Object.keys(o).forEach(function(E) {
      d[E] === void 0 && (v.components[E] = o[E]);
    });
    var p = Object.keys(v.methods || {}), g = Object.keys(v.$data || {}), h = Object.keys(v.$props || {}), m = Object.keys(this.templateProps), y = g.concat(h).concat(p).concat(m), b = (N = e, S = {}, p.forEach(function(E) {
      return hd(N, S, E);
    }), S), O = function(E) {
      var C = {};
      return E.forEach(function(I) {
        I && Object.getOwnPropertyNames(I).forEach(function(_) {
          return hd(I, C, _);
        });
      }), C;
    }([v.$data, v.$props, b, this.templateProps]);
    return dr({ template: this.template || "<div></div>", props: y, computed: v.computed, components: v.components, provide: this.$parent.$.provides ? this.$parent.$.provides : {} }, Object.assign({}, O));
  }
  var N, S;
} }, wh = /* @__PURE__ */ me({
  __name: "CartButton",
  setup(e) {
    const t = hi();
    return (n, r) => (U(), X("button", {
      class: "th-cart__btn",
      type: "button",
      onClick: r[0] || (r[0] = //@ts-ignore
      (...o) => W(t).toggle && W(t).toggle(...o))
    }, [
      Yn(n.$slots, "default")
    ]));
  }
}), kO = ["data-count"], Ch = /* @__PURE__ */ me({
  __name: "CartCount",
  setup(e) {
    const t = ut();
    return (n, r) => (U(), X("span", {
      "data-count": W(t).count,
      class: "th-cart__items-count"
    }, oe(W(t).count), 9, kO));
  }
}), IO = { class: "th-default" }, Th = /* @__PURE__ */ me({
  __name: "BookButton",
  setup(e) {
    const { productIsAvailable: t, productIsLoading: n } = Io(
      xn()
    ), { open: r } = xn(), { t: o } = Pe(), a = wm(), i = te(() => !!a.query.cartItemId), l = te(() => t.value ? i.value ? o("booking.update") : o("booking.bookNow") : o("booking.unavailable"));
    return (s, c) => (U(), X("div", IO, [
      G(nt, {
        bg: W(t) ? "accent" : "black",
        disabled: !W(t) || W(n),
        loading: W(n),
        class: "th-up-lg:hidden",
        type: "button",
        wide: "",
        onClick: W(r)
      }, {
        default: we(() => [
          qe(oe(l.value), 1)
        ]),
        _: 1
      }, 8, ["bg", "disabled", "loading", "onClick"])
    ]));
  }
}), OO = {
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
    VRuntimeTemplate: SO,
    ThCartButton: wh,
    // eslint-disable-line
    ThCartCount: Ch,
    // eslint-disable-line
    ThProduct: ql,
    // eslint-disable-line
    ThBookButton: Th,
    // eslint-disable-line
    ThPrice: lt
    // eslint-disable-line
  }
};
function PO(e, t, n, r, o, a) {
  const i = ef("v-runtime-template");
  return U(), ue(i, { template: e.template }, null, 8, ["template"]);
}
const Sh = /* @__PURE__ */ ge(OO, [["render", PO]]), kh = (e, t) => {
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
      n[o] = kh(
        e[o],
        t[o]
      );
      return;
    }
    n[o] = t[o] ?? e[o];
  }), n;
};
function vd(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function DO(e, t, n) {
  return t && vd(e.prototype, t), n && vd(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
/*!
 * Splide.js
 * Version  : 4.1.4
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
var gd = "(prefers-reduced-motion: reduce)", Mr = 1, AO = 2, Xr = 3, ao = 4, Qo = 5, $a = 6, ti = 7, $O = {
  CREATED: Mr,
  MOUNTED: AO,
  IDLE: Xr,
  MOVING: ao,
  SCROLLING: Qo,
  DRAGGING: $a,
  DESTROYED: ti
};
function hn(e) {
  e.length = 0;
}
function Kn(e, t, n) {
  return Array.prototype.slice.call(e, t, n);
}
function $e(e) {
  return e.bind.apply(e, [null].concat(Kn(arguments, 1)));
}
var Ih = setTimeout, Qs = function() {
};
function yd(e) {
  return requestAnimationFrame(e);
}
function Oi(e, t) {
  return typeof t === e;
}
function Ro(e) {
  return !Xl(e) && Oi("object", e);
}
var Gl = Array.isArray, Oh = $e(Oi, "function"), Vn = $e(Oi, "string"), ea = $e(Oi, "undefined");
function Xl(e) {
  return e === null;
}
function Ph(e) {
  try {
    return e instanceof (e.ownerDocument.defaultView || window).HTMLElement;
  } catch {
    return !1;
  }
}
function ta(e) {
  return Gl(e) ? e : [e];
}
function Nt(e, t) {
  ta(e).forEach(t);
}
function Kl(e, t) {
  return e.indexOf(t) > -1;
}
function Na(e, t) {
  return e.push.apply(e, ta(t)), e;
}
function cn(e, t, n) {
  e && Nt(t, function(r) {
    r && e.classList[n ? "add" : "remove"](r);
  });
}
function qt(e, t) {
  cn(e, Vn(t) ? t.split(" ") : t, !0);
}
function na(e, t) {
  Nt(t, e.appendChild.bind(e));
}
function Jl(e, t) {
  Nt(e, function(n) {
    var r = (t || n).parentNode;
    r && r.insertBefore(n, t);
  });
}
function Mo(e, t) {
  return Ph(e) && (e.msMatchesSelector || e.matches).call(e, t);
}
function Dh(e, t) {
  var n = e ? Kn(e.children) : [];
  return t ? n.filter(function(r) {
    return Mo(r, t);
  }) : n;
}
function ra(e, t) {
  return t ? Dh(e, t)[0] : e.firstElementChild;
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
function Dn(e) {
  return Kn(arguments, 1).forEach(function(t) {
    cr(t, function(n, r) {
      Gl(n) ? e[r] = n.slice() : Ro(n) ? e[r] = Dn({}, Ro(e[r]) ? e[r] : {}, n) : e[r] = n;
    });
  }), e;
}
function _d(e, t) {
  Nt(t || xo(e), function(n) {
    delete e[n];
  });
}
function Gt(e, t) {
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
    Xl(n) || n === "" ? Gt(r, t) : r.setAttribute(t, String(n));
  });
}
function Vr(e, t, n) {
  var r = document.createElement(e);
  return t && (Vn(t) ? qt(r, t) : ye(r, t)), n && na(n, r), r;
}
function Rt(e, t, n) {
  if (ea(n))
    return getComputedStyle(e)[t];
  Xl(n) || (e.style[t] = "" + n);
}
function Vo(e, t) {
  Rt(e, "display", t);
}
function Ah(e) {
  e.setActive && e.setActive() || e.focus({
    preventScroll: !0
  });
}
function Mt(e, t) {
  return e.getAttribute(t);
}
function bd(e, t) {
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
function $h(e) {
  return ra(new DOMParser().parseFromString(e, "text/html").body);
}
function on(e, t) {
  e.preventDefault(), t && (e.stopPropagation(), e.stopImmediatePropagation());
}
function Nh(e, t) {
  return e && e.querySelector(t);
}
function Zl(e, t) {
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
var oa = "splide", Ql = "data-" + oa;
function To(e, t) {
  if (!e)
    throw new Error("[" + oa + "] " + (t || ""));
}
var Un = Math.min, ni = Math.max, ri = Math.floor, Uo = Math.ceil, yt = Math.abs;
function Lh(e, t, n) {
  return yt(e - t) < n;
}
function La(e, t, n, r) {
  var o = Un(t, n), a = ni(t, n);
  return r ? o < e && e < a : o <= e && e <= a;
}
function Ar(e, t, n) {
  var r = Un(t, n), o = ni(t, n);
  return Un(ni(r, e), o);
}
function tl(e) {
  return +(e > 0) - +(e < 0);
}
function nl(e, t) {
  return Nt(t, function(n) {
    e = e.replace("%s", "" + n);
  }), e;
}
function ec(e) {
  return e < 10 ? "0" + e : "" + e;
}
var Ed = {};
function NO(e) {
  return "" + e + ec(Ed[e] = (Ed[e] || 0) + 1);
}
function Rh() {
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
    }), hn(e);
  }
  return {
    bind: t,
    unbind: n,
    dispatch: r,
    destroy: a
  };
}
var br = "mounted", wd = "ready", Fn = "move", aa = "moved", Mh = "click", LO = "active", RO = "inactive", MO = "visible", xO = "hidden", Ke = "refresh", bt = "updated", Fo = "resize", tc = "resized", BO = "drag", VO = "dragging", UO = "dragged", nc = "scroll", io = "scrolled", FO = "overflow", xh = "destroy", HO = "arrows:mounted", YO = "arrows:updated", jO = "pagination:mounted", WO = "pagination:updated", Bh = "navigation:mounted", Vh = "autoplay:play", zO = "autoplay:playing", Uh = "autoplay:pause", Fh = "lazyload:loaded", Hh = "sk", Yh = "sh", oi = "ei";
function Ve(e) {
  var t = e ? e.event.bus : document.createDocumentFragment(), n = Rh();
  function r(a, i) {
    n.bind(t, ta(a).join(" "), function(l) {
      i.apply(i, Gl(l.detail) ? l.detail : []);
    });
  }
  function o(a) {
    n.dispatch(t, a, Kn(arguments, 1));
  }
  return e && e.event.on(xh, n.destroy), Bo(n, {
    bus: t,
    on: r,
    off: $e(n.unbind, t),
    emit: o
  });
}
function Pi(e, t, n, r) {
  var o = Date.now, a, i = 0, l, s = !0, c = 0;
  function u() {
    if (!s) {
      if (i = e ? Un((o() - a) / e, 1) : 1, n && n(i), i >= 1 && (t(), a = o(), r && ++c >= r))
        return d();
      l = yd(u);
    }
  }
  function f(m) {
    m || p(), a = o() - (m ? i * e : 0), s = !1, l = yd(u);
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
  function g(m) {
    e = m;
  }
  function h() {
    return s;
  }
  return {
    start: f,
    rewind: v,
    pause: d,
    cancel: p,
    set: g,
    isPaused: h
  };
}
function qO(e) {
  var t = e;
  function n(o) {
    t = o;
  }
  function r(o) {
    return Kl(ta(o), t);
  }
  return {
    set: n,
    is: r
  };
}
function GO(e, t) {
  var n = Pi(t || 0, e, null, 1);
  return function() {
    n.isPaused() && n.start();
  };
}
function XO(e, t, n) {
  var r = e.state, o = n.breakpoints || {}, a = n.reducedMotion || {}, i = Rh(), l = [];
  function s() {
    var p = n.mediaQuery === "min";
    xo(o).sort(function(g, h) {
      return p ? +g - +h : +h - +g;
    }).forEach(function(g) {
      u(o[g], "(" + (p ? "min" : "max") + "-width:" + g + "px)");
    }), u(a, gd), f();
  }
  function c(p) {
    p && i.destroy();
  }
  function u(p, g) {
    var h = matchMedia(g);
    i.bind(h, "change", f), l.push([p, h]);
  }
  function f() {
    var p = r.is(ti), g = n.direction, h = l.reduce(function(m, y) {
      return Dn(m, y[1].matches ? y[0] : {});
    }, {});
    _d(n), v(h), n.destroy ? e.destroy(n.destroy === "completely") : p ? (c(!0), e.mount()) : g !== n.direction && e.refresh();
  }
  function d(p) {
    matchMedia(gd).matches && (p ? Dn(n, a) : _d(n, xo(a)));
  }
  function v(p, g, h) {
    Dn(n, p), g && Dn(Object.getPrototypeOf(n), p), (h || !r.is(Mr)) && e.emit(bt, n);
  }
  return {
    setup: s,
    destroy: c,
    reduce: d,
    set: v
  };
}
var Di = "Arrow", Ai = Di + "Left", $i = Di + "Right", jh = Di + "Up", Wh = Di + "Down", Cd = "rtl", Ni = "ttb", fs = {
  width: ["height"],
  left: ["top", "right"],
  right: ["bottom", "left"],
  x: ["y"],
  X: ["Y"],
  Y: ["X"],
  ArrowLeft: [jh, $i],
  ArrowRight: [Wh, Ai]
};
function KO(e, t, n) {
  function r(a, i, l) {
    l = l || n.direction;
    var s = l === Cd && !i ? 1 : l === Ni ? 0 : -1;
    return fs[a] && fs[a][s] || a.replace(/width|left|right/i, function(c, u) {
      var f = fs[c.toLowerCase()][s] || c;
      return u > 0 ? f.charAt(0).toUpperCase() + f.slice(1) : f;
    });
  }
  function o(a) {
    return a * (n.direction === Cd ? 1 : -1);
  }
  return {
    resolve: r,
    orient: o
  };
}
var fn = "role", Ur = "tabindex", JO = "disabled", Bt = "aria-", ia = Bt + "controls", zh = Bt + "current", Td = Bt + "selected", Pt = Bt + "label", rc = Bt + "labelledby", qh = Bt + "hidden", oc = Bt + "orientation", Ho = Bt + "roledescription", Sd = Bt + "live", kd = Bt + "busy", Id = Bt + "atomic", ac = [fn, Ur, JO, ia, zh, Pt, rc, qh, oc, Ho], Jt = oa + "__", Jn = "is-", ps = oa, Od = Jt + "track", ZO = Jt + "list", Li = Jt + "slide", Gh = Li + "--clone", QO = Li + "__container", ic = Jt + "arrows", Ri = Jt + "arrow", Xh = Ri + "--prev", Kh = Ri + "--next", Mi = Jt + "pagination", Jh = Mi + "__page", eP = Jt + "progress", tP = eP + "__bar", nP = Jt + "toggle", rP = Jt + "spinner", oP = Jt + "sr", aP = Jn + "initialized", yr = Jn + "active", Zh = Jn + "prev", Qh = Jn + "next", rl = Jn + "visible", ol = Jn + "loading", ev = Jn + "focus-in", tv = Jn + "overflow", iP = [yr, rl, Zh, Qh, ol, ev, tv], sP = {
  slide: Li,
  clone: Gh,
  arrows: ic,
  arrow: Ri,
  prev: Xh,
  next: Kh,
  pagination: Mi,
  page: Jh,
  spinner: rP
};
function lP(e, t) {
  if (Oh(e.closest))
    return e.closest(t);
  for (var n = e; n && n.nodeType === 1 && !Mo(n, t); )
    n = n.parentElement;
  return n;
}
var cP = 5, Pd = 200, nv = "touchstart mousedown", ms = "touchmove mousemove", hs = "touchend touchcancel mouseup click";
function uP(e, t, n) {
  var r = Ve(e), o = r.on, a = r.bind, i = e.root, l = n.i18n, s = {}, c = [], u = [], f = [], d, v, p;
  function g() {
    b(), O(), y();
  }
  function h() {
    o(Ke, m), o(Ke, g), o(bt, y), a(document, nv + " keydown", function(E) {
      p = E.type === "keydown";
    }, {
      capture: !0
    }), a(i, "focusin", function() {
      cn(i, ev, !!p);
    });
  }
  function m(E) {
    var C = ac.concat("style");
    hn(c), un(i, u), un(d, f), Gt([d, v], C), Gt(i, E ? C : ["style", Ho]);
  }
  function y() {
    un(i, u), un(d, f), u = S(ps), f = S(Od), qt(i, u), qt(d, f), ye(i, Pt, n.label), ye(i, rc, n.labelledby);
  }
  function b() {
    d = N("." + Od), v = ra(d, "." + ZO), To(d && v, "A track/list element is missing."), Na(c, Dh(v, "." + Li + ":not(." + Gh + ")")), cr({
      arrows: ic,
      pagination: Mi,
      prev: Xh,
      next: Kh,
      bar: tP,
      toggle: nP
    }, function(E, C) {
      s[C] = N("." + E);
    }), Bo(s, {
      root: i,
      track: d,
      list: v,
      slides: c
    });
  }
  function O() {
    var E = i.id || NO(oa), C = n.role;
    i.id = E, d.id = d.id || E + "-track", v.id = v.id || E + "-list", !Mt(i, fn) && i.tagName !== "SECTION" && C && ye(i, fn, C), ye(i, Ho, l.carousel), ye(v, fn, "presentation");
  }
  function N(E) {
    var C = Nh(i, E);
    return C && lP(C, "." + ps) === i ? C : void 0;
  }
  function S(E) {
    return [E + "--" + n.type, E + "--" + n.direction, n.drag && E + "--draggable", n.isNavigation && E + "--nav", E === ps && yr];
  }
  return Bo(s, {
    setup: g,
    mount: h,
    destroy: m
  });
}
var Kr = "slide", so = "loop", sa = "fade";
function dP(e, t, n, r) {
  var o = Ve(e), a = o.on, i = o.emit, l = o.bind, s = e.Components, c = e.root, u = e.options, f = u.isNavigation, d = u.updateOnMove, v = u.i18n, p = u.pagination, g = u.slideFocus, h = s.Direction.resolve, m = Mt(r, "style"), y = Mt(r, Pt), b = n > -1, O = ra(r, "." + QO), N;
  function S() {
    b || (r.id = c.id + "-slide" + ec(t + 1), ye(r, fn, p ? "tabpanel" : "group"), ye(r, Ho, v.slide), ye(r, Pt, y || nl(v.slideLabel, [t + 1, e.length]))), E();
  }
  function E() {
    l(r, "click", $e(i, Mh, V)), l(r, "keydown", $e(i, Hh, V)), a([aa, Yh, io], k), a(Bh, I), d && a(Fn, _);
  }
  function C() {
    N = !0, o.destroy(), un(r, iP), Gt(r, ac), ye(r, "style", m), ye(r, Pt, y || "");
  }
  function I() {
    var q = e.splides.map(function(B) {
      var Z = B.splide.Components.Slides.getAt(t);
      return Z ? Z.slide.id : "";
    }).join(" ");
    ye(r, Pt, nl(v.slideX, (b ? n : t) + 1)), ye(r, ia, q), ye(r, fn, g ? "button" : ""), g && Gt(r, Ho);
  }
  function _() {
    N || k();
  }
  function k() {
    if (!N) {
      var q = e.index;
      A(), x(), cn(r, Zh, t === q - 1), cn(r, Qh, t === q + 1);
    }
  }
  function A() {
    var q = $();
    q !== bd(r, yr) && (cn(r, yr, q), ye(r, zh, f && q || ""), i(q ? LO : RO, V));
  }
  function x() {
    var q = L(), B = !q && (!$() || b);
    if (e.state.is([ao, Qo]) || ye(r, qh, B || ""), ye(Zl(r, u.focusableNodes || ""), Ur, B ? -1 : ""), g && ye(r, Ur, B ? -1 : 0), q !== bd(r, rl) && (cn(r, rl, q), i(q ? MO : xO, V)), !q && document.activeElement === r) {
      var Z = s.Slides.getAt(e.index);
      Z && Ah(Z.slide);
    }
  }
  function M(q, B, Z) {
    Rt(Z && O || r, q, B);
  }
  function $() {
    var q = e.index;
    return q === t || u.cloneStatus && q === n;
  }
  function L() {
    if (e.is(sa))
      return $();
    var q = Ot(s.Elements.track), B = Ot(r), Z = h("left", !0), ae = h("right", !0);
    return ri(q[Z]) <= Uo(B[Z]) && ri(B[ae]) <= Uo(q[ae]);
  }
  function F(q, B) {
    var Z = yt(q - t);
    return !b && (u.rewind || e.is(so)) && (Z = Un(Z, e.length - Z)), Z <= B;
  }
  var V = {
    index: t,
    slideIndex: n,
    slide: r,
    container: O,
    isClone: b,
    mount: S,
    destroy: C,
    update: k,
    style: M,
    isWithin: F
  };
  return V;
}
function fP(e, t, n) {
  var r = Ve(e), o = r.on, a = r.emit, i = r.bind, l = t.Elements, s = l.slides, c = l.list, u = [];
  function f() {
    d(), o(Ke, v), o(Ke, d);
  }
  function d() {
    s.forEach(function(k, A) {
      g(k, A, -1);
    });
  }
  function v() {
    N(function(k) {
      k.destroy();
    }), hn(u);
  }
  function p() {
    N(function(k) {
      k.update();
    });
  }
  function g(k, A, x) {
    var M = dP(e, A, x, k);
    M.mount(), u.push(M), u.sort(function($, L) {
      return $.index - L.index;
    });
  }
  function h(k) {
    return k ? S(function(A) {
      return !A.isClone;
    }) : u;
  }
  function m(k) {
    var A = t.Controller, x = A.toIndex(k), M = A.hasFocus() ? 1 : n.perPage;
    return S(function($) {
      return La($.index, x, x + M - 1);
    });
  }
  function y(k) {
    return S(k)[0];
  }
  function b(k, A) {
    Nt(k, function(x) {
      if (Vn(x) && (x = $h(x)), Ph(x)) {
        var M = s[A];
        M ? Jl(x, M) : na(c, x), qt(x, n.classes.slide), C(x, $e(a, Fo));
      }
    }), a(Ke);
  }
  function O(k) {
    gr(S(k).map(function(A) {
      return A.slide;
    })), a(Ke);
  }
  function N(k, A) {
    h(A).forEach(k);
  }
  function S(k) {
    return u.filter(Oh(k) ? k : function(A) {
      return Vn(k) ? Mo(A.slide, k) : Kl(ta(k), A.index);
    });
  }
  function E(k, A, x) {
    N(function(M) {
      M.style(k, A, x);
    });
  }
  function C(k, A) {
    var x = Zl(k, "img"), M = x.length;
    M ? x.forEach(function($) {
      i($, "load error", function() {
        --M || A();
      });
    }) : A();
  }
  function I(k) {
    return k ? s.length : u.length;
  }
  function _() {
    return u.length > n.perPage;
  }
  return {
    mount: f,
    destroy: v,
    update: p,
    register: g,
    get: h,
    getIn: m,
    getAt: y,
    add: b,
    remove: O,
    forEach: N,
    filter: S,
    style: E,
    getLength: I,
    isEnough: _
  };
}
function pP(e, t, n) {
  var r = Ve(e), o = r.on, a = r.bind, i = r.emit, l = t.Slides, s = t.Direction.resolve, c = t.Elements, u = c.root, f = c.track, d = c.list, v = l.getAt, p = l.style, g, h, m;
  function y() {
    b(), a(window, "resize load", GO($e(i, Fo))), o([bt, Ke], b), o(Fo, O);
  }
  function b() {
    g = n.direction === Ni, Rt(u, "maxWidth", er(n.width)), Rt(f, s("paddingLeft"), N(!1)), Rt(f, s("paddingRight"), N(!0)), O(!0);
  }
  function O(V) {
    var q = Ot(u);
    (V || h.width !== q.width || h.height !== q.height) && (Rt(f, "height", S()), p(s("marginRight"), er(n.gap)), p("width", C()), p("height", I(), !0), h = q, i(tc), m !== (m = F()) && (cn(u, tv, m), i(FO, m)));
  }
  function N(V) {
    var q = n.padding, B = s(V ? "right" : "left");
    return q && er(q[B] || (Ro(q) ? 0 : q)) || "0px";
  }
  function S() {
    var V = "";
    return g && (V = E(), To(V, "height or heightRatio is missing."), V = "calc(" + V + " - " + N(!1) + " - " + N(!0) + ")"), V;
  }
  function E() {
    return er(n.height || Ot(d).width * n.heightRatio);
  }
  function C() {
    return n.autoWidth ? null : er(n.fixedWidth) || (g ? "" : _());
  }
  function I() {
    return er(n.fixedHeight) || (g ? n.autoHeight ? null : _() : E());
  }
  function _() {
    var V = er(n.gap);
    return "calc((100%" + (V && " + " + V) + ")/" + (n.perPage || 1) + (V && " - " + V) + ")";
  }
  function k() {
    return Ot(d)[s("width")];
  }
  function A(V, q) {
    var B = v(V || 0);
    return B ? Ot(B.slide)[s("width")] + (q ? 0 : $()) : 0;
  }
  function x(V, q) {
    var B = v(V);
    if (B) {
      var Z = Ot(B.slide)[s("right")], ae = Ot(d)[s("left")];
      return yt(Z - ae) + (q ? 0 : $());
    }
    return 0;
  }
  function M(V) {
    return x(e.length - 1) - x(0) + A(0, V);
  }
  function $() {
    var V = v(0);
    return V && parseFloat(Rt(V.slide, s("marginRight"))) || 0;
  }
  function L(V) {
    return parseFloat(Rt(f, s("padding" + (V ? "Right" : "Left")))) || 0;
  }
  function F() {
    return e.is(sa) || M(!0) > k();
  }
  return {
    mount: y,
    resize: O,
    listSize: k,
    slideSize: A,
    sliderSize: M,
    totalSize: x,
    getPadding: L,
    isOverflow: F
  };
}
var mP = 2;
function hP(e, t, n) {
  var r = Ve(e), o = r.on, a = t.Elements, i = t.Slides, l = t.Direction.resolve, s = [], c;
  function u() {
    o(Ke, f), o([bt, Fo], v), (c = h()) && (p(c), t.Layout.resize(!0));
  }
  function f() {
    d(), u();
  }
  function d() {
    gr(s), hn(s), r.destroy();
  }
  function v() {
    var m = h();
    c !== m && (c < m || !m) && r.emit(Ke);
  }
  function p(m) {
    var y = i.get().slice(), b = y.length;
    if (b) {
      for (; y.length < m; )
        Na(y, y);
      Na(y.slice(-m), y.slice(0, m)).forEach(function(O, N) {
        var S = N < m, E = g(O.slide, N);
        S ? Jl(E, y[0].slide) : na(a.list, E), Na(s, E), i.register(E, N - m + (S ? 0 : b), O.index);
      });
    }
  }
  function g(m, y) {
    var b = m.cloneNode(!0);
    return qt(b, n.classes.clone), b.id = e.root.id + "-clone" + ec(y + 1), b;
  }
  function h() {
    var m = n.clones;
    if (!e.is(so))
      m = 0;
    else if (ea(m)) {
      var y = n[l("fixedWidth")] && t.Layout.slideSize(0), b = y && Uo(Ot(a.track)[l("width")] / y);
      m = b || n[l("autoWidth")] && e.length || n.perPage * mP;
    }
    return m;
  }
  return {
    mount: u,
    destroy: d
  };
}
function vP(e, t, n) {
  var r = Ve(e), o = r.on, a = r.emit, i = e.state.set, l = t.Layout, s = l.slideSize, c = l.getPadding, u = l.totalSize, f = l.listSize, d = l.sliderSize, v = t.Direction, p = v.resolve, g = v.orient, h = t.Elements, m = h.list, y = h.track, b;
  function O() {
    b = t.Transition, o([br, tc, bt, Ke], N);
  }
  function N() {
    t.Controller.isBusy() || (t.Scroll.cancel(), E(e.index), t.Slides.update());
  }
  function S(B, Z, ae, de) {
    B !== Z && V(B > ae) && (k(), C(_(M(), B > ae), !0)), i(ao), a(Fn, Z, ae, B), b.start(Z, function() {
      i(Xr), a(aa, Z, ae, B), de && de();
    });
  }
  function E(B) {
    C(x(B, !0));
  }
  function C(B, Z) {
    if (!e.is(sa)) {
      var ae = Z ? B : I(B);
      Rt(m, "transform", "translate" + p("X") + "(" + ae + "px)"), B !== ae && a(Yh);
    }
  }
  function I(B) {
    if (e.is(so)) {
      var Z = A(B), ae = Z > t.Controller.getEnd(), de = Z < 0;
      (de || ae) && (B = _(B, ae));
    }
    return B;
  }
  function _(B, Z) {
    var ae = B - F(Z), de = d();
    return B -= g(de * (Uo(yt(ae) / de) || 1)) * (Z ? 1 : -1), B;
  }
  function k() {
    C(M(), !0), b.cancel();
  }
  function A(B) {
    for (var Z = t.Slides.get(), ae = 0, de = 1 / 0, he = 0; he < Z.length; he++) {
      var Se = Z[he].index, ne = yt(x(Se, !0) - B);
      if (ne <= de)
        de = ne, ae = Se;
      else
        break;
    }
    return ae;
  }
  function x(B, Z) {
    var ae = g(u(B - 1) - L(B));
    return Z ? $(ae) : ae;
  }
  function M() {
    var B = p("left");
    return Ot(m)[B] - Ot(y)[B] + g(c(!1));
  }
  function $(B) {
    return n.trimSpace && e.is(Kr) && (B = Ar(B, 0, g(d(!0) - f()))), B;
  }
  function L(B) {
    var Z = n.focus;
    return Z === "center" ? (f() - s(B, !0)) / 2 : +Z * s(B) || 0;
  }
  function F(B) {
    return x(B ? t.Controller.getEnd() : 0, !!n.trimSpace);
  }
  function V(B) {
    var Z = g(_(M(), B));
    return B ? Z >= 0 : Z <= m[p("scrollWidth")] - Ot(y)[p("width")];
  }
  function q(B, Z) {
    Z = ea(Z) ? M() : Z;
    var ae = B !== !0 && g(Z) < g(F(!1)), de = B !== !1 && g(Z) > g(F(!0));
    return ae || de;
  }
  return {
    mount: O,
    move: S,
    jump: E,
    translate: C,
    shift: _,
    cancel: k,
    toIndex: A,
    toPosition: x,
    getPosition: M,
    getLimit: F,
    exceededLimit: q,
    reposition: N
  };
}
function gP(e, t, n) {
  var r = Ve(e), o = r.on, a = r.emit, i = t.Move, l = i.getPosition, s = i.getLimit, c = i.toPosition, u = t.Slides, f = u.isEnough, d = u.getLength, v = n.omitEnd, p = e.is(so), g = e.is(Kr), h = $e(M, !1), m = $e(M, !0), y = n.start || 0, b, O = y, N, S, E;
  function C() {
    I(), o([bt, Ke, oi], I), o(tc, _);
  }
  function I() {
    N = d(!0), S = n.perMove, E = n.perPage, b = V();
    var ne = Ar(y, 0, v ? b : N - 1);
    ne !== y && (y = ne, i.reposition());
  }
  function _() {
    b !== V() && a(oi);
  }
  function k(ne, j, Y) {
    if (!Se()) {
      var w = x(ne), P = F(w);
      P > -1 && (j || P !== y) && (ae(P), i.move(w, P, O, Y));
    }
  }
  function A(ne, j, Y, w) {
    t.Scroll.scroll(ne, j, Y, function() {
      var P = F(i.toIndex(l()));
      ae(v ? Un(P, b) : P), w && w();
    });
  }
  function x(ne) {
    var j = y;
    if (Vn(ne)) {
      var Y = ne.match(/([+\-<>])(\d+)?/) || [], w = Y[1], P = Y[2];
      w === "+" || w === "-" ? j = $(y + +("" + w + (+P || 1)), y) : w === ">" ? j = P ? q(+P) : h(!0) : w === "<" && (j = m(!0));
    } else
      j = p ? ne : Ar(ne, 0, b);
    return j;
  }
  function M(ne, j) {
    var Y = S || (he() ? 1 : E), w = $(y + Y * (ne ? -1 : 1), y, !(S || he()));
    return w === -1 && g && !Lh(l(), s(!ne), 1) ? ne ? 0 : b : j ? w : F(w);
  }
  function $(ne, j, Y) {
    if (f() || he()) {
      var w = L(ne);
      w !== ne && (j = ne, ne = w, Y = !1), ne < 0 || ne > b ? !S && (La(0, ne, j, !0) || La(b, j, ne, !0)) ? ne = q(B(ne)) : p ? ne = Y ? ne < 0 ? -(N % E || E) : N : ne : n.rewind ? ne = ne < 0 ? b : 0 : ne = -1 : Y && ne !== j && (ne = q(B(j) + (ne < j ? -1 : 1)));
    } else
      ne = -1;
    return ne;
  }
  function L(ne) {
    if (g && n.trimSpace === "move" && ne !== y)
      for (var j = l(); j === c(ne, !0) && La(ne, 0, e.length - 1, !n.rewind); )
        ne < y ? --ne : ++ne;
    return ne;
  }
  function F(ne) {
    return p ? (ne + N) % N || 0 : ne;
  }
  function V() {
    for (var ne = N - (he() || p && S ? 1 : E); v && ne-- > 0; )
      if (c(N - 1, !0) !== c(ne, !0)) {
        ne++;
        break;
      }
    return Ar(ne, 0, N - 1);
  }
  function q(ne) {
    return Ar(he() ? ne : E * ne, 0, b);
  }
  function B(ne) {
    return he() ? Un(ne, b) : ri((ne >= b ? N - 1 : ne) / E);
  }
  function Z(ne) {
    var j = i.toIndex(ne);
    return g ? Ar(j, 0, b) : j;
  }
  function ae(ne) {
    ne !== y && (O = y, y = ne);
  }
  function de(ne) {
    return ne ? O : y;
  }
  function he() {
    return !ea(n.focus) || n.isNavigation;
  }
  function Se() {
    return e.state.is([ao, Qo]) && !!n.waitForTransition;
  }
  return {
    mount: C,
    go: k,
    scroll: A,
    getNext: h,
    getPrev: m,
    getAdjacent: M,
    getEnd: V,
    setIndex: ae,
    getIndex: de,
    toIndex: q,
    toPage: B,
    toDest: Z,
    hasFocus: he,
    isBusy: Se
  };
}
var yP = "http://www.w3.org/2000/svg", _P = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z", Ca = 40;
function bP(e, t, n) {
  var r = Ve(e), o = r.on, a = r.bind, i = r.emit, l = n.classes, s = n.i18n, c = t.Elements, u = t.Controller, f = c.arrows, d = c.track, v = f, p = c.prev, g = c.next, h, m, y = {};
  function b() {
    N(), o(bt, O);
  }
  function O() {
    S(), b();
  }
  function N() {
    var A = n.arrows;
    A && !(p && g) && I(), p && g && (Bo(y, {
      prev: p,
      next: g
    }), Vo(v, A ? "" : "none"), qt(v, m = ic + "--" + n.direction), A && (E(), k(), ye([p, g], ia, d.id), i(HO, p, g)));
  }
  function S() {
    r.destroy(), un(v, m), h ? (gr(f ? [p, g] : v), p = g = null) : Gt([p, g], ac);
  }
  function E() {
    o([br, aa, Ke, io, oi], k), a(g, "click", $e(C, ">")), a(p, "click", $e(C, "<"));
  }
  function C(A) {
    u.go(A, !0);
  }
  function I() {
    v = f || Vr("div", l.arrows), p = _(!0), g = _(!1), h = !0, na(v, [p, g]), !f && Jl(v, d);
  }
  function _(A) {
    var x = '<button class="' + l.arrow + " " + (A ? l.prev : l.next) + '" type="button"><svg xmlns="' + yP + '" viewBox="0 0 ' + Ca + " " + Ca + '" width="' + Ca + '" height="' + Ca + '" focusable="false"><path d="' + (n.arrowPath || _P) + '" />';
    return $h(x);
  }
  function k() {
    if (p && g) {
      var A = e.index, x = u.getPrev(), M = u.getNext(), $ = x > -1 && A < x ? s.last : s.prev, L = M > -1 && A > M ? s.first : s.next;
      p.disabled = x < 0, g.disabled = M < 0, ye(p, Pt, $), ye(g, Pt, L), i(YO, p, g, x, M);
    }
  }
  return {
    arrows: y,
    mount: b,
    destroy: S,
    update: k
  };
}
var EP = Ql + "-interval";
function wP(e, t, n) {
  var r = Ve(e), o = r.on, a = r.bind, i = r.emit, l = Pi(n.interval, e.go.bind(e, ">"), E), s = l.isPaused, c = t.Elements, u = t.Elements, f = u.root, d = u.toggle, v = n.autoplay, p, g, h = v === "pause";
  function m() {
    v && (y(), d && ye(d, ia, c.track.id), h || b(), S());
  }
  function y() {
    n.pauseOnHover && a(f, "mouseenter mouseleave", function(I) {
      p = I.type === "mouseenter", N();
    }), n.pauseOnFocus && a(f, "focusin focusout", function(I) {
      g = I.type === "focusin", N();
    }), d && a(d, "click", function() {
      h ? b() : O(!0);
    }), o([Fn, nc, Ke], l.rewind), o(Fn, C);
  }
  function b() {
    s() && t.Slides.isEnough() && (l.start(!n.resetProgress), g = p = h = !1, S(), i(Vh));
  }
  function O(I) {
    I === void 0 && (I = !0), h = !!I, S(), s() || (l.pause(), i(Uh));
  }
  function N() {
    h || (p || g ? O(!1) : b());
  }
  function S() {
    d && (cn(d, yr, !h), ye(d, Pt, n.i18n[h ? "play" : "pause"]));
  }
  function E(I) {
    var _ = c.bar;
    _ && Rt(_, "width", I * 100 + "%"), i(zO, I);
  }
  function C(I) {
    var _ = t.Slides.getAt(I);
    l.set(_ && +Mt(_.slide, EP) || n.interval);
  }
  return {
    mount: m,
    destroy: l.cancel,
    play: b,
    pause: O,
    isPaused: s
  };
}
function CP(e, t, n) {
  var r = Ve(e), o = r.on;
  function a() {
    n.cover && (o(Fh, $e(l, !0)), o([br, bt, Ke], $e(i, !0)));
  }
  function i(s) {
    t.Slides.forEach(function(c) {
      var u = ra(c.container || c.slide, "img");
      u && u.src && l(s, u, c);
    });
  }
  function l(s, c, u) {
    u.style("background", s ? 'center/cover no-repeat url("' + c.src + '")' : "", !0), Vo(c, s ? "none" : "");
  }
  return {
    mount: a,
    destroy: $e(i, !1)
  };
}
var TP = 10, SP = 600, kP = 0.6, IP = 1.5, OP = 800;
function PP(e, t, n) {
  var r = Ve(e), o = r.on, a = r.emit, i = e.state.set, l = t.Move, s = l.getPosition, c = l.getLimit, u = l.exceededLimit, f = l.translate, d = e.is(Kr), v, p, g = 1;
  function h() {
    o(Fn, O), o([bt, Ke], N);
  }
  function m(E, C, I, _, k) {
    var A = s();
    if (O(), I && (!d || !u())) {
      var x = t.Layout.sliderSize(), M = tl(E) * x * ri(yt(E) / x) || 0;
      E = l.toPosition(t.Controller.toDest(E % x)) + M;
    }
    var $ = Lh(A, E, 1);
    g = 1, C = $ ? 0 : C || ni(yt(E - A) / IP, OP), p = _, v = Pi(C, y, $e(b, A, E, k), 1), i(Qo), a(nc), v.start();
  }
  function y() {
    i(Xr), p && p(), a(io);
  }
  function b(E, C, I, _) {
    var k = s(), A = E + (C - E) * S(_), x = (A - k) * g;
    f(k + x), d && !I && u() && (g *= kP, yt(x) < TP && m(c(u(!0)), SP, !1, p, !0));
  }
  function O() {
    v && v.cancel();
  }
  function N() {
    v && !v.isPaused() && (O(), y());
  }
  function S(E) {
    var C = n.easingFunc;
    return C ? C(E) : 1 - Math.pow(1 - E, 4);
  }
  return {
    mount: h,
    destroy: O,
    scroll: m,
    cancel: N
  };
}
var $r = {
  passive: !1,
  capture: !0
};
function DP(e, t, n) {
  var r = Ve(e), o = r.on, a = r.emit, i = r.bind, l = r.unbind, s = e.state, c = t.Move, u = t.Scroll, f = t.Controller, d = t.Elements.track, v = t.Media.reduce, p = t.Direction, g = p.resolve, h = p.orient, m = c.getPosition, y = c.exceededLimit, b, O, N, S, E, C = !1, I, _, k;
  function A() {
    i(d, ms, Qs, $r), i(d, hs, Qs, $r), i(d, nv, M, $r), i(d, "click", F, {
      capture: !0
    }), i(d, "dragstart", on), o([br, bt], x);
  }
  function x() {
    var T = n.drag;
    K(!T), S = T === "free";
  }
  function M(T) {
    if (I = !1, !_) {
      var D = P(T);
      w(T.target) && (D || !T.button) && (f.isBusy() ? on(T, !0) : (k = D ? d : window, E = s.is([ao, Qo]), N = null, i(k, ms, $, $r), i(k, hs, L, $r), c.cancel(), u.cancel(), V(T)));
    }
  }
  function $(T) {
    if (s.is($a) || (s.set($a), a(BO)), T.cancelable)
      if (E) {
        c.translate(b + Y(he(T)));
        var D = Se(T) > Pd, H = C !== (C = y());
        (D || H) && V(T), I = !0, a(VO), on(T);
      } else
        Z(T) && (E = B(T), on(T));
  }
  function L(T) {
    s.is($a) && (s.set(Xr), a(UO)), E && (q(T), on(T)), l(k, ms, $), l(k, hs, L), E = !1;
  }
  function F(T) {
    !_ && I && on(T, !0);
  }
  function V(T) {
    N = O, O = T, b = m();
  }
  function q(T) {
    var D = ae(T), H = de(D), ee = n.rewind && n.rewindByDrag;
    v(!1), S ? f.scroll(H, 0, n.snap) : e.is(sa) ? f.go(h(tl(D)) < 0 ? ee ? "<" : "-" : ee ? ">" : "+") : e.is(Kr) && C && ee ? f.go(y(!0) ? ">" : "<") : f.go(f.toDest(H), !0), v(!0);
  }
  function B(T) {
    var D = n.dragMinThreshold, H = Ro(D), ee = H && D.mouse || 0, ie = (H ? D.touch : +D) || 10;
    return yt(he(T)) > (P(T) ? ie : ee);
  }
  function Z(T) {
    return yt(he(T)) > yt(he(T, !0));
  }
  function ae(T) {
    if (e.is(so) || !C) {
      var D = Se(T);
      if (D && D < Pd)
        return he(T) / D;
    }
    return 0;
  }
  function de(T) {
    return m() + tl(T) * Un(yt(T) * (n.flickPower || 600), S ? 1 / 0 : t.Layout.listSize() * (n.flickMaxPages || 1));
  }
  function he(T, D) {
    return j(T, D) - j(ne(T), D);
  }
  function Se(T) {
    return el(T) - el(ne(T));
  }
  function ne(T) {
    return O === T && N || O;
  }
  function j(T, D) {
    return (P(T) ? T.changedTouches[0] : T)["page" + g(D ? "Y" : "X")];
  }
  function Y(T) {
    return T / (C && e.is(Kr) ? cP : 1);
  }
  function w(T) {
    var D = n.noDrag;
    return !Mo(T, "." + Jh + ", ." + Ri) && (!D || !Mo(T, D));
  }
  function P(T) {
    return typeof TouchEvent < "u" && T instanceof TouchEvent;
  }
  function R() {
    return E;
  }
  function K(T) {
    _ = T;
  }
  return {
    mount: A,
    disable: K,
    isDragging: R
  };
}
var AP = {
  Spacebar: " ",
  Right: $i,
  Left: Ai,
  Up: jh,
  Down: Wh
};
function sc(e) {
  return e = Vn(e) ? e : e.key, AP[e] || e;
}
var Dd = "keydown";
function $P(e, t, n) {
  var r = Ve(e), o = r.on, a = r.bind, i = r.unbind, l = e.root, s = t.Direction.resolve, c, u;
  function f() {
    d(), o(bt, v), o(bt, d), o(Fn, g);
  }
  function d() {
    var m = n.keyboard;
    m && (c = m === "global" ? window : l, a(c, Dd, h));
  }
  function v() {
    i(c, Dd);
  }
  function p(m) {
    u = m;
  }
  function g() {
    var m = u;
    u = !0, Ih(function() {
      u = m;
    });
  }
  function h(m) {
    if (!u) {
      var y = sc(m);
      y === s(Ai) ? e.go("<") : y === s($i) && e.go(">");
    }
  }
  return {
    mount: f,
    destroy: v,
    disable: p
  };
}
var So = Ql + "-lazy", Ra = So + "-srcset", NP = "[" + So + "], [" + Ra + "]";
function LP(e, t, n) {
  var r = Ve(e), o = r.on, a = r.off, i = r.bind, l = r.emit, s = n.lazyLoad === "sequential", c = [aa, io], u = [];
  function f() {
    n.lazyLoad && (d(), o(Ke, d));
  }
  function d() {
    hn(u), v(), s ? m() : (a(c), o(c, p), p());
  }
  function v() {
    t.Slides.forEach(function(y) {
      Zl(y.slide, NP).forEach(function(b) {
        var O = Mt(b, So), N = Mt(b, Ra);
        if (O !== b.src || N !== b.srcset) {
          var S = n.classes.spinner, E = b.parentElement, C = ra(E, "." + S) || Vr("span", S, E);
          u.push([b, y, C]), b.src || Vo(b, "none");
        }
      });
    });
  }
  function p() {
    u = u.filter(function(y) {
      var b = n.perPage * ((n.preloadPages || 1) + 1) - 1;
      return y[1].isWithin(e.index, b) ? g(y) : !0;
    }), u.length || a(c);
  }
  function g(y) {
    var b = y[0];
    qt(y[1].slide, ol), i(b, "load error", $e(h, y)), ye(b, "src", Mt(b, So)), ye(b, "srcset", Mt(b, Ra)), Gt(b, So), Gt(b, Ra);
  }
  function h(y, b) {
    var O = y[0], N = y[1];
    un(N.slide, ol), b.type !== "error" && (gr(y[2]), Vo(O, ""), l(Fh, O, N), l(Fo)), s && m();
  }
  function m() {
    u.length && g(u.shift());
  }
  return {
    mount: f,
    destroy: $e(hn, u),
    check: p
  };
}
function RP(e, t, n) {
  var r = Ve(e), o = r.on, a = r.emit, i = r.bind, l = t.Slides, s = t.Elements, c = t.Controller, u = c.hasFocus, f = c.getIndex, d = c.go, v = t.Direction.resolve, p = s.pagination, g = [], h, m;
  function y() {
    b(), o([bt, Ke, oi], y);
    var _ = n.pagination;
    p && Vo(p, _ ? "" : "none"), _ && (o([Fn, nc, io], I), O(), I(), a(jO, {
      list: h,
      items: g
    }, C(e.index)));
  }
  function b() {
    h && (gr(p ? Kn(h.children) : h), un(h, m), hn(g), h = null), r.destroy();
  }
  function O() {
    var _ = e.length, k = n.classes, A = n.i18n, x = n.perPage, M = u() ? c.getEnd() + 1 : Uo(_ / x);
    h = p || Vr("ul", k.pagination, s.track.parentElement), qt(h, m = Mi + "--" + E()), ye(h, fn, "tablist"), ye(h, Pt, A.select), ye(h, oc, E() === Ni ? "vertical" : "");
    for (var $ = 0; $ < M; $++) {
      var L = Vr("li", null, h), F = Vr("button", {
        class: k.page,
        type: "button"
      }, L), V = l.getIn($).map(function(B) {
        return B.slide.id;
      }), q = !u() && x > 1 ? A.pageX : A.slideX;
      i(F, "click", $e(N, $)), n.paginationKeyboard && i(F, "keydown", $e(S, $)), ye(L, fn, "presentation"), ye(F, fn, "tab"), ye(F, ia, V.join(" ")), ye(F, Pt, nl(q, $ + 1)), ye(F, Ur, -1), g.push({
        li: L,
        button: F,
        page: $
      });
    }
  }
  function N(_) {
    d(">" + _, !0);
  }
  function S(_, k) {
    var A = g.length, x = sc(k), M = E(), $ = -1;
    x === v($i, !1, M) ? $ = ++_ % A : x === v(Ai, !1, M) ? $ = (--_ + A) % A : x === "Home" ? $ = 0 : x === "End" && ($ = A - 1);
    var L = g[$];
    L && (Ah(L.button), d(">" + $), on(k, !0));
  }
  function E() {
    return n.paginationDirection || n.direction;
  }
  function C(_) {
    return g[c.toPage(_)];
  }
  function I() {
    var _ = C(f(!0)), k = C(f());
    if (_) {
      var A = _.button;
      un(A, yr), Gt(A, Td), ye(A, Ur, -1);
    }
    if (k) {
      var x = k.button;
      qt(x, yr), ye(x, Td, !0), ye(x, Ur, "");
    }
    a(WO, {
      list: h,
      items: g
    }, _, k);
  }
  return {
    items: g,
    mount: y,
    destroy: b,
    getAt: C,
    update: I
  };
}
var MP = [" ", "Enter"];
function xP(e, t, n) {
  var r = n.isNavigation, o = n.slideFocus, a = [];
  function i() {
    e.splides.forEach(function(p) {
      p.isParent || (c(e, p.splide), c(p.splide, e));
    }), r && u();
  }
  function l() {
    a.forEach(function(p) {
      p.destroy();
    }), hn(a);
  }
  function s() {
    l(), i();
  }
  function c(p, g) {
    var h = Ve(p);
    h.on(Fn, function(m, y, b) {
      g.go(g.is(so) ? b : m);
    }), a.push(h);
  }
  function u() {
    var p = Ve(e), g = p.on;
    g(Mh, d), g(Hh, v), g([br, bt], f), a.push(p), p.emit(Bh, e.splides);
  }
  function f() {
    ye(t.Elements.list, oc, n.direction === Ni ? "vertical" : "");
  }
  function d(p) {
    e.go(p.index);
  }
  function v(p, g) {
    Kl(MP, sc(g)) && (d(p), on(g));
  }
  return {
    setup: $e(t.Media.set, {
      slideFocus: ea(o) ? r : o
    }, !0),
    mount: i,
    destroy: l,
    remount: s
  };
}
function BP(e, t, n) {
  var r = Ve(e), o = r.bind, a = 0;
  function i() {
    n.wheel && o(t.Elements.track, "wheel", l, $r);
  }
  function l(c) {
    if (c.cancelable) {
      var u = c.deltaY, f = u < 0, d = el(c), v = n.wheelMinThreshold || 0, p = n.wheelSleep || 0;
      yt(u) > v && d - a > p && (e.go(f ? "<" : ">"), a = d), s(f) && on(c);
    }
  }
  function s(c) {
    return !n.releaseWheel || e.state.is(ao) || t.Controller.getAdjacent(c) !== -1;
  }
  return {
    mount: i
  };
}
var VP = 90;
function UP(e, t, n) {
  var r = Ve(e), o = r.on, a = t.Elements.track, i = n.live && !n.isNavigation, l = Vr("span", oP), s = Pi(VP, $e(u, !1));
  function c() {
    i && (d(!t.Autoplay.isPaused()), ye(a, Id, !0), l.textContent = "…", o(Vh, $e(d, !0)), o(Uh, $e(d, !1)), o([aa, io], $e(u, !0)));
  }
  function u(v) {
    ye(a, kd, v), v ? (na(a, l), s.start()) : (gr(l), s.cancel());
  }
  function f() {
    Gt(a, [Sd, Id, kd]), gr(l);
  }
  function d(v) {
    i && ye(a, Sd, v ? "off" : "polite");
  }
  return {
    mount: c,
    disable: d,
    destroy: f
  };
}
var FP = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Media: XO,
  Direction: KO,
  Elements: uP,
  Slides: fP,
  Layout: pP,
  Clones: hP,
  Move: vP,
  Controller: gP,
  Arrows: bP,
  Autoplay: wP,
  Cover: CP,
  Scroll: PP,
  Drag: DP,
  Keyboard: $P,
  LazyLoad: LP,
  Pagination: RP,
  Sync: xP,
  Wheel: BP,
  Live: UP
}), HP = {
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
}, YP = {
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
  classes: sP,
  i18n: HP,
  reducedMotion: {
    speed: 0,
    rewindSpeed: 0,
    autoplay: "pause"
  }
};
function jP(e, t, n) {
  var r = t.Slides;
  function o() {
    Ve(e).on([br, Ke], a);
  }
  function a() {
    r.forEach(function(l) {
      l.style("transform", "translateX(-" + 100 * l.index + "%)");
    });
  }
  function i(l, s) {
    r.style("transition", "opacity " + n.speed + "ms " + n.easing), Ih(s);
  }
  return {
    mount: o,
    start: i,
    cancel: Qs
  };
}
function WP(e, t, n) {
  var r = t.Move, o = t.Controller, a = t.Scroll, i = t.Elements.list, l = $e(Rt, i, "transition"), s;
  function c() {
    Ve(e).bind(i, "transitionend", function(v) {
      v.target === i && s && (f(), s());
    });
  }
  function u(v, p) {
    var g = r.toPosition(v, !0), h = r.getPosition(), m = d(v);
    yt(g - h) >= 1 && m >= 1 ? n.useScroll ? a.scroll(g, m, !1, p) : (l("transform " + m + "ms " + n.easing), r.translate(g, !0), s = p) : (r.jump(v), p());
  }
  function f() {
    l(""), a.cancel();
  }
  function d(v) {
    var p = n.rewindSpeed;
    if (e.is(Kr) && p) {
      var g = o.getIndex(!0), h = o.getEnd();
      if (g === 0 && v >= h || g >= h && v === 0)
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
var zP = /* @__PURE__ */ function() {
  function e(n, r) {
    this.event = Ve(), this.Components = {}, this.state = qO(Mr), this.splides = [], this._o = {}, this._E = {};
    var o = Vn(n) ? Nh(document, n) : n;
    To(o, o + " is invalid."), this.root = o, r = Dn({
      label: Mt(o, Pt) || "",
      labelledby: Mt(o, rc) || ""
    }, YP, e.defaults, r || {});
    try {
      Dn(r, JSON.parse(Mt(o, Ql)));
    } catch {
      To(!1, "Invalid JSON");
    }
    this._o = Object.create(Dn({}, r));
  }
  var t = e.prototype;
  return t.mount = function(r, o) {
    var a = this, i = this.state, l = this.Components;
    To(i.is([Mr, ti]), "Already mounted!"), i.set(Mr), this._C = l, this._T = o || this._T || (this.is(sa) ? jP : WP), this._E = r || this._E;
    var s = Bo({}, FP, this._E, {
      Transition: this._T
    });
    return cr(s, function(c, u) {
      var f = c(a, l, a._o);
      l[u] = f, f.setup && f.setup();
    }), cr(l, function(c) {
      c.mount && c.mount();
    }), this.emit(br), qt(this.root, aP), i.set(Xr), this.emit(wd), this;
  }, t.sync = function(r) {
    return this.splides.push({
      splide: r
    }), r.splides.push({
      splide: this,
      isParent: !0
    }), this.state.is(Xr) && (this._C.Sync.remount(), r.Components.Sync.remount()), this;
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
    return this.emit(Ke), this;
  }, t.destroy = function(r) {
    r === void 0 && (r = !0);
    var o = this.event, a = this.state;
    return a.is(Mr) ? Ve(this).on(wd, this.destroy.bind(this, r)) : (cr(this._C, function(i) {
      i.destroy && i.destroy(r);
    }, !0), o.emit(xh), o.destroy(), r && hn(this.splides), a.set(ti)), this;
  }, DO(e, [{
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
}(), lc = zP;
lc.defaults = {};
lc.STATES = $O;
const qP = { class: "splide__track th-splide__track" }, GP = { class: "splide__list th-splide__list" }, XP = /* @__PURE__ */ me({
  __name: "SliderComponent",
  setup(e) {
    const t = Q(null);
    return rt(() => {
      t.value && new lc(".th-splide", {
        pagination: !1
      }).mount();
    }), (n, r) => (U(), X("div", {
      ref_key: "splide",
      ref: t,
      class: "th-splide splide"
    }, [
      z("div", qP, [
        z("ul", GP, [
          Yn(n.$slots, "default", {}, void 0, !0)
        ])
      ])
    ], 512));
  }
}), KP = /* @__PURE__ */ ge(XP, [["__scopeId", "data-v-405fedba"]]), rv = jn("upsell-modal", () => {
  const e = Q(null), t = te(() => e.value), n = (o) => e.value = o, r = () => e.value = null;
  return Ne(t, (o) => {
    window.dispatchEvent(
      new CustomEvent(o ? "th:upsellPopupOpen" : "th:upsellPopupClose")
    );
  }), {
    upsellProduct: e,
    isOpen: t,
    close: r,
    showUpsellModal: n
  };
}), JP = {
  key: 0,
  class: "th-upsell-modal__body"
}, ZP = ["src"], QP = { class: "th-upsell-modal__content" }, eD = { class: "th-upsell-modal__header" }, tD = {
  key: 0,
  class: "th-upsell-modal__product-promo"
}, nD = { class: "th-upsell-modal__product-title" }, rD = { class: "th-upsell-modal__product-body__heading" }, oD = ["innerHTML"], aD = /* @__PURE__ */ me({
  __name: "UpsellModal",
  emits: ["close"],
  setup(e, { emit: t }) {
    const { upsellProduct: n } = Io(rv()), r = t, o = () => {
      r("close");
    }, a = (i) => {
      !i.isTrusted || i.code !== "Escape" || o();
    };
    return rt(() => {
      window.addEventListener("keydown", a);
    }), Jr(() => {
      window.removeEventListener("keydown", a);
    }), (i, l) => W(n) ? (U(), X("div", JP, [
      G(wl, { toggle: o }, {
        default: we(() => [
          W(n).images.length > 0 ? (U(), ue(KP, {
            key: 0,
            class: "th-upsell-modal__images"
          }, {
            default: we(() => [
              (U(!0), X(Oe, null, at(W(n).images, (s) => (U(), X("img", {
                key: s,
                src: s,
                class: "th-splide__slide splide__slide"
              }, null, 8, ZP))), 128))
            ]),
            _: 1
          })) : se("", !0),
          z("div", QP, [
            z("div", eD, [
              W(n).promoText ? (U(), X("div", tD, oe(W(n).promoText), 1)) : se("", !0),
              W(n).duration || W(n).rating ? (U(), ue(Tm, {
                key: 1,
                "bookings-count": W(n).bookingsCount,
                duration: W(n).duration,
                rating: W(n).rating,
                class: "th-upsell-modal__meta"
              }, null, 8, ["bookings-count", "duration", "rating"])) : se("", !0)
            ]),
            z("h1", nD, oe(W(n).title), 1),
            (U(!0), X(Oe, null, at(W(n).content, (s) => (U(), X("div", {
              key: s.heading,
              class: "th-upsell-modal__product-body"
            }, [
              z("div", rD, oe(s.heading), 1),
              z("div", {
                class: "th-upsell-modal__product-body__html",
                innerHTML: s.content
              }, null, 8, oD)
            ]))), 128))
          ])
        ]),
        _: 1
      })
    ])) : se("", !0);
  }
}), iD = /* @__PURE__ */ ge(aD, [["__scopeId", "data-v-95067087"]]);
var sD = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const lD = Ka.isDesktop, cD = /* @__PURE__ */ me({
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
    var p;
    const { open: t } = xn(), { locale: n } = Pe(), r = Bv(), o = e, a = ut(), i = Ln(), l = hi(), s = rv(), c = xn(), u = () => {
      const g = o.currencies.length === 1 && o.currencies[0].rate.toString() === "1";
      Tb(
        o.api,
        o.language,
        o.currencyApiUrl,
        a.cartId,
        g,
        o.token,
        o.craftApi
      ), window.dispatchEvent(new CustomEvent("th:apiIsReady"));
    };
    a.$subscribe(() => {
      u(), window.dispatchEvent(new CustomEvent("th:apiIsUpdated"));
    }), window.ticketHub = {
      editCartItemEnabled: o.editCartItemEnabled,
      detailedCartItemCategory: o.detailedCartItemCategory,
      setCurrency: i.setCurrency,
      emptyCartLink: o.emptyCartBrowseLink,
      language: o.language,
      render: (p = Sh.methods) == null ? void 0 : p.render,
      products: o.products,
      paymentMethods: o.paymentMethods,
      siteTitle: o.siteTitle,
      resultTicketsLink: o.resultTicketsLink,
      selectedCurrency: i.currentCurrency,
      entertainmentTax: o.entertainmentTax,
      langLinksReplacer: vr.replaceLangSwitcher
    }, typeof r.loader < "u" && (window.ticketHub.loaderComponent = r.loader), typeof o.messages < "u" && (/* @__PURE__ */ new Set([
      ...ln.global.availableLocales,
      ...Object.keys(o.messages)
    ])).forEach((h) => {
      const m = ln.global.getLocaleMessage(h);
      ln.global.setLocaleMessage(
        h,
        kh(m, o.messages[h])
      );
    }), window.ticketHub.translations = ln.global.messages;
    const f = te(() => [
      s.isOpen,
      l.isOpen,
      c.isOpen
    ].includes(!0)), d = () => {
      if (typeof vr.getQueryParamFromString(
        window.location.search,
        "cartItemId"
      ) < "u") {
        if (+sD.VITE_DEBUG && console.log("product editing"), o.quickProductEditing) {
          const h = document.querySelector(".th-quick-buy__button");
          h && h.click();
          return;
        }
        if (lD())
          return;
        t();
      }
    }, v = () => {
      setTimeout(() => {
        const g = document.querySelectorAll(".th-gtm-product"), h = [];
        g.forEach((m) => {
          const { itemId: y, price: b, title: O } = m.dataset;
          b && O && y && h.push({
            item_id: y,
            item_name: O,
            price: Number(b)
          });
        }), Yr.viewItemList(h);
      }, 0);
    };
    return rt(async () => {
      window.dispatchEvent(new CustomEvent("th:pluginIsMounted"));
      try {
        u();
        const g = a.cart.customerInfo;
        n.value !== o.language && (n.value = o.language), g.culture !== n.value ? a.cartId ? await a.updateCustomerInfo({
          ...g,
          culture: o.language
        }) : await a.getCart() : await a.getCart(), await i.setCurrencies(o.currencies);
      } catch {
        await a.getCart();
      }
      window.dispatchEvent(new CustomEvent("th:pluginIsReady")), v(), d();
    }), (g, h) => {
      const m = ef("RouterView");
      return U(), X("div", {
        class: be([{ "th-default_shown-popup": f.value }, "th-default"])
      }, [
        G(tw),
        G(m),
        G(cl, {
          duration: 300,
          name: "dialog"
        }, {
          default: we(() => [
            W(s).isOpen ? (U(), ue(iD, {
              key: 0,
              onClose: W(s).close
            }, null, 8, ["onClose"])) : se("", !0),
            W(l).isOpen ? (U(), ue(FE, {
              key: 1,
              "empty-cart-browse-link": o.emptyCartBrowseLink
            }, null, 8, ["empty-cart-browse-link"])) : se("", !0)
          ]),
          _: 1
        }),
        G(GE),
        G(TO)
      ], 2);
    };
  }
}), uD = jn(
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
), dD = /* @__PURE__ */ me({
  __name: "PageCloseButton",
  setup(e) {
    const t = bi(), n = uD(), r = [];
    t.beforeEach((i, l) => {
      n.setCurrentRouteName(i.name), r.push(l);
    }), rt(async () => {
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
}), fD = /* @__PURE__ */ me({
  __name: "QuickBuyButton",
  props: {
    product: {}
  },
  setup(e) {
    const t = xn(), n = e;
    return (r, o) => (U(), X("div", {
      class: "th-quick-buy__button",
      onClick: o[0] || (o[0] = He((a) => W(t).setQuickBuyProduct(n.product), ["prevent", "stop"]))
    }, [
      Yn(r.$slots, "default")
    ]));
  }
}), pD = { class: "th-currency__symbol" }, mD = {
  key: 0,
  class: "th-currency__title"
}, hD = /* @__PURE__ */ me({
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
      z("span", pD, oe(W(n).symbol), 1),
      t.showTitle ? (U(), X("span", mD, oe(W(n).description), 1)) : se("", !0)
    ]));
  }
}), vD = /* @__PURE__ */ ge(hD, [["__scopeId", "data-v-546b5f6c"]]);
var ov = { exports: {} };
(function(e, t) {
  (function(n, r) {
    r();
  })(an, function() {
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
    var i = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof an == "object" && an.global === an ? an : void 0, l = i.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), s = i.saveAs || (typeof window != "object" || window !== i ? function() {
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
        var h = new FileReader();
        h.onloadend = function() {
          var b = h.result;
          b = g ? b : b.replace(/^data:[^;]*;/, "data:attachment/file;"), d ? d.location.href = b : location = b, d = null;
        }, h.readAsDataURL(c);
      } else {
        var m = i.URL || i.webkitURL, y = m.createObjectURL(c);
        d ? d.location = y : location.href = y, d = null, setTimeout(function() {
          m.revokeObjectURL(y);
        }, 4e4);
      }
    });
    i.saveAs = s.saveAs = s, e.exports = s;
  });
})(ov);
var gD = ov.exports;
const yD = { class: "th-result__content" }, _D = { class: "th-result__title" }, bD = ["innerHTML"], ED = {
  key: 0,
  class: "th-result__hint"
}, wD = { class: "th-result__actions" }, CD = $o.downloadTickets, TD = /* @__PURE__ */ me({
  __name: "ResultComponent",
  setup(e) {
    const { t } = Pe(), n = ut(), { showErrorToast: r } = _r(), o = wm(), a = Q(!0), i = Q(n.cart), l = Q(t("payment.enjoyYourTrip")), s = Q(!1), c = Q(""), u = Q(0), f = Q(""), d = Q(!0), v = Q(!1), p = te(() => bl.includes(i.value.status)), g = async () => {
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
    }, h = async (E) => {
      switch (E && (l.value = t(`payment.${E == null ? void 0 : E.resultCode}`), f.value = E.merchantReference), E.resultCode) {
        case "Authorised":
        case "Rebooked":
          n.cartId === o.query.cartId && await n.createNewCart(), s.value = !0, l.value = (E == null ? void 0 : E.resultCode) === "Rebooked" ? t(`payment.${E == null ? void 0 : E.resultCode}`) : t("payment.enjoyYourTrip"), c.value = t("payment.thankForPurchase", {
            email: i.value.customerInfo.email
          }), await Yr.purchase(
            E.merchantReference || i.value.cartId,
            i.value
          ), await g();
          break;
        case "Pending":
          c.value = t("payment.paymentIsPending", {
            email: i.value.customerInfo.email
          }), setTimeout(() => {
            m();
          }, 1e4);
          break;
        default:
          l.value = t("payment.errorOccurred"), s.value = !1;
          break;
      }
    }, m = async () => {
      let E = null;
      try {
        if (o.query.isFree)
          E = { resultCode: "Authorised" }, o.query.rebooked && (E = { resultCode: "Rebooked" });
        else if (o.query.redirectResult) {
          const C = o.query.redirectResult;
          E = await $o.getDetails(C);
        } else
          E = o.query;
      } catch {
        alert("error");
      }
      await h(E), a.value = !1;
    }, y = async () => {
      i.value = await vt.getCart(
        o.query.cartId || n.cartId
      );
    }, b = te(() => {
      var E, C;
      return ((E = window.ticketHub) == null ? void 0 : E.resultTicketsLink) ?? ((C = window.ticketHub) == null ? void 0 : C.emptyCartLink);
    }), O = async () => {
      try {
        d.value = !0;
        const { blob: E } = await CD(i.value.cartId);
        gD.saveAs(E, `${f.value}.pdf`);
      } catch (E) {
        E instanceof It && r();
      } finally {
        d.value = !1;
      }
    }, N = async () => {
      v.value || (v.value = !0, await y(), await m(), setTimeout(() => {
        p.value || (d.value = !1, clearInterval(u.value));
      }, 6e4));
    }, S = () => {
      var C;
      let E = (C = Hn()) == null ? void 0 : C.appContext.app._container;
      E || (E = document.querySelector("#app")), E && (E.dataset.resultStatus = s.value ? "success" : "error");
    };
    return rt(() => {
      if (vr.replaceLangSwitcher(), S(), typeof o.name > "u") {
        window.addEventListener("th:apiIsReady", N);
        return;
      }
      N();
    }), Jr(() => {
      typeof o.name > "u" && window.addEventListener("th:apiIsReady", N);
    }), Ne(s, () => {
      S();
    }), (E, C) => a.value ? se("", !0) : (U(), X("div", {
      key: 0,
      class: be([{
        "th-result__container_success": s.value,
        "th-result__container_error": !s.value
      }, "th-result__container"])
    }, [
      z("div", yD, [
        z("h1", _D, oe(l.value), 1),
        z("p", {
          class: "th-result__description",
          innerHTML: c.value
        }, null, 8, bD),
        s.value ? (U(), X("p", ED, oe(W(t)("payment.success")), 1)) : se("", !0)
      ]),
      z("div", wD, [
        s.value ? se("", !0) : (U(), ue(nt, {
          key: 0,
          to: { name: "payment" },
          bg: "accent",
          tag: "router-link"
        }, {
          default: we(() => [
            qe(oe(W(t)("payment.back")), 1)
          ]),
          _: 1
        })),
        s.value ? (U(), ue(nt, {
          key: 1,
          disabled: !p.value,
          loading: d.value,
          bg: "accent",
          onClick: O
        }, {
          default: we(() => [
            qe(oe(W(t)("payment.downloadTickets")), 1)
          ]),
          _: 1
        }, 8, ["disabled", "loading"])) : se("", !0),
        G(nt, {
          to: b.value,
          tag: "a"
        }, {
          default: we(() => [
            qe(oe(W(t)("payment.moreActivities")), 1)
          ]),
          _: 1
        }, 8, ["to"])
      ])
    ], 2));
  }
}), SD = /* @__PURE__ */ ge(TD, [["__scopeId", "data-v-c7834c15"]]), kD = ["for"], ID = {
  key: 0,
  class: "th-input__label"
}, OD = { class: "th-input__wrapper" }, PD = ["id", "autocomplete", "disabled", "name", "type", "value"], DD = { class: "th-input__icon" }, AD = /* @__PURE__ */ me({
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
      r.label ? (U(), X("span", ID, oe(n.value), 1)) : se("", !0),
      z("span", OD, [
        z("input", {
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
        }, null, 40, PD),
        z("span", DD, [
          Yn(r.$slots, "default", {}, void 0, !0)
        ])
      ])
    ], 8, kD));
  }
}), Ad = /* @__PURE__ */ ge(AD, [["__scopeId", "data-v-05768fc3"]]), cc = (e) => {
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
}, $D = (e) => (e = W(e), Array.isArray(e) ? e.length : typeof e == "object" ? Object.keys(e).length : String(e).length);
function Er() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return (r) => (r = W(r), !cc(r) || t.every((o) => (o.lastIndex = 0, o.test(r))));
}
Er(/^[a-zA-Z]*$/);
Er(/^[a-zA-Z0-9]*$/);
Er(/^\d*(\.\d+)?$/);
const ND = /^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
var LD = Er(ND), RD = {
  $validator: LD,
  $message: "Value is not a valid email address",
  $params: {
    type: "email"
  }
};
function MD(e) {
  return (t) => !cc(t) || $D(t) <= W(e);
}
function $d(e) {
  return {
    $validator: MD(e),
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
function xD(e) {
  return typeof e == "string" && (e = e.trim()), cc(e);
}
var Nd = {
  $validator: xD,
  $message: "Value is required",
  $params: {
    type: "required"
  }
};
const BD = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
Er(BD);
Er(/(^[0-9]*$)|(^-[0-9]+$)/);
Er(/^[-]?\d*(\.\d+)?$/);
function Ld(e, t) {
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
    t % 2 ? Ld(Object(n), !0).forEach(function(r) {
      VD(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ld(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function VD(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Rd(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return Object.keys(e).reduce((n, r) => (t.includes(r) || (n[r] = W(e[r])), n), {});
}
function ai(e) {
  return typeof e == "function";
}
function UD(e) {
  return Wo(e) || Uv(e);
}
function av(e, t, n) {
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
  return te(() => e.some((r) => av(t, r, {
    [n]: !1
  })[n]));
}
function Md(e, t, n) {
  return te(() => e.reduce((r, o) => {
    const a = av(t, o, {
      [n]: !1
    })[n] || [];
    return r.concat(a);
  }, []));
}
function iv(e, t, n, r) {
  return e.call(r, W(t), W(n), r);
}
function sv(e) {
  return e.$valid !== void 0 ? !e.$valid : !e;
}
function FD(e, t, n, r, o, a, i) {
  let {
    $lazy: l,
    $rewardEarly: s
  } = o, c = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : [], u = arguments.length > 8 ? arguments[8] : void 0, f = arguments.length > 9 ? arguments[9] : void 0, d = arguments.length > 10 ? arguments[10] : void 0;
  const v = Q(!!r.value), p = Q(0);
  n.value = !1;
  const g = Ne([t, r].concat(c, d), () => {
    if (l && !r.value || s && !f.value && !n.value)
      return;
    let h;
    try {
      h = iv(e, t, u, i);
    } catch (m) {
      h = Promise.reject(m);
    }
    p.value++, n.value = !!p.value, v.value = !1, Promise.resolve(h).then((m) => {
      p.value--, n.value = !!p.value, a.value = m, v.value = sv(m);
    }).catch((m) => {
      p.value--, n.value = !!p.value, a.value = m, v.value = !0;
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
function HD(e, t, n, r, o, a, i, l) {
  let {
    $lazy: s,
    $rewardEarly: c
  } = r;
  const u = () => ({}), f = te(() => {
    if (s && !n.value || c && !l.value)
      return !1;
    let d = !0;
    try {
      const v = iv(e, t, i, a);
      o.value = v, d = sv(v);
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
function YD(e, t, n, r, o, a, i, l, s, c, u) {
  const f = Q(!1), d = e.$params || {}, v = Q(null);
  let p, g;
  e.$async ? {
    $invalid: p,
    $unwatch: g
  } = FD(e.$validator, t, f, n, r, v, o, e.$watchTargets, s, c, u) : {
    $invalid: p,
    $unwatch: g
  } = HD(e.$validator, t, n, r, v, o, s, c);
  const h = e.$message;
  return {
    $message: ai(h) ? te(() => h(Rd({
      $pending: f,
      $invalid: p,
      $params: Rd(d),
      $model: t,
      $response: v,
      $validator: a,
      $propertyPath: l,
      $property: i
    }))) : h || "",
    $params: d,
    $pending: f,
    $invalid: p,
    $response: v,
    $unwatch: g
  };
}
function jD() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const t = W(e), n = Object.keys(t), r = {}, o = {}, a = {};
  let i = null;
  return n.forEach((l) => {
    const s = t[l];
    switch (!0) {
      case ai(s.$validator):
        r[l] = s;
        break;
      case ai(s):
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
const WD = "__root";
function zD(e, t, n, r, o, a, i, l, s) {
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
    p[g] = YD(e[g], t, p.$dirty, a, i, g, n, o, s, d, v);
  }), p.$externalResults = te(() => l.value ? [].concat(l.value).map((g, h) => ({
    $propertyPath: o,
    $property: n,
    $validator: "$externalResults",
    $uid: `${o}-externalResult-${h}`,
    $message: g,
    $params: {},
    $response: null,
    $pending: !1
  })) : []), p.$invalid = te(() => {
    const g = c.some((h) => W(p[h].$invalid));
    return d.value = g, !!p.$externalResults.value.length || g;
  }), p.$pending = te(() => c.some((g) => W(p[g].$pending))), p.$error = te(() => p.$dirty.value ? p.$pending.value || p.$invalid.value : !1), p.$silentErrors = te(() => c.filter((g) => W(p[g].$invalid)).map((g) => {
    const h = p[g];
    return jo({
      $propertyPath: o,
      $property: n,
      $validator: g,
      $uid: `${o}-${g}`,
      $message: h.$message,
      $params: h.$params,
      $response: h.$response,
      $pending: h.$pending
    });
  }).concat(p.$externalResults.value)), p.$errors = te(() => p.$dirty.value ? p.$silentErrors.value : []), p.$unwatch = () => c.forEach((g) => {
    p[g].$unwatch();
  }), p.$commit = () => {
    d.value = !0, v.value = Date.now();
  }, r.set(o, e, p), p) : (u && r.set(o, e, p), p);
}
function qD(e, t, n, r, o, a, i) {
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
function GD(e, t, n) {
  const r = te(() => [t, n].filter((p) => p).reduce((p, g) => p.concat(Object.values(W(g))), [])), o = te({
    get() {
      return e.$dirty.value || (r.value.length ? r.value.every((p) => p.$dirty) : !1);
    },
    set(p) {
      e.$dirty.value = p;
    }
  }), a = te(() => {
    const p = W(e.$silentErrors) || [], g = r.value.filter((h) => (W(h).$silentErrors || []).length).reduce((h, m) => h.concat(...m.$silentErrors), []);
    return p.concat(g);
  }), i = te(() => {
    const p = W(e.$errors) || [], g = r.value.filter((h) => (W(h).$errors || []).length).reduce((h, m) => h.concat(...m.$errors), []);
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
  } = jD(t), g = Sn(Sn({}, l), v), h = r ? te(() => {
    const B = W(n);
    return B ? W(B[r]) : void 0;
  }) : n, m = Sn({}, W(c) || {}), y = te(() => {
    const B = W(c);
    return r ? B ? W(B[r]) : void 0 : B;
  }), b = zD(f, h, r, i, u, g, s, y, n), O = qD(d, h, u, i, g, s, y), N = {};
  p && Object.entries(p).forEach((B) => {
    let [Z, ae] = B;
    N[Z] = {
      $invalid: vs(ae, O, "$invalid"),
      $error: vs(ae, O, "$error"),
      $pending: vs(ae, O, "$pending"),
      $errors: Md(ae, O, "$errors"),
      $silentErrors: Md(ae, O, "$silentErrors")
    };
  });
  const {
    $dirty: S,
    $errors: E,
    $invalid: C,
    $anyDirty: I,
    $error: _,
    $pending: k,
    $touch: A,
    $reset: x,
    $silentErrors: M,
    $commit: $
  } = GD(b, O, a), L = r ? te({
    get: () => W(h),
    set: (B) => {
      S.value = !0;
      const Z = W(n), ae = W(c);
      ae && (ae[r] = m[r]), zt(Z[r]) ? Z[r].value = B : Z[r] = B;
    }
  }) : null;
  r && g.$autoDirty && Ne(h, () => {
    S.value || A();
    const B = W(c);
    B && (B[r] = m[r]);
  }, {
    flush: "sync"
  });
  async function F() {
    return A(), g.$rewardEarly && ($(), await $n()), await $n(), new Promise((B) => {
      if (!k.value)
        return B(!C.value);
      const Z = Ne(k, () => {
        B(!C.value), Z();
      });
    });
  }
  function V(B) {
    return (a.value || {})[B];
  }
  function q() {
    zt(c) ? c.value = m : Object.keys(m).length === 0 ? Object.keys(c).forEach((B) => {
      delete c[B];
    }) : Object.assign(c, m);
  }
  return jo(Sn(Sn(Sn({}, b), {}, {
    $model: L,
    $dirty: S,
    $error: _,
    $errors: E,
    $invalid: C,
    $anyDirty: I,
    $pending: k,
    $touch: A,
    $reset: x,
    $path: u || WD,
    $silentErrors: M,
    $validate: F,
    $commit: $
  }, a && {
    $getResultsForChild: V,
    $clearExternalResults: q,
    $validationGroups: N
  }), O));
}
class XD {
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
const Ma = {
  COLLECT_ALL: !0,
  COLLECT_NONE: !1
}, xd = Symbol("vuelidate#injectChildResults"), Bd = Symbol("vuelidate#removeChildResults");
function KD(e) {
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
    p || t === Ma.COLLECT_NONE || v === Ma.COLLECT_NONE || t !== Ma.COLLECT_ALL && t !== v || (r[d] = u, o.value.push(d));
  }
  n.__vuelidateInjectInstances = [].concat(n.__vuelidateInjectInstances || [], i);
  function l(u) {
    o.value = o.value.filter((f) => f !== u), delete r[u];
  }
  n.__vuelidateRemoveInstances = [].concat(n.__vuelidateRemoveInstances || [], l);
  const s = _t(xd, []);
  An(xd, n.__vuelidateInjectInstances);
  const c = _t(Bd, []);
  return An(Bd, n.__vuelidateRemoveInstances), {
    childResults: a,
    sendValidationResultsToParent: s,
    removeValidationResultsFromParent: c
  };
}
function lv(e) {
  return new Proxy(e, {
    get(t, n) {
      return typeof t[n] == "object" ? lv(t[n]) : te(() => t[n]);
    }
  });
}
let Vd = 0;
function JD(e, t) {
  var n;
  let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  arguments.length === 1 && (r = e, e = void 0, t = void 0);
  let {
    $registerAs: o,
    $scope: a = Ma.COLLECT_ALL,
    $stopPropagation: i,
    $externalResults: l,
    currentVueInstance: s
  } = r;
  const c = s || ((n = Hn()) === null || n === void 0 ? void 0 : n.proxy), u = c ? c.$options : {};
  o || (Vd += 1, o = `_vuelidate_${Vd}`);
  const f = Q({}), d = new XD(), {
    childResults: v,
    sendValidationResultsToParent: p,
    removeValidationResultsFromParent: g
  } = c ? KD({
    $scope: a,
    instance: c
  }) : {
    childResults: Q({})
  };
  if (!e && u.validations) {
    const h = u.validations;
    t = Q({}), Vv(() => {
      t.value = c, Ne(() => ai(h) ? h.call(t.value, new lv(t.value)) : h, (m) => {
        f.value = al({
          validations: m,
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
    const h = zt(e) || UD(e) ? e : jo(e || {});
    Ne(h, (m) => {
      f.value = al({
        validations: m,
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
  return c && (p.forEach((h) => h(f, {
    $registerAs: o,
    $scope: a,
    $stopPropagation: i
  })), Jr(() => g.forEach((h) => h(o)))), te(() => Sn(Sn({}, W(f.value)), v.value));
}
const ZD = { class: "th-payment-loader" }, QD = 5e3, eA = /* @__PURE__ */ me({
  __name: "PaymentLoader",
  setup(e) {
    const t = Q(0), n = Q(0), r = Q(null), { t: o } = Pe(), a = [o("paymentLoader.booking"), o("paymentLoader.nearly")];
    return rt(() => {
      var i, l;
      typeof ((i = window.ticketHub) == null ? void 0 : i.loaderComponent) < "u" && (r.value = (l = window.ticketHub) == null ? void 0 : l.loaderComponent), n.value = window.setInterval(() => {
        if (t.value === a.length - 1) {
          t.value = 0;
          return;
        }
        t.value++;
      }, QD);
    }), Jr(() => {
      window.clearInterval(n.value);
    }), (i, l) => (U(), X("div", ZD, [
      G(cl, {
        class: "th-payment-loader__messages",
        mode: "out-in",
        name: "payment-loader",
        tag: "div"
      }, {
        default: we(() => [
          (U(), X("span", {
            key: t.value,
            class: "th-payment-loader__message"
          }, oe(a[t.value]), 1))
        ]),
        _: 1
      }),
      z("div", {
        class: be([{ "th-payment-loader__progress_custom": r.value }, "th-payment-loader__progress"])
      }, [
        (U(), ue(ii(r.value)))
      ], 2)
    ]));
  }
}), tA = /* @__PURE__ */ ge(eA, [["__scopeId", "data-v-fff17c45"]]), nA = {
  key: 0,
  class: "th-rebook-item"
}, rA = { class: "th-rebook-item__title" }, oA = /* @__PURE__ */ me({
  __name: "RebookItem",
  props: {
    cartItem: {}
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const { showErrorToast: n } = _r(), r = e, o = t, a = te(
      () => Rn.getCartProduct(r.cartItem)
    ), i = Q(!1), l = Q(null), s = te(() => {
      var c, u;
      return {
        cartProduct: (c = l.value) == null ? void 0 : c.cartProductFormat,
        isTimeslotsAreSelected: (u = l.value) == null ? void 0 : u.isTimeslotsAreSelected
      };
    });
    return rt(async () => {
      var c;
      if (l.value = await Rn.getProduct(
        a.value
      ), !!l.value) {
        l.value.setCartItem(r.cartItem), (c = l.value) == null || c.loadCartItem(a.value.id);
        try {
          i.value = !0;
          const u = await hr.getProductBookingData(
            l.value,
            fe(/* @__PURE__ */ new Date()).format("YYYY-MM-DD")
          );
          await l.value.setBookingData(u);
        } catch (u) {
          n(u.message);
        } finally {
          i.value = !1;
        }
      }
    }), Ne(s, () => {
      s.value && o("change", s.value);
    }), (c, u) => i.value ? (U(), ue(tA, { key: 1 })) : (U(), X("div", nA, [
      z("h3", rA, oe(a.value.title), 1),
      l.value ? (U(), ue(Ws, {
        key: 0,
        product: l.value
      }, null, 8, ["product"])) : se("", !0)
    ]));
  }
}), aA = { class: "th-rebook-form" }, iA = { class: "th-rebook__items" }, sA = /* @__PURE__ */ me({
  __name: "RebookForm",
  setup(e) {
    const { getCart: t, updateCart: n } = ja, { showErrorToast: r, showToast: o } = _r(), { t: a } = Pe(), i = {
      email: { required: Nd, email: RD, maxLength: $d(60) },
      orderReference: { required: Nd, maxLength: $d(40) }
    }, l = Q([]), s = Q(null), c = Q(!1), u = Q([]), f = Q({
      email: "",
      orderReference: ""
    }), d = JD(i, f), v = te(() => u.value.some((y) => !y)), p = async () => {
      if (c.value = !0, !d.value.$invalid)
        try {
          s.value = await t(
            f.value.email,
            f.value.orderReference
          );
        } catch (y) {
          const b = /\s\[.*\]/gm;
          let O = y.message;
          O = O.replace(b, ""), r(O);
        } finally {
          c.value = !1;
        }
    }, g = () => {
      var y;
      if (typeof ((y = window.ticketHub) == null ? void 0 : y.language) < "u") {
        let b = window.location.pathname.split("/")[1];
        return b = b === window.ticketHub.language ? b : "", new URL(`${b}/result`, window.location.origin);
      }
      return new URL("result", window.location.origin);
    }, h = async () => {
      var y, b;
      c.value = !0;
      try {
        s.value = await n(
          (y = s.value) == null ? void 0 : y.cartId,
          f.value.orderReference,
          l.value
        ), o(a("toast.orderHasBeenUpdated"));
        const O = g();
        O.searchParams.set("isFree", "true"), O.searchParams.set("rebooked", "true"), O.searchParams.set("cartId", (b = s.value) == null ? void 0 : b.cartId), window.location.assign(O.href);
      } catch (O) {
        r(O.message);
      } finally {
        c.value = !1;
      }
    }, m = (y, b) => {
      l.value[y] = b.cartProduct, u.value[y] = b.isTimeslotsAreSelected;
    };
    return (y, b) => (U(), X("div", aA, [
      s.value ? (U(), X(Oe, { key: 1 }, [
        z("div", iA, [
          (U(!0), X(Oe, null, at(s.value.items, (O, N) => (U(), ue(oA, {
            key: N,
            "cart-item": O,
            onChange: (S) => m(N, S)
          }, null, 8, ["cart-item", "onChange"]))), 128))
        ]),
        G(nt, {
          disabled: v.value,
          loading: c.value,
          class: "th-rebook__form-button",
          type: "submit",
          wide: "",
          onClick: h
        }, {
          default: we(() => [
            qe(oe(W(a)("booking.update")), 1)
          ]),
          _: 1
        }, 8, ["disabled", "loading"])
      ], 64)) : (U(), X("form", {
        key: 0,
        onSubmit: He(p, ["prevent"])
      }, [
        G(Ad, {
          modelValue: f.value.email,
          "onUpdate:modelValue": b[0] || (b[0] = (O) => f.value.email = O),
          label: W(a)("booking.enterEmail"),
          value: f.value.email,
          required: ""
        }, null, 8, ["modelValue", "label", "value"]),
        G(Ad, {
          modelValue: f.value.orderReference,
          "onUpdate:modelValue": b[1] || (b[1] = (O) => f.value.orderReference = O),
          label: W(a)("booking.enterOrderReference"),
          value: f.value.orderReference,
          required: ""
        }, null, 8, ["modelValue", "label", "value"]),
        G(nt, {
          disabled: W(d).$invalid,
          loading: c.value,
          class: "th-rebook__form-button",
          type: "submit",
          wide: ""
        }, {
          default: we(() => [
            qe(oe(W(a)("booking.submit")), 1)
          ]),
          _: 1
        }, 8, ["disabled", "loading"])
      ], 32))
    ]));
  }
}), il = {
  ThCart: cD,
  ThCartButton: wh,
  ThCartCount: Ch,
  ThPageCloseButton: dD,
  ThProduct: ql,
  ThQuickBuyButton: fD,
  ThBookButton: Th,
  ThPrice: lt,
  ThCurrency: vD,
  ThRebookForm: sA,
  ThRender: Sh,
  ThPaymentResult: SD
}, lA = (e = "") => [
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
], cA = (e = "/", t = !1, n = !1) => {
  const r = lA(e);
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
  }), t1({
    history: f0(),
    routes: r,
    strict: !1,
    scrollBehavior(o) {
      if (!o.hash)
        return { top: 0 };
    }
  });
}, uA = (e, t, n = !1, r = !1) => {
  const o = cA(t, n, r);
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
function dA(e) {
  return typeof e == "object" && e !== null;
}
function Ud(e, t) {
  return e = dA(e) ? e : /* @__PURE__ */ Object.create(null), new Proxy(e, {
    get(n, r, o) {
      return r === "key" ? Reflect.get(n, r, o) : Reflect.get(n, r, o) || Reflect.get(t, r, o);
    }
  });
}
function fA(e, t) {
  return t.reduce((n, r) => n == null ? void 0 : n[r], e);
}
function pA(e, t, n) {
  return t.slice(0, -1).reduce((r, o) => /^(__proto__)$/.test(o) ? {} : r[o] = r[o] || {}, e)[t[t.length - 1]] = n, e;
}
function mA(e, t) {
  return t.reduce((n, r) => {
    const o = r.split(".");
    return pA(n, o, fA(e, o));
  }, {});
}
function hA(e, t) {
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
function Fd(e, { storage: t, serializer: n, key: r, debug: o }) {
  try {
    const a = t == null ? void 0 : t.getItem(r);
    a && e.$patch(n == null ? void 0 : n.deserialize(a));
  } catch (a) {
    o && console.error("[pinia-plugin-persistedstate]", a);
  }
}
function Hd(e, { storage: t, serializer: n, key: r, paths: o, debug: a }) {
  try {
    const i = Array.isArray(o) ? mA(e, o) : e;
    t.setItem(r, n.serialize(i));
  } catch (i) {
    a && console.error("[pinia-plugin-persistedstate]", i);
  }
}
function vA(e = {}) {
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
    const i = (Array.isArray(r) ? r.map((l) => Ud(l, e)) : [Ud(r, e)]).map(hA(e, o)).filter(Boolean);
    o.$persist = () => {
      i.forEach((l) => {
        Hd(o.$state, l);
      });
    }, o.$hydrate = ({ runHooks: l = !0 } = {}) => {
      i.forEach((s) => {
        const { beforeRestore: c, afterRestore: u } = s;
        l && (c == null || c(t)), Fd(o, s), l && (u == null || u(t));
      });
    }, i.forEach((l) => {
      const { beforeRestore: s, afterRestore: c } = l;
      s == null || s(t), Fd(o, l), c == null || c(t), o.$subscribe(
        (u, f) => {
          Hd(f, l);
        },
        {
          detached: !0
        }
      );
    });
  };
}
var gA = vA();
function yA(e) {
  return e && typeof e.then == "function";
}
Promise.resolve(!1);
Promise.resolve(!0);
var ur = Promise.resolve();
function cv(e, t) {
  return e || (e = 0), new Promise(function(n) {
    return setTimeout(function() {
      return n(t);
    }, e);
  });
}
function _A(e, t) {
  return Math.floor(Math.random() * (t - e + 1) + e);
}
function uc() {
  return Math.random().toString(36).substring(2);
}
var gs = 0;
function la() {
  var e = Date.now() * 1e3;
  return e <= gs && (e = gs + 1), gs = e, e;
}
var bA = la, EA = "native";
function wA(e) {
  var t = {
    time: la(),
    messagesCallback: null,
    bc: new BroadcastChannel(e),
    subFns: []
    // subscriberFunctions
  };
  return t.bc.onmessage = function(n) {
    t.messagesCallback && t.messagesCallback(n.data);
  }, t;
}
function CA(e) {
  e.bc.close(), e.subFns = [];
}
function TA(e, t) {
  try {
    return e.bc.postMessage(t, !1), ur;
  } catch (n) {
    return Promise.reject(n);
  }
}
function SA(e, t) {
  e.messagesCallback = t;
}
function kA() {
  if (typeof globalThis < "u" && globalThis.Deno && globalThis.Deno.args)
    return !0;
  if ((typeof window < "u" || typeof self < "u") && typeof BroadcastChannel == "function") {
    if (BroadcastChannel._pubkey)
      throw new Error("BroadcastChannel: Do not overwrite window.BroadcastChannel with this module, this is not a polyfill");
    return !0;
  } else
    return !1;
}
function IA() {
  return 150;
}
var OA = {
  create: wA,
  close: CA,
  onMessage: SA,
  postMessage: TA,
  canBeUsed: kA,
  type: EA,
  averageResponseTime: IA,
  microSeconds: bA
};
class uv {
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
    this.map.set(t, dv()), this._to || (this._to = !0, setTimeout(() => {
      this._to = !1, PA(this);
    }, 0));
  }
  clear() {
    this.map.clear();
  }
}
function PA(e) {
  const t = dv() - e.ttl, n = e.map[Symbol.iterator]();
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
function dv() {
  return Date.now();
}
function dc() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = JSON.parse(JSON.stringify(e));
  return typeof t.webWorkerSupport > "u" && (t.webWorkerSupport = !0), t.idb || (t.idb = {}), t.idb.ttl || (t.idb.ttl = 1e3 * 45), t.idb.fallbackInterval || (t.idb.fallbackInterval = 150), e.idb && typeof e.idb.onclose == "function" && (t.idb.onclose = e.idb.onclose), t.localstorage || (t.localstorage = {}), t.localstorage.removeTimeout || (t.localstorage.removeTimeout = 1e3 * 60), e.methods && (t.methods = e.methods), t.node || (t.node = {}), t.node.ttl || (t.node.ttl = 1e3 * 60 * 2), t.node.maxParallelWrites || (t.node.maxParallelWrites = 2048), typeof t.node.useFastPath > "u" && (t.node.useFastPath = !0), t;
}
var DA = la, AA = "pubkey.broadcast-channel-0-", vn = "messages", xi = {
  durability: "relaxed"
}, $A = "idb";
function fv() {
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
function fc(e) {
  e.commit && e.commit();
}
function NA(e) {
  var t = fv(), n = AA + e, r = t.open(n);
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
function LA(e, t, n) {
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
    s.add(o), fc(a);
  });
}
function RA(e, t) {
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
      d ? d.value.id < t + 1 ? d.continue(t + 1) : (o.push(d.value), d.continue()) : (fc(n), s(o));
    };
  });
}
function MA(e, t) {
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
function xA(e, t) {
  var n = Date.now() - t, r = e.transaction(vn, "readonly", xi), o = r.objectStore(vn), a = [];
  return new Promise(function(i) {
    o.openCursor().onsuccess = function(l) {
      var s = l.target.result;
      if (s) {
        var c = s.value;
        c.time < n ? (a.push(c), s.continue()) : (fc(r), i(a));
      } else
        i(a);
    };
  });
}
function BA(e) {
  return xA(e.db, e.options.idb.ttl).then(function(t) {
    return MA(e, t.map(function(n) {
      return n.id;
    }));
  });
}
function VA(e, t) {
  return t = dc(t), NA(e).then(function(n) {
    var r = {
      closed: !1,
      lastCursorId: 0,
      channelName: e,
      options: t,
      uuid: uc(),
      /**
       * emittedMessagesIds
       * contains all messages that have been emitted before
       * @type {ObliviousSet}
       */
      eMIs: new uv(t.idb.ttl * 2),
      // ensures we do not read messages in parallel
      writeBlockPromise: ur,
      messagesCallback: null,
      readQueuePromises: [],
      db: n
    };
    return n.onclose = function() {
      r.closed = !0, t.idb.onclose && t.idb.onclose();
    }, pv(r), r;
  });
}
function pv(e) {
  e.closed || mv(e).then(function() {
    return cv(e.options.idb.fallbackInterval);
  }).then(function() {
    return pv(e);
  });
}
function UA(e, t) {
  return !(e.uuid === t.uuid || t.eMIs.has(e.id) || e.data.time < t.messagesCallbackTime);
}
function mv(e) {
  return e.closed || !e.messagesCallback ? ur : RA(e.db, e.lastCursorId).then(function(t) {
    var n = t.filter(function(r) {
      return !!r;
    }).map(function(r) {
      return r.id > e.lastCursorId && (e.lastCursorId = r.id), r;
    }).filter(function(r) {
      return UA(r, e);
    }).sort(function(r, o) {
      return r.time - o.time;
    });
    return n.forEach(function(r) {
      e.messagesCallback && (e.eMIs.add(r.id), e.messagesCallback(r.data));
    }), ur;
  });
}
function FA(e) {
  e.closed = !0, e.db.close();
}
function HA(e, t) {
  return e.writeBlockPromise = e.writeBlockPromise.then(function() {
    return LA(e.db, e.uuid, t);
  }).then(function() {
    _A(0, 10) === 0 && BA(e);
  }), e.writeBlockPromise;
}
function YA(e, t, n) {
  e.messagesCallbackTime = n, e.messagesCallback = t, mv(e);
}
function jA() {
  return !!fv();
}
function WA(e) {
  return e.idb.fallbackInterval * 2;
}
var zA = {
  create: VA,
  close: FA,
  onMessage: YA,
  postMessage: HA,
  canBeUsed: jA,
  type: $A,
  averageResponseTime: WA,
  microSeconds: DA
}, qA = la, GA = "pubkey.broadcastChannel-", XA = "localstorage";
function hv() {
  var e;
  if (typeof window > "u")
    return null;
  try {
    e = window.localStorage, e = window["ie8-eventlistener/storage"] || window.localStorage;
  } catch {
  }
  return e;
}
function vv(e) {
  return GA + e;
}
function KA(e, t) {
  return new Promise(function(n) {
    cv().then(function() {
      var r = vv(e.channelName), o = {
        token: uc(),
        time: Date.now(),
        data: t,
        uuid: e.uuid
      }, a = JSON.stringify(o);
      hv().setItem(r, a);
      var i = document.createEvent("Event");
      i.initEvent("storage", !0, !0), i.key = r, i.newValue = a, window.dispatchEvent(i), n();
    });
  });
}
function JA(e, t) {
  var n = vv(e), r = function(a) {
    a.key === n && t(JSON.parse(a.newValue));
  };
  return window.addEventListener("storage", r), r;
}
function ZA(e) {
  window.removeEventListener("storage", e);
}
function QA(e, t) {
  if (t = dc(t), !gv())
    throw new Error("BroadcastChannel: localstorage cannot be used");
  var n = uc(), r = new uv(t.localstorage.removeTimeout), o = {
    channelName: e,
    uuid: n,
    eMIs: r
    // emittedMessagesIds
  };
  return o.listener = JA(e, function(a) {
    o.messagesCallback && a.uuid !== n && (!a.token || r.has(a.token) || a.data.time && a.data.time < o.messagesCallbackTime || (r.add(a.token), o.messagesCallback(a.data)));
  }), o;
}
function e$(e) {
  ZA(e.listener);
}
function t$(e, t, n) {
  e.messagesCallbackTime = n, e.messagesCallback = t;
}
function gv() {
  var e = hv();
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
function n$() {
  var e = 120, t = navigator.userAgent.toLowerCase();
  return t.includes("safari") && !t.includes("chrome") ? e * 2 : e;
}
var r$ = {
  create: QA,
  close: e$,
  onMessage: t$,
  postMessage: KA,
  canBeUsed: gv,
  type: XA,
  averageResponseTime: n$,
  microSeconds: qA
}, yv = la, o$ = "simulate", pc = /* @__PURE__ */ new Set();
function a$(e) {
  var t = {
    time: yv(),
    name: e,
    messagesCallback: null
  };
  return pc.add(t), t;
}
function i$(e) {
  pc.delete(e);
}
var _v = 5;
function s$(e, t) {
  return new Promise(function(n) {
    return setTimeout(function() {
      var r = Array.from(pc);
      r.forEach(function(o) {
        o.name === e.name && // has same name
        o !== e && o.messagesCallback && // has subscribers
        o.time < t.time && o.messagesCallback(t);
      }), n();
    }, _v);
  });
}
function l$(e, t) {
  e.messagesCallback = t;
}
function c$() {
  return !0;
}
function u$() {
  return _v;
}
var d$ = {
  create: a$,
  close: i$,
  onMessage: l$,
  postMessage: s$,
  canBeUsed: c$,
  type: o$,
  averageResponseTime: u$,
  microSeconds: yv
}, Yd = [
  OA,
  // fastest
  zA,
  r$
];
function f$(e) {
  var t = [].concat(e.methods, Yd).filter(Boolean);
  if (e.type) {
    if (e.type === "simulate")
      return d$;
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
  throw new Error("No usable method found in " + JSON.stringify(Yd.map(function(o) {
    return o.type;
  })));
}
var bv = /* @__PURE__ */ new Set(), p$ = 0, mc = function(t, n) {
  this.id = p$++, bv.add(this), this.name = t, jd && (n = jd), this.options = dc(n), this.method = f$(this.options), this._iL = !1, this._onML = null, this._addEL = {
    message: [],
    internal: []
  }, this._uMP = /* @__PURE__ */ new Set(), this._befC = [], this._prepP = null, m$(this);
};
mc._pubkey = !0;
var jd;
mc.prototype = {
  postMessage: function(t) {
    if (this.closed)
      throw new Error("BroadcastChannel.postMessage(): Cannot post message after channel has closed " + /**
       * In the past when this error appeared, it was really hard to debug.
       * So now we log the msg together with the error so it at least
       * gives some clue about where in your application this happens.
       */
      JSON.stringify(t));
    return Wd(this, "message", t);
  },
  postInternal: function(t) {
    return Wd(this, "internal", t);
  },
  set onmessage(e) {
    var t = this.method.microSeconds(), n = {
      time: t,
      fn: e
    };
    qd(this, "message", this._onML), e && typeof e == "function" ? (this._onML = n, zd(this, "message", n)) : this._onML = null;
  },
  addEventListener: function(t, n) {
    var r = this.method.microSeconds(), o = {
      time: r,
      fn: n
    };
    zd(this, t, o);
  },
  removeEventListener: function(t, n) {
    var r = this._addEL[t].find(function(o) {
      return o.fn === n;
    });
    qd(this, t, r);
  },
  close: function() {
    var t = this;
    if (!this.closed) {
      bv.delete(this), this.closed = !0;
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
function Wd(e, t, n) {
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
function m$(e) {
  var t = e.method.create(e.name, e.options);
  yA(t) ? (e._prepP = t, t.then(function(n) {
    e._state = n;
  })) : e._state = t;
}
function Ev(e) {
  return e._addEL.message.length > 0 || e._addEL.internal.length > 0;
}
function zd(e, t, n) {
  e._addEL[t].push(n), h$(e);
}
function qd(e, t, n) {
  e._addEL[t] = e._addEL[t].filter(function(r) {
    return r !== n;
  }), v$(e);
}
function h$(e) {
  if (!e._iL && Ev(e)) {
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
function v$(e) {
  if (e._iL && !Ev(e)) {
    e._iL = !1;
    var t = e.method.microSeconds();
    e.method.onMessage(e._state, null, t);
  }
}
function Gd(e, t = { serialize: JSON.stringify, deserialize: JSON.parse }) {
  return t.deserialize(t.serialize(e));
}
function g$(e, t) {
  return Object.keys(t).includes(e);
}
function y$({
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
    const f = Object.keys(o.$state).filter((h) => !l.includes(h) && g$(h, o.$state));
    s.onmessage = (h) => {
      if (h === void 0) {
        s.postMessage({
          timestamp: c,
          state: Gd(o.$state, r)
        });
        return;
      }
      h.timestamp <= c || (u = !0, c = Date.now(), o.$patch((m) => {
        f.forEach((y) => {
          m[y] = h.state[y];
        });
      }));
    }, (((g = a == null ? void 0 : a.share) == null ? void 0 : g.initialize) ?? t) && s.postMessage(void 0), o.$subscribe((h, m) => {
      u || (c = Date.now(), s.postMessage({
        timestamp: c,
        state: Gd(m, r)
      })), u = !1;
    });
  };
}
const hc = wg();
hc.use(gA);
hc.use(
  y$({
    enable: !0,
    type: "localstorage"
  })
);
var _$ = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const b$ = (e, t = !1) => {
  if (typeof e == "string")
    return db({
      id: e,
      enabled: !!e,
      debug: !!_$.VITE_DEBUG,
      loadScript: t
    });
}, wv = (e, t, n = !1, r = !1, o, a = !1) => {
  e.use(ln), e.use(
    uA(e, t, n, r)
  ), e.use(hc), typeof o < "u" && e.use(b$(o, a));
}, E$ = (e, t, n, r = !1, o = !1, a, i) => {
  var l, s, c, u, f, d, v, p, g, h;
  typeof (t == null ? void 0 : t.container) < "u" && document.querySelector(t == null ? void 0 : t.container) && ((l = document.querySelector(t == null ? void 0 : t.container)) != null && l.getAttribute("data-base-url") && (n = (s = document.querySelector(t == null ? void 0 : t.container)) == null ? void 0 : s.getAttribute("data-base-url"), n = new URL(n).pathname), (c = document.querySelector(t == null ? void 0 : t.container)) != null && c.getAttribute("data-is-custom-result-page") && (r = !!((u = document.querySelector(t == null ? void 0 : t.container)) != null && u.getAttribute("data-is-custom-result-page"))), (f = document.querySelector(t == null ? void 0 : t.container)) != null && f.getAttribute("data-upgrades") && (o = !!Number(
    (d = document.querySelector(t == null ? void 0 : t.container)) == null ? void 0 : d.getAttribute("data-upgrades")
  )), (v = document.querySelector(t == null ? void 0 : t.container)) != null && v.getAttribute("data-gtm-id") && (a = (p = document.querySelector(t == null ? void 0 : t.container)) == null ? void 0 : p.getAttribute("data-gtm-id")), (g = document.querySelector(t == null ? void 0 : t.container)) != null && g.getAttribute("data-gtm-load-script") && (i = !!Number(
    (h = document.querySelector(t == null ? void 0 : t.container)) == null ? void 0 : h.getAttribute("data-gtm-load-script")
  ))), Object.keys(il).forEach((m) => {
    e.component(m, il[m]);
  }), wv(
    e,
    n,
    r,
    o,
    a,
    i
  );
}, w$ = (e, t = !1, n = !1, r, o = !1) => {
  const a = document.querySelector("#th-app") || document.querySelector(".th-app");
  a && a.getAttribute("data-base-url") && (e = a.getAttribute("data-base-url"), e = new URL(e).pathname), a && a.getAttribute("data-is-custom-result-page") && (t = !!a.getAttribute("data-is-custom-result-page")), a && a.getAttribute("data-upgrades") && (n = !!Number(a.getAttribute("data-upgrades"))), a && a.getAttribute("data-gtm-id") && (r = a.getAttribute("data-gtm-id")), a && a.getAttribute("data-gtm-load-script") && (o = !!Number(a.getAttribute("data-gtm-load-script")));
  const i = Fv({ components: il });
  wv(
    i,
    e,
    t,
    n,
    r,
    o
  ), i.mount(a);
}, Xd = "/", Kd = !1, S$ = {
  install: (e, t) => {
    if (typeof e > "u") {
      w$(Xd, Kd);
      return;
    }
    E$(
      e,
      t,
      Xd,
      Kd
    );
  }
};
export {
  PE as A,
  nt as B,
  $1 as C,
  gE as D,
  S$ as E,
  It as F,
  Yr as G,
  Ad as I,
  $o as P,
  SD as R,
  vr as U,
  ge as _,
  Pe as a,
  ut as b,
  Sl as c,
  _r as d,
  JD as e,
  B1 as f,
  j1 as g,
  RD as h,
  an as i,
  Zr as j,
  ln as k,
  tA as l,
  $d as m,
  fe as n,
  rv as o,
  Jv as p,
  Tm as q,
  Nd as r,
  lt as s,
  hO as t,
  bi as u,
  Ya as v,
  Ka as w,
  om as x,
  am as y,
  Q1 as z
};
