import { defineComponent as w, ref as $, computed as p, resolveComponent as D, openBlock as i, createElementBlock as h, createElementVNode as m, withModifiers as V, normalizeClass as j, createTextVNode as C, toDisplayString as g, Fragment as q, renderList as J, withDirectives as K, createBlock as N, vShow as B, createCommentVNode as x, withKeys as _, normalizeStyle as I } from "vue";
const O = (e, d) => {
  const t = e.__vccOpts || e;
  for (const [l, y] of d)
    t[l] = y;
  return t;
}, A = { class: "json-view-item" }, E = { key: 0 }, z = ["onClick", "aria-expanded"], F = { class: "properties" }, L = ["role", "tabindex"], M = { class: "value-key" }, T = w({
  name: "json-view-item"
}), G = /* @__PURE__ */ Object.assign(T, {
  props: {
    data: {
      required: !0,
      type: Object
    },
    maxDepth: {
      type: Number,
      required: !1,
      default: 1
    },
    canSelect: {
      type: Boolean,
      required: !1,
      default: !1
    }
  },
  emits: ["selected"],
  setup(e, { emit: d }) {
    const t = e, l = $ < boolean > (t.data.depth < t.maxDepth), y = () => {
      l.value = !l.value;
    }, u = (a) => {
      d("selected", {
        key: a.key,
        value: a.value,
        path: a.path
      });
    }, b = (a) => {
      d("selected", a);
    }, S = (a) => isNaN(a.key) ? '"' + a.key + '":' : a.key + ":", n = (a) => {
      switch (typeof a) {
        case "string":
          return { color: "var(--vjc-string-color)" };
        case "number":
          return { color: "var(--vjc-number-color)" };
        case "boolean":
          return { color: "var(--vjc-boolean-color)" };
        case "object":
          return { color: "var(--vjc-null-color)" };
        case "undefined":
          return { color: "var(--vjc-null-color)" };
        default:
          return { color: "var(--vjc-valueKey-color)" };
      }
    }, c = p(() => ({
      "chevron-arrow": !0,
      opened: l.value
    })), s = p(() => ({
      "value-key": !0,
      "can-select": t.canSelect
    })), o = p(() => t.data.type === "array" ? t.data.length === 1 ? t.data.length + " element" : t.data.length + " elements" : t.data.length === 1 ? t.data.length + " property" : t.data.length + " properties"), v = p(() => typeof t.data.value > "u" ? "undefined" : JSON.stringify(t.data.value));
    return (a, r) => {
      const k = D("json-view-item");
      return i(), h("div", A, [
        e.data.type === "object" || e.data.type === "array" ? (i(), h("div", E, [
          m("button", {
            onClick: V(y, ["stop"]),
            class: "data-key",
            "aria-expanded": l ? "true" : "false"
          }, [
            m("div", {
              class: j(c.value)
            }, null, 2),
            C(" " + g(e.data.key) + ": ", 1),
            m("span", F, g(o.value), 1)
          ], 8, z),
          (i(!0), h(q, null, J(e.data.children, (f) => K((i(), N(k, {
            onSelected: b,
            key: S(f),
            data: f,
            maxDepth: e.maxDepth,
            canSelect: e.canSelect
          }, null, 8, ["data", "maxDepth", "canSelect"])), [
            [B, l]
          ])), 128))
        ])) : x("", !0),
        e.data.type === "value" ? (i(), h("div", {
          key: 1,
          class: j(s.value),
          onClick: r[0] || (r[0] = (f) => u(e.data)),
          onKeyup: [
            r[1] || (r[1] = _((f) => u(e.data), ["enter"])),
            r[2] || (r[2] = _((f) => u(e.data), ["space"]))
          ],
          role: e.canSelect ? "button" : void 0,
          tabindex: e.canSelect ? "0" : void 0
        }, [
          m("span", M, g(e.data.key) + ":", 1),
          m("span", {
            style: I(n(e.data.value))
          }, g(v.value), 5)
        ], 42, L)) : x("", !0)
      ]);
    };
  }
}), H = /* @__PURE__ */ O(G, [["__scopeId", "data-v-0ba975f4"]]);
const P = w({
  name: "json-view"
}), Q = /* @__PURE__ */ Object.assign(P, {
  props: {
    data: {
      required: !0
    },
    rootKey: {
      type: String,
      required: !1,
      default: "root"
    },
    maxDepth: {
      type: Number,
      required: !1,
      default: 1
    },
    colorScheme: {
      type: String,
      required: !1,
      default: "light"
    }
  },
  emits: ["selected"],
  setup(e, { emit: d }) {
    const t = e, l = (n, c, s, o, v) => {
      if (y(c)) {
        let a = [];
        for (let [r, k] of Object.entries(c))
          a.push(
            l(
              r,
              k,
              s + 1,
              v ? `${o}${n}.` : `${o}`,
              !0
            )
          );
        return {
          key: n,
          type: "object",
          depth: s,
          path: o,
          length: a.length,
          children: a
        };
      } else if (u(c)) {
        let a = [];
        for (let r = 0; r < c.length; r++)
          a.push(
            l(
              r.toString(),
              c[r],
              s + 1,
              v ? `${o}${n}[${r}].` : `${o}`,
              !1
            )
          );
        return {
          key: n,
          type: "array",
          depth: s,
          path: o,
          length: a.length,
          children: a
        };
      } else
        return {
          key: n,
          type: "value",
          path: v ? o + n : o.slice(0, -1),
          depth: s,
          value: c
        };
    }, y = (n) => typeof n == "object" && n !== null && !u(n), u = (n) => Array.isArray(n), b = (n) => {
      d("selected", n);
    }, S = p(() => typeof t.data == "object" ? l(t.rootKey, { ...t.data }, 0, "", !0) : {
      key: t.rootKey,
      type: "value",
      path: "",
      depth: 0,
      value: t.data
    });
    return (n, c) => (i(), N(H, {
      class: j([{ "root-item": !0, dark: e.colorScheme === "dark" }]),
      data: S.value,
      maxDepth: e.maxDepth,
      onSelected: b
    }, null, 8, ["class", "data", "maxDepth"]));
  }
}), R = /* @__PURE__ */ O(Q, [["__scopeId", "data-v-5b340177"]]), W = {
  install: (e) => {
    e.component("JSONView", R);
  }
};
export {
  R as JSONView,
  W as default
};
