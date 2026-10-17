/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt = globalThis, gs = nt.ShadowRoot && (nt.ShadyCSS === void 0 || nt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, _s = Symbol(), ks = /* @__PURE__ */ new WeakMap();
let _i = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== _s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (gs && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = ks.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && ks.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Oi = (o) => new _i(typeof o == "string" ? o : o + "", void 0, _s), ee = (o, ...e) => {
  const t = o.length === 1 ? o[0] : e.reduce((s, n, i) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + o[i + 1], o[0]);
  return new _i(t, o, _s);
}, Vi = (o, e) => {
  if (gs) o.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), n = nt.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = t.cssText, o.appendChild(s);
  }
}, Ms = gs ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return Oi(t);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Bi, defineProperty: Ri, getOwnPropertyDescriptor: Ii, getOwnPropertyNames: Ni, getOwnPropertySymbols: Ki, getPrototypeOf: Fi } = Object, Ct = globalThis, Ss = Ct.trustedTypes, ji = Ss ? Ss.emptyScript : "", Ui = Ct.reactiveElementPolyfillSupport, Fe = (o, e) => o, Zt = { toAttribute(o, e) {
  switch (e) {
    case Boolean:
      o = o ? ji : null;
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
} }, vi = (o, e) => !Bi(o, e), zs = { attribute: !0, type: String, converter: Zt, reflect: !1, useDefault: !1, hasChanged: vi };
Symbol.metadata ??= Symbol("metadata"), Ct.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Pe = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = zs) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(e, s, t);
      n !== void 0 && Ri(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: n, set: i } = Ii(this.prototype, e) ?? { get() {
      return this[t];
    }, set(r) {
      this[t] = r;
    } };
    return { get: n, set(r) {
      const a = n?.call(this);
      i?.call(this, r), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? zs;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Fe("elementProperties"))) return;
    const e = Fi(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Fe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Fe("properties"))) {
      const t = this.properties, s = [...Ni(t), ...Ki(t)];
      for (const n of s) this.createProperty(n, t[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, n] of t) this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const n = this._$Eu(t, s);
      n !== void 0 && this._$Eh.set(n, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const n of s) t.unshift(Ms(n));
    } else e !== void 0 && t.push(Ms(e));
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
    return Vi(e, this.constructor.elementStyles), e;
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
    const s = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, s);
    if (n !== void 0 && s.reflect === !0) {
      const i = (s.converter?.toAttribute !== void 0 ? s.converter : Zt).toAttribute(t, s.type);
      this._$Em = e, i == null ? this.removeAttribute(n) : this.setAttribute(n, i), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const s = this.constructor, n = s._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const i = s.getPropertyOptions(n), r = typeof i.converter == "function" ? { fromAttribute: i.converter } : i.converter?.fromAttribute !== void 0 ? i.converter : Zt;
      this._$Em = n;
      const a = r.fromAttribute(t, i.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, n = !1, i) {
    if (e !== void 0) {
      const r = this.constructor;
      if (n === !1 && (i = this[e]), s ??= r.getPropertyOptions(e), !((s.hasChanged ?? vi)(i, t) || s.useDefault && s.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: n, wrapped: i }, r) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, r ?? t ?? this[e]), i !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), n === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [n, i] of this._$Ep) this[n] = i;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, i] of s) {
        const { wrapped: r } = i, a = this[n];
        r !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, i, a);
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
Pe.elementStyles = [], Pe.shadowRootOptions = { mode: "open" }, Pe[Fe("elementProperties")] = /* @__PURE__ */ new Map(), Pe[Fe("finalized")] = /* @__PURE__ */ new Map(), Ui?.({ ReactiveElement: Pe }), (Ct.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vs = globalThis, Es = (o) => o, ct = vs.trustedTypes, As = ct ? ct.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, wi = "$lit$", fe = `lit$${Math.random().toFixed(9).slice(2)}$`, bi = "?" + fe, Zi = `<${bi}>`, Me = document, Ue = () => Me.createComment(""), Ze = (o) => o === null || typeof o != "object" && typeof o != "function", ws = Array.isArray, Gi = (o) => ws(o) || typeof o?.[Symbol.iterator] == "function", Lt = `[ 	
\f\r]`, He = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ws = /-->/g, Ps = />/g, we = RegExp(`>|${Lt}(?:([^\\s"'>=/]+)(${Lt}*=${Lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Cs = /'/g, Ds = /"/g, yi = /^(?:script|style|textarea|title)$/i, xi = (o) => (e, ...t) => ({ _$litType$: o, strings: e, values: t }), f = xi(1), k = xi(2), De = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), Ts = /* @__PURE__ */ new WeakMap(), ye = Me.createTreeWalker(Me, 129);
function $i(o, e) {
  if (!ws(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return As !== void 0 ? As.createHTML(e) : e;
}
const Yi = (o, e) => {
  const t = o.length - 1, s = [];
  let n, i = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = He;
  for (let a = 0; a < t; a++) {
    const l = o[a];
    let d, h, p = -1, m = 0;
    for (; m < l.length && (r.lastIndex = m, h = r.exec(l), h !== null); ) m = r.lastIndex, r === He ? h[1] === "!--" ? r = Ws : h[1] !== void 0 ? r = Ps : h[2] !== void 0 ? (yi.test(h[2]) && (n = RegExp("</" + h[2], "g")), r = we) : h[3] !== void 0 && (r = we) : r === we ? h[0] === ">" ? (r = n ?? He, p = -1) : h[1] === void 0 ? p = -2 : (p = r.lastIndex - h[2].length, d = h[1], r = h[3] === void 0 ? we : h[3] === '"' ? Ds : Cs) : r === Ds || r === Cs ? r = we : r === Ws || r === Ps ? r = He : (r = we, n = void 0);
    const u = r === we && o[a + 1].startsWith("/>") ? " " : "";
    i += r === He ? l + Zi : p >= 0 ? (s.push(d), l.slice(0, p) + wi + l.slice(p) + fe + u) : l + fe + (p === -2 ? a : u);
  }
  return [$i(o, i + (o[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class Ge {
  constructor({ strings: e, _$litType$: t }, s) {
    let n;
    this.parts = [];
    let i = 0, r = 0;
    const a = e.length - 1, l = this.parts, [d, h] = Yi(e, t);
    if (this.el = Ge.createElement(d, s), ye.currentNode = this.el.content, t === 2 || t === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (n = ye.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const p of n.getAttributeNames()) if (p.endsWith(wi)) {
          const m = h[r++], u = n.getAttribute(p).split(fe), _ = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: i, name: _[2], strings: u, ctor: _[1] === "." ? Xi : _[1] === "?" ? Ji : _[1] === "@" ? Qi : Dt }), n.removeAttribute(p);
        } else p.startsWith(fe) && (l.push({ type: 6, index: i }), n.removeAttribute(p));
        if (yi.test(n.tagName)) {
          const p = n.textContent.split(fe), m = p.length - 1;
          if (m > 0) {
            n.textContent = ct ? ct.emptyScript : "";
            for (let u = 0; u < m; u++) n.append(p[u], Ue()), ye.nextNode(), l.push({ type: 2, index: ++i });
            n.append(p[m], Ue());
          }
        }
      } else if (n.nodeType === 8) if (n.data === bi) l.push({ type: 2, index: i });
      else {
        let p = -1;
        for (; (p = n.data.indexOf(fe, p + 1)) !== -1; ) l.push({ type: 7, index: i }), p += fe.length - 1;
      }
      i++;
    }
  }
  static createElement(e, t) {
    const s = Me.createElement("template");
    return s.innerHTML = e, s;
  }
}
function Te(o, e, t = o, s) {
  if (e === De) return e;
  let n = s !== void 0 ? t._$Co?.[s] : t._$Cl;
  const i = Ze(e) ? void 0 : e._$litDirective$;
  return n?.constructor !== i && (n?._$AO?.(!1), i === void 0 ? n = void 0 : (n = new i(o), n._$AT(o, t, s)), s !== void 0 ? (t._$Co ??= [])[s] = n : t._$Cl = n), n !== void 0 && (e = Te(o, n._$AS(o, e.values), n, s)), e;
}
class qi {
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
    const { el: { content: t }, parts: s } = this._$AD, n = (e?.creationScope ?? Me).importNode(t, !0);
    ye.currentNode = n;
    let i = ye.nextNode(), r = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new qe(i, i.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(i, l.name, l.strings, this, e) : l.type === 6 && (d = new en(i, this, e)), this._$AV.push(d), l = s[++a];
      }
      r !== l?.index && (i = ye.nextNode(), r++);
    }
    return ye.currentNode = Me, n;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class qe {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, s, n) {
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    e = Te(this, e, t), Ze(e) ? e === w || e == null || e === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : e !== this._$AH && e !== De && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Gi(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== w && Ze(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Me.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: s } = e, n = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = Ge.createElement($i(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(t);
    else {
      const i = new qi(n, this), r = i.u(this.options);
      i.p(t), this.T(r), this._$AH = i;
    }
  }
  _$AC(e) {
    let t = Ts.get(e.strings);
    return t === void 0 && Ts.set(e.strings, t = new Ge(e)), t;
  }
  k(e) {
    ws(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, n = 0;
    for (const i of e) n === t.length ? t.push(s = new qe(this.O(Ue()), this.O(Ue()), this, this.options)) : s = t[n], s._$AI(i), n++;
    n < t.length && (this._$AR(s && s._$AB.nextSibling, n), t.length = n);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const s = Es(e).nextSibling;
      Es(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Dt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, n, i) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = e, this.name = t, this._$AM = n, this.options = i, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = w;
  }
  _$AI(e, t = this, s, n) {
    const i = this.strings;
    let r = !1;
    if (i === void 0) e = Te(this, e, t, 0), r = !Ze(e) || e !== this._$AH && e !== De, r && (this._$AH = e);
    else {
      const a = e;
      let l, d;
      for (e = i[0], l = 0; l < i.length - 1; l++) d = Te(this, a[s + l], t, l), d === De && (d = this._$AH[l]), r ||= !Ze(d) || d !== this._$AH[l], d === w ? e = w : e !== w && (e += (d ?? "") + i[l + 1]), this._$AH[l] = d;
    }
    r && !n && this.j(e);
  }
  j(e) {
    e === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Xi extends Dt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === w ? void 0 : e;
  }
}
class Ji extends Dt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== w);
  }
}
class Qi extends Dt {
  constructor(e, t, s, n, i) {
    super(e, t, s, n, i), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Te(this, e, t, 0) ?? w) === De) return;
    const s = this._$AH, n = e === w && s !== w || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, i = e !== w && (s === w || n);
    n && this.element.removeEventListener(this.name, this, s), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class en {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Te(this, e);
  }
}
const tn = vs.litHtmlPolyfillSupport;
tn?.(Ge, qe), (vs.litHtmlVersions ??= []).push("3.3.3");
const sn = (o, e, t) => {
  const s = t?.renderBefore ?? e;
  let n = s._$litPart$;
  if (n === void 0) {
    const i = t?.renderBefore ?? null;
    s._$litPart$ = n = new qe(e.insertBefore(Ue(), i), i, void 0, t ?? {});
  }
  return n._$AI(o), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bs = globalThis;
class X extends Pe {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = sn(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return De;
  }
}
X._$litElement$ = !0, X.finalized = !0, bs.litElementHydrateSupport?.({ LitElement: X });
const nn = bs.litElementPolyfillSupport;
nn?.({ LitElement: X });
(bs.litElementVersions ??= []).push("4.2.2");
const Ls = "copilot.standalone.plant", Oe = "copilot.standalone.icons";
function Je(o, e) {
  try {
    const t = localStorage.getItem(o);
    return t ? JSON.parse(t) : e;
  } catch {
    return e;
  }
}
function Ht(o, e) {
  try {
    localStorage.setItem(o, JSON.stringify(e));
  } catch {
  }
}
class on {
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
    return this.standalone ? { version: "demo", plant: Je(Ls, null), options: {}, is_admin: !0 } : this.hass.callWS({ type: "copilot/config/get" });
  }
  async saveConfig(e) {
    if (this.standalone) return Ht(Ls, e);
    await this.hass.callWS({ type: "copilot/config/save", plant: e });
  }
  async scan(e) {
    return this.standalone ? { source: "ems_esp", entity_count: 0, entities: [], suggestions: [] } : this.hass.callWS({ type: "copilot/mapping/scan", source: "ems_esp", plant: e });
  }
  async listIcons() {
    return this.standalone ? Je(Oe, []) : (await this.hass.callWS({ type: "copilot/icons/list" })).icons;
  }
  async uploadIcon(e, t, s, n) {
    if (this.standalone) {
      const i = Je(Oe, []), r = { id: Math.random().toString(16).slice(2, 14), name: e, mime: t, iso: n, size: s.length, data_url: `data:${t};base64,${s}` };
      return i.push(r), Ht(Oe, i), r;
    }
    return (await this.hass.callWS({ type: "copilot/icons/upload", name: e, mime: t, data: s, iso: n })).icon;
  }
  async deleteIcon(e) {
    if (this.standalone) return Ht(Oe, Je(Oe, []).filter((t) => t.id !== e));
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
const rn = {
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
}, an = {
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
}, Hs = { de: rn, en: an };
let Se = "de";
function Os(o) {
  Se = o;
}
function ln() {
  return Se;
}
function Vs(o, e) {
  return o === "de" || o === "en" ? o : (e || "de").toLowerCase().startsWith("de") ? "de" : "en";
}
function c(o, e) {
  let t = Hs[Se][o] ?? Hs.de[o] ?? o;
  return e && (t = t.replace(/\{(\w+)\}/g, (s, n) => {
    const i = e[n];
    return typeof i == "number" ? F(i, Number.isInteger(i) ? 0 : 1) : i == null ? "" : String(i);
  })), t;
}
function F(o, e = 1) {
  return o.toLocaleString(Se === "de" ? "de-DE" : "en-GB", {
    minimumFractionDigits: e,
    maximumFractionDigits: e
  });
}
function ki(o) {
  return new Date(o * 1e3).toLocaleTimeString(Se === "de" ? "de-DE" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function cn(o) {
  const e = new Date(o * 1e3), t = /* @__PURE__ */ new Date();
  return e.toDateString() === t.toDateString() ? ki(o) : e.toLocaleString(Se === "de" ? "de-DE" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function pn(o) {
  const e = Math.round(o / 60);
  return e < 60 ? `${e} min` : `${Math.floor(e / 60)} h ${e % 60} min`;
}
const dn = {
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
}, Bs = { supply_temp: "F", return_temp: "R", flow_temp: "F", target_flow_temp: "Set", room_temp: "Room", dhw_temp: "DHW", dhw_setpoint: "Set" };
function Rs(o, e) {
  return Se === "en" && e in Bs ? Bs[e] : dn[e] ?? "";
}
function xe(o, e) {
  const t = `slot.${o}.${e}`, s = c(t);
  return s === t ? c(`slot.${e}`) : s;
}
const z = 20, U = (o, e = !1) => ({ key: o, kind: "temp", show: e }), q = {
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
q.floor_heating.slots = q.radiators.slots;
function pe(o) {
  return o.type === "value_tile" ? (o.props.entries || []).map((e) => ({
    key: e.slot,
    kind: e.kind || "text",
    show: !0
  })) : q[o.type].slots;
}
function ve(o) {
  const e = q[o.type];
  if (!e.variants) return;
  const t = o.props?.variant || Ye(o.model)?.variant || "wall_e";
  return e.variants[t] || Object.values(e.variants)[0];
}
function $e(o) {
  const e = ve(o);
  return e ? { w: e.w, h: e.h } : { w: q[o.type].w, h: q[o.type].h };
}
function ot(o) {
  return ve(o)?.ports ?? q[o.type].ports;
}
function Is(o) {
  return ve(o)?.badges ?? q[o.type].badges;
}
function Ns(o) {
  const e = ve(o);
  return pe(o).map((t) => e ? { ...t, pos: e.pos?.[t.key] ?? t.pos, at: e.at?.[t.key] ?? t.at } : t);
}
function le(o) {
  const e = { ...q[o.type], ...$e(o) };
  if (o.type === "value_tile") {
    const s = (o.props.entries || []).length;
    return { w: e.w, h: 2 + Math.ceil(s * 1.3) };
  }
  const t = o.rot || 0;
  return t === 90 || t === 270 ? { w: e.h, h: e.w } : { w: e.w, h: e.h };
}
const Ks = ["r", "b", "l", "t"];
function hn(o, e) {
  const t = e / 90 % 4;
  return Ks[(Ks.indexOf(o) + t) % 4];
}
function ce(o, e) {
  const t = ot(o).find((d) => d.id === e);
  if (!t) return null;
  const s = o.rot || 0, { w: n, h: i } = $e(o);
  let { x: r, y: a } = t, l = t.dir;
  return o.flip && q[o.type].mirrorable && (r = n - r, l = l === "l" ? "r" : l === "r" ? "l" : l), s === 90 ? [r, a] = [i - a, r] : s === 180 ? [r, a] = [n - r, i - a] : s === 270 && ([r, a] = [a, n - r]), { x: o.x + r, y: o.y + a, dir: hn(l, s), def: t };
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
], un = { "buderus-wsw": "buderus-wsw186i" }, ys = [
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
], mn = {
  "buderus-wlw186i-t": "buderus-wlw186i-t180",
  "buderus-wlw186i-b": "buderus-wlw186i-e",
  "bosch-aw-b": "bosch-aw-e"
};
function Ye(o) {
  const e = o && mn[o] || o;
  return ys.find((t) => t.id === e);
}
function Le(o) {
  const e = o && un[o] || o;
  return pt.find((t) => t.id === e) || pt.find((t) => t.id === "generic-air");
}
const Mi = /* @__PURE__ */ new Set(["on", "true", "1", "yes", "ja", "ein", "an", "active", "aktiv", "open", "offen"]);
function Z(o) {
  return !o || !o.available || o.raw === null ? !1 : typeof o.raw == "boolean" ? o.raw : o.num !== null ? o.num > 0 : Mi.has(String(o.raw).trim().toLowerCase());
}
const fn = {
  off: ["off", "aus", "uit", "av", "arrêt", "standby", "bereit"],
  heating: ["heating", "heizen", "verwarmen", "uppvärmning", "chauffage", "ogrzewanie", "riscaldamento"],
  cooling: ["cooling", "kühlen", "koelen", "kyler", "refroidissement", "chłodzenie", "raffreddamento"],
  hot_water: ["hot water", "hot_water", "warmwasser", "warm water", "varmvatten", "eau chaude", "c.w.u.", "acqua calda"],
  pool_heating: ["pool heating", "pool beheizen", "zwembadverwarming", "chauffage piscine"],
  pool: ["pool", "zwembad", "piscine", "basen", "piscina"],
  defrost: ["defrost", "abtauen", "ontdooien", "avfrostning", "dégivrage", "odladzanie", "scongelamento"],
  compressor_alarm: ["compressor alarm", "compressor_alarm", "kompressor alarm", "kompressoralarm"]
};
function Xe(o) {
  if (!o || !o.available || o.raw === null) return;
  const e = String(o.raw).trim().toLowerCase();
  for (const [t, s] of Object.entries(fn)) if (s.includes(e)) return t;
  return e.includes("abtau") || e.includes("defrost") ? "defrost" : e;
}
function Si(o, e, t) {
  if (o === void 0 || o === "unavailable" || o === "unknown" || o === "")
    return { raw: null, num: null, unit: e, entity: t, available: !1 };
  const s = Number(o);
  return { raw: o, num: Number.isFinite(s) ? s : null, unit: e, entity: t, available: !0 };
}
class gn {
  constructor(e) {
    this.hass = e;
  }
  entityOf(e, t) {
    return e.type === "value_tile" ? (e.props.entries || []).find((n) => n.slot === t)?.entity : e.bindings[t];
  }
  get(e, t) {
    const s = this.entityOf(e, t);
    return s ? this.getEntity(s) : void 0;
  }
  getEntity(e) {
    const t = this.hass.states[e];
    return Si(t?.state, t?.attributes?.unit_of_measurement, e);
  }
  async history(e, t, s) {
    const n = this.entityOf(e, t);
    return n ? _n(this.hass, n, s) : [];
  }
}
async function _n(o, e, t) {
  const s = /* @__PURE__ */ new Date(), n = new Date(s.getTime() - t * 36e5);
  return ((await o.callWS({
    type: "history/history_during_period",
    start_time: n.toISOString(),
    end_time: s.toISOString(),
    entity_ids: [e],
    minimal_response: !0,
    no_attributes: !0,
    significant_changes_only: !1
  }))[e] || []).map((a) => {
    const l = String(a.s).toLowerCase();
    let d = Number(a.s);
    return Number.isFinite(d) || (d = Mi.has(l) ? 1 : l === "off" || l === "false" ? 0 : null), { t: a.lu, v: d, raw: String(a.s) };
  });
}
function ge(o, e) {
  const t = /* @__PURE__ */ new Set(), s = (n) => e.get(o, n);
  switch (o.type) {
    case "pump":
    case "mixer":
      (Z(s("running")) || Z(s("speed")) || Z(s("flow"))) && t.add("running"), o.type === "mixer" && Z(s("position")) && t.add("running");
      break;
    case "valve_3way": {
      const n = s("position");
      t.add(Z(n) ? "b" : "a");
      break;
    }
    case "outdoor_unit": {
      const n = Xe(s("activity"));
      (Z(s("compressor_on")) || Z(s("compressor_speed")) || Z(s("heat_power"))) && t.add("running"), n === "defrost" && t.add("defrost"), n === "compressor_alarm" && t.add("alarm"), n && n !== "off" && n !== "compressor_alarm" && t.add("running"), n && t.add(`mode_${n}`);
      break;
    }
    case "indoor_unit": {
      (Z(s("aux_level")) || Z(s("aux_step1")) || Z(s("aux_step2")) || Z(s("aux_step3"))) && t.add("aux"), (Z(s("pc0_running")) || Z(s("pc0_speed")) || Z(s("flow"))) && t.add("running"), t.add(Z(s("vw1_position")) || !o.bindings.vw1_position && Z(s("dhw_active")) && !Z(s("heating_active")) ? "b" : "a"), (Z(s("pc1_running")) || Z(s("pc1_speed"))) && t.add("pc1"), Z(s("dhw_charging")) && t.add("charging");
      const n = Z(s("dhw_active")) || t.has("running") && t.has("b") ? "hot_water" : Z(s("heating_active")) || t.has("running") ? "heating" : "off";
      t.add(`mode_${n}`);
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
function Fs(o, e) {
  const t = e.get(o.c);
  return t ? o.s.startsWith("!") ? !t.has(o.s.slice(1)) : t.has(o.s) : !1;
}
function vn(o, e) {
  const t = o.flow || [], s = o.flowAny || [];
  return t.length === 0 && s.length === 0 ? !1 : t.every((n) => Fs(n, e)) && (s.length === 0 || s.some((n) => Fs(n, e)));
}
function wn(o, e) {
  const t = new Map(o.components.map((i) => [i.id, i])), s = /* @__PURE__ */ new Map(), n = (i) => {
    const r = t.get(i.c);
    if (!r) return;
    const a = ce(r, i.p);
    if (a) {
      if (a.def.fixedTemp !== void 0) return a.def.fixedTemp;
      if (a.def.tempSlot) {
        const l = e.get(r, a.def.tempSlot);
        if (l?.available && l.num !== null) return l.num;
      }
    }
  };
  for (const i of o.pipes) {
    if (i.bindings?.temp) {
      const a = e.getEntity(i.bindings.temp);
      if (a?.available && a.num !== null) {
        s.set(i.id, a.num);
        continue;
      }
    }
    const r = n(i.from);
    r !== void 0 && s.set(i.id, r);
  }
  for (let i = 0; i < 6; i++) {
    let r = !1;
    for (const a of o.pipes) {
      if (s.has(a.id)) continue;
      const l = t.get(a.from.c);
      if (l && q[l.type].passive) {
        const d = o.pipes.find((h) => h.to.c === l.id && s.has(h.id));
        if (d) {
          s.set(a.id, s.get(d.id)), r = !0;
          continue;
        }
      }
      if (i === 5 || !l || !q[l.type].passive) {
        const d = n(a.to);
        d !== void 0 && (s.set(a.id, d), r = !0);
      }
    }
    if (!r && i > 0) break;
  }
  return s;
}
const bn = {
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
function Ie(o, e) {
  return pe(o).find((t) => t.key === e)?.kind || "text";
}
function be(o, e) {
  if (!o) return { text: c("none"), unit: "" };
  if (!o.available) return { text: c("none"), unit: "" };
  if (e === "bool") return { text: Z(o) ? c("on") : c("off"), unit: "" };
  if (e === "enum" && o.num === null) {
    const r = `mode.${Xe(o)}`, a = c(r);
    return { text: a === r ? String(o.raw) : a, unit: "" };
  }
  let t = o.unit ?? bn[e] ?? "";
  if (o.num === null) return { text: String(o.raw), unit: "" };
  let s = o.num;
  e === "power_w" && t === "W" && Math.abs(s) >= 1e3 && (s = s / 1e3, t = "kW");
  const n = e === "count" || e === "percent" || e === "flow" || e === "duration" || e === "power_w" && t === "W" || e === "energy" && s >= 100 ? 0 : 1;
  return { text: F(s, n), unit: t };
}
function te(o, e) {
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
  if (o <= t[0][0]) return rt(t[0][1]);
  for (let s = 1; s < t.length; s++) {
    const [n, i] = t[s], [r, a] = t[s - 1];
    if (o <= n) {
      const l = (o - r) / (n - r);
      return rt([0, 1, 2].map((d) => a[d] + (i[d] - a[d]) * l));
    }
  }
  return rt(t[t.length - 1][1]);
}
function rt(o) {
  return `rgb(${o.map((e) => Math.round(e)).join(",")})`;
}
function yn(o, e) {
  const t = (n, i, r) => rt([0, 1, 2].map((a) => n[a] + (i[a] - n[a]) * Math.max(0, Math.min(1, r)))), s = (n, i) => e === void 0 ? 0.5 : (e - n) / (i - n);
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
      return te(e, "#8a97a6");
  }
}
function zi(o, e = -12) {
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
function Ne(o, e) {
  if (e >= o.limit) return null;
  const t = Math.max(1, o.roomSet - o.minExt), s = Math.max(0, (o.roomSet - e) / t), n = o.roomSet + (o.design - o.roomSet) * Math.pow(s, 1 / o.exponent);
  return Math.max(o.minFlow, Math.min(o.maxFlow, n + o.offset));
}
function xn(o, e) {
  const t = o.exponent > 1.2 ? 2.5 : 1.5, s = (o.roomSet - e) * t;
  return Math.round(s * 2) / 2;
}
const $n = {
  nominal: 7.1,
  source: "air",
  bufferL: 120,
  dhwL: 274,
  auxKw: 6,
  heatLoad: 6.2,
  designTemp: -12,
  floor: !1
}, ze = 4.186 / 3600, js = 10, Ot = 21, kn = 10, Mn = [
  // hour of day, minutes, litres per minute (mixed at 40 °C)
  [6.5, 7, 9],
  [6.85, 6, 9],
  [7.2, 5, 8],
  [12.25, 2, 4],
  [18.6, 3, 5],
  [20.4, 8, 9],
  [21.1, 6, 9]
], Sn = [
  [6, 7.5],
  [11.5, 12.5],
  [17.5, 19]
];
class zn {
  constructor(e = {}, t = Date.now() / 1e3, s) {
    this.speed = 60, this.outdoorMean = 2, this.dailySwing = 2.5, this.tOut = 2, this.tRoom = 20.8, this.bufTop = 38, this.bufBot = 33, this.dhwTop = 49, this.dhwBot = 43, this.tVl = 30, this.tRl = 28, this.tVlHc = 38, this.tRlHc = 32, this.mode = "off", this.pTh = 0, this.pEl = 0, this.cop = 0, this.running = !1, this.lastStart = -1e9, this.lastStop = -1e9, this.pc0Overrun = 0, this.ice = 0.3, this.defrostLeft = 0, this.aux = 0, this.auxTimer = 0, this.heatDemand = !1, this.dhwDemand = !1, this.tapFlow = 0, this.tapLeft = 0, this.qEmit = 0, this.starts = 0, this.e = { el: 0, heat: 0, elHeat: 0, elDhw: 0, heatHeat: 0, heatDhw: 0, aux: 0 }, this.dim14a = !1, this.pv = !1, this.soc = 55, this.cloud = 0.8, this.en = { pv: 0, house: 0.4, wallbox: 0, battery: 0, grid: 0, hp: 0 }, this.disinfect = !1, this.fault = !1, this.lastDrawDay = /* @__PURE__ */ new Map(), this.days = /* @__PURE__ */ new Map(), this.sampleAcc = 0, this.hist = /* @__PURE__ */ new Map(), this.active = /* @__PURE__ */ new Map(), this.messages = [], this.labels = { dhw: "WW" }, this.listeners = [], this.p = { ...$n, ...e }, this.curve = zi(this.p.floor, this.p.designTemp), s && (this.labels = { ...this.labels, ...s }), this.time = t - 24 * 3600, this.prefill(t);
  }
  prefill(e) {
    const t = this.listeners;
    for (this.listeners = []; this.time < e; ) this.step(js);
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
      const n = Math.min(js, t);
      this.step(n), t -= n;
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
    return (Ne(this.curve, this.tOut) ?? this.curve.minFlow) + e;
  }
  dhwSetpoint() {
    return this.disinfect ? 60 : this.pv ? 55 : 50;
  }
  step(e) {
    this.time += e;
    const t = this.hour(), s = e / 3600, n = this.p, i = this.outdoorMean + this.dailySwing * Math.cos((t - 15) / 24 * 2 * Math.PI);
    this.tOut += (i - this.tOut) * Math.min(1, e / 1800);
    const r = this.tOut < this.curve.limit, a = this.curveSetpoint(), l = r ? 650 * ze * 3600 / 3600 : 0, d = n.heatLoad * (n.floor, 1), h = n.floor ? 30 - Ot : 45 - Ot, p = n.floor ? 1.1 : 1.3;
    let m = 0;
    if (this.tVlHc = this.bufTop, l > 0) {
      let Y = this.tVlHc - 3;
      for (let de = 0; de < 4; de++)
        m = d * Math.pow(Math.max(0, (Y - this.tRoom) / h), p), Y = this.tVlHc - m / (2 * l);
      m *= Math.max(0.1, Math.min(1, 1 - (this.tRoom - this.curve.roomSet - 0.2) * 1.5)), this.tRlHc = this.tVlHc - m / l;
    } else
      this.tRlHc = this.bufBot;
    this.qEmit = m;
    const u = n.heatLoad / (Ot - n.designTemp);
    this.tRoom += (m - u * (this.tRoom - this.tOut) + 0.35) * s / 9;
    const _ = Math.floor(this.time / 86400);
    Mn.forEach(([Y, de, Hi], $s) => {
      t >= Y && t < Y + 0.1 && this.lastDrawDay.get($s) !== _ && (this.lastDrawDay.set($s, _), this.startDraw(de, Hi));
    }), this.tapLeft > 0 && (this.tapLeft -= e, this.tapLeft <= 0 && (this.tapFlow = 0));
    const g = Sn.some(([Y, de]) => t >= Y && t < de), b = n.dhwL / 2 * ze, v = this.tapFlow * 60 * ze * (40 - kn), x = 1.38 / 24 / 2 + (g ? 0.12 : 0) / 2;
    this.dhwTop -= (v * 0.35 + x) * s / b, this.dhwBot -= (v * 0.65 + x) * s / b;
    const $ = this.dhwSetpoint();
    (this.dhwTop < $ - 5 || this.dhwBot < $ - 14 || this.disinfect && this.dhwBot < 59) && (this.dhwDemand = !0), this.dhwBot >= $ - 0.5 && this.dhwTop >= $ - 0.5 && (this.dhwDemand = !1, this.disinfect && (this.disinfect = !1, this.condition("dis", !1, "info", "dhw_disinfection", {}, "dhw"))), r && this.bufTop < a - 2 && (this.heatDemand = !0);
    const S = this.time - this.lastStart > 600;
    (!r || this.bufTop > a + 2.5 && S) && (this.heatDemand = !1);
    let C = this.fault ? "compressor_alarm" : this.dhwDemand ? "hot_water" : this.heatDemand ? "heating" : "off";
    this.defrostLeft > 0 && !this.fault && (C = "defrost");
    const O = C === "heating" || C === "hot_water" || C === "defrost";
    O && !this.running ? this.time - this.lastStop >= 480 || C === "defrost" ? (this.running = !0, this.lastStart = this.time, this.starts++, this.pTh = this.pMin()) : C = "off" : !O && this.running && (this.time - this.lastStart > 600 || this.fault ? (this.running = !1, this.lastStop = this.time, this.pc0Overrun = 180) : C = this.mode === "hot_water" ? "hot_water" : "heating"), this.mode = this.running ? C : this.fault ? "compressor_alarm" : "off";
    const j = this.pMax(), Q = this.pMin();
    let A = 0;
    if (this.running && this.mode === "heating" ? A = this.qEmit + 2.2 * (a + 1 - this.bufTop) : this.running && this.mode === "hot_water" && (A = Math.min(j * 0.9, Math.max(Q, (60 - this.dhwBot - 3) * 0.9))), this.running && this.mode !== "defrost") {
      A = Math.max(Q, Math.min(j, A)), this.pTh < Q && (this.pTh = Q);
      const Y = 0.5 * (e / 60);
      this.pTh += Math.max(-Y * 2, Math.min(Y, A - this.pTh));
    } else this.mode === "defrost" ? this.pTh = -3 : this.pTh = 0;
    let P = 0;
    this.dim14a || (this.fault && r ? P = n.auxKw : this.mode === "heating" && this.bufTop < a - 5 && this.pTh >= j * 0.95 ? (this.auxTimer += e, this.auxTimer > 1200 && (P = Math.min(n.auxKw, 3))) : this.auxTimer = 0, this.tOut < n.designTemp + 2 && this.mode === "heating" && (P = Math.max(P, Math.min(n.auxKw, 3))), this.disinfect && this.mode === "hot_water" && this.dhwBot > 52 && (P = Math.min(n.auxKw, 3))), this.fault && r && P > 0 && (this.heatDemand = !0), this.aux = P;
    const I = this.running || this.pc0Overrun > 0 || this.fault && this.aux > 0;
    !this.running && this.pc0Overrun > 0 && (this.pc0Overrun -= e);
    const K = I ? 1100 * ze : 0, L = this.mode === "hot_water", W = (this.running ? this.pTh : 0) + this.aux;
    L ? this.tRl = this.dhwBot + 2 : this.tRl = I ? this.bufBot : this.tRl + (22 - this.tRl) * Math.min(1, e / 3600), this.tVl = K > 0 ? this.tRl + W / K : this.tVl + (this.tRl - this.tVl) * Math.min(1, e / 600);
    const E = (n.bufferL + 60) / 2 * ze, T = L ? 0 : K, V = 0.05 / 2, D = T * (this.tVl - this.bufTop) + (l > T ? (l - T) * (this.bufBot - this.bufTop) : 0) - V, B = l * (this.tRlHc - this.bufBot) + (T > l ? (T - l) * (this.bufTop - this.bufBot) : 0) - V;
    if (this.bufTop += D * s / E, this.bufBot += B * s / E, this.bufBot > this.bufTop) {
      const Y = (this.bufBot + this.bufTop) / 2;
      this.bufBot = this.bufTop = Y;
    }
    if (L && (this.dhwBot += W * s / b, this.dhwBot > this.dhwTop)) {
      const Y = (this.dhwBot + this.dhwTop) / 2;
      this.dhwBot = this.dhwTop = Y;
    }
    if (this.running && this.mode !== "defrost") {
      const Y = this.tVl + 273.15 + 3, de = (this.p.source === "air" ? this.tOut - 6 : 0) + 273.15;
      this.cop = Math.max(1.4, Math.min(7.5, 0.57 * Y / Math.max(5, Y - de))), this.pEl = this.pTh / this.cop + 0.06;
    } else this.mode === "defrost" ? (this.cop = 0, this.pEl = 1.1) : (this.cop = 0, this.pEl = 0.012 + (I ? 0.03 : 0));
    const H = Math.max(0, this.running ? this.pTh : 0);
    this.e.el += (this.pEl + this.aux) * s, this.e.aux += this.aux * s, this.e.heat += (H + this.aux) * s;
    const G = new Date(this.time * 1e3), J = new Date(G.getFullYear(), G.getMonth(), G.getDate()).getTime();
    let se = this.days.get(J);
    if (!se) {
      this.days.set(J, se = { heat: 0, el: 0, heatDhw: 0, elDhw: 0, aux: 0 });
      for (const Y of [...this.days.keys()]) Y < J - 3 * 864e5 && this.days.delete(Y);
    }
    if (se.heat += (H + this.aux) * s, se.el += (this.pEl + this.aux) * s, se.aux += this.aux * s, L && (se.heatDhw += H * s, se.elDhw += this.pEl * s), L ? (this.e.elDhw += this.pEl * s, this.e.heatDhw += H * s) : (this.e.elHeat += this.pEl * s, this.e.heatHeat += H * s), this.defrostLeft > 0)
      this.defrostLeft -= e, this.defrostLeft <= 0 && (this.ice = 0, this.defrostLeft = 0);
    else if (this.p.source === "air" && this.running && this.tOut < 7 && this.tOut > -15) {
      const Y = this.tOut > -2 ? 1.3 - Math.abs(this.tOut - 1) * 0.12 : 0.9 + this.tOut * 0.04;
      this.ice += Math.max(0.05, Y) * (this.pTh / j) * s, this.ice >= 1 && (this.defrostLeft = 240 + Math.random() * 120);
    }
    this.emitConditions(), this.energyStep(e, t), this.values = this.buildValues(a, $, g, I, K), this.sampleAcc += e, this.sampleAcc >= 60 && (this.sampleAcc = 0, this.sample());
  }
  /** Household power balance around the heat pump (PV, battery, house, wallbox, grid). */
  energyStep(e, t) {
    const s = e / 3600;
    this.cloud += (Math.random() - 0.5) * 0.08 * Math.sqrt(e / 10), this.cloud = Math.max(0.35, Math.min(1, this.cloud));
    const n = Math.max(0.25, Math.min(1, 0.45 + (this.outdoorMean - 2) / 25)), i = t > 7 && t < 19 ? Math.sin((t - 7) / 12 * Math.PI) : 0;
    let r = 9.9 * 0.8 * n * i * this.cloud;
    this.pv && (r = Math.max(r, 6.5));
    const a = (g, b, v) => t >= g && t < b ? v : 0, l = 0.35 + a(6.5, 8, 0.6) + a(11.5, 13, 0.9) + a(18, 21, 0.8) + 0.05 * Math.sin(this.time / 97);
    let h = Math.floor(this.time / 86400) % 2 === 0 && t >= 18 && t < 21.5 ? 7.4 : 0;
    this.dim14a && h && (h = 4.2);
    const p = this.pEl + this.aux, m = r - l - h - p;
    let u = 0;
    m > 0 && this.soc < 100 ? u = -Math.min(m, 5) : m < 0 && this.soc > 10 && !h && (u = Math.min(-m, 5)), this.soc = Math.max(0, Math.min(100, this.soc - u * s * 100 / 10));
    const _ = l + h + p - r - u;
    this.en = { pv: r, house: l, wallbox: h, battery: u, grid: _, hp: p };
  }
  startDraw(e, t) {
    this.tapFlow = t, this.tapLeft = e * 60;
  }
  buildValues(e, t, s, n, i) {
    const r = (d) => Math.round(d * 10) / 10, a = this.pMax(), l = this.running;
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
        flow: n ? Math.round(i / ze) : 0,
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
      pc0: { running: n, speed: n ? 72 : 0, flow: n ? 1100 : 0 },
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
  condition(e, t, s, n, i, r) {
    const a = this.active.get(e);
    if (t && !a) {
      const l = {
        id: Math.random().toString(16).slice(2, 14),
        ts: this.time,
        level: s,
        key: n,
        params: i,
        component_id: r,
        active: !0,
        end_ts: null
      };
      this.active.set(e, l.id), this.messages.push(l), this.messages.length > 200 && this.messages.shift(), this.listeners.forEach((d) => d(l));
    } else if (!t && a) {
      this.active.delete(e);
      const l = this.messages.find((d) => d.id === a);
      l && (l.active = !1, l.end_ts = this.time, this.listeners.forEach((d) => d(l)));
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
      for (const [n, i] of Object.entries(s)) {
        const r = typeof i == "number" ? i : typeof i == "boolean" ? i ? 1 : 0 : null;
        if (r === null && n !== "activity") continue;
        const a = `${t}.${n}`;
        let l = this.hist.get(a);
        l || this.hist.set(a, l = []), l.push(r === null ? { t: e, v: null, raw: String(i) } : { t: e, v: r }), l.length > 1500 && l.splice(0, l.length - 1440);
      }
  }
  dailyEnergy() {
    return [...this.days.entries()].sort((e, t) => e[0] - t[0]).map(([e, t]) => ({ day: e, ...t }));
  }
  history(e, t, s) {
    const n = this.hist.get(`${e}.${t}`) || [], i = this.time - s * 3600;
    return n.filter((r) => r.t >= i);
  }
}
function Us(o) {
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
function Vt(o) {
  if (!o) return {};
  const e = o.components.find((l) => l.type === "outdoor_unit"), t = o.components.find((l) => l.type === "indoor_unit"), s = o.components.find((l) => l.type === "buffer"), n = o.components.find((l) => l.type === "dhw_tank"), i = Ye(t?.model), r = Le(e?.model), a = o.components.filter((l) => l.type === "radiators" || l.type === "floor_heating");
  return {
    nominal: Number(e?.props.nominal_kw) || r.nominal,
    source: r.source,
    bufferL: Number(s?.props.volume) || i?.buffer || (s ? 120 : 30),
    dhwL: Number(n?.props.volume) || i?.dhw || 274,
    auxKw: Number(t?.props.aux_kw) || 6,
    heatLoad: Number(o.settings?.heat_load) || 6.2,
    floor: a.length > 0 && a.every((l) => l.type === "floor_heating")
  };
}
const En = {}, Zs = {
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
class Ei {
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
    return t ? Si(t.state, t.attributes?.unit_of_measurement, e) : void 0;
  }
  get(e, t) {
    if (e.type === "value_tile") {
      const i = (e.props.entries || []).find((l) => l.slot === t);
      if (!i?.sim) return;
      const [r, a] = i.sim.split(".");
      return this.wrap(this.sim.values[r]?.[a]);
    }
    if (e.type === "indoor_unit") {
      const i = Zs[t];
      if (i) {
        const r = ve(e)?.id;
        return t.startsWith("dhw_") && r !== "t180" || t === "buffer_temp" && r !== "tp70" || t.startsWith("pc1") && r === "wall_e" ? void 0 : this.wrap(this.sim.values[i[0]]?.[i[1]]);
      }
    }
    const s = Us(e);
    if (!s) return;
    let n = this.sim.values[s]?.[t];
    if (n !== void 0)
      return s === "hc" && typeof n == "number" && Number(e.props.circuit) > 1 && ["flow_temp", "return_temp", "target_flow_temp"].includes(t) && (n = Math.round((n - (e.type === "floor_heating" ? 12 : 2)) * 10) / 10), this.wrap(n, En[t]);
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
    const n = e.type === "indoor_unit" ? Zs[t] : void 0;
    if (n) return this.sim.history(n[0], n[1], s);
    const i = Us(e);
    return i ? this.sim.history(i, t, s) : [];
  }
}
function Gt() {
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
class An {
  constructor() {
    this.components = [], this.pipes = [], this.n = 0;
  }
  add(e, t, s, n, i, r = {}) {
    return this.components.push({ id: e, type: t, label: s, x: n, y: i, bindings: {}, props: {}, ...r }), e;
  }
  pipe(e, t, s, n = [], i = {}) {
    this.pipes.push({ id: `p${++this.n}`, from: e, to: t, kind: s, flow: n, ...i });
  }
}
const y = (o, e) => ({ c: o, p: e });
function Tt(o, e) {
  const t = new An(), s = Ye(o.indoorModel), n = s?.variant || "wall_e", i = !!s?.dhw, r = !!s?.buffer, a = o.dhw === "tank" && !i, l = o.dhw === "tank" || i, d = o.buffer !== "none" && !r, h = { c: "iu", s: "running" }, p = l ? [{ c: "iu", s: "a" }] : [], m = { c: "iu", s: "b" }, u = { c: "pc1", s: "running" }, _ = {
    aux_kw: o.aux ? o.auxKw : 0,
    input_labels: { input1: "§14a / EVU", input4: "PV" },
    input_levels: { input1: "warning" },
    pressure_min: 1,
    pressure_max: 2.7,
    buffer_l: s?.buffer
  }, g = n !== "wall_e", b = n === "tp70" && o.circuits.length <= 1 && !o.circuits[0]?.mixed, v = b ? 5 : 12;
  t.add("ou", "outdoor_unit", o.outdoorLabel || c("type.outdoor_unit"), 1, v, {
    model: o.outdoorModel,
    props: { nominal_kw: o.nominalKw }
  });
  const x = b ? 22 : g ? 14 : 16, $ = b ? 27 : g ? 12 : 2;
  t.add("iu", "indoor_unit", o.indoorLabel || c("type.indoor_unit"), x, $, { model: o.indoorModel, props: _ });
  const S = t.components.find((A) => A.id === "iu"), C = (A) => ce(S, A), O = { y: v + 5 };
  if (b) {
    const A = $, P = (B) => C(B).x, I = { c: "iu", s: "pc1" };
    t.pipe(y("iu", "src_out"), y("ou", "in"), "return", [h], { via: [[P("src_out"), v + 5]] }), t.pipe(y("ou", "out"), y("iu", "src_in"), "supply", [h], { via: [[P("src_in"), v + 6]] });
    const K = o.circuits[0] ?? { emitter: "radiators", label: "" }, L = 2, W = A - 8, E = A - 4;
    t.add("hc1", K.emitter, K.label || c("wz.circuit", { n: 1 }), L, W - 1, { flip: !0, props: { circuit: 1 } }), t.pipe(y("iu", "sup"), y("hc1", "sup"), "supply", [I], { via: [[P("sup"), W]] });
    let T = y("hc1", "ret"), V = [], D = L + 9;
    if (o.separator && (t.add("sep", "separator", c("wz.separator_short"), D, E - 1), t.add("sc1", "separator", "SC1", D + 3, E - 1, { props: { filter: !0 } }), t.pipe(T, y("sep", "in"), "return", [I]), t.pipe(y("sep", "out"), y("sc1", "in"), "return", [I]), T = y("sc1", "out"), D += 7), o.expansion && (t.add("jmag", "junction", "", D + 1, E), t.add("mag", "expansion_vessel", "MAG", D, E, { rot: 180 }), t.pipe(y("mag", "conn"), y("jmag", "b"), "return", []), t.pipe(T, y("jmag", "l"), "return", [I]), T = y("jmag", "r")), t.pipe(T, y("iu", "ret"), "return", [I], { via: [...V, [P("ret"), E]] }), a) {
      const B = x + 22, H = A + 2;
      t.add("dhw", "dhw_tank", o.dhwLabel || c("type.dhw_tank"), B, H, { props: { volume: o.dhwVolume } }), t.pipe(y("iu", "dhw_sup"), y("dhw", "coil_in"), "supply", [h, m], { via: [[P("dhw_sup"), A - 3], [B + 9, A - 3], [B + 9, H + 4]] }), t.pipe(y("dhw", "coil_out"), y("iu", "dhw_ret"), "return", [h, m], { via: [[B + 8, H + 9], [B + 8, A - 2], [P("dhw_ret"), A - 2]] }), Qe(t, o, y("dhw", "hot"), y("dhw", "circ"), y("dhw", "cold"), B, H);
    }
  } else if (g) {
    const A = $, P = (D) => C(D).x, I = Math.max(...["src_in", "src_out", "sup", "ret", "dhw_sup", "dhw_ret", "dhw_hot", "dhw_cold", "circ"].filter((D) => ce(S, D)).map(P));
    t.pipe(y("ou", "out"), y("iu", "src_in"), "supply", [h], { via: [[12, O.y], [12, A - 9], [P("src_in"), A - 9]] }), t.pipe(y("iu", "src_out"), y("ou", "in"), "return", [h], { via: [[P("src_out"), A - 10], [11, A - 10]] });
    let K = y("iu", "sup"), L = y("iu", "ret"), W = r ? [u] : [h, ...p], E = [[P("sup"), A - 2]];
    const T = A - 4;
    let V = I + 14;
    if (d) {
      const D = I + 2, B = D + 10, H = A + 4;
      t.add("buf", "buffer", o.bufferLabel || c("type.buffer"), B, H, { props: { volume: o.bufferVolume } }), t.pipe(y("iu", "sup"), y("buf", "in_sup"), "supply", [h, ...p], { via: [[P("sup"), A - 2], [B + 1, A - 2]] });
      const G = [h, ...p];
      let J = y("buf", "in_ret"), se = [[B + 2, T]];
      o.separator && (t.add("sep", "separator", c("wz.separator_short"), D + 6, T - 1, { rot: 180 }), t.add("sc1", "separator", "SC1", D + 3, T - 1, { rot: 180, props: { filter: !0 } }), t.pipe(J, y("sep", "in"), "return", G, { via: se }), t.pipe(y("sep", "out"), y("sc1", "in"), "return", G), J = y("sc1", "out"), se = []), o.expansion && (t.add("jmag", "junction", "", D, T), t.add("mag", "expansion_vessel", "MAG", D - 1, T - 5), t.pipe(y("mag", "conn"), y("jmag", "t"), "return", []), t.pipe(J, y("jmag", "r"), "return", G, { via: se }), J = y("jmag", "l"), se = []), t.pipe(J, y("iu", "ret"), "return", G, { via: [...se, [P("ret"), T]] }), K = y("buf", "out_sup"), L = y("buf", "out_ret"), W = [u], E = [], V = B + 7;
    }
    if (Bt(t, o, K, L, W, E, d || r, V, A + 4), i)
      Qe(t, o, y("iu", "dhw_hot"), y("iu", "circ"), y("iu", "dhw_cold"), x - 1, A + 18);
    else if (a) {
      const D = x - 9, B = A + 8;
      t.add("dhw", "dhw_tank", o.dhwLabel || c("type.dhw_tank"), D, B, { props: { volume: o.dhwVolume } }), t.pipe(y("iu", "dhw_sup"), y("dhw", "coil_in"), "supply", [h, m], { via: [[P("dhw_sup"), A - 1], [D + 8, A - 1], [D + 8, B + 4]] }), t.pipe(y("dhw", "coil_out"), y("iu", "dhw_ret"), "return", [h, m], { via: [[D + 7, B + 9], [D + 7, A - 3], [P("dhw_ret"), A - 3]] }), Qe(t, o, y("dhw", "hot"), y("dhw", "circ"), y("dhw", "cold"), D, B);
    }
  } else {
    const A = $ + 14, P = (E) => C(E).x;
    t.pipe(y("iu", "src_out"), y("ou", "in"), "return", [h], { via: [[P("src_out"), A + 1]] }), t.pipe(y("ou", "out"), y("iu", "src_in"), "supply", [h], { via: [[P("src_in"), A + 2]] });
    const I = A + 6, K = [h, ...p], L = [];
    o.separator && (t.add("sep", "separator", c("wz.separator_short"), P("sup") + 9, I - 1, { rot: 180 }), L.push({ inP: y("sep", "in"), outP: y("sep", "out") })), o.expansion && (t.add("jmag", "junction", "", P("sup") + 6, I), t.add("mag", "expansion_vessel", "MAG", P("sup") + 5, I + 1, { rot: 180 }), t.pipe(y("mag", "conn"), y("jmag", "b"), "return", []), L.push({ inP: y("jmag", "r"), outP: y("jmag", "l") })), o.separator && (t.add("sc1", "separator", "SC1", P("sup") + 1, I - 1, { rot: 180, props: { filter: !0 } }), L.push({ inP: y("sc1", "in"), outP: y("sc1", "out") }));
    for (let E = 0; E < L.length - 1; E++) t.pipe(L[E].outP, L[E + 1].inP, "return", K);
    let W = y("iu", "ret");
    if (L.length && (t.pipe(L[L.length - 1].outP, y("iu", "ret"), "return", K, { via: [[P("ret"), I]] }), W = L[0].inP), d) {
      const E = x + 22, T = A + 8;
      t.add("buf", "buffer", o.bufferLabel || c("type.buffer"), E, T, { props: { volume: o.bufferVolume } }), t.pipe(y("iu", "sup"), y("buf", "in_sup"), "supply", [h, ...p], { via: [[P("sup"), A + 2], [E + 1, A + 2]] }), t.pipe(y("buf", "in_ret"), W, "return", [h, ...p], { via: [[E + 2, I]] }), Bt(t, o, y("buf", "out_sup"), y("buf", "out_ret"), [u], [], !0, E + 8, T + 1);
    } else {
      const E = x + 25;
      Bt(t, o, y("iu", "sup"), W, [h, ...p], [[P("sup"), A + 2], [E - 2, A + 2]], !1, E, A + 8, I);
    }
    if (a) {
      const E = P("dhw_sup") - 8, T = A + 6;
      t.add("dhw", "dhw_tank", o.dhwLabel || c("type.dhw_tank"), E, T, { props: { volume: o.dhwVolume } }), t.pipe(y("iu", "dhw_sup"), y("dhw", "coil_in"), "supply", [h, m], { via: [[P("dhw_sup"), T + 4]] }), t.pipe(y("dhw", "coil_out"), y("iu", "dhw_ret"), "return", [h, m], { via: [[P("dhw_ret"), T + 9]] }), Qe(t, o, y("dhw", "hot"), y("dhw", "circ"), y("dhw", "cold"), E, T);
    }
  }
  const j = Math.max(1, o.circuits.length), Q = {
    version: 5,
    name: o.name,
    grid: b ? { w: 58, h: 49 } : { w: j > 1 ? 76 : 66, h: Math.max(38, (g ? 46 : 38) + (j - 1) * 10) },
    components: t.components,
    pipes: t.pipes,
    settings: e?.settings ?? { style: "flat", demo: !0 }
  };
  if (Q.settings = { ...Q.settings, wizard: o }, e) {
    const A = new Map(e.components.map((L) => [L.id, L]));
    for (const L of Q.components) {
      const W = A.get(L.id);
      W && W.type === L.type && (L.bindings = { ...W.bindings }, W.icon && (L.icon = W.icon), W.show && (L.show = W.show));
    }
    const P = Q.components.find((L) => L.id === "iu"), I = A.get("pc0"), K = A.get("vw1");
    P && I?.bindings.running && (P.bindings.pc0_running ??= I.bindings.running), P && I?.bindings.speed && (P.bindings.pc0_speed ??= I.bindings.speed), P && K?.bindings.position && (P.bindings.vw1_position ??= K.bindings.position);
  }
  return Q;
}
function Bt(o, e, t, s, n, i, r, a, l, d) {
  Math.max(1, e.circuits.length);
  const h = [], p = { ...t };
  e.circuits.slice(0, 4).forEach((m, u) => {
    const _ = u + 1, g = l - 9 + u * 10, b = _ === 1 ? "pc1" : `hc${_}_pump`, v = `hc${_}_mix`, x = `hc${_}`;
    let $ = a, S = null, C = null, O = n;
    (r || m.mixed) && (o.add(b, "pump", _ === 1 ? "PC1" : `PC${_}`, $, g, { props: { role: m.mixed ? "hc" : "secondary", circuit: _ } }), S = y(b, "in"), C = y(b, "out"), O = [{ c: b, s: "running" }], h.push(O[0]), $ += 4), m.mixed && (o.add(v, "mixer", `VC${_}`, $, g, { props: { circuit: _ } }), C ? o.pipe(C, y(v, "in"), "supply", O) : S = y(v, "in"), C = y(v, "out"), $ += 3);
    const j = $ + 3;
    o.add(x, m.emitter, m.label || c("wz.circuit", { n: _ }), j, g - 2, { props: { circuit: _ } }), C ? o.pipe(C, y(x, "sup"), "supply", O, { via: [[j - 2, g + 1], [j - 2, g - 1]] }) : S = y(x, "sup"), o.pipe(p, S, "supply", O, u === 0 ? { via: [...i, [a - 1 - u, g + 1]] } : { via: [[a - 1 - u, g + 1]] }), m.mixed ? (o.add(`hc${_}_jm`, "junction", "", $ - 2, g + 3), o.pipe(y(x, "ret"), y(`hc${_}_jm`, "r"), "return", O, { via: [[$ - 2, g + 3]] }), o.pipe(y(`hc${_}_jm`, "t"), y(v, "ret"), "return", O), o.pipe(y(`hc${_}_jm`, "l"), s, "return", O, { via: [[a - 2 - u, g + 3], ...d ? [[a - 2 - u, d]] : []] })) : o.pipe(y(x, "ret"), s, "return", O, { via: [[a - 2 - u, g + 3], ...d ? [[a - 2 - u, d]] : []] });
  });
}
function Qe(o, e, t, s, n, i, r) {
  const a = { c: "tap", s: "flowing" }, l = { c: "circ", s: "running" };
  if (o.add("tap", "tap", c("type.tap"), i - 9, r), o.add("inlet", "water_inlet", c("type.water_inlet"), i - 9, r + 9), o.pipe(y("inlet", "out"), n, "dhw_cold", [a]), !e.circulation) {
    o.pipe(t, y("tap", "hot"), "dhw_hot", [a]);
    return;
  }
  o.add("jww", "junction", "", i - 3, r + 1), o.pipe(t, y("jww", "r"), "dhw_hot", [], { flowAny: [a, l] }), o.pipe(y("jww", "l"), y("tap", "hot"), "dhw_hot", [a]), o.add("circ", "pump", "PW2", i - 4, r + 3, { rot: 90, props: { role: "circulation" } }), o.pipe(y("jww", "b"), y("circ", "in"), "circulation", [l]), o.pipe(y("circ", "out"), s, "circulation", [l]);
}
function Yt() {
  const o = typeof location < "u" ? new URLSearchParams(location.search).get("indoor") : null, e = Gt();
  o && Ye(o) && (e.indoorModel = o, e.indoorLabel = Ye(o).label.replace(/^Logatherm /, "").split(" – ")[0]);
  const t = Tt(e);
  return typeof location < "u" && new URLSearchParams(location.search).get("style") === "iso" && (t.settings.style = "iso"), t;
}
const Wn = 4;
class Ai {
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
    this.host.toggleAttribute("light", !t), Os(Vs(this.plant?.settings.language, e.language)), this.api ? this.api.setHass(e) : this._connected && this._init(), this.plant && !this.plant.settings.demo && this._checkStates();
  }
  _init() {
    this.api = new on(this.hass), this._load();
  }
  // ----------------------------------------------------------------- data
  get messages() {
    return this.sim ? this.simMessages : this.backendMessages;
  }
  get src() {
    return this.sim ? new Ei(this.sim, this.hass) : new gn(this.hass);
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
      Object.values(s.bindings || {}).forEach((n) => n && e.add(n)), (s.props.entries || []).forEach((n) => n.entity && e.add(n.entity));
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
        t ? (t.version ?? 1) < 5 && t.settings?.wizard && (t = Tt(t.settings.wizard, t), e.is_admin && this.saveExample && await this.api.saveConfig(t)) : (t = Yt(), e.is_admin && this.saveExample && await this.api.saveConfig(t)), this.setPlant(t), await this.loadIcons(), this.api.standalone || (this.backendMessages = await this.api.listMessages(), this._unsubMsg = await this.api.subscribeMessages((s) => this._mergeMessage(s)));
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
    const t = this.backendMessages.findIndex((n) => n.id === e.id), s = [...this.backendMessages];
    t >= 0 ? s[t] = e : s.push(e), this.backendMessages = s, this._changed();
  }
  setPlant(e) {
    const t = JSON.stringify(Vt(this.plant));
    this.plant = e, Os(Vs(e.settings.language, this.hass?.language)), this._collectBound(), e.settings.demo ? (!this.sim || JSON.stringify(Vt(e)) !== t) && this._startSim() : (this._stopSim(), this._checkStates()), this.version++, this._changed();
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
    const e = this.plant?.components.find((n) => n.type === "dhw_tank"), t = new zn(Vt(this.plant), void 0, { dhw: e?.label || c("type.dhw_tank") });
    this.sim = t, this._unsubSim = t.onMessage(() => {
      this.simMessages = [...t.messages], this._changed();
    }), this.simMessages = [...t.messages], this._lastFrame = performance.now();
    const s = (n) => {
      const i = (n - this._lastFrame) / 1e3;
      this._lastFrame = n, document.hidden || (t.advance(i), this._accum += i, this._accum >= 1 / Wn && (this._accum = 0, this.version++, this._changed())), this._raf = requestAnimationFrame(s);
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
const Wi = ee`
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
`, ne = ee`
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
`, Pn = {
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
  warn: "M12 3l10 18H2zM12 10v5M12 18h.01",
  error: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM9 9l6 6M15 9l-6 6",
  notice: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM12 7v6M12 16h.01",
  search: "M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14zM20 20l-4-4",
  download: "M12 4v11M7 10l5 5l5-5M5 20h14",
  upload: "M12 20V9M7 14l5-5l5 5M5 4h14"
};
function R(o) {
  return k`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d=${Pn[o] || ""} /></svg>`;
}
const qt = k`<svg viewBox="0 0 32 32" class="logo" aria-hidden="true">
  <defs><linearGradient id="cp-logo" x1="0" y1="1" x2="1" y2="0">
    <stop offset="0" stop-color="#38d0ff" /><stop offset="0.55" stop-color="#3ddc97" /><stop offset="1" stop-color="#ffb35c" />
  </linearGradient></defs>
  <path d="M24 7.5A11 11 0 1 0 24 24.5" fill="none" stroke="url(#cp-logo)" stroke-width="4" stroke-linecap="round" />
  <path d="M16 9c3 4 5 6.5 5 9a5 5 0 0 1-10 0c0-2.5 2-5 5-9z" fill="url(#cp-logo)" />
</svg>`, Cn = 7, Dn = 35, Pi = 4.9;
function dt(o, e, t = "air") {
  const s = e + 273.15 + 3, n = (t === "air" ? o - 6 : 0) + 273.15;
  return Math.max(1.2, Math.min(8, 0.57 * s / Math.max(5, s - n)));
}
function Tn(o, e, t = Pi, s = "air") {
  return t * dt(o, e, s) / dt(Cn, Dn, s);
}
function Ln(o) {
  return o >= 0.9 ? "green" : o >= 0.75 ? "yellow" : "red";
}
const _e = { green: "#3ddc97", yellow: "#f5c542", red: "#ff5a5f" };
function Ci(o, e) {
  const t = o.components.find((_) => _.type === "outdoor_unit"), s = o.components.find((_) => _.type === "indoor_unit");
  if (!t || !s) return;
  const n = (_, g) => {
    const b = e.get(_, g);
    return b?.available && b.num !== null ? b.num : void 0;
  }, i = n(t, "heat_power");
  let r = n(t, "el_power");
  r !== void 0 && e.get(t, "el_power")?.unit === "kW" && (r *= 1e3);
  const a = n(t, "outdoor_temp"), l = n(s, "supply_temp"), d = String(e.get(t, "activity")?.raw ?? "").toLowerCase();
  if (i === void 0 || r === void 0 || a === void 0 || l === void 0 || i < 0.5 || r < 80 || d.includes("defrost") || d.includes("abtau")) return;
  const h = i / (r / 1e3), p = Le(t.model).source, m = Tn(a, l, Number(t.props.cop_ref) || Pi, p), u = h / m;
  return { cop: h, expected: m, ratio: u, ampel: Ln(u), tOut: a, tFlow: l };
}
function Gs(o) {
  return o && o.el > 0.05 ? o.heat / o.el : void 0;
}
const at = { heat: 0, el: 0, heatDhw: 0, elDhw: 0, aux: 0 };
function je(o, e) {
  return {
    heat: o.heat + (e.heat || 0),
    el: o.el + (e.el || 0),
    heatDhw: o.heatDhw + (e.heatDhw || 0),
    elDhw: o.elDhw + (e.elDhw || 0),
    aux: o.aux + (e.aux || 0)
  };
}
function Ke(o) {
  return new Date(o.getFullYear(), o.getMonth(), o.getDate()).getTime();
}
const Hn = {
  heat: ["heat_energy_total"],
  el: ["el_energy_total"],
  heatDhw: ["heat_energy_dhw"],
  elDhw: ["el_energy_dhw"],
  aux: ["aux_energy_total"]
};
async function On(o, e) {
  const t = e.components.find((b) => b.type === "indoor_unit"), s = {};
  for (const [b, v] of Object.entries(Hn)) {
    const x = v.map(($) => t?.bindings[$]).find(Boolean);
    x && (s[b] = x);
  }
  const n = { today: null, yesterday: null, month: null, year: null, daily: [], estimated: { month: !1, year: !1 } };
  if (!s.heat || !s.el) return { ...n, missing: "no_counters" };
  const i = /* @__PURE__ */ new Date(), r = Object.values(s), a = (b, v) => o.callWS({
    type: "recorder/statistics_during_period",
    start_time: b.toISOString(),
    end_time: i.toISOString(),
    statistic_ids: r,
    period: v,
    types: ["change"],
    units: { energy: "kWh" }
  }), [l, d] = await Promise.all([
    a(new Date(Ke(i) - 30 * 864e5), "day"),
    a(new Date(i.getFullYear(), 0, 1), "month")
  ]), h = /* @__PURE__ */ new Map();
  for (const [b, v] of Object.entries(s))
    for (const x of l[v] || []) {
      const $ = Ke(new Date(x.start));
      h.set($, je(h.get($) || at, { [b]: x.change || 0 }));
    }
  if (!h.size) return { ...n, missing: "no_statistics" };
  const p = [...h.entries()].sort((b, v) => b[0] - v[0]).map(([b, v]) => ({ day: b, ...v })), m = h.get(Ke(i)) || null, u = h.get(Ke(i) - 864e5) || null;
  let _ = at, g = null;
  for (const [b, v] of Object.entries(s))
    for (const x of d[v] || [])
      _ = je(_, { [b]: x.change || 0 }), new Date(x.start).getMonth() === i.getMonth() && (g = je(g || at, { [b]: x.change || 0 }));
  return { today: m, yesterday: u, month: g, year: _, daily: p, estimated: { month: !1, year: !1 } };
}
const Di = [2, 3, 6.5, 10.5, 14.5, 18, 20, 19.5, 15.5, 10.5, 6, 3], Ys = 0.8;
function Rt(o, e, t, s) {
  const n = s ?? Di[e], i = o.p, r = i.heatLoad / (21 - i.designTemp);
  let a = 0, l = 0;
  for (const p of [-4, -2, 0, 2, 4]) {
    const m = n + p;
    if (m >= 16) continue;
    const u = r * (21 - m) * 24 * t * 0.2 * 0.85, _ = 21 + (21 - m) * ((i.floor ? 35 : 50) - 21) / (21 - i.designTemp);
    a += u, l += u / (dt(m, _, i.source) * Ys);
  }
  const d = 8.4 * t * (i.dhwL > 0 ? 1 : 0), h = d / (dt(n, 53, i.source) * Ys);
  return { heat: a + d, el: l + h, heatDhw: d, elDhw: h, aux: 0 };
}
function Vn(o) {
  const e = new Date(o.time * 1e3), t = Ke(e), s = o.dailyEnergy(), n = s.find((d) => d.day === t) || null, i = s.find((d) => d.day === t - 864e5) || null, r = Rt(o, e.getMonth(), e.getDate() - 1 + e.getHours() / 24, o.outdoorMean);
  let a = at;
  for (let d = 0; d < e.getMonth(); d++) a = je(a, Rt(o, d, new Date(e.getFullYear(), d + 1, 0).getDate()));
  a = je(a, r);
  const l = [];
  for (let d = 29; d >= 2; d--) {
    const h = t - d * 864e5, p = new Date(h), m = d <= 14 ? (14 - d) / 14 : 0, u = Di[p.getMonth()] * (1 - m) + o.outdoorMean * m + Math.sin(d * 1.3) * 2, _ = Rt(o, p.getMonth(), 1, u), g = 1 + Math.sin(d * 1.7) * 0.18;
    l.push({ day: h, ..._, heat: _.heat * g, el: _.el * g * (1 + Math.cos(d) * 0.04) });
  }
  return {
    today: n,
    yesterday: i,
    month: r,
    year: a,
    daily: [...l, ...s.filter((d) => d.day >= t - 864e5)],
    estimated: { month: !0, year: !0 }
  };
}
const Ee = (o, ...e) => o.components.find((t) => e.includes(t.type));
function Ti(o) {
  const e = (s, n) => {
    if (!s) return;
    const i = o.get(s, n);
    return i?.available && i.num !== null && Number.isFinite(i.num) ? i.num : void 0;
  };
  return { num: e, on: (s, n) => {
    const i = e(s, n);
    if (i !== void 0) return i > 0;
    if (!s) return !1;
    const r = String(o.get(s, n)?.raw ?? "").toLowerCase();
    return ["on", "true", "an", "ein", "1", "yes"].includes(r);
  } };
}
const Ve = (o) => Math.round(o * 10) / 10;
function Bn(o, e) {
  const { num: t, on: s } = Ti(e), n = Ee(o, "outdoor_unit"), i = Ee(o, "indoor_unit"), r = Ee(o, "buffer"), a = Ee(o, "dhw_tank"), l = Ee(o, "radiators", "floor_heating"), d = Ee(o, "tap"), h = o.components.find((H) => H.type === "pump" && H.props.role === "circulation"), p = n ? ge(n, e) : /* @__PURE__ */ new Set(), m = i ? ge(i, e) : /* @__PURE__ */ new Set(), u = [];
  if (!n && !i) return u;
  const _ = Le(n?.model).source === "brine", g = t(n, "outdoor_temp"), b = t(n, "heat_power");
  let v = t(n, "el_power");
  v !== void 0 && n && e.get(n, "el_power")?.unit !== "kW" && (v /= 1e3);
  const x = b !== void 0 && v !== void 0 && v > 0.05 && b > 0.2 ? b / v : void 0, $ = t(n, "compressor_speed"), S = t(i, "supply_temp"), C = t(i, "return_temp"), O = t(i, "target_flow_temp") ?? t(l, "target_flow_temp"), j = t(r, "temp_top") ?? t(i, "buffer_temp"), Q = t(a, "temp_top") ?? t(i, "dhw_temp"), A = t(a, "setpoint") ?? t(i, "dhw_setpoint"), P = t(i, "aux_level"), I = t(l, "heating_limit") ?? 16, K = n ? Xe(e.get(n, "activity")) : void 0, L = p.has("running"), W = K === "hot_water" || L && m.has("b"), E = W || s(a, "charging") || m.has("charging"), T = _ ? "ground" : "air", V = p.has("defrost");
  if (p.has("alarm") ? u.push({ id: "alarm", tone: "error", key: "ex.alarm", params: {}, comp: n?.id }) : p.has("defrost") ? u.push({ id: "defrost", tone: "cold", key: "ex.defrost", params: { out: g }, hint: "ex.defrost_hint", comp: n?.id }) : L && W ? u.push({
    id: "dhw",
    tone: "dhw",
    key: Q !== void 0 && A !== void 0 ? "ex.dhw_charge" : "ex.dhw_charge_short",
    params: { dhw: Q, set: A },
    hint: "ex.dhw_charge_hint",
    comp: a?.id ?? i?.id
  }) : L ? u.push({
    id: "heating",
    tone: "heat",
    key: b !== void 0 && v !== void 0 ? `ex.heating_${T}` : `ex.heating_${T}_short`,
    params: { out: g, heat: b !== void 0 ? Ve(b) : void 0, el: v !== void 0 ? Ve(v) : void 0 },
    comp: n?.id
  }) : g !== void 0 && g >= I ? u.push({ id: "off", tone: "info", key: "ex.off_limit", params: { out: g, limit: I }, comp: n?.id }) : j !== void 0 && O !== void 0 && j >= O - 1 ? u.push({ id: "off", tone: "info", key: "ex.off_buffer", params: { buf: j, target: O }, hint: "ex.off_buffer_hint", comp: r?.id ?? i?.id }) : u.push({ id: "off", tone: "info", key: "ex.off", params: {}, comp: n?.id }), L && !p.has("defrost") && x !== void 0 && u.push({
    id: "cop",
    tone: x >= 3.5 ? "eco" : x >= 2.5 ? "info" : "warn",
    key: "ex.cop",
    params: { cop: Ve(x), speed: $ },
    hint: $ !== void 0 ? "ex.cop_modulating" : void 0,
    comp: n?.id
  }), !W && !V && O !== void 0 && g !== void 0 && g < I && u.push({
    id: "curve",
    tone: "heat",
    key: S !== void 0 ? "ex.curve" : "ex.curve_short",
    params: { out: g, target: O, sup: S },
    hint: "ex.curve_hint",
    comp: i?.id
  }), L && !W && !V && S !== void 0 && C !== void 0) {
    const H = S - C;
    u.push({
      id: "spread",
      tone: H >= 3 && H <= 8 ? "eco" : H >= 2 && H <= 10 ? "info" : "warn",
      key: H < 2 ? "ex.spread_low" : H > 10 ? "ex.spread_high" : "ex.spread_ok",
      params: { spread: Ve(H), sup: S, ret: C },
      comp: i?.id
    });
  }
  if (j !== void 0 && (r || ve(i)?.id === "tp70")) {
    const H = m.has("pc1") || o.components.some((J) => J.type === "pump" && J.props.circuit === 1 && ge(J, e).has("running")), G = L && !W && !V && S !== void 0 && S - j > 2;
    u.push({
      id: "buffer",
      tone: G ? "warn" : "info",
      key: G ? "ex.buffer_mixing" : H ? "ex.buffer_pc1" : "ex.buffer",
      params: { buf: j, loss: S !== void 0 ? Ve(S - j) : void 0 },
      comp: r?.id ?? i?.id
    });
  }
  const D = t(l, "room_temp");
  if (l && D !== void 0) {
    const H = t(l, "room_setpoint");
    u.push({
      id: "room",
      tone: H !== void 0 && D < H - 1 ? "warn" : "info",
      key: H !== void 0 ? "ex.room" : "ex.room_short",
      params: { room: D, set: H, name: l.label },
      comp: l.id
    });
  }
  s(a, "disinfecting") ? u.push({ id: "disinfect", tone: "dhw", key: "ex.disinfect", params: {}, comp: a?.id }) : Q !== void 0 && !E && u.push({ id: "dhw_idle", tone: "info", key: A !== void 0 ? "ex.dhw_idle" : "ex.dhw_idle_short", params: { dhw: Q, set: A }, comp: a?.id ?? i?.id }), d && s(d, "flow") && u.push({ id: "tap", tone: "dhw", key: "ex.tap", params: { flow: t(d, "flow") }, comp: d.id }), h && ge(h, e).has("running") && u.push({ id: "circ", tone: "info", key: "ex.circ", params: {}, hint: "ex.circ_hint", comp: h.id }), m.has("aux") && u.push({ id: "aux", tone: "warn", key: P !== void 0 ? "ex.aux" : "ex.aux_short", params: { aux: P }, hint: "ex.aux_hint", comp: i?.id });
  const B = i?.props.input_labels || {};
  for (const H of [1, 2, 3, 4]) {
    if (!s(i, `input${H}`)) continue;
    const G = B[`input${H}`] || "", J = /14a|evu|sperr/i.test(G) ? "14a" : /pv|solar|überschuss|surplus/i.test(G) ? "pv" : "other";
    u.push({
      id: `input${H}`,
      tone: J === "pv" ? "eco" : "warn",
      key: `ex.input_${J}`,
      params: { n: H, label: G },
      comp: i?.id
    });
  }
  return u;
}
function Rn(o, e) {
  const t = ge(o, e), { num: s } = Ti(e);
  switch (o.type) {
    case "outdoor_unit":
      return {
        role: Le(o.model).source === "brine" ? "exc.outdoor_brine" : "exc.outdoor",
        state: t.has("defrost") ? "exs.defrost" : t.has("running") ? "exs.compressor_on" : "exs.compressor_off",
        params: { speed: s(o, "compressor_speed") }
      };
    case "indoor_unit":
      return {
        role: `exc.indoor_${ve(o)?.id || "wall_e"}`,
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
function qs(o) {
  if (!o?.available || o.num === null || !Number.isFinite(o.num)) return;
  const e = (o.unit || "").toLowerCase();
  return e === "kw" ? o.num : e === "mw" ? o.num * 1e3 : o.num / 1e3;
}
const Xs = (o, e) => o.components.find((t) => t.type === e);
function In(o, e) {
  const t = o?.props.input_labels || {};
  let s = !1, n = !1;
  for (const i of [1, 2, 3, 4]) {
    if (!o || !Z(e.get(o, `input${i}`))) continue;
    const r = t[`input${i}`] || "";
    /14a|evu|sperr/i.test(r) ? s = !0 : /pv|solar|überschuss|surplus/i.test(r) && (n = !0);
  }
  return { dim14a: s, pv: n };
}
function Nn(o, e) {
  const t = o.settings.energy;
  return !!e || !!(t?.enabled && (t.pv || t.grid || t.battery || t.house || t.wallbox));
}
function Kn(o, e, t) {
  const s = o.settings.energy || {}, n = Xs(o, "outdoor_unit"), i = Xs(o, "indoor_unit"), r = In(i, e), a = s.limit_14a ?? 4.2, l = !!(s.enabled && (s.pv || s.grid || s.battery || s.house || s.wallbox));
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
  const d = ($) => e instanceof Ei ? e.realEntity($) : e.getEntity($), h = ($) => $ ? qs(d($)) : void 0, p = h(s.pv);
  let m = h(s.grid);
  m !== void 0 && s.grid_invert && (m = -m);
  let u = h(s.battery);
  u !== void 0 && s.battery_invert && (u = -u);
  const _ = s.battery_soc ? d(s.battery_soc) : void 0, g = _?.available && _.num !== null ? _.num : void 0, b = h(s.wallbox), v = n ? qs(e.get(n, "el_power")) : void 0;
  let x = h(s.house);
  return x !== void 0 ? !t && s.house_includes_hp !== !1 && v !== void 0 && (x -= v) : m !== void 0 && !t && (x = m + (p ?? 0) + (u ?? 0) - (v ?? 0) - (b ?? 0)), x !== void 0 && (x = Math.max(0, x)), { pv: p, grid: m, battery: u, soc: g, house: x, wallbox: b, hp: v, dim14a: r.dim14a, pvSignal: r.pv, limit14a: a };
}
function Fn(o) {
  const e = Object.keys(o.states), t = (i) => o.states[i] ? i : void 0, s = (i) => e.find((r) => i.test(r));
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
  const n = (i) => s(new RegExp(`^sensor\\.solax.*${i.source}`));
  return s(/^sensor\.solax/) ? {
    enabled: !0,
    pv: n(/pv_power_total$/),
    // SolaX reports export as positive ("measured power") and charging as positive
    grid: n(/measured_power$/),
    grid_invert: !0,
    battery: n(/battery_power_charge$/),
    battery_invert: !0,
    battery_soc: s(/^sensor\.solax_battery_capacity$/),
    house: n(/house_load$/),
    house_includes_hp: !0
  } : { enabled: !0 };
}
const jn = {
  w: 640,
  h: 232,
  bus: 105,
  busX: [40, 540],
  pos: { pv: [80, 42], grid: [290, 42], battery: [500, 42], hp: [80, 168], house: [290, 168], wallbox: [500, 168] }
}, Un = {
  w: 1240,
  h: 118,
  bus: 98,
  busX: [40, 1180],
  pos: { pv: [70, 34], grid: [265, 34], battery: [460, 34], hp: [705, 34], house: [900, 34], wallbox: [1095, 34] }
}, Js = {
  pv: "#ffc93c",
  grid: "#9aa7b4",
  battery: "#3ddc97",
  hp: "#ff8a3d",
  house: "#6cc4ff",
  wallbox: "#b48cff"
}, Zn = {
  pv: "M3 18h18l-3-9H6zM9 9l-1 9M15 9l1 9M4.5 13.5h15M12 2v3M5 4l1.5 2M19 4l-1.5 2",
  grid: "M12 2l-6 20M12 2l6 20M8 9h8M7 14h10M5 20h14M12 2v4",
  battery: "M6 6h12v15H6zM10 3h4v3M9 13h6M12 10v6",
  hp: "M4 5h16v14H4zM10 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0M10 12l2-3M10 12l-3 1M10 12l1 3M16 8h2M16 11h2M16 14h2",
  house: "M3 11l9-7l9 7M5 10v10h14V10M10 20v-6h4v6",
  wallbox: "M7 3h10v18H7zM10 8h4M12 12l-2 3h4l-2 3M17 14h2v4a2 2 0 0 0 2 2"
};
function Gn(o) {
  const e = Math.abs(o);
  return e > 5 ? 0.6 : e > 2 ? 0.9 : e > 0.5 ? 1.3 : 1.9;
}
const ft = class ft extends X {
  constructor() {
    super(...arguments), this._wide = !1;
  }
  _node(e, t, s, n) {
    const [i, r] = e.pos[t], a = r < e.bus, l = s === void 0, d = s ?? 0, h = !l && Math.abs(d) >= 0.05, p = Js[t], m = h ? 2.5 + Math.min(6, Math.abs(d) * 0.9) : 2, u = a ? r + 26 : r - 26, _ = a === d > 0, g = c(t === "grid" && h ? d > 0 ? "en.grid_import" : "en.grid_export" : t === "battery" && h ? d > 0 ? "en.bat_discharge" : "en.bat_charge" : `en.${t}`);
    return k`
      <line x1=${i} y1=${u} x2=${i} y2=${e.bus} class="link" style="stroke:${h ? p : "var(--cp-border)"}; stroke-width:${m}" />
      ${h ? k`<line x1=${i} y1=${u} x2=${i} y2=${e.bus} class="dots ${_ ? "down" : "up"}" style="animation-duration:${Gn(d)}s" />` : w}
      <g class="node ${l ? "missing" : ""}" transform="translate(${i} ${r})">
        <circle r="25" class="ring" style="stroke:${h ? p : "var(--cp-border)"}" />
        <path d=${Zn[t]} transform="translate(-12 -12)" class="glyph" style="stroke:${h ? p : "var(--cp-muted)"}" />
      </g>
      <text x=${i + 36} y=${r - 4} class="lbl">${g}</text>
      <text x=${i + 36} y=${r + 15} class="val">${l ? "–" : F(Math.abs(d), Math.abs(d) < 10 ? 2 : 1)}<tspan class="unit"> kW</tspan></text>
      ${n ? k`<g transform="translate(${i + 36} ${r + 23})">${n}</g>` : w}
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
    if (!e) return w;
    const t = this._wide ? Un : jn, s = (e.pv ?? 0) + Math.max(0, e.battery ?? 0), n = (e.house ?? 0) + (e.wallbox ?? 0) + (e.hp ?? 0), i = n > 0.05 && (e.pv !== void 0 || e.battery !== void 0) ? Math.min(1, s / n) : void 0, r = e.soc, a = r !== void 0 ? k`<rect width="44" height="6" rx="3" class="soc-bg" />
            <rect width=${44 * Math.max(0, Math.min(100, r)) / 100} height="6" rx="3" style="fill:${Js.battery}" />
            <text x="50" y="7" class="soc">${Math.round(r)} %</text>` : void 0, l = (d) => d === void 0 ? void 0 : -d;
    return f`<div class="head">
        <b>${c("en.title")}</b>
        ${i !== void 0 ? f`<span class="share">${c("en.share", { pct: Math.round(i * 100) })}</span>` : w}
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
ft.properties = { flow: { attribute: !1 } }, ft.styles = ee`
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
let Xt = ft;
customElements.get("cp-energy") || customElements.define("cp-energy", Xt);
const Qs = {
  heating: "#ff8a3d",
  hot_water: "#ff4f8b",
  defrost: "#6cc4ff",
  compressor_alarm: "#ff4d4d",
  cooling: "#38d0ff",
  off: "#8b949e"
};
function xs(o, e, t = 10, s = "casing") {
  return k`<rect class=${s} x="0" y="0" width=${o} height=${e} rx=${t} />
    <rect class="sheen" x="2" y="2" width=${o - 4} height=${Math.min(e * 0.35, 40)} rx=${t - 2} />`;
}
function Yn(o) {
  const { w: e, h: t, flags: s, c: n } = o, i = Le(n.model);
  if (i.source === "brine") return qn(o);
  const r = s.has("running") && !s.has("defrost"), a = s.has("defrost"), l = s.has("alarm"), d = e * 0.36, h = t * 0.5, p = Math.min(t * 0.38, e * 0.3), m = o.num("fan_speed") ?? (r ? 60 : 0), u = m <= 0 ? 0 : m < 45 ? 2.8 : m < 70 ? 2 : 1.5, _ = l ? "#ff4d4d" : a ? "#6cc4ff" : r ? "#3ddc97" : "#5b6573", g = [0, 120, 240].map(
    (b) => k`<path transform="rotate(${b})" d="M0 0 C ${p * 0.18} ${-p * 0.25}, ${p * 0.55} ${-p * 0.35}, ${p * 0.82} ${-p * 0.12} C ${p * 0.6} ${p * 0.05}, ${p * 0.25} ${p * 0.08}, 0 0 Z" />`
  );
  return k`
    <rect class="foot" x=${e * 0.12} y=${t - 2} width=${e * 0.16} height="6" rx="2" />
    <rect class="foot" x=${e * 0.72} y=${t - 2} width=${e * 0.16} height="6" rx="2" />
    ${xs(e, t, 12)}
    <circle class="grille-bg" cx=${d} cy=${h} r=${p + 4} />
    <g transform="translate(${d} ${h})">
      <g class=${u ? "spin fan" : "fan"} style=${u ? `--dur:${u}s` : ""}>${g}<circle r=${p * 0.12} class="hub" /></g>
    </g>
    ${[0.45, 0.72, 1].map((b) => k`<circle class="grille" cx=${d} cy=${h} r=${p * b} />`)}
    <line class="grille" x1=${d - p} y1=${h} x2=${d + p} y2=${h} />
    <line class="grille" x1=${d} y1=${h - p} x2=${d} y2=${h + p} />
    ${[0, 1, 2, 3, 4, 5].map((b) => k`<rect class="vent" x=${e * 0.73} y=${t * 0.22 + b * t * 0.1} width=${e * 0.19} height="3" rx="1.5" />`)}
    <circle cx=${e * 0.9} cy=${t * 0.12} r="4" fill=${_} class=${r || a ? "pulse" : ""} />
    ${i.refrigerant ? k`<text class="tag" x=${e * 0.825} y=${t * 0.9} text-anchor="middle">${i.refrigerant}</text>` : ""}
    ${a ? k`<rect x="2" y="2" width=${e - 4} height=${t - 4} rx="10" class="frost" />
        <g class="pulse" transform="translate(${d} ${h})">${Xn(p * 0.55)}</g>` : ""}
    ${l ? k`<rect x="1" y="1" width=${e - 2} height=${t - 2} rx="11" class="alarm-ring" />` : ""}
  `;
}
function qn(o) {
  const { w: e, h: t, flags: s } = o, n = s.has("running");
  return k`
    ${xs(e, t * 0.55, 10)}
    <text class="tag" x=${e / 2} y=${t * 0.32} text-anchor="middle">SOLE</text>
    <rect class="ground" x="0" y=${t * 0.62} width=${e} height=${t * 0.38} rx="6" />
    ${[0.2, 0.4, 0.6, 0.8].map(
    (i) => k`<path class=${n ? "probe active" : "probe"} d="M${e * i - 6} ${t * 0.55} V ${t * 0.95} M${e * i + 6} ${t * 0.55} V ${t * 0.95} M${e * i - 6} ${t * 0.95} Q ${e * i} ${t} ${e * i + 6} ${t * 0.95}" />`
  )}
  `;
}
function Xn(o) {
  const e = [0, 60, 120].map(
    (t) => k`<g transform="rotate(${t})"><line x1=${-o} y1="0" x2=${o} y2="0" />
      <path d="M${o * 0.6} 0 l ${o * 0.2} ${-o * 0.2} M${o * 0.6} 0 l ${o * 0.2} ${o * 0.2} M${-o * 0.6} 0 l ${-o * 0.2} ${-o * 0.2} M${-o * 0.6} 0 l ${-o * 0.2} ${o * 0.2}" /></g>`
  );
  return k`<g class="snow">${e}</g>`;
}
const M = 20;
function N(o, e, t) {
  const s = o.map(([n, i], r) => `${r ? "L" : "M"} ${n * M} ${i * M}`).join(" ");
  return k`<path class="ipipe" d=${s} style="stroke:${e}" />
    ${t ? k`<path class="ipipe-flow" d=${s} />` : w}`;
}
function Be([o, e], t, s = "l", n = "PC0") {
  const i = 0.55 * M, r = { r: 0, d: 90, l: 180, u: 270 }[s];
  return k`<g transform="translate(${o * M} ${e * M})">
    ${t ? k`<circle class="pump-glow pulse" r=${i + 4} />` : w}
    <circle class=${t ? "pump-body on" : "pump-body"} r=${i} />
    <path class=${t ? "pump-tri on" : "pump-tri"} transform="rotate(${r})" d="M ${-i * 0.5} ${-i * 0.8} L ${i} 0 L ${-i * 0.5} ${i * 0.8} Z" />
    <circle class=${t ? "impeller spin" : "impeller"} style="--dur:0.9s" r=${i * 0.36} />
    <text class="itag halo" y=${i + 9} text-anchor="middle">${n}</text>
  </g>`;
}
function et([o, e], t, s = "VW1", n = !1) {
  const i = 0.5 * M;
  return k`<g transform="translate(${o * M} ${e * M})">
    <path class="valve-tri on" d="M ${-i} ${-i * 0.6} L 0 0 L ${-i} ${i * 0.6} Z" transform="rotate(-90)" />
    <path class=${t ? "valve-tri" : "valve-tri on"} d="M ${i} ${-i * 0.6} L 0 0 L ${i} ${i * 0.6} Z" />
    <path class=${t ? "valve-tri on" : "valve-tri"} d="M ${-i} ${-i * 0.6} L 0 0 L ${-i} ${i * 0.6} Z" />
    ${n ? k`<text class="itag" x=${-i - 3} y=${-i * 0.4} text-anchor="end">${s} ${t ? "B" : "A"}</text>` : k`<text class="itag" x=${i + 3} y=${-i} >${s} ${t ? "B" : "A"}</text>`}
  </g>`;
}
function tt([o, e], t, s) {
  return k`<g transform="translate(${o * M} ${e * M})">
    ${s ? k`<rect class="aux-glow pulse" x=${-0.55 * M} y="-6" width=${1.1 * M} height=${t * M + 12} rx="10" />` : w}
    <rect class=${s ? "rod hot" : "rod"} x=${-0.35 * M} y="0" width=${0.7 * M} height=${t * M} rx="6" />
    <path class=${s ? "coil hot" : "coil"} d=${Jn(0, 6, t * M - 12, 4, 8)} />
  </g>`;
}
function Jn(o, e, t, s, n) {
  const i = t / n;
  let r = `M${o} ${e}`;
  for (let a = 1; a <= n; a++) r += ` L${o + (a % 2 ? -s : s)} ${e + a * i}`;
  return r;
}
function st(o, e, t, s) {
  const n = [...o.flags].find((r) => r.startsWith("mode_"))?.slice(5), i = Qs[n || "off"] || Qs.off;
  return k`<rect class="screen" x=${e} y=${t} width=${s} height="18" rx="4" />
    <rect x=${e + 4} y=${t + 4} width="14" height="10" rx="2" fill=${i} class=${n && n !== "off" ? "pulse" : ""} />
    <text class="screen-text" x=${e + 24} y=${t + 13}>${n ? c(`mode.${n}`) : ""}</text>`;
}
function Qn(o, e) {
  const { w: t, h: s, flags: n, c: i } = o, r = n.has("running"), a = n.has("b"), l = n.has("aux"), d = n.has("pc1"), h = te(o.num("supply_temp"), "#ff7a45"), p = te(o.num("return_temp"), "#4d9fff"), m = (i.model || "").match(/w[ls]w\d{3}i/i)?.[0]?.toUpperCase().replace("I", "i") || "";
  let u;
  if (e === "t180") {
    const _ = te(o.num("dhw_temp"), "#ff4f8b");
    u = k`
      <rect class="tank-in" x=${0.6 * M} y=${10 * M} width=${6.8 * M} height=${11.2 * M} rx=${M} style="fill:${_}" />
      <path class=${r && a ? "tank-coil hot" : "tank-coil"} d=${eo(2.4, 14, 5.6, 19.6)} />
      ${st(o, 1.6 * M, 0.8 * M, 4.6 * M)}
      ${N([[6, 0], [6, 6.2], [4.6, 6.2]], h, r)}
      ${N([[4.6, 6.2], [3, 6.2], [3, 0]], h, r && !a)}
      ${N([[4.6, 6.2], [4.6, 14]], h, r && a)}
      ${N([[2.4, 19.6], [1.6, 19.6], [1.6, 7.6]], p, r && a)}
      ${N([[1, 0], [1, 7.6]], p, r && !a)}
      ${N([[1, 7.6], [7, 7.6], [7, 0]], p, r)}
      ${N([[4, 10.2], [4, 0]], _, n.has("flowing"))}
      ${N([[5, 0], [5, 3], [5.6, 3], [5.6, 20.6]], "#38d0ff", n.has("flowing"))}
      ${tt([6, 1.4], 4, l)}
      ${et([4.6, 6.2], a)}
      ${Be([4.2, 7.6], r, "r")}
      ${k`<g transform="translate(${3 * M} ${3.4 * M})"><circle class=${d ? "pump-body on" : "pump-body"} r="8" /><text class="itag" x="12" y="4">PC1</text></g>`}`;
  } else if (e === "tp70") {
    const _ = te(o.num("buffer_temp"), "#ff9f45");
    u = k`
      <rect class="tank-in" x=${0.6 * M} y=${9.4 * M} width=${7.8 * M} height=${4.2 * M} rx=${M} style="fill:${_}" />
      <text class="tank-label" x=${4.5 * M} y=${13 * M} text-anchor="middle">${i.props.buffer_l || 70} l</text>
      ${st(o, 0.6 * M, 14.2 * M, 4.4 * M)}
      ${N([[3, 0], [3, 1.2]], _, !1)}
      ${N([[4, 0], [4, 1.2]], p, !1)}
      ${N([[2, 0], [2, 12.6]], p, d)}
      ${N([[1, 9.4], [1, 0]], _, d)}
      ${N([[6, 9.4], [6, 8]], p, r && !a)}
      ${N([[8, 0], [8, 8], [6, 8]], p, r && a)}
      ${N([[6, 8], [6, 0]], p, r)}
      ${N([[5, 0], [5, 6.4]], h, r)}
      ${N([[5, 6.4], [5, 9.4]], h, r && !a)}
      ${N([[5, 6.4], [7, 6.4], [7, 0]], h, r && a)}
      ${tt([5, 1.6], 2.8, l)}
      ${et([5, 6.4], a, "VW1", !0)}
      ${Be([6, 3.4], r, "u")}
      ${Be([1, 5], d, "u", "PC1")}`;
  } else e === "brine" ? u = k`
      ${st(o, 1.6 * M, 0.8 * M, 4.6 * M)}
      <circle class="compressor" cx=${2.2 * M} cy=${8.5 * M} r=${1.2 * M} />
      <text class="itag" x=${2.2 * M} y=${10.4 * M} text-anchor="middle">Verdichter</text>
      ${N([[1, 0], [1, 6], [2.2, 6], [2.2, 7.3]], "#38d0ff", r)}
      ${N([[2.2, 9.7], [2.2, 11.5], [2, 11.5], [2, 0]], "#2b6cff", r)}
      ${N([[4, 9], [4, 4], [5.5, 4], [5.5, 9]], h, r)}
      ${N([[5.5, 9], [7, 9], [7, 0]], h, r && !a)}
      ${N([[5.5, 9], [5.5, 10.4], [4, 10.4], [4, 0]], h, r && a)}
      ${N([[6, 0], [6, 11.6], [4, 11.6], [4, 9]], p, r && !a)}
      ${N([[5, 0], [5, 3.4]], p, r && a)}
      ${tt([4, 3], 3, l)}
      ${et([5.5, 9], a)}
      ${Be([5.5, 11.6], r, "l")}` : u = k`
      ${st(o, 2 * M, 0.8 * M, 6 * M)}
      ${N([[3, 14], [3, 9.6], [4.3, 9.6], [4.3, 2.8], [7.6, 2.8], [7.6, 10.6]], h, r)}
      ${N([[7.6, 10.6], [9, 10.6], [9, 14]], h, r && !a)}
      ${N([[7.6, 10.6], [7.6, 11.6], [5, 11.6], [5, 14]], h, r && a)}
      ${N([[8, 14], [8, 12.8], [6, 12.8]], p, r && !a)}
      ${N([[6, 14], [6, 12.8]], p, r && a)}
      ${N([[6, 12.8], [2, 12.8], [2, 14]], p, r)}
      ${tt([4.3, 3.4], 5.4, l)}
      ${et([7.6, 10.6], a)}
      ${Be([4.3, 12.8], r, "l")}`;
  return k`
    ${xs(t, s, 10, "casing light")}
    ${u}
    ${e === "wall_e" || e === "tp70" ? w : k`<text class="tag" x=${t / 2} y=${2.4 * M} text-anchor="middle">${m}</text>`}
  `;
}
function eo(o, e, t, s) {
  const i = (s - e) / 5;
  let r = `M ${t * M} ${e * M - 2 * M}`;
  r += ` L ${t * M} ${e * M}`;
  for (let a = 0; a < 5; a++) {
    const l = (e + a * i) * M;
    r += ` C ${(o - 0.3) * M} ${l}, ${(o - 0.3) * M} ${l + i / 2 * M}, ${t * M} ${l + i / 2 * M}`, r += ` C ${(t + 0.3) * M} ${l + i / 2 * M}, ${(t + 0.3) * M} ${l + i * M}, ${o * M} ${l + i * M}`;
  }
  return r;
}
function ei(o, e) {
  const { w: t, h: s, c: n, flags: i } = o, r = o.num("temp_top"), a = o.num("temp_bottom") ?? (r !== void 0 ? r - 6 : void 0), l = o.num("temp_mid") ?? (r !== void 0 && a !== void 0 ? (r + a) / 2 : void 0), d = `tg-${n.id}`, h = e === "dhw" ? "#ff4f8b" : "#ff7a45", p = i.has("charging"), m = n.props.volume ? `${n.props.volume} l` : "", u = Math.min(t / 2, 2 * M);
  return k`
    <defs>
      <linearGradient id=${d} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.05" stop-color=${te(r, h)} />
        <stop offset="0.5" stop-color=${te(l, "#c084fc")} />
        <stop offset="0.95" stop-color=${te(a, "#4d9fff")} />
      </linearGradient>
    </defs>
    <rect class="insulation" x="-3" y="-3" width=${t + 6} height=${s + 6} rx=${u + 3} />
    <rect x="0" y="0" width=${t} height=${s} rx=${u} fill="url(#${d})" class="tank-fill" />
    <rect class="tank-glass" x=${t * 0.1} y=${s * 0.06} width=${t * 0.12} height=${s * 0.88} rx=${t * 0.06} />
    ${e === "dhw" ? k`<path class=${p ? "tank-coil hot" : "tank-coil"} d=${to(t)} />
        <path class="dip" d="M 0 ${10 * M} H ${0.8 * M} V ${s - 0.4 * M}" />` : k`
        <path class="dip" d="M ${2 * M} 0 V ${s - 0.5 * M}" />
        <path class="dip" d="M ${3 * M} 0 V ${s - 0.5 * M}" />
        ${[0.3, 0.55, 0.8].map((_) => k`<line class="strat" x1=${t * 0.62} x2=${t * 0.9} y1=${s * _} y2=${s * _} />`)}`}
    <text class="tank-label" x=${t / 2} y=${s * (e === "dhw" ? 0.3 : 0.5)} text-anchor="middle">${m}</text>
    ${i.has("disinfecting") ? k`<text class="tank-badge" x=${t / 2} y=${s * 0.18} text-anchor="middle">60°</text>` : ""}
  `;
}
function to(o) {
  const e = o, t = o * 0.78, s = o * 0.3, n = 4 * M, i = 9 * M, r = 5, a = (i - n) / r;
  let l = `M ${e} ${n} H ${t}`;
  for (let d = 0; d < r; d++) {
    const h = n + d * a;
    l += ` C ${s - 6} ${h}, ${s - 6} ${h + a / 2}, ${t} ${h + a / 2} C ${t + 6} ${h + a / 2}, ${t + 6} ${h + a}, ${t} ${h + a}`;
  }
  return `${l} H ${e}`;
}
function so(o) {
  const { w: e, h: t, flags: s } = o, n = s.has("running"), i = Math.min(e, t) / 2 - 2, r = e / 2, a = t / 2;
  return k`
    ${n ? k`<circle class="pump-glow pulse" cx=${r} cy=${a} r=${i + 5} />` : ""}
    <circle class=${n ? "pump-body on" : "pump-body"} cx=${r} cy=${a} r=${i} />
    <path class=${n ? "pump-tri on" : "pump-tri"} d="M ${r - i * 0.5} ${a - i * 0.82} L ${r + i} ${a} L ${r - i * 0.5} ${a + i * 0.82} Z" />
    <g transform="translate(${r} ${a})">
      <circle class=${n ? "impeller spin" : "impeller"} style="--dur:0.9s" r=${i * 0.38} />
    </g>
  `;
}
function ti(o, e = !1) {
  const { w: t, h: s, flags: n } = o, i = t / 2, r = s / 2, a = Math.min(t, s) / 2 - 2, l = n.has("b"), d = (h) => e || h ? "valve-tri on" : "valve-tri";
  return k`
    <rect class="actuator" x=${i - a * 0.35} y=${r - a * 1.25} width=${a * 0.7} height=${a * 0.45} rx="2" />
    <line class="stem" x1=${i} y1=${r - a * 0.8} x2=${i} y2=${r} />
    <path class=${d(!0)} d="M ${i - a} ${r - a * 0.6} L ${i} ${r} L ${i - a} ${r + a * 0.6} Z" />
    <path class=${d(!l)} d="M ${i + a} ${r - a * 0.6} L ${i} ${r} L ${i + a} ${r + a * 0.6} Z" />
    <path class=${d(l)} d="M ${i - a * 0.6} ${r + a} L ${i} ${r} L ${i + a * 0.6} ${r + a} Z" />
    ${e ? "" : k`<text class="valve-tag" x=${i + a * 0.5} y=${r - a * 0.75}>${l ? "B" : "A"}</text>`}
  `;
}
function io(o) {
  const { w: e, h: t } = o, s = o.num("flow_temp"), n = o.num("return_temp"), i = o.num("room_temp"), r = s !== void 0 && i !== void 0 ? s - i > 6 : !1, a = 9, l = 0.45 * M, d = t - 0.45 * M, h = (e - 20) / a, p = `rg-${o.c.id}`;
  return k`
    <defs><linearGradient id=${p} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color=${te(s, "#8b949e")} stop-opacity=${r ? 0.85 : 0.25} />
      <stop offset="1" stop-color=${te(n, "#8b949e")} stop-opacity=${r ? 0.6 : 0.2} />
    </linearGradient></defs>
    ${r ? [0.3, 0.55, 0.8].map(
    (m, u) => k`<path class="heat-wave" style="animation-delay:${u * 0.6}s" d="M ${e * m} ${l - 4} q 5 -6 0 -12 q -5 -6 0 -12" />`
  ) : ""}
    <rect class="rad-frame" x="0" y=${l} width=${e - 4} height=${d - l} rx="6" />
    <rect class="rad-header" x="0" y=${M - 4} width=${e - 4} height="8" rx="4" />
    <rect class="rad-header" x="0" y=${5 * M - 4} width=${e - 4} height="8" rx="4" />
    ${Array.from({ length: a }, (m, u) => k`<rect x=${12 + u * h} y=${l + 6} width=${h - 3} height=${d - l - 12} rx=${(h - 3) / 2} fill="url(#${p})" class="fin" />`)}
  `;
}
function no(o) {
  const { w: e, h: t } = o, s = o.num("flow_temp"), n = te(s, "#8b949e");
  let i = `M 10 ${t * 0.25}`;
  const r = 5;
  for (let a = 0; a < r; a++)
    i += a % 2 === 0 ? ` H ${e - 12} q 6 0 6 ${t * 0.3 / r} q 0 ${t * 0.3 / r} -6 ${t * 0.3 / r}` : ` H 16 q -6 0 -6 ${t * 0.3 / r} q 0 ${t * 0.3 / r} 6 ${t * 0.3 / r}`;
  return k`
    <rect class="floor-slab" x="2" y=${t * 0.15} width=${e - 4} height=${t * 0.75} rx="6" />
    <path d=${i} fill="none" stroke=${n} stroke-width="3" stroke-linecap="round" opacity="0.9" />
  `;
}
function oo(o) {
  const { w: e, h: t, flags: s } = o, n = s.has("flowing");
  return k`
    <path class="tap-body" d="M ${e} ${t * 0.25} H ${e * 0.45} a ${e * 0.25} ${e * 0.25} 0 0 0 ${-e * 0.25} ${e * 0.25} V ${t * 0.62} h ${e * 0.16} V ${t * 0.52} a ${e * 0.1} ${e * 0.1} 0 0 1 ${e * 0.1} ${-e * 0.1} H ${e} Z" />
    <rect class="tap-handle" x=${e * 0.46} y=${t * 0.06} width=${e * 0.26} height=${t * 0.12} rx="3" />
    ${n ? [0, 1, 2].map((i) => k`<circle class="drop" style="animation-delay:${i * 0.25}s" cx=${e * 0.28} cy=${t * 0.7} r="2.5" />`) : ""}
  `;
}
function ro(o) {
  const { w: e, h: t } = o;
  return k`
    <rect class="casing" x="0" y=${t * 0.2} width=${e} height=${t * 0.6} rx="5" />
    <text class="tag" x=${e * 0.45} y=${t * 0.62} text-anchor="middle">KW</text>
  `;
}
function ao(o) {
  const { w: e, h: t, c: s } = o;
  return s.props.filter ? k`
      <rect class="casing" x=${e * 0.15} y=${t * 0.1} width=${e * 0.7} height=${t * 0.8} rx="5" />
      ${[0.3, 0.45, 0.6, 0.75].map((n) => k`<line class="sieve" x1=${e * 0.25} x2=${e * 0.75} y1=${t * n} y2=${t * n} />`)}
      ${[0.35, 0.5, 0.65].map((n) => k`<line class="sieve" x1=${e * n} x2=${e * n} y1=${t * 0.22} y2=${t * 0.8} />`)}` : k`
    <rect class="casing" x=${e * 0.2} y="0" width=${e * 0.6} height=${t} rx=${e * 0.3} />
    <path class="magnet" d="M ${e * 0.38} ${t * 0.3} v ${t * 0.25} a ${e * 0.12} ${e * 0.12} 0 0 0 ${e * 0.24} 0 v ${-t * 0.25}" />
  `;
}
function lo(o) {
  const { w: e, h: t } = o;
  return k`
    <line class="stem" x1=${e / 2} y1=${t * 0.8} x2=${e / 2} y2=${t} />
    <rect class="vessel" x="0" y="0" width=${e} height=${t * 0.82} rx=${e / 2} />
    <rect class="sheen" x=${e * 0.18} y=${t * 0.08} width=${e * 0.2} height=${t * 0.6} rx=${e * 0.1} />
  `;
}
function co(o) {
  switch (o.c.type) {
    case "outdoor_unit":
      return Yn(o);
    case "indoor_unit":
      return Qn(o, ve(o.c)?.id || "wall_e");
    case "buffer":
      return ei(o, "buffer");
    case "dhw_tank":
      return ei(o, "dhw");
    case "pump":
      return so(o);
    case "valve_3way":
      return ti(o);
    case "mixer":
      return ti(o, !0);
    case "radiators":
      return io(o);
    case "floor_heating":
      return no(o);
    case "tap":
      return oo(o);
    case "water_inlet":
      return ro(o);
    case "separator":
      return ao(o);
    case "expansion_vessel":
      return lo(o);
    case "junction":
      return k`<circle class="junction" r="4" />`;
    default:
      return k``;
  }
}
const si = 1, it = { l: { x: -1, y: 0 }, r: { x: 1, y: 0 }, t: { x: 0, y: -1 }, b: { x: 0, y: 1 } };
function It(o) {
  return o === "l" || o === "r";
}
function Li(o, e) {
  const t = e.get(o.from.c), s = e.get(o.to.c);
  if (!t || !s) return null;
  const n = ce(t, o.from.p), i = ce(s, o.to.p);
  if (!n || !i) return null;
  const r = t.type === "junction" ? 0 : si, a = s.type === "junction" ? 0 : si, l = { x: n.x, y: n.y }, d = { x: i.x, y: i.y }, h = { x: l.x + it[n.dir].x * r, y: l.y + it[n.dir].y * r }, p = { x: d.x + it[i.dir].x * a, y: d.y + it[i.dir].y * a }, m = It(n.dir), u = [l, h];
  if (o.via?.length) {
    let _ = !m;
    for (const [g, b] of [...o.via, [p.x, p.y]]) {
      const v = u[u.length - 1];
      if (v.x !== g && v.y !== b) {
        const $ = _ ? { x: v.x, y: b } : { x: g, y: v.y };
        u.push($);
      }
      _ = u[u.length - 1].x === g, u.push({ x: g, y: b });
    }
    return u.push(d), { pts: ii(u), horizontalStart: m };
  }
  if (m)
    if (h.y === p.y && o.bend === void 0)
      u.push(p);
    else {
      const _ = o.bend ?? (h.x + p.x) / 2;
      It(i.dir) ? u.push({ x: _, y: h.y }, { x: _, y: p.y }) : o.bend === void 0 ? u.push({ x: p.x, y: h.y }) : u.push({ x: _, y: h.y }, { x: _, y: p.y }), u.push(p);
    }
  else if (h.x === p.x && o.bend === void 0)
    u.push(p);
  else {
    const _ = o.bend ?? (h.y + p.y) / 2;
    It(i.dir) ? o.bend === void 0 ? u.push({ x: h.x, y: p.y }) : u.push({ x: h.x, y: _ }, { x: p.x, y: _ }) : u.push({ x: h.x, y: _ }, { x: p.x, y: _ }), u.push(p);
  }
  return u.push(d), { pts: ii(u), horizontalStart: m };
}
function ii(o) {
  const e = [];
  for (const t of o) {
    const s = e[e.length - 1];
    if (!(s && s.x === t.x && s.y === t.y)) {
      if (e.length >= 2) {
        const n = e[e.length - 2];
        if (n.x === s.x && s.x === t.x || n.y === s.y && s.y === t.y) {
          e[e.length - 1] = t;
          continue;
        }
      }
      e.push(t);
    }
  }
  return e;
}
function po(o, e = 8) {
  if (o.length === 0) return "";
  const t = o.map((i) => ({ x: i.x * z, y: i.y * z }));
  let s = `M ${t[0].x} ${t[0].y}`;
  for (let i = 1; i < t.length - 1; i++) {
    const r = t[i - 1], a = t[i], l = t[i + 1], d = Math.hypot(a.x - r.x, a.y - r.y), h = Math.hypot(l.x - a.x, l.y - a.y), p = Math.min(e, d / 2, h / 2), m = a.x - (a.x - r.x) / d * p, u = a.y - (a.y - r.y) / d * p, _ = a.x + (l.x - a.x) / h * p, g = a.y + (l.y - a.y) / h * p;
    s += ` L ${m} ${u} Q ${a.x} ${a.y} ${_} ${g}`;
  }
  const n = t[t.length - 1];
  return `${s} L ${n.x} ${n.y}`;
}
function ho(o, e) {
  for (let t = 2; t < o.length - 1; t++) {
    const s = o[t - 1], n = o[t], i = s.x === n.x;
    if (e ? i : !i) return { x: (s.x + n.x) / 2, y: (s.y + n.y) / 2 };
  }
  return null;
}
const he = 18, uo = 16, mo = 10, Nt = 8;
function fo(o, e, t) {
  if (o.icon) return null;
  switch (o.type) {
    case "outdoor_unit":
      return Le(o.model).source === "brine" ? { x: 0, y: 0, w: e, h: t * 0.55, r: 10 } : { x: 0, y: 0, w: e, h: t, r: 12 };
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
const re = 88, oe = 34, ie = 6;
function Kt(o, e = 17) {
  return o.length > e ? `${o.slice(0, e - 1)}…` : o;
}
const gt = class gt extends X {
  constructor() {
    super(...arguments), this.icons = /* @__PURE__ */ new Map(), this.edit = !1, this.autoHeight = !1, this.selected = null, this.version = 0, this._view = null, this._drag = null, this._connect = null, this._pointers = /* @__PURE__ */ new Map(), this._gesture = null, this._segments = [], this._pills = [], this._lastMoved = !1, this._structureKey = "", this._onKey = (e) => {
      e.key === "Escape" && this._connect && (this._connect = null);
    };
  }
  /** Does any pipe pass through the given pixel rectangle (with a small margin)? */
  _hitsPipe(e, t, s, n) {
    return this._segments.some((r) => r.x1 <= s + 5 && r.x2 >= e - 5 && r.y1 <= n + 5 && r.y2 >= t - 5);
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
    const t = this._view || this._contentBox(), s = t.x + t.w / 2, n = t.y + t.h / 2;
    this._view = { x: s - t.w * e / 2, y: n - t.h * e / 2, w: t.w * e, h: t.h * e };
  }
  // ------------------------------------------------------------- layout
  _comp(e) {
    return this._drag && this._drag.id === e.id ? { ...e, x: this._drag.dx, y: this._drag.dy } : e;
  }
  _shownSlots(e) {
    const t = e.show ?? pe(e).filter((s) => s.show).map((s) => s.key);
    return this.edit ? [] : t.filter((s) => this.src.get(e, s) !== void 0);
  }
  /** Slots shown in the component's value list (not anchored to a pipe or a measuring point). */
  _listSlots(e) {
    const t = new Set(Ns(e).filter((s) => s.at || s.pos).map((s) => s.key));
    return this._shownSlots(e).filter((s) => !t.has(s));
  }
  _badgeLayout(e) {
    const t = Is(e);
    if (t === "none" || t === "inside") return [];
    const s = this._listSlots(e);
    if (!s.length) return [];
    const { w: n, h: i } = le(e), r = e.x * z, a = e.y * z, l = n * z, d = i * z, h = [];
    if (t === "tank") {
      const p = { temp_top: 0.16, temp_mid: 0.48, temp_bottom: 0.8 }, m = [];
      for (const v of s)
        v in p ? h.push({ slot: v, x: r + 5, y: a + d * p[v] - 11, w: l - 10 }) : m.push(v);
      const _ = m.length * (oe + ie), g = [
        { x: r + l / 2 - re / 2, y: a + d + 26, dy: oe + ie },
        { x: r + l + 12, y: a + d * 0.35, dy: oe + ie },
        { x: r - 12 - re, y: a + d * 0.35, dy: oe + ie }
      ], b = g.find((v) => !this._hitsPipe(v.x, v.y, v.x + re, v.y + _)) || g[0];
      return m.forEach((v, x) => h.push({ slot: v, x: b.x, y: b.y + x * b.dy })), h;
    }
    if (t === "right")
      s.forEach((p, m) => h.push({ slot: p, x: r + l + 12, y: a + 4 + m * (oe + ie) }));
    else if (t === "left")
      s.forEach((p, m) => h.push({ slot: p, x: r - 12 - re, y: a + 4 + m * (oe + ie) }));
    else if (t === "above") {
      const p = pe(e).map((_) => _.key);
      s.sort((_, g) => p.indexOf(_) - p.indexOf(g));
      const m = Math.min(3, s.length) * (re + ie) - ie, u = r + l / 2 - m / 2;
      s.forEach(
        (_, g) => h.push({ slot: _, x: u + g % 3 * (re + ie), y: a - oe - 10 - Math.floor(g / 3) * (oe + ie) })
      );
    } else {
      const p = Math.max(2, Math.floor((l + 40) / (re + ie))), m = Math.ceil(s.length / p);
      s.forEach((u, _) => {
        const g = Math.floor(_ / p), v = (g === m - 1 ? s.length - g * p : p) * (re + ie) - ie;
        h.push({
          slot: u,
          x: r + l / 2 - v / 2 + _ % p * (re + ie),
          y: a + d + 26 + g * (oe + ie)
        });
      });
    }
    return h;
  }
  _contentBox() {
    let e = 1 / 0, t = 1 / 0, s = -1 / 0, n = -1 / 0;
    const i = (a, l) => {
      e = Math.min(e, a), t = Math.min(t, l), s = Math.max(s, a), n = Math.max(n, l);
    };
    for (const a of this.plant.components) {
      const { w: l, h: d } = le(a);
      i(a.x * z - 6, a.y * z - 6), i((a.x + l) * z + 6, (a.y + d) * z + 22);
      for (const h of this._badgeLayout(a))
        i(h.x, h.y), i(h.x + re, h.y + oe);
    }
    for (const a of this._pills)
      i(a.x, a.y), i(a.x + a.w, a.y + he);
    (this.edit || !Number.isFinite(e)) && (i(0, 0), i(this.plant.grid.w * z, this.plant.grid.h * z));
    const r = 24;
    return { x: e - r, y: t - r, w: s - e + 2 * r, h: n - t + 2 * r };
  }
  // -------------------------------------------------------------- render
  render() {
    if (!this.plant) return w;
    const e = this._view || this._contentBox(), t = new Map(this.plant.components.map((r) => [r.id, this._comp(r)])), s = new Map(this.plant.components.map((r) => [r.id, ge(r, this.src)])), n = wn(this.plant, this.src), i = this.plant.pipes.map((r) => ({ pipe: r, route: Li(r, t) }));
    return this._segments = i.flatMap(
      ({ route: r }) => (r?.pts || []).slice(1).map((a, l) => {
        const d = r.pts[l];
        return { x1: Math.min(d.x, a.x) * z, x2: Math.max(d.x, a.x) * z, y1: Math.min(d.y, a.y) * z, y2: Math.max(d.y, a.y) * z };
      })
    ), this._pills = this.edit ? [] : this._placePills(t, i), f`
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
        ${this._iso && !this.edit ? this._isoFloor(e) : w}
        ${this.edit ? this._grid() : w}
        ${this._iso ? this._isoLayer() : w}
        <g class="pipes ${this._iso ? "iso" : ""}">
          ${i.map(({ pipe: r, route: a }) => {
      if (!a) return w;
      const l = po(a.pts), d = vn(r, s), h = yn(r.kind, n.get(r.id)), p = this.selected?.kind === "p" && this.selected.id === r.id;
      return k`<g class="pipe ${d ? "active" : ""} ${p ? "selected" : ""}" data-pipe=${r.id}
                @pointerdown=${(m) => this._onPipeDown(m, r.id)}>
              <path class="pipe-hit" d=${l} />
              ${p ? k`<path class="pipe-sel" d=${l} />` : w}
              <path class="pipe-outline" d=${l} />
              ${this._iso ? k`<path class="pipe-depth" d=${l} style="stroke:${h}" />` : w}
              ${d ? k`<path class="pipe-halo" d=${l} style="stroke:${h}" />` : w}
              <path class="pipe-base" d=${l} style="stroke:${h}" />
              ${this._iso ? k`<path class="pipe-gloss" d=${l} />` : w}
              ${d ? k`<path class="pipe-flow" d=${l} />` : w}
            </g>`;
    })}
        </g>
        <g class="components">
          ${this.plant.components.map((r) => this._component(t.get(r.id), s.get(r.id)))}
        </g>
        <g class="pills">${this._pills.map((r) => this._anchorPill(r))}</g>
        ${this.edit ? this._editOverlays(t, i) : w}
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
    const t = { ...q[e.type], ...$e(e) }, { w: s, h: n } = le(e), i = (e.type === "value_tile" ? s : t.w) * z, r = (e.type === "value_tile" ? n : t.h) * z, a = fo(e, i, r);
    if (!a) return null;
    let { x: l, y: d, w: h, h: p } = a;
    e.flip && t.mirrorable && (l = i - (l + h));
    const m = t.rotatable && e.rot || 0;
    return m === 90 ? [l, d, h, p] = [r - (d + p), l, p, h] : m === 180 ? [l, d] = [i - (l + h), r - (d + p)] : m === 270 && ([l, d, h, p] = [d, i - (l + h), p, h]), { x: e.x * z + l, y: e.y * z + d, w: h, h: p, r: Math.min(a.r, h / 2, p / 2) };
  }
  /** 2.5D: soft shadows and extruded bodies, drawn behind pipes and components. */
  _isoLayer() {
    const e = this.plant.components.map((s) => this._isoBox(s)).filter((s) => !!s), t = Array.from({ length: Nt }, (s, n) => (Nt - n) / Nt);
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
        ${e.map((s) => t.map((n) => k`<rect x=${s.x + uo * n} y=${s.y - mo * n} width=${s.w} height=${s.h} rx=${s.r} fill="url(#cp-iso-grad)" />`))}
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
    const t = { ...q[e.type], ...$e(e) }, s = e.rot || 0;
    let n = `translate(${e.x * z} ${e.y * z})`;
    return e.flip && t.mirrorable && (n += ` translate(${t.w * z} 0) scale(-1 1)`), !t.rotatable || s === 0 ? n : s === 90 ? `${n} translate(${t.h * z} 0) rotate(90)` : s === 180 ? `${n} translate(${t.w * z} ${t.h * z}) rotate(180)` : `${n} translate(0 ${t.w * z}) rotate(270)`;
  }
  _component(e, t) {
    const s = { ...q[e.type], ...$e(e), ports: ot(e), badges: Is(e) }, { w: n, h: i } = le(e), r = (e.type === "value_tile" ? n : s.w) * z, a = (e.type === "value_tile" ? i : s.h) * z, l = ($) => {
      const S = this.src.get(e, $);
      return S?.available && S.num !== null ? S.num : void 0;
    }, d = ($) => {
      const S = this.src.get(e, $);
      return S?.available ? String(S.raw) : void 0;
    }, h = e.icon || this.plant.settings.typeIcons?.[e.type], p = h ? this.icons.get(h) : void 0, m = this.selected?.kind === "c" && this.selected.id === e.id;
    let u;
    e.type === "value_tile" ? u = this._tile(e, r, a) : e.type === "label" ? u = k`<text class="free-label" x="0" y=${z} style="font-size:${e.props.size || 18}px">${e.props.text || e.label}</text>` : p ? u = k`${t.has("running") ? k`<rect class="user-glow pulse" x="-4" y="-4" width=${r + 8} height=${a + 8} rx="10" />` : w}
        <image href=${p.data_url} x="0" y="0" width=${r} height=${a} preserveAspectRatio="xMidYMid meet" />` : u = co({ c: e, w: r, h: a, flags: t, num: l, text: d });
    const _ = !["junction", "label", "value_tile"].includes(e.type), g = s.ports.some(($) => {
      const S = ce(e, $.id);
      return S?.dir === "b" && Math.abs(S.x - (e.x + n / 2)) < Math.max(0.6, n * 0.35);
    });
    let b = (e.x + n / 2) * z, v = (e.y + i) * z + (s.badges === "above" ? 16 : 18), x = "middle";
    if (g) {
      const $ = Math.min(28, e.label.length) * 7.5;
      v = (e.y + i) * z + 4;
      const S = (e.x + n) * z + 6, C = e.x * z - 6, O = this._hitsPipe(S, v - 12, S + $, v + 3), j = this._hitsPipe(C - $, v - 12, C, v + 3);
      O && !j ? (b = C, x = "end") : (b = S, x = "start");
    }
    return k`
      <g class="comp ${m ? "selected" : ""}" data-id=${e.id}
         @pointerdown=${($) => this._onCompDown($, e)}>
        <g transform=${this._transform(e)}>
          ${u}
        </g>
        <rect class="comp-hit" x=${e.x * z - (e.type === "junction" ? 8 : 0)} y=${e.y * z - (e.type === "junction" ? 8 : 0)}
          width=${Math.max(16, n * z)} height=${Math.max(16, i * z)} rx="8" />
        ${m ? k`<rect class="sel-outline" x=${e.x * z - 6} y=${e.y * z - 6} width=${n * z + 12} height=${i * z + 12} rx="10" />` : w}
        ${_ ? k`<text class="comp-label" x=${b} y=${v} text-anchor=${x}>${Kt(e.label, 28)}</text>` : w}
      </g>
      ${this._badgeLayout(e).map(($) => $.w ? this._pill(e, $.slot, $.x, $.y, $.w) : this._chip(e, $.slot, $.x, $.y))}
    `;
  }
  _chip(e, t, s, n) {
    const i = this.src.get(e, t), r = Ie(e, t), { text: a, unit: l } = be(i, r), d = e.type === "value_tile" ? t : xe(e.type, t), p = r === "temp" && i?.num !== null && i?.available ? te(i.num, "#8b949e") : "var(--cp-accent)";
    return k`
      <g class="chip ${i?.available === !1 ? "na" : ""}" @click=${(m) => this._slotClick(m, e, t)}>
        <rect x=${s} y=${n} width=${re} height=${oe} rx="8" />
        <rect class="chip-accent" x=${s} y=${n + 7} width="3" height=${oe - 14} rx="1.5" style="fill:${p}" />
        <text class="chip-label" x=${s + 10} y=${n + 13}>${Kt(d)}</text>
        <text class="chip-value" x=${s + 10} y=${n + 28}>${a}<tspan class="chip-unit" dx="2">${l}</tspan></text>
      </g>`;
  }
  /**
   * Values anchored to a pipe ("at") sit on that pipe; values with a measuring point ("pos")
   * sit at that point. Positions avoid overlapping each other.
   */
  _placePills(e, t) {
    const s = [], n = [...e.values()].filter((r) => !["junction", "label"].includes(r.type)).map((r) => {
      const { w: a, h: l } = le(r);
      return { x: r.x * z - 4, y: r.y * z - 4, w: a * z + 8, h: l * z + 26 };
    }), i = (r, a, l, d = !0) => s.every((h) => r + l + 4 <= h.x || r >= h.x + h.w + 4 || a + he + 3 <= h.y || a >= h.y + he + 3) && (!d || n.every((h) => r + l <= h.x || r >= h.x + h.w || a + he <= h.y || a >= h.y + h.h));
    for (const r of e.values()) {
      const a = new Set(this._shownSlots(r));
      for (const l of Ns(r)) {
        if (!a.has(l.key) || !l.at && !l.pos) continue;
        const d = this._pillWidth(r, l.key);
        if (l.pos) {
          s.push({ c: r, slot: l.key, x: (r.x + l.pos[0]) * z - d / 2, y: (r.y + l.pos[1]) * z - he / 2, w: d });
          continue;
        }
        let h = null, p = { c: r.id, p: l.at };
        const m = /* @__PURE__ */ new Set();
        for (let u = 0; u < 4 && p && !h; u++) {
          const _ = p, g = t.find(
            ({ pipe: S }) => !m.has(S.id) && (S.from.c === _.c && S.from.p === _.p || S.to.c === _.c && S.to.p === _.p)
          );
          if (p = null, !g?.route) break;
          m.add(g.pipe.id);
          const b = g.pipe.from.c === _.c && g.pipe.from.p === _.p, v = b ? g.route.pts : [...g.route.pts].reverse();
          for (let S = 1; S < v.length && !h; S++) {
            const C = v[S - 1], O = v[S], j = Math.abs(C.x - O.x) + Math.abs(C.y - O.y);
            if (!(j < 1 || C.x === O.x && j < 3))
              for (const Q of [0.5, 0.35, 0.65, 0.2, 0.8]) {
                const A = (C.x + (O.x - C.x) * Q) * z, P = (C.y + (O.y - C.y) * Q) * z;
                if (C.y === O.y && j * z < d + 8) break;
                const K = A - d / 2, L = P - he / 2;
                if (i(K, L, d)) {
                  h = { x: K, y: L };
                  break;
                }
              }
          }
          const x = b ? g.pipe.to : g.pipe.from, $ = e.get(x.c);
          if (!h && $ && q[$.type].passive && $.type !== "pump") {
            const S = ot($).find((C) => C.id !== x.p && t.some(({ pipe: O }) => !m.has(O.id) && (O.from.c === $.id && O.from.p === C.id || O.to.c === $.id && O.to.p === C.id)));
            S && (p = { c: $.id, p: S.id });
          }
        }
        if (!h) {
          const u = ce(r, l.at);
          if (!u) continue;
          h = { x: u.x * z + 6, y: u.y * z + 6 };
        }
        s.push({ c: r, slot: l.key, ...h, w: d });
      }
    }
    return s;
  }
  _pillWidth(e, t) {
    const { text: s, unit: n } = be(this.src.get(e, t), Ie(e, t));
    return Math.round((Rs(e.type, t).length + s.length + n.length) * 6.4 + 22);
  }
  _anchorPill(e) {
    const t = this.src.get(e.c, e.slot), s = Ie(e.c, e.slot), { text: n, unit: i } = be(t, s), r = s === "temp" && t?.available && t.num !== null ? te(t.num, "#8b949e") : "var(--cp-accent)";
    return k`
      <g class="apill" @click=${(a) => this._slotClick(a, e.c, e.slot)}>
        <title>${xe(e.c.type, e.slot)}</title>
        <rect x=${e.x} y=${e.y} width=${e.w} height=${he} rx=${he / 2} style="stroke:${r}" />
        <text x=${e.x + 8} y=${e.y + 13}><tspan class="apill-label">${Rs(e.c.type, e.slot)}</tspan> ${n}<tspan class="chip-unit" dx="1">${i}</tspan></text>
      </g>`;
  }
  /** Compact value-only pill drawn inside a tank at the sensor height. */
  _pill(e, t, s, n, i) {
    const r = this.src.get(e, t), { text: a, unit: l } = be(r, Ie(e, t));
    return k`
      <g class="pill" @click=${(d) => this._slotClick(d, e, t)}>
        <title>${xe(e.type, t)}</title>
        <rect x=${s} y=${n} width=${i} height="22" rx="11" />
        <text x=${s + i / 2} y=${n + 15.5} text-anchor="middle">${a}<tspan class="chip-unit" dx="1">${l}</tspan></text>
      </g>`;
  }
  _tile(e, t, s) {
    const n = e.props.entries || [];
    return k`
      <rect class="tile" x="0" y="0" width=${t} height=${s} rx="12" />
      <text class="tile-title" x="14" y="22">${e.label}</text>
      ${n.map((i, r) => {
      const a = this.src.get(e, i.slot), { text: l, unit: d } = be(a, i.kind || "text"), h = 46 + r * 26;
      return k`<g class="tile-row" @click=${(p) => this._slotClick(p, e, i.slot)}>
          <text class="tile-label" x="14" y=${h}>${Kt(i.label || i.slot, 22)}</text>
          <text class="tile-value" x=${t - 14} y=${h} text-anchor="end">${l} <tspan class="chip-unit">${d}</tspan></text></g>`;
    })}`;
  }
  _editOverlays(e, t) {
    const s = [];
    for (const i of e.values())
      for (const r of ot(i)) {
        const a = ce(i, r.id);
        if (!a) continue;
        const l = this._connect?.c === i.id && this._connect.p === r.id, d = i.type === "junction" ? { l: -7, r: 7, t: 0, b: 0 }[a.dir] ?? 0 : 0, h = i.type === "junction" ? { t: -7, b: 7, l: 0, r: 0 }[a.dir] ?? 0 : 0;
        s.push(k`<circle class="port ${l ? "src" : ""} ${this._connect ? "target" : ""}" cx=${a.x * z + d} cy=${a.y * z + h} r=${i.type === "junction" ? 4 : 6}
          @pointerdown=${(p) => this._onPortDown(p, { c: i.id, p: r.id })}><title>${r.id}</title></circle>`);
      }
    let n = w;
    if (this.selected?.kind === "p") {
      const i = t.find((a) => a.pipe.id === this.selected.id)?.route, r = i ? ho(i.pts, i.horizontalStart) : null;
      i && r && (n = k`<rect class="bend-handle ${i.horizontalStart ? "ew" : "ns"}" x=${r.x * z - 7} y=${r.y * z - 7} width="14" height="14" rx="4"
          @pointerdown=${(a) => this._onBendDown(a, this.selected.id, i.horizontalStart)} />`);
    }
    return k`<g class="ports">${s}</g>${n}`;
  }
  // ---------------------------------------------------------- interaction
  _svgPoint(e) {
    const t = this.renderRoot.querySelector("svg"), s = t.createSVGPoint();
    s.x = e.clientX, s.y = e.clientY;
    const n = t.getScreenCTM();
    if (!n) return { x: 0, y: 0 };
    const i = s.matrixTransform(n.inverse());
    return { x: i.x, y: i.y };
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
        const [s, n] = [...this._pointers.values()], i = t.dist / Math.max(10, Math.hypot(s.x - n.x, s.y - n.y)), r = t.view, a = r.x + r.w / 2, l = r.y + r.h / 2;
        this._view = { x: a - r.w * i / 2, y: l - r.h * i / 2, w: r.w * i, h: r.h * i };
        return;
      }
      if (t.type === "pan") {
        const n = this.renderRoot.querySelector("svg").getBoundingClientRect(), i = Math.max(t.view.w / n.width, t.view.h / n.height), r = (e.clientX - t.cx) * i, a = (e.clientY - t.cy) * i;
        !t.moved && Math.abs(e.clientX - t.cx) + Math.abs(e.clientY - t.cy) > 4 && (t.moved = !0, this._capture(e)), t.moved && (this._view = { ...t.view, x: t.view.x - r, y: t.view.y - a });
        return;
      }
      if (t.type === "move") {
        const s = this._svgPoint(e);
        if (Math.abs(e.clientX - t.cx) + Math.abs(e.clientY - t.cy) > 3 && (t.moved = !0), !t.moved) return;
        const n = Math.max(0, Math.round(t.ox + (s.x - t.start.x) / z)), i = Math.max(0, Math.round(t.oy + (s.y - t.start.y) / z));
        this._drag = { id: t.id, dx: n, dy: i };
        return;
      }
      if (t.type === "tap") {
        Math.abs(e.clientX - t.cx) + Math.abs(e.clientY - t.cy) > 6 && (this._gesture = { type: "pan", cx: t.cx, cy: t.cy, view: t.view, moved: !0 }, this._capture(e), this._onMove(e));
        return;
      }
      if (t.type === "bend") {
        const s = this._svgPoint(e);
        t.moved = !0;
        const n = Math.round((t.horizontalStart ? s.x : s.y) / z);
        this._emit("cp-bend", { id: t.id, bend: n, live: !0 });
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
    const t = this._view || this._contentBox(), s = this._svgPoint(e), n = Math.exp(e.deltaY * 15e-4);
    this._view = { x: s.x - (s.x - t.x) * n, y: s.y - (s.y - t.y) * n, w: t.w * n, h: t.h * n };
  }
};
gt.properties = {
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
}, gt.styles = ee`
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
let Jt = gt;
customElements.get("cp-schematic") || customElements.define("cp-schematic", Jt);
const _t = class _t extends X {
  constructor() {
    super(...arguments), this.points = [], this.color = "var(--cp-accent)", this.step = !1;
  }
  render() {
    const e = this.points.filter((u) => u.v !== null);
    if (e.length < 2) return f`<div class="empty">${c("ov.no_history")}</div>`;
    const t = 300, s = 90, n = e[0].t, i = e[e.length - 1].t;
    let r = Math.min(...e.map((u) => u.v)), a = Math.max(...e.map((u) => u.v));
    a - r < 1e-6 && (a += 1, r -= 1);
    const l = (a - r) * 0.1;
    r -= l, a += l;
    const d = (u) => (u - n) / Math.max(1, i - n) * t, h = (u) => s - (u - r) / (a - r) * s;
    let p = `M ${d(e[0].t)} ${h(e[0].v)}`;
    for (let u = 1; u < e.length; u++)
      this.step ? p += ` H ${d(e[u].t)} V ${h(e[u].v)}` : p += ` L ${d(e[u].t)} ${h(e[u].v)}`;
    const m = `${p} L ${t} ${s} L 0 ${s} Z`;
    return f`<svg viewBox="0 0 ${t} ${s}" preserveAspectRatio="none">
      <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color=${this.color} stop-opacity="0.35" /><stop offset="1" stop-color=${this.color} stop-opacity="0" />
      </linearGradient></defs>
      ${k`<path d=${m} fill="url(#sg)" /><path d=${p} fill="none" stroke=${this.color} stroke-width="2" vector-effect="non-scaling-stroke" />`}
    </svg>`;
  }
};
_t.properties = { points: { attribute: !1 }, color: {}, step: { type: Boolean } }, _t.styles = ee`
    :host { display: block; height: 90px; }
    svg { width: 100%; height: 100%; display: block; overflow: visible; }
    .empty { height: 100%; display: grid; place-items: center; color: var(--cp-muted); font-size: 12px; }
  `;
let Qt = _t;
const vt = class vt extends X {
  constructor() {
    super(...arguments), this.slotKey = "", this.x = 0, this.y = 0, this.version = 0, this._hist = null, this._loadedFor = "";
  }
  updated() {
    const e = `${this.component?.id}:${this.slotKey}`;
    e !== this._loadedFor && this.component && (this._loadedFor = e, this._hist = null, this.src.history(this.component, this.slotKey, 24).then(
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
  render() {
    if (!this.component) return w;
    const e = this.component, t = Ie(e, this.slotKey), s = this.src.get(e, this.slotKey), { text: n, unit: i } = be(s, t), r = this.src.entityOf(e, this.slotKey), a = this._hist || [], l = a.map((_) => _.v).filter((_) => _ !== null), d = t === "temp" && s?.num !== null && s?.num !== void 0 ? te(s.num, "#3ddc97") : "var(--cp-accent)", h = 320, p = Math.max(12, Math.min(window.innerWidth - h - 12, this.x - h / 2)), m = Math.max(12, Math.min(window.innerHeight - 260, this.y + 14)), u = e.type === "value_tile" ? this.slotKey : xe(e.type, this.slotKey);
    return f`
      <div class="backdrop" @pointerdown=${this._close}></div>
      <div class="pop card" style="left:${p}px; top:${m}px; width:${h}px">
        <div class="row head">
          <div>
            <div class="title">${u}</div>
            <div class="muted sub">${e.label}</div>
          </div>
          <span class="spacer"></span>
          <button class="ghost icon" @click=${this._close} aria-label=${c("close")}>${R("close")}</button>
        </div>
        <div class="now"><span class="val">${n}</span><span class="unit">${i}</span></div>
        <div class="muted cap">${c("ov.history24")}</div>
        ${this._hist === null ? f`<div class="loading"></div>` : f`<cp-sparkline .points=${a} .color=${d} .step=${t === "bool"}></cp-sparkline>`}
        ${l.length && t !== "bool" && t !== "enum" ? f`<div class="row stats">
              <span>${c("ov.min")} <b>${F(Math.min(...l))}</b></span>
              <span>${c("ov.max")} <b>${F(Math.max(...l))}</b></span>
            </div>` : w}
        ${r ? f`<div class="row foot"><code>${r}</code><span class="spacer"></span>
              <button @click=${() => this._more(r)}>${c("ov.open_entity")}</button></div>` : w}
      </div>
    `;
  }
};
vt.properties = {
  component: { attribute: !1 },
  slotKey: {},
  src: { attribute: !1 },
  x: { type: Number },
  y: { type: Number },
  version: { type: Number },
  _hist: { state: !0 }
}, vt.styles = [
  ne,
  ee`
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
let es = vt;
const go = { info: "info", notice: "notice", warning: "warn", error: "error" };
function _o(o) {
  const e = { ...o.params };
  return e.label_sfx = e.label ? ` (${e.label})` : "", c(`msgk.${o.key}`, e);
}
const wt = class wt extends X {
  constructor() {
    super(...arguments), this.messages = [], this.compact = !1, this.canClear = !1, this._filter = "all";
  }
  _row(e) {
    const t = e.end_ts ? e.end_ts - e.ts : null;
    return f`<li class="msg ${e.level} ${e.active ? "active" : ""}">
      <span class="lv">${R(go[e.level] || "info")}</span>
      <div class="body">
        <div class="text">${_o(e)}</div>
        <div class="meta">
          ${cn(e.ts)}
          ${e.active ? f` · <b>${c("msg.active")}</b>` : t !== null ? f` · ${c("msg.duration", { duration: pn(t) })}` : w}
        </div>
      </div>
    </li>`;
  }
  render() {
    const e = [...this.messages].sort((i, r) => r.ts - i.ts), t = this._filter === "all" ? e : e.filter((i) => i.level === this._filter), s = t.filter((i) => i.active), n = t.filter((i) => !i.active).slice(0, this.compact ? 12 : 300);
    return f`
      ${this.compact ? w : f`<div class="row filters">
            ${["all", "error", "warning", "notice", "info"].map(
      (i) => f`<button class=${this._filter === i ? "primary" : ""} @click=${() => this._filter = i}>
                ${c(i === "all" ? "msg.filter_all" : `msg.level.${i}`)}</button>`
    )}
            <span class="spacer"></span>
            ${this.canClear ? f`<button @click=${() => this.dispatchEvent(new CustomEvent("clear"))}>${R("trash")} ${c("msg.clear")}</button>` : w}
          </div>`}
      ${s.length ? f`<h4>${c("msg.active")}</h4><ul>${s.map((i) => this._row(i))}</ul>` : w}
      <h4>${c("msg.history")}</h4>
      ${n.length ? f`<ul>${n.map((i) => this._row(i))}</ul>` : f`<div class="empty muted">${c("msg.empty")}</div>`}
    `;
  }
};
wt.properties = {
  messages: { attribute: !1 },
  compact: { type: Boolean },
  canClear: { type: Boolean },
  _filter: { state: !0 }
}, wt.styles = [
  ne,
  ee`
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
let ts = wt;
customElements.get("cp-sparkline") || customElements.define("cp-sparkline", Qt);
customElements.get("cp-slot-popover") || customElements.define("cp-slot-popover", es);
customElements.get("cp-messages") || customElements.define("cp-messages", ts);
const vo = [1, 10, 60, 300, 900], ni = "copilot.explain", oi = "copilot.energy", wo = {
  heat: "#ff8a3d",
  dhw: "#ff4f8b",
  cold: "#6cc4ff",
  warn: "var(--cp-warn)",
  error: "var(--cp-error)",
  eco: "#3ddc97",
  info: "var(--cp-muted)"
};
function ri(o) {
  try {
    return localStorage.getItem(o);
  } catch {
    return null;
  }
}
function ai(o, e) {
  try {
    localStorage.setItem(o, e);
  } catch {
  }
}
const bt = class bt extends X {
  constructor() {
    super(...arguments), this.icons = /* @__PURE__ */ new Map(), this.messages = [], this.sim = null, this.version = 0, this.narrow = !1, this.showDemo = !0, this.showKpis = !0, this.showSide = !0, this._pop = null, this._side = !0, this._explain = ri(ni) === "1", this._energy = ri(oi) !== "0", this._comp = null;
  }
  _toggleExplain() {
    this._explain = !this._explain, ai(ni, this._explain ? "1" : "0");
  }
  _toggleEnergy() {
    this._energy = !this._energy, ai(oi, this._energy ? "1" : "0");
  }
  _onComponent(e) {
    this._explain && (this._comp = e.detail);
  }
  _explainPanel() {
    const e = Bn(this.plant, this.src);
    return f`<div class="side-head"><b>${c("ex.title")}</b></div>
      ${e.length ? f`<ul class="explain">
            ${e.map(
      (t) => f`<li style="--tone:${wo[t.tone]}">
                <span class="dot"></span>
                <div>
                  <div>${c(t.key, t.params)}</div>
                  ${t.hint ? f`<div class="ex-hint">${c(t.hint, t.params)}</div>` : w}
                </div>
              </li>`
    )}
          </ul>` : f`<p class="muted">${c("ex.empty")}</p>`}
      <p class="ex-tip">${R("info")} ${c("ex.tap_hint")}</p>`;
  }
  _compPop() {
    const e = this._comp;
    if (!e) return w;
    const t = Rn(e.component, this.src), s = 300, n = Math.max(12, Math.min(window.innerWidth - s - 12, e.x - s / 2)), i = Math.max(12, Math.min(window.innerHeight - 200, e.y + 14));
    return f`<div class="backdrop" @pointerdown=${() => this._comp = null}></div>
      <div class="cpop card" style="left:${n}px; top:${i}px; width:${s}px">
        <div class="row cpop-head">
          <div>
            <div class="cpop-title">${e.component.label || c(`type.${e.component.type}`)}</div>
            <div class="muted cpop-sub">${c(`type.${e.component.type}`)}</div>
          </div>
          <span class="spacer"></span>
          <button class="ghost icon" @click=${() => this._comp = null} aria-label=${c("close")}>${R("close")}</button>
        </div>
        ${t.role ? f`<p>${c(t.role, t.params)}</p>` : w}
        ${t.state ? f`<p class="cpop-state">${c(t.state, t.params)}</p>` : w}
      </div>`;
  }
  _first(e) {
    return this.plant.components.find((t) => t.type === e);
  }
  _num(e, t) {
    if (!e) return;
    const s = this.src.get(e, t);
    return s?.available && s.num !== null ? s.num : void 0;
  }
  _kpis() {
    const e = this._first("outdoor_unit"), t = this._first("indoor_unit"), s = this._first("dhw_tank"), n = this.plant.components.find((g) => g.type === "radiators" || g.type === "floor_heating"), i = this.plant.components.find((g) => g.type === "valve_3way" && g.props.role === "dhw_switch");
    let r = e ? Xe(this.src.get(e, "activity")) : void 0;
    if (!r && e) {
      const g = ge(e, this.src), b = i ? ge(i, this.src) : /* @__PURE__ */ new Set();
      r = g.has("running") ? b.has("b") ? "hot_water" : "heating" : "off";
    }
    const a = {
      heating: "#ff8a3d",
      hot_water: "#ff4f8b",
      defrost: "#6cc4ff",
      compressor_alarm: "#ff5a5f",
      off: "#8a97a6"
    }, l = this._num(e, "heat_power");
    let d = this._num(e, "el_power");
    const h = e ? this.src.get(e, "el_power")?.unit : void 0;
    d !== void 0 && h === "kW" && (d *= 1e3);
    const p = l !== void 0 && d !== void 0 && d > 50 && l > 0.2 ? l / (d / 1e3) : void 0, m = (g, b = 1) => g === void 0 ? "–" : F(g, b), u = Ci(this.plant, this.src), _ = [
      { key: "mode", label: c("kpi.mode"), value: r ? c(`mode.${r}`) : "–", unit: "", color: a[r || "off"] },
      { key: "out", label: c("kpi.outdoor"), value: m(this._num(e, "outdoor_temp")), unit: "°C", comp: e, slot: "outdoor_temp" },
      { key: "heat", label: c("kpi.heat"), value: m(l), unit: "kW", comp: e, slot: "heat_power" },
      { key: "power", label: c("kpi.power"), value: d === void 0 ? "–" : d >= 1e3 ? F(d / 1e3, 2) : F(d, 0), unit: d !== void 0 && d >= 1e3 ? "kW" : "W", comp: e, slot: "el_power" },
      {
        key: "cop",
        label: c("kpi.cop"),
        value: m(p),
        unit: "",
        color: u ? _e[u.ampel] : void 0,
        sub: u ? `${c("kpi.target")} ${m(u.expected)}` : void 0
      },
      {
        key: "supply",
        label: c("kpi.supply"),
        value: m(this._num(t, "supply_temp")),
        unit: "°C",
        color: te(this._num(t, "supply_temp"), ""),
        sub: this._num(t, "target_flow_temp") !== void 0 ? `${c("kpi.target")} ${m(this._num(t, "target_flow_temp"))}` : void 0,
        comp: t,
        slot: "supply_temp"
      }
    ];
    return s && _.push({ key: "dhw", label: c("kpi.dhw"), value: m(this._num(s, "temp_top")), unit: "°C", color: te(this._num(s, "temp_top"), ""), comp: s, slot: "temp_top" }), n && this._num(n, "room_temp") !== void 0 && _.push({ key: "room", label: c("kpi.room"), value: m(this._num(n, "room_temp")), unit: "°C", comp: n, slot: "room_temp" }), _;
  }
  _openPop(e) {
    this._pop = e.detail;
  }
  _scenario(e) {
    this.dispatchEvent(new CustomEvent("scenario", { detail: e, bubbles: !0, composed: !0 }));
  }
  _demoBar() {
    const e = this.sim;
    if (!e || !this.showDemo) return w;
    const t = ["winter", "transition", "shower", "defrost", "dim14a", "pv", "disinfect", "fault", "reset"], s = { dim14a: e.dim14a, pv: e.pv, fault: e.fault, disinfect: e.disinfect };
    return f`<div class="demo">
      <span class="demo-tag">${R("flask")} ${c("demo.active")}</span>
      <span class="clock" title=${c("demo.time")}>${ki(e.time)}</span>
      <label class="ctl">${c("demo.speed")}
        <select @change=${(n) => e.speed = Number(n.target.value)}>
          ${vo.map((n) => f`<option value=${n} ?selected=${e.speed === n}>${n}×</option>`)}
        </select>
      </label>
      <label class="ctl slider">${c("demo.outdoor")} <b>${F(e.outdoorMean, 0)} °C</b>
        <input type="range" min="-15" max="20" step="1" .value=${String(e.outdoorMean)}
          @input=${(n) => e.outdoorMean = Number(n.target.value)} />
      </label>
      ${this.narrow ? f`<select class="scn-select" @change=${(n) => {
      const i = n.target;
      i.value && this._scenario(i.value), i.value = "";
    }}>
            <option value="">${c("demo.scenarios")} …</option>
            ${t.map((n) => f`<option value=${n}>${s[n] ? "✓ " : ""}${c(`scn.${n}`)}</option>`)}
          </select>` : f`<div class="scn">
            ${t.map(
      (n) => f`<button class=${s[n] ? "primary" : ""} @click=${() => this._scenario(n)}>${c(`scn.${n}`)}</button>`
    )}
          </div>`}
    </div>`;
  }
  render() {
    if (!this.plant) return w;
    const e = this._kpis(), t = Nn(this.plant, this.sim), s = this.messages.filter((n) => n.active && (n.level === "warning" || n.level === "error")).length;
    return f`
      ${this._demoBar()}
      ${this.showKpis ? f`<div class="kpis">
        ${e.map(
      (n) => f`<button class="kpi" ?disabled=${!n.comp} @click=${(i) => n.comp && (this._pop = { component: n.comp, slot: n.slot, x: i.clientX, y: i.clientY })}>
            <span class="k-label">${n.label}</span>
            <span class="k-value" style=${n.color ? `color:${n.color}` : ""}>${n.value}<small>${n.unit}</small></span>
            ${n.sub ? f`<span class="k-sub">${n.sub}</span>` : w}
          </button>`
    )}
      </div>` : w}
      ${t && this._energy ? f`<div class="energy card"><cp-energy .flow=${Kn(this.plant, this.src, this.sim)}></cp-energy></div>` : w}
      <div class="main ${this._explain || this._side && this.showSide ? "with-side" : ""}">
        <div class="stage card">
          <cp-schematic
            ?auto-height=${this.narrow}
            .plant=${this.plant}
            .src=${this.src}
            .icons=${this.icons}
            .version=${this.version}
            @cp-slot-click=${this._openPop}
            @cp-component-click=${this._onComponent}
          ></cp-schematic>
          <div class="zoom">
            ${t ? f`<button class="icon ${this._energy ? "on" : ""}" title=${c("en.toggle")} aria-pressed=${this._energy ? "true" : "false"} @click=${this._toggleEnergy}>${R("bolt")}</button>` : w}
            <button class="icon ${this._explain ? "on" : ""}" title=${c("ex.toggle")} aria-pressed=${this._explain ? "true" : "false"} @click=${this._toggleExplain}>${R("info")}</button>
            <button class="icon" title=${c("zoom_in")} @click=${() => this._sch()?.zoom(0.8)}>${R("plus")}</button>
            <button class="icon" title=${c("zoom_out")} @click=${() => this._sch()?.zoom(1.25)}>${R("minus")}</button>
            <button class="icon" title=${c("fit")} @click=${() => this._sch()?.fit()}>${R("fit")}</button>
            ${this.narrow || !this.showSide ? w : f`<button class="icon" title=${c("msg.title")} @click=${() => this._side = !this._side}>
                  ${R("bell")}${s ? f`<span class="badge">${s}</span>` : w}</button>`}
          </div>
        </div>
        ${this._explain ? f`<aside class="side card">${this._explainPanel()}</aside>` : this.showSide && (this._side || this.narrow) ? f`<aside class="side card">
                <div class="side-head"><b>${c("msg.title")}</b></div>
                <cp-messages compact .messages=${this.messages}></cp-messages>
              </aside>` : w}
      </div>
      ${this._pop ? f`<cp-slot-popover
            .component=${this._pop.component}
            .slotKey=${this._pop.slot}
            .src=${this.src}
            .x=${this._pop.x}
            .y=${this._pop.y}
            .version=${this.version}
            @close=${() => this._pop = null}
          ></cp-slot-popover>` : w}
      ${this._compPop()}
    `;
  }
  _sch() {
    return this.renderRoot.querySelector("cp-schematic");
  }
};
bt.properties = {
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
  _energy: { state: !0 }
}, bt.styles = [
  ne,
  ee`
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
let ss = bt;
customElements.get("cp-overview") || customElements.define("cp-overview", ss);
function ht(o) {
  return JSON.parse(JSON.stringify(o));
}
function lt(o) {
  const { w: e, h: t } = le(o);
  return { x0: o.x, y0: o.y, x1: o.x + e, y1: o.y + t };
}
function ut(o) {
  const e = new Map(o.components.map((p) => [p.id, p])), t = [];
  let s = 0;
  for (const p of o.pipes) {
    const m = Li(p, e);
    if (m)
      for (let u = 1; u < m.pts.length; u++)
        t.push({ pipe: p.id, a: m.pts[u - 1], b: m.pts[u] }), s += Math.abs(m.pts[u].x - m.pts[u - 1].x) + Math.abs(m.pts[u].y - m.pts[u - 1].y);
  }
  let n = 0, i = 0;
  for (let p = 0; p < t.length; p++)
    for (let m = p + 1; m < t.length; m++) {
      const u = t[p], _ = t[m];
      if (u.pipe === _.pipe) continue;
      const g = u.a.y === u.b.y, b = _.a.y === _.b.y;
      if (g !== b) {
        const v = g ? u : _, x = g ? _ : u, $ = Math.min(v.a.x, v.b.x), S = Math.max(v.a.x, v.b.x), C = Math.min(x.a.y, x.b.y), O = Math.max(x.a.y, x.b.y);
        x.a.x > $ && x.a.x < S && v.a.y > C && v.a.y < O && n++;
      } else g && u.a.y === _.a.y ? Math.min(Math.max(u.a.x, u.b.x), Math.max(_.a.x, _.b.x)) - Math.max(Math.min(u.a.x, u.b.x), Math.min(_.a.x, _.b.x)) > 0 && i++ : !g && u.a.x === _.a.x && Math.min(Math.max(u.a.y, u.b.y), Math.max(_.a.y, _.b.y)) - Math.max(Math.min(u.a.y, u.b.y), Math.min(_.a.y, _.b.y)) > 0 && i++;
    }
  let r = 0;
  const a = new Map(o.pipes.map((p) => [p.id, /* @__PURE__ */ new Set([p.from.c, p.to.c])])), l = o.components.filter((p) => !["junction", "label"].includes(p.type));
  for (const p of t)
    for (const m of l) {
      if (a.get(p.pipe)?.has(m.id)) continue;
      const u = lt(m), _ = Math.min(p.a.x, p.b.x), g = Math.max(p.a.x, p.b.x), b = Math.min(p.a.y, p.b.y), v = Math.max(p.a.y, p.b.y);
      g > u.x0 && _ < u.x1 && v > u.y0 && b < u.y1 && r++;
    }
  let d = 0;
  for (let p = 0; p < l.length; p++)
    for (let m = p + 1; m < l.length; m++) {
      const u = lt(l[p]), _ = lt(l[m]);
      u.x1 + 1 > _.x0 && _.x1 + 1 > u.x0 && u.y1 + 1 > _.y0 && _.y1 + 1 > u.y0 && d++;
    }
  const h = n * 10 + i * 15 + r * 12 + d * 40 + s * 0.05;
  return { crossings: n + i, overlaps: d, through: r, length: s, total: h };
}
const li = {
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
function bo(o, e, t, s) {
  const n = ht(o), i = n.components.filter((g) => !["label", "value_tile"].includes(g.type)), r = new Map(i.map((g) => [g.id, /* @__PURE__ */ new Set()]));
  for (const g of n.pipes)
    r.get(g.from.c)?.add(g.to.c), r.get(g.to.c)?.add(g.from.c);
  const a = i.find((g) => g.type === "outdoor_unit") || i.find((g) => g.type === "indoor_unit") || i[0], l = /* @__PURE__ */ new Map();
  if (a) {
    l.set(a.id, 0);
    const g = [a.id];
    for (; g.length; ) {
      const b = g.shift();
      for (const v of r.get(b) || [])
        if (!l.has(v)) {
          const x = i.find((S) => S.id === v), $ = x.type === "junction" || q[x.type].passive && x.type !== "tap";
          l.set(v, l.get(b) + ($ ? 0.5 : 1)), g.push(v);
        }
    }
  }
  for (const g of i) l.has(g.id) || l.set(g.id, 0);
  const h = [...new Set([...l.values()].map((g) => Math.round(g * 2)))].sort((g, b) => g - b).map((g) => i.filter((b) => Math.round(l.get(b.id) * 2) === g)), p = s ? -1 : 1;
  for (const g of h) g.sort((b, v) => p * ((li[b.type] ?? 5) - (li[v.type] ?? 5)));
  const m = /* @__PURE__ */ new Map(), u = () => h.forEach((g) => g.forEach((b, v) => m.set(b.id, v / Math.max(1, g.length - 1))));
  u();
  for (let g = 0; g < t; g++)
    for (const b of h) {
      const v = new Map(
        b.map((x) => {
          const $ = [...r.get(x.id) || []].filter((S) => m.has(S));
          return [x.id, $.length ? $.reduce((S, C) => S + m.get(C), 0) / $.length : m.get(x.id)];
        })
      );
      b.sort((x, $) => v.get(x.id) - v.get($.id)), u();
    }
  let _ = 1;
  for (const g of h) {
    const b = Math.max(1, ...g.map((x) => le(x).w));
    let v = 2;
    for (const x of g) {
      const { w: $, h: S } = le(x);
      x.x = Math.round(_ + (b - $) / 2), x.y = v, v += S + e + (q[x.type].badges === "below" ? 3 : 0);
    }
    _ += b + e + 2;
  }
  for (const g of n.pipes)
    delete g.via, delete g.bend;
  return n.grid = { w: Math.max(n.grid.w, _ + 4), h: Math.max(n.grid.h, ...i.map((g) => g.y + le(g).h + 6)) }, n;
}
function yo(o) {
  const e = o.settings?.wizard;
  if (!e) return null;
  const t = o.components.find((m) => m.type === "indoor_unit"), s = (m) => o.components.some((u) => u.type === m), n = {
    ...e,
    indoorModel: t?.model || e.indoorModel,
    dhw: s("dhw_tank") ? "tank" : e.dhw,
    buffer: s("buffer") ? e.buffer === "none" ? "parallel" : e.buffer : "none",
    circulation: s("tap") ? o.components.some((m) => m.id === "circ") : e.circulation
  }, i = Tt(n, o), r = new Map(i.components.map((m) => [m.id, m])), a = ht(o), l = [], d = [];
  for (const m of a.components) {
    const u = r.get(m.id);
    u && u.type === m.type ? (m.x = u.x, m.y = u.y, u.rot !== void 0 ? m.rot = u.rot : delete m.rot, u.flip ? m.flip = !0 : delete m.flip, l.push(m)) : d.push(m);
  }
  const h = (m) => `${m.from.c}.${m.from.p}>${m.to.c}.${m.to.p}`, p = new Map(i.pipes.map((m) => [h(m), m]));
  for (const m of a.pipes) {
    const u = p.get(h(m));
    delete m.bend, u?.via ? m.via = u.via : delete m.via;
  }
  a.grid = { w: Math.max(a.grid.w, i.grid.w), h: Math.max(a.grid.h, i.grid.h) };
  for (const m of d) {
    const { w: u, h: _ } = le(m), g = (v, x) => [...l].every(($) => {
      const S = lt($);
      return v + u + 2 <= S.x0 || v >= S.x1 + 2 || x + _ + 3 <= S.y0 || x >= S.y1 + 3;
    });
    let b = !1;
    for (let v = 2; v + _ < a.grid.h + 20 && !b; v += 2)
      for (let x = 1; x + u < a.grid.w + 20 && !b; x += 2)
        g(x, v) && (m.x = x, m.y = v, b = !0);
    l.push(m);
  }
  return a;
}
function xo(o, e = 400) {
  let t = ht(o), s = ut(t).total, n = 12345;
  const i = () => (n = (n * 1103515245 + 12345) % 2147483648) / 2147483648, r = t.components.filter((a) => !["label", "value_tile"].includes(a.type)).map((a) => a.id);
  for (let a = 0; a < e; a++) {
    const l = ht(t), h = new Map(l.components.map((u) => [u.id, u])).get(r[Math.floor(i() * r.length)]), p = i();
    if (p < 0.35) {
      const u = l.components.filter((g) => g.id !== h.id && Math.abs(g.x - h.x) <= 3 && r.includes(g.id));
      if (!u.length) continue;
      const _ = u[Math.floor(i() * u.length)];
      [h.y, _.y] = [_.y, h.y];
    } else {
      const u = [-4, -2, 2, 4][Math.floor(i() * 4)];
      p < 0.7 ? h.y = Math.max(1, h.y + u) : h.x = Math.max(1, h.x + u);
    }
    const m = ut(l).total;
    m < s && (t = l, s = m);
  }
  return t;
}
function $o(o) {
  const e = yo(o), t = [];
  if (e) t.push({ plant: e, kind: "template" });
  else
    for (const n of [3, 5])
      for (const i of [0, 3])
        for (const r of [!1, !0]) t.push({ plant: bo(o, n, i, r), kind: "layered" });
  let s = null;
  for (const n of t) {
    const i = ut(n.plant);
    (!s || i.total < s.score.total) && (s = { plant: n.plant, kind: n.kind, score: i });
  }
  if (s.kind === "layered" || s.score.crossings > 2) {
    const n = xo(s.plant), i = ut(n);
    i.total < s.score.total && (s = { plant: n, kind: s.kind, score: i });
  }
  return s;
}
const ko = [
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
], Mo = ["supply", "return", "dhw_hot", "dhw_cold", "circulation"], Ft = {
  pump: ["running", "!running"],
  mixer: ["running"],
  valve_3way: ["a", "b"],
  outdoor_unit: ["running", "defrost", "!defrost"],
  indoor_unit: ["running", "a", "b", "aux", "pc1"],
  tap: ["flowing"],
  dhw_tank: ["charging"]
};
function Ae(o) {
  return JSON.parse(JSON.stringify(o));
}
const Ce = class Ce extends X {
  constructor() {
    super(...arguments), this.value = "", this.placeholder = "", this._listId = `cp-ents-${Ce._uid++}`;
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
Ce.properties = { hass: { attribute: !1 }, value: {}, placeholder: {} }, Ce._uid = 0, Ce.styles = [ne, ee`:host { display: block; min-width: 0; } input { font-size: 12px; padding: 6px 8px; }`];
let is = Ce;
customElements.get("cp-entity-picker") || customElements.define("cp-entity-picker", is);
const yt = class yt extends X {
  constructor() {
    super(...arguments), this.icons = /* @__PURE__ */ new Map(), this.version = 0, this._sel = null, this._hint = "", this._dirty = !1, this._undo = [], this._redo = [], this._onKey = (e) => {
      const t = e.composedPath()[0]?.tagName;
      t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || ((e.key === "Delete" || e.key === "Backspace") && this._sel ? (e.preventDefault(), this._delete()) : (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z" ? (e.preventDefault(), e.shiftKey ? this._doRedo() : this._doUndo()) : e.key.toLowerCase() === "r" && this._sel?.kind === "c" && this._rotate());
    };
  }
  willUpdate() {
    this.plant && this.plant !== this._source && (this._source = this.plant, this._draft = Ae(this.plant), this._undo = [], this._redo = [], this._dirty = !1, this._sel = null);
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
    const s = Ae(this._draft);
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
    const t = /* @__PURE__ */ new Set([...this._draft.components.map((n) => n.id), ...this._draft.pipes.map((n) => n.id)]);
    let s = 1;
    for (; t.has(`${e}${s}`); ) s++;
    return `${e}${s}`;
  }
  _add(e) {
    const t = q[e], s = this._newId(`${e}_`), n = {
      id: s,
      type: e,
      label: e === "junction" ? "" : c(`type.${e}`),
      ...this._freeSpot(t.variants ? $e({ type: e, props: {} }).w : t.w, t.variants ? $e({ type: e, props: {} }).h : t.h),
      bindings: {},
      props: e === "value_tile" ? { entries: [] } : e === "label" ? { text: c("type.label"), size: 18 } : {}
    };
    e === "pump" && (n.props.role = "other"), this._commit((i) => i.components.push(n)), this._sel = { kind: "c", id: s };
  }
  /** First grid position where a w×h box (plus margin) does not overlap anything. */
  _freeSpot(e, t) {
    const s = this._draft.components.map((i) => ({ c: i, ...le(i) })), n = (i, r) => s.every(({ c: a, w: l, h: d }) => i + e + 1 <= a.x || i >= a.x + l + 1 || r + t + 2 <= a.y || r >= a.y + d + 3);
    for (let i = 1; i + t < this._draft.grid.h; i += 2)
      for (let r = 1; r + e < this._draft.grid.w; r += 2) if (n(r, i)) return { x: r, y: i };
    return { x: 1, y: 1 };
  }
  _delete() {
    const e = this._sel;
    e && (this._commit((t) => {
      e.kind === "c" ? (t.components = t.components.filter((s) => s.id !== e.id), t.pipes = t.pipes.filter((s) => s.from.c !== e.id && s.to.c !== e.id), t.pipes.forEach((s) => {
        s.flow = s.flow?.filter((n) => n.c !== e.id), s.flowAny = s.flowAny?.filter((n) => n.c !== e.id);
      })) : t.pipes = t.pipes.filter((s) => s.id !== e.id);
    }), this._sel = null);
  }
  _rotate() {
    const e = this._comp();
    !e || !q[e.type].rotatable || this._commit((t) => {
      const s = t.components.find((n) => n.id === e.id);
      s.rot = ((s.rot || 0) + 90) % 360;
    });
  }
  _duplicate() {
    const e = this._comp();
    if (!e) return;
    const t = this._newId(`${e.type}_`);
    this._commit((s) => s.components.push({ ...Ae(e), id: t, x: e.x + 2, y: e.y + 2 })), this._sel = { kind: "c", id: t };
  }
  _connect(e, t) {
    const s = this._comp(e.c), n = this._comp(t.c), i = ce(s, e.p), r = ce(n, t.p), a = i?.def.kind || r?.def.kind || "supply", l = [], d = [s, n].find((p) => p.type === "pump");
    d && l.push({ c: d.id, s: "running" });
    for (const [p, m] of [
      [s, e],
      [n, t]
    ])
      p.type === "valve_3way" && (m.p === "a" || m.p === "b") && l.push({ c: p.id, s: m.p });
    const h = this._newId("p");
    this._commit((p) => p.pipes.push({ id: h, from: e, to: t, kind: a, flow: l })), this._sel = { kind: "p", id: h };
  }
  _set(e, t = !0) {
    const s = this._sel?.id;
    this._commit((n) => {
      const i = n.components.find((r) => r.id === s);
      i && e(i);
    }, t);
  }
  _setPipe(e, t = !0) {
    const s = this._sel?.id;
    this._commit((n) => {
      const i = n.pipes.find((r) => r.id === s);
      i && e(i);
    }, t);
  }
  _autoArrange() {
    const e = $o(this._draft);
    this._commit((t) => {
      t.components = e.plant.components, t.pipes = e.plant.pipes, t.grid = e.plant.grid;
    }), this._sel = null, this._hint = c(e.kind === "template" ? "ed.auto_done_tpl" : "ed.auto_done", { crossings: e.score.crossings }), window.setTimeout(() => this._hint = "", 6e3);
  }
  _save() {
    this.dispatchEvent(new CustomEvent("save", { detail: Ae(this._draft), bubbles: !0, composed: !0 })), this._dirty = !1;
  }
  _discard() {
    this._draft = Ae(this.plant), this._undo = [], this._redo = [], this._dirty = !1, this._sel = null;
  }
  // ------------------------------------------------------------ events
  _onBend(e) {
    const { id: t, bend: s, live: n } = e.detail;
    if (n) {
      this._bendStart || (this._bendStart = JSON.stringify(this._draft));
      const i = Ae(this._draft), r = i.pipes.find((a) => a.id === t);
      r && (r.bend = s, delete r.via), this._draft = i;
    } else this._bendStart && (this._undo.push(this._bendStart), this._bendStart = void 0, this._dirty = !0);
  }
  // ------------------------------------------------------------ render
  render() {
    if (!this._draft) return w;
    const e = this._sel;
    return f`
      <div class="toolbar">
        <button class="icon" title=${c("undo")} ?disabled=${!this._undo.length} @click=${this._doUndo}>${R("undo")}</button>
        <button class="icon" title=${c("redo")} ?disabled=${!this._redo.length} @click=${this._doRedo}>${R("redo")}</button>
        <button class="icon" title=${c("ed.rotation")} ?disabled=${!(e?.kind === "c" && q[this._comp()?.type || "label"].rotatable)} @click=${this._rotate}>${R("rotate")}</button>
        <button class="icon" title=${c("ed.duplicate")} ?disabled=${e?.kind !== "c"} @click=${this._duplicate}>${R("copy")}</button>
        <button class="icon danger" title=${c("delete")} ?disabled=${!e} @click=${this._delete}>${R("trash")}</button>
        <button title=${c("ed.auto_title")} @click=${this._autoArrange}>${R("wand")} ${c("ed.auto")}</button>
        <span class="hint">${this._hint}</span>
        <span class="spacer"></span>
        ${this._dirty ? f`<span class="dirty">${c("unsaved")}</span>
          <button @click=${this._discard}>${c("discard")}</button>` : w}
        <button class="primary" ?disabled=${!this._dirty} @click=${this._save}>${R("save")} ${c("save")}</button>
      </div>
      <div class="layout">
        <aside class="palette card">
          <div class="cap">${c("ed.palette")}</div>
          ${ko.map((t) => f`<button class="pal" @click=${() => this._add(t)}>${R("plus")} ${c(`type.${t}`)}</button>`)}
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
      const n = s.components.find((i) => i.id === t.detail.id);
      n && (n.x = t.detail.x, n.y = t.detail.y);
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
  _num(e, t, s, n = 1) {
    return f`<label class="field">${e}<input type="number" step=${n} .value=${t ?? ""} @change=${(i) => s(Number(i.target.value))} /></label>`;
  }
  _compProps() {
    const e = this._comp();
    if (!e) return w;
    const t = q[e.type], s = new Set(e.show ?? pe(e).filter((i) => i.show).map((i) => i.key)), n = [...this.icons.values()];
    return f`
      <div class="ptitle">${c(`type.${e.type}`)} <code>${e.id}</code></div>
      ${e.type !== "junction" ? f`<label class="field">${c("ed.label")}<input .value=${e.label} @change=${(i) => this._set((r) => r.label = i.target.value)} /></label>` : w}
      ${e.type === "outdoor_unit" ? f`<label class="field">${c("ed.model")}<select @change=${(i) => this._set((r) => r.model = i.target.value)}>
              ${pt.map((i) => f`<option value=${i.id} ?selected=${i.id === e.model}>${i.label}</option>`)}
            </select></label>
            ${this._num(c("ed.nominal"), e.props.nominal_kw, (i) => this._set((r) => r.props.nominal_kw = i), 0.1)}
            ${this._num(c("ed.cop_ref"), e.props.cop_ref ?? 4.9, (i) => this._set((r) => r.props.cop_ref = i), 0.1)}` : w}
      ${e.type === "indoor_unit" ? f`<label class="field">${c("ed.model")}<select @change=${(i) => this._set((r) => r.model = i.target.value)}>
              ${ys.map((i) => f`<option value=${i.id} ?selected=${i.id === e.model}>${i.label}</option>`)}
            </select></label>
            ${this._num(c("wz.aux_kw"), e.props.aux_kw, (i) => this._set((r) => r.props.aux_kw = i), 1)}
            <div class="cap">${c("ed.input_labels")}</div>
            ${[1, 2, 3, 4].map(
      (i) => f`<label class="field">${c(`slot.input${i}`)}<input .value=${e.props.input_labels?.[`input${i}`] || ""}
                @change=${(r) => this._set((a) => a.props.input_labels = { ...a.props.input_labels || {}, [`input${i}`]: r.target.value })} /></label>`
    )}
            <div class="cap">${c("ed.pressure_limits")}</div>
            <div class="two">
              ${this._num("min", e.props.pressure_min ?? 1, (i) => this._set((r) => r.props.pressure_min = i), 0.1)}
              ${this._num("max", e.props.pressure_max ?? 2.7, (i) => this._set((r) => r.props.pressure_max = i), 0.1)}
            </div>` : w}
      ${e.type === "buffer" || e.type === "dhw_tank" ? this._num(c("ed.volume"), e.props.volume, (i) => this._set((r) => r.props.volume = i)) : w}
      ${t.roles ? f`<label class="field">${c("ed.role")}<select @change=${(i) => this._set((r) => r.props.role = i.target.value)}>
            ${t.roles.map((i) => f`<option value=${i} ?selected=${e.props.role === i}>${c(`role.${i}`)}</option>`)}
          </select></label>` : w}
      ${["radiators", "floor_heating", "mixer", "pump"].includes(e.type) ? this._num(c("ed.circuit"), e.props.circuit ?? 1, (i) => this._set((r) => r.props.circuit = i)) : w}
      ${e.type === "dhw_tank" ? this._num(c("ed.dhw_circuit"), e.props.dhw_circuit ?? 1, (i) => this._set((r) => r.props.dhw_circuit = i)) : w}
      ${e.type === "label" ? f`<label class="field">${c("ed.text")}<input .value=${e.props.text || ""} @change=${(i) => this._set((r) => r.props.text = i.target.value)} /></label>
            ${this._num("px", e.props.size || 18, (i) => this._set((r) => r.props.size = i))}` : w}
      ${t.rotatable ? f`<label class="field">${c("ed.rotation")}<select @change=${(i) => this._set((r) => r.rot = Number(i.target.value))}>
            ${[0, 90, 180, 270].map((i) => f`<option value=${i} ?selected=${(e.rot || 0) === i}>${i}°</option>`)}
          </select></label>` : w}
      ${t.mirrorable ? f`<label class="field check"><input type="checkbox" .checked=${!!e.flip} @change=${(i) => this._set((r) => {
      i.target.checked ? r.flip = !0 : delete r.flip;
    })} />${c("ed.flip")}</label>` : w}
      ${["junction", "label", "value_tile"].includes(e.type) ? w : f`<label class="field">${c("ed.icon")}<select @change=${(i) => this._set((r) => {
      const a = i.target.value;
      a ? r.icon = a : delete r.icon;
    })}>
            <option value="">${c("ed.icon_default")}</option>
            ${n.map((i) => f`<option value=${i.id} ?selected=${i.id === e.icon}>${i.name}</option>`)}
          </select></label>`}
      ${e.type === "value_tile" ? this._tileEntries(e) : this._bindings(e, s)}
    `;
  }
  _bindings(e, t) {
    const s = pe(e);
    return s.length ? f`<div class="cap">${c("ed.bindings")}</div>
      <div class="bindings">
        ${s.map((n) => {
      const i = this.src.get(e, n.key), { text: r, unit: a } = be(i, n.kind);
      return f`<div class="bind">
            <div class="bhead">
              <label class="show" title=${c("ed.show")}><input type="checkbox" .checked=${t.has(n.key)}
                @change=${(l) => this._set((d) => {
        const h = new Set(d.show ?? pe(d).filter((p) => p.show).map((p) => p.key));
        l.target.checked ? h.add(n.key) : h.delete(n.key), d.show = pe(d).map((p) => p.key).filter((p) => h.has(p));
      })} /></label>
              <span class="bname">${xe(e.type, n.key)}</span>
              <span class="bval">${i ? `${r} ${a}` : ""}</span>
            </div>
            <cp-entity-picker .hass=${this.hass} .value=${e.bindings[n.key] || ""}
              @value-changed=${(l) => this._set((d) => {
        l.detail ? d.bindings[n.key] = l.detail : delete d.bindings[n.key];
      })}></cp-entity-picker>
          </div>`;
    })}
      </div>` : w;
  }
  _tileEntries(e) {
    const t = e.props.entries || [], s = ["temp", "power_kw", "power_w", "energy", "percent", "pressure", "flow", "count", "bool", "text"];
    return f`<div class="cap">${c("ed.entries")}</div>
      ${t.map(
      (n, i) => f`<div class="bind">
          <div class="two">
            <input .value=${n.label || ""} placeholder=${c("ed.label")} @change=${(r) => this._set((a) => a.props.entries[i].label = r.target.value)} />
            <select @change=${(r) => this._set((a) => a.props.entries[i].kind = r.target.value)}>
              ${s.map((r) => f`<option value=${r} ?selected=${n.kind === r}>${r}</option>`)}
            </select>
          </div>
          <div class="row nowrap">
            <cp-entity-picker .hass=${this.hass} .value=${n.entity || ""}
              @value-changed=${(r) => this._set((a) => a.props.entries[i].entity = r.detail)}></cp-entity-picker>
            <button class="icon danger" @click=${() => this._set((r) => r.props.entries.splice(i, 1))}>${R("trash")}</button>
          </div>
        </div>`
    )}
      <button @click=${() => this._set((n) => {
      n.props.entries = [...n.props.entries || [], { slot: `v${Date.now().toString(36)}`, label: "", entity: "", kind: "text" }];
    })}>${R("plus")} ${c("ed.add_entry")}</button>`;
  }
  _conds(e, t) {
    const s = this._draft.components.filter((n) => Ft[n.type]);
    return f`${(e || []).map(
      (n, i) => f`<div class="row nowrap cond">
          <select @change=${(r) => this._setPipe((a) => a[t][i].c = r.target.value)}>
            ${s.map((r) => f`<option value=${r.id} ?selected=${r.id === n.c}>${r.label || r.id}</option>`)}
          </select>
          <select @change=${(r) => this._setPipe((a) => a[t][i].s = r.target.value)}>
            ${(Ft[this._comp(n.c)?.type || "pump"] || []).map(
        (r) => f`<option value=${r} ?selected=${r === n.s}>${r.startsWith("!") ? `${c("ed.not")} ${c(`state.${r.slice(1)}`)}` : c(`state.${r}`)}</option>`
      )}
          </select>
          <button class="icon danger" @click=${() => this._setPipe((r) => r[t].splice(i, 1))}>${R("close")}</button>
        </div>`
    )}
      <button ?disabled=${!s.length} @click=${() => this._setPipe((n) => {
      const i = s[0];
      n[t] = [...n[t] || [], { c: i.id, s: Ft[i.type][0] }];
    })}>${R("plus")} ${c("ed.add_cond")}</button>`;
  }
  _pipeProps() {
    const e = this._pipe();
    if (!e) return w;
    const t = (s) => this._comp(s)?.label || s;
    return f`
      <div class="ptitle">${c("ed.pipe")} <code>${e.id}</code></div>
      <p class="muted small">${t(e.from.c)} · ${e.from.p} → ${t(e.to.c)} · ${e.to.p}</p>
      <label class="field">${c("ed.kind")}<select @change=${(s) => this._setPipe((n) => n.kind = s.target.value)}>
        ${Mo.map((s) => f`<option value=${s} ?selected=${s === e.kind}>${c(`kind.${s}`)}</option>`)}
      </select></label>
      <div class="cap">${c("ed.flow_when")}</div>
      ${this._conds(e.flow, "flow")}
      <div class="cap">${c("ed.or")}</div>
      ${this._conds(e.flowAny, "flowAny")}
      <div class="cap">${c("ed.bindings")}</div>
      <label class="field">${c("ed.temp_entity")}
        <cp-entity-picker .hass=${this.hass} .value=${e.bindings?.temp || ""}
          @value-changed=${(s) => this._setPipe((n) => n.bindings = { ...n.bindings || {}, temp: s.detail || void 0 })}></cp-entity-picker></label>
      <div class="row" style="margin-top:12px">
        <button ?disabled=${e.bend === void 0 && !e.via} @click=${() => this._setPipe((s) => {
      delete s.bend, delete s.via;
    })}>${c("ed.reset_bend")}</button>
      </div>
    `;
  }
};
yt.properties = {
  plant: { attribute: !1 },
  hass: { attribute: !1 },
  src: { attribute: !1 },
  icons: { attribute: !1 },
  version: { type: Number },
  _draft: { state: !0 },
  _sel: { state: !0 },
  _hint: { state: !0 },
  _dirty: { state: !0 }
}, yt.styles = [
  ne,
  ee`
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
let ns = yt;
customElements.get("cp-editor") || customElements.define("cp-editor", ns);
function ke(o, e, t) {
  o.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
}
const xt = class xt extends X {
  constructor() {
    super(...arguments), this.plant = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._cfg = structuredClone(this.plant?.settings?.wizard || Gt());
  }
  _upd(e) {
    this._cfg = { ...this._cfg, ...e };
  }
  _generate() {
    this.plant && !confirm(c("wz.replace_confirm")) || ke(this, "plant-generated", Tt(this._cfg, this.plant));
  }
  render() {
    const e = this._cfg, t = (s, n = "text") => f`<input type=${n} .value=${String(e[s] ?? "")}
      @change=${(i) => {
      const r = i.target.value;
      this._upd({ [s]: n === "number" ? Number(r) : r });
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
              ${ys.map((s) => f`<option value=${s.id} ?selected=${s.id === e.indoorModel}>${s.label}</option>`)}
            </select></label>
          <label class="field">${c("ed.label")} ${t("indoorLabel")}</label>
          <div class="field check">
            <label><input type="checkbox" .checked=${e.aux} @change=${(s) => this._upd({ aux: s.target.checked })} /> ${c("wz.aux")}</label>
            ${e.aux ? f`<label class="field">${c("wz.aux_kw")} ${t("auxKw", "number")}</label>` : w}
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
                <label class="field">${c("ed.label")} ${t("bufferLabel")}</label>` : w}
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
                <label class="check"><input type="checkbox" .checked=${e.circulation} @change=${(s) => this._upd({ circulation: s.target.checked })} /> ${c("wz.circulation")}</label>` : w}
        </div>

        <h3>${c("wz.circuits")}</h3>
        ${e.circuits.map(
      (s, n) => f`<div class="circuit">
            <b>${c("wz.circuit", { n: n + 1 })}</b>
            <input .value=${s.label} @change=${(i) => this._circ(n, { label: i.target.value })} />
            <select @change=${(i) => this._circ(n, { emitter: i.target.value })}>
              <option value="radiators" ?selected=${s.emitter === "radiators"}>${c("type.radiators")}</option>
              <option value="floor_heating" ?selected=${s.emitter === "floor_heating"}>${c("type.floor_heating")}</option>
            </select>
            <label class="check"><input type="checkbox" .checked=${s.mixed} @change=${(i) => this._circ(n, { mixed: i.target.checked })} /> ${c("wz.mixed")}</label>
            <button class="ghost danger" ?disabled=${e.circuits.length < 2} @click=${() => this._upd({ circuits: e.circuits.filter((i, r) => r !== n) })}>${c("wz.remove")}</button>
          </div>`
    )}
        <button ?disabled=${e.circuits.length >= 4} @click=${() => this._upd({ circuits: [...e.circuits, { emitter: "floor_heating", mixed: !0, label: c("wz.circuit", { n: e.circuits.length + 1 }) }] })}>
          ${R("plus")} ${c("wz.add_circuit")}</button>

        <h3>${c("wz.extras")}</h3>
        <div class="radios">
          <label><input type="checkbox" .checked=${e.separator} @change=${(s) => this._upd({ separator: s.target.checked })} /> ${c("wz.separator")}</label>
          <label><input type="checkbox" .checked=${e.expansion} @change=${(s) => this._upd({ expansion: s.target.checked })} /> ${c("wz.expansion")}</label>
        </div>

        <div class="row actions">
          <button @click=${() => this._cfg = Gt()}>${c("wz.example")}</button>
          <span class="spacer"></span>
          <button class="primary" @click=${this._generate}>${R("wand")} ${c("wz.generate")}</button>
        </div>
      </div>
    `;
  }
  _circ(e, t) {
    const s = this._cfg.circuits.map((n, i) => i === e ? { ...n, ...t } : n);
    this._upd({ circuits: s });
  }
};
xt.properties = { plant: { attribute: !1 }, _cfg: { state: !0 } }, xt.styles = [
  ne,
  ee`
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
let os = xt;
const $t = class $t extends X {
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
      const n = e.components.find((i) => i.id === s.component_id);
      n && (n.bindings[s.slot] = s.entity_id, t++);
    }
    ke(this, "save", e), this._msg = c("map.applied", { count: t });
  }
  render() {
    const e = !!this.hass?.__standalone, t = this._res, s = this.plant.components.flatMap(
      (n) => pe(n).filter((i) => !n.bindings[i.key] && !t?.suggestions.some((r) => r.component_id === n.id && r.slot === i.key)).map((i) => ({ c: n, s: i }))
    );
    return f`<div class="card">
      <h2>${c("map.title")}</h2>
      <p class="muted">${c("map.intro")}</p>
      ${e ? f`<p class="muted">${c("map.standalone")}</p>` : w}
      <div class="row">
        <button class="primary" ?disabled=${this._busy || e} @click=${this._scan}>${R("search")} ${c("map.scan")}</button>
        ${t ? f`<span class="muted">${c("map.found", { count: t.entity_count })}</span>` : w}
        <span class="spacer"></span>
        ${this._msg ? f`<span class="ok">${R("check")} ${this._msg}</span>` : w}
      </div>
      ${t && t.entity_count === 0 ? f`<div class="help"><b>${c("map.none")}</b><p>${c("map.none_help")}</p></div>` : w}
      ${t && t.suggestions.length ? f`<div class="tbl">
            <table>
              <thead><tr>
                <th><input type="checkbox" .checked=${this._sel.size === t.suggestions.length}
                  @change=${(n) => this._sel = n.target.checked ? new Set(t.suggestions.map((i) => `${i.component_id}|${i.slot}`)) : /* @__PURE__ */ new Set()} /></th>
                <th>${c("map.component")}</th><th>${c("map.slot")}</th><th>${c("map.entity")}</th><th>${c("map.value")}</th><th>${c("map.confidence")}</th>
              </tr></thead>
              <tbody>
                ${t.suggestions.map((n) => {
      const i = `${n.component_id}|${n.slot}`, r = this._comp(n.component_id), a = r?.bindings[n.slot], l = this.hass?.states[n.entity_id];
      return f`<tr>
                    <td><input type="checkbox" .checked=${this._sel.has(i)} @change=${(d) => {
        const h = new Set(this._sel);
        d.target.checked ? h.add(i) : h.delete(i), this._sel = h;
      }} /></td>
                    <td>${r?.label || n.component_id}</td>
                    <td>${xe(r?.type || "", n.slot)}</td>
                    <td><code>${n.entity_id}</code>${a && a !== n.entity_id ? f`<div class="muted small">${c("map.current")}: ${a}</div>` : w}</td>
                    <td>${l ? `${l.state} ${l.attributes.unit_of_measurement || ""}` : "–"}</td>
                    <td><span class="conf ${n.confidence}">${c(`map.conf.${n.confidence}`)}</span></td>
                  </tr>`;
    })}
              </tbody>
            </table>
          </div>
          <div class="row"><span class="spacer"></span><button class="primary" ?disabled=${!this._sel.size} @click=${this._apply}>${c("map.apply")} (${this._sel.size})</button></div>` : w}
      <h3>${c("map.unbound")}</h3>
      <p class="muted small">${c("map.unbound_hint")}</p>
      <div class="chips">${s.slice(0, 80).map(({ c: n, s: i }) => f`<span class="chip">${n.label || n.id}: ${xe(n.type, i.key)}</span>`)}</div>
    </div>`;
  }
};
$t.properties = {
  plant: { attribute: !1 },
  hass: { attribute: !1 },
  api: { attribute: !1 },
  _res: { state: !0 },
  _sel: { state: !0 },
  _busy: { state: !0 },
  _msg: { state: !0 }
}, $t.styles = [
  ne,
  ee`
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
let rs = $t;
const So = ["outdoor_unit", "indoor_unit", "buffer", "dhw_tank", "pump", "valve_3way", "mixer", "radiators", "floor_heating", "tap", "separator", "expansion_vessel"], kt = class kt extends X {
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
    const n = await new Promise((i, r) => {
      const a = new FileReader();
      a.onload = () => i(String(a.result).split(",")[1] || ""), a.onerror = () => r(a.error), a.readAsDataURL(s);
    });
    try {
      await this.api.uploadIcon(s.name.replace(/\.[^.]+$/, ""), s.type || "image/svg+xml", n, this._iso), ke(this, "icons-changed");
    } catch (i) {
      const r = i?.code || i?.error?.code || "invalid_data";
      this._err = c(`ic.err.${r}`);
    }
  }
  async _delete(e) {
    await this.api.deleteIcon(e), ke(this, "icons-changed");
  }
  _typeDefault(e, t) {
    const s = structuredClone(this.plant);
    s.settings.typeIcons = { ...s.settings.typeIcons || {} }, t ? s.settings.typeIcons[e] = t : delete s.settings.typeIcons[e], ke(this, "save", s);
  }
  render() {
    const e = [...this.icons.values()];
    return f`<div class="card">
      <h2>${c("ic.title")}</h2>
      <p class="muted">${c("ic.intro")}</p>
      <div class="row">
        <label class="btn primary up">${R("upload")} ${c("ic.upload")}
          <input type="file" accept=".svg,.png,.webp,.jpg,.jpeg,image/svg+xml,image/png,image/webp,image/jpeg" @change=${this._upload} hidden /></label>
        <label class="row small"><input type="checkbox" .checked=${this._iso} @change=${(t) => this._iso = t.target.checked} /> ${c("ic.iso")}</label>
        ${this._err ? f`<span class="err">${this._err}</span>` : w}
      </div>
      ${e.length ? f`<div class="gallery">${e.map(
      (t) => f`<div class="ic">
              <div class="prev"><img src=${t.data_url} alt=${t.name} /></div>
              <div class="name">${t.name}${t.iso ? f` <span class="muted">· iso</span>` : w}</div>
              <button class="ghost danger icon" @click=${() => this._delete(t.id)}>${R("trash")}</button>
            </div>`
    )}</div>` : f`<p class="muted">${c("ic.empty")}</p>`}
      <h3>${c("ic.type_default")}</h3>
      <div class="defaults">
        ${So.map(
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
kt.properties = { plant: { attribute: !1 }, api: { attribute: !1 }, icons: { attribute: !1 }, _err: { state: !0 }, _iso: { state: !0 } }, kt.styles = [
  ne,
  ee`
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
let as = kt;
const Mt = class Mt extends X {
  constructor() {
    super(...arguments), this.version = "", this._energy = null, this._note = "";
  }
  _en() {
    return this._energy ?? this.plant.settings.energy ?? {};
  }
  _setEn(e) {
    this._energy = { ...this._en(), ...e };
  }
  _detect() {
    if (!this.hass) return;
    const e = Fn(this.hass), t = Object.entries(e).some(([s, n]) => typeof n == "string" && s !== "enabled");
    this._energy = { ...this._en(), ...e }, this._note = c(t ? "st.energy_detected" : "st.energy_none");
  }
  _saveEnergy() {
    this._patch({ energy: this._en() }), this._energy = null, this._note = "";
  }
  _energySection() {
    const e = this._en(), t = (n, i) => f`<label class="field">${i}
        <cp-entity-picker .hass=${this.hass} .value=${e[n] || ""}
          @value-changed=${(r) => this._setEn({ [n]: r.detail || void 0 })}></cp-entity-picker></label>`, s = (n, i, r = !1) => f`<label class="check"><input type="checkbox" .checked=${e[n] ?? r}
        @change=${(a) => this._setEn({ [n]: a.target.checked })} />${i}</label>`;
    return f`<div class="card wrap">
      <h2>${c("st.energy")}</h2>
      <p class="muted">${c("st.energy_hint")}</p>
      ${s("enabled", c("st.energy_enabled"))}
      ${this.hass && !this.hass.__standalone ? f`<div class="row"><button @click=${this._detect}>${R("search")} ${c("st.energy_detect")}</button>
            ${this._note ? f`<span class="muted">${this._note}</span>` : w}</div>` : w}
      <div class="grid2">
        ${t("pv", c("st.e_pv"))}
        <div>${t("grid", c("st.e_grid"))}${s("grid_invert", c("st.e_grid_invert"))}</div>
        <div>${t("battery", c("st.e_battery"))}${s("battery_invert", c("st.e_battery_invert"))}</div>
        ${t("battery_soc", c("st.e_soc"))}
        <div>${t("house", c("st.e_house"))}${s("house_includes_hp", c("st.e_house_hp"), !0)}</div>
        ${t("wallbox", c("st.e_wallbox"))}
        <label class="field">${c("st.e_limit")}
          <input type="number" step="0.1" min="0" .value=${String(e.limit_14a ?? 4.2)}
            @change=${(n) => this._setEn({ limit_14a: Number(n.target.value) })} /></label>
      </div>
      <div class="row"><span class="spacer"></span>
        <button class="primary" ?disabled=${!this._energy} @click=${this._saveEnergy}>${R("save")} ${c("st.save")}</button></div>
    </div>`;
  }
  _patch(e) {
    const t = structuredClone(this.plant);
    t.settings = { ...t.settings, ...e }, ke(this, "save", t);
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
      <label class="field">${c("st.heat_load")}
        <input type="number" step="0.1" .value=${String(e.heat_load ?? 6.2)} @change=${(t) => this._patch({ heat_load: Number(t.target.value) })} /></label>
      <div class="row foot">
        <span class="muted">${c("st.version")} ${this.version}</span>
        <span class="spacer"></span>
        <button class="danger" @click=${() => confirm(c("st.reset_confirm")) && ke(this, "reset-plant")}>${c("st.reset")}</button>
      </div>
    </div>
    ${this._energySection()}`;
  }
};
Mt.properties = { plant: { attribute: !1 }, version: {}, hass: { attribute: !1 }, _energy: { state: !0 }, _note: { state: !0 } }, Mt.styles = [
  ne,
  ee`
      .wrap { max-width: 640px; display: grid; gap: 16px; }
      .toggle { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; }
      .toggle input { margin-top: 4px; }
      .foot { margin-top: 8px; }
      :host { display: grid; gap: 16px; align-content: start; }
      h2 { margin: 0; }
      .grid2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px 16px; }
      .check { display: flex; gap: 8px; align-items: center; font-size: 13px; margin-top: 6px; }
      .check input { width: auto; margin: 0; }
    `
];
let ls = Mt;
for (const [o, e] of [
  ["cp-wizard", os],
  ["cp-mapping", rs],
  ["cp-icons", as],
  ["cp-settings", ls]
])
  customElements.get(o) || customElements.define(o, e);
const zo = 10 * 6e4, Eo = 5e3;
function ci(o) {
  return o === void 0 ? "#8b949e" : o >= 3.5 ? _e.green : o >= 3 ? _e.yellow : _e.red;
}
let pi = null;
const St = class St extends X {
  constructor() {
    super(...arguments), this._chartKey = "", this.sim = null, this.version = 0, this._data = null, this._error = "", this._loadedAt = 0, this._loadedFor = null;
  }
  connectedCallback() {
    super.connectedCallback(), pi ??= import("./echart-KiZdWouZ.js").catch((e) => {
      pi = null, console.error("COPilot: chart module failed to load", e);
    });
  }
  willUpdate() {
    const e = this.sim || this.plant, t = Date.now() - this._loadedAt;
    (e !== this._loadedFor || t > (this.sim ? Eo : zo)) && (this._loadedFor = e, this._loadedAt = Date.now(), this._load());
  }
  async _load() {
    try {
      this._error = "", this.sim ? this._data = Vn(this.sim) : this.hass && !this.hass.__standalone && (this._data = await On(this.hass, this.plant));
    } catch (e) {
      this._error = e?.message || String(e);
    }
  }
  _live() {
    const e = Ci(this.plant, this.src), t = 62, s = 2 * Math.PI * t, n = e ? Math.min(1, e.cop / 7) : 0, i = e ? _e[e.ampel] : "var(--cp-muted)";
    return f`<div class="card live">
      <div class="cap">${c("eff.live")}</div>
      <div class="gauge">
        <svg viewBox="0 0 160 160">
          <circle cx="80" cy="80" r=${t} class="track" />
          ${k`<circle cx="80" cy="80" r=${t} class="bar" style="stroke:${i};stroke-dasharray:${s * n} ${s}" />`}
        </svg>
        <div class="gv">
          <span class="big" style="color:${i}">${e ? F(e.cop, 1) : "–"}</span>
          <span class="muted">COP</span>
        </div>
      </div>
      ${e ? f`<div class="lv-row"><span>${c("eff.expected", { out: F(e.tOut, 0), flow: F(e.tFlow, 0) })}</span><b>${F(e.expected, 1)}</b></div>
            <div class="lv-row"><span>${c("eff.ratio")}</span><b style="color:${i}">${F(e.ratio * 100, 0)} %</b></div>
            <div class="verdict" style="border-color:${i}">${c(`eff.ampel.${e.ampel}`)}</div>` : f`<p class="muted small">${c("eff.no_live")}</p>`}
    </div>`;
  }
  _tile(e, t, s) {
    const n = Gs(t), i = t && t.heat > 0 ? t.heatDhw / t.heat : void 0, r = t && t.el > 0 ? t.aux / t.el : void 0;
    return f`<div class="card tile">
      <div class="cap">${c(`eff.${e}`)} ${s ? f`<span class="est">${c("eff.estimate")}</span>` : w}</div>
      <div class="spf" style="color:${ci(n)}">${n !== void 0 ? F(n, 2) : "–"}<small>${e === "today" || e === "yesterday" ? "AZ" : "JAZ"}</small></div>
      <div class="kv"><span>${c("eff.heat")}</span><b>${t ? F(t.heat, t.heat >= 100 ? 0 : 1) : "–"} kWh</b></div>
      <div class="kv"><span>${c("eff.el")}</span><b>${t ? F(t.el, t.el >= 100 ? 0 : 1) : "–"} kWh</b></div>
      <div class="kv"><span>${c("eff.dhw_share")}</span><b>${i !== void 0 ? F(i * 100, 0) + " %" : "–"}</b></div>
      <div class="kv"><span>${c("eff.aux_share")}</span><b>${r !== void 0 ? F(r * 100, 1) + " %" : "–"}</b></div>
    </div>`;
  }
  _chart(e) {
    const t = e.daily.slice(-30);
    if (!t.length) return w;
    const s = ln() === "de" ? "de-DE" : "en-GB", n = (a) => new Date(a).toLocaleDateString(s, { day: "2-digit", month: "2-digit" }), i = (a) => new Date(a).toLocaleDateString(s, { weekday: "short", day: "2-digit", month: "2-digit" }), r = JSON.stringify(t);
    return r !== this._chartKey && (this._chartKey = r, this._chartOption = (a) => ({
      animationDuration: 400,
      textStyle: { fontFamily: "inherit" },
      grid: { left: 8, right: 8, top: 34, bottom: 8, containLabel: !0 },
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
          const d = Array.isArray(l) ? l : [l], h = d[0]?.dataIndex ?? 0, p = d.map((m) => {
            const u = m.value;
            if (u == null || u === "-") return "";
            const _ = m.seriesIndex === 2 ? "" : " kWh";
            return `<div style="display:flex;gap:10px;justify-content:space-between"><span>${m.marker}${m.seriesName}</span><b>${F(u, m.seriesIndex === 2 ? 2 : 1)}${_}</b></div>`;
          }).join("");
          return `<div style="margin-bottom:4px;font-weight:700">${i(t[h].day)}</div>${p}`;
        }
      },
      dataZoom: [{ type: "inside", minValueSpan: 5 }],
      xAxis: {
        type: "category",
        data: t.map((l) => n(l.day)),
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
            const d = Gs(l);
            return d === void 0 ? null : { value: Math.round(d * 100) / 100, itemStyle: { color: ci(d) } };
          }),
          markLine: {
            silent: !0,
            symbol: "none",
            label: { show: !1 },
            lineStyle: { color: _e.yellow, type: "dotted", opacity: 0.6 },
            data: [{ yAxis: 3 }]
          }
        }
      ]
    })), f`<div class="card chart">
      <div class="cap">${c("eff.daily")}</div>
      <cp-echart .option=${this._chartOption}></cp-echart>
      ${e.estimated.month ? f`<p class="muted small">${c("eff.demo_note")}</p>` : w}
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
      ${this._error ? f`<div class="card err">${this._error}</div>` : w}
      ${e?.missing ? f`<div class="card hint">${c(`eff.missing.${e.missing}`)}</div>` : w}
      ${e ? this._chart(e) : w}
    `;
  }
};
St.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  hass: { attribute: !1 },
  sim: { attribute: !1 },
  version: { type: Number },
  _data: { state: !0 },
  _error: { state: !0 }
}, St.styles = [
  ne,
  ee`
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
      .hint { font-size: 13px; color: var(--cp-warn); }
      .err { color: var(--cp-error); }
      @media (max-width: 800px) { .grid { grid-template-columns: 1fr; } }
    `
];
let cs = St;
customElements.get("cp-efficiency") || customElements.define("cp-efficiency", cs);
const ps = 60;
function ue(o, e, t, s) {
  const n = new Array(t).fill(null), i = [...o].sort((l, d) => l.t - d.t);
  let r = 0, a = null;
  for (let l = 0; l < t; l++) {
    const d = e + l * ps;
    for (; r < i.length && i[r].t <= d; ) a = s(i[r++]);
    n[l] = a;
  }
  return n;
}
const me = (o) => o.v === null || Number.isNaN(o.v) ? null : o.v;
function di(o) {
  const e = [];
  let t = -1;
  return o.forEach((s, n) => {
    s && t < 0 && (t = n), !s && t >= 0 && (e.push([t, n]), t = -1);
  }), t >= 0 && e.push([t, o.length]), e;
}
function hi(o) {
  const e = o.filter((t) => t !== null);
  return e.length ? e.reduce((t, s) => t + s, 0) / e.length : void 0;
}
const jt = (o, ...e) => o.components.find((t) => e.includes(t.type));
async function ae(o, e, t, s) {
  if (!e || o.get(e, t) === void 0) return [];
  try {
    return await o.history(e, t, s);
  } catch {
    return [];
  }
}
async function Ao(o, e, t = 24, s = Date.now() / 1e3) {
  const n = jt(o, "outdoor_unit"), i = jt(o, "indoor_unit"), r = jt(o, "buffer"), a = Math.floor(t * 3600 / ps), l = s - a * ps, [d, h, p, m, u, _, g, b, v, x, $] = await Promise.all([
    ae(e, n, "compressor_on", t),
    ae(e, n, "compressor_speed", t),
    ae(e, n, "heat_power", t),
    ae(e, n, "activity", t),
    ae(e, i, "supply_temp", t),
    ae(e, i, "return_temp", t),
    ae(e, r, "temp_top", t),
    ae(e, i, "buffer_temp", t),
    ae(e, i, "aux_level", t),
    ae(e, i, "vw1_position", t),
    ae(e, i, "pressure", t)
  ]), S = d.length ? d : h.length ? h : p, C = ue(S, l, a, me).map((W) => W !== null && W > (S === p ? 0.2 : 0)), O = ue(m, l, a, (W) => Xe({ raw: W.raw ?? null, available: W.raw !== void 0 }) ?? null), j = O.map((W) => W === "defrost"), Q = ue(x, l, a, me).map((W, E) => W !== null ? W > 0 : O[E] === "hot_water"), A = C.map((W, E) => W && !j[E] && !Q[E]), P = A.map((W, E) => W && A.slice(Math.max(0, E - 5), E).every(Boolean) && E >= 5), I = S.length > 0, K = [], L = g.length ? g : b;
  if (r || b.length) {
    const W = ue(u, l, a, me), E = ue(L, l, a, me), T = W.map((D, B) => P[B] && D !== null && E[B] !== null ? D - E[B] : null), V = hi(T);
    K.push(
      V === void 0 ? { id: "mixing", ampel: "none", detail: "chk.nodata", params: {} } : {
        id: "mixing",
        ampel: V <= 2 ? "green" : V <= 4 ? "yellow" : "red",
        value: `${F(V, 1)} K`,
        detail: "chk.mixing.detail",
        params: { value: V, minutes: T.filter((D) => D !== null).length },
        hint: "chk.mixing.hint"
      }
    );
  }
  if (I) {
    const E = di(C).filter(([G]) => G > 0), T = E.length, V = E.length ? E.reduce((G, [J, se]) => G + (se - J), 0) / E.length : void 0;
    let D = 0;
    for (let G = 0; G + 60 <= a; G += 10) D = Math.max(D, E.filter(([J]) => J >= G && J < G + 60).length);
    const B = T / t, H = B <= 1 && D <= 3 && (V ?? 99) >= 20 ? "green" : D > 4 || (V ?? 99) < 10 ? "red" : "yellow";
    K.push({
      id: "cycling",
      ampel: T === 0 ? "green" : H,
      value: `${T}×`,
      detail: "chk.cycling.detail",
      params: { starts: T, perHour: B, maxPerHour: D, avgRun: V ?? 0, hours: t },
      hint: "chk.cycling.hint"
    });
  } else
    K.push({ id: "cycling", ampel: "none", detail: "chk.nodata", params: {} });
  {
    const W = ue(u, l, a, me), E = ue(_, l, a, me), T = W.map((D, B) => P[B] && D !== null && E[B] !== null ? D - E[B] : null), V = hi(T);
    K.push(
      V === void 0 ? { id: "spread", ampel: "none", detail: "chk.nodata", params: {} } : {
        id: "spread",
        ampel: V >= 3 && V <= 8 ? "green" : V >= 2 && V <= 10 ? "yellow" : "red",
        value: `${F(V, 1)} K`,
        detail: "chk.spread.detail",
        params: { value: V },
        hint: V < 3 ? "chk.spread.hint_low" : "chk.spread.hint_high"
      }
    );
  }
  if (m.length) {
    const W = di(j), E = W.reduce((D, [B, H]) => D + (H - B), 0), T = C.filter(Boolean).length || 1, V = E / T;
    K.push({
      id: "defrost",
      ampel: V <= 0.08 ? "green" : V <= 0.15 ? "yellow" : "red",
      value: `${W.length}×`,
      detail: "chk.defrost.detail",
      params: { count: W.length, minutes: E, share: V * 100 },
      hint: "chk.defrost.hint"
    });
  }
  if (v.length) {
    const E = ue(v, l, a, me).map((T) => T !== null && T > 0).filter(Boolean).length;
    K.push({
      id: "aux",
      ampel: E === 0 ? "green" : E <= 60 ? "yellow" : "red",
      value: E ? `${Math.round(E)} min` : "0",
      detail: "chk.aux.detail",
      params: { minutes: E },
      hint: "chk.aux.hint"
    });
  }
  if ($.length && i) {
    const W = $.map(me).filter((H) => H !== null), E = Number(i.props.pressure_min ?? 1), T = Number(i.props.pressure_max ?? 2.7), V = Math.min(...W), D = Math.max(...W), B = W.length ? W[0] - W[W.length - 1] : 0;
    K.push({
      id: "pressure",
      ampel: V < E || D > T ? "red" : V < E + 0.2 || B > 0.2 ? "yellow" : "green",
      value: `${F(V, 1)}–${F(D, 1)} bar`,
      detail: "chk.pressure.detail",
      params: { min: V, max: D, lo: E, hi: T },
      hint: "chk.pressure.hint"
    });
  }
  return K;
}
const Wo = 2e4, Po = 5 * 6e4;
function ui(o) {
  const e = {};
  for (const [t, s] of Object.entries(o)) e[t] = typeof s == "number" ? F(s, Number.isInteger(s) ? 0 : 1) : s;
  return e;
}
const zt = class zt extends X {
  constructor() {
    super(...arguments), this.sim = null, this.version = 0, this._results = null, this._busy = !1, this._at = 0, this._for = null;
  }
  willUpdate() {
    const e = this.sim || this.plant;
    (e !== this._for || Date.now() - this._at > (this.sim ? Wo : Po)) && (this._for = e, this._at = Date.now(), this._run());
  }
  async _run() {
    if (!this._busy) {
      this._busy = !0;
      try {
        this._results = await Ao(this.plant, this.src, 24, this.sim ? this.sim.time : Date.now() / 1e3);
      } finally {
        this._busy = !1;
      }
    }
  }
  render() {
    const e = this._results, t = (s) => (e || []).filter((n) => n.ampel === s).length;
    return f`
      <div class="card head">
        <div>
          <h2>${c("chk.title")}</h2>
          <p class="muted">${c("chk.subtitle")}${this.sim ? ` ${c("chk.demo")}` : ""}</p>
        </div>
        <span class="spacer"></span>
        ${e ? f`<div class="sum">
              ${["green", "yellow", "red"].map((s) => f`<span class="dot" style="background:${_e[s]}"></span><b>${t(s)}</b>`)}
            </div>` : w}
        <button @click=${() => this._run()} ?disabled=${this._busy}>${c("chk.refresh")}</button>
      </div>
      ${e ? f`<div class="list">
            ${e.map(
      (s) => f`<div class="card item ${s.ampel}">
                <span class="lamp" style="background:${s.ampel === "none" ? "var(--cp-muted)" : _e[s.ampel]}"></span>
                <div class="body">
                  <div class="row nowrap">
                    <b class="title">${c(`chk.${s.id}.title`)}</b>
                    <span class="spacer"></span>
                    ${s.value ? f`<span class="val">${s.value}</span>` : w}
                  </div>
                  <div class="detail">${c(s.detail, ui(s.params))}</div>
                  ${s.hint && (s.ampel === "yellow" || s.ampel === "red") ? f`<div class="hint">${c(s.hint, ui(s.params))}</div>` : w}
                  ${s.ampel === "green" ? f`<div class="ok">${c("chk.ok")}</div>` : w}
                </div>
              </div>`
    )}
          </div>` : f`<div class="card muted">${c("chk.running")}</div>`}
    `;
  }
};
zt.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  sim: { attribute: !1 },
  version: { type: Number },
  _results: { state: !0 },
  _busy: { state: !0 }
}, zt.styles = [
  ne,
  ee`
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
let ds = zt;
customElements.get("cp-check") || customElements.define("cp-check", ds);
const Re = [
  { key: "design", slot: "design_temp", min: 28, max: 65, step: 1 },
  { key: "offset", slot: "offset_temp", min: -10, max: 10, step: 0.5 },
  { key: "limit", slot: "heating_limit", min: 10, max: 22, step: 0.5 },
  { key: "minFlow", slot: "min_flow_temp", min: 15, max: 40, step: 1 },
  { key: "maxFlow", slot: "max_flow_temp", min: 30, max: 75, step: 1 },
  { key: "minExt", slot: "min_ext_temp", min: -25, max: 0, step: 1 },
  { key: "roomSet", slot: "room_setpoint", min: 15, max: 25, step: 0.5 }
], We = 14, mi = -20, Ut = 22, Co = 20, Do = 70;
let fi = null;
const Et = class Et extends X {
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
    const t = zi(e?.type === "floor_heating");
    if (!e) return t;
    for (const s of Re) {
      const n = this.src.get(e, s.slot);
      n?.available && n.num !== null && (t[s.key] = n.num);
    }
    return t;
  }
  _writable(e) {
    if (this.sim) return !0;
    const t = this._circuit, s = Re.find((i) => i.key === e), n = t?.bindings[s.slot];
    return !!n && /^(number|input_number)\./.test(n) && this.admin;
  }
  willUpdate() {
    const e = `${this.sim ? "sim" : "ha"}:${this._circuit?.id}`;
    e !== this._loadedFor && (this._loadedFor = e, this._load());
  }
  // ------------------------------------------------------------ history
  async _load() {
    this._points = null;
    const e = this._circuit, t = this.plant.components.find((n) => n.type === "outdoor_unit"), s = this.plant.components.find((n) => n.type === "indoor_unit");
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
    const e = this.sim, t = [], s = e.history("outdoor", "outdoor_temp", 24), n = e.history("hc", "flow_temp", 24), i = e.history("hc", "room_temp", 24);
    for (let r = 0; r < 24; r++) {
      const a = e.time - (24 - r) * 3600, l = (u) => u.filter((_) => _.t >= a && _.t < a + 3600 && _.v !== null).map((_) => _.v), d = l(s), h = l(n), p = l(i);
      if (!d.length || !h.length) continue;
      const m = (u) => u.reduce((_, g) => _ + g, 0) / u.length;
      m(d) >= e.curve.limit || t.push({ tOut: m(d), flow: m(h), room: p.length ? m(p) : void 0, age: 0 });
    }
    for (let r = 1; r < We; r++)
      for (let a = 0; a < 24; a += 2) {
        const l = e.outdoorMean + 2.5 * Math.cos((a - 15) / 24 * 2 * Math.PI) + Math.sin(r * 1.7 + a) * 3, d = Ne(e.curve, l);
        d !== null && t.push({ tOut: l, flow: d + Math.sin(r * 3.1 + a * 0.7) * 1.4 - 0.6, room: e.curve.roomSet + Math.sin(r + a) * 0.3, age: r / We });
      }
    return t;
  }
  /** Hourly means from the recorder's long-term statistics. */
  async _hassPoints(e, t, s) {
    const n = {
      out: t.bindings.outdoor_temp,
      flow: e.bindings.flow_temp || s?.bindings.supply_temp,
      room: e.bindings.room_temp,
      heat: t.bindings.heat_power
    };
    if (!n.out || !n.flow || !this.hass) return [];
    const i = /* @__PURE__ */ new Date(), r = new Date(i.getTime() - We * 864e5), a = await this.hass.callWS({
      type: "recorder/statistics_during_period",
      start_time: r.toISOString(),
      end_time: i.toISOString(),
      statistic_ids: Object.values(n).filter(Boolean),
      period: "hour",
      types: ["mean"]
    }), l = (g) => new Map((g ? a[g] || [] : []).map((b) => [b.start, b.mean])), d = l(n.out), h = l(n.flow), p = l(n.room), m = l(n.heat), u = this._current().limit, _ = [];
    for (const [g, b] of d) {
      const v = h.get(g);
      if (b == null || v == null || b >= u) continue;
      const x = m.get(g);
      m.size && (x == null || x < 0.3) || _.push({ tOut: b, flow: v, room: p.get(g) ?? void 0, age: (i.getTime() - g) / (We * 864e5) });
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
      for (const [s, n] of e) {
        const i = Re.find((a) => a.key === s), r = t.bindings[i.slot];
        r && await this.hass.callWS({
          type: "call_service",
          domain: r.split(".")[0],
          service: "set_value",
          service_data: { entity_id: r, value: n }
        });
      }
    }
    this._edit = {}, this._msg = c("cv.applied");
  }
  // ------------------------------------------------------------ render
  _chart(e, t, s) {
    const n = (v) => {
      const x = [];
      for (let $ = mi; $ <= Math.min(Ut, v.limit); $ += 0.5) {
        const S = Ne(v, $);
        if (S === null) break;
        x.push([$, Math.round(S * 10) / 10]);
      }
      return x;
    }, i = this._circuit, r = this.plant.components.find((v) => v.type === "outdoor_unit"), a = this.plant.components.find((v) => v.type === "indoor_unit"), l = r ? this.src.get(r, "outdoor_temp") : void 0, d = i && this.src.get(i, "flow_temp") || a && this.src.get(a, "supply_temp"), h = l?.available ? l.num : null, p = d?.available ? d.num : null, m = h !== null ? Ne(e, h) : null, u = n(e), _ = t ? n(t) : [], g = (v) => `${F(v, Number.isInteger(v) ? 0 : 1)} °C`;
    return f`<cp-echart class="curve-chart" .option=${(v) => ({
      animation: !1,
      textStyle: { fontFamily: "inherit" },
      grid: { left: 8, right: 16, top: 30, bottom: 8, containLabel: !0 },
      tooltip: {
        trigger: "item",
        backgroundColor: v.surface,
        borderColor: v.border,
        textStyle: { color: v.text, fontSize: 12 },
        formatter: (x) => {
          const [$, S] = x.value;
          return `<b>${x.seriesName}</b><br>${c("cv.tip", { out: g($), flow: g(S) })}`;
        }
      },
      xAxis: {
        type: "value",
        min: mi,
        max: Ut,
        interval: 10,
        axisLabel: { color: v.muted, formatter: (x) => `${x} °C` },
        axisLine: { lineStyle: { color: v.border } },
        splitLine: { lineStyle: { color: v.border, type: "dashed" } }
      },
      yAxis: {
        type: "value",
        min: Co,
        max: Do,
        interval: 10,
        name: c("cv.axis_flow"),
        nameTextStyle: { color: v.muted, align: "left" },
        axisLine: { show: !1, onZero: !1 },
        axisLabel: { color: v.muted },
        splitLine: { lineStyle: { color: v.border, type: "dashed" } }
      },
      series: [
        {
          name: c("cv.points", { days: We }),
          type: "scatter",
          symbolSize: 6,
          z: 1,
          data: s.map((x) => ({ value: [x.tOut, Math.round(x.flow * 10) / 10], itemStyle: { color: "#f5c542", opacity: 0.85 - x.age * 0.6 } })),
          markArea: {
            silent: !0,
            itemStyle: { color: "rgba(77,159,255,0.08)" },
            label: { color: v.muted, position: "insideTop" },
            data: [[{ name: c("cv.no_heating"), xAxis: e.limit }, { xAxis: Ut }]]
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
          data: _,
          lineStyle: { color: "#4d9fff", width: 2.5, type: "dashed" },
          itemStyle: { color: "#4d9fff" }
        },
        {
          name: c("cv.target"),
          type: "scatter",
          z: 5,
          symbolSize: 13,
          data: h !== null && m !== null ? [[h, Math.round(m * 10) / 10]] : [],
          itemStyle: { color: "transparent", borderColor: "#3ddc97", borderWidth: 2 }
        },
        {
          name: c("cv.now"),
          type: "scatter",
          z: 6,
          symbolSize: 11,
          data: h !== null && p !== null ? [[h, p]] : [],
          itemStyle: { color: "#ff7a45", shadowBlur: 10, shadowColor: "#ff7a45" }
        }
      ]
    })}></cp-echart>`;
  }
  connectedCallback() {
    super.connectedCallback(), fi ??= import("./echart-KiZdWouZ.js").catch((e) => {
      fi = null, console.error("COPilot: chart module failed to load", e);
    });
  }
  render() {
    const e = this._current(), t = Object.keys(this._edit).length > 0, s = t ? { ...e, ...this._edit } : null, n = s || e, i = this._points || [], r = i.filter((p) => p.age < 0.5 && p.room !== void 0).map((p) => p.room), a = r.length ? r.reduce((p, m) => p + m, 0) / r.length : void 0, l = i.length ? i.reduce((p, m) => p + (m.flow - (Ne(e, m.tOut) ?? m.flow)), 0) / i.length : void 0, d = a !== void 0 ? xn(e, a) : 0, h = this._circuits;
    return f`
      <div class="grid">
        <div class="card chart-card">
          <div class="row head">
            <h2>${c("cv.title")}</h2>
            ${h.length > 1 ? f`<select @change=${(p) => this._hc = p.target.value}>
                  ${h.map((p) => f`<option value=${p.id} ?selected=${p.id === this._circuit?.id}>${p.label}</option>`)}
                </select>` : f`<span class="muted">${this._circuit?.label || ""}</span>`}
            <span class="spacer"></span>
            <span class="lg"><i class="l-curve"></i>${c("cv.curve")}</span>
            ${s ? f`<span class="lg"><i class="l-next"></i>${c("cv.preview")}</span>` : w}
            <span class="lg"><i class="l-pt"></i>${c("cv.points", { days: We })}</span>
            <span class="lg"><i class="l-live"></i>${c("cv.now")}</span>
          </div>
          ${this._chart(e, s, i)}
          ${this.sim ? f`<p class="muted small">${c("cv.demo_note")}</p>` : w}
          ${!this.sim && this._points && !i.length ? f`<p class="muted small">${c("cv.no_points")}</p>` : w}
        </div>
        <div class="side">
          <div class="card">
            <div class="cap">${c("cv.params")}</div>
            ${Re.map((p) => {
      const m = n[p.key], u = p.key in this._edit, _ = this._writable(p.key);
      return f`<label class="param ${u ? "changed" : ""}">
                <span class="pname">${c(`cv.p.${p.key}`)}</span>
                <b>${F(m, p.step < 1 ? 1 : 0)} ${p.key === "offset" ? "K" : "°C"}</b>
                <input type="range" min=${p.min} max=${p.max} step=${p.step} .value=${String(m)} ?disabled=${!_}
                  @input=${(g) => this._set(p.key, Number(g.target.value))} />
              </label>`;
    })}
            ${!this.sim && !Re.some((p) => this._writable(p.key)) ? f`<p class="muted small">${c("cv.readonly")}</p>` : w}
            <div class="row actions">
              <button ?disabled=${!t} @click=${() => this._edit = {}}>${c("discard")}</button>
              <span class="spacer"></span>
              <button class="primary" ?disabled=${!t} @click=${() => this._confirm = !0}>${R("check")} ${c("apply")}</button>
            </div>
            ${this._msg ? f`<p class="ok">${this._msg}</p>` : w}
          </div>
          <div class="card">
            <div class="cap">${c("cv.analysis")}</div>
            ${l !== void 0 ? f`<p class="small">${c(l >= 0 ? "cv.deviation_above" : "cv.deviation_below", { value: Math.abs(l) })}</p>` : w}
            ${a !== void 0 ? f`<p class="small">${c("cv.room", { room: a, set: e.roomSet })}</p>
                  ${Math.abs(d) >= 0.5 ? f`<div class="hint">${c(d < 0 ? "cv.suggest_down" : "cv.suggest_up", { value: Math.abs(d), target: e.offset + d })}
                        <button class="small-btn" @click=${() => this._set("offset", e.offset + d)}>${c("cv.try")}</button></div>` : f`<p class="ok small">${c("cv.fits")}</p>`}` : f`<p class="muted small">${c("cv.no_room")}</p>`}
          </div>
        </div>
      </div>
      ${this._confirm ? f`<div class="backdrop" @click=${() => this._confirm = !1}></div>
            <div class="dialog card">
              <h3>${c("cv.confirm_title")}</h3>
              <ul>${Object.entries(this._edit).map(
      ([p, m]) => f`<li>${c(`cv.p.${p}`)}: ${F(e[p], 1)} → <b>${F(m, 1)}</b></li>`
    )}</ul>
              <p class="muted small">${this.sim ? c("cv.confirm_demo") : c("cv.confirm_live")}</p>
              <div class="row"><span class="spacer"></span>
                <button @click=${() => this._confirm = !1}>${c("cancel")}</button>
                <button class="primary" @click=${this._apply}>${c("apply")}</button></div>
            </div>` : w}
    `;
  }
};
Et.properties = {
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
}, Et.styles = [
  ne,
  ee`
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
let hs = Et;
customElements.get("cp-curve") || customElements.define("cp-curve", hs);
const At = class At extends X {
  constructor() {
    super(...arguments), this.isPanel = !1, this._config = { type: "custom:copilot-card" }, this._ctl = new Ai(this, !1);
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
      ${this._ctl.error ? f`<div class="err">${this._ctl.error}</div>` : w}
      ${t ? f`<cp-overview
            .plant=${t}
            .src=${this._ctl.src}
            .icons=${this._ctl.icons}
            .messages=${this._ctl.messages}
            .sim=${this._ctl.sim}
            .version=${this._ctl.version}
            .showKpis=${e.show_kpis !== !1}
            .showSide=${!!e.show_messages}
            .showDemo=${!!e.show_demo_controls}
            ?narrow=${this.clientWidth < 700}
            @scenario=${(n) => this._ctl.scenario(n.detail)}
          ></cp-overview>` : f`<div class="loading">${qt}</div>`}
    </ha-card>`;
  }
};
At.properties = {
  hass: { attribute: !1 },
  isPanel: { type: Boolean },
  _config: { state: !0 }
}, At.styles = [
  Wi,
  ne,
  ee`
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
let us = At;
const Wt = class Wt extends X {
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
    const e = this._config, t = (s, n, i) => f`<label class="row">
      <input type="checkbox" .checked=${e[s] ?? i} @change=${(r) => this._set(s, r.target.checked)} />
      ${n}</label>`;
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
Wt.properties = { hass: { attribute: !1 }, _config: { state: !0 } }, Wt.styles = [
  ne,
  ee`
      .ed { display: grid; gap: 10px; color: var(--primary-text-color); }
      .row { display: flex; gap: 8px; align-items: center; font-size: 14px; }
      .field { color: var(--secondary-text-color); }
      input:not([type]) { background: transparent; color: var(--primary-text-color); border-color: var(--divider-color); }
      .hint { font-size: 12px; color: var(--secondary-text-color); margin: 0; }
    `
];
let ms = Wt;
customElements.get("copilot-card") || customElements.define("copilot-card", us);
customElements.get("copilot-card-editor") || customElements.define("copilot-card-editor", ms);
const mt = window;
mt.customCards = mt.customCards || [];
mt.customCards.some((o) => o.type === "copilot-card") || mt.customCards.push({
  type: "copilot-card",
  name: "COPilot",
  description: "Animated heat pump schematic with live values",
  preview: !1,
  documentationURL: "https://github.com/junky84/copilot"
});
const gi = "copilot.view";
function To(o) {
  try {
    return localStorage.getItem(o);
  } catch {
    return null;
  }
}
function Lo(o, e) {
  try {
    localStorage.setItem(o, e);
  } catch {
  }
}
const Pt = class Pt extends X {
  constructor() {
    super(), this.narrow = !1, this._ctl = new Ai(this), this._view = "overview", this._sub = "editor", this._toast = "";
    const e = To(gi);
    if (e) {
      const [t, s] = e.split(":");
      ["overview", "efficiency", "check", "curve", "messages", "config"].includes(t) && (this._view = t), s && (this._sub = s);
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
    this._view = e, t && (this._sub = t), Lo(gi, `${this._view}:${this._sub}`);
  }
  _fullscreen() {
    document.fullscreenElement ? document.exitFullscreen() : this.requestFullscreen?.().catch(() => {
    });
  }
  render() {
    const e = this._ctl.plant, t = this._ctl.messages.filter((s) => s.active && (s.level === "warning" || s.level === "error")).length;
    return f`<div class="shell">
      <header>
        ${this.narrow ? f`<button class="ghost icon" title=${c("menu")} @click=${() => this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: !0, composed: !0 }))}>${R("menu")}</button>` : w}
        <div class="brand">${qt}<span>COP<b>ilot</b></span></div>
        <nav>
          ${["overview", "efficiency", "check", "curve", "messages", "config"].map(
      (s) => f`<button class="tab ${this._view === s ? "on" : ""}" title=${c(`nav.${s}`)} @click=${() => this._go(s)}>
              ${R(s === "overview" ? "grid" : s === "efficiency" ? "chart" : s === "check" ? "check" : s === "curve" ? "curve" : s === "messages" ? "bell" : "gear")}
              <span class="tl">${c(`nav.${s}`)}</span>
              ${s === "messages" && t ? f`<span class="badge">${t}</span>` : w}
            </button>`
    )}
        </nav>
        <span class="spacer"></span>
        ${e?.settings.demo ? f`<span class="demo-pill">${R("flask")}<span class="tl">${c("demo")}</span></span>` : w}
        <button class="ghost icon" title=${c("fullscreen")} @click=${this._fullscreen}>${R("expand")}</button>
      </header>
      <main>
        ${this._ctl.error ? f`<div class="card err">${this._ctl.error}</div>` : w}
        ${this._ctl.api?.standalone ? f`<div class="note muted">${c("standalone_hint")}</div>` : w}
        ${e ? this._content(e) : f`<div class="loading">${qt}</div>`}
      </main>
      ${this._toast ? f`<div class="toast">${this._toast}</div>` : w}
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
        .version=${this._ctl.version}
        ?narrow=${this.narrow || window.innerWidth < 900}
        @scenario=${(i) => this._ctl.scenario(i.detail)}
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
    if (this._view === "messages")
      return f`<div class="card pad"><cp-messages
        .messages=${this._ctl.messages}
        ?canClear=${this._ctl.admin && !this._ctl.sim}
        @clear=${() => this._ctl.clearMessages()}
      ></cp-messages></div>`;
    if (!this._ctl.admin) return f`<div class="card">${c("readonly_hint")}</div>`;
    const s = ["wizard", "editor", "mapping", "icons", "settings"], n = (i) => this._save(i.detail);
    return f`
      <div class="subnav">
        ${s.map((i) => f`<button class="sub ${this._sub === i ? "on" : ""}" @click=${() => this._go("config", i)}>${c(`cfg.${i}`)}</button>`)}
      </div>
      <div class="cfg ${this._sub === "editor" ? "fill" : ""}">
        ${this._sub === "wizard" ? f`<cp-wizard .plant=${e} @plant-generated=${async (i) => {
      await this._save(i.detail), this._showToast(c("wz.done")), this._go("config", "editor");
    }}></cp-wizard>` : w}
        ${this._sub === "editor" ? f`<cp-editor .plant=${e} .hass=${this.hass} .src=${t} .icons=${this._ctl.icons} .version=${this._ctl.version} @save=${n}></cp-editor>` : w}
        ${this._sub === "mapping" ? f`<cp-mapping .plant=${e} .hass=${this.hass} .api=${this._ctl.api} @save=${n}></cp-mapping>` : w}
        ${this._sub === "icons" ? f`<cp-icons .plant=${e} .api=${this._ctl.api} .icons=${this._ctl.icons} @save=${n} @icons-changed=${() => this._ctl.loadIcons()}></cp-icons>` : w}
        ${this._sub === "settings" ? f`<cp-settings .plant=${e} .hass=${this.hass} .version=${this._ctl.backendVersion} @save=${n}
              @reset-plant=${() => this._save({ ...Yt(), settings: { ...Yt().settings, demo: !0 } })}></cp-settings>` : w}
      </div>
    `;
  }
};
Pt.properties = {
  hass: { attribute: !1 },
  narrow: { type: Boolean },
  route: { attribute: !1 },
  panel: { attribute: !1 },
  _view: { state: !0 },
  _sub: { state: !0 },
  _toast: { state: !0 }
}, Pt.styles = [
  Wi,
  ne,
  ee`
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
let fs = Pt;
customElements.get("copilot-panel") || customElements.define("copilot-panel", fs);
export {
  fs as C,
  ee as a,
  f as b,
  X as i
};
