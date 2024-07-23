import { defineComponent as B, ref as P, openBlock as s, createElementBlock as i, createElementVNode as C, toDisplayString as f, createCommentVNode as l, unref as r, createBlock as g, createVNode as b, withCtx as U, createTextVNode as V, Fragment as x, onMounted as S, watch as F, renderList as L } from "vue";
import { P as O } from "./PageComponent.js";
import { i as R, a as M, j, k as T, B as A, l as z, _ as $, c as K, b as H, u as D, m as Y, F as q, U as G } from "./index2.js";
import { P as N, C as J, _ as Q } from "./CheckoutSteps.vue_vue_type_script_async_true_setup_true_lang.js";
const W = { class: "th-upsell-item" }, X = { class: "th-upsell-item__wrapper" }, Z = {
  key: 0,
  class: "th-upsell-item__media"
}, ee = {
  key: 0,
  class: "th-upsell-item__promo"
}, te = ["alt", "src"], se = { class: "th-upsell-item__info" }, oe = { class: "th-upsell-item__title" }, ie = {
  key: 1,
  class: "th-upsell-item__prices"
}, le = {
  key: 0,
  class: "th-upsell-item__price-heading"
}, ne = {
  key: 1,
  class: "th-upsell-item__price th-upsell-item__price_old"
}, ae = {
  key: 2,
  class: "th-upsell-item__price"
}, re = /* @__PURE__ */ B({
  __name: "UpsellItem",
  props: {
    item: {}
  },
  emits: ["bookingIsShown"],
  setup(I, { expose: p, emit: d }) {
    const { showUpsellModal: u } = R(), { t: n } = M(), e = I, v = d, t = P(!1), c = () => {
      v("bookingIsShown"), t.value = !0;
    }, _ = () => {
      t.value = !1;
    }, o = P({
      oldPrice: e.item.oldPrice,
      defaultPrice: e.item.defaultPrice,
      isDynamicPrice: !0
    }), h = (m) => {
      o.value.oldPrice = m.old, o.value.defaultPrice = m.current, o.value.isDynamicPrice = m.isHasDynamicPrices;
    }, w = () => {
      var m;
      if (e.item.title) {
        const a = e.item.title;
        if (typeof a == "object" && window) {
          const y = (m = window.ticketHub) == null ? void 0 : m.language;
          let E = Object.values(a)[0];
          return typeof y < "u" && (E = a[y]), E;
        }
        return a;
      }
      return "";
    }, k = () => e.item.content && e.item.content.length;
    return p({ closeUpsellBooking: _ }), (m, a) => (s(), i("div", W, [
      C("div", X, [
        e.item.promoText || e.item.images || k() ? (s(), i("div", Z, [
          e.item.promoText ? (s(), i("div", ee, f(e.item.promoText), 1)) : l("", !0),
          e.item.images ? (s(), i("img", {
            key: 1,
            alt: e.item.title,
            src: e.item.images[0],
            class: "th-upsell-item__preview"
          }, null, 8, te)) : l("", !0),
          k() && !t.value ? (s(), i("button", {
            key: 2,
            class: "th-upsell-item__show-more-link",
            type: "button",
            onClick: a[0] || (a[0] = (y) => r(u)(e.item))
          }, f(r(n)("booking.showMore")), 1)) : l("", !0)
        ])) : l("", !0),
        C("div", se, [
          e.item.duration || e.item.rating ? (s(), g(j, {
            key: 0,
            "bookings-count": e.item.bookingsCount,
            duration: e.item.duration,
            rating: e.item.rating,
            class: "th-upsell-item__meta"
          }, null, 8, ["bookings-count", "duration", "rating"])) : l("", !0),
          C("div", oe, f(w()), 1),
          o.value.oldPrice || o.value.defaultPrice ? (s(), i("div", ie, [
            o.value.isDynamicPrice ? (s(), i("span", le, f(r(n)("booking.from")), 1)) : l("", !0),
            o.value.oldPrice ? (s(), i("div", ne, [
              b(T, {
                amount: o.value.oldPrice
              }, null, 8, ["amount"])
            ])) : l("", !0),
            o.value.defaultPrice ? (s(), i("div", ae, [
              b(T, {
                amount: o.value.defaultPrice
              }, null, 8, ["amount"])
            ])) : l("", !0)
          ])) : l("", !0)
        ])
      ]),
      t.value ? l("", !0) : (s(), g(A, {
        key: 0,
        class: "th-upsell-item__show-booking-button",
        type: "button",
        onClick: c
      }, {
        default: U(() => [
          V(f(r(n)("booking.addToCart")), 1)
        ]),
        _: 1
      })),
      t.value ? (s(), i(x, { key: 1 }, [
        b(z, {
          "hide-book-now-button": !0,
          "hide-prices": !0,
          product: e.item,
          upsell: !0,
          class: "th-upsell-item__booking",
          onPriceIsChanged: h
        }, null, 8, ["product"]),
        k() ? (s(), i("button", {
          key: 0,
          class: "th-upsell-item__show-more-link th-upsell-item__show-more-link_bottom",
          type: "button",
          onClick: a[1] || (a[1] = (y) => r(u)(e.item))
        }, f(r(n)("booking.showMore")), 1)) : l("", !0)
      ], 64)) : l("", !0)
    ]));
  }
}), ue = /* @__PURE__ */ $(re, [["__scopeId", "data-v-71ebe529"]]), ce = { class: "th-upsell-items" }, me = /* @__PURE__ */ B({
  __name: "UpsellItems",
  setup(I) {
    const { showErrorToast: p } = K(), d = H(), u = D(), n = P([]), e = P(null);
    S(async () => {
      try {
        const t = await d.getUpsellItems();
        if (typeof t > "u" || t.length === 0)
          return await u.push({ name: N });
        let c = [];
        const _ = t == null ? void 0 : t.map((o) => o.id);
        c = await Y.getUpsells(_), n.value = t.map((o) => {
          let h = {
            price: 0,
            oldPrice: 0
          };
          const w = c.find(
            (k) => +k.itemId == +o.id
          );
          return typeof w < "u" && (h = {
            ...h,
            ...w
          }), {
            title: o.name,
            itemId: o.id,
            isCombo: o.isPackage,
            defaultPrice: h.price,
            upsell: !0,
            ...h
          };
        });
      } catch (t) {
        t instanceof q && p();
      }
    }), F(n, () => {
      window.dispatchEvent(new CustomEvent("th:upgradesLoaded"));
    });
    const v = () => {
      var t;
      (t = e.value) == null || t.forEach(
        (c) => {
          c.closeUpsellBooking();
        }
      );
    };
    return (t, c) => (s(), i("div", ce, [
      (s(!0), i(x, null, L(n.value, (_) => (s(), g(ue, {
        key: _.id,
        ref_for: !0,
        ref_key: "upsellItemsElements",
        ref: e,
        item: _,
        onBookingIsShown: v
      }, null, 8, ["item"]))), 128))
    ]));
  }
}), pe = /* @__PURE__ */ $(me, [["__scopeId", "data-v-15b4a8a7"]]), ke = /* @__PURE__ */ B({
  __name: "UpgradesView",
  setup(I) {
    const { t: p } = M(), d = D(), u = H();
    S(async () => {
      G.replaceLangSwitcher(), (!u.isCustomerInfoFilled || u.items.length < 1) && await d.push({ name: J });
    });
    const n = async () => {
      await d.push({ name: N });
    };
    return (e, v) => (s(), g(O, {
      "button-click-handler": n,
      subtitle: r(p)("upgrades.upsellBookSubtitle"),
      title: r(p)("upgrades.upsellBookTitle"),
      class: "th-checkout"
    }, {
      steps: U(() => [
        b(Q)
      ]),
      content: U(() => [
        (s(), g(pe, {
          key: r(u).cartHash
        }))
      ]),
      _: 1
    }, 8, ["subtitle", "title"]));
  }
});
export {
  ke as default
};
