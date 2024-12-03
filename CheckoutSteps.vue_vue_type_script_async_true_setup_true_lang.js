import { defineComponent as g, openBlock as n, createElementBlock as h, normalizeClass as w, createElementVNode as l, renderSlot as z, toDisplayString as V, computed as a, Fragment as U, unref as e, createBlock as d, withCtx as u, createVNode as r, createTextVNode as E, createCommentVNode as f, resolveDynamicComponent as R } from "vue";
import { _ as k, a as H, u as L, B as T, w as b } from "./index2.js";
const P = { class: "th-checkout-step__title" }, I = /* @__PURE__ */ g({
  __name: "CheckoutStep",
  props: {
    title: {},
    active: { type: Boolean, default: !1 },
    prev: { type: Boolean, default: !1 }
  },
  setup(t) {
    return (o, s) => (n(), h("div", {
      class: w([{
        "th-checkout-step_active": o.active,
        "th-checkout-step_prev": o.prev
      }, "th-checkout-step"])
    }, [
      l("div", {
        class: w([{ "th-checkout-step__icon_active": o.active }, "th-checkout-step__icon"])
      }, [
        z(o.$slots, "default", {}, void 0, !0)
      ], 2),
      l("div", P, V(o.title), 1)
    ], 2));
  }
}), p = /* @__PURE__ */ k(I, [["__scopeId", "data-v-929b0022"]]), S = ["width", "height"], D = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: `M6.94555 1.07437C6.71026 0.84103 6.33037 0.842606 6.09703 1.07789L1.34083
			5.87372C0.722234 6.49747 0.722236 7.50331 1.34083 8.12706L6.09703 12.9229C6.33037
			13.1582 6.71026 13.1598 6.94555 12.9264C7.18083 12.6931 7.18241 12.3132 6.94907
			12.0779L2.19287 7.28206C2.03822 7.12612 2.03822 6.87466 2.19287 6.71872L6.94907
			1.92289C7.18241 1.68761 7.18083 1.30771 6.94555 1.07437Z`,
  fill: "currentColor"
}, null, -1), N = [
  D
], O = /* @__PURE__ */ g({
  __name: "ChevronLeftIcon",
  props: {
    size: { default: 8 }
  },
  setup(t) {
    return (o, s) => (n(), h("svg", {
      width: o.size,
      height: o.size * 1.75,
      viewBox: "0 0 8 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, N, 8, S));
  }
}), Z = {}, A = {
  width: "32",
  height: "32",
  viewBox: "0 0 32 32",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, F = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M20.6667 14.3333H11.3333H10C9.63281 14.3333 9.33333 14.632 9.33333 15V24.3333C9.33333 24.7013 9.63281 25 10 25H22C22.3672 25 22.6667 24.7013 22.6667 24.3333V15C22.6667 14.632 22.3672 14.3333 22 14.3333H20.6667ZM20 10.3333V13H12V10.3333C12 8.12793 13.7946 6.33333 16 6.33333C18.2054 6.33333 20 8.12793 20 10.3333ZM10.6667 13V10.3333C10.6667 7.39193 13.0586 5 16 5C18.9414 5 21.3333 7.39193 21.3333 10.3333V13H22C23.1022 13 24 13.8968 24 15V24.3333C24 25.4365 23.1022 26.3333 22 26.3333H10C8.89779 26.3333 8 25.4365 8 24.3333V15C8 13.8968 8.89779 13 10 13H10.6667Z",
  fill: "currentColor"
}, null, -1), G = [
  F
];
function K(t, o) {
  return n(), h("svg", A, G);
}
const Y = /* @__PURE__ */ k(Z, [["render", K]]), j = {}, q = {
  width: "32",
  height: "32",
  viewBox: "0 0 32 32",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, J = /* @__PURE__ */ l("circle", {
  cx: "16",
  cy: "12",
  r: "5",
  stroke: "currentColor",
  "stroke-width": "1.2"
}, null, -1), Q = /* @__PURE__ */ l("path", {
  d: "M24 25.9993V24.6309C24 22.4217 22.2091 20.6309 20 20.6309H12C9.79086 20.6309 8 22.4217 8 24.6309V25.9993",
  stroke: "currentColor",
  "stroke-width": "1.2"
}, null, -1), W = [
  J,
  Q
];
function X(t, o) {
  return n(), h("svg", q, W);
}
const e0 = /* @__PURE__ */ k(j, [["render", X]]), t0 = {}, c0 = {
  height: "32",
  viewBox: "0 0 38 32",
  width: "38",
  xmlns: "http://www.w3.org/2000/svg"
}, o0 = /* @__PURE__ */ l("path", {
  d: "M37.839 13.285l-2.23-2.23c-0.205-0.205-0.471-0.302-0.745-0.302-0.194 0-0.391 0.048-0.575 0.139-0.363 0.181-0.76 0.271-1.157 0.271-0.665 0-1.33-0.254-1.837-0.761-0.81-0.81-0.973-2.022-0.49-2.994 0.221-0.444 0.188-0.97-0.162-1.32l-2.23-2.23c-0.221-0.221-0.512-0.332-0.802-0.332s-0.581 0.111-0.802 0.332l-3.742 3.742c-0.537-0.076-1.056-0.312-1.47-0.726-0.81-0.81-0.973-2.022-0.49-2.994 0.221-0.444 0.188-0.97-0.162-1.32l-2.23-2.23c-0.221-0.222-0.512-0.332-0.802-0.332s-0.581 0.111-0.802 0.332l-16.779 16.779c-0.443 0.443-0.443 1.161 0 1.604l2.227 2.227c0.205 0.205 0.471 0.301 0.744 0.301 0.195 0 0.393-0.049 0.578-0.141 0.365-0.183 0.764-0.274 1.164-0.274 0.665 0 1.331 0.254 1.838 0.761 0.812 0.812 0.975 2.028 0.487 3.002-0.222 0.444-0.191 0.971 0.16 1.323l2.227 2.227c0.222 0.221 0.512 0.332 0.802 0.332s0.581-0.111 0.802-0.332l3.75-3.75c0.537 0.077 1.056 0.313 1.469 0.726 0.812 0.812 0.975 2.028 0.487 3.002-0.222 0.444-0.191 0.971 0.16 1.323l2.227 2.227c0.221 0.221 0.512 0.332 0.802 0.332s0.581-0.111 0.802-0.332l16.779-16.779c0.443-0.443 0.443-1.161 0-1.604zM14.245 22.316l-3.685 3.685-1.079-1.079c0.564-1.668 0.146-3.531-1.127-4.803-0.884-0.884-2.059-1.371-3.309-1.371-0.507 0-1.014 0.084-1.494 0.245l-1.080-1.080 8.956-8.956c0.514 0.482 1.319 0.479 1.821-0.023s0.505-1.307 0.023-1.821l4.641-4.641 1.084 1.084c-0.558 1.665-0.138 3.523 1.13 4.791 0.381 0.381 0.824 0.672 1.297 0.899 0.622 0.298 1.301 0.471 2.011 0.471 0.167 0 0.333-0.023 0.5-0.041 0.334-0.036 0.665-0.095 0.983-0.2l1.084 1.084-4.652 4.652c-0.515-0.43-1.275-0.419-1.759 0.064s-0.494 1.243-0.064 1.759l-5.282 5.282zM31.048 18.738c-0.516-0.43-1.275-0.419-1.759 0.064s-0.494 1.243-0.064 1.759l-8.967 8.967-1.079-1.079c0.564-1.668 0.145-3.531-1.127-4.803-0.381-0.381-0.824-0.673-1.297-0.899l7.387-7.387c0.472 0.188 1.032 0.093 1.414-0.29s0.478-0.942 0.29-1.414l2.294-2.294c0.443-0.443 0.443-1.161 0-1.604l-2.144-2.144 1.615-1.615 1.084 1.084c-0.558 1.665-0.138 3.523 1.13 4.791 0.884 0.883 2.058 1.37 3.308 1.37 0.503 0 1.006-0.082 1.483-0.241l1.084 1.084-4.652 4.652z",
  style: { fill: "currentColor" }
}, null, -1), s0 = /* @__PURE__ */ l("path", {
  d: "M26.495 16.009c-0.512 0.512-0.512 1.343 0 1.856s1.343 0.512 1.856 0 0.512-1.343 0-1.856c-0.512-0.512-1.343-0.512-1.856 0z",
  style: { fill: "currentColor" }
}, null, -1), n0 = /* @__PURE__ */ l("path", {
  d: "M14.003 9.688c-0.512 0.512-0.512 1.343 0 1.856s1.343 0.512 1.856 0c0.512-0.512 0.512-1.343 0-1.856s-1.343-0.512-1.856 0z",
  style: { fill: "currentColor" }
}, null, -1), l0 = /* @__PURE__ */ l("path", {
  d: "M18.373 12.296c-0.502-0.291-1.146-0.244-1.576 0.186s-0.477 1.073-0.186 1.576c0.056 0.097 0.103 0.197 0.186 0.28 0.512 0.512 1.343 0.512 1.856 0s0.512-1.343 0-1.856c-0.083-0.083-0.183-0.13-0.28-0.186z",
  style: { fill: "currentColor" }
}, null, -1), r0 = [
  o0,
  s0,
  n0,
  l0
];
function a0(t, o) {
  return n(), h("svg", c0, r0);
}
const $ = /* @__PURE__ */ k(t0, [["render", a0]]), u0 = "cart", m = "checkout", v = "upgrades", i0 = "payment", i = (t) => a(() => typeof t.getRoutes().find((s) => s.name === v) < "u"), C = (t) => a(() => t.currentRoute.value.name === m), x = (t) => a(() => t.currentRoute.value.name === v), _ = (t) => a(() => t.currentRoute.value.name === i0), y = (t) => a(() => i(t).value && x(t).value || _(t).value), _0 = (t) => a(() => i(t).value && _(t).value), k0 = /* @__PURE__ */ g({
  __name: "CheckoutSteps",
  setup(t) {
    const { isDesktop: o } = b, { t: s } = H(), c = L(), B = a(() => C(c).value ? { name: u0 } : i(c).value && _(c).value ? { name: v } : { name: m }), M = a(() => C(c).value ? s("cart.back") : i(c).value && _(c).value ? s("upgrades.back") : s("checkout.back"));
    return (h0, d0) => (n(), h(U, null, [
      e(o)() ? (n(), d(T, {
        key: 0,
        to: B.value,
        class: "th-checkout__back-btn",
        plain: "",
        tag: "router-link"
      }, {
        default: u(() => [
          r(O, { size: 7 }),
          E(" " + V(M.value), 1)
        ]),
        _: 1
      }, 8, ["to"])) : f("", !0),
      (n(), d(R(e(y)(e(c)).value ? "RouterLink" : "div"), {
        to: { name: e(m) },
        class: "th-checkout__link"
      }, {
        default: u(() => [
          r(p, {
            active: e(C)(e(c)).value,
            prev: e(y)(e(c)).value,
            title: e(s)("checkout.personalDetails"),
            class: "th-checkout-step_checkout"
          }, {
            default: u(() => [
              r(e0)
            ]),
            _: 1
          }, 8, ["active", "prev", "title"])
        ]),
        _: 1
      }, 8, ["to"])),
      e(i)(e(c)).value ? (n(), d(R(e(_0)(e(c)).value ? "RouterLink" : "div"), {
        key: 1,
        to: { name: e(v) },
        class: "th-checkout__link"
      }, {
        default: u(() => [
          r(p, {
            active: e(x)(e(c)).value,
            prev: e(_)(e(c)).value,
            title: e(s)("checkout.upgrades"),
            class: "th-checkout-step_upgrades"
          }, {
            default: u(() => [
              r($)
            ]),
            _: 1
          }, 8, ["active", "prev", "title"])
        ]),
        _: 1
      }, 8, ["to"])) : f("", !0),
      r(p, {
        active: e(_)(e(c)).value,
        title: e(s)("checkout.payment"),
        class: "th-checkout-step_payment"
      }, {
        default: u(() => [
          r(Y)
        ]),
        _: 1
      }, 8, ["active", "title"]),
      e(i)(e(c)).value ? f("", !0) : (n(), d(p, {
        key: 2,
        title: e(s)("checkout.tickets"),
        class: "th-checkout-step_tickets"
      }, {
        default: u(() => [
          r($)
        ]),
        _: 1
      }, 8, ["title"]))
    ], 64));
  }
});
export {
  m as C,
  i0 as P,
  v as U,
  k0 as _,
  i
};
