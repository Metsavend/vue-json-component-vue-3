import { defineComponent as D, ref as O, computed as v, resolveComponent as C, openBlock as i, createElementBlock as h, createElementVNode as f, withModifiers as V, normalizeClass as x, createTextVNode as q, toDisplayString as p, Fragment as K, renderList as B, withDirectives as A, createBlock as N, vShow as E, createCommentVNode as w, withKeys as $, normalizeStyle as J } from "vue";
const z = { class: "json-view-item" }, F = { key: 0 }, L = ["onClick", "aria-expanded"], M = { class: "properties" }, P = ["role", "tabindex"], T = { class: "value-key" }, G = D({
  name: "json-view-item"
}), H = /* @__PURE__ */ Object.assign(G, {
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
    const t = e, o = O < boolean > (t.data.depth < t.maxDepth), g = () => {
      o.value = !o.value;
    }, d = (n) => {
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
    }, c = v(() => ({
      "chevron-arrow": !0,
      opened: o.value
    })), u = v(() => ({
      "value-key": !0,
      "can-select": t.canSelect
    })), l = v(() => t.data.type === "array" ? t.data.length === 1 ? t.data.length + " element" : t.data.length + " elements" : t.data.length === 1 ? t.data.length + " property" : t.data.length + " properties"), y = v(() => typeof t.data.value > "u" ? "undefined" : JSON.stringify(t.data.value));
    return (n, r) => {
      const j = C("json-view-item");
      return i(), h("div", z, [
        e.data.type === "object" || e.data.type === "array" ? (i(), h("div", F, [
          f("button", {
            onClick: V(g, ["stop"]),
            class: "data-key",
            "aria-expanded": o ? "true" : "false"
          }, [
            f("div", {
              class: x(c.value)
            }, null, 2),
            q(" " + p(e.data.key) + ": ", 1),
            f("span", M, p(l.value), 1)
          ], 8, L),
          (i(!0), h(K, null, B(e.data.children, (m) => A((i(), N(j, {
            onSelected: b,
            key: S(m),
            data: m,
            maxDepth: e.maxDepth,
            canSelect: e.canSelect
          }, null, 8, ["data", "maxDepth", "canSelect"])), [
            [E, o]
          ])), 128))
        ])) : w("", !0),
        e.data.type === "value" ? (i(), h("div", {
          key: 1,
          class: x(u.value),
          onClick: r[0] || (r[0] = (m) => d(e.data)),
          onKeyup: [
            r[1] || (r[1] = $((m) => d(e.data), ["enter"])),
            r[2] || (r[2] = $((m) => d(e.data), ["space"]))
          ],
          role: e.canSelect ? "button" : void 0,
          tabindex: e.canSelect ? "0" : void 0
        }, [
          f("span", T, p(e.data.key) + ":", 1),
          f("span", {
            style: J(a(e.data.value))
          }, p(y.value), 5)
        ], 42, P)) : w("", !0)
      ]);
    };
  }
}), I = D({
  name: "json-view"
}), Q = /* @__PURE__ */ Object.assign(I, {
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
    const t = e, o = (a, c, u, l, y) => {
      if (g(c)) {
        let n = [];
        for (let [r, j] of Object.entries(c))
          n.push(
            o(
              r,
              j,
              u + 1,
              y ? `${l}${a}.` : `${l}`,
              !0
            )
          );
        return {
          key: a,
          type: "object",
          depth: u,
          path: l,
          length: n.length,
          children: n
        };
      } else if (d(c)) {
        let n = [];
        for (let r = 0; r < c.length; r++)
          n.push(
            o(
              r.toString(),
              c[r],
              u + 1,
              y ? `${l}${a}[${r}].` : `${l}`,
              !1
            )
          );
        return {
          key: a,
          type: "array",
          depth: u,
          path: l,
          length: n.length,
          children: n
        };
      } else
        return {
          key: a,
          type: "value",
          path: y ? l + a : l.slice(0, -1),
          depth: u,
          value: c
        };
    }, g = (a) => typeof a == "object" && a !== null && !d(a), d = (a) => Array.isArray(a), b = (a) => {
      s("selected", a);
    }, S = v(() => typeof t.data == "object" ? o(t.rootKey, { ...t.data }, 0, "", !0) : {
      key: t.rootKey,
      type: "value",
      path: "",
      depth: 0,
      value: t.data
    });
    return (a, c) => (i(), N(H, {
      class: x([{ "root-item": !0, dark: e.colorScheme === "dark" }]),
      data: S.value,
      maxDepth: e.maxDepth,
      onSelected: b
    }, null, 8, ["class", "data", "maxDepth"]));
  }
});
const k = { JSONView: Q }, U = {
  install(e) {
    for (const s in k)
      if (k.hasOwnProperty(s)) {
        const t = k[s];
        e.component(t.name, t);
      }
  }
};
export {
  U as default
};
