import { defineComponent as V, ref as D, onMounted as M, openBlock as t, createElementBlock as s, Fragment as v, renderList as T, normalizeStyle as N, createStaticVNode as A, computed as L, onBeforeUnmount as R, createElementVNode as c, renderSlot as m, createCommentVNode as n, toDisplayString as _, unref as e, createBlock as r, withModifiers as $, withCtx as x, createTextVNode as E, createVNode as p } from "vue";
import { c as I, a as z, b as F, y as G, z as O, V as P, B as H, C as U, A as j, D as q, E as J, t as K, x as Q } from "./index2.js";
const W = { class: "th-payment-ways" }, X = /* @__PURE__ */ A('<div class="th-payment-ways__item th-payment-ways__item_mastercard" data-v-027ebc54></div><div class="th-payment-ways__item th-payment-ways__item_visa" data-v-027ebc54></div><div class="th-payment-ways__item th-payment-ways__item_amex" data-v-027ebc54></div><div class="th-payment-ways__item th-payment-ways__item_paypal" data-v-027ebc54></div><div class="th-payment-ways__item th-payment-ways__item_apple-pay" data-v-027ebc54></div><div class="th-payment-ways__item th-payment-ways__item_google-pay" data-v-027ebc54></div><div class="th-payment-ways__item th-payment-ways__item_alipay" data-v-027ebc54></div><div class="th-payment-ways__item th-payment-ways__item_klarna" data-v-027ebc54></div>', 8), Y = /* @__PURE__ */ V({
  __name: "PaymentsComponent",
  setup(k) {
    const d = D([]);
    return M(() => {
      var a, u, l;
      (u = (a = window.ticketHub) == null ? void 0 : a.paymentMethods) != null && u.length && (d.value = (l = window.ticketHub) == null ? void 0 : l.paymentMethods);
    }), (a, u) => (t(), s("div", W, [
      d.value.length ? (t(!0), s(v, { key: 0 }, T(d.value, (l) => (t(), s("div", {
        key: l,
        style: N({ backgroundImage: `url(${l})` }),
        class: "th-payment-ways__item"
      }, null, 4))), 128)) : (t(), s(v, { key: 1 }, [
        X
      ], 64))
    ]));
  }
}), Z = /* @__PURE__ */ I(Y, [["__scopeId", "data-v-027ebc54"]]), tt = { class: "th-page__container" }, et = {
  key: 1,
  class: "th-checkout__body"
}, at = {
  key: 0,
  class: "th-checkout__steps"
}, st = { class: "th-checkout-details" }, ot = {
  key: 0,
  class: "th-checkout-details__title"
}, nt = {
  key: 1,
  class: "th-checkout-details__subtitle"
}, it = { class: "th-checkout-details__content" }, ct = { class: "th-checkout-details__payment" }, lt = {
  key: 0,
  class: "th-checkout-details__title"
}, dt = {
  key: 2,
  class: "th-checkout-details__content th-checkout-details__content_cart-items"
}, _t = {
  key: 0,
  class: "th-page__footer"
}, ut = { class: "th-page__container" }, rt = {
  key: 0,
  class: "th-checkout__footer"
}, pt = { class: "th-checkout__footer_total" }, mt = /* @__PURE__ */ V({
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
  setup(k) {
    const { t: d } = z(), a = F(), { isDesktop: u, isMobile: l } = Q, h = D(null), o = k;
    M(() => {
      G(h.value, { useGlobalLockState: !0, overflowType: "clip" }), window.dispatchEvent(new CustomEvent("th:pageOpen"));
    });
    const b = L(
      () => o.nextStepButtonText ?? d("checkout.nextStep")
    );
    return R(() => {
      O(h.value, { useGlobalLockState: !0, overflowType: "clip" }), window.dispatchEvent(new CustomEvent("th:pageClose"));
    }), (i, g) => {
      var w, f, C, B, S;
      return t(), s("div", {
        ref_key: "page",
        ref: h,
        class: "th-page"
      }, [
        c("div", tt, [
          i.isResult ? m(i.$slots, "default", { key: 0 }, void 0, !0) : (t(), s("div", et, [
            i.$slots.steps ? (t(), s("div", at, [
              m(i.$slots, "steps", {}, void 0, !0)
            ])) : n("", !0),
            c("div", st, [
              c("div", null, [
                o.title ? (t(), s("div", ot, _(o.title), 1)) : n("", !0),
                o.subtitle ? (t(), s("div", nt, _(o.subtitle), 1)) : n("", !0),
                c("div", it, [
                  e(a).cart.items.length && i.isCart ? (t(), r(P, { key: 0 })) : n("", !0),
                  m(i.$slots, "content", {}, void 0, !0)
                ])
              ]),
              c("div", ct, [
                e(l)() ? (t(), s("div", lt, _(e(d)("checkout.summary")), 1)) : n("", !0),
                e(u)() && o.buttonClickHandler ? (t(), r(H, {
                  key: 1,
                  disabled: e(a).items.length < 1 || e(a).isExpired,
                  loading: o.loading,
                  bg: "accent",
                  onClick: $(o.buttonClickHandler, ["prevent"])
                }, {
                  default: x(() => [
                    E(_(b.value), 1)
                  ]),
                  _: 1
                }, 8, ["disabled", "loading", "onClick"])) : n("", !0),
                i.isCart ? n("", !0) : (t(), s("div", dt, [
                  e(a).cart.items.length ? (t(), r(P, { key: 0 })) : n("", !0),
                  (t(!0), s(v, null, T(e(a).items, (y) => (t(), r(U, {
                    key: y.id,
                    product: y,
                    small: !0
                  }, null, 8, ["product"]))), 128))
                ])),
                p(j, { class: "th-checkout-details__discount" }),
                p(q, {
                  discount: e(a).discountSummaries,
                  fee: (w = e(a).cart) == null ? void 0 : w.bookingFee,
                  subtotal: (f = e(a).cart) == null ? void 0 : f.totalPrice,
                  tax: (C = e(a).cart) == null ? void 0 : C.vatAmount,
                  total: (B = e(a).cart) == null ? void 0 : B.totalDiscountedPrice,
                  class: "th-checkout-details__cost"
                }, null, 8, ["discount", "fee", "subtotal", "tax", "total"])
              ])
            ]),
            m(i.$slots, "default", {}, void 0, !0)
          ]))
        ]),
        i.isResult ? n("", !0) : (t(), s("div", _t, [
          c("div", ut, [
            p(J, { class: "th-page__achievements" }),
            p(Z, { class: "th-page__payments" })
          ]),
          e(l)() ? (t(), s("div", rt, [
            c("div", pt, [
              c("span", null, _(e(d)("cart.total")), 1),
              c("span", null, [
                p(K, {
                  amount: (S = e(a).cart) == null ? void 0 : S.totalDiscountedPrice
                }, null, 8, ["amount"])
              ])
            ]),
            o.buttonClickHandler ? (t(), r(H, {
              key: 0,
              disabled: e(a).items.length < 1 || e(a).isExpired,
              loading: o.loading,
              bg: "accent",
              onClick: g[0] || (g[0] = $((y) => o.buttonClickHandler(), ["prevent"]))
            }, {
              default: x(() => [
                E(_(b.value), 1)
              ]),
              _: 1
            }, 8, ["disabled", "loading"])) : n("", !0)
          ])) : n("", !0)
        ]))
      ], 512);
    };
  }
}), vt = /* @__PURE__ */ I(mt, [["__scopeId", "data-v-515a4a33"]]);
export {
  vt as P
};
