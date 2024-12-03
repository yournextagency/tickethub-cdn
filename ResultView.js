import { defineComponent as e, openBlock as t, createBlock as o, withCtx as s, createVNode as r } from "vue";
import { P as a } from "./PageComponent.js";
import { R as c, c as n } from "./index2.js";
const p = /* @__PURE__ */ e({
  __name: "ResultView",
  setup(_) {
    return (m, u) => (t(), o(a, {
      "is-result": !0,
      class: "th-result"
    }, {
      default: s(() => [
        r(c)
      ]),
      _: 1
    }));
  }
}), d = /* @__PURE__ */ n(p, [["__scopeId", "data-v-e21a7458"]]);
export {
  d as default
};
