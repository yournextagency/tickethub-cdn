import { defineComponent as _, ref as d, onMounted as C, computed as k, openBlock as t, createBlock as n, unref as a, withCtx as u, createTextVNode as f, toDisplayString as h, createElementBlock as i, Fragment as y, renderList as x } from "vue";
import { P as w } from "./PageComponent.js";
import { u as g, a as b, b as v, U as B, G as L, B as S, C as H, _ as I } from "./index2.js";
const V = {
  key: 1,
  class: "th-cart__list"
}, E = /* @__PURE__ */ _({
  __name: "CartView",
  setup(G) {
    const p = g(), { t: e } = b(), o = v(), c = d("");
    C(() => {
      var r;
      B.replaceLangSwitcher(), c.value = ((r = window.ticketHub) == null ? void 0 : r.emptyCartLink) || "", L.viewCart();
    });
    const l = async () => {
      await p.push({ name: "checkout" });
    }, m = k(() => o.count === 0 ? e("cart.cartIsEmpty") : e("cart.your", o.count));
    return (r, M) => (t(), n(w, {
      "button-click-handler": l,
      "is-cart": !0,
      "next-step-button-text": a(e)("cart.toCheckout"),
      title: m.value,
      class: "th-cart"
    }, {
      content: u(() => [
        a(o).count === 0 ? (t(), n(S, {
          key: 0,
          to: c.value,
          bg: "accent",
          tag: "a"
        }, {
          default: u(() => [
            f(h(a(e)("cart.startShopping")), 1)
          ]),
          _: 1
        }, 8, ["to"])) : (t(), i("div", V, [
          (t(!0), i(y, null, x(a(o).items, (s) => (t(), n(H, {
            key: s.id,
            product: s
          }, null, 8, ["product"]))), 128))
        ]))
      ]),
      _: 1
    }, 8, ["next-step-button-text", "title"]));
  }
}), U = /* @__PURE__ */ I(E, [["__scopeId", "data-v-6d8ff5c3"]]);
export {
  U as default
};
