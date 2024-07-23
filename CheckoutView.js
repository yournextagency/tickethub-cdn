import { defineComponent as me, computed as v, openBlock as b, createElementBlock as k, toDisplayString as he, createCommentVNode as P, createElementVNode as T, renderSlot as Te, getCurrentInstance as Ae, ref as x, onBeforeMount as Pe, watch as L, isRef as q, reactive as j, onBeforeUnmount as Le, unref as s, isReactive as je, isReadonly as Ie, inject as K, provide as Q, nextTick as X, onMounted as Se, createBlock as F, withCtx as I, createVNode as A, normalizeClass as V, Fragment as ee, renderList as te } from "vue";
import { P as ze } from "./PageComponent.js";
import { _ as pe, a as De, u as Me, c as Ne, b as Ue, U as Fe, G as ne, d as ae, e as re, F as He } from "./index2.js";
import { _ as qe, i as Be, U as Ge, P as We } from "./CheckoutSteps.vue_vue_type_script_async_true_setup_true_lang.js";
const Ze = { class: "th-input" }, Ye = {
  key: 0,
  class: "th-input__label"
}, Je = { class: "th-input__wrapper" }, Ke = ["disabled", "type", "value"], Qe = { class: "th-input__icon" }, Xe = /* @__PURE__ */ me({
  __name: "InputComponent",
  props: {
    value: {},
    type: { default: "text" },
    label: {},
    required: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  setup(e) {
    const a = e, n = v(() => {
      const t = a.required ? "*" : "";
      return `${a.label}${t}`;
    });
    return (t, l) => (b(), k("label", Ze, [
      t.label ? (b(), k("span", Ye, he(n.value), 1)) : P("", !0),
      T("span", Je, [
        T("input", {
          disabled: t.disabled,
          type: t.type,
          value: t.value,
          class: "th-input__element",
          onInput: l[0] || (l[0] = (d) => {
            var h;
            return t.$emit("update:modelValue", (h = d.target) == null ? void 0 : h.value);
          })
        }, null, 40, Ke),
        T("span", Qe, [
          Te(t.$slots, "default", {}, void 0, !0)
        ])
      ])
    ]));
  }
}), se = /* @__PURE__ */ pe(Xe, [["__scopeId", "data-v-5fe065de"]]);
function oe(e, a) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var t = Object.getOwnPropertySymbols(e);
    a && (t = t.filter(function(l) {
      return Object.getOwnPropertyDescriptor(e, l).enumerable;
    })), n.push.apply(n, t);
  }
  return n;
}
function w(e) {
  for (var a = 1; a < arguments.length; a++) {
    var n = arguments[a] != null ? arguments[a] : {};
    a % 2 ? oe(Object(n), !0).forEach(function(t) {
      et(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : oe(Object(n)).forEach(function(t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function et(e, a, n) {
  return a in e ? Object.defineProperty(e, a, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[a] = n, e;
}
function le(e) {
  let a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return Object.keys(e).reduce((n, t) => (a.includes(t) || (n[t] = s(e[t])), n), {});
}
function z(e) {
  return typeof e == "function";
}
function tt(e) {
  return je(e) || Ie(e);
}
function ve(e, a, n) {
  let t = e;
  const l = a.split(".");
  for (let d = 0; d < l.length; d++) {
    if (!t[l[d]])
      return n;
    t = t[l[d]];
  }
  return t;
}
function H(e, a, n) {
  return v(() => e.some((t) => ve(a, t, {
    [n]: !1
  })[n]));
}
function ie(e, a, n) {
  return v(() => e.reduce((t, l) => {
    const d = ve(a, l, {
      [n]: !1
    })[n] || [];
    return t.concat(d);
  }, []));
}
function ge(e, a, n, t) {
  return e.call(t, s(a), s(n), t);
}
function _e(e) {
  return e.$valid !== void 0 ? !e.$valid : !e;
}
function nt(e, a, n, t, l, d, h) {
  let {
    $lazy: i,
    $rewardEarly: $
  } = l, f = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : [], u = arguments.length > 8 ? arguments[8] : void 0, m = arguments.length > 9 ? arguments[9] : void 0, _ = arguments.length > 10 ? arguments[10] : void 0;
  const p = x(!!t.value), r = x(0);
  n.value = !1;
  const c = L([a, t].concat(f, _), () => {
    if (i && !t.value || $ && !m.value && !n.value)
      return;
    let o;
    try {
      o = ge(e, a, u, h);
    } catch (g) {
      o = Promise.reject(g);
    }
    r.value++, n.value = !!r.value, p.value = !1, Promise.resolve(o).then((g) => {
      r.value--, n.value = !!r.value, d.value = g, p.value = _e(g);
    }).catch((g) => {
      r.value--, n.value = !!r.value, d.value = g, p.value = !0;
    });
  }, {
    immediate: !0,
    deep: typeof a == "object"
  });
  return {
    $invalid: p,
    $unwatch: c
  };
}
function at(e, a, n, t, l, d, h, i) {
  let {
    $lazy: $,
    $rewardEarly: f
  } = t;
  const u = () => ({}), m = v(() => {
    if ($ && !n.value || f && !i.value)
      return !1;
    let _ = !0;
    try {
      const p = ge(e, a, h, d);
      l.value = p, _ = _e(p);
    } catch (p) {
      l.value = p;
    }
    return _;
  });
  return {
    $unwatch: u,
    $invalid: m
  };
}
function rt(e, a, n, t, l, d, h, i, $, f, u) {
  const m = x(!1), _ = e.$params || {}, p = x(null);
  let r, c;
  e.$async ? {
    $invalid: r,
    $unwatch: c
  } = nt(e.$validator, a, m, n, t, p, l, e.$watchTargets, $, f, u) : {
    $invalid: r,
    $unwatch: c
  } = at(e.$validator, a, n, t, p, l, $, f);
  const o = e.$message;
  return {
    $message: z(o) ? v(() => o(le({
      $pending: m,
      $invalid: r,
      $params: le(_),
      $model: a,
      $response: p,
      $validator: d,
      $propertyPath: i,
      $property: h
    }))) : o || "",
    $params: _,
    $pending: m,
    $invalid: r,
    $response: p,
    $unwatch: c
  };
}
function st() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const a = s(e), n = Object.keys(a), t = {}, l = {}, d = {};
  let h = null;
  return n.forEach((i) => {
    const $ = a[i];
    switch (!0) {
      case z($.$validator):
        t[i] = $;
        break;
      case z($):
        t[i] = {
          $validator: $
        };
        break;
      case i === "$validationGroups":
        h = $;
        break;
      case i.startsWith("$"):
        d[i] = $;
        break;
      default:
        l[i] = $;
    }
  }), {
    rules: t,
    nestedValidators: l,
    config: d,
    validationGroups: h
  };
}
const ot = "__root";
function lt(e, a, n, t, l, d, h, i, $) {
  const f = Object.keys(e), u = t.get(l, e), m = x(!1), _ = x(!1), p = x(0);
  if (u) {
    if (!u.$partial)
      return u;
    u.$unwatch(), m.value = u.$dirty.value;
  }
  const r = {
    $dirty: m,
    $path: l,
    $touch: () => {
      m.value || (m.value = !0);
    },
    $reset: () => {
      m.value && (m.value = !1);
    },
    $commit: () => {
    }
  };
  return f.length ? (f.forEach((c) => {
    r[c] = rt(e[c], a, r.$dirty, d, h, c, n, l, $, _, p);
  }), r.$externalResults = v(() => i.value ? [].concat(i.value).map((c, o) => ({
    $propertyPath: l,
    $property: n,
    $validator: "$externalResults",
    $uid: `${l}-externalResult-${o}`,
    $message: c,
    $params: {},
    $response: null,
    $pending: !1
  })) : []), r.$invalid = v(() => {
    const c = f.some((o) => s(r[o].$invalid));
    return _.value = c, !!r.$externalResults.value.length || c;
  }), r.$pending = v(() => f.some((c) => s(r[c].$pending))), r.$error = v(() => r.$dirty.value ? r.$pending.value || r.$invalid.value : !1), r.$silentErrors = v(() => f.filter((c) => s(r[c].$invalid)).map((c) => {
    const o = r[c];
    return j({
      $propertyPath: l,
      $property: n,
      $validator: c,
      $uid: `${l}-${c}`,
      $message: o.$message,
      $params: o.$params,
      $response: o.$response,
      $pending: o.$pending
    });
  }).concat(r.$externalResults.value)), r.$errors = v(() => r.$dirty.value ? r.$silentErrors.value : []), r.$unwatch = () => f.forEach((c) => {
    r[c].$unwatch();
  }), r.$commit = () => {
    _.value = !0, p.value = Date.now();
  }, t.set(l, e, r), r) : (u && t.set(l, e, r), r);
}
function it(e, a, n, t, l, d, h) {
  const i = Object.keys(e);
  return i.length ? i.reduce(($, f) => ($[f] = B({
    validations: e[f],
    state: a,
    key: f,
    parentKey: n,
    resultsCache: t,
    globalConfig: l,
    instance: d,
    externalResults: h
  }), $), {}) : {};
}
function ut(e, a, n) {
  const t = v(() => [a, n].filter((r) => r).reduce((r, c) => r.concat(Object.values(s(c))), [])), l = v({
    get() {
      return e.$dirty.value || (t.value.length ? t.value.every((r) => r.$dirty) : !1);
    },
    set(r) {
      e.$dirty.value = r;
    }
  }), d = v(() => {
    const r = s(e.$silentErrors) || [], c = t.value.filter((o) => (s(o).$silentErrors || []).length).reduce((o, g) => o.concat(...g.$silentErrors), []);
    return r.concat(c);
  }), h = v(() => {
    const r = s(e.$errors) || [], c = t.value.filter((o) => (s(o).$errors || []).length).reduce((o, g) => o.concat(...g.$errors), []);
    return r.concat(c);
  }), i = v(() => t.value.some((r) => r.$invalid) || s(e.$invalid) || !1), $ = v(() => t.value.some((r) => s(r.$pending)) || s(e.$pending) || !1), f = v(() => t.value.some((r) => r.$dirty) || t.value.some((r) => r.$anyDirty) || l.value), u = v(() => l.value ? $.value || i.value : !1), m = () => {
    e.$touch(), t.value.forEach((r) => {
      r.$touch();
    });
  }, _ = () => {
    e.$commit(), t.value.forEach((r) => {
      r.$commit();
    });
  }, p = () => {
    e.$reset(), t.value.forEach((r) => {
      r.$reset();
    });
  };
  return t.value.length && t.value.every((r) => r.$dirty) && m(), {
    $dirty: l,
    $errors: h,
    $invalid: i,
    $anyDirty: f,
    $error: u,
    $pending: $,
    $touch: m,
    $reset: p,
    $silentErrors: d,
    $commit: _
  };
}
function B(e) {
  let {
    validations: a,
    state: n,
    key: t,
    parentKey: l,
    childResults: d,
    resultsCache: h,
    globalConfig: i = {},
    instance: $,
    externalResults: f
  } = e;
  const u = l ? `${l}.${t}` : t, {
    rules: m,
    nestedValidators: _,
    config: p,
    validationGroups: r
  } = st(a), c = w(w({}, i), p), o = t ? v(() => {
    const y = s(n);
    return y ? s(y[t]) : void 0;
  }) : n, g = w({}, s(f) || {}), W = v(() => {
    const y = s(f);
    return t ? y ? s(y[t]) : void 0 : y;
  }), Z = lt(m, o, t, h, u, c, $, W, n), C = it(_, o, u, h, c, $, W), Y = {};
  r && Object.entries(r).forEach((y) => {
    let [E, R] = y;
    Y[E] = {
      $invalid: H(R, C, "$invalid"),
      $error: H(R, C, "$error"),
      $pending: H(R, C, "$pending"),
      $errors: ie(R, C, "$errors"),
      $silentErrors: ie(R, C, "$silentErrors")
    };
  });
  const {
    $dirty: D,
    $errors: xe,
    $invalid: M,
    $anyDirty: be,
    $error: Re,
    $pending: N,
    $touch: U,
    $reset: ke,
    $silentErrors: we,
    $commit: J
  } = ut(Z, C, d), Ce = t ? v({
    get: () => s(o),
    set: (y) => {
      D.value = !0;
      const E = s(n), R = s(f);
      R && (R[t] = g[t]), q(E[t]) ? E[t].value = y : E[t] = y;
    }
  }) : null;
  t && c.$autoDirty && L(o, () => {
    D.value || U();
    const y = s(f);
    y && (y[t] = g[t]);
  }, {
    flush: "sync"
  });
  async function Ee() {
    return U(), c.$rewardEarly && (J(), await X()), await X(), new Promise((y) => {
      if (!N.value)
        return y(!M.value);
      const E = L(N, () => {
        y(!M.value), E();
      });
    });
  }
  function Oe(y) {
    return (d.value || {})[y];
  }
  function Ve() {
    q(f) ? f.value = g : Object.keys(g).length === 0 ? Object.keys(f).forEach((y) => {
      delete f[y];
    }) : Object.assign(f, g);
  }
  return j(w(w(w({}, Z), {}, {
    $model: Ce,
    $dirty: D,
    $error: Re,
    $errors: xe,
    $invalid: M,
    $anyDirty: be,
    $pending: N,
    $touch: U,
    $reset: ke,
    $path: u || ot,
    $silentErrors: we,
    $validate: Ee,
    $commit: J
  }, d && {
    $getResultsForChild: Oe,
    $clearExternalResults: Ve,
    $validationGroups: Y
  }), C));
}
class ct {
  constructor() {
    this.storage = /* @__PURE__ */ new Map();
  }
  set(a, n, t) {
    this.storage.set(a, {
      rules: n,
      result: t
    });
  }
  checkRulesValidity(a, n, t) {
    const l = Object.keys(t), d = Object.keys(n);
    return d.length !== l.length || !d.every((i) => l.includes(i)) ? !1 : d.every((i) => n[i].$params ? Object.keys(n[i].$params).every(($) => s(t[i].$params[$]) === s(n[i].$params[$])) : !0);
  }
  get(a, n) {
    const t = this.storage.get(a);
    if (!t)
      return;
    const {
      rules: l,
      result: d
    } = t, h = this.checkRulesValidity(a, n, l), i = d.$unwatch ? d.$unwatch : () => ({});
    return h ? d : {
      $dirty: d.$dirty,
      $partial: !0,
      $unwatch: i
    };
  }
}
const S = {
  COLLECT_ALL: !0,
  COLLECT_NONE: !1
}, ue = Symbol("vuelidate#injectChildResults"), ce = Symbol("vuelidate#removeChildResults");
function dt(e) {
  let {
    $scope: a,
    instance: n
  } = e;
  const t = {}, l = x([]), d = v(() => l.value.reduce((u, m) => (u[m] = s(t[m]), u), {}));
  function h(u, m) {
    let {
      $registerAs: _,
      $scope: p,
      $stopPropagation: r
    } = m;
    r || a === S.COLLECT_NONE || p === S.COLLECT_NONE || a !== S.COLLECT_ALL && a !== p || (t[_] = u, l.value.push(_));
  }
  n.__vuelidateInjectInstances = [].concat(n.__vuelidateInjectInstances || [], h);
  function i(u) {
    l.value = l.value.filter((m) => m !== u), delete t[u];
  }
  n.__vuelidateRemoveInstances = [].concat(n.__vuelidateRemoveInstances || [], i);
  const $ = K(ue, []);
  Q(ue, n.__vuelidateInjectInstances);
  const f = K(ce, []);
  return Q(ce, n.__vuelidateRemoveInstances), {
    childResults: d,
    sendValidationResultsToParent: $,
    removeValidationResultsFromParent: f
  };
}
function ye(e) {
  return new Proxy(e, {
    get(a, n) {
      return typeof a[n] == "object" ? ye(a[n]) : v(() => a[n]);
    }
  });
}
let de = 0;
function ft(e, a) {
  var n;
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  arguments.length === 1 && (t = e, e = void 0, a = void 0);
  let {
    $registerAs: l,
    $scope: d = S.COLLECT_ALL,
    $stopPropagation: h,
    $externalResults: i,
    currentVueInstance: $
  } = t;
  const f = $ || ((n = Ae()) === null || n === void 0 ? void 0 : n.proxy), u = f ? f.$options : {};
  l || (de += 1, l = `_vuelidate_${de}`);
  const m = x({}), _ = new ct(), {
    childResults: p,
    sendValidationResultsToParent: r,
    removeValidationResultsFromParent: c
  } = f ? dt({
    $scope: d,
    instance: f
  }) : {
    childResults: x({})
  };
  if (!e && u.validations) {
    const o = u.validations;
    a = x({}), Pe(() => {
      a.value = f, L(() => z(o) ? o.call(a.value, new ye(a.value)) : o, (g) => {
        m.value = B({
          validations: g,
          state: a,
          childResults: p,
          resultsCache: _,
          globalConfig: t,
          instance: f,
          externalResults: i || f.vuelidateExternalResults
        });
      }, {
        immediate: !0
      });
    }), t = u.validationsConfig || t;
  } else {
    const o = q(e) || tt(e) ? e : j(e || {});
    L(o, (g) => {
      m.value = B({
        validations: g,
        state: a,
        childResults: p,
        resultsCache: _,
        globalConfig: t,
        instance: f ?? {},
        externalResults: i
      });
    }, {
      immediate: !0
    });
  }
  return f && (r.forEach((o) => o(m, {
    $registerAs: l,
    $scope: d,
    $stopPropagation: h
  })), Le(() => c.forEach((o) => o(l)))), v(() => w(w({}, s(m.value)), p.value));
}
const G = (e) => {
  if (e = s(e), Array.isArray(e))
    return !!e.length;
  if (e == null)
    return !1;
  if (e === !1)
    return !0;
  if (e instanceof Date)
    return !isNaN(e.getTime());
  if (typeof e == "object") {
    for (let a in e)
      return !0;
    return !1;
  }
  return !!String(e).length;
}, $t = (e) => (e = s(e), Array.isArray(e) ? e.length : typeof e == "object" ? Object.keys(e).length : String(e).length);
function O() {
  for (var e = arguments.length, a = new Array(e), n = 0; n < e; n++)
    a[n] = arguments[n];
  return (t) => (t = s(t), !G(t) || a.every((l) => (l.lastIndex = 0, l.test(t))));
}
O(/^[a-zA-Z]*$/);
O(/^[a-zA-Z0-9]*$/);
O(/^\d*(\.\d+)?$/);
const mt = /^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
var ht = O(mt), pt = {
  $validator: ht,
  $message: "Value is not a valid email address",
  $params: {
    type: "email"
  }
};
function vt(e) {
  return (a) => !G(a) || $t(a) <= s(e);
}
function fe(e) {
  return {
    $validator: vt(e),
    $message: (a) => {
      let {
        $params: n
      } = a;
      return `The maximum length allowed is ${n.max}`;
    },
    $params: {
      max: e,
      type: "maxLength"
    }
  };
}
function gt(e) {
  return typeof e == "string" && (e = e.trim()), G(e);
}
var $e = {
  $validator: gt,
  $message: "Value is required",
  $params: {
    type: "required"
  }
};
const _t = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
O(_t);
O(/(^[0-9]*$)|(^-[0-9]+$)/);
O(/^[-]?\d*(\.\d+)?$/);
const yt = { class: "th-checkout-details__info" }, xt = ["innerHTML"], bt = ["innerHTML"], Rt = { class: "th-checkout-details__info" }, kt = ["innerHTML"], wt = { class: "th-checkout-details__checkboxes" }, Ct = {
  key: 0,
  class: "th-checkout-details__warning"
}, Et = /* @__PURE__ */ me({
  __name: "CheckoutView",
  setup(e) {
    const { t: a } = De(), n = Me(), { showToast: t, showErrorToast: l } = Ne(), d = x({
      name: null,
      email: null,
      hasTermsAndConditionsApproved: null
    }), h = Ue();
    let i = j({
      email: "",
      name: "",
      hasTermsAndConditionsApproved: !1,
      hasSpecialOffersApproved: !1
    });
    typeof h.cart < "u" && (i = j(h.cart.customerInfo));
    const $ = {
      email: { required: $e, email: pt, maxLength: fe(60) },
      name: { required: $e, maxLength: fe(40) },
      hasTermsAndConditionsApproved: { sameAs: (r) => r }
    }, f = x(!1), u = ft($, i);
    Se(() => {
      Fe.replaceLangSwitcher(), ne.beginCheckout();
    });
    const m = v(() => {
      var r;
      return ((r = window.ticketHub) == null ? void 0 : r.siteTitle) ?? "site";
    }), _ = () => {
      var o;
      const r = u.value.$errors[0].$property, c = (o = d.value[r]) == null ? void 0 : o.$el;
      c.scrollIntoView({ behavior: "smooth", block: "center" }), c.focus("preventScroll");
    }, p = async () => {
      try {
        if (u.value.$touch(), f.value = !0, u.value.$invalid) {
          _();
          return;
        }
        if (await h.updateCustomerInfo(i), t(a("toast.customerDataHasBeenUpdated")), await ne.addPaymentInfo(), Be(n).value) {
          await n.push({ name: Ge });
          return;
        }
        await n.push({ name: We });
      } catch (r) {
        r instanceof He && l();
      } finally {
        f.value = !1;
      }
    };
    return (r, c) => (b(), F(ze, {
      "button-click-handler": p,
      loading: f.value,
      title: s(a)("checkout.personalDetails"),
      class: "th-checkout"
    }, {
      steps: I(() => [
        A(qe)
      ]),
      content: I(() => [
        A(se, {
          ref: (o) => {
            d.value.email = o;
          },
          modelValue: s(i).email,
          "onUpdate:modelValue": c[0] || (c[0] = (o) => s(i).email = o),
          class: V([{
            "th-checkout-details__input_invalid": s(u).email.$error,
            "th-checkout-details__input_valid": !s(u).email.$invalid
          }, "th-checkout-details__input"]),
          label: s(a)("checkout.email"),
          required: !0,
          value: s(i).email,
          name: "email",
          type: "email"
        }, {
          default: I(() => [
            s(u).email.$invalid ? P("", !0) : (b(), F(ae, { key: 0 }))
          ]),
          _: 1
        }, 8, ["modelValue", "class", "label", "value"]),
        T("span", yt, [
          s(u).email.$invalid ? P("", !0) : (b(), k("span", {
            key: 0,
            class: V([{
              "th-checkout-details__info_shown": !s(u).email.$invalid || s(u).email.$error
            }, "th-checkout-details__info"]),
            innerHTML: s(a)("checkout.ticketsSentTo", { email: s(i).email })
          }, null, 10, xt)),
          (b(!0), k(ee, null, te(s(u).email.$errors, (o, g) => (b(), k("span", {
            key: g,
            class: V([{
              "th-checkout-details__info_shown": !s(u).email.$invalid || s(u).email.$error
            }, "th-checkout-details__info th-checkout-details__info_red"]),
            innerHTML: o.$validator === "required" ? s(a)("checkout.emailWarning") : o.$message
          }, null, 10, bt))), 128))
        ]),
        A(se, {
          ref: (o) => {
            d.value.name = o;
          },
          modelValue: s(i).name,
          "onUpdate:modelValue": c[1] || (c[1] = (o) => s(i).name = o),
          class: V([{
            "th-checkout-details__input_invalid": s(u).name.$error,
            "th-checkout-details__input_valid": !s(u).name.$invalid
          }, "th-checkout-details__input"]),
          label: s(a)("checkout.name"),
          required: !0,
          value: s(i).name,
          name: "name"
        }, {
          default: I(() => [
            s(u).name.$invalid ? P("", !0) : (b(), F(ae, { key: 0 }))
          ]),
          _: 1
        }, 8, ["modelValue", "class", "label", "value"]),
        T("span", Rt, [
          (b(!0), k(ee, null, te(s(u).name.$errors, (o, g) => (b(), k("span", {
            key: g,
            class: V([{
              "th-checkout-details__info_shown": s(u).name.$error
            }, "th-checkout-details__info th-checkout-details__info_red"]),
            innerHTML: o.$validator === "required" ? s(a)("checkout.nameWarning") : o.$message
          }, null, 10, kt))), 128))
        ]),
        T("div", wt, [
          A(re, {
            ref: (o) => {
              d.value.hasTermsAndConditionsApproved = o;
            },
            modelValue: s(i).hasTermsAndConditionsApproved,
            "onUpdate:modelValue": c[2] || (c[2] = (o) => s(i).hasTermsAndConditionsApproved = o),
            class: V([{
              "th-checkout-details__checkbox_invalid": s(u).hasTermsAndConditionsApproved.$error
            }, "th-checkout-details__checkbox"]),
            text: s(a)("checkout.agreement")
          }, null, 8, ["modelValue", "class", "text"]),
          A(re, {
            modelValue: s(i).hasSpecialOffersApproved,
            "onUpdate:modelValue": c[3] || (c[3] = (o) => s(i).hasSpecialOffersApproved = o),
            text: s(a)("checkout.newsletter", { siteTitle: m.value }),
            class: "th-checkout-details__checkbox"
          }, null, 8, ["modelValue", "text"])
        ]),
        s(u).hasTermsAndConditionsApproved.$error ? (b(), k("div", Ct, he(s(a)("checkout.agreementWarning")), 1)) : P("", !0)
      ]),
      _: 1
    }, 8, ["loading", "title"]));
  }
}), Pt = /* @__PURE__ */ pe(Et, [["__scopeId", "data-v-fb3721ec"]]);
export {
  Pt as default
};
