/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ne = globalThis, _s = ne.ShadowRoot && (ne.ShadyCSS === void 0 || ne.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, vs = Symbol(), Ss = /* @__PURE__ */ new WeakMap();
let ci = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== vs) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (_s && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Ss.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Ss.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Si = (o) => new ci(typeof o == "string" ? o : o + "", void 0, vs), q = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((s, i, n) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[n + 1], o[0]);
  return new ci(e, o, vs);
}, zi = (o, t) => {
  if (_s) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = ne.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, o.appendChild(s);
  }
}, zs = _s ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Si(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ei, defineProperty: Ai, getOwnPropertyDescriptor: Pi, getOwnPropertyNames: Di, getOwnPropertySymbols: Ti, getPrototypeOf: Li } = Object, De = globalThis, Es = De.trustedTypes, Wi = Es ? Es.emptyScript : "", Ci = De.reactiveElementPolyfillSupport, jt = (o, t) => o, Fe = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? Wi : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let e = o;
  switch (t) {
    case Boolean:
      e = o !== null;
      break;
    case Number:
      e = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(o);
      } catch {
        e = null;
      }
  }
  return e;
} }, pi = (o, t) => !Ei(o, t), As = { attribute: !0, type: String, converter: Fe, reflect: !1, useDefault: !1, hasChanged: pi };
Symbol.metadata ??= Symbol("metadata"), De.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let At = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = As) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Ai(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = Pi(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: i, set(a) {
      const r = i?.call(this);
      n?.call(this, a), this.requestUpdate(t, r, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? As;
  }
  static _$Ei() {
    if (this.hasOwnProperty(jt("elementProperties"))) return;
    const t = Li(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(jt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(jt("properties"))) {
      const e = this.properties, s = [...Di(e), ...Ti(e)];
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
      for (const i of s) e.unshift(zs(i));
    } else t !== void 0 && e.push(zs(t));
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
    return zi(t, this.constructor.elementStyles), t;
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
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : Fe).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Fe;
      this._$Em = i;
      const r = a.fromAttribute(e, n.type);
      this[i] = r ?? this._$Ej?.get(i) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (n = this[t]), s ??= a.getPropertyOptions(t), !((s.hasChanged ?? pi)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: n }, a) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), n !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        const { wrapped: a } = n, r = this[i];
        a !== !0 || this._$AL.has(i) || r === void 0 || this.C(i, void 0, n, r);
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
At.elementStyles = [], At.shadowRootOptions = { mode: "open" }, At[jt("elementProperties")] = /* @__PURE__ */ new Map(), At[jt("finalized")] = /* @__PURE__ */ new Map(), Ci?.({ ReactiveElement: At }), (De.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ws = globalThis, Ps = (o) => o, ce = ws.trustedTypes, Ds = ce ? ce.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, di = "$lit$", _t = `lit$${Math.random().toFixed(9).slice(2)}$`, hi = "?" + _t, Oi = `<${hi}>`, Mt = document, Ut = () => Mt.createComment(""), Zt = (o) => o === null || typeof o != "object" && typeof o != "function", ys = Array.isArray, Hi = (o) => ys(o) || typeof o?.[Symbol.iterator] == "function", Ce = `[ 	
\f\r]`, Ot = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ts = /-->/g, Ls = />/g, wt = RegExp(`>|${Ce}(?:([^\\s"'>=/]+)(${Ce}*=${Ce}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ws = /'/g, Cs = /"/g, ui = /^(?:script|style|textarea|title)$/i, mi = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), f = mi(1), $ = mi(2), Tt = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), Os = /* @__PURE__ */ new WeakMap(), bt = Mt.createTreeWalker(Mt, 129);
function fi(o, t) {
  if (!ys(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ds !== void 0 ? Ds.createHTML(t) : t;
}
const Ri = (o, t) => {
  const e = o.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = Ot;
  for (let r = 0; r < e; r++) {
    const l = o[r];
    let d, u, p = -1, h = 0;
    for (; h < l.length && (a.lastIndex = h, u = a.exec(l), u !== null); ) h = a.lastIndex, a === Ot ? u[1] === "!--" ? a = Ts : u[1] !== void 0 ? a = Ls : u[2] !== void 0 ? (ui.test(u[2]) && (i = RegExp("</" + u[2], "g")), a = wt) : u[3] !== void 0 && (a = wt) : a === wt ? u[0] === ">" ? (a = i ?? Ot, p = -1) : u[1] === void 0 ? p = -2 : (p = a.lastIndex - u[2].length, d = u[1], a = u[3] === void 0 ? wt : u[3] === '"' ? Cs : Ws) : a === Cs || a === Ws ? a = wt : a === Ts || a === Ls ? a = Ot : (a = wt, i = void 0);
    const m = a === wt && o[r + 1].startsWith("/>") ? " " : "";
    n += a === Ot ? l + Oi : p >= 0 ? (s.push(d), l.slice(0, p) + di + l.slice(p) + _t + m) : l + _t + (p === -2 ? r : m);
  }
  return [fi(o, n + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Yt {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, a = 0;
    const r = t.length - 1, l = this.parts, [d, u] = Ri(t, e);
    if (this.el = Yt.createElement(d, s), bt.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = bt.nextNode()) !== null && l.length < r; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(di)) {
          const h = u[a++], m = i.getAttribute(p).split(_t), g = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: n, name: g[2], strings: m, ctor: g[1] === "." ? Vi : g[1] === "?" ? Ii : g[1] === "@" ? Ni : Te }), i.removeAttribute(p);
        } else p.startsWith(_t) && (l.push({ type: 6, index: n }), i.removeAttribute(p));
        if (ui.test(i.tagName)) {
          const p = i.textContent.split(_t), h = p.length - 1;
          if (h > 0) {
            i.textContent = ce ? ce.emptyScript : "";
            for (let m = 0; m < h; m++) i.append(p[m], Ut()), bt.nextNode(), l.push({ type: 2, index: ++n });
            i.append(p[h], Ut());
          }
        }
      } else if (i.nodeType === 8) if (i.data === hi) l.push({ type: 2, index: n });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(_t, p + 1)) !== -1; ) l.push({ type: 7, index: n }), p += _t.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = Mt.createElement("template");
    return s.innerHTML = t, s;
  }
}
function Lt(o, t, e = o, s) {
  if (t === Tt) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = Zt(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(o), i._$AT(o, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = Lt(o, i._$AS(o, t.values), i, s)), t;
}
class Bi {
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
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? Mt).importNode(e, !0);
    bt.currentNode = i;
    let n = bt.nextNode(), a = 0, r = 0, l = s[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new qt(n, n.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (d = new Ki(n, this, t)), this._$AV.push(d), l = s[++r];
      }
      a !== l?.index && (n = bt.nextNode(), a++);
    }
    return bt.currentNode = Mt, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class qt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    t = Lt(this, t, e), Zt(t) ? t === v || t == null || t === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : t !== this._$AH && t !== Tt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Hi(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== v && Zt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Mt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Yt.createElement(fi(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const n = new Bi(i, this), a = n.u(this.options);
      n.p(e), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = Os.get(t.strings);
    return e === void 0 && Os.set(t.strings, e = new Yt(t)), e;
  }
  k(t) {
    ys(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new qt(this.O(Ut()), this.O(Ut()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = Ps(t).nextSibling;
      Ps(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
let Te = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = v;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) t = Lt(this, t, e, 0), a = !Zt(t) || t !== this._$AH && t !== Tt, a && (this._$AH = t);
    else {
      const r = t;
      let l, d;
      for (t = n[0], l = 0; l < n.length - 1; l++) d = Lt(this, r[s + l], e, l), d === Tt && (d = this._$AH[l]), a ||= !Zt(d) || d !== this._$AH[l], d === v ? t = v : t !== v && (t += (d ?? "") + n[l + 1]), this._$AH[l] = d;
    }
    a && !i && this.j(t);
  }
  j(t) {
    t === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
};
class Vi extends Te {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === v ? void 0 : t;
  }
}
class Ii extends Te {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== v);
  }
}
class Ni extends Te {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = Lt(this, t, e, 0) ?? v) === Tt) return;
    const s = this._$AH, i = t === v && s !== v || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== v && (s === v || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ki {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Lt(this, t);
  }
}
const ji = ws.litHtmlPolyfillSupport;
ji?.(Yt, qt), (ws.litHtmlVersions ??= []).push("3.3.3");
const Fi = (o, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = e?.renderBefore ?? null;
    s._$litPart$ = i = new qt(t.insertBefore(Ut(), n), n, void 0, e ?? {});
  }
  return i._$AI(o), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bs = globalThis;
class Y extends At {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Fi(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Tt;
  }
}
Y._$litElement$ = !0, Y.finalized = !0, bs.litElementHydrateSupport?.({ LitElement: Y });
const Ui = bs.litElementPolyfillSupport;
Ui?.({ LitElement: Y });
(bs.litElementVersions ??= []).push("4.2.2");
const Hs = "copilot.standalone.plant", Ht = "copilot.standalone.icons";
function Jt(o, t) {
  try {
    const e = localStorage.getItem(o);
    return e ? JSON.parse(e) : t;
  } catch {
    return t;
  }
}
function Oe(o, t) {
  try {
    localStorage.setItem(o, JSON.stringify(t));
  } catch {
  }
}
class Zi {
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
    return this.standalone ? { version: "demo", plant: Jt(Hs, null), options: {}, is_admin: !0 } : this.hass.callWS({ type: "copilot/config/get" });
  }
  async saveConfig(t) {
    if (this.standalone) return Oe(Hs, t);
    await this.hass.callWS({ type: "copilot/config/save", plant: t });
  }
  async scan(t) {
    return this.standalone ? { source: "ems_esp", entity_count: 0, entities: [], suggestions: [] } : this.hass.callWS({ type: "copilot/mapping/scan", source: "ems_esp", plant: t });
  }
  async listIcons() {
    return this.standalone ? Jt(Ht, []) : (await this.hass.callWS({ type: "copilot/icons/list" })).icons;
  }
  async uploadIcon(t, e, s, i) {
    if (this.standalone) {
      const n = Jt(Ht, []), a = { id: Math.random().toString(16).slice(2, 14), name: t, mime: e, iso: i, size: s.length, data_url: `data:${e};base64,${s}` };
      return n.push(a), Oe(Ht, n), a;
    }
    return (await this.hass.callWS({ type: "copilot/icons/upload", name: t, mime: e, data: s, iso: i })).icon;
  }
  async deleteIcon(t) {
    if (this.standalone) return Oe(Ht, Jt(Ht, []).filter((e) => e.id !== t));
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
const Yi = {
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
  "st.style.iso": "Isometrisch 2.5D (ab v0.2)",
  "st.demo": "Demo-Modus",
  "st.demo_hint": "Zeigt simulierte Werte mit laufenden Animationen – ideal, solange die Anlage noch nicht angeschlossen ist.",
  "st.language": "Sprache",
  "st.lang.auto": "Wie Home Assistant",
  "st.version": "Version",
  "st.reset": "Anlage zurücksetzen",
  "st.reset_confirm": "Komplette Anlage löschen und mit der Beispielanlage neu starten?"
}, Gi = {
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
  "st.style.iso": "Isometric 2.5D (from v0.2)",
  "st.demo": "Demo mode",
  "st.demo_hint": "Shows simulated values with running animations – ideal while the plant is not connected yet.",
  "st.language": "Language",
  "st.lang.auto": "Same as Home Assistant",
  "st.version": "Version",
  "st.reset": "Reset plant",
  "st.reset_confirm": "Delete the whole plant and start over with the example plant?"
}, Rs = { de: Yi, en: Gi };
let St = "de";
function Bs(o) {
  St = o;
}
function qi() {
  return St;
}
function Vs(o, t) {
  return o === "de" || o === "en" ? o : (t || "de").toLowerCase().startsWith("de") ? "de" : "en";
}
function c(o, t) {
  let e = Rs[St][o] ?? Rs.de[o] ?? o;
  return t && (e = e.replace(/\{(\w+)\}/g, (s, i) => {
    const n = t[i];
    return typeof n == "number" ? I(n, Number.isInteger(n) ? 0 : 1) : n == null ? "" : String(n);
  })), e;
}
function I(o, t = 1) {
  return o.toLocaleString(St === "de" ? "de-DE" : "en-GB", {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  });
}
function gi(o) {
  return new Date(o * 1e3).toLocaleTimeString(St === "de" ? "de-DE" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function Ji(o) {
  const t = new Date(o * 1e3), e = /* @__PURE__ */ new Date();
  return t.toDateString() === e.toDateString() ? gi(o) : t.toLocaleString(St === "de" ? "de-DE" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function Xi(o) {
  const t = Math.round(o / 60);
  return t < 60 ? `${t} min` : `${Math.floor(t / 60)} h ${t % 60} min`;
}
const Qi = {
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
}, Is = { supply_temp: "F", return_temp: "R", flow_temp: "F", target_flow_temp: "Set", room_temp: "Room", dhw_temp: "DHW", dhw_setpoint: "Set" };
function Ns(o, t) {
  return St === "en" && t in Is ? Is[t] : Qi[t] ?? "";
}
function $t(o, t) {
  const e = `slot.${o}.${t}`, s = c(e);
  return s === e ? c(`slot.${t}`) : s;
}
const z = 20, j = (o, t = !1) => ({ key: o, kind: "temp", show: t }), Z = {
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
      { key: "outdoor_temp", kind: "temp", show: !0, pos: [7.6, 1.2] },
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
        pos: { pressure: [1.3, 7.6], aux_level: [5.9, 4.2], pc0_speed: [4.3, 11.4] },
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
      j("target_flow_temp"),
      { key: "room_temp", kind: "temp", show: !0, pos: [3.5, -0.9] },
      j("room_setpoint"),
      { key: "mode", kind: "enum" },
      { key: "summer_mode", kind: "enum" },
      { key: "operating_state", kind: "enum" },
      j("design_temp"),
      { key: "offset_temp", kind: "temp" },
      j("min_flow_temp"),
      j("max_flow_temp"),
      j("min_ext_temp"),
      j("heating_limit")
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
    slots: [{ key: "flow", kind: "flow_lmin", show: !0, pos: [1.5, -0.9] }, j("temp")]
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
Z.floor_heating.slots = Z.radiators.slots;
function vt(o) {
  return o.type === "value_tile" ? (o.props.entries || []).map((t) => ({
    key: t.slot,
    kind: t.kind || "text",
    show: !0
  })) : Z[o.type].slots;
}
function Ct(o) {
  const t = Z[o.type];
  if (!t.variants) return;
  const e = o.props?.variant || Gt(o.model)?.variant || "wall_e";
  return t.variants[e] || Object.values(t.variants)[0];
}
function Wt(o) {
  const t = Ct(o);
  return t ? { w: t.w, h: t.h } : { w: Z[o.type].w, h: Z[o.type].h };
}
function oe(o) {
  return Ct(o)?.ports ?? Z[o.type].ports;
}
function Ks(o) {
  return Ct(o)?.badges ?? Z[o.type].badges;
}
function js(o) {
  const t = Ct(o);
  return vt(o).map((e) => t ? { ...e, pos: t.pos?.[e.key] ?? e.pos, at: t.at?.[e.key] ?? e.at } : e);
}
function pt(o) {
  const t = { ...Z[o.type], ...Wt(o) };
  if (o.type === "value_tile") {
    const s = (o.props.entries || []).length;
    return { w: t.w, h: 2 + Math.ceil(s * 1.3) };
  }
  const e = o.rot || 0;
  return e === 90 || e === 270 ? { w: t.h, h: t.w } : { w: t.w, h: t.h };
}
const Fs = ["r", "b", "l", "t"];
function tn(o, t) {
  const e = t / 90 % 4;
  return Fs[(Fs.indexOf(o) + e) % 4];
}
function dt(o, t) {
  const e = oe(o).find((d) => d.id === t);
  if (!e) return null;
  const s = o.rot || 0, { w: i, h: n } = Wt(o);
  let { x: a, y: r } = e, l = e.dir;
  return o.flip && Z[o.type].mirrorable && (a = i - a, l = l === "l" ? "r" : l === "r" ? "l" : l), s === 90 ? [a, r] = [n - r, a] : s === 180 ? [a, r] = [i - a, n - r] : s === 270 && ([a, r] = [r, i - a]), { x: o.x + a, y: o.y + r, dir: tn(l, s), def: e };
}
const pe = [
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
], en = { "buderus-wsw": "buderus-wsw186i" }, $s = [
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
], sn = {
  "buderus-wlw186i-t": "buderus-wlw186i-t180",
  "buderus-wlw186i-b": "buderus-wlw186i-e",
  "bosch-aw-b": "bosch-aw-e"
};
function Gt(o) {
  const t = o && sn[o] || o;
  return $s.find((e) => e.id === t);
}
function xs(o) {
  const t = o && en[o] || o;
  return pe.find((e) => e.id === t) || pe.find((e) => e.id === "generic-air");
}
const _i = /* @__PURE__ */ new Set(["on", "true", "1", "yes", "ja", "ein", "an", "active", "aktiv", "open", "offen"]);
function F(o) {
  return !o || !o.available || o.raw === null ? !1 : typeof o.raw == "boolean" ? o.raw : o.num !== null ? o.num > 0 : _i.has(String(o.raw).trim().toLowerCase());
}
const nn = {
  off: ["off", "aus", "uit", "av", "arrêt", "standby", "bereit"],
  heating: ["heating", "heizen", "verwarmen", "uppvärmning", "chauffage", "ogrzewanie", "riscaldamento"],
  cooling: ["cooling", "kühlen", "koelen", "kyler", "refroidissement", "chłodzenie", "raffreddamento"],
  hot_water: ["hot water", "hot_water", "warmwasser", "warm water", "varmvatten", "eau chaude", "c.w.u.", "acqua calda"],
  pool_heating: ["pool heating", "pool beheizen", "zwembadverwarming", "chauffage piscine"],
  pool: ["pool", "zwembad", "piscine", "basen", "piscina"],
  defrost: ["defrost", "abtauen", "ontdooien", "avfrostning", "dégivrage", "odladzanie", "scongelamento"],
  compressor_alarm: ["compressor alarm", "compressor_alarm", "kompressor alarm", "kompressoralarm"]
};
function Le(o) {
  if (!o || !o.available || o.raw === null) return;
  const t = String(o.raw).trim().toLowerCase();
  for (const [e, s] of Object.entries(nn)) if (s.includes(t)) return e;
  return t.includes("abtau") || t.includes("defrost") ? "defrost" : t;
}
function on(o, t, e) {
  if (o === void 0 || o === "unavailable" || o === "unknown" || o === "")
    return { raw: null, num: null, unit: t, entity: e, available: !1 };
  const s = Number(o);
  return { raw: o, num: Number.isFinite(s) ? s : null, unit: t, entity: e, available: !0 };
}
class an {
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
    return on(e?.state, e?.attributes?.unit_of_measurement, t);
  }
  async history(t, e, s) {
    const i = this.entityOf(t, e);
    return i ? rn(this.hass, i, s) : [];
  }
}
async function rn(o, t, e) {
  const s = /* @__PURE__ */ new Date(), i = new Date(s.getTime() - e * 36e5);
  return ((await o.callWS({
    type: "history/history_during_period",
    start_time: i.toISOString(),
    end_time: s.toISOString(),
    entity_ids: [t],
    minimal_response: !0,
    no_attributes: !0,
    significant_changes_only: !1
  }))[t] || []).map((r) => {
    const l = String(r.s).toLowerCase();
    let d = Number(r.s);
    return Number.isFinite(d) || (d = _i.has(l) ? 1 : l === "off" || l === "false" ? 0 : null), { t: r.lu, v: d, raw: String(r.s) };
  });
}
function Ue(o, t) {
  const e = /* @__PURE__ */ new Set(), s = (i) => t.get(o, i);
  switch (o.type) {
    case "pump":
    case "mixer":
      (F(s("running")) || F(s("speed")) || F(s("flow"))) && e.add("running"), o.type === "mixer" && F(s("position")) && e.add("running");
      break;
    case "valve_3way": {
      const i = s("position");
      e.add(F(i) ? "b" : "a");
      break;
    }
    case "outdoor_unit": {
      const i = Le(s("activity"));
      (F(s("compressor_on")) || F(s("compressor_speed")) || F(s("heat_power"))) && e.add("running"), i === "defrost" && e.add("defrost"), i === "compressor_alarm" && e.add("alarm"), i && i !== "off" && i !== "compressor_alarm" && e.add("running"), i && e.add(`mode_${i}`);
      break;
    }
    case "indoor_unit": {
      (F(s("aux_level")) || F(s("aux_step1")) || F(s("aux_step2")) || F(s("aux_step3"))) && e.add("aux"), (F(s("pc0_running")) || F(s("pc0_speed")) || F(s("flow"))) && e.add("running"), e.add(F(s("vw1_position")) || !o.bindings.vw1_position && F(s("dhw_active")) && !F(s("heating_active")) ? "b" : "a"), (F(s("pc1_running")) || F(s("pc1_speed"))) && e.add("pc1"), F(s("dhw_charging")) && e.add("charging");
      const i = F(s("dhw_active")) || e.has("running") && e.has("b") ? "hot_water" : F(s("heating_active")) || e.has("running") ? "heating" : "off";
      e.add(`mode_${i}`);
      break;
    }
    case "dhw_tank":
      F(s("charging")) && e.add("charging"), F(s("disinfecting")) && e.add("disinfecting");
      break;
    case "tap":
      F(s("flow")) && e.add("flowing");
      break;
    case "radiators":
    case "floor_heating":
      e.add("on");
      break;
  }
  return e;
}
function Us(o, t) {
  const e = t.get(o.c);
  return e ? o.s.startsWith("!") ? !e.has(o.s.slice(1)) : e.has(o.s) : !1;
}
function ln(o, t) {
  const e = o.flow || [], s = o.flowAny || [];
  return e.length === 0 && s.length === 0 ? !1 : e.every((i) => Us(i, t)) && (s.length === 0 || s.some((i) => Us(i, t)));
}
function cn(o, t) {
  const e = new Map(o.components.map((n) => [n.id, n])), s = /* @__PURE__ */ new Map(), i = (n) => {
    const a = e.get(n.c);
    if (!a) return;
    const r = dt(a, n.p);
    if (r) {
      if (r.def.fixedTemp !== void 0) return r.def.fixedTemp;
      if (r.def.tempSlot) {
        const l = t.get(a, r.def.tempSlot);
        if (l?.available && l.num !== null) return l.num;
      }
    }
  };
  for (const n of o.pipes) {
    if (n.bindings?.temp) {
      const r = t.getEntity(n.bindings.temp);
      if (r?.available && r.num !== null) {
        s.set(n.id, r.num);
        continue;
      }
    }
    const a = i(n.from);
    a !== void 0 && s.set(n.id, a);
  }
  for (let n = 0; n < 6; n++) {
    let a = !1;
    for (const r of o.pipes) {
      if (s.has(r.id)) continue;
      const l = e.get(r.from.c);
      if (l && Z[l.type].passive) {
        const d = o.pipes.find((u) => u.to.c === l.id && s.has(u.id));
        if (d) {
          s.set(r.id, s.get(d.id)), a = !0;
          continue;
        }
      }
      if (n === 5 || !l || !Z[l.type].passive) {
        const d = i(r.to);
        d !== void 0 && (s.set(r.id, d), a = !0);
      }
    }
    if (!a && n > 0) break;
  }
  return s;
}
const pn = {
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
function It(o, t) {
  return vt(o).find((e) => e.key === t)?.kind || "text";
}
function yt(o, t) {
  if (!o) return { text: c("none"), unit: "" };
  if (!o.available) return { text: c("none"), unit: "" };
  if (t === "bool") return { text: F(o) ? c("on") : c("off"), unit: "" };
  if (t === "enum" && o.num === null) {
    const a = `mode.${Le(o)}`, r = c(a);
    return { text: r === a ? String(o.raw) : r, unit: "" };
  }
  let e = o.unit ?? pn[t] ?? "";
  if (o.num === null) return { text: String(o.raw), unit: "" };
  let s = o.num;
  t === "power_w" && e === "W" && Math.abs(s) >= 1e3 && (s = s / 1e3, e = "kW");
  const i = t === "count" || t === "percent" || t === "flow" || t === "duration" || t === "power_w" && e === "W" || t === "energy" && s >= 100 ? 0 : 1;
  return { text: I(s, i), unit: e };
}
function tt(o, t) {
  if (o === void 0 || Number.isNaN(o)) return t;
  const e = [
    [5, [43, 108, 255]],
    [20, [34, 195, 230]],
    [28, [61, 220, 151]],
    [36, [245, 197, 66]],
    [44, [255, 138, 61]],
    [54, [255, 77, 77]],
    [65, [224, 33, 122]]
  ];
  if (o <= e[0][0]) return ae(e[0][1]);
  for (let s = 1; s < e.length; s++) {
    const [i, n] = e[s], [a, r] = e[s - 1];
    if (o <= i) {
      const l = (o - a) / (i - a);
      return ae([0, 1, 2].map((d) => r[d] + (n[d] - r[d]) * l));
    }
  }
  return ae(e[e.length - 1][1]);
}
function ae(o) {
  return `rgb(${o.map((t) => Math.round(t)).join(",")})`;
}
function dn(o, t) {
  const e = (i, n, a) => ae([0, 1, 2].map((r) => i[r] + (n[r] - i[r]) * Math.max(0, Math.min(1, a)))), s = (i, n) => t === void 0 ? 0.5 : (t - i) / (n - i);
  switch (o) {
    case "supply":
      return e([245, 176, 66], [255, 64, 64], s(25, 55));
    case "return":
      return e([46, 110, 255], [77, 208, 255], s(20, 45));
    case "dhw_hot":
      return e([255, 128, 170], [255, 46, 120], s(35, 60));
    case "dhw_cold":
      return "rgb(110, 205, 255)";
    case "circulation":
      return e([150, 120, 255], [196, 120, 255], s(35, 55));
    default:
      return tt(t, "#8a97a6");
  }
}
function vi(o, t = -12) {
  return {
    design: o ? 35 : 50,
    minExt: t,
    offset: 0,
    roomSet: 21,
    minFlow: o ? 22 : 25,
    maxFlow: o ? 40 : 55,
    limit: 16,
    exponent: o ? 1.1 : 1.3
  };
}
function Nt(o, t) {
  if (t >= o.limit) return null;
  const e = Math.max(1, o.roomSet - o.minExt), s = Math.max(0, (o.roomSet - t) / e), i = o.roomSet + (o.design - o.roomSet) * Math.pow(s, 1 / o.exponent);
  return Math.max(o.minFlow, Math.min(o.maxFlow, i + o.offset));
}
function hn(o, t) {
  const e = o.exponent > 1.2 ? 2.5 : 1.5, s = (o.roomSet - t) * e;
  return Math.round(s * 2) / 2;
}
const un = {
  nominal: 7.1,
  source: "air",
  bufferL: 120,
  dhwL: 274,
  auxKw: 6,
  heatLoad: 6.2,
  designTemp: -12,
  floor: !1
}, zt = 4.186 / 3600, Zs = 10, He = 21, mn = 10, fn = [
  // hour of day, minutes, litres per minute (mixed at 40 °C)
  [6.5, 7, 9],
  [6.85, 6, 9],
  [7.2, 5, 8],
  [12.25, 2, 4],
  [18.6, 3, 5],
  [20.4, 8, 9],
  [21.1, 6, 9]
], gn = [
  [6, 7.5],
  [11.5, 12.5],
  [17.5, 19]
];
class _n {
  constructor(t = {}, e = Date.now() / 1e3, s) {
    this.speed = 60, this.outdoorMean = 2, this.dailySwing = 2.5, this.tOut = 2, this.tRoom = 20.8, this.bufTop = 38, this.bufBot = 33, this.dhwTop = 49, this.dhwBot = 43, this.tVl = 30, this.tRl = 28, this.tVlHc = 38, this.tRlHc = 32, this.mode = "off", this.pTh = 0, this.pEl = 0, this.cop = 0, this.running = !1, this.lastStart = -1e9, this.lastStop = -1e9, this.pc0Overrun = 0, this.ice = 0.3, this.defrostLeft = 0, this.aux = 0, this.auxTimer = 0, this.heatDemand = !1, this.dhwDemand = !1, this.tapFlow = 0, this.tapLeft = 0, this.qEmit = 0, this.starts = 0, this.e = { el: 0, heat: 0, elHeat: 0, elDhw: 0, heatHeat: 0, heatDhw: 0, aux: 0 }, this.dim14a = !1, this.pv = !1, this.disinfect = !1, this.fault = !1, this.lastDrawDay = /* @__PURE__ */ new Map(), this.days = /* @__PURE__ */ new Map(), this.sampleAcc = 0, this.hist = /* @__PURE__ */ new Map(), this.active = /* @__PURE__ */ new Map(), this.messages = [], this.labels = { dhw: "WW" }, this.listeners = [], this.p = { ...un, ...t }, this.curve = vi(this.p.floor, this.p.designTemp), s && (this.labels = { ...this.labels, ...s }), this.time = e - 24 * 3600, this.prefill(e);
  }
  prefill(t) {
    const e = this.listeners;
    for (this.listeners = []; this.time < t; ) this.step(Zs);
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
      const i = Math.min(Zs, e);
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
    const t = this.pv ? 5 : 0;
    return (Nt(this.curve, this.tOut) ?? this.curve.minFlow) + t;
  }
  dhwSetpoint() {
    return this.disinfect ? 60 : this.pv ? 55 : 50;
  }
  step(t) {
    this.time += t;
    const e = this.hour(), s = t / 3600, i = this.p, n = this.outdoorMean + this.dailySwing * Math.cos((e - 15) / 24 * 2 * Math.PI);
    this.tOut += (n - this.tOut) * Math.min(1, t / 1800);
    const a = this.tOut < this.curve.limit, r = this.curveSetpoint(), l = a ? 650 * zt * 3600 / 3600 : 0, d = i.heatLoad * (i.floor, 1), u = i.floor ? 30 - He : 45 - He, p = i.floor ? 1.1 : 1.3;
    let h = 0;
    if (this.tVlHc = this.bufTop, l > 0) {
      let U = this.tVlHc - 3;
      for (let ht = 0; ht < 4; ht++)
        h = d * Math.pow(Math.max(0, (U - this.tRoom) / u), p), U = this.tVlHc - h / (2 * l);
      h *= Math.max(0.1, Math.min(1, 1 - (this.tRoom - this.curve.roomSet - 0.2) * 1.5)), this.tRlHc = this.tVlHc - h / l;
    } else
      this.tRlHc = this.bufBot;
    this.qEmit = h;
    const m = i.heatLoad / (He - i.designTemp);
    this.tRoom += (h - m * (this.tRoom - this.tOut) + 0.35) * s / 9;
    const g = Math.floor(this.time / 86400);
    fn.forEach(([U, ht, Mi], Ms) => {
      e >= U && e < U + 0.1 && this.lastDrawDay.get(Ms) !== g && (this.lastDrawDay.set(Ms, g), this.startDraw(ht, Mi));
    }), this.tapLeft > 0 && (this.tapLeft -= t, this.tapLeft <= 0 && (this.tapFlow = 0));
    const _ = gn.some(([U, ht]) => e >= U && e < ht), y = i.dhwL / 2 * zt, b = this.tapFlow * 60 * zt * (40 - mn), k = 1.38 / 24 / 2 + (_ ? 0.12 : 0) / 2;
    this.dhwTop -= (b * 0.35 + k) * s / y, this.dhwBot -= (b * 0.65 + k) * s / y;
    const M = this.dhwSetpoint();
    (this.dhwTop < M - 5 || this.dhwBot < M - 14 || this.disinfect && this.dhwBot < 59) && (this.dhwDemand = !0), this.dhwBot >= M - 0.5 && this.dhwTop >= M - 0.5 && (this.dhwDemand = !1, this.disinfect && (this.disinfect = !1, this.condition("dis", !1, "info", "dhw_disinfection", {}, "dhw"))), a && this.bufTop < r - 2 && (this.heatDemand = !0);
    const E = this.time - this.lastStart > 600;
    (!a || this.bufTop > r + 2.5 && E) && (this.heatDemand = !1);
    let T = this.fault ? "compressor_alarm" : this.dhwDemand ? "hot_water" : this.heatDemand ? "heating" : "off";
    this.defrostLeft > 0 && !this.fault && (T = "defrost");
    const R = T === "heating" || T === "hot_water" || T === "defrost";
    R && !this.running ? this.time - this.lastStop >= 480 || T === "defrost" ? (this.running = !0, this.lastStart = this.time, this.starts++, this.pTh = this.pMin()) : T = "off" : !R && this.running && (this.time - this.lastStart > 600 || this.fault ? (this.running = !1, this.lastStop = this.time, this.pc0Overrun = 180) : T = this.mode === "hot_water" ? "hot_water" : "heating"), this.mode = this.running ? T : this.fault ? "compressor_alarm" : "off";
    const G = this.pMax(), et = this.pMin();
    let A = 0;
    if (this.running && this.mode === "heating" ? A = this.qEmit + 2.2 * (r + 1 - this.bufTop) : this.running && this.mode === "hot_water" && (A = Math.min(G * 0.9, Math.max(et, (60 - this.dhwBot - 3) * 0.9))), this.running && this.mode !== "defrost") {
      A = Math.max(et, Math.min(G, A)), this.pTh < et && (this.pTh = et);
      const U = 0.5 * (t / 60);
      this.pTh += Math.max(-U * 2, Math.min(U, A - this.pTh));
    } else this.mode === "defrost" ? this.pTh = -3 : this.pTh = 0;
    let D = 0;
    this.dim14a || (this.fault && a ? D = i.auxKw : this.mode === "heating" && this.bufTop < r - 5 && this.pTh >= G * 0.95 ? (this.auxTimer += t, this.auxTimer > 1200 && (D = Math.min(i.auxKw, 3))) : this.auxTimer = 0, this.tOut < i.designTemp + 2 && this.mode === "heating" && (D = Math.max(D, Math.min(i.auxKw, 3))), this.disinfect && this.mode === "hot_water" && this.dhwBot > 52 && (D = Math.min(i.auxKw, 3))), this.fault && a && D > 0 && (this.heatDemand = !0), this.aux = D;
    const N = this.running || this.pc0Overrun > 0 || this.fault && this.aux > 0;
    !this.running && this.pc0Overrun > 0 && (this.pc0Overrun -= t);
    const K = N ? 1100 * zt : 0, C = this.mode === "hot_water", P = (this.running ? this.pTh : 0) + this.aux;
    C ? this.tRl = this.dhwBot + 2 : this.tRl = N ? this.bufBot : this.tRl + (22 - this.tRl) * Math.min(1, t / 3600), this.tVl = K > 0 ? this.tRl + P / K : this.tVl + (this.tRl - this.tVl) * Math.min(1, t / 600);
    const S = (i.bufferL + 60) / 2 * zt, L = C ? 0 : K, O = 0.05 / 2, W = L * (this.tVl - this.bufTop) + (l > L ? (l - L) * (this.bufBot - this.bufTop) : 0) - O, H = l * (this.tRlHc - this.bufBot) + (L > l ? (L - l) * (this.bufTop - this.bufBot) : 0) - O;
    if (this.bufTop += W * s / S, this.bufBot += H * s / S, this.bufBot > this.bufTop) {
      const U = (this.bufBot + this.bufTop) / 2;
      this.bufBot = this.bufTop = U;
    }
    if (C && (this.dhwBot += P * s / y, this.dhwBot > this.dhwTop)) {
      const U = (this.dhwBot + this.dhwTop) / 2;
      this.dhwBot = this.dhwTop = U;
    }
    if (this.running && this.mode !== "defrost") {
      const U = this.tVl + 273.15 + 3, ht = (this.p.source === "air" ? this.tOut - 6 : 0) + 273.15;
      this.cop = Math.max(1.4, Math.min(7.5, 0.57 * U / Math.max(5, U - ht))), this.pEl = this.pTh / this.cop + 0.06;
    } else this.mode === "defrost" ? (this.cop = 0, this.pEl = 1.1) : (this.cop = 0, this.pEl = 0.012 + (N ? 0.03 : 0));
    const J = Math.max(0, this.running ? this.pTh : 0);
    this.e.el += (this.pEl + this.aux) * s, this.e.aux += this.aux * s, this.e.heat += (J + this.aux) * s;
    const X = new Date(this.time * 1e3), nt = new Date(X.getFullYear(), X.getMonth(), X.getDate()).getTime();
    let st = this.days.get(nt);
    if (!st) {
      this.days.set(nt, st = { heat: 0, el: 0, heatDhw: 0, elDhw: 0, aux: 0 });
      for (const U of [...this.days.keys()]) U < nt - 3 * 864e5 && this.days.delete(U);
    }
    if (st.heat += (J + this.aux) * s, st.el += (this.pEl + this.aux) * s, st.aux += this.aux * s, C && (st.heatDhw += J * s, st.elDhw += this.pEl * s), C ? (this.e.elDhw += this.pEl * s, this.e.heatDhw += J * s) : (this.e.elHeat += this.pEl * s, this.e.heatHeat += J * s), this.defrostLeft > 0)
      this.defrostLeft -= t, this.defrostLeft <= 0 && (this.ice = 0, this.defrostLeft = 0);
    else if (this.p.source === "air" && this.running && this.tOut < 7 && this.tOut > -15) {
      const U = this.tOut > -2 ? 1.3 - Math.abs(this.tOut - 1) * 0.12 : 0.9 + this.tOut * 0.04;
      this.ice += Math.max(0.05, U) * (this.pTh / G) * s, this.ice >= 1 && (this.defrostLeft = 240 + Math.random() * 120);
    }
    this.emitConditions(), this.values = this.buildValues(r, M, _, N, K), this.sampleAcc += t, this.sampleAcc >= 60 && (this.sampleAcc = 0, this.sample());
  }
  startDraw(t, e) {
    this.tapFlow = e, this.tapLeft = t * 60;
  }
  buildValues(t, e, s, i, n) {
    const a = (d) => Math.round(d * 10) / 10, r = this.pMax(), l = this.running;
    return {
      outdoor: {
        outdoor_temp: a(this.tOut),
        air_in_temp: a(this.tOut + 0.4),
        activity: this.mode,
        compressor_on: l && this.mode !== "defrost" ? !0 : l,
        compressor_speed: l ? Math.round(Math.abs(this.pTh) / (r * 1.15) * 100) : 0,
        fan_speed: l && this.mode !== "defrost" ? Math.round(35 + this.pTh / r * 55) : 0,
        heat_power: a(Math.max(0, l ? this.pTh : 0)),
        el_power: Math.round(this.pEl * 1e3),
        compressor_starts: this.starts,
        evap_in_temp: a(this.tOut - (l ? 6 : 0)),
        comp_in_temp: a(this.tOut - (l ? 2 : 0)),
        comp_out_temp: a(l ? this.tVl + 28 : this.tOut + 5),
        hp_temp: a(l ? this.tVl + 3 : this.tOut),
        lp_temp: a(l ? this.tOut - 7 : this.tOut),
        drain_pan_temp: a(this.mode === "defrost" ? 4 : Math.max(this.tOut, 1)),
        silent_mode: "auto"
      },
      indoor: {
        supply_temp: a(this.tVl),
        return_temp: a(this.tRl),
        condenser_temp: a(this.tVl + (l ? 1 : 0)),
        target_flow_temp: a(this.mode === "hot_water" ? Math.min(62, e + 8) : t),
        pressure: a(1.45 + ((this.bufTop + this.bufBot) / 2 - 30) * 8e-3),
        flow: i ? Math.round(n / zt) : 0,
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
        el_energy_total: a(this.e.el),
        el_energy_heating: a(this.e.elHeat),
        el_energy_dhw: a(this.e.elDhw),
        heat_energy_total: a(this.e.heat),
        heat_energy_heating: a(this.e.heatHeat),
        heat_energy_dhw: a(this.e.heatDhw),
        aux_energy_total: a(this.e.aux),
        service_code: this.fault ? "SIM" : ""
      },
      pc0: { running: i, speed: i ? 72 : 0, flow: i ? 1100 : 0 },
      pc1: { running: this.tOut < 16, speed: this.tOut < 16 ? 55 : 0, flow: this.tOut < 16 ? 650 : 0 },
      circ: { running: s },
      vw1: { position: this.mode === "hot_water" },
      buffer: { temp_top: a(this.bufTop), temp_mid: a((this.bufTop + this.bufBot) / 2), temp_bottom: a(this.bufBot) },
      dhw: {
        temp_top: a(this.dhwTop),
        temp_bottom: a(this.dhwBot),
        setpoint: e,
        charging: this.mode === "hot_water",
        onetime: !1,
        disinfecting: this.disinfect
      },
      hc: {
        flow_temp: a(this.tVlHc),
        return_temp: a(this.tRlHc),
        target_flow_temp: a(t),
        room_temp: a(this.tRoom),
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
      tap: { flow: this.tapFlow, temp: a(this.dhwTop - 2) },
      mixer: { position: this.tOut < 16 ? 40 : 0, flow_temp: a(Math.min(this.tVlHc, 33)) }
    };
  }
  // ----------------------------------------------------------- messages
  condition(t, e, s, i, n, a) {
    const r = this.active.get(t);
    if (e && !r) {
      const l = {
        id: Math.random().toString(16).slice(2, 14),
        ts: this.time,
        level: s,
        key: i,
        params: n,
        component_id: a,
        active: !0,
        end_ts: null
      };
      this.active.set(t, l.id), this.messages.push(l), this.messages.length > 200 && this.messages.shift(), this.listeners.forEach((d) => d(l));
    } else if (!e && r) {
      this.active.delete(t);
      const l = this.messages.find((d) => d.id === r);
      l && (l.active = !1, l.end_ts = this.time, this.listeners.forEach((d) => d(l)));
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
        const a = typeof n == "number" ? n : typeof n == "boolean" ? n ? 1 : 0 : null;
        if (a === null && i !== "activity") continue;
        const r = `${e}.${i}`;
        let l = this.hist.get(r);
        l || this.hist.set(r, l = []), l.push(a === null ? { t, v: null, raw: String(n) } : { t, v: a }), l.length > 1500 && l.splice(0, l.length - 1440);
      }
  }
  dailyEnergy() {
    return [...this.days.entries()].sort((t, e) => t[0] - e[0]).map(([t, e]) => ({ day: t, ...e }));
  }
  history(t, e, s) {
    const i = this.hist.get(`${t}.${e}`) || [], n = this.time - s * 3600;
    return i.filter((a) => a.t >= n);
  }
}
function Ys(o) {
  switch (o.type) {
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
      const t = o.props.role;
      return t === "primary" ? "pc0" : t === "circulation" ? "circ" : "pc1";
    }
    default:
      return null;
  }
}
function Re(o) {
  if (!o) return {};
  const t = o.components.find((l) => l.type === "outdoor_unit"), e = o.components.find((l) => l.type === "indoor_unit"), s = o.components.find((l) => l.type === "buffer"), i = o.components.find((l) => l.type === "dhw_tank"), n = Gt(e?.model), a = xs(t?.model), r = o.components.filter((l) => l.type === "radiators" || l.type === "floor_heating");
  return {
    nominal: Number(t?.props.nominal_kw) || a.nominal,
    source: a.source,
    bufferL: Number(s?.props.volume) || n?.buffer || (s ? 120 : 30),
    dhwL: Number(i?.props.volume) || n?.dhw || 274,
    auxKw: Number(e?.props.aux_kw) || 6,
    heatLoad: Number(o.settings?.heat_load) || 6.2,
    floor: r.length > 0 && r.every((l) => l.type === "floor_heating")
  };
}
const vn = {}, Gs = {
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
class wn {
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
      const [a, r] = n.sim.split(".");
      return this.wrap(this.sim.values[a]?.[r]);
    }
    if (t.type === "indoor_unit") {
      const n = Gs[e];
      if (n) {
        const a = Ct(t)?.id;
        return e.startsWith("dhw_") && a !== "t180" || e === "buffer_temp" && a !== "tp70" || e.startsWith("pc1") && a === "wall_e" ? void 0 : this.wrap(this.sim.values[n[0]]?.[n[1]]);
      }
    }
    const s = Ys(t);
    if (!s) return;
    let i = this.sim.values[s]?.[e];
    if (i !== void 0)
      return s === "hc" && typeof i == "number" && Number(t.props.circuit) > 1 && ["flow_temp", "return_temp", "target_flow_temp"].includes(e) && (i = Math.round((i - (t.type === "floor_heating" ? 12 : 2)) * 10) / 10), this.wrap(i, vn[e]);
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
    const i = t.type === "indoor_unit" ? Gs[e] : void 0;
    if (i) return this.sim.history(i[0], i[1], s);
    const n = Ys(t);
    return n ? this.sim.history(n, e, s) : [];
  }
}
function Ze() {
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
class yn {
  constructor() {
    this.components = [], this.pipes = [], this.n = 0;
  }
  add(t, e, s, i, n, a = {}) {
    return this.components.push({ id: t, type: e, label: s, x: i, y: n, bindings: {}, props: {}, ...a }), t;
  }
  pipe(t, e, s, i = [], n = {}) {
    this.pipes.push({ id: `p${++this.n}`, from: t, to: e, kind: s, flow: i, ...n });
  }
}
const w = (o, t) => ({ c: o, p: t });
function We(o, t) {
  const e = new yn(), s = Gt(o.indoorModel), i = s?.variant || "wall_e", n = !!s?.dhw, a = !!s?.buffer, r = o.dhw === "tank" && !n, l = o.dhw === "tank" || n, d = o.buffer !== "none" && !a, u = { c: "iu", s: "running" }, p = l ? [{ c: "iu", s: "a" }] : [], h = { c: "iu", s: "b" }, m = { c: "pc1", s: "running" }, g = {
    aux_kw: o.aux ? o.auxKw : 0,
    input_labels: { input1: "§14a / EVU", input4: "PV" },
    input_levels: { input1: "warning" },
    pressure_min: 1,
    pressure_max: 2.7,
    buffer_l: s?.buffer
  }, _ = i !== "wall_e", y = i === "tp70" && o.circuits.length <= 1 && !o.circuits[0]?.mixed, b = y ? 3 : 12;
  e.add("ou", "outdoor_unit", o.outdoorLabel || c("type.outdoor_unit"), 1, b, {
    model: o.outdoorModel,
    props: { nominal_kw: o.nominalKw }
  });
  const k = y ? 22 : _ ? 14 : 16, M = y ? 22 : _ ? 12 : 2;
  e.add("iu", "indoor_unit", o.indoorLabel || c("type.indoor_unit"), k, M, { model: o.indoorModel, props: g });
  const E = e.components.find((A) => A.id === "iu"), T = (A) => dt(E, A), R = { y: b + 5 };
  if (y) {
    const A = M, D = (H) => T(H).x, N = { c: "iu", s: "pc1" };
    e.pipe(w("iu", "src_out"), w("ou", "in"), "return", [u], { via: [[D("src_out"), b + 5]] }), e.pipe(w("ou", "out"), w("iu", "src_in"), "supply", [u], { via: [[D("src_in"), b + 6]] });
    const K = o.circuits[0] ?? { emitter: "radiators", label: "" }, C = 2, P = A - 8, S = A - 4;
    e.add("hc1", K.emitter, K.label || c("wz.circuit", { n: 1 }), C, P - 1, { flip: !0, props: { circuit: 1 } }), e.pipe(w("iu", "sup"), w("hc1", "sup"), "supply", [N], { via: [[D("sup"), P]] });
    let L = w("hc1", "ret"), O = [], W = C + 9;
    if (o.separator && (e.add("sep", "separator", c("wz.separator_short"), W, S - 1), e.add("sc1", "separator", "SC1", W + 3, S - 1, { props: { filter: !0 } }), e.pipe(L, w("sep", "in"), "return", [N]), e.pipe(w("sep", "out"), w("sc1", "in"), "return", [N]), L = w("sc1", "out"), W += 7), o.expansion && (e.add("jmag", "junction", "", W + 1, S), e.add("mag", "expansion_vessel", "MAG", W, S, { rot: 180 }), e.pipe(w("mag", "conn"), w("jmag", "b"), "return", []), e.pipe(L, w("jmag", "l"), "return", [N]), L = w("jmag", "r")), e.pipe(L, w("iu", "ret"), "return", [N], { via: [...O, [D("ret"), S]] }), r) {
      const H = k + 22, J = A + 2;
      e.add("dhw", "dhw_tank", o.dhwLabel || c("type.dhw_tank"), H, J, { props: { volume: o.dhwVolume } }), e.pipe(w("iu", "dhw_sup"), w("dhw", "coil_in"), "supply", [u, h], { via: [[D("dhw_sup"), A - 3], [H + 9, A - 3], [H + 9, J + 4]] }), e.pipe(w("dhw", "coil_out"), w("iu", "dhw_ret"), "return", [u, h], { via: [[H + 8, J + 9], [H + 8, A - 2], [D("dhw_ret"), A - 2]] }), Xt(e, o, w("dhw", "hot"), w("dhw", "circ"), w("dhw", "cold"), H, J);
    }
  } else if (_) {
    const A = M, D = (W) => T(W).x, N = Math.max(...["src_in", "src_out", "sup", "ret", "dhw_sup", "dhw_ret", "dhw_hot", "dhw_cold", "circ"].filter((W) => dt(E, W)).map(D));
    e.pipe(w("ou", "out"), w("iu", "src_in"), "supply", [u], { via: [[12, R.y], [12, A - 9], [D("src_in"), A - 9]] }), e.pipe(w("iu", "src_out"), w("ou", "in"), "return", [u], { via: [[D("src_out"), A - 10], [11, A - 10]] });
    let K = w("iu", "sup"), C = w("iu", "ret"), P = a ? [m] : [u, ...p], S = [[D("sup"), A - 2]];
    const L = A - 4;
    let O = N + 14;
    if (d) {
      const W = N + 2, H = W + 10, J = A + 4;
      e.add("buf", "buffer", o.bufferLabel || c("type.buffer"), H, J, { props: { volume: o.bufferVolume } }), e.pipe(w("iu", "sup"), w("buf", "in_sup"), "supply", [u, ...p], { via: [[D("sup"), A - 2], [H + 1, A - 2]] });
      const X = [u, ...p];
      let nt = w("buf", "in_ret"), st = [[H + 2, L]];
      o.separator && (e.add("sep", "separator", c("wz.separator_short"), W + 6, L - 1, { rot: 180 }), e.add("sc1", "separator", "SC1", W + 3, L - 1, { rot: 180, props: { filter: !0 } }), e.pipe(nt, w("sep", "in"), "return", X, { via: st }), e.pipe(w("sep", "out"), w("sc1", "in"), "return", X), nt = w("sc1", "out"), st = []), o.expansion && (e.add("jmag", "junction", "", W, L), e.add("mag", "expansion_vessel", "MAG", W - 1, L - 5), e.pipe(w("mag", "conn"), w("jmag", "t"), "return", []), e.pipe(nt, w("jmag", "r"), "return", X, { via: st }), nt = w("jmag", "l"), st = []), e.pipe(nt, w("iu", "ret"), "return", X, { via: [...st, [D("ret"), L]] }), K = w("buf", "out_sup"), C = w("buf", "out_ret"), P = [m], S = [], O = H + 7;
    }
    if (Be(e, o, K, C, P, S, d || a, O, A + 4), n)
      Xt(e, o, w("iu", "dhw_hot"), w("iu", "circ"), w("iu", "dhw_cold"), k - 1, A + 18);
    else if (r) {
      const W = k - 9, H = A + 8;
      e.add("dhw", "dhw_tank", o.dhwLabel || c("type.dhw_tank"), W, H, { props: { volume: o.dhwVolume } }), e.pipe(w("iu", "dhw_sup"), w("dhw", "coil_in"), "supply", [u, h], { via: [[D("dhw_sup"), A - 1], [W + 8, A - 1], [W + 8, H + 4]] }), e.pipe(w("dhw", "coil_out"), w("iu", "dhw_ret"), "return", [u, h], { via: [[W + 7, H + 9], [W + 7, A - 3], [D("dhw_ret"), A - 3]] }), Xt(e, o, w("dhw", "hot"), w("dhw", "circ"), w("dhw", "cold"), W, H);
    }
  } else {
    const A = M + 14, D = (S) => T(S).x;
    e.pipe(w("iu", "src_out"), w("ou", "in"), "return", [u], { via: [[D("src_out"), A + 1]] }), e.pipe(w("ou", "out"), w("iu", "src_in"), "supply", [u], { via: [[D("src_in"), A + 2]] });
    const N = A + 6, K = [u, ...p], C = [];
    o.separator && (e.add("sep", "separator", c("wz.separator_short"), D("sup") + 9, N - 1, { rot: 180 }), C.push({ inP: w("sep", "in"), outP: w("sep", "out") })), o.expansion && (e.add("jmag", "junction", "", D("sup") + 6, N), e.add("mag", "expansion_vessel", "MAG", D("sup") + 5, N + 1, { rot: 180 }), e.pipe(w("mag", "conn"), w("jmag", "b"), "return", []), C.push({ inP: w("jmag", "r"), outP: w("jmag", "l") })), o.separator && (e.add("sc1", "separator", "SC1", D("sup") + 1, N - 1, { rot: 180, props: { filter: !0 } }), C.push({ inP: w("sc1", "in"), outP: w("sc1", "out") }));
    for (let S = 0; S < C.length - 1; S++) e.pipe(C[S].outP, C[S + 1].inP, "return", K);
    let P = w("iu", "ret");
    if (C.length && (e.pipe(C[C.length - 1].outP, w("iu", "ret"), "return", K, { via: [[D("ret"), N]] }), P = C[0].inP), d) {
      const S = k + 22, L = A + 8;
      e.add("buf", "buffer", o.bufferLabel || c("type.buffer"), S, L, { props: { volume: o.bufferVolume } }), e.pipe(w("iu", "sup"), w("buf", "in_sup"), "supply", [u, ...p], { via: [[D("sup"), A + 2], [S + 1, A + 2]] }), e.pipe(w("buf", "in_ret"), P, "return", [u, ...p], { via: [[S + 2, N]] }), Be(e, o, w("buf", "out_sup"), w("buf", "out_ret"), [m], [], !0, S + 8, L + 1);
    } else {
      const S = k + 25;
      Be(e, o, w("iu", "sup"), P, [u, ...p], [[D("sup"), A + 2], [S - 2, A + 2]], !1, S, A + 8, N);
    }
    if (r) {
      const S = D("dhw_sup") - 8, L = A + 6;
      e.add("dhw", "dhw_tank", o.dhwLabel || c("type.dhw_tank"), S, L, { props: { volume: o.dhwVolume } }), e.pipe(w("iu", "dhw_sup"), w("dhw", "coil_in"), "supply", [u, h], { via: [[D("dhw_sup"), L + 4]] }), e.pipe(w("dhw", "coil_out"), w("iu", "dhw_ret"), "return", [u, h], { via: [[D("dhw_ret"), L + 9]] }), Xt(e, o, w("dhw", "hot"), w("dhw", "circ"), w("dhw", "cold"), S, L);
    }
  }
  const G = Math.max(1, o.circuits.length), et = {
    version: 5,
    name: o.name,
    grid: y ? { w: 58, h: 44 } : { w: G > 1 ? 76 : 66, h: Math.max(38, (_ ? 46 : 38) + (G - 1) * 10) },
    components: e.components,
    pipes: e.pipes,
    settings: t?.settings ?? { style: "flat", demo: !0 }
  };
  if (et.settings = { ...et.settings, wizard: o }, t) {
    const A = new Map(t.components.map((C) => [C.id, C]));
    for (const C of et.components) {
      const P = A.get(C.id);
      P && P.type === C.type && (C.bindings = { ...P.bindings }, P.icon && (C.icon = P.icon), P.show && (C.show = P.show));
    }
    const D = et.components.find((C) => C.id === "iu"), N = A.get("pc0"), K = A.get("vw1");
    D && N?.bindings.running && (D.bindings.pc0_running ??= N.bindings.running), D && N?.bindings.speed && (D.bindings.pc0_speed ??= N.bindings.speed), D && K?.bindings.position && (D.bindings.vw1_position ??= K.bindings.position);
  }
  return et;
}
function Be(o, t, e, s, i, n, a, r, l, d) {
  Math.max(1, t.circuits.length);
  const u = [], p = { ...e };
  t.circuits.slice(0, 4).forEach((h, m) => {
    const g = m + 1, _ = l - 9 + m * 10, y = g === 1 ? "pc1" : `hc${g}_pump`, b = `hc${g}_mix`, k = `hc${g}`;
    let M = r, E = null, T = null, R = i;
    (a || h.mixed) && (o.add(y, "pump", g === 1 ? "PC1" : `PC${g}`, M, _, { props: { role: h.mixed ? "hc" : "secondary", circuit: g } }), E = w(y, "in"), T = w(y, "out"), R = [{ c: y, s: "running" }], u.push(R[0]), M += 4), h.mixed && (o.add(b, "mixer", `VC${g}`, M, _, { props: { circuit: g } }), T ? o.pipe(T, w(b, "in"), "supply", R) : E = w(b, "in"), T = w(b, "out"), M += 3);
    const G = M + 3;
    o.add(k, h.emitter, h.label || c("wz.circuit", { n: g }), G, _ - 2, { props: { circuit: g } }), T ? o.pipe(T, w(k, "sup"), "supply", R, { via: [[G - 2, _ + 1], [G - 2, _ - 1]] }) : E = w(k, "sup"), o.pipe(p, E, "supply", R, m === 0 ? { via: [...n, [r - 1 - m, _ + 1]] } : { via: [[r - 1 - m, _ + 1]] }), h.mixed ? (o.add(`hc${g}_jm`, "junction", "", M - 2, _ + 3), o.pipe(w(k, "ret"), w(`hc${g}_jm`, "r"), "return", R, { via: [[M - 2, _ + 3]] }), o.pipe(w(`hc${g}_jm`, "t"), w(b, "ret"), "return", R), o.pipe(w(`hc${g}_jm`, "l"), s, "return", R, { via: [[r - 2 - m, _ + 3], ...d ? [[r - 2 - m, d]] : []] })) : o.pipe(w(k, "ret"), s, "return", R, { via: [[r - 2 - m, _ + 3], ...d ? [[r - 2 - m, d]] : []] });
  });
}
function Xt(o, t, e, s, i, n, a) {
  const r = { c: "tap", s: "flowing" }, l = { c: "circ", s: "running" };
  if (o.add("tap", "tap", c("type.tap"), n - 9, a), o.add("inlet", "water_inlet", c("type.water_inlet"), n - 9, a + 9), o.pipe(w("inlet", "out"), i, "dhw_cold", [r]), !t.circulation) {
    o.pipe(e, w("tap", "hot"), "dhw_hot", [r]);
    return;
  }
  o.add("jww", "junction", "", n - 3, a + 1), o.pipe(e, w("jww", "r"), "dhw_hot", [], { flowAny: [r, l] }), o.pipe(w("jww", "l"), w("tap", "hot"), "dhw_hot", [r]), o.add("circ", "pump", "PW2", n - 4, a + 3, { rot: 90, props: { role: "circulation" } }), o.pipe(w("jww", "b"), w("circ", "in"), "circulation", [l]), o.pipe(w("circ", "out"), s, "circulation", [l]);
}
function Ye() {
  const o = typeof location < "u" ? new URLSearchParams(location.search).get("indoor") : null, t = Ze();
  return o && Gt(o) && (t.indoorModel = o, t.indoorLabel = Gt(o).label.replace(/^Logatherm /, "").split(" – ")[0]), We(t);
}
const bn = 4;
class wi {
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
    this.host.toggleAttribute("light", !e), Bs(Vs(this.plant?.settings.language, t.language)), this.api ? this.api.setHass(t) : this._connected && this._init(), this.plant && !this.plant.settings.demo && this._checkStates();
  }
  _init() {
    this.api = new Zi(this.hass), this._load();
  }
  // ----------------------------------------------------------------- data
  get messages() {
    return this.sim ? this.simMessages : this.backendMessages;
  }
  get src() {
    return this.sim ? new wn(this.sim) : new an(this.hass);
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
        e ? (e.version ?? 1) < 5 && e.settings?.wizard && (e = We(e.settings.wizard, e), t.is_admin && this.saveExample && await this.api.saveConfig(e)) : (e = Ye(), t.is_admin && this.saveExample && await this.api.saveConfig(e)), this.setPlant(e), await this.loadIcons(), this.api.standalone || (this.backendMessages = await this.api.listMessages(), this._unsubMsg = await this.api.subscribeMessages((s) => this._mergeMessage(s)));
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
    const e = JSON.stringify(Re(this.plant));
    this.plant = t, Bs(Vs(t.settings.language, this.hass?.language)), this._collectBound(), t.settings.demo ? (!this.sim || JSON.stringify(Re(t)) !== e) && this._startSim() : (this._stopSim(), this._checkStates()), this.version++, this._changed();
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
    const t = this.plant?.components.find((i) => i.type === "dhw_tank"), e = new _n(Re(this.plant), void 0, { dhw: t?.label || c("type.dhw_tank") });
    this.sim = e, this._unsubSim = e.onMessage(() => {
      this.simMessages = [...e.messages], this._changed();
    }), this.simMessages = [...e.messages], this._lastFrame = performance.now();
    const s = (i) => {
      const n = (i - this._lastFrame) / 1e3;
      this._lastFrame = i, document.hidden || (e.advance(n), this._accum += n, this._accum >= 1 / bn && (this._accum = 0, this.version++, this._changed())), this._raf = requestAnimationFrame(s);
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
const yi = q`
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
`, it = q`
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
`, $n = {
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
  warn: "M12 3l10 18H2zM12 10v5M12 18h.01",
  error: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM9 9l6 6M15 9l-6 6",
  notice: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM12 7v6M12 16h.01",
  search: "M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14zM20 20l-4-4",
  download: "M12 4v11M7 10l5 5l5-5M5 20h14",
  upload: "M12 20V9M7 14l5-5l5 5M5 4h14"
};
function V(o) {
  return $`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d=${$n[o] || ""} /></svg>`;
}
const Ge = $`<svg viewBox="0 0 32 32" class="logo" aria-hidden="true">
  <defs><linearGradient id="cp-logo" x1="0" y1="1" x2="1" y2="0">
    <stop offset="0" stop-color="#38d0ff" /><stop offset="0.55" stop-color="#3ddc97" /><stop offset="1" stop-color="#ffb35c" />
  </linearGradient></defs>
  <path d="M24 7.5A11 11 0 1 0 24 24.5" fill="none" stroke="url(#cp-logo)" stroke-width="4" stroke-linecap="round" />
  <path d="M16 9c3 4 5 6.5 5 9a5 5 0 0 1-10 0c0-2.5 2-5 5-9z" fill="url(#cp-logo)" />
</svg>`, xn = 7, kn = 35, bi = 4.9;
function de(o, t, e = "air") {
  const s = t + 273.15 + 3, i = (e === "air" ? o - 6 : 0) + 273.15;
  return Math.max(1.2, Math.min(8, 0.57 * s / Math.max(5, s - i)));
}
function Mn(o, t, e = bi, s = "air") {
  return e * de(o, t, s) / de(xn, kn, s);
}
function Sn(o) {
  return o >= 0.9 ? "green" : o >= 0.75 ? "yellow" : "red";
}
const xt = { green: "#3ddc97", yellow: "#f5c542", red: "#ff5a5f" };
function $i(o, t) {
  const e = o.components.find((g) => g.type === "outdoor_unit"), s = o.components.find((g) => g.type === "indoor_unit");
  if (!e || !s) return;
  const i = (g, _) => {
    const y = t.get(g, _);
    return y?.available && y.num !== null ? y.num : void 0;
  }, n = i(e, "heat_power");
  let a = i(e, "el_power");
  a !== void 0 && t.get(e, "el_power")?.unit === "kW" && (a *= 1e3);
  const r = i(e, "outdoor_temp"), l = i(s, "supply_temp"), d = String(t.get(e, "activity")?.raw ?? "").toLowerCase();
  if (n === void 0 || a === void 0 || r === void 0 || l === void 0 || n < 0.5 || a < 80 || d.includes("defrost") || d.includes("abtau")) return;
  const u = n / (a / 1e3), p = xs(e.model).source, h = Mn(r, l, Number(e.props.cop_ref) || bi, p), m = u / h;
  return { cop: u, expected: h, ratio: m, ampel: Sn(m), tOut: r, tFlow: l };
}
function Rt(o) {
  return o && o.el > 0.05 ? o.heat / o.el : void 0;
}
const re = { heat: 0, el: 0, heatDhw: 0, elDhw: 0, aux: 0 };
function Ft(o, t) {
  return {
    heat: o.heat + (t.heat || 0),
    el: o.el + (t.el || 0),
    heatDhw: o.heatDhw + (t.heatDhw || 0),
    elDhw: o.elDhw + (t.elDhw || 0),
    aux: o.aux + (t.aux || 0)
  };
}
function Kt(o) {
  return new Date(o.getFullYear(), o.getMonth(), o.getDate()).getTime();
}
const zn = {
  heat: ["heat_energy_total"],
  el: ["el_energy_total"],
  heatDhw: ["heat_energy_dhw"],
  elDhw: ["el_energy_dhw"],
  aux: ["aux_energy_total"]
};
async function En(o, t) {
  const e = t.components.find((y) => y.type === "indoor_unit"), s = {};
  for (const [y, b] of Object.entries(zn)) {
    const k = b.map((M) => e?.bindings[M]).find(Boolean);
    k && (s[y] = k);
  }
  const i = { today: null, yesterday: null, month: null, year: null, daily: [], estimated: { month: !1, year: !1 } };
  if (!s.heat || !s.el) return { ...i, missing: "no_counters" };
  const n = /* @__PURE__ */ new Date(), a = Object.values(s), r = (y, b) => o.callWS({
    type: "recorder/statistics_during_period",
    start_time: y.toISOString(),
    end_time: n.toISOString(),
    statistic_ids: a,
    period: b,
    types: ["change"],
    units: { energy: "kWh" }
  }), [l, d] = await Promise.all([
    r(new Date(Kt(n) - 30 * 864e5), "day"),
    r(new Date(n.getFullYear(), 0, 1), "month")
  ]), u = /* @__PURE__ */ new Map();
  for (const [y, b] of Object.entries(s))
    for (const k of l[b] || []) {
      const M = Kt(new Date(k.start));
      u.set(M, Ft(u.get(M) || re, { [y]: k.change || 0 }));
    }
  if (!u.size) return { ...i, missing: "no_statistics" };
  const p = [...u.entries()].sort((y, b) => y[0] - b[0]).map(([y, b]) => ({ day: y, ...b })), h = u.get(Kt(n)) || null, m = u.get(Kt(n) - 864e5) || null;
  let g = re, _ = null;
  for (const [y, b] of Object.entries(s))
    for (const k of d[b] || [])
      g = Ft(g, { [y]: k.change || 0 }), new Date(k.start).getMonth() === n.getMonth() && (_ = Ft(_ || re, { [y]: k.change || 0 }));
  return { today: h, yesterday: m, month: _, year: g, daily: p, estimated: { month: !1, year: !1 } };
}
const xi = [2, 3, 6.5, 10.5, 14.5, 18, 20, 19.5, 15.5, 10.5, 6, 3], qs = 0.8;
function Ve(o, t, e, s) {
  const i = s ?? xi[t], n = o.p, a = n.heatLoad / (21 - n.designTemp);
  let r = 0, l = 0;
  for (const p of [-4, -2, 0, 2, 4]) {
    const h = i + p;
    if (h >= 16) continue;
    const m = a * (21 - h) * 24 * e * 0.2 * 0.85, g = 21 + (21 - h) * ((n.floor ? 35 : 50) - 21) / (21 - n.designTemp);
    r += m, l += m / (de(h, g, n.source) * qs);
  }
  const d = 8.4 * e * (n.dhwL > 0 ? 1 : 0), u = d / (de(i, 53, n.source) * qs);
  return { heat: r + d, el: l + u, heatDhw: d, elDhw: u, aux: 0 };
}
function An(o) {
  const t = new Date(o.time * 1e3), e = Kt(t), s = o.dailyEnergy(), i = s.find((d) => d.day === e) || null, n = s.find((d) => d.day === e - 864e5) || null, a = Ve(o, t.getMonth(), t.getDate() - 1 + t.getHours() / 24, o.outdoorMean);
  let r = re;
  for (let d = 0; d < t.getMonth(); d++) r = Ft(r, Ve(o, d, new Date(t.getFullYear(), d + 1, 0).getDate()));
  r = Ft(r, a);
  const l = [];
  for (let d = 29; d >= 2; d--) {
    const u = e - d * 864e5, p = new Date(u), h = d <= 14 ? (14 - d) / 14 : 0, m = xi[p.getMonth()] * (1 - h) + o.outdoorMean * h + Math.sin(d * 1.3) * 2, g = Ve(o, p.getMonth(), 1, m), _ = 1 + Math.sin(d * 1.7) * 0.18;
    l.push({ day: u, ...g, heat: g.heat * _, el: g.el * _ * (1 + Math.cos(d) * 0.04) });
  }
  return {
    today: i,
    yesterday: n,
    month: a,
    year: r,
    daily: [...l, ...s.filter((d) => d.day >= e - 864e5)],
    estimated: { month: !0, year: !0 }
  };
}
const Js = {
  heating: "#ff8a3d",
  hot_water: "#ff4f8b",
  defrost: "#6cc4ff",
  compressor_alarm: "#ff4d4d",
  cooling: "#38d0ff",
  off: "#8b949e"
};
function ks(o, t, e = 10, s = "casing") {
  return $`<rect class=${s} x="0" y="0" width=${o} height=${t} rx=${e} />
    <rect class="sheen" x="2" y="2" width=${o - 4} height=${Math.min(t * 0.35, 40)} rx=${e - 2} />`;
}
function Pn(o) {
  const { w: t, h: e, flags: s, c: i } = o, n = xs(i.model);
  if (n.source === "brine") return Dn(o);
  const a = s.has("running") && !s.has("defrost"), r = s.has("defrost"), l = s.has("alarm"), d = t * 0.36, u = e * 0.5, p = Math.min(e * 0.38, t * 0.3), h = o.num("fan_speed") ?? (a ? 60 : 0), m = h <= 0 ? 0 : h < 45 ? 2.8 : h < 70 ? 2 : 1.5, g = l ? "#ff4d4d" : r ? "#6cc4ff" : a ? "#3ddc97" : "#5b6573", _ = [0, 120, 240].map(
    (y) => $`<path transform="rotate(${y})" d="M0 0 C ${p * 0.18} ${-p * 0.25}, ${p * 0.55} ${-p * 0.35}, ${p * 0.82} ${-p * 0.12} C ${p * 0.6} ${p * 0.05}, ${p * 0.25} ${p * 0.08}, 0 0 Z" />`
  );
  return $`
    <rect class="foot" x=${t * 0.12} y=${e - 2} width=${t * 0.16} height="6" rx="2" />
    <rect class="foot" x=${t * 0.72} y=${e - 2} width=${t * 0.16} height="6" rx="2" />
    ${ks(t, e, 12)}
    <circle class="grille-bg" cx=${d} cy=${u} r=${p + 4} />
    <g transform="translate(${d} ${u})">
      <g class=${m ? "spin fan" : "fan"} style=${m ? `--dur:${m}s` : ""}>${_}<circle r=${p * 0.12} class="hub" /></g>
    </g>
    ${[0.45, 0.72, 1].map((y) => $`<circle class="grille" cx=${d} cy=${u} r=${p * y} />`)}
    <line class="grille" x1=${d - p} y1=${u} x2=${d + p} y2=${u} />
    <line class="grille" x1=${d} y1=${u - p} x2=${d} y2=${u + p} />
    ${[0, 1, 2, 3, 4, 5].map((y) => $`<rect class="vent" x=${t * 0.73} y=${e * 0.22 + y * e * 0.1} width=${t * 0.19} height="3" rx="1.5" />`)}
    <circle cx=${t * 0.9} cy=${e * 0.12} r="4" fill=${g} class=${a || r ? "pulse" : ""} />
    ${n.refrigerant ? $`<text class="tag" x=${t * 0.825} y=${e * 0.9} text-anchor="middle">${n.refrigerant}</text>` : ""}
    ${r ? $`<rect x="2" y="2" width=${t - 4} height=${e - 4} rx="10" class="frost" />
        <g class="pulse" transform="translate(${d} ${u})">${Tn(p * 0.55)}</g>` : ""}
    ${l ? $`<rect x="1" y="1" width=${t - 2} height=${e - 2} rx="11" class="alarm-ring" />` : ""}
  `;
}
function Dn(o) {
  const { w: t, h: e, flags: s } = o, i = s.has("running");
  return $`
    ${ks(t, e * 0.55, 10)}
    <text class="tag" x=${t / 2} y=${e * 0.32} text-anchor="middle">SOLE</text>
    <rect class="ground" x="0" y=${e * 0.62} width=${t} height=${e * 0.38} rx="6" />
    ${[0.2, 0.4, 0.6, 0.8].map(
    (n) => $`<path class=${i ? "probe active" : "probe"} d="M${t * n - 6} ${e * 0.55} V ${e * 0.95} M${t * n + 6} ${e * 0.55} V ${e * 0.95} M${t * n - 6} ${e * 0.95} Q ${t * n} ${e} ${t * n + 6} ${e * 0.95}" />`
  )}
  `;
}
function Tn(o) {
  const t = [0, 60, 120].map(
    (e) => $`<g transform="rotate(${e})"><line x1=${-o} y1="0" x2=${o} y2="0" />
      <path d="M${o * 0.6} 0 l ${o * 0.2} ${-o * 0.2} M${o * 0.6} 0 l ${o * 0.2} ${o * 0.2} M${-o * 0.6} 0 l ${-o * 0.2} ${-o * 0.2} M${-o * 0.6} 0 l ${-o * 0.2} ${o * 0.2}" /></g>`
  );
  return $`<g class="snow">${t}</g>`;
}
const x = 20;
function B(o, t, e) {
  const s = o.map(([i, n], a) => `${a ? "L" : "M"} ${i * x} ${n * x}`).join(" ");
  return $`<path class="ipipe" d=${s} style="stroke:${t}" />
    ${e ? $`<path class="ipipe-flow" d=${s} />` : v}`;
}
function Qt([o, t], e, s = "l") {
  const i = 0.55 * x, n = { r: 0, d: 90, l: 180, u: 270 }[s];
  return $`<g transform="translate(${o * x} ${t * x})">
    ${e ? $`<circle class="pump-glow pulse" r=${i + 4} />` : v}
    <circle class=${e ? "pump-body on" : "pump-body"} r=${i} />
    <path class=${e ? "pump-tri on" : "pump-tri"} transform="rotate(${n})" d="M ${-i * 0.5} ${-i * 0.8} L ${i} 0 L ${-i * 0.5} ${i * 0.8} Z" />
    <circle class=${e ? "impeller spin" : "impeller"} style="--dur:0.9s" r=${i * 0.36} />
    <text class="itag" y=${i + 9} text-anchor="middle">PC0</text>
  </g>`;
}
function te([o, t], e, s = "VW1") {
  const i = 0.5 * x;
  return $`<g transform="translate(${o * x} ${t * x})">
    <path class="valve-tri on" d="M ${-i} ${-i * 0.6} L 0 0 L ${-i} ${i * 0.6} Z" transform="rotate(-90)" />
    <path class=${e ? "valve-tri" : "valve-tri on"} d="M ${i} ${-i * 0.6} L 0 0 L ${i} ${i * 0.6} Z" />
    <path class=${e ? "valve-tri on" : "valve-tri"} d="M ${-i} ${-i * 0.6} L 0 0 L ${-i} ${i * 0.6} Z" />
    <text class="itag" x=${i + 3} y=${-i} >${s} ${e ? "B" : "A"}</text>
  </g>`;
}
function ee([o, t], e, s) {
  return $`<g transform="translate(${o * x} ${t * x})">
    ${s ? $`<rect class="aux-glow pulse" x=${-0.55 * x} y="-6" width=${1.1 * x} height=${e * x + 12} rx="10" />` : v}
    <rect class=${s ? "rod hot" : "rod"} x=${-0.35 * x} y="0" width=${0.7 * x} height=${e * x} rx="6" />
    <path class=${s ? "coil hot" : "coil"} d=${Ln(0, 6, e * x - 12, 4, 8)} />
  </g>`;
}
function Ln(o, t, e, s, i) {
  const n = e / i;
  let a = `M${o} ${t}`;
  for (let r = 1; r <= i; r++) a += ` L${o + (r % 2 ? -s : s)} ${t + r * n}`;
  return a;
}
function se(o, t, e, s) {
  const i = [...o.flags].find((a) => a.startsWith("mode_"))?.slice(5), n = Js[i || "off"] || Js.off;
  return $`<rect class="screen" x=${t} y=${e} width=${s} height="18" rx="4" />
    <rect x=${t + 4} y=${e + 4} width="14" height="10" rx="2" fill=${n} class=${i && i !== "off" ? "pulse" : ""} />
    <text class="screen-text" x=${t + 24} y=${e + 13}>${i ? c(`mode.${i}`) : ""}</text>`;
}
function Wn(o, t) {
  const { w: e, h: s, flags: i, c: n } = o, a = i.has("running"), r = i.has("b"), l = i.has("aux"), d = i.has("pc1"), u = tt(o.num("supply_temp"), "#ff7a45"), p = tt(o.num("return_temp"), "#4d9fff"), h = (n.model || "").match(/w[ls]w\d{3}i/i)?.[0]?.toUpperCase().replace("I", "i") || "";
  let m;
  if (t === "t180") {
    const g = tt(o.num("dhw_temp"), "#ff4f8b");
    m = $`
      <rect class="tank-in" x=${0.6 * x} y=${10 * x} width=${6.8 * x} height=${11.2 * x} rx=${x} style="fill:${g}" />
      <path class=${a && r ? "tank-coil hot" : "tank-coil"} d=${Cn(2.4, 14, 5.6, 19.6)} />
      ${se(o, 1.6 * x, 0.8 * x, 4.6 * x)}
      ${B([[6, 0], [6, 6.2], [4.6, 6.2]], u, a)}
      ${B([[4.6, 6.2], [3, 6.2], [3, 0]], u, a && !r)}
      ${B([[4.6, 6.2], [4.6, 14]], u, a && r)}
      ${B([[2.4, 19.6], [1.6, 19.6], [1.6, 7.6]], p, a && r)}
      ${B([[1, 0], [1, 7.6]], p, a && !r)}
      ${B([[1, 7.6], [7, 7.6], [7, 0]], p, a)}
      ${B([[4, 10.2], [4, 0]], g, i.has("flowing"))}
      ${B([[5, 0], [5, 3], [5.6, 3], [5.6, 20.6]], "#38d0ff", i.has("flowing"))}
      ${ee([6, 1.4], 4, l)}
      ${te([4.6, 6.2], r)}
      ${Qt([4.2, 7.6], a, "r")}
      ${$`<g transform="translate(${3 * x} ${3.4 * x})"><circle class=${d ? "pump-body on" : "pump-body"} r="8" /><text class="itag" x="12" y="4">PC1</text></g>`}`;
  } else if (t === "tp70") {
    const g = tt(o.num("buffer_temp"), "#ff9f45");
    m = $`
      <rect class="tank-in" x=${0.6 * x} y=${9 * x} width=${7.8 * x} height=${6.4 * x} rx=${x} style="fill:${g}" />
      <text class="tank-label" x=${4.5 * x} y=${13.6 * x} text-anchor="middle">${n.props.buffer_l || 70} l</text>
      ${se(o, 2.2 * x, 0.8 * x, 4.6 * x)}
      ${B([[5, 0], [5, 5.2]], u, a)}
      ${B([[5, 5.2], [5, 9]], u, a && !r)}
      ${B([[5, 5.2], [7, 5.2], [7, 0]], u, a && r)}
      ${B([[8, 0], [8, 6.4], [6, 6.4]], p, a && r)}
      ${B([[6.2, 15], [6.2, 9]], p, a && !r)}
      ${B([[6, 9], [6, 0]], p, a)}
      ${B([[1.6, 9], [1.6, 6.4], [1, 6.4], [1, 0]], g, d)}
      ${B([[2, 0], [2, 14.8]], p, d)}
      ${B([[3, 0], [3, 1.4]], g, !1)}
      ${B([[4, 0], [4, 1.4]], p, !1)}
      ${ee([4.5, 1.4], 2.6, l)}
      ${te([5, 5.2], r)}
      ${Qt([6.5, 6.4], a, "u")}
      <g transform="translate(${1.6 * x} ${6.4 * x})"><circle class=${d ? "pump-body on" : "pump-body"} r="8" />
        ${d ? $`<circle class="impeller spin" style="--dur:0.9s" r="3.5" />` : v}<text class="itag" x="11" y="4">PC1</text></g>`;
  } else t === "brine" ? m = $`
      ${se(o, 1.6 * x, 0.8 * x, 4.6 * x)}
      <circle class="compressor" cx=${2.2 * x} cy=${8.5 * x} r=${1.2 * x} />
      <text class="itag" x=${2.2 * x} y=${10.4 * x} text-anchor="middle">Verdichter</text>
      ${B([[1, 0], [1, 6], [2.2, 6], [2.2, 7.3]], "#38d0ff", a)}
      ${B([[2.2, 9.7], [2.2, 11.5], [2, 11.5], [2, 0]], "#2b6cff", a)}
      ${B([[4, 9], [4, 4], [5.5, 4], [5.5, 9]], u, a)}
      ${B([[5.5, 9], [7, 9], [7, 0]], u, a && !r)}
      ${B([[5.5, 9], [5.5, 10.4], [4, 10.4], [4, 0]], u, a && r)}
      ${B([[6, 0], [6, 11.6], [4, 11.6], [4, 9]], p, a && !r)}
      ${B([[5, 0], [5, 3.4]], p, a && r)}
      ${ee([4, 3], 3, l)}
      ${te([5.5, 9], r)}
      ${Qt([5.5, 11.6], a, "l")}` : m = $`
      ${se(o, 2 * x, 0.8 * x, 6 * x)}
      ${B([[3, 14], [3, 9.6], [4.3, 9.6], [4.3, 2.8], [7.6, 2.8], [7.6, 10.6]], u, a)}
      ${B([[7.6, 10.6], [9, 10.6], [9, 14]], u, a && !r)}
      ${B([[7.6, 10.6], [7.6, 11.6], [5, 11.6], [5, 14]], u, a && r)}
      ${B([[8, 14], [8, 12.8], [6, 12.8]], p, a && !r)}
      ${B([[6, 14], [6, 12.8]], p, a && r)}
      ${B([[6, 12.8], [2, 12.8], [2, 14]], p, a)}
      ${ee([4.3, 3.4], 5.4, l)}
      ${te([7.6, 10.6], r)}
      ${Qt([4.3, 12.8], a, "l")}`;
  return $`
    ${ks(e, s, 10, "casing light")}
    ${m}
    ${t === "wall_e" ? v : $`<text class="tag" x=${e / 2} y=${2.4 * x} text-anchor="middle">${h}</text>`}
  `;
}
function Cn(o, t, e, s) {
  const n = (s - t) / 5;
  let a = `M ${e * x} ${t * x - 2 * x}`;
  a += ` L ${e * x} ${t * x}`;
  for (let r = 0; r < 5; r++) {
    const l = (t + r * n) * x;
    a += ` C ${(o - 0.3) * x} ${l}, ${(o - 0.3) * x} ${l + n / 2 * x}, ${e * x} ${l + n / 2 * x}`, a += ` C ${(e + 0.3) * x} ${l + n / 2 * x}, ${(e + 0.3) * x} ${l + n * x}, ${o * x} ${l + n * x}`;
  }
  return a;
}
function Xs(o, t) {
  const { w: e, h: s, c: i, flags: n } = o, a = o.num("temp_top"), r = o.num("temp_bottom") ?? (a !== void 0 ? a - 6 : void 0), l = o.num("temp_mid") ?? (a !== void 0 && r !== void 0 ? (a + r) / 2 : void 0), d = `tg-${i.id}`, u = t === "dhw" ? "#ff4f8b" : "#ff7a45", p = n.has("charging"), h = i.props.volume ? `${i.props.volume} l` : "", m = Math.min(e / 2, 2 * x);
  return $`
    <defs>
      <linearGradient id=${d} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.05" stop-color=${tt(a, u)} />
        <stop offset="0.5" stop-color=${tt(l, "#c084fc")} />
        <stop offset="0.95" stop-color=${tt(r, "#4d9fff")} />
      </linearGradient>
    </defs>
    <rect class="insulation" x="-3" y="-3" width=${e + 6} height=${s + 6} rx=${m + 3} />
    <rect x="0" y="0" width=${e} height=${s} rx=${m} fill="url(#${d})" class="tank-fill" />
    <rect class="tank-glass" x=${e * 0.1} y=${s * 0.06} width=${e * 0.12} height=${s * 0.88} rx=${e * 0.06} />
    ${t === "dhw" ? $`<path class=${p ? "tank-coil hot" : "tank-coil"} d=${On(e)} />
        <path class="dip" d="M 0 ${10 * x} H ${0.8 * x} V ${s - 0.4 * x}" />` : $`
        <path class="dip" d="M ${2 * x} 0 V ${s - 0.5 * x}" />
        <path class="dip" d="M ${3 * x} 0 V ${s - 0.5 * x}" />
        ${[0.3, 0.55, 0.8].map((g) => $`<line class="strat" x1=${e * 0.62} x2=${e * 0.9} y1=${s * g} y2=${s * g} />`)}`}
    <text class="tank-label" x=${e / 2} y=${s * (t === "dhw" ? 0.3 : 0.5)} text-anchor="middle">${h}</text>
    ${n.has("disinfecting") ? $`<text class="tank-badge" x=${e / 2} y=${s * 0.18} text-anchor="middle">60°</text>` : ""}
  `;
}
function On(o) {
  const t = o, e = o * 0.78, s = o * 0.3, i = 4 * x, n = 9 * x, a = 5, r = (n - i) / a;
  let l = `M ${t} ${i} H ${e}`;
  for (let d = 0; d < a; d++) {
    const u = i + d * r;
    l += ` C ${s - 6} ${u}, ${s - 6} ${u + r / 2}, ${e} ${u + r / 2} C ${e + 6} ${u + r / 2}, ${e + 6} ${u + r}, ${e} ${u + r}`;
  }
  return `${l} H ${t}`;
}
function Hn(o) {
  const { w: t, h: e, flags: s } = o, i = s.has("running"), n = Math.min(t, e) / 2 - 2, a = t / 2, r = e / 2;
  return $`
    ${i ? $`<circle class="pump-glow pulse" cx=${a} cy=${r} r=${n + 5} />` : ""}
    <circle class=${i ? "pump-body on" : "pump-body"} cx=${a} cy=${r} r=${n} />
    <path class=${i ? "pump-tri on" : "pump-tri"} d="M ${a - n * 0.5} ${r - n * 0.82} L ${a + n} ${r} L ${a - n * 0.5} ${r + n * 0.82} Z" />
    <g transform="translate(${a} ${r})">
      <circle class=${i ? "impeller spin" : "impeller"} style="--dur:0.9s" r=${n * 0.38} />
    </g>
  `;
}
function Qs(o, t = !1) {
  const { w: e, h: s, flags: i } = o, n = e / 2, a = s / 2, r = Math.min(e, s) / 2 - 2, l = i.has("b"), d = (u) => t || u ? "valve-tri on" : "valve-tri";
  return $`
    <rect class="actuator" x=${n - r * 0.35} y=${a - r * 1.25} width=${r * 0.7} height=${r * 0.45} rx="2" />
    <line class="stem" x1=${n} y1=${a - r * 0.8} x2=${n} y2=${a} />
    <path class=${d(!0)} d="M ${n - r} ${a - r * 0.6} L ${n} ${a} L ${n - r} ${a + r * 0.6} Z" />
    <path class=${d(!l)} d="M ${n + r} ${a - r * 0.6} L ${n} ${a} L ${n + r} ${a + r * 0.6} Z" />
    <path class=${d(l)} d="M ${n - r * 0.6} ${a + r} L ${n} ${a} L ${n + r * 0.6} ${a + r} Z" />
    ${t ? "" : $`<text class="valve-tag" x=${n + r * 0.5} y=${a - r * 0.75}>${l ? "B" : "A"}</text>`}
  `;
}
function Rn(o) {
  const { w: t, h: e } = o, s = o.num("flow_temp"), i = o.num("return_temp"), n = o.num("room_temp"), a = s !== void 0 && n !== void 0 ? s - n > 6 : !1, r = 9, l = 0.45 * x, d = e - 0.45 * x, u = (t - 20) / r, p = `rg-${o.c.id}`;
  return $`
    <defs><linearGradient id=${p} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color=${tt(s, "#8b949e")} stop-opacity=${a ? 0.85 : 0.25} />
      <stop offset="1" stop-color=${tt(i, "#8b949e")} stop-opacity=${a ? 0.6 : 0.2} />
    </linearGradient></defs>
    ${a ? [0.3, 0.55, 0.8].map(
    (h, m) => $`<path class="heat-wave" style="animation-delay:${m * 0.6}s" d="M ${t * h} ${l - 4} q 5 -6 0 -12 q -5 -6 0 -12" />`
  ) : ""}
    <rect class="rad-frame" x="0" y=${l} width=${t - 4} height=${d - l} rx="6" />
    <rect class="rad-header" x="0" y=${x - 4} width=${t - 4} height="8" rx="4" />
    <rect class="rad-header" x="0" y=${5 * x - 4} width=${t - 4} height="8" rx="4" />
    ${Array.from({ length: r }, (h, m) => $`<rect x=${12 + m * u} y=${l + 6} width=${u - 3} height=${d - l - 12} rx=${(u - 3) / 2} fill="url(#${p})" class="fin" />`)}
  `;
}
function Bn(o) {
  const { w: t, h: e } = o, s = o.num("flow_temp"), i = tt(s, "#8b949e");
  let n = `M 10 ${e * 0.25}`;
  const a = 5;
  for (let r = 0; r < a; r++)
    n += r % 2 === 0 ? ` H ${t - 12} q 6 0 6 ${e * 0.3 / a} q 0 ${e * 0.3 / a} -6 ${e * 0.3 / a}` : ` H 16 q -6 0 -6 ${e * 0.3 / a} q 0 ${e * 0.3 / a} 6 ${e * 0.3 / a}`;
  return $`
    <rect class="floor-slab" x="2" y=${e * 0.15} width=${t - 4} height=${e * 0.75} rx="6" />
    <path d=${n} fill="none" stroke=${i} stroke-width="3" stroke-linecap="round" opacity="0.9" />
  `;
}
function Vn(o) {
  const { w: t, h: e, flags: s } = o, i = s.has("flowing");
  return $`
    <path class="tap-body" d="M ${t} ${e * 0.25} H ${t * 0.45} a ${t * 0.25} ${t * 0.25} 0 0 0 ${-t * 0.25} ${t * 0.25} V ${e * 0.62} h ${t * 0.16} V ${e * 0.52} a ${t * 0.1} ${t * 0.1} 0 0 1 ${t * 0.1} ${-t * 0.1} H ${t} Z" />
    <rect class="tap-handle" x=${t * 0.46} y=${e * 0.06} width=${t * 0.26} height=${e * 0.12} rx="3" />
    ${i ? [0, 1, 2].map((n) => $`<circle class="drop" style="animation-delay:${n * 0.25}s" cx=${t * 0.28} cy=${e * 0.7} r="2.5" />`) : ""}
  `;
}
function In(o) {
  const { w: t, h: e } = o;
  return $`
    <rect class="casing" x="0" y=${e * 0.2} width=${t} height=${e * 0.6} rx="5" />
    <text class="tag" x=${t * 0.45} y=${e * 0.62} text-anchor="middle">KW</text>
  `;
}
function Nn(o) {
  const { w: t, h: e, c: s } = o;
  return s.props.filter ? $`
      <rect class="casing" x=${t * 0.15} y=${e * 0.1} width=${t * 0.7} height=${e * 0.8} rx="5" />
      ${[0.3, 0.45, 0.6, 0.75].map((i) => $`<line class="sieve" x1=${t * 0.25} x2=${t * 0.75} y1=${e * i} y2=${e * i} />`)}
      ${[0.35, 0.5, 0.65].map((i) => $`<line class="sieve" x1=${t * i} x2=${t * i} y1=${e * 0.22} y2=${e * 0.8} />`)}` : $`
    <rect class="casing" x=${t * 0.2} y="0" width=${t * 0.6} height=${e} rx=${t * 0.3} />
    <path class="magnet" d="M ${t * 0.38} ${e * 0.3} v ${e * 0.25} a ${t * 0.12} ${t * 0.12} 0 0 0 ${t * 0.24} 0 v ${-e * 0.25}" />
  `;
}
function Kn(o) {
  const { w: t, h: e } = o;
  return $`
    <line class="stem" x1=${t / 2} y1=${e * 0.8} x2=${t / 2} y2=${e} />
    <rect class="vessel" x="0" y="0" width=${t} height=${e * 0.82} rx=${t / 2} />
    <rect class="sheen" x=${t * 0.18} y=${e * 0.08} width=${t * 0.2} height=${e * 0.6} rx=${t * 0.1} />
  `;
}
function jn(o) {
  switch (o.c.type) {
    case "outdoor_unit":
      return Pn(o);
    case "indoor_unit":
      return Wn(o, Ct(o.c)?.id || "wall_e");
    case "buffer":
      return Xs(o, "buffer");
    case "dhw_tank":
      return Xs(o, "dhw");
    case "pump":
      return Hn(o);
    case "valve_3way":
      return Qs(o);
    case "mixer":
      return Qs(o, !0);
    case "radiators":
      return Rn(o);
    case "floor_heating":
      return Bn(o);
    case "tap":
      return Vn(o);
    case "water_inlet":
      return In(o);
    case "separator":
      return Nn(o);
    case "expansion_vessel":
      return Kn(o);
    case "junction":
      return $`<circle class="junction" r="4" />`;
    default:
      return $``;
  }
}
const ti = 1, ie = { l: { x: -1, y: 0 }, r: { x: 1, y: 0 }, t: { x: 0, y: -1 }, b: { x: 0, y: 1 } };
function Ie(o) {
  return o === "l" || o === "r";
}
function ki(o, t) {
  const e = t.get(o.from.c), s = t.get(o.to.c);
  if (!e || !s) return null;
  const i = dt(e, o.from.p), n = dt(s, o.to.p);
  if (!i || !n) return null;
  const a = e.type === "junction" ? 0 : ti, r = s.type === "junction" ? 0 : ti, l = { x: i.x, y: i.y }, d = { x: n.x, y: n.y }, u = { x: l.x + ie[i.dir].x * a, y: l.y + ie[i.dir].y * a }, p = { x: d.x + ie[n.dir].x * r, y: d.y + ie[n.dir].y * r }, h = Ie(i.dir), m = [l, u];
  if (o.via?.length) {
    let g = !h;
    for (const [_, y] of [...o.via, [p.x, p.y]]) {
      const b = m[m.length - 1];
      if (b.x !== _ && b.y !== y) {
        const M = g ? { x: b.x, y } : { x: _, y: b.y };
        m.push(M);
      }
      g = m[m.length - 1].x === _, m.push({ x: _, y });
    }
    return m.push(d), { pts: ei(m), horizontalStart: h };
  }
  if (h)
    if (u.y === p.y && o.bend === void 0)
      m.push(p);
    else {
      const g = o.bend ?? (u.x + p.x) / 2;
      Ie(n.dir) ? m.push({ x: g, y: u.y }, { x: g, y: p.y }) : o.bend === void 0 ? m.push({ x: p.x, y: u.y }) : m.push({ x: g, y: u.y }, { x: g, y: p.y }), m.push(p);
    }
  else if (u.x === p.x && o.bend === void 0)
    m.push(p);
  else {
    const g = o.bend ?? (u.y + p.y) / 2;
    Ie(n.dir) ? o.bend === void 0 ? m.push({ x: u.x, y: p.y }) : m.push({ x: u.x, y: g }, { x: p.x, y: g }) : m.push({ x: u.x, y: g }, { x: p.x, y: g }), m.push(p);
  }
  return m.push(d), { pts: ei(m), horizontalStart: h };
}
function ei(o) {
  const t = [];
  for (const e of o) {
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
function Fn(o, t = 8) {
  if (o.length === 0) return "";
  const e = o.map((n) => ({ x: n.x * z, y: n.y * z }));
  let s = `M ${e[0].x} ${e[0].y}`;
  for (let n = 1; n < e.length - 1; n++) {
    const a = e[n - 1], r = e[n], l = e[n + 1], d = Math.hypot(r.x - a.x, r.y - a.y), u = Math.hypot(l.x - r.x, l.y - r.y), p = Math.min(t, d / 2, u / 2), h = r.x - (r.x - a.x) / d * p, m = r.y - (r.y - a.y) / d * p, g = r.x + (l.x - r.x) / u * p, _ = r.y + (l.y - r.y) / u * p;
    s += ` L ${h} ${m} Q ${r.x} ${r.y} ${g} ${_}`;
  }
  const i = e[e.length - 1];
  return `${s} L ${i.x} ${i.y}`;
}
function Un(o, t) {
  for (let e = 2; e < o.length - 1; e++) {
    const s = o[e - 1], i = o[e], n = s.x === i.x;
    if (t ? n : !n) return { x: (s.x + i.x) / 2, y: (s.y + i.y) / 2 };
  }
  return null;
}
const ut = 18, rt = 88, lt = 34, ot = 6;
function Ne(o, t = 17) {
  return o.length > t ? `${o.slice(0, t - 1)}…` : o;
}
const fe = class fe extends Y {
  constructor() {
    super(...arguments), this.icons = /* @__PURE__ */ new Map(), this.edit = !1, this.autoHeight = !1, this.selected = null, this.version = 0, this._view = null, this._drag = null, this._connect = null, this._pointers = /* @__PURE__ */ new Map(), this._gesture = null, this._segments = [], this._pills = [], this._lastMoved = !1, this._structureKey = "", this._onKey = (t) => {
      t.key === "Escape" && this._connect && (this._connect = null);
    };
  }
  /** Does any pipe pass through the given pixel rectangle (with a small margin)? */
  _hitsPipe(t, e, s, i) {
    return this._segments.some((a) => a.x1 <= s + 5 && a.x2 >= t - 5 && a.y1 <= i + 5 && a.y2 >= e - 5);
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
    const e = t.show ?? vt(t).filter((s) => s.show).map((s) => s.key);
    return this.edit ? [] : e.filter((s) => this.src.get(t, s) !== void 0);
  }
  /** Slots shown in the component's value list (not anchored to a pipe or a measuring point). */
  _listSlots(t) {
    const e = new Set(js(t).filter((s) => s.at || s.pos).map((s) => s.key));
    return this._shownSlots(t).filter((s) => !e.has(s));
  }
  _badgeLayout(t) {
    const e = Ks(t);
    if (e === "none" || e === "inside") return [];
    const s = this._listSlots(t);
    if (!s.length) return [];
    const { w: i, h: n } = pt(t), a = t.x * z, r = t.y * z, l = i * z, d = n * z, u = [];
    if (e === "tank") {
      const p = { temp_top: 0.16, temp_mid: 0.48, temp_bottom: 0.8 }, h = [];
      for (const b of s)
        b in p ? u.push({ slot: b, x: a + 5, y: r + d * p[b] - 11, w: l - 10 }) : h.push(b);
      const g = h.length * (lt + ot), _ = [
        { x: a + l / 2 - rt / 2, y: r + d + 26, dy: lt + ot },
        { x: a + l + 12, y: r + d * 0.35, dy: lt + ot },
        { x: a - 12 - rt, y: r + d * 0.35, dy: lt + ot }
      ], y = _.find((b) => !this._hitsPipe(b.x, b.y, b.x + rt, b.y + g)) || _[0];
      return h.forEach((b, k) => u.push({ slot: b, x: y.x, y: y.y + k * y.dy })), u;
    }
    if (e === "right")
      s.forEach((p, h) => u.push({ slot: p, x: a + l + 12, y: r + 4 + h * (lt + ot) }));
    else if (e === "left")
      s.forEach((p, h) => u.push({ slot: p, x: a - 12 - rt, y: r + 4 + h * (lt + ot) }));
    else if (e === "above") {
      const p = s.length * (rt + ot) - ot;
      s.forEach(
        (h, m) => u.push({ slot: h, x: a + l / 2 - p / 2 + m * (rt + ot), y: r - lt - 10 })
      );
    } else {
      const p = Math.max(2, Math.floor((l + 40) / (rt + ot))), h = Math.ceil(s.length / p);
      s.forEach((m, g) => {
        const _ = Math.floor(g / p), b = (_ === h - 1 ? s.length - _ * p : p) * (rt + ot) - ot;
        u.push({
          slot: m,
          x: a + l / 2 - b / 2 + g % p * (rt + ot),
          y: r + d + 26 + _ * (lt + ot)
        });
      });
    }
    return u;
  }
  _contentBox() {
    let t = 1 / 0, e = 1 / 0, s = -1 / 0, i = -1 / 0;
    const n = (r, l) => {
      t = Math.min(t, r), e = Math.min(e, l), s = Math.max(s, r), i = Math.max(i, l);
    };
    for (const r of this.plant.components) {
      const { w: l, h: d } = pt(r);
      n(r.x * z - 6, r.y * z - 6), n((r.x + l) * z + 6, (r.y + d) * z + 22);
      for (const u of this._badgeLayout(r))
        n(u.x, u.y), n(u.x + rt, u.y + lt);
    }
    for (const r of this._pills)
      n(r.x, r.y), n(r.x + r.w, r.y + ut);
    (this.edit || !Number.isFinite(t)) && (n(0, 0), n(this.plant.grid.w * z, this.plant.grid.h * z));
    const a = 24;
    return { x: t - a, y: e - a, w: s - t + 2 * a, h: i - e + 2 * a };
  }
  // -------------------------------------------------------------- render
  render() {
    if (!this.plant) return v;
    const t = this._view || this._contentBox(), e = new Map(this.plant.components.map((a) => [a.id, this._comp(a)])), s = new Map(this.plant.components.map((a) => [a.id, Ue(a, this.src)])), i = cn(this.plant, this.src), n = this.plant.pipes.map((a) => ({ pipe: a, route: ki(a, e) }));
    return this._segments = n.flatMap(
      ({ route: a }) => (a?.pts || []).slice(1).map((r, l) => {
        const d = a.pts[l];
        return { x1: Math.min(d.x, r.x) * z, x2: Math.max(d.x, r.x) * z, y1: Math.min(d.y, r.y) * z, y2: Math.max(d.y, r.y) * z };
      })
    ), this._pills = this.edit ? [] : this._placePills(e, n), f`
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
        ${this.edit ? this._grid() : v}
        <g class="pipes">
          ${n.map(({ pipe: a, route: r }) => {
      if (!r) return v;
      const l = Fn(r.pts), d = ln(a, s), u = dn(a.kind, i.get(a.id)), p = this.selected?.kind === "p" && this.selected.id === a.id;
      return $`<g class="pipe ${d ? "active" : ""} ${p ? "selected" : ""}" data-pipe=${a.id}
                @pointerdown=${(h) => this._onPipeDown(h, a.id)}>
              <path class="pipe-hit" d=${l} />
              ${p ? $`<path class="pipe-sel" d=${l} />` : v}
              <path class="pipe-outline" d=${l} />
              ${d ? $`<path class="pipe-halo" d=${l} style="stroke:${u}" />` : v}
              <path class="pipe-base" d=${l} style="stroke:${u}" />
              ${d ? $`<path class="pipe-flow" d=${l} />` : v}
            </g>`;
    })}
        </g>
        <g class="components">
          ${this.plant.components.map((a) => this._component(e.get(a.id), s.get(a.id)))}
        </g>
        <g class="pills">${this._pills.map((a) => this._anchorPill(a))}</g>
        ${this.edit ? this._editOverlays(e, n) : v}
      </svg>
    `;
  }
  _grid() {
    const { w: t, h: e } = this.plant.grid;
    return $`
      <defs><pattern id="cp-grid" width=${z} height=${z} patternUnits="userSpaceOnUse">
        <circle cx="0" cy="0" r="1" class="grid-dot" />
      </pattern></defs>
      <rect class="grid-bg" x="0" y="0" width=${t * z} height=${e * z} fill="url(#cp-grid)" />`;
  }
  _transform(t) {
    const e = { ...Z[t.type], ...Wt(t) }, s = t.rot || 0;
    let i = `translate(${t.x * z} ${t.y * z})`;
    return t.flip && e.mirrorable && (i += ` translate(${e.w * z} 0) scale(-1 1)`), !e.rotatable || s === 0 ? i : s === 90 ? `${i} translate(${e.h * z} 0) rotate(90)` : s === 180 ? `${i} translate(${e.w * z} ${e.h * z}) rotate(180)` : `${i} translate(0 ${e.w * z}) rotate(270)`;
  }
  _component(t, e) {
    const s = { ...Z[t.type], ...Wt(t), ports: oe(t), badges: Ks(t) }, { w: i, h: n } = pt(t), a = (t.type === "value_tile" ? i : s.w) * z, r = (t.type === "value_tile" ? n : s.h) * z, l = (M) => {
      const E = this.src.get(t, M);
      return E?.available && E.num !== null ? E.num : void 0;
    }, d = (M) => {
      const E = this.src.get(t, M);
      return E?.available ? String(E.raw) : void 0;
    }, u = t.icon || this.plant.settings.typeIcons?.[t.type], p = u ? this.icons.get(u) : void 0, h = this.selected?.kind === "c" && this.selected.id === t.id;
    let m;
    t.type === "value_tile" ? m = this._tile(t, a, r) : t.type === "label" ? m = $`<text class="free-label" x="0" y=${z} style="font-size:${t.props.size || 18}px">${t.props.text || t.label}</text>` : p ? m = $`${e.has("running") ? $`<rect class="user-glow pulse" x="-4" y="-4" width=${a + 8} height=${r + 8} rx="10" />` : v}
        <image href=${p.data_url} x="0" y="0" width=${a} height=${r} preserveAspectRatio="xMidYMid meet" />` : m = jn({ c: t, w: a, h: r, flags: e, num: l, text: d });
    const g = !["junction", "label", "value_tile"].includes(t.type), _ = s.ports.some((M) => {
      const E = dt(t, M.id);
      return E?.dir === "b" && Math.abs(E.x - (t.x + i / 2)) < Math.max(0.6, i * 0.35);
    });
    let y = (t.x + i / 2) * z, b = (t.y + n) * z + (s.badges === "above" ? 16 : 18), k = "middle";
    if (_) {
      const M = Math.min(28, t.label.length) * 7.5;
      b = (t.y + n) * z + 4;
      const E = (t.x + i) * z + 6, T = t.x * z - 6, R = this._hitsPipe(E, b - 12, E + M, b + 3), G = this._hitsPipe(T - M, b - 12, T, b + 3);
      R && !G ? (y = T, k = "end") : (y = E, k = "start");
    }
    return $`
      <g class="comp ${h ? "selected" : ""}" data-id=${t.id}
         @pointerdown=${(M) => this._onCompDown(M, t)}>
        <g transform=${this._transform(t)}>
          ${m}
        </g>
        <rect class="comp-hit" x=${t.x * z - (t.type === "junction" ? 8 : 0)} y=${t.y * z - (t.type === "junction" ? 8 : 0)}
          width=${Math.max(16, i * z)} height=${Math.max(16, n * z)} rx="8" />
        ${h ? $`<rect class="sel-outline" x=${t.x * z - 6} y=${t.y * z - 6} width=${i * z + 12} height=${n * z + 12} rx="10" />` : v}
        ${g ? $`<text class="comp-label" x=${y} y=${b} text-anchor=${k}>${Ne(t.label, 28)}</text>` : v}
      </g>
      ${this._badgeLayout(t).map((M) => M.w ? this._pill(t, M.slot, M.x, M.y, M.w) : this._chip(t, M.slot, M.x, M.y))}
    `;
  }
  _chip(t, e, s, i) {
    const n = this.src.get(t, e), a = It(t, e), { text: r, unit: l } = yt(n, a), d = t.type === "value_tile" ? e : $t(t.type, e), p = a === "temp" && n?.num !== null && n?.available ? tt(n.num, "#8b949e") : "var(--cp-accent)";
    return $`
      <g class="chip ${n?.available === !1 ? "na" : ""}" @click=${(h) => this._slotClick(h, t, e)}>
        <rect x=${s} y=${i} width=${rt} height=${lt} rx="8" />
        <rect class="chip-accent" x=${s} y=${i + 7} width="3" height=${lt - 14} rx="1.5" style="fill:${p}" />
        <text class="chip-label" x=${s + 10} y=${i + 13}>${Ne(d)}</text>
        <text class="chip-value" x=${s + 10} y=${i + 28}>${r}<tspan class="chip-unit" dx="2">${l}</tspan></text>
      </g>`;
  }
  /**
   * Values anchored to a pipe ("at") sit on that pipe; values with a measuring point ("pos")
   * sit at that point. Positions avoid overlapping each other.
   */
  _placePills(t, e) {
    const s = [], i = [...t.values()].filter((a) => !["junction", "label"].includes(a.type)).map((a) => {
      const { w: r, h: l } = pt(a);
      return { x: a.x * z - 4, y: a.y * z - 4, w: r * z + 8, h: l * z + 26 };
    }), n = (a, r, l, d = !0) => s.every((u) => a + l + 4 <= u.x || a >= u.x + u.w + 4 || r + ut + 3 <= u.y || r >= u.y + ut + 3) && (!d || i.every((u) => a + l <= u.x || a >= u.x + u.w || r + ut <= u.y || r >= u.y + u.h));
    for (const a of t.values()) {
      const r = new Set(this._shownSlots(a));
      for (const l of js(a)) {
        if (!r.has(l.key) || !l.at && !l.pos) continue;
        const d = this._pillWidth(a, l.key);
        if (l.pos) {
          s.push({ c: a, slot: l.key, x: (a.x + l.pos[0]) * z - d / 2, y: (a.y + l.pos[1]) * z - ut / 2, w: d });
          continue;
        }
        let u = null, p = { c: a.id, p: l.at };
        const h = /* @__PURE__ */ new Set();
        for (let m = 0; m < 4 && p && !u; m++) {
          const g = p, _ = e.find(
            ({ pipe: E }) => !h.has(E.id) && (E.from.c === g.c && E.from.p === g.p || E.to.c === g.c && E.to.p === g.p)
          );
          if (p = null, !_?.route) break;
          h.add(_.pipe.id);
          const y = _.pipe.from.c === g.c && _.pipe.from.p === g.p, b = y ? _.route.pts : [..._.route.pts].reverse();
          for (let E = 1; E < b.length && !u; E++) {
            const T = b[E - 1], R = b[E], G = Math.abs(T.x - R.x) + Math.abs(T.y - R.y);
            if (!(G < 1 || T.x === R.x && G < 3))
              for (const et of [0.5, 0.35, 0.65, 0.2, 0.8]) {
                const A = (T.x + (R.x - T.x) * et) * z, D = (T.y + (R.y - T.y) * et) * z;
                if (T.y === R.y && G * z < d + 8) break;
                const K = A - d / 2, C = D - ut / 2;
                if (n(K, C, d)) {
                  u = { x: K, y: C };
                  break;
                }
              }
          }
          const k = y ? _.pipe.to : _.pipe.from, M = t.get(k.c);
          if (!u && M && Z[M.type].passive && M.type !== "pump") {
            const E = oe(M).find((T) => T.id !== k.p && e.some(({ pipe: R }) => !h.has(R.id) && (R.from.c === M.id && R.from.p === T.id || R.to.c === M.id && R.to.p === T.id)));
            E && (p = { c: M.id, p: E.id });
          }
        }
        if (!u) {
          const m = dt(a, l.at);
          if (!m) continue;
          u = { x: m.x * z + 6, y: m.y * z + 6 };
        }
        s.push({ c: a, slot: l.key, ...u, w: d });
      }
    }
    return s;
  }
  _pillWidth(t, e) {
    const { text: s, unit: i } = yt(this.src.get(t, e), It(t, e));
    return Math.round((Ns(t.type, e).length + s.length + i.length) * 6.4 + 22);
  }
  _anchorPill(t) {
    const e = this.src.get(t.c, t.slot), s = It(t.c, t.slot), { text: i, unit: n } = yt(e, s), a = s === "temp" && e?.available && e.num !== null ? tt(e.num, "#8b949e") : "var(--cp-accent)";
    return $`
      <g class="apill" @click=${(r) => this._slotClick(r, t.c, t.slot)}>
        <title>${$t(t.c.type, t.slot)}</title>
        <rect x=${t.x} y=${t.y} width=${t.w} height=${ut} rx=${ut / 2} style="stroke:${a}" />
        <text x=${t.x + 8} y=${t.y + 13}><tspan class="apill-label">${Ns(t.c.type, t.slot)}</tspan> ${i}<tspan class="chip-unit" dx="1">${n}</tspan></text>
      </g>`;
  }
  /** Compact value-only pill drawn inside a tank at the sensor height. */
  _pill(t, e, s, i, n) {
    const a = this.src.get(t, e), { text: r, unit: l } = yt(a, It(t, e));
    return $`
      <g class="pill" @click=${(d) => this._slotClick(d, t, e)}>
        <title>${$t(t.type, e)}</title>
        <rect x=${s} y=${i} width=${n} height="22" rx="11" />
        <text x=${s + n / 2} y=${i + 15.5} text-anchor="middle">${r}<tspan class="chip-unit" dx="1">${l}</tspan></text>
      </g>`;
  }
  _tile(t, e, s) {
    const i = t.props.entries || [];
    return $`
      <rect class="tile" x="0" y="0" width=${e} height=${s} rx="12" />
      <text class="tile-title" x="14" y="22">${t.label}</text>
      ${i.map((n, a) => {
      const r = this.src.get(t, n.slot), { text: l, unit: d } = yt(r, n.kind || "text"), u = 46 + a * 26;
      return $`<g class="tile-row" @click=${(p) => this._slotClick(p, t, n.slot)}>
          <text class="tile-label" x="14" y=${u}>${Ne(n.label || n.slot, 22)}</text>
          <text class="tile-value" x=${e - 14} y=${u} text-anchor="end">${l} <tspan class="chip-unit">${d}</tspan></text></g>`;
    })}`;
  }
  _editOverlays(t, e) {
    const s = [];
    for (const n of t.values())
      for (const a of oe(n)) {
        const r = dt(n, a.id);
        if (!r) continue;
        const l = this._connect?.c === n.id && this._connect.p === a.id, d = n.type === "junction" ? { l: -7, r: 7, t: 0, b: 0 }[r.dir] ?? 0 : 0, u = n.type === "junction" ? { t: -7, b: 7, l: 0, r: 0 }[r.dir] ?? 0 : 0;
        s.push($`<circle class="port ${l ? "src" : ""} ${this._connect ? "target" : ""}" cx=${r.x * z + d} cy=${r.y * z + u} r=${n.type === "junction" ? 4 : 6}
          @pointerdown=${(p) => this._onPortDown(p, { c: n.id, p: a.id })}><title>${a.id}</title></circle>`);
      }
    let i = v;
    if (this.selected?.kind === "p") {
      const n = e.find((r) => r.pipe.id === this.selected.id)?.route, a = n ? Un(n.pts, n.horizontalStart) : null;
      n && a && (i = $`<rect class="bend-handle ${n.horizontalStart ? "ew" : "ns"}" x=${a.x * z - 7} y=${a.y * z - 7} width="14" height="14" rx="4"
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
        const [s, i] = [...this._pointers.values()], n = e.dist / Math.max(10, Math.hypot(s.x - i.x, s.y - i.y)), a = e.view, r = a.x + a.w / 2, l = a.y + a.h / 2;
        this._view = { x: r - a.w * n / 2, y: l - a.h * n / 2, w: a.w * n, h: a.h * n };
        return;
      }
      if (e.type === "pan") {
        const i = this.renderRoot.querySelector("svg").getBoundingClientRect(), n = Math.max(e.view.w / i.width, e.view.h / i.height), a = (t.clientX - e.cx) * n, r = (t.clientY - e.cy) * n;
        !e.moved && Math.abs(t.clientX - e.cx) + Math.abs(t.clientY - e.cy) > 4 && (e.moved = !0, this._capture(t)), e.moved && (this._view = { ...e.view, x: e.view.x - a, y: e.view.y - r });
        return;
      }
      if (e.type === "move") {
        const s = this._svgPoint(t);
        if (Math.abs(t.clientX - e.cx) + Math.abs(t.clientY - e.cy) > 3 && (e.moved = !0), !e.moved) return;
        const i = Math.max(0, Math.round(e.ox + (s.x - e.start.x) / z)), n = Math.max(0, Math.round(e.oy + (s.y - e.start.y) / z));
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
        const i = Math.round((e.horizontalStart ? s.x : s.y) / z);
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
fe.properties = {
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
}, fe.styles = q`
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
    .ipipe-flow { fill: none; stroke: var(--cp-flow); stroke-width: 1.8; stroke-dasharray: 2 9; animation: cp-flow 0.9s linear infinite; }
    .itag { fill: var(--cp-muted); font-size: 8.5px; font-weight: 700; }
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
let qe = fe;
customElements.get("cp-schematic") || customElements.define("cp-schematic", qe);
const ge = class ge extends Y {
  constructor() {
    super(...arguments), this.points = [], this.color = "var(--cp-accent)", this.step = !1;
  }
  render() {
    const t = this.points.filter((m) => m.v !== null);
    if (t.length < 2) return f`<div class="empty">${c("ov.no_history")}</div>`;
    const e = 300, s = 90, i = t[0].t, n = t[t.length - 1].t;
    let a = Math.min(...t.map((m) => m.v)), r = Math.max(...t.map((m) => m.v));
    r - a < 1e-6 && (r += 1, a -= 1);
    const l = (r - a) * 0.1;
    a -= l, r += l;
    const d = (m) => (m - i) / Math.max(1, n - i) * e, u = (m) => s - (m - a) / (r - a) * s;
    let p = `M ${d(t[0].t)} ${u(t[0].v)}`;
    for (let m = 1; m < t.length; m++)
      this.step ? p += ` H ${d(t[m].t)} V ${u(t[m].v)}` : p += ` L ${d(t[m].t)} ${u(t[m].v)}`;
    const h = `${p} L ${e} ${s} L 0 ${s} Z`;
    return f`<svg viewBox="0 0 ${e} ${s}" preserveAspectRatio="none">
      <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color=${this.color} stop-opacity="0.35" /><stop offset="1" stop-color=${this.color} stop-opacity="0" />
      </linearGradient></defs>
      ${$`<path d=${h} fill="url(#sg)" /><path d=${p} fill="none" stroke=${this.color} stroke-width="2" vector-effect="non-scaling-stroke" />`}
    </svg>`;
  }
};
ge.properties = { points: { attribute: !1 }, color: {}, step: { type: Boolean } }, ge.styles = q`
    :host { display: block; height: 90px; }
    svg { width: 100%; height: 100%; display: block; overflow: visible; }
    .empty { height: 100%; display: grid; place-items: center; color: var(--cp-muted); font-size: 12px; }
  `;
let Je = ge;
const _e = class _e extends Y {
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
    if (!this.component) return v;
    const t = this.component, e = It(t, this.slotKey), s = this.src.get(t, this.slotKey), { text: i, unit: n } = yt(s, e), a = this.src.entityOf(t, this.slotKey), r = this._hist || [], l = r.map((g) => g.v).filter((g) => g !== null), d = e === "temp" && s?.num !== null && s?.num !== void 0 ? tt(s.num, "#3ddc97") : "var(--cp-accent)", u = 320, p = Math.max(12, Math.min(window.innerWidth - u - 12, this.x - u / 2)), h = Math.max(12, Math.min(window.innerHeight - 260, this.y + 14)), m = t.type === "value_tile" ? this.slotKey : $t(t.type, this.slotKey);
    return f`
      <div class="backdrop" @pointerdown=${this._close}></div>
      <div class="pop card" style="left:${p}px; top:${h}px; width:${u}px">
        <div class="row head">
          <div>
            <div class="title">${m}</div>
            <div class="muted sub">${t.label}</div>
          </div>
          <span class="spacer"></span>
          <button class="ghost icon" @click=${this._close} aria-label=${c("close")}>${V("close")}</button>
        </div>
        <div class="now"><span class="val">${i}</span><span class="unit">${n}</span></div>
        <div class="muted cap">${c("ov.history24")}</div>
        ${this._hist === null ? f`<div class="loading"></div>` : f`<cp-sparkline .points=${r} .color=${d} .step=${e === "bool"}></cp-sparkline>`}
        ${l.length && e !== "bool" && e !== "enum" ? f`<div class="row stats">
              <span>${c("ov.min")} <b>${I(Math.min(...l))}</b></span>
              <span>${c("ov.max")} <b>${I(Math.max(...l))}</b></span>
            </div>` : v}
        ${a ? f`<div class="row foot"><code>${a}</code><span class="spacer"></span>
              <button @click=${() => this._more(a)}>${c("ov.open_entity")}</button></div>` : v}
      </div>
    `;
  }
};
_e.properties = {
  component: { attribute: !1 },
  slotKey: {},
  src: { attribute: !1 },
  x: { type: Number },
  y: { type: Number },
  version: { type: Number },
  _hist: { state: !0 }
}, _e.styles = [
  it,
  q`
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
let Xe = _e;
const Zn = { info: "info", notice: "notice", warning: "warn", error: "error" };
function Yn(o) {
  const t = { ...o.params };
  return t.label_sfx = t.label ? ` (${t.label})` : "", c(`msgk.${o.key}`, t);
}
const ve = class ve extends Y {
  constructor() {
    super(...arguments), this.messages = [], this.compact = !1, this.canClear = !1, this._filter = "all";
  }
  _row(t) {
    const e = t.end_ts ? t.end_ts - t.ts : null;
    return f`<li class="msg ${t.level} ${t.active ? "active" : ""}">
      <span class="lv">${V(Zn[t.level] || "info")}</span>
      <div class="body">
        <div class="text">${Yn(t)}</div>
        <div class="meta">
          ${Ji(t.ts)}
          ${t.active ? f` · <b>${c("msg.active")}</b>` : e !== null ? f` · ${c("msg.duration", { duration: Xi(e) })}` : v}
        </div>
      </div>
    </li>`;
  }
  render() {
    const t = [...this.messages].sort((n, a) => a.ts - n.ts), e = this._filter === "all" ? t : t.filter((n) => n.level === this._filter), s = e.filter((n) => n.active), i = e.filter((n) => !n.active).slice(0, this.compact ? 12 : 300);
    return f`
      ${this.compact ? v : f`<div class="row filters">
            ${["all", "error", "warning", "notice", "info"].map(
      (n) => f`<button class=${this._filter === n ? "primary" : ""} @click=${() => this._filter = n}>
                ${c(n === "all" ? "msg.filter_all" : `msg.level.${n}`)}</button>`
    )}
            <span class="spacer"></span>
            ${this.canClear ? f`<button @click=${() => this.dispatchEvent(new CustomEvent("clear"))}>${V("trash")} ${c("msg.clear")}</button>` : v}
          </div>`}
      ${s.length ? f`<h4>${c("msg.active")}</h4><ul>${s.map((n) => this._row(n))}</ul>` : v}
      <h4>${c("msg.history")}</h4>
      ${i.length ? f`<ul>${i.map((n) => this._row(n))}</ul>` : f`<div class="empty muted">${c("msg.empty")}</div>`}
    `;
  }
};
ve.properties = {
  messages: { attribute: !1 },
  compact: { type: Boolean },
  canClear: { type: Boolean },
  _filter: { state: !0 }
}, ve.styles = [
  it,
  q`
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
let Qe = ve;
customElements.get("cp-sparkline") || customElements.define("cp-sparkline", Je);
customElements.get("cp-slot-popover") || customElements.define("cp-slot-popover", Xe);
customElements.get("cp-messages") || customElements.define("cp-messages", Qe);
const Gn = [1, 10, 60, 300, 900], we = class we extends Y {
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
    const t = this._first("outdoor_unit"), e = this._first("indoor_unit"), s = this._first("dhw_tank"), i = this.plant.components.find((_) => _.type === "radiators" || _.type === "floor_heating"), n = this.plant.components.find((_) => _.type === "valve_3way" && _.props.role === "dhw_switch");
    let a = t ? Le(this.src.get(t, "activity")) : void 0;
    if (!a && t) {
      const _ = Ue(t, this.src), y = n ? Ue(n, this.src) : /* @__PURE__ */ new Set();
      a = _.has("running") ? y.has("b") ? "hot_water" : "heating" : "off";
    }
    const r = {
      heating: "#ff8a3d",
      hot_water: "#ff4f8b",
      defrost: "#6cc4ff",
      compressor_alarm: "#ff5a5f",
      off: "#8a97a6"
    }, l = this._num(t, "heat_power");
    let d = this._num(t, "el_power");
    const u = t ? this.src.get(t, "el_power")?.unit : void 0;
    d !== void 0 && u === "kW" && (d *= 1e3);
    const p = l !== void 0 && d !== void 0 && d > 50 && l > 0.2 ? l / (d / 1e3) : void 0, h = (_, y = 1) => _ === void 0 ? "–" : I(_, y), m = $i(this.plant, this.src), g = [
      { key: "mode", label: c("kpi.mode"), value: a ? c(`mode.${a}`) : "–", unit: "", color: r[a || "off"] },
      { key: "out", label: c("kpi.outdoor"), value: h(this._num(t, "outdoor_temp")), unit: "°C", comp: t, slot: "outdoor_temp" },
      { key: "heat", label: c("kpi.heat"), value: h(l), unit: "kW", comp: t, slot: "heat_power" },
      { key: "power", label: c("kpi.power"), value: d === void 0 ? "–" : d >= 1e3 ? I(d / 1e3, 2) : I(d, 0), unit: d !== void 0 && d >= 1e3 ? "kW" : "W", comp: t, slot: "el_power" },
      {
        key: "cop",
        label: c("kpi.cop"),
        value: h(p),
        unit: "",
        color: m ? xt[m.ampel] : void 0,
        sub: m ? `${c("kpi.target")} ${h(m.expected)}` : void 0
      },
      {
        key: "supply",
        label: c("kpi.supply"),
        value: h(this._num(e, "supply_temp")),
        unit: "°C",
        color: tt(this._num(e, "supply_temp"), ""),
        sub: this._num(e, "target_flow_temp") !== void 0 ? `${c("kpi.target")} ${h(this._num(e, "target_flow_temp"))}` : void 0,
        comp: e,
        slot: "supply_temp"
      }
    ];
    return s && g.push({ key: "dhw", label: c("kpi.dhw"), value: h(this._num(s, "temp_top")), unit: "°C", color: tt(this._num(s, "temp_top"), ""), comp: s, slot: "temp_top" }), i && this._num(i, "room_temp") !== void 0 && g.push({ key: "room", label: c("kpi.room"), value: h(this._num(i, "room_temp")), unit: "°C", comp: i, slot: "room_temp" }), g;
  }
  _openPop(t) {
    this._pop = t.detail;
  }
  _scenario(t) {
    this.dispatchEvent(new CustomEvent("scenario", { detail: t, bubbles: !0, composed: !0 }));
  }
  _demoBar() {
    const t = this.sim;
    if (!t || !this.showDemo) return v;
    const e = ["winter", "transition", "shower", "defrost", "dim14a", "pv", "disinfect", "fault", "reset"], s = { dim14a: t.dim14a, pv: t.pv, fault: t.fault, disinfect: t.disinfect };
    return f`<div class="demo">
      <span class="demo-tag">${V("flask")} ${c("demo.active")}</span>
      <span class="clock" title=${c("demo.time")}>${gi(t.time)}</span>
      <label class="ctl">${c("demo.speed")}
        <select @change=${(i) => t.speed = Number(i.target.value)}>
          ${Gn.map((i) => f`<option value=${i} ?selected=${t.speed === i}>${i}×</option>`)}
        </select>
      </label>
      <label class="ctl slider">${c("demo.outdoor")} <b>${I(t.outdoorMean, 0)} °C</b>
        <input type="range" min="-15" max="20" step="1" .value=${String(t.outdoorMean)}
          @input=${(i) => t.outdoorMean = Number(i.target.value)} />
      </label>
      ${this.narrow ? f`<select class="scn-select" @change=${(i) => {
      const n = i.target;
      n.value && this._scenario(n.value), n.value = "";
    }}>
            <option value="">${c("demo.scenarios")} …</option>
            ${e.map((i) => f`<option value=${i}>${s[i] ? "✓ " : ""}${c(`scn.${i}`)}</option>`)}
          </select>` : f`<div class="scn">
            ${e.map(
      (i) => f`<button class=${s[i] ? "primary" : ""} @click=${() => this._scenario(i)}>${c(`scn.${i}`)}</button>`
    )}
          </div>`}
    </div>`;
  }
  render() {
    if (!this.plant) return v;
    const t = this._kpis(), e = this.messages.filter((s) => s.active && (s.level === "warning" || s.level === "error")).length;
    return f`
      ${this._demoBar()}
      ${this.showKpis ? f`<div class="kpis">
        ${t.map(
      (s) => f`<button class="kpi" ?disabled=${!s.comp} @click=${(i) => s.comp && (this._pop = { component: s.comp, slot: s.slot, x: i.clientX, y: i.clientY })}>
            <span class="k-label">${s.label}</span>
            <span class="k-value" style=${s.color ? `color:${s.color}` : ""}>${s.value}<small>${s.unit}</small></span>
            ${s.sub ? f`<span class="k-sub">${s.sub}</span>` : v}
          </button>`
    )}
      </div>` : v}
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
            <button class="icon" title=${c("zoom_in")} @click=${() => this._sch()?.zoom(0.8)}>${V("plus")}</button>
            <button class="icon" title=${c("zoom_out")} @click=${() => this._sch()?.zoom(1.25)}>${V("minus")}</button>
            <button class="icon" title=${c("fit")} @click=${() => this._sch()?.fit()}>${V("fit")}</button>
            ${this.narrow || !this.showSide ? v : f`<button class="icon" title=${c("msg.title")} @click=${() => this._side = !this._side}>
                  ${V("bell")}${e ? f`<span class="badge">${e}</span>` : v}</button>`}
          </div>
        </div>
        ${this.showSide && (this._side || this.narrow) ? f`<aside class="side card">
              <div class="side-head"><b>${c("msg.title")}</b></div>
              <cp-messages compact .messages=${this.messages}></cp-messages>
            </aside>` : v}
      </div>
      ${this._pop ? f`<cp-slot-popover
            .component=${this._pop.component}
            .slotKey=${this._pop.slot}
            .src=${this.src}
            .x=${this._pop.x}
            .y=${this._pop.y}
            .version=${this.version}
            @close=${() => this._pop = null}
          ></cp-slot-popover>` : v}
    `;
  }
  _sch() {
    return this.renderRoot.querySelector("cp-schematic");
  }
};
we.properties = {
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
}, we.styles = [
  it,
  q`
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
let ts = we;
customElements.get("cp-overview") || customElements.define("cp-overview", ts);
function he(o) {
  return JSON.parse(JSON.stringify(o));
}
function le(o) {
  const { w: t, h: e } = pt(o);
  return { x0: o.x, y0: o.y, x1: o.x + t, y1: o.y + e };
}
function ue(o) {
  const t = new Map(o.components.map((p) => [p.id, p])), e = [];
  let s = 0;
  for (const p of o.pipes) {
    const h = ki(p, t);
    if (h)
      for (let m = 1; m < h.pts.length; m++)
        e.push({ pipe: p.id, a: h.pts[m - 1], b: h.pts[m] }), s += Math.abs(h.pts[m].x - h.pts[m - 1].x) + Math.abs(h.pts[m].y - h.pts[m - 1].y);
  }
  let i = 0, n = 0;
  for (let p = 0; p < e.length; p++)
    for (let h = p + 1; h < e.length; h++) {
      const m = e[p], g = e[h];
      if (m.pipe === g.pipe) continue;
      const _ = m.a.y === m.b.y, y = g.a.y === g.b.y;
      if (_ !== y) {
        const b = _ ? m : g, k = _ ? g : m, M = Math.min(b.a.x, b.b.x), E = Math.max(b.a.x, b.b.x), T = Math.min(k.a.y, k.b.y), R = Math.max(k.a.y, k.b.y);
        k.a.x > M && k.a.x < E && b.a.y > T && b.a.y < R && i++;
      } else _ && m.a.y === g.a.y ? Math.min(Math.max(m.a.x, m.b.x), Math.max(g.a.x, g.b.x)) - Math.max(Math.min(m.a.x, m.b.x), Math.min(g.a.x, g.b.x)) > 0 && n++ : !_ && m.a.x === g.a.x && Math.min(Math.max(m.a.y, m.b.y), Math.max(g.a.y, g.b.y)) - Math.max(Math.min(m.a.y, m.b.y), Math.min(g.a.y, g.b.y)) > 0 && n++;
    }
  let a = 0;
  const r = new Map(o.pipes.map((p) => [p.id, /* @__PURE__ */ new Set([p.from.c, p.to.c])])), l = o.components.filter((p) => !["junction", "label"].includes(p.type));
  for (const p of e)
    for (const h of l) {
      if (r.get(p.pipe)?.has(h.id)) continue;
      const m = le(h), g = Math.min(p.a.x, p.b.x), _ = Math.max(p.a.x, p.b.x), y = Math.min(p.a.y, p.b.y), b = Math.max(p.a.y, p.b.y);
      _ > m.x0 && g < m.x1 && b > m.y0 && y < m.y1 && a++;
    }
  let d = 0;
  for (let p = 0; p < l.length; p++)
    for (let h = p + 1; h < l.length; h++) {
      const m = le(l[p]), g = le(l[h]);
      m.x1 + 1 > g.x0 && g.x1 + 1 > m.x0 && m.y1 + 1 > g.y0 && g.y1 + 1 > m.y0 && d++;
    }
  const u = i * 10 + n * 15 + a * 12 + d * 40 + s * 0.05;
  return { crossings: i + n, overlaps: d, through: a, length: s, total: u };
}
const si = {
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
function qn(o, t, e, s) {
  const i = he(o), n = i.components.filter((_) => !["label", "value_tile"].includes(_.type)), a = new Map(n.map((_) => [_.id, /* @__PURE__ */ new Set()]));
  for (const _ of i.pipes)
    a.get(_.from.c)?.add(_.to.c), a.get(_.to.c)?.add(_.from.c);
  const r = n.find((_) => _.type === "outdoor_unit") || n.find((_) => _.type === "indoor_unit") || n[0], l = /* @__PURE__ */ new Map();
  if (r) {
    l.set(r.id, 0);
    const _ = [r.id];
    for (; _.length; ) {
      const y = _.shift();
      for (const b of a.get(y) || [])
        if (!l.has(b)) {
          const k = n.find((E) => E.id === b), M = k.type === "junction" || Z[k.type].passive && k.type !== "tap";
          l.set(b, l.get(y) + (M ? 0.5 : 1)), _.push(b);
        }
    }
  }
  for (const _ of n) l.has(_.id) || l.set(_.id, 0);
  const u = [...new Set([...l.values()].map((_) => Math.round(_ * 2)))].sort((_, y) => _ - y).map((_) => n.filter((y) => Math.round(l.get(y.id) * 2) === _)), p = s ? -1 : 1;
  for (const _ of u) _.sort((y, b) => p * ((si[y.type] ?? 5) - (si[b.type] ?? 5)));
  const h = /* @__PURE__ */ new Map(), m = () => u.forEach((_) => _.forEach((y, b) => h.set(y.id, b / Math.max(1, _.length - 1))));
  m();
  for (let _ = 0; _ < e; _++)
    for (const y of u) {
      const b = new Map(
        y.map((k) => {
          const M = [...a.get(k.id) || []].filter((E) => h.has(E));
          return [k.id, M.length ? M.reduce((E, T) => E + h.get(T), 0) / M.length : h.get(k.id)];
        })
      );
      y.sort((k, M) => b.get(k.id) - b.get(M.id)), m();
    }
  let g = 1;
  for (const _ of u) {
    const y = Math.max(1, ..._.map((k) => pt(k).w));
    let b = 2;
    for (const k of _) {
      const { w: M, h: E } = pt(k);
      k.x = Math.round(g + (y - M) / 2), k.y = b, b += E + t + (Z[k.type].badges === "below" ? 3 : 0);
    }
    g += y + t + 2;
  }
  for (const _ of i.pipes)
    delete _.via, delete _.bend;
  return i.grid = { w: Math.max(i.grid.w, g + 4), h: Math.max(i.grid.h, ...n.map((_) => _.y + pt(_).h + 6)) }, i;
}
function Jn(o) {
  const t = o.settings?.wizard;
  if (!t) return null;
  const e = o.components.find((h) => h.type === "indoor_unit"), s = (h) => o.components.some((m) => m.type === h), i = {
    ...t,
    indoorModel: e?.model || t.indoorModel,
    dhw: s("dhw_tank") ? "tank" : t.dhw,
    buffer: s("buffer") ? t.buffer === "none" ? "parallel" : t.buffer : "none",
    circulation: s("tap") ? o.components.some((h) => h.id === "circ") : t.circulation
  }, n = We(i, o), a = new Map(n.components.map((h) => [h.id, h])), r = he(o), l = [], d = [];
  for (const h of r.components) {
    const m = a.get(h.id);
    m && m.type === h.type ? (h.x = m.x, h.y = m.y, m.rot !== void 0 ? h.rot = m.rot : delete h.rot, m.flip ? h.flip = !0 : delete h.flip, l.push(h)) : d.push(h);
  }
  const u = (h) => `${h.from.c}.${h.from.p}>${h.to.c}.${h.to.p}`, p = new Map(n.pipes.map((h) => [u(h), h]));
  for (const h of r.pipes) {
    const m = p.get(u(h));
    delete h.bend, m?.via ? h.via = m.via : delete h.via;
  }
  r.grid = { w: Math.max(r.grid.w, n.grid.w), h: Math.max(r.grid.h, n.grid.h) };
  for (const h of d) {
    const { w: m, h: g } = pt(h), _ = (b, k) => [...l].every((M) => {
      const E = le(M);
      return b + m + 2 <= E.x0 || b >= E.x1 + 2 || k + g + 3 <= E.y0 || k >= E.y1 + 3;
    });
    let y = !1;
    for (let b = 2; b + g < r.grid.h + 20 && !y; b += 2)
      for (let k = 1; k + m < r.grid.w + 20 && !y; k += 2)
        _(k, b) && (h.x = k, h.y = b, y = !0);
    l.push(h);
  }
  return r;
}
function Xn(o, t = 400) {
  let e = he(o), s = ue(e).total, i = 12345;
  const n = () => (i = (i * 1103515245 + 12345) % 2147483648) / 2147483648, a = e.components.filter((r) => !["label", "value_tile"].includes(r.type)).map((r) => r.id);
  for (let r = 0; r < t; r++) {
    const l = he(e), u = new Map(l.components.map((m) => [m.id, m])).get(a[Math.floor(n() * a.length)]), p = n();
    if (p < 0.35) {
      const m = l.components.filter((_) => _.id !== u.id && Math.abs(_.x - u.x) <= 3 && a.includes(_.id));
      if (!m.length) continue;
      const g = m[Math.floor(n() * m.length)];
      [u.y, g.y] = [g.y, u.y];
    } else {
      const m = [-4, -2, 2, 4][Math.floor(n() * 4)];
      p < 0.7 ? u.y = Math.max(1, u.y + m) : u.x = Math.max(1, u.x + m);
    }
    const h = ue(l).total;
    h < s && (e = l, s = h);
  }
  return e;
}
function Qn(o) {
  const t = Jn(o), e = [];
  if (t) e.push({ plant: t, kind: "template" });
  else
    for (const i of [3, 5])
      for (const n of [0, 3])
        for (const a of [!1, !0]) e.push({ plant: qn(o, i, n, a), kind: "layered" });
  let s = null;
  for (const i of e) {
    const n = ue(i.plant);
    (!s || n.total < s.score.total) && (s = { plant: i.plant, kind: i.kind, score: n });
  }
  if (s.kind === "layered" || s.score.crossings > 2) {
    const i = Xn(s.plant), n = ue(i);
    n.total < s.score.total && (s = { plant: i, kind: s.kind, score: n });
  }
  return s;
}
const to = [
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
], eo = ["supply", "return", "dhw_hot", "dhw_cold", "circulation"], Ke = {
  pump: ["running", "!running"],
  mixer: ["running"],
  valve_3way: ["a", "b"],
  outdoor_unit: ["running", "defrost", "!defrost"],
  indoor_unit: ["running", "a", "b", "aux", "pc1"],
  tap: ["flowing"],
  dhw_tank: ["charging"]
};
function Et(o) {
  return JSON.parse(JSON.stringify(o));
}
const Dt = class Dt extends Y {
  constructor() {
    super(...arguments), this.value = "", this.placeholder = "", this._listId = `cp-ents-${Dt._uid++}`;
  }
  _change(t) {
    const e = t.target.value.trim();
    this.value = e, this.dispatchEvent(new CustomEvent("value-changed", { detail: e }));
  }
  render() {
    const t = this.hass ? Object.keys(this.hass.states).sort() : [];
    return f`<input
        list=${this._listId}
        .value=${this.value || ""}
        placeholder=${this.placeholder || c("ed.entity_search")}
        @change=${this._change}
      />
      <datalist id=${this._listId}>
        ${t.map((e) => f`<option value=${e}>${this.hass.states[e].attributes.friendly_name || ""}</option>`)}
      </datalist>`;
  }
};
Dt.properties = { hass: { attribute: !1 }, value: {}, placeholder: {} }, Dt._uid = 0, Dt.styles = [it, q`:host { display: block; min-width: 0; } input { font-size: 12px; padding: 6px 8px; }`];
let es = Dt;
customElements.get("cp-entity-picker") || customElements.define("cp-entity-picker", es);
const ye = class ye extends Y {
  constructor() {
    super(...arguments), this.icons = /* @__PURE__ */ new Map(), this.version = 0, this._sel = null, this._hint = "", this._dirty = !1, this._undo = [], this._redo = [], this._onKey = (t) => {
      const e = t.composedPath()[0]?.tagName;
      e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || ((t.key === "Delete" || t.key === "Backspace") && this._sel ? (t.preventDefault(), this._delete()) : (t.ctrlKey || t.metaKey) && t.key.toLowerCase() === "z" ? (t.preventDefault(), t.shiftKey ? this._doRedo() : this._doUndo()) : t.key.toLowerCase() === "r" && this._sel?.kind === "c" && this._rotate());
    };
  }
  willUpdate() {
    this.plant && this.plant !== this._source && (this._source = this.plant, this._draft = Et(this.plant), this._undo = [], this._redo = [], this._dirty = !1, this._sel = null);
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
    const s = Et(this._draft);
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
    const e = Z[t], s = this._newId(`${t}_`), i = {
      id: s,
      type: t,
      label: t === "junction" ? "" : c(`type.${t}`),
      ...this._freeSpot(e.variants ? Wt({ type: t, props: {} }).w : e.w, e.variants ? Wt({ type: t, props: {} }).h : e.h),
      bindings: {},
      props: t === "value_tile" ? { entries: [] } : t === "label" ? { text: c("type.label"), size: 18 } : {}
    };
    t === "pump" && (i.props.role = "other"), this._commit((n) => n.components.push(i)), this._sel = { kind: "c", id: s };
  }
  /** First grid position where a w×h box (plus margin) does not overlap anything. */
  _freeSpot(t, e) {
    const s = this._draft.components.map((n) => ({ c: n, ...pt(n) })), i = (n, a) => s.every(({ c: r, w: l, h: d }) => n + t + 1 <= r.x || n >= r.x + l + 1 || a + e + 2 <= r.y || a >= r.y + d + 3);
    for (let n = 1; n + e < this._draft.grid.h; n += 2)
      for (let a = 1; a + t < this._draft.grid.w; a += 2) if (i(a, n)) return { x: a, y: n };
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
    !t || !Z[t.type].rotatable || this._commit((e) => {
      const s = e.components.find((i) => i.id === t.id);
      s.rot = ((s.rot || 0) + 90) % 360;
    });
  }
  _duplicate() {
    const t = this._comp();
    if (!t) return;
    const e = this._newId(`${t.type}_`);
    this._commit((s) => s.components.push({ ...Et(t), id: e, x: t.x + 2, y: t.y + 2 })), this._sel = { kind: "c", id: e };
  }
  _connect(t, e) {
    const s = this._comp(t.c), i = this._comp(e.c), n = dt(s, t.p), a = dt(i, e.p), r = n?.def.kind || a?.def.kind || "supply", l = [], d = [s, i].find((p) => p.type === "pump");
    d && l.push({ c: d.id, s: "running" });
    for (const [p, h] of [
      [s, t],
      [i, e]
    ])
      p.type === "valve_3way" && (h.p === "a" || h.p === "b") && l.push({ c: p.id, s: h.p });
    const u = this._newId("p");
    this._commit((p) => p.pipes.push({ id: u, from: t, to: e, kind: r, flow: l })), this._sel = { kind: "p", id: u };
  }
  _set(t, e = !0) {
    const s = this._sel?.id;
    this._commit((i) => {
      const n = i.components.find((a) => a.id === s);
      n && t(n);
    }, e);
  }
  _setPipe(t, e = !0) {
    const s = this._sel?.id;
    this._commit((i) => {
      const n = i.pipes.find((a) => a.id === s);
      n && t(n);
    }, e);
  }
  _autoArrange() {
    const t = Qn(this._draft);
    this._commit((e) => {
      e.components = t.plant.components, e.pipes = t.plant.pipes, e.grid = t.plant.grid;
    }), this._sel = null, this._hint = c(t.kind === "template" ? "ed.auto_done_tpl" : "ed.auto_done", { crossings: t.score.crossings }), window.setTimeout(() => this._hint = "", 6e3);
  }
  _save() {
    this.dispatchEvent(new CustomEvent("save", { detail: Et(this._draft), bubbles: !0, composed: !0 })), this._dirty = !1;
  }
  _discard() {
    this._draft = Et(this.plant), this._undo = [], this._redo = [], this._dirty = !1, this._sel = null;
  }
  // ------------------------------------------------------------ events
  _onBend(t) {
    const { id: e, bend: s, live: i } = t.detail;
    if (i) {
      this._bendStart || (this._bendStart = JSON.stringify(this._draft));
      const n = Et(this._draft), a = n.pipes.find((r) => r.id === e);
      a && (a.bend = s, delete a.via), this._draft = n;
    } else this._bendStart && (this._undo.push(this._bendStart), this._bendStart = void 0, this._dirty = !0);
  }
  // ------------------------------------------------------------ render
  render() {
    if (!this._draft) return v;
    const t = this._sel;
    return f`
      <div class="toolbar">
        <button class="icon" title=${c("undo")} ?disabled=${!this._undo.length} @click=${this._doUndo}>${V("undo")}</button>
        <button class="icon" title=${c("redo")} ?disabled=${!this._redo.length} @click=${this._doRedo}>${V("redo")}</button>
        <button class="icon" title=${c("ed.rotation")} ?disabled=${!(t?.kind === "c" && Z[this._comp()?.type || "label"].rotatable)} @click=${this._rotate}>${V("rotate")}</button>
        <button class="icon" title=${c("ed.duplicate")} ?disabled=${t?.kind !== "c"} @click=${this._duplicate}>${V("copy")}</button>
        <button class="icon danger" title=${c("delete")} ?disabled=${!t} @click=${this._delete}>${V("trash")}</button>
        <button title=${c("ed.auto_title")} @click=${this._autoArrange}>${V("wand")} ${c("ed.auto")}</button>
        <span class="hint">${this._hint}</span>
        <span class="spacer"></span>
        ${this._dirty ? f`<span class="dirty">${c("unsaved")}</span>
          <button @click=${this._discard}>${c("discard")}</button>` : v}
        <button class="primary" ?disabled=${!this._dirty} @click=${this._save}>${V("save")} ${c("save")}</button>
      </div>
      <div class="layout">
        <aside class="palette card">
          <div class="cap">${c("ed.palette")}</div>
          ${to.map((e) => f`<button class="pal" @click=${() => this._add(e)}>${V("plus")} ${c(`type.${e}`)}</button>`)}
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
        <aside class="props card">${t?.kind === "c" ? this._compProps() : t?.kind === "p" ? this._pipeProps() : f`<p class="muted">${c("ed.nothing")}</p>`}</aside>
      </div>
    `;
  }
  _num(t, e, s, i = 1) {
    return f`<label class="field">${t}<input type="number" step=${i} .value=${e ?? ""} @change=${(n) => s(Number(n.target.value))} /></label>`;
  }
  _compProps() {
    const t = this._comp();
    if (!t) return v;
    const e = Z[t.type], s = new Set(t.show ?? vt(t).filter((n) => n.show).map((n) => n.key)), i = [...this.icons.values()];
    return f`
      <div class="ptitle">${c(`type.${t.type}`)} <code>${t.id}</code></div>
      ${t.type !== "junction" ? f`<label class="field">${c("ed.label")}<input .value=${t.label} @change=${(n) => this._set((a) => a.label = n.target.value)} /></label>` : v}
      ${t.type === "outdoor_unit" ? f`<label class="field">${c("ed.model")}<select @change=${(n) => this._set((a) => a.model = n.target.value)}>
              ${pe.map((n) => f`<option value=${n.id} ?selected=${n.id === t.model}>${n.label}</option>`)}
            </select></label>
            ${this._num(c("ed.nominal"), t.props.nominal_kw, (n) => this._set((a) => a.props.nominal_kw = n), 0.1)}
            ${this._num(c("ed.cop_ref"), t.props.cop_ref ?? 4.9, (n) => this._set((a) => a.props.cop_ref = n), 0.1)}` : v}
      ${t.type === "indoor_unit" ? f`<label class="field">${c("ed.model")}<select @change=${(n) => this._set((a) => a.model = n.target.value)}>
              ${$s.map((n) => f`<option value=${n.id} ?selected=${n.id === t.model}>${n.label}</option>`)}
            </select></label>
            ${this._num(c("wz.aux_kw"), t.props.aux_kw, (n) => this._set((a) => a.props.aux_kw = n), 1)}
            <div class="cap">${c("ed.input_labels")}</div>
            ${[1, 2, 3, 4].map(
      (n) => f`<label class="field">${c(`slot.input${n}`)}<input .value=${t.props.input_labels?.[`input${n}`] || ""}
                @change=${(a) => this._set((r) => r.props.input_labels = { ...r.props.input_labels || {}, [`input${n}`]: a.target.value })} /></label>`
    )}
            <div class="cap">${c("ed.pressure_limits")}</div>
            <div class="two">
              ${this._num("min", t.props.pressure_min ?? 1, (n) => this._set((a) => a.props.pressure_min = n), 0.1)}
              ${this._num("max", t.props.pressure_max ?? 2.7, (n) => this._set((a) => a.props.pressure_max = n), 0.1)}
            </div>` : v}
      ${t.type === "buffer" || t.type === "dhw_tank" ? this._num(c("ed.volume"), t.props.volume, (n) => this._set((a) => a.props.volume = n)) : v}
      ${e.roles ? f`<label class="field">${c("ed.role")}<select @change=${(n) => this._set((a) => a.props.role = n.target.value)}>
            ${e.roles.map((n) => f`<option value=${n} ?selected=${t.props.role === n}>${c(`role.${n}`)}</option>`)}
          </select></label>` : v}
      ${["radiators", "floor_heating", "mixer", "pump"].includes(t.type) ? this._num(c("ed.circuit"), t.props.circuit ?? 1, (n) => this._set((a) => a.props.circuit = n)) : v}
      ${t.type === "dhw_tank" ? this._num(c("ed.dhw_circuit"), t.props.dhw_circuit ?? 1, (n) => this._set((a) => a.props.dhw_circuit = n)) : v}
      ${t.type === "label" ? f`<label class="field">${c("ed.text")}<input .value=${t.props.text || ""} @change=${(n) => this._set((a) => a.props.text = n.target.value)} /></label>
            ${this._num("px", t.props.size || 18, (n) => this._set((a) => a.props.size = n))}` : v}
      ${e.rotatable ? f`<label class="field">${c("ed.rotation")}<select @change=${(n) => this._set((a) => a.rot = Number(n.target.value))}>
            ${[0, 90, 180, 270].map((n) => f`<option value=${n} ?selected=${(t.rot || 0) === n}>${n}°</option>`)}
          </select></label>` : v}
      ${e.mirrorable ? f`<label class="field check"><input type="checkbox" .checked=${!!t.flip} @change=${(n) => this._set((a) => {
      n.target.checked ? a.flip = !0 : delete a.flip;
    })} />${c("ed.flip")}</label>` : v}
      ${["junction", "label", "value_tile"].includes(t.type) ? v : f`<label class="field">${c("ed.icon")}<select @change=${(n) => this._set((a) => {
      const r = n.target.value;
      r ? a.icon = r : delete a.icon;
    })}>
            <option value="">${c("ed.icon_default")}</option>
            ${i.map((n) => f`<option value=${n.id} ?selected=${n.id === t.icon}>${n.name}</option>`)}
          </select></label>`}
      ${t.type === "value_tile" ? this._tileEntries(t) : this._bindings(t, s)}
    `;
  }
  _bindings(t, e) {
    const s = vt(t);
    return s.length ? f`<div class="cap">${c("ed.bindings")}</div>
      <div class="bindings">
        ${s.map((i) => {
      const n = this.src.get(t, i.key), { text: a, unit: r } = yt(n, i.kind);
      return f`<div class="bind">
            <div class="bhead">
              <label class="show" title=${c("ed.show")}><input type="checkbox" .checked=${e.has(i.key)}
                @change=${(l) => this._set((d) => {
        const u = new Set(d.show ?? vt(d).filter((p) => p.show).map((p) => p.key));
        l.target.checked ? u.add(i.key) : u.delete(i.key), d.show = vt(d).map((p) => p.key).filter((p) => u.has(p));
      })} /></label>
              <span class="bname">${$t(t.type, i.key)}</span>
              <span class="bval">${n ? `${a} ${r}` : ""}</span>
            </div>
            <cp-entity-picker .hass=${this.hass} .value=${t.bindings[i.key] || ""}
              @value-changed=${(l) => this._set((d) => {
        l.detail ? d.bindings[i.key] = l.detail : delete d.bindings[i.key];
      })}></cp-entity-picker>
          </div>`;
    })}
      </div>` : v;
  }
  _tileEntries(t) {
    const e = t.props.entries || [], s = ["temp", "power_kw", "power_w", "energy", "percent", "pressure", "flow", "count", "bool", "text"];
    return f`<div class="cap">${c("ed.entries")}</div>
      ${e.map(
      (i, n) => f`<div class="bind">
          <div class="two">
            <input .value=${i.label || ""} placeholder=${c("ed.label")} @change=${(a) => this._set((r) => r.props.entries[n].label = a.target.value)} />
            <select @change=${(a) => this._set((r) => r.props.entries[n].kind = a.target.value)}>
              ${s.map((a) => f`<option value=${a} ?selected=${i.kind === a}>${a}</option>`)}
            </select>
          </div>
          <div class="row nowrap">
            <cp-entity-picker .hass=${this.hass} .value=${i.entity || ""}
              @value-changed=${(a) => this._set((r) => r.props.entries[n].entity = a.detail)}></cp-entity-picker>
            <button class="icon danger" @click=${() => this._set((a) => a.props.entries.splice(n, 1))}>${V("trash")}</button>
          </div>
        </div>`
    )}
      <button @click=${() => this._set((i) => {
      i.props.entries = [...i.props.entries || [], { slot: `v${Date.now().toString(36)}`, label: "", entity: "", kind: "text" }];
    })}>${V("plus")} ${c("ed.add_entry")}</button>`;
  }
  _conds(t, e) {
    const s = this._draft.components.filter((i) => Ke[i.type]);
    return f`${(t || []).map(
      (i, n) => f`<div class="row nowrap cond">
          <select @change=${(a) => this._setPipe((r) => r[e][n].c = a.target.value)}>
            ${s.map((a) => f`<option value=${a.id} ?selected=${a.id === i.c}>${a.label || a.id}</option>`)}
          </select>
          <select @change=${(a) => this._setPipe((r) => r[e][n].s = a.target.value)}>
            ${(Ke[this._comp(i.c)?.type || "pump"] || []).map(
        (a) => f`<option value=${a} ?selected=${a === i.s}>${a.startsWith("!") ? `${c("ed.not")} ${c(`state.${a.slice(1)}`)}` : c(`state.${a}`)}</option>`
      )}
          </select>
          <button class="icon danger" @click=${() => this._setPipe((a) => a[e].splice(n, 1))}>${V("close")}</button>
        </div>`
    )}
      <button ?disabled=${!s.length} @click=${() => this._setPipe((i) => {
      const n = s[0];
      i[e] = [...i[e] || [], { c: n.id, s: Ke[n.type][0] }];
    })}>${V("plus")} ${c("ed.add_cond")}</button>`;
  }
  _pipeProps() {
    const t = this._pipe();
    if (!t) return v;
    const e = (s) => this._comp(s)?.label || s;
    return f`
      <div class="ptitle">${c("ed.pipe")} <code>${t.id}</code></div>
      <p class="muted small">${e(t.from.c)} · ${t.from.p} → ${e(t.to.c)} · ${t.to.p}</p>
      <label class="field">${c("ed.kind")}<select @change=${(s) => this._setPipe((i) => i.kind = s.target.value)}>
        ${eo.map((s) => f`<option value=${s} ?selected=${s === t.kind}>${c(`kind.${s}`)}</option>`)}
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
ye.properties = {
  plant: { attribute: !1 },
  hass: { attribute: !1 },
  src: { attribute: !1 },
  icons: { attribute: !1 },
  version: { type: Number },
  _draft: { state: !0 },
  _sel: { state: !0 },
  _hint: { state: !0 },
  _dirty: { state: !0 }
}, ye.styles = [
  it,
  q`
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
let ss = ye;
customElements.get("cp-editor") || customElements.define("cp-editor", ss);
function kt(o, t, e) {
  o.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
}
const be = class be extends Y {
  constructor() {
    super(...arguments), this.plant = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._cfg = structuredClone(this.plant?.settings?.wizard || Ze());
  }
  _upd(t) {
    this._cfg = { ...this._cfg, ...t };
  }
  _generate() {
    this.plant && !confirm(c("wz.replace_confirm")) || kt(this, "plant-generated", We(this._cfg, this.plant));
  }
  render() {
    const t = this._cfg, e = (s, i = "text") => f`<input type=${i} .value=${String(t[s] ?? "")}
      @change=${(n) => {
      const a = n.target.value;
      this._upd({ [s]: i === "number" ? Number(a) : a });
    }} />`;
    return f`
      <div class="card wrap">
        <h2>${c("wz.title")}</h2>
        <p class="muted">${c("wz.intro")}</p>
        <label class="field">${c("wz.name")} ${e("name")}</label>

        <h3>${c("wz.hp")}</h3>
        <div class="grid">
          <label class="field">${c("wz.outdoor")}
            <select @change=${(s) => this._upd({ outdoorModel: s.target.value })}>
              ${pe.map((s) => f`<option value=${s.id} ?selected=${s.id === t.outdoorModel}>${s.label}</option>`)}
            </select></label>
          <label class="field">${c("ed.label")} ${e("outdoorLabel")}</label>
          <label class="field">${c("ed.nominal")} ${e("nominalKw", "number")}</label>
          <label class="field">${c("wz.indoor")}
            <select @change=${(s) => this._upd({ indoorModel: s.target.value })}>
              ${$s.map((s) => f`<option value=${s.id} ?selected=${s.id === t.indoorModel}>${s.label}</option>`)}
            </select></label>
          <label class="field">${c("ed.label")} ${e("indoorLabel")}</label>
          <div class="field check">
            <label><input type="checkbox" .checked=${t.aux} @change=${(s) => this._upd({ aux: s.target.checked })} /> ${c("wz.aux")}</label>
            ${t.aux ? f`<label class="field">${c("wz.aux_kw")} ${e("auxKw", "number")}</label>` : v}
          </div>
        </div>

        <h3>${c("wz.buffer")}</h3>
        <div class="grid">
          <div class="radios">
            ${["parallel", "serial", "none"].map(
      (s) => f`<label><input type="radio" name="buf" .checked=${t.buffer === s} @change=${() => this._upd({ buffer: s })} /> ${c(`wz.buffer.${s}`)}</label>`
    )}
          </div>
          ${t.buffer !== "none" ? f`<label class="field">${c("wz.buffer_volume")} ${e("bufferVolume", "number")}</label>
                <label class="field">${c("ed.label")} ${e("bufferLabel")}</label>` : v}
        </div>

        <h3>${c("wz.dhw")}</h3>
        <div class="grid">
          <div class="radios">
            ${["tank", "none"].map(
      (s) => f`<label><input type="radio" name="dhw" .checked=${t.dhw === s} @change=${() => this._upd({ dhw: s })} /> ${c(`wz.dhw.${s}`)}</label>`
    )}
          </div>
          ${t.dhw === "tank" ? f`<label class="field">${c("wz.dhw_volume")} ${e("dhwVolume", "number")}</label>
                <label class="field">${c("ed.label")} ${e("dhwLabel")}</label>
                <label class="check"><input type="checkbox" .checked=${t.circulation} @change=${(s) => this._upd({ circulation: s.target.checked })} /> ${c("wz.circulation")}</label>` : v}
        </div>

        <h3>${c("wz.circuits")}</h3>
        ${t.circuits.map(
      (s, i) => f`<div class="circuit">
            <b>${c("wz.circuit", { n: i + 1 })}</b>
            <input .value=${s.label} @change=${(n) => this._circ(i, { label: n.target.value })} />
            <select @change=${(n) => this._circ(i, { emitter: n.target.value })}>
              <option value="radiators" ?selected=${s.emitter === "radiators"}>${c("type.radiators")}</option>
              <option value="floor_heating" ?selected=${s.emitter === "floor_heating"}>${c("type.floor_heating")}</option>
            </select>
            <label class="check"><input type="checkbox" .checked=${s.mixed} @change=${(n) => this._circ(i, { mixed: n.target.checked })} /> ${c("wz.mixed")}</label>
            <button class="ghost danger" ?disabled=${t.circuits.length < 2} @click=${() => this._upd({ circuits: t.circuits.filter((n, a) => a !== i) })}>${c("wz.remove")}</button>
          </div>`
    )}
        <button ?disabled=${t.circuits.length >= 4} @click=${() => this._upd({ circuits: [...t.circuits, { emitter: "floor_heating", mixed: !0, label: c("wz.circuit", { n: t.circuits.length + 1 }) }] })}>
          ${V("plus")} ${c("wz.add_circuit")}</button>

        <h3>${c("wz.extras")}</h3>
        <div class="radios">
          <label><input type="checkbox" .checked=${t.separator} @change=${(s) => this._upd({ separator: s.target.checked })} /> ${c("wz.separator")}</label>
          <label><input type="checkbox" .checked=${t.expansion} @change=${(s) => this._upd({ expansion: s.target.checked })} /> ${c("wz.expansion")}</label>
        </div>

        <div class="row actions">
          <button @click=${() => this._cfg = Ze()}>${c("wz.example")}</button>
          <span class="spacer"></span>
          <button class="primary" @click=${this._generate}>${V("wand")} ${c("wz.generate")}</button>
        </div>
      </div>
    `;
  }
  _circ(t, e) {
    const s = this._cfg.circuits.map((i, n) => n === t ? { ...i, ...e } : i);
    this._upd({ circuits: s });
  }
};
be.properties = { plant: { attribute: !1 }, _cfg: { state: !0 } }, be.styles = [
  it,
  q`
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
let is = be;
const $e = class $e extends Y {
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
    kt(this, "save", t), this._msg = c("map.applied", { count: e });
  }
  render() {
    const t = !!this.hass?.__standalone, e = this._res, s = this.plant.components.flatMap(
      (i) => vt(i).filter((n) => !i.bindings[n.key] && !e?.suggestions.some((a) => a.component_id === i.id && a.slot === n.key)).map((n) => ({ c: i, s: n }))
    );
    return f`<div class="card">
      <h2>${c("map.title")}</h2>
      <p class="muted">${c("map.intro")}</p>
      ${t ? f`<p class="muted">${c("map.standalone")}</p>` : v}
      <div class="row">
        <button class="primary" ?disabled=${this._busy || t} @click=${this._scan}>${V("search")} ${c("map.scan")}</button>
        ${e ? f`<span class="muted">${c("map.found", { count: e.entity_count })}</span>` : v}
        <span class="spacer"></span>
        ${this._msg ? f`<span class="ok">${V("check")} ${this._msg}</span>` : v}
      </div>
      ${e && e.entity_count === 0 ? f`<div class="help"><b>${c("map.none")}</b><p>${c("map.none_help")}</p></div>` : v}
      ${e && e.suggestions.length ? f`<div class="tbl">
            <table>
              <thead><tr>
                <th><input type="checkbox" .checked=${this._sel.size === e.suggestions.length}
                  @change=${(i) => this._sel = i.target.checked ? new Set(e.suggestions.map((n) => `${n.component_id}|${n.slot}`)) : /* @__PURE__ */ new Set()} /></th>
                <th>${c("map.component")}</th><th>${c("map.slot")}</th><th>${c("map.entity")}</th><th>${c("map.value")}</th><th>${c("map.confidence")}</th>
              </tr></thead>
              <tbody>
                ${e.suggestions.map((i) => {
      const n = `${i.component_id}|${i.slot}`, a = this._comp(i.component_id), r = a?.bindings[i.slot], l = this.hass?.states[i.entity_id];
      return f`<tr>
                    <td><input type="checkbox" .checked=${this._sel.has(n)} @change=${(d) => {
        const u = new Set(this._sel);
        d.target.checked ? u.add(n) : u.delete(n), this._sel = u;
      }} /></td>
                    <td>${a?.label || i.component_id}</td>
                    <td>${$t(a?.type || "", i.slot)}</td>
                    <td><code>${i.entity_id}</code>${r && r !== i.entity_id ? f`<div class="muted small">${c("map.current")}: ${r}</div>` : v}</td>
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
      <div class="chips">${s.slice(0, 80).map(({ c: i, s: n }) => f`<span class="chip">${i.label || i.id}: ${$t(i.type, n.key)}</span>`)}</div>
    </div>`;
  }
};
$e.properties = {
  plant: { attribute: !1 },
  hass: { attribute: !1 },
  api: { attribute: !1 },
  _res: { state: !0 },
  _sel: { state: !0 },
  _busy: { state: !0 },
  _msg: { state: !0 }
}, $e.styles = [
  it,
  q`
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
let ns = $e;
const so = ["outdoor_unit", "indoor_unit", "buffer", "dhw_tank", "pump", "valve_3way", "mixer", "radiators", "floor_heating", "tap", "separator", "expansion_vessel"], xe = class xe extends Y {
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
    const i = await new Promise((n, a) => {
      const r = new FileReader();
      r.onload = () => n(String(r.result).split(",")[1] || ""), r.onerror = () => a(r.error), r.readAsDataURL(s);
    });
    try {
      await this.api.uploadIcon(s.name.replace(/\.[^.]+$/, ""), s.type || "image/svg+xml", i, this._iso), kt(this, "icons-changed");
    } catch (n) {
      const a = n?.code || n?.error?.code || "invalid_data";
      this._err = c(`ic.err.${a}`);
    }
  }
  async _delete(t) {
    await this.api.deleteIcon(t), kt(this, "icons-changed");
  }
  _typeDefault(t, e) {
    const s = structuredClone(this.plant);
    s.settings.typeIcons = { ...s.settings.typeIcons || {} }, e ? s.settings.typeIcons[t] = e : delete s.settings.typeIcons[t], kt(this, "save", s);
  }
  render() {
    const t = [...this.icons.values()];
    return f`<div class="card">
      <h2>${c("ic.title")}</h2>
      <p class="muted">${c("ic.intro")}</p>
      <div class="row">
        <label class="btn primary up">${V("upload")} ${c("ic.upload")}
          <input type="file" accept=".svg,.png,.webp,.jpg,.jpeg,image/svg+xml,image/png,image/webp,image/jpeg" @change=${this._upload} hidden /></label>
        <label class="row small"><input type="checkbox" .checked=${this._iso} @change=${(e) => this._iso = e.target.checked} /> ${c("ic.iso")}</label>
        ${this._err ? f`<span class="err">${this._err}</span>` : v}
      </div>
      ${t.length ? f`<div class="gallery">${t.map(
      (e) => f`<div class="ic">
              <div class="prev"><img src=${e.data_url} alt=${e.name} /></div>
              <div class="name">${e.name}${e.iso ? f` <span class="muted">· iso</span>` : v}</div>
              <button class="ghost danger icon" @click=${() => this._delete(e.id)}>${V("trash")}</button>
            </div>`
    )}</div>` : f`<p class="muted">${c("ic.empty")}</p>`}
      <h3>${c("ic.type_default")}</h3>
      <div class="defaults">
        ${so.map(
      (e) => f`<label class="field">${c(`type.${e}`)}
            <select @change=${(s) => this._typeDefault(e, s.target.value)}>
              <option value="">${c("ed.icon_default")}</option>
              ${t.map((s) => f`<option value=${s.id} ?selected=${this.plant.settings.typeIcons?.[e] === s.id}>${s.name}</option>`)}
            </select></label>`
    )}
      </div>
    </div>`;
  }
};
xe.properties = { plant: { attribute: !1 }, api: { attribute: !1 }, icons: { attribute: !1 }, _err: { state: !0 }, _iso: { state: !0 } }, xe.styles = [
  it,
  q`
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
let os = xe;
const ke = class ke extends Y {
  constructor() {
    super(...arguments), this.version = "";
  }
  _patch(t) {
    const e = structuredClone(this.plant);
    e.settings = { ...e.settings, ...t }, kt(this, "save", e);
  }
  render() {
    const t = this.plant.settings;
    return f`<div class="card wrap">
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
          ${["auto", "de", "en"].map((e) => f`<option value=${e} ?selected=${(t.language || "auto") === e}>${e === "auto" ? c("st.lang.auto") : e === "de" ? "Deutsch" : "English"}</option>`)}
        </select></label>
      <label class="field">${c("st.heat_load")}
        <input type="number" step="0.1" .value=${String(t.heat_load ?? 6.2)} @change=${(e) => this._patch({ heat_load: Number(e.target.value) })} /></label>
      <div class="row foot">
        <span class="muted">${c("st.version")} ${this.version}</span>
        <span class="spacer"></span>
        <button class="danger" @click=${() => confirm(c("st.reset_confirm")) && kt(this, "reset-plant")}>${c("st.reset")}</button>
      </div>
    </div>`;
  }
};
ke.properties = { plant: { attribute: !1 }, version: {} }, ke.styles = [
  it,
  q`
      .wrap { max-width: 640px; display: grid; gap: 16px; }
      .toggle { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; }
      .toggle input { margin-top: 4px; }
      .foot { margin-top: 8px; }
    `
];
let as = ke;
for (const [o, t] of [
  ["cp-wizard", is],
  ["cp-mapping", ns],
  ["cp-icons", os],
  ["cp-settings", as]
])
  customElements.get(o) || customElements.define(o, t);
const io = 10 * 6e4, no = 5e3;
function ii(o) {
  return o === void 0 ? "var(--cp-muted)" : o >= 3.5 ? xt.green : o >= 3 ? xt.yellow : xt.red;
}
const Me = class Me extends Y {
  constructor() {
    super(...arguments), this.sim = null, this.version = 0, this._data = null, this._error = "", this._loadedAt = 0, this._loadedFor = null;
  }
  willUpdate() {
    const t = this.sim || this.plant, e = Date.now() - this._loadedAt;
    (t !== this._loadedFor || e > (this.sim ? no : io)) && (this._loadedFor = t, this._loadedAt = Date.now(), this._load());
  }
  async _load() {
    try {
      this._error = "", this.sim ? this._data = An(this.sim) : this.hass && !this.hass.__standalone && (this._data = await En(this.hass, this.plant));
    } catch (t) {
      this._error = t?.message || String(t);
    }
  }
  _live() {
    const t = $i(this.plant, this.src), e = 62, s = 2 * Math.PI * e, i = t ? Math.min(1, t.cop / 7) : 0, n = t ? xt[t.ampel] : "var(--cp-muted)";
    return f`<div class="card live">
      <div class="cap">${c("eff.live")}</div>
      <div class="gauge">
        <svg viewBox="0 0 160 160">
          <circle cx="80" cy="80" r=${e} class="track" />
          ${$`<circle cx="80" cy="80" r=${e} class="bar" style="stroke:${n};stroke-dasharray:${s * i} ${s}" />`}
        </svg>
        <div class="gv">
          <span class="big" style="color:${n}">${t ? I(t.cop, 1) : "–"}</span>
          <span class="muted">COP</span>
        </div>
      </div>
      ${t ? f`<div class="lv-row"><span>${c("eff.expected", { out: I(t.tOut, 0), flow: I(t.tFlow, 0) })}</span><b>${I(t.expected, 1)}</b></div>
            <div class="lv-row"><span>${c("eff.ratio")}</span><b style="color:${n}">${I(t.ratio * 100, 0)} %</b></div>
            <div class="verdict" style="border-color:${n}">${c(`eff.ampel.${t.ampel}`)}</div>` : f`<p class="muted small">${c("eff.no_live")}</p>`}
    </div>`;
  }
  _tile(t, e, s) {
    const i = Rt(e), n = e && e.heat > 0 ? e.heatDhw / e.heat : void 0, a = e && e.el > 0 ? e.aux / e.el : void 0;
    return f`<div class="card tile">
      <div class="cap">${c(`eff.${t}`)} ${s ? f`<span class="est">${c("eff.estimate")}</span>` : v}</div>
      <div class="spf" style="color:${ii(i)}">${i !== void 0 ? I(i, 2) : "–"}<small>${t === "today" || t === "yesterday" ? "AZ" : "JAZ"}</small></div>
      <div class="kv"><span>${c("eff.heat")}</span><b>${e ? I(e.heat, e.heat >= 100 ? 0 : 1) : "–"} kWh</b></div>
      <div class="kv"><span>${c("eff.el")}</span><b>${e ? I(e.el, e.el >= 100 ? 0 : 1) : "–"} kWh</b></div>
      <div class="kv"><span>${c("eff.dhw_share")}</span><b>${n !== void 0 ? I(n * 100, 0) + " %" : "–"}</b></div>
      <div class="kv"><span>${c("eff.aux_share")}</span><b>${a !== void 0 ? I(a * 100, 1) + " %" : "–"}</b></div>
    </div>`;
  }
  _chart(t) {
    const e = t.daily.slice(-30);
    if (!e.length) return v;
    const s = 720, i = 200, n = { l: 34, r: 34, t: 10, b: 24 }, a = Math.max(1, ...e.map((h) => Math.max(h.heat, h.el))), r = (s - n.l - n.r) / e.length, l = (h) => n.t + (i - n.t - n.b) * (1 - h / a), d = (h) => n.t + (i - n.t - n.b) * (1 - Math.min(6, h) / 6), u = (h) => new Date(h).toLocaleDateString(qi() === "de" ? "de-DE" : "en-GB", { day: "2-digit", month: "2-digit" }), p = e.map((h, m) => {
      const g = Rt(h);
      return g === void 0 ? null : `${n.l + m * r + r / 2},${d(g)}`;
    }).filter(Boolean).join(" ");
    return f`<div class="card chart">
      <div class="row head"><div class="cap">${c("eff.daily")}</div><span class="spacer"></span>
        <span class="lg"><i style="background:#ff8a3d"></i>${c("eff.heat")}</span>
        <span class="lg"><i style="background:#4d9fff"></i>${c("eff.el")}</span>
        <span class="lg"><i class="dot"></i>AZ</span></div>
      <svg viewBox="0 0 ${s} ${i}" preserveAspectRatio="none">
        ${[0, 0.5, 1].map((h) => $`<line class="grid" x1=${n.l} x2=${s - n.r} y1=${l(a * h)} y2=${l(a * h)} />
          <text class="axis" x=${n.l - 4} y=${l(a * h) + 3} text-anchor="end">${I(a * h, 0)}</text>`)}
        ${[2, 4, 6].map((h) => $`<text class="axis" x=${s - n.r + 4} y=${d(h) + 3}>${h}</text>`)}
        ${e.map((h, m) => {
      const g = n.l + m * r;
      return $`<g><title>${u(h.day)} · ${I(h.heat, 1)} / ${I(h.el, 1)} kWh · AZ ${Rt(h) !== void 0 ? I(Rt(h), 2) : "–"}</title>
            <rect x=${g + r * 0.12} y=${l(h.heat)} width=${r * 0.36} height=${i - n.b - l(h.heat)} rx="2" fill="#ff8a3d" />
            <rect x=${g + r * 0.5} y=${l(h.el)} width=${r * 0.36} height=${i - n.b - l(h.el)} rx="2" fill="#4d9fff" />
            ${m % 5 === 0 ? $`<text class="axis" x=${g + r / 2} y=${i - 6} text-anchor="middle">${u(h.day)}</text>` : v}</g>`;
    })}
        ${$`<polyline points=${p} fill="none" stroke="var(--cp-text)" stroke-width="1.5" stroke-dasharray="3 3" />`}
        ${e.map((h, m) => {
      const g = Rt(h);
      return g === void 0 ? v : $`<circle cx=${n.l + m * r + r / 2} cy=${d(g)} r="3" fill=${ii(g)} />`;
    })}
      </svg>
      ${t.estimated.month ? f`<p class="muted small">${c("eff.demo_note")}</p>` : v}
    </div>`;
  }
  render() {
    const t = this._data;
    return f`
      <div class="grid">
        ${this._live()}
        <div class="tiles">
          ${this._tile("today", t?.today ?? null, !1)}
          ${this._tile("yesterday", t?.yesterday ?? null, !1)}
          ${this._tile("month", t?.month ?? null, !!t?.estimated.month)}
          ${this._tile("year", t?.year ?? null, !!t?.estimated.year)}
        </div>
      </div>
      ${this._error ? f`<div class="card err">${this._error}</div>` : v}
      ${t?.missing ? f`<div class="card hint">${c(`eff.missing.${t.missing}`)}</div>` : v}
      ${t ? this._chart(t) : v}
    `;
  }
};
Me.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  hass: { attribute: !1 },
  sim: { attribute: !1 },
  version: { type: Number },
  _data: { state: !0 },
  _error: { state: !0 }
}, Me.styles = [
  it,
  q`
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
let rs = Me;
customElements.get("cp-efficiency") || customElements.define("cp-efficiency", rs);
const ls = 60;
function mt(o, t, e, s) {
  const i = new Array(e).fill(null), n = [...o].sort((l, d) => l.t - d.t);
  let a = 0, r = null;
  for (let l = 0; l < e; l++) {
    const d = t + l * ls;
    for (; a < n.length && n[a].t <= d; ) r = s(n[a++]);
    i[l] = r;
  }
  return i;
}
const ft = (o) => o.v === null || Number.isNaN(o.v) ? null : o.v;
function ni(o) {
  const t = [];
  let e = -1;
  return o.forEach((s, i) => {
    s && e < 0 && (e = i), !s && e >= 0 && (t.push([e, i]), e = -1);
  }), e >= 0 && t.push([e, o.length]), t;
}
function oi(o) {
  const t = o.filter((e) => e !== null);
  return t.length ? t.reduce((e, s) => e + s, 0) / t.length : void 0;
}
const je = (o, ...t) => o.components.find((e) => t.includes(e.type));
async function ct(o, t, e, s) {
  if (!t || o.get(t, e) === void 0) return [];
  try {
    return await o.history(t, e, s);
  } catch {
    return [];
  }
}
async function oo(o, t, e = 24, s = Date.now() / 1e3) {
  const i = je(o, "outdoor_unit"), n = je(o, "indoor_unit"), a = je(o, "buffer"), r = Math.floor(e * 3600 / ls), l = s - r * ls, [d, u, p, h, m, g, _, y, b, k, M] = await Promise.all([
    ct(t, i, "compressor_on", e),
    ct(t, i, "compressor_speed", e),
    ct(t, i, "heat_power", e),
    ct(t, i, "activity", e),
    ct(t, n, "supply_temp", e),
    ct(t, n, "return_temp", e),
    ct(t, a, "temp_top", e),
    ct(t, n, "buffer_temp", e),
    ct(t, n, "aux_level", e),
    ct(t, n, "vw1_position", e),
    ct(t, n, "pressure", e)
  ]), E = d.length ? d : u.length ? u : p, T = mt(E, l, r, ft).map((P) => P !== null && P > (E === p ? 0.2 : 0)), R = mt(h, l, r, (P) => Le({ raw: P.raw ?? null, available: P.raw !== void 0 }) ?? null), G = R.map((P) => P === "defrost"), et = mt(k, l, r, ft).map((P, S) => P !== null ? P > 0 : R[S] === "hot_water"), A = T.map((P, S) => P && !G[S] && !et[S]), D = A.map((P, S) => P && A.slice(Math.max(0, S - 5), S).every(Boolean) && S >= 5), N = E.length > 0, K = [], C = _.length ? _ : y;
  if (a || y.length) {
    const P = mt(m, l, r, ft), S = mt(C, l, r, ft), L = P.map((W, H) => D[H] && W !== null && S[H] !== null ? W - S[H] : null), O = oi(L);
    K.push(
      O === void 0 ? { id: "mixing", ampel: "none", detail: "chk.nodata", params: {} } : {
        id: "mixing",
        ampel: O <= 2 ? "green" : O <= 4 ? "yellow" : "red",
        value: `${I(O, 1)} K`,
        detail: "chk.mixing.detail",
        params: { value: O, minutes: L.filter((W) => W !== null).length },
        hint: "chk.mixing.hint"
      }
    );
  }
  if (N) {
    const S = ni(T).filter(([X]) => X > 0), L = S.length, O = S.length ? S.reduce((X, [nt, st]) => X + (st - nt), 0) / S.length : void 0;
    let W = 0;
    for (let X = 0; X + 60 <= r; X += 10) W = Math.max(W, S.filter(([nt]) => nt >= X && nt < X + 60).length);
    const H = L / e, J = H <= 1 && W <= 3 && (O ?? 99) >= 20 ? "green" : W > 4 || (O ?? 99) < 10 ? "red" : "yellow";
    K.push({
      id: "cycling",
      ampel: L === 0 ? "green" : J,
      value: `${L}×`,
      detail: "chk.cycling.detail",
      params: { starts: L, perHour: H, maxPerHour: W, avgRun: O ?? 0, hours: e },
      hint: "chk.cycling.hint"
    });
  } else
    K.push({ id: "cycling", ampel: "none", detail: "chk.nodata", params: {} });
  {
    const P = mt(m, l, r, ft), S = mt(g, l, r, ft), L = P.map((W, H) => D[H] && W !== null && S[H] !== null ? W - S[H] : null), O = oi(L);
    K.push(
      O === void 0 ? { id: "spread", ampel: "none", detail: "chk.nodata", params: {} } : {
        id: "spread",
        ampel: O >= 3 && O <= 8 ? "green" : O >= 2 && O <= 10 ? "yellow" : "red",
        value: `${I(O, 1)} K`,
        detail: "chk.spread.detail",
        params: { value: O },
        hint: O < 3 ? "chk.spread.hint_low" : "chk.spread.hint_high"
      }
    );
  }
  if (h.length) {
    const P = ni(G), S = P.reduce((W, [H, J]) => W + (J - H), 0), L = T.filter(Boolean).length || 1, O = S / L;
    K.push({
      id: "defrost",
      ampel: O <= 0.08 ? "green" : O <= 0.15 ? "yellow" : "red",
      value: `${P.length}×`,
      detail: "chk.defrost.detail",
      params: { count: P.length, minutes: S, share: O * 100 },
      hint: "chk.defrost.hint"
    });
  }
  if (b.length) {
    const S = mt(b, l, r, ft).map((L) => L !== null && L > 0).filter(Boolean).length;
    K.push({
      id: "aux",
      ampel: S === 0 ? "green" : S <= 60 ? "yellow" : "red",
      value: S ? `${Math.round(S)} min` : "0",
      detail: "chk.aux.detail",
      params: { minutes: S },
      hint: "chk.aux.hint"
    });
  }
  if (M.length && n) {
    const P = M.map(ft).filter((J) => J !== null), S = Number(n.props.pressure_min ?? 1), L = Number(n.props.pressure_max ?? 2.7), O = Math.min(...P), W = Math.max(...P), H = P.length ? P[0] - P[P.length - 1] : 0;
    K.push({
      id: "pressure",
      ampel: O < S || W > L ? "red" : O < S + 0.2 || H > 0.2 ? "yellow" : "green",
      value: `${I(O, 1)}–${I(W, 1)} bar`,
      detail: "chk.pressure.detail",
      params: { min: O, max: W, lo: S, hi: L },
      hint: "chk.pressure.hint"
    });
  }
  return K;
}
const ao = 2e4, ro = 5 * 6e4;
function ai(o) {
  const t = {};
  for (const [e, s] of Object.entries(o)) t[e] = typeof s == "number" ? I(s, Number.isInteger(s) ? 0 : 1) : s;
  return t;
}
const Se = class Se extends Y {
  constructor() {
    super(...arguments), this.sim = null, this.version = 0, this._results = null, this._busy = !1, this._at = 0, this._for = null;
  }
  willUpdate() {
    const t = this.sim || this.plant;
    (t !== this._for || Date.now() - this._at > (this.sim ? ao : ro)) && (this._for = t, this._at = Date.now(), this._run());
  }
  async _run() {
    if (!this._busy) {
      this._busy = !0;
      try {
        this._results = await oo(this.plant, this.src, 24, this.sim ? this.sim.time : Date.now() / 1e3);
      } finally {
        this._busy = !1;
      }
    }
  }
  render() {
    const t = this._results, e = (s) => (t || []).filter((i) => i.ampel === s).length;
    return f`
      <div class="card head">
        <div>
          <h2>${c("chk.title")}</h2>
          <p class="muted">${c("chk.subtitle")}${this.sim ? ` ${c("chk.demo")}` : ""}</p>
        </div>
        <span class="spacer"></span>
        ${t ? f`<div class="sum">
              ${["green", "yellow", "red"].map((s) => f`<span class="dot" style="background:${xt[s]}"></span><b>${e(s)}</b>`)}
            </div>` : v}
        <button @click=${() => this._run()} ?disabled=${this._busy}>${c("chk.refresh")}</button>
      </div>
      ${t ? f`<div class="list">
            ${t.map(
      (s) => f`<div class="card item ${s.ampel}">
                <span class="lamp" style="background:${s.ampel === "none" ? "var(--cp-muted)" : xt[s.ampel]}"></span>
                <div class="body">
                  <div class="row nowrap">
                    <b class="title">${c(`chk.${s.id}.title`)}</b>
                    <span class="spacer"></span>
                    ${s.value ? f`<span class="val">${s.value}</span>` : v}
                  </div>
                  <div class="detail">${c(s.detail, ai(s.params))}</div>
                  ${s.hint && (s.ampel === "yellow" || s.ampel === "red") ? f`<div class="hint">${c(s.hint, ai(s.params))}</div>` : v}
                  ${s.ampel === "green" ? f`<div class="ok">${c("chk.ok")}</div>` : v}
                </div>
              </div>`
    )}
          </div>` : f`<div class="card muted">${c("chk.running")}</div>`}
    `;
  }
};
Se.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  sim: { attribute: !1 },
  version: { type: Number },
  _results: { state: !0 },
  _busy: { state: !0 }
}, Se.styles = [
  it,
  q`
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
let cs = Se;
customElements.get("cp-check") || customElements.define("cp-check", cs);
const Bt = [
  { key: "design", slot: "design_temp", min: 28, max: 65, step: 1 },
  { key: "offset", slot: "offset_temp", min: -10, max: 10, step: 0.5 },
  { key: "limit", slot: "heating_limit", min: 10, max: 22, step: 0.5 },
  { key: "minFlow", slot: "min_flow_temp", min: 15, max: 40, step: 1 },
  { key: "maxFlow", slot: "max_flow_temp", min: 30, max: 75, step: 1 },
  { key: "minExt", slot: "min_ext_temp", min: -25, max: 0, step: 1 },
  { key: "roomSet", slot: "room_setpoint", min: 15, max: 25, step: 0.5 }
], Vt = 14, ps = 640, Pt = 380, Q = { l: 42, r: 16, t: 14, b: 32 }, ds = -20, hs = 22, ri = 15, lo = 65, at = (o) => Q.l + (o - ds) / (hs - ds) * (ps - Q.l - Q.r), gt = (o) => Pt - Q.b - (o - ri) / (lo - ri) * (Pt - Q.t - Q.b), ze = class ze extends Y {
  constructor() {
    super(...arguments), this.sim = null, this.version = 0, this.admin = !1, this._edit = {}, this._points = null, this._hc = "", this._msg = "", this._confirm = !1, this._loadedFor = null;
  }
  get _circuits() {
    return this.plant.components.filter((t) => t.type === "radiators" || t.type === "floor_heating");
  }
  get _circuit() {
    return this._circuits.find((t) => t.id === this._hc) || this._circuits[0];
  }
  /** Current parameters from the plant (or the simulator in demo mode). */
  _current() {
    const t = this._circuit;
    if (this.sim) return { ...this.sim.curve };
    const e = vi(t?.type === "floor_heating");
    if (!t) return e;
    for (const s of Bt) {
      const i = this.src.get(t, s.slot);
      i?.available && i.num !== null && (e[s.key] = i.num);
    }
    return e;
  }
  _writable(t) {
    if (this.sim) return !0;
    const e = this._circuit, s = Bt.find((n) => n.key === t), i = e?.bindings[s.slot];
    return !!i && /^(number|input_number)\./.test(i) && this.admin;
  }
  willUpdate() {
    const t = `${this.sim ? "sim" : "ha"}:${this._circuit?.id}`;
    t !== this._loadedFor && (this._loadedFor = t, this._load());
  }
  // ------------------------------------------------------------ history
  async _load() {
    this._points = null;
    const t = this._circuit, e = this.plant.components.find((i) => i.type === "outdoor_unit"), s = this.plant.components.find((i) => i.type === "indoor_unit");
    if (!t || !e) {
      this._points = [];
      return;
    }
    try {
      this._points = this.sim ? this._simPoints() : await this._hassPoints(t, e, s);
    } catch {
      this._points = [];
    }
  }
  /** Demo: last 24 h from the simulation plus earlier days from the climate model. */
  _simPoints() {
    const t = this.sim, e = [], s = t.history("outdoor", "outdoor_temp", 24), i = t.history("hc", "flow_temp", 24), n = t.history("hc", "room_temp", 24);
    for (let a = 0; a < 24; a++) {
      const r = t.time - (24 - a) * 3600, l = (m) => m.filter((g) => g.t >= r && g.t < r + 3600 && g.v !== null).map((g) => g.v), d = l(s), u = l(i), p = l(n);
      if (!d.length || !u.length) continue;
      const h = (m) => m.reduce((g, _) => g + _, 0) / m.length;
      h(d) >= t.curve.limit || e.push({ tOut: h(d), flow: h(u), room: p.length ? h(p) : void 0, age: 0 });
    }
    for (let a = 1; a < Vt; a++)
      for (let r = 0; r < 24; r += 2) {
        const l = t.outdoorMean + 2.5 * Math.cos((r - 15) / 24 * 2 * Math.PI) + Math.sin(a * 1.7 + r) * 3, d = Nt(t.curve, l);
        d !== null && e.push({ tOut: l, flow: d + Math.sin(a * 3.1 + r * 0.7) * 1.4 - 0.6, room: t.curve.roomSet + Math.sin(a + r) * 0.3, age: a / Vt });
      }
    return e;
  }
  /** Hourly means from the recorder's long-term statistics. */
  async _hassPoints(t, e, s) {
    const i = {
      out: e.bindings.outdoor_temp,
      flow: t.bindings.flow_temp || s?.bindings.supply_temp,
      room: t.bindings.room_temp,
      heat: e.bindings.heat_power
    };
    if (!i.out || !i.flow || !this.hass) return [];
    const n = /* @__PURE__ */ new Date(), a = new Date(n.getTime() - Vt * 864e5), r = await this.hass.callWS({
      type: "recorder/statistics_during_period",
      start_time: a.toISOString(),
      end_time: n.toISOString(),
      statistic_ids: Object.values(i).filter(Boolean),
      period: "hour",
      types: ["mean"]
    }), l = (_) => new Map((_ ? r[_] || [] : []).map((y) => [y.start, y.mean])), d = l(i.out), u = l(i.flow), p = l(i.room), h = l(i.heat), m = this._current().limit, g = [];
    for (const [_, y] of d) {
      const b = u.get(_);
      if (y == null || b == null || y >= m) continue;
      const k = h.get(_);
      h.size && (k == null || k < 0.3) || g.push({ tOut: y, flow: b, room: p.get(_) ?? void 0, age: (n.getTime() - _) / (Vt * 864e5) });
    }
    return g;
  }
  // ------------------------------------------------------------ actions
  _set(t, e) {
    this._edit = { ...this._edit, [t]: e }, this._msg = "";
  }
  async _apply() {
    this._confirm = !1;
    const t = Object.entries(this._edit);
    if (this.sim)
      this.sim.curve = { ...this.sim.curve, ...this._edit };
    else {
      const e = this._circuit;
      for (const [s, i] of t) {
        const n = Bt.find((r) => r.key === s), a = e.bindings[n.slot];
        a && await this.hass.callWS({
          type: "call_service",
          domain: a.split(".")[0],
          service: "set_value",
          service_data: { entity_id: a, value: i }
        });
      }
    }
    this._edit = {}, this._msg = c("cv.applied");
  }
  // ------------------------------------------------------------ render
  _chart(t, e, s) {
    const i = (m) => {
      let g = "";
      for (let _ = ds; _ <= Math.min(hs, m.limit); _ += 0.5) {
        const y = Nt(m, _);
        if (y === null) break;
        g += `${g ? "L" : "M"} ${at(_)} ${gt(y)} `;
      }
      return g;
    }, n = this._circuit, a = this.plant.components.find((m) => m.type === "outdoor_unit"), r = this.plant.components.find((m) => m.type === "indoor_unit"), l = a ? this.src.get(a, "outdoor_temp") : void 0, d = n && this.src.get(n, "flow_temp") || r && this.src.get(r, "supply_temp"), u = l?.available ? l.num : null, p = d?.available ? d.num : null, h = u !== null ? Nt(t, u) : null;
    return $`<svg class="chart" viewBox="0 0 ${ps} ${Pt}">
      ${[-20, -10, 0, 10, 20].map((m) => $`<line class="grid" x1=${at(m)} x2=${at(m)} y1=${Q.t} y2=${Pt - Q.b} />
        <text class="axis" x=${at(m)} y=${Pt - 12} text-anchor="middle">${m} °C</text>`)}
      ${[20, 30, 40, 50, 60].map((m) => $`<line class="grid" x1=${Q.l} x2=${ps - Q.r} y1=${gt(m)} y2=${gt(m)} />
        <text class="axis" x=${Q.l - 6} y=${gt(m) + 3} text-anchor="end">${m}</text>`)}
      <rect class="limit" x=${at(t.limit)} y=${Q.t} width=${Math.max(0, at(hs) - at(t.limit))} height=${Pt - Q.t - Q.b} />
      <text class="axis" x=${at(t.limit) + 6} y=${Q.t + 14}>${c("cv.no_heating")}</text>
      ${s.map((m) => $`<circle class="pt" cx=${at(m.tOut)} cy=${gt(m.flow)} r="3.2" style="opacity:${0.85 - m.age * 0.6}" />`)}
      <path class="curve" d=${i(t)} />
      ${e ? $`<path class="curve next" d=${i(e)} />` : v}
      ${u !== null && h !== null ? $`<circle class="target" cx=${at(u)} cy=${gt(h)} r="6" />` : v}
      ${u !== null && p !== null ? $`<g class="live"><circle cx=${at(u)} cy=${gt(p)} r="7" class="pulse" /><circle cx=${at(u)} cy=${gt(p)} r="4" /></g>` : v}
      <text class="axis title" x=${Q.l} y=${Q.t - 2}>${c("cv.axis_flow")}</text>
    </svg>`;
  }
  render() {
    const t = this._current(), e = Object.keys(this._edit).length > 0, s = e ? { ...t, ...this._edit } : null, i = s || t, n = this._points || [], a = n.filter((p) => p.age < 0.5 && p.room !== void 0).map((p) => p.room), r = a.length ? a.reduce((p, h) => p + h, 0) / a.length : void 0, l = n.length ? n.reduce((p, h) => p + (h.flow - (Nt(t, h.tOut) ?? h.flow)), 0) / n.length : void 0, d = r !== void 0 ? hn(t, r) : 0, u = this._circuits;
    return f`
      <div class="grid">
        <div class="card chart-card">
          <div class="row head">
            <h2>${c("cv.title")}</h2>
            ${u.length > 1 ? f`<select @change=${(p) => this._hc = p.target.value}>
                  ${u.map((p) => f`<option value=${p.id} ?selected=${p.id === this._circuit?.id}>${p.label}</option>`)}
                </select>` : f`<span class="muted">${this._circuit?.label || ""}</span>`}
            <span class="spacer"></span>
            <span class="lg"><i class="l-curve"></i>${c("cv.curve")}</span>
            ${s ? f`<span class="lg"><i class="l-next"></i>${c("cv.preview")}</span>` : v}
            <span class="lg"><i class="l-pt"></i>${c("cv.points", { days: Vt })}</span>
            <span class="lg"><i class="l-live"></i>${c("cv.now")}</span>
          </div>
          ${this._chart(t, s, n)}
          ${this.sim ? f`<p class="muted small">${c("cv.demo_note")}</p>` : v}
          ${!this.sim && this._points && !n.length ? f`<p class="muted small">${c("cv.no_points")}</p>` : v}
        </div>
        <div class="side">
          <div class="card">
            <div class="cap">${c("cv.params")}</div>
            ${Bt.map((p) => {
      const h = i[p.key], m = p.key in this._edit, g = this._writable(p.key);
      return f`<label class="param ${m ? "changed" : ""}">
                <span class="pname">${c(`cv.p.${p.key}`)}</span>
                <b>${I(h, p.step < 1 ? 1 : 0)} ${p.key === "offset" ? "K" : "°C"}</b>
                <input type="range" min=${p.min} max=${p.max} step=${p.step} .value=${String(h)} ?disabled=${!g}
                  @input=${(_) => this._set(p.key, Number(_.target.value))} />
              </label>`;
    })}
            ${!this.sim && !Bt.some((p) => this._writable(p.key)) ? f`<p class="muted small">${c("cv.readonly")}</p>` : v}
            <div class="row actions">
              <button ?disabled=${!e} @click=${() => this._edit = {}}>${c("discard")}</button>
              <span class="spacer"></span>
              <button class="primary" ?disabled=${!e} @click=${() => this._confirm = !0}>${V("check")} ${c("apply")}</button>
            </div>
            ${this._msg ? f`<p class="ok">${this._msg}</p>` : v}
          </div>
          <div class="card">
            <div class="cap">${c("cv.analysis")}</div>
            ${l !== void 0 ? f`<p class="small">${c(l >= 0 ? "cv.deviation_above" : "cv.deviation_below", { value: Math.abs(l) })}</p>` : v}
            ${r !== void 0 ? f`<p class="small">${c("cv.room", { room: r, set: t.roomSet })}</p>
                  ${Math.abs(d) >= 0.5 ? f`<div class="hint">${c(d < 0 ? "cv.suggest_down" : "cv.suggest_up", { value: Math.abs(d), target: t.offset + d })}
                        <button class="small-btn" @click=${() => this._set("offset", t.offset + d)}>${c("cv.try")}</button></div>` : f`<p class="ok small">${c("cv.fits")}</p>`}` : f`<p class="muted small">${c("cv.no_room")}</p>`}
          </div>
        </div>
      </div>
      ${this._confirm ? f`<div class="backdrop" @click=${() => this._confirm = !1}></div>
            <div class="dialog card">
              <h3>${c("cv.confirm_title")}</h3>
              <ul>${Object.entries(this._edit).map(
      ([p, h]) => f`<li>${c(`cv.p.${p}`)}: ${I(t[p], 1)} → <b>${I(h, 1)}</b></li>`
    )}</ul>
              <p class="muted small">${this.sim ? c("cv.confirm_demo") : c("cv.confirm_live")}</p>
              <div class="row"><span class="spacer"></span>
                <button @click=${() => this._confirm = !1}>${c("cancel")}</button>
                <button class="primary" @click=${this._apply}>${c("apply")}</button></div>
            </div>` : v}
    `;
  }
};
ze.properties = {
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
}, ze.styles = [
  it,
  q`
      :host { display: block; }
      .grid { display: grid; grid-template-columns: 1fr 320px; gap: 12px; align-items: start; }
      .head { margin-bottom: 6px; }
      .head h2 { margin: 0 10px 0 0; }
      .head select { width: auto; }
      .chart { width: 100%; height: auto; display: block; }
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
let us = ze;
customElements.get("cp-curve") || customElements.define("cp-curve", us);
const Ee = class Ee extends Y {
  constructor() {
    super(...arguments), this.isPanel = !1, this._config = { type: "custom:copilot-card" }, this._ctl = new wi(this, !1);
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
    return f`<ha-card style="height:${s}">
      ${this._ctl.error ? f`<div class="err">${this._ctl.error}</div>` : v}
      ${e ? f`<cp-overview
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
          ></cp-overview>` : f`<div class="loading">${Ge}</div>`}
    </ha-card>`;
  }
};
Ee.properties = {
  hass: { attribute: !1 },
  isPanel: { type: Boolean },
  _config: { state: !0 }
}, Ee.styles = [
  yi,
  it,
  q`
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
let ms = Ee;
const Ae = class Ae extends Y {
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
    const t = this._config, e = (s, i, n) => f`<label class="row">
      <input type="checkbox" .checked=${t[s] ?? n} @change=${(a) => this._set(s, a.target.checked)} />
      ${i}</label>`;
    return f`<div class="ed">
      ${e("show_kpis", c("card.show_kpis"), !0)}
      ${e("show_messages", c("card.show_messages"), !1)}
      ${e("show_demo_controls", c("card.show_demo"), !1)}
      <label class="field">${c("card.height")}
        <input .value=${t.height || ""} placeholder="560px" @change=${(s) => this._set("height", s.target.value.trim())} /></label>
      <p class="hint">${c("card.hint")}</p>
    </div>`;
  }
};
Ae.properties = { hass: { attribute: !1 }, _config: { state: !0 } }, Ae.styles = [
  it,
  q`
      .ed { display: grid; gap: 10px; color: var(--primary-text-color); }
      .row { display: flex; gap: 8px; align-items: center; font-size: 14px; }
      .field { color: var(--secondary-text-color); }
      input:not([type]) { background: transparent; color: var(--primary-text-color); border-color: var(--divider-color); }
      .hint { font-size: 12px; color: var(--secondary-text-color); margin: 0; }
    `
];
let fs = Ae;
customElements.get("copilot-card") || customElements.define("copilot-card", ms);
customElements.get("copilot-card-editor") || customElements.define("copilot-card-editor", fs);
const me = window;
me.customCards = me.customCards || [];
me.customCards.some((o) => o.type === "copilot-card") || me.customCards.push({
  type: "copilot-card",
  name: "COPilot",
  description: "Animated heat pump schematic with live values",
  preview: !1,
  documentationURL: "https://github.com/junky84/copilot"
});
const li = "copilot.view";
function co(o) {
  try {
    return localStorage.getItem(o);
  } catch {
    return null;
  }
}
function po(o, t) {
  try {
    localStorage.setItem(o, t);
  } catch {
  }
}
const Pe = class Pe extends Y {
  constructor() {
    super(), this.narrow = !1, this._ctl = new wi(this), this._view = "overview", this._sub = "editor", this._toast = "";
    const t = co(li);
    if (t) {
      const [e, s] = t.split(":");
      ["overview", "efficiency", "check", "curve", "messages", "config"].includes(e) && (this._view = e), s && (this._sub = s);
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
    this._view = t, e && (this._sub = e), po(li, `${this._view}:${this._sub}`);
  }
  _fullscreen() {
    document.fullscreenElement ? document.exitFullscreen() : this.requestFullscreen?.().catch(() => {
    });
  }
  render() {
    const t = this._ctl.plant, e = this._ctl.messages.filter((s) => s.active && (s.level === "warning" || s.level === "error")).length;
    return f`<div class="shell">
      <header>
        ${this.narrow ? f`<button class="ghost icon" title=${c("menu")} @click=${() => this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: !0, composed: !0 }))}>${V("menu")}</button>` : v}
        <div class="brand">${Ge}<span>COP<b>ilot</b></span></div>
        <nav>
          ${["overview", "efficiency", "check", "curve", "messages", "config"].map(
      (s) => f`<button class="tab ${this._view === s ? "on" : ""}" title=${c(`nav.${s}`)} @click=${() => this._go(s)}>
              ${V(s === "overview" ? "grid" : s === "efficiency" ? "chart" : s === "check" ? "check" : s === "curve" ? "curve" : s === "messages" ? "bell" : "gear")}
              <span class="tl">${c(`nav.${s}`)}</span>
              ${s === "messages" && e ? f`<span class="badge">${e}</span>` : v}
            </button>`
    )}
        </nav>
        <span class="spacer"></span>
        ${t?.settings.demo ? f`<span class="demo-pill">${V("flask")}<span class="tl">${c("demo")}</span></span>` : v}
        <button class="ghost icon" title=${c("fullscreen")} @click=${this._fullscreen}>${V("expand")}</button>
      </header>
      <main>
        ${this._ctl.error ? f`<div class="card err">${this._ctl.error}</div>` : v}
        ${this._ctl.api?.standalone ? f`<div class="note muted">${c("standalone_hint")}</div>` : v}
        ${t ? this._content(t) : f`<div class="loading">${Ge}</div>`}
      </main>
      ${this._toast ? f`<div class="toast">${this._toast}</div>` : v}
    </div>`;
  }
  _content(t) {
    const e = this._ctl.src;
    if (this._view === "overview")
      return f`<cp-overview
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
      return f`<cp-efficiency
        .plant=${t}
        .src=${e}
        .hass=${this.hass}
        .sim=${this._ctl.sim}
        .version=${this._ctl.version}
      ></cp-efficiency>`;
    if (this._view === "check")
      return f`<cp-check .plant=${t} .src=${e} .sim=${this._ctl.sim} .version=${this._ctl.version}></cp-check>`;
    if (this._view === "curve")
      return f`<cp-curve .plant=${t} .src=${e} .hass=${this.hass} .sim=${this._ctl.sim} .version=${this._ctl.version} ?admin=${this._ctl.admin}></cp-curve>`;
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
        ${this._sub === "wizard" ? f`<cp-wizard .plant=${t} @plant-generated=${async (n) => {
      await this._save(n.detail), this._showToast(c("wz.done")), this._go("config", "editor");
    }}></cp-wizard>` : v}
        ${this._sub === "editor" ? f`<cp-editor .plant=${t} .hass=${this.hass} .src=${e} .icons=${this._ctl.icons} .version=${this._ctl.version} @save=${i}></cp-editor>` : v}
        ${this._sub === "mapping" ? f`<cp-mapping .plant=${t} .hass=${this.hass} .api=${this._ctl.api} @save=${i}></cp-mapping>` : v}
        ${this._sub === "icons" ? f`<cp-icons .plant=${t} .api=${this._ctl.api} .icons=${this._ctl.icons} @save=${i} @icons-changed=${() => this._ctl.loadIcons()}></cp-icons>` : v}
        ${this._sub === "settings" ? f`<cp-settings .plant=${t} .version=${this._ctl.backendVersion} @save=${i}
              @reset-plant=${() => this._save({ ...Ye(), settings: { ...Ye().settings, demo: !0 } })}></cp-settings>` : v}
      </div>
    `;
  }
};
Pe.properties = {
  hass: { attribute: !1 },
  narrow: { type: Boolean },
  route: { attribute: !1 },
  panel: { attribute: !1 },
  _view: { state: !0 },
  _sub: { state: !0 },
  _toast: { state: !0 }
}, Pe.styles = [
  yi,
  it,
  q`
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
let gs = Pe;
customElements.get("copilot-panel") || customElements.define("copilot-panel", gs);
export {
  gs as CopilotPanel
};
