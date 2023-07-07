import { defineComponent as O, ref as V, computed as m, resolveComponent as C, openBlock as i, createElementBlock as h, createElementVNode as f, withModifiers as q, normalizeClass as x, createTextVNode as K, toDisplayString as g, Fragment as J, renderList as B, withDirectives as I, createBlock as N, vShow as A, createCommentVNode as _, withKeys as w, normalizeStyle as E } from "vue";
const $ = (e, c) => {
  const t = e.__vccOpts || e;
  for (const [o, y] of c)
    t[o] = y;
  return t;
}, z = { class: "json-view-item" }, F = { key: 0 }, L = ["onClick", "aria-expanded"], M = { class: "properties" }, P = ["role", "tabindex"], T = { class: "value-key" }, G = O({
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
  setup(e, { emit: c }) {
    const t = e, o = V < boolean > (t.data.depth < t.maxDepth), y = () => {
      o.value = !o.value;
    }, d = (n) => {
      c("selected", {
        key: n.key,
        value: n.value,
        path: n.path
      });
    }, b = (n) => {
      c("selected", n);
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
    }, s = m(() => ({
      "chevron-arrow": !0,
      opened: o.value
    })), u = m(() => ({
      "value-key": !0,
      "can-select": t.canSelect
    })), l = m(() => t.data.type === "array" ? t.data.length === 1 ? t.data.length + " element" : t.data.length + " elements" : t.data.length === 1 ? t.data.length + " property" : t.data.length + " properties"), p = m(() => typeof t.data.value > "u" ? "undefined" : JSON.stringify(t.data.value));
    return (n, r) => {
      const k = C("json-view-item");
      return i(), h("div", z, [
        e.data.type === "object" || e.data.type === "array" ? (i(), h("div", F, [
          f("button", {
            onClick: q(y, ["stop"]),
            class: "data-key",
            "aria-expanded": o ? "true" : "false"
          }, [
            f("div", {
              class: x(s.value)
            }, null, 2),
            K(" " + g(e.data.key) + ": ", 1),
            f("span", M, g(l.value), 1)
          ], 8, L),
          (i(!0), h(J, null, B(e.data.children, (v) => I((i(), N(k, {
            onSelected: b,
            key: S(v),
            data: v,
            maxDepth: e.maxDepth,
            canSelect: e.canSelect
          }, null, 8, ["data", "maxDepth", "canSelect"])), [
            [A, o]
          ])), 128))
        ])) : _("", !0),
        e.data.type === "value" ? (i(), h("div", {
          key: 1,
          class: x(u.value),
          onClick: r[0] || (r[0] = (v) => d(e.data)),
          onKeyup: [
            r[1] || (r[1] = w((v) => d(e.data), ["enter"])),
            r[2] || (r[2] = w((v) => d(e.data), ["space"]))
          ],
          role: e.canSelect ? "button" : void 0,
          tabindex: e.canSelect ? "0" : void 0
        }, [
          f("span", T, g(e.data.key) + ":", 1),
          f("span", {
            style: E(a(e.data.value))
          }, g(p.value), 5)
        ], 42, P)) : _("", !0)
      ]);
    };
  }
}), D = /* @__PURE__ */ $(H, [["__scopeId", "data-v-0ba975f4"]]);
const Q = O({
  name: "json-view"
}), R = /* @__PURE__ */ Object.assign(Q, {
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
  setup(e, { emit: c }) {
    const t = e, o = (a, s, u, l, p) => {
      if (y(s)) {
        let n = [];
        for (let [r, k] of Object.entries(s))
          n.push(
            o(
              r,
              k,
              u + 1,
              p ? `${l}${a}.` : `${l}`,
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
      } else if (d(s)) {
        let n = [];
        for (let r = 0; r < s.length; r++)
          n.push(
            o(
              r.toString(),
              s[r],
              u + 1,
              p ? `${l}${a}[${r}].` : `${l}`,
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
          path: p ? l + a : l.slice(0, -1),
          depth: u,
          value: s
        };
    }, y = (a) => typeof a == "object" && a !== null && !d(a), d = (a) => Array.isArray(a), b = (a) => {
      c("selected", a);
    }, S = m(() => typeof t.data == "object" ? o(t.rootKey, { ...t.data }, 0, "", !0) : {
      key: t.rootKey,
      type: "value",
      path: "",
      depth: 0,
      value: t.data
    });
    return (a, s) => (i(), N(D, {
      class: x([{ "root-item": !0, dark: e.colorScheme === "dark" }]),
      data: S.value,
      maxDepth: e.maxDepth,
      onSelected: b
    }, null, 8, ["class", "data", "maxDepth"]));
  }
}), U = /* @__PURE__ */ $(R, [["__scopeId", "data-v-5b340177"]]);
const j = { JSONView: U, JSONViewItem: D }, X = {
  install(e) {
    for (const c in j)
      if (j.hasOwnProperty(c)) {
        const t = j[c];
        e.component(t.name, t);
      }
  }
};
export {
  X as default
};
