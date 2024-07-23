var oh = Object.defineProperty;
var ah = (e, t, n) => t in e ? oh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var oe = (e, t, n) => (ah(e, typeof t != "symbol" ? t + "" : t, n), n);
import { effectScope as zi, ref as ne, markRaw as xn, toRaw as co, hasInjectionContext as ih, inject as Tt, getCurrentInstance as Sr, watch as qe, unref as K, reactive as Qc, isRef as Yn, isReactive as va, toRef as Vr, nextTick as mr, computed as se, getCurrentScope as sh, onScopeDispose as lh, toRefs as hi, defineComponent as me, h as jn, onMounted as rt, onUnmounted as eu, Fragment as Ie, shallowRef as Xi, createVNode as q, Text as ch, openBlock as B, createElementBlock as X, createElementVNode as W, createBlock as ue, resolveDynamicComponent as Ki, withCtx as we, onBeforeUnmount as ga, normalizeClass as Ee, renderSlot as Jn, shallowReactive as uh, provide as dr, watchEffect as gt, pushScopeId as uo, popScopeId as fo, toDisplayString as ie, createCommentVNode as ae, renderList as ot, createTextVNode as Je, normalizeStyle as dh, withDirectives as tu, vModelText as fh, createStaticVNode as ph, withModifiers as Ue, TransitionGroup as nu, Transition as ru, vShow as hh, Teleport as mh, isVNode as vh, resolveComponent as ou, useSlots as gh, createApp as _h } from "vue";
var hn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function po(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var au = {};
function Ct(e, t) {
  typeof t == "boolean" && (t = { forever: t }), this._originalTimeouts = JSON.parse(JSON.stringify(e)), this._timeouts = e, this._options = t || {}, this._maxRetryTime = t && t.maxRetryTime || 1 / 0, this._fn = null, this._errors = [], this._attempts = 1, this._operationTimeout = null, this._operationTimeoutCb = null, this._timeout = null, this._operationStart = null, this._timer = null, this._options.forever && (this._cachedTimeouts = this._timeouts.slice(0));
}
var yh = Ct;
Ct.prototype.reset = function() {
  this._attempts = 1, this._timeouts = this._originalTimeouts.slice(0);
};
Ct.prototype.stop = function() {
  this._timeout && clearTimeout(this._timeout), this._timer && clearTimeout(this._timer), this._timeouts = [], this._cachedTimeouts = null;
};
Ct.prototype.retry = function(e) {
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
Ct.prototype.attempt = function(e, t) {
  this._fn = e, t && (t.timeout && (this._operationTimeout = t.timeout), t.cb && (this._operationTimeoutCb = t.cb));
  var n = this;
  this._operationTimeoutCb && (this._timeout = setTimeout(function() {
    n._operationTimeoutCb();
  }, n._operationTimeout)), this._operationStart = (/* @__PURE__ */ new Date()).getTime(), this._fn(this._attempts);
};
Ct.prototype.try = function(e) {
  console.log("Using RetryOperation.try() is deprecated"), this.attempt(e);
};
Ct.prototype.start = function(e) {
  console.log("Using RetryOperation.start() is deprecated"), this.attempt(e);
};
Ct.prototype.start = Ct.prototype.try;
Ct.prototype.errors = function() {
  return this._errors;
};
Ct.prototype.attempts = function() {
  return this._attempts;
};
Ct.prototype.mainError = function() {
  if (this._errors.length === 0)
    return null;
  for (var e = {}, t = null, n = 0, r = 0; r < this._errors.length; r++) {
    var o = this._errors[r], a = o.message, i = (e[a] || 0) + 1;
    e[a] = i, i >= n && (t = o, n = i);
  }
  return t;
};
(function(e) {
  var t = yh;
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
        d.push(function(h) {
          f.retry(h) || (h && (arguments[0] = f.mainError()), v.apply(this, arguments));
        }), f.attempt(function() {
          u.apply(n, d);
        });
      }).bind(n, s), n[l].options = r;
    }
  };
})(au);
var bh = au;
const Eh = /* @__PURE__ */ po(bh), wh = Object.prototype.toString, Th = (e) => wh.call(e) === "[object Error]", Ch = /* @__PURE__ */ new Set([
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
function kh(e) {
  return e && Th(e) && e.name === "TypeError" && typeof e.message == "string" ? e.message === "Load failed" ? e.stack === void 0 : Ch.has(e.message) : !1;
}
class Sh extends Error {
  constructor(t) {
    super(), t instanceof Error ? (this.originalError = t, { message: t } = t) : (this.originalError = new Error(t), this.originalError.stack = this.stack), this.name = "AbortError", this.message = t;
  }
}
const Ks = (e, t, n) => {
  const r = n.retries - (t - 1);
  return e.attemptNumber = t, e.retriesLeft = r, e;
};
async function Ih(e, t) {
  return new Promise((n, r) => {
    t = {
      onFailedAttempt() {
      },
      retries: 10,
      shouldRetry: () => !0,
      ...t
    };
    const o = Eh.operation(t), a = () => {
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
          if (s instanceof Sh)
            throw s.originalError;
          if (s instanceof TypeError && !kh(s))
            throw s;
          if (Ks(s, l, t), await t.shouldRetry(s) || (o.stop(), r(s)), await t.onFailedAttempt(s), !o.retry(s))
            throw o.mainError();
        } catch (c) {
          Ks(c, l, t), i(), r(c);
        }
      }
    });
  });
}
var iu = !1;
function Lo(e, t, n) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, n), n) : (e[t] = n, n);
}
function Ga(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
function Dh() {
  return su().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function su() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Oh = typeof Proxy == "function", Ph = "devtools-plugin:setup", Ah = "plugin:settings:set";
let er, mi;
function Nh() {
  var e;
  return er !== void 0 || (typeof window < "u" && window.performance ? (er = !0, mi = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (er = !0, mi = globalThis.perf_hooks.performance) : er = !1), er;
}
function Lh() {
  return Nh() ? mi.now() : Date.now();
}
class Rh {
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
        return Lh();
      }
    }, n && n.on(Ah, (i, l) => {
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
function _a(e, t) {
  const n = e, r = su(), o = Dh(), a = Oh && n.enableEarlyProxy;
  if (o && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a))
    o.emit(Ph, e, t);
  else {
    const i = a ? new Rh(n, o) : null;
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
let Mr;
const qr = (e) => Mr = e, lu = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function Wn(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var xt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(xt || (xt = {}));
const ya = typeof window < "u", Ur = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && ya, Js = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function $h(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Ji(e, t, n) {
  const r = new XMLHttpRequest();
  r.open("GET", e), r.responseType = "blob", r.onload = function() {
    du(r.response, t, n);
  }, r.onerror = function() {
    console.error("could not download file");
  }, r.send();
}
function cu(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function Yo(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const n = document.createEvent("MouseEvents");
    n.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(n);
  }
}
const jo = typeof navigator == "object" ? navigator : { userAgent: "" }, uu = /Macintosh/.test(jo.userAgent) && /AppleWebKit/.test(jo.userAgent) && !/Safari/.test(jo.userAgent), du = ya ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !uu ? Mh : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in jo ? xh : (
      // Fallback to using FileReader and a popup
      Bh
    )
  )
) : () => {
};
function Mh(e, t = "download", n) {
  const r = document.createElement("a");
  r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin !== location.origin ? cu(r.href) ? Ji(e, t, n) : (r.target = "_blank", Yo(r)) : Yo(r)) : (r.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(r.href);
  }, 4e4), setTimeout(function() {
    Yo(r);
  }, 0));
}
function xh(e, t = "download", n) {
  if (typeof e == "string")
    if (cu(e))
      Ji(e, t, n);
    else {
      const r = document.createElement("a");
      r.href = e, r.target = "_blank", setTimeout(function() {
        Yo(r);
      });
    }
  else
    navigator.msSaveOrOpenBlob($h(e, n), t);
}
function Bh(e, t, n, r) {
  if (r = r || open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string")
    return Ji(e, t, n);
  const o = e.type === "application/octet-stream", a = /constructor/i.test(String(Js.HTMLElement)) || "safari" in Js, i = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((i || o && a || uu) && typeof FileReader < "u") {
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
function ze(e, t) {
  const n = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, t) : t === "error" ? console.error(n) : t === "warn" ? console.warn(n) : console.log(n);
}
function Zi(e) {
  return "_a" in e && "install" in e;
}
function fu() {
  if (!("clipboard" in navigator))
    return ze("Your browser doesn't support the Clipboard API", "error"), !0;
}
function pu(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (ze('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Vh(e) {
  if (!fu())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), ze("Global state copied to clipboard.");
    } catch (t) {
      if (pu(t))
        return;
      ze("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function Uh(e) {
  if (!fu())
    try {
      hu(e, JSON.parse(await navigator.clipboard.readText())), ze("Global state pasted from clipboard.");
    } catch (t) {
      if (pu(t))
        return;
      ze("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function Fh(e) {
  try {
    du(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    ze("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let Yt;
function Hh() {
  Yt || (Yt = document.createElement("input"), Yt.type = "file", Yt.accept = ".json");
  function e() {
    return new Promise((t, n) => {
      Yt.onchange = async () => {
        const r = Yt.files;
        if (!r)
          return t(null);
        const o = r.item(0);
        return t(o ? { text: await o.text(), file: o } : null);
      }, Yt.oncancel = () => t(null), Yt.onerror = n, Yt.click();
    });
  }
  return e;
}
async function Yh(e) {
  try {
    const n = await Hh()();
    if (!n)
      return;
    const { text: r, file: o } = n;
    hu(e, JSON.parse(r)), ze(`Global state imported from "${o.name}".`);
  } catch (t) {
    ze("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function hu(e, t) {
  for (const n in t) {
    const r = e.state.value[n];
    r ? Object.assign(r, t[n]) : e.state.value[n] = t[n];
  }
}
function Dt(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const mu = "🍍 Pinia (root)", vi = "_root";
function jh(e) {
  return Zi(e) ? {
    id: vi,
    label: mu
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Wh(e) {
  if (Zi(e)) {
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
function qh(e) {
  return e ? Array.isArray(e) ? e.reduce((t, n) => (t.keys.push(n.key), t.operations.push(n.type), t.oldValue[n.key] = n.oldValue, t.newValue[n.key] = n.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: Dt(e.type),
    key: Dt(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function Gh(e) {
  switch (e) {
    case xt.direct:
      return "mutation";
    case xt.patchFunction:
      return "$patch";
    case xt.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let sr = !0;
const Wo = [], Mn = "pinia:mutations", et = "pinia", { assign: zh } = Object, Qo = (e) => "🍍 " + e;
function Xh(e, t) {
  _a({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: Wo,
    app: e
  }, (n) => {
    typeof n.now != "function" && ze("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
      id: Mn,
      label: "Pinia 🍍",
      color: 15064968
    }), n.addInspector({
      id: et,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            Vh(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await Uh(t), n.sendInspectorTree(et), n.sendInspectorState(et);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            Fh(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Yh(t), n.sendInspectorTree(et), n.sendInspectorState(et);
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
            o ? typeof o.$reset != "function" ? ze(`Cannot reset "${r}" store because it doesn't have a "$reset" method implemented.`, "warn") : (o.$reset(), ze(`Store "${r}" reset.`)) : ze(`Cannot reset "${r}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((r, o) => {
      const a = r.componentInstance && r.componentInstance.proxy;
      if (a && a._pStores) {
        const i = r.componentInstance.proxy._pStores;
        Object.values(i).forEach((l) => {
          r.instanceData.state.push({
            type: Qo(l.$id),
            key: "state",
            editable: !0,
            value: l._isOptionsAPI ? {
              _custom: {
                value: co(l.$state),
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
            type: Qo(l.$id),
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
      if (r.app === e && r.inspectorId === et) {
        let o = [t];
        o = o.concat(Array.from(t._s.values())), r.rootNodes = (r.filter ? o.filter((a) => "$id" in a ? a.$id.toLowerCase().includes(r.filter.toLowerCase()) : mu.toLowerCase().includes(r.filter.toLowerCase())) : o).map(jh);
      }
    }), n.on.getInspectorState((r) => {
      if (r.app === e && r.inspectorId === et) {
        const o = r.nodeId === vi ? t : t._s.get(r.nodeId);
        if (!o)
          return;
        o && (r.state = Wh(o));
      }
    }), n.on.editInspectorState((r, o) => {
      if (r.app === e && r.inspectorId === et) {
        const a = r.nodeId === vi ? t : t._s.get(r.nodeId);
        if (!a)
          return ze(`store "${r.nodeId}" not found`, "error");
        const { path: i } = r;
        Zi(a) ? i.unshift("state") : (i.length !== 1 || !a._customProperties.has(i[0]) || i[0] in a.$state) && i.unshift("$state"), sr = !1, r.set(a, i, r.state.value), sr = !0;
      }
    }), n.on.editComponentState((r) => {
      if (r.type.startsWith("🍍")) {
        const o = r.type.replace(/^🍍\s*/, ""), a = t._s.get(o);
        if (!a)
          return ze(`store "${o}" not found`, "error");
        const { path: i } = r;
        if (i[0] !== "state")
          return ze(`Invalid path for store "${o}":
${i}
Only state can be modified.`);
        i[0] = "$state", sr = !1, r.set(a, i, r.state.value), sr = !0;
      }
    });
  });
}
function Kh(e, t) {
  Wo.includes(Qo(t.$id)) || Wo.push(Qo(t.$id)), _a({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: Wo,
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
      const u = vu++;
      n.addTimelineEvent({
        layerId: Mn,
        event: {
          time: r(),
          title: "🛫 " + s,
          subtitle: "start",
          data: {
            store: Dt(t.$id),
            action: Dt(s),
            args: c
          },
          groupId: u
        }
      }), i((f) => {
        mn = void 0, n.addTimelineEvent({
          layerId: Mn,
          event: {
            time: r(),
            title: "🛬 " + s,
            subtitle: "end",
            data: {
              store: Dt(t.$id),
              action: Dt(s),
              args: c,
              result: f
            },
            groupId: u
          }
        });
      }), l((f) => {
        mn = void 0, n.addTimelineEvent({
          layerId: Mn,
          event: {
            time: r(),
            logType: "error",
            title: "💥 " + s,
            subtitle: "end",
            data: {
              store: Dt(t.$id),
              action: Dt(s),
              args: c,
              error: f
            },
            groupId: u
          }
        });
      });
    }, !0), t._customProperties.forEach((i) => {
      qe(() => K(t[i]), (l, s) => {
        n.notifyComponentUpdate(), n.sendInspectorState(et), sr && n.addTimelineEvent({
          layerId: Mn,
          event: {
            time: r(),
            title: "Change",
            subtitle: i,
            data: {
              newValue: l,
              oldValue: s
            },
            groupId: mn
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: i, type: l }, s) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState(et), !sr)
        return;
      const c = {
        time: r(),
        title: Gh(l),
        data: zh({ store: Dt(t.$id) }, qh(i)),
        groupId: mn
      };
      l === xt.patchFunction ? c.subtitle = "⤵️" : l === xt.patchObject ? c.subtitle = "🧩" : i && !Array.isArray(i) && (c.subtitle = i.type), i && (c.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: i
        }
      }), n.addTimelineEvent({
        layerId: Mn,
        event: c
      });
    }, { detached: !0, flush: "sync" });
    const o = t._hotUpdate;
    t._hotUpdate = xn((i) => {
      o(i), n.addTimelineEvent({
        layerId: Mn,
        event: {
          time: r(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: Dt(t.$id),
            info: Dt("HMR update")
          }
        }
      }), n.notifyComponentUpdate(), n.sendInspectorTree(et), n.sendInspectorState(et);
    });
    const { $dispose: a } = t;
    t.$dispose = () => {
      a(), n.notifyComponentUpdate(), n.sendInspectorTree(et), n.sendInspectorState(et), n.getSettings().logStoreChanges && ze(`Disposed "${t.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree(et), n.sendInspectorState(et), n.getSettings().logStoreChanges && ze(`"${t.$id}" store installed 🆕`);
  });
}
let vu = 0, mn;
function Zs(e, t, n) {
  const r = t.reduce((o, a) => (o[a] = co(e)[a], o), {});
  for (const o in r)
    e[o] = function() {
      const a = vu, i = n ? new Proxy(e, {
        get(...s) {
          return mn = a, Reflect.get(...s);
        },
        set(...s) {
          return mn = a, Reflect.set(...s);
        }
      }) : e;
      mn = a;
      const l = r[o].apply(i, arguments);
      return mn = void 0, l;
    };
}
function Jh({ app: e, store: t, options: n }) {
  if (t.$id.startsWith("__hot:"))
    return;
  t._isOptionsAPI = !!n.state, Zs(t, Object.keys(n.actions), t._isOptionsAPI);
  const r = t._hotUpdate;
  co(t)._hotUpdate = function(o) {
    r.apply(this, arguments), Zs(t, Object.keys(o._hmrPayload.actions), !!t._isOptionsAPI);
  }, Kh(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    t
  );
}
function Zh() {
  const e = zi(!0), t = e.run(() => ne({}));
  let n = [], r = [];
  const o = xn({
    install(a) {
      qr(o), o._a = a, a.provide(lu, o), a.config.globalProperties.$pinia = o, Ur && Xh(a, o), r.forEach((i) => n.push(i)), r = [];
    },
    use(a) {
      return !this._a && !iu ? r.push(a) : n.push(a), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return Ur && typeof Proxy < "u" && o.use(Jh), o;
}
function gu(e, t) {
  for (const n in t) {
    const r = t[n];
    if (!(n in e))
      continue;
    const o = e[n];
    Wn(o) && Wn(r) && !Yn(r) && !va(r) ? e[n] = gu(o, r) : e[n] = r;
  }
  return e;
}
const _u = () => {
};
function Qs(e, t, n, r = _u) {
  e.push(t);
  const o = () => {
    const a = e.indexOf(t);
    a > -1 && (e.splice(a, 1), r());
  };
  return !n && sh() && lh(o), o;
}
function tr(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const Qh = (e) => e();
function gi(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((n, r) => e.set(r, n)), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const r = t[n], o = e[n];
    Wn(o) && Wn(r) && e.hasOwnProperty(n) && !Yn(r) && !va(r) ? e[n] = gi(o, r) : e[n] = r;
  }
  return e;
}
const em = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function tm(e) {
  return !Wn(e) || !e.hasOwnProperty(em);
}
const { assign: yt } = Object;
function el(e) {
  return !!(Yn(e) && e.effect);
}
function tl(e, t, n, r) {
  const { state: o, actions: a, getters: i } = t, l = n.state.value[e];
  let s;
  function c() {
    !l && (process.env.NODE_ENV === "production" || !r) && (n.state.value[e] = o ? o() : {});
    const u = process.env.NODE_ENV !== "production" && r ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      hi(ne(o ? o() : {}).value)
    ) : hi(n.state.value[e]);
    return yt(u, a, Object.keys(i || {}).reduce((f, d) => (process.env.NODE_ENV !== "production" && d in u && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${d}" in store "${e}".`), f[d] = xn(se(() => {
      qr(n);
      const v = n._s.get(e);
      return i[d].call(v, v);
    })), f), {}));
  }
  return s = _i(e, c, t, n, r, !0), s;
}
function _i(e, t, n = {}, r, o, a) {
  let i;
  const l = yt({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !r._e.active)
    throw new Error("Pinia destroyed");
  const s = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !iu && (s.onTrigger = (y) => {
    c ? v = y : c == !1 && !w._hotUpdating && (Array.isArray(v) ? v.push(y) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let c, u, f = [], d = [], v;
  const h = r.state.value[e];
  !a && !h && (process.env.NODE_ENV === "production" || !o) && (r.state.value[e] = {});
  const _ = ne({});
  let m;
  function p(y) {
    let I;
    c = u = !1, process.env.NODE_ENV !== "production" && (v = []), typeof y == "function" ? (y(r.state.value[e]), I = {
      type: xt.patchFunction,
      storeId: e,
      events: v
    }) : (gi(r.state.value[e], y), I = {
      type: xt.patchObject,
      payload: y,
      storeId: e,
      events: v
    });
    const A = m = Symbol();
    mr().then(() => {
      m === A && (c = !0);
    }), u = !0, tr(f, I, r.state.value[e]);
  }
  const g = a ? function() {
    const { state: I } = n, A = I ? I() : {};
    this.$patch((U) => {
      yt(U, A);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : _u
  );
  function S() {
    i.stop(), f = [], d = [], r._s.delete(e);
  }
  function O(y, I) {
    return function() {
      qr(r);
      const A = Array.from(arguments), U = [], x = [];
      function N(M) {
        U.push(M);
      }
      function R(M) {
        x.push(M);
      }
      tr(d, {
        args: A,
        name: y,
        store: w,
        after: N,
        onError: R
      });
      let F;
      try {
        F = I.apply(this && this.$id === e ? this : w, A);
      } catch (M) {
        throw tr(x, M), M;
      }
      return F instanceof Promise ? F.then((M) => (tr(U, M), M)).catch((M) => (tr(x, M), Promise.reject(M))) : (tr(U, F), F);
    };
  }
  const L = /* @__PURE__ */ xn({
    actions: {},
    getters: {},
    state: [],
    hotState: _
  }), b = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: Qs.bind(null, d),
    $patch: p,
    $reset: g,
    $subscribe(y, I = {}) {
      const A = Qs(f, y, I.detached, () => U()), U = i.run(() => qe(() => r.state.value[e], (x) => {
        (I.flush === "sync" ? u : c) && y({
          storeId: e,
          type: xt.direct,
          events: v
        }, x);
      }, yt({}, s, I)));
      return A;
    },
    $dispose: S
  }, w = Qc(process.env.NODE_ENV !== "production" || Ur ? yt(
    {
      _hmrPayload: L,
      _customProperties: xn(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    b
    // must be added later
    // setupStore
  ) : b);
  r._s.set(e, w);
  const k = (r._a && r._a.runWithContext || Qh)(() => r._e.run(() => (i = zi()).run(t)));
  for (const y in k) {
    const I = k[y];
    if (Yn(I) && !el(I) || va(I))
      process.env.NODE_ENV !== "production" && o ? Lo(_.value, y, Vr(k, y)) : a || (h && tm(I) && (Yn(I) ? I.value = h[y] : gi(I, h[y])), r.state.value[e][y] = I), process.env.NODE_ENV !== "production" && L.state.push(y);
    else if (typeof I == "function") {
      const A = process.env.NODE_ENV !== "production" && o ? I : O(y, I);
      k[y] = A, process.env.NODE_ENV !== "production" && (L.actions[y] = I), l.actions[y] = I;
    } else
      process.env.NODE_ENV !== "production" && el(I) && (L.getters[y] = a ? (
        // @ts-expect-error
        n.getters[y]
      ) : I, ya && (k._getters || // @ts-expect-error: same
      (k._getters = xn([]))).push(y));
  }
  if (yt(w, k), yt(co(w), k), Object.defineProperty(w, "$state", {
    get: () => process.env.NODE_ENV !== "production" && o ? _.value : r.state.value[e],
    set: (y) => {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error("cannot set hotState");
      p((I) => {
        yt(I, y);
      });
    }
  }), process.env.NODE_ENV !== "production" && (w._hotUpdate = xn((y) => {
    w._hotUpdating = !0, y._hmrPayload.state.forEach((I) => {
      if (I in w.$state) {
        const A = y.$state[I], U = w.$state[I];
        typeof A == "object" && Wn(A) && Wn(U) ? gu(A, U) : y.$state[I] = U;
      }
      Lo(w, I, Vr(y.$state, I));
    }), Object.keys(w.$state).forEach((I) => {
      I in y.$state || Ga(w, I);
    }), c = !1, u = !1, r.state.value[e] = Vr(y._hmrPayload, "hotState"), u = !0, mr().then(() => {
      c = !0;
    });
    for (const I in y._hmrPayload.actions) {
      const A = y[I];
      Lo(w, I, O(I, A));
    }
    for (const I in y._hmrPayload.getters) {
      const A = y._hmrPayload.getters[I], U = a ? (
        // special handling of options api
        se(() => (qr(r), A.call(w, w)))
      ) : A;
      Lo(w, I, U);
    }
    Object.keys(w._hmrPayload.getters).forEach((I) => {
      I in y._hmrPayload.getters || Ga(w, I);
    }), Object.keys(w._hmrPayload.actions).forEach((I) => {
      I in y._hmrPayload.actions || Ga(w, I);
    }), w._hmrPayload = y._hmrPayload, w._getters = y._getters, w._hotUpdating = !1;
  })), Ur) {
    const y = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((I) => {
      Object.defineProperty(w, I, yt({ value: w[I] }, y));
    });
  }
  return r._p.forEach((y) => {
    if (Ur) {
      const I = i.run(() => y({
        store: w,
        app: r._a,
        pinia: r,
        options: l
      }));
      Object.keys(I || {}).forEach((A) => w._customProperties.add(A)), yt(w, I);
    } else
      yt(w, i.run(() => y({
        store: w,
        app: r._a,
        pinia: r,
        options: l
      })));
  }), process.env.NODE_ENV !== "production" && w.$state && typeof w.$state == "object" && typeof w.$state.constructor == "function" && !w.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${w.$id}".`), h && a && n.hydrate && n.hydrate(w.$state, h), c = !0, u = !0, w;
}
function Sn(e, t, n) {
  let r, o;
  const a = typeof t == "function";
  if (typeof e == "string")
    r = e, o = a ? n : t;
  else if (o = e, r = e.id, process.env.NODE_ENV !== "production" && typeof r != "string")
    throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
  function i(l, s) {
    const c = ih();
    if (l = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && Mr && Mr._testing ? null : l) || (c ? Tt(lu, null) : null), l && qr(l), process.env.NODE_ENV !== "production" && !Mr)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    l = Mr, l._s.has(r) || (a ? _i(r, t, o, l) : tl(r, o, l), process.env.NODE_ENV !== "production" && (i._pinia = l));
    const u = l._s.get(r);
    if (process.env.NODE_ENV !== "production" && s) {
      const f = "__hot:" + r, d = a ? _i(f, t, o, l, !0) : tl(f, yt({}, o), l, !0);
      s._hotUpdate(d), delete l.state.value[f], l._s.delete(f);
    }
    if (process.env.NODE_ENV !== "production" && ya) {
      const f = Sr();
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
function Gr(e) {
  {
    e = co(e);
    const t = {};
    for (const n in e) {
      const r = e[n];
      (Yn(r) || va(r)) && (t[n] = // ---
      Vr(e, n));
    }
    return t;
  }
}
var yu = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(hn, function() {
    var n = 1e3, r = 6e4, o = 36e5, a = "millisecond", i = "second", l = "minute", s = "hour", c = "day", u = "week", f = "month", d = "quarter", v = "year", h = "date", _ = "Invalid Date", m = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, p = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, g = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(x) {
      var N = ["th", "st", "nd", "rd"], R = x % 100;
      return "[" + x + (N[(R - 20) % 10] || N[R] || N[0]) + "]";
    } }, S = function(x, N, R) {
      var F = String(x);
      return !F || F.length >= N ? x : "" + Array(N + 1 - F.length).join(R) + x;
    }, O = { s: S, z: function(x) {
      var N = -x.utcOffset(), R = Math.abs(N), F = Math.floor(R / 60), M = R % 60;
      return (N <= 0 ? "+" : "-") + S(F, 2, "0") + ":" + S(M, 2, "0");
    }, m: function x(N, R) {
      if (N.date() < R.date())
        return -x(R, N);
      var F = 12 * (R.year() - N.year()) + (R.month() - N.month()), M = N.clone().add(F, f), G = R - M < 0, j = N.clone().add(F + (G ? -1 : 1), f);
      return +(-(F + (R - M) / (G ? M - j : j - M)) || 0);
    }, a: function(x) {
      return x < 0 ? Math.ceil(x) || 0 : Math.floor(x);
    }, p: function(x) {
      return { M: f, y: v, w: u, d: c, D: h, h: s, m: l, s: i, ms: a, Q: d }[x] || String(x || "").toLowerCase().replace(/s$/, "");
    }, u: function(x) {
      return x === void 0;
    } }, L = "en", b = {};
    b[L] = g;
    var w = "$isDayjsObject", T = function(x) {
      return x instanceof A || !(!x || !x[w]);
    }, k = function x(N, R, F) {
      var M;
      if (!N)
        return L;
      if (typeof N == "string") {
        var G = N.toLowerCase();
        b[G] && (M = G), R && (b[G] = R, M = G);
        var j = N.split("-");
        if (!M && j.length > 1)
          return x(j[0]);
      } else {
        var Q = N.name;
        b[Q] = N, M = Q;
      }
      return !F && M && (L = M), M || !F && L;
    }, y = function(x, N) {
      if (T(x))
        return x.clone();
      var R = typeof N == "object" ? N : {};
      return R.date = x, R.args = arguments, new A(R);
    }, I = O;
    I.l = k, I.i = T, I.w = function(x, N) {
      return y(x, { locale: N.$L, utc: N.$u, x: N.$x, $offset: N.$offset });
    };
    var A = function() {
      function x(R) {
        this.$L = k(R.locale, null, !0), this.parse(R), this.$x = this.$x || R.x || {}, this[w] = !0;
      }
      var N = x.prototype;
      return N.parse = function(R) {
        this.$d = function(F) {
          var M = F.date, G = F.utc;
          if (M === null)
            return /* @__PURE__ */ new Date(NaN);
          if (I.u(M))
            return /* @__PURE__ */ new Date();
          if (M instanceof Date)
            return new Date(M);
          if (typeof M == "string" && !/Z$/i.test(M)) {
            var j = M.match(m);
            if (j) {
              var Q = j[2] - 1 || 0, le = (j[7] || "0").substring(0, 3);
              return G ? new Date(Date.UTC(j[1], Q, j[3] || 1, j[4] || 0, j[5] || 0, j[6] || 0, le)) : new Date(j[1], Q, j[3] || 1, j[4] || 0, j[5] || 0, j[6] || 0, le);
            }
          }
          return new Date(M);
        }(R), this.init();
      }, N.init = function() {
        var R = this.$d;
        this.$y = R.getFullYear(), this.$M = R.getMonth(), this.$D = R.getDate(), this.$W = R.getDay(), this.$H = R.getHours(), this.$m = R.getMinutes(), this.$s = R.getSeconds(), this.$ms = R.getMilliseconds();
      }, N.$utils = function() {
        return I;
      }, N.isValid = function() {
        return this.$d.toString() !== _;
      }, N.isSame = function(R, F) {
        var M = y(R);
        return this.startOf(F) <= M && M <= this.endOf(F);
      }, N.isAfter = function(R, F) {
        return y(R) < this.startOf(F);
      }, N.isBefore = function(R, F) {
        return this.endOf(F) < y(R);
      }, N.$g = function(R, F, M) {
        return I.u(R) ? this[F] : this.set(M, R);
      }, N.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, N.valueOf = function() {
        return this.$d.getTime();
      }, N.startOf = function(R, F) {
        var M = this, G = !!I.u(F) || F, j = I.p(R), Q = function(E, D) {
          var $ = I.w(M.$u ? Date.UTC(M.$y, D, E) : new Date(M.$y, D, E), M);
          return G ? $ : $.endOf(c);
        }, le = function(E, D) {
          return I.w(M.toDate()[E].apply(M.toDate("s"), (G ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(D)), M);
        }, de = this.$W, pe = this.$M, Ce = this.$D, ee = "set" + (this.$u ? "UTC" : "");
        switch (j) {
          case v:
            return G ? Q(1, 0) : Q(31, 11);
          case f:
            return G ? Q(1, pe) : Q(0, pe + 1);
          case u:
            var Y = this.$locale().weekStart || 0, H = (de < Y ? de + 7 : de) - Y;
            return Q(G ? Ce - H : Ce + (6 - H), pe);
          case c:
          case h:
            return le(ee + "Hours", 0);
          case s:
            return le(ee + "Minutes", 1);
          case l:
            return le(ee + "Seconds", 2);
          case i:
            return le(ee + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, N.endOf = function(R) {
        return this.startOf(R, !1);
      }, N.$set = function(R, F) {
        var M, G = I.p(R), j = "set" + (this.$u ? "UTC" : ""), Q = (M = {}, M[c] = j + "Date", M[h] = j + "Date", M[f] = j + "Month", M[v] = j + "FullYear", M[s] = j + "Hours", M[l] = j + "Minutes", M[i] = j + "Seconds", M[a] = j + "Milliseconds", M)[G], le = G === c ? this.$D + (F - this.$W) : F;
        if (G === f || G === v) {
          var de = this.clone().set(h, 1);
          de.$d[Q](le), de.init(), this.$d = de.set(h, Math.min(this.$D, de.daysInMonth())).$d;
        } else
          Q && this.$d[Q](le);
        return this.init(), this;
      }, N.set = function(R, F) {
        return this.clone().$set(R, F);
      }, N.get = function(R) {
        return this[I.p(R)]();
      }, N.add = function(R, F) {
        var M, G = this;
        R = Number(R);
        var j = I.p(F), Q = function(pe) {
          var Ce = y(G);
          return I.w(Ce.date(Ce.date() + Math.round(pe * R)), G);
        };
        if (j === f)
          return this.set(f, this.$M + R);
        if (j === v)
          return this.set(v, this.$y + R);
        if (j === c)
          return Q(1);
        if (j === u)
          return Q(7);
        var le = (M = {}, M[l] = r, M[s] = o, M[i] = n, M)[j] || 1, de = this.$d.getTime() + R * le;
        return I.w(de, this);
      }, N.subtract = function(R, F) {
        return this.add(-1 * R, F);
      }, N.format = function(R) {
        var F = this, M = this.$locale();
        if (!this.isValid())
          return M.invalidDate || _;
        var G = R || "YYYY-MM-DDTHH:mm:ssZ", j = I.z(this), Q = this.$H, le = this.$m, de = this.$M, pe = M.weekdays, Ce = M.months, ee = M.meridiem, Y = function(D, $, z, C) {
          return D && (D[$] || D(F, G)) || z[$].slice(0, C);
        }, H = function(D) {
          return I.s(Q % 12 || 12, D, "0");
        }, E = ee || function(D, $, z) {
          var C = D < 12 ? "AM" : "PM";
          return z ? C.toLowerCase() : C;
        };
        return G.replace(p, function(D, $) {
          return $ || function(z) {
            switch (z) {
              case "YY":
                return String(F.$y).slice(-2);
              case "YYYY":
                return I.s(F.$y, 4, "0");
              case "M":
                return de + 1;
              case "MM":
                return I.s(de + 1, 2, "0");
              case "MMM":
                return Y(M.monthsShort, de, Ce, 3);
              case "MMMM":
                return Y(Ce, de);
              case "D":
                return F.$D;
              case "DD":
                return I.s(F.$D, 2, "0");
              case "d":
                return String(F.$W);
              case "dd":
                return Y(M.weekdaysMin, F.$W, pe, 2);
              case "ddd":
                return Y(M.weekdaysShort, F.$W, pe, 3);
              case "dddd":
                return pe[F.$W];
              case "H":
                return String(Q);
              case "HH":
                return I.s(Q, 2, "0");
              case "h":
                return H(1);
              case "hh":
                return H(2);
              case "a":
                return E(Q, le, !0);
              case "A":
                return E(Q, le, !1);
              case "m":
                return String(le);
              case "mm":
                return I.s(le, 2, "0");
              case "s":
                return String(F.$s);
              case "ss":
                return I.s(F.$s, 2, "0");
              case "SSS":
                return I.s(F.$ms, 3, "0");
              case "Z":
                return j;
            }
            return null;
          }(D) || j.replace(":", "");
        });
      }, N.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, N.diff = function(R, F, M) {
        var G, j = this, Q = I.p(F), le = y(R), de = (le.utcOffset() - this.utcOffset()) * r, pe = this - le, Ce = function() {
          return I.m(j, le);
        };
        switch (Q) {
          case v:
            G = Ce() / 12;
            break;
          case f:
            G = Ce();
            break;
          case d:
            G = Ce() / 3;
            break;
          case u:
            G = (pe - de) / 6048e5;
            break;
          case c:
            G = (pe - de) / 864e5;
            break;
          case s:
            G = pe / o;
            break;
          case l:
            G = pe / r;
            break;
          case i:
            G = pe / n;
            break;
          default:
            G = pe;
        }
        return M ? G : I.a(G);
      }, N.daysInMonth = function() {
        return this.endOf(f).$D;
      }, N.$locale = function() {
        return b[this.$L];
      }, N.locale = function(R, F) {
        if (!R)
          return this.$L;
        var M = this.clone(), G = k(R, F, !0);
        return G && (M.$L = G), M;
      }, N.clone = function() {
        return I.w(this.$d, this);
      }, N.toDate = function() {
        return new Date(this.valueOf());
      }, N.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, N.toISOString = function() {
        return this.$d.toISOString();
      }, N.toString = function() {
        return this.$d.toUTCString();
      }, x;
    }(), U = A.prototype;
    return y.prototype = U, [["$ms", a], ["$s", i], ["$m", l], ["$H", s], ["$W", c], ["$M", f], ["$y", v], ["$D", h]].forEach(function(x) {
      U[x[1]] = function(N) {
        return this.$g(N, x[0], x[1]);
      };
    }), y.extend = function(x, N) {
      return x.$i || (x(N, A, y), x.$i = !0), y;
    }, y.locale = k, y.isDayjs = T, y.unix = function(x) {
      return y(1e3 * x);
    }, y.en = b[L], y.Ls = b, y.p = {}, y;
  });
})(yu);
var nm = yu.exports;
const he = /* @__PURE__ */ po(nm);
/*!
  * shared v9.10.2
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
const Nt = typeof window < "u";
let vt, qn;
if (process.env.NODE_ENV !== "production") {
  const e = Nt && window.performance;
  e && e.mark && e.measure && e.clearMarks && // @ts-ignore browser compat
  e.clearMeasures && (vt = (t) => {
    e.mark(t);
  }, qn = (t, n, r) => {
    e.measure(t, n, r), e.clearMarks(n), e.clearMarks(r);
  });
}
const rm = /\{([0-9a-zA-Z]+)\}/g;
function Qi(e, ...t) {
  return t.length === 1 && Te(t[0]) && (t = t[0]), (!t || !t.hasOwnProperty) && (t = {}), e.replace(rm, (n, r) => t.hasOwnProperty(r) ? t[r] : "");
}
const Ut = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), om = (e, t, n) => am({ l: e, k: t, s: n }), am = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), Ke = (e) => typeof e == "number" && isFinite(e), im = (e) => Eu(e) === "[object Date]", ea = (e) => Eu(e) === "[object RegExp]", ba = (e) => be(e) && Object.keys(e).length === 0, nt = Object.assign;
let nl;
const es = () => nl || (nl = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function rl(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const sm = Object.prototype.hasOwnProperty;
function ta(e, t) {
  return sm.call(e, t);
}
const je = Array.isArray, Re = (e) => typeof e == "function", ce = (e) => typeof e == "string", $e = (e) => typeof e == "boolean", Te = (e) => e !== null && typeof e == "object", lm = (e) => Te(e) && Re(e.then) && Re(e.catch), bu = Object.prototype.toString, Eu = (e) => bu.call(e), be = (e) => {
  if (!Te(e))
    return !1;
  const t = Object.getPrototypeOf(e);
  return t === null || t.constructor === Object;
}, cm = (e) => e == null ? "" : je(e) || be(e) && e.toString === bu ? JSON.stringify(e, null, 2) : String(e);
function um(e, t = "") {
  return e.reduce((n, r, o) => o === 0 ? n + r : n + t + r, "");
}
const ol = 2;
function dm(e, t = 0, n = e.length) {
  const r = e.split(/\r?\n/);
  let o = 0;
  const a = [];
  for (let i = 0; i < r.length; i++)
    if (o += r[i].length + 1, o >= t) {
      for (let l = i - ol; l <= i + ol || n > o; l++) {
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
function ts(e) {
  let t = e;
  return () => ++t;
}
function Ft(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const al = {};
function wu(e) {
  al[e] || (al[e] = !0, Ft(e));
}
function Tu() {
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
const Ro = (e) => !Te(e) || je(e);
function qo(e, t) {
  if (Ro(e) || Ro(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: r, des: o } = n.pop();
    Object.keys(r).forEach((a) => {
      Ro(r[a]) || Ro(o[a]) ? o[a] = r[a] : n.push({ src: r[a], des: o[a] });
    });
  }
}
/*!
  * message-compiler v9.10.2
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
function fm(e, t, n) {
  return { line: e, column: t, offset: n };
}
function yi(e, t, n) {
  const r = { start: e, end: t };
  return n != null && (r.source = n), r;
}
const pm = /\{([0-9a-zA-Z]+)\}/g;
function hm(e, ...t) {
  return t.length === 1 && mm(t[0]) && (t = t[0]), (!t || !t.hasOwnProperty) && (t = {}), e.replace(pm, (n, r) => t.hasOwnProperty(r) ? t[r] : "");
}
const Cu = Object.assign, il = (e) => typeof e == "string", mm = (e) => e !== null && typeof e == "object";
function ku(e, t = "") {
  return e.reduce((n, r, o) => o === 0 ? n + r : n + t + r, "");
}
const fe = {
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
}, vm = {
  // tokenizer error messages
  [fe.EXPECTED_TOKEN]: "Expected token: '{0}'",
  [fe.INVALID_TOKEN_IN_PLACEHOLDER]: "Invalid token in placeholder: '{0}'",
  [fe.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: "Unterminated single quote in placeholder",
  [fe.UNKNOWN_ESCAPE_SEQUENCE]: "Unknown escape sequence: \\{0}",
  [fe.INVALID_UNICODE_ESCAPE_SEQUENCE]: "Invalid unicode escape sequence: {0}",
  [fe.UNBALANCED_CLOSING_BRACE]: "Unbalanced closing brace",
  [fe.UNTERMINATED_CLOSING_BRACE]: "Unterminated closing brace",
  [fe.EMPTY_PLACEHOLDER]: "Empty placeholder",
  [fe.NOT_ALLOW_NEST_PLACEHOLDER]: "Not allowed nest placeholder",
  [fe.INVALID_LINKED_FORMAT]: "Invalid linked format",
  // parser error messages
  [fe.MUST_HAVE_MESSAGES_IN_PLURAL]: "Plural must have messages",
  [fe.UNEXPECTED_EMPTY_LINKED_MODIFIER]: "Unexpected empty linked modifier",
  [fe.UNEXPECTED_EMPTY_LINKED_KEY]: "Unexpected empty linked key",
  [fe.UNEXPECTED_LEXICAL_ANALYSIS]: "Unexpected lexical analysis in token: '{0}'",
  // generator error messages
  [fe.UNHANDLED_CODEGEN_NODE_TYPE]: "unhandled codegen node type: '{0}'",
  // minimizer error messages
  [fe.UNHANDLED_MINIFIER_NODE_TYPE]: "unhandled mimifier node type: '{0}'"
};
function Ir(e, t, n = {}) {
  const { domain: r, messages: o, args: a } = n, i = hm((o || vm)[e] || "", ...a || []), l = new SyntaxError(String(i));
  return l.code = e, t && (l.location = t), l.domain = r, l;
}
function gm(e) {
  throw e;
}
const _m = /<\/?[\w\s="/.':;#-\/]+>/, ym = (e) => _m.test(e), jt = " ", bm = "\r", at = `
`, Em = "\u2028", wm = "\u2029";
function Tm(e) {
  const t = e;
  let n = 0, r = 1, o = 1, a = 0;
  const i = (w) => t[w] === bm && t[w + 1] === at, l = (w) => t[w] === at, s = (w) => t[w] === wm, c = (w) => t[w] === Em, u = (w) => i(w) || l(w) || s(w) || c(w), f = () => n, d = () => r, v = () => o, h = () => a, _ = (w) => i(w) || s(w) || c(w) ? at : t[w], m = () => _(n), p = () => _(n + a);
  function g() {
    return a = 0, u(n) && (r++, o = 0), i(n) && n++, n++, o++, t[n];
  }
  function S() {
    return i(n + a) && a++, a++, t[n + a];
  }
  function O() {
    n = 0, r = 1, o = 1, a = 0;
  }
  function L(w = 0) {
    a = w;
  }
  function b() {
    const w = n + a;
    for (; w !== n; )
      g();
    a = 0;
  }
  return {
    index: f,
    line: d,
    column: v,
    peekOffset: h,
    charAt: _,
    currentChar: m,
    currentPeek: p,
    next: g,
    peek: S,
    reset: O,
    resetPeek: L,
    skipToPeek: b
  };
}
const dn = void 0, Cm = ".", sl = "'", km = "tokenizer";
function Sm(e, t = {}) {
  const n = t.location !== !1, r = Tm(e), o = () => r.index(), a = () => fm(r.line(), r.column(), r.index()), i = a(), l = o(), s = {
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
  function f(C, P, V, ...Z) {
    const re = c();
    if (P.column += V, P.offset += V, u) {
      const ve = n ? yi(re.startLoc, P) : null, Ne = Ir(C, ve, {
        domain: km,
        args: Z
      });
      u(Ne);
    }
  }
  function d(C, P, V) {
    C.endLoc = a(), C.currentType = P;
    const Z = { type: P };
    return n && (Z.loc = yi(C.startLoc, C.endLoc)), V != null && (Z.value = V), Z;
  }
  const v = (C) => d(
    C,
    14
    /* TokenTypes.EOF */
  );
  function h(C, P) {
    return C.currentChar() === P ? (C.next(), P) : (f(fe.EXPECTED_TOKEN, a(), 0, P), "");
  }
  function _(C) {
    let P = "";
    for (; C.currentPeek() === jt || C.currentPeek() === at; )
      P += C.currentPeek(), C.peek();
    return P;
  }
  function m(C) {
    const P = _(C);
    return C.skipToPeek(), P;
  }
  function p(C) {
    if (C === dn)
      return !1;
    const P = C.charCodeAt(0);
    return P >= 97 && P <= 122 || // a-z
    P >= 65 && P <= 90 || // A-Z
    P === 95;
  }
  function g(C) {
    if (C === dn)
      return !1;
    const P = C.charCodeAt(0);
    return P >= 48 && P <= 57;
  }
  function S(C, P) {
    const { currentType: V } = P;
    if (V !== 2)
      return !1;
    _(C);
    const Z = p(C.currentPeek());
    return C.resetPeek(), Z;
  }
  function O(C, P) {
    const { currentType: V } = P;
    if (V !== 2)
      return !1;
    _(C);
    const Z = C.currentPeek() === "-" ? C.peek() : C.currentPeek(), re = g(Z);
    return C.resetPeek(), re;
  }
  function L(C, P) {
    const { currentType: V } = P;
    if (V !== 2)
      return !1;
    _(C);
    const Z = C.currentPeek() === sl;
    return C.resetPeek(), Z;
  }
  function b(C, P) {
    const { currentType: V } = P;
    if (V !== 8)
      return !1;
    _(C);
    const Z = C.currentPeek() === ".";
    return C.resetPeek(), Z;
  }
  function w(C, P) {
    const { currentType: V } = P;
    if (V !== 9)
      return !1;
    _(C);
    const Z = p(C.currentPeek());
    return C.resetPeek(), Z;
  }
  function T(C, P) {
    const { currentType: V } = P;
    if (!(V === 8 || V === 12))
      return !1;
    _(C);
    const Z = C.currentPeek() === ":";
    return C.resetPeek(), Z;
  }
  function k(C, P) {
    const { currentType: V } = P;
    if (V !== 10)
      return !1;
    const Z = () => {
      const ve = C.currentPeek();
      return ve === "{" ? p(C.peek()) : ve === "@" || ve === "%" || ve === "|" || ve === ":" || ve === "." || ve === jt || !ve ? !1 : ve === at ? (C.peek(), Z()) : p(ve);
    }, re = Z();
    return C.resetPeek(), re;
  }
  function y(C) {
    _(C);
    const P = C.currentPeek() === "|";
    return C.resetPeek(), P;
  }
  function I(C) {
    const P = _(C), V = C.currentPeek() === "%" && C.peek() === "{";
    return C.resetPeek(), {
      isModulo: V,
      hasSpace: P.length > 0
    };
  }
  function A(C, P = !0) {
    const V = (re = !1, ve = "", Ne = !1) => {
      const Le = C.currentPeek();
      return Le === "{" ? ve === "%" ? !1 : re : Le === "@" || !Le ? ve === "%" ? !0 : re : Le === "%" ? (C.peek(), V(re, "%", !0)) : Le === "|" ? ve === "%" || Ne ? !0 : !(ve === jt || ve === at) : Le === jt ? (C.peek(), V(!0, jt, Ne)) : Le === at ? (C.peek(), V(!0, at, Ne)) : !0;
    }, Z = V();
    return P && C.resetPeek(), Z;
  }
  function U(C, P) {
    const V = C.currentChar();
    return V === dn ? dn : P(V) ? (C.next(), V) : null;
  }
  function x(C) {
    return U(C, (V) => {
      const Z = V.charCodeAt(0);
      return Z >= 97 && Z <= 122 || // a-z
      Z >= 65 && Z <= 90 || // A-Z
      Z >= 48 && Z <= 57 || // 0-9
      Z === 95 || // _
      Z === 36;
    });
  }
  function N(C) {
    return U(C, (V) => {
      const Z = V.charCodeAt(0);
      return Z >= 48 && Z <= 57;
    });
  }
  function R(C) {
    return U(C, (V) => {
      const Z = V.charCodeAt(0);
      return Z >= 48 && Z <= 57 || // 0-9
      Z >= 65 && Z <= 70 || // A-F
      Z >= 97 && Z <= 102;
    });
  }
  function F(C) {
    let P = "", V = "";
    for (; P = N(C); )
      V += P;
    return V;
  }
  function M(C) {
    m(C);
    const P = C.currentChar();
    return P !== "%" && f(fe.EXPECTED_TOKEN, a(), 0, P), C.next(), "%";
  }
  function G(C) {
    let P = "";
    for (; ; ) {
      const V = C.currentChar();
      if (V === "{" || V === "}" || V === "@" || V === "|" || !V)
        break;
      if (V === "%")
        if (A(C))
          P += V, C.next();
        else
          break;
      else if (V === jt || V === at)
        if (A(C))
          P += V, C.next();
        else {
          if (y(C))
            break;
          P += V, C.next();
        }
      else
        P += V, C.next();
    }
    return P;
  }
  function j(C) {
    m(C);
    let P = "", V = "";
    for (; P = x(C); )
      V += P;
    return C.currentChar() === dn && f(fe.UNTERMINATED_CLOSING_BRACE, a(), 0), V;
  }
  function Q(C) {
    m(C);
    let P = "";
    return C.currentChar() === "-" ? (C.next(), P += `-${F(C)}`) : P += F(C), C.currentChar() === dn && f(fe.UNTERMINATED_CLOSING_BRACE, a(), 0), P;
  }
  function le(C) {
    m(C), h(C, "'");
    let P = "", V = "";
    const Z = (ve) => ve !== sl && ve !== at;
    for (; P = U(C, Z); )
      P === "\\" ? V += de(C) : V += P;
    const re = C.currentChar();
    return re === at || re === dn ? (f(fe.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, a(), 0), re === at && (C.next(), h(C, "'")), V) : (h(C, "'"), V);
  }
  function de(C) {
    const P = C.currentChar();
    switch (P) {
      case "\\":
      case "'":
        return C.next(), `\\${P}`;
      case "u":
        return pe(C, P, 4);
      case "U":
        return pe(C, P, 6);
      default:
        return f(fe.UNKNOWN_ESCAPE_SEQUENCE, a(), 0, P), "";
    }
  }
  function pe(C, P, V) {
    h(C, P);
    let Z = "";
    for (let re = 0; re < V; re++) {
      const ve = R(C);
      if (!ve) {
        f(fe.INVALID_UNICODE_ESCAPE_SEQUENCE, a(), 0, `\\${P}${Z}${C.currentChar()}`);
        break;
      }
      Z += ve;
    }
    return `\\${P}${Z}`;
  }
  function Ce(C) {
    m(C);
    let P = "", V = "";
    const Z = (re) => re !== "{" && re !== "}" && re !== jt && re !== at;
    for (; P = U(C, Z); )
      V += P;
    return V;
  }
  function ee(C) {
    let P = "", V = "";
    for (; P = x(C); )
      V += P;
    return V;
  }
  function Y(C) {
    const P = (V = !1, Z) => {
      const re = C.currentChar();
      return re === "{" || re === "%" || re === "@" || re === "|" || re === "(" || re === ")" || !re || re === jt ? Z : re === at || re === Cm ? (Z += re, C.next(), P(V, Z)) : (Z += re, C.next(), P(!0, Z));
    };
    return P(!1, "");
  }
  function H(C) {
    m(C);
    const P = h(
      C,
      "|"
      /* TokenChars.Pipe */
    );
    return m(C), P;
  }
  function E(C, P) {
    let V = null;
    switch (C.currentChar()) {
      case "{":
        return P.braceNest >= 1 && f(fe.NOT_ALLOW_NEST_PLACEHOLDER, a(), 0), C.next(), V = d(
          P,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), m(C), P.braceNest++, V;
      case "}":
        return P.braceNest > 0 && P.currentType === 2 && f(fe.EMPTY_PLACEHOLDER, a(), 0), C.next(), V = d(
          P,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), P.braceNest--, P.braceNest > 0 && m(C), P.inLinked && P.braceNest === 0 && (P.inLinked = !1), V;
      case "@":
        return P.braceNest > 0 && f(fe.UNTERMINATED_CLOSING_BRACE, a(), 0), V = D(C, P) || v(P), P.braceNest = 0, V;
      default: {
        let re = !0, ve = !0, Ne = !0;
        if (y(C))
          return P.braceNest > 0 && f(fe.UNTERMINATED_CLOSING_BRACE, a(), 0), V = d(P, 1, H(C)), P.braceNest = 0, P.inLinked = !1, V;
        if (P.braceNest > 0 && (P.currentType === 5 || P.currentType === 6 || P.currentType === 7))
          return f(fe.UNTERMINATED_CLOSING_BRACE, a(), 0), P.braceNest = 0, $(C, P);
        if (re = S(C, P))
          return V = d(P, 5, j(C)), m(C), V;
        if (ve = O(C, P))
          return V = d(P, 6, Q(C)), m(C), V;
        if (Ne = L(C, P))
          return V = d(P, 7, le(C)), m(C), V;
        if (!re && !ve && !Ne)
          return V = d(P, 13, Ce(C)), f(fe.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, V.value), m(C), V;
        break;
      }
    }
    return V;
  }
  function D(C, P) {
    const { currentType: V } = P;
    let Z = null;
    const re = C.currentChar();
    switch ((V === 8 || V === 9 || V === 12 || V === 10) && (re === at || re === jt) && f(fe.INVALID_LINKED_FORMAT, a(), 0), re) {
      case "@":
        return C.next(), Z = d(
          P,
          8,
          "@"
          /* TokenChars.LinkedAlias */
        ), P.inLinked = !0, Z;
      case ".":
        return m(C), C.next(), d(
          P,
          9,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return m(C), C.next(), d(
          P,
          10,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return y(C) ? (Z = d(P, 1, H(C)), P.braceNest = 0, P.inLinked = !1, Z) : b(C, P) || T(C, P) ? (m(C), D(C, P)) : w(C, P) ? (m(C), d(P, 12, ee(C))) : k(C, P) ? (m(C), re === "{" ? E(C, P) || Z : d(P, 11, Y(C))) : (V === 8 && f(fe.INVALID_LINKED_FORMAT, a(), 0), P.braceNest = 0, P.inLinked = !1, $(C, P));
    }
  }
  function $(C, P) {
    let V = {
      type: 14
      /* TokenTypes.EOF */
    };
    if (P.braceNest > 0)
      return E(C, P) || v(P);
    if (P.inLinked)
      return D(C, P) || v(P);
    switch (C.currentChar()) {
      case "{":
        return E(C, P) || v(P);
      case "}":
        return f(fe.UNBALANCED_CLOSING_BRACE, a(), 0), C.next(), d(
          P,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return D(C, P) || v(P);
      default: {
        if (y(C))
          return V = d(P, 1, H(C)), P.braceNest = 0, P.inLinked = !1, V;
        const { isModulo: re, hasSpace: ve } = I(C);
        if (re)
          return ve ? d(P, 0, G(C)) : d(P, 4, M(C));
        if (A(C))
          return d(P, 0, G(C));
        break;
      }
    }
    return V;
  }
  function z() {
    const { currentType: C, offset: P, startLoc: V, endLoc: Z } = s;
    return s.lastType = C, s.lastOffset = P, s.lastStartLoc = V, s.lastEndLoc = Z, s.offset = o(), s.startLoc = a(), r.currentChar() === dn ? d(
      s,
      14
      /* TokenTypes.EOF */
    ) : $(r, s);
  }
  return {
    nextToken: z,
    currentOffset: o,
    currentPosition: a,
    context: c
  };
}
const Im = "parser", Dm = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function Om(e, t, n) {
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
function Pm(e = {}) {
  const t = e.location !== !1, { onError: n } = e;
  function r(p, g, S, O, ...L) {
    const b = p.currentPosition();
    if (b.offset += O, b.column += O, n) {
      const w = t ? yi(S, b) : null, T = Ir(g, w, {
        domain: Im,
        args: L
      });
      n(T);
    }
  }
  function o(p, g, S) {
    const O = { type: p };
    return t && (O.start = g, O.end = g, O.loc = { start: S, end: S }), O;
  }
  function a(p, g, S, O) {
    O && (p.type = O), t && (p.end = g, p.loc && (p.loc.end = S));
  }
  function i(p, g) {
    const S = p.context(), O = o(3, S.offset, S.startLoc);
    return O.value = g, a(O, p.currentOffset(), p.currentPosition()), O;
  }
  function l(p, g) {
    const S = p.context(), { lastOffset: O, lastStartLoc: L } = S, b = o(5, O, L);
    return b.index = parseInt(g, 10), p.nextToken(), a(b, p.currentOffset(), p.currentPosition()), b;
  }
  function s(p, g) {
    const S = p.context(), { lastOffset: O, lastStartLoc: L } = S, b = o(4, O, L);
    return b.key = g, p.nextToken(), a(b, p.currentOffset(), p.currentPosition()), b;
  }
  function c(p, g) {
    const S = p.context(), { lastOffset: O, lastStartLoc: L } = S, b = o(9, O, L);
    return b.value = g.replace(Dm, Om), p.nextToken(), a(b, p.currentOffset(), p.currentPosition()), b;
  }
  function u(p) {
    const g = p.nextToken(), S = p.context(), { lastOffset: O, lastStartLoc: L } = S, b = o(8, O, L);
    return g.type !== 12 ? (r(p, fe.UNEXPECTED_EMPTY_LINKED_MODIFIER, S.lastStartLoc, 0), b.value = "", a(b, O, L), {
      nextConsumeToken: g,
      node: b
    }) : (g.value == null && r(p, fe.UNEXPECTED_LEXICAL_ANALYSIS, S.lastStartLoc, 0, Rt(g)), b.value = g.value || "", a(b, p.currentOffset(), p.currentPosition()), {
      node: b
    });
  }
  function f(p, g) {
    const S = p.context(), O = o(7, S.offset, S.startLoc);
    return O.value = g, a(O, p.currentOffset(), p.currentPosition()), O;
  }
  function d(p) {
    const g = p.context(), S = o(6, g.offset, g.startLoc);
    let O = p.nextToken();
    if (O.type === 9) {
      const L = u(p);
      S.modifier = L.node, O = L.nextConsumeToken || p.nextToken();
    }
    switch (O.type !== 10 && r(p, fe.UNEXPECTED_LEXICAL_ANALYSIS, g.lastStartLoc, 0, Rt(O)), O = p.nextToken(), O.type === 2 && (O = p.nextToken()), O.type) {
      case 11:
        O.value == null && r(p, fe.UNEXPECTED_LEXICAL_ANALYSIS, g.lastStartLoc, 0, Rt(O)), S.key = f(p, O.value || "");
        break;
      case 5:
        O.value == null && r(p, fe.UNEXPECTED_LEXICAL_ANALYSIS, g.lastStartLoc, 0, Rt(O)), S.key = s(p, O.value || "");
        break;
      case 6:
        O.value == null && r(p, fe.UNEXPECTED_LEXICAL_ANALYSIS, g.lastStartLoc, 0, Rt(O)), S.key = l(p, O.value || "");
        break;
      case 7:
        O.value == null && r(p, fe.UNEXPECTED_LEXICAL_ANALYSIS, g.lastStartLoc, 0, Rt(O)), S.key = c(p, O.value || "");
        break;
      default: {
        r(p, fe.UNEXPECTED_EMPTY_LINKED_KEY, g.lastStartLoc, 0);
        const L = p.context(), b = o(7, L.offset, L.startLoc);
        return b.value = "", a(b, L.offset, L.startLoc), S.key = b, a(S, L.offset, L.startLoc), {
          nextConsumeToken: O,
          node: S
        };
      }
    }
    return a(S, p.currentOffset(), p.currentPosition()), {
      node: S
    };
  }
  function v(p) {
    const g = p.context(), S = g.currentType === 1 ? p.currentOffset() : g.offset, O = g.currentType === 1 ? g.endLoc : g.startLoc, L = o(2, S, O);
    L.items = [];
    let b = null;
    do {
      const k = b || p.nextToken();
      switch (b = null, k.type) {
        case 0:
          k.value == null && r(p, fe.UNEXPECTED_LEXICAL_ANALYSIS, g.lastStartLoc, 0, Rt(k)), L.items.push(i(p, k.value || ""));
          break;
        case 6:
          k.value == null && r(p, fe.UNEXPECTED_LEXICAL_ANALYSIS, g.lastStartLoc, 0, Rt(k)), L.items.push(l(p, k.value || ""));
          break;
        case 5:
          k.value == null && r(p, fe.UNEXPECTED_LEXICAL_ANALYSIS, g.lastStartLoc, 0, Rt(k)), L.items.push(s(p, k.value || ""));
          break;
        case 7:
          k.value == null && r(p, fe.UNEXPECTED_LEXICAL_ANALYSIS, g.lastStartLoc, 0, Rt(k)), L.items.push(c(p, k.value || ""));
          break;
        case 8: {
          const y = d(p);
          L.items.push(y.node), b = y.nextConsumeToken || null;
          break;
        }
      }
    } while (g.currentType !== 14 && g.currentType !== 1);
    const w = g.currentType === 1 ? g.lastOffset : p.currentOffset(), T = g.currentType === 1 ? g.lastEndLoc : p.currentPosition();
    return a(L, w, T), L;
  }
  function h(p, g, S, O) {
    const L = p.context();
    let b = O.items.length === 0;
    const w = o(1, g, S);
    w.cases = [], w.cases.push(O);
    do {
      const T = v(p);
      b || (b = T.items.length === 0), w.cases.push(T);
    } while (L.currentType !== 14);
    return b && r(p, fe.MUST_HAVE_MESSAGES_IN_PLURAL, S, 0), a(w, p.currentOffset(), p.currentPosition()), w;
  }
  function _(p) {
    const g = p.context(), { offset: S, startLoc: O } = g, L = v(p);
    return g.currentType === 14 ? L : h(p, S, O, L);
  }
  function m(p) {
    const g = Sm(p, Cu({}, e)), S = g.context(), O = o(0, S.offset, S.startLoc);
    return t && O.loc && (O.loc.source = p), O.body = _(g), e.onCacheKey && (O.cacheKey = e.onCacheKey(p)), S.currentType !== 14 && r(g, fe.UNEXPECTED_LEXICAL_ANALYSIS, S.lastStartLoc, 0, p[S.offset] || ""), a(O, g.currentOffset(), g.currentPosition()), O;
  }
  return { parse: m };
}
function Rt(e) {
  if (e.type === 14)
    return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function Am(e, t = {}) {
  const n = {
    ast: e,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => n, helper: (a) => (n.helpers.add(a), a) };
}
function ll(e, t) {
  for (let n = 0; n < e.length; n++)
    ns(e[n], t);
}
function ns(e, t) {
  switch (e.type) {
    case 1:
      ll(e.cases, t), t.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      ll(e.items, t);
      break;
    case 6: {
      ns(e.key, t), t.helper(
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
function Nm(e, t = {}) {
  const n = Am(e);
  n.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), e.body && ns(e.body, n);
  const r = n.context();
  e.helpers = Array.from(r.helpers);
}
function Lm(e) {
  const t = e.body;
  return t.type === 2 ? cl(t) : t.cases.forEach((n) => cl(n)), e;
}
function cl(e) {
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
      e.static = ku(t);
      for (let n = 0; n < e.items.length; n++) {
        const r = e.items[n];
        (r.type === 3 || r.type === 9) && delete r.value;
      }
    }
  }
}
const Rm = "minifier";
function nr(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      nr(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let r = 0; r < n.length; r++)
        nr(n[r]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let r = 0; r < n.length; r++)
        nr(n[r]);
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
      nr(t.key), t.k = t.key, delete t.key, t.modifier && (nr(t.modifier), t.m = t.modifier, delete t.modifier);
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
      throw Ir(fe.UNHANDLED_MINIFIER_NODE_TYPE, null, {
        domain: Rm,
        args: [e.type]
      });
  }
  delete e.type;
}
const $m = "parser";
function Mm(e, t) {
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
  function c(m, p) {
    l.code += m;
  }
  function u(m, p = !0) {
    const g = p ? o : "";
    c(a ? g + "  ".repeat(m) : g);
  }
  function f(m = !0) {
    const p = ++l.indentLevel;
    m && u(p);
  }
  function d(m = !0) {
    const p = --l.indentLevel;
    m && u(p);
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
function xm(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), vr(e, t.key), t.modifier ? (e.push(", "), vr(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function Bm(e, t) {
  const { helper: n, needIndent: r } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(r());
  const o = t.items.length;
  for (let a = 0; a < o && (vr(e, t.items[a]), a !== o - 1); a++)
    e.push(", ");
  e.deindent(r()), e.push("])");
}
function Vm(e, t) {
  const { helper: n, needIndent: r } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(r());
    const o = t.cases.length;
    for (let a = 0; a < o && (vr(e, t.cases[a]), a !== o - 1); a++)
      e.push(", ");
    e.deindent(r()), e.push("])");
  }
}
function Um(e, t) {
  t.body ? vr(e, t.body) : e.push("null");
}
function vr(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      Um(e, t);
      break;
    case 1:
      Vm(e, t);
      break;
    case 2:
      Bm(e, t);
      break;
    case 6:
      xm(e, t);
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
      throw Ir(fe.UNHANDLED_CODEGEN_NODE_TYPE, null, {
        domain: $m,
        args: [t.type]
      });
  }
}
const Fm = (e, t = {}) => {
  const n = il(t.mode) ? t.mode : "normal", r = il(t.filename) ? t.filename : "message.intl", o = !!t.sourceMap, a = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, i = t.needIndent ? t.needIndent : n !== "arrow", l = e.helpers || [], s = Mm(e, {
    mode: n,
    filename: r,
    sourceMap: o,
    breakLineCode: a,
    needIndent: i
  });
  s.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), s.indent(i), l.length > 0 && (s.push(`const { ${ku(l.map((f) => `${f}: _${f}`), ", ")} } = ctx`), s.newline()), s.push("return "), vr(s, e), s.deindent(i), s.push("}"), delete e.helpers;
  const { code: c, map: u } = s.context();
  return {
    ast: e,
    code: c,
    map: u ? u.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function Hm(e, t = {}) {
  const n = Cu({}, t), r = !!n.jit, o = !!n.minify, a = n.optimize == null ? !0 : n.optimize, l = Pm(n).parse(e);
  return r ? (a && Lm(l), o && nr(l), { ast: l, code: "" }) : (Nm(l, n), Fm(l, n));
}
/*!
  * core-base v9.10.2
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
function Ym() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (es().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const In = [];
In[
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
In[
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
In[
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
In[
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
In[
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
In[
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
In[
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
const jm = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function Wm(e) {
  return jm.test(e);
}
function qm(e) {
  const t = e.charCodeAt(0), n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function Gm(e) {
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
function zm(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : Wm(t) ? qm(t) : "*" + t;
}
function Xm(e) {
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
      if (o = 0, i === void 0 || (i = zm(i), i === !1))
        return !1;
      d[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function v() {
    const h = e[n + 1];
    if (r === 5 && h === "'" || r === 6 && h === '"')
      return n++, l = "\\" + h, d[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; r !== null; )
    if (n++, a = e[n], !(a === "\\" && v())) {
      if (s = Gm(a), f = In[r], c = f[s] || f.l || 8, c === 8 || (r = c[0], c[1] !== void 0 && (u = d[c[1]], u && (l = a, u() === !1))))
        return;
      if (r === 7)
        return t;
    }
}
const ul = /* @__PURE__ */ new Map();
function Km(e, t) {
  return Te(e) ? e[t] : null;
}
function Jm(e, t) {
  if (!Te(e))
    return null;
  let n = ul.get(t);
  if (n || (n = Xm(t), n && ul.set(t, n)), !n)
    return null;
  const r = n.length;
  let o = e, a = 0;
  for (; a < r; ) {
    const i = o[n[a]];
    if (i === void 0 || Re(o))
      return null;
    o = i, a++;
  }
  return o;
}
const Zm = (e) => e, Qm = (e) => "", ev = "text", tv = (e) => e.length === 0 ? "" : um(e), nv = cm;
function dl(e, t) {
  return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function rv(e) {
  const t = Ke(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (Ke(e.named.count) || Ke(e.named.n)) ? Ke(e.named.count) ? e.named.count : Ke(e.named.n) ? e.named.n : t : t;
}
function ov(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function av(e = {}) {
  const t = e.locale, n = rv(e), r = Te(e.pluralRules) && ce(t) && Re(e.pluralRules[t]) ? e.pluralRules[t] : dl, o = Te(e.pluralRules) && ce(t) && Re(e.pluralRules[t]) ? dl : void 0, a = (p) => p[r(n, p.length, o)], i = e.list || [], l = (p) => i[p], s = e.named || {};
  Ke(e.pluralIndex) && ov(n, s);
  const c = (p) => s[p];
  function u(p) {
    const g = Re(e.messages) ? e.messages(p) : Te(e.messages) ? e.messages[p] : !1;
    return g || (e.parent ? e.parent.message(p) : Qm);
  }
  const f = (p) => e.modifiers ? e.modifiers[p] : Zm, d = be(e.processor) && Re(e.processor.normalize) ? e.processor.normalize : tv, v = be(e.processor) && Re(e.processor.interpolate) ? e.processor.interpolate : nv, h = be(e.processor) && ce(e.processor.type) ? e.processor.type : ev, m = {
    list: l,
    named: c,
    plural: a,
    linked: (p, ...g) => {
      const [S, O] = g;
      let L = "text", b = "";
      g.length === 1 ? Te(S) ? (b = S.modifier || b, L = S.type || L) : ce(S) && (b = S || b) : g.length === 2 && (ce(S) && (b = S || b), ce(O) && (L = O || L));
      const w = u(p)(m), T = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        L === "vnode" && je(w) && b ? w[0] : w
      );
      return b ? f(b)(T, L) : T;
    },
    message: u,
    type: h,
    interpolate: v,
    normalize: d,
    values: nt({}, i, s)
  };
  return m;
}
let zr = null;
function iv(e) {
  zr = e;
}
function sv(e, t, n) {
  zr && zr.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
const lv = /* @__PURE__ */ cv(
  "function:translate"
  /* IntlifyDevToolsHooks.FunctionTranslate */
);
function cv(e) {
  return (t) => zr && zr.emit(e, t);
}
const it = {
  NOT_FOUND_KEY: 1,
  FALLBACK_TO_TRANSLATE: 2,
  CANNOT_FORMAT_NUMBER: 3,
  FALLBACK_TO_NUMBER_FORMAT: 4,
  CANNOT_FORMAT_DATE: 5,
  FALLBACK_TO_DATE_FORMAT: 6,
  EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7,
  __EXTEND_POINT__: 8
}, uv = {
  [it.NOT_FOUND_KEY]: "Not found '{key}' key in '{locale}' locale messages.",
  [it.FALLBACK_TO_TRANSLATE]: "Fall back to translate '{key}' key with '{target}' locale.",
  [it.CANNOT_FORMAT_NUMBER]: "Cannot format a number value due to not supported Intl.NumberFormat.",
  [it.FALLBACK_TO_NUMBER_FORMAT]: "Fall back to number format '{key}' key with '{target}' locale.",
  [it.CANNOT_FORMAT_DATE]: "Cannot format a date value due to not supported Intl.DateTimeFormat.",
  [it.FALLBACK_TO_DATE_FORMAT]: "Fall back to datetime format '{key}' key with '{target}' locale.",
  [it.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER]: "This project is using Custom Message Compiler, which is an experimental feature. It may receive breaking changes or be removed in the future."
};
function Gn(e, ...t) {
  return Qi(uv[e], ...t);
}
const Su = fe.__EXTEND_POINT__, Rn = ts(Su), Ze = {
  INVALID_ARGUMENT: Su,
  // 18
  INVALID_DATE_ARGUMENT: Rn(),
  // 19
  INVALID_ISO_DATE_ARGUMENT: Rn(),
  // 20
  NOT_SUPPORT_NON_STRING_MESSAGE: Rn(),
  // 21
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: Rn(),
  // 22
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: Rn(),
  // 23
  NOT_SUPPORT_LOCALE_TYPE: Rn(),
  // 24
  __EXTEND_POINT__: Rn()
  // 25
};
function Kt(e) {
  return Ir(e, null, process.env.NODE_ENV !== "production" ? { messages: dv } : void 0);
}
const dv = {
  [Ze.INVALID_ARGUMENT]: "Invalid arguments",
  [Ze.INVALID_DATE_ARGUMENT]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
  [Ze.INVALID_ISO_DATE_ARGUMENT]: "The argument provided is not a valid ISO date string",
  [Ze.NOT_SUPPORT_NON_STRING_MESSAGE]: "Not support non-string message",
  [Ze.NOT_SUPPORT_LOCALE_PROMISE_VALUE]: "cannot support promise value",
  [Ze.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION]: "cannot support async function",
  [Ze.NOT_SUPPORT_LOCALE_TYPE]: "cannot support locale type"
};
function rs(e, t) {
  return t.locale != null ? fl(t.locale) : fl(e.locale);
}
let za;
function fl(e) {
  if (ce(e))
    return e;
  if (Re(e)) {
    if (e.resolvedOnce && za != null)
      return za;
    if (e.constructor.name === "Function") {
      const t = e();
      if (lm(t))
        throw Kt(Ze.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return za = t;
    } else
      throw Kt(Ze.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw Kt(Ze.NOT_SUPPORT_LOCALE_TYPE);
}
function fv(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...je(t) ? t : Te(t) ? Object.keys(t) : ce(t) ? [t] : [n]
  ])];
}
function Iu(e, t, n) {
  const r = ce(n) ? n : na, o = e;
  o.__localeChainCache || (o.__localeChainCache = /* @__PURE__ */ new Map());
  let a = o.__localeChainCache.get(r);
  if (!a) {
    a = [];
    let i = [n];
    for (; je(i); )
      i = pl(a, i, t);
    const l = je(t) || !be(t) ? t : t.default ? t.default : null;
    i = ce(l) ? [l] : l, je(i) && pl(a, i, !1), o.__localeChainCache.set(r, a);
  }
  return a;
}
function pl(e, t, n) {
  let r = !0;
  for (let o = 0; o < t.length && $e(r); o++) {
    const a = t[o];
    ce(a) && (r = pv(e, t[o], n));
  }
  return r;
}
function pv(e, t, n) {
  let r;
  const o = t.split("-");
  do {
    const a = o.join("-");
    r = hv(e, a, n), o.splice(-1, 1);
  } while (o.length && r === !0);
  return r;
}
function hv(e, t, n) {
  let r = !1;
  if (!e.includes(t) && (r = !0, t)) {
    r = t[t.length - 1] !== "!";
    const o = t.replace(/!/g, "");
    e.push(o), (je(n) || be(n)) && n[o] && (r = n[o]);
  }
  return r;
}
const mv = "9.10.2", Ea = -1, na = "en-US", ra = "", hl = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function vv() {
  return {
    upper: (e, t) => t === "text" && ce(e) ? e.toUpperCase() : t === "vnode" && Te(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && ce(e) ? e.toLowerCase() : t === "vnode" && Te(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && ce(e) ? hl(e) : t === "vnode" && Te(e) && "__v_isVNode" in e ? hl(e.children) : e
  };
}
let Du;
function gv(e) {
  Du = e;
}
let Ou;
function _v(e) {
  Ou = e;
}
let Pu;
function yv(e) {
  Pu = e;
}
let Au = null;
const bv = /* @__NO_SIDE_EFFECTS__ */ (e) => {
  Au = e;
}, Ev = /* @__NO_SIDE_EFFECTS__ */ () => Au;
let Nu = null;
const ml = (e) => {
  Nu = e;
}, wv = () => Nu;
let vl = 0;
function Tv(e = {}) {
  const t = Re(e.onWarn) ? e.onWarn : Ft, n = ce(e.version) ? e.version : mv, r = ce(e.locale) || Re(e.locale) ? e.locale : na, o = Re(r) ? na : r, a = je(e.fallbackLocale) || be(e.fallbackLocale) || ce(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : o, i = be(e.messages) ? e.messages : { [o]: {} }, l = be(e.datetimeFormats) ? e.datetimeFormats : { [o]: {} }, s = be(e.numberFormats) ? e.numberFormats : { [o]: {} }, c = nt({}, e.modifiers || {}, vv()), u = e.pluralRules || {}, f = Re(e.missing) ? e.missing : null, d = $e(e.missingWarn) || ea(e.missingWarn) ? e.missingWarn : !0, v = $e(e.fallbackWarn) || ea(e.fallbackWarn) ? e.fallbackWarn : !0, h = !!e.fallbackFormat, _ = !!e.unresolving, m = Re(e.postTranslation) ? e.postTranslation : null, p = be(e.processor) ? e.processor : null, g = $e(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, S = !!e.escapeParameter, O = Re(e.messageCompiler) ? e.messageCompiler : Du;
  process.env.NODE_ENV !== "production" && Re(e.messageCompiler) && wu(Gn(it.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER));
  const L = Re(e.messageResolver) ? e.messageResolver : Ou || Km, b = Re(e.localeFallbacker) ? e.localeFallbacker : Pu || fv, w = Te(e.fallbackContext) ? e.fallbackContext : void 0, T = e, k = Te(T.__datetimeFormatters) ? T.__datetimeFormatters : /* @__PURE__ */ new Map(), y = Te(T.__numberFormatters) ? T.__numberFormatters : /* @__PURE__ */ new Map(), I = Te(T.__meta) ? T.__meta : {};
  vl++;
  const A = {
    version: n,
    cid: vl,
    locale: r,
    fallbackLocale: a,
    messages: i,
    modifiers: c,
    pluralRules: u,
    missing: f,
    missingWarn: d,
    fallbackWarn: v,
    fallbackFormat: h,
    unresolving: _,
    postTranslation: m,
    processor: p,
    warnHtmlMessage: g,
    escapeParameter: S,
    messageCompiler: O,
    messageResolver: L,
    localeFallbacker: b,
    fallbackContext: w,
    onWarn: t,
    __meta: I
  };
  return A.datetimeFormats = l, A.numberFormats = s, A.__datetimeFormatters = k, A.__numberFormatters = y, process.env.NODE_ENV !== "production" && (A.__v_emitter = T.__v_emitter != null ? T.__v_emitter : void 0), (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) && sv(A, n, I), A;
}
function wa(e, t) {
  return e instanceof RegExp ? e.test(t) : e;
}
function Lu(e, t) {
  return e instanceof RegExp ? e.test(t) : e;
}
function os(e, t, n, r, o) {
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
    return process.env.NODE_ENV !== "production" && Lu(r, t) && i(Gn(it.NOT_FOUND_KEY, { key: t, locale: n })), t;
}
function Lr(e, t, n) {
  const r = e;
  r.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function Xa(e) {
  return (n) => Cv(n, e);
}
function Cv(e, t) {
  const n = t.b || t.body;
  if ((n.t || n.type) === 1) {
    const r = n, o = r.c || r.cases;
    return e.plural(o.reduce((a, i) => [
      ...a,
      gl(e, i)
    ], []));
  } else
    return gl(e, n);
}
function gl(e, t) {
  const n = t.s || t.static;
  if (n)
    return e.type === "text" ? n : e.normalize([n]);
  {
    const r = (t.i || t.items).reduce((o, a) => [...o, bi(e, a)], []);
    return e.normalize(r);
  }
}
function bi(e, t) {
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
      return e.linked(bi(e, r.k || r.key), o ? bi(e, o) : void 0, e.type);
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
const kv = "Detected HTML in '{source}' message. Recommend not using HTML messages to avoid XSS.";
function Sv(e, t) {
  t && ym(e) && Ft(Qi(kv, { source: e }));
}
const Iv = (e) => e;
let $o = /* @__PURE__ */ Object.create(null);
const yn = (e) => Te(e) && (e.t === 0 || e.type === 0) && ("b" in e || "body" in e);
function Dv(e, t = {}) {
  let n = !1;
  const r = t.onError || gm;
  return t.onError = (o) => {
    n = !0, r(o);
  }, { ...Hm(e, t), detectError: n };
}
function Ov(e, t) {
  if (ce(e)) {
    const n = $e(t.warnHtmlMessage) ? t.warnHtmlMessage : !0;
    process.env.NODE_ENV !== "production" && Sv(e, n);
    const o = (t.onCacheKey || Iv)(e), a = $o[o];
    if (a)
      return a;
    const { ast: i, detectError: l } = Dv(e, {
      ...t,
      location: process.env.NODE_ENV !== "production",
      jit: !0
    }), s = Xa(i);
    return l ? s : $o[o] = s;
  } else {
    if (process.env.NODE_ENV !== "production" && !yn(e))
      return Ft(`the message that is resolve with key '${t.key}' is not supported for jit compilation`), () => e;
    const n = e.cacheKey;
    if (n) {
      const r = $o[n];
      return r || ($o[n] = Xa(e));
    } else
      return Xa(e);
  }
}
const _l = () => "", bt = (e) => Re(e);
function yl(e, ...t) {
  const { fallbackFormat: n, postTranslation: r, unresolving: o, messageCompiler: a, fallbackLocale: i, messages: l } = e, [s, c] = Ei(...t), u = $e(c.missingWarn) ? c.missingWarn : e.missingWarn, f = $e(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn, d = $e(c.escapeParameter) ? c.escapeParameter : e.escapeParameter, v = !!c.resolvedMessage, h = ce(c.default) || $e(c.default) ? $e(c.default) ? a ? s : () => s : c.default : n ? a ? s : () => s : "", _ = n || h !== "", m = rs(e, c);
  d && Pv(c);
  let [p, g, S] = v ? [
    s,
    m,
    l[m] || {}
  ] : Ru(e, s, m, i, f, u), O = p, L = s;
  if (!v && !(ce(O) || yn(O) || bt(O)) && _ && (O = h, L = O), !v && (!(ce(O) || yn(O) || bt(O)) || !ce(g)))
    return o ? Ea : s;
  if (process.env.NODE_ENV !== "production" && ce(O) && e.messageCompiler == null)
    return Ft(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${s}'.`), s;
  let b = !1;
  const w = () => {
    b = !0;
  }, T = bt(O) ? O : $u(e, s, g, O, L, w);
  if (b)
    return O;
  const k = Rv(e, g, S, c), y = av(k), I = Av(e, T, y), A = r ? r(I, s) : I;
  if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
    const U = {
      timestamp: Date.now(),
      key: ce(s) ? s : bt(O) ? O.key : "",
      locale: g || (bt(O) ? O.locale : ""),
      format: ce(O) ? O : bt(O) ? O.source : "",
      message: A
    };
    U.meta = nt({}, e.__meta, /* @__PURE__ */ Ev() || {}), lv(U);
  }
  return A;
}
function Pv(e) {
  je(e.list) ? e.list = e.list.map((t) => ce(t) ? rl(t) : t) : Te(e.named) && Object.keys(e.named).forEach((t) => {
    ce(e.named[t]) && (e.named[t] = rl(e.named[t]));
  });
}
function Ru(e, t, n, r, o, a) {
  const { messages: i, onWarn: l, messageResolver: s, localeFallbacker: c } = e, u = c(e, r, n);
  let f = {}, d, v = null, h = n, _ = null;
  const m = "translate";
  for (let p = 0; p < u.length; p++) {
    if (d = _ = u[p], process.env.NODE_ENV !== "production" && n !== d && wa(o, t) && l(Gn(it.FALLBACK_TO_TRANSLATE, {
      key: t,
      target: d
    })), process.env.NODE_ENV !== "production" && n !== d) {
      const b = e.__v_emitter;
      b && b.emit("fallback", {
        type: m,
        key: t,
        from: h,
        to: _,
        groupId: `${m}:${t}`
      });
    }
    f = i[d] || {};
    let g = null, S, O;
    if (process.env.NODE_ENV !== "production" && Nt && (g = window.performance.now(), S = "intlify-message-resolve-start", O = "intlify-message-resolve-end", vt && vt(S)), (v = s(f, t)) === null && (v = f[t]), process.env.NODE_ENV !== "production" && Nt) {
      const b = window.performance.now(), w = e.__v_emitter;
      w && g && v && w.emit("message-resolve", {
        type: "message-resolve",
        key: t,
        message: v,
        time: b - g,
        groupId: `${m}:${t}`
      }), S && O && vt && qn && (vt(O), qn("intlify message resolve", S, O));
    }
    if (ce(v) || yn(v) || bt(v))
      break;
    const L = os(
      e,
      // eslint-disable-line @typescript-eslint/no-explicit-any
      t,
      d,
      a,
      m
    );
    L !== t && (v = L), h = _;
  }
  return [v, d, f];
}
function $u(e, t, n, r, o, a) {
  const { messageCompiler: i, warnHtmlMessage: l } = e;
  if (bt(r)) {
    const d = r;
    return d.locale = d.locale || n, d.key = d.key || t, d;
  }
  if (i == null) {
    const d = () => r;
    return d.locale = n, d.key = t, d;
  }
  let s = null, c, u;
  process.env.NODE_ENV !== "production" && Nt && (s = window.performance.now(), c = "intlify-message-compilation-start", u = "intlify-message-compilation-end", vt && vt(c));
  const f = i(r, Nv(e, n, o, r, l, a));
  if (process.env.NODE_ENV !== "production" && Nt) {
    const d = window.performance.now(), v = e.__v_emitter;
    v && s && v.emit("message-compilation", {
      type: "message-compilation",
      message: r,
      time: d - s,
      groupId: `translate:${t}`
    }), c && u && vt && qn && (vt(u), qn("intlify message compilation", c, u));
  }
  return f.locale = n, f.key = t, f.source = r, f;
}
function Av(e, t, n) {
  let r = null, o, a;
  process.env.NODE_ENV !== "production" && Nt && (r = window.performance.now(), o = "intlify-message-evaluation-start", a = "intlify-message-evaluation-end", vt && vt(o));
  const i = t(n);
  if (process.env.NODE_ENV !== "production" && Nt) {
    const l = window.performance.now(), s = e.__v_emitter;
    s && r && s.emit("message-evaluation", {
      type: "message-evaluation",
      value: i,
      time: l - r,
      groupId: `translate:${t.key}`
    }), o && a && vt && qn && (vt(a), qn("intlify message evaluation", o, a));
  }
  return i;
}
function Ei(...e) {
  const [t, n, r] = e, o = {};
  if (!ce(t) && !Ke(t) && !bt(t) && !yn(t))
    throw Kt(Ze.INVALID_ARGUMENT);
  const a = Ke(t) ? String(t) : (bt(t), t);
  return Ke(n) ? o.plural = n : ce(n) ? o.default = n : be(n) && !ba(n) ? o.named = n : je(n) && (o.list = n), Ke(r) ? o.plural = r : ce(r) ? o.default = r : be(r) && nt(o, r), [a, o];
}
function Nv(e, t, n, r, o, a) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: o,
    onError: (i) => {
      if (a && a(i), process.env.NODE_ENV !== "production") {
        const l = Lv(r), s = `Message compilation error: ${i.message}`, c = i.location && l && dm(l, i.location.start.offset, i.location.end.offset), u = e.__v_emitter;
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
    onCacheKey: (i) => om(t, n, i)
  };
}
function Lv(e) {
  if (ce(e))
    return e;
  if (e.loc && e.loc.source)
    return e.loc.source;
}
function Rv(e, t, n, r) {
  const { modifiers: o, pluralRules: a, messageResolver: i, fallbackLocale: l, fallbackWarn: s, missingWarn: c, fallbackContext: u } = e, d = {
    locale: t,
    modifiers: o,
    pluralRules: a,
    messages: (v) => {
      let h = i(n, v);
      if (h == null && u) {
        const [, , _] = Ru(u, v, t, l, s, c);
        h = i(_, v);
      }
      if (ce(h) || yn(h)) {
        let _ = !1;
        const p = $u(e, v, t, h, v, () => {
          _ = !0;
        });
        return _ ? _l : p;
      } else
        return bt(h) ? h : _l;
    }
  };
  return e.processor && (d.processor = e.processor), r.list && (d.list = r.list), r.named && (d.named = r.named), Ke(r.plural) && (d.pluralIndex = r.plural), d;
}
const bl = typeof Intl < "u", Mu = {
  dateTimeFormat: bl && typeof Intl.DateTimeFormat < "u",
  numberFormat: bl && typeof Intl.NumberFormat < "u"
};
function El(e, ...t) {
  const { datetimeFormats: n, unresolving: r, fallbackLocale: o, onWarn: a, localeFallbacker: i } = e, { __datetimeFormatters: l } = e;
  if (process.env.NODE_ENV !== "production" && !Mu.dateTimeFormat)
    return a(Gn(it.CANNOT_FORMAT_DATE)), ra;
  const [s, c, u, f] = wi(...t), d = $e(u.missingWarn) ? u.missingWarn : e.missingWarn, v = $e(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, h = !!u.part, _ = rs(e, u), m = i(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    o,
    _
  );
  if (!ce(s) || s === "")
    return new Intl.DateTimeFormat(_, f).format(c);
  let p = {}, g, S = null, O = _, L = null;
  const b = "datetime format";
  for (let k = 0; k < m.length; k++) {
    if (g = L = m[k], process.env.NODE_ENV !== "production" && _ !== g && wa(v, s) && a(Gn(it.FALLBACK_TO_DATE_FORMAT, {
      key: s,
      target: g
    })), process.env.NODE_ENV !== "production" && _ !== g) {
      const y = e.__v_emitter;
      y && y.emit("fallback", {
        type: b,
        key: s,
        from: O,
        to: L,
        groupId: `${b}:${s}`
      });
    }
    if (p = n[g] || {}, S = p[s], be(S))
      break;
    os(e, s, g, d, b), O = L;
  }
  if (!be(S) || !ce(g))
    return r ? Ea : s;
  let w = `${g}__${s}`;
  ba(f) || (w = `${w}__${JSON.stringify(f)}`);
  let T = l.get(w);
  return T || (T = new Intl.DateTimeFormat(g, nt({}, S, f)), l.set(w, T)), h ? T.formatToParts(c) : T.format(c);
}
const xu = [
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
function wi(...e) {
  const [t, n, r, o] = e, a = {};
  let i = {}, l;
  if (ce(t)) {
    const s = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!s)
      throw Kt(Ze.INVALID_ISO_DATE_ARGUMENT);
    const c = s[3] ? s[3].trim().startsWith("T") ? `${s[1].trim()}${s[3].trim()}` : `${s[1].trim()}T${s[3].trim()}` : s[1].trim();
    l = new Date(c);
    try {
      l.toISOString();
    } catch {
      throw Kt(Ze.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (im(t)) {
    if (isNaN(t.getTime()))
      throw Kt(Ze.INVALID_DATE_ARGUMENT);
    l = t;
  } else if (Ke(t))
    l = t;
  else
    throw Kt(Ze.INVALID_ARGUMENT);
  return ce(n) ? a.key = n : be(n) && Object.keys(n).forEach((s) => {
    xu.includes(s) ? i[s] = n[s] : a[s] = n[s];
  }), ce(r) ? a.locale = r : be(r) && (i = r), be(o) && (i = o), [a.key || "", l, a, i];
}
function wl(e, t, n) {
  const r = e;
  for (const o in n) {
    const a = `${t}__${o}`;
    r.__datetimeFormatters.has(a) && r.__datetimeFormatters.delete(a);
  }
}
function Tl(e, ...t) {
  const { numberFormats: n, unresolving: r, fallbackLocale: o, onWarn: a, localeFallbacker: i } = e, { __numberFormatters: l } = e;
  if (process.env.NODE_ENV !== "production" && !Mu.numberFormat)
    return a(Gn(it.CANNOT_FORMAT_NUMBER)), ra;
  const [s, c, u, f] = Ti(...t), d = $e(u.missingWarn) ? u.missingWarn : e.missingWarn, v = $e(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, h = !!u.part, _ = rs(e, u), m = i(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    o,
    _
  );
  if (!ce(s) || s === "")
    return new Intl.NumberFormat(_, f).format(c);
  let p = {}, g, S = null, O = _, L = null;
  const b = "number format";
  for (let k = 0; k < m.length; k++) {
    if (g = L = m[k], process.env.NODE_ENV !== "production" && _ !== g && wa(v, s) && a(Gn(it.FALLBACK_TO_NUMBER_FORMAT, {
      key: s,
      target: g
    })), process.env.NODE_ENV !== "production" && _ !== g) {
      const y = e.__v_emitter;
      y && y.emit("fallback", {
        type: b,
        key: s,
        from: O,
        to: L,
        groupId: `${b}:${s}`
      });
    }
    if (p = n[g] || {}, S = p[s], be(S))
      break;
    os(e, s, g, d, b), O = L;
  }
  if (!be(S) || !ce(g))
    return r ? Ea : s;
  let w = `${g}__${s}`;
  ba(f) || (w = `${w}__${JSON.stringify(f)}`);
  let T = l.get(w);
  return T || (T = new Intl.NumberFormat(g, nt({}, S, f)), l.set(w, T)), h ? T.formatToParts(c) : T.format(c);
}
const Bu = [
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
function Ti(...e) {
  const [t, n, r, o] = e, a = {};
  let i = {};
  if (!Ke(t))
    throw Kt(Ze.INVALID_ARGUMENT);
  const l = t;
  return ce(n) ? a.key = n : be(n) && Object.keys(n).forEach((s) => {
    Bu.includes(s) ? i[s] = n[s] : a[s] = n[s];
  }), ce(r) ? a.locale = r : be(r) && (i = r), be(o) && (i = o), [a.key || "", l, a, i];
}
function Cl(e, t, n) {
  const r = e;
  for (const o in n) {
    const a = `${t}__${o}`;
    r.__numberFormatters.has(a) && r.__numberFormatters.delete(a);
  }
}
Ym();
/*!
  * vue-i18n v9.10.2
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
const $v = "9.10.2";
function Mv() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (es().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const Vu = it.__EXTEND_POINT__, Wt = ts(Vu), Qe = {
  FALLBACK_TO_ROOT: Vu,
  // 9
  NOT_SUPPORTED_PRESERVE: Wt(),
  // 10
  NOT_SUPPORTED_FORMATTER: Wt(),
  // 11
  NOT_SUPPORTED_PRESERVE_DIRECTIVE: Wt(),
  // 12
  NOT_SUPPORTED_GET_CHOICE_INDEX: Wt(),
  // 13
  COMPONENT_NAME_LEGACY_COMPATIBLE: Wt(),
  // 14
  NOT_FOUND_PARENT_SCOPE: Wt(),
  // 15
  IGNORE_OBJ_FLATTEN: Wt(),
  // 16
  NOTICE_DROP_ALLOW_COMPOSITION: Wt(),
  // 17
  NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG: Wt()
  // 18
}, xv = {
  [Qe.FALLBACK_TO_ROOT]: "Fall back to {type} '{key}' with root locale.",
  [Qe.NOT_SUPPORTED_PRESERVE]: "Not supported 'preserve'.",
  [Qe.NOT_SUPPORTED_FORMATTER]: "Not supported 'formatter'.",
  [Qe.NOT_SUPPORTED_PRESERVE_DIRECTIVE]: "Not supported 'preserveDirectiveContent'.",
  [Qe.NOT_SUPPORTED_GET_CHOICE_INDEX]: "Not supported 'getChoiceIndex'.",
  [Qe.COMPONENT_NAME_LEGACY_COMPATIBLE]: "Component name legacy compatible: '{name}' -> 'i18n'",
  [Qe.NOT_FOUND_PARENT_SCOPE]: "Not found parent scope. use the global scope.",
  [Qe.IGNORE_OBJ_FLATTEN]: "Ignore object flatten: '{key}' key has an string value",
  [Qe.NOTICE_DROP_ALLOW_COMPOSITION]: "'allowComposition' option will be dropped in the next major version. For more information, please see 👉 https://tinyurl.com/2p97mcze",
  [Qe.NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG]: "'translateExistCompatible' option will be dropped in the next major version."
};
function gr(e, ...t) {
  return Qi(xv[e], ...t);
}
const Uu = Ze.__EXTEND_POINT__, ut = ts(Uu), Oe = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: Uu,
  // 26
  // legacy module errors
  INVALID_ARGUMENT: ut(),
  // 27
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: ut(),
  // 28
  NOT_INSTALLED: ut(),
  // 29
  NOT_AVAILABLE_IN_LEGACY_MODE: ut(),
  // 30
  // directive module errors
  REQUIRED_VALUE: ut(),
  // 31
  INVALID_VALUE: ut(),
  // 32
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: ut(),
  // 33
  NOT_INSTALLED_WITH_PROVIDE: ut(),
  // 34
  // unexpected error
  UNEXPECTED_ERROR: ut(),
  // 35
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: ut(),
  // 36
  // bridge support vue 2.x only
  BRIDGE_SUPPORT_VUE_2_ONLY: ut(),
  // 37
  // need to define `i18n` option in `allowComposition: true` and `useScope: 'local' at `useI18n``
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: ut(),
  // 38
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: ut(),
  // 39
  // for enhancement
  __EXTEND_POINT__: ut()
  // 40
};
function kt(e, ...t) {
  return Ir(e, null, process.env.NODE_ENV !== "production" ? { messages: Bv, args: t } : void 0);
}
const Bv = {
  [Oe.UNEXPECTED_RETURN_TYPE]: "Unexpected return type in composer",
  [Oe.INVALID_ARGUMENT]: "Invalid argument",
  [Oe.MUST_BE_CALL_SETUP_TOP]: "Must be called at the top of a `setup` function",
  [Oe.NOT_INSTALLED]: "Need to install with `app.use` function",
  [Oe.UNEXPECTED_ERROR]: "Unexpected error",
  [Oe.NOT_AVAILABLE_IN_LEGACY_MODE]: "Not available in legacy mode",
  [Oe.REQUIRED_VALUE]: "Required in value: {0}",
  [Oe.INVALID_VALUE]: "Invalid value",
  [Oe.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN]: "Cannot setup vue-devtools plugin",
  [Oe.NOT_INSTALLED_WITH_PROVIDE]: "Need to install with `provide` function",
  [Oe.NOT_COMPATIBLE_LEGACY_VUE_I18N]: "Not compatible legacy VueI18n.",
  [Oe.BRIDGE_SUPPORT_VUE_2_ONLY]: "vue-i18n-bridge support Vue 2.x only",
  [Oe.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION]: "Must define ‘i18n’ option or custom block in Composition API with using local scope in Legacy API mode",
  [Oe.NOT_AVAILABLE_COMPOSITION_IN_LEGACY]: "Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly"
}, Ci = /* @__PURE__ */ Ut("__translateVNode"), ki = /* @__PURE__ */ Ut("__datetimeParts"), Si = /* @__PURE__ */ Ut("__numberParts"), Xr = /* @__PURE__ */ Ut("__enableEmitter"), Ii = /* @__PURE__ */ Ut("__disableEmitter"), Vv = Ut("__setPluralRules"), Uv = /* @__PURE__ */ Ut("__injectWithOption"), Di = /* @__PURE__ */ Ut("__dispose");
function Kr(e) {
  if (!Te(e))
    return e;
  for (const t in e)
    if (ta(e, t))
      if (!t.includes("."))
        Te(e[t]) && Kr(e[t]);
      else {
        const n = t.split("."), r = n.length - 1;
        let o = e, a = !1;
        for (let i = 0; i < r; i++) {
          if (n[i] in o || (o[n[i]] = {}), !Te(o[n[i]])) {
            process.env.NODE_ENV !== "production" && Ft(gr(Qe.IGNORE_OBJ_FLATTEN, {
              key: n[i]
            })), a = !0;
            break;
          }
          o = o[n[i]];
        }
        a || (o[n[r]] = e[t], delete e[t]), Te(o[n[r]]) && Kr(o[n[r]]);
      }
  return e;
}
function Fu(e, t) {
  const { messages: n, __i18n: r, messageResolver: o, flatJson: a } = t, i = be(n) ? n : je(r) ? {} : { [e]: {} };
  if (je(r) && r.forEach((l) => {
    if ("locale" in l && "resource" in l) {
      const { locale: s, resource: c } = l;
      s ? (i[s] = i[s] || {}, qo(c, i[s])) : qo(c, i);
    } else
      ce(l) && qo(JSON.parse(l), i);
  }), o == null && a)
    for (const l in i)
      ta(i, l) && Kr(i[l]);
  return i;
}
function Hu(e) {
  return e.type;
}
function Fv(e, t, n) {
  let r = Te(t.messages) ? t.messages : {};
  "__i18nGlobal" in n && (r = Fu(e.locale.value, {
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
function kl(e) {
  return q(ch, null, e, 0);
}
const Sl = "__INTLIFY_META__", Il = () => [], Hv = () => !1;
let Dl = 0;
function Ol(e) {
  return (t, n, r, o) => e(n, r, Sr() || void 0, o);
}
const Yv = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = Sr();
  let t = null;
  return e && (t = Hu(e)[Sl]) ? { [Sl]: t } : null;
};
function Yu(e = {}, t) {
  const { __root: n, __injectWithOption: r } = e, o = n === void 0, a = e.flatJson, i = Nt ? ne : Xi, l = !!e.translateExistCompatible;
  process.env.NODE_ENV !== "production" && l && wu(gr(Qe.NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG));
  let s = $e(e.inheritLocale) ? e.inheritLocale : !0;
  const c = i(
    // prettier-ignore
    n && s ? n.locale.value : ce(e.locale) ? e.locale : na
  ), u = i(
    // prettier-ignore
    n && s ? n.fallbackLocale.value : ce(e.fallbackLocale) || je(e.fallbackLocale) || be(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : c.value
  ), f = i(Fu(c.value, e)), d = i(be(e.datetimeFormats) ? e.datetimeFormats : { [c.value]: {} }), v = i(be(e.numberFormats) ? e.numberFormats : { [c.value]: {} });
  let h = n ? n.missingWarn : $e(e.missingWarn) || ea(e.missingWarn) ? e.missingWarn : !0, _ = n ? n.fallbackWarn : $e(e.fallbackWarn) || ea(e.fallbackWarn) ? e.fallbackWarn : !0, m = n ? n.fallbackRoot : $e(e.fallbackRoot) ? e.fallbackRoot : !0, p = !!e.fallbackFormat, g = Re(e.missing) ? e.missing : null, S = Re(e.missing) ? Ol(e.missing) : null, O = Re(e.postTranslation) ? e.postTranslation : null, L = n ? n.warnHtmlMessage : $e(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, b = !!e.escapeParameter;
  const w = n ? n.modifiers : be(e.modifiers) ? e.modifiers : {};
  let T = e.pluralRules || n && n.pluralRules, k;
  k = (() => {
    o && ml(null);
    const J = {
      version: $v,
      locale: c.value,
      fallbackLocale: u.value,
      messages: f.value,
      modifiers: w,
      pluralRules: T,
      missing: S === null ? void 0 : S,
      missingWarn: h,
      fallbackWarn: _,
      fallbackFormat: p,
      unresolving: !0,
      postTranslation: O === null ? void 0 : O,
      warnHtmlMessage: L,
      escapeParameter: b,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    J.datetimeFormats = d.value, J.numberFormats = v.value, J.__datetimeFormatters = be(k) ? k.__datetimeFormatters : void 0, J.__numberFormatters = be(k) ? k.__numberFormatters : void 0, process.env.NODE_ENV !== "production" && (J.__v_emitter = be(k) ? k.__v_emitter : void 0);
    const te = Tv(J);
    return o && ml(te), te;
  })(), Lr(k, c.value, u.value);
  function I() {
    return [
      c.value,
      u.value,
      f.value,
      d.value,
      v.value
    ];
  }
  const A = se({
    get: () => c.value,
    set: (J) => {
      c.value = J, k.locale = c.value;
    }
  }), U = se({
    get: () => u.value,
    set: (J) => {
      u.value = J, k.fallbackLocale = u.value, Lr(k, c.value, J);
    }
  }), x = se(() => f.value), N = /* @__PURE__ */ se(() => d.value), R = /* @__PURE__ */ se(() => v.value);
  function F() {
    return Re(O) ? O : null;
  }
  function M(J) {
    O = J, k.postTranslation = J;
  }
  function G() {
    return g;
  }
  function j(J) {
    J !== null && (S = Ol(J)), g = J, k.missing = S;
  }
  function Q(J, te) {
    return J !== "translate" || !te.resolvedMessage;
  }
  const le = (J, te, ke, Ve, un, No) => {
    I();
    let Qn;
    try {
      process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, o || (k.fallbackContext = n ? wv() : void 0), Qn = J(k);
    } finally {
      process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, o || (k.fallbackContext = void 0);
    }
    if (ke !== "translate exists" && // for not `te` (e.g `t`)
    Ke(Qn) && Qn === Ea || ke === "translate exists" && !Qn) {
      const [Ln, rh] = te();
      if (process.env.NODE_ENV !== "production" && n && ce(Ln) && Q(ke, rh) && (m && (wa(_, Ln) || Lu(h, Ln)) && Ft(gr(Qe.FALLBACK_TO_ROOT, {
        key: Ln,
        type: ke
      })), process.env.NODE_ENV !== "production")) {
        const { __v_emitter: Xs } = k;
        Xs && m && Xs.emit("fallback", {
          type: ke,
          key: Ln,
          to: "global",
          groupId: `${ke}:${Ln}`
        });
      }
      return n && m ? Ve(n) : un(Ln);
    } else {
      if (No(Qn))
        return Qn;
      throw kt(Oe.UNEXPECTED_RETURN_TYPE);
    }
  };
  function de(...J) {
    return le((te) => Reflect.apply(yl, null, [te, ...J]), () => Ei(...J), "translate", (te) => Reflect.apply(te.t, te, [...J]), (te) => te, (te) => ce(te));
  }
  function pe(...J) {
    const [te, ke, Ve] = J;
    if (Ve && !Te(Ve))
      throw kt(Oe.INVALID_ARGUMENT);
    return de(te, ke, nt({ resolvedMessage: !0 }, Ve || {}));
  }
  function Ce(...J) {
    return le((te) => Reflect.apply(El, null, [te, ...J]), () => wi(...J), "datetime format", (te) => Reflect.apply(te.d, te, [...J]), () => ra, (te) => ce(te));
  }
  function ee(...J) {
    return le((te) => Reflect.apply(Tl, null, [te, ...J]), () => Ti(...J), "number format", (te) => Reflect.apply(te.n, te, [...J]), () => ra, (te) => ce(te));
  }
  function Y(J) {
    return J.map((te) => ce(te) || Ke(te) || $e(te) ? kl(String(te)) : te);
  }
  const E = {
    normalize: Y,
    interpolate: (J) => J,
    type: "vnode"
  };
  function D(...J) {
    return le(
      (te) => {
        let ke;
        const Ve = te;
        try {
          Ve.processor = E, ke = Reflect.apply(yl, null, [Ve, ...J]);
        } finally {
          Ve.processor = null;
        }
        return ke;
      },
      () => Ei(...J),
      "translate",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (te) => te[Ci](...J),
      (te) => [kl(te)],
      (te) => je(te)
    );
  }
  function $(...J) {
    return le(
      (te) => Reflect.apply(Tl, null, [te, ...J]),
      () => Ti(...J),
      "number format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (te) => te[Si](...J),
      Il,
      (te) => ce(te) || je(te)
    );
  }
  function z(...J) {
    return le(
      (te) => Reflect.apply(El, null, [te, ...J]),
      () => wi(...J),
      "datetime format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (te) => te[ki](...J),
      Il,
      (te) => ce(te) || je(te)
    );
  }
  function C(J) {
    T = J, k.pluralRules = T;
  }
  function P(J, te) {
    return le(() => {
      if (!J)
        return !1;
      const ke = ce(te) ? te : c.value, Ve = re(ke), un = k.messageResolver(Ve, J);
      return l ? un != null : yn(un) || bt(un) || ce(un);
    }, () => [J], "translate exists", (ke) => Reflect.apply(ke.te, ke, [J, te]), Hv, (ke) => $e(ke));
  }
  function V(J) {
    let te = null;
    const ke = Iu(k, u.value, c.value);
    for (let Ve = 0; Ve < ke.length; Ve++) {
      const un = f.value[ke[Ve]] || {}, No = k.messageResolver(un, J);
      if (No != null) {
        te = No;
        break;
      }
    }
    return te;
  }
  function Z(J) {
    const te = V(J);
    return te ?? (n ? n.tm(J) || {} : {});
  }
  function re(J) {
    return f.value[J] || {};
  }
  function ve(J, te) {
    if (a) {
      const ke = { [J]: te };
      for (const Ve in ke)
        ta(ke, Ve) && Kr(ke[Ve]);
      te = ke[J];
    }
    f.value[J] = te, k.messages = f.value;
  }
  function Ne(J, te) {
    f.value[J] = f.value[J] || {};
    const ke = { [J]: te };
    if (a)
      for (const Ve in ke)
        ta(ke, Ve) && Kr(ke[Ve]);
    te = ke[J], qo(te, f.value[J]), k.messages = f.value;
  }
  function Le(J) {
    return d.value[J] || {};
  }
  function Fe(J, te) {
    d.value[J] = te, k.datetimeFormats = d.value, wl(k, J, te);
  }
  function Be(J, te) {
    d.value[J] = nt(d.value[J] || {}, te), k.datetimeFormats = d.value, wl(k, J, te);
  }
  function cn(J) {
    return v.value[J] || {};
  }
  function Ao(J, te) {
    v.value[J] = te, k.numberFormats = v.value, Cl(k, J, te);
  }
  function nh(J, te) {
    v.value[J] = nt(v.value[J] || {}, te), k.numberFormats = v.value, Cl(k, J, te);
  }
  Dl++, n && Nt && (qe(n.locale, (J) => {
    s && (c.value = J, k.locale = J, Lr(k, c.value, u.value));
  }), qe(n.fallbackLocale, (J) => {
    s && (u.value = J, k.fallbackLocale = J, Lr(k, c.value, u.value));
  }));
  const He = {
    id: Dl,
    locale: A,
    fallbackLocale: U,
    get inheritLocale() {
      return s;
    },
    set inheritLocale(J) {
      s = J, J && n && (c.value = n.locale.value, u.value = n.fallbackLocale.value, Lr(k, c.value, u.value));
    },
    get availableLocales() {
      return Object.keys(f.value).sort();
    },
    messages: x,
    get modifiers() {
      return w;
    },
    get pluralRules() {
      return T || {};
    },
    get isGlobal() {
      return o;
    },
    get missingWarn() {
      return h;
    },
    set missingWarn(J) {
      h = J, k.missingWarn = h;
    },
    get fallbackWarn() {
      return _;
    },
    set fallbackWarn(J) {
      _ = J, k.fallbackWarn = _;
    },
    get fallbackRoot() {
      return m;
    },
    set fallbackRoot(J) {
      m = J;
    },
    get fallbackFormat() {
      return p;
    },
    set fallbackFormat(J) {
      p = J, k.fallbackFormat = p;
    },
    get warnHtmlMessage() {
      return L;
    },
    set warnHtmlMessage(J) {
      L = J, k.warnHtmlMessage = J;
    },
    get escapeParameter() {
      return b;
    },
    set escapeParameter(J) {
      b = J, k.escapeParameter = J;
    },
    t: de,
    getLocaleMessage: re,
    setLocaleMessage: ve,
    mergeLocaleMessage: Ne,
    getPostTranslationHandler: F,
    setPostTranslationHandler: M,
    getMissingHandler: G,
    setMissingHandler: j,
    [Vv]: C
  };
  return He.datetimeFormats = N, He.numberFormats = R, He.rt = pe, He.te = P, He.tm = Z, He.d = Ce, He.n = ee, He.getDateTimeFormat = Le, He.setDateTimeFormat = Fe, He.mergeDateTimeFormat = Be, He.getNumberFormat = cn, He.setNumberFormat = Ao, He.mergeNumberFormat = nh, He[Uv] = r, He[Ci] = D, He[ki] = z, He[Si] = $, process.env.NODE_ENV !== "production" && (He[Xr] = (J) => {
    k.__v_emitter = J;
  }, He[Ii] = () => {
    k.__v_emitter = void 0;
  }), He;
}
const as = {
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
function jv({ slots: e }, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((r, o) => [
    ...r,
    // prettier-ignore
    ...o.type === Ie ? o.children : [o]
  ], []) : t.reduce((n, r) => {
    const o = e[r];
    return o && (n[r] = o()), n;
  }, {});
}
function ju(e) {
  return Ie;
}
const Wv = /* @__PURE__ */ me({
  /* eslint-disable */
  name: "i18n-t",
  props: nt({
    keypath: {
      type: String,
      required: !0
    },
    plural: {
      type: [Number, String],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator: (e) => Ke(e) || !isNaN(e)
    }
  }, as),
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
      const l = jv(t, a), s = o[Ci](e.keypath, l, i), c = nt({}, r), u = ce(e.tag) || Te(e.tag) ? e.tag : ju();
      return jn(u, c, s);
    };
  }
}), Ka = Wv;
function qv(e) {
  return je(e) && !ce(e[0]);
}
function Wu(e, t, n, r) {
  const { slots: o, attrs: a } = t;
  return () => {
    const i = { part: !0 };
    let l = {};
    e.locale && (i.locale = e.locale), ce(e.format) ? i.key = e.format : Te(e.format) && (ce(e.format.key) && (i.key = e.format.key), l = Object.keys(e.format).reduce((d, v) => n.includes(v) ? nt({}, d, { [v]: e.format[v] }) : d, {}));
    const s = r(e.value, i, l);
    let c = [i.key];
    je(s) ? c = s.map((d, v) => {
      const h = o[d.type], _ = h ? h({ [d.type]: d.value, index: v, parts: s }) : [d.value];
      return qv(_) && (_[0].key = `${d.type}-${v}`), _;
    }) : ce(s) && (c = [s]);
    const u = nt({}, a), f = ce(e.tag) || Te(e.tag) ? e.tag : ju();
    return jn(f, u, c);
  };
}
const Gv = /* @__PURE__ */ me({
  /* eslint-disable */
  name: "i18n-n",
  props: nt({
    value: {
      type: Number,
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, as),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || Pe({
      useScope: "parent",
      __useComponent: !0
    });
    return Wu(e, t, Bu, (...r) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[Si](...r)
    ));
  }
}), Pl = Gv, zv = /* @__PURE__ */ me({
  /* eslint-disable */
  name: "i18n-d",
  props: nt({
    value: {
      type: [Number, Date],
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, as),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || Pe({
      useScope: "parent",
      __useComponent: !0
    });
    return Wu(e, t, xu, (...r) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[ki](...r)
    ));
  }
}), Al = zv;
function Xv(e, t) {
  const n = e;
  if (e.mode === "composition")
    return n.__getInstance(t) || e.global;
  {
    const r = n.__getInstance(t);
    return r != null ? r.__composer : e.global.__composer;
  }
}
function Kv(e) {
  const t = (i) => {
    const { instance: l, modifiers: s, value: c } = i;
    if (!l || !l.$)
      throw kt(Oe.UNEXPECTED_ERROR);
    const u = Xv(e, l.$);
    process.env.NODE_ENV !== "production" && s.preserve && Ft(gr(Qe.NOT_SUPPORTED_PRESERVE));
    const f = Nl(c);
    return [
      Reflect.apply(u.t, u, [...Ll(f)]),
      u
    ];
  };
  return {
    created: (i, l) => {
      const [s, c] = t(l);
      Nt && e.global === c && (i.__i18nWatcher = qe(c.locale, () => {
        l.instance && l.instance.$forceUpdate();
      })), i.__composer = c, i.textContent = s;
    },
    unmounted: (i) => {
      Nt && i.__i18nWatcher && (i.__i18nWatcher(), i.__i18nWatcher = void 0, delete i.__i18nWatcher), i.__composer && (i.__composer = void 0, delete i.__composer);
    },
    beforeUpdate: (i, { value: l }) => {
      if (i.__composer) {
        const s = i.__composer, c = Nl(l);
        i.textContent = Reflect.apply(s.t, s, [
          ...Ll(c)
        ]);
      }
    },
    getSSRProps: (i) => {
      const [l] = t(i);
      return { textContent: l };
    }
  };
}
function Nl(e) {
  if (ce(e))
    return { path: e };
  if (be(e)) {
    if (!("path" in e))
      throw kt(Oe.REQUIRED_VALUE, "path");
    return e;
  } else
    throw kt(Oe.INVALID_VALUE);
}
function Ll(e) {
  const { path: t, locale: n, args: r, choice: o, plural: a } = e, i = {}, l = r || {};
  return ce(n) && (i.locale = n), Ke(o) && (i.plural = o), Ke(a) && (i.plural = a), [t, l, i];
}
function Jv(e, t, ...n) {
  const r = be(n[0]) ? n[0] : {}, o = !!r.useI18nComponentName, a = $e(r.globalInstall) ? r.globalInstall : !0;
  process.env.NODE_ENV !== "production" && a && o && Ft(gr(Qe.COMPONENT_NAME_LEGACY_COMPATIBLE, {
    name: Ka.name
  })), a && ([o ? "i18n" : Ka.name, "I18nT"].forEach((i) => e.component(i, Ka)), [Pl.name, "I18nN"].forEach((i) => e.component(i, Pl)), [Al.name, "I18nD"].forEach((i) => e.component(i, Al))), e.directive("t", Kv(t));
}
const Ja = {
  "vue-devtools-plugin-vue-i18n": "Vue I18n devtools",
  "vue-i18n-resource-inspector": "I18n Resources",
  "vue-i18n-timeline": "Vue I18n"
}, Zv = {
  "vue-i18n-resource-inspector": "Search for scopes ..."
}, Qv = {
  "vue-i18n-timeline": 16764185
}, qu = "vue-i18n: composer properties";
let Oi;
async function eg(e, t) {
  return new Promise((n, r) => {
    try {
      _a({
        id: "vue-devtools-plugin-vue-i18n",
        label: Ja[
          "vue-devtools-plugin-vue-i18n"
          /* VueDevToolsIDs.PLUGIN */
        ],
        packageName: "vue-i18n",
        homepage: "https://vue-i18n.intlify.dev",
        logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
        componentStateTypes: [qu],
        app: e
        // eslint-disable-line @typescript-eslint/no-explicit-any
      }, (o) => {
        Oi = o, o.on.visitComponentTree(({ componentInstance: i, treeNode: l }) => {
          tg(i, l, t);
        }), o.on.inspectComponent(({ componentInstance: i, instanceData: l }) => {
          i.vnode.el && i.vnode.el.__VUE_I18N__ && l && (t.mode === "legacy" ? i.vnode.el.__VUE_I18N__ !== t.global.__composer && Rl(l, i.vnode.el.__VUE_I18N__) : Rl(l, i.vnode.el.__VUE_I18N__));
        }), o.addInspector({
          id: "vue-i18n-resource-inspector",
          label: Ja[
            "vue-i18n-resource-inspector"
            /* VueDevToolsIDs.CUSTOM_INSPECTOR */
          ],
          icon: "language",
          treeFilterPlaceholder: Zv[
            "vue-i18n-resource-inspector"
            /* VueDevToolsIDs.CUSTOM_INSPECTOR */
          ]
        }), o.on.getInspectorTree((i) => {
          i.app === e && i.inspectorId === "vue-i18n-resource-inspector" && ig(i, t);
        });
        const a = /* @__PURE__ */ new Map();
        o.on.getInspectorState(async (i) => {
          if (i.app === e && i.inspectorId === "vue-i18n-resource-inspector")
            if (o.unhighlightElement(), lg(i, t), i.nodeId === "global") {
              if (!a.has(i.app)) {
                const [l] = await o.getComponentInstances(i.app);
                a.set(i.app, l);
              }
              o.highlightElement(a.get(i.app));
            } else {
              const l = sg(i.nodeId, t);
              l && o.highlightElement(l);
            }
        }), o.on.editInspectorState((i) => {
          i.app === e && i.inspectorId === "vue-i18n-resource-inspector" && ug(i, t);
        }), o.addTimelineLayer({
          id: "vue-i18n-timeline",
          label: Ja[
            "vue-i18n-timeline"
            /* VueDevToolsIDs.TIMELINE */
          ],
          color: Qv[
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
function Gu(e) {
  return e.type.name || e.type.displayName || e.type.__file || "Anonymous";
}
function tg(e, t, n) {
  const r = n.mode === "composition" ? n.global : n.global.__composer;
  if (e && e.vnode.el && e.vnode.el.__VUE_I18N__ && e.vnode.el.__VUE_I18N__ !== r) {
    const o = {
      label: `i18n (${Gu(e)} Scope)`,
      textColor: 0,
      backgroundColor: 16764185
    };
    t.tags.push(o);
  }
}
function Rl(e, t) {
  const n = qu;
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
    value: is(t.messages.value)
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
function is(e) {
  const t = {};
  return Object.keys(e).forEach((n) => {
    const r = e[n];
    Re(r) && "source" in r ? t[n] = ag(r) : yn(r) && r.loc && r.loc.source ? t[n] = r.loc.source : Te(r) ? t[n] = is(r) : t[n] = r;
  }), t;
}
const ng = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "&": "&amp;"
};
function rg(e) {
  return e.replace(/[<>"&]/g, og);
}
function og(e) {
  return ng[e] || e;
}
function ag(e) {
  return {
    _custom: {
      type: "function",
      display: `<span>ƒ</span> ${e.source ? `("${rg(e.source)}")` : "(?)"}`
    }
  };
}
function ig(e, t) {
  e.rootNodes.push({
    id: "global",
    label: "Global Scope"
  });
  const n = t.mode === "composition" ? t.global : t.global.__composer;
  for (const [r, o] of t.__instances) {
    const a = t.mode === "composition" ? o : o.__composer;
    n !== a && e.rootNodes.push({
      id: a.id.toString(),
      label: `${Gu(r)} Scope`
    });
  }
}
function sg(e, t) {
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
function zu(e, t) {
  if (e === "global")
    return t.mode === "composition" ? t.global : t.global.__composer;
  {
    const n = Array.from(t.__instances.values()).find((r) => r.id.toString() === e);
    return n ? t.mode === "composition" ? n : n.__composer : null;
  }
}
function lg(e, t) {
  const n = zu(e.nodeId, t);
  return n && (e.state = cg(n)), null;
}
function cg(e) {
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
      value: is(e.messages.value)
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
function Pi(e, t) {
  if (Oi) {
    let n;
    t && "groupId" in t && (n = t.groupId, delete t.groupId), Oi.addTimelineEvent({
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
function ug(e, t) {
  const n = zu(e.nodeId, t);
  if (n) {
    const [r] = e.path;
    r === "locale" && ce(e.state.value) ? n.locale.value = e.state.value : r === "fallbackLocale" && (ce(e.state.value) || je(e.state.value) || Te(e.state.value)) ? n.fallbackLocale.value = e.state.value : r === "inheritLocale" && $e(e.state.value) && (n.inheritLocale = e.state.value);
  }
}
const dg = /* @__PURE__ */ Ut("global-vue-i18n");
function fg(e = {}, t) {
  const n = $e(e.globalInjection) ? e.globalInjection : !0, r = !0, o = /* @__PURE__ */ new Map(), [a, i] = pg(e), l = /* @__PURE__ */ Ut(process.env.NODE_ENV !== "production" ? "vue-i18n" : "");
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
        if (process.env.NODE_ENV !== "production" && (d.__VUE_I18N__ = f), d.__VUE_I18N_SYMBOL__ = l, d.provide(d.__VUE_I18N_SYMBOL__, f), be(v[0])) {
          const m = v[0];
          f.__composerExtend = m.__composerExtend, f.__vueI18nExtend = m.__vueI18nExtend;
        }
        let h = null;
        n && (h = Eg(d, f.global)), Jv(d, f, ...v);
        const _ = d.unmount;
        if (d.unmount = () => {
          h && h(), f.dispose(), _();
        }, process.env.NODE_ENV !== "production") {
          if (!await eg(d, f))
            throw kt(Oe.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN);
          const p = Tu();
          {
            const g = i;
            g[Xr] && g[Xr](p);
          }
          p.on("*", Pi);
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
  const t = Sr();
  if (t == null)
    throw kt(Oe.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw kt(Oe.NOT_INSTALLED);
  const n = hg(t), r = vg(n), o = Hu(t), a = mg(e, o);
  if (a === "global")
    return Fv(r, e, o), r;
  if (a === "parent") {
    let s = gg(n, t, e.__useComponent);
    return s == null && (process.env.NODE_ENV !== "production" && Ft(gr(Qe.NOT_FOUND_PARENT_SCOPE)), s = r), s;
  }
  const i = n;
  let l = i.__getInstance(t);
  if (l == null) {
    const s = nt({}, e);
    "__i18n" in o && (s.__i18n = o.__i18n), r && (s.__root = r), l = Yu(s), i.__composerExtend && (l[Di] = i.__composerExtend(l)), yg(i, t, l), i.__setInstance(t, l);
  }
  return l;
}
function pg(e, t, n) {
  const r = zi();
  {
    const o = r.run(() => Yu(e));
    if (o == null)
      throw kt(Oe.UNEXPECTED_ERROR);
    return [r, o];
  }
}
function hg(e) {
  {
    const t = Tt(e.isCE ? dg : e.appContext.app.__VUE_I18N_SYMBOL__);
    if (!t)
      throw kt(e.isCE ? Oe.NOT_INSTALLED_WITH_PROVIDE : Oe.UNEXPECTED_ERROR);
    return t;
  }
}
function mg(e, t) {
  return ba(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function vg(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function gg(e, t, n = !1) {
  let r = null;
  const o = t.root;
  let a = _g(t, n);
  for (; a != null; ) {
    const i = e;
    if (e.mode === "composition" && (r = i.__getInstance(a)), r != null || o === a)
      break;
    a = a.parent;
  }
  return r;
}
function _g(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function yg(e, t, n) {
  let r = null;
  rt(() => {
    if (process.env.NODE_ENV !== "production" && t.vnode.el) {
      t.vnode.el.__VUE_I18N__ = n, r = Tu();
      const o = n;
      o[Xr] && o[Xr](r), r.on("*", Pi);
    }
  }, t), eu(() => {
    const o = n;
    process.env.NODE_ENV !== "production" && t.vnode.el && t.vnode.el.__VUE_I18N__ && (r && r.off("*", Pi), o[Ii] && o[Ii](), delete t.vnode.el.__VUE_I18N__), e.__deleteInstance(t);
    const a = o[Di];
    a && (a(), delete o[Di]);
  }, t);
}
const bg = [
  "locale",
  "fallbackLocale",
  "availableLocales"
], $l = ["t", "rt", "d", "n", "tm", "te"];
function Eg(e, t) {
  const n = /* @__PURE__ */ Object.create(null);
  return bg.forEach((o) => {
    const a = Object.getOwnPropertyDescriptor(t, o);
    if (!a)
      throw kt(Oe.UNEXPECTED_ERROR);
    const i = Yn(a.value) ? {
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
  }), e.config.globalProperties.$i18n = n, $l.forEach((o) => {
    const a = Object.getOwnPropertyDescriptor(t, o);
    if (!a || !a.value)
      throw kt(Oe.UNEXPECTED_ERROR);
    Object.defineProperty(e.config.globalProperties, `$${o}`, a);
  }), () => {
    delete e.config.globalProperties.$i18n, $l.forEach((o) => {
      delete e.config.globalProperties[`$${o}`];
    });
  };
}
Mv();
gv(Ov);
_v(Jm);
yv(Iu);
if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
  const e = es();
  e.__INTLIFY__ = !0, iv(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
process.env.NODE_ENV;
const Xu = {
  afterMidnightsSlots: "After midnight:",
  date: "Date",
  pickATimeslot: "Pick a timeslot",
  selectDate: "Select date",
  selectTime: "Select time",
  selectTimeslot: "Select timeslot",
  time: "Time",
  today: "Today",
  tomorrow: "Tomorrow"
}, Ku = {
  adult: "Adult | { count } adults",
  child: "Child | { count } children",
  close: "Close",
  customizeYourExperience: "Customise your experience",
  family: "Family",
  guests: "Guests",
  mealsLeftWarning: "You have { count } meal left to chose | You have { count } meals left to chose",
  openTicket: "Open ticket",
  student: "Student",
  tickets: "Tickets",
  whoIsGoing: "Who's going?"
}, Ju = {
  addDiscountCode: "Add another discount",
  apply: "Apply",
  back: "Back to cart",
  cartIsEmpty: "Your cart is empty",
  delete: "Delete",
  discountCode: "Discount code (optional)",
  edit: "Edit",
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
}, Zu = {
  agreement: "* I agree with the Terms and Conditions and the Privacy Policy",
  agreementWarning: "You must agree to the terms and conditions to go through the purchase.",
  back: "Back to details",
  email: "Your e-mail address",
  emailWarning: "You must fill in the email field",
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
}, Qu = {
  back: "Back to upgrades",
  upsellBookSubtitle: "Make more memories with an extra experience.",
  upsellBookTitle: "Book together and save 20%"
}, ed = {
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
}, td = {
  booking: "Booking your tickets...",
  nearly: "Nearly there!"
}, nd = {
  customerService: "Excellent customer service",
  easyBooking: "Easy and secure booking",
  ticketOnSmartphone: "Ticket is directly available on smartphone"
}, rd = {
  addToCart: "Add to cart",
  bookNow: "Book now",
  booking: "{ count } booking | { count } bookings",
  from: "From",
  loading: "Loading ...",
  showMore: "Show more info",
  unavailable: "Unavailable activity",
  update: "Update"
}, od = {
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
}, ad = {
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
}, wg = {
  calendar: Xu,
  options: Ku,
  cart: Ju,
  checkout: Zu,
  upgrades: Qu,
  payment: ed,
  paymentLoader: td,
  achievements: nd,
  booking: rd,
  toast: od,
  THError: ad
}, Tg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  THError: ad,
  achievements: nd,
  booking: rd,
  calendar: Xu,
  cart: Ju,
  checkout: Zu,
  default: wg,
  options: Ku,
  payment: ed,
  paymentLoader: td,
  toast: od,
  upgrades: Qu
}, Symbol.toStringTag, { value: "Module" })), id = {
  afterMidnightsSlots: "Nach Mitternacht:",
  date: "Datum",
  pickATimeslot: "Zeitfenster auswählen",
  selectDate: "Wählen Sie einen Tag aus",
  selectTime: "Zeit auswählen",
  selectTimeslot: "Zeitfenster auswählen",
  time: "Uhrzeit",
  today: "Heute",
  tomorrow: "Morgen"
}, sd = {
  adult: "Erwachsene | { count } erwachsene",
  child: "Kind | { count } kinder",
  close: "Schließen",
  customizeYourExperience: "Personalisieren Sie Ihr Erlebnis",
  family: "Familie",
  guests: "Gäste",
  mealsLeftWarning: "Sie haben noch { count } Mahlzeit zur Auswahl | Sie haben noch { count } Mahlzeiten zur Auswahl",
  openTicket: "offenes Ticket",
  student: "Student",
  tickets: "Tickets",
  whoIsGoing: "Wer kommt mit? "
}, ld = {
  addDiscountCode: "Einen weiteren Rabattcode hinzufügen",
  apply: "Anwenden",
  back: "Zurück zum warenkorb",
  cartIsEmpty: "Ihr warenkorb ist leer",
  delete: "Entfernen",
  discountCode: "Rabattcode (optional)",
  edit: "bearbeiten",
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
}, cd = {
  agreement: "* Ich stimme den Allgemeinen Geschäftsbedingungen und der Datenschutzrichtlinie zu",
  agreementWarning: "Sie müssen den Bedingungen zustimmen, um den Kauf abzuschließen",
  back: "Zurück zu den Details",
  email: "Ihre E-Mail Adresse",
  emailWarning: "Sie müssen das E-Mail-Feld ausfüllen",
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
}, ud = {
  back: "Zurück zu den Upgrades",
  upsellBookSubtitle: "Machen Sie mehr Erinnerungen mit einer zusätzlichen Erfahrung.",
  upsellBookTitle: "Zusammen buchen und 20% sparen"
}, dd = {
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
}, fd = {
  booking: "Tickets werden gebucht...",
  nearly: "Beinahe fertig!"
}, pd = {
  customerService: "Ausgezeichneter Kundenservice",
  easyBooking: "Einfache und sichere Buchung",
  ticketOnSmartphone: "Ticket ist direkt erhältlich"
}, hd = {
  addToCart: "Zum Warenkorb hinzufügen",
  bookNow: "Jetzt buchen",
  booking: "{ count } Buchungen",
  from: "Von",
  loading: "Laden ...",
  showMore: "Mehr Informationen zeigen",
  unavailable: "Nicht verfügbare Aktivität",
  update: "Update"
}, md = {
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
}, vd = {
  ADYEN_ERROR: "Wir haben eine Fehlermeldung vom Adyen Payment Gateway erhalten. Bitte versuchen Sie es später noch einmal.",
  CART_EDIT_DISABLED: "Sie können Ihren Warenkorb nicht bearbeiten, weil Sie die Option Selbst umbuchen verwendet haben.",
  CART_NOT_FOUND: "Ihr Warenkorb scheint zu fehlen. Versuchen Sie, erneut Artikel hinzuzufügen.",
  DuplicateTimeslotInRequest: "Ein oder mehrere Produkte in Ihrem Warenkorb haben widersprüchliche Zeitfenster. Bitte bearbeiten Sie Ihren Warenkorb und versuchen Sie es erneut.",
  EmptyCart: "Die Zahlung ist nicht möglich, da Ihr Warenkorb leer ist.",
  MissingCustomerInfo: "Es scheinen einige persönliche Angaben zu fehlen. Bitte überprüfen Sie diese, um fortzufahren.",
  OldTimeslots: "Es sieht so aus, als ob einige der von Ihnen gewählten Aktivitäten Zeitfenster haben, die in der Vergangenheit liegen. Bitte bearbeiten Sie diese, um fortzufahren.",
  SERVER_ERROR: "Ups, bei der Bearbeitung Ihrer Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
  TICKETHUB_CREATE_RESERVATION_CONFLICT: "Ein oder mehrere Produkte in Ihrem Warenkorb haben widersprüchliche Zeitfenster. Bitte bearbeiten Sie Ihren Warenkorb und versuchen Sie es erneut.",
  TICKETHUB_CREATE_RESERVATION_ERROR: "Wir haben eine Fehlermeldung von TicketHub erhalten. Bitte versuchen Sie es später noch einmal.",
  TICKETHUB_ERROR: "Wir haben eine Fehlermeldung von TicketHub erhalten. Bitte versuchen Sie es später noch einmal."
}, Cg = {
  calendar: id,
  options: sd,
  cart: ld,
  checkout: cd,
  upgrades: ud,
  payment: dd,
  paymentLoader: fd,
  achievements: pd,
  booking: hd,
  toast: md,
  THError: vd
}, kg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  THError: vd,
  achievements: pd,
  booking: hd,
  calendar: id,
  cart: ld,
  checkout: cd,
  default: Cg,
  options: sd,
  payment: dd,
  paymentLoader: fd,
  toast: md,
  upgrades: ud
}, Symbol.toStringTag, { value: "Module" })), gd = {
  afterMidnightsSlots: "Después de medianoche:",
  date: "Fecha",
  pickATimeslot: "Elige una hora",
  selectDate: "Elige un día",
  selectTime: "Elige una hora",
  selectTimeslot: "Elige una hora",
  time: "Hora",
  today: "Hoy",
  tomorrow: "Mañana"
}, _d = {
  adult: "Adulto | { count } adultos",
  child: "Niño | { count } niños",
  close: "Cerrado",
  customizeYourExperience: "Personalice su experiencia",
  family: "Family",
  guests: "Personas",
  mealsLeftWarning: "Falta { count } comida por elegir | Faltan { count } comidas por elegir",
  openTicket: "ticket abierto",
  student: "Student",
  tickets: "Tickets",
  whoIsGoing: "¿Quién viene?"
}, yd = {
  addDiscountCode: "Añadir otro código de descuento",
  apply: "Aplicar",
  back: "Volver al carrito",
  cartIsEmpty: "Tu carrito está vacio",
  delete: "Eliminar",
  discountCode: "código de descuento (opcional)",
  edit: "Editar",
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
}, bd = {
  agreement: "* Acepto los Términos y Condiciones y la Política de Privacidad",
  agreementWarning: "Debe aceptar los términos y condiciones para completar la compra",
  back: "Volver a los detalles",
  email: "Tu dirección de e-mail",
  emailWarning: "Debes rellenar el campo de correo electrónico",
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
}, Ed = {
  back: "Volver a las mejoras",
  upsellBookSubtitle: "Crear más recuerdos con una experiencia adicional.",
  upsellBookTitle: "Reservar juntos y ahorrar un 20%"
}, wd = {
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
}, Td = {
  booking: "Reservando tus entradas...",
  nearly: "¡Casi listo!"
}, Cd = {
  customerService: "Excelente servicio al cliente",
  easyBooking: "Reserva fácil y segura",
  ticketOnSmartphone: "El billete está disponible directamente"
}, kd = {
  addToCart: "Añadir al carrito",
  bookNow: "Reserva ahora",
  booking: "{ count } reservas",
  from: "En",
  loading: "Cargando ...",
  showMore: "Mostrar más información",
  unavailable: "Actividad no disponible",
  update: "Actualización"
}, Sd = {
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
}, Id = {
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
}, Sg = {
  calendar: gd,
  options: _d,
  cart: yd,
  checkout: bd,
  upgrades: Ed,
  payment: wd,
  paymentLoader: Td,
  achievements: Cd,
  booking: kd,
  toast: Sd,
  THError: Id
}, Ig = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  THError: Id,
  achievements: Cd,
  booking: kd,
  calendar: gd,
  cart: yd,
  checkout: bd,
  default: Sg,
  options: _d,
  payment: wd,
  paymentLoader: Td,
  toast: Sd,
  upgrades: Ed
}, Symbol.toStringTag, { value: "Module" })), Dd = {
  afterMidnightsSlots: "Na middernacht:",
  date: "Datum",
  pickATimeslot: "Kies een tijdslot",
  selectDate: "Kies een dag",
  selectTime: "Kies een tijd",
  selectTimeslot: "Kies een tijdslot",
  time: "Tijd",
  today: "Vandaag",
  tomorrow: "Morgen"
}, Od = {
  adult: "Volwassene | { count } volwassenen",
  child: "Kind | { count } kinderen",
  close: "Sluiten",
  customizeYourExperience: "Pas je ervaring aan",
  family: "Familie",
  guests: "Gasten",
  mealsLeftWarning: "Je hebt nog { count } maaltijd te kiezen | Je hebt nog { count } maaltijden te kiezen",
  openTicket: "Open ticket",
  student: "Student",
  tickets: "Tickets",
  whoIsGoing: "Wie gaat er mee?"
}, Pd = {
  addDiscountCode: "Voeg nog een kortingscode toe",
  apply: "Toepassen",
  back: "Terug naar winkelwagen",
  cartIsEmpty: "Je winkelwagen is leeg",
  delete: "Verwijderen",
  discountCode: "Kortingscode (optioneel)",
  edit: "Aanpassen",
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
}, Ad = {
  agreement: "* Ik ga akkoord met de Algemene Voorwaarden en het Privacybeleid",
  agreementWarning: "Je moet akkoord gaan met de algemene voorwaarden om de aankoop te voltooien",
  back: "Terug naar detals",
  email: "Je e-mail adres",
  emailWarning: "U moet het e-mailveld invullen",
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
}, Nd = {
  back: "Terug naar upgrades",
  upsellBookSubtitle: "Maak meer herinneringen met een extra ervaring.",
  upsellBookTitle: "Samen boeken en 20% besparen"
}, Ld = {
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
}, Rd = {
  booking: "Tickets worden geboekt...",
  nearly: "Bijna klaar!"
}, $d = {
  customerService: "Uitstekende klantenservice",
  easyBooking: "Gemakkelijk en veilig boeken",
  ticketOnSmartphone: "Ticket is direct beschikbaar"
}, Md = {
  addToCart: "Leg in winkelwagen",
  bookNow: "Boek nu",
  booking: "{ count } boeking | { count } boekingen",
  from: "Van",
  loading: "Laden ...",
  showMore: "Meer informatie",
  unavailable: "Activiteit niet beschikbaar",
  update: "Update"
}, xd = {
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
}, Bd = {
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
}, Dg = {
  calendar: Dd,
  options: Od,
  cart: Pd,
  checkout: Ad,
  upgrades: Nd,
  payment: Ld,
  paymentLoader: Rd,
  achievements: $d,
  booking: Md,
  toast: xd,
  THError: Bd
}, Og = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  THError: Bd,
  achievements: $d,
  booking: Md,
  calendar: Dd,
  cart: Pd,
  checkout: Ad,
  default: Dg,
  options: Od,
  payment: Ld,
  paymentLoader: Rd,
  toast: xd,
  upgrades: Nd
}, Symbol.toStringTag, { value: "Module" })), Vd = {
  afterMidnightsSlots: "Après minuit:",
  date: "Date",
  pickATimeslot: "Sélectionnez un créneau horaire",
  selectDate: "Sélectionnez une date",
  selectTime: "Sélectionnez l'heure",
  selectTimeslot: "Sélectionnez un créneau horaire",
  time: "L'heure",
  today: "Aujourd'hui",
  tomorrow: "Demain"
}, Ud = {
  adult: "Adulte | { count } Adultes",
  child: "Enfant | { count } Enfants",
  close: "Fermer",
  customizeYourExperience: "Personnalise ton expérience",
  family: "Famille",
  guests: "Invités",
  mealsLeftWarning: "Tu as { count } repas à choisir",
  openTicket: "Billet ouvert",
  student: "Étudiant",
  tickets: "Billets",
  whoIsGoing: "Qui y va ?"
}, Fd = {
  addDiscountCode: "Ajouter un autre code de réduction",
  apply: "Appliquer",
  back: "Retour au panier",
  cartIsEmpty: "Votre panier est vide",
  delete: "Enlever",
  discountCode: "Code de réduction (facultatif)",
  edit: "Éditer",
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
}, Hd = {
  agreement: "J'accepte les conditions générales et la politique de confidentialité.",
  agreementWarning: "Vous devez accepter les conditions générales pour effectuer l'achat.",
  back: "Retour à mes données personnelles",
  email: "Votre adresse e-mail",
  emailWarning: "Veuillez indiquer votre adresse e-mail",
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
}, Yd = {
  back: "Retour aux upgrades",
  upsellBookSubtitle: "Faites plus de souvenirs avec une expérience supplémentaire.",
  upsellBookTitle: "Ajouter à la réservation pour économiser de l'argent"
}, jd = {
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
}, Wd = {
  booking: "Réservez vos billets...",
  nearly: "Presque prêt !"
}, qd = {
  customerService: "Excellent service à la clientèle",
  easyBooking: "Réservation facile et sécurisée",
  ticketOnSmartphone: "Le billet est directement disponible sur le smartphone"
}, Gd = {
  addToCart: "Ajouter au panier",
  bookNow: "Réservez maintenant",
  booking: "{ count } réservation | { count } réservations",
  from: "De",
  loading: "Chargement ...",
  showMore: "Plus d'informations",
  unavailable: "Activité indisponible",
  update: "Enregistrer les modifications"
}, zd = {
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
}, Xd = {
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
}, Pg = {
  calendar: Vd,
  options: Ud,
  cart: Fd,
  checkout: Hd,
  upgrades: Yd,
  payment: jd,
  paymentLoader: Wd,
  achievements: qd,
  booking: Gd,
  toast: zd,
  THError: Xd
}, Ag = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  THError: Xd,
  achievements: qd,
  booking: Gd,
  calendar: Vd,
  cart: Fd,
  checkout: Hd,
  default: Pg,
  options: Ud,
  payment: jd,
  paymentLoader: Wd,
  toast: zd,
  upgrades: Yd
}, Symbol.toStringTag, { value: "Module" })), Jt = fg({
  legacy: !1,
  locale: "en",
  globalInjection: !0,
  fallbackLocale: "en",
  messages: {
    en: Tg,
    de: kg,
    es: Ig,
    nl: Og,
    fr: Ag
  }
});
var Jr;
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
})(Jr || (Jr = {}));
var Ml = /^GTM-[0-9A-Z]+$/;
function Za(e) {
  if (typeof e != "string" || !Ml.test(e)) {
    let t = String(e).toUpperCase().replace(/.*-|[^0-9A-Z]/g, ""), n = t.length === 0 ? "" : ` Did you mean 'GTM-${t}'?`;
    throw new Error(`'${e}' is not a valid GTM-ID (${Ml}).${n}`);
  }
}
function xr(e, t = "dataLayer") {
  return e[t] || (e[t] = []), e[t];
}
function fr(e, t) {
  let n = document, r = n.createElement("script"), o = (c) => {
    var u;
    (u = t.onReady) == null || u.call(t, { id: e, script: r }), r.removeEventListener("load", o);
  };
  r.addEventListener("load", o);
  let a = t.dataLayerName ?? "dataLayer";
  if (xr(window, a).push({ event: "gtm.js", "gtm.start": (/* @__PURE__ */ new Date()).getTime() }), !e)
    return r;
  r.async = !t.defer, r.defer = !!(t.defer || t.compatibility), t.nonce && r.setAttribute("nonce", t.nonce), t.scriptType && (r.type = t.scriptType);
  let i = new URLSearchParams({ id: e, ...t.dataLayerName ? { l: t.dataLayerName } : {}, ...t.queryParams ?? {} }), l = t.source ?? "https://www.googletagmanager.com/gtm.js";
  r.src = `${l}?${i}`;
  let s = t.parentElement ?? n.body;
  if (typeof (s == null ? void 0 : s.appendChild) != "function")
    throw new Error("parentElement must be a DOM element");
  return s.appendChild(r), r;
}
function Ng(e = "https://www.googletagmanager.com/gtm.js") {
  return Array.from(document.getElementsByTagName("script")).some((t) => t.src.includes(e));
}
var Lg = class {
  constructor(e) {
    oe(this, "id");
    oe(this, "options");
    oe(this, "scriptElements", []);
    oe(this, "isInBrowserContext", () => typeof window < "u");
    if (Array.isArray(e.id))
      for (let t of e.id)
        Za(typeof t == "string" ? t : t.id);
    else
      Za(e.id);
    this.id = e.id, this.options = { enabled: !0, debug: !1, loadScript: !0, defer: !1, compatibility: !1, dataLayerName: "dataLayer", ...e }, delete this.options.id;
  }
  enabled() {
    return this.options.enabled ?? !0;
  }
  enable(e = !0, t) {
    if (this.options.enabled = e, this.isInBrowserContext() && e && !Ng(t) && this.options.loadScript)
      if (Array.isArray(this.id))
        this.id.forEach((n) => {
          let r;
          typeof n == "string" ? r = fr(n, { ...this.options }) : r = fr(n.id, { ...this.options, queryParams: n.queryParams }), this.scriptElements.push(r);
        });
      else {
        let n = fr(this.id, { ...this.options });
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
    return this.isInBrowserContext() && this.options.enabled ? xr(window, this.options.dataLayerName) : !1;
  }
  trackView(e, t, n = {}) {
    let r = this.isInBrowserContext() && (this.options.enabled ?? !1);
    this.options.debug && console.log(`[GTM-Support${r ? "" : "(disabled)"}]: Dispatching TrackView`, { screenName: e, path: t }), r && xr(window, this.options.dataLayerName).push({ ...n, event: this.options.trackViewEventProperty ?? "content-view", "content-name": t, "content-view-name": e });
  }
  trackEvent({ event: e, category: t = null, action: n = null, label: r = null, value: o = null, noninteraction: a = !1, ...i } = {}) {
    let l = this.isInBrowserContext() && (this.options.enabled ?? !1);
    this.options.debug && console.log(`[GTM-Support${l ? "" : "(disabled)"}]: Dispatching event`, { event: e, category: t, action: n, label: r, value: o, ...i }), l && xr(window, this.options.dataLayerName).push({ event: e ?? "interaction", target: t, action: n, "target-properties": r, value: o, "interaction-type": a, ...i });
  }
  push(e) {
    let t = this.isInBrowserContext() && (this.options.enabled ?? !1);
    this.options.debug && console.log(`[GTM-Support${t ? "" : "(disabled)"}]: Dispatching event`, e), t && xr(window, this.options.dataLayerName).push(e);
  }
}, Ge;
function Rg(e, t = { id: "" }) {
  t = { trackOnNextTick: !1, ...t }, Ge = new Lg(t), e.config.globalProperties.$gtm = Ge, Ge.isInBrowserContext() && (t.vueRouter && $g(e, t.vueRouter, t.ignoredViews, t.trackOnNextTick, t.vueRouterAdditionalEventData), Ge.options.enabled && Ge.options.loadScript && (Array.isArray(t.id) ? t.id.forEach((n) => {
    if (typeof n == "string")
      fr(n, t);
    else {
      let r = { ...t };
      n.queryParams != null && (r.queryParams = { ...r.queryParams, ...n.queryParams }), fr(n.id, r);
    }
  }) : fr(t.id, t))), e.provide("gtm", t);
}
function $g(e, t, n = [], r, o = () => ({})) {
  function a(i, l) {
    return i instanceof Error ? !!(i.type & l) : !1;
  }
  t.afterEach(async (i, l, s) => {
    var d, v, h;
    if (typeof i.name != "string" || Array.isArray(n) && n.includes(i.name) || typeof n == "function" && n(i, l))
      return;
    let c = i.meta && typeof i.meta.gtm == "string" && i.meta.gtm ? i.meta.gtm : i.name;
    a(s, 4) ? Ge != null && Ge.debugEnabled() && console.log(`[VueGtm]: '${c}' not tracked due to navigation aborted`) : a(s, 8) && (Ge != null && Ge.debugEnabled()) && console.log(`[VueGtm]: '${c}' not tracked due to navigation cancelled`);
    let u = { ...await o(i, l), ...(d = i.meta) == null ? void 0 : d.gtmAdditionalEventData }, f = ((h = (v = t.options) == null ? void 0 : v.history) == null ? void 0 : h.base) ?? "";
    f.endsWith("/") || (f += "/"), f += i.fullPath.startsWith("/") ? i.fullPath.substring(1) : i.fullPath, r ? mr(() => {
      Ge == null || Ge.trackView(c, f, u);
    }) : Ge == null || Ge.trackView(c, f, u);
  });
}
function Mg(e) {
  return { install: (t) => Rg(t, e) };
}
function Qa() {
  return Ge;
}
var oa;
((e) => {
  let t, n;
  e.init = (r = "/actions/ticket-hub/currencies") => {
    n = r, t = new ho(r, void 0, {
      headers: {
        Authorization: "Basic TWFya2VuLUV4cHJlc3M6TWFya2VuLUV4cHJlc3MtU2VjcmV0"
      }
    });
  }, e.getCurrencies = async () => (await t.get(
    n,
    {},
    !0
  )).Cube.Cube.Cube;
})(oa || (oa = {}));
const bn = Sn(
  "currency",
  () => {
    const e = ne([
      {
        code: "EUR",
        symbol: "€",
        description: "Euro",
        rate: "1"
      }
    ]), t = ne(e.value[0]), n = se(() => t.value ?? e.value[0]);
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
          i = await oa.getCurrencies();
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
), xl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  useCurrencyStore: bn
}, Symbol.toStringTag, { value: "Module" }));
var _r;
((e) => {
  const t = (o) => {
    const a = bn();
    return Number(+o * Number(a.currentCurrency.rate)).toFixed(2);
  }, n = async (o = "view_cart", a = {}, i) => {
    var v;
    const l = (await Promise.resolve().then(() => xl)).useCurrencyStore(), s = (await Promise.resolve().then(() => nf)).useCartStore();
    let c = s.items, u = s.cart.totalDiscountedPrice;
    if (typeof i < "u" && (c = i.items.map(
      (h) => br.getCartProduct(h)
    ), u = i.totalDiscountedPrice), c.length === 0)
      return;
    const f = [];
    for (const h of c)
      for (const _ of h.selectedCategories)
        _.quantity <= 0 || f.push({
          item_id: h.itemId,
          item_name: h.title,
          category: _.itemCategoryName,
          quantity: _.quantity,
          price: t(
            _.totalDiscountedPrice / _.quantity
          )
        });
    const d = Qa();
    d == null || d.trackEvent({
      event: o,
      currency: (v = l.currentCurrency) == null ? void 0 : v.code,
      value: t(u),
      items: f,
      ...a
    });
  }, r = async (o, a = "add_to_cart") => {
    var f;
    const i = (await Promise.resolve().then(() => xl)).useCurrencyStore(), l = Qa(), s = [];
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
    const i = Qa();
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
})(_r || (_r = {}));
var xg = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const { localizedTitle: Bg } = Jr, { t: ei } = Jt.global;
class Kd {
  constructor(t, n = !0, r = /* @__PURE__ */ new Date()) {
    oe(this, "itemId");
    oe(this, "_title");
    oe(this, "bookingsCount");
    oe(this, "rating");
    oe(this, "reviewsCount");
    oe(this, "duration");
    oe(this, "discount");
    oe(this, "id");
    oe(this, "variants");
    oe(this, "defaultPrice");
    oe(this, "oldPrice");
    oe(this, "image");
    oe(this, "cancellationPolicy");
    oe(this, "url");
    oe(this, "options");
    oe(this, "availableCategories");
    oe(this, "availableDays");
    oe(this, "selectedTimeslots");
    oe(this, "items");
    oe(this, "selectedDate");
    oe(this, "metaData");
    oe(this, "cartItemId");
    oe(this, "isSellable");
    oe(this, "isUpsell");
    this.id = t.id ?? 0, this.bookingsCount = t.bookingsCount ?? 0, this.rating = t.rating ?? 0, this.reviewsCount = t.reviewsCount ?? 0, this.duration = t.duration ?? "", this.defaultPrice = t.defaultPrice, this.oldPrice = t.oldPrice ?? 0, this.discount = t.discount ?? "", this.cancellationPolicy = t.cancellationPolicy || "", this.itemId = t.itemId, this.availableCategories = [], this.options = [], this.availableDays = [], this.selectedTimeslots = {}, this.selectedDate = r, this.items = [], this.url = t.url ?? window.location.href, this.metaData = "", this.cartItemId = 0, this.isSellable = n, this.isUpsell = t.upsell ?? !1, this.variants = typeof t.variants < "u" ? t.variants.map(
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
    ), +xg.VITE_DEBUG && console.log("Product constructor end");
  }
  get title() {
    return Bg(this._title);
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
  get cartItem() {
    return lt().getItemByCartItemId(this.cartItemId);
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
    const t = ei("options.whoIsGoing");
    if (this.isDisabled)
      return t;
    const n = [];
    return this.availableCategories.forEach((r) => {
      r.quantity > 0 && n.push(
        ei(
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
    }), t.length === 0 ? ei("options.customizeYourExperience") : t.join(" - ").toLowerCase();
  }
  async addToCart() {
    await (await Promise.resolve().then(() => nf)).useCartStore().addCartItem(this.cartProductFormat), await _r.addToCart(this);
  }
  getCategoryPrice(t) {
    var n;
    if (this.isOpen) {
      const r = this.showedItems[0].itemPrices.find((o) => he(o.dateTime).isSame(this.selectedDate, "day") && o.itemCategory.itemCategoryId === t);
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
    }), this.availableCapacity >= n ? n : this.availableCapacity - n;
  }
  selectDate(t = /* @__PURE__ */ new Date()) {
    let n = t;
    this.availableDays.length > 0 && !this.availableDays.find((r) => he(r.date).isSame(t, "day")) && (n = he(this.availableDays[0].date).toDate()), this.selectedDate = n;
  }
  selectVariant(t) {
    this.itemId = t;
  }
  isDateExistsInAvailableDays(t) {
    const n = he(t);
    return typeof this.availableDays.find(
      (o) => he(o.date).isSame(n)
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
var Jd = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(hn, function() {
    var n = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, r = {};
    return function(o, a, i) {
      var l, s = function(d, v, h) {
        h === void 0 && (h = {});
        var _ = new Date(d), m = function(p, g) {
          g === void 0 && (g = {});
          var S = g.timeZoneName || "short", O = p + "|" + S, L = r[O];
          return L || (L = new Intl.DateTimeFormat("en-US", { hour12: !1, timeZone: p, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: S }), r[O] = L), L;
        }(v, h);
        return m.formatToParts(_);
      }, c = function(d, v) {
        for (var h = s(d, v), _ = [], m = 0; m < h.length; m += 1) {
          var p = h[m], g = p.type, S = p.value, O = n[g];
          O >= 0 && (_[O] = parseInt(S, 10));
        }
        var L = _[3], b = L === 24 ? 0 : L, w = _[0] + "-" + _[1] + "-" + _[2] + " " + b + ":" + _[4] + ":" + _[5] + ":000", T = +d;
        return (i.utc(w).valueOf() - (T -= T % 1e3)) / 6e4;
      }, u = a.prototype;
      u.tz = function(d, v) {
        d === void 0 && (d = l);
        var h = this.utcOffset(), _ = this.toDate(), m = _.toLocaleString("en-US", { timeZone: d }), p = Math.round((_ - new Date(m)) / 1e3 / 60), g = i(m, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(_.getTimezoneOffset() / 15) - p, !0);
        if (v) {
          var S = g.utcOffset();
          g = g.add(h - S, "minute");
        }
        return g.$x.$timezone = d, g;
      }, u.offsetName = function(d) {
        var v = this.$x.$timezone || i.tz.guess(), h = s(this.valueOf(), v, { timeZoneName: d }).find(function(_) {
          return _.type.toLowerCase() === "timezonename";
        });
        return h && h.value;
      };
      var f = u.startOf;
      u.startOf = function(d, v) {
        if (!this.$x || !this.$x.$timezone)
          return f.call(this, d, v);
        var h = i(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
        return f.call(h, d, v).tz(this.$x.$timezone, !0);
      }, i.tz = function(d, v, h) {
        var _ = h && v, m = h || v || l, p = c(+i(), m);
        if (typeof d != "string")
          return i(d).tz(m);
        var g = function(b, w, T) {
          var k = b - 60 * w * 1e3, y = c(k, T);
          if (w === y)
            return [k, w];
          var I = c(k -= 60 * (y - w) * 1e3, T);
          return y === I ? [k, y] : [b - 60 * Math.min(y, I) * 1e3, Math.max(y, I)];
        }(i.utc(d, _).valueOf(), p, m), S = g[0], O = g[1], L = i(S).utcOffset(O);
        return L.$x.$timezone = m, L;
      }, i.tz.guess = function() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      }, i.tz.setDefault = function(d) {
        l = d;
      };
    };
  });
})(Jd);
var Vg = Jd.exports;
const Ug = /* @__PURE__ */ po(Vg);
var Zd = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(hn, function() {
    var n = "minute", r = /[+-]\d\d(?::?\d\d)?/g, o = /([+-]|\d\d)/g;
    return function(a, i, l) {
      var s = i.prototype;
      l.utc = function(_) {
        var m = { date: _, utc: !0, args: arguments };
        return new i(m);
      }, s.utc = function(_) {
        var m = l(this.toDate(), { locale: this.$L, utc: !0 });
        return _ ? m.add(this.utcOffset(), n) : m;
      }, s.local = function() {
        return l(this.toDate(), { locale: this.$L, utc: !1 });
      };
      var c = s.parse;
      s.parse = function(_) {
        _.utc && (this.$u = !0), this.$utils().u(_.$offset) || (this.$offset = _.$offset), c.call(this, _);
      };
      var u = s.init;
      s.init = function() {
        if (this.$u) {
          var _ = this.$d;
          this.$y = _.getUTCFullYear(), this.$M = _.getUTCMonth(), this.$D = _.getUTCDate(), this.$W = _.getUTCDay(), this.$H = _.getUTCHours(), this.$m = _.getUTCMinutes(), this.$s = _.getUTCSeconds(), this.$ms = _.getUTCMilliseconds();
        } else
          u.call(this);
      };
      var f = s.utcOffset;
      s.utcOffset = function(_, m) {
        var p = this.$utils().u;
        if (p(_))
          return this.$u ? 0 : p(this.$offset) ? f.call(this) : this.$offset;
        if (typeof _ == "string" && (_ = function(L) {
          L === void 0 && (L = "");
          var b = L.match(r);
          if (!b)
            return null;
          var w = ("" + b[0]).match(o) || ["-", 0, 0], T = w[0], k = 60 * +w[1] + +w[2];
          return k === 0 ? 0 : T === "+" ? k : -k;
        }(_), _ === null))
          return this;
        var g = Math.abs(_) <= 16 ? 60 * _ : _, S = this;
        if (m)
          return S.$offset = g, S.$u = _ === 0, S;
        if (_ !== 0) {
          var O = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          (S = this.local().add(g + O, n)).$offset = g, S.$x.$localOffset = O;
        } else
          S = this.utc();
        return S;
      };
      var d = s.format;
      s.format = function(_) {
        var m = _ || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
        return d.call(this, m);
      }, s.valueOf = function() {
        var _ = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
        return this.$d.valueOf() - 6e4 * _;
      }, s.isUTC = function() {
        return !!this.$u;
      }, s.toISOString = function() {
        return this.toDate().toISOString();
      }, s.toString = function() {
        return this.toDate().toUTCString();
      };
      var v = s.toDate;
      s.toDate = function(_) {
        return _ === "s" && this.$offset ? l(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : v.call(this);
      };
      var h = s.diff;
      s.diff = function(_, m, p) {
        if (_ && this.$u === _.$u)
          return h.call(this, _, m, p);
        var g = this.local(), S = l(_).local();
        return h.call(g, S, m, p);
      };
    };
  });
})(Zd);
var Fg = Zd.exports;
const Hg = /* @__PURE__ */ po(Fg), { t: Yg } = Jt.global;
he.extend(Hg);
he.extend(Ug);
class Ta {
  constructor(t, n = void 0, r = !1) {
    oe(this, "id");
    oe(this, "dateTime");
    oe(this, "capacity");
    oe(this, "prices");
    oe(this, "isOpen");
    oe(this, "price");
    oe(this, "isDynamic");
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
    return this.isOpen ? Yg("options.openTicket") : he(this.dateTime).format("HH:mm");
  }
  get humanizedDate() {
    return he(this.dateTime).format("DD/MM/YYYY");
  }
  get isExpired() {
    const t = lt(), n = he.tz(this.dateTime, "Europe/Amsterdam"), r = t.getServerTime;
    return typeof r > "u" ? !1 : this.isOpen ? he(n).isBefore(r, "day") : n.isBefore(r);
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
class Qd {
  constructor(t, n, r = !1) {
    oe(this, "id");
    oe(this, "itemName");
    oe(this, "type");
    oe(this, "timeslots");
    oe(this, "dynamicPricingInfo");
    oe(this, "itemPrices");
    oe(this, "isCombo");
    oe(this, "displayCapacity");
    oe(this, "selectedTimeslot");
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
            new Ta(
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
    return this.timeslots.filter((n) => he(n.dateTime).isSame(t, "day") && n.isOpen ? !0 : he(n.dateTime).isSame(t, "day"));
  }
  nightTimeslots(t = /* @__PURE__ */ new Date()) {
    return this.timeslots.filter((r) => {
      if (r.isOpen)
        return !1;
      const o = he(t).add(1, "day").set("hour", 6);
      return he(r.dateTime).isAfter(t, "day") && he(r.dateTime).isBefore(o, "minutes");
    });
  }
  selectTimeslot(t) {
    this.selectedTimeslot = t;
  }
}
const { t: jg } = Jt.global;
class Ca {
  constructor(t, n = !1) {
    oe(this, "itemCategoryId");
    oe(this, "itemCategoryName");
    oe(this, "orderPriority");
    oe(this, "_quantity");
    oe(this, "_totalPrice");
    oe(this, "_totalDiscountedPrice");
    this.itemCategoryId = t.itemCategoryId, this.itemCategoryName = t.itemCategoryName, this.orderPriority = t.orderPriority || 0, this._quantity = n ? t.quantity : lt().getCategoryPreselectQuantity(this.itemCategoryId).value ?? 0, this._totalPrice = t.totalPrice || t.totalDiscountedPrice || 0, this._totalDiscountedPrice = t.totalDiscountedPrice || 0;
  }
  get quantity() {
    return this._quantity;
  }
  set quantity(t) {
    this._quantity = t, lt().updateCategoryPreselectQuantity(this.itemCategoryId, t);
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
    return jg(`options.${this.itemCategoryName}`.toLowerCase(), this.quantity);
  }
}
var Wg = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
class ti extends Kd {
  constructor(n, r = !0) {
    super(n, r);
    oe(this, "isCombo", !0);
    oe(this, "isSingle", !this.isCombo);
    oe(this, "cartItemId", "00000000-0000-0000-0000-000000000000");
    oe(this, "packageItems", []);
    +Wg.VITE_DEBUG && console.log("Combo product constructor end");
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
    this.availableCategories = this.packageItems.map((n) => new Ca(n.availableCategory));
  }
  setItems() {
    this.items.length === 0 ? this.items = this.defaultPackage.packageItems.map(
      (n) => new Qd(n, this.itemPrices, !0)
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
class qg {
  constructor(t) {
    oe(this, "id");
    oe(this, "description");
    oe(this, "itemCategoryId");
    oe(this, "quantity");
    this.id = t.id, this.description = t.description, this.itemCategoryId = t.itemCategoryId, this.quantity = 0;
  }
}
var qt = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
class Gg extends Kd {
  constructor(n, r = !0, o = /* @__PURE__ */ new Date()) {
    super(n, r, o);
    oe(this, "isSingle", !0);
    oe(this, "isCombo", !this.isSingle);
    oe(this, "items", []);
    +qt.VITE_DEBUG && console.log("Single product constructor end");
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
    var n;
    return {
      item: {
        cartItemId: this.cartItemId,
        itemId: this.itemId,
        itemPriceInfos: this.formattedCartCategories,
        timeslot: ((n = this.items[0].selectedTimeslot) == null ? void 0 : n.cartTimeslotFormat) || null,
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
        const r = new Ta(
          this.cartItem.item.timeslot,
          n
        );
        this.items.forEach((o) => {
          const a = o.timeslots.find(
            (i) => i.id === r.id
          );
          typeof a > "u" || o.selectTimeslot(a);
        }), this.selectDate(he(r.dateTime).toDate());
      }
    }
  }
  async setBookingData(n) {
    if (+qt.VITE_DEBUG && console.log("Set booking data start"), n.extra && n.extra.meals && (this.options = n.extra.meals.map(
      (i) => new qg(i)
    ), +qt.VITE_DEBUG && console.log("Set extra end")), this.availableCategories = n.availableCategories.map(
      (i) => new Ca(i)
    ), +qt.VITE_DEBUG && console.log("Set categories end"), +qt.VITE_DEBUG && console.log("Set product booking start"), this.items.length === 0) {
      const i = new Qd(
        n,
        n.itemPriceInfos
      );
      this.items = [i], this.isEdit && this.fillEditData();
    } else
      this.items.forEach((i) => {
        i.setBookingData(n, n.itemPriceInfos);
      });
    +qt.VITE_DEBUG && console.log("Set product booking end");
    const { daysAddedCount: r } = await this.setAvailableDays(n), o = he(this.selectedDate), a = this.availableDays.find(
      (i) => o.isSame(i.date, "day")
    );
    return (!this.selectedDate || typeof a > "u") && this.selectDate(new Date(this.availableDays[0].date)), +qt.VITE_DEBUG && console.log("Set booking data end"), { daysAddedCount: r };
  }
  async setAvailableDays(n) {
    +qt.VITE_DEBUG && console.log("Set days start");
    const r = n.availableDays.map(
      (o) => {
        var i;
        const a = n.itemPriceInfos.find((l) => l.itemCategory.itemCategoryId === this.defaultProductCategory.itemCategoryId && he(l.dateTime).isSame(o, "day"));
        return {
          date: o,
          price: ((i = a == null ? void 0 : a.dynamicPrice) == null ? void 0 : i.dynamicPrice) || (a == null ? void 0 : a.itemPrice.itemPrice)
        };
      }
    );
    return this.availableDays = this.availableDays.concat(r).sort((o, a) => o.date < a.date ? -1 : o.date > a.date ? 1 : 0), +qt.VITE_DEBUG && console.log("Set days end"), { daysAddedCount: r.length };
  }
}
var Bl = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const zg = (e = "", t = !0, n = null, r = n, o = Bl.imageQuality, a = void 0, i = "center", l = "crop") => {
  let s;
  try {
    s = new URL(e);
  } catch {
    s = new URL(Bl.baseUrl), s.pathname = e || "/assets/promo-banner.webp";
  }
  const c = 2, u = [];
  if (s.searchParams.set("quality", o), s.searchParams.set("anchor", i), s.searchParams.set("mode", l), typeof a < "u" && s.searchParams.set("crop", a), n || (n = s.searchParams.get("width"), r = s.searchParams.get("height")), n)
    for (let f = 1; f <= c; f++) {
      s.searchParams.set("width", `${+n * f}`), s.searchParams.set("height", `${+r * f}`);
      let d = `${s.href} ${f}x`;
      t && (d = `url(${s.href}) ${f}x`), u.push(d);
    }
  return u.join(", ");
}, { t: Xg } = Jt.global;
class ef {
  constructor(t, n, r = 0, o = !1, a) {
    oe(this, "content");
    oe(this, "isVariant");
    oe(this, "totalPrice");
    oe(this, "id");
    oe(this, "itemId");
    oe(this, "selectedCategories");
    oe(this, "isCombo");
    oe(this, "isSingle");
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
        Xg(
          `options.${n.itemCategoryName}`.toLowerCase(),
          n.quantity
        )
      );
    }), t.join(" - ");
  }
  getImageSrcset(t = 148) {
    return zg(this.preview, !1, t);
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
class Kg extends ef {
  constructor(n) {
    var r, o, a, i, l, s;
    super(
      (r = n.packageGroup) == null ? void 0 : r.contentInfo,
      (o = n.packageGroup) == null ? void 0 : o.cartPackageGroupId,
      (a = n.packageGroup) == null ? void 0 : a.totalPrice,
      (i = n.packageGroup) == null ? void 0 : i.contentInfo.isVariant,
      (l = n.packageGroup) == null ? void 0 : l.packageGroupId
    );
    oe(this, "packages");
    this.isCombo = !0, this.isSingle = !1, this.packages = (s = n.packageGroup) == null ? void 0 : s.packages, this.selectedCategories = this.packages.map((c) => new Ca(
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
        return n.timeslot && (r = new Ta(n.timeslot)), {
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
class Jg extends ef {
  constructor(n) {
    var r, o, a, i, l, s;
    super(
      (r = n.item) == null ? void 0 : r.contentInfo,
      ((o = n.item) == null ? void 0 : o.cartItemId).toString(),
      (a = n.item) == null ? void 0 : a.totalPrice,
      (i = n.item) == null ? void 0 : i.contentInfo.isVariant,
      (l = n.item) == null ? void 0 : l.itemId
    );
    oe(this, "item");
    this.isCombo = !1, this.isSingle = !0, this.item = n.item, this.selectedCategories = (s = n.item) == null ? void 0 : s.itemPriceInfos.map(
      (c) => {
        var u, f;
        return new Ca(
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
    return this.item.timeslot && (n = new Ta(this.item.timeslot)), [
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
var yr;
((e) => {
  let t;
  e.init = (n, r, o = "", a = "") => {
    const i = {
      "Content-Type": "application/json;charset=utf-8"
    };
    o && (i["x-cart-id"] = o), a && (i["x-api-key"] = a), t = new ho(n, void 0, {
      params: { culture: r },
      headers: i
    });
  }, e.getAvailableDays = async (n, r = !0) => await t.get("capacity/item/available-days", {
    params: {
      itemId: n,
      firstDayOnly: r.toString()
    }
  }), e.getProductBookingData = async (n, r = he().format("YYYY-MM-DD"), o = 45) => {
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
})(yr || (yr = {}));
var Zg = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 }, br;
((e) => {
  e.getProduct = async (n) => {
    +Zg.VITE_DEBUG && console.log("Detect product");
    try {
      return typeof n.isCombo < "u" ? n.isCombo ? new ti(n) : await t(n) : await t(n);
    } catch {
      return typeof n.isCombo < "u" && !n.isCombo ? new ti(n, !1) : new ti(n);
    }
  };
  const t = async (n) => {
    try {
      const r = await yr.getAvailableDays(n.itemId);
      return new Gg(
        n,
        r.isSellable,
        new Date(r.availableDays[0])
      );
    } catch (r) {
      throw new Error(r);
    }
  };
  e.getCartProduct = (n) => n.item === null && n.packageGroup ? new Kg(n) : new Jg(n);
})(br || (br = {}));
function Mo(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var tf = { exports: {} };
(function(e, t) {
  (function(n) {
    e.exports = n();
  })(function() {
    return function n(r, o, a) {
      function i(c, u) {
        if (!o[c]) {
          if (!r[c]) {
            var f = typeof Mo == "function" && Mo;
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
      for (var l = typeof Mo == "function" && Mo, s = 0; s < a.length; s++)
        i(a[s]);
      return i;
    }({ 1: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        var h = n("crypto");
        function _(b, w) {
          w = g(b, w);
          var T;
          return (T = w.algorithm !== "passthrough" ? h.createHash(w.algorithm) : new L()).write === void 0 && (T.write = T.update, T.end = T.update), O(w, T).dispatch(b), T.update || T.end(""), T.digest ? T.digest(w.encoding === "buffer" ? void 0 : w.encoding) : (b = T.read(), w.encoding !== "buffer" ? b.toString(w.encoding) : b);
        }
        (o = r.exports = _).sha1 = function(b) {
          return _(b);
        }, o.keys = function(b) {
          return _(b, { excludeValues: !0, algorithm: "sha1", encoding: "hex" });
        }, o.MD5 = function(b) {
          return _(b, { algorithm: "md5", encoding: "hex" });
        }, o.keysMD5 = function(b) {
          return _(b, { algorithm: "md5", encoding: "hex", excludeValues: !0 });
        };
        var m = h.getHashes ? h.getHashes().slice() : ["sha1", "md5"], p = (m.push("passthrough"), ["buffer", "hex", "binary", "base64"]);
        function g(b, w) {
          var T = {};
          if (T.algorithm = (w = w || {}).algorithm || "sha1", T.encoding = w.encoding || "hex", T.excludeValues = !!w.excludeValues, T.algorithm = T.algorithm.toLowerCase(), T.encoding = T.encoding.toLowerCase(), T.ignoreUnknown = w.ignoreUnknown === !0, T.respectType = w.respectType !== !1, T.respectFunctionNames = w.respectFunctionNames !== !1, T.respectFunctionProperties = w.respectFunctionProperties !== !1, T.unorderedArrays = w.unorderedArrays === !0, T.unorderedSets = w.unorderedSets !== !1, T.unorderedObjects = w.unorderedObjects !== !1, T.replacer = w.replacer || void 0, T.excludeKeys = w.excludeKeys || void 0, b === void 0)
            throw new Error("Object argument required.");
          for (var k = 0; k < m.length; ++k)
            m[k].toLowerCase() === T.algorithm.toLowerCase() && (T.algorithm = m[k]);
          if (m.indexOf(T.algorithm) === -1)
            throw new Error('Algorithm "' + T.algorithm + '"  not supported. supported values: ' + m.join(", "));
          if (p.indexOf(T.encoding) === -1 && T.algorithm !== "passthrough")
            throw new Error('Encoding "' + T.encoding + '"  not supported. supported values: ' + p.join(", "));
          return T;
        }
        function S(b) {
          if (typeof b == "function")
            return /^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i.exec(Function.prototype.toString.call(b)) != null;
        }
        function O(b, w, T) {
          T = T || [];
          function k(y) {
            return w.update ? w.update(y, "utf8") : w.write(y, "utf8");
          }
          return { dispatch: function(y) {
            return this["_" + ((y = b.replacer ? b.replacer(y) : y) === null ? "null" : typeof y)](y);
          }, _object: function(y) {
            var I, A = Object.prototype.toString.call(y), U = /\[object (.*)\]/i.exec(A);
            if (U = (U = U ? U[1] : "unknown:[" + A + "]").toLowerCase(), 0 <= (A = T.indexOf(y)))
              return this.dispatch("[CIRCULAR:" + A + "]");
            if (T.push(y), l !== void 0 && l.isBuffer && l.isBuffer(y))
              return k("buffer:"), k(y);
            if (U === "object" || U === "function" || U === "asyncfunction")
              return A = Object.keys(y), b.unorderedObjects && (A = A.sort()), b.respectType === !1 || S(y) || A.splice(0, 0, "prototype", "__proto__", "constructor"), b.excludeKeys && (A = A.filter(function(x) {
                return !b.excludeKeys(x);
              })), k("object:" + A.length + ":"), I = this, A.forEach(function(x) {
                I.dispatch(x), k(":"), b.excludeValues || I.dispatch(y[x]), k(",");
              });
            if (!this["_" + U]) {
              if (b.ignoreUnknown)
                return k("[" + U + "]");
              throw new Error('Unknown object type "' + U + '"');
            }
            this["_" + U](y);
          }, _array: function(y, x) {
            x = x !== void 0 ? x : b.unorderedArrays !== !1;
            var A = this;
            if (k("array:" + y.length + ":"), !x || y.length <= 1)
              return y.forEach(function(N) {
                return A.dispatch(N);
              });
            var U = [], x = y.map(function(N) {
              var R = new L(), F = T.slice();
              return O(b, R, F).dispatch(N), U = U.concat(F.slice(T.length)), R.read().toString();
            });
            return T = T.concat(U), x.sort(), this._array(x, !1);
          }, _date: function(y) {
            return k("date:" + y.toJSON());
          }, _symbol: function(y) {
            return k("symbol:" + y.toString());
          }, _error: function(y) {
            return k("error:" + y.toString());
          }, _boolean: function(y) {
            return k("bool:" + y.toString());
          }, _string: function(y) {
            k("string:" + y.length + ":"), k(y.toString());
          }, _function: function(y) {
            k("fn:"), S(y) ? this.dispatch("[native]") : this.dispatch(y.toString()), b.respectFunctionNames !== !1 && this.dispatch("function-name:" + String(y.name)), b.respectFunctionProperties && this._object(y);
          }, _number: function(y) {
            return k("number:" + y.toString());
          }, _xml: function(y) {
            return k("xml:" + y.toString());
          }, _null: function() {
            return k("Null");
          }, _undefined: function() {
            return k("Undefined");
          }, _regexp: function(y) {
            return k("regex:" + y.toString());
          }, _uint8array: function(y) {
            return k("uint8array:"), this.dispatch(Array.prototype.slice.call(y));
          }, _uint8clampedarray: function(y) {
            return k("uint8clampedarray:"), this.dispatch(Array.prototype.slice.call(y));
          }, _int8array: function(y) {
            return k("int8array:"), this.dispatch(Array.prototype.slice.call(y));
          }, _uint16array: function(y) {
            return k("uint16array:"), this.dispatch(Array.prototype.slice.call(y));
          }, _int16array: function(y) {
            return k("int16array:"), this.dispatch(Array.prototype.slice.call(y));
          }, _uint32array: function(y) {
            return k("uint32array:"), this.dispatch(Array.prototype.slice.call(y));
          }, _int32array: function(y) {
            return k("int32array:"), this.dispatch(Array.prototype.slice.call(y));
          }, _float32array: function(y) {
            return k("float32array:"), this.dispatch(Array.prototype.slice.call(y));
          }, _float64array: function(y) {
            return k("float64array:"), this.dispatch(Array.prototype.slice.call(y));
          }, _arraybuffer: function(y) {
            return k("arraybuffer:"), this.dispatch(new Uint8Array(y));
          }, _url: function(y) {
            return k("url:" + y.toString());
          }, _map: function(y) {
            return k("map:"), y = Array.from(y), this._array(y, b.unorderedSets !== !1);
          }, _set: function(y) {
            return k("set:"), y = Array.from(y), this._array(y, b.unorderedSets !== !1);
          }, _file: function(y) {
            return k("file:"), this.dispatch([y.name, y.size, y.type, y.lastModfied]);
          }, _blob: function() {
            if (b.ignoreUnknown)
              return k("[blob]");
            throw Error(`Hashing Blob objects is currently not supported
(see https://github.com/puleos/object-hash/issues/26)
Use "options.replacer" or "options.ignoreUnknown"
`);
          }, _domwindow: function() {
            return k("domwindow");
          }, _bigint: function(y) {
            return k("bigint:" + y.toString());
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
        function L() {
          return { buf: "", write: function(b) {
            this.buf += b;
          }, end: function(b) {
            this.buf += b;
          }, read: function() {
            return this.buf;
          } };
        }
        o.writeToStream = function(b, w, T) {
          return T === void 0 && (T = w, w = {}), O(w = g(b, w), T).dispatch(b);
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_9a5aa49d.js", "/");
    }, { buffer: 3, crypto: 5, lYpoI2: 11 }], 2: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        (function(h) {
          var _ = typeof Uint8Array < "u" ? Uint8Array : Array, m = 43, p = 47, g = 48, S = 97, O = 65, L = 45, b = 95;
          function w(T) {
            return T = T.charCodeAt(0), T === m || T === L ? 62 : T === p || T === b ? 63 : T < g ? -1 : T < g + 10 ? T - g + 26 + 26 : T < O + 26 ? T - O : T < S + 26 ? T - S + 26 : void 0;
          }
          h.toByteArray = function(T) {
            var k, y;
            if (0 < T.length % 4)
              throw new Error("Invalid string. Length must be a multiple of 4");
            var I = T.length, I = T.charAt(I - 2) === "=" ? 2 : T.charAt(I - 1) === "=" ? 1 : 0, A = new _(3 * T.length / 4 - I), U = 0 < I ? T.length - 4 : T.length, x = 0;
            function N(R) {
              A[x++] = R;
            }
            for (k = 0; k < U; k += 4, 0)
              N((16711680 & (y = w(T.charAt(k)) << 18 | w(T.charAt(k + 1)) << 12 | w(T.charAt(k + 2)) << 6 | w(T.charAt(k + 3)))) >> 16), N((65280 & y) >> 8), N(255 & y);
            return I == 2 ? N(255 & (y = w(T.charAt(k)) << 2 | w(T.charAt(k + 1)) >> 4)) : I == 1 && (N((y = w(T.charAt(k)) << 10 | w(T.charAt(k + 1)) << 4 | w(T.charAt(k + 2)) >> 2) >> 8 & 255), N(255 & y)), A;
          }, h.fromByteArray = function(T) {
            var k, y, I, A, U = T.length % 3, x = "";
            function N(R) {
              return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(R);
            }
            for (k = 0, I = T.length - U; k < I; k += 3)
              y = (T[k] << 16) + (T[k + 1] << 8) + T[k + 2], x += N((A = y) >> 18 & 63) + N(A >> 12 & 63) + N(A >> 6 & 63) + N(63 & A);
            switch (U) {
              case 1:
                x = (x += N((y = T[T.length - 1]) >> 2)) + N(y << 4 & 63) + "==";
                break;
              case 2:
                x = (x = (x += N((y = (T[T.length - 2] << 8) + T[T.length - 1]) >> 10)) + N(y >> 4 & 63)) + N(y << 2 & 63) + "=";
            }
            return x;
          };
        })(o === void 0 ? this.base64js = {} : o);
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js", "/node_modules/gulp-browserify/node_modules/base64-js/lib");
    }, { buffer: 3, lYpoI2: 11 }], 3: [function(n, r, o) {
      (function(a, i, m, s, c, u, f, d, v) {
        var h = n("base64-js"), _ = n("ieee754");
        function m(E, D, $) {
          if (!(this instanceof m))
            return new m(E, D, $);
          var z, C, P, V, Z = typeof E;
          if (D === "base64" && Z == "string")
            for (E = (V = E).trim ? V.trim() : V.replace(/^\s+|\s+$/g, ""); E.length % 4 != 0; )
              E += "=";
          if (Z == "number")
            z = M(E);
          else if (Z == "string")
            z = m.byteLength(E, D);
          else {
            if (Z != "object")
              throw new Error("First argument needs to be a number, array or string.");
            z = M(E.length);
          }
          if (m._useTypedArrays ? C = m._augment(new Uint8Array(z)) : ((C = this).length = z, C._isBuffer = !0), m._useTypedArrays && typeof E.byteLength == "number")
            C._set(E);
          else if (G(V = E) || m.isBuffer(V) || V && typeof V == "object" && typeof V.length == "number")
            for (P = 0; P < z; P++)
              m.isBuffer(E) ? C[P] = E.readUInt8(P) : C[P] = E[P];
          else if (Z == "string")
            C.write(E, 0, D);
          else if (Z == "number" && !m._useTypedArrays && !$)
            for (P = 0; P < z; P++)
              C[P] = 0;
          return C;
        }
        function p(E, D, $, z) {
          return m._charsWritten = de(function(C) {
            for (var P = [], V = 0; V < C.length; V++)
              P.push(255 & C.charCodeAt(V));
            return P;
          }(D), E, $, z);
        }
        function g(E, D, $, z) {
          return m._charsWritten = de(function(C) {
            for (var P, V, Z = [], re = 0; re < C.length; re++)
              V = C.charCodeAt(re), P = V >> 8, V = V % 256, Z.push(V), Z.push(P);
            return Z;
          }(D), E, $, z);
        }
        function S(E, D, $) {
          var z = "";
          $ = Math.min(E.length, $);
          for (var C = D; C < $; C++)
            z += String.fromCharCode(E[C]);
          return z;
        }
        function O(E, D, $, P) {
          P || (H(typeof $ == "boolean", "missing or invalid endian"), H(D != null, "missing offset"), H(D + 1 < E.length, "Trying to read beyond buffer length"));
          var C, P = E.length;
          if (!(P <= D))
            return $ ? (C = E[D], D + 1 < P && (C |= E[D + 1] << 8)) : (C = E[D] << 8, D + 1 < P && (C |= E[D + 1])), C;
        }
        function L(E, D, $, P) {
          P || (H(typeof $ == "boolean", "missing or invalid endian"), H(D != null, "missing offset"), H(D + 3 < E.length, "Trying to read beyond buffer length"));
          var C, P = E.length;
          if (!(P <= D))
            return $ ? (D + 2 < P && (C = E[D + 2] << 16), D + 1 < P && (C |= E[D + 1] << 8), C |= E[D], D + 3 < P && (C += E[D + 3] << 24 >>> 0)) : (D + 1 < P && (C = E[D + 1] << 16), D + 2 < P && (C |= E[D + 2] << 8), D + 3 < P && (C |= E[D + 3]), C += E[D] << 24 >>> 0), C;
        }
        function b(E, D, $, z) {
          if (z || (H(typeof $ == "boolean", "missing or invalid endian"), H(D != null, "missing offset"), H(D + 1 < E.length, "Trying to read beyond buffer length")), !(E.length <= D))
            return z = O(E, D, $, !0), 32768 & z ? -1 * (65535 - z + 1) : z;
        }
        function w(E, D, $, z) {
          if (z || (H(typeof $ == "boolean", "missing or invalid endian"), H(D != null, "missing offset"), H(D + 3 < E.length, "Trying to read beyond buffer length")), !(E.length <= D))
            return z = L(E, D, $, !0), 2147483648 & z ? -1 * (4294967295 - z + 1) : z;
        }
        function T(E, D, $, z) {
          return z || (H(typeof $ == "boolean", "missing or invalid endian"), H(D + 3 < E.length, "Trying to read beyond buffer length")), _.read(E, D, $, 23, 4);
        }
        function k(E, D, $, z) {
          return z || (H(typeof $ == "boolean", "missing or invalid endian"), H(D + 7 < E.length, "Trying to read beyond buffer length")), _.read(E, D, $, 52, 8);
        }
        function y(E, D, $, z, C) {
          if (C || (H(D != null, "missing value"), H(typeof z == "boolean", "missing or invalid endian"), H($ != null, "missing offset"), H($ + 1 < E.length, "trying to write beyond buffer length"), Ce(D, 65535)), C = E.length, !(C <= $))
            for (var P = 0, V = Math.min(C - $, 2); P < V; P++)
              E[$ + P] = (D & 255 << 8 * (z ? P : 1 - P)) >>> 8 * (z ? P : 1 - P);
        }
        function I(E, D, $, z, C) {
          if (C || (H(D != null, "missing value"), H(typeof z == "boolean", "missing or invalid endian"), H($ != null, "missing offset"), H($ + 3 < E.length, "trying to write beyond buffer length"), Ce(D, 4294967295)), C = E.length, !(C <= $))
            for (var P = 0, V = Math.min(C - $, 4); P < V; P++)
              E[$ + P] = D >>> 8 * (z ? P : 3 - P) & 255;
        }
        function A(E, D, $, z, C) {
          C || (H(D != null, "missing value"), H(typeof z == "boolean", "missing or invalid endian"), H($ != null, "missing offset"), H($ + 1 < E.length, "Trying to write beyond buffer length"), ee(D, 32767, -32768)), E.length <= $ || y(E, 0 <= D ? D : 65535 + D + 1, $, z, C);
        }
        function U(E, D, $, z, C) {
          C || (H(D != null, "missing value"), H(typeof z == "boolean", "missing or invalid endian"), H($ != null, "missing offset"), H($ + 3 < E.length, "Trying to write beyond buffer length"), ee(D, 2147483647, -2147483648)), E.length <= $ || I(E, 0 <= D ? D : 4294967295 + D + 1, $, z, C);
        }
        function x(E, D, $, z, C) {
          C || (H(D != null, "missing value"), H(typeof z == "boolean", "missing or invalid endian"), H($ != null, "missing offset"), H($ + 3 < E.length, "Trying to write beyond buffer length"), Y(D, 34028234663852886e22, -34028234663852886e22)), E.length <= $ || _.write(E, D, $, z, 23, 4);
        }
        function N(E, D, $, z, C) {
          C || (H(D != null, "missing value"), H(typeof z == "boolean", "missing or invalid endian"), H($ != null, "missing offset"), H($ + 7 < E.length, "Trying to write beyond buffer length"), Y(D, 17976931348623157e292, -17976931348623157e292)), E.length <= $ || _.write(E, D, $, z, 52, 8);
        }
        o.Buffer = m, o.SlowBuffer = m, o.INSPECT_MAX_BYTES = 50, m.poolSize = 8192, m._useTypedArrays = function() {
          try {
            var E = new ArrayBuffer(0), D = new Uint8Array(E);
            return D.foo = function() {
              return 42;
            }, D.foo() === 42 && typeof D.subarray == "function";
          } catch {
            return !1;
          }
        }(), m.isEncoding = function(E) {
          switch (String(E).toLowerCase()) {
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
        }, m.isBuffer = function(E) {
          return !(E == null || !E._isBuffer);
        }, m.byteLength = function(E, D) {
          var $;
          switch (E += "", D || "utf8") {
            case "hex":
              $ = E.length / 2;
              break;
            case "utf8":
            case "utf-8":
              $ = Q(E).length;
              break;
            case "ascii":
            case "binary":
            case "raw":
              $ = E.length;
              break;
            case "base64":
              $ = le(E).length;
              break;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              $ = 2 * E.length;
              break;
            default:
              throw new Error("Unknown encoding");
          }
          return $;
        }, m.concat = function(E, D) {
          if (H(G(E), `Usage: Buffer.concat(list, [totalLength])
list should be an Array.`), E.length === 0)
            return new m(0);
          if (E.length === 1)
            return E[0];
          if (typeof D != "number")
            for (C = D = 0; C < E.length; C++)
              D += E[C].length;
          for (var $ = new m(D), z = 0, C = 0; C < E.length; C++) {
            var P = E[C];
            P.copy($, z), z += P.length;
          }
          return $;
        }, m.prototype.write = function(E, D, $, z) {
          isFinite(D) ? isFinite($) || (z = $, $ = void 0) : (re = z, z = D, D = $, $ = re), D = Number(D) || 0;
          var C, P, V, Z, re = this.length - D;
          switch ((!$ || re < ($ = Number($))) && ($ = re), z = String(z || "utf8").toLowerCase()) {
            case "hex":
              C = function(ve, Ne, Le, Fe) {
                Le = Number(Le) || 0;
                var Be = ve.length - Le;
                (!Fe || Be < (Fe = Number(Fe))) && (Fe = Be), H((Be = Ne.length) % 2 == 0, "Invalid hex string"), Be / 2 < Fe && (Fe = Be / 2);
                for (var cn = 0; cn < Fe; cn++) {
                  var Ao = parseInt(Ne.substr(2 * cn, 2), 16);
                  H(!isNaN(Ao), "Invalid hex string"), ve[Le + cn] = Ao;
                }
                return m._charsWritten = 2 * cn, cn;
              }(this, E, D, $);
              break;
            case "utf8":
            case "utf-8":
              P = this, V = D, Z = $, C = m._charsWritten = de(Q(E), P, V, Z);
              break;
            case "ascii":
            case "binary":
              C = p(this, E, D, $);
              break;
            case "base64":
              P = this, V = D, Z = $, C = m._charsWritten = de(le(E), P, V, Z);
              break;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              C = g(this, E, D, $);
              break;
            default:
              throw new Error("Unknown encoding");
          }
          return C;
        }, m.prototype.toString = function(E, D, $) {
          var z, C, P, V, Z = this;
          if (E = String(E || "utf8").toLowerCase(), D = Number(D) || 0, ($ = $ !== void 0 ? Number($) : Z.length) === D)
            return "";
          switch (E) {
            case "hex":
              z = function(re, ve, Ne) {
                var Le = re.length;
                (!ve || ve < 0) && (ve = 0), (!Ne || Ne < 0 || Le < Ne) && (Ne = Le);
                for (var Fe = "", Be = ve; Be < Ne; Be++)
                  Fe += j(re[Be]);
                return Fe;
              }(Z, D, $);
              break;
            case "utf8":
            case "utf-8":
              z = function(re, ve, Ne) {
                var Le = "", Fe = "";
                Ne = Math.min(re.length, Ne);
                for (var Be = ve; Be < Ne; Be++)
                  re[Be] <= 127 ? (Le += pe(Fe) + String.fromCharCode(re[Be]), Fe = "") : Fe += "%" + re[Be].toString(16);
                return Le + pe(Fe);
              }(Z, D, $);
              break;
            case "ascii":
            case "binary":
              z = S(Z, D, $);
              break;
            case "base64":
              C = Z, V = $, z = (P = D) === 0 && V === C.length ? h.fromByteArray(C) : h.fromByteArray(C.slice(P, V));
              break;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              z = function(re, ve, Ne) {
                for (var Le = re.slice(ve, Ne), Fe = "", Be = 0; Be < Le.length; Be += 2)
                  Fe += String.fromCharCode(Le[Be] + 256 * Le[Be + 1]);
                return Fe;
              }(Z, D, $);
              break;
            default:
              throw new Error("Unknown encoding");
          }
          return z;
        }, m.prototype.toJSON = function() {
          return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
        }, m.prototype.copy = function(E, D, $, z) {
          if (D = D || 0, (z = z || z === 0 ? z : this.length) !== ($ = $ || 0) && E.length !== 0 && this.length !== 0) {
            H($ <= z, "sourceEnd < sourceStart"), H(0 <= D && D < E.length, "targetStart out of bounds"), H(0 <= $ && $ < this.length, "sourceStart out of bounds"), H(0 <= z && z <= this.length, "sourceEnd out of bounds"), z > this.length && (z = this.length);
            var C = (z = E.length - D < z - $ ? E.length - D + $ : z) - $;
            if (C < 100 || !m._useTypedArrays)
              for (var P = 0; P < C; P++)
                E[P + D] = this[P + $];
            else
              E._set(this.subarray($, $ + C), D);
          }
        }, m.prototype.slice = function(E, D) {
          var $ = this.length;
          if (E = F(E, $, 0), D = F(D, $, $), m._useTypedArrays)
            return m._augment(this.subarray(E, D));
          for (var z = D - E, C = new m(z, void 0, !0), P = 0; P < z; P++)
            C[P] = this[P + E];
          return C;
        }, m.prototype.get = function(E) {
          return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(E);
        }, m.prototype.set = function(E, D) {
          return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(E, D);
        }, m.prototype.readUInt8 = function(E, D) {
          if (D || (H(E != null, "missing offset"), H(E < this.length, "Trying to read beyond buffer length")), !(E >= this.length))
            return this[E];
        }, m.prototype.readUInt16LE = function(E, D) {
          return O(this, E, !0, D);
        }, m.prototype.readUInt16BE = function(E, D) {
          return O(this, E, !1, D);
        }, m.prototype.readUInt32LE = function(E, D) {
          return L(this, E, !0, D);
        }, m.prototype.readUInt32BE = function(E, D) {
          return L(this, E, !1, D);
        }, m.prototype.readInt8 = function(E, D) {
          if (D || (H(E != null, "missing offset"), H(E < this.length, "Trying to read beyond buffer length")), !(E >= this.length))
            return 128 & this[E] ? -1 * (255 - this[E] + 1) : this[E];
        }, m.prototype.readInt16LE = function(E, D) {
          return b(this, E, !0, D);
        }, m.prototype.readInt16BE = function(E, D) {
          return b(this, E, !1, D);
        }, m.prototype.readInt32LE = function(E, D) {
          return w(this, E, !0, D);
        }, m.prototype.readInt32BE = function(E, D) {
          return w(this, E, !1, D);
        }, m.prototype.readFloatLE = function(E, D) {
          return T(this, E, !0, D);
        }, m.prototype.readFloatBE = function(E, D) {
          return T(this, E, !1, D);
        }, m.prototype.readDoubleLE = function(E, D) {
          return k(this, E, !0, D);
        }, m.prototype.readDoubleBE = function(E, D) {
          return k(this, E, !1, D);
        }, m.prototype.writeUInt8 = function(E, D, $) {
          $ || (H(E != null, "missing value"), H(D != null, "missing offset"), H(D < this.length, "trying to write beyond buffer length"), Ce(E, 255)), D >= this.length || (this[D] = E);
        }, m.prototype.writeUInt16LE = function(E, D, $) {
          y(this, E, D, !0, $);
        }, m.prototype.writeUInt16BE = function(E, D, $) {
          y(this, E, D, !1, $);
        }, m.prototype.writeUInt32LE = function(E, D, $) {
          I(this, E, D, !0, $);
        }, m.prototype.writeUInt32BE = function(E, D, $) {
          I(this, E, D, !1, $);
        }, m.prototype.writeInt8 = function(E, D, $) {
          $ || (H(E != null, "missing value"), H(D != null, "missing offset"), H(D < this.length, "Trying to write beyond buffer length"), ee(E, 127, -128)), D >= this.length || (0 <= E ? this.writeUInt8(E, D, $) : this.writeUInt8(255 + E + 1, D, $));
        }, m.prototype.writeInt16LE = function(E, D, $) {
          A(this, E, D, !0, $);
        }, m.prototype.writeInt16BE = function(E, D, $) {
          A(this, E, D, !1, $);
        }, m.prototype.writeInt32LE = function(E, D, $) {
          U(this, E, D, !0, $);
        }, m.prototype.writeInt32BE = function(E, D, $) {
          U(this, E, D, !1, $);
        }, m.prototype.writeFloatLE = function(E, D, $) {
          x(this, E, D, !0, $);
        }, m.prototype.writeFloatBE = function(E, D, $) {
          x(this, E, D, !1, $);
        }, m.prototype.writeDoubleLE = function(E, D, $) {
          N(this, E, D, !0, $);
        }, m.prototype.writeDoubleBE = function(E, D, $) {
          N(this, E, D, !1, $);
        }, m.prototype.fill = function(E, D, $) {
          if (D = D || 0, $ = $ || this.length, H(typeof (E = typeof (E = E || 0) == "string" ? E.charCodeAt(0) : E) == "number" && !isNaN(E), "value is not a number"), H(D <= $, "end < start"), $ !== D && this.length !== 0) {
            H(0 <= D && D < this.length, "start out of bounds"), H(0 <= $ && $ <= this.length, "end out of bounds");
            for (var z = D; z < $; z++)
              this[z] = E;
          }
        }, m.prototype.inspect = function() {
          for (var E = [], D = this.length, $ = 0; $ < D; $++)
            if (E[$] = j(this[$]), $ === o.INSPECT_MAX_BYTES) {
              E[$ + 1] = "...";
              break;
            }
          return "<Buffer " + E.join(" ") + ">";
        }, m.prototype.toArrayBuffer = function() {
          if (typeof Uint8Array > "u")
            throw new Error("Buffer.toArrayBuffer not supported in this browser");
          if (m._useTypedArrays)
            return new m(this).buffer;
          for (var E = new Uint8Array(this.length), D = 0, $ = E.length; D < $; D += 1)
            E[D] = this[D];
          return E.buffer;
        };
        var R = m.prototype;
        function F(E, D, $) {
          return typeof E != "number" ? $ : D <= (E = ~~E) ? D : 0 <= E || 0 <= (E += D) ? E : 0;
        }
        function M(E) {
          return (E = ~~Math.ceil(+E)) < 0 ? 0 : E;
        }
        function G(E) {
          return (Array.isArray || function(D) {
            return Object.prototype.toString.call(D) === "[object Array]";
          })(E);
        }
        function j(E) {
          return E < 16 ? "0" + E.toString(16) : E.toString(16);
        }
        function Q(E) {
          for (var D = [], $ = 0; $ < E.length; $++) {
            var z = E.charCodeAt($);
            if (z <= 127)
              D.push(E.charCodeAt($));
            else
              for (var C = $, P = (55296 <= z && z <= 57343 && $++, encodeURIComponent(E.slice(C, $ + 1)).substr(1).split("%")), V = 0; V < P.length; V++)
                D.push(parseInt(P[V], 16));
          }
          return D;
        }
        function le(E) {
          return h.toByteArray(E);
        }
        function de(E, D, $, z) {
          for (var C = 0; C < z && !(C + $ >= D.length || C >= E.length); C++)
            D[C + $] = E[C];
          return C;
        }
        function pe(E) {
          try {
            return decodeURIComponent(E);
          } catch {
            return "�";
          }
        }
        function Ce(E, D) {
          H(typeof E == "number", "cannot write a non-number as a number"), H(0 <= E, "specified a negative value for writing an unsigned value"), H(E <= D, "value is larger than maximum value for type"), H(Math.floor(E) === E, "value has a fractional component");
        }
        function ee(E, D, $) {
          H(typeof E == "number", "cannot write a non-number as a number"), H(E <= D, "value larger than maximum allowed value"), H($ <= E, "value smaller than minimum allowed value"), H(Math.floor(E) === E, "value has a fractional component");
        }
        function Y(E, D, $) {
          H(typeof E == "number", "cannot write a non-number as a number"), H(E <= D, "value larger than maximum allowed value"), H($ <= E, "value smaller than minimum allowed value");
        }
        function H(E, D) {
          if (!E)
            throw new Error(D || "Failed assertion");
        }
        m._augment = function(E) {
          return E._isBuffer = !0, E._get = E.get, E._set = E.set, E.get = R.get, E.set = R.set, E.write = R.write, E.toString = R.toString, E.toLocaleString = R.toString, E.toJSON = R.toJSON, E.copy = R.copy, E.slice = R.slice, E.readUInt8 = R.readUInt8, E.readUInt16LE = R.readUInt16LE, E.readUInt16BE = R.readUInt16BE, E.readUInt32LE = R.readUInt32LE, E.readUInt32BE = R.readUInt32BE, E.readInt8 = R.readInt8, E.readInt16LE = R.readInt16LE, E.readInt16BE = R.readInt16BE, E.readInt32LE = R.readInt32LE, E.readInt32BE = R.readInt32BE, E.readFloatLE = R.readFloatLE, E.readFloatBE = R.readFloatBE, E.readDoubleLE = R.readDoubleLE, E.readDoubleBE = R.readDoubleBE, E.writeUInt8 = R.writeUInt8, E.writeUInt16LE = R.writeUInt16LE, E.writeUInt16BE = R.writeUInt16BE, E.writeUInt32LE = R.writeUInt32LE, E.writeUInt32BE = R.writeUInt32BE, E.writeInt8 = R.writeInt8, E.writeInt16LE = R.writeInt16LE, E.writeInt16BE = R.writeInt16BE, E.writeInt32LE = R.writeInt32LE, E.writeInt32BE = R.writeInt32BE, E.writeFloatLE = R.writeFloatLE, E.writeFloatBE = R.writeFloatBE, E.writeDoubleLE = R.writeDoubleLE, E.writeDoubleBE = R.writeDoubleBE, E.fill = R.fill, E.inspect = R.inspect, E.toArrayBuffer = R.toArrayBuffer, E;
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/buffer/index.js", "/node_modules/gulp-browserify/node_modules/buffer");
    }, { "base64-js": 2, buffer: 3, ieee754: 10, lYpoI2: 11 }], 4: [function(n, r, o) {
      (function(a, i, h, s, c, u, f, d, v) {
        var h = n("buffer").Buffer, _ = 4, m = new h(_);
        m.fill(0), r.exports = { hash: function(p, g, S, O) {
          for (var L = g(function(y, I) {
            y.length % _ != 0 && (A = y.length + (_ - y.length % _), y = h.concat([y, m], A));
            for (var A, U = [], x = I ? y.readInt32BE : y.readInt32LE, N = 0; N < y.length; N += _)
              U.push(x.call(y, N));
            return U;
          }(p = h.isBuffer(p) ? p : new h(p), O), 8 * p.length), g = O, b = new h(S), w = g ? b.writeInt32BE : b.writeInt32LE, T = 0; T < L.length; T++)
            w.call(b, L[T], 4 * T, !0);
          return b;
        } };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { buffer: 3, lYpoI2: 11 }], 5: [function(n, r, o) {
      (function(a, i, h, s, c, u, f, d, v) {
        var h = n("buffer").Buffer, _ = n("./sha"), m = n("./sha256"), p = n("./rng"), g = { sha1: _, sha256: m, md5: n("./md5") }, S = 64, O = new h(S);
        function L(y, I) {
          var A = g[y = y || "sha1"], U = [];
          return A || b("algorithm:", y, "is not yet supported"), { update: function(x) {
            return h.isBuffer(x) || (x = new h(x)), U.push(x), x.length, this;
          }, digest: function(x) {
            var N = h.concat(U), N = I ? function(R, F, M) {
              h.isBuffer(F) || (F = new h(F)), h.isBuffer(M) || (M = new h(M)), F.length > S ? F = R(F) : F.length < S && (F = h.concat([F, O], S));
              for (var G = new h(S), j = new h(S), Q = 0; Q < S; Q++)
                G[Q] = 54 ^ F[Q], j[Q] = 92 ^ F[Q];
              return M = R(h.concat([G, M])), R(h.concat([j, M]));
            }(A, I, N) : A(N);
            return U = null, x ? N.toString(x) : N;
          } };
        }
        function b() {
          var y = [].slice.call(arguments).join(" ");
          throw new Error([y, "we accept pull requests", "http://github.com/dominictarr/crypto-browserify"].join(`
`));
        }
        O.fill(0), o.createHash = function(y) {
          return L(y);
        }, o.createHmac = L, o.randomBytes = function(y, I) {
          if (!I || !I.call)
            return new h(p(y));
          try {
            I.call(this, void 0, new h(p(y)));
          } catch (A) {
            I(A);
          }
        };
        var w, T = ["createCredentials", "createCipher", "createCipheriv", "createDecipher", "createDecipheriv", "createSign", "createVerify", "createDiffieHellman", "pbkdf2"], k = function(y) {
          o[y] = function() {
            b("sorry,", y, "is not implemented yet");
          };
        };
        for (w in T)
          k(T[w]);
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./md5": 6, "./rng": 7, "./sha": 8, "./sha256": 9, buffer: 3, lYpoI2: 11 }], 6: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        var h = n("./helpers");
        function _(b, w) {
          b[w >> 5] |= 128 << w % 32, b[14 + (w + 64 >>> 9 << 4)] = w;
          for (var T = 1732584193, k = -271733879, y = -1732584194, I = 271733878, A = 0; A < b.length; A += 16) {
            var U = T, x = k, N = y, R = I, T = p(T, k, y, I, b[A + 0], 7, -680876936), I = p(I, T, k, y, b[A + 1], 12, -389564586), y = p(y, I, T, k, b[A + 2], 17, 606105819), k = p(k, y, I, T, b[A + 3], 22, -1044525330);
            T = p(T, k, y, I, b[A + 4], 7, -176418897), I = p(I, T, k, y, b[A + 5], 12, 1200080426), y = p(y, I, T, k, b[A + 6], 17, -1473231341), k = p(k, y, I, T, b[A + 7], 22, -45705983), T = p(T, k, y, I, b[A + 8], 7, 1770035416), I = p(I, T, k, y, b[A + 9], 12, -1958414417), y = p(y, I, T, k, b[A + 10], 17, -42063), k = p(k, y, I, T, b[A + 11], 22, -1990404162), T = p(T, k, y, I, b[A + 12], 7, 1804603682), I = p(I, T, k, y, b[A + 13], 12, -40341101), y = p(y, I, T, k, b[A + 14], 17, -1502002290), T = g(T, k = p(k, y, I, T, b[A + 15], 22, 1236535329), y, I, b[A + 1], 5, -165796510), I = g(I, T, k, y, b[A + 6], 9, -1069501632), y = g(y, I, T, k, b[A + 11], 14, 643717713), k = g(k, y, I, T, b[A + 0], 20, -373897302), T = g(T, k, y, I, b[A + 5], 5, -701558691), I = g(I, T, k, y, b[A + 10], 9, 38016083), y = g(y, I, T, k, b[A + 15], 14, -660478335), k = g(k, y, I, T, b[A + 4], 20, -405537848), T = g(T, k, y, I, b[A + 9], 5, 568446438), I = g(I, T, k, y, b[A + 14], 9, -1019803690), y = g(y, I, T, k, b[A + 3], 14, -187363961), k = g(k, y, I, T, b[A + 8], 20, 1163531501), T = g(T, k, y, I, b[A + 13], 5, -1444681467), I = g(I, T, k, y, b[A + 2], 9, -51403784), y = g(y, I, T, k, b[A + 7], 14, 1735328473), T = S(T, k = g(k, y, I, T, b[A + 12], 20, -1926607734), y, I, b[A + 5], 4, -378558), I = S(I, T, k, y, b[A + 8], 11, -2022574463), y = S(y, I, T, k, b[A + 11], 16, 1839030562), k = S(k, y, I, T, b[A + 14], 23, -35309556), T = S(T, k, y, I, b[A + 1], 4, -1530992060), I = S(I, T, k, y, b[A + 4], 11, 1272893353), y = S(y, I, T, k, b[A + 7], 16, -155497632), k = S(k, y, I, T, b[A + 10], 23, -1094730640), T = S(T, k, y, I, b[A + 13], 4, 681279174), I = S(I, T, k, y, b[A + 0], 11, -358537222), y = S(y, I, T, k, b[A + 3], 16, -722521979), k = S(k, y, I, T, b[A + 6], 23, 76029189), T = S(T, k, y, I, b[A + 9], 4, -640364487), I = S(I, T, k, y, b[A + 12], 11, -421815835), y = S(y, I, T, k, b[A + 15], 16, 530742520), T = O(T, k = S(k, y, I, T, b[A + 2], 23, -995338651), y, I, b[A + 0], 6, -198630844), I = O(I, T, k, y, b[A + 7], 10, 1126891415), y = O(y, I, T, k, b[A + 14], 15, -1416354905), k = O(k, y, I, T, b[A + 5], 21, -57434055), T = O(T, k, y, I, b[A + 12], 6, 1700485571), I = O(I, T, k, y, b[A + 3], 10, -1894986606), y = O(y, I, T, k, b[A + 10], 15, -1051523), k = O(k, y, I, T, b[A + 1], 21, -2054922799), T = O(T, k, y, I, b[A + 8], 6, 1873313359), I = O(I, T, k, y, b[A + 15], 10, -30611744), y = O(y, I, T, k, b[A + 6], 15, -1560198380), k = O(k, y, I, T, b[A + 13], 21, 1309151649), T = O(T, k, y, I, b[A + 4], 6, -145523070), I = O(I, T, k, y, b[A + 11], 10, -1120210379), y = O(y, I, T, k, b[A + 2], 15, 718787259), k = O(k, y, I, T, b[A + 9], 21, -343485551), T = L(T, U), k = L(k, x), y = L(y, N), I = L(I, R);
          }
          return Array(T, k, y, I);
        }
        function m(b, w, T, k, y, I) {
          return L((w = L(L(w, b), L(k, I))) << y | w >>> 32 - y, T);
        }
        function p(b, w, T, k, y, I, A) {
          return m(w & T | ~w & k, b, w, y, I, A);
        }
        function g(b, w, T, k, y, I, A) {
          return m(w & k | T & ~k, b, w, y, I, A);
        }
        function S(b, w, T, k, y, I, A) {
          return m(w ^ T ^ k, b, w, y, I, A);
        }
        function O(b, w, T, k, y, I, A) {
          return m(T ^ (w | ~k), b, w, y, I, A);
        }
        function L(b, w) {
          var T = (65535 & b) + (65535 & w);
          return (b >> 16) + (w >> 16) + (T >> 16) << 16 | 65535 & T;
        }
        r.exports = function(b) {
          return h.hash(b, _, 16);
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 7: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        r.exports = function(h) {
          for (var _, m = new Array(h), p = 0; p < h; p++)
            !(3 & p) && (_ = 4294967296 * Math.random()), m[p] = _ >>> ((3 & p) << 3) & 255;
          return m;
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { buffer: 3, lYpoI2: 11 }], 8: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        var h = n("./helpers");
        function _(g, S) {
          g[S >> 5] |= 128 << 24 - S % 32, g[15 + (S + 64 >> 9 << 4)] = S;
          for (var O, L, b, w = Array(80), T = 1732584193, k = -271733879, y = -1732584194, I = 271733878, A = -1009589776, U = 0; U < g.length; U += 16) {
            for (var x = T, N = k, R = y, F = I, M = A, G = 0; G < 80; G++) {
              w[G] = G < 16 ? g[U + G] : p(w[G - 3] ^ w[G - 8] ^ w[G - 14] ^ w[G - 16], 1);
              var j = m(m(p(T, 5), (j = k, L = y, b = I, (O = G) < 20 ? j & L | ~j & b : !(O < 40) && O < 60 ? j & L | j & b | L & b : j ^ L ^ b)), m(m(A, w[G]), (O = G) < 20 ? 1518500249 : O < 40 ? 1859775393 : O < 60 ? -1894007588 : -899497514)), A = I, I = y, y = p(k, 30), k = T, T = j;
            }
            T = m(T, x), k = m(k, N), y = m(y, R), I = m(I, F), A = m(A, M);
          }
          return Array(T, k, y, I, A);
        }
        function m(g, S) {
          var O = (65535 & g) + (65535 & S);
          return (g >> 16) + (S >> 16) + (O >> 16) << 16 | 65535 & O;
        }
        function p(g, S) {
          return g << S | g >>> 32 - S;
        }
        r.exports = function(g) {
          return h.hash(g, _, 20, !0);
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 9: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        function h(S, O) {
          var L = (65535 & S) + (65535 & O);
          return (S >> 16) + (O >> 16) + (L >> 16) << 16 | 65535 & L;
        }
        function _(S, O) {
          var L, b = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298), w = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225), T = new Array(64);
          S[O >> 5] |= 128 << 24 - O % 32, S[15 + (O + 64 >> 9 << 4)] = O;
          for (var k, y, I = 0; I < S.length; I += 16) {
            for (var A = w[0], U = w[1], x = w[2], N = w[3], R = w[4], F = w[5], M = w[6], G = w[7], j = 0; j < 64; j++)
              T[j] = j < 16 ? S[j + I] : h(h(h((y = T[j - 2], p(y, 17) ^ p(y, 19) ^ g(y, 10)), T[j - 7]), (y = T[j - 15], p(y, 7) ^ p(y, 18) ^ g(y, 3))), T[j - 16]), L = h(h(h(h(G, p(y = R, 6) ^ p(y, 11) ^ p(y, 25)), R & F ^ ~R & M), b[j]), T[j]), k = h(p(k = A, 2) ^ p(k, 13) ^ p(k, 22), A & U ^ A & x ^ U & x), G = M, M = F, F = R, R = h(N, L), N = x, x = U, U = A, A = h(L, k);
            w[0] = h(A, w[0]), w[1] = h(U, w[1]), w[2] = h(x, w[2]), w[3] = h(N, w[3]), w[4] = h(R, w[4]), w[5] = h(F, w[5]), w[6] = h(M, w[6]), w[7] = h(G, w[7]);
          }
          return w;
        }
        var m = n("./helpers"), p = function(S, O) {
          return S >>> O | S << 32 - O;
        }, g = function(S, O) {
          return S >>> O;
        };
        r.exports = function(S) {
          return m.hash(S, _, 32, !0);
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 10: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        o.read = function(h, _, m, p, I) {
          var S, O, L = 8 * I - p - 1, b = (1 << L) - 1, w = b >> 1, T = -7, k = m ? I - 1 : 0, y = m ? -1 : 1, I = h[_ + k];
          for (k += y, S = I & (1 << -T) - 1, I >>= -T, T += L; 0 < T; S = 256 * S + h[_ + k], k += y, T -= 8)
            ;
          for (O = S & (1 << -T) - 1, S >>= -T, T += p; 0 < T; O = 256 * O + h[_ + k], k += y, T -= 8)
            ;
          if (S === 0)
            S = 1 - w;
          else {
            if (S === b)
              return O ? NaN : 1 / 0 * (I ? -1 : 1);
            O += Math.pow(2, p), S -= w;
          }
          return (I ? -1 : 1) * O * Math.pow(2, S - p);
        }, o.write = function(h, _, m, p, g, A) {
          var O, L, b = 8 * A - g - 1, w = (1 << b) - 1, T = w >> 1, k = g === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, y = p ? 0 : A - 1, I = p ? 1 : -1, A = _ < 0 || _ === 0 && 1 / _ < 0 ? 1 : 0;
          for (_ = Math.abs(_), isNaN(_) || _ === 1 / 0 ? (L = isNaN(_) ? 1 : 0, O = w) : (O = Math.floor(Math.log(_) / Math.LN2), _ * (p = Math.pow(2, -O)) < 1 && (O--, p *= 2), 2 <= (_ += 1 <= O + T ? k / p : k * Math.pow(2, 1 - T)) * p && (O++, p /= 2), w <= O + T ? (L = 0, O = w) : 1 <= O + T ? (L = (_ * p - 1) * Math.pow(2, g), O += T) : (L = _ * Math.pow(2, T - 1) * Math.pow(2, g), O = 0)); 8 <= g; h[m + y] = 255 & L, y += I, L /= 256, g -= 8)
            ;
          for (O = O << g | L, b += g; 0 < b; h[m + y] = 255 & O, y += I, O /= 256, b -= 8)
            ;
          h[m + y - I] |= 128 * A;
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/ieee754/index.js", "/node_modules/gulp-browserify/node_modules/ieee754");
    }, { buffer: 3, lYpoI2: 11 }], 11: [function(n, r, o) {
      (function(a, i, l, s, c, u, f, d, v) {
        var h, _, m;
        function p() {
        }
        (a = r.exports = {}).nextTick = (_ = typeof window < "u" && window.setImmediate, m = typeof window < "u" && window.postMessage && window.addEventListener, _ ? function(g) {
          return window.setImmediate(g);
        } : m ? (h = [], window.addEventListener("message", function(g) {
          var S = g.source;
          S !== window && S !== null || g.data !== "process-tick" || (g.stopPropagation(), 0 < h.length && h.shift()());
        }, !0), function(g) {
          h.push(g), window.postMessage("process-tick", "*");
        }) : function(g) {
          setTimeout(g, 0);
        }), a.title = "browser", a.browser = !0, a.env = {}, a.argv = [], a.on = p, a.addListener = p, a.once = p, a.off = p, a.removeListener = p, a.removeAllListeners = p, a.emit = p, a.binding = function(g) {
          throw new Error("process.binding is not supported");
        }, a.cwd = function() {
          return "/";
        }, a.chdir = function(g) {
          throw new Error("process.chdir is not supported");
        };
      }).call(this, n("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, n("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/process/browser.js", "/node_modules/gulp-browserify/node_modules/process");
    }, { buffer: 3, lYpoI2: 11 }] }, {}, [1])(1);
  });
})(tf);
var Qg = tf.exports;
const e_ = /* @__PURE__ */ po(Qg), ss = [
  "Processed",
  "SelfRebooked",
  "ForceCancellation"
], Vl = [
  {
    itemCategoryId: 1,
    quantity: 2,
    itemCategoryName: "",
    orderPriority: 1
  }
], lt = Sn(
  "cart",
  () => {
    const e = ne({
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
    }), t = ne([
      ...Vl
    ]), n = ne(Date.now()), r = ne(null), o = ne(null), a = se(
      () => {
        var N;
        return (N = e.value) == null ? void 0 : N.items.map((R) => br.getCartProduct(R));
      }
    ), i = (N) => se(() => {
      const R = t.value.find(
        (F) => F.itemCategoryId === N
      );
      return typeof R < "u" ? R.quantity : 0;
    }), l = se(() => !!(e.value.customerInfo.email && e.value.customerInfo.name && e.value.customerInfo.hasTermsAndConditionsApproved)), s = se(() => e.value ? ss.includes(e.value.status) : !1), c = se(() => e_(e.value) + n.value), u = se(() => {
      var N;
      return ((N = a.value) == null ? void 0 : N.length) || 0;
    }), f = se(() => {
      var N;
      return ((N = e.value) == null ? void 0 : N.vouchers) || [];
    }), d = se(() => f.value.length !== 0), v = se(() => e.value.cartId), h = se(() => {
      var N;
      return (N = e.value) == null ? void 0 : N.vouchers.map((R) => {
        var G;
        const F = R.description;
        let M = R.value;
        return R.type === "Percentage" && (M = ((G = e.value) == null ? void 0 : G.totalPrice) / 100 * R.value), { title: F, amount: M };
      });
    }), _ = se(() => {
      let N = !1;
      for (const R of a.value)
        if (R.isExpired && (N = R.isExpired, R.isExpired))
          break;
      return N;
    }), m = se(() => {
      if (o.value)
        return he(o.value).tz("Europe/Amsterdam");
    }), p = (N) => {
      !N || o.value || (o.value = N, setInterval(() => {
        o.value = he(o.value).add(1, "second").toISOString();
      }, 1e3));
    }, g = (N = Date.now()) => {
      r.value = null, n.value = N;
    }, S = () => {
      g(0);
    }, O = (N, R = 0) => {
      const F = t.value.find(
        (M) => M.itemCategoryId === N
      );
      if (typeof F < "u") {
        if (F.quantity = R, R === 0) {
          const M = Vl.find(
            (G) => G.itemCategoryId === N
          );
          typeof M < "u" && (F.quantity = M.quantity);
        }
      } else
        t.value.push({
          quantity: R,
          itemCategoryId: N,
          itemCategoryName: "",
          orderPriority: 0
        });
    }, L = async () => {
      e.value = await dt.recalculate(v.value);
    }, b = (N) => {
      var F, M;
      let R = (F = e.value) == null ? void 0 : F.items.find(
        (G) => {
          var j;
          return ((j = G.item) == null ? void 0 : j.cartItemId) === +N;
        }
      );
      return typeof R > "u" && (R = (M = e.value) == null ? void 0 : M.items.find(
        (G) => {
          var j;
          return ((j = G.packageGroup) == null ? void 0 : j.cartPackageGroupId) === N;
        }
      )), R;
    }, w = async () => {
      var N;
      if ((N = e.value) != null && N.cartId && s)
        try {
          e.value = await dt.getCart(e.value.cartId);
        } catch {
          e.value = await dt.getNewCart();
        }
      else
        await T();
    }, T = async () => {
      e.value = await dt.getNewCart(), S();
    }, k = async (N) => {
      var R;
      if ((R = e.value) != null && R.cartId)
        try {
          const F = await dt.addCartItem(e.value.cartId, N);
          e.value = F.cart, S(), window.dispatchEvent(new CustomEvent("th:cartItemIsAdded"));
        } catch (F) {
          if (F instanceof Ot)
            if (F.statusCode === 403)
              await T(), await k(N);
            else
              throw F;
        }
    }, y = async (N, R = !1) => {
      var F;
      if ((F = e.value) != null && F.cartId)
        try {
          const M = await dt.deleteCartItem(
            e.value.cartId,
            N,
            R
          );
          e.value = M.cart, S();
        } catch (M) {
          if (M instanceof Ot)
            if (M.statusCode === 403)
              await T(), await y(N, R);
            else
              throw M;
        }
    }, I = async () => {
      var N;
      if ((N = e.value) != null && N.cartId)
        try {
          return await dt.getCartUpsells(e.value.cartId);
        } catch (R) {
          if (R instanceof Ot)
            if (R.statusCode === 403)
              await T();
            else
              throw R;
        }
    }, A = async (N) => {
      var R;
      if ((R = e.value) != null && R.cartId)
        try {
          e.value = (await dt.setVoucher(e.value.cartId, N)).cart, S();
        } catch (F) {
          if (F instanceof Ot)
            if (F.statusCode === 403)
              await T(), await A(N);
            else
              throw F;
        }
    }, U = async (N) => {
      var R;
      if ((R = e.value) != null && R.cartId)
        try {
          e.value = (await dt.deleteVoucher(e.value.cartId, N)).cart, S();
        } catch (F) {
          if (F instanceof Ot)
            if (F.statusCode === 403)
              await T(), await U(N);
            else
              throw F;
        }
    }, x = async (N) => {
      var R, F;
      if ((R = e.value) != null && R.cartId)
        try {
          e.value = await dt.updateCustomerInfo(e.value.cartId, {
            ...(F = e.value) == null ? void 0 : F.customerInfo,
            ...N
          }), S();
        } catch (M) {
          if (M instanceof Ot)
            if (M.statusCode === 403)
              await T(), await x(N);
            else
              throw M;
        }
    };
    return {
      setServerTime: p,
      getServerTime: m,
      cart: e,
      lastPayCartRequestTime: n,
      items: a,
      count: u,
      vouchers: f,
      isVouchersApplied: d,
      discountSummaries: h,
      cartId: v,
      cartHash: c,
      isExpired: _,
      dropinSession: r,
      isTicketsAvailableForDownload: s,
      isCustomerInfoFilled: l,
      recalculate: L,
      updateLastPayCartRequest: g,
      clearLastPayCartRequest: S,
      getCart: w,
      getItemByCartItemId: b,
      addCartItem: k,
      deleteCartItem: y,
      setVoucher: A,
      deleteVoucher: U,
      updateCustomerInfo: x,
      createNewCart: T,
      preselectedVisitors: t,
      getCategoryPreselectQuantity: i,
      updateCategoryPreselectQuantity: O,
      getUpsellItems: I
    };
  },
  {
    persist: !0
  }
), nf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  availableTicketsStatutes: ss,
  useCartStore: lt
}, Symbol.toStringTag, { value: "Module" }));
class Ot extends Error {
  constructor(n = 555, r) {
    super();
    oe(this, "statusCode");
    this.statusCode = n, typeof r == "string" && (this.message = r), r !== null && typeof r == "object" && (this.message = r.error || r.message || r);
  }
}
class ho {
  constructor(t, n = 6e4, r = {}) {
    oe(this, "options");
    oe(this, "baseURL");
    oe(this, "timeout");
    oe(this, "abortController");
    this.baseURL = t, this.timeout = n, this.abortController = new AbortController(), this.options = r;
  }
  async query(t = "/", n = this.options, r = !1) {
    const o = new AbortController(), { signal: a } = o;
    return await Ih(async () => {
      var h, _, m, p;
      const l = setTimeout(() => this.abortController.abort(), this.timeout), s = new URL(t, this.baseURL);
      let c = "";
      const u = Object.assign({}, this.options.params, n.params);
      if (u && Object.entries(u).forEach((g) => {
        g[1] && s.searchParams.set(g[0], g[1]);
      }), !r) {
        if (window) {
          const g = new URLSearchParams(window.location.search);
          g.has("cartId") && (n.headers["x-cart-id"] = g.get("cartId"));
        }
        typeof u.cartId < "u" && (n.headers["x-cart-id"] = u.cartId);
      }
      const f = await fetch(s.href, {
        ...n,
        params: u,
        signal: this.abortController.signal
      });
      clearTimeout(l);
      const { setServerTime: d } = lt(), v = f.headers.get("Date");
      return d(v), (h = f.headers.get("Content-type")) != null && h.includes("application/json") ? c = await f.json() : (_ = f.headers.get("Content-type")) != null && _.includes("application/pdf") ? c = await f.blob() : c = await f.text(), f.ok ? (m = f.headers.get("Content-type")) != null && m.includes("application/pdf") ? {
        blob: c,
        filename: (p = f.headers.get("Content-Disposition")) == null ? void 0 : p.split("filename=")[1].split(";")[0]
      } : c : Promise.reject(
        new Ot(f.status, c)
      );
    }, {
      onFailedAttempt: (l) => {
        [400, 401, 404].includes(l.statusCode) && o.abort(l);
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
var dt;
((e) => {
  let t;
  e.init = (n, r, o = "", a = "") => {
    const i = {
      "Content-Type": "application/json;charset=utf-8"
    };
    o && (i["x-cart-id"] = o), a && (i["x-api-key"] = a), t = new ho(n, void 0, {
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
})(dt || (dt = {}));
var Zr;
((e) => {
  let t;
  e.init = (n, r, o = "", a = "") => {
    const i = {
      "Content-Type": "application/json;charset=utf-8"
    };
    o && (i["x-cart-id"] = o), a && (i["x-api-key"] = a), t = new ho(n, void 0, {
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
})(Zr || (Zr = {}));
var aa;
((e) => {
  let t, n;
  e.init = (r = "/") => {
    n = r.trim().toLowerCase(), n = n.endsWith("/") ? r : r + "/", n += "upsells/", t = new ho(n, 5e3);
  }, e.getUpsells = async (r) => {
    const o = new URLSearchParams();
    return r.forEach((a) => {
      o.append("itemId[]", a.toString());
    }), await t.get(
      `${n}?${o.toString()}`
    );
  }, e.getUpsellByItemId = async (r) => await t.get(n + r);
})(aa || (aa = {}));
const t_ = (e, t, n = "/actions/ticket-hub/currencies", r = "", o = !1, a = "", i) => {
  new URL("api/", window.location.origin);
  const l = e, s = new URL(n, window.location.origin);
  o || oa.init(s.href), typeof i < "u" && aa.init(i), dt.init(l, t, r, a), yr.init(l, t, r, a), Zr.init(l, t, r, a);
}, ka = Sn("cart-dialog", () => {
  const e = ne(!1);
  qe(e, (r) => {
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
}), _e = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
}, n_ = {}, r_ = {
  width: "14",
  height: "14",
  viewBox: "0 0 14 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, o_ = /* @__PURE__ */ W("path", {
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
}, null, -1), a_ = [
  o_
];
function i_(e, t) {
  return B(), X("svg", r_, a_);
}
const s_ = /* @__PURE__ */ _e(n_, [["render", i_]]), l_ = /* @__PURE__ */ me({
  __name: "CloseButton",
  props: {
    tag: { default: "button" },
    to: {}
  },
  setup(e) {
    return (t, n) => (B(), ue(Ki(t.tag), {
      class: "th-close-btn",
      to: t.to,
      bg: "accent",
      type: "button"
    }, {
      default: we(() => [
        q(s_)
      ]),
      _: 1
    }, 8, ["to"]));
  }
}), rf = /* @__PURE__ */ _e(l_, [["__scopeId", "data-v-d7b7cafe"]]);
/**
 * tua-body-scroll-lock v1.5.0
 * (c) 2024 Evinma, BuptStEve
 * @license MIT
 */
var Sa = function() {
  return typeof window > "u";
}, Ai = function(t) {
  t = t || navigator.userAgent;
  var n = /(iPad).*OS\s([\d_]+)/.test(t), r = !n && /(iPhone\sOS)\s([\d_]+)/.test(t), o = /(Android);?[\s/]+([\d.]+)?/.test(t), a = r || n;
  return {
    ios: a,
    android: o
  };
};
function c_(e) {
  if (Sa())
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
function of(e) {
  return e || e === null || process.env.NODE_ENV === "production" ? !1 : (process.env.NODE_ENV !== "test" && console.warn("If scrolling is also required in the floating layer, the target element must be provided."), !0);
}
function ls() {
  return "__BSL_PREVENT_DEFAULT__" in window || (window.__BSL_PREVENT_DEFAULT__ = function(e) {
    e.cancelable && e.preventDefault();
  }), window.__BSL_PREVENT_DEFAULT__;
}
var Go = {
  lockedNum: 0,
  lockedElements: [],
  unLockCallback: null,
  documentListenerAdded: !1,
  initialClientPos: {
    clientX: 0,
    clientY: 0
  }
};
function Ia(e) {
  if (Sa())
    return Go;
  if (!(e != null && e.useGlobalLockState))
    return Ia.lockState;
  var t = "__BSL_LOCK_STATE__" in window ? Object.assign(Object.assign({}, Go), window.__BSL_LOCK_STATE__) : Go;
  return window.__BSL_LOCK_STATE__ = t, t;
}
Ia.lockState = Go;
function u_(e, t, n) {
  if (t) {
    var r = t.scrollTop, o = t.scrollLeft, a = t.scrollWidth, i = t.scrollHeight, l = t.clientWidth, s = t.clientHeight, c = e.targetTouches[0].clientX - n.clientX, u = e.targetTouches[0].clientY - n.clientY, f = Math.abs(u) > Math.abs(c), d = u > 0 && r === 0, v = c > 0 && o === 0, h = c < 0 && o + l + 1 >= a, _ = u < 0 && r + s + 1 >= i;
    if (f && (d || _) || !f && (v || h))
      return ls()(e);
  }
  return e.stopPropagation(), !0;
}
function d_() {
  var e = document.documentElement, t = Object.assign({}, e.style), n = window.innerWidth - e.clientWidth, r = parseInt(window.getComputedStyle(e).paddingRight, 10);
  return e.style.overflow = "hidden", e.style.boxSizing = "border-box", e.style.paddingRight = "".concat(n + r, "px"), function() {
    ["overflow", "boxSizing", "paddingRight"].forEach(function(o) {
      e.style[o] = t[o] || "";
    });
  };
}
function f_(e) {
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
var af = c_({
  passive: !1
});
function sf(e, t) {
  if (!Sa()) {
    of(e);
    var n = Ia(t);
    if (Ai().ios) {
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
            a.targetTouches.length === 1 && u_(a, o, n.initialClientPos);
          }, n.lockedElements.push(o));
        });
      }
      n.documentListenerAdded || (document.addEventListener("touchmove", ls(), af), n.documentListenerAdded = !0);
    } else
      n.lockedNum <= 0 && (n.unLockCallback = Ai().android ? f_(t) : d_());
    n.lockedNum += 1;
  }
}
function lf(e, t) {
  if (!Sa()) {
    of(e);
    var n = Ia(t);
    if (n.lockedNum -= 1, !(n.lockedNum > 0)) {
      if (!Ai().ios && typeof n.unLockCallback == "function") {
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
      n.documentListenerAdded && (document.removeEventListener("touchmove", ls(), af), n.documentListenerAdded = !1);
    }
  }
}
const p_ = /* @__PURE__ */ me({
  __name: "DialogComponent",
  props: {
    isOpen: { type: Boolean, default: !1 },
    toggle: {},
    center: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = ne(null), n = e, r = ({ key: o }) => {
      o === "Escape" && n.isOpen && n.toggle();
    };
    return rt(() => {
      sf(t.value, { useGlobalLockState: !0, overflowType: "clip" }), window.addEventListener("keydown", r);
    }), ga(() => {
      lf(t.value, { useGlobalLockState: !0, overflowType: "clip" }), window.removeEventListener("keydown", r);
    }), (o, a) => (B(), X("div", {
      ref_key: "dialog",
      ref: t,
      class: "th-dialog"
    }, [
      W("div", {
        class: "th-dialog__overlay th-down-lg:hidden",
        onClick: a[0] || (a[0] = //@ts-ignore
        (...i) => o.toggle && o.toggle(...i))
      }),
      W("div", {
        class: Ee([{ "th-dialog__content_center": n.center }, "th-dialog__content"])
      }, [
        q(rf, {
          class: Ee([{ "th-dialog__close-btn_center": n.center }, "th-dialog__close-btn"]),
          type: "button",
          onClick: o.toggle
        }, null, 8, ["class", "onClick"]),
        Jn(o.$slots, "default", {}, void 0, !0)
      ], 2)
    ], 512));
  }
}), cs = /* @__PURE__ */ _e(p_, [["__scopeId", "data-v-2181161d"]]);
/*!
  * vue-router v4.3.2
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */
const zt = typeof document < "u";
function h_(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const Se = Object.assign;
function ni(e, t) {
  const n = {};
  for (const r in t) {
    const o = t[r];
    n[r] = _t(o) ? o.map(e) : e(o);
  }
  return n;
}
const Fr = () => {
}, _t = Array.isArray;
function ye(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const cf = /#/g, m_ = /&/g, v_ = /\//g, g_ = /=/g, __ = /\?/g, uf = /\+/g, y_ = /%5B/g, b_ = /%5D/g, df = /%5E/g, E_ = /%60/g, ff = /%7B/g, w_ = /%7C/g, pf = /%7D/g, T_ = /%20/g;
function us(e) {
  return encodeURI("" + e).replace(w_, "|").replace(y_, "[").replace(b_, "]");
}
function C_(e) {
  return us(e).replace(ff, "{").replace(pf, "}").replace(df, "^");
}
function Ni(e) {
  return us(e).replace(uf, "%2B").replace(T_, "+").replace(cf, "%23").replace(m_, "%26").replace(E_, "`").replace(ff, "{").replace(pf, "}").replace(df, "^");
}
function k_(e) {
  return Ni(e).replace(g_, "%3D");
}
function S_(e) {
  return us(e).replace(cf, "%23").replace(__, "%3F");
}
function I_(e) {
  return e == null ? "" : S_(e).replace(v_, "%2F");
}
function Er(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && ye(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const D_ = /\/$/, O_ = (e) => e.replace(D_, "");
function ri(e, t, n = "/") {
  let r, o = {}, a = "", i = "";
  const l = t.indexOf("#");
  let s = t.indexOf("?");
  return l < s && l >= 0 && (s = -1), s > -1 && (r = t.slice(0, s), a = t.slice(s + 1, l > -1 ? l : t.length), o = e(a)), l > -1 && (r = r || t.slice(0, l), i = t.slice(l, t.length)), r = N_(r ?? t, n), {
    fullPath: r + (a && "?") + a + i,
    path: r,
    query: o,
    hash: Er(i)
  };
}
function P_(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Ul(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function Fl(e, t, n) {
  const r = t.matched.length - 1, o = n.matched.length - 1;
  return r > -1 && r === o && En(t.matched[r], n.matched[o]) && hf(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function En(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function hf(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!A_(e[n], t[n]))
      return !1;
  return !0;
}
function A_(e, t) {
  return _t(e) ? Hl(e, t) : _t(t) ? Hl(t, e) : e === t;
}
function Hl(e, t) {
  return _t(t) ? e.length === t.length && e.every((n, r) => n === t[r]) : e.length === 1 && e[0] === t;
}
function N_(e, t) {
  if (e.startsWith("/"))
    return e;
  if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
    return ye(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
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
var Qr;
(function(e) {
  e.pop = "pop", e.push = "push";
})(Qr || (Qr = {}));
var Hr;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(Hr || (Hr = {}));
function L_(e) {
  if (!e)
    if (zt) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), O_(e);
}
const R_ = /^[^#]+#/;
function $_(e, t) {
  return e.replace(R_, "#") + t;
}
function M_(e, t) {
  const n = document.documentElement.getBoundingClientRect(), r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0)
  };
}
const Da = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function x_(e) {
  let t;
  if ("el" in e) {
    const n = e.el, r = typeof n == "string" && n.startsWith("#");
    if (process.env.NODE_ENV !== "production" && typeof e.el == "string" && (!r || !document.getElementById(e.el.slice(1))))
      try {
        const a = document.querySelector(e.el);
        if (r && a) {
          ye(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`);
          return;
        }
      } catch {
        ye(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
        return;
      }
    const o = typeof n == "string" ? r ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!o) {
      process.env.NODE_ENV !== "production" && ye(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);
      return;
    }
    t = M_(o, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function Yl(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Li = /* @__PURE__ */ new Map();
function B_(e, t) {
  Li.set(e, t);
}
function V_(e) {
  const t = Li.get(e);
  return Li.delete(e), t;
}
let U_ = () => location.protocol + "//" + location.host;
function mf(e, t) {
  const { pathname: n, search: r, hash: o } = t, a = e.indexOf("#");
  if (a > -1) {
    let l = o.includes(e.slice(a)) ? e.slice(a).length : 1, s = o.slice(l);
    return s[0] !== "/" && (s = "/" + s), Ul(s, "");
  }
  return Ul(n, e) + r + o;
}
function F_(e, t, n, r) {
  let o = [], a = [], i = null;
  const l = ({ state: d }) => {
    const v = mf(e, location), h = n.value, _ = t.value;
    let m = 0;
    if (d) {
      if (n.value = v, t.value = d, i && i === h) {
        i = null;
        return;
      }
      m = _ ? d.position - _.position : 0;
    } else
      r(v);
    o.forEach((p) => {
      p(n.value, h, {
        delta: m,
        type: Qr.pop,
        direction: m ? m > 0 ? Hr.forward : Hr.back : Hr.unknown
      });
    });
  };
  function s() {
    i = n.value;
  }
  function c(d) {
    o.push(d);
    const v = () => {
      const h = o.indexOf(d);
      h > -1 && o.splice(h, 1);
    };
    return a.push(v), v;
  }
  function u() {
    const { history: d } = window;
    d.state && d.replaceState(Se({}, d.state, { scroll: Da() }), "");
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
function jl(e, t, n, r = !1, o = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: o ? Da() : null
  };
}
function H_(e) {
  const { history: t, location: n } = window, r = {
    value: mf(e, n)
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
    const f = e.indexOf("#"), d = f > -1 ? (n.host && document.querySelector("base") ? e : e.slice(f)) + s : U_() + e + s;
    try {
      t[u ? "replaceState" : "pushState"](c, "", d), o.value = c;
    } catch (v) {
      process.env.NODE_ENV !== "production" ? ye("Error with push/replace State", v) : console.error(v), n[u ? "replace" : "assign"](d);
    }
  }
  function i(s, c) {
    const u = Se({}, t.state, jl(
      o.value.back,
      // keep back and forward entries but override current position
      s,
      o.value.forward,
      !0
    ), c, { position: o.value.position });
    a(s, u, !0), r.value = s;
  }
  function l(s, c) {
    const u = Se(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      o.value,
      t.state,
      {
        forward: s,
        scroll: Da()
      }
    );
    process.env.NODE_ENV !== "production" && !t.state && ye(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), a(u.current, u, !0);
    const f = Se({}, jl(r.value, s, null), { position: u.position + 1 }, c);
    a(s, f, !1), r.value = s;
  }
  return {
    location: r,
    state: o,
    push: l,
    replace: i
  };
}
function Y_(e) {
  e = L_(e);
  const t = H_(e), n = F_(e, t.state, t.location, t.replace);
  function r(a, i = !0) {
    i || n.pauseListeners(), history.go(a);
  }
  const o = Se({
    // it's overridden right after
    location: "",
    base: e,
    go: r,
    createHref: $_.bind(null, e)
  }, t, n);
  return Object.defineProperty(o, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(o, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), o;
}
function ia(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function vf(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const fn = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
}, Ri = Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var Wl;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(Wl || (Wl = {}));
const j_ = {
  1({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  2({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${q_(t)}" via a navigation guard.`;
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
function wr(e, t) {
  return process.env.NODE_ENV !== "production" ? Se(new Error(j_[e](t)), {
    type: e,
    [Ri]: !0
  }, t) : Se(new Error(), {
    type: e,
    [Ri]: !0
  }, t);
}
function Gt(e, t) {
  return e instanceof Error && Ri in e && (t == null || !!(e.type & t));
}
const W_ = ["params", "query", "hash"];
function q_(e) {
  if (typeof e == "string")
    return e;
  if (e.path != null)
    return e.path;
  const t = {};
  for (const n of W_)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const ql = "[^/]+?", G_ = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, z_ = /[.+*?^${}()[\]/\\]/g;
function X_(e, t) {
  const n = Se({}, G_, t), r = [];
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
        f || (o += "/"), o += d.value.replace(z_, "\\$&"), v += 40;
      else if (d.type === 1) {
        const { value: h, repeatable: _, optional: m, regexp: p } = d;
        a.push({
          name: h,
          repeatable: _,
          optional: m
        });
        const g = p || ql;
        if (g !== ql) {
          v += 10;
          try {
            new RegExp(`(${g})`);
          } catch (O) {
            throw new Error(`Invalid custom RegExp for param "${h}" (${g}): ` + O.message);
          }
        }
        let S = _ ? `((?:${g})(?:/(?:${g}))*)` : `(${g})`;
        f || (S = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        m && c.length < 2 ? `(?:/${S})` : "/" + S), m && (S += "?"), o += S, v += 20, m && (v += -8), _ && (v += -20), g === ".*" && (v += -50);
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
      const v = u[d] || "", h = a[d - 1];
      f[h.name] = v && h.repeatable ? v.split("/") : v;
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
          const { value: h, repeatable: _, optional: m } = v, p = h in c ? c[h] : "";
          if (_t(p) && !_)
            throw new Error(`Provided param "${h}" is an array but it is not repeatable (* or + modifiers)`);
          const g = _t(p) ? p.join("/") : p;
          if (!g)
            if (m)
              d.length < 2 && (u.endsWith("/") ? u = u.slice(0, -1) : f = !0);
            else
              throw new Error(`Missing required param "${h}"`);
          u += g;
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
function K_(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r)
      return r;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0;
}
function J_(e, t) {
  let n = 0;
  const r = e.score, o = t.score;
  for (; n < r.length && n < o.length; ) {
    const a = K_(r[n], o[n]);
    if (a)
      return a;
    n++;
  }
  if (Math.abs(o.length - r.length) === 1) {
    if (Gl(r))
      return 1;
    if (Gl(o))
      return -1;
  }
  return o.length - r.length;
}
function Gl(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Z_ = {
  type: 0,
  value: ""
}, Q_ = /[a-zA-Z0-9_]/;
function ey(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[Z_]];
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
        s === "(" ? n = 2 : Q_.test(s) ? d() : (f(), n = 0, s !== "*" && s !== "?" && s !== "+" && l--);
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
function ty(e, t, n) {
  const r = X_(ey(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const a = /* @__PURE__ */ new Set();
    for (const i of r.keys)
      a.has(i.name) && ye(`Found duplicated params with name "${i.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), a.add(i.name);
  }
  const o = Se(r, {
    record: e,
    parent: t,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o;
}
function ny(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  t = Kl({ strict: !1, end: !0, sensitive: !1 }, t);
  function o(u) {
    return r.get(u);
  }
  function a(u, f, d) {
    const v = !d, h = ry(u);
    process.env.NODE_ENV !== "production" && sy(h, f), h.aliasOf = d && d.record;
    const _ = Kl(t, u), m = [
      h
    ];
    if ("alias" in u) {
      const S = typeof u.alias == "string" ? [u.alias] : u.alias;
      for (const O of S)
        m.push(Se({}, h, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: d ? d.record.components : h.components,
          path: O,
          // we might be the child of an alias
          aliasOf: d ? d.record : h
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let p, g;
    for (const S of m) {
      const { path: O } = S;
      if (f && O[0] !== "/") {
        const L = f.record.path, b = L[L.length - 1] === "/" ? "" : "/";
        S.path = f.record.path + (O && b + O);
      }
      if (process.env.NODE_ENV !== "production" && S.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (p = ty(S, f, _), process.env.NODE_ENV !== "production" && f && O[0] === "/" && ly(p, f), d ? (d.alias.push(p), process.env.NODE_ENV !== "production" && iy(d, p)) : (g = g || p, g !== p && g.alias.push(p), v && u.name && !Xl(p) && i(u.name)), h.children) {
        const L = h.children;
        for (let b = 0; b < L.length; b++)
          a(L[b], p, d && d.children[b]);
      }
      d = d || p, (p.record.components && Object.keys(p.record.components).length || p.record.name || p.record.redirect) && s(p);
    }
    return g ? () => {
      i(g);
    } : Fr;
  }
  function i(u) {
    if (vf(u)) {
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
    for (; f < n.length && J_(u, n[f]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (u.record.path !== n[f].record.path || !gf(u, n[f])); )
      f++;
    n.splice(f, 0, u), u.record.name && !Xl(u) && r.set(u.record.name, u);
  }
  function c(u, f) {
    let d, v = {}, h, _;
    if ("name" in u && u.name) {
      if (d = r.get(u.name), !d)
        throw wr(1, {
          location: u
        });
      if (process.env.NODE_ENV !== "production") {
        const g = Object.keys(u.params || {}).filter((S) => !d.keys.find((O) => O.name === S));
        g.length && ye(`Discarded invalid param(s) "${g.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      _ = d.record.name, v = Se(
        // paramsFromLocation is a new object
        zl(
          f.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          d.keys.filter((g) => !g.optional).concat(d.parent ? d.parent.keys.filter((g) => g.optional) : []).map((g) => g.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        u.params && zl(u.params, d.keys.map((g) => g.name))
      ), h = d.stringify(v);
    } else if (u.path != null)
      h = u.path, process.env.NODE_ENV !== "production" && !h.startsWith("/") && ye(`The Matcher cannot resolve relative paths but received "${h}". Unless you directly called \`matcher.resolve("${h}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), d = n.find((g) => g.re.test(h)), d && (v = d.parse(h), _ = d.record.name);
    else {
      if (d = f.name ? r.get(f.name) : n.find((g) => g.re.test(f.path)), !d)
        throw wr(1, {
          location: u,
          currentLocation: f
        });
      _ = d.record.name, v = Se({}, f.params, u.params), h = d.stringify(v);
    }
    const m = [];
    let p = d;
    for (; p; )
      m.unshift(p.record), p = p.parent;
    return {
      name: _,
      path: h,
      params: v,
      matched: m,
      meta: ay(m)
    };
  }
  return e.forEach((u) => a(u)), { addRoute: a, resolve: c, removeRoute: i, getRoutes: l, getRecordMatcher: o };
}
function zl(e, t) {
  const n = {};
  for (const r of t)
    r in e && (n[r] = e[r]);
  return n;
}
function ry(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: oy(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function oy(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e)
    t.default = n;
  else
    for (const r in e.components)
      t[r] = typeof n == "object" ? n[r] : n;
  return t;
}
function Xl(e) {
  for (; e; ) {
    if (e.record.aliasOf)
      return !0;
    e = e.parent;
  }
  return !1;
}
function ay(e) {
  return e.reduce((t, n) => Se(t, n.meta), {});
}
function Kl(e, t) {
  const n = {};
  for (const r in e)
    n[r] = r in t ? t[r] : e[r];
  return n;
}
function $i(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function iy(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find($i.bind(null, n)))
      return ye(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find($i.bind(null, n)))
      return ye(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function sy(e, t) {
  t && t.record.name && !e.name && !e.path && ye(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function ly(e, t) {
  for (const n of t.keys)
    if (!e.keys.find($i.bind(null, n)))
      return ye(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function gf(e, t) {
  return t.children.some((n) => n === e || gf(e, n));
}
function cy(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const r = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let o = 0; o < r.length; ++o) {
    const a = r[o].replace(uf, " "), i = a.indexOf("="), l = Er(i < 0 ? a : a.slice(0, i)), s = i < 0 ? null : Er(a.slice(i + 1));
    if (l in t) {
      let c = t[l];
      _t(c) || (c = t[l] = [c]), c.push(s);
    } else
      t[l] = s;
  }
  return t;
}
function Jl(e) {
  let t = "";
  for (let n in e) {
    const r = e[n];
    if (n = k_(n), r == null) {
      r !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (_t(r) ? r.map((a) => a && Ni(a)) : [r && Ni(r)]).forEach((a) => {
      a !== void 0 && (t += (t.length ? "&" : "") + n, a != null && (t += "=" + a));
    });
  }
  return t;
}
function uy(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 && (t[n] = _t(r) ? r.map((o) => o == null ? null : "" + o) : r == null ? r : "" + r);
  }
  return t;
}
const dy = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), Zl = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), Oa = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), ds = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), Mi = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function Rr() {
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
function pn(e, t, n, r, o, a = (i) => i()) {
  const i = r && // name is defined if record is because of the function overload
  (r.enterCallbacks[o] = r.enterCallbacks[o] || []);
  return () => new Promise((l, s) => {
    const c = (d) => {
      d === !1 ? s(wr(4, {
        from: n,
        to: t
      })) : d instanceof Error ? s(d) : ia(d) ? s(wr(2, {
        from: t,
        to: d
      })) : (i && // since enterCallbackArray is truthy, both record and name also are
      r.enterCallbacks[o] === i && typeof d == "function" && i.push(d), l());
    }, u = a(() => e.call(r && r.instances[o], t, n, process.env.NODE_ENV !== "production" ? fy(c, t, n) : c));
    let f = Promise.resolve(u);
    if (e.length < 3 && (f = f.then(c)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const d = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof u == "object" && "then" in u)
        f = f.then((v) => c._called ? v : (ye(d), Promise.reject(new Error("Invalid navigation guard"))));
      else if (u !== void 0 && !c._called) {
        ye(d), s(new Error("Invalid navigation guard"));
        return;
      }
    }
    f.catch((d) => s(d));
  });
}
function fy(e, t, n) {
  let r = 0;
  return function() {
    r++ === 1 && ye(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, r === 1 && e.apply(null, arguments);
  };
}
function oi(e, t, n, r, o = (a) => a()) {
  const a = [];
  for (const i of e) {
    process.env.NODE_ENV !== "production" && !i.components && !i.children.length && ye(`Record with path "${i.path}" is either missing a "component(s)" or "children" property.`);
    for (const l in i.components) {
      let s = i.components[l];
      if (process.env.NODE_ENV !== "production") {
        if (!s || typeof s != "object" && typeof s != "function")
          throw ye(`Component "${l}" in record with path "${i.path}" is not a valid component. Received "${String(s)}".`), new Error("Invalid route component");
        if ("then" in s) {
          ye(`Component "${l}" in record with path "${i.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const c = s;
          s = () => c;
        } else
          s.__asyncLoader && // warn only once per component
          !s.__warnedDefineAsync && (s.__warnedDefineAsync = !0, ye(`Component "${l}" in record with path "${i.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !i.instances[l]))
        if (py(s)) {
          const u = (s.__vccOpts || s)[t];
          u && a.push(pn(u, n, r, i, l, o));
        } else {
          let c = s();
          process.env.NODE_ENV !== "production" && !("catch" in c) && (ye(`Component "${l}" in record with path "${i.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), c = Promise.resolve(c)), a.push(() => c.then((u) => {
            if (!u)
              return Promise.reject(new Error(`Couldn't resolve component "${l}" at "${i.path}"`));
            const f = h_(u) ? u.default : u;
            i.components[l] = f;
            const v = (f.__vccOpts || f)[t];
            return v && pn(v, n, r, i, l, o)();
          }));
        }
    }
  }
  return a;
}
function py(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function Ql(e) {
  const t = Tt(Oa), n = Tt(ds);
  let r = !1, o = null;
  const a = se(() => {
    const u = K(e.to);
    return process.env.NODE_ENV !== "production" && (!r || u !== o) && (ia(u) || (r ? ye(`Invalid value for prop "to" in useLink()
- to:`, u, `
- previous to:`, o, `
- props:`, e) : ye(`Invalid value for prop "to" in useLink()
- to:`, u, `
- props:`, e)), o = u, r = !0), t.resolve(u);
  }), i = se(() => {
    const { matched: u } = a.value, { length: f } = u, d = u[f - 1], v = n.matched;
    if (!d || !v.length)
      return -1;
    const h = v.findIndex(En.bind(null, d));
    if (h > -1)
      return h;
    const _ = ec(u[f - 2]);
    return (
      // we are dealing with nested routes
      f > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      ec(d) === _ && // avoid comparing the child with its parent
      v[v.length - 1].path !== _ ? v.findIndex(En.bind(null, u[f - 2])) : h
    );
  }), l = se(() => i.value > -1 && gy(n.params, a.value.params)), s = se(() => i.value > -1 && i.value === n.matched.length - 1 && hf(n.params, a.value.params));
  function c(u = {}) {
    return vy(u) ? t[K(e.replace) ? "replace" : "push"](
      K(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(Fr) : Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && zt) {
    const u = Sr();
    if (u) {
      const f = {
        route: a.value,
        isActive: l.value,
        isExactActive: s.value,
        error: null
      };
      u.__vrl_devtools = u.__vrl_devtools || [], u.__vrl_devtools.push(f), gt(() => {
        f.route = a.value, f.isActive = l.value, f.isExactActive = s.value, f.error = ia(K(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: a,
    href: se(() => a.value.href),
    isActive: l,
    isExactActive: s,
    navigate: c
  };
}
const hy = /* @__PURE__ */ me({
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
  useLink: Ql,
  setup(e, { slots: t }) {
    const n = Qc(Ql(e)), { options: r } = Tt(Oa), o = se(() => ({
      [tc(e.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [tc(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const a = t.default && t.default(n);
      return e.custom ? a : jn("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: o.value
      }, a);
    };
  }
}), my = hy;
function vy(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function gy(e, t) {
  for (const n in t) {
    const r = t[n], o = e[n];
    if (typeof r == "string") {
      if (r !== o)
        return !1;
    } else if (!_t(o) || o.length !== r.length || r.some((a, i) => a !== o[i]))
      return !1;
  }
  return !0;
}
function ec(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const tc = (e, t, n) => e ?? t ?? n, _y = /* @__PURE__ */ me({
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
    process.env.NODE_ENV !== "production" && by();
    const r = Tt(Mi), o = se(() => e.route || r.value), a = Tt(Zl, 0), i = se(() => {
      let c = K(a);
      const { matched: u } = o.value;
      let f;
      for (; (f = u[c]) && !f.components; )
        c++;
      return c;
    }), l = se(() => o.value.matched[i.value]);
    dr(Zl, se(() => i.value + 1)), dr(dy, l), dr(Mi, o);
    const s = ne();
    return qe(() => [s.value, l.value, e.name], ([c, u, f], [d, v, h]) => {
      u && (u.instances[f] = c, v && v !== u && c && c === d && (u.leaveGuards.size || (u.leaveGuards = v.leaveGuards), u.updateGuards.size || (u.updateGuards = v.updateGuards))), c && u && // if there is no instance but to and from are the same this might be
      // the first visit
      (!v || !En(u, v) || !d) && (u.enterCallbacks[f] || []).forEach((_) => _(c));
    }, { flush: "post" }), () => {
      const c = o.value, u = e.name, f = l.value, d = f && f.components[u];
      if (!d)
        return nc(n.default, { Component: d, route: c });
      const v = f.props[u], h = v ? v === !0 ? c.params : typeof v == "function" ? v(c) : v : null, m = jn(d, Se({}, h, t, {
        onVnodeUnmounted: (p) => {
          p.component.isUnmounted && (f.instances[u] = null);
        },
        ref: s
      }));
      if (process.env.NODE_ENV !== "production" && zt && m.ref) {
        const p = {
          depth: i.value,
          name: f.name,
          path: f.path,
          meta: f.meta
        };
        (_t(m.ref) ? m.ref.map((S) => S.i) : [m.ref.i]).forEach((S) => {
          S.__vrv_devtools = p;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        nc(n.default, { Component: m, route: c }) || m
      );
    };
  }
});
function nc(e, t) {
  if (!e)
    return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const yy = _y;
function by() {
  const e = Sr(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
  if (t && (t === "KeepAlive" || t.includes("Transition")) && typeof n == "object" && n.name === "RouterView") {
    const r = t === "KeepAlive" ? "keep-alive" : "transition";
    ye(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${r}>
    <component :is="Component" />
  </${r}>
</router-view>`);
  }
}
function $r(e, t) {
  const n = Se({}, e, {
    // remove variables that can contain vue instances
    matched: e.matched.map((r) => Ay(r, ["instances", "children", "aliasOf"]))
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
function xo(e) {
  return {
    _custom: {
      display: e
    }
  };
}
let Ey = 0;
function wy(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const r = Ey++;
  _a({
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
        value: $r(t.currentRoute.value, "Current Route")
      });
    }), o.on.visitComponentTree(({ treeNode: u, componentInstance: f }) => {
      if (f.__vrv_devtools) {
        const d = f.__vrv_devtools;
        u.tags.push({
          label: (d.name ? `${d.name.toString()}: ` : "") + d.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: _f
        });
      }
      _t(f.__vrl_devtools) && (f.__devtoolsApi = o, f.__vrl_devtools.forEach((d) => {
        let v = d.route.path, h = Ef, _ = "", m = 0;
        d.error ? (v = d.error, h = Iy, m = Dy) : d.isExactActive ? (h = bf, _ = "This is exactly active") : d.isActive && (h = yf, _ = "This link is active"), u.tags.push({
          label: v,
          textColor: m,
          tooltip: _,
          backgroundColor: h
        });
      }));
    }), qe(t.currentRoute, () => {
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
        guard: xo("beforeEach"),
        from: $r(f, "Current Location during this navigation"),
        to: $r(u, "Target location")
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
        guard: xo("afterEach")
      };
      d ? (v.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: d ? d.message : "",
          tooltip: "Navigation Failure",
          value: d
        }
      }, v.status = xo("❌")) : v.status = xo("✅"), v.from = $r(f, "Current Location during this navigation"), v.to = $r(u, "Target location"), o.addTimelineEvent({
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
      f.forEach(Cf), u.filter && (f = f.filter((d) => (
        // save matches state based on the payload
        xi(d, u.filter.toLowerCase())
      ))), f.forEach((d) => Tf(d, t.currentRoute.value)), u.rootNodes = f.map(wf);
    }
    let c;
    o.on.getInspectorTree((u) => {
      c = u, u.app === e && u.inspectorId === l && s();
    }), o.on.getInspectorState((u) => {
      if (u.app === e && u.inspectorId === l) {
        const d = n.getRoutes().find((v) => v.record.__vd_id === u.nodeId);
        d && (u.state = {
          options: Cy(d)
        });
      }
    }), o.sendInspectorTree(l), o.sendInspectorState(l);
  });
}
function Ty(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function Cy(e) {
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
        display: e.keys.map((r) => `${r.name}${Ty(r)}`).join(" "),
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
const _f = 15485081, yf = 2450411, bf = 8702998, ky = 2282478, Ef = 16486972, Sy = 6710886, Iy = 16704226, Dy = 12131356;
function wf(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: ky
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: Ef
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: _f
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: bf
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: yf
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: Sy
  });
  let r = n.__vd_id;
  return r == null && (r = String(Oy++), n.__vd_id = r), {
    id: r,
    label: n.path,
    tags: t,
    children: e.children.map(wf)
  };
}
let Oy = 0;
const Py = /^\/(.*)\/([a-z]*)$/;
function Tf(e, t) {
  const n = t.matched.length && En(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((r) => En(r, e.record))), e.children.forEach((r) => Tf(r, t));
}
function Cf(e) {
  e.__vd_match = !1, e.children.forEach(Cf);
}
function xi(e, t) {
  const n = String(e.re).match(Py);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((i) => xi(i, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const o = e.record.path.toLowerCase(), a = Er(o);
  return !t.startsWith("/") && (a.includes(t) || o.includes(t)) || a.startsWith(t) || o.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((i) => xi(i, t));
}
function Ay(e, t) {
  const n = {};
  for (const r in e)
    t.includes(r) || (n[r] = e[r]);
  return n;
}
function Ny(e) {
  const t = ny(e.routes, e), n = e.parseQuery || cy, r = e.stringifyQuery || Jl, o = e.history;
  if (process.env.NODE_ENV !== "production" && !o)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const a = Rr(), i = Rr(), l = Rr(), s = Xi(fn);
  let c = fn;
  zt && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const u = ni.bind(null, (Y) => "" + Y), f = ni.bind(null, I_), d = (
    // @ts-expect-error: intentionally avoid the type check
    ni.bind(null, Er)
  );
  function v(Y, H) {
    let E, D;
    return vf(Y) ? (E = t.getRecordMatcher(Y), process.env.NODE_ENV !== "production" && !E && ye(`Parent route "${String(Y)}" not found when adding child route`, H), D = H) : D = Y, t.addRoute(D, E);
  }
  function h(Y) {
    const H = t.getRecordMatcher(Y);
    H ? t.removeRoute(H) : process.env.NODE_ENV !== "production" && ye(`Cannot remove non-existent route "${String(Y)}"`);
  }
  function _() {
    return t.getRoutes().map((Y) => Y.record);
  }
  function m(Y) {
    return !!t.getRecordMatcher(Y);
  }
  function p(Y, H) {
    if (H = Se({}, H || s.value), typeof Y == "string") {
      const P = ri(n, Y, H.path), V = t.resolve({ path: P.path }, H), Z = o.createHref(P.fullPath);
      return process.env.NODE_ENV !== "production" && (Z.startsWith("//") ? ye(`Location "${Y}" resolved to "${Z}". A resolved location cannot start with multiple slashes.`) : V.matched.length || ye(`No match found for location with path "${Y}"`)), Se(P, V, {
        params: d(V.params),
        hash: Er(P.hash),
        redirectedFrom: void 0,
        href: Z
      });
    }
    process.env.NODE_ENV !== "production" && !ia(Y) && (ye(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, Y), Y = {});
    let E;
    if (Y.path != null)
      process.env.NODE_ENV !== "production" && "params" in Y && !("name" in Y) && // @ts-expect-error: the type is never
      Object.keys(Y.params).length && ye(`Path "${Y.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), E = Se({}, Y, {
        path: ri(n, Y.path, H.path).path
      });
    else {
      const P = Se({}, Y.params);
      for (const V in P)
        P[V] == null && delete P[V];
      E = Se({}, Y, {
        params: f(P)
      }), H.params = f(H.params);
    }
    const D = t.resolve(E, H), $ = Y.hash || "";
    process.env.NODE_ENV !== "production" && $ && !$.startsWith("#") && ye(`A \`hash\` should always start with the character "#". Replace "${$}" with "#${$}".`), D.params = u(d(D.params));
    const z = P_(r, Se({}, Y, {
      hash: C_($),
      path: D.path
    })), C = o.createHref(z);
    return process.env.NODE_ENV !== "production" && (C.startsWith("//") ? ye(`Location "${Y}" resolved to "${C}". A resolved location cannot start with multiple slashes.`) : D.matched.length || ye(`No match found for location with path "${Y.path != null ? Y.path : Y}"`)), Se({
      fullPath: z,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: $,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        r === Jl ? uy(Y.query) : Y.query || {}
      )
    }, D, {
      redirectedFrom: void 0,
      href: C
    });
  }
  function g(Y) {
    return typeof Y == "string" ? ri(n, Y, s.value.path) : Se({}, Y);
  }
  function S(Y, H) {
    if (c !== Y)
      return wr(8, {
        from: H,
        to: Y
      });
  }
  function O(Y) {
    return w(Y);
  }
  function L(Y) {
    return O(Se(g(Y), { replace: !0 }));
  }
  function b(Y) {
    const H = Y.matched[Y.matched.length - 1];
    if (H && H.redirect) {
      const { redirect: E } = H;
      let D = typeof E == "function" ? E(Y) : E;
      if (typeof D == "string" && (D = D.includes("?") || D.includes("#") ? D = g(D) : (
        // force empty params
        { path: D }
      ), D.params = {}), process.env.NODE_ENV !== "production" && D.path == null && !("name" in D))
        throw ye(`Invalid redirect found:
${JSON.stringify(D, null, 2)}
 when navigating to "${Y.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return Se({
        query: Y.query,
        hash: Y.hash,
        // avoid transferring params if the redirect has a path
        params: D.path != null ? {} : Y.params
      }, D);
    }
  }
  function w(Y, H) {
    const E = c = p(Y), D = s.value, $ = Y.state, z = Y.force, C = Y.replace === !0, P = b(E);
    if (P)
      return w(
        Se(g(P), {
          state: typeof P == "object" ? Se({}, $, P.state) : $,
          force: z,
          replace: C
        }),
        // keep original redirectedFrom if it exists
        H || E
      );
    const V = E;
    V.redirectedFrom = H;
    let Z;
    return !z && Fl(r, D, E) && (Z = wr(16, { to: V, from: D }), Q(
      D,
      D,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (Z ? Promise.resolve(Z) : y(V, D)).catch((re) => Gt(re) ? (
      // navigation redirects still mark the router as ready
      Gt(
        re,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? re : j(re)
    ) : (
      // reject any unknown error
      M(re, V, D)
    )).then((re) => {
      if (re) {
        if (Gt(
          re,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return process.env.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          Fl(r, p(re.to), V) && // and we have done it a couple of times
          H && // @ts-expect-error: added only in dev
          (H._count = H._count ? (
            // @ts-expect-error
            H._count + 1
          ) : 1) > 30 ? (ye(`Detected a possibly infinite redirection in a navigation guard when going from "${D.fullPath}" to "${V.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : w(
            // keep options
            Se({
              // preserve an existing replacement but allow the redirect to override it
              replace: C
            }, g(re.to), {
              state: typeof re.to == "object" ? Se({}, $, re.to.state) : $,
              force: z
            }),
            // preserve the original redirectedFrom if any
            H || V
          );
      } else
        re = A(V, D, !0, C, $);
      return I(V, D, re), re;
    });
  }
  function T(Y, H) {
    const E = S(Y, H);
    return E ? Promise.reject(E) : Promise.resolve();
  }
  function k(Y) {
    const H = pe.values().next().value;
    return H && typeof H.runWithContext == "function" ? H.runWithContext(Y) : Y();
  }
  function y(Y, H) {
    let E;
    const [D, $, z] = Ly(Y, H);
    E = oi(D.reverse(), "beforeRouteLeave", Y, H);
    for (const P of D)
      P.leaveGuards.forEach((V) => {
        E.push(pn(V, Y, H));
      });
    const C = T.bind(null, Y, H);
    return E.push(C), ee(E).then(() => {
      E = [];
      for (const P of a.list())
        E.push(pn(P, Y, H));
      return E.push(C), ee(E);
    }).then(() => {
      E = oi($, "beforeRouteUpdate", Y, H);
      for (const P of $)
        P.updateGuards.forEach((V) => {
          E.push(pn(V, Y, H));
        });
      return E.push(C), ee(E);
    }).then(() => {
      E = [];
      for (const P of z)
        if (P.beforeEnter)
          if (_t(P.beforeEnter))
            for (const V of P.beforeEnter)
              E.push(pn(V, Y, H));
          else
            E.push(pn(P.beforeEnter, Y, H));
      return E.push(C), ee(E);
    }).then(() => (Y.matched.forEach((P) => P.enterCallbacks = {}), E = oi(z, "beforeRouteEnter", Y, H, k), E.push(C), ee(E))).then(() => {
      E = [];
      for (const P of i.list())
        E.push(pn(P, Y, H));
      return E.push(C), ee(E);
    }).catch((P) => Gt(
      P,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? P : Promise.reject(P));
  }
  function I(Y, H, E) {
    l.list().forEach((D) => k(() => D(Y, H, E)));
  }
  function A(Y, H, E, D, $) {
    const z = S(Y, H);
    if (z)
      return z;
    const C = H === fn, P = zt ? history.state : {};
    E && (D || C ? o.replace(Y.fullPath, Se({
      scroll: C && P && P.scroll
    }, $)) : o.push(Y.fullPath, $)), s.value = Y, Q(Y, H, E, C), j();
  }
  let U;
  function x() {
    U || (U = o.listen((Y, H, E) => {
      if (!Ce.listening)
        return;
      const D = p(Y), $ = b(D);
      if ($) {
        w(Se($, { replace: !0 }), D).catch(Fr);
        return;
      }
      c = D;
      const z = s.value;
      zt && B_(Yl(z.fullPath, E.delta), Da()), y(D, z).catch((C) => Gt(
        C,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? C : Gt(
        C,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (w(
        C.to,
        D
        // avoid an uncaught rejection, let push call triggerError
      ).then((P) => {
        Gt(
          P,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !E.delta && E.type === Qr.pop && o.go(-1, !1);
      }).catch(Fr), Promise.reject()) : (E.delta && o.go(-E.delta, !1), M(C, D, z))).then((C) => {
        C = C || A(
          // after navigation, all matched components are resolved
          D,
          z,
          !1
        ), C && (E.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !Gt(
          C,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? o.go(-E.delta, !1) : E.type === Qr.pop && Gt(
          C,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && o.go(-1, !1)), I(D, z, C);
      }).catch(Fr);
    }));
  }
  let N = Rr(), R = Rr(), F;
  function M(Y, H, E) {
    j(Y);
    const D = R.list();
    return D.length ? D.forEach(($) => $(Y, H, E)) : (process.env.NODE_ENV !== "production" && ye("uncaught error during route navigation:"), console.error(Y)), Promise.reject(Y);
  }
  function G() {
    return F && s.value !== fn ? Promise.resolve() : new Promise((Y, H) => {
      N.add([Y, H]);
    });
  }
  function j(Y) {
    return F || (F = !Y, x(), N.list().forEach(([H, E]) => Y ? E(Y) : H()), N.reset()), Y;
  }
  function Q(Y, H, E, D) {
    const { scrollBehavior: $ } = e;
    if (!zt || !$)
      return Promise.resolve();
    const z = !E && V_(Yl(Y.fullPath, 0)) || (D || !E) && history.state && history.state.scroll || null;
    return mr().then(() => $(Y, H, z)).then((C) => C && x_(C)).catch((C) => M(C, Y, H));
  }
  const le = (Y) => o.go(Y);
  let de;
  const pe = /* @__PURE__ */ new Set(), Ce = {
    currentRoute: s,
    listening: !0,
    addRoute: v,
    removeRoute: h,
    hasRoute: m,
    getRoutes: _,
    resolve: p,
    options: e,
    push: O,
    replace: L,
    go: le,
    back: () => le(-1),
    forward: () => le(1),
    beforeEach: a.add,
    beforeResolve: i.add,
    afterEach: l.add,
    onError: R.add,
    isReady: G,
    install(Y) {
      const H = this;
      Y.component("RouterLink", my), Y.component("RouterView", yy), Y.config.globalProperties.$router = H, Object.defineProperty(Y.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => K(s)
      }), zt && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !de && s.value === fn && (de = !0, O(o.location).catch(($) => {
        process.env.NODE_ENV !== "production" && ye("Unexpected error when starting the router:", $);
      }));
      const E = {};
      for (const $ in fn)
        Object.defineProperty(E, $, {
          get: () => s.value[$],
          enumerable: !0
        });
      Y.provide(Oa, H), Y.provide(ds, uh(E)), Y.provide(Mi, s);
      const D = Y.unmount;
      pe.add(Y), Y.unmount = function() {
        pe.delete(Y), pe.size < 1 && (c = fn, U && U(), U = null, s.value = fn, de = !1, F = !1), D();
      }, process.env.NODE_ENV !== "production" && zt && wy(Y, H, t);
    }
  };
  function ee(Y) {
    return Y.reduce((H, E) => H.then(() => k(E)), Promise.resolve());
  }
  return Ce;
}
function Ly(e, t) {
  const n = [], r = [], o = [], a = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < a; i++) {
    const l = t.matched[i];
    l && (e.matched.find((c) => En(c, l)) ? r.push(l) : n.push(l));
    const s = e.matched[i];
    s && (t.matched.find((c) => En(c, s)) || o.push(s));
  }
  return [n, r, o];
}
function mo() {
  return Tt(Oa);
}
function kf() {
  return Tt(ds);
}
const Ry = (e) => (uo("data-v-610aa2b4"), e = e(), fo(), e), $y = /* @__PURE__ */ Ry(() => /* @__PURE__ */ W("svg", {
  viewBox: "21.904761904761905 21.904761904761905 43.80952380952381 43.80952380952381",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ W("circle", {
    cx: "43.80952380952381",
    cy: "43.80952380952381",
    fill: "transparent",
    r: "20",
    "stroke-dasharray": "125.664",
    "stroke-dashoffset": "125.66370614359172px",
    "stroke-width": "3.8095238095238093"
  })
], -1)), My = [
  $y
], xy = /* @__PURE__ */ me({
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
    const t = mo(), n = e, r = se(() => typeof n.to < "u" && typeof n.to != "string" ? t.resolve(n.to).href : n.to), o = se(() => n.bg ? `th-btn_bg-${n.bg}` : n.plain ? "" : "th-btn_bg-primary"), a = se(() => n.bgHover ? `th-btn_bg-hover-${n.bgHover}` : n.plain ? "" : "th-btn_bg-hover-accent2"), i = se(() => n.color ? `th-btn_color-${n.color}` : n.plain ? "th-btn_color-primary" : "th-btn_color-bg"), l = se(() => n.colorHover ? `th-btn_color-hover-${n.colorHover}` : n.plain ? "th-btn_color-hover-accent2" : "th-btn_color-hover-bg");
    return (s, c) => (B(), ue(Ki(s.tag), {
      class: Ee([
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
        W("span", {
          class: Ee(["th-btn__slot", { "th-btn__slot_active": !s.loading }])
        }, [
          Jn(s.$slots, "default", {}, void 0, !0)
        ], 2),
        W("span", {
          class: Ee(["th-btn__loader", { "th-btn__loader_active": s.loading }])
        }, My, 2)
      ]),
      _: 3
    }, 8, ["class", "disabled", "href", "to"]));
  }
}), tt = /* @__PURE__ */ _e(xy, [["__scopeId", "data-v-610aa2b4"]]), By = {}, Vy = { class: "th-divider" };
function Uy(e, t) {
  return B(), X("hr", Vy);
}
const rc = /* @__PURE__ */ _e(By, [["render", Uy], ["__scopeId", "data-v-31ecedc2"]]), fs = () => {
  const e = bn();
  return (t) => {
    var a, i;
    const n = ((a = e.current) == null ? void 0 : a.rate) ?? 1;
    let r = Number.parseFloat((t * +n).toFixed(2));
    const o = ((i = e.current) == null ? void 0 : i.symbol) ?? "€";
    return Number.isInteger(r) || (r = r.toFixed(2)), `${o}${r}`;
  };
}, st = /* @__PURE__ */ me({
  __name: "PriceComponent",
  props: {
    amount: {}
  },
  setup(e) {
    const t = fs(), n = e;
    return (r, o) => ie(K(t)(+n.amount));
  }
}), vo = Sn("toasts", {
  state: () => ({
    toasts: []
  }),
  getters: {
    getToasts: (e) => e.toasts.reverse()
  },
  actions: {
    showErrorToast(e = "") {
      this.showToast(e, "error");
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
}), zn = Sn("product-modal", () => {
  const e = ne(!1), t = ne(!0), n = ne(!1), r = ne(null);
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
  return qe(e, (c) => {
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
}), Fy = ["data-cart-item-id"], Hy = { class: "th-cart-item__info" }, Yy = ["href"], jy = ["src", "srcset"], Wy = { class: "th-cart-item__additional-info" }, qy = { class: "th-cart-item__modifications" }, Gy = {
  key: 0,
  class: "th-cart-item__product-start"
}, zy = { class: "th-cart-item__product-start-date" }, Xy = { class: "th-cart-item__product-start-time" }, Ky = {
  key: 0,
  class: "th-cart-item__message"
}, Jy = { class: "th-cart-item__message__text" }, Zy = {
  key: 0,
  class: "th-cart-item__modification th-cart-item__modification_visitors"
}, Qy = {
  key: 1,
  class: "th-cart-item__modification th-cart-item__modification_visitors"
}, eb = { class: "th-cart-item__modification_visitor__title" }, tb = { class: "th-cart-item__modification_visitor__price" }, nb = {
  key: 0,
  class: "th-cart-item__modification_visitor__price_default"
}, rb = ["innerHTML"], ob = { class: "th-cart-item__meta" }, ab = { class: "th-cart-item__actions" }, ib = { class: "th-cart-item__price" }, sb = { class: "th-cart-item__price_sale" }, lb = /* @__PURE__ */ me({
  __name: "CartItem",
  props: {
    product: {},
    small: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = mo(), { t: n, locale: r } = Pe(), { showToast: o, showErrorToast: a } = vo(), { setQuickBuyProduct: i } = zn(), l = e, s = lt(), c = ne(!1), u = se(() => {
      var h;
      return (h = window.ticketHub) == null ? void 0 : h.detailedCartItemCategory;
    }), f = async (h) => {
      if (!l.product.isUpsell)
        return;
      h.preventDefault();
      const _ = t.currentRoute;
      _.value.query.cartItemId = l.product.id, window.history.pushState(null, "", t.resolve(_.value).href), await t.push(_.value);
      const m = await aa.getUpsellByItemId(l.product.itemId);
      i({ ...m, upsell: !0 });
    }, d = se(() => {
      var h;
      return (h = window.ticketHub) == null ? void 0 : h.editCartItemEnabled;
    }), v = async () => {
      try {
        c.value = !0, await s.deleteCartItem(l.product.id, l.product.isCombo), o(n("toast.productHasBeenRemoved"));
      } catch (h) {
        h instanceof Ot && a();
      } finally {
        c.value = !1;
      }
    };
    return (h, _) => (B(), X("div", {
      "data-cart-item-id": l.product.id,
      class: "th-cart-item"
    }, [
      W("div", Hy, [
        l.product.preview ? (B(), X("a", {
          key: 0,
          href: l.product.getItemLink(K(r))
        }, [
          W("span", {
            class: Ee([{ "th-cart-item__image_small": h.small }, "th-cart-item__image"])
          }, [
            W("img", {
              src: l.product.preview,
              srcset: l.product.getImageSrcset(),
              alt: "",
              height: "104",
              loading: "lazy",
              width: "104"
            }, null, 8, jy)
          ], 2)
        ], 8, Yy)) : ae("", !0),
        W("div", {
          class: Ee([{ "th-cart-item__data_small": h.small }, "th-cart-item__data"])
        }, [
          W("div", {
            class: Ee([{ "th-cart-item__title_small": h.small }, "th-cart-item__title"])
          }, ie(l.product.title), 3),
          W("div", Wy, [
            W("div", qy, [
              (B(!0), X(Ie, null, ot(l.product.items, (m) => (B(), X("div", {
                key: m.itemName,
                class: "th-cart-item__product"
              }, [
                W("div", {
                  class: Ee([{ "th-cart-item__product-title_small": h.small }, "th-cart-item__product-title"])
                }, ie(m.itemName), 3),
                m.timeslot ? (B(), X("div", Gy, [
                  W("div", zy, ie(m.timeslot.humanizedDate), 1),
                  W("div", Xy, ie(m.timeslot.humanizedTime), 1),
                  m.timeslot.isExpired ? (B(), X("div", Ky, [
                    W("span", Jy, ie(K(n)("cart.timeslotIsExpired")), 1)
                  ])) : ae("", !0)
                ])) : ae("", !0)
              ]))), 128)),
              u.value ? (B(), X("div", Qy, [
                (B(!0), X(Ie, null, ot(l.product.selectedCategories, (m) => (B(), X("div", {
                  key: m.itemCategoryId,
                  class: "th-cart-item__modification_visitor"
                }, [
                  m.quantity > 0 ? (B(), X(Ie, { key: 0 }, [
                    W("div", eb, ie(m.computedText), 1),
                    W("div", tb, [
                      m.totalPrice !== m.totalDiscountedPrice ? (B(), X("span", nb, [
                        q(st, {
                          amount: m.totalPrice
                        }, null, 8, ["amount"])
                      ])) : ae("", !0),
                      W("span", null, [
                        q(st, {
                          amount: m.totalDiscountedPrice
                        }, null, 8, ["amount"])
                      ])
                    ])
                  ], 64)) : ae("", !0)
                ]))), 128))
              ])) : (B(), X("div", Zy, ie(l.product.selectedVisitorsText), 1)),
              W("div", {
                innerHTML: l.product.extraMealsText
              }, null, 8, rb)
            ])
          ])
        ], 2)
      ]),
      W("div", ob, [
        W("div", ab, [
          l.product.url && d.value ? (B(), ue(tt, {
            key: 0,
            to: l.product.getItemEditLink(K(r)),
            plain: "",
            tag: "a",
            type: "button",
            onClick: f
          }, {
            default: we(() => [
              Je(ie(K(n)("cart.edit")), 1)
            ]),
            _: 1
          }, 8, ["to"])) : ae("", !0),
          q(tt, {
            loading: c.value,
            plain: "",
            type: "button",
            onClick: v
          }, {
            default: we(() => [
              Je(ie(K(n)("cart.remove")), 1)
            ]),
            _: 1
          }, 8, ["loading"])
        ]),
        W("div", ib, [
          W("span", sb, [
            q(st, {
              amount: l.product.totalPrice
            }, null, 8, ["amount"])
          ])
        ])
      ])
    ], 8, Fy));
  }
}), cb = /* @__PURE__ */ _e(lb, [["__scopeId", "data-v-f972d25b"]]), ub = {}, db = {
  fill: "none",
  height: "32",
  viewBox: "0 0 32 32",
  width: "32",
  xmlns: "http://www.w3.org/2000/svg"
}, fb = /* @__PURE__ */ W("path", {
  "clip-rule": "evenodd",
  d: "M25.2498 9.40004C25.5812 9.64857 25.6483 10.1187 25.3998 10.45L15.3229 23.8859C15.1925 24.0598 14.9929 24.1686 14.776 24.184C14.5591 24.1994 14.3461 24.1199 14.1924 23.966L7.4695 17.2388C7.1767 16.9458 7.17685 16.4709 7.46984 16.1781C7.76283 15.8853 8.2377 15.8855 8.5305 16.1785L14.642 22.2938L24.1998 9.55004C24.4483 9.21867 24.9184 9.15152 25.2498 9.40004Z",
  fill: "currentColor",
  "fill-rule": "evenodd"
}, null, -1), pb = [
  fb
];
function hb(e, t) {
  return B(), X("svg", db, pb);
}
const mb = /* @__PURE__ */ _e(ub, [["render", hb]]), vb = { class: "th-checkbox" }, gb = ["checked", "disabled"], _b = {
  class: "th-checkbox__helper",
  tabindex: ""
}, yb = ["innerHTML"], bb = /* @__PURE__ */ me({
  __name: "CheckboxComponent",
  props: {
    modelValue: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    text: {},
    size: { default: 9 }
  },
  setup(e) {
    return (t, n) => (B(), X("label", vb, [
      W("input", {
        checked: t.modelValue,
        disabled: t.readonly,
        class: "th-checkbox__input",
        type: "checkbox",
        onChange: n[0] || (n[0] = (r) => {
          var o;
          return t.$emit("update:modelValue", (o = r.target) == null ? void 0 : o.checked);
        })
      }, null, 40, gb),
      W("span", _b, [
        q(mb, {
          style: dh({ width: `${t.size}px` }),
          class: "th-checkbox__icon"
        }, null, 8, ["style"])
      ]),
      t.text ? (B(), X("span", {
        key: 0,
        class: "th-checkbox__text",
        innerHTML: t.text
      }, null, 8, yb)) : ae("", !0)
    ]));
  }
}), Eb = /* @__PURE__ */ _e(bb, [["__scopeId", "data-v-9ff4adfc"]]), wb = { class: "th-cart-coupon" }, Tb = ["readonly"], Cb = /* @__PURE__ */ me({
  __name: "CartCouponInput",
  props: {
    voucher: { default: null }
  },
  emits: ["code-applied"],
  setup(e, { emit: t }) {
    const { t: n } = Pe(), { showToast: r, showErrorToast: o } = vo(), a = e, i = lt(), l = ne(!1), s = ne(""), c = t, u = async () => {
      try {
        l.value = !0, await i.setVoucher(s.value), c("code-applied"), s.value = "", r(n("toast.voucherHasBeenApplied", { voucher: s.value }));
      } catch (d) {
        d instanceof Ot && (d.statusCode === 404 ? o(n("toast.voucherNotFound", { voucher: s.value })) : o());
      } finally {
        l.value = !1;
      }
    }, f = async () => {
      try {
        l.value = !0, await i.deleteVoucher(s.value), r(n("toast.voucherHasBeenDeleted", { voucher: s.value }));
      } catch (d) {
        d instanceof Ot && d.statusCode === 404 ? o(n("toast.voucherNotFound", { voucher: s.value })) : o();
      } finally {
        l.value = !1;
      }
    };
    return rt(() => {
      a.voucher && (s.value = a.voucher.code);
    }), (d, v) => (B(), X("div", null, [
      W("div", wb, [
        tu(W("input", {
          "onUpdate:modelValue": v[0] || (v[0] = (h) => s.value = h),
          readonly: !!d.voucher,
          class: "th-cart-coupon__input",
          type: "text"
        }, null, 8, Tb), [
          [fh, s.value]
        ]),
        s.value.length ? (B(), X(Ie, { key: 0 }, [
          d.voucher ? (B(), ue(tt, {
            key: 1,
            loading: l.value,
            class: "th-cart-coupon__btn",
            plain: "",
            onClick: f
          }, {
            default: we(() => [
              Je(ie(K(n)("cart.delete")), 1)
            ]),
            _: 1
          }, 8, ["loading"])) : (B(), ue(tt, {
            key: 0,
            loading: l.value,
            class: "th-cart-coupon__btn",
            plain: "",
            onClick: u
          }, {
            default: we(() => [
              Je(ie(K(n)("cart.apply")), 1)
            ]),
            _: 1
          }, 8, ["loading"]))
        ], 64)) : ae("", !0)
      ])
    ]));
  }
}), oc = /* @__PURE__ */ _e(Cb, [["__scopeId", "data-v-d34fbbef"]]), kb = { class: "th-cart-discount cart-discount_expanded" }, Sb = {
  key: 1,
  class: "th-cart-discount__wrapper"
}, Ib = { class: "th-cart-discount__heading" }, Db = {
  key: 0,
  class: "th-cart-discount__inputs"
}, Ob = /* @__PURE__ */ me({
  __name: "CartDiscount",
  props: {
    isShown: { type: Boolean, default: !1 }
  },
  setup(e) {
    const { t } = Pe(), n = e, r = lt(), o = ne(n.isShown), a = ne(!1);
    return rt(() => {
      r.isVouchersApplied && (o.value = !0);
    }), (i, l) => (B(), X("div", kb, [
      n.isShown ? ae("", !0) : (B(), ue(Eb, {
        key: 0,
        modelValue: o.value,
        "onUpdate:modelValue": l[0] || (l[0] = (s) => o.value = s),
        readonly: K(r).isVouchersApplied,
        text: K(t)("cart.iHaveDiscountCode"),
        class: "th-cart-discount__checkbox"
      }, null, 8, ["modelValue", "readonly", "text"])),
      o.value ? (B(), X("div", Sb, [
        W("div", Ib, ie(K(t)("cart.discountCode")), 1),
        K(r).isVouchersApplied ? (B(), X("div", Db, [
          (B(!0), X(Ie, null, ot(K(r).vouchers, (s) => (B(), ue(oc, {
            key: s.voucherId,
            voucher: s,
            onCodeApplied: l[1] || (l[1] = (c) => a.value = !1)
          }, null, 8, ["voucher"]))), 128))
        ])) : ae("", !0),
        !a.value && K(r).isVouchersApplied ? (B(), ue(tt, {
          key: 1,
          class: "th-cart-discount__btn",
          plain: "",
          onClick: l[2] || (l[2] = (s) => a.value = !0)
        }, {
          default: we(() => [
            Je(ie(K(t)("cart.addDiscountCode")), 1)
          ]),
          _: 1
        })) : ae("", !0),
        a.value || !K(r).isVouchersApplied ? (B(), ue(oc, {
          key: 2,
          class: "th-cart-discount__new-input",
          onCodeApplied: l[3] || (l[3] = (s) => a.value = !1)
        })) : ae("", !0)
      ])) : ae("", !0)
    ]));
  }
}), Pb = /* @__PURE__ */ _e(Ob, [["__scopeId", "data-v-6a7d0a33"]]), Ab = {}, Nb = {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, Lb = /* @__PURE__ */ W("path", {
  d: `M10.5894 6.05557C10.4727 5.93888 10.3156 5.87305 10.151 5.87305C9.98646 5.87305 9.82937
      5.93738 9.71267 6.05557L7.11991 8.63487L6.28957 7.79854C6.05019 7.55916 5.65672 7.55617
      5.41435 7.79405C5.17048 8.03193 5.16749 8.42541 5.40687 8.67077L6.67557 9.94845C6.79227
      10.0651 6.94936 10.131 7.11542 10.131C7.28 10.131 7.43559 10.0666 7.55229 9.94995L10.5864
      6.93379C10.8258 6.69441 10.8288 6.30093 10.5909 6.05856L10.5894 6.05557Z`,
  fill: "currentColor"
}, null, -1), Rb = /* @__PURE__ */ W("path", {
  d: `M14.9105 5.08408C14.532 4.1909 13.9904 3.38899 13.3022 2.69928C12.6125 2.01107 11.8106
			1.46948 10.9174 1.09096C9.99282 0.698983 9.01137 0.5 8 0.5C3.86475 0.501496 0.5 3.86625 0.5
			8.0015C0.5 12.1367 3.86475 15.5015 8 15.5015C12.1352 15.5015 15.5 12.1367 15.5 8.0015C15.5
			6.99013 15.3025 6.00868 14.9105 5.08408ZM8 14.2612C4.54847 14.2612 1.74028 11.453 1.74028
			8.0015C1.74028 4.54997 4.54847 1.74177 8 1.74177C11.4515 1.74177 14.2597 4.54997 14.2597
			8.0015C14.2597 11.453 11.4515 14.2612 8 14.2612Z`,
  fill: "currentColor"
}, null, -1), $b = [
  Lb,
  Rb
];
function Mb(e, t) {
  return B(), X("svg", Nb, $b);
}
const ac = /* @__PURE__ */ _e(Ab, [["render", Mb]]), xb = {}, Bb = {
  height: "32",
  viewBox: "0 0 26 32",
  width: "26",
  xmlns: "http://www.w3.org/2000/svg"
}, Vb = /* @__PURE__ */ ph('<path d="M26.032 7.797c-0.032-0.744-0.434-1.454-1.136-1.833-0 0-0-0-0-0l-10.558-5.702s-0 0-0-0c-1.060-0.572-2.389-0.176-2.961 0.885l-11.115 20.583s0 0-0 0c-0.176 0.326-0.251 0.678-0.252 1.025l-0.008-0.014v1.416l0.009 0.008c0.019 0.758 0.423 1.487 1.136 1.872l10.558 5.701c1.060 0.573 2.389 0.176 2.962-0.885l11.115-20.583c0.194-0.359 0.268-0.749 0.252-1.13 0.001-0.008 0.010-0.013 0.010-0.021v-1.337l-0.010 0.015zM24.068 8.841l-10.426 19.307c-0.284 0.526-0.94 0.722-1.466 0.438l-9.778-5.28c-0.526-0.284-0.722-0.94-0.438-1.466l10.426-19.306c0.267-0.494 0.885-0.678 1.378-0.412l0.545 0.294c-0.268 0.714-0.034 1.51 0.596 1.851l6.425 3.47c0.626 0.338 1.418 0.101 1.871-0.518l0.455 0.246c0.494 0.267 0.678 0.885 0.412 1.378z" fill="currentColor"></path><path d="M7.317 15.142l3.829-6.902c0.085-0.153 0.278-0.208 0.431-0.123l0.394 0.218c0.153 0.085 0.208 0.278 0.123 0.431l-3.829 6.902c-0.085 0.153-0.278 0.208-0.431 0.123l-0.394-0.218c-0.153-0.085-0.208-0.278-0.123-0.431z" fill="currentColor"></path><path d="M9.522 16.365l3.829-6.903c0.085-0.153 0.278-0.208 0.431-0.123l0.791 0.439c0.153 0.085 0.208 0.278 0.123 0.431l-3.829 6.903c-0.085 0.153-0.278 0.208-0.431 0.123l-0.791-0.439c-0.153-0.085-0.208-0.278-0.123-0.431z" fill="currentColor"></path><path d="M12.432 17.979l3.829-6.902c0.085-0.153 0.278-0.208 0.431-0.123l0.317 0.176c0.153 0.085 0.208 0.278 0.123 0.431l-3.829 6.902c-0.085 0.153-0.278 0.208-0.431 0.123l-0.317-0.176c-0.153-0.085-0.208-0.278-0.123-0.431z" fill="currentColor"></path><path d="M14.099 18.903l3.829-6.902c0.085-0.153 0.278-0.208 0.431-0.123l0.945 0.524c0.153 0.085 0.208 0.278 0.123 0.431l-3.829 6.902c-0.085 0.153-0.278 0.208-0.431 0.123l-0.945-0.524c-0.153-0.085-0.208-0.278-0.123-0.431z" fill="currentColor"></path>', 5), Ub = [
  Vb
];
function Fb(e, t) {
  return B(), X("svg", Bb, Ub);
}
const Hb = /* @__PURE__ */ _e(xb, [["render", Fb]]), Yb = { class: "th-achievements" }, jb = { class: "th-achievements__item" }, Wb = { class: "th-achievements__item" }, qb = { class: "th-achievements__item" }, Gb = /* @__PURE__ */ me({
  __name: "AchievementsComponent",
  setup(e) {
    const { t } = Pe();
    return (n, r) => (B(), X("div", Yb, [
      W("div", jb, [
        q(ac, { class: "th-achievements__icon" }),
        W("span", null, ie(K(t)("achievements.easyBooking")), 1)
      ]),
      W("div", Wb, [
        q(Hb, { class: "th-achievements__icon" }),
        W("span", null, ie(K(t)("achievements.ticketOnSmartphone")), 1)
      ]),
      W("div", qb, [
        q(ac, { class: "th-achievements__icon" }),
        W("span", null, ie(K(t)("achievements.customerService")), 1)
      ])
    ]));
  }
}), zb = /* @__PURE__ */ _e(Gb, [["__scopeId", "data-v-91d7f9e8"]]), Xb = { class: "th-cost" }, Kb = {
  key: 0,
  class: "th-cost__item"
}, Jb = { class: "th-cost__item_value" }, Zb = { class: "th-cost__item_value" }, Qb = {
  key: 2,
  class: "th-cost__item"
}, e1 = { class: "th-cost__item_value" }, t1 = {
  key: 3,
  class: "th-cost__item th-cost__item_total"
}, n1 = { class: "th-cost__item_value" }, r1 = /* @__PURE__ */ me({
  __name: "CostComponent",
  props: {
    subtotal: {},
    discount: {},
    tax: {},
    total: {}
  },
  setup(e) {
    const { t } = Pe(), n = e;
    return (r, o) => (B(), X("div", Xb, [
      n.subtotal ? (B(), X("div", Kb, [
        W("span", null, ie(K(t)("cart.subTotal")), 1),
        W("span", Jb, [
          q(st, {
            amount: n.subtotal
          }, null, 8, ["amount"])
        ])
      ])) : ae("", !0),
      n.discount ? (B(!0), X(Ie, { key: 1 }, ot(n.discount, (a) => (B(), X("div", {
        key: a.title,
        class: "th-cost__item"
      }, [
        W("span", null, ie(a.title), 1),
        W("span", Zb, [
          q(st, {
            amount: a.amount
          }, null, 8, ["amount"])
        ])
      ]))), 128)) : ae("", !0),
      typeof n.tax < "u" ? (B(), X("div", Qb, [
        W("span", null, ie(K(t)("cart.tax")), 1),
        W("span", e1, [
          q(st, {
            amount: n.tax
          }, null, 8, ["amount"])
        ])
      ])) : ae("", !0),
      typeof n.total < "u" ? (B(), X("div", t1, [
        W("span", null, ie(K(t)("cart.total")), 1),
        W("span", n1, [
          q(st, {
            amount: n.total
          }, null, 8, ["amount"])
        ])
      ])) : ae("", !0)
    ]));
  }
}), o1 = /* @__PURE__ */ _e(r1, [["__scopeId", "data-v-94343032"]]), a1 = { class: "th-cart-popup" }, i1 = {
  key: 0,
  class: "th-cart-popup__empty"
}, s1 = { class: "th-cart-popup__empty-content" }, l1 = { class: "th-cart-popup__empty-text" }, c1 = ["href"], u1 = {
  key: 1,
  class: "th-cart-popup__body"
}, d1 = { class: "th-cart-popup__title" }, f1 = { class: "th-cart-popup__list" }, p1 = {
  key: 2,
  class: "th-cart-popup__footer"
}, h1 = { class: "th-cart-popup__total" }, m1 = /* @__PURE__ */ me({
  __name: "CartPopup",
  props: {
    emptyCartBrowseLink: { default: "" }
  },
  setup(e) {
    const { t } = Pe(), n = ka(), r = lt(), o = e, a = se(() => window ? new URL(o.emptyCartBrowseLink, window.location.origin).href : o.emptyCartBrowseLink), i = () => {
      n.toggle(), window && a.value !== window.location.href && (window.location.href = a.value);
    };
    return (l, s) => (B(), ue(cs, {
      toggle: K(n).toggle
    }, {
      default: we(() => {
        var c, u, f, d;
        return [
          W("div", a1, [
            K(r).count === 0 ? (B(), X("div", i1, [
              W("div", s1, [
                W("p", l1, ie(K(t)("cart.cartIsEmpty")), 1),
                W("a", {
                  href: o.emptyCartBrowseLink,
                  class: "th-cart-popup__empty-button",
                  onClick: Ue(i, ["prevent"])
                }, [
                  q(tt, {
                    bg: "accent",
                    type: "button"
                  }, {
                    default: we(() => [
                      Je(ie(K(t)("cart.startExploring")), 1)
                    ]),
                    _: 1
                  })
                ], 8, c1)
              ])
            ])) : (B(), X("div", u1, [
              W("div", d1, ie(K(t)("cart.your", K(r).count)), 1),
              W("div", f1, [
                (B(!0), X(Ie, null, ot(K(r).items, (v) => (B(), ue(cb, {
                  key: v.id,
                  product: v
                }, null, 8, ["product"]))), 128))
              ]),
              q(zb),
              q(rc),
              q(Pb),
              q(rc, { class: "th-cart-popup__bottom-divider" }),
              q(o1, {
                discount: K(r).discountSummaries,
                subtotal: (c = K(r).cart) == null ? void 0 : c.totalPrice,
                tax: (u = K(r).cart) == null ? void 0 : u.vatAmount,
                total: (f = K(r).cart) == null ? void 0 : f.totalDiscountedPrice
              }, null, 8, ["discount", "subtotal", "tax", "total"])
            ])),
            K(r).count > 0 ? (B(), X("div", p1, [
              W("div", h1, [
                W("span", null, ie(K(t)("cart.total")), 1),
                W("span", null, [
                  q(st, {
                    amount: (d = K(r).cart) == null ? void 0 : d.totalDiscountedPrice
                  }, null, 8, ["amount"])
                ])
              ]),
              q(tt, {
                disabled: K(r).isExpired,
                to: { name: "checkout" },
                bg: "accent",
                class: "th-cart-popup__submit",
                tag: "router-link",
                onClick: s[0] || (s[0] = Ue((v) => K(n).toggle(), ["prevent"]))
              }, {
                default: we(() => [
                  Je(ie(K(t)("cart.toCheckout")), 1)
                ]),
                _: 1
              }, 8, ["disabled"])
            ])) : ae("", !0)
          ])
        ];
      }),
      _: 1
    }, 8, ["toggle"]));
  }
}), v1 = /* @__PURE__ */ _e(m1, [["__scopeId", "data-v-32936ca8"]]), Bi = Sn("currency-modal", () => {
  const e = ne(!1);
  function t() {
    e.value = !0;
  }
  function n() {
    e.value = !1;
  }
  function r(o) {
    e.value = typeof o < "u" && typeof o == "boolean" ? o : !e.value;
  }
  return qe(e, (o) => {
    window.dispatchEvent(
      new CustomEvent(o ? "th:currencyPopupOpen" : "th:currencyPopupClose")
    );
  }), { isOpen: e, open: t, close: n, toggle: r };
}), g1 = { class: "th-modal__title" }, _1 = { class: "th-modal__content" }, y1 = ["onClick"], b1 = { class: "th-modal__button-title" }, E1 = { class: "th-modal__button-description" }, w1 = /* @__PURE__ */ me({
  __name: "CurrencyPopup",
  setup(e) {
    const { t } = Pe(), { isOpen: n } = Gr(Bi()), { list: r, current: o } = Gr(bn()), { setCurrency: a } = bn(), { toggle: i, close: l } = Bi();
    return (s, c) => K(n) ? (B(), ue(cs, {
      key: 0,
      center: !0,
      toggle: K(i),
      class: "th-modal_currency"
    }, {
      default: we(() => [
        W("div", g1, ie(K(t)("cart.selectACurrency")), 1),
        W("div", _1, [
          (B(!0), X(Ie, null, ot(K(r), (u) => (B(), X("button", {
            key: u.code,
            class: Ee([{ "th-modal__button_selected": u.code === K(o).code }, "th-modal__button"]),
            type: "button",
            onClick: () => {
              K(a)(u.code), K(l)();
            }
          }, [
            W("span", b1, ie(u.code), 1),
            W("span", E1, ie(u.description) + " - " + ie(u.symbol), 1)
          ], 10, y1))), 128))
        ])
      ]),
      _: 1
    }, 8, ["toggle"])) : ae("", !0);
  }
}), T1 = /* @__PURE__ */ _e(w1, [["__scopeId", "data-v-c270df11"]]), C1 = {
  class: "th-toast__wrapper",
  role: "alert"
}, k1 = { class: "th-toast__heading" }, S1 = { class: "th-toast__text" }, I1 = /* @__PURE__ */ me({
  __name: "ToastComponent",
  props: {
    text: {},
    type: {}
  },
  setup(e) {
    const { t } = Pe(), n = e, r = n.text ? n.text : t("toast.error");
    return (o, a) => (B(), X("div", C1, [
      W("div", k1, ie(K(t)(`toast.${n.type}`)), 1),
      W("div", S1, ie(K(r)), 1)
    ]));
  }
}), D1 = /* @__PURE__ */ _e(I1, [["__scopeId", "data-v-9c4abe98"]]), O1 = { class: "th-toasts" }, P1 = /* @__PURE__ */ me({
  __name: "Toasts",
  setup(e) {
    const { getToasts: t } = hi(vo());
    return (n, r) => (B(), X("div", O1, [
      q(nu, { name: "fade" }, {
        default: we(() => [
          (B(!0), X(Ie, null, ot(K(t), (o) => (B(), ue(D1, {
            key: o.timestamp,
            text: o.text,
            type: o.type
          }, null, 8, ["text", "type"]))), 128))
        ]),
        _: 1
      })
    ]));
  }
}), A1 = /* @__PURE__ */ _e(P1, [["__scopeId", "data-v-87bdb252"]]), Sf = (e) => (uo("data-v-d0770e43"), e = e(), fo(), e), N1 = { class: "th-product-meta" }, L1 = {
  key: 0,
  class: "th-product-meta__rating"
}, R1 = {
  key: 0,
  class: "th-product-meta__stars"
}, $1 = /* @__PURE__ */ Sf(() => /* @__PURE__ */ W("svg", {
  fill: "none",
  height: "16",
  viewBox: "0 0 17 16",
  width: "17",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ W("path", {
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
], -1)), M1 = {
  key: 1,
  class: "th-product-meta__divider"
}, x1 = { key: 2 }, B1 = {
  key: 1,
  class: "th-product-meta__duration"
}, V1 = /* @__PURE__ */ Sf(() => /* @__PURE__ */ W("svg", {
  fill: "none",
  height: "24",
  viewBox: "0 0 24 24",
  width: "24",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ W("path", {
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
], -1)), U1 = /* @__PURE__ */ me({
  __name: "ProductMeta",
  props: {
    duration: {},
    rating: { default: 0 },
    bookingsCount: { default: 0 }
  },
  setup(e) {
    const { t } = Pe(), n = e;
    return (r, o) => (B(), X("div", N1, [
      n.rating || n.bookingsCount ? (B(), X("div", L1, [
        n.rating && n.rating >= 4 ? (B(), X("div", R1, [
          $1,
          W("span", null, ie(r.rating), 1)
        ])) : ae("", !0),
        n.rating && n.rating >= 4 && n.bookingsCount ? (B(), X("span", M1)) : ae("", !0),
        n.bookingsCount ? (B(), X("span", x1, ie(K(t)("booking.booking", n.bookingsCount)), 1)) : ae("", !0)
      ])) : ae("", !0),
      n.duration ? (B(), X("div", B1, [
        V1,
        W("span", null, ie(n.duration), 1)
      ])) : ae("", !0)
    ]));
  }
}), If = /* @__PURE__ */ _e(U1, [["__scopeId", "data-v-d0770e43"]]), F1 = {}, H1 = {
  fill: "none",
  height: "8",
  viewBox: "0 0 14 8",
  width: "14",
  xmlns: "http://www.w3.org/2000/svg"
}, Y1 = /* @__PURE__ */ W("path", {
  "clip-rule": "evenodd",
  d: "M12.9266 1.05445C13.1599 1.28974 13.1584 1.66963 12.9231 1.90297L8.12725 6.65917C7.5035 7.27777 6.49767 7.27776 5.87392 6.65917L1.07809 1.90297C0.842801 1.66963 0.841225 1.28974 1.07456 1.05445C1.30791 0.819168 1.6878 0.817591 1.92309 1.05093L6.71892 5.80713C6.87486 5.96178 7.12632 5.96178 7.28225 5.80713L12.0781 1.05093C12.3134 0.817592 12.6933 0.819168 12.9266 1.05445Z",
  fill: "currentColor",
  "fill-rule": "evenodd"
}, null, -1), j1 = [
  Y1
];
function W1(e, t) {
  return B(), X("svg", H1, j1);
}
const ai = /* @__PURE__ */ _e(F1, [["render", W1]]), q1 = { class: "th-option-select__placeholder" }, G1 = { class: "th-option-select__placeholder-title" }, z1 = { class: "th-option-select__placeholder-title th-option-select__placeholder-title_extended" }, X1 = { class: "th-option-select__placeholder-title" }, K1 = /* @__PURE__ */ me({
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
    const { t: n } = Pe(), r = e, o = ne(!1), a = ne(null), i = ne(null), l = ne(null), s = (d) => {
      var v;
      o.value = !!(d.isTrusted && d.target && ((v = a.value) != null && v.contains(d.target)));
    }, c = (d) => {
      d.isTrusted && d.code.toLowerCase() === "escape" && f(!1);
    }, u = () => {
      window && setTimeout(() => {
        const d = i.value;
        if (d.style.transform = "translateY(0)", window.innerHeight < d.getBoundingClientRect().bottom) {
          const h = d.getBoundingClientRect().bottom - window.innerHeight + 30;
          d.style.transform = `translateY(-${h}px)`;
        }
      }, 0);
    };
    qe(o, (d) => {
      d ? (window.addEventListener("click", s), window.addEventListener("keydown", c), u()) : (window.removeEventListener("click", s), window.removeEventListener("keydown", c));
    });
    const f = (d = !0) => {
      !r.isEnabled || !r.isActive || setTimeout(() => {
        o.value = typeof d == "boolean" ? d : !o.value;
      }, 0);
    };
    return t({ showOption: f }), (d, v) => (B(), X("div", {
      ref_key: "select",
      ref: a,
      class: Ee([{
        "th-option-select__wrapper_disabled": !r.isActive,
        "th-option-select__wrapper_calendar": r.isCalendar
      }, "th-option-select__wrapper"])
    }, [
      W("div", {
        class: "th-option-select th-option-select_external",
        onClick: f
      }, [
        W("div", q1, [
          W("div", G1, ie(r.title), 1),
          W("div", {
            class: Ee([{
              "th-option-select__placeholder-value_black": r.titleIsBlack
            }, "th-option-select__placeholder-value"])
          }, ie(r.selectedOptionTitle), 3),
          r.iconIsShown ? (B(), ue(ai, {
            key: 0,
            class: "th-option-select__icon",
            size: "12"
          })) : ae("", !0)
        ])
      ]),
      q(ru, { name: "fade" }, {
        default: we(() => [
          tu(W("div", {
            ref_key: "optionContent",
            ref: i,
            class: Ee([{
              "th-option-select__content_sticky": r.isSticky
            }, "th-option-select th-option-select__content"])
          }, [
            r.showHeader ? (B(), X("div", {
              key: 0,
              class: "th-option-select__placeholder",
              onClick: f
            }, [
              d.extendedHeaderTitle ? (B(), X(Ie, { key: 0 }, [
                W("div", z1, ie(d.extendedHeaderTitle), 1),
                r.iconIsShown ? (B(), ue(ai, {
                  key: 0,
                  class: Ee([{ "th-option-select__icon_shown": o.value }, "th-option-select__icon"]),
                  size: "12"
                }, null, 8, ["class"])) : ae("", !0)
              ], 64)) : (B(), X(Ie, { key: 1 }, [
                W("div", X1, ie(d.title), 1),
                W("div", {
                  class: Ee([{
                    "th-option-select__placeholder-value_black": r.titleIsBlack
                  }, "th-option-select__placeholder-value"])
                }, ie(d.selectedOptionTitle), 3),
                r.iconIsShown ? (B(), ue(ai, {
                  key: 0,
                  class: Ee([{ "th-option-select__icon_shown": o.value }, "th-option-select__icon"]),
                  size: "12"
                }, null, 8, ["class"])) : ae("", !0)
              ], 64))
            ])) : ae("", !0),
            W("div", {
              ref_key: "content",
              ref: l,
              class: Ee([{
                "th-option-select__content-wrapper_no-border": !r.showHeader
              }, "th-option-select__content-wrapper"])
            }, [
              Jn(d.$slots, "default", {}, void 0, !0),
              W("div", {
                class: Ee([{
                  "th-option-select__footer_extended": r.footerIsExtended
                }, "th-option-select__footer"])
              }, [
                q(tt, {
                  class: "th-option-select__close-btn",
                  plain: "",
                  type: "button",
                  onClick: v[0] || (v[0] = Ue((h) => f(!1), ["stop"]))
                }, {
                  default: we(() => [
                    Je(ie(K(n)("options.close")), 1)
                  ]),
                  _: 1
                })
              ], 2)
            ], 2)
          ], 2), [
            [hh, o.value]
          ])
        ]),
        _: 3
      })
    ], 2));
  }
}), $t = /* @__PURE__ */ _e(K1, [["__scopeId", "data-v-8c870be8"]]), J1 = { class: "th-variant-list" }, Z1 = ["onClick"], Q1 = /* @__PURE__ */ me({
  __name: "VariantSelector",
  props: {
    variants: {},
    selectedVariant: {}
  },
  emits: ["selectVariant"],
  setup(e, { emit: t }) {
    const { t: n } = Pe(), r = e, o = t;
    return (a, i) => (B(), ue($t, {
      "selected-option-title": r.selectedVariant.title,
      title: K(n)("options.tickets"),
      "title-is-black": !0
    }, {
      default: we(() => [
        W("div", J1, [
          (B(!0), X(Ie, null, ot(r.variants, (l) => (B(), X("div", {
            key: l.itemId,
            class: Ee([{
              "th-variant-list__item_active": r.selectedVariant.itemId === l.itemId
            }, "th-variant-list__item"]),
            onClick: (s) => o("selectVariant", l.itemId)
          }, ie(l.title), 11, Z1))), 128))
        ])
      ]),
      _: 1
    }, 8, ["selected-option-title", "title"]));
  }
}), ic = /* @__PURE__ */ _e(Q1, [["__scopeId", "data-v-78d9bc03"]]);
function Df(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function Pa(e) {
  return Df(e) ? new Date(e.getTime()) : e == null ? /* @__PURE__ */ new Date(NaN) : new Date(e);
}
function e0(e) {
  return Df(e) && !isNaN(e.getTime());
}
function Of(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  if (!(t >= 0 && t <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6");
  var n = Pa(e), r = n.getDay(), o = (r + 7 - t) % 7;
  return n.setDate(n.getDate() - o), n.setHours(0, 0, 0, 0), n;
}
function Pf(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.firstDayOfWeek, r = n === void 0 ? 0 : n, o = t.firstWeekContainsDate, a = o === void 0 ? 1 : o;
  if (!(a >= 1 && a <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7");
  for (var i = Pa(e), l = i.getFullYear(), s = /* @__PURE__ */ new Date(0), c = l + 1; c >= l - 1 && (s.setFullYear(c, 0, a), s.setHours(0, 0, 0, 0), s = Of(s, r), !(i.getTime() >= s.getTime())); c--)
    ;
  return s;
}
function ps(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.firstDayOfWeek, r = n === void 0 ? 0 : n, o = t.firstWeekContainsDate, a = o === void 0 ? 1 : o, i = Pa(e), l = Of(i, r), s = Pf(i, {
    firstDayOfWeek: r,
    firstWeekContainsDate: a
  }), c = l.getTime() - s.getTime();
  return Math.round(c / (7 * 24 * 3600 * 1e3)) + 1;
}
var hs = {
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  weekdaysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  firstDayOfWeek: 0,
  firstWeekContainsDate: 1
}, t0 = /\[([^\]]+)]|YYYY|YY?|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|Z{1,2}|S{1,3}|w{1,2}|x|X|a|A/g;
function mt(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2, n = "".concat(Math.abs(e)), r = e < 0 ? "-" : ""; n.length < t; )
    n = "0".concat(n);
  return r + n;
}
function sc(e) {
  return Math.round(e.getTimezoneOffset() / 15) * 15;
}
function lc(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.floor(r / 60), a = r % 60;
  return n + mt(o, 2) + t + mt(a, 2);
}
var cc = function(t, n, r) {
  var o = t < 12 ? "AM" : "PM";
  return r ? o.toLocaleLowerCase() : o;
}, Yr = {
  Y: function(t) {
    var n = t.getFullYear();
    return n <= 9999 ? "".concat(n) : "+".concat(n);
  },
  // Year: 00, 01, ..., 99
  YY: function(t) {
    return mt(t.getFullYear(), 4).substr(2);
  },
  // Year: 1900, 1901, ..., 2099
  YYYY: function(t) {
    return mt(t.getFullYear(), 4);
  },
  // Month: 1, 2, ..., 12
  M: function(t) {
    return t.getMonth() + 1;
  },
  // Month: 01, 02, ..., 12
  MM: function(t) {
    return mt(t.getMonth() + 1, 2);
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
    return mt(t.getDate(), 2);
  },
  // Hour: 0, 1, ... 23
  H: function(t) {
    return t.getHours();
  },
  // Hour: 00, 01, ..., 23
  HH: function(t) {
    return mt(t.getHours(), 2);
  },
  // Hour: 1, 2, ..., 12
  h: function(t) {
    var n = t.getHours();
    return n === 0 ? 12 : n > 12 ? n % 12 : n;
  },
  // Hour: 01, 02, ..., 12
  hh: function() {
    var t = Yr.h.apply(Yr, arguments);
    return mt(t, 2);
  },
  // Minute: 0, 1, ..., 59
  m: function(t) {
    return t.getMinutes();
  },
  // Minute: 00, 01, ..., 59
  mm: function(t) {
    return mt(t.getMinutes(), 2);
  },
  // Second: 0, 1, ..., 59
  s: function(t) {
    return t.getSeconds();
  },
  // Second: 00, 01, ..., 59
  ss: function(t) {
    return mt(t.getSeconds(), 2);
  },
  // 1/10 of second: 0, 1, ..., 9
  S: function(t) {
    return Math.floor(t.getMilliseconds() / 100);
  },
  // 1/100 of second: 00, 01, ..., 99
  SS: function(t) {
    return mt(Math.floor(t.getMilliseconds() / 10), 2);
  },
  // Millisecond: 000, 001, ..., 999
  SSS: function(t) {
    return mt(t.getMilliseconds(), 3);
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
    var r = n.meridiem || cc;
    return r(t.getHours(), t.getMinutes(), !1);
  },
  // am, pm
  a: function(t, n) {
    var r = n.meridiem || cc;
    return r(t.getHours(), t.getMinutes(), !0);
  },
  // Timezone: -01:00, +00:00, ... +12:00
  Z: function(t) {
    return lc(sc(t), ":");
  },
  // Timezone: -0100, +0000, ... +1200
  ZZ: function(t) {
    return lc(sc(t));
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
    return ps(t, {
      firstDayOfWeek: n.firstDayOfWeek,
      firstWeekContainsDate: n.firstWeekContainsDate
    });
  },
  ww: function(t, n) {
    return mt(Yr.w(t, n), 2);
  }
};
function ms(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = t ? String(t) : "YYYY-MM-DDTHH:mm:ss.SSSZ", o = Pa(e);
  if (!e0(o))
    return "Invalid Date";
  var a = n.locale || hs;
  return r.replace(t0, function(i, l) {
    return l || (typeof Yr[i] == "function" ? "".concat(Yr[i](o, a)) : i);
  });
}
function uc(e) {
  return o0(e) || r0(e) || n0();
}
function n0() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function r0(e) {
  if (Symbol.iterator in Object(e) || Object.prototype.toString.call(e) === "[object Arguments]")
    return Array.from(e);
}
function o0(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = new Array(e.length); t < e.length; t++)
      n[t] = e[t];
    return n;
  }
}
function dc(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function a0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? dc(n, !0).forEach(function(r) {
      Dn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : dc(n).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function i0(e, t) {
  return c0(e) || l0(e, t) || s0();
}
function s0() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function l0(e, t) {
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
function c0(e) {
  if (Array.isArray(e))
    return e;
}
function Dn(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var u0 = /(\[[^\[]*\])|(MM?M?M?|Do|DD?|ddd?d?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|S{1,3}|x|X|ZZ?|.)/g, Af = /\d/, On = /\d\d/, d0 = /\d{3}/, f0 = /\d{4}/, Dr = /\d\d?/, p0 = /[+-]\d\d:?\d\d/, Nf = /[+-]?\d+/, h0 = /[+-]?\d+(\.\d{1,3})?/, vs = "year", Aa = "month", Lf = "day", Rf = "hour", $f = "minute", Mf = "second", gs = "millisecond", xf = {}, De = function(t, n, r) {
  var o = Array.isArray(t) ? t : [t], a;
  typeof r == "string" ? a = function(l) {
    var s = parseInt(l, 10);
    return Dn({}, r, s);
  } : a = r, o.forEach(function(i) {
    xf[i] = [n, a];
  });
}, m0 = function(t) {
  return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}, go = function(t) {
  return function(n) {
    var r = n[t];
    if (!Array.isArray(r))
      throw new Error("Locale[".concat(t, "] need an array"));
    return new RegExp(r.map(m0).join("|"));
  };
}, _o = function(t, n) {
  return function(r, o) {
    var a = o[t];
    if (!Array.isArray(a))
      throw new Error("Locale[".concat(t, "] need an array"));
    var i = a.indexOf(r);
    if (i < 0)
      throw new Error("Invalid Word");
    return Dn({}, n, i);
  };
};
De("Y", Nf, vs);
De("YY", On, function(e) {
  var t = (/* @__PURE__ */ new Date()).getFullYear(), n = Math.floor(t / 100), r = parseInt(e, 10);
  return r = (r > 68 ? n - 1 : n) * 100 + r, Dn({}, vs, r);
});
De("YYYY", f0, vs);
De("M", Dr, function(e) {
  return Dn({}, Aa, parseInt(e, 10) - 1);
});
De("MM", On, function(e) {
  return Dn({}, Aa, parseInt(e, 10) - 1);
});
De("MMM", go("monthsShort"), _o("monthsShort", Aa));
De("MMMM", go("months"), _o("months", Aa));
De("D", Dr, Lf);
De("DD", On, Lf);
De(["H", "h"], Dr, Rf);
De(["HH", "hh"], On, Rf);
De("m", Dr, $f);
De("mm", On, $f);
De("s", Dr, Mf);
De("ss", On, Mf);
De("S", Af, function(e) {
  return Dn({}, gs, parseInt(e, 10) * 100);
});
De("SS", On, function(e) {
  return Dn({}, gs, parseInt(e, 10) * 10);
});
De("SSS", d0, gs);
function v0(e) {
  return e.meridiemParse || /[ap]\.?m?\.?/i;
}
function g0(e) {
  return "".concat(e).toLowerCase().charAt(0) === "p";
}
De(["A", "a"], v0, function(e, t) {
  var n = typeof t.isPM == "function" ? t.isPM(e) : g0(e);
  return {
    isPM: n
  };
});
function _0(e) {
  var t = e.match(/([+-]|\d\d)/g) || ["-", "0", "0"], n = i0(t, 3), r = n[0], o = n[1], a = n[2], i = parseInt(o, 10) * 60 + parseInt(a, 10);
  return i === 0 ? 0 : r === "+" ? -i : +i;
}
De(["Z", "ZZ"], p0, function(e) {
  return {
    offset: _0(e)
  };
});
De("x", Nf, function(e) {
  return {
    date: new Date(parseInt(e, 10))
  };
});
De("X", h0, function(e) {
  return {
    date: new Date(parseFloat(e) * 1e3)
  };
});
De("d", Af, "weekday");
De("dd", go("weekdaysMin"), _o("weekdaysMin", "weekday"));
De("ddd", go("weekdaysShort"), _o("weekdaysShort", "weekday"));
De("dddd", go("weekdays"), _o("weekdays", "weekday"));
De("w", Dr, "week");
De("ww", On, "week");
function y0(e, t) {
  if (e !== void 0 && t !== void 0) {
    if (t) {
      if (e < 12)
        return e + 12;
    } else if (e === 12)
      return 0;
  }
  return e;
}
function b0(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Date(), n = [0, 0, 1, 0, 0, 0, 0], r = [t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()], o = !0, a = 0; a < 7; a++)
    e[a] === void 0 ? n[a] = o ? r[a] : n[a] : (n[a] = e[a], o = !1);
  return n;
}
function E0(e, t, n, r, o, a, i) {
  var l;
  return e < 100 && e >= 0 ? (l = new Date(e + 400, t, n, r, o, a, i), isFinite(l.getFullYear()) && l.setFullYear(e)) : l = new Date(e, t, n, r, o, a, i), l;
}
function w0() {
  for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++)
    n[r] = arguments[r];
  var o = n[0];
  return o < 100 && o >= 0 ? (n[0] += 400, e = new Date(Date.UTC.apply(Date, n)), isFinite(e.getUTCFullYear()) && e.setUTCFullYear(o)) : e = new Date(Date.UTC.apply(Date, n)), e;
}
function T0(e, t, n) {
  var r = t.match(u0);
  if (!r)
    throw new Error();
  for (var o = r.length, a = {}, i = 0; i < o; i += 1) {
    var l = r[i], s = xf[l];
    if (s) {
      var u = typeof s[0] == "function" ? s[0](n) : s[0], f = s[1], d = (u.exec(e) || [])[0], v = f(d, n);
      a = a0({}, a, {}, v), e = e.replace(d, "");
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
function C0(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  try {
    var r = n.locale, o = r === void 0 ? hs : r, a = n.backupDate, i = a === void 0 ? /* @__PURE__ */ new Date() : a, l = T0(e, t, o), s = l.year, c = l.month, u = l.day, f = l.hour, d = l.minute, v = l.second, h = l.millisecond, _ = l.isPM, m = l.date, p = l.offset, g = l.weekday, S = l.week;
    if (m)
      return m;
    var O = [s, c, u, f, d, v, h];
    if (O[3] = y0(O[3], _), S !== void 0 && c === void 0 && u === void 0) {
      var L = Pf(s === void 0 ? i : new Date(s, 3), {
        firstDayOfWeek: o.firstDayOfWeek,
        firstWeekContainsDate: o.firstWeekContainsDate
      });
      return new Date(L.getTime() + (S - 1) * 7 * 24 * 3600 * 1e3);
    }
    var b, w = b0(O, i);
    return p !== void 0 ? (w[6] += p * 60 * 1e3, b = w0.apply(void 0, uc(w))) : b = E0.apply(void 0, uc(w)), g !== void 0 && b.getDay() !== g ? /* @__PURE__ */ new Date(NaN) : b;
  } catch {
    return /* @__PURE__ */ new Date(NaN);
  }
}
var k0 = Object.defineProperty, S0 = Object.defineProperties, I0 = Object.getOwnPropertyDescriptors, sa = Object.getOwnPropertySymbols, Bf = Object.prototype.hasOwnProperty, Vf = Object.prototype.propertyIsEnumerable, fc = (e, t, n) => t in e ? k0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Xe = (e, t) => {
  for (var n in t || (t = {}))
    Bf.call(t, n) && fc(e, n, t[n]);
  if (sa)
    for (var n of sa(t))
      Vf.call(t, n) && fc(e, n, t[n]);
  return e;
}, St = (e, t) => S0(e, I0(t)), D0 = (e, t) => {
  var n = {};
  for (var r in e)
    Bf.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && sa)
    for (var r of sa(e))
      t.indexOf(r) < 0 && Vf.call(e, r) && (n[r] = e[r]);
  return n;
};
const O0 = {
  formatLocale: hs,
  yearFormat: "YYYY",
  monthFormat: "MMM",
  monthBeforeYear: !0
};
let Br = "en";
const rr = {};
rr[Br] = O0;
function Uf(e, t, n = !1) {
  if (typeof e != "string")
    return rr[Br];
  let r = Br;
  return rr[e] && (r = e), t && (rr[e] = t, r = e), n || (Br = r), rr[e] || rr[Br];
}
function Vi(e) {
  return Uf(e, void 0, !0);
}
function _s(e, t) {
  if (!Array.isArray(e))
    return [];
  const n = [], r = e.length;
  let o = 0;
  for (t = t || r; o < r; )
    n.push(e.slice(o, o += t));
  return n;
}
function pc(e) {
  return Array.isArray(e) ? e[e.length - 1] : void 0;
}
function vn(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function en(e, t) {
  const n = {};
  return vn(e) && (Array.isArray(t) || (t = [t]), t.forEach((r) => {
    Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
  })), n;
}
function Ff(e, t) {
  if (!vn(e))
    return {};
  let n = e;
  return vn(t) && Object.keys(t).forEach((r) => {
    let o = t[r];
    const a = e[r];
    vn(o) && vn(a) && (o = Ff(a, o)), n = St(Xe({}, n), { [r]: o });
  }), n;
}
function ii(e) {
  const t = parseInt(String(e), 10);
  return t < 10 ? `0${t}` : `${t}`;
}
function P0(e) {
  const t = /-(\w)/g;
  return e.replace(t, (n, r) => r ? r.toUpperCase() : "");
}
const Hf = "datepicker_locale", Yf = "datepicker_prefixClass", jf = "datepicker_getWeek";
function ys() {
  return Tt(Hf, Xi(Vi()));
}
function A0(e) {
  const t = se(() => vn(e.value) ? Ff(Vi(), e.value) : Vi(e.value));
  return dr(Hf, t), t;
}
function N0(e) {
  dr(Yf, e);
}
function ct() {
  return Tt(Yf, "mx");
}
function L0(e) {
  dr(jf, e);
}
function R0() {
  return Tt(jf, ps);
}
function $0(e) {
  const t = e.style.display, n = e.style.visibility;
  e.style.display = "block", e.style.visibility = "hidden";
  const r = window.getComputedStyle(e), o = e.offsetWidth + parseInt(r.marginLeft, 10) + parseInt(r.marginRight, 10), a = e.offsetHeight + parseInt(r.marginTop, 10) + parseInt(r.marginBottom, 10);
  return e.style.display = t, e.style.visibility = n, { width: o, height: a };
}
function M0(e, t, n, r) {
  let o = 0, a = 0, i = 0, l = 0;
  const s = e.getBoundingClientRect(), c = document.documentElement.clientWidth, u = document.documentElement.clientHeight;
  return r && (i = window.pageXOffset + s.left, l = window.pageYOffset + s.top), c - s.left < t && s.right < t ? o = i - s.left + 1 : s.left + s.width / 2 <= c / 2 ? o = i : o = i + s.width - t, s.top <= n && u - s.bottom <= n ? a = l + u - s.top - n : s.top + s.height / 2 <= u / 2 ? a = l + s.height : a = l - n, { left: `${o}px`, top: `${a}px` };
}
function bs(e, t = document.body) {
  if (!e || e === t)
    return null;
  const n = (a, i) => getComputedStyle(a, null).getPropertyValue(i);
  return /(auto|scroll)/.test(n(e, "overflow") + n(e, "overflow-y") + n(e, "overflow-x")) ? e : bs(e.parentElement, t);
}
let Bo;
function x0() {
  if (typeof window > "u")
    return 0;
  if (Bo !== void 0)
    return Bo;
  const e = document.createElement("div");
  e.style.visibility = "hidden", e.style.overflow = "scroll", e.style.width = "100px", e.style.position = "absolute", e.style.top = "-9999px", document.body.appendChild(e);
  const t = document.createElement("div");
  return t.style.width = "100%", e.appendChild(t), Bo = e.offsetWidth - t.offsetWidth, e.parentNode.removeChild(e), Bo;
}
const hc = "ontouchend" in document ? "touchstart" : "mousedown";
function B0(e) {
  let t = !1;
  return function(...r) {
    t || (t = !0, requestAnimationFrame(() => {
      t = !1, e.apply(this, r);
    }));
  };
}
function sn(e, t) {
  return { setup: e, name: e.name, props: t };
}
function ln(e, t) {
  return new Proxy(e, {
    get(r, o) {
      const a = r[o];
      return a !== void 0 ? a : t[o];
    }
  });
}
const Pn = () => (e) => e, V0 = (e, t) => {
  const n = {};
  for (const r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      const o = P0(r);
      let a = e[r];
      t.indexOf(o) !== -1 && a === "" && (a = !0), n[o] = a;
    }
  return n;
};
function U0(e, {
  slots: t
}) {
  const n = ln(e, {
    appendToBody: !0
  }), r = ct(), o = ne(null), a = ne({
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
    } = $0(o.value);
    a.value = M0(s, c, u, n.appendToBody);
  };
  gt(i, {
    flush: "post"
  }), gt((s) => {
    const c = n.getRelativeElement();
    if (!c)
      return;
    const u = bs(c) || window, f = B0(i);
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
  return gt((s) => {
    document.addEventListener(hc, l), s(() => {
      document.removeEventListener(hc, l);
    });
  }), () => q(mh, {
    to: "body",
    disabled: !n.appendToBody
  }, {
    default: () => [q(ru, {
      name: `${r}-zoom-in-down`
    }, {
      default: () => {
        var s;
        return [n.visible && q("div", {
          ref: o,
          class: `${r}-datepicker-main ${r}-datepicker-popup ${n.className}`,
          style: [Xe({
            position: "absolute"
          }, a.value), n.style || {}]
        }, [(s = t.default) == null ? void 0 : s.call(t)])];
      }
    })]
  });
}
const F0 = Pn()(["style", "className", "visible", "appendToBody", "onClickOutside", "getRelativeElement"]);
var H0 = sn(U0, F0);
const Y0 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024",
  width: "1em",
  height: "1em"
}, j0 = /* @__PURE__ */ W("path", { d: "M940.218 107.055H730.764v-60.51H665.6v60.51H363.055v-60.51H297.89v60.51H83.78c-18.617 0-32.581 13.963-32.581 32.581v805.237c0 18.618 13.964 32.582 32.582 32.582h861.09c18.619 0 32.583-13.964 32.583-32.582V139.636c-4.655-18.618-18.619-32.581-37.237-32.581zm-642.327 65.163v60.51h65.164v-60.51h307.2v60.51h65.163v-60.51h176.873v204.8H116.364v-204.8H297.89zM116.364 912.291V442.18H912.29v470.11H116.364z" }, null, -1), W0 = [
  j0
];
function Wf(e, t) {
  return B(), X("svg", Y0, W0);
}
const q0 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024",
  width: "1em",
  height: "1em"
}, G0 = /* @__PURE__ */ W("path", { d: "M810.005 274.005 572.011 512l237.994 237.995-60.01 60.01L512 572.011 274.005 810.005l-60.01-60.01L451.989 512 213.995 274.005l60.01-60.01L512 451.989l237.995-237.994z" }, null, -1), z0 = [
  G0
];
function X0(e, t) {
  return B(), X("svg", q0, z0);
}
const K0 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
}, J0 = /* @__PURE__ */ W("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1), Z0 = /* @__PURE__ */ W("path", { d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" }, null, -1), Q0 = /* @__PURE__ */ W("path", { d: "M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" }, null, -1), eE = [
  J0,
  Z0,
  Q0
];
function tE(e, t) {
  return B(), X("svg", K0, eE);
}
function Bn(e, t = 0, n = 1, r = 0, o = 0, a = 0, i = 0) {
  const l = new Date(e, t, n, r, o, a, i);
  return e < 100 && e >= 0 && l.setFullYear(e), l;
}
function nn(e) {
  return e instanceof Date && !isNaN(e.getTime());
}
function Vn(e) {
  return Array.isArray(e) && e.length === 2 && e.every(nn) && e[0] <= e[1];
}
function nE(e) {
  return Array.isArray(e) && e.every(nn);
}
function Na(...e) {
  if (e[0] !== void 0 && e[0] !== null) {
    const n = new Date(e[0]);
    if (nn(n))
      return n;
  }
  const t = e.slice(1);
  return t.length ? Na(...t) : /* @__PURE__ */ new Date();
}
function rE(e) {
  const t = new Date(e);
  return t.setMonth(0, 1), t.setHours(0, 0, 0, 0), t;
}
function mc(e) {
  const t = new Date(e);
  return t.setDate(1), t.setHours(0, 0, 0, 0), t;
}
function wn(e) {
  const t = new Date(e);
  return t.setHours(0, 0, 0, 0), t;
}
function oE({
  firstDayOfWeek: e,
  year: t,
  month: n
}) {
  const r = [], o = Bn(t, n, 0), a = o.getDate(), i = a - (o.getDay() + 7 - e) % 7;
  for (let u = i; u <= a; u++)
    r.push(Bn(t, n, u - a));
  o.setMonth(n + 1, 0);
  const l = o.getDate();
  for (let u = 1; u <= l; u++)
    r.push(Bn(t, n, u));
  const s = a - i + 1, c = 6 * 7 - s - l;
  for (let u = 1; u <= c; u++)
    r.push(Bn(t, n, l + u));
  return r;
}
function la(e, t) {
  const n = new Date(e), r = typeof t == "function" ? t(n.getMonth()) : Number(t), o = n.getFullYear(), a = Bn(o, r + 1, 0).getDate(), i = n.getDate();
  return n.setMonth(r, Math.min(i, a)), n;
}
function lr(e, t) {
  const n = new Date(e), r = typeof t == "function" ? t(n.getFullYear()) : t;
  return n.setFullYear(r), n;
}
function aE(e, t) {
  const n = new Date(t), r = new Date(e), o = n.getFullYear() - r.getFullYear(), a = n.getMonth() - r.getMonth();
  return o * 12 + a;
}
function ca(e, t) {
  const n = new Date(e), r = new Date(t);
  return n.setHours(r.getHours(), r.getMinutes(), r.getSeconds()), n;
}
function iE(e, {
  slots: t
}) {
  const n = ln(e, {
    editable: !0,
    disabled: !1,
    clearable: !0,
    range: !1,
    multiple: !1
  }), r = ct(), o = ne(null), a = se(() => n.separator || (n.range ? " ~ " : ",")), i = (v) => n.range ? Vn(v) : n.multiple ? nE(v) : nn(v), l = (v) => Array.isArray(v) ? v.some((h) => n.disabledDate(h)) : n.disabledDate(v), s = se(() => o.value !== null ? o.value : typeof n.renderInputText == "function" ? n.renderInputText(n.value) : i(n.value) ? Array.isArray(n.value) ? n.value.map((v) => n.formatDate(v)).join(a.value) : n.formatDate(n.value) : ""), c = (v) => {
    var h;
    v && v.stopPropagation(), n.onChange(n.range ? [null, null] : null), (h = n.onClear) == null || h.call(n);
  }, u = () => {
    var v;
    if (!n.editable || o.value === null)
      return;
    const h = o.value.trim();
    if (o.value = null, h === "") {
      c();
      return;
    }
    let _;
    if (n.range) {
      let m = h.split(a.value);
      m.length !== 2 && (m = h.split(a.value.trim())), _ = m.map((p) => n.parseDate(p.trim()));
    } else
      n.multiple ? _ = h.split(a.value).map((m) => n.parseDate(m.trim())) : _ = n.parseDate(h);
    i(_) && !l(_) ? n.onChange(_) : (v = n.onInputError) == null || v.call(n, h);
  }, f = (v) => {
    o.value = typeof v == "string" ? v : v.target.value;
  }, d = (v) => {
    const {
      keyCode: h
    } = v;
    h === 9 ? n.onBlur() : h === 13 && u();
  };
  return () => {
    var v, h, _;
    const m = !n.disabled && n.clearable && s.value, p = St(Xe({
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
    return q("div", {
      class: `${r}-input-wrapper`,
      onClick: n.onClick
    }, [((v = t.input) == null ? void 0 : v.call(t, p)) || q("input", p, null), m ? q("i", {
      class: `${r}-icon-clear`,
      onClick: c
    }, [((h = t["icon-clear"]) == null ? void 0 : h.call(t)) || q(X0, null, null)]) : null, q("i", {
      class: `${r}-icon-calendar`
    }, [((_ = t["icon-calendar"]) == null ? void 0 : _.call(t)) || q(Wf, null, null)])]);
  };
}
const Es = Pn()(["placeholder", "editable", "disabled", "clearable", "inputClass", "inputAttr", "range", "multiple", "separator", "renderInputText", "onInputError", "onClear"]), sE = Pn()(["value", "formatDate", "parseDate", "disabledDate", "onChange", "onFocus", "onBlur", "onClick", ...Es]);
var lE = sn(iE, sE);
function cE(e, {
  slots: t
}) {
  var n;
  const r = ln(e, {
    prefixClass: "mx",
    valueType: "date",
    format: "YYYY-MM-DD",
    type: "date",
    disabledDate: () => !1,
    disabledTime: () => !1,
    confirmText: "OK"
  });
  N0(r.prefixClass), L0(((n = r.formatter) == null ? void 0 : n.getWeek) || ps);
  const o = A0(Vr(e, "lang")), a = ne(), i = () => a.value, l = ne(!1), s = se(() => !r.disabled && (typeof r.open == "boolean" ? r.open : l.value)), c = () => {
    var b, w;
    r.disabled || s.value || (l.value = !0, (b = r["onUpdate:open"]) == null || b.call(r, !0), (w = r.onOpen) == null || w.call(r));
  }, u = () => {
    var b, w;
    s.value && (l.value = !1, (b = r["onUpdate:open"]) == null || b.call(r, !1), (w = r.onClose) == null || w.call(r));
  }, f = (b, w) => (w = w || r.format, vn(r.formatter) && typeof r.formatter.stringify == "function" ? r.formatter.stringify(b, w) : ms(b, w, {
    locale: o.value.formatLocale
  })), d = (b, w) => {
    if (w = w || r.format, vn(r.formatter) && typeof r.formatter.parse == "function")
      return r.formatter.parse(b, w);
    const T = /* @__PURE__ */ new Date();
    return C0(b, w, {
      locale: o.value.formatLocale,
      backupDate: T
    });
  }, v = (b) => {
    switch (r.valueType) {
      case "date":
        return b instanceof Date ? new Date(b.getTime()) : /* @__PURE__ */ new Date(NaN);
      case "timestamp":
        return typeof b == "number" ? new Date(b) : /* @__PURE__ */ new Date(NaN);
      case "format":
        return typeof b == "string" ? d(b) : /* @__PURE__ */ new Date(NaN);
      default:
        return typeof b == "string" ? d(b, r.valueType) : /* @__PURE__ */ new Date(NaN);
    }
  }, h = (b) => {
    if (!nn(b))
      return null;
    switch (r.valueType) {
      case "date":
        return b;
      case "timestamp":
        return b.getTime();
      case "format":
        return f(b);
      default:
        return f(b, r.valueType);
    }
  }, _ = se(() => {
    const b = r.value;
    return r.range ? (Array.isArray(b) ? b.slice(0, 2) : [null, null]).map(v) : r.multiple ? (Array.isArray(b) ? b : []).map(v) : v(b);
  }), m = (b, w, T = !0) => {
    var k, y;
    const I = Array.isArray(b) ? b.map(h) : h(b);
    return (k = r["onUpdate:value"]) == null || k.call(r, I), (y = r.onChange) == null || y.call(r, I, w), T && u(), I;
  }, p = ne(/* @__PURE__ */ new Date());
  gt(() => {
    s.value && (p.value = _.value);
  });
  const g = (b, w) => {
    r.confirm ? p.value = b : m(b, w, !r.multiple && (w === r.type || w === "time"));
  }, S = () => {
    var b;
    const w = m(p.value);
    (b = r.onConfirm) == null || b.call(r, w);
  }, O = (b) => r.disabledDate(b) || r.disabledTime(b), L = (b) => {
    var w;
    const {
      prefixClass: T
    } = r;
    return q("div", {
      class: `${T}-datepicker-sidebar`
    }, [(w = t.sidebar) == null ? void 0 : w.call(t, b), (r.shortcuts || []).map((k, y) => q("button", {
      key: y,
      "data-index": y,
      type: "button",
      class: `${T}-btn ${T}-btn-text ${T}-btn-shortcut`,
      onClick: () => {
        var I;
        const A = (I = k.onClick) == null ? void 0 : I.call(k);
        A && m(A);
      }
    }, [k.text]))]);
  };
  return () => {
    var b, w;
    const {
      prefixClass: T,
      disabled: k,
      confirm: y,
      range: I,
      popupClass: A,
      popupStyle: U,
      appendToBody: x
    } = r, N = {
      value: p.value,
      "onUpdate:value": g,
      emit: m
    }, R = t.header && q("div", {
      class: `${T}-datepicker-header`
    }, [t.header(N)]), F = (t.footer || y) && q("div", {
      class: `${T}-datepicker-footer`
    }, [(b = t.footer) == null ? void 0 : b.call(t, N), y && q("button", {
      type: "button",
      class: `${T}-btn ${T}-datepicker-btn-confirm`,
      onClick: S
    }, [r.confirmText])]), M = (w = t.content) == null ? void 0 : w.call(t, N), G = (t.sidebar || r.shortcuts) && L(N);
    return q("div", {
      ref: a,
      class: {
        [`${T}-datepicker`]: !0,
        [`${T}-datepicker-range`]: I,
        disabled: k
      }
    }, [q(lE, St(Xe({}, en(r, Es)), {
      value: _.value,
      formatDate: f,
      parseDate: d,
      disabledDate: O,
      onChange: m,
      onClick: c,
      onFocus: c,
      onBlur: u
    }), en(t, ["icon-calendar", "icon-clear", "input"])), q(H0, {
      className: A,
      style: U,
      visible: s.value,
      appendToBody: x,
      getRelativeElement: i,
      onClickOutside: u
    }, {
      default: () => [G, q("div", {
        class: `${T}-datepicker-content`
      }, [R, M, F])]
    })]);
  };
}
const uE = Pn()(["value", "valueType", "type", "format", "formatter", "lang", "prefixClass", "appendToBody", "open", "popupClass", "popupStyle", "confirm", "confirmText", "shortcuts", "disabledDate", "disabledTime", "onOpen", "onClose", "onConfirm", "onChange", "onUpdate:open", "onUpdate:value"]), dE = [...uE, ...Es];
var vc = sn(cE, dE);
function Vo(e) {
  var t = e, {
    value: n
  } = t, r = D0(t, [
    "value"
  ]);
  const o = ct();
  return q("button", St(Xe({}, r), {
    type: "button",
    class: `${o}-btn ${o}-btn-text ${o}-btn-icon-${n}`
  }), [q("i", {
    class: `${o}-icon-${n}`
  }, null)]);
}
function ws({
  type: e,
  calendar: t,
  onUpdateCalendar: n
}, {
  slots: r
}) {
  var o;
  const a = ct(), i = () => {
    n(la(t, (d) => d - 1));
  }, l = () => {
    n(la(t, (d) => d + 1));
  }, s = () => {
    n(lr(t, (d) => d - 1));
  }, c = () => {
    n(lr(t, (d) => d + 1));
  }, u = () => {
    n(lr(t, (d) => d - 10));
  }, f = () => {
    n(lr(t, (d) => d + 10));
  };
  return q("div", {
    class: `${a}-calendar-header`
  }, [q(Vo, {
    value: "double-left",
    onClick: e === "year" ? u : s
  }, null), e === "date" && q(Vo, {
    value: "left",
    onClick: i
  }, null), q(Vo, {
    value: "double-right",
    onClick: e === "year" ? f : c
  }, null), e === "date" && q(Vo, {
    value: "right",
    onClick: l
  }, null), q("span", {
    class: `${a}-calendar-header-label`
  }, [(o = r.default) == null ? void 0 : o.call(r)])]);
}
function fE({
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
  const f = ct(), d = R0(), v = ys().value, {
    yearFormat: h,
    monthBeforeYear: _,
    monthFormat: m = "MMM",
    formatLocale: p
  } = v, g = p.firstDayOfWeek || 0;
  let S = v.days || p.weekdaysMin;
  S = S.concat(S).slice(g, g + 7);
  const O = e.getFullYear(), L = e.getMonth(), b = _s(oE({
    firstDayOfWeek: g,
    year: O,
    month: L
  }), 7), w = (N, R) => ms(N, R, {
    locale: v.formatLocale
  }), T = (N) => {
    l(N);
  }, k = (N) => {
    const R = N.getAttribute("data-index"), [F, M] = R.split(",").map((j) => parseInt(j, 10)), G = b[F][M];
    return new Date(G);
  }, y = (N) => {
    i(k(N.currentTarget));
  }, I = (N) => {
    c && c(k(N.currentTarget));
  }, A = (N) => {
    u && u(k(N.currentTarget));
  }, U = q("button", {
    type: "button",
    class: `${f}-btn ${f}-btn-text ${f}-btn-current-year`,
    onClick: () => T("year")
  }, [w(e, h)]), x = q("button", {
    type: "button",
    class: `${f}-btn ${f}-btn-text ${f}-btn-current-month`,
    onClick: () => T("month")
  }, [w(e, m)]);
  return n = typeof n == "boolean" ? n : t, q("div", {
    class: [`${f}-calendar ${f}-calendar-panel-date`, {
      [`${f}-calendar-week-mode`]: t
    }]
  }, [q(ws, {
    type: "date",
    calendar: e,
    onUpdateCalendar: s
  }, {
    default: () => [_ ? [x, U] : [U, x]]
  }), q("div", {
    class: `${f}-calendar-content`
  }, [q("table", {
    class: `${f}-table ${f}-table-date`
  }, [q("thead", null, [q("tr", null, [n && q("th", {
    class: `${f}-week-number-header`
  }, null), S.map((N) => q("th", {
    key: N
  }, [N]))])]), q("tbody", null, [b.map((N, R) => q("tr", {
    key: R,
    class: [`${f}-date-row`, {
      [`${f}-active-week`]: o(N)
    }]
  }, [n && q("td", {
    class: `${f}-week-number`,
    "data-index": `${R},0`,
    onClick: y
  }, [q("div", null, [d(N[0])])]), N.map((F, M) => q("td", {
    key: M,
    class: ["cell", a(F)],
    title: w(F, r),
    "data-index": `${R},${M}`,
    onClick: y,
    onMouseenter: I,
    onMouseleave: A
  }, [q("div", null, [F.getDate()])]))]))])])])]);
}
function pE({
  calendar: e,
  getCellClasses: t,
  onSelect: n,
  onUpdateCalendar: r,
  onUpdatePanel: o
}) {
  const a = ct(), i = ys().value, l = i.months || i.formatLocale.monthsShort, s = (u) => Bn(e.getFullYear(), u), c = (u) => {
    const d = u.currentTarget.getAttribute("data-month");
    n(s(parseInt(d, 10)));
  };
  return q("div", {
    class: `${a}-calendar ${a}-calendar-panel-month`
  }, [q(ws, {
    type: "month",
    calendar: e,
    onUpdateCalendar: r
  }, {
    default: () => [q("button", {
      type: "button",
      class: `${a}-btn ${a}-btn-text ${a}-btn-current-year`,
      onClick: () => o("year")
    }, [e.getFullYear()])]
  }), q("div", {
    class: `${a}-calendar-content`
  }, [q("table", {
    class: `${a}-table ${a}-table-month`
  }, [_s(l, 3).map((u, f) => q("tr", {
    key: f
  }, [u.map((d, v) => {
    const h = f * 3 + v;
    return q("td", {
      key: v,
      class: ["cell", t(s(h))],
      "data-month": h,
      onClick: c
    }, [q("div", null, [d])]);
  })]))])])]);
}
const hE = (e) => {
  const t = Math.floor(e.getFullYear() / 10) * 10, n = [];
  for (let r = 0; r < 10; r++)
    n.push(t + r);
  return _s(n, 2);
};
function mE({
  calendar: e,
  getCellClasses: t = () => [],
  getYearPanel: n = hE,
  onSelect: r,
  onUpdateCalendar: o
}) {
  const a = ct(), i = (f) => Bn(f, 0), l = (f) => {
    const v = f.currentTarget.getAttribute("data-year");
    r(i(parseInt(v, 10)));
  }, s = n(new Date(e)), c = s[0][0], u = pc(pc(s));
  return q("div", {
    class: `${a}-calendar ${a}-calendar-panel-year`
  }, [q(ws, {
    type: "year",
    calendar: e,
    onUpdateCalendar: o
  }, {
    default: () => [q("span", null, [c]), q("span", {
      class: `${a}-calendar-decade-separator`
    }, null), q("span", null, [u])]
  }), q("div", {
    class: `${a}-calendar-content`
  }, [q("table", {
    class: `${a}-table ${a}-table-year`
  }, [s.map((f, d) => q("tr", {
    key: d
  }, [f.map((v, h) => q("td", {
    key: h,
    class: ["cell", t(i(v))],
    "data-year": v,
    onClick: l
  }, [q("div", null, [v])]))]))])])]);
}
function vE(e) {
  const t = ln(e, {
    defaultValue: wn(/* @__PURE__ */ new Date()),
    type: "date",
    disabledDate: () => !1,
    getClasses: () => [],
    titleFormat: "YYYY-MM-DD"
  }), n = se(() => (Array.isArray(t.value) ? t.value : [t.value]).filter(nn).map((g) => t.type === "year" ? rE(g) : t.type === "month" ? mc(g) : wn(g))), r = ne(/* @__PURE__ */ new Date());
  gt(() => {
    let p = t.calendar;
    if (!nn(p)) {
      const {
        length: g
      } = n.value;
      p = Na(g > 0 ? n.value[g - 1] : t.defaultValue);
    }
    r.value = mc(p);
  });
  const o = (p) => {
    var g;
    r.value = p, (g = t.onCalendarChange) == null || g.call(t, p);
  }, a = ne("date");
  gt(() => {
    const p = ["date", "month", "year"], g = Math.max(p.indexOf(t.type), p.indexOf(t.defaultPanel));
    a.value = g !== -1 ? p[g] : "date";
  });
  const i = (p) => {
    var g;
    const S = a.value;
    a.value = p, (g = t.onPanelChange) == null || g.call(t, p, S);
  }, l = (p) => t.disabledDate(new Date(p), n.value), s = (p, g) => {
    var S, O, L;
    if (!l(p))
      if ((S = t.onPick) == null || S.call(t, p), t.multiple === !0) {
        const b = n.value.filter((w) => w.getTime() !== p.getTime());
        b.length === n.value.length && b.push(p), (O = t["onUpdate:value"]) == null || O.call(t, b, g);
      } else
        (L = t["onUpdate:value"]) == null || L.call(t, p, g);
  }, c = (p) => {
    s(p, t.type === "week" ? "week" : "date");
  }, u = (p) => {
    if (t.type === "year")
      s(p, "year");
    else if (o(p), i("month"), t.partialUpdate && n.value.length === 1) {
      const g = lr(n.value[0], p.getFullYear());
      s(g, "year");
    }
  }, f = (p) => {
    if (t.type === "month")
      s(p, "month");
    else if (o(p), i("date"), t.partialUpdate && n.value.length === 1) {
      const g = la(lr(n.value[0], p.getFullYear()), p.getMonth());
      s(g, "month");
    }
  }, d = (p, g = []) => (l(p) ? g.push("disabled") : n.value.some((S) => S.getTime() === p.getTime()) && g.push("active"), g.concat(t.getClasses(p, n.value, g.join(" ")))), v = (p) => {
    const g = p.getMonth() !== r.value.getMonth(), S = [];
    return p.getTime() === (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0) && S.push("today"), g && S.push("not-current-month"), d(p, S);
  }, h = (p) => t.type !== "month" ? r.value.getMonth() === p.getMonth() ? "active" : "" : d(p), _ = (p) => t.type !== "year" ? r.value.getFullYear() === p.getFullYear() ? "active" : "" : d(p), m = (p) => {
    if (t.type !== "week")
      return !1;
    const g = p[0].getTime(), S = p[6].getTime();
    return n.value.some((O) => {
      const L = O.getTime();
      return L >= g && L <= S;
    });
  };
  return () => a.value === "year" ? q(mE, {
    calendar: r.value,
    getCellClasses: _,
    getYearPanel: t.getYearPanel,
    onSelect: u,
    onUpdateCalendar: o
  }, null) : a.value === "month" ? q(pE, {
    calendar: r.value,
    getCellClasses: h,
    onSelect: f,
    onUpdatePanel: i,
    onUpdateCalendar: o
  }, null) : q(fE, {
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
const La = Pn()(["type", "value", "defaultValue", "defaultPanel", "disabledDate", "getClasses", "calendar", "multiple", "partialUpdate", "showWeekNumber", "titleFormat", "getYearPanel", "onDateMouseEnter", "onDateMouseLeave", "onCalendarChange", "onPanelChange", "onUpdate:value", "onPick"]);
var Ra = sn(vE, La);
const gc = (e, t) => {
  const n = e.getTime();
  let [r, o] = t.map((a) => a.getTime());
  return r > o && ([r, o] = [o, r]), n > r && n < o;
};
function gE(e) {
  const t = ln(e, {
    defaultValue: /* @__PURE__ */ new Date(),
    type: "date"
  }), n = ct(), r = se(() => {
    let m = Array.isArray(t.defaultValue) ? t.defaultValue : [t.defaultValue, t.defaultValue];
    return m = m.map((p) => wn(p)), Vn(m) ? m : [/* @__PURE__ */ new Date(), /* @__PURE__ */ new Date()].map((p) => wn(p));
  }), o = ne([/* @__PURE__ */ new Date(NaN), /* @__PURE__ */ new Date(NaN)]);
  gt(() => {
    Vn(t.value) && (o.value = t.value);
  });
  const a = (m, p) => {
    var g;
    const [S, O] = o.value;
    nn(S) && !nn(O) ? (S.getTime() > m.getTime() ? o.value = [m, S] : o.value = [S, m], (g = t["onUpdate:value"]) == null || g.call(t, o.value, p)) : o.value = [m, /* @__PURE__ */ new Date(NaN)];
  }, i = ne([/* @__PURE__ */ new Date(), /* @__PURE__ */ new Date()]), l = se(() => Vn(t.calendar) ? t.calendar : i.value), s = se(() => t.type === "year" ? 10 * 12 : t.type === "month" ? 1 * 12 : 1), c = (m, p) => {
    var g;
    const S = aE(m[0], m[1]), O = s.value - S;
    if (O > 0) {
      const L = p === 1 ? 0 : 1;
      m[L] = la(m[L], (b) => b + (L === 0 ? -O : O));
    }
    i.value = m, (g = t.onCalendarChange) == null || g.call(t, m, p);
  }, u = (m) => {
    c([m, l.value[1]], 0);
  }, f = (m) => {
    c([l.value[0], m], 1);
  };
  gt(() => {
    const m = Vn(t.value) ? t.value : r.value;
    c(m.slice(0, 2));
  });
  const d = ne(null), v = (m) => d.value = m, h = () => d.value = null, _ = (m, p, g) => {
    const S = t.getClasses ? t.getClasses(m, p, g) : [], O = Array.isArray(S) ? S : [S];
    return /disabled|active/.test(g) ? O : (p.length === 2 && gc(m, p) && O.push("in-range"), p.length === 1 && d.value && gc(m, [p[0], d.value]) ? O.concat("hover-in-range") : O);
  };
  return () => {
    const m = l.value.map((p, g) => {
      const S = St(Xe({}, t), {
        calendar: p,
        value: o.value,
        defaultValue: r.value[g],
        getClasses: _,
        partialUpdate: !1,
        multiple: !1,
        "onUpdate:value": a,
        onCalendarChange: g === 0 ? u : f,
        onDateMouseLeave: h,
        onDateMouseEnter: v
      });
      return q(Ra, S, null);
    });
    return q("div", {
      class: `${n}-calendar-range`
    }, [m]);
  };
}
const Ts = La;
var Cs = sn(gE, Ts);
const qf = me({
  setup(e, {
    slots: t
  }) {
    const n = ct(), r = ne(), o = ne(""), a = ne("");
    rt(() => {
      if (!r.value)
        return;
      const h = r.value, _ = h.clientHeight * 100 / h.scrollHeight;
      o.value = _ < 100 ? `${_}%` : "";
    });
    const l = x0(), s = (h) => {
      const _ = h.currentTarget, {
        scrollHeight: m,
        scrollTop: p
      } = _;
      a.value = `${p * 100 / m}%`;
    };
    let c = !1, u = 0;
    const f = (h) => {
      h.stopImmediatePropagation();
      const _ = h.currentTarget, {
        offsetTop: m
      } = _;
      c = !0, u = h.clientY - m;
    }, d = (h) => {
      if (!c || !r.value)
        return;
      const {
        clientY: _
      } = h, {
        scrollHeight: m,
        clientHeight: p
      } = r.value, S = (_ - u) * m / p;
      r.value.scrollTop = S;
    }, v = () => {
      c = !1;
    };
    return rt(() => {
      document.addEventListener("mousemove", d), document.addEventListener("mouseup", v);
    }), eu(() => {
      document.addEventListener("mousemove", d), document.addEventListener("mouseup", v);
    }), () => {
      var h;
      return q("div", {
        class: `${n}-scrollbar`,
        style: {
          position: "relative",
          overflow: "hidden"
        }
      }, [q("div", {
        ref: r,
        class: `${n}-scrollbar-wrap`,
        style: {
          marginRight: `-${l}px`
        },
        onScroll: s
      }, [(h = t.default) == null ? void 0 : h.call(t)]), q("div", {
        class: `${n}-scrollbar-track`
      }, [q("div", {
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
function _E({
  options: e,
  getClasses: t,
  onSelect: n
}) {
  const r = ct(), o = (a) => {
    const i = a.target, l = a.currentTarget;
    if (i.tagName.toUpperCase() !== "LI")
      return;
    const s = l.getAttribute("data-type"), c = parseInt(l.getAttribute("data-index"), 10), u = parseInt(i.getAttribute("data-index"), 10), f = e[c].list[u].value;
    n(f, s);
  };
  return q("div", {
    class: `${r}-time-columns`
  }, [e.map((a, i) => q(qf, {
    key: a.type,
    class: `${r}-time-column`
  }, {
    default: () => [q("ul", {
      class: `${r}-time-list`,
      "data-index": i,
      "data-type": a.type,
      onClick: o
    }, [a.list.map((l, s) => q("li", {
      key: l.text,
      "data-index": s,
      class: [`${r}-time-item`, t(l.value, a.type)]
    }, [l.text]))])]
  }))]);
}
function yE(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !vh(e);
}
function bE(e) {
  let t;
  const n = ct();
  return q(qf, null, yE(t = e.options.map((r) => q("div", {
    key: r.text,
    class: [`${n}-time-option`, e.getClasses(r.value, "time")],
    onClick: () => e.onSelect(r.value, "time")
  }, [r.text]))) ? t : {
    default: () => [t]
  });
}
function si({
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
function EE(e, t) {
  let { showHour: n, showMinute: r, showSecond: o, use12h: a } = t;
  const i = t.format || "HH:mm:ss";
  n = typeof n == "boolean" ? n : /[HhKk]/.test(i), r = typeof r == "boolean" ? r : /m/.test(i), o = typeof o == "boolean" ? o : /s/.test(i), a = typeof a == "boolean" ? a : /a/i.test(i);
  const l = [], s = a && e.getHours() >= 12;
  return n && l.push({
    type: "hour",
    list: si({
      length: a ? 12 : 24,
      step: t.hourStep,
      options: t.hourOptions
    }).map((c) => {
      const u = c === 0 && a ? "12" : ii(c), f = new Date(e);
      return f.setHours(s ? c + 12 : c), { value: f, text: u };
    })
  }), r && l.push({
    type: "minute",
    list: si({
      length: 60,
      step: t.minuteStep,
      options: t.minuteOptions
    }).map((c) => {
      const u = new Date(e);
      return u.setMinutes(c), { value: u, text: ii(c) };
    })
  }), o && l.push({
    type: "second",
    list: si({
      length: 60,
      step: t.secondStep,
      options: t.secondOptions
    }).map((c) => {
      const u = new Date(e);
      return u.setSeconds(c), { value: u, text: ii(c) };
    })
  }), a && l.push({
    type: "ampm",
    list: ["AM", "PM"].map((c, u) => {
      const f = new Date(e);
      return f.setHours(f.getHours() % 12 + u * 12), { text: c, value: f };
    })
  }), l;
}
function li(e = "") {
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
function wE({
  date: e,
  option: t,
  format: n,
  formatDate: r
}) {
  const o = [];
  if (typeof t == "function")
    return t() || [];
  const a = li(t.start), i = li(t.end), l = li(t.step), s = t.format || n;
  if (a && i && l) {
    const c = a.minutes + a.hours * 60, u = i.minutes + i.hours * 60, f = l.minutes + l.hours * 60, d = Math.floor((u - c) / f);
    for (let v = 0; v <= d; v++) {
      const h = c + v * f, _ = Math.floor(h / 60), m = h % 60, p = new Date(e);
      p.setHours(_, m, 0), o.push({
        value: p,
        text: r(p, s)
      });
    }
  }
  return o;
}
const Gf = (e, t, n = 0) => {
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
    e.scrollTop = a, Gf(e, t, n - 10);
  });
};
function TE(e) {
  const t = ln(e, {
    defaultValue: wn(/* @__PURE__ */ new Date()),
    format: "HH:mm:ss",
    timeTitleFormat: "YYYY-MM-DD",
    disabledTime: () => !1,
    scrollDuration: 100
  }), n = ct(), r = ys(), o = (_, m) => ms(_, m, {
    locale: r.value.formatLocale
  }), a = ne(/* @__PURE__ */ new Date());
  gt(() => {
    a.value = Na(t.value, t.defaultValue);
  });
  const i = (_) => Array.isArray(_) ? _.every((m) => t.disabledTime(new Date(m))) : t.disabledTime(new Date(_)), l = (_) => {
    const m = new Date(_);
    return i([m.getTime(), m.setMinutes(0, 0, 0), m.setMinutes(59, 59, 999)]);
  }, s = (_) => {
    const m = new Date(_);
    return i([m.getTime(), m.setSeconds(0, 0), m.setSeconds(59, 999)]);
  }, c = (_) => {
    const m = new Date(_), p = m.getHours() < 12 ? 0 : 12, g = p + 11;
    return i([m.getTime(), m.setHours(p, 0, 0, 0), m.setHours(g, 59, 59, 999)]);
  }, u = (_, m) => m === "hour" ? l(_) : m === "minute" ? s(_) : m === "ampm" ? c(_) : i(_), f = (_, m) => {
    var p;
    if (!u(_, m)) {
      const g = new Date(_);
      a.value = g, i(g) || (p = t["onUpdate:value"]) == null || p.call(t, g, m);
    }
  }, d = (_, m) => u(_, m) ? "disabled" : _.getTime() === a.value.getTime() ? "active" : "", v = ne(), h = (_) => {
    if (!v.value)
      return;
    const m = v.value.querySelectorAll(".active");
    for (let p = 0; p < m.length; p++) {
      const g = m[p], S = bs(g, v.value);
      if (S) {
        const O = g.offsetTop;
        Gf(S, O, _);
      }
    }
  };
  return rt(() => h(0)), qe(a, () => h(t.scrollDuration), {
    flush: "post"
  }), () => {
    let _;
    return t.timePickerOptions ? _ = q(bE, {
      onSelect: f,
      getClasses: d,
      options: wE({
        date: a.value,
        format: t.format,
        option: t.timePickerOptions,
        formatDate: o
      })
    }, null) : _ = q(_E, {
      options: EE(a.value, t),
      onSelect: f,
      getClasses: d
    }, null), q("div", {
      class: `${n}-time`,
      ref: v
    }, [t.showTimeHeader && q("div", {
      class: `${n}-time-header`
    }, [q("button", {
      type: "button",
      class: `${n}-btn ${n}-btn-text ${n}-time-header-title`,
      onClick: t.onClickTitle
    }, [o(a.value, t.timeTitleFormat)])]), q("div", {
      class: `${n}-time-content`
    }, [_])]);
  };
}
const $a = Pn()(["value", "defaultValue", "format", "timeTitleFormat", "showTimeHeader", "disabledTime", "timePickerOptions", "hourOptions", "minuteOptions", "secondOptions", "hourStep", "minuteStep", "secondStep", "showHour", "showMinute", "showSecond", "use12h", "scrollDuration", "onClickTitle", "onUpdate:value"]);
var eo = sn(TE, $a);
function CE(e) {
  const t = ln(e, {
    defaultValue: wn(/* @__PURE__ */ new Date()),
    disabledTime: () => !1
  }), n = ct(), r = ne([/* @__PURE__ */ new Date(NaN), /* @__PURE__ */ new Date(NaN)]);
  gt(() => {
    Vn(t.value) ? r.value = t.value : r.value = [/* @__PURE__ */ new Date(NaN), /* @__PURE__ */ new Date(NaN)];
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
    return q("div", {
      class: `${n}-time-range`
    }, [q(eo, St(Xe({}, t), {
      "onUpdate:value": a,
      value: r.value[0],
      defaultValue: c[0],
      disabledTime: l
    }), null), q(eo, St(Xe({}, t), {
      "onUpdate:value": i,
      value: r.value[1],
      defaultValue: c[1],
      disabledTime: s
    }), null)]);
  };
}
const ks = $a;
var Ss = sn(CE, ks);
function zf(e) {
  const t = ne(!1), n = () => {
    var a;
    t.value = !1, (a = e.onShowTimePanelChange) == null || a.call(e, !1);
  }, r = () => {
    var a;
    t.value = !0, (a = e.onShowTimePanelChange) == null || a.call(e, !0);
  };
  return { timeVisible: se(() => typeof e.showTimePanel == "boolean" ? e.showTimePanel : t.value), openTimePanel: r, closeTimePanel: n };
}
function kE(e) {
  const t = ln(e, {
    disabledTime: () => !1,
    defaultValue: wn(/* @__PURE__ */ new Date())
  }), n = ne(t.value);
  gt(() => {
    n.value = t.value;
  });
  const {
    openTimePanel: r,
    closeTimePanel: o,
    timeVisible: a
  } = zf(t), i = (l, s) => {
    var c;
    s === "date" && r();
    let u = ca(l, Na(t.value, t.defaultValue));
    if (t.disabledTime(new Date(u)) && (u = ca(l, t.defaultValue), t.disabledTime(new Date(u)))) {
      n.value = u;
      return;
    }
    (c = t["onUpdate:value"]) == null || c.call(t, u, s);
  };
  return () => {
    const l = ct(), s = St(Xe({}, en(t, La)), {
      multiple: !1,
      type: "date",
      value: n.value,
      "onUpdate:value": i
    }), c = St(Xe({}, en(t, $a)), {
      showTimeHeader: !0,
      value: n.value,
      "onUpdate:value": t["onUpdate:value"],
      onClickTitle: o
    });
    return q("div", {
      class: `${l}-date-time`
    }, [q(Ra, s, null), a.value && q(eo, c, null)]);
  };
}
const Xf = Pn()(["showTimePanel", "onShowTimePanelChange"]), SE = [...Xf, ...La, ...$a];
var Kf = sn(kE, SE);
function IE(e) {
  const t = ln(e, {
    defaultValue: wn(/* @__PURE__ */ new Date()),
    disabledTime: () => !1
  }), n = ne(t.value);
  gt(() => {
    n.value = t.value;
  });
  const {
    openTimePanel: r,
    closeTimePanel: o,
    timeVisible: a
  } = zf(t), i = (l, s) => {
    var c;
    s === "date" && r();
    const u = Array.isArray(t.defaultValue) ? t.defaultValue : [t.defaultValue, t.defaultValue];
    let f = l.map((d, v) => {
      const h = Vn(t.value) ? t.value[v] : u[v];
      return ca(d, h);
    });
    if (f[1].getTime() < f[0].getTime() && (f = [f[0], f[0]]), f.some(t.disabledTime) && (f = l.map((d, v) => ca(d, u[v])), f.some(t.disabledTime))) {
      n.value = f;
      return;
    }
    (c = t["onUpdate:value"]) == null || c.call(t, f, s);
  };
  return () => {
    const l = ct(), s = St(Xe({}, en(t, Ts)), {
      type: "date",
      value: n.value,
      "onUpdate:value": i
    }), c = St(Xe({}, en(t, ks)), {
      showTimeHeader: !0,
      value: n.value,
      "onUpdate:value": t["onUpdate:value"],
      onClickTitle: o
    });
    return q("div", {
      class: `${l}-date-time-range`
    }, [q(Cs, s, null), a.value && q(Ss, c, null)]);
  };
}
const DE = [...Xf, ...ks, ...Ts];
var Jf = sn(IE, DE);
const OE = Pn()(["range", "open", "appendToBody", "clearable", "confirm", "disabled", "editable", "multiple", "partialUpdate", "showHour", "showMinute", "showSecond", "showTimeHeader", "showTimePanel", "showWeekNumber", "use12h"]), _c = {
  date: "YYYY-MM-DD",
  datetime: "YYYY-MM-DD HH:mm:ss",
  year: "YYYY",
  month: "YYYY-MM",
  time: "HH:mm:ss",
  week: "w"
};
function Zf(e, {
  slots: t
}) {
  const n = e.type || "date", r = e.format || _c[n] || _c.date, o = St(Xe({}, V0(e, OE)), {
    type: n,
    format: r
  });
  return q(vc, en(o, vc.props), Xe({
    content: (a) => {
      if (o.range) {
        const i = n === "time" ? Ss : n === "datetime" ? Jf : Cs;
        return jn(i, en(Xe(Xe({}, o), a), i.props));
      } else {
        const i = n === "time" ? eo : n === "datetime" ? Kf : Ra;
        return jn(i, en(Xe(Xe({}, o), a), i.props));
      }
    },
    "icon-calendar": () => n === "time" ? q(tE, null, null) : q(Wf, null, null)
  }, t));
}
const PE = {
  locale: Uf,
  install: (e) => {
    e.component("DatePicker", Zf);
  }
};
var Un = Object.assign(Zf, PE, {
  Calendar: Ra,
  CalendarRange: Cs,
  TimePanel: eo,
  TimeRange: Ss,
  DateTime: Kf,
  DateTimeRange: Jf
}), AE = {
  months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
  monthsShort: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
  weekdays: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
  weekdaysShort: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
  weekdaysMin: ["di", "lu", "ma", "me", "je", "ve", "sa"],
  firstDayOfWeek: 1,
  firstWeekContainsDate: 1
};
const NE = {
  formatLocale: AE,
  yearFormat: "YYYY",
  monthFormat: "MMM",
  monthBeforeYear: !0
};
Un.locale("fr", NE);
var LE = {
  months: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  monthsShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  weekdays: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
  weekdaysShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
  weekdaysMin: ["do", "lu", "ma", "mi", "ju", "vi", "sá"],
  firstDayOfWeek: 1,
  firstWeekContainsDate: 1
};
const RE = {
  formatLocale: LE,
  yearFormat: "YYYY",
  monthFormat: "MMM",
  monthBeforeYear: !0
};
Un.locale("es", RE);
var $E = {
  months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
  monthsShort: ["Jan", "Feb", "März", "Apr", "Mai", "Juni", "Juli", "Aug", "Sep", "Okt", "Nov", "Dez"],
  weekdays: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
  weekdaysShort: ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."],
  weekdaysMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
  firstDayOfWeek: 1,
  firstWeekContainsDate: 4
};
const ME = {
  formatLocale: $E,
  yearFormat: "YYYY",
  monthFormat: "MMM",
  monthBeforeYear: !0
};
Un.locale("de", ME);
var xE = {
  months: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
  monthsShort: ["jan.", "feb.", "mrt.", "apr.", "mei", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "dec."],
  weekdays: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
  weekdaysShort: ["zo.", "ma.", "di.", "wo.", "do.", "vr.", "za."],
  weekdaysMin: ["zo", "ma", "di", "wo", "do", "vr", "za"],
  firstDayOfWeek: 1,
  firstWeekContainsDate: 4
};
const BE = {
  formatLocale: xE,
  yearFormat: "YYYY",
  monthFormat: "MMM",
  monthBeforeYear: !0
};
Un.locale("nl", BE);
const VE = {
  key: 0,
  class: "mx-datepicker-sidebar"
}, UE = /* @__PURE__ */ me({
  __name: "DatePicker",
  props: {
    product: {},
    isEnabled: { type: Boolean, default: !0 },
    isUpsell: { type: Boolean, default: !1 }
  },
  emits: ["hideSelect", "dateSelect"],
  setup(e, { emit: t }) {
    const { t: n } = Pe(), { getServerTime: r } = lt(), o = t, a = ne(null), i = e, l = bn(), s = fs(), c = lt(), u = Un.locale(Pe().locale.value);
    u.formatLocale.firstDayOfWeek = 1, Un.locale(Pe().locale.value, u);
    const f = Un.Calendar, d = ne(!1), v = ne(!1), h = ne(!0), _ = ne(!1), m = ne(!1), p = ne(null), g = se(() => he(c.getServerTime)), S = se(() => {
      const U = he().format("YYYY-MM-DDT00:00:00");
      return i.product.availableDays.map((N) => N.date).includes(U) || d.value;
    }), O = se(() => {
      const U = he().add(1, "day").format("YYYY-MM-DDT00:00:00");
      return i.product.availableDays.map((N) => N.date).includes(U) || v.value;
    }), L = (U) => !i.product.availableDays.some((N) => he(U).isSame(N.date, "day")), b = () => {
      var R, F;
      if (!a.value)
        return;
      const U = (R = a.value) == null ? void 0 : R.querySelectorAll(
        ".th-datepicker .cell"
      ), N = he(
        (F = U[U.length - 1]) == null ? void 0 : F.title
      ).add(
        1,
        "day"
      );
      _.value = !i.product.availableDays.some(
        (M) => he(N).isBefore(M.date)
      );
    }, w = () => {
      var N, R;
      if (!a.value)
        return;
      const U = (N = a.value) == null ? void 0 : N.querySelectorAll(
        ".th-datepicker .cell"
      ), x = he((R = U[0]) == null ? void 0 : R.title);
      h.value = x.isBefore(r);
    }, T = () => {
      mr(() => {
        document.querySelectorAll(
          ".th-datepicker .cell"
        ).forEach((x) => {
          var R;
          const N = he(x.title);
          if (he().isBefore(N, "month") ? x.classList.add("next-month") : he().isAfter(N, "month") && x.classList.add("prev-month"), N.isBefore(he()) && x.classList.add("past"), i.product.hasDynamicPrices)
            if (x.classList.contains("disabled"))
              (R = x.querySelector(".cell__price")) == null || R.remove();
            else {
              const F = i.product.availableDays.find(
                (G) => he(G.date).isSame(N)
              ), M = s(Number(F == null ? void 0 : F.price));
              if (x.querySelector(".cell__price")) {
                const G = x.querySelector(
                  ".cell__price"
                );
                G.textContent = M;
              } else {
                const G = document.createElement("div");
                G.textContent = M, G.className = "cell__price", x.append(G);
              }
            }
        }), b(), w();
      });
    };
    rt(() => {
      var U, x;
      i.isEnabled && (T(), typeof ((U = window.ticketHub) == null ? void 0 : U.loaderComponent) < "u" && (p.value = (x = window.ticketHub) == null ? void 0 : x.loaderComponent));
    }), qe(
      () => l.current,
      () => T()
    );
    const k = async (U) => {
      var x;
      try {
        m.value = !0;
        const N = 42, R = ((x = i.product.availableDays.at(-1)) == null ? void 0 : x.date) || U, F = he(U).isBefore(i.product.selectedDate), M = !F, G = async (j = R) => {
          const Q = await yr.getProductBookingData(
            i.product,
            he(j).format("YYYY-MM-DD"),
            N
          );
          await i.product.setBookingData(Q);
        };
        M && !i.product.isDateExistsInAvailableDays(
          he(U).add(N, "days")
        ) ? await G() : F && !i.product.isDateExistsInAvailableDays(he(U)) && await G(U);
      } catch {
      } finally {
        m.value = !1, T();
      }
    }, y = se(() => typeof r > "u" ? !1 : r.isSame(
      he(i.product.selectedDate).tz("Europe/Amsterdam", !0),
      "day"
    )), I = se(() => typeof r > "u" ? !1 : r.add(1, "day").isSame(
      he(i.product.selectedDate).tz("Europe/Amsterdam", !0),
      "day"
    )), A = async (U) => {
      setTimeout(async () => {
        he(i.product.selectedDate).isSame(U, "day") || (await k(U), i.product.resetSelectedTimeslots(), i.product.selectDate(U), T(), o("dateSelect"), i.product.isCombo && o("hideSelect"));
      }, 0);
    };
    return (U, x) => (B(), X(Ie, null, [
      m.value ? (B(), X("div", {
        key: 0,
        class: Ee([{ "th-datepicker-loader_custom": p.value }, "th-datepicker-loader"])
      }, [
        (B(), ue(Ki(p.value)))
      ], 2)) : ae("", !0),
      W("div", {
        ref_key: "datePicker",
        ref: a,
        class: Ee([{ "th-datepicker_upsell": i.isUpsell }, "th-datepicker"])
      }, [
        S.value || O.value ? (B(), X("div", VE, [
          S.value ? (B(), X("button", {
            key: 0,
            class: Ee([{ "mx-btn-shortcut_active": y.value }, "mx-btn mx-btn-text mx-btn-shortcut"]),
            type: "button",
            onClick: x[0] || (x[0] = (N) => A(g.value.toDate()))
          }, ie(K(n)("calendar.today")), 3)) : ae("", !0),
          O.value ? (B(), X("button", {
            key: 1,
            class: Ee([{ "mx-btn-shortcut_active": I.value }, "mx-btn mx-btn-text mx-btn-shortcut"]),
            type: "button",
            onClick: x[1] || (x[1] = (N) => A(g.value.add(1, "day").toDate()))
          }, ie(K(n)("calendar.tomorrow")), 3)) : ae("", !0)
        ])) : ae("", !0),
        q(K(f), {
          class: Ee({
            "mx-calendar_disabled-prev-month": h.value,
            "mx-calendar_disabled-next-month": _.value
          }),
          "disabled-date": L,
          value: i.product.selectedDate,
          onOpen: T,
          "onUpdate:value": A,
          onCalendarChange: k
        }, null, 8, ["class", "value"])
      ], 2)
    ], 64));
  }
}), zo = /* @__PURE__ */ _e(UE, [["__scopeId", "data-v-18cc3c13"]]);
/*!
 * perfect-scrollbar v1.5.3
 * Copyright 2021 Hyunje Jun, MDBootstrap and Contributors
 * Licensed under MIT
 */
function Mt(e) {
  return getComputedStyle(e);
}
function ft(e, t) {
  for (var n in t) {
    var r = t[n];
    typeof r == "number" && (r = r + "px"), e.style[n] = r;
  }
  return e;
}
function Uo(e) {
  var t = document.createElement("div");
  return t.className = e, t;
}
var yc = typeof Element < "u" && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector);
function gn(e, t) {
  if (!yc)
    throw new Error("No element matching method supported");
  return yc.call(e, t);
}
function cr(e) {
  e.remove ? e.remove() : e.parentNode && e.parentNode.removeChild(e);
}
function bc(e, t) {
  return Array.prototype.filter.call(
    e.children,
    function(n) {
      return gn(n, t);
    }
  );
}
var Ye = {
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
}, Qf = { x: null, y: null };
function ep(e, t) {
  var n = e.element.classList, r = Ye.state.scrolling(t);
  n.contains(r) ? clearTimeout(Qf[t]) : n.add(r);
}
function tp(e, t) {
  Qf[t] = setTimeout(
    function() {
      return e.isAlive && e.element.classList.remove(Ye.state.scrolling(t));
    },
    e.settings.scrollingThreshold
  );
}
function FE(e, t) {
  ep(e, t), tp(e, t);
}
var yo = function(t) {
  this.element = t, this.handlers = {};
}, np = { isEmpty: { configurable: !0 } };
yo.prototype.bind = function(t, n) {
  typeof this.handlers[t] > "u" && (this.handlers[t] = []), this.handlers[t].push(n), this.element.addEventListener(t, n, !1);
};
yo.prototype.unbind = function(t, n) {
  var r = this;
  this.handlers[t] = this.handlers[t].filter(function(o) {
    return n && o !== n ? !0 : (r.element.removeEventListener(t, o, !1), !1);
  });
};
yo.prototype.unbindAll = function() {
  for (var t in this.handlers)
    this.unbind(t);
};
np.isEmpty.get = function() {
  var e = this;
  return Object.keys(this.handlers).every(
    function(t) {
      return e.handlers[t].length === 0;
    }
  );
};
Object.defineProperties(yo.prototype, np);
var Or = function() {
  this.eventElements = [];
};
Or.prototype.eventElement = function(t) {
  var n = this.eventElements.filter(function(r) {
    return r.element === t;
  })[0];
  return n || (n = new yo(t), this.eventElements.push(n)), n;
};
Or.prototype.bind = function(t, n, r) {
  this.eventElement(t).bind(n, r);
};
Or.prototype.unbind = function(t, n, r) {
  var o = this.eventElement(t);
  o.unbind(n, r), o.isEmpty && this.eventElements.splice(this.eventElements.indexOf(o), 1);
};
Or.prototype.unbindAll = function() {
  this.eventElements.forEach(function(t) {
    return t.unbindAll();
  }), this.eventElements = [];
};
Or.prototype.once = function(t, n, r) {
  var o = this.eventElement(t), a = function(i) {
    o.unbind(n, a), r(i);
  };
  o.bind(n, a);
};
function Fo(e) {
  if (typeof window.CustomEvent == "function")
    return new CustomEvent(e);
  var t = document.createEvent("CustomEvent");
  return t.initCustomEvent(e, !1, !1, void 0), t;
}
function ua(e, t, n, r, o) {
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
  HE(e, n, a, r, o);
}
function HE(e, t, n, r, o) {
  var a = n[0], i = n[1], l = n[2], s = n[3], c = n[4], u = n[5];
  r === void 0 && (r = !0), o === void 0 && (o = !1);
  var f = e.element;
  e.reach[s] = null, f[l] < 1 && (e.reach[s] = "start"), f[l] > e[a] - e[i] - 1 && (e.reach[s] = "end"), t && (f.dispatchEvent(Fo("ps-scroll-" + s)), t < 0 ? f.dispatchEvent(Fo("ps-scroll-" + c)) : t > 0 && f.dispatchEvent(Fo("ps-scroll-" + u)), r && FE(e, s)), e.reach[s] && (t || o) && f.dispatchEvent(Fo("ps-" + s + "-reach-" + e.reach[s]));
}
function Me(e) {
  return parseInt(e, 10) || 0;
}
function YE(e) {
  return gn(e, "input,[contenteditable]") || gn(e, "select,[contenteditable]") || gn(e, "textarea,[contenteditable]") || gn(e, "button,[contenteditable]");
}
function jE(e) {
  var t = Mt(e);
  return Me(t.width) + Me(t.paddingLeft) + Me(t.paddingRight) + Me(t.borderLeftWidth) + Me(t.borderRightWidth);
}
var or = {
  isWebKit: typeof document < "u" && "WebkitAppearance" in document.documentElement.style,
  supportsTouch: typeof window < "u" && ("ontouchstart" in window || "maxTouchPoints" in window.navigator && window.navigator.maxTouchPoints > 0 || window.DocumentTouch && document instanceof window.DocumentTouch),
  supportsIePointer: typeof navigator < "u" && navigator.msMaxTouchPoints,
  isChrome: typeof navigator < "u" && /Chrome/i.test(navigator && navigator.userAgent)
};
function rn(e) {
  var t = e.element, n = Math.floor(t.scrollTop), r = t.getBoundingClientRect();
  e.containerWidth = Math.round(r.width), e.containerHeight = Math.round(r.height), e.contentWidth = t.scrollWidth, e.contentHeight = t.scrollHeight, t.contains(e.scrollbarXRail) || (bc(t, Ye.element.rail("x")).forEach(
    function(o) {
      return cr(o);
    }
  ), t.appendChild(e.scrollbarXRail)), t.contains(e.scrollbarYRail) || (bc(t, Ye.element.rail("y")).forEach(
    function(o) {
      return cr(o);
    }
  ), t.appendChild(e.scrollbarYRail)), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive = !0, e.railXWidth = e.containerWidth - e.railXMarginWidth, e.railXRatio = e.containerWidth / e.railXWidth, e.scrollbarXWidth = Ec(
    e,
    Me(e.railXWidth * e.containerWidth / e.contentWidth)
  ), e.scrollbarXLeft = Me(
    (e.negativeScrollAdjustment + t.scrollLeft) * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth)
  )) : e.scrollbarXActive = !1, !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive = !0, e.railYHeight = e.containerHeight - e.railYMarginHeight, e.railYRatio = e.containerHeight / e.railYHeight, e.scrollbarYHeight = Ec(
    e,
    Me(e.railYHeight * e.containerHeight / e.contentHeight)
  ), e.scrollbarYTop = Me(
    n * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight)
  )) : e.scrollbarYActive = !1, e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight), WE(t, e), e.scrollbarXActive ? t.classList.add(Ye.state.active("x")) : (t.classList.remove(Ye.state.active("x")), e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, t.scrollLeft = e.isRtl === !0 ? e.contentWidth : 0), e.scrollbarYActive ? t.classList.add(Ye.state.active("y")) : (t.classList.remove(Ye.state.active("y")), e.scrollbarYHeight = 0, e.scrollbarYTop = 0, t.scrollTop = 0);
}
function Ec(e, t) {
  return e.settings.minScrollbarLength && (t = Math.max(t, e.settings.minScrollbarLength)), e.settings.maxScrollbarLength && (t = Math.min(t, e.settings.maxScrollbarLength)), t;
}
function WE(e, t) {
  var n = { width: t.railXWidth }, r = Math.floor(e.scrollTop);
  t.isRtl ? n.left = t.negativeScrollAdjustment + e.scrollLeft + t.containerWidth - t.contentWidth : n.left = e.scrollLeft, t.isScrollbarXUsingBottom ? n.bottom = t.scrollbarXBottom - r : n.top = t.scrollbarXTop + r, ft(t.scrollbarXRail, n);
  var o = { top: r, height: t.railYHeight };
  t.isScrollbarYUsingRight ? t.isRtl ? o.right = t.contentWidth - (t.negativeScrollAdjustment + e.scrollLeft) - t.scrollbarYRight - t.scrollbarYOuterWidth - 9 : o.right = t.scrollbarYRight - e.scrollLeft : t.isRtl ? o.left = t.negativeScrollAdjustment + e.scrollLeft + t.containerWidth * 2 - t.contentWidth - t.scrollbarYLeft - t.scrollbarYOuterWidth : o.left = t.scrollbarYLeft + e.scrollLeft, ft(t.scrollbarYRail, o), ft(t.scrollbarX, {
    left: t.scrollbarXLeft,
    width: t.scrollbarXWidth - t.railBorderXWidth
  }), ft(t.scrollbarY, {
    top: t.scrollbarYTop,
    height: t.scrollbarYHeight - t.railBorderYWidth
  });
}
function qE(e) {
  e.element, e.event.bind(e.scrollbarY, "mousedown", function(t) {
    return t.stopPropagation();
  }), e.event.bind(e.scrollbarYRail, "mousedown", function(t) {
    var n = t.pageY - window.pageYOffset - e.scrollbarYRail.getBoundingClientRect().top, r = n > e.scrollbarYTop ? 1 : -1;
    e.element.scrollTop += r * e.containerHeight, rn(e), t.stopPropagation();
  }), e.event.bind(e.scrollbarX, "mousedown", function(t) {
    return t.stopPropagation();
  }), e.event.bind(e.scrollbarXRail, "mousedown", function(t) {
    var n = t.pageX - window.pageXOffset - e.scrollbarXRail.getBoundingClientRect().left, r = n > e.scrollbarXLeft ? 1 : -1;
    e.element.scrollLeft += r * e.containerWidth, rn(e), t.stopPropagation();
  });
}
function GE(e) {
  wc(e, [
    "containerWidth",
    "contentWidth",
    "pageX",
    "railXWidth",
    "scrollbarX",
    "scrollbarXWidth",
    "scrollLeft",
    "x",
    "scrollbarXRail"
  ]), wc(e, [
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
function wc(e, t) {
  var n = t[0], r = t[1], o = t[2], a = t[3], i = t[4], l = t[5], s = t[6], c = t[7], u = t[8], f = e.element, d = null, v = null, h = null;
  function _(g) {
    g.touches && g.touches[0] && (g[o] = g.touches[0].pageY), f[s] = d + h * (g[o] - v), ep(e, c), rn(e), g.stopPropagation(), g.type.startsWith("touch") && g.changedTouches.length > 1 && g.preventDefault();
  }
  function m() {
    tp(e, c), e[u].classList.remove(Ye.state.clicking), e.event.unbind(e.ownerDocument, "mousemove", _);
  }
  function p(g, S) {
    d = f[s], S && g.touches && (g[o] = g.touches[0].pageY), v = g[o], h = (e[r] - e[n]) / (e[a] - e[l]), S ? e.event.bind(e.ownerDocument, "touchmove", _) : (e.event.bind(e.ownerDocument, "mousemove", _), e.event.once(e.ownerDocument, "mouseup", m), g.preventDefault()), e[u].classList.add(Ye.state.clicking), g.stopPropagation();
  }
  e.event.bind(e[i], "mousedown", function(g) {
    p(g);
  }), e.event.bind(e[i], "touchstart", function(g) {
    p(g, !0);
  });
}
function zE(e) {
  var t = e.element, n = function() {
    return gn(t, ":hover");
  }, r = function() {
    return gn(e.scrollbarX, ":focus") || gn(e.scrollbarY, ":focus");
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
        if (YE(i))
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
      e.settings.suppressScrollX && l !== 0 || e.settings.suppressScrollY && s !== 0 || (t.scrollTop -= s, t.scrollLeft += l, rn(e), o(l, s) && a.preventDefault());
    }
  });
}
function XE(e) {
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
    if (!or.isWebKit && t.querySelector("select:focus"))
      return !0;
    if (!t.contains(i))
      return !1;
    for (var c = i; c && c !== t; ) {
      if (c.classList.contains(Ye.element.consuming))
        return !0;
      var u = Mt(c);
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
      e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (c ? t.scrollTop -= c * e.settings.wheelSpeed : t.scrollTop += s * e.settings.wheelSpeed, u = !0) : e.scrollbarXActive && !e.scrollbarYActive && (s ? t.scrollLeft += s * e.settings.wheelSpeed : t.scrollLeft -= c * e.settings.wheelSpeed, u = !0) : (t.scrollTop -= c * e.settings.wheelSpeed, t.scrollLeft += s * e.settings.wheelSpeed), rn(e), u = u || n(s, c), u && !i.ctrlKey && (i.stopPropagation(), i.preventDefault());
    }
  }
  typeof window.onwheel < "u" ? e.event.bind(t, "wheel", a) : typeof window.onmousewheel < "u" && e.event.bind(t, "mousewheel", a);
}
function KE(e) {
  if (!or.supportsTouch && !or.supportsIePointer)
    return;
  var t = e.element;
  function n(h, _) {
    var m = Math.floor(t.scrollTop), p = t.scrollLeft, g = Math.abs(h), S = Math.abs(_);
    if (S > g) {
      if (_ < 0 && m === e.contentHeight - e.containerHeight || _ > 0 && m === 0)
        return window.scrollY === 0 && _ > 0 && or.isChrome;
    } else if (g > S && (h < 0 && p === e.contentWidth - e.containerWidth || h > 0 && p === 0))
      return !0;
    return !0;
  }
  function r(h, _) {
    t.scrollTop -= _, t.scrollLeft -= h, rn(e);
  }
  var o = {}, a = 0, i = {}, l = null;
  function s(h) {
    return h.targetTouches ? h.targetTouches[0] : h;
  }
  function c(h) {
    return h.pointerType && h.pointerType === "pen" && h.buttons === 0 ? !1 : !!(h.targetTouches && h.targetTouches.length === 1 || h.pointerType && h.pointerType !== "mouse" && h.pointerType !== h.MSPOINTER_TYPE_MOUSE);
  }
  function u(h) {
    if (c(h)) {
      var _ = s(h);
      o.pageX = _.pageX, o.pageY = _.pageY, a = (/* @__PURE__ */ new Date()).getTime(), l !== null && clearInterval(l);
    }
  }
  function f(h, _, m) {
    if (!t.contains(h))
      return !1;
    for (var p = h; p && p !== t; ) {
      if (p.classList.contains(Ye.element.consuming))
        return !0;
      var g = Mt(p);
      if (m && g.overflowY.match(/(scroll|auto)/)) {
        var S = p.scrollHeight - p.clientHeight;
        if (S > 0 && (p.scrollTop > 0 && m < 0 || p.scrollTop < S && m > 0))
          return !0;
      }
      if (_ && g.overflowX.match(/(scroll|auto)/)) {
        var O = p.scrollWidth - p.clientWidth;
        if (O > 0 && (p.scrollLeft > 0 && _ < 0 || p.scrollLeft < O && _ > 0))
          return !0;
      }
      p = p.parentNode;
    }
    return !1;
  }
  function d(h) {
    if (c(h)) {
      var _ = s(h), m = { pageX: _.pageX, pageY: _.pageY }, p = m.pageX - o.pageX, g = m.pageY - o.pageY;
      if (f(h.target, p, g))
        return;
      r(p, g), o = m;
      var S = (/* @__PURE__ */ new Date()).getTime(), O = S - a;
      O > 0 && (i.x = p / O, i.y = g / O, a = S), n(p, g) && h.preventDefault();
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
  or.supportsTouch ? (e.event.bind(t, "touchstart", u), e.event.bind(t, "touchmove", d), e.event.bind(t, "touchend", v)) : or.supportsIePointer && (window.PointerEvent ? (e.event.bind(t, "pointerdown", u), e.event.bind(t, "pointermove", d), e.event.bind(t, "pointerup", v)) : window.MSPointerEvent && (e.event.bind(t, "MSPointerDown", u), e.event.bind(t, "MSPointerMove", d), e.event.bind(t, "MSPointerUp", v)));
}
var JE = function() {
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
}, ZE = {
  "click-rail": qE,
  "drag-thumb": GE,
  keyboard: zE,
  wheel: XE,
  touch: KE
}, bo = function(t, n) {
  var r = this;
  if (n === void 0 && (n = {}), typeof t == "string" && (t = document.querySelector(t)), !t || !t.nodeName)
    throw new Error("no element is specified to initialize PerfectScrollbar");
  this.element = t, t.classList.add(Ye.main), this.settings = JE();
  for (var o in n)
    this.settings[o] = n[o];
  this.containerWidth = null, this.containerHeight = null, this.contentWidth = null, this.contentHeight = null;
  var a = function() {
    return t.classList.add(Ye.state.focus);
  }, i = function() {
    return t.classList.remove(Ye.state.focus);
  };
  this.isRtl = Mt(t).direction === "rtl", this.isRtl === !0 && t.classList.add(Ye.rtl), this.isNegativeScroll = function() {
    var c = t.scrollLeft, u = null;
    return t.scrollLeft = -1, u = t.scrollLeft < 0, t.scrollLeft = c, u;
  }(), this.negativeScrollAdjustment = this.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, this.event = new Or(), this.ownerDocument = t.ownerDocument || document, this.scrollbarXRail = Uo(Ye.element.rail("x")), t.appendChild(this.scrollbarXRail), this.scrollbarX = Uo(Ye.element.thumb("x")), this.scrollbarXRail.appendChild(this.scrollbarX), this.scrollbarX.setAttribute("tabindex", 0), this.event.bind(this.scrollbarX, "focus", a), this.event.bind(this.scrollbarX, "blur", i), this.scrollbarXActive = null, this.scrollbarXWidth = null, this.scrollbarXLeft = null;
  var l = Mt(this.scrollbarXRail);
  this.scrollbarXBottom = parseInt(l.bottom, 10), isNaN(this.scrollbarXBottom) ? (this.isScrollbarXUsingBottom = !1, this.scrollbarXTop = Me(l.top)) : this.isScrollbarXUsingBottom = !0, this.railBorderXWidth = Me(l.borderLeftWidth) + Me(l.borderRightWidth), ft(this.scrollbarXRail, { display: "block" }), this.railXMarginWidth = Me(l.marginLeft) + Me(l.marginRight), ft(this.scrollbarXRail, { display: "" }), this.railXWidth = null, this.railXRatio = null, this.scrollbarYRail = Uo(Ye.element.rail("y")), t.appendChild(this.scrollbarYRail), this.scrollbarY = Uo(Ye.element.thumb("y")), this.scrollbarYRail.appendChild(this.scrollbarY), this.scrollbarY.setAttribute("tabindex", 0), this.event.bind(this.scrollbarY, "focus", a), this.event.bind(this.scrollbarY, "blur", i), this.scrollbarYActive = null, this.scrollbarYHeight = null, this.scrollbarYTop = null;
  var s = Mt(this.scrollbarYRail);
  this.scrollbarYRight = parseInt(s.right, 10), isNaN(this.scrollbarYRight) ? (this.isScrollbarYUsingRight = !1, this.scrollbarYLeft = Me(s.left)) : this.isScrollbarYUsingRight = !0, this.scrollbarYOuterWidth = this.isRtl ? jE(this.scrollbarY) : null, this.railBorderYWidth = Me(s.borderTopWidth) + Me(s.borderBottomWidth), ft(this.scrollbarYRail, { display: "block" }), this.railYMarginHeight = Me(s.marginTop) + Me(s.marginBottom), ft(this.scrollbarYRail, { display: "" }), this.railYHeight = null, this.railYRatio = null, this.reach = {
    x: t.scrollLeft <= 0 ? "start" : t.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null,
    y: t.scrollTop <= 0 ? "start" : t.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null
  }, this.isAlive = !0, this.settings.handlers.forEach(function(c) {
    return ZE[c](r);
  }), this.lastScrollTop = Math.floor(t.scrollTop), this.lastScrollLeft = t.scrollLeft, this.event.bind(this.element, "scroll", function(c) {
    return r.onScroll(c);
  }), rn(this);
};
bo.prototype.update = function() {
  this.isAlive && (this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0, ft(this.scrollbarXRail, { display: "block" }), ft(this.scrollbarYRail, { display: "block" }), this.railXMarginWidth = Me(Mt(this.scrollbarXRail).marginLeft) + Me(Mt(this.scrollbarXRail).marginRight), this.railYMarginHeight = Me(Mt(this.scrollbarYRail).marginTop) + Me(Mt(this.scrollbarYRail).marginBottom), ft(this.scrollbarXRail, { display: "none" }), ft(this.scrollbarYRail, { display: "none" }), rn(this), ua(this, "top", 0, !1, !0), ua(this, "left", 0, !1, !0), ft(this.scrollbarXRail, { display: "" }), ft(this.scrollbarYRail, { display: "" }));
};
bo.prototype.onScroll = function(t) {
  this.isAlive && (rn(this), ua(this, "top", this.element.scrollTop - this.lastScrollTop), ua(
    this,
    "left",
    this.element.scrollLeft - this.lastScrollLeft
  ), this.lastScrollTop = Math.floor(this.element.scrollTop), this.lastScrollLeft = this.element.scrollLeft);
};
bo.prototype.destroy = function() {
  this.isAlive && (this.event.unbindAll(), cr(this.scrollbarX), cr(this.scrollbarY), cr(this.scrollbarXRail), cr(this.scrollbarYRail), this.removePsClasses(), this.element = null, this.scrollbarX = null, this.scrollbarY = null, this.scrollbarXRail = null, this.scrollbarYRail = null, this.isAlive = !1);
};
bo.prototype.removePsClasses = function() {
  this.element.className = this.element.className.split(" ").filter(function(t) {
    return !t.match(/^ps([-_].+|)$/);
  }).join(" ");
};
const QE = {}, ew = {
  fill: "none",
  height: "16",
  viewBox: "0 0 16 16",
  width: "16",
  xmlns: "http://www.w3.org/2000/svg"
}, tw = /* @__PURE__ */ W("path", {
  "clip-rule": "evenodd",
  d: "M10.25 6C10.25 7.24264 9.24264 8.25 8 8.25C6.75736 8.25 5.75 7.24264 5.75 6C5.75 4.75736 6.75736 3.75 8 3.75C9.24264 3.75 10.25 4.75736 10.25 6ZM11 6C11 7.65685 9.65685 9 8 9C6.34315 9 5 7.65685 5 6C5 4.34315 6.34315 3 8 3C9.65685 3 11 4.34315 11 6ZM6.5 10.125C4.91218 10.125 3.625 11.4122 3.625 13C3.625 13.2071 3.79289 13.375 4 13.375C4.20711 13.375 4.375 13.2071 4.375 13C4.375 11.8264 5.3264 10.875 6.5 10.875H9.5C10.6736 10.875 11.625 11.8264 11.625 13C11.625 13.2071 11.7929 13.375 12 13.375C12.2071 13.375 12.375 13.2071 12.375 13C12.375 11.4122 11.0878 10.125 9.5 10.125H6.5Z",
  fill: "currentColor",
  "fill-rule": "evenodd"
}, null, -1), nw = [
  tw
];
function rw(e, t) {
  return B(), X("svg", ew, nw);
}
const ow = /* @__PURE__ */ _e(QE, [["render", rw]]), aw = ["disabled"], iw = { class: "th-time-option__time" }, sw = {
  key: 0,
  class: "th-time-option__date"
}, lw = {
  key: 0,
  class: "th-time-option__capacity"
}, cw = {
  key: 1,
  class: "th-time-option__price"
}, uw = /* @__PURE__ */ me({
  __name: "TimeslotComponent",
  props: {
    displayCapacity: { type: Boolean },
    isActive: { type: Boolean },
    isCombo: { type: Boolean },
    isNight: { type: Boolean, default: !1 },
    timeslot: {}
  },
  setup(e) {
    const t = e, n = se(() => he(t.timeslot.dateTime).format("DD/MM/YYYY"));
    return (r, o) => (B(), X("button", {
      class: Ee([{
        "th-time-option_active": t.isActive,
        "th-time-option_combo": t.isCombo,
        "th-time-option_disabled": !r.timeslot.isAvailable,
        "th-time-option_open": r.timeslot.isOpen
      }, "th-time-option"]),
      disabled: !r.timeslot.isAvailable
    }, [
      W("span", iw, [
        Je(ie(r.timeslot.humanizedTime) + " ", 1),
        t.isNight ? (B(), X("span", sw, " (" + ie(n.value) + ") ", 1)) : ae("", !0)
      ]),
      t.displayCapacity ? (B(), X("span", lw, [
        q(ow),
        Je(" " + ie(r.timeslot.capacity), 1)
      ])) : ae("", !0),
      r.timeslot.isDynamic && r.timeslot.price ? (B(), X("span", cw, [
        q(st, {
          amount: r.timeslot.price
        }, null, 8, ["amount"])
      ])) : ae("", !0)
    ], 10, aw));
  }
}), Tc = /* @__PURE__ */ _e(uw, [["__scopeId", "data-v-a44c6f0e"]]), dw = { class: "th-timeslots__divider" }, fw = /* @__PURE__ */ me({
  __name: "TimeslotPicker",
  props: {
    item: {},
    product: {}
  },
  emits: ["selectTimeslot"],
  setup(e, { emit: t }) {
    const { t: n } = Pe(), r = e, o = t, a = ne(null), i = (l) => {
      r.item.selectTimeslot(l), r.product.selectDate(he(l.dateTime).toDate()), o("selectTimeslot");
    };
    return rt(() => {
      new bo(a.value, {
        suppressScrollX: !0
      });
    }), (l, s) => (B(), X("div", {
      ref_key: "scrollbar",
      ref: a,
      class: "th-timeslots"
    }, [
      (B(!0), X(Ie, null, ot(r.item.dayTimeslots(r.product.selectedDate), (c) => (B(), ue(Tc, {
        key: c.id,
        "display-capacity": r.item.displayCapacity,
        "is-active": !!(r.item.selectedTimeslot && c.id === r.item.selectedTimeslot.id),
        "is-combo": r.product.isCombo,
        timeslot: c,
        onClick: Ue((u) => i(c), ["prevent"])
      }, null, 8, ["display-capacity", "is-active", "is-combo", "timeslot", "onClick"]))), 128)),
      r.item.nightTimeslots(r.product.selectedDate).length ? (B(), X(Ie, { key: 0 }, [
        W("span", dw, ie(K(n)("calendar.afterMidnightsSlots")), 1),
        (B(!0), X(Ie, null, ot(r.item.nightTimeslots(
          r.product.selectedDate
        ), (c) => (B(), ue(Tc, {
          key: c.id,
          "display-capacity": r.item.displayCapacity,
          "is-active": !!(r.item.selectedTimeslot && c.id === r.item.selectedTimeslot.id),
          "is-combo": r.product.isCombo,
          "is-night": !0,
          timeslot: c,
          onClick: Ue((u) => i(c), ["prevent"])
        }, null, 8, ["display-capacity", "is-active", "is-combo", "timeslot", "onClick"]))), 128))
      ], 64)) : ae("", !0)
    ], 512));
  }
}), Ui = /* @__PURE__ */ _e(fw, [["__scopeId", "data-v-e2a7982b"]]);
var da;
((e) => {
  e.mobile = 500, e.isMobile = () => window ? window.innerWidth <= e.mobile : !1, e.isDesktop = () => !(0, e.isMobile)();
})(da || (da = {}));
const pw = { class: "single-select" }, hw = { class: "single-select__content" }, mw = { class: "single-select__tabs" }, vw = { class: "th-option-select__placeholder" }, gw = { class: "th-option-select__placeholder-title" }, _w = { class: "th-option-select__placeholder" }, yw = { class: "th-option-select__placeholder-title" }, bw = { class: "single-select__tabs-content" }, Ew = {
  key: 0,
  class: "single-select__tabs-content"
}, ww = {
  key: 1,
  class: "single-select__tabs-content"
}, Tw = /* @__PURE__ */ me({
  __name: "SingleCalendarComponent",
  props: {
    product: {},
    isUpsell: { type: Boolean, default: !1 },
    tabsContent: {}
  },
  setup(e, { expose: t }) {
    const n = ne(null), r = e, o = ne(0), a = (l) => {
      var s;
      o.value = l, (s = n.value) == null || s.showOption(!0);
    }, i = () => {
      var l;
      (l = n.value) == null || l.showOption(!1);
    };
    return t({ openTab: a }), (l, s) => (B(), X("div", pw, [
      q($t, {
        ref_key: "select",
        ref: n,
        "icon-is-shown": !1,
        "selected-option-title": r.tabsContent[0].selectedOptionTitle,
        "show-header": !1,
        title: r.tabsContent[0].title,
        "title-is-black": r.tabsContent[0].isBlack,
        onClick: s[4] || (s[4] = Ue((c) => a(0), ["prevent"]))
      }, {
        default: we(() => [
          W("div", hw, [
            W("div", mw, [
              W("div", {
                class: Ee([{ "single-select__tab_active": o.value === 0 }, "single-select__tab"]),
                onClick: s[0] || (s[0] = Ue((c) => a(0), ["stop"]))
              }, [
                W("div", vw, [
                  W("div", gw, ie(r.tabsContent[0].title), 1),
                  W("div", {
                    class: Ee([{
                      "th-option-select__placeholder-value_black": r.tabsContent[0].isBlack
                    }, "th-option-select__placeholder-value"])
                  }, ie(r.tabsContent[0].selectedOptionTitle), 3)
                ])
              ], 2),
              W("div", {
                class: Ee([{ "single-select__tab_active": o.value === 1 }, "single-select__tab"]),
                onClick: s[1] || (s[1] = Ue((c) => a(1), ["stop"]))
              }, [
                W("div", _w, [
                  W("div", yw, ie(r.tabsContent[1].title), 1),
                  W("div", {
                    class: Ee([{
                      "th-option-select__placeholder-value_black": r.tabsContent[1].isBlack
                    }, "th-option-select__placeholder-value"])
                  }, ie(r.tabsContent[1].selectedOptionTitle), 3)
                ])
              ], 2)
            ]),
            W("div", bw, [
              o.value === 0 ? (B(), X("div", Ew, [
                q(zo, {
                  "is-upsell": r.isUpsell,
                  product: r.product,
                  onDateSelect: s[2] || (s[2] = (c) => a(1))
                }, null, 8, ["is-upsell", "product"])
              ])) : ae("", !0),
              o.value === 1 ? (B(), X("div", ww, [
                q(Ui, {
                  item: r.product.showedItems[0],
                  product: r.product,
                  onClick: s[3] || (s[3] = Ue(() => {
                  }, ["stop"])),
                  onSelectTimeslot: i
                }, null, 8, ["item", "product"])
              ])) : ae("", !0)
            ])
          ])
        ]),
        _: 1
      }, 8, ["selected-option-title", "title", "title-is-black"]),
      q($t, {
        "icon-is-shown": !1,
        "is-enabled": !1,
        "selected-option-title": r.tabsContent[1].selectedOptionTitle,
        "show-header": !1,
        title: r.tabsContent[1].title,
        "title-is-black": r.tabsContent[1].isBlack,
        onClickCapture: s[5] || (s[5] = Ue((c) => a(1), ["prevent", "stop"]))
      }, null, 8, ["selected-option-title", "title", "title-is-black"])
    ]));
  }
}), Cw = /* @__PURE__ */ _e(Tw, [["__scopeId", "data-v-4f801f64"]]), kw = {
  key: 0,
  class: "th-calendar-wrapper"
}, Sw = {
  key: 0,
  class: "th-calendar"
}, Iw = { class: "th-timeslot-container" }, Dw = {
  key: 0,
  class: "th-timeslot-title"
}, Ow = {
  key: 2,
  class: "th-calendar-wrapper th-calendar-wrapper_column"
}, Pw = { class: "th-timeslot-container th-timeslot-container_combo" }, Aw = /* @__PURE__ */ me({
  __name: "CalendarComponent",
  props: {
    product: {},
    isActive: { type: Boolean, default: !0 },
    isUpsell: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const { t: n } = Pe(), { isMobile: r } = da, o = e, a = ne([]), i = ne(null), l = se(() => {
      var h;
      return (h = o.product) != null && h.selectedDate ? he(o.product.selectedDate).format("DD/MM/YYYY") : n("calendar.selectDate");
    }), s = () => {
      a.value[0].showOption(!1);
    }, c = () => {
      d.value || f();
    }, u = () => {
      d.value && (s(), f());
    }, f = () => {
      var _, m;
      if (i.value) {
        (_ = o.product) != null && _.selectedDate ? i.value.openTab(1) : i.value.openTab(0);
        return;
      }
      let h = (m = o.product) == null ? void 0 : m.showedItems.findIndex((p) => !p.selectedTimeslot);
      h === -1 && (h = 0), h++, a.value[h].showOption(!0);
    }, d = se(() => r() || o.isUpsell), v = se(() => {
      var h, _, m, p;
      return [
        {
          title: n("calendar.date"),
          selectedOptionTitle: l.value,
          isBlack: !!((h = o.product) != null && h.selectedDate)
        },
        {
          title: n("calendar.selectTime"),
          selectedOptionTitle: (_ = o.product) != null && _.items[0].selectedTimeslot ? (m = o.product) == null ? void 0 : m.items[0].selectedTimeslot.humanizedTime : n("calendar.selectTime"),
          isBlack: !!((p = o.product) != null && p.items[0].selectedTimeslot)
        }
      ];
    });
    return t({ openTimeslotPicker: f }), (h, _) => {
      var m;
      return o.product ? o.product.isSingle ? (B(), X("div", {
        key: 1,
        class: Ee([{ "th-calendar-wrapper_upsell": o.isUpsell }, "th-calendar-wrapper th-calendar-wrapper_single"])
      }, [
        d.value ? (B(), ue(Cw, {
          key: 0,
          ref_key: "singleComponent",
          ref: i,
          "is-upsell": o.isUpsell,
          product: o.product,
          "tabs-content": v.value
        }, null, 8, ["is-upsell", "product", "tabs-content"])) : (B(), X(Ie, { key: 1 }, [
          q($t, {
            ref: (p) => a.value.push(p),
            "icon-is-shown": !1,
            "is-active": o.isActive,
            "is-calendar": !0,
            "is-enabled": d.value,
            "selected-option-title": l.value,
            title: K(n)("calendar.date"),
            "title-is-black": !!o.product.selectedDate,
            onClick: Ue(c, ["prevent"])
          }, {
            default: we(() => [
              q(zo, {
                "is-enabled": d.value,
                "is-upsell": o.isUpsell,
                product: o.product,
                onDateSelect: u
              }, null, 8, ["is-enabled", "is-upsell", "product"])
            ]),
            _: 1
          }, 8, ["is-active", "is-enabled", "selected-option-title", "title", "title-is-black"]),
          (B(!0), X(Ie, null, ot(o.product.items, (p) => (B(), ue($t, {
            key: p.id,
            ref_for: !0,
            ref: (g) => a.value.push(g),
            "extended-header-title": K(n)("calendar.selectTime"),
            "icon-is-shown": !1,
            "is-active": o.isActive,
            "is-calendar": !0,
            "selected-option-title": p.selectedTimeslot ? p.selectedTimeslot.humanizedTime : K(n)("calendar.selectTime"),
            title: K(n)("calendar.time"),
            "title-is-black": !!p.selectedTimeslot
          }, {
            default: we(() => {
              var g;
              return [
                o.isActive ? (B(), X("div", Sw, [
                  d.value ? ae("", !0) : (B(), ue(zo, {
                    key: 0,
                    "is-upsell": o.isUpsell,
                    product: o.product
                  }, null, 8, ["is-upsell", "product"])),
                  W("div", Iw, [
                    d.value ? ae("", !0) : (B(), X("div", Dw, ie(K(n)("calendar.selectTimeslot")), 1)),
                    q(Ui, {
                      item: (g = o.product) == null ? void 0 : g.showedItems[0],
                      product: o.product,
                      onSelectTimeslot: _[0] || (_[0] = () => a.value[1].showOption(!1))
                    }, null, 8, ["item", "product"])
                  ])
                ])) : ae("", !0)
              ];
            }),
            _: 2
          }, 1032, ["extended-header-title", "is-active", "selected-option-title", "title", "title-is-black"]))), 128))
        ], 64))
      ], 2)) : (B(), X("div", Ow, [
        q($t, {
          ref: (p) => {
            p && (a.value[0] = p);
          },
          "extended-header-title": K(n)("calendar.selectDate"),
          "icon-is-shown": !1,
          "is-active": o.isActive,
          "is-calendar": !0,
          "selected-option-title": l.value,
          title: K(n)("calendar.date"),
          "title-is-black": o.isActive
        }, {
          default: we(() => [
            o.isActive ? (B(), ue(zo, {
              key: 0,
              "is-upsell": o.isUpsell,
              product: o.product,
              onHideSelect: s
            }, null, 8, ["is-upsell", "product"])) : ae("", !0)
          ]),
          _: 1
        }, 8, ["extended-header-title", "is-active", "selected-option-title", "title", "title-is-black"]),
        (B(!0), X(Ie, null, ot((m = o.product) == null ? void 0 : m.showedItems, (p, g) => (B(), ue($t, {
          key: p.id,
          ref_for: !0,
          ref: (S) => {
            S && (a.value[g + 1] = S);
          },
          "icon-is-shown": !1,
          "is-active": o.isActive,
          "selected-option-title": p.selectedTimeslot ? p.selectedTimeslot.humanizedTime : K(n)("calendar.pickATimeslot"),
          title: p.name,
          "title-is-black": !!p.selectedTimeslot
        }, {
          default: we(() => [
            W("div", Pw, [
              q(Ui, {
                item: p,
                product: o.product,
                onSelectTimeslot: () => a.value[g + 1].showOption(!1)
              }, null, 8, ["item", "product", "onSelectTimeslot"])
            ])
          ]),
          _: 2
        }, 1032, ["is-active", "selected-option-title", "title", "title-is-black"]))), 128))
      ])) : (B(), X("div", kw, [
        q($t, {
          ref: (p) => a.value.push(p),
          "icon-is-shown": !1,
          "is-active": o.isActive,
          "is-calendar": !0,
          "is-enabled": d.value,
          "selected-option-title": l.value,
          title: K(n)("calendar.date"),
          onClick: Ue(c, ["prevent"])
        }, null, 8, ["is-active", "is-enabled", "selected-option-title", "title"])
      ]));
    };
  }
}), Cc = /* @__PURE__ */ _e(Aw, [["__scopeId", "data-v-3913c7fa"]]), rp = (e) => (uo("data-v-69430df4"), e = e(), fo(), e), Nw = { class: "th-option" }, Lw = { class: "th-option__info" }, Rw = { class: "th-option__title" }, $w = { class: "th-option__info" }, Mw = { class: "th-option__counter" }, xw = ["disabled"], Bw = /* @__PURE__ */ rp(() => /* @__PURE__ */ W("svg", {
  fill: "none",
  height: "2",
  viewBox: "0 0 14 2",
  width: "16",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ W("path", {
    "clip-rule": "evenodd",
    d: `M0 0.899805C0 0.568434 0.268629 0.299805 0.6 0.299805L13.4 0.299805C13.7314 0.299805
          14 0.568434 14 0.899805C14 1.23118 13.7314 1.4998 13.4 1.4998L0.6 1.4998C0.268629
          1.4998 0 1.23118 0 0.899805Z`,
    fill: "currentColor",
    "fill-rule": "evenodd"
  })
], -1)), Vw = [
  Bw
], Uw = ["disabled"], Fw = /* @__PURE__ */ rp(() => /* @__PURE__ */ W("svg", {
  fill: "none",
  height: "16",
  viewBox: "0 0 10 10",
  width: "16",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ W("path", {
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
], -1)), Hw = [
  Fw
], Yw = /* @__PURE__ */ me({
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
    const n = ne(0), r = ne(0), o = e, a = t, i = se(() => o.value <= o.minValue), l = se(() => o.value >= o.maxValue), s = (u = !1) => {
      a("update:value", u ? o.value + 1 : o.value - 1), r.value = window.setTimeout(() => {
        n.value = window.setInterval(() => {
          u && !l.value || !u && !i.value ? a("update:value", u ? o.value + 1 : o.value - 1) : c();
        }, 100);
      }, 500);
    }, c = () => {
      clearTimeout(r.value), clearInterval(n.value);
    };
    return (u, f) => (B(), X("div", Nw, [
      W("div", Lw, [
        W("div", Rw, ie(u.title), 1),
        u.description ? (B(), X("div", {
          key: 0,
          class: Ee([{ "th-option__description_grey": u.isGrey }, "th-option__description"])
        }, ie(u.description), 3)) : ae("", !0)
      ]),
      W("div", $w, ie(u.info), 1),
      W("div", Mw, [
        W("button", {
          disabled: i.value,
          class: "th-option__counter-btn",
          type: "button",
          onClick: f[0] || (f[0] = Ue(() => {
          }, ["prevent"])),
          onMousedown: f[1] || (f[1] = Ue((d) => s(!1), ["prevent"])),
          onMouseup: Ue(c, ["prevent"]),
          onMouseleave: Ue(c, ["prevent"])
        }, Vw, 40, xw),
        W("div", {
          class: Ee([{ "th-option__counter-value_disabled": u.value === 0 }, "th-option__counter-value"])
        }, ie(u.value), 3),
        W("button", {
          disabled: l.value,
          class: "th-option__counter-btn",
          type: "button",
          onClick: f[2] || (f[2] = Ue(() => {
          }, ["prevent"])),
          onMousedown: f[3] || (f[3] = Ue((d) => s(!0), ["prevent"])),
          onMouseup: Ue(c, ["prevent"]),
          onMouseleave: Ue(c, ["prevent"])
        }, Hw, 40, Uw)
      ])
    ]));
  }
}), op = /* @__PURE__ */ _e(Yw, [["__scopeId", "data-v-69430df4"]]), jw = {
  key: 0,
  class: "visitors-options"
}, Ww = /* @__PURE__ */ me({
  __name: "VisitorsSelector",
  props: {
    product: {},
    disabled: { type: Boolean, default: !0 },
    isActive: { type: Boolean, default: !0 }
  },
  setup(e, { expose: t }) {
    const n = fs(), { t: r } = Pe(), o = ne(null), a = e, i = (f) => {
      var d, v;
      return ((v = (d = a.product) == null ? void 0 : d.availableCategories.find(
        (h) => h.itemCategoryId === f.itemCategoryId
      )) == null ? void 0 : v.quantity) ?? 0;
    }, l = (f) => {
      var d;
      return ((d = a.product) == null ? void 0 : d.categoryAvailableCapacity(f)) ?? 0;
    };
    a.isActive && qe(
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
    const s = se(() => {
      var f;
      return a.product ? (f = a.product) == null ? void 0 : f.selectedVisitorsTitle : r("options.whoIsGoing");
    }), c = (f) => se(() => n(a.product.getCategoryPrice(f)));
    return t({ open: () => se(() => {
      var f;
      return (f = o.value) == null ? void 0 : f.showOption();
    }).value }), (f, d) => (B(), ue($t, {
      ref_key: "selectElement",
      ref: o,
      "is-active": !f.disabled,
      "selected-option-title": s.value,
      title: K(r)("options.guests"),
      "title-is-black": a.isActive && !!a.product.selectedVisitorsCount
    }, {
      default: we(() => [
        a.isActive ? (B(), X("div", jw, [
          (B(!0), X(Ie, null, ot(a.product.availableCategories, (v) => (B(), X(Ie, {
            key: v.itemCategoryId
          }, [
            a.product.isCategoryAvailableForBooking(v) ? (B(), ue(op, {
              key: 0,
              info: c(v.itemCategoryId).value,
              "max-value": l(v),
              title: K(r)(`options.${v.itemCategoryName}`.toLowerCase()),
              value: i(v),
              "onUpdate:value": (h) => v.quantity = h
            }, null, 8, ["info", "max-value", "title", "value", "onUpdate:value"])) : ae("", !0)
          ], 64))), 128))
        ])) : ae("", !0)
      ]),
      _: 1
    }, 8, ["is-active", "selected-option-title", "title", "title-is-black"]));
  }
}), kc = /* @__PURE__ */ _e(Ww, [["__scopeId", "data-v-eda92be1"]]), qw = { class: "meals-options" }, Gw = {
  key: 0,
  class: "meals-options__text"
}, zw = /* @__PURE__ */ me({
  __name: "MealsSelector",
  props: {
    product: {},
    disabled: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const { t: n } = Pe(), r = e, o = ne(null), a = se(() => {
      const l = r.product.selectedVisitorsCount - r.product.selectedMealsCount;
      return n("options.mealsLeftWarning", l);
    });
    return qe(
      () => r.product.isMealsCountEqualsVisitorsCount,
      (l) => {
        var s;
        l && ((s = o.value) == null || s.showOption(!1));
      }
    ), t({ open: () => se(() => {
      var l;
      return (l = o.value) == null ? void 0 : l.showOption();
    }).value }), (l, s) => (B(), ue($t, {
      ref_key: "selectElement",
      ref: o,
      "is-active": !l.disabled,
      "selected-option-title": r.product.selectedOptionsTitle,
      "title-is-black": r.product.selectedMealsCount > 0,
      title: "Extras"
    }, {
      default: we(() => [
        W("div", qw, [
          (B(!0), X(Ie, null, ot(r.product.options, (c) => (B(), ue(op, {
            key: c.id,
            "max-value": r.product.mealMaxValue(c),
            title: c.description,
            value: c.quantity,
            "onUpdate:value": (u) => c.quantity = u
          }, null, 8, ["max-value", "title", "value", "onUpdate:value"]))), 128))
        ]),
        r.product.isMealsCountEqualsVisitorsCount ? ae("", !0) : (B(), X("div", Gw, ie(a.value), 1))
      ]),
      _: 1
    }, 8, ["is-active", "selected-option-title", "title-is-black"]));
  }
}), Xw = /* @__PURE__ */ _e(zw, [["__scopeId", "data-v-018b279a"]]);
var Tr;
((e) => {
  e.getQueryParamFromString = (t, n) => {
    t = t.substring(1);
    const r = t.split("&");
    for (let o = 0; o < r.length; o++) {
      const a = r[o].split("=");
      if (decodeURIComponent(a[0]) === n)
        return decodeURIComponent(a[1]);
    }
  }, e.replaceLangSwitcher = () => {
    var o, a;
    const { availableLocales: t } = Pe(), n = document.querySelector(".lang-modal__list"), r = mo().currentRoute.value.path;
    if (n) {
      const i = n.querySelectorAll("a");
      if (i)
        for (const l in i) {
          const s = i[l];
          if (s && s instanceof HTMLElement) {
            let c = s.getAttribute("href");
            if (typeof ((o = window.ticketHub) == null ? void 0 : o.language) < "u" && c) {
              c = new URL(c).pathname;
              let u = c == null ? void 0 : c.split("/")[1];
              u = u && t.includes(u) ? `/${u}` : "";
              let f = r.split(
                (a = window.ticketHub) == null ? void 0 : a.language
              )[1];
              f = typeof f < "u" ? f : r;
              const d = new URL(
                `${u}${f}`,
                window.location.origin
              );
              s.setAttribute("href", d.href);
            }
          }
        }
    }
  };
})(Tr || (Tr = {}));
const Kw = {}, Ma = (e) => (uo("data-v-188a412b"), e = e(), fo(), e), Jw = { class: "th-skeleton__wrapper" }, Zw = /* @__PURE__ */ Ma(() => /* @__PURE__ */ W("p", { class: "th-skeleton__select th-skeleton" }, null, -1)), Qw = /* @__PURE__ */ Ma(() => /* @__PURE__ */ W("p", { class: "th-skeleton__select th-skeleton" }, null, -1)), eT = /* @__PURE__ */ Ma(() => /* @__PURE__ */ W("p", { class: "th-skeleton__prices th-skeleton" }, null, -1)), tT = /* @__PURE__ */ Ma(() => /* @__PURE__ */ W("p", { class: "th-skeleton__button th-skeleton" }, null, -1)), nT = [
  Zw,
  Qw,
  eT,
  tT
];
function rT(e, t) {
  return B(), X("div", Jw, nT);
}
const oT = /* @__PURE__ */ _e(Kw, [["render", rT], ["__scopeId", "data-v-188a412b"]]), aT = {
  key: 1,
  class: "th-product__wrapper"
}, iT = { class: "th-product__options" }, sT = { class: "th-product__footer" }, lT = {
  key: 0,
  class: "th-product__footer-row"
}, cT = { class: "th-product__footer-title th-up-lg:hidden" }, uT = { class: "th-product__prices" }, dT = {
  key: 0,
  class: "th-product__prices-title"
}, fT = {
  key: 1,
  class: "th-product__price th-product__price_old th-down-lg:hidden"
}, pT = { class: "th-product__price th-product__price_current" }, hT = { class: "th-product__actions" }, mT = { class: "th-product__options" }, vT = { class: "th-product__footer" }, gT = { class: "th-product__footer-row" }, _T = { class: "th-product__footer-title th-up-lg:hidden" }, yT = {
  key: 0,
  class: "th-product__prices"
}, bT = {
  key: 0,
  class: "th-product__prices-title"
}, ET = {
  key: 1,
  class: "th-product__price th-product__price_old th-down-lg:hidden"
}, wT = { class: "th-product__price th-product__price_current" }, TT = { class: "th-product__actions" }, CT = ["innerHTML"], kT = /* @__PURE__ */ me({
  __name: "BookingComponent",
  props: {
    product: {},
    hideBookNowButton: { type: Boolean, default: !1 },
    hidePrices: { type: Boolean, default: !1 },
    upsell: { type: Boolean, default: !1 }
  },
  emits: ["loaded", "booked", "priceIsChanged"],
  setup(e, { emit: t }) {
    const { localizedTitle: n } = Jr, r = ne(null), o = ne(null), a = ne(null), i = ne(!1), l = ka(), s = mo(), c = ne(null), { showToast: u, showErrorToast: f } = vo(), d = ne(!0), v = e, h = t, { t: _, locale: m } = Pe(), p = async (b = /* @__PURE__ */ new Date()) => {
      try {
        if (!c.value)
          return;
        d.value = !0;
        const w = await yr.getProductBookingData(
          c.value,
          he(b).format("YYYY-MM-DD")
        );
        await c.value.setBookingData(w);
      } catch {
      } finally {
        h("loaded"), d.value = !1;
      }
    };
    qe(
      () => c.value && c.value.price,
      (b) => {
        c.value && v.hidePrices && h("priceIsChanged", {
          old: c.value.calculatedOldPrice,
          current: c.value.price,
          isHasDynamicPrices: c.value.hasDynamicPrices
        });
      }
    ), rt(async () => {
      setTimeout(async () => {
        var w;
        const b = Tr.getQueryParamFromString(
          window.location.search,
          "cartItemId"
        );
        if (c.value = await br.getProduct(v.product), c.value && c.value.isSellable) {
          typeof b < "u" && ((w = c.value) == null || w.loadCartItem(b));
          let T = c.value.selectedDate;
          c.value.isEdit && (T = he(c.value.selectedDate).startOf("month").toDate()), await p(T), await _r.viewItem(c.value);
          return;
        }
        h("loaded"), d.value = !1;
      }, 0);
    });
    const g = se(() => {
      var b, w;
      return (b = c.value) != null && b.isOpen ? !0 : (w = c.value) == null ? void 0 : w.isTimeslotsAreSelected;
    }), S = se(() => {
      var b, w;
      return ((b = c.value) == null ? void 0 : b.isTimeslotsAreSelected) && ((w = c.value) == null ? void 0 : w.isVisitorsAreSelected);
    }), O = async (b) => {
      var w, T, k, y, I;
      if (((T = (w = c.value) == null ? void 0 : w.selectedVariant) == null ? void 0 : T.itemId) !== b) {
        d.value = !0, c.value = await br.getProduct({
          ...v.product,
          itemId: b
        });
        const A = Tr.getQueryParamFromString(
          window.location.search,
          "cartItemId"
        );
        typeof A < "u" && ((k = c.value) == null || k.loadCartItem(A)), (y = c.value) == null || y.selectVariant(b), await p(), (I = c.value) == null || I.selectVariant(b);
      }
    }, L = async (b = !1) => {
      var w, T, k, y, I;
      try {
        if (!((w = c.value) != null && w.isTimeslotsAreSelected) && r.value)
          return r.value.openTimeslotPicker(), !1;
        if (!((T = c.value) != null && T.isVisitorsAreSelected) && o.value)
          return o.value.open(), !1;
        if (!((k = c.value) != null && k.isMealsCountEqualsVisitorsCount) && a.value)
          return a.value.open(), !1;
        const A = (y = c.value) != null && y.isEdit ? "toast.productHasBeenUpdated" : "toast.productHasBeenAdded";
        if (i.value = !0, await ((I = c.value) == null ? void 0 : I.addToCart()), u(_(A)), setTimeout(() => {
          h("booked");
        }, 0), setTimeout(() => {
          window.dispatchEvent(new CustomEvent("th:afterCartItemIsAdded"));
        }, 0), b) {
          await s.push({ name: "checkout" });
          return;
        }
        if (v.upsell)
          return;
        setTimeout(() => {
          l.show();
        }, 0);
      } catch (A) {
        f(A.message);
      } finally {
        i.value = !1;
      }
    };
    return (b, w) => {
      var T, k;
      return d.value ? (B(), ue(oT, {
        key: 0,
        class: "th-product__options"
      })) : (B(), X("div", aT, [
        c.value !== null && !c.value.isDisabled ? (B(), X(Ie, { key: 0 }, [
          W("div", iT, [
            !c.value.isDisabled && c.value.isHasVariants && c.value.selectedVariant ? (B(), ue(ic, {
              key: 0,
              "selected-variant": c.value.selectedVariant,
              variants: c.value.variants,
              onSelectVariant: O
            }, null, 8, ["selected-variant", "variants"])) : ae("", !0),
            c.value && !c.value.isOpen ? (B(), ue(Cc, {
              key: 1,
              ref_key: "calendarElement",
              ref: r,
              "is-upsell": v.upsell,
              product: c.value
            }, null, 8, ["is-upsell", "product"])) : ae("", !0),
            c.value ? (B(), ue(kc, {
              key: 2,
              ref_key: "visitorsElement",
              ref: o,
              disabled: !g.value,
              product: c.value
            }, null, 8, ["disabled", "product"])) : ae("", !0),
            c.value && !c.value.isDisabled && c.value.hasOptions ? (B(), ue(Xw, {
              key: 3,
              ref_key: "mealsElement",
              ref: a,
              disabled: !S.value,
              product: c.value
            }, null, 8, ["disabled", "product"])) : ae("", !0)
          ]),
          W("div", sT, [
            v.hidePrices ? ae("", !0) : (B(), X("div", lT, [
              W("span", cT, ie(K(n)(v.product.title, K(m))), 1),
              W("div", uT, [
                c.value && c.value.hasDynamicPrices ? (B(), X("span", dT, ie(K(_)("booking.from")), 1)) : ae("", !0),
                c.value && c.value.oldPrice ? (B(), X("div", fT, [
                  q(st, {
                    amount: c.value.calculatedOldPrice
                  }, null, 8, ["amount"])
                ])) : ae("", !0),
                W("div", pT, [
                  c.value ? (B(), ue(st, {
                    key: 0,
                    amount: c.value.price
                  }, null, 8, ["amount"])) : ae("", !0)
                ])
              ])
            ])),
            W("div", hT, [
              c.value && c.value.isEdit ? (B(), ue(tt, {
                key: 0,
                disabled: i.value,
                loading: i.value,
                bg: "accent",
                class: "th-product__actions-button",
                type: "button",
                onClick: w[0] || (w[0] = (y) => L(!1))
              }, {
                default: we(() => [
                  Je(ie(K(_)("booking.update")), 1)
                ]),
                _: 1
              }, 8, ["disabled", "loading"])) : c.value ? (B(), X(Ie, { key: 1 }, [
                q(tt, {
                  disabled: i.value,
                  loading: i.value,
                  class: "th-product__actions-button",
                  type: "button",
                  onClick: w[1] || (w[1] = (y) => L(!1))
                }, {
                  default: we(() => [
                    Je(ie(K(_)("booking.addToCart")), 1)
                  ]),
                  _: 1
                }, 8, ["disabled", "loading"]),
                v.hideBookNowButton ? ae("", !0) : (B(), ue(tt, {
                  key: 0,
                  disabled: i.value,
                  loading: i.value,
                  bg: "accent",
                  class: "th-product__actions-button",
                  type: "button",
                  onClick: w[2] || (w[2] = (y) => L(!0))
                }, {
                  default: we(() => [
                    Je(ie(K(_)("booking.bookNow")), 1)
                  ]),
                  _: 1
                }, 8, ["disabled", "loading"]))
              ], 64)) : ae("", !0)
            ])
          ])
        ], 64)) : c.value ? (B(), X(Ie, { key: 1 }, [
          W("div", mT, [
            c.value.isHasVariants && c.value.selectedVariant ? (B(), ue(ic, {
              key: 0,
              "selected-variant": c.value.selectedVariant,
              variants: c.value.variants,
              onSelectVariant: O
            }, null, 8, ["selected-variant", "variants"])) : ae("", !0),
            q(Cc, {
              "is-active": !1,
              product: c.value,
              upsell: v.upsell
            }, null, 8, ["product", "upsell"]),
            c.value ? (B(), ue(kc, {
              key: 1,
              disabled: !g.value,
              "is-active": !1,
              product: c.value
            }, null, 8, ["disabled", "product"])) : ae("", !0)
          ]),
          W("div", vT, [
            W("div", gT, [
              W("span", _T, ie(K(n)(v.product.title, K(m))), 1),
              v.hidePrices ? ae("", !0) : (B(), X("div", yT, [
                c.value && c.value.hasDynamicPrices ? (B(), X("span", bT, ie(K(_)("booking.from")), 1)) : ae("", !0),
                v.product.oldPrice ? (B(), X("div", ET, [
                  c.value ? (B(), ue(st, {
                    key: 0,
                    amount: c.value.calculatedOldPrice
                  }, null, 8, ["amount"])) : ae("", !0)
                ])) : ae("", !0),
                W("div", wT, [
                  c.value ? (B(), ue(st, {
                    key: 0,
                    amount: c.value.price
                  }, null, 8, ["amount"])) : ae("", !0)
                ])
              ]))
            ]),
            W("div", TT, [
              q(tt, {
                disabled: !0,
                bg: "black",
                class: "th-product__actions-button"
              }, {
                default: we(() => [
                  Je(ie(K(_)("booking.unavailable")), 1)
                ]),
                _: 1
              })
            ])
          ])
        ], 64)) : ae("", !0),
        (T = b.product) != null && T.cancellationPolicy ? (B(), X("div", {
          key: 2,
          class: "th-product__notice",
          innerHTML: (k = b.product) == null ? void 0 : k.cancellationPolicy
        }, null, 8, CT)) : ae("", !0)
      ]));
    };
  }
}), ST = /* @__PURE__ */ _e(kT, [["__scopeId", "data-v-8aa15696"]]), IT = { class: "th-product" }, DT = { class: "th-product__title" }, OT = /* @__PURE__ */ me({
  __name: "AddToCart",
  props: {
    product: {},
    quickBuy: { type: Boolean, default: !1 }
  },
  setup(e) {
    const { localizedTitle: t } = Jr, { locale: n } = Pe();
    rt(() => {
      r.quickBuy && c();
    });
    const r = e, o = ne(!1), a = ne(null), i = zn();
    ga(() => {
      (a.value && o.value || r.quickBuy) && u();
    });
    const l = () => {
      i.close(), i.setQuickBuyProduct();
    }, s = () => {
      i.toggleAvailability(!0), i.toggleLoading(!1);
    }, c = () => {
      o.value = !0, setTimeout(() => {
        sf(a.value, {
          useGlobalLockState: !0,
          overflowType: "clip"
        });
      }, 0);
    }, u = () => {
      o.value = !1, lf(a.value, {
        useGlobalLockState: !0,
        overflowType: "clip"
      });
    };
    return qe(
      () => i.isOpen || i.quickBuyProduct,
      (f) => {
        if (f) {
          c();
          return;
        }
        u();
      }
    ), (f, d) => (B(), X("div", {
      ref_key: "productModal",
      ref: a,
      class: Ee([{
        "th-product-modal--active": K(i).isOpen || K(i).quickBuyProduct,
        "th-product-modal_quick": r.quickBuy
      }, "th-product-modal"])
    }, [
      r.quickBuy ? ae("", !0) : (B(), ue(rf, {
        key: 0,
        class: "th-product-modal__close-btn th-up-lg:hidden",
        type: "button",
        onClick: K(i).close
      }, null, 8, ["onClick"])),
      W("form", IT, [
        r.product.duration || r.product.rating ? (B(), ue(If, {
          key: 0,
          "bookings-count": r.product.bookingsCount,
          duration: r.product.duration,
          rating: r.product.rating,
          class: "th-product__meta"
        }, null, 8, ["bookings-count", "duration", "rating"])) : ae("", !0),
        W("h1", DT, ie(K(t)(r.product.title, K(n))), 1),
        q(ST, {
          product: f.product,
          onBooked: l,
          onLoaded: s
        }, null, 8, ["product"])
      ])
    ], 2));
  }
}), PT = /* @__PURE__ */ _e(OT, [["__scopeId", "data-v-58f6ce17"]]), AT = { class: "th-default" }, Is = /* @__PURE__ */ me({
  __name: "ProductComponent",
  props: {
    product: {},
    quickBuy: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (B(), X("div", AT, [
      q(PT, {
        product: t.product,
        "quick-buy": t.quickBuy
      }, null, 8, ["product", "quick-buy"])
    ]));
  }
}), NT = (e) => (uo("data-v-e7fa1039"), e = e(), fo(), e), LT = {
  key: 0,
  class: "th-modal th-modal_quick-buy"
}, RT = { class: "th-modal__wrapper" }, $T = {
  "aria-hidden": "true",
  style: { "font-size": "32px", height: "32px", width: "32px" }
}, MT = {
  "data-v-e388f388": "",
  fill: "none",
  height: "32",
  style: { "font-size": "32px", height: "32px", width: "32px" },
  viewBox: "0 0 32 32",
  width: "32",
  xmlns: "http://www.w3.org/2000/svg"
}, xT = /* @__PURE__ */ NT(() => /* @__PURE__ */ W("path", {
  "clip-rule": "evenodd",
  d: "M10.53 9.47a.75.75 0 1 0-1.06 1.06L14.94 16l-5.47 5.47a.75.75 0 1 0 1.06 1.06L16 17.06l5.47 5.47a.75.75 0 1 0 1.06-1.06L17.06 16l5.47-5.47a.75.75 0 1 0-1.06-1.06L16 14.94l-5.47-5.47Z",
  "data-v-e388f388": "",
  fill: "currentColor",
  "fill-rule": "evenodd"
}, null, -1)), BT = [
  xT
], VT = /* @__PURE__ */ me({
  __name: "QuickBuyModal",
  setup(e) {
    const t = zn(), n = () => {
      t.setQuickBuyProduct();
    }, r = (a) => {
      a.code === "Escape" && a.isTrusted && n();
    }, o = se(() => t.quickBuyProduct);
    return qe(o, (a) => {
      setTimeout(() => {
        if (a) {
          window.addEventListener("keydown", r, { passive: !0 }), window.dispatchEvent(new CustomEvent("th:quickBuyModalIsOpen"));
          return;
        }
        window.history.pushState({}, document.title, window.location.pathname), window.removeEventListener("keydown", r), window.dispatchEvent(new CustomEvent("th:quickBuyModalIsClose"));
      }, 0);
    }), (a, i) => o.value ? (B(), X("div", LT, [
      W("div", {
        class: "th-modal__backdrop",
        onClick: n
      }),
      W("div", RT, [
        W("button", {
          class: "th-modal__close-button",
          type: "button",
          onClick: n
        }, [
          W("span", $T, [
            (B(), X("svg", MT, BT))
          ])
        ]),
        o.value ? (B(), ue(Is, {
          key: 0,
          product: o.value,
          "quick-buy": !0
        }, null, 8, ["product"])) : ae("", !0)
      ])
    ])) : ae("", !0);
  }
}), UT = /* @__PURE__ */ _e(VT, [["__scopeId", "data-v-e7fa1039"]]);
var Sc = function(e, t, n) {
  if (!t.hasOwnProperty(n)) {
    var r = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(t, n, r);
  }
};
const FT = { props: { template: String, parent: Object, templateProps: { type: Object, default: function() {
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
    Object.keys(t).forEach(function(w) {
      l[w] === void 0 && (v.$data[w] = t[w]);
    }), Object.keys(n).forEach(function(w) {
      s[w] === void 0 && (v.$props[w] = n[w]);
    }), Object.keys(i).forEach(function(w) {
      u[w] === void 0 && (v.methods[w] = i[w]);
    }), Object.keys(a).forEach(function(w) {
      f[w] === void 0 && (v.computed[w] = a[w]);
    }), Object.keys(o).forEach(function(w) {
      d[w] === void 0 && (v.components[w] = o[w]);
    });
    var h = Object.keys(v.methods || {}), _ = Object.keys(v.$data || {}), m = Object.keys(v.$props || {}), p = Object.keys(this.templateProps), g = _.concat(m).concat(h).concat(p), S = (L = e, b = {}, h.forEach(function(w) {
      return Sc(L, b, w);
    }), b), O = function(w) {
      var T = {};
      return w.forEach(function(k) {
        k && Object.getOwnPropertyNames(k).forEach(function(y) {
          return Sc(k, T, y);
        });
      }), T;
    }([v.$data, v.$props, S, this.templateProps]);
    return jn({ template: this.template || "<div></div>", props: g, computed: v.computed, components: v.components, provide: this.$parent.$.provides ? this.$parent.$.provides : {} }, Object.assign({}, O));
  }
  var L, b;
} }, ap = /* @__PURE__ */ me({
  __name: "CartButton",
  setup(e) {
    const t = ka();
    return (n, r) => (B(), X("button", {
      class: "th-cart__btn",
      type: "button",
      onClick: r[0] || (r[0] = //@ts-ignore
      (...o) => K(t).toggle && K(t).toggle(...o))
    }, [
      Jn(n.$slots, "default")
    ]));
  }
}), HT = ["data-count"], ip = /* @__PURE__ */ me({
  __name: "CartCount",
  setup(e) {
    const t = lt();
    return (n, r) => (B(), X("span", {
      "data-count": K(t).count,
      class: "th-cart__items-count"
    }, ie(K(t).count), 9, HT));
  }
}), YT = { class: "th-default" }, sp = /* @__PURE__ */ me({
  __name: "BookButton",
  setup(e) {
    const { productIsAvailable: t, productIsLoading: n } = Gr(
      zn()
    ), { open: r } = zn(), { t: o } = Pe(), a = kf(), i = se(() => !!a.query.cartItemId), l = se(() => t.value ? i.value ? o("booking.update") : o("booking.bookNow") : o("booking.unavailable"));
    return (s, c) => (B(), X("div", YT, [
      q(tt, {
        bg: K(t) ? "accent" : "black",
        disabled: !K(t) || K(n),
        loading: K(n),
        class: "th-up-lg:hidden",
        type: "button",
        wide: "",
        onClick: K(r)
      }, {
        default: we(() => [
          Je(ie(l.value), 1)
        ]),
        _: 1
      }, 8, ["bg", "disabled", "loading", "onClick"])
    ]));
  }
}), jT = {
  data: () => ({
    template: ""
  }),
  methods: {
    async render(e) {
      this.template = e, await mr(), window.dispatchEvent(new CustomEvent("th:contentIsRendered"));
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
    VRuntimeTemplate: FT,
    ThCartButton: ap,
    // eslint-disable-line
    ThCartCount: ip,
    // eslint-disable-line
    ThProduct: Is,
    // eslint-disable-line
    ThBookButton: sp,
    // eslint-disable-line
    ThPrice: st
    // eslint-disable-line
  }
};
function WT(e, t, n, r, o, a) {
  const i = ou("v-runtime-template");
  return B(), ue(i, { template: e.template }, null, 8, ["template"]);
}
const lp = /* @__PURE__ */ _e(jT, [["render", WT]]), cp = (e, t) => {
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
      n[o] = cp(
        e[o],
        t[o]
      );
      return;
    }
    n[o] = t[o] ?? e[o];
  }), n;
};
function Ic(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function qT(e, t, n) {
  return t && Ic(e.prototype, t), n && Ic(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
/*!
 * Splide.js
 * Version  : 4.1.4
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
var Dc = "(prefers-reduced-motion: reduce)", ur = 1, GT = 2, Cr = 3, Pr = 4, Eo = 5, Xo = 6, fa = 7, zT = {
  CREATED: ur,
  MOUNTED: GT,
  IDLE: Cr,
  MOVING: Pr,
  SCROLLING: Eo,
  DRAGGING: Xo,
  DESTROYED: fa
};
function on(e) {
  e.length = 0;
}
function An(e, t, n) {
  return Array.prototype.slice.call(e, t, n);
}
function Ae(e) {
  return e.bind.apply(e, [null].concat(An(arguments, 1)));
}
var up = setTimeout, Fi = function() {
};
function Oc(e) {
  return requestAnimationFrame(e);
}
function xa(e, t) {
  return typeof t === e;
}
function to(e) {
  return !Os(e) && xa("object", e);
}
var Ds = Array.isArray, dp = Ae(xa, "function"), Tn = Ae(xa, "string"), wo = Ae(xa, "undefined");
function Os(e) {
  return e === null;
}
function fp(e) {
  try {
    return e instanceof (e.ownerDocument.defaultView || window).HTMLElement;
  } catch {
    return !1;
  }
}
function To(e) {
  return Ds(e) ? e : [e];
}
function It(e, t) {
  To(e).forEach(t);
}
function Ps(e, t) {
  return e.indexOf(t) > -1;
}
function Ko(e, t) {
  return e.push.apply(e, To(t)), e;
}
function Zt(e, t, n) {
  e && It(t, function(r) {
    r && e.classList[n ? "add" : "remove"](r);
  });
}
function Bt(e, t) {
  Zt(e, Tn(t) ? t.split(" ") : t, !0);
}
function Co(e, t) {
  It(t, e.appendChild.bind(e));
}
function As(e, t) {
  It(e, function(n) {
    var r = (t || n).parentNode;
    r && r.insertBefore(n, t);
  });
}
function no(e, t) {
  return fp(e) && (e.msMatchesSelector || e.matches).call(e, t);
}
function pp(e, t) {
  var n = e ? An(e.children) : [];
  return t ? n.filter(function(r) {
    return no(r, t);
  }) : n;
}
function ko(e, t) {
  return t ? pp(e, t)[0] : e.firstElementChild;
}
var ro = Object.keys;
function Fn(e, t, n) {
  return e && (n ? ro(e).reverse() : ro(e)).forEach(function(r) {
    r !== "__proto__" && t(e[r], r);
  }), e;
}
function oo(e) {
  return An(arguments, 1).forEach(function(t) {
    Fn(t, function(n, r) {
      e[r] = t[r];
    });
  }), e;
}
function _n(e) {
  return An(arguments, 1).forEach(function(t) {
    Fn(t, function(n, r) {
      Ds(n) ? e[r] = n.slice() : to(n) ? e[r] = _n({}, to(e[r]) ? e[r] : {}, n) : e[r] = n;
    });
  }), e;
}
function Pc(e, t) {
  It(t || ro(e), function(n) {
    delete e[n];
  });
}
function Vt(e, t) {
  It(e, function(n) {
    It(t, function(r) {
      n && n.removeAttribute(r);
    });
  });
}
function ge(e, t, n) {
  to(t) ? Fn(t, function(r, o) {
    ge(e, o, r);
  }) : It(e, function(r) {
    Os(n) || n === "" ? Vt(r, t) : r.setAttribute(t, String(n));
  });
}
function pr(e, t, n) {
  var r = document.createElement(e);
  return t && (Tn(t) ? Bt(r, t) : ge(r, t)), n && Co(n, r), r;
}
function Pt(e, t, n) {
  if (wo(n))
    return getComputedStyle(e)[t];
  Os(n) || (e.style[t] = "" + n);
}
function ao(e, t) {
  Pt(e, "display", t);
}
function hp(e) {
  e.setActive && e.setActive() || e.focus({
    preventScroll: !0
  });
}
function At(e, t) {
  return e.getAttribute(t);
}
function Ac(e, t) {
  return e && e.classList.contains(t);
}
function Et(e) {
  return e.getBoundingClientRect();
}
function Xn(e) {
  It(e, function(t) {
    t && t.parentNode && t.parentNode.removeChild(t);
  });
}
function mp(e) {
  return ko(new DOMParser().parseFromString(e, "text/html").body);
}
function Xt(e, t) {
  e.preventDefault(), t && (e.stopPropagation(), e.stopImmediatePropagation());
}
function vp(e, t) {
  return e && e.querySelector(t);
}
function Ns(e, t) {
  return t ? An(e.querySelectorAll(t)) : [];
}
function Qt(e, t) {
  Zt(e, t, !1);
}
function Hi(e) {
  return e.timeStamp;
}
function $n(e) {
  return Tn(e) ? e : e ? e + "px" : "";
}
var So = "splide", Ls = "data-" + So;
function jr(e, t) {
  if (!e)
    throw new Error("[" + So + "] " + (t || ""));
}
var Cn = Math.min, pa = Math.max, ha = Math.floor, io = Math.ceil, pt = Math.abs;
function gp(e, t, n) {
  return pt(e - t) < n;
}
function Jo(e, t, n, r) {
  var o = Cn(t, n), a = pa(t, n);
  return r ? o < e && e < a : o <= e && e <= a;
}
function ar(e, t, n) {
  var r = Cn(t, n), o = pa(t, n);
  return Cn(pa(r, e), o);
}
function Yi(e) {
  return +(e > 0) - +(e < 0);
}
function ji(e, t) {
  return It(t, function(n) {
    e = e.replace("%s", "" + n);
  }), e;
}
function Rs(e) {
  return e < 10 ? "0" + e : "" + e;
}
var Nc = {};
function XT(e) {
  return "" + e + Rs(Nc[e] = (Nc[e] || 0) + 1);
}
function _p() {
  var e = [];
  function t(i, l, s, c) {
    o(i, l, function(u, f, d) {
      var v = "addEventListener" in u, h = v ? u.removeEventListener.bind(u, f, s, c) : u.removeListener.bind(u, s);
      v ? u.addEventListener(f, s, c) : u.addListener(s), e.push([u, f, d, s, h]);
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
    It(i, function(c) {
      c && It(l, function(u) {
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
    }), on(e);
  }
  return {
    bind: t,
    unbind: n,
    dispatch: r,
    destroy: a
  };
}
var Zn = "mounted", Lc = "ready", kn = "move", Io = "moved", yp = "click", KT = "active", JT = "inactive", ZT = "visible", QT = "hidden", We = "refresh", ht = "updated", so = "resize", $s = "resized", eC = "drag", tC = "dragging", nC = "dragged", Ms = "scroll", Ar = "scrolled", rC = "overflow", bp = "destroy", oC = "arrows:mounted", aC = "arrows:updated", iC = "pagination:mounted", sC = "pagination:updated", Ep = "navigation:mounted", wp = "autoplay:play", lC = "autoplay:playing", Tp = "autoplay:pause", Cp = "lazyload:loaded", kp = "sk", Sp = "sh", ma = "ei";
function xe(e) {
  var t = e ? e.event.bus : document.createDocumentFragment(), n = _p();
  function r(a, i) {
    n.bind(t, To(a).join(" "), function(l) {
      i.apply(i, Ds(l.detail) ? l.detail : []);
    });
  }
  function o(a) {
    n.dispatch(t, a, An(arguments, 1));
  }
  return e && e.event.on(bp, n.destroy), oo(n, {
    bus: t,
    on: r,
    off: Ae(n.unbind, t),
    emit: o
  });
}
function Ba(e, t, n, r) {
  var o = Date.now, a, i = 0, l, s = !0, c = 0;
  function u() {
    if (!s) {
      if (i = e ? Cn((o() - a) / e, 1) : 1, n && n(i), i >= 1 && (t(), a = o(), r && ++c >= r))
        return d();
      l = Oc(u);
    }
  }
  function f(p) {
    p || h(), a = o() - (p ? i * e : 0), s = !1, l = Oc(u);
  }
  function d() {
    s = !0;
  }
  function v() {
    a = o(), i = 0, n && n(i);
  }
  function h() {
    l && cancelAnimationFrame(l), i = 0, l = 0, s = !0;
  }
  function _(p) {
    e = p;
  }
  function m() {
    return s;
  }
  return {
    start: f,
    rewind: v,
    pause: d,
    cancel: h,
    set: _,
    isPaused: m
  };
}
function cC(e) {
  var t = e;
  function n(o) {
    t = o;
  }
  function r(o) {
    return Ps(To(o), t);
  }
  return {
    set: n,
    is: r
  };
}
function uC(e, t) {
  var n = Ba(t || 0, e, null, 1);
  return function() {
    n.isPaused() && n.start();
  };
}
function dC(e, t, n) {
  var r = e.state, o = n.breakpoints || {}, a = n.reducedMotion || {}, i = _p(), l = [];
  function s() {
    var h = n.mediaQuery === "min";
    ro(o).sort(function(_, m) {
      return h ? +_ - +m : +m - +_;
    }).forEach(function(_) {
      u(o[_], "(" + (h ? "min" : "max") + "-width:" + _ + "px)");
    }), u(a, Dc), f();
  }
  function c(h) {
    h && i.destroy();
  }
  function u(h, _) {
    var m = matchMedia(_);
    i.bind(m, "change", f), l.push([h, m]);
  }
  function f() {
    var h = r.is(fa), _ = n.direction, m = l.reduce(function(p, g) {
      return _n(p, g[1].matches ? g[0] : {});
    }, {});
    Pc(n), v(m), n.destroy ? e.destroy(n.destroy === "completely") : h ? (c(!0), e.mount()) : _ !== n.direction && e.refresh();
  }
  function d(h) {
    matchMedia(Dc).matches && (h ? _n(n, a) : Pc(n, ro(a)));
  }
  function v(h, _, m) {
    _n(n, h), _ && _n(Object.getPrototypeOf(n), h), (m || !r.is(ur)) && e.emit(ht, n);
  }
  return {
    setup: s,
    destroy: c,
    reduce: d,
    set: v
  };
}
var Va = "Arrow", Ua = Va + "Left", Fa = Va + "Right", Ip = Va + "Up", Dp = Va + "Down", Rc = "rtl", Ha = "ttb", ci = {
  width: ["height"],
  left: ["top", "right"],
  right: ["bottom", "left"],
  x: ["y"],
  X: ["Y"],
  Y: ["X"],
  ArrowLeft: [Ip, Fa],
  ArrowRight: [Dp, Ua]
};
function fC(e, t, n) {
  function r(a, i, l) {
    l = l || n.direction;
    var s = l === Rc && !i ? 1 : l === Ha ? 0 : -1;
    return ci[a] && ci[a][s] || a.replace(/width|left|right/i, function(c, u) {
      var f = ci[c.toLowerCase()][s] || c;
      return u > 0 ? f.charAt(0).toUpperCase() + f.slice(1) : f;
    });
  }
  function o(a) {
    return a * (n.direction === Rc ? 1 : -1);
  }
  return {
    resolve: r,
    orient: o
  };
}
var tn = "role", hr = "tabindex", pC = "disabled", Lt = "aria-", Do = Lt + "controls", Op = Lt + "current", $c = Lt + "selected", wt = Lt + "label", xs = Lt + "labelledby", Pp = Lt + "hidden", Bs = Lt + "orientation", lo = Lt + "roledescription", Mc = Lt + "live", xc = Lt + "busy", Bc = Lt + "atomic", Vs = [tn, hr, pC, Do, Op, wt, xs, Pp, Bs, lo], Ht = So + "__", Nn = "is-", ui = So, Vc = Ht + "track", hC = Ht + "list", Ya = Ht + "slide", Ap = Ya + "--clone", mC = Ya + "__container", Us = Ht + "arrows", ja = Ht + "arrow", Np = ja + "--prev", Lp = ja + "--next", Wa = Ht + "pagination", Rp = Wa + "__page", vC = Ht + "progress", gC = vC + "__bar", _C = Ht + "toggle", yC = Ht + "spinner", bC = Ht + "sr", EC = Nn + "initialized", Kn = Nn + "active", $p = Nn + "prev", Mp = Nn + "next", Wi = Nn + "visible", qi = Nn + "loading", xp = Nn + "focus-in", Bp = Nn + "overflow", wC = [Kn, Wi, $p, Mp, qi, xp, Bp], TC = {
  slide: Ya,
  clone: Ap,
  arrows: Us,
  arrow: ja,
  prev: Np,
  next: Lp,
  pagination: Wa,
  page: Rp,
  spinner: yC
};
function CC(e, t) {
  if (dp(e.closest))
    return e.closest(t);
  for (var n = e; n && n.nodeType === 1 && !no(n, t); )
    n = n.parentElement;
  return n;
}
var kC = 5, Uc = 200, Vp = "touchstart mousedown", di = "touchmove mousemove", fi = "touchend touchcancel mouseup click";
function SC(e, t, n) {
  var r = xe(e), o = r.on, a = r.bind, i = e.root, l = n.i18n, s = {}, c = [], u = [], f = [], d, v, h;
  function _() {
    S(), O(), g();
  }
  function m() {
    o(We, p), o(We, _), o(ht, g), a(document, Vp + " keydown", function(w) {
      h = w.type === "keydown";
    }, {
      capture: !0
    }), a(i, "focusin", function() {
      Zt(i, xp, !!h);
    });
  }
  function p(w) {
    var T = Vs.concat("style");
    on(c), Qt(i, u), Qt(d, f), Vt([d, v], T), Vt(i, w ? T : ["style", lo]);
  }
  function g() {
    Qt(i, u), Qt(d, f), u = b(ui), f = b(Vc), Bt(i, u), Bt(d, f), ge(i, wt, n.label), ge(i, xs, n.labelledby);
  }
  function S() {
    d = L("." + Vc), v = ko(d, "." + hC), jr(d && v, "A track/list element is missing."), Ko(c, pp(v, "." + Ya + ":not(." + Ap + ")")), Fn({
      arrows: Us,
      pagination: Wa,
      prev: Np,
      next: Lp,
      bar: gC,
      toggle: _C
    }, function(w, T) {
      s[T] = L("." + w);
    }), oo(s, {
      root: i,
      track: d,
      list: v,
      slides: c
    });
  }
  function O() {
    var w = i.id || XT(So), T = n.role;
    i.id = w, d.id = d.id || w + "-track", v.id = v.id || w + "-list", !At(i, tn) && i.tagName !== "SECTION" && T && ge(i, tn, T), ge(i, lo, l.carousel), ge(v, tn, "presentation");
  }
  function L(w) {
    var T = vp(i, w);
    return T && CC(T, "." + ui) === i ? T : void 0;
  }
  function b(w) {
    return [w + "--" + n.type, w + "--" + n.direction, n.drag && w + "--draggable", n.isNavigation && w + "--nav", w === ui && Kn];
  }
  return oo(s, {
    setup: _,
    mount: m,
    destroy: p
  });
}
var kr = "slide", Nr = "loop", Oo = "fade";
function IC(e, t, n, r) {
  var o = xe(e), a = o.on, i = o.emit, l = o.bind, s = e.Components, c = e.root, u = e.options, f = u.isNavigation, d = u.updateOnMove, v = u.i18n, h = u.pagination, _ = u.slideFocus, m = s.Direction.resolve, p = At(r, "style"), g = At(r, wt), S = n > -1, O = ko(r, "." + mC), L;
  function b() {
    S || (r.id = c.id + "-slide" + Rs(t + 1), ge(r, tn, h ? "tabpanel" : "group"), ge(r, lo, v.slide), ge(r, wt, g || ji(v.slideLabel, [t + 1, e.length]))), w();
  }
  function w() {
    l(r, "click", Ae(i, yp, M)), l(r, "keydown", Ae(i, kp, M)), a([Io, Sp, Ar], I), a(Ep, k), d && a(kn, y);
  }
  function T() {
    L = !0, o.destroy(), Qt(r, wC), Vt(r, Vs), ge(r, "style", p), ge(r, wt, g || "");
  }
  function k() {
    var G = e.splides.map(function(j) {
      var Q = j.splide.Components.Slides.getAt(t);
      return Q ? Q.slide.id : "";
    }).join(" ");
    ge(r, wt, ji(v.slideX, (S ? n : t) + 1)), ge(r, Do, G), ge(r, tn, _ ? "button" : ""), _ && Vt(r, lo);
  }
  function y() {
    L || I();
  }
  function I() {
    if (!L) {
      var G = e.index;
      A(), U(), Zt(r, $p, t === G - 1), Zt(r, Mp, t === G + 1);
    }
  }
  function A() {
    var G = N();
    G !== Ac(r, Kn) && (Zt(r, Kn, G), ge(r, Op, f && G || ""), i(G ? KT : JT, M));
  }
  function U() {
    var G = R(), j = !G && (!N() || S);
    if (e.state.is([Pr, Eo]) || ge(r, Pp, j || ""), ge(Ns(r, u.focusableNodes || ""), hr, j ? -1 : ""), _ && ge(r, hr, j ? -1 : 0), G !== Ac(r, Wi) && (Zt(r, Wi, G), i(G ? ZT : QT, M)), !G && document.activeElement === r) {
      var Q = s.Slides.getAt(e.index);
      Q && hp(Q.slide);
    }
  }
  function x(G, j, Q) {
    Pt(Q && O || r, G, j);
  }
  function N() {
    var G = e.index;
    return G === t || u.cloneStatus && G === n;
  }
  function R() {
    if (e.is(Oo))
      return N();
    var G = Et(s.Elements.track), j = Et(r), Q = m("left", !0), le = m("right", !0);
    return ha(G[Q]) <= io(j[Q]) && ha(j[le]) <= io(G[le]);
  }
  function F(G, j) {
    var Q = pt(G - t);
    return !S && (u.rewind || e.is(Nr)) && (Q = Cn(Q, e.length - Q)), Q <= j;
  }
  var M = {
    index: t,
    slideIndex: n,
    slide: r,
    container: O,
    isClone: S,
    mount: b,
    destroy: T,
    update: I,
    style: x,
    isWithin: F
  };
  return M;
}
function DC(e, t, n) {
  var r = xe(e), o = r.on, a = r.emit, i = r.bind, l = t.Elements, s = l.slides, c = l.list, u = [];
  function f() {
    d(), o(We, v), o(We, d);
  }
  function d() {
    s.forEach(function(I, A) {
      _(I, A, -1);
    });
  }
  function v() {
    L(function(I) {
      I.destroy();
    }), on(u);
  }
  function h() {
    L(function(I) {
      I.update();
    });
  }
  function _(I, A, U) {
    var x = IC(e, A, U, I);
    x.mount(), u.push(x), u.sort(function(N, R) {
      return N.index - R.index;
    });
  }
  function m(I) {
    return I ? b(function(A) {
      return !A.isClone;
    }) : u;
  }
  function p(I) {
    var A = t.Controller, U = A.toIndex(I), x = A.hasFocus() ? 1 : n.perPage;
    return b(function(N) {
      return Jo(N.index, U, U + x - 1);
    });
  }
  function g(I) {
    return b(I)[0];
  }
  function S(I, A) {
    It(I, function(U) {
      if (Tn(U) && (U = mp(U)), fp(U)) {
        var x = s[A];
        x ? As(U, x) : Co(c, U), Bt(U, n.classes.slide), T(U, Ae(a, so));
      }
    }), a(We);
  }
  function O(I) {
    Xn(b(I).map(function(A) {
      return A.slide;
    })), a(We);
  }
  function L(I, A) {
    m(A).forEach(I);
  }
  function b(I) {
    return u.filter(dp(I) ? I : function(A) {
      return Tn(I) ? no(A.slide, I) : Ps(To(I), A.index);
    });
  }
  function w(I, A, U) {
    L(function(x) {
      x.style(I, A, U);
    });
  }
  function T(I, A) {
    var U = Ns(I, "img"), x = U.length;
    x ? U.forEach(function(N) {
      i(N, "load error", function() {
        --x || A();
      });
    }) : A();
  }
  function k(I) {
    return I ? s.length : u.length;
  }
  function y() {
    return u.length > n.perPage;
  }
  return {
    mount: f,
    destroy: v,
    update: h,
    register: _,
    get: m,
    getIn: p,
    getAt: g,
    add: S,
    remove: O,
    forEach: L,
    filter: b,
    style: w,
    getLength: k,
    isEnough: y
  };
}
function OC(e, t, n) {
  var r = xe(e), o = r.on, a = r.bind, i = r.emit, l = t.Slides, s = t.Direction.resolve, c = t.Elements, u = c.root, f = c.track, d = c.list, v = l.getAt, h = l.style, _, m, p;
  function g() {
    S(), a(window, "resize load", uC(Ae(i, so))), o([ht, We], S), o(so, O);
  }
  function S() {
    _ = n.direction === Ha, Pt(u, "maxWidth", $n(n.width)), Pt(f, s("paddingLeft"), L(!1)), Pt(f, s("paddingRight"), L(!0)), O(!0);
  }
  function O(M) {
    var G = Et(u);
    (M || m.width !== G.width || m.height !== G.height) && (Pt(f, "height", b()), h(s("marginRight"), $n(n.gap)), h("width", T()), h("height", k(), !0), m = G, i($s), p !== (p = F()) && (Zt(u, Bp, p), i(rC, p)));
  }
  function L(M) {
    var G = n.padding, j = s(M ? "right" : "left");
    return G && $n(G[j] || (to(G) ? 0 : G)) || "0px";
  }
  function b() {
    var M = "";
    return _ && (M = w(), jr(M, "height or heightRatio is missing."), M = "calc(" + M + " - " + L(!1) + " - " + L(!0) + ")"), M;
  }
  function w() {
    return $n(n.height || Et(d).width * n.heightRatio);
  }
  function T() {
    return n.autoWidth ? null : $n(n.fixedWidth) || (_ ? "" : y());
  }
  function k() {
    return $n(n.fixedHeight) || (_ ? n.autoHeight ? null : y() : w());
  }
  function y() {
    var M = $n(n.gap);
    return "calc((100%" + (M && " + " + M) + ")/" + (n.perPage || 1) + (M && " - " + M) + ")";
  }
  function I() {
    return Et(d)[s("width")];
  }
  function A(M, G) {
    var j = v(M || 0);
    return j ? Et(j.slide)[s("width")] + (G ? 0 : N()) : 0;
  }
  function U(M, G) {
    var j = v(M);
    if (j) {
      var Q = Et(j.slide)[s("right")], le = Et(d)[s("left")];
      return pt(Q - le) + (G ? 0 : N());
    }
    return 0;
  }
  function x(M) {
    return U(e.length - 1) - U(0) + A(0, M);
  }
  function N() {
    var M = v(0);
    return M && parseFloat(Pt(M.slide, s("marginRight"))) || 0;
  }
  function R(M) {
    return parseFloat(Pt(f, s("padding" + (M ? "Right" : "Left")))) || 0;
  }
  function F() {
    return e.is(Oo) || x(!0) > I();
  }
  return {
    mount: g,
    resize: O,
    listSize: I,
    slideSize: A,
    sliderSize: x,
    totalSize: U,
    getPadding: R,
    isOverflow: F
  };
}
var PC = 2;
function AC(e, t, n) {
  var r = xe(e), o = r.on, a = t.Elements, i = t.Slides, l = t.Direction.resolve, s = [], c;
  function u() {
    o(We, f), o([ht, so], v), (c = m()) && (h(c), t.Layout.resize(!0));
  }
  function f() {
    d(), u();
  }
  function d() {
    Xn(s), on(s), r.destroy();
  }
  function v() {
    var p = m();
    c !== p && (c < p || !p) && r.emit(We);
  }
  function h(p) {
    var g = i.get().slice(), S = g.length;
    if (S) {
      for (; g.length < p; )
        Ko(g, g);
      Ko(g.slice(-p), g.slice(0, p)).forEach(function(O, L) {
        var b = L < p, w = _(O.slide, L);
        b ? As(w, g[0].slide) : Co(a.list, w), Ko(s, w), i.register(w, L - p + (b ? 0 : S), O.index);
      });
    }
  }
  function _(p, g) {
    var S = p.cloneNode(!0);
    return Bt(S, n.classes.clone), S.id = e.root.id + "-clone" + Rs(g + 1), S;
  }
  function m() {
    var p = n.clones;
    if (!e.is(Nr))
      p = 0;
    else if (wo(p)) {
      var g = n[l("fixedWidth")] && t.Layout.slideSize(0), S = g && io(Et(a.track)[l("width")] / g);
      p = S || n[l("autoWidth")] && e.length || n.perPage * PC;
    }
    return p;
  }
  return {
    mount: u,
    destroy: d
  };
}
function NC(e, t, n) {
  var r = xe(e), o = r.on, a = r.emit, i = e.state.set, l = t.Layout, s = l.slideSize, c = l.getPadding, u = l.totalSize, f = l.listSize, d = l.sliderSize, v = t.Direction, h = v.resolve, _ = v.orient, m = t.Elements, p = m.list, g = m.track, S;
  function O() {
    S = t.Transition, o([Zn, $s, ht, We], L);
  }
  function L() {
    t.Controller.isBusy() || (t.Scroll.cancel(), w(e.index), t.Slides.update());
  }
  function b(j, Q, le, de) {
    j !== Q && M(j > le) && (I(), T(y(x(), j > le), !0)), i(Pr), a(kn, Q, le, j), S.start(Q, function() {
      i(Cr), a(Io, Q, le, j), de && de();
    });
  }
  function w(j) {
    T(U(j, !0));
  }
  function T(j, Q) {
    if (!e.is(Oo)) {
      var le = Q ? j : k(j);
      Pt(p, "transform", "translate" + h("X") + "(" + le + "px)"), j !== le && a(Sp);
    }
  }
  function k(j) {
    if (e.is(Nr)) {
      var Q = A(j), le = Q > t.Controller.getEnd(), de = Q < 0;
      (de || le) && (j = y(j, le));
    }
    return j;
  }
  function y(j, Q) {
    var le = j - F(Q), de = d();
    return j -= _(de * (io(pt(le) / de) || 1)) * (Q ? 1 : -1), j;
  }
  function I() {
    T(x(), !0), S.cancel();
  }
  function A(j) {
    for (var Q = t.Slides.get(), le = 0, de = 1 / 0, pe = 0; pe < Q.length; pe++) {
      var Ce = Q[pe].index, ee = pt(U(Ce, !0) - j);
      if (ee <= de)
        de = ee, le = Ce;
      else
        break;
    }
    return le;
  }
  function U(j, Q) {
    var le = _(u(j - 1) - R(j));
    return Q ? N(le) : le;
  }
  function x() {
    var j = h("left");
    return Et(p)[j] - Et(g)[j] + _(c(!1));
  }
  function N(j) {
    return n.trimSpace && e.is(kr) && (j = ar(j, 0, _(d(!0) - f()))), j;
  }
  function R(j) {
    var Q = n.focus;
    return Q === "center" ? (f() - s(j, !0)) / 2 : +Q * s(j) || 0;
  }
  function F(j) {
    return U(j ? t.Controller.getEnd() : 0, !!n.trimSpace);
  }
  function M(j) {
    var Q = _(y(x(), j));
    return j ? Q >= 0 : Q <= p[h("scrollWidth")] - Et(g)[h("width")];
  }
  function G(j, Q) {
    Q = wo(Q) ? x() : Q;
    var le = j !== !0 && _(Q) < _(F(!1)), de = j !== !1 && _(Q) > _(F(!0));
    return le || de;
  }
  return {
    mount: O,
    move: b,
    jump: w,
    translate: T,
    shift: y,
    cancel: I,
    toIndex: A,
    toPosition: U,
    getPosition: x,
    getLimit: F,
    exceededLimit: G,
    reposition: L
  };
}
function LC(e, t, n) {
  var r = xe(e), o = r.on, a = r.emit, i = t.Move, l = i.getPosition, s = i.getLimit, c = i.toPosition, u = t.Slides, f = u.isEnough, d = u.getLength, v = n.omitEnd, h = e.is(Nr), _ = e.is(kr), m = Ae(x, !1), p = Ae(x, !0), g = n.start || 0, S, O = g, L, b, w;
  function T() {
    k(), o([ht, We, ma], k), o($s, y);
  }
  function k() {
    L = d(!0), b = n.perMove, w = n.perPage, S = M();
    var ee = ar(g, 0, v ? S : L - 1);
    ee !== g && (g = ee, i.reposition());
  }
  function y() {
    S !== M() && a(ma);
  }
  function I(ee, Y, H) {
    if (!Ce()) {
      var E = U(ee), D = F(E);
      D > -1 && (Y || D !== g) && (le(D), i.move(E, D, O, H));
    }
  }
  function A(ee, Y, H, E) {
    t.Scroll.scroll(ee, Y, H, function() {
      var D = F(i.toIndex(l()));
      le(v ? Cn(D, S) : D), E && E();
    });
  }
  function U(ee) {
    var Y = g;
    if (Tn(ee)) {
      var H = ee.match(/([+\-<>])(\d+)?/) || [], E = H[1], D = H[2];
      E === "+" || E === "-" ? Y = N(g + +("" + E + (+D || 1)), g) : E === ">" ? Y = D ? G(+D) : m(!0) : E === "<" && (Y = p(!0));
    } else
      Y = h ? ee : ar(ee, 0, S);
    return Y;
  }
  function x(ee, Y) {
    var H = b || (pe() ? 1 : w), E = N(g + H * (ee ? -1 : 1), g, !(b || pe()));
    return E === -1 && _ && !gp(l(), s(!ee), 1) ? ee ? 0 : S : Y ? E : F(E);
  }
  function N(ee, Y, H) {
    if (f() || pe()) {
      var E = R(ee);
      E !== ee && (Y = ee, ee = E, H = !1), ee < 0 || ee > S ? !b && (Jo(0, ee, Y, !0) || Jo(S, Y, ee, !0)) ? ee = G(j(ee)) : h ? ee = H ? ee < 0 ? -(L % w || w) : L : ee : n.rewind ? ee = ee < 0 ? S : 0 : ee = -1 : H && ee !== Y && (ee = G(j(Y) + (ee < Y ? -1 : 1)));
    } else
      ee = -1;
    return ee;
  }
  function R(ee) {
    if (_ && n.trimSpace === "move" && ee !== g)
      for (var Y = l(); Y === c(ee, !0) && Jo(ee, 0, e.length - 1, !n.rewind); )
        ee < g ? --ee : ++ee;
    return ee;
  }
  function F(ee) {
    return h ? (ee + L) % L || 0 : ee;
  }
  function M() {
    for (var ee = L - (pe() || h && b ? 1 : w); v && ee-- > 0; )
      if (c(L - 1, !0) !== c(ee, !0)) {
        ee++;
        break;
      }
    return ar(ee, 0, L - 1);
  }
  function G(ee) {
    return ar(pe() ? ee : w * ee, 0, S);
  }
  function j(ee) {
    return pe() ? Cn(ee, S) : ha((ee >= S ? L - 1 : ee) / w);
  }
  function Q(ee) {
    var Y = i.toIndex(ee);
    return _ ? ar(Y, 0, S) : Y;
  }
  function le(ee) {
    ee !== g && (O = g, g = ee);
  }
  function de(ee) {
    return ee ? O : g;
  }
  function pe() {
    return !wo(n.focus) || n.isNavigation;
  }
  function Ce() {
    return e.state.is([Pr, Eo]) && !!n.waitForTransition;
  }
  return {
    mount: T,
    go: I,
    scroll: A,
    getNext: m,
    getPrev: p,
    getAdjacent: x,
    getEnd: M,
    setIndex: le,
    getIndex: de,
    toIndex: G,
    toPage: j,
    toDest: Q,
    hasFocus: pe,
    isBusy: Ce
  };
}
var RC = "http://www.w3.org/2000/svg", $C = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z", Ho = 40;
function MC(e, t, n) {
  var r = xe(e), o = r.on, a = r.bind, i = r.emit, l = n.classes, s = n.i18n, c = t.Elements, u = t.Controller, f = c.arrows, d = c.track, v = f, h = c.prev, _ = c.next, m, p, g = {};
  function S() {
    L(), o(ht, O);
  }
  function O() {
    b(), S();
  }
  function L() {
    var A = n.arrows;
    A && !(h && _) && k(), h && _ && (oo(g, {
      prev: h,
      next: _
    }), ao(v, A ? "" : "none"), Bt(v, p = Us + "--" + n.direction), A && (w(), I(), ge([h, _], Do, d.id), i(oC, h, _)));
  }
  function b() {
    r.destroy(), Qt(v, p), m ? (Xn(f ? [h, _] : v), h = _ = null) : Vt([h, _], Vs);
  }
  function w() {
    o([Zn, Io, We, Ar, ma], I), a(_, "click", Ae(T, ">")), a(h, "click", Ae(T, "<"));
  }
  function T(A) {
    u.go(A, !0);
  }
  function k() {
    v = f || pr("div", l.arrows), h = y(!0), _ = y(!1), m = !0, Co(v, [h, _]), !f && As(v, d);
  }
  function y(A) {
    var U = '<button class="' + l.arrow + " " + (A ? l.prev : l.next) + '" type="button"><svg xmlns="' + RC + '" viewBox="0 0 ' + Ho + " " + Ho + '" width="' + Ho + '" height="' + Ho + '" focusable="false"><path d="' + (n.arrowPath || $C) + '" />';
    return mp(U);
  }
  function I() {
    if (h && _) {
      var A = e.index, U = u.getPrev(), x = u.getNext(), N = U > -1 && A < U ? s.last : s.prev, R = x > -1 && A > x ? s.first : s.next;
      h.disabled = U < 0, _.disabled = x < 0, ge(h, wt, N), ge(_, wt, R), i(aC, h, _, U, x);
    }
  }
  return {
    arrows: g,
    mount: S,
    destroy: b,
    update: I
  };
}
var xC = Ls + "-interval";
function BC(e, t, n) {
  var r = xe(e), o = r.on, a = r.bind, i = r.emit, l = Ba(n.interval, e.go.bind(e, ">"), w), s = l.isPaused, c = t.Elements, u = t.Elements, f = u.root, d = u.toggle, v = n.autoplay, h, _, m = v === "pause";
  function p() {
    v && (g(), d && ge(d, Do, c.track.id), m || S(), b());
  }
  function g() {
    n.pauseOnHover && a(f, "mouseenter mouseleave", function(k) {
      h = k.type === "mouseenter", L();
    }), n.pauseOnFocus && a(f, "focusin focusout", function(k) {
      _ = k.type === "focusin", L();
    }), d && a(d, "click", function() {
      m ? S() : O(!0);
    }), o([kn, Ms, We], l.rewind), o(kn, T);
  }
  function S() {
    s() && t.Slides.isEnough() && (l.start(!n.resetProgress), _ = h = m = !1, b(), i(wp));
  }
  function O(k) {
    k === void 0 && (k = !0), m = !!k, b(), s() || (l.pause(), i(Tp));
  }
  function L() {
    m || (h || _ ? O(!1) : S());
  }
  function b() {
    d && (Zt(d, Kn, !m), ge(d, wt, n.i18n[m ? "play" : "pause"]));
  }
  function w(k) {
    var y = c.bar;
    y && Pt(y, "width", k * 100 + "%"), i(lC, k);
  }
  function T(k) {
    var y = t.Slides.getAt(k);
    l.set(y && +At(y.slide, xC) || n.interval);
  }
  return {
    mount: p,
    destroy: l.cancel,
    play: S,
    pause: O,
    isPaused: s
  };
}
function VC(e, t, n) {
  var r = xe(e), o = r.on;
  function a() {
    n.cover && (o(Cp, Ae(l, !0)), o([Zn, ht, We], Ae(i, !0)));
  }
  function i(s) {
    t.Slides.forEach(function(c) {
      var u = ko(c.container || c.slide, "img");
      u && u.src && l(s, u, c);
    });
  }
  function l(s, c, u) {
    u.style("background", s ? 'center/cover no-repeat url("' + c.src + '")' : "", !0), ao(c, s ? "none" : "");
  }
  return {
    mount: a,
    destroy: Ae(i, !1)
  };
}
var UC = 10, FC = 600, HC = 0.6, YC = 1.5, jC = 800;
function WC(e, t, n) {
  var r = xe(e), o = r.on, a = r.emit, i = e.state.set, l = t.Move, s = l.getPosition, c = l.getLimit, u = l.exceededLimit, f = l.translate, d = e.is(kr), v, h, _ = 1;
  function m() {
    o(kn, O), o([ht, We], L);
  }
  function p(w, T, k, y, I) {
    var A = s();
    if (O(), k && (!d || !u())) {
      var U = t.Layout.sliderSize(), x = Yi(w) * U * ha(pt(w) / U) || 0;
      w = l.toPosition(t.Controller.toDest(w % U)) + x;
    }
    var N = gp(A, w, 1);
    _ = 1, T = N ? 0 : T || pa(pt(w - A) / YC, jC), h = y, v = Ba(T, g, Ae(S, A, w, I), 1), i(Eo), a(Ms), v.start();
  }
  function g() {
    i(Cr), h && h(), a(Ar);
  }
  function S(w, T, k, y) {
    var I = s(), A = w + (T - w) * b(y), U = (A - I) * _;
    f(I + U), d && !k && u() && (_ *= HC, pt(U) < UC && p(c(u(!0)), FC, !1, h, !0));
  }
  function O() {
    v && v.cancel();
  }
  function L() {
    v && !v.isPaused() && (O(), g());
  }
  function b(w) {
    var T = n.easingFunc;
    return T ? T(w) : 1 - Math.pow(1 - w, 4);
  }
  return {
    mount: m,
    destroy: O,
    scroll: p,
    cancel: L
  };
}
var ir = {
  passive: !1,
  capture: !0
};
function qC(e, t, n) {
  var r = xe(e), o = r.on, a = r.emit, i = r.bind, l = r.unbind, s = e.state, c = t.Move, u = t.Scroll, f = t.Controller, d = t.Elements.track, v = t.Media.reduce, h = t.Direction, _ = h.resolve, m = h.orient, p = c.getPosition, g = c.exceededLimit, S, O, L, b, w, T = !1, k, y, I;
  function A() {
    i(d, di, Fi, ir), i(d, fi, Fi, ir), i(d, Vp, x, ir), i(d, "click", F, {
      capture: !0
    }), i(d, "dragstart", Xt), o([Zn, ht], U);
  }
  function U() {
    var C = n.drag;
    z(!C), b = C === "free";
  }
  function x(C) {
    if (k = !1, !y) {
      var P = D(C);
      E(C.target) && (P || !C.button) && (f.isBusy() ? Xt(C, !0) : (I = P ? d : window, w = s.is([Pr, Eo]), L = null, i(I, di, N, ir), i(I, fi, R, ir), c.cancel(), u.cancel(), M(C)));
    }
  }
  function N(C) {
    if (s.is(Xo) || (s.set(Xo), a(eC)), C.cancelable)
      if (w) {
        c.translate(S + H(pe(C)));
        var P = Ce(C) > Uc, V = T !== (T = g());
        (P || V) && M(C), k = !0, a(tC), Xt(C);
      } else
        Q(C) && (w = j(C), Xt(C));
  }
  function R(C) {
    s.is(Xo) && (s.set(Cr), a(nC)), w && (G(C), Xt(C)), l(I, di, N), l(I, fi, R), w = !1;
  }
  function F(C) {
    !y && k && Xt(C, !0);
  }
  function M(C) {
    L = O, O = C, S = p();
  }
  function G(C) {
    var P = le(C), V = de(P), Z = n.rewind && n.rewindByDrag;
    v(!1), b ? f.scroll(V, 0, n.snap) : e.is(Oo) ? f.go(m(Yi(P)) < 0 ? Z ? "<" : "-" : Z ? ">" : "+") : e.is(kr) && T && Z ? f.go(g(!0) ? ">" : "<") : f.go(f.toDest(V), !0), v(!0);
  }
  function j(C) {
    var P = n.dragMinThreshold, V = to(P), Z = V && P.mouse || 0, re = (V ? P.touch : +P) || 10;
    return pt(pe(C)) > (D(C) ? re : Z);
  }
  function Q(C) {
    return pt(pe(C)) > pt(pe(C, !0));
  }
  function le(C) {
    if (e.is(Nr) || !T) {
      var P = Ce(C);
      if (P && P < Uc)
        return pe(C) / P;
    }
    return 0;
  }
  function de(C) {
    return p() + Yi(C) * Cn(pt(C) * (n.flickPower || 600), b ? 1 / 0 : t.Layout.listSize() * (n.flickMaxPages || 1));
  }
  function pe(C, P) {
    return Y(C, P) - Y(ee(C), P);
  }
  function Ce(C) {
    return Hi(C) - Hi(ee(C));
  }
  function ee(C) {
    return O === C && L || O;
  }
  function Y(C, P) {
    return (D(C) ? C.changedTouches[0] : C)["page" + _(P ? "Y" : "X")];
  }
  function H(C) {
    return C / (T && e.is(kr) ? kC : 1);
  }
  function E(C) {
    var P = n.noDrag;
    return !no(C, "." + Rp + ", ." + ja) && (!P || !no(C, P));
  }
  function D(C) {
    return typeof TouchEvent < "u" && C instanceof TouchEvent;
  }
  function $() {
    return w;
  }
  function z(C) {
    y = C;
  }
  return {
    mount: A,
    disable: z,
    isDragging: $
  };
}
var GC = {
  Spacebar: " ",
  Right: Fa,
  Left: Ua,
  Up: Ip,
  Down: Dp
};
function Fs(e) {
  return e = Tn(e) ? e : e.key, GC[e] || e;
}
var Fc = "keydown";
function zC(e, t, n) {
  var r = xe(e), o = r.on, a = r.bind, i = r.unbind, l = e.root, s = t.Direction.resolve, c, u;
  function f() {
    d(), o(ht, v), o(ht, d), o(kn, _);
  }
  function d() {
    var p = n.keyboard;
    p && (c = p === "global" ? window : l, a(c, Fc, m));
  }
  function v() {
    i(c, Fc);
  }
  function h(p) {
    u = p;
  }
  function _() {
    var p = u;
    u = !0, up(function() {
      u = p;
    });
  }
  function m(p) {
    if (!u) {
      var g = Fs(p);
      g === s(Ua) ? e.go("<") : g === s(Fa) && e.go(">");
    }
  }
  return {
    mount: f,
    destroy: v,
    disable: h
  };
}
var Wr = Ls + "-lazy", Zo = Wr + "-srcset", XC = "[" + Wr + "], [" + Zo + "]";
function KC(e, t, n) {
  var r = xe(e), o = r.on, a = r.off, i = r.bind, l = r.emit, s = n.lazyLoad === "sequential", c = [Io, Ar], u = [];
  function f() {
    n.lazyLoad && (d(), o(We, d));
  }
  function d() {
    on(u), v(), s ? p() : (a(c), o(c, h), h());
  }
  function v() {
    t.Slides.forEach(function(g) {
      Ns(g.slide, XC).forEach(function(S) {
        var O = At(S, Wr), L = At(S, Zo);
        if (O !== S.src || L !== S.srcset) {
          var b = n.classes.spinner, w = S.parentElement, T = ko(w, "." + b) || pr("span", b, w);
          u.push([S, g, T]), S.src || ao(S, "none");
        }
      });
    });
  }
  function h() {
    u = u.filter(function(g) {
      var S = n.perPage * ((n.preloadPages || 1) + 1) - 1;
      return g[1].isWithin(e.index, S) ? _(g) : !0;
    }), u.length || a(c);
  }
  function _(g) {
    var S = g[0];
    Bt(g[1].slide, qi), i(S, "load error", Ae(m, g)), ge(S, "src", At(S, Wr)), ge(S, "srcset", At(S, Zo)), Vt(S, Wr), Vt(S, Zo);
  }
  function m(g, S) {
    var O = g[0], L = g[1];
    Qt(L.slide, qi), S.type !== "error" && (Xn(g[2]), ao(O, ""), l(Cp, O, L), l(so)), s && p();
  }
  function p() {
    u.length && _(u.shift());
  }
  return {
    mount: f,
    destroy: Ae(on, u),
    check: h
  };
}
function JC(e, t, n) {
  var r = xe(e), o = r.on, a = r.emit, i = r.bind, l = t.Slides, s = t.Elements, c = t.Controller, u = c.hasFocus, f = c.getIndex, d = c.go, v = t.Direction.resolve, h = s.pagination, _ = [], m, p;
  function g() {
    S(), o([ht, We, ma], g);
    var y = n.pagination;
    h && ao(h, y ? "" : "none"), y && (o([kn, Ms, Ar], k), O(), k(), a(iC, {
      list: m,
      items: _
    }, T(e.index)));
  }
  function S() {
    m && (Xn(h ? An(m.children) : m), Qt(m, p), on(_), m = null), r.destroy();
  }
  function O() {
    var y = e.length, I = n.classes, A = n.i18n, U = n.perPage, x = u() ? c.getEnd() + 1 : io(y / U);
    m = h || pr("ul", I.pagination, s.track.parentElement), Bt(m, p = Wa + "--" + w()), ge(m, tn, "tablist"), ge(m, wt, A.select), ge(m, Bs, w() === Ha ? "vertical" : "");
    for (var N = 0; N < x; N++) {
      var R = pr("li", null, m), F = pr("button", {
        class: I.page,
        type: "button"
      }, R), M = l.getIn(N).map(function(j) {
        return j.slide.id;
      }), G = !u() && U > 1 ? A.pageX : A.slideX;
      i(F, "click", Ae(L, N)), n.paginationKeyboard && i(F, "keydown", Ae(b, N)), ge(R, tn, "presentation"), ge(F, tn, "tab"), ge(F, Do, M.join(" ")), ge(F, wt, ji(G, N + 1)), ge(F, hr, -1), _.push({
        li: R,
        button: F,
        page: N
      });
    }
  }
  function L(y) {
    d(">" + y, !0);
  }
  function b(y, I) {
    var A = _.length, U = Fs(I), x = w(), N = -1;
    U === v(Fa, !1, x) ? N = ++y % A : U === v(Ua, !1, x) ? N = (--y + A) % A : U === "Home" ? N = 0 : U === "End" && (N = A - 1);
    var R = _[N];
    R && (hp(R.button), d(">" + N), Xt(I, !0));
  }
  function w() {
    return n.paginationDirection || n.direction;
  }
  function T(y) {
    return _[c.toPage(y)];
  }
  function k() {
    var y = T(f(!0)), I = T(f());
    if (y) {
      var A = y.button;
      Qt(A, Kn), Vt(A, $c), ge(A, hr, -1);
    }
    if (I) {
      var U = I.button;
      Bt(U, Kn), ge(U, $c, !0), ge(U, hr, "");
    }
    a(sC, {
      list: m,
      items: _
    }, y, I);
  }
  return {
    items: _,
    mount: g,
    destroy: S,
    getAt: T,
    update: k
  };
}
var ZC = [" ", "Enter"];
function QC(e, t, n) {
  var r = n.isNavigation, o = n.slideFocus, a = [];
  function i() {
    e.splides.forEach(function(h) {
      h.isParent || (c(e, h.splide), c(h.splide, e));
    }), r && u();
  }
  function l() {
    a.forEach(function(h) {
      h.destroy();
    }), on(a);
  }
  function s() {
    l(), i();
  }
  function c(h, _) {
    var m = xe(h);
    m.on(kn, function(p, g, S) {
      _.go(_.is(Nr) ? S : p);
    }), a.push(m);
  }
  function u() {
    var h = xe(e), _ = h.on;
    _(yp, d), _(kp, v), _([Zn, ht], f), a.push(h), h.emit(Ep, e.splides);
  }
  function f() {
    ge(t.Elements.list, Bs, n.direction === Ha ? "vertical" : "");
  }
  function d(h) {
    e.go(h.index);
  }
  function v(h, _) {
    Ps(ZC, Fs(_)) && (d(h), Xt(_));
  }
  return {
    setup: Ae(t.Media.set, {
      slideFocus: wo(o) ? r : o
    }, !0),
    mount: i,
    destroy: l,
    remount: s
  };
}
function ek(e, t, n) {
  var r = xe(e), o = r.bind, a = 0;
  function i() {
    n.wheel && o(t.Elements.track, "wheel", l, ir);
  }
  function l(c) {
    if (c.cancelable) {
      var u = c.deltaY, f = u < 0, d = Hi(c), v = n.wheelMinThreshold || 0, h = n.wheelSleep || 0;
      pt(u) > v && d - a > h && (e.go(f ? "<" : ">"), a = d), s(f) && Xt(c);
    }
  }
  function s(c) {
    return !n.releaseWheel || e.state.is(Pr) || t.Controller.getAdjacent(c) !== -1;
  }
  return {
    mount: i
  };
}
var tk = 90;
function nk(e, t, n) {
  var r = xe(e), o = r.on, a = t.Elements.track, i = n.live && !n.isNavigation, l = pr("span", bC), s = Ba(tk, Ae(u, !1));
  function c() {
    i && (d(!t.Autoplay.isPaused()), ge(a, Bc, !0), l.textContent = "…", o(wp, Ae(d, !0)), o(Tp, Ae(d, !1)), o([Io, Ar], Ae(u, !0)));
  }
  function u(v) {
    ge(a, xc, v), v ? (Co(a, l), s.start()) : (Xn(l), s.cancel());
  }
  function f() {
    Vt(a, [Mc, Bc, xc]), Xn(l);
  }
  function d(v) {
    i && ge(a, Mc, v ? "off" : "polite");
  }
  return {
    mount: c,
    disable: d,
    destroy: f
  };
}
var rk = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Media: dC,
  Direction: fC,
  Elements: SC,
  Slides: DC,
  Layout: OC,
  Clones: AC,
  Move: NC,
  Controller: LC,
  Arrows: MC,
  Autoplay: BC,
  Cover: VC,
  Scroll: WC,
  Drag: qC,
  Keyboard: zC,
  LazyLoad: KC,
  Pagination: JC,
  Sync: QC,
  Wheel: ek,
  Live: nk
}), ok = {
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
}, ak = {
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
  classes: TC,
  i18n: ok,
  reducedMotion: {
    speed: 0,
    rewindSpeed: 0,
    autoplay: "pause"
  }
};
function ik(e, t, n) {
  var r = t.Slides;
  function o() {
    xe(e).on([Zn, We], a);
  }
  function a() {
    r.forEach(function(l) {
      l.style("transform", "translateX(-" + 100 * l.index + "%)");
    });
  }
  function i(l, s) {
    r.style("transition", "opacity " + n.speed + "ms " + n.easing), up(s);
  }
  return {
    mount: o,
    start: i,
    cancel: Fi
  };
}
function sk(e, t, n) {
  var r = t.Move, o = t.Controller, a = t.Scroll, i = t.Elements.list, l = Ae(Pt, i, "transition"), s;
  function c() {
    xe(e).bind(i, "transitionend", function(v) {
      v.target === i && s && (f(), s());
    });
  }
  function u(v, h) {
    var _ = r.toPosition(v, !0), m = r.getPosition(), p = d(v);
    pt(_ - m) >= 1 && p >= 1 ? n.useScroll ? a.scroll(_, p, !1, h) : (l("transform " + p + "ms " + n.easing), r.translate(_, !0), s = h) : (r.jump(v), h());
  }
  function f() {
    l(""), a.cancel();
  }
  function d(v) {
    var h = n.rewindSpeed;
    if (e.is(kr) && h) {
      var _ = o.getIndex(!0), m = o.getEnd();
      if (_ === 0 && v >= m || _ >= m && v === 0)
        return h;
    }
    return n.speed;
  }
  return {
    mount: c,
    start: u,
    cancel: f
  };
}
var lk = /* @__PURE__ */ function() {
  function e(n, r) {
    this.event = xe(), this.Components = {}, this.state = cC(ur), this.splides = [], this._o = {}, this._E = {};
    var o = Tn(n) ? vp(document, n) : n;
    jr(o, o + " is invalid."), this.root = o, r = _n({
      label: At(o, wt) || "",
      labelledby: At(o, xs) || ""
    }, ak, e.defaults, r || {});
    try {
      _n(r, JSON.parse(At(o, Ls)));
    } catch {
      jr(!1, "Invalid JSON");
    }
    this._o = Object.create(_n({}, r));
  }
  var t = e.prototype;
  return t.mount = function(r, o) {
    var a = this, i = this.state, l = this.Components;
    jr(i.is([ur, fa]), "Already mounted!"), i.set(ur), this._C = l, this._T = o || this._T || (this.is(Oo) ? ik : sk), this._E = r || this._E;
    var s = oo({}, rk, this._E, {
      Transition: this._T
    });
    return Fn(s, function(c, u) {
      var f = c(a, l, a._o);
      l[u] = f, f.setup && f.setup();
    }), Fn(l, function(c) {
      c.mount && c.mount();
    }), this.emit(Zn), Bt(this.root, EC), i.set(Cr), this.emit(Lc), this;
  }, t.sync = function(r) {
    return this.splides.push({
      splide: r
    }), r.splides.push({
      splide: this,
      isParent: !0
    }), this.state.is(Cr) && (this._C.Sync.remount(), r.Components.Sync.remount()), this;
  }, t.go = function(r) {
    return this._C.Controller.go(r), this;
  }, t.on = function(r, o) {
    return this.event.on(r, o), this;
  }, t.off = function(r) {
    return this.event.off(r), this;
  }, t.emit = function(r) {
    var o;
    return (o = this.event).emit.apply(o, [r].concat(An(arguments, 1))), this;
  }, t.add = function(r, o) {
    return this._C.Slides.add(r, o), this;
  }, t.remove = function(r) {
    return this._C.Slides.remove(r), this;
  }, t.is = function(r) {
    return this._o.type === r;
  }, t.refresh = function() {
    return this.emit(We), this;
  }, t.destroy = function(r) {
    r === void 0 && (r = !0);
    var o = this.event, a = this.state;
    return a.is(ur) ? xe(this).on(Lc, this.destroy.bind(this, r)) : (Fn(this._C, function(i) {
      i.destroy && i.destroy(r);
    }, !0), o.emit(bp), o.destroy(), r && on(this.splides), a.set(fa)), this;
  }, qT(e, [{
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
}(), Hs = lk;
Hs.defaults = {};
Hs.STATES = zT;
const ck = { class: "splide__track th-splide__track" }, uk = { class: "splide__list th-splide__list" }, dk = /* @__PURE__ */ me({
  __name: "SliderComponent",
  setup(e) {
    const t = ne(null);
    return rt(() => {
      t.value && new Hs(".th-splide", {
        pagination: !1
      }).mount();
    }), (n, r) => (B(), X("div", {
      ref_key: "splide",
      ref: t,
      class: "th-splide splide"
    }, [
      W("div", ck, [
        W("ul", uk, [
          Jn(n.$slots, "default", {}, void 0, !0)
        ])
      ])
    ], 512));
  }
}), fk = /* @__PURE__ */ _e(dk, [["__scopeId", "data-v-405fedba"]]), Up = Sn("upsell-modal", () => {
  const e = ne(null), t = se(() => e.value), n = (o) => e.value = o, r = () => e.value = null;
  return qe(t, (o) => {
    window.dispatchEvent(
      new CustomEvent(o ? "th:upsellPopupOpen" : "th:upsellPopupClose")
    );
  }), {
    upsellProduct: e,
    isOpen: t,
    close: r,
    showUpsellModal: n
  };
}), pk = {
  key: 0,
  class: "th-upsell-modal__body"
}, hk = ["src"], mk = { class: "th-upsell-modal__content" }, vk = { class: "th-upsell-modal__header" }, gk = {
  key: 0,
  class: "th-upsell-modal__product-promo"
}, _k = { class: "th-upsell-modal__product-title" }, yk = { class: "th-upsell-modal__product-body__heading" }, bk = ["innerHTML"], Ek = /* @__PURE__ */ me({
  __name: "UpsellModal",
  emits: ["close"],
  setup(e, { emit: t }) {
    const { upsellProduct: n } = Gr(Up()), r = t, o = () => {
      r("close");
    }, a = (i) => {
      !i.isTrusted || i.code !== "Escape" || o();
    };
    return rt(() => {
      window.addEventListener("keydown", a);
    }), ga(() => {
      window.removeEventListener("keydown", a);
    }), (i, l) => K(n) ? (B(), X("div", pk, [
      q(cs, { toggle: o }, {
        default: we(() => [
          K(n).images.length > 0 ? (B(), ue(fk, {
            key: 0,
            class: "th-upsell-modal__images"
          }, {
            default: we(() => [
              (B(!0), X(Ie, null, ot(K(n).images, (s) => (B(), X("img", {
                key: s,
                src: s,
                class: "th-splide__slide splide__slide"
              }, null, 8, hk))), 128))
            ]),
            _: 1
          })) : ae("", !0),
          W("div", mk, [
            W("div", vk, [
              K(n).promoText ? (B(), X("div", gk, ie(K(n).promoText), 1)) : ae("", !0),
              K(n).duration || K(n).rating ? (B(), ue(If, {
                key: 1,
                "bookings-count": K(n).bookingsCount,
                duration: K(n).duration,
                rating: K(n).rating,
                class: "th-upsell-modal__meta"
              }, null, 8, ["bookings-count", "duration", "rating"])) : ae("", !0)
            ]),
            W("h1", _k, ie(K(n).title), 1),
            (B(!0), X(Ie, null, ot(K(n).content, (s) => (B(), X("div", {
              key: s.heading,
              class: "th-upsell-modal__product-body"
            }, [
              W("div", yk, ie(s.heading), 1),
              W("div", {
                class: "th-upsell-modal__product-body__html",
                innerHTML: s.content
              }, null, 8, bk)
            ]))), 128))
          ])
        ]),
        _: 1
      })
    ])) : ae("", !0);
  }
}), wk = /* @__PURE__ */ _e(Ek, [["__scopeId", "data-v-3ada2304"]]);
var Tk = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Ck = { class: "th-default" }, kk = da.isDesktop, Sk = /* @__PURE__ */ me({
  __name: "App",
  props: {
    api: {},
    siteTitle: {},
    token: { default: "" },
    emptyCartBrowseLink: {},
    resultTicketsLink: {},
    currencies: { default: () => [
      {
        code: "EUR",
        symbol: "€",
        description: "Euro",
        rate: 1
      }
    ] },
    currencyApiUrl: {},
    language: {},
    products: { default: () => [] },
    detailedCartItemCategory: { type: Boolean, default: !1 },
    editCartItemEnabled: { type: Boolean, default: !0 },
    quickProductEditing: { type: Boolean, default: !1 },
    messages: {},
    craftApi: {},
    paymentMethods: { default: () => [] },
    upgrades: { type: Boolean, default: !1 }
  },
  setup(e) {
    var d;
    const { open: t } = zn(), { locale: n } = Pe(), r = gh(), o = e, a = lt(), i = bn(), l = ka(), s = Up(), c = () => {
      const v = o.currencies.length === 1 && o.currencies[0].rate.toString() === "1";
      t_(
        o.api,
        o.language,
        o.currencyApiUrl,
        a.cartId,
        v,
        o.token,
        o.craftApi
      ), window.dispatchEvent(new CustomEvent("th:apiIsReady"));
    };
    a.$subscribe(() => {
      c(), window.dispatchEvent(new CustomEvent("th:apiIsUpdated"));
    }), window.ticketHub = {
      editCartItemEnabled: o.editCartItemEnabled,
      detailedCartItemCategory: o.detailedCartItemCategory,
      setCurrency: i.setCurrency,
      emptyCartLink: o.emptyCartBrowseLink,
      language: o.language,
      render: (d = lp.methods) == null ? void 0 : d.render,
      products: o.products,
      paymentMethods: o.paymentMethods,
      siteTitle: o.siteTitle,
      resultTicketsLink: o.resultTicketsLink,
      selectedCurrency: i.currentCurrency
    }, typeof r.loader < "u" && (window.ticketHub.loaderComponent = r.loader), typeof o.messages < "u" && (/* @__PURE__ */ new Set([
      ...Jt.global.availableLocales,
      ...Object.keys(o.messages)
    ])).forEach((h) => {
      const _ = Jt.global.getLocaleMessage(h);
      Jt.global.setLocaleMessage(
        h,
        cp(_, o.messages[h])
      );
    }), window.ticketHub.translations = Jt.global.messages;
    const u = () => {
      if (typeof Tr.getQueryParamFromString(
        window.location.search,
        "cartItemId"
      ) < "u") {
        if (+Tk.VITE_DEBUG && console.log("product editing"), o.quickProductEditing) {
          const h = document.querySelector(".th-quick-buy__button");
          h && h.click();
          return;
        }
        if (kk())
          return;
        t();
      }
    }, f = () => {
      setTimeout(() => {
        const v = document.querySelectorAll(".th-gtm-product"), h = [];
        v.forEach((_) => {
          const { itemId: m, price: p, title: g } = _.dataset;
          p && g && m && h.push({
            item_id: m,
            item_name: g,
            price: Number(p)
          });
        }), _r.viewItemList(h);
      }, 0);
    };
    return rt(async () => {
      window.dispatchEvent(new CustomEvent("th:pluginIsMounted"));
      try {
        c();
        const v = a.cart.customerInfo;
        n.value !== o.language && (n.value = o.language), v.culture !== n.value ? a.cartId ? await a.updateCustomerInfo({
          ...v,
          culture: o.language
        }) : await a.getCart() : await a.getCart(), await i.setCurrencies(o.currencies);
      } catch {
        await a.getCart();
      }
      window.dispatchEvent(new CustomEvent("th:pluginIsReady")), f(), u();
    }), (v, h) => {
      const _ = ou("RouterView");
      return B(), X("div", Ck, [
        q(A1),
        q(_),
        q(nu, {
          duration: 300,
          name: "dialog"
        }, {
          default: we(() => [
            K(s).isOpen ? (B(), ue(wk, {
              key: 0,
              onClose: K(s).close
            }, null, 8, ["onClose"])) : ae("", !0),
            K(l).isOpen ? (B(), ue(v1, {
              key: 1,
              "empty-cart-browse-link": o.emptyCartBrowseLink
            }, null, 8, ["empty-cart-browse-link"])) : ae("", !0)
          ]),
          _: 1
        }),
        q(T1),
        q(UT)
      ]);
    };
  }
}), Ik = Sn(
  "routes",
  () => {
    const e = ne(null), t = ne(null), n = (o) => {
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
), Dk = /* @__PURE__ */ me({
  __name: "PageCloseButton",
  setup(e) {
    const t = mo(), n = Ik(), r = [];
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
    return (i, l) => (B(), X("button", {
      type: "button",
      onClick: a
    }, [
      Jn(i.$slots, "default")
    ]));
  }
}), Ok = /* @__PURE__ */ me({
  __name: "QuickBuyButton",
  props: {
    product: {}
  },
  setup(e) {
    const t = zn(), n = e;
    return (r, o) => (B(), X("div", {
      class: "th-quick-buy__button",
      onClick: o[0] || (o[0] = Ue((a) => K(t).setQuickBuyProduct(n.product), ["prevent", "stop"]))
    }, [
      Jn(r.$slots, "default")
    ]));
  }
}), Pk = { class: "th-currency__symbol" }, Ak = {
  key: 0,
  class: "th-currency__title"
}, Nk = /* @__PURE__ */ me({
  __name: "CurrencyComponent",
  props: {
    showTitle: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, { current: n } = Gr(bn()), { open: r } = Bi();
    return (o, a) => (B(), X("button", {
      class: "th-currency",
      type: "button",
      onClick: a[0] || (a[0] = //@ts-ignore
      (...i) => K(r) && K(r)(...i))
    }, [
      W("span", Pk, ie(K(n).symbol), 1),
      t.showTitle ? (B(), X("span", Ak, ie(K(n).description), 1)) : ae("", !0)
    ]));
  }
}), Lk = /* @__PURE__ */ _e(Nk, [["__scopeId", "data-v-546b5f6c"]]);
var Fp = { exports: {} };
(function(e, t) {
  (function(n, r) {
    r();
  })(hn, function() {
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
    var i = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof hn == "object" && hn.global === hn ? hn : void 0, l = i.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), s = i.saveAs || (typeof window != "object" || window !== i ? function() {
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
      var v = c.type === "application/octet-stream", h = /constructor/i.test(i.HTMLElement) || i.safari, _ = /CriOS\/[\d]+/.test(navigator.userAgent);
      if ((_ || v && h || l) && typeof FileReader < "u") {
        var m = new FileReader();
        m.onloadend = function() {
          var S = m.result;
          S = _ ? S : S.replace(/^data:[^;]*;/, "data:attachment/file;"), d ? d.location.href = S : location = S, d = null;
        }, m.readAsDataURL(c);
      } else {
        var p = i.URL || i.webkitURL, g = p.createObjectURL(c);
        d ? d.location = g : location.href = g, d = null, setTimeout(function() {
          p.revokeObjectURL(g);
        }, 4e4);
      }
    });
    i.saveAs = s.saveAs = s, e.exports = s;
  });
})(Fp);
var Rk = Fp.exports;
const $k = { class: "th-result__content" }, Mk = { class: "th-result__title" }, xk = ["innerHTML"], Bk = {
  key: 0,
  class: "th-result__hint"
}, Vk = { class: "th-result__actions" }, Uk = Zr.downloadTickets, Fk = /* @__PURE__ */ me({
  __name: "ResultComponent",
  setup(e) {
    const { t } = Pe(), n = lt(), { showErrorToast: r } = vo(), o = kf(), a = ne(!0), i = ne(n.cart), l = ne(t("payment.enjoyYourTrip")), s = ne(!1), c = ne(""), u = ne(0), f = ne(""), d = ne(!0), v = ne(!1), h = se(() => ss.includes(i.value.status)), _ = async () => {
      if (d.value)
        try {
          if (s.value && !h.value && await g(), h.value)
            d.value = !1;
          else
            throw Error("ticketsNotAvailable");
        } catch {
          setTimeout(() => {
            _();
          }, 1e3);
        }
    }, m = async (b) => {
      switch (b && (l.value = t(`payment.${b == null ? void 0 : b.resultCode}`), f.value = b.merchantReference), b.resultCode) {
        case "Authorised":
        case "Rebooked":
          n.cartId === o.query.cartId && await n.createNewCart(), s.value = !0, l.value = (b == null ? void 0 : b.resultCode) === "Rebooked" ? t(`payment.${b == null ? void 0 : b.resultCode}`) : t("payment.enjoyYourTrip"), c.value = t("payment.thankForPurchase", {
            email: i.value.customerInfo.email
          }), await _r.purchase(
            b.merchantReference || i.value.cartId,
            i.value
          ), await _();
          break;
        case "Pending":
          c.value = t("payment.paymentIsPending", {
            email: i.value.customerInfo.email
          }), setTimeout(() => {
            p();
          }, 1e4);
          break;
        default:
          l.value = t("payment.errorOccurred"), s.value = !1;
          break;
      }
    }, p = async () => {
      let b = null;
      try {
        if (o.query.isFree)
          b = { resultCode: "Authorised" }, o.query.rebooked && (b = { resultCode: "Rebooked" });
        else if (o.query.redirectResult) {
          const w = o.query.redirectResult;
          b = await Zr.getDetails(w);
        } else
          b = o.query;
      } catch {
        alert("error");
      }
      await m(b), a.value = !1;
    }, g = async () => {
      i.value = await dt.getCart(
        o.query.cartId || n.cartId
      );
    }, S = se(() => {
      var b, w;
      return ((b = window.ticketHub) == null ? void 0 : b.resultTicketsLink) ?? ((w = window.ticketHub) == null ? void 0 : w.emptyCartLink);
    }), O = async () => {
      try {
        d.value = !0;
        const { blob: b } = await Uk(i.value.cartId);
        Rk.saveAs(b, `${f.value}.pdf`);
      } catch (b) {
        b instanceof Ot && r();
      } finally {
        d.value = !1;
      }
    }, L = async () => {
      v.value || (v.value = !0, await g(), await p(), setTimeout(() => {
        h.value || (d.value = !1, clearInterval(u.value));
      }, 6e4));
    };
    return rt(() => {
      if (Tr.replaceLangSwitcher(), typeof o.name > "u") {
        window.addEventListener("th:apiIsReady", L);
        return;
      }
      L();
    }), ga(() => {
      typeof o.name > "u" && window.addEventListener("th:apiIsReady", L);
    }), (b, w) => a.value ? ae("", !0) : (B(), X("div", {
      key: 0,
      class: Ee([{
        "th-result__container_success": s.value,
        "th-result__container_error": !s.value
      }, "th-result__container"])
    }, [
      W("div", $k, [
        W("h1", Mk, ie(l.value), 1),
        W("p", {
          class: "th-result__description",
          innerHTML: c.value
        }, null, 8, xk),
        s.value ? (B(), X("p", Bk, ie(K(t)("payment.success")), 1)) : ae("", !0)
      ]),
      W("div", Vk, [
        s.value ? ae("", !0) : (B(), ue(tt, {
          key: 0,
          to: { name: "payment" },
          bg: "accent",
          tag: "router-link"
        }, {
          default: we(() => [
            Je(ie(K(t)("payment.back")), 1)
          ]),
          _: 1
        })),
        s.value ? (B(), ue(tt, {
          key: 1,
          disabled: !h.value,
          loading: d.value,
          bg: "accent",
          onClick: O
        }, {
          default: we(() => [
            Je(ie(K(t)("payment.downloadTickets")), 1)
          ]),
          _: 1
        }, 8, ["disabled", "loading"])) : ae("", !0),
        q(tt, {
          to: S.value,
          tag: "a"
        }, {
          default: we(() => [
            Je(ie(K(t)("payment.moreActivities")), 1)
          ]),
          _: 1
        }, 8, ["to"])
      ])
    ], 2));
  }
}), Hk = /* @__PURE__ */ _e(Fk, [["__scopeId", "data-v-8e1bb523"]]), Gi = {
  ThCart: Sk,
  ThCartButton: ap,
  ThCartCount: ip,
  ThPageCloseButton: Dk,
  ThProduct: Is,
  ThQuickBuyButton: Ok,
  ThBookButton: sp,
  ThPrice: st,
  ThCurrency: Lk,
  ThRender: lp,
  ThPaymentResult: Hk
}, Yk = (e = "") => [
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
], jk = (e = "/", t = !1, n = !1) => {
  const r = Yk(e);
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
  }), Ny({
    history: Y_(),
    routes: r,
    strict: !1,
    scrollBehavior(o) {
      if (!o.hash)
        return { top: 0 };
    }
  });
}, Wk = (e, t, n = !1, r = !1) => {
  const o = jk(t, n, r);
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
function qk(e) {
  return typeof e == "object" && e !== null;
}
function Hc(e, t) {
  return e = qk(e) ? e : /* @__PURE__ */ Object.create(null), new Proxy(e, {
    get(n, r, o) {
      return r === "key" ? Reflect.get(n, r, o) : Reflect.get(n, r, o) || Reflect.get(t, r, o);
    }
  });
}
function Gk(e, t) {
  return t.reduce((n, r) => n == null ? void 0 : n[r], e);
}
function zk(e, t, n) {
  return t.slice(0, -1).reduce((r, o) => /^(__proto__)$/.test(o) ? {} : r[o] = r[o] || {}, e)[t[t.length - 1]] = n, e;
}
function Xk(e, t) {
  return t.reduce((n, r) => {
    const o = r.split(".");
    return zk(n, o, Gk(e, o));
  }, {});
}
function Kk(e, t) {
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
function Yc(e, { storage: t, serializer: n, key: r, debug: o }) {
  try {
    const a = t == null ? void 0 : t.getItem(r);
    a && e.$patch(n == null ? void 0 : n.deserialize(a));
  } catch (a) {
    o && console.error("[pinia-plugin-persistedstate]", a);
  }
}
function jc(e, { storage: t, serializer: n, key: r, paths: o, debug: a }) {
  try {
    const i = Array.isArray(o) ? Xk(e, o) : e;
    t.setItem(r, n.serialize(i));
  } catch (i) {
    a && console.error("[pinia-plugin-persistedstate]", i);
  }
}
function Jk(e = {}) {
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
    const i = (Array.isArray(r) ? r.map((l) => Hc(l, e)) : [Hc(r, e)]).map(Kk(e, o)).filter(Boolean);
    o.$persist = () => {
      i.forEach((l) => {
        jc(o.$state, l);
      });
    }, o.$hydrate = ({ runHooks: l = !0 } = {}) => {
      i.forEach((s) => {
        const { beforeRestore: c, afterRestore: u } = s;
        l && (c == null || c(t)), Yc(o, s), l && (u == null || u(t));
      });
    }, i.forEach((l) => {
      const { beforeRestore: s, afterRestore: c } = l;
      s == null || s(t), Yc(o, l), c == null || c(t), o.$subscribe(
        (u, f) => {
          jc(f, l);
        },
        {
          detached: !0
        }
      );
    });
  };
}
var Zk = Jk();
function Qk(e) {
  return e && typeof e.then == "function";
}
Promise.resolve(!1);
Promise.resolve(!0);
var Hn = Promise.resolve();
function Hp(e, t) {
  return e || (e = 0), new Promise(function(n) {
    return setTimeout(function() {
      return n(t);
    }, e);
  });
}
function eS(e, t) {
  return Math.floor(Math.random() * (t - e + 1) + e);
}
function Ys() {
  return Math.random().toString(36).substring(2);
}
var pi = 0;
function Po() {
  var e = Date.now() * 1e3;
  return e <= pi && (e = pi + 1), pi = e, e;
}
var tS = Po, nS = "native";
function rS(e) {
  var t = {
    time: Po(),
    messagesCallback: null,
    bc: new BroadcastChannel(e),
    subFns: []
    // subscriberFunctions
  };
  return t.bc.onmessage = function(n) {
    t.messagesCallback && t.messagesCallback(n.data);
  }, t;
}
function oS(e) {
  e.bc.close(), e.subFns = [];
}
function aS(e, t) {
  try {
    return e.bc.postMessage(t, !1), Hn;
  } catch (n) {
    return Promise.reject(n);
  }
}
function iS(e, t) {
  e.messagesCallback = t;
}
function sS() {
  if (typeof globalThis < "u" && globalThis.Deno && globalThis.Deno.args)
    return !0;
  if ((typeof window < "u" || typeof self < "u") && typeof BroadcastChannel == "function") {
    if (BroadcastChannel._pubkey)
      throw new Error("BroadcastChannel: Do not overwrite window.BroadcastChannel with this module, this is not a polyfill");
    return !0;
  } else
    return !1;
}
function lS() {
  return 150;
}
var cS = {
  create: rS,
  close: oS,
  onMessage: iS,
  postMessage: aS,
  canBeUsed: sS,
  type: nS,
  averageResponseTime: lS,
  microSeconds: tS
};
class Yp {
  constructor(t) {
    oe(this, "ttl");
    oe(this, "map", /* @__PURE__ */ new Map());
    /**
     * Creating calls to setTimeout() is expensive,
     * so we only do that if there is not timeout already open.
     */
    oe(this, "_to", !1);
    this.ttl = t;
  }
  has(t) {
    return this.map.has(t);
  }
  add(t) {
    this.map.set(t, jp()), this._to || (this._to = !0, setTimeout(() => {
      this._to = !1, uS(this);
    }, 0));
  }
  clear() {
    this.map.clear();
  }
}
function uS(e) {
  const t = jp() - e.ttl, n = e.map[Symbol.iterator]();
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
function jp() {
  return Date.now();
}
function js() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = JSON.parse(JSON.stringify(e));
  return typeof t.webWorkerSupport > "u" && (t.webWorkerSupport = !0), t.idb || (t.idb = {}), t.idb.ttl || (t.idb.ttl = 1e3 * 45), t.idb.fallbackInterval || (t.idb.fallbackInterval = 150), e.idb && typeof e.idb.onclose == "function" && (t.idb.onclose = e.idb.onclose), t.localstorage || (t.localstorage = {}), t.localstorage.removeTimeout || (t.localstorage.removeTimeout = 1e3 * 60), e.methods && (t.methods = e.methods), t.node || (t.node = {}), t.node.ttl || (t.node.ttl = 1e3 * 60 * 2), t.node.maxParallelWrites || (t.node.maxParallelWrites = 2048), typeof t.node.useFastPath > "u" && (t.node.useFastPath = !0), t;
}
var dS = Po, fS = "pubkey.broadcast-channel-0-", an = "messages", qa = {
  durability: "relaxed"
}, pS = "idb";
function Wp() {
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
function Ws(e) {
  e.commit && e.commit();
}
function hS(e) {
  var t = Wp(), n = fS + e, r = t.open(n);
  return r.onupgradeneeded = function(o) {
    var a = o.target.result;
    a.createObjectStore(an, {
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
function mS(e, t, n) {
  var r = Date.now(), o = {
    uuid: t,
    time: r,
    data: n
  }, a = e.transaction([an], "readwrite", qa);
  return new Promise(function(i, l) {
    a.oncomplete = function() {
      return i();
    }, a.onerror = function(c) {
      return l(c);
    };
    var s = a.objectStore(an);
    s.add(o), Ws(a);
  });
}
function vS(e, t) {
  var n = e.transaction(an, "readonly", qa), r = n.objectStore(an), o = [], a = IDBKeyRange.bound(t + 1, 1 / 0);
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
      d ? d.value.id < t + 1 ? d.continue(t + 1) : (o.push(d.value), d.continue()) : (Ws(n), s(o));
    };
  });
}
function gS(e, t) {
  if (e.closed)
    return Promise.resolve([]);
  var n = e.db.transaction(an, "readwrite", qa), r = n.objectStore(an);
  return Promise.all(t.map(function(o) {
    var a = r.delete(o);
    return new Promise(function(i) {
      a.onsuccess = function() {
        return i();
      };
    });
  }));
}
function _S(e, t) {
  var n = Date.now() - t, r = e.transaction(an, "readonly", qa), o = r.objectStore(an), a = [];
  return new Promise(function(i) {
    o.openCursor().onsuccess = function(l) {
      var s = l.target.result;
      if (s) {
        var c = s.value;
        c.time < n ? (a.push(c), s.continue()) : (Ws(r), i(a));
      } else
        i(a);
    };
  });
}
function yS(e) {
  return _S(e.db, e.options.idb.ttl).then(function(t) {
    return gS(e, t.map(function(n) {
      return n.id;
    }));
  });
}
function bS(e, t) {
  return t = js(t), hS(e).then(function(n) {
    var r = {
      closed: !1,
      lastCursorId: 0,
      channelName: e,
      options: t,
      uuid: Ys(),
      /**
       * emittedMessagesIds
       * contains all messages that have been emitted before
       * @type {ObliviousSet}
       */
      eMIs: new Yp(t.idb.ttl * 2),
      // ensures we do not read messages in parallel
      writeBlockPromise: Hn,
      messagesCallback: null,
      readQueuePromises: [],
      db: n
    };
    return n.onclose = function() {
      r.closed = !0, t.idb.onclose && t.idb.onclose();
    }, qp(r), r;
  });
}
function qp(e) {
  e.closed || Gp(e).then(function() {
    return Hp(e.options.idb.fallbackInterval);
  }).then(function() {
    return qp(e);
  });
}
function ES(e, t) {
  return !(e.uuid === t.uuid || t.eMIs.has(e.id) || e.data.time < t.messagesCallbackTime);
}
function Gp(e) {
  return e.closed || !e.messagesCallback ? Hn : vS(e.db, e.lastCursorId).then(function(t) {
    var n = t.filter(function(r) {
      return !!r;
    }).map(function(r) {
      return r.id > e.lastCursorId && (e.lastCursorId = r.id), r;
    }).filter(function(r) {
      return ES(r, e);
    }).sort(function(r, o) {
      return r.time - o.time;
    });
    return n.forEach(function(r) {
      e.messagesCallback && (e.eMIs.add(r.id), e.messagesCallback(r.data));
    }), Hn;
  });
}
function wS(e) {
  e.closed = !0, e.db.close();
}
function TS(e, t) {
  return e.writeBlockPromise = e.writeBlockPromise.then(function() {
    return mS(e.db, e.uuid, t);
  }).then(function() {
    eS(0, 10) === 0 && yS(e);
  }), e.writeBlockPromise;
}
function CS(e, t, n) {
  e.messagesCallbackTime = n, e.messagesCallback = t, Gp(e);
}
function kS() {
  return !!Wp();
}
function SS(e) {
  return e.idb.fallbackInterval * 2;
}
var IS = {
  create: bS,
  close: wS,
  onMessage: CS,
  postMessage: TS,
  canBeUsed: kS,
  type: pS,
  averageResponseTime: SS,
  microSeconds: dS
}, DS = Po, OS = "pubkey.broadcastChannel-", PS = "localstorage";
function zp() {
  var e;
  if (typeof window > "u")
    return null;
  try {
    e = window.localStorage, e = window["ie8-eventlistener/storage"] || window.localStorage;
  } catch {
  }
  return e;
}
function Xp(e) {
  return OS + e;
}
function AS(e, t) {
  return new Promise(function(n) {
    Hp().then(function() {
      var r = Xp(e.channelName), o = {
        token: Ys(),
        time: Date.now(),
        data: t,
        uuid: e.uuid
      }, a = JSON.stringify(o);
      zp().setItem(r, a);
      var i = document.createEvent("Event");
      i.initEvent("storage", !0, !0), i.key = r, i.newValue = a, window.dispatchEvent(i), n();
    });
  });
}
function NS(e, t) {
  var n = Xp(e), r = function(a) {
    a.key === n && t(JSON.parse(a.newValue));
  };
  return window.addEventListener("storage", r), r;
}
function LS(e) {
  window.removeEventListener("storage", e);
}
function RS(e, t) {
  if (t = js(t), !Kp())
    throw new Error("BroadcastChannel: localstorage cannot be used");
  var n = Ys(), r = new Yp(t.localstorage.removeTimeout), o = {
    channelName: e,
    uuid: n,
    eMIs: r
    // emittedMessagesIds
  };
  return o.listener = NS(e, function(a) {
    o.messagesCallback && a.uuid !== n && (!a.token || r.has(a.token) || a.data.time && a.data.time < o.messagesCallbackTime || (r.add(a.token), o.messagesCallback(a.data)));
  }), o;
}
function $S(e) {
  LS(e.listener);
}
function MS(e, t, n) {
  e.messagesCallbackTime = n, e.messagesCallback = t;
}
function Kp() {
  var e = zp();
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
function xS() {
  var e = 120, t = navigator.userAgent.toLowerCase();
  return t.includes("safari") && !t.includes("chrome") ? e * 2 : e;
}
var BS = {
  create: RS,
  close: $S,
  onMessage: MS,
  postMessage: AS,
  canBeUsed: Kp,
  type: PS,
  averageResponseTime: xS,
  microSeconds: DS
}, Jp = Po, VS = "simulate", qs = /* @__PURE__ */ new Set();
function US(e) {
  var t = {
    time: Jp(),
    name: e,
    messagesCallback: null
  };
  return qs.add(t), t;
}
function FS(e) {
  qs.delete(e);
}
var Zp = 5;
function HS(e, t) {
  return new Promise(function(n) {
    return setTimeout(function() {
      var r = Array.from(qs);
      r.forEach(function(o) {
        o.name === e.name && // has same name
        o !== e && o.messagesCallback && // has subscribers
        o.time < t.time && o.messagesCallback(t);
      }), n();
    }, Zp);
  });
}
function YS(e, t) {
  e.messagesCallback = t;
}
function jS() {
  return !0;
}
function WS() {
  return Zp;
}
var qS = {
  create: US,
  close: FS,
  onMessage: YS,
  postMessage: HS,
  canBeUsed: jS,
  type: VS,
  averageResponseTime: WS,
  microSeconds: Jp
}, Wc = [
  cS,
  // fastest
  IS,
  BS
];
function GS(e) {
  var t = [].concat(e.methods, Wc).filter(Boolean);
  if (e.type) {
    if (e.type === "simulate")
      return qS;
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
  throw new Error("No usable method found in " + JSON.stringify(Wc.map(function(o) {
    return o.type;
  })));
}
var Qp = /* @__PURE__ */ new Set(), zS = 0, Gs = function(t, n) {
  this.id = zS++, Qp.add(this), this.name = t, qc && (n = qc), this.options = js(n), this.method = GS(this.options), this._iL = !1, this._onML = null, this._addEL = {
    message: [],
    internal: []
  }, this._uMP = /* @__PURE__ */ new Set(), this._befC = [], this._prepP = null, XS(this);
};
Gs._pubkey = !0;
var qc;
Gs.prototype = {
  postMessage: function(t) {
    if (this.closed)
      throw new Error("BroadcastChannel.postMessage(): Cannot post message after channel has closed " + /**
       * In the past when this error appeared, it was really hard to debug.
       * So now we log the msg together with the error so it at least
       * gives some clue about where in your application this happens.
       */
      JSON.stringify(t));
    return Gc(this, "message", t);
  },
  postInternal: function(t) {
    return Gc(this, "internal", t);
  },
  set onmessage(e) {
    var t = this.method.microSeconds(), n = {
      time: t,
      fn: e
    };
    Xc(this, "message", this._onML), e && typeof e == "function" ? (this._onML = n, zc(this, "message", n)) : this._onML = null;
  },
  addEventListener: function(t, n) {
    var r = this.method.microSeconds(), o = {
      time: r,
      fn: n
    };
    zc(this, t, o);
  },
  removeEventListener: function(t, n) {
    var r = this._addEL[t].find(function(o) {
      return o.fn === n;
    });
    Xc(this, t, r);
  },
  close: function() {
    var t = this;
    if (!this.closed) {
      Qp.delete(this), this.closed = !0;
      var n = this._prepP ? this._prepP : Hn;
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
function Gc(e, t, n) {
  var r = e.method.microSeconds(), o = {
    time: r,
    type: t,
    data: n
  }, a = e._prepP ? e._prepP : Hn;
  return a.then(function() {
    var i = e.method.postMessage(e._state, o);
    return e._uMP.add(i), i.catch().then(function() {
      return e._uMP.delete(i);
    }), i;
  });
}
function XS(e) {
  var t = e.method.create(e.name, e.options);
  Qk(t) ? (e._prepP = t, t.then(function(n) {
    e._state = n;
  })) : e._state = t;
}
function eh(e) {
  return e._addEL.message.length > 0 || e._addEL.internal.length > 0;
}
function zc(e, t, n) {
  e._addEL[t].push(n), KS(e);
}
function Xc(e, t, n) {
  e._addEL[t] = e._addEL[t].filter(function(r) {
    return r !== n;
  }), JS(e);
}
function KS(e) {
  if (!e._iL && eh(e)) {
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
function JS(e) {
  if (e._iL && !eh(e)) {
    e._iL = !1;
    var t = e.method.microSeconds();
    e.method.onMessage(e._state, null, t);
  }
}
function Kc(e, t = { serialize: JSON.stringify, deserialize: JSON.parse }) {
  return t.deserialize(t.serialize(e));
}
function ZS(e, t) {
  return Object.keys(t).includes(e);
}
function QS({
  enable: e = !0,
  initialize: t = !0,
  type: n,
  serializer: r
}) {
  return ({ store: o, options: a }) => {
    var v, h, _;
    const i = ((v = a == null ? void 0 : a.share) == null ? void 0 : v.enable) ?? e, l = ((h = a == null ? void 0 : a.share) == null ? void 0 : h.omit) ?? [];
    if (!i)
      return;
    const s = new Gs(o.$id, {
      type: n
    });
    let c = 0, u = !1;
    const f = Object.keys(o.$state).filter((m) => !l.includes(m) && ZS(m, o.$state));
    s.onmessage = (m) => {
      if (m === void 0) {
        s.postMessage({
          timestamp: c,
          state: Kc(o.$state, r)
        });
        return;
      }
      m.timestamp <= c || (u = !0, c = Date.now(), o.$patch((p) => {
        f.forEach((g) => {
          p[g] = m.state[g];
        });
      }));
    }, (((_ = a == null ? void 0 : a.share) == null ? void 0 : _.initialize) ?? t) && s.postMessage(void 0), o.$subscribe((m, p) => {
      u || (c = Date.now(), s.postMessage({
        timestamp: c,
        state: Kc(p, r)
      })), u = !1;
    });
  };
}
const zs = Zh();
zs.use(Zk);
zs.use(
  QS({
    enable: !0,
    type: "localstorage"
  })
);
var eI = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const tI = (e, t = !1) => {
  if (typeof e == "string")
    return Mg({
      id: e,
      enabled: !!e,
      debug: !!eI.VITE_DEBUG,
      loadScript: t
    });
}, th = (e, t, n = !1, r = !1, o, a = !1) => {
  e.use(Jt), e.use(
    Wk(e, t, n, r)
  ), e.use(zs), typeof o < "u" && e.use(tI(o, a));
}, nI = (e, t, n, r = !1, o = !1, a, i) => {
  var l, s, c, u, f, d, v, h, _, m;
  typeof (t == null ? void 0 : t.container) < "u" && document.querySelector(t == null ? void 0 : t.container) && ((l = document.querySelector(t == null ? void 0 : t.container)) != null && l.getAttribute("data-base-url") && (n = (s = document.querySelector(t == null ? void 0 : t.container)) == null ? void 0 : s.getAttribute("data-base-url"), n = new URL(n).pathname), (c = document.querySelector(t == null ? void 0 : t.container)) != null && c.getAttribute("data-is-custom-result-page") && (r = !!((u = document.querySelector(t == null ? void 0 : t.container)) != null && u.getAttribute("data-is-custom-result-page"))), (f = document.querySelector(t == null ? void 0 : t.container)) != null && f.getAttribute("data-upgrades") && (o = !!Number(
    (d = document.querySelector(t == null ? void 0 : t.container)) == null ? void 0 : d.getAttribute("data-upgrades")
  )), (v = document.querySelector(t == null ? void 0 : t.container)) != null && v.getAttribute("data-gtm-id") && (a = (h = document.querySelector(t == null ? void 0 : t.container)) == null ? void 0 : h.getAttribute("data-gtm-id")), (_ = document.querySelector(t == null ? void 0 : t.container)) != null && _.getAttribute("data-gtm-load-script") && (i = !!Number(
    (m = document.querySelector(t == null ? void 0 : t.container)) == null ? void 0 : m.getAttribute("data-gtm-load-script")
  ))), Object.keys(Gi).forEach((p) => {
    e.component(p, Gi[p]);
  }), th(
    e,
    n,
    r,
    o,
    a,
    i
  );
}, rI = (e, t = !1, n = !1, r, o = !1) => {
  const a = document.querySelector("#th-app") || document.querySelector(".th-app");
  a && a.getAttribute("data-base-url") && (e = a.getAttribute("data-base-url"), e = new URL(e).pathname), a && a.getAttribute("data-is-custom-result-page") && (t = !!a.getAttribute("data-is-custom-result-page")), a && a.getAttribute("data-upgrades") && (n = !!Number(a.getAttribute("data-upgrades"))), a && a.getAttribute("data-gtm-id") && (r = a.getAttribute("data-gtm-id")), a && a.getAttribute("data-gtm-load-script") && (o = !!Number(a.getAttribute("data-gtm-load-script")));
  const i = _h({ components: Gi });
  th(
    i,
    e,
    t,
    n,
    r,
    o
  ), i.mount(a);
}, Jc = "/", Zc = !1, iI = {
  install: (e, t) => {
    if (typeof e > "u") {
      rI(Jc, Zc);
      return;
    }
    nI(
      e,
      t,
      Jc,
      Zc
    );
  }
};
export {
  zb as A,
  tt as B,
  cb as C,
  Ot as F,
  _r as G,
  Zr as P,
  Hk as R,
  Tr as U,
  _e as _,
  Pe as a,
  lt as b,
  vo as c,
  mb as d,
  Eb as e,
  hn as f,
  po as g,
  he as h,
  Jt as i,
  Up as j,
  If as k,
  st as l,
  ST as m,
  aa as n,
  da as o,
  Ih as p,
  sf as q,
  lf as r,
  Pb as s,
  o1 as t,
  mo as u,
  iI as v
};
