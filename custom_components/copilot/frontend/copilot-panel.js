/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Jt = globalThis, ts = Jt.ShadowRoot && (Jt.ShadyCSS === void 0 || Jt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, es = Symbol(), ds = /* @__PURE__ */ new WeakMap();
let Zs = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== es) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (ts && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = ds.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && ds.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const li = (a) => new Zs(typeof a == "string" ? a : a + "", void 0, es), X = (a, ...t) => {
  const e = a.length === 1 ? a[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + a[n + 1], a[0]);
  return new Zs(e, a, es);
}, ci = (a, t) => {
  if (ts) a.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = Jt.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, a.appendChild(s);
  }
}, hs = ts ? (a) => a : (a) => a instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return li(e);
})(a) : a;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: pi, defineProperty: di, getOwnPropertyDescriptor: hi, getOwnPropertyNames: ui, getOwnPropertySymbols: mi, getPrototypeOf: fi } = Object, ve = globalThis, us = ve.trustedTypes, gi = us ? us.emptyScript : "", _i = ve.reactiveElementPolyfillSupport, Bt = (a, t) => a, Te = { toAttribute(a, t) {
  switch (t) {
    case Boolean:
      a = a ? gi : null;
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
} }, Gs = (a, t) => !pi(a, t), ms = { attribute: !0, type: String, converter: Te, reflect: !1, useDefault: !1, hasChanged: Gs };
Symbol.metadata ??= Symbol("metadata"), ve.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Mt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ms) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && di(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = hi(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? ms;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Bt("elementProperties"))) return;
    const t = fi(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Bt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Bt("properties"))) {
      const e = this.properties, s = [...ui(e), ...mi(e)];
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
      for (const i of s) e.unshift(hs(i));
    } else t !== void 0 && e.push(hs(t));
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
    return ci(t, this.constructor.elementStyles), t;
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
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : Te).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Te;
      this._$Em = i;
      const r = o.fromAttribute(e, n.type);
      this[i] = r ?? this._$Ej?.get(i) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (i === !1 && (n = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? Gs)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
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
Mt.elementStyles = [], Mt.shadowRootOptions = { mode: "open" }, Mt[Bt("elementProperties")] = /* @__PURE__ */ new Map(), Mt[Bt("finalized")] = /* @__PURE__ */ new Map(), _i?.({ ReactiveElement: Mt }), (ve.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ss = globalThis, fs = (a) => a, te = ss.trustedTypes, gs = te ? te.createPolicy("lit-html", { createHTML: (a) => a }) : void 0, Ys = "$lit$", mt = `lit$${Math.random().toFixed(9).slice(2)}$`, qs = "?" + mt, wi = `<${qs}>`, bt = document, It = () => bt.createComment(""), Vt = (a) => a === null || typeof a != "object" && typeof a != "function", is = Array.isArray, vi = (a) => is(a) || typeof a?.[Symbol.iterator] == "function", be = `[ 	
\f\r]`, Tt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _s = /-->/g, ws = />/g, gt = RegExp(`>|${be}(?:([^\\s"'>=/]+)(${be}*=${be}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), vs = /'/g, $s = /"/g, Js = /^(?:script|style|textarea|title)$/i, Xs = (a) => (t, ...e) => ({ _$litType$: a, strings: t, values: e }), u = Xs(1), w = Xs(2), Et = Symbol.for("lit-noChange"), _ = Symbol.for("lit-nothing"), ys = /* @__PURE__ */ new WeakMap(), wt = bt.createTreeWalker(bt, 129);
function Qs(a, t) {
  if (!is(a) || !a.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return gs !== void 0 ? gs.createHTML(t) : t;
}
const $i = (a, t) => {
  const e = a.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = Tt;
  for (let r = 0; r < e; r++) {
    const l = a[r];
    let p, d, h = -1, m = 0;
    for (; m < l.length && (o.lastIndex = m, d = o.exec(l), d !== null); ) m = o.lastIndex, o === Tt ? d[1] === "!--" ? o = _s : d[1] !== void 0 ? o = ws : d[2] !== void 0 ? (Js.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = gt) : d[3] !== void 0 && (o = gt) : o === gt ? d[0] === ">" ? (o = i ?? Tt, h = -1) : d[1] === void 0 ? h = -2 : (h = o.lastIndex - d[2].length, p = d[1], o = d[3] === void 0 ? gt : d[3] === '"' ? $s : vs) : o === $s || o === vs ? o = gt : o === _s || o === ws ? o = Tt : (o = gt, i = void 0);
    const f = o === gt && a[r + 1].startsWith("/>") ? " " : "";
    n += o === Tt ? l + wi : h >= 0 ? (s.push(p), l.slice(0, h) + Ys + l.slice(h) + mt + f) : l + mt + (h === -2 ? r : f);
  }
  return [Qs(a, n + (a[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Nt {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const r = t.length - 1, l = this.parts, [p, d] = $i(t, e);
    if (this.el = Nt.createElement(p, s), wt.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = wt.nextNode()) !== null && l.length < r; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(Ys)) {
          const m = d[o++], f = i.getAttribute(h).split(mt), g = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: n, name: g[2], strings: f, ctor: g[1] === "." ? bi : g[1] === "?" ? xi : g[1] === "@" ? ki : $e }), i.removeAttribute(h);
        } else h.startsWith(mt) && (l.push({ type: 6, index: n }), i.removeAttribute(h));
        if (Js.test(i.tagName)) {
          const h = i.textContent.split(mt), m = h.length - 1;
          if (m > 0) {
            i.textContent = te ? te.emptyScript : "";
            for (let f = 0; f < m; f++) i.append(h[f], It()), wt.nextNode(), l.push({ type: 2, index: ++n });
            i.append(h[m], It());
          }
        }
      } else if (i.nodeType === 8) if (i.data === qs) l.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(mt, h + 1)) !== -1; ) l.push({ type: 7, index: n }), h += mt.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = bt.createElement("template");
    return s.innerHTML = t, s;
  }
}
function At(a, t, e = a, s) {
  if (t === Et) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = Vt(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(a), i._$AT(a, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = At(a, i._$AS(a, t.values), i, s)), t;
}
class yi {
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
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? bt).importNode(e, !0);
    wt.currentNode = i;
    let n = wt.nextNode(), o = 0, r = 0, l = s[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let p;
        l.type === 2 ? p = new Kt(n, n.nextSibling, this, t) : l.type === 1 ? p = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (p = new Si(n, this, t)), this._$AV.push(p), l = s[++r];
      }
      o !== l?.index && (n = wt.nextNode(), o++);
    }
    return wt.currentNode = bt, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class Kt {
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
    t = At(this, t, e), Vt(t) ? t === _ || t == null || t === "" ? (this._$AH !== _ && this._$AR(), this._$AH = _) : t !== this._$AH && t !== Et && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : vi(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== _ && Vt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(bt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Nt.createElement(Qs(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const n = new yi(i, this), o = n.u(this.options);
      n.p(e), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ys.get(t.strings);
    return e === void 0 && ys.set(t.strings, e = new Nt(t)), e;
  }
  k(t) {
    is(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new Kt(this.O(It()), this.O(It()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = fs(t).nextSibling;
      fs(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class $e {
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
    if (n === void 0) t = At(this, t, e, 0), o = !Vt(t) || t !== this._$AH && t !== Et, o && (this._$AH = t);
    else {
      const r = t;
      let l, p;
      for (t = n[0], l = 0; l < n.length - 1; l++) p = At(this, r[s + l], e, l), p === Et && (p = this._$AH[l]), o ||= !Vt(p) || p !== this._$AH[l], p === _ ? t = _ : t !== _ && (t += (p ?? "") + n[l + 1]), this._$AH[l] = p;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === _ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class bi extends $e {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === _ ? void 0 : t;
  }
}
class xi extends $e {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== _);
  }
}
class ki extends $e {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = At(this, t, e, 0) ?? _) === Et) return;
    const s = this._$AH, i = t === _ && s !== _ || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== _ && (s === _ || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Si {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    At(this, t);
  }
}
const Mi = ss.litHtmlPolyfillSupport;
Mi?.(Nt, Kt), (ss.litHtmlVersions ??= []).push("3.3.3");
const zi = (a, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = e?.renderBefore ?? null;
    s._$litPart$ = i = new Kt(t.insertBefore(It(), n), n, void 0, e ?? {});
  }
  return i._$AI(a), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ns = globalThis;
class G extends Mt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = zi(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Et;
  }
}
G._$litElement$ = !0, G.finalized = !0, ns.litElementHydrateSupport?.({ LitElement: G });
const Ei = ns.litElementPolyfillSupport;
Ei?.({ LitElement: G });
(ns.litElementVersions ??= []).push("4.2.2");
const bs = "copilot.standalone.plant", Lt = "copilot.standalone.icons";
function Ut(a, t) {
  try {
    const e = localStorage.getItem(a);
    return e ? JSON.parse(e) : t;
  } catch {
    return t;
  }
}
function xe(a, t) {
  try {
    localStorage.setItem(a, JSON.stringify(t));
  } catch {
  }
}
class Ai {
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
    return this.standalone ? { version: "demo", plant: Ut(bs, null), options: {}, is_admin: !0 } : this.hass.callWS({ type: "copilot/config/get" });
  }
  async saveConfig(t) {
    if (this.standalone) return xe(bs, t);
    await this.hass.callWS({ type: "copilot/config/save", plant: t });
  }
  async scan(t) {
    return this.standalone ? { source: "ems_esp", entity_count: 0, entities: [], suggestions: [] } : this.hass.callWS({ type: "copilot/mapping/scan", source: "ems_esp", plant: t });
  }
  async listIcons() {
    return this.standalone ? Ut(Lt, []) : (await this.hass.callWS({ type: "copilot/icons/list" })).icons;
  }
  async uploadIcon(t, e, s, i) {
    if (this.standalone) {
      const n = Ut(Lt, []), o = { id: Math.random().toString(16).slice(2, 14), name: t, mime: e, iso: i, size: s.length, data_url: `data:${e};base64,${s}` };
      return n.push(o), xe(Lt, n), o;
    }
    return (await this.hass.callWS({ type: "copilot/icons/upload", name: t, mime: e, data: s, iso: i })).icon;
  }
  async deleteIcon(t) {
    if (this.standalone) return xe(Lt, Ut(Lt, []).filter((e) => e.id !== t));
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
const Pi = {
  // navigation
  "nav.overview": "Übersicht",
  "nav.messages": "Meldungen",
  "nav.check": "Check",
  "chk.title": "Anlagen-Check",
  "chk.subtitle": "Auswertung der letzten 24 Stunden nach gängigen Faustregeln für Wärmepumpenanlagen.",
  "chk.demo": "Demo: Daten aus der Simulation.",
  "chk.refresh": "Neu auswerten",
  "chk.running": "Werte den Verlauf aus …",
  "chk.ok": "In Ordnung",
  "chk.nodata": "Keine passenden Daten im Verlauf – Werte zuordnen oder später erneut prüfen.",
  "chk.mixing.title": "Mischungsverlust am Puffer",
  "chk.mixing.detail": "Im Heizbetrieb ist der WP-Vorlauf (TC1) im Mittel {value} K wärmer als der Puffer oben ({minutes} min ausgewertet). Ziel: ≤ 2 K.",
  "chk.mixing.hint": "Der Wärmepumpenkreis mischt sich im Puffer mit kälterem Wasser. Meist fördert PC0 deutlich mehr als PC1 oder umgekehrt – Pumpenstufen bzw. Volumenströme angleichen und den Puffer-Fühler (T0) prüfen.",
  "chk.cycling.title": "Takten des Verdichters",
  "chk.cycling.detail": "Starts in {hours} h: {starts} (Ø {perHour} pro Stunde, höchstens {maxPerHour} in einer Stunde), mittlere Laufzeit {avgRun} min je Start. Ziel: höchstens 3 Starts pro Stunde, Laufzeit ≥ 20 min.",
  "chk.cycling.hint": "Häufiges Takten kostet Effizienz und Lebensdauer. Ursachen: Heizkurve zu hoch, zu kleine Schalthysterese, zu wenig nutzbares Volumen (Thermostatventile geschlossen) oder Leistung in der Übergangszeit zu groß.",
  "chk.spread.title": "Spreizung Vorlauf/Rücklauf",
  "chk.spread.detail": "Im Heizbetrieb liegt die Spreizung TC1−TC0 im Mittel bei {value} K. Zielbereich: 3–8 K.",
  "chk.spread.hint_low": "Sehr kleine Spreizung: Volumenstrom höher als nötig (Pumpenleistung) – kostet Strom, oft auch höherer Mischungsverlust.",
  "chk.spread.hint_high": "Große Spreizung: zu wenig Volumenstrom – Partikelfilter SC1, Abgleich und Pumpeneinstellung prüfen.",
  "chk.defrost.title": "Abtauungen",
  "chk.defrost.detail": "{count} Abtauungen, zusammen {minutes} min = {share} % der Laufzeit. Bis etwa 8 % ist bei feuchter Witterung normal.",
  "chk.defrost.hint": "Viele Abtauungen: Verdampfer verschmutzt oder zugestellt, Luftkurzschluss am Aufstellort oder Kondensatablauf/Wannenheizung prüfen.",
  "chk.aux.title": "Elektrischer Zuheizer",
  "chk.aux.detail": "Zuheizer in den letzten 24 h: {minutes} min aktiv.",
  "chk.aux.hint": "Der Zuheizer arbeitet mit COP 1. Häufiger Einsatz deutet auf zu hohe Anforderungen (Heizkurve, Warmwasser-Temperatur, Desinfektion) oder Einstellungen zur Bivalenz/Zuheizer-Verzögerung hin.",
  "chk.pressure.title": "Anlagendruck",
  "chk.pressure.detail": "Druck in 24 h zwischen {min} und {max} bar (erlaubt {lo}–{hi} bar).",
  "chk.pressure.hint": "Druck nah an der Grenze oder fallend: Vordruck des Ausdehnungsgefäßes prüfen, Anlage auf Undichtigkeiten kontrollieren, ggf. nachfüllen (VE-Wasser).",
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
}, Di = {
  "nav.overview": "Overview",
  "nav.messages": "Messages",
  "nav.check": "Check",
  "chk.title": "Plant check",
  "chk.subtitle": "Last 24 hours evaluated against common rules of thumb for heat pump systems.",
  "chk.demo": "Demo: data from the simulation.",
  "chk.refresh": "Evaluate again",
  "chk.running": "Evaluating history …",
  "chk.ok": "OK",
  "chk.nodata": "No suitable history – map the values or check again later.",
  "chk.mixing.title": "Mixing loss at the buffer",
  "chk.mixing.detail": "In heating mode the heat pump flow (TC1) is on average {value} K warmer than the top of the buffer ({minutes} min evaluated). Target: ≤ 2 K.",
  "chk.mixing.hint": "The heat pump circuit mixes with colder water in the buffer. Usually PC0 pumps much more than PC1 or vice versa – balance pump settings / flow rates and check the buffer sensor (T0).",
  "chk.cycling.title": "Compressor cycling",
  "chk.cycling.detail": "Starts in {hours} h: {starts} (avg {perHour} per hour, at most {maxPerHour} in one hour), average run time {avgRun} min per start. Target: at most 3 starts per hour, run time ≥ 20 min.",
  "chk.cycling.hint": "Frequent cycling costs efficiency and lifetime. Causes: heating curve too high, small switching hysteresis, too little usable volume (closed thermostatic valves) or too much output in mild weather.",
  "chk.spread.title": "Flow/return spread",
  "chk.spread.detail": "In heating mode the spread TC1−TC0 averages {value} K. Target range: 3–8 K.",
  "chk.spread.hint_low": "Very small spread: flow rate higher than needed (pump power) – costs electricity and often raises mixing loss.",
  "chk.spread.hint_high": "Large spread: too little flow – check particle filter SC1, balancing and pump setting.",
  "chk.defrost.title": "Defrosts",
  "chk.defrost.detail": "{count} defrosts, {minutes} min in total = {share} % of run time. Up to about 8 % is normal in humid weather.",
  "chk.defrost.hint": "Many defrosts: evaporator dirty or obstructed, air short-circuit at the installation site, or check condensate drain / drain pan heating.",
  "chk.aux.title": "Electric backup heater",
  "chk.aux.detail": "Backup heater active for {minutes} min in the last 24 h.",
  "chk.aux.hint": "The backup heater works at COP 1. Frequent use points to high demands (heating curve, DHW temperature, disinfection) or bivalence / backup delay settings.",
  "chk.pressure.title": "System pressure",
  "chk.pressure.detail": "Pressure in 24 h between {min} and {max} bar (allowed {lo}–{hi} bar).",
  "chk.pressure.hint": "Pressure close to the limit or dropping: check the expansion vessel pre-charge, look for leaks, refill if needed (demineralised water).",
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
}, xs = { de: Pi, en: Di };
let xt = "de";
function ks(a) {
  xt = a;
}
function Ti() {
  return xt;
}
function Ss(a, t) {
  return a === "de" || a === "en" ? a : (t || "de").toLowerCase().startsWith("de") ? "de" : "en";
}
function c(a, t) {
  let e = xs[xt][a] ?? xs.de[a] ?? a;
  return t && (e = e.replace(/\{(\w+)\}/g, (s, i) => {
    const n = t[i];
    return typeof n == "number" ? K(n, Number.isInteger(n) ? 0 : 1) : n == null ? "" : String(n);
  })), e;
}
function K(a, t = 1) {
  return a.toLocaleString(xt === "de" ? "de-DE" : "en-GB", {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  });
}
function ti(a) {
  return new Date(a * 1e3).toLocaleTimeString(xt === "de" ? "de-DE" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function Li(a) {
  const t = new Date(a * 1e3), e = /* @__PURE__ */ new Date();
  return t.toDateString() === e.toDateString() ? ti(a) : t.toLocaleString(xt === "de" ? "de-DE" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function Wi(a) {
  const t = Math.round(a / 60);
  return t < 60 ? `${t} min` : `${Math.floor(t / 60)} h ${t % 60} min`;
}
const Ci = {
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
}, Ms = { supply_temp: "F", return_temp: "R", flow_temp: "F", target_flow_temp: "Set", room_temp: "Room", dhw_temp: "DHW", dhw_setpoint: "Set" };
function zs(a, t) {
  return xt === "en" && t in Ms ? Ms[t] : Ci[t] ?? "";
}
function vt(a, t) {
  const e = `slot.${a}.${t}`, s = c(e);
  return s === e ? c(`slot.${t}`) : s;
}
const k = 20, j = (a, t = !1) => ({ key: a, kind: "temp", show: t }), J = {
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
      j("air_in_temp"),
      { key: "compressor_starts", kind: "count" },
      j("evap_in_temp"),
      j("comp_in_temp"),
      j("comp_out_temp"),
      j("hp_temp"),
      j("lp_temp"),
      j("drain_pan_temp"),
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
      j("supply_temp", !0),
      j("return_temp", !0),
      j("target_flow_temp", !0),
      { key: "pressure", kind: "pressure", show: !0 },
      { key: "flow", kind: "flow" },
      { key: "aux_level", kind: "percent", show: !0 },
      { key: "pc0_running", kind: "bool" },
      { key: "pc0_speed", kind: "percent", show: !0 },
      { key: "vw1_position", kind: "bool" },
      { key: "pc1_running", kind: "bool" },
      { key: "pc1_speed", kind: "percent" },
      j("dhw_temp", !0),
      j("dhw_setpoint"),
      { key: "dhw_charging", kind: "bool" },
      j("buffer_temp", !0),
      j("condenser_temp"),
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
    slots: [j("temp_top", !0), j("temp_mid"), j("temp_bottom", !0)]
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
      j("temp_top", !0),
      j("temp_bottom"),
      j("setpoint", !0),
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
      j("target_flow_temp"),
      { key: "room_temp", kind: "temp", show: !0, pos: [3.5, -0.9] },
      j("room_setpoint"),
      { key: "mode", kind: "enum" },
      { key: "summer_mode", kind: "enum" },
      { key: "operating_state", kind: "enum" },
      j("design_temp"),
      { key: "offset_temp", kind: "temp" },
      j("min_flow_temp"),
      j("max_flow_temp")
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
    slots: [{ key: "flow", kind: "flow_lmin", show: !0, pos: [1.2, -0.8] }, j("temp")]
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
J.floor_heating.slots = J.radiators.slots;
function ft(a) {
  return a.type === "value_tile" ? (a.props.entries || []).map((t) => ({
    key: t.slot,
    kind: t.kind || "text",
    show: !0
  })) : J[a.type].slots;
}
function Dt(a) {
  const t = J[a.type];
  if (!t.variants) return;
  const e = a.props?.variant || as(a.model)?.variant || "wall_e";
  return t.variants[e] || Object.values(t.variants)[0];
}
function Pt(a) {
  const t = Dt(a);
  return t ? { w: t.w, h: t.h } : { w: J[a.type].w, h: J[a.type].h };
}
function Xt(a) {
  return Dt(a)?.ports ?? J[a.type].ports;
}
function Es(a) {
  return Dt(a)?.badges ?? J[a.type].badges;
}
function As(a) {
  const t = Dt(a);
  return ft(a).map((e) => t ? { ...e, pos: t.pos?.[e.key] ?? e.pos, at: t.at?.[e.key] ?? e.at } : e);
}
function Ct(a) {
  const t = { ...J[a.type], ...Pt(a) };
  if (a.type === "value_tile") {
    const s = (a.props.entries || []).length;
    return { w: t.w, h: 2 + Math.ceil(s * 1.3) };
  }
  const e = a.rot || 0;
  return e === 90 || e === 270 ? { w: t.h, h: t.w } : { w: t.w, h: t.h };
}
const Ps = ["r", "b", "l", "t"];
function Oi(a, t) {
  const e = t / 90 % 4;
  return Ps[(Ps.indexOf(a) + e) % 4];
}
function rt(a, t) {
  const e = Xt(a).find((l) => l.id === t);
  if (!e) return null;
  const s = a.rot || 0, { w: i, h: n } = Pt(a);
  let { x: o, y: r } = e;
  return s === 90 ? [o, r] = [n - r, o] : s === 180 ? [o, r] = [i - o, n - r] : s === 270 && ([o, r] = [r, i - o]), { x: a.x + o, y: a.y + r, dir: Oi(e.dir, s), def: e };
}
const ee = [
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
], Hi = { "buderus-wsw": "buderus-wsw186i" }, os = [
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
], Bi = {
  "buderus-wlw186i-t": "buderus-wlw186i-t180",
  "buderus-wlw186i-b": "buderus-wlw186i-e",
  "bosch-aw-b": "bosch-aw-e"
};
function as(a) {
  const t = a && Bi[a] || a;
  return os.find((e) => e.id === t);
}
function rs(a) {
  const t = a && Hi[a] || a;
  return ee.find((e) => e.id === t) || ee.find((e) => e.id === "generic-air");
}
const ei = /* @__PURE__ */ new Set(["on", "true", "1", "yes", "ja", "ein", "an", "active", "aktiv", "open", "offen"]);
function N(a) {
  return !a || !a.available || a.raw === null ? !1 : typeof a.raw == "boolean" ? a.raw : a.num !== null ? a.num > 0 : ei.has(String(a.raw).trim().toLowerCase());
}
const Ri = {
  off: ["off", "aus", "uit", "av", "arrêt", "standby", "bereit"],
  heating: ["heating", "heizen", "verwarmen", "uppvärmning", "chauffage", "ogrzewanie", "riscaldamento"],
  cooling: ["cooling", "kühlen", "koelen", "kyler", "refroidissement", "chłodzenie", "raffreddamento"],
  hot_water: ["hot water", "hot_water", "warmwasser", "warm water", "varmvatten", "eau chaude", "c.w.u.", "acqua calda"],
  pool_heating: ["pool heating", "pool beheizen", "zwembadverwarming", "chauffage piscine"],
  pool: ["pool", "zwembad", "piscine", "basen", "piscina"],
  defrost: ["defrost", "abtauen", "ontdooien", "avfrostning", "dégivrage", "odladzanie", "scongelamento"],
  compressor_alarm: ["compressor alarm", "compressor_alarm", "kompressor alarm", "kompressoralarm"]
};
function ye(a) {
  if (!a || !a.available || a.raw === null) return;
  const t = String(a.raw).trim().toLowerCase();
  for (const [e, s] of Object.entries(Ri)) if (s.includes(t)) return e;
  return t.includes("abtau") || t.includes("defrost") ? "defrost" : t;
}
function Ii(a, t, e) {
  if (a === void 0 || a === "unavailable" || a === "unknown" || a === "")
    return { raw: null, num: null, unit: t, entity: e, available: !1 };
  const s = Number(a);
  return { raw: a, num: Number.isFinite(s) ? s : null, unit: t, entity: e, available: !0 };
}
class Vi {
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
    return Ii(e?.state, e?.attributes?.unit_of_measurement, t);
  }
  async history(t, e, s) {
    const i = this.entityOf(t, e);
    return i ? Ni(this.hass, i, s) : [];
  }
}
async function Ni(a, t, e) {
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
    return Number.isFinite(p) || (p = ei.has(l) ? 1 : l === "off" || l === "false" ? 0 : null), { t: r.lu, v: p, raw: String(r.s) };
  });
}
function Le(a, t) {
  const e = /* @__PURE__ */ new Set(), s = (i) => t.get(a, i);
  switch (a.type) {
    case "pump":
    case "mixer":
      (N(s("running")) || N(s("speed")) || N(s("flow"))) && e.add("running"), a.type === "mixer" && N(s("position")) && e.add("running");
      break;
    case "valve_3way": {
      const i = s("position");
      e.add(N(i) ? "b" : "a");
      break;
    }
    case "outdoor_unit": {
      const i = ye(s("activity"));
      (N(s("compressor_on")) || N(s("compressor_speed")) || N(s("heat_power"))) && e.add("running"), i === "defrost" && e.add("defrost"), i === "compressor_alarm" && e.add("alarm"), i && i !== "off" && i !== "compressor_alarm" && e.add("running"), i && e.add(`mode_${i}`);
      break;
    }
    case "indoor_unit": {
      (N(s("aux_level")) || N(s("aux_step1")) || N(s("aux_step2")) || N(s("aux_step3"))) && e.add("aux"), (N(s("pc0_running")) || N(s("pc0_speed")) || N(s("flow"))) && e.add("running"), e.add(N(s("vw1_position")) || !a.bindings.vw1_position && N(s("dhw_active")) && !N(s("heating_active")) ? "b" : "a"), (N(s("pc1_running")) || N(s("pc1_speed"))) && e.add("pc1"), N(s("dhw_charging")) && e.add("charging");
      const i = N(s("dhw_active")) || e.has("running") && e.has("b") ? "hot_water" : N(s("heating_active")) || e.has("running") ? "heating" : "off";
      e.add(`mode_${i}`);
      break;
    }
    case "dhw_tank":
      N(s("charging")) && e.add("charging"), N(s("disinfecting")) && e.add("disinfecting");
      break;
    case "tap":
      N(s("flow")) && e.add("flowing");
      break;
    case "radiators":
    case "floor_heating":
      e.add("on");
      break;
  }
  return e;
}
function Ds(a, t) {
  const e = t.get(a.c);
  return e ? a.s.startsWith("!") ? !e.has(a.s.slice(1)) : e.has(a.s) : !1;
}
function Ki(a, t) {
  const e = a.flow || [], s = a.flowAny || [];
  return e.length === 0 && s.length === 0 ? !1 : e.every((i) => Ds(i, t)) && (s.length === 0 || s.some((i) => Ds(i, t)));
}
function Ui(a, t) {
  const e = new Map(a.components.map((n) => [n.id, n])), s = /* @__PURE__ */ new Map(), i = (n) => {
    const o = e.get(n.c);
    if (!o) return;
    const r = rt(o, n.p);
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
      if (l && J[l.type].passive) {
        const p = a.pipes.find((d) => d.to.c === l.id && s.has(d.id));
        if (p) {
          s.set(r.id, s.get(p.id)), o = !0;
          continue;
        }
      }
      if (n === 5 || !l || !J[l.type].passive) {
        const p = i(r.to);
        p !== void 0 && (s.set(r.id, p), o = !0);
      }
    }
    if (!o && n > 0) break;
  }
  return s;
}
const ji = {
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
function Ot(a, t) {
  return ft(a).find((e) => e.key === t)?.kind || "text";
}
function _t(a, t) {
  if (!a) return { text: c("none"), unit: "" };
  if (!a.available) return { text: c("none"), unit: "" };
  if (t === "bool") return { text: N(a) ? c("on") : c("off"), unit: "" };
  if (t === "enum" && a.num === null) {
    const o = `mode.${ye(a)}`, r = c(o);
    return { text: r === o ? String(a.raw) : r, unit: "" };
  }
  let e = a.unit ?? ji[t] ?? "";
  if (a.num === null) return { text: String(a.raw), unit: "" };
  let s = a.num;
  t === "power_w" && e === "W" && Math.abs(s) >= 1e3 && (s = s / 1e3, e = "kW");
  const i = t === "count" || t === "percent" || t === "flow" || t === "duration" || t === "power_w" && e === "W" || t === "energy" && s >= 100 ? 0 : 1;
  return { text: K(s, i), unit: e };
}
function tt(a, t) {
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
  if (a <= e[0][0]) return ke(e[0][1]);
  for (let s = 1; s < e.length; s++) {
    const [i, n] = e[s], [o, r] = e[s - 1];
    if (a <= i) {
      const l = (a - o) / (i - o);
      return ke([0, 1, 2].map((p) => r[p] + (n[p] - r[p]) * l));
    }
  }
  return ke(e[e.length - 1][1]);
}
function ke(a) {
  return `rgb(${a.map((t) => Math.round(t)).join(",")})`;
}
const Fi = {
  supply: "#ff7a45",
  return: "#4d9fff",
  dhw_hot: "#ff4f8b",
  dhw_cold: "#38d0ff",
  circulation: "#b07cff"
}, Zi = {
  nominal: 7.1,
  source: "air",
  bufferL: 120,
  dhwL: 274,
  auxKw: 6,
  heatLoad: 6.2,
  designTemp: -12,
  floor: !1
}, kt = 4.186 / 3600, Ts = 10, ct = 21, Gi = 10, Yi = [
  // hour of day, minutes, litres per minute (mixed at 40 °C)
  [6.5, 7, 9],
  [6.85, 6, 9],
  [7.2, 5, 8],
  [12.25, 2, 4],
  [18.6, 3, 5],
  [20.4, 8, 9],
  [21.1, 6, 9]
], qi = [
  [6, 7.5],
  [11.5, 12.5],
  [17.5, 19]
];
class Ji {
  constructor(t = {}, e = Date.now() / 1e3, s) {
    this.speed = 60, this.outdoorMean = 2, this.dailySwing = 2.5, this.tOut = 2, this.tRoom = 20.8, this.bufTop = 38, this.bufBot = 33, this.dhwTop = 49, this.dhwBot = 43, this.tVl = 30, this.tRl = 28, this.tVlHc = 38, this.tRlHc = 32, this.mode = "off", this.pTh = 0, this.pEl = 0, this.cop = 0, this.running = !1, this.lastStart = -1e9, this.lastStop = -1e9, this.pc0Overrun = 0, this.ice = 0.3, this.defrostLeft = 0, this.aux = 0, this.auxTimer = 0, this.heatDemand = !1, this.dhwDemand = !1, this.tapFlow = 0, this.tapLeft = 0, this.qEmit = 0, this.starts = 0, this.e = { el: 0, heat: 0, elHeat: 0, elDhw: 0, heatHeat: 0, heatDhw: 0, aux: 0 }, this.dim14a = !1, this.pv = !1, this.disinfect = !1, this.fault = !1, this.lastDrawDay = /* @__PURE__ */ new Map(), this.days = /* @__PURE__ */ new Map(), this.sampleAcc = 0, this.hist = /* @__PURE__ */ new Map(), this.active = /* @__PURE__ */ new Map(), this.messages = [], this.labels = { dhw: "WW" }, this.listeners = [], this.p = { ...Zi, ...t }, s && (this.labels = { ...this.labels, ...s }), this.time = e - 24 * 3600, this.prefill(e);
  }
  prefill(t) {
    const e = this.listeners;
    for (this.listeners = []; this.time < t; ) this.step(Ts);
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
      const i = Math.min(Ts, e);
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
    const t = this.p.floor ? 35 : 50, e = (t - ct) / (ct - this.p.designTemp), s = this.pv ? 5 : 0;
    return Math.max(25, Math.min(t + 5, ct + (ct - this.tOut) * e + s));
  }
  dhwSetpoint() {
    return this.disinfect ? 60 : this.pv ? 55 : 50;
  }
  step(t) {
    this.time += t;
    const e = this.hour(), s = t / 3600, i = this.p, n = this.outdoorMean + this.dailySwing * Math.cos((e - 15) / 24 * 2 * Math.PI);
    this.tOut += (n - this.tOut) * Math.min(1, t / 1800);
    const o = this.tOut < 16, r = this.curveSetpoint(), l = o ? 650 * kt * 3600 / 3600 : 0, p = i.heatLoad * (i.floor, 1), d = i.floor ? 30 - ct : 45 - ct, h = i.floor ? 1.1 : 1.3;
    let m = 0;
    if (this.tVlHc = this.bufTop, l > 0) {
      let Z = this.tVlHc - 3;
      for (let pt = 0; pt < 4; pt++)
        m = p * Math.pow(Math.max(0, (Z - this.tRoom) / d), h), Z = this.tVlHc - m / (2 * l);
      m *= Math.max(0.1, Math.min(1, 1 - (this.tRoom - ct - 0.2) * 1.5)), this.tRlHc = this.tVlHc - m / l;
    } else
      this.tRlHc = this.bufBot;
    this.qEmit = m;
    const f = i.heatLoad / (ct - i.designTemp);
    this.tRoom += (m - f * (this.tRoom - this.tOut) + 0.35) * s / 9;
    const g = Math.floor(this.time / 86400);
    Yi.forEach(([Z, pt, ri], ps) => {
      e >= Z && e < Z + 0.1 && this.lastDrawDay.get(ps) !== g && (this.lastDrawDay.set(ps, g), this.startDraw(pt, ri));
    }), this.tapLeft > 0 && (this.tapLeft -= t, this.tapLeft <= 0 && (this.tapFlow = 0));
    const b = qi.some(([Z, pt]) => e >= Z && e < pt), x = i.dhwL / 2 * kt, y = this.tapFlow * 60 * kt * (40 - Gi), T = 1.38 / 24 / 2 + (b ? 0.12 : 0) / 2;
    this.dhwTop -= (y * 0.35 + T) * s / x, this.dhwBot -= (y * 0.65 + T) * s / x;
    const S = this.dhwSetpoint();
    (this.dhwTop < S - 5 || this.dhwBot < S - 14 || this.disinfect && this.dhwBot < 59) && (this.dhwDemand = !0), this.dhwBot >= S - 0.5 && this.dhwTop >= S - 0.5 && (this.dhwDemand = !1, this.disinfect && (this.disinfect = !1, this.condition("dis", !1, "info", "dhw_disinfection", {}, "dhw"))), o && this.bufTop < r - 2 && (this.heatDemand = !0);
    const A = this.time - this.lastStart > 600;
    (!o || this.bufTop > r + 2.5 && A) && (this.heatDemand = !1);
    let P = this.fault ? "compressor_alarm" : this.dhwDemand ? "hot_water" : this.heatDemand ? "heating" : "off";
    this.defrostLeft > 0 && !this.fault && (P = "defrost");
    const V = P === "heating" || P === "hot_water" || P === "defrost";
    V && !this.running ? this.time - this.lastStop >= 480 || P === "defrost" ? (this.running = !0, this.lastStart = this.time, this.starts++, this.pTh = this.pMin()) : P = "off" : !V && this.running && (this.time - this.lastStart > 600 || this.fault ? (this.running = !1, this.lastStop = this.time, this.pc0Overrun = 180) : P = this.mode === "hot_water" ? "hot_water" : "heating"), this.mode = this.running ? P : this.fault ? "compressor_alarm" : "off";
    const Y = this.pMax(), E = this.pMin();
    let L = 0;
    if (this.running && this.mode === "heating" ? L = this.qEmit + 2.2 * (r + 1 - this.bufTop) : this.running && this.mode === "hot_water" && (L = Math.min(Y * 0.9, Math.max(E, (60 - this.dhwBot - 3) * 0.9))), this.running && this.mode !== "defrost") {
      L = Math.max(E, Math.min(Y, L)), this.pTh < E && (this.pTh = E);
      const Z = 0.5 * (t / 60);
      this.pTh += Math.max(-Z * 2, Math.min(Z, L - this.pTh));
    } else this.mode === "defrost" ? this.pTh = -3 : this.pTh = 0;
    let U = 0;
    this.dim14a || (this.fault && o ? U = i.auxKw : this.mode === "heating" && this.bufTop < r - 5 && this.pTh >= Y * 0.95 ? (this.auxTimer += t, this.auxTimer > 1200 && (U = Math.min(i.auxKw, 3))) : this.auxTimer = 0, this.tOut < i.designTemp + 2 && this.mode === "heating" && (U = Math.max(U, Math.min(i.auxKw, 3))), this.disinfect && this.mode === "hot_water" && this.dhwBot > 52 && (U = Math.min(i.auxKw, 3))), this.fault && o && U > 0 && (this.heatDemand = !0), this.aux = U;
    const Q = this.running || this.pc0Overrun > 0 || this.fault && this.aux > 0;
    !this.running && this.pc0Overrun > 0 && (this.pc0Overrun -= t);
    const C = Q ? 1100 * kt : 0, O = this.mode === "hot_water", D = (this.running ? this.pTh : 0) + this.aux;
    O ? this.tRl = this.dhwBot + 2 : this.tRl = Q ? this.bufBot : this.tRl + (22 - this.tRl) * Math.min(1, t / 3600), this.tVl = C > 0 ? this.tRl + D / C : this.tVl + (this.tRl - this.tVl) * Math.min(1, t / 600);
    const z = (i.bufferL + 60) / 2 * kt, R = O ? 0 : C, M = 0.05 / 2, W = R * (this.tVl - this.bufTop) + (l > R ? (l - R) * (this.bufBot - this.bufTop) : 0) - M, H = l * (this.tRlHc - this.bufBot) + (R > l ? (R - l) * (this.bufTop - this.bufBot) : 0) - M;
    if (this.bufTop += W * s / z, this.bufBot += H * s / z, this.bufBot > this.bufTop) {
      const Z = (this.bufBot + this.bufTop) / 2;
      this.bufBot = this.bufTop = Z;
    }
    if (O && (this.dhwBot += D * s / x, this.dhwBot > this.dhwTop)) {
      const Z = (this.dhwBot + this.dhwTop) / 2;
      this.dhwBot = this.dhwTop = Z;
    }
    if (this.running && this.mode !== "defrost") {
      const Z = this.tVl + 273.15 + 3, pt = (this.p.source === "air" ? this.tOut - 6 : 0) + 273.15;
      this.cop = Math.max(1.4, Math.min(7.5, 0.57 * Z / Math.max(5, Z - pt))), this.pEl = this.pTh / this.cop + 0.06;
    } else this.mode === "defrost" ? (this.cop = 0, this.pEl = 1.1) : (this.cop = 0, this.pEl = 0.012 + (Q ? 0.03 : 0));
    const F = Math.max(0, this.running ? this.pTh : 0);
    this.e.el += (this.pEl + this.aux) * s, this.e.aux += this.aux * s, this.e.heat += (F + this.aux) * s;
    const q = new Date(this.time * 1e3), et = new Date(q.getFullYear(), q.getMonth(), q.getDate()).getTime();
    let lt = this.days.get(et);
    if (!lt) {
      this.days.set(et, lt = { heat: 0, el: 0, heatDhw: 0, elDhw: 0, aux: 0 });
      for (const Z of [...this.days.keys()]) Z < et - 3 * 864e5 && this.days.delete(Z);
    }
    if (lt.heat += (F + this.aux) * s, lt.el += (this.pEl + this.aux) * s, lt.aux += this.aux * s, O && (lt.heatDhw += F * s, lt.elDhw += this.pEl * s), O ? (this.e.elDhw += this.pEl * s, this.e.heatDhw += F * s) : (this.e.elHeat += this.pEl * s, this.e.heatHeat += F * s), this.defrostLeft > 0)
      this.defrostLeft -= t, this.defrostLeft <= 0 && (this.ice = 0, this.defrostLeft = 0);
    else if (this.p.source === "air" && this.running && this.tOut < 7 && this.tOut > -15) {
      const Z = this.tOut > -2 ? 1.3 - Math.abs(this.tOut - 1) * 0.12 : 0.9 + this.tOut * 0.04;
      this.ice += Math.max(0.05, Z) * (this.pTh / Y) * s, this.ice >= 1 && (this.defrostLeft = 240 + Math.random() * 120);
    }
    this.emitConditions(), this.values = this.buildValues(r, S, b, Q, C), this.sampleAcc += t, this.sampleAcc >= 60 && (this.sampleAcc = 0, this.sample());
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
        flow: i ? Math.round(n / kt) : 0,
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
        room_setpoint: ct,
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
        if (o === null && i !== "activity") continue;
        const r = `${e}.${i}`;
        let l = this.hist.get(r);
        l || this.hist.set(r, l = []), l.push(o === null ? { t, v: null, raw: String(n) } : { t, v: o }), l.length > 1500 && l.splice(0, l.length - 1440);
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
function Ls(a) {
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
function Se(a) {
  if (!a) return {};
  const t = a.components.find((l) => l.type === "outdoor_unit"), e = a.components.find((l) => l.type === "indoor_unit"), s = a.components.find((l) => l.type === "buffer"), i = a.components.find((l) => l.type === "dhw_tank"), n = as(e?.model), o = rs(t?.model), r = a.components.filter((l) => l.type === "radiators" || l.type === "floor_heating");
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
const Xi = {}, Ws = {
  pc0_running: ["pc0", "running"],
  pc0_speed: ["pc0", "speed"],
  vw1_position: ["vw1", "position"],
  pc1_running: ["pc1", "running"],
  pc1_speed: ["pc1", "speed"],
  dhw_temp: ["dhw", "temp_top"],
  dhw_setpoint: ["dhw", "setpoint"],
  dhw_charging: ["dhw", "charging"],
  buffer_temp: ["buffer", "temp_top"]
};
class Qi {
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
      const n = Ws[e];
      if (n) {
        const o = Dt(t)?.id;
        return e.startsWith("dhw_") && o !== "t180" || e === "buffer_temp" && o !== "tp70" || e.startsWith("pc1") && o === "wall_e" ? void 0 : this.wrap(this.sim.values[n[0]]?.[n[1]]);
      }
    }
    const s = Ls(t);
    if (!s) return;
    let i = this.sim.values[s]?.[e];
    if (i !== void 0)
      return s === "hc" && typeof i == "number" && Number(t.props.circuit) > 1 && ["flow_temp", "return_temp", "target_flow_temp"].includes(e) && (i = Math.round((i - (t.type === "floor_heating" ? 12 : 2)) * 10) / 10), this.wrap(i, Xi[e]);
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
    const i = t.type === "indoor_unit" ? Ws[e] : void 0;
    if (i) return this.sim.history(i[0], i[1], s);
    const n = Ls(t);
    return n ? this.sim.history(n, e, s) : [];
  }
}
function We() {
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
class tn {
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
const $ = (a, t) => ({ c: a, p: t });
function ls(a, t) {
  const e = new tn(), s = as(a.indoorModel), i = s?.variant || "wall_e", n = !!s?.dhw, o = !!s?.buffer, r = a.dhw === "tank" && !n, l = a.dhw === "tank" || n, p = a.buffer !== "none" && !o, d = { c: "iu", s: "running" }, h = l ? [{ c: "iu", s: "a" }] : [], m = { c: "iu", s: "b" }, f = { c: "pc1", s: "running" }, g = {
    aux_kw: a.aux ? a.auxKw : 0,
    input_labels: { input1: "§14a / EVU", input4: "PV" },
    input_levels: { input1: "warning" },
    pressure_min: 1,
    pressure_max: 2.7,
    buffer_l: s?.buffer
  }, b = i !== "wall_e", x = b ? 12 : 3;
  e.add("ou", "outdoor_unit", a.outdoorLabel || c("type.outdoor_unit"), 1, x, {
    model: a.outdoorModel,
    props: { nominal_kw: a.nominalKw }
  });
  const y = 14, T = b ? 12 : 2;
  e.add("iu", "indoor_unit", a.indoorLabel || c("type.indoor_unit"), y, T, { model: a.indoorModel, props: g });
  const S = e.components.find((E) => E.id === "iu"), A = (E) => rt(S, E), P = { y: x + 5 };
  if (b) {
    const E = T, L = (M) => A(M).x, U = Math.max(...["src_in", "src_out", "sup", "ret", "dhw_sup", "dhw_ret", "dhw_hot", "dhw_cold", "circ"].filter((M) => rt(S, M)).map(L));
    e.pipe($("ou", "out"), $("iu", "src_in"), "supply", [d], { via: [[12, P.y], [12, E - 9], [L("src_in"), E - 9]] }), e.pipe($("iu", "src_out"), $("ou", "in"), "return", [d], { via: [[L("src_out"), E - 10], [11, E - 10]] });
    let Q = $("iu", "sup"), C = $("iu", "ret"), O = o ? [f] : [d, ...h], D = [[L("sup"), E - 2]];
    const z = E - 4;
    let R = U + 14;
    if (p) {
      const M = U + 2, W = M + 10, H = E + 4;
      e.add("buf", "buffer", a.bufferLabel || c("type.buffer"), W, H, { props: { volume: a.bufferVolume } }), e.pipe($("iu", "sup"), $("buf", "in_sup"), "supply", [d, ...h], { via: [[L("sup"), E - 2], [W + 1, E - 2]] });
      const F = [d, ...h];
      let q = $("buf", "in_ret"), et = [[W + 2, z]];
      a.separator && (e.add("sep", "separator", c("wz.separator_short"), M + 6, z - 1, { rot: 180 }), e.add("sc1", "separator", "SC1", M + 3, z - 1, { rot: 180, props: { filter: !0 } }), e.pipe(q, $("sep", "in"), "return", F, { via: et }), e.pipe($("sep", "out"), $("sc1", "in"), "return", F), q = $("sc1", "out"), et = []), a.expansion && (e.add("jmag", "junction", "", M, z), e.add("mag", "expansion_vessel", "MAG", M - 1, z - 5), e.pipe($("mag", "conn"), $("jmag", "t"), "return", []), e.pipe(q, $("jmag", "r"), "return", F, { via: et }), q = $("jmag", "l"), et = []), e.pipe(q, $("iu", "ret"), "return", F, { via: [...et, [L("ret"), z]] }), Q = $("buf", "out_sup"), C = $("buf", "out_ret"), O = [f], D = [], R = W + 7;
    }
    if (Cs(e, a, Q, C, O, D, p || o, R, E + 4), n)
      Me(e, a, $("iu", "dhw_hot"), $("iu", "circ"), $("iu", "dhw_cold"), y - 1, E + 18);
    else if (r) {
      const M = y - 9, W = E + 8;
      e.add("dhw", "dhw_tank", a.dhwLabel || c("type.dhw_tank"), M, W, { props: { volume: a.dhwVolume } }), e.pipe($("iu", "dhw_sup"), $("dhw", "coil_in"), "supply", [d, m], { via: [[L("dhw_sup"), E - 1], [M + 8, E - 1], [M + 8, W + 4]] }), e.pipe($("dhw", "coil_out"), $("iu", "dhw_ret"), "return", [d, m], { via: [[M + 7, W + 9], [M + 7, E - 3], [L("dhw_ret"), E - 3]] }), Me(e, a, $("dhw", "hot"), $("dhw", "circ"), $("dhw", "cold"), M, W);
    }
  } else {
    const E = T + 12;
    e.pipe($("ou", "out"), $("iu", "src_in"), "supply", [d], { via: [[12, P.y], [12, E + 1]] }), e.pipe($("iu", "src_out"), $("ou", "in"), "return", [d], { via: [[y + 1, E + 2], [11, E + 2]] });
    const L = E + 4;
    let U = $("iu", "ret"), Q = [[y + 6, L]];
    const C = [d, ...h];
    a.separator && e.add("sc1", "separator", "SC1", y + 8, L - 1, { rot: 180, props: { filter: !0 } }), a.expansion && (e.add("jmag", "junction", "", y + 12, L), e.add("mag", "expansion_vessel", "MAG", y + 11, L + 1, { rot: 180 }), e.pipe($("mag", "conn"), $("jmag", "b"), "return", [])), a.separator && e.add("sep", "separator", c("wz.separator_short"), y + 14, L - 1, { rot: 180 });
    const O = [];
    a.separator && O.push({ inP: $("sep", "in"), outP: $("sep", "out") }), a.expansion && O.push({ inP: $("jmag", "r"), outP: $("jmag", "l") }), a.separator && O.push({ inP: $("sc1", "in"), outP: $("sc1", "out") });
    for (let H = 0; H < O.length - 1; H++) e.pipe(O[H].outP, O[H + 1].inP, "return", C);
    O.length && (e.pipe(O[O.length - 1].outP, U, "return", C, { via: Q }), U = O[0].inP, Q = []);
    let D = $("iu", "sup"), z = U, R = [[y + 7, E + 2], [y + 19, E + 2]], M = y + 20, W = [d, ...h];
    if (p) {
      const H = y + 17, F = L + 2;
      e.add("buf", "buffer", a.bufferLabel || c("type.buffer"), H, F, { props: { volume: a.bufferVolume } }), e.pipe($("iu", "sup"), $("buf", "in_sup"), "supply", [d, ...h], { via: [[y + 7, E + 2], [H + 1, E + 2]] }), e.pipe($("buf", "in_ret"), U, "return", [d, ...h], { via: [[H + 2, L]] }), D = $("buf", "out_sup"), z = $("buf", "out_ret"), R = [], W = [f], M = H + 7;
    } else O.length && (z = U);
    if (Cs(e, a, D, z, W, R, p, M, L + 2), r) {
      const H = y - 4, F = L + 1;
      e.add("dhw", "dhw_tank", a.dhwLabel || c("type.dhw_tank"), H, F, { props: { volume: a.dhwVolume } }), e.pipe($("iu", "dhw_sup"), $("dhw", "coil_in"), "supply", [d, m], { via: [[y + 4, F + 4]] }), e.pipe($("dhw", "coil_out"), $("iu", "dhw_ret"), "return", [d, m], { via: [[y + 5, F + 9]] }), Me(e, a, $("dhw", "hot"), $("dhw", "circ"), $("dhw", "cold"), H, F);
    }
  }
  const V = Math.max(1, a.circuits.length), Y = {
    version: 3,
    name: a.name,
    grid: { w: V > 1 ? 72 : 60, h: Math.max(36, (b ? 46 : 34) + (V - 1) * 10) },
    components: e.components,
    pipes: e.pipes,
    settings: t?.settings ?? { style: "flat", demo: !0 }
  };
  if (Y.settings = { ...Y.settings, wizard: a }, t) {
    const E = new Map(t.components.map((C) => [C.id, C]));
    for (const C of Y.components) {
      const O = E.get(C.id);
      O && O.type === C.type && (C.bindings = { ...O.bindings }, O.icon && (C.icon = O.icon), O.show && (C.show = O.show));
    }
    const L = Y.components.find((C) => C.id === "iu"), U = E.get("pc0"), Q = E.get("vw1");
    L && U?.bindings.running && (L.bindings.pc0_running ??= U.bindings.running), L && U?.bindings.speed && (L.bindings.pc0_speed ??= U.bindings.speed), L && Q?.bindings.position && (L.bindings.vw1_position ??= Q.bindings.position);
  }
  return Y;
}
function Cs(a, t, e, s, i, n, o, r, l) {
  Math.max(1, t.circuits.length);
  const p = [], d = { ...e };
  t.circuits.slice(0, 4).forEach((h, m) => {
    const f = m + 1, g = l - 9 + m * 10, b = f === 1 ? "pc1" : `hc${f}_pump`, x = `hc${f}_mix`, y = `hc${f}`;
    let T = r, S = null, A = null, P = i;
    (o || h.mixed) && (a.add(b, "pump", f === 1 ? "PC1" : `PC${f}`, T, g, { props: { role: h.mixed ? "hc" : "secondary", circuit: f } }), S = $(b, "in"), A = $(b, "out"), P = [{ c: b, s: "running" }], p.push(P[0]), T += 4), h.mixed && (a.add(x, "mixer", `VC${f}`, T, g, { props: { circuit: f } }), A ? a.pipe(A, $(x, "in"), "supply", P) : S = $(x, "in"), A = $(x, "out"), T += 3);
    const V = T + 3;
    a.add(y, h.emitter, h.label || c("wz.circuit", { n: f }), V, g - 2, { props: { circuit: f } }), A ? a.pipe(A, $(y, "sup"), "supply", P, { via: [[V - 2, g + 1], [V - 2, g - 1]] }) : S = $(y, "sup"), a.pipe(d, S, "supply", P, m === 0 ? { via: [...n, [r - 1 - m, g + 1]] } : { via: [[r - 1 - m, g + 1]] }), h.mixed ? (a.add(`hc${f}_jm`, "junction", "", T - 2, g + 3), a.pipe($(y, "ret"), $(`hc${f}_jm`, "r"), "return", P, { via: [[T - 2, g + 3]] }), a.pipe($(`hc${f}_jm`, "t"), $(x, "ret"), "return", P), a.pipe($(`hc${f}_jm`, "l"), s, "return", P, { via: [[r - 2 - m, g + 3]] })) : a.pipe($(y, "ret"), s, "return", P, { via: [[r - 2 - m, g + 3]] });
  });
}
function Me(a, t, e, s, i, n, o) {
  const r = { c: "tap", s: "flowing" }, l = { c: "circ", s: "running" };
  if (a.add("tap", "tap", c("type.tap"), n - 6, o - 2), a.add("inlet", "water_inlet", c("type.water_inlet"), n - 6, o + 9), a.pipe($("inlet", "out"), i, "dhw_cold", [r]), !t.circulation) {
    a.pipe(e, $("tap", "hot"), "dhw_hot", [r], { via: [[n - 1, o - 1]] });
    return;
  }
  a.add("jww", "junction", "", n - 2, o - 1), a.pipe(e, $("jww", "r"), "dhw_hot", [], { flowAny: [r, l], via: [[n - 1, o - 1]] }), a.pipe($("jww", "l"), $("tap", "hot"), "dhw_hot", [r]), a.add("circ", "pump", "PW2", n - 3, o + 2, { rot: 90, props: { role: "circulation" } }), a.pipe($("jww", "b"), $("circ", "in"), "circulation", [l]), a.pipe($("circ", "out"), s, "circulation", [l]);
}
function Ce() {
  return ls(We());
}
const en = 4;
class si {
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
    this.host.toggleAttribute("light", !e), ks(Ss(this.plant?.settings.language, t.language)), this.api ? this.api.setHass(t) : this._connected && this._init(), this.plant && !this.plant.settings.demo && this._checkStates();
  }
  _init() {
    this.api = new Ai(this.hass), this._load();
  }
  // ----------------------------------------------------------------- data
  get messages() {
    return this.sim ? this.simMessages : this.backendMessages;
  }
  get src() {
    return this.sim ? new Qi(this.sim) : new Vi(this.hass);
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
        e ? (e.version ?? 1) < 3 && e.settings?.wizard && (e = ls(e.settings.wizard, e), t.is_admin && this.saveExample && await this.api.saveConfig(e)) : (e = Ce(), t.is_admin && this.saveExample && await this.api.saveConfig(e)), this.setPlant(e), await this.loadIcons(), this.api.standalone || (this.backendMessages = await this.api.listMessages(), this._unsubMsg = await this.api.subscribeMessages((s) => this._mergeMessage(s)));
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
    const e = JSON.stringify(Se(this.plant));
    this.plant = t, ks(Ss(t.settings.language, this.hass?.language)), this._collectBound(), t.settings.demo ? (!this.sim || JSON.stringify(Se(t)) !== e) && this._startSim() : (this._stopSim(), this._checkStates()), this.version++, this._changed();
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
    const t = this.plant?.components.find((i) => i.type === "dhw_tank"), e = new Ji(Se(this.plant), void 0, { dhw: t?.label || c("type.dhw_tank") });
    this.sim = e, this._unsubSim = e.onMessage(() => {
      this.simMessages = [...e.messages], this._changed();
    }), this.simMessages = [...e.messages], this._lastFrame = performance.now();
    const s = (i) => {
      const n = (i - this._lastFrame) / 1e3;
      this._lastFrame = i, document.hidden || (e.advance(n), this._accum += n, this._accum >= 1 / en && (this._accum = 0, this.version++, this._changed())), this._raf = requestAnimationFrame(s);
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
const ii = X`
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
`, it = X`
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
`, sn = {
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
function I(a) {
  return w`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d=${sn[a] || ""} /></svg>`;
}
const Oe = w`<svg viewBox="0 0 32 32" class="logo" aria-hidden="true">
  <defs><linearGradient id="cp-logo" x1="0" y1="1" x2="1" y2="0">
    <stop offset="0" stop-color="#38d0ff" /><stop offset="0.55" stop-color="#3ddc97" /><stop offset="1" stop-color="#ffb35c" />
  </linearGradient></defs>
  <path d="M24 7.5A11 11 0 1 0 24 24.5" fill="none" stroke="url(#cp-logo)" stroke-width="4" stroke-linecap="round" />
  <path d="M16 9c3 4 5 6.5 5 9a5 5 0 0 1-10 0c0-2.5 2-5 5-9z" fill="url(#cp-logo)" />
</svg>`, nn = 7, on = 35, ni = 4.9;
function se(a, t, e = "air") {
  const s = t + 273.15 + 3, i = (e === "air" ? a - 6 : 0) + 273.15;
  return Math.max(1.2, Math.min(8, 0.57 * s / Math.max(5, s - i)));
}
function an(a, t, e = ni, s = "air") {
  return e * se(a, t, s) / se(nn, on, s);
}
function rn(a) {
  return a >= 0.9 ? "green" : a >= 0.75 ? "yellow" : "red";
}
const $t = { green: "#3ddc97", yellow: "#f5c542", red: "#ff5a5f" };
function oi(a, t) {
  const e = a.components.find((g) => g.type === "outdoor_unit"), s = a.components.find((g) => g.type === "indoor_unit");
  if (!e || !s) return;
  const i = (g, b) => {
    const x = t.get(g, b);
    return x?.available && x.num !== null ? x.num : void 0;
  }, n = i(e, "heat_power");
  let o = i(e, "el_power");
  o !== void 0 && t.get(e, "el_power")?.unit === "kW" && (o *= 1e3);
  const r = i(e, "outdoor_temp"), l = i(s, "supply_temp"), p = String(t.get(e, "activity")?.raw ?? "").toLowerCase();
  if (n === void 0 || o === void 0 || r === void 0 || l === void 0 || n < 0.5 || o < 80 || p.includes("defrost") || p.includes("abtau")) return;
  const d = n / (o / 1e3), h = rs(e.model).source, m = an(r, l, Number(e.props.cop_ref) || ni, h), f = d / m;
  return { cop: d, expected: m, ratio: f, ampel: rn(f), tOut: r, tFlow: l };
}
function Wt(a) {
  return a && a.el > 0.05 ? a.heat / a.el : void 0;
}
const Qt = { heat: 0, el: 0, heatDhw: 0, elDhw: 0, aux: 0 };
function Rt(a, t) {
  return {
    heat: a.heat + (t.heat || 0),
    el: a.el + (t.el || 0),
    heatDhw: a.heatDhw + (t.heatDhw || 0),
    elDhw: a.elDhw + (t.elDhw || 0),
    aux: a.aux + (t.aux || 0)
  };
}
function Ht(a) {
  return new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
}
const ln = {
  heat: ["heat_energy_total"],
  el: ["el_energy_total"],
  heatDhw: ["heat_energy_dhw"],
  elDhw: ["el_energy_dhw"],
  aux: ["aux_energy_total"]
};
async function cn(a, t) {
  const e = t.components.find((x) => x.type === "indoor_unit"), s = {};
  for (const [x, y] of Object.entries(ln)) {
    const T = y.map((S) => e?.bindings[S]).find(Boolean);
    T && (s[x] = T);
  }
  const i = { today: null, yesterday: null, month: null, year: null, daily: [], estimated: { month: !1, year: !1 } };
  if (!s.heat || !s.el) return { ...i, missing: "no_counters" };
  const n = /* @__PURE__ */ new Date(), o = Object.values(s), r = (x, y) => a.callWS({
    type: "recorder/statistics_during_period",
    start_time: x.toISOString(),
    end_time: n.toISOString(),
    statistic_ids: o,
    period: y,
    types: ["change"],
    units: { energy: "kWh" }
  }), [l, p] = await Promise.all([
    r(new Date(Ht(n) - 30 * 864e5), "day"),
    r(new Date(n.getFullYear(), 0, 1), "month")
  ]), d = /* @__PURE__ */ new Map();
  for (const [x, y] of Object.entries(s))
    for (const T of l[y] || []) {
      const S = Ht(new Date(T.start));
      d.set(S, Rt(d.get(S) || Qt, { [x]: T.change || 0 }));
    }
  if (!d.size) return { ...i, missing: "no_statistics" };
  const h = [...d.entries()].sort((x, y) => x[0] - y[0]).map(([x, y]) => ({ day: x, ...y })), m = d.get(Ht(n)) || null, f = d.get(Ht(n) - 864e5) || null;
  let g = Qt, b = null;
  for (const [x, y] of Object.entries(s))
    for (const T of p[y] || [])
      g = Rt(g, { [x]: T.change || 0 }), new Date(T.start).getMonth() === n.getMonth() && (b = Rt(b || Qt, { [x]: T.change || 0 }));
  return { today: m, yesterday: f, month: b, year: g, daily: h, estimated: { month: !1, year: !1 } };
}
const ai = [2, 3, 6.5, 10.5, 14.5, 18, 20, 19.5, 15.5, 10.5, 6, 3], Os = 0.8;
function ze(a, t, e, s) {
  const i = s ?? ai[t], n = a.p, o = n.heatLoad / (21 - n.designTemp);
  let r = 0, l = 0;
  for (const h of [-4, -2, 0, 2, 4]) {
    const m = i + h;
    if (m >= 16) continue;
    const f = o * (21 - m) * 24 * e * 0.2 * 0.85, g = 21 + (21 - m) * ((n.floor ? 35 : 50) - 21) / (21 - n.designTemp);
    r += f, l += f / (se(m, g, n.source) * Os);
  }
  const p = 8.4 * e * (n.dhwL > 0 ? 1 : 0), d = p / (se(i, 53, n.source) * Os);
  return { heat: r + p, el: l + d, heatDhw: p, elDhw: d, aux: 0 };
}
function pn(a) {
  const t = new Date(a.time * 1e3), e = Ht(t), s = a.dailyEnergy(), i = s.find((p) => p.day === e) || null, n = s.find((p) => p.day === e - 864e5) || null, o = ze(a, t.getMonth(), t.getDate() - 1 + t.getHours() / 24, a.outdoorMean);
  let r = Qt;
  for (let p = 0; p < t.getMonth(); p++) r = Rt(r, ze(a, p, new Date(t.getFullYear(), p + 1, 0).getDate()));
  r = Rt(r, o);
  const l = [];
  for (let p = 29; p >= 2; p--) {
    const d = e - p * 864e5, h = new Date(d), m = p <= 14 ? (14 - p) / 14 : 0, f = ai[h.getMonth()] * (1 - m) + a.outdoorMean * m + Math.sin(p * 1.3) * 2, g = ze(a, h.getMonth(), 1, f), b = 1 + Math.sin(p * 1.7) * 0.18;
    l.push({ day: d, ...g, heat: g.heat * b, el: g.el * b * (1 + Math.cos(p) * 0.04) });
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
const Hs = {
  heating: "#ff8a3d",
  hot_water: "#ff4f8b",
  defrost: "#6cc4ff",
  compressor_alarm: "#ff4d4d",
  cooling: "#38d0ff",
  off: "#8b949e"
};
function cs(a, t, e = 10, s = "casing") {
  return w`<rect class=${s} x="0" y="0" width=${a} height=${t} rx=${e} />
    <rect class="sheen" x="2" y="2" width=${a - 4} height=${Math.min(t * 0.35, 40)} rx=${e - 2} />`;
}
function dn(a) {
  const { w: t, h: e, flags: s, c: i } = a, n = rs(i.model);
  if (n.source === "brine") return hn(a);
  const o = s.has("running") && !s.has("defrost"), r = s.has("defrost"), l = s.has("alarm"), p = t * 0.36, d = e * 0.5, h = Math.min(e * 0.38, t * 0.3), m = a.num("fan_speed") ?? (o ? 60 : 0), f = m <= 0 ? 0 : m < 45 ? 2.8 : m < 70 ? 2 : 1.5, g = l ? "#ff4d4d" : r ? "#6cc4ff" : o ? "#3ddc97" : "#5b6573", b = [0, 120, 240].map(
    (x) => w`<path transform="rotate(${x})" d="M0 0 C ${h * 0.18} ${-h * 0.25}, ${h * 0.55} ${-h * 0.35}, ${h * 0.82} ${-h * 0.12} C ${h * 0.6} ${h * 0.05}, ${h * 0.25} ${h * 0.08}, 0 0 Z" />`
  );
  return w`
    <rect class="foot" x=${t * 0.12} y=${e - 2} width=${t * 0.16} height="6" rx="2" />
    <rect class="foot" x=${t * 0.72} y=${e - 2} width=${t * 0.16} height="6" rx="2" />
    ${cs(t, e, 12)}
    <circle class="grille-bg" cx=${p} cy=${d} r=${h + 4} />
    <g transform="translate(${p} ${d})">
      <g class=${f ? "spin fan" : "fan"} style=${f ? `--dur:${f}s` : ""}>${b}<circle r=${h * 0.12} class="hub" /></g>
    </g>
    ${[0.45, 0.72, 1].map((x) => w`<circle class="grille" cx=${p} cy=${d} r=${h * x} />`)}
    <line class="grille" x1=${p - h} y1=${d} x2=${p + h} y2=${d} />
    <line class="grille" x1=${p} y1=${d - h} x2=${p} y2=${d + h} />
    ${[0, 1, 2, 3, 4, 5].map((x) => w`<rect class="vent" x=${t * 0.73} y=${e * 0.22 + x * e * 0.1} width=${t * 0.19} height="3" rx="1.5" />`)}
    <circle cx=${t * 0.9} cy=${e * 0.12} r="4" fill=${g} class=${o || r ? "pulse" : ""} />
    ${n.refrigerant ? w`<text class="tag" x=${t * 0.825} y=${e * 0.9} text-anchor="middle">${n.refrigerant}</text>` : ""}
    ${r ? w`<rect x="2" y="2" width=${t - 4} height=${e - 4} rx="10" class="frost" />
        <g class="pulse" transform="translate(${p} ${d})">${un(h * 0.55)}</g>` : ""}
    ${l ? w`<rect x="1" y="1" width=${t - 2} height=${e - 2} rx="11" class="alarm-ring" />` : ""}
  `;
}
function hn(a) {
  const { w: t, h: e, flags: s } = a, i = s.has("running");
  return w`
    ${cs(t, e * 0.55, 10)}
    <text class="tag" x=${t / 2} y=${e * 0.32} text-anchor="middle">SOLE</text>
    <rect class="ground" x="0" y=${e * 0.62} width=${t} height=${e * 0.38} rx="6" />
    ${[0.2, 0.4, 0.6, 0.8].map(
    (n) => w`<path class=${i ? "probe active" : "probe"} d="M${t * n - 6} ${e * 0.55} V ${e * 0.95} M${t * n + 6} ${e * 0.55} V ${e * 0.95} M${t * n - 6} ${e * 0.95} Q ${t * n} ${e} ${t * n + 6} ${e * 0.95}" />`
  )}
  `;
}
function un(a) {
  const t = [0, 60, 120].map(
    (e) => w`<g transform="rotate(${e})"><line x1=${-a} y1="0" x2=${a} y2="0" />
      <path d="M${a * 0.6} 0 l ${a * 0.2} ${-a * 0.2} M${a * 0.6} 0 l ${a * 0.2} ${a * 0.2} M${-a * 0.6} 0 l ${-a * 0.2} ${-a * 0.2} M${-a * 0.6} 0 l ${-a * 0.2} ${a * 0.2}" /></g>`
  );
  return w`<g class="snow">${t}</g>`;
}
const v = 20;
function B(a, t, e) {
  const s = a.map(([i, n], o) => `${o ? "L" : "M"} ${i * v} ${n * v}`).join(" ");
  return w`<path class="ipipe" d=${s} style="stroke:${t}" />
    ${e ? w`<path class="ipipe-flow" d=${s} />` : _}`;
}
function jt([a, t], e, s = "l") {
  const i = 0.55 * v, n = { r: 0, d: 90, l: 180, u: 270 }[s];
  return w`<g transform="translate(${a * v} ${t * v})">
    ${e ? w`<circle class="pump-glow pulse" r=${i + 4} />` : _}
    <circle class=${e ? "pump-body on" : "pump-body"} r=${i} />
    <path class=${e ? "pump-tri on" : "pump-tri"} transform="rotate(${n})" d="M ${-i * 0.5} ${-i * 0.8} L ${i} 0 L ${-i * 0.5} ${i * 0.8} Z" />
    <circle class=${e ? "impeller spin" : "impeller"} style="--dur:0.9s" r=${i * 0.36} />
    <text class="itag" y=${i + 9} text-anchor="middle">PC0</text>
  </g>`;
}
function Ft([a, t], e, s = "VW1") {
  const i = 0.5 * v;
  return w`<g transform="translate(${a * v} ${t * v})">
    <path class="valve-tri on" d="M ${-i} ${-i * 0.6} L 0 0 L ${-i} ${i * 0.6} Z" transform="rotate(-90)" />
    <path class=${e ? "valve-tri" : "valve-tri on"} d="M ${i} ${-i * 0.6} L 0 0 L ${i} ${i * 0.6} Z" />
    <path class=${e ? "valve-tri on" : "valve-tri"} d="M ${-i} ${-i * 0.6} L 0 0 L ${-i} ${i * 0.6} Z" />
    <text class="itag" x=${i + 3} y=${-i} >${s} ${e ? "B" : "A"}</text>
  </g>`;
}
function Zt([a, t], e, s) {
  return w`<g transform="translate(${a * v} ${t * v})">
    ${s ? w`<rect class="aux-glow pulse" x=${-0.55 * v} y="-6" width=${1.1 * v} height=${e * v + 12} rx="10" />` : _}
    <rect class=${s ? "rod hot" : "rod"} x=${-0.35 * v} y="0" width=${0.7 * v} height=${e * v} rx="6" />
    <path class=${s ? "coil hot" : "coil"} d=${mn(0, 6, e * v - 12, 4, 8)} />
  </g>`;
}
function Gt([a, t]) {
  return w`<g transform="translate(${a * v} ${t * v})"><circle class="gauge" r="7" /><line class="gauge-needle" x1="0" y1="0" x2="4" y2="-4" /></g>`;
}
function mn(a, t, e, s, i) {
  const n = e / i;
  let o = `M${a} ${t}`;
  for (let r = 1; r <= i; r++) o += ` L${a + (r % 2 ? -s : s)} ${t + r * n}`;
  return o;
}
function Yt(a, t, e, s) {
  const i = [...a.flags].find((o) => o.startsWith("mode_"))?.slice(5), n = Hs[i || "off"] || Hs.off;
  return w`<rect class="screen" x=${t} y=${e} width=${s} height="18" rx="4" />
    <rect x=${t + 4} y=${e + 4} width="14" height="10" rx="2" fill=${n} class=${i && i !== "off" ? "pulse" : ""} />
    <text class="screen-text" x=${t + 24} y=${e + 13}>${i ? c(`mode.${i}`) : ""}</text>`;
}
function fn(a, t) {
  const { w: e, h: s, flags: i, c: n } = a, o = i.has("running"), r = i.has("b"), l = i.has("aux"), p = i.has("pc1"), d = tt(a.num("supply_temp"), "#ff7a45"), h = tt(a.num("return_temp"), "#4d9fff"), m = (n.model || "").match(/w[ls]w\d{3}i/i)?.[0]?.toUpperCase().replace("I", "i") || "";
  let f;
  if (t === "t180") {
    const g = tt(a.num("dhw_temp"), "#ff4f8b");
    f = w`
      <rect class="tank-in" x=${0.6 * v} y=${10 * v} width=${6.8 * v} height=${11.2 * v} rx=${v} style="fill:${g}" />
      <path class=${o && r ? "tank-coil hot" : "tank-coil"} d=${gn(2.4, 14, 5.6, 19.6)} />
      ${Yt(a, 1.6 * v, 0.8 * v, 4.6 * v)}
      ${B([[6, 0], [6, 6.2], [4.6, 6.2]], d, o)}
      ${B([[4.6, 6.2], [3, 6.2], [3, 0]], d, o && !r)}
      ${B([[4.6, 6.2], [4.6, 14]], d, o && r)}
      ${B([[2.4, 19.6], [1.6, 19.6], [1.6, 7.6]], h, o && r)}
      ${B([[1, 0], [1, 7.6]], h, o && !r)}
      ${B([[1, 7.6], [7, 7.6], [7, 0]], h, o)}
      ${B([[4, 10.2], [4, 0]], g, i.has("flowing"))}
      ${B([[5, 0], [5, 3], [5.6, 3], [5.6, 20.6]], "#38d0ff", i.has("flowing"))}
      ${Zt([6, 1.4], 4, l)}
      ${Ft([4.6, 6.2], r)}
      ${jt([4.2, 7.6], o, "r")}
      ${w`<g transform="translate(${3 * v} ${3.4 * v})"><circle class=${p ? "pump-body on" : "pump-body"} r="8" /><text class="itag" x="12" y="4">PC1</text></g>`}
      ${Gt([0.6, 8.2])}`;
  } else if (t === "tp70") {
    const g = tt(a.num("buffer_temp"), "#ff9f45");
    f = w`
      <rect class="tank-in" x=${0.6 * v} y=${9 * v} width=${7.8 * v} height=${6.4 * v} rx=${v} style="fill:${g}" />
      <text class="tank-label" x=${4.5 * v} y=${13.6 * v} text-anchor="middle">${n.props.buffer_l || 70} l</text>
      ${Yt(a, 2.2 * v, 0.8 * v, 4.6 * v)}
      ${B([[5, 0], [5, 5.2]], d, o)}
      ${B([[5, 5.2], [5, 9]], d, o && !r)}
      ${B([[5, 5.2], [7, 5.2], [7, 0]], d, o && r)}
      ${B([[8, 0], [8, 6.4], [6, 6.4]], h, o && r)}
      ${B([[6.2, 15], [6.2, 9]], h, o && !r)}
      ${B([[6, 9], [6, 0]], h, o)}
      ${B([[1.6, 9], [1.6, 6.4], [1, 6.4], [1, 0]], g, p)}
      ${B([[2, 0], [2, 14.8]], h, p)}
      ${B([[3, 0], [3, 1.4]], g, !1)}
      ${B([[4, 0], [4, 1.4]], h, !1)}
      ${Zt([4.5, 1.4], 2.6, l)}
      ${Ft([5, 5.2], r)}
      ${jt([6.5, 6.4], o, "u")}
      <g transform="translate(${1.6 * v} ${6.4 * v})"><circle class=${p ? "pump-body on" : "pump-body"} r="8" />
        ${p ? w`<circle class="impeller spin" style="--dur:0.9s" r="3.5" />` : _}<text class="itag" x="11" y="4">PC1</text></g>
      ${Gt([0.7, 6.6])}`;
  } else t === "brine" ? f = w`
      ${Yt(a, 1.6 * v, 0.8 * v, 4.6 * v)}
      <circle class="compressor" cx=${2.2 * v} cy=${8.5 * v} r=${1.2 * v} />
      <text class="itag" x=${2.2 * v} y=${10.4 * v} text-anchor="middle">Verdichter</text>
      ${B([[1, 0], [1, 6], [2.2, 6], [2.2, 7.3]], "#38d0ff", o)}
      ${B([[2.2, 9.7], [2.2, 11.5], [2, 11.5], [2, 0]], "#2b6cff", o)}
      ${B([[4, 9], [4, 4], [5.5, 4], [5.5, 9]], d, o)}
      ${B([[5.5, 9], [7, 9], [7, 0]], d, o && !r)}
      ${B([[5.5, 9], [5.5, 10.4], [4, 10.4], [4, 0]], d, o && r)}
      ${B([[6, 0], [6, 11.6], [4, 11.6], [4, 9]], h, o && !r)}
      ${B([[5, 0], [5, 3.4]], h, o && r)}
      ${Zt([4, 3], 3, l)}
      ${Ft([5.5, 9], r)}
      ${jt([5.5, 11.6], o, "l")}
      ${Gt([0.7, 9])}` : f = w`
      ${Yt(a, 1.6 * v, 0.8 * v, 4.6 * v)}
      ${B([[2, 12], [2, 8.2], [3.3, 8.2], [3.3, 2.6], [5.6, 2.6], [5.6, 9]], d, o)}
      ${B([[5.6, 9], [7, 9], [7, 12]], d, o && !r)}
      ${B([[5.6, 9], [5.6, 9.9], [4, 9.9], [4, 12]], d, o && r)}
      ${B([[6, 12], [6, 11.2], [5, 11.2]], h, o && !r)}
      ${B([[5, 12], [5, 11.2]], h, o && r)}
      ${B([[5, 11.2], [1, 11.2], [1, 12]], h, o)}
      ${Zt([3.3, 3.2], 4.3, l)}
      ${Ft([5.6, 9], r)}
      ${jt([3.3, 11.2], o, "l")}
      ${Gt([0.6, 8.6])}`;
  return w`
    ${cs(e, s, 10, "casing light")}
    ${f}
    ${t === "wall_e" ? _ : w`<text class="tag" x=${e / 2} y=${2.4 * v} text-anchor="middle">${m}</text>`}
  `;
}
function gn(a, t, e, s) {
  const n = (s - t) / 5;
  let o = `M ${e * v} ${t * v - 2 * v}`;
  o += ` L ${e * v} ${t * v}`;
  for (let r = 0; r < 5; r++) {
    const l = (t + r * n) * v;
    o += ` C ${(a - 0.3) * v} ${l}, ${(a - 0.3) * v} ${l + n / 2 * v}, ${e * v} ${l + n / 2 * v}`, o += ` C ${(e + 0.3) * v} ${l + n / 2 * v}, ${(e + 0.3) * v} ${l + n * v}, ${a * v} ${l + n * v}`;
  }
  return o;
}
function Bs(a, t) {
  const { w: e, h: s, c: i, flags: n } = a, o = a.num("temp_top"), r = a.num("temp_bottom") ?? (o !== void 0 ? o - 6 : void 0), l = a.num("temp_mid") ?? (o !== void 0 && r !== void 0 ? (o + r) / 2 : void 0), p = `tg-${i.id}`, d = t === "dhw" ? "#ff4f8b" : "#ff7a45", h = n.has("charging"), m = i.props.volume ? `${i.props.volume} l` : "", f = Math.min(e / 2, 2 * v);
  return w`
    <defs>
      <linearGradient id=${p} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.05" stop-color=${tt(o, d)} />
        <stop offset="0.5" stop-color=${tt(l, "#c084fc")} />
        <stop offset="0.95" stop-color=${tt(r, "#4d9fff")} />
      </linearGradient>
    </defs>
    <rect class="insulation" x="-3" y="-3" width=${e + 6} height=${s + 6} rx=${f + 3} />
    <rect x="0" y="0" width=${e} height=${s} rx=${f} fill="url(#${p})" class="tank-fill" />
    <rect class="tank-glass" x=${e * 0.1} y=${s * 0.06} width=${e * 0.12} height=${s * 0.88} rx=${e * 0.06} />
    ${t === "dhw" ? w`<path class=${h ? "tank-coil hot" : "tank-coil"} d=${_n(e)} />
        <path class="dip" d="M 0 ${10 * v} H ${0.8 * v} V ${s - 0.4 * v}" />` : w`
        <path class="dip" d="M ${2 * v} 0 V ${s - 0.5 * v}" />
        <path class="dip" d="M ${3 * v} 0 V ${s - 0.5 * v}" />
        ${[0.3, 0.55, 0.8].map((g) => w`<line class="strat" x1=${e * 0.62} x2=${e * 0.9} y1=${s * g} y2=${s * g} />`)}`}
    <text class="tank-label" x=${e / 2} y=${s * (t === "dhw" ? 0.3 : 0.5)} text-anchor="middle">${m}</text>
    ${n.has("disinfecting") ? w`<text class="tank-badge" x=${e / 2} y=${s * 0.18} text-anchor="middle">60°</text>` : ""}
  `;
}
function _n(a) {
  const t = a, e = a * 0.78, s = a * 0.3, i = 4 * v, n = 9 * v, o = 5, r = (n - i) / o;
  let l = `M ${t} ${i} H ${e}`;
  for (let p = 0; p < o; p++) {
    const d = i + p * r;
    l += ` C ${s - 6} ${d}, ${s - 6} ${d + r / 2}, ${e} ${d + r / 2} C ${e + 6} ${d + r / 2}, ${e + 6} ${d + r}, ${e} ${d + r}`;
  }
  return `${l} H ${t}`;
}
function wn(a) {
  const { w: t, h: e, flags: s } = a, i = s.has("running"), n = Math.min(t, e) / 2 - 2, o = t / 2, r = e / 2;
  return w`
    ${i ? w`<circle class="pump-glow pulse" cx=${o} cy=${r} r=${n + 5} />` : ""}
    <circle class=${i ? "pump-body on" : "pump-body"} cx=${o} cy=${r} r=${n} />
    <path class=${i ? "pump-tri on" : "pump-tri"} d="M ${o - n * 0.5} ${r - n * 0.82} L ${o + n} ${r} L ${o - n * 0.5} ${r + n * 0.82} Z" />
    <g transform="translate(${o} ${r})">
      <circle class=${i ? "impeller spin" : "impeller"} style="--dur:0.9s" r=${n * 0.38} />
    </g>
  `;
}
function Rs(a, t = !1) {
  const { w: e, h: s, flags: i } = a, n = e / 2, o = s / 2, r = Math.min(e, s) / 2 - 2, l = i.has("b"), p = (d) => t || d ? "valve-tri on" : "valve-tri";
  return w`
    <rect class="actuator" x=${n - r * 0.35} y=${o - r * 1.25} width=${r * 0.7} height=${r * 0.45} rx="2" />
    <line class="stem" x1=${n} y1=${o - r * 0.8} x2=${n} y2=${o} />
    <path class=${p(!0)} d="M ${n - r} ${o - r * 0.6} L ${n} ${o} L ${n - r} ${o + r * 0.6} Z" />
    <path class=${p(!l)} d="M ${n + r} ${o - r * 0.6} L ${n} ${o} L ${n + r} ${o + r * 0.6} Z" />
    <path class=${p(l)} d="M ${n - r * 0.6} ${o + r} L ${n} ${o} L ${n + r * 0.6} ${o + r} Z" />
    ${t ? "" : w`<text class="valve-tag" x=${n + r * 0.5} y=${o - r * 0.75}>${l ? "B" : "A"}</text>`}
  `;
}
function vn(a) {
  const { w: t, h: e } = a, s = a.num("flow_temp"), i = a.num("return_temp"), n = a.num("room_temp"), o = s !== void 0 && n !== void 0 ? s - n > 6 : !1, r = 9, l = (t - 16) / r, p = `rg-${a.c.id}`;
  return w`
    <defs><linearGradient id=${p} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color=${tt(s, "#8b949e")} stop-opacity=${o ? 0.85 : 0.25} />
      <stop offset="1" stop-color=${tt(i, "#8b949e")} stop-opacity=${o ? 0.6 : 0.2} />
    </linearGradient></defs>
    ${o ? [0.25, 0.5, 0.75].map(
    (d, h) => w`<path class="heat-wave" style="animation-delay:${h * 0.6}s" d="M ${t * d} ${e * 0.12} q 5 -6 0 -12 q -5 -6 0 -12" />`
  ) : ""}
    <rect class="rad-frame" x="4" y=${e * 0.18} width=${t - 8} height=${e * 0.72} rx="6" />
    ${Array.from({ length: r }, (d, h) => w`<rect x=${8 + h * l + 1} y=${e * 0.22} width=${l - 3} height=${e * 0.64} rx=${(l - 3) / 2} fill="url(#${p})" class="fin" />`)}
  `;
}
function $n(a) {
  const { w: t, h: e } = a, s = a.num("flow_temp"), i = tt(s, "#8b949e");
  let n = `M 10 ${e * 0.25}`;
  const o = 5;
  for (let r = 0; r < o; r++)
    n += r % 2 === 0 ? ` H ${t - 12} q 6 0 6 ${e * 0.3 / o} q 0 ${e * 0.3 / o} -6 ${e * 0.3 / o}` : ` H 16 q -6 0 -6 ${e * 0.3 / o} q 0 ${e * 0.3 / o} 6 ${e * 0.3 / o}`;
  return w`
    <rect class="floor-slab" x="2" y=${e * 0.15} width=${t - 4} height=${e * 0.75} rx="6" />
    <path d=${n} fill="none" stroke=${i} stroke-width="3" stroke-linecap="round" opacity="0.9" />
  `;
}
function yn(a) {
  const { w: t, h: e, flags: s } = a, i = s.has("flowing");
  return w`
    <path class="tap-body" d="M ${t} ${e * 0.25} H ${t * 0.45} a ${t * 0.25} ${t * 0.25} 0 0 0 ${-t * 0.25} ${t * 0.25} V ${e * 0.62} h ${t * 0.16} V ${e * 0.52} a ${t * 0.1} ${t * 0.1} 0 0 1 ${t * 0.1} ${-t * 0.1} H ${t} Z" />
    <rect class="tap-handle" x=${t * 0.46} y=${e * 0.06} width=${t * 0.26} height=${e * 0.12} rx="3" />
    ${i ? [0, 1, 2].map((n) => w`<circle class="drop" style="animation-delay:${n * 0.25}s" cx=${t * 0.28} cy=${e * 0.7} r="2.5" />`) : ""}
  `;
}
function bn(a) {
  const { w: t, h: e } = a;
  return w`
    <rect class="casing" x="0" y=${e * 0.2} width=${t} height=${e * 0.6} rx="5" />
    <text class="tag" x=${t * 0.45} y=${e * 0.62} text-anchor="middle">KW</text>
  `;
}
function xn(a) {
  const { w: t, h: e, c: s } = a;
  return s.props.filter ? w`
      <rect class="casing" x=${t * 0.15} y=${e * 0.1} width=${t * 0.7} height=${e * 0.8} rx="5" />
      ${[0.3, 0.45, 0.6, 0.75].map((i) => w`<line class="sieve" x1=${t * 0.25} x2=${t * 0.75} y1=${e * i} y2=${e * i} />`)}
      ${[0.35, 0.5, 0.65].map((i) => w`<line class="sieve" x1=${t * i} x2=${t * i} y1=${e * 0.22} y2=${e * 0.8} />`)}` : w`
    <rect class="casing" x=${t * 0.2} y="0" width=${t * 0.6} height=${e} rx=${t * 0.3} />
    <path class="magnet" d="M ${t * 0.38} ${e * 0.3} v ${e * 0.25} a ${t * 0.12} ${t * 0.12} 0 0 0 ${t * 0.24} 0 v ${-e * 0.25}" />
  `;
}
function kn(a) {
  const { w: t, h: e } = a;
  return w`
    <line class="stem" x1=${t / 2} y1=${e * 0.8} x2=${t / 2} y2=${e} />
    <rect class="vessel" x="0" y="0" width=${t} height=${e * 0.82} rx=${t / 2} />
    <rect class="sheen" x=${t * 0.18} y=${e * 0.08} width=${t * 0.2} height=${e * 0.6} rx=${t * 0.1} />
  `;
}
function Sn(a) {
  switch (a.c.type) {
    case "outdoor_unit":
      return dn(a);
    case "indoor_unit":
      return fn(a, Dt(a.c)?.id || "wall_e");
    case "buffer":
      return Bs(a, "buffer");
    case "dhw_tank":
      return Bs(a, "dhw");
    case "pump":
      return wn(a);
    case "valve_3way":
      return Rs(a);
    case "mixer":
      return Rs(a, !0);
    case "radiators":
      return vn(a);
    case "floor_heating":
      return $n(a);
    case "tap":
      return yn(a);
    case "water_inlet":
      return bn(a);
    case "separator":
      return xn(a);
    case "expansion_vessel":
      return kn(a);
    case "junction":
      return w`<circle class="junction" r="4" />`;
    default:
      return w``;
  }
}
const Is = 1, qt = { l: { x: -1, y: 0 }, r: { x: 1, y: 0 }, t: { x: 0, y: -1 }, b: { x: 0, y: 1 } };
function Ee(a) {
  return a === "l" || a === "r";
}
function Mn(a, t) {
  const e = t.get(a.from.c), s = t.get(a.to.c);
  if (!e || !s) return null;
  const i = rt(e, a.from.p), n = rt(s, a.to.p);
  if (!i || !n) return null;
  const o = e.type === "junction" ? 0 : Is, r = s.type === "junction" ? 0 : Is, l = { x: i.x, y: i.y }, p = { x: n.x, y: n.y }, d = { x: l.x + qt[i.dir].x * o, y: l.y + qt[i.dir].y * o }, h = { x: p.x + qt[n.dir].x * r, y: p.y + qt[n.dir].y * r }, m = Ee(i.dir), f = [l, d];
  if (a.via?.length) {
    let g = !m;
    for (const [b, x] of [...a.via, [h.x, h.y]]) {
      const y = f[f.length - 1];
      if (y.x !== b && y.y !== x) {
        const S = g ? { x: y.x, y: x } : { x: b, y: y.y };
        f.push(S);
      }
      g = f[f.length - 1].x === b, f.push({ x: b, y: x });
    }
    return f.push(p), { pts: Vs(f), horizontalStart: m };
  }
  if (m)
    if (d.y === h.y && a.bend === void 0)
      f.push(h);
    else {
      const g = a.bend ?? (d.x + h.x) / 2;
      Ee(n.dir) ? f.push({ x: g, y: d.y }, { x: g, y: h.y }) : a.bend === void 0 ? f.push({ x: h.x, y: d.y }) : f.push({ x: g, y: d.y }, { x: g, y: h.y }), f.push(h);
    }
  else if (d.x === h.x && a.bend === void 0)
    f.push(h);
  else {
    const g = a.bend ?? (d.y + h.y) / 2;
    Ee(n.dir) ? a.bend === void 0 ? f.push({ x: d.x, y: h.y }) : f.push({ x: d.x, y: g }, { x: h.x, y: g }) : f.push({ x: d.x, y: g }, { x: h.x, y: g }), f.push(h);
  }
  return f.push(p), { pts: Vs(f), horizontalStart: m };
}
function Vs(a) {
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
function zn(a, t = 8) {
  if (a.length === 0) return "";
  const e = a.map((n) => ({ x: n.x * k, y: n.y * k }));
  let s = `M ${e[0].x} ${e[0].y}`;
  for (let n = 1; n < e.length - 1; n++) {
    const o = e[n - 1], r = e[n], l = e[n + 1], p = Math.hypot(r.x - o.x, r.y - o.y), d = Math.hypot(l.x - r.x, l.y - r.y), h = Math.min(t, p / 2, d / 2), m = r.x - (r.x - o.x) / p * h, f = r.y - (r.y - o.y) / p * h, g = r.x + (l.x - r.x) / d * h, b = r.y + (l.y - r.y) / d * h;
    s += ` L ${m} ${f} Q ${r.x} ${r.y} ${g} ${b}`;
  }
  const i = e[e.length - 1];
  return `${s} L ${i.x} ${i.y}`;
}
function En(a, t) {
  for (let e = 2; e < a.length - 1; e++) {
    const s = a[e - 1], i = a[e], n = s.x === i.x;
    if (t ? n : !n) return { x: (s.x + i.x) / 2, y: (s.y + i.y) / 2 };
  }
  return null;
}
const dt = 18, nt = 88, ot = 34, st = 6;
function Ae(a, t = 17) {
  return a.length > t ? `${a.slice(0, t - 1)}…` : a;
}
const ne = class ne extends G {
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
    const e = t.show ?? ft(t).filter((s) => s.show).map((s) => s.key);
    return this.edit ? [] : e.filter((s) => this.src.get(t, s) !== void 0);
  }
  /** Slots shown in the component's value list (not anchored to a pipe or a measuring point). */
  _listSlots(t) {
    const e = new Set(As(t).filter((s) => s.at || s.pos).map((s) => s.key));
    return this._shownSlots(t).filter((s) => !e.has(s));
  }
  _badgeLayout(t) {
    const e = Es(t);
    if (e === "none" || e === "inside") return [];
    const s = this._listSlots(t);
    if (!s.length) return [];
    const { w: i, h: n } = Ct(t), o = t.x * k, r = t.y * k, l = i * k, p = n * k, d = [];
    if (e === "tank") {
      const h = { temp_top: 0.16, temp_mid: 0.48, temp_bottom: 0.8 }, m = [];
      for (const y of s)
        y in h ? d.push({ slot: y, x: o + 5, y: r + p * h[y] - 11, w: l - 10 }) : m.push(y);
      const g = m.length * (ot + st), b = [
        { x: o + l / 2 - nt / 2, y: r + p + 26, dy: ot + st },
        { x: o + l + 12, y: r + p * 0.35, dy: ot + st },
        { x: o - 12 - nt, y: r + p * 0.35, dy: ot + st }
      ], x = b.find((y) => !this._hitsPipe(y.x, y.y, y.x + nt, y.y + g)) || b[0];
      return m.forEach((y, T) => d.push({ slot: y, x: x.x, y: x.y + T * x.dy })), d;
    }
    if (e === "right")
      s.forEach((h, m) => d.push({ slot: h, x: o + l + 12, y: r + 4 + m * (ot + st) }));
    else if (e === "left")
      s.forEach((h, m) => d.push({ slot: h, x: o - 12 - nt, y: r + 4 + m * (ot + st) }));
    else if (e === "above") {
      const h = s.length * (nt + st) - st;
      s.forEach(
        (m, f) => d.push({ slot: m, x: o + l / 2 - h / 2 + f * (nt + st), y: r - ot - 10 })
      );
    } else {
      const h = Math.max(2, Math.floor((l + 40) / (nt + st))), m = Math.ceil(s.length / h);
      s.forEach((f, g) => {
        const b = Math.floor(g / h), y = (b === m - 1 ? s.length - b * h : h) * (nt + st) - st;
        d.push({
          slot: f,
          x: o + l / 2 - y / 2 + g % h * (nt + st),
          y: r + p + 26 + b * (ot + st)
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
      const { w: l, h: p } = Ct(r);
      n(r.x * k - 6, r.y * k - 6), n((r.x + l) * k + 6, (r.y + p) * k + 22);
      for (const d of this._badgeLayout(r))
        n(d.x, d.y), n(d.x + nt, d.y + ot);
    }
    for (const r of this._pills)
      n(r.x, r.y), n(r.x + r.w, r.y + dt);
    (this.edit || !Number.isFinite(t)) && (n(0, 0), n(this.plant.grid.w * k, this.plant.grid.h * k));
    const o = 24;
    return { x: t - o, y: e - o, w: s - t + 2 * o, h: i - e + 2 * o };
  }
  // -------------------------------------------------------------- render
  render() {
    if (!this.plant) return _;
    const t = this._view || this._contentBox(), e = new Map(this.plant.components.map((o) => [o.id, this._comp(o)])), s = new Map(this.plant.components.map((o) => [o.id, Le(o, this.src)])), i = Ui(this.plant, this.src), n = this.plant.pipes.map((o) => ({ pipe: o, route: Mn(o, e) }));
    return this._segments = n.flatMap(
      ({ route: o }) => (o?.pts || []).slice(1).map((r, l) => {
        const p = o.pts[l];
        return { x1: Math.min(p.x, r.x) * k, x2: Math.max(p.x, r.x) * k, y1: Math.min(p.y, r.y) * k, y2: Math.max(p.y, r.y) * k };
      })
    ), this._pills = this.edit ? [] : this._placePills(e, n), u`
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
      const l = zn(r.pts), p = Ki(o, s), d = tt(i.get(o.id), Fi[o.kind] || "#888"), h = this.selected?.kind === "p" && this.selected.id === o.id;
      return w`<g class="pipe ${p ? "active" : ""} ${h ? "selected" : ""}" data-pipe=${o.id}
                @pointerdown=${(m) => this._onPipeDown(m, o.id)}>
              <path class="pipe-hit" d=${l} />
              ${h ? w`<path class="pipe-sel" d=${l} />` : _}
              <path class="pipe-outline" d=${l} />
              ${p ? w`<path class="pipe-halo" d=${l} style="stroke:${d}" />` : _}
              <path class="pipe-base" d=${l} style="stroke:${d}" />
              ${p ? w`<path class="pipe-flow" d=${l} />` : _}
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
    return w`
      <defs><pattern id="cp-grid" width=${k} height=${k} patternUnits="userSpaceOnUse">
        <circle cx="0" cy="0" r="1" class="grid-dot" />
      </pattern></defs>
      <rect class="grid-bg" x="0" y="0" width=${t * k} height=${e * k} fill="url(#cp-grid)" />`;
  }
  _transform(t) {
    const e = { ...J[t.type], ...Pt(t) }, s = t.rot || 0, i = `translate(${t.x * k} ${t.y * k})`;
    return !e.rotatable || s === 0 ? i : s === 90 ? `${i} translate(${e.h * k} 0) rotate(90)` : s === 180 ? `${i} translate(${e.w * k} ${e.h * k}) rotate(180)` : `${i} translate(0 ${e.w * k}) rotate(270)`;
  }
  _component(t, e) {
    const s = { ...J[t.type], ...Pt(t), ports: Xt(t), badges: Es(t) }, { w: i, h: n } = Ct(t), o = (t.type === "value_tile" ? i : s.w) * k, r = (t.type === "value_tile" ? n : s.h) * k, l = (S) => {
      const A = this.src.get(t, S);
      return A?.available && A.num !== null ? A.num : void 0;
    }, p = (S) => {
      const A = this.src.get(t, S);
      return A?.available ? String(A.raw) : void 0;
    }, d = t.icon || this.plant.settings.typeIcons?.[t.type], h = d ? this.icons.get(d) : void 0, m = this.selected?.kind === "c" && this.selected.id === t.id;
    let f;
    t.type === "value_tile" ? f = this._tile(t, o, r) : t.type === "label" ? f = w`<text class="free-label" x="0" y=${k} style="font-size:${t.props.size || 18}px">${t.props.text || t.label}</text>` : h ? f = w`${e.has("running") ? w`<rect class="user-glow pulse" x="-4" y="-4" width=${o + 8} height=${r + 8} rx="10" />` : _}
        <image href=${h.data_url} x="0" y="0" width=${o} height=${r} preserveAspectRatio="xMidYMid meet" />` : f = Sn({ c: t, w: o, h: r, flags: e, num: l, text: p });
    const g = !["junction", "label", "value_tile"].includes(t.type), b = s.ports.some((S) => {
      const A = rt(t, S.id);
      return A?.dir === "b" && Math.abs(A.x - (t.x + i / 2)) < Math.max(0.6, i * 0.35);
    });
    let x = (t.x + i / 2) * k, y = (t.y + n) * k + (s.badges === "above" ? 16 : 18), T = "middle";
    if (b) {
      const S = Math.min(28, t.label.length) * 7.5;
      y = (t.y + n) * k + 4;
      const A = (t.x + i) * k + 6, P = t.x * k - 6, V = this._hitsPipe(A, y - 12, A + S, y + 3), Y = this._hitsPipe(P - S, y - 12, P, y + 3);
      V && !Y ? (x = P, T = "end") : (x = A, T = "start");
    }
    return w`
      <g class="comp ${m ? "selected" : ""}" data-id=${t.id}
         @pointerdown=${(S) => this._onCompDown(S, t)}>
        <g transform=${this._transform(t)}>
          ${f}
        </g>
        <rect class="comp-hit" x=${t.x * k - (t.type === "junction" ? 8 : 0)} y=${t.y * k - (t.type === "junction" ? 8 : 0)}
          width=${Math.max(16, i * k)} height=${Math.max(16, n * k)} rx="8" />
        ${m ? w`<rect class="sel-outline" x=${t.x * k - 6} y=${t.y * k - 6} width=${i * k + 12} height=${n * k + 12} rx="10" />` : _}
        ${g ? w`<text class="comp-label" x=${x} y=${y} text-anchor=${T}>${Ae(t.label, 28)}</text>` : _}
      </g>
      ${this._badgeLayout(t).map((S) => S.w ? this._pill(t, S.slot, S.x, S.y, S.w) : this._chip(t, S.slot, S.x, S.y))}
    `;
  }
  _chip(t, e, s, i) {
    const n = this.src.get(t, e), o = Ot(t, e), { text: r, unit: l } = _t(n, o), p = t.type === "value_tile" ? e : vt(t.type, e), h = o === "temp" && n?.num !== null && n?.available ? tt(n.num, "#8b949e") : "var(--cp-accent)";
    return w`
      <g class="chip ${n?.available === !1 ? "na" : ""}" @click=${(m) => this._slotClick(m, t, e)}>
        <rect x=${s} y=${i} width=${nt} height=${ot} rx="8" />
        <rect class="chip-accent" x=${s} y=${i + 7} width="3" height=${ot - 14} rx="1.5" style="fill:${h}" />
        <text class="chip-label" x=${s + 10} y=${i + 13}>${Ae(p)}</text>
        <text class="chip-value" x=${s + 10} y=${i + 28}>${r}<tspan class="chip-unit" dx="2">${l}</tspan></text>
      </g>`;
  }
  /**
   * Values anchored to a pipe ("at") sit on that pipe; values with a measuring point ("pos")
   * sit at that point. Positions avoid overlapping each other.
   */
  _placePills(t, e) {
    const s = [], i = [...t.values()].filter((o) => !["junction", "label"].includes(o.type)).map((o) => {
      const { w: r, h: l } = Ct(o);
      return { x: o.x * k - 4, y: o.y * k - 4, w: r * k + 8, h: l * k + 26 };
    }), n = (o, r, l, p = !0) => s.every((d) => o + l + 4 <= d.x || o >= d.x + d.w + 4 || r + dt + 3 <= d.y || r >= d.y + dt + 3) && (!p || i.every((d) => o + l <= d.x || o >= d.x + d.w || r + dt <= d.y || r >= d.y + d.h));
    for (const o of t.values()) {
      const r = new Set(this._shownSlots(o));
      for (const l of As(o)) {
        if (!r.has(l.key) || !l.at && !l.pos) continue;
        const p = this._pillWidth(o, l.key);
        if (l.pos) {
          s.push({ c: o, slot: l.key, x: (o.x + l.pos[0]) * k - p / 2, y: (o.y + l.pos[1]) * k - dt / 2, w: p });
          continue;
        }
        let d = null, h = { c: o.id, p: l.at };
        const m = /* @__PURE__ */ new Set();
        for (let f = 0; f < 4 && h && !d; f++) {
          const g = h, b = e.find(
            ({ pipe: A }) => !m.has(A.id) && (A.from.c === g.c && A.from.p === g.p || A.to.c === g.c && A.to.p === g.p)
          );
          if (h = null, !b?.route) break;
          m.add(b.pipe.id);
          const x = b.pipe.from.c === g.c && b.pipe.from.p === g.p, y = x ? b.route.pts : [...b.route.pts].reverse();
          for (let A = 1; A < y.length && !d; A++) {
            const P = y[A - 1], V = y[A], Y = Math.abs(P.x - V.x) + Math.abs(P.y - V.y);
            if (!(Y < 1 || P.x === V.x && Y < 3))
              for (const E of [0.5, 0.35, 0.65, 0.2, 0.8]) {
                const L = (P.x + (V.x - P.x) * E) * k, U = (P.y + (V.y - P.y) * E) * k;
                if (P.y === V.y && Y * k < p + 8) break;
                const C = L - p / 2, O = U - dt / 2;
                if (n(C, O, p)) {
                  d = { x: C, y: O };
                  break;
                }
              }
          }
          const T = x ? b.pipe.to : b.pipe.from, S = t.get(T.c);
          if (!d && S && J[S.type].passive && S.type !== "pump") {
            const A = Xt(S).find((P) => P.id !== T.p && e.some(({ pipe: V }) => !m.has(V.id) && (V.from.c === S.id && V.from.p === P.id || V.to.c === S.id && V.to.p === P.id)));
            A && (h = { c: S.id, p: A.id });
          }
        }
        if (!d) {
          const f = rt(o, l.at);
          if (!f) continue;
          d = { x: f.x * k + 6, y: f.y * k + 6 };
        }
        s.push({ c: o, slot: l.key, ...d, w: p });
      }
    }
    return s;
  }
  _pillWidth(t, e) {
    const { text: s, unit: i } = _t(this.src.get(t, e), Ot(t, e));
    return Math.round((zs(t.type, e).length + s.length + i.length) * 6.4 + 22);
  }
  _anchorPill(t) {
    const e = this.src.get(t.c, t.slot), s = Ot(t.c, t.slot), { text: i, unit: n } = _t(e, s), o = s === "temp" && e?.available && e.num !== null ? tt(e.num, "#8b949e") : "var(--cp-accent)";
    return w`
      <g class="apill" @click=${(r) => this._slotClick(r, t.c, t.slot)}>
        <title>${vt(t.c.type, t.slot)}</title>
        <rect x=${t.x} y=${t.y} width=${t.w} height=${dt} rx=${dt / 2} style="stroke:${o}" />
        <text x=${t.x + 8} y=${t.y + 13}><tspan class="apill-label">${zs(t.c.type, t.slot)}</tspan> ${i}<tspan class="chip-unit" dx="1">${n}</tspan></text>
      </g>`;
  }
  /** Compact value-only pill drawn inside a tank at the sensor height. */
  _pill(t, e, s, i, n) {
    const o = this.src.get(t, e), { text: r, unit: l } = _t(o, Ot(t, e));
    return w`
      <g class="pill" @click=${(p) => this._slotClick(p, t, e)}>
        <title>${vt(t.type, e)}</title>
        <rect x=${s} y=${i} width=${n} height="22" rx="11" />
        <text x=${s + n / 2} y=${i + 15.5} text-anchor="middle">${r}<tspan class="chip-unit" dx="1">${l}</tspan></text>
      </g>`;
  }
  _tile(t, e, s) {
    const i = t.props.entries || [];
    return w`
      <rect class="tile" x="0" y="0" width=${e} height=${s} rx="12" />
      <text class="tile-title" x="14" y="22">${t.label}</text>
      ${i.map((n, o) => {
      const r = this.src.get(t, n.slot), { text: l, unit: p } = _t(r, n.kind || "text"), d = 46 + o * 26;
      return w`<g class="tile-row" @click=${(h) => this._slotClick(h, t, n.slot)}>
          <text class="tile-label" x="14" y=${d}>${Ae(n.label || n.slot, 22)}</text>
          <text class="tile-value" x=${e - 14} y=${d} text-anchor="end">${l} <tspan class="chip-unit">${p}</tspan></text></g>`;
    })}`;
  }
  _editOverlays(t, e) {
    const s = [];
    for (const n of t.values())
      for (const o of Xt(n)) {
        const r = rt(n, o.id);
        if (!r) continue;
        const l = this._connect?.c === n.id && this._connect.p === o.id, p = n.type === "junction" ? { l: -7, r: 7, t: 0, b: 0 }[r.dir] ?? 0 : 0, d = n.type === "junction" ? { t: -7, b: 7, l: 0, r: 0 }[r.dir] ?? 0 : 0;
        s.push(w`<circle class="port ${l ? "src" : ""} ${this._connect ? "target" : ""}" cx=${r.x * k + p} cy=${r.y * k + d} r=${n.type === "junction" ? 4 : 6}
          @pointerdown=${(h) => this._onPortDown(h, { c: n.id, p: o.id })}><title>${o.id}</title></circle>`);
      }
    let i = _;
    if (this.selected?.kind === "p") {
      const n = e.find((r) => r.pipe.id === this.selected.id)?.route, o = n ? En(n.pts, n.horizontalStart) : null;
      n && o && (i = w`<rect class="bend-handle ${n.horizontalStart ? "ew" : "ns"}" x=${o.x * k - 7} y=${o.y * k - 7} width="14" height="14" rx="4"
          @pointerdown=${(r) => this._onBendDown(r, this.selected.id, n.horizontalStart)} />`);
    }
    return w`<g class="ports">${s}</g>${i}`;
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
        const i = Math.max(0, Math.round(e.ox + (s.x - e.start.x) / k)), n = Math.max(0, Math.round(e.oy + (s.y - e.start.y) / k));
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
        const i = Math.round((e.horizontalStart ? s.x : s.y) / k);
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
ne.properties = {
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
}, ne.styles = X`
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
let He = ne;
customElements.get("cp-schematic") || customElements.define("cp-schematic", He);
const oe = class oe extends G {
  constructor() {
    super(...arguments), this.points = [], this.color = "var(--cp-accent)", this.step = !1;
  }
  render() {
    const t = this.points.filter((f) => f.v !== null);
    if (t.length < 2) return u`<div class="empty">${c("ov.no_history")}</div>`;
    const e = 300, s = 90, i = t[0].t, n = t[t.length - 1].t;
    let o = Math.min(...t.map((f) => f.v)), r = Math.max(...t.map((f) => f.v));
    r - o < 1e-6 && (r += 1, o -= 1);
    const l = (r - o) * 0.1;
    o -= l, r += l;
    const p = (f) => (f - i) / Math.max(1, n - i) * e, d = (f) => s - (f - o) / (r - o) * s;
    let h = `M ${p(t[0].t)} ${d(t[0].v)}`;
    for (let f = 1; f < t.length; f++)
      this.step ? h += ` H ${p(t[f].t)} V ${d(t[f].v)}` : h += ` L ${p(t[f].t)} ${d(t[f].v)}`;
    const m = `${h} L ${e} ${s} L 0 ${s} Z`;
    return u`<svg viewBox="0 0 ${e} ${s}" preserveAspectRatio="none">
      <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color=${this.color} stop-opacity="0.35" /><stop offset="1" stop-color=${this.color} stop-opacity="0" />
      </linearGradient></defs>
      ${w`<path d=${m} fill="url(#sg)" /><path d=${h} fill="none" stroke=${this.color} stroke-width="2" vector-effect="non-scaling-stroke" />`}
    </svg>`;
  }
};
oe.properties = { points: { attribute: !1 }, color: {}, step: { type: Boolean } }, oe.styles = X`
    :host { display: block; height: 90px; }
    svg { width: 100%; height: 100%; display: block; overflow: visible; }
    .empty { height: 100%; display: grid; place-items: center; color: var(--cp-muted); font-size: 12px; }
  `;
let Be = oe;
const ae = class ae extends G {
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
    const t = this.component, e = Ot(t, this.slotKey), s = this.src.get(t, this.slotKey), { text: i, unit: n } = _t(s, e), o = this.src.entityOf(t, this.slotKey), r = this._hist || [], l = r.map((g) => g.v).filter((g) => g !== null), p = e === "temp" && s?.num !== null && s?.num !== void 0 ? tt(s.num, "#3ddc97") : "var(--cp-accent)", d = 320, h = Math.max(12, Math.min(window.innerWidth - d - 12, this.x - d / 2)), m = Math.max(12, Math.min(window.innerHeight - 260, this.y + 14)), f = t.type === "value_tile" ? this.slotKey : vt(t.type, this.slotKey);
    return u`
      <div class="backdrop" @pointerdown=${this._close}></div>
      <div class="pop card" style="left:${h}px; top:${m}px; width:${d}px">
        <div class="row head">
          <div>
            <div class="title">${f}</div>
            <div class="muted sub">${t.label}</div>
          </div>
          <span class="spacer"></span>
          <button class="ghost icon" @click=${this._close} aria-label=${c("close")}>${I("close")}</button>
        </div>
        <div class="now"><span class="val">${i}</span><span class="unit">${n}</span></div>
        <div class="muted cap">${c("ov.history24")}</div>
        ${this._hist === null ? u`<div class="loading"></div>` : u`<cp-sparkline .points=${r} .color=${p} .step=${e === "bool"}></cp-sparkline>`}
        ${l.length && e !== "bool" && e !== "enum" ? u`<div class="row stats">
              <span>${c("ov.min")} <b>${K(Math.min(...l))}</b></span>
              <span>${c("ov.max")} <b>${K(Math.max(...l))}</b></span>
            </div>` : _}
        ${o ? u`<div class="row foot"><code>${o}</code><span class="spacer"></span>
              <button @click=${() => this._more(o)}>${c("ov.open_entity")}</button></div>` : _}
      </div>
    `;
  }
};
ae.properties = {
  component: { attribute: !1 },
  slotKey: {},
  src: { attribute: !1 },
  x: { type: Number },
  y: { type: Number },
  version: { type: Number },
  _hist: { state: !0 }
}, ae.styles = [
  it,
  X`
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
let Re = ae;
const An = { info: "info", notice: "notice", warning: "warn", error: "error" };
function Pn(a) {
  const t = { ...a.params };
  return t.label_sfx = t.label ? ` (${t.label})` : "", c(`msgk.${a.key}`, t);
}
const re = class re extends G {
  constructor() {
    super(...arguments), this.messages = [], this.compact = !1, this.canClear = !1, this._filter = "all";
  }
  _row(t) {
    const e = t.end_ts ? t.end_ts - t.ts : null;
    return u`<li class="msg ${t.level} ${t.active ? "active" : ""}">
      <span class="lv">${I(An[t.level] || "info")}</span>
      <div class="body">
        <div class="text">${Pn(t)}</div>
        <div class="meta">
          ${Li(t.ts)}
          ${t.active ? u` · <b>${c("msg.active")}</b>` : e !== null ? u` · ${c("msg.duration", { duration: Wi(e) })}` : _}
        </div>
      </div>
    </li>`;
  }
  render() {
    const t = [...this.messages].sort((n, o) => o.ts - n.ts), e = this._filter === "all" ? t : t.filter((n) => n.level === this._filter), s = e.filter((n) => n.active), i = e.filter((n) => !n.active).slice(0, this.compact ? 12 : 300);
    return u`
      ${this.compact ? _ : u`<div class="row filters">
            ${["all", "error", "warning", "notice", "info"].map(
      (n) => u`<button class=${this._filter === n ? "primary" : ""} @click=${() => this._filter = n}>
                ${c(n === "all" ? "msg.filter_all" : `msg.level.${n}`)}</button>`
    )}
            <span class="spacer"></span>
            ${this.canClear ? u`<button @click=${() => this.dispatchEvent(new CustomEvent("clear"))}>${I("trash")} ${c("msg.clear")}</button>` : _}
          </div>`}
      ${s.length ? u`<h4>${c("msg.active")}</h4><ul>${s.map((n) => this._row(n))}</ul>` : _}
      <h4>${c("msg.history")}</h4>
      ${i.length ? u`<ul>${i.map((n) => this._row(n))}</ul>` : u`<div class="empty muted">${c("msg.empty")}</div>`}
    `;
  }
};
re.properties = {
  messages: { attribute: !1 },
  compact: { type: Boolean },
  canClear: { type: Boolean },
  _filter: { state: !0 }
}, re.styles = [
  it,
  X`
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
let Ie = re;
customElements.get("cp-sparkline") || customElements.define("cp-sparkline", Be);
customElements.get("cp-slot-popover") || customElements.define("cp-slot-popover", Re);
customElements.get("cp-messages") || customElements.define("cp-messages", Ie);
const Dn = [1, 10, 60, 300, 900], le = class le extends G {
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
    const t = this._first("outdoor_unit"), e = this._first("indoor_unit"), s = this._first("dhw_tank"), i = this.plant.components.find((b) => b.type === "radiators" || b.type === "floor_heating"), n = this.plant.components.find((b) => b.type === "valve_3way" && b.props.role === "dhw_switch");
    let o = t ? ye(this.src.get(t, "activity")) : void 0;
    if (!o && t) {
      const b = Le(t, this.src), x = n ? Le(n, this.src) : /* @__PURE__ */ new Set();
      o = b.has("running") ? x.has("b") ? "hot_water" : "heating" : "off";
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
    const h = l !== void 0 && p !== void 0 && p > 50 && l > 0.2 ? l / (p / 1e3) : void 0, m = (b, x = 1) => b === void 0 ? "–" : K(b, x), f = oi(this.plant, this.src), g = [
      { key: "mode", label: c("kpi.mode"), value: o ? c(`mode.${o}`) : "–", unit: "", color: r[o || "off"] },
      { key: "out", label: c("kpi.outdoor"), value: m(this._num(t, "outdoor_temp")), unit: "°C", comp: t, slot: "outdoor_temp" },
      { key: "heat", label: c("kpi.heat"), value: m(l), unit: "kW", comp: t, slot: "heat_power" },
      { key: "power", label: c("kpi.power"), value: p === void 0 ? "–" : p >= 1e3 ? K(p / 1e3, 2) : K(p, 0), unit: p !== void 0 && p >= 1e3 ? "kW" : "W", comp: t, slot: "el_power" },
      {
        key: "cop",
        label: c("kpi.cop"),
        value: m(h),
        unit: "",
        color: f ? $t[f.ampel] : void 0,
        sub: f ? `${c("kpi.target")} ${m(f.expected)}` : void 0
      },
      {
        key: "supply",
        label: c("kpi.supply"),
        value: m(this._num(e, "supply_temp")),
        unit: "°C",
        color: tt(this._num(e, "supply_temp"), ""),
        sub: this._num(e, "target_flow_temp") !== void 0 ? `${c("kpi.target")} ${m(this._num(e, "target_flow_temp"))}` : void 0,
        comp: e,
        slot: "supply_temp"
      }
    ];
    return s && g.push({ key: "dhw", label: c("kpi.dhw"), value: m(this._num(s, "temp_top")), unit: "°C", color: tt(this._num(s, "temp_top"), ""), comp: s, slot: "temp_top" }), i && this._num(i, "room_temp") !== void 0 && g.push({ key: "room", label: c("kpi.room"), value: m(this._num(i, "room_temp")), unit: "°C", comp: i, slot: "room_temp" }), g;
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
    return u`<div class="demo">
      <span class="demo-tag">${I("flask")} ${c("demo.active")}</span>
      <span class="clock" title=${c("demo.time")}>${ti(t.time)}</span>
      <label class="ctl">${c("demo.speed")}
        <select @change=${(i) => t.speed = Number(i.target.value)}>
          ${Dn.map((i) => u`<option value=${i} ?selected=${t.speed === i}>${i}×</option>`)}
        </select>
      </label>
      <label class="ctl slider">${c("demo.outdoor")} <b>${K(t.outdoorMean, 0)} °C</b>
        <input type="range" min="-15" max="20" step="1" .value=${String(t.outdoorMean)}
          @input=${(i) => t.outdoorMean = Number(i.target.value)} />
      </label>
      ${this.narrow ? u`<select class="scn-select" @change=${(i) => {
      const n = i.target;
      n.value && this._scenario(n.value), n.value = "";
    }}>
            <option value="">${c("demo.scenarios")} …</option>
            ${e.map((i) => u`<option value=${i}>${s[i] ? "✓ " : ""}${c(`scn.${i}`)}</option>`)}
          </select>` : u`<div class="scn">
            ${e.map(
      (i) => u`<button class=${s[i] ? "primary" : ""} @click=${() => this._scenario(i)}>${c(`scn.${i}`)}</button>`
    )}
          </div>`}
    </div>`;
  }
  render() {
    if (!this.plant) return _;
    const t = this._kpis(), e = this.messages.filter((s) => s.active && (s.level === "warning" || s.level === "error")).length;
    return u`
      ${this._demoBar()}
      ${this.showKpis ? u`<div class="kpis">
        ${t.map(
      (s) => u`<button class="kpi" ?disabled=${!s.comp} @click=${(i) => s.comp && (this._pop = { component: s.comp, slot: s.slot, x: i.clientX, y: i.clientY })}>
            <span class="k-label">${s.label}</span>
            <span class="k-value" style=${s.color ? `color:${s.color}` : ""}>${s.value}<small>${s.unit}</small></span>
            ${s.sub ? u`<span class="k-sub">${s.sub}</span>` : _}
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
            <button class="icon" title=${c("zoom_in")} @click=${() => this._sch()?.zoom(0.8)}>${I("plus")}</button>
            <button class="icon" title=${c("zoom_out")} @click=${() => this._sch()?.zoom(1.25)}>${I("minus")}</button>
            <button class="icon" title=${c("fit")} @click=${() => this._sch()?.fit()}>${I("fit")}</button>
            ${this.narrow || !this.showSide ? _ : u`<button class="icon" title=${c("msg.title")} @click=${() => this._side = !this._side}>
                  ${I("bell")}${e ? u`<span class="badge">${e}</span>` : _}</button>`}
          </div>
        </div>
        ${this.showSide && (this._side || this.narrow) ? u`<aside class="side card">
              <div class="side-head"><b>${c("msg.title")}</b></div>
              <cp-messages compact .messages=${this.messages}></cp-messages>
            </aside>` : _}
      </div>
      ${this._pop ? u`<cp-slot-popover
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
le.properties = {
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
}, le.styles = [
  it,
  X`
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
let Ve = le;
customElements.get("cp-overview") || customElements.define("cp-overview", Ve);
const Tn = [
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
], Ln = ["supply", "return", "dhw_hot", "dhw_cold", "circulation"], Pe = {
  pump: ["running", "!running"],
  mixer: ["running"],
  valve_3way: ["a", "b"],
  outdoor_unit: ["running", "defrost", "!defrost"],
  indoor_unit: ["running", "a", "b", "aux", "pc1"],
  tap: ["flowing"],
  dhw_tank: ["charging"]
};
function St(a) {
  return JSON.parse(JSON.stringify(a));
}
const zt = class zt extends G {
  constructor() {
    super(...arguments), this.value = "", this.placeholder = "", this._listId = `cp-ents-${zt._uid++}`;
  }
  _change(t) {
    const e = t.target.value.trim();
    this.value = e, this.dispatchEvent(new CustomEvent("value-changed", { detail: e }));
  }
  render() {
    const t = this.hass ? Object.keys(this.hass.states).sort() : [];
    return u`<input
        list=${this._listId}
        .value=${this.value || ""}
        placeholder=${this.placeholder || c("ed.entity_search")}
        @change=${this._change}
      />
      <datalist id=${this._listId}>
        ${t.map((e) => u`<option value=${e}>${this.hass.states[e].attributes.friendly_name || ""}</option>`)}
      </datalist>`;
  }
};
zt.properties = { hass: { attribute: !1 }, value: {}, placeholder: {} }, zt._uid = 0, zt.styles = [it, X`:host { display: block; min-width: 0; } input { font-size: 12px; padding: 6px 8px; }`];
let Ne = zt;
customElements.get("cp-entity-picker") || customElements.define("cp-entity-picker", Ne);
const ce = class ce extends G {
  constructor() {
    super(...arguments), this.icons = /* @__PURE__ */ new Map(), this.version = 0, this._sel = null, this._hint = "", this._dirty = !1, this._undo = [], this._redo = [], this._onKey = (t) => {
      const e = t.composedPath()[0]?.tagName;
      e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || ((t.key === "Delete" || t.key === "Backspace") && this._sel ? (t.preventDefault(), this._delete()) : (t.ctrlKey || t.metaKey) && t.key.toLowerCase() === "z" ? (t.preventDefault(), t.shiftKey ? this._doRedo() : this._doUndo()) : t.key.toLowerCase() === "r" && this._sel?.kind === "c" && this._rotate());
    };
  }
  willUpdate() {
    this.plant && this.plant !== this._source && (this._source = this.plant, this._draft = St(this.plant), this._undo = [], this._redo = [], this._dirty = !1, this._sel = null);
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
    const s = St(this._draft);
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
    const e = J[t], s = this._newId(`${t}_`), i = {
      id: s,
      type: t,
      label: t === "junction" ? "" : c(`type.${t}`),
      ...this._freeSpot(e.variants ? Pt({ type: t, props: {} }).w : e.w, e.variants ? Pt({ type: t, props: {} }).h : e.h),
      bindings: {},
      props: t === "value_tile" ? { entries: [] } : t === "label" ? { text: c("type.label"), size: 18 } : {}
    };
    t === "pump" && (i.props.role = "other"), this._commit((n) => n.components.push(i)), this._sel = { kind: "c", id: s };
  }
  /** First grid position where a w×h box (plus margin) does not overlap anything. */
  _freeSpot(t, e) {
    const s = this._draft.components.map((n) => ({ c: n, ...Ct(n) })), i = (n, o) => s.every(({ c: r, w: l, h: p }) => n + t + 1 <= r.x || n >= r.x + l + 1 || o + e + 2 <= r.y || o >= r.y + p + 3);
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
    !t || !J[t.type].rotatable || this._commit((e) => {
      const s = e.components.find((i) => i.id === t.id);
      s.rot = ((s.rot || 0) + 90) % 360;
    });
  }
  _duplicate() {
    const t = this._comp();
    if (!t) return;
    const e = this._newId(`${t.type}_`);
    this._commit((s) => s.components.push({ ...St(t), id: e, x: t.x + 2, y: t.y + 2 })), this._sel = { kind: "c", id: e };
  }
  _connect(t, e) {
    const s = this._comp(t.c), i = this._comp(e.c), n = rt(s, t.p), o = rt(i, e.p), r = n?.def.kind || o?.def.kind || "supply", l = [], p = [s, i].find((h) => h.type === "pump");
    p && l.push({ c: p.id, s: "running" });
    for (const [h, m] of [
      [s, t],
      [i, e]
    ])
      h.type === "valve_3way" && (m.p === "a" || m.p === "b") && l.push({ c: h.id, s: m.p });
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
    this.dispatchEvent(new CustomEvent("save", { detail: St(this._draft), bubbles: !0, composed: !0 })), this._dirty = !1;
  }
  _discard() {
    this._draft = St(this.plant), this._undo = [], this._redo = [], this._dirty = !1, this._sel = null;
  }
  // ------------------------------------------------------------ events
  _onBend(t) {
    const { id: e, bend: s, live: i } = t.detail;
    if (i) {
      this._bendStart || (this._bendStart = JSON.stringify(this._draft));
      const n = St(this._draft), o = n.pipes.find((r) => r.id === e);
      o && (o.bend = s, delete o.via), this._draft = n;
    } else this._bendStart && (this._undo.push(this._bendStart), this._bendStart = void 0, this._dirty = !0);
  }
  // ------------------------------------------------------------ render
  render() {
    if (!this._draft) return _;
    const t = this._sel;
    return u`
      <div class="toolbar">
        <button class="icon" title=${c("undo")} ?disabled=${!this._undo.length} @click=${this._doUndo}>${I("undo")}</button>
        <button class="icon" title=${c("redo")} ?disabled=${!this._redo.length} @click=${this._doRedo}>${I("redo")}</button>
        <button class="icon" title=${c("ed.rotation")} ?disabled=${!(t?.kind === "c" && J[this._comp()?.type || "label"].rotatable)} @click=${this._rotate}>${I("rotate")}</button>
        <button class="icon" title=${c("ed.duplicate")} ?disabled=${t?.kind !== "c"} @click=${this._duplicate}>${I("copy")}</button>
        <button class="icon danger" title=${c("delete")} ?disabled=${!t} @click=${this._delete}>${I("trash")}</button>
        <span class="hint">${this._hint}</span>
        <span class="spacer"></span>
        ${this._dirty ? u`<span class="dirty">${c("unsaved")}</span>
          <button @click=${this._discard}>${c("discard")}</button>` : _}
        <button class="primary" ?disabled=${!this._dirty} @click=${this._save}>${I("save")} ${c("save")}</button>
      </div>
      <div class="layout">
        <aside class="palette card">
          <div class="cap">${c("ed.palette")}</div>
          ${Tn.map((e) => u`<button class="pal" @click=${() => this._add(e)}>${I("plus")} ${c(`type.${e}`)}</button>`)}
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
        <aside class="props card">${t?.kind === "c" ? this._compProps() : t?.kind === "p" ? this._pipeProps() : u`<p class="muted">${c("ed.nothing")}</p>`}</aside>
      </div>
    `;
  }
  _num(t, e, s, i = 1) {
    return u`<label class="field">${t}<input type="number" step=${i} .value=${e ?? ""} @change=${(n) => s(Number(n.target.value))} /></label>`;
  }
  _compProps() {
    const t = this._comp();
    if (!t) return _;
    const e = J[t.type], s = new Set(t.show ?? ft(t).filter((n) => n.show).map((n) => n.key)), i = [...this.icons.values()];
    return u`
      <div class="ptitle">${c(`type.${t.type}`)} <code>${t.id}</code></div>
      ${t.type !== "junction" ? u`<label class="field">${c("ed.label")}<input .value=${t.label} @change=${(n) => this._set((o) => o.label = n.target.value)} /></label>` : _}
      ${t.type === "outdoor_unit" ? u`<label class="field">${c("ed.model")}<select @change=${(n) => this._set((o) => o.model = n.target.value)}>
              ${ee.map((n) => u`<option value=${n.id} ?selected=${n.id === t.model}>${n.label}</option>`)}
            </select></label>
            ${this._num(c("ed.nominal"), t.props.nominal_kw, (n) => this._set((o) => o.props.nominal_kw = n), 0.1)}
            ${this._num(c("ed.cop_ref"), t.props.cop_ref ?? 4.9, (n) => this._set((o) => o.props.cop_ref = n), 0.1)}` : _}
      ${t.type === "indoor_unit" ? u`<label class="field">${c("ed.model")}<select @change=${(n) => this._set((o) => o.model = n.target.value)}>
              ${os.map((n) => u`<option value=${n.id} ?selected=${n.id === t.model}>${n.label}</option>`)}
            </select></label>
            ${this._num(c("wz.aux_kw"), t.props.aux_kw, (n) => this._set((o) => o.props.aux_kw = n), 1)}
            <div class="cap">${c("ed.input_labels")}</div>
            ${[1, 2, 3, 4].map(
      (n) => u`<label class="field">${c(`slot.input${n}`)}<input .value=${t.props.input_labels?.[`input${n}`] || ""}
                @change=${(o) => this._set((r) => r.props.input_labels = { ...r.props.input_labels || {}, [`input${n}`]: o.target.value })} /></label>`
    )}
            <div class="cap">${c("ed.pressure_limits")}</div>
            <div class="two">
              ${this._num("min", t.props.pressure_min ?? 1, (n) => this._set((o) => o.props.pressure_min = n), 0.1)}
              ${this._num("max", t.props.pressure_max ?? 2.7, (n) => this._set((o) => o.props.pressure_max = n), 0.1)}
            </div>` : _}
      ${t.type === "buffer" || t.type === "dhw_tank" ? this._num(c("ed.volume"), t.props.volume, (n) => this._set((o) => o.props.volume = n)) : _}
      ${e.roles ? u`<label class="field">${c("ed.role")}<select @change=${(n) => this._set((o) => o.props.role = n.target.value)}>
            ${e.roles.map((n) => u`<option value=${n} ?selected=${t.props.role === n}>${c(`role.${n}`)}</option>`)}
          </select></label>` : _}
      ${["radiators", "floor_heating", "mixer", "pump"].includes(t.type) ? this._num(c("ed.circuit"), t.props.circuit ?? 1, (n) => this._set((o) => o.props.circuit = n)) : _}
      ${t.type === "dhw_tank" ? this._num(c("ed.dhw_circuit"), t.props.dhw_circuit ?? 1, (n) => this._set((o) => o.props.dhw_circuit = n)) : _}
      ${t.type === "label" ? u`<label class="field">${c("ed.text")}<input .value=${t.props.text || ""} @change=${(n) => this._set((o) => o.props.text = n.target.value)} /></label>
            ${this._num("px", t.props.size || 18, (n) => this._set((o) => o.props.size = n))}` : _}
      ${e.rotatable ? u`<label class="field">${c("ed.rotation")}<select @change=${(n) => this._set((o) => o.rot = Number(n.target.value))}>
            ${[0, 90, 180, 270].map((n) => u`<option value=${n} ?selected=${(t.rot || 0) === n}>${n}°</option>`)}
          </select></label>` : _}
      ${["junction", "label", "value_tile"].includes(t.type) ? _ : u`<label class="field">${c("ed.icon")}<select @change=${(n) => this._set((o) => {
      const r = n.target.value;
      r ? o.icon = r : delete o.icon;
    })}>
            <option value="">${c("ed.icon_default")}</option>
            ${i.map((n) => u`<option value=${n.id} ?selected=${n.id === t.icon}>${n.name}</option>`)}
          </select></label>`}
      ${t.type === "value_tile" ? this._tileEntries(t) : this._bindings(t, s)}
    `;
  }
  _bindings(t, e) {
    const s = ft(t);
    return s.length ? u`<div class="cap">${c("ed.bindings")}</div>
      <div class="bindings">
        ${s.map((i) => {
      const n = this.src.get(t, i.key), { text: o, unit: r } = _t(n, i.kind);
      return u`<div class="bind">
            <div class="bhead">
              <label class="show" title=${c("ed.show")}><input type="checkbox" .checked=${e.has(i.key)}
                @change=${(l) => this._set((p) => {
        const d = new Set(p.show ?? ft(p).filter((h) => h.show).map((h) => h.key));
        l.target.checked ? d.add(i.key) : d.delete(i.key), p.show = ft(p).map((h) => h.key).filter((h) => d.has(h));
      })} /></label>
              <span class="bname">${vt(t.type, i.key)}</span>
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
    return u`<div class="cap">${c("ed.entries")}</div>
      ${e.map(
      (i, n) => u`<div class="bind">
          <div class="two">
            <input .value=${i.label || ""} placeholder=${c("ed.label")} @change=${(o) => this._set((r) => r.props.entries[n].label = o.target.value)} />
            <select @change=${(o) => this._set((r) => r.props.entries[n].kind = o.target.value)}>
              ${s.map((o) => u`<option value=${o} ?selected=${i.kind === o}>${o}</option>`)}
            </select>
          </div>
          <div class="row nowrap">
            <cp-entity-picker .hass=${this.hass} .value=${i.entity || ""}
              @value-changed=${(o) => this._set((r) => r.props.entries[n].entity = o.detail)}></cp-entity-picker>
            <button class="icon danger" @click=${() => this._set((o) => o.props.entries.splice(n, 1))}>${I("trash")}</button>
          </div>
        </div>`
    )}
      <button @click=${() => this._set((i) => {
      i.props.entries = [...i.props.entries || [], { slot: `v${Date.now().toString(36)}`, label: "", entity: "", kind: "text" }];
    })}>${I("plus")} ${c("ed.add_entry")}</button>`;
  }
  _conds(t, e) {
    const s = this._draft.components.filter((i) => Pe[i.type]);
    return u`${(t || []).map(
      (i, n) => u`<div class="row nowrap cond">
          <select @change=${(o) => this._setPipe((r) => r[e][n].c = o.target.value)}>
            ${s.map((o) => u`<option value=${o.id} ?selected=${o.id === i.c}>${o.label || o.id}</option>`)}
          </select>
          <select @change=${(o) => this._setPipe((r) => r[e][n].s = o.target.value)}>
            ${(Pe[this._comp(i.c)?.type || "pump"] || []).map(
        (o) => u`<option value=${o} ?selected=${o === i.s}>${o.startsWith("!") ? `${c("ed.not")} ${c(`state.${o.slice(1)}`)}` : c(`state.${o}`)}</option>`
      )}
          </select>
          <button class="icon danger" @click=${() => this._setPipe((o) => o[e].splice(n, 1))}>${I("close")}</button>
        </div>`
    )}
      <button ?disabled=${!s.length} @click=${() => this._setPipe((i) => {
      const n = s[0];
      i[e] = [...i[e] || [], { c: n.id, s: Pe[n.type][0] }];
    })}>${I("plus")} ${c("ed.add_cond")}</button>`;
  }
  _pipeProps() {
    const t = this._pipe();
    if (!t) return _;
    const e = (s) => this._comp(s)?.label || s;
    return u`
      <div class="ptitle">${c("ed.pipe")} <code>${t.id}</code></div>
      <p class="muted small">${e(t.from.c)} · ${t.from.p} → ${e(t.to.c)} · ${t.to.p}</p>
      <label class="field">${c("ed.kind")}<select @change=${(s) => this._setPipe((i) => i.kind = s.target.value)}>
        ${Ln.map((s) => u`<option value=${s} ?selected=${s === t.kind}>${c(`kind.${s}`)}</option>`)}
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
ce.properties = {
  plant: { attribute: !1 },
  hass: { attribute: !1 },
  src: { attribute: !1 },
  icons: { attribute: !1 },
  version: { type: Number },
  _draft: { state: !0 },
  _sel: { state: !0 },
  _hint: { state: !0 },
  _dirty: { state: !0 }
}, ce.styles = [
  it,
  X`
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
let Ke = ce;
customElements.get("cp-editor") || customElements.define("cp-editor", Ke);
function yt(a, t, e) {
  a.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
}
const pe = class pe extends G {
  constructor() {
    super(...arguments), this.plant = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._cfg = structuredClone(this.plant?.settings?.wizard || We());
  }
  _upd(t) {
    this._cfg = { ...this._cfg, ...t };
  }
  _generate() {
    this.plant && !confirm(c("wz.replace_confirm")) || yt(this, "plant-generated", ls(this._cfg, this.plant));
  }
  render() {
    const t = this._cfg, e = (s, i = "text") => u`<input type=${i} .value=${String(t[s] ?? "")}
      @change=${(n) => {
      const o = n.target.value;
      this._upd({ [s]: i === "number" ? Number(o) : o });
    }} />`;
    return u`
      <div class="card wrap">
        <h2>${c("wz.title")}</h2>
        <p class="muted">${c("wz.intro")}</p>
        <label class="field">${c("wz.name")} ${e("name")}</label>

        <h3>${c("wz.hp")}</h3>
        <div class="grid">
          <label class="field">${c("wz.outdoor")}
            <select @change=${(s) => this._upd({ outdoorModel: s.target.value })}>
              ${ee.map((s) => u`<option value=${s.id} ?selected=${s.id === t.outdoorModel}>${s.label}</option>`)}
            </select></label>
          <label class="field">${c("ed.label")} ${e("outdoorLabel")}</label>
          <label class="field">${c("ed.nominal")} ${e("nominalKw", "number")}</label>
          <label class="field">${c("wz.indoor")}
            <select @change=${(s) => this._upd({ indoorModel: s.target.value })}>
              ${os.map((s) => u`<option value=${s.id} ?selected=${s.id === t.indoorModel}>${s.label}</option>`)}
            </select></label>
          <label class="field">${c("ed.label")} ${e("indoorLabel")}</label>
          <div class="field check">
            <label><input type="checkbox" .checked=${t.aux} @change=${(s) => this._upd({ aux: s.target.checked })} /> ${c("wz.aux")}</label>
            ${t.aux ? u`<label class="field">${c("wz.aux_kw")} ${e("auxKw", "number")}</label>` : _}
          </div>
        </div>

        <h3>${c("wz.buffer")}</h3>
        <div class="grid">
          <div class="radios">
            ${["parallel", "serial", "none"].map(
      (s) => u`<label><input type="radio" name="buf" .checked=${t.buffer === s} @change=${() => this._upd({ buffer: s })} /> ${c(`wz.buffer.${s}`)}</label>`
    )}
          </div>
          ${t.buffer !== "none" ? u`<label class="field">${c("wz.buffer_volume")} ${e("bufferVolume", "number")}</label>
                <label class="field">${c("ed.label")} ${e("bufferLabel")}</label>` : _}
        </div>

        <h3>${c("wz.dhw")}</h3>
        <div class="grid">
          <div class="radios">
            ${["tank", "none"].map(
      (s) => u`<label><input type="radio" name="dhw" .checked=${t.dhw === s} @change=${() => this._upd({ dhw: s })} /> ${c(`wz.dhw.${s}`)}</label>`
    )}
          </div>
          ${t.dhw === "tank" ? u`<label class="field">${c("wz.dhw_volume")} ${e("dhwVolume", "number")}</label>
                <label class="field">${c("ed.label")} ${e("dhwLabel")}</label>
                <label class="check"><input type="checkbox" .checked=${t.circulation} @change=${(s) => this._upd({ circulation: s.target.checked })} /> ${c("wz.circulation")}</label>` : _}
        </div>

        <h3>${c("wz.circuits")}</h3>
        ${t.circuits.map(
      (s, i) => u`<div class="circuit">
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
          ${I("plus")} ${c("wz.add_circuit")}</button>

        <h3>${c("wz.extras")}</h3>
        <div class="radios">
          <label><input type="checkbox" .checked=${t.separator} @change=${(s) => this._upd({ separator: s.target.checked })} /> ${c("wz.separator")}</label>
          <label><input type="checkbox" .checked=${t.expansion} @change=${(s) => this._upd({ expansion: s.target.checked })} /> ${c("wz.expansion")}</label>
        </div>

        <div class="row actions">
          <button @click=${() => this._cfg = We()}>${c("wz.example")}</button>
          <span class="spacer"></span>
          <button class="primary" @click=${this._generate}>${I("wand")} ${c("wz.generate")}</button>
        </div>
      </div>
    `;
  }
  _circ(t, e) {
    const s = this._cfg.circuits.map((i, n) => n === t ? { ...i, ...e } : i);
    this._upd({ circuits: s });
  }
};
pe.properties = { plant: { attribute: !1 }, _cfg: { state: !0 } }, pe.styles = [
  it,
  X`
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
let Ue = pe;
const de = class de extends G {
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
    yt(this, "save", t), this._msg = c("map.applied", { count: e });
  }
  render() {
    const t = !!this.hass?.__standalone, e = this._res, s = this.plant.components.flatMap(
      (i) => ft(i).filter((n) => !i.bindings[n.key] && !e?.suggestions.some((o) => o.component_id === i.id && o.slot === n.key)).map((n) => ({ c: i, s: n }))
    );
    return u`<div class="card">
      <h2>${c("map.title")}</h2>
      <p class="muted">${c("map.intro")}</p>
      ${t ? u`<p class="muted">${c("map.standalone")}</p>` : _}
      <div class="row">
        <button class="primary" ?disabled=${this._busy || t} @click=${this._scan}>${I("search")} ${c("map.scan")}</button>
        ${e ? u`<span class="muted">${c("map.found", { count: e.entity_count })}</span>` : _}
        <span class="spacer"></span>
        ${this._msg ? u`<span class="ok">${I("check")} ${this._msg}</span>` : _}
      </div>
      ${e && e.entity_count === 0 ? u`<div class="help"><b>${c("map.none")}</b><p>${c("map.none_help")}</p></div>` : _}
      ${e && e.suggestions.length ? u`<div class="tbl">
            <table>
              <thead><tr>
                <th><input type="checkbox" .checked=${this._sel.size === e.suggestions.length}
                  @change=${(i) => this._sel = i.target.checked ? new Set(e.suggestions.map((n) => `${n.component_id}|${n.slot}`)) : /* @__PURE__ */ new Set()} /></th>
                <th>${c("map.component")}</th><th>${c("map.slot")}</th><th>${c("map.entity")}</th><th>${c("map.value")}</th><th>${c("map.confidence")}</th>
              </tr></thead>
              <tbody>
                ${e.suggestions.map((i) => {
      const n = `${i.component_id}|${i.slot}`, o = this._comp(i.component_id), r = o?.bindings[i.slot], l = this.hass?.states[i.entity_id];
      return u`<tr>
                    <td><input type="checkbox" .checked=${this._sel.has(n)} @change=${(p) => {
        const d = new Set(this._sel);
        p.target.checked ? d.add(n) : d.delete(n), this._sel = d;
      }} /></td>
                    <td>${o?.label || i.component_id}</td>
                    <td>${vt(o?.type || "", i.slot)}</td>
                    <td><code>${i.entity_id}</code>${r && r !== i.entity_id ? u`<div class="muted small">${c("map.current")}: ${r}</div>` : _}</td>
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
      <div class="chips">${s.slice(0, 80).map(({ c: i, s: n }) => u`<span class="chip">${i.label || i.id}: ${vt(i.type, n.key)}</span>`)}</div>
    </div>`;
  }
};
de.properties = {
  plant: { attribute: !1 },
  hass: { attribute: !1 },
  api: { attribute: !1 },
  _res: { state: !0 },
  _sel: { state: !0 },
  _busy: { state: !0 },
  _msg: { state: !0 }
}, de.styles = [
  it,
  X`
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
let je = de;
const Wn = ["outdoor_unit", "indoor_unit", "buffer", "dhw_tank", "pump", "valve_3way", "mixer", "radiators", "floor_heating", "tap", "separator", "expansion_vessel"], he = class he extends G {
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
      await this.api.uploadIcon(s.name.replace(/\.[^.]+$/, ""), s.type || "image/svg+xml", i, this._iso), yt(this, "icons-changed");
    } catch (n) {
      const o = n?.code || n?.error?.code || "invalid_data";
      this._err = c(`ic.err.${o}`);
    }
  }
  async _delete(t) {
    await this.api.deleteIcon(t), yt(this, "icons-changed");
  }
  _typeDefault(t, e) {
    const s = structuredClone(this.plant);
    s.settings.typeIcons = { ...s.settings.typeIcons || {} }, e ? s.settings.typeIcons[t] = e : delete s.settings.typeIcons[t], yt(this, "save", s);
  }
  render() {
    const t = [...this.icons.values()];
    return u`<div class="card">
      <h2>${c("ic.title")}</h2>
      <p class="muted">${c("ic.intro")}</p>
      <div class="row">
        <label class="btn primary up">${I("upload")} ${c("ic.upload")}
          <input type="file" accept=".svg,.png,.webp,.jpg,.jpeg,image/svg+xml,image/png,image/webp,image/jpeg" @change=${this._upload} hidden /></label>
        <label class="row small"><input type="checkbox" .checked=${this._iso} @change=${(e) => this._iso = e.target.checked} /> ${c("ic.iso")}</label>
        ${this._err ? u`<span class="err">${this._err}</span>` : _}
      </div>
      ${t.length ? u`<div class="gallery">${t.map(
      (e) => u`<div class="ic">
              <div class="prev"><img src=${e.data_url} alt=${e.name} /></div>
              <div class="name">${e.name}${e.iso ? u` <span class="muted">· iso</span>` : _}</div>
              <button class="ghost danger icon" @click=${() => this._delete(e.id)}>${I("trash")}</button>
            </div>`
    )}</div>` : u`<p class="muted">${c("ic.empty")}</p>`}
      <h3>${c("ic.type_default")}</h3>
      <div class="defaults">
        ${Wn.map(
      (e) => u`<label class="field">${c(`type.${e}`)}
            <select @change=${(s) => this._typeDefault(e, s.target.value)}>
              <option value="">${c("ed.icon_default")}</option>
              ${t.map((s) => u`<option value=${s.id} ?selected=${this.plant.settings.typeIcons?.[e] === s.id}>${s.name}</option>`)}
            </select></label>`
    )}
      </div>
    </div>`;
  }
};
he.properties = { plant: { attribute: !1 }, api: { attribute: !1 }, icons: { attribute: !1 }, _err: { state: !0 }, _iso: { state: !0 } }, he.styles = [
  it,
  X`
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
let Fe = he;
const ue = class ue extends G {
  constructor() {
    super(...arguments), this.version = "";
  }
  _patch(t) {
    const e = structuredClone(this.plant);
    e.settings = { ...e.settings, ...t }, yt(this, "save", e);
  }
  render() {
    const t = this.plant.settings;
    return u`<div class="card wrap">
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
          ${["auto", "de", "en"].map((e) => u`<option value=${e} ?selected=${(t.language || "auto") === e}>${e === "auto" ? c("st.lang.auto") : e === "de" ? "Deutsch" : "English"}</option>`)}
        </select></label>
      <label class="field">${c("st.heat_load")}
        <input type="number" step="0.1" .value=${String(t.heat_load ?? 6.2)} @change=${(e) => this._patch({ heat_load: Number(e.target.value) })} /></label>
      <div class="row foot">
        <span class="muted">${c("st.version")} ${this.version}</span>
        <span class="spacer"></span>
        <button class="danger" @click=${() => confirm(c("st.reset_confirm")) && yt(this, "reset-plant")}>${c("st.reset")}</button>
      </div>
    </div>`;
  }
};
ue.properties = { plant: { attribute: !1 }, version: {} }, ue.styles = [
  it,
  X`
      .wrap { max-width: 640px; display: grid; gap: 16px; }
      .toggle { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; }
      .toggle input { margin-top: 4px; }
      .foot { margin-top: 8px; }
    `
];
let Ze = ue;
for (const [a, t] of [
  ["cp-wizard", Ue],
  ["cp-mapping", je],
  ["cp-icons", Fe],
  ["cp-settings", Ze]
])
  customElements.get(a) || customElements.define(a, t);
const Cn = 10 * 6e4, On = 5e3;
function Ns(a) {
  return a === void 0 ? "var(--cp-muted)" : a >= 3.5 ? $t.green : a >= 3 ? $t.yellow : $t.red;
}
const me = class me extends G {
  constructor() {
    super(...arguments), this.sim = null, this.version = 0, this._data = null, this._error = "", this._loadedAt = 0, this._loadedFor = null;
  }
  willUpdate() {
    const t = this.sim || this.plant, e = Date.now() - this._loadedAt;
    (t !== this._loadedFor || e > (this.sim ? On : Cn)) && (this._loadedFor = t, this._loadedAt = Date.now(), this._load());
  }
  async _load() {
    try {
      this._error = "", this.sim ? this._data = pn(this.sim) : this.hass && !this.hass.__standalone && (this._data = await cn(this.hass, this.plant));
    } catch (t) {
      this._error = t?.message || String(t);
    }
  }
  _live() {
    const t = oi(this.plant, this.src), e = 62, s = 2 * Math.PI * e, i = t ? Math.min(1, t.cop / 7) : 0, n = t ? $t[t.ampel] : "var(--cp-muted)";
    return u`<div class="card live">
      <div class="cap">${c("eff.live")}</div>
      <div class="gauge">
        <svg viewBox="0 0 160 160">
          <circle cx="80" cy="80" r=${e} class="track" />
          ${w`<circle cx="80" cy="80" r=${e} class="bar" style="stroke:${n};stroke-dasharray:${s * i} ${s}" />`}
        </svg>
        <div class="gv">
          <span class="big" style="color:${n}">${t ? K(t.cop, 1) : "–"}</span>
          <span class="muted">COP</span>
        </div>
      </div>
      ${t ? u`<div class="lv-row"><span>${c("eff.expected", { out: K(t.tOut, 0), flow: K(t.tFlow, 0) })}</span><b>${K(t.expected, 1)}</b></div>
            <div class="lv-row"><span>${c("eff.ratio")}</span><b style="color:${n}">${K(t.ratio * 100, 0)} %</b></div>
            <div class="verdict" style="border-color:${n}">${c(`eff.ampel.${t.ampel}`)}</div>` : u`<p class="muted small">${c("eff.no_live")}</p>`}
    </div>`;
  }
  _tile(t, e, s) {
    const i = Wt(e), n = e && e.heat > 0 ? e.heatDhw / e.heat : void 0, o = e && e.el > 0 ? e.aux / e.el : void 0;
    return u`<div class="card tile">
      <div class="cap">${c(`eff.${t}`)} ${s ? u`<span class="est">${c("eff.estimate")}</span>` : _}</div>
      <div class="spf" style="color:${Ns(i)}">${i !== void 0 ? K(i, 2) : "–"}<small>${t === "today" || t === "yesterday" ? "AZ" : "JAZ"}</small></div>
      <div class="kv"><span>${c("eff.heat")}</span><b>${e ? K(e.heat, e.heat >= 100 ? 0 : 1) : "–"} kWh</b></div>
      <div class="kv"><span>${c("eff.el")}</span><b>${e ? K(e.el, e.el >= 100 ? 0 : 1) : "–"} kWh</b></div>
      <div class="kv"><span>${c("eff.dhw_share")}</span><b>${n !== void 0 ? K(n * 100, 0) + " %" : "–"}</b></div>
      <div class="kv"><span>${c("eff.aux_share")}</span><b>${o !== void 0 ? K(o * 100, 1) + " %" : "–"}</b></div>
    </div>`;
  }
  _chart(t) {
    const e = t.daily.slice(-30);
    if (!e.length) return _;
    const s = 720, i = 200, n = { l: 34, r: 34, t: 10, b: 24 }, o = Math.max(1, ...e.map((m) => Math.max(m.heat, m.el))), r = (s - n.l - n.r) / e.length, l = (m) => n.t + (i - n.t - n.b) * (1 - m / o), p = (m) => n.t + (i - n.t - n.b) * (1 - Math.min(6, m) / 6), d = (m) => new Date(m).toLocaleDateString(Ti() === "de" ? "de-DE" : "en-GB", { day: "2-digit", month: "2-digit" }), h = e.map((m, f) => {
      const g = Wt(m);
      return g === void 0 ? null : `${n.l + f * r + r / 2},${p(g)}`;
    }).filter(Boolean).join(" ");
    return u`<div class="card chart">
      <div class="row head"><div class="cap">${c("eff.daily")}</div><span class="spacer"></span>
        <span class="lg"><i style="background:#ff8a3d"></i>${c("eff.heat")}</span>
        <span class="lg"><i style="background:#4d9fff"></i>${c("eff.el")}</span>
        <span class="lg"><i class="dot"></i>AZ</span></div>
      <svg viewBox="0 0 ${s} ${i}" preserveAspectRatio="none">
        ${[0, 0.5, 1].map((m) => w`<line class="grid" x1=${n.l} x2=${s - n.r} y1=${l(o * m)} y2=${l(o * m)} />
          <text class="axis" x=${n.l - 4} y=${l(o * m) + 3} text-anchor="end">${K(o * m, 0)}</text>`)}
        ${[2, 4, 6].map((m) => w`<text class="axis" x=${s - n.r + 4} y=${p(m) + 3}>${m}</text>`)}
        ${e.map((m, f) => {
      const g = n.l + f * r;
      return w`<g><title>${d(m.day)} · ${K(m.heat, 1)} / ${K(m.el, 1)} kWh · AZ ${Wt(m) !== void 0 ? K(Wt(m), 2) : "–"}</title>
            <rect x=${g + r * 0.12} y=${l(m.heat)} width=${r * 0.36} height=${i - n.b - l(m.heat)} rx="2" fill="#ff8a3d" />
            <rect x=${g + r * 0.5} y=${l(m.el)} width=${r * 0.36} height=${i - n.b - l(m.el)} rx="2" fill="#4d9fff" />
            ${f % 5 === 0 ? w`<text class="axis" x=${g + r / 2} y=${i - 6} text-anchor="middle">${d(m.day)}</text>` : _}</g>`;
    })}
        ${w`<polyline points=${h} fill="none" stroke="var(--cp-text)" stroke-width="1.5" stroke-dasharray="3 3" />`}
        ${e.map((m, f) => {
      const g = Wt(m);
      return g === void 0 ? _ : w`<circle cx=${n.l + f * r + r / 2} cy=${p(g)} r="3" fill=${Ns(g)} />`;
    })}
      </svg>
      ${t.estimated.month ? u`<p class="muted small">${c("eff.demo_note")}</p>` : _}
    </div>`;
  }
  render() {
    const t = this._data;
    return u`
      <div class="grid">
        ${this._live()}
        <div class="tiles">
          ${this._tile("today", t?.today ?? null, !1)}
          ${this._tile("yesterday", t?.yesterday ?? null, !1)}
          ${this._tile("month", t?.month ?? null, !!t?.estimated.month)}
          ${this._tile("year", t?.year ?? null, !!t?.estimated.year)}
        </div>
      </div>
      ${this._error ? u`<div class="card err">${this._error}</div>` : _}
      ${t?.missing ? u`<div class="card hint">${c(`eff.missing.${t.missing}`)}</div>` : _}
      ${t ? this._chart(t) : _}
    `;
  }
};
me.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  hass: { attribute: !1 },
  sim: { attribute: !1 },
  version: { type: Number },
  _data: { state: !0 },
  _error: { state: !0 }
}, me.styles = [
  it,
  X`
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
let Ge = me;
customElements.get("cp-efficiency") || customElements.define("cp-efficiency", Ge);
const Ye = 60;
function ht(a, t, e, s) {
  const i = new Array(e).fill(null), n = [...a].sort((l, p) => l.t - p.t);
  let o = 0, r = null;
  for (let l = 0; l < e; l++) {
    const p = t + l * Ye;
    for (; o < n.length && n[o].t <= p; ) r = s(n[o++]);
    i[l] = r;
  }
  return i;
}
const ut = (a) => a.v === null || Number.isNaN(a.v) ? null : a.v;
function Ks(a) {
  const t = [];
  let e = -1;
  return a.forEach((s, i) => {
    s && e < 0 && (e = i), !s && e >= 0 && (t.push([e, i]), e = -1);
  }), e >= 0 && t.push([e, a.length]), t;
}
function Us(a) {
  const t = a.filter((e) => e !== null);
  return t.length ? t.reduce((e, s) => e + s, 0) / t.length : void 0;
}
const De = (a, ...t) => a.components.find((e) => t.includes(e.type));
async function at(a, t, e, s) {
  if (!t || a.get(t, e) === void 0) return [];
  try {
    return await a.history(t, e, s);
  } catch {
    return [];
  }
}
async function Hn(a, t, e = 24, s = Date.now() / 1e3) {
  const i = De(a, "outdoor_unit"), n = De(a, "indoor_unit"), o = De(a, "buffer"), r = Math.floor(e * 3600 / Ye), l = s - r * Ye, [p, d, h, m, f, g, b, x, y, T, S] = await Promise.all([
    at(t, i, "compressor_on", e),
    at(t, i, "compressor_speed", e),
    at(t, i, "heat_power", e),
    at(t, i, "activity", e),
    at(t, n, "supply_temp", e),
    at(t, n, "return_temp", e),
    at(t, o, "temp_top", e),
    at(t, n, "buffer_temp", e),
    at(t, n, "aux_level", e),
    at(t, n, "vw1_position", e),
    at(t, n, "pressure", e)
  ]), A = p.length ? p : d.length ? d : h, P = ht(A, l, r, ut).map((D) => D !== null && D > (A === h ? 0.2 : 0)), V = ht(m, l, r, (D) => ye({ raw: D.raw ?? null, available: D.raw !== void 0 }) ?? null), Y = V.map((D) => D === "defrost"), E = ht(T, l, r, ut).map((D, z) => D !== null ? D > 0 : V[z] === "hot_water"), L = P.map((D, z) => D && !Y[z] && !E[z]), U = L.map((D, z) => D && L.slice(Math.max(0, z - 5), z).every(Boolean) && z >= 5), Q = A.length > 0, C = [], O = b.length ? b : x;
  if (o || x.length) {
    const D = ht(f, l, r, ut), z = ht(O, l, r, ut), R = D.map((W, H) => U[H] && W !== null && z[H] !== null ? W - z[H] : null), M = Us(R);
    C.push(
      M === void 0 ? { id: "mixing", ampel: "none", detail: "chk.nodata", params: {} } : {
        id: "mixing",
        ampel: M <= 2 ? "green" : M <= 4 ? "yellow" : "red",
        value: `${K(M, 1)} K`,
        detail: "chk.mixing.detail",
        params: { value: M, minutes: R.filter((W) => W !== null).length },
        hint: "chk.mixing.hint"
      }
    );
  }
  if (Q) {
    const z = Ks(P).filter(([q]) => q > 0), R = z.length, M = z.length ? z.reduce((q, [et, lt]) => q + (lt - et), 0) / z.length : void 0;
    let W = 0;
    for (let q = 0; q + 60 <= r; q += 10) W = Math.max(W, z.filter(([et]) => et >= q && et < q + 60).length);
    const H = R / e, F = H <= 1 && W <= 3 && (M ?? 99) >= 20 ? "green" : W > 4 || (M ?? 99) < 10 ? "red" : "yellow";
    C.push({
      id: "cycling",
      ampel: R === 0 ? "green" : F,
      value: `${R}×`,
      detail: "chk.cycling.detail",
      params: { starts: R, perHour: H, maxPerHour: W, avgRun: M ?? 0, hours: e },
      hint: "chk.cycling.hint"
    });
  } else
    C.push({ id: "cycling", ampel: "none", detail: "chk.nodata", params: {} });
  {
    const D = ht(f, l, r, ut), z = ht(g, l, r, ut), R = D.map((W, H) => U[H] && W !== null && z[H] !== null ? W - z[H] : null), M = Us(R);
    C.push(
      M === void 0 ? { id: "spread", ampel: "none", detail: "chk.nodata", params: {} } : {
        id: "spread",
        ampel: M >= 3 && M <= 8 ? "green" : M >= 2 && M <= 10 ? "yellow" : "red",
        value: `${K(M, 1)} K`,
        detail: "chk.spread.detail",
        params: { value: M },
        hint: M < 3 ? "chk.spread.hint_low" : "chk.spread.hint_high"
      }
    );
  }
  if (m.length) {
    const D = Ks(Y), z = D.reduce((W, [H, F]) => W + (F - H), 0), R = P.filter(Boolean).length || 1, M = z / R;
    C.push({
      id: "defrost",
      ampel: M <= 0.08 ? "green" : M <= 0.15 ? "yellow" : "red",
      value: `${D.length}×`,
      detail: "chk.defrost.detail",
      params: { count: D.length, minutes: z, share: M * 100 },
      hint: "chk.defrost.hint"
    });
  }
  if (y.length) {
    const z = ht(y, l, r, ut).map((R) => R !== null && R > 0).filter(Boolean).length;
    C.push({
      id: "aux",
      ampel: z === 0 ? "green" : z <= 60 ? "yellow" : "red",
      value: z ? `${Math.round(z)} min` : "0",
      detail: "chk.aux.detail",
      params: { minutes: z },
      hint: "chk.aux.hint"
    });
  }
  if (S.length && n) {
    const D = S.map(ut).filter((F) => F !== null), z = Number(n.props.pressure_min ?? 1), R = Number(n.props.pressure_max ?? 2.7), M = Math.min(...D), W = Math.max(...D), H = D.length ? D[0] - D[D.length - 1] : 0;
    C.push({
      id: "pressure",
      ampel: M < z || W > R ? "red" : M < z + 0.2 || H > 0.2 ? "yellow" : "green",
      value: `${K(M, 1)}–${K(W, 1)} bar`,
      detail: "chk.pressure.detail",
      params: { min: M, max: W, lo: z, hi: R },
      hint: "chk.pressure.hint"
    });
  }
  return C;
}
const Bn = 2e4, Rn = 5 * 6e4;
function js(a) {
  const t = {};
  for (const [e, s] of Object.entries(a)) t[e] = typeof s == "number" ? K(s, Number.isInteger(s) ? 0 : 1) : s;
  return t;
}
const fe = class fe extends G {
  constructor() {
    super(...arguments), this.sim = null, this.version = 0, this._results = null, this._busy = !1, this._at = 0, this._for = null;
  }
  willUpdate() {
    const t = this.sim || this.plant;
    (t !== this._for || Date.now() - this._at > (this.sim ? Bn : Rn)) && (this._for = t, this._at = Date.now(), this._run());
  }
  async _run() {
    if (!this._busy) {
      this._busy = !0;
      try {
        this._results = await Hn(this.plant, this.src, 24, this.sim ? this.sim.time : Date.now() / 1e3);
      } finally {
        this._busy = !1;
      }
    }
  }
  render() {
    const t = this._results, e = (s) => (t || []).filter((i) => i.ampel === s).length;
    return u`
      <div class="card head">
        <div>
          <h2>${c("chk.title")}</h2>
          <p class="muted">${c("chk.subtitle")}${this.sim ? ` ${c("chk.demo")}` : ""}</p>
        </div>
        <span class="spacer"></span>
        ${t ? u`<div class="sum">
              ${["green", "yellow", "red"].map((s) => u`<span class="dot" style="background:${$t[s]}"></span><b>${e(s)}</b>`)}
            </div>` : _}
        <button @click=${() => this._run()} ?disabled=${this._busy}>${c("chk.refresh")}</button>
      </div>
      ${t ? u`<div class="list">
            ${t.map(
      (s) => u`<div class="card item ${s.ampel}">
                <span class="lamp" style="background:${s.ampel === "none" ? "var(--cp-muted)" : $t[s.ampel]}"></span>
                <div class="body">
                  <div class="row nowrap">
                    <b class="title">${c(`chk.${s.id}.title`)}</b>
                    <span class="spacer"></span>
                    ${s.value ? u`<span class="val">${s.value}</span>` : _}
                  </div>
                  <div class="detail">${c(s.detail, js(s.params))}</div>
                  ${s.hint && (s.ampel === "yellow" || s.ampel === "red") ? u`<div class="hint">${c(s.hint, js(s.params))}</div>` : _}
                  ${s.ampel === "green" ? u`<div class="ok">${c("chk.ok")}</div>` : _}
                </div>
              </div>`
    )}
          </div>` : u`<div class="card muted">${c("chk.running")}</div>`}
    `;
  }
};
fe.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  sim: { attribute: !1 },
  version: { type: Number },
  _results: { state: !0 },
  _busy: { state: !0 }
}, fe.styles = [
  it,
  X`
      :host { display: grid; gap: 12px; align-content: start; }
      .head { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
      .head p { margin: 0; font-size: 13px; }
      .sum { display: flex; align-items: center; gap: 6px; font-size: 15px; }
      .sum b { margin-right: 8px; }
      .dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
      .list { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 12px; }
      .item { display: flex; gap: 12px; }
      .lamp { width: 14px; height: 14px; border-radius: 50%; margin-top: 3px; flex: none; box-shadow: 0 0 12px currentColor; }
      .body { flex: 1; display: grid; gap: 6px; }
      .nowrap { flex-wrap: nowrap; }
      .title { font-size: 15px; }
      .val { font-size: 18px; font-weight: 800; font-variant-numeric: tabular-nums; }
      .detail { font-size: 13px; color: var(--cp-muted); line-height: 1.45; }
      .hint { font-size: 13px; line-height: 1.45; padding: 8px 10px; border-radius: 10px; background: color-mix(in srgb, var(--cp-warn) 12%, var(--cp-surface-2)); }
      .item.red .hint { background: color-mix(in srgb, var(--cp-error) 14%, var(--cp-surface-2)); }
      .ok { font-size: 12px; color: var(--cp-accent); font-weight: 600; }
    `
];
let qe = fe;
customElements.get("cp-check") || customElements.define("cp-check", qe);
const ge = class ge extends G {
  constructor() {
    super(...arguments), this.isPanel = !1, this._config = { type: "custom:copilot-card" }, this._ctl = new si(this, !1);
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
    return u`<ha-card style="height:${s}">
      ${this._ctl.error ? u`<div class="err">${this._ctl.error}</div>` : _}
      ${e ? u`<cp-overview
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
          ></cp-overview>` : u`<div class="loading">${Oe}</div>`}
    </ha-card>`;
  }
};
ge.properties = {
  hass: { attribute: !1 },
  isPanel: { type: Boolean },
  _config: { state: !0 }
}, ge.styles = [
  ii,
  it,
  X`
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
let Je = ge;
const _e = class _e extends G {
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
    const t = this._config, e = (s, i, n) => u`<label class="row">
      <input type="checkbox" .checked=${t[s] ?? n} @change=${(o) => this._set(s, o.target.checked)} />
      ${i}</label>`;
    return u`<div class="ed">
      ${e("show_kpis", c("card.show_kpis"), !0)}
      ${e("show_messages", c("card.show_messages"), !1)}
      ${e("show_demo_controls", c("card.show_demo"), !1)}
      <label class="field">${c("card.height")}
        <input .value=${t.height || ""} placeholder="560px" @change=${(s) => this._set("height", s.target.value.trim())} /></label>
      <p class="hint">${c("card.hint")}</p>
    </div>`;
  }
};
_e.properties = { hass: { attribute: !1 }, _config: { state: !0 } }, _e.styles = [
  it,
  X`
      .ed { display: grid; gap: 10px; color: var(--primary-text-color); }
      .row { display: flex; gap: 8px; align-items: center; font-size: 14px; }
      .field { color: var(--secondary-text-color); }
      input:not([type]) { background: transparent; color: var(--primary-text-color); border-color: var(--divider-color); }
      .hint { font-size: 12px; color: var(--secondary-text-color); margin: 0; }
    `
];
let Xe = _e;
customElements.get("copilot-card") || customElements.define("copilot-card", Je);
customElements.get("copilot-card-editor") || customElements.define("copilot-card-editor", Xe);
const ie = window;
ie.customCards = ie.customCards || [];
ie.customCards.some((a) => a.type === "copilot-card") || ie.customCards.push({
  type: "copilot-card",
  name: "COPilot",
  description: "Animated heat pump schematic with live values",
  preview: !1,
  documentationURL: "https://github.com/junky84/copilot"
});
const Fs = "copilot.view";
function In(a) {
  try {
    return localStorage.getItem(a);
  } catch {
    return null;
  }
}
function Vn(a, t) {
  try {
    localStorage.setItem(a, t);
  } catch {
  }
}
const we = class we extends G {
  constructor() {
    super(), this.narrow = !1, this._ctl = new si(this), this._view = "overview", this._sub = "editor", this._toast = "";
    const t = In(Fs);
    if (t) {
      const [e, s] = t.split(":");
      (e === "overview" || e === "efficiency" || e === "check" || e === "messages" || e === "config") && (this._view = e), s && (this._sub = s);
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
    this._view = t, e && (this._sub = e), Vn(Fs, `${this._view}:${this._sub}`);
  }
  _fullscreen() {
    document.fullscreenElement ? document.exitFullscreen() : this.requestFullscreen?.().catch(() => {
    });
  }
  render() {
    const t = this._ctl.plant, e = this._ctl.messages.filter((s) => s.active && (s.level === "warning" || s.level === "error")).length;
    return u`<div class="shell">
      <header>
        ${this.narrow ? u`<button class="ghost icon" title=${c("menu")} @click=${() => this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: !0, composed: !0 }))}>${I("menu")}</button>` : _}
        <div class="brand">${Oe}<span>COP<b>ilot</b></span></div>
        <nav>
          ${["overview", "efficiency", "check", "messages", "config"].map(
      (s) => u`<button class="tab ${this._view === s ? "on" : ""}" @click=${() => this._go(s)}>
              ${I(s === "overview" ? "grid" : s === "efficiency" ? "chart" : s === "check" ? "check" : s === "messages" ? "bell" : "gear")}
              <span class="tl">${c(`nav.${s}`)}</span>
              ${s === "messages" && e ? u`<span class="badge">${e}</span>` : _}
            </button>`
    )}
        </nav>
        <span class="spacer"></span>
        ${t?.settings.demo ? u`<span class="demo-pill">${I("flask")}<span class="tl">${c("demo")}</span></span>` : _}
        <button class="ghost icon" title=${c("fullscreen")} @click=${this._fullscreen}>${I("expand")}</button>
      </header>
      <main>
        ${this._ctl.error ? u`<div class="card err">${this._ctl.error}</div>` : _}
        ${this._ctl.api?.standalone ? u`<div class="note muted">${c("standalone_hint")}</div>` : _}
        ${t ? this._content(t) : u`<div class="loading">${Oe}</div>`}
      </main>
      ${this._toast ? u`<div class="toast">${this._toast}</div>` : _}
    </div>`;
  }
  _content(t) {
    const e = this._ctl.src;
    if (this._view === "overview")
      return u`<cp-overview
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
      return u`<cp-efficiency
        .plant=${t}
        .src=${e}
        .hass=${this.hass}
        .sim=${this._ctl.sim}
        .version=${this._ctl.version}
      ></cp-efficiency>`;
    if (this._view === "check")
      return u`<cp-check .plant=${t} .src=${e} .sim=${this._ctl.sim} .version=${this._ctl.version}></cp-check>`;
    if (this._view === "messages")
      return u`<div class="card pad"><cp-messages
        .messages=${this._ctl.messages}
        ?canClear=${this._ctl.admin && !this._ctl.sim}
        @clear=${() => this._ctl.clearMessages()}
      ></cp-messages></div>`;
    if (!this._ctl.admin) return u`<div class="card">${c("readonly_hint")}</div>`;
    const s = ["wizard", "editor", "mapping", "icons", "settings"], i = (n) => this._save(n.detail);
    return u`
      <div class="subnav">
        ${s.map((n) => u`<button class="sub ${this._sub === n ? "on" : ""}" @click=${() => this._go("config", n)}>${c(`cfg.${n}`)}</button>`)}
      </div>
      <div class="cfg ${this._sub === "editor" ? "fill" : ""}">
        ${this._sub === "wizard" ? u`<cp-wizard .plant=${t} @plant-generated=${async (n) => {
      await this._save(n.detail), this._showToast(c("wz.done")), this._go("config", "editor");
    }}></cp-wizard>` : _}
        ${this._sub === "editor" ? u`<cp-editor .plant=${t} .hass=${this.hass} .src=${e} .icons=${this._ctl.icons} .version=${this._ctl.version} @save=${i}></cp-editor>` : _}
        ${this._sub === "mapping" ? u`<cp-mapping .plant=${t} .hass=${this.hass} .api=${this._ctl.api} @save=${i}></cp-mapping>` : _}
        ${this._sub === "icons" ? u`<cp-icons .plant=${t} .api=${this._ctl.api} .icons=${this._ctl.icons} @save=${i} @icons-changed=${() => this._ctl.loadIcons()}></cp-icons>` : _}
        ${this._sub === "settings" ? u`<cp-settings .plant=${t} .version=${this._ctl.backendVersion} @save=${i}
              @reset-plant=${() => this._save({ ...Ce(), settings: { ...Ce().settings, demo: !0 } })}></cp-settings>` : _}
      </div>
    `;
  }
};
we.properties = {
  hass: { attribute: !1 },
  narrow: { type: Boolean },
  route: { attribute: !1 },
  panel: { attribute: !1 },
  _view: { state: !0 },
  _sub: { state: !0 },
  _toast: { state: !0 }
}, we.styles = [
  ii,
  it,
  X`
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
let Qe = we;
customElements.get("copilot-panel") || customElements.define("copilot-panel", Qe);
export {
  Qe as CopilotPanel
};
