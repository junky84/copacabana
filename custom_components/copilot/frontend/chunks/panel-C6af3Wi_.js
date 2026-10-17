/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt = globalThis, ys = nt.ShadowRoot && (nt.ShadyCSS === void 0 || nt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, xs = Symbol(), Cs = /* @__PURE__ */ new WeakMap();
let Ai = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== xs) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ys && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = Cs.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Cs.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ji = (r) => new Ai(typeof r == "string" ? r : r + "", void 0, xs), Q = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new Ai(t, r, xs);
}, Xi = (r, e) => {
  if (ys) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), i = nt.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = t.cssText, r.appendChild(s);
  }
}, Ds = ys ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return Ji(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Qi, defineProperty: en, getOwnPropertyDescriptor: tn, getOwnPropertyNames: sn, getOwnPropertySymbols: nn, getPrototypeOf: rn } = Object, Dt = globalThis, Ts = Dt.trustedTypes, on = Ts ? Ts.emptyScript : "", an = Dt.reactiveElementPolyfillSupport, je = (r, e) => r, Jt = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? on : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let t = r;
  switch (e) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch {
        t = null;
      }
  }
  return t;
} }, Wi = (r, e) => !Qi(r, e), Ls = { attribute: !0, type: String, converter: Jt, reflect: !1, useDefault: !1, hasChanged: Wi };
Symbol.metadata ??= Symbol("metadata"), Dt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Ce = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Ls) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, t);
      i !== void 0 && en(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: i, set: n } = tn(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: i, set(o) {
      const a = i?.call(this);
      n?.call(this, o), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ls;
  }
  static _$Ei() {
    if (this.hasOwnProperty(je("elementProperties"))) return;
    const e = rn(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(je("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(je("properties"))) {
      const t = this.properties, s = [...sn(t), ...nn(t)];
      for (const i of s) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, i] of t) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const i = this._$Eu(t, s);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const i of s) t.unshift(Ds(i));
    } else e !== void 0 && t.push(Ds(e));
    return t;
  }
  static _$Eu(e, t) {
    const s = t.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const s of t.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Xi(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, s) {
    this._$AK(e, s);
  }
  _$ET(e, t) {
    const s = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, s);
    if (i !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : Jt).toAttribute(t, s.type);
      this._$Em = e, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Jt;
      this._$Em = i;
      const a = o.fromAttribute(t, n.type);
      this[i] = a ?? this._$Ej?.get(i) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, i = !1, n) {
    if (e !== void 0) {
      const o = this.constructor;
      if (i === !1 && (n = this[e]), s ??= o.getPropertyOptions(e), !((s.hasChanged ?? Wi)(n, t) || s.useDefault && s.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: i, wrapped: n }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), n !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
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
        const { wrapped: o } = n, a = this[i];
        o !== !0 || this._$AL.has(i) || a === void 0 || this.C(i, void 0, n, a);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Ce.elementStyles = [], Ce.shadowRootOptions = { mode: "open" }, Ce[je("elementProperties")] = /* @__PURE__ */ new Map(), Ce[je("finalized")] = /* @__PURE__ */ new Map(), an?.({ ReactiveElement: Ce }), (Dt.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $s = globalThis, Os = (r) => r, ct = $s.trustedTypes, Hs = ct ? ct.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Pi = "$lit$", _e = `lit$${Math.random().toFixed(9).slice(2)}$`, Ci = "?" + _e, ln = `<${Ci}>`, Me = document, Ze = () => Me.createComment(""), Ge = (r) => r === null || typeof r != "object" && typeof r != "function", ks = Array.isArray, cn = (r) => ks(r) || typeof r?.[Symbol.iterator] == "function", Ot = `[ 	
\f\r]`, Be = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Bs = /-->/g, Vs = />/g, ye = RegExp(`>|${Ot}(?:([^\\s"'>=/]+)(${Ot}*=${Ot}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Rs = /'/g, Ns = /"/g, Di = /^(?:script|style|textarea|title)$/i, Ti = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), f = Ti(1), k = Ti(2), Te = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), Is = /* @__PURE__ */ new WeakMap(), $e = Me.createTreeWalker(Me, 129);
function Li(r, e) {
  if (!ks(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Hs !== void 0 ? Hs.createHTML(e) : e;
}
const pn = (r, e) => {
  const t = r.length - 1, s = [];
  let i, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = Be;
  for (let a = 0; a < t; a++) {
    const l = r[a];
    let p, d, h = -1, u = 0;
    for (; u < l.length && (o.lastIndex = u, d = o.exec(l), d !== null); ) u = o.lastIndex, o === Be ? d[1] === "!--" ? o = Bs : d[1] !== void 0 ? o = Vs : d[2] !== void 0 ? (Di.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = ye) : d[3] !== void 0 && (o = ye) : o === ye ? d[0] === ">" ? (o = i ?? Be, h = -1) : d[1] === void 0 ? h = -2 : (h = o.lastIndex - d[2].length, p = d[1], o = d[3] === void 0 ? ye : d[3] === '"' ? Ns : Rs) : o === Ns || o === Rs ? o = ye : o === Bs || o === Vs ? o = Be : (o = ye, i = void 0);
    const m = o === ye && r[a + 1].startsWith("/>") ? " " : "";
    n += o === Be ? l + ln : h >= 0 ? (s.push(p), l.slice(0, h) + Pi + l.slice(h) + _e + m) : l + _e + (h === -2 ? a : m);
  }
  return [Li(r, n + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class Ye {
  constructor({ strings: e, _$litType$: t }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const a = e.length - 1, l = this.parts, [p, d] = pn(e, t);
    if (this.el = Ye.createElement(p, s), $e.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = $e.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(Pi)) {
          const u = d[o++], m = i.getAttribute(h).split(_e), _ = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: n, name: _[2], strings: m, ctor: _[1] === "." ? hn : _[1] === "?" ? un : _[1] === "@" ? mn : Tt }), i.removeAttribute(h);
        } else h.startsWith(_e) && (l.push({ type: 6, index: n }), i.removeAttribute(h));
        if (Di.test(i.tagName)) {
          const h = i.textContent.split(_e), u = h.length - 1;
          if (u > 0) {
            i.textContent = ct ? ct.emptyScript : "";
            for (let m = 0; m < u; m++) i.append(h[m], Ze()), $e.nextNode(), l.push({ type: 2, index: ++n });
            i.append(h[u], Ze());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ci) l.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(_e, h + 1)) !== -1; ) l.push({ type: 7, index: n }), h += _e.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const s = Me.createElement("template");
    return s.innerHTML = e, s;
  }
}
function Le(r, e, t = r, s) {
  if (e === Te) return e;
  let i = s !== void 0 ? t._$Co?.[s] : t._$Cl;
  const n = Ge(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, t, s)), s !== void 0 ? (t._$Co ??= [])[s] = i : t._$Cl = i), i !== void 0 && (e = Le(r, i._$AS(r, e.values), i, s)), e;
}
class dn {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: s } = this._$AD, i = (e?.creationScope ?? Me).importNode(t, !0);
    $e.currentNode = i;
    let n = $e.nextNode(), o = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let p;
        l.type === 2 ? p = new Je(n, n.nextSibling, this, e) : l.type === 1 ? p = new l.ctor(n, l.name, l.strings, this, e) : l.type === 6 && (p = new fn(n, this, e)), this._$AV.push(p), l = s[++a];
      }
      o !== l?.index && (n = $e.nextNode(), o++);
    }
    return $e.currentNode = Me, i;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class Je {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, s, i) {
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = Le(this, e, t), Ge(e) ? e === v || e == null || e === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : e !== this._$AH && e !== Te && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : cn(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== v && Ge(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Me.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = Ye.createElement(Li(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(t);
    else {
      const n = new dn(i, this), o = n.u(this.options);
      n.p(t), this.T(o), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = Is.get(e.strings);
    return t === void 0 && Is.set(e.strings, t = new Ye(e)), t;
  }
  k(e) {
    ks(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, i = 0;
    for (const n of e) i === t.length ? t.push(s = new Je(this.O(Ze()), this.O(Ze()), this, this.options)) : s = t[i], s._$AI(n), i++;
    i < t.length && (this._$AR(s && s._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const s = Os(e).nextSibling;
      Os(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Tt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, i, n) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = v;
  }
  _$AI(e, t = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) e = Le(this, e, t, 0), o = !Ge(e) || e !== this._$AH && e !== Te, o && (this._$AH = e);
    else {
      const a = e;
      let l, p;
      for (e = n[0], l = 0; l < n.length - 1; l++) p = Le(this, a[s + l], t, l), p === Te && (p = this._$AH[l]), o ||= !Ge(p) || p !== this._$AH[l], p === v ? e = v : e !== v && (e += (p ?? "") + n[l + 1]), this._$AH[l] = p;
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class hn extends Tt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === v ? void 0 : e;
  }
}
class un extends Tt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== v);
  }
}
class mn extends Tt {
  constructor(e, t, s, i, n) {
    super(e, t, s, i, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Le(this, e, t, 0) ?? v) === Te) return;
    const s = this._$AH, i = e === v && s !== v || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== v && (s === v || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class fn {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Le(this, e);
  }
}
const gn = $s.litHtmlPolyfillSupport;
gn?.(Ye, Je), ($s.litHtmlVersions ??= []).push("3.3.3");
const _n = (r, e, t) => {
  const s = t?.renderBefore ?? e;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = t?.renderBefore ?? null;
    s._$litPart$ = i = new Je(e.insertBefore(Ze(), n), n, void 0, t ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ss = globalThis;
class Y extends Ce {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = _n(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Te;
  }
}
Y._$litElement$ = !0, Y.finalized = !0, Ss.litElementHydrateSupport?.({ LitElement: Y });
const vn = Ss.litElementPolyfillSupport;
vn?.({ LitElement: Y });
(Ss.litElementVersions ??= []).push("4.2.2");
const Ks = "copilot.standalone.plant", Ve = "copilot.standalone.icons";
function Xe(r, e) {
  try {
    const t = localStorage.getItem(r);
    return t ? JSON.parse(t) : e;
  } catch {
    return e;
  }
}
function Ht(r, e) {
  try {
    localStorage.setItem(r, JSON.stringify(e));
  } catch {
  }
}
class wn {
  constructor(e) {
    this.hass = e;
  }
  get standalone() {
    return !!this.hass.__standalone;
  }
  setHass(e) {
    this.hass = e;
  }
  async getConfig() {
    return this.standalone ? { version: "demo", plant: Xe(Ks, null), options: {}, is_admin: !0 } : this.hass.callWS({ type: "copilot/config/get" });
  }
  async saveConfig(e) {
    if (this.standalone) return Ht(Ks, e);
    await this.hass.callWS({ type: "copilot/config/save", plant: e });
  }
  async write(e, t, s) {
    return this.hass.callWS({ type: "copilot/write", component_id: e, slot: t, value: s });
  }
  async listBackups() {
    return this.standalone ? [] : (await this.hass.callWS({ type: "copilot/backups/list" })).backups;
  }
  async restoreBackup(e) {
    return (await this.hass.callWS({ type: "copilot/backups/restore", ts: e })).plant;
  }
  async scan(e) {
    return this.standalone ? { source: "ems_esp", entity_count: 0, entities: [], suggestions: [] } : this.hass.callWS({ type: "copilot/mapping/scan", source: "ems_esp", plant: e });
  }
  async listIcons() {
    return this.standalone ? Xe(Ve, []) : (await this.hass.callWS({ type: "copilot/icons/list" })).icons;
  }
  async uploadIcon(e, t, s, i) {
    if (this.standalone) {
      const n = Xe(Ve, []), o = { id: Math.random().toString(16).slice(2, 14), name: e, mime: t, iso: i, size: s.length, data_url: `data:${t};base64,${s}` };
      return n.push(o), Ht(Ve, n), o;
    }
    return (await this.hass.callWS({ type: "copilot/icons/upload", name: e, mime: t, data: s, iso: i })).icon;
  }
  async deleteIcon(e) {
    if (this.standalone) return Ht(Ve, Xe(Ve, []).filter((t) => t.id !== e));
    await this.hass.callWS({ type: "copilot/icons/delete", icon_id: e });
  }
  async listMessages() {
    return this.standalone ? [] : (await this.hass.callWS({ type: "copilot/messages/list" })).messages;
  }
  async subscribeMessages(e) {
    return this.standalone || !this.hass.connection ? () => {
    } : this.hass.connection.subscribeMessage((t) => e(t.message), {
      type: "copilot/messages/subscribe"
    });
  }
  async clearMessages() {
    this.standalone || await this.hass.callWS({ type: "copilot/messages/clear" });
  }
}
const bn = {
  // navigation
  "nav.overview": "Übersicht",
  "nav.messages": "Meldungen",
  "nav.curve": "Heizkurve",
  "cv.title": "Heizkurve",
  "cv.curve": "aktuelle Kurve",
  "cv.preview": "Vorschau",
  "cv.points": "Messpunkte (Stundenmittel, {days} Tage)",
  "cv.now": "jetzt",
  "cv.axis_flow": "Vorlauf °C",
  "cv.no_heating": "Heizgrenze",
  "cv.params": "Parameter",
  "cv.p.design": "Auslegungstemperatur",
  "cv.p.offset": "Parallelverschiebung",
  "cv.p.limit": "Heizgrenze (Sommer ab)",
  "cv.p.minFlow": "Min. Vorlauf",
  "cv.p.maxFlow": "Max. Vorlauf",
  "cv.p.minExt": "Min. Außentemperatur",
  "cv.p.roomSet": "Raum-Soll",
  "cv.readonly": "Zum Verstellen müssen die Parameter beschreibbaren Entitäten (number) zugeordnet sein – EMS-ESP stellt sie als „number“ bereit.",
  "cv.applied": "Übernommen.",
  "cv.analysis": "Auswertung",
  "cv.deviation_above": "Die Messpunkte liegen im Mittel {value} K über der Kurve.",
  "cv.deviation_below": "Die Messpunkte liegen im Mittel {value} K unter der Kurve.",
  "cv.room": "Raumtemperatur im Mittel {room} °C bei einem Soll von {set} °C.",
  "cv.suggest_down": "Es wird wärmer als nötig. Vorschlag: Parallelverschiebung um {value} K auf {target} K senken – spart Strom.",
  "cv.suggest_up": "Es wird nicht ganz warm genug. Vorschlag: Parallelverschiebung um {value} K auf {target} K anheben.",
  "cv.try": "Als Vorschau übernehmen",
  "cv.fits": "Raumtemperatur passt – Kurve muss nicht geändert werden.",
  "cv.no_room": "Für eine Empfehlung bitte die Raumtemperatur (Referenzraum) am Heizkreis zuordnen.",
  "cv.no_points": "Noch keine Messpunkte: Außentemperatur und Vorlauf brauchen eine Langzeitstatistik (entsteht nach etwa einer Stunde).",
  "cv.demo_note": "Demo: Die letzten 24 h stammen aus der Simulation, ältere Punkte sind modelliert. Änderungen wirken sofort auf die Simulation.",
  "cv.confirm_title": "Heizkurve ändern?",
  "cv.confirm_demo": "Die Änderung gilt für die Simulation.",
  "cv.confirm_live": "Die Werte werden über EMS-ESP an die Regelung (BC400) geschrieben.",
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
  "eff.spf_short": "AZ",
  "cv.tip": "{out} außen → {flow} Vorlauf",
  "cv.target": "Soll jetzt",
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
  "wr.title": "Wert ändern",
  "wr.change": "Ändern …",
  "wr.press": "Auslösen …",
  "wr.apply": "Übernehmen",
  "wr.confirm": "Wirklich ändern: {old} → {new}?",
  "wr.press_confirm": "Wirklich auslösen?",
  "wr.done": "Geändert – die Anlage übernimmt den Wert in Kürze.",
  "wr.failed": "Nicht geändert",
  "wr.demo": "Im Demo-Modus und in der Zeitmaschine kann nichts geändert werden.",
  "wr.no_permission": "Nur Administratoren dürfen Werte ändern.",
  "wr.on": "Ein",
  "wr.off": "Aus",
  "wr.release": "Schreibbar: darf aus COPilot geändert werden (mit Bestätigung)",
  "msgk.value_changed": "{component}: {slot_label} geändert {old} → {new} ({user})",
  "st.write_non_admin": "Auch Nicht-Admins dürfen freigegebene Werte ändern",
  "st.write_hint": "Werte werden im Editor einzeln mit ✎ freigegeben. Jede Änderung braucht eine Bestätigung und wird unter Meldungen protokolliert.",
  "nav.maintenance": "Wartung",
  "msgk.maintenance_due": "Wartung fällig: {task}",
  "mt.title": "Wartungskalender",
  "mt.hint": "Wiederkehrende Aufgaben rund um die Anlage. Fällige Aufgaben erscheinen auch unter Meldungen (und lösen das Event copilot_message aus, z. B. für eine Push-Nachricht). Intervalle sind Richtwerte – maßgeblich sind die Anleitungen deiner Geräte.",
  "mt.n_due": "{n} fällig",
  "mt.all_ok": "Alles erledigt",
  "mt.n_unknown": "{n} ohne Datum",
  "mt.enter_date": "Noch kein Datum – bitte „Zuletzt“ eintragen",
  "mt.overdue": "Fällig seit {n} Tagen",
  "mt.next": "Nächste am {date} (in {n} Tagen)",
  "mt.last": "Zuletzt",
  "mt.every": "Alle",
  "mt.months": "Monate",
  "mt.done": "Erledigt",
  "mt.done_confirm": "„{task}“ heute als erledigt eintragen?",
  "mt.remove": "Entfernen",
  "mt.remove_confirm": "Aufgabe „{task}“ entfernen?",
  "mt.new": "Eigene Aufgabe, z. B. Kondensatablauf prüfen",
  "mt.add": "Hinzufügen",
  "mt.pressure": "Anlagendruck prüfen",
  "mt.pressure_how": "Druck am Manometer bzw. in COPilot ablesen; bei kalter Anlage meist 1,0–1,5 bar. Bei Bedarf nachfüllen (lassen).",
  "mt.filter": "Schmutzfilter SC1 reinigen",
  "mt.filter_how": "Absperren, Sieb herausnehmen und ausspülen. Nach der Inbetriebnahme häufiger, danach etwa jährlich.",
  "mt.separator": "Schlamm-/Magnetitabscheider entleeren",
  "mt.separator_how": "Ablasshahn kurz öffnen, bis klares Wasser kommt; Magnet ggf. abnehmen. Anschließend Druck prüfen.",
  "mt.expansion": "Ausdehnungsgefäß-Vordruck prüfen",
  "mt.expansion_how": "Vordruck des MAG messen (Anlage drucklos) und mit dem Sollwert vergleichen – meist Teil der Wartung durch den Fachbetrieb.",
  "mt.outdoor": "Außeneinheit reinigen",
  "mt.outdoor_how": "Laub und Schmutz vom Verdampfer entfernen, Lamellen nicht verbiegen, Kondensatablauf und Ansaug-/Ausblasbereich freihalten.",
  "mt.anode": "Schutzanode des Warmwasserspeichers prüfen",
  "mt.anode_how": "Magnesiumanode sichtprüfen bzw. Schutzstrom messen; bei starkem Abtrag tauschen (Fachbetrieb).",
  "mt.service": "Wartung durch den Fachbetrieb",
  "mt.service_how": "Jährliche Inspektion: Kältekreis (Dichtheit, R290-Hinweise), Elektrik, Sicherheitsventile, Einstellungen.",
  "cost.title": "Kosten & PV-Anteil",
  "cost.today": "Heute",
  "cost.yesterday": "Gestern",
  "cost.days30": "Letzte 30 Tage",
  "cost.grid_cost": "Netzstrom",
  "cost.pv_share": "Anteil PV/Akku",
  "cost.feed_loss": "Entgangene Einspeisung",
  "cost.per_kwh": "Kosten je kWh Wärme",
  "cost.vs_gas": "Gleiche Wärme mit Gas",
  "cost.daily": "Wärmepumpen-Strom je Tag",
  "cost.grid_kwh": "Netz",
  "cost.self_kwh": "PV/Akku",
  "cost.cost_eur": "Kosten €",
  "cost.no_share": "PV-Anteil unbekannt – dafür die Energie-Ebene (Netzleistung) und die elektrische Leistung der Wärmepumpe einrichten.",
  "cost.hint": "Preise und Vergleich unter Konfiguration → Einstellungen. „Kosten je kWh Wärme“ enthält die entgangene Einspeisevergütung.",
  "st.tariff": "Strompreis & Vergleich",
  "st.tariff_hint": "Für die Kosten im Effizienz-Reiter. Vom Netz bezogener Wärmepumpen-Strom kostet den Strompreis; selbst erzeugter PV-Strom die entgangene Einspeisevergütung.",
  "st.t_mode": "Strompreis",
  "st.t_fixed": "Fester Preis",
  "st.t_entity": "Aus Entität (z. B. dynamischer Tarif)",
  "st.t_price": "Preis (€/kWh)",
  "st.t_entity_pick": "Preis-Entität (€/kWh)",
  "st.t_feed_in": "Einspeisevergütung (€/kWh)",
  "st.t_gas": "Vergleich: Gaspreis (€/kWh)",
  "st.t_gas_eff": "Vergleich: Kesselwirkungsgrad (%)",
  "tm.title": "Zeitmaschine",
  "tm.play": "Abspielen",
  "tm.pause": "Pause",
  "tm.speed": "Tempo",
  "tm.speed_v": "{min} min/s",
  "tm.range": "Zeitraum",
  "tm.hours": "{h} h",
  "tm.live": "Live",
  "bk.title": "Sicherungen",
  "bk.hint": "Vor jedem Speichern und bei jedem Update wird die bisherige Anlage samt Anordnung automatisch gesichert (die letzten 15). Zusätzlich kannst du die Anlage als Datei exportieren.",
  "bk.export": "Exportieren",
  "bk.import": "Importieren",
  "bk.restore": "Wiederherstellen",
  "bk.restore_confirm": "Anlage vom {date} wiederherstellen? Der aktuelle Stand wird vorher gesichert.",
  "bk.import_confirm": "„{name}“ ({n} Komponenten) importieren? Der aktuelle Stand wird vorher gesichert.",
  "bk.restored": "Anlage wiederhergestellt.",
  "bk.imported": "Anlage importiert.",
  "bk.invalid": "Keine gültige COPilot-Anlagendatei",
  "bk.none": "Noch keine Sicherungen – die erste entsteht beim nächsten Speichern oder Update.",
  "bk.demo": "In der eigenständigen Demo gibt es keine Sicherungen.",
  "bk.components": "{n} Komponenten",
  "bk.reason.save": "vor dem Speichern",
  "bk.reason.update": "vor dem Update",
  "bk.reason.restore": "vor dem Wiederherstellen",
  "bk.reason.import": "vor dem Import",
  // energy layer
  "en.title": "Energiefluss",
  "en.toggle": "Energie-Ebene",
  "en.pv": "PV",
  "en.grid": "Netz",
  "en.grid_import": "Netzbezug",
  "en.grid_export": "Einspeisung",
  "en.battery": "Akku",
  "en.bat_charge": "Akku lädt",
  "en.bat_discharge": "Akku entlädt",
  "en.hp": "Wärmepumpe",
  "en.house": "Haus",
  "en.wallbox": "Wallbox",
  "en.share": "Eigenversorgung jetzt {pct} %",
  "en.dimmed": "§14a gedimmt · max. {kw} kW",
  "en.pv_signal": "PV-Überschuss → WP",
  "st.energy": "Energie-Ebene",
  "st.energy_hint": "Zeigt PV, Netz, Akku, Haus und Wallbox rund um die Wärmepumpe (Leistung in W oder kW). Im Demo-Modus simuliert.",
  "st.energy_enabled": "Energie-Ebene anzeigen",
  "st.energy_detect": "Automatisch erkennen (evcc / SolaX)",
  "st.energy_detected": "Vorschlag übernommen – bitte prüfen und speichern.",
  "st.energy_none": "Keine bekannten Entitäten gefunden – bitte von Hand wählen.",
  "st.e_pv": "PV-Leistung",
  "st.e_grid": "Netzleistung (Bezug positiv)",
  "st.e_grid_invert": "Entität meldet Einspeisung positiv",
  "st.e_battery": "Akkuleistung (Entladen positiv)",
  "st.e_battery_invert": "Entität meldet Laden positiv",
  "st.e_soc": "Akku-Ladestand (%)",
  "st.e_house": "Hausverbrauch",
  "st.e_house_hp": "Hausverbrauch enthält die Wärmepumpe",
  "st.e_wallbox": "Wallbox-Ladeleistung",
  "st.e_limit": "§14a-Mindestleistung beim Dimmen (kW)",
  "st.save": "Speichern",
  // explain mode
  "ex.title": "Was passiert gerade?",
  "ex.toggle": "Erklär-Modus",
  "ex.tap_hint": "Tipp: Tippe auf eine Komponente, um zu erfahren, wofür sie da ist.",
  "ex.empty": "Noch keine Werte – sobald Daten da sind, erkläre ich hier die Anlage.",
  "ex.alarm": "Am Außengerät liegt eine Störung vor – der Verdichter ist gesperrt. Details stehen unter Meldungen.",
  "ex.defrost": "Das Außengerät taut ab. Bei {out} °C und feuchter Luft vereist der Verdampfer; dafür läuft der Kältekreis kurz rückwärts und holt sich Wärme aus dem Heizwasser.",
  "ex.defrost_hint": "Das dauert meist 3–8 Minuten, der Vorlauf sinkt dabei kurz ab – völlig normal.",
  "ex.dhw_charge": "Die Wärmepumpe lädt Warmwasser: VW1 steht auf B, das heiße Heizwasser strömt durch die Wendel im Speicher. Speicher {dhw} °C, Ziel {set} °C.",
  "ex.dhw_charge_short": "Die Wärmepumpe lädt Warmwasser: VW1 steht auf B, das heiße Heizwasser strömt durch die Wendel im Speicher.",
  "ex.dhw_charge_hint": "Für Warmwasser braucht es höhere Temperaturen als zum Heizen – der COP ist dabei niedriger.",
  "ex.heating_air": "Die Wärmepumpe heizt: Sie holt Wärme aus der Außenluft ({out} °C) und gibt {heat} kW an das Heizwasser ab. Dafür braucht sie {el} kW Strom.",
  "ex.heating_air_short": "Die Wärmepumpe heizt: Sie holt Wärme aus der Außenluft ({out} °C) und gibt sie an das Heizwasser ab.",
  "ex.heating_ground": "Die Wärmepumpe heizt: Sie holt Wärme aus dem Erdreich (Sole) und gibt {heat} kW an das Heizwasser ab. Dafür braucht sie {el} kW Strom.",
  "ex.heating_ground_short": "Die Wärmepumpe heizt: Sie holt Wärme aus dem Erdreich (Sole) und gibt sie an das Heizwasser ab.",
  "ex.off_limit": "Die Wärmepumpe steht: Bei {out} °C ist die Heizgrenze von {limit} °C erreicht. Geheizt wird nur noch Warmwasser bei Bedarf.",
  "ex.off_buffer": "Die Wärmepumpe pausiert: Der Puffer ist mit {buf} °C warm genug (Soll-Vorlauf {target} °C). Sie startet wieder, wenn er abkühlt.",
  "ex.off_buffer_hint": "Lange Pausen statt vieler kurzer Starts schonen den Verdichter.",
  "ex.off": "Die Wärmepumpe ist bereit und wartet auf eine Wärmeanforderung.",
  "ex.cop": "Momentaner COP {cop}: Aus 1 kWh Strom werden gerade {cop} kWh Wärme.",
  "ex.cop_modulating": "Der Verdichter läuft mit {speed} % – er passt seine Leistung dem Bedarf an, statt nur an/aus zu schalten.",
  "ex.curve": "Heizkurve: Bei {out} °C draußen verlangt die Regelung {target} °C Vorlauf, aktuell sind es {sup} °C.",
  "ex.curve_short": "Heizkurve: Bei {out} °C draußen verlangt die Regelung {target} °C Vorlauf.",
  "ex.curve_hint": "Je niedriger der Vorlauf, desto effizienter – jedes Grad weniger bringt etwa 2–3 % mehr COP.",
  "ex.spread_ok": "Vorlauf {sup} °C, Rücklauf {ret} °C – die Spreizung von {spread} K passt.",
  "ex.spread_low": "Spreizung nur {spread} K (Vorlauf {sup} °C, Rücklauf {ret} °C): Es fließt mehr Wasser als nötig – die Pumpe könnte langsamer laufen.",
  "ex.spread_high": "Spreizung {spread} K (Vorlauf {sup} °C, Rücklauf {ret} °C): Es fließt zu wenig Wasser – das kostet Effizienz.",
  "ex.buffer": "Der Pufferspeicher hat oben {buf} °C. Er trennt Wärmepumpe und Heizkreise und überbrückt Pausen.",
  "ex.buffer_pc1": "Der Pufferspeicher hat oben {buf} °C. PC0 lädt ihn, PC1 versorgt daraus die Heizkörper.",
  "ex.buffer_mixing": "Mischverlust {loss} K: Oben im Puffer ist es kälter als im Vorlauf der Wärmepumpe – der Heizkreis zieht mehr Wasser als die Wärmepumpe liefert.",
  "ex.room": "{name}: Raum {room} °C, Soll {set} °C.",
  "ex.room_short": "{name}: Raum {room} °C.",
  "ex.disinfect": "Thermische Desinfektion: Der Warmwasserspeicher wird einmalig über 60 °C geheizt (Legionellenschutz), meist mit dem Zuheizer.",
  "ex.dhw_idle": "Warmwasser {dhw} °C (Soll {set} °C) – im Moment ist keine Ladung nötig.",
  "ex.dhw_idle_short": "Warmwasser {dhw} °C – im Moment ist keine Ladung nötig.",
  "ex.tap": "Es wird Warmwasser gezapft ({flow} l/min): Oben fließt heißes Wasser ab, unten strömt kaltes nach.",
  "ex.circ": "Die Zirkulationspumpe läuft: Warmwasser kreist durch die Leitungen, damit es an der Zapfstelle sofort warm kommt.",
  "ex.circ_hint": "Das kostet Wärme – eine Zeitsteuerung auf die Zapfzeiten spart Energie.",
  "ex.aux": "Der elektrische Zuheizer läuft ({aux} %).",
  "ex.aux_short": "Der elektrische Zuheizer läuft.",
  "ex.aux_hint": "Er macht aus 1 kWh Strom nur 1 kWh Wärme (COP 1) – sinnvoll nur bei sehr tiefen Temperaturen, Desinfektion oder Störung.",
  "ex.input_14a": "§14a-Steuerung aktiv (Eingang {n}): Der Netzbetreiber hat die Leistung gedimmt, die Wärmepumpe läuft gedrosselt.",
  "ex.input_pv": "PV-Überschuss gemeldet (Eingang {n}): Die Wärmepumpe darf Temperaturen anheben und Solarstrom als Wärme speichern.",
  "ex.input_other": "Externer Eingang {n} ({label}) ist aktiv.",
  "exc.outdoor": "Holt mit Ventilator und Kältekreis Wärme aus der Außenluft – selbst bei Minusgraden – und hebt sie mit dem Verdichter auf Heiztemperatur.",
  "exc.outdoor_brine": "Holt über Erdsonden oder Kollektoren Wärme aus dem Erdreich (Sole) und hebt sie mit dem Verdichter auf Heiztemperatur.",
  "exc.indoor_wall_e": "Die Inneneinheit ist die Zentrale: Regler, Heizungspumpe PC0, Umschaltventil VW1 (Heizen/Warmwasser) und elektrischer Zuheizer.",
  "exc.indoor_t180": "Inneneinheit mit eingebautem 180-l-Warmwasserspeicher: Regler, PC0, VW1, Zuheizer und Heizkreispumpe PC1 in einem Gehäuse.",
  "exc.indoor_tp70": "Inneneinheit mit eingebautem 70-l-Puffer: Regler, PC0, VW1, Zuheizer und Heizkreispumpe PC1 in einem Gehäuse.",
  "exc.indoor_brine": "Sole-Kompaktgerät: Kältekreis mit Verdichter, Regler, Pumpen, VW1 und Zuheizer in einem Gehäuse.",
  "exc.pump_primary": "Wärmepumpenkreispumpe (PC0): fördert das Wasser durch die Wärmepumpe.",
  "exc.pump_hc": "Heizkreispumpe: fördert das warme Wasser zu den Heizflächen.",
  "exc.pump_circ": "Zirkulationspumpe (PW2): hält das Warmwasser in den Leitungen in Bewegung, damit es an der Zapfstelle sofort warm ist.",
  "exc.valve_3way": "3-Wege-Ventil: schaltet zwischen Heizen (A) und Warmwasserladung (B) um.",
  "exc.filter": "Schmutzfilter SC1: hält Partikel vom Wärmetauscher der Wärmepumpe fern.",
  "exc.separator": "Schlamm-/Magnetitabscheider: holt Schlamm und Rostpartikel aus dem Rücklauf, bevor sie die Wärmepumpe erreichen.",
  "exc.buffer": "Pufferspeicher: trennt Wärmepumpe und Heizkreise hydraulisch, sichert Mindestdurchfluss und Abtau-Energie und verhindert häufiges Takten.",
  "exc.dhw_tank": "Warmwasserspeicher: Die Wendel innen erwärmt das Trinkwasser; oben wird heißes Wasser entnommen, unten strömt kaltes nach.",
  "exc.mixer": "Mischer: mischt Rücklaufwasser bei, damit der Heizkreis genau die gewünschte Vorlauftemperatur bekommt.",
  "exc.radiators": "Heizkörper geben die Wärme an den Raum ab. Je größer die Fläche, desto niedriger kann der Vorlauf sein.",
  "exc.floor_heating": "Fußbodenheizung: große Fläche, niedrige Vorlauftemperatur – ideal für Wärmepumpen.",
  "exc.tap": "Zapfstelle: Dusche, Bad oder Küche.",
  "exc.water_inlet": "Kaltwasseranschluss vom Hausnetz.",
  "exc.expansion_vessel": "Ausdehnungsgefäß (MAG): nimmt die Volumenänderung des Heizwassers beim Erwärmen auf und hält den Druck stabil.",
  "exs.defrost": "Gerade: taut ab.",
  "exs.compressor_on": "Gerade: Verdichter läuft.",
  "exs.compressor_off": "Gerade: Verdichter aus.",
  "exs.vw1_a": "Gerade: VW1 auf A – Heizbetrieb.",
  "exs.vw1_b": "Gerade: VW1 auf B – Warmwasserladung.",
  "exs.running": "Gerade: läuft.",
  "exs.stopped": "Gerade: aus.",
  "exs.valve_a": "Gerade: Stellung A (Heizen).",
  "exs.valve_b": "Gerade: Stellung B (Warmwasser).",
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
  "slot.min_ext_temp": "Min. Außentemperatur (Auslegung)",
  "slot.heating_limit": "Heizgrenze",
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
  "ed.flip": "Anschlüsse rechts (gespiegelt)",
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
  "ed.auto": "Auto anordnen",
  "ed.auto_title": "Bewertet mehrere Anordnungen (Kreuzungen, Kollisionen, Leitungslänge) und übernimmt die beste – rückgängig machbar",
  "ed.auto_done_tpl": "Angeordnet nach Vorlage mit realen Anschlusslagen – {crossings} Kreuzungen. Rückgängig mit ⌘Z.",
  "ed.auto_done": "Automatisch angeordnet – {crossings} Kreuzungen. Rückgängig mit ⌘Z.",
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
  "st.style.iso": "2.5D (mit Tiefe)",
  "st.demo": "Demo-Modus",
  "st.demo_hint": "Zeigt simulierte Werte mit laufenden Animationen – ideal, solange die Anlage noch nicht angeschlossen ist.",
  "st.language": "Sprache",
  "st.lang.auto": "Wie Home Assistant",
  "st.version": "Version",
  "st.reset": "Anlage zurücksetzen",
  "st.reset_confirm": "Komplette Anlage löschen und mit der Beispielanlage neu starten?"
}, yn = {
  "nav.overview": "Overview",
  "nav.messages": "Messages",
  "nav.curve": "Heating curve",
  "cv.title": "Heating curve",
  "cv.curve": "current curve",
  "cv.preview": "preview",
  "cv.points": "measurements (hourly means, {days} days)",
  "cv.now": "now",
  "cv.axis_flow": "Flow °C",
  "cv.no_heating": "heating limit",
  "cv.params": "Parameters",
  "cv.p.design": "Design flow temperature",
  "cv.p.offset": "Parallel shift",
  "cv.p.limit": "Heating limit (summer from)",
  "cv.p.minFlow": "Min. flow",
  "cv.p.maxFlow": "Max. flow",
  "cv.p.minExt": "Min. outdoor temperature",
  "cv.p.roomSet": "Room setpoint",
  "cv.readonly": "To change the curve, map the parameters to writable entities (number) – EMS-ESP provides them as “number”.",
  "cv.applied": "Applied.",
  "cv.analysis": "Analysis",
  "cv.deviation_above": "Measurements are on average {value} K above the curve.",
  "cv.deviation_below": "Measurements are on average {value} K below the curve.",
  "cv.room": "Mean room temperature {room} °C at a setpoint of {set} °C.",
  "cv.suggest_down": "Warmer than needed. Suggestion: lower the parallel shift by {value} K to {target} K – saves electricity.",
  "cv.suggest_up": "Not quite warm enough. Suggestion: raise the parallel shift by {value} K to {target} K.",
  "cv.try": "Use as preview",
  "cv.fits": "Room temperature fits – no change needed.",
  "cv.no_room": "For a suggestion, map the room temperature (reference room) on the heating circuit.",
  "cv.no_points": "No measurements yet: outdoor and flow temperature need long-term statistics (available after about an hour).",
  "cv.demo_note": "Demo: the last 24 h come from the simulation, older points are modelled. Changes act on the simulation immediately.",
  "cv.confirm_title": "Change heating curve?",
  "cv.confirm_demo": "The change applies to the simulation.",
  "cv.confirm_live": "The values are written to the controller (BC400) via EMS-ESP.",
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
  "eff.spf_short": "SPF",
  "cv.tip": "{out} outside → {flow} flow",
  "cv.target": "Target now",
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
  "wr.title": "Change value",
  "wr.change": "Change …",
  "wr.press": "Trigger …",
  "wr.apply": "Apply",
  "wr.confirm": "Really change: {old} → {new}?",
  "wr.press_confirm": "Really trigger?",
  "wr.done": "Changed – the plant picks up the value shortly.",
  "wr.failed": "Not changed",
  "wr.demo": "Nothing can be changed in demo mode or in the time machine.",
  "wr.no_permission": "Only administrators may change values.",
  "wr.on": "On",
  "wr.off": "Off",
  "wr.release": "Writable: may be changed from COPilot (with confirmation)",
  "msgk.value_changed": "{component}: {slot_label} changed {old} → {new} ({user})",
  "st.write_non_admin": "Non-admin users may change released values too",
  "st.write_hint": "Values are released one by one with ✎ in the editor. Every change needs a confirmation and is logged under messages.",
  "nav.maintenance": "Maintenance",
  "msgk.maintenance_due": "Maintenance due: {task}",
  "mt.title": "Maintenance calendar",
  "mt.hint": "Recurring tasks around the plant. Due tasks also appear under messages (and fire the copilot_message event, e.g. for a push notification). Intervals are guidelines – your devices' manuals are authoritative.",
  "mt.n_due": "{n} due",
  "mt.all_ok": "All done",
  "mt.n_unknown": "{n} without date",
  "mt.enter_date": "No date yet – please enter “Last done”",
  "mt.overdue": "Due for {n} days",
  "mt.next": "Next on {date} (in {n} days)",
  "mt.last": "Last done",
  "mt.every": "Every",
  "mt.months": "months",
  "mt.done": "Done",
  "mt.done_confirm": "Mark “{task}” as done today?",
  "mt.remove": "Remove",
  "mt.remove_confirm": "Remove task “{task}”?",
  "mt.new": "Own task, e.g. check the condensate drain",
  "mt.add": "Add",
  "mt.pressure": "Check system pressure",
  "mt.pressure_how": "Read the pressure on the gauge or in COPilot; usually 1.0–1.5 bar when cold. Top up if needed.",
  "mt.filter": "Clean particle filter SC1",
  "mt.filter_how": "Shut off, take out the strainer and rinse it. More often after commissioning, then about once a year.",
  "mt.separator": "Drain the dirt/magnetite separator",
  "mt.separator_how": "Open the drain valve briefly until the water runs clear; remove the magnet if fitted. Check the pressure afterwards.",
  "mt.expansion": "Check expansion vessel pre-pressure",
  "mt.expansion_how": "Measure the vessel's pre-pressure (system depressurised) against the setpoint – usually part of the professional service.",
  "mt.outdoor": "Clean the outdoor unit",
  "mt.outdoor_how": "Remove leaves and dirt from the evaporator without bending the fins; keep the condensate drain and air path clear.",
  "mt.anode": "Check the hot water cylinder's anode",
  "mt.anode_how": "Inspect the magnesium anode or measure the protection current; replace when heavily worn (professional).",
  "mt.service": "Professional service",
  "mt.service_how": "Annual inspection: refrigerant circuit (tightness, R290 notes), electrics, safety valves, settings.",
  "cost.title": "Costs & PV share",
  "cost.today": "Today",
  "cost.yesterday": "Yesterday",
  "cost.days30": "Last 30 days",
  "cost.grid_cost": "grid power",
  "cost.pv_share": "PV/battery share",
  "cost.feed_loss": "Feed-in revenue given up",
  "cost.per_kwh": "Cost per kWh of heat",
  "cost.vs_gas": "Same heat with gas",
  "cost.daily": "Heat pump electricity per day",
  "cost.grid_kwh": "Grid",
  "cost.self_kwh": "PV/battery",
  "cost.cost_eur": "Cost €",
  "cost.no_share": "PV share unknown – set up the energy layer (grid power) and the heat pump's electric power.",
  "cost.hint": "Prices and comparison under Configuration → Settings. “Cost per kWh of heat” includes the feed-in revenue given up.",
  "st.tariff": "Electricity price & comparison",
  "st.tariff_hint": "For the costs in the efficiency tab. Heat pump power from the grid costs the electricity price; own PV power costs the feed-in tariff you do not receive.",
  "st.t_mode": "Electricity price",
  "st.t_fixed": "Fixed price",
  "st.t_entity": "From an entity (e.g. dynamic tariff)",
  "st.t_price": "Price (€/kWh)",
  "st.t_entity_pick": "Price entity (€/kWh)",
  "st.t_feed_in": "Feed-in tariff (€/kWh)",
  "st.t_gas": "Comparison: gas price (€/kWh)",
  "st.t_gas_eff": "Comparison: boiler efficiency (%)",
  "tm.title": "Time machine",
  "tm.play": "Play",
  "tm.pause": "Pause",
  "tm.speed": "Speed",
  "tm.speed_v": "{min} min/s",
  "tm.range": "Range",
  "tm.hours": "{h} h",
  "tm.live": "Live",
  "bk.title": "Backups",
  "bk.hint": "Before every save and every update the previous plant including its layout is backed up automatically (last 15). You can also export the plant as a file.",
  "bk.export": "Export",
  "bk.import": "Import",
  "bk.restore": "Restore",
  "bk.restore_confirm": "Restore the plant from {date}? The current state is backed up first.",
  "bk.import_confirm": "Import “{name}” ({n} components)? The current state is backed up first.",
  "bk.restored": "Plant restored.",
  "bk.imported": "Plant imported.",
  "bk.invalid": "Not a valid COPilot plant file",
  "bk.none": "No backups yet – the first one is made on the next save or update.",
  "bk.demo": "The standalone demo has no backups.",
  "bk.components": "{n} components",
  "bk.reason.save": "before saving",
  "bk.reason.update": "before update",
  "bk.reason.restore": "before restore",
  "bk.reason.import": "before import",
  // energy layer
  "en.title": "Energy flow",
  "en.toggle": "Energy layer",
  "en.pv": "PV",
  "en.grid": "Grid",
  "en.grid_import": "Grid import",
  "en.grid_export": "Grid export",
  "en.battery": "Battery",
  "en.bat_charge": "Battery charging",
  "en.bat_discharge": "Battery discharging",
  "en.hp": "Heat pump",
  "en.house": "House",
  "en.wallbox": "Wallbox",
  "en.share": "Self-supply now {pct} %",
  "en.dimmed": "§14a dimmed · max. {kw} kW",
  "en.pv_signal": "PV surplus → HP",
  "st.energy": "Energy layer",
  "st.energy_hint": "Shows PV, grid, battery, house and wallbox around the heat pump (power in W or kW). Simulated in demo mode.",
  "st.energy_enabled": "Show energy layer",
  "st.energy_detect": "Detect automatically (evcc / SolaX)",
  "st.energy_detected": "Suggestion applied – please check and save.",
  "st.energy_none": "No known entities found – please choose manually.",
  "st.e_pv": "PV power",
  "st.e_grid": "Grid power (import positive)",
  "st.e_grid_invert": "Entity reports export as positive",
  "st.e_battery": "Battery power (discharge positive)",
  "st.e_battery_invert": "Entity reports charging as positive",
  "st.e_soc": "Battery state of charge (%)",
  "st.e_house": "House consumption",
  "st.e_house_hp": "House consumption includes the heat pump",
  "st.e_wallbox": "Wallbox charging power",
  "st.e_limit": "§14a minimum power while dimmed (kW)",
  "st.save": "Save",
  // explain mode
  "ex.title": "What is happening?",
  "ex.toggle": "Explain mode",
  "ex.tap_hint": "Tip: tap a component to learn what it is for.",
  "ex.empty": "No values yet – as soon as data arrives, the plant is explained here.",
  "ex.alarm": "The outdoor unit reports a fault – the compressor is locked. See messages for details.",
  "ex.defrost": "The outdoor unit is defrosting. At {out} °C with humid air the evaporator ices up; the refrigerant circuit briefly runs backwards and takes heat from the heating water.",
  "ex.defrost_hint": "This usually takes 3–8 minutes and the flow temperature drops briefly – perfectly normal.",
  "ex.dhw_charge": "The heat pump is heating hot water: VW1 is in position B and the hot heating water flows through the coil in the cylinder. Cylinder {dhw} °C, target {set} °C.",
  "ex.dhw_charge_short": "The heat pump is heating hot water: VW1 is in position B and the hot heating water flows through the coil in the cylinder.",
  "ex.dhw_charge_hint": "Hot water needs higher temperatures than space heating – so the COP is lower.",
  "ex.heating_air": "The heat pump is heating: it takes heat from the outdoor air ({out} °C) and delivers {heat} kW to the heating water, using {el} kW of electricity.",
  "ex.heating_air_short": "The heat pump is heating: it takes heat from the outdoor air ({out} °C) and delivers it to the heating water.",
  "ex.heating_ground": "The heat pump is heating: it takes heat from the ground (brine) and delivers {heat} kW to the heating water, using {el} kW of electricity.",
  "ex.heating_ground_short": "The heat pump is heating: it takes heat from the ground (brine) and delivers it to the heating water.",
  "ex.off_limit": "The heat pump is idle: at {out} °C the heating limit of {limit} °C is reached. Only hot water is heated when needed.",
  "ex.off_buffer": "The heat pump is pausing: the buffer is warm enough at {buf} °C (target flow {target} °C). It restarts when it cools down.",
  "ex.off_buffer_hint": "Long pauses instead of many short starts protect the compressor.",
  "ex.off": "The heat pump is ready and waiting for a heat demand.",
  "ex.cop": "Current COP {cop}: 1 kWh of electricity becomes {cop} kWh of heat right now.",
  "ex.cop_modulating": "The compressor runs at {speed} % – it adapts its output to the demand instead of switching on and off.",
  "ex.curve": "Heating curve: at {out} °C outside the controller asks for {target} °C flow; it is {sup} °C right now.",
  "ex.curve_short": "Heating curve: at {out} °C outside the controller asks for {target} °C flow.",
  "ex.curve_hint": "The lower the flow temperature, the more efficient – each degree less gives roughly 2–3 % more COP.",
  "ex.spread_ok": "Flow {sup} °C, return {ret} °C – the spread of {spread} K is fine.",
  "ex.spread_low": "Spread only {spread} K (flow {sup} °C, return {ret} °C): more water flows than needed – the pump could run slower.",
  "ex.spread_high": "Spread {spread} K (flow {sup} °C, return {ret} °C): too little water flows – that costs efficiency.",
  "ex.buffer": "The buffer tank is {buf} °C at the top. It separates heat pump and heating circuits and bridges pauses.",
  "ex.buffer_pc1": "The buffer tank is {buf} °C at the top. PC0 charges it, PC1 supplies the radiators from it.",
  "ex.buffer_mixing": "Mixing loss {loss} K: the top of the buffer is colder than the heat pump flow – the heating circuit draws more water than the heat pump delivers.",
  "ex.room": "{name}: room {room} °C, setpoint {set} °C.",
  "ex.room_short": "{name}: room {room} °C.",
  "ex.disinfect": "Thermal disinfection: the hot water cylinder is heated above 60 °C once (legionella protection), usually with the backup heater.",
  "ex.dhw_idle": "Hot water {dhw} °C (target {set} °C) – no charging needed right now.",
  "ex.dhw_idle_short": "Hot water {dhw} °C – no charging needed right now.",
  "ex.tap": "Hot water is being drawn ({flow} l/min): hot water leaves at the top, cold water flows in at the bottom.",
  "ex.circ": "The circulation pump runs: hot water circulates through the pipes so it is warm at the tap immediately.",
  "ex.circ_hint": "This costs heat – a schedule matching your tapping times saves energy.",
  "ex.aux": "The electric backup heater is running ({aux} %).",
  "ex.aux_short": "The electric backup heater is running.",
  "ex.aux_hint": "It turns 1 kWh of electricity into only 1 kWh of heat (COP 1) – useful only in very cold weather, for disinfection or faults.",
  "ex.input_14a": "§14a control active (input {n}): the grid operator has limited the power, the heat pump runs throttled.",
  "ex.input_pv": "PV surplus signalled (input {n}): the heat pump may raise temperatures and store solar power as heat.",
  "ex.input_other": "External input {n} ({label}) is active.",
  "exc.outdoor": "Takes heat from the outdoor air with fan and refrigerant circuit – even below freezing – and lifts it to heating temperature with the compressor.",
  "exc.outdoor_brine": "Takes heat from the ground via boreholes or collectors (brine) and lifts it to heating temperature with the compressor.",
  "exc.indoor_wall_e": "The indoor unit is the hub: controller, heat pump circuit pump PC0, diverter valve VW1 (heating/hot water) and electric backup heater.",
  "exc.indoor_t180": "Indoor unit with built-in 180 l hot water cylinder: controller, PC0, VW1, backup heater and heating circuit pump PC1 in one casing.",
  "exc.indoor_tp70": "Indoor unit with built-in 70 l buffer: controller, PC0, VW1, backup heater and heating circuit pump PC1 in one casing.",
  "exc.indoor_brine": "Brine compact unit: refrigerant circuit with compressor, controller, pumps, VW1 and backup heater in one casing.",
  "exc.pump_primary": "Heat pump circuit pump (PC0): moves the water through the heat pump.",
  "exc.pump_hc": "Heating circuit pump: moves the warm water to the emitters.",
  "exc.pump_circ": "Circulation pump (PW2): keeps hot water moving in the pipes so it is warm at the tap immediately.",
  "exc.valve_3way": "3-way valve: switches between heating (A) and hot water charging (B).",
  "exc.filter": "Particle filter SC1: keeps dirt away from the heat pump's heat exchanger.",
  "exc.separator": "Dirt/magnetite separator: removes sludge and rust particles from the return before they reach the heat pump.",
  "exc.buffer": "Buffer tank: separates heat pump and heating circuits, ensures minimum flow and defrost energy, prevents frequent cycling.",
  "exc.dhw_tank": "Hot water cylinder: the coil inside heats the drinking water; hot water is drawn at the top, cold water flows in at the bottom.",
  "exc.mixer": "Mixing valve: blends in return water so the circuit gets exactly the flow temperature it needs.",
  "exc.radiators": "Radiators release the heat into the room. The larger the surface, the lower the flow temperature can be.",
  "exc.floor_heating": "Underfloor heating: large surface, low flow temperature – ideal for heat pumps.",
  "exc.tap": "Tap: shower, bath or kitchen.",
  "exc.water_inlet": "Cold water supply from the mains.",
  "exc.expansion_vessel": "Expansion vessel: absorbs the volume change of the heating water as it heats up and keeps the pressure stable.",
  "exs.defrost": "Now: defrosting.",
  "exs.compressor_on": "Now: compressor running.",
  "exs.compressor_off": "Now: compressor off.",
  "exs.vw1_a": "Now: VW1 in A – heating.",
  "exs.vw1_b": "Now: VW1 in B – hot water charging.",
  "exs.running": "Now: running.",
  "exs.stopped": "Now: off.",
  "exs.valve_a": "Now: position A (heating).",
  "exs.valve_b": "Now: position B (hot water).",
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
  "slot.min_ext_temp": "Min. outdoor temperature (design)",
  "slot.heating_limit": "Heating limit",
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
  "ed.flip": "Connections on the right (mirrored)",
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
  "ed.auto": "Auto arrange",
  "ed.auto_title": "Scores several arrangements (crossings, collisions, pipe length) and applies the best – undoable",
  "ed.auto_done_tpl": "Arranged by template with real connection positions – {crossings} crossings. Undo with ⌘Z.",
  "ed.auto_done": "Arranged automatically – {crossings} crossings. Undo with ⌘Z.",
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
  "st.style.iso": "2.5D (with depth)",
  "st.demo": "Demo mode",
  "st.demo_hint": "Shows simulated values with running animations – ideal while the plant is not connected yet.",
  "st.language": "Language",
  "st.lang.auto": "Same as Home Assistant",
  "st.version": "Version",
  "st.reset": "Reset plant",
  "st.reset_confirm": "Delete the whole plant and start over with the example plant?"
}, Fs = { de: bn, en: yn };
let ze = "de";
function js(r) {
  ze = r;
}
function Us() {
  return ze;
}
function Zs(r, e) {
  return r === "de" || r === "en" ? r : (e || "de").toLowerCase().startsWith("de") ? "de" : "en";
}
function c(r, e) {
  let t = Fs[ze][r] ?? Fs.de[r] ?? r;
  return e && (t = t.replace(/\{(\w+)\}/g, (s, i) => {
    const n = e[i];
    return typeof n == "number" ? N(n, Number.isInteger(n) ? 0 : 1) : n == null ? "" : String(n);
  })), t;
}
function N(r, e = 1) {
  return r.toLocaleString(ze === "de" ? "de-DE" : "en-GB", {
    minimumFractionDigits: e,
    maximumFractionDigits: e
  });
}
function Oi(r) {
  return new Date(r * 1e3).toLocaleTimeString(ze === "de" ? "de-DE" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function xn(r) {
  const e = new Date(r * 1e3), t = /* @__PURE__ */ new Date();
  return e.toDateString() === t.toDateString() ? Oi(r) : e.toLocaleString(ze === "de" ? "de-DE" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function $n(r) {
  const e = Math.round(r / 60);
  return e < 60 ? `${e} min` : `${Math.floor(e / 60)} h ${e % 60} min`;
}
const kn = {
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
}, Gs = { supply_temp: "F", return_temp: "R", flow_temp: "F", target_flow_temp: "Set", room_temp: "Room", dhw_temp: "DHW", dhw_setpoint: "Set" };
function Ys(r, e) {
  return ze === "en" && e in Gs ? Gs[e] : kn[e] ?? "";
}
function ve(r, e) {
  const t = `slot.${r}.${e}`, s = c(t);
  return s === t ? c(`slot.${e}`) : s;
}
const z = 20, U = (r, e = !1) => ({ key: r, kind: "temp", show: e }), J = {
  outdoor_unit: {
    type: "outdoor_unit",
    w: 9,
    h: 7,
    group: "generator",
    badges: "above",
    // monoblock: both water connections at the rear, 202 mm above the floor,
    // on the right when seen from the front (Logatherm WLW-… MB AR manual, fig. 4)
    ports: [
      { id: "in", x: 9, y: 5, dir: "r", kind: "return" },
      { id: "out", x: 9, y: 6, dir: "r", kind: "supply" }
    ],
    slots: [
      { key: "heat_power", kind: "power_kw", show: !0 },
      { key: "el_power", kind: "power_w", show: !0 },
      { key: "compressor_speed", kind: "percent", show: !0 },
      // fourth chip: own row above the three power values
      { key: "outdoor_temp", kind: "temp", show: !0 },
      { key: "activity", kind: "enum" },
      { key: "compressor_on", kind: "bool" },
      { key: "fan_speed", kind: "percent", pos: [3.2, 3.5] },
      U("air_in_temp"),
      { key: "compressor_starts", kind: "count" },
      U("evap_in_temp"),
      U("comp_in_temp"),
      U("comp_out_temp"),
      U("hp_temp"),
      U("lp_temp"),
      U("drain_pan_temp"),
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
        w: 10,
        h: 14,
        badges: "right",
        ports: [
          { id: "src_out", x: 2, y: 14, dir: "b", tempSlot: "return_temp", kind: "return" },
          { id: "src_in", x: 3, y: 14, dir: "b", tempSlot: "supply_temp", kind: "supply" },
          { id: "dhw_sup", x: 5, y: 14, dir: "b", tempSlot: "supply_temp", kind: "supply" },
          { id: "dhw_ret", x: 6, y: 14, dir: "b", tempSlot: "return_temp", kind: "return" },
          { id: "ret", x: 8, y: 14, dir: "b", tempSlot: "return_temp", kind: "return" },
          { id: "sup", x: 9, y: 14, dir: "b", tempSlot: "supply_temp", kind: "supply" }
        ],
        pos: { pressure: [1.9, 7.6], aux_level: [5.9, 4.2], pc0_speed: [4.3, 11.4] },
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
        pos: { pressure: [3.2, 8.8], aux_level: [6.4, 3.2], pc0_speed: [4.2, 7.4], dhw_temp: [4, 12], dhw_setpoint: [4, 17] },
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
        pos: { pressure: [7, 14.65], aux_level: [3.6, 3], pc0_speed: [7.6, 8.75], pc1_speed: [3.6, 4.9], buffer_temp: [4.5, 10.9] },
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
        pos: { pressure: [2.2, 12.8], aux_level: [4, 3], pc0_speed: [5.5, 9] },
        at: { supply_temp: "sup", return_temp: "ret" }
      }
    },
    slots: [
      U("supply_temp", !0),
      U("return_temp", !0),
      U("target_flow_temp", !0),
      { key: "pressure", kind: "pressure", show: !0 },
      { key: "flow", kind: "flow" },
      { key: "aux_level", kind: "percent", show: !0 },
      { key: "pc0_running", kind: "bool" },
      { key: "pc0_speed", kind: "percent", show: !0 },
      { key: "vw1_position", kind: "bool" },
      { key: "pc1_running", kind: "bool" },
      { key: "pc1_speed", kind: "percent" },
      U("dhw_temp", !0),
      U("dhw_setpoint"),
      { key: "dhw_charging", kind: "bool" },
      U("buffer_temp", !0),
      U("condenser_temp"),
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
    slots: [U("temp_top", !0), U("temp_mid"), U("temp_bottom", !0)]
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
      U("temp_top", !0),
      U("temp_bottom"),
      U("setpoint", !0),
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
    mirrorable: !0,
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
      U("target_flow_temp"),
      { key: "room_temp", kind: "temp", show: !0, pos: [3.5, -2.2] },
      U("room_setpoint"),
      { key: "mode", kind: "enum" },
      { key: "summer_mode", kind: "enum" },
      { key: "operating_state", kind: "enum" },
      U("design_temp"),
      { key: "offset_temp", kind: "temp" },
      U("min_flow_temp"),
      U("max_flow_temp"),
      U("min_ext_temp"),
      U("heating_limit")
    ]
  },
  floor_heating: {
    type: "floor_heating",
    mirrorable: !0,
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
    ports: [{ id: "hot", x: 3, y: 1, dir: "r", kind: "dhw_hot" }],
    slots: [{ key: "flow", kind: "flow_lmin", show: !0, pos: [1.5, -0.9] }, U("temp")]
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
function ce(r) {
  return r.type === "value_tile" ? (r.props.entries || []).map((e) => ({
    key: e.slot,
    kind: e.kind || "text",
    show: !0
  })) : J[r.type].slots;
}
function be(r) {
  const e = J[r.type];
  if (!e.variants) return;
  const t = r.props?.variant || qe(r.model)?.variant || "wall_e";
  return e.variants[t] || Object.values(e.variants)[0];
}
function Se(r) {
  const e = be(r);
  return e ? { w: e.w, h: e.h } : { w: J[r.type].w, h: J[r.type].h };
}
function rt(r) {
  return be(r)?.ports ?? J[r.type].ports;
}
function qs(r) {
  return be(r)?.badges ?? J[r.type].badges;
}
function Js(r) {
  const e = be(r);
  return ce(r).map((t) => e ? { ...t, pos: e.pos?.[t.key] ?? t.pos, at: e.at?.[t.key] ?? t.at } : t);
}
function le(r) {
  const e = { ...J[r.type], ...Se(r) };
  if (r.type === "value_tile") {
    const s = (r.props.entries || []).length;
    return { w: e.w, h: 2 + Math.ceil(s * 1.3) };
  }
  const t = r.rot || 0;
  return t === 90 || t === 270 ? { w: e.h, h: e.w } : { w: e.w, h: e.h };
}
const Xs = ["r", "b", "l", "t"];
function Sn(r, e) {
  const t = e / 90 % 4;
  return Xs[(Xs.indexOf(r) + t) % 4];
}
function pe(r, e) {
  const t = rt(r).find((p) => p.id === e);
  if (!t) return null;
  const s = r.rot || 0, { w: i, h: n } = Se(r);
  let { x: o, y: a } = t, l = t.dir;
  return r.flip && J[r.type].mirrorable && (o = i - o, l = l === "l" ? "r" : l === "r" ? "l" : l), s === 90 ? [o, a] = [n - a, o] : s === 180 ? [o, a] = [i - o, n - a] : s === 270 && ([o, a] = [a, i - o]), { x: r.x + o, y: r.y + a, dir: Sn(l, s), def: t };
}
const pt = [
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
], Mn = { "buderus-wsw": "buderus-wsw186i" }, Ms = [
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
], zn = {
  "buderus-wlw186i-t": "buderus-wlw186i-t180",
  "buderus-wlw186i-b": "buderus-wlw186i-e",
  "bosch-aw-b": "bosch-aw-e"
};
function qe(r) {
  const e = r && zn[r] || r;
  return Ms.find((t) => t.id === e);
}
function He(r) {
  const e = r && Mn[r] || r;
  return pt.find((t) => t.id === e) || pt.find((t) => t.id === "generic-air");
}
const Hi = /* @__PURE__ */ new Set(["on", "true", "1", "yes", "ja", "ein", "an", "active", "aktiv", "open", "offen"]);
function Z(r) {
  return !r || !r.available || r.raw === null ? !1 : typeof r.raw == "boolean" ? r.raw : r.num !== null ? r.num > 0 : Hi.has(String(r.raw).trim().toLowerCase());
}
const En = {
  off: ["off", "aus", "uit", "av", "arrêt", "standby", "bereit"],
  heating: ["heating", "heizen", "verwarmen", "uppvärmning", "chauffage", "ogrzewanie", "riscaldamento"],
  cooling: ["cooling", "kühlen", "koelen", "kyler", "refroidissement", "chłodzenie", "raffreddamento"],
  hot_water: ["hot water", "hot_water", "warmwasser", "warm water", "varmvatten", "eau chaude", "c.w.u.", "acqua calda"],
  pool_heating: ["pool heating", "pool beheizen", "zwembadverwarming", "chauffage piscine"],
  pool: ["pool", "zwembad", "piscine", "basen", "piscina"],
  defrost: ["defrost", "abtauen", "ontdooien", "avfrostning", "dégivrage", "odladzanie", "scongelamento"],
  compressor_alarm: ["compressor alarm", "compressor_alarm", "kompressor alarm", "kompressoralarm"]
};
function Oe(r) {
  if (!r || !r.available || r.raw === null) return;
  const e = String(r.raw).trim().toLowerCase();
  for (const [t, s] of Object.entries(En)) if (s.includes(e)) return t;
  return e.includes("abtau") || e.includes("defrost") ? "defrost" : e;
}
function zs(r, e, t) {
  if (r === void 0 || r === "unavailable" || r === "unknown" || r === "")
    return { raw: null, num: null, unit: e, entity: t, available: !1 };
  const s = Number(r);
  return { raw: r, num: Number.isFinite(s) ? s : null, unit: e, entity: t, available: !0 };
}
class Bi {
  constructor(e) {
    this.hass = e;
  }
  entityOf(e, t) {
    return e.type === "value_tile" ? (e.props.entries || []).find((i) => i.slot === t)?.entity : e.bindings[t];
  }
  get(e, t) {
    const s = this.entityOf(e, t);
    return s ? this.getEntity(s) : void 0;
  }
  getEntity(e) {
    const t = this.hass.states[e];
    return zs(t?.state, t?.attributes?.unit_of_measurement, e);
  }
  async history(e, t, s) {
    const i = this.entityOf(e, t);
    return i ? An(this.hass, i, s) : [];
  }
}
async function An(r, e, t) {
  const s = /* @__PURE__ */ new Date(), i = new Date(s.getTime() - t * 36e5);
  return ((await r.callWS({
    type: "history/history_during_period",
    start_time: i.toISOString(),
    end_time: s.toISOString(),
    entity_ids: [e],
    minimal_response: !0,
    no_attributes: !0,
    significant_changes_only: !1
  }))[e] || []).map((a) => {
    const l = String(a.s).toLowerCase();
    let p = Number(a.s);
    return Number.isFinite(p) || (p = Hi.has(l) ? 1 : l === "off" || l === "false" ? 0 : null), { t: a.lu, v: p, raw: String(a.s) };
  });
}
function de(r, e) {
  const t = /* @__PURE__ */ new Set(), s = (i) => e.get(r, i);
  switch (r.type) {
    case "pump":
    case "mixer":
      (Z(s("running")) || Z(s("speed")) || Z(s("flow"))) && t.add("running"), r.type === "mixer" && Z(s("position")) && t.add("running");
      break;
    case "valve_3way": {
      const i = s("position");
      t.add(Z(i) ? "b" : "a");
      break;
    }
    case "outdoor_unit": {
      const i = Oe(s("activity"));
      (Z(s("compressor_on")) || Z(s("compressor_speed")) || Z(s("heat_power"))) && t.add("running"), i === "defrost" && t.add("defrost"), i === "compressor_alarm" && t.add("alarm"), i && i !== "off" && i !== "compressor_alarm" && t.add("running"), i && t.add(`mode_${i}`);
      break;
    }
    case "indoor_unit": {
      (Z(s("aux_level")) || Z(s("aux_step1")) || Z(s("aux_step2")) || Z(s("aux_step3"))) && t.add("aux"), (Z(s("pc0_running")) || Z(s("pc0_speed")) || Z(s("flow"))) && t.add("running"), t.add(Z(s("vw1_position")) || !r.bindings.vw1_position && Z(s("dhw_active")) && !Z(s("heating_active")) ? "b" : "a"), (Z(s("pc1_running")) || Z(s("pc1_speed"))) && t.add("pc1"), Z(s("dhw_charging")) && t.add("charging");
      const i = Z(s("dhw_active")) || t.has("running") && t.has("b") ? "hot_water" : Z(s("heating_active")) || t.has("running") ? "heating" : "off";
      t.add(`mode_${i}`);
      break;
    }
    case "dhw_tank":
      Z(s("charging")) && t.add("charging"), Z(s("disinfecting")) && t.add("disinfecting");
      break;
    case "tap":
      Z(s("flow")) && t.add("flowing");
      break;
    case "radiators":
    case "floor_heating":
      t.add("on");
      break;
  }
  return t;
}
function Qs(r, e) {
  const t = e.get(r.c);
  return t ? r.s.startsWith("!") ? !t.has(r.s.slice(1)) : t.has(r.s) : !1;
}
function Wn(r, e) {
  const t = r.flow || [], s = r.flowAny || [];
  return t.length === 0 && s.length === 0 ? !1 : t.every((i) => Qs(i, e)) && (s.length === 0 || s.some((i) => Qs(i, e)));
}
function Pn(r, e) {
  const t = new Map(r.components.map((n) => [n.id, n])), s = /* @__PURE__ */ new Map(), i = (n) => {
    const o = t.get(n.c);
    if (!o) return;
    const a = pe(o, n.p);
    if (a) {
      if (a.def.fixedTemp !== void 0) return a.def.fixedTemp;
      if (a.def.tempSlot) {
        const l = e.get(o, a.def.tempSlot);
        if (l?.available && l.num !== null) return l.num;
      }
    }
  };
  for (const n of r.pipes) {
    if (n.bindings?.temp) {
      const a = e.getEntity(n.bindings.temp);
      if (a?.available && a.num !== null) {
        s.set(n.id, a.num);
        continue;
      }
    }
    const o = i(n.from);
    o !== void 0 && s.set(n.id, o);
  }
  for (let n = 0; n < 6; n++) {
    let o = !1;
    for (const a of r.pipes) {
      if (s.has(a.id)) continue;
      const l = t.get(a.from.c);
      if (l && J[l.type].passive) {
        const p = r.pipes.find((d) => d.to.c === l.id && s.has(d.id));
        if (p) {
          s.set(a.id, s.get(p.id)), o = !0;
          continue;
        }
      }
      if (n === 5 || !l || !J[l.type].passive) {
        const p = i(a.to);
        p !== void 0 && (s.set(a.id, p), o = !0);
      }
    }
    if (!o && n > 0) break;
  }
  return s;
}
const Cn = {
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
function Ke(r, e) {
  return ce(r).find((t) => t.key === e)?.kind || "text";
}
function xe(r, e) {
  if (!r) return { text: c("none"), unit: "" };
  if (!r.available) return { text: c("none"), unit: "" };
  if (e === "bool") return { text: Z(r) ? c("on") : c("off"), unit: "" };
  if (e === "enum" && r.num === null) {
    const o = `mode.${Oe(r)}`, a = c(o);
    return { text: a === o ? String(r.raw) : a, unit: "" };
  }
  let t = r.unit ?? Cn[e] ?? "";
  if (r.num === null) return { text: String(r.raw), unit: "" };
  let s = r.num;
  e === "power_w" && t === "W" && Math.abs(s) >= 1e3 && (s = s / 1e3, t = "kW");
  const i = e === "count" || e === "percent" || e === "flow" || e === "duration" || e === "power_w" && t === "W" || e === "energy" && s >= 100 ? 0 : 1;
  return { text: N(s, i), unit: t };
}
function te(r, e) {
  if (r === void 0 || Number.isNaN(r)) return e;
  const t = [
    [5, [43, 108, 255]],
    [20, [34, 195, 230]],
    [28, [61, 220, 151]],
    [36, [245, 197, 66]],
    [44, [255, 138, 61]],
    [54, [255, 77, 77]],
    [65, [224, 33, 122]]
  ];
  if (r <= t[0][0]) return ot(t[0][1]);
  for (let s = 1; s < t.length; s++) {
    const [i, n] = t[s], [o, a] = t[s - 1];
    if (r <= i) {
      const l = (r - o) / (i - o);
      return ot([0, 1, 2].map((p) => a[p] + (n[p] - a[p]) * l));
    }
  }
  return ot(t[t.length - 1][1]);
}
function ot(r) {
  return `rgb(${r.map((e) => Math.round(e)).join(",")})`;
}
function Dn(r, e) {
  const t = (i, n, o) => ot([0, 1, 2].map((a) => i[a] + (n[a] - i[a]) * Math.max(0, Math.min(1, o)))), s = (i, n) => e === void 0 ? 0.5 : (e - i) / (n - i);
  switch (r) {
    case "supply":
      return t([245, 176, 66], [255, 64, 64], s(25, 55));
    case "return":
      return t([46, 110, 255], [77, 208, 255], s(20, 45));
    case "dhw_hot":
      return t([255, 128, 170], [255, 46, 120], s(35, 60));
    case "dhw_cold":
      return "rgb(110, 205, 255)";
    case "circulation":
      return t([150, 120, 255], [196, 120, 255], s(35, 55));
    default:
      return te(e, "#8a97a6");
  }
}
function Vi(r) {
  const e = r?.split(".")[0];
  return e === "number" || e === "input_number" ? "number" : e === "select" || e === "input_select" ? "select" : e === "switch" || e === "input_boolean" ? "switch" : e === "button" || e === "input_button" ? "button" : null;
}
function Ri(r, e = -12) {
  return {
    design: r ? 35 : 50,
    minExt: e,
    offset: 0,
    roomSet: 21,
    minFlow: r ? 22 : 25,
    maxFlow: r ? 40 : 55,
    limit: 16,
    exponent: r ? 1.1 : 1.3
  };
}
function Fe(r, e) {
  if (e >= r.limit) return null;
  const t = Math.max(1, r.roomSet - r.minExt), s = Math.max(0, (r.roomSet - e) / t), i = r.roomSet + (r.design - r.roomSet) * Math.pow(s, 1 / r.exponent);
  return Math.max(r.minFlow, Math.min(r.maxFlow, i + r.offset));
}
function Tn(r, e) {
  const t = r.exponent > 1.2 ? 2.5 : 1.5, s = (r.roomSet - e) * t;
  return Math.round(s * 2) / 2;
}
const Ln = {
  nominal: 7.1,
  source: "air",
  bufferL: 120,
  dhwL: 274,
  auxKw: 6,
  heatLoad: 6.2,
  designTemp: -12,
  floor: !1
}, Ee = 4.186 / 3600, ei = 10, Bt = 21, On = 10, Hn = [
  // hour of day, minutes, litres per minute (mixed at 40 °C)
  [6.5, 7, 9],
  [6.85, 6, 9],
  [7.2, 5, 8],
  [12.25, 2, 4],
  [18.6, 3, 5],
  [20.4, 8, 9],
  [21.1, 6, 9]
], Bn = [
  [6, 7.5],
  [11.5, 12.5],
  [17.5, 19]
];
class Vn {
  constructor(e = {}, t = Date.now() / 1e3, s) {
    this.speed = 60, this.outdoorMean = 2, this.dailySwing = 2.5, this.tOut = 2, this.tRoom = 20.8, this.bufTop = 38, this.bufBot = 33, this.dhwTop = 49, this.dhwBot = 43, this.tVl = 30, this.tRl = 28, this.tVlHc = 38, this.tRlHc = 32, this.mode = "off", this.pTh = 0, this.pEl = 0, this.cop = 0, this.running = !1, this.lastStart = -1e9, this.lastStop = -1e9, this.pc0Overrun = 0, this.ice = 0.3, this.defrostLeft = 0, this.aux = 0, this.auxTimer = 0, this.heatDemand = !1, this.dhwDemand = !1, this.tapFlow = 0, this.tapLeft = 0, this.qEmit = 0, this.starts = 0, this.e = { el: 0, heat: 0, elHeat: 0, elDhw: 0, heatHeat: 0, heatDhw: 0, aux: 0 }, this.dim14a = !1, this.pv = !1, this.soc = 55, this.cloud = 0.8, this.en = { pv: 0, house: 0.4, wallbox: 0, battery: 0, grid: 0, hp: 0 }, this.disinfect = !1, this.fault = !1, this.lastDrawDay = /* @__PURE__ */ new Map(), this.days = /* @__PURE__ */ new Map(), this.sampleAcc = 0, this.hist = /* @__PURE__ */ new Map(), this.active = /* @__PURE__ */ new Map(), this.messages = [], this.labels = { dhw: "WW" }, this.listeners = [], this.p = { ...Ln, ...e }, this.curve = Ri(this.p.floor, this.p.designTemp), s && (this.labels = { ...this.labels, ...s }), this.time = t - 24 * 3600, this.prefill(t);
  }
  prefill(e) {
    const t = this.listeners;
    for (this.listeners = []; this.time < e; ) this.step(ei);
    this.messages = this.messages.slice(-40), this.listeners = t;
  }
  onMessage(e) {
    return this.listeners.push(e), () => {
      this.listeners = this.listeners.filter((t) => t !== e);
    };
  }
  /** Advance by real seconds × speed. */
  advance(e) {
    let t = Math.min(e, 1) * this.speed, s = 0;
    for (; t > 0 && s++ < 400; ) {
      const i = Math.min(ei, t);
      this.step(i), t -= i;
    }
  }
  hour() {
    const e = new Date(this.time * 1e3);
    return e.getHours() + e.getMinutes() / 60 + e.getSeconds() / 3600;
  }
  // ----------------------------------------------------------- physics
  pMax() {
    const e = this.p.nominal, t = this.p.source === "air" ? 1 + 0.015 * (this.tOut - 2) : 1;
    return Math.max(e * 0.55, Math.min(e * 1.2, e * t));
  }
  pMin() {
    const e = this.p.nominal * 0.18, t = this.p.source === "air" ? 1 + 0.04 * Math.max(0, this.tOut - 2) : 1;
    return Math.max(1, e * t);
  }
  curveSetpoint() {
    const e = this.pv ? 5 : 0;
    return (Fe(this.curve, this.tOut) ?? this.curve.minFlow) + e;
  }
  dhwSetpoint() {
    return this.disinfect ? 60 : this.pv ? 55 : 50;
  }
  step(e) {
    this.time += e;
    const t = this.hour(), s = e / 3600, i = this.p, n = this.outdoorMean + this.dailySwing * Math.cos((t - 15) / 24 * 2 * Math.PI);
    this.tOut += (n - this.tOut) * Math.min(1, e / 1800);
    const o = this.tOut < this.curve.limit, a = this.curveSetpoint(), l = o ? 650 * Ee * 3600 / 3600 : 0, p = i.heatLoad * (i.floor, 1), d = i.floor ? 30 - Bt : 45 - Bt, h = i.floor ? 1.1 : 1.3;
    let u = 0;
    if (this.tVlHc = this.bufTop, l > 0) {
      let q = this.tVlHc - 3;
      for (let ue = 0; ue < 4; ue++)
        u = p * Math.pow(Math.max(0, (q - this.tRoom) / d), h), q = this.tVlHc - u / (2 * l);
      u *= Math.max(0.1, Math.min(1, 1 - (this.tRoom - this.curve.roomSet - 0.2) * 1.5)), this.tRlHc = this.tVlHc - u / l;
    } else
      this.tRlHc = this.bufBot;
    this.qEmit = u;
    const m = i.heatLoad / (Bt - i.designTemp);
    this.tRoom += (u - m * (this.tRoom - this.tOut) + 0.35) * s / 9;
    const _ = Math.floor(this.time / 86400);
    Hn.forEach(([q, ue, qi], Ps) => {
      t >= q && t < q + 0.1 && this.lastDrawDay.get(Ps) !== _ && (this.lastDrawDay.set(Ps, _), this.startDraw(ue, qi));
    }), this.tapLeft > 0 && (this.tapLeft -= e, this.tapLeft <= 0 && (this.tapFlow = 0));
    const g = Bn.some(([q, ue]) => t >= q && t < ue), y = i.dhwL / 2 * Ee, w = this.tapFlow * 60 * Ee * (40 - On), b = 1.38 / 24 / 2 + (g ? 0.12 : 0) / 2;
    this.dhwTop -= (w * 0.35 + b) * s / y, this.dhwBot -= (w * 0.65 + b) * s / y;
    const x = this.dhwSetpoint();
    (this.dhwTop < x - 5 || this.dhwBot < x - 14 || this.disinfect && this.dhwBot < 59) && (this.dhwDemand = !0), this.dhwBot >= x - 0.5 && this.dhwTop >= x - 0.5 && (this.dhwDemand = !1, this.disinfect && (this.disinfect = !1, this.condition("dis", !1, "info", "dhw_disinfection", {}, "dhw"))), o && this.bufTop < a - 2 && (this.heatDemand = !0);
    const M = this.time - this.lastStart > 600;
    (!o || this.bufTop > a + 2.5 && M) && (this.heatDemand = !1);
    let P = this.fault ? "compressor_alarm" : this.dhwDemand ? "hot_water" : this.heatDemand ? "heating" : "off";
    this.defrostLeft > 0 && !this.fault && (P = "defrost");
    const B = P === "heating" || P === "hot_water" || P === "defrost";
    B && !this.running ? this.time - this.lastStop >= 480 || P === "defrost" ? (this.running = !0, this.lastStart = this.time, this.starts++, this.pTh = this.pMin()) : P = "off" : !B && this.running && (this.time - this.lastStart > 600 || this.fault ? (this.running = !1, this.lastStop = this.time, this.pc0Overrun = 180) : P = this.mode === "hot_water" ? "hot_water" : "heating"), this.mode = this.running ? P : this.fault ? "compressor_alarm" : "off";
    const j = this.pMax(), ee = this.pMin();
    let A = 0;
    if (this.running && this.mode === "heating" ? A = this.qEmit + 2.2 * (a + 1 - this.bufTop) : this.running && this.mode === "hot_water" && (A = Math.min(j * 0.9, Math.max(ee, (60 - this.dhwBot - 3) * 0.9))), this.running && this.mode !== "defrost") {
      A = Math.max(ee, Math.min(j, A)), this.pTh < ee && (this.pTh = ee);
      const q = 0.5 * (e / 60);
      this.pTh += Math.max(-q * 2, Math.min(q, A - this.pTh));
    } else this.mode === "defrost" ? this.pTh = -3 : this.pTh = 0;
    let C = 0;
    this.dim14a || (this.fault && o ? C = i.auxKw : this.mode === "heating" && this.bufTop < a - 5 && this.pTh >= j * 0.95 ? (this.auxTimer += e, this.auxTimer > 1200 && (C = Math.min(i.auxKw, 3))) : this.auxTimer = 0, this.tOut < i.designTemp + 2 && this.mode === "heating" && (C = Math.max(C, Math.min(i.auxKw, 3))), this.disinfect && this.mode === "hot_water" && this.dhwBot > 52 && (C = Math.min(i.auxKw, 3))), this.fault && o && C > 0 && (this.heatDemand = !0), this.aux = C;
    const I = this.running || this.pc0Overrun > 0 || this.fault && this.aux > 0;
    !this.running && this.pc0Overrun > 0 && (this.pc0Overrun -= e);
    const F = I ? 1100 * Ee : 0, O = this.mode === "hot_water", W = (this.running ? this.pTh : 0) + this.aux;
    O ? this.tRl = this.dhwBot + 2 : this.tRl = I ? this.bufBot : this.tRl + (22 - this.tRl) * Math.min(1, e / 3600), this.tVl = F > 0 ? this.tRl + W / F : this.tVl + (this.tRl - this.tVl) * Math.min(1, e / 600);
    const E = (i.bufferL + 60) / 2 * Ee, T = O ? 0 : F, V = 0.05 / 2, D = T * (this.tVl - this.bufTop) + (l > T ? (l - T) * (this.bufBot - this.bufTop) : 0) - V, R = l * (this.tRlHc - this.bufBot) + (T > l ? (T - l) * (this.bufTop - this.bufBot) : 0) - V;
    if (this.bufTop += D * s / E, this.bufBot += R * s / E, this.bufBot > this.bufTop) {
      const q = (this.bufBot + this.bufTop) / 2;
      this.bufBot = this.bufTop = q;
    }
    if (O && (this.dhwBot += W * s / y, this.dhwBot > this.dhwTop)) {
      const q = (this.dhwBot + this.dhwTop) / 2;
      this.dhwBot = this.dhwTop = q;
    }
    if (this.running && this.mode !== "defrost") {
      const q = this.tVl + 273.15 + 3, ue = (this.p.source === "air" ? this.tOut - 6 : 0) + 273.15;
      this.cop = Math.max(1.4, Math.min(7.5, 0.57 * q / Math.max(5, q - ue))), this.pEl = this.pTh / this.cop + 0.06;
    } else this.mode === "defrost" ? (this.cop = 0, this.pEl = 1.1) : (this.cop = 0, this.pEl = 0.012 + (I ? 0.03 : 0));
    const H = Math.max(0, this.running ? this.pTh : 0);
    this.e.el += (this.pEl + this.aux) * s, this.e.aux += this.aux * s, this.e.heat += (H + this.aux) * s;
    const G = new Date(this.time * 1e3), X = new Date(G.getFullYear(), G.getMonth(), G.getDate()).getTime();
    let ie = this.days.get(X);
    if (!ie) {
      this.days.set(X, ie = { heat: 0, el: 0, heatDhw: 0, elDhw: 0, aux: 0 });
      for (const q of [...this.days.keys()]) q < X - 3 * 864e5 && this.days.delete(q);
    }
    if (ie.heat += (H + this.aux) * s, ie.el += (this.pEl + this.aux) * s, ie.aux += this.aux * s, O && (ie.heatDhw += H * s, ie.elDhw += this.pEl * s), O ? (this.e.elDhw += this.pEl * s, this.e.heatDhw += H * s) : (this.e.elHeat += this.pEl * s, this.e.heatHeat += H * s), this.defrostLeft > 0)
      this.defrostLeft -= e, this.defrostLeft <= 0 && (this.ice = 0, this.defrostLeft = 0);
    else if (this.p.source === "air" && this.running && this.tOut < 7 && this.tOut > -15) {
      const q = this.tOut > -2 ? 1.3 - Math.abs(this.tOut - 1) * 0.12 : 0.9 + this.tOut * 0.04;
      this.ice += Math.max(0.05, q) * (this.pTh / j) * s, this.ice >= 1 && (this.defrostLeft = 240 + Math.random() * 120);
    }
    this.emitConditions(), this.energyStep(e, t), this.values = this.buildValues(a, x, g, I, F), this.sampleAcc += e, this.sampleAcc >= 60 && (this.sampleAcc = 0, this.sample());
  }
  /** Household power balance around the heat pump (PV, battery, house, wallbox, grid). */
  energyStep(e, t) {
    const s = e / 3600;
    this.cloud += (Math.random() - 0.5) * 0.08 * Math.sqrt(e / 10), this.cloud = Math.max(0.35, Math.min(1, this.cloud));
    const i = Math.max(0.25, Math.min(1, 0.45 + (this.outdoorMean - 2) / 25)), n = t > 7 && t < 19 ? Math.sin((t - 7) / 12 * Math.PI) : 0;
    let o = 9.9 * 0.8 * i * n * this.cloud;
    this.pv && (o = Math.max(o, 6.5));
    const a = (g, y, w) => t >= g && t < y ? w : 0, l = 0.35 + a(6.5, 8, 0.6) + a(11.5, 13, 0.9) + a(18, 21, 0.8) + 0.05 * Math.sin(this.time / 97);
    let d = Math.floor(this.time / 86400) % 2 === 0 && t >= 18 && t < 21.5 ? 7.4 : 0;
    this.dim14a && d && (d = 4.2);
    const h = this.pEl + this.aux, u = o - l - d - h;
    let m = 0;
    u > 0 && this.soc < 100 ? m = -Math.min(u, 5) : u < 0 && this.soc > 10 && !d && (m = Math.min(-u, 5)), this.soc = Math.max(0, Math.min(100, this.soc - m * s * 100 / 10));
    const _ = l + d + h - o - m;
    this.en = { pv: o, house: l, wallbox: d, battery: m, grid: _, hp: h };
  }
  startDraw(e, t) {
    this.tapFlow = t, this.tapLeft = e * 60;
  }
  buildValues(e, t, s, i, n) {
    const o = (p) => Math.round(p * 10) / 10, a = this.pMax(), l = this.running;
    return {
      outdoor: {
        outdoor_temp: o(this.tOut),
        air_in_temp: o(this.tOut + 0.4),
        activity: this.mode,
        compressor_on: l && this.mode !== "defrost" ? !0 : l,
        compressor_speed: l ? Math.round(Math.abs(this.pTh) / (a * 1.15) * 100) : 0,
        fan_speed: l && this.mode !== "defrost" ? Math.round(35 + this.pTh / a * 55) : 0,
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
        target_flow_temp: o(this.mode === "hot_water" ? Math.min(62, t + 8) : e),
        pressure: o(1.45 + ((this.bufTop + this.bufBot) / 2 - 30) * 8e-3),
        flow: i ? Math.round(n / Ee) : 0,
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
      energy: {
        pv_power: Math.round(this.en.pv * 1e3),
        house_power: Math.round(this.en.house * 1e3),
        wallbox_power: Math.round(this.en.wallbox * 1e3),
        battery_power: Math.round(this.en.battery * 1e3),
        battery_soc: Math.round(this.soc),
        grid_power: Math.round(this.en.grid * 1e3),
        hp_power: Math.round(this.en.hp * 1e3)
      },
      pc0: { running: i, speed: i ? 72 : 0, flow: i ? 1100 : 0 },
      pc1: { running: this.tOut < 16, speed: this.tOut < 16 ? 55 : 0, flow: this.tOut < 16 ? 650 : 0 },
      circ: { running: s },
      vw1: { position: this.mode === "hot_water" },
      buffer: { temp_top: o(this.bufTop), temp_mid: o((this.bufTop + this.bufBot) / 2), temp_bottom: o(this.bufBot) },
      dhw: {
        temp_top: o(this.dhwTop),
        temp_bottom: o(this.dhwBot),
        setpoint: t,
        charging: this.mode === "hot_water",
        onetime: !1,
        disinfecting: this.disinfect
      },
      hc: {
        flow_temp: o(this.tVlHc),
        return_temp: o(this.tRlHc),
        target_flow_temp: o(e),
        room_temp: o(this.tRoom),
        room_setpoint: this.curve.roomSet,
        mode: "auto",
        summer_mode: this.tOut < 16 ? "winter" : "summer",
        operating_state: this.tOut < 16 ? "heating" : "off",
        design_temp: this.curve.design,
        offset_temp: this.curve.offset,
        min_flow_temp: this.curve.minFlow,
        max_flow_temp: this.curve.maxFlow,
        min_ext_temp: this.curve.minExt,
        heating_limit: this.curve.limit
      },
      tap: { flow: this.tapFlow, temp: o(this.dhwTop - 2) },
      mixer: { position: this.tOut < 16 ? 40 : 0, flow_temp: o(Math.min(this.tVlHc, 33)) }
    };
  }
  // ----------------------------------------------------------- messages
  condition(e, t, s, i, n, o) {
    const a = this.active.get(e);
    if (t && !a) {
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
      this.active.set(e, l.id), this.messages.push(l), this.messages.length > 200 && this.messages.shift(), this.listeners.forEach((p) => p(l));
    } else if (!t && a) {
      this.active.delete(e);
      const l = this.messages.find((p) => p.id === a);
      l && (l.active = !1, l.end_ts = this.time, this.listeners.forEach((p) => p(l)));
    }
  }
  emitConditions() {
    this.condition("defrost", this.mode === "defrost", "info", "defrost", {}, "outdoor"), this.condition("dhw", this.mode === "hot_water", "info", "dhw_charging", { component: this.labels.dhw }, "dhw"), this.condition("aux", this.aux > 0, "notice", "aux_heater", {}, "indoor"), this.condition("in1", this.dim14a, "warning", "input_active", { input: 1, label: "§14a" }, "indoor"), this.condition("in4", this.pv, "notice", "input_active", { input: 4, label: "PV-Überschuss" }, "indoor"), this.condition("dis", this.disinfect, "info", "dhw_disinfection", { component: this.labels.dhw }, "dhw"), this.condition("fault", this.fault, "error", "sim_fault", {}, "outdoor");
  }
  scenarioMessage(e) {
    const t = {
      id: Math.random().toString(16).slice(2, 14),
      ts: this.time,
      level: "info",
      key: "sim_scenario",
      params: { name: e },
      component_id: null,
      active: !1,
      end_ts: null
    };
    this.messages.push(t), this.listeners.forEach((s) => s(t));
  }
  // ----------------------------------------------------------- history
  sample() {
    const e = this.time;
    for (const [t, s] of Object.entries(this.values))
      for (const [i, n] of Object.entries(s)) {
        const o = typeof n == "number" ? n : typeof n == "boolean" ? n ? 1 : 0 : null;
        if (o === null && i !== "activity") continue;
        const a = `${t}.${i}`;
        let l = this.hist.get(a);
        l || this.hist.set(a, l = []), l.push(o === null ? { t: e, v: null, raw: String(n) } : { t: e, v: o }), l.length > 1500 && l.splice(0, l.length - 1440);
      }
  }
  dailyEnergy() {
    return [...this.days.entries()].sort((e, t) => e[0] - t[0]).map(([e, t]) => ({ day: e, ...t }));
  }
  history(e, t, s) {
    const i = this.hist.get(`${e}.${t}`) || [], n = this.time - s * 3600;
    return i.filter((o) => o.t >= n);
  }
}
function ti(r) {
  switch (r.type) {
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
      const e = r.props.role;
      return e === "primary" ? "pc0" : e === "circulation" ? "circ" : "pc1";
    }
    default:
      return null;
  }
}
function Vt(r) {
  if (!r) return {};
  const e = r.components.find((l) => l.type === "outdoor_unit"), t = r.components.find((l) => l.type === "indoor_unit"), s = r.components.find((l) => l.type === "buffer"), i = r.components.find((l) => l.type === "dhw_tank"), n = qe(t?.model), o = He(e?.model), a = r.components.filter((l) => l.type === "radiators" || l.type === "floor_heating");
  return {
    nominal: Number(e?.props.nominal_kw) || o.nominal,
    source: o.source,
    bufferL: Number(s?.props.volume) || n?.buffer || (s ? 120 : 30),
    dhwL: Number(i?.props.volume) || n?.dhw || 274,
    auxKw: Number(t?.props.aux_kw) || 6,
    heatLoad: Number(r.settings?.heat_load) || 6.2,
    floor: a.length > 0 && a.every((l) => l.type === "floor_heating")
  };
}
const Rn = {}, si = {
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
class Ni {
  /** hass is used for raw entity lookups (e.g. real PV/grid values in the energy layer) */
  constructor(e, t) {
    this.sim = e, this.hass = t;
  }
  entityOf() {
  }
  getEntity() {
  }
  /** Real entity value despite demo mode (energy layer: household PV, grid, battery …). */
  realEntity(e) {
    const t = this.hass?.states?.[e];
    return t ? zs(t.state, t.attributes?.unit_of_measurement, e) : void 0;
  }
  get(e, t) {
    if (e.type === "value_tile") {
      const n = (e.props.entries || []).find((l) => l.slot === t);
      if (!n?.sim) return;
      const [o, a] = n.sim.split(".");
      return this.wrap(this.sim.values[o]?.[a]);
    }
    if (e.type === "indoor_unit") {
      const n = si[t];
      if (n) {
        const o = be(e)?.id;
        return t.startsWith("dhw_") && o !== "t180" || t === "buffer_temp" && o !== "tp70" || t.startsWith("pc1") && o === "wall_e" ? void 0 : this.wrap(this.sim.values[n[0]]?.[n[1]]);
      }
    }
    const s = ti(e);
    if (!s) return;
    let i = this.sim.values[s]?.[t];
    if (i !== void 0)
      return s === "hc" && typeof i == "number" && Number(e.props.circuit) > 1 && ["flow_temp", "return_temp", "target_flow_temp"].includes(t) && (i = Math.round((i - (e.type === "floor_heating" ? 12 : 2)) * 10) / 10), this.wrap(i, Rn[t]);
  }
  wrap(e, t) {
    if (e !== void 0)
      return {
        raw: e,
        num: typeof e == "number" ? e : typeof e == "boolean" ? e ? 1 : 0 : null,
        unit: t,
        available: !0
      };
  }
  async history(e, t, s) {
    const i = e.type === "indoor_unit" ? si[t] : void 0;
    if (i) return this.sim.history(i[0], i[1], s);
    const n = ti(e);
    return n ? this.sim.history(n, t, s) : [];
  }
}
function Xt() {
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
class Nn {
  constructor() {
    this.components = [], this.pipes = [], this.n = 0;
  }
  add(e, t, s, i, n, o = {}) {
    return this.components.push({ id: e, type: t, label: s, x: i, y: n, bindings: {}, props: {}, ...o }), e;
  }
  pipe(e, t, s, i = [], n = {}) {
    this.pipes.push({ id: `p${++this.n}`, from: e, to: t, kind: s, flow: i, ...n });
  }
}
const $ = (r, e) => ({ c: r, p: e });
function Lt(r, e) {
  const t = new Nn(), s = qe(r.indoorModel), i = s?.variant || "wall_e", n = !!s?.dhw, o = !!s?.buffer, a = r.dhw === "tank" && !n, l = r.dhw === "tank" || n, p = r.buffer !== "none" && !o, d = { c: "iu", s: "running" }, h = l ? [{ c: "iu", s: "a" }] : [], u = { c: "iu", s: "b" }, m = { c: "pc1", s: "running" }, _ = {
    aux_kw: r.aux ? r.auxKw : 0,
    input_labels: { input1: "§14a / EVU", input4: "PV" },
    input_levels: { input1: "warning" },
    pressure_min: 1,
    pressure_max: 2.7,
    buffer_l: s?.buffer
  }, g = i !== "wall_e", y = i === "tp70" && r.circuits.length <= 1 && !r.circuits[0]?.mixed, w = y ? 5 : 12;
  t.add("ou", "outdoor_unit", r.outdoorLabel || c("type.outdoor_unit"), 1, w, {
    model: r.outdoorModel,
    props: { nominal_kw: r.nominalKw }
  });
  const b = y ? 22 : g ? 14 : 16, x = y ? 27 : g ? 12 : 2;
  t.add("iu", "indoor_unit", r.indoorLabel || c("type.indoor_unit"), b, x, { model: r.indoorModel, props: _ });
  const M = t.components.find((A) => A.id === "iu"), P = (A) => pe(M, A), B = { y: w + 5 };
  if (y) {
    const A = x, C = (R) => P(R).x, I = { c: "iu", s: "pc1" };
    t.pipe($("iu", "src_out"), $("ou", "in"), "return", [d], { via: [[C("src_out"), w + 5]] }), t.pipe($("ou", "out"), $("iu", "src_in"), "supply", [d], { via: [[C("src_in"), w + 6]] });
    const F = r.circuits[0] ?? { emitter: "radiators", label: "" }, O = 2, W = A - 8, E = A - 4;
    t.add("hc1", F.emitter, F.label || c("wz.circuit", { n: 1 }), O, W - 1, { flip: !0, props: { circuit: 1 } }), t.pipe($("iu", "sup"), $("hc1", "sup"), "supply", [I], { via: [[C("sup"), W]] });
    let T = $("hc1", "ret"), V = [], D = O + 9;
    if (r.separator && (t.add("sep", "separator", c("wz.separator_short"), D, E - 1), t.add("sc1", "separator", "SC1", D + 3, E - 1, { props: { filter: !0 } }), t.pipe(T, $("sep", "in"), "return", [I]), t.pipe($("sep", "out"), $("sc1", "in"), "return", [I]), T = $("sc1", "out"), D += 7), r.expansion && (t.add("jmag", "junction", "", D + 1, E), t.add("mag", "expansion_vessel", "MAG", D, E, { rot: 180 }), t.pipe($("mag", "conn"), $("jmag", "b"), "return", []), t.pipe(T, $("jmag", "l"), "return", [I]), T = $("jmag", "r")), t.pipe(T, $("iu", "ret"), "return", [I], { via: [...V, [C("ret"), E]] }), a) {
      const R = b + 22, H = A + 2;
      t.add("dhw", "dhw_tank", r.dhwLabel || c("type.dhw_tank"), R, H, { props: { volume: r.dhwVolume } }), t.pipe($("iu", "dhw_sup"), $("dhw", "coil_in"), "supply", [d, u], { via: [[C("dhw_sup"), A - 3], [R + 9, A - 3], [R + 9, H + 4]] }), t.pipe($("dhw", "coil_out"), $("iu", "dhw_ret"), "return", [d, u], { via: [[R + 8, H + 9], [R + 8, A - 2], [C("dhw_ret"), A - 2]] }), Qe(t, r, $("dhw", "hot"), $("dhw", "circ"), $("dhw", "cold"), R, H);
    }
  } else if (g) {
    const A = x, C = (D) => P(D).x, I = Math.max(...["src_in", "src_out", "sup", "ret", "dhw_sup", "dhw_ret", "dhw_hot", "dhw_cold", "circ"].filter((D) => pe(M, D)).map(C));
    t.pipe($("ou", "out"), $("iu", "src_in"), "supply", [d], { via: [[12, B.y], [12, A - 9], [C("src_in"), A - 9]] }), t.pipe($("iu", "src_out"), $("ou", "in"), "return", [d], { via: [[C("src_out"), A - 10], [11, A - 10]] });
    let F = $("iu", "sup"), O = $("iu", "ret"), W = o ? [m] : [d, ...h], E = [[C("sup"), A - 2]];
    const T = A - 4;
    let V = I + 14;
    if (p) {
      const D = I + 2, R = D + 10, H = A + 4;
      t.add("buf", "buffer", r.bufferLabel || c("type.buffer"), R, H, { props: { volume: r.bufferVolume } }), t.pipe($("iu", "sup"), $("buf", "in_sup"), "supply", [d, ...h], { via: [[C("sup"), A - 2], [R + 1, A - 2]] });
      const G = [d, ...h];
      let X = $("buf", "in_ret"), ie = [[R + 2, T]];
      r.separator && (t.add("sep", "separator", c("wz.separator_short"), D + 6, T - 1, { rot: 180 }), t.add("sc1", "separator", "SC1", D + 3, T - 1, { rot: 180, props: { filter: !0 } }), t.pipe(X, $("sep", "in"), "return", G, { via: ie }), t.pipe($("sep", "out"), $("sc1", "in"), "return", G), X = $("sc1", "out"), ie = []), r.expansion && (t.add("jmag", "junction", "", D, T), t.add("mag", "expansion_vessel", "MAG", D - 1, T - 5), t.pipe($("mag", "conn"), $("jmag", "t"), "return", []), t.pipe(X, $("jmag", "r"), "return", G, { via: ie }), X = $("jmag", "l"), ie = []), t.pipe(X, $("iu", "ret"), "return", G, { via: [...ie, [C("ret"), T]] }), F = $("buf", "out_sup"), O = $("buf", "out_ret"), W = [m], E = [], V = R + 7;
    }
    if (Rt(t, r, F, O, W, E, p || o, V, A + 4), n)
      Qe(t, r, $("iu", "dhw_hot"), $("iu", "circ"), $("iu", "dhw_cold"), b - 1, A + 18);
    else if (a) {
      const D = b - 9, R = A + 8;
      t.add("dhw", "dhw_tank", r.dhwLabel || c("type.dhw_tank"), D, R, { props: { volume: r.dhwVolume } }), t.pipe($("iu", "dhw_sup"), $("dhw", "coil_in"), "supply", [d, u], { via: [[C("dhw_sup"), A - 1], [D + 8, A - 1], [D + 8, R + 4]] }), t.pipe($("dhw", "coil_out"), $("iu", "dhw_ret"), "return", [d, u], { via: [[D + 7, R + 9], [D + 7, A - 3], [C("dhw_ret"), A - 3]] }), Qe(t, r, $("dhw", "hot"), $("dhw", "circ"), $("dhw", "cold"), D, R);
    }
  } else {
    const A = x + 14, C = (E) => P(E).x;
    t.pipe($("iu", "src_out"), $("ou", "in"), "return", [d], { via: [[C("src_out"), A + 1]] }), t.pipe($("ou", "out"), $("iu", "src_in"), "supply", [d], { via: [[C("src_in"), A + 2]] });
    const I = A + 6, F = [d, ...h], O = [];
    r.separator && (t.add("sep", "separator", c("wz.separator_short"), C("sup") + 9, I - 1, { rot: 180 }), O.push({ inP: $("sep", "in"), outP: $("sep", "out") })), r.expansion && (t.add("jmag", "junction", "", C("sup") + 6, I), t.add("mag", "expansion_vessel", "MAG", C("sup") + 5, I + 1, { rot: 180 }), t.pipe($("mag", "conn"), $("jmag", "b"), "return", []), O.push({ inP: $("jmag", "r"), outP: $("jmag", "l") })), r.separator && (t.add("sc1", "separator", "SC1", C("sup") + 1, I - 1, { rot: 180, props: { filter: !0 } }), O.push({ inP: $("sc1", "in"), outP: $("sc1", "out") }));
    for (let E = 0; E < O.length - 1; E++) t.pipe(O[E].outP, O[E + 1].inP, "return", F);
    let W = $("iu", "ret");
    if (O.length && (t.pipe(O[O.length - 1].outP, $("iu", "ret"), "return", F, { via: [[C("ret"), I]] }), W = O[0].inP), p) {
      const E = b + 22, T = A + 8;
      t.add("buf", "buffer", r.bufferLabel || c("type.buffer"), E, T, { props: { volume: r.bufferVolume } }), t.pipe($("iu", "sup"), $("buf", "in_sup"), "supply", [d, ...h], { via: [[C("sup"), A + 2], [E + 1, A + 2]] }), t.pipe($("buf", "in_ret"), W, "return", [d, ...h], { via: [[E + 2, I]] }), Rt(t, r, $("buf", "out_sup"), $("buf", "out_ret"), [m], [], !0, E + 8, T + 1);
    } else {
      const E = b + 25;
      Rt(t, r, $("iu", "sup"), W, [d, ...h], [[C("sup"), A + 2], [E - 2, A + 2]], !1, E, A + 8, I);
    }
    if (a) {
      const E = C("dhw_sup") - 8, T = A + 6;
      t.add("dhw", "dhw_tank", r.dhwLabel || c("type.dhw_tank"), E, T, { props: { volume: r.dhwVolume } }), t.pipe($("iu", "dhw_sup"), $("dhw", "coil_in"), "supply", [d, u], { via: [[C("dhw_sup"), T + 4]] }), t.pipe($("dhw", "coil_out"), $("iu", "dhw_ret"), "return", [d, u], { via: [[C("dhw_ret"), T + 9]] }), Qe(t, r, $("dhw", "hot"), $("dhw", "circ"), $("dhw", "cold"), E, T);
    }
  }
  const j = Math.max(1, r.circuits.length), ee = {
    version: 5,
    name: r.name,
    grid: y ? { w: 58, h: 49 } : { w: j > 1 ? 76 : 66, h: Math.max(38, (g ? 46 : 38) + (j - 1) * 10) },
    components: t.components,
    pipes: t.pipes,
    settings: e?.settings ?? { style: "flat", demo: !0 }
  };
  if (ee.settings = { ...ee.settings, wizard: r, layout_edited: !1 }, e) {
    const A = new Map(e.components.map((O) => [O.id, O]));
    for (const O of ee.components) {
      const W = A.get(O.id);
      W && W.type === O.type && (O.bindings = { ...W.bindings }, W.icon && (O.icon = W.icon), W.show && (O.show = W.show));
    }
    const C = ee.components.find((O) => O.id === "iu"), I = A.get("pc0"), F = A.get("vw1");
    C && I?.bindings.running && (C.bindings.pc0_running ??= I.bindings.running), C && I?.bindings.speed && (C.bindings.pc0_speed ??= I.bindings.speed), C && F?.bindings.position && (C.bindings.vw1_position ??= F.bindings.position);
  }
  return ee;
}
function Rt(r, e, t, s, i, n, o, a, l, p) {
  Math.max(1, e.circuits.length);
  const d = [], h = { ...t };
  e.circuits.slice(0, 4).forEach((u, m) => {
    const _ = m + 1, g = l - 9 + m * 10, y = _ === 1 ? "pc1" : `hc${_}_pump`, w = `hc${_}_mix`, b = `hc${_}`;
    let x = a, M = null, P = null, B = i;
    (o || u.mixed) && (r.add(y, "pump", _ === 1 ? "PC1" : `PC${_}`, x, g, { props: { role: u.mixed ? "hc" : "secondary", circuit: _ } }), M = $(y, "in"), P = $(y, "out"), B = [{ c: y, s: "running" }], d.push(B[0]), x += 4), u.mixed && (r.add(w, "mixer", `VC${_}`, x, g, { props: { circuit: _ } }), P ? r.pipe(P, $(w, "in"), "supply", B) : M = $(w, "in"), P = $(w, "out"), x += 3);
    const j = x + 3;
    r.add(b, u.emitter, u.label || c("wz.circuit", { n: _ }), j, g - 2, { props: { circuit: _ } }), P ? r.pipe(P, $(b, "sup"), "supply", B, { via: [[j - 2, g + 1], [j - 2, g - 1]] }) : M = $(b, "sup"), r.pipe(h, M, "supply", B, m === 0 ? { via: [...n, [a - 1 - m, g + 1]] } : { via: [[a - 1 - m, g + 1]] }), u.mixed ? (r.add(`hc${_}_jm`, "junction", "", x - 2, g + 3), r.pipe($(b, "ret"), $(`hc${_}_jm`, "r"), "return", B, { via: [[x - 2, g + 3]] }), r.pipe($(`hc${_}_jm`, "t"), $(w, "ret"), "return", B), r.pipe($(`hc${_}_jm`, "l"), s, "return", B, { via: [[a - 2 - m, g + 3], ...p ? [[a - 2 - m, p]] : []] })) : r.pipe($(b, "ret"), s, "return", B, { via: [[a - 2 - m, g + 3], ...p ? [[a - 2 - m, p]] : []] });
  });
}
function Qe(r, e, t, s, i, n, o) {
  const a = { c: "tap", s: "flowing" }, l = { c: "circ", s: "running" };
  if (r.add("tap", "tap", c("type.tap"), n - 9, o), r.add("inlet", "water_inlet", c("type.water_inlet"), n - 9, o + 9), r.pipe($("inlet", "out"), i, "dhw_cold", [a]), !e.circulation) {
    r.pipe(t, $("tap", "hot"), "dhw_hot", [a]);
    return;
  }
  r.add("jww", "junction", "", n - 3, o + 1), r.pipe(t, $("jww", "r"), "dhw_hot", [], { flowAny: [a, l] }), r.pipe($("jww", "l"), $("tap", "hot"), "dhw_hot", [a]), r.add("circ", "pump", "PW2", n - 4, o + 3, { rot: 90, props: { role: "circulation" } }), r.pipe($("jww", "b"), $("circ", "in"), "circulation", [l]), r.pipe($("circ", "out"), s, "circulation", [l]);
}
function Qt() {
  const r = typeof location < "u" ? new URLSearchParams(location.search).get("indoor") : null, e = Xt();
  r && qe(r) && (e.indoorModel = r, e.indoorLabel = qe(r).label.replace(/^Logatherm /, "").split(" – ")[0]);
  const t = Lt(e);
  return typeof location < "u" && new URLSearchParams(location.search).get("style") === "iso" && (t.settings.style = "iso"), t;
}
const In = 4;
class Ii {
  /**
   * @param saveExample store the example plant when none exists yet (panel only;
   *   a card must never write configuration on its own)
   */
  constructor(e, t = !0) {
    this.host = e, this.saveExample = t, this.plant = null, this.icons = /* @__PURE__ */ new Map(), this.backendMessages = [], this.simMessages = [], this.sim = null, this.version = 0, this.error = "", this.admin = !0, this.backendVersion = "", this._raf = 0, this._lastFrame = 0, this._accum = 0, this._boundIds = [], this._lastStates = [], this._loading = !1, this._connected = !1, e.addController(this);
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
  setHass(e) {
    this.hass = e;
    const t = e.themes?.darkMode ?? !0;
    this.host.toggleAttribute("light", !t), js(Zs(this.plant?.settings.language, e.language)), this.api ? this.api.setHass(e) : this._connected && this._init(), this.plant && !this.plant.settings.demo && this._checkStates();
  }
  _init() {
    this.api = new wn(this.hass), this._load();
  }
  // ----------------------------------------------------------------- data
  get messages() {
    return this.sim ? this.simMessages : this.backendMessages;
  }
  get src() {
    return this.sim ? new Ni(this.sim, this.hass) : new Bi(this.hass);
  }
  /** Re-render on hass updates only when a bound entity actually changed. */
  _checkStates() {
    if (!this.hass) return;
    const e = this._boundIds.map((t) => this.hass.states[t]);
    (e.length !== this._lastStates.length || e.some((t, s) => t !== this._lastStates[s])) && (this._lastStates = e, this.version++, this._changed());
  }
  _collectBound() {
    const e = /* @__PURE__ */ new Set();
    for (const s of this.plant?.components || [])
      Object.values(s.bindings || {}).forEach((i) => i && e.add(i)), (s.props.entries || []).forEach((i) => i.entity && e.add(i.entity));
    for (const s of this.plant?.pipes || []) s.bindings?.temp && e.add(s.bindings.temp);
    const t = this.plant?.settings.energy;
    if (t?.enabled)
      for (const s of ["pv", "grid", "battery", "battery_soc", "house", "wallbox"]) t[s] && e.add(t[s]);
    this._boundIds = [...e], this._lastStates = [];
  }
  async _load() {
    if (!(this._loading || !this.api)) {
      this._loading = !0;
      try {
        const e = await this.api.getConfig();
        this.admin = e.is_admin, this.backendVersion = e.version;
        let t = e.plant;
        t ? (t.version ?? 1) < 5 && t.settings?.wizard && !t.settings.layout_edited && (t = Lt(t.settings.wizard, t), e.is_admin && this.saveExample && await this.api.saveConfig(t)) : (t = Qt(), e.is_admin && this.saveExample && await this.api.saveConfig(t)), this.setPlant(t), await this.loadIcons(), this.api.standalone || (this.backendMessages = await this.api.listMessages(), this._unsubMsg = await this.api.subscribeMessages((s) => this._mergeMessage(s)));
      } catch (e) {
        this.error = e?.message || String(e);
      } finally {
        this._loading = !1, this._changed();
      }
    }
  }
  async loadIcons() {
    const e = await this.api.listIcons();
    this.icons = new Map(e.map((t) => [t.id, t])), this._changed();
  }
  _mergeMessage(e) {
    const t = this.backendMessages.findIndex((i) => i.id === e.id), s = [...this.backendMessages];
    t >= 0 ? s[t] = e : s.push(e), this.backendMessages = s, this._changed();
  }
  setPlant(e) {
    const t = JSON.stringify(Vt(this.plant));
    this.plant = e, js(Zs(e.settings.language, this.hass?.language)), this._collectBound(), e.settings.demo ? (!this.sim || JSON.stringify(Vt(e)) !== t) && this._startSim() : (this._stopSim(), this._checkStates()), this.version++, this._changed();
  }
  async save(e) {
    await this.api.saveConfig(e), this.setPlant(e);
  }
  async clearMessages() {
    await this.api.clearMessages(), this.backendMessages = await this.api.listMessages(), this._changed();
  }
  // ------------------------------------------------------------------ sim
  _startSim() {
    this._stopSim();
    const e = this.plant?.components.find((i) => i.type === "dhw_tank"), t = new Vn(Vt(this.plant), void 0, { dhw: e?.label || c("type.dhw_tank") });
    this.sim = t, this._unsubSim = t.onMessage(() => {
      this.simMessages = [...t.messages], this._changed();
    }), this.simMessages = [...t.messages], this._lastFrame = performance.now();
    const s = (i) => {
      const n = (i - this._lastFrame) / 1e3;
      this._lastFrame = i, document.hidden || (t.advance(n), this._accum += n, this._accum >= 1 / In && (this._accum = 0, this.version++, this._changed())), this._raf = requestAnimationFrame(s);
    };
    this._raf = requestAnimationFrame(s);
  }
  _stopSim() {
    this._raf && cancelAnimationFrame(this._raf), this._raf = 0, this._unsubSim?.(), this._unsubSim = void 0, this.sim && (this.sim = null, this.simMessages = [], this.api && !this.api.standalone && this.api.listMessages().then(
      (e) => {
        this.backendMessages = e, this._changed();
      },
      () => {
      }
    ));
  }
  scenario(e) {
    const t = this.sim;
    if (t) {
      switch (e) {
        case "winter":
          t.outdoorMean = -10, t.tOut = -10;
          break;
        case "transition":
          t.outdoorMean = 12, t.tOut = 12;
          break;
        case "shower":
          t.startDraw(8, 9);
          break;
        case "defrost":
          t.ice = 1.01, t.heatDemand = !0;
          break;
        case "dim14a":
          t.dim14a = !t.dim14a;
          break;
        case "pv":
          t.pv = !t.pv;
          break;
        case "disinfect":
          t.disinfect = !0;
          break;
        case "fault":
          t.fault = !t.fault;
          break;
        case "reset":
          this._startSim();
          return;
      }
      t.scenarioMessage(c(`scn.${e}`)), this.version++, this._changed();
    }
  }
}
const Ki = Q`
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
    --cp-iso-top: #3a475a;
    --cp-iso-side: #141b24;
    --cp-iso-floor: rgba(255, 255, 255, 0.05);
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
    --cp-iso-top: #ffffff;
    --cp-iso-side: #b4bfcc;
    --cp-iso-floor: rgba(15, 23, 42, 0.07);
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
`, se = Q`
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
  label.field.check {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  label.field.check input {
    width: auto;
    margin: 0;
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
`, Kn = {
  menu: "M4 7h16M4 12h16M4 17h16",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  curve: "M3 20h18M3 20V4M5 6c3 9 8 12 15 13",
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
  bolt: "M13 2L5 13h6l-1 9l8-11h-6z",
  history: "M3 12a9 9 0 1 0 3-6.7M3 4v4h4M12 7v5l3 2",
  wrench: "M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8l-3-3l8-8l-1.3-1.3a4 4 0 0 1-5-5L13 2l1.7 1.7zM4 20l3-3",
  warn: "M12 3l10 18H2zM12 10v5M12 18h.01",
  error: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM9 9l6 6M15 9l-6 6",
  notice: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM12 7v6M12 16h.01",
  search: "M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14zM20 20l-4-4",
  download: "M12 4v11M7 10l5 5l5-5M5 20h14",
  upload: "M12 20V9M7 14l5-5l5 5M5 4h14"
};
function L(r) {
  return k`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d=${Kn[r] || ""} /></svg>`;
}
const es = k`<svg viewBox="0 0 32 32" class="logo" aria-hidden="true">
  <defs><linearGradient id="cp-logo" x1="0" y1="1" x2="1" y2="0">
    <stop offset="0" stop-color="#38d0ff" /><stop offset="0.55" stop-color="#3ddc97" /><stop offset="1" stop-color="#ffb35c" />
  </linearGradient></defs>
  <path d="M24 7.5A11 11 0 1 0 24 24.5" fill="none" stroke="url(#cp-logo)" stroke-width="4" stroke-linecap="round" />
  <path d="M16 9c3 4 5 6.5 5 9a5 5 0 0 1-10 0c0-2.5 2-5 5-9z" fill="url(#cp-logo)" />
</svg>`, ii = 86400, Nt = 30.44;
function Fn(r) {
  const e = (p, d = () => !0) => r.components.find((h) => h.type === p && d(h.props || {})), t = [], s = (p, d, h) => t.push({ id: p, key: p, interval_days: d, component: h });
  s("pressure", 91, e("indoor_unit")?.id);
  const i = e("separator", (p) => !!p.filter);
  i && s("filter", 365, i.id);
  const n = e("separator", (p) => !p.filter);
  n && s("separator", 182, n.id);
  const o = e("expansion_vessel");
  o && s("expansion", 365, o.id);
  const a = e("outdoor_unit");
  a && s("outdoor", 182, a.id);
  const l = e("dhw_tank");
  return l && s("anode", 730, l.id), s("service", 365, a?.id), t;
}
function jn(r, e) {
  if (!r.last_done) return { status: "unknown" };
  const t = r.last_done + r.interval_days * ii, s = Math.round((t - e) / ii);
  return { status: s < 0 ? "due" : s <= 30 ? "soon" : "ok", next: t, days: s };
}
const Un = (r) => new Date(r * 1e3).toLocaleDateString(void 0, { day: "2-digit", month: "2-digit", year: "numeric" }), Zn = (r) => {
  const e = new Date(r * 1e3);
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}, ft = class ft extends Y {
  constructor() {
    super(...arguments), this.admin = !0, this._newTitle = "", this._newMonths = 12;
  }
  get _tasks() {
    return this.plant.settings.maintenance?.tasks ?? Fn(this.plant);
  }
  _save(e) {
    const t = structuredClone(this.plant);
    t.settings = { ...t.settings, maintenance: { tasks: e } }, this.dispatchEvent(new CustomEvent("save", { detail: t, bubbles: !0, composed: !0 }));
  }
  _update(e, t) {
    this._save(this._tasks.map((s) => s.id === e ? { ...s, ...t } : s));
  }
  _title(e) {
    return e.title || c(`mt.${e.key}`);
  }
  _done(e) {
    confirm(c("mt.done_confirm", { task: this._title(e) })) && this._update(e.id, { last_done: Math.round(Date.now() / 1e3) });
  }
  _add() {
    const e = this._newTitle.trim();
    if (!e) return;
    const t = `custom_${Date.now().toString(36)}`;
    this._save([...this._tasks, { id: t, title: e, interval_days: Math.round(this._newMonths * Nt) }]), this._newTitle = "";
  }
  _remove(e) {
    confirm(c("mt.remove_confirm", { task: this._title(e) })) && this._save(this._tasks.filter((t) => t.id !== e.id));
  }
  render() {
    const e = Date.now() / 1e3, t = { due: 0, soon: 1, unknown: 2, ok: 3 }, s = [...this._tasks].map((o) => ({ task: o, ...jn(o, e) })).sort((o, a) => t[o.status] - t[a.status] || (o.next ?? 0) - (a.next ?? 0)), i = s.filter((o) => o.status === "due").length, n = s.filter((o) => o.status === "unknown").length;
    return f`<div class="card wrap">
      <div class="row head">
        <h2>${c("mt.title")}</h2>
        ${i ? f`<span class="chip due">${c("mt.n_due", { n: i })}</span>` : v}
        ${n ? f`<span class="chip unknown">${c("mt.n_unknown", { n })}</span>` : v}
        ${!i && !n ? f`<span class="chip ok">${c("mt.all_ok")}</span>` : v}
      </div>
      <p class="muted hint">${c("mt.hint")}</p>
      <ul class="tasks">
        ${s.map(
      ({ task: o, status: a, next: l, days: p }) => f`<li class=${a}>
            <div class="main">
              <div class="t">${this._title(o)}</div>
              ${o.key ? f`<div class="muted small">${c(`mt.${o.key}_how`)}</div>` : v}
              <div class="meta">
                <span class="st ${a}">${a === "unknown" ? c("mt.enter_date") : a === "due" ? c("mt.overdue", { n: -p }) : c("mt.next", { date: Un(l), n: p })}</span>
              </div>
            </div>
            <label class="f">${c("mt.last")}
              <input type="date" .value=${o.last_done ? Zn(o.last_done) : ""} ?disabled=${!this.admin}
                @change=${(d) => {
        const h = d.target.value;
        this._update(o.id, { last_done: h ? Math.round((/* @__PURE__ */ new Date(`${h}T12:00:00`)).getTime() / 1e3) : void 0 });
      }} /></label>
            <label class="f">${c("mt.every")}
              <span class="iv"><input type="number" min="1" max="120" .value=${N(o.interval_days / Nt, 0)} ?disabled=${!this.admin}
                @change=${(d) => this._update(o.id, { interval_days: Math.max(1, Math.round(Number(d.target.value) * Nt)) })} />
                ${c("mt.months")}</span></label>
            <div class="acts">
              <button class="primary" ?disabled=${!this.admin} @click=${() => this._done(o)}>${L("check")} ${c("mt.done")}</button>
              <button class="ghost icon" title=${c("mt.remove")} ?disabled=${!this.admin} @click=${() => this._remove(o)}>${L("trash")}</button>
            </div>
          </li>`
    )}
      </ul>
      ${this.admin ? f`<div class="row add">
            <input placeholder=${c("mt.new")} .value=${this._newTitle} @input=${(o) => this._newTitle = o.target.value}
              @keydown=${(o) => o.key === "Enter" && this._add()} />
            <span class="iv"><input type="number" min="1" max="120" .value=${String(this._newMonths)}
              @change=${(o) => this._newMonths = Number(o.target.value) || 12} /> ${c("mt.months")}</span>
            <button @click=${this._add} ?disabled=${!this._newTitle.trim()}>${L("plus")} ${c("mt.add")}</button>
          </div>` : v}
    </div>`;
  }
};
ft.properties = { plant: { attribute: !1 }, admin: { type: Boolean }, _newTitle: { state: !0 }, _newMonths: { state: !0 } }, ft.styles = [
  se,
  Q`
      .wrap { max-width: 980px; display: grid; gap: 12px; }
      h2 { margin: 0; }
      .head { gap: 12px; align-items: center; }
      .chip { font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 999px; }
      .chip.due { background: color-mix(in srgb, var(--cp-warn) 22%, transparent); color: var(--cp-warn); }
      .chip.unknown { background: var(--cp-chip); color: var(--cp-muted); }
      .hint { font-size: 13px; margin: 0; }
      .chip.ok { background: color-mix(in srgb, #3ddc97 18%, transparent); color: #3ddc97; }
      .tasks { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
      .tasks li { display: grid; grid-template-columns: 1fr auto auto auto; gap: 12px; align-items: center; padding: 12px 14px;
        border: 1px solid var(--cp-border); border-left: 4px solid var(--cp-border); border-radius: 12px; }
      .tasks li.due { border-left-color: var(--cp-warn); }
      .tasks li.soon { border-left-color: #f5c542; }
      .tasks li.ok { border-left-color: #3ddc97; }
      .t { font-weight: 700; }
      .small { font-size: 12px; margin-top: 2px; }
      .meta { margin-top: 4px; font-size: 12px; }
      .st.due { color: var(--cp-warn); font-weight: 700; }
      .st.soon { color: #f5c542; font-weight: 700; }
      .st.ok { color: #3ddc97; }
      .st.unknown { color: var(--cp-muted); }
      .f { display: grid; gap: 4px; font-size: 11px; color: var(--cp-muted); font-weight: 600; }
      .f input[type="date"] { width: 150px; }
      .iv { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: var(--cp-muted); }
      .iv input { width: 64px; }
      .acts { display: flex; gap: 6px; }
      .add { gap: 8px; }
      .add > input { flex: 1; min-width: 180px; }
      @media (max-width: 760px) {
        .tasks li { grid-template-columns: 1fr 1fr; }
        .tasks li .main { grid-column: 1 / -1; }
        .acts { grid-column: 1 / -1; justify-content: flex-end; }
      }
    `
];
let ts = ft;
customElements.get("cp-maintenance") || customElements.define("cp-maintenance", ts);
function ni(r, e) {
  let t = 0, s = r.length - 1;
  if (!(s < 0 || r[0].t > e)) {
    for (; t < s; ) {
      const i = t + s + 1 >> 1;
      r[i].t <= e ? t = i : s = i - 1;
    }
    return r[t];
  }
}
function ri(r, e, t) {
  if (r)
    return r.raw !== void 0 && (r.v === null || !Number.isFinite(r.v)) ? zs(r.raw, e, t) : r.v === null ? { raw: null, num: null, unit: e, entity: t, available: !1 } : { raw: r.raw ?? r.v, num: r.v, unit: e, entity: t, available: !0 };
}
class Es {
  constructor(e, t, s) {
    this.live = e, this.byEntity = /* @__PURE__ */ new Map(), this.bySlot = /* @__PURE__ */ new Map(), this.from = t, this.to = s, this.t = s;
  }
  /** Load the recorded values of the last `hours` hours. */
  static async load(e, t, s, i, n = []) {
    const o = Date.now() / 1e3, a = new Es(t, o - s * 3600, o);
    if (t instanceof Bi && i) {
      const l = new Set(n);
      for (const p of e.components) Object.values(p.bindings || {}).forEach((d) => d && l.add(d));
      for (const p of e.pipes) p.bindings?.temp && l.add(p.bindings.temp);
      if (l.size) {
        const p = await i.callWS({
          type: "history/history_during_period",
          start_time: new Date(a.from * 1e3).toISOString(),
          end_time: new Date(o * 1e3).toISOString(),
          entity_ids: [...l],
          minimal_response: !0,
          no_attributes: !0,
          significant_changes_only: !1
        });
        for (const [d, h] of Object.entries(p)) {
          const u = i.states[d]?.attributes?.unit_of_measurement;
          a.byEntity.set(d, { unit: u, pts: h.map((m) => ({ t: m.lu, v: Number.isFinite(Number(m.s)) ? Number(m.s) : null, raw: String(m.s) })) });
        }
      }
      return a;
    }
    return await Promise.all(
      e.components.flatMap(
        (l) => ce(l).map(async (p) => {
          const d = t.get(l, p.key);
          if (d === void 0) return;
          const h = await t.history(l, p.key, s);
          h.length && a.bySlot.set(`${l.id}.${p.key}`, { pts: h, unit: d.unit });
        })
      )
    ), a;
  }
  /** Earliest recorded time (to limit the slider). */
  get start() {
    let e = this.to;
    for (const t of [this.byEntity, this.bySlot]) for (const s of t.values()) s.pts.length && (e = Math.min(e, s.pts[0].t));
    return Math.max(this.from, e);
  }
  get empty() {
    return this.byEntity.size === 0 && this.bySlot.size === 0;
  }
  entityOf(e, t) {
    return this.live.entityOf(e, t);
  }
  get(e, t) {
    const s = this.live.entityOf(e, t);
    if (s) return this.getEntity(s);
    const i = this.bySlot.get(`${e.id}.${t}`);
    return i ? ri(ni(i.pts, this.t), i.unit) : void 0;
  }
  getEntity(e) {
    const t = this.byEntity.get(e);
    return t ? ri(ni(t.pts, this.t), t.unit, e) : void 0;
  }
  history(e, t, s) {
    return this.live.history(e, t, s);
  }
}
const Gn = 7, Yn = 35, Fi = 4.9;
function dt(r, e, t = "air") {
  const s = e + 273.15 + 3, i = (t === "air" ? r - 6 : 0) + 273.15;
  return Math.max(1.2, Math.min(8, 0.57 * s / Math.max(5, s - i)));
}
function qn(r, e, t = Fi, s = "air") {
  return t * dt(r, e, s) / dt(Gn, Yn, s);
}
function Jn(r) {
  return r >= 0.9 ? "green" : r >= 0.75 ? "yellow" : "red";
}
const we = { green: "#3ddc97", yellow: "#f5c542", red: "#ff5a5f" };
function ji(r, e) {
  const t = r.components.find((_) => _.type === "outdoor_unit"), s = r.components.find((_) => _.type === "indoor_unit");
  if (!t || !s) return;
  const i = (_, g) => {
    const y = e.get(_, g);
    return y?.available && y.num !== null ? y.num : void 0;
  }, n = i(t, "heat_power");
  let o = i(t, "el_power");
  o !== void 0 && e.get(t, "el_power")?.unit === "kW" && (o *= 1e3);
  const a = i(t, "outdoor_temp"), l = i(s, "supply_temp"), p = String(e.get(t, "activity")?.raw ?? "").toLowerCase();
  if (n === void 0 || o === void 0 || a === void 0 || l === void 0 || n < 0.5 || o < 80 || p.includes("defrost") || p.includes("abtau")) return;
  const d = n / (o / 1e3), h = He(t.model).source, u = qn(a, l, Number(t.props.cop_ref) || Fi, h), m = d / u;
  return { cop: d, expected: u, ratio: m, ampel: Jn(m), tOut: a, tFlow: l };
}
function oi(r) {
  return r && r.el > 0.05 ? r.heat / r.el : void 0;
}
const at = { heat: 0, el: 0, heatDhw: 0, elDhw: 0, aux: 0 };
function Ue(r, e) {
  return {
    heat: r.heat + (e.heat || 0),
    el: r.el + (e.el || 0),
    heatDhw: r.heatDhw + (e.heatDhw || 0),
    elDhw: r.elDhw + (e.elDhw || 0),
    aux: r.aux + (e.aux || 0)
  };
}
function ke(r) {
  return new Date(r.getFullYear(), r.getMonth(), r.getDate()).getTime();
}
const Xn = {
  heat: ["heat_energy_total"],
  el: ["el_energy_total"],
  heatDhw: ["heat_energy_dhw"],
  elDhw: ["el_energy_dhw"],
  aux: ["aux_energy_total"]
};
async function Qn(r, e) {
  const t = e.components.find((y) => y.type === "indoor_unit"), s = {};
  for (const [y, w] of Object.entries(Xn)) {
    const b = w.map((x) => t?.bindings[x]).find(Boolean);
    b && (s[y] = b);
  }
  const i = { today: null, yesterday: null, month: null, year: null, daily: [], estimated: { month: !1, year: !1 } };
  if (!s.heat || !s.el) return { ...i, missing: "no_counters" };
  const n = /* @__PURE__ */ new Date(), o = Object.values(s), a = (y, w) => r.callWS({
    type: "recorder/statistics_during_period",
    start_time: y.toISOString(),
    end_time: n.toISOString(),
    statistic_ids: o,
    period: w,
    types: ["change"],
    units: { energy: "kWh" }
  }), [l, p] = await Promise.all([
    a(new Date(ke(n) - 30 * 864e5), "day"),
    a(new Date(n.getFullYear(), 0, 1), "month")
  ]), d = /* @__PURE__ */ new Map();
  for (const [y, w] of Object.entries(s))
    for (const b of l[w] || []) {
      const x = ke(new Date(b.start));
      d.set(x, Ue(d.get(x) || at, { [y]: b.change || 0 }));
    }
  if (!d.size) return { ...i, missing: "no_statistics" };
  const h = [...d.entries()].sort((y, w) => y[0] - w[0]).map(([y, w]) => ({ day: y, ...w })), u = d.get(ke(n)) || null, m = d.get(ke(n) - 864e5) || null;
  let _ = at, g = null;
  for (const [y, w] of Object.entries(s))
    for (const b of p[w] || [])
      _ = Ue(_, { [y]: b.change || 0 }), new Date(b.start).getMonth() === n.getMonth() && (g = Ue(g || at, { [y]: b.change || 0 }));
  return { today: u, yesterday: m, month: g, year: _, daily: h, estimated: { month: !1, year: !1 } };
}
const Ui = [2, 3, 6.5, 10.5, 14.5, 18, 20, 19.5, 15.5, 10.5, 6, 3], ai = 0.8;
function It(r, e, t, s) {
  const i = s ?? Ui[e], n = r.p, o = n.heatLoad / (21 - n.designTemp);
  let a = 0, l = 0;
  for (const h of [-4, -2, 0, 2, 4]) {
    const u = i + h;
    if (u >= 16) continue;
    const m = o * (21 - u) * 24 * t * 0.2 * 0.85, _ = 21 + (21 - u) * ((n.floor ? 35 : 50) - 21) / (21 - n.designTemp);
    a += m, l += m / (dt(u, _, n.source) * ai);
  }
  const p = 8.4 * t * (n.dhwL > 0 ? 1 : 0), d = p / (dt(i, 53, n.source) * ai);
  return { heat: a + p, el: l + d, heatDhw: p, elDhw: d, aux: 0 };
}
function er(r) {
  const e = new Date(r.time * 1e3), t = ke(e), s = r.dailyEnergy(), i = s.find((p) => p.day === t) || null, n = s.find((p) => p.day === t - 864e5) || null, o = It(r, e.getMonth(), e.getDate() - 1 + e.getHours() / 24, r.outdoorMean);
  let a = at;
  for (let p = 0; p < e.getMonth(); p++) a = Ue(a, It(r, p, new Date(e.getFullYear(), p + 1, 0).getDate()));
  a = Ue(a, o);
  const l = [];
  for (let p = 29; p >= 2; p--) {
    const d = t - p * 864e5, h = new Date(d), u = p <= 14 ? (14 - p) / 14 : 0, m = Ui[h.getMonth()] * (1 - u) + r.outdoorMean * u + Math.sin(p * 1.3) * 2, _ = It(r, h.getMonth(), 1, m), g = 1 + Math.sin(p * 1.7) * 0.18;
    l.push({ day: d, ..._, heat: _.heat * g, el: _.el * g * (1 + Math.cos(p) * 0.04) });
  }
  return {
    today: i,
    yesterday: n,
    month: o,
    year: a,
    daily: [...l, ...s.filter((p) => p.day >= t - 864e5)],
    estimated: { month: !0, year: !0 }
  };
}
const Ae = (r, ...e) => r.components.find((t) => e.includes(t.type));
function Zi(r) {
  const e = (s, i) => {
    if (!s) return;
    const n = r.get(s, i);
    return n?.available && n.num !== null && Number.isFinite(n.num) ? n.num : void 0;
  };
  return { num: e, on: (s, i) => {
    const n = e(s, i);
    if (n !== void 0) return n > 0;
    if (!s) return !1;
    const o = String(r.get(s, i)?.raw ?? "").toLowerCase();
    return ["on", "true", "an", "ein", "1", "yes"].includes(o);
  } };
}
const Re = (r) => Math.round(r * 10) / 10;
function tr(r, e) {
  const { num: t, on: s } = Zi(e), i = Ae(r, "outdoor_unit"), n = Ae(r, "indoor_unit"), o = Ae(r, "buffer"), a = Ae(r, "dhw_tank"), l = Ae(r, "radiators", "floor_heating"), p = Ae(r, "tap"), d = r.components.find((H) => H.type === "pump" && H.props.role === "circulation"), h = i ? de(i, e) : /* @__PURE__ */ new Set(), u = n ? de(n, e) : /* @__PURE__ */ new Set(), m = [];
  if (!i && !n) return m;
  const _ = He(i?.model).source === "brine", g = t(i, "outdoor_temp"), y = t(i, "heat_power");
  let w = t(i, "el_power");
  w !== void 0 && i && e.get(i, "el_power")?.unit !== "kW" && (w /= 1e3);
  const b = y !== void 0 && w !== void 0 && w > 0.05 && y > 0.2 ? y / w : void 0, x = t(i, "compressor_speed"), M = t(n, "supply_temp"), P = t(n, "return_temp"), B = t(n, "target_flow_temp") ?? t(l, "target_flow_temp"), j = t(o, "temp_top") ?? t(n, "buffer_temp"), ee = t(a, "temp_top") ?? t(n, "dhw_temp"), A = t(a, "setpoint") ?? t(n, "dhw_setpoint"), C = t(n, "aux_level"), I = t(l, "heating_limit") ?? 16, F = i ? Oe(e.get(i, "activity")) : void 0, O = h.has("running"), W = F === "hot_water" || O && u.has("b"), E = W || s(a, "charging") || u.has("charging"), T = _ ? "ground" : "air", V = h.has("defrost");
  if (h.has("alarm") ? m.push({ id: "alarm", tone: "error", key: "ex.alarm", params: {}, comp: i?.id }) : h.has("defrost") ? m.push({ id: "defrost", tone: "cold", key: "ex.defrost", params: { out: g }, hint: "ex.defrost_hint", comp: i?.id }) : O && W ? m.push({
    id: "dhw",
    tone: "dhw",
    key: ee !== void 0 && A !== void 0 ? "ex.dhw_charge" : "ex.dhw_charge_short",
    params: { dhw: ee, set: A },
    hint: "ex.dhw_charge_hint",
    comp: a?.id ?? n?.id
  }) : O ? m.push({
    id: "heating",
    tone: "heat",
    key: y !== void 0 && w !== void 0 ? `ex.heating_${T}` : `ex.heating_${T}_short`,
    params: { out: g, heat: y !== void 0 ? Re(y) : void 0, el: w !== void 0 ? Re(w) : void 0 },
    comp: i?.id
  }) : g !== void 0 && g >= I ? m.push({ id: "off", tone: "info", key: "ex.off_limit", params: { out: g, limit: I }, comp: i?.id }) : j !== void 0 && B !== void 0 && j >= B - 1 ? m.push({ id: "off", tone: "info", key: "ex.off_buffer", params: { buf: j, target: B }, hint: "ex.off_buffer_hint", comp: o?.id ?? n?.id }) : m.push({ id: "off", tone: "info", key: "ex.off", params: {}, comp: i?.id }), O && !h.has("defrost") && b !== void 0 && m.push({
    id: "cop",
    tone: b >= 3.5 ? "eco" : b >= 2.5 ? "info" : "warn",
    key: "ex.cop",
    params: { cop: Re(b), speed: x },
    hint: x !== void 0 ? "ex.cop_modulating" : void 0,
    comp: i?.id
  }), !W && !V && B !== void 0 && g !== void 0 && g < I && m.push({
    id: "curve",
    tone: "heat",
    key: M !== void 0 ? "ex.curve" : "ex.curve_short",
    params: { out: g, target: B, sup: M },
    hint: "ex.curve_hint",
    comp: n?.id
  }), O && !W && !V && M !== void 0 && P !== void 0) {
    const H = M - P;
    m.push({
      id: "spread",
      tone: H >= 3 && H <= 8 ? "eco" : H >= 2 && H <= 10 ? "info" : "warn",
      key: H < 2 ? "ex.spread_low" : H > 10 ? "ex.spread_high" : "ex.spread_ok",
      params: { spread: Re(H), sup: M, ret: P },
      comp: n?.id
    });
  }
  if (j !== void 0 && (o || be(n)?.id === "tp70")) {
    const H = u.has("pc1") || r.components.some((X) => X.type === "pump" && X.props.circuit === 1 && de(X, e).has("running")), G = O && !W && !V && M !== void 0 && M - j > 2;
    m.push({
      id: "buffer",
      tone: G ? "warn" : "info",
      key: G ? "ex.buffer_mixing" : H ? "ex.buffer_pc1" : "ex.buffer",
      params: { buf: j, loss: M !== void 0 ? Re(M - j) : void 0 },
      comp: o?.id ?? n?.id
    });
  }
  const D = t(l, "room_temp");
  if (l && D !== void 0) {
    const H = t(l, "room_setpoint");
    m.push({
      id: "room",
      tone: H !== void 0 && D < H - 1 ? "warn" : "info",
      key: H !== void 0 ? "ex.room" : "ex.room_short",
      params: { room: D, set: H, name: l.label },
      comp: l.id
    });
  }
  s(a, "disinfecting") ? m.push({ id: "disinfect", tone: "dhw", key: "ex.disinfect", params: {}, comp: a?.id }) : ee !== void 0 && !E && m.push({ id: "dhw_idle", tone: "info", key: A !== void 0 ? "ex.dhw_idle" : "ex.dhw_idle_short", params: { dhw: ee, set: A }, comp: a?.id ?? n?.id }), p && s(p, "flow") && m.push({ id: "tap", tone: "dhw", key: "ex.tap", params: { flow: t(p, "flow") }, comp: p.id }), d && de(d, e).has("running") && m.push({ id: "circ", tone: "info", key: "ex.circ", params: {}, hint: "ex.circ_hint", comp: d.id }), u.has("aux") && m.push({ id: "aux", tone: "warn", key: C !== void 0 ? "ex.aux" : "ex.aux_short", params: { aux: C }, hint: "ex.aux_hint", comp: n?.id });
  const R = n?.props.input_labels || {};
  for (const H of [1, 2, 3, 4]) {
    if (!s(n, `input${H}`)) continue;
    const G = R[`input${H}`] || "", X = /14a|evu|sperr/i.test(G) ? "14a" : /pv|solar|überschuss|surplus/i.test(G) ? "pv" : "other";
    m.push({
      id: `input${H}`,
      tone: X === "pv" ? "eco" : "warn",
      key: `ex.input_${X}`,
      params: { n: H, label: G },
      comp: n?.id
    });
  }
  return m;
}
function sr(r, e) {
  const t = de(r, e), { num: s } = Zi(e);
  switch (r.type) {
    case "outdoor_unit":
      return {
        role: He(r.model).source === "brine" ? "exc.outdoor_brine" : "exc.outdoor",
        state: t.has("defrost") ? "exs.defrost" : t.has("running") ? "exs.compressor_on" : "exs.compressor_off",
        params: { speed: s(r, "compressor_speed") }
      };
    case "indoor_unit":
      return {
        role: `exc.indoor_${be(r)?.id || "wall_e"}`,
        state: t.has("b") && t.has("running") ? "exs.vw1_b" : t.has("running") ? "exs.vw1_a" : void 0,
        params: {}
      };
    case "pump":
      return { role: `exc.pump_${r.props.role === "circulation" ? "circ" : r.props.role === "primary" ? "primary" : "hc"}`, state: t.has("running") ? "exs.running" : "exs.stopped", params: {} };
    case "valve_3way":
      return { role: "exc.valve_3way", state: t.has("b") ? "exs.valve_b" : "exs.valve_a", params: {} };
    case "separator":
      return { role: r.props.filter ? "exc.filter" : "exc.separator", params: {} };
    case "buffer":
    case "dhw_tank":
    case "mixer":
    case "radiators":
    case "floor_heating":
    case "tap":
    case "water_inlet":
    case "expansion_vessel":
      return { role: `exc.${r.type}`, params: {} };
    default:
      return { role: "", params: {} };
  }
}
function li(r) {
  if (!r?.available || r.num === null || !Number.isFinite(r.num)) return;
  const e = (r.unit || "").toLowerCase();
  return e === "kw" ? r.num : e === "mw" ? r.num * 1e3 : r.num / 1e3;
}
const ci = (r, e) => r.components.find((t) => t.type === e);
function ir(r, e) {
  const t = r?.props.input_labels || {};
  let s = !1, i = !1;
  for (const n of [1, 2, 3, 4]) {
    if (!r || !Z(e.get(r, `input${n}`))) continue;
    const o = t[`input${n}`] || "";
    /14a|evu|sperr/i.test(o) ? s = !0 : /pv|solar|überschuss|surplus/i.test(o) && (i = !0);
  }
  return { dim14a: s, pv: i };
}
function nr(r, e) {
  const t = r.settings.energy;
  return !!e || !!(t?.enabled && (t.pv || t.grid || t.battery || t.house || t.wallbox));
}
function rr(r, e, t) {
  const s = r.settings.energy || {}, i = ci(r, "outdoor_unit"), n = ci(r, "indoor_unit"), o = ir(n, e), a = s.limit_14a ?? 4.2, l = !!(s.enabled && (s.pv || s.grid || s.battery || s.house || s.wallbox));
  if (t && !l) {
    const x = t.values.energy;
    return {
      pv: x.pv_power / 1e3,
      grid: x.grid_power / 1e3,
      battery: x.battery_power / 1e3,
      soc: x.battery_soc,
      house: x.house_power / 1e3,
      wallbox: x.wallbox_power / 1e3,
      hp: x.hp_power / 1e3,
      dim14a: o.dim14a,
      pvSignal: o.pv,
      limit14a: a
    };
  }
  const p = (x) => e instanceof Ni ? e.realEntity(x) : e.getEntity(x), d = (x) => x ? li(p(x)) : void 0, h = d(s.pv);
  let u = d(s.grid);
  u !== void 0 && s.grid_invert && (u = -u);
  let m = d(s.battery);
  m !== void 0 && s.battery_invert && (m = -m);
  const _ = s.battery_soc ? p(s.battery_soc) : void 0, g = _?.available && _.num !== null ? _.num : void 0, y = d(s.wallbox), w = i ? li(e.get(i, "el_power")) : void 0;
  let b = d(s.house);
  return b !== void 0 ? !t && s.house_includes_hp !== !1 && w !== void 0 && (b -= w) : u !== void 0 && !t && (b = u + (h ?? 0) + (m ?? 0) - (w ?? 0) - (y ?? 0)), b !== void 0 && (b = Math.max(0, b)), { pv: h, grid: u, battery: m, soc: g, house: b, wallbox: y, hp: w, dim14a: o.dim14a, pvSignal: o.pv, limit14a: a };
}
function or(r) {
  const e = Object.keys(r.states), t = (n) => r.states[n] ? n : void 0, s = (n) => e.find((o) => n.test(o));
  if (t("sensor.evcc_grid_power") || t("sensor.evcc_pv_power"))
    return {
      enabled: !0,
      pv: t("sensor.evcc_pv_power"),
      grid: t("sensor.evcc_grid_power"),
      battery: t("sensor.evcc_battery_power"),
      battery_soc: t("sensor.evcc_battery_soc"),
      house: t("sensor.evcc_home_power"),
      house_includes_hp: !0,
      wallbox: s(/^sensor\.evcc_.+_charge_power$/)
    };
  const i = (n) => s(new RegExp(`^sensor\\.solax.*${n.source}`));
  return s(/^sensor\.solax/) ? {
    enabled: !0,
    pv: i(/pv_power_total$/),
    // SolaX reports export as positive ("measured power") and charging as positive
    grid: i(/measured_power$/),
    grid_invert: !0,
    battery: i(/battery_power_charge$/),
    battery_invert: !0,
    battery_soc: s(/^sensor\.solax_battery_capacity$/),
    house: i(/house_load$/),
    house_includes_hp: !0
  } : { enabled: !0 };
}
const ar = {
  w: 640,
  h: 232,
  bus: 105,
  busX: [40, 540],
  pos: { pv: [80, 42], grid: [290, 42], battery: [500, 42], hp: [80, 168], house: [290, 168], wallbox: [500, 168] }
}, lr = {
  w: 1240,
  h: 118,
  bus: 98,
  busX: [40, 1180],
  pos: { pv: [70, 34], grid: [265, 34], battery: [460, 34], hp: [705, 34], house: [900, 34], wallbox: [1095, 34] }
}, pi = {
  pv: "#ffc93c",
  grid: "#9aa7b4",
  battery: "#3ddc97",
  hp: "#ff8a3d",
  house: "#6cc4ff",
  wallbox: "#b48cff"
}, cr = {
  pv: "M3 18h18l-3-9H6zM9 9l-1 9M15 9l1 9M4.5 13.5h15M12 2v3M5 4l1.5 2M19 4l-1.5 2",
  grid: "M12 2l-6 20M12 2l6 20M8 9h8M7 14h10M5 20h14M12 2v4",
  battery: "M6 6h12v15H6zM10 3h4v3M9 13h6M12 10v6",
  hp: "M4 5h16v14H4zM10 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0M10 12l2-3M10 12l-3 1M10 12l1 3M16 8h2M16 11h2M16 14h2",
  house: "M3 11l9-7l9 7M5 10v10h14V10M10 20v-6h4v6",
  wallbox: "M7 3h10v18H7zM10 8h4M12 12l-2 3h4l-2 3M17 14h2v4a2 2 0 0 0 2 2"
};
function pr(r) {
  const e = Math.abs(r);
  return e > 5 ? 0.6 : e > 2 ? 0.9 : e > 0.5 ? 1.3 : 1.9;
}
const gt = class gt extends Y {
  constructor() {
    super(...arguments), this._wide = !1;
  }
  _node(e, t, s, i) {
    const [n, o] = e.pos[t], a = o < e.bus, l = s === void 0, p = s ?? 0, d = !l && Math.abs(p) >= 0.05, h = pi[t], u = d ? 2.5 + Math.min(6, Math.abs(p) * 0.9) : 2, m = a ? o + 26 : o - 26, _ = a === p > 0, g = c(t === "grid" && d ? p > 0 ? "en.grid_import" : "en.grid_export" : t === "battery" && d ? p > 0 ? "en.bat_discharge" : "en.bat_charge" : `en.${t}`);
    return k`
      <line x1=${n} y1=${m} x2=${n} y2=${e.bus} class="link" style="stroke:${d ? h : "var(--cp-border)"}; stroke-width:${u}" />
      ${d ? k`<line x1=${n} y1=${m} x2=${n} y2=${e.bus} class="dots ${_ ? "down" : "up"}" style="animation-duration:${pr(p)}s" />` : v}
      <g class="node ${l ? "missing" : ""}" transform="translate(${n} ${o})">
        <circle r="25" class="ring" style="stroke:${d ? h : "var(--cp-border)"}" />
        <path d=${cr[t]} transform="translate(-12 -12)" class="glyph" style="stroke:${d ? h : "var(--cp-muted)"}" />
      </g>
      <text x=${n + 36} y=${o - 4} class="lbl">${g}</text>
      <text x=${n + 36} y=${o + 15} class="val">${l ? "–" : N(Math.abs(p), Math.abs(p) < 10 ? 2 : 1)}<tspan class="unit"> kW</tspan></text>
      ${i ? k`<g transform="translate(${n + 36} ${o + 23})">${i}</g>` : v}
    `;
  }
  _badge(e, t) {
    const s = e.length * 6.2 + 18;
    return k`<rect width=${s} height="18" rx="9" class="badge ${t}" /><text x=${s / 2} y="12.5" text-anchor="middle" class="badge-t">${e}</text>`;
  }
  connectedCallback() {
    super.connectedCallback(), this._ro = new ResizeObserver(([e]) => {
      const t = e.contentRect.width > 820;
      t !== this._wide && (this._wide = t, this.requestUpdate());
    }), this._ro.observe(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._ro?.disconnect();
  }
  render() {
    const e = this.flow;
    if (!e) return v;
    const t = this._wide ? lr : ar, s = (e.pv ?? 0) + Math.max(0, e.battery ?? 0), i = (e.house ?? 0) + (e.wallbox ?? 0) + (e.hp ?? 0), n = i > 0.05 && (e.pv !== void 0 || e.battery !== void 0) ? Math.min(1, s / i) : void 0, o = e.soc, a = o !== void 0 ? k`<rect width="44" height="6" rx="3" class="soc-bg" />
            <rect width=${44 * Math.max(0, Math.min(100, o)) / 100} height="6" rx="3" style="fill:${pi.battery}" />
            <text x="50" y="7" class="soc">${Math.round(o)} %</text>` : void 0, l = (p) => p === void 0 ? void 0 : -p;
    return f`<div class="head">
        <b>${c("en.title")}</b>
        ${n !== void 0 ? f`<span class="share">${c("en.share", { pct: Math.round(n * 100) })}</span>` : v}
      </div>
      <svg viewBox="0 0 ${t.w} ${t.h}" class=${this._wide ? "wide" : ""} role="img" aria-label=${c("en.title")}>
        <line x1=${t.busX[0]} y1=${t.bus} x2=${t.busX[1]} y2=${t.bus} class="bus" />
        ${this._node(t, "pv", e.pv, e.pvSignal ? this._badge(c("en.pv_signal"), "eco") : void 0)}
        ${this._node(t, "grid", e.grid)}
        ${this._node(t, "battery", e.battery, a)}
        ${this._node(t, "hp", l(e.hp), e.dim14a ? this._badge(c("en.dimmed", { kw: e.limit14a }), "warn") : void 0)}
        ${this._node(t, "house", l(e.house))}
        ${this._node(t, "wallbox", l(e.wallbox))}
      </svg>`;
  }
};
gt.properties = { flow: { attribute: !1 } }, gt.styles = Q`
    :host { display: block; }
    .head { display: flex; align-items: baseline; gap: 12px; font-size: 14px; padding: 0 2px 2px; }
    .share { font-size: 12px; color: #3ddc97; font-weight: 700; }
    svg { width: 100%; height: auto; display: block; overflow: visible; }
    svg.wide { max-height: 130px; }
    .bus { stroke: var(--cp-muted); stroke-width: 3; stroke-linecap: round; opacity: 0.55; }
    .link { stroke-linecap: round; opacity: 0.55; }
    .dots { stroke: var(--cp-flow, #fff); stroke-width: 3; stroke-linecap: round; stroke-dasharray: 2 13; animation: en-down 1s linear infinite; }
    .dots.up { animation-name: en-up; }
    @keyframes en-down { to { stroke-dashoffset: -15; } }
    @keyframes en-up { to { stroke-dashoffset: 15; } }
    .ring { fill: var(--cp-surface-2); stroke-width: 2.5; }
    .glyph { fill: none; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
    .missing { opacity: 0.45; }
    .lbl { fill: var(--cp-muted); font-size: 11.5px; font-weight: 600; }
    .val { fill: var(--cp-text); font-size: 17px; font-weight: 800; font-variant-numeric: tabular-nums; }
    .unit { fill: var(--cp-muted); font-size: 11px; font-weight: 600; }
    .soc-bg { fill: var(--cp-border); }
    .soc { fill: var(--cp-muted); font-size: 11px; font-weight: 700; }
    .badge { stroke-width: 1; }
    .badge.warn { fill: color-mix(in srgb, var(--cp-warn) 22%, transparent); stroke: var(--cp-warn); }
    .badge.eco { fill: color-mix(in srgb, #3ddc97 20%, transparent); stroke: #3ddc97; }
    .badge-t { fill: var(--cp-text); font-size: 11px; font-weight: 700; }
    @media (prefers-reduced-motion: reduce) { .dots { animation: none; } }
  `;
let ss = gt;
customElements.get("cp-energy") || customElements.define("cp-energy", ss);
const di = {
  heating: "#ff8a3d",
  hot_water: "#ff4f8b",
  defrost: "#6cc4ff",
  compressor_alarm: "#ff4d4d",
  cooling: "#38d0ff",
  off: "#8b949e"
};
function As(r, e, t = 10, s = "casing") {
  return k`<rect class=${s} x="0" y="0" width=${r} height=${e} rx=${t} />
    <rect class="sheen" x="2" y="2" width=${r - 4} height=${Math.min(e * 0.35, 40)} rx=${t - 2} />`;
}
function dr(r) {
  const { w: e, h: t, flags: s, c: i } = r, n = He(i.model);
  if (n.source === "brine") return hr(r);
  const o = s.has("running") && !s.has("defrost"), a = s.has("defrost"), l = s.has("alarm"), p = e * 0.36, d = t * 0.5, h = Math.min(t * 0.38, e * 0.3), u = r.num("fan_speed") ?? (o ? 60 : 0), m = u <= 0 ? 0 : u < 45 ? 2.8 : u < 70 ? 2 : 1.5, _ = l ? "#ff4d4d" : a ? "#6cc4ff" : o ? "#3ddc97" : "#5b6573", g = [0, 120, 240].map(
    (y) => k`<path transform="rotate(${y})" d="M0 0 C ${h * 0.18} ${-h * 0.25}, ${h * 0.55} ${-h * 0.35}, ${h * 0.82} ${-h * 0.12} C ${h * 0.6} ${h * 0.05}, ${h * 0.25} ${h * 0.08}, 0 0 Z" />`
  );
  return k`
    <rect class="foot" x=${e * 0.12} y=${t - 2} width=${e * 0.16} height="6" rx="2" />
    <rect class="foot" x=${e * 0.72} y=${t - 2} width=${e * 0.16} height="6" rx="2" />
    ${As(e, t, 12)}
    <circle class="grille-bg" cx=${p} cy=${d} r=${h + 4} />
    <g transform="translate(${p} ${d})">
      <g class=${m ? "spin fan" : "fan"} style=${m ? `--dur:${m}s` : ""}>${g}<circle r=${h * 0.12} class="hub" /></g>
    </g>
    ${[0.45, 0.72, 1].map((y) => k`<circle class="grille" cx=${p} cy=${d} r=${h * y} />`)}
    <line class="grille" x1=${p - h} y1=${d} x2=${p + h} y2=${d} />
    <line class="grille" x1=${p} y1=${d - h} x2=${p} y2=${d + h} />
    ${[0, 1, 2, 3, 4, 5].map((y) => k`<rect class="vent" x=${e * 0.73} y=${t * 0.22 + y * t * 0.1} width=${e * 0.19} height="3" rx="1.5" />`)}
    <circle cx=${e * 0.9} cy=${t * 0.12} r="4" fill=${_} class=${o || a ? "pulse" : ""} />
    ${n.refrigerant ? k`<text class="tag" x=${e * 0.825} y=${t * 0.9} text-anchor="middle">${n.refrigerant}</text>` : ""}
    ${a ? k`<rect x="2" y="2" width=${e - 4} height=${t - 4} rx="10" class="frost" />
        <g class="pulse" transform="translate(${p} ${d})">${ur(h * 0.55)}</g>` : ""}
    ${l ? k`<rect x="1" y="1" width=${e - 2} height=${t - 2} rx="11" class="alarm-ring" />` : ""}
  `;
}
function hr(r) {
  const { w: e, h: t, flags: s } = r, i = s.has("running");
  return k`
    ${As(e, t * 0.55, 10)}
    <text class="tag" x=${e / 2} y=${t * 0.32} text-anchor="middle">SOLE</text>
    <rect class="ground" x="0" y=${t * 0.62} width=${e} height=${t * 0.38} rx="6" />
    ${[0.2, 0.4, 0.6, 0.8].map(
    (n) => k`<path class=${i ? "probe active" : "probe"} d="M${e * n - 6} ${t * 0.55} V ${t * 0.95} M${e * n + 6} ${t * 0.55} V ${t * 0.95} M${e * n - 6} ${t * 0.95} Q ${e * n} ${t} ${e * n + 6} ${t * 0.95}" />`
  )}
  `;
}
function ur(r) {
  const e = [0, 60, 120].map(
    (t) => k`<g transform="rotate(${t})"><line x1=${-r} y1="0" x2=${r} y2="0" />
      <path d="M${r * 0.6} 0 l ${r * 0.2} ${-r * 0.2} M${r * 0.6} 0 l ${r * 0.2} ${r * 0.2} M${-r * 0.6} 0 l ${-r * 0.2} ${-r * 0.2} M${-r * 0.6} 0 l ${-r * 0.2} ${r * 0.2}" /></g>`
  );
  return k`<g class="snow">${e}</g>`;
}
const S = 20;
function K(r, e, t) {
  const s = r.map(([i, n], o) => `${o ? "L" : "M"} ${i * S} ${n * S}`).join(" ");
  return k`<path class="ipipe" d=${s} style="stroke:${e}" />
    ${t ? k`<path class="ipipe-flow" d=${s} />` : v}`;
}
function Ne([r, e], t, s = "l", i = "PC0") {
  const n = 0.55 * S, o = { r: 0, d: 90, l: 180, u: 270 }[s];
  return k`<g transform="translate(${r * S} ${e * S})">
    ${t ? k`<circle class="pump-glow pulse" r=${n + 4} />` : v}
    <circle class=${t ? "pump-body on" : "pump-body"} r=${n} />
    <path class=${t ? "pump-tri on" : "pump-tri"} transform="rotate(${o})" d="M ${-n * 0.5} ${-n * 0.8} L ${n} 0 L ${-n * 0.5} ${n * 0.8} Z" />
    <circle class=${t ? "impeller spin" : "impeller"} style="--dur:0.9s" r=${n * 0.36} />
    <text class="itag halo" y=${n + 9} text-anchor="middle">${i}</text>
  </g>`;
}
function et([r, e], t, s = "VW1", i = !1) {
  const n = 0.5 * S;
  return k`<g transform="translate(${r * S} ${e * S})">
    <path class="valve-tri on" d="M ${-n} ${-n * 0.6} L 0 0 L ${-n} ${n * 0.6} Z" transform="rotate(-90)" />
    <path class=${t ? "valve-tri" : "valve-tri on"} d="M ${n} ${-n * 0.6} L 0 0 L ${n} ${n * 0.6} Z" />
    <path class=${t ? "valve-tri on" : "valve-tri"} d="M ${-n} ${-n * 0.6} L 0 0 L ${-n} ${n * 0.6} Z" />
    ${i ? k`<text class="itag" x=${-n - 3} y=${-n * 0.4} text-anchor="end">${s} ${t ? "B" : "A"}</text>` : k`<text class="itag" x=${n + 3} y=${-n} >${s} ${t ? "B" : "A"}</text>`}
  </g>`;
}
function tt([r, e], t, s) {
  return k`<g transform="translate(${r * S} ${e * S})">
    ${s ? k`<rect class="aux-glow pulse" x=${-0.55 * S} y="-6" width=${1.1 * S} height=${t * S + 12} rx="10" />` : v}
    <rect class=${s ? "rod hot" : "rod"} x=${-0.35 * S} y="0" width=${0.7 * S} height=${t * S} rx="6" />
    <path class=${s ? "coil hot" : "coil"} d=${mr(0, 6, t * S - 12, 4, 8)} />
  </g>`;
}
function mr(r, e, t, s, i) {
  const n = t / i;
  let o = `M${r} ${e}`;
  for (let a = 1; a <= i; a++) o += ` L${r + (a % 2 ? -s : s)} ${e + a * n}`;
  return o;
}
function st(r, e, t, s) {
  const i = [...r.flags].find((o) => o.startsWith("mode_"))?.slice(5), n = di[i || "off"] || di.off;
  return k`<rect class="screen" x=${e} y=${t} width=${s} height="18" rx="4" />
    <rect x=${e + 4} y=${t + 4} width="14" height="10" rx="2" fill=${n} class=${i && i !== "off" ? "pulse" : ""} />
    <text class="screen-text" x=${e + 24} y=${t + 13}>${i ? c(`mode.${i}`) : ""}</text>`;
}
function fr(r, e) {
  const { w: t, h: s, flags: i, c: n } = r, o = i.has("running"), a = i.has("b"), l = i.has("aux"), p = i.has("pc1"), d = te(r.num("supply_temp"), "#ff7a45"), h = te(r.num("return_temp"), "#4d9fff"), u = (n.model || "").match(/w[ls]w\d{3}i/i)?.[0]?.toUpperCase().replace("I", "i") || "";
  let m;
  if (e === "t180") {
    const _ = te(r.num("dhw_temp"), "#ff4f8b");
    m = k`
      <rect class="tank-in" x=${0.6 * S} y=${10 * S} width=${6.8 * S} height=${11.2 * S} rx=${S} style="fill:${_}" />
      <path class=${o && a ? "tank-coil hot" : "tank-coil"} d=${gr(2.4, 14, 5.6, 19.6)} />
      ${st(r, 1.6 * S, 0.8 * S, 4.6 * S)}
      ${K([[6, 0], [6, 6.2], [4.6, 6.2]], d, o)}
      ${K([[4.6, 6.2], [3, 6.2], [3, 0]], d, o && !a)}
      ${K([[4.6, 6.2], [4.6, 14]], d, o && a)}
      ${K([[2.4, 19.6], [1.6, 19.6], [1.6, 7.6]], h, o && a)}
      ${K([[1, 0], [1, 7.6]], h, o && !a)}
      ${K([[1, 7.6], [7, 7.6], [7, 0]], h, o)}
      ${K([[4, 10.2], [4, 0]], _, i.has("flowing"))}
      ${K([[5, 0], [5, 3], [5.6, 3], [5.6, 20.6]], "#38d0ff", i.has("flowing"))}
      ${tt([6, 1.4], 4, l)}
      ${et([4.6, 6.2], a)}
      ${Ne([4.2, 7.6], o, "r")}
      ${k`<g transform="translate(${3 * S} ${3.4 * S})"><circle class=${p ? "pump-body on" : "pump-body"} r="8" /><text class="itag" x="12" y="4">PC1</text></g>`}`;
  } else if (e === "tp70") {
    const _ = te(r.num("buffer_temp"), "#ff9f45");
    m = k`
      <rect class="tank-in" x=${0.6 * S} y=${9.4 * S} width=${7.8 * S} height=${4.2 * S} rx=${S} style="fill:${_}" />
      <text class="tank-label" x=${4.5 * S} y=${13 * S} text-anchor="middle">${n.props.buffer_l || 70} l</text>
      ${st(r, 0.6 * S, 14.2 * S, 4.4 * S)}
      ${K([[3, 0], [3, 1.2]], _, !1)}
      ${K([[4, 0], [4, 1.2]], h, !1)}
      ${K([[2, 0], [2, 12.6]], h, p)}
      ${K([[1, 9.4], [1, 0]], _, p)}
      ${K([[6, 9.4], [6, 8]], h, o && !a)}
      ${K([[8, 0], [8, 8], [6, 8]], h, o && a)}
      ${K([[6, 8], [6, 0]], h, o)}
      ${K([[5, 0], [5, 6.4]], d, o)}
      ${K([[5, 6.4], [5, 9.4]], d, o && !a)}
      ${K([[5, 6.4], [7, 6.4], [7, 0]], d, o && a)}
      ${tt([5, 1.6], 2.8, l)}
      ${et([5, 6.4], a, "VW1", !0)}
      ${Ne([6, 3.4], o, "u")}
      ${Ne([1, 5], p, "u", "PC1")}`;
  } else e === "brine" ? m = k`
      ${st(r, 1.6 * S, 0.8 * S, 4.6 * S)}
      <circle class="compressor" cx=${2.2 * S} cy=${8.5 * S} r=${1.2 * S} />
      <text class="itag" x=${2.2 * S} y=${10.4 * S} text-anchor="middle">Verdichter</text>
      ${K([[1, 0], [1, 6], [2.2, 6], [2.2, 7.3]], "#38d0ff", o)}
      ${K([[2.2, 9.7], [2.2, 11.5], [2, 11.5], [2, 0]], "#2b6cff", o)}
      ${K([[4, 9], [4, 4], [5.5, 4], [5.5, 9]], d, o)}
      ${K([[5.5, 9], [7, 9], [7, 0]], d, o && !a)}
      ${K([[5.5, 9], [5.5, 10.4], [4, 10.4], [4, 0]], d, o && a)}
      ${K([[6, 0], [6, 11.6], [4, 11.6], [4, 9]], h, o && !a)}
      ${K([[5, 0], [5, 3.4]], h, o && a)}
      ${tt([4, 3], 3, l)}
      ${et([5.5, 9], a)}
      ${Ne([5.5, 11.6], o, "l")}` : m = k`
      ${st(r, 2 * S, 0.8 * S, 6 * S)}
      ${K([[3, 14], [3, 9.6], [4.3, 9.6], [4.3, 2.8], [7.6, 2.8], [7.6, 10.6]], d, o)}
      ${K([[7.6, 10.6], [9, 10.6], [9, 14]], d, o && !a)}
      ${K([[7.6, 10.6], [7.6, 11.6], [5, 11.6], [5, 14]], d, o && a)}
      ${K([[8, 14], [8, 12.8], [6, 12.8]], h, o && !a)}
      ${K([[6, 14], [6, 12.8]], h, o && a)}
      ${K([[6, 12.8], [2, 12.8], [2, 14]], h, o)}
      ${tt([4.3, 3.4], 5.4, l)}
      ${et([7.6, 10.6], a)}
      ${Ne([4.3, 12.8], o, "l")}`;
  return k`
    ${As(t, s, 10, "casing light")}
    ${m}
    ${e === "wall_e" || e === "tp70" ? v : k`<text class="tag" x=${t / 2} y=${2.4 * S} text-anchor="middle">${u}</text>`}
  `;
}
function gr(r, e, t, s) {
  const n = (s - e) / 5;
  let o = `M ${t * S} ${e * S - 2 * S}`;
  o += ` L ${t * S} ${e * S}`;
  for (let a = 0; a < 5; a++) {
    const l = (e + a * n) * S;
    o += ` C ${(r - 0.3) * S} ${l}, ${(r - 0.3) * S} ${l + n / 2 * S}, ${t * S} ${l + n / 2 * S}`, o += ` C ${(t + 0.3) * S} ${l + n / 2 * S}, ${(t + 0.3) * S} ${l + n * S}, ${r * S} ${l + n * S}`;
  }
  return o;
}
function hi(r, e) {
  const { w: t, h: s, c: i, flags: n } = r, o = r.num("temp_top"), a = r.num("temp_bottom") ?? (o !== void 0 ? o - 6 : void 0), l = r.num("temp_mid") ?? (o !== void 0 && a !== void 0 ? (o + a) / 2 : void 0), p = `tg-${i.id}`, d = e === "dhw" ? "#ff4f8b" : "#ff7a45", h = n.has("charging"), u = i.props.volume ? `${i.props.volume} l` : "", m = Math.min(t / 2, 2 * S);
  return k`
    <defs>
      <linearGradient id=${p} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.05" stop-color=${te(o, d)} />
        <stop offset="0.5" stop-color=${te(l, "#c084fc")} />
        <stop offset="0.95" stop-color=${te(a, "#4d9fff")} />
      </linearGradient>
    </defs>
    <rect class="insulation" x="-3" y="-3" width=${t + 6} height=${s + 6} rx=${m + 3} />
    <rect x="0" y="0" width=${t} height=${s} rx=${m} fill="url(#${p})" class="tank-fill" />
    <rect class="tank-glass" x=${t * 0.1} y=${s * 0.06} width=${t * 0.12} height=${s * 0.88} rx=${t * 0.06} />
    ${e === "dhw" ? k`<path class=${h ? "tank-coil hot" : "tank-coil"} d=${_r(t)} />
        <path class="dip" d="M 0 ${10 * S} H ${0.8 * S} V ${s - 0.4 * S}" />` : k`
        <path class="dip" d="M ${2 * S} 0 V ${s - 0.5 * S}" />
        <path class="dip" d="M ${3 * S} 0 V ${s - 0.5 * S}" />
        ${[0.3, 0.55, 0.8].map((_) => k`<line class="strat" x1=${t * 0.62} x2=${t * 0.9} y1=${s * _} y2=${s * _} />`)}`}
    <text class="tank-label" x=${t / 2} y=${s * (e === "dhw" ? 0.3 : 0.5)} text-anchor="middle">${u}</text>
    ${n.has("disinfecting") ? k`<text class="tank-badge" x=${t / 2} y=${s * 0.18} text-anchor="middle">60°</text>` : ""}
  `;
}
function _r(r) {
  const e = r, t = r * 0.78, s = r * 0.3, i = 4 * S, n = 9 * S, o = 5, a = (n - i) / o;
  let l = `M ${e} ${i} H ${t}`;
  for (let p = 0; p < o; p++) {
    const d = i + p * a;
    l += ` C ${s - 6} ${d}, ${s - 6} ${d + a / 2}, ${t} ${d + a / 2} C ${t + 6} ${d + a / 2}, ${t + 6} ${d + a}, ${t} ${d + a}`;
  }
  return `${l} H ${e}`;
}
function vr(r) {
  const { w: e, h: t, flags: s } = r, i = s.has("running"), n = Math.min(e, t) / 2 - 2, o = e / 2, a = t / 2;
  return k`
    ${i ? k`<circle class="pump-glow pulse" cx=${o} cy=${a} r=${n + 5} />` : ""}
    <circle class=${i ? "pump-body on" : "pump-body"} cx=${o} cy=${a} r=${n} />
    <path class=${i ? "pump-tri on" : "pump-tri"} d="M ${o - n * 0.5} ${a - n * 0.82} L ${o + n} ${a} L ${o - n * 0.5} ${a + n * 0.82} Z" />
    <g transform="translate(${o} ${a})">
      <circle class=${i ? "impeller spin" : "impeller"} style="--dur:0.9s" r=${n * 0.38} />
    </g>
  `;
}
function ui(r, e = !1) {
  const { w: t, h: s, flags: i } = r, n = t / 2, o = s / 2, a = Math.min(t, s) / 2 - 2, l = i.has("b"), p = (d) => e || d ? "valve-tri on" : "valve-tri";
  return k`
    <rect class="actuator" x=${n - a * 0.35} y=${o - a * 1.25} width=${a * 0.7} height=${a * 0.45} rx="2" />
    <line class="stem" x1=${n} y1=${o - a * 0.8} x2=${n} y2=${o} />
    <path class=${p(!0)} d="M ${n - a} ${o - a * 0.6} L ${n} ${o} L ${n - a} ${o + a * 0.6} Z" />
    <path class=${p(!l)} d="M ${n + a} ${o - a * 0.6} L ${n} ${o} L ${n + a} ${o + a * 0.6} Z" />
    <path class=${p(l)} d="M ${n - a * 0.6} ${o + a} L ${n} ${o} L ${n + a * 0.6} ${o + a} Z" />
    ${e ? "" : k`<text class="valve-tag" x=${n + a * 0.5} y=${o - a * 0.75}>${l ? "B" : "A"}</text>`}
  `;
}
function wr(r) {
  const { w: e, h: t } = r, s = r.num("flow_temp"), i = r.num("return_temp"), n = r.num("room_temp"), o = s !== void 0 && n !== void 0 ? s - n > 6 : !1, a = 9, l = 0.45 * S, p = t - 0.45 * S, d = (e - 20) / a, h = `rg-${r.c.id}`;
  return k`
    <defs><linearGradient id=${h} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color=${te(s, "#8b949e")} stop-opacity=${o ? 0.85 : 0.25} />
      <stop offset="1" stop-color=${te(i, "#8b949e")} stop-opacity=${o ? 0.6 : 0.2} />
    </linearGradient></defs>
    ${o ? [0.3, 0.55, 0.8].map(
    (u, m) => k`<path class="heat-wave" style="animation-delay:${m * 0.6}s" d="M ${e * u} ${l - 4} q 5 -6 0 -12 q -5 -6 0 -12" />`
  ) : ""}
    <rect class="rad-frame" x="0" y=${l} width=${e - 4} height=${p - l} rx="6" />
    <rect class="rad-header" x="0" y=${S - 4} width=${e - 4} height="8" rx="4" />
    <rect class="rad-header" x="0" y=${5 * S - 4} width=${e - 4} height="8" rx="4" />
    ${Array.from({ length: a }, (u, m) => k`<rect x=${12 + m * d} y=${l + 6} width=${d - 3} height=${p - l - 12} rx=${(d - 3) / 2} fill="url(#${h})" class="fin" />`)}
  `;
}
function br(r) {
  const { w: e, h: t } = r, s = r.num("flow_temp"), i = te(s, "#8b949e");
  let n = `M 10 ${t * 0.25}`;
  const o = 5;
  for (let a = 0; a < o; a++)
    n += a % 2 === 0 ? ` H ${e - 12} q 6 0 6 ${t * 0.3 / o} q 0 ${t * 0.3 / o} -6 ${t * 0.3 / o}` : ` H 16 q -6 0 -6 ${t * 0.3 / o} q 0 ${t * 0.3 / o} 6 ${t * 0.3 / o}`;
  return k`
    <rect class="floor-slab" x="2" y=${t * 0.15} width=${e - 4} height=${t * 0.75} rx="6" />
    <path d=${n} fill="none" stroke=${i} stroke-width="3" stroke-linecap="round" opacity="0.9" />
  `;
}
function yr(r) {
  const { w: e, h: t, flags: s } = r, i = s.has("flowing");
  return k`
    <path class="tap-body" d="M ${e} ${t * 0.25} H ${e * 0.45} a ${e * 0.25} ${e * 0.25} 0 0 0 ${-e * 0.25} ${e * 0.25} V ${t * 0.62} h ${e * 0.16} V ${t * 0.52} a ${e * 0.1} ${e * 0.1} 0 0 1 ${e * 0.1} ${-e * 0.1} H ${e} Z" />
    <rect class="tap-handle" x=${e * 0.46} y=${t * 0.06} width=${e * 0.26} height=${t * 0.12} rx="3" />
    ${i ? [0, 1, 2].map((n) => k`<circle class="drop" style="animation-delay:${n * 0.25}s" cx=${e * 0.28} cy=${t * 0.7} r="2.5" />`) : ""}
  `;
}
function xr(r) {
  const { w: e, h: t } = r;
  return k`
    <rect class="casing" x="0" y=${t * 0.2} width=${e} height=${t * 0.6} rx="5" />
    <text class="tag" x=${e * 0.45} y=${t * 0.62} text-anchor="middle">KW</text>
  `;
}
function $r(r) {
  const { w: e, h: t, c: s } = r;
  return s.props.filter ? k`
      <rect class="casing" x=${e * 0.15} y=${t * 0.1} width=${e * 0.7} height=${t * 0.8} rx="5" />
      ${[0.3, 0.45, 0.6, 0.75].map((i) => k`<line class="sieve" x1=${e * 0.25} x2=${e * 0.75} y1=${t * i} y2=${t * i} />`)}
      ${[0.35, 0.5, 0.65].map((i) => k`<line class="sieve" x1=${e * i} x2=${e * i} y1=${t * 0.22} y2=${t * 0.8} />`)}` : k`
    <rect class="casing" x=${e * 0.2} y="0" width=${e * 0.6} height=${t} rx=${e * 0.3} />
    <path class="magnet" d="M ${e * 0.38} ${t * 0.3} v ${t * 0.25} a ${e * 0.12} ${e * 0.12} 0 0 0 ${e * 0.24} 0 v ${-t * 0.25}" />
  `;
}
function kr(r) {
  const { w: e, h: t } = r;
  return k`
    <line class="stem" x1=${e / 2} y1=${t * 0.8} x2=${e / 2} y2=${t} />
    <rect class="vessel" x="0" y="0" width=${e} height=${t * 0.82} rx=${e / 2} />
    <rect class="sheen" x=${e * 0.18} y=${t * 0.08} width=${e * 0.2} height=${t * 0.6} rx=${e * 0.1} />
  `;
}
function Sr(r) {
  switch (r.c.type) {
    case "outdoor_unit":
      return dr(r);
    case "indoor_unit":
      return fr(r, be(r.c)?.id || "wall_e");
    case "buffer":
      return hi(r, "buffer");
    case "dhw_tank":
      return hi(r, "dhw");
    case "pump":
      return vr(r);
    case "valve_3way":
      return ui(r);
    case "mixer":
      return ui(r, !0);
    case "radiators":
      return wr(r);
    case "floor_heating":
      return br(r);
    case "tap":
      return yr(r);
    case "water_inlet":
      return xr(r);
    case "separator":
      return $r(r);
    case "expansion_vessel":
      return kr(r);
    case "junction":
      return k`<circle class="junction" r="4" />`;
    default:
      return k``;
  }
}
const mi = 1, it = { l: { x: -1, y: 0 }, r: { x: 1, y: 0 }, t: { x: 0, y: -1 }, b: { x: 0, y: 1 } };
function Kt(r) {
  return r === "l" || r === "r";
}
function Gi(r, e) {
  const t = e.get(r.from.c), s = e.get(r.to.c);
  if (!t || !s) return null;
  const i = pe(t, r.from.p), n = pe(s, r.to.p);
  if (!i || !n) return null;
  const o = t.type === "junction" ? 0 : mi, a = s.type === "junction" ? 0 : mi, l = { x: i.x, y: i.y }, p = { x: n.x, y: n.y }, d = { x: l.x + it[i.dir].x * o, y: l.y + it[i.dir].y * o }, h = { x: p.x + it[n.dir].x * a, y: p.y + it[n.dir].y * a }, u = Kt(i.dir), m = [l, d];
  if (r.via?.length) {
    let _ = !u;
    for (const [g, y] of [...r.via, [h.x, h.y]]) {
      const w = m[m.length - 1];
      if (w.x !== g && w.y !== y) {
        const x = _ ? { x: w.x, y } : { x: g, y: w.y };
        m.push(x);
      }
      _ = m[m.length - 1].x === g, m.push({ x: g, y });
    }
    return m.push(p), { pts: fi(m), horizontalStart: u };
  }
  if (u)
    if (d.y === h.y && r.bend === void 0)
      m.push(h);
    else {
      const _ = r.bend ?? (d.x + h.x) / 2;
      Kt(n.dir) ? m.push({ x: _, y: d.y }, { x: _, y: h.y }) : r.bend === void 0 ? m.push({ x: h.x, y: d.y }) : m.push({ x: _, y: d.y }, { x: _, y: h.y }), m.push(h);
    }
  else if (d.x === h.x && r.bend === void 0)
    m.push(h);
  else {
    const _ = r.bend ?? (d.y + h.y) / 2;
    Kt(n.dir) ? r.bend === void 0 ? m.push({ x: d.x, y: h.y }) : m.push({ x: d.x, y: _ }, { x: h.x, y: _ }) : m.push({ x: d.x, y: _ }, { x: h.x, y: _ }), m.push(h);
  }
  return m.push(p), { pts: fi(m), horizontalStart: u };
}
function fi(r) {
  const e = [];
  for (const t of r) {
    const s = e[e.length - 1];
    if (!(s && s.x === t.x && s.y === t.y)) {
      if (e.length >= 2) {
        const i = e[e.length - 2];
        if (i.x === s.x && s.x === t.x || i.y === s.y && s.y === t.y) {
          e[e.length - 1] = t;
          continue;
        }
      }
      e.push(t);
    }
  }
  return e;
}
function Mr(r, e = 8) {
  if (r.length === 0) return "";
  const t = r.map((n) => ({ x: n.x * z, y: n.y * z }));
  let s = `M ${t[0].x} ${t[0].y}`;
  for (let n = 1; n < t.length - 1; n++) {
    const o = t[n - 1], a = t[n], l = t[n + 1], p = Math.hypot(a.x - o.x, a.y - o.y), d = Math.hypot(l.x - a.x, l.y - a.y), h = Math.min(e, p / 2, d / 2), u = a.x - (a.x - o.x) / p * h, m = a.y - (a.y - o.y) / p * h, _ = a.x + (l.x - a.x) / d * h, g = a.y + (l.y - a.y) / d * h;
    s += ` L ${u} ${m} Q ${a.x} ${a.y} ${_} ${g}`;
  }
  const i = t[t.length - 1];
  return `${s} L ${i.x} ${i.y}`;
}
function zr(r, e) {
  for (let t = 2; t < r.length - 1; t++) {
    const s = r[t - 1], i = r[t], n = s.x === i.x;
    if (e ? n : !n) return { x: (s.x + i.x) / 2, y: (s.y + i.y) / 2 };
  }
  return null;
}
const me = 18, Er = 16, Ar = 10, Ft = 8;
function Wr(r, e, t) {
  if (r.icon) return null;
  switch (r.type) {
    case "outdoor_unit":
      return He(r.model).source === "brine" ? { x: 0, y: 0, w: e, h: t * 0.55, r: 10 } : { x: 0, y: 0, w: e, h: t, r: 12 };
    case "indoor_unit":
      return { x: 0, y: 0, w: e, h: t, r: 10 };
    case "buffer":
    case "dhw_tank": {
      const s = Math.min(e / 2, 2 * z);
      return { x: -3, y: -3, w: e + 6, h: t + 6, r: s + 3 };
    }
    case "pump": {
      const s = Math.min(e, t) / 2 - 2;
      return { x: e / 2 - s, y: t / 2 - s, w: 2 * s, h: 2 * s, r: s };
    }
    case "radiators":
      return { x: 0, y: 0.45 * z, w: e - 4, h: t - 0.9 * z, r: 6 };
    case "floor_heating":
      return { x: 2, y: t * 0.15, w: e - 4, h: t * 0.75, r: 6 };
    case "water_inlet":
      return { x: 0, y: t * 0.2, w: e, h: t * 0.6, r: 5 };
    case "separator":
      return r.props.filter ? { x: e * 0.15, y: t * 0.1, w: e * 0.7, h: t * 0.8, r: 5 } : { x: e * 0.2, y: 0, w: e * 0.6, h: t, r: e * 0.3 };
    case "expansion_vessel":
      return { x: 0, y: 0, w: e, h: t * 0.82, r: e / 2 };
    case "value_tile":
      return { x: 0, y: 0, w: e, h: t, r: 10 };
    default:
      return null;
  }
}
const oe = 88, re = 34, ne = 6;
function jt(r, e = 17) {
  return r.length > e ? `${r.slice(0, e - 1)}…` : r;
}
const _t = class _t extends Y {
  constructor() {
    super(...arguments), this.icons = /* @__PURE__ */ new Map(), this.edit = !1, this.autoHeight = !1, this.selected = null, this.version = 0, this._view = null, this._drag = null, this._connect = null, this._pointers = /* @__PURE__ */ new Map(), this._gesture = null, this._segments = [], this._pills = [], this._lastMoved = !1, this._structureKey = "", this._onKey = (e) => {
      e.key === "Escape" && this._connect && (this._connect = null);
    };
  }
  /** Does any pipe pass through the given pixel rectangle (with a small margin)? */
  _hitsPipe(e, t, s, i) {
    return this._segments.some((o) => o.x1 <= s + 5 && o.x2 >= e - 5 && o.y1 <= i + 5 && o.y2 >= t - 5);
  }
  connectedCallback() {
    super.connectedCallback(), this._resizeObs = new ResizeObserver(() => this.requestUpdate()), this._resizeObs.observe(this), window.addEventListener("keydown", this._onKey);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._resizeObs?.disconnect(), window.removeEventListener("keydown", this._onKey);
  }
  willUpdate(e) {
    if (e.has("plant") && this.plant) {
      const t = `${this.plant.components.length}:${this.plant.grid.w}x${this.plant.grid.h}`;
      (t !== this._structureKey || !this._view) && (this._structureKey = t, (!this.edit || !this._view) && (this._view = null));
    }
  }
  updated() {
    if (!this.autoHeight || !this.plant) return;
    const e = this._contentBox(), t = this.getBoundingClientRect().width, s = Math.round(Math.max(240, Math.min(window.innerHeight * 0.75, t * e.h / e.w)));
    this.style.height !== `${s}px` && (this.style.height = `${s}px`);
  }
  /** Fit view to content. */
  fit() {
    this._view = null, this.requestUpdate();
  }
  zoom(e) {
    const t = this._view || this._contentBox(), s = t.x + t.w / 2, i = t.y + t.h / 2;
    this._view = { x: s - t.w * e / 2, y: i - t.h * e / 2, w: t.w * e, h: t.h * e };
  }
  // ------------------------------------------------------------- layout
  _comp(e) {
    return this._drag && this._drag.id === e.id ? { ...e, x: this._drag.dx, y: this._drag.dy } : e;
  }
  _shownSlots(e) {
    const t = e.show ?? ce(e).filter((s) => s.show).map((s) => s.key);
    return this.edit ? [] : t.filter((s) => this.src.get(e, s) !== void 0);
  }
  /** Slots shown in the component's value list (not anchored to a pipe or a measuring point). */
  _listSlots(e) {
    const t = new Set(Js(e).filter((s) => s.at || s.pos).map((s) => s.key));
    return this._shownSlots(e).filter((s) => !t.has(s));
  }
  _badgeLayout(e) {
    const t = qs(e);
    if (t === "none" || t === "inside") return [];
    const s = this._listSlots(e);
    if (!s.length) return [];
    const { w: i, h: n } = le(e), o = e.x * z, a = e.y * z, l = i * z, p = n * z, d = [];
    if (t === "tank") {
      const h = { temp_top: 0.16, temp_mid: 0.48, temp_bottom: 0.8 }, u = [];
      for (const w of s)
        w in h ? d.push({ slot: w, x: o + 5, y: a + p * h[w] - 11, w: l - 10 }) : u.push(w);
      const _ = u.length * (re + ne), g = [
        { x: o + l / 2 - oe / 2, y: a + p + 26, dy: re + ne },
        { x: o + l + 12, y: a + p * 0.35, dy: re + ne },
        { x: o - 12 - oe, y: a + p * 0.35, dy: re + ne }
      ], y = g.find((w) => !this._hitsPipe(w.x, w.y, w.x + oe, w.y + _)) || g[0];
      return u.forEach((w, b) => d.push({ slot: w, x: y.x, y: y.y + b * y.dy })), d;
    }
    if (t === "right")
      s.forEach((h, u) => d.push({ slot: h, x: o + l + 12, y: a + 4 + u * (re + ne) }));
    else if (t === "left")
      s.forEach((h, u) => d.push({ slot: h, x: o - 12 - oe, y: a + 4 + u * (re + ne) }));
    else if (t === "above") {
      const h = ce(e).map((_) => _.key);
      s.sort((_, g) => h.indexOf(_) - h.indexOf(g));
      const u = Math.min(3, s.length) * (oe + ne) - ne, m = o + l / 2 - u / 2;
      s.forEach(
        (_, g) => d.push({ slot: _, x: m + g % 3 * (oe + ne), y: a - re - 10 - Math.floor(g / 3) * (re + ne) })
      );
    } else {
      const h = Math.max(2, Math.floor((l + 40) / (oe + ne))), u = Math.ceil(s.length / h);
      s.forEach((m, _) => {
        const g = Math.floor(_ / h), w = (g === u - 1 ? s.length - g * h : h) * (oe + ne) - ne;
        d.push({
          slot: m,
          x: o + l / 2 - w / 2 + _ % h * (oe + ne),
          y: a + p + 26 + g * (re + ne)
        });
      });
    }
    return d;
  }
  _contentBox() {
    let e = 1 / 0, t = 1 / 0, s = -1 / 0, i = -1 / 0;
    const n = (a, l) => {
      e = Math.min(e, a), t = Math.min(t, l), s = Math.max(s, a), i = Math.max(i, l);
    };
    for (const a of this.plant.components) {
      const { w: l, h: p } = le(a);
      n(a.x * z - 6, a.y * z - 6), n((a.x + l) * z + 6, (a.y + p) * z + 22);
      for (const d of this._badgeLayout(a))
        n(d.x, d.y), n(d.x + oe, d.y + re);
    }
    for (const a of this._pills)
      n(a.x, a.y), n(a.x + a.w, a.y + me);
    (this.edit || !Number.isFinite(e)) && (n(0, 0), n(this.plant.grid.w * z, this.plant.grid.h * z));
    const o = 24;
    return { x: e - o, y: t - o, w: s - e + 2 * o, h: i - t + 2 * o };
  }
  // -------------------------------------------------------------- render
  render() {
    if (!this.plant) return v;
    const e = this._view || this._contentBox(), t = new Map(this.plant.components.map((o) => [o.id, this._comp(o)])), s = new Map(this.plant.components.map((o) => [o.id, de(o, this.src)])), i = Pn(this.plant, this.src), n = this.plant.pipes.map((o) => ({ pipe: o, route: Gi(o, t) }));
    return this._segments = n.flatMap(
      ({ route: o }) => (o?.pts || []).slice(1).map((a, l) => {
        const p = o.pts[l];
        return { x1: Math.min(p.x, a.x) * z, x2: Math.max(p.x, a.x) * z, y1: Math.min(p.y, a.y) * z, y2: Math.max(p.y, a.y) * z };
      })
    ), this._pills = this.edit ? [] : this._placePills(t, n), f`
      <svg
        class=${this.edit ? "edit" : ""}
        viewBox="${e.x} ${e.y} ${e.w} ${e.h}"
        preserveAspectRatio="xMidYMid meet"
        @pointerdown=${this._onBgDown}
        @pointermove=${this._onMove}
        @pointerup=${this._onUp}
        @pointercancel=${this._onUp}
        @wheel=${this._onWheel}
      >
        ${this._iso && !this.edit ? this._isoFloor(e) : v}
        ${this.edit ? this._grid() : v}
        ${this._iso ? this._isoLayer() : v}
        <g class="pipes ${this._iso ? "iso" : ""}">
          ${n.map(({ pipe: o, route: a }) => {
      if (!a) return v;
      const l = Mr(a.pts), p = Wn(o, s), d = Dn(o.kind, i.get(o.id)), h = this.selected?.kind === "p" && this.selected.id === o.id;
      return k`<g class="pipe ${p ? "active" : ""} ${h ? "selected" : ""}" data-pipe=${o.id}
                @pointerdown=${(u) => this._onPipeDown(u, o.id)}>
              <path class="pipe-hit" d=${l} />
              ${h ? k`<path class="pipe-sel" d=${l} />` : v}
              <path class="pipe-outline" d=${l} />
              ${this._iso ? k`<path class="pipe-depth" d=${l} style="stroke:${d}" />` : v}
              ${p ? k`<path class="pipe-halo" d=${l} style="stroke:${d}" />` : v}
              <path class="pipe-base" d=${l} style="stroke:${d}" />
              ${this._iso ? k`<path class="pipe-gloss" d=${l} />` : v}
              ${p ? k`<path class="pipe-flow" d=${l} />` : v}
            </g>`;
    })}
        </g>
        <g class="components">
          ${this.plant.components.map((o) => this._component(t.get(o.id), s.get(o.id)))}
        </g>
        <g class="pills">${this._pills.map((o) => this._anchorPill(o))}</g>
        ${this.edit ? this._editOverlays(t, n) : v}
      </svg>
    `;
  }
  _grid() {
    const { w: e, h: t } = this.plant.grid;
    return k`
      <defs><pattern id="cp-grid" width=${z} height=${z} patternUnits="userSpaceOnUse">
        <circle cx="0" cy="0" r="1" class="grid-dot" />
      </pattern></defs>
      <rect class="grid-bg" x="0" y="0" width=${e * z} height=${t * z} fill="url(#cp-grid)" />`;
  }
  get _iso() {
    return this.plant?.settings?.style === "iso";
  }
  /** Body outline of a component in schematic px, honouring rotation and mirroring. */
  _isoBox(e) {
    const t = { ...J[e.type], ...Se(e) }, { w: s, h: i } = le(e), n = (e.type === "value_tile" ? s : t.w) * z, o = (e.type === "value_tile" ? i : t.h) * z, a = Wr(e, n, o);
    if (!a) return null;
    let { x: l, y: p, w: d, h } = a;
    e.flip && t.mirrorable && (l = n - (l + d));
    const u = t.rotatable && e.rot || 0;
    return u === 90 ? [l, p, d, h] = [o - (p + h), l, h, d] : u === 180 ? [l, p] = [n - (l + d), o - (p + h)] : u === 270 && ([l, p, d, h] = [p, n - (l + d), h, d]), { x: e.x * z + l, y: e.y * z + p, w: d, h, r: Math.min(a.r, d / 2, h / 2) };
  }
  /** 2.5D: soft shadows and extruded bodies, drawn behind pipes and components. */
  _isoLayer() {
    const e = this.plant.components.map((s) => this._isoBox(s)).filter((s) => !!s), t = Array.from({ length: Ft }, (s, i) => (Ft - i) / Ft);
    return k`
      <defs>
        <linearGradient id="cp-iso-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style="stop-color: var(--cp-iso-top)" />
          <stop offset="0.22" style="stop-color: var(--cp-iso-side)" />
          <stop offset="1" style="stop-color: var(--cp-iso-side)" />
        </linearGradient>
        <filter id="cp-iso-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>
      <g class="iso-shadows" filter="url(#cp-iso-blur)">
        ${e.map((s) => k`<rect x=${s.x + 6} y=${s.y + 10} width=${s.w} height=${s.h} rx=${s.r} />`)}
      </g>
      <g class="iso-bodies">
        ${e.map((s) => t.map((i) => k`<rect x=${s.x + Er * i} y=${s.y - Ar * i} width=${s.w} height=${s.h} rx=${s.r} fill="url(#cp-iso-grad)" />`))}
      </g>`;
  }
  /** Isometric floor: two families of lines at ±30°. */
  _isoFloor(e) {
    const t = z * 2 * Math.sqrt(3), s = z * 2;
    return k`
      <defs><pattern id="cp-iso-floor" width=${t} height=${s} patternUnits="userSpaceOnUse">
        <path d="M 0 ${s} L ${t} 0 M 0 0 L ${t} ${s}" class="iso-floor-line" />
      </pattern></defs>
      <rect x=${e.x - e.w} y=${e.y - e.h} width=${e.w * 3} height=${e.h * 3} fill="url(#cp-iso-floor)" class="iso-floor" />`;
  }
  _transform(e) {
    const t = { ...J[e.type], ...Se(e) }, s = e.rot || 0;
    let i = `translate(${e.x * z} ${e.y * z})`;
    return e.flip && t.mirrorable && (i += ` translate(${t.w * z} 0) scale(-1 1)`), !t.rotatable || s === 0 ? i : s === 90 ? `${i} translate(${t.h * z} 0) rotate(90)` : s === 180 ? `${i} translate(${t.w * z} ${t.h * z}) rotate(180)` : `${i} translate(0 ${t.w * z}) rotate(270)`;
  }
  _component(e, t) {
    const s = { ...J[e.type], ...Se(e), ports: rt(e), badges: qs(e) }, { w: i, h: n } = le(e), o = (e.type === "value_tile" ? i : s.w) * z, a = (e.type === "value_tile" ? n : s.h) * z, l = (x) => {
      const M = this.src.get(e, x);
      return M?.available && M.num !== null ? M.num : void 0;
    }, p = (x) => {
      const M = this.src.get(e, x);
      return M?.available ? String(M.raw) : void 0;
    }, d = e.icon || this.plant.settings.typeIcons?.[e.type], h = d ? this.icons.get(d) : void 0, u = this.selected?.kind === "c" && this.selected.id === e.id;
    let m;
    e.type === "value_tile" ? m = this._tile(e, o, a) : e.type === "label" ? m = k`<text class="free-label" x="0" y=${z} style="font-size:${e.props.size || 18}px">${e.props.text || e.label}</text>` : h ? m = k`${t.has("running") ? k`<rect class="user-glow pulse" x="-4" y="-4" width=${o + 8} height=${a + 8} rx="10" />` : v}
        <image href=${h.data_url} x="0" y="0" width=${o} height=${a} preserveAspectRatio="xMidYMid meet" />` : m = Sr({ c: e, w: o, h: a, flags: t, num: l, text: p });
    const _ = !["junction", "label", "value_tile"].includes(e.type), g = s.ports.some((x) => {
      const M = pe(e, x.id);
      return M?.dir === "b" && Math.abs(M.x - (e.x + i / 2)) < Math.max(0.6, i * 0.35);
    });
    let y = (e.x + i / 2) * z, w = (e.y + n) * z + (s.badges === "above" ? 16 : 18), b = "middle";
    if (g) {
      const x = Math.min(28, e.label.length) * 7.5;
      w = (e.y + n) * z + 4;
      const M = (e.x + i) * z + 6, P = e.x * z - 6, B = this._hitsPipe(M, w - 12, M + x, w + 3), j = this._hitsPipe(P - x, w - 12, P, w + 3);
      B && !j ? (y = P, b = "end") : (y = M, b = "start");
    }
    return k`
      <g class="comp ${u ? "selected" : ""}" data-id=${e.id}
         @pointerdown=${(x) => this._onCompDown(x, e)}>
        <g transform=${this._transform(e)}>
          ${m}
        </g>
        <rect class="comp-hit" x=${e.x * z - (e.type === "junction" ? 8 : 0)} y=${e.y * z - (e.type === "junction" ? 8 : 0)}
          width=${Math.max(16, i * z)} height=${Math.max(16, n * z)} rx="8" />
        ${u ? k`<rect class="sel-outline" x=${e.x * z - 6} y=${e.y * z - 6} width=${i * z + 12} height=${n * z + 12} rx="10" />` : v}
        ${_ ? k`<text class="comp-label" x=${y} y=${w} text-anchor=${b}>${jt(e.label, 28)}</text>` : v}
      </g>
      ${this._badgeLayout(e).map((x) => x.w ? this._pill(e, x.slot, x.x, x.y, x.w) : this._chip(e, x.slot, x.x, x.y))}
    `;
  }
  _chip(e, t, s, i) {
    const n = this.src.get(e, t), o = Ke(e, t), { text: a, unit: l } = xe(n, o), p = e.type === "value_tile" ? t : ve(e.type, t), h = o === "temp" && n?.num !== null && n?.available ? te(n.num, "#8b949e") : "var(--cp-accent)";
    return k`
      <g class="chip ${n?.available === !1 ? "na" : ""}" @click=${(u) => this._slotClick(u, e, t)}>
        <rect x=${s} y=${i} width=${oe} height=${re} rx="8" />
        <rect class="chip-accent" x=${s} y=${i + 7} width="3" height=${re - 14} rx="1.5" style="fill:${h}" />
        <text class="chip-label" x=${s + 10} y=${i + 13}>${jt(p)}</text>
        <text class="chip-value" x=${s + 10} y=${i + 28}>${a}<tspan class="chip-unit" dx="2">${l}</tspan></text>
      </g>`;
  }
  /**
   * Values anchored to a pipe ("at") sit on that pipe; values with a measuring point ("pos")
   * sit at that point. Positions avoid overlapping each other.
   */
  _placePills(e, t) {
    const s = [], i = [...e.values()].filter((o) => !["junction", "label"].includes(o.type)).map((o) => {
      const { w: a, h: l } = le(o);
      return { x: o.x * z - 4, y: o.y * z - 4, w: a * z + 8, h: l * z + 26 };
    }), n = (o, a, l, p = !0) => s.every((d) => o + l + 4 <= d.x || o >= d.x + d.w + 4 || a + me + 3 <= d.y || a >= d.y + me + 3) && (!p || i.every((d) => o + l <= d.x || o >= d.x + d.w || a + me <= d.y || a >= d.y + d.h));
    for (const o of e.values()) {
      const a = new Set(this._shownSlots(o));
      for (const l of Js(o)) {
        if (!a.has(l.key) || !l.at && !l.pos) continue;
        const p = this._pillWidth(o, l.key);
        if (l.pos) {
          s.push({ c: o, slot: l.key, x: (o.x + l.pos[0]) * z - p / 2, y: (o.y + l.pos[1]) * z - me / 2, w: p });
          continue;
        }
        let d = null, h = { c: o.id, p: l.at };
        const u = /* @__PURE__ */ new Set();
        for (let m = 0; m < 4 && h && !d; m++) {
          const _ = h, g = t.find(
            ({ pipe: M }) => !u.has(M.id) && (M.from.c === _.c && M.from.p === _.p || M.to.c === _.c && M.to.p === _.p)
          );
          if (h = null, !g?.route) break;
          u.add(g.pipe.id);
          const y = g.pipe.from.c === _.c && g.pipe.from.p === _.p, w = y ? g.route.pts : [...g.route.pts].reverse();
          for (let M = 1; M < w.length && !d; M++) {
            const P = w[M - 1], B = w[M], j = Math.abs(P.x - B.x) + Math.abs(P.y - B.y);
            if (!(j < 1 || P.x === B.x && j < 3))
              for (const ee of [0.5, 0.35, 0.65, 0.2, 0.8]) {
                const A = (P.x + (B.x - P.x) * ee) * z, C = (P.y + (B.y - P.y) * ee) * z;
                if (P.y === B.y && j * z < p + 8) break;
                const F = A - p / 2, O = C - me / 2;
                if (n(F, O, p)) {
                  d = { x: F, y: O };
                  break;
                }
              }
          }
          const b = y ? g.pipe.to : g.pipe.from, x = e.get(b.c);
          if (!d && x && J[x.type].passive && x.type !== "pump") {
            const M = rt(x).find((P) => P.id !== b.p && t.some(({ pipe: B }) => !u.has(B.id) && (B.from.c === x.id && B.from.p === P.id || B.to.c === x.id && B.to.p === P.id)));
            M && (h = { c: x.id, p: M.id });
          }
        }
        if (!d) {
          const m = pe(o, l.at);
          if (!m) continue;
          d = { x: m.x * z + 6, y: m.y * z + 6 };
        }
        s.push({ c: o, slot: l.key, ...d, w: p });
      }
    }
    return s;
  }
  _pillWidth(e, t) {
    const { text: s, unit: i } = xe(this.src.get(e, t), Ke(e, t));
    return Math.round((Ys(e.type, t).length + s.length + i.length) * 6.4 + 22);
  }
  _anchorPill(e) {
    const t = this.src.get(e.c, e.slot), s = Ke(e.c, e.slot), { text: i, unit: n } = xe(t, s), o = s === "temp" && t?.available && t.num !== null ? te(t.num, "#8b949e") : "var(--cp-accent)";
    return k`
      <g class="apill" @click=${(a) => this._slotClick(a, e.c, e.slot)}>
        <title>${ve(e.c.type, e.slot)}</title>
        <rect x=${e.x} y=${e.y} width=${e.w} height=${me} rx=${me / 2} style="stroke:${o}" />
        <text x=${e.x + 8} y=${e.y + 13}><tspan class="apill-label">${Ys(e.c.type, e.slot)}</tspan> ${i}<tspan class="chip-unit" dx="1">${n}</tspan></text>
      </g>`;
  }
  /** Compact value-only pill drawn inside a tank at the sensor height. */
  _pill(e, t, s, i, n) {
    const o = this.src.get(e, t), { text: a, unit: l } = xe(o, Ke(e, t));
    return k`
      <g class="pill" @click=${(p) => this._slotClick(p, e, t)}>
        <title>${ve(e.type, t)}</title>
        <rect x=${s} y=${i} width=${n} height="22" rx="11" />
        <text x=${s + n / 2} y=${i + 15.5} text-anchor="middle">${a}<tspan class="chip-unit" dx="1">${l}</tspan></text>
      </g>`;
  }
  _tile(e, t, s) {
    const i = e.props.entries || [];
    return k`
      <rect class="tile" x="0" y="0" width=${t} height=${s} rx="12" />
      <text class="tile-title" x="14" y="22">${e.label}</text>
      ${i.map((n, o) => {
      const a = this.src.get(e, n.slot), { text: l, unit: p } = xe(a, n.kind || "text"), d = 46 + o * 26;
      return k`<g class="tile-row" @click=${(h) => this._slotClick(h, e, n.slot)}>
          <text class="tile-label" x="14" y=${d}>${jt(n.label || n.slot, 22)}</text>
          <text class="tile-value" x=${t - 14} y=${d} text-anchor="end">${l} <tspan class="chip-unit">${p}</tspan></text></g>`;
    })}`;
  }
  _editOverlays(e, t) {
    const s = [];
    for (const n of e.values())
      for (const o of rt(n)) {
        const a = pe(n, o.id);
        if (!a) continue;
        const l = this._connect?.c === n.id && this._connect.p === o.id, p = n.type === "junction" ? { l: -7, r: 7, t: 0, b: 0 }[a.dir] ?? 0 : 0, d = n.type === "junction" ? { t: -7, b: 7, l: 0, r: 0 }[a.dir] ?? 0 : 0;
        s.push(k`<circle class="port ${l ? "src" : ""} ${this._connect ? "target" : ""}" cx=${a.x * z + p} cy=${a.y * z + d} r=${n.type === "junction" ? 4 : 6}
          @pointerdown=${(h) => this._onPortDown(h, { c: n.id, p: o.id })}><title>${o.id}</title></circle>`);
      }
    let i = v;
    if (this.selected?.kind === "p") {
      const n = t.find((a) => a.pipe.id === this.selected.id)?.route, o = n ? zr(n.pts, n.horizontalStart) : null;
      n && o && (i = k`<rect class="bend-handle ${n.horizontalStart ? "ew" : "ns"}" x=${o.x * z - 7} y=${o.y * z - 7} width="14" height="14" rx="4"
          @pointerdown=${(a) => this._onBendDown(a, this.selected.id, n.horizontalStart)} />`);
    }
    return k`<g class="ports">${s}</g>${i}`;
  }
  // ---------------------------------------------------------- interaction
  _svgPoint(e) {
    const t = this.renderRoot.querySelector("svg"), s = t.createSVGPoint();
    s.x = e.clientX, s.y = e.clientY;
    const i = t.getScreenCTM();
    if (!i) return { x: 0, y: 0 };
    const n = s.matrixTransform(i.inverse());
    return { x: n.x, y: n.y };
  }
  _emit(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  _slotClick(e, t, s) {
    this.edit || this._lastMoved || (e.stopPropagation(), this._emit("cp-slot-click", { component: t, slot: s, x: e.clientX, y: e.clientY }));
  }
  _capture(e) {
    const t = this.renderRoot.querySelector("svg");
    t.hasPointerCapture(e.pointerId) || t.setPointerCapture(e.pointerId);
  }
  _onCompDown(e, t) {
    if (e.button !== 0) return;
    e.stopPropagation(), this._pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const s = this._svgPoint(e);
    this._gesture = {
      type: this.edit ? "move" : "tap",
      id: t.id,
      start: s,
      ox: t.x,
      oy: t.y,
      cx: e.clientX,
      cy: e.clientY,
      moved: !1,
      comp: t,
      view: { ...this._view || this._contentBox() }
    }, this.edit && this._capture(e);
  }
  _onPipeDown(e, t) {
    !this.edit || e.button !== 0 || (e.stopPropagation(), this._emit("cp-select", { kind: "p", id: t }));
  }
  _onPortDown(e, t) {
    if (e.stopPropagation(), !this._connect) {
      this._connect = t, this._emit("cp-hint", c("ed.connecting"));
      return;
    }
    this._connect.c !== t.c && this._emit("cp-connect", { from: this._connect, to: t }), this._connect = null, this._emit("cp-hint", "");
  }
  _onBendDown(e, t, s) {
    e.stopPropagation(), this._gesture = { type: "bend", id: t, horizontalStart: s, moved: !1 }, this._capture(e);
  }
  _onBgDown(e) {
    if (this._pointers.set(e.pointerId, { x: e.clientX, y: e.clientY }), this._pointers.size === 2) {
      const [t, s] = [...this._pointers.values()];
      this._gesture = { type: "pinch", dist: Math.hypot(t.x - s.x, t.y - s.y), view: { ...this._view || this._contentBox() }, moved: !0 }, this._capture(e);
      return;
    }
    this.edit && e.target === e.currentTarget && this._emit("cp-select", null), this.edit && this._connect && (this._connect = null, this._emit("cp-hint", "")), this._gesture = { type: "pan", cx: e.clientX, cy: e.clientY, view: { ...this._view || this._contentBox() }, moved: !1 };
  }
  _onMove(e) {
    this._pointers.has(e.pointerId) && this._pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const t = this._gesture;
    if (t) {
      if (t.type === "pinch" && this._pointers.size === 2) {
        const [s, i] = [...this._pointers.values()], n = t.dist / Math.max(10, Math.hypot(s.x - i.x, s.y - i.y)), o = t.view, a = o.x + o.w / 2, l = o.y + o.h / 2;
        this._view = { x: a - o.w * n / 2, y: l - o.h * n / 2, w: o.w * n, h: o.h * n };
        return;
      }
      if (t.type === "pan") {
        const i = this.renderRoot.querySelector("svg").getBoundingClientRect(), n = Math.max(t.view.w / i.width, t.view.h / i.height), o = (e.clientX - t.cx) * n, a = (e.clientY - t.cy) * n;
        !t.moved && Math.abs(e.clientX - t.cx) + Math.abs(e.clientY - t.cy) > 4 && (t.moved = !0, this._capture(e)), t.moved && (this._view = { ...t.view, x: t.view.x - o, y: t.view.y - a });
        return;
      }
      if (t.type === "move") {
        const s = this._svgPoint(e);
        if (Math.abs(e.clientX - t.cx) + Math.abs(e.clientY - t.cy) > 3 && (t.moved = !0), !t.moved) return;
        const i = Math.max(0, Math.round(t.ox + (s.x - t.start.x) / z)), n = Math.max(0, Math.round(t.oy + (s.y - t.start.y) / z));
        this._drag = { id: t.id, dx: i, dy: n };
        return;
      }
      if (t.type === "tap") {
        Math.abs(e.clientX - t.cx) + Math.abs(e.clientY - t.cy) > 6 && (this._gesture = { type: "pan", cx: t.cx, cy: t.cy, view: t.view, moved: !0 }, this._capture(e), this._onMove(e));
        return;
      }
      if (t.type === "bend") {
        const s = this._svgPoint(e);
        t.moved = !0;
        const i = Math.round((t.horizontalStart ? s.x : s.y) / z);
        this._emit("cp-bend", { id: t.id, bend: i, live: !0 });
      }
    }
  }
  _onUp(e) {
    this._pointers.delete(e.pointerId);
    const t = this._gesture;
    this._pointers.size > 0 && t?.type === "pinch" || (this._gesture = null, this._lastMoved = !!t?.moved, setTimeout(() => this._lastMoved = !1, 0), t && (t.type === "move" ? (t.moved && this._drag ? this._emit("cp-move", { id: t.id, x: this._drag.dx, y: this._drag.dy }) : this._emit("cp-select", { kind: "c", id: t.id }), this._drag = null) : t.type === "tap" && !t.moved ? this._emit("cp-component-click", { component: t.comp, x: e.clientX, y: e.clientY }) : t.type === "bend" && t.moved && this._emit("cp-bend", { id: t.id, live: !1 })));
  }
  _onWheel(e) {
    e.preventDefault();
    const t = this._view || this._contentBox(), s = this._svgPoint(e), i = Math.exp(e.deltaY * 15e-4);
    this._view = { x: s.x - (s.x - t.x) * i, y: s.y - (s.y - t.y) * i, w: t.w * i, h: t.h * i };
  }
};
_t.properties = {
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
}, _t.styles = Q`
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
    /* the outline in background colour cuts a gap into pipes drawn earlier: crossings read as bridges */
    .pipe-outline { stroke: var(--cp-surface); stroke-width: 12; }
    .iso-floor-line { fill: none; stroke: var(--cp-iso-floor); stroke-width: 1; }
    .iso-shadows rect { fill: #000; opacity: 0.28; }
    /* 2.5D pipes: a darker body behind, offset like the extrusion, and a highlight on top */
    .pipe-depth { stroke-width: 7; opacity: 0.35; filter: brightness(0.45); transform: translate(4px, -2.5px); }
    .pipe.active .pipe-depth { opacity: 0.8; }
    .pipe-gloss { stroke: #fff; stroke-width: 1.4; opacity: 0.22; transform: translate(-0.8px, -1.2px); }
    .pipes.iso .pipe-base { stroke-width: 6; }
    .pipe-base { stroke-width: 5; opacity: 0.4; transition: opacity 0.6s; }
    .pipe.active .pipe-base { opacity: 1; }
    .pipe-halo { stroke-width: 12; opacity: 0.12; }
    .pipe-flow {
      stroke: var(--cp-flow);
      stroke-width: 2.6;
      stroke-dasharray: 2 13;
      animation: cp-flow 0.9s linear infinite;
    }
    .pipe-sel { stroke: var(--cp-select); stroke-width: 18; opacity: 0.35; }
    @keyframes cp-flow { to { stroke-dashoffset: -15; } }
    /* internal pipes: offset = one dash period (2 + 9), otherwise the dots jump each loop */
    @keyframes cp-iflow { to { stroke-dashoffset: -11; } }

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
    .rad-header { fill: var(--cp-casing-light); stroke: var(--cp-casing-stroke); stroke-width: 1; }
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
    .ipipe-flow { fill: none; stroke: var(--cp-flow); stroke-width: 1.8; stroke-dasharray: 2 9; animation: cp-iflow 0.66s linear infinite; }
    .itag { fill: var(--cp-muted); font-size: 8.5px; font-weight: 700; }
    .itag.halo { paint-order: stroke; stroke: var(--cp-surface); stroke-width: 3px; stroke-linejoin: round; }
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
let is = _t;
customElements.get("cp-schematic") || customElements.define("cp-schematic", is);
const vt = class vt extends Y {
  constructor() {
    super(...arguments), this.points = [], this.color = "var(--cp-accent)", this.step = !1;
  }
  render() {
    const e = this.points.filter((m) => m.v !== null);
    if (e.length < 2) return f`<div class="empty">${c("ov.no_history")}</div>`;
    const t = 300, s = 90, i = e[0].t, n = e[e.length - 1].t;
    let o = Math.min(...e.map((m) => m.v)), a = Math.max(...e.map((m) => m.v));
    a - o < 1e-6 && (a += 1, o -= 1);
    const l = (a - o) * 0.1;
    o -= l, a += l;
    const p = (m) => (m - i) / Math.max(1, n - i) * t, d = (m) => s - (m - o) / (a - o) * s;
    let h = `M ${p(e[0].t)} ${d(e[0].v)}`;
    for (let m = 1; m < e.length; m++)
      this.step ? h += ` H ${p(e[m].t)} V ${d(e[m].v)}` : h += ` L ${p(e[m].t)} ${d(e[m].v)}`;
    const u = `${h} L ${t} ${s} L 0 ${s} Z`;
    return f`<svg viewBox="0 0 ${t} ${s}" preserveAspectRatio="none">
      <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color=${this.color} stop-opacity="0.35" /><stop offset="1" stop-color=${this.color} stop-opacity="0" />
      </linearGradient></defs>
      ${k`<path d=${u} fill="url(#sg)" /><path d=${h} fill="none" stroke=${this.color} stroke-width="2" vector-effect="non-scaling-stroke" />`}
    </svg>`;
  }
};
vt.properties = { points: { attribute: !1 }, color: {}, step: { type: Boolean } }, vt.styles = Q`
    :host { display: block; height: 90px; }
    svg { width: 100%; height: 100%; display: block; overflow: visible; }
    .empty { height: 100%; display: grid; place-items: center; color: var(--cp-muted); font-size: 12px; }
  `;
let ns = vt;
const wt = class wt extends Y {
  constructor() {
    super(...arguments), this.canWrite = !1, this.demo = !1, this._draft = null, this._confirm = !1, this._wmsg = "", this._busy = !1, this.slotKey = "", this.x = 0, this.y = 0, this.version = 0, this._hist = null, this._loadedFor = "";
  }
  updated() {
    const e = `${this.component?.id}:${this.slotKey}`;
    e !== this._loadedFor && this.component && (this._loadedFor = e, this._hist = null, this._draft = null, this._confirm = !1, this._wmsg = "", this.src.history(this.component, this.slotKey, 24).then(
      (t) => this._hist = t,
      () => this._hist = []
    ));
  }
  _close() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  _more(e) {
    this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: e }, bubbles: !0, composed: !0 })), this._close();
  }
  /** Change control for values released as writable. */
  _writer() {
    const e = this.component, t = e.bindings?.[this.slotKey], s = Vi(t);
    if (!t || !s || !(e.writable || []).includes(this.slotKey)) return v;
    if (this.demo) return f`<div class="w muted small">${c("wr.demo")}</div>`;
    if (!this.canWrite) return f`<div class="w muted small">${c("wr.no_permission")}</div>`;
    const i = this.hass?.states[t], n = i?.attributes || {}, o = i?.state, a = this._draft ?? (s === "number" ? Number(o) : s === "switch" ? o === "on" : o ?? null), l = (u) => typeof u == "boolean" ? c(u ? "wr.on" : "wr.off") : s === "number" ? `${N(Number(u), 1)} ${n.unit_of_measurement || ""}` : String(u), p = s === "button" || String(a) !== String(s === "switch" ? o === "on" : s === "number" ? Number(o) : o), d = async () => {
      this._busy = !0;
      try {
        await this.writer(e.id, this.slotKey, s === "button" ? null : a), this._wmsg = c("wr.done"), this._draft = null;
      } catch (u) {
        this._wmsg = `${c("wr.failed")}: ${u?.message || u}`;
      } finally {
        this._busy = !1, this._confirm = !1;
      }
    };
    let h;
    if (s === "number") {
      const u = Number(n.min ?? 0), m = Number(n.max ?? 100), _ = Number(n.step ?? 1);
      h = f`<div class="wrow">
        <input type="range" min=${u} max=${m} step=${_} .value=${String(a)} @input=${(g) => this._draft = Number(g.target.value)} />
        <input class="wnum" type="number" min=${u} max=${m} step=${_} .value=${String(a)} @change=${(g) => this._draft = Number(g.target.value)} />
        <span class="muted">${n.unit_of_measurement || ""}</span></div>`;
    } else s === "select" ? h = f`<select @change=${(u) => this._draft = u.target.value}>
        ${(n.options || []).map((u) => f`<option value=${u} ?selected=${u === a}>${u}</option>`)}</select>` : s === "switch" ? h = f`<label class="wsw"><input type="checkbox" .checked=${!!a} @change=${(u) => this._draft = u.target.checked} /> ${c(a ? "wr.on" : "wr.off")}</label>` : h = v;
    return f`<div class="w">
      <div class="cap">${c("wr.title")}</div>
      ${h}
      ${this._confirm ? f`<div class="wconfirm">
            <div>${s === "button" ? c("wr.press_confirm") : c("wr.confirm", { old: l(s === "switch" ? o === "on" : o), new: l(a) })}</div>
            <div class="row"><button @click=${() => this._confirm = !1}>${c("cancel")}</button><span class="spacer"></span>
              <button class="primary" ?disabled=${this._busy} @click=${d}>${L("check")} ${c("wr.apply")}</button></div>
          </div>` : f`<div class="row"><span class="spacer"></span>
            <button class="primary" ?disabled=${!p} @click=${() => this._confirm = !0}>${c(s === "button" ? "wr.press" : "wr.change")}</button></div>`}
      ${this._wmsg ? f`<div class="muted small">${this._wmsg}</div>` : v}
    </div>`;
  }
  render() {
    if (!this.component) return v;
    const e = this.component, t = Ke(e, this.slotKey), s = this.src.get(e, this.slotKey), { text: i, unit: n } = xe(s, t), o = this.src.entityOf(e, this.slotKey), a = this._hist || [], l = a.map((_) => _.v).filter((_) => _ !== null), p = t === "temp" && s?.num !== null && s?.num !== void 0 ? te(s.num, "#3ddc97") : "var(--cp-accent)", d = 320, h = Math.max(12, Math.min(window.innerWidth - d - 12, this.x - d / 2)), u = Math.max(12, Math.min(window.innerHeight - 260, this.y + 14)), m = e.type === "value_tile" ? this.slotKey : ve(e.type, this.slotKey);
    return f`
      <div class="backdrop" @pointerdown=${this._close}></div>
      <div class="pop card" style="left:${h}px; top:${u}px; width:${d}px">
        <div class="row head">
          <div>
            <div class="title">${m}</div>
            <div class="muted sub">${e.label}</div>
          </div>
          <span class="spacer"></span>
          <button class="ghost icon" @click=${this._close} aria-label=${c("close")}>${L("close")}</button>
        </div>
        <div class="now"><span class="val">${i}</span><span class="unit">${n}</span></div>
        <div class="muted cap">${c("ov.history24")}</div>
        ${this._hist === null ? f`<div class="loading"></div>` : f`<cp-sparkline .points=${a} .color=${p} .step=${t === "bool"}></cp-sparkline>`}
        ${l.length && t !== "bool" && t !== "enum" ? f`<div class="row stats">
              <span>${c("ov.min")} <b>${N(Math.min(...l))}</b></span>
              <span>${c("ov.max")} <b>${N(Math.max(...l))}</b></span>
            </div>` : v}
        ${this._writer()}
        ${o ? f`<div class="row foot"><code>${o}</code><span class="spacer"></span>
              <button @click=${() => this._more(o)}>${c("ov.open_entity")}</button></div>` : v}
      </div>
    `;
  }
};
wt.properties = {
  component: { attribute: !1 },
  slotKey: {},
  src: { attribute: !1 },
  x: { type: Number },
  y: { type: Number },
  version: { type: Number },
  hass: { attribute: !1 },
  writer: { attribute: !1 },
  canWrite: { type: Boolean },
  demo: { type: Boolean },
  _hist: { state: !0 },
  _draft: { state: !0 },
  _confirm: { state: !0 },
  _wmsg: { state: !0 },
  _busy: { state: !0 }
}, wt.styles = [
  se,
  Q`
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
      .w { margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--cp-border); display: grid; gap: 8px; }
      .wrow { display: flex; gap: 8px; align-items: center; }
      .wrow input[type="range"] { flex: 1; }
      .wnum { width: 76px; }
      .wsw { display: flex; gap: 8px; align-items: center; font-size: 13px; }
      .wsw input { width: auto; margin: 0; }
      .wconfirm { display: grid; gap: 8px; padding: 10px; border-radius: 10px; font-size: 13px;
        background: color-mix(in srgb, var(--cp-warn) 14%, transparent); border: 1px solid color-mix(in srgb, var(--cp-warn) 45%, transparent); }
      .small { font-size: 12px; }
      .loading { height: 90px; border-radius: 8px; background: linear-gradient(90deg, var(--cp-surface-2), var(--cp-surface), var(--cp-surface-2)); background-size: 200% 100%; animation: sh 1.2s infinite; }
      @keyframes sh { to { background-position: -200% 0; } }
    `
];
let rs = wt;
const Pr = { info: "info", notice: "notice", warning: "warn", error: "error" };
function Cr(r) {
  const e = { ...r.params };
  return e.label_sfx = e.label ? ` (${e.label})` : "", r.key === "value_changed" && (e.slot_label = e.type ? ve(e.type, e.slot) : e.slot), r.key === "maintenance_due" && (e.task = e.task_key ? c(`mt.${e.task_key}`) : e.title), c(`msgk.${r.key}`, e);
}
const bt = class bt extends Y {
  constructor() {
    super(...arguments), this.messages = [], this.compact = !1, this.canClear = !1, this._filter = "all";
  }
  _row(e) {
    const t = e.end_ts ? e.end_ts - e.ts : null;
    return f`<li class="msg ${e.level} ${e.active ? "active" : ""}">
      <span class="lv">${L(Pr[e.level] || "info")}</span>
      <div class="body">
        <div class="text">${Cr(e)}</div>
        <div class="meta">
          ${xn(e.ts)}
          ${e.active ? f` · <b>${c("msg.active")}</b>` : t !== null ? f` · ${c("msg.duration", { duration: $n(t) })}` : v}
        </div>
      </div>
    </li>`;
  }
  render() {
    const e = [...this.messages].sort((n, o) => o.ts - n.ts), t = this._filter === "all" ? e : e.filter((n) => n.level === this._filter), s = t.filter((n) => n.active), i = t.filter((n) => !n.active).slice(0, this.compact ? 12 : 300);
    return f`
      ${this.compact ? v : f`<div class="row filters">
            ${["all", "error", "warning", "notice", "info"].map(
      (n) => f`<button class=${this._filter === n ? "primary" : ""} @click=${() => this._filter = n}>
                ${c(n === "all" ? "msg.filter_all" : `msg.level.${n}`)}</button>`
    )}
            <span class="spacer"></span>
            ${this.canClear ? f`<button @click=${() => this.dispatchEvent(new CustomEvent("clear"))}>${L("trash")} ${c("msg.clear")}</button>` : v}
          </div>`}
      ${s.length ? f`<h4>${c("msg.active")}</h4><ul>${s.map((n) => this._row(n))}</ul>` : v}
      <h4>${c("msg.history")}</h4>
      ${i.length ? f`<ul>${i.map((n) => this._row(n))}</ul>` : f`<div class="empty muted">${c("msg.empty")}</div>`}
    `;
  }
};
bt.properties = {
  messages: { attribute: !1 },
  compact: { type: Boolean },
  canClear: { type: Boolean },
  _filter: { state: !0 }
}, bt.styles = [
  se,
  Q`
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
let os = bt;
customElements.get("cp-sparkline") || customElements.define("cp-sparkline", ns);
customElements.get("cp-slot-popover") || customElements.define("cp-slot-popover", rs);
customElements.get("cp-messages") || customElements.define("cp-messages", os);
const Dr = [1, 10, 60, 300, 900], gi = "copilot.explain", _i = "copilot.energy", Tr = {
  heat: "#ff8a3d",
  dhw: "#ff4f8b",
  cold: "#6cc4ff",
  warn: "var(--cp-warn)",
  error: "var(--cp-error)",
  eco: "#3ddc97",
  info: "var(--cp-muted)"
};
function vi(r) {
  try {
    return localStorage.getItem(r);
  } catch {
    return null;
  }
}
function wi(r, e) {
  try {
    localStorage.setItem(r, e);
  } catch {
  }
}
const yt = class yt extends Y {
  constructor() {
    super(...arguments), this.admin = !0, this.icons = /* @__PURE__ */ new Map(), this.messages = [], this.sim = null, this.version = 0, this.narrow = !1, this.showDemo = !0, this.showKpis = !0, this.showSide = !0, this._pop = null, this._side = !0, this._explain = vi(gi) === "1", this._energy = vi(_i) !== "0", this._comp = null, this._tm = null, this._tmBusy = !1, this._tick = 0, this._raf = 0, this._last = 0, this._drawn = 0;
  }
  _toggleExplain() {
    this._explain = !this._explain, wi(gi, this._explain ? "1" : "0");
  }
  /** values shown right now: live, or the recorded state at the replay time */
  get _src() {
    return this._tm?.src ?? this.src;
  }
  async _openTm(e = 24) {
    if (!this._tmBusy) {
      this._tmBusy = !0;
      try {
        const t = this.sim ? Math.min(e, 24) : e, s = await Es.load(this.plant, this.src, t, this.hass);
        s.t = s.start, this._tm = { src: s, playing: !1, speed: this._tm?.speed ?? 900, hours: t, strip: this._modeStrip(s) };
      } catch (t) {
        console.error("COPilot: history could not be loaded", t);
      } finally {
        this._tmBusy = !1;
      }
    }
  }
  _closeTm() {
    cancelAnimationFrame(this._raf), this._tm = null;
  }
  /** Operating mode along the replay range, for the strip under the slider. */
  _modeStrip(e) {
    const t = this._first("outdoor_unit");
    if (!t) return [];
    const s = 240, i = e.start, n = Math.max(1, e.to - i), o = e.t, a = [];
    for (let l = 0; l < s; l++) {
      e.t = i + n * (l + 0.5) / s;
      const p = de(t, e), d = Oe(e.get(t, "activity")), h = p.has("defrost") ? "defrost" : d === "hot_water" ? "hot_water" : p.has("running") ? d && d !== "off" ? d : "heating" : "off", u = a[a.length - 1];
      u && u.mode === h ? u.w += 1 / s : a.push({ x: l / s, w: 1 / s, mode: h });
    }
    return e.t = o, a;
  }
  _play() {
    const e = this._tm;
    if (e && (e.src.t >= e.src.to - 1 && (e.src.t = e.src.start), e.playing = !e.playing, this._tm = { ...e }, e.playing)) {
      this._last = performance.now();
      const t = (s) => {
        const i = this._tm;
        if (!i?.playing) return;
        const n = Math.min(0.25, (s - this._last) / 1e3);
        this._last = s, i.src.t = Math.min(i.src.to, i.src.t + n * i.speed), i.src.t >= i.src.to && (this._tm = { ...i, playing: !1 }), s - this._drawn > 100 && (this._drawn = s, this._tick++), this._raf = requestAnimationFrame(t);
      };
      this._raf = requestAnimationFrame(t);
    }
  }
  _seek(e) {
    this._tm && (this._tm.src.t = e, this._tick++);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), cancelAnimationFrame(this._raf);
  }
  _tmBar() {
    const e = this._tm;
    if (!e) return v;
    const t = e.src, s = t.start, n = new Date(t.t * 1e3).toLocaleString(void 0, { weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }), o = { heating: "#ff8a3d", hot_water: "#ff4f8b", defrost: "#6cc4ff", compressor_alarm: "#ff5a5f", off: "transparent" };
    return f`<div class="tm">
      <button class="icon" title=${e.playing ? c("tm.pause") : c("tm.play")} @click=${this._play}>${L(e.playing ? "pause" : "play")}</button>
      <div class="tm-track">
        <input type="range" min=${s} max=${t.to} step="60" .value=${String(t.t)}
          @input=${(a) => this._seek(Number(a.target.value))} aria-label=${c("tm.title")} />
        <svg class="strip" viewBox="0 0 1 1" preserveAspectRatio="none">
          ${e.strip.map((a) => k`<rect x=${a.x} y="0" width=${a.w + 1e-3} height="1" fill=${o[a.mode] ?? "#8b949e"} />`)}
        </svg>
      </div>
      <span class="tm-time">${n}</span>
      <select title=${c("tm.speed")} @change=${(a) => this._tm = { ...e, speed: Number(a.target.value) }}>
        ${[300, 900, 1800, 3600].map((a) => f`<option value=${a} ?selected=${e.speed === a}>${c("tm.speed_v", { min: a / 60 })}</option>`)}
      </select>
      ${this.sim ? v : f`<select title=${c("tm.range")} @change=${(a) => this._openTm(Number(a.target.value))}>
            ${[6, 24, 72].map((a) => f`<option value=${a} ?selected=${e.hours === a}>${c("tm.hours", { h: a })}</option>`)}
          </select>`}
      <button class="live" @click=${this._closeTm}>${c("tm.live")}</button>
    </div>`;
  }
  _toggleEnergy() {
    this._energy = !this._energy, wi(_i, this._energy ? "1" : "0");
  }
  _onComponent(e) {
    this._explain && (this._comp = e.detail);
  }
  _explainPanel() {
    const e = tr(this.plant, this._src);
    return f`<div class="side-head"><b>${c("ex.title")}</b></div>
      ${e.length ? f`<ul class="explain">
            ${e.map(
      (t) => f`<li style="--tone:${Tr[t.tone]}">
                <span class="dot"></span>
                <div>
                  <div>${c(t.key, t.params)}</div>
                  ${t.hint ? f`<div class="ex-hint">${c(t.hint, t.params)}</div>` : v}
                </div>
              </li>`
    )}
          </ul>` : f`<p class="muted">${c("ex.empty")}</p>`}
      <p class="ex-tip">${L("info")} ${c("ex.tap_hint")}</p>`;
  }
  _compPop() {
    const e = this._comp;
    if (!e) return v;
    const t = sr(e.component, this._src), s = 300, i = Math.max(12, Math.min(window.innerWidth - s - 12, e.x - s / 2)), n = Math.max(12, Math.min(window.innerHeight - 200, e.y + 14));
    return f`<div class="backdrop" @pointerdown=${() => this._comp = null}></div>
      <div class="cpop card" style="left:${i}px; top:${n}px; width:${s}px">
        <div class="row cpop-head">
          <div>
            <div class="cpop-title">${e.component.label || c(`type.${e.component.type}`)}</div>
            <div class="muted cpop-sub">${c(`type.${e.component.type}`)}</div>
          </div>
          <span class="spacer"></span>
          <button class="ghost icon" @click=${() => this._comp = null} aria-label=${c("close")}>${L("close")}</button>
        </div>
        ${t.role ? f`<p>${c(t.role, t.params)}</p>` : v}
        ${t.state ? f`<p class="cpop-state">${c(t.state, t.params)}</p>` : v}
      </div>`;
  }
  _first(e) {
    return this.plant.components.find((t) => t.type === e);
  }
  _num(e, t) {
    if (!e) return;
    const s = this._src.get(e, t);
    return s?.available && s.num !== null ? s.num : void 0;
  }
  _kpis() {
    const e = this._first("outdoor_unit"), t = this._first("indoor_unit"), s = this._first("dhw_tank"), i = this.plant.components.find((g) => g.type === "radiators" || g.type === "floor_heating"), n = this.plant.components.find((g) => g.type === "valve_3way" && g.props.role === "dhw_switch");
    let o = e ? Oe(this._src.get(e, "activity")) : void 0;
    if (!o && e) {
      const g = de(e, this._src), y = n ? de(n, this._src) : /* @__PURE__ */ new Set();
      o = g.has("running") ? y.has("b") ? "hot_water" : "heating" : "off";
    }
    const a = {
      heating: "#ff8a3d",
      hot_water: "#ff4f8b",
      defrost: "#6cc4ff",
      compressor_alarm: "#ff5a5f",
      off: "#8a97a6"
    }, l = this._num(e, "heat_power");
    let p = this._num(e, "el_power");
    const d = e ? this._src.get(e, "el_power")?.unit : void 0;
    p !== void 0 && d === "kW" && (p *= 1e3);
    const h = l !== void 0 && p !== void 0 && p > 50 && l > 0.2 ? l / (p / 1e3) : void 0, u = (g, y = 1) => g === void 0 ? "–" : N(g, y), m = ji(this.plant, this._src), _ = [
      { key: "mode", label: c("kpi.mode"), value: o ? c(`mode.${o}`) : "–", unit: "", color: a[o || "off"] },
      { key: "out", label: c("kpi.outdoor"), value: u(this._num(e, "outdoor_temp")), unit: "°C", comp: e, slot: "outdoor_temp" },
      { key: "heat", label: c("kpi.heat"), value: u(l), unit: "kW", comp: e, slot: "heat_power" },
      { key: "power", label: c("kpi.power"), value: p === void 0 ? "–" : p >= 1e3 ? N(p / 1e3, 2) : N(p, 0), unit: p !== void 0 && p >= 1e3 ? "kW" : "W", comp: e, slot: "el_power" },
      {
        key: "cop",
        label: c("kpi.cop"),
        value: u(h),
        unit: "",
        color: m ? we[m.ampel] : void 0,
        sub: m ? `${c("kpi.target")} ${u(m.expected)}` : void 0
      },
      {
        key: "supply",
        label: c("kpi.supply"),
        value: u(this._num(t, "supply_temp")),
        unit: "°C",
        color: te(this._num(t, "supply_temp"), ""),
        sub: this._num(t, "target_flow_temp") !== void 0 ? `${c("kpi.target")} ${u(this._num(t, "target_flow_temp"))}` : void 0,
        comp: t,
        slot: "supply_temp"
      }
    ];
    return s && _.push({ key: "dhw", label: c("kpi.dhw"), value: u(this._num(s, "temp_top")), unit: "°C", color: te(this._num(s, "temp_top"), ""), comp: s, slot: "temp_top" }), i && this._num(i, "room_temp") !== void 0 && _.push({ key: "room", label: c("kpi.room"), value: u(this._num(i, "room_temp")), unit: "°C", comp: i, slot: "room_temp" }), _;
  }
  _openPop(e) {
    this._pop = e.detail;
  }
  _scenario(e) {
    this.dispatchEvent(new CustomEvent("scenario", { detail: e, bubbles: !0, composed: !0 }));
  }
  _demoBar() {
    const e = this.sim;
    if (!e || !this.showDemo) return v;
    const t = ["winter", "transition", "shower", "defrost", "dim14a", "pv", "disinfect", "fault", "reset"], s = { dim14a: e.dim14a, pv: e.pv, fault: e.fault, disinfect: e.disinfect };
    return f`<div class="demo">
      <span class="demo-tag">${L("flask")} ${c("demo.active")}</span>
      <span class="clock" title=${c("demo.time")}>${Oi(e.time)}</span>
      <label class="ctl">${c("demo.speed")}
        <select @change=${(i) => e.speed = Number(i.target.value)}>
          ${Dr.map((i) => f`<option value=${i} ?selected=${e.speed === i}>${i}×</option>`)}
        </select>
      </label>
      <label class="ctl slider">${c("demo.outdoor")} <b>${N(e.outdoorMean, 0)} °C</b>
        <input type="range" min="-15" max="20" step="1" .value=${String(e.outdoorMean)}
          @input=${(i) => e.outdoorMean = Number(i.target.value)} />
      </label>
      ${this.narrow ? f`<select class="scn-select" @change=${(i) => {
      const n = i.target;
      n.value && this._scenario(n.value), n.value = "";
    }}>
            <option value="">${c("demo.scenarios")} …</option>
            ${t.map((i) => f`<option value=${i}>${s[i] ? "✓ " : ""}${c(`scn.${i}`)}</option>`)}
          </select>` : f`<div class="scn">
            ${t.map(
      (i) => f`<button class=${s[i] ? "primary" : ""} @click=${() => this._scenario(i)}>${c(`scn.${i}`)}</button>`
    )}
          </div>`}
    </div>`;
  }
  render() {
    if (!this.plant) return v;
    const e = this._kpis(), t = nr(this.plant, this._tm ? null : this.sim), s = this.messages.filter((i) => i.active && (i.level === "warning" || i.level === "error")).length;
    return f`
      ${this._tm ? v : this._demoBar()}
      ${this.showKpis ? f`<div class="kpis">
        ${e.map(
      (i) => f`<button class="kpi" ?disabled=${!i.comp} @click=${(n) => i.comp && (this._pop = { component: i.comp, slot: i.slot, x: n.clientX, y: n.clientY })}>
            <span class="k-label">${i.label}</span>
            <span class="k-value" style=${i.color ? `color:${i.color}` : ""}>${i.value}<small>${i.unit}</small></span>
            ${i.sub ? f`<span class="k-sub">${i.sub}</span>` : v}
          </button>`
    )}
      </div>` : v}
      ${t && this._energy ? f`<div class="energy card"><cp-energy .flow=${rr(this.plant, this._src, this._tm ? null : this.sim)}></cp-energy></div>` : v}
      <div class="main ${this._explain || this._side && this.showSide ? "with-side" : ""}">
        <div class="stage card">
          <cp-schematic
            ?auto-height=${this.narrow}
            .plant=${this.plant}
            .src=${this._src}
            .icons=${this.icons}
            .version=${this.version * 1e5 + this._tick}
            @cp-slot-click=${this._openPop}
            @cp-component-click=${this._onComponent}
          ></cp-schematic>
          ${this._tmBar()}
          <div class="zoom">
            ${t ? f`<button class="icon ${this._energy ? "on" : ""}" title=${c("en.toggle")} aria-pressed=${this._energy ? "true" : "false"} @click=${this._toggleEnergy}>${L("bolt")}</button>` : v}
            <button class="icon ${this._tm ? "on" : ""} ${this._tmBusy ? "busy" : ""}" title=${c("tm.title")} aria-pressed=${this._tm ? "true" : "false"}
              @click=${() => this._tm ? this._closeTm() : this._openTm()}>${L("history")}</button>
            <button class="icon ${this._explain ? "on" : ""}" title=${c("ex.toggle")} aria-pressed=${this._explain ? "true" : "false"} @click=${this._toggleExplain}>${L("info")}</button>
            <button class="icon" title=${c("zoom_in")} @click=${() => this._sch()?.zoom(0.8)}>${L("plus")}</button>
            <button class="icon" title=${c("zoom_out")} @click=${() => this._sch()?.zoom(1.25)}>${L("minus")}</button>
            <button class="icon" title=${c("fit")} @click=${() => this._sch()?.fit()}>${L("fit")}</button>
            ${this.narrow || !this.showSide ? v : f`<button class="icon" title=${c("msg.title")} @click=${() => this._side = !this._side}>
                  ${L("bell")}${s ? f`<span class="badge">${s}</span>` : v}</button>`}
          </div>
        </div>
        ${this._explain ? f`<aside class="side card">${this._explainPanel()}</aside>` : this.showSide && (this._side || this.narrow) ? f`<aside class="side card">
                <div class="side-head"><b>${c("msg.title")}</b></div>
                <cp-messages compact .messages=${this.messages}></cp-messages>
              </aside>` : v}
      </div>
      ${this._pop ? f`<cp-slot-popover
            .component=${this._pop.component}
            .slotKey=${this._pop.slot}
            .src=${this._src}
            .x=${this._pop.x}
            .y=${this._pop.y}
            .version=${this.version}
            .hass=${this.hass}
            .writer=${(i, n, o) => this.api.write(i, n, o)}
            ?canWrite=${!!this.api && !this.api.standalone && (this.admin || !!this.plant.settings.write_non_admin)}
            ?demo=${!!this.sim || !!this._tm}
            @close=${() => this._pop = null}
          ></cp-slot-popover>` : v}
      ${this._compPop()}
    `;
  }
  _sch() {
    return this.renderRoot.querySelector("cp-schematic");
  }
};
yt.properties = {
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
  _side: { state: !0 },
  _explain: { state: !0 },
  _comp: { state: !0 },
  _energy: { state: !0 },
  _tm: { state: !0 },
  _tmBusy: { state: !0 },
  _tick: { state: !0 },
  hass: { attribute: !1 },
  api: { attribute: !1 },
  admin: { type: Boolean }
}, yt.styles = [
  se,
  Q`
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
      .energy { padding: 10px 14px 6px; }
      .tm { position: absolute; left: 10px; right: 10px; top: 10px; z-index: 2; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px;
        padding: 8px 12px; border-radius: 12px; background: color-mix(in srgb, var(--cp-surface) 88%, transparent);
        border: 1px solid color-mix(in srgb, var(--cp-accent) 45%, var(--cp-border)); backdrop-filter: blur(8px); }
      .tm-track { flex: 1; min-width: 180px; display: grid; gap: 3px; }
      .tm-track input { width: 100%; margin: 0; accent-color: var(--cp-accent); }
      .strip { width: 100%; height: 6px; border-radius: 3px; background: var(--cp-border); display: block; }
      .tm-time { font-weight: 800; font-variant-numeric: tabular-nums; min-width: 128px; }
      .tm select { width: auto; padding: 4px 8px; font-size: 12px; }
      .tm .live { padding: 5px 12px; font-size: 12px; font-weight: 700; }
      .zoom button.busy { opacity: 0.5; }
      .zoom button.on { background: var(--cp-accent); color: var(--cp-bg); }
      .explain { list-style: none; margin: 8px 0 0; padding: 0; display: grid; gap: 10px; font-size: 13px; line-height: 1.45; }
      .explain li { display: grid; grid-template-columns: 10px 1fr; gap: 10px; padding: 8px 10px; border-radius: 10px;
        background: color-mix(in srgb, var(--tone) 9%, transparent); border-left: 3px solid var(--tone); }
      .explain .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--tone); margin-top: 6px; }
      .ex-hint { color: var(--cp-muted); font-size: 12px; margin-top: 3px; }
      .ex-tip { display: flex; gap: 6px; align-items: flex-start; color: var(--cp-muted); font-size: 12px; margin: 12px 0 0; }
      .ex-tip svg { flex: none; width: 15px; height: 15px; }
      .backdrop { position: fixed; inset: 0; z-index: 30; }
      .cpop { position: fixed; z-index: 31; box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45); padding: 14px; font-size: 13px; line-height: 1.45; }
      .cpop p { margin: 8px 0 0; }
      .cpop-head { flex-wrap: nowrap; align-items: flex-start; }
      .cpop-title { font-weight: 700; font-size: 15px; }
      .cpop-sub { font-size: 12px; }
      .cpop-state { color: var(--cp-accent); font-weight: 600; }
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
let as = yt;
customElements.get("cp-overview") || customElements.define("cp-overview", as);
function ht(r) {
  return JSON.parse(JSON.stringify(r));
}
function lt(r) {
  const { w: e, h: t } = le(r);
  return { x0: r.x, y0: r.y, x1: r.x + e, y1: r.y + t };
}
function ut(r) {
  const e = new Map(r.components.map((h) => [h.id, h])), t = [];
  let s = 0;
  for (const h of r.pipes) {
    const u = Gi(h, e);
    if (u)
      for (let m = 1; m < u.pts.length; m++)
        t.push({ pipe: h.id, a: u.pts[m - 1], b: u.pts[m] }), s += Math.abs(u.pts[m].x - u.pts[m - 1].x) + Math.abs(u.pts[m].y - u.pts[m - 1].y);
  }
  let i = 0, n = 0;
  for (let h = 0; h < t.length; h++)
    for (let u = h + 1; u < t.length; u++) {
      const m = t[h], _ = t[u];
      if (m.pipe === _.pipe) continue;
      const g = m.a.y === m.b.y, y = _.a.y === _.b.y;
      if (g !== y) {
        const w = g ? m : _, b = g ? _ : m, x = Math.min(w.a.x, w.b.x), M = Math.max(w.a.x, w.b.x), P = Math.min(b.a.y, b.b.y), B = Math.max(b.a.y, b.b.y);
        b.a.x > x && b.a.x < M && w.a.y > P && w.a.y < B && i++;
      } else g && m.a.y === _.a.y ? Math.min(Math.max(m.a.x, m.b.x), Math.max(_.a.x, _.b.x)) - Math.max(Math.min(m.a.x, m.b.x), Math.min(_.a.x, _.b.x)) > 0 && n++ : !g && m.a.x === _.a.x && Math.min(Math.max(m.a.y, m.b.y), Math.max(_.a.y, _.b.y)) - Math.max(Math.min(m.a.y, m.b.y), Math.min(_.a.y, _.b.y)) > 0 && n++;
    }
  let o = 0;
  const a = new Map(r.pipes.map((h) => [h.id, /* @__PURE__ */ new Set([h.from.c, h.to.c])])), l = r.components.filter((h) => !["junction", "label"].includes(h.type));
  for (const h of t)
    for (const u of l) {
      if (a.get(h.pipe)?.has(u.id)) continue;
      const m = lt(u), _ = Math.min(h.a.x, h.b.x), g = Math.max(h.a.x, h.b.x), y = Math.min(h.a.y, h.b.y), w = Math.max(h.a.y, h.b.y);
      g > m.x0 && _ < m.x1 && w > m.y0 && y < m.y1 && o++;
    }
  let p = 0;
  for (let h = 0; h < l.length; h++)
    for (let u = h + 1; u < l.length; u++) {
      const m = lt(l[h]), _ = lt(l[u]);
      m.x1 + 1 > _.x0 && _.x1 + 1 > m.x0 && m.y1 + 1 > _.y0 && _.y1 + 1 > m.y0 && p++;
    }
  const d = i * 10 + n * 15 + o * 12 + p * 40 + s * 0.05;
  return { crossings: i + n, overlaps: p, through: o, length: s, total: d };
}
const bi = {
  outdoor_unit: 0,
  indoor_unit: 1,
  pump: 2,
  valve_3way: 2,
  mixer: 2,
  separator: 3,
  expansion_vessel: 4,
  buffer: 3,
  dhw_tank: 5,
  radiators: 1,
  floor_heating: 1,
  tap: 6,
  water_inlet: 7
};
function Lr(r, e, t, s) {
  const i = ht(r), n = i.components.filter((g) => !["label", "value_tile"].includes(g.type)), o = new Map(n.map((g) => [g.id, /* @__PURE__ */ new Set()]));
  for (const g of i.pipes)
    o.get(g.from.c)?.add(g.to.c), o.get(g.to.c)?.add(g.from.c);
  const a = n.find((g) => g.type === "outdoor_unit") || n.find((g) => g.type === "indoor_unit") || n[0], l = /* @__PURE__ */ new Map();
  if (a) {
    l.set(a.id, 0);
    const g = [a.id];
    for (; g.length; ) {
      const y = g.shift();
      for (const w of o.get(y) || [])
        if (!l.has(w)) {
          const b = n.find((M) => M.id === w), x = b.type === "junction" || J[b.type].passive && b.type !== "tap";
          l.set(w, l.get(y) + (x ? 0.5 : 1)), g.push(w);
        }
    }
  }
  for (const g of n) l.has(g.id) || l.set(g.id, 0);
  const d = [...new Set([...l.values()].map((g) => Math.round(g * 2)))].sort((g, y) => g - y).map((g) => n.filter((y) => Math.round(l.get(y.id) * 2) === g)), h = s ? -1 : 1;
  for (const g of d) g.sort((y, w) => h * ((bi[y.type] ?? 5) - (bi[w.type] ?? 5)));
  const u = /* @__PURE__ */ new Map(), m = () => d.forEach((g) => g.forEach((y, w) => u.set(y.id, w / Math.max(1, g.length - 1))));
  m();
  for (let g = 0; g < t; g++)
    for (const y of d) {
      const w = new Map(
        y.map((b) => {
          const x = [...o.get(b.id) || []].filter((M) => u.has(M));
          return [b.id, x.length ? x.reduce((M, P) => M + u.get(P), 0) / x.length : u.get(b.id)];
        })
      );
      y.sort((b, x) => w.get(b.id) - w.get(x.id)), m();
    }
  let _ = 1;
  for (const g of d) {
    const y = Math.max(1, ...g.map((b) => le(b).w));
    let w = 2;
    for (const b of g) {
      const { w: x, h: M } = le(b);
      b.x = Math.round(_ + (y - x) / 2), b.y = w, w += M + e + (J[b.type].badges === "below" ? 3 : 0);
    }
    _ += y + e + 2;
  }
  for (const g of i.pipes)
    delete g.via, delete g.bend;
  return i.grid = { w: Math.max(i.grid.w, _ + 4), h: Math.max(i.grid.h, ...n.map((g) => g.y + le(g).h + 6)) }, i;
}
function Or(r) {
  const e = r.settings?.wizard;
  if (!e) return null;
  const t = r.components.find((u) => u.type === "indoor_unit"), s = (u) => r.components.some((m) => m.type === u), i = {
    ...e,
    indoorModel: t?.model || e.indoorModel,
    dhw: s("dhw_tank") ? "tank" : e.dhw,
    buffer: s("buffer") ? e.buffer === "none" ? "parallel" : e.buffer : "none",
    circulation: s("tap") ? r.components.some((u) => u.id === "circ") : e.circulation
  }, n = Lt(i, r), o = new Map(n.components.map((u) => [u.id, u])), a = ht(r), l = [], p = [];
  for (const u of a.components) {
    const m = o.get(u.id);
    m && m.type === u.type ? (u.x = m.x, u.y = m.y, m.rot !== void 0 ? u.rot = m.rot : delete u.rot, m.flip ? u.flip = !0 : delete u.flip, l.push(u)) : p.push(u);
  }
  const d = (u) => `${u.from.c}.${u.from.p}>${u.to.c}.${u.to.p}`, h = new Map(n.pipes.map((u) => [d(u), u]));
  for (const u of a.pipes) {
    const m = h.get(d(u));
    delete u.bend, m?.via ? u.via = m.via : delete u.via;
  }
  a.grid = { w: Math.max(a.grid.w, n.grid.w), h: Math.max(a.grid.h, n.grid.h) };
  for (const u of p) {
    const { w: m, h: _ } = le(u), g = (w, b) => [...l].every((x) => {
      const M = lt(x);
      return w + m + 2 <= M.x0 || w >= M.x1 + 2 || b + _ + 3 <= M.y0 || b >= M.y1 + 3;
    });
    let y = !1;
    for (let w = 2; w + _ < a.grid.h + 20 && !y; w += 2)
      for (let b = 1; b + m < a.grid.w + 20 && !y; b += 2)
        g(b, w) && (u.x = b, u.y = w, y = !0);
    l.push(u);
  }
  return a;
}
function Hr(r, e = 400) {
  let t = ht(r), s = ut(t).total, i = 12345;
  const n = () => (i = (i * 1103515245 + 12345) % 2147483648) / 2147483648, o = t.components.filter((a) => !["label", "value_tile"].includes(a.type)).map((a) => a.id);
  for (let a = 0; a < e; a++) {
    const l = ht(t), d = new Map(l.components.map((m) => [m.id, m])).get(o[Math.floor(n() * o.length)]), h = n();
    if (h < 0.35) {
      const m = l.components.filter((g) => g.id !== d.id && Math.abs(g.x - d.x) <= 3 && o.includes(g.id));
      if (!m.length) continue;
      const _ = m[Math.floor(n() * m.length)];
      [d.y, _.y] = [_.y, d.y];
    } else {
      const m = [-4, -2, 2, 4][Math.floor(n() * 4)];
      h < 0.7 ? d.y = Math.max(1, d.y + m) : d.x = Math.max(1, d.x + m);
    }
    const u = ut(l).total;
    u < s && (t = l, s = u);
  }
  return t;
}
function Br(r) {
  const e = Or(r), t = [];
  if (e) t.push({ plant: e, kind: "template" });
  else
    for (const i of [3, 5])
      for (const n of [0, 3])
        for (const o of [!1, !0]) t.push({ plant: Lr(r, i, n, o), kind: "layered" });
  let s = null;
  for (const i of t) {
    const n = ut(i.plant);
    (!s || n.total < s.score.total) && (s = { plant: i.plant, kind: i.kind, score: n });
  }
  if (s.kind === "layered" || s.score.crossings > 2) {
    const i = Hr(s.plant), n = ut(i);
    n.total < s.score.total && (s = { plant: i, kind: s.kind, score: n });
  }
  return s;
}
const Vr = [
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
], Rr = ["supply", "return", "dhw_hot", "dhw_cold", "circulation"], Ut = {
  pump: ["running", "!running"],
  mixer: ["running"],
  valve_3way: ["a", "b"],
  outdoor_unit: ["running", "defrost", "!defrost"],
  indoor_unit: ["running", "a", "b", "aux", "pc1"],
  tap: ["flowing"],
  dhw_tank: ["charging"]
};
function We(r) {
  return JSON.parse(JSON.stringify(r));
}
const De = class De extends Y {
  constructor() {
    super(...arguments), this.value = "", this.placeholder = "", this._listId = `cp-ents-${De._uid++}`;
  }
  _change(e) {
    const t = e.target.value.trim();
    this.value = t, this.dispatchEvent(new CustomEvent("value-changed", { detail: t }));
  }
  render() {
    const e = this.hass ? Object.keys(this.hass.states).sort() : [];
    return f`<input
        list=${this._listId}
        .value=${this.value || ""}
        placeholder=${this.placeholder || c("ed.entity_search")}
        @change=${this._change}
      />
      <datalist id=${this._listId}>
        ${e.map((t) => f`<option value=${t}>${this.hass.states[t].attributes.friendly_name || ""}</option>`)}
      </datalist>`;
  }
};
De.properties = { hass: { attribute: !1 }, value: {}, placeholder: {} }, De._uid = 0, De.styles = [se, Q`:host { display: block; min-width: 0; } input { font-size: 12px; padding: 6px 8px; }`];
let ls = De;
customElements.get("cp-entity-picker") || customElements.define("cp-entity-picker", ls);
const xt = class xt extends Y {
  constructor() {
    super(...arguments), this.icons = /* @__PURE__ */ new Map(), this.version = 0, this._sel = null, this._hint = "", this._dirty = !1, this._undo = [], this._redo = [], this._onKey = (e) => {
      const t = e.composedPath()[0]?.tagName;
      t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || ((e.key === "Delete" || e.key === "Backspace") && this._sel ? (e.preventDefault(), this._delete()) : (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z" ? (e.preventDefault(), e.shiftKey ? this._doRedo() : this._doUndo()) : e.key.toLowerCase() === "r" && this._sel?.kind === "c" && this._rotate());
    };
  }
  willUpdate() {
    this.plant && this.plant !== this._source && (this._source = this.plant, this._draft = We(this.plant), this._undo = [], this._redo = [], this._dirty = !1, this._sel = null);
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._onKey);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("keydown", this._onKey);
  }
  // ---------------------------------------------------------- mutations
  _commit(e, t = !0) {
    t && (this._undo.push(JSON.stringify(this._draft)), this._undo.length > 80 && this._undo.shift(), this._redo = []);
    const s = We(this._draft);
    e(s), this._draft = s, this._dirty = !0;
  }
  _doUndo() {
    const e = this._undo.pop();
    e && (this._redo.push(JSON.stringify(this._draft)), this._draft = JSON.parse(e), this._dirty = !0);
  }
  _doRedo() {
    const e = this._redo.pop();
    e && (this._undo.push(JSON.stringify(this._draft)), this._draft = JSON.parse(e), this._dirty = !0);
  }
  _comp(e) {
    return this._draft.components.find((t) => t.id === (e ?? this._sel?.id));
  }
  _pipe(e) {
    return this._draft.pipes.find((t) => t.id === (e ?? this._sel?.id));
  }
  _newId(e) {
    const t = /* @__PURE__ */ new Set([...this._draft.components.map((i) => i.id), ...this._draft.pipes.map((i) => i.id)]);
    let s = 1;
    for (; t.has(`${e}${s}`); ) s++;
    return `${e}${s}`;
  }
  _add(e) {
    const t = J[e], s = this._newId(`${e}_`), i = {
      id: s,
      type: e,
      label: e === "junction" ? "" : c(`type.${e}`),
      ...this._freeSpot(t.variants ? Se({ type: e, props: {} }).w : t.w, t.variants ? Se({ type: e, props: {} }).h : t.h),
      bindings: {},
      props: e === "value_tile" ? { entries: [] } : e === "label" ? { text: c("type.label"), size: 18 } : {}
    };
    e === "pump" && (i.props.role = "other"), this._commit((n) => n.components.push(i)), this._sel = { kind: "c", id: s };
  }
  /** First grid position where a w×h box (plus margin) does not overlap anything. */
  _freeSpot(e, t) {
    const s = this._draft.components.map((n) => ({ c: n, ...le(n) })), i = (n, o) => s.every(({ c: a, w: l, h: p }) => n + e + 1 <= a.x || n >= a.x + l + 1 || o + t + 2 <= a.y || o >= a.y + p + 3);
    for (let n = 1; n + t < this._draft.grid.h; n += 2)
      for (let o = 1; o + e < this._draft.grid.w; o += 2) if (i(o, n)) return { x: o, y: n };
    return { x: 1, y: 1 };
  }
  _delete() {
    const e = this._sel;
    e && (this._commit((t) => {
      e.kind === "c" ? (t.components = t.components.filter((s) => s.id !== e.id), t.pipes = t.pipes.filter((s) => s.from.c !== e.id && s.to.c !== e.id), t.pipes.forEach((s) => {
        s.flow = s.flow?.filter((i) => i.c !== e.id), s.flowAny = s.flowAny?.filter((i) => i.c !== e.id);
      })) : t.pipes = t.pipes.filter((s) => s.id !== e.id);
    }), this._sel = null);
  }
  _rotate() {
    const e = this._comp();
    !e || !J[e.type].rotatable || this._commit((t) => {
      const s = t.components.find((i) => i.id === e.id);
      s.rot = ((s.rot || 0) + 90) % 360;
    });
  }
  _duplicate() {
    const e = this._comp();
    if (!e) return;
    const t = this._newId(`${e.type}_`);
    this._commit((s) => s.components.push({ ...We(e), id: t, x: e.x + 2, y: e.y + 2 })), this._sel = { kind: "c", id: t };
  }
  _connect(e, t) {
    const s = this._comp(e.c), i = this._comp(t.c), n = pe(s, e.p), o = pe(i, t.p), a = n?.def.kind || o?.def.kind || "supply", l = [], p = [s, i].find((h) => h.type === "pump");
    p && l.push({ c: p.id, s: "running" });
    for (const [h, u] of [
      [s, e],
      [i, t]
    ])
      h.type === "valve_3way" && (u.p === "a" || u.p === "b") && l.push({ c: h.id, s: u.p });
    const d = this._newId("p");
    this._commit((h) => h.pipes.push({ id: d, from: e, to: t, kind: a, flow: l })), this._sel = { kind: "p", id: d };
  }
  _set(e, t = !0) {
    const s = this._sel?.id;
    this._commit((i) => {
      const n = i.components.find((o) => o.id === s);
      n && e(n);
    }, t);
  }
  _setPipe(e, t = !0) {
    const s = this._sel?.id;
    this._commit((i) => {
      const n = i.pipes.find((o) => o.id === s);
      n && e(n);
    }, t);
  }
  _autoArrange() {
    const e = Br(this._draft);
    this._commit((t) => {
      t.components = e.plant.components, t.pipes = e.plant.pipes, t.grid = e.plant.grid;
    }), this._sel = null, this._hint = c(e.kind === "template" ? "ed.auto_done_tpl" : "ed.auto_done", { crossings: e.score.crossings }), window.setTimeout(() => this._hint = "", 6e3);
  }
  _save() {
    const e = We(this._draft);
    e.settings = { ...e.settings, layout_edited: !0 }, this.dispatchEvent(new CustomEvent("save", { detail: e, bubbles: !0, composed: !0 })), this._dirty = !1;
  }
  _discard() {
    this._draft = We(this.plant), this._undo = [], this._redo = [], this._dirty = !1, this._sel = null;
  }
  // ------------------------------------------------------------ events
  _onBend(e) {
    const { id: t, bend: s, live: i } = e.detail;
    if (i) {
      this._bendStart || (this._bendStart = JSON.stringify(this._draft));
      const n = We(this._draft), o = n.pipes.find((a) => a.id === t);
      o && (o.bend = s, delete o.via), this._draft = n;
    } else this._bendStart && (this._undo.push(this._bendStart), this._bendStart = void 0, this._dirty = !0);
  }
  // ------------------------------------------------------------ render
  render() {
    if (!this._draft) return v;
    const e = this._sel;
    return f`
      <div class="toolbar">
        <button class="icon" title=${c("undo")} ?disabled=${!this._undo.length} @click=${this._doUndo}>${L("undo")}</button>
        <button class="icon" title=${c("redo")} ?disabled=${!this._redo.length} @click=${this._doRedo}>${L("redo")}</button>
        <button class="icon" title=${c("ed.rotation")} ?disabled=${!(e?.kind === "c" && J[this._comp()?.type || "label"].rotatable)} @click=${this._rotate}>${L("rotate")}</button>
        <button class="icon" title=${c("ed.duplicate")} ?disabled=${e?.kind !== "c"} @click=${this._duplicate}>${L("copy")}</button>
        <button class="icon danger" title=${c("delete")} ?disabled=${!e} @click=${this._delete}>${L("trash")}</button>
        <button title=${c("ed.auto_title")} @click=${this._autoArrange}>${L("wand")} ${c("ed.auto")}</button>
        <span class="hint">${this._hint}</span>
        <span class="spacer"></span>
        ${this._dirty ? f`<span class="dirty">${c("unsaved")}</span>
          <button @click=${this._discard}>${c("discard")}</button>` : v}
        <button class="primary" ?disabled=${!this._dirty} @click=${this._save}>${L("save")} ${c("save")}</button>
      </div>
      <div class="layout">
        <aside class="palette card">
          <div class="cap">${c("ed.palette")}</div>
          ${Vr.map((t) => f`<button class="pal" @click=${() => this._add(t)}>${L("plus")} ${c(`type.${t}`)}</button>`)}
          <div class="cap">${c("ed.grid")}</div>
          <div class="row grid-size">
            <input type="number" min="20" max="200" .value=${String(this._draft.grid.w)} @change=${(t) => this._commit((s) => s.grid.w = Number(t.target.value) || s.grid.w)} />
            ×
            <input type="number" min="20" max="200" .value=${String(this._draft.grid.h)} @change=${(t) => this._commit((s) => s.grid.h = Number(t.target.value) || s.grid.h)} />
          </div>
        </aside>
        <div class="canvas card">
          <cp-schematic
            edit
            .plant=${this._draft}
            .src=${this.src}
            .icons=${this.icons}
            .selected=${e}
            .version=${this.version}
            @cp-select=${(t) => this._sel = t.detail}
            @cp-move=${(t) => this._commit((s) => {
      const i = s.components.find((n) => n.id === t.detail.id);
      i && (i.x = t.detail.x, i.y = t.detail.y);
    })}
            @cp-connect=${(t) => this._connect(t.detail.from, t.detail.to)}
            @cp-bend=${this._onBend}
            @cp-hint=${(t) => this._hint = t.detail}
          ></cp-schematic>
        </div>
        <aside class="props card">${e?.kind === "c" ? this._compProps() : e?.kind === "p" ? this._pipeProps() : f`<p class="muted">${c("ed.nothing")}</p>`}</aside>
      </div>
    `;
  }
  _num(e, t, s, i = 1) {
    return f`<label class="field">${e}<input type="number" step=${i} .value=${t ?? ""} @change=${(n) => s(Number(n.target.value))} /></label>`;
  }
  _compProps() {
    const e = this._comp();
    if (!e) return v;
    const t = J[e.type], s = new Set(e.show ?? ce(e).filter((n) => n.show).map((n) => n.key)), i = [...this.icons.values()];
    return f`
      <div class="ptitle">${c(`type.${e.type}`)} <code>${e.id}</code></div>
      ${e.type !== "junction" ? f`<label class="field">${c("ed.label")}<input .value=${e.label} @change=${(n) => this._set((o) => o.label = n.target.value)} /></label>` : v}
      ${e.type === "outdoor_unit" ? f`<label class="field">${c("ed.model")}<select @change=${(n) => this._set((o) => o.model = n.target.value)}>
              ${pt.map((n) => f`<option value=${n.id} ?selected=${n.id === e.model}>${n.label}</option>`)}
            </select></label>
            ${this._num(c("ed.nominal"), e.props.nominal_kw, (n) => this._set((o) => o.props.nominal_kw = n), 0.1)}
            ${this._num(c("ed.cop_ref"), e.props.cop_ref ?? 4.9, (n) => this._set((o) => o.props.cop_ref = n), 0.1)}` : v}
      ${e.type === "indoor_unit" ? f`<label class="field">${c("ed.model")}<select @change=${(n) => this._set((o) => o.model = n.target.value)}>
              ${Ms.map((n) => f`<option value=${n.id} ?selected=${n.id === e.model}>${n.label}</option>`)}
            </select></label>
            ${this._num(c("wz.aux_kw"), e.props.aux_kw, (n) => this._set((o) => o.props.aux_kw = n), 1)}
            <div class="cap">${c("ed.input_labels")}</div>
            ${[1, 2, 3, 4].map(
      (n) => f`<label class="field">${c(`slot.input${n}`)}<input .value=${e.props.input_labels?.[`input${n}`] || ""}
                @change=${(o) => this._set((a) => a.props.input_labels = { ...a.props.input_labels || {}, [`input${n}`]: o.target.value })} /></label>`
    )}
            <div class="cap">${c("ed.pressure_limits")}</div>
            <div class="two">
              ${this._num("min", e.props.pressure_min ?? 1, (n) => this._set((o) => o.props.pressure_min = n), 0.1)}
              ${this._num("max", e.props.pressure_max ?? 2.7, (n) => this._set((o) => o.props.pressure_max = n), 0.1)}
            </div>` : v}
      ${e.type === "buffer" || e.type === "dhw_tank" ? this._num(c("ed.volume"), e.props.volume, (n) => this._set((o) => o.props.volume = n)) : v}
      ${t.roles ? f`<label class="field">${c("ed.role")}<select @change=${(n) => this._set((o) => o.props.role = n.target.value)}>
            ${t.roles.map((n) => f`<option value=${n} ?selected=${e.props.role === n}>${c(`role.${n}`)}</option>`)}
          </select></label>` : v}
      ${["radiators", "floor_heating", "mixer", "pump"].includes(e.type) ? this._num(c("ed.circuit"), e.props.circuit ?? 1, (n) => this._set((o) => o.props.circuit = n)) : v}
      ${e.type === "dhw_tank" ? this._num(c("ed.dhw_circuit"), e.props.dhw_circuit ?? 1, (n) => this._set((o) => o.props.dhw_circuit = n)) : v}
      ${e.type === "label" ? f`<label class="field">${c("ed.text")}<input .value=${e.props.text || ""} @change=${(n) => this._set((o) => o.props.text = n.target.value)} /></label>
            ${this._num("px", e.props.size || 18, (n) => this._set((o) => o.props.size = n))}` : v}
      ${t.rotatable ? f`<label class="field">${c("ed.rotation")}<select @change=${(n) => this._set((o) => o.rot = Number(n.target.value))}>
            ${[0, 90, 180, 270].map((n) => f`<option value=${n} ?selected=${(e.rot || 0) === n}>${n}°</option>`)}
          </select></label>` : v}
      ${t.mirrorable ? f`<label class="field check"><input type="checkbox" .checked=${!!e.flip} @change=${(n) => this._set((o) => {
      n.target.checked ? o.flip = !0 : delete o.flip;
    })} />${c("ed.flip")}</label>` : v}
      ${["junction", "label", "value_tile"].includes(e.type) ? v : f`<label class="field">${c("ed.icon")}<select @change=${(n) => this._set((o) => {
      const a = n.target.value;
      a ? o.icon = a : delete o.icon;
    })}>
            <option value="">${c("ed.icon_default")}</option>
            ${i.map((n) => f`<option value=${n.id} ?selected=${n.id === e.icon}>${n.name}</option>`)}
          </select></label>`}
      ${e.type === "value_tile" ? this._tileEntries(e) : this._bindings(e, s)}
    `;
  }
  _bindings(e, t) {
    const s = ce(e);
    return s.length ? f`<div class="cap">${c("ed.bindings")}</div>
      <div class="bindings">
        ${s.map((i) => {
      const n = this.src.get(e, i.key), { text: o, unit: a } = xe(n, i.kind);
      return f`<div class="bind">
            <div class="bhead">
              <label class="show" title=${c("ed.show")}><input type="checkbox" .checked=${t.has(i.key)}
                @change=${(l) => this._set((p) => {
        const d = new Set(p.show ?? ce(p).filter((h) => h.show).map((h) => h.key));
        l.target.checked ? d.add(i.key) : d.delete(i.key), p.show = ce(p).map((h) => h.key).filter((h) => d.has(h));
      })} /></label>
              <span class="bname">${ve(e.type, i.key)}</span>
              <span class="bval">${n ? `${o} ${a}` : ""}</span>
              ${Vi(e.bindings[i.key]) ? f`<label class="wr" title=${c("wr.release")}><input type="checkbox" .checked=${(e.writable || []).includes(i.key)}
                    @change=${(l) => this._set((p) => {
        const d = new Set(p.writable || []);
        l.target.checked ? d.add(i.key) : d.delete(i.key), d.size ? p.writable = [...d] : delete p.writable;
      })} />✎</label>` : v}
            </div>
            <cp-entity-picker .hass=${this.hass} .value=${e.bindings[i.key] || ""}
              @value-changed=${(l) => this._set((p) => {
        l.detail ? p.bindings[i.key] = l.detail : delete p.bindings[i.key];
      })}></cp-entity-picker>
          </div>`;
    })}
      </div>` : v;
  }
  _tileEntries(e) {
    const t = e.props.entries || [], s = ["temp", "power_kw", "power_w", "energy", "percent", "pressure", "flow", "count", "bool", "text"];
    return f`<div class="cap">${c("ed.entries")}</div>
      ${t.map(
      (i, n) => f`<div class="bind">
          <div class="two">
            <input .value=${i.label || ""} placeholder=${c("ed.label")} @change=${(o) => this._set((a) => a.props.entries[n].label = o.target.value)} />
            <select @change=${(o) => this._set((a) => a.props.entries[n].kind = o.target.value)}>
              ${s.map((o) => f`<option value=${o} ?selected=${i.kind === o}>${o}</option>`)}
            </select>
          </div>
          <div class="row nowrap">
            <cp-entity-picker .hass=${this.hass} .value=${i.entity || ""}
              @value-changed=${(o) => this._set((a) => a.props.entries[n].entity = o.detail)}></cp-entity-picker>
            <button class="icon danger" @click=${() => this._set((o) => o.props.entries.splice(n, 1))}>${L("trash")}</button>
          </div>
        </div>`
    )}
      <button @click=${() => this._set((i) => {
      i.props.entries = [...i.props.entries || [], { slot: `v${Date.now().toString(36)}`, label: "", entity: "", kind: "text" }];
    })}>${L("plus")} ${c("ed.add_entry")}</button>`;
  }
  _conds(e, t) {
    const s = this._draft.components.filter((i) => Ut[i.type]);
    return f`${(e || []).map(
      (i, n) => f`<div class="row nowrap cond">
          <select @change=${(o) => this._setPipe((a) => a[t][n].c = o.target.value)}>
            ${s.map((o) => f`<option value=${o.id} ?selected=${o.id === i.c}>${o.label || o.id}</option>`)}
          </select>
          <select @change=${(o) => this._setPipe((a) => a[t][n].s = o.target.value)}>
            ${(Ut[this._comp(i.c)?.type || "pump"] || []).map(
        (o) => f`<option value=${o} ?selected=${o === i.s}>${o.startsWith("!") ? `${c("ed.not")} ${c(`state.${o.slice(1)}`)}` : c(`state.${o}`)}</option>`
      )}
          </select>
          <button class="icon danger" @click=${() => this._setPipe((o) => o[t].splice(n, 1))}>${L("close")}</button>
        </div>`
    )}
      <button ?disabled=${!s.length} @click=${() => this._setPipe((i) => {
      const n = s[0];
      i[t] = [...i[t] || [], { c: n.id, s: Ut[n.type][0] }];
    })}>${L("plus")} ${c("ed.add_cond")}</button>`;
  }
  _pipeProps() {
    const e = this._pipe();
    if (!e) return v;
    const t = (s) => this._comp(s)?.label || s;
    return f`
      <div class="ptitle">${c("ed.pipe")} <code>${e.id}</code></div>
      <p class="muted small">${t(e.from.c)} · ${e.from.p} → ${t(e.to.c)} · ${e.to.p}</p>
      <label class="field">${c("ed.kind")}<select @change=${(s) => this._setPipe((i) => i.kind = s.target.value)}>
        ${Rr.map((s) => f`<option value=${s} ?selected=${s === e.kind}>${c(`kind.${s}`)}</option>`)}
      </select></label>
      <div class="cap">${c("ed.flow_when")}</div>
      ${this._conds(e.flow, "flow")}
      <div class="cap">${c("ed.or")}</div>
      ${this._conds(e.flowAny, "flowAny")}
      <div class="cap">${c("ed.bindings")}</div>
      <label class="field">${c("ed.temp_entity")}
        <cp-entity-picker .hass=${this.hass} .value=${e.bindings?.temp || ""}
          @value-changed=${(s) => this._setPipe((i) => i.bindings = { ...i.bindings || {}, temp: s.detail || void 0 })}></cp-entity-picker></label>
      <div class="row" style="margin-top:12px">
        <button ?disabled=${e.bend === void 0 && !e.via} @click=${() => this._setPipe((s) => {
      delete s.bend, delete s.via;
    })}>${c("ed.reset_bend")}</button>
      </div>
    `;
  }
};
xt.properties = {
  plant: { attribute: !1 },
  hass: { attribute: !1 },
  src: { attribute: !1 },
  icons: { attribute: !1 },
  version: { type: Number },
  _draft: { state: !0 },
  _sel: { state: !0 },
  _hint: { state: !0 },
  _dirty: { state: !0 }
}, xt.styles = [
  se,
  Q`
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
      .wr { display: inline-flex; align-items: center; gap: 2px; font-size: 12px; color: var(--cp-warn); cursor: pointer; }
      .wr input { width: auto; margin: 0; }
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
let cs = xt;
customElements.get("cp-editor") || customElements.define("cp-editor", cs);
const Nr = {
  mode: "fixed",
  price: 0.32,
  feed_in: 0.08,
  gas_price: 0.12,
  gas_eff: 90
};
function Ws(r) {
  return { ...Nr, ...r.settings.tariff || {} };
}
function Ir(r) {
  const e = (r || "").toLowerCase();
  return e === "kw" ? 1 : e === "mw" ? 1e3 : 1e-3;
}
function Yi(r, e, t, s, i) {
  if (r <= 0) return 0;
  const n = Math.max(0, e), o = t !== void 0 ? t + s + (i ? 0 : r) : r + s;
  return o <= 0.01 ? r : r * Math.min(1, n / o);
}
async function Kr(r, e, t) {
  const i = e.components.find((b) => b.type === "outdoor_unit")?.bindings.el_power, n = e.settings.energy, o = Ws(e), a = /* @__PURE__ */ new Map();
  if (!i) return { hours: a, share: !1 };
  const l = [i, n?.grid, n?.house, n?.wallbox, o.mode === "entity" ? o.price_entity : void 0].filter((b) => !!b), p = await r.callWS({
    type: "recorder/statistics_during_period",
    start_time: new Date(ke(/* @__PURE__ */ new Date()) - t * 864e5).toISOString(),
    end_time: (/* @__PURE__ */ new Date()).toISOString(),
    statistic_ids: l,
    period: "hour",
    types: ["mean"]
  }), d = (b) => {
    const x = /* @__PURE__ */ new Map();
    if (!b) return x;
    const M = Ir(r.states[b]?.attributes?.unit_of_measurement);
    for (const P of p[b] || []) P.mean !== null && P.mean !== void 0 && x.set(P.start, P.mean * M);
    return x;
  }, h = d(i), u = (b, x) => x ? -b : b, m = d(n?.enabled ? n.grid : void 0), _ = d(n?.enabled ? n.house : void 0), g = d(n?.enabled ? n.wallbox : void 0), y = /* @__PURE__ */ new Map();
  if (o.mode === "entity" && o.price_entity)
    for (const b of p[o.price_entity] || []) b.mean != null && y.set(b.start, b.mean);
  const w = m.size > 0;
  for (const [b, x] of h) {
    const M = m.get(b), P = M === void 0 ? x : Yi(x, u(M, n?.grid_invert), _.get(b), g.get(b) ?? 0, n?.house_includes_hp !== !1);
    a.set(b, { hp: x, grid: P, price: y.get(b) });
  }
  return { hours: a, share: w };
}
function Fr(r) {
  const e = (a) => r.history("energy", a, 24), t = e("hp_power"), s = e("grid_power"), i = e("house_power"), n = e("wallbox_power"), o = /* @__PURE__ */ new Map();
  return t.forEach((a, l) => {
    const p = Math.floor(a.t * 1e3 / 36e5) * 36e5, d = (a.v ?? 0) / 1e3, h = Yi(d, (s[l]?.v ?? 0) / 1e3, (i[l]?.v ?? 0) / 1e3, (n[l]?.v ?? 0) / 1e3, !1), u = o.get(p) || { hp: 0, grid: 0 };
    u.hp += d / 60, u.grid += h / 60, o.set(p, u);
  }), o;
}
function Zt(r, e, t, s, i) {
  const n = Ws(s), o = /* @__PURE__ */ new Map();
  for (const [a, l] of e) {
    const p = ke(new Date(a)), d = o.get(p) || { hp: 0, grid: 0, priced: 0, gridForPrice: 0 };
    d.hp += l.hp, d.grid += l.grid, l.price !== void 0 && (d.priced += l.grid * l.price, d.gridForPrice += l.grid), o.set(p, d);
  }
  return r.map((a) => {
    const l = o.get(a.day);
    let p, d = !1;
    l && l.hp > 0.05 && (t || i) ? p = Math.min(1, l.grid / l.hp) : i ? (p = Math.max(0.45, Math.min(0.92, 0.6 + a.el / 60)), d = !0) : p = 1;
    const h = l && l.gridForPrice > 0.01 ? l.priced / l.gridForPrice : n.price, u = a.el * p, m = a.el - u;
    return {
      day: a.day,
      el: a.el,
      grid: u,
      self: m,
      heat: a.heat,
      cost: u * h,
      feedLoss: m * n.feed_in,
      gas: a.heat / Math.max(0.5, n.gas_eff / 100) * n.gas_price,
      estimated: d,
      noShare: !t && !i
    };
  });
}
async function jr(r, e, t, s) {
  if (!r.length) return [];
  if (t) return Zt(r, Fr(t), !0, e, !0);
  if (!s) return Zt(r, /* @__PURE__ */ new Map(), !1, e, !1);
  const { hours: i, share: n } = await Kr(s, e, 31);
  return Zt(r, i, n, e, !1);
}
function Gt(r) {
  if (!r.length) return null;
  const e = { el: 0, grid: 0, self: 0, heat: 0, cost: 0, feedLoss: 0, gas: 0, estimated: !1, noShare: !1 };
  for (const t of r)
    e.el += t.el, e.grid += t.grid, e.self += t.self, e.heat += t.heat, e.cost += t.cost, e.feedLoss += t.feedLoss, e.gas += t.gas, e.estimated ||= t.estimated, e.noShare ||= t.noShare;
  return e;
}
function he(r, e, t) {
  r.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
}
const $t = class $t extends Y {
  constructor() {
    super(...arguments), this.plant = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._cfg = structuredClone(this.plant?.settings?.wizard || Xt());
  }
  _upd(e) {
    this._cfg = { ...this._cfg, ...e };
  }
  _generate() {
    this.plant && !confirm(c("wz.replace_confirm")) || he(this, "plant-generated", Lt(this._cfg, this.plant));
  }
  render() {
    const e = this._cfg, t = (s, i = "text") => f`<input type=${i} .value=${String(e[s] ?? "")}
      @change=${(n) => {
      const o = n.target.value;
      this._upd({ [s]: i === "number" ? Number(o) : o });
    }} />`;
    return f`
      <div class="card wrap">
        <h2>${c("wz.title")}</h2>
        <p class="muted">${c("wz.intro")}</p>
        <label class="field">${c("wz.name")} ${t("name")}</label>

        <h3>${c("wz.hp")}</h3>
        <div class="grid">
          <label class="field">${c("wz.outdoor")}
            <select @change=${(s) => this._upd({ outdoorModel: s.target.value })}>
              ${pt.map((s) => f`<option value=${s.id} ?selected=${s.id === e.outdoorModel}>${s.label}</option>`)}
            </select></label>
          <label class="field">${c("ed.label")} ${t("outdoorLabel")}</label>
          <label class="field">${c("ed.nominal")} ${t("nominalKw", "number")}</label>
          <label class="field">${c("wz.indoor")}
            <select @change=${(s) => this._upd({ indoorModel: s.target.value })}>
              ${Ms.map((s) => f`<option value=${s.id} ?selected=${s.id === e.indoorModel}>${s.label}</option>`)}
            </select></label>
          <label class="field">${c("ed.label")} ${t("indoorLabel")}</label>
          <div class="field check">
            <label><input type="checkbox" .checked=${e.aux} @change=${(s) => this._upd({ aux: s.target.checked })} /> ${c("wz.aux")}</label>
            ${e.aux ? f`<label class="field">${c("wz.aux_kw")} ${t("auxKw", "number")}</label>` : v}
          </div>
        </div>

        <h3>${c("wz.buffer")}</h3>
        <div class="grid">
          <div class="radios">
            ${["parallel", "serial", "none"].map(
      (s) => f`<label><input type="radio" name="buf" .checked=${e.buffer === s} @change=${() => this._upd({ buffer: s })} /> ${c(`wz.buffer.${s}`)}</label>`
    )}
          </div>
          ${e.buffer !== "none" ? f`<label class="field">${c("wz.buffer_volume")} ${t("bufferVolume", "number")}</label>
                <label class="field">${c("ed.label")} ${t("bufferLabel")}</label>` : v}
        </div>

        <h3>${c("wz.dhw")}</h3>
        <div class="grid">
          <div class="radios">
            ${["tank", "none"].map(
      (s) => f`<label><input type="radio" name="dhw" .checked=${e.dhw === s} @change=${() => this._upd({ dhw: s })} /> ${c(`wz.dhw.${s}`)}</label>`
    )}
          </div>
          ${e.dhw === "tank" ? f`<label class="field">${c("wz.dhw_volume")} ${t("dhwVolume", "number")}</label>
                <label class="field">${c("ed.label")} ${t("dhwLabel")}</label>
                <label class="check"><input type="checkbox" .checked=${e.circulation} @change=${(s) => this._upd({ circulation: s.target.checked })} /> ${c("wz.circulation")}</label>` : v}
        </div>

        <h3>${c("wz.circuits")}</h3>
        ${e.circuits.map(
      (s, i) => f`<div class="circuit">
            <b>${c("wz.circuit", { n: i + 1 })}</b>
            <input .value=${s.label} @change=${(n) => this._circ(i, { label: n.target.value })} />
            <select @change=${(n) => this._circ(i, { emitter: n.target.value })}>
              <option value="radiators" ?selected=${s.emitter === "radiators"}>${c("type.radiators")}</option>
              <option value="floor_heating" ?selected=${s.emitter === "floor_heating"}>${c("type.floor_heating")}</option>
            </select>
            <label class="check"><input type="checkbox" .checked=${s.mixed} @change=${(n) => this._circ(i, { mixed: n.target.checked })} /> ${c("wz.mixed")}</label>
            <button class="ghost danger" ?disabled=${e.circuits.length < 2} @click=${() => this._upd({ circuits: e.circuits.filter((n, o) => o !== i) })}>${c("wz.remove")}</button>
          </div>`
    )}
        <button ?disabled=${e.circuits.length >= 4} @click=${() => this._upd({ circuits: [...e.circuits, { emitter: "floor_heating", mixed: !0, label: c("wz.circuit", { n: e.circuits.length + 1 }) }] })}>
          ${L("plus")} ${c("wz.add_circuit")}</button>

        <h3>${c("wz.extras")}</h3>
        <div class="radios">
          <label><input type="checkbox" .checked=${e.separator} @change=${(s) => this._upd({ separator: s.target.checked })} /> ${c("wz.separator")}</label>
          <label><input type="checkbox" .checked=${e.expansion} @change=${(s) => this._upd({ expansion: s.target.checked })} /> ${c("wz.expansion")}</label>
        </div>

        <div class="row actions">
          <button @click=${() => this._cfg = Xt()}>${c("wz.example")}</button>
          <span class="spacer"></span>
          <button class="primary" @click=${this._generate}>${L("wand")} ${c("wz.generate")}</button>
        </div>
      </div>
    `;
  }
  _circ(e, t) {
    const s = this._cfg.circuits.map((i, n) => n === e ? { ...i, ...t } : i);
    this._upd({ circuits: s });
  }
};
$t.properties = { plant: { attribute: !1 }, _cfg: { state: !0 } }, $t.styles = [
  se,
  Q`
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
let ps = $t;
const kt = class kt extends Y {
  constructor() {
    super(...arguments), this._res = null, this._sel = /* @__PURE__ */ new Set(), this._busy = !1, this._msg = "";
  }
  async _scan() {
    this._busy = !0;
    try {
      this._res = await this.api.scan(this.plant), this._sel = new Set(
        this._res.suggestions.filter((e) => !this._comp(e.component_id)?.bindings[e.slot]).map((e) => `${e.component_id}|${e.slot}`)
      );
    } finally {
      this._busy = !1;
    }
  }
  _comp(e) {
    return this.plant.components.find((t) => t.id === e);
  }
  _apply() {
    if (!this._res) return;
    const e = structuredClone(this.plant);
    let t = 0;
    for (const s of this._res.suggestions) {
      if (!this._sel.has(`${s.component_id}|${s.slot}`)) continue;
      const i = e.components.find((n) => n.id === s.component_id);
      i && (i.bindings[s.slot] = s.entity_id, t++);
    }
    he(this, "save", e), this._msg = c("map.applied", { count: t });
  }
  render() {
    const e = !!this.hass?.__standalone, t = this._res, s = this.plant.components.flatMap(
      (i) => ce(i).filter((n) => !i.bindings[n.key] && !t?.suggestions.some((o) => o.component_id === i.id && o.slot === n.key)).map((n) => ({ c: i, s: n }))
    );
    return f`<div class="card">
      <h2>${c("map.title")}</h2>
      <p class="muted">${c("map.intro")}</p>
      ${e ? f`<p class="muted">${c("map.standalone")}</p>` : v}
      <div class="row">
        <button class="primary" ?disabled=${this._busy || e} @click=${this._scan}>${L("search")} ${c("map.scan")}</button>
        ${t ? f`<span class="muted">${c("map.found", { count: t.entity_count })}</span>` : v}
        <span class="spacer"></span>
        ${this._msg ? f`<span class="ok">${L("check")} ${this._msg}</span>` : v}
      </div>
      ${t && t.entity_count === 0 ? f`<div class="help"><b>${c("map.none")}</b><p>${c("map.none_help")}</p></div>` : v}
      ${t && t.suggestions.length ? f`<div class="tbl">
            <table>
              <thead><tr>
                <th><input type="checkbox" .checked=${this._sel.size === t.suggestions.length}
                  @change=${(i) => this._sel = i.target.checked ? new Set(t.suggestions.map((n) => `${n.component_id}|${n.slot}`)) : /* @__PURE__ */ new Set()} /></th>
                <th>${c("map.component")}</th><th>${c("map.slot")}</th><th>${c("map.entity")}</th><th>${c("map.value")}</th><th>${c("map.confidence")}</th>
              </tr></thead>
              <tbody>
                ${t.suggestions.map((i) => {
      const n = `${i.component_id}|${i.slot}`, o = this._comp(i.component_id), a = o?.bindings[i.slot], l = this.hass?.states[i.entity_id];
      return f`<tr>
                    <td><input type="checkbox" .checked=${this._sel.has(n)} @change=${(p) => {
        const d = new Set(this._sel);
        p.target.checked ? d.add(n) : d.delete(n), this._sel = d;
      }} /></td>
                    <td>${o?.label || i.component_id}</td>
                    <td>${ve(o?.type || "", i.slot)}</td>
                    <td><code>${i.entity_id}</code>${a && a !== i.entity_id ? f`<div class="muted small">${c("map.current")}: ${a}</div>` : v}</td>
                    <td>${l ? `${l.state} ${l.attributes.unit_of_measurement || ""}` : "–"}</td>
                    <td><span class="conf ${i.confidence}">${c(`map.conf.${i.confidence}`)}</span></td>
                  </tr>`;
    })}
              </tbody>
            </table>
          </div>
          <div class="row"><span class="spacer"></span><button class="primary" ?disabled=${!this._sel.size} @click=${this._apply}>${c("map.apply")} (${this._sel.size})</button></div>` : v}
      <h3>${c("map.unbound")}</h3>
      <p class="muted small">${c("map.unbound_hint")}</p>
      <div class="chips">${s.slice(0, 80).map(({ c: i, s: n }) => f`<span class="chip">${i.label || i.id}: ${ve(i.type, n.key)}</span>`)}</div>
    </div>`;
  }
};
kt.properties = {
  plant: { attribute: !1 },
  hass: { attribute: !1 },
  api: { attribute: !1 },
  _res: { state: !0 },
  _sel: { state: !0 },
  _busy: { state: !0 },
  _msg: { state: !0 }
}, kt.styles = [
  se,
  Q`
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
let ds = kt;
const Ur = ["outdoor_unit", "indoor_unit", "buffer", "dhw_tank", "pump", "valve_3way", "mixer", "radiators", "floor_heating", "tap", "separator", "expansion_vessel"], St = class St extends Y {
  constructor() {
    super(...arguments), this.icons = /* @__PURE__ */ new Map(), this._err = "", this._iso = !1;
  }
  async _upload(e) {
    const t = e.target, s = t.files?.[0];
    if (t.value = "", !s) return;
    if (this._err = "", s.size > 256 * 1024) {
      this._err = c("ic.err.too_large");
      return;
    }
    const i = await new Promise((n, o) => {
      const a = new FileReader();
      a.onload = () => n(String(a.result).split(",")[1] || ""), a.onerror = () => o(a.error), a.readAsDataURL(s);
    });
    try {
      await this.api.uploadIcon(s.name.replace(/\.[^.]+$/, ""), s.type || "image/svg+xml", i, this._iso), he(this, "icons-changed");
    } catch (n) {
      const o = n?.code || n?.error?.code || "invalid_data";
      this._err = c(`ic.err.${o}`);
    }
  }
  async _delete(e) {
    await this.api.deleteIcon(e), he(this, "icons-changed");
  }
  _typeDefault(e, t) {
    const s = structuredClone(this.plant);
    s.settings.typeIcons = { ...s.settings.typeIcons || {} }, t ? s.settings.typeIcons[e] = t : delete s.settings.typeIcons[e], he(this, "save", s);
  }
  render() {
    const e = [...this.icons.values()];
    return f`<div class="card">
      <h2>${c("ic.title")}</h2>
      <p class="muted">${c("ic.intro")}</p>
      <div class="row">
        <label class="btn primary up">${L("upload")} ${c("ic.upload")}
          <input type="file" accept=".svg,.png,.webp,.jpg,.jpeg,image/svg+xml,image/png,image/webp,image/jpeg" @change=${this._upload} hidden /></label>
        <label class="row small"><input type="checkbox" .checked=${this._iso} @change=${(t) => this._iso = t.target.checked} /> ${c("ic.iso")}</label>
        ${this._err ? f`<span class="err">${this._err}</span>` : v}
      </div>
      ${e.length ? f`<div class="gallery">${e.map(
      (t) => f`<div class="ic">
              <div class="prev"><img src=${t.data_url} alt=${t.name} /></div>
              <div class="name">${t.name}${t.iso ? f` <span class="muted">· iso</span>` : v}</div>
              <button class="ghost danger icon" @click=${() => this._delete(t.id)}>${L("trash")}</button>
            </div>`
    )}</div>` : f`<p class="muted">${c("ic.empty")}</p>`}
      <h3>${c("ic.type_default")}</h3>
      <div class="defaults">
        ${Ur.map(
      (t) => f`<label class="field">${c(`type.${t}`)}
            <select @change=${(s) => this._typeDefault(t, s.target.value)}>
              <option value="">${c("ed.icon_default")}</option>
              ${e.map((s) => f`<option value=${s.id} ?selected=${this.plant.settings.typeIcons?.[t] === s.id}>${s.name}</option>`)}
            </select></label>`
    )}
      </div>
    </div>`;
  }
};
St.properties = { plant: { attribute: !1 }, api: { attribute: !1 }, icons: { attribute: !1 }, _err: { state: !0 }, _iso: { state: !0 } }, St.styles = [
  se,
  Q`
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
let hs = St;
const Mt = class Mt extends Y {
  constructor() {
    super(...arguments), this.version = "", this._backups = null, this._tariff = null, this._bmsg = "", this._energy = null, this._note = "";
  }
  _tariffSection() {
    const e = { ...Ws(this.plant), ...this._tariff || {} }, t = (i) => this._tariff = { ...this._tariff || {}, ...i }, s = (i, n, o) => f`<label class="field">${n}<input type="number" step=${o} min="0" .value=${String(e[i])}
        @change=${(a) => t({ [i]: Number(a.target.value) })} /></label>`;
    return f`<div class="card wrap">
      <h2>${c("st.tariff")}</h2>
      <p class="muted">${c("st.tariff_hint")}</p>
      <div class="grid2">
        <label class="field">${c("st.t_mode")}
          <select @change=${(i) => t({ mode: i.target.value })}>
            <option value="fixed" ?selected=${e.mode === "fixed"}>${c("st.t_fixed")}</option>
            <option value="entity" ?selected=${e.mode === "entity"}>${c("st.t_entity")}</option>
          </select></label>
        ${e.mode === "entity" ? f`<label class="field">${c("st.t_entity_pick")}
              <cp-entity-picker .hass=${this.hass} .value=${e.price_entity || ""} @value-changed=${(i) => t({ price_entity: i.detail || void 0 })}></cp-entity-picker></label>` : s("price", c("st.t_price"), "0.01")}
        ${s("feed_in", c("st.t_feed_in"), "0.001")}
        ${s("gas_price", c("st.t_gas"), "0.01")}
        ${s("gas_eff", c("st.t_gas_eff"), "1")}
      </div>
      <div class="row"><span class="spacer"></span>
        <button class="primary" ?disabled=${!this._tariff} @click=${() => {
      this._patch({ tariff: { ...this.plant.settings.tariff || {}, ...this._tariff } }), this._tariff = null;
    }}>${L("save")} ${c("st.save")}</button></div>
    </div>`;
  }
  connectedCallback() {
    super.connectedCallback(), this._loadBackups();
  }
  async _loadBackups() {
    try {
      this._backups = this.api ? await this.api.listBackups() : [];
    } catch {
      this._backups = [];
    }
  }
  async _restore(e) {
    if (!(!this.api || !confirm(c("bk.restore_confirm", { date: new Date(e.ts * 1e3).toLocaleString() }))))
      try {
        const t = await this.api.restoreBackup(e.ts);
        he(this, "plant-restored", t), this._bmsg = c("bk.restored"), await this._loadBackups();
      } catch (t) {
        this._bmsg = t?.message || String(t);
      }
  }
  _export() {
    const e = new Blob([JSON.stringify(this.plant, null, 2)], { type: "application/json" }), t = document.createElement("a"), s = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), i = (this.plant.name || "plant").replace(/[^\w-]+/g, "_");
    t.href = URL.createObjectURL(e), t.download = `copilot-${i}-${s}.json`, t.click(), setTimeout(() => URL.revokeObjectURL(t.href), 1e3);
  }
  async _import(e) {
    const t = e.target, s = t.files?.[0];
    if (t.value = "", !!s)
      try {
        const i = JSON.parse(await s.text());
        if (!Array.isArray(i.components) || !Array.isArray(i.pipes) || !i.grid) throw new Error(c("bk.invalid"));
        if (!confirm(c("bk.import_confirm", { name: i.name || s.name, n: i.components.length }))) return;
        i.settings = { ...this.plant.settings, ...i.settings || {} }, he(this, "save", i), this._bmsg = c("bk.imported"), setTimeout(() => this._loadBackups(), 800);
      } catch (i) {
        this._bmsg = `${c("bk.invalid")} (${i?.message || i})`;
      }
  }
  _backupSection() {
    const e = (t) => c(`bk.reason.${t}`);
    return f`<div class="card wrap">
      <h2>${c("bk.title")}</h2>
      <p class="muted">${c("bk.hint")}</p>
      <div class="row">
        <button @click=${this._export}>${L("download")} ${c("bk.export")}</button>
        <label class="filebtn">${L("upload")} ${c("bk.import")}
          <input type="file" accept="application/json,.json" @change=${this._import} /></label>
        ${this._bmsg ? f`<span class="muted">${this._bmsg}</span>` : v}
      </div>
      ${this._backups === null ? v : this._backups.length ? f`<ul class="backups">
              ${this._backups.map(
      (t) => f`<li>
                  <div><b>${new Date(t.ts * 1e3).toLocaleString()}</b>
                    <span class="muted"> · ${e(t.reason)}${t.version ? ` · v${t.version}` : ""} · ${c("bk.components", { n: t.components })}</span></div>
                  <button @click=${() => this._restore(t)}>${L("undo")} ${c("bk.restore")}</button>
                </li>`
    )}
            </ul>` : f`<p class="muted">${c(this.api?.standalone ? "bk.demo" : "bk.none")}</p>`}
    </div>`;
  }
  _en() {
    return this._energy ?? this.plant.settings.energy ?? {};
  }
  _setEn(e) {
    this._energy = { ...this._en(), ...e };
  }
  _detect() {
    if (!this.hass) return;
    const e = or(this.hass), t = Object.entries(e).some(([s, i]) => typeof i == "string" && s !== "enabled");
    this._energy = { ...this._en(), ...e }, this._note = c(t ? "st.energy_detected" : "st.energy_none");
  }
  _saveEnergy() {
    this._patch({ energy: this._en() }), this._energy = null, this._note = "";
  }
  _energySection() {
    const e = this._en(), t = (i, n) => f`<label class="field">${n}
        <cp-entity-picker .hass=${this.hass} .value=${e[i] || ""}
          @value-changed=${(o) => this._setEn({ [i]: o.detail || void 0 })}></cp-entity-picker></label>`, s = (i, n, o = !1) => f`<label class="check"><input type="checkbox" .checked=${e[i] ?? o}
        @change=${(a) => this._setEn({ [i]: a.target.checked })} />${n}</label>`;
    return f`<div class="card wrap">
      <h2>${c("st.energy")}</h2>
      <p class="muted">${c("st.energy_hint")}</p>
      ${s("enabled", c("st.energy_enabled"))}
      ${this.hass && !this.hass.__standalone ? f`<div class="row"><button @click=${this._detect}>${L("search")} ${c("st.energy_detect")}</button>
            ${this._note ? f`<span class="muted">${this._note}</span>` : v}</div>` : v}
      <div class="grid2">
        ${t("pv", c("st.e_pv"))}
        <div>${t("grid", c("st.e_grid"))}${s("grid_invert", c("st.e_grid_invert"))}</div>
        <div>${t("battery", c("st.e_battery"))}${s("battery_invert", c("st.e_battery_invert"))}</div>
        ${t("battery_soc", c("st.e_soc"))}
        <div>${t("house", c("st.e_house"))}${s("house_includes_hp", c("st.e_house_hp"), !0)}</div>
        ${t("wallbox", c("st.e_wallbox"))}
        <label class="field">${c("st.e_limit")}
          <input type="number" step="0.1" min="0" .value=${String(e.limit_14a ?? 4.2)}
            @change=${(i) => this._setEn({ limit_14a: Number(i.target.value) })} /></label>
      </div>
      <div class="row"><span class="spacer"></span>
        <button class="primary" ?disabled=${!this._energy} @click=${this._saveEnergy}>${L("save")} ${c("st.save")}</button></div>
    </div>`;
  }
  _patch(e) {
    const t = structuredClone(this.plant);
    t.settings = { ...t.settings, ...e }, he(this, "save", t);
  }
  render() {
    const e = this.plant.settings;
    return f`<div class="card wrap">
      <h2>${c("st.title")}</h2>
      <label class="field">${c("st.style")}
        <select @change=${(t) => this._patch({ style: t.target.value })}>
          <option value="flat" ?selected=${e.style === "flat"}>${c("st.style.flat")}</option>
          <option value="iso" ?selected=${e.style === "iso"}>${c("st.style.iso")}</option>
        </select></label>
      <label class="toggle"><input type="checkbox" .checked=${e.demo} @change=${(t) => this._patch({ demo: t.target.checked })} />
        <span><b>${c("st.demo")}</b><br /><span class="muted">${c("st.demo_hint")}</span></span></label>
      <label class="field">${c("st.language")}
        <select @change=${(t) => this._patch({ language: t.target.value })}>
          ${["auto", "de", "en"].map((t) => f`<option value=${t} ?selected=${(e.language || "auto") === t}>${t === "auto" ? c("st.lang.auto") : t === "de" ? "Deutsch" : "English"}</option>`)}
        </select></label>
      <label class="toggle"><input type="checkbox" .checked=${!!e.write_non_admin} @change=${(t) => this._patch({ write_non_admin: t.target.checked })} />
        <span><b>${c("st.write_non_admin")}</b><br /><span class="muted">${c("st.write_hint")}</span></span></label>
      <label class="field">${c("st.heat_load")}
        <input type="number" step="0.1" .value=${String(e.heat_load ?? 6.2)} @change=${(t) => this._patch({ heat_load: Number(t.target.value) })} /></label>
      <div class="row foot">
        <span class="muted">${c("st.version")} ${this.version}</span>
        <span class="spacer"></span>
        <button class="danger" @click=${() => confirm(c("st.reset_confirm")) && he(this, "reset-plant")}>${c("st.reset")}</button>
      </div>
    </div>
    ${this._energySection()}
    ${this._tariffSection()}
    ${this._backupSection()}`;
  }
};
Mt.properties = {
  plant: { attribute: !1 },
  version: {},
  hass: { attribute: !1 },
  api: { attribute: !1 },
  _energy: { state: !0 },
  _note: { state: !0 },
  _backups: { state: !0 },
  _tariff: { state: !0 },
  _bmsg: { state: !0 }
}, Mt.styles = [
  se,
  Q`
      .wrap { max-width: 640px; display: grid; gap: 16px; }
      .toggle { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; }
      .toggle input { margin-top: 4px; }
      .foot { margin-top: 8px; }
      :host { display: grid; gap: 16px; align-content: start; }
      h2 { margin: 0; }
      .grid2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px 16px; }
      .check { display: flex; gap: 8px; align-items: center; font-size: 13px; margin-top: 6px; }
      .check input { width: auto; margin: 0; }
      .backups { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
      .backups li { display: flex; gap: 10px; align-items: center; justify-content: space-between; padding: 8px 10px;
        border: 1px solid var(--cp-border); border-radius: 10px; font-size: 13px; }
      .filebtn { position: relative; display: inline-flex; gap: 6px; align-items: center; cursor: pointer; padding: 7px 12px;
        border: 1px solid var(--cp-border); border-radius: 10px; font-size: 13px; font-weight: 600; }
      .filebtn input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
    `
];
let us = Mt;
for (const [r, e] of [
  ["cp-wizard", ps],
  ["cp-mapping", ds],
  ["cp-icons", hs],
  ["cp-settings", us]
])
  customElements.get(r) || customElements.define(r, e);
const Zr = 10 * 6e4, Gr = 5e3;
function yi(r) {
  return r === void 0 ? "#8b949e" : r >= 3.5 ? we.green : r >= 3 ? we.yellow : we.red;
}
let xi = null;
const zt = class zt extends Y {
  constructor() {
    super(...arguments), this._chartKey = "", this._costs = [], this._costKey = "", this.sim = null, this.version = 0, this._data = null, this._error = "", this._loadedAt = 0, this._loadedFor = null;
  }
  connectedCallback() {
    super.connectedCallback(), xi ??= import("./echart-ooLVdkuy.js").catch((e) => {
      xi = null, console.error("COPilot: chart module failed to load", e);
    });
  }
  willUpdate() {
    const e = this.sim || this.plant, t = Date.now() - this._loadedAt;
    (e !== this._loadedFor || t > (this.sim ? Gr : Zr)) && (this._loadedFor = e, this._loadedAt = Date.now(), this._load());
  }
  async _load() {
    try {
      this._error = "", this.sim ? this._data = er(this.sim) : this.hass && !this.hass.__standalone && (this._data = await Qn(this.hass, this.plant));
      const e = (this._data?.daily || []).slice(-30);
      this._costs = await jr(e, this.plant, this.sim, this.hass && !this.hass.__standalone ? this.hass : void 0);
    } catch (e) {
      this._error = e?.message || String(e);
    }
  }
  _live() {
    const e = ji(this.plant, this.src), t = 62, s = 2 * Math.PI * t, i = e ? Math.min(1, e.cop / 7) : 0, n = e ? we[e.ampel] : "var(--cp-muted)";
    return f`<div class="card live">
      <div class="cap">${c("eff.live")}</div>
      <div class="gauge">
        <svg viewBox="0 0 160 160">
          <circle cx="80" cy="80" r=${t} class="track" />
          ${k`<circle cx="80" cy="80" r=${t} class="bar" style="stroke:${n};stroke-dasharray:${s * i} ${s}" />`}
        </svg>
        <div class="gv">
          <span class="big" style="color:${n}">${e ? N(e.cop, 1) : "–"}</span>
          <span class="muted">COP</span>
        </div>
      </div>
      ${e ? f`<div class="lv-row"><span>${c("eff.expected", { out: N(e.tOut, 0), flow: N(e.tFlow, 0) })}</span><b>${N(e.expected, 1)}</b></div>
            <div class="lv-row"><span>${c("eff.ratio")}</span><b style="color:${n}">${N(e.ratio * 100, 0)} %</b></div>
            <div class="verdict" style="border-color:${n}">${c(`eff.ampel.${e.ampel}`)}</div>` : f`<p class="muted small">${c("eff.no_live")}</p>`}
    </div>`;
  }
  _tile(e, t, s) {
    const i = oi(t), n = t && t.heat > 0 ? t.heatDhw / t.heat : void 0, o = t && t.el > 0 ? t.aux / t.el : void 0;
    return f`<div class="card tile">
      <div class="cap">${c(`eff.${e}`)} ${s ? f`<span class="est">${c("eff.estimate")}</span>` : v}</div>
      <div class="spf" style="color:${yi(i)}">${i !== void 0 ? N(i, 2) : "–"}<small>${e === "today" || e === "yesterday" ? "AZ" : "JAZ"}</small></div>
      <div class="kv"><span>${c("eff.heat")}</span><b>${t ? N(t.heat, t.heat >= 100 ? 0 : 1) : "–"} kWh</b></div>
      <div class="kv"><span>${c("eff.el")}</span><b>${t ? N(t.el, t.el >= 100 ? 0 : 1) : "–"} kWh</b></div>
      <div class="kv"><span>${c("eff.dhw_share")}</span><b>${n !== void 0 ? N(n * 100, 0) + " %" : "–"}</b></div>
      <div class="kv"><span>${c("eff.aux_share")}</span><b>${o !== void 0 ? N(o * 100, 1) + " %" : "–"}</b></div>
    </div>`;
  }
  _chart(e) {
    const t = e.daily.slice(-30);
    if (!t.length) return v;
    const s = Us() === "de" ? "de-DE" : "en-GB", i = (a) => new Date(a).toLocaleDateString(s, { day: "2-digit", month: "2-digit" }), n = (a) => new Date(a).toLocaleDateString(s, { weekday: "short", day: "2-digit", month: "2-digit" }), o = JSON.stringify(t);
    return o !== this._chartKey && (this._chartKey = o, this._chartOption = (a) => ({
      animationDuration: 400,
      textStyle: { fontFamily: "inherit" },
      grid: { left: 8, right: 8, top: 46, bottom: 8, containLabel: !0 },
      legend: {
        top: 0,
        right: 0,
        itemWidth: 12,
        itemHeight: 12,
        textStyle: { color: a.muted },
        inactiveColor: a.border,
        data: [c("eff.heat"), c("eff.el"), { name: c("eff.spf_short"), icon: "circle" }]
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow", shadowStyle: { color: "rgba(127,127,127,0.12)" } },
        backgroundColor: a.surface,
        borderColor: a.border,
        textStyle: { color: a.text, fontSize: 12 },
        formatter: (l) => {
          const p = Array.isArray(l) ? l : [l], d = p[0]?.dataIndex ?? 0, h = p.map((u) => {
            const m = u.value;
            if (m == null || m === "-") return "";
            const _ = u.seriesIndex === 2 ? "" : " kWh";
            return `<div style="display:flex;gap:10px;justify-content:space-between"><span>${u.marker}${u.seriesName}</span><b>${N(m, u.seriesIndex === 2 ? 2 : 1)}${_}</b></div>`;
          }).join("");
          return `<div style="margin-bottom:4px;font-weight:700">${n(t[d].day)}</div>${h}`;
        }
      },
      dataZoom: [{ type: "inside", minValueSpan: 5 }],
      xAxis: {
        type: "category",
        data: t.map((l) => i(l.day)),
        axisLine: { lineStyle: { color: a.border } },
        axisTick: { show: !1 },
        axisLabel: { color: a.muted, hideOverlap: !0 }
      },
      yAxis: [
        {
          type: "value",
          name: "kWh",
          nameTextStyle: { color: a.muted, align: "left" },
          axisLabel: { color: a.muted },
          splitLine: { lineStyle: { color: a.border, type: "dashed" } }
        },
        {
          type: "value",
          name: c("eff.spf_short"),
          min: 0,
          max: 6,
          interval: 2,
          nameTextStyle: { color: a.muted, align: "right" },
          axisLabel: { color: a.muted },
          splitLine: { show: !1 }
        }
      ],
      series: [
        {
          name: c("eff.heat"),
          type: "bar",
          data: t.map((l) => Math.round(l.heat * 10) / 10),
          itemStyle: { color: "#ff8a3d", borderRadius: [3, 3, 0, 0] },
          barGap: "10%",
          barCategoryGap: "35%"
        },
        {
          name: c("eff.el"),
          type: "bar",
          data: t.map((l) => Math.round(l.el * 10) / 10),
          itemStyle: { color: "#4d9fff", borderRadius: [3, 3, 0, 0] }
        },
        {
          name: c("eff.spf_short"),
          type: "line",
          yAxisIndex: 1,
          smooth: 0.3,
          symbol: "circle",
          symbolSize: 7,
          connectNulls: !0,
          lineStyle: { color: a.text, width: 1.5, type: "dashed", opacity: 0.7 },
          data: t.map((l) => {
            const p = oi(l);
            return p === void 0 ? null : { value: Math.round(p * 100) / 100, itemStyle: { color: yi(p) } };
          }),
          markLine: {
            silent: !0,
            symbol: "none",
            label: { show: !1 },
            lineStyle: { color: we.yellow, type: "dotted", opacity: 0.6 },
            data: [{ yAxis: 3 }]
          }
        }
      ]
    })), f`<div class="card chart">
      <div class="cap">${c("eff.daily")}</div>
      <cp-echart .option=${this._chartOption}></cp-echart>
      ${e.estimated.month ? f`<p class="muted small">${c("eff.demo_note")}</p>` : v}
    </div>`;
  }
  // ------------------------------------------------------------ costs
  _costTile(e, t) {
    const s = (a) => `${N(a, a >= 100 ? 0 : 2)} €`, i = t && t.el > 0.05 && !t.noShare ? t.self / t.el : void 0, n = t && t.heat > 0.1 ? (t.cost + t.feedLoss) / t.heat : void 0, o = t && t.gas > 0.01 ? 1 - (t.cost + t.feedLoss) / t.gas : void 0;
    return f`<div class="card tile">
      <div class="cap">${c(`cost.${e}`)}${t?.estimated ? f` <span class="est">${c("eff.estimate")}</span>` : v}</div>
      <div class="spf">${t ? s(t.cost) : "–"}<small>${c("cost.grid_cost")}</small></div>
      <div class="kv"><span>${c("cost.pv_share")}</span><b>${i !== void 0 ? N(i * 100, 0) + " %" : "–"}</b></div>
      <div class="kv"><span>${c("cost.feed_loss")}</span><b>${t && !t.noShare ? s(t.feedLoss) : "–"}</b></div>
      <div class="kv"><span>${c("cost.per_kwh")}</span><b>${n !== void 0 ? N(n * 100, 1) + " ct" : "–"}</b></div>
      <div class="kv"><span>${c("cost.vs_gas")}</span><b class=${o !== void 0 && o >= 0 ? "good" : ""}>${t ? s(t.gas) : "–"}${o !== void 0 ? f` <small>(${o >= 0 ? "−" : "+"}${N(Math.abs(o) * 100, 0)} %)</small>` : v}</b></div>
    </div>`;
  }
  _costSection() {
    const e = this._costs;
    if (!e.length) return v;
    const t = e[e.length - 1], s = e.length > 1 ? e[e.length - 2] : null, i = JSON.stringify(e.map((n) => [n.day, n.grid, n.self, n.cost]));
    if (i !== this._costKey) {
      this._costKey = i;
      const n = Us() === "de" ? "de-DE" : "en-GB", o = (a) => new Date(a).toLocaleDateString(n, { day: "2-digit", month: "2-digit" });
      this._costOption = (a) => ({
        animationDuration: 400,
        textStyle: { fontFamily: "inherit" },
        grid: { left: 8, right: 8, top: 46, bottom: 8, containLabel: !0 },
        legend: { top: 0, right: 0, itemWidth: 12, itemHeight: 12, textStyle: { color: a.muted }, inactiveColor: a.border },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow", shadowStyle: { color: "rgba(127,127,127,0.12)" } },
          backgroundColor: a.surface,
          borderColor: a.border,
          textStyle: { color: a.text, fontSize: 12 },
          valueFormatter: (l) => typeof l == "number" ? N(l, 2) : String(l)
        },
        dataZoom: [{ type: "inside", minValueSpan: 5 }],
        xAxis: { type: "category", data: e.map((l) => o(l.day)), axisLine: { lineStyle: { color: a.border } }, axisTick: { show: !1 }, axisLabel: { color: a.muted, hideOverlap: !0 } },
        yAxis: [
          { type: "value", name: "kWh", nameTextStyle: { color: a.muted, align: "left" }, axisLabel: { color: a.muted }, splitLine: { lineStyle: { color: a.border, type: "dashed" } } },
          { type: "value", name: "€", nameTextStyle: { color: a.muted, align: "right" }, axisLabel: { color: a.muted }, splitLine: { show: !1 } }
        ],
        series: [
          { name: c("cost.grid_kwh"), type: "bar", stack: "el", data: e.map((l) => Math.round(l.grid * 10) / 10), itemStyle: { color: "#4d9fff" }, barCategoryGap: "35%" },
          { name: c("cost.self_kwh"), type: "bar", stack: "el", data: e.map((l) => Math.round(l.self * 10) / 10), itemStyle: { color: "#ffc93c", borderRadius: [3, 3, 0, 0] } },
          { name: c("cost.cost_eur"), type: "line", yAxisIndex: 1, smooth: 0.3, symbol: "circle", symbolSize: 6, data: e.map((l) => Math.round(l.cost * 100) / 100), lineStyle: { color: "#3ddc97", width: 2 }, itemStyle: { color: "#3ddc97" } }
        ]
      });
    }
    return f`
      <h3 class="sec">${c("cost.title")}</h3>
      <div class="tiles">
        ${this._costTile("today", Gt([t]))}
        ${this._costTile("yesterday", s ? Gt([s]) : null)}
        ${this._costTile("days30", Gt(e))}
      </div>
      <div class="card chart">
        <div class="cap">${c("cost.daily")}</div>
        <cp-echart .option=${this._costOption}></cp-echart>
        <p class="muted small">${e.some((n) => n.noShare) ? c("cost.no_share") : ""} ${c("cost.hint")}</p>
      </div>`;
  }
  render() {
    const e = this._data;
    return f`
      <div class="grid">
        ${this._live()}
        <div class="tiles">
          ${this._tile("today", e?.today ?? null, !1)}
          ${this._tile("yesterday", e?.yesterday ?? null, !1)}
          ${this._tile("month", e?.month ?? null, !!e?.estimated.month)}
          ${this._tile("year", e?.year ?? null, !!e?.estimated.year)}
        </div>
      </div>
      ${this._error ? f`<div class="card err">${this._error}</div>` : v}
      ${e?.missing ? f`<div class="card hint">${c(`eff.missing.${e.missing}`)}</div>` : v}
      ${e ? this._chart(e) : v}
      ${this._costSection()}
    `;
  }
};
zt.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  hass: { attribute: !1 },
  sim: { attribute: !1 },
  version: { type: Number },
  _data: { state: !0 },
  _error: { state: !0 },
  _costs: { state: !0 }
}, zt.styles = [
  se,
  Q`
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
      .chart .cap { margin-bottom: 4px; }
      .head { margin-bottom: 6px; }
      .lg { display: inline-flex; gap: 5px; align-items: center; font-size: 12px; color: var(--cp-muted); }
      .lg i { width: 10px; height: 10px; border-radius: 3px; display: inline-block; }
      .lg i.dot { border-radius: 50%; background: var(--cp-text); }
      .grid line.grid, line.grid { stroke: var(--cp-border); }
      .axis { fill: var(--cp-muted); font-size: 10px; }
      .small { font-size: 12px; margin: 6px 0 0; }
      .sec { margin: 18px 0 10px; font-size: 15px; }
      b.good { color: #3ddc97; }
      .tiles + .chart { margin-top: 12px; }
      .hint { font-size: 13px; color: var(--cp-warn); }
      .err { color: var(--cp-error); }
      @media (max-width: 800px) { .grid { grid-template-columns: 1fr; } }
    `
];
let ms = zt;
customElements.get("cp-efficiency") || customElements.define("cp-efficiency", ms);
const fs = 60;
function fe(r, e, t, s) {
  const i = new Array(t).fill(null), n = [...r].sort((l, p) => l.t - p.t);
  let o = 0, a = null;
  for (let l = 0; l < t; l++) {
    const p = e + l * fs;
    for (; o < n.length && n[o].t <= p; ) a = s(n[o++]);
    i[l] = a;
  }
  return i;
}
const ge = (r) => r.v === null || Number.isNaN(r.v) ? null : r.v;
function $i(r) {
  const e = [];
  let t = -1;
  return r.forEach((s, i) => {
    s && t < 0 && (t = i), !s && t >= 0 && (e.push([t, i]), t = -1);
  }), t >= 0 && e.push([t, r.length]), e;
}
function ki(r) {
  const e = r.filter((t) => t !== null);
  return e.length ? e.reduce((t, s) => t + s, 0) / e.length : void 0;
}
const Yt = (r, ...e) => r.components.find((t) => e.includes(t.type));
async function ae(r, e, t, s) {
  if (!e || r.get(e, t) === void 0) return [];
  try {
    return await r.history(e, t, s);
  } catch {
    return [];
  }
}
async function Yr(r, e, t = 24, s = Date.now() / 1e3) {
  const i = Yt(r, "outdoor_unit"), n = Yt(r, "indoor_unit"), o = Yt(r, "buffer"), a = Math.floor(t * 3600 / fs), l = s - a * fs, [p, d, h, u, m, _, g, y, w, b, x] = await Promise.all([
    ae(e, i, "compressor_on", t),
    ae(e, i, "compressor_speed", t),
    ae(e, i, "heat_power", t),
    ae(e, i, "activity", t),
    ae(e, n, "supply_temp", t),
    ae(e, n, "return_temp", t),
    ae(e, o, "temp_top", t),
    ae(e, n, "buffer_temp", t),
    ae(e, n, "aux_level", t),
    ae(e, n, "vw1_position", t),
    ae(e, n, "pressure", t)
  ]), M = p.length ? p : d.length ? d : h, P = fe(M, l, a, ge).map((W) => W !== null && W > (M === h ? 0.2 : 0)), B = fe(u, l, a, (W) => Oe({ raw: W.raw ?? null, available: W.raw !== void 0 }) ?? null), j = B.map((W) => W === "defrost"), ee = fe(b, l, a, ge).map((W, E) => W !== null ? W > 0 : B[E] === "hot_water"), A = P.map((W, E) => W && !j[E] && !ee[E]), C = A.map((W, E) => W && A.slice(Math.max(0, E - 5), E).every(Boolean) && E >= 5), I = M.length > 0, F = [], O = g.length ? g : y;
  if (o || y.length) {
    const W = fe(m, l, a, ge), E = fe(O, l, a, ge), T = W.map((D, R) => C[R] && D !== null && E[R] !== null ? D - E[R] : null), V = ki(T);
    F.push(
      V === void 0 ? { id: "mixing", ampel: "none", detail: "chk.nodata", params: {} } : {
        id: "mixing",
        ampel: V <= 2 ? "green" : V <= 4 ? "yellow" : "red",
        value: `${N(V, 1)} K`,
        detail: "chk.mixing.detail",
        params: { value: V, minutes: T.filter((D) => D !== null).length },
        hint: "chk.mixing.hint"
      }
    );
  }
  if (I) {
    const E = $i(P).filter(([G]) => G > 0), T = E.length, V = E.length ? E.reduce((G, [X, ie]) => G + (ie - X), 0) / E.length : void 0;
    let D = 0;
    for (let G = 0; G + 60 <= a; G += 10) D = Math.max(D, E.filter(([X]) => X >= G && X < G + 60).length);
    const R = T / t, H = R <= 1 && D <= 3 && (V ?? 99) >= 20 ? "green" : D > 4 || (V ?? 99) < 10 ? "red" : "yellow";
    F.push({
      id: "cycling",
      ampel: T === 0 ? "green" : H,
      value: `${T}×`,
      detail: "chk.cycling.detail",
      params: { starts: T, perHour: R, maxPerHour: D, avgRun: V ?? 0, hours: t },
      hint: "chk.cycling.hint"
    });
  } else
    F.push({ id: "cycling", ampel: "none", detail: "chk.nodata", params: {} });
  {
    const W = fe(m, l, a, ge), E = fe(_, l, a, ge), T = W.map((D, R) => C[R] && D !== null && E[R] !== null ? D - E[R] : null), V = ki(T);
    F.push(
      V === void 0 ? { id: "spread", ampel: "none", detail: "chk.nodata", params: {} } : {
        id: "spread",
        ampel: V >= 3 && V <= 8 ? "green" : V >= 2 && V <= 10 ? "yellow" : "red",
        value: `${N(V, 1)} K`,
        detail: "chk.spread.detail",
        params: { value: V },
        hint: V < 3 ? "chk.spread.hint_low" : "chk.spread.hint_high"
      }
    );
  }
  if (u.length) {
    const W = $i(j), E = W.reduce((D, [R, H]) => D + (H - R), 0), T = P.filter(Boolean).length || 1, V = E / T;
    F.push({
      id: "defrost",
      ampel: V <= 0.08 ? "green" : V <= 0.15 ? "yellow" : "red",
      value: `${W.length}×`,
      detail: "chk.defrost.detail",
      params: { count: W.length, minutes: E, share: V * 100 },
      hint: "chk.defrost.hint"
    });
  }
  if (w.length) {
    const E = fe(w, l, a, ge).map((T) => T !== null && T > 0).filter(Boolean).length;
    F.push({
      id: "aux",
      ampel: E === 0 ? "green" : E <= 60 ? "yellow" : "red",
      value: E ? `${Math.round(E)} min` : "0",
      detail: "chk.aux.detail",
      params: { minutes: E },
      hint: "chk.aux.hint"
    });
  }
  if (x.length && n) {
    const W = x.map(ge).filter((H) => H !== null), E = Number(n.props.pressure_min ?? 1), T = Number(n.props.pressure_max ?? 2.7), V = Math.min(...W), D = Math.max(...W), R = W.length ? W[0] - W[W.length - 1] : 0;
    F.push({
      id: "pressure",
      ampel: V < E || D > T ? "red" : V < E + 0.2 || R > 0.2 ? "yellow" : "green",
      value: `${N(V, 1)}–${N(D, 1)} bar`,
      detail: "chk.pressure.detail",
      params: { min: V, max: D, lo: E, hi: T },
      hint: "chk.pressure.hint"
    });
  }
  return F;
}
const qr = 2e4, Jr = 5 * 6e4;
function Si(r) {
  const e = {};
  for (const [t, s] of Object.entries(r)) e[t] = typeof s == "number" ? N(s, Number.isInteger(s) ? 0 : 1) : s;
  return e;
}
const Et = class Et extends Y {
  constructor() {
    super(...arguments), this.sim = null, this.version = 0, this._results = null, this._busy = !1, this._at = 0, this._for = null;
  }
  willUpdate() {
    const e = this.sim || this.plant;
    (e !== this._for || Date.now() - this._at > (this.sim ? qr : Jr)) && (this._for = e, this._at = Date.now(), this._run());
  }
  async _run() {
    if (!this._busy) {
      this._busy = !0;
      try {
        this._results = await Yr(this.plant, this.src, 24, this.sim ? this.sim.time : Date.now() / 1e3);
      } finally {
        this._busy = !1;
      }
    }
  }
  render() {
    const e = this._results, t = (s) => (e || []).filter((i) => i.ampel === s).length;
    return f`
      <div class="card head">
        <div>
          <h2>${c("chk.title")}</h2>
          <p class="muted">${c("chk.subtitle")}${this.sim ? ` ${c("chk.demo")}` : ""}</p>
        </div>
        <span class="spacer"></span>
        ${e ? f`<div class="sum">
              ${["green", "yellow", "red"].map((s) => f`<span class="dot" style="background:${we[s]}"></span><b>${t(s)}</b>`)}
            </div>` : v}
        <button @click=${() => this._run()} ?disabled=${this._busy}>${c("chk.refresh")}</button>
      </div>
      ${e ? f`<div class="list">
            ${e.map(
      (s) => f`<div class="card item ${s.ampel}">
                <span class="lamp" style="background:${s.ampel === "none" ? "var(--cp-muted)" : we[s.ampel]}"></span>
                <div class="body">
                  <div class="row nowrap">
                    <b class="title">${c(`chk.${s.id}.title`)}</b>
                    <span class="spacer"></span>
                    ${s.value ? f`<span class="val">${s.value}</span>` : v}
                  </div>
                  <div class="detail">${c(s.detail, Si(s.params))}</div>
                  ${s.hint && (s.ampel === "yellow" || s.ampel === "red") ? f`<div class="hint">${c(s.hint, Si(s.params))}</div>` : v}
                  ${s.ampel === "green" ? f`<div class="ok">${c("chk.ok")}</div>` : v}
                </div>
              </div>`
    )}
          </div>` : f`<div class="card muted">${c("chk.running")}</div>`}
    `;
  }
};
Et.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  sim: { attribute: !1 },
  version: { type: Number },
  _results: { state: !0 },
  _busy: { state: !0 }
}, Et.styles = [
  se,
  Q`
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
let gs = Et;
customElements.get("cp-check") || customElements.define("cp-check", gs);
const Ie = [
  { key: "design", slot: "design_temp", min: 28, max: 65, step: 1 },
  { key: "offset", slot: "offset_temp", min: -10, max: 10, step: 0.5 },
  { key: "limit", slot: "heating_limit", min: 10, max: 22, step: 0.5 },
  { key: "minFlow", slot: "min_flow_temp", min: 15, max: 40, step: 1 },
  { key: "maxFlow", slot: "max_flow_temp", min: 30, max: 75, step: 1 },
  { key: "minExt", slot: "min_ext_temp", min: -25, max: 0, step: 1 },
  { key: "roomSet", slot: "room_setpoint", min: 15, max: 25, step: 0.5 }
], Pe = 14, Mi = -20, qt = 22, Xr = 20, Qr = 70;
let zi = null;
const At = class At extends Y {
  constructor() {
    super(...arguments), this.sim = null, this.version = 0, this.admin = !1, this._edit = {}, this._points = null, this._hc = "", this._msg = "", this._confirm = !1, this._loadedFor = null;
  }
  get _circuits() {
    return this.plant.components.filter((e) => e.type === "radiators" || e.type === "floor_heating");
  }
  get _circuit() {
    return this._circuits.find((e) => e.id === this._hc) || this._circuits[0];
  }
  /** Current parameters from the plant (or the simulator in demo mode). */
  _current() {
    const e = this._circuit;
    if (this.sim) return { ...this.sim.curve };
    const t = Ri(e?.type === "floor_heating");
    if (!e) return t;
    for (const s of Ie) {
      const i = this.src.get(e, s.slot);
      i?.available && i.num !== null && (t[s.key] = i.num);
    }
    return t;
  }
  _writable(e) {
    if (this.sim) return !0;
    const t = this._circuit, s = Ie.find((n) => n.key === e), i = t?.bindings[s.slot];
    return !!i && /^(number|input_number)\./.test(i) && this.admin;
  }
  willUpdate() {
    const e = `${this.sim ? "sim" : "ha"}:${this._circuit?.id}`;
    e !== this._loadedFor && (this._loadedFor = e, this._load());
  }
  // ------------------------------------------------------------ history
  async _load() {
    this._points = null;
    const e = this._circuit, t = this.plant.components.find((i) => i.type === "outdoor_unit"), s = this.plant.components.find((i) => i.type === "indoor_unit");
    if (!e || !t) {
      this._points = [];
      return;
    }
    try {
      this._points = this.sim ? this._simPoints() : await this._hassPoints(e, t, s);
    } catch {
      this._points = [];
    }
  }
  /** Demo: last 24 h from the simulation plus earlier days from the climate model. */
  _simPoints() {
    const e = this.sim, t = [], s = e.history("outdoor", "outdoor_temp", 24), i = e.history("hc", "flow_temp", 24), n = e.history("hc", "room_temp", 24);
    for (let o = 0; o < 24; o++) {
      const a = e.time - (24 - o) * 3600, l = (m) => m.filter((_) => _.t >= a && _.t < a + 3600 && _.v !== null).map((_) => _.v), p = l(s), d = l(i), h = l(n);
      if (!p.length || !d.length) continue;
      const u = (m) => m.reduce((_, g) => _ + g, 0) / m.length;
      u(p) >= e.curve.limit || t.push({ tOut: u(p), flow: u(d), room: h.length ? u(h) : void 0, age: 0 });
    }
    for (let o = 1; o < Pe; o++)
      for (let a = 0; a < 24; a += 2) {
        const l = e.outdoorMean + 2.5 * Math.cos((a - 15) / 24 * 2 * Math.PI) + Math.sin(o * 1.7 + a) * 3, p = Fe(e.curve, l);
        p !== null && t.push({ tOut: l, flow: p + Math.sin(o * 3.1 + a * 0.7) * 1.4 - 0.6, room: e.curve.roomSet + Math.sin(o + a) * 0.3, age: o / Pe });
      }
    return t;
  }
  /** Hourly means from the recorder's long-term statistics. */
  async _hassPoints(e, t, s) {
    const i = {
      out: t.bindings.outdoor_temp,
      flow: e.bindings.flow_temp || s?.bindings.supply_temp,
      room: e.bindings.room_temp,
      heat: t.bindings.heat_power
    };
    if (!i.out || !i.flow || !this.hass) return [];
    const n = /* @__PURE__ */ new Date(), o = new Date(n.getTime() - Pe * 864e5), a = await this.hass.callWS({
      type: "recorder/statistics_during_period",
      start_time: o.toISOString(),
      end_time: n.toISOString(),
      statistic_ids: Object.values(i).filter(Boolean),
      period: "hour",
      types: ["mean"]
    }), l = (g) => new Map((g ? a[g] || [] : []).map((y) => [y.start, y.mean])), p = l(i.out), d = l(i.flow), h = l(i.room), u = l(i.heat), m = this._current().limit, _ = [];
    for (const [g, y] of p) {
      const w = d.get(g);
      if (y == null || w == null || y >= m) continue;
      const b = u.get(g);
      u.size && (b == null || b < 0.3) || _.push({ tOut: y, flow: w, room: h.get(g) ?? void 0, age: (n.getTime() - g) / (Pe * 864e5) });
    }
    return _;
  }
  // ------------------------------------------------------------ actions
  _set(e, t) {
    this._edit = { ...this._edit, [e]: t }, this._msg = "";
  }
  async _apply() {
    this._confirm = !1;
    const e = Object.entries(this._edit);
    if (this.sim)
      this.sim.curve = { ...this.sim.curve, ...this._edit };
    else {
      const t = this._circuit;
      for (const [s, i] of e) {
        const n = Ie.find((a) => a.key === s), o = t.bindings[n.slot];
        o && await this.hass.callWS({
          type: "call_service",
          domain: o.split(".")[0],
          service: "set_value",
          service_data: { entity_id: o, value: i }
        });
      }
    }
    this._edit = {}, this._msg = c("cv.applied");
  }
  // ------------------------------------------------------------ render
  _chart(e, t, s) {
    const i = (w) => {
      const b = [];
      for (let x = Mi; x <= Math.min(qt, w.limit); x += 0.5) {
        const M = Fe(w, x);
        if (M === null) break;
        b.push([x, Math.round(M * 10) / 10]);
      }
      return b;
    }, n = this._circuit, o = this.plant.components.find((w) => w.type === "outdoor_unit"), a = this.plant.components.find((w) => w.type === "indoor_unit"), l = o ? this.src.get(o, "outdoor_temp") : void 0, p = n && this.src.get(n, "flow_temp") || a && this.src.get(a, "supply_temp"), d = l?.available ? l.num : null, h = p?.available ? p.num : null, u = d !== null ? Fe(e, d) : null, m = i(e), _ = t ? i(t) : [], g = (w) => `${N(w, Number.isInteger(w) ? 0 : 1)} °C`;
    return f`<cp-echart class="curve-chart" .option=${(w) => ({
      animation: !1,
      textStyle: { fontFamily: "inherit" },
      grid: { left: 8, right: 16, top: 30, bottom: 8, containLabel: !0 },
      tooltip: {
        trigger: "item",
        backgroundColor: w.surface,
        borderColor: w.border,
        textStyle: { color: w.text, fontSize: 12 },
        formatter: (b) => {
          const [x, M] = b.value;
          return `<b>${b.seriesName}</b><br>${c("cv.tip", { out: g(x), flow: g(M) })}`;
        }
      },
      xAxis: {
        type: "value",
        min: Mi,
        max: qt,
        interval: 10,
        axisLabel: { color: w.muted, formatter: (b) => `${b} °C` },
        axisLine: { lineStyle: { color: w.border } },
        splitLine: { lineStyle: { color: w.border, type: "dashed" } }
      },
      yAxis: {
        type: "value",
        min: Xr,
        max: Qr,
        interval: 10,
        name: c("cv.axis_flow"),
        nameTextStyle: { color: w.muted, align: "left" },
        axisLine: { show: !1, onZero: !1 },
        axisLabel: { color: w.muted },
        splitLine: { lineStyle: { color: w.border, type: "dashed" } }
      },
      series: [
        {
          name: c("cv.points", { days: Pe }),
          type: "scatter",
          symbolSize: 6,
          z: 1,
          data: s.map((b) => ({ value: [b.tOut, Math.round(b.flow * 10) / 10], itemStyle: { color: "#f5c542", opacity: 0.85 - b.age * 0.6 } })),
          markArea: {
            silent: !0,
            itemStyle: { color: "rgba(77,159,255,0.08)" },
            label: { color: w.muted, position: "insideTop" },
            data: [[{ name: c("cv.no_heating"), xAxis: e.limit }, { xAxis: qt }]]
          }
        },
        {
          name: c("cv.curve"),
          type: "line",
          showSymbol: !1,
          z: 3,
          data: m,
          lineStyle: { color: "#3ddc97", width: 3 },
          itemStyle: { color: "#3ddc97" }
        },
        {
          name: c("cv.preview"),
          type: "line",
          showSymbol: !1,
          z: 4,
          data: _,
          lineStyle: { color: "#4d9fff", width: 2.5, type: "dashed" },
          itemStyle: { color: "#4d9fff" }
        },
        {
          name: c("cv.target"),
          type: "scatter",
          z: 5,
          symbolSize: 13,
          data: d !== null && u !== null ? [[d, Math.round(u * 10) / 10]] : [],
          itemStyle: { color: "transparent", borderColor: "#3ddc97", borderWidth: 2 }
        },
        {
          name: c("cv.now"),
          type: "scatter",
          z: 6,
          symbolSize: 11,
          data: d !== null && h !== null ? [[d, h]] : [],
          itemStyle: { color: "#ff7a45", shadowBlur: 10, shadowColor: "#ff7a45" }
        }
      ]
    })}></cp-echart>`;
  }
  connectedCallback() {
    super.connectedCallback(), zi ??= import("./echart-ooLVdkuy.js").catch((e) => {
      zi = null, console.error("COPilot: chart module failed to load", e);
    });
  }
  render() {
    const e = this._current(), t = Object.keys(this._edit).length > 0, s = t ? { ...e, ...this._edit } : null, i = s || e, n = this._points || [], o = n.filter((h) => h.age < 0.5 && h.room !== void 0).map((h) => h.room), a = o.length ? o.reduce((h, u) => h + u, 0) / o.length : void 0, l = n.length ? n.reduce((h, u) => h + (u.flow - (Fe(e, u.tOut) ?? u.flow)), 0) / n.length : void 0, p = a !== void 0 ? Tn(e, a) : 0, d = this._circuits;
    return f`
      <div class="grid">
        <div class="card chart-card">
          <div class="row head">
            <h2>${c("cv.title")}</h2>
            ${d.length > 1 ? f`<select @change=${(h) => this._hc = h.target.value}>
                  ${d.map((h) => f`<option value=${h.id} ?selected=${h.id === this._circuit?.id}>${h.label}</option>`)}
                </select>` : f`<span class="muted">${this._circuit?.label || ""}</span>`}
            <span class="spacer"></span>
            <span class="lg"><i class="l-curve"></i>${c("cv.curve")}</span>
            ${s ? f`<span class="lg"><i class="l-next"></i>${c("cv.preview")}</span>` : v}
            <span class="lg"><i class="l-pt"></i>${c("cv.points", { days: Pe })}</span>
            <span class="lg"><i class="l-live"></i>${c("cv.now")}</span>
          </div>
          ${this._chart(e, s, n)}
          ${this.sim ? f`<p class="muted small">${c("cv.demo_note")}</p>` : v}
          ${!this.sim && this._points && !n.length ? f`<p class="muted small">${c("cv.no_points")}</p>` : v}
        </div>
        <div class="side">
          <div class="card">
            <div class="cap">${c("cv.params")}</div>
            ${Ie.map((h) => {
      const u = i[h.key], m = h.key in this._edit, _ = this._writable(h.key);
      return f`<label class="param ${m ? "changed" : ""}">
                <span class="pname">${c(`cv.p.${h.key}`)}</span>
                <b>${N(u, h.step < 1 ? 1 : 0)} ${h.key === "offset" ? "K" : "°C"}</b>
                <input type="range" min=${h.min} max=${h.max} step=${h.step} .value=${String(u)} ?disabled=${!_}
                  @input=${(g) => this._set(h.key, Number(g.target.value))} />
              </label>`;
    })}
            ${!this.sim && !Ie.some((h) => this._writable(h.key)) ? f`<p class="muted small">${c("cv.readonly")}</p>` : v}
            <div class="row actions">
              <button ?disabled=${!t} @click=${() => this._edit = {}}>${c("discard")}</button>
              <span class="spacer"></span>
              <button class="primary" ?disabled=${!t} @click=${() => this._confirm = !0}>${L("check")} ${c("apply")}</button>
            </div>
            ${this._msg ? f`<p class="ok">${this._msg}</p>` : v}
          </div>
          <div class="card">
            <div class="cap">${c("cv.analysis")}</div>
            ${l !== void 0 ? f`<p class="small">${c(l >= 0 ? "cv.deviation_above" : "cv.deviation_below", { value: Math.abs(l) })}</p>` : v}
            ${a !== void 0 ? f`<p class="small">${c("cv.room", { room: a, set: e.roomSet })}</p>
                  ${Math.abs(p) >= 0.5 ? f`<div class="hint">${c(p < 0 ? "cv.suggest_down" : "cv.suggest_up", { value: Math.abs(p), target: e.offset + p })}
                        <button class="small-btn" @click=${() => this._set("offset", e.offset + p)}>${c("cv.try")}</button></div>` : f`<p class="ok small">${c("cv.fits")}</p>`}` : f`<p class="muted small">${c("cv.no_room")}</p>`}
          </div>
        </div>
      </div>
      ${this._confirm ? f`<div class="backdrop" @click=${() => this._confirm = !1}></div>
            <div class="dialog card">
              <h3>${c("cv.confirm_title")}</h3>
              <ul>${Object.entries(this._edit).map(
      ([h, u]) => f`<li>${c(`cv.p.${h}`)}: ${N(e[h], 1)} → <b>${N(u, 1)}</b></li>`
    )}</ul>
              <p class="muted small">${this.sim ? c("cv.confirm_demo") : c("cv.confirm_live")}</p>
              <div class="row"><span class="spacer"></span>
                <button @click=${() => this._confirm = !1}>${c("cancel")}</button>
                <button class="primary" @click=${this._apply}>${c("apply")}</button></div>
            </div>` : v}
    `;
  }
};
At.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  hass: { attribute: !1 },
  sim: { attribute: !1 },
  version: { type: Number },
  admin: { type: Boolean },
  _edit: { state: !0 },
  _points: { state: !0 },
  _hc: { state: !0 },
  _msg: { state: !0 },
  _confirm: { state: !0 }
}, At.styles = [
  se,
  Q`
      :host { display: block; }
      .grid { display: grid; grid-template-columns: 1fr 320px; gap: 12px; align-items: start; }
      .head { margin-bottom: 6px; }
      .head h2 { margin: 0 10px 0 0; }
      .head select { width: auto; }
      .curve-chart { height: clamp(280px, 52vh, 520px); }
      .grid line.grid, line.grid { stroke: var(--cp-border); }
      .axis { fill: var(--cp-muted); font-size: 11px; }
      .axis.title { font-weight: 700; }
      .limit { fill: color-mix(in srgb, var(--cp-info) 7%, transparent); }
      .pt { fill: #f5c542; }
      .curve { fill: none; stroke: var(--cp-accent); stroke-width: 3; stroke-linecap: round; }
      .curve.next { stroke: var(--cp-select); stroke-dasharray: 7 6; }
      .target { fill: none; stroke: var(--cp-accent); stroke-width: 2; }
      .live circle { fill: #ff7a45; }
      .live circle.pulse { fill: rgba(255, 122, 69, 0.35); animation: cp-pulse 2s ease-in-out infinite; }
      @keyframes cp-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      .lg { display: inline-flex; gap: 5px; align-items: center; font-size: 12px; color: var(--cp-muted); }
      .lg i { display: inline-block; width: 14px; height: 3px; border-radius: 2px; }
      .l-curve { background: var(--cp-accent); }
      .l-next { background: var(--cp-select); }
      .l-pt { width: 8px !important; height: 8px !important; border-radius: 50% !important; background: #f5c542; }
      .l-live { width: 8px !important; height: 8px !important; border-radius: 50% !important; background: #ff7a45; }
      .side { display: grid; gap: 12px; }
      .cap { font-size: 11px; text-transform: uppercase; letter-spacing: 0.7px; color: var(--cp-muted); font-weight: 700; margin-bottom: 8px; }
      .param { display: grid; grid-template-columns: 1fr auto; gap: 2px 8px; margin-bottom: 10px; font-size: 13px; }
      .param input { grid-column: 1 / -1; }
      .param.changed b { color: var(--cp-select); }
      .pname { color: var(--cp-muted); }
      .actions { margin-top: 6px; }
      .small { font-size: 13px; line-height: 1.45; margin: 6px 0; }
      .ok { color: var(--cp-accent); }
      .hint { font-size: 13px; line-height: 1.45; padding: 8px 10px; border-radius: 10px; background: color-mix(in srgb, var(--cp-warn) 12%, var(--cp-surface-2)); display: grid; gap: 8px; }
      .small-btn { justify-self: start; padding: 4px 10px; font-size: 12px; }
      .backdrop { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.45); z-index: 40; }
      .dialog { position: fixed; z-index: 41; left: 50%; top: 30%; transform: translate(-50%, -30%); width: min(420px, 92vw); }
      .dialog h3 { margin-top: 0; color: var(--cp-text); text-transform: none; letter-spacing: 0; font-size: 16px; }
      .dialog ul { padding-left: 18px; font-size: 14px; }
      @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
    `
];
let _s = At;
customElements.get("cp-curve") || customElements.define("cp-curve", _s);
const Wt = class Wt extends Y {
  constructor() {
    super(...arguments), this.isPanel = !1, this._config = { type: "custom:copilot-card" }, this._ctl = new Ii(this, !1);
  }
  setConfig(e) {
    if (!e) throw new Error("Invalid configuration");
    this._config = { show_kpis: !0, show_messages: !1, show_demo_controls: !1, ...e };
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
  willUpdate(e) {
    e.has("hass") && this.hass && this._ctl.setHass(this.hass);
  }
  render() {
    const e = this._config, t = this._ctl.plant, s = e.height || (this.isPanel ? "calc(100vh - var(--header-height, 56px) - 16px)" : "560px");
    return f`<ha-card style="height:${s}">
      ${this._ctl.error ? f`<div class="err">${this._ctl.error}</div>` : v}
      ${t ? f`<cp-overview
            .plant=${t}
            .src=${this._ctl.src}
            .icons=${this._ctl.icons}
            .messages=${this._ctl.messages}
            .sim=${this._ctl.sim}
            .hass=${this.hass}
            .api=${this._ctl.api}
            ?admin=${this._ctl.admin}
            .version=${this._ctl.version}
            .showKpis=${e.show_kpis !== !1}
            .showSide=${!!e.show_messages}
            .showDemo=${!!e.show_demo_controls}
            ?narrow=${this.clientWidth < 700}
            @scenario=${(i) => this._ctl.scenario(i.detail)}
          ></cp-overview>` : f`<div class="loading">${es}</div>`}
    </ha-card>`;
  }
};
Wt.properties = {
  hass: { attribute: !1 },
  isPanel: { type: Boolean },
  _config: { state: !0 }
}, Wt.styles = [
  Ki,
  se,
  Q`
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
let vs = Wt;
const Pt = class Pt extends Y {
  constructor() {
    super(...arguments), this._config = { type: "custom:copilot-card" };
  }
  setConfig(e) {
    this._config = e;
  }
  _set(e, t) {
    const s = { ...this._config, [e]: t };
    (t === "" || t === void 0) && delete s[e], this._config = s, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: s }, bubbles: !0, composed: !0 }));
  }
  render() {
    const e = this._config, t = (s, i, n) => f`<label class="row">
      <input type="checkbox" .checked=${e[s] ?? n} @change=${(o) => this._set(s, o.target.checked)} />
      ${i}</label>`;
    return f`<div class="ed">
      ${t("show_kpis", c("card.show_kpis"), !0)}
      ${t("show_messages", c("card.show_messages"), !1)}
      ${t("show_demo_controls", c("card.show_demo"), !1)}
      <label class="field">${c("card.height")}
        <input .value=${e.height || ""} placeholder="560px" @change=${(s) => this._set("height", s.target.value.trim())} /></label>
      <p class="hint">${c("card.hint")}</p>
    </div>`;
  }
};
Pt.properties = { hass: { attribute: !1 }, _config: { state: !0 } }, Pt.styles = [
  se,
  Q`
      .ed { display: grid; gap: 10px; color: var(--primary-text-color); }
      .row { display: flex; gap: 8px; align-items: center; font-size: 14px; }
      .field { color: var(--secondary-text-color); }
      input:not([type]) { background: transparent; color: var(--primary-text-color); border-color: var(--divider-color); }
      .hint { font-size: 12px; color: var(--secondary-text-color); margin: 0; }
    `
];
let ws = Pt;
customElements.get("copilot-card") || customElements.define("copilot-card", vs);
customElements.get("copilot-card-editor") || customElements.define("copilot-card-editor", ws);
const mt = window;
mt.customCards = mt.customCards || [];
mt.customCards.some((r) => r.type === "copilot-card") || mt.customCards.push({
  type: "copilot-card",
  name: "COPilot",
  description: "Animated heat pump schematic with live values",
  preview: !1,
  documentationURL: "https://github.com/junky84/copilot"
});
const Ei = "copilot.view";
function eo(r) {
  try {
    return localStorage.getItem(r);
  } catch {
    return null;
  }
}
function to(r, e) {
  try {
    localStorage.setItem(r, e);
  } catch {
  }
}
const Ct = class Ct extends Y {
  constructor() {
    super(), this.narrow = !1, this._ctl = new Ii(this), this._view = "overview", this._sub = "editor", this._toast = "";
    const e = eo(Ei);
    if (e) {
      const [t, s] = e.split(":");
      ["overview", "efficiency", "check", "curve", "maintenance", "messages", "config"].includes(t) && (this._view = t), s && (this._sub = s);
    }
  }
  willUpdate(e) {
    e.has("hass") && this.hass && this._ctl.setHass(this.hass);
  }
  async _save(e) {
    try {
      await this._ctl.save(e), this._showToast(c("saved"));
    } catch (t) {
      this._showToast(t?.message || String(t));
    }
  }
  _showToast(e) {
    this._toast = e, window.setTimeout(() => this._toast = "", 2600);
  }
  _go(e, t) {
    this._view = e, t && (this._sub = t), to(Ei, `${this._view}:${this._sub}`);
  }
  _fullscreen() {
    document.fullscreenElement ? document.exitFullscreen() : this.requestFullscreen?.().catch(() => {
    });
  }
  render() {
    const e = this._ctl.plant, t = this._ctl.messages.filter((s) => s.active && (s.level === "warning" || s.level === "error")).length;
    return f`<div class="shell">
      <header>
        ${this.narrow ? f`<button class="ghost icon" title=${c("menu")} @click=${() => this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: !0, composed: !0 }))}>${L("menu")}</button>` : v}
        <div class="brand">${es}<span>COP<b>ilot</b></span></div>
        <nav>
          ${["overview", "efficiency", "check", "curve", "maintenance", "messages", "config"].map(
      (s) => f`<button class="tab ${this._view === s ? "on" : ""}" title=${c(`nav.${s}`)} @click=${() => this._go(s)}>
              ${L(s === "overview" ? "grid" : s === "efficiency" ? "chart" : s === "check" ? "check" : s === "curve" ? "curve" : s === "maintenance" ? "wrench" : s === "messages" ? "bell" : "gear")}
              <span class="tl">${c(`nav.${s}`)}</span>
              ${s === "messages" && t ? f`<span class="badge">${t}</span>` : v}
            </button>`
    )}
        </nav>
        <span class="spacer"></span>
        ${e?.settings.demo ? f`<span class="demo-pill">${L("flask")}<span class="tl">${c("demo")}</span></span>` : v}
        <button class="ghost icon" title=${c("fullscreen")} @click=${this._fullscreen}>${L("expand")}</button>
      </header>
      <main>
        ${this._ctl.error ? f`<div class="card err">${this._ctl.error}</div>` : v}
        ${this._ctl.api?.standalone ? f`<div class="note muted">${c("standalone_hint")}</div>` : v}
        ${e ? this._content(e) : f`<div class="loading">${es}</div>`}
      </main>
      ${this._toast ? f`<div class="toast">${this._toast}</div>` : v}
    </div>`;
  }
  _content(e) {
    const t = this._ctl.src;
    if (this._view === "overview")
      return f`<cp-overview
        .plant=${e}
        .src=${t}
        .icons=${this._ctl.icons}
        .messages=${this._ctl.messages}
        .sim=${this._ctl.sim}
        .hass=${this.hass}
        .api=${this._ctl.api}
        ?admin=${this._ctl.admin}
        .version=${this._ctl.version}
        ?narrow=${this.narrow || window.innerWidth < 900}
        @scenario=${(n) => this._ctl.scenario(n.detail)}
      ></cp-overview>`;
    if (this._view === "efficiency")
      return f`<cp-efficiency
        .plant=${e}
        .src=${t}
        .hass=${this.hass}
        .sim=${this._ctl.sim}
        .version=${this._ctl.version}
      ></cp-efficiency>`;
    if (this._view === "check")
      return f`<cp-check .plant=${e} .src=${t} .sim=${this._ctl.sim} .version=${this._ctl.version}></cp-check>`;
    if (this._view === "curve")
      return f`<cp-curve .plant=${e} .src=${t} .hass=${this.hass} .sim=${this._ctl.sim} .version=${this._ctl.version} ?admin=${this._ctl.admin}></cp-curve>`;
    if (this._view === "maintenance")
      return f`<cp-maintenance .plant=${e} ?admin=${this._ctl.admin} @save=${(n) => this._save(n.detail)}></cp-maintenance>`;
    if (this._view === "messages")
      return f`<div class="card pad"><cp-messages
        .messages=${this._ctl.messages}
        ?canClear=${this._ctl.admin && !this._ctl.sim}
        @clear=${() => this._ctl.clearMessages()}
      ></cp-messages></div>`;
    if (!this._ctl.admin) return f`<div class="card">${c("readonly_hint")}</div>`;
    const s = ["wizard", "editor", "mapping", "icons", "settings"], i = (n) => this._save(n.detail);
    return f`
      <div class="subnav">
        ${s.map((n) => f`<button class="sub ${this._sub === n ? "on" : ""}" @click=${() => this._go("config", n)}>${c(`cfg.${n}`)}</button>`)}
      </div>
      <div class="cfg ${this._sub === "editor" ? "fill" : ""}">
        ${this._sub === "wizard" ? f`<cp-wizard .plant=${e} @plant-generated=${async (n) => {
      await this._save(n.detail), this._showToast(c("wz.done")), this._go("config", "editor");
    }}></cp-wizard>` : v}
        ${this._sub === "editor" ? f`<cp-editor .plant=${e} .hass=${this.hass} .src=${t} .icons=${this._ctl.icons} .version=${this._ctl.version} @save=${i}></cp-editor>` : v}
        ${this._sub === "mapping" ? f`<cp-mapping .plant=${e} .hass=${this.hass} .api=${this._ctl.api} @save=${i}></cp-mapping>` : v}
        ${this._sub === "icons" ? f`<cp-icons .plant=${e} .api=${this._ctl.api} .icons=${this._ctl.icons} @save=${i} @icons-changed=${() => this._ctl.loadIcons()}></cp-icons>` : v}
        ${this._sub === "settings" ? f`<cp-settings .plant=${e} .hass=${this.hass} .api=${this._ctl.api} .version=${this._ctl.backendVersion} @save=${i}
              @plant-restored=${(n) => {
      this._ctl.setPlant(n.detail), this._showToast(c("bk.restored"));
    }}
              @reset-plant=${() => this._save({ ...Qt(), settings: { ...Qt().settings, demo: !0 } })}></cp-settings>` : v}
      </div>
    `;
  }
};
Ct.properties = {
  hass: { attribute: !1 },
  narrow: { type: Boolean },
  route: { attribute: !1 },
  panel: { attribute: !1 },
  _view: { state: !0 },
  _sub: { state: !0 },
  _toast: { state: !0 }
}, Ct.styles = [
  Ki,
  se,
  Q`
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
      /* six tabs: show only the active tab's label when space gets tight */
      @media (max-width: 1250px) {
        .tab:not(.on) .tl { display: none; }
        .brand span { display: none; }
      }
      @media (max-width: 700px) {
        header { padding: 8px 10px; gap: 6px; }
        .brand span { display: none; }
        .tl { display: none; }
        main { padding: 10px; }
      }
    `
];
let bs = Ct;
customElements.get("copilot-panel") || customElements.define("copilot-panel", bs);
export {
  bs as C,
  Q as a,
  f as b,
  Y as i
};
