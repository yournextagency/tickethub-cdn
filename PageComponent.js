import { defineComponent as O, ref as Y, onMounted as j, openBlock as o, createElementBlock as h, Fragment as N, renderList as X, normalizeStyle as rt, createStaticVNode as ct, computed as tt, onUnmounted as dt, createElementVNode as f, unref as d, pushScopeId as ut, popScopeId as lt, onBeforeUnmount as ht, renderSlot as R, createCommentVNode as $, toDisplayString as I, createBlock as H, withModifiers as G, withCtx as W, createTextVNode as q, createVNode as P } from "vue";
import { _ as F, g as mt, f as _t, h as V, b as et, a as st, o as pt, q as ft, B as J, C as vt, r as yt, s as $t, A as kt, k as gt, n as Ct } from "./index2.js";
const wt = { class: "th-payment-ways" }, bt = /* @__PURE__ */ ct('<div class="th-payment-ways__item th-payment-ways__item_mastercard" data-v-027ebc54></div><div class="th-payment-ways__item th-payment-ways__item_visa" data-v-027ebc54></div><div class="th-payment-ways__item th-payment-ways__item_amex" data-v-027ebc54></div><div class="th-payment-ways__item th-payment-ways__item_paypal" data-v-027ebc54></div><div class="th-payment-ways__item th-payment-ways__item_apple-pay" data-v-027ebc54></div><div class="th-payment-ways__item th-payment-ways__item_google-pay" data-v-027ebc54></div><div class="th-payment-ways__item th-payment-ways__item_alipay" data-v-027ebc54></div><div class="th-payment-ways__item th-payment-ways__item_klarna" data-v-027ebc54></div>', 8), Mt = /* @__PURE__ */ O({
  __name: "PaymentsComponent",
  setup(g) {
    const m = Y([]);
    return j(() => {
      var i, a, l;
      (a = (i = window.ticketHub) == null ? void 0 : i.paymentMethods) != null && a.length && (m.value = (l = window.ticketHub) == null ? void 0 : l.paymentMethods);
    }), (i, a) => (o(), h("div", wt, [
      m.value.length ? (o(!0), h(N, { key: 0 }, X(m.value, (l) => (o(), h("div", {
        key: l,
        style: rt({ backgroundImage: `url(${l})` }),
        class: "th-payment-ways__item"
      }, null, 4))), 128)) : (o(), h(N, { key: 1 }, [
        bt
      ], 64))
    ]));
  }
}), St = /* @__PURE__ */ F(Mt, [["__scopeId", "data-v-027ebc54"]]);
var nt = { exports: {} };
(function(g, m) {
  (function(i, a) {
    g.exports = a();
  })(_t, function() {
    var i, a, l = 1e3, C = 6e4, u = 36e5, v = 864e5, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, E = 31536e6, D = 2628e6, B = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, b = { years: E, months: D, days: v, hours: u, minutes: C, seconds: l, milliseconds: 1, weeks: 6048e5 }, M = function(s) {
      return s instanceof Z;
    }, w = function(s, e, t) {
      return new Z(s, t, e.$l);
    }, T = function(s) {
      return a.p(s) + "s";
    }, U = function(s) {
      return s < 0;
    }, S = function(s) {
      return U(s) ? Math.ceil(s) : Math.floor(s);
    }, it = function(s) {
      return Math.abs(s);
    }, x = function(s, e) {
      return s ? U(s) ? { negative: !0, format: "" + it(s) + e } : { negative: !1, format: "" + s + e } : { negative: !1, format: "" };
    }, Z = function() {
      function s(t, n, c) {
        var r = this;
        if (this.$d = {}, this.$l = c, t === void 0 && (this.$ms = 0, this.parseFromMilliseconds()), n)
          return w(t * b[T(n)], this);
        if (typeof t == "number")
          return this.$ms = t, this.parseFromMilliseconds(), this;
        if (typeof t == "object")
          return Object.keys(t).forEach(function(k) {
            r.$d[T(k)] = t[k];
          }), this.calMilliseconds(), this;
        if (typeof t == "string") {
          var _ = t.match(B);
          if (_) {
            var p = _.slice(2).map(function(k) {
              return k != null ? Number(k) : 0;
            });
            return this.$d.years = p[0], this.$d.months = p[1], this.$d.weeks = p[2], this.$d.days = p[3], this.$d.hours = p[4], this.$d.minutes = p[5], this.$d.seconds = p[6], this.calMilliseconds(), this;
          }
        }
        return this;
      }
      var e = s.prototype;
      return e.calMilliseconds = function() {
        var t = this;
        this.$ms = Object.keys(this.$d).reduce(function(n, c) {
          return n + (t.$d[c] || 0) * b[c];
        }, 0);
      }, e.parseFromMilliseconds = function() {
        var t = this.$ms;
        this.$d.years = S(t / E), t %= E, this.$d.months = S(t / D), t %= D, this.$d.days = S(t / v), t %= v, this.$d.hours = S(t / u), t %= u, this.$d.minutes = S(t / C), t %= C, this.$d.seconds = S(t / l), t %= l, this.$d.milliseconds = t;
      }, e.toISOString = function() {
        var t = x(this.$d.years, "Y"), n = x(this.$d.months, "M"), c = +this.$d.days || 0;
        this.$d.weeks && (c += 7 * this.$d.weeks);
        var r = x(c, "D"), _ = x(this.$d.hours, "H"), p = x(this.$d.minutes, "M"), k = this.$d.seconds || 0;
        this.$d.milliseconds && (k += this.$d.milliseconds / 1e3, k = Math.round(1e3 * k) / 1e3);
        var L = x(k, "S"), at = t.negative || n.negative || r.negative || _.negative || p.negative || L.negative, ot = _.format || p.format || L.format ? "T" : "", A = (at ? "-" : "") + "P" + t.format + n.format + r.format + ot + _.format + p.format + L.format;
        return A === "P" || A === "-P" ? "P0D" : A;
      }, e.toJSON = function() {
        return this.toISOString();
      }, e.format = function(t) {
        var n = t || "YYYY-MM-DDTHH:mm:ss", c = { Y: this.$d.years, YY: a.s(this.$d.years, 2, "0"), YYYY: a.s(this.$d.years, 4, "0"), M: this.$d.months, MM: a.s(this.$d.months, 2, "0"), D: this.$d.days, DD: a.s(this.$d.days, 2, "0"), H: this.$d.hours, HH: a.s(this.$d.hours, 2, "0"), m: this.$d.minutes, mm: a.s(this.$d.minutes, 2, "0"), s: this.$d.seconds, ss: a.s(this.$d.seconds, 2, "0"), SSS: a.s(this.$d.milliseconds, 3, "0") };
        return n.replace(y, function(r, _) {
          return _ || String(c[r]);
        });
      }, e.as = function(t) {
        return this.$ms / b[T(t)];
      }, e.get = function(t) {
        var n = this.$ms, c = T(t);
        return c === "milliseconds" ? n %= 1e3 : n = c === "weeks" ? S(n / b[c]) : this.$d[c], n || 0;
      }, e.add = function(t, n, c) {
        var r;
        return r = n ? t * b[T(n)] : M(t) ? t.$ms : w(t, this).$ms, w(this.$ms + r * (c ? -1 : 1), this);
      }, e.subtract = function(t, n) {
        return this.add(t, n, !0);
      }, e.locale = function(t) {
        var n = this.clone();
        return n.$l = t, n;
      }, e.clone = function() {
        return w(this.$ms, this);
      }, e.humanize = function(t) {
        return i().add(this.$ms, "ms").locale(this.$l).fromNow(!t);
      }, e.valueOf = function() {
        return this.asMilliseconds();
      }, e.milliseconds = function() {
        return this.get("milliseconds");
      }, e.asMilliseconds = function() {
        return this.as("milliseconds");
      }, e.seconds = function() {
        return this.get("seconds");
      }, e.asSeconds = function() {
        return this.as("seconds");
      }, e.minutes = function() {
        return this.get("minutes");
      }, e.asMinutes = function() {
        return this.as("minutes");
      }, e.hours = function() {
        return this.get("hours");
      }, e.asHours = function() {
        return this.as("hours");
      }, e.days = function() {
        return this.get("days");
      }, e.asDays = function() {
        return this.as("days");
      }, e.weeks = function() {
        return this.get("weeks");
      }, e.asWeeks = function() {
        return this.as("weeks");
      }, e.months = function() {
        return this.get("months");
      }, e.asMonths = function() {
        return this.as("months");
      }, e.years = function() {
        return this.get("years");
      }, e.asYears = function() {
        return this.as("years");
      }, s;
    }(), z = function(s, e, t) {
      return s.add(e.years() * t, "y").add(e.months() * t, "M").add(e.days() * t, "d").add(e.hours() * t, "h").add(e.minutes() * t, "m").add(e.seconds() * t, "s").add(e.milliseconds() * t, "ms");
    };
    return function(s, e, t) {
      i = t, a = t().$utils(), t.duration = function(r, _) {
        var p = t.locale();
        return w(r, { $l: p }, _);
      }, t.isDuration = M;
      var n = e.prototype.add, c = e.prototype.subtract;
      e.prototype.add = function(r, _) {
        return M(r) ? z(this, r, 1) : n.bind(this)(r, _);
      }, e.prototype.subtract = function(r, _) {
        return M(r) ? z(this, r, -1) : c.bind(this)(r, _);
      };
    };
  });
})(nt);
var Et = nt.exports;
const Dt = /* @__PURE__ */ mt(Et);
var K = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const xt = (g) => (ut("data-v-c1a9a115"), g = g(), lt(), g), It = { class: "valid-price-info" }, Tt = /* @__PURE__ */ xt(() => /* @__PURE__ */ f("svg", {
  "data-v-39cbcd33": "",
  fill: "none",
  height: "24",
  viewBox: "0 0 24 24",
  width: "24",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ f("path", {
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
], -1)), Ht = ["innerHTML"], Pt = /* @__PURE__ */ O({
  __name: "ValidPricesInfo",
  setup(g) {
    V.extend(Dt);
    const m = Y(K.VITE_RECALCULATE_CART_INTERVAL_MS / 1e3), i = Y(0), a = et(), l = Date.now(), C = tt(() => {
      let v = V(l).add(m.value, "seconds").diff(V(l));
      return v < 0 && (v = 0), V.duration(v).format("mm:ss");
    }), { t: u } = st();
    return j(() => {
      i.value = setInterval(async () => {
        m.value = m.value - 1, m.value === 0 && (a.cart.items.length && await a.recalculate(), m.value = K.VITE_RECALCULATE_CART_INTERVAL_MS / 1e3);
      }, 1e3);
    }), dt(() => {
      clearInterval(i.value);
    }), (v, y) => (o(), h("div", It, [
      Tt,
      f("span", {
        innerHTML: d(u)("checkout.validPricesInfo", { time: C.value })
      }, null, 8, Ht)
    ]));
  }
}), Q = /* @__PURE__ */ F(Pt, [["__scopeId", "data-v-c1a9a115"]]), Bt = { class: "th-page__container" }, Vt = {
  key: 1,
  class: "th-checkout__body"
}, Yt = {
  key: 0,
  class: "th-checkout__steps"
}, Lt = { class: "th-checkout-details" }, At = {
  key: 0,
  class: "th-checkout-details__title"
}, Rt = {
  key: 1,
  class: "th-checkout-details__subtitle"
}, Nt = { class: "th-checkout-details__content" }, Ot = { class: "th-checkout-details__payment" }, jt = {
  key: 0,
  class: "th-checkout-details__title"
}, Ft = {
  key: 2,
  class: "th-checkout-details__content th-checkout-details__content_cart-items"
}, Ut = {
  key: 0,
  class: "th-page__footer"
}, Zt = { class: "th-page__container" }, zt = {
  key: 0,
  class: "th-checkout__footer"
}, Gt = { class: "th-checkout__footer_total" }, Wt = /* @__PURE__ */ O({
  __name: "PageComponent",
  props: {
    title: {},
    subtitle: {},
    buttonClickHandler: {},
    loading: { type: Boolean },
    isCart: { type: Boolean, default: !1 },
    isResult: { type: Boolean, default: !1 },
    nextStepButtonText: {}
  },
  setup(g) {
    const { t: m } = st(), i = et(), { isDesktop: a, isMobile: l } = Ct, C = Y(null), u = g;
    j(() => {
      pt(C.value, { useGlobalLockState: !0, overflowType: "clip" }), window.dispatchEvent(new CustomEvent("th:pageOpen"));
    });
    const v = tt(
      () => u.nextStepButtonText ?? m("checkout.nextStep")
    );
    return ht(() => {
      ft(C.value, { useGlobalLockState: !0, overflowType: "clip" }), window.dispatchEvent(new CustomEvent("th:pageClose"));
    }), (y, E) => {
      var D, B, b, M;
      return o(), h("div", {
        ref_key: "page",
        ref: C,
        class: "th-page"
      }, [
        f("div", Bt, [
          y.isResult ? R(y.$slots, "default", { key: 0 }, void 0, !0) : (o(), h("div", Vt, [
            y.$slots.steps ? (o(), h("div", Yt, [
              R(y.$slots, "steps", {}, void 0, !0)
            ])) : $("", !0),
            f("div", Lt, [
              f("div", null, [
                u.title ? (o(), h("div", At, I(u.title), 1)) : $("", !0),
                u.subtitle ? (o(), h("div", Rt, I(u.subtitle), 1)) : $("", !0),
                f("div", Nt, [
                  d(i).cart.items.length && y.isCart ? (o(), H(Q, { key: 0 })) : $("", !0),
                  R(y.$slots, "content", {}, void 0, !0)
                ])
              ]),
              f("div", Ot, [
                d(l)() ? (o(), h("div", jt, I(d(m)("checkout.summary")), 1)) : $("", !0),
                d(a)() && u.buttonClickHandler ? (o(), H(J, {
                  key: 1,
                  disabled: d(i).items.length < 1 || d(i).isExpired,
                  loading: u.loading,
                  bg: "accent",
                  onClick: G(u.buttonClickHandler, ["prevent"])
                }, {
                  default: W(() => [
                    q(I(v.value), 1)
                  ]),
                  _: 1
                }, 8, ["disabled", "loading", "onClick"])) : $("", !0),
                y.isCart ? $("", !0) : (o(), h("div", Ft, [
                  d(i).cart.items.length ? (o(), H(Q, { key: 0 })) : $("", !0),
                  (o(!0), h(N, null, X(d(i).items, (w) => (o(), H(vt, {
                    key: w.id,
                    product: w,
                    small: !0
                  }, null, 8, ["product"]))), 128))
                ])),
                P(yt, { class: "th-checkout-details__discount" }),
                P($t, {
                  discount: d(i).discountSummaries,
                  subtotal: (D = d(i).cart) == null ? void 0 : D.totalPrice,
                  tax: (B = d(i).cart) == null ? void 0 : B.vatAmount,
                  total: (b = d(i).cart) == null ? void 0 : b.totalDiscountedPrice,
                  class: "th-checkout-details__cost"
                }, null, 8, ["discount", "subtotal", "tax", "total"])
              ])
            ])
          ]))
        ]),
        y.isResult ? $("", !0) : (o(), h("div", Ut, [
          f("div", Zt, [
            P(kt, { class: "th-page__achievements" }),
            P(St, { class: "th-page__payments" })
          ]),
          d(l)() ? (o(), h("div", zt, [
            f("div", Gt, [
              f("span", null, I(d(m)("cart.total")), 1),
              f("span", null, [
                P(gt, {
                  amount: (M = d(i).cart) == null ? void 0 : M.totalDiscountedPrice
                }, null, 8, ["amount"])
              ])
            ]),
            u.buttonClickHandler ? (o(), H(J, {
              key: 0,
              disabled: d(i).items.length < 1 || d(i).isExpired,
              loading: u.loading,
              bg: "accent",
              onClick: E[0] || (E[0] = G((w) => u.buttonClickHandler(), ["prevent"]))
            }, {
              default: W(() => [
                q(I(v.value), 1)
              ]),
              _: 1
            }, 8, ["disabled", "loading"])) : $("", !0)
          ])) : $("", !0)
        ]))
      ], 512);
    };
  }
}), Kt = /* @__PURE__ */ F(Wt, [["__scopeId", "data-v-297af54f"]]);
export {
  Kt as P
};
