import { defineComponent as q, ref as $, reactive as g, onMounted as B, computed as w, openBlock as l, createBlock as v, unref as e, withCtx as p, createVNode as m, normalizeClass as u, createCommentVNode as h, createElementVNode as T, createElementBlock as r, Fragment as C, renderList as b, toDisplayString as A } from "vue";
import { P as O } from "./PageComponent.js";
import { a as D, u as G, c as W, d as z, b as Y, e as j, U as J, G as x, I as V, f as y, g as H, r as L, h as K, m as U, F as Q, _ as X } from "./index2.js";
import { _ as Z, i as ee, U as te, P as ae } from "./CheckoutSteps.vue_vue_type_script_async_true_setup_true_lang.js";
const oe = { class: "th-checkout-details__info" }, ne = ["innerHTML"], se = ["innerHTML"], ie = { class: "th-checkout-details__info" }, le = ["innerHTML"], re = { class: "th-checkout-details__checkboxes" }, ce = {
  key: 0,
  class: "th-checkout-details__notice th-checkout-details__notice_warning"
}, ue = {
  key: 1,
  class: "th-checkout-details__notice"
}, de = /* @__PURE__ */ q({
  __name: "CheckoutView",
  setup(me) {
    const { t: s } = D(), k = G(), E = W(), { showToast: S, showErrorToast: I } = z(), _ = $({
      name: null,
      email: null,
      hasTermsAndConditionsApproved: null
    }), d = Y();
    let o = g({
      email: "",
      name: "",
      hasTermsAndConditionsApproved: !1,
      hasSpecialOffersApproved: !1
    });
    typeof d.cart < "u" && (o = g(d.cart.customerInfo));
    const M = {
      email: { required: L, email: K, maxLength: U(60) },
      name: { required: L, maxLength: U(40) },
      hasTermsAndConditionsApproved: { sameAs: (i) => i }
    }, f = $(!1), a = j(M, o);
    B(() => {
      J.replaceLangSwitcher(), x.beginCheckout();
    });
    const F = w(() => {
      var i;
      return ((i = window.ticketHub) == null ? void 0 : i.siteTitle) ?? "site";
    }), P = () => {
      var t;
      const i = a.value.$errors[0].$property, n = (t = _.value[i]) == null ? void 0 : t.$el;
      n.scrollIntoView({ behavior: "smooth", block: "center" }), n.focus("preventScroll");
    }, N = w(() => {
      var c;
      const i = d.cart.bookingFee ?? 0, n = E(i);
      let t = s("checkout.bookingFeeNotice", { fee: n });
      return (c = window.ticketHub) != null && c.entertainmentTax && +window.ticketHub.entertainmentTax > 0 && (t = t + s("checkout.entertainmentTax", {
        fee: window.ticketHub.entertainmentTax
      })), t;
    }), R = async () => {
      try {
        if (a.value.$touch(), f.value = !0, a.value.$invalid) {
          P();
          return;
        }
        if (await d.updateCustomerInfo(o), S(s("toast.customerDataHasBeenUpdated")), await x.addPaymentInfo(), ee(k).value) {
          await k.push({ name: te });
          return;
        }
        await k.push({ name: ae });
      } catch (i) {
        i instanceof Q && I();
      } finally {
        f.value = !1;
      }
    };
    return (i, n) => (l(), v(O, {
      "button-click-handler": R,
      loading: f.value,
      title: e(s)("checkout.personalDetails"),
      class: "th-checkout"
    }, {
      steps: p(() => [
        m(Z)
      ]),
      content: p(() => [
        m(V, {
          ref: (t) => {
            _.value.email = t;
          },
          modelValue: e(o).email,
          "onUpdate:modelValue": n[0] || (n[0] = (t) => e(o).email = t),
          class: u([{
            "th-checkout-details__input_invalid": e(a).email.$error,
            "th-checkout-details__input_valid": !e(a).email.$invalid
          }, "th-checkout-details__input"]),
          label: e(s)("checkout.email"),
          required: !0,
          value: e(o).email,
          name: "email",
          type: "email"
        }, {
          default: p(() => [
            e(a).email.$invalid ? h("", !0) : (l(), v(y, { key: 0 }))
          ]),
          _: 1
        }, 8, ["modelValue", "class", "label", "value"]),
        T("span", oe, [
          e(a).email.$invalid ? h("", !0) : (l(), r("span", {
            key: 0,
            class: u([{
              "th-checkout-details__info_shown": !e(a).email.$invalid || e(a).email.$error
            }, "th-checkout-details__info"]),
            innerHTML: e(s)("checkout.ticketsSentTo", { email: e(o).email })
          }, null, 10, ne)),
          (l(!0), r(C, null, b(e(a).email.$errors, (t, c) => (l(), r("span", {
            key: c,
            class: u([{
              "th-checkout-details__info_shown": !e(a).email.$invalid || e(a).email.$error
            }, "th-checkout-details__info th-checkout-details__info_red"]),
            innerHTML: t.$validator === "required" ? e(s)("checkout.emailWarning") : t.$message
          }, null, 10, se))), 128))
        ]),
        m(V, {
          ref: (t) => {
            _.value.name = t;
          },
          modelValue: e(o).name,
          "onUpdate:modelValue": n[1] || (n[1] = (t) => e(o).name = t),
          class: u([{
            "th-checkout-details__input_invalid": e(a).name.$error,
            "th-checkout-details__input_valid": !e(a).name.$invalid
          }, "th-checkout-details__input"]),
          label: e(s)("checkout.name"),
          required: !0,
          value: e(o).name,
          name: "name"
        }, {
          default: p(() => [
            e(a).name.$invalid ? h("", !0) : (l(), v(y, { key: 0 }))
          ]),
          _: 1
        }, 8, ["modelValue", "class", "label", "value"]),
        T("span", ie, [
          (l(!0), r(C, null, b(e(a).name.$errors, (t, c) => (l(), r("span", {
            key: c,
            class: u([{
              "th-checkout-details__info_shown": e(a).name.$error
            }, "th-checkout-details__info th-checkout-details__info_red"]),
            innerHTML: t.$validator === "required" ? e(s)("checkout.nameWarning") : t.$message
          }, null, 10, le))), 128))
        ]),
        T("div", re, [
          m(H, {
            ref: (t) => {
              _.value.hasTermsAndConditionsApproved = t;
            },
            modelValue: e(o).hasTermsAndConditionsApproved,
            "onUpdate:modelValue": n[2] || (n[2] = (t) => e(o).hasTermsAndConditionsApproved = t),
            class: u([{
              "th-checkout-details__checkbox_invalid": e(a).hasTermsAndConditionsApproved.$error
            }, "th-checkout-details__checkbox"]),
            text: e(s)("checkout.agreement")
          }, null, 8, ["modelValue", "class", "text"]),
          m(H, {
            modelValue: e(o).hasSpecialOffersApproved,
            "onUpdate:modelValue": n[3] || (n[3] = (t) => e(o).hasSpecialOffersApproved = t),
            text: e(s)("checkout.newsletter", { siteTitle: F.value }),
            class: "th-checkout-details__checkbox"
          }, null, 8, ["modelValue", "text"])
        ]),
        e(a).hasTermsAndConditionsApproved.$error ? (l(), r("div", ce, A(e(s)("checkout.agreementWarning")), 1)) : h("", !0),
        e(d).cart.bookingFee !== 0 ? (l(), r("div", ue, A(N.value), 1)) : h("", !0)
      ]),
      _: 1
    }, 8, ["loading", "title"]));
  }
}), fe = /* @__PURE__ */ X(de, [["__scopeId", "data-v-0c7a1576"]]);
export {
  fe as default
};
