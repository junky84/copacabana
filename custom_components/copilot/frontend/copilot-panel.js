/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht = globalThis, Ce = Ht.ShadowRoot && (Ht.ShadyCSS === void 0 || Ht.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Oe = Symbol(), je = /* @__PURE__ */ new WeakMap();
let fs = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== Oe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Ce && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = je.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && je.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ps = (a) => new fs(typeof a == "string" ? a : a + "", void 0, Oe), W = (a, ...t) => {
  const e = a.length === 1 ? a[0] : t.reduce((s, n, i) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + a[i + 1], a[0]);
  return new fs(e, a, Oe);
}, Ls = (a, t) => {
  if (Ce) a.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), n = Ht.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = e.cssText, a.appendChild(s);
  }
}, Ue = Ce ? (a) => a : (a) => a instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Ps(e);
})(a) : a;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Cs, defineProperty: Os, getOwnPropertyDescriptor: Hs, getOwnPropertyNames: Ws, getOwnPropertySymbols: Bs, getPrototypeOf: Rs } = Object, ie = globalThis, Ke = ie.trustedTypes, Is = Ke ? Ke.emptyScript : "", Ns = ie.reactiveElementPolyfillSupport, St = (a, t) => a, ue = { toAttribute(a, t) {
  switch (t) {
    case Boolean:
      a = a ? Is : null;
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
} }, gs = (a, t) => !Cs(a, t), Fe = { attribute: !0, type: String, converter: ue, reflect: !1, useDefault: !1, hasChanged: gs };
Symbol.metadata ??= Symbol("metadata"), ie.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ft = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Fe) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, e);
      n !== void 0 && Os(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: n, set: i } = Hs(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: n, set(o) {
      const r = n?.call(this);
      i?.call(this, o), this.requestUpdate(t, r, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Fe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(St("elementProperties"))) return;
    const t = Rs(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(St("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(St("properties"))) {
      const e = this.properties, s = [...Ws(e), ...Bs(e)];
      for (const n of s) this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, n] of e) this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const n = this._$Eu(e, s);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const n of s) e.unshift(Ue(n));
    } else t !== void 0 && e.push(Ue(t));
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
    return Ls(t, this.constructor.elementStyles), t;
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
    const s = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, s);
    if (n !== void 0 && s.reflect === !0) {
      const i = (s.converter?.toAttribute !== void 0 ? s.converter : ue).toAttribute(e, s.type);
      this._$Em = t, i == null ? this.removeAttribute(n) : this.setAttribute(n, i), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const i = s.getPropertyOptions(n), o = typeof i.converter == "function" ? { fromAttribute: i.converter } : i.converter?.fromAttribute !== void 0 ? i.converter : ue;
      this._$Em = n;
      const r = o.fromAttribute(e, i.type);
      this[n] = r ?? this._$Ej?.get(n) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, n = !1, i) {
    if (t !== void 0) {
      const o = this.constructor;
      if (n === !1 && (i = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? gs)(i, e) || s.useDefault && s.reflect && i === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: n, wrapped: i }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), i !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [n, i] of this._$Ep) this[n] = i;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, i] of s) {
        const { wrapped: o } = i, r = this[n];
        o !== !0 || this._$AL.has(n) || r === void 0 || this.C(n, void 0, i, r);
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
ft.elementStyles = [], ft.shadowRootOptions = { mode: "open" }, ft[St("elementProperties")] = /* @__PURE__ */ new Map(), ft[St("finalized")] = /* @__PURE__ */ new Map(), Ns?.({ ReactiveElement: ft }), (ie.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const He = globalThis, Ze = (a) => a, Rt = He.trustedTypes, Ye = Rt ? Rt.createPolicy("lit-html", { createHTML: (a) => a }) : void 0, _s = "$lit$", it = `lit$${Math.random().toFixed(9).slice(2)}$`, vs = "?" + it, Vs = `<${vs}>`, pt = document, Dt = () => pt.createComment(""), Tt = (a) => a === null || typeof a != "object" && typeof a != "function", We = Array.isArray, js = (a) => We(a) || typeof a?.[Symbol.iterator] == "function", oe = `[ 	
\f\r]`, bt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ge = /-->/g, qe = />/g, at = RegExp(`>|${oe}(?:([^\\s"'>=/]+)(${oe}*=${oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Je = /'/g, Xe = /"/g, $s = /^(?:script|style|textarea|title)$/i, ys = (a) => (t, ...e) => ({ _$litType$: a, strings: t, values: e }), u = ys(1), v = ys(2), _t = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), Qe = /* @__PURE__ */ new WeakMap(), rt = pt.createTreeWalker(pt, 129);
function ws(a, t) {
  if (!We(a) || !a.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ye !== void 0 ? Ye.createHTML(t) : t;
}
const Us = (a, t) => {
  const e = a.length - 1, s = [];
  let n, i = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = bt;
  for (let r = 0; r < e; r++) {
    const c = a[r];
    let p, h, d = -1, m = 0;
    for (; m < c.length && (o.lastIndex = m, h = o.exec(c), h !== null); ) m = o.lastIndex, o === bt ? h[1] === "!--" ? o = Ge : h[1] !== void 0 ? o = qe : h[2] !== void 0 ? ($s.test(h[2]) && (n = RegExp("</" + h[2], "g")), o = at) : h[3] !== void 0 && (o = at) : o === at ? h[0] === ">" ? (o = n ?? bt, d = -1) : h[1] === void 0 ? d = -2 : (d = o.lastIndex - h[2].length, p = h[1], o = h[3] === void 0 ? at : h[3] === '"' ? Xe : Je) : o === Xe || o === Je ? o = at : o === Ge || o === qe ? o = bt : (o = at, n = void 0);
    const f = o === at && a[r + 1].startsWith("/>") ? " " : "";
    i += o === bt ? c + Vs : d >= 0 ? (s.push(p), c.slice(0, d) + _s + c.slice(d) + it + f) : c + it + (d === -2 ? r : f);
  }
  return [ws(a, i + (a[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Pt {
  constructor({ strings: t, _$litType$: e }, s) {
    let n;
    this.parts = [];
    let i = 0, o = 0;
    const r = t.length - 1, c = this.parts, [p, h] = Us(t, e);
    if (this.el = Pt.createElement(p, s), rt.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = rt.nextNode()) !== null && c.length < r; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(_s)) {
          const m = h[o++], f = n.getAttribute(d).split(it), _ = /([.?@])?(.*)/.exec(m);
          c.push({ type: 1, index: i, name: _[2], strings: f, ctor: _[1] === "." ? Fs : _[1] === "?" ? Zs : _[1] === "@" ? Ys : ne }), n.removeAttribute(d);
        } else d.startsWith(it) && (c.push({ type: 6, index: i }), n.removeAttribute(d));
        if ($s.test(n.tagName)) {
          const d = n.textContent.split(it), m = d.length - 1;
          if (m > 0) {
            n.textContent = Rt ? Rt.emptyScript : "";
            for (let f = 0; f < m; f++) n.append(d[f], Dt()), rt.nextNode(), c.push({ type: 2, index: ++i });
            n.append(d[m], Dt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === vs) c.push({ type: 2, index: i });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(it, d + 1)) !== -1; ) c.push({ type: 7, index: i }), d += it.length - 1;
      }
      i++;
    }
  }
  static createElement(t, e) {
    const s = pt.createElement("template");
    return s.innerHTML = t, s;
  }
}
function vt(a, t, e = a, s) {
  if (t === _t) return t;
  let n = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const i = Tt(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== i && (n?._$AO?.(!1), i === void 0 ? n = void 0 : (n = new i(a), n._$AT(a, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = n : e._$Cl = n), n !== void 0 && (t = vt(a, n._$AS(a, t.values), n, s)), t;
}
class Ks {
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
    const { el: { content: e }, parts: s } = this._$AD, n = (t?.creationScope ?? pt).importNode(e, !0);
    rt.currentNode = n;
    let i = rt.nextNode(), o = 0, r = 0, c = s[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let p;
        c.type === 2 ? p = new Lt(i, i.nextSibling, this, t) : c.type === 1 ? p = new c.ctor(i, c.name, c.strings, this, t) : c.type === 6 && (p = new Gs(i, this, t)), this._$AV.push(p), c = s[++r];
      }
      o !== c?.index && (i = rt.nextNode(), o++);
    }
    return rt.currentNode = pt, n;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class Lt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, n) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = vt(this, t, e), Tt(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== _t && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : js(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && Tt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(pt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Pt.createElement(ws(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const i = new Ks(n, this), o = i.u(this.options);
      i.p(e), this.T(o), this._$AH = i;
    }
  }
  _$AC(t) {
    let e = Qe.get(t.strings);
    return e === void 0 && Qe.set(t.strings, e = new Pt(t)), e;
  }
  k(t) {
    We(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, n = 0;
    for (const i of t) n === e.length ? e.push(s = new Lt(this.O(Dt()), this.O(Dt()), this, this.options)) : s = e[n], s._$AI(i), n++;
    n < e.length && (this._$AR(s && s._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = Ze(t).nextSibling;
      Ze(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class ne {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, n, i) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = i, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = g;
  }
  _$AI(t, e = this, s, n) {
    const i = this.strings;
    let o = !1;
    if (i === void 0) t = vt(this, t, e, 0), o = !Tt(t) || t !== this._$AH && t !== _t, o && (this._$AH = t);
    else {
      const r = t;
      let c, p;
      for (t = i[0], c = 0; c < i.length - 1; c++) p = vt(this, r[s + c], e, c), p === _t && (p = this._$AH[c]), o ||= !Tt(p) || p !== this._$AH[c], p === g ? t = g : t !== g && (t += (p ?? "") + i[c + 1]), this._$AH[c] = p;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Fs extends ne {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class Zs extends ne {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class Ys extends ne {
  constructor(t, e, s, n, i) {
    super(t, e, s, n, i), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = vt(this, t, e, 0) ?? g) === _t) return;
    const s = this._$AH, n = t === g && s !== g || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, i = t !== g && (s === g || n);
    n && this.element.removeEventListener(this.name, this, s), i && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Gs {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    vt(this, t);
  }
}
const qs = He.litHtmlPolyfillSupport;
qs?.(Pt, Lt), (He.litHtmlVersions ??= []).push("3.3.3");
const Js = (a, t, e) => {
  const s = e?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const i = e?.renderBefore ?? null;
    s._$litPart$ = n = new Lt(t.insertBefore(Dt(), i), i, void 0, e ?? {});
  }
  return n._$AI(a), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Be = globalThis;
class O extends ft {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Js(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return _t;
  }
}
O._$litElement$ = !0, O.finalized = !0, Be.litElementHydrateSupport?.({ LitElement: O });
const Xs = Be.litElementPolyfillSupport;
Xs?.({ LitElement: O });
(Be.litElementVersions ??= []).push("4.2.2");
const ts = "copilot.standalone.plant", xt = "copilot.standalone.icons";
function Ct(a, t) {
  try {
    const e = localStorage.getItem(a);
    return e ? JSON.parse(e) : t;
  } catch {
    return t;
  }
}
function ae(a, t) {
  try {
    localStorage.setItem(a, JSON.stringify(t));
  } catch {
  }
}
class Qs {
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
    return this.standalone ? { version: "demo", plant: Ct(ts, null), options: {}, is_admin: !0 } : this.hass.callWS({ type: "copilot/config/get" });
  }
  async saveConfig(t) {
    if (this.standalone) return ae(ts, t);
    await this.hass.callWS({ type: "copilot/config/save", plant: t });
  }
  async scan(t) {
    return this.standalone ? { source: "ems_esp", entity_count: 0, entities: [], suggestions: [] } : this.hass.callWS({ type: "copilot/mapping/scan", source: "ems_esp", plant: t });
  }
  async listIcons() {
    return this.standalone ? Ct(xt, []) : (await this.hass.callWS({ type: "copilot/icons/list" })).icons;
  }
  async uploadIcon(t, e, s, n) {
    if (this.standalone) {
      const i = Ct(xt, []), o = { id: Math.random().toString(16).slice(2, 14), name: t, mime: e, iso: n, size: s.length, data_url: `data:${e};base64,${s}` };
      return i.push(o), ae(xt, i), o;
    }
    return (await this.hass.callWS({ type: "copilot/icons/upload", name: t, mime: e, data: s, iso: n })).icon;
  }
  async deleteIcon(t) {
    if (this.standalone) return ae(xt, Ct(xt, []).filter((e) => e.id !== t));
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
const ti = {
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
  "wz.separator": "Schlammabscheider im Rücklauf",
  "wz.expansion": "Ausdehnungsgefäß",
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
}, ei = {
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
  "wz.separator": "Dirt separator in return",
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
}, es = { de: ti, en: ei };
let yt = "de";
function ss(a) {
  yt = a;
}
function si() {
  return yt;
}
function is(a, t) {
  return a === "de" || a === "en" ? a : (t || "de").toLowerCase().startsWith("de") ? "de" : "en";
}
function l(a, t) {
  let e = es[yt][a] ?? es.de[a] ?? a;
  return t && (e = e.replace(/\{(\w+)\}/g, (s, n) => {
    const i = t[n];
    return typeof i == "number" ? P(i, Number.isInteger(i) ? 0 : 1) : i == null ? "" : String(i);
  })), e;
}
function P(a, t = 1) {
  return a.toLocaleString(yt === "de" ? "de-DE" : "en-GB", {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  });
}
function bs(a) {
  return new Date(a * 1e3).toLocaleTimeString(yt === "de" ? "de-DE" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function ii(a) {
  const t = new Date(a * 1e3), e = /* @__PURE__ */ new Date();
  return t.toDateString() === e.toDateString() ? bs(a) : t.toLocaleString(yt === "de" ? "de-DE" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function ni(a) {
  const t = Math.round(a / 60);
  return t < 60 ? `${t} min` : `${Math.floor(t / 60)} h ${t % 60} min`;
}
function $t(a, t) {
  const e = `slot.${a}.${t}`, s = l(e);
  return s === e ? l(`slot.${t}`) : s;
}
const y = 20, E = (a, t = !1) => ({ key: a, kind: "temp", show: t }), R = {
  outdoor_unit: {
    type: "outdoor_unit",
    w: 9,
    h: 7,
    group: "generator",
    badges: "below",
    ports: [
      { id: "out", x: 9, y: 2, dir: "r", kind: "supply" },
      { id: "in", x: 9, y: 5, dir: "r", kind: "return" }
    ],
    slots: [
      E("outdoor_temp", !0),
      { key: "activity", kind: "enum" },
      { key: "heat_power", kind: "power_kw", show: !0 },
      { key: "el_power", kind: "power_w", show: !0 },
      { key: "compressor_speed", kind: "percent", show: !0 },
      { key: "compressor_on", kind: "bool" },
      { key: "fan_speed", kind: "percent" },
      E("air_in_temp"),
      { key: "compressor_starts", kind: "count" },
      E("evap_in_temp"),
      E("comp_in_temp"),
      E("comp_out_temp"),
      E("hp_temp"),
      E("lp_temp"),
      E("drain_pan_temp"),
      { key: "silent_mode", kind: "enum" }
    ]
  },
  indoor_unit: {
    type: "indoor_unit",
    w: 6,
    h: 10,
    group: "generator",
    badges: "below",
    ports: [
      { id: "src_in", x: 0, y: 2, dir: "l", tempSlot: "supply_temp", kind: "supply" },
      { id: "src_out", x: 0, y: 8, dir: "l", tempSlot: "return_temp", kind: "return" },
      { id: "sup", x: 6, y: 2, dir: "r", tempSlot: "supply_temp", kind: "supply" },
      { id: "ret", x: 6, y: 8, dir: "r", tempSlot: "return_temp", kind: "return" }
    ],
    slots: [
      E("supply_temp", !0),
      E("return_temp", !0),
      E("target_flow_temp", !0),
      { key: "pressure", kind: "pressure", show: !0 },
      { key: "flow", kind: "flow" },
      { key: "aux_level", kind: "percent", show: !0 },
      E("condenser_temp"),
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
  buffer: {
    type: "buffer",
    w: 4,
    h: 10,
    group: "storage",
    badges: "tank",
    ports: [
      { id: "in_sup", x: 0, y: 2, dir: "l", kind: "supply" },
      { id: "in_ret", x: 0, y: 8, dir: "l", tempSlot: "temp_bottom", kind: "return" },
      { id: "out_sup", x: 4, y: 2, dir: "r", tempSlot: "temp_top", kind: "supply" },
      { id: "out_ret", x: 4, y: 8, dir: "r", kind: "return" }
    ],
    slots: [E("temp_top", !0), E("temp_mid"), E("temp_bottom", !0)]
  },
  dhw_tank: {
    type: "dhw_tank",
    w: 5,
    h: 11,
    group: "storage",
    badges: "tank",
    ports: [
      { id: "coil_in", x: 0, y: 5, dir: "l", kind: "supply" },
      { id: "coil_out", x: 0, y: 9, dir: "l", tempSlot: "temp_bottom", kind: "return" },
      { id: "hot", x: 3, y: 0, dir: "t", tempSlot: "temp_top", kind: "dhw_hot" },
      { id: "circ", x: 5, y: 4, dir: "r", kind: "circulation" },
      { id: "cold", x: 3, y: 11, dir: "b", kind: "dhw_cold" }
    ],
    slots: [
      E("temp_top", !0),
      E("temp_bottom"),
      E("setpoint", !0),
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
    slots: [{ key: "position", kind: "percent", show: !0 }, E("flow_temp", !0)]
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
      E("flow_temp", !0),
      E("return_temp", !0),
      E("target_flow_temp"),
      E("room_temp", !0),
      E("room_setpoint"),
      { key: "mode", kind: "enum" },
      { key: "summer_mode", kind: "enum" },
      { key: "operating_state", kind: "enum" },
      E("design_temp"),
      { key: "offset_temp", kind: "temp" },
      E("min_flow_temp"),
      E("max_flow_temp")
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
    badges: "right",
    ports: [
      { id: "hot", x: 0, y: 1, dir: "l", kind: "dhw_hot" },
      { id: "circ", x: 1, y: 3, dir: "b", kind: "circulation" }
    ],
    slots: [{ key: "flow", kind: "flow_lmin", show: !0 }, E("temp")]
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
R.floor_heating.slots = R.radiators.slots;
function lt(a) {
  return a.type === "value_tile" ? (a.props.entries || []).map((t) => ({
    key: t.slot,
    kind: t.kind || "text",
    show: !0
  })) : R[a.type].slots;
}
function Wt(a) {
  const t = R[a.type];
  if (a.type === "value_tile") {
    const s = (a.props.entries || []).length;
    return { w: t.w, h: 2 + Math.ceil(s * 1.3) };
  }
  const e = a.rot || 0;
  return e === 90 || e === 270 ? { w: t.h, h: t.w } : { w: t.w, h: t.h };
}
const ns = ["r", "b", "l", "t"];
function oi(a, t) {
  const e = t / 90 % 4;
  return ns[(ns.indexOf(a) + e) % 4];
}
function dt(a, t) {
  const e = R[a.type], s = e.ports.find((p) => p.id === t);
  if (!s) return null;
  const n = a.rot || 0, { w: i, h: o } = e;
  let { x: r, y: c } = s;
  return n === 90 ? [r, c] = [o - c, r] : n === 180 ? [r, c] = [i - r, o - c] : n === 270 && ([r, c] = [c, i - r]), { x: a.x + r, y: a.y + c, dir: oi(s.dir, n), def: s };
}
const It = [
  { id: "buderus-wlw-mb-ar", label: "Buderus Logatherm WLW-… MB AR (Monoblock)", brand: "buderus", source: "air", nominal: 7, refrigerant: "R290" },
  { id: "buderus-wlw176i-ar", label: "Buderus Logatherm WLW176i AR", brand: "buderus", source: "air", nominal: 7 },
  { id: "buderus-wlw196i-ar", label: "Buderus Logatherm WLW196i AR", brand: "buderus", source: "air", nominal: 8 },
  { id: "buderus-wsw", label: "Buderus Logatherm WSW (Sole/Wasser)", brand: "buderus", source: "brine", nominal: 8 },
  { id: "bosch-cs5800i-aw", label: "Bosch Compress 5800i AW", brand: "bosch", source: "air", nominal: 7 },
  { id: "bosch-cs6800i-aw", label: "Bosch Compress 6800i AW", brand: "bosch", source: "air", nominal: 7 },
  { id: "bosch-cs7800i-lw", label: "Bosch Compress 7800i LW (Sole/Wasser)", brand: "bosch", source: "brine", nominal: 8 },
  { id: "generic-air", label: "Luft/Wasser (allgemein)", brand: "generic", source: "air", nominal: 8 },
  { id: "generic-brine", label: "Sole/Wasser (allgemein)", brand: "generic", source: "brine", nominal: 8 }
], xs = [
  { id: "buderus-wlw186i-e", label: "Buderus Logatherm WLW186i E (wandhängend, E-Zuheizer)", aux: !0 },
  { id: "buderus-wlw186i-b", label: "Buderus Logatherm WLW186i B (bivalent)" },
  { id: "buderus-wlw186i-t", label: "Buderus Logatherm WLW186i T (mit WW-Speicher)", aux: !0, tank: !0 },
  { id: "buderus-wlw176i-e", label: "Buderus Logatherm WLW176i E", aux: !0 },
  { id: "bosch-aw-e", label: "Bosch Compress AW Inneneinheit (E-Zuheizer)", aux: !0 },
  { id: "bosch-aw-b", label: "Bosch Compress AW Inneneinheit (bivalent)" },
  { id: "bosch-aw-m", label: "Bosch Compress AW Inneneinheit (mit Speicher)", aux: !0, tank: !0 },
  { id: "generic", label: "Andere Inneneinheit / Hydraulikmodul" }
];
function Re(a) {
  return It.find((t) => t.id === a) || It.find((t) => t.id === "generic-air");
}
const ks = /* @__PURE__ */ new Set(["on", "true", "1", "yes", "ja", "ein", "an", "active", "aktiv", "open", "offen"]);
function H(a) {
  return !a || !a.available || a.raw === null ? !1 : typeof a.raw == "boolean" ? a.raw : a.num !== null ? a.num > 0 : ks.has(String(a.raw).trim().toLowerCase());
}
const ai = {
  off: ["off", "aus", "uit", "av", "arrêt", "standby", "bereit"],
  heating: ["heating", "heizen", "verwarmen", "uppvärmning", "chauffage", "ogrzewanie", "riscaldamento"],
  cooling: ["cooling", "kühlen", "koelen", "kyler", "refroidissement", "chłodzenie", "raffreddamento"],
  hot_water: ["hot water", "hot_water", "warmwasser", "warm water", "varmvatten", "eau chaude", "c.w.u.", "acqua calda"],
  pool_heating: ["pool heating", "pool beheizen", "zwembadverwarming", "chauffage piscine"],
  pool: ["pool", "zwembad", "piscine", "basen", "piscina"],
  defrost: ["defrost", "abtauen", "ontdooien", "avfrostning", "dégivrage", "odladzanie", "scongelamento"],
  compressor_alarm: ["compressor alarm", "compressor_alarm", "kompressor alarm", "kompressoralarm"]
};
function Ie(a) {
  if (!a || !a.available || a.raw === null) return;
  const t = String(a.raw).trim().toLowerCase();
  for (const [e, s] of Object.entries(ai)) if (s.includes(t)) return e;
  return t.includes("abtau") || t.includes("defrost") ? "defrost" : t;
}
function ri(a, t, e) {
  if (a === void 0 || a === "unavailable" || a === "unknown" || a === "")
    return { raw: null, num: null, unit: t, entity: e, available: !1 };
  const s = Number(a);
  return { raw: a, num: Number.isFinite(s) ? s : null, unit: t, entity: e, available: !0 };
}
class li {
  constructor(t) {
    this.hass = t;
  }
  entityOf(t, e) {
    return t.type === "value_tile" ? (t.props.entries || []).find((n) => n.slot === e)?.entity : t.bindings[e];
  }
  get(t, e) {
    const s = this.entityOf(t, e);
    return s ? this.getEntity(s) : void 0;
  }
  getEntity(t) {
    const e = this.hass.states[t];
    return ri(e?.state, e?.attributes?.unit_of_measurement, t);
  }
  async history(t, e, s) {
    const n = this.entityOf(t, e);
    return n ? ci(this.hass, n, s) : [];
  }
}
async function ci(a, t, e) {
  const s = /* @__PURE__ */ new Date(), n = new Date(s.getTime() - e * 36e5);
  return ((await a.callWS({
    type: "history/history_during_period",
    start_time: n.toISOString(),
    end_time: s.toISOString(),
    entity_ids: [t],
    minimal_response: !0,
    no_attributes: !0,
    significant_changes_only: !1
  }))[t] || []).map((r) => {
    const c = String(r.s).toLowerCase();
    let p = Number(r.s);
    return Number.isFinite(p) || (p = ks.has(c) ? 1 : c === "off" || c === "false" ? 0 : null), { t: r.lu, v: p };
  });
}
function me(a, t) {
  const e = /* @__PURE__ */ new Set(), s = (n) => t.get(a, n);
  switch (a.type) {
    case "pump":
    case "mixer":
      (H(s("running")) || H(s("speed")) || H(s("flow"))) && e.add("running"), a.type === "mixer" && H(s("position")) && e.add("running");
      break;
    case "valve_3way": {
      const n = s("position");
      e.add(H(n) ? "b" : "a");
      break;
    }
    case "outdoor_unit": {
      const n = Ie(s("activity"));
      (H(s("compressor_on")) || H(s("compressor_speed")) || H(s("heat_power"))) && e.add("running"), n === "defrost" && e.add("defrost"), n === "compressor_alarm" && e.add("alarm"), n && n !== "off" && n !== "compressor_alarm" && e.add("running"), n && e.add(`mode_${n}`);
      break;
    }
    case "indoor_unit":
      (H(s("aux_level")) || H(s("aux_step1")) || H(s("aux_step2")) || H(s("aux_step3"))) && e.add("aux"), H(s("flow")) && e.add("running");
      break;
    case "dhw_tank":
      H(s("charging")) && e.add("charging"), H(s("disinfecting")) && e.add("disinfecting");
      break;
    case "tap":
      H(s("flow")) && e.add("flowing");
      break;
    case "radiators":
    case "floor_heating":
      e.add("on");
      break;
  }
  return e;
}
function os(a, t) {
  const e = t.get(a.c);
  return e ? a.s.startsWith("!") ? !e.has(a.s.slice(1)) : e.has(a.s) : !1;
}
function pi(a, t) {
  const e = a.flow || [], s = a.flowAny || [];
  return e.length === 0 && s.length === 0 ? !1 : e.every((n) => os(n, t)) && (s.length === 0 || s.some((n) => os(n, t)));
}
function di(a, t) {
  const e = new Map(a.components.map((i) => [i.id, i])), s = /* @__PURE__ */ new Map(), n = (i) => {
    const o = e.get(i.c);
    if (!o) return;
    const r = dt(o, i.p);
    if (r) {
      if (r.def.fixedTemp !== void 0) return r.def.fixedTemp;
      if (r.def.tempSlot) {
        const c = t.get(o, r.def.tempSlot);
        if (c?.available && c.num !== null) return c.num;
      }
    }
  };
  for (const i of a.pipes) {
    if (i.bindings?.temp) {
      const r = t.getEntity(i.bindings.temp);
      if (r?.available && r.num !== null) {
        s.set(i.id, r.num);
        continue;
      }
    }
    const o = n(i.from);
    o !== void 0 && s.set(i.id, o);
  }
  for (let i = 0; i < 6; i++) {
    let o = !1;
    for (const r of a.pipes) {
      if (s.has(r.id)) continue;
      const c = e.get(r.from.c);
      if (c && R[c.type].passive) {
        const p = a.pipes.find((h) => h.to.c === c.id && s.has(h.id));
        if (p) {
          s.set(r.id, s.get(p.id)), o = !0;
          continue;
        }
      }
      if (i === 5 || !c || !R[c.type].passive) {
        const p = n(r.to);
        p !== void 0 && (s.set(r.id, p), o = !0);
      }
    }
    if (!o && i > 0) break;
  }
  return s;
}
const hi = {
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
function fe(a, t) {
  return lt(a).find((e) => e.key === t)?.kind || "text";
}
function zt(a, t) {
  if (!a) return { text: l("none"), unit: "" };
  if (!a.available) return { text: l("none"), unit: "" };
  if (t === "bool") return { text: H(a) ? l("on") : l("off"), unit: "" };
  if (t === "enum" && a.num === null) {
    const o = `mode.${Ie(a)}`, r = l(o);
    return { text: r === o ? String(a.raw) : r, unit: "" };
  }
  let e = a.unit ?? hi[t] ?? "";
  if (a.num === null) return { text: String(a.raw), unit: "" };
  let s = a.num;
  t === "power_w" && e === "W" && Math.abs(s) >= 1e3 && (s = s / 1e3, e = "kW");
  const n = t === "count" || t === "percent" || t === "flow" || t === "duration" || t === "power_w" && e === "W" || t === "energy" && s >= 100 ? 0 : 1;
  return { text: P(s, n), unit: e };
}
function N(a, t) {
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
  if (a <= e[0][0]) return re(e[0][1]);
  for (let s = 1; s < e.length; s++) {
    const [n, i] = e[s], [o, r] = e[s - 1];
    if (a <= n) {
      const c = (a - o) / (n - o);
      return re([0, 1, 2].map((p) => r[p] + (i[p] - r[p]) * c));
    }
  }
  return re(e[e.length - 1][1]);
}
function re(a) {
  return `rgb(${a.map((t) => Math.round(t)).join(",")})`;
}
const ui = {
  supply: "#ff7a45",
  return: "#4d9fff",
  dhw_hot: "#ff4f8b",
  dhw_cold: "#38d0ff",
  circulation: "#b07cff"
}, mi = {
  nominal: 7.1,
  source: "air",
  bufferL: 120,
  dhwL: 274,
  auxKw: 6,
  heatLoad: 6.2,
  designTemp: -12,
  floor: !1
}, ut = 4.186 / 3600, as = 10, q = 21, fi = 10, gi = [
  // hour of day, minutes, litres per minute (mixed at 40 °C)
  [6.5, 7, 9],
  [6.85, 6, 9],
  [7.2, 5, 8],
  [12.25, 2, 4],
  [18.6, 3, 5],
  [20.4, 8, 9],
  [21.1, 6, 9]
], _i = [
  [6, 7.5],
  [11.5, 12.5],
  [17.5, 19]
];
class vi {
  constructor(t = {}, e = Date.now() / 1e3, s) {
    this.speed = 60, this.outdoorMean = 2, this.dailySwing = 2.5, this.tOut = 2, this.tRoom = 20.8, this.bufTop = 38, this.bufBot = 33, this.dhwTop = 49, this.dhwBot = 43, this.tVl = 30, this.tRl = 28, this.tVlHc = 38, this.tRlHc = 32, this.mode = "off", this.pTh = 0, this.pEl = 0, this.cop = 0, this.running = !1, this.lastStart = -1e9, this.lastStop = -1e9, this.pc0Overrun = 0, this.ice = 0.3, this.defrostLeft = 0, this.aux = 0, this.auxTimer = 0, this.heatDemand = !1, this.dhwDemand = !1, this.tapFlow = 0, this.tapLeft = 0, this.qEmit = 0, this.starts = 0, this.e = { el: 0, heat: 0, elHeat: 0, elDhw: 0, heatHeat: 0, heatDhw: 0, aux: 0 }, this.dim14a = !1, this.pv = !1, this.disinfect = !1, this.fault = !1, this.lastDrawDay = /* @__PURE__ */ new Map(), this.days = /* @__PURE__ */ new Map(), this.sampleAcc = 0, this.hist = /* @__PURE__ */ new Map(), this.active = /* @__PURE__ */ new Map(), this.messages = [], this.labels = { dhw: "WW" }, this.listeners = [], this.p = { ...mi, ...t }, s && (this.labels = { ...this.labels, ...s }), this.time = e - 24 * 3600, this.prefill(e);
  }
  prefill(t) {
    const e = this.listeners;
    for (this.listeners = []; this.time < t; ) this.step(as);
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
      const n = Math.min(as, e);
      this.step(n), e -= n;
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
    const t = this.p.floor ? 35 : 50, e = (t - q) / (q - this.p.designTemp), s = this.pv ? 5 : 0;
    return Math.max(25, Math.min(t + 5, q + (q - this.tOut) * e + s));
  }
  dhwSetpoint() {
    return this.disinfect ? 60 : this.pv ? 55 : 50;
  }
  step(t) {
    this.time += t;
    const e = this.hour(), s = t / 3600, n = this.p, i = this.outdoorMean + this.dailySwing * Math.cos((e - 15) / 24 * 2 * Math.PI);
    this.tOut += (i - this.tOut) * Math.min(1, t / 1800);
    const o = this.tOut < 16, r = this.curveSetpoint(), c = o ? 650 * ut * 3600 / 3600 : 0, p = n.heatLoad * (n.floor, 1), h = n.floor ? 30 - q : 45 - q, d = n.floor ? 1.1 : 1.3;
    let m = 0;
    if (this.tVlHc = this.bufTop, c > 0) {
      let T = this.tVlHc - 3;
      for (let st = 0; st < 4; st++)
        m = p * Math.pow(Math.max(0, (T - this.tRoom) / h), d), T = this.tVlHc - m / (2 * c);
      m *= Math.max(0.1, Math.min(1, 1 - (this.tRoom - q - 0.2) * 1.5)), this.tRlHc = this.tVlHc - m / c;
    } else
      this.tRlHc = this.bufBot;
    this.qEmit = m;
    const f = n.heatLoad / (q - n.designTemp);
    this.tRoom += (m - f * (this.tRoom - this.tOut) + 0.35) * s / 9;
    const _ = Math.floor(this.time / 86400);
    gi.forEach(([T, st, Ts], Ve) => {
      e >= T && e < T + 0.1 && this.lastDrawDay.get(Ve) !== _ && (this.lastDrawDay.set(Ve, _), this.startDraw(st, Ts));
    }), this.tapLeft > 0 && (this.tapLeft -= t, this.tapLeft <= 0 && (this.tapFlow = 0));
    const k = _i.some(([T, st]) => e >= T && e < st), w = n.dhwL / 2 * ut, A = this.tapFlow * 60 * ut * (40 - fi), L = 1.38 / 24 / 2 + (k ? 0.12 : 0) / 2;
    this.dhwTop -= (A * 0.35 + L) * s / w, this.dhwBot -= (A * 0.65 + L) * s / w;
    const M = this.dhwSetpoint();
    (this.dhwTop < M - 5 || this.dhwBot < M - 14 || this.disinfect && this.dhwBot < 59) && (this.dhwDemand = !0), this.dhwBot >= M - 0.5 && this.dhwTop >= M - 0.5 && (this.dhwDemand = !1, this.disinfect && (this.disinfect = !1, this.condition("dis", !1, "info", "dhw_disinfection", {}, "dhw"))), o && this.bufTop < r - 2 && (this.heatDemand = !0);
    const x = this.time - this.lastStart > 600;
    (!o || this.bufTop > r + 2.5 && x) && (this.heatDemand = !1);
    let b = this.fault ? "compressor_alarm" : this.dhwDemand ? "hot_water" : this.heatDemand ? "heating" : "off";
    this.defrostLeft > 0 && !this.fault && (b = "defrost");
    const D = b === "heating" || b === "hot_water" || b === "defrost";
    D && !this.running ? this.time - this.lastStop >= 480 || b === "defrost" ? (this.running = !0, this.lastStart = this.time, this.starts++, this.pTh = this.pMin()) : b = "off" : !D && this.running && (this.time - this.lastStart > 600 || this.fault ? (this.running = !1, this.lastStop = this.time, this.pc0Overrun = 180) : b = this.mode === "hot_water" ? "hot_water" : "heating"), this.mode = this.running ? b : this.fault ? "compressor_alarm" : "off";
    const S = this.pMax(), Y = this.pMin();
    let K = 0;
    if (this.running && this.mode === "heating" ? K = this.qEmit + 2.2 * (r + 1 - this.bufTop) : this.running && this.mode === "hot_water" && (K = Math.min(S * 0.9, Math.max(Y, (60 - this.dhwBot - 3) * 0.9))), this.running && this.mode !== "defrost") {
      K = Math.max(Y, Math.min(S, K)), this.pTh < Y && (this.pTh = Y);
      const T = 0.5 * (t / 60);
      this.pTh += Math.max(-T * 2, Math.min(T, K - this.pTh));
    } else this.mode === "defrost" ? this.pTh = -3 : this.pTh = 0;
    let I = 0;
    this.dim14a || (this.fault && o ? I = n.auxKw : this.mode === "heating" && this.bufTop < r - 5 && this.pTh >= S * 0.95 ? (this.auxTimer += t, this.auxTimer > 1200 && (I = Math.min(n.auxKw, 3))) : this.auxTimer = 0, this.tOut < n.designTemp + 2 && this.mode === "heating" && (I = Math.max(I, Math.min(n.auxKw, 3))), this.disinfect && this.mode === "hot_water" && this.dhwBot > 52 && (I = Math.min(n.auxKw, 3))), this.fault && o && I > 0 && (this.heatDemand = !0), this.aux = I;
    const G = this.running || this.pc0Overrun > 0 || this.fault && this.aux > 0;
    !this.running && this.pc0Overrun > 0 && (this.pc0Overrun -= t);
    const F = G ? 1100 * ut : 0, j = this.mode === "hot_water", B = (this.running ? this.pTh : 0) + this.aux;
    j ? this.tRl = this.dhwBot + 2 : this.tRl = G ? this.bufBot : this.tRl + (22 - this.tRl) * Math.min(1, t / 3600), this.tVl = F > 0 ? this.tRl + B / F : this.tVl + (this.tRl - this.tVl) * Math.min(1, t / 600);
    const Q = (n.bufferL + 60) / 2 * ut, tt = j ? 0 : F, et = 0.05 / 2, Z = tt * (this.tVl - this.bufTop) + (c > tt ? (c - tt) * (this.bufBot - this.bufTop) : 0) - et, nt = c * (this.tRlHc - this.bufBot) + (tt > c ? (tt - c) * (this.bufTop - this.bufBot) : 0) - et;
    if (this.bufTop += Z * s / Q, this.bufBot += nt * s / Q, this.bufBot > this.bufTop) {
      const T = (this.bufBot + this.bufTop) / 2;
      this.bufBot = this.bufTop = T;
    }
    if (j && (this.dhwBot += B * s / w, this.dhwBot > this.dhwTop)) {
      const T = (this.dhwBot + this.dhwTop) / 2;
      this.dhwBot = this.dhwTop = T;
    }
    if (this.running && this.mode !== "defrost") {
      const T = this.tVl + 273.15 + 3, st = (this.p.source === "air" ? this.tOut - 6 : 0) + 273.15;
      this.cop = Math.max(1.4, Math.min(7.5, 0.57 * T / Math.max(5, T - st))), this.pEl = this.pTh / this.cop + 0.06;
    } else this.mode === "defrost" ? (this.cop = 0, this.pEl = 1.1) : (this.cop = 0, this.pEl = 0.012 + (G ? 0.03 : 0));
    const C = Math.max(0, this.running ? this.pTh : 0);
    this.e.el += (this.pEl + this.aux) * s, this.e.aux += this.aux * s, this.e.heat += (C + this.aux) * s;
    const ht = new Date(this.time * 1e3), wt = new Date(ht.getFullYear(), ht.getMonth(), ht.getDate()).getTime();
    let ot = this.days.get(wt);
    if (!ot) {
      this.days.set(wt, ot = { heat: 0, el: 0, heatDhw: 0, elDhw: 0, aux: 0 });
      for (const T of [...this.days.keys()]) T < wt - 3 * 864e5 && this.days.delete(T);
    }
    if (ot.heat += (C + this.aux) * s, ot.el += (this.pEl + this.aux) * s, ot.aux += this.aux * s, j && (ot.heatDhw += C * s, ot.elDhw += this.pEl * s), j ? (this.e.elDhw += this.pEl * s, this.e.heatDhw += C * s) : (this.e.elHeat += this.pEl * s, this.e.heatHeat += C * s), this.defrostLeft > 0)
      this.defrostLeft -= t, this.defrostLeft <= 0 && (this.ice = 0, this.defrostLeft = 0);
    else if (this.p.source === "air" && this.running && this.tOut < 7 && this.tOut > -15) {
      const T = this.tOut > -2 ? 1.3 - Math.abs(this.tOut - 1) * 0.12 : 0.9 + this.tOut * 0.04;
      this.ice += Math.max(0.05, T) * (this.pTh / S) * s, this.ice >= 1 && (this.defrostLeft = 240 + Math.random() * 120);
    }
    this.emitConditions(), this.values = this.buildValues(r, M, k, G, F), this.sampleAcc += t, this.sampleAcc >= 60 && (this.sampleAcc = 0, this.sample());
  }
  startDraw(t, e) {
    this.tapFlow = e, this.tapLeft = t * 60;
  }
  buildValues(t, e, s, n, i) {
    const o = (p) => Math.round(p * 10) / 10, r = this.pMax(), c = this.running;
    return {
      outdoor: {
        outdoor_temp: o(this.tOut),
        air_in_temp: o(this.tOut + 0.4),
        activity: this.mode,
        compressor_on: c && this.mode !== "defrost" ? !0 : c,
        compressor_speed: c ? Math.round(Math.abs(this.pTh) / (r * 1.15) * 100) : 0,
        fan_speed: c && this.mode !== "defrost" ? Math.round(35 + this.pTh / r * 55) : 0,
        heat_power: o(Math.max(0, c ? this.pTh : 0)),
        el_power: Math.round(this.pEl * 1e3),
        compressor_starts: this.starts,
        evap_in_temp: o(this.tOut - (c ? 6 : 0)),
        comp_in_temp: o(this.tOut - (c ? 2 : 0)),
        comp_out_temp: o(c ? this.tVl + 28 : this.tOut + 5),
        hp_temp: o(c ? this.tVl + 3 : this.tOut),
        lp_temp: o(c ? this.tOut - 7 : this.tOut),
        drain_pan_temp: o(this.mode === "defrost" ? 4 : Math.max(this.tOut, 1)),
        silent_mode: "auto"
      },
      indoor: {
        supply_temp: o(this.tVl),
        return_temp: o(this.tRl),
        condenser_temp: o(this.tVl + (c ? 1 : 0)),
        target_flow_temp: o(this.mode === "hot_water" ? Math.min(62, e + 8) : t),
        pressure: o(1.45 + ((this.bufTop + this.bufBot) / 2 - 30) * 8e-3),
        flow: n ? Math.round(i / ut) : 0,
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
      pc0: { running: n, speed: n ? 72 : 0, flow: n ? 1100 : 0 },
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
        room_setpoint: q,
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
  condition(t, e, s, n, i, o) {
    const r = this.active.get(t);
    if (e && !r) {
      const c = {
        id: Math.random().toString(16).slice(2, 14),
        ts: this.time,
        level: s,
        key: n,
        params: i,
        component_id: o,
        active: !0,
        end_ts: null
      };
      this.active.set(t, c.id), this.messages.push(c), this.messages.length > 200 && this.messages.shift(), this.listeners.forEach((p) => p(c));
    } else if (!e && r) {
      this.active.delete(t);
      const c = this.messages.find((p) => p.id === r);
      c && (c.active = !1, c.end_ts = this.time, this.listeners.forEach((p) => p(c)));
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
      for (const [n, i] of Object.entries(s)) {
        const o = typeof i == "number" ? i : typeof i == "boolean" ? i ? 1 : 0 : null;
        if (o === null) continue;
        const r = `${e}.${n}`;
        let c = this.hist.get(r);
        c || this.hist.set(r, c = []), c.push({ t, v: o }), c.length > 1500 && c.splice(0, c.length - 1440);
      }
  }
  dailyEnergy() {
    return [...this.days.entries()].sort((t, e) => t[0] - e[0]).map(([t, e]) => ({ day: t, ...e }));
  }
  history(t, e, s) {
    const n = this.hist.get(`${t}.${e}`) || [], i = this.time - s * 3600;
    return n.filter((o) => o.t >= i);
  }
}
function rs(a) {
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
function le(a) {
  if (!a) return {};
  const t = a.components.find((r) => r.type === "outdoor_unit"), e = a.components.find((r) => r.type === "indoor_unit"), s = a.components.find((r) => r.type === "buffer"), n = a.components.find((r) => r.type === "dhw_tank"), i = Re(t?.model), o = a.components.filter((r) => r.type === "radiators" || r.type === "floor_heating");
  return {
    nominal: Number(t?.props.nominal_kw) || i.nominal,
    source: i.source,
    bufferL: Number(s?.props.volume) || (s ? 120 : 30),
    dhwL: Number(n?.props.volume) || 274,
    auxKw: Number(e?.props.aux_kw) || 6,
    heatLoad: Number(a.settings?.heat_load) || 6.2,
    floor: o.length > 0 && o.every((r) => r.type === "floor_heating")
  };
}
const $i = {};
class yi {
  constructor(t) {
    this.sim = t;
  }
  entityOf() {
  }
  getEntity() {
  }
  get(t, e) {
    if (t.type === "value_tile") {
      const i = (t.props.entries || []).find((c) => c.slot === e);
      if (!i?.sim) return;
      const [o, r] = i.sim.split(".");
      return this.wrap(this.sim.values[o]?.[r]);
    }
    const s = rs(t);
    if (!s) return;
    let n = this.sim.values[s]?.[e];
    if (n !== void 0)
      return s === "hc" && typeof n == "number" && Number(t.props.circuit) > 1 && ["flow_temp", "return_temp", "target_flow_temp"].includes(e) && (n = Math.round((n - (t.type === "floor_heating" ? 12 : 2)) * 10) / 10), this.wrap(n, $i[e]);
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
    const n = rs(t);
    return n ? this.sim.history(n, e, s) : [];
  }
}
function ge() {
  return {
    name: l("wz.example_name") === "wz.example_name" ? "Meine Anlage" : l("wz.example_name"),
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
class wi {
  constructor() {
    this.components = [], this.pipes = [], this.n = 0;
  }
  add(t, e, s, n, i, o = {}) {
    return this.components.push({ id: t, type: e, label: s, x: n, y: i, bindings: {}, props: {}, ...o }), t;
  }
  pipe(t, e, s, n = [], i = {}) {
    this.pipes.push({ id: `p${++this.n}`, from: t, to: e, kind: s, flow: n, ...i });
  }
}
const $ = (a, t) => ({ c: a, p: t });
function Ms(a, t) {
  const e = new wi(), s = a.dhw === "tank", n = { c: "pc0", s: "running" }, i = s ? [{ c: "vw1", s: "a" }] : [], o = { c: "vw1", s: "b" };
  e.add("ou", "outdoor_unit", a.outdoorLabel || l("type.outdoor_unit"), 1, 4, {
    model: a.outdoorModel,
    props: { nominal_kw: a.nominalKw }
  }), e.add("iu", "indoor_unit", a.indoorLabel || l("type.indoor_unit"), 14, 4, {
    model: a.indoorModel,
    props: {
      aux_kw: a.aux ? a.auxKw : 0,
      input_labels: { input1: "§14a / EVU", input4: "PV" },
      input_levels: { input1: "warning" },
      pressure_min: 1,
      pressure_max: 2.7
    }
  }), e.add("pc0", "pump", "PC0", 22, 11, { rot: 180, props: { role: "primary" } }), e.pipe($("ou", "out"), $("iu", "src_in"), "supply", [n]), e.pipe($("iu", "src_out"), $("ou", "in"), "return", [n]), e.pipe($("pc0", "out"), $("iu", "ret"), "return", [n]);
  let r = $("iu", "sup"), c = $("pc0", "in");
  s && (e.add("vw1", "valve_3way", "VW1", 27, 5, { props: { role: "dhw_switch" } }), e.add("j1", "junction", "", 26, 12), e.pipe($("iu", "sup"), $("vw1", "in"), "supply", [n]), e.pipe($("j1", "l"), $("pc0", "in"), "return", [n]), r = $("vw1", "a"), c = $("j1", "r"));
  let p = r, h = c;
  const d = [n, ...i];
  let m = !0;
  a.buffer === "parallel" ? (e.add("buf", "buffer", a.bufferLabel || l("type.buffer"), 34, 4, { props: { volume: a.bufferVolume } }), e.pipe(r, $("buf", "in_sup"), "supply", [n, ...i]), e.pipe($("buf", "in_ret"), c, "return", [n, ...i]), p = $("buf", "out_sup"), h = $("buf", "out_ret"), m = !1) : a.buffer === "serial" && (e.add("buf", "buffer", a.bufferLabel || l("type.buffer"), 34, 8, { props: { volume: a.bufferVolume } }), e.pipe($("buf", "in_ret"), c, "return", [n, ...i]), h = $("buf", "out_ret"));
  const f = Math.max(1, a.circuits.length), _ = f > 1, k = _ ? 52 : 41, w = 50, A = 49, L = [];
  if (a.circuits.slice(0, 6).forEach((x, b) => {
    const D = 5 + b * (_ ? 12 : 10), S = b + 1, Y = !m || x.mixed, K = `hc${S}_pump`, I = `hc${S}_mix`, G = `hc${S}`;
    let F = k, j, B;
    Y ? (e.add(K, "pump", m || x.mixed ? `PC${S}` : "PC1", F, D, {
      props: { role: x.mixed ? "hc" : "secondary", circuit: S }
    }), j = $(K, "in"), B = [{ c: K, s: "running" }], L.push(B[0]), F += 4) : (B = d, j = $("__next", "in"));
    let Q = Y ? $(K, "out") : null;
    x.mixed && (e.add(I, "mixer", `VC${S}`, F, D, { props: { circuit: S } }), Q ? e.pipe(Q, $(I, "in"), "supply", B) : j = $(I, "in"), Q = $(I, "out"), F += 3);
    const tt = Math.max(F + 3, k + 7);
    if (e.add(G, x.emitter, x.label || l("wz.circuit", { n: S }), tt, D, { props: { circuit: S } }), Q ? e.pipe(Q, $(G, "sup"), "supply", B) : j = $(G, "sup"), _) {
      const C = `js${S}`;
      e.add(C, "junction", "", w, D + 1), e.pipe($(C, "r"), j, "supply", B), b === 0 ? e.pipe(p, $(C, "l"), "supply", [], { flow: [] }) : e.pipe($(`js${b}`, "b"), $(C, "t"), "supply", []);
    } else
      e.pipe(p, j, "supply", Y ? B : d);
    const et = D + 7;
    let Z = $(G, "ret"), nt = tt - 3;
    if (x.mixed) {
      const C = `hc${S}_jm`, ht = e.components.find((wt) => wt.id === I);
      e.add(C, "junction", "", ht.x + 1, et), e.pipe(Z, $(C, "r"), "return", B), e.pipe($(C, "t"), $(I, "ret"), "return", B), Z = $(C, "l"), nt = ht.x - 2;
    }
    if (a.expansion && b === 0 && (e.add("jmag", "junction", "", nt, et), e.add("mag", "expansion_vessel", "MAG", nt - 1, et - 5), e.pipe(Z, $("jmag", "r"), "return", B), e.pipe($("mag", "conn"), $("jmag", "t"), "return", []), Z = $("jmag", "l"), nt -= 4), a.separator && !_ && (e.add("sep", "separator", l("type.separator"), nt - 1, et - 1, { rot: 180 }), e.pipe(Z, $("sep", "in"), "return", B), Z = $("sep", "out")), _) {
      const C = `jr${S}`;
      e.add(C, "junction", "", A, et), e.pipe(Z, $(C, "r"), "return", B), b > 0 && e.pipe($(C, "t"), $(`jr${b}`, "b"), "return", []);
    } else
      e.pipe(Z, h, "return", Y ? B : d);
  }), _) {
    const x = L.length ? L : void 0, b = m ? d : [];
    e.pipes.filter((S) => S.flow && S.flow.length === 0 && S.kind === "supply").forEach((S) => {
      S.flow = b, S.flowAny = x;
    });
    let D = $("jr1", "l");
    a.separator && (e.add("sep", "separator", l("type.separator"), 44, 11, { rot: 180 }), e.pipe(D, $("sep", "in"), "return", b, { flowAny: x }), D = $("sep", "out")), e.pipe(D, h, "return", b, { flowAny: x }), e.pipes.filter((S) => S.kind === "return" && S.flow && S.flow.length === 0 && S.from.c.startsWith("jr")).forEach((S) => {
      S.flow = b, S.flowAny = x;
    });
  }
  if (s) {
    e.add("dhw", "dhw_tank", a.dhwLabel || l("type.dhw_tank"), 32, 20, { props: { volume: a.dhwVolume } }), e.add("tap", "tap", l("type.tap"), 41, 16), e.add("inlet", "water_inlet", l("type.water_inlet"), 29, 32), e.pipe($("vw1", "b"), $("dhw", "coil_in"), "supply", [n, o]), e.pipe($("dhw", "coil_out"), $("j1", "b"), "return", [n, o]);
    const x = { c: "tap", s: "flowing" }, b = { c: "circ", s: "running" };
    e.pipe($("dhw", "hot"), $("tap", "hot"), "dhw_hot", [], { flowAny: a.circulation ? [x, b] : [x] }), e.pipe($("inlet", "out"), $("dhw", "cold"), "dhw_cold", [x]), a.circulation && (e.add("circ", "pump", l("role.circulation").split(" ")[0], 39, 23, { rot: 180, props: { role: "circulation" } }), e.pipe($("tap", "circ"), $("circ", "in"), "circulation", [b]), e.pipe($("circ", "out"), $("dhw", "circ"), "circulation", [b]));
  }
  e.pipes = e.pipes.filter((x) => x.from.c !== "__next" && x.to.c !== "__next");
  const M = {
    version: 1,
    name: a.name,
    grid: { w: _ ? 76 : 64, h: Math.max(36, 8 + f * 12) },
    components: e.components,
    pipes: e.pipes,
    settings: t?.settings ?? { style: "flat", demo: !0 }
  };
  if (M.settings = { ...M.settings, wizard: a }, t) {
    const x = new Map(t.components.map((b) => [b.id, b]));
    for (const b of M.components) {
      const D = x.get(b.id);
      D && D.type === b.type && (b.bindings = { ...D.bindings }, D.icon && (b.icon = D.icon), D.show && (b.show = D.show));
    }
  }
  return M;
}
function _e() {
  return Ms(ge());
}
const bi = 4;
class Ss {
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
    this.host.toggleAttribute("light", !e), ss(is(this.plant?.settings.language, t.language)), this.api ? this.api.setHass(t) : this._connected && this._init(), this.plant && !this.plant.settings.demo && this._checkStates();
  }
  _init() {
    this.api = new Qs(this.hass), this._load();
  }
  // ----------------------------------------------------------------- data
  get messages() {
    return this.sim ? this.simMessages : this.backendMessages;
  }
  get src() {
    return this.sim ? new yi(this.sim) : new li(this.hass);
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
        e || (e = _e(), t.is_admin && this.saveExample && await this.api.saveConfig(e)), this.setPlant(e), await this.loadIcons(), this.api.standalone || (this.backendMessages = await this.api.listMessages(), this._unsubMsg = await this.api.subscribeMessages((s) => this._mergeMessage(s)));
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
    const e = this.backendMessages.findIndex((n) => n.id === t.id), s = [...this.backendMessages];
    e >= 0 ? s[e] = t : s.push(t), this.backendMessages = s, this._changed();
  }
  setPlant(t) {
    const e = JSON.stringify(le(this.plant));
    this.plant = t, ss(is(t.settings.language, this.hass?.language)), this._collectBound(), t.settings.demo ? (!this.sim || JSON.stringify(le(t)) !== e) && this._startSim() : (this._stopSim(), this._checkStates()), this.version++, this._changed();
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
    const t = this.plant?.components.find((n) => n.type === "dhw_tank"), e = new vi(le(this.plant), void 0, { dhw: t?.label || l("type.dhw_tank") });
    this.sim = e, this._unsubSim = e.onMessage(() => {
      this.simMessages = [...e.messages], this._changed();
    }), this.simMessages = [...e.messages], this._lastFrame = performance.now();
    const s = (n) => {
      const i = (n - this._lastFrame) / 1e3;
      this._lastFrame = n, document.hidden || (e.advance(i), this._accum += i, this._accum >= 1 / bi && (this._accum = 0, this.version++, this._changed())), this._raf = requestAnimationFrame(s);
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
      e.scenarioMessage(l(`scn.${t}`)), this.version++, this._changed();
    }
  }
}
const zs = W`
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
`, V = W`
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
`, xi = {
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
function z(a) {
  return v`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d=${xi[a] || ""} /></svg>`;
}
const ve = v`<svg viewBox="0 0 32 32" class="logo" aria-hidden="true">
  <defs><linearGradient id="cp-logo" x1="0" y1="1" x2="1" y2="0">
    <stop offset="0" stop-color="#38d0ff" /><stop offset="0.55" stop-color="#3ddc97" /><stop offset="1" stop-color="#ffb35c" />
  </linearGradient></defs>
  <path d="M24 7.5A11 11 0 1 0 24 24.5" fill="none" stroke="url(#cp-logo)" stroke-width="4" stroke-linecap="round" />
  <path d="M16 9c3 4 5 6.5 5 9a5 5 0 0 1-10 0c0-2.5 2-5 5-9z" fill="url(#cp-logo)" />
</svg>`, ki = 7, Mi = 35, Es = 4.9;
function Nt(a, t, e = "air") {
  const s = t + 273.15 + 3, n = (e === "air" ? a - 6 : 0) + 273.15;
  return Math.max(1.2, Math.min(8, 0.57 * s / Math.max(5, s - n)));
}
function Si(a, t, e = Es, s = "air") {
  return e * Nt(a, t, s) / Nt(ki, Mi, s);
}
function zi(a) {
  return a >= 0.9 ? "green" : a >= 0.75 ? "yellow" : "red";
}
const Et = { green: "#3ddc97", yellow: "#f5c542", red: "#ff5a5f" };
function As(a, t) {
  const e = a.components.find((_) => _.type === "outdoor_unit"), s = a.components.find((_) => _.type === "indoor_unit");
  if (!e || !s) return;
  const n = (_, k) => {
    const w = t.get(_, k);
    return w?.available && w.num !== null ? w.num : void 0;
  }, i = n(e, "heat_power");
  let o = n(e, "el_power");
  o !== void 0 && t.get(e, "el_power")?.unit === "kW" && (o *= 1e3);
  const r = n(e, "outdoor_temp"), c = n(s, "supply_temp"), p = String(t.get(e, "activity")?.raw ?? "").toLowerCase();
  if (i === void 0 || o === void 0 || r === void 0 || c === void 0 || i < 0.5 || o < 80 || p.includes("defrost") || p.includes("abtau")) return;
  const h = i / (o / 1e3), d = Re(e.model).source, m = Si(r, c, Number(e.props.cop_ref) || Es, d), f = h / m;
  return { cop: h, expected: m, ratio: f, ampel: zi(f), tOut: r, tFlow: c };
}
function kt(a) {
  return a && a.el > 0.05 ? a.heat / a.el : void 0;
}
const Bt = { heat: 0, el: 0, heatDhw: 0, elDhw: 0, aux: 0 };
function At(a, t) {
  return {
    heat: a.heat + (t.heat || 0),
    el: a.el + (t.el || 0),
    heatDhw: a.heatDhw + (t.heatDhw || 0),
    elDhw: a.elDhw + (t.elDhw || 0),
    aux: a.aux + (t.aux || 0)
  };
}
function Mt(a) {
  return new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
}
const Ei = {
  heat: ["heat_energy_total"],
  el: ["el_energy_total"],
  heatDhw: ["heat_energy_dhw"],
  elDhw: ["el_energy_dhw"],
  aux: ["aux_energy_total"]
};
async function Ai(a, t) {
  const e = t.components.find((w) => w.type === "indoor_unit"), s = {};
  for (const [w, A] of Object.entries(Ei)) {
    const L = A.map((M) => e?.bindings[M]).find(Boolean);
    L && (s[w] = L);
  }
  const n = { today: null, yesterday: null, month: null, year: null, daily: [], estimated: { month: !1, year: !1 } };
  if (!s.heat || !s.el) return { ...n, missing: "no_counters" };
  const i = /* @__PURE__ */ new Date(), o = Object.values(s), r = (w, A) => a.callWS({
    type: "recorder/statistics_during_period",
    start_time: w.toISOString(),
    end_time: i.toISOString(),
    statistic_ids: o,
    period: A,
    types: ["change"],
    units: { energy: "kWh" }
  }), [c, p] = await Promise.all([
    r(new Date(Mt(i) - 30 * 864e5), "day"),
    r(new Date(i.getFullYear(), 0, 1), "month")
  ]), h = /* @__PURE__ */ new Map();
  for (const [w, A] of Object.entries(s))
    for (const L of c[A] || []) {
      const M = Mt(new Date(L.start));
      h.set(M, At(h.get(M) || Bt, { [w]: L.change || 0 }));
    }
  if (!h.size) return { ...n, missing: "no_statistics" };
  const d = [...h.entries()].sort((w, A) => w[0] - A[0]).map(([w, A]) => ({ day: w, ...A })), m = h.get(Mt(i)) || null, f = h.get(Mt(i) - 864e5) || null;
  let _ = Bt, k = null;
  for (const [w, A] of Object.entries(s))
    for (const L of p[A] || [])
      _ = At(_, { [w]: L.change || 0 }), new Date(L.start).getMonth() === i.getMonth() && (k = At(k || Bt, { [w]: L.change || 0 }));
  return { today: m, yesterday: f, month: k, year: _, daily: d, estimated: { month: !1, year: !1 } };
}
const Ds = [2, 3, 6.5, 10.5, 14.5, 18, 20, 19.5, 15.5, 10.5, 6, 3], ls = 0.8;
function ce(a, t, e, s) {
  const n = s ?? Ds[t], i = a.p, o = i.heatLoad / (21 - i.designTemp);
  let r = 0, c = 0;
  for (const d of [-4, -2, 0, 2, 4]) {
    const m = n + d;
    if (m >= 16) continue;
    const f = o * (21 - m) * 24 * e * 0.2 * 0.85, _ = 21 + (21 - m) * ((i.floor ? 35 : 50) - 21) / (21 - i.designTemp);
    r += f, c += f / (Nt(m, _, i.source) * ls);
  }
  const p = 8.4 * e * (i.dhwL > 0 ? 1 : 0), h = p / (Nt(n, 53, i.source) * ls);
  return { heat: r + p, el: c + h, heatDhw: p, elDhw: h, aux: 0 };
}
function Di(a) {
  const t = new Date(a.time * 1e3), e = Mt(t), s = a.dailyEnergy(), n = s.find((p) => p.day === e) || null, i = s.find((p) => p.day === e - 864e5) || null, o = ce(a, t.getMonth(), t.getDate() - 1 + t.getHours() / 24, a.outdoorMean);
  let r = Bt;
  for (let p = 0; p < t.getMonth(); p++) r = At(r, ce(a, p, new Date(t.getFullYear(), p + 1, 0).getDate()));
  r = At(r, o);
  const c = [];
  for (let p = 29; p >= 2; p--) {
    const h = e - p * 864e5, d = new Date(h), m = p <= 14 ? (14 - p) / 14 : 0, f = Ds[d.getMonth()] * (1 - m) + a.outdoorMean * m + Math.sin(p * 1.3) * 2, _ = ce(a, d.getMonth(), 1, f), k = 1 + Math.sin(p * 1.7) * 0.18;
    c.push({ day: h, ..._, heat: _.heat * k, el: _.el * k * (1 + Math.cos(p) * 0.04) });
  }
  return {
    today: n,
    yesterday: i,
    month: o,
    year: r,
    daily: [...c, ...s.filter((p) => p.day >= e - 864e5)],
    estimated: { month: !0, year: !0 }
  };
}
const cs = {
  heating: "#ff8a3d",
  hot_water: "#ff4f8b",
  defrost: "#6cc4ff",
  compressor_alarm: "#ff4d4d",
  cooling: "#38d0ff",
  off: "#8b949e"
};
function Ne(a, t, e = 10, s = "casing") {
  return v`<rect class=${s} x="0" y="0" width=${a} height=${t} rx=${e} />
    <rect class="sheen" x="2" y="2" width=${a - 4} height=${Math.min(t * 0.35, 40)} rx=${e - 2} />`;
}
function Ti(a) {
  const { w: t, h: e, flags: s, c: n } = a, i = Re(n.model);
  if (i.source === "brine") return Pi(a);
  const o = s.has("running") && !s.has("defrost"), r = s.has("defrost"), c = s.has("alarm"), p = t * 0.36, h = e * 0.5, d = Math.min(e * 0.38, t * 0.3), m = a.num("fan_speed") ?? (o ? 60 : 0), f = m > 0 ? Math.max(0.35, 2.2 - m / 50) : 0, _ = c ? "#ff4d4d" : r ? "#6cc4ff" : o ? "#3ddc97" : "#5b6573", k = [0, 120, 240].map(
    (w) => v`<path transform="rotate(${w})" d="M0 0 C ${d * 0.18} ${-d * 0.25}, ${d * 0.55} ${-d * 0.35}, ${d * 0.82} ${-d * 0.12} C ${d * 0.6} ${d * 0.05}, ${d * 0.25} ${d * 0.08}, 0 0 Z" />`
  );
  return v`
    <rect class="foot" x=${t * 0.12} y=${e - 2} width=${t * 0.16} height="6" rx="2" />
    <rect class="foot" x=${t * 0.72} y=${e - 2} width=${t * 0.16} height="6" rx="2" />
    ${Ne(t, e, 12)}
    <circle class="grille-bg" cx=${p} cy=${h} r=${d + 4} />
    <g transform="translate(${p} ${h})">
      <g class=${f ? "spin fan" : "fan"} style=${f ? `--dur:${f}s` : ""}>${k}<circle r=${d * 0.12} class="hub" /></g>
    </g>
    ${[0.45, 0.72, 1].map((w) => v`<circle class="grille" cx=${p} cy=${h} r=${d * w} />`)}
    <line class="grille" x1=${p - d} y1=${h} x2=${p + d} y2=${h} />
    <line class="grille" x1=${p} y1=${h - d} x2=${p} y2=${h + d} />
    ${[0, 1, 2, 3, 4, 5].map((w) => v`<rect class="vent" x=${t * 0.73} y=${e * 0.22 + w * e * 0.1} width=${t * 0.19} height="3" rx="1.5" />`)}
    <circle cx=${t * 0.9} cy=${e * 0.12} r="4" fill=${_} class=${o || r ? "pulse" : ""} />
    ${i.refrigerant ? v`<text class="tag" x=${t * 0.825} y=${e * 0.9} text-anchor="middle">${i.refrigerant}</text>` : ""}
    ${r ? v`<rect x="2" y="2" width=${t - 4} height=${e - 4} rx="10" class="frost" />
        <g class="pulse" transform="translate(${p} ${h})">${Li(d * 0.55)}</g>` : ""}
    ${c ? v`<rect x="1" y="1" width=${t - 2} height=${e - 2} rx="11" class="alarm-ring" />` : ""}
  `;
}
function Pi(a) {
  const { w: t, h: e, flags: s } = a, n = s.has("running");
  return v`
    ${Ne(t, e * 0.55, 10)}
    <text class="tag" x=${t / 2} y=${e * 0.32} text-anchor="middle">SOLE</text>
    <rect class="ground" x="0" y=${e * 0.62} width=${t} height=${e * 0.38} rx="6" />
    ${[0.2, 0.4, 0.6, 0.8].map(
    (i) => v`<path class=${n ? "probe active" : "probe"} d="M${t * i - 6} ${e * 0.55} V ${e * 0.95} M${t * i + 6} ${e * 0.55} V ${e * 0.95} M${t * i - 6} ${e * 0.95} Q ${t * i} ${e} ${t * i + 6} ${e * 0.95}" />`
  )}
  `;
}
function Li(a) {
  const t = [0, 60, 120].map(
    (e) => v`<g transform="rotate(${e})"><line x1=${-a} y1="0" x2=${a} y2="0" />
      <path d="M${a * 0.6} 0 l ${a * 0.2} ${-a * 0.2} M${a * 0.6} 0 l ${a * 0.2} ${a * 0.2} M${-a * 0.6} 0 l ${-a * 0.2} ${-a * 0.2} M${-a * 0.6} 0 l ${-a * 0.2} ${a * 0.2}" /></g>`
  );
  return v`<g class="snow">${t}</g>`;
}
function Ci(a) {
  const { w: t, h: e, flags: s, c: n } = a, i = [...s].find((f) => f.startsWith("mode_"))?.slice(5), o = cs[i || "off"] || cs.off, r = s.has("aux"), c = a.num("supply_temp"), p = a.num("return_temp"), h = (n.model || "").includes("wlw186i") ? "WLW186i" : (n.model || "").includes("wlw176i") ? "WLW176i" : "", d = 40;
  return v`
    ${Ne(t, e, 10, "casing light")}
    <rect class="screen" x=${t * 0.18} y=${e * 0.08} width=${t * 0.64} height=${e * 0.11} rx="4" />
    <rect x=${t * 0.22} y=${e * 0.105} width=${t * 0.14} height=${e * 0.06} rx="2" fill=${o} class=${i && i !== "off" ? "pulse" : ""} />
    <text class="screen-text" x=${t * 0.42} y=${e * 0.155}>${i ? l(`mode.${i}`) : ""}</text>
    <path class="internal" style="stroke:${N(c, "#ff7a45")}" d="M0 ${d} H ${t * 0.3} M ${t * 0.7} ${d} H ${t}" />
    <path class="internal" style="stroke:${N(p, "#4d9fff")}" d="M0 ${160} H ${t}" />
    <g transform="translate(${t * 0.3} ${d - 9})">
      <rect class=${r ? "rod hot" : "rod"} x="0" y="0" width=${t * 0.4} height="18" rx="9" />
      <path class=${r ? "coil hot" : "coil"} d=${Oi(6, 9, t * 0.4 - 12, 5, 7)} />
    </g>
    ${r ? v`<rect class="aux-glow pulse" x=${t * 0.26} y=${d - 14} width=${t * 0.48} height="28" rx="14" />` : ""}
    <text class="tag" x=${t / 2} y=${e * 0.93} text-anchor="middle">${h}</text>
  `;
}
function Oi(a, t, e, s, n) {
  const i = e / n;
  let o = `M${a} ${t}`;
  for (let r = 1; r <= n; r++) o += ` L${a + r * i} ${t + (r % 2 ? -s : s)}`;
  return o;
}
function ps(a, t) {
  const { w: e, h: s, c: n, flags: i } = a, o = a.num("temp_top"), r = a.num("temp_bottom") ?? (o !== void 0 ? o - 6 : void 0), c = a.num("temp_mid") ?? (o !== void 0 && r !== void 0 ? (o + r) / 2 : void 0), p = `tg-${n.id}`, h = t === "dhw" ? "#ff4f8b" : "#ff7a45", d = i.has("charging"), m = n.props.volume ? `${n.props.volume} l` : "", f = e / 2;
  return v`
    <defs>
      <linearGradient id=${p} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.05" stop-color=${N(o, h)} />
        <stop offset="0.5" stop-color=${N(c, "#c084fc")} />
        <stop offset="0.95" stop-color=${N(r, "#4d9fff")} />
      </linearGradient>
    </defs>
    <rect class="insulation" x="-3" y="-3" width=${e + 6} height=${s + 6} rx=${f + 3} />
    <rect x="0" y="0" width=${e} height=${s} rx=${f} fill="url(#${p})" class="tank-fill" />
    <rect class="tank-glass" x=${e * 0.12} y=${s * 0.06} width=${e * 0.16} height=${s * 0.88} rx=${e * 0.08} />
    ${t === "dhw" ? v`<path class=${d ? "tank-coil hot" : "tank-coil"} d=${Hi(e)} />` : v`${[0.25, 0.5, 0.75].map((_) => v`<line class="strat" x1=${e * 0.35} x2=${e * 0.85} y1=${s * _} y2=${s * _} />`)}`}
    <text class="tank-label" x=${e / 2} y=${s * (t === "dhw" ? 0.3 : 0.52)} text-anchor="middle">${m}</text>
    ${i.has("disinfecting") ? v`<text class="tank-badge" x=${e / 2} y=${s * 0.18} text-anchor="middle">60°</text>` : ""}
  `;
}
function Hi(a, t) {
  const e = a * 0.25, s = a * 0.78, n = 100, i = 180, o = 5, r = (i - n) / o;
  let c = `M0 ${n} H ${e}`;
  for (let p = 0; p < o; p++) {
    const h = n + p * r;
    c += ` C ${s + 6} ${h}, ${s + 6} ${h + r / 2}, ${e} ${h + r / 2} C ${e - 6} ${h + r / 2}, ${e - 6} ${h + r}, ${e} ${h + r}`;
  }
  return `${c} H 0`;
}
function Wi(a) {
  const { w: t, h: e, flags: s } = a, n = s.has("running"), i = Math.min(t, e) / 2 - 2, o = t / 2, r = e / 2;
  return v`
    ${n ? v`<circle class="pump-glow pulse" cx=${o} cy=${r} r=${i + 5} />` : ""}
    <circle class=${n ? "pump-body on" : "pump-body"} cx=${o} cy=${r} r=${i} />
    <path class=${n ? "pump-tri on" : "pump-tri"} d="M ${o - i * 0.5} ${r - i * 0.82} L ${o + i} ${r} L ${o - i * 0.5} ${r + i * 0.82} Z" />
    <g transform="translate(${o} ${r})">
      <circle class=${n ? "impeller spin" : "impeller"} style="--dur:0.9s" r=${i * 0.38} />
    </g>
  `;
}
function ds(a, t = !1) {
  const { w: e, h: s, flags: n } = a, i = e / 2, o = s / 2, r = Math.min(e, s) / 2 - 2, c = n.has("b"), p = (h) => t || h ? "valve-tri on" : "valve-tri";
  return v`
    <rect class="actuator" x=${i - r * 0.35} y=${o - r * 1.25} width=${r * 0.7} height=${r * 0.45} rx="2" />
    <line class="stem" x1=${i} y1=${o - r * 0.8} x2=${i} y2=${o} />
    <path class=${p(!0)} d="M ${i - r} ${o - r * 0.6} L ${i} ${o} L ${i - r} ${o + r * 0.6} Z" />
    <path class=${p(!c)} d="M ${i + r} ${o - r * 0.6} L ${i} ${o} L ${i + r} ${o + r * 0.6} Z" />
    <path class=${p(c)} d="M ${i - r * 0.6} ${o + r} L ${i} ${o} L ${i + r * 0.6} ${o + r} Z" />
    ${t ? "" : v`<text class="valve-tag" x=${i + r * 0.5} y=${o - r * 0.75}>${c ? "B" : "A"}</text>`}
  `;
}
function Bi(a) {
  const { w: t, h: e } = a, s = a.num("flow_temp"), n = a.num("return_temp"), i = a.num("room_temp"), o = s !== void 0 && i !== void 0 ? s - i > 6 : !1, r = 9, c = (t - 16) / r, p = `rg-${a.c.id}`;
  return v`
    <defs><linearGradient id=${p} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color=${N(s, "#8b949e")} stop-opacity=${o ? 0.85 : 0.25} />
      <stop offset="1" stop-color=${N(n, "#8b949e")} stop-opacity=${o ? 0.6 : 0.2} />
    </linearGradient></defs>
    ${o ? [0.25, 0.5, 0.75].map(
    (h, d) => v`<path class="heat-wave" style="animation-delay:${d * 0.6}s" d="M ${t * h} ${e * 0.12} q 5 -6 0 -12 q -5 -6 0 -12" />`
  ) : ""}
    <rect class="rad-frame" x="4" y=${e * 0.18} width=${t - 8} height=${e * 0.72} rx="6" />
    ${Array.from({ length: r }, (h, d) => v`<rect x=${8 + d * c + 1} y=${e * 0.22} width=${c - 3} height=${e * 0.64} rx=${(c - 3) / 2} fill="url(#${p})" class="fin" />`)}
  `;
}
function Ri(a) {
  const { w: t, h: e } = a, s = a.num("flow_temp"), n = N(s, "#8b949e");
  let i = `M 10 ${e * 0.25}`;
  const o = 5;
  for (let r = 0; r < o; r++)
    i += r % 2 === 0 ? ` H ${t - 12} q 6 0 6 ${e * 0.3 / o} q 0 ${e * 0.3 / o} -6 ${e * 0.3 / o}` : ` H 16 q -6 0 -6 ${e * 0.3 / o} q 0 ${e * 0.3 / o} 6 ${e * 0.3 / o}`;
  return v`
    <rect class="floor-slab" x="2" y=${e * 0.15} width=${t - 4} height=${e * 0.75} rx="6" />
    <path d=${i} fill="none" stroke=${n} stroke-width="3" stroke-linecap="round" opacity="0.9" />
  `;
}
function Ii(a) {
  const { w: t, h: e, flags: s } = a, n = s.has("flowing");
  return v`
    <path class="tap-body" d="M 0 ${e * 0.25} H ${t * 0.55} a ${t * 0.25} ${t * 0.25} 0 0 1 ${t * 0.25} ${t * 0.25} V ${e * 0.62} h ${-t * 0.16} V ${e * 0.52} a ${t * 0.1} ${t * 0.1} 0 0 0 ${-t * 0.1} ${-t * 0.1} H 0 Z" />
    <rect class="tap-handle" x=${t * 0.28} y=${e * 0.06} width=${t * 0.26} height=${e * 0.12} rx="3" />
    ${n ? [0, 1, 2].map(
    (i) => v`<circle class="drop" style="animation-delay:${i * 0.25}s" cx=${t * 0.72} cy=${e * 0.7} r="2.5" />`
  ) : ""}
  `;
}
function Ni(a) {
  const { w: t, h: e } = a;
  return v`
    <rect class="casing" x="0" y=${e * 0.2} width=${t} height=${e * 0.6} rx="5" />
    <text class="tag" x=${t * 0.45} y=${e * 0.62} text-anchor="middle">KW</text>
  `;
}
function Vi(a) {
  const { w: t, h: e } = a;
  return v`
    <rect class="casing" x=${t * 0.2} y="0" width=${t * 0.6} height=${e} rx=${t * 0.3} />
    <path class="magnet" d="M ${t * 0.38} ${e * 0.3} v ${e * 0.25} a ${t * 0.12} ${t * 0.12} 0 0 0 ${t * 0.24} 0 v ${-e * 0.25}" />
  `;
}
function ji(a) {
  const { w: t, h: e } = a;
  return v`
    <line class="stem" x1=${t / 2} y1=${e * 0.8} x2=${t / 2} y2=${e} />
    <rect class="vessel" x="0" y="0" width=${t} height=${e * 0.82} rx=${t / 2} />
    <rect class="sheen" x=${t * 0.18} y=${e * 0.08} width=${t * 0.2} height=${e * 0.6} rx=${t * 0.1} />
  `;
}
function Ui(a) {
  switch (a.c.type) {
    case "outdoor_unit":
      return Ti(a);
    case "indoor_unit":
      return Ci(a);
    case "buffer":
      return ps(a, "buffer");
    case "dhw_tank":
      return ps(a, "dhw");
    case "pump":
      return Wi(a);
    case "valve_3way":
      return ds(a);
    case "mixer":
      return ds(a, !0);
    case "radiators":
      return Bi(a);
    case "floor_heating":
      return Ri(a);
    case "tap":
      return Ii(a);
    case "water_inlet":
      return Ni(a);
    case "separator":
      return Vi(a);
    case "expansion_vessel":
      return ji(a);
    case "junction":
      return v`<circle class="junction" r="4" />`;
    default:
      return v``;
  }
}
const hs = 1, Ot = { l: { x: -1, y: 0 }, r: { x: 1, y: 0 }, t: { x: 0, y: -1 }, b: { x: 0, y: 1 } };
function pe(a) {
  return a === "l" || a === "r";
}
function Ki(a, t) {
  const e = t.get(a.from.c), s = t.get(a.to.c);
  if (!e || !s) return null;
  const n = dt(e, a.from.p), i = dt(s, a.to.p);
  if (!n || !i) return null;
  const o = e.type === "junction" ? 0 : hs, r = s.type === "junction" ? 0 : hs, c = { x: n.x, y: n.y }, p = { x: i.x, y: i.y }, h = { x: c.x + Ot[n.dir].x * o, y: c.y + Ot[n.dir].y * o }, d = { x: p.x + Ot[i.dir].x * r, y: p.y + Ot[i.dir].y * r }, m = pe(n.dir), f = [c, h];
  if (m)
    if (h.y === d.y && a.bend === void 0)
      f.push(d);
    else {
      const _ = a.bend ?? (h.x + d.x) / 2;
      pe(i.dir) ? f.push({ x: _, y: h.y }, { x: _, y: d.y }) : a.bend === void 0 ? f.push({ x: d.x, y: h.y }) : f.push({ x: _, y: h.y }, { x: _, y: d.y }), f.push(d);
    }
  else if (h.x === d.x && a.bend === void 0)
    f.push(d);
  else {
    const _ = a.bend ?? (h.y + d.y) / 2;
    pe(i.dir) ? a.bend === void 0 ? f.push({ x: h.x, y: d.y }) : f.push({ x: h.x, y: _ }, { x: d.x, y: _ }) : f.push({ x: h.x, y: _ }, { x: d.x, y: _ }), f.push(d);
  }
  return f.push(p), { pts: Fi(f), horizontalStart: m };
}
function Fi(a) {
  const t = [];
  for (const e of a) {
    const s = t[t.length - 1];
    if (!(s && s.x === e.x && s.y === e.y)) {
      if (t.length >= 2) {
        const n = t[t.length - 2];
        if (n.x === s.x && s.x === e.x || n.y === s.y && s.y === e.y) {
          t[t.length - 1] = e;
          continue;
        }
      }
      t.push(e);
    }
  }
  return t;
}
function Zi(a, t = 8) {
  if (a.length === 0) return "";
  const e = a.map((i) => ({ x: i.x * y, y: i.y * y }));
  let s = `M ${e[0].x} ${e[0].y}`;
  for (let i = 1; i < e.length - 1; i++) {
    const o = e[i - 1], r = e[i], c = e[i + 1], p = Math.hypot(r.x - o.x, r.y - o.y), h = Math.hypot(c.x - r.x, c.y - r.y), d = Math.min(t, p / 2, h / 2), m = r.x - (r.x - o.x) / p * d, f = r.y - (r.y - o.y) / p * d, _ = r.x + (c.x - r.x) / h * d, k = r.y + (c.y - r.y) / h * d;
    s += ` L ${m} ${f} Q ${r.x} ${r.y} ${_} ${k}`;
  }
  const n = e[e.length - 1];
  return `${s} L ${n.x} ${n.y}`;
}
function Yi(a, t) {
  for (let e = 2; e < a.length - 1; e++) {
    const s = a[e - 1], n = a[e], i = s.x === n.x;
    if (t ? i : !i) return { x: (s.x + n.x) / 2, y: (s.y + n.y) / 2 };
  }
  return null;
}
const J = 88, X = 34, U = 6;
function de(a, t = 17) {
  return a.length > t ? `${a.slice(0, t - 1)}…` : a;
}
const jt = class jt extends O {
  constructor() {
    super(...arguments), this.icons = /* @__PURE__ */ new Map(), this.edit = !1, this.autoHeight = !1, this.selected = null, this.version = 0, this._view = null, this._drag = null, this._connect = null, this._pointers = /* @__PURE__ */ new Map(), this._gesture = null, this._segments = [], this._lastMoved = !1, this._structureKey = "", this._onKey = (t) => {
      t.key === "Escape" && this._connect && (this._connect = null);
    };
  }
  /** Does any pipe pass through the given pixel rectangle (with a small margin)? */
  _hitsPipe(t, e, s, n) {
    return this._segments.some((o) => o.x1 <= s + 5 && o.x2 >= t - 5 && o.y1 <= n + 5 && o.y2 >= e - 5);
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
    const e = this._view || this._contentBox(), s = e.x + e.w / 2, n = e.y + e.h / 2;
    this._view = { x: s - e.w * t / 2, y: n - e.h * t / 2, w: e.w * t, h: e.h * t };
  }
  // ------------------------------------------------------------- layout
  _comp(t) {
    return this._drag && this._drag.id === t.id ? { ...t, x: this._drag.dx, y: this._drag.dy } : t;
  }
  _shownSlots(t) {
    const e = t.show ?? lt(t).filter((s) => s.show).map((s) => s.key);
    return this.edit ? [] : e.filter((s) => this.src.get(t, s) !== void 0);
  }
  _badgeLayout(t) {
    const e = R[t.type];
    if (e.badges === "none" || e.badges === "inside") return [];
    const s = this._shownSlots(t);
    if (!s.length) return [];
    const { w: n, h: i } = Wt(t), o = t.x * y, r = t.y * y, c = n * y, p = i * y, h = [];
    if (e.badges === "tank") {
      const d = { temp_top: 0.16, temp_mid: 0.48, temp_bottom: 0.8 }, m = [];
      for (const f of s)
        f in d ? h.push({ slot: f, x: o + 5, y: r + p * d[f] - 11, w: c - 10 }) : m.push(f);
      return m.forEach(
        (f, _) => h.push(
          t.type === "dhw_tank" ? { slot: f, x: o + c + 12, y: r + 4 + _ * (X + U) } : { slot: f, x: o + c / 2 - J / 2, y: r + p + 26 + _ * (X + U) }
        )
      ), h;
    }
    if (e.badges === "right")
      s.forEach((d, m) => h.push({ slot: d, x: o + c + 12, y: r + 4 + m * (X + U) }));
    else if (e.badges === "left")
      s.forEach((d, m) => h.push({ slot: d, x: o - 12 - J, y: r + 4 + m * (X + U) }));
    else if (e.badges === "above") {
      const d = s.length * (J + U) - U;
      s.forEach(
        (m, f) => h.push({ slot: m, x: o + c / 2 - d / 2 + f * (J + U), y: r - X - 10 })
      );
    } else {
      const d = Math.max(2, Math.floor((c + 40) / (J + U))), m = Math.ceil(s.length / d);
      s.forEach((f, _) => {
        const k = Math.floor(_ / d), A = (k === m - 1 ? s.length - k * d : d) * (J + U) - U;
        h.push({
          slot: f,
          x: o + c / 2 - A / 2 + _ % d * (J + U),
          y: r + p + 26 + k * (X + U)
        });
      });
    }
    return h;
  }
  _contentBox() {
    let t = 1 / 0, e = 1 / 0, s = -1 / 0, n = -1 / 0;
    const i = (r, c) => {
      t = Math.min(t, r), e = Math.min(e, c), s = Math.max(s, r), n = Math.max(n, c);
    };
    for (const r of this.plant.components) {
      const { w: c, h: p } = Wt(r);
      i(r.x * y - 6, r.y * y - 6), i((r.x + c) * y + 6, (r.y + p) * y + 22);
      for (const h of this._badgeLayout(r))
        i(h.x, h.y), i(h.x + J, h.y + X);
    }
    (this.edit || !Number.isFinite(t)) && (i(0, 0), i(this.plant.grid.w * y, this.plant.grid.h * y));
    const o = 24;
    return { x: t - o, y: e - o, w: s - t + 2 * o, h: n - e + 2 * o };
  }
  // -------------------------------------------------------------- render
  render() {
    if (!this.plant) return g;
    const t = this._view || this._contentBox(), e = new Map(this.plant.components.map((o) => [o.id, this._comp(o)])), s = new Map(this.plant.components.map((o) => [o.id, me(o, this.src)])), n = di(this.plant, this.src), i = this.plant.pipes.map((o) => ({ pipe: o, route: Ki(o, e) }));
    return this._segments = i.flatMap(
      ({ route: o }) => (o?.pts || []).slice(1).map((r, c) => {
        const p = o.pts[c];
        return { x1: Math.min(p.x, r.x) * y, x2: Math.max(p.x, r.x) * y, y1: Math.min(p.y, r.y) * y, y2: Math.max(p.y, r.y) * y };
      })
    ), u`
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
        ${this.edit ? this._grid() : g}
        <g class="pipes">
          ${i.map(({ pipe: o, route: r }) => {
      if (!r) return g;
      const c = Zi(r.pts), p = pi(o, s), h = N(n.get(o.id), ui[o.kind] || "#888"), d = this.selected?.kind === "p" && this.selected.id === o.id;
      return v`<g class="pipe ${p ? "active" : ""} ${d ? "selected" : ""}" data-pipe=${o.id}
                @pointerdown=${(m) => this._onPipeDown(m, o.id)}>
              <path class="pipe-hit" d=${c} />
              ${d ? v`<path class="pipe-sel" d=${c} />` : g}
              <path class="pipe-outline" d=${c} />
              ${p ? v`<path class="pipe-halo" d=${c} style="stroke:${h}" />` : g}
              <path class="pipe-base" d=${c} style="stroke:${h}" />
              ${p ? v`<path class="pipe-flow" d=${c} />` : g}
            </g>`;
    })}
        </g>
        <g class="components">
          ${this.plant.components.map((o) => this._component(e.get(o.id), s.get(o.id)))}
        </g>
        ${this.edit ? this._editOverlays(e, i) : g}
      </svg>
    `;
  }
  _grid() {
    const { w: t, h: e } = this.plant.grid;
    return v`
      <defs><pattern id="cp-grid" width=${y} height=${y} patternUnits="userSpaceOnUse">
        <circle cx="0" cy="0" r="1" class="grid-dot" />
      </pattern></defs>
      <rect class="grid-bg" x="0" y="0" width=${t * y} height=${e * y} fill="url(#cp-grid)" />`;
  }
  _transform(t) {
    const e = R[t.type], s = t.rot || 0, n = `translate(${t.x * y} ${t.y * y})`;
    return !e.rotatable || s === 0 ? n : s === 90 ? `${n} translate(${e.h * y} 0) rotate(90)` : s === 180 ? `${n} translate(${e.w * y} ${e.h * y}) rotate(180)` : `${n} translate(0 ${e.w * y}) rotate(270)`;
  }
  _component(t, e) {
    const s = R[t.type], { w: n, h: i } = Wt(t), o = (t.type === "value_tile" ? n : s.w) * y, r = (t.type === "value_tile" ? i : s.h) * y, c = (M) => {
      const x = this.src.get(t, M);
      return x?.available && x.num !== null ? x.num : void 0;
    }, p = (M) => {
      const x = this.src.get(t, M);
      return x?.available ? String(x.raw) : void 0;
    }, h = t.icon || this.plant.settings.typeIcons?.[t.type], d = h ? this.icons.get(h) : void 0, m = this.selected?.kind === "c" && this.selected.id === t.id;
    let f;
    t.type === "value_tile" ? f = this._tile(t, o, r) : t.type === "label" ? f = v`<text class="free-label" x="0" y=${y} style="font-size:${t.props.size || 18}px">${t.props.text || t.label}</text>` : d ? f = v`${e.has("running") ? v`<rect class="user-glow pulse" x="-4" y="-4" width=${o + 8} height=${r + 8} rx="10" />` : g}
        <image href=${d.data_url} x="0" y="0" width=${o} height=${r} preserveAspectRatio="xMidYMid meet" />` : f = Ui({ c: t, w: o, h: r, flags: e, num: c, text: p });
    const _ = !["junction", "label", "value_tile"].includes(t.type), k = s.ports.some((M) => {
      const x = dt(t, M.id);
      return x?.dir === "b" && Math.abs(x.x - (t.x + n / 2)) < Math.max(0.6, n * 0.35);
    });
    let w = (t.x + n / 2) * y, A = (t.y + i) * y + (s.badges === "above" ? 16 : 18), L = "middle";
    if (k) {
      const M = Math.min(28, t.label.length) * 7.5;
      A = (t.y + i) * y + 4;
      const x = (t.x + n) * y + 6, b = t.x * y - 6, D = this._hitsPipe(x, A - 12, x + M, A + 3), S = this._hitsPipe(b - M, A - 12, b, A + 3);
      D && !S ? (w = b, L = "end") : (w = x, L = "start");
    }
    return v`
      <g class="comp ${m ? "selected" : ""}" data-id=${t.id}
         @pointerdown=${(M) => this._onCompDown(M, t)}>
        <g transform=${this._transform(t)}>
          ${f}
        </g>
        <rect class="comp-hit" x=${t.x * y - (t.type === "junction" ? 8 : 0)} y=${t.y * y - (t.type === "junction" ? 8 : 0)}
          width=${Math.max(16, n * y)} height=${Math.max(16, i * y)} rx="8" />
        ${m ? v`<rect class="sel-outline" x=${t.x * y - 6} y=${t.y * y - 6} width=${n * y + 12} height=${i * y + 12} rx="10" />` : g}
        ${_ ? v`<text class="comp-label" x=${w} y=${A} text-anchor=${L}>${de(t.label, 28)}</text>` : g}
      </g>
      ${this._badgeLayout(t).map((M) => M.w ? this._pill(t, M.slot, M.x, M.y, M.w) : this._chip(t, M.slot, M.x, M.y))}
    `;
  }
  _chip(t, e, s, n) {
    const i = this.src.get(t, e), o = fe(t, e), { text: r, unit: c } = zt(i, o), p = t.type === "value_tile" ? e : $t(t.type, e), d = o === "temp" && i?.num !== null && i?.available ? N(i.num, "#8b949e") : "var(--cp-accent)";
    return v`
      <g class="chip ${i?.available === !1 ? "na" : ""}" @click=${(m) => this._slotClick(m, t, e)}>
        <rect x=${s} y=${n} width=${J} height=${X} rx="8" />
        <rect class="chip-accent" x=${s} y=${n + 7} width="3" height=${X - 14} rx="1.5" style="fill:${d}" />
        <text class="chip-label" x=${s + 10} y=${n + 13}>${de(p)}</text>
        <text class="chip-value" x=${s + 10} y=${n + 28}>${r}<tspan class="chip-unit" dx="2">${c}</tspan></text>
      </g>`;
  }
  /** Compact value-only pill drawn inside a tank at the sensor height. */
  _pill(t, e, s, n, i) {
    const o = this.src.get(t, e), { text: r, unit: c } = zt(o, fe(t, e));
    return v`
      <g class="pill" @click=${(p) => this._slotClick(p, t, e)}>
        <title>${$t(t.type, e)}</title>
        <rect x=${s} y=${n} width=${i} height="22" rx="11" />
        <text x=${s + i / 2} y=${n + 15.5} text-anchor="middle">${r}<tspan class="chip-unit" dx="1">${c}</tspan></text>
      </g>`;
  }
  _tile(t, e, s) {
    const n = t.props.entries || [];
    return v`
      <rect class="tile" x="0" y="0" width=${e} height=${s} rx="12" />
      <text class="tile-title" x="14" y="22">${t.label}</text>
      ${n.map((i, o) => {
      const r = this.src.get(t, i.slot), { text: c, unit: p } = zt(r, i.kind || "text"), h = 46 + o * 26;
      return v`<g class="tile-row" @click=${(d) => this._slotClick(d, t, i.slot)}>
          <text class="tile-label" x="14" y=${h}>${de(i.label || i.slot, 22)}</text>
          <text class="tile-value" x=${e - 14} y=${h} text-anchor="end">${c} <tspan class="chip-unit">${p}</tspan></text></g>`;
    })}`;
  }
  _editOverlays(t, e) {
    const s = [];
    for (const i of t.values())
      for (const o of R[i.type].ports) {
        const r = dt(i, o.id);
        if (!r) continue;
        const c = this._connect?.c === i.id && this._connect.p === o.id, p = i.type === "junction" ? { l: -7, r: 7, t: 0, b: 0 }[r.dir] ?? 0 : 0, h = i.type === "junction" ? { t: -7, b: 7, l: 0, r: 0 }[r.dir] ?? 0 : 0;
        s.push(v`<circle class="port ${c ? "src" : ""} ${this._connect ? "target" : ""}" cx=${r.x * y + p} cy=${r.y * y + h} r=${i.type === "junction" ? 4 : 6}
          @pointerdown=${(d) => this._onPortDown(d, { c: i.id, p: o.id })}><title>${o.id}</title></circle>`);
      }
    let n = g;
    if (this.selected?.kind === "p") {
      const i = e.find((r) => r.pipe.id === this.selected.id)?.route, o = i ? Yi(i.pts, i.horizontalStart) : null;
      i && o && (n = v`<rect class="bend-handle ${i.horizontalStart ? "ew" : "ns"}" x=${o.x * y - 7} y=${o.y * y - 7} width="14" height="14" rx="4"
          @pointerdown=${(r) => this._onBendDown(r, this.selected.id, i.horizontalStart)} />`);
    }
    return v`<g class="ports">${s}</g>${n}`;
  }
  // ---------------------------------------------------------- interaction
  _svgPoint(t) {
    const e = this.renderRoot.querySelector("svg"), s = e.createSVGPoint();
    s.x = t.clientX, s.y = t.clientY;
    const n = e.getScreenCTM();
    if (!n) return { x: 0, y: 0 };
    const i = s.matrixTransform(n.inverse());
    return { x: i.x, y: i.y };
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
      this._connect = e, this._emit("cp-hint", l("ed.connecting"));
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
        const [s, n] = [...this._pointers.values()], i = e.dist / Math.max(10, Math.hypot(s.x - n.x, s.y - n.y)), o = e.view, r = o.x + o.w / 2, c = o.y + o.h / 2;
        this._view = { x: r - o.w * i / 2, y: c - o.h * i / 2, w: o.w * i, h: o.h * i };
        return;
      }
      if (e.type === "pan") {
        const n = this.renderRoot.querySelector("svg").getBoundingClientRect(), i = Math.max(e.view.w / n.width, e.view.h / n.height), o = (t.clientX - e.cx) * i, r = (t.clientY - e.cy) * i;
        !e.moved && Math.abs(t.clientX - e.cx) + Math.abs(t.clientY - e.cy) > 4 && (e.moved = !0, this._capture(t)), e.moved && (this._view = { ...e.view, x: e.view.x - o, y: e.view.y - r });
        return;
      }
      if (e.type === "move") {
        const s = this._svgPoint(t);
        if (Math.abs(t.clientX - e.cx) + Math.abs(t.clientY - e.cy) > 3 && (e.moved = !0), !e.moved) return;
        const n = Math.max(0, Math.round(e.ox + (s.x - e.start.x) / y)), i = Math.max(0, Math.round(e.oy + (s.y - e.start.y) / y));
        this._drag = { id: e.id, dx: n, dy: i };
        return;
      }
      if (e.type === "tap") {
        Math.abs(t.clientX - e.cx) + Math.abs(t.clientY - e.cy) > 6 && (this._gesture = { type: "pan", cx: e.cx, cy: e.cy, view: e.view, moved: !0 }, this._capture(t), this._onMove(t));
        return;
      }
      if (e.type === "bend") {
        const s = this._svgPoint(t);
        e.moved = !0;
        const n = Math.round((e.horizontalStart ? s.x : s.y) / y);
        this._emit("cp-bend", { id: e.id, bend: n, live: !0 });
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
    const e = this._view || this._contentBox(), s = this._svgPoint(t), n = Math.exp(t.deltaY * 15e-4);
    this._view = { x: s.x - (s.x - e.x) * n, y: s.y - (s.y - e.y) * n, w: e.w * n, h: e.h * n };
  }
};
jt.properties = {
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
}, jt.styles = W`
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
let $e = jt;
customElements.get("cp-schematic") || customElements.define("cp-schematic", $e);
const Ut = class Ut extends O {
  constructor() {
    super(...arguments), this.points = [], this.color = "var(--cp-accent)", this.step = !1;
  }
  render() {
    const t = this.points.filter((f) => f.v !== null);
    if (t.length < 2) return u`<div class="empty">${l("ov.no_history")}</div>`;
    const e = 300, s = 90, n = t[0].t, i = t[t.length - 1].t;
    let o = Math.min(...t.map((f) => f.v)), r = Math.max(...t.map((f) => f.v));
    r - o < 1e-6 && (r += 1, o -= 1);
    const c = (r - o) * 0.1;
    o -= c, r += c;
    const p = (f) => (f - n) / Math.max(1, i - n) * e, h = (f) => s - (f - o) / (r - o) * s;
    let d = `M ${p(t[0].t)} ${h(t[0].v)}`;
    for (let f = 1; f < t.length; f++)
      this.step ? d += ` H ${p(t[f].t)} V ${h(t[f].v)}` : d += ` L ${p(t[f].t)} ${h(t[f].v)}`;
    const m = `${d} L ${e} ${s} L 0 ${s} Z`;
    return u`<svg viewBox="0 0 ${e} ${s}" preserveAspectRatio="none">
      <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color=${this.color} stop-opacity="0.35" /><stop offset="1" stop-color=${this.color} stop-opacity="0" />
      </linearGradient></defs>
      ${v`<path d=${m} fill="url(#sg)" /><path d=${d} fill="none" stroke=${this.color} stroke-width="2" vector-effect="non-scaling-stroke" />`}
    </svg>`;
  }
};
Ut.properties = { points: { attribute: !1 }, color: {}, step: { type: Boolean } }, Ut.styles = W`
    :host { display: block; height: 90px; }
    svg { width: 100%; height: 100%; display: block; overflow: visible; }
    .empty { height: 100%; display: grid; place-items: center; color: var(--cp-muted); font-size: 12px; }
  `;
let ye = Ut;
const Kt = class Kt extends O {
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
    if (!this.component) return g;
    const t = this.component, e = fe(t, this.slotKey), s = this.src.get(t, this.slotKey), { text: n, unit: i } = zt(s, e), o = this.src.entityOf(t, this.slotKey), r = this._hist || [], c = r.map((_) => _.v).filter((_) => _ !== null), p = e === "temp" && s?.num !== null && s?.num !== void 0 ? N(s.num, "#3ddc97") : "var(--cp-accent)", h = 320, d = Math.max(12, Math.min(window.innerWidth - h - 12, this.x - h / 2)), m = Math.max(12, Math.min(window.innerHeight - 260, this.y + 14)), f = t.type === "value_tile" ? this.slotKey : $t(t.type, this.slotKey);
    return u`
      <div class="backdrop" @pointerdown=${this._close}></div>
      <div class="pop card" style="left:${d}px; top:${m}px; width:${h}px">
        <div class="row head">
          <div>
            <div class="title">${f}</div>
            <div class="muted sub">${t.label}</div>
          </div>
          <span class="spacer"></span>
          <button class="ghost icon" @click=${this._close} aria-label=${l("close")}>${z("close")}</button>
        </div>
        <div class="now"><span class="val">${n}</span><span class="unit">${i}</span></div>
        <div class="muted cap">${l("ov.history24")}</div>
        ${this._hist === null ? u`<div class="loading"></div>` : u`<cp-sparkline .points=${r} .color=${p} .step=${e === "bool"}></cp-sparkline>`}
        ${c.length && e !== "bool" && e !== "enum" ? u`<div class="row stats">
              <span>${l("ov.min")} <b>${P(Math.min(...c))}</b></span>
              <span>${l("ov.max")} <b>${P(Math.max(...c))}</b></span>
            </div>` : g}
        ${o ? u`<div class="row foot"><code>${o}</code><span class="spacer"></span>
              <button @click=${() => this._more(o)}>${l("ov.open_entity")}</button></div>` : g}
      </div>
    `;
  }
};
Kt.properties = {
  component: { attribute: !1 },
  slotKey: {},
  src: { attribute: !1 },
  x: { type: Number },
  y: { type: Number },
  version: { type: Number },
  _hist: { state: !0 }
}, Kt.styles = [
  V,
  W`
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
let we = Kt;
const Gi = { info: "info", notice: "notice", warning: "warn", error: "error" };
function qi(a) {
  const t = { ...a.params };
  return t.label_sfx = t.label ? ` (${t.label})` : "", l(`msgk.${a.key}`, t);
}
const Ft = class Ft extends O {
  constructor() {
    super(...arguments), this.messages = [], this.compact = !1, this.canClear = !1, this._filter = "all";
  }
  _row(t) {
    const e = t.end_ts ? t.end_ts - t.ts : null;
    return u`<li class="msg ${t.level} ${t.active ? "active" : ""}">
      <span class="lv">${z(Gi[t.level] || "info")}</span>
      <div class="body">
        <div class="text">${qi(t)}</div>
        <div class="meta">
          ${ii(t.ts)}
          ${t.active ? u` · <b>${l("msg.active")}</b>` : e !== null ? u` · ${l("msg.duration", { duration: ni(e) })}` : g}
        </div>
      </div>
    </li>`;
  }
  render() {
    const t = [...this.messages].sort((i, o) => o.ts - i.ts), e = this._filter === "all" ? t : t.filter((i) => i.level === this._filter), s = e.filter((i) => i.active), n = e.filter((i) => !i.active).slice(0, this.compact ? 12 : 300);
    return u`
      ${this.compact ? g : u`<div class="row filters">
            ${["all", "error", "warning", "notice", "info"].map(
      (i) => u`<button class=${this._filter === i ? "primary" : ""} @click=${() => this._filter = i}>
                ${l(i === "all" ? "msg.filter_all" : `msg.level.${i}`)}</button>`
    )}
            <span class="spacer"></span>
            ${this.canClear ? u`<button @click=${() => this.dispatchEvent(new CustomEvent("clear"))}>${z("trash")} ${l("msg.clear")}</button>` : g}
          </div>`}
      ${s.length ? u`<h4>${l("msg.active")}</h4><ul>${s.map((i) => this._row(i))}</ul>` : g}
      <h4>${l("msg.history")}</h4>
      ${n.length ? u`<ul>${n.map((i) => this._row(i))}</ul>` : u`<div class="empty muted">${l("msg.empty")}</div>`}
    `;
  }
};
Ft.properties = {
  messages: { attribute: !1 },
  compact: { type: Boolean },
  canClear: { type: Boolean },
  _filter: { state: !0 }
}, Ft.styles = [
  V,
  W`
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
let be = Ft;
customElements.get("cp-sparkline") || customElements.define("cp-sparkline", ye);
customElements.get("cp-slot-popover") || customElements.define("cp-slot-popover", we);
customElements.get("cp-messages") || customElements.define("cp-messages", be);
const Ji = [1, 10, 60, 300, 900], Zt = class Zt extends O {
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
    const t = this._first("outdoor_unit"), e = this._first("indoor_unit"), s = this._first("dhw_tank"), n = this.plant.components.find((k) => k.type === "radiators" || k.type === "floor_heating"), i = this.plant.components.find((k) => k.type === "valve_3way" && k.props.role === "dhw_switch");
    let o = t ? Ie(this.src.get(t, "activity")) : void 0;
    if (!o && t) {
      const k = me(t, this.src), w = i ? me(i, this.src) : /* @__PURE__ */ new Set();
      o = k.has("running") ? w.has("b") ? "hot_water" : "heating" : "off";
    }
    const r = {
      heating: "#ff8a3d",
      hot_water: "#ff4f8b",
      defrost: "#6cc4ff",
      compressor_alarm: "#ff5a5f",
      off: "#8a97a6"
    }, c = this._num(t, "heat_power");
    let p = this._num(t, "el_power");
    const h = t ? this.src.get(t, "el_power")?.unit : void 0;
    p !== void 0 && h === "kW" && (p *= 1e3);
    const d = c !== void 0 && p !== void 0 && p > 50 && c > 0.2 ? c / (p / 1e3) : void 0, m = (k, w = 1) => k === void 0 ? "–" : P(k, w), f = As(this.plant, this.src), _ = [
      { key: "mode", label: l("kpi.mode"), value: o ? l(`mode.${o}`) : "–", unit: "", color: r[o || "off"] },
      { key: "out", label: l("kpi.outdoor"), value: m(this._num(t, "outdoor_temp")), unit: "°C", comp: t, slot: "outdoor_temp" },
      { key: "heat", label: l("kpi.heat"), value: m(c), unit: "kW", comp: t, slot: "heat_power" },
      { key: "power", label: l("kpi.power"), value: p === void 0 ? "–" : p >= 1e3 ? P(p / 1e3, 2) : P(p, 0), unit: p !== void 0 && p >= 1e3 ? "kW" : "W", comp: t, slot: "el_power" },
      {
        key: "cop",
        label: l("kpi.cop"),
        value: m(d),
        unit: "",
        color: f ? Et[f.ampel] : void 0,
        sub: f ? `${l("kpi.target")} ${m(f.expected)}` : void 0
      },
      {
        key: "supply",
        label: l("kpi.supply"),
        value: m(this._num(e, "supply_temp")),
        unit: "°C",
        color: N(this._num(e, "supply_temp"), ""),
        sub: this._num(e, "target_flow_temp") !== void 0 ? `${l("kpi.target")} ${m(this._num(e, "target_flow_temp"))}` : void 0,
        comp: e,
        slot: "supply_temp"
      }
    ];
    return s && _.push({ key: "dhw", label: l("kpi.dhw"), value: m(this._num(s, "temp_top")), unit: "°C", color: N(this._num(s, "temp_top"), ""), comp: s, slot: "temp_top" }), n && this._num(n, "room_temp") !== void 0 && _.push({ key: "room", label: l("kpi.room"), value: m(this._num(n, "room_temp")), unit: "°C", comp: n, slot: "room_temp" }), _;
  }
  _openPop(t) {
    this._pop = t.detail;
  }
  _scenario(t) {
    this.dispatchEvent(new CustomEvent("scenario", { detail: t, bubbles: !0, composed: !0 }));
  }
  _demoBar() {
    const t = this.sim;
    if (!t || !this.showDemo) return g;
    const e = ["winter", "transition", "shower", "defrost", "dim14a", "pv", "disinfect", "fault", "reset"], s = { dim14a: t.dim14a, pv: t.pv, fault: t.fault, disinfect: t.disinfect };
    return u`<div class="demo">
      <span class="demo-tag">${z("flask")} ${l("demo.active")}</span>
      <span class="clock" title=${l("demo.time")}>${bs(t.time)}</span>
      <label class="ctl">${l("demo.speed")}
        <select @change=${(n) => t.speed = Number(n.target.value)}>
          ${Ji.map((n) => u`<option value=${n} ?selected=${t.speed === n}>${n}×</option>`)}
        </select>
      </label>
      <label class="ctl slider">${l("demo.outdoor")} <b>${P(t.outdoorMean, 0)} °C</b>
        <input type="range" min="-15" max="20" step="1" .value=${String(t.outdoorMean)}
          @input=${(n) => t.outdoorMean = Number(n.target.value)} />
      </label>
      ${this.narrow ? u`<select class="scn-select" @change=${(n) => {
      const i = n.target;
      i.value && this._scenario(i.value), i.value = "";
    }}>
            <option value="">${l("demo.scenarios")} …</option>
            ${e.map((n) => u`<option value=${n}>${s[n] ? "✓ " : ""}${l(`scn.${n}`)}</option>`)}
          </select>` : u`<div class="scn">
            ${e.map(
      (n) => u`<button class=${s[n] ? "primary" : ""} @click=${() => this._scenario(n)}>${l(`scn.${n}`)}</button>`
    )}
          </div>`}
    </div>`;
  }
  render() {
    if (!this.plant) return g;
    const t = this._kpis(), e = this.messages.filter((s) => s.active && (s.level === "warning" || s.level === "error")).length;
    return u`
      ${this._demoBar()}
      ${this.showKpis ? u`<div class="kpis">
        ${t.map(
      (s) => u`<button class="kpi" ?disabled=${!s.comp} @click=${(n) => s.comp && (this._pop = { component: s.comp, slot: s.slot, x: n.clientX, y: n.clientY })}>
            <span class="k-label">${s.label}</span>
            <span class="k-value" style=${s.color ? `color:${s.color}` : ""}>${s.value}<small>${s.unit}</small></span>
            ${s.sub ? u`<span class="k-sub">${s.sub}</span>` : g}
          </button>`
    )}
      </div>` : g}
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
            <button class="icon" title=${l("zoom_in")} @click=${() => this._sch()?.zoom(0.8)}>${z("plus")}</button>
            <button class="icon" title=${l("zoom_out")} @click=${() => this._sch()?.zoom(1.25)}>${z("minus")}</button>
            <button class="icon" title=${l("fit")} @click=${() => this._sch()?.fit()}>${z("fit")}</button>
            ${this.narrow || !this.showSide ? g : u`<button class="icon" title=${l("msg.title")} @click=${() => this._side = !this._side}>
                  ${z("bell")}${e ? u`<span class="badge">${e}</span>` : g}</button>`}
          </div>
        </div>
        ${this.showSide && (this._side || this.narrow) ? u`<aside class="side card">
              <div class="side-head"><b>${l("msg.title")}</b></div>
              <cp-messages compact .messages=${this.messages}></cp-messages>
            </aside>` : g}
      </div>
      ${this._pop ? u`<cp-slot-popover
            .component=${this._pop.component}
            .slotKey=${this._pop.slot}
            .src=${this.src}
            .x=${this._pop.x}
            .y=${this._pop.y}
            .version=${this.version}
            @close=${() => this._pop = null}
          ></cp-slot-popover>` : g}
    `;
  }
  _sch() {
    return this.renderRoot.querySelector("cp-schematic");
  }
};
Zt.properties = {
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
}, Zt.styles = [
  V,
  W`
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
let xe = Zt;
customElements.get("cp-overview") || customElements.define("cp-overview", xe);
const Xi = [
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
], Qi = ["supply", "return", "dhw_hot", "dhw_cold", "circulation"], he = {
  pump: ["running", "!running"],
  mixer: ["running"],
  valve_3way: ["a", "b"],
  outdoor_unit: ["running", "defrost", "!defrost"],
  indoor_unit: ["running", "aux"],
  tap: ["flowing"],
  dhw_tank: ["charging"]
};
function mt(a) {
  return JSON.parse(JSON.stringify(a));
}
const gt = class gt extends O {
  constructor() {
    super(...arguments), this.value = "", this.placeholder = "", this._listId = `cp-ents-${gt._uid++}`;
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
        placeholder=${this.placeholder || l("ed.entity_search")}
        @change=${this._change}
      />
      <datalist id=${this._listId}>
        ${t.map((e) => u`<option value=${e}>${this.hass.states[e].attributes.friendly_name || ""}</option>`)}
      </datalist>`;
  }
};
gt.properties = { hass: { attribute: !1 }, value: {}, placeholder: {} }, gt._uid = 0, gt.styles = [V, W`:host { display: block; min-width: 0; } input { font-size: 12px; padding: 6px 8px; }`];
let ke = gt;
customElements.get("cp-entity-picker") || customElements.define("cp-entity-picker", ke);
const Yt = class Yt extends O {
  constructor() {
    super(...arguments), this.icons = /* @__PURE__ */ new Map(), this.version = 0, this._sel = null, this._hint = "", this._dirty = !1, this._undo = [], this._redo = [], this._onKey = (t) => {
      const e = t.composedPath()[0]?.tagName;
      e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || ((t.key === "Delete" || t.key === "Backspace") && this._sel ? (t.preventDefault(), this._delete()) : (t.ctrlKey || t.metaKey) && t.key.toLowerCase() === "z" ? (t.preventDefault(), t.shiftKey ? this._doRedo() : this._doUndo()) : t.key.toLowerCase() === "r" && this._sel?.kind === "c" && this._rotate());
    };
  }
  willUpdate() {
    this.plant && this.plant !== this._source && (this._source = this.plant, this._draft = mt(this.plant), this._undo = [], this._redo = [], this._dirty = !1, this._sel = null);
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
    const s = mt(this._draft);
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
    const e = /* @__PURE__ */ new Set([...this._draft.components.map((n) => n.id), ...this._draft.pipes.map((n) => n.id)]);
    let s = 1;
    for (; e.has(`${t}${s}`); ) s++;
    return `${t}${s}`;
  }
  _add(t) {
    const e = R[t], s = this._newId(`${t}_`), n = {
      id: s,
      type: t,
      label: t === "junction" ? "" : l(`type.${t}`),
      ...this._freeSpot(e.w, e.h),
      bindings: {},
      props: t === "value_tile" ? { entries: [] } : t === "label" ? { text: l("type.label"), size: 18 } : {}
    };
    t === "pump" && (n.props.role = "other"), this._commit((i) => i.components.push(n)), this._sel = { kind: "c", id: s };
  }
  /** First grid position where a w×h box (plus margin) does not overlap anything. */
  _freeSpot(t, e) {
    const s = this._draft.components.map((i) => ({ c: i, ...Wt(i) })), n = (i, o) => s.every(({ c: r, w: c, h: p }) => i + t + 1 <= r.x || i >= r.x + c + 1 || o + e + 2 <= r.y || o >= r.y + p + 3);
    for (let i = 1; i + e < this._draft.grid.h; i += 2)
      for (let o = 1; o + t < this._draft.grid.w; o += 2) if (n(o, i)) return { x: o, y: i };
    return { x: 1, y: 1 };
  }
  _delete() {
    const t = this._sel;
    t && (this._commit((e) => {
      t.kind === "c" ? (e.components = e.components.filter((s) => s.id !== t.id), e.pipes = e.pipes.filter((s) => s.from.c !== t.id && s.to.c !== t.id), e.pipes.forEach((s) => {
        s.flow = s.flow?.filter((n) => n.c !== t.id), s.flowAny = s.flowAny?.filter((n) => n.c !== t.id);
      })) : e.pipes = e.pipes.filter((s) => s.id !== t.id);
    }), this._sel = null);
  }
  _rotate() {
    const t = this._comp();
    !t || !R[t.type].rotatable || this._commit((e) => {
      const s = e.components.find((n) => n.id === t.id);
      s.rot = ((s.rot || 0) + 90) % 360;
    });
  }
  _duplicate() {
    const t = this._comp();
    if (!t) return;
    const e = this._newId(`${t.type}_`);
    this._commit((s) => s.components.push({ ...mt(t), id: e, x: t.x + 2, y: t.y + 2 })), this._sel = { kind: "c", id: e };
  }
  _connect(t, e) {
    const s = this._comp(t.c), n = this._comp(e.c), i = dt(s, t.p), o = dt(n, e.p), r = i?.def.kind || o?.def.kind || "supply", c = [], p = [s, n].find((d) => d.type === "pump");
    p && c.push({ c: p.id, s: "running" });
    for (const [d, m] of [
      [s, t],
      [n, e]
    ])
      d.type === "valve_3way" && (m.p === "a" || m.p === "b") && c.push({ c: d.id, s: m.p });
    const h = this._newId("p");
    this._commit((d) => d.pipes.push({ id: h, from: t, to: e, kind: r, flow: c })), this._sel = { kind: "p", id: h };
  }
  _set(t, e = !0) {
    const s = this._sel?.id;
    this._commit((n) => {
      const i = n.components.find((o) => o.id === s);
      i && t(i);
    }, e);
  }
  _setPipe(t, e = !0) {
    const s = this._sel?.id;
    this._commit((n) => {
      const i = n.pipes.find((o) => o.id === s);
      i && t(i);
    }, e);
  }
  _save() {
    this.dispatchEvent(new CustomEvent("save", { detail: mt(this._draft), bubbles: !0, composed: !0 })), this._dirty = !1;
  }
  _discard() {
    this._draft = mt(this.plant), this._undo = [], this._redo = [], this._dirty = !1, this._sel = null;
  }
  // ------------------------------------------------------------ events
  _onBend(t) {
    const { id: e, bend: s, live: n } = t.detail;
    if (n) {
      this._bendStart || (this._bendStart = JSON.stringify(this._draft));
      const i = mt(this._draft), o = i.pipes.find((r) => r.id === e);
      o && (o.bend = s), this._draft = i;
    } else this._bendStart && (this._undo.push(this._bendStart), this._bendStart = void 0, this._dirty = !0);
  }
  // ------------------------------------------------------------ render
  render() {
    if (!this._draft) return g;
    const t = this._sel;
    return u`
      <div class="toolbar">
        <button class="icon" title=${l("undo")} ?disabled=${!this._undo.length} @click=${this._doUndo}>${z("undo")}</button>
        <button class="icon" title=${l("redo")} ?disabled=${!this._redo.length} @click=${this._doRedo}>${z("redo")}</button>
        <button class="icon" title=${l("ed.rotation")} ?disabled=${!(t?.kind === "c" && R[this._comp()?.type || "label"].rotatable)} @click=${this._rotate}>${z("rotate")}</button>
        <button class="icon" title=${l("ed.duplicate")} ?disabled=${t?.kind !== "c"} @click=${this._duplicate}>${z("copy")}</button>
        <button class="icon danger" title=${l("delete")} ?disabled=${!t} @click=${this._delete}>${z("trash")}</button>
        <span class="hint">${this._hint}</span>
        <span class="spacer"></span>
        ${this._dirty ? u`<span class="dirty">${l("unsaved")}</span>
          <button @click=${this._discard}>${l("discard")}</button>` : g}
        <button class="primary" ?disabled=${!this._dirty} @click=${this._save}>${z("save")} ${l("save")}</button>
      </div>
      <div class="layout">
        <aside class="palette card">
          <div class="cap">${l("ed.palette")}</div>
          ${Xi.map((e) => u`<button class="pal" @click=${() => this._add(e)}>${z("plus")} ${l(`type.${e}`)}</button>`)}
          <div class="cap">${l("ed.grid")}</div>
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
      const n = s.components.find((i) => i.id === e.detail.id);
      n && (n.x = e.detail.x, n.y = e.detail.y);
    })}
            @cp-connect=${(e) => this._connect(e.detail.from, e.detail.to)}
            @cp-bend=${this._onBend}
            @cp-hint=${(e) => this._hint = e.detail}
          ></cp-schematic>
        </div>
        <aside class="props card">${t?.kind === "c" ? this._compProps() : t?.kind === "p" ? this._pipeProps() : u`<p class="muted">${l("ed.nothing")}</p>`}</aside>
      </div>
    `;
  }
  _num(t, e, s, n = 1) {
    return u`<label class="field">${t}<input type="number" step=${n} .value=${e ?? ""} @change=${(i) => s(Number(i.target.value))} /></label>`;
  }
  _compProps() {
    const t = this._comp();
    if (!t) return g;
    const e = R[t.type], s = new Set(t.show ?? lt(t).filter((i) => i.show).map((i) => i.key)), n = [...this.icons.values()];
    return u`
      <div class="ptitle">${l(`type.${t.type}`)} <code>${t.id}</code></div>
      ${t.type !== "junction" ? u`<label class="field">${l("ed.label")}<input .value=${t.label} @change=${(i) => this._set((o) => o.label = i.target.value)} /></label>` : g}
      ${t.type === "outdoor_unit" ? u`<label class="field">${l("ed.model")}<select @change=${(i) => this._set((o) => o.model = i.target.value)}>
              ${It.map((i) => u`<option value=${i.id} ?selected=${i.id === t.model}>${i.label}</option>`)}
            </select></label>
            ${this._num(l("ed.nominal"), t.props.nominal_kw, (i) => this._set((o) => o.props.nominal_kw = i), 0.1)}
            ${this._num(l("ed.cop_ref"), t.props.cop_ref ?? 4.9, (i) => this._set((o) => o.props.cop_ref = i), 0.1)}` : g}
      ${t.type === "indoor_unit" ? u`<label class="field">${l("ed.model")}<select @change=${(i) => this._set((o) => o.model = i.target.value)}>
              ${xs.map((i) => u`<option value=${i.id} ?selected=${i.id === t.model}>${i.label}</option>`)}
            </select></label>
            ${this._num(l("wz.aux_kw"), t.props.aux_kw, (i) => this._set((o) => o.props.aux_kw = i), 1)}
            <div class="cap">${l("ed.input_labels")}</div>
            ${[1, 2, 3, 4].map(
      (i) => u`<label class="field">${l(`slot.input${i}`)}<input .value=${t.props.input_labels?.[`input${i}`] || ""}
                @change=${(o) => this._set((r) => r.props.input_labels = { ...r.props.input_labels || {}, [`input${i}`]: o.target.value })} /></label>`
    )}
            <div class="cap">${l("ed.pressure_limits")}</div>
            <div class="two">
              ${this._num("min", t.props.pressure_min ?? 1, (i) => this._set((o) => o.props.pressure_min = i), 0.1)}
              ${this._num("max", t.props.pressure_max ?? 2.7, (i) => this._set((o) => o.props.pressure_max = i), 0.1)}
            </div>` : g}
      ${t.type === "buffer" || t.type === "dhw_tank" ? this._num(l("ed.volume"), t.props.volume, (i) => this._set((o) => o.props.volume = i)) : g}
      ${e.roles ? u`<label class="field">${l("ed.role")}<select @change=${(i) => this._set((o) => o.props.role = i.target.value)}>
            ${e.roles.map((i) => u`<option value=${i} ?selected=${t.props.role === i}>${l(`role.${i}`)}</option>`)}
          </select></label>` : g}
      ${["radiators", "floor_heating", "mixer", "pump"].includes(t.type) ? this._num(l("ed.circuit"), t.props.circuit ?? 1, (i) => this._set((o) => o.props.circuit = i)) : g}
      ${t.type === "dhw_tank" ? this._num(l("ed.dhw_circuit"), t.props.dhw_circuit ?? 1, (i) => this._set((o) => o.props.dhw_circuit = i)) : g}
      ${t.type === "label" ? u`<label class="field">${l("ed.text")}<input .value=${t.props.text || ""} @change=${(i) => this._set((o) => o.props.text = i.target.value)} /></label>
            ${this._num("px", t.props.size || 18, (i) => this._set((o) => o.props.size = i))}` : g}
      ${e.rotatable ? u`<label class="field">${l("ed.rotation")}<select @change=${(i) => this._set((o) => o.rot = Number(i.target.value))}>
            ${[0, 90, 180, 270].map((i) => u`<option value=${i} ?selected=${(t.rot || 0) === i}>${i}°</option>`)}
          </select></label>` : g}
      ${["junction", "label", "value_tile"].includes(t.type) ? g : u`<label class="field">${l("ed.icon")}<select @change=${(i) => this._set((o) => {
      const r = i.target.value;
      r ? o.icon = r : delete o.icon;
    })}>
            <option value="">${l("ed.icon_default")}</option>
            ${n.map((i) => u`<option value=${i.id} ?selected=${i.id === t.icon}>${i.name}</option>`)}
          </select></label>`}
      ${t.type === "value_tile" ? this._tileEntries(t) : this._bindings(t, s)}
    `;
  }
  _bindings(t, e) {
    const s = lt(t);
    return s.length ? u`<div class="cap">${l("ed.bindings")}</div>
      <div class="bindings">
        ${s.map((n) => {
      const i = this.src.get(t, n.key), { text: o, unit: r } = zt(i, n.kind);
      return u`<div class="bind">
            <div class="bhead">
              <label class="show" title=${l("ed.show")}><input type="checkbox" .checked=${e.has(n.key)}
                @change=${(c) => this._set((p) => {
        const h = new Set(p.show ?? lt(p).filter((d) => d.show).map((d) => d.key));
        c.target.checked ? h.add(n.key) : h.delete(n.key), p.show = lt(p).map((d) => d.key).filter((d) => h.has(d));
      })} /></label>
              <span class="bname">${$t(t.type, n.key)}</span>
              <span class="bval">${i ? `${o} ${r}` : ""}</span>
            </div>
            <cp-entity-picker .hass=${this.hass} .value=${t.bindings[n.key] || ""}
              @value-changed=${(c) => this._set((p) => {
        c.detail ? p.bindings[n.key] = c.detail : delete p.bindings[n.key];
      })}></cp-entity-picker>
          </div>`;
    })}
      </div>` : g;
  }
  _tileEntries(t) {
    const e = t.props.entries || [], s = ["temp", "power_kw", "power_w", "energy", "percent", "pressure", "flow", "count", "bool", "text"];
    return u`<div class="cap">${l("ed.entries")}</div>
      ${e.map(
      (n, i) => u`<div class="bind">
          <div class="two">
            <input .value=${n.label || ""} placeholder=${l("ed.label")} @change=${(o) => this._set((r) => r.props.entries[i].label = o.target.value)} />
            <select @change=${(o) => this._set((r) => r.props.entries[i].kind = o.target.value)}>
              ${s.map((o) => u`<option value=${o} ?selected=${n.kind === o}>${o}</option>`)}
            </select>
          </div>
          <div class="row nowrap">
            <cp-entity-picker .hass=${this.hass} .value=${n.entity || ""}
              @value-changed=${(o) => this._set((r) => r.props.entries[i].entity = o.detail)}></cp-entity-picker>
            <button class="icon danger" @click=${() => this._set((o) => o.props.entries.splice(i, 1))}>${z("trash")}</button>
          </div>
        </div>`
    )}
      <button @click=${() => this._set((n) => {
      n.props.entries = [...n.props.entries || [], { slot: `v${Date.now().toString(36)}`, label: "", entity: "", kind: "text" }];
    })}>${z("plus")} ${l("ed.add_entry")}</button>`;
  }
  _conds(t, e) {
    const s = this._draft.components.filter((n) => he[n.type]);
    return u`${(t || []).map(
      (n, i) => u`<div class="row nowrap cond">
          <select @change=${(o) => this._setPipe((r) => r[e][i].c = o.target.value)}>
            ${s.map((o) => u`<option value=${o.id} ?selected=${o.id === n.c}>${o.label || o.id}</option>`)}
          </select>
          <select @change=${(o) => this._setPipe((r) => r[e][i].s = o.target.value)}>
            ${(he[this._comp(n.c)?.type || "pump"] || []).map(
        (o) => u`<option value=${o} ?selected=${o === n.s}>${o.startsWith("!") ? `${l("ed.not")} ${l(`state.${o.slice(1)}`)}` : l(`state.${o}`)}</option>`
      )}
          </select>
          <button class="icon danger" @click=${() => this._setPipe((o) => o[e].splice(i, 1))}>${z("close")}</button>
        </div>`
    )}
      <button ?disabled=${!s.length} @click=${() => this._setPipe((n) => {
      const i = s[0];
      n[e] = [...n[e] || [], { c: i.id, s: he[i.type][0] }];
    })}>${z("plus")} ${l("ed.add_cond")}</button>`;
  }
  _pipeProps() {
    const t = this._pipe();
    if (!t) return g;
    const e = (s) => this._comp(s)?.label || s;
    return u`
      <div class="ptitle">${l("ed.pipe")} <code>${t.id}</code></div>
      <p class="muted small">${e(t.from.c)} · ${t.from.p} → ${e(t.to.c)} · ${t.to.p}</p>
      <label class="field">${l("ed.kind")}<select @change=${(s) => this._setPipe((n) => n.kind = s.target.value)}>
        ${Qi.map((s) => u`<option value=${s} ?selected=${s === t.kind}>${l(`kind.${s}`)}</option>`)}
      </select></label>
      <div class="cap">${l("ed.flow_when")}</div>
      ${this._conds(t.flow, "flow")}
      <div class="cap">${l("ed.or")}</div>
      ${this._conds(t.flowAny, "flowAny")}
      <div class="cap">${l("ed.bindings")}</div>
      <label class="field">${l("ed.temp_entity")}
        <cp-entity-picker .hass=${this.hass} .value=${t.bindings?.temp || ""}
          @value-changed=${(s) => this._setPipe((n) => n.bindings = { ...n.bindings || {}, temp: s.detail || void 0 })}></cp-entity-picker></label>
      <div class="row" style="margin-top:12px">
        <button ?disabled=${t.bend === void 0} @click=${() => this._setPipe((s) => delete s.bend)}>${l("ed.reset_bend")}</button>
      </div>
    `;
  }
};
Yt.properties = {
  plant: { attribute: !1 },
  hass: { attribute: !1 },
  src: { attribute: !1 },
  icons: { attribute: !1 },
  version: { type: Number },
  _draft: { state: !0 },
  _sel: { state: !0 },
  _hint: { state: !0 },
  _dirty: { state: !0 }
}, Yt.styles = [
  V,
  W`
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
let Me = Yt;
customElements.get("cp-editor") || customElements.define("cp-editor", Me);
function ct(a, t, e) {
  a.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
}
const Gt = class Gt extends O {
  constructor() {
    super(...arguments), this.plant = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._cfg = structuredClone(this.plant?.settings?.wizard || ge());
  }
  _upd(t) {
    this._cfg = { ...this._cfg, ...t };
  }
  _generate() {
    this.plant && !confirm(l("wz.replace_confirm")) || ct(this, "plant-generated", Ms(this._cfg, this.plant));
  }
  render() {
    const t = this._cfg, e = (s, n = "text") => u`<input type=${n} .value=${String(t[s] ?? "")}
      @change=${(i) => {
      const o = i.target.value;
      this._upd({ [s]: n === "number" ? Number(o) : o });
    }} />`;
    return u`
      <div class="card wrap">
        <h2>${l("wz.title")}</h2>
        <p class="muted">${l("wz.intro")}</p>
        <label class="field">${l("wz.name")} ${e("name")}</label>

        <h3>${l("wz.hp")}</h3>
        <div class="grid">
          <label class="field">${l("wz.outdoor")}
            <select @change=${(s) => this._upd({ outdoorModel: s.target.value })}>
              ${It.map((s) => u`<option value=${s.id} ?selected=${s.id === t.outdoorModel}>${s.label}</option>`)}
            </select></label>
          <label class="field">${l("ed.label")} ${e("outdoorLabel")}</label>
          <label class="field">${l("ed.nominal")} ${e("nominalKw", "number")}</label>
          <label class="field">${l("wz.indoor")}
            <select @change=${(s) => this._upd({ indoorModel: s.target.value })}>
              ${xs.map((s) => u`<option value=${s.id} ?selected=${s.id === t.indoorModel}>${s.label}</option>`)}
            </select></label>
          <label class="field">${l("ed.label")} ${e("indoorLabel")}</label>
          <div class="field check">
            <label><input type="checkbox" .checked=${t.aux} @change=${(s) => this._upd({ aux: s.target.checked })} /> ${l("wz.aux")}</label>
            ${t.aux ? u`<label class="field">${l("wz.aux_kw")} ${e("auxKw", "number")}</label>` : g}
          </div>
        </div>

        <h3>${l("wz.buffer")}</h3>
        <div class="grid">
          <div class="radios">
            ${["parallel", "serial", "none"].map(
      (s) => u`<label><input type="radio" name="buf" .checked=${t.buffer === s} @change=${() => this._upd({ buffer: s })} /> ${l(`wz.buffer.${s}`)}</label>`
    )}
          </div>
          ${t.buffer !== "none" ? u`<label class="field">${l("wz.buffer_volume")} ${e("bufferVolume", "number")}</label>
                <label class="field">${l("ed.label")} ${e("bufferLabel")}</label>` : g}
        </div>

        <h3>${l("wz.dhw")}</h3>
        <div class="grid">
          <div class="radios">
            ${["tank", "none"].map(
      (s) => u`<label><input type="radio" name="dhw" .checked=${t.dhw === s} @change=${() => this._upd({ dhw: s })} /> ${l(`wz.dhw.${s}`)}</label>`
    )}
          </div>
          ${t.dhw === "tank" ? u`<label class="field">${l("wz.dhw_volume")} ${e("dhwVolume", "number")}</label>
                <label class="field">${l("ed.label")} ${e("dhwLabel")}</label>
                <label class="check"><input type="checkbox" .checked=${t.circulation} @change=${(s) => this._upd({ circulation: s.target.checked })} /> ${l("wz.circulation")}</label>` : g}
        </div>

        <h3>${l("wz.circuits")}</h3>
        ${t.circuits.map(
      (s, n) => u`<div class="circuit">
            <b>${l("wz.circuit", { n: n + 1 })}</b>
            <input .value=${s.label} @change=${(i) => this._circ(n, { label: i.target.value })} />
            <select @change=${(i) => this._circ(n, { emitter: i.target.value })}>
              <option value="radiators" ?selected=${s.emitter === "radiators"}>${l("type.radiators")}</option>
              <option value="floor_heating" ?selected=${s.emitter === "floor_heating"}>${l("type.floor_heating")}</option>
            </select>
            <label class="check"><input type="checkbox" .checked=${s.mixed} @change=${(i) => this._circ(n, { mixed: i.target.checked })} /> ${l("wz.mixed")}</label>
            <button class="ghost danger" ?disabled=${t.circuits.length < 2} @click=${() => this._upd({ circuits: t.circuits.filter((i, o) => o !== n) })}>${l("wz.remove")}</button>
          </div>`
    )}
        <button ?disabled=${t.circuits.length >= 4} @click=${() => this._upd({ circuits: [...t.circuits, { emitter: "floor_heating", mixed: !0, label: l("wz.circuit", { n: t.circuits.length + 1 }) }] })}>
          ${z("plus")} ${l("wz.add_circuit")}</button>

        <h3>${l("wz.extras")}</h3>
        <div class="radios">
          <label><input type="checkbox" .checked=${t.separator} @change=${(s) => this._upd({ separator: s.target.checked })} /> ${l("wz.separator")}</label>
          <label><input type="checkbox" .checked=${t.expansion} @change=${(s) => this._upd({ expansion: s.target.checked })} /> ${l("wz.expansion")}</label>
        </div>

        <div class="row actions">
          <button @click=${() => this._cfg = ge()}>${l("wz.example")}</button>
          <span class="spacer"></span>
          <button class="primary" @click=${this._generate}>${z("wand")} ${l("wz.generate")}</button>
        </div>
      </div>
    `;
  }
  _circ(t, e) {
    const s = this._cfg.circuits.map((n, i) => i === t ? { ...n, ...e } : n);
    this._upd({ circuits: s });
  }
};
Gt.properties = { plant: { attribute: !1 }, _cfg: { state: !0 } }, Gt.styles = [
  V,
  W`
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
let Se = Gt;
const qt = class qt extends O {
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
      const n = t.components.find((i) => i.id === s.component_id);
      n && (n.bindings[s.slot] = s.entity_id, e++);
    }
    ct(this, "save", t), this._msg = l("map.applied", { count: e });
  }
  render() {
    const t = !!this.hass?.__standalone, e = this._res, s = this.plant.components.flatMap(
      (n) => lt(n).filter((i) => !n.bindings[i.key] && !e?.suggestions.some((o) => o.component_id === n.id && o.slot === i.key)).map((i) => ({ c: n, s: i }))
    );
    return u`<div class="card">
      <h2>${l("map.title")}</h2>
      <p class="muted">${l("map.intro")}</p>
      ${t ? u`<p class="muted">${l("map.standalone")}</p>` : g}
      <div class="row">
        <button class="primary" ?disabled=${this._busy || t} @click=${this._scan}>${z("search")} ${l("map.scan")}</button>
        ${e ? u`<span class="muted">${l("map.found", { count: e.entity_count })}</span>` : g}
        <span class="spacer"></span>
        ${this._msg ? u`<span class="ok">${z("check")} ${this._msg}</span>` : g}
      </div>
      ${e && e.entity_count === 0 ? u`<div class="help"><b>${l("map.none")}</b><p>${l("map.none_help")}</p></div>` : g}
      ${e && e.suggestions.length ? u`<div class="tbl">
            <table>
              <thead><tr>
                <th><input type="checkbox" .checked=${this._sel.size === e.suggestions.length}
                  @change=${(n) => this._sel = n.target.checked ? new Set(e.suggestions.map((i) => `${i.component_id}|${i.slot}`)) : /* @__PURE__ */ new Set()} /></th>
                <th>${l("map.component")}</th><th>${l("map.slot")}</th><th>${l("map.entity")}</th><th>${l("map.value")}</th><th>${l("map.confidence")}</th>
              </tr></thead>
              <tbody>
                ${e.suggestions.map((n) => {
      const i = `${n.component_id}|${n.slot}`, o = this._comp(n.component_id), r = o?.bindings[n.slot], c = this.hass?.states[n.entity_id];
      return u`<tr>
                    <td><input type="checkbox" .checked=${this._sel.has(i)} @change=${(p) => {
        const h = new Set(this._sel);
        p.target.checked ? h.add(i) : h.delete(i), this._sel = h;
      }} /></td>
                    <td>${o?.label || n.component_id}</td>
                    <td>${$t(o?.type || "", n.slot)}</td>
                    <td><code>${n.entity_id}</code>${r && r !== n.entity_id ? u`<div class="muted small">${l("map.current")}: ${r}</div>` : g}</td>
                    <td>${c ? `${c.state} ${c.attributes.unit_of_measurement || ""}` : "–"}</td>
                    <td><span class="conf ${n.confidence}">${l(`map.conf.${n.confidence}`)}</span></td>
                  </tr>`;
    })}
              </tbody>
            </table>
          </div>
          <div class="row"><span class="spacer"></span><button class="primary" ?disabled=${!this._sel.size} @click=${this._apply}>${l("map.apply")} (${this._sel.size})</button></div>` : g}
      <h3>${l("map.unbound")}</h3>
      <p class="muted small">${l("map.unbound_hint")}</p>
      <div class="chips">${s.slice(0, 80).map(({ c: n, s: i }) => u`<span class="chip">${n.label || n.id}: ${$t(n.type, i.key)}</span>`)}</div>
    </div>`;
  }
};
qt.properties = {
  plant: { attribute: !1 },
  hass: { attribute: !1 },
  api: { attribute: !1 },
  _res: { state: !0 },
  _sel: { state: !0 },
  _busy: { state: !0 },
  _msg: { state: !0 }
}, qt.styles = [
  V,
  W`
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
let ze = qt;
const tn = ["outdoor_unit", "indoor_unit", "buffer", "dhw_tank", "pump", "valve_3way", "mixer", "radiators", "floor_heating", "tap", "separator", "expansion_vessel"], Jt = class Jt extends O {
  constructor() {
    super(...arguments), this.icons = /* @__PURE__ */ new Map(), this._err = "", this._iso = !1;
  }
  async _upload(t) {
    const e = t.target, s = e.files?.[0];
    if (e.value = "", !s) return;
    if (this._err = "", s.size > 256 * 1024) {
      this._err = l("ic.err.too_large");
      return;
    }
    const n = await new Promise((i, o) => {
      const r = new FileReader();
      r.onload = () => i(String(r.result).split(",")[1] || ""), r.onerror = () => o(r.error), r.readAsDataURL(s);
    });
    try {
      await this.api.uploadIcon(s.name.replace(/\.[^.]+$/, ""), s.type || "image/svg+xml", n, this._iso), ct(this, "icons-changed");
    } catch (i) {
      const o = i?.code || i?.error?.code || "invalid_data";
      this._err = l(`ic.err.${o}`);
    }
  }
  async _delete(t) {
    await this.api.deleteIcon(t), ct(this, "icons-changed");
  }
  _typeDefault(t, e) {
    const s = structuredClone(this.plant);
    s.settings.typeIcons = { ...s.settings.typeIcons || {} }, e ? s.settings.typeIcons[t] = e : delete s.settings.typeIcons[t], ct(this, "save", s);
  }
  render() {
    const t = [...this.icons.values()];
    return u`<div class="card">
      <h2>${l("ic.title")}</h2>
      <p class="muted">${l("ic.intro")}</p>
      <div class="row">
        <label class="btn primary up">${z("upload")} ${l("ic.upload")}
          <input type="file" accept=".svg,.png,.webp,.jpg,.jpeg,image/svg+xml,image/png,image/webp,image/jpeg" @change=${this._upload} hidden /></label>
        <label class="row small"><input type="checkbox" .checked=${this._iso} @change=${(e) => this._iso = e.target.checked} /> ${l("ic.iso")}</label>
        ${this._err ? u`<span class="err">${this._err}</span>` : g}
      </div>
      ${t.length ? u`<div class="gallery">${t.map(
      (e) => u`<div class="ic">
              <div class="prev"><img src=${e.data_url} alt=${e.name} /></div>
              <div class="name">${e.name}${e.iso ? u` <span class="muted">· iso</span>` : g}</div>
              <button class="ghost danger icon" @click=${() => this._delete(e.id)}>${z("trash")}</button>
            </div>`
    )}</div>` : u`<p class="muted">${l("ic.empty")}</p>`}
      <h3>${l("ic.type_default")}</h3>
      <div class="defaults">
        ${tn.map(
      (e) => u`<label class="field">${l(`type.${e}`)}
            <select @change=${(s) => this._typeDefault(e, s.target.value)}>
              <option value="">${l("ed.icon_default")}</option>
              ${t.map((s) => u`<option value=${s.id} ?selected=${this.plant.settings.typeIcons?.[e] === s.id}>${s.name}</option>`)}
            </select></label>`
    )}
      </div>
    </div>`;
  }
};
Jt.properties = { plant: { attribute: !1 }, api: { attribute: !1 }, icons: { attribute: !1 }, _err: { state: !0 }, _iso: { state: !0 } }, Jt.styles = [
  V,
  W`
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
let Ee = Jt;
const Xt = class Xt extends O {
  constructor() {
    super(...arguments), this.version = "";
  }
  _patch(t) {
    const e = structuredClone(this.plant);
    e.settings = { ...e.settings, ...t }, ct(this, "save", e);
  }
  render() {
    const t = this.plant.settings;
    return u`<div class="card wrap">
      <h2>${l("st.title")}</h2>
      <label class="field">${l("st.style")}
        <select @change=${(e) => this._patch({ style: e.target.value })}>
          <option value="flat" ?selected=${t.style === "flat"}>${l("st.style.flat")}</option>
          <option value="iso" disabled>${l("st.style.iso")}</option>
        </select></label>
      <label class="toggle"><input type="checkbox" .checked=${t.demo} @change=${(e) => this._patch({ demo: e.target.checked })} />
        <span><b>${l("st.demo")}</b><br /><span class="muted">${l("st.demo_hint")}</span></span></label>
      <label class="field">${l("st.language")}
        <select @change=${(e) => this._patch({ language: e.target.value })}>
          ${["auto", "de", "en"].map((e) => u`<option value=${e} ?selected=${(t.language || "auto") === e}>${e === "auto" ? l("st.lang.auto") : e === "de" ? "Deutsch" : "English"}</option>`)}
        </select></label>
      <label class="field">${l("st.heat_load")}
        <input type="number" step="0.1" .value=${String(t.heat_load ?? 6.2)} @change=${(e) => this._patch({ heat_load: Number(e.target.value) })} /></label>
      <div class="row foot">
        <span class="muted">${l("st.version")} ${this.version}</span>
        <span class="spacer"></span>
        <button class="danger" @click=${() => confirm(l("st.reset_confirm")) && ct(this, "reset-plant")}>${l("st.reset")}</button>
      </div>
    </div>`;
  }
};
Xt.properties = { plant: { attribute: !1 }, version: {} }, Xt.styles = [
  V,
  W`
      .wrap { max-width: 640px; display: grid; gap: 16px; }
      .toggle { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; }
      .toggle input { margin-top: 4px; }
      .foot { margin-top: 8px; }
    `
];
let Ae = Xt;
for (const [a, t] of [
  ["cp-wizard", Se],
  ["cp-mapping", ze],
  ["cp-icons", Ee],
  ["cp-settings", Ae]
])
  customElements.get(a) || customElements.define(a, t);
const en = 10 * 6e4, sn = 5e3;
function us(a) {
  return a === void 0 ? "var(--cp-muted)" : a >= 3.5 ? Et.green : a >= 3 ? Et.yellow : Et.red;
}
const Qt = class Qt extends O {
  constructor() {
    super(...arguments), this.sim = null, this.version = 0, this._data = null, this._error = "", this._loadedAt = 0, this._loadedFor = null;
  }
  willUpdate() {
    const t = this.sim || this.plant, e = Date.now() - this._loadedAt;
    (t !== this._loadedFor || e > (this.sim ? sn : en)) && (this._loadedFor = t, this._loadedAt = Date.now(), this._load());
  }
  async _load() {
    try {
      this._error = "", this.sim ? this._data = Di(this.sim) : this.hass && !this.hass.__standalone && (this._data = await Ai(this.hass, this.plant));
    } catch (t) {
      this._error = t?.message || String(t);
    }
  }
  _live() {
    const t = As(this.plant, this.src), e = 62, s = 2 * Math.PI * e, n = t ? Math.min(1, t.cop / 7) : 0, i = t ? Et[t.ampel] : "var(--cp-muted)";
    return u`<div class="card live">
      <div class="cap">${l("eff.live")}</div>
      <div class="gauge">
        <svg viewBox="0 0 160 160">
          <circle cx="80" cy="80" r=${e} class="track" />
          ${v`<circle cx="80" cy="80" r=${e} class="bar" style="stroke:${i};stroke-dasharray:${s * n} ${s}" />`}
        </svg>
        <div class="gv">
          <span class="big" style="color:${i}">${t ? P(t.cop, 1) : "–"}</span>
          <span class="muted">COP</span>
        </div>
      </div>
      ${t ? u`<div class="lv-row"><span>${l("eff.expected", { out: P(t.tOut, 0), flow: P(t.tFlow, 0) })}</span><b>${P(t.expected, 1)}</b></div>
            <div class="lv-row"><span>${l("eff.ratio")}</span><b style="color:${i}">${P(t.ratio * 100, 0)} %</b></div>
            <div class="verdict" style="border-color:${i}">${l(`eff.ampel.${t.ampel}`)}</div>` : u`<p class="muted small">${l("eff.no_live")}</p>`}
    </div>`;
  }
  _tile(t, e, s) {
    const n = kt(e), i = e && e.heat > 0 ? e.heatDhw / e.heat : void 0, o = e && e.el > 0 ? e.aux / e.el : void 0;
    return u`<div class="card tile">
      <div class="cap">${l(`eff.${t}`)} ${s ? u`<span class="est">${l("eff.estimate")}</span>` : g}</div>
      <div class="spf" style="color:${us(n)}">${n !== void 0 ? P(n, 2) : "–"}<small>${t === "today" || t === "yesterday" ? "AZ" : "JAZ"}</small></div>
      <div class="kv"><span>${l("eff.heat")}</span><b>${e ? P(e.heat, e.heat >= 100 ? 0 : 1) : "–"} kWh</b></div>
      <div class="kv"><span>${l("eff.el")}</span><b>${e ? P(e.el, e.el >= 100 ? 0 : 1) : "–"} kWh</b></div>
      <div class="kv"><span>${l("eff.dhw_share")}</span><b>${i !== void 0 ? P(i * 100, 0) + " %" : "–"}</b></div>
      <div class="kv"><span>${l("eff.aux_share")}</span><b>${o !== void 0 ? P(o * 100, 1) + " %" : "–"}</b></div>
    </div>`;
  }
  _chart(t) {
    const e = t.daily.slice(-30);
    if (!e.length) return g;
    const s = 720, n = 200, i = { l: 34, r: 34, t: 10, b: 24 }, o = Math.max(1, ...e.map((m) => Math.max(m.heat, m.el))), r = (s - i.l - i.r) / e.length, c = (m) => i.t + (n - i.t - i.b) * (1 - m / o), p = (m) => i.t + (n - i.t - i.b) * (1 - Math.min(6, m) / 6), h = (m) => new Date(m).toLocaleDateString(si() === "de" ? "de-DE" : "en-GB", { day: "2-digit", month: "2-digit" }), d = e.map((m, f) => {
      const _ = kt(m);
      return _ === void 0 ? null : `${i.l + f * r + r / 2},${p(_)}`;
    }).filter(Boolean).join(" ");
    return u`<div class="card chart">
      <div class="row head"><div class="cap">${l("eff.daily")}</div><span class="spacer"></span>
        <span class="lg"><i style="background:#ff8a3d"></i>${l("eff.heat")}</span>
        <span class="lg"><i style="background:#4d9fff"></i>${l("eff.el")}</span>
        <span class="lg"><i class="dot"></i>AZ</span></div>
      <svg viewBox="0 0 ${s} ${n}" preserveAspectRatio="none">
        ${[0, 0.5, 1].map((m) => v`<line class="grid" x1=${i.l} x2=${s - i.r} y1=${c(o * m)} y2=${c(o * m)} />
          <text class="axis" x=${i.l - 4} y=${c(o * m) + 3} text-anchor="end">${P(o * m, 0)}</text>`)}
        ${[2, 4, 6].map((m) => v`<text class="axis" x=${s - i.r + 4} y=${p(m) + 3}>${m}</text>`)}
        ${e.map((m, f) => {
      const _ = i.l + f * r;
      return v`<g><title>${h(m.day)} · ${P(m.heat, 1)} / ${P(m.el, 1)} kWh · AZ ${kt(m) !== void 0 ? P(kt(m), 2) : "–"}</title>
            <rect x=${_ + r * 0.12} y=${c(m.heat)} width=${r * 0.36} height=${n - i.b - c(m.heat)} rx="2" fill="#ff8a3d" />
            <rect x=${_ + r * 0.5} y=${c(m.el)} width=${r * 0.36} height=${n - i.b - c(m.el)} rx="2" fill="#4d9fff" />
            ${f % 5 === 0 ? v`<text class="axis" x=${_ + r / 2} y=${n - 6} text-anchor="middle">${h(m.day)}</text>` : g}</g>`;
    })}
        ${v`<polyline points=${d} fill="none" stroke="var(--cp-text)" stroke-width="1.5" stroke-dasharray="3 3" />`}
        ${e.map((m, f) => {
      const _ = kt(m);
      return _ === void 0 ? g : v`<circle cx=${i.l + f * r + r / 2} cy=${p(_)} r="3" fill=${us(_)} />`;
    })}
      </svg>
      ${t.estimated.month ? u`<p class="muted small">${l("eff.demo_note")}</p>` : g}
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
      ${this._error ? u`<div class="card err">${this._error}</div>` : g}
      ${t?.missing ? u`<div class="card hint">${l(`eff.missing.${t.missing}`)}</div>` : g}
      ${t ? this._chart(t) : g}
    `;
  }
};
Qt.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  hass: { attribute: !1 },
  sim: { attribute: !1 },
  version: { type: Number },
  _data: { state: !0 },
  _error: { state: !0 }
}, Qt.styles = [
  V,
  W`
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
let De = Qt;
customElements.get("cp-efficiency") || customElements.define("cp-efficiency", De);
const te = class te extends O {
  constructor() {
    super(...arguments), this.isPanel = !1, this._config = { type: "custom:copilot-card" }, this._ctl = new Ss(this, !1);
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
      ${this._ctl.error ? u`<div class="err">${this._ctl.error}</div>` : g}
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
            @scenario=${(n) => this._ctl.scenario(n.detail)}
          ></cp-overview>` : u`<div class="loading">${ve}</div>`}
    </ha-card>`;
  }
};
te.properties = {
  hass: { attribute: !1 },
  isPanel: { type: Boolean },
  _config: { state: !0 }
}, te.styles = [
  zs,
  V,
  W`
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
let Te = te;
const ee = class ee extends O {
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
    const t = this._config, e = (s, n, i) => u`<label class="row">
      <input type="checkbox" .checked=${t[s] ?? i} @change=${(o) => this._set(s, o.target.checked)} />
      ${n}</label>`;
    return u`<div class="ed">
      ${e("show_kpis", l("card.show_kpis"), !0)}
      ${e("show_messages", l("card.show_messages"), !1)}
      ${e("show_demo_controls", l("card.show_demo"), !1)}
      <label class="field">${l("card.height")}
        <input .value=${t.height || ""} placeholder="560px" @change=${(s) => this._set("height", s.target.value.trim())} /></label>
      <p class="hint">${l("card.hint")}</p>
    </div>`;
  }
};
ee.properties = { hass: { attribute: !1 }, _config: { state: !0 } }, ee.styles = [
  V,
  W`
      .ed { display: grid; gap: 10px; color: var(--primary-text-color); }
      .row { display: flex; gap: 8px; align-items: center; font-size: 14px; }
      .field { color: var(--secondary-text-color); }
      input:not([type]) { background: transparent; color: var(--primary-text-color); border-color: var(--divider-color); }
      .hint { font-size: 12px; color: var(--secondary-text-color); margin: 0; }
    `
];
let Pe = ee;
customElements.get("copilot-card") || customElements.define("copilot-card", Te);
customElements.get("copilot-card-editor") || customElements.define("copilot-card-editor", Pe);
const Vt = window;
Vt.customCards = Vt.customCards || [];
Vt.customCards.some((a) => a.type === "copilot-card") || Vt.customCards.push({
  type: "copilot-card",
  name: "COPilot",
  description: "Animated heat pump schematic with live values",
  preview: !1,
  documentationURL: "https://github.com/junky84/copilot"
});
const ms = "copilot.view";
function nn(a) {
  try {
    return localStorage.getItem(a);
  } catch {
    return null;
  }
}
function on(a, t) {
  try {
    localStorage.setItem(a, t);
  } catch {
  }
}
const se = class se extends O {
  constructor() {
    super(), this.narrow = !1, this._ctl = new Ss(this), this._view = "overview", this._sub = "editor", this._toast = "";
    const t = nn(ms);
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
      await this._ctl.save(t), this._showToast(l("saved"));
    } catch (e) {
      this._showToast(e?.message || String(e));
    }
  }
  _showToast(t) {
    this._toast = t, window.setTimeout(() => this._toast = "", 2600);
  }
  _go(t, e) {
    this._view = t, e && (this._sub = e), on(ms, `${this._view}:${this._sub}`);
  }
  _fullscreen() {
    document.fullscreenElement ? document.exitFullscreen() : this.requestFullscreen?.().catch(() => {
    });
  }
  render() {
    const t = this._ctl.plant, e = this._ctl.messages.filter((s) => s.active && (s.level === "warning" || s.level === "error")).length;
    return u`<div class="shell">
      <header>
        ${this.narrow ? u`<button class="ghost icon" title=${l("menu")} @click=${() => this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: !0, composed: !0 }))}>${z("menu")}</button>` : g}
        <div class="brand">${ve}<span>COP<b>ilot</b></span></div>
        <nav>
          ${["overview", "efficiency", "messages", "config"].map(
      (s) => u`<button class="tab ${this._view === s ? "on" : ""}" @click=${() => this._go(s)}>
              ${z(s === "overview" ? "grid" : s === "efficiency" ? "chart" : s === "messages" ? "bell" : "gear")}
              <span class="tl">${l(`nav.${s}`)}</span>
              ${s === "messages" && e ? u`<span class="badge">${e}</span>` : g}
            </button>`
    )}
        </nav>
        <span class="spacer"></span>
        ${t?.settings.demo ? u`<span class="demo-pill">${z("flask")}<span class="tl">${l("demo")}</span></span>` : g}
        <button class="ghost icon" title=${l("fullscreen")} @click=${this._fullscreen}>${z("expand")}</button>
      </header>
      <main>
        ${this._ctl.error ? u`<div class="card err">${this._ctl.error}</div>` : g}
        ${this._ctl.api?.standalone ? u`<div class="note muted">${l("standalone_hint")}</div>` : g}
        ${t ? this._content(t) : u`<div class="loading">${ve}</div>`}
      </main>
      ${this._toast ? u`<div class="toast">${this._toast}</div>` : g}
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
        @scenario=${(i) => this._ctl.scenario(i.detail)}
      ></cp-overview>`;
    if (this._view === "efficiency")
      return u`<cp-efficiency
        .plant=${t}
        .src=${e}
        .hass=${this.hass}
        .sim=${this._ctl.sim}
        .version=${this._ctl.version}
      ></cp-efficiency>`;
    if (this._view === "messages")
      return u`<div class="card pad"><cp-messages
        .messages=${this._ctl.messages}
        ?canClear=${this._ctl.admin && !this._ctl.sim}
        @clear=${() => this._ctl.clearMessages()}
      ></cp-messages></div>`;
    if (!this._ctl.admin) return u`<div class="card">${l("readonly_hint")}</div>`;
    const s = ["wizard", "editor", "mapping", "icons", "settings"], n = (i) => this._save(i.detail);
    return u`
      <div class="subnav">
        ${s.map((i) => u`<button class="sub ${this._sub === i ? "on" : ""}" @click=${() => this._go("config", i)}>${l(`cfg.${i}`)}</button>`)}
      </div>
      <div class="cfg ${this._sub === "editor" ? "fill" : ""}">
        ${this._sub === "wizard" ? u`<cp-wizard .plant=${t} @plant-generated=${async (i) => {
      await this._save(i.detail), this._showToast(l("wz.done")), this._go("config", "editor");
    }}></cp-wizard>` : g}
        ${this._sub === "editor" ? u`<cp-editor .plant=${t} .hass=${this.hass} .src=${e} .icons=${this._ctl.icons} .version=${this._ctl.version} @save=${n}></cp-editor>` : g}
        ${this._sub === "mapping" ? u`<cp-mapping .plant=${t} .hass=${this.hass} .api=${this._ctl.api} @save=${n}></cp-mapping>` : g}
        ${this._sub === "icons" ? u`<cp-icons .plant=${t} .api=${this._ctl.api} .icons=${this._ctl.icons} @save=${n} @icons-changed=${() => this._ctl.loadIcons()}></cp-icons>` : g}
        ${this._sub === "settings" ? u`<cp-settings .plant=${t} .version=${this._ctl.backendVersion} @save=${n}
              @reset-plant=${() => this._save({ ..._e(), settings: { ..._e().settings, demo: !0 } })}></cp-settings>` : g}
      </div>
    `;
  }
};
se.properties = {
  hass: { attribute: !1 },
  narrow: { type: Boolean },
  route: { attribute: !1 },
  panel: { attribute: !1 },
  _view: { state: !0 },
  _sub: { state: !0 },
  _toast: { state: !0 }
}, se.styles = [
  zs,
  V,
  W`
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
let Le = se;
customElements.get("copilot-panel") || customElements.define("copilot-panel", Le);
export {
  Le as CopilotPanel
};
