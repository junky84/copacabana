/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vt = globalThis, Hs = vt.ShadowRoot && (vt.ShadyCSS === void 0 || vt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Vs = Symbol(), Ys = /* @__PURE__ */ new WeakMap();
let Ui = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== Vs) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Hs && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = Ys.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Ys.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const gn = (o) => new Ui(typeof o == "string" ? o : o + "", void 0, Vs), ae = (o, ...e) => {
  const t = o.length === 1 ? o[0] : e.reduce((s, i, n) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[n + 1], o[0]);
  return new Ui(t, o, Vs);
}, _n = (o, e) => {
  if (Hs) o.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), i = vt.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = t.cssText, o.appendChild(s);
  }
}, qs = Hs ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return gn(t);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: wn, defineProperty: bn, getOwnPropertyDescriptor: vn, getOwnPropertyNames: yn, getOwnPropertySymbols: xn, getPrototypeOf: $n } = Object, Zt = globalThis, Js = Zt.trustedTypes, kn = Js ? Js.emptyScript : "", Sn = Zt.reactiveElementPolyfillSupport, rt = (o, e) => o, hs = { toAttribute(o, e) {
  switch (e) {
    case Boolean:
      o = o ? kn : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, e) {
  let t = o;
  switch (e) {
    case Boolean:
      t = o !== null;
      break;
    case Number:
      t = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(o);
      } catch {
        t = null;
      }
  }
  return t;
} }, Zi = (o, e) => !wn(o, e), Xs = { attribute: !0, type: String, converter: hs, reflect: !1, useDefault: !1, hasChanged: Zi };
Symbol.metadata ??= Symbol("metadata"), Zt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Ue = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Xs) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, t);
      i !== void 0 && bn(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: i, set: n } = vn(this.prototype, e) ?? { get() {
      return this[t];
    }, set(r) {
      this[t] = r;
    } };
    return { get: i, set(r) {
      const a = i?.call(this);
      n?.call(this, r), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Xs;
  }
  static _$Ei() {
    if (this.hasOwnProperty(rt("elementProperties"))) return;
    const e = $n(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(rt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(rt("properties"))) {
      const t = this.properties, s = [...yn(t), ...xn(t)];
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
      for (const i of s) t.unshift(qs(i));
    } else e !== void 0 && t.push(qs(e));
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
    return _n(e, this.constructor.elementStyles), e;
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
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : hs).toAttribute(t, s.type);
      this._$Em = e, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), r = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : hs;
      this._$Em = i;
      const a = r.fromAttribute(t, n.type);
      this[i] = a ?? this._$Ej?.get(i) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, i = !1, n) {
    if (e !== void 0) {
      const r = this.constructor;
      if (i === !1 && (n = this[e]), s ??= r.getPropertyOptions(e), !((s.hasChanged ?? Zi)(n, t) || s.useDefault && s.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: i, wrapped: n }, r) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, r ?? t ?? this[e]), n !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        const { wrapped: r } = n, a = this[i];
        r !== !0 || this._$AL.has(i) || a === void 0 || this.C(i, void 0, n, a);
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
Ue.elementStyles = [], Ue.shadowRootOptions = { mode: "open" }, Ue[rt("elementProperties")] = /* @__PURE__ */ new Map(), Ue[rt("finalized")] = /* @__PURE__ */ new Map(), Sn?.({ ReactiveElement: Ue }), (Zt.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bs = globalThis, Qs = (o) => o, kt = Bs.trustedTypes, ei = kt ? kt.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Gi = "$lit$", ze = `lit$${Math.random().toFixed(9).slice(2)}$`, Yi = "?" + ze, Mn = `<${Yi}>`, Re = document, lt = () => Re.createComment(""), ct = (o) => o === null || typeof o != "object" && typeof o != "function", Rs = Array.isArray, zn = (o) => Rs(o) || typeof o?.[Symbol.iterator] == "function", Jt = `[ 	
\f\r]`, Qe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ti = /-->/g, si = />/g, Te = RegExp(`>|${Jt}(?:([^\\s"'>=/]+)(${Jt}*=${Jt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ii = /'/g, ni = /"/g, qi = /^(?:script|style|textarea|title)$/i, Ji = (o) => (e, ...t) => ({ _$litType$: o, strings: e, values: t }), g = Ji(1), k = Ji(2), Ge = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), oi = /* @__PURE__ */ new WeakMap(), He = Re.createTreeWalker(Re, 129);
function Xi(o, e) {
  if (!Rs(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ei !== void 0 ? ei.createHTML(e) : e;
}
const En = (o, e) => {
  const t = o.length - 1, s = [];
  let i, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = Qe;
  for (let a = 0; a < t; a++) {
    const l = o[a];
    let p, d, h = -1, m = 0;
    for (; m < l.length && (r.lastIndex = m, d = r.exec(l), d !== null); ) m = r.lastIndex, r === Qe ? d[1] === "!--" ? r = ti : d[1] !== void 0 ? r = si : d[2] !== void 0 ? (qi.test(d[2]) && (i = RegExp("</" + d[2], "g")), r = Te) : d[3] !== void 0 && (r = Te) : r === Te ? d[0] === ">" ? (r = i ?? Qe, h = -1) : d[1] === void 0 ? h = -2 : (h = r.lastIndex - d[2].length, p = d[1], r = d[3] === void 0 ? Te : d[3] === '"' ? ni : ii) : r === ni || r === ii ? r = Te : r === ti || r === si ? r = Qe : (r = Te, i = void 0);
    const u = r === Te && o[a + 1].startsWith("/>") ? " " : "";
    n += r === Qe ? l + Mn : h >= 0 ? (s.push(p), l.slice(0, h) + Gi + l.slice(h) + ze + u) : l + ze + (h === -2 ? a : u);
  }
  return [Xi(o, n + (o[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class pt {
  constructor({ strings: e, _$litType$: t }, s) {
    let i;
    this.parts = [];
    let n = 0, r = 0;
    const a = e.length - 1, l = this.parts, [p, d] = En(e, t);
    if (this.el = pt.createElement(p, s), He.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = He.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(Gi)) {
          const m = d[r++], u = i.getAttribute(h).split(ze), w = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: n, name: w[2], strings: u, ctor: w[1] === "." ? Wn : w[1] === "?" ? Pn : w[1] === "@" ? Cn : Gt }), i.removeAttribute(h);
        } else h.startsWith(ze) && (l.push({ type: 6, index: n }), i.removeAttribute(h));
        if (qi.test(i.tagName)) {
          const h = i.textContent.split(ze), m = h.length - 1;
          if (m > 0) {
            i.textContent = kt ? kt.emptyScript : "";
            for (let u = 0; u < m; u++) i.append(h[u], lt()), He.nextNode(), l.push({ type: 2, index: ++n });
            i.append(h[m], lt());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Yi) l.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(ze, h + 1)) !== -1; ) l.push({ type: 7, index: n }), h += ze.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const s = Re.createElement("template");
    return s.innerHTML = e, s;
  }
}
function Ye(o, e, t = o, s) {
  if (e === Ge) return e;
  let i = s !== void 0 ? t._$Co?.[s] : t._$Cl;
  const n = ct(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(o), i._$AT(o, t, s)), s !== void 0 ? (t._$Co ??= [])[s] = i : t._$Cl = i), i !== void 0 && (e = Ye(o, i._$AS(o, e.values), i, s)), e;
}
class An {
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
    const { el: { content: t }, parts: s } = this._$AD, i = (e?.creationScope ?? Re).importNode(t, !0);
    He.currentNode = i;
    let n = He.nextNode(), r = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let p;
        l.type === 2 ? p = new ht(n, n.nextSibling, this, e) : l.type === 1 ? p = new l.ctor(n, l.name, l.strings, this, e) : l.type === 6 && (p = new Tn(n, this, e)), this._$AV.push(p), l = s[++a];
      }
      r !== l?.index && (n = He.nextNode(), r++);
    }
    return He.currentNode = Re, i;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class ht {
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
    e = Ye(this, e, t), ct(e) ? e === v || e == null || e === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : e !== this._$AH && e !== Ge && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : zn(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== v && ct(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Re.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = pt.createElement(Xi(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(t);
    else {
      const n = new An(i, this), r = n.u(this.options);
      n.p(t), this.T(r), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = oi.get(e.strings);
    return t === void 0 && oi.set(e.strings, t = new pt(e)), t;
  }
  k(e) {
    Rs(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, i = 0;
    for (const n of e) i === t.length ? t.push(s = new ht(this.O(lt()), this.O(lt()), this, this.options)) : s = t[i], s._$AI(n), i++;
    i < t.length && (this._$AR(s && s._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const s = Qs(e).nextSibling;
      Qs(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Gt {
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
    let r = !1;
    if (n === void 0) e = Ye(this, e, t, 0), r = !ct(e) || e !== this._$AH && e !== Ge, r && (this._$AH = e);
    else {
      const a = e;
      let l, p;
      for (e = n[0], l = 0; l < n.length - 1; l++) p = Ye(this, a[s + l], t, l), p === Ge && (p = this._$AH[l]), r ||= !ct(p) || p !== this._$AH[l], p === v ? e = v : e !== v && (e += (p ?? "") + n[l + 1]), this._$AH[l] = p;
    }
    r && !i && this.j(e);
  }
  j(e) {
    e === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Wn extends Gt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === v ? void 0 : e;
  }
}
class Pn extends Gt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== v);
  }
}
class Cn extends Gt {
  constructor(e, t, s, i, n) {
    super(e, t, s, i, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Ye(this, e, t, 0) ?? v) === Ge) return;
    const s = this._$AH, i = e === v && s !== v || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== v && (s === v || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Tn {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Ye(this, e);
  }
}
const Ln = Bs.litHtmlPolyfillSupport;
Ln?.(pt, ht), (Bs.litHtmlVersions ??= []).push("3.3.3");
const Dn = (o, e, t) => {
  const s = t?.renderBefore ?? e;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = t?.renderBefore ?? null;
    s._$litPart$ = i = new ht(e.insertBefore(lt(), n), n, void 0, t ?? {});
  }
  return i._$AI(o), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ns = globalThis;
class ne extends Ue {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Dn(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Ge;
  }
}
ne._$litElement$ = !0, ne.finalized = !0, Ns.litElementHydrateSupport?.({ LitElement: ne });
const On = Ns.litElementPolyfillSupport;
On?.({ LitElement: ne });
(Ns.litElementVersions ??= []).push("4.2.2");
const ri = "copilot.standalone.plant", et = "copilot.standalone.icons";
function mt(o, e) {
  try {
    const t = localStorage.getItem(o);
    return t ? JSON.parse(t) : e;
  } catch {
    return e;
  }
}
function Xt(o, e) {
  try {
    localStorage.setItem(o, JSON.stringify(e));
  } catch {
  }
}
class Hn {
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
    return this.standalone ? { version: "demo", plant: mt(ri, null), options: {}, is_admin: !0 } : this.hass.callWS({ type: "copilot/config/get" });
  }
  async saveConfig(e) {
    if (this.standalone) return Xt(ri, e);
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
    return this.standalone ? mt(et, []) : (await this.hass.callWS({ type: "copilot/icons/list" })).icons;
  }
  async uploadIcon(e, t, s, i) {
    if (this.standalone) {
      const n = mt(et, []), r = { id: Math.random().toString(16).slice(2, 14), name: e, mime: t, iso: i, size: s.length, data_url: `data:${t};base64,${s}` };
      return n.push(r), Xt(et, n), r;
    }
    return (await this.hass.callWS({ type: "copilot/icons/upload", name: e, mime: t, data: s, iso: i })).icon;
  }
  async deleteIcon(e) {
    if (this.standalone) return Xt(et, mt(et, []).filter((t) => t.id !== e));
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
const Vn = {
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
  "bld.outside": "Außen",
  "wz.shower": "Dusche",
  "bld.living": "Wohnraum",
  "bld.plant_room": "Technikraum",
  "bld.basement": "Keller",
  "ed.building": "Gebäude anzeigen",
  "ed.raster": "Raster & Fang",
  "ed.grid_show": "Raster einblenden",
  "ed.grid_step": "Rasterweite",
  "ed.grid_cells": "{n} × 20 px",
  "ed.grid_snap": "Am Raster fangen",
  "ed.object_snap": "Objektfang (Anschlüsse, Kanten, Mitten)",
  "ed.snap_hint": "Gelbe Punkte verschieben die Geraden einer ausgewählten Leitung. Alt gedrückt halten = ohne Fang.",
  "ed.connection": "Anschluss",
  "ed.conn.side": "seitlich",
  "ed.conn.bottom": "unten",
  "ed.tap_kind": "Ausführung",
  "ed.tap.tap": "Wasserhahn",
  "ed.tap.shower": "Dusche",
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
}, Bn = {
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
  "bld.outside": "Outside",
  "wz.shower": "Shower",
  "bld.living": "Living space",
  "bld.plant_room": "Plant room",
  "bld.basement": "Basement",
  "ed.building": "Show building",
  "ed.raster": "Grid & snap",
  "ed.grid_show": "Show grid",
  "ed.grid_step": "Grid spacing",
  "ed.grid_cells": "{n} × 20 px",
  "ed.grid_snap": "Snap to grid",
  "ed.object_snap": "Object snap (ports, edges, centres)",
  "ed.snap_hint": "Yellow handles move the straight runs of a selected pipe. Hold Alt to move without snapping.",
  "ed.connection": "Connection",
  "ed.conn.side": "side",
  "ed.conn.bottom": "bottom",
  "ed.tap_kind": "Type",
  "ed.tap.tap": "Tap",
  "ed.tap.shower": "Shower",
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
}, ai = { de: Vn, en: Bn };
let Ne = "de";
function li(o) {
  Ne = o;
}
function ci() {
  return Ne;
}
function pi(o, e) {
  return o === "de" || o === "en" ? o : (e || "de").toLowerCase().startsWith("de") ? "de" : "en";
}
function c(o, e) {
  let t = ai[Ne][o] ?? ai.de[o] ?? o;
  return e && (t = t.replace(/\{(\w+)\}/g, (s, i) => {
    const n = e[i];
    return typeof n == "number" ? F(n, Number.isInteger(n) ? 0 : 1) : n == null ? "" : String(n);
  })), t;
}
function F(o, e = 1) {
  return o.toLocaleString(Ne === "de" ? "de-DE" : "en-GB", {
    minimumFractionDigits: e,
    maximumFractionDigits: e
  });
}
function Qi(o) {
  return new Date(o * 1e3).toLocaleTimeString(Ne === "de" ? "de-DE" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function Rn(o) {
  const e = new Date(o * 1e3), t = /* @__PURE__ */ new Date();
  return e.toDateString() === t.toDateString() ? Qi(o) : e.toLocaleString(Ne === "de" ? "de-DE" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function Nn(o) {
  const e = Math.round(o / 60);
  return e < 60 ? `${e} min` : `${Math.floor(e / 60)} h ${e % 60} min`;
}
const In = {
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
}, di = { supply_temp: "F", return_temp: "R", flow_temp: "F", target_flow_temp: "Set", room_temp: "Room", dhw_temp: "DHW", dhw_setpoint: "Set" };
function hi(o, e) {
  return Ne === "en" && e in di ? di[e] : In[e] ?? "";
}
function Ee(o, e) {
  const t = `slot.${o}.${e}`, s = c(t);
  return s === t ? c(`slot.${e}`) : s;
}
const z = 20, X = (o, e = !1) => ({ key: o, kind: "temp", show: e }), ie = {
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
      X("air_in_temp"),
      { key: "compressor_starts", kind: "count" },
      X("evap_in_temp"),
      X("comp_in_temp"),
      X("comp_out_temp"),
      X("hp_temp"),
      X("lp_temp"),
      X("drain_pan_temp"),
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
      X("supply_temp", !0),
      X("return_temp", !0),
      X("target_flow_temp", !0),
      { key: "pressure", kind: "pressure", show: !0 },
      { key: "flow", kind: "flow" },
      { key: "aux_level", kind: "percent", show: !0 },
      { key: "pc0_running", kind: "bool" },
      { key: "pc0_speed", kind: "percent", show: !0 },
      { key: "vw1_position", kind: "bool" },
      { key: "pc1_running", kind: "bool" },
      { key: "pc1_speed", kind: "percent" },
      X("dhw_temp", !0),
      X("dhw_setpoint"),
      { key: "dhw_charging", kind: "bool" },
      X("buffer_temp", !0),
      X("condenser_temp"),
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
    mirrorable: !0,
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
    slots: [X("temp_top", !0), X("temp_mid"), X("temp_bottom", !0)]
  },
  // SH290: connection heights from the datasheet (hot 1226, coil flow 784, circulation 544,
  // coil return 220, cold 55 of 1294 mm); heating coil on the right, drinking water on the left
  dhw_tank: {
    type: "dhw_tank",
    mirrorable: !0,
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
      X("temp_top", !0),
      X("temp_bottom"),
      X("setpoint", !0),
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
    variants: {
      // connections on one side (flow top, return bottom)
      side: {
        id: "side",
        w: 7,
        h: 6,
        ports: [
          { id: "sup", x: 0, y: 1, dir: "l", kind: "supply" },
          { id: "ret", x: 0, y: 5, dir: "l", tempSlot: "return_temp", kind: "return" }
        ]
      },
      // valve radiator: both connections from below at the right end, return left of flow
      bottom: {
        id: "bottom",
        w: 7,
        h: 6,
        ports: [
          { id: "ret", x: 4, y: 6, dir: "b", tempSlot: "return_temp", kind: "return" },
          { id: "sup", x: 6, y: 6, dir: "b", kind: "supply" }
        ]
      }
    },
    slots: [
      { key: "flow_temp", kind: "temp", show: !0, at: "sup" },
      { key: "return_temp", kind: "temp", show: !0, at: "ret" },
      X("target_flow_temp"),
      { key: "room_temp", kind: "temp", show: !0, pos: [3.5, -2.2] },
      X("room_setpoint"),
      { key: "mode", kind: "enum" },
      { key: "summer_mode", kind: "enum" },
      { key: "operating_state", kind: "enum" },
      X("design_temp"),
      { key: "offset_temp", kind: "temp" },
      X("min_flow_temp"),
      X("max_flow_temp"),
      X("min_ext_temp"),
      X("heating_limit")
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
    mirrorable: !0,
    w: 3,
    h: 3,
    group: "consumer",
    passive: !0,
    badges: "left",
    ports: [{ id: "hot", x: 3, y: 1, dir: "r", kind: "dhw_hot" }],
    variants: {
      tap: { id: "tap", w: 3, h: 3, ports: [{ id: "hot", x: 3, y: 1, dir: "r", kind: "dhw_hot" }] },
      // shower head on an arm from the wall, supply from the right
      shower: { id: "shower", w: 4, h: 5, ports: [{ id: "hot", x: 4, y: 1, dir: "r", kind: "dhw_hot" }], pos: { flow: [1.4, -0.9] } }
    },
    slots: [{ key: "flow", kind: "flow_lmin", show: !0, pos: [1.5, -0.9] }, X("temp")]
  },
  water_inlet: {
    type: "water_inlet",
    mirrorable: !0,
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
ie.floor_heating.slots = ie.radiators.slots;
function ye(o) {
  return o.type === "value_tile" ? (o.props.entries || []).map((e) => ({
    key: e.slot,
    kind: e.kind || "text",
    show: !0
  })) : ie[o.type].slots;
}
function We(o) {
  const e = ie[o.type];
  if (!e.variants) return;
  const t = o.props?.variant || qe(o.model)?.variant || "wall_e";
  return e.variants[t] || Object.values(e.variants)[0];
}
function Be(o) {
  const e = We(o);
  return e ? { w: e.w, h: e.h } : { w: ie[o.type].w, h: ie[o.type].h };
}
function De(o) {
  return We(o)?.ports ?? ie[o.type].ports;
}
function ui(o) {
  return We(o)?.badges ?? ie[o.type].badges;
}
function mi(o) {
  const e = We(o);
  return ye(o).map((t) => e ? { ...t, pos: e.pos?.[t.key] ?? t.pos, at: e.at?.[t.key] ?? t.at } : t);
}
function fe(o) {
  const e = { ...ie[o.type], ...Be(o) };
  if (o.type === "value_tile") {
    const s = (o.props.entries || []).length;
    return { w: e.w, h: 2 + Math.ceil(s * 1.3) };
  }
  const t = o.rot || 0;
  return t === 90 || t === 270 ? { w: e.h, h: e.w } : { w: e.w, h: e.h };
}
const fi = ["r", "b", "l", "t"];
function jn(o, e) {
  const t = e / 90 % 4;
  return fi[(fi.indexOf(o) + t) % 4];
}
function ge(o, e) {
  const t = De(o).find((p) => p.id === e);
  if (!t) return null;
  const s = o.rot || 0, { w: i, h: n } = Be(o);
  let { x: r, y: a } = t, l = t.dir;
  return o.flip && ie[o.type].mirrorable && (r = i - r, l = l === "l" ? "r" : l === "r" ? "l" : l), s === 90 ? [r, a] = [n - a, r] : s === 180 ? [r, a] = [i - r, n - a] : s === 270 && ([r, a] = [a, i - r]), { x: o.x + r, y: o.y + a, dir: jn(l, s), def: t };
}
const St = [
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
], Kn = { "buderus-wsw": "buderus-wsw186i" }, Is = [
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
], Fn = {
  "buderus-wlw186i-t": "buderus-wlw186i-t180",
  "buderus-wlw186i-b": "buderus-wlw186i-e",
  "bosch-aw-b": "bosch-aw-e"
};
function qe(o) {
  const e = o && Fn[o] || o;
  return Is.find((t) => t.id === e);
}
function Ie(o) {
  const e = o && Kn[o] || o;
  return St.find((t) => t.id === e) || St.find((t) => t.id === "generic-air");
}
const en = /* @__PURE__ */ new Set(["on", "true", "1", "yes", "ja", "ein", "an", "active", "aktiv", "open", "offen"]);
function Q(o) {
  return !o || !o.available || o.raw === null ? !1 : typeof o.raw == "boolean" ? o.raw : o.num !== null ? o.num > 0 : en.has(String(o.raw).trim().toLowerCase());
}
const Un = {
  off: ["off", "aus", "uit", "av", "arrêt", "standby", "bereit"],
  heating: ["heating", "heizen", "verwarmen", "uppvärmning", "chauffage", "ogrzewanie", "riscaldamento"],
  cooling: ["cooling", "kühlen", "koelen", "kyler", "refroidissement", "chłodzenie", "raffreddamento"],
  hot_water: ["hot water", "hot_water", "warmwasser", "warm water", "varmvatten", "eau chaude", "c.w.u.", "acqua calda"],
  pool_heating: ["pool heating", "pool beheizen", "zwembadverwarming", "chauffage piscine"],
  pool: ["pool", "zwembad", "piscine", "basen", "piscina"],
  defrost: ["defrost", "abtauen", "ontdooien", "avfrostning", "dégivrage", "odladzanie", "scongelamento"],
  compressor_alarm: ["compressor alarm", "compressor_alarm", "kompressor alarm", "kompressoralarm"]
};
function Je(o) {
  if (!o || !o.available || o.raw === null) return;
  const e = String(o.raw).trim().toLowerCase();
  for (const [t, s] of Object.entries(Un)) if (s.includes(e)) return t;
  return e.includes("abtau") || e.includes("defrost") ? "defrost" : e;
}
function js(o, e, t) {
  if (o === void 0 || o === "unavailable" || o === "unknown" || o === "")
    return { raw: null, num: null, unit: e, entity: t, available: !1 };
  const s = Number(o);
  return { raw: o, num: Number.isFinite(s) ? s : null, unit: e, entity: t, available: !0 };
}
class tn {
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
    return js(t?.state, t?.attributes?.unit_of_measurement, e);
  }
  async history(e, t, s) {
    const i = this.entityOf(e, t);
    return i ? Zn(this.hass, i, s) : [];
  }
}
async function Zn(o, e, t) {
  const s = /* @__PURE__ */ new Date(), i = new Date(s.getTime() - t * 36e5);
  return ((await o.callWS({
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
    return Number.isFinite(p) || (p = en.has(l) ? 1 : l === "off" || l === "false" ? 0 : null), { t: a.lu, v: p, raw: String(a.s) };
  });
}
function xe(o, e) {
  const t = /* @__PURE__ */ new Set(), s = (i) => e.get(o, i);
  switch (o.type) {
    case "pump":
    case "mixer":
      (Q(s("running")) || Q(s("speed")) || Q(s("flow"))) && t.add("running"), o.type === "mixer" && Q(s("position")) && t.add("running");
      break;
    case "valve_3way": {
      const i = s("position");
      t.add(Q(i) ? "b" : "a");
      break;
    }
    case "outdoor_unit": {
      const i = Je(s("activity"));
      (Q(s("compressor_on")) || Q(s("compressor_speed")) || Q(s("heat_power"))) && t.add("running"), i === "defrost" && t.add("defrost"), i === "compressor_alarm" && t.add("alarm"), i && i !== "off" && i !== "compressor_alarm" && t.add("running"), i && t.add(`mode_${i}`);
      break;
    }
    case "indoor_unit": {
      (Q(s("aux_level")) || Q(s("aux_step1")) || Q(s("aux_step2")) || Q(s("aux_step3"))) && t.add("aux"), (Q(s("pc0_running")) || Q(s("pc0_speed")) || Q(s("flow"))) && t.add("running"), t.add(Q(s("vw1_position")) || !o.bindings.vw1_position && Q(s("dhw_active")) && !Q(s("heating_active")) ? "b" : "a"), (Q(s("pc1_running")) || Q(s("pc1_speed"))) && t.add("pc1"), Q(s("dhw_charging")) && t.add("charging");
      const i = Q(s("dhw_active")) || t.has("running") && t.has("b") ? "hot_water" : Q(s("heating_active")) || t.has("running") ? "heating" : "off";
      t.add(`mode_${i}`);
      break;
    }
    case "dhw_tank":
      Q(s("charging")) && t.add("charging"), Q(s("disinfecting")) && t.add("disinfecting");
      break;
    case "tap":
      Q(s("flow")) && t.add("flowing");
      break;
    case "radiators":
    case "floor_heating":
      t.add("on");
      break;
  }
  return t;
}
function gi(o, e) {
  const t = e.get(o.c);
  return t ? o.s.startsWith("!") ? !t.has(o.s.slice(1)) : t.has(o.s) : !1;
}
function Gn(o, e) {
  const t = o.flow || [], s = o.flowAny || [];
  return t.length === 0 && s.length === 0 ? !1 : t.every((i) => gi(i, e)) && (s.length === 0 || s.some((i) => gi(i, e)));
}
function Yn(o, e) {
  const t = new Map(o.components.map((n) => [n.id, n])), s = /* @__PURE__ */ new Map(), i = (n) => {
    const r = t.get(n.c);
    if (!r) return;
    const a = ge(r, n.p);
    if (a) {
      if (a.def.fixedTemp !== void 0) return a.def.fixedTemp;
      if (a.def.tempSlot) {
        const l = e.get(r, a.def.tempSlot);
        if (l?.available && l.num !== null) return l.num;
      }
    }
  };
  for (const n of o.pipes) {
    if (n.bindings?.temp) {
      const a = e.getEntity(n.bindings.temp);
      if (a?.available && a.num !== null) {
        s.set(n.id, a.num);
        continue;
      }
    }
    const r = i(n.from);
    r !== void 0 && s.set(n.id, r);
  }
  for (let n = 0; n < 6; n++) {
    let r = !1;
    for (const a of o.pipes) {
      if (s.has(a.id)) continue;
      const l = t.get(a.from.c);
      if (l && ie[l.type].passive) {
        const p = o.pipes.find((d) => d.to.c === l.id && s.has(d.id));
        if (p) {
          s.set(a.id, s.get(p.id)), r = !0;
          continue;
        }
      }
      if (n === 5 || !l || !ie[l.type].passive) {
        const p = i(a.to);
        p !== void 0 && (s.set(a.id, p), r = !0);
      }
    }
    if (!r && n > 0) break;
  }
  return s;
}
const qn = {
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
function nt(o, e) {
  return ye(o).find((t) => t.key === e)?.kind || "text";
}
function Oe(o, e) {
  if (!o) return { text: c("none"), unit: "" };
  if (!o.available) return { text: c("none"), unit: "" };
  if (e === "bool") return { text: Q(o) ? c("on") : c("off"), unit: "" };
  if (e === "enum" && o.num === null) {
    const r = `mode.${Je(o)}`, a = c(r);
    return { text: a === r ? String(o.raw) : a, unit: "" };
  }
  let t = o.unit ?? qn[e] ?? "";
  if (o.num === null) return { text: String(o.raw), unit: "" };
  let s = o.num;
  e === "power_w" && t === "W" && Math.abs(s) >= 1e3 && (s = s / 1e3, t = "kW");
  const i = e === "count" || e === "percent" || e === "flow" || e === "duration" || e === "power_w" && t === "W" || e === "energy" && s >= 100 ? 0 : 1;
  return { text: F(s, i), unit: t };
}
function de(o, e) {
  if (o === void 0 || Number.isNaN(o)) return e;
  const t = [
    [5, [43, 108, 255]],
    [20, [34, 195, 230]],
    [28, [61, 220, 151]],
    [36, [245, 197, 66]],
    [44, [255, 138, 61]],
    [54, [255, 77, 77]],
    [65, [224, 33, 122]]
  ];
  if (o <= t[0][0]) return yt(t[0][1]);
  for (let s = 1; s < t.length; s++) {
    const [i, n] = t[s], [r, a] = t[s - 1];
    if (o <= i) {
      const l = (o - r) / (i - r);
      return yt([0, 1, 2].map((p) => a[p] + (n[p] - a[p]) * l));
    }
  }
  return yt(t[t.length - 1][1]);
}
function yt(o) {
  return `rgb(${o.map((e) => Math.round(e)).join(",")})`;
}
function Jn(o, e) {
  const t = (i, n, r) => yt([0, 1, 2].map((a) => i[a] + (n[a] - i[a]) * Math.max(0, Math.min(1, r)))), s = (i, n) => e === void 0 ? 0.5 : (e - i) / (n - i);
  switch (o) {
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
      return de(e, "#8a97a6");
  }
}
function sn(o) {
  const e = o?.split(".")[0];
  return e === "number" || e === "input_number" ? "number" : e === "select" || e === "input_select" ? "select" : e === "switch" || e === "input_boolean" ? "switch" : e === "button" || e === "input_button" ? "button" : null;
}
function nn(o, e = -12) {
  return {
    design: o ? 35 : 50,
    minExt: e,
    offset: 0,
    roomSet: 21,
    minFlow: o ? 22 : 25,
    maxFlow: o ? 40 : 55,
    limit: 16,
    exponent: o ? 1.1 : 1.3
  };
}
function ot(o, e) {
  if (e >= o.limit) return null;
  const t = Math.max(1, o.roomSet - o.minExt), s = Math.max(0, (o.roomSet - e) / t), i = o.roomSet + (o.design - o.roomSet) * Math.pow(s, 1 / o.exponent);
  return Math.max(o.minFlow, Math.min(o.maxFlow, i + o.offset));
}
function Xn(o, e) {
  const t = o.exponent > 1.2 ? 2.5 : 1.5, s = (o.roomSet - e) * t;
  return Math.round(s * 2) / 2;
}
const Qn = {
  nominal: 7.1,
  source: "air",
  bufferL: 120,
  dhwL: 274,
  auxKw: 6,
  heatLoad: 6.2,
  designTemp: -12,
  floor: !1
}, je = 4.186 / 3600, _i = 10, Qt = 21, eo = 10, to = [
  // hour of day, minutes, litres per minute (mixed at 40 °C)
  [6.5, 7, 9],
  [6.85, 6, 9],
  [7.2, 5, 8],
  [12.25, 2, 4],
  [18.6, 3, 5],
  [20.4, 8, 9],
  [21.1, 6, 9]
], so = [
  [6, 7.5],
  [11.5, 12.5],
  [17.5, 19]
];
class io {
  constructor(e = {}, t = Date.now() / 1e3, s) {
    this.speed = 60, this.outdoorMean = 2, this.dailySwing = 2.5, this.tOut = 2, this.tRoom = 20.8, this.bufTop = 38, this.bufBot = 33, this.dhwTop = 49, this.dhwBot = 43, this.tVl = 30, this.tRl = 28, this.tVlHc = 38, this.tRlHc = 32, this.mode = "off", this.pTh = 0, this.pEl = 0, this.cop = 0, this.running = !1, this.lastStart = -1e9, this.lastStop = -1e9, this.pc0Overrun = 0, this.ice = 0.3, this.defrostLeft = 0, this.aux = 0, this.auxTimer = 0, this.heatDemand = !1, this.dhwDemand = !1, this.tapFlow = 0, this.tapLeft = 0, this.qEmit = 0, this.starts = 0, this.e = { el: 0, heat: 0, elHeat: 0, elDhw: 0, heatHeat: 0, heatDhw: 0, aux: 0 }, this.dim14a = !1, this.pv = !1, this.soc = 55, this.cloud = 0.8, this.en = { pv: 0, house: 0.4, wallbox: 0, battery: 0, grid: 0, hp: 0 }, this.disinfect = !1, this.fault = !1, this.lastDrawDay = /* @__PURE__ */ new Map(), this.days = /* @__PURE__ */ new Map(), this.sampleAcc = 0, this.hist = /* @__PURE__ */ new Map(), this.active = /* @__PURE__ */ new Map(), this.messages = [], this.labels = { dhw: "WW" }, this.listeners = [], this.p = { ...Qn, ...e }, this.curve = nn(this.p.floor, this.p.designTemp), s && (this.labels = { ...this.labels, ...s }), this.time = t - 24 * 3600, this.prefill(t);
  }
  prefill(e) {
    const t = this.listeners;
    for (this.listeners = []; this.time < e; ) this.step(_i);
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
      const i = Math.min(_i, t);
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
    return (ot(this.curve, this.tOut) ?? this.curve.minFlow) + e;
  }
  dhwSetpoint() {
    return this.disinfect ? 60 : this.pv ? 55 : 50;
  }
  step(e) {
    this.time += e;
    const t = this.hour(), s = e / 3600, i = this.p, n = this.outdoorMean + this.dailySwing * Math.cos((t - 15) / 24 * 2 * Math.PI);
    this.tOut += (n - this.tOut) * Math.min(1, e / 1800);
    const r = this.tOut < this.curve.limit, a = this.curveSetpoint(), l = r ? 650 * je * 3600 / 3600 : 0, p = i.heatLoad * (i.floor, 1), d = i.floor ? 30 - Qt : 45 - Qt, h = i.floor ? 1.1 : 1.3;
    let m = 0;
    if (this.tVlHc = this.bufTop, l > 0) {
      let C = this.tVlHc - 3;
      for (let P = 0; P < 4; P++)
        m = p * Math.pow(Math.max(0, (C - this.tRoom) / d), h), C = this.tVlHc - m / (2 * l);
      m *= Math.max(0.1, Math.min(1, 1 - (this.tRoom - this.curve.roomSet - 0.2) * 1.5)), this.tRlHc = this.tVlHc - m / l;
    } else
      this.tRlHc = this.bufBot;
    this.qEmit = m;
    const u = i.heatLoad / (Qt - i.designTemp);
    this.tRoom += (m - u * (this.tRoom - this.tOut) + 0.35) * s / 9;
    const w = Math.floor(this.time / 86400);
    to.forEach(([C, P, O], T) => {
      t >= C && t < C + 0.1 && this.lastDrawDay.get(T) !== w && (this.lastDrawDay.set(T, w), this.startDraw(P, O));
    }), this.tapLeft > 0 && (this.tapLeft -= e, this.tapLeft <= 0 && (this.tapFlow = 0));
    const _ = so.some(([C, P]) => t >= C && t < P), y = i.dhwL / 2 * je, b = this.tapFlow * 60 * je * (40 - eo), x = 1.38 / 24 / 2 + (_ ? 0.12 : 0) / 2;
    this.dhwTop -= (b * 0.35 + x) * s / y, this.dhwBot -= (b * 0.65 + x) * s / y;
    const $ = this.dhwSetpoint();
    (this.dhwTop < $ - 5 || this.dhwBot < $ - 14 || this.disinfect && this.dhwBot < 59) && (this.dhwDemand = !0), this.dhwBot >= $ - 0.5 && this.dhwTop >= $ - 0.5 && (this.dhwDemand = !1, this.disinfect && (this.disinfect = !1, this.condition("dis", !1, "info", "dhw_disinfection", {}, "dhw"))), r && this.bufTop < a - 2 && (this.heatDemand = !0);
    const A = this.time - this.lastStart > 600;
    (!r || this.bufTop > a + 2.5 && A) && (this.heatDemand = !1);
    let L = this.fault ? "compressor_alarm" : this.dhwDemand ? "hot_water" : this.heatDemand ? "heating" : "off";
    this.defrostLeft > 0 && !this.fault && (L = "defrost");
    const W = L === "heating" || L === "hot_water" || L === "defrost";
    W && !this.running ? this.time - this.lastStop >= 480 || L === "defrost" ? (this.running = !0, this.lastStart = this.time, this.starts++, this.pTh = this.pMin()) : L = "off" : !W && this.running && (this.time - this.lastStart > 600 || this.fault ? (this.running = !1, this.lastStop = this.time, this.pc0Overrun = 180) : L = this.mode === "hot_water" ? "hot_water" : "heating"), this.mode = this.running ? L : this.fault ? "compressor_alarm" : "off";
    const G = this.pMax(), U = this.pMin();
    let ce = 0;
    if (this.running && this.mode === "heating" ? ce = this.qEmit + 2.2 * (a + 1 - this.bufTop) : this.running && this.mode === "hot_water" && (ce = Math.min(G * 0.9, Math.max(U, (60 - this.dhwBot - 3) * 0.9))), this.running && this.mode !== "defrost") {
      ce = Math.max(U, Math.min(G, ce)), this.pTh < U && (this.pTh = U);
      const C = 0.5 * (e / 60);
      this.pTh += Math.max(-C * 2, Math.min(C, ce - this.pTh));
    } else this.mode === "defrost" ? this.pTh = -3 : this.pTh = 0;
    let oe = 0;
    this.dim14a || (this.fault && r ? oe = i.auxKw : this.mode === "heating" && this.bufTop < a - 5 && this.pTh >= G * 0.95 ? (this.auxTimer += e, this.auxTimer > 1200 && (oe = Math.min(i.auxKw, 3))) : this.auxTimer = 0, this.tOut < i.designTemp + 2 && this.mode === "heating" && (oe = Math.max(oe, Math.min(i.auxKw, 3))), this.disinfect && this.mode === "hot_water" && this.dhwBot > 52 && (oe = Math.min(i.auxKw, 3))), this.fault && r && oe > 0 && (this.heatDemand = !0), this.aux = oe;
    const ee = this.running || this.pc0Overrun > 0 || this.fault && this.aux > 0;
    !this.running && this.pc0Overrun > 0 && (this.pc0Overrun -= e);
    const j = ee ? 1100 * je : 0, te = this.mode === "hot_water", R = (this.running ? this.pTh : 0) + this.aux;
    te ? this.tRl = this.dhwBot + 2 : this.tRl = ee ? this.bufBot : this.tRl + (22 - this.tRl) * Math.min(1, e / 3600), this.tVl = j > 0 ? this.tRl + R / j : this.tVl + (this.tRl - this.tVl) * Math.min(1, e / 600);
    const B = (i.bufferL + 60) / 2 * je, q = te ? 0 : j, N = 0.05 / 2, J = q * (this.tVl - this.bufTop) + (l > q ? (l - q) * (this.bufBot - this.bufTop) : 0) - N, re = l * (this.tRlHc - this.bufBot) + (q > l ? (q - l) * (this.bufTop - this.bufBot) : 0) - N;
    if (this.bufTop += J * s / B, this.bufBot += re * s / B, this.bufBot > this.bufTop) {
      const C = (this.bufBot + this.bufTop) / 2;
      this.bufBot = this.bufTop = C;
    }
    if (te && (this.dhwBot += R * s / y, this.dhwBot > this.dhwTop)) {
      const C = (this.dhwBot + this.dhwTop) / 2;
      this.dhwBot = this.dhwTop = C;
    }
    if (this.running && this.mode !== "defrost") {
      const C = this.tVl + 273.15 + 3, P = (this.p.source === "air" ? this.tOut - 6 : 0) + 273.15;
      this.cop = Math.max(1.4, Math.min(7.5, 0.57 * C / Math.max(5, C - P))), this.pEl = this.pTh / this.cop + 0.06;
    } else this.mode === "defrost" ? (this.cop = 0, this.pEl = 1.1) : (this.cop = 0, this.pEl = 0.012 + (ee ? 0.03 : 0));
    const I = Math.max(0, this.running ? this.pTh : 0);
    this.e.el += (this.pEl + this.aux) * s, this.e.aux += this.aux * s, this.e.heat += (I + this.aux) * s;
    const M = new Date(this.time * 1e3), S = new Date(M.getFullYear(), M.getMonth(), M.getDate()).getTime();
    let D = this.days.get(S);
    if (!D) {
      this.days.set(S, D = { heat: 0, el: 0, heatDhw: 0, elDhw: 0, aux: 0 });
      for (const C of [...this.days.keys()]) C < S - 3 * 864e5 && this.days.delete(C);
    }
    if (D.heat += (I + this.aux) * s, D.el += (this.pEl + this.aux) * s, D.aux += this.aux * s, te && (D.heatDhw += I * s, D.elDhw += this.pEl * s), te ? (this.e.elDhw += this.pEl * s, this.e.heatDhw += I * s) : (this.e.elHeat += this.pEl * s, this.e.heatHeat += I * s), this.defrostLeft > 0)
      this.defrostLeft -= e, this.defrostLeft <= 0 && (this.ice = 0, this.defrostLeft = 0);
    else if (this.p.source === "air" && this.running && this.tOut < 7 && this.tOut > -15) {
      const C = this.tOut > -2 ? 1.3 - Math.abs(this.tOut - 1) * 0.12 : 0.9 + this.tOut * 0.04;
      this.ice += Math.max(0.05, C) * (this.pTh / G) * s, this.ice >= 1 && (this.defrostLeft = 240 + Math.random() * 120);
    }
    this.emitConditions(), this.energyStep(e, t), this.values = this.buildValues(a, $, _, ee, j), this.sampleAcc += e, this.sampleAcc >= 60 && (this.sampleAcc = 0, this.sample());
  }
  /** Household power balance around the heat pump (PV, battery, house, wallbox, grid). */
  energyStep(e, t) {
    const s = e / 3600;
    this.cloud += (Math.random() - 0.5) * 0.08 * Math.sqrt(e / 10), this.cloud = Math.max(0.35, Math.min(1, this.cloud));
    const i = Math.max(0.25, Math.min(1, 0.45 + (this.outdoorMean - 2) / 25)), n = t > 7 && t < 19 ? Math.sin((t - 7) / 12 * Math.PI) : 0;
    let r = 9.9 * 0.8 * i * n * this.cloud;
    this.pv && (r = Math.max(r, 6.5));
    const a = (_, y, b) => t >= _ && t < y ? b : 0, l = 0.35 + a(6.5, 8, 0.6) + a(11.5, 13, 0.9) + a(18, 21, 0.8) + 0.05 * Math.sin(this.time / 97);
    let d = Math.floor(this.time / 86400) % 2 === 0 && t >= 18 && t < 21.5 ? 7.4 : 0;
    this.dim14a && d && (d = 4.2);
    const h = this.pEl + this.aux, m = r - l - d - h;
    let u = 0;
    m > 0 && this.soc < 100 ? u = -Math.min(m, 5) : m < 0 && this.soc > 10 && !d && (u = Math.min(-m, 5)), this.soc = Math.max(0, Math.min(100, this.soc - u * s * 100 / 10));
    const w = l + d + h - r - u;
    this.en = { pv: r, house: l, wallbox: d, battery: u, grid: w, hp: h };
  }
  startDraw(e, t) {
    this.tapFlow = t, this.tapLeft = e * 60;
  }
  buildValues(e, t, s, i, n) {
    const r = (p) => Math.round(p * 10) / 10, a = this.pMax(), l = this.running;
    return {
      outdoor: {
        outdoor_temp: r(this.tOut),
        air_in_temp: r(this.tOut + 0.4),
        activity: this.mode,
        compressor_on: l && this.mode !== "defrost" ? !0 : l,
        compressor_speed: l ? Math.round(Math.abs(this.pTh) / (a * 1.15) * 100) : 0,
        fan_speed: l && this.mode !== "defrost" ? Math.round(35 + this.pTh / a * 55) : 0,
        heat_power: r(Math.max(0, l ? this.pTh : 0)),
        el_power: Math.round(this.pEl * 1e3),
        compressor_starts: this.starts,
        evap_in_temp: r(this.tOut - (l ? 6 : 0)),
        comp_in_temp: r(this.tOut - (l ? 2 : 0)),
        comp_out_temp: r(l ? this.tVl + 28 : this.tOut + 5),
        hp_temp: r(l ? this.tVl + 3 : this.tOut),
        lp_temp: r(l ? this.tOut - 7 : this.tOut),
        drain_pan_temp: r(this.mode === "defrost" ? 4 : Math.max(this.tOut, 1)),
        silent_mode: "auto"
      },
      indoor: {
        supply_temp: r(this.tVl),
        return_temp: r(this.tRl),
        condenser_temp: r(this.tVl + (l ? 1 : 0)),
        target_flow_temp: r(this.mode === "hot_water" ? Math.min(62, t + 8) : e),
        pressure: r(1.45 + ((this.bufTop + this.bufBot) / 2 - 30) * 8e-3),
        flow: i ? Math.round(n / je) : 0,
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
        el_energy_total: r(this.e.el),
        el_energy_heating: r(this.e.elHeat),
        el_energy_dhw: r(this.e.elDhw),
        heat_energy_total: r(this.e.heat),
        heat_energy_heating: r(this.e.heatHeat),
        heat_energy_dhw: r(this.e.heatDhw),
        aux_energy_total: r(this.e.aux),
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
      buffer: { temp_top: r(this.bufTop), temp_mid: r((this.bufTop + this.bufBot) / 2), temp_bottom: r(this.bufBot) },
      dhw: {
        temp_top: r(this.dhwTop),
        temp_bottom: r(this.dhwBot),
        setpoint: t,
        charging: this.mode === "hot_water",
        onetime: !1,
        disinfecting: this.disinfect
      },
      hc: {
        flow_temp: r(this.tVlHc),
        return_temp: r(this.tRlHc),
        target_flow_temp: r(e),
        room_temp: r(this.tRoom),
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
      tap: { flow: this.tapFlow, temp: r(this.dhwTop - 2) },
      mixer: { position: this.tOut < 16 ? 40 : 0, flow_temp: r(Math.min(this.tVlHc, 33)) }
    };
  }
  // ----------------------------------------------------------- messages
  condition(e, t, s, i, n, r) {
    const a = this.active.get(e);
    if (t && !a) {
      const l = {
        id: Math.random().toString(16).slice(2, 14),
        ts: this.time,
        level: s,
        key: i,
        params: n,
        component_id: r,
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
        const r = typeof n == "number" ? n : typeof n == "boolean" ? n ? 1 : 0 : null;
        if (r === null && i !== "activity") continue;
        const a = `${t}.${i}`;
        let l = this.hist.get(a);
        l || this.hist.set(a, l = []), l.push(r === null ? { t: e, v: null, raw: String(n) } : { t: e, v: r }), l.length > 1500 && l.splice(0, l.length - 1440);
      }
  }
  dailyEnergy() {
    return [...this.days.entries()].sort((e, t) => e[0] - t[0]).map(([e, t]) => ({ day: e, ...t }));
  }
  history(e, t, s) {
    const i = this.hist.get(`${e}.${t}`) || [], n = this.time - s * 3600;
    return i.filter((r) => r.t >= n);
  }
}
function wi(o) {
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
      const e = o.props.role;
      return e === "primary" ? "pc0" : e === "circulation" ? "circ" : "pc1";
    }
    default:
      return null;
  }
}
function es(o) {
  if (!o) return {};
  const e = o.components.find((l) => l.type === "outdoor_unit"), t = o.components.find((l) => l.type === "indoor_unit"), s = o.components.find((l) => l.type === "buffer"), i = o.components.find((l) => l.type === "dhw_tank"), n = qe(t?.model), r = Ie(e?.model), a = o.components.filter((l) => l.type === "radiators" || l.type === "floor_heating");
  return {
    nominal: Number(e?.props.nominal_kw) || r.nominal,
    source: r.source,
    bufferL: Number(s?.props.volume) || n?.buffer || (s ? 120 : 30),
    dhwL: Number(i?.props.volume) || n?.dhw || 274,
    auxKw: Number(t?.props.aux_kw) || 6,
    heatLoad: Number(o.settings?.heat_load) || 6.2,
    floor: a.length > 0 && a.every((l) => l.type === "floor_heating")
  };
}
const no = {}, bi = {
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
class on {
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
    return t ? js(t.state, t.attributes?.unit_of_measurement, e) : void 0;
  }
  get(e, t) {
    if (e.type === "value_tile") {
      const n = (e.props.entries || []).find((l) => l.slot === t);
      if (!n?.sim) return;
      const [r, a] = n.sim.split(".");
      return this.wrap(this.sim.values[r]?.[a]);
    }
    if (e.type === "indoor_unit") {
      const n = bi[t];
      if (n) {
        const r = We(e)?.id;
        return t.startsWith("dhw_") && r !== "t180" || t === "buffer_temp" && r !== "tp70" || t.startsWith("pc1") && r === "wall_e" ? void 0 : this.wrap(this.sim.values[n[0]]?.[n[1]]);
      }
    }
    const s = wi(e);
    if (!s) return;
    let i = this.sim.values[s]?.[t];
    if (i !== void 0)
      return s === "hc" && typeof i == "number" && Number(e.props.circuit) > 1 && ["flow_temp", "return_temp", "target_flow_temp"].includes(t) && (i = Math.round((i - (e.type === "floor_heating" ? 12 : 2)) * 10) / 10), this.wrap(i, no[t]);
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
    const i = e.type === "indoor_unit" ? bi[t] : void 0;
    if (i) return this.sim.history(i[0], i[1], s);
    const n = wi(e);
    return n ? this.sim.history(n, t, s) : [];
  }
}
function us() {
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
class oo {
  constructor() {
    this.components = [], this.pipes = [], this.n = 0;
  }
  add(e, t, s, i, n, r = {}) {
    return this.components.push({ id: e, type: t, label: s, x: i, y: n, bindings: {}, props: {}, ...r }), e;
  }
  pipe(e, t, s, i = [], n = {}) {
    this.pipes.push({ id: `p${++this.n}`, from: e, to: t, kind: s, flow: i, ...n });
  }
}
const f = (o, e) => ({ c: o, p: e });
function Yt(o, e) {
  const t = new oo(), s = qe(o.indoorModel), i = s?.variant || "wall_e", n = !!s?.dhw, r = !!s?.buffer, a = o.dhw === "tank" && !n, l = o.dhw === "tank" || n, p = o.buffer !== "none" && !r, d = { c: "iu", s: "running" }, h = l ? [{ c: "iu", s: "a" }] : [], m = { c: "iu", s: "b" }, u = { c: "pc1", s: "running" }, w = {
    aux_kw: o.aux ? o.auxKw : 0,
    input_labels: { input1: "§14a / EVU", input4: "PV" },
    input_levels: { input1: "warning" },
    pressure_min: 1,
    pressure_max: 2.7,
    buffer_l: s?.buffer
  }, _ = i !== "wall_e", y = o.circuits.length === 1 && !o.circuits[0]?.mixed && o.circuits[0]?.emitter === "radiators", b = _ && y && (i === "tp70" || i === "brine" || i === "t180"), x = !b && i === "tp70" && o.circuits.length <= 1 && !o.circuits[0]?.mixed, $ = o.circuits[0], A = i === "wall_e" && o.buffer === "parallel" && !r && o.circuits.length === 1 && !$?.mixed && $?.emitter === "radiators", L = 50, W = 16, G = b && i === "t180", U = G ? p ? 48 : 32 : 16, ce = b && Ie(o.outdoorModel).source === "brine", oe = G ? U + 2 : 1, ee = b ? ce ? W + 3 : W - 7 : A ? W - 7 : x ? 5 : 12;
  t.add("ou", "outdoor_unit", o.outdoorLabel || c("type.outdoor_unit"), oe, ee, {
    model: o.outdoorModel,
    props: { nominal_kw: o.nominalKw }
  });
  const j = b ? i === "t180" ? p ? 36 : 20 : 24 : A ? 30 : x ? 22 : _ ? 14 : 16, te = b ? L - (i === "t180" ? 22 : i === "tp70" ? 16 : 14) : A ? L - 29 : x ? 27 : _ ? 12 : 2;
  t.add("iu", "indoor_unit", o.indoorLabel || c("type.indoor_unit"), j, te, { model: o.indoorModel, props: w });
  const R = t.components.find((M) => M.id === "iu"), B = (M) => ge(R, M), q = { y: ee + 5 }, N = (M, S, D, C, P, O, T = !0, H = {}) => {
    const le = T ? 1 : -1, K = D + 2 * le, Z = H.supSrcX ?? D + le, se = H.jogY ?? C - 2, _e = T ? D - 8 : D + 1, pe = W - 8, me = o.circuits[0];
    t.add("hc1", me.emitter, me.label || c("wz.circuit", { n: 1 }), _e, pe, { flip: T, props: { circuit: 1 } });
    let Pe = P;
    const Zs = Z === K ? [] : [[Z, se], [K, se]];
    O ? (Pe = [{ c: "pc1", s: "running" }], t.add("pc1", "pump", "PC1", K - 1, H.pumpY ?? C - 10, { rot: 270, props: { role: "secondary", circuit: 1 } }), t.pipe(S, f("pc1", "in"), "supply", Pe, { via: Zs }), t.pipe(f("pc1", "out"), f("hc1", "sup"), "supply", Pe, { via: [[K, pe + 1]] })) : t.pipe(S, f("hc1", "sup"), "supply", Pe, { via: [...Zs, [K, pe + 1]] });
    let Xe = f("hc1", "ret"), Ce = [[D, pe + 5]];
    if (H.chainY !== void 0) {
      let ut = H.chainY;
      const Gs = [];
      o.separator && Gs.push(["sep", c("wz.separator_short"), {}], ["sc1", "SC1", { filter: !0 }]);
      for (const [qt, mn, fn] of Gs)
        t.add(qt, "separator", mn, D - 1, ut, { rot: 90, props: fn }), t.pipe(Xe, f(qt, "in"), "return", Pe, { via: Ce }), Xe = f(qt, "out"), Ce = [], ut += 3;
      o.expansion && H.mag !== !1 && (t.add("jmag", "junction", "", D, ut + 1), t.add("mag", "expansion_vessel", "MAG", T ? D - 4 : D + 1, ut, { rot: T ? 270 : 90 }), t.pipe(f("mag", "conn"), f("jmag", T ? "l" : "r"), "return", []), t.pipe(Xe, f("jmag", "t"), "return", Pe, { via: Ce }), Xe = f("jmag", "b"), Ce = []);
    }
    H.retSrcX !== void 0 && H.retSrcX !== D && (Ce = [...Ce, [D, H.retJogY ?? C - 1], [H.retSrcX, H.retJogY ?? C - 1]]), t.pipe(Xe, M, "return", Pe, { via: Ce });
  }, J = (M, S, D, C, P) => {
    const O = { c: "tap", s: "flowing" }, T = { c: "circ", s: "running" }, H = C + D;
    if (t.add("tap", "tap", c("wz.shower"), C - 6, W - 9, { props: { variant: "shower" } }), t.add("inlet", "water_inlet", c("type.water_inlet"), P, S + 9, { flip: !0 }), t.pipe(f("inlet", "out"), f("dhw", "cold"), "dhw_cold", [O]), !o.circulation) {
      t.pipe(f("dhw", "hot"), f("tap", "hot"), "dhw_hot", [O], { via: [[C, S + 1], [C, W - 8]] });
      return;
    }
    t.add("jww", "junction", "", C, W - 7), t.pipe(f("dhw", "hot"), f("jww", "b"), "dhw_hot", [], { via: [[C, S + 1]], flowAny: [O, T] }), t.pipe(f("jww", "t"), f("tap", "hot"), "dhw_hot", [O], { via: [[C, W - 8]] }), t.add("circ", "pump", "PW2", H - 1, S + 2, { rot: 90, props: { role: "circulation" } }), t.pipe(f("jww", "r"), f("circ", "in"), "circulation", [T], { via: [[H, W - 7]] }), t.pipe(f("circ", "out"), f("dhw", "circ"), "circulation", [T], { via: [[H, S + 6]] });
  };
  if (b) {
    const M = te, S = (C) => B(C).x;
    G ? (t.pipe(f("ou", "out"), f("iu", "src_in"), "supply", [d], { via: [[oe + 10, ee + 6], [oe + 10, W + 1], [S("src_in"), W + 1]] }), t.pipe(f("iu", "src_out"), f("ou", "in"), "return", [d], { via: [[S("src_out"), W + 2], [oe + 11, W + 2], [oe + 11, ee + 5]] })) : ce ? (t.pipe(f("iu", "src_out"), f("ou", "in"), "return", [d], { via: [[S("src_out"), W + 1], [U - 3, W + 1], [U - 3, ee + 5]] }), t.pipe(f("ou", "out"), f("iu", "src_in"), "supply", [d], { via: [[U - 2, ee + 6], [U - 2, W + 2], [S("src_in"), W + 2]] })) : (t.pipe(f("iu", "src_out"), f("ou", "in"), "return", [d], { via: [[S("src_out"), W + 1], [U - 2, W + 1], [U - 2, ee + 5]] }), t.pipe(f("ou", "out"), f("iu", "src_in"), "supply", [d], { via: [[U - 3, ee + 6], [U - 3, W + 2], [S("src_in"), W + 2]] }));
    const D = W + 4;
    if (i === "tp70") {
      const C = { c: "iu", s: "pc1" };
      N(f("iu", "ret"), f("iu", "sup"), S("ret"), M, [C], !1, !1, { supSrcX: S("sup"), chainY: D, mag: !1 });
      const P = j + 12, O = L - 11;
      t.add("dhw", "dhw_tank", o.dhwLabel || c("type.dhw_tank"), P, O, { flip: !0, props: { volume: o.dhwVolume } }), t.pipe(f("iu", "dhw_sup"), f("dhw", "coil_in"), "supply", [d, m], { via: [[S("dhw_sup"), M - 2], [P - 1, M - 2], [P - 1, O + 4]] }), t.pipe(f("dhw", "coil_out"), f("iu", "dhw_ret"), "return", [d, m], { via: [[P - 2, O + 9], [P - 2, M - 1], [S("dhw_ret"), M - 1]] }), J(P, O, 1, P + 8, P + 10);
    } else if (i === "t180") {
      const C = { c: "tap", s: "flowing" }, P = { c: "circ", s: "running" }, O = { c: "iu", s: "pc1" };
      if (p) {
        const H = j - 16, le = L - 9, K = M - 6, Z = M - 4, se = [d, ...h];
        t.add("buf", "buffer", o.bufferLabel || c("type.buffer"), H, le, { flip: !0, props: { volume: o.bufferVolume } }), t.pipe(f("iu", "sup"), f("buf", "in_sup"), "supply", se, { via: [[S("sup"), K], [H + 4, K]] });
        let _e = f("buf", "in_ret"), pe = [[H + 3, Z]], me = H + 5;
        o.separator && (t.add("sep", "separator", c("wz.separator_short"), me, Z - 1), t.add("sc1", "separator", "SC1", me + 3, Z - 1, { props: { filter: !0 } }), t.pipe(_e, f("sep", "in"), "return", se, { via: pe }), t.pipe(f("sep", "out"), f("sc1", "in"), "return", se), _e = f("sc1", "out"), pe = [], me += 7), o.expansion && (t.add("jmag", "junction", "", me + 1, Z), t.add("mag", "expansion_vessel", "MAG", me, Z, { rot: 180 }), t.pipe(f("mag", "conn"), f("jmag", "b"), "return", []), t.pipe(_e, f("jmag", "l"), "return", se, { via: pe }), _e = f("jmag", "r"), pe = []), t.pipe(_e, f("iu", "ret"), "return", se, { via: [...pe, [S("ret"), Z]] }), N(f("buf", "out_ret"), f("buf", "out_sup"), H + 2, le, [u], !0, !1, { supSrcX: H + 1 });
      } else
        N(f("iu", "ret"), f("iu", "sup"), S("ret") - 3, M, [O], !1, !0, {
          supSrcX: S("sup"),
          jogY: M - 2,
          retSrcX: S("ret"),
          retJogY: M - 1
        });
      const T = S("dhw_hot");
      t.add("tap", "tap", c("wz.shower"), T + 2, W - 9, { flip: !0, props: { variant: "shower" } }), o.circulation ? (t.add("jww", "junction", "", T, W - 5), t.pipe(f("iu", "dhw_hot"), f("jww", "b"), "dhw_hot", [], { flowAny: [C, P] }), t.pipe(f("jww", "t"), f("tap", "hot"), "dhw_hot", [C], { via: [[T, W - 8]] }), t.add("circ", "pump", "PW2", S("circ") - 1, p ? W + 1 : M - 8, { rot: 90, props: { role: "circulation" } }), t.pipe(f("jww", "l"), f("circ", "in"), "circulation", [P], { via: [[S("circ"), W - 5]] }), t.pipe(f("circ", "out"), f("iu", "circ"), "circulation", [P])) : t.pipe(f("iu", "dhw_hot"), f("tap", "hot"), "dhw_hot", [C], { via: [[T, W - 8]] }), t.add("inlet", "water_inlet", c("type.water_inlet"), U - 4, M - 5, { flip: !0 }), t.pipe(f("inlet", "out"), f("iu", "dhw_cold"), "dhw_cold", [C], { via: [[S("dhw_cold"), M - 4]] });
    } else {
      const C = [d, ...h];
      let P = j + 12;
      if (p) {
        const O = j + 12, T = L - 9;
        t.add("buf", "buffer", o.bufferLabel || c("type.buffer"), O, T, { props: { volume: o.bufferVolume } }), t.pipe(f("iu", "sup"), f("buf", "in_sup"), "supply", C, { via: [[S("sup"), M - 1], [O + 1, M - 1]] }), t.pipe(f("buf", "in_ret"), f("iu", "ret"), "return", C, { via: [[O + 2, M - 2], [S("ret"), M - 2]] }), N(f("buf", "out_ret"), f("buf", "out_sup"), O + 3, T, [u], !0, !0, { chainY: D, pumpY: W + 12 }), P = O + 10;
      } else
        N(f("iu", "ret"), f("iu", "sup"), S("ret"), M + 1, C, !1, !0, { supSrcX: S("sup"), chainY: D, mag: !1 }), P = j + 14;
      if (a) {
        const O = P, T = L - 11;
        t.add("dhw", "dhw_tank", o.dhwLabel || c("type.dhw_tank"), O, T, { flip: !0, props: { volume: o.dhwVolume } }), t.pipe(f("iu", "dhw_sup"), f("dhw", "coil_in"), "supply", [d, m], { via: [[S("dhw_sup"), M - 4], [O - 1, M - 4], [O - 1, T + 4]] }), t.pipe(f("dhw", "coil_out"), f("iu", "dhw_ret"), "return", [d, m], { via: [[O - 2, T + 9], [O - 2, M - 3], [S("dhw_ret"), M - 3]] }), J(O, T, 1, O + 8, O + 10);
      }
    }
  } else if (A) {
    const M = te + 14, S = (H) => B(H).x;
    if (t.pipe(f("iu", "src_out"), f("ou", "in"), "return", [d], {
      via: [[S("src_out"), M + 1], [j - 1, M + 1], [j - 1, W + 1], [U - 2, W + 1], [U - 2, ee + 5]]
    }), t.pipe(f("ou", "out"), f("iu", "src_in"), "supply", [d], {
      via: [[U - 3, ee + 6], [U - 3, W + 2], [j - 2, W + 2], [j - 2, M + 2], [S("src_in"), M + 2]]
    }), a) {
      const H = j - 4, le = L - 11;
      t.add("dhw", "dhw_tank", o.dhwLabel || c("type.dhw_tank"), H, le, { props: { volume: o.dhwVolume } }), t.pipe(f("iu", "dhw_sup"), f("dhw", "coil_in"), "supply", [d, m], { via: [[S("dhw_sup"), le + 4]] }), t.pipe(f("dhw", "coil_out"), f("iu", "dhw_ret"), "return", [d, m], { via: [[S("dhw_ret"), le + 9]] });
      const K = { c: "tap", s: "flowing" }, Z = { c: "circ", s: "running" }, se = H - 2;
      t.add("tap", "tap", c("wz.shower"), U + 2, W - 9, { props: { variant: "shower" } }), t.add("inlet", "water_inlet", c("type.water_inlet"), U + 1, le + 9), t.pipe(f("inlet", "out"), f("dhw", "cold"), "dhw_cold", [K]), o.circulation ? (t.add("jww", "junction", "", se, W - 7), t.pipe(f("dhw", "hot"), f("jww", "b"), "dhw_hot", [], { via: [[se, le + 1]], flowAny: [K, Z] }), t.pipe(f("jww", "t"), f("tap", "hot"), "dhw_hot", [K], { via: [[se, W - 8]] }), t.add("circ", "pump", "PW2", se - 2, le + 2, { rot: 90, props: { role: "circulation" } }), t.pipe(f("jww", "l"), f("circ", "in"), "circulation", [Z], { via: [[se - 1, W - 7]] }), t.pipe(f("circ", "out"), f("dhw", "circ"), "circulation", [Z], { via: [[se - 1, le + 6]] })) : t.pipe(f("dhw", "hot"), f("tap", "hot"), "dhw_hot", [K], { via: [[se, le + 1], [se, W - 8]] });
    }
    const D = j + 22, C = L - 9, P = C - 1, O = [d, ...h];
    t.add("buf", "buffer", o.bufferLabel || c("type.buffer"), D, C, { props: { volume: o.bufferVolume } }), t.pipe(f("iu", "sup"), f("buf", "in_sup"), "supply", O, { via: [[S("sup"), M + 1], [D + 1, M + 1]] });
    const T = [];
    o.separator && (t.add("sep", "separator", c("wz.separator_short"), S("sup") + 9, P - 1, { rot: 180 }), T.push({ inP: f("sep", "in"), outP: f("sep", "out") })), o.expansion && (t.add("jmag", "junction", "", S("sup") + 6, P), t.add("mag", "expansion_vessel", "MAG", S("sup") + 5, P + 1, { rot: 180 }), t.pipe(f("mag", "conn"), f("jmag", "b"), "return", []), T.push({ inP: f("jmag", "r"), outP: f("jmag", "l") })), o.separator && (t.add("sc1", "separator", "SC1", S("sup") + 1, P - 1, { rot: 180, props: { filter: !0 } }), T.push({ inP: f("sc1", "in"), outP: f("sc1", "out") }));
    for (let H = 0; H < T.length - 1; H++) t.pipe(T[H].outP, T[H + 1].inP, "return", O);
    T.length ? (t.pipe(T[T.length - 1].outP, f("iu", "ret"), "return", O, { via: [[S("ret"), P]] }), t.pipe(f("buf", "in_ret"), T[0].inP, "return", O, { via: [[D + 2, P]] })) : t.pipe(f("buf", "in_ret"), f("iu", "ret"), "return", O, { via: [[D + 2, P], [S("ret"), P]] }), N(f("buf", "out_ret"), f("buf", "out_sup"), D + 3, C, [u], !0);
  } else if (x) {
    const M = te, S = (Z) => B(Z).x, D = { c: "iu", s: "pc1" };
    t.pipe(f("iu", "src_out"), f("ou", "in"), "return", [d], { via: [[S("src_out"), ee + 5]] }), t.pipe(f("ou", "out"), f("iu", "src_in"), "supply", [d], { via: [[S("src_in"), ee + 6]] });
    const C = o.circuits[0] ?? { emitter: "radiators", label: "" }, P = 2, O = M - 8, T = M - 4;
    t.add("hc1", C.emitter, C.label || c("wz.circuit", { n: 1 }), P, O - 1, { flip: !0, props: { circuit: 1 } }), t.pipe(f("iu", "sup"), f("hc1", "sup"), "supply", [D], { via: [[S("sup"), O]] });
    let H = f("hc1", "ret"), le = [], K = P + 9;
    if (o.separator && (t.add("sep", "separator", c("wz.separator_short"), K, T - 1), t.add("sc1", "separator", "SC1", K + 3, T - 1, { props: { filter: !0 } }), t.pipe(H, f("sep", "in"), "return", [D]), t.pipe(f("sep", "out"), f("sc1", "in"), "return", [D]), H = f("sc1", "out"), K += 7), o.expansion && (t.add("jmag", "junction", "", K + 1, T), t.add("mag", "expansion_vessel", "MAG", K, T, { rot: 180 }), t.pipe(f("mag", "conn"), f("jmag", "b"), "return", []), t.pipe(H, f("jmag", "l"), "return", [D]), H = f("jmag", "r")), t.pipe(H, f("iu", "ret"), "return", [D], { via: [...le, [S("ret"), T]] }), a) {
      const Z = j + 22, se = M + 2;
      t.add("dhw", "dhw_tank", o.dhwLabel || c("type.dhw_tank"), Z, se, { props: { volume: o.dhwVolume } }), t.pipe(f("iu", "dhw_sup"), f("dhw", "coil_in"), "supply", [d, m], { via: [[S("dhw_sup"), M - 3], [Z + 9, M - 3], [Z + 9, se + 4]] }), t.pipe(f("dhw", "coil_out"), f("iu", "dhw_ret"), "return", [d, m], { via: [[Z + 8, se + 9], [Z + 8, M - 2], [S("dhw_ret"), M - 2]] }), ft(t, o, f("dhw", "hot"), f("dhw", "circ"), f("dhw", "cold"), Z, se);
    }
  } else if (_) {
    const M = te, S = (K) => B(K).x, D = Math.max(...["src_in", "src_out", "sup", "ret", "dhw_sup", "dhw_ret", "dhw_hot", "dhw_cold", "circ"].filter((K) => ge(R, K)).map(S));
    t.pipe(f("ou", "out"), f("iu", "src_in"), "supply", [d], { via: [[12, q.y], [12, M - 9], [S("src_in"), M - 9]] }), t.pipe(f("iu", "src_out"), f("ou", "in"), "return", [d], { via: [[S("src_out"), M - 10], [11, M - 10]] });
    let C = f("iu", "sup"), P = f("iu", "ret"), O = r ? [u] : [d, ...h], T = [[S("sup"), M - 2]];
    const H = M - 4;
    let le = D + 14;
    if (p) {
      const K = D + 2, Z = K + 10, se = M + 4;
      t.add("buf", "buffer", o.bufferLabel || c("type.buffer"), Z, se, { props: { volume: o.bufferVolume } }), t.pipe(f("iu", "sup"), f("buf", "in_sup"), "supply", [d, ...h], { via: [[S("sup"), M - 2], [Z + 1, M - 2]] });
      const _e = [d, ...h];
      let pe = f("buf", "in_ret"), me = [[Z + 2, H]];
      o.separator && (t.add("sep", "separator", c("wz.separator_short"), K + 6, H - 1, { rot: 180 }), t.add("sc1", "separator", "SC1", K + 3, H - 1, { rot: 180, props: { filter: !0 } }), t.pipe(pe, f("sep", "in"), "return", _e, { via: me }), t.pipe(f("sep", "out"), f("sc1", "in"), "return", _e), pe = f("sc1", "out"), me = []), o.expansion && (t.add("jmag", "junction", "", K, H), t.add("mag", "expansion_vessel", "MAG", K - 1, H - 5), t.pipe(f("mag", "conn"), f("jmag", "t"), "return", []), t.pipe(pe, f("jmag", "r"), "return", _e, { via: me }), pe = f("jmag", "l"), me = []), t.pipe(pe, f("iu", "ret"), "return", _e, { via: [...me, [S("ret"), H]] }), C = f("buf", "out_sup"), P = f("buf", "out_ret"), O = [u], T = [], le = Z + 7;
    }
    if (ts(t, o, C, P, O, T, p || r, le, M + 4), n)
      ft(t, o, f("iu", "dhw_hot"), f("iu", "circ"), f("iu", "dhw_cold"), j - 1, M + 18);
    else if (a) {
      const K = j - 9, Z = M + 8;
      t.add("dhw", "dhw_tank", o.dhwLabel || c("type.dhw_tank"), K, Z, { props: { volume: o.dhwVolume } }), t.pipe(f("iu", "dhw_sup"), f("dhw", "coil_in"), "supply", [d, m], { via: [[S("dhw_sup"), M - 1], [K + 8, M - 1], [K + 8, Z + 4]] }), t.pipe(f("dhw", "coil_out"), f("iu", "dhw_ret"), "return", [d, m], { via: [[K + 7, Z + 9], [K + 7, M - 3], [S("dhw_ret"), M - 3]] }), ft(t, o, f("dhw", "hot"), f("dhw", "circ"), f("dhw", "cold"), K, Z);
    }
  } else {
    const M = te + 14, S = (T) => B(T).x;
    t.pipe(f("iu", "src_out"), f("ou", "in"), "return", [d], { via: [[S("src_out"), M + 1]] }), t.pipe(f("ou", "out"), f("iu", "src_in"), "supply", [d], { via: [[S("src_in"), M + 2]] });
    const D = M + 6, C = [d, ...h], P = [];
    o.separator && (t.add("sep", "separator", c("wz.separator_short"), S("sup") + 9, D - 1, { rot: 180 }), P.push({ inP: f("sep", "in"), outP: f("sep", "out") })), o.expansion && (t.add("jmag", "junction", "", S("sup") + 6, D), t.add("mag", "expansion_vessel", "MAG", S("sup") + 5, D + 1, { rot: 180 }), t.pipe(f("mag", "conn"), f("jmag", "b"), "return", []), P.push({ inP: f("jmag", "r"), outP: f("jmag", "l") })), o.separator && (t.add("sc1", "separator", "SC1", S("sup") + 1, D - 1, { rot: 180, props: { filter: !0 } }), P.push({ inP: f("sc1", "in"), outP: f("sc1", "out") }));
    for (let T = 0; T < P.length - 1; T++) t.pipe(P[T].outP, P[T + 1].inP, "return", C);
    let O = f("iu", "ret");
    if (P.length && (t.pipe(P[P.length - 1].outP, f("iu", "ret"), "return", C, { via: [[S("ret"), D]] }), O = P[0].inP), p) {
      const T = j + 22, H = M + 8;
      t.add("buf", "buffer", o.bufferLabel || c("type.buffer"), T, H, { props: { volume: o.bufferVolume } }), t.pipe(f("iu", "sup"), f("buf", "in_sup"), "supply", [d, ...h], { via: [[S("sup"), M + 2], [T + 1, M + 2]] }), t.pipe(f("buf", "in_ret"), O, "return", [d, ...h], { via: [[T + 2, D]] }), ts(t, o, f("buf", "out_sup"), f("buf", "out_ret"), [u], [], !0, T + 8, H + 1);
    } else {
      const T = j + 25;
      ts(t, o, f("iu", "sup"), O, [d, ...h], [[S("sup"), M + 2], [T - 2, M + 2]], !1, T, M + 8, D);
    }
    if (a) {
      const T = S("dhw_sup") - 8, H = M + 6;
      t.add("dhw", "dhw_tank", o.dhwLabel || c("type.dhw_tank"), T, H, { props: { volume: o.dhwVolume } }), t.pipe(f("iu", "dhw_sup"), f("dhw", "coil_in"), "supply", [d, m], { via: [[S("dhw_sup"), H + 4]] }), t.pipe(f("dhw", "coil_out"), f("iu", "dhw_ret"), "return", [d, m], { via: [[S("dhw_ret"), H + 9]] }), ft(t, o, f("dhw", "hot"), f("dhw", "circ"), f("dhw", "cold"), T, H);
    }
  }
  const re = Math.max(1, o.circuits.length), I = {
    version: 5,
    name: o.name,
    grid: b ? { w: G ? p ? 64 : 48 : i === "tp70" ? 52 : p ? 62 : 54, h: L + 2 } : A ? { w: 68, h: L + 2 } : x ? { w: 58, h: 49 } : { w: re > 1 ? 76 : 66, h: Math.max(38, (_ ? 46 : 38) + (re - 1) * 10) },
    components: t.components,
    pipes: t.pipes,
    settings: e?.settings ?? { style: "flat", demo: !0 }
  };
  if (I.settings = { ...I.settings, wizard: o, layout_edited: !1, building: A || b ? { show: !0, floor: L, wall: U, slab: W, ground: W, outside: G ? "right" : "left" } : void 0 }, e) {
    const M = new Map(e.components.map((P) => [P.id, P]));
    for (const P of I.components) {
      const O = M.get(P.id);
      O && O.type === P.type && (P.bindings = { ...O.bindings }, O.icon && (P.icon = O.icon), O.show && (P.show = O.show));
    }
    const S = I.components.find((P) => P.id === "iu"), D = M.get("pc0"), C = M.get("vw1");
    S && D?.bindings.running && (S.bindings.pc0_running ??= D.bindings.running), S && D?.bindings.speed && (S.bindings.pc0_speed ??= D.bindings.speed), S && C?.bindings.position && (S.bindings.vw1_position ??= C.bindings.position);
  }
  return I;
}
function ts(o, e, t, s, i, n, r, a, l, p) {
  Math.max(1, e.circuits.length);
  const d = [], h = { ...t };
  e.circuits.slice(0, 4).forEach((m, u) => {
    const w = u + 1, _ = l - 9 + u * 10, y = w === 1 ? "pc1" : `hc${w}_pump`, b = `hc${w}_mix`, x = `hc${w}`;
    let $ = a, A = null, L = null, W = i;
    (r || m.mixed) && (o.add(y, "pump", w === 1 ? "PC1" : `PC${w}`, $, _, { props: { role: m.mixed ? "hc" : "secondary", circuit: w } }), A = f(y, "in"), L = f(y, "out"), W = [{ c: y, s: "running" }], d.push(W[0]), $ += 4), m.mixed && (o.add(b, "mixer", `VC${w}`, $, _, { props: { circuit: w } }), L ? o.pipe(L, f(b, "in"), "supply", W) : A = f(b, "in"), L = f(b, "out"), $ += 3);
    const G = $ + 3;
    o.add(x, m.emitter, m.label || c("wz.circuit", { n: w }), G, _ - 2, { props: { circuit: w } }), L ? o.pipe(L, f(x, "sup"), "supply", W, { via: [[G - 2, _ + 1], [G - 2, _ - 1]] }) : A = f(x, "sup"), o.pipe(h, A, "supply", W, u === 0 ? { via: [...n, [a - 1 - u, _ + 1]] } : { via: [[a - 1 - u, _ + 1]] }), m.mixed ? (o.add(`hc${w}_jm`, "junction", "", $ - 2, _ + 3), o.pipe(f(x, "ret"), f(`hc${w}_jm`, "r"), "return", W, { via: [[$ - 2, _ + 3]] }), o.pipe(f(`hc${w}_jm`, "t"), f(b, "ret"), "return", W), o.pipe(f(`hc${w}_jm`, "l"), s, "return", W, { via: [[a - 2 - u, _ + 3], ...p ? [[a - 2 - u, p]] : []] })) : o.pipe(f(x, "ret"), s, "return", W, { via: [[a - 2 - u, _ + 3], ...p ? [[a - 2 - u, p]] : []] });
  });
}
function ft(o, e, t, s, i, n, r) {
  const a = { c: "tap", s: "flowing" }, l = { c: "circ", s: "running" };
  if (o.add("tap", "tap", c("type.tap"), n - 9, r), o.add("inlet", "water_inlet", c("type.water_inlet"), n - 9, r + 9), o.pipe(f("inlet", "out"), i, "dhw_cold", [a]), !e.circulation) {
    o.pipe(t, f("tap", "hot"), "dhw_hot", [a]);
    return;
  }
  o.add("jww", "junction", "", n - 3, r + 1), o.pipe(t, f("jww", "r"), "dhw_hot", [], { flowAny: [a, l] }), o.pipe(f("jww", "l"), f("tap", "hot"), "dhw_hot", [a]), o.add("circ", "pump", "PW2", n - 4, r + 3, { rot: 90, props: { role: "circulation" } }), o.pipe(f("jww", "b"), f("circ", "in"), "circulation", [l]), o.pipe(f("circ", "out"), s, "circulation", [l]);
}
function ms() {
  const o = typeof location < "u" ? new URLSearchParams(location.search).get("indoor") : null, e = us();
  o && qe(o) && (e.indoorModel = o, e.indoorLabel = qe(o).label.replace(/^Logatherm /, "").split(" – ")[0]);
  const t = typeof location < "u" ? new URLSearchParams(location.search) : null;
  t?.get("buffer") === "none" && (e.buffer = "none"), t?.get("outdoor") && (e.outdoorModel = t.get("outdoor"));
  const s = Yt(e);
  return typeof location < "u" && new URLSearchParams(location.search).get("style") === "iso" && (s.settings.style = "iso"), s;
}
const ro = 4;
class rn {
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
    this.host.toggleAttribute("light", !t), li(pi(this.plant?.settings.language, e.language)), this.api ? this.api.setHass(e) : this._connected && this._init(), this.plant && !this.plant.settings.demo && this._checkStates();
  }
  _init() {
    this.api = new Hn(this.hass), this._load();
  }
  // ----------------------------------------------------------------- data
  get messages() {
    return this.sim ? this.simMessages : this.backendMessages;
  }
  get src() {
    return this.sim ? new on(this.sim, this.hass) : new tn(this.hass);
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
        t ? (t.version ?? 1) < 5 && t.settings?.wizard && !t.settings.layout_edited && (t = Yt(t.settings.wizard, t), e.is_admin && this.saveExample && await this.api.saveConfig(t)) : (t = ms(), e.is_admin && this.saveExample && await this.api.saveConfig(t)), this.setPlant(t), await this.loadIcons(), this.api.standalone || (this.backendMessages = await this.api.listMessages(), this._unsubMsg = await this.api.subscribeMessages((s) => this._mergeMessage(s)));
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
    const t = JSON.stringify(es(this.plant));
    this.plant = e, li(pi(e.settings.language, this.hass?.language)), this._collectBound(), e.settings.demo ? (!this.sim || JSON.stringify(es(e)) !== t) && this._startSim() : (this._stopSim(), this._checkStates()), this.version++, this._changed();
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
    const e = this.plant?.components.find((i) => i.type === "dhw_tank"), t = new io(es(this.plant), void 0, { dhw: e?.label || c("type.dhw_tank") });
    this.sim = t, this._unsubSim = t.onMessage(() => {
      this.simMessages = [...t.messages], this._changed();
    }), this.simMessages = [...t.messages], this._lastFrame = performance.now();
    const s = (i) => {
      const n = (i - this._lastFrame) / 1e3;
      this._lastFrame = i, document.hidden || (t.advance(n), this._accum += n, this._accum >= 1 / ro && (this._accum = 0, this.version++, this._changed())), this._raf = requestAnimationFrame(s);
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
const an = ae`
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
    --cp-bld-outside: rgba(108, 196, 255, 0.04);
    --cp-bld-ground: rgba(140, 110, 80, 0.12);
    --cp-bld-wall: #222c38;
    --cp-bld-line: #3b4757;
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
    --cp-bld-outside: rgba(77, 159, 255, 0.06);
    --cp-bld-ground: rgba(140, 110, 80, 0.14);
    --cp-bld-wall: #dfe5ec;
    --cp-bld-line: #b6c0cc;
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
`, he = ae`
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
`, ao = {
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
function V(o) {
  return k`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d=${ao[o] || ""} /></svg>`;
}
const fs = k`<svg viewBox="0 0 32 32" class="logo" aria-hidden="true">
  <defs><linearGradient id="cp-logo" x1="0" y1="1" x2="1" y2="0">
    <stop offset="0" stop-color="#38d0ff" /><stop offset="0.55" stop-color="#3ddc97" /><stop offset="1" stop-color="#ffb35c" />
  </linearGradient></defs>
  <rect x="2" y="6.2" width="28" height="19.6" rx="3.6" fill="none" stroke="url(#cp-logo)" stroke-width="2.4" />
  <path d="M16.6 11.2A6.4 6.4 0 1 0 16.6 20.8" fill="none" stroke="url(#cp-logo)" stroke-width="2.4" stroke-linecap="round" />
  <g transform="translate(12 16) scale(0.8)" fill="url(#cp-logo)">
    <path d="M0 0C-0.55-2.2 0.35-5.1 2.9-5.6C4.2-3.8 2.7-1.3 0 0Z" /><path d="M0 0C-0.55-2.2 0.35-5.1 2.9-5.6C4.2-3.8 2.7-1.3 0 0Z" transform="rotate(120)" /><path d="M0 0C-0.55-2.2 0.35-5.1 2.9-5.6C4.2-3.8 2.7-1.3 0 0Z" transform="rotate(240)" /><circle r="1.3" />
  </g>
  <path d="M21.6 11.6H26.4M21.6 14.5H26.4M21.6 17.5H26.4M21.6 20.4H26.4" stroke="url(#cp-logo)" stroke-width="1.7" stroke-linecap="round" />
</svg>`, lo = "M4.2 4.4H19.8A3.2 3.2 0 0 1 23 7.6V16.4A3.2 3.2 0 0 1 19.8 19.6H4.2A3.2 3.2 0 0 1 1 16.4V7.6A3.2 3.2 0 0 1 4.2 4.4ZM4.4 6.2A1.6 1.6 0 0 0 2.8 7.8V16.2A1.6 1.6 0 0 0 4.4 17.8H19.6A1.6 1.6 0 0 0 21.2 16.2V7.8A1.6 1.6 0 0 0 19.6 6.2ZM12.78 7.8A5.65 5.65 0 1 0 12.78 16.2A0.9 0.9 0 0 0 11.58 14.86A3.85 3.85 0 1 1 11.58 9.14A0.9 0.9 0 0 0 12.78 7.8ZM9 12C8.67 10.68 9.21 8.94 10.74 8.64C11.52 9.72 10.62 11.22 9 12ZM9 12C10.31 12.37 11.55 13.71 11.04 15.19C9.71 15.32 8.87 13.79 9 12ZM9 12C8.02 12.95 6.24 13.35 5.22 12.17C5.77 10.96 7.51 10.99 9 12ZM16.75 8.05H19.25A0.65 0.65 0 0 1 19.9 8.7V8.7A0.65 0.65 0 0 1 19.25 9.35H16.75A0.65 0.65 0 0 1 16.1 8.7V8.7A0.65 0.65 0 0 1 16.75 8.05ZM16.75 10.25H19.25A0.65 0.65 0 0 1 19.9 10.9V10.9A0.65 0.65 0 0 1 19.25 11.55H16.75A0.65 0.65 0 0 1 16.1 10.9V10.9A0.65 0.65 0 0 1 16.75 10.25ZM16.75 12.45H19.25A0.65 0.65 0 0 1 19.9 13.1V13.1A0.65 0.65 0 0 1 19.25 13.75H16.75A0.65 0.65 0 0 1 16.1 13.1V13.1A0.65 0.65 0 0 1 16.75 12.45ZM16.75 14.65H19.25A0.65 0.65 0 0 1 19.9 15.3V15.3A0.65 0.65 0 0 1 19.25 15.95H16.75A0.65 0.65 0 0 1 16.1 15.3V15.3A0.65 0.65 0 0 1 16.75 14.65Z", gs = window;
gs.customIcons = gs.customIcons || {};
gs.customIcons.copilot = {
  getIcon: async (o) => o === "logo" ? { path: lo, viewBox: "0 0 24 24" } : void 0,
  getIconList: async () => [{ name: "logo", keywords: ["copilot", "heat pump", "wärmepumpe"] }]
};
window.dispatchEvent(new Event("custom-icons-changed"));
const vi = 86400, ss = 30.44;
function co(o) {
  const e = (p, d = () => !0) => o.components.find((h) => h.type === p && d(h.props || {})), t = [], s = (p, d, h) => t.push({ id: p, key: p, interval_days: d, component: h });
  s("pressure", 91, e("indoor_unit")?.id);
  const i = e("separator", (p) => !!p.filter);
  i && s("filter", 365, i.id);
  const n = e("separator", (p) => !p.filter);
  n && s("separator", 182, n.id);
  const r = e("expansion_vessel");
  r && s("expansion", 365, r.id);
  const a = e("outdoor_unit");
  a && s("outdoor", 182, a.id);
  const l = e("dhw_tank");
  return l && s("anode", 730, l.id), s("service", 365, a?.id), t;
}
function po(o, e) {
  if (!o.last_done) return { status: "unknown" };
  const t = o.last_done + o.interval_days * vi, s = Math.round((t - e) / vi);
  return { status: s < 0 ? "due" : s <= 30 ? "soon" : "ok", next: t, days: s };
}
const ho = (o) => new Date(o * 1e3).toLocaleDateString(void 0, { day: "2-digit", month: "2-digit", year: "numeric" }), uo = (o) => {
  const e = new Date(o * 1e3);
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}, At = class At extends ne {
  constructor() {
    super(...arguments), this.admin = !0, this._newTitle = "", this._newMonths = 12;
  }
  get _tasks() {
    return this.plant.settings.maintenance?.tasks ?? co(this.plant);
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
    this._save([...this._tasks, { id: t, title: e, interval_days: Math.round(this._newMonths * ss) }]), this._newTitle = "";
  }
  _remove(e) {
    confirm(c("mt.remove_confirm", { task: this._title(e) })) && this._save(this._tasks.filter((t) => t.id !== e.id));
  }
  render() {
    const e = Date.now() / 1e3, t = { due: 0, soon: 1, unknown: 2, ok: 3 }, s = [...this._tasks].map((r) => ({ task: r, ...po(r, e) })).sort((r, a) => t[r.status] - t[a.status] || (r.next ?? 0) - (a.next ?? 0)), i = s.filter((r) => r.status === "due").length, n = s.filter((r) => r.status === "unknown").length;
    return g`<div class="card wrap">
      <div class="row head">
        <h2>${c("mt.title")}</h2>
        ${i ? g`<span class="chip due">${c("mt.n_due", { n: i })}</span>` : v}
        ${n ? g`<span class="chip unknown">${c("mt.n_unknown", { n })}</span>` : v}
        ${!i && !n ? g`<span class="chip ok">${c("mt.all_ok")}</span>` : v}
      </div>
      <p class="muted hint">${c("mt.hint")}</p>
      <ul class="tasks">
        ${s.map(
      ({ task: r, status: a, next: l, days: p }) => g`<li class=${a}>
            <div class="main">
              <div class="t">${this._title(r)}</div>
              ${r.key ? g`<div class="muted small">${c(`mt.${r.key}_how`)}</div>` : v}
              <div class="meta">
                <span class="st ${a}">${a === "unknown" ? c("mt.enter_date") : a === "due" ? c("mt.overdue", { n: -p }) : c("mt.next", { date: ho(l), n: p })}</span>
              </div>
            </div>
            <label class="f">${c("mt.last")}
              <input type="date" .value=${r.last_done ? uo(r.last_done) : ""} ?disabled=${!this.admin}
                @change=${(d) => {
        const h = d.target.value;
        this._update(r.id, { last_done: h ? Math.round((/* @__PURE__ */ new Date(`${h}T12:00:00`)).getTime() / 1e3) : void 0 });
      }} /></label>
            <label class="f">${c("mt.every")}
              <span class="iv"><input type="number" min="1" max="120" .value=${F(r.interval_days / ss, 0)} ?disabled=${!this.admin}
                @change=${(d) => this._update(r.id, { interval_days: Math.max(1, Math.round(Number(d.target.value) * ss)) })} />
                ${c("mt.months")}</span></label>
            <div class="acts">
              <button class="primary" ?disabled=${!this.admin} @click=${() => this._done(r)}>${V("check")} ${c("mt.done")}</button>
              <button class="ghost icon" title=${c("mt.remove")} ?disabled=${!this.admin} @click=${() => this._remove(r)}>${V("trash")}</button>
            </div>
          </li>`
    )}
      </ul>
      ${this.admin ? g`<div class="row add">
            <input placeholder=${c("mt.new")} .value=${this._newTitle} @input=${(r) => this._newTitle = r.target.value}
              @keydown=${(r) => r.key === "Enter" && this._add()} />
            <span class="iv"><input type="number" min="1" max="120" .value=${String(this._newMonths)}
              @change=${(r) => this._newMonths = Number(r.target.value) || 12} /> ${c("mt.months")}</span>
            <button @click=${this._add} ?disabled=${!this._newTitle.trim()}>${V("plus")} ${c("mt.add")}</button>
          </div>` : v}
    </div>`;
  }
};
At.properties = { plant: { attribute: !1 }, admin: { type: Boolean }, _newTitle: { state: !0 }, _newMonths: { state: !0 } }, At.styles = [
  he,
  ae`
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
let _s = At;
customElements.get("cp-maintenance") || customElements.define("cp-maintenance", _s);
function yi(o, e) {
  let t = 0, s = o.length - 1;
  if (!(s < 0 || o[0].t > e)) {
    for (; t < s; ) {
      const i = t + s + 1 >> 1;
      o[i].t <= e ? t = i : s = i - 1;
    }
    return o[t];
  }
}
function xi(o, e, t) {
  if (o)
    return o.raw !== void 0 && (o.v === null || !Number.isFinite(o.v)) ? js(o.raw, e, t) : o.v === null ? { raw: null, num: null, unit: e, entity: t, available: !1 } : { raw: o.raw ?? o.v, num: o.v, unit: e, entity: t, available: !0 };
}
class Ks {
  constructor(e, t, s) {
    this.live = e, this.byEntity = /* @__PURE__ */ new Map(), this.bySlot = /* @__PURE__ */ new Map(), this.from = t, this.to = s, this.t = s;
  }
  /** Load the recorded values of the last `hours` hours. */
  static async load(e, t, s, i, n = []) {
    const r = Date.now() / 1e3, a = new Ks(t, r - s * 3600, r);
    if (t instanceof tn && i) {
      const l = new Set(n);
      for (const p of e.components) Object.values(p.bindings || {}).forEach((d) => d && l.add(d));
      for (const p of e.pipes) p.bindings?.temp && l.add(p.bindings.temp);
      if (l.size) {
        const p = await i.callWS({
          type: "history/history_during_period",
          start_time: new Date(a.from * 1e3).toISOString(),
          end_time: new Date(r * 1e3).toISOString(),
          entity_ids: [...l],
          minimal_response: !0,
          no_attributes: !0,
          significant_changes_only: !1
        });
        for (const [d, h] of Object.entries(p)) {
          const m = i.states[d]?.attributes?.unit_of_measurement;
          a.byEntity.set(d, { unit: m, pts: h.map((u) => ({ t: u.lu, v: Number.isFinite(Number(u.s)) ? Number(u.s) : null, raw: String(u.s) })) });
        }
      }
      return a;
    }
    return await Promise.all(
      e.components.flatMap(
        (l) => ye(l).map(async (p) => {
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
    return i ? xi(yi(i.pts, this.t), i.unit) : void 0;
  }
  getEntity(e) {
    const t = this.byEntity.get(e);
    return t ? xi(yi(t.pts, this.t), t.unit, e) : void 0;
  }
  history(e, t, s) {
    return this.live.history(e, t, s);
  }
}
const mo = 7, fo = 35, ln = 4.9;
function Mt(o, e, t = "air") {
  const s = e + 273.15 + 3, i = (t === "air" ? o - 6 : 0) + 273.15;
  return Math.max(1.2, Math.min(8, 0.57 * s / Math.max(5, s - i)));
}
function go(o, e, t = ln, s = "air") {
  return t * Mt(o, e, s) / Mt(mo, fo, s);
}
function _o(o) {
  return o >= 0.9 ? "green" : o >= 0.75 ? "yellow" : "red";
}
const Ae = { green: "#3ddc97", yellow: "#f5c542", red: "#ff5a5f" };
function cn(o, e) {
  const t = o.components.find((w) => w.type === "outdoor_unit"), s = o.components.find((w) => w.type === "indoor_unit");
  if (!t || !s) return;
  const i = (w, _) => {
    const y = e.get(w, _);
    return y?.available && y.num !== null ? y.num : void 0;
  }, n = i(t, "heat_power");
  let r = i(t, "el_power");
  r !== void 0 && e.get(t, "el_power")?.unit === "kW" && (r *= 1e3);
  const a = i(t, "outdoor_temp"), l = i(s, "supply_temp"), p = String(e.get(t, "activity")?.raw ?? "").toLowerCase();
  if (n === void 0 || r === void 0 || a === void 0 || l === void 0 || n < 0.5 || r < 80 || p.includes("defrost") || p.includes("abtau")) return;
  const d = n / (r / 1e3), h = Ie(t.model).source, m = go(a, l, Number(t.props.cop_ref) || ln, h), u = d / m;
  return { cop: d, expected: m, ratio: u, ampel: _o(u), tOut: a, tFlow: l };
}
function $i(o) {
  return o && o.el > 0.05 ? o.heat / o.el : void 0;
}
const xt = { heat: 0, el: 0, heatDhw: 0, elDhw: 0, aux: 0 };
function at(o, e) {
  return {
    heat: o.heat + (e.heat || 0),
    el: o.el + (e.el || 0),
    heatDhw: o.heatDhw + (e.heatDhw || 0),
    elDhw: o.elDhw + (e.elDhw || 0),
    aux: o.aux + (e.aux || 0)
  };
}
function Ve(o) {
  return new Date(o.getFullYear(), o.getMonth(), o.getDate()).getTime();
}
const wo = {
  heat: ["heat_energy_total"],
  el: ["el_energy_total"],
  heatDhw: ["heat_energy_dhw"],
  elDhw: ["el_energy_dhw"],
  aux: ["aux_energy_total"]
};
async function bo(o, e) {
  const t = e.components.find((y) => y.type === "indoor_unit"), s = {};
  for (const [y, b] of Object.entries(wo)) {
    const x = b.map(($) => t?.bindings[$]).find(Boolean);
    x && (s[y] = x);
  }
  const i = { today: null, yesterday: null, month: null, year: null, daily: [], estimated: { month: !1, year: !1 } };
  if (!s.heat || !s.el) return { ...i, missing: "no_counters" };
  const n = /* @__PURE__ */ new Date(), r = Object.values(s), a = (y, b) => o.callWS({
    type: "recorder/statistics_during_period",
    start_time: y.toISOString(),
    end_time: n.toISOString(),
    statistic_ids: r,
    period: b,
    types: ["change"],
    units: { energy: "kWh" }
  }), [l, p] = await Promise.all([
    a(new Date(Ve(n) - 30 * 864e5), "day"),
    a(new Date(n.getFullYear(), 0, 1), "month")
  ]), d = /* @__PURE__ */ new Map();
  for (const [y, b] of Object.entries(s))
    for (const x of l[b] || []) {
      const $ = Ve(new Date(x.start));
      d.set($, at(d.get($) || xt, { [y]: x.change || 0 }));
    }
  if (!d.size) return { ...i, missing: "no_statistics" };
  const h = [...d.entries()].sort((y, b) => y[0] - b[0]).map(([y, b]) => ({ day: y, ...b })), m = d.get(Ve(n)) || null, u = d.get(Ve(n) - 864e5) || null;
  let w = xt, _ = null;
  for (const [y, b] of Object.entries(s))
    for (const x of p[b] || [])
      w = at(w, { [y]: x.change || 0 }), new Date(x.start).getMonth() === n.getMonth() && (_ = at(_ || xt, { [y]: x.change || 0 }));
  return { today: m, yesterday: u, month: _, year: w, daily: h, estimated: { month: !1, year: !1 } };
}
const pn = [2, 3, 6.5, 10.5, 14.5, 18, 20, 19.5, 15.5, 10.5, 6, 3], ki = 0.8;
function is(o, e, t, s) {
  const i = s ?? pn[e], n = o.p, r = n.heatLoad / (21 - n.designTemp);
  let a = 0, l = 0;
  for (const h of [-4, -2, 0, 2, 4]) {
    const m = i + h;
    if (m >= 16) continue;
    const u = r * (21 - m) * 24 * t * 0.2 * 0.85, w = 21 + (21 - m) * ((n.floor ? 35 : 50) - 21) / (21 - n.designTemp);
    a += u, l += u / (Mt(m, w, n.source) * ki);
  }
  const p = 8.4 * t * (n.dhwL > 0 ? 1 : 0), d = p / (Mt(i, 53, n.source) * ki);
  return { heat: a + p, el: l + d, heatDhw: p, elDhw: d, aux: 0 };
}
function vo(o) {
  const e = new Date(o.time * 1e3), t = Ve(e), s = o.dailyEnergy(), i = s.find((p) => p.day === t) || null, n = s.find((p) => p.day === t - 864e5) || null, r = is(o, e.getMonth(), e.getDate() - 1 + e.getHours() / 24, o.outdoorMean);
  let a = xt;
  for (let p = 0; p < e.getMonth(); p++) a = at(a, is(o, p, new Date(e.getFullYear(), p + 1, 0).getDate()));
  a = at(a, r);
  const l = [];
  for (let p = 29; p >= 2; p--) {
    const d = t - p * 864e5, h = new Date(d), m = p <= 14 ? (14 - p) / 14 : 0, u = pn[h.getMonth()] * (1 - m) + o.outdoorMean * m + Math.sin(p * 1.3) * 2, w = is(o, h.getMonth(), 1, u), _ = 1 + Math.sin(p * 1.7) * 0.18;
    l.push({ day: d, ...w, heat: w.heat * _, el: w.el * _ * (1 + Math.cos(p) * 0.04) });
  }
  return {
    today: i,
    yesterday: n,
    month: r,
    year: a,
    daily: [...l, ...s.filter((p) => p.day >= t - 864e5)],
    estimated: { month: !0, year: !0 }
  };
}
const Ke = (o, ...e) => o.components.find((t) => e.includes(t.type));
function dn(o) {
  const e = (s, i) => {
    if (!s) return;
    const n = o.get(s, i);
    return n?.available && n.num !== null && Number.isFinite(n.num) ? n.num : void 0;
  };
  return { num: e, on: (s, i) => {
    const n = e(s, i);
    if (n !== void 0) return n > 0;
    if (!s) return !1;
    const r = String(o.get(s, i)?.raw ?? "").toLowerCase();
    return ["on", "true", "an", "ein", "1", "yes"].includes(r);
  } };
}
const tt = (o) => Math.round(o * 10) / 10;
function yo(o, e) {
  const { num: t, on: s } = dn(e), i = Ke(o, "outdoor_unit"), n = Ke(o, "indoor_unit"), r = Ke(o, "buffer"), a = Ke(o, "dhw_tank"), l = Ke(o, "radiators", "floor_heating"), p = Ke(o, "tap"), d = o.components.find((I) => I.type === "pump" && I.props.role === "circulation"), h = i ? xe(i, e) : /* @__PURE__ */ new Set(), m = n ? xe(n, e) : /* @__PURE__ */ new Set(), u = [];
  if (!i && !n) return u;
  const w = Ie(i?.model).source === "brine", _ = t(i, "outdoor_temp"), y = t(i, "heat_power");
  let b = t(i, "el_power");
  b !== void 0 && i && e.get(i, "el_power")?.unit !== "kW" && (b /= 1e3);
  const x = y !== void 0 && b !== void 0 && b > 0.05 && y > 0.2 ? y / b : void 0, $ = t(i, "compressor_speed"), A = t(n, "supply_temp"), L = t(n, "return_temp"), W = t(n, "target_flow_temp") ?? t(l, "target_flow_temp"), G = t(r, "temp_top") ?? t(n, "buffer_temp"), U = t(a, "temp_top") ?? t(n, "dhw_temp"), ce = t(a, "setpoint") ?? t(n, "dhw_setpoint"), oe = t(n, "aux_level"), ee = t(l, "heating_limit") ?? 16, j = i ? Je(e.get(i, "activity")) : void 0, te = h.has("running"), R = j === "hot_water" || te && m.has("b"), B = R || s(a, "charging") || m.has("charging"), q = w ? "ground" : "air", N = h.has("defrost");
  if (h.has("alarm") ? u.push({ id: "alarm", tone: "error", key: "ex.alarm", params: {}, comp: i?.id }) : h.has("defrost") ? u.push({ id: "defrost", tone: "cold", key: "ex.defrost", params: { out: _ }, hint: "ex.defrost_hint", comp: i?.id }) : te && R ? u.push({
    id: "dhw",
    tone: "dhw",
    key: U !== void 0 && ce !== void 0 ? "ex.dhw_charge" : "ex.dhw_charge_short",
    params: { dhw: U, set: ce },
    hint: "ex.dhw_charge_hint",
    comp: a?.id ?? n?.id
  }) : te ? u.push({
    id: "heating",
    tone: "heat",
    key: y !== void 0 && b !== void 0 ? `ex.heating_${q}` : `ex.heating_${q}_short`,
    params: { out: _, heat: y !== void 0 ? tt(y) : void 0, el: b !== void 0 ? tt(b) : void 0 },
    comp: i?.id
  }) : _ !== void 0 && _ >= ee ? u.push({ id: "off", tone: "info", key: "ex.off_limit", params: { out: _, limit: ee }, comp: i?.id }) : G !== void 0 && W !== void 0 && G >= W - 1 ? u.push({ id: "off", tone: "info", key: "ex.off_buffer", params: { buf: G, target: W }, hint: "ex.off_buffer_hint", comp: r?.id ?? n?.id }) : u.push({ id: "off", tone: "info", key: "ex.off", params: {}, comp: i?.id }), te && !h.has("defrost") && x !== void 0 && u.push({
    id: "cop",
    tone: x >= 3.5 ? "eco" : x >= 2.5 ? "info" : "warn",
    key: "ex.cop",
    params: { cop: tt(x), speed: $ },
    hint: $ !== void 0 ? "ex.cop_modulating" : void 0,
    comp: i?.id
  }), !R && !N && W !== void 0 && _ !== void 0 && _ < ee && u.push({
    id: "curve",
    tone: "heat",
    key: A !== void 0 ? "ex.curve" : "ex.curve_short",
    params: { out: _, target: W, sup: A },
    hint: "ex.curve_hint",
    comp: n?.id
  }), te && !R && !N && A !== void 0 && L !== void 0) {
    const I = A - L;
    u.push({
      id: "spread",
      tone: I >= 3 && I <= 8 ? "eco" : I >= 2 && I <= 10 ? "info" : "warn",
      key: I < 2 ? "ex.spread_low" : I > 10 ? "ex.spread_high" : "ex.spread_ok",
      params: { spread: tt(I), sup: A, ret: L },
      comp: n?.id
    });
  }
  if (G !== void 0 && (r || We(n)?.id === "tp70")) {
    const I = m.has("pc1") || o.components.some((S) => S.type === "pump" && S.props.circuit === 1 && xe(S, e).has("running")), M = te && !R && !N && A !== void 0 && A - G > 2;
    u.push({
      id: "buffer",
      tone: M ? "warn" : "info",
      key: M ? "ex.buffer_mixing" : I ? "ex.buffer_pc1" : "ex.buffer",
      params: { buf: G, loss: A !== void 0 ? tt(A - G) : void 0 },
      comp: r?.id ?? n?.id
    });
  }
  const J = t(l, "room_temp");
  if (l && J !== void 0) {
    const I = t(l, "room_setpoint");
    u.push({
      id: "room",
      tone: I !== void 0 && J < I - 1 ? "warn" : "info",
      key: I !== void 0 ? "ex.room" : "ex.room_short",
      params: { room: J, set: I, name: l.label },
      comp: l.id
    });
  }
  s(a, "disinfecting") ? u.push({ id: "disinfect", tone: "dhw", key: "ex.disinfect", params: {}, comp: a?.id }) : U !== void 0 && !B && u.push({ id: "dhw_idle", tone: "info", key: ce !== void 0 ? "ex.dhw_idle" : "ex.dhw_idle_short", params: { dhw: U, set: ce }, comp: a?.id ?? n?.id }), p && s(p, "flow") && u.push({ id: "tap", tone: "dhw", key: "ex.tap", params: { flow: t(p, "flow") }, comp: p.id }), d && xe(d, e).has("running") && u.push({ id: "circ", tone: "info", key: "ex.circ", params: {}, hint: "ex.circ_hint", comp: d.id }), m.has("aux") && u.push({ id: "aux", tone: "warn", key: oe !== void 0 ? "ex.aux" : "ex.aux_short", params: { aux: oe }, hint: "ex.aux_hint", comp: n?.id });
  const re = n?.props.input_labels || {};
  for (const I of [1, 2, 3, 4]) {
    if (!s(n, `input${I}`)) continue;
    const M = re[`input${I}`] || "", S = /14a|evu|sperr/i.test(M) ? "14a" : /pv|solar|überschuss|surplus/i.test(M) ? "pv" : "other";
    u.push({
      id: `input${I}`,
      tone: S === "pv" ? "eco" : "warn",
      key: `ex.input_${S}`,
      params: { n: I, label: M },
      comp: n?.id
    });
  }
  return u;
}
function xo(o, e) {
  const t = xe(o, e), { num: s } = dn(e);
  switch (o.type) {
    case "outdoor_unit":
      return {
        role: Ie(o.model).source === "brine" ? "exc.outdoor_brine" : "exc.outdoor",
        state: t.has("defrost") ? "exs.defrost" : t.has("running") ? "exs.compressor_on" : "exs.compressor_off",
        params: { speed: s(o, "compressor_speed") }
      };
    case "indoor_unit":
      return {
        role: `exc.indoor_${We(o)?.id || "wall_e"}`,
        state: t.has("b") && t.has("running") ? "exs.vw1_b" : t.has("running") ? "exs.vw1_a" : void 0,
        params: {}
      };
    case "pump":
      return { role: `exc.pump_${o.props.role === "circulation" ? "circ" : o.props.role === "primary" ? "primary" : "hc"}`, state: t.has("running") ? "exs.running" : "exs.stopped", params: {} };
    case "valve_3way":
      return { role: "exc.valve_3way", state: t.has("b") ? "exs.valve_b" : "exs.valve_a", params: {} };
    case "separator":
      return { role: o.props.filter ? "exc.filter" : "exc.separator", params: {} };
    case "buffer":
    case "dhw_tank":
    case "mixer":
    case "radiators":
    case "floor_heating":
    case "tap":
    case "water_inlet":
    case "expansion_vessel":
      return { role: `exc.${o.type}`, params: {} };
    default:
      return { role: "", params: {} };
  }
}
function Si(o) {
  if (!o?.available || o.num === null || !Number.isFinite(o.num)) return;
  const e = (o.unit || "").toLowerCase();
  return e === "kw" ? o.num : e === "mw" ? o.num * 1e3 : o.num / 1e3;
}
const Mi = (o, e) => o.components.find((t) => t.type === e);
function $o(o, e) {
  const t = o?.props.input_labels || {};
  let s = !1, i = !1;
  for (const n of [1, 2, 3, 4]) {
    if (!o || !Q(e.get(o, `input${n}`))) continue;
    const r = t[`input${n}`] || "";
    /14a|evu|sperr/i.test(r) ? s = !0 : /pv|solar|überschuss|surplus/i.test(r) && (i = !0);
  }
  return { dim14a: s, pv: i };
}
function ko(o, e) {
  const t = o.settings.energy;
  return !!e || !!(t?.enabled && (t.pv || t.grid || t.battery || t.house || t.wallbox));
}
function So(o, e, t) {
  const s = o.settings.energy || {}, i = Mi(o, "outdoor_unit"), n = Mi(o, "indoor_unit"), r = $o(n, e), a = s.limit_14a ?? 4.2, l = !!(s.enabled && (s.pv || s.grid || s.battery || s.house || s.wallbox));
  if (t && !l) {
    const $ = t.values.energy;
    return {
      pv: $.pv_power / 1e3,
      grid: $.grid_power / 1e3,
      battery: $.battery_power / 1e3,
      soc: $.battery_soc,
      house: $.house_power / 1e3,
      wallbox: $.wallbox_power / 1e3,
      hp: $.hp_power / 1e3,
      dim14a: r.dim14a,
      pvSignal: r.pv,
      limit14a: a
    };
  }
  const p = ($) => e instanceof on ? e.realEntity($) : e.getEntity($), d = ($) => $ ? Si(p($)) : void 0, h = d(s.pv);
  let m = d(s.grid);
  m !== void 0 && s.grid_invert && (m = -m);
  let u = d(s.battery);
  u !== void 0 && s.battery_invert && (u = -u);
  const w = s.battery_soc ? p(s.battery_soc) : void 0, _ = w?.available && w.num !== null ? w.num : void 0, y = d(s.wallbox), b = i ? Si(e.get(i, "el_power")) : void 0;
  let x = d(s.house);
  return x !== void 0 ? !t && s.house_includes_hp !== !1 && b !== void 0 && (x -= b) : m !== void 0 && !t && (x = m + (h ?? 0) + (u ?? 0) - (b ?? 0) - (y ?? 0)), x !== void 0 && (x = Math.max(0, x)), { pv: h, grid: m, battery: u, soc: _, house: x, wallbox: y, hp: b, dim14a: r.dim14a, pvSignal: r.pv, limit14a: a };
}
function Mo(o) {
  const e = Object.keys(o.states), t = (n) => o.states[n] ? n : void 0, s = (n) => e.find((r) => n.test(r));
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
const zo = {
  w: 640,
  h: 232,
  bus: 105,
  busX: [40, 540],
  pos: { pv: [80, 42], grid: [290, 42], battery: [500, 42], hp: [80, 168], house: [290, 168], wallbox: [500, 168] }
}, Eo = {
  w: 1240,
  h: 118,
  bus: 98,
  busX: [40, 1180],
  pos: { pv: [70, 34], grid: [265, 34], battery: [460, 34], hp: [705, 34], house: [900, 34], wallbox: [1095, 34] }
}, zi = {
  pv: "#ffc93c",
  grid: "#9aa7b4",
  battery: "#3ddc97",
  hp: "#ff8a3d",
  house: "#6cc4ff",
  wallbox: "#b48cff"
}, Ao = {
  pv: "M3 18h18l-3-9H6zM9 9l-1 9M15 9l1 9M4.5 13.5h15M12 2v3M5 4l1.5 2M19 4l-1.5 2",
  grid: "M12 2l-6 20M12 2l6 20M8 9h8M7 14h10M5 20h14M12 2v4",
  battery: "M6 6h12v15H6zM10 3h4v3M9 13h6M12 10v6",
  hp: "M4 5h16v14H4zM10 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0M10 12l2-3M10 12l-3 1M10 12l1 3M16 8h2M16 11h2M16 14h2",
  house: "M3 11l9-7l9 7M5 10v10h14V10M10 20v-6h4v6",
  wallbox: "M7 3h10v18H7zM10 8h4M12 12l-2 3h4l-2 3M17 14h2v4a2 2 0 0 0 2 2"
};
function Wo(o) {
  const e = Math.abs(o);
  return e > 5 ? 0.6 : e > 2 ? 0.9 : e > 0.5 ? 1.3 : 1.9;
}
const Wt = class Wt extends ne {
  constructor() {
    super(...arguments), this._wide = !1;
  }
  _node(e, t, s, i) {
    const [n, r] = e.pos[t], a = r < e.bus, l = s === void 0, p = s ?? 0, d = !l && Math.abs(p) >= 0.05, h = zi[t], m = d ? 2.5 + Math.min(6, Math.abs(p) * 0.9) : 2, u = a ? r + 26 : r - 26, w = a === p > 0, _ = c(t === "grid" && d ? p > 0 ? "en.grid_import" : "en.grid_export" : t === "battery" && d ? p > 0 ? "en.bat_discharge" : "en.bat_charge" : `en.${t}`);
    return k`
      <line x1=${n} y1=${u} x2=${n} y2=${e.bus} class="link" style="stroke:${d ? h : "var(--cp-border)"}; stroke-width:${m}" />
      ${d ? k`<line x1=${n} y1=${u} x2=${n} y2=${e.bus} class="dots ${w ? "down" : "up"}" style="animation-duration:${Wo(p)}s" />` : v}
      <g class="node ${l ? "missing" : ""}" transform="translate(${n} ${r})">
        <circle r="25" class="ring" style="stroke:${d ? h : "var(--cp-border)"}" />
        <path d=${Ao[t]} transform="translate(-12 -12)" class="glyph" style="stroke:${d ? h : "var(--cp-muted)"}" />
      </g>
      <text x=${n + 36} y=${r - 4} class="lbl">${_}</text>
      <text x=${n + 36} y=${r + 15} class="val">${l ? "–" : F(Math.abs(p), Math.abs(p) < 10 ? 2 : 1)}<tspan class="unit"> kW</tspan></text>
      ${i ? k`<g transform="translate(${n + 36} ${r + 23})">${i}</g>` : v}
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
    const t = this._wide ? Eo : zo, s = (e.pv ?? 0) + Math.max(0, e.battery ?? 0), i = (e.house ?? 0) + (e.wallbox ?? 0) + (e.hp ?? 0), n = i > 0.05 && (e.pv !== void 0 || e.battery !== void 0) ? Math.min(1, s / i) : void 0, r = e.soc, a = r !== void 0 ? k`<rect width="44" height="6" rx="3" class="soc-bg" />
            <rect width=${44 * Math.max(0, Math.min(100, r)) / 100} height="6" rx="3" style="fill:${zi.battery}" />
            <text x="50" y="7" class="soc">${Math.round(r)} %</text>` : void 0, l = (p) => p === void 0 ? void 0 : -p;
    return g`<div class="head">
        <b>${c("en.title")}</b>
        ${n !== void 0 ? g`<span class="share">${c("en.share", { pct: Math.round(n * 100) })}</span>` : v}
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
Wt.properties = { flow: { attribute: !1 } }, Wt.styles = ae`
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
let ws = Wt;
customElements.get("cp-energy") || customElements.define("cp-energy", ws);
const Ei = {
  heating: "#ff8a3d",
  hot_water: "#ff4f8b",
  defrost: "#6cc4ff",
  compressor_alarm: "#ff4d4d",
  cooling: "#38d0ff",
  off: "#8b949e"
};
function Fs(o, e, t = 10, s = "casing") {
  return k`<rect class=${s} x="0" y="0" width=${o} height=${e} rx=${t} />
    <rect class="sheen" x="2" y="2" width=${o - 4} height=${Math.min(e * 0.35, 40)} rx=${t - 2} />`;
}
function Po(o) {
  const { w: e, h: t, flags: s, c: i } = o, n = Ie(i.model);
  if (n.source === "brine") return Co(o);
  const r = s.has("running") && !s.has("defrost"), a = s.has("defrost"), l = s.has("alarm"), p = e * 0.36, d = t * 0.5, h = Math.min(t * 0.38, e * 0.3), m = o.num("fan_speed") ?? (r ? 60 : 0), u = m <= 0 ? 0 : m < 45 ? 2.8 : m < 70 ? 2 : 1.5, w = l ? "#ff4d4d" : a ? "#6cc4ff" : r ? "#3ddc97" : "#5b6573", _ = [0, 120, 240].map(
    (y) => k`<path transform="rotate(${y})" d="M0 0 C ${h * 0.18} ${-h * 0.25}, ${h * 0.55} ${-h * 0.35}, ${h * 0.82} ${-h * 0.12} C ${h * 0.6} ${h * 0.05}, ${h * 0.25} ${h * 0.08}, 0 0 Z" />`
  );
  return k`
    <rect class="foot" x=${e * 0.12} y=${t - 2} width=${e * 0.16} height="6" rx="2" />
    <rect class="foot" x=${e * 0.72} y=${t - 2} width=${e * 0.16} height="6" rx="2" />
    ${Fs(e, t, 12)}
    <circle class="grille-bg" cx=${p} cy=${d} r=${h + 4} />
    <g transform="translate(${p} ${d})">
      <g class=${u ? "spin fan" : "fan"} style=${u ? `--dur:${u}s` : ""}>${_}<circle r=${h * 0.12} class="hub" /></g>
    </g>
    ${[0.45, 0.72, 1].map((y) => k`<circle class="grille" cx=${p} cy=${d} r=${h * y} />`)}
    <line class="grille" x1=${p - h} y1=${d} x2=${p + h} y2=${d} />
    <line class="grille" x1=${p} y1=${d - h} x2=${p} y2=${d + h} />
    ${[0, 1, 2, 3, 4, 5].map((y) => k`<rect class="vent" x=${e * 0.73} y=${t * 0.22 + y * t * 0.1} width=${e * 0.19} height="3" rx="1.5" />`)}
    <circle cx=${e * 0.9} cy=${t * 0.12} r="4" fill=${w} class=${r || a ? "pulse" : ""} />
    ${n.refrigerant ? k`<text class="tag" x=${e * 0.825} y=${t * 0.9} text-anchor="middle">${n.refrigerant}</text>` : ""}
    ${a ? k`<rect x="2" y="2" width=${e - 4} height=${t - 4} rx="10" class="frost" />
        <g class="pulse" transform="translate(${p} ${d})">${To(h * 0.55)}</g>` : ""}
    ${l ? k`<rect x="1" y="1" width=${e - 2} height=${t - 2} rx="11" class="alarm-ring" />` : ""}
  `;
}
function Co(o) {
  const { w: e, h: t, flags: s } = o, i = s.has("running");
  return k`
    ${Fs(e, t * 0.55, 10)}
    <text class="tag" x=${e / 2} y=${t * 0.32} text-anchor="middle">SOLE</text>
    <rect class="ground" x="0" y=${t * 0.62} width=${e} height=${t * 0.38} rx="6" />
    ${[0.2, 0.4, 0.6, 0.8].map(
    (n) => k`<path class=${i ? "probe active" : "probe"} d="M${e * n - 6} ${t * 0.55} V ${t * 0.95} M${e * n + 6} ${t * 0.55} V ${t * 0.95} M${e * n - 6} ${t * 0.95} Q ${e * n} ${t} ${e * n + 6} ${t * 0.95}" />`
  )}
  `;
}
function To(o) {
  const e = [0, 60, 120].map(
    (t) => k`<g transform="rotate(${t})"><line x1=${-o} y1="0" x2=${o} y2="0" />
      <path d="M${o * 0.6} 0 l ${o * 0.2} ${-o * 0.2} M${o * 0.6} 0 l ${o * 0.2} ${o * 0.2} M${-o * 0.6} 0 l ${-o * 0.2} ${-o * 0.2} M${-o * 0.6} 0 l ${-o * 0.2} ${o * 0.2}" /></g>`
  );
  return k`<g class="snow">${e}</g>`;
}
const E = 20;
function Y(o, e, t) {
  const s = o.map(([i, n], r) => `${r ? "L" : "M"} ${i * E} ${n * E}`).join(" ");
  return k`<path class="ipipe" d=${s} style="stroke:${e}" />
    ${t ? k`<path class="ipipe-flow" d=${s} />` : v}`;
}
function st([o, e], t, s = "l", i = "PC0") {
  const n = 0.55 * E, r = { r: 0, d: 90, l: 180, u: 270 }[s];
  return k`<g transform="translate(${o * E} ${e * E})">
    ${t ? k`<circle class="pump-glow pulse" r=${n + 4} />` : v}
    <circle class=${t ? "pump-body on" : "pump-body"} r=${n} />
    <path class=${t ? "pump-tri on" : "pump-tri"} transform="rotate(${r})" d="M ${-n * 0.5} ${-n * 0.8} L ${n} 0 L ${-n * 0.5} ${n * 0.8} Z" />
    <circle class=${t ? "impeller spin" : "impeller"} style="--dur:0.9s" r=${n * 0.36} />
    <text class="itag halo" y=${n + 9} text-anchor="middle">${i}</text>
  </g>`;
}
function gt([o, e], t, s = "VW1", i = !1) {
  const n = 0.5 * E;
  return k`<g transform="translate(${o * E} ${e * E})">
    <path class="valve-tri on" d="M ${-n} ${-n * 0.6} L 0 0 L ${-n} ${n * 0.6} Z" transform="rotate(-90)" />
    <path class=${t ? "valve-tri" : "valve-tri on"} d="M ${n} ${-n * 0.6} L 0 0 L ${n} ${n * 0.6} Z" />
    <path class=${t ? "valve-tri on" : "valve-tri"} d="M ${-n} ${-n * 0.6} L 0 0 L ${-n} ${n * 0.6} Z" />
    ${i ? k`<text class="itag" x=${-n - 3} y=${-n * 0.4} text-anchor="end">${s} ${t ? "B" : "A"}</text>` : k`<text class="itag" x=${n + 3} y=${-n} >${s} ${t ? "B" : "A"}</text>`}
  </g>`;
}
function _t([o, e], t, s) {
  return k`<g transform="translate(${o * E} ${e * E})">
    ${s ? k`<rect class="aux-glow pulse" x=${-0.55 * E} y="-6" width=${1.1 * E} height=${t * E + 12} rx="10" />` : v}
    <rect class=${s ? "rod hot" : "rod"} x=${-0.35 * E} y="0" width=${0.7 * E} height=${t * E} rx="6" />
    <path class=${s ? "coil hot" : "coil"} d=${Lo(0, 6, t * E - 12, 4, 8)} />
  </g>`;
}
function Lo(o, e, t, s, i) {
  const n = t / i;
  let r = `M${o} ${e}`;
  for (let a = 1; a <= i; a++) r += ` L${o + (a % 2 ? -s : s)} ${e + a * n}`;
  return r;
}
function wt(o, e, t, s) {
  const i = [...o.flags].find((r) => r.startsWith("mode_"))?.slice(5), n = Ei[i || "off"] || Ei.off;
  return k`<rect class="screen" x=${e} y=${t} width=${s} height="18" rx="4" />
    <rect x=${e + 4} y=${t + 4} width="14" height="10" rx="2" fill=${n} class=${i && i !== "off" ? "pulse" : ""} />
    <text class="screen-text" x=${e + 24} y=${t + 13}>${i ? c(`mode.${i}`) : ""}</text>`;
}
function Do(o, e) {
  const { w: t, h: s, flags: i, c: n } = o, r = i.has("running"), a = i.has("b"), l = i.has("aux"), p = i.has("pc1"), d = de(o.num("supply_temp"), "#ff7a45"), h = de(o.num("return_temp"), "#4d9fff"), m = (n.model || "").match(/w[ls]w\d{3}i/i)?.[0]?.toUpperCase().replace("I", "i") || "";
  let u;
  if (e === "t180") {
    const w = de(o.num("dhw_temp"), "#ff4f8b");
    u = k`
      <rect class="tank-in" x=${0.6 * E} y=${10 * E} width=${6.8 * E} height=${11.2 * E} rx=${E} style="fill:${w}" />
      <path class=${r && a ? "tank-coil hot" : "tank-coil"} d=${Oo(2.4, 14, 5.6, 19.6)} />
      ${wt(o, 1.6 * E, 0.8 * E, 4.6 * E)}
      ${Y([[6, 0], [6, 6.2], [4.6, 6.2]], d, r)}
      ${Y([[4.6, 6.2], [3, 6.2], [3, 0]], d, r && !a)}
      ${Y([[4.6, 6.2], [4.6, 14]], d, r && a)}
      ${Y([[2.4, 19.6], [1.6, 19.6], [1.6, 7.6]], h, r && a)}
      ${Y([[1, 0], [1, 7.6]], h, r && !a)}
      ${Y([[1, 7.6], [7, 7.6], [7, 0]], h, r)}
      ${Y([[4, 10.2], [4, 0]], w, i.has("flowing"))}
      ${Y([[5, 0], [5, 3], [5.6, 3], [5.6, 20.6]], "#38d0ff", i.has("flowing"))}
      ${_t([6, 1.4], 4, l)}
      ${gt([4.6, 6.2], a)}
      ${st([4.2, 7.6], r, "r")}
      ${k`<g transform="translate(${3 * E} ${3.4 * E})"><circle class=${p ? "pump-body on" : "pump-body"} r="8" /><text class="itag" x="12" y="4">PC1</text></g>`}`;
  } else if (e === "tp70") {
    const w = de(o.num("buffer_temp"), "#ff9f45");
    u = k`
      <rect class="tank-in" x=${0.6 * E} y=${9.4 * E} width=${7.8 * E} height=${4.2 * E} rx=${E} style="fill:${w}" />
      <text class="tank-label" x=${4.5 * E} y=${13 * E} text-anchor="middle">${n.props.buffer_l || 70} l</text>
      ${wt(o, 0.6 * E, 14.2 * E, 4.4 * E)}
      ${Y([[3, 0], [3, 1.2]], w, !1)}
      ${Y([[4, 0], [4, 1.2]], h, !1)}
      ${Y([[2, 0], [2, 12.6]], h, p)}
      ${Y([[1, 9.4], [1, 0]], w, p)}
      ${Y([[6, 9.4], [6, 8]], h, r && !a)}
      ${Y([[8, 0], [8, 8], [6, 8]], h, r && a)}
      ${Y([[6, 8], [6, 0]], h, r)}
      ${Y([[5, 0], [5, 6.4]], d, r)}
      ${Y([[5, 6.4], [5, 9.4]], d, r && !a)}
      ${Y([[5, 6.4], [7, 6.4], [7, 0]], d, r && a)}
      ${_t([5, 1.6], 2.8, l)}
      ${gt([5, 6.4], a, "VW1", !0)}
      ${st([6, 3.4], r, "u")}
      ${st([1, 5], p, "u", "PC1")}`;
  } else e === "brine" ? u = k`
      ${wt(o, 1.6 * E, 0.8 * E, 4.6 * E)}
      <circle class="compressor" cx=${2.2 * E} cy=${8.5 * E} r=${1.2 * E} />
      <text class="itag" x=${2.2 * E} y=${10.4 * E} text-anchor="middle">Verdichter</text>
      ${Y([[1, 0], [1, 6], [2.2, 6], [2.2, 7.3]], "#38d0ff", r)}
      ${Y([[2.2, 9.7], [2.2, 11.5], [2, 11.5], [2, 0]], "#2b6cff", r)}
      ${Y([[4, 9], [4, 4], [5.5, 4], [5.5, 9]], d, r)}
      ${Y([[5.5, 9], [7, 9], [7, 0]], d, r && !a)}
      ${Y([[5.5, 9], [5.5, 10.4], [4, 10.4], [4, 0]], d, r && a)}
      ${Y([[6, 0], [6, 11.6], [4, 11.6], [4, 9]], h, r && !a)}
      ${Y([[5, 0], [5, 3.4]], h, r && a)}
      ${_t([4, 3], 3, l)}
      ${gt([5.5, 9], a)}
      ${st([5.5, 11.6], r, "l")}` : u = k`
      ${wt(o, 2 * E, 0.8 * E, 6 * E)}
      ${Y([[3, 14], [3, 9.6], [4.3, 9.6], [4.3, 2.8], [7.6, 2.8], [7.6, 10.6]], d, r)}
      ${Y([[7.6, 10.6], [9, 10.6], [9, 14]], d, r && !a)}
      ${Y([[7.6, 10.6], [7.6, 11.6], [5, 11.6], [5, 14]], d, r && a)}
      ${Y([[8, 14], [8, 12.8], [6, 12.8]], h, r && !a)}
      ${Y([[6, 14], [6, 12.8]], h, r && a)}
      ${Y([[6, 12.8], [2, 12.8], [2, 14]], h, r)}
      ${_t([4.3, 3.4], 5.4, l)}
      ${gt([7.6, 10.6], a)}
      ${st([4.3, 12.8], r, "l")}`;
  return k`
    ${Fs(t, s, 10, "casing light")}
    ${u}
    ${e === "wall_e" || e === "tp70" ? v : k`<text class="tag" x=${t / 2} y=${2.4 * E} text-anchor="middle">${m}</text>`}
  `;
}
function Oo(o, e, t, s) {
  const n = (s - e) / 5;
  let r = `M ${t * E} ${e * E - 2 * E}`;
  r += ` L ${t * E} ${e * E}`;
  for (let a = 0; a < 5; a++) {
    const l = (e + a * n) * E;
    r += ` C ${(o - 0.3) * E} ${l}, ${(o - 0.3) * E} ${l + n / 2 * E}, ${t * E} ${l + n / 2 * E}`, r += ` C ${(t + 0.3) * E} ${l + n / 2 * E}, ${(t + 0.3) * E} ${l + n * E}, ${o * E} ${l + n * E}`;
  }
  return r;
}
function Ai(o, e) {
  const { w: t, h: s, c: i, flags: n } = o, r = o.num("temp_top"), a = o.num("temp_bottom") ?? (r !== void 0 ? r - 6 : void 0), l = o.num("temp_mid") ?? (r !== void 0 && a !== void 0 ? (r + a) / 2 : void 0), p = `tg-${i.id}`, d = e === "dhw" ? "#ff4f8b" : "#ff7a45", h = n.has("charging"), m = i.props.volume ? `${i.props.volume} l` : "", u = Math.min(t / 2, 2 * E);
  return k`
    <defs>
      <linearGradient id=${p} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.05" stop-color=${de(r, d)} />
        <stop offset="0.5" stop-color=${de(l, "#c084fc")} />
        <stop offset="0.95" stop-color=${de(a, "#4d9fff")} />
      </linearGradient>
    </defs>
    <rect class="insulation" x="-3" y="-3" width=${t + 6} height=${s + 6} rx=${u + 3} />
    <rect x="0" y="0" width=${t} height=${s} rx=${u} fill="url(#${p})" class="tank-fill" />
    <rect class="tank-glass" x=${t * 0.1} y=${s * 0.06} width=${t * 0.12} height=${s * 0.88} rx=${t * 0.06} />
    ${e === "dhw" ? k`<path class=${h ? "tank-coil hot" : "tank-coil"} d=${Ho(t)} />
        <path class="dip" d="M 0 ${10 * E} H ${0.8 * E} V ${s - 0.4 * E}" />` : k`
        <path class="dip" d="M ${2 * E} 0 V ${s - 0.5 * E}" />
        <path class="dip" d="M ${3 * E} 0 V ${s - 0.5 * E}" />
        ${[0.3, 0.55, 0.8].map((w) => k`<line class="strat" x1=${t * 0.62} x2=${t * 0.9} y1=${s * w} y2=${s * w} />`)}`}
    <text class="tank-label" x=${t / 2} y=${s * (e === "dhw" ? 0.3 : 0.5)} text-anchor="middle">${m}</text>
    ${n.has("disinfecting") ? k`<text class="tank-badge" x=${t / 2} y=${s * 0.18} text-anchor="middle">60°</text>` : ""}
  `;
}
function Ho(o) {
  const e = o, t = o * 0.78, s = o * 0.3, i = 4 * E, n = 9 * E, r = 5, a = (n - i) / r;
  let l = `M ${e} ${i} H ${t}`;
  for (let p = 0; p < r; p++) {
    const d = i + p * a;
    l += ` C ${s - 6} ${d}, ${s - 6} ${d + a / 2}, ${t} ${d + a / 2} C ${t + 6} ${d + a / 2}, ${t + 6} ${d + a}, ${t} ${d + a}`;
  }
  return `${l} H ${e}`;
}
function Vo(o) {
  const { w: e, h: t, flags: s } = o, i = s.has("running"), n = Math.min(e, t) / 2 - 2, r = e / 2, a = t / 2;
  return k`
    ${i ? k`<circle class="pump-glow pulse" cx=${r} cy=${a} r=${n + 5} />` : ""}
    <circle class=${i ? "pump-body on" : "pump-body"} cx=${r} cy=${a} r=${n} />
    <path class=${i ? "pump-tri on" : "pump-tri"} d="M ${r - n * 0.5} ${a - n * 0.82} L ${r + n} ${a} L ${r - n * 0.5} ${a + n * 0.82} Z" />
    <g transform="translate(${r} ${a})">
      <circle class=${i ? "impeller spin" : "impeller"} style="--dur:0.9s" r=${n * 0.38} />
    </g>
  `;
}
function Wi(o, e = !1) {
  const { w: t, h: s, flags: i } = o, n = t / 2, r = s / 2, a = Math.min(t, s) / 2 - 2, l = i.has("b"), p = (d) => e || d ? "valve-tri on" : "valve-tri";
  return k`
    <rect class="actuator" x=${n - a * 0.35} y=${r - a * 1.25} width=${a * 0.7} height=${a * 0.45} rx="2" />
    <line class="stem" x1=${n} y1=${r - a * 0.8} x2=${n} y2=${r} />
    <path class=${p(!0)} d="M ${n - a} ${r - a * 0.6} L ${n} ${r} L ${n - a} ${r + a * 0.6} Z" />
    <path class=${p(!l)} d="M ${n + a} ${r - a * 0.6} L ${n} ${r} L ${n + a} ${r + a * 0.6} Z" />
    <path class=${p(l)} d="M ${n - a * 0.6} ${r + a} L ${n} ${r} L ${n + a * 0.6} ${r + a} Z" />
    ${e ? "" : k`<text class="valve-tag" x=${n + a * 0.5} y=${r - a * 0.75}>${l ? "B" : "A"}</text>`}
  `;
}
function Bo(o) {
  const { w: e, h: t } = o, s = o.num("flow_temp"), i = o.num("return_temp"), n = o.num("room_temp"), r = s !== void 0 && n !== void 0 ? s - n > 6 : !1, a = 9, l = 0.45 * E, p = t - 0.45 * E, d = (e - 20) / a, h = `rg-${o.c.id}`;
  return k`
    <defs><linearGradient id=${h} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color=${de(s, "#8b949e")} stop-opacity=${r ? 0.85 : 0.25} />
      <stop offset="1" stop-color=${de(i, "#8b949e")} stop-opacity=${r ? 0.6 : 0.2} />
    </linearGradient></defs>
    ${r ? [0.3, 0.55, 0.8].map(
    (m, u) => k`<path class="heat-wave" style="animation-delay:${u * 0.6}s" d="M ${e * m} ${l - 4} q 5 -6 0 -12 q -5 -6 0 -12" />`
  ) : ""}
    ${o.c.props?.variant === "bottom" ? k`<line class="rad-stub" x1=${4 * E} x2=${4 * E} y1=${p - 2} y2=${t} /><line class="rad-stub" x1=${6 * E} x2=${6 * E} y1=${p - 2} y2=${t} />` : ""}
    <rect class="rad-frame" x="0" y=${l} width=${e - 4} height=${p - l} rx="6" />
    <rect class="rad-header" x="0" y=${E - 4} width=${e - 4} height="8" rx="4" />
    <rect class="rad-header" x="0" y=${5 * E - 4} width=${e - 4} height="8" rx="4" />
    ${Array.from({ length: a }, (m, u) => k`<rect x=${12 + u * d} y=${l + 6} width=${d - 3} height=${p - l - 12} rx=${(d - 3) / 2} fill="url(#${h})" class="fin" />`)}
  `;
}
function Ro(o) {
  const { w: e, h: t } = o, s = o.num("flow_temp"), i = de(s, "#8b949e");
  let n = `M 10 ${t * 0.25}`;
  const r = 5;
  for (let a = 0; a < r; a++)
    n += a % 2 === 0 ? ` H ${e - 12} q 6 0 6 ${t * 0.3 / r} q 0 ${t * 0.3 / r} -6 ${t * 0.3 / r}` : ` H 16 q -6 0 -6 ${t * 0.3 / r} q 0 ${t * 0.3 / r} 6 ${t * 0.3 / r}`;
  return k`
    <rect class="floor-slab" x="2" y=${t * 0.15} width=${e - 4} height=${t * 0.75} rx="6" />
    <path d=${n} fill="none" stroke=${i} stroke-width="3" stroke-linecap="round" opacity="0.9" />
  `;
}
function No(o) {
  const { w: e, flags: t } = o, s = t.has("flowing"), i = 1.3 * E, n = 1.6 * E;
  return k`
    <path class="tap-body" d="M ${e} ${E - 3} H ${i + 6} v 6 H ${e} Z" />
    <path class="tap-body" d="M ${i + 4} ${E - 3} v ${n - E - 3} h -4 v ${-9} Z" />
    <path class="tap-handle" d="M ${i - 16} ${n + 4} L ${i - 10} ${n - 5} H ${i + 14} L ${i + 20} ${n + 4} Z" />
    ${[0, 1, 2, 3, 4].map((r) => {
    const a = i - 12 + r * 7;
    return s ? k`<line class="shower-jet" style="animation-delay:${r % 3 * 0.18}s" x1=${a} y1=${n + 8} x2=${a + (r - 2) * 3} y2=${n + 2.8 * E} />` : k`<circle class="shower-hole" cx=${a} cy=${n + 6} r="1.4" />`;
  })}
  `;
}
function Io(o) {
  if (o.c.props?.variant === "shower") return No(o);
  const { w: e, h: t, flags: s } = o, i = s.has("flowing");
  return k`
    <path class="tap-body" d="M ${e} ${t * 0.25} H ${e * 0.45} a ${e * 0.25} ${e * 0.25} 0 0 0 ${-e * 0.25} ${e * 0.25} V ${t * 0.62} h ${e * 0.16} V ${t * 0.52} a ${e * 0.1} ${e * 0.1} 0 0 1 ${e * 0.1} ${-e * 0.1} H ${e} Z" />
    <rect class="tap-handle" x=${e * 0.46} y=${t * 0.06} width=${e * 0.26} height=${t * 0.12} rx="3" />
    ${i ? [0, 1, 2].map((n) => k`<circle class="drop" style="animation-delay:${n * 0.25}s" cx=${e * 0.28} cy=${t * 0.7} r="2.5" />`) : ""}
  `;
}
function jo(o) {
  const { w: e, h: t } = o;
  return k`
    <rect class="casing" x="0" y=${t * 0.2} width=${e} height=${t * 0.6} rx="5" />
    <text class="tag" x=${e * 0.45} y=${t * 0.62} text-anchor="middle">KW</text>
  `;
}
function Ko(o) {
  const { w: e, h: t, c: s } = o;
  return s.props.filter ? k`
      <rect class="casing" x=${e * 0.15} y=${t * 0.1} width=${e * 0.7} height=${t * 0.8} rx="5" />
      ${[0.3, 0.45, 0.6, 0.75].map((i) => k`<line class="sieve" x1=${e * 0.25} x2=${e * 0.75} y1=${t * i} y2=${t * i} />`)}
      ${[0.35, 0.5, 0.65].map((i) => k`<line class="sieve" x1=${e * i} x2=${e * i} y1=${t * 0.22} y2=${t * 0.8} />`)}` : k`
    <rect class="casing" x=${e * 0.2} y="0" width=${e * 0.6} height=${t} rx=${e * 0.3} />
    <path class="magnet" d="M ${e * 0.38} ${t * 0.3} v ${t * 0.25} a ${e * 0.12} ${e * 0.12} 0 0 0 ${e * 0.24} 0 v ${-t * 0.25}" />
  `;
}
function Fo(o) {
  const { w: e, h: t } = o;
  return k`
    <line class="stem" x1=${e / 2} y1=${t * 0.8} x2=${e / 2} y2=${t} />
    <rect class="vessel" x="0" y="0" width=${e} height=${t * 0.82} rx=${e / 2} />
    <rect class="sheen" x=${e * 0.18} y=${t * 0.08} width=${e * 0.2} height=${t * 0.6} rx=${e * 0.1} />
  `;
}
function Uo(o) {
  switch (o.c.type) {
    case "outdoor_unit":
      return Po(o);
    case "indoor_unit":
      return Do(o, We(o.c)?.id || "wall_e");
    case "buffer":
      return Ai(o, "buffer");
    case "dhw_tank":
      return Ai(o, "dhw");
    case "pump":
      return Vo(o);
    case "valve_3way":
      return Wi(o);
    case "mixer":
      return Wi(o, !0);
    case "radiators":
      return Bo(o);
    case "floor_heating":
      return Ro(o);
    case "tap":
      return Io(o);
    case "water_inlet":
      return jo(o);
    case "separator":
      return Ko(o);
    case "expansion_vessel":
      return Fo(o);
    case "junction":
      return k`<circle class="junction" r="4" />`;
    default:
      return k``;
  }
}
const Pi = 1, bt = { l: { x: -1, y: 0 }, r: { x: 1, y: 0 }, t: { x: 0, y: -1 }, b: { x: 0, y: 1 } };
function ns(o) {
  return o === "l" || o === "r";
}
function hn(o, e) {
  const t = e.get(o.from.c), s = e.get(o.to.c);
  if (!t || !s) return null;
  const i = ge(t, o.from.p), n = ge(s, o.to.p);
  if (!i || !n) return null;
  const r = t.type === "junction" ? 0 : Pi, a = s.type === "junction" ? 0 : Pi, l = { x: i.x, y: i.y }, p = { x: n.x, y: n.y }, d = { x: l.x + bt[i.dir].x * r, y: l.y + bt[i.dir].y * r }, h = { x: p.x + bt[n.dir].x * a, y: p.y + bt[n.dir].y * a }, m = ns(i.dir), u = [l, d];
  if (o.via?.length) {
    let w = !m;
    for (const [_, y] of [...o.via, [h.x, h.y]]) {
      const b = u[u.length - 1];
      if (b.x !== _ && b.y !== y) {
        const $ = w ? { x: b.x, y } : { x: _, y: b.y };
        u.push($);
      }
      w = u[u.length - 1].x === _, u.push({ x: _, y });
    }
    return u.push(p), { pts: Ci(u), horizontalStart: m };
  }
  if (m)
    if (d.y === h.y && o.bend === void 0)
      u.push(h);
    else {
      const w = o.bend ?? (d.x + h.x) / 2;
      ns(n.dir) ? u.push({ x: w, y: d.y }, { x: w, y: h.y }) : o.bend === void 0 ? u.push({ x: h.x, y: d.y }) : u.push({ x: w, y: d.y }, { x: w, y: h.y }), u.push(h);
    }
  else if (d.x === h.x && o.bend === void 0)
    u.push(h);
  else {
    const w = o.bend ?? (d.y + h.y) / 2;
    ns(n.dir) ? o.bend === void 0 ? u.push({ x: d.x, y: h.y }) : u.push({ x: d.x, y: w }, { x: h.x, y: w }) : u.push({ x: d.x, y: w }, { x: h.x, y: w }), u.push(h);
  }
  return u.push(p), { pts: Ci(u), horizontalStart: m };
}
function Ci(o) {
  const e = [];
  for (const t of o) {
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
function Zo(o, e = 8) {
  if (o.length === 0) return "";
  const t = o.map((n) => ({ x: n.x * z, y: n.y * z }));
  let s = `M ${t[0].x} ${t[0].y}`;
  for (let n = 1; n < t.length - 1; n++) {
    const r = t[n - 1], a = t[n], l = t[n + 1], p = Math.hypot(a.x - r.x, a.y - r.y), d = Math.hypot(l.x - a.x, l.y - a.y), h = Math.min(e, p / 2, d / 2), m = a.x - (a.x - r.x) / p * h, u = a.y - (a.y - r.y) / p * h, w = a.x + (l.x - a.x) / d * h, _ = a.y + (l.y - a.y) / d * h;
    s += ` L ${m} ${u} Q ${a.x} ${a.y} ${w} ${_}`;
  }
  const i = t[t.length - 1];
  return `${s} L ${i.x} ${i.y}`;
}
const ke = 18, Go = 16, Yo = 10, os = 8;
function qo(o, e, t) {
  if (o.icon) return null;
  switch (o.type) {
    case "outdoor_unit":
      return Ie(o.model).source === "brine" ? { x: 0, y: 0, w: e, h: t * 0.55, r: 10 } : { x: 0, y: 0, w: e, h: t, r: 12 };
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
      return o.props.filter ? { x: e * 0.15, y: t * 0.1, w: e * 0.7, h: t * 0.8, r: 5 } : { x: e * 0.2, y: 0, w: e * 0.6, h: t, r: e * 0.3 };
    case "expansion_vessel":
      return { x: 0, y: 0, w: e, h: t * 0.82, r: e / 2 };
    case "value_tile":
      return { x: 0, y: 0, w: e, h: t, r: 10 };
    default:
      return null;
  }
}
const be = 88, we = 34, ue = 6;
function rs(o, e = 17) {
  return o.length > e ? `${o.slice(0, e - 1)}…` : o;
}
const Pt = class Pt extends ne {
  constructor() {
    super(...arguments), this.gridStep = 1, this.showGrid = !1, this.snapGrid = !0, this.snapObjects = !0, this._guides = {}, this.icons = /* @__PURE__ */ new Map(), this.edit = !1, this.autoHeight = !1, this.selected = null, this.version = 0, this._view = null, this._drag = null, this._connect = null, this._pointers = /* @__PURE__ */ new Map(), this._gesture = null, this._segments = [], this._pills = [], this._lastMoved = !1, this._structureKey = "", this._onKey = (e) => {
      e.key === "Escape" && this._connect && (this._connect = null);
    };
  }
  /** Does any pipe pass through the given pixel rectangle (with a small margin)? */
  _hitsPipe(e, t, s, i) {
    return this._segments.some((r) => r.x1 <= s + 5 && r.x2 >= e - 5 && r.y1 <= i + 5 && r.y2 >= t - 5);
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
    const t = e.show ?? ye(e).filter((s) => s.show).map((s) => s.key);
    return this.edit ? [] : t.filter((s) => this.src.get(e, s) !== void 0);
  }
  /** Slots shown in the component's value list (not anchored to a pipe or a measuring point). */
  _listSlots(e) {
    const t = new Set(mi(e).filter((s) => s.at || s.pos).map((s) => s.key));
    return this._shownSlots(e).filter((s) => !t.has(s));
  }
  _badgeLayout(e) {
    const t = ui(e);
    if (t === "none" || t === "inside") return [];
    const s = this._listSlots(e);
    if (!s.length) return [];
    const { w: i, h: n } = fe(e), r = e.x * z, a = e.y * z, l = i * z, p = n * z, d = [];
    if (t === "tank") {
      const h = { temp_top: 0.16, temp_mid: 0.48, temp_bottom: 0.8 }, m = [];
      for (const b of s)
        b in h ? d.push({ slot: b, x: r + 5, y: a + p * h[b] - 11, w: l - 10 }) : m.push(b);
      const w = m.length * (we + ue), _ = [
        { x: r + l / 2 - be / 2, y: a + p + 26, dy: we + ue },
        { x: r + l + 12, y: a + p * 0.35, dy: we + ue },
        { x: r - 12 - be, y: a + p * 0.35, dy: we + ue }
      ], y = _.find((b) => !this._hitsPipe(b.x, b.y, b.x + be, b.y + w)) || _[0];
      return m.forEach((b, x) => d.push({ slot: b, x: y.x, y: y.y + x * y.dy })), d;
    }
    if (t === "right")
      s.forEach((h, m) => d.push({ slot: h, x: r + l + 12, y: a + 4 + m * (we + ue) }));
    else if (t === "left")
      s.forEach((h, m) => d.push({ slot: h, x: r - 12 - be, y: a + 4 + m * (we + ue) }));
    else if (t === "above") {
      const h = ye(e).map((w) => w.key);
      s.sort((w, _) => h.indexOf(w) - h.indexOf(_));
      const m = Math.min(3, s.length) * (be + ue) - ue, u = r + l / 2 - m / 2;
      s.forEach(
        (w, _) => d.push({ slot: w, x: u + _ % 3 * (be + ue), y: a - we - 10 - Math.floor(_ / 3) * (we + ue) })
      );
    } else {
      const h = Math.max(2, Math.floor((l + 40) / (be + ue))), m = Math.ceil(s.length / h);
      s.forEach((u, w) => {
        const _ = Math.floor(w / h), b = (_ === m - 1 ? s.length - _ * h : h) * (be + ue) - ue;
        d.push({
          slot: u,
          x: r + l / 2 - b / 2 + w % h * (be + ue),
          y: a + p + 26 + _ * (we + ue)
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
      const { w: l, h: p } = fe(a);
      n(a.x * z - 6, a.y * z - 6), n((a.x + l) * z + 6, (a.y + p) * z + 22), a.label && De(a).some((d) => ge(a, d.id)?.dir === "b") && n((a.x + l) * z + 12 + Math.min(28, a.label.length) * 7.5, (a.y + p) * z);
      for (const d of this._badgeLayout(a))
        n(d.x, d.y), n(d.x + be, d.y + we);
    }
    for (const a of this._pills)
      n(a.x, a.y), n(a.x + a.w, a.y + ke);
    (this.edit || !Number.isFinite(e)) && (n(0, 0), n(this.plant.grid.w * z, this.plant.grid.h * z));
    const r = 24;
    return { x: e - r, y: t - r, w: s - e + 2 * r, h: i - t + 2 * r };
  }
  // -------------------------------------------------------------- render
  render() {
    if (!this.plant) return v;
    const e = this._view || this._contentBox(), t = new Map(this.plant.components.map((r) => [r.id, this._comp(r)])), s = new Map(this.plant.components.map((r) => [r.id, xe(r, this.src)])), i = Yn(this.plant, this.src), n = this.plant.pipes.map((r) => ({ pipe: r, route: hn(r, t) }));
    return this._segments = n.flatMap(
      ({ route: r }) => (r?.pts || []).slice(1).map((a, l) => {
        const p = r.pts[l];
        return { x1: Math.min(p.x, a.x) * z, x2: Math.max(p.x, a.x) * z, y1: Math.min(p.y, a.y) * z, y2: Math.max(p.y, a.y) * z };
      })
    ), this._pills = this.edit ? [] : this._placePills(t, n), g`
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
        ${this._building(e)}
        ${this._iso && !this.edit ? this._isoFloor(e) : v}
        ${this.edit ? this._grid() : v}
        ${this._iso ? this._isoLayer() : v}
        <g class="pipes ${this._iso ? "iso" : ""}">
          ${n.map(({ pipe: r, route: a }) => {
      if (!a) return v;
      const l = Zo(a.pts), p = Gn(r, s), d = Jn(r.kind, i.get(r.id)), h = this.selected?.kind === "p" && this.selected.id === r.id;
      return k`<g class="pipe ${p ? "active" : ""} ${h ? "selected" : ""}" data-pipe=${r.id}
                @pointerdown=${(m) => this._onPipeDown(m, r.id)}>
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
          ${this.plant.components.map((r) => this._component(t.get(r.id), s.get(r.id)))}
        </g>
        <g class="pills">${this._pills.map((r) => this._anchorPill(r))}</g>
        ${this.edit ? this._editOverlays(t, n) : v}
        ${this.edit ? this._guideLines() : v}
      </svg>
    `;
  }
  _grid() {
    const { w: e, h: t } = this.plant.grid;
    if (!this.showGrid)
      return k`
        <defs><pattern id="cp-grid" width=${z} height=${z} patternUnits="userSpaceOnUse">
          <circle cx="0" cy="0" r="1" class="grid-dot" />
        </pattern></defs>
        <rect class="grid-bg" x="0" y="0" width=${e * z} height=${t * z} fill="url(#cp-grid)" />`;
    const s = Math.max(1, this.gridStep) * z, i = s * 5;
    return k`
      <defs>
        <pattern id="cp-grid-minor" width=${s} height=${s} patternUnits="userSpaceOnUse">
          <path d="M ${s} 0 L 0 0 0 ${s}" class="grid-line" />
        </pattern>
        <pattern id="cp-grid-major" width=${i} height=${i} patternUnits="userSpaceOnUse">
          <rect width=${i} height=${i} fill="url(#cp-grid-minor)" />
          <path d="M ${i} 0 L 0 0 0 ${i}" class="grid-line major" />
        </pattern>
      </defs>
      <rect class="grid-bg" x="0" y="0" width=${e * z} height=${t * z} fill="url(#cp-grid-major)" />`;
  }
  /** Alignment guides of the object snap while dragging. */
  _guideLines() {
    const { x: e, y: t } = this._guides;
    if (e === void 0 && t === void 0) return v;
    const { w: s, h: i } = this.plant.grid;
    return k`<g class="guides">
      ${e !== void 0 ? k`<line x1=${e * z} x2=${e * z} y1="0" y2=${i * z} />` : v}
      ${t !== void 0 ? k`<line x1="0" x2=${s * z} y1=${t * z} y2=${t * z} />` : v}
    </g>`;
  }
  get _iso() {
    return this.plant?.settings?.style === "iso";
  }
  /** Body outline of a component in schematic px, honouring rotation and mirroring. */
  _isoBox(e) {
    const t = { ...ie[e.type], ...Be(e) }, { w: s, h: i } = fe(e), n = (e.type === "value_tile" ? s : t.w) * z, r = (e.type === "value_tile" ? i : t.h) * z, a = qo(e, n, r);
    if (!a) return null;
    let { x: l, y: p, w: d, h } = a;
    e.flip && t.mirrorable && (l = n - (l + d));
    const m = t.rotatable && e.rot || 0;
    return m === 90 ? [l, p, d, h] = [r - (p + h), l, h, d] : m === 180 ? [l, p] = [n - (l + d), r - (p + h)] : m === 270 && ([l, p, d, h] = [p, n - (l + d), h, d]), { x: e.x * z + l, y: e.y * z + p, w: d, h, r: Math.min(a.r, d / 2, h / 2) };
  }
  /** 2.5D: soft shadows and extruded bodies, drawn behind pipes and components. */
  _isoLayer() {
    const e = this.plant.components.map((s) => this._isoBox(s)).filter((s) => !!s), t = Array.from({ length: os }, (s, i) => (os - i) / os);
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
        ${e.map((s) => t.map((i) => k`<rect x=${s.x + Go * i} y=${s.y - Yo * i} width=${s.w} height=${s.h} rx=${s.r} fill="url(#cp-iso-grad)" />`))}
      </g>`;
  }
  /** Building section: ground, outer wall, ceiling and room names (settings.building). */
  _building(e) {
    const t = this.plant.settings?.building;
    if (!t || t.show === !1) return k``;
    const { w: s } = this.plant.grid, i = t.floor * z, n = (t.ground ?? t.floor) * z, r = t.slab !== void 0 ? t.slab * z : void 0, a = Math.min(0, e.x) - z * 4, l = Math.max(s * z, e.x + e.w) + z * 4, p = Math.min(0, e.y) - z * 4, d = Math.max(i, n) + z * 30, h = t.wall !== void 0, m = h ? t.wall * z : a, u = t.outside === "right", [w, _] = h ? u ? [a, m] : [m, l] : [a, l], [y, b] = u ? [m, l] : [a, m];
    return k`<g class="building">
      ${h ? k`<rect class="outside" x=${y} y=${p} width=${b - y} height=${n - p} />
            <rect class="ground" x=${y} y=${n} width=${b - y} height=${d - n} />
            <line class="floor-line" x1=${y} x2=${b} y1=${n} y2=${n} />
            <text class="room" x=${u ? m + 14 : m - 14} y=${n - z * 13} text-anchor=${u ? "start" : "end"}>${c("bld.outside")}</text>` : v}
      <rect class="ground" x=${w} y=${i} width=${_ - w} height=${d - i} />
      <line class="floor-line" x1=${w} x2=${_} y1=${i} y2=${i} />
      ${h ? k`<rect class="wall" x=${m - 7} y=${p} width="14" height=${i + z - p} />` : v}
      ${r !== void 0 ? k`<rect class="slab" x=${w} y=${r} width=${_ - w} height="10" />
            <text class="room" x=${u ? m - 14 : m + 14} y=${r - 8} text-anchor=${u ? "end" : "start"}>${c("bld.living")}</text>
            <text class="room" x=${u ? m - 14 : m + 14} y=${r + z * 3.6} text-anchor=${u ? "end" : "start"}>${c(n < i ? "bld.basement" : "bld.plant_room")}</text>` : v}
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
    const t = { ...ie[e.type], ...Be(e) }, s = e.rot || 0;
    let i = `translate(${e.x * z} ${e.y * z})`;
    return e.flip && t.mirrorable && (i += ` translate(${t.w * z} 0) scale(-1 1)`), !t.rotatable || s === 0 ? i : s === 90 ? `${i} translate(${t.h * z} 0) rotate(90)` : s === 180 ? `${i} translate(${t.w * z} ${t.h * z}) rotate(180)` : `${i} translate(0 ${t.w * z}) rotate(270)`;
  }
  _component(e, t) {
    const s = { ...ie[e.type], ...Be(e), ports: De(e), badges: ui(e) }, { w: i, h: n } = fe(e), r = (e.type === "value_tile" ? i : s.w) * z, a = (e.type === "value_tile" ? n : s.h) * z, l = ($) => {
      const A = this.src.get(e, $);
      return A?.available && A.num !== null ? A.num : void 0;
    }, p = ($) => {
      const A = this.src.get(e, $);
      return A?.available ? String(A.raw) : void 0;
    }, d = e.icon || this.plant.settings.typeIcons?.[e.type], h = d ? this.icons.get(d) : void 0, m = this.selected?.kind === "c" && this.selected.id === e.id;
    let u;
    e.type === "value_tile" ? u = this._tile(e, r, a) : e.type === "label" ? u = k`<text class="free-label" x="0" y=${z} style="font-size:${e.props.size || 18}px">${e.props.text || e.label}</text>` : h ? u = k`${t.has("running") ? k`<rect class="user-glow pulse" x="-4" y="-4" width=${r + 8} height=${a + 8} rx="10" />` : v}
        <image href=${h.data_url} x="0" y="0" width=${r} height=${a} preserveAspectRatio="xMidYMid meet" />` : u = Uo({ c: e, w: r, h: a, flags: t, num: l, text: p });
    const w = !["junction", "label", "value_tile"].includes(e.type), _ = s.ports.some(($) => {
      const A = ge(e, $.id);
      return A?.dir === "b" && Math.abs(A.x - (e.x + i / 2)) < Math.max(0.6, i * 0.35);
    });
    let y = (e.x + i / 2) * z, b = (e.y + n) * z + (s.badges === "above" ? 16 : 18), x = "middle";
    if (_) {
      const $ = Math.min(28, e.label.length) * 7.5;
      b = (e.y + n) * z + 4;
      const A = (e.x + i) * z + 6, L = e.x * z - 6, W = this._hitsPipe(A, b - 12, A + $, b + 3), G = this._hitsPipe(L - $, b - 12, L, b + 3);
      W && !G ? (y = L, x = "end") : (y = A, x = "start");
    }
    return k`
      <g class="comp ${m ? "selected" : ""}" data-id=${e.id}
         @pointerdown=${($) => this._onCompDown($, e)}>
        <g class=${e.flip && ie[e.type].mirrorable ? "flipped" : ""} transform=${this._transform(e)}>
          ${u}
        </g>
        <rect class="comp-hit" x=${e.x * z - (e.type === "junction" ? 8 : 0)} y=${e.y * z - (e.type === "junction" ? 8 : 0)}
          width=${Math.max(16, i * z)} height=${Math.max(16, n * z)} rx="8" />
        ${m ? k`<rect class="sel-outline" x=${e.x * z - 6} y=${e.y * z - 6} width=${i * z + 12} height=${n * z + 12} rx="10" />` : v}
        ${w ? k`<text class="comp-label" x=${y} y=${b} text-anchor=${x}>${rs(e.label, 28)}</text>` : v}
      </g>
      ${this._badgeLayout(e).map(($) => $.w ? this._pill(e, $.slot, $.x, $.y, $.w) : this._chip(e, $.slot, $.x, $.y))}
    `;
  }
  _chip(e, t, s, i) {
    const n = this.src.get(e, t), r = nt(e, t), { text: a, unit: l } = Oe(n, r), p = e.type === "value_tile" ? t : Ee(e.type, t), h = r === "temp" && n?.num !== null && n?.available ? de(n.num, "#8b949e") : "var(--cp-accent)";
    return k`
      <g class="chip ${n?.available === !1 ? "na" : ""}" @click=${(m) => this._slotClick(m, e, t)}>
        <rect x=${s} y=${i} width=${be} height=${we} rx="8" />
        <rect class="chip-accent" x=${s} y=${i + 7} width="3" height=${we - 14} rx="1.5" style="fill:${h}" />
        <text class="chip-label" x=${s + 10} y=${i + 13}>${rs(p)}</text>
        <text class="chip-value" x=${s + 10} y=${i + 28}>${a}<tspan class="chip-unit" dx="2">${l}</tspan></text>
      </g>`;
  }
  /**
   * Values anchored to a pipe ("at") sit on that pipe; values with a measuring point ("pos")
   * sit at that point. Positions avoid overlapping each other.
   */
  _placePills(e, t) {
    const s = [], i = [...e.values()].filter((r) => !["junction", "label"].includes(r.type)).map((r) => {
      const { w: a, h: l } = fe(r);
      return { x: r.x * z - 4, y: r.y * z - 4, w: a * z + 8, h: l * z + 26 };
    }), n = (r, a, l, p = !0) => s.every((d) => r + l + 4 <= d.x || r >= d.x + d.w + 4 || a + ke + 3 <= d.y || a >= d.y + ke + 3) && (!p || i.every((d) => r + l <= d.x || r >= d.x + d.w || a + ke <= d.y || a >= d.y + d.h));
    for (const r of e.values()) {
      const a = new Set(this._shownSlots(r));
      for (const l of mi(r)) {
        if (!a.has(l.key) || !l.at && !l.pos) continue;
        const p = this._pillWidth(r, l.key);
        if (l.pos) {
          s.push({ c: r, slot: l.key, x: (r.x + l.pos[0]) * z - p / 2, y: (r.y + l.pos[1]) * z - ke / 2, w: p });
          continue;
        }
        let d = null, h = { c: r.id, p: l.at };
        const m = /* @__PURE__ */ new Set();
        for (let u = 0; u < 4 && h && !d; u++) {
          const w = h, _ = t.find(
            ({ pipe: A }) => !m.has(A.id) && (A.from.c === w.c && A.from.p === w.p || A.to.c === w.c && A.to.p === w.p)
          );
          if (h = null, !_?.route) break;
          m.add(_.pipe.id);
          const y = _.pipe.from.c === w.c && _.pipe.from.p === w.p, b = y ? _.route.pts : [..._.route.pts].reverse();
          for (let A = 1; A < b.length && !d; A++) {
            const L = b[A - 1], W = b[A], G = Math.abs(L.x - W.x) + Math.abs(L.y - W.y);
            if (!(G < 1 || L.x === W.x && G < 3))
              for (const U of [0.5, 0.35, 0.65, 0.2, 0.8]) {
                const ce = (L.x + (W.x - L.x) * U) * z, oe = (L.y + (W.y - L.y) * U) * z;
                if (L.y === W.y && G * z < p + 8) break;
                const j = ce - p / 2, te = oe - ke / 2;
                if (n(j, te, p)) {
                  d = { x: j, y: te };
                  break;
                }
              }
          }
          const x = y ? _.pipe.to : _.pipe.from, $ = e.get(x.c);
          if (!d && $ && ie[$.type].passive && $.type !== "pump") {
            const A = De($).find((L) => L.id !== x.p && t.some(({ pipe: W }) => !m.has(W.id) && (W.from.c === $.id && W.from.p === L.id || W.to.c === $.id && W.to.p === L.id)));
            A && (h = { c: $.id, p: A.id });
          }
        }
        if (!d) {
          const u = ge(r, l.at);
          if (!u) continue;
          d = { x: u.x * z + 6, y: u.y * z + 6 };
        }
        s.push({ c: r, slot: l.key, ...d, w: p });
      }
    }
    return s;
  }
  _pillWidth(e, t) {
    const { text: s, unit: i } = Oe(this.src.get(e, t), nt(e, t));
    return Math.round((hi(e.type, t).length + s.length + i.length) * 6.4 + 22);
  }
  _anchorPill(e) {
    const t = this.src.get(e.c, e.slot), s = nt(e.c, e.slot), { text: i, unit: n } = Oe(t, s), r = s === "temp" && t?.available && t.num !== null ? de(t.num, "#8b949e") : "var(--cp-accent)";
    return k`
      <g class="apill" @click=${(a) => this._slotClick(a, e.c, e.slot)}>
        <title>${Ee(e.c.type, e.slot)}</title>
        <rect x=${e.x} y=${e.y} width=${e.w} height=${ke} rx=${ke / 2} style="stroke:${r}" />
        <text x=${e.x + 8} y=${e.y + 13}><tspan class="apill-label">${hi(e.c.type, e.slot)}</tspan> ${i}<tspan class="chip-unit" dx="1">${n}</tspan></text>
      </g>`;
  }
  /** Compact value-only pill drawn inside a tank at the sensor height. */
  _pill(e, t, s, i, n) {
    const r = this.src.get(e, t), { text: a, unit: l } = Oe(r, nt(e, t));
    return k`
      <g class="pill" @click=${(p) => this._slotClick(p, e, t)}>
        <title>${Ee(e.type, t)}</title>
        <rect x=${s} y=${i} width=${n} height="22" rx="11" />
        <text x=${s + n / 2} y=${i + 15.5} text-anchor="middle">${a}<tspan class="chip-unit" dx="1">${l}</tspan></text>
      </g>`;
  }
  _tile(e, t, s) {
    const i = e.props.entries || [];
    return k`
      <rect class="tile" x="0" y="0" width=${t} height=${s} rx="12" />
      <text class="tile-title" x="14" y="22">${e.label}</text>
      ${i.map((n, r) => {
      const a = this.src.get(e, n.slot), { text: l, unit: p } = Oe(a, n.kind || "text"), d = 46 + r * 26;
      return k`<g class="tile-row" @click=${(h) => this._slotClick(h, e, n.slot)}>
          <text class="tile-label" x="14" y=${d}>${rs(n.label || n.slot, 22)}</text>
          <text class="tile-value" x=${t - 14} y=${d} text-anchor="end">${l} <tspan class="chip-unit">${p}</tspan></text></g>`;
    })}`;
  }
  _editOverlays(e, t) {
    const s = [];
    for (const n of e.values())
      for (const r of De(n)) {
        const a = ge(n, r.id);
        if (!a) continue;
        const l = this._connect?.c === n.id && this._connect.p === r.id, p = n.type === "junction" ? { l: -7, r: 7, t: 0, b: 0 }[a.dir] ?? 0 : 0, d = n.type === "junction" ? { t: -7, b: 7, l: 0, r: 0 }[a.dir] ?? 0 : 0;
        s.push(k`<circle class="port ${l ? "src" : ""} ${this._connect ? "target" : ""}" cx=${a.x * z + p} cy=${a.y * z + d} r=${n.type === "junction" ? 4 : 6}
          @pointerdown=${(h) => this._onPortDown(h, { c: n.id, p: r.id })}><title>${r.id}</title></circle>`);
      }
    const i = [];
    if (this.selected?.kind === "p") {
      const n = this.selected.id, r = t.find((a) => a.pipe.id === n)?.route;
      if (r) {
        const a = r.pts.length;
        for (let l = 0; l < a - 1; l++) {
          const p = r.pts[l], d = r.pts[l + 1], h = Math.abs(p.x - d.x) + Math.abs(p.y - d.y);
          if ((l === 0 || l === a - 2) && h <= 1 && a > 2) continue;
          const m = p.x === d.x;
          i.push(k`<rect class="bend-handle ${m ? "ew" : "ns"}" x=${(p.x + d.x) / 2 * z - 7} y=${(p.y + d.y) / 2 * z - 7} width="14" height="14" rx="4"
            @pointerdown=${(u) => this._onSegmentDown(u, n, r.pts, l)} />`);
        }
      }
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
  /**
   * Object snap: align a dragged part with the ports and edges of the other parts (within ¾ cell, so a part can still be nudged by one cell).
   * Ports first – aligned ports give straight pipes. Returns snapped positions and guide coordinates.
   */
  _objectSnap(e, t, s) {
    const { w: n, h: r } = fe(e), a = De(e).map((u) => ge({ ...e, x: 0, y: 0 }, u.id)).filter((u) => !!u), l = [], p = [];
    for (const u of this.plant.components) {
      if (u.id === e.id || u.type === "label") continue;
      for (const _ of De(u)) {
        const y = ge(u, _.id);
        if (y)
          for (const b of a)
            l.push({ v: y.x, off: b.x }), p.push({ v: y.y, off: b.y });
      }
      const w = fe(u);
      l.push({ v: u.x, off: 0 }, { v: u.x + w.w, off: n }, { v: u.x + w.w / 2, off: n / 2 }), p.push({ v: u.y, off: 0 }, { v: u.y + w.h, off: r }, { v: u.y + w.h / 2, off: r / 2 });
    }
    const d = (u, w) => {
      let _ = null;
      for (const y of u) {
        const b = y.v - y.off;
        if (!Number.isInteger(b)) continue;
        const x = Math.abs(b - w);
        x <= 0.75 && (!_ || x < _.d) && (_ = { pos: b, guide: y.v, d: x });
      }
      return _;
    }, h = d(l, t), m = d(p, s);
    return !h && !m ? null : { x: h?.pos, y: m?.pos, gx: h?.guide, gy: m?.guide };
  }
  _onSegmentDown(e, t, s, i) {
    e.stopPropagation(), this._gesture = { type: "segment", id: t, pts: s.map((n) => ({ ...n })), index: i, moved: !1, start: this._svgPoint(e) }, this._capture(e);
  }
  /** Move segment `index` of a route perpendicular by `delta` cells; returns the new waypoints. */
  _shiftSegment(e, t, s) {
    const i = e.map((h) => ({ ...h })), n = i[t].x === i[t + 1].x, r = (h) => n ? h.x += s : h.y += s, a = (h, m) => ({ x: h.x + Math.sign(m.x - h.x), y: h.y + Math.sign(m.y - h.y) });
    let l = t, p = t + 1;
    if (l === 0) {
      const h = a(i[0], i[1]);
      i.splice(1, 0, h, { ...h }), l = 2, p = 3;
    } else l === 1 && (i.splice(2, 0, { ...i[1] }), l = 2, p = 3);
    const d = i.length - 1;
    if (p === d) {
      const h = a(i[d], i[d - 1]);
      i.splice(d, 0, { ...h }, h);
    } else p === d - 1 && i.splice(p, 0, { ...i[p] });
    return r(i[l]), r(i[p]), i.slice(2, -2).map((h) => [h.x, h.y]);
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
        const [s, i] = [...this._pointers.values()], n = t.dist / Math.max(10, Math.hypot(s.x - i.x, s.y - i.y)), r = t.view, a = r.x + r.w / 2, l = r.y + r.h / 2;
        this._view = { x: a - r.w * n / 2, y: l - r.h * n / 2, w: r.w * n, h: r.h * n };
        return;
      }
      if (t.type === "pan") {
        const i = this.renderRoot.querySelector("svg").getBoundingClientRect(), n = Math.max(t.view.w / i.width, t.view.h / i.height), r = (e.clientX - t.cx) * n, a = (e.clientY - t.cy) * n;
        !t.moved && Math.abs(e.clientX - t.cx) + Math.abs(e.clientY - t.cy) > 4 && (t.moved = !0, this._capture(e)), t.moved && (this._view = { ...t.view, x: t.view.x - r, y: t.view.y - a });
        return;
      }
      if (t.type === "move") {
        const s = this._svgPoint(e);
        if (Math.abs(e.clientX - t.cx) + Math.abs(e.clientY - t.cy) > 3 && (t.moved = !0), !t.moved) return;
        const n = !this.snapGrid || e.altKey ? 1 : Math.max(1, this.gridStep);
        let r = Math.max(0, Math.round((t.ox + (s.x - t.start.x) / z) / n) * n), a = Math.max(0, Math.round((t.oy + (s.y - t.start.y) / z) / n) * n);
        const l = this.snapObjects && !e.altKey ? this._objectSnap(t.comp, t.ox + (s.x - t.start.x) / z, t.oy + (s.y - t.start.y) / z) : null;
        l?.x !== void 0 && (r = l.x), l?.y !== void 0 && (a = l.y), this._guides = { x: l?.gx, y: l?.gy }, this._drag = { id: t.id, dx: Math.max(0, r), dy: Math.max(0, a) };
        return;
      }
      if (t.type === "tap") {
        Math.abs(e.clientX - t.cx) + Math.abs(e.clientY - t.cy) > 6 && (this._gesture = { type: "pan", cx: t.cx, cy: t.cy, view: t.view, moved: !0 }, this._capture(e), this._onMove(e));
        return;
      }
      if (t.type === "segment") {
        const s = this._svgPoint(e), i = t.pts[t.index], n = i.x === t.pts[t.index + 1].x, r = (n ? s.x - t.start.x : s.y - t.start.y) / z, a = this.snapGrid && !e.altKey ? Math.max(1, this.gridStep) : 1, p = Math.round(((n ? i.x : i.y) + r) / a) * a - (n ? i.x : i.y);
        if (p === t.delta) return;
        t.delta = p, t.moved = !0, this._emit("cp-segment", { id: t.id, via: this._shiftSegment(t.pts, t.index, p), live: !0 });
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
    this._pointers.size > 0 && t?.type === "pinch" || (this._gesture = null, this._lastMoved = !!t?.moved, setTimeout(() => this._lastMoved = !1, 0), t && (t.type === "move" ? (this._guides = {}, t.moved && this._drag ? this._emit("cp-move", { id: t.id, x: this._drag.dx, y: this._drag.dy }) : this._emit("cp-select", { kind: "c", id: t.id }), this._drag = null) : t.type === "tap" && !t.moved ? this._emit("cp-component-click", { component: t.comp, x: e.clientX, y: e.clientY }) : t.type === "bend" && t.moved ? this._emit("cp-bend", { id: t.id, live: !1 }) : t.type === "segment" && t.moved && this._emit("cp-segment", { id: t.id, live: !1 })));
  }
  _onWheel(e) {
    e.preventDefault();
    const t = this._view || this._contentBox(), s = this._svgPoint(e), i = Math.exp(e.deltaY * 15e-4);
    this._view = { x: s.x - (s.x - t.x) * i, y: s.y - (s.y - t.y) * i, w: t.w * i, h: t.h * i };
  }
};
Pt.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  icons: { attribute: !1 },
  edit: { type: Boolean },
  autoHeight: { type: Boolean, attribute: "auto-height" },
  selected: { attribute: !1 },
  version: { type: Number },
  _view: { state: !0 },
  _drag: { state: !0 },
  _connect: { state: !0 },
  _guides: { state: !0 },
  gridStep: { type: Number },
  showGrid: { type: Boolean },
  snapGrid: { type: Boolean },
  snapObjects: { type: Boolean }
}, Pt.styles = ae`
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
    /* offset = one dash period (4 + 6), at the same speed as the pipes (15 px/s) */
    .tank-coil.hot { stroke: #fff; stroke-dasharray: 4 6; animation: cp-coil 0.667s linear infinite; }
    @keyframes cp-coil { to { stroke-dashoffset: -10; } }
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
    .shower-jet { stroke: #6cc4ff; stroke-width: 1.6; stroke-linecap: round; stroke-dasharray: 3 5; animation: cp-jet 0.53s linear infinite; opacity: 0.85; }
    @keyframes cp-jet { to { stroke-dashoffset: -16; } }
    .shower-hole { fill: var(--cp-muted); }
    /* mirrored parts keep their texts readable */
    .flipped text { transform-box: fill-box; transform-origin: center; transform: scaleX(-1); }
    .rad-stub { stroke: var(--cp-casing-stroke); stroke-width: 4; stroke-linecap: round; }
    .building { pointer-events: none; }
    .building .outside { fill: var(--cp-bld-outside); }
    .building .ground { fill: var(--cp-bld-ground); }
    .building .floor-line { stroke: var(--cp-bld-line); stroke-width: 3; }
    .building .wall, .building .slab { fill: var(--cp-bld-wall); stroke: var(--cp-bld-line); stroke-width: 1; }
    .building .room { fill: var(--cp-muted); font-size: 12px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase; opacity: 0.7; }
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
    .grid-line { fill: none; stroke: var(--cp-grid); stroke-width: 1; }
    .grid-line.major { stroke-width: 1.6; opacity: 1.6; }
    .guides line { stroke: var(--cp-accent); stroke-width: 1.5; stroke-dasharray: 6 4; pointer-events: none; }
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
let bs = Pt;
customElements.get("cp-schematic") || customElements.define("cp-schematic", bs);
const Ct = class Ct extends ne {
  constructor() {
    super(...arguments), this.points = [], this.color = "var(--cp-accent)", this.step = !1;
  }
  render() {
    const e = this.points.filter((u) => u.v !== null);
    if (e.length < 2) return g`<div class="empty">${c("ov.no_history")}</div>`;
    const t = 300, s = 90, i = e[0].t, n = e[e.length - 1].t;
    let r = Math.min(...e.map((u) => u.v)), a = Math.max(...e.map((u) => u.v));
    a - r < 1e-6 && (a += 1, r -= 1);
    const l = (a - r) * 0.1;
    r -= l, a += l;
    const p = (u) => (u - i) / Math.max(1, n - i) * t, d = (u) => s - (u - r) / (a - r) * s;
    let h = `M ${p(e[0].t)} ${d(e[0].v)}`;
    for (let u = 1; u < e.length; u++)
      this.step ? h += ` H ${p(e[u].t)} V ${d(e[u].v)}` : h += ` L ${p(e[u].t)} ${d(e[u].v)}`;
    const m = `${h} L ${t} ${s} L 0 ${s} Z`;
    return g`<svg viewBox="0 0 ${t} ${s}" preserveAspectRatio="none">
      <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color=${this.color} stop-opacity="0.35" /><stop offset="1" stop-color=${this.color} stop-opacity="0" />
      </linearGradient></defs>
      ${k`<path d=${m} fill="url(#sg)" /><path d=${h} fill="none" stroke=${this.color} stroke-width="2" vector-effect="non-scaling-stroke" />`}
    </svg>`;
  }
};
Ct.properties = { points: { attribute: !1 }, color: {}, step: { type: Boolean } }, Ct.styles = ae`
    :host { display: block; height: 90px; }
    svg { width: 100%; height: 100%; display: block; overflow: visible; }
    .empty { height: 100%; display: grid; place-items: center; color: var(--cp-muted); font-size: 12px; }
  `;
let vs = Ct;
const Tt = class Tt extends ne {
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
    const e = this.component, t = e.bindings?.[this.slotKey], s = sn(t);
    if (!t || !s || !(e.writable || []).includes(this.slotKey)) return v;
    if (this.demo) return g`<div class="w muted small">${c("wr.demo")}</div>`;
    if (!this.canWrite) return g`<div class="w muted small">${c("wr.no_permission")}</div>`;
    const i = this.hass?.states[t], n = i?.attributes || {}, r = i?.state, a = this._draft ?? (s === "number" ? Number(r) : s === "switch" ? r === "on" : r ?? null), l = (m) => typeof m == "boolean" ? c(m ? "wr.on" : "wr.off") : s === "number" ? `${F(Number(m), 1)} ${n.unit_of_measurement || ""}` : String(m), p = s === "button" || String(a) !== String(s === "switch" ? r === "on" : s === "number" ? Number(r) : r), d = async () => {
      this._busy = !0;
      try {
        await this.writer(e.id, this.slotKey, s === "button" ? null : a), this._wmsg = c("wr.done"), this._draft = null;
      } catch (m) {
        this._wmsg = `${c("wr.failed")}: ${m?.message || m}`;
      } finally {
        this._busy = !1, this._confirm = !1;
      }
    };
    let h;
    if (s === "number") {
      const m = Number(n.min ?? 0), u = Number(n.max ?? 100), w = Number(n.step ?? 1);
      h = g`<div class="wrow">
        <input type="range" min=${m} max=${u} step=${w} .value=${String(a)} @input=${(_) => this._draft = Number(_.target.value)} />
        <input class="wnum" type="number" min=${m} max=${u} step=${w} .value=${String(a)} @change=${(_) => this._draft = Number(_.target.value)} />
        <span class="muted">${n.unit_of_measurement || ""}</span></div>`;
    } else s === "select" ? h = g`<select @change=${(m) => this._draft = m.target.value}>
        ${(n.options || []).map((m) => g`<option value=${m} ?selected=${m === a}>${m}</option>`)}</select>` : s === "switch" ? h = g`<label class="wsw"><input type="checkbox" .checked=${!!a} @change=${(m) => this._draft = m.target.checked} /> ${c(a ? "wr.on" : "wr.off")}</label>` : h = v;
    return g`<div class="w">
      <div class="cap">${c("wr.title")}</div>
      ${h}
      ${this._confirm ? g`<div class="wconfirm">
            <div>${s === "button" ? c("wr.press_confirm") : c("wr.confirm", { old: l(s === "switch" ? r === "on" : r), new: l(a) })}</div>
            <div class="row"><button @click=${() => this._confirm = !1}>${c("cancel")}</button><span class="spacer"></span>
              <button class="primary" ?disabled=${this._busy} @click=${d}>${V("check")} ${c("wr.apply")}</button></div>
          </div>` : g`<div class="row"><span class="spacer"></span>
            <button class="primary" ?disabled=${!p} @click=${() => this._confirm = !0}>${c(s === "button" ? "wr.press" : "wr.change")}</button></div>`}
      ${this._wmsg ? g`<div class="muted small">${this._wmsg}</div>` : v}
    </div>`;
  }
  render() {
    if (!this.component) return v;
    const e = this.component, t = nt(e, this.slotKey), s = this.src.get(e, this.slotKey), { text: i, unit: n } = Oe(s, t), r = this.src.entityOf(e, this.slotKey), a = this._hist || [], l = a.map((w) => w.v).filter((w) => w !== null), p = t === "temp" && s?.num !== null && s?.num !== void 0 ? de(s.num, "#3ddc97") : "var(--cp-accent)", d = 320, h = Math.max(12, Math.min(window.innerWidth - d - 12, this.x - d / 2)), m = Math.max(12, Math.min(window.innerHeight - 260, this.y + 14)), u = e.type === "value_tile" ? this.slotKey : Ee(e.type, this.slotKey);
    return g`
      <div class="backdrop" @pointerdown=${this._close}></div>
      <div class="pop card" style="left:${h}px; top:${m}px; width:${d}px">
        <div class="row head">
          <div>
            <div class="title">${u}</div>
            <div class="muted sub">${e.label}</div>
          </div>
          <span class="spacer"></span>
          <button class="ghost icon" @click=${this._close} aria-label=${c("close")}>${V("close")}</button>
        </div>
        <div class="now"><span class="val">${i}</span><span class="unit">${n}</span></div>
        <div class="muted cap">${c("ov.history24")}</div>
        ${this._hist === null ? g`<div class="loading"></div>` : g`<cp-sparkline .points=${a} .color=${p} .step=${t === "bool"}></cp-sparkline>`}
        ${l.length && t !== "bool" && t !== "enum" ? g`<div class="row stats">
              <span>${c("ov.min")} <b>${F(Math.min(...l))}</b></span>
              <span>${c("ov.max")} <b>${F(Math.max(...l))}</b></span>
            </div>` : v}
        ${this._writer()}
        ${r ? g`<div class="row foot"><code>${r}</code><span class="spacer"></span>
              <button @click=${() => this._more(r)}>${c("ov.open_entity")}</button></div>` : v}
      </div>
    `;
  }
};
Tt.properties = {
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
}, Tt.styles = [
  he,
  ae`
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
let ys = Tt;
const Jo = { info: "info", notice: "notice", warning: "warn", error: "error" };
function Xo(o) {
  const e = { ...o.params };
  return e.label_sfx = e.label ? ` (${e.label})` : "", o.key === "value_changed" && (e.slot_label = e.type ? Ee(e.type, e.slot) : e.slot), o.key === "maintenance_due" && (e.task = e.task_key ? c(`mt.${e.task_key}`) : e.title), c(`msgk.${o.key}`, e);
}
const Lt = class Lt extends ne {
  constructor() {
    super(...arguments), this.messages = [], this.compact = !1, this.canClear = !1, this._filter = "all";
  }
  _row(e) {
    const t = e.end_ts ? e.end_ts - e.ts : null;
    return g`<li class="msg ${e.level} ${e.active ? "active" : ""}">
      <span class="lv">${V(Jo[e.level] || "info")}</span>
      <div class="body">
        <div class="text">${Xo(e)}</div>
        <div class="meta">
          ${Rn(e.ts)}
          ${e.active ? g` · <b>${c("msg.active")}</b>` : t !== null ? g` · ${c("msg.duration", { duration: Nn(t) })}` : v}
        </div>
      </div>
    </li>`;
  }
  render() {
    const e = [...this.messages].sort((n, r) => r.ts - n.ts), t = this._filter === "all" ? e : e.filter((n) => n.level === this._filter), s = t.filter((n) => n.active), i = t.filter((n) => !n.active).slice(0, this.compact ? 12 : 300);
    return g`
      ${this.compact ? v : g`<div class="row filters">
            ${["all", "error", "warning", "notice", "info"].map(
      (n) => g`<button class=${this._filter === n ? "primary" : ""} @click=${() => this._filter = n}>
                ${c(n === "all" ? "msg.filter_all" : `msg.level.${n}`)}</button>`
    )}
            <span class="spacer"></span>
            ${this.canClear ? g`<button @click=${() => this.dispatchEvent(new CustomEvent("clear"))}>${V("trash")} ${c("msg.clear")}</button>` : v}
          </div>`}
      ${s.length ? g`<h4>${c("msg.active")}</h4><ul>${s.map((n) => this._row(n))}</ul>` : v}
      <h4>${c("msg.history")}</h4>
      ${i.length ? g`<ul>${i.map((n) => this._row(n))}</ul>` : g`<div class="empty muted">${c("msg.empty")}</div>`}
    `;
  }
};
Lt.properties = {
  messages: { attribute: !1 },
  compact: { type: Boolean },
  canClear: { type: Boolean },
  _filter: { state: !0 }
}, Lt.styles = [
  he,
  ae`
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
let xs = Lt;
customElements.get("cp-sparkline") || customElements.define("cp-sparkline", vs);
customElements.get("cp-slot-popover") || customElements.define("cp-slot-popover", ys);
customElements.get("cp-messages") || customElements.define("cp-messages", xs);
const Qo = [1, 10, 60, 300, 900], Ti = "copilot.explain", Li = "copilot.energy", er = {
  heat: "#ff8a3d",
  dhw: "#ff4f8b",
  cold: "#6cc4ff",
  warn: "var(--cp-warn)",
  error: "var(--cp-error)",
  eco: "#3ddc97",
  info: "var(--cp-muted)"
};
function Di(o) {
  try {
    return localStorage.getItem(o);
  } catch {
    return null;
  }
}
function Oi(o, e) {
  try {
    localStorage.setItem(o, e);
  } catch {
  }
}
const Dt = class Dt extends ne {
  constructor() {
    super(...arguments), this.admin = !0, this.icons = /* @__PURE__ */ new Map(), this.messages = [], this.sim = null, this.version = 0, this.narrow = !1, this.showDemo = !0, this.showKpis = !0, this.showSide = !0, this._pop = null, this._side = !0, this._explain = Di(Ti) === "1", this._energy = Di(Li) !== "0", this._comp = null, this._tm = null, this._tmBusy = !1, this._tick = 0, this._raf = 0, this._last = 0, this._drawn = 0;
  }
  _toggleExplain() {
    this._explain = !this._explain, Oi(Ti, this._explain ? "1" : "0");
  }
  /** values shown right now: live, or the recorded state at the replay time */
  get _src() {
    return this._tm?.src ?? this.src;
  }
  async _openTm(e = 24) {
    if (!this._tmBusy) {
      this._tmBusy = !0;
      try {
        const t = this.sim ? Math.min(e, 24) : e, s = await Ks.load(this.plant, this.src, t, this.hass);
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
    const s = 240, i = e.start, n = Math.max(1, e.to - i), r = e.t, a = [];
    for (let l = 0; l < s; l++) {
      e.t = i + n * (l + 0.5) / s;
      const p = xe(t, e), d = Je(e.get(t, "activity")), h = p.has("defrost") ? "defrost" : d === "hot_water" ? "hot_water" : p.has("running") ? d && d !== "off" ? d : "heating" : "off", m = a[a.length - 1];
      m && m.mode === h ? m.w += 1 / s : a.push({ x: l / s, w: 1 / s, mode: h });
    }
    return e.t = r, a;
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
    const t = e.src, s = t.start, n = new Date(t.t * 1e3).toLocaleString(void 0, { weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }), r = { heating: "#ff8a3d", hot_water: "#ff4f8b", defrost: "#6cc4ff", compressor_alarm: "#ff5a5f", off: "transparent" };
    return g`<div class="tm">
      <button class="icon" title=${e.playing ? c("tm.pause") : c("tm.play")} @click=${this._play}>${V(e.playing ? "pause" : "play")}</button>
      <div class="tm-track">
        <input type="range" min=${s} max=${t.to} step="60" .value=${String(t.t)}
          @input=${(a) => this._seek(Number(a.target.value))} aria-label=${c("tm.title")} />
        <svg class="strip" viewBox="0 0 1 1" preserveAspectRatio="none">
          ${e.strip.map((a) => k`<rect x=${a.x} y="0" width=${a.w + 1e-3} height="1" fill=${r[a.mode] ?? "#8b949e"} />`)}
        </svg>
      </div>
      <span class="tm-time">${n}</span>
      <select title=${c("tm.speed")} @change=${(a) => this._tm = { ...e, speed: Number(a.target.value) }}>
        ${[300, 900, 1800, 3600].map((a) => g`<option value=${a} ?selected=${e.speed === a}>${c("tm.speed_v", { min: a / 60 })}</option>`)}
      </select>
      ${this.sim ? v : g`<select title=${c("tm.range")} @change=${(a) => this._openTm(Number(a.target.value))}>
            ${[6, 24, 72].map((a) => g`<option value=${a} ?selected=${e.hours === a}>${c("tm.hours", { h: a })}</option>`)}
          </select>`}
      <button class="live" @click=${this._closeTm}>${c("tm.live")}</button>
    </div>`;
  }
  _toggleEnergy() {
    this._energy = !this._energy, Oi(Li, this._energy ? "1" : "0");
  }
  _onComponent(e) {
    this._explain && (this._comp = e.detail);
  }
  _explainPanel() {
    const e = yo(this.plant, this._src);
    return g`<div class="side-head"><b>${c("ex.title")}</b></div>
      ${e.length ? g`<ul class="explain">
            ${e.map(
      (t) => g`<li style="--tone:${er[t.tone]}">
                <span class="dot"></span>
                <div>
                  <div>${c(t.key, t.params)}</div>
                  ${t.hint ? g`<div class="ex-hint">${c(t.hint, t.params)}</div>` : v}
                </div>
              </li>`
    )}
          </ul>` : g`<p class="muted">${c("ex.empty")}</p>`}
      <p class="ex-tip">${V("info")} ${c("ex.tap_hint")}</p>`;
  }
  _compPop() {
    const e = this._comp;
    if (!e) return v;
    const t = xo(e.component, this._src), s = 300, i = Math.max(12, Math.min(window.innerWidth - s - 12, e.x - s / 2)), n = Math.max(12, Math.min(window.innerHeight - 200, e.y + 14));
    return g`<div class="backdrop" @pointerdown=${() => this._comp = null}></div>
      <div class="cpop card" style="left:${i}px; top:${n}px; width:${s}px">
        <div class="row cpop-head">
          <div>
            <div class="cpop-title">${e.component.label || c(`type.${e.component.type}`)}</div>
            <div class="muted cpop-sub">${c(`type.${e.component.type}`)}</div>
          </div>
          <span class="spacer"></span>
          <button class="ghost icon" @click=${() => this._comp = null} aria-label=${c("close")}>${V("close")}</button>
        </div>
        ${t.role ? g`<p>${c(t.role, t.params)}</p>` : v}
        ${t.state ? g`<p class="cpop-state">${c(t.state, t.params)}</p>` : v}
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
    const e = this._first("outdoor_unit"), t = this._first("indoor_unit"), s = this._first("dhw_tank"), i = this.plant.components.find((_) => _.type === "radiators" || _.type === "floor_heating"), n = this.plant.components.find((_) => _.type === "valve_3way" && _.props.role === "dhw_switch");
    let r = e ? Je(this._src.get(e, "activity")) : void 0;
    if (!r && e) {
      const _ = xe(e, this._src), y = n ? xe(n, this._src) : /* @__PURE__ */ new Set();
      r = _.has("running") ? y.has("b") ? "hot_water" : "heating" : "off";
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
    const h = l !== void 0 && p !== void 0 && p > 50 && l > 0.2 ? l / (p / 1e3) : void 0, m = (_, y = 1) => _ === void 0 ? "–" : F(_, y), u = cn(this.plant, this._src), w = [
      { key: "mode", label: c("kpi.mode"), value: r ? c(`mode.${r}`) : "–", unit: "", color: a[r || "off"] },
      { key: "out", label: c("kpi.outdoor"), value: m(this._num(e, "outdoor_temp")), unit: "°C", comp: e, slot: "outdoor_temp" },
      { key: "heat", label: c("kpi.heat"), value: m(l), unit: "kW", comp: e, slot: "heat_power" },
      { key: "power", label: c("kpi.power"), value: p === void 0 ? "–" : p >= 1e3 ? F(p / 1e3, 2) : F(p, 0), unit: p !== void 0 && p >= 1e3 ? "kW" : "W", comp: e, slot: "el_power" },
      {
        key: "cop",
        label: c("kpi.cop"),
        value: m(h),
        unit: "",
        color: u ? Ae[u.ampel] : void 0,
        sub: u ? `${c("kpi.target")} ${m(u.expected)}` : void 0
      },
      {
        key: "supply",
        label: c("kpi.supply"),
        value: m(this._num(t, "supply_temp")),
        unit: "°C",
        color: de(this._num(t, "supply_temp"), ""),
        sub: this._num(t, "target_flow_temp") !== void 0 ? `${c("kpi.target")} ${m(this._num(t, "target_flow_temp"))}` : void 0,
        comp: t,
        slot: "supply_temp"
      }
    ];
    return s && w.push({ key: "dhw", label: c("kpi.dhw"), value: m(this._num(s, "temp_top")), unit: "°C", color: de(this._num(s, "temp_top"), ""), comp: s, slot: "temp_top" }), i && this._num(i, "room_temp") !== void 0 && w.push({ key: "room", label: c("kpi.room"), value: m(this._num(i, "room_temp")), unit: "°C", comp: i, slot: "room_temp" }), w;
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
    return g`<div class="demo">
      <span class="demo-tag">${V("flask")} ${c("demo.active")}</span>
      <span class="clock" title=${c("demo.time")}>${Qi(e.time)}</span>
      <label class="ctl">${c("demo.speed")}
        <select @change=${(i) => e.speed = Number(i.target.value)}>
          ${Qo.map((i) => g`<option value=${i} ?selected=${e.speed === i}>${i}×</option>`)}
        </select>
      </label>
      <label class="ctl slider">${c("demo.outdoor")} <b>${F(e.outdoorMean, 0)} °C</b>
        <input type="range" min="-15" max="20" step="1" .value=${String(e.outdoorMean)}
          @input=${(i) => e.outdoorMean = Number(i.target.value)} />
      </label>
      ${this.narrow ? g`<select class="scn-select" @change=${(i) => {
      const n = i.target;
      n.value && this._scenario(n.value), n.value = "";
    }}>
            <option value="">${c("demo.scenarios")} …</option>
            ${t.map((i) => g`<option value=${i}>${s[i] ? "✓ " : ""}${c(`scn.${i}`)}</option>`)}
          </select>` : g`<div class="scn">
            ${t.map(
      (i) => g`<button class=${s[i] ? "primary" : ""} @click=${() => this._scenario(i)}>${c(`scn.${i}`)}</button>`
    )}
          </div>`}
    </div>`;
  }
  render() {
    if (!this.plant) return v;
    const e = this._kpis(), t = ko(this.plant, this._tm ? null : this.sim), s = this.messages.filter((i) => i.active && (i.level === "warning" || i.level === "error")).length;
    return g`
      ${this._tm ? v : this._demoBar()}
      ${this.showKpis ? g`<div class="kpis">
        ${e.map(
      (i) => g`<button class="kpi" ?disabled=${!i.comp} @click=${(n) => i.comp && (this._pop = { component: i.comp, slot: i.slot, x: n.clientX, y: n.clientY })}>
            <span class="k-label">${i.label}</span>
            <span class="k-value" style=${i.color ? `color:${i.color}` : ""}>${i.value}<small>${i.unit}</small></span>
            ${i.sub ? g`<span class="k-sub">${i.sub}</span>` : v}
          </button>`
    )}
      </div>` : v}
      ${t && this._energy ? g`<div class="energy card"><cp-energy .flow=${So(this.plant, this._src, this._tm ? null : this.sim)}></cp-energy></div>` : v}
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
            ${t ? g`<button class="icon ${this._energy ? "on" : ""}" title=${c("en.toggle")} aria-pressed=${this._energy ? "true" : "false"} @click=${this._toggleEnergy}>${V("bolt")}</button>` : v}
            <button class="icon ${this._tm ? "on" : ""} ${this._tmBusy ? "busy" : ""}" title=${c("tm.title")} aria-pressed=${this._tm ? "true" : "false"}
              @click=${() => this._tm ? this._closeTm() : this._openTm()}>${V("history")}</button>
            <button class="icon ${this._explain ? "on" : ""}" title=${c("ex.toggle")} aria-pressed=${this._explain ? "true" : "false"} @click=${this._toggleExplain}>${V("info")}</button>
            <button class="icon" title=${c("zoom_in")} @click=${() => this._sch()?.zoom(0.8)}>${V("plus")}</button>
            <button class="icon" title=${c("zoom_out")} @click=${() => this._sch()?.zoom(1.25)}>${V("minus")}</button>
            <button class="icon" title=${c("fit")} @click=${() => this._sch()?.fit()}>${V("fit")}</button>
            ${this.narrow || !this.showSide ? v : g`<button class="icon" title=${c("msg.title")} @click=${() => this._side = !this._side}>
                  ${V("bell")}${s ? g`<span class="badge">${s}</span>` : v}</button>`}
          </div>
        </div>
        ${this._explain ? g`<aside class="side card">${this._explainPanel()}</aside>` : this.showSide && (this._side || this.narrow) ? g`<aside class="side card">
                <div class="side-head"><b>${c("msg.title")}</b></div>
                <cp-messages compact .messages=${this.messages}></cp-messages>
              </aside>` : v}
      </div>
      ${this._pop ? g`<cp-slot-popover
            .component=${this._pop.component}
            .slotKey=${this._pop.slot}
            .src=${this._src}
            .x=${this._pop.x}
            .y=${this._pop.y}
            .version=${this.version}
            .hass=${this.hass}
            .writer=${(i, n, r) => this.api.write(i, n, r)}
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
Dt.properties = {
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
}, Dt.styles = [
  he,
  ae`
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
let $s = Dt;
customElements.get("cp-overview") || customElements.define("cp-overview", $s);
function dt(o) {
  return JSON.parse(JSON.stringify(o));
}
function $t(o) {
  const { w: e, h: t } = fe(o);
  return { x0: o.x, y0: o.y, x1: o.x + e, y1: o.y + t };
}
function zt(o) {
  const e = new Map(o.components.map((h) => [h.id, h])), t = [];
  let s = 0;
  for (const h of o.pipes) {
    const m = hn(h, e);
    if (m)
      for (let u = 1; u < m.pts.length; u++)
        t.push({ pipe: h.id, a: m.pts[u - 1], b: m.pts[u] }), s += Math.abs(m.pts[u].x - m.pts[u - 1].x) + Math.abs(m.pts[u].y - m.pts[u - 1].y);
  }
  let i = 0, n = 0;
  for (let h = 0; h < t.length; h++)
    for (let m = h + 1; m < t.length; m++) {
      const u = t[h], w = t[m];
      if (u.pipe === w.pipe) continue;
      const _ = u.a.y === u.b.y, y = w.a.y === w.b.y;
      if (_ !== y) {
        const b = _ ? u : w, x = _ ? w : u, $ = Math.min(b.a.x, b.b.x), A = Math.max(b.a.x, b.b.x), L = Math.min(x.a.y, x.b.y), W = Math.max(x.a.y, x.b.y);
        x.a.x > $ && x.a.x < A && b.a.y > L && b.a.y < W && i++;
      } else _ && u.a.y === w.a.y ? Math.min(Math.max(u.a.x, u.b.x), Math.max(w.a.x, w.b.x)) - Math.max(Math.min(u.a.x, u.b.x), Math.min(w.a.x, w.b.x)) > 0 && n++ : !_ && u.a.x === w.a.x && Math.min(Math.max(u.a.y, u.b.y), Math.max(w.a.y, w.b.y)) - Math.max(Math.min(u.a.y, u.b.y), Math.min(w.a.y, w.b.y)) > 0 && n++;
    }
  let r = 0;
  const a = new Map(o.pipes.map((h) => [h.id, /* @__PURE__ */ new Set([h.from.c, h.to.c])])), l = o.components.filter((h) => !["junction", "label"].includes(h.type));
  for (const h of t)
    for (const m of l) {
      if (a.get(h.pipe)?.has(m.id)) continue;
      const u = $t(m), w = Math.min(h.a.x, h.b.x), _ = Math.max(h.a.x, h.b.x), y = Math.min(h.a.y, h.b.y), b = Math.max(h.a.y, h.b.y);
      _ > u.x0 && w < u.x1 && b > u.y0 && y < u.y1 && r++;
    }
  let p = 0;
  for (let h = 0; h < l.length; h++)
    for (let m = h + 1; m < l.length; m++) {
      const u = $t(l[h]), w = $t(l[m]);
      u.x1 + 1 > w.x0 && w.x1 + 1 > u.x0 && u.y1 + 1 > w.y0 && w.y1 + 1 > u.y0 && p++;
    }
  const d = i * 10 + n * 15 + r * 12 + p * 40 + s * 0.05;
  return { crossings: i + n, overlaps: p, through: r, length: s, total: d };
}
const Hi = {
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
function tr(o, e, t, s) {
  const i = dt(o), n = i.components.filter((_) => !["label", "value_tile"].includes(_.type)), r = new Map(n.map((_) => [_.id, /* @__PURE__ */ new Set()]));
  for (const _ of i.pipes)
    r.get(_.from.c)?.add(_.to.c), r.get(_.to.c)?.add(_.from.c);
  const a = n.find((_) => _.type === "outdoor_unit") || n.find((_) => _.type === "indoor_unit") || n[0], l = /* @__PURE__ */ new Map();
  if (a) {
    l.set(a.id, 0);
    const _ = [a.id];
    for (; _.length; ) {
      const y = _.shift();
      for (const b of r.get(y) || [])
        if (!l.has(b)) {
          const x = n.find((A) => A.id === b), $ = x.type === "junction" || ie[x.type].passive && x.type !== "tap";
          l.set(b, l.get(y) + ($ ? 0.5 : 1)), _.push(b);
        }
    }
  }
  for (const _ of n) l.has(_.id) || l.set(_.id, 0);
  const d = [...new Set([...l.values()].map((_) => Math.round(_ * 2)))].sort((_, y) => _ - y).map((_) => n.filter((y) => Math.round(l.get(y.id) * 2) === _)), h = s ? -1 : 1;
  for (const _ of d) _.sort((y, b) => h * ((Hi[y.type] ?? 5) - (Hi[b.type] ?? 5)));
  const m = /* @__PURE__ */ new Map(), u = () => d.forEach((_) => _.forEach((y, b) => m.set(y.id, b / Math.max(1, _.length - 1))));
  u();
  for (let _ = 0; _ < t; _++)
    for (const y of d) {
      const b = new Map(
        y.map((x) => {
          const $ = [...r.get(x.id) || []].filter((A) => m.has(A));
          return [x.id, $.length ? $.reduce((A, L) => A + m.get(L), 0) / $.length : m.get(x.id)];
        })
      );
      y.sort((x, $) => b.get(x.id) - b.get($.id)), u();
    }
  let w = 1;
  for (const _ of d) {
    const y = Math.max(1, ..._.map((x) => fe(x).w));
    let b = 2;
    for (const x of _) {
      const { w: $, h: A } = fe(x);
      x.x = Math.round(w + (y - $) / 2), x.y = b, b += A + e + (ie[x.type].badges === "below" ? 3 : 0);
    }
    w += y + e + 2;
  }
  for (const _ of i.pipes)
    delete _.via, delete _.bend;
  return i.grid = { w: Math.max(i.grid.w, w + 4), h: Math.max(i.grid.h, ...n.map((_) => _.y + fe(_).h + 6)) }, i;
}
const sr = /^(ou|iu|dhw|buf|tap|inlet|jww|circ|sep|sc1|jmag|mag|pc1|vw1|pc0|hc\d+(_[a-z]+)?)$/;
function ir(o) {
  const e = o.settings?.wizard;
  if (!e) return null;
  const t = o.components.find((m) => m.type === "indoor_unit"), s = (m) => o.components.some((u) => u.type === m), i = {
    ...e,
    indoorModel: t?.model || e.indoorModel,
    dhw: s("dhw_tank") ? "tank" : e.dhw,
    // a unit with a built-in buffer (TP70) has no external one: keep the wish for when the unit changes back
    buffer: s("buffer") ? e.buffer === "none" ? "parallel" : e.buffer : qe(e.indoorModel)?.buffer ? e.buffer : "none",
    circulation: s("tap") ? o.components.some((m) => m.id === "circ") : e.circulation
  }, n = Yt(i, o), r = new Map(n.components.map((m) => [m.id, m]));
  if (t?.model && e.indoorModel && t.model !== e.indoorModel) {
    const m = o.components.filter((y) => !r.has(y.id) && !sr.test(y.id)), u = /* @__PURE__ */ new Set([...n.components.map((y) => y.id), ...m.map((y) => y.id)]), w = new Map(o.pipes.map((y) => [[y.from.c, y.to.c].sort().join("|"), y])), _ = [
      ...n.pipes.map((y) => {
        const b = w.get([y.from.c, y.to.c].sort().join("|"));
        return b?.bindings ? { ...y, bindings: b.bindings } : y;
      }),
      ...o.pipes.filter((y) => m.some((b) => b.id === y.from.c || b.id === y.to.c) && u.has(y.from.c) && u.has(y.to.c))
    ];
    return { ...n, components: [...n.components, ...dt(m)], pipes: _, settings: { ...o.settings, ...n.settings } };
  }
  const a = dt(o), l = [], p = [];
  for (const m of a.components) {
    const u = r.get(m.id);
    u && u.type === m.type ? (m.x = u.x, m.y = u.y, u.rot !== void 0 ? m.rot = u.rot : delete m.rot, u.flip ? m.flip = !0 : delete m.flip, (m.type === "radiators" || m.type === "tap") && (m.props = { ...m.props }, u.props?.variant ? m.props.variant = u.props.variant : delete m.props.variant), l.push(m)) : p.push(m);
  }
  if (!p.length && n.components.every((m) => a.components.some((u) => u.id === m.id))) {
    const m = new Map(a.pipes.map((u) => [[u.from.c, u.to.c].sort().join("|"), u]));
    return a.pipes = n.pipes.map((u) => {
      const w = m.get([u.from.c, u.to.c].sort().join("|"));
      return w?.bindings ? { ...u, bindings: w.bindings } : u;
    }), a.grid = { w: Math.max(a.grid.w, n.grid.w), h: Math.max(a.grid.h, n.grid.h) }, a.settings = { ...a.settings, building: n.settings.building }, a;
  }
  const d = (m) => `${m.from.c}.${m.from.p}>${m.to.c}.${m.to.p}`, h = new Map(n.pipes.map((m) => [d(m), m]));
  for (const m of a.pipes) {
    const u = h.get(d(m));
    delete m.bend, u?.via ? m.via = u.via : delete m.via;
  }
  a.grid = { w: Math.max(a.grid.w, n.grid.w), h: Math.max(a.grid.h, n.grid.h) }, a.settings = { ...a.settings, building: n.settings.building };
  for (const m of p) {
    const { w: u, h: w } = fe(m), _ = (b, x) => [...l].every(($) => {
      const A = $t($);
      return b + u + 2 <= A.x0 || b >= A.x1 + 2 || x + w + 3 <= A.y0 || x >= A.y1 + 3;
    });
    let y = !1;
    for (let b = 2; b + w < a.grid.h + 20 && !y; b += 2)
      for (let x = 1; x + u < a.grid.w + 20 && !y; x += 2)
        _(x, b) && (m.x = x, m.y = b, y = !0);
    l.push(m);
  }
  return a;
}
function nr(o, e = 400) {
  let t = dt(o), s = zt(t).total, i = 12345;
  const n = () => (i = (i * 1103515245 + 12345) % 2147483648) / 2147483648, r = t.components.filter((a) => !["label", "value_tile"].includes(a.type)).map((a) => a.id);
  for (let a = 0; a < e; a++) {
    const l = dt(t), d = new Map(l.components.map((u) => [u.id, u])).get(r[Math.floor(n() * r.length)]), h = n();
    if (h < 0.35) {
      const u = l.components.filter((_) => _.id !== d.id && Math.abs(_.x - d.x) <= 3 && r.includes(_.id));
      if (!u.length) continue;
      const w = u[Math.floor(n() * u.length)];
      [d.y, w.y] = [w.y, d.y];
    } else {
      const u = [-4, -2, 2, 4][Math.floor(n() * 4)];
      h < 0.7 ? d.y = Math.max(1, d.y + u) : d.x = Math.max(1, d.x + u);
    }
    const m = zt(l).total;
    m < s && (t = l, s = m);
  }
  return t;
}
function or(o) {
  const e = ir(o), t = [];
  if (e) t.push({ plant: e, kind: "template" });
  else
    for (const i of [3, 5])
      for (const n of [0, 3])
        for (const r of [!1, !0]) t.push({ plant: tr(o, i, n, r), kind: "layered" });
  let s = null;
  for (const i of t) {
    const n = zt(i.plant);
    (!s || n.total < s.score.total) && (s = { plant: i.plant, kind: i.kind, score: n });
  }
  if (s.kind === "layered" || s.score.crossings > 2 && !s.plant.settings.building) {
    const i = nr(s.plant), n = zt(i);
    n.total < s.score.total && (s = { plant: i, kind: s.kind, score: n });
  }
  return s;
}
const rr = [
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
], ar = ["supply", "return", "dhw_hot", "dhw_cold", "circulation"], as = {
  pump: ["running", "!running"],
  mixer: ["running"],
  valve_3way: ["a", "b"],
  outdoor_unit: ["running", "defrost", "!defrost"],
  indoor_unit: ["running", "a", "b", "aux", "pc1"],
  tap: ["flowing"],
  dhw_tank: ["charging"]
};
function Le(o) {
  return JSON.parse(JSON.stringify(o));
}
const Ze = class Ze extends ne {
  constructor() {
    super(...arguments), this.value = "", this.placeholder = "", this._listId = `cp-ents-${Ze._uid++}`;
  }
  _change(e) {
    const t = e.target.value.trim();
    this.value = t, this.dispatchEvent(new CustomEvent("value-changed", { detail: t }));
  }
  render() {
    const e = this.hass ? Object.keys(this.hass.states).sort() : [];
    return g`<input
        list=${this._listId}
        .value=${this.value || ""}
        placeholder=${this.placeholder || c("ed.entity_search")}
        @change=${this._change}
      />
      <datalist id=${this._listId}>
        ${e.map((t) => g`<option value=${t}>${this.hass.states[t].attributes.friendly_name || ""}</option>`)}
      </datalist>`;
  }
};
Ze.properties = { hass: { attribute: !1 }, value: {}, placeholder: {} }, Ze._uid = 0, Ze.styles = [he, ae`:host { display: block; min-width: 0; } input { font-size: 12px; padding: 6px 8px; }`];
let ks = Ze;
customElements.get("cp-entity-picker") || customElements.define("cp-entity-picker", ks);
const Ot = class Ot extends ne {
  constructor() {
    super(...arguments), this._gridCfg = (() => {
      const e = { show: !1, step: 1, snap: !0, osnap: !0 };
      try {
        return { ...e, ...JSON.parse(localStorage.getItem("copilot.editor.grid") || "{}") };
      } catch {
        return e;
      }
    })(), this.icons = /* @__PURE__ */ new Map(), this.version = 0, this._sel = null, this._hint = "", this._dirty = !1, this._undo = [], this._redo = [], this._onKey = (e) => {
      const t = e.composedPath()[0]?.tagName;
      t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || ((e.key === "Delete" || e.key === "Backspace") && this._sel ? (e.preventDefault(), this._delete()) : (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z" ? (e.preventDefault(), e.shiftKey ? this._doRedo() : this._doUndo()) : e.key.toLowerCase() === "r" && this._sel?.kind === "c" && this._rotate());
    };
  }
  _setGrid(e) {
    this._gridCfg = { ...this._gridCfg, ...e };
    try {
      localStorage.setItem("copilot.editor.grid", JSON.stringify(this._gridCfg));
    } catch {
    }
  }
  /** A straight run of a pipe was dragged: store its route as waypoints (undoable as one step). */
  _onSegment(e) {
    const { id: t, via: s, live: i } = e.detail;
    if (i) {
      this._bendStart || (this._bendStart = JSON.stringify(this._draft));
      const n = Le(this._draft), r = n.pipes.find((a) => a.id === t);
      r && (r.via = s, delete r.bend), this._draft = n;
    } else this._bendStart && (this._undo.push(this._bendStart), this._bendStart = void 0, this._dirty = !0);
  }
  willUpdate() {
    this.plant && this.plant !== this._source && (this._source = this.plant, this._draft = Le(this.plant), this._undo = [], this._redo = [], this._dirty = !1, this._sel = null);
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
    const s = Le(this._draft);
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
    const t = ie[e], s = this._newId(`${e}_`), i = {
      id: s,
      type: e,
      label: e === "junction" ? "" : c(`type.${e}`),
      ...this._freeSpot(t.variants ? Be({ type: e, props: {} }).w : t.w, t.variants ? Be({ type: e, props: {} }).h : t.h),
      bindings: {},
      props: e === "value_tile" ? { entries: [] } : e === "label" ? { text: c("type.label"), size: 18 } : {}
    };
    e === "pump" && (i.props.role = "other"), this._commit((n) => n.components.push(i)), this._sel = { kind: "c", id: s };
  }
  /** First grid position where a w×h box (plus margin) does not overlap anything. */
  _freeSpot(e, t) {
    const s = this._draft.components.map((n) => ({ c: n, ...fe(n) })), i = (n, r) => s.every(({ c: a, w: l, h: p }) => n + e + 1 <= a.x || n >= a.x + l + 1 || r + t + 2 <= a.y || r >= a.y + p + 3);
    for (let n = 1; n + t < this._draft.grid.h; n += 2)
      for (let r = 1; r + e < this._draft.grid.w; r += 2) if (i(r, n)) return { x: r, y: n };
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
    !e || !ie[e.type].rotatable || this._commit((t) => {
      const s = t.components.find((i) => i.id === e.id);
      s.rot = ((s.rot || 0) + 90) % 360;
    });
  }
  _duplicate() {
    const e = this._comp();
    if (!e) return;
    const t = this._newId(`${e.type}_`);
    this._commit((s) => s.components.push({ ...Le(e), id: t, x: e.x + 2, y: e.y + 2 })), this._sel = { kind: "c", id: t };
  }
  _connect(e, t) {
    const s = this._comp(e.c), i = this._comp(t.c), n = ge(s, e.p), r = ge(i, t.p), a = n?.def.kind || r?.def.kind || "supply", l = [], p = [s, i].find((h) => h.type === "pump");
    p && l.push({ c: p.id, s: "running" });
    for (const [h, m] of [
      [s, e],
      [i, t]
    ])
      h.type === "valve_3way" && (m.p === "a" || m.p === "b") && l.push({ c: h.id, s: m.p });
    const d = this._newId("p");
    this._commit((h) => h.pipes.push({ id: d, from: e, to: t, kind: a, flow: l })), this._sel = { kind: "p", id: d };
  }
  _set(e, t = !0) {
    const s = this._sel?.id;
    this._commit((i) => {
      const n = i.components.find((r) => r.id === s);
      n && e(n);
    }, t);
  }
  _setPipe(e, t = !0) {
    const s = this._sel?.id;
    this._commit((i) => {
      const n = i.pipes.find((r) => r.id === s);
      n && e(n);
    }, t);
  }
  _autoArrange() {
    const e = or(this._draft);
    this._commit((t) => {
      t.components = e.plant.components, t.pipes = e.plant.pipes, t.grid = e.plant.grid, t.settings = { ...t.settings, building: e.plant.settings.building, wizard: e.plant.settings.wizard };
    }), this._sel = null, this._hint = c(e.kind === "template" ? "ed.auto_done_tpl" : "ed.auto_done", { crossings: e.score.crossings }), window.setTimeout(() => this._hint = "", 6e3);
  }
  _save() {
    const e = Le(this._draft);
    e.settings = { ...e.settings, layout_edited: !0 }, this.dispatchEvent(new CustomEvent("save", { detail: e, bubbles: !0, composed: !0 })), this._dirty = !1;
  }
  _discard() {
    this._draft = Le(this.plant), this._undo = [], this._redo = [], this._dirty = !1, this._sel = null;
  }
  // ------------------------------------------------------------ events
  _onBend(e) {
    const { id: t, bend: s, live: i } = e.detail;
    if (i) {
      this._bendStart || (this._bendStart = JSON.stringify(this._draft));
      const n = Le(this._draft), r = n.pipes.find((a) => a.id === t);
      r && (r.bend = s, delete r.via), this._draft = n;
    } else this._bendStart && (this._undo.push(this._bendStart), this._bendStart = void 0, this._dirty = !0);
  }
  // ------------------------------------------------------------ render
  render() {
    if (!this._draft) return v;
    const e = this._sel;
    return g`
      <div class="toolbar">
        <button class="icon" title=${c("undo")} ?disabled=${!this._undo.length} @click=${this._doUndo}>${V("undo")}</button>
        <button class="icon" title=${c("redo")} ?disabled=${!this._redo.length} @click=${this._doRedo}>${V("redo")}</button>
        <button class="icon" title=${c("ed.rotation")} ?disabled=${!(e?.kind === "c" && ie[this._comp()?.type || "label"].rotatable)} @click=${this._rotate}>${V("rotate")}</button>
        <button class="icon" title=${c("ed.duplicate")} ?disabled=${e?.kind !== "c"} @click=${this._duplicate}>${V("copy")}</button>
        <button class="icon danger" title=${c("delete")} ?disabled=${!e} @click=${this._delete}>${V("trash")}</button>
        <button title=${c("ed.auto_title")} @click=${this._autoArrange}>${V("wand")} ${c("ed.auto")}</button>
        <span class="hint">${this._hint}</span>
        <span class="spacer"></span>
        ${this._dirty ? g`<span class="dirty">${c("unsaved")}</span>
          <button @click=${this._discard}>${c("discard")}</button>` : v}
        <button class="primary" ?disabled=${!this._dirty} @click=${this._save}>${V("save")} ${c("save")}</button>
      </div>
      <div class="layout">
        <aside class="palette card">
          <div class="cap">${c("ed.palette")}</div>
          ${rr.map((t) => g`<button class="pal" @click=${() => this._add(t)}>${V("plus")} ${c(`type.${t}`)}</button>`)}
          <div class="cap">${c("ed.grid")}</div>
          <div class="row grid-size">
            <input type="number" min="20" max="200" .value=${String(this._draft.grid.w)} @change=${(t) => this._commit((s) => s.grid.w = Number(t.target.value) || s.grid.w)} />
            ×
            <input type="number" min="20" max="200" .value=${String(this._draft.grid.h)} @change=${(t) => this._commit((s) => s.grid.h = Number(t.target.value) || s.grid.h)} />
          </div>
          <label class="bld"><input type="checkbox" .checked=${!!this._draft.settings.building && this._draft.settings.building.show !== !1}
            @change=${(t) => this._commit((s) => {
      const i = t.target.checked;
      s.settings = { ...s.settings, building: { ...s.settings.building || { floor: s.grid.h - 2 }, show: i } };
    })} /> ${c("ed.building")}</label>
          <div class="cap">${c("ed.raster")}</div>
          <label class="bld"><input type="checkbox" .checked=${this._gridCfg.show} @change=${(t) => this._setGrid({ show: t.target.checked })} /> ${c("ed.grid_show")}</label>
          <label class="field">${c("ed.grid_step")}
            <select @change=${(t) => this._setGrid({ step: Number(t.target.value) })}>
              ${[1, 2, 5].map((t) => g`<option value=${t} ?selected=${this._gridCfg.step === t}>${c("ed.grid_cells", { n: t })}</option>`)}
            </select></label>
          <label class="bld"><input type="checkbox" .checked=${this._gridCfg.snap} @change=${(t) => this._setGrid({ snap: t.target.checked })} /> ${c("ed.grid_snap")}</label>
          <label class="bld"><input type="checkbox" .checked=${this._gridCfg.osnap} @change=${(t) => this._setGrid({ osnap: t.target.checked })} /> ${c("ed.object_snap")}</label>
          <p class="muted tiny">${c("ed.snap_hint")}</p>
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
            @cp-segment=${this._onSegment}
            .gridStep=${this._gridCfg.step}
            ?showGrid=${this._gridCfg.show}
            ?snapGrid=${this._gridCfg.snap}
            ?snapObjects=${this._gridCfg.osnap}
            @cp-hint=${(t) => this._hint = t.detail}
          ></cp-schematic>
        </div>
        <aside class="props card">${e?.kind === "c" ? this._compProps() : e?.kind === "p" ? this._pipeProps() : g`<p class="muted">${c("ed.nothing")}</p>`}</aside>
      </div>
    `;
  }
  _num(e, t, s, i = 1) {
    return g`<label class="field">${e}<input type="number" step=${i} .value=${t ?? ""} @change=${(n) => s(Number(n.target.value))} /></label>`;
  }
  _compProps() {
    const e = this._comp();
    if (!e) return v;
    const t = ie[e.type], s = new Set(e.show ?? ye(e).filter((n) => n.show).map((n) => n.key)), i = [...this.icons.values()];
    return g`
      <div class="ptitle">${c(`type.${e.type}`)} <code>${e.id}</code></div>
      ${e.type !== "junction" ? g`<label class="field">${c("ed.label")}<input .value=${e.label} @change=${(n) => this._set((r) => r.label = n.target.value)} /></label>` : v}
      ${e.type === "outdoor_unit" ? g`<label class="field">${c("ed.model")}<select @change=${(n) => this._set((r) => r.model = n.target.value)}>
              ${St.map((n) => g`<option value=${n.id} ?selected=${n.id === e.model}>${n.label}</option>`)}
            </select></label>
            ${this._num(c("ed.nominal"), e.props.nominal_kw, (n) => this._set((r) => r.props.nominal_kw = n), 0.1)}
            ${this._num(c("ed.cop_ref"), e.props.cop_ref ?? 4.9, (n) => this._set((r) => r.props.cop_ref = n), 0.1)}` : v}
      ${e.type === "indoor_unit" ? g`<label class="field">${c("ed.model")}<select @change=${(n) => this._set((r) => r.model = n.target.value)}>
              ${Is.map((n) => g`<option value=${n.id} ?selected=${n.id === e.model}>${n.label}</option>`)}
            </select></label>
            ${this._num(c("wz.aux_kw"), e.props.aux_kw, (n) => this._set((r) => r.props.aux_kw = n), 1)}
            <div class="cap">${c("ed.input_labels")}</div>
            ${[1, 2, 3, 4].map(
      (n) => g`<label class="field">${c(`slot.input${n}`)}<input .value=${e.props.input_labels?.[`input${n}`] || ""}
                @change=${(r) => this._set((a) => a.props.input_labels = { ...a.props.input_labels || {}, [`input${n}`]: r.target.value })} /></label>`
    )}
            <div class="cap">${c("ed.pressure_limits")}</div>
            <div class="two">
              ${this._num("min", e.props.pressure_min ?? 1, (n) => this._set((r) => r.props.pressure_min = n), 0.1)}
              ${this._num("max", e.props.pressure_max ?? 2.7, (n) => this._set((r) => r.props.pressure_max = n), 0.1)}
            </div>` : v}
      ${e.type === "buffer" || e.type === "dhw_tank" ? this._num(c("ed.volume"), e.props.volume, (n) => this._set((r) => r.props.volume = n)) : v}
      ${t.roles ? g`<label class="field">${c("ed.role")}<select @change=${(n) => this._set((r) => r.props.role = n.target.value)}>
            ${t.roles.map((n) => g`<option value=${n} ?selected=${e.props.role === n}>${c(`role.${n}`)}</option>`)}
          </select></label>` : v}
      ${["radiators", "floor_heating", "mixer", "pump"].includes(e.type) ? this._num(c("ed.circuit"), e.props.circuit ?? 1, (n) => this._set((r) => r.props.circuit = n)) : v}
      ${e.type === "dhw_tank" ? this._num(c("ed.dhw_circuit"), e.props.dhw_circuit ?? 1, (n) => this._set((r) => r.props.dhw_circuit = n)) : v}
      ${e.type === "label" ? g`<label class="field">${c("ed.text")}<input .value=${e.props.text || ""} @change=${(n) => this._set((r) => r.props.text = n.target.value)} /></label>
            ${this._num("px", e.props.size || 18, (n) => this._set((r) => r.props.size = n))}` : v}
      ${t.rotatable ? g`<label class="field">${c("ed.rotation")}<select @change=${(n) => this._set((r) => r.rot = Number(n.target.value))}>
            ${[0, 90, 180, 270].map((n) => g`<option value=${n} ?selected=${(e.rot || 0) === n}>${n}°</option>`)}
          </select></label>` : v}
      ${e.type === "radiators" || e.type === "tap" ? g`<label class="field">${c(e.type === "tap" ? "ed.tap_kind" : "ed.connection")}<select @change=${(n) => this._set((r) => r.props.variant = n.target.value)}>
            ${(e.type === "tap" ? ["tap", "shower"] : ["side", "bottom"]).map(
      (n) => g`<option value=${n} ?selected=${(e.props.variant || (e.type === "tap" ? "tap" : "side")) === n}>${c(e.type === "tap" ? `ed.tap.${n}` : `ed.conn.${n}`)}</option>`
    )}
          </select></label>` : v}
      ${t.mirrorable ? g`<label class="field check"><input type="checkbox" .checked=${!!e.flip} @change=${(n) => this._set((r) => {
      n.target.checked ? r.flip = !0 : delete r.flip;
    })} />${c("ed.flip")}</label>` : v}
      ${["junction", "label", "value_tile"].includes(e.type) ? v : g`<label class="field">${c("ed.icon")}<select @change=${(n) => this._set((r) => {
      const a = n.target.value;
      a ? r.icon = a : delete r.icon;
    })}>
            <option value="">${c("ed.icon_default")}</option>
            ${i.map((n) => g`<option value=${n.id} ?selected=${n.id === e.icon}>${n.name}</option>`)}
          </select></label>`}
      ${e.type === "value_tile" ? this._tileEntries(e) : this._bindings(e, s)}
    `;
  }
  _bindings(e, t) {
    const s = ye(e);
    return s.length ? g`<div class="cap">${c("ed.bindings")}</div>
      <div class="bindings">
        ${s.map((i) => {
      const n = this.src.get(e, i.key), { text: r, unit: a } = Oe(n, i.kind);
      return g`<div class="bind">
            <div class="bhead">
              <label class="show" title=${c("ed.show")}><input type="checkbox" .checked=${t.has(i.key)}
                @change=${(l) => this._set((p) => {
        const d = new Set(p.show ?? ye(p).filter((h) => h.show).map((h) => h.key));
        l.target.checked ? d.add(i.key) : d.delete(i.key), p.show = ye(p).map((h) => h.key).filter((h) => d.has(h));
      })} /></label>
              <span class="bname">${Ee(e.type, i.key)}</span>
              <span class="bval">${n ? `${r} ${a}` : ""}</span>
              ${sn(e.bindings[i.key]) ? g`<label class="wr" title=${c("wr.release")}><input type="checkbox" .checked=${(e.writable || []).includes(i.key)}
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
    return g`<div class="cap">${c("ed.entries")}</div>
      ${t.map(
      (i, n) => g`<div class="bind">
          <div class="two">
            <input .value=${i.label || ""} placeholder=${c("ed.label")} @change=${(r) => this._set((a) => a.props.entries[n].label = r.target.value)} />
            <select @change=${(r) => this._set((a) => a.props.entries[n].kind = r.target.value)}>
              ${s.map((r) => g`<option value=${r} ?selected=${i.kind === r}>${r}</option>`)}
            </select>
          </div>
          <div class="row nowrap">
            <cp-entity-picker .hass=${this.hass} .value=${i.entity || ""}
              @value-changed=${(r) => this._set((a) => a.props.entries[n].entity = r.detail)}></cp-entity-picker>
            <button class="icon danger" @click=${() => this._set((r) => r.props.entries.splice(n, 1))}>${V("trash")}</button>
          </div>
        </div>`
    )}
      <button @click=${() => this._set((i) => {
      i.props.entries = [...i.props.entries || [], { slot: `v${Date.now().toString(36)}`, label: "", entity: "", kind: "text" }];
    })}>${V("plus")} ${c("ed.add_entry")}</button>`;
  }
  _conds(e, t) {
    const s = this._draft.components.filter((i) => as[i.type]);
    return g`${(e || []).map(
      (i, n) => g`<div class="row nowrap cond">
          <select @change=${(r) => this._setPipe((a) => a[t][n].c = r.target.value)}>
            ${s.map((r) => g`<option value=${r.id} ?selected=${r.id === i.c}>${r.label || r.id}</option>`)}
          </select>
          <select @change=${(r) => this._setPipe((a) => a[t][n].s = r.target.value)}>
            ${(as[this._comp(i.c)?.type || "pump"] || []).map(
        (r) => g`<option value=${r} ?selected=${r === i.s}>${r.startsWith("!") ? `${c("ed.not")} ${c(`state.${r.slice(1)}`)}` : c(`state.${r}`)}</option>`
      )}
          </select>
          <button class="icon danger" @click=${() => this._setPipe((r) => r[t].splice(n, 1))}>${V("close")}</button>
        </div>`
    )}
      <button ?disabled=${!s.length} @click=${() => this._setPipe((i) => {
      const n = s[0];
      i[t] = [...i[t] || [], { c: n.id, s: as[n.type][0] }];
    })}>${V("plus")} ${c("ed.add_cond")}</button>`;
  }
  _pipeProps() {
    const e = this._pipe();
    if (!e) return v;
    const t = (s) => this._comp(s)?.label || s;
    return g`
      <div class="ptitle">${c("ed.pipe")} <code>${e.id}</code></div>
      <p class="muted small">${t(e.from.c)} · ${e.from.p} → ${t(e.to.c)} · ${e.to.p}</p>
      <label class="field">${c("ed.kind")}<select @change=${(s) => this._setPipe((i) => i.kind = s.target.value)}>
        ${ar.map((s) => g`<option value=${s} ?selected=${s === e.kind}>${c(`kind.${s}`)}</option>`)}
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
Ot.properties = {
  plant: { attribute: !1 },
  hass: { attribute: !1 },
  src: { attribute: !1 },
  icons: { attribute: !1 },
  version: { type: Number },
  _draft: { state: !0 },
  _sel: { state: !0 },
  _hint: { state: !0 },
  _dirty: { state: !0 },
  _gridCfg: { state: !0 }
}, Ot.styles = [
  he,
  ae`
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
      .tiny { font-size: 11px; margin: 6px 0 0; line-height: 1.4; }
      .bld { display: flex; gap: 8px; align-items: center; font-size: 13px; margin-top: 10px; }
      .bld input { width: auto; margin: 0; }
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
let Ss = Ot;
customElements.get("cp-editor") || customElements.define("cp-editor", Ss);
const lr = {
  mode: "fixed",
  price: 0.32,
  feed_in: 0.08,
  gas_price: 0.12,
  gas_eff: 90
};
function Us(o) {
  return { ...lr, ...o.settings.tariff || {} };
}
function cr(o) {
  const e = (o || "").toLowerCase();
  return e === "kw" ? 1 : e === "mw" ? 1e3 : 1e-3;
}
function un(o, e, t, s, i) {
  if (o <= 0) return 0;
  const n = Math.max(0, e), r = t !== void 0 ? t + s + (i ? 0 : o) : o + s;
  return r <= 0.01 ? o : o * Math.min(1, n / r);
}
async function pr(o, e, t) {
  const i = e.components.find((x) => x.type === "outdoor_unit")?.bindings.el_power, n = e.settings.energy, r = Us(e), a = /* @__PURE__ */ new Map();
  if (!i) return { hours: a, share: !1 };
  const l = [i, n?.grid, n?.house, n?.wallbox, r.mode === "entity" ? r.price_entity : void 0].filter((x) => !!x), p = await o.callWS({
    type: "recorder/statistics_during_period",
    start_time: new Date(Ve(/* @__PURE__ */ new Date()) - t * 864e5).toISOString(),
    end_time: (/* @__PURE__ */ new Date()).toISOString(),
    statistic_ids: l,
    period: "hour",
    types: ["mean"]
  }), d = (x) => {
    const $ = /* @__PURE__ */ new Map();
    if (!x) return $;
    const A = cr(o.states[x]?.attributes?.unit_of_measurement);
    for (const L of p[x] || []) L.mean !== null && L.mean !== void 0 && $.set(L.start, L.mean * A);
    return $;
  }, h = d(i), m = (x, $) => $ ? -x : x, u = d(n?.enabled ? n.grid : void 0), w = d(n?.enabled ? n.house : void 0), _ = d(n?.enabled ? n.wallbox : void 0), y = /* @__PURE__ */ new Map();
  if (r.mode === "entity" && r.price_entity)
    for (const x of p[r.price_entity] || []) x.mean != null && y.set(x.start, x.mean);
  const b = u.size > 0;
  for (const [x, $] of h) {
    const A = u.get(x), L = A === void 0 ? $ : un($, m(A, n?.grid_invert), w.get(x), _.get(x) ?? 0, n?.house_includes_hp !== !1);
    a.set(x, { hp: $, grid: L, price: y.get(x) });
  }
  return { hours: a, share: b };
}
function dr(o) {
  const e = (a) => o.history("energy", a, 24), t = e("hp_power"), s = e("grid_power"), i = e("house_power"), n = e("wallbox_power"), r = /* @__PURE__ */ new Map();
  return t.forEach((a, l) => {
    const p = Math.floor(a.t * 1e3 / 36e5) * 36e5, d = (a.v ?? 0) / 1e3, h = un(d, (s[l]?.v ?? 0) / 1e3, (i[l]?.v ?? 0) / 1e3, (n[l]?.v ?? 0) / 1e3, !1), m = r.get(p) || { hp: 0, grid: 0 };
    m.hp += d / 60, m.grid += h / 60, r.set(p, m);
  }), r;
}
function ls(o, e, t, s, i) {
  const n = Us(s), r = /* @__PURE__ */ new Map();
  for (const [a, l] of e) {
    const p = Ve(new Date(a)), d = r.get(p) || { hp: 0, grid: 0, priced: 0, gridForPrice: 0 };
    d.hp += l.hp, d.grid += l.grid, l.price !== void 0 && (d.priced += l.grid * l.price, d.gridForPrice += l.grid), r.set(p, d);
  }
  return o.map((a) => {
    const l = r.get(a.day);
    let p, d = !1;
    l && l.hp > 0.05 && (t || i) ? p = Math.min(1, l.grid / l.hp) : i ? (p = Math.max(0.45, Math.min(0.92, 0.6 + a.el / 60)), d = !0) : p = 1;
    const h = l && l.gridForPrice > 0.01 ? l.priced / l.gridForPrice : n.price, m = a.el * p, u = a.el - m;
    return {
      day: a.day,
      el: a.el,
      grid: m,
      self: u,
      heat: a.heat,
      cost: m * h,
      feedLoss: u * n.feed_in,
      gas: a.heat / Math.max(0.5, n.gas_eff / 100) * n.gas_price,
      estimated: d,
      noShare: !t && !i
    };
  });
}
async function hr(o, e, t, s) {
  if (!o.length) return [];
  if (t) return ls(o, dr(t), !0, e, !0);
  if (!s) return ls(o, /* @__PURE__ */ new Map(), !1, e, !1);
  const { hours: i, share: n } = await pr(s, e, 31);
  return ls(o, i, n, e, !1);
}
function cs(o) {
  if (!o.length) return null;
  const e = { el: 0, grid: 0, self: 0, heat: 0, cost: 0, feedLoss: 0, gas: 0, estimated: !1, noShare: !1 };
  for (const t of o)
    e.el += t.el, e.grid += t.grid, e.self += t.self, e.heat += t.heat, e.cost += t.cost, e.feedLoss += t.feedLoss, e.gas += t.gas, e.estimated ||= t.estimated, e.noShare ||= t.noShare;
  return e;
}
function $e(o, e, t) {
  o.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
}
const Ht = class Ht extends ne {
  constructor() {
    super(...arguments), this.plant = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._cfg = structuredClone(this.plant?.settings?.wizard || us());
  }
  _upd(e) {
    this._cfg = { ...this._cfg, ...e };
  }
  _generate() {
    this.plant && !confirm(c("wz.replace_confirm")) || $e(this, "plant-generated", Yt(this._cfg, this.plant));
  }
  render() {
    const e = this._cfg, t = (s, i = "text") => g`<input type=${i} .value=${String(e[s] ?? "")}
      @change=${(n) => {
      const r = n.target.value;
      this._upd({ [s]: i === "number" ? Number(r) : r });
    }} />`;
    return g`
      <div class="card wrap">
        <h2>${c("wz.title")}</h2>
        <p class="muted">${c("wz.intro")}</p>
        <label class="field">${c("wz.name")} ${t("name")}</label>

        <h3>${c("wz.hp")}</h3>
        <div class="grid">
          <label class="field">${c("wz.outdoor")}
            <select @change=${(s) => this._upd({ outdoorModel: s.target.value })}>
              ${St.map((s) => g`<option value=${s.id} ?selected=${s.id === e.outdoorModel}>${s.label}</option>`)}
            </select></label>
          <label class="field">${c("ed.label")} ${t("outdoorLabel")}</label>
          <label class="field">${c("ed.nominal")} ${t("nominalKw", "number")}</label>
          <label class="field">${c("wz.indoor")}
            <select @change=${(s) => this._upd({ indoorModel: s.target.value })}>
              ${Is.map((s) => g`<option value=${s.id} ?selected=${s.id === e.indoorModel}>${s.label}</option>`)}
            </select></label>
          <label class="field">${c("ed.label")} ${t("indoorLabel")}</label>
          <div class="field check">
            <label><input type="checkbox" .checked=${e.aux} @change=${(s) => this._upd({ aux: s.target.checked })} /> ${c("wz.aux")}</label>
            ${e.aux ? g`<label class="field">${c("wz.aux_kw")} ${t("auxKw", "number")}</label>` : v}
          </div>
        </div>

        <h3>${c("wz.buffer")}</h3>
        <div class="grid">
          <div class="radios">
            ${["parallel", "serial", "none"].map(
      (s) => g`<label><input type="radio" name="buf" .checked=${e.buffer === s} @change=${() => this._upd({ buffer: s })} /> ${c(`wz.buffer.${s}`)}</label>`
    )}
          </div>
          ${e.buffer !== "none" ? g`<label class="field">${c("wz.buffer_volume")} ${t("bufferVolume", "number")}</label>
                <label class="field">${c("ed.label")} ${t("bufferLabel")}</label>` : v}
        </div>

        <h3>${c("wz.dhw")}</h3>
        <div class="grid">
          <div class="radios">
            ${["tank", "none"].map(
      (s) => g`<label><input type="radio" name="dhw" .checked=${e.dhw === s} @change=${() => this._upd({ dhw: s })} /> ${c(`wz.dhw.${s}`)}</label>`
    )}
          </div>
          ${e.dhw === "tank" ? g`<label class="field">${c("wz.dhw_volume")} ${t("dhwVolume", "number")}</label>
                <label class="field">${c("ed.label")} ${t("dhwLabel")}</label>
                <label class="check"><input type="checkbox" .checked=${e.circulation} @change=${(s) => this._upd({ circulation: s.target.checked })} /> ${c("wz.circulation")}</label>` : v}
        </div>

        <h3>${c("wz.circuits")}</h3>
        ${e.circuits.map(
      (s, i) => g`<div class="circuit">
            <b>${c("wz.circuit", { n: i + 1 })}</b>
            <input .value=${s.label} @change=${(n) => this._circ(i, { label: n.target.value })} />
            <select @change=${(n) => this._circ(i, { emitter: n.target.value })}>
              <option value="radiators" ?selected=${s.emitter === "radiators"}>${c("type.radiators")}</option>
              <option value="floor_heating" ?selected=${s.emitter === "floor_heating"}>${c("type.floor_heating")}</option>
            </select>
            <label class="check"><input type="checkbox" .checked=${s.mixed} @change=${(n) => this._circ(i, { mixed: n.target.checked })} /> ${c("wz.mixed")}</label>
            <button class="ghost danger" ?disabled=${e.circuits.length < 2} @click=${() => this._upd({ circuits: e.circuits.filter((n, r) => r !== i) })}>${c("wz.remove")}</button>
          </div>`
    )}
        <button ?disabled=${e.circuits.length >= 4} @click=${() => this._upd({ circuits: [...e.circuits, { emitter: "floor_heating", mixed: !0, label: c("wz.circuit", { n: e.circuits.length + 1 }) }] })}>
          ${V("plus")} ${c("wz.add_circuit")}</button>

        <h3>${c("wz.extras")}</h3>
        <div class="radios">
          <label><input type="checkbox" .checked=${e.separator} @change=${(s) => this._upd({ separator: s.target.checked })} /> ${c("wz.separator")}</label>
          <label><input type="checkbox" .checked=${e.expansion} @change=${(s) => this._upd({ expansion: s.target.checked })} /> ${c("wz.expansion")}</label>
        </div>

        <div class="row actions">
          <button @click=${() => this._cfg = us()}>${c("wz.example")}</button>
          <span class="spacer"></span>
          <button class="primary" @click=${this._generate}>${V("wand")} ${c("wz.generate")}</button>
        </div>
      </div>
    `;
  }
  _circ(e, t) {
    const s = this._cfg.circuits.map((i, n) => n === e ? { ...i, ...t } : i);
    this._upd({ circuits: s });
  }
};
Ht.properties = { plant: { attribute: !1 }, _cfg: { state: !0 } }, Ht.styles = [
  he,
  ae`
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
let Ms = Ht;
const Vt = class Vt extends ne {
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
    $e(this, "save", e), this._msg = c("map.applied", { count: t });
  }
  render() {
    const e = !!this.hass?.__standalone, t = this._res, s = this.plant.components.flatMap(
      (i) => ye(i).filter((n) => !i.bindings[n.key] && !t?.suggestions.some((r) => r.component_id === i.id && r.slot === n.key)).map((n) => ({ c: i, s: n }))
    );
    return g`<div class="card">
      <h2>${c("map.title")}</h2>
      <p class="muted">${c("map.intro")}</p>
      ${e ? g`<p class="muted">${c("map.standalone")}</p>` : v}
      <div class="row">
        <button class="primary" ?disabled=${this._busy || e} @click=${this._scan}>${V("search")} ${c("map.scan")}</button>
        ${t ? g`<span class="muted">${c("map.found", { count: t.entity_count })}</span>` : v}
        <span class="spacer"></span>
        ${this._msg ? g`<span class="ok">${V("check")} ${this._msg}</span>` : v}
      </div>
      ${t && t.entity_count === 0 ? g`<div class="help"><b>${c("map.none")}</b><p>${c("map.none_help")}</p></div>` : v}
      ${t && t.suggestions.length ? g`<div class="tbl">
            <table>
              <thead><tr>
                <th><input type="checkbox" .checked=${this._sel.size === t.suggestions.length}
                  @change=${(i) => this._sel = i.target.checked ? new Set(t.suggestions.map((n) => `${n.component_id}|${n.slot}`)) : /* @__PURE__ */ new Set()} /></th>
                <th>${c("map.component")}</th><th>${c("map.slot")}</th><th>${c("map.entity")}</th><th>${c("map.value")}</th><th>${c("map.confidence")}</th>
              </tr></thead>
              <tbody>
                ${t.suggestions.map((i) => {
      const n = `${i.component_id}|${i.slot}`, r = this._comp(i.component_id), a = r?.bindings[i.slot], l = this.hass?.states[i.entity_id];
      return g`<tr>
                    <td><input type="checkbox" .checked=${this._sel.has(n)} @change=${(p) => {
        const d = new Set(this._sel);
        p.target.checked ? d.add(n) : d.delete(n), this._sel = d;
      }} /></td>
                    <td>${r?.label || i.component_id}</td>
                    <td>${Ee(r?.type || "", i.slot)}</td>
                    <td><code>${i.entity_id}</code>${a && a !== i.entity_id ? g`<div class="muted small">${c("map.current")}: ${a}</div>` : v}</td>
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
      <div class="chips">${s.slice(0, 80).map(({ c: i, s: n }) => g`<span class="chip">${i.label || i.id}: ${Ee(i.type, n.key)}</span>`)}</div>
    </div>`;
  }
};
Vt.properties = {
  plant: { attribute: !1 },
  hass: { attribute: !1 },
  api: { attribute: !1 },
  _res: { state: !0 },
  _sel: { state: !0 },
  _busy: { state: !0 },
  _msg: { state: !0 }
}, Vt.styles = [
  he,
  ae`
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
let zs = Vt;
const ur = ["outdoor_unit", "indoor_unit", "buffer", "dhw_tank", "pump", "valve_3way", "mixer", "radiators", "floor_heating", "tap", "separator", "expansion_vessel"], Bt = class Bt extends ne {
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
    const i = await new Promise((n, r) => {
      const a = new FileReader();
      a.onload = () => n(String(a.result).split(",")[1] || ""), a.onerror = () => r(a.error), a.readAsDataURL(s);
    });
    try {
      await this.api.uploadIcon(s.name.replace(/\.[^.]+$/, ""), s.type || "image/svg+xml", i, this._iso), $e(this, "icons-changed");
    } catch (n) {
      const r = n?.code || n?.error?.code || "invalid_data";
      this._err = c(`ic.err.${r}`);
    }
  }
  async _delete(e) {
    await this.api.deleteIcon(e), $e(this, "icons-changed");
  }
  _typeDefault(e, t) {
    const s = structuredClone(this.plant);
    s.settings.typeIcons = { ...s.settings.typeIcons || {} }, t ? s.settings.typeIcons[e] = t : delete s.settings.typeIcons[e], $e(this, "save", s);
  }
  render() {
    const e = [...this.icons.values()];
    return g`<div class="card">
      <h2>${c("ic.title")}</h2>
      <p class="muted">${c("ic.intro")}</p>
      <div class="row">
        <label class="btn primary up">${V("upload")} ${c("ic.upload")}
          <input type="file" accept=".svg,.png,.webp,.jpg,.jpeg,image/svg+xml,image/png,image/webp,image/jpeg" @change=${this._upload} hidden /></label>
        <label class="row small"><input type="checkbox" .checked=${this._iso} @change=${(t) => this._iso = t.target.checked} /> ${c("ic.iso")}</label>
        ${this._err ? g`<span class="err">${this._err}</span>` : v}
      </div>
      ${e.length ? g`<div class="gallery">${e.map(
      (t) => g`<div class="ic">
              <div class="prev"><img src=${t.data_url} alt=${t.name} /></div>
              <div class="name">${t.name}${t.iso ? g` <span class="muted">· iso</span>` : v}</div>
              <button class="ghost danger icon" @click=${() => this._delete(t.id)}>${V("trash")}</button>
            </div>`
    )}</div>` : g`<p class="muted">${c("ic.empty")}</p>`}
      <h3>${c("ic.type_default")}</h3>
      <div class="defaults">
        ${ur.map(
      (t) => g`<label class="field">${c(`type.${t}`)}
            <select @change=${(s) => this._typeDefault(t, s.target.value)}>
              <option value="">${c("ed.icon_default")}</option>
              ${e.map((s) => g`<option value=${s.id} ?selected=${this.plant.settings.typeIcons?.[t] === s.id}>${s.name}</option>`)}
            </select></label>`
    )}
      </div>
    </div>`;
  }
};
Bt.properties = { plant: { attribute: !1 }, api: { attribute: !1 }, icons: { attribute: !1 }, _err: { state: !0 }, _iso: { state: !0 } }, Bt.styles = [
  he,
  ae`
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
let Es = Bt;
const Rt = class Rt extends ne {
  constructor() {
    super(...arguments), this.version = "", this._backups = null, this._tariff = null, this._bmsg = "", this._energy = null, this._note = "";
  }
  _tariffSection() {
    const e = { ...Us(this.plant), ...this._tariff || {} }, t = (i) => this._tariff = { ...this._tariff || {}, ...i }, s = (i, n, r) => g`<label class="field">${n}<input type="number" step=${r} min="0" .value=${String(e[i])}
        @change=${(a) => t({ [i]: Number(a.target.value) })} /></label>`;
    return g`<div class="card wrap">
      <h2>${c("st.tariff")}</h2>
      <p class="muted">${c("st.tariff_hint")}</p>
      <div class="grid2">
        <label class="field">${c("st.t_mode")}
          <select @change=${(i) => t({ mode: i.target.value })}>
            <option value="fixed" ?selected=${e.mode === "fixed"}>${c("st.t_fixed")}</option>
            <option value="entity" ?selected=${e.mode === "entity"}>${c("st.t_entity")}</option>
          </select></label>
        ${e.mode === "entity" ? g`<label class="field">${c("st.t_entity_pick")}
              <cp-entity-picker .hass=${this.hass} .value=${e.price_entity || ""} @value-changed=${(i) => t({ price_entity: i.detail || void 0 })}></cp-entity-picker></label>` : s("price", c("st.t_price"), "0.01")}
        ${s("feed_in", c("st.t_feed_in"), "0.001")}
        ${s("gas_price", c("st.t_gas"), "0.01")}
        ${s("gas_eff", c("st.t_gas_eff"), "1")}
      </div>
      <div class="row"><span class="spacer"></span>
        <button class="primary" ?disabled=${!this._tariff} @click=${() => {
      this._patch({ tariff: { ...this.plant.settings.tariff || {}, ...this._tariff } }), this._tariff = null;
    }}>${V("save")} ${c("st.save")}</button></div>
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
        $e(this, "plant-restored", t), this._bmsg = c("bk.restored"), await this._loadBackups();
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
        i.settings = { ...this.plant.settings, ...i.settings || {} }, $e(this, "save", i), this._bmsg = c("bk.imported"), setTimeout(() => this._loadBackups(), 800);
      } catch (i) {
        this._bmsg = `${c("bk.invalid")} (${i?.message || i})`;
      }
  }
  _backupSection() {
    const e = (t) => c(`bk.reason.${t}`);
    return g`<div class="card wrap">
      <h2>${c("bk.title")}</h2>
      <p class="muted">${c("bk.hint")}</p>
      <div class="row">
        <button @click=${this._export}>${V("download")} ${c("bk.export")}</button>
        <label class="filebtn">${V("upload")} ${c("bk.import")}
          <input type="file" accept="application/json,.json" @change=${this._import} /></label>
        ${this._bmsg ? g`<span class="muted">${this._bmsg}</span>` : v}
      </div>
      ${this._backups === null ? v : this._backups.length ? g`<ul class="backups">
              ${this._backups.map(
      (t) => g`<li>
                  <div><b>${new Date(t.ts * 1e3).toLocaleString()}</b>
                    <span class="muted"> · ${e(t.reason)}${t.version ? ` · v${t.version}` : ""} · ${c("bk.components", { n: t.components })}</span></div>
                  <button @click=${() => this._restore(t)}>${V("undo")} ${c("bk.restore")}</button>
                </li>`
    )}
            </ul>` : g`<p class="muted">${c(this.api?.standalone ? "bk.demo" : "bk.none")}</p>`}
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
    const e = Mo(this.hass), t = Object.entries(e).some(([s, i]) => typeof i == "string" && s !== "enabled");
    this._energy = { ...this._en(), ...e }, this._note = c(t ? "st.energy_detected" : "st.energy_none");
  }
  _saveEnergy() {
    this._patch({ energy: this._en() }), this._energy = null, this._note = "";
  }
  _energySection() {
    const e = this._en(), t = (i, n) => g`<label class="field">${n}
        <cp-entity-picker .hass=${this.hass} .value=${e[i] || ""}
          @value-changed=${(r) => this._setEn({ [i]: r.detail || void 0 })}></cp-entity-picker></label>`, s = (i, n, r = !1) => g`<label class="check"><input type="checkbox" .checked=${e[i] ?? r}
        @change=${(a) => this._setEn({ [i]: a.target.checked })} />${n}</label>`;
    return g`<div class="card wrap">
      <h2>${c("st.energy")}</h2>
      <p class="muted">${c("st.energy_hint")}</p>
      ${s("enabled", c("st.energy_enabled"))}
      ${this.hass && !this.hass.__standalone ? g`<div class="row"><button @click=${this._detect}>${V("search")} ${c("st.energy_detect")}</button>
            ${this._note ? g`<span class="muted">${this._note}</span>` : v}</div>` : v}
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
        <button class="primary" ?disabled=${!this._energy} @click=${this._saveEnergy}>${V("save")} ${c("st.save")}</button></div>
    </div>`;
  }
  _patch(e) {
    const t = structuredClone(this.plant);
    t.settings = { ...t.settings, ...e }, $e(this, "save", t);
  }
  render() {
    const e = this.plant.settings;
    return g`<div class="card wrap">
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
          ${["auto", "de", "en"].map((t) => g`<option value=${t} ?selected=${(e.language || "auto") === t}>${t === "auto" ? c("st.lang.auto") : t === "de" ? "Deutsch" : "English"}</option>`)}
        </select></label>
      <label class="toggle"><input type="checkbox" .checked=${!!e.write_non_admin} @change=${(t) => this._patch({ write_non_admin: t.target.checked })} />
        <span><b>${c("st.write_non_admin")}</b><br /><span class="muted">${c("st.write_hint")}</span></span></label>
      <label class="field">${c("st.heat_load")}
        <input type="number" step="0.1" .value=${String(e.heat_load ?? 6.2)} @change=${(t) => this._patch({ heat_load: Number(t.target.value) })} /></label>
      <div class="row foot">
        <span class="muted">${c("st.version")} ${this.version}</span>
        <span class="spacer"></span>
        <button class="danger" @click=${() => confirm(c("st.reset_confirm")) && $e(this, "reset-plant")}>${c("st.reset")}</button>
      </div>
    </div>
    ${this._energySection()}
    ${this._tariffSection()}
    ${this._backupSection()}`;
  }
};
Rt.properties = {
  plant: { attribute: !1 },
  version: {},
  hass: { attribute: !1 },
  api: { attribute: !1 },
  _energy: { state: !0 },
  _note: { state: !0 },
  _backups: { state: !0 },
  _tariff: { state: !0 },
  _bmsg: { state: !0 }
}, Rt.styles = [
  he,
  ae`
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
let As = Rt;
for (const [o, e] of [
  ["cp-wizard", Ms],
  ["cp-mapping", zs],
  ["cp-icons", Es],
  ["cp-settings", As]
])
  customElements.get(o) || customElements.define(o, e);
const mr = 10 * 6e4, fr = 5e3;
function Vi(o) {
  return o === void 0 ? "#8b949e" : o >= 3.5 ? Ae.green : o >= 3 ? Ae.yellow : Ae.red;
}
let Bi = null;
const Nt = class Nt extends ne {
  constructor() {
    super(...arguments), this._chartKey = "", this._costs = [], this._costKey = "", this.sim = null, this.version = 0, this._data = null, this._error = "", this._loadedAt = 0, this._loadedFor = null;
  }
  connectedCallback() {
    super.connectedCallback(), Bi ??= import("./echart-fpxrpKrB.js").catch((e) => {
      Bi = null, console.error("COPilot: chart module failed to load", e);
    });
  }
  willUpdate() {
    const e = this.sim || this.plant, t = Date.now() - this._loadedAt;
    (e !== this._loadedFor || t > (this.sim ? fr : mr)) && (this._loadedFor = e, this._loadedAt = Date.now(), this._load());
  }
  async _load() {
    try {
      this._error = "", this.sim ? this._data = vo(this.sim) : this.hass && !this.hass.__standalone && (this._data = await bo(this.hass, this.plant));
      const e = (this._data?.daily || []).slice(-30);
      this._costs = await hr(e, this.plant, this.sim, this.hass && !this.hass.__standalone ? this.hass : void 0);
    } catch (e) {
      this._error = e?.message || String(e);
    }
  }
  _live() {
    const e = cn(this.plant, this.src), t = 62, s = 2 * Math.PI * t, i = e ? Math.min(1, e.cop / 7) : 0, n = e ? Ae[e.ampel] : "var(--cp-muted)";
    return g`<div class="card live">
      <div class="cap">${c("eff.live")}</div>
      <div class="gauge">
        <svg viewBox="0 0 160 160">
          <circle cx="80" cy="80" r=${t} class="track" />
          ${k`<circle cx="80" cy="80" r=${t} class="bar" style="stroke:${n};stroke-dasharray:${s * i} ${s}" />`}
        </svg>
        <div class="gv">
          <span class="big" style="color:${n}">${e ? F(e.cop, 1) : "–"}</span>
          <span class="muted">COP</span>
        </div>
      </div>
      ${e ? g`<div class="lv-row"><span>${c("eff.expected", { out: F(e.tOut, 0), flow: F(e.tFlow, 0) })}</span><b>${F(e.expected, 1)}</b></div>
            <div class="lv-row"><span>${c("eff.ratio")}</span><b style="color:${n}">${F(e.ratio * 100, 0)} %</b></div>
            <div class="verdict" style="border-color:${n}">${c(`eff.ampel.${e.ampel}`)}</div>` : g`<p class="muted small">${c("eff.no_live")}</p>`}
    </div>`;
  }
  _tile(e, t, s) {
    const i = $i(t), n = t && t.heat > 0 ? t.heatDhw / t.heat : void 0, r = t && t.el > 0 ? t.aux / t.el : void 0;
    return g`<div class="card tile">
      <div class="cap">${c(`eff.${e}`)} ${s ? g`<span class="est">${c("eff.estimate")}</span>` : v}</div>
      <div class="spf" style="color:${Vi(i)}">${i !== void 0 ? F(i, 2) : "–"}<small>${e === "today" || e === "yesterday" ? "AZ" : "JAZ"}</small></div>
      <div class="kv"><span>${c("eff.heat")}</span><b>${t ? F(t.heat, t.heat >= 100 ? 0 : 1) : "–"} kWh</b></div>
      <div class="kv"><span>${c("eff.el")}</span><b>${t ? F(t.el, t.el >= 100 ? 0 : 1) : "–"} kWh</b></div>
      <div class="kv"><span>${c("eff.dhw_share")}</span><b>${n !== void 0 ? F(n * 100, 0) + " %" : "–"}</b></div>
      <div class="kv"><span>${c("eff.aux_share")}</span><b>${r !== void 0 ? F(r * 100, 1) + " %" : "–"}</b></div>
    </div>`;
  }
  _chart(e) {
    const t = e.daily.slice(-30);
    if (!t.length) return v;
    const s = ci() === "de" ? "de-DE" : "en-GB", i = (a) => new Date(a).toLocaleDateString(s, { day: "2-digit", month: "2-digit" }), n = (a) => new Date(a).toLocaleDateString(s, { weekday: "short", day: "2-digit", month: "2-digit" }), r = JSON.stringify(t);
    return r !== this._chartKey && (this._chartKey = r, this._chartOption = (a) => ({
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
          const p = Array.isArray(l) ? l : [l], d = p[0]?.dataIndex ?? 0, h = p.map((m) => {
            const u = m.value;
            if (u == null || u === "-") return "";
            const w = m.seriesIndex === 2 ? "" : " kWh";
            return `<div style="display:flex;gap:10px;justify-content:space-between"><span>${m.marker}${m.seriesName}</span><b>${F(u, m.seriesIndex === 2 ? 2 : 1)}${w}</b></div>`;
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
            const p = $i(l);
            return p === void 0 ? null : { value: Math.round(p * 100) / 100, itemStyle: { color: Vi(p) } };
          }),
          markLine: {
            silent: !0,
            symbol: "none",
            label: { show: !1 },
            lineStyle: { color: Ae.yellow, type: "dotted", opacity: 0.6 },
            data: [{ yAxis: 3 }]
          }
        }
      ]
    })), g`<div class="card chart">
      <div class="cap">${c("eff.daily")}</div>
      <cp-echart .option=${this._chartOption}></cp-echart>
      ${e.estimated.month ? g`<p class="muted small">${c("eff.demo_note")}</p>` : v}
    </div>`;
  }
  // ------------------------------------------------------------ costs
  _costTile(e, t) {
    const s = (a) => `${F(a, a >= 100 ? 0 : 2)} €`, i = t && t.el > 0.05 && !t.noShare ? t.self / t.el : void 0, n = t && t.heat > 0.1 ? (t.cost + t.feedLoss) / t.heat : void 0, r = t && t.gas > 0.01 ? 1 - (t.cost + t.feedLoss) / t.gas : void 0;
    return g`<div class="card tile">
      <div class="cap">${c(`cost.${e}`)}${t?.estimated ? g` <span class="est">${c("eff.estimate")}</span>` : v}</div>
      <div class="spf">${t ? s(t.cost) : "–"}<small>${c("cost.grid_cost")}</small></div>
      <div class="kv"><span>${c("cost.pv_share")}</span><b>${i !== void 0 ? F(i * 100, 0) + " %" : "–"}</b></div>
      <div class="kv"><span>${c("cost.feed_loss")}</span><b>${t && !t.noShare ? s(t.feedLoss) : "–"}</b></div>
      <div class="kv"><span>${c("cost.per_kwh")}</span><b>${n !== void 0 ? F(n * 100, 1) + " ct" : "–"}</b></div>
      <div class="kv"><span>${c("cost.vs_gas")}</span><b class=${r !== void 0 && r >= 0 ? "good" : ""}>${t ? s(t.gas) : "–"}${r !== void 0 ? g` <small>(${r >= 0 ? "−" : "+"}${F(Math.abs(r) * 100, 0)} %)</small>` : v}</b></div>
    </div>`;
  }
  _costSection() {
    const e = this._costs;
    if (!e.length) return v;
    const t = e[e.length - 1], s = e.length > 1 ? e[e.length - 2] : null, i = JSON.stringify(e.map((n) => [n.day, n.grid, n.self, n.cost]));
    if (i !== this._costKey) {
      this._costKey = i;
      const n = ci() === "de" ? "de-DE" : "en-GB", r = (a) => new Date(a).toLocaleDateString(n, { day: "2-digit", month: "2-digit" });
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
          valueFormatter: (l) => typeof l == "number" ? F(l, 2) : String(l)
        },
        dataZoom: [{ type: "inside", minValueSpan: 5 }],
        xAxis: { type: "category", data: e.map((l) => r(l.day)), axisLine: { lineStyle: { color: a.border } }, axisTick: { show: !1 }, axisLabel: { color: a.muted, hideOverlap: !0 } },
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
    return g`
      <h3 class="sec">${c("cost.title")}</h3>
      <div class="tiles">
        ${this._costTile("today", cs([t]))}
        ${this._costTile("yesterday", s ? cs([s]) : null)}
        ${this._costTile("days30", cs(e))}
      </div>
      <div class="card chart">
        <div class="cap">${c("cost.daily")}</div>
        <cp-echart .option=${this._costOption}></cp-echart>
        <p class="muted small">${e.some((n) => n.noShare) ? c("cost.no_share") : ""} ${c("cost.hint")}</p>
      </div>`;
  }
  render() {
    const e = this._data;
    return g`
      <div class="grid">
        ${this._live()}
        <div class="tiles">
          ${this._tile("today", e?.today ?? null, !1)}
          ${this._tile("yesterday", e?.yesterday ?? null, !1)}
          ${this._tile("month", e?.month ?? null, !!e?.estimated.month)}
          ${this._tile("year", e?.year ?? null, !!e?.estimated.year)}
        </div>
      </div>
      ${this._error ? g`<div class="card err">${this._error}</div>` : v}
      ${e?.missing ? g`<div class="card hint">${c(`eff.missing.${e.missing}`)}</div>` : v}
      ${e ? this._chart(e) : v}
      ${this._costSection()}
    `;
  }
};
Nt.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  hass: { attribute: !1 },
  sim: { attribute: !1 },
  version: { type: Number },
  _data: { state: !0 },
  _error: { state: !0 },
  _costs: { state: !0 }
}, Nt.styles = [
  he,
  ae`
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
let Ws = Nt;
customElements.get("cp-efficiency") || customElements.define("cp-efficiency", Ws);
const Ps = 60;
function Se(o, e, t, s) {
  const i = new Array(t).fill(null), n = [...o].sort((l, p) => l.t - p.t);
  let r = 0, a = null;
  for (let l = 0; l < t; l++) {
    const p = e + l * Ps;
    for (; r < n.length && n[r].t <= p; ) a = s(n[r++]);
    i[l] = a;
  }
  return i;
}
const Me = (o) => o.v === null || Number.isNaN(o.v) ? null : o.v;
function Ri(o) {
  const e = [];
  let t = -1;
  return o.forEach((s, i) => {
    s && t < 0 && (t = i), !s && t >= 0 && (e.push([t, i]), t = -1);
  }), t >= 0 && e.push([t, o.length]), e;
}
function Ni(o) {
  const e = o.filter((t) => t !== null);
  return e.length ? e.reduce((t, s) => t + s, 0) / e.length : void 0;
}
const ps = (o, ...e) => o.components.find((t) => e.includes(t.type));
async function ve(o, e, t, s) {
  if (!e || o.get(e, t) === void 0) return [];
  try {
    return await o.history(e, t, s);
  } catch {
    return [];
  }
}
async function gr(o, e, t = 24, s = Date.now() / 1e3) {
  const i = ps(o, "outdoor_unit"), n = ps(o, "indoor_unit"), r = ps(o, "buffer"), a = Math.floor(t * 3600 / Ps), l = s - a * Ps, [p, d, h, m, u, w, _, y, b, x, $] = await Promise.all([
    ve(e, i, "compressor_on", t),
    ve(e, i, "compressor_speed", t),
    ve(e, i, "heat_power", t),
    ve(e, i, "activity", t),
    ve(e, n, "supply_temp", t),
    ve(e, n, "return_temp", t),
    ve(e, r, "temp_top", t),
    ve(e, n, "buffer_temp", t),
    ve(e, n, "aux_level", t),
    ve(e, n, "vw1_position", t),
    ve(e, n, "pressure", t)
  ]), A = p.length ? p : d.length ? d : h, L = Se(A, l, a, Me).map((R) => R !== null && R > (A === h ? 0.2 : 0)), W = Se(m, l, a, (R) => Je({ raw: R.raw ?? null, available: R.raw !== void 0 }) ?? null), G = W.map((R) => R === "defrost"), U = Se(x, l, a, Me).map((R, B) => R !== null ? R > 0 : W[B] === "hot_water"), ce = L.map((R, B) => R && !G[B] && !U[B]), oe = ce.map((R, B) => R && ce.slice(Math.max(0, B - 5), B).every(Boolean) && B >= 5), ee = A.length > 0, j = [], te = _.length ? _ : y;
  if (r || y.length) {
    const R = Se(u, l, a, Me), B = Se(te, l, a, Me), q = R.map((J, re) => oe[re] && J !== null && B[re] !== null ? J - B[re] : null), N = Ni(q);
    j.push(
      N === void 0 ? { id: "mixing", ampel: "none", detail: "chk.nodata", params: {} } : {
        id: "mixing",
        ampel: N <= 2 ? "green" : N <= 4 ? "yellow" : "red",
        value: `${F(N, 1)} K`,
        detail: "chk.mixing.detail",
        params: { value: N, minutes: q.filter((J) => J !== null).length },
        hint: "chk.mixing.hint"
      }
    );
  }
  if (ee) {
    const B = Ri(L).filter(([M]) => M > 0), q = B.length, N = B.length ? B.reduce((M, [S, D]) => M + (D - S), 0) / B.length : void 0;
    let J = 0;
    for (let M = 0; M + 60 <= a; M += 10) J = Math.max(J, B.filter(([S]) => S >= M && S < M + 60).length);
    const re = q / t, I = re <= 1 && J <= 3 && (N ?? 99) >= 20 ? "green" : J > 4 || (N ?? 99) < 10 ? "red" : "yellow";
    j.push({
      id: "cycling",
      ampel: q === 0 ? "green" : I,
      value: `${q}×`,
      detail: "chk.cycling.detail",
      params: { starts: q, perHour: re, maxPerHour: J, avgRun: N ?? 0, hours: t },
      hint: "chk.cycling.hint"
    });
  } else
    j.push({ id: "cycling", ampel: "none", detail: "chk.nodata", params: {} });
  {
    const R = Se(u, l, a, Me), B = Se(w, l, a, Me), q = R.map((J, re) => oe[re] && J !== null && B[re] !== null ? J - B[re] : null), N = Ni(q);
    j.push(
      N === void 0 ? { id: "spread", ampel: "none", detail: "chk.nodata", params: {} } : {
        id: "spread",
        ampel: N >= 3 && N <= 8 ? "green" : N >= 2 && N <= 10 ? "yellow" : "red",
        value: `${F(N, 1)} K`,
        detail: "chk.spread.detail",
        params: { value: N },
        hint: N < 3 ? "chk.spread.hint_low" : "chk.spread.hint_high"
      }
    );
  }
  if (m.length) {
    const R = Ri(G), B = R.reduce((J, [re, I]) => J + (I - re), 0), q = L.filter(Boolean).length || 1, N = B / q;
    j.push({
      id: "defrost",
      ampel: N <= 0.08 ? "green" : N <= 0.15 ? "yellow" : "red",
      value: `${R.length}×`,
      detail: "chk.defrost.detail",
      params: { count: R.length, minutes: B, share: N * 100 },
      hint: "chk.defrost.hint"
    });
  }
  if (b.length) {
    const B = Se(b, l, a, Me).map((q) => q !== null && q > 0).filter(Boolean).length;
    j.push({
      id: "aux",
      ampel: B === 0 ? "green" : B <= 60 ? "yellow" : "red",
      value: B ? `${Math.round(B)} min` : "0",
      detail: "chk.aux.detail",
      params: { minutes: B },
      hint: "chk.aux.hint"
    });
  }
  if ($.length && n) {
    const R = $.map(Me).filter((I) => I !== null), B = Number(n.props.pressure_min ?? 1), q = Number(n.props.pressure_max ?? 2.7), N = Math.min(...R), J = Math.max(...R), re = R.length ? R[0] - R[R.length - 1] : 0;
    j.push({
      id: "pressure",
      ampel: N < B || J > q ? "red" : N < B + 0.2 || re > 0.2 ? "yellow" : "green",
      value: `${F(N, 1)}–${F(J, 1)} bar`,
      detail: "chk.pressure.detail",
      params: { min: N, max: J, lo: B, hi: q },
      hint: "chk.pressure.hint"
    });
  }
  return j;
}
const _r = 2e4, wr = 5 * 6e4;
function Ii(o) {
  const e = {};
  for (const [t, s] of Object.entries(o)) e[t] = typeof s == "number" ? F(s, Number.isInteger(s) ? 0 : 1) : s;
  return e;
}
const It = class It extends ne {
  constructor() {
    super(...arguments), this.sim = null, this.version = 0, this._results = null, this._busy = !1, this._at = 0, this._for = null;
  }
  willUpdate() {
    const e = this.sim || this.plant;
    (e !== this._for || Date.now() - this._at > (this.sim ? _r : wr)) && (this._for = e, this._at = Date.now(), this._run());
  }
  async _run() {
    if (!this._busy) {
      this._busy = !0;
      try {
        this._results = await gr(this.plant, this.src, 24, this.sim ? this.sim.time : Date.now() / 1e3);
      } finally {
        this._busy = !1;
      }
    }
  }
  render() {
    const e = this._results, t = (s) => (e || []).filter((i) => i.ampel === s).length;
    return g`
      <div class="card head">
        <div>
          <h2>${c("chk.title")}</h2>
          <p class="muted">${c("chk.subtitle")}${this.sim ? ` ${c("chk.demo")}` : ""}</p>
        </div>
        <span class="spacer"></span>
        ${e ? g`<div class="sum">
              ${["green", "yellow", "red"].map((s) => g`<span class="dot" style="background:${Ae[s]}"></span><b>${t(s)}</b>`)}
            </div>` : v}
        <button @click=${() => this._run()} ?disabled=${this._busy}>${c("chk.refresh")}</button>
      </div>
      ${e ? g`<div class="list">
            ${e.map(
      (s) => g`<div class="card item ${s.ampel}">
                <span class="lamp" style="background:${s.ampel === "none" ? "var(--cp-muted)" : Ae[s.ampel]}"></span>
                <div class="body">
                  <div class="row nowrap">
                    <b class="title">${c(`chk.${s.id}.title`)}</b>
                    <span class="spacer"></span>
                    ${s.value ? g`<span class="val">${s.value}</span>` : v}
                  </div>
                  <div class="detail">${c(s.detail, Ii(s.params))}</div>
                  ${s.hint && (s.ampel === "yellow" || s.ampel === "red") ? g`<div class="hint">${c(s.hint, Ii(s.params))}</div>` : v}
                  ${s.ampel === "green" ? g`<div class="ok">${c("chk.ok")}</div>` : v}
                </div>
              </div>`
    )}
          </div>` : g`<div class="card muted">${c("chk.running")}</div>`}
    `;
  }
};
It.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  sim: { attribute: !1 },
  version: { type: Number },
  _results: { state: !0 },
  _busy: { state: !0 }
}, It.styles = [
  he,
  ae`
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
let Cs = It;
customElements.get("cp-check") || customElements.define("cp-check", Cs);
const it = [
  { key: "design", slot: "design_temp", min: 28, max: 65, step: 1 },
  { key: "offset", slot: "offset_temp", min: -10, max: 10, step: 0.5 },
  { key: "limit", slot: "heating_limit", min: 10, max: 22, step: 0.5 },
  { key: "minFlow", slot: "min_flow_temp", min: 15, max: 40, step: 1 },
  { key: "maxFlow", slot: "max_flow_temp", min: 30, max: 75, step: 1 },
  { key: "minExt", slot: "min_ext_temp", min: -25, max: 0, step: 1 },
  { key: "roomSet", slot: "room_setpoint", min: 15, max: 25, step: 0.5 }
], Fe = 14, ji = -20, ds = 22, br = 20, vr = 70;
let Ki = null;
const jt = class jt extends ne {
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
    const t = nn(e?.type === "floor_heating");
    if (!e) return t;
    for (const s of it) {
      const i = this.src.get(e, s.slot);
      i?.available && i.num !== null && (t[s.key] = i.num);
    }
    return t;
  }
  _writable(e) {
    if (this.sim) return !0;
    const t = this._circuit, s = it.find((n) => n.key === e), i = t?.bindings[s.slot];
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
    for (let r = 0; r < 24; r++) {
      const a = e.time - (24 - r) * 3600, l = (u) => u.filter((w) => w.t >= a && w.t < a + 3600 && w.v !== null).map((w) => w.v), p = l(s), d = l(i), h = l(n);
      if (!p.length || !d.length) continue;
      const m = (u) => u.reduce((w, _) => w + _, 0) / u.length;
      m(p) >= e.curve.limit || t.push({ tOut: m(p), flow: m(d), room: h.length ? m(h) : void 0, age: 0 });
    }
    for (let r = 1; r < Fe; r++)
      for (let a = 0; a < 24; a += 2) {
        const l = e.outdoorMean + 2.5 * Math.cos((a - 15) / 24 * 2 * Math.PI) + Math.sin(r * 1.7 + a) * 3, p = ot(e.curve, l);
        p !== null && t.push({ tOut: l, flow: p + Math.sin(r * 3.1 + a * 0.7) * 1.4 - 0.6, room: e.curve.roomSet + Math.sin(r + a) * 0.3, age: r / Fe });
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
    const n = /* @__PURE__ */ new Date(), r = new Date(n.getTime() - Fe * 864e5), a = await this.hass.callWS({
      type: "recorder/statistics_during_period",
      start_time: r.toISOString(),
      end_time: n.toISOString(),
      statistic_ids: Object.values(i).filter(Boolean),
      period: "hour",
      types: ["mean"]
    }), l = (_) => new Map((_ ? a[_] || [] : []).map((y) => [y.start, y.mean])), p = l(i.out), d = l(i.flow), h = l(i.room), m = l(i.heat), u = this._current().limit, w = [];
    for (const [_, y] of p) {
      const b = d.get(_);
      if (y == null || b == null || y >= u) continue;
      const x = m.get(_);
      m.size && (x == null || x < 0.3) || w.push({ tOut: y, flow: b, room: h.get(_) ?? void 0, age: (n.getTime() - _) / (Fe * 864e5) });
    }
    return w;
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
        const n = it.find((a) => a.key === s), r = t.bindings[n.slot];
        r && await this.hass.callWS({
          type: "call_service",
          domain: r.split(".")[0],
          service: "set_value",
          service_data: { entity_id: r, value: i }
        });
      }
    }
    this._edit = {}, this._msg = c("cv.applied");
  }
  // ------------------------------------------------------------ render
  _chart(e, t, s) {
    const i = (b) => {
      const x = [];
      for (let $ = ji; $ <= Math.min(ds, b.limit); $ += 0.5) {
        const A = ot(b, $);
        if (A === null) break;
        x.push([$, Math.round(A * 10) / 10]);
      }
      return x;
    }, n = this._circuit, r = this.plant.components.find((b) => b.type === "outdoor_unit"), a = this.plant.components.find((b) => b.type === "indoor_unit"), l = r ? this.src.get(r, "outdoor_temp") : void 0, p = n && this.src.get(n, "flow_temp") || a && this.src.get(a, "supply_temp"), d = l?.available ? l.num : null, h = p?.available ? p.num : null, m = d !== null ? ot(e, d) : null, u = i(e), w = t ? i(t) : [], _ = (b) => `${F(b, Number.isInteger(b) ? 0 : 1)} °C`;
    return g`<cp-echart class="curve-chart" .option=${(b) => ({
      animation: !1,
      textStyle: { fontFamily: "inherit" },
      grid: { left: 8, right: 16, top: 30, bottom: 8, containLabel: !0 },
      tooltip: {
        trigger: "item",
        backgroundColor: b.surface,
        borderColor: b.border,
        textStyle: { color: b.text, fontSize: 12 },
        formatter: (x) => {
          const [$, A] = x.value;
          return `<b>${x.seriesName}</b><br>${c("cv.tip", { out: _($), flow: _(A) })}`;
        }
      },
      xAxis: {
        type: "value",
        min: ji,
        max: ds,
        interval: 10,
        axisLabel: { color: b.muted, formatter: (x) => `${x} °C` },
        axisLine: { lineStyle: { color: b.border } },
        splitLine: { lineStyle: { color: b.border, type: "dashed" } }
      },
      yAxis: {
        type: "value",
        min: br,
        max: vr,
        interval: 10,
        name: c("cv.axis_flow"),
        nameTextStyle: { color: b.muted, align: "left" },
        axisLine: { show: !1, onZero: !1 },
        axisLabel: { color: b.muted },
        splitLine: { lineStyle: { color: b.border, type: "dashed" } }
      },
      series: [
        {
          name: c("cv.points", { days: Fe }),
          type: "scatter",
          symbolSize: 6,
          z: 1,
          data: s.map((x) => ({ value: [x.tOut, Math.round(x.flow * 10) / 10], itemStyle: { color: "#f5c542", opacity: 0.85 - x.age * 0.6 } })),
          markArea: {
            silent: !0,
            itemStyle: { color: "rgba(77,159,255,0.08)" },
            label: { color: b.muted, position: "insideTop" },
            data: [[{ name: c("cv.no_heating"), xAxis: e.limit }, { xAxis: ds }]]
          }
        },
        {
          name: c("cv.curve"),
          type: "line",
          showSymbol: !1,
          z: 3,
          data: u,
          lineStyle: { color: "#3ddc97", width: 3 },
          itemStyle: { color: "#3ddc97" }
        },
        {
          name: c("cv.preview"),
          type: "line",
          showSymbol: !1,
          z: 4,
          data: w,
          lineStyle: { color: "#4d9fff", width: 2.5, type: "dashed" },
          itemStyle: { color: "#4d9fff" }
        },
        {
          name: c("cv.target"),
          type: "scatter",
          z: 5,
          symbolSize: 13,
          data: d !== null && m !== null ? [[d, Math.round(m * 10) / 10]] : [],
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
    super.connectedCallback(), Ki ??= import("./echart-fpxrpKrB.js").catch((e) => {
      Ki = null, console.error("COPilot: chart module failed to load", e);
    });
  }
  render() {
    const e = this._current(), t = Object.keys(this._edit).length > 0, s = t ? { ...e, ...this._edit } : null, i = s || e, n = this._points || [], r = n.filter((h) => h.age < 0.5 && h.room !== void 0).map((h) => h.room), a = r.length ? r.reduce((h, m) => h + m, 0) / r.length : void 0, l = n.length ? n.reduce((h, m) => h + (m.flow - (ot(e, m.tOut) ?? m.flow)), 0) / n.length : void 0, p = a !== void 0 ? Xn(e, a) : 0, d = this._circuits;
    return g`
      <div class="grid">
        <div class="card chart-card">
          <div class="row head">
            <h2>${c("cv.title")}</h2>
            ${d.length > 1 ? g`<select @change=${(h) => this._hc = h.target.value}>
                  ${d.map((h) => g`<option value=${h.id} ?selected=${h.id === this._circuit?.id}>${h.label}</option>`)}
                </select>` : g`<span class="muted">${this._circuit?.label || ""}</span>`}
            <span class="spacer"></span>
            <span class="lg"><i class="l-curve"></i>${c("cv.curve")}</span>
            ${s ? g`<span class="lg"><i class="l-next"></i>${c("cv.preview")}</span>` : v}
            <span class="lg"><i class="l-pt"></i>${c("cv.points", { days: Fe })}</span>
            <span class="lg"><i class="l-live"></i>${c("cv.now")}</span>
          </div>
          ${this._chart(e, s, n)}
          ${this.sim ? g`<p class="muted small">${c("cv.demo_note")}</p>` : v}
          ${!this.sim && this._points && !n.length ? g`<p class="muted small">${c("cv.no_points")}</p>` : v}
        </div>
        <div class="side">
          <div class="card">
            <div class="cap">${c("cv.params")}</div>
            ${it.map((h) => {
      const m = i[h.key], u = h.key in this._edit, w = this._writable(h.key);
      return g`<label class="param ${u ? "changed" : ""}">
                <span class="pname">${c(`cv.p.${h.key}`)}</span>
                <b>${F(m, h.step < 1 ? 1 : 0)} ${h.key === "offset" ? "K" : "°C"}</b>
                <input type="range" min=${h.min} max=${h.max} step=${h.step} .value=${String(m)} ?disabled=${!w}
                  @input=${(_) => this._set(h.key, Number(_.target.value))} />
              </label>`;
    })}
            ${!this.sim && !it.some((h) => this._writable(h.key)) ? g`<p class="muted small">${c("cv.readonly")}</p>` : v}
            <div class="row actions">
              <button ?disabled=${!t} @click=${() => this._edit = {}}>${c("discard")}</button>
              <span class="spacer"></span>
              <button class="primary" ?disabled=${!t} @click=${() => this._confirm = !0}>${V("check")} ${c("apply")}</button>
            </div>
            ${this._msg ? g`<p class="ok">${this._msg}</p>` : v}
          </div>
          <div class="card">
            <div class="cap">${c("cv.analysis")}</div>
            ${l !== void 0 ? g`<p class="small">${c(l >= 0 ? "cv.deviation_above" : "cv.deviation_below", { value: Math.abs(l) })}</p>` : v}
            ${a !== void 0 ? g`<p class="small">${c("cv.room", { room: a, set: e.roomSet })}</p>
                  ${Math.abs(p) >= 0.5 ? g`<div class="hint">${c(p < 0 ? "cv.suggest_down" : "cv.suggest_up", { value: Math.abs(p), target: e.offset + p })}
                        <button class="small-btn" @click=${() => this._set("offset", e.offset + p)}>${c("cv.try")}</button></div>` : g`<p class="ok small">${c("cv.fits")}</p>`}` : g`<p class="muted small">${c("cv.no_room")}</p>`}
          </div>
        </div>
      </div>
      ${this._confirm ? g`<div class="backdrop" @click=${() => this._confirm = !1}></div>
            <div class="dialog card">
              <h3>${c("cv.confirm_title")}</h3>
              <ul>${Object.entries(this._edit).map(
      ([h, m]) => g`<li>${c(`cv.p.${h}`)}: ${F(e[h], 1)} → <b>${F(m, 1)}</b></li>`
    )}</ul>
              <p class="muted small">${this.sim ? c("cv.confirm_demo") : c("cv.confirm_live")}</p>
              <div class="row"><span class="spacer"></span>
                <button @click=${() => this._confirm = !1}>${c("cancel")}</button>
                <button class="primary" @click=${this._apply}>${c("apply")}</button></div>
            </div>` : v}
    `;
  }
};
jt.properties = {
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
}, jt.styles = [
  he,
  ae`
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
let Ts = jt;
customElements.get("cp-curve") || customElements.define("cp-curve", Ts);
const Kt = class Kt extends ne {
  constructor() {
    super(...arguments), this.isPanel = !1, this._config = { type: "custom:copilot-card" }, this._ctl = new rn(this, !1);
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
    return g`<ha-card style="height:${s}">
      ${this._ctl.error ? g`<div class="err">${this._ctl.error}</div>` : v}
      ${t ? g`<cp-overview
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
          ></cp-overview>` : g`<div class="loading">${fs}</div>`}
    </ha-card>`;
  }
};
Kt.properties = {
  hass: { attribute: !1 },
  isPanel: { type: Boolean },
  _config: { state: !0 }
}, Kt.styles = [
  an,
  he,
  ae`
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
let Ls = Kt;
const Ft = class Ft extends ne {
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
    const e = this._config, t = (s, i, n) => g`<label class="row">
      <input type="checkbox" .checked=${e[s] ?? n} @change=${(r) => this._set(s, r.target.checked)} />
      ${i}</label>`;
    return g`<div class="ed">
      ${t("show_kpis", c("card.show_kpis"), !0)}
      ${t("show_messages", c("card.show_messages"), !1)}
      ${t("show_demo_controls", c("card.show_demo"), !1)}
      <label class="field">${c("card.height")}
        <input .value=${e.height || ""} placeholder="560px" @change=${(s) => this._set("height", s.target.value.trim())} /></label>
      <p class="hint">${c("card.hint")}</p>
    </div>`;
  }
};
Ft.properties = { hass: { attribute: !1 }, _config: { state: !0 } }, Ft.styles = [
  he,
  ae`
      .ed { display: grid; gap: 10px; color: var(--primary-text-color); }
      .row { display: flex; gap: 8px; align-items: center; font-size: 14px; }
      .field { color: var(--secondary-text-color); }
      input:not([type]) { background: transparent; color: var(--primary-text-color); border-color: var(--divider-color); }
      .hint { font-size: 12px; color: var(--secondary-text-color); margin: 0; }
    `
];
let Ds = Ft;
customElements.get("copilot-card") || customElements.define("copilot-card", Ls);
customElements.get("copilot-card-editor") || customElements.define("copilot-card-editor", Ds);
const Et = window;
Et.customCards = Et.customCards || [];
Et.customCards.some((o) => o.type === "copilot-card") || Et.customCards.push({
  type: "copilot-card",
  name: "COPilot",
  description: "Animated heat pump schematic with live values",
  preview: !1,
  documentationURL: "https://github.com/junky84/copilot"
});
const Fi = "copilot.view";
function yr(o) {
  try {
    return localStorage.getItem(o);
  } catch {
    return null;
  }
}
function xr(o, e) {
  try {
    localStorage.setItem(o, e);
  } catch {
  }
}
const Ut = class Ut extends ne {
  constructor() {
    super(), this.narrow = !1, this._ctl = new rn(this), this._view = "overview", this._sub = "editor", this._toast = "";
    const e = yr(Fi);
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
    this._view = e, t && (this._sub = t), xr(Fi, `${this._view}:${this._sub}`);
  }
  _fullscreen() {
    document.fullscreenElement ? document.exitFullscreen() : this.requestFullscreen?.().catch(() => {
    });
  }
  render() {
    const e = this._ctl.plant, t = this._ctl.messages.filter((s) => s.active && (s.level === "warning" || s.level === "error")).length;
    return g`<div class="shell">
      <header>
        ${this.narrow ? g`<button class="ghost icon" title=${c("menu")} @click=${() => this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: !0, composed: !0 }))}>${V("menu")}</button>` : v}
        <div class="brand">${fs}<span>COP<b>ilot</b></span></div>
        <nav>
          ${["overview", "efficiency", "check", "curve", "maintenance", "messages", "config"].map(
      (s) => g`<button class="tab ${this._view === s ? "on" : ""}" title=${c(`nav.${s}`)} @click=${() => this._go(s)}>
              ${V(s === "overview" ? "grid" : s === "efficiency" ? "chart" : s === "check" ? "check" : s === "curve" ? "curve" : s === "maintenance" ? "wrench" : s === "messages" ? "bell" : "gear")}
              <span class="tl">${c(`nav.${s}`)}</span>
              ${s === "messages" && t ? g`<span class="badge">${t}</span>` : v}
            </button>`
    )}
        </nav>
        <span class="spacer"></span>
        ${e?.settings.demo ? g`<span class="demo-pill">${V("flask")}<span class="tl">${c("demo")}</span></span>` : v}
        <button class="ghost icon" title=${c("fullscreen")} @click=${this._fullscreen}>${V("expand")}</button>
      </header>
      <main>
        ${this._ctl.error ? g`<div class="card err">${this._ctl.error}</div>` : v}
        ${this._ctl.api?.standalone ? g`<div class="note muted">${c("standalone_hint")}</div>` : v}
        ${e ? this._content(e) : g`<div class="loading">${fs}</div>`}
      </main>
      ${this._toast ? g`<div class="toast">${this._toast}</div>` : v}
    </div>`;
  }
  _content(e) {
    const t = this._ctl.src;
    if (this._view === "overview")
      return g`<cp-overview
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
      return g`<cp-efficiency
        .plant=${e}
        .src=${t}
        .hass=${this.hass}
        .sim=${this._ctl.sim}
        .version=${this._ctl.version}
      ></cp-efficiency>`;
    if (this._view === "check")
      return g`<cp-check .plant=${e} .src=${t} .sim=${this._ctl.sim} .version=${this._ctl.version}></cp-check>`;
    if (this._view === "curve")
      return g`<cp-curve .plant=${e} .src=${t} .hass=${this.hass} .sim=${this._ctl.sim} .version=${this._ctl.version} ?admin=${this._ctl.admin}></cp-curve>`;
    if (this._view === "maintenance")
      return g`<cp-maintenance .plant=${e} ?admin=${this._ctl.admin} @save=${(n) => this._save(n.detail)}></cp-maintenance>`;
    if (this._view === "messages")
      return g`<div class="card pad"><cp-messages
        .messages=${this._ctl.messages}
        ?canClear=${this._ctl.admin && !this._ctl.sim}
        @clear=${() => this._ctl.clearMessages()}
      ></cp-messages></div>`;
    if (!this._ctl.admin) return g`<div class="card">${c("readonly_hint")}</div>`;
    const s = ["wizard", "editor", "mapping", "icons", "settings"], i = (n) => this._save(n.detail);
    return g`
      <div class="subnav">
        ${s.map((n) => g`<button class="sub ${this._sub === n ? "on" : ""}" @click=${() => this._go("config", n)}>${c(`cfg.${n}`)}</button>`)}
      </div>
      <div class="cfg ${this._sub === "editor" ? "fill" : ""}">
        ${this._sub === "wizard" ? g`<cp-wizard .plant=${e} @plant-generated=${async (n) => {
      await this._save(n.detail), this._showToast(c("wz.done")), this._go("config", "editor");
    }}></cp-wizard>` : v}
        ${this._sub === "editor" ? g`<cp-editor .plant=${e} .hass=${this.hass} .src=${t} .icons=${this._ctl.icons} .version=${this._ctl.version} @save=${i}></cp-editor>` : v}
        ${this._sub === "mapping" ? g`<cp-mapping .plant=${e} .hass=${this.hass} .api=${this._ctl.api} @save=${i}></cp-mapping>` : v}
        ${this._sub === "icons" ? g`<cp-icons .plant=${e} .api=${this._ctl.api} .icons=${this._ctl.icons} @save=${i} @icons-changed=${() => this._ctl.loadIcons()}></cp-icons>` : v}
        ${this._sub === "settings" ? g`<cp-settings .plant=${e} .hass=${this.hass} .api=${this._ctl.api} .version=${this._ctl.backendVersion} @save=${i}
              @plant-restored=${(n) => {
      this._ctl.setPlant(n.detail), this._showToast(c("bk.restored"));
    }}
              @reset-plant=${() => this._save({ ...ms(), settings: { ...ms().settings, demo: !0 } })}></cp-settings>` : v}
      </div>
    `;
  }
};
Ut.properties = {
  hass: { attribute: !1 },
  narrow: { type: Boolean },
  route: { attribute: !1 },
  panel: { attribute: !1 },
  _view: { state: !0 },
  _sub: { state: !0 },
  _toast: { state: !0 }
}, Ut.styles = [
  an,
  he,
  ae`
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
let Os = Ut;
customElements.get("copilot-panel") || customElements.define("copilot-panel", Os);
export {
  Os as C,
  ae as a,
  g as b,
  ne as i
};
