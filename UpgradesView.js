import { defineComponent as E, ref as k, openBlock as t, createElementBlock as n, createElementVNode as U, toDisplayString as f, createCommentVNode as a, unref as u, createBlock as g, createVNode as I, withCtx as B, createTextVNode as N, Fragment as x, onMounted as S, watch as V, resolveDynamicComponent as F, renderList as O } from "vue";
import { P as R } from "./PageComponent.js";
import { o as j, a as H, q as A, s as T, B as q, t as z, _ as $, d as K, b as M, u as D, v as Y, F as G, U as J } from "./index2.js";
import { P as L, C as Q, _ as W } from "./CheckoutSteps.vue_vue_type_script_async_true_setup_true_lang.js";
const X = { class: "th-upsell-item" }, Z = { class: "th-upsell-item__wrapper" }, ee = {
  key: 0,
  class: "th-upsell-item__media"
}, te = {
  key: 0,
  class: "th-upsell-item__promo"
}, oe = ["alt", "src"], se = { class: "th-upsell-item__info" }, le = { class: "th-upsell-item__title" }, ne = {
  key: 1,
  class: "th-upsell-item__prices"
}, ie = {
  key: 0,
  class: "th-upsell-item__price-heading"
}, ae = {
  key: 1,
  class: "th-upsell-item__price th-upsell-item__price_old"
}, re = {
  key: 2,
  class: "th-upsell-item__price"
}, ue = /* @__PURE__ */ E({
  __name: "UpsellItem",
  props: {
    item: {}
  },
  emits: ["bookingIsShown"],
  setup(P, { expose: _, emit: h }) {
    const { showUpsellModal: c } = j(), { t: r } = H(), e = P, v = h, m = k(!1), C = () => {
      v("bookingIsShown"), m.value = !0;
    }, d = () => {
      m.value = !1;
    }, o = k({
      oldPrice: e.item.oldPrice,
      defaultPrice: e.item.defaultPrice,
      isDynamicPrice: !0
    }), i = (s) => {
      o.value.oldPrice = s.old, o.value.defaultPrice = s.current, o.value.isDynamicPrice = s.isHasDynamicPrices;
    }, w = () => {
      var s;
      if (e.item.title) {
        const l = e.item.title;
        if (typeof l == "object" && window) {
          const p = (s = window.ticketHub) == null ? void 0 : s.language;
          let b = Object.values(l)[0];
          return typeof p < "u" && (b = l[p]), b;
        }
        return l;
      }
      return "";
    }, y = () => e.item.content && e.item.content.length;
    return _({ closeUpsellBooking: d }), (s, l) => (t(), n("div", X, [
      U("div", Z, [
        e.item.promoText || e.item.images || y() ? (t(), n("div", ee, [
          e.item.promoText ? (t(), n("div", te, f(e.item.promoText), 1)) : a("", !0),
          e.item.images ? (t(), n("img", {
            key: 1,
            alt: e.item.title,
            src: e.item.images[0],
            class: "th-upsell-item__preview"
          }, null, 8, oe)) : a("", !0),
          y() && !m.value ? (t(), n("button", {
            key: 2,
            class: "th-upsell-item__show-more-link",
            type: "button",
            onClick: l[0] || (l[0] = (p) => u(c)(e.item))
          }, f(u(r)("booking.showMore")), 1)) : a("", !0)
        ])) : a("", !0),
        U("div", se, [
          e.item.duration || e.item.rating ? (t(), g(A, {
            key: 0,
            "bookings-count": e.item.bookingsCount,
            duration: e.item.duration,
            rating: e.item.rating,
            class: "th-upsell-item__meta"
          }, null, 8, ["bookings-count", "duration", "rating"])) : a("", !0),
          U("div", le, f(w()), 1),
          o.value.oldPrice || o.value.defaultPrice ? (t(), n("div", ne, [
            o.value.isDynamicPrice ? (t(), n("span", ie, f(u(r)("booking.from")), 1)) : a("", !0),
            o.value.oldPrice ? (t(), n("div", ae, [
              I(T, {
                amount: o.value.oldPrice
              }, null, 8, ["amount"])
            ])) : a("", !0),
            o.value.defaultPrice ? (t(), n("div", re, [
              I(T, {
                amount: o.value.defaultPrice
              }, null, 8, ["amount"])
            ])) : a("", !0)
          ])) : a("", !0)
        ])
      ]),
      m.value ? a("", !0) : (t(), g(q, {
        key: 0,
        class: "th-upsell-item__show-booking-button",
        type: "button",
        onClick: C
      }, {
        default: B(() => [
          N(f(u(r)("booking.addToCart")), 1)
        ]),
        _: 1
      })),
      m.value ? (t(), n(x, { key: 1 }, [
        I(z, {
          "hide-book-now-button": !0,
          "hide-prices": !0,
          product: e.item,
          upsell: !0,
          class: "th-upsell-item__booking",
          onPriceIsChanged: i
        }, null, 8, ["product"]),
        y() ? (t(), n("button", {
          key: 0,
          class: "th-upsell-item__show-more-link th-upsell-item__show-more-link_bottom",
          type: "button",
          onClick: l[1] || (l[1] = (p) => u(c)(e.item))
        }, f(u(r)("booking.showMore")), 1)) : a("", !0)
      ], 64)) : a("", !0)
    ]));
  }
}), ce = /* @__PURE__ */ $(ue, [["__scopeId", "data-v-71ebe529"]]), me = { class: "th-upsell-items" }, de = {
  key: 0,
  class: "th-upsell-items__loader"
}, pe = /* @__PURE__ */ E({
  __name: "UpsellItems",
  setup(P) {
    const { showErrorToast: _ } = K(), h = M(), c = D(), r = k([]), e = k(null), v = k(null), m = k(!0);
    S(async () => {
      var d, o;
      try {
        typeof ((d = window.ticketHub) == null ? void 0 : d.loaderComponent) < "u" && (v.value = (o = window.ticketHub) == null ? void 0 : o.loaderComponent);
        const i = await h.getUpsellItems();
        if (typeof i > "u" || i.length === 0)
          return await c.push({ name: L });
        let w = [];
        const y = i == null ? void 0 : i.map((s) => s.productId);
        w = await Y.getUpsells(y), r.value = i.map((s) => {
          let l = {
            price: 0,
            oldPrice: 0,
            addonInfo: s.addonInfo
          };
          const p = w.find(
            (b) => +b.itemId == +s.productId
          );
          return typeof p < "u" && (l = {
            ...l,
            ...p
          }), {
            title: s.name,
            itemId: s.productId,
            isCombo: s.isPackage,
            defaultPrice: l.price,
            upsell: !0,
            ...l
          };
        });
      } catch (i) {
        i instanceof G && _();
      } finally {
        m.value = !1;
      }
    }), V(r, () => {
      window.dispatchEvent(new CustomEvent("th:upgradesLoaded"));
    });
    const C = () => {
      var d;
      (d = e.value) == null || d.forEach(
        (o) => {
          o.closeUpsellBooking();
        }
      );
    };
    return (d, o) => (t(), n("div", me, [
      m.value ? (t(), n("div", de, [
        (t(), g(F(v.value)))
      ])) : (t(!0), n(x, { key: 1 }, O(r.value, (i) => (t(), g(ce, {
        key: i.id,
        ref_for: !0,
        ref_key: "upsellItemsElements",
        ref: e,
        item: i,
        onBookingIsShown: C
      }, null, 8, ["item"]))), 128))
    ]));
  }
}), _e = /* @__PURE__ */ $(pe, [["__scopeId", "data-v-180a07be"]]), ve = /* @__PURE__ */ E({
  __name: "UpgradesView",
  setup(P) {
    const { t: _ } = H(), h = D(), c = M();
    S(async () => {
      J.replaceLangSwitcher(), (!c.isCustomerInfoFilled || c.items.length < 1) && await h.push({ name: Q });
    });
    const r = async () => {
      await h.push({ name: L });
    };
    return (e, v) => (t(), g(R, {
      "button-click-handler": r,
      subtitle: u(_)("upgrades.upsellBookSubtitle"),
      title: u(_)("upgrades.upsellBookTitle"),
      class: "th-checkout"
    }, {
      steps: B(() => [
        I(W)
      ]),
      content: B(() => [
        (t(), g(_e, {
          key: u(c).cartHash
        }))
      ]),
      _: 1
    }, 8, ["subtitle", "title"]));
  }
});
export {
  ve as default
};
