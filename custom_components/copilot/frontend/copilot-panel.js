/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Yt = globalThis, Fe = Yt.ShadowRoot && (Yt.ShadyCSS === void 0 || Yt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ze = Symbol(), ns = /* @__PURE__ */ new WeakMap();
let Os = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== Ze) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Fe && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = ns.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && ns.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Js = (a) => new Os(typeof a == "string" ? a : a + "", void 0, Ze), j = (a, ...t) => {
  const e = a.length === 1 ? a[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + a[n + 1], a[0]);
  return new Os(e, a, Ze);
}, Xs = (a, t) => {
  if (Fe) a.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = Yt.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, a.appendChild(s);
  }
}, os = Fe ? (a) => a : (a) => a instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Js(e);
})(a) : a;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Qs, defineProperty: ti, getOwnPropertyDescriptor: ei, getOwnPropertyNames: si, getOwnPropertySymbols: ii, getPrototypeOf: ni } = Object, fe = globalThis, as = fe.trustedTypes, oi = as ? as.emptyScript : "", ai = fe.reactiveElementPolyfillSupport, Wt = (a, t) => a, Me = { toAttribute(a, t) {
  switch (t) {
    case Boolean:
      a = a ? oi : null;
      break;
    case Object:
    case Array:
      a = a == null ? a : JSON.stringify(a);
  }
  return a;
}, fromAttribute(a, t) {
  let e = a;
  switch (t) {
    case Boolean:
      e = a !== null;
      break;
    case Number:
      e = a === null ? null : Number(a);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(a);
      } catch {
        e = null;
      }
  }
  return e;
} }, Hs = (a, t) => !Qs(a, t), rs = { attribute: !0, type: String, converter: Me, reflect: !1, useDefault: !1, hasChanged: Hs };
Symbol.metadata ??= Symbol("metadata"), fe.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let bt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = rs) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && ti(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = ei(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const r = i?.call(this);
      n?.call(this, o), this.requestUpdate(t, r, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? rs;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Wt("elementProperties"))) return;
    const t = ni(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Wt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Wt("properties"))) {
      const e = this.properties, s = [...si(e), ...ii(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(os(i));
    } else t !== void 0 && e.push(os(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Xs(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : Me).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Me;
      this._$Em = i;
      const r = o.fromAttribute(e, n.type);
      this[i] = r ?? this._$Ej?.get(i) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (i === !1 && (n = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? Hs)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: n }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, n] of this._$Ep) this[i] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, n] of s) {
        const { wrapped: o } = n, r = this[i];
        o !== !0 || this._$AL.has(i) || r === void 0 || this.C(i, void 0, n, r);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
bt.elementStyles = [], bt.shadowRootOptions = { mode: "open" }, bt[Wt("elementProperties")] = /* @__PURE__ */ new Map(), bt[Wt("finalized")] = /* @__PURE__ */ new Map(), ai?.({ ReactiveElement: bt }), (fe.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ye = globalThis, ls = (a) => a, Jt = Ye.trustedTypes, cs = Jt ? Jt.createPolicy("lit-html", { createHTML: (a) => a }) : void 0, Bs = "$lit$", pt = `lit$${Math.random().toFixed(9).slice(2)}$`, Rs = "?" + pt, ri = `<${Rs}>`, $t = document, Ht = () => $t.createComment(""), Bt = (a) => a === null || typeof a != "object" && typeof a != "function", Ge = Array.isArray, li = (a) => Ge(a) || typeof a?.[Symbol.iterator] == "function", _e = `[ 	
\f\r]`, Et = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ps = /-->/g, ds = />/g, ut = RegExp(`>|${_e}(?:([^\\s"'>=/]+)(${_e}*=${_e}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), hs = /'/g, us = /"/g, Is = /^(?:script|style|textarea|title)$/i, Vs = (a) => (t, ...e) => ({ _$litType$: a, strings: t, values: e }), m = Vs(1), $ = Vs(2), kt = Symbol.for("lit-noChange"), _ = Symbol.for("lit-nothing"), ms = /* @__PURE__ */ new WeakMap(), ft = $t.createTreeWalker($t, 129);
function Ns(a, t) {
  if (!Ge(a) || !a.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return cs !== void 0 ? cs.createHTML(t) : t;
}
const ci = (a, t) => {
  const e = a.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = Et;
  for (let r = 0; r < e; r++) {
    const l = a[r];
    let p, d, h = -1, u = 0;
    for (; u < l.length && (o.lastIndex = u, d = o.exec(l), d !== null); ) u = o.lastIndex, o === Et ? d[1] === "!--" ? o = ps : d[1] !== void 0 ? o = ds : d[2] !== void 0 ? (Is.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = ut) : d[3] !== void 0 && (o = ut) : o === ut ? d[0] === ">" ? (o = i ?? Et, h = -1) : d[1] === void 0 ? h = -2 : (h = o.lastIndex - d[2].length, p = d[1], o = d[3] === void 0 ? ut : d[3] === '"' ? us : hs) : o === us || o === hs ? o = ut : o === ps || o === ds ? o = Et : (o = ut, i = void 0);
    const f = o === ut && a[r + 1].startsWith("/>") ? " " : "";
    n += o === Et ? l + ri : h >= 0 ? (s.push(p), l.slice(0, h) + Bs + l.slice(h) + pt + f) : l + pt + (h === -2 ? r : f);
  }
  return [Ns(a, n + (a[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Rt {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const r = t.length - 1, l = this.parts, [p, d] = ci(t, e);
    if (this.el = Rt.createElement(p, s), ft.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = ft.nextNode()) !== null && l.length < r; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(Bs)) {
          const u = d[o++], f = i.getAttribute(h).split(pt), g = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: n, name: g[2], strings: f, ctor: g[1] === "." ? di : g[1] === "?" ? hi : g[1] === "@" ? ui : ge }), i.removeAttribute(h);
        } else h.startsWith(pt) && (l.push({ type: 6, index: n }), i.removeAttribute(h));
        if (Is.test(i.tagName)) {
          const h = i.textContent.split(pt), u = h.length - 1;
          if (u > 0) {
            i.textContent = Jt ? Jt.emptyScript : "";
            for (let f = 0; f < u; f++) i.append(h[f], Ht()), ft.nextNode(), l.push({ type: 2, index: ++n });
            i.append(h[u], Ht());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Rs) l.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(pt, h + 1)) !== -1; ) l.push({ type: 7, index: n }), h += pt.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = $t.createElement("template");
    return s.innerHTML = t, s;
  }
}
function St(a, t, e = a, s) {
  if (t === kt) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = Bt(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(a), i._$AT(a, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = St(a, i._$AS(a, t.values), i, s)), t;
}
class pi {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? $t).importNode(e, !0);
    ft.currentNode = i;
    let n = ft.nextNode(), o = 0, r = 0, l = s[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let p;
        l.type === 2 ? p = new It(n, n.nextSibling, this, t) : l.type === 1 ? p = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (p = new mi(n, this, t)), this._$AV.push(p), l = s[++r];
      }
      o !== l?.index && (n = ft.nextNode(), o++);
    }
    return ft.currentNode = $t, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class It {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = _, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = St(this, t, e), Bt(t) ? t === _ || t == null || t === "" ? (this._$AH !== _ && this._$AR(), this._$AH = _) : t !== this._$AH && t !== kt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : li(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== _ && Bt(this._$AH) ? this._$AA.nextSibling.data = t : this.T($t.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Rt.createElement(Ns(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const n = new pi(i, this), o = n.u(this.options);
      n.p(e), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ms.get(t.strings);
    return e === void 0 && ms.set(t.strings, e = new Rt(t)), e;
  }
  k(t) {
    Ge(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new It(this.O(Ht()), this.O(Ht()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = ls(t).nextSibling;
      ls(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class ge {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = _, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = _;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = St(this, t, e, 0), o = !Bt(t) || t !== this._$AH && t !== kt, o && (this._$AH = t);
    else {
      const r = t;
      let l, p;
      for (t = n[0], l = 0; l < n.length - 1; l++) p = St(this, r[s + l], e, l), p === kt && (p = this._$AH[l]), o ||= !Bt(p) || p !== this._$AH[l], p === _ ? t = _ : t !== _ && (t += (p ?? "") + n[l + 1]), this._$AH[l] = p;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === _ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class di extends ge {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === _ ? void 0 : t;
  }
}
class hi extends ge {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== _);
  }
}
class ui extends ge {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = St(this, t, e, 0) ?? _) === kt) return;
    const s = this._$AH, i = t === _ && s !== _ || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== _ && (s === _ || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class mi {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    St(this, t);
  }
}
const fi = Ye.litHtmlPolyfillSupport;
fi?.(Rt, It), (Ye.litHtmlVersions ??= []).push("3.3.3");
const gi = (a, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = e?.renderBefore ?? null;
    s._$litPart$ = i = new It(t.insertBefore(Ht(), n), n, void 0, e ?? {});
  }
  return i._$AI(a), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qe = globalThis;
class N extends bt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = gi(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return kt;
  }
}
N._$litElement$ = !0, N.finalized = !0, qe.litElementHydrateSupport?.({ LitElement: N });
const _i = qe.litElementPolyfillSupport;
_i?.({ LitElement: N });
(qe.litElementVersions ??= []).push("4.2.2");
const fs = "copilot.standalone.plant", At = "copilot.standalone.icons";
function Vt(a, t) {
  try {
    const e = localStorage.getItem(a);
    return e ? JSON.parse(e) : t;
  } catch {
    return t;
  }
}
function $e(a, t) {
  try {
    localStorage.setItem(a, JSON.stringify(t));
  } catch {
  }
}
class $i {
  constructor(t) {
    this.hass = t;
  }
  get standalone() {
    return !!this.hass.__standalone;
  }
  setHass(t) {
    this.hass = t;
  }
  async getConfig() {
    return this.standalone ? { version: "demo", plant: Vt(fs, null), options: {}, is_admin: !0 } : this.hass.callWS({ type: "copilot/config/get" });
  }
  async saveConfig(t) {
    if (this.standalone) return $e(fs, t);
    await this.hass.callWS({ type: "copilot/config/save", plant: t });
  }
  async scan(t) {
    return this.standalone ? { source: "ems_esp", entity_count: 0, entities: [], suggestions: [] } : this.hass.callWS({ type: "copilot/mapping/scan", source: "ems_esp", plant: t });
  }
  async listIcons() {
    return this.standalone ? Vt(At, []) : (await this.hass.callWS({ type: "copilot/icons/list" })).icons;
  }
  async uploadIcon(t, e, s, i) {
    if (this.standalone) {
      const n = Vt(At, []), o = { id: Math.random().toString(16).slice(2, 14), name: t, mime: e, iso: i, size: s.length, data_url: `data:${e};base64,${s}` };
      return n.push(o), $e(At, n), o;
    }
    return (await this.hass.callWS({ type: "copilot/icons/upload", name: t, mime: e, data: s, iso: i })).icon;
  }
  async deleteIcon(t) {
    if (this.standalone) return $e(At, Vt(At, []).filter((e) => e.id !== t));
    await this.hass.callWS({ type: "copilot/icons/delete", icon_id: t });
  }
  async listMessages() {
    return this.standalone ? [] : (await this.hass.callWS({ type: "copilot/messages/list" })).messages;
  }
  async subscribeMessages(t) {
    return this.standalone || !this.hass.connection ? () => {
    } : this.hass.connection.subscribeMessage((e) => t(e.message), {
      type: "copilot/messages/subscribe"
    });
  }
  async clearMessages() {
    this.standalone || await this.hass.callWS({ type: "copilot/messages/clear" });
  }
}
const wi = {
  // navigation
  "nav.overview": "Übersicht",
  "nav.messages": "Meldungen",
  "nav.efficiency": "Effizienz",
  "ed.cop_ref": "COP laut Datenblatt bei A7/W35",
  "eff.live": "Live-COP",
  "eff.expected": "Soll bei A{out}/W{flow}",
  "eff.ratio": "Erreicht",
  "eff.ampel.green": "Läuft wie im Datenblatt",
  "eff.ampel.yellow": "Etwas unter Soll – beobachten",
  "eff.ampel.red": "Deutlich unter Soll – prüfen",
  "eff.no_live": "Kein Live-COP: Verdichter steht oder taut ab.",
  "eff.today": "Heute",
  "eff.yesterday": "Gestern",
  "eff.month": "Monat",
  "eff.year": "Jahr",
  "eff.estimate": "Schätzung",
  "eff.heat": "Wärme",
  "eff.el": "Strom",
  "eff.dhw_share": "Anteil Warmwasser",
  "eff.aux_share": "Anteil Zuheizer",
  "eff.daily": "Letzte 30 Tage",
  "eff.demo_note": "Demo: Heute und gestern stammen aus der Simulation, ältere Tage sowie Monat und Jahr sind eine Modellschätzung (Rhein-Main-Klima, 5 Personen).",
  "eff.missing.no_counters": "Für Monats- und Jahreswerte bitte an der Inneneinheit die Energiezähler „Wärme gesamt“ und „Strom gesamt“ zuordnen.",
  "eff.missing.no_statistics": "Die Energiezähler haben noch keine Langzeitstatistik. Sie entsteht automatisch, sobald die Entitäten eine state_class haben (bei EMS-ESP der Fall) – die ersten Werte erscheinen nach etwa einer Stunde.",
  "nav.config": "Konfiguration",
  "cfg.wizard": "Assistent",
  "cfg.editor": "Editor",
  "cfg.mapping": "Zuordnung",
  "cfg.icons": "Icons",
  "cfg.settings": "Einstellungen",
  // general
  on: "Ein",
  off: "Aus",
  save: "Speichern",
  saved: "Gespeichert",
  cancel: "Abbrechen",
  delete: "Löschen",
  apply: "Übernehmen",
  close: "Schließen",
  undo: "Rückgängig",
  redo: "Wiederholen",
  unsaved: "Ungespeicherte Änderungen",
  discard: "Verwerfen",
  none: "–",
  unavailable: "nicht verfügbar",
  readonly_hint: "Nur Administratoren können die Anlage konfigurieren.",
  standalone_hint: "Eigenständige Demo – Konfiguration wird nur im Browser gespeichert.",
  fullscreen: "Vollbild",
  fit: "Einpassen",
  zoom_in: "Vergrößern",
  zoom_out: "Verkleinern",
  menu: "Menü",
  // modes
  "mode.heating": "Heizen",
  "mode.hot_water": "Warmwasser",
  "mode.defrost": "Abtauen",
  "mode.cooling": "Kühlen",
  "mode.off": "Bereit",
  "mode.compressor_alarm": "Störung",
  "mode.pool": "Pool",
  "mode.pool_heating": "Pool",
  "mode.unknown": "Unbekannt",
  // kpi
  "kpi.mode": "Betrieb",
  "kpi.outdoor": "Außen",
  "kpi.heat": "Wärme",
  "kpi.power": "Strom",
  "kpi.cop": "COP",
  "kpi.supply": "Vorlauf",
  "kpi.dhw": "Warmwasser",
  "kpi.room": "Raum",
  // demo
  demo: "Demo",
  "demo.active": "Demo-Modus",
  "demo.banner": "Demo-Modus: simulierte Werte, keine Verbindung zur Anlage",
  "demo.speed": "Tempo",
  "demo.outdoor": "Außentemperatur",
  "demo.time": "Simulationszeit",
  "demo.scenarios": "Szenarien",
  "scn.normal": "Normalbetrieb",
  "scn.winter": "Wintermorgen −10 °C",
  "scn.transition": "Übergangszeit 12 °C",
  "scn.shower": "Warmwasser zapfen",
  "scn.defrost": "Abtauung",
  "scn.dim14a": "§14a-Dimmung",
  "scn.pv": "PV-Überschuss",
  "scn.disinfect": "Therm. Desinfektion",
  "scn.fault": "Störung simulieren",
  "scn.reset": "Zurücksetzen",
  // messages
  "msg.title": "Meldungen",
  "msg.empty": "Keine Meldungen",
  "msg.active": "Aktiv",
  "msg.history": "Verlauf",
  "msg.clear": "Verlauf leeren",
  "msg.since": "seit {time}",
  "msg.duration": "Dauer {duration}",
  "msg.filter_all": "Alle",
  "msg.level.info": "Info",
  "msg.level.notice": "Hinweis",
  "msg.level.warning": "Warnung",
  "msg.level.error": "Störung",
  "msgk.dhw_charging": "Warmwasserladung ({component})",
  "msgk.dhw_disinfection": "Thermische Desinfektion läuft ({component})",
  "msgk.input_active": "Externer Eingang {input} aktiv{label_sfx}",
  "msgk.aux_heater": "Elektrischer Zuheizer aktiv",
  "msgk.defrost": "Abtauung der Außeneinheit",
  "msgk.compressor_alarm": "Verdichter-Störung gemeldet",
  "msgk.pressure_low": "Anlagendruck niedrig: {value} bar (min. {min} bar)",
  "msgk.pressure_high": "Anlagendruck hoch: {value} bar (max. {max} bar)",
  "msgk.error_code": "Fehlercode: {code}",
  "msgk.data_unavailable": "Keine Daten: {missing} von {total} Entitäten nicht verfügbar – Gateway prüfen",
  "msgk.sim_fault": "Simulierte Störung: Hochdruck-Abschaltung (Demo)",
  "msgk.sim_scenario": "Szenario gestartet: {name}",
  "ed.nominal": "Nennleistung (kW)",
  "ed.not": "nicht",
  "ed.or": "oder mindestens eine davon",
  "kpi.target": "Soll",
  "st.heat_load": "Heizlast bei Normaußentemperatur (kW, für Demo)",
  "card.show_kpis": "Kennzahlen anzeigen",
  "card.show_messages": "Meldungsspalte anzeigen",
  "card.show_demo": "Demo-Steuerung anzeigen",
  "card.height": "Höhe (z. B. 600px; leer = automatisch)",
  "card.hint": "Tipp: Als einzige Karte in einer Ansicht vom Typ „Panel“ füllt COPilot den ganzen Bildschirm.",
  // components
  "type.outdoor_unit": "Außeneinheit",
  "type.indoor_unit": "Inneneinheit",
  "type.buffer": "Pufferspeicher",
  "type.dhw_tank": "Warmwasserspeicher",
  "type.pump": "Pumpe",
  "type.valve_3way": "3-Wege-Ventil",
  "type.mixer": "Mischer",
  "type.radiators": "Heizkörper",
  "type.floor_heating": "Fußbodenheizung",
  "type.tap": "Zapfstelle",
  "type.water_inlet": "Kaltwasser",
  "type.separator": "Schlammabscheider",
  "type.expansion_vessel": "Ausdehnungsgefäß",
  "type.junction": "Abzweig",
  "type.value_tile": "Wertekachel",
  "type.label": "Beschriftung",
  "kind.supply": "Vorlauf",
  "kind.return": "Rücklauf",
  "kind.dhw_hot": "Warmwasser",
  "kind.dhw_cold": "Kaltwasser",
  "kind.circulation": "Zirkulation",
  // slots
  "slot.outdoor_temp": "Außentemperatur",
  "slot.air_in_temp": "Lufteintritt (TL2)",
  "slot.activity": "Betriebszustand",
  "slot.compressor_on": "Verdichter",
  "slot.compressor_speed": "Verdichterdrehzahl",
  "slot.fan_speed": "Lüfter",
  "slot.heat_power": "Wärmeleistung",
  "slot.el_power": "Elektr. Leistung",
  "slot.compressor_starts": "Verdichterstarts",
  "slot.evap_in_temp": "Verdampfereintritt (TR4)",
  "slot.comp_out_temp": "Heißgas (TR6)",
  "slot.comp_in_temp": "Sauggas (TR5)",
  "slot.hp_temp": "Hochdruck (PH1)",
  "slot.lp_temp": "Niederdruck (PL1)",
  "slot.drain_pan_temp": "Kondensatwanne (TA4)",
  "slot.silent_mode": "Silentmodus",
  "slot.supply_temp": "Vorlauf",
  "slot.return_temp": "Rücklauf",
  "slot.indoor_unit.supply_temp": "Vorlauf (TC1)",
  "slot.indoor_unit.return_temp": "Rücklauf (TC0)",
  "slot.condenser_temp": "Kondensator (TC3)",
  "slot.target_flow_temp": "Vorlauf-Soll",
  "slot.pressure": "Anlagendruck",
  "slot.flow": "Durchfluss",
  "slot.aux_level": "Zuheizer",
  "slot.aux_status": "Zuheizer-Status",
  "slot.aux_step1": "Zuheizer Stufe 1",
  "slot.aux_step2": "Zuheizer Stufe 2",
  "slot.aux_step3": "Zuheizer Stufe 3",
  "slot.service_code": "Statuscode",
  "slot.service_code_number": "Statuscode-Nr.",
  "slot.last_error": "Letzter Fehler",
  "slot.input1": "Ext. Eingang 1",
  "slot.input2": "Ext. Eingang 2",
  "slot.input3": "Ext. Eingang 3",
  "slot.input4": "Ext. Eingang 4",
  "slot.el_energy_total": "Strom gesamt",
  "slot.el_energy_heating": "Strom Heizen",
  "slot.el_energy_dhw": "Strom Warmwasser",
  "slot.heat_energy_total": "Wärme gesamt",
  "slot.heat_energy_heating": "Wärme Heizen",
  "slot.heat_energy_dhw": "Wärme Warmwasser",
  "slot.aux_energy_total": "Strom Zuheizer",
  "slot.uptime_total": "Betriebszeit",
  "slot.heating_active": "Heizbetrieb",
  "slot.dhw_active": "WW-Betrieb",
  "slot.running": "Läuft",
  "slot.speed": "Drehzahl",
  "slot.power": "Leistung",
  "slot.position": "Stellung",
  "slot.temp_top": "Temperatur oben",
  "slot.temp_mid": "Temperatur Mitte",
  "slot.temp_bottom": "Temperatur unten",
  "slot.setpoint": "Solltemperatur",
  "slot.charging": "Ladung",
  "slot.onetime": "Einmalladung",
  "slot.disinfecting": "Desinfektion",
  "slot.flow_temp": "Vorlauf",
  "slot.room_temp": "Raumtemperatur",
  "slot.room_setpoint": "Raum-Soll",
  "slot.mode": "Betriebsart",
  "slot.summer_mode": "Sommerbetrieb",
  "slot.operating_state": "Betriebszustand",
  "slot.design_temp": "Auslegungstemperatur",
  "slot.offset_temp": "Parallelverschiebung",
  "slot.min_flow_temp": "Min. Vorlauf",
  "slot.max_flow_temp": "Max. Vorlauf",
  "slot.temp": "Temperatur",
  "slot.value": "Wert",
  // overview
  "ov.no_plant": "Noch keine Anlage konfiguriert.",
  "ov.start_wizard": "Assistent starten",
  "ov.details": "Details",
  "ov.history24": "Letzte 24 h",
  "ov.min": "Min",
  "ov.max": "Max",
  "ov.now": "Aktuell",
  "ov.no_history": "Kein Verlauf verfügbar",
  "ov.open_entity": "Entität öffnen",
  "ov.not_bound": "nicht zugeordnet",
  // wizard
  "wz.title": "Anlagen-Assistent",
  "wz.intro": "Beschreibe deine Anlage, der Assistent erzeugt daraus ein Schema. Danach kannst du es im Editor frei anpassen.",
  "wz.name": "Name der Anlage",
  "wz.hp": "Wärmepumpe",
  "wz.outdoor": "Außeneinheit / Modell",
  "wz.indoor": "Inneneinheit",
  "wz.buffer": "Pufferspeicher",
  "wz.buffer.none": "Kein Puffer",
  "wz.buffer.parallel": "Parallel (Trennspeicher, 4-Punkt, mit Sekundärpumpe)",
  "wz.buffer.serial": "In Reihe (im Rücklauf)",
  "wz.buffer_volume": "Puffervolumen (l)",
  "wz.dhw": "Warmwasser",
  "wz.dhw.none": "Kein Warmwasser",
  "wz.dhw.tank": "Externer Speicher über 3-Wege-Ventil",
  "wz.dhw_volume": "Speichervolumen (l)",
  "wz.circulation": "Zirkulationsleitung",
  "wz.circuits": "Heizkreise",
  "wz.circuit": "Heizkreis {n}",
  "wz.add_circuit": "Heizkreis hinzufügen",
  "wz.remove": "Entfernen",
  "wz.emitter": "Wärmeübergabe",
  "wz.mixed": "gemischt",
  "wz.aux": "Elektrischer Zuheizer",
  "wz.aux_kw": "Zuheizer-Leistung (kW)",
  "wz.extras": "Extras",
  "wz.separator": "Partikelfilter SC1 und Schlammabscheider im Rücklauf vor der Inneneinheit",
  "wz.separator_short": "Abscheider",
  "wz.expansion": "Ausdehnungsgefäß (im Rücklauf vor der Inneneinheit)",
  "wz.generate": "Schema erzeugen",
  "wz.replace_confirm": "Das erzeugt ein neues Schema und ersetzt die aktuelle Anlage (Zuordnungen gleicher Komponenten bleiben erhalten). Fortfahren?",
  "wz.example": "Beispielanlage laden",
  "wz.done": "Schema erzeugt – jetzt im Editor anpassen oder Werte zuordnen.",
  // editor
  "ed.palette": "Komponenten",
  "ed.props": "Eigenschaften",
  "ed.nothing": "Komponente oder Leitung auswählen. Leitungen ziehst du, indem du nacheinander zwei Anschlusspunkte anklickst.",
  "ed.label": "Bezeichnung",
  "ed.model": "Modell",
  "ed.rotation": "Drehung",
  "ed.icon": "Icon",
  "ed.icon_default": "Standard",
  "ed.role": "Funktion",
  "ed.circuit": "Heizkreis-Nr.",
  "ed.dhw_circuit": "WW-Kreis-Nr.",
  "ed.bindings": "Werte & Entitäten",
  "ed.show": "anzeigen",
  "ed.pipe": "Leitung",
  "ed.kind": "Art",
  "ed.flow_when": "Animiert, wenn",
  "ed.add_cond": "Bedingung hinzufügen",
  "ed.temp_entity": "Temperatur-Entität",
  "ed.flow_entity": "Durchfluss-Entität",
  "ed.reset_bend": "Verlauf zurücksetzen",
  "ed.connecting": "Zielanschluss anklicken (Esc bricht ab)",
  "ed.grid": "Rastergröße",
  "ed.entries": "Einträge",
  "ed.add_entry": "Eintrag hinzufügen",
  "ed.text": "Text",
  "ed.volume": "Volumen (l)",
  "ed.input_labels": "Bezeichnung ext. Eingänge",
  "ed.pressure_limits": "Druckgrenzen (bar)",
  "ed.b_label": "Bezeichnung Stellung B",
  "ed.duplicate": "Duplizieren",
  "ed.entity_search": "Entität suchen …",
  "role.primary": "Primärpumpe (PC0)",
  "role.secondary": "Heizkreispumpe / Sekundär (PC1)",
  "role.hc": "Heizkreispumpe gemischter HK",
  "role.circulation": "Zirkulationspumpe",
  "role.other": "Sonstige",
  "role.dhw_switch": "Umschaltung Heizen / Warmwasser (VW1)",
  "state.running": "läuft",
  "state.a": "Stellung A (Heizen)",
  "state.b": "Stellung B (Warmwasser)",
  "state.defrost": "taut ab",
  "state.flowing": "zapft",
  "state.charging": "lädt",
  "state.aux": "Zuheizer an",
  "state.pc1": "PC1 läuft",
  "slot.pc0_running": "PC0 läuft",
  "slot.pc0_speed": "PC0 Drehzahl",
  "slot.vw1_position": "VW1 Stellung (an = Warmwasser)",
  "slot.pc1_running": "PC1 läuft",
  "slot.pc1_speed": "PC1 Drehzahl",
  "slot.dhw_temp": "Warmwasser",
  "slot.dhw_setpoint": "WW-Soll",
  "slot.dhw_charging": "WW-Ladung",
  "slot.buffer_temp": "Puffer",
  "ed.variant": "Bauform",
  // mapping
  "map.title": "Automatische Zuordnung",
  "map.intro": "Sucht EMS-ESP-Entitäten in Home Assistant und ordnet sie den Komponenten zu. Vorhandene Zuordnungen überschreibst du nur, wenn du sie anhakst.",
  "map.scan": "Entitäten suchen",
  "map.found": "{count} EMS-ESP-Entitäten gefunden",
  "map.none": "Keine EMS-ESP-Entitäten gefunden.",
  "map.none_help": "Gateway einrichten: In EMS-ESP MQTT aktivieren, „Home Assistant MQTT Discovery“ einschalten und als Entity-ID-Format „Single instance, short names“ wählen. In Home Assistant muss die MQTT-Integration laufen.",
  "map.component": "Komponente",
  "map.slot": "Wert",
  "map.entity": "Entität",
  "map.value": "Aktuell",
  "map.current": "bisher",
  "map.confidence": "Treffer",
  "map.conf.high": "sicher",
  "map.conf.medium": "Alternative",
  "map.apply": "Ausgewählte übernehmen",
  "map.applied": "{count} Zuordnungen übernommen",
  "map.select_all": "Alle",
  "map.unbound": "Ohne Zuordnung",
  "map.unbound_hint": "Diese Werte bekommst du im Editor per Entitätssuche – z. B. Fritzbox-Steckdose der Zirkulation, Puffer-Fühler an den Tauchhülsen oder Werte aus SolaX/evcc.",
  "map.standalone": "In der eigenständigen Demo gibt es keine Home-Assistant-Entitäten.",
  // icons
  "ic.title": "Eigene Icons",
  "ic.intro": "Lade eigene Grafiken hoch (SVG, PNG, WebP, JPG, max. 256 KB). Zuweisen kannst du sie im Editor pro Komponente oder hier als Standard für einen Komponententyp. Die mitgelieferten Icons sind eigene Zeichnungen ohne Herstellergrafiken.",
  "ic.upload": "Icon hochladen",
  "ic.iso": "Für isometrische Ansicht",
  "ic.empty": "Noch keine eigenen Icons.",
  "ic.type_default": "Standard für Typ",
  "ic.err.unsupported_type": "Dateityp nicht unterstützt",
  "ic.err.too_large": "Datei zu groß (max. 256 KB)",
  "ic.err.unsafe_svg": "SVG enthält Skripte oder aktive Inhalte",
  "ic.err.invalid_data": "Datei ist beschädigt oder hat das falsche Format",
  "ic.err.too_many": "Zu viele Icons",
  // settings
  "st.title": "Einstellungen",
  "st.style": "Darstellung",
  "st.style.flat": "Modern SCADA (flach)",
  "st.style.iso": "Isometrisch 2.5D (ab v0.2)",
  "st.demo": "Demo-Modus",
  "st.demo_hint": "Zeigt simulierte Werte mit laufenden Animationen – ideal, solange die Anlage noch nicht angeschlossen ist.",
  "st.language": "Sprache",
  "st.lang.auto": "Wie Home Assistant",
  "st.version": "Version",
  "st.reset": "Anlage zurücksetzen",
  "st.reset_confirm": "Komplette Anlage löschen und mit der Beispielanlage neu starten?"
}, vi = {
  "nav.overview": "Overview",
  "nav.messages": "Messages",
  "nav.efficiency": "Efficiency",
  "ed.cop_ref": "Datasheet COP at A7/W35",
  "eff.live": "Live COP",
  "eff.expected": "Expected at A{out}/W{flow}",
  "eff.ratio": "Achieved",
  "eff.ampel.green": "Performing as per datasheet",
  "eff.ampel.yellow": "Slightly below target – keep an eye on it",
  "eff.ampel.red": "Clearly below target – check",
  "eff.no_live": "No live COP: compressor off or defrosting.",
  "eff.today": "Today",
  "eff.yesterday": "Yesterday",
  "eff.month": "Month",
  "eff.year": "Year",
  "eff.estimate": "estimate",
  "eff.heat": "Heat",
  "eff.el": "Electricity",
  "eff.dhw_share": "Hot water share",
  "eff.aux_share": "Backup heater share",
  "eff.daily": "Last 30 days",
  "eff.demo_note": "Demo: today and yesterday come from the simulation; older days, month and year are a model estimate (Rhine-Main climate, 5 persons).",
  "eff.missing.no_counters": "For monthly and yearly values, map the energy counters “Heat total” and “Electricity total” on the indoor unit.",
  "eff.missing.no_statistics": "The energy counters have no long-term statistics yet. They are created automatically for entities with a state_class (EMS-ESP provides it) – first values appear after about an hour.",
  "nav.config": "Configuration",
  "cfg.wizard": "Wizard",
  "cfg.editor": "Editor",
  "cfg.mapping": "Mapping",
  "cfg.icons": "Icons",
  "cfg.settings": "Settings",
  on: "On",
  off: "Off",
  save: "Save",
  saved: "Saved",
  cancel: "Cancel",
  delete: "Delete",
  apply: "Apply",
  close: "Close",
  undo: "Undo",
  redo: "Redo",
  unsaved: "Unsaved changes",
  discard: "Discard",
  none: "–",
  unavailable: "unavailable",
  readonly_hint: "Only administrators can configure the plant.",
  standalone_hint: "Standalone demo – configuration is stored in this browser only.",
  fullscreen: "Fullscreen",
  fit: "Fit",
  zoom_in: "Zoom in",
  zoom_out: "Zoom out",
  menu: "Menu",
  "mode.heating": "Heating",
  "mode.hot_water": "Hot water",
  "mode.defrost": "Defrosting",
  "mode.cooling": "Cooling",
  "mode.off": "Standby",
  "mode.compressor_alarm": "Fault",
  "mode.pool": "Pool",
  "mode.pool_heating": "Pool",
  "mode.unknown": "Unknown",
  "kpi.mode": "Mode",
  "kpi.outdoor": "Outdoor",
  "kpi.heat": "Heat",
  "kpi.power": "Power",
  "kpi.cop": "COP",
  "kpi.supply": "Supply",
  "kpi.dhw": "Hot water",
  "kpi.room": "Room",
  demo: "Demo",
  "demo.active": "Demo mode",
  "demo.banner": "Demo mode: simulated values, not connected to the plant",
  "demo.speed": "Speed",
  "demo.outdoor": "Outdoor temperature",
  "demo.time": "Simulation time",
  "demo.scenarios": "Scenarios",
  "scn.normal": "Normal operation",
  "scn.winter": "Winter morning −10 °C",
  "scn.transition": "Mild season 12 °C",
  "scn.shower": "Draw hot water",
  "scn.defrost": "Defrost",
  "scn.dim14a": "§14a power limit",
  "scn.pv": "PV surplus",
  "scn.disinfect": "Disinfection",
  "scn.fault": "Simulate fault",
  "scn.reset": "Reset",
  "msg.title": "Messages",
  "msg.empty": "No messages",
  "msg.active": "Active",
  "msg.history": "History",
  "msg.clear": "Clear history",
  "msg.since": "since {time}",
  "msg.duration": "duration {duration}",
  "msg.filter_all": "All",
  "msg.level.info": "Info",
  "msg.level.notice": "Notice",
  "msg.level.warning": "Warning",
  "msg.level.error": "Fault",
  "msgk.dhw_charging": "Hot water charging ({component})",
  "msgk.dhw_disinfection": "Thermal disinfection running ({component})",
  "msgk.input_active": "External input {input} active{label_sfx}",
  "msgk.aux_heater": "Electric backup heater active",
  "msgk.defrost": "Outdoor unit defrosting",
  "msgk.compressor_alarm": "Compressor fault reported",
  "msgk.pressure_low": "System pressure low: {value} bar (min {min} bar)",
  "msgk.pressure_high": "System pressure high: {value} bar (max {max} bar)",
  "msgk.error_code": "Error code: {code}",
  "msgk.data_unavailable": "No data: {missing} of {total} entities unavailable – check the gateway",
  "msgk.sim_fault": "Simulated fault: high pressure cut-out (demo)",
  "msgk.sim_scenario": "Scenario started: {name}",
  "ed.nominal": "Nominal output (kW)",
  "ed.not": "not",
  "ed.or": "or at least one of",
  "kpi.target": "Target",
  "st.heat_load": "Design heat load (kW, used by the demo)",
  "card.show_kpis": "Show key figures",
  "card.show_messages": "Show messages column",
  "card.show_demo": "Show demo controls",
  "card.height": "Height (e.g. 600px; empty = automatic)",
  "card.hint": "Tip: as the only card of a view of type “Panel”, COPilot fills the whole screen.",
  "type.outdoor_unit": "Outdoor unit",
  "type.indoor_unit": "Indoor unit",
  "type.buffer": "Buffer tank",
  "type.dhw_tank": "Hot water cylinder",
  "type.pump": "Pump",
  "type.valve_3way": "3-way valve",
  "type.mixer": "Mixing valve",
  "type.radiators": "Radiators",
  "type.floor_heating": "Underfloor heating",
  "type.tap": "Tap",
  "type.water_inlet": "Cold water",
  "type.separator": "Dirt separator",
  "type.expansion_vessel": "Expansion vessel",
  "type.junction": "Junction",
  "type.value_tile": "Value tile",
  "type.label": "Label",
  "kind.supply": "Supply",
  "kind.return": "Return",
  "kind.dhw_hot": "Hot water",
  "kind.dhw_cold": "Cold water",
  "kind.circulation": "Circulation",
  "slot.outdoor_temp": "Outdoor temperature",
  "slot.air_in_temp": "Air inlet (TL2)",
  "slot.activity": "Activity",
  "slot.compressor_on": "Compressor",
  "slot.compressor_speed": "Compressor speed",
  "slot.fan_speed": "Fan",
  "slot.heat_power": "Heat output",
  "slot.el_power": "Electric power",
  "slot.compressor_starts": "Compressor starts",
  "slot.evap_in_temp": "Evaporator inlet (TR4)",
  "slot.comp_out_temp": "Hot gas (TR6)",
  "slot.comp_in_temp": "Suction gas (TR5)",
  "slot.hp_temp": "High pressure (PH1)",
  "slot.lp_temp": "Low pressure (PL1)",
  "slot.drain_pan_temp": "Drain pan (TA4)",
  "slot.silent_mode": "Silent mode",
  "slot.supply_temp": "Supply",
  "slot.return_temp": "Return",
  "slot.indoor_unit.supply_temp": "Supply (TC1)",
  "slot.indoor_unit.return_temp": "Return (TC0)",
  "slot.condenser_temp": "Condenser (TC3)",
  "slot.target_flow_temp": "Supply setpoint",
  "slot.pressure": "System pressure",
  "slot.flow": "Flow",
  "slot.aux_level": "Backup heater",
  "slot.aux_status": "Backup heater status",
  "slot.aux_step1": "Backup heater stage 1",
  "slot.aux_step2": "Backup heater stage 2",
  "slot.aux_step3": "Backup heater stage 3",
  "slot.service_code": "Status code",
  "slot.service_code_number": "Status code no.",
  "slot.last_error": "Last error",
  "slot.input1": "Ext. input 1",
  "slot.input2": "Ext. input 2",
  "slot.input3": "Ext. input 3",
  "slot.input4": "Ext. input 4",
  "slot.el_energy_total": "Electricity total",
  "slot.el_energy_heating": "Electricity heating",
  "slot.el_energy_dhw": "Electricity hot water",
  "slot.heat_energy_total": "Heat total",
  "slot.heat_energy_heating": "Heat heating",
  "slot.heat_energy_dhw": "Heat hot water",
  "slot.aux_energy_total": "Electricity backup heater",
  "slot.uptime_total": "Operating time",
  "slot.heating_active": "Heating",
  "slot.dhw_active": "Hot water mode",
  "slot.running": "Running",
  "slot.speed": "Speed",
  "slot.power": "Power",
  "slot.position": "Position",
  "slot.temp_top": "Temperature top",
  "slot.temp_mid": "Temperature middle",
  "slot.temp_bottom": "Temperature bottom",
  "slot.setpoint": "Setpoint",
  "slot.charging": "Charging",
  "slot.onetime": "One-time charge",
  "slot.disinfecting": "Disinfection",
  "slot.flow_temp": "Supply",
  "slot.room_temp": "Room temperature",
  "slot.room_setpoint": "Room setpoint",
  "slot.mode": "Mode",
  "slot.summer_mode": "Summer mode",
  "slot.operating_state": "Operating state",
  "slot.design_temp": "Design temperature",
  "slot.offset_temp": "Curve offset",
  "slot.min_flow_temp": "Min. supply",
  "slot.max_flow_temp": "Max. supply",
  "slot.temp": "Temperature",
  "slot.value": "Value",
  "ov.no_plant": "No plant configured yet.",
  "ov.start_wizard": "Start wizard",
  "ov.details": "Details",
  "ov.history24": "Last 24 h",
  "ov.min": "Min",
  "ov.max": "Max",
  "ov.now": "Now",
  "ov.no_history": "No history available",
  "ov.open_entity": "Open entity",
  "ov.not_bound": "not mapped",
  "wz.title": "Plant wizard",
  "wz.intro": "Describe your plant and the wizard draws a schematic. You can fine-tune it in the editor afterwards.",
  "wz.name": "Plant name",
  "wz.hp": "Heat pump",
  "wz.outdoor": "Outdoor unit / model",
  "wz.indoor": "Indoor unit",
  "wz.buffer": "Buffer tank",
  "wz.buffer.none": "No buffer",
  "wz.buffer.parallel": "Parallel (separator tank, 4 connections, secondary pump)",
  "wz.buffer.serial": "In series (in the return)",
  "wz.buffer_volume": "Buffer volume (l)",
  "wz.dhw": "Hot water",
  "wz.dhw.none": "No hot water",
  "wz.dhw.tank": "External cylinder via 3-way valve",
  "wz.dhw_volume": "Cylinder volume (l)",
  "wz.circulation": "Circulation line",
  "wz.circuits": "Heating circuits",
  "wz.circuit": "Circuit {n}",
  "wz.add_circuit": "Add circuit",
  "wz.remove": "Remove",
  "wz.emitter": "Emitters",
  "wz.mixed": "mixed",
  "wz.aux": "Electric backup heater",
  "wz.aux_kw": "Backup heater power (kW)",
  "wz.extras": "Extras",
  "wz.separator": "Particle filter SC1 and dirt separator in the return in front of the indoor unit",
  "wz.separator_short": "Separator",
  "wz.expansion": "Expansion vessel",
  "wz.generate": "Generate schematic",
  "wz.replace_confirm": "This generates a new schematic and replaces the current plant (mappings of matching components are kept). Continue?",
  "wz.example": "Load example plant",
  "wz.done": "Schematic generated – fine-tune it in the editor or map values.",
  "ed.palette": "Components",
  "ed.props": "Properties",
  "ed.nothing": "Select a component or pipe. Draw pipes by clicking two connection points one after the other.",
  "ed.label": "Label",
  "ed.model": "Model",
  "ed.rotation": "Rotation",
  "ed.icon": "Icon",
  "ed.icon_default": "Default",
  "ed.role": "Function",
  "ed.circuit": "Circuit no.",
  "ed.dhw_circuit": "DHW circuit no.",
  "ed.bindings": "Values & entities",
  "ed.show": "show",
  "ed.pipe": "Pipe",
  "ed.kind": "Kind",
  "ed.flow_when": "Animated when",
  "ed.add_cond": "Add condition",
  "ed.temp_entity": "Temperature entity",
  "ed.flow_entity": "Flow entity",
  "ed.reset_bend": "Reset routing",
  "ed.connecting": "Click the target connection (Esc cancels)",
  "ed.grid": "Grid size",
  "ed.entries": "Entries",
  "ed.add_entry": "Add entry",
  "ed.text": "Text",
  "ed.volume": "Volume (l)",
  "ed.input_labels": "External input labels",
  "ed.pressure_limits": "Pressure limits (bar)",
  "ed.b_label": "Label of position B",
  "ed.duplicate": "Duplicate",
  "ed.entity_search": "Search entity …",
  "role.primary": "Primary pump (PC0)",
  "role.secondary": "Heating / secondary pump (PC1)",
  "role.hc": "Mixed circuit pump",
  "role.circulation": "Circulation pump",
  "role.other": "Other",
  "role.dhw_switch": "Heating / hot water diverter (VW1)",
  "state.running": "running",
  "state.a": "position A (heating)",
  "state.b": "position B (hot water)",
  "state.defrost": "defrosting",
  "state.flowing": "flowing",
  "state.charging": "charging",
  "state.aux": "backup heater on",
  "state.pc1": "PC1 running",
  "slot.pc0_running": "PC0 running",
  "slot.pc0_speed": "PC0 speed",
  "slot.vw1_position": "VW1 position (on = hot water)",
  "slot.pc1_running": "PC1 running",
  "slot.pc1_speed": "PC1 speed",
  "slot.dhw_temp": "Hot water",
  "slot.dhw_setpoint": "DHW setpoint",
  "slot.dhw_charging": "DHW charging",
  "slot.buffer_temp": "Buffer",
  "ed.variant": "Housing",
  "map.title": "Automatic mapping",
  "map.intro": "Finds EMS-ESP entities in Home Assistant and maps them to components. Existing mappings are only replaced if you tick them.",
  "map.scan": "Scan entities",
  "map.found": "{count} EMS-ESP entities found",
  "map.none": "No EMS-ESP entities found.",
  "map.none_help": "Set up the gateway: enable MQTT in EMS-ESP, switch on “Home Assistant MQTT Discovery” and choose the entity ID format “Single instance, short names”. The MQTT integration must be running in Home Assistant.",
  "map.component": "Component",
  "map.slot": "Value",
  "map.entity": "Entity",
  "map.value": "Current",
  "map.current": "was",
  "map.confidence": "Match",
  "map.conf.high": "certain",
  "map.conf.medium": "fallback",
  "map.apply": "Apply selected",
  "map.applied": "{count} mappings applied",
  "map.select_all": "All",
  "map.unbound": "Not mapped",
  "map.unbound_hint": "Map these in the editor via entity search – e.g. a smart plug driving the circulation pump, buffer sensors or values from your inverter.",
  "map.standalone": "The standalone demo has no Home Assistant entities.",
  "ic.title": "Custom icons",
  "ic.intro": "Upload your own graphics (SVG, PNG, WebP, JPG, max 256 KB). Assign them per component in the editor or here as the default for a component type. The bundled icons are original drawings without manufacturer artwork.",
  "ic.upload": "Upload icon",
  "ic.iso": "For isometric view",
  "ic.empty": "No custom icons yet.",
  "ic.type_default": "Default for type",
  "ic.err.unsupported_type": "File type not supported",
  "ic.err.too_large": "File too large (max 256 KB)",
  "ic.err.unsafe_svg": "SVG contains scripts or active content",
  "ic.err.invalid_data": "File is damaged or has the wrong format",
  "ic.err.too_many": "Too many icons",
  "st.title": "Settings",
  "st.style": "Style",
  "st.style.flat": "Modern SCADA (flat)",
  "st.style.iso": "Isometric 2.5D (from v0.2)",
  "st.demo": "Demo mode",
  "st.demo_hint": "Shows simulated values with running animations – ideal while the plant is not connected yet.",
  "st.language": "Language",
  "st.lang.auto": "Same as Home Assistant",
  "st.version": "Version",
  "st.reset": "Reset plant",
  "st.reset_confirm": "Delete the whole plant and start over with the example plant?"
}, gs = { de: wi, en: vi };
let wt = "de";
function _s(a) {
  wt = a;
}
function yi() {
  return wt;
}
function $s(a, t) {
  return a === "de" || a === "en" ? a : (t || "de").toLowerCase().startsWith("de") ? "de" : "en";
}
function c(a, t) {
  let e = gs[wt][a] ?? gs.de[a] ?? a;
  return t && (e = e.replace(/\{(\w+)\}/g, (s, i) => {
    const n = t[i];
    return typeof n == "number" ? V(n, Number.isInteger(n) ? 0 : 1) : n == null ? "" : String(n);
  })), e;
}
function V(a, t = 1) {
  return a.toLocaleString(wt === "de" ? "de-DE" : "en-GB", {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  });
}
function Ks(a) {
  return new Date(a * 1e3).toLocaleTimeString(wt === "de" ? "de-DE" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function bi(a) {
  const t = new Date(a * 1e3), e = /* @__PURE__ */ new Date();
  return t.toDateString() === e.toDateString() ? Ks(a) : t.toLocaleString(wt === "de" ? "de-DE" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function xi(a) {
  const t = Math.round(a / 60);
  return t < 60 ? `${t} min` : `${Math.floor(t / 60)} h ${t % 60} min`;
}
const ki = {
  supply_temp: "VL",
  return_temp: "RL",
  flow_temp: "VL",
  target_flow_temp: "Soll",
  room_temp: "Raum",
  pressure: "",
  aux_level: "",
  pc0_speed: "",
  pc1_speed: "",
  speed: "",
  fan_speed: "",
  outdoor_temp: "",
  buffer_temp: "",
  dhw_temp: "WW",
  dhw_setpoint: "Soll",
  flow: ""
}, ws = { supply_temp: "F", return_temp: "R", flow_temp: "F", target_flow_temp: "Set", room_temp: "Room", dhw_temp: "DHW", dhw_setpoint: "Set" };
function vs(a, t) {
  return wt === "en" && t in ws ? ws[t] : ki[t] ?? "";
}
function gt(a, t) {
  const e = `slot.${a}.${t}`, s = c(e);
  return s === e ? c(`slot.${t}`) : s;
}
const b = 20, C = (a, t = !1) => ({ key: a, kind: "temp", show: t }), K = {
  outdoor_unit: {
    type: "outdoor_unit",
    w: 9,
    h: 7,
    group: "generator",
    badges: "below",
    // monoblock: both water connections at the rear, 202 mm above the floor,
    // on the right when seen from the front (Logatherm WLW-… MB AR manual, fig. 4)
    ports: [
      { id: "out", x: 9, y: 5, dir: "r", kind: "supply" },
      { id: "in", x: 9, y: 6, dir: "r", kind: "return" }
    ],
    slots: [
      { key: "outdoor_temp", kind: "temp", show: !0, pos: [0.9, -0.6] },
      { key: "activity", kind: "enum" },
      { key: "heat_power", kind: "power_kw", show: !0 },
      { key: "el_power", kind: "power_w", show: !0 },
      { key: "compressor_speed", kind: "percent", show: !0 },
      { key: "compressor_on", kind: "bool" },
      { key: "fan_speed", kind: "percent", pos: [3.2, 3.5] },
      C("air_in_temp"),
      { key: "compressor_starts", kind: "count" },
      C("evap_in_temp"),
      C("comp_in_temp"),
      C("comp_out_temp"),
      C("hp_temp"),
      C("lp_temp"),
      C("drain_pan_temp"),
      { key: "silent_mode", kind: "enum" }
    ]
  },
  indoor_unit: {
    type: "indoor_unit",
    w: 8,
    h: 12,
    group: "generator",
    badges: "right",
    ports: [],
    variants: {
      // wall-hung E unit: all connections at the bottom (WLW186i E manual, fig. 3/6),
      // from left: to heat pump, from heat pump, DHW flow, DHW return, heating return, heating flow
      wall_e: {
        id: "wall_e",
        w: 8,
        h: 12,
        badges: "right",
        ports: [
          { id: "src_out", x: 1, y: 12, dir: "b", tempSlot: "return_temp", kind: "return" },
          { id: "src_in", x: 2, y: 12, dir: "b", tempSlot: "supply_temp", kind: "supply" },
          { id: "dhw_sup", x: 4, y: 12, dir: "b", tempSlot: "supply_temp", kind: "supply" },
          { id: "dhw_ret", x: 5, y: 12, dir: "b", tempSlot: "return_temp", kind: "return" },
          { id: "ret", x: 6, y: 12, dir: "b", tempSlot: "return_temp", kind: "return" },
          { id: "sup", x: 7, y: 12, dir: "b", tempSlot: "supply_temp", kind: "supply" }
        ],
        pos: { pressure: [0.6, 8.6], aux_level: [3.6, 2.4], pc0_speed: [0.6, 10.2] },
        at: { supply_temp: "sup", return_temp: "ret" }
      },
      // floor-standing T180 with 180 l DHW cylinder: all connections on top (T180 manual, fig. 4/6),
      // from left: heating return, circulation, heating flow, DHW out, cold in, from heat pump, to heat pump
      t180: {
        id: "t180",
        w: 8,
        h: 22,
        badges: "right",
        ports: [
          { id: "ret", x: 1, y: 0, dir: "t", tempSlot: "return_temp", kind: "return" },
          { id: "circ", x: 2, y: 0, dir: "t", kind: "circulation" },
          { id: "sup", x: 3, y: 0, dir: "t", tempSlot: "supply_temp", kind: "supply" },
          { id: "dhw_hot", x: 4, y: 0, dir: "t", tempSlot: "dhw_temp", kind: "dhw_hot" },
          { id: "dhw_cold", x: 5, y: 0, dir: "t", kind: "dhw_cold" },
          { id: "src_in", x: 6, y: 0, dir: "t", tempSlot: "supply_temp", kind: "supply" },
          { id: "src_out", x: 7, y: 0, dir: "t", tempSlot: "return_temp", kind: "return" }
        ],
        pos: { pressure: [0.6, 8.2], aux_level: [6.4, 3.2], pc0_speed: [4.2, 7.4], dhw_temp: [4, 12], dhw_setpoint: [4, 17] },
        at: { supply_temp: "sup", return_temp: "ret" }
      },
      // floor-standing TP70 with 70 l buffer: all connections on top (TP70 manual, fig. 4)
      tp70: {
        id: "tp70",
        w: 9,
        h: 16,
        badges: "right",
        ports: [
          { id: "sup", x: 1, y: 0, dir: "t", tempSlot: "buffer_temp", kind: "supply" },
          { id: "ret", x: 2, y: 0, dir: "t", kind: "return" },
          { id: "sup2", x: 3, y: 0, dir: "t", tempSlot: "buffer_temp", kind: "supply" },
          { id: "ret2", x: 4, y: 0, dir: "t", kind: "return" },
          { id: "src_in", x: 5, y: 0, dir: "t", tempSlot: "supply_temp", kind: "supply" },
          { id: "src_out", x: 6, y: 0, dir: "t", tempSlot: "return_temp", kind: "return" },
          { id: "dhw_sup", x: 7, y: 0, dir: "t", tempSlot: "supply_temp", kind: "supply" },
          { id: "dhw_ret", x: 8, y: 0, dir: "t", tempSlot: "return_temp", kind: "return" }
        ],
        pos: { pressure: [0.7, 6.6], aux_level: [4.5, 2.6], pc0_speed: [6.5, 6.4], pc1_speed: [2.4, 6.4], buffer_temp: [4.5, 11.5] },
        at: { supply_temp: "src_in", return_temp: "src_out" }
      },
      // brine compact unit (WSW186i): connections on top; layout approximated from the T180 family
      brine: {
        id: "brine",
        w: 8,
        h: 14,
        badges: "right",
        ports: [
          { id: "src_in", x: 1, y: 0, dir: "t", kind: "supply" },
          { id: "src_out", x: 2, y: 0, dir: "t", kind: "return" },
          { id: "dhw_sup", x: 4, y: 0, dir: "t", tempSlot: "supply_temp", kind: "supply" },
          { id: "dhw_ret", x: 5, y: 0, dir: "t", tempSlot: "return_temp", kind: "return" },
          { id: "ret", x: 6, y: 0, dir: "t", tempSlot: "return_temp", kind: "return" },
          { id: "sup", x: 7, y: 0, dir: "t", tempSlot: "supply_temp", kind: "supply" }
        ],
        pos: { pressure: [0.7, 9], aux_level: [4, 3], pc0_speed: [5.5, 9] },
        at: { supply_temp: "sup", return_temp: "ret" }
      }
    },
    slots: [
      C("supply_temp", !0),
      C("return_temp", !0),
      C("target_flow_temp", !0),
      { key: "pressure", kind: "pressure", show: !0 },
      { key: "flow", kind: "flow" },
      { key: "aux_level", kind: "percent", show: !0 },
      { key: "pc0_running", kind: "bool" },
      { key: "pc0_speed", kind: "percent", show: !0 },
      { key: "vw1_position", kind: "bool" },
      { key: "pc1_running", kind: "bool" },
      { key: "pc1_speed", kind: "percent" },
      C("dhw_temp", !0),
      C("dhw_setpoint"),
      { key: "dhw_charging", kind: "bool" },
      C("buffer_temp", !0),
      C("condenser_temp"),
      { key: "aux_status", kind: "enum" },
      { key: "aux_step1", kind: "bool" },
      { key: "aux_step2", kind: "bool" },
      { key: "aux_step3", kind: "bool" },
      { key: "service_code", kind: "text" },
      { key: "service_code_number", kind: "count" },
      { key: "last_error", kind: "text" },
      { key: "input1", kind: "bool" },
      { key: "input2", kind: "bool" },
      { key: "input3", kind: "bool" },
      { key: "input4", kind: "bool" },
      { key: "heating_active", kind: "bool" },
      { key: "dhw_active", kind: "bool" },
      { key: "el_energy_total", kind: "energy" },
      { key: "el_energy_heating", kind: "energy" },
      { key: "el_energy_dhw", kind: "energy" },
      { key: "heat_energy_total", kind: "energy" },
      { key: "heat_energy_heating", kind: "energy" },
      { key: "heat_energy_dhw", kind: "energy" },
      { key: "aux_energy_total", kind: "energy" },
      { key: "uptime_total", kind: "duration" }
    ]
  },
  // P120.5: all four connections on top; the two returns reach the bottom through dip tubes
  buffer: {
    type: "buffer",
    w: 5,
    h: 9,
    group: "storage",
    badges: "tank",
    ports: [
      { id: "in_sup", x: 1, y: 0, dir: "t", kind: "supply" },
      { id: "in_ret", x: 2, y: 0, dir: "t", tempSlot: "temp_bottom", kind: "return" },
      { id: "out_ret", x: 3, y: 0, dir: "t", kind: "return" },
      { id: "out_sup", x: 4, y: 0, dir: "t", tempSlot: "temp_top", kind: "supply" }
    ],
    slots: [C("temp_top", !0), C("temp_mid"), C("temp_bottom", !0)]
  },
  // SH290: connection heights from the datasheet (hot 1226, coil flow 784, circulation 544,
  // coil return 220, cold 55 of 1294 mm); heating coil on the right, drinking water on the left
  dhw_tank: {
    type: "dhw_tank",
    w: 6,
    h: 11,
    group: "storage",
    badges: "tank",
    ports: [
      { id: "coil_in", x: 6, y: 4, dir: "r", kind: "supply" },
      { id: "coil_out", x: 6, y: 9, dir: "r", tempSlot: "temp_bottom", kind: "return" },
      { id: "hot", x: 0, y: 1, dir: "l", tempSlot: "temp_top", kind: "dhw_hot" },
      { id: "circ", x: 0, y: 6, dir: "l", kind: "circulation" },
      { id: "cold", x: 0, y: 10, dir: "l", kind: "dhw_cold" }
    ],
    slots: [
      C("temp_top", !0),
      C("temp_bottom"),
      C("setpoint", !0),
      { key: "charging", kind: "bool" },
      { key: "onetime", kind: "bool" },
      { key: "disinfecting", kind: "bool" }
    ]
  },
  pump: {
    type: "pump",
    w: 2,
    h: 2,
    group: "hydraulic",
    rotatable: !0,
    passive: !0,
    badges: "above",
    roles: ["primary", "secondary", "hc", "circulation", "other"],
    ports: [
      { id: "in", x: 0, y: 1, dir: "l" },
      { id: "out", x: 2, y: 1, dir: "r" }
    ],
    slots: [
      { key: "running", kind: "bool" },
      { key: "speed", kind: "percent", show: !0 },
      { key: "flow", kind: "flow" },
      { key: "power", kind: "power_w" }
    ]
  },
  valve_3way: {
    type: "valve_3way",
    w: 2,
    h: 2,
    group: "hydraulic",
    rotatable: !0,
    passive: !0,
    badges: "above",
    roles: ["dhw_switch", "other"],
    ports: [
      { id: "in", x: 0, y: 1, dir: "l" },
      { id: "a", x: 2, y: 1, dir: "r" },
      { id: "b", x: 1, y: 2, dir: "b" }
    ],
    slots: [{ key: "position", kind: "bool" }]
  },
  mixer: {
    type: "mixer",
    w: 2,
    h: 2,
    group: "hydraulic",
    rotatable: !0,
    passive: !0,
    badges: "above",
    ports: [
      { id: "in", x: 0, y: 1, dir: "l" },
      { id: "out", x: 2, y: 1, dir: "r" },
      { id: "ret", x: 1, y: 2, dir: "b" }
    ],
    slots: [{ key: "position", kind: "percent", show: !0 }, { key: "flow_temp", kind: "temp", show: !0, at: "out" }]
  },
  radiators: {
    type: "radiators",
    w: 7,
    h: 6,
    group: "consumer",
    badges: "below",
    ports: [
      { id: "sup", x: 0, y: 1, dir: "l", kind: "supply" },
      { id: "ret", x: 0, y: 5, dir: "l", tempSlot: "return_temp", kind: "return" }
    ],
    slots: [
      { key: "flow_temp", kind: "temp", show: !0, at: "sup" },
      { key: "return_temp", kind: "temp", show: !0, at: "ret" },
      C("target_flow_temp"),
      { key: "room_temp", kind: "temp", show: !0, pos: [3.5, -0.9] },
      C("room_setpoint"),
      { key: "mode", kind: "enum" },
      { key: "summer_mode", kind: "enum" },
      { key: "operating_state", kind: "enum" },
      C("design_temp"),
      { key: "offset_temp", kind: "temp" },
      C("min_flow_temp"),
      C("max_flow_temp")
    ]
  },
  floor_heating: {
    type: "floor_heating",
    w: 7,
    h: 6,
    group: "consumer",
    badges: "below",
    ports: [
      { id: "sup", x: 0, y: 1, dir: "l", kind: "supply" },
      { id: "ret", x: 0, y: 5, dir: "l", tempSlot: "return_temp", kind: "return" }
    ],
    slots: []
  },
  tap: {
    type: "tap",
    w: 3,
    h: 3,
    group: "consumer",
    passive: !0,
    badges: "left",
    ports: [
      { id: "hot", x: 3, y: 1, dir: "r", kind: "dhw_hot" },
      { id: "circ", x: 2, y: 3, dir: "b", kind: "circulation" }
    ],
    slots: [{ key: "flow", kind: "flow_lmin", show: !0, pos: [1.2, -0.8] }, C("temp")]
  },
  water_inlet: {
    type: "water_inlet",
    w: 3,
    h: 2,
    group: "consumer",
    badges: "none",
    ports: [{ id: "out", x: 3, y: 1, dir: "r", fixedTemp: 10, kind: "dhw_cold" }],
    slots: []
  },
  separator: {
    type: "separator",
    w: 2,
    h: 2,
    group: "hydraulic",
    rotatable: !0,
    passive: !0,
    badges: "none",
    ports: [
      { id: "in", x: 0, y: 1, dir: "l" },
      { id: "out", x: 2, y: 1, dir: "r" }
    ],
    slots: []
  },
  expansion_vessel: {
    type: "expansion_vessel",
    w: 2,
    h: 3,
    group: "hydraulic",
    rotatable: !0,
    badges: "left",
    ports: [{ id: "conn", x: 1, y: 3, dir: "b" }],
    slots: [{ key: "pressure", kind: "pressure", show: !0 }]
  },
  junction: {
    type: "junction",
    w: 0,
    h: 0,
    group: "hydraulic",
    passive: !0,
    badges: "none",
    ports: [
      { id: "l", x: 0, y: 0, dir: "l" },
      { id: "r", x: 0, y: 0, dir: "r" },
      { id: "t", x: 0, y: 0, dir: "t" },
      { id: "b", x: 0, y: 0, dir: "b" }
    ],
    slots: []
  },
  value_tile: {
    type: "value_tile",
    w: 8,
    h: 2,
    group: "misc",
    badges: "inside",
    ports: [],
    slots: []
  },
  label: {
    type: "label",
    w: 8,
    h: 2,
    group: "misc",
    badges: "none",
    ports: [],
    slots: []
  }
};
K.floor_heating.slots = K.radiators.slots;
function dt(a) {
  return a.type === "value_tile" ? (a.props.entries || []).map((t) => ({
    key: t.slot,
    kind: t.kind || "text",
    show: !0
  })) : K[a.type].slots;
}
function zt(a) {
  const t = K[a.type];
  if (!t.variants) return;
  const e = a.props?.variant || Xe(a.model)?.variant || "wall_e";
  return t.variants[e] || Object.values(t.variants)[0];
}
function Mt(a) {
  const t = zt(a);
  return t ? { w: t.w, h: t.h } : { w: K[a.type].w, h: K[a.type].h };
}
function Gt(a) {
  return zt(a)?.ports ?? K[a.type].ports;
}
function ys(a) {
  return zt(a)?.badges ?? K[a.type].badges;
}
function bs(a) {
  const t = zt(a);
  return dt(a).map((e) => t ? { ...e, pos: t.pos?.[e.key] ?? e.pos, at: t.at?.[e.key] ?? e.at } : e);
}
function Lt(a) {
  const t = { ...K[a.type], ...Mt(a) };
  if (a.type === "value_tile") {
    const s = (a.props.entries || []).length;
    return { w: t.w, h: 2 + Math.ceil(s * 1.3) };
  }
  const e = a.rot || 0;
  return e === 90 || e === 270 ? { w: t.h, h: t.w } : { w: t.w, h: t.h };
}
const xs = ["r", "b", "l", "t"];
function Si(a, t) {
  const e = t / 90 % 4;
  return xs[(xs.indexOf(a) + e) % 4];
}
function it(a, t) {
  const e = Gt(a).find((l) => l.id === t);
  if (!e) return null;
  const s = a.rot || 0, { w: i, h: n } = Mt(a);
  let { x: o, y: r } = e;
  return s === 90 ? [o, r] = [n - r, o] : s === 180 ? [o, r] = [i - o, n - r] : s === 270 && ([o, r] = [r, i - o]), { x: a.x + o, y: a.y + r, dir: Si(e.dir, s), def: e };
}
const Xt = [
  { id: "buderus-wlw-mb-ar", label: "Buderus Logatherm WLW186i AR – Außeneinheit WLW-… MB AR (4/5/7/10/12 kW)", brand: "buderus", source: "air", nominal: 7, refrigerant: "R290" },
  { id: "buderus-wlw-mbe-ar", label: "Buderus Logatherm WLW186i MBE+ AR – Außeneinheit (11/13/15 kW)", brand: "buderus", source: "air", nominal: 13, refrigerant: "R290" },
  { id: "buderus-wlw176i-ar", label: "Buderus Logatherm WLW176i AR – Außeneinheit (4/5/7/10/12 kW)", brand: "buderus", source: "air", nominal: 7, refrigerant: "R290" },
  { id: "buderus-wlw166i-mbb-ar", label: "Buderus Logatherm WLW166i MBB AR – Außeneinheit (4/6/7/10/13 kW)", brand: "buderus", source: "air", nominal: 7, refrigerant: "R290" },
  { id: "buderus-wlw196i-ar", label: "Buderus Logatherm WLW196i AR – Außeneinheit (4/6/8/11/14 kW)", brand: "buderus", source: "air", nominal: 8 },
  { id: "buderus-wlw196i-ar-s", label: "Buderus Logatherm WLW196i AR S+ – Außeneinheit, schalloptimiert", brand: "buderus", source: "air", nominal: 8 },
  { id: "buderus-wlw196i-ir", label: "Buderus Logatherm WLW196i IR – Innenaufstellung (6/8/11/14 kW)", brand: "buderus", source: "air", nominal: 8 },
  { id: "buderus-wsw186i", label: "Buderus Logatherm WSW186i – Erdsonde/Kollektor (6/8/12/16 kW)", brand: "buderus", source: "brine", nominal: 8 },
  { id: "buderus-wsw196i", label: "Buderus Logatherm WSW196i(T) – Erdsonde/Kollektor (2–16 kW)", brand: "buderus", source: "brine", nominal: 8 },
  { id: "bosch-cs5800i-aw", label: "Bosch Compress 5800i AW", brand: "bosch", source: "air", nominal: 7 },
  { id: "bosch-cs6800i-aw", label: "Bosch Compress 6800i AW", brand: "bosch", source: "air", nominal: 7 },
  { id: "bosch-cs7800i-lw", label: "Bosch Compress 7800i LW (Sole/Wasser)", brand: "bosch", source: "brine", nominal: 8 },
  { id: "generic-air", label: "Luft/Wasser (allgemein)", brand: "generic", source: "air", nominal: 8 },
  { id: "generic-brine", label: "Sole/Wasser (allgemein)", brand: "generic", source: "brine", nominal: 8 }
], Mi = { "buderus-wsw": "buderus-wsw186i" }, Je = [
  { id: "buderus-wlw186i-e", label: "Logatherm WLW186i E – wandhängend, E-Zuheizer", variant: "wall_e", aux: !0 },
  { id: "buderus-wlw186i-t180", label: "Logatherm WLW186i T180 – Standgerät mit 180-l-WW-Speicher", variant: "t180", aux: !0, dhw: 180 },
  { id: "buderus-wlw186i-tp70", label: "Logatherm WLW186i TP70 – Standgerät mit 70-l-Puffer", variant: "tp70", aux: !0, buffer: 70 },
  { id: "buderus-wlw186i-mbe-e", label: "Logatherm WLW186i MBE+ E – wandhängend", variant: "wall_e", aux: !0 },
  { id: "buderus-wlw186i-mbe-tp70", label: "Logatherm WLW186i MBE+ TP70 – Standgerät mit 70-l-Puffer", variant: "tp70", aux: !0, buffer: 70 },
  { id: "buderus-wlw176i-e", label: "Logatherm WLW176i E – wandhängend", variant: "wall_e", aux: !0 },
  { id: "buderus-wlw176i-t180", label: "Logatherm WLW176i T180 – mit 180-l-WW-Speicher", variant: "t180", aux: !0, dhw: 180 },
  { id: "buderus-wlw176i-tp70", label: "Logatherm WLW176i TP70 – mit 70-l-Puffer", variant: "tp70", aux: !0, buffer: 70 },
  { id: "buderus-wlw166i-e", label: "Logatherm WLW166i E – wandhängend", variant: "wall_e", aux: !0 },
  { id: "buderus-wlw166i-t180", label: "Logatherm WLW166i T180 – mit 180-l-WW-Speicher", variant: "t180", aux: !0, dhw: 180 },
  { id: "buderus-wlw196i-e", label: "Logatherm WLW196i E – wandhängend", variant: "wall_e", aux: !0 },
  { id: "buderus-wlw196i-t180", label: "Logatherm WLW196i T180 – mit WW-Speicher", variant: "t180", aux: !0, dhw: 180 },
  { id: "buderus-wsw186i", label: "Logatherm WSW186i – Sole-Kompaktgerät", variant: "brine", aux: !0 },
  { id: "buderus-wsw186i-t180", label: "Logatherm WSW186i T180 – Sole mit 180-l-WW-Speicher", variant: "t180", aux: !0, dhw: 180 },
  { id: "buderus-wsw186i-tp50", label: "Logatherm WSW186i TP50 – Sole mit 50-l-Puffer", variant: "tp70", aux: !0, buffer: 50 },
  { id: "buderus-wsw196i", label: "Logatherm WSW196i(T) – Sole-Kompaktgerät", variant: "brine", aux: !0 },
  { id: "bosch-aw-e", label: "Bosch Compress AW Inneneinheit (E-Zuheizer)", variant: "wall_e", aux: !0 },
  { id: "bosch-aw-m", label: "Bosch Compress AW Inneneinheit (mit Speicher)", variant: "t180", aux: !0, dhw: 180 },
  { id: "generic", label: "Andere Inneneinheit / Hydraulikmodul", variant: "wall_e" }
], zi = {
  "buderus-wlw186i-t": "buderus-wlw186i-t180",
  "buderus-wlw186i-b": "buderus-wlw186i-e",
  "bosch-aw-b": "bosch-aw-e"
};
function Xe(a) {
  const t = a && zi[a] || a;
  return Je.find((e) => e.id === t);
}
function Qe(a) {
  const t = a && Mi[a] || a;
  return Xt.find((e) => e.id === t) || Xt.find((e) => e.id === "generic-air");
}
const Us = /* @__PURE__ */ new Set(["on", "true", "1", "yes", "ja", "ein", "an", "active", "aktiv", "open", "offen"]);
function W(a) {
  return !a || !a.available || a.raw === null ? !1 : typeof a.raw == "boolean" ? a.raw : a.num !== null ? a.num > 0 : Us.has(String(a.raw).trim().toLowerCase());
}
const Ei = {
  off: ["off", "aus", "uit", "av", "arrêt", "standby", "bereit"],
  heating: ["heating", "heizen", "verwarmen", "uppvärmning", "chauffage", "ogrzewanie", "riscaldamento"],
  cooling: ["cooling", "kühlen", "koelen", "kyler", "refroidissement", "chłodzenie", "raffreddamento"],
  hot_water: ["hot water", "hot_water", "warmwasser", "warm water", "varmvatten", "eau chaude", "c.w.u.", "acqua calda"],
  pool_heating: ["pool heating", "pool beheizen", "zwembadverwarming", "chauffage piscine"],
  pool: ["pool", "zwembad", "piscine", "basen", "piscina"],
  defrost: ["defrost", "abtauen", "ontdooien", "avfrostning", "dégivrage", "odladzanie", "scongelamento"],
  compressor_alarm: ["compressor alarm", "compressor_alarm", "kompressor alarm", "kompressoralarm"]
};
function ts(a) {
  if (!a || !a.available || a.raw === null) return;
  const t = String(a.raw).trim().toLowerCase();
  for (const [e, s] of Object.entries(Ei)) if (s.includes(t)) return e;
  return t.includes("abtau") || t.includes("defrost") ? "defrost" : t;
}
function Ai(a, t, e) {
  if (a === void 0 || a === "unavailable" || a === "unknown" || a === "")
    return { raw: null, num: null, unit: t, entity: e, available: !1 };
  const s = Number(a);
  return { raw: a, num: Number.isFinite(s) ? s : null, unit: t, entity: e, available: !0 };
}
class Pi {
  constructor(t) {
    this.hass = t;
  }
  entityOf(t, e) {
    return t.type === "value_tile" ? (t.props.entries || []).find((i) => i.slot === e)?.entity : t.bindings[e];
  }
  get(t, e) {
    const s = this.entityOf(t, e);
    return s ? this.getEntity(s) : void 0;
  }
  getEntity(t) {
    const e = this.hass.states[t];
    return Ai(e?.state, e?.attributes?.unit_of_measurement, t);
  }
  async history(t, e, s) {
    const i = this.entityOf(t, e);
    return i ? Li(this.hass, i, s) : [];
  }
}
async function Li(a, t, e) {
  const s = /* @__PURE__ */ new Date(), i = new Date(s.getTime() - e * 36e5);
  return ((await a.callWS({
    type: "history/history_during_period",
    start_time: i.toISOString(),
    end_time: s.toISOString(),
    entity_ids: [t],
    minimal_response: !0,
    no_attributes: !0,
    significant_changes_only: !1
  }))[t] || []).map((r) => {
    const l = String(r.s).toLowerCase();
    let p = Number(r.s);
    return Number.isFinite(p) || (p = Us.has(l) ? 1 : l === "off" || l === "false" ? 0 : null), { t: r.lu, v: p };
  });
}
function ze(a, t) {
  const e = /* @__PURE__ */ new Set(), s = (i) => t.get(a, i);
  switch (a.type) {
    case "pump":
    case "mixer":
      (W(s("running")) || W(s("speed")) || W(s("flow"))) && e.add("running"), a.type === "mixer" && W(s("position")) && e.add("running");
      break;
    case "valve_3way": {
      const i = s("position");
      e.add(W(i) ? "b" : "a");
      break;
    }
    case "outdoor_unit": {
      const i = ts(s("activity"));
      (W(s("compressor_on")) || W(s("compressor_speed")) || W(s("heat_power"))) && e.add("running"), i === "defrost" && e.add("defrost"), i === "compressor_alarm" && e.add("alarm"), i && i !== "off" && i !== "compressor_alarm" && e.add("running"), i && e.add(`mode_${i}`);
      break;
    }
    case "indoor_unit": {
      (W(s("aux_level")) || W(s("aux_step1")) || W(s("aux_step2")) || W(s("aux_step3"))) && e.add("aux"), (W(s("pc0_running")) || W(s("pc0_speed")) || W(s("flow"))) && e.add("running"), e.add(W(s("vw1_position")) || !a.bindings.vw1_position && W(s("dhw_active")) && !W(s("heating_active")) ? "b" : "a"), (W(s("pc1_running")) || W(s("pc1_speed"))) && e.add("pc1"), W(s("dhw_charging")) && e.add("charging");
      const i = W(s("dhw_active")) || e.has("running") && e.has("b") ? "hot_water" : W(s("heating_active")) || e.has("running") ? "heating" : "off";
      e.add(`mode_${i}`);
      break;
    }
    case "dhw_tank":
      W(s("charging")) && e.add("charging"), W(s("disinfecting")) && e.add("disinfecting");
      break;
    case "tap":
      W(s("flow")) && e.add("flowing");
      break;
    case "radiators":
    case "floor_heating":
      e.add("on");
      break;
  }
  return e;
}
function ks(a, t) {
  const e = t.get(a.c);
  return e ? a.s.startsWith("!") ? !e.has(a.s.slice(1)) : e.has(a.s) : !1;
}
function Di(a, t) {
  const e = a.flow || [], s = a.flowAny || [];
  return e.length === 0 && s.length === 0 ? !1 : e.every((i) => ks(i, t)) && (s.length === 0 || s.some((i) => ks(i, t)));
}
function Ti(a, t) {
  const e = new Map(a.components.map((n) => [n.id, n])), s = /* @__PURE__ */ new Map(), i = (n) => {
    const o = e.get(n.c);
    if (!o) return;
    const r = it(o, n.p);
    if (r) {
      if (r.def.fixedTemp !== void 0) return r.def.fixedTemp;
      if (r.def.tempSlot) {
        const l = t.get(o, r.def.tempSlot);
        if (l?.available && l.num !== null) return l.num;
      }
    }
  };
  for (const n of a.pipes) {
    if (n.bindings?.temp) {
      const r = t.getEntity(n.bindings.temp);
      if (r?.available && r.num !== null) {
        s.set(n.id, r.num);
        continue;
      }
    }
    const o = i(n.from);
    o !== void 0 && s.set(n.id, o);
  }
  for (let n = 0; n < 6; n++) {
    let o = !1;
    for (const r of a.pipes) {
      if (s.has(r.id)) continue;
      const l = e.get(r.from.c);
      if (l && K[l.type].passive) {
        const p = a.pipes.find((d) => d.to.c === l.id && s.has(d.id));
        if (p) {
          s.set(r.id, s.get(p.id)), o = !0;
          continue;
        }
      }
      if (n === 5 || !l || !K[l.type].passive) {
        const p = i(r.to);
        p !== void 0 && (s.set(r.id, p), o = !0);
      }
    }
    if (!o && n > 0) break;
  }
  return s;
}
const Wi = {
  temp: "°C",
  power_kw: "kW",
  power_w: "W",
  percent: "%",
  pressure: "bar",
  flow: "l/h",
  flow_lmin: "l/min",
  energy: "kWh",
  duration: "min"
};
function Dt(a, t) {
  return dt(a).find((e) => e.key === t)?.kind || "text";
}
function mt(a, t) {
  if (!a) return { text: c("none"), unit: "" };
  if (!a.available) return { text: c("none"), unit: "" };
  if (t === "bool") return { text: W(a) ? c("on") : c("off"), unit: "" };
  if (t === "enum" && a.num === null) {
    const o = `mode.${ts(a)}`, r = c(o);
    return { text: r === o ? String(a.raw) : r, unit: "" };
  }
  let e = a.unit ?? Wi[t] ?? "";
  if (a.num === null) return { text: String(a.raw), unit: "" };
  let s = a.num;
  t === "power_w" && e === "W" && Math.abs(s) >= 1e3 && (s = s / 1e3, e = "kW");
  const i = t === "count" || t === "percent" || t === "flow" || t === "duration" || t === "power_w" && e === "W" || t === "energy" && s >= 100 ? 0 : 1;
  return { text: V(s, i), unit: e };
}
function Y(a, t) {
  if (a === void 0 || Number.isNaN(a)) return t;
  const e = [
    [5, [43, 108, 255]],
    [20, [34, 195, 230]],
    [28, [61, 220, 151]],
    [36, [245, 197, 66]],
    [44, [255, 138, 61]],
    [54, [255, 77, 77]],
    [65, [224, 33, 122]]
  ];
  if (a <= e[0][0]) return we(e[0][1]);
  for (let s = 1; s < e.length; s++) {
    const [i, n] = e[s], [o, r] = e[s - 1];
    if (a <= i) {
      const l = (a - o) / (i - o);
      return we([0, 1, 2].map((p) => r[p] + (n[p] - r[p]) * l));
    }
  }
  return we(e[e.length - 1][1]);
}
function we(a) {
  return `rgb(${a.map((t) => Math.round(t)).join(",")})`;
}
const Ci = {
  supply: "#ff7a45",
  return: "#4d9fff",
  dhw_hot: "#ff4f8b",
  dhw_cold: "#38d0ff",
  circulation: "#b07cff"
}, Oi = {
  nominal: 7.1,
  source: "air",
  bufferL: 120,
  dhwL: 274,
  auxKw: 6,
  heatLoad: 6.2,
  designTemp: -12,
  floor: !1
}, vt = 4.186 / 3600, Ss = 10, at = 21, Hi = 10, Bi = [
  // hour of day, minutes, litres per minute (mixed at 40 °C)
  [6.5, 7, 9],
  [6.85, 6, 9],
  [7.2, 5, 8],
  [12.25, 2, 4],
  [18.6, 3, 5],
  [20.4, 8, 9],
  [21.1, 6, 9]
], Ri = [
  [6, 7.5],
  [11.5, 12.5],
  [17.5, 19]
];
class Ii {
  constructor(t = {}, e = Date.now() / 1e3, s) {
    this.speed = 60, this.outdoorMean = 2, this.dailySwing = 2.5, this.tOut = 2, this.tRoom = 20.8, this.bufTop = 38, this.bufBot = 33, this.dhwTop = 49, this.dhwBot = 43, this.tVl = 30, this.tRl = 28, this.tVlHc = 38, this.tRlHc = 32, this.mode = "off", this.pTh = 0, this.pEl = 0, this.cop = 0, this.running = !1, this.lastStart = -1e9, this.lastStop = -1e9, this.pc0Overrun = 0, this.ice = 0.3, this.defrostLeft = 0, this.aux = 0, this.auxTimer = 0, this.heatDemand = !1, this.dhwDemand = !1, this.tapFlow = 0, this.tapLeft = 0, this.qEmit = 0, this.starts = 0, this.e = { el: 0, heat: 0, elHeat: 0, elDhw: 0, heatHeat: 0, heatDhw: 0, aux: 0 }, this.dim14a = !1, this.pv = !1, this.disinfect = !1, this.fault = !1, this.lastDrawDay = /* @__PURE__ */ new Map(), this.days = /* @__PURE__ */ new Map(), this.sampleAcc = 0, this.hist = /* @__PURE__ */ new Map(), this.active = /* @__PURE__ */ new Map(), this.messages = [], this.labels = { dhw: "WW" }, this.listeners = [], this.p = { ...Oi, ...t }, s && (this.labels = { ...this.labels, ...s }), this.time = e - 24 * 3600, this.prefill(e);
  }
  prefill(t) {
    const e = this.listeners;
    for (this.listeners = []; this.time < t; ) this.step(Ss);
    this.messages = this.messages.slice(-40), this.listeners = e;
  }
  onMessage(t) {
    return this.listeners.push(t), () => {
      this.listeners = this.listeners.filter((e) => e !== t);
    };
  }
  /** Advance by real seconds × speed. */
  advance(t) {
    let e = Math.min(t, 1) * this.speed, s = 0;
    for (; e > 0 && s++ < 400; ) {
      const i = Math.min(Ss, e);
      this.step(i), e -= i;
    }
  }
  hour() {
    const t = new Date(this.time * 1e3);
    return t.getHours() + t.getMinutes() / 60 + t.getSeconds() / 3600;
  }
  // ----------------------------------------------------------- physics
  pMax() {
    const t = this.p.nominal, e = this.p.source === "air" ? 1 + 0.015 * (this.tOut - 2) : 1;
    return Math.max(t * 0.55, Math.min(t * 1.2, t * e));
  }
  pMin() {
    const t = this.p.nominal * 0.18, e = this.p.source === "air" ? 1 + 0.04 * Math.max(0, this.tOut - 2) : 1;
    return Math.max(1, t * e);
  }
  curveSetpoint() {
    const t = this.p.floor ? 35 : 50, e = (t - at) / (at - this.p.designTemp), s = this.pv ? 5 : 0;
    return Math.max(25, Math.min(t + 5, at + (at - this.tOut) * e + s));
  }
  dhwSetpoint() {
    return this.disinfect ? 60 : this.pv ? 55 : 50;
  }
  step(t) {
    this.time += t;
    const e = this.hour(), s = t / 3600, i = this.p, n = this.outdoorMean + this.dailySwing * Math.cos((e - 15) / 24 * 2 * Math.PI);
    this.tOut += (n - this.tOut) * Math.min(1, t / 1800);
    const o = this.tOut < 16, r = this.curveSetpoint(), l = o ? 650 * vt * 3600 / 3600 : 0, p = i.heatLoad * (i.floor, 1), d = i.floor ? 30 - at : 45 - at, h = i.floor ? 1.1 : 1.3;
    let u = 0;
    if (this.tVlHc = this.bufTop, l > 0) {
      let I = this.tVlHc - 3;
      for (let lt = 0; lt < 4; lt++)
        u = p * Math.pow(Math.max(0, (I - this.tRoom) / d), h), I = this.tVlHc - u / (2 * l);
      u *= Math.max(0.1, Math.min(1, 1 - (this.tRoom - at - 0.2) * 1.5)), this.tRlHc = this.tVlHc - u / l;
    } else
      this.tRlHc = this.bufBot;
    this.qEmit = u;
    const f = i.heatLoad / (at - i.designTemp);
    this.tRoom += (u - f * (this.tRoom - this.tOut) + 0.35) * s / 9;
    const g = Math.floor(this.time / 86400);
    Bi.forEach(([I, lt, qs], is) => {
      e >= I && e < I + 0.1 && this.lastDrawDay.get(is) !== g && (this.lastDrawDay.set(is, g), this.startDraw(lt, qs));
    }), this.tapLeft > 0 && (this.tapLeft -= t, this.tapLeft <= 0 && (this.tapFlow = 0));
    const x = Ri.some(([I, lt]) => e >= I && e < lt), k = i.dhwL / 2 * vt, y = this.tapFlow * 60 * vt * (40 - Hi), A = 1.38 / 24 / 2 + (x ? 0.12 : 0) / 2;
    this.dhwTop -= (y * 0.35 + A) * s / k, this.dhwBot -= (y * 0.65 + A) * s / k;
    const S = this.dhwSetpoint();
    (this.dhwTop < S - 5 || this.dhwBot < S - 14 || this.disinfect && this.dhwBot < 59) && (this.dhwDemand = !0), this.dhwBot >= S - 0.5 && this.dhwTop >= S - 0.5 && (this.dhwDemand = !1, this.disinfect && (this.disinfect = !1, this.condition("dis", !1, "info", "dhw_disinfection", {}, "dhw"))), o && this.bufTop < r - 2 && (this.heatDemand = !0);
    const z = this.time - this.lastStart > 600;
    (!o || this.bufTop > r + 2.5 && z) && (this.heatDemand = !1);
    let E = this.fault ? "compressor_alarm" : this.dhwDemand ? "hot_water" : this.heatDemand ? "heating" : "off";
    this.defrostLeft > 0 && !this.fault && (E = "defrost");
    const O = E === "heating" || E === "hot_water" || E === "defrost";
    O && !this.running ? this.time - this.lastStop >= 480 || E === "defrost" ? (this.running = !0, this.lastStart = this.time, this.starts++, this.pTh = this.pMin()) : E = "off" : !O && this.running && (this.time - this.lastStart > 600 || this.fault ? (this.running = !1, this.lastStop = this.time, this.pc0Overrun = 180) : E = this.mode === "hot_water" ? "hot_water" : "heating"), this.mode = this.running ? E : this.fault ? "compressor_alarm" : "off";
    const F = this.pMax(), M = this.pMin();
    let P = 0;
    if (this.running && this.mode === "heating" ? P = this.qEmit + 2.2 * (r + 1 - this.bufTop) : this.running && this.mode === "hot_water" && (P = Math.min(F * 0.9, Math.max(M, (60 - this.dhwBot - 3) * 0.9))), this.running && this.mode !== "defrost") {
      P = Math.max(M, Math.min(F, P)), this.pTh < M && (this.pTh = M);
      const I = 0.5 * (t / 60);
      this.pTh += Math.max(-I * 2, Math.min(I, P - this.pTh));
    } else this.mode === "defrost" ? this.pTh = -3 : this.pTh = 0;
    let B = 0;
    this.dim14a || (this.fault && o ? B = i.auxKw : this.mode === "heating" && this.bufTop < r - 5 && this.pTh >= F * 0.95 ? (this.auxTimer += t, this.auxTimer > 1200 && (B = Math.min(i.auxKw, 3))) : this.auxTimer = 0, this.tOut < i.designTemp + 2 && this.mode === "heating" && (B = Math.max(B, Math.min(i.auxKw, 3))), this.disinfect && this.mode === "hot_water" && this.dhwBot > 52 && (B = Math.min(i.auxKw, 3))), this.fault && o && B > 0 && (this.heatDemand = !0), this.aux = B;
    const G = this.running || this.pc0Overrun > 0 || this.fault && this.aux > 0;
    !this.running && this.pc0Overrun > 0 && (this.pc0Overrun -= t);
    const H = G ? 1100 * vt : 0, L = this.mode === "hot_water", rt = (this.running ? this.pTh : 0) + this.aux;
    L ? this.tRl = this.dhwBot + 2 : this.tRl = G ? this.bufBot : this.tRl + (22 - this.tRl) * Math.min(1, t / 3600), this.tVl = H > 0 ? this.tRl + rt / H : this.tVl + (this.tRl - this.tVl) * Math.min(1, t / 600);
    const X = (i.bufferL + 60) / 2 * vt, tt = L ? 0 : H, R = 0.05 / 2, q = tt * (this.tVl - this.bufTop) + (l > tt ? (l - tt) * (this.bufBot - this.bufTop) : 0) - R, Z = l * (this.tRlHc - this.bufBot) + (tt > l ? (tt - l) * (this.bufTop - this.bufBot) : 0) - R;
    if (this.bufTop += q * s / X, this.bufBot += Z * s / X, this.bufBot > this.bufTop) {
      const I = (this.bufBot + this.bufTop) / 2;
      this.bufBot = this.bufTop = I;
    }
    if (L && (this.dhwBot += rt * s / k, this.dhwBot > this.dhwTop)) {
      const I = (this.dhwBot + this.dhwTop) / 2;
      this.dhwBot = this.dhwTop = I;
    }
    if (this.running && this.mode !== "defrost") {
      const I = this.tVl + 273.15 + 3, lt = (this.p.source === "air" ? this.tOut - 6 : 0) + 273.15;
      this.cop = Math.max(1.4, Math.min(7.5, 0.57 * I / Math.max(5, I - lt))), this.pEl = this.pTh / this.cop + 0.06;
    } else this.mode === "defrost" ? (this.cop = 0, this.pEl = 1.1) : (this.cop = 0, this.pEl = 0.012 + (G ? 0.03 : 0));
    const U = Math.max(0, this.running ? this.pTh : 0);
    this.e.el += (this.pEl + this.aux) * s, this.e.aux += this.aux * s, this.e.heat += (U + this.aux) * s;
    const nt = new Date(this.time * 1e3), ot = new Date(nt.getFullYear(), nt.getMonth(), nt.getDate()).getTime();
    let ht = this.days.get(ot);
    if (!ht) {
      this.days.set(ot, ht = { heat: 0, el: 0, heatDhw: 0, elDhw: 0, aux: 0 });
      for (const I of [...this.days.keys()]) I < ot - 3 * 864e5 && this.days.delete(I);
    }
    if (ht.heat += (U + this.aux) * s, ht.el += (this.pEl + this.aux) * s, ht.aux += this.aux * s, L && (ht.heatDhw += U * s, ht.elDhw += this.pEl * s), L ? (this.e.elDhw += this.pEl * s, this.e.heatDhw += U * s) : (this.e.elHeat += this.pEl * s, this.e.heatHeat += U * s), this.defrostLeft > 0)
      this.defrostLeft -= t, this.defrostLeft <= 0 && (this.ice = 0, this.defrostLeft = 0);
    else if (this.p.source === "air" && this.running && this.tOut < 7 && this.tOut > -15) {
      const I = this.tOut > -2 ? 1.3 - Math.abs(this.tOut - 1) * 0.12 : 0.9 + this.tOut * 0.04;
      this.ice += Math.max(0.05, I) * (this.pTh / F) * s, this.ice >= 1 && (this.defrostLeft = 240 + Math.random() * 120);
    }
    this.emitConditions(), this.values = this.buildValues(r, S, x, G, H), this.sampleAcc += t, this.sampleAcc >= 60 && (this.sampleAcc = 0, this.sample());
  }
  startDraw(t, e) {
    this.tapFlow = e, this.tapLeft = t * 60;
  }
  buildValues(t, e, s, i, n) {
    const o = (p) => Math.round(p * 10) / 10, r = this.pMax(), l = this.running;
    return {
      outdoor: {
        outdoor_temp: o(this.tOut),
        air_in_temp: o(this.tOut + 0.4),
        activity: this.mode,
        compressor_on: l && this.mode !== "defrost" ? !0 : l,
        compressor_speed: l ? Math.round(Math.abs(this.pTh) / (r * 1.15) * 100) : 0,
        fan_speed: l && this.mode !== "defrost" ? Math.round(35 + this.pTh / r * 55) : 0,
        heat_power: o(Math.max(0, l ? this.pTh : 0)),
        el_power: Math.round(this.pEl * 1e3),
        compressor_starts: this.starts,
        evap_in_temp: o(this.tOut - (l ? 6 : 0)),
        comp_in_temp: o(this.tOut - (l ? 2 : 0)),
        comp_out_temp: o(l ? this.tVl + 28 : this.tOut + 5),
        hp_temp: o(l ? this.tVl + 3 : this.tOut),
        lp_temp: o(l ? this.tOut - 7 : this.tOut),
        drain_pan_temp: o(this.mode === "defrost" ? 4 : Math.max(this.tOut, 1)),
        silent_mode: "auto"
      },
      indoor: {
        supply_temp: o(this.tVl),
        return_temp: o(this.tRl),
        condenser_temp: o(this.tVl + (l ? 1 : 0)),
        target_flow_temp: o(this.mode === "hot_water" ? Math.min(62, e + 8) : t),
        pressure: o(1.45 + ((this.bufTop + this.bufBot) / 2 - 30) * 8e-3),
        flow: i ? Math.round(n / vt) : 0,
        aux_level: Math.round(this.aux / 9 * 100),
        aux_step1: this.aux >= 3,
        aux_step2: this.aux >= 6,
        aux_step3: this.aux >= 9,
        input1: this.dim14a,
        input2: !1,
        input3: !1,
        input4: this.pv,
        heating_active: this.mode === "heating",
        dhw_active: this.mode === "hot_water",
        el_energy_total: o(this.e.el),
        el_energy_heating: o(this.e.elHeat),
        el_energy_dhw: o(this.e.elDhw),
        heat_energy_total: o(this.e.heat),
        heat_energy_heating: o(this.e.heatHeat),
        heat_energy_dhw: o(this.e.heatDhw),
        aux_energy_total: o(this.e.aux),
        service_code: this.fault ? "SIM" : ""
      },
      pc0: { running: i, speed: i ? 72 : 0, flow: i ? 1100 : 0 },
      pc1: { running: this.tOut < 16, speed: this.tOut < 16 ? 55 : 0, flow: this.tOut < 16 ? 650 : 0 },
      circ: { running: s },
      vw1: { position: this.mode === "hot_water" },
      buffer: { temp_top: o(this.bufTop), temp_mid: o((this.bufTop + this.bufBot) / 2), temp_bottom: o(this.bufBot) },
      dhw: {
        temp_top: o(this.dhwTop),
        temp_bottom: o(this.dhwBot),
        setpoint: e,
        charging: this.mode === "hot_water",
        onetime: !1,
        disinfecting: this.disinfect
      },
      hc: {
        flow_temp: o(this.tVlHc),
        return_temp: o(this.tRlHc),
        target_flow_temp: o(t),
        room_temp: o(this.tRoom),
        room_setpoint: at,
        mode: "auto",
        summer_mode: this.tOut < 16 ? "winter" : "summer",
        operating_state: this.tOut < 16 ? "heating" : "off",
        design_temp: this.p.floor ? 35 : 50,
        offset_temp: 0,
        min_flow_temp: 25,
        max_flow_temp: this.p.floor ? 40 : 55
      },
      tap: { flow: this.tapFlow, temp: o(this.dhwTop - 2) },
      mixer: { position: this.tOut < 16 ? 40 : 0, flow_temp: o(Math.min(this.tVlHc, 33)) }
    };
  }
  // ----------------------------------------------------------- messages
  condition(t, e, s, i, n, o) {
    const r = this.active.get(t);
    if (e && !r) {
      const l = {
        id: Math.random().toString(16).slice(2, 14),
        ts: this.time,
        level: s,
        key: i,
        params: n,
        component_id: o,
        active: !0,
        end_ts: null
      };
      this.active.set(t, l.id), this.messages.push(l), this.messages.length > 200 && this.messages.shift(), this.listeners.forEach((p) => p(l));
    } else if (!e && r) {
      this.active.delete(t);
      const l = this.messages.find((p) => p.id === r);
      l && (l.active = !1, l.end_ts = this.time, this.listeners.forEach((p) => p(l)));
    }
  }
  emitConditions() {
    this.condition("defrost", this.mode === "defrost", "info", "defrost", {}, "outdoor"), this.condition("dhw", this.mode === "hot_water", "info", "dhw_charging", { component: this.labels.dhw }, "dhw"), this.condition("aux", this.aux > 0, "notice", "aux_heater", {}, "indoor"), this.condition("in1", this.dim14a, "warning", "input_active", { input: 1, label: "§14a" }, "indoor"), this.condition("in4", this.pv, "notice", "input_active", { input: 4, label: "PV-Überschuss" }, "indoor"), this.condition("dis", this.disinfect, "info", "dhw_disinfection", { component: this.labels.dhw }, "dhw"), this.condition("fault", this.fault, "error", "sim_fault", {}, "outdoor");
  }
  scenarioMessage(t) {
    const e = {
      id: Math.random().toString(16).slice(2, 14),
      ts: this.time,
      level: "info",
      key: "sim_scenario",
      params: { name: t },
      component_id: null,
      active: !1,
      end_ts: null
    };
    this.messages.push(e), this.listeners.forEach((s) => s(e));
  }
  // ----------------------------------------------------------- history
  sample() {
    const t = this.time;
    for (const [e, s] of Object.entries(this.values))
      for (const [i, n] of Object.entries(s)) {
        const o = typeof n == "number" ? n : typeof n == "boolean" ? n ? 1 : 0 : null;
        if (o === null) continue;
        const r = `${e}.${i}`;
        let l = this.hist.get(r);
        l || this.hist.set(r, l = []), l.push({ t, v: o }), l.length > 1500 && l.splice(0, l.length - 1440);
      }
  }
  dailyEnergy() {
    return [...this.days.entries()].sort((t, e) => t[0] - e[0]).map(([t, e]) => ({ day: t, ...e }));
  }
  history(t, e, s) {
    const i = this.hist.get(`${t}.${e}`) || [], n = this.time - s * 3600;
    return i.filter((o) => o.t >= n);
  }
}
function Ms(a) {
  switch (a.type) {
    case "outdoor_unit":
      return "outdoor";
    case "indoor_unit":
      return "indoor";
    case "buffer":
      return "buffer";
    case "dhw_tank":
      return "dhw";
    case "radiators":
    case "floor_heating":
      return "hc";
    case "tap":
      return "tap";
    case "mixer":
      return "mixer";
    case "valve_3way":
      return "vw1";
    case "pump": {
      const t = a.props.role;
      return t === "primary" ? "pc0" : t === "circulation" ? "circ" : "pc1";
    }
    default:
      return null;
  }
}
function ve(a) {
  if (!a) return {};
  const t = a.components.find((l) => l.type === "outdoor_unit"), e = a.components.find((l) => l.type === "indoor_unit"), s = a.components.find((l) => l.type === "buffer"), i = a.components.find((l) => l.type === "dhw_tank"), n = Xe(e?.model), o = Qe(t?.model), r = a.components.filter((l) => l.type === "radiators" || l.type === "floor_heating");
  return {
    nominal: Number(t?.props.nominal_kw) || o.nominal,
    source: o.source,
    bufferL: Number(s?.props.volume) || n?.buffer || (s ? 120 : 30),
    dhwL: Number(i?.props.volume) || n?.dhw || 274,
    auxKw: Number(e?.props.aux_kw) || 6,
    heatLoad: Number(a.settings?.heat_load) || 6.2,
    floor: r.length > 0 && r.every((l) => l.type === "floor_heating")
  };
}
const Vi = {};
class Ni {
  constructor(t) {
    this.sim = t;
  }
  entityOf() {
  }
  getEntity() {
  }
  get(t, e) {
    if (t.type === "value_tile") {
      const n = (t.props.entries || []).find((l) => l.slot === e);
      if (!n?.sim) return;
      const [o, r] = n.sim.split(".");
      return this.wrap(this.sim.values[o]?.[r]);
    }
    if (t.type === "indoor_unit") {
      const o = {
        pc0_running: ["pc0", "running"],
        pc0_speed: ["pc0", "speed"],
        vw1_position: ["vw1", "position"],
        pc1_running: ["pc1", "running"],
        pc1_speed: ["pc1", "speed"],
        dhw_temp: ["dhw", "temp_top"],
        dhw_setpoint: ["dhw", "setpoint"],
        dhw_charging: ["dhw", "charging"],
        buffer_temp: ["buffer", "temp_top"]
      }[e];
      if (o) {
        const r = zt(t)?.id;
        return e.startsWith("dhw_") && r !== "t180" || e === "buffer_temp" && r !== "tp70" || e.startsWith("pc1") && r === "wall_e" ? void 0 : this.wrap(this.sim.values[o[0]]?.[o[1]]);
      }
    }
    const s = Ms(t);
    if (!s) return;
    let i = this.sim.values[s]?.[e];
    if (i !== void 0)
      return s === "hc" && typeof i == "number" && Number(t.props.circuit) > 1 && ["flow_temp", "return_temp", "target_flow_temp"].includes(e) && (i = Math.round((i - (t.type === "floor_heating" ? 12 : 2)) * 10) / 10), this.wrap(i, Vi[e]);
  }
  wrap(t, e) {
    if (t !== void 0)
      return {
        raw: t,
        num: typeof t == "number" ? t : typeof t == "boolean" ? t ? 1 : 0 : null,
        unit: e,
        available: !0
      };
  }
  async history(t, e, s) {
    const i = Ms(t);
    return i ? this.sim.history(i, e, s) : [];
  }
}
function Ee() {
  return {
    name: c("wz.example_name") === "wz.example_name" ? "Meine Anlage" : c("wz.example_name"),
    outdoorModel: "buderus-wlw-mb-ar",
    nominalKw: 7.1,
    outdoorLabel: "WLW-7 MB AR",
    indoorModel: "buderus-wlw186i-e",
    indoorLabel: "WLW186i-12 E",
    aux: !0,
    auxKw: 6,
    buffer: "parallel",
    bufferVolume: 120,
    bufferLabel: "Puffer P120.5",
    dhw: "tank",
    dhwVolume: 274,
    dhwLabel: "WW-Speicher SH290.2",
    circulation: !0,
    circuits: [{ emitter: "radiators", mixed: !1, label: "Heizkörper HK1" }],
    separator: !0,
    expansion: !0
  };
}
class Ki {
  constructor() {
    this.components = [], this.pipes = [], this.n = 0;
  }
  add(t, e, s, i, n, o = {}) {
    return this.components.push({ id: t, type: e, label: s, x: i, y: n, bindings: {}, props: {}, ...o }), t;
  }
  pipe(t, e, s, i = [], n = {}) {
    this.pipes.push({ id: `p${++this.n}`, from: t, to: e, kind: s, flow: i, ...n });
  }
}
const v = (a, t) => ({ c: a, p: t });
function es(a, t) {
  const e = new Ki(), s = Xe(a.indoorModel), i = s?.variant || "wall_e", n = !!s?.dhw, o = !!s?.buffer, r = a.dhw === "tank" && !n, l = a.dhw === "tank" || n, p = a.buffer !== "none" && !o, d = { c: "iu", s: "running" }, h = l ? [{ c: "iu", s: "a" }] : [], u = { c: "iu", s: "b" }, f = { c: "pc1", s: "running" }, g = {
    aux_kw: a.aux ? a.auxKw : 0,
    input_labels: { input1: "§14a / EVU", input4: "PV" },
    input_levels: { input1: "warning" },
    pressure_min: 1,
    pressure_max: 2.7,
    buffer_l: s?.buffer
  }, x = i !== "wall_e", k = x ? 12 : 3;
  e.add("ou", "outdoor_unit", a.outdoorLabel || c("type.outdoor_unit"), 1, k, {
    model: a.outdoorModel,
    props: { nominal_kw: a.nominalKw }
  });
  const y = 14, A = x ? 12 : 2;
  e.add("iu", "indoor_unit", a.indoorLabel || c("type.indoor_unit"), y, A, { model: a.indoorModel, props: g });
  const S = e.components.find((M) => M.id === "iu"), z = (M) => it(S, M), E = { y: k + 5 };
  if (x) {
    const M = A, P = (R) => z(R).x, B = Math.max(...["src_in", "src_out", "sup", "ret", "dhw_sup", "dhw_ret", "dhw_hot", "dhw_cold", "circ"].filter((R) => it(S, R)).map(P));
    e.pipe(v("ou", "out"), v("iu", "src_in"), "supply", [d], { via: [[12, E.y], [12, M - 9], [P("src_in"), M - 9]] }), e.pipe(v("iu", "src_out"), v("ou", "in"), "return", [d], { via: [[P("src_out"), M - 10], [11, M - 10]] });
    let G = v("iu", "sup"), H = v("iu", "ret"), L = o ? [f] : [d, ...h], rt = [[P("sup"), M - 2]];
    const X = M - 4;
    let tt = B + 14;
    if (p) {
      const R = B + 2, q = R + 10, Z = M + 4;
      e.add("buf", "buffer", a.bufferLabel || c("type.buffer"), q, Z, { props: { volume: a.bufferVolume } }), e.pipe(v("iu", "sup"), v("buf", "in_sup"), "supply", [d, ...h], { via: [[P("sup"), M - 2], [q + 1, M - 2]] });
      const U = [d, ...h];
      let nt = v("buf", "in_ret"), ot = [[q + 2, X]];
      a.separator && (e.add("sep", "separator", c("wz.separator_short"), R + 6, X - 1, { rot: 180 }), e.add("sc1", "separator", "SC1", R + 3, X - 1, { rot: 180, props: { filter: !0 } }), e.pipe(nt, v("sep", "in"), "return", U, { via: ot }), e.pipe(v("sep", "out"), v("sc1", "in"), "return", U), nt = v("sc1", "out"), ot = []), a.expansion && (e.add("jmag", "junction", "", R, X), e.add("mag", "expansion_vessel", "MAG", R - 1, X - 5), e.pipe(v("mag", "conn"), v("jmag", "t"), "return", []), e.pipe(nt, v("jmag", "r"), "return", U, { via: ot }), nt = v("jmag", "l"), ot = []), e.pipe(nt, v("iu", "ret"), "return", U, { via: [...ot, [P("ret"), X]] }), G = v("buf", "out_sup"), H = v("buf", "out_ret"), L = [f], rt = [], tt = q + 7;
    }
    if (zs(e, a, G, H, L, rt, p || o, tt, M + 4), n)
      ye(e, a, v("iu", "dhw_hot"), v("iu", "circ"), v("iu", "dhw_cold"), y - 1, M + 18);
    else if (r) {
      const R = y - 9, q = M + 8;
      e.add("dhw", "dhw_tank", a.dhwLabel || c("type.dhw_tank"), R, q, { props: { volume: a.dhwVolume } }), e.pipe(v("iu", "dhw_sup"), v("dhw", "coil_in"), "supply", [d, u], { via: [[P("dhw_sup"), M - 1], [R + 8, M - 1], [R + 8, q + 4]] }), e.pipe(v("dhw", "coil_out"), v("iu", "dhw_ret"), "return", [d, u], { via: [[R + 7, q + 9], [R + 7, M - 3], [P("dhw_ret"), M - 3]] }), ye(e, a, v("dhw", "hot"), v("dhw", "circ"), v("dhw", "cold"), R, q);
    }
  } else {
    const M = A + 12;
    e.pipe(v("ou", "out"), v("iu", "src_in"), "supply", [d], { via: [[12, E.y], [12, M + 1]] }), e.pipe(v("iu", "src_out"), v("ou", "in"), "return", [d], { via: [[y + 1, M + 2], [11, M + 2]] });
    const P = M + 4;
    let B = v("iu", "ret"), G = [[y + 6, P]];
    const H = [d, ...h];
    a.separator && e.add("sc1", "separator", "SC1", y + 8, P - 1, { rot: 180, props: { filter: !0 } }), a.expansion && (e.add("jmag", "junction", "", y + 12, P), e.add("mag", "expansion_vessel", "MAG", y + 11, P + 1, { rot: 180 }), e.pipe(v("mag", "conn"), v("jmag", "b"), "return", [])), a.separator && e.add("sep", "separator", c("wz.separator_short"), y + 14, P - 1, { rot: 180 });
    const L = [];
    a.separator && L.push({ inP: v("sep", "in"), outP: v("sep", "out") }), a.expansion && L.push({ inP: v("jmag", "r"), outP: v("jmag", "l") }), a.separator && L.push({ inP: v("sc1", "in"), outP: v("sc1", "out") });
    for (let Z = 0; Z < L.length - 1; Z++) e.pipe(L[Z].outP, L[Z + 1].inP, "return", H);
    L.length && (e.pipe(L[L.length - 1].outP, B, "return", H, { via: G }), B = L[0].inP, G = []);
    let rt = v("iu", "sup"), X = B, tt = [[y + 7, M + 2], [y + 19, M + 2]], R = y + 20, q = [d, ...h];
    if (p) {
      const Z = y + 17, U = P + 2;
      e.add("buf", "buffer", a.bufferLabel || c("type.buffer"), Z, U, { props: { volume: a.bufferVolume } }), e.pipe(v("iu", "sup"), v("buf", "in_sup"), "supply", [d, ...h], { via: [[y + 7, M + 2], [Z + 1, M + 2]] }), e.pipe(v("buf", "in_ret"), B, "return", [d, ...h], { via: [[Z + 2, P]] }), rt = v("buf", "out_sup"), X = v("buf", "out_ret"), tt = [], q = [f], R = Z + 7;
    } else L.length && (X = B);
    if (zs(e, a, rt, X, q, tt, p, R, P + 2), r) {
      const Z = y - 4, U = P + 1;
      e.add("dhw", "dhw_tank", a.dhwLabel || c("type.dhw_tank"), Z, U, { props: { volume: a.dhwVolume } }), e.pipe(v("iu", "dhw_sup"), v("dhw", "coil_in"), "supply", [d, u], { via: [[y + 4, U + 4]] }), e.pipe(v("dhw", "coil_out"), v("iu", "dhw_ret"), "return", [d, u], { via: [[y + 5, U + 9]] }), ye(e, a, v("dhw", "hot"), v("dhw", "circ"), v("dhw", "cold"), Z, U);
    }
  }
  const O = Math.max(1, a.circuits.length), F = {
    version: 2,
    name: a.name,
    grid: { w: O > 1 ? 72 : 60, h: Math.max(36, (x ? 46 : 34) + (O - 1) * 10) },
    components: e.components,
    pipes: e.pipes,
    settings: t?.settings ?? { style: "flat", demo: !0 }
  };
  if (F.settings = { ...F.settings, wizard: a }, t) {
    const M = new Map(t.components.map((H) => [H.id, H]));
    for (const H of F.components) {
      const L = M.get(H.id);
      L && L.type === H.type && (H.bindings = { ...L.bindings }, L.icon && (H.icon = L.icon), L.show && (H.show = L.show));
    }
    const P = F.components.find((H) => H.id === "iu"), B = M.get("pc0"), G = M.get("vw1");
    P && B?.bindings.running && (P.bindings.pc0_running ??= B.bindings.running), P && B?.bindings.speed && (P.bindings.pc0_speed ??= B.bindings.speed), P && G?.bindings.position && (P.bindings.vw1_position ??= G.bindings.position);
  }
  return F;
}
function zs(a, t, e, s, i, n, o, r, l) {
  Math.max(1, t.circuits.length);
  const p = [], d = { ...e };
  t.circuits.slice(0, 4).forEach((h, u) => {
    const f = u + 1, g = l - 9 + u * 10, x = f === 1 ? "pc1" : `hc${f}_pump`, k = `hc${f}_mix`, y = `hc${f}`;
    let A = r, S = null, z = null, E = i;
    (o || h.mixed) && (a.add(x, "pump", f === 1 ? "PC1" : `PC${f}`, A, g, { props: { role: h.mixed ? "hc" : "secondary", circuit: f } }), S = v(x, "in"), z = v(x, "out"), E = [{ c: x, s: "running" }], p.push(E[0]), A += 4), h.mixed && (a.add(k, "mixer", `VC${f}`, A, g, { props: { circuit: f } }), z ? a.pipe(z, v(k, "in"), "supply", E) : S = v(k, "in"), z = v(k, "out"), A += 3);
    const O = A + 3;
    a.add(y, h.emitter, h.label || c("wz.circuit", { n: f }), O, g - 2, { props: { circuit: f } }), z ? a.pipe(z, v(y, "sup"), "supply", E, { via: [[O - 2, g + 1], [O - 2, g - 1]] }) : S = v(y, "sup"), a.pipe(d, S, "supply", E, u === 0 ? { via: [...n, [r - 1 - u, g + 1]] } : { via: [[r - 1 - u, g + 1]] }), h.mixed ? (a.add(`hc${f}_jm`, "junction", "", A - 2, g + 3), a.pipe(v(y, "ret"), v(`hc${f}_jm`, "r"), "return", E, { via: [[A - 2, g + 3]] }), a.pipe(v(`hc${f}_jm`, "t"), v(k, "ret"), "return", E), a.pipe(v(`hc${f}_jm`, "l"), s, "return", E, { via: [[r - 2 - u, g + 3]] })) : a.pipe(v(y, "ret"), s, "return", E, { via: [[r - 2 - u, g + 3]] });
  });
}
function ye(a, t, e, s, i, n, o) {
  const r = { c: "tap", s: "flowing" }, l = { c: "circ", s: "running" };
  a.add("tap", "tap", c("type.tap"), n - 6, o - 2), a.add("inlet", "water_inlet", c("type.water_inlet"), n - 6, o + 9), a.pipe(e, v("tap", "hot"), "dhw_hot", [], { flowAny: t.circulation ? [r, l] : [r], via: [[n - 2, o + 1], [n - 2, o - 1]] }), a.pipe(v("inlet", "out"), i, "dhw_cold", [r]), t.circulation && (a.add("circ", "pump", "PW2", n - 5, o + 3, { rot: 90, props: { role: "circulation" } }), a.pipe(v("tap", "circ"), v("circ", "in"), "circulation", [l]), a.pipe(v("circ", "out"), s, "circulation", [l]));
}
function Ae() {
  return es(Ee());
}
const Ui = 4;
class js {
  /**
   * @param saveExample store the example plant when none exists yet (panel only;
   *   a card must never write configuration on its own)
   */
  constructor(t, e = !0) {
    this.host = t, this.saveExample = e, this.plant = null, this.icons = /* @__PURE__ */ new Map(), this.backendMessages = [], this.simMessages = [], this.sim = null, this.version = 0, this.error = "", this.admin = !0, this.backendVersion = "", this._raf = 0, this._lastFrame = 0, this._accum = 0, this._boundIds = [], this._lastStates = [], this._loading = !1, this._connected = !1, t.addController(this);
  }
  _changed() {
    this.host.requestUpdate();
  }
  // ------------------------------------------------------------ lifecycle
  hostConnected() {
    this._connected = !0, this.hass && !this.api && this._init(), this.plant?.settings.demo && !this.sim && this._startSim();
  }
  hostDisconnected() {
    this._connected = !1, this._stopSim(), this._unsubMsg?.(), this._unsubMsg = void 0, this.api = void 0;
  }
  setHass(t) {
    this.hass = t;
    const e = t.themes?.darkMode ?? !0;
    this.host.toggleAttribute("light", !e), _s($s(this.plant?.settings.language, t.language)), this.api ? this.api.setHass(t) : this._connected && this._init(), this.plant && !this.plant.settings.demo && this._checkStates();
  }
  _init() {
    this.api = new $i(this.hass), this._load();
  }
  // ----------------------------------------------------------------- data
  get messages() {
    return this.sim ? this.simMessages : this.backendMessages;
  }
  get src() {
    return this.sim ? new Ni(this.sim) : new Pi(this.hass);
  }
  /** Re-render on hass updates only when a bound entity actually changed. */
  _checkStates() {
    if (!this.hass) return;
    const t = this._boundIds.map((e) => this.hass.states[e]);
    (t.length !== this._lastStates.length || t.some((e, s) => e !== this._lastStates[s])) && (this._lastStates = t, this.version++, this._changed());
  }
  _collectBound() {
    const t = /* @__PURE__ */ new Set();
    for (const e of this.plant?.components || [])
      Object.values(e.bindings || {}).forEach((s) => s && t.add(s)), (e.props.entries || []).forEach((s) => s.entity && t.add(s.entity));
    for (const e of this.plant?.pipes || []) e.bindings?.temp && t.add(e.bindings.temp);
    this._boundIds = [...t], this._lastStates = [];
  }
  async _load() {
    if (!(this._loading || !this.api)) {
      this._loading = !0;
      try {
        const t = await this.api.getConfig();
        this.admin = t.is_admin, this.backendVersion = t.version;
        let e = t.plant;
        e ? (e.version ?? 1) < 2 && e.settings?.wizard && (e = es(e.settings.wizard, e), t.is_admin && this.saveExample && await this.api.saveConfig(e)) : (e = Ae(), t.is_admin && this.saveExample && await this.api.saveConfig(e)), this.setPlant(e), await this.loadIcons(), this.api.standalone || (this.backendMessages = await this.api.listMessages(), this._unsubMsg = await this.api.subscribeMessages((s) => this._mergeMessage(s)));
      } catch (t) {
        this.error = t?.message || String(t);
      } finally {
        this._loading = !1, this._changed();
      }
    }
  }
  async loadIcons() {
    const t = await this.api.listIcons();
    this.icons = new Map(t.map((e) => [e.id, e])), this._changed();
  }
  _mergeMessage(t) {
    const e = this.backendMessages.findIndex((i) => i.id === t.id), s = [...this.backendMessages];
    e >= 0 ? s[e] = t : s.push(t), this.backendMessages = s, this._changed();
  }
  setPlant(t) {
    const e = JSON.stringify(ve(this.plant));
    this.plant = t, _s($s(t.settings.language, this.hass?.language)), this._collectBound(), t.settings.demo ? (!this.sim || JSON.stringify(ve(t)) !== e) && this._startSim() : (this._stopSim(), this._checkStates()), this.version++, this._changed();
  }
  async save(t) {
    await this.api.saveConfig(t), this.setPlant(t);
  }
  async clearMessages() {
    await this.api.clearMessages(), this.backendMessages = await this.api.listMessages(), this._changed();
  }
  // ------------------------------------------------------------------ sim
  _startSim() {
    this._stopSim();
    const t = this.plant?.components.find((i) => i.type === "dhw_tank"), e = new Ii(ve(this.plant), void 0, { dhw: t?.label || c("type.dhw_tank") });
    this.sim = e, this._unsubSim = e.onMessage(() => {
      this.simMessages = [...e.messages], this._changed();
    }), this.simMessages = [...e.messages], this._lastFrame = performance.now();
    const s = (i) => {
      const n = (i - this._lastFrame) / 1e3;
      this._lastFrame = i, document.hidden || (e.advance(n), this._accum += n, this._accum >= 1 / Ui && (this._accum = 0, this.version++, this._changed())), this._raf = requestAnimationFrame(s);
    };
    this._raf = requestAnimationFrame(s);
  }
  _stopSim() {
    this._raf && cancelAnimationFrame(this._raf), this._raf = 0, this._unsubSim?.(), this._unsubSim = void 0, this.sim && (this.sim = null, this.simMessages = [], this.api && !this.api.standalone && this.api.listMessages().then(
      (t) => {
        this.backendMessages = t, this._changed();
      },
      () => {
      }
    ));
  }
  scenario(t) {
    const e = this.sim;
    if (e) {
      switch (t) {
        case "winter":
          e.outdoorMean = -10, e.tOut = -10;
          break;
        case "transition":
          e.outdoorMean = 12, e.tOut = 12;
          break;
        case "shower":
          e.startDraw(8, 9);
          break;
        case "defrost":
          e.ice = 1.01, e.heatDemand = !0;
          break;
        case "dim14a":
          e.dim14a = !e.dim14a;
          break;
        case "pv":
          e.pv = !e.pv;
          break;
        case "disinfect":
          e.disinfect = !0;
          break;
        case "fault":
          e.fault = !e.fault;
          break;
        case "reset":
          this._startSim();
          return;
      }
      e.scenarioMessage(c(`scn.${t}`)), this.version++, this._changed();
    }
  }
}
const Fs = j`
  :host {
    --cp-font: "Inter", "Segoe UI", Roboto, system-ui, -apple-system, sans-serif;
    --cp-radius: 14px;
    --cp-accent: #3ddc97;
    --cp-accent-2: #38d0ff;
    --cp-warn: #f5b942;
    --cp-error: #ff5a5f;
    --cp-info: #4d9fff;
    --cp-notice: #b07cff;
    --cp-select: #ffd166;

    --cp-bg: #0b1016;
    --cp-bg-2: #111821;
    --cp-surface: #151d27;
    --cp-surface-2: #1b2531;
    --cp-border: rgba(255, 255, 255, 0.08);
    --cp-text: #e8eef5;
    --cp-muted: #8a97a6;
    --cp-grid: rgba(255, 255, 255, 0.09);
    --cp-flow: rgba(255, 255, 255, 0.92);
    --cp-pipe-outline: rgba(0, 0, 0, 0.55);
    --cp-casing: #232d3a;
    --cp-casing-light: #2c3747;
    --cp-casing-stroke: #3d4a5c;
    --cp-sheen: rgba(255, 255, 255, 0.04);
    --cp-grille: #4a586b;
    --cp-grille-bg: #161d26;
    --cp-fan: #6b7a8f;
    --cp-screen: #0f2a22;
    --cp-insulation: #1a222c;
    --cp-ground: #3b2f25;
    --cp-chip: rgba(21, 29, 39, 0.88);
    --cp-chip-hover: rgba(35, 47, 62, 0.95);
    --cp-chip-stroke: rgba(255, 255, 255, 0.09);
    --cp-port: #8a97a6;
    color-scheme: dark;
  }
  :host([light]) {
    --cp-bg: #eef2f6;
    --cp-bg-2: #e6ebf1;
    --cp-surface: #ffffff;
    --cp-surface-2: #f4f7fa;
    --cp-border: rgba(15, 23, 42, 0.1);
    --cp-text: #142030;
    --cp-muted: #5c6b7c;
    --cp-grid: rgba(15, 23, 42, 0.1);
    --cp-flow: rgba(255, 255, 255, 0.95);
    --cp-pipe-outline: rgba(15, 23, 42, 0.18);
    --cp-casing: #f7f9fb;
    --cp-casing-light: #ffffff;
    --cp-casing-stroke: #b9c4d0;
    --cp-sheen: rgba(255, 255, 255, 0.6);
    --cp-grille: #a9b5c2;
    --cp-grille-bg: #e3e9ef;
    --cp-fan: #8796a8;
    --cp-screen: #12352b;
    --cp-insulation: #dfe5ec;
    --cp-ground: #cbb59c;
    --cp-chip: rgba(255, 255, 255, 0.94);
    --cp-chip-hover: #ffffff;
    --cp-chip-stroke: rgba(15, 23, 42, 0.12);
    --cp-port: #5c6b7c;
    --cp-accent: #12b076;
    --cp-select: #e0a100;
    color-scheme: light;
  }
`, Q = j`
  * {
    box-sizing: border-box;
  }
  :host {
    font-family: var(--cp-font);
    color: var(--cp-text);
  }
  button,
  .btn {
    font: inherit;
    font-size: 13px;
    font-weight: 600;
    color: var(--cp-text);
    background: var(--cp-surface-2);
    border: 1px solid var(--cp-border);
    border-radius: 10px;
    padding: 7px 12px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: background 0.15s, border-color 0.15s;
    white-space: nowrap;
  }
  button:hover {
    border-color: color-mix(in srgb, var(--cp-accent) 50%, transparent);
  }
  button.primary {
    background: var(--cp-accent);
    border-color: var(--cp-accent);
    color: #04140d;
  }
  button.danger {
    color: var(--cp-error);
  }
  button.ghost {
    background: transparent;
    border-color: transparent;
  }
  button.icon {
    padding: 7px;
  }
  button:disabled {
    opacity: 0.45;
    cursor: default;
  }
  button svg,
  .ico {
    width: 18px;
    height: 18px;
    flex: none;
  }
  input,
  select,
  textarea {
    font: inherit;
    font-size: 14px;
    color: var(--cp-text);
    background: var(--cp-bg-2);
    border: 1px solid var(--cp-border);
    border-radius: 10px;
    padding: 8px 10px;
    width: 100%;
    min-width: 0;
  }
  input[type="checkbox"],
  input[type="radio"] {
    width: auto;
    accent-color: var(--cp-accent);
  }
  input[type="range"] {
    padding: 0;
    accent-color: var(--cp-accent);
  }
  label.field {
    display: grid;
    gap: 5px;
    font-size: 12px;
    color: var(--cp-muted);
    font-weight: 600;
  }
  .card {
    background: var(--cp-surface);
    border: 1px solid var(--cp-border);
    border-radius: var(--cp-radius);
    padding: 16px;
  }
  .muted {
    color: var(--cp-muted);
  }
  .row {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }
  .spacer {
    flex: 1;
  }
  h2 {
    font-size: 18px;
    margin: 0 0 6px;
  }
  h3 {
    font-size: 14px;
    margin: 18px 0 8px;
    color: var(--cp-muted);
    text-transform: uppercase;
    letter-spacing: 0.6px;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    border-radius: 9px;
    font-size: 11px;
    font-weight: 700;
    background: var(--cp-error);
    color: #fff;
  }
  .toast {
    position: fixed;
    left: 50%;
    bottom: 24px;
    transform: translateX(-50%);
    background: var(--cp-surface-2);
    border: 1px solid var(--cp-border);
    padding: 10px 16px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    z-index: 20;
    font-size: 13px;
  }
`, ji = {
  menu: "M4 7h16M4 12h16M4 17h16",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  bell: "M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0",
  gear: "M12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1",
  play: "M8 5l11 7l-11 7z",
  pause: "M8 5v14M16 5v14",
  expand: "M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5",
  fit: "M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M9 9h6v6H9z",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  trash: "M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13",
  undo: "M9 14L4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3",
  redo: "M15 14l5-5l-5-5M20 9H10a6 6 0 0 0 0 12h3",
  save: "M5 4h11l3 3v13H5zM8 4v5h7V4M8 20v-6h8v6",
  rotate: "M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7",
  copy: "M8 8h11v11H8zM5 16V5h11",
  wand: "M4 20L15 9M14 4v3M19 9h-3M17 5l-2 2M18 13l-1 1M10 3l1 2",
  link: "M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1",
  image: "M4 5h16v14H4zM4 16l5-5l4 4l3-3l4 4M15 9h.01",
  close: "M6 6l12 12M18 6L6 18",
  check: "M5 12l5 5l9-10",
  flask: "M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3",
  info: "M12 8h.01M11 12h1v5h1M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18",
  warn: "M12 3l10 18H2zM12 10v5M12 18h.01",
  error: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM9 9l6 6M15 9l-6 6",
  notice: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM12 7v6M12 16h.01",
  search: "M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14zM20 20l-4-4",
  download: "M12 4v11M7 10l5 5l5-5M5 20h14",
  upload: "M12 20V9M7 14l5-5l5 5M5 4h14"
};
function T(a) {
  return $`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d=${ji[a] || ""} /></svg>`;
}
const Pe = $`<svg viewBox="0 0 32 32" class="logo" aria-hidden="true">
  <defs><linearGradient id="cp-logo" x1="0" y1="1" x2="1" y2="0">
    <stop offset="0" stop-color="#38d0ff" /><stop offset="0.55" stop-color="#3ddc97" /><stop offset="1" stop-color="#ffb35c" />
  </linearGradient></defs>
  <path d="M24 7.5A11 11 0 1 0 24 24.5" fill="none" stroke="url(#cp-logo)" stroke-width="4" stroke-linecap="round" />
  <path d="M16 9c3 4 5 6.5 5 9a5 5 0 0 1-10 0c0-2.5 2-5 5-9z" fill="url(#cp-logo)" />
</svg>`, Fi = 7, Zi = 35, Zs = 4.9;
function Qt(a, t, e = "air") {
  const s = t + 273.15 + 3, i = (e === "air" ? a - 6 : 0) + 273.15;
  return Math.max(1.2, Math.min(8, 0.57 * s / Math.max(5, s - i)));
}
function Yi(a, t, e = Zs, s = "air") {
  return e * Qt(a, t, s) / Qt(Fi, Zi, s);
}
function Gi(a) {
  return a >= 0.9 ? "green" : a >= 0.75 ? "yellow" : "red";
}
const Ct = { green: "#3ddc97", yellow: "#f5c542", red: "#ff5a5f" };
function Ys(a, t) {
  const e = a.components.find((g) => g.type === "outdoor_unit"), s = a.components.find((g) => g.type === "indoor_unit");
  if (!e || !s) return;
  const i = (g, x) => {
    const k = t.get(g, x);
    return k?.available && k.num !== null ? k.num : void 0;
  }, n = i(e, "heat_power");
  let o = i(e, "el_power");
  o !== void 0 && t.get(e, "el_power")?.unit === "kW" && (o *= 1e3);
  const r = i(e, "outdoor_temp"), l = i(s, "supply_temp"), p = String(t.get(e, "activity")?.raw ?? "").toLowerCase();
  if (n === void 0 || o === void 0 || r === void 0 || l === void 0 || n < 0.5 || o < 80 || p.includes("defrost") || p.includes("abtau")) return;
  const d = n / (o / 1e3), h = Qe(e.model).source, u = Yi(r, l, Number(e.props.cop_ref) || Zs, h), f = d / u;
  return { cop: d, expected: u, ratio: f, ampel: Gi(f), tOut: r, tFlow: l };
}
function Pt(a) {
  return a && a.el > 0.05 ? a.heat / a.el : void 0;
}
const qt = { heat: 0, el: 0, heatDhw: 0, elDhw: 0, aux: 0 };
function Ot(a, t) {
  return {
    heat: a.heat + (t.heat || 0),
    el: a.el + (t.el || 0),
    heatDhw: a.heatDhw + (t.heatDhw || 0),
    elDhw: a.elDhw + (t.elDhw || 0),
    aux: a.aux + (t.aux || 0)
  };
}
function Tt(a) {
  return new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
}
const qi = {
  heat: ["heat_energy_total"],
  el: ["el_energy_total"],
  heatDhw: ["heat_energy_dhw"],
  elDhw: ["el_energy_dhw"],
  aux: ["aux_energy_total"]
};
async function Ji(a, t) {
  const e = t.components.find((k) => k.type === "indoor_unit"), s = {};
  for (const [k, y] of Object.entries(qi)) {
    const A = y.map((S) => e?.bindings[S]).find(Boolean);
    A && (s[k] = A);
  }
  const i = { today: null, yesterday: null, month: null, year: null, daily: [], estimated: { month: !1, year: !1 } };
  if (!s.heat || !s.el) return { ...i, missing: "no_counters" };
  const n = /* @__PURE__ */ new Date(), o = Object.values(s), r = (k, y) => a.callWS({
    type: "recorder/statistics_during_period",
    start_time: k.toISOString(),
    end_time: n.toISOString(),
    statistic_ids: o,
    period: y,
    types: ["change"],
    units: { energy: "kWh" }
  }), [l, p] = await Promise.all([
    r(new Date(Tt(n) - 30 * 864e5), "day"),
    r(new Date(n.getFullYear(), 0, 1), "month")
  ]), d = /* @__PURE__ */ new Map();
  for (const [k, y] of Object.entries(s))
    for (const A of l[y] || []) {
      const S = Tt(new Date(A.start));
      d.set(S, Ot(d.get(S) || qt, { [k]: A.change || 0 }));
    }
  if (!d.size) return { ...i, missing: "no_statistics" };
  const h = [...d.entries()].sort((k, y) => k[0] - y[0]).map(([k, y]) => ({ day: k, ...y })), u = d.get(Tt(n)) || null, f = d.get(Tt(n) - 864e5) || null;
  let g = qt, x = null;
  for (const [k, y] of Object.entries(s))
    for (const A of p[y] || [])
      g = Ot(g, { [k]: A.change || 0 }), new Date(A.start).getMonth() === n.getMonth() && (x = Ot(x || qt, { [k]: A.change || 0 }));
  return { today: u, yesterday: f, month: x, year: g, daily: h, estimated: { month: !1, year: !1 } };
}
const Gs = [2, 3, 6.5, 10.5, 14.5, 18, 20, 19.5, 15.5, 10.5, 6, 3], Es = 0.8;
function be(a, t, e, s) {
  const i = s ?? Gs[t], n = a.p, o = n.heatLoad / (21 - n.designTemp);
  let r = 0, l = 0;
  for (const h of [-4, -2, 0, 2, 4]) {
    const u = i + h;
    if (u >= 16) continue;
    const f = o * (21 - u) * 24 * e * 0.2 * 0.85, g = 21 + (21 - u) * ((n.floor ? 35 : 50) - 21) / (21 - n.designTemp);
    r += f, l += f / (Qt(u, g, n.source) * Es);
  }
  const p = 8.4 * e * (n.dhwL > 0 ? 1 : 0), d = p / (Qt(i, 53, n.source) * Es);
  return { heat: r + p, el: l + d, heatDhw: p, elDhw: d, aux: 0 };
}
function Xi(a) {
  const t = new Date(a.time * 1e3), e = Tt(t), s = a.dailyEnergy(), i = s.find((p) => p.day === e) || null, n = s.find((p) => p.day === e - 864e5) || null, o = be(a, t.getMonth(), t.getDate() - 1 + t.getHours() / 24, a.outdoorMean);
  let r = qt;
  for (let p = 0; p < t.getMonth(); p++) r = Ot(r, be(a, p, new Date(t.getFullYear(), p + 1, 0).getDate()));
  r = Ot(r, o);
  const l = [];
  for (let p = 29; p >= 2; p--) {
    const d = e - p * 864e5, h = new Date(d), u = p <= 14 ? (14 - p) / 14 : 0, f = Gs[h.getMonth()] * (1 - u) + a.outdoorMean * u + Math.sin(p * 1.3) * 2, g = be(a, h.getMonth(), 1, f), x = 1 + Math.sin(p * 1.7) * 0.18;
    l.push({ day: d, ...g, heat: g.heat * x, el: g.el * x * (1 + Math.cos(p) * 0.04) });
  }
  return {
    today: i,
    yesterday: n,
    month: o,
    year: r,
    daily: [...l, ...s.filter((p) => p.day >= e - 864e5)],
    estimated: { month: !0, year: !0 }
  };
}
const As = {
  heating: "#ff8a3d",
  hot_water: "#ff4f8b",
  defrost: "#6cc4ff",
  compressor_alarm: "#ff4d4d",
  cooling: "#38d0ff",
  off: "#8b949e"
};
function ss(a, t, e = 10, s = "casing") {
  return $`<rect class=${s} x="0" y="0" width=${a} height=${t} rx=${e} />
    <rect class="sheen" x="2" y="2" width=${a - 4} height=${Math.min(t * 0.35, 40)} rx=${e - 2} />`;
}
function Qi(a) {
  const { w: t, h: e, flags: s, c: i } = a, n = Qe(i.model);
  if (n.source === "brine") return tn(a);
  const o = s.has("running") && !s.has("defrost"), r = s.has("defrost"), l = s.has("alarm"), p = t * 0.36, d = e * 0.5, h = Math.min(e * 0.38, t * 0.3), u = a.num("fan_speed") ?? (o ? 60 : 0), f = u <= 0 ? 0 : u < 45 ? 2.8 : u < 70 ? 2 : 1.5, g = l ? "#ff4d4d" : r ? "#6cc4ff" : o ? "#3ddc97" : "#5b6573", x = [0, 120, 240].map(
    (k) => $`<path transform="rotate(${k})" d="M0 0 C ${h * 0.18} ${-h * 0.25}, ${h * 0.55} ${-h * 0.35}, ${h * 0.82} ${-h * 0.12} C ${h * 0.6} ${h * 0.05}, ${h * 0.25} ${h * 0.08}, 0 0 Z" />`
  );
  return $`
    <rect class="foot" x=${t * 0.12} y=${e - 2} width=${t * 0.16} height="6" rx="2" />
    <rect class="foot" x=${t * 0.72} y=${e - 2} width=${t * 0.16} height="6" rx="2" />
    ${ss(t, e, 12)}
    <circle class="grille-bg" cx=${p} cy=${d} r=${h + 4} />
    <g transform="translate(${p} ${d})">
      <g class=${f ? "spin fan" : "fan"} style=${f ? `--dur:${f}s` : ""}>${x}<circle r=${h * 0.12} class="hub" /></g>
    </g>
    ${[0.45, 0.72, 1].map((k) => $`<circle class="grille" cx=${p} cy=${d} r=${h * k} />`)}
    <line class="grille" x1=${p - h} y1=${d} x2=${p + h} y2=${d} />
    <line class="grille" x1=${p} y1=${d - h} x2=${p} y2=${d + h} />
    ${[0, 1, 2, 3, 4, 5].map((k) => $`<rect class="vent" x=${t * 0.73} y=${e * 0.22 + k * e * 0.1} width=${t * 0.19} height="3" rx="1.5" />`)}
    <circle cx=${t * 0.9} cy=${e * 0.12} r="4" fill=${g} class=${o || r ? "pulse" : ""} />
    ${n.refrigerant ? $`<text class="tag" x=${t * 0.825} y=${e * 0.9} text-anchor="middle">${n.refrigerant}</text>` : ""}
    ${r ? $`<rect x="2" y="2" width=${t - 4} height=${e - 4} rx="10" class="frost" />
        <g class="pulse" transform="translate(${p} ${d})">${en(h * 0.55)}</g>` : ""}
    ${l ? $`<rect x="1" y="1" width=${t - 2} height=${e - 2} rx="11" class="alarm-ring" />` : ""}
  `;
}
function tn(a) {
  const { w: t, h: e, flags: s } = a, i = s.has("running");
  return $`
    ${ss(t, e * 0.55, 10)}
    <text class="tag" x=${t / 2} y=${e * 0.32} text-anchor="middle">SOLE</text>
    <rect class="ground" x="0" y=${e * 0.62} width=${t} height=${e * 0.38} rx="6" />
    ${[0.2, 0.4, 0.6, 0.8].map(
    (n) => $`<path class=${i ? "probe active" : "probe"} d="M${t * n - 6} ${e * 0.55} V ${e * 0.95} M${t * n + 6} ${e * 0.55} V ${e * 0.95} M${t * n - 6} ${e * 0.95} Q ${t * n} ${e} ${t * n + 6} ${e * 0.95}" />`
  )}
  `;
}
function en(a) {
  const t = [0, 60, 120].map(
    (e) => $`<g transform="rotate(${e})"><line x1=${-a} y1="0" x2=${a} y2="0" />
      <path d="M${a * 0.6} 0 l ${a * 0.2} ${-a * 0.2} M${a * 0.6} 0 l ${a * 0.2} ${a * 0.2} M${-a * 0.6} 0 l ${-a * 0.2} ${-a * 0.2} M${-a * 0.6} 0 l ${-a * 0.2} ${a * 0.2}" /></g>`
  );
  return $`<g class="snow">${t}</g>`;
}
const w = 20;
function D(a, t, e) {
  const s = a.map(([i, n], o) => `${o ? "L" : "M"} ${i * w} ${n * w}`).join(" ");
  return $`<path class="ipipe" d=${s} style="stroke:${t}" />
    ${e ? $`<path class="ipipe-flow" d=${s} />` : _}`;
}
function Nt([a, t], e, s = "l") {
  const i = 0.55 * w, n = { r: 0, d: 90, l: 180, u: 270 }[s];
  return $`<g transform="translate(${a * w} ${t * w})">
    ${e ? $`<circle class="pump-glow pulse" r=${i + 4} />` : _}
    <circle class=${e ? "pump-body on" : "pump-body"} r=${i} />
    <path class=${e ? "pump-tri on" : "pump-tri"} transform="rotate(${n})" d="M ${-i * 0.5} ${-i * 0.8} L ${i} 0 L ${-i * 0.5} ${i * 0.8} Z" />
    <circle class=${e ? "impeller spin" : "impeller"} style="--dur:0.9s" r=${i * 0.36} />
    <text class="itag" y=${i + 9} text-anchor="middle">PC0</text>
  </g>`;
}
function Kt([a, t], e, s = "VW1") {
  const i = 0.5 * w;
  return $`<g transform="translate(${a * w} ${t * w})">
    <path class="valve-tri on" d="M ${-i} ${-i * 0.6} L 0 0 L ${-i} ${i * 0.6} Z" transform="rotate(-90)" />
    <path class=${e ? "valve-tri" : "valve-tri on"} d="M ${i} ${-i * 0.6} L 0 0 L ${i} ${i * 0.6} Z" />
    <path class=${e ? "valve-tri on" : "valve-tri"} d="M ${-i} ${-i * 0.6} L 0 0 L ${-i} ${i * 0.6} Z" />
    <text class="itag" x=${i + 3} y=${-i} >${s} ${e ? "B" : "A"}</text>
  </g>`;
}
function Ut([a, t], e, s) {
  return $`<g transform="translate(${a * w} ${t * w})">
    ${s ? $`<rect class="aux-glow pulse" x=${-0.55 * w} y="-6" width=${1.1 * w} height=${e * w + 12} rx="10" />` : _}
    <rect class=${s ? "rod hot" : "rod"} x=${-0.35 * w} y="0" width=${0.7 * w} height=${e * w} rx="6" />
    <path class=${s ? "coil hot" : "coil"} d=${sn(0, 6, e * w - 12, 4, 8)} />
  </g>`;
}
function jt([a, t]) {
  return $`<g transform="translate(${a * w} ${t * w})"><circle class="gauge" r="7" /><line class="gauge-needle" x1="0" y1="0" x2="4" y2="-4" /></g>`;
}
function sn(a, t, e, s, i) {
  const n = e / i;
  let o = `M${a} ${t}`;
  for (let r = 1; r <= i; r++) o += ` L${a + (r % 2 ? -s : s)} ${t + r * n}`;
  return o;
}
function Ft(a, t, e, s) {
  const i = [...a.flags].find((o) => o.startsWith("mode_"))?.slice(5), n = As[i || "off"] || As.off;
  return $`<rect class="screen" x=${t} y=${e} width=${s} height="18" rx="4" />
    <rect x=${t + 4} y=${e + 4} width="14" height="10" rx="2" fill=${n} class=${i && i !== "off" ? "pulse" : ""} />
    <text class="screen-text" x=${t + 24} y=${e + 13}>${i ? c(`mode.${i}`) : ""}</text>`;
}
function nn(a, t) {
  const { w: e, h: s, flags: i, c: n } = a, o = i.has("running"), r = i.has("b"), l = i.has("aux"), p = i.has("pc1"), d = Y(a.num("supply_temp"), "#ff7a45"), h = Y(a.num("return_temp"), "#4d9fff"), u = (n.model || "").match(/w[ls]w\d{3}i/i)?.[0]?.toUpperCase().replace("I", "i") || "";
  let f;
  if (t === "t180") {
    const g = Y(a.num("dhw_temp"), "#ff4f8b");
    f = $`
      <rect class="tank-in" x=${0.6 * w} y=${10 * w} width=${6.8 * w} height=${11.2 * w} rx=${w} style="fill:${g}" />
      <path class=${o && r ? "tank-coil hot" : "tank-coil"} d=${on(2.4, 14, 5.6, 19.6)} />
      ${Ft(a, 1.6 * w, 0.8 * w, 4.6 * w)}
      ${D([[6, 0], [6, 6.2], [4.6, 6.2]], d, o)}
      ${D([[4.6, 6.2], [3, 6.2], [3, 0]], d, o && !r)}
      ${D([[4.6, 6.2], [4.6, 14]], d, o && r)}
      ${D([[2.4, 19.6], [1.6, 19.6], [1.6, 7.6]], h, o && r)}
      ${D([[1, 0], [1, 7.6]], h, o && !r)}
      ${D([[1, 7.6], [7, 7.6], [7, 0]], h, o)}
      ${D([[4, 10.2], [4, 0]], g, i.has("flowing"))}
      ${D([[5, 0], [5, 3], [5.6, 3], [5.6, 20.6]], "#38d0ff", i.has("flowing"))}
      ${Ut([6, 1.4], 4, l)}
      ${Kt([4.6, 6.2], r)}
      ${Nt([4.2, 7.6], o, "r")}
      ${$`<g transform="translate(${3 * w} ${3.4 * w})"><circle class=${p ? "pump-body on" : "pump-body"} r="8" /><text class="itag" x="12" y="4">PC1</text></g>`}
      ${jt([0.6, 8.2])}`;
  } else if (t === "tp70") {
    const g = Y(a.num("buffer_temp"), "#ff9f45");
    f = $`
      <rect class="tank-in" x=${0.6 * w} y=${9 * w} width=${7.8 * w} height=${6.4 * w} rx=${w} style="fill:${g}" />
      <text class="tank-label" x=${4.5 * w} y=${13.6 * w} text-anchor="middle">${n.props.buffer_l || 70} l</text>
      ${Ft(a, 2.2 * w, 0.8 * w, 4.6 * w)}
      ${D([[5, 0], [5, 5.2]], d, o)}
      ${D([[5, 5.2], [5, 9]], d, o && !r)}
      ${D([[5, 5.2], [7, 5.2], [7, 0]], d, o && r)}
      ${D([[8, 0], [8, 6.4], [6, 6.4]], h, o && r)}
      ${D([[6.2, 15], [6.2, 9]], h, o && !r)}
      ${D([[6, 9], [6, 0]], h, o)}
      ${D([[1.6, 9], [1.6, 6.4], [1, 6.4], [1, 0]], g, p)}
      ${D([[2, 0], [2, 14.8]], h, p)}
      ${D([[3, 0], [3, 1.4]], g, !1)}
      ${D([[4, 0], [4, 1.4]], h, !1)}
      ${Ut([4.5, 1.4], 2.6, l)}
      ${Kt([5, 5.2], r)}
      ${Nt([6.5, 6.4], o, "u")}
      <g transform="translate(${1.6 * w} ${6.4 * w})"><circle class=${p ? "pump-body on" : "pump-body"} r="8" />
        ${p ? $`<circle class="impeller spin" style="--dur:0.9s" r="3.5" />` : _}<text class="itag" x="11" y="4">PC1</text></g>
      ${jt([0.7, 6.6])}`;
  } else t === "brine" ? f = $`
      ${Ft(a, 1.6 * w, 0.8 * w, 4.6 * w)}
      <circle class="compressor" cx=${2.2 * w} cy=${8.5 * w} r=${1.2 * w} />
      <text class="itag" x=${2.2 * w} y=${10.4 * w} text-anchor="middle">Verdichter</text>
      ${D([[1, 0], [1, 6], [2.2, 6], [2.2, 7.3]], "#38d0ff", o)}
      ${D([[2.2, 9.7], [2.2, 11.5], [2, 11.5], [2, 0]], "#2b6cff", o)}
      ${D([[4, 9], [4, 4], [5.5, 4], [5.5, 9]], d, o)}
      ${D([[5.5, 9], [7, 9], [7, 0]], d, o && !r)}
      ${D([[5.5, 9], [5.5, 10.4], [4, 10.4], [4, 0]], d, o && r)}
      ${D([[6, 0], [6, 11.6], [4, 11.6], [4, 9]], h, o && !r)}
      ${D([[5, 0], [5, 3.4]], h, o && r)}
      ${Ut([4, 3], 3, l)}
      ${Kt([5.5, 9], r)}
      ${Nt([5.5, 11.6], o, "l")}
      ${jt([0.7, 9])}` : f = $`
      ${Ft(a, 1.6 * w, 0.8 * w, 4.6 * w)}
      ${D([[2, 12], [2, 8.2], [3.3, 8.2], [3.3, 2.6], [5.6, 2.6], [5.6, 9]], d, o)}
      ${D([[5.6, 9], [7, 9], [7, 12]], d, o && !r)}
      ${D([[5.6, 9], [5.6, 9.9], [4, 9.9], [4, 12]], d, o && r)}
      ${D([[6, 12], [6, 11.2], [5, 11.2]], h, o && !r)}
      ${D([[5, 12], [5, 11.2]], h, o && r)}
      ${D([[5, 11.2], [1, 11.2], [1, 12]], h, o)}
      ${Ut([3.3, 3.2], 4.3, l)}
      ${Kt([5.6, 9], r)}
      ${Nt([3.3, 11.2], o, "l")}
      ${jt([0.6, 8.6])}`;
  return $`
    ${ss(e, s, 10, "casing light")}
    ${f}
    ${t === "wall_e" ? _ : $`<text class="tag" x=${e / 2} y=${2.4 * w} text-anchor="middle">${u}</text>`}
  `;
}
function on(a, t, e, s) {
  const n = (s - t) / 5;
  let o = `M ${e * w} ${t * w - 2 * w}`;
  o += ` L ${e * w} ${t * w}`;
  for (let r = 0; r < 5; r++) {
    const l = (t + r * n) * w;
    o += ` C ${(a - 0.3) * w} ${l}, ${(a - 0.3) * w} ${l + n / 2 * w}, ${e * w} ${l + n / 2 * w}`, o += ` C ${(e + 0.3) * w} ${l + n / 2 * w}, ${(e + 0.3) * w} ${l + n * w}, ${a * w} ${l + n * w}`;
  }
  return o;
}
function Ps(a, t) {
  const { w: e, h: s, c: i, flags: n } = a, o = a.num("temp_top"), r = a.num("temp_bottom") ?? (o !== void 0 ? o - 6 : void 0), l = a.num("temp_mid") ?? (o !== void 0 && r !== void 0 ? (o + r) / 2 : void 0), p = `tg-${i.id}`, d = t === "dhw" ? "#ff4f8b" : "#ff7a45", h = n.has("charging"), u = i.props.volume ? `${i.props.volume} l` : "", f = Math.min(e / 2, 2 * w);
  return $`
    <defs>
      <linearGradient id=${p} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.05" stop-color=${Y(o, d)} />
        <stop offset="0.5" stop-color=${Y(l, "#c084fc")} />
        <stop offset="0.95" stop-color=${Y(r, "#4d9fff")} />
      </linearGradient>
    </defs>
    <rect class="insulation" x="-3" y="-3" width=${e + 6} height=${s + 6} rx=${f + 3} />
    <rect x="0" y="0" width=${e} height=${s} rx=${f} fill="url(#${p})" class="tank-fill" />
    <rect class="tank-glass" x=${e * 0.1} y=${s * 0.06} width=${e * 0.12} height=${s * 0.88} rx=${e * 0.06} />
    ${t === "dhw" ? $`<path class=${h ? "tank-coil hot" : "tank-coil"} d=${an(e)} />
        <path class="dip" d="M 0 ${10 * w} H ${0.8 * w} V ${s - 0.4 * w}" />` : $`
        <path class="dip" d="M ${2 * w} 0 V ${s - 0.5 * w}" />
        <path class="dip" d="M ${3 * w} 0 V ${s - 0.5 * w}" />
        ${[0.3, 0.55, 0.8].map((g) => $`<line class="strat" x1=${e * 0.62} x2=${e * 0.9} y1=${s * g} y2=${s * g} />`)}`}
    <text class="tank-label" x=${e / 2} y=${s * (t === "dhw" ? 0.3 : 0.5)} text-anchor="middle">${u}</text>
    ${n.has("disinfecting") ? $`<text class="tank-badge" x=${e / 2} y=${s * 0.18} text-anchor="middle">60°</text>` : ""}
  `;
}
function an(a) {
  const t = a, e = a * 0.78, s = a * 0.3, i = 4 * w, n = 9 * w, o = 5, r = (n - i) / o;
  let l = `M ${t} ${i} H ${e}`;
  for (let p = 0; p < o; p++) {
    const d = i + p * r;
    l += ` C ${s - 6} ${d}, ${s - 6} ${d + r / 2}, ${e} ${d + r / 2} C ${e + 6} ${d + r / 2}, ${e + 6} ${d + r}, ${e} ${d + r}`;
  }
  return `${l} H ${t}`;
}
function rn(a) {
  const { w: t, h: e, flags: s } = a, i = s.has("running"), n = Math.min(t, e) / 2 - 2, o = t / 2, r = e / 2;
  return $`
    ${i ? $`<circle class="pump-glow pulse" cx=${o} cy=${r} r=${n + 5} />` : ""}
    <circle class=${i ? "pump-body on" : "pump-body"} cx=${o} cy=${r} r=${n} />
    <path class=${i ? "pump-tri on" : "pump-tri"} d="M ${o - n * 0.5} ${r - n * 0.82} L ${o + n} ${r} L ${o - n * 0.5} ${r + n * 0.82} Z" />
    <g transform="translate(${o} ${r})">
      <circle class=${i ? "impeller spin" : "impeller"} style="--dur:0.9s" r=${n * 0.38} />
    </g>
  `;
}
function Ls(a, t = !1) {
  const { w: e, h: s, flags: i } = a, n = e / 2, o = s / 2, r = Math.min(e, s) / 2 - 2, l = i.has("b"), p = (d) => t || d ? "valve-tri on" : "valve-tri";
  return $`
    <rect class="actuator" x=${n - r * 0.35} y=${o - r * 1.25} width=${r * 0.7} height=${r * 0.45} rx="2" />
    <line class="stem" x1=${n} y1=${o - r * 0.8} x2=${n} y2=${o} />
    <path class=${p(!0)} d="M ${n - r} ${o - r * 0.6} L ${n} ${o} L ${n - r} ${o + r * 0.6} Z" />
    <path class=${p(!l)} d="M ${n + r} ${o - r * 0.6} L ${n} ${o} L ${n + r} ${o + r * 0.6} Z" />
    <path class=${p(l)} d="M ${n - r * 0.6} ${o + r} L ${n} ${o} L ${n + r * 0.6} ${o + r} Z" />
    ${t ? "" : $`<text class="valve-tag" x=${n + r * 0.5} y=${o - r * 0.75}>${l ? "B" : "A"}</text>`}
  `;
}
function ln(a) {
  const { w: t, h: e } = a, s = a.num("flow_temp"), i = a.num("return_temp"), n = a.num("room_temp"), o = s !== void 0 && n !== void 0 ? s - n > 6 : !1, r = 9, l = (t - 16) / r, p = `rg-${a.c.id}`;
  return $`
    <defs><linearGradient id=${p} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color=${Y(s, "#8b949e")} stop-opacity=${o ? 0.85 : 0.25} />
      <stop offset="1" stop-color=${Y(i, "#8b949e")} stop-opacity=${o ? 0.6 : 0.2} />
    </linearGradient></defs>
    ${o ? [0.25, 0.5, 0.75].map(
    (d, h) => $`<path class="heat-wave" style="animation-delay:${h * 0.6}s" d="M ${t * d} ${e * 0.12} q 5 -6 0 -12 q -5 -6 0 -12" />`
  ) : ""}
    <rect class="rad-frame" x="4" y=${e * 0.18} width=${t - 8} height=${e * 0.72} rx="6" />
    ${Array.from({ length: r }, (d, h) => $`<rect x=${8 + h * l + 1} y=${e * 0.22} width=${l - 3} height=${e * 0.64} rx=${(l - 3) / 2} fill="url(#${p})" class="fin" />`)}
  `;
}
function cn(a) {
  const { w: t, h: e } = a, s = a.num("flow_temp"), i = Y(s, "#8b949e");
  let n = `M 10 ${e * 0.25}`;
  const o = 5;
  for (let r = 0; r < o; r++)
    n += r % 2 === 0 ? ` H ${t - 12} q 6 0 6 ${e * 0.3 / o} q 0 ${e * 0.3 / o} -6 ${e * 0.3 / o}` : ` H 16 q -6 0 -6 ${e * 0.3 / o} q 0 ${e * 0.3 / o} 6 ${e * 0.3 / o}`;
  return $`
    <rect class="floor-slab" x="2" y=${e * 0.15} width=${t - 4} height=${e * 0.75} rx="6" />
    <path d=${n} fill="none" stroke=${i} stroke-width="3" stroke-linecap="round" opacity="0.9" />
  `;
}
function pn(a) {
  const { w: t, h: e, flags: s } = a, i = s.has("flowing");
  return $`
    <path class="tap-body" d="M ${t} ${e * 0.25} H ${t * 0.45} a ${t * 0.25} ${t * 0.25} 0 0 0 ${-t * 0.25} ${t * 0.25} V ${e * 0.62} h ${t * 0.16} V ${e * 0.52} a ${t * 0.1} ${t * 0.1} 0 0 1 ${t * 0.1} ${-t * 0.1} H ${t} Z" />
    <rect class="tap-handle" x=${t * 0.46} y=${e * 0.06} width=${t * 0.26} height=${e * 0.12} rx="3" />
    ${i ? [0, 1, 2].map((n) => $`<circle class="drop" style="animation-delay:${n * 0.25}s" cx=${t * 0.28} cy=${e * 0.7} r="2.5" />`) : ""}
  `;
}
function dn(a) {
  const { w: t, h: e } = a;
  return $`
    <rect class="casing" x="0" y=${e * 0.2} width=${t} height=${e * 0.6} rx="5" />
    <text class="tag" x=${t * 0.45} y=${e * 0.62} text-anchor="middle">KW</text>
  `;
}
function hn(a) {
  const { w: t, h: e, c: s } = a;
  return s.props.filter ? $`
      <rect class="casing" x=${t * 0.15} y=${e * 0.1} width=${t * 0.7} height=${e * 0.8} rx="5" />
      ${[0.3, 0.45, 0.6, 0.75].map((i) => $`<line class="sieve" x1=${t * 0.25} x2=${t * 0.75} y1=${e * i} y2=${e * i} />`)}
      ${[0.35, 0.5, 0.65].map((i) => $`<line class="sieve" x1=${t * i} x2=${t * i} y1=${e * 0.22} y2=${e * 0.8} />`)}` : $`
    <rect class="casing" x=${t * 0.2} y="0" width=${t * 0.6} height=${e} rx=${t * 0.3} />
    <path class="magnet" d="M ${t * 0.38} ${e * 0.3} v ${e * 0.25} a ${t * 0.12} ${t * 0.12} 0 0 0 ${t * 0.24} 0 v ${-e * 0.25}" />
  `;
}
function un(a) {
  const { w: t, h: e } = a;
  return $`
    <line class="stem" x1=${t / 2} y1=${e * 0.8} x2=${t / 2} y2=${e} />
    <rect class="vessel" x="0" y="0" width=${t} height=${e * 0.82} rx=${t / 2} />
    <rect class="sheen" x=${t * 0.18} y=${e * 0.08} width=${t * 0.2} height=${e * 0.6} rx=${t * 0.1} />
  `;
}
function mn(a) {
  switch (a.c.type) {
    case "outdoor_unit":
      return Qi(a);
    case "indoor_unit":
      return nn(a, zt(a.c)?.id || "wall_e");
    case "buffer":
      return Ps(a, "buffer");
    case "dhw_tank":
      return Ps(a, "dhw");
    case "pump":
      return rn(a);
    case "valve_3way":
      return Ls(a);
    case "mixer":
      return Ls(a, !0);
    case "radiators":
      return ln(a);
    case "floor_heating":
      return cn(a);
    case "tap":
      return pn(a);
    case "water_inlet":
      return dn(a);
    case "separator":
      return hn(a);
    case "expansion_vessel":
      return un(a);
    case "junction":
      return $`<circle class="junction" r="4" />`;
    default:
      return $``;
  }
}
const Ds = 1, Zt = { l: { x: -1, y: 0 }, r: { x: 1, y: 0 }, t: { x: 0, y: -1 }, b: { x: 0, y: 1 } };
function xe(a) {
  return a === "l" || a === "r";
}
function fn(a, t) {
  const e = t.get(a.from.c), s = t.get(a.to.c);
  if (!e || !s) return null;
  const i = it(e, a.from.p), n = it(s, a.to.p);
  if (!i || !n) return null;
  const o = e.type === "junction" ? 0 : Ds, r = s.type === "junction" ? 0 : Ds, l = { x: i.x, y: i.y }, p = { x: n.x, y: n.y }, d = { x: l.x + Zt[i.dir].x * o, y: l.y + Zt[i.dir].y * o }, h = { x: p.x + Zt[n.dir].x * r, y: p.y + Zt[n.dir].y * r }, u = xe(i.dir), f = [l, d];
  if (a.via?.length) {
    let g = !u;
    for (const [x, k] of [...a.via, [h.x, h.y]]) {
      const y = f[f.length - 1];
      if (y.x !== x && y.y !== k) {
        const S = g ? { x: y.x, y: k } : { x, y: y.y };
        f.push(S);
      }
      g = f[f.length - 1].x === x, f.push({ x, y: k });
    }
    return f.push(p), { pts: Ts(f), horizontalStart: u };
  }
  if (u)
    if (d.y === h.y && a.bend === void 0)
      f.push(h);
    else {
      const g = a.bend ?? (d.x + h.x) / 2;
      xe(n.dir) ? f.push({ x: g, y: d.y }, { x: g, y: h.y }) : a.bend === void 0 ? f.push({ x: h.x, y: d.y }) : f.push({ x: g, y: d.y }, { x: g, y: h.y }), f.push(h);
    }
  else if (d.x === h.x && a.bend === void 0)
    f.push(h);
  else {
    const g = a.bend ?? (d.y + h.y) / 2;
    xe(n.dir) ? a.bend === void 0 ? f.push({ x: d.x, y: h.y }) : f.push({ x: d.x, y: g }, { x: h.x, y: g }) : f.push({ x: d.x, y: g }, { x: h.x, y: g }), f.push(h);
  }
  return f.push(p), { pts: Ts(f), horizontalStart: u };
}
function Ts(a) {
  const t = [];
  for (const e of a) {
    const s = t[t.length - 1];
    if (!(s && s.x === e.x && s.y === e.y)) {
      if (t.length >= 2) {
        const i = t[t.length - 2];
        if (i.x === s.x && s.x === e.x || i.y === s.y && s.y === e.y) {
          t[t.length - 1] = e;
          continue;
        }
      }
      t.push(e);
    }
  }
  return t;
}
function gn(a, t = 8) {
  if (a.length === 0) return "";
  const e = a.map((n) => ({ x: n.x * b, y: n.y * b }));
  let s = `M ${e[0].x} ${e[0].y}`;
  for (let n = 1; n < e.length - 1; n++) {
    const o = e[n - 1], r = e[n], l = e[n + 1], p = Math.hypot(r.x - o.x, r.y - o.y), d = Math.hypot(l.x - r.x, l.y - r.y), h = Math.min(t, p / 2, d / 2), u = r.x - (r.x - o.x) / p * h, f = r.y - (r.y - o.y) / p * h, g = r.x + (l.x - r.x) / d * h, x = r.y + (l.y - r.y) / d * h;
    s += ` L ${u} ${f} Q ${r.x} ${r.y} ${g} ${x}`;
  }
  const i = e[e.length - 1];
  return `${s} L ${i.x} ${i.y}`;
}
function _n(a, t) {
  for (let e = 2; e < a.length - 1; e++) {
    const s = a[e - 1], i = a[e], n = s.x === i.x;
    if (t ? n : !n) return { x: (s.x + i.x) / 2, y: (s.y + i.y) / 2 };
  }
  return null;
}
const ct = 18, et = 88, st = 34, J = 6;
function ke(a, t = 17) {
  return a.length > t ? `${a.slice(0, t - 1)}…` : a;
}
const ee = class ee extends N {
  constructor() {
    super(...arguments), this.icons = /* @__PURE__ */ new Map(), this.edit = !1, this.autoHeight = !1, this.selected = null, this.version = 0, this._view = null, this._drag = null, this._connect = null, this._pointers = /* @__PURE__ */ new Map(), this._gesture = null, this._segments = [], this._pills = [], this._lastMoved = !1, this._structureKey = "", this._onKey = (t) => {
      t.key === "Escape" && this._connect && (this._connect = null);
    };
  }
  /** Does any pipe pass through the given pixel rectangle (with a small margin)? */
  _hitsPipe(t, e, s, i) {
    return this._segments.some((o) => o.x1 <= s + 5 && o.x2 >= t - 5 && o.y1 <= i + 5 && o.y2 >= e - 5);
  }
  connectedCallback() {
    super.connectedCallback(), this._resizeObs = new ResizeObserver(() => this.requestUpdate()), this._resizeObs.observe(this), window.addEventListener("keydown", this._onKey);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._resizeObs?.disconnect(), window.removeEventListener("keydown", this._onKey);
  }
  willUpdate(t) {
    if (t.has("plant") && this.plant) {
      const e = `${this.plant.components.length}:${this.plant.grid.w}x${this.plant.grid.h}`;
      (e !== this._structureKey || !this._view) && (this._structureKey = e, (!this.edit || !this._view) && (this._view = null));
    }
  }
  updated() {
    if (!this.autoHeight || !this.plant) return;
    const t = this._contentBox(), e = this.getBoundingClientRect().width, s = Math.round(Math.max(240, Math.min(window.innerHeight * 0.75, e * t.h / t.w)));
    this.style.height !== `${s}px` && (this.style.height = `${s}px`);
  }
  /** Fit view to content. */
  fit() {
    this._view = null, this.requestUpdate();
  }
  zoom(t) {
    const e = this._view || this._contentBox(), s = e.x + e.w / 2, i = e.y + e.h / 2;
    this._view = { x: s - e.w * t / 2, y: i - e.h * t / 2, w: e.w * t, h: e.h * t };
  }
  // ------------------------------------------------------------- layout
  _comp(t) {
    return this._drag && this._drag.id === t.id ? { ...t, x: this._drag.dx, y: this._drag.dy } : t;
  }
  _shownSlots(t) {
    const e = t.show ?? dt(t).filter((s) => s.show).map((s) => s.key);
    return this.edit ? [] : e.filter((s) => this.src.get(t, s) !== void 0);
  }
  /** Slots shown in the component's value list (not anchored to a pipe or a measuring point). */
  _listSlots(t) {
    const e = new Set(bs(t).filter((s) => s.at || s.pos).map((s) => s.key));
    return this._shownSlots(t).filter((s) => !e.has(s));
  }
  _badgeLayout(t) {
    const e = ys(t);
    if (e === "none" || e === "inside") return [];
    const s = this._listSlots(t);
    if (!s.length) return [];
    const { w: i, h: n } = Lt(t), o = t.x * b, r = t.y * b, l = i * b, p = n * b, d = [];
    if (e === "tank") {
      const h = { temp_top: 0.16, temp_mid: 0.48, temp_bottom: 0.8 }, u = [];
      for (const y of s)
        y in h ? d.push({ slot: y, x: o + 5, y: r + p * h[y] - 11, w: l - 10 }) : u.push(y);
      const g = u.length * (st + J), x = [
        { x: o + l / 2 - et / 2, y: r + p + 26, dy: st + J },
        { x: o + l + 12, y: r + p * 0.35, dy: st + J },
        { x: o - 12 - et, y: r + p * 0.35, dy: st + J }
      ], k = x.find((y) => !this._hitsPipe(y.x, y.y, y.x + et, y.y + g)) || x[0];
      return u.forEach((y, A) => d.push({ slot: y, x: k.x, y: k.y + A * k.dy })), d;
    }
    if (e === "right")
      s.forEach((h, u) => d.push({ slot: h, x: o + l + 12, y: r + 4 + u * (st + J) }));
    else if (e === "left")
      s.forEach((h, u) => d.push({ slot: h, x: o - 12 - et, y: r + 4 + u * (st + J) }));
    else if (e === "above") {
      const h = s.length * (et + J) - J;
      s.forEach(
        (u, f) => d.push({ slot: u, x: o + l / 2 - h / 2 + f * (et + J), y: r - st - 10 })
      );
    } else {
      const h = Math.max(2, Math.floor((l + 40) / (et + J))), u = Math.ceil(s.length / h);
      s.forEach((f, g) => {
        const x = Math.floor(g / h), y = (x === u - 1 ? s.length - x * h : h) * (et + J) - J;
        d.push({
          slot: f,
          x: o + l / 2 - y / 2 + g % h * (et + J),
          y: r + p + 26 + x * (st + J)
        });
      });
    }
    return d;
  }
  _contentBox() {
    let t = 1 / 0, e = 1 / 0, s = -1 / 0, i = -1 / 0;
    const n = (r, l) => {
      t = Math.min(t, r), e = Math.min(e, l), s = Math.max(s, r), i = Math.max(i, l);
    };
    for (const r of this.plant.components) {
      const { w: l, h: p } = Lt(r);
      n(r.x * b - 6, r.y * b - 6), n((r.x + l) * b + 6, (r.y + p) * b + 22);
      for (const d of this._badgeLayout(r))
        n(d.x, d.y), n(d.x + et, d.y + st);
    }
    for (const r of this._pills)
      n(r.x, r.y), n(r.x + r.w, r.y + ct);
    (this.edit || !Number.isFinite(t)) && (n(0, 0), n(this.plant.grid.w * b, this.plant.grid.h * b));
    const o = 24;
    return { x: t - o, y: e - o, w: s - t + 2 * o, h: i - e + 2 * o };
  }
  // -------------------------------------------------------------- render
  render() {
    if (!this.plant) return _;
    const t = this._view || this._contentBox(), e = new Map(this.plant.components.map((o) => [o.id, this._comp(o)])), s = new Map(this.plant.components.map((o) => [o.id, ze(o, this.src)])), i = Ti(this.plant, this.src), n = this.plant.pipes.map((o) => ({ pipe: o, route: fn(o, e) }));
    return this._segments = n.flatMap(
      ({ route: o }) => (o?.pts || []).slice(1).map((r, l) => {
        const p = o.pts[l];
        return { x1: Math.min(p.x, r.x) * b, x2: Math.max(p.x, r.x) * b, y1: Math.min(p.y, r.y) * b, y2: Math.max(p.y, r.y) * b };
      })
    ), this._pills = this.edit ? [] : this._placePills(e, n), m`
      <svg
        class=${this.edit ? "edit" : ""}
        viewBox="${t.x} ${t.y} ${t.w} ${t.h}"
        preserveAspectRatio="xMidYMid meet"
        @pointerdown=${this._onBgDown}
        @pointermove=${this._onMove}
        @pointerup=${this._onUp}
        @pointercancel=${this._onUp}
        @wheel=${this._onWheel}
      >
        ${this.edit ? this._grid() : _}
        <g class="pipes">
          ${n.map(({ pipe: o, route: r }) => {
      if (!r) return _;
      const l = gn(r.pts), p = Di(o, s), d = Y(i.get(o.id), Ci[o.kind] || "#888"), h = this.selected?.kind === "p" && this.selected.id === o.id;
      return $`<g class="pipe ${p ? "active" : ""} ${h ? "selected" : ""}" data-pipe=${o.id}
                @pointerdown=${(u) => this._onPipeDown(u, o.id)}>
              <path class="pipe-hit" d=${l} />
              ${h ? $`<path class="pipe-sel" d=${l} />` : _}
              <path class="pipe-outline" d=${l} />
              ${p ? $`<path class="pipe-halo" d=${l} style="stroke:${d}" />` : _}
              <path class="pipe-base" d=${l} style="stroke:${d}" />
              ${p ? $`<path class="pipe-flow" d=${l} />` : _}
            </g>`;
    })}
        </g>
        <g class="components">
          ${this.plant.components.map((o) => this._component(e.get(o.id), s.get(o.id)))}
        </g>
        <g class="pills">${this._pills.map((o) => this._anchorPill(o))}</g>
        ${this.edit ? this._editOverlays(e, n) : _}
      </svg>
    `;
  }
  _grid() {
    const { w: t, h: e } = this.plant.grid;
    return $`
      <defs><pattern id="cp-grid" width=${b} height=${b} patternUnits="userSpaceOnUse">
        <circle cx="0" cy="0" r="1" class="grid-dot" />
      </pattern></defs>
      <rect class="grid-bg" x="0" y="0" width=${t * b} height=${e * b} fill="url(#cp-grid)" />`;
  }
  _transform(t) {
    const e = { ...K[t.type], ...Mt(t) }, s = t.rot || 0, i = `translate(${t.x * b} ${t.y * b})`;
    return !e.rotatable || s === 0 ? i : s === 90 ? `${i} translate(${e.h * b} 0) rotate(90)` : s === 180 ? `${i} translate(${e.w * b} ${e.h * b}) rotate(180)` : `${i} translate(0 ${e.w * b}) rotate(270)`;
  }
  _component(t, e) {
    const s = { ...K[t.type], ...Mt(t), ports: Gt(t), badges: ys(t) }, { w: i, h: n } = Lt(t), o = (t.type === "value_tile" ? i : s.w) * b, r = (t.type === "value_tile" ? n : s.h) * b, l = (S) => {
      const z = this.src.get(t, S);
      return z?.available && z.num !== null ? z.num : void 0;
    }, p = (S) => {
      const z = this.src.get(t, S);
      return z?.available ? String(z.raw) : void 0;
    }, d = t.icon || this.plant.settings.typeIcons?.[t.type], h = d ? this.icons.get(d) : void 0, u = this.selected?.kind === "c" && this.selected.id === t.id;
    let f;
    t.type === "value_tile" ? f = this._tile(t, o, r) : t.type === "label" ? f = $`<text class="free-label" x="0" y=${b} style="font-size:${t.props.size || 18}px">${t.props.text || t.label}</text>` : h ? f = $`${e.has("running") ? $`<rect class="user-glow pulse" x="-4" y="-4" width=${o + 8} height=${r + 8} rx="10" />` : _}
        <image href=${h.data_url} x="0" y="0" width=${o} height=${r} preserveAspectRatio="xMidYMid meet" />` : f = mn({ c: t, w: o, h: r, flags: e, num: l, text: p });
    const g = !["junction", "label", "value_tile"].includes(t.type), x = s.ports.some((S) => {
      const z = it(t, S.id);
      return z?.dir === "b" && Math.abs(z.x - (t.x + i / 2)) < Math.max(0.6, i * 0.35);
    });
    let k = (t.x + i / 2) * b, y = (t.y + n) * b + (s.badges === "above" ? 16 : 18), A = "middle";
    if (x) {
      const S = Math.min(28, t.label.length) * 7.5;
      y = (t.y + n) * b + 4;
      const z = (t.x + i) * b + 6, E = t.x * b - 6, O = this._hitsPipe(z, y - 12, z + S, y + 3), F = this._hitsPipe(E - S, y - 12, E, y + 3);
      O && !F ? (k = E, A = "end") : (k = z, A = "start");
    }
    return $`
      <g class="comp ${u ? "selected" : ""}" data-id=${t.id}
         @pointerdown=${(S) => this._onCompDown(S, t)}>
        <g transform=${this._transform(t)}>
          ${f}
        </g>
        <rect class="comp-hit" x=${t.x * b - (t.type === "junction" ? 8 : 0)} y=${t.y * b - (t.type === "junction" ? 8 : 0)}
          width=${Math.max(16, i * b)} height=${Math.max(16, n * b)} rx="8" />
        ${u ? $`<rect class="sel-outline" x=${t.x * b - 6} y=${t.y * b - 6} width=${i * b + 12} height=${n * b + 12} rx="10" />` : _}
        ${g ? $`<text class="comp-label" x=${k} y=${y} text-anchor=${A}>${ke(t.label, 28)}</text>` : _}
      </g>
      ${this._badgeLayout(t).map((S) => S.w ? this._pill(t, S.slot, S.x, S.y, S.w) : this._chip(t, S.slot, S.x, S.y))}
    `;
  }
  _chip(t, e, s, i) {
    const n = this.src.get(t, e), o = Dt(t, e), { text: r, unit: l } = mt(n, o), p = t.type === "value_tile" ? e : gt(t.type, e), h = o === "temp" && n?.num !== null && n?.available ? Y(n.num, "#8b949e") : "var(--cp-accent)";
    return $`
      <g class="chip ${n?.available === !1 ? "na" : ""}" @click=${(u) => this._slotClick(u, t, e)}>
        <rect x=${s} y=${i} width=${et} height=${st} rx="8" />
        <rect class="chip-accent" x=${s} y=${i + 7} width="3" height=${st - 14} rx="1.5" style="fill:${h}" />
        <text class="chip-label" x=${s + 10} y=${i + 13}>${ke(p)}</text>
        <text class="chip-value" x=${s + 10} y=${i + 28}>${r}<tspan class="chip-unit" dx="2">${l}</tspan></text>
      </g>`;
  }
  /**
   * Values anchored to a pipe ("at") sit on that pipe; values with a measuring point ("pos")
   * sit at that point. Positions avoid overlapping each other.
   */
  _placePills(t, e) {
    const s = [], i = [...t.values()].filter((o) => !["junction", "label"].includes(o.type)).map((o) => {
      const { w: r, h: l } = Lt(o);
      return { x: o.x * b - 4, y: o.y * b - 4, w: r * b + 8, h: l * b + 26 };
    }), n = (o, r, l, p = !0) => s.every((d) => o + l + 4 <= d.x || o >= d.x + d.w + 4 || r + ct + 3 <= d.y || r >= d.y + ct + 3) && (!p || i.every((d) => o + l <= d.x || o >= d.x + d.w || r + ct <= d.y || r >= d.y + d.h));
    for (const o of t.values()) {
      const r = new Set(this._shownSlots(o));
      for (const l of bs(o)) {
        if (!r.has(l.key) || !l.at && !l.pos) continue;
        const p = this._pillWidth(o, l.key);
        if (l.pos) {
          s.push({ c: o, slot: l.key, x: (o.x + l.pos[0]) * b - p / 2, y: (o.y + l.pos[1]) * b - ct / 2, w: p });
          continue;
        }
        let d = null, h = { c: o.id, p: l.at };
        const u = /* @__PURE__ */ new Set();
        for (let f = 0; f < 4 && h && !d; f++) {
          const g = h, x = e.find(
            ({ pipe: z }) => !u.has(z.id) && (z.from.c === g.c && z.from.p === g.p || z.to.c === g.c && z.to.p === g.p)
          );
          if (h = null, !x?.route) break;
          u.add(x.pipe.id);
          const k = x.pipe.from.c === g.c && x.pipe.from.p === g.p, y = k ? x.route.pts : [...x.route.pts].reverse();
          for (let z = 1; z < y.length && !d; z++) {
            const E = y[z - 1], O = y[z], F = Math.abs(E.x - O.x) + Math.abs(E.y - O.y);
            if (!(F < 1 || E.x === O.x && F < 3))
              for (const M of [0.5, 0.35, 0.65, 0.2, 0.8]) {
                const P = (E.x + (O.x - E.x) * M) * b, B = (E.y + (O.y - E.y) * M) * b;
                if (E.y === O.y && F * b < p + 8) break;
                const H = P - p / 2, L = B - ct / 2;
                if (n(H, L, p)) {
                  d = { x: H, y: L };
                  break;
                }
              }
          }
          const A = k ? x.pipe.to : x.pipe.from, S = t.get(A.c);
          if (!d && S && K[S.type].passive && S.type !== "pump") {
            const z = Gt(S).find((E) => E.id !== A.p && e.some(({ pipe: O }) => !u.has(O.id) && (O.from.c === S.id && O.from.p === E.id || O.to.c === S.id && O.to.p === E.id)));
            z && (h = { c: S.id, p: z.id });
          }
        }
        if (!d) {
          const f = it(o, l.at);
          if (!f) continue;
          d = { x: f.x * b + 6, y: f.y * b + 6 };
        }
        s.push({ c: o, slot: l.key, ...d, w: p });
      }
    }
    return s;
  }
  _pillWidth(t, e) {
    const { text: s, unit: i } = mt(this.src.get(t, e), Dt(t, e));
    return Math.round((vs(t.type, e).length + s.length + i.length) * 6.4 + 22);
  }
  _anchorPill(t) {
    const e = this.src.get(t.c, t.slot), s = Dt(t.c, t.slot), { text: i, unit: n } = mt(e, s), o = s === "temp" && e?.available && e.num !== null ? Y(e.num, "#8b949e") : "var(--cp-accent)";
    return $`
      <g class="apill" @click=${(r) => this._slotClick(r, t.c, t.slot)}>
        <title>${gt(t.c.type, t.slot)}</title>
        <rect x=${t.x} y=${t.y} width=${t.w} height=${ct} rx=${ct / 2} style="stroke:${o}" />
        <text x=${t.x + 8} y=${t.y + 13}><tspan class="apill-label">${vs(t.c.type, t.slot)}</tspan> ${i}<tspan class="chip-unit" dx="1">${n}</tspan></text>
      </g>`;
  }
  /** Compact value-only pill drawn inside a tank at the sensor height. */
  _pill(t, e, s, i, n) {
    const o = this.src.get(t, e), { text: r, unit: l } = mt(o, Dt(t, e));
    return $`
      <g class="pill" @click=${(p) => this._slotClick(p, t, e)}>
        <title>${gt(t.type, e)}</title>
        <rect x=${s} y=${i} width=${n} height="22" rx="11" />
        <text x=${s + n / 2} y=${i + 15.5} text-anchor="middle">${r}<tspan class="chip-unit" dx="1">${l}</tspan></text>
      </g>`;
  }
  _tile(t, e, s) {
    const i = t.props.entries || [];
    return $`
      <rect class="tile" x="0" y="0" width=${e} height=${s} rx="12" />
      <text class="tile-title" x="14" y="22">${t.label}</text>
      ${i.map((n, o) => {
      const r = this.src.get(t, n.slot), { text: l, unit: p } = mt(r, n.kind || "text"), d = 46 + o * 26;
      return $`<g class="tile-row" @click=${(h) => this._slotClick(h, t, n.slot)}>
          <text class="tile-label" x="14" y=${d}>${ke(n.label || n.slot, 22)}</text>
          <text class="tile-value" x=${e - 14} y=${d} text-anchor="end">${l} <tspan class="chip-unit">${p}</tspan></text></g>`;
    })}`;
  }
  _editOverlays(t, e) {
    const s = [];
    for (const n of t.values())
      for (const o of Gt(n)) {
        const r = it(n, o.id);
        if (!r) continue;
        const l = this._connect?.c === n.id && this._connect.p === o.id, p = n.type === "junction" ? { l: -7, r: 7, t: 0, b: 0 }[r.dir] ?? 0 : 0, d = n.type === "junction" ? { t: -7, b: 7, l: 0, r: 0 }[r.dir] ?? 0 : 0;
        s.push($`<circle class="port ${l ? "src" : ""} ${this._connect ? "target" : ""}" cx=${r.x * b + p} cy=${r.y * b + d} r=${n.type === "junction" ? 4 : 6}
          @pointerdown=${(h) => this._onPortDown(h, { c: n.id, p: o.id })}><title>${o.id}</title></circle>`);
      }
    let i = _;
    if (this.selected?.kind === "p") {
      const n = e.find((r) => r.pipe.id === this.selected.id)?.route, o = n ? _n(n.pts, n.horizontalStart) : null;
      n && o && (i = $`<rect class="bend-handle ${n.horizontalStart ? "ew" : "ns"}" x=${o.x * b - 7} y=${o.y * b - 7} width="14" height="14" rx="4"
          @pointerdown=${(r) => this._onBendDown(r, this.selected.id, n.horizontalStart)} />`);
    }
    return $`<g class="ports">${s}</g>${i}`;
  }
  // ---------------------------------------------------------- interaction
  _svgPoint(t) {
    const e = this.renderRoot.querySelector("svg"), s = e.createSVGPoint();
    s.x = t.clientX, s.y = t.clientY;
    const i = e.getScreenCTM();
    if (!i) return { x: 0, y: 0 };
    const n = s.matrixTransform(i.inverse());
    return { x: n.x, y: n.y };
  }
  _emit(t, e) {
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  _slotClick(t, e, s) {
    this.edit || this._lastMoved || (t.stopPropagation(), this._emit("cp-slot-click", { component: e, slot: s, x: t.clientX, y: t.clientY }));
  }
  _capture(t) {
    const e = this.renderRoot.querySelector("svg");
    e.hasPointerCapture(t.pointerId) || e.setPointerCapture(t.pointerId);
  }
  _onCompDown(t, e) {
    if (t.button !== 0) return;
    t.stopPropagation(), this._pointers.set(t.pointerId, { x: t.clientX, y: t.clientY });
    const s = this._svgPoint(t);
    this._gesture = {
      type: this.edit ? "move" : "tap",
      id: e.id,
      start: s,
      ox: e.x,
      oy: e.y,
      cx: t.clientX,
      cy: t.clientY,
      moved: !1,
      comp: e,
      view: { ...this._view || this._contentBox() }
    }, this.edit && this._capture(t);
  }
  _onPipeDown(t, e) {
    !this.edit || t.button !== 0 || (t.stopPropagation(), this._emit("cp-select", { kind: "p", id: e }));
  }
  _onPortDown(t, e) {
    if (t.stopPropagation(), !this._connect) {
      this._connect = e, this._emit("cp-hint", c("ed.connecting"));
      return;
    }
    this._connect.c !== e.c && this._emit("cp-connect", { from: this._connect, to: e }), this._connect = null, this._emit("cp-hint", "");
  }
  _onBendDown(t, e, s) {
    t.stopPropagation(), this._gesture = { type: "bend", id: e, horizontalStart: s, moved: !1 }, this._capture(t);
  }
  _onBgDown(t) {
    if (this._pointers.set(t.pointerId, { x: t.clientX, y: t.clientY }), this._pointers.size === 2) {
      const [e, s] = [...this._pointers.values()];
      this._gesture = { type: "pinch", dist: Math.hypot(e.x - s.x, e.y - s.y), view: { ...this._view || this._contentBox() }, moved: !0 }, this._capture(t);
      return;
    }
    this.edit && t.target === t.currentTarget && this._emit("cp-select", null), this.edit && this._connect && (this._connect = null, this._emit("cp-hint", "")), this._gesture = { type: "pan", cx: t.clientX, cy: t.clientY, view: { ...this._view || this._contentBox() }, moved: !1 };
  }
  _onMove(t) {
    this._pointers.has(t.pointerId) && this._pointers.set(t.pointerId, { x: t.clientX, y: t.clientY });
    const e = this._gesture;
    if (e) {
      if (e.type === "pinch" && this._pointers.size === 2) {
        const [s, i] = [...this._pointers.values()], n = e.dist / Math.max(10, Math.hypot(s.x - i.x, s.y - i.y)), o = e.view, r = o.x + o.w / 2, l = o.y + o.h / 2;
        this._view = { x: r - o.w * n / 2, y: l - o.h * n / 2, w: o.w * n, h: o.h * n };
        return;
      }
      if (e.type === "pan") {
        const i = this.renderRoot.querySelector("svg").getBoundingClientRect(), n = Math.max(e.view.w / i.width, e.view.h / i.height), o = (t.clientX - e.cx) * n, r = (t.clientY - e.cy) * n;
        !e.moved && Math.abs(t.clientX - e.cx) + Math.abs(t.clientY - e.cy) > 4 && (e.moved = !0, this._capture(t)), e.moved && (this._view = { ...e.view, x: e.view.x - o, y: e.view.y - r });
        return;
      }
      if (e.type === "move") {
        const s = this._svgPoint(t);
        if (Math.abs(t.clientX - e.cx) + Math.abs(t.clientY - e.cy) > 3 && (e.moved = !0), !e.moved) return;
        const i = Math.max(0, Math.round(e.ox + (s.x - e.start.x) / b)), n = Math.max(0, Math.round(e.oy + (s.y - e.start.y) / b));
        this._drag = { id: e.id, dx: i, dy: n };
        return;
      }
      if (e.type === "tap") {
        Math.abs(t.clientX - e.cx) + Math.abs(t.clientY - e.cy) > 6 && (this._gesture = { type: "pan", cx: e.cx, cy: e.cy, view: e.view, moved: !0 }, this._capture(t), this._onMove(t));
        return;
      }
      if (e.type === "bend") {
        const s = this._svgPoint(t);
        e.moved = !0;
        const i = Math.round((e.horizontalStart ? s.x : s.y) / b);
        this._emit("cp-bend", { id: e.id, bend: i, live: !0 });
      }
    }
  }
  _onUp(t) {
    this._pointers.delete(t.pointerId);
    const e = this._gesture;
    this._pointers.size > 0 && e?.type === "pinch" || (this._gesture = null, this._lastMoved = !!e?.moved, setTimeout(() => this._lastMoved = !1, 0), e && (e.type === "move" ? (e.moved && this._drag ? this._emit("cp-move", { id: e.id, x: this._drag.dx, y: this._drag.dy }) : this._emit("cp-select", { kind: "c", id: e.id }), this._drag = null) : e.type === "tap" && !e.moved ? this._emit("cp-component-click", { component: e.comp, x: t.clientX, y: t.clientY }) : e.type === "bend" && e.moved && this._emit("cp-bend", { id: e.id, live: !1 })));
  }
  _onWheel(t) {
    t.preventDefault();
    const e = this._view || this._contentBox(), s = this._svgPoint(t), i = Math.exp(t.deltaY * 15e-4);
    this._view = { x: s.x - (s.x - e.x) * i, y: s.y - (s.y - e.y) * i, w: e.w * i, h: e.h * i };
  }
};
ee.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  icons: { attribute: !1 },
  edit: { type: Boolean },
  autoHeight: { type: Boolean, attribute: "auto-height" },
  selected: { attribute: !1 },
  version: { type: Number },
  _view: { state: !0 },
  _drag: { state: !0 },
  _connect: { state: !0 }
}, ee.styles = j`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
    }
    svg {
      width: 100%;
      height: 100%;
      display: block;
      font-family: var(--cp-font);
    }
    .grid-dot { fill: var(--cp-grid); }
    .grid-bg { pointer-events: none; }

    /* pipes */
    .pipe path { fill: none; stroke-linecap: round; stroke-linejoin: round; }
    .pipe-hit { stroke: transparent; stroke-width: 18; pointer-events: stroke; }
    .pipe-outline { stroke: var(--cp-pipe-outline); stroke-width: 10; }
    .pipe-base { stroke-width: 6; opacity: 0.38; transition: opacity 0.6s; }
    .pipe.active .pipe-base { opacity: 1; }
    .pipe-halo { stroke-width: 16; opacity: 0.16; }
    .pipe-flow {
      stroke: var(--cp-flow);
      stroke-width: 2.6;
      stroke-dasharray: 2 13;
      animation: cp-flow 0.9s linear infinite;
    }
    .pipe-sel { stroke: var(--cp-select); stroke-width: 18; opacity: 0.35; }
    @keyframes cp-flow { to { stroke-dashoffset: -15; } }

    /* component artwork */
    .comp { cursor: default; }
    svg.edit .comp { cursor: grab; }
    .comp-hit { fill: transparent; }
    .sel-outline { fill: none; stroke: var(--cp-select); stroke-width: 2; stroke-dasharray: 6 4; pointer-events: none; }
    .comp-label {
      fill: var(--cp-text); font-size: 13px; font-weight: 600; letter-spacing: 0.2px; pointer-events: none;
      paint-order: stroke; stroke: var(--cp-surface); stroke-width: 4px; stroke-linejoin: round;
    }
    .casing { fill: var(--cp-casing); stroke: var(--cp-casing-stroke); stroke-width: 1.5; }
    .casing.light { fill: var(--cp-casing-light); }
    .sheen { fill: var(--cp-sheen); pointer-events: none; }
    .foot { fill: var(--cp-casing-stroke); }
    .grille-bg { fill: var(--cp-grille-bg); }
    .grille { fill: none; stroke: var(--cp-grille); stroke-width: 1.4; }
    .fan path { fill: var(--cp-fan); }
    .hub { fill: var(--cp-casing-stroke); }
    .vent { fill: var(--cp-grille); }
    .tag { fill: var(--cp-muted); font-size: 10px; font-weight: 700; letter-spacing: 1px; }
    .frost { fill: rgba(150, 205, 255, 0.28); stroke: rgba(180, 225, 255, 0.8); stroke-width: 2; }
    .snow line, .snow path { stroke: #e8f6ff; stroke-width: 2.2; stroke-linecap: round; fill: none; }
    .alarm-ring { fill: none; stroke: #ff4d4d; stroke-width: 3; animation: cp-pulse 1s ease-in-out infinite; }
    .ground { fill: var(--cp-ground); }
    .probe { fill: none; stroke: var(--cp-muted); stroke-width: 2; }
    .probe.active { stroke: #38d0ff; }
    .screen { fill: var(--cp-screen); }
    .screen-text { fill: #d8f3e8; font-size: 10px; font-weight: 600; }
    .internal { fill: none; stroke-width: 3; opacity: 0.55; }
    .rod { fill: var(--cp-casing); stroke: var(--cp-casing-stroke); }
    .rod.hot { fill: #4a2412; stroke: #ff8a3d; }
    .coil { fill: none; stroke: var(--cp-muted); stroke-width: 2; }
    .coil.hot { stroke: #ffb35c; }
    .aux-glow { fill: rgba(255, 138, 61, 0.22); }
    .insulation { fill: var(--cp-insulation); stroke: var(--cp-casing-stroke); stroke-width: 1; }
    .tank-fill { opacity: 0.92; }
    .tank-glass { fill: rgba(255, 255, 255, 0.18); }
    .tank-coil { fill: none; stroke: rgba(255, 255, 255, 0.55); stroke-width: 2.5; }
    .tank-coil.hot { stroke: #fff; stroke-dasharray: 4 6; animation: cp-flow 1s linear infinite; }
    .strat { stroke: rgba(255, 255, 255, 0.35); stroke-width: 1; stroke-dasharray: 3 4; }
    .tank-label { fill: rgba(255, 255, 255, 0.92); font-size: 12px; font-weight: 700; text-shadow: 0 1px 2px rgba(0,0,0,0.4); }
    .tank-badge { fill: #fff; font-size: 11px; font-weight: 800; }
    .pump-body { fill: var(--cp-casing); stroke: var(--cp-casing-stroke); stroke-width: 1.5; }
    .pump-body.on { stroke: var(--cp-accent); }
    .pump-tri { fill: var(--cp-muted); opacity: 0.5; }
    .pump-tri.on { fill: var(--cp-accent); opacity: 0.9; }
    .pump-glow { fill: var(--cp-accent); opacity: 0.18; }
    .impeller { fill: none; stroke: var(--cp-text); stroke-width: 2; stroke-dasharray: 4 3; opacity: 0.7; }
    .valve-tri { fill: var(--cp-casing); stroke: var(--cp-casing-stroke); stroke-width: 1.4; }
    .valve-tri.on { fill: var(--cp-accent); stroke: var(--cp-accent); opacity: 0.85; }
    .actuator { fill: var(--cp-casing-light); stroke: var(--cp-casing-stroke); }
    .stem { stroke: var(--cp-casing-stroke); stroke-width: 2; }
    .valve-tag {
      fill: var(--cp-accent); font-size: 12px; font-weight: 800;
      paint-order: stroke; stroke: var(--cp-surface); stroke-width: 3px; stroke-linejoin: round;
    }
    .rad-frame { fill: var(--cp-casing); stroke: var(--cp-casing-stroke); }
    .fin { stroke: rgba(255, 255, 255, 0.15); }
    .heat-wave { fill: none; stroke: #ff8a3d; stroke-width: 2; stroke-linecap: round; opacity: 0; animation: cp-rise 2.4s ease-in infinite; }
    .floor-slab { fill: var(--cp-casing); stroke: var(--cp-casing-stroke); }
    .tap-body { fill: var(--cp-casing-light); stroke: var(--cp-casing-stroke); stroke-width: 1.4; }
    .tap-handle { fill: var(--cp-casing-stroke); }
    .drop { fill: #38d0ff; animation: cp-drop 0.75s linear infinite; }
    .magnet { fill: none; stroke: #e5484d; stroke-width: 3; }
    .sieve { stroke: var(--cp-muted); stroke-width: 1; }
    .vessel { fill: #c8343b; stroke: #8e1f25; }
    .junction { fill: var(--cp-text); }
    .user-glow { fill: var(--cp-accent); opacity: 0.12; }
    .free-label { fill: var(--cp-text); font-weight: 700; }
    .tile { fill: var(--cp-chip); stroke: var(--cp-chip-stroke); }
    .tile-title { fill: var(--cp-text); font-size: 13px; font-weight: 700; }
    .tile-label { fill: var(--cp-muted); font-size: 12px; }
    .tile-value { fill: var(--cp-text); font-size: 13px; font-weight: 700; }
    .tile-row { cursor: pointer; }

    /* chips */
    .chip { cursor: pointer; }
    .chip rect:first-child { fill: var(--cp-chip); stroke: var(--cp-chip-stroke); transition: fill 0.2s; }
    .chip:hover rect:first-child { fill: var(--cp-chip-hover); }
    .chip-label { fill: var(--cp-muted); font-size: 9.5px; }
    .chip-value { fill: var(--cp-text); font-size: 14px; font-weight: 700; font-variant-numeric: tabular-nums; }
    .chip-unit { fill: var(--cp-muted); font-size: 10px; font-weight: 500; }
    .chip.na .chip-value { fill: var(--cp-muted); }
    .apill { cursor: pointer; }
    .apill rect { fill: var(--cp-chip); stroke-width: 1.4; }
    .apill text { fill: var(--cp-text); font-size: 11.5px; font-weight: 700; font-variant-numeric: tabular-nums; }
    .apill-label { fill: var(--cp-muted); font-weight: 600; font-size: 10px; }
    .ipipe { fill: none; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; opacity: 0.85; }
    .ipipe-flow { fill: none; stroke: var(--cp-flow); stroke-width: 1.8; stroke-dasharray: 2 9; animation: cp-flow 0.9s linear infinite; }
    .itag { fill: var(--cp-muted); font-size: 8.5px; font-weight: 700; }
    .gauge { fill: var(--cp-casing-light); stroke: var(--cp-casing-stroke); stroke-width: 1.4; }
    .gauge-needle { stroke: #ff5a5f; stroke-width: 1.6; stroke-linecap: round; }
    .tank-in { opacity: 0.55; stroke: var(--cp-casing-stroke); }
    .compressor { fill: var(--cp-casing); stroke: var(--cp-casing-stroke); stroke-width: 1.5; }
    .dip { fill: none; stroke: rgba(255, 255, 255, 0.45); stroke-width: 2.5; stroke-dasharray: 5 4; }
    .pill { cursor: pointer; }
    .pill rect { fill: rgba(10, 14, 20, 0.62); stroke: rgba(255, 255, 255, 0.25); }
    .pill text { fill: #fff; font-size: 12.5px; font-weight: 700; font-variant-numeric: tabular-nums; }
    .pill .chip-unit { fill: rgba(255, 255, 255, 0.75); font-size: 9.5px; }

    /* edit */
    .port { fill: var(--cp-port); stroke: var(--cp-bg); stroke-width: 2; cursor: crosshair; }
    .port:hover, .port.src { fill: var(--cp-select); r: 8; }
    .port.target { fill: var(--cp-accent); }
    .bend-handle { fill: var(--cp-select); stroke: var(--cp-bg); stroke-width: 2; }
    .bend-handle.ew { cursor: ew-resize; }
    .bend-handle.ns { cursor: ns-resize; }

    /* animation helpers */
    /* spinning parts are drawn around their local origin (0,0); rotate exactly there, not around the bbox centre */
    .spin { animation: cp-spin var(--dur, 1.2s) linear infinite; transform-box: view-box; transform-origin: 0 0; }
    .pulse { animation: cp-pulse 2.2s ease-in-out infinite; }
    @keyframes cp-spin { to { transform: rotate(360deg); } }
    @keyframes cp-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }
    @keyframes cp-rise { 0% { opacity: 0; transform: translateY(6px); } 40% { opacity: 0.8; } 100% { opacity: 0; transform: translateY(-10px); } }
    @keyframes cp-drop { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(18px); opacity: 0; } }
    @media (prefers-reduced-motion: reduce) {
      .spin, .pulse, .pipe-flow, .heat-wave, .drop, .tank-coil.hot { animation: none; }
    }
  `;
let Le = ee;
customElements.get("cp-schematic") || customElements.define("cp-schematic", Le);
const se = class se extends N {
  constructor() {
    super(...arguments), this.points = [], this.color = "var(--cp-accent)", this.step = !1;
  }
  render() {
    const t = this.points.filter((f) => f.v !== null);
    if (t.length < 2) return m`<div class="empty">${c("ov.no_history")}</div>`;
    const e = 300, s = 90, i = t[0].t, n = t[t.length - 1].t;
    let o = Math.min(...t.map((f) => f.v)), r = Math.max(...t.map((f) => f.v));
    r - o < 1e-6 && (r += 1, o -= 1);
    const l = (r - o) * 0.1;
    o -= l, r += l;
    const p = (f) => (f - i) / Math.max(1, n - i) * e, d = (f) => s - (f - o) / (r - o) * s;
    let h = `M ${p(t[0].t)} ${d(t[0].v)}`;
    for (let f = 1; f < t.length; f++)
      this.step ? h += ` H ${p(t[f].t)} V ${d(t[f].v)}` : h += ` L ${p(t[f].t)} ${d(t[f].v)}`;
    const u = `${h} L ${e} ${s} L 0 ${s} Z`;
    return m`<svg viewBox="0 0 ${e} ${s}" preserveAspectRatio="none">
      <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color=${this.color} stop-opacity="0.35" /><stop offset="1" stop-color=${this.color} stop-opacity="0" />
      </linearGradient></defs>
      ${$`<path d=${u} fill="url(#sg)" /><path d=${h} fill="none" stroke=${this.color} stroke-width="2" vector-effect="non-scaling-stroke" />`}
    </svg>`;
  }
};
se.properties = { points: { attribute: !1 }, color: {}, step: { type: Boolean } }, se.styles = j`
    :host { display: block; height: 90px; }
    svg { width: 100%; height: 100%; display: block; overflow: visible; }
    .empty { height: 100%; display: grid; place-items: center; color: var(--cp-muted); font-size: 12px; }
  `;
let De = se;
const ie = class ie extends N {
  constructor() {
    super(...arguments), this.slotKey = "", this.x = 0, this.y = 0, this.version = 0, this._hist = null, this._loadedFor = "";
  }
  updated() {
    const t = `${this.component?.id}:${this.slotKey}`;
    t !== this._loadedFor && this.component && (this._loadedFor = t, this._hist = null, this.src.history(this.component, this.slotKey, 24).then(
      (e) => this._hist = e,
      () => this._hist = []
    ));
  }
  _close() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  _more(t) {
    this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: t }, bubbles: !0, composed: !0 })), this._close();
  }
  render() {
    if (!this.component) return _;
    const t = this.component, e = Dt(t, this.slotKey), s = this.src.get(t, this.slotKey), { text: i, unit: n } = mt(s, e), o = this.src.entityOf(t, this.slotKey), r = this._hist || [], l = r.map((g) => g.v).filter((g) => g !== null), p = e === "temp" && s?.num !== null && s?.num !== void 0 ? Y(s.num, "#3ddc97") : "var(--cp-accent)", d = 320, h = Math.max(12, Math.min(window.innerWidth - d - 12, this.x - d / 2)), u = Math.max(12, Math.min(window.innerHeight - 260, this.y + 14)), f = t.type === "value_tile" ? this.slotKey : gt(t.type, this.slotKey);
    return m`
      <div class="backdrop" @pointerdown=${this._close}></div>
      <div class="pop card" style="left:${h}px; top:${u}px; width:${d}px">
        <div class="row head">
          <div>
            <div class="title">${f}</div>
            <div class="muted sub">${t.label}</div>
          </div>
          <span class="spacer"></span>
          <button class="ghost icon" @click=${this._close} aria-label=${c("close")}>${T("close")}</button>
        </div>
        <div class="now"><span class="val">${i}</span><span class="unit">${n}</span></div>
        <div class="muted cap">${c("ov.history24")}</div>
        ${this._hist === null ? m`<div class="loading"></div>` : m`<cp-sparkline .points=${r} .color=${p} .step=${e === "bool"}></cp-sparkline>`}
        ${l.length && e !== "bool" && e !== "enum" ? m`<div class="row stats">
              <span>${c("ov.min")} <b>${V(Math.min(...l))}</b></span>
              <span>${c("ov.max")} <b>${V(Math.max(...l))}</b></span>
            </div>` : _}
        ${o ? m`<div class="row foot"><code>${o}</code><span class="spacer"></span>
              <button @click=${() => this._more(o)}>${c("ov.open_entity")}</button></div>` : _}
      </div>
    `;
  }
};
ie.properties = {
  component: { attribute: !1 },
  slotKey: {},
  src: { attribute: !1 },
  x: { type: Number },
  y: { type: Number },
  version: { type: Number },
  _hist: { state: !0 }
}, ie.styles = [
  Q,
  j`
      .backdrop { position: fixed; inset: 0; z-index: 30; }
      .pop { position: fixed; z-index: 31; box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45); padding: 14px; animation: pop 0.14s ease-out; }
      @keyframes pop { from { opacity: 0; transform: translateY(4px) scale(0.98); } }
      .head { flex-wrap: nowrap; align-items: flex-start; }
      .title { font-weight: 700; font-size: 15px; }
      .sub { font-size: 12px; }
      .now { margin: 8px 0 10px; }
      .val { font-size: 30px; font-weight: 800; font-variant-numeric: tabular-nums; }
      .unit { font-size: 15px; color: var(--cp-muted); margin-left: 4px; }
      .cap { font-size: 11px; margin-bottom: 4px; }
      .stats { gap: 16px; font-size: 12px; color: var(--cp-muted); margin-top: 6px; }
      .stats b { color: var(--cp-text); }
      .foot { margin-top: 10px; font-size: 11px; flex-wrap: nowrap; }
      code { color: var(--cp-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .loading { height: 90px; border-radius: 8px; background: linear-gradient(90deg, var(--cp-surface-2), var(--cp-surface), var(--cp-surface-2)); background-size: 200% 100%; animation: sh 1.2s infinite; }
      @keyframes sh { to { background-position: -200% 0; } }
    `
];
let Te = ie;
const $n = { info: "info", notice: "notice", warning: "warn", error: "error" };
function wn(a) {
  const t = { ...a.params };
  return t.label_sfx = t.label ? ` (${t.label})` : "", c(`msgk.${a.key}`, t);
}
const ne = class ne extends N {
  constructor() {
    super(...arguments), this.messages = [], this.compact = !1, this.canClear = !1, this._filter = "all";
  }
  _row(t) {
    const e = t.end_ts ? t.end_ts - t.ts : null;
    return m`<li class="msg ${t.level} ${t.active ? "active" : ""}">
      <span class="lv">${T($n[t.level] || "info")}</span>
      <div class="body">
        <div class="text">${wn(t)}</div>
        <div class="meta">
          ${bi(t.ts)}
          ${t.active ? m` · <b>${c("msg.active")}</b>` : e !== null ? m` · ${c("msg.duration", { duration: xi(e) })}` : _}
        </div>
      </div>
    </li>`;
  }
  render() {
    const t = [...this.messages].sort((n, o) => o.ts - n.ts), e = this._filter === "all" ? t : t.filter((n) => n.level === this._filter), s = e.filter((n) => n.active), i = e.filter((n) => !n.active).slice(0, this.compact ? 12 : 300);
    return m`
      ${this.compact ? _ : m`<div class="row filters">
            ${["all", "error", "warning", "notice", "info"].map(
      (n) => m`<button class=${this._filter === n ? "primary" : ""} @click=${() => this._filter = n}>
                ${c(n === "all" ? "msg.filter_all" : `msg.level.${n}`)}</button>`
    )}
            <span class="spacer"></span>
            ${this.canClear ? m`<button @click=${() => this.dispatchEvent(new CustomEvent("clear"))}>${T("trash")} ${c("msg.clear")}</button>` : _}
          </div>`}
      ${s.length ? m`<h4>${c("msg.active")}</h4><ul>${s.map((n) => this._row(n))}</ul>` : _}
      <h4>${c("msg.history")}</h4>
      ${i.length ? m`<ul>${i.map((n) => this._row(n))}</ul>` : m`<div class="empty muted">${c("msg.empty")}</div>`}
    `;
  }
};
ne.properties = {
  messages: { attribute: !1 },
  compact: { type: Boolean },
  canClear: { type: Boolean },
  _filter: { state: !0 }
}, ne.styles = [
  Q,
  j`
      :host { display: block; }
      .filters { margin-bottom: 8px; }
      h4 { margin: 12px 0 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.7px; color: var(--cp-muted); }
      ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
      .msg { display: flex; gap: 10px; padding: 9px 10px; border-radius: 11px; background: var(--cp-surface-2); border: 1px solid var(--cp-border); }
      .msg .lv { color: var(--cp-info); display: flex; padding-top: 1px; }
      .msg.notice .lv { color: var(--cp-notice); }
      .msg.warning .lv { color: var(--cp-warn); }
      .msg.error .lv { color: var(--cp-error); }
      .msg.active { border-color: color-mix(in srgb, currentColor 0%, var(--cp-border)); box-shadow: inset 3px 0 0 var(--cp-info); }
      .msg.active.notice { box-shadow: inset 3px 0 0 var(--cp-notice); }
      .msg.active.warning { box-shadow: inset 3px 0 0 var(--cp-warn); }
      .msg.active.error { box-shadow: inset 3px 0 0 var(--cp-error); background: color-mix(in srgb, var(--cp-error) 10%, var(--cp-surface-2)); }
      .text { font-size: 13px; font-weight: 600; line-height: 1.35; }
      .meta { font-size: 11px; color: var(--cp-muted); margin-top: 2px; }
      .empty { font-size: 13px; padding: 8px 2px; }
    `
];
let We = ne;
customElements.get("cp-sparkline") || customElements.define("cp-sparkline", De);
customElements.get("cp-slot-popover") || customElements.define("cp-slot-popover", Te);
customElements.get("cp-messages") || customElements.define("cp-messages", We);
const vn = [1, 10, 60, 300, 900], oe = class oe extends N {
  constructor() {
    super(...arguments), this.icons = /* @__PURE__ */ new Map(), this.messages = [], this.sim = null, this.version = 0, this.narrow = !1, this.showDemo = !0, this.showKpis = !0, this.showSide = !0, this._pop = null, this._side = !0;
  }
  _first(t) {
    return this.plant.components.find((e) => e.type === t);
  }
  _num(t, e) {
    if (!t) return;
    const s = this.src.get(t, e);
    return s?.available && s.num !== null ? s.num : void 0;
  }
  _kpis() {
    const t = this._first("outdoor_unit"), e = this._first("indoor_unit"), s = this._first("dhw_tank"), i = this.plant.components.find((x) => x.type === "radiators" || x.type === "floor_heating"), n = this.plant.components.find((x) => x.type === "valve_3way" && x.props.role === "dhw_switch");
    let o = t ? ts(this.src.get(t, "activity")) : void 0;
    if (!o && t) {
      const x = ze(t, this.src), k = n ? ze(n, this.src) : /* @__PURE__ */ new Set();
      o = x.has("running") ? k.has("b") ? "hot_water" : "heating" : "off";
    }
    const r = {
      heating: "#ff8a3d",
      hot_water: "#ff4f8b",
      defrost: "#6cc4ff",
      compressor_alarm: "#ff5a5f",
      off: "#8a97a6"
    }, l = this._num(t, "heat_power");
    let p = this._num(t, "el_power");
    const d = t ? this.src.get(t, "el_power")?.unit : void 0;
    p !== void 0 && d === "kW" && (p *= 1e3);
    const h = l !== void 0 && p !== void 0 && p > 50 && l > 0.2 ? l / (p / 1e3) : void 0, u = (x, k = 1) => x === void 0 ? "–" : V(x, k), f = Ys(this.plant, this.src), g = [
      { key: "mode", label: c("kpi.mode"), value: o ? c(`mode.${o}`) : "–", unit: "", color: r[o || "off"] },
      { key: "out", label: c("kpi.outdoor"), value: u(this._num(t, "outdoor_temp")), unit: "°C", comp: t, slot: "outdoor_temp" },
      { key: "heat", label: c("kpi.heat"), value: u(l), unit: "kW", comp: t, slot: "heat_power" },
      { key: "power", label: c("kpi.power"), value: p === void 0 ? "–" : p >= 1e3 ? V(p / 1e3, 2) : V(p, 0), unit: p !== void 0 && p >= 1e3 ? "kW" : "W", comp: t, slot: "el_power" },
      {
        key: "cop",
        label: c("kpi.cop"),
        value: u(h),
        unit: "",
        color: f ? Ct[f.ampel] : void 0,
        sub: f ? `${c("kpi.target")} ${u(f.expected)}` : void 0
      },
      {
        key: "supply",
        label: c("kpi.supply"),
        value: u(this._num(e, "supply_temp")),
        unit: "°C",
        color: Y(this._num(e, "supply_temp"), ""),
        sub: this._num(e, "target_flow_temp") !== void 0 ? `${c("kpi.target")} ${u(this._num(e, "target_flow_temp"))}` : void 0,
        comp: e,
        slot: "supply_temp"
      }
    ];
    return s && g.push({ key: "dhw", label: c("kpi.dhw"), value: u(this._num(s, "temp_top")), unit: "°C", color: Y(this._num(s, "temp_top"), ""), comp: s, slot: "temp_top" }), i && this._num(i, "room_temp") !== void 0 && g.push({ key: "room", label: c("kpi.room"), value: u(this._num(i, "room_temp")), unit: "°C", comp: i, slot: "room_temp" }), g;
  }
  _openPop(t) {
    this._pop = t.detail;
  }
  _scenario(t) {
    this.dispatchEvent(new CustomEvent("scenario", { detail: t, bubbles: !0, composed: !0 }));
  }
  _demoBar() {
    const t = this.sim;
    if (!t || !this.showDemo) return _;
    const e = ["winter", "transition", "shower", "defrost", "dim14a", "pv", "disinfect", "fault", "reset"], s = { dim14a: t.dim14a, pv: t.pv, fault: t.fault, disinfect: t.disinfect };
    return m`<div class="demo">
      <span class="demo-tag">${T("flask")} ${c("demo.active")}</span>
      <span class="clock" title=${c("demo.time")}>${Ks(t.time)}</span>
      <label class="ctl">${c("demo.speed")}
        <select @change=${(i) => t.speed = Number(i.target.value)}>
          ${vn.map((i) => m`<option value=${i} ?selected=${t.speed === i}>${i}×</option>`)}
        </select>
      </label>
      <label class="ctl slider">${c("demo.outdoor")} <b>${V(t.outdoorMean, 0)} °C</b>
        <input type="range" min="-15" max="20" step="1" .value=${String(t.outdoorMean)}
          @input=${(i) => t.outdoorMean = Number(i.target.value)} />
      </label>
      ${this.narrow ? m`<select class="scn-select" @change=${(i) => {
      const n = i.target;
      n.value && this._scenario(n.value), n.value = "";
    }}>
            <option value="">${c("demo.scenarios")} …</option>
            ${e.map((i) => m`<option value=${i}>${s[i] ? "✓ " : ""}${c(`scn.${i}`)}</option>`)}
          </select>` : m`<div class="scn">
            ${e.map(
      (i) => m`<button class=${s[i] ? "primary" : ""} @click=${() => this._scenario(i)}>${c(`scn.${i}`)}</button>`
    )}
          </div>`}
    </div>`;
  }
  render() {
    if (!this.plant) return _;
    const t = this._kpis(), e = this.messages.filter((s) => s.active && (s.level === "warning" || s.level === "error")).length;
    return m`
      ${this._demoBar()}
      ${this.showKpis ? m`<div class="kpis">
        ${t.map(
      (s) => m`<button class="kpi" ?disabled=${!s.comp} @click=${(i) => s.comp && (this._pop = { component: s.comp, slot: s.slot, x: i.clientX, y: i.clientY })}>
            <span class="k-label">${s.label}</span>
            <span class="k-value" style=${s.color ? `color:${s.color}` : ""}>${s.value}<small>${s.unit}</small></span>
            ${s.sub ? m`<span class="k-sub">${s.sub}</span>` : _}
          </button>`
    )}
      </div>` : _}
      <div class="main ${this._side && this.showSide ? "with-side" : ""}">
        <div class="stage card">
          <cp-schematic
            ?auto-height=${this.narrow}
            .plant=${this.plant}
            .src=${this.src}
            .icons=${this.icons}
            .version=${this.version}
            @cp-slot-click=${this._openPop}
          ></cp-schematic>
          <div class="zoom">
            <button class="icon" title=${c("zoom_in")} @click=${() => this._sch()?.zoom(0.8)}>${T("plus")}</button>
            <button class="icon" title=${c("zoom_out")} @click=${() => this._sch()?.zoom(1.25)}>${T("minus")}</button>
            <button class="icon" title=${c("fit")} @click=${() => this._sch()?.fit()}>${T("fit")}</button>
            ${this.narrow || !this.showSide ? _ : m`<button class="icon" title=${c("msg.title")} @click=${() => this._side = !this._side}>
                  ${T("bell")}${e ? m`<span class="badge">${e}</span>` : _}</button>`}
          </div>
        </div>
        ${this.showSide && (this._side || this.narrow) ? m`<aside class="side card">
              <div class="side-head"><b>${c("msg.title")}</b></div>
              <cp-messages compact .messages=${this.messages}></cp-messages>
            </aside>` : _}
      </div>
      ${this._pop ? m`<cp-slot-popover
            .component=${this._pop.component}
            .slotKey=${this._pop.slot}
            .src=${this.src}
            .x=${this._pop.x}
            .y=${this._pop.y}
            .version=${this.version}
            @close=${() => this._pop = null}
          ></cp-slot-popover>` : _}
    `;
  }
  _sch() {
    return this.renderRoot.querySelector("cp-schematic");
  }
};
oe.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  icons: { attribute: !1 },
  messages: { attribute: !1 },
  sim: { attribute: !1 },
  version: { type: Number },
  narrow: { type: Boolean },
  showDemo: { type: Boolean },
  showKpis: { type: Boolean },
  showSide: { type: Boolean },
  _pop: { state: !0 },
  _side: { state: !0 }
}, oe.styles = [
  Q,
  j`
      :host { display: flex; flex-direction: column; gap: 12px; height: 100%; min-height: 0; }
      .demo {
        display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px;
        padding: 10px 14px; border-radius: var(--cp-radius);
        background: linear-gradient(90deg, color-mix(in srgb, var(--cp-notice) 18%, var(--cp-surface)), var(--cp-surface));
        border: 1px solid color-mix(in srgb, var(--cp-notice) 35%, var(--cp-border));
      }
      .demo-tag { display: inline-flex; gap: 6px; align-items: center; font-weight: 700; color: var(--cp-notice); font-size: 13px; }
      .clock { font-variant-numeric: tabular-nums; font-weight: 700; font-size: 15px; }
      .ctl { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; color: var(--cp-muted); }
      .ctl select { width: auto; padding: 4px 8px; }
      .ctl.slider input { width: 140px; }
      .ctl b { color: var(--cp-text); min-width: 44px; }
      .scn { display: flex; gap: 6px; flex-wrap: wrap; }
      .scn button { padding: 5px 10px; font-size: 12px; }
      .kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(118px, 1fr)); gap: 10px; }
      .kpi {
        display: grid; gap: 2px; justify-items: start; text-align: left;
        background: var(--cp-surface); border: 1px solid var(--cp-border); border-radius: var(--cp-radius);
        padding: 10px 14px; cursor: pointer;
      }
      .kpi:disabled { cursor: default; opacity: 1; }
      .k-label { font-size: 11px; color: var(--cp-muted); text-transform: uppercase; letter-spacing: 0.6px; font-weight: 600; }
      .k-value { font-size: 22px; font-weight: 800; font-variant-numeric: tabular-nums; white-space: nowrap; }
      .k-value small { font-size: 12px; color: var(--cp-muted); font-weight: 600; margin-left: 3px; }
      .k-sub { font-size: 11px; color: var(--cp-muted); }
      .main { flex: 1; min-height: 0; display: grid; grid-template-columns: 1fr; grid-template-rows: minmax(0, 1fr); gap: 12px; }
      .main.with-side { grid-template-columns: 1fr 320px; }
      .stage { position: relative; padding: 0; overflow: hidden; min-height: 360px;
        background: radial-gradient(1200px 600px at 30% 0%, color-mix(in srgb, var(--cp-accent) 6%, transparent), transparent), var(--cp-surface); }
      cp-schematic { position: absolute; inset: 0; }
      .zoom { position: absolute; right: 10px; bottom: 10px; display: flex; gap: 6px; }
      .zoom button { background: var(--cp-chip); backdrop-filter: blur(6px); position: relative; }
      .zoom .badge { position: absolute; top: -6px; right: -6px; }
      .side { overflow: auto; padding: 12px 14px; min-height: 0; }
      .side-head { font-size: 14px; margin-bottom: 4px; }
      @media (max-width: 900px) {
        :host { height: auto; }
        .main, .main.with-side { grid-template-columns: 1fr; grid-template-rows: auto; flex: none; }
        .stage { min-height: 0; }
        cp-schematic { position: relative; inset: auto; }
        .scn-select { width: auto; flex: 1; min-width: 160px; }
        .demo { gap: 8px 10px; padding: 8px 10px; }
        .side { max-height: none; }
        .kpis { grid-template-columns: repeat(auto-fit, minmax(96px, 1fr)); gap: 8px; }
        .kpi { padding: 8px 10px; }
        .k-value { font-size: 18px; }
        .ctl.slider input { width: 110px; }
      }
    `
];
let Ce = oe;
customElements.get("cp-overview") || customElements.define("cp-overview", Ce);
const yn = [
  "outdoor_unit",
  "indoor_unit",
  "buffer",
  "dhw_tank",
  "pump",
  "valve_3way",
  "mixer",
  "radiators",
  "floor_heating",
  "tap",
  "water_inlet",
  "separator",
  "expansion_vessel",
  "junction",
  "value_tile",
  "label"
], bn = ["supply", "return", "dhw_hot", "dhw_cold", "circulation"], Se = {
  pump: ["running", "!running"],
  mixer: ["running"],
  valve_3way: ["a", "b"],
  outdoor_unit: ["running", "defrost", "!defrost"],
  indoor_unit: ["running", "a", "b", "aux", "pc1"],
  tap: ["flowing"],
  dhw_tank: ["charging"]
};
function yt(a) {
  return JSON.parse(JSON.stringify(a));
}
const xt = class xt extends N {
  constructor() {
    super(...arguments), this.value = "", this.placeholder = "", this._listId = `cp-ents-${xt._uid++}`;
  }
  _change(t) {
    const e = t.target.value.trim();
    this.value = e, this.dispatchEvent(new CustomEvent("value-changed", { detail: e }));
  }
  render() {
    const t = this.hass ? Object.keys(this.hass.states).sort() : [];
    return m`<input
        list=${this._listId}
        .value=${this.value || ""}
        placeholder=${this.placeholder || c("ed.entity_search")}
        @change=${this._change}
      />
      <datalist id=${this._listId}>
        ${t.map((e) => m`<option value=${e}>${this.hass.states[e].attributes.friendly_name || ""}</option>`)}
      </datalist>`;
  }
};
xt.properties = { hass: { attribute: !1 }, value: {}, placeholder: {} }, xt._uid = 0, xt.styles = [Q, j`:host { display: block; min-width: 0; } input { font-size: 12px; padding: 6px 8px; }`];
let Oe = xt;
customElements.get("cp-entity-picker") || customElements.define("cp-entity-picker", Oe);
const ae = class ae extends N {
  constructor() {
    super(...arguments), this.icons = /* @__PURE__ */ new Map(), this.version = 0, this._sel = null, this._hint = "", this._dirty = !1, this._undo = [], this._redo = [], this._onKey = (t) => {
      const e = t.composedPath()[0]?.tagName;
      e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || ((t.key === "Delete" || t.key === "Backspace") && this._sel ? (t.preventDefault(), this._delete()) : (t.ctrlKey || t.metaKey) && t.key.toLowerCase() === "z" ? (t.preventDefault(), t.shiftKey ? this._doRedo() : this._doUndo()) : t.key.toLowerCase() === "r" && this._sel?.kind === "c" && this._rotate());
    };
  }
  willUpdate() {
    this.plant && this.plant !== this._source && (this._source = this.plant, this._draft = yt(this.plant), this._undo = [], this._redo = [], this._dirty = !1, this._sel = null);
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._onKey);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("keydown", this._onKey);
  }
  // ---------------------------------------------------------- mutations
  _commit(t, e = !0) {
    e && (this._undo.push(JSON.stringify(this._draft)), this._undo.length > 80 && this._undo.shift(), this._redo = []);
    const s = yt(this._draft);
    t(s), this._draft = s, this._dirty = !0;
  }
  _doUndo() {
    const t = this._undo.pop();
    t && (this._redo.push(JSON.stringify(this._draft)), this._draft = JSON.parse(t), this._dirty = !0);
  }
  _doRedo() {
    const t = this._redo.pop();
    t && (this._undo.push(JSON.stringify(this._draft)), this._draft = JSON.parse(t), this._dirty = !0);
  }
  _comp(t) {
    return this._draft.components.find((e) => e.id === (t ?? this._sel?.id));
  }
  _pipe(t) {
    return this._draft.pipes.find((e) => e.id === (t ?? this._sel?.id));
  }
  _newId(t) {
    const e = /* @__PURE__ */ new Set([...this._draft.components.map((i) => i.id), ...this._draft.pipes.map((i) => i.id)]);
    let s = 1;
    for (; e.has(`${t}${s}`); ) s++;
    return `${t}${s}`;
  }
  _add(t) {
    const e = K[t], s = this._newId(`${t}_`), i = {
      id: s,
      type: t,
      label: t === "junction" ? "" : c(`type.${t}`),
      ...this._freeSpot(e.variants ? Mt({ type: t, props: {} }).w : e.w, e.variants ? Mt({ type: t, props: {} }).h : e.h),
      bindings: {},
      props: t === "value_tile" ? { entries: [] } : t === "label" ? { text: c("type.label"), size: 18 } : {}
    };
    t === "pump" && (i.props.role = "other"), this._commit((n) => n.components.push(i)), this._sel = { kind: "c", id: s };
  }
  /** First grid position where a w×h box (plus margin) does not overlap anything. */
  _freeSpot(t, e) {
    const s = this._draft.components.map((n) => ({ c: n, ...Lt(n) })), i = (n, o) => s.every(({ c: r, w: l, h: p }) => n + t + 1 <= r.x || n >= r.x + l + 1 || o + e + 2 <= r.y || o >= r.y + p + 3);
    for (let n = 1; n + e < this._draft.grid.h; n += 2)
      for (let o = 1; o + t < this._draft.grid.w; o += 2) if (i(o, n)) return { x: o, y: n };
    return { x: 1, y: 1 };
  }
  _delete() {
    const t = this._sel;
    t && (this._commit((e) => {
      t.kind === "c" ? (e.components = e.components.filter((s) => s.id !== t.id), e.pipes = e.pipes.filter((s) => s.from.c !== t.id && s.to.c !== t.id), e.pipes.forEach((s) => {
        s.flow = s.flow?.filter((i) => i.c !== t.id), s.flowAny = s.flowAny?.filter((i) => i.c !== t.id);
      })) : e.pipes = e.pipes.filter((s) => s.id !== t.id);
    }), this._sel = null);
  }
  _rotate() {
    const t = this._comp();
    !t || !K[t.type].rotatable || this._commit((e) => {
      const s = e.components.find((i) => i.id === t.id);
      s.rot = ((s.rot || 0) + 90) % 360;
    });
  }
  _duplicate() {
    const t = this._comp();
    if (!t) return;
    const e = this._newId(`${t.type}_`);
    this._commit((s) => s.components.push({ ...yt(t), id: e, x: t.x + 2, y: t.y + 2 })), this._sel = { kind: "c", id: e };
  }
  _connect(t, e) {
    const s = this._comp(t.c), i = this._comp(e.c), n = it(s, t.p), o = it(i, e.p), r = n?.def.kind || o?.def.kind || "supply", l = [], p = [s, i].find((h) => h.type === "pump");
    p && l.push({ c: p.id, s: "running" });
    for (const [h, u] of [
      [s, t],
      [i, e]
    ])
      h.type === "valve_3way" && (u.p === "a" || u.p === "b") && l.push({ c: h.id, s: u.p });
    const d = this._newId("p");
    this._commit((h) => h.pipes.push({ id: d, from: t, to: e, kind: r, flow: l })), this._sel = { kind: "p", id: d };
  }
  _set(t, e = !0) {
    const s = this._sel?.id;
    this._commit((i) => {
      const n = i.components.find((o) => o.id === s);
      n && t(n);
    }, e);
  }
  _setPipe(t, e = !0) {
    const s = this._sel?.id;
    this._commit((i) => {
      const n = i.pipes.find((o) => o.id === s);
      n && t(n);
    }, e);
  }
  _save() {
    this.dispatchEvent(new CustomEvent("save", { detail: yt(this._draft), bubbles: !0, composed: !0 })), this._dirty = !1;
  }
  _discard() {
    this._draft = yt(this.plant), this._undo = [], this._redo = [], this._dirty = !1, this._sel = null;
  }
  // ------------------------------------------------------------ events
  _onBend(t) {
    const { id: e, bend: s, live: i } = t.detail;
    if (i) {
      this._bendStart || (this._bendStart = JSON.stringify(this._draft));
      const n = yt(this._draft), o = n.pipes.find((r) => r.id === e);
      o && (o.bend = s, delete o.via), this._draft = n;
    } else this._bendStart && (this._undo.push(this._bendStart), this._bendStart = void 0, this._dirty = !0);
  }
  // ------------------------------------------------------------ render
  render() {
    if (!this._draft) return _;
    const t = this._sel;
    return m`
      <div class="toolbar">
        <button class="icon" title=${c("undo")} ?disabled=${!this._undo.length} @click=${this._doUndo}>${T("undo")}</button>
        <button class="icon" title=${c("redo")} ?disabled=${!this._redo.length} @click=${this._doRedo}>${T("redo")}</button>
        <button class="icon" title=${c("ed.rotation")} ?disabled=${!(t?.kind === "c" && K[this._comp()?.type || "label"].rotatable)} @click=${this._rotate}>${T("rotate")}</button>
        <button class="icon" title=${c("ed.duplicate")} ?disabled=${t?.kind !== "c"} @click=${this._duplicate}>${T("copy")}</button>
        <button class="icon danger" title=${c("delete")} ?disabled=${!t} @click=${this._delete}>${T("trash")}</button>
        <span class="hint">${this._hint}</span>
        <span class="spacer"></span>
        ${this._dirty ? m`<span class="dirty">${c("unsaved")}</span>
          <button @click=${this._discard}>${c("discard")}</button>` : _}
        <button class="primary" ?disabled=${!this._dirty} @click=${this._save}>${T("save")} ${c("save")}</button>
      </div>
      <div class="layout">
        <aside class="palette card">
          <div class="cap">${c("ed.palette")}</div>
          ${yn.map((e) => m`<button class="pal" @click=${() => this._add(e)}>${T("plus")} ${c(`type.${e}`)}</button>`)}
          <div class="cap">${c("ed.grid")}</div>
          <div class="row grid-size">
            <input type="number" min="20" max="200" .value=${String(this._draft.grid.w)} @change=${(e) => this._commit((s) => s.grid.w = Number(e.target.value) || s.grid.w)} />
            ×
            <input type="number" min="20" max="200" .value=${String(this._draft.grid.h)} @change=${(e) => this._commit((s) => s.grid.h = Number(e.target.value) || s.grid.h)} />
          </div>
        </aside>
        <div class="canvas card">
          <cp-schematic
            edit
            .plant=${this._draft}
            .src=${this.src}
            .icons=${this.icons}
            .selected=${t}
            .version=${this.version}
            @cp-select=${(e) => this._sel = e.detail}
            @cp-move=${(e) => this._commit((s) => {
      const i = s.components.find((n) => n.id === e.detail.id);
      i && (i.x = e.detail.x, i.y = e.detail.y);
    })}
            @cp-connect=${(e) => this._connect(e.detail.from, e.detail.to)}
            @cp-bend=${this._onBend}
            @cp-hint=${(e) => this._hint = e.detail}
          ></cp-schematic>
        </div>
        <aside class="props card">${t?.kind === "c" ? this._compProps() : t?.kind === "p" ? this._pipeProps() : m`<p class="muted">${c("ed.nothing")}</p>`}</aside>
      </div>
    `;
  }
  _num(t, e, s, i = 1) {
    return m`<label class="field">${t}<input type="number" step=${i} .value=${e ?? ""} @change=${(n) => s(Number(n.target.value))} /></label>`;
  }
  _compProps() {
    const t = this._comp();
    if (!t) return _;
    const e = K[t.type], s = new Set(t.show ?? dt(t).filter((n) => n.show).map((n) => n.key)), i = [...this.icons.values()];
    return m`
      <div class="ptitle">${c(`type.${t.type}`)} <code>${t.id}</code></div>
      ${t.type !== "junction" ? m`<label class="field">${c("ed.label")}<input .value=${t.label} @change=${(n) => this._set((o) => o.label = n.target.value)} /></label>` : _}
      ${t.type === "outdoor_unit" ? m`<label class="field">${c("ed.model")}<select @change=${(n) => this._set((o) => o.model = n.target.value)}>
              ${Xt.map((n) => m`<option value=${n.id} ?selected=${n.id === t.model}>${n.label}</option>`)}
            </select></label>
            ${this._num(c("ed.nominal"), t.props.nominal_kw, (n) => this._set((o) => o.props.nominal_kw = n), 0.1)}
            ${this._num(c("ed.cop_ref"), t.props.cop_ref ?? 4.9, (n) => this._set((o) => o.props.cop_ref = n), 0.1)}` : _}
      ${t.type === "indoor_unit" ? m`<label class="field">${c("ed.model")}<select @change=${(n) => this._set((o) => o.model = n.target.value)}>
              ${Je.map((n) => m`<option value=${n.id} ?selected=${n.id === t.model}>${n.label}</option>`)}
            </select></label>
            ${this._num(c("wz.aux_kw"), t.props.aux_kw, (n) => this._set((o) => o.props.aux_kw = n), 1)}
            <div class="cap">${c("ed.input_labels")}</div>
            ${[1, 2, 3, 4].map(
      (n) => m`<label class="field">${c(`slot.input${n}`)}<input .value=${t.props.input_labels?.[`input${n}`] || ""}
                @change=${(o) => this._set((r) => r.props.input_labels = { ...r.props.input_labels || {}, [`input${n}`]: o.target.value })} /></label>`
    )}
            <div class="cap">${c("ed.pressure_limits")}</div>
            <div class="two">
              ${this._num("min", t.props.pressure_min ?? 1, (n) => this._set((o) => o.props.pressure_min = n), 0.1)}
              ${this._num("max", t.props.pressure_max ?? 2.7, (n) => this._set((o) => o.props.pressure_max = n), 0.1)}
            </div>` : _}
      ${t.type === "buffer" || t.type === "dhw_tank" ? this._num(c("ed.volume"), t.props.volume, (n) => this._set((o) => o.props.volume = n)) : _}
      ${e.roles ? m`<label class="field">${c("ed.role")}<select @change=${(n) => this._set((o) => o.props.role = n.target.value)}>
            ${e.roles.map((n) => m`<option value=${n} ?selected=${t.props.role === n}>${c(`role.${n}`)}</option>`)}
          </select></label>` : _}
      ${["radiators", "floor_heating", "mixer", "pump"].includes(t.type) ? this._num(c("ed.circuit"), t.props.circuit ?? 1, (n) => this._set((o) => o.props.circuit = n)) : _}
      ${t.type === "dhw_tank" ? this._num(c("ed.dhw_circuit"), t.props.dhw_circuit ?? 1, (n) => this._set((o) => o.props.dhw_circuit = n)) : _}
      ${t.type === "label" ? m`<label class="field">${c("ed.text")}<input .value=${t.props.text || ""} @change=${(n) => this._set((o) => o.props.text = n.target.value)} /></label>
            ${this._num("px", t.props.size || 18, (n) => this._set((o) => o.props.size = n))}` : _}
      ${e.rotatable ? m`<label class="field">${c("ed.rotation")}<select @change=${(n) => this._set((o) => o.rot = Number(n.target.value))}>
            ${[0, 90, 180, 270].map((n) => m`<option value=${n} ?selected=${(t.rot || 0) === n}>${n}°</option>`)}
          </select></label>` : _}
      ${["junction", "label", "value_tile"].includes(t.type) ? _ : m`<label class="field">${c("ed.icon")}<select @change=${(n) => this._set((o) => {
      const r = n.target.value;
      r ? o.icon = r : delete o.icon;
    })}>
            <option value="">${c("ed.icon_default")}</option>
            ${i.map((n) => m`<option value=${n.id} ?selected=${n.id === t.icon}>${n.name}</option>`)}
          </select></label>`}
      ${t.type === "value_tile" ? this._tileEntries(t) : this._bindings(t, s)}
    `;
  }
  _bindings(t, e) {
    const s = dt(t);
    return s.length ? m`<div class="cap">${c("ed.bindings")}</div>
      <div class="bindings">
        ${s.map((i) => {
      const n = this.src.get(t, i.key), { text: o, unit: r } = mt(n, i.kind);
      return m`<div class="bind">
            <div class="bhead">
              <label class="show" title=${c("ed.show")}><input type="checkbox" .checked=${e.has(i.key)}
                @change=${(l) => this._set((p) => {
        const d = new Set(p.show ?? dt(p).filter((h) => h.show).map((h) => h.key));
        l.target.checked ? d.add(i.key) : d.delete(i.key), p.show = dt(p).map((h) => h.key).filter((h) => d.has(h));
      })} /></label>
              <span class="bname">${gt(t.type, i.key)}</span>
              <span class="bval">${n ? `${o} ${r}` : ""}</span>
            </div>
            <cp-entity-picker .hass=${this.hass} .value=${t.bindings[i.key] || ""}
              @value-changed=${(l) => this._set((p) => {
        l.detail ? p.bindings[i.key] = l.detail : delete p.bindings[i.key];
      })}></cp-entity-picker>
          </div>`;
    })}
      </div>` : _;
  }
  _tileEntries(t) {
    const e = t.props.entries || [], s = ["temp", "power_kw", "power_w", "energy", "percent", "pressure", "flow", "count", "bool", "text"];
    return m`<div class="cap">${c("ed.entries")}</div>
      ${e.map(
      (i, n) => m`<div class="bind">
          <div class="two">
            <input .value=${i.label || ""} placeholder=${c("ed.label")} @change=${(o) => this._set((r) => r.props.entries[n].label = o.target.value)} />
            <select @change=${(o) => this._set((r) => r.props.entries[n].kind = o.target.value)}>
              ${s.map((o) => m`<option value=${o} ?selected=${i.kind === o}>${o}</option>`)}
            </select>
          </div>
          <div class="row nowrap">
            <cp-entity-picker .hass=${this.hass} .value=${i.entity || ""}
              @value-changed=${(o) => this._set((r) => r.props.entries[n].entity = o.detail)}></cp-entity-picker>
            <button class="icon danger" @click=${() => this._set((o) => o.props.entries.splice(n, 1))}>${T("trash")}</button>
          </div>
        </div>`
    )}
      <button @click=${() => this._set((i) => {
      i.props.entries = [...i.props.entries || [], { slot: `v${Date.now().toString(36)}`, label: "", entity: "", kind: "text" }];
    })}>${T("plus")} ${c("ed.add_entry")}</button>`;
  }
  _conds(t, e) {
    const s = this._draft.components.filter((i) => Se[i.type]);
    return m`${(t || []).map(
      (i, n) => m`<div class="row nowrap cond">
          <select @change=${(o) => this._setPipe((r) => r[e][n].c = o.target.value)}>
            ${s.map((o) => m`<option value=${o.id} ?selected=${o.id === i.c}>${o.label || o.id}</option>`)}
          </select>
          <select @change=${(o) => this._setPipe((r) => r[e][n].s = o.target.value)}>
            ${(Se[this._comp(i.c)?.type || "pump"] || []).map(
        (o) => m`<option value=${o} ?selected=${o === i.s}>${o.startsWith("!") ? `${c("ed.not")} ${c(`state.${o.slice(1)}`)}` : c(`state.${o}`)}</option>`
      )}
          </select>
          <button class="icon danger" @click=${() => this._setPipe((o) => o[e].splice(n, 1))}>${T("close")}</button>
        </div>`
    )}
      <button ?disabled=${!s.length} @click=${() => this._setPipe((i) => {
      const n = s[0];
      i[e] = [...i[e] || [], { c: n.id, s: Se[n.type][0] }];
    })}>${T("plus")} ${c("ed.add_cond")}</button>`;
  }
  _pipeProps() {
    const t = this._pipe();
    if (!t) return _;
    const e = (s) => this._comp(s)?.label || s;
    return m`
      <div class="ptitle">${c("ed.pipe")} <code>${t.id}</code></div>
      <p class="muted small">${e(t.from.c)} · ${t.from.p} → ${e(t.to.c)} · ${t.to.p}</p>
      <label class="field">${c("ed.kind")}<select @change=${(s) => this._setPipe((i) => i.kind = s.target.value)}>
        ${bn.map((s) => m`<option value=${s} ?selected=${s === t.kind}>${c(`kind.${s}`)}</option>`)}
      </select></label>
      <div class="cap">${c("ed.flow_when")}</div>
      ${this._conds(t.flow, "flow")}
      <div class="cap">${c("ed.or")}</div>
      ${this._conds(t.flowAny, "flowAny")}
      <div class="cap">${c("ed.bindings")}</div>
      <label class="field">${c("ed.temp_entity")}
        <cp-entity-picker .hass=${this.hass} .value=${t.bindings?.temp || ""}
          @value-changed=${(s) => this._setPipe((i) => i.bindings = { ...i.bindings || {}, temp: s.detail || void 0 })}></cp-entity-picker></label>
      <div class="row" style="margin-top:12px">
        <button ?disabled=${t.bend === void 0 && !t.via} @click=${() => this._setPipe((s) => {
      delete s.bend, delete s.via;
    })}>${c("ed.reset_bend")}</button>
      </div>
    `;
  }
};
ae.properties = {
  plant: { attribute: !1 },
  hass: { attribute: !1 },
  src: { attribute: !1 },
  icons: { attribute: !1 },
  version: { type: Number },
  _draft: { state: !0 },
  _sel: { state: !0 },
  _hint: { state: !0 },
  _dirty: { state: !0 }
}, ae.styles = [
  Q,
  j`
      :host { display: flex; flex-direction: column; gap: 10px; height: 100%; min-height: 0; }
      .toolbar { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
      .hint { font-size: 12px; color: var(--cp-select); margin-left: 6px; }
      .dirty { font-size: 12px; color: var(--cp-warn); }
      .layout { flex: 1; min-height: 0; display: grid; grid-template-columns: 190px 1fr 330px; gap: 10px; }
      .palette, .props { overflow: auto; padding: 12px; }
      .palette { display: flex; flex-direction: column; gap: 4px; }
      .pal { justify-content: flex-start; font-size: 12px; padding: 6px 8px; background: transparent; }
      .cap { font-size: 11px; text-transform: uppercase; letter-spacing: 0.6px; color: var(--cp-muted); margin: 14px 0 6px; font-weight: 700; }
      .palette .cap:first-child { margin-top: 0; }
      .grid-size { flex-wrap: nowrap; color: var(--cp-muted); }
      .grid-size input { width: 64px; }
      .canvas { position: relative; padding: 0; overflow: hidden; min-height: 420px; }
      cp-schematic { position: absolute; inset: 0; }
      .props { display: flex; flex-direction: column; gap: 10px; }
      .ptitle { font-weight: 800; font-size: 15px; }
      code { font-size: 11px; color: var(--cp-muted); font-weight: 500; }
      .small { font-size: 12px; margin: 0; }
      .two { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
      .bindings { display: grid; gap: 8px; }
      .bind { display: grid; gap: 4px; padding: 8px; border-radius: 10px; background: var(--cp-surface-2); }
      .bhead { display: flex; gap: 6px; align-items: center; font-size: 12px; }
      .bname { font-weight: 600; flex: 1; }
      .bval { color: var(--cp-muted); font-variant-numeric: tabular-nums; }
      .nowrap { flex-wrap: nowrap; }
      .cond select { font-size: 12px; padding: 6px; }
      @media (max-width: 1100px) {
        .layout { grid-template-columns: 1fr; grid-template-rows: 60vh auto auto; }
        .palette { flex-direction: row; flex-wrap: wrap; order: 2; }
        .palette .cap { width: 100%; }
        .props { order: 3; }
      }
    `
];
let He = ae;
customElements.get("cp-editor") || customElements.define("cp-editor", He);
function _t(a, t, e) {
  a.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
}
const re = class re extends N {
  constructor() {
    super(...arguments), this.plant = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._cfg = structuredClone(this.plant?.settings?.wizard || Ee());
  }
  _upd(t) {
    this._cfg = { ...this._cfg, ...t };
  }
  _generate() {
    this.plant && !confirm(c("wz.replace_confirm")) || _t(this, "plant-generated", es(this._cfg, this.plant));
  }
  render() {
    const t = this._cfg, e = (s, i = "text") => m`<input type=${i} .value=${String(t[s] ?? "")}
      @change=${(n) => {
      const o = n.target.value;
      this._upd({ [s]: i === "number" ? Number(o) : o });
    }} />`;
    return m`
      <div class="card wrap">
        <h2>${c("wz.title")}</h2>
        <p class="muted">${c("wz.intro")}</p>
        <label class="field">${c("wz.name")} ${e("name")}</label>

        <h3>${c("wz.hp")}</h3>
        <div class="grid">
          <label class="field">${c("wz.outdoor")}
            <select @change=${(s) => this._upd({ outdoorModel: s.target.value })}>
              ${Xt.map((s) => m`<option value=${s.id} ?selected=${s.id === t.outdoorModel}>${s.label}</option>`)}
            </select></label>
          <label class="field">${c("ed.label")} ${e("outdoorLabel")}</label>
          <label class="field">${c("ed.nominal")} ${e("nominalKw", "number")}</label>
          <label class="field">${c("wz.indoor")}
            <select @change=${(s) => this._upd({ indoorModel: s.target.value })}>
              ${Je.map((s) => m`<option value=${s.id} ?selected=${s.id === t.indoorModel}>${s.label}</option>`)}
            </select></label>
          <label class="field">${c("ed.label")} ${e("indoorLabel")}</label>
          <div class="field check">
            <label><input type="checkbox" .checked=${t.aux} @change=${(s) => this._upd({ aux: s.target.checked })} /> ${c("wz.aux")}</label>
            ${t.aux ? m`<label class="field">${c("wz.aux_kw")} ${e("auxKw", "number")}</label>` : _}
          </div>
        </div>

        <h3>${c("wz.buffer")}</h3>
        <div class="grid">
          <div class="radios">
            ${["parallel", "serial", "none"].map(
      (s) => m`<label><input type="radio" name="buf" .checked=${t.buffer === s} @change=${() => this._upd({ buffer: s })} /> ${c(`wz.buffer.${s}`)}</label>`
    )}
          </div>
          ${t.buffer !== "none" ? m`<label class="field">${c("wz.buffer_volume")} ${e("bufferVolume", "number")}</label>
                <label class="field">${c("ed.label")} ${e("bufferLabel")}</label>` : _}
        </div>

        <h3>${c("wz.dhw")}</h3>
        <div class="grid">
          <div class="radios">
            ${["tank", "none"].map(
      (s) => m`<label><input type="radio" name="dhw" .checked=${t.dhw === s} @change=${() => this._upd({ dhw: s })} /> ${c(`wz.dhw.${s}`)}</label>`
    )}
          </div>
          ${t.dhw === "tank" ? m`<label class="field">${c("wz.dhw_volume")} ${e("dhwVolume", "number")}</label>
                <label class="field">${c("ed.label")} ${e("dhwLabel")}</label>
                <label class="check"><input type="checkbox" .checked=${t.circulation} @change=${(s) => this._upd({ circulation: s.target.checked })} /> ${c("wz.circulation")}</label>` : _}
        </div>

        <h3>${c("wz.circuits")}</h3>
        ${t.circuits.map(
      (s, i) => m`<div class="circuit">
            <b>${c("wz.circuit", { n: i + 1 })}</b>
            <input .value=${s.label} @change=${(n) => this._circ(i, { label: n.target.value })} />
            <select @change=${(n) => this._circ(i, { emitter: n.target.value })}>
              <option value="radiators" ?selected=${s.emitter === "radiators"}>${c("type.radiators")}</option>
              <option value="floor_heating" ?selected=${s.emitter === "floor_heating"}>${c("type.floor_heating")}</option>
            </select>
            <label class="check"><input type="checkbox" .checked=${s.mixed} @change=${(n) => this._circ(i, { mixed: n.target.checked })} /> ${c("wz.mixed")}</label>
            <button class="ghost danger" ?disabled=${t.circuits.length < 2} @click=${() => this._upd({ circuits: t.circuits.filter((n, o) => o !== i) })}>${c("wz.remove")}</button>
          </div>`
    )}
        <button ?disabled=${t.circuits.length >= 4} @click=${() => this._upd({ circuits: [...t.circuits, { emitter: "floor_heating", mixed: !0, label: c("wz.circuit", { n: t.circuits.length + 1 }) }] })}>
          ${T("plus")} ${c("wz.add_circuit")}</button>

        <h3>${c("wz.extras")}</h3>
        <div class="radios">
          <label><input type="checkbox" .checked=${t.separator} @change=${(s) => this._upd({ separator: s.target.checked })} /> ${c("wz.separator")}</label>
          <label><input type="checkbox" .checked=${t.expansion} @change=${(s) => this._upd({ expansion: s.target.checked })} /> ${c("wz.expansion")}</label>
        </div>

        <div class="row actions">
          <button @click=${() => this._cfg = Ee()}>${c("wz.example")}</button>
          <span class="spacer"></span>
          <button class="primary" @click=${this._generate}>${T("wand")} ${c("wz.generate")}</button>
        </div>
      </div>
    `;
  }
  _circ(t, e) {
    const s = this._cfg.circuits.map((i, n) => n === t ? { ...i, ...e } : i);
    this._upd({ circuits: s });
  }
};
re.properties = { plant: { attribute: !1 }, _cfg: { state: !0 } }, re.styles = [
  Q,
  j`
      .wrap { max-width: 920px; }
      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; align-items: end; }
      .radios { display: grid; gap: 6px; font-size: 14px; }
      .check { display: flex; gap: 8px; align-items: center; font-size: 14px; color: var(--cp-text); }
      .field.check { display: grid; }
      .circuit { display: grid; grid-template-columns: 110px 1fr 200px auto auto; gap: 8px; align-items: center; margin-bottom: 8px; }
      .actions { margin-top: 22px; }
      @media (max-width: 700px) { .circuit { grid-template-columns: 1fr 1fr; } }
    `
];
let Be = re;
const le = class le extends N {
  constructor() {
    super(...arguments), this._res = null, this._sel = /* @__PURE__ */ new Set(), this._busy = !1, this._msg = "";
  }
  async _scan() {
    this._busy = !0;
    try {
      this._res = await this.api.scan(this.plant), this._sel = new Set(
        this._res.suggestions.filter((t) => !this._comp(t.component_id)?.bindings[t.slot]).map((t) => `${t.component_id}|${t.slot}`)
      );
    } finally {
      this._busy = !1;
    }
  }
  _comp(t) {
    return this.plant.components.find((e) => e.id === t);
  }
  _apply() {
    if (!this._res) return;
    const t = structuredClone(this.plant);
    let e = 0;
    for (const s of this._res.suggestions) {
      if (!this._sel.has(`${s.component_id}|${s.slot}`)) continue;
      const i = t.components.find((n) => n.id === s.component_id);
      i && (i.bindings[s.slot] = s.entity_id, e++);
    }
    _t(this, "save", t), this._msg = c("map.applied", { count: e });
  }
  render() {
    const t = !!this.hass?.__standalone, e = this._res, s = this.plant.components.flatMap(
      (i) => dt(i).filter((n) => !i.bindings[n.key] && !e?.suggestions.some((o) => o.component_id === i.id && o.slot === n.key)).map((n) => ({ c: i, s: n }))
    );
    return m`<div class="card">
      <h2>${c("map.title")}</h2>
      <p class="muted">${c("map.intro")}</p>
      ${t ? m`<p class="muted">${c("map.standalone")}</p>` : _}
      <div class="row">
        <button class="primary" ?disabled=${this._busy || t} @click=${this._scan}>${T("search")} ${c("map.scan")}</button>
        ${e ? m`<span class="muted">${c("map.found", { count: e.entity_count })}</span>` : _}
        <span class="spacer"></span>
        ${this._msg ? m`<span class="ok">${T("check")} ${this._msg}</span>` : _}
      </div>
      ${e && e.entity_count === 0 ? m`<div class="help"><b>${c("map.none")}</b><p>${c("map.none_help")}</p></div>` : _}
      ${e && e.suggestions.length ? m`<div class="tbl">
            <table>
              <thead><tr>
                <th><input type="checkbox" .checked=${this._sel.size === e.suggestions.length}
                  @change=${(i) => this._sel = i.target.checked ? new Set(e.suggestions.map((n) => `${n.component_id}|${n.slot}`)) : /* @__PURE__ */ new Set()} /></th>
                <th>${c("map.component")}</th><th>${c("map.slot")}</th><th>${c("map.entity")}</th><th>${c("map.value")}</th><th>${c("map.confidence")}</th>
              </tr></thead>
              <tbody>
                ${e.suggestions.map((i) => {
      const n = `${i.component_id}|${i.slot}`, o = this._comp(i.component_id), r = o?.bindings[i.slot], l = this.hass?.states[i.entity_id];
      return m`<tr>
                    <td><input type="checkbox" .checked=${this._sel.has(n)} @change=${(p) => {
        const d = new Set(this._sel);
        p.target.checked ? d.add(n) : d.delete(n), this._sel = d;
      }} /></td>
                    <td>${o?.label || i.component_id}</td>
                    <td>${gt(o?.type || "", i.slot)}</td>
                    <td><code>${i.entity_id}</code>${r && r !== i.entity_id ? m`<div class="muted small">${c("map.current")}: ${r}</div>` : _}</td>
                    <td>${l ? `${l.state} ${l.attributes.unit_of_measurement || ""}` : "–"}</td>
                    <td><span class="conf ${i.confidence}">${c(`map.conf.${i.confidence}`)}</span></td>
                  </tr>`;
    })}
              </tbody>
            </table>
          </div>
          <div class="row"><span class="spacer"></span><button class="primary" ?disabled=${!this._sel.size} @click=${this._apply}>${c("map.apply")} (${this._sel.size})</button></div>` : _}
      <h3>${c("map.unbound")}</h3>
      <p class="muted small">${c("map.unbound_hint")}</p>
      <div class="chips">${s.slice(0, 80).map(({ c: i, s: n }) => m`<span class="chip">${i.label || i.id}: ${gt(i.type, n.key)}</span>`)}</div>
    </div>`;
  }
};
le.properties = {
  plant: { attribute: !1 },
  hass: { attribute: !1 },
  api: { attribute: !1 },
  _res: { state: !0 },
  _sel: { state: !0 },
  _busy: { state: !0 },
  _msg: { state: !0 }
}, le.styles = [
  Q,
  j`
      .help { margin-top: 12px; padding: 12px; border-radius: 10px; background: color-mix(in srgb, var(--cp-warn) 12%, var(--cp-surface-2)); }
      .help p { margin: 6px 0 0; font-size: 13px; }
      .tbl { overflow: auto; margin: 12px 0; }
      table { border-collapse: collapse; width: 100%; font-size: 13px; }
      th, td { text-align: left; padding: 7px 8px; border-bottom: 1px solid var(--cp-border); vertical-align: top; }
      th { font-size: 11px; color: var(--cp-muted); text-transform: uppercase; }
      code { font-size: 12px; }
      .small { font-size: 11px; }
      .conf { font-size: 11px; padding: 2px 8px; border-radius: 8px; background: var(--cp-surface-2); }
      .conf.high { color: var(--cp-accent); }
      .conf.medium { color: var(--cp-warn); }
      .ok { color: var(--cp-accent); display: inline-flex; gap: 4px; align-items: center; font-size: 13px; }
      .chips { display: flex; flex-wrap: wrap; gap: 6px; }
      .chip { font-size: 11px; padding: 3px 8px; border-radius: 8px; background: var(--cp-surface-2); color: var(--cp-muted); }
    `
];
let Re = le;
const xn = ["outdoor_unit", "indoor_unit", "buffer", "dhw_tank", "pump", "valve_3way", "mixer", "radiators", "floor_heating", "tap", "separator", "expansion_vessel"], ce = class ce extends N {
  constructor() {
    super(...arguments), this.icons = /* @__PURE__ */ new Map(), this._err = "", this._iso = !1;
  }
  async _upload(t) {
    const e = t.target, s = e.files?.[0];
    if (e.value = "", !s) return;
    if (this._err = "", s.size > 256 * 1024) {
      this._err = c("ic.err.too_large");
      return;
    }
    const i = await new Promise((n, o) => {
      const r = new FileReader();
      r.onload = () => n(String(r.result).split(",")[1] || ""), r.onerror = () => o(r.error), r.readAsDataURL(s);
    });
    try {
      await this.api.uploadIcon(s.name.replace(/\.[^.]+$/, ""), s.type || "image/svg+xml", i, this._iso), _t(this, "icons-changed");
    } catch (n) {
      const o = n?.code || n?.error?.code || "invalid_data";
      this._err = c(`ic.err.${o}`);
    }
  }
  async _delete(t) {
    await this.api.deleteIcon(t), _t(this, "icons-changed");
  }
  _typeDefault(t, e) {
    const s = structuredClone(this.plant);
    s.settings.typeIcons = { ...s.settings.typeIcons || {} }, e ? s.settings.typeIcons[t] = e : delete s.settings.typeIcons[t], _t(this, "save", s);
  }
  render() {
    const t = [...this.icons.values()];
    return m`<div class="card">
      <h2>${c("ic.title")}</h2>
      <p class="muted">${c("ic.intro")}</p>
      <div class="row">
        <label class="btn primary up">${T("upload")} ${c("ic.upload")}
          <input type="file" accept=".svg,.png,.webp,.jpg,.jpeg,image/svg+xml,image/png,image/webp,image/jpeg" @change=${this._upload} hidden /></label>
        <label class="row small"><input type="checkbox" .checked=${this._iso} @change=${(e) => this._iso = e.target.checked} /> ${c("ic.iso")}</label>
        ${this._err ? m`<span class="err">${this._err}</span>` : _}
      </div>
      ${t.length ? m`<div class="gallery">${t.map(
      (e) => m`<div class="ic">
              <div class="prev"><img src=${e.data_url} alt=${e.name} /></div>
              <div class="name">${e.name}${e.iso ? m` <span class="muted">· iso</span>` : _}</div>
              <button class="ghost danger icon" @click=${() => this._delete(e.id)}>${T("trash")}</button>
            </div>`
    )}</div>` : m`<p class="muted">${c("ic.empty")}</p>`}
      <h3>${c("ic.type_default")}</h3>
      <div class="defaults">
        ${xn.map(
      (e) => m`<label class="field">${c(`type.${e}`)}
            <select @change=${(s) => this._typeDefault(e, s.target.value)}>
              <option value="">${c("ed.icon_default")}</option>
              ${t.map((s) => m`<option value=${s.id} ?selected=${this.plant.settings.typeIcons?.[e] === s.id}>${s.name}</option>`)}
            </select></label>`
    )}
      </div>
    </div>`;
  }
};
ce.properties = { plant: { attribute: !1 }, api: { attribute: !1 }, icons: { attribute: !1 }, _err: { state: !0 }, _iso: { state: !0 } }, ce.styles = [
  Q,
  j`
      .up { cursor: pointer; }
      .small { font-size: 13px; }
      .err { color: var(--cp-error); font-size: 13px; }
      .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; margin-top: 14px; }
      .ic { background: var(--cp-surface-2); border-radius: 12px; padding: 10px; display: grid; gap: 6px; position: relative; }
      .ic button { position: absolute; top: 4px; right: 4px; }
      .prev { height: 90px; display: grid; place-items: center; background: var(--cp-bg-2); border-radius: 8px; }
      .prev img { max-width: 90%; max-height: 80px; }
      .name { font-size: 12px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .defaults { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
    `
];
let Ie = ce;
const pe = class pe extends N {
  constructor() {
    super(...arguments), this.version = "";
  }
  _patch(t) {
    const e = structuredClone(this.plant);
    e.settings = { ...e.settings, ...t }, _t(this, "save", e);
  }
  render() {
    const t = this.plant.settings;
    return m`<div class="card wrap">
      <h2>${c("st.title")}</h2>
      <label class="field">${c("st.style")}
        <select @change=${(e) => this._patch({ style: e.target.value })}>
          <option value="flat" ?selected=${t.style === "flat"}>${c("st.style.flat")}</option>
          <option value="iso" disabled>${c("st.style.iso")}</option>
        </select></label>
      <label class="toggle"><input type="checkbox" .checked=${t.demo} @change=${(e) => this._patch({ demo: e.target.checked })} />
        <span><b>${c("st.demo")}</b><br /><span class="muted">${c("st.demo_hint")}</span></span></label>
      <label class="field">${c("st.language")}
        <select @change=${(e) => this._patch({ language: e.target.value })}>
          ${["auto", "de", "en"].map((e) => m`<option value=${e} ?selected=${(t.language || "auto") === e}>${e === "auto" ? c("st.lang.auto") : e === "de" ? "Deutsch" : "English"}</option>`)}
        </select></label>
      <label class="field">${c("st.heat_load")}
        <input type="number" step="0.1" .value=${String(t.heat_load ?? 6.2)} @change=${(e) => this._patch({ heat_load: Number(e.target.value) })} /></label>
      <div class="row foot">
        <span class="muted">${c("st.version")} ${this.version}</span>
        <span class="spacer"></span>
        <button class="danger" @click=${() => confirm(c("st.reset_confirm")) && _t(this, "reset-plant")}>${c("st.reset")}</button>
      </div>
    </div>`;
  }
};
pe.properties = { plant: { attribute: !1 }, version: {} }, pe.styles = [
  Q,
  j`
      .wrap { max-width: 640px; display: grid; gap: 16px; }
      .toggle { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; }
      .toggle input { margin-top: 4px; }
      .foot { margin-top: 8px; }
    `
];
let Ve = pe;
for (const [a, t] of [
  ["cp-wizard", Be],
  ["cp-mapping", Re],
  ["cp-icons", Ie],
  ["cp-settings", Ve]
])
  customElements.get(a) || customElements.define(a, t);
const kn = 10 * 6e4, Sn = 5e3;
function Ws(a) {
  return a === void 0 ? "var(--cp-muted)" : a >= 3.5 ? Ct.green : a >= 3 ? Ct.yellow : Ct.red;
}
const de = class de extends N {
  constructor() {
    super(...arguments), this.sim = null, this.version = 0, this._data = null, this._error = "", this._loadedAt = 0, this._loadedFor = null;
  }
  willUpdate() {
    const t = this.sim || this.plant, e = Date.now() - this._loadedAt;
    (t !== this._loadedFor || e > (this.sim ? Sn : kn)) && (this._loadedFor = t, this._loadedAt = Date.now(), this._load());
  }
  async _load() {
    try {
      this._error = "", this.sim ? this._data = Xi(this.sim) : this.hass && !this.hass.__standalone && (this._data = await Ji(this.hass, this.plant));
    } catch (t) {
      this._error = t?.message || String(t);
    }
  }
  _live() {
    const t = Ys(this.plant, this.src), e = 62, s = 2 * Math.PI * e, i = t ? Math.min(1, t.cop / 7) : 0, n = t ? Ct[t.ampel] : "var(--cp-muted)";
    return m`<div class="card live">
      <div class="cap">${c("eff.live")}</div>
      <div class="gauge">
        <svg viewBox="0 0 160 160">
          <circle cx="80" cy="80" r=${e} class="track" />
          ${$`<circle cx="80" cy="80" r=${e} class="bar" style="stroke:${n};stroke-dasharray:${s * i} ${s}" />`}
        </svg>
        <div class="gv">
          <span class="big" style="color:${n}">${t ? V(t.cop, 1) : "–"}</span>
          <span class="muted">COP</span>
        </div>
      </div>
      ${t ? m`<div class="lv-row"><span>${c("eff.expected", { out: V(t.tOut, 0), flow: V(t.tFlow, 0) })}</span><b>${V(t.expected, 1)}</b></div>
            <div class="lv-row"><span>${c("eff.ratio")}</span><b style="color:${n}">${V(t.ratio * 100, 0)} %</b></div>
            <div class="verdict" style="border-color:${n}">${c(`eff.ampel.${t.ampel}`)}</div>` : m`<p class="muted small">${c("eff.no_live")}</p>`}
    </div>`;
  }
  _tile(t, e, s) {
    const i = Pt(e), n = e && e.heat > 0 ? e.heatDhw / e.heat : void 0, o = e && e.el > 0 ? e.aux / e.el : void 0;
    return m`<div class="card tile">
      <div class="cap">${c(`eff.${t}`)} ${s ? m`<span class="est">${c("eff.estimate")}</span>` : _}</div>
      <div class="spf" style="color:${Ws(i)}">${i !== void 0 ? V(i, 2) : "–"}<small>${t === "today" || t === "yesterday" ? "AZ" : "JAZ"}</small></div>
      <div class="kv"><span>${c("eff.heat")}</span><b>${e ? V(e.heat, e.heat >= 100 ? 0 : 1) : "–"} kWh</b></div>
      <div class="kv"><span>${c("eff.el")}</span><b>${e ? V(e.el, e.el >= 100 ? 0 : 1) : "–"} kWh</b></div>
      <div class="kv"><span>${c("eff.dhw_share")}</span><b>${n !== void 0 ? V(n * 100, 0) + " %" : "–"}</b></div>
      <div class="kv"><span>${c("eff.aux_share")}</span><b>${o !== void 0 ? V(o * 100, 1) + " %" : "–"}</b></div>
    </div>`;
  }
  _chart(t) {
    const e = t.daily.slice(-30);
    if (!e.length) return _;
    const s = 720, i = 200, n = { l: 34, r: 34, t: 10, b: 24 }, o = Math.max(1, ...e.map((u) => Math.max(u.heat, u.el))), r = (s - n.l - n.r) / e.length, l = (u) => n.t + (i - n.t - n.b) * (1 - u / o), p = (u) => n.t + (i - n.t - n.b) * (1 - Math.min(6, u) / 6), d = (u) => new Date(u).toLocaleDateString(yi() === "de" ? "de-DE" : "en-GB", { day: "2-digit", month: "2-digit" }), h = e.map((u, f) => {
      const g = Pt(u);
      return g === void 0 ? null : `${n.l + f * r + r / 2},${p(g)}`;
    }).filter(Boolean).join(" ");
    return m`<div class="card chart">
      <div class="row head"><div class="cap">${c("eff.daily")}</div><span class="spacer"></span>
        <span class="lg"><i style="background:#ff8a3d"></i>${c("eff.heat")}</span>
        <span class="lg"><i style="background:#4d9fff"></i>${c("eff.el")}</span>
        <span class="lg"><i class="dot"></i>AZ</span></div>
      <svg viewBox="0 0 ${s} ${i}" preserveAspectRatio="none">
        ${[0, 0.5, 1].map((u) => $`<line class="grid" x1=${n.l} x2=${s - n.r} y1=${l(o * u)} y2=${l(o * u)} />
          <text class="axis" x=${n.l - 4} y=${l(o * u) + 3} text-anchor="end">${V(o * u, 0)}</text>`)}
        ${[2, 4, 6].map((u) => $`<text class="axis" x=${s - n.r + 4} y=${p(u) + 3}>${u}</text>`)}
        ${e.map((u, f) => {
      const g = n.l + f * r;
      return $`<g><title>${d(u.day)} · ${V(u.heat, 1)} / ${V(u.el, 1)} kWh · AZ ${Pt(u) !== void 0 ? V(Pt(u), 2) : "–"}</title>
            <rect x=${g + r * 0.12} y=${l(u.heat)} width=${r * 0.36} height=${i - n.b - l(u.heat)} rx="2" fill="#ff8a3d" />
            <rect x=${g + r * 0.5} y=${l(u.el)} width=${r * 0.36} height=${i - n.b - l(u.el)} rx="2" fill="#4d9fff" />
            ${f % 5 === 0 ? $`<text class="axis" x=${g + r / 2} y=${i - 6} text-anchor="middle">${d(u.day)}</text>` : _}</g>`;
    })}
        ${$`<polyline points=${h} fill="none" stroke="var(--cp-text)" stroke-width="1.5" stroke-dasharray="3 3" />`}
        ${e.map((u, f) => {
      const g = Pt(u);
      return g === void 0 ? _ : $`<circle cx=${n.l + f * r + r / 2} cy=${p(g)} r="3" fill=${Ws(g)} />`;
    })}
      </svg>
      ${t.estimated.month ? m`<p class="muted small">${c("eff.demo_note")}</p>` : _}
    </div>`;
  }
  render() {
    const t = this._data;
    return m`
      <div class="grid">
        ${this._live()}
        <div class="tiles">
          ${this._tile("today", t?.today ?? null, !1)}
          ${this._tile("yesterday", t?.yesterday ?? null, !1)}
          ${this._tile("month", t?.month ?? null, !!t?.estimated.month)}
          ${this._tile("year", t?.year ?? null, !!t?.estimated.year)}
        </div>
      </div>
      ${this._error ? m`<div class="card err">${this._error}</div>` : _}
      ${t?.missing ? m`<div class="card hint">${c(`eff.missing.${t.missing}`)}</div>` : _}
      ${t ? this._chart(t) : _}
    `;
  }
};
de.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  hass: { attribute: !1 },
  sim: { attribute: !1 },
  version: { type: Number },
  _data: { state: !0 },
  _error: { state: !0 }
}, de.styles = [
  Q,
  j`
      :host { display: grid; gap: 12px; align-content: start; }
      .grid { display: grid; grid-template-columns: 280px 1fr; gap: 12px; }
      .tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px; }
      .cap { font-size: 11px; text-transform: uppercase; letter-spacing: 0.7px; color: var(--cp-muted); font-weight: 700; }
      .live { display: grid; gap: 8px; justify-items: center; }
      .gauge { position: relative; width: 170px; height: 170px; }
      .gauge svg { width: 100%; height: 100%; transform: rotate(-90deg); }
      .track { fill: none; stroke: var(--cp-surface-2); stroke-width: 12; }
      .bar { fill: none; stroke-width: 12; stroke-linecap: round; transition: stroke-dasharray 0.6s; }
      .gv { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; }
      .big { font-size: 40px; font-weight: 800; font-variant-numeric: tabular-nums; line-height: 1; }
      .lv-row { display: flex; justify-content: space-between; width: 100%; font-size: 13px; color: var(--cp-muted); gap: 8px; }
      .lv-row b { color: var(--cp-text); }
      .verdict { width: 100%; text-align: center; font-size: 13px; font-weight: 700; padding: 6px; border-radius: 10px; border: 1px solid; }
      .tile { display: grid; gap: 6px; align-content: start; }
      .spf { font-size: 34px; font-weight: 800; font-variant-numeric: tabular-nums; }
      .spf small { font-size: 12px; color: var(--cp-muted); margin-left: 6px; font-weight: 700; }
      .kv { display: flex; justify-content: space-between; font-size: 13px; color: var(--cp-muted); }
      .kv b { color: var(--cp-text); font-variant-numeric: tabular-nums; }
      .est { font-size: 10px; color: var(--cp-notice); border: 1px solid currentColor; border-radius: 6px; padding: 0 5px; margin-left: 4px; text-transform: none; letter-spacing: 0; }
      .chart svg { width: 100%; height: 220px; display: block; }
      .head { margin-bottom: 6px; }
      .lg { display: inline-flex; gap: 5px; align-items: center; font-size: 12px; color: var(--cp-muted); }
      .lg i { width: 10px; height: 10px; border-radius: 3px; display: inline-block; }
      .lg i.dot { border-radius: 50%; background: var(--cp-text); }
      .grid line.grid, line.grid { stroke: var(--cp-border); }
      .axis { fill: var(--cp-muted); font-size: 10px; }
      .small { font-size: 12px; margin: 6px 0 0; }
      .hint { font-size: 13px; color: var(--cp-warn); }
      .err { color: var(--cp-error); }
      @media (max-width: 800px) { .grid { grid-template-columns: 1fr; } }
    `
];
let Ne = de;
customElements.get("cp-efficiency") || customElements.define("cp-efficiency", Ne);
const he = class he extends N {
  constructor() {
    super(...arguments), this.isPanel = !1, this._config = { type: "custom:copilot-card" }, this._ctl = new js(this, !1);
  }
  setConfig(t) {
    if (!t) throw new Error("Invalid configuration");
    this._config = { show_kpis: !0, show_messages: !1, show_demo_controls: !1, ...t };
  }
  getCardSize() {
    return 10;
  }
  getGridOptions() {
    return { columns: 12, rows: 10, min_columns: 6, min_rows: 5 };
  }
  static getStubConfig() {
    return { show_kpis: !0, show_messages: !1, show_demo_controls: !1 };
  }
  static getConfigElement() {
    return document.createElement("copilot-card-editor");
  }
  willUpdate(t) {
    t.has("hass") && this.hass && this._ctl.setHass(this.hass);
  }
  render() {
    const t = this._config, e = this._ctl.plant, s = t.height || (this.isPanel ? "calc(100vh - var(--header-height, 56px) - 16px)" : "560px");
    return m`<ha-card style="height:${s}">
      ${this._ctl.error ? m`<div class="err">${this._ctl.error}</div>` : _}
      ${e ? m`<cp-overview
            .plant=${e}
            .src=${this._ctl.src}
            .icons=${this._ctl.icons}
            .messages=${this._ctl.messages}
            .sim=${this._ctl.sim}
            .version=${this._ctl.version}
            .showKpis=${t.show_kpis !== !1}
            .showSide=${!!t.show_messages}
            .showDemo=${!!t.show_demo_controls}
            ?narrow=${this.clientWidth < 700}
            @scenario=${(i) => this._ctl.scenario(i.detail)}
          ></cp-overview>` : m`<div class="loading">${Pe}</div>`}
    </ha-card>`;
  }
};
he.properties = {
  hass: { attribute: !1 },
  isPanel: { type: Boolean },
  _config: { state: !0 }
}, he.styles = [
  Fs,
  Q,
  j`
      :host { display: block; }
      ha-card {
        display: flex;
        flex-direction: column;
        padding: 12px;
        box-sizing: border-box;
        overflow: hidden;
        background: var(--cp-bg);
        color: var(--cp-text);
        font-family: var(--cp-font);
      }
      cp-overview { flex: 1; min-height: 0; }
      .loading { flex: 1; display: grid; place-items: center; }
      .loading svg { width: 48px; height: 48px; opacity: 0.7; }
      .err { color: var(--cp-error); font-size: 13px; }
    `
];
let Ke = he;
const ue = class ue extends N {
  constructor() {
    super(...arguments), this._config = { type: "custom:copilot-card" };
  }
  setConfig(t) {
    this._config = t;
  }
  _set(t, e) {
    const s = { ...this._config, [t]: e };
    (e === "" || e === void 0) && delete s[t], this._config = s, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: s }, bubbles: !0, composed: !0 }));
  }
  render() {
    const t = this._config, e = (s, i, n) => m`<label class="row">
      <input type="checkbox" .checked=${t[s] ?? n} @change=${(o) => this._set(s, o.target.checked)} />
      ${i}</label>`;
    return m`<div class="ed">
      ${e("show_kpis", c("card.show_kpis"), !0)}
      ${e("show_messages", c("card.show_messages"), !1)}
      ${e("show_demo_controls", c("card.show_demo"), !1)}
      <label class="field">${c("card.height")}
        <input .value=${t.height || ""} placeholder="560px" @change=${(s) => this._set("height", s.target.value.trim())} /></label>
      <p class="hint">${c("card.hint")}</p>
    </div>`;
  }
};
ue.properties = { hass: { attribute: !1 }, _config: { state: !0 } }, ue.styles = [
  Q,
  j`
      .ed { display: grid; gap: 10px; color: var(--primary-text-color); }
      .row { display: flex; gap: 8px; align-items: center; font-size: 14px; }
      .field { color: var(--secondary-text-color); }
      input:not([type]) { background: transparent; color: var(--primary-text-color); border-color: var(--divider-color); }
      .hint { font-size: 12px; color: var(--secondary-text-color); margin: 0; }
    `
];
let Ue = ue;
customElements.get("copilot-card") || customElements.define("copilot-card", Ke);
customElements.get("copilot-card-editor") || customElements.define("copilot-card-editor", Ue);
const te = window;
te.customCards = te.customCards || [];
te.customCards.some((a) => a.type === "copilot-card") || te.customCards.push({
  type: "copilot-card",
  name: "COPilot",
  description: "Animated heat pump schematic with live values",
  preview: !1,
  documentationURL: "https://github.com/junky84/copilot"
});
const Cs = "copilot.view";
function Mn(a) {
  try {
    return localStorage.getItem(a);
  } catch {
    return null;
  }
}
function zn(a, t) {
  try {
    localStorage.setItem(a, t);
  } catch {
  }
}
const me = class me extends N {
  constructor() {
    super(), this.narrow = !1, this._ctl = new js(this), this._view = "overview", this._sub = "editor", this._toast = "";
    const t = Mn(Cs);
    if (t) {
      const [e, s] = t.split(":");
      (e === "overview" || e === "efficiency" || e === "messages" || e === "config") && (this._view = e), s && (this._sub = s);
    }
  }
  willUpdate(t) {
    t.has("hass") && this.hass && this._ctl.setHass(this.hass);
  }
  async _save(t) {
    try {
      await this._ctl.save(t), this._showToast(c("saved"));
    } catch (e) {
      this._showToast(e?.message || String(e));
    }
  }
  _showToast(t) {
    this._toast = t, window.setTimeout(() => this._toast = "", 2600);
  }
  _go(t, e) {
    this._view = t, e && (this._sub = e), zn(Cs, `${this._view}:${this._sub}`);
  }
  _fullscreen() {
    document.fullscreenElement ? document.exitFullscreen() : this.requestFullscreen?.().catch(() => {
    });
  }
  render() {
    const t = this._ctl.plant, e = this._ctl.messages.filter((s) => s.active && (s.level === "warning" || s.level === "error")).length;
    return m`<div class="shell">
      <header>
        ${this.narrow ? m`<button class="ghost icon" title=${c("menu")} @click=${() => this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: !0, composed: !0 }))}>${T("menu")}</button>` : _}
        <div class="brand">${Pe}<span>COP<b>ilot</b></span></div>
        <nav>
          ${["overview", "efficiency", "messages", "config"].map(
      (s) => m`<button class="tab ${this._view === s ? "on" : ""}" @click=${() => this._go(s)}>
              ${T(s === "overview" ? "grid" : s === "efficiency" ? "chart" : s === "messages" ? "bell" : "gear")}
              <span class="tl">${c(`nav.${s}`)}</span>
              ${s === "messages" && e ? m`<span class="badge">${e}</span>` : _}
            </button>`
    )}
        </nav>
        <span class="spacer"></span>
        ${t?.settings.demo ? m`<span class="demo-pill">${T("flask")}<span class="tl">${c("demo")}</span></span>` : _}
        <button class="ghost icon" title=${c("fullscreen")} @click=${this._fullscreen}>${T("expand")}</button>
      </header>
      <main>
        ${this._ctl.error ? m`<div class="card err">${this._ctl.error}</div>` : _}
        ${this._ctl.api?.standalone ? m`<div class="note muted">${c("standalone_hint")}</div>` : _}
        ${t ? this._content(t) : m`<div class="loading">${Pe}</div>`}
      </main>
      ${this._toast ? m`<div class="toast">${this._toast}</div>` : _}
    </div>`;
  }
  _content(t) {
    const e = this._ctl.src;
    if (this._view === "overview")
      return m`<cp-overview
        .plant=${t}
        .src=${e}
        .icons=${this._ctl.icons}
        .messages=${this._ctl.messages}
        .sim=${this._ctl.sim}
        .version=${this._ctl.version}
        ?narrow=${this.narrow || window.innerWidth < 900}
        @scenario=${(n) => this._ctl.scenario(n.detail)}
      ></cp-overview>`;
    if (this._view === "efficiency")
      return m`<cp-efficiency
        .plant=${t}
        .src=${e}
        .hass=${this.hass}
        .sim=${this._ctl.sim}
        .version=${this._ctl.version}
      ></cp-efficiency>`;
    if (this._view === "messages")
      return m`<div class="card pad"><cp-messages
        .messages=${this._ctl.messages}
        ?canClear=${this._ctl.admin && !this._ctl.sim}
        @clear=${() => this._ctl.clearMessages()}
      ></cp-messages></div>`;
    if (!this._ctl.admin) return m`<div class="card">${c("readonly_hint")}</div>`;
    const s = ["wizard", "editor", "mapping", "icons", "settings"], i = (n) => this._save(n.detail);
    return m`
      <div class="subnav">
        ${s.map((n) => m`<button class="sub ${this._sub === n ? "on" : ""}" @click=${() => this._go("config", n)}>${c(`cfg.${n}`)}</button>`)}
      </div>
      <div class="cfg ${this._sub === "editor" ? "fill" : ""}">
        ${this._sub === "wizard" ? m`<cp-wizard .plant=${t} @plant-generated=${async (n) => {
      await this._save(n.detail), this._showToast(c("wz.done")), this._go("config", "editor");
    }}></cp-wizard>` : _}
        ${this._sub === "editor" ? m`<cp-editor .plant=${t} .hass=${this.hass} .src=${e} .icons=${this._ctl.icons} .version=${this._ctl.version} @save=${i}></cp-editor>` : _}
        ${this._sub === "mapping" ? m`<cp-mapping .plant=${t} .hass=${this.hass} .api=${this._ctl.api} @save=${i}></cp-mapping>` : _}
        ${this._sub === "icons" ? m`<cp-icons .plant=${t} .api=${this._ctl.api} .icons=${this._ctl.icons} @save=${i} @icons-changed=${() => this._ctl.loadIcons()}></cp-icons>` : _}
        ${this._sub === "settings" ? m`<cp-settings .plant=${t} .version=${this._ctl.backendVersion} @save=${i}
              @reset-plant=${() => this._save({ ...Ae(), settings: { ...Ae().settings, demo: !0 } })}></cp-settings>` : _}
      </div>
    `;
  }
};
me.properties = {
  hass: { attribute: !1 },
  narrow: { type: Boolean },
  route: { attribute: !1 },
  panel: { attribute: !1 },
  _view: { state: !0 },
  _sub: { state: !0 },
  _toast: { state: !0 }
}, me.styles = [
  Fs,
  Q,
  j`
      :host {
        display: block;
        height: 100%;
        background: var(--cp-bg);
        color: var(--cp-text);
        font-family: var(--cp-font);
      }
      .shell {
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 100vh;
        max-height: 100vh;
      }
      header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 16px;
        border-bottom: 1px solid var(--cp-border);
        background: color-mix(in srgb, var(--cp-surface) 85%, transparent);
        backdrop-filter: blur(8px);
        position: sticky;
        top: 0;
        z-index: 5;
      }
      .brand { display: flex; align-items: center; gap: 8px; font-size: 17px; letter-spacing: 0.2px; margin-right: 8px; }
      .brand b { font-weight: 800; }
      .logo { width: 26px; height: 26px; }
      nav { display: flex; gap: 4px; }
      .tab { background: transparent; border-color: transparent; color: var(--cp-muted); position: relative; }
      .tab.on { background: var(--cp-surface-2); color: var(--cp-text); border-color: var(--cp-border); }
      .tab .badge { margin-left: 2px; }
      .demo-pill { display: inline-flex; gap: 6px; align-items: center; font-size: 12px; font-weight: 700; color: var(--cp-notice);
        padding: 5px 10px; border-radius: 999px; background: color-mix(in srgb, var(--cp-notice) 15%, transparent); }
      main { flex: 1; min-height: 0; overflow: auto; padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 10px; }
      main > cp-overview { flex: 1; min-height: 0; }
      .pad { overflow: auto; }
      .note { font-size: 12px; }
      .err { color: var(--cp-error); }
      .loading { flex: 1; display: grid; place-items: center; }
      .loading svg { width: 64px; height: 64px; animation: spin 1.6s linear infinite; opacity: 0.8; }
      @keyframes spin { to { transform: rotate(360deg); } }
      .subnav { display: flex; gap: 4px; flex-wrap: wrap; }
      .sub { background: transparent; border-color: transparent; color: var(--cp-muted); }
      .sub.on { background: var(--cp-surface-2); color: var(--cp-text); border-color: var(--cp-border); }
      .cfg { min-height: 0; overflow: auto; }
      .cfg.fill { flex: 1; overflow: visible; display: flex; flex-direction: column; }
      .cfg.fill > cp-editor { flex: 1; min-height: 640px; }
      @media (max-width: 900px) {
        main > cp-overview { flex: none; }
      }
      @media (max-width: 700px) {
        header { padding: 8px 10px; gap: 6px; }
        .brand span { display: none; }
        .tl { display: none; }
        main { padding: 10px; }
      }
    `
];
let je = me;
customElements.get("copilot-panel") || customElements.define("copilot-panel", je);
export {
  je as CopilotPanel
};
