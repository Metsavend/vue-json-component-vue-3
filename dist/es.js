import { defineComponent as w, ref as $, computed as m, resolveComponent as D, openBlock as i, createElementBlock as h, createElementVNode as f, withModifiers as V, normalizeClass as j, createTextVNode as C, toDisplayString as g, Fragment as q, renderList as J, withDirectives as K, createBlock as N, vShow as B, createCommentVNode as x, withKeys as _, normalizeStyle as I } from "vue";
const O = (e, s) => {
  const t = e.__vccOpts || e;
  for (const [o, y] of s)
    t[o] = y;
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
  setup(e, { emit: s }) {
    const t = e, o = $ < boolean > (t.data.depth < t.maxDepth), y = () => {
      o.value = !o.value;
    }, u = (n) => {
      s("selected", {
        key: n.key,
        value: n.value,
        path: n.path
      });
    }, b = (n) => {
      s("selected", n);
    }, S = (n) => isNaN(n.key) ? '"' + n.key + '":' : n.key + ":", a = (n) => {
      switch (typeof n) {
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
    }, c = m(() => ({
      "chevron-arrow": !0,
      opened: o.value
    })), d = m(() => ({
      "value-key": !0,
      "can-select": t.canSelect
    })), l = m(() => t.data.type === "array" ? t.data.length === 1 ? t.data.length + " element" : t.data.length + " elements" : t.data.length === 1 ? t.data.length + " property" : t.data.length + " properties"), v = m(() => typeof t.data.value > "u" ? "undefined" : JSON.stringify(t.data.value));
    return (n, r) => {
      const k = D("json-view-item");
      return i(), h("div", A, [
        e.data.type === "object" || e.data.type === "array" ? (i(), h("div", E, [
          f("button", {
            onClick: V(y, ["stop"]),
            class: "data-key",
            "aria-expanded": o ? "true" : "false"
          }, [
            f("div", {
              class: j(c.value)
            }, null, 2),
            C(" " + g(e.data.key) + ": ", 1),
            f("span", F, g(l.value), 1)
          ], 8, z),
          (i(!0), h(q, null, J(e.data.children, (p) => K((i(), N(k, {
            onSelected: b,
            key: S(p),
            data: p,
            maxDepth: e.maxDepth,
            canSelect: e.canSelect
          }, null, 8, ["data", "maxDepth", "canSelect"])), [
            [B, o]
          ])), 128))
        ])) : x("", !0),
        e.data.type === "value" ? (i(), h("div", {
          key: 1,
          class: j(d.value),
          onClick: r[0] || (r[0] = (p) => u(e.data)),
          onKeyup: [
            r[1] || (r[1] = _((p) => u(e.data), ["enter"])),
            r[2] || (r[2] = _((p) => u(e.data), ["space"]))
          ],
          role: e.canSelect ? "button" : void 0,
          tabindex: e.canSelect ? "0" : void 0
        }, [
          f("span", M, g(e.data.key) + ":", 1),
          f("span", {
            style: I(a(e.data.value))
          }, g(v.value), 5)
        ], 42, L)) : x("", !0)
      ]);
    };
  }
}), H = /* @__PURE__ */ O(G, [["__scopeId", "data-v-2c37d786"]]);
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
  setup(e, { emit: s }) {
    const t = e, o = (a, c, d, l, v) => {
      if (y(c)) {
        let n = [];
        for (let [r, k] of Object.entries(c))
          n.push(
            o(
              r,
              k,
              d + 1,
              v ? `${l}${a}.` : `${l}`,
              !0
            )
          );
        return {
          key: a,
          type: "object",
          depth: d,
          path: l,
          length: n.length,
          children: n
        };
      } else if (u(c)) {
        let n = [];
        for (let r = 0; r < c.length; r++)
          n.push(
            o(
              r.toString(),
              c[r],
              d + 1,
              v ? `${l}${a}[${r}].` : `${l}`,
              !1
            )
          );
        return {
          key: a,
          type: "array",
          depth: d,
          path: l,
          length: n.length,
          children: n
        };
      } else
        return {
          key: a,
          type: "value",
          path: v ? l + a : l.slice(0, -1),
          depth: d,
          value: c
        };
    }, y = (a) => typeof a == "object" && a !== null && !u(a), u = (a) => Array.isArray(a), b = (a) => {
      s("selected", a);
    }, S = m(() => typeof t.data == "object" ? o(t.rootKey, { ...t.data }, 0, "", !0) : {
      key: t.rootKey,
      type: "value",
      path: "",
      depth: 0,
      value: t.data
    });
    return (a, c) => (i(), N(H, {
      class: j([{ "root-item": !0, dark: e.colorScheme === "dark" }]),
      data: S.value,
      maxDepth: e.maxDepth,
      onSelected: b
    }, null, 8, ["class", "data", "maxDepth"]));
  }
}), R = /* @__PURE__ */ O(Q, [["__scopeId", "data-v-7b624165"]]);
const W = {
  install: (e, s) => {
    e.component("JSONView", R);
  }
};
export {
  W as default
};
