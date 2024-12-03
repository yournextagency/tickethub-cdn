import { defineComponent as m, ref as d, onMounted as C, computed as k, openBlock as t, createBlock as n, unref as o, withCtx as c, createTextVNode as f, toDisplayString as h, createElementBlock as i, Fragment as y, renderList as x, createVNode as w } from "vue";
import { P as b } from "./PageComponent.js";
import { u as g, a as v, b as B, U as L, G as S, B as V, C as H, _ as I, c as E } from "./index2.js";
const G = {
  key: 1,
  class: "th-cart__list"
}, M = /* @__PURE__ */ m({
  __name: "CartView",
  setup(N) {
    const p = g(), { t: e } = v(), a = B(), s = d("");
    C(() => {
      var r;
      L.replaceLangSwitcher(), s.value = ((r = window.ticketHub) == null ? void 0 : r.emptyCartLink) || "", S.viewCart();
    });
    const l = async () => {
      await p.push({ name: "checkout" });
    }, _ = k(() => a.count === 0 ? e("cart.cartIsEmpty") : e("cart.your", a.count));
    return (r, P) => (t(), n(b, {
      "button-click-handler": l,
      "is-cart": !0,
      "next-step-button-text": o(e)("cart.toCheckout"),
      title: _.value,
      class: "th-cart"
    }, {
      content: c(() => [
        o(a).count === 0 ? (t(), n(V, {
          key: 0,
          to: s.value,
          bg: "accent",
          tag: "a"
        }, {
          default: c(() => [
            f(h(o(e)("cart.startShopping")), 1)
          ]),
          _: 1
        }, 8, ["to"])) : (t(), i("div", G, [
          (t(!0), i(y, null, x(o(a).items, (u) => (t(), n(H, {
            key: u.id,
            product: u
          }, null, 8, ["product"]))), 128))
        ]))
      ]),
      default: c(() => [
        w(I)
      ]),
      _: 1
    }, 8, ["next-step-button-text", "title"]));
  }
}), D = /* @__PURE__ */ E(M, [["__scopeId", "data-v-ae093ab5"]]);
export {
  D as default
};
